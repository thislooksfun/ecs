import type { Handle, GetSession } from "@sveltejs/kit";
import type { Locals, ClientSession } from "$lib/types";
import { signoutCookie } from "./routes/api/v1/auth/signout";
import { Session, User } from "$lib/db";
import cookie from "cookie";
import cookieSig from "cookie-signature";
import { CookieSecret } from "$lib/env";

async function parseSession(session: string, locals: Locals) {
  if (!session) return;

  const token = cookieSig.unsign(session, CookieSecret);
  if (!token) return;

  const user = await User.forSession(token);
  if (!user) return;

  await Session.updateUsage(token);

  locals.sessionToken = token;
  locals.user = user;
}

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || "");

  if (cookies.session) {
    await parseSession(cookies.session, request.locals);
  }

  // TODO https://github.com/sveltejs/kit/issues/1046
  if (request.query.has("_method")) {
    request.method = request.query.get("_method")!.toUpperCase();
  }

  const response = await resolve(request);

  // If we have an invalid session, clear it.
  if (
    cookies.session &&
    !request.locals.user &&
    !response.headers["set-cookie"]
  ) {
    response.headers["set-cookie"] = signoutCookie;
  }

  return response;
};

export const getSession: GetSession<Locals, ClientSession> = async request => {
  return {
    loggedIn: !!request.locals.user,
  };
};
