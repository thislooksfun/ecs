// Route: /api/v1/auth/signin

import type { ApiEndpointError, ApiRequestHandler } from "$api/v1/_types";
import { dev } from "$app/env";
import { StatusCodes } from "http-status-codes";
import { User, Session } from "$lib/db";
import cookie from "cookie";
import { ok } from "$api/v1/_statuses";

const invalid: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { msg: "Invalid email or password" } },
};

interface Body {
  email?: string;
  password?: string;
}

export const post: ApiRequestHandler<Body> = async request => {
  const { email, password } = request.body;
  if (!email || !password) return invalid;

  const user = await User.forEmail(email);
  if (!user) return invalid;
  if (!(await user.authorize(password))) return invalid;

  request.locals.user = user;
  const tkn = await Session.create(user.id);

  const res = ok;
  res.headers = {
    "set-cookie": cookie.serialize("session", tkn, {
      path: "/",
      httpOnly: true,
      secure: !dev,
      // TODO: Set a long maxage if the user checks 'remember me'
      // maxAge: 2592000,
    }),
  };

  return res;
};
