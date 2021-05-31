// Route: /api/v1/me

import type { ApiRequestHandler } from "$api/v1/_types";
import { unauthorized } from "$api/v1/_statuses";

export interface GetMeResponse {
  email: string;
}

export const get: ApiRequestHandler<any, GetMeResponse> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  return {
    body: {
      email: user.email,
    },
  };
};
