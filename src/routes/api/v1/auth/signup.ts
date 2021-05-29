// Route: /api/v1/auth/signup

import { dev } from "$app/env";
import type { RequestHandler } from "@sveltejs/kit";
import type { Locals } from "$lib/types";
import cookie from "cookie";
import { StatusCodes } from "http-status-codes";
import { User } from "$lib/db";
import { Session } from "$lib/db/session";

const missingEmail = {
  status: StatusCodes.BAD_REQUEST,
  body: { errors: { email: "You must provide an email" } },
};

const missingPass = {
  status: StatusCodes.BAD_REQUEST,
  body: { errors: { password: "You must provide a password" } },
};

const duplicate = {
  status: StatusCodes.BAD_REQUEST,
  body: { errors: { email: "That email has already been used" } },
};

interface Body {
  email?: string;
  password?: string;
}

export const post: RequestHandler<Locals, Body> = async request => {
  // 1. Validate the credentials
  const { email, password } = request.body;
  if (!email) return missingEmail;
  if (!password) return missingPass;

  if (await User.exists(email)) return duplicate;

  // TODO: Catch and handle duplicate email errors
  const user = await User.create(email, password);

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
