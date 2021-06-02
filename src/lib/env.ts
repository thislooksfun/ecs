import { config } from "dotenv";
config();

// Using string keys pending vitejs/vite#3176
export const DatabaseUrl = process.env["DATABASE_URL"]!;
export const CookieSecret = process.env["COOKIE_SECRET"]!;
