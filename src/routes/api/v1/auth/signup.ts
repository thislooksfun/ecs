// Route: /api/v1/auth/signup

import type { ApiEndpointError, ApiRequestHandler } from "$api/v1/_types";
import { dev } from "$app/env";
import cookie from "cookie";
import { StatusCodes } from "http-status-codes";
import { User } from "$lib/db";
import { Session } from "$lib/db/session";
import cookieSig from "cookie-signature";
import { CookieSecret } from "$lib/env";

const missingEmail: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { map: { email: "You must provide an email" } } },
};

const missingPass: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { map: { password: "You must provide a password" } } },
};

const duplicate: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { map: { email: "That email has already been used" } } },
};

interface Body {
  email?: string;
  password?: string;
}

export const post: ApiRequestHandler<Body> = async request => {
  // 1. Validate the credentials
  const { email, password } = request.body;
  if (!email) return missingEmail;
  if (!password) return missingPass;

  if (await User.exists(email)) return duplicate;

  // TODO: Catch and handle duplicate email errors
  const user = await User.create(email, password);

  request.locals.user = user;
  const tkn = await Session.create(user.id);
  const session = cookieSig.sign(tkn, CookieSecret);

  return {
    body: { successful: true },
    headers: {
      "set-cookie": cookie.serialize("session", session, {
        path: "/",
        httpOnly: true,
        secure: !dev,
        // TODO: Set a long maxage if the user
        // maxAge: 2592000,
      }),
    },
  };
};
