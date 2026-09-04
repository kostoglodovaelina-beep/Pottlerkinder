import { sendError, storefront } from "./_shopify.js"

const cartFields = `id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } lines(first:100) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title handle featuredImage { url altText } } } } } } }`
const cartPayload = `cart { ${cartFields} } userErrors { field message } warnings { code message }`

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  try {
    const { action, cartId, lines = [] } = req.body || {}
    const mutations = {
      get: [`query($cartId:ID!){cart(id:$cartId){${cartFields}}}`, { cartId }],
      create: [`mutation($input:CartInput!){cartCreate(input:$input){${cartPayload}}}`, { input: { lines } }],
      add: [`mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){${cartPayload}}}`, { cartId, lines }],
      update: [`mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$cartId,lines:$lines){${cartPayload}}}`, { cartId, lines }],
      remove: [`mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){${cartPayload}}}`, { cartId, lineIds: lines }],
    }
    if (!mutations[action]) return res.status(400).json({ error: "Unknown cart action" })
    const [query, variables] = mutations[action]
    const data = await storefront(query, variables)
    if (action === "get") return res.status(200).json({ cart: data.cart })
    const result = Object.values(data)[0]
    if (result.userErrors?.length) return res.status(422).json({ errors: result.userErrors })
    res.status(200).json({ cart: result.cart })
  } catch (error) { sendError(res, error) }
}
