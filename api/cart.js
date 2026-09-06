import { sendError, storefront } from "./_shopify.js"

const cartFields = `id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } lines(first:100) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title handle featuredImage { url altText } } } } } } }`
const cartPayload = `cart { ${cartFields} } userErrors { field message } warnings { code message }`

// The customer session is intentionally HttpOnly: the browser never receives
// the token, but this server route can safely attach it to a Shopify cart.
function customerAccessToken(req) {
  const cookie = (req.headers.cookie || "").split(";").find((part) => part.trim().startsWith("pottler_customer_session="))
  if (!cookie) return null
  try {
    const raw = decodeURIComponent(cookie.slice(cookie.indexOf("=") + 1).trim())
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")).accessToken || null
  } catch { return null }
}

function validId(value) {
  return typeof value === "string" && value.length > 10 && value.length < 500
}

function validateCartRequest(action, cartId, lines) {
  if (["get", "add", "update", "remove", "detach"].includes(action) && !validId(cartId)) throw new Error("Invalid cart")
  if (!Array.isArray(lines) || lines.length > 20) throw new Error("Invalid cart lines")
  if (["create", "add"].includes(action) && !lines.every((line) => validId(line?.merchandiseId) && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 20)) throw new Error("Invalid cart lines")
  if (action === "update" && !lines.every((line) => validId(line?.id) && Number.isInteger(line.quantity) && line.quantity >= 0 && line.quantity <= 20)) throw new Error("Invalid cart lines")
  if (action === "remove" && !lines.every(validId)) throw new Error("Invalid cart lines")
}

async function syncCartBuyerIdentity(cart, token) {
  if (!cart?.id) return cart
  try {
    const data = await storefront(
      `mutation($cartId:ID!,$buyerIdentity:CartBuyerIdentityInput!){cartBuyerIdentityUpdate(cartId:$cartId,buyerIdentity:$buyerIdentity){${cartPayload}}}`,
      // Clearing the token on logout is as important as setting it on login:
      // a shared browser must never carry the previous buyer into checkout.
      { cartId: cart.id, buyerIdentity: { customerAccessToken: token || null, countryCode: "DE" } },
    )
    const result = data.cartBuyerIdentityUpdate
    return result?.userErrors?.length ? cart : result?.cart || cart
  } catch {
    // An expired customer token must not make a valid cart unusable.
    return cart
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  try {
    const { action, cartId, lines = [] } = req.body || {}
    validateCartRequest(action, cartId, lines)
    const token = customerAccessToken(req)
    if (action === "detach") {
      const data = await storefront(`query($cartId:ID!){cart(id:$cartId){${cartFields}}}`, { cartId })
      return res.status(200).json({ cart: await syncCartBuyerIdentity(data.cart, null) })
    }
    const mutations = {
      get: [`query($cartId:ID!){cart(id:$cartId){${cartFields}}}`, { cartId }],
      create: [`mutation($input:CartInput!){cartCreate(input:$input){${cartPayload}}}`, { input: { lines, ...(token ? { buyerIdentity: { customerAccessToken: token, countryCode: "DE" } } : {}) } }],
      add: [`mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){${cartPayload}}}`, { cartId, lines }],
      update: [`mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$cartId,lines:$lines){${cartPayload}}}`, { cartId, lines }],
      remove: [`mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){${cartPayload}}}`, { cartId, lineIds: lines }],
    }
    if (!mutations[action]) return res.status(400).json({ error: "Unknown cart action" })
    const [query, variables] = mutations[action]
    const data = await storefront(query, variables)
    if (action === "get") return res.status(200).json({ cart: await syncCartBuyerIdentity(data.cart, token) })
    const result = Object.values(data)[0]
    if (result.userErrors?.length) return res.status(422).json({ errors: result.userErrors })
    res.status(200).json({ cart: await syncCartBuyerIdentity(result.cart, token) })
  } catch (error) { sendError(res, error) }
}
