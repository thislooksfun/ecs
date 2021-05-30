import { insert, select, selectExists } from "./connection";
import { compare, hash } from "$lib/passhash";

interface UserData {
  id: number;
  email: string;
  email_verified: boolean;
  passhash?: string;
}

export class User implements UserData {
  id: number;
  email: string;
  email_verified: boolean;
  passhash?: string;

  private constructor(data: UserData) {
    this.id = data.id;
    this.email = data.email;
    this.email_verified = data.email_verified;
    this.passhash = data.passhash;
  }

  static async create(email: string, password?: string): Promise<User> {
    let passhash = password ? await hash(password) : undefined;
    const { rows } = await insert("users", { email, passhash }, "*");
    return new User(rows[0]);
  }

  static async exists(email: string): Promise<boolean> {
    return await selectExists("users", { email });
  }

  static async forEmail(email: string): Promise<User | null> {
    const { rows } = await select("users", "*", { email });

    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  static async forSession(token: string): Promise<User | null> {
    try {
      const constraints = { "sessions.token": token };
      const join = { sessions: "users.id = sessions.userid" };
      const { rows } = await select("users", "users.*", constraints, 1, join);

      if (rows.length === 0) return null;
      return new User(rows[0]);
    } catch {
      // TODO: log error?
      return null;
    }
  }

  async authorize(password: string): Promise<boolean> {
    if (!this.passhash) return false;
    return await compare(password, this.passhash);
  }

  async sendVerificationEmail(): Promise<void> {
    if (this.email_verified) return;
    // TODO: Send a confirmation email
    // BODY: After setting the users email we should send them a confirmation
    // BODY: message so we can verify that the address is, in fact, valid.
  }

  // @ts-expect-error -- this function is currently unimplemented
  async sendEmail(sender: string, title: string, body: string): Promise<void> {
    // TODO: Send an email to the user.
    // const from = `${sender}@thislooks.fun`;
  }
}
