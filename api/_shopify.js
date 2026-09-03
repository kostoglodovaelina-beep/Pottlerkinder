const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01"

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

export async function storefront(query, variables = {}) {
  const shop = requireEnv("SHOPIFY_STORE_DOMAIN")
  const token = requireEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN")
  return graphQL(`https://${shop}/api/${apiVersion}/graphql.json`, "X-Shopify-Storefront-Access-Token", token, query, variables)
}

export async function admin(query, variables = {}) {
  const shop = requireEnv("SHOPIFY_STORE_DOMAIN")
  const token = requireEnv("SHOPIFY_ADMIN_ACCESS_TOKEN")
  return graphQL(`https://${shop}/admin/api/${apiVersion}/graphql.json`, "X-Shopify-Access-Token", token, query, variables)
}

async function graphQL(url, header, token, query, variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", [header]: token },
    body: JSON.stringify({ query, variables }),
  })
  const result = await response.json()
  if (!response.ok || result.errors) throw new Error(result.errors?.[0]?.message || "Shopify request failed")
  return result.data
}

export function sendError(res, error) {
  res.status(500).json({ error: error instanceof Error ? error.message : "Server error" })
}

export function requireAdmin(req, res) {
  const expected = process.env.POTTLER_ADMIN_SECRET
  const received = req.headers.authorization?.replace("Bearer ", "")
  if (!expected || received !== expected) {
    res.status(401).json({ error: "Unauthorized" })
    return false
  }
  return true
}
