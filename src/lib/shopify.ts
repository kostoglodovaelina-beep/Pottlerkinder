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
}

export const shopAccount = {
  register: (input: { firstName: string; lastName: string; email: string; password: string }) => api("/api/account", { action: "register", input }),
  login: (input: { email: string; password: string }) => api("/api/account", { action: "login", input }),
  recover: (email: string) => api("/api/account", { action: "recover", input: { email } }),
}
