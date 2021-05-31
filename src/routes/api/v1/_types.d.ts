import type { EndpointOutput } from "@sveltejs/kit";
import type { Headers } from "@sveltejs/kit/types/helper";
import type { Locals } from "$lib/types";

export interface ApiError {
  error: {
    msg?: string;
    map?: { [key: string]: any };
  };
}

export type ApiEndpointError = {
  status?: number;
  headers?: Partial<Headers>;
  body?: ApiError;
};

export type ApiEndpointOutput<T = unknown> = {
  status?: number;
  headers?: Partial<Headers>;
  body?: ApiError | T;
};

export type ApiRequestHandler<Body = unknown, ResponseBody = unknown> = (
  request: ServerRequest<Locals, Body>
) =>
  | void
  | ApiEndpointOutput<ResponseBody>
  | Promise<ApiEndpointOutput<ResponseBody>>;
