import type { Writable } from "svelte/store";
import type { Session } from "$lib/types";
import { session as untypedSession } from "$app/stores";

export const session: Writable<Session> = untypedSession;

export function updateSession(update: (s: Session) => void) {
  session.update(s => {
    update(s);
    return s;
  });
}
