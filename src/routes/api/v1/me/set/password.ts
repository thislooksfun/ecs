// Route: /api/v1/me/set/password

import type { ApiEndpointError, ApiRequestHandler } from "$api/v1/_types";
import { ok, unauthorized } from "$api/v1/_statuses";
import { StatusCodes } from "http-status-codes";

const invalid: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { msg: "You must provide an old and new password" } },
};

const mismatch: ApiEndpointError = {
  status: StatusCodes.UNAUTHORIZED,
  body: { error: { msg: "The password is incorrect" } },
};

interface Body {
  oldpass?: string;
  newpass?: string;
}

// Expected body: { oldpass: string, newpass: string }
export const post: ApiRequestHandler<Body> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  const { oldpass, newpass } = request.body;
  if (!oldpass || !newpass) return invalid;

  if (!user.authorize(oldpass)) return mismatch;

  await user.updatePassword(newpass);
  return ok;
};
