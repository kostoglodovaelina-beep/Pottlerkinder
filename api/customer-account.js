import crypto from "node:crypto"

const shop = () => {
  const value = process.env.SHOPIFY_STORE_DOMAIN
  if (!value) throw new Error("Shopify store domain is not configured")
  return value
}

const clientId = () => {
  const value = process.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID
  if (!value) throw new Error("Customer Account API Client ID is not configured")
  return value
}

const callbackUrl = () => process.env.SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL || "https://pottlerkinder.vercel.app/account/callback"
const cookieSecure = process.env.VERCEL ? "; Secure" : ""

function parseCookies(req) {
  return (req.headers.cookie || "").split(";").reduce((all, part) => {
    const [key, ...value] = part.trim().split("=")
    if (key) all[key] = decodeURIComponent(value.join("="))
    return all
  }, {})
}

function setCookie(res, name, value, maxAge = 600) {
  res.setHeader("Set-Cookie", `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${cookieSecure}`)
}

function clearCookie(res, name) {
  res.setHeader("Set-Cookie", `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${cookieSecure}`)
}

async function discovery() {
  // Shopify publishes Customer Account OAuth endpoints as OpenID metadata.
  // The former `customer-account` URL is not a Shopify discovery endpoint
  // and returns a 404 for every correctly configured shop.
  const response = await fetch(`https://${shop()}/.well-known/openid-configuration`)
  if (!response.ok) throw new Error("Customer Account API discovery failed")
  return response.json()
}

function base64url(value) {
  return Buffer.from(value).toString("base64url")
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("base64url")
}

function readSession(req) {
  const raw = parseCookies(req).pottler_customer_session
  if (!raw) return null
  try { return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) } catch { return null }
}

async function exchangeCode(req, res, code, state) {
  const pendingRaw = parseCookies(req).pottler_customer_oauth
  if (!pendingRaw) throw new Error("Die Anmeldung ist abgelaufen. Bitte starte sie erneut.")
  let pending
  try { pending = JSON.parse(Buffer.from(pendingRaw, "base64url").toString("utf8")) } catch { throw new Error("Ungültige Anmeldung") }
  if (!state || state !== pending.state) throw new Error("Die Anmeldung konnte nicht bestätigt werden.")

  const openid = await discovery()
  const response = await fetch(openid.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId(),
      redirect_uri: callbackUrl(),
      code,
      code_verifier: pending.verifier,
    }),
  })
  const result = await response.json()
  if (!response.ok || !result.access_token) throw new Error(result.error_description || "Die Anmeldung bei Shopify ist fehlgeschlagen.")
  setCookie(res, "pottler_customer_session", base64url(JSON.stringify({ accessToken: result.access_token, idToken: result.id_token || "" })), Math.max(300, Number(result.expires_in || 3600)))
  clearCookie(res, "pottler_customer_oauth")
}

const customerQuery = `query CustomerAccount {
  customer {
    id
    displayName
    firstName
    lastName
    emailAddress { emailAddress }
    phoneNumber { phoneNumber }
    defaultAddress { address1 address2 city zip country }
    orders(first: 12, reverse: true) {
      nodes { id name processedAt financialStatus fulfillmentStatus totalPrice { amount currencyCode } }
    }
  }
}`

async function getCustomer(req) {
  const session = readSession(req)
  if (!session?.accessToken) return null
  const openid = await discovery()
  const response = await fetch(openid.graphql_api, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.accessToken}` },
    body: JSON.stringify({ query: customerQuery }),
  })
  const result = await response.json()
  if (!response.ok || result.errors?.length) throw new Error(result.errors?.[0]?.message || "Customer Account API request failed")
  return result.data.customer
}

export default async function handler(req, res) {
  try {
    const action = req.query?.action
    if (action === "login") {
      const openid = await discovery()
      const verifier = base64url(crypto.randomBytes(48))
      const state = base64url(crypto.randomBytes(24))
      setCookie(res, "pottler_customer_oauth", base64url(JSON.stringify({ verifier, state })))
      const url = new URL(openid.authorization_endpoint)
      url.searchParams.set("client_id", clientId())
      url.searchParams.set("response_type", "code")
      url.searchParams.set("redirect_uri", callbackUrl())
      url.searchParams.set("scope", "openid email customer-account-api:full")
      url.searchParams.set("state", state)
      url.searchParams.set("code_challenge", sha256(verifier))
      url.searchParams.set("code_challenge_method", "S256")
      res.writeHead(302, { Location: url.toString() })
      return res.end()
    }
    if (action === "callback") {
      if (!req.query?.code) return res.status(400).json({ error: "Der Anmeldecode fehlt." })
      await exchangeCode(req, res, req.query.code, req.query.state)
      return res.status(200).json({ ok: true })
    }
    if (action === "logout") {
      clearCookie(res, "pottler_customer_session")
      return res.status(200).json({ ok: true })
    }
    if (action === "profile") {
      const customer = await getCustomer(req)
      if (!customer) return res.status(401).json({ error: "Nicht angemeldet" })
      res.setHeader("Cache-Control", "private, no-store, max-age=0")
      return res.status(200).json({ customer })
    }
    return res.status(400).json({ error: "Unknown customer account action" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Customer Account API request failed"
    if (req.query?.action === "profile") clearCookie(res, "pottler_customer_session")
    return res.status(500).json({ error: message })
  }
}
