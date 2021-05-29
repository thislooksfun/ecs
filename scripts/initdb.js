import { config } from "dotenv";
import pg from "pg";

config();

// TODO: Make this an option
const recreate = true;

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
          key character varying PRIMARY KEY,
          value character varying NOT NULL
      );
    `);
    console.log("done");

    process.stdout.write("  'users'... ");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          email character varying NOT NULL UNIQUE,
          email_verified boolean NOT NULL DEFAULT false,
          passhash character varying,
          -- TODO: set up Sign In With Apple?
          -- siwaid character varying,
          -- CONSTRAINT useable_login CHECK (num_nonnulls(passhash, siwaid) > 0)
          CONSTRAINT useable_login CHECK (num_nonnulls(passhash) > 0)
      );
    `);
    console.log("done");

    process.stdout.write("  'sessions'... ");
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
          token uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          userid integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires bigint NOT NULL
      );
    `);
    console.log("done");
  } finally {
    await client.end();
  }
})();
