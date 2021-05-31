// Route: /api/v1/me/set/email

import type { ApiEndpointError, ApiRequestHandler } from "$api/v1/_types";
import { ok, unauthorized } from "$api/v1/_statuses";
import { StatusCodes } from "http-status-codes";

const invalid: ApiEndpointError = {
  status: StatusCodes.BAD_REQUEST,
  body: { error: { map: { email: "You must provide an email" } } },
};

interface Body {
  email?: string;
}

// Expected body: { email: string }
export const post: ApiRequestHandler<Body> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  const { email } = request.body;
  if (!email) return invalid;

  await user.updateEmail(email);
  return ok;
};
