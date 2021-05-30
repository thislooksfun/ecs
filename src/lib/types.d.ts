import type { User } from "$lib/db/user";

export interface ErrorResponse {
  errors: any;
}

export interface Locals {
  sessionToken?: string;
  user?: User;
}

export interface Session {
  loggedIn: boolean;
}
