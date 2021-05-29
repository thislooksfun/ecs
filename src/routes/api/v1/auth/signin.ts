// Route: /api/v1/auth/signin

import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import { dev } from "$app/env";
import { StatusCodes } from "http-status-codes";
import { User, Session } from "$lib/db";
import cookie from "cookie";

const invalid = {
  status: StatusCodes.BAD_REQUEST,
  body: { errmsg: "Invalid email or password" },
};

interface Body {
  email?: string;
  password?: string;
}

export const post: RequestHandler<Locals, Body> = async request => {
  const { email, password } = request.body;
  if (!email || !password) return invalid;

  const user = await User.forEmail(email);
  if (!user) return invalid;
  if (!(await user.authorize(password))) return invalid;

  request.locals.user = user;
  const tkn = await Session.create(user.id);
  return {
    body: { successful: true },
    headers: {
      "set-cookie": cookie.serialize("session", tkn, {
        path: "/",
        httpOnly: true,
        secure: !dev,
        // TODO: Set a long maxage if the user
        // maxAge: 2592000,
      }),
    },
  };
};
