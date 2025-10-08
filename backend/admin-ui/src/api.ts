const BASE = import.meta.env.VITE_API_BASE ?? "";

export async function api<T>(path: string, init: RequestInit = {}) {
  const r = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-admin-key": import.meta.env.VITE_ADMIN_KEY!,
      ...(init.headers || {})
    }
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json() as Promise<T>;
}

export const Products = {
  list: () => api<any[]>("/api/products"),
  create: (p: any) => api<any>("/api/admin/products", { method: "POST", body: JSON.stringify(p) }),
  update: (id: number, p: any) => api<any>(`/api/admin/products/${id}`, { method: "PUT", body: JSON.stringify(p) }),
  remove: (id: number) => api<{ok:boolean}>(`/api/admin/products/${id}`, { method: "DELETE" })
};

export const Promotions = {
  list: () => api<any[]>("/api/promotions"),
  create: (p:any) => api<any>("/api/admin/promotions", { method:"POST", body: JSON.stringify(p) }),
};

export const Popups = {
  list: () => api<any[]>("/api/popups"),
  create: (p:any) => api<any>("/api/admin/popups", { method:"POST", body: JSON.stringify(p) }),
};
