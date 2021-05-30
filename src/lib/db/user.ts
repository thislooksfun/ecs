import { insert, select, selectExists, update } from "./connection";
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
    const user = new User(rows[0]);
    await user.sendVerificationEmail();
    return user;
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

  async updateEmail(email: string): Promise<void> {
    if (email === this.email) return;

    // TODO: Send an notification to the old email
    // BODY: When the email is changed we should notify the old email address
    // BODY: and give a way to restore their account, just in case it was
    // BODY: changed maliciously.

    // const oldEmail = this.email;
    await this.updateAndSave({ email, email_verified: false });

    await this.sendEmail(
      "accounts",
      "Your ecs email has been changed",
      // TODO: add a working 'click here' link to set the username back to the
      // previous value and change the password.
      // `Your ecs' account's email has been changed from ${oldEmail} to ${email}. If this was you then you can ignore this email. If it was not, please click here to secure your account.`
      "TODO"
    );
    await this.sendVerificationEmail();
  }

  async updatePassword(password: string): Promise<void> {
    let passhash = await hash(password);
    await this.updateAndSave({ passhash });
    await this.sendEmail(
      "accounts",
      "Your ecs password has been changed",
      //  TODO: Add a message with a link to reset the password.
      "TODO"
    );
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

  private async updateAndSave(
    data: Partial<Omit<UserData, "id">>
  ): Promise<void> {
    // Do this first in case it fails.
    await update("users", data, { id: this.id });

    if ("email" in data) this.email = data.email!;
    if ("email_verified" in data) this.email_verified = data.email_verified!;
    if ("passhash" in data) this.passhash = data.passhash;
  }
}
