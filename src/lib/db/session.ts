import { del, insert, update } from "./connection";
import { v4 as uuidSecure } from "@lukeed/uuid/secure";

export class Session {
  static async create(userid: number): Promise<string> {
    const unixNow = Math.floor(Date.now() / 1000);
    const token = uuidSecure();
    await insert("sessions", { token, userid, last_used: unixNow });
    return token;
  }

  static async updateUsage(token: string): Promise<void> {
    const unixNow = Math.floor(Date.now() / 1000);
    await update("sessions", { last_used: unixNow }, { token });
  }

  static async revoke(token: string): Promise<void> {
    await del("sessions", { token });
  }
}
