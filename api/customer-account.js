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

// Shopify returns directly to this server endpoint. Exchanging the code on the
// server keeps the PKCE cookie in the same navigation and avoids browser races.
const callbackUrl = () => process.env.SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL || "https://pottlerkinder.vercel.app/api/customer-account?action=callback"
const cookieSecure = process.env.VERCEL ? "; Secure" : ""

function parseCookies(req) {
  return (req.headers.cookie || "").split(";").reduce((all, part) => {
    const [key, ...value] = part.trim().split("=")
    if (key) all[key] = decodeURIComponent(value.join("="))
    return all
  }, {})
}

function appendCookie(res, value) {
  const current = res.getHeader("Set-Cookie")
  const cookies = Array.isArray(current) ? current : current ? [String(current)] : []
  res.setHeader("Set-Cookie", [...cookies, value])
}

function setCookie(res, name, value, maxAge = 600) {
  appendCookie(res, `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${cookieSecure}`)
}

function clearCookie(res, name) {
  appendCookie(res, `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${cookieSecure}`)
}

async function discovery() {
  // Shopify publishes Customer Account OAuth endpoints as OpenID metadata.
  // The former `customer-account` URL is not a Shopify discovery endpoint
  // and returns a 404 for every correctly configured shop.
  const response = await fetch(`https://${shop()}/.well-known/openid-configuration`)
  if (!response.ok) throw new Error("Customer Account API discovery failed")
  return response.json()
}

async function customerApiDiscovery() {
  const response = await fetch(`https://${shop()}/.well-known/customer-account-api`)
  if (!response.ok) throw new Error("Customer Account API configuration could not be loaded")
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
    defaultAddress { id address1 address2 city zip country phoneNumber }
    addresses(first: 3) { nodes { id firstName lastName address1 address2 city zip country territoryCode phoneNumber } }
    orders(first: 12, reverse: true) {
      nodes { id name processedAt financialStatus fulfillmentStatus totalPrice { amount currencyCode } }
    }
  }
}`

async function customerApiRequest(req, query, variables = {}) {
  const session = readSession(req)
  if (!session?.accessToken) throw new Error("Nicht angemeldet")
  const customerApi = await customerApiDiscovery()
  const response = await fetch(customerApi.graphql_api, {
    method: "POST",
    // Customer Account API expects the raw access token, not the OAuth Bearer prefix.
    headers: { "Content-Type": "application/json", Authorization: session.accessToken },
    body: JSON.stringify({ query, variables }),
  })
  const result = await response.json()
  if (!response.ok || result.errors?.length) throw new Error(result.errors?.[0]?.message || "Customer Account API request failed")
  return result.data
}

async function getCustomer(req) {
  if (!readSession(req)?.accessToken) return null
  const result = await customerApiRequest(req, customerQuery)
  return result.customer
}

async function saveRegistration(req) {
  const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}
  const details = { firstName: String(raw.firstName || "").trim(), lastName: String(raw.lastName || "").trim(), address1: String(raw.address1 || "").trim(), address2: String(raw.address2 || "").trim(), zip: String(raw.zip || "").trim(), city: String(raw.city || "").trim(), phoneNumber: String(raw.phoneNumber || "").trim() }
  if (!details.firstName || !details.lastName || !details.address1 || !details.zip || !details.city) throw new Error("Bitte fülle alle Pflichtfelder aus.")
  const update = await customerApiRequest(req, "mutation UpdateCustomer($input: CustomerUpdateInput!) { customerUpdate(input: $input) { userErrors { message } } }", { input: { firstName: details.firstName, lastName: details.lastName } })
  if (update.customerUpdate?.userErrors?.length) throw new Error(update.customerUpdate.userErrors[0].message)
  const address = await customerApiRequest(req, "mutation CreateAddress($address: CustomerAddressInput!, $defaultAddress: Boolean) { customerAddressCreate(address: $address, defaultAddress: $defaultAddress) { userErrors { message } } }", { address: { firstName: details.firstName, lastName: details.lastName, address1: details.address1, address2: details.address2 || undefined, zip: details.zip, city: details.city, territoryCode: "DE", phoneNumber: details.phoneNumber || undefined }, defaultAddress: true })
  if (address.customerAddressCreate?.userErrors?.length) throw new Error(address.customerAddressCreate.userErrors[0].message)
}

function body(req) { return typeof req.body === "string" ? JSON.parse(req.body) : req.body || {} }
function addressInput(value) {
  return { firstName: String(value.firstName || "").trim() || undefined, lastName: String(value.lastName || "").trim() || undefined, address1: String(value.address1 || "").trim(), address2: String(value.address2 || "").trim() || undefined, zip: String(value.zip || "").trim(), city: String(value.city || "").trim(), territoryCode: "DE", phoneNumber: value.phoneNumber ? String(value.phoneNumber).trim() : null }
}
async function ensureMutation(data, key) {
  const errors = data[key]?.userErrors
  if (errors?.length) throw new Error(errors[0].message)
}
async function manageCustomer(req, action) {
  const value = body(req)
  const customer = await getCustomer(req)
  if (!customer) throw new Error("Nicht angemeldet")
  if (action === "update-profile") {
    const data = await customerApiRequest(req, "mutation($input:CustomerUpdateInput!){customerUpdate(input:$input){userErrors{message}}}", { input: { firstName: String(value.firstName || "").trim() || null, lastName: String(value.lastName || "").trim() || null } })
    await ensureMutation(data, "customerUpdate")
  }
  if (action === "create-address") {
    if ((customer.addresses?.nodes?.length || 0) >= 3) throw new Error("Du kannst maximal drei Adressen speichern.")
    const data = await customerApiRequest(req, "mutation($address:CustomerAddressInput!){customerAddressCreate(address:$address){userErrors{message}}}", { address: addressInput(value) })
    await ensureMutation(data, "customerAddressCreate")
  }
  if (action === "update-address") {
    if (!customer.addresses?.nodes?.some((item) => item.id === value.id)) throw new Error("Adresse nicht gefunden")
    const data = await customerApiRequest(req, "mutation($addressId:ID!,$address:CustomerAddressInput){customerAddressUpdate(addressId:$addressId,address:$address){userErrors{message}}}", { addressId: value.id, address: addressInput(value) })
    await ensureMutation(data, "customerAddressUpdate")
  }
  if (action === "delete-address") {
    if (!customer.addresses?.nodes?.some((item) => item.id === value.id)) throw new Error("Adresse nicht gefunden")
    const data = await customerApiRequest(req, "mutation($addressId:ID!){customerAddressDelete(addressId:$addressId){userErrors{message}}}", { addressId: value.id })
    await ensureMutation(data, "customerAddressDelete")
  }
  return getCustomer(req)
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
      res.writeHead(302, { Location: "/account?section=overview" })
      return res.end()
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
    if (action === "complete-registration" && req.method === "POST") {
      await saveRegistration(req)
      return res.status(200).json({ ok: true })
    }
    if (["update-profile", "create-address", "update-address", "delete-address"].includes(action) && req.method === "POST") {
      const customer = await manageCustomer(req, action)
      return res.status(200).json({ customer })
    }
    return res.status(400).json({ error: "Unknown customer account action" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Customer Account API request failed"
    if (req.query?.action === "profile") clearCookie(res, "pottler_customer_session")
    return res.status(500).json({ error: message })
  }
}
