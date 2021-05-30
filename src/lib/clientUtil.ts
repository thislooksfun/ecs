import type { Writable } from "svelte/store";
import type { ErrorResponse, Session } from "$lib/types";
import { browser } from "$app/env";
import { session as untypedSession } from "$app/stores";
import * as util from "$lib/util";

function ensureBrowser() {
  if (!browser) {
    throw new Error("This method can only be used in the browser");
  }
}

export const session: Writable<Session> = untypedSession;

export function updateSession(update: (s: Session) => void) {
  session.update(s => {
    update(s);
    return s;
  });
}

export async function get<T>(endpoint: string): Promise<ErrorResponse | T> {
  ensureBrowser();
  return await util.get(fetch, endpoint);
}

export async function post<T>(
  endpoint: string,
  data: any
): Promise<ErrorResponse | T> {
  ensureBrowser();
  return await util.post(fetch, endpoint, data);
}
