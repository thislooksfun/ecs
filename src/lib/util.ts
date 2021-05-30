import type { ErrorResponse } from "./types";

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

export async function get<T>(
  fetch: Fetch,
  endpoint: string
): Promise<ErrorResponse | T> {
  const res = await fetch(endpoint, {
    method: "GET",
    credentials: "include",
    headers: { "content-type": "application/json" },
  });

  return await res.json();
}

export async function post<T>(
  fetch: Fetch,
  endpoint: string,
  data: any
): Promise<ErrorResponse | T> {
  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data || {}),
    headers: { "content-type": "application/json" },
  });

  return await res.json();
}
