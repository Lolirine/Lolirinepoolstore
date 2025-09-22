export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const base = import.meta.env.VITE_INGEST_API;
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// Exemple d'utilisation :
export function upsertCustomer(data: {
  external_id: string; email: string; full_name?: string; meta?: any;
}) {
  return postJSON("/ingest/customer", data);
}
