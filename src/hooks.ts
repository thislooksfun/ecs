import type { Handle, GetSession } from "@sveltejs/kit";
import type { Locals, Session } from "$lib/types";
import { signoutCookie } from "./routes/api/v1/auth/signout";
import { User } from "$lib/db";
import cookie from "cookie";
import cookieSig from "cookie-signature";
import { CookieSecret } from "$lib/env";

async function parseSession(session: string, locals: Locals) {
  if (!session) return;

  const token = cookieSig.unsign(session, CookieSecret);
  if (!token) return;

  const user = await User.forSession(token);
  if (!user) return;

  locals.sessionToken = token;
  locals.user = user;
}

export const handle: Handle = async ({ request, render }) => {
  const cookies = cookie.parse(request.headers.cookie || "");

  if (cookies.session) {
    await parseSession(cookies.session, request.locals);
  }

  // TODO https://github.com/sveltejs/kit/issues/1046
  if (request.query.has("_method")) {
    request.method = request.query.get("_method")!.toUpperCase();
  }

  const response = await render(request);

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

export const getSession: GetSession<Locals, Session> = async request => {
  return {
    loggedIn: !!request.locals.user,
  };
};
