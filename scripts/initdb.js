import { config } from "dotenv";
import pg from "pg";

config();

// TODO: Make this an option
const recreate = true;
const prefill = true;

(async () => {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  try {
    process.stdout.write("Connecting... ");
    await client.connect();
    console.log("done");

    if (recreate) {
      process.stdout.write("Dropping old tables... ");
      await client.query("DROP TABLE IF EXISTS meta");
      await client.query("DROP TABLE IF EXISTS sessions");
      await client.query("DROP TABLE IF EXISTS users");
      console.log("done");
    }

    console.log("Creating tables as needed:");

    process.stdout.write("  'meta'... ");
    await client.query(`
      CREATE TABLE IF NOT EXISTS meta (
          key text PRIMARY KEY,
          value text NOT NULL
      );
    `);
    console.log("done");

    process.stdout.write("  'users'... ");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          email text NOT NULL UNIQUE,
          email_verified boolean NOT NULL DEFAULT false,
          passhash text,
          -- TODO: set up Sign In With Apple?
          -- siwaid text,
          -- CONSTRAINT useable_login CHECK (num_nonnulls(passhash, siwaid) > 0)
          CONSTRAINT useable_login CHECK (num_nonnulls(passhash) > 0)
      );
    `);
    console.log("done");

    process.stdout.write("  'sessions'... ");
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
          token uuid PRIMARY KEY,
          userid integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          last_used bigint NOT NULL
      );
    `);
    console.log("done");

    if (prefill) {
      await client.query(
        "INSERT INTO users (email, email_verified, passhash) VALUES ('a@b.c', true, '$2b$10$yUOhpBr/ceI15OJfn7qJ5eW5pB2j2ka9TZWJDlXIEaVGFEKOIutda')"
      );
    }
  } finally {
    await client.end();
  }
})();
