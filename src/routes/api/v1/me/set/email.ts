// Route: /api/v1/me/set/email

import { ok, unauthorized } from "$lib/statuses";
import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import { StatusCodes } from "http-status-codes";

const invalid = {
  status: StatusCodes.BAD_REQUEST,
  body: { errmsg: "You must provide an email" },
};

interface Body {
  email?: string;
}

export const post: RequestHandler<Locals, Body> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  const { email } = request.body;
  if (!email) return invalid;

  await user.updateEmail(email);
  return ok;
};
