// Route: /api/v1/auth/signout

import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";
import { dev } from "$app/env";
import cookie from "cookie";
import { Session } from "$lib/db";

export const signoutCookie = cookie.serialize("session", "", {
  path: "/",
  httpOnly: true,
  secure: !dev,
  maxAge: -1,
});

export const post: RequestHandler<Locals> = async request => {
  const tkn = request.locals.sessionToken;
  if (tkn) await Session.revoke(tkn);

  request.locals.sessionToken = undefined;
  request.locals.user = undefined;

  return {
    body: { successful: true },
    headers: { "set-cookie": signoutCookie },
  };
};
