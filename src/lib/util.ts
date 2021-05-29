export async function post(endpoint: string, data: any) {
  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data || {}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
