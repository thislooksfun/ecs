import type { Writable } from "svelte/store";
import type { ClientSession } from "$lib/types";
import type { ApiError } from "$api/v1/_types";
import { browser } from "$app/env";
import { session as untypedSession } from "$app/stores";
import * as util from "$lib/util";

function ensureBrowser() {
  if (!browser) {
    throw new Error("This method can only be used in the browser");
  }
}

export const session: Writable<ClientSession> = untypedSession;

export function updateSession(update: (s: ClientSession) => void) {
  session.update(s => {
    update(s);
    return s;
  });
}

export async function get<T = {}>(endpoint: string): Promise<ApiError | T> {
  ensureBrowser();
  return await util.get<T>(fetch, endpoint);
}

export async function post<T = {}>(
  endpoint: string,
  data: any
): Promise<ApiError | T> {
  ensureBrowser();
  return await util.post<T>(fetch, endpoint, data);
}
