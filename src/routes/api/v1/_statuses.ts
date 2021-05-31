import type { ApiEndpointError, ApiEndpointOutput } from "$api/v1/_types";
import { StatusCodes } from "http-status-codes";

export const unauthorized: ApiEndpointError = {
  status: StatusCodes.UNAUTHORIZED,
  body: { error: { msg: "You must be logged in" } },
};

export const ok: ApiEndpointOutput = { status: StatusCodes.OK };
