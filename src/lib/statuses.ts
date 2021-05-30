import { StatusCodes } from "http-status-codes";

export const unauthorized = {
  status: StatusCodes.UNAUTHORIZED,
  body: { errmsg: "You must be logged in" },
};

export const ok = {
  status: StatusCodes.OK,
  body: { errmsg: "Success" },
};
