import type { User } from "$lib/db/user";

export interface Locals {
  sessionToken?: string;
  user?: User;
}

export interface ClientSession {
  loggedIn: boolean;
}

export interface Character {
  system: string;
  name: string;
  avatarUrl: string;
}
