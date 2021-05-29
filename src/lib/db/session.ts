import { del, insert } from "./connection";

const oneMinute = 60;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
const oneMonth = 30 * oneDay;
const sixMonths = 6 * oneMonth;

export class Session {
  static async create(userid: number): Promise<string> {
    const unixNow = Math.floor(Date.now() / 1000);
    const expires = unixNow + sixMonths;
    const { rows } = await insert("sessions", { userid, expires }, "token");
    return rows[0].token;
  }

  static async revoke(token: string): Promise<void> {
    await del("sessions", { token });
  }
}
