import { insert, select, selectExists } from "./connection";
import { compare, hash } from "$lib/passhash";

interface UserData {
  id: number;
  email: string;
  passhash?: string;
}

export class User implements UserData {
  id: number;
  email: string;
  passhash?: string;

  private constructor(data: UserData) {
    this.id = data.id;
    this.email = data.email;
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
}
