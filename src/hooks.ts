import type { Handle, GetSession } from "@sveltejs/kit";
import type { Locals, Session } from "$lib/types";
import { User } from "$lib/db";
import cookie from "cookie";

export const handle: Handle = async ({ request, render }) => {
  const cookies = cookie.parse(request.headers.cookie || "");

  if (cookies.session) {
    request.locals.sessionToken = cookies.session;
    request.locals.user = await User.forSession(cookies.session);
  }

  // TODO https://github.com/sveltejs/kit/issues/1046
  if (request.query.has("_method")) {
    request.method = request.query.get("_method")!.toUpperCase();
  }

  const response = await render(request);

  return response;
};

export const getSession: GetSession<Locals, Session> = async request => {
  return {
    loggedIn: !!request.locals.user,
  };
};
