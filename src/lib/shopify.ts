type CartLine = { merchandiseId: string; quantity: number }

async function api<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || data.errors?.[0]?.message || "Shopify request failed")
  return data
}

export const shopCart = {
  get: (cartId: string) => api<{ cart: unknown }>("/api/cart", { action: "get", cartId }),
  create: (lines: CartLine[]) => api<{ cart: unknown }>("/api/cart", { action: "create", lines }),
  add: (cartId: string, lines: CartLine[]) => api<{ cart: unknown }>("/api/cart", { action: "add", cartId, lines }),
  update: (cartId: string, lines: { id: string; quantity: number }[]) => api<{ cart: unknown }>("/api/cart", { action: "update", cartId, lines }),
  remove: (cartId: string, lines: string[]) => api<{ cart: unknown }>("/api/cart", { action: "remove", cartId, lines }),
  detach: (cartId: string) => api<{ cart: unknown }>("/api/cart", { action: "detach", cartId }),
}
