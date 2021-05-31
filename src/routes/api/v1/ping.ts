// Route: /api/v1/ping

import type { ApiRequestHandler } from "$api/v1/_types";

export interface PingResponse {
  pong: number;
}

export const get: ApiRequestHandler<any, PingResponse> = () => {
  return { body: { pong: Date.now() } };
};
