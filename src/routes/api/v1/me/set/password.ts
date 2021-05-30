// Route: /api/v1/me/set/password

import { ok, unauthorized } from "$lib/statuses";
import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import { StatusCodes } from "http-status-codes";

const invalid = {
  status: StatusCodes.BAD_REQUEST,
  body: { errmsg: "You must provide an old and new password" },
};

const mismatch = {
  status: StatusCodes.UNAUTHORIZED,
  body: { errmsg: "The password is incorrect" },
};

interface Body {
  oldpass?: string;
  newpass?: string;
}

export const post: RequestHandler<Locals, Body> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  const { oldpass, newpass } = request.body;
  if (!oldpass || !newpass) return invalid;

  if (!user.authorize(oldpass)) return mismatch;

  await user.updatePassword(newpass);
  return ok;
};
