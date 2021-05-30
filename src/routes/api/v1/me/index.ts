// Route: /api/v1/me

import { unauthorized } from "$lib/statuses";
import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals> = async request => {
  const user = request.locals.user;
  if (!user) return unauthorized;

  return {
    body: {
      email: user.email,
    },
  };
};
