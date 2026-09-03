import { sendError, storefront } from "./_shopify.js"

const cartFields = `id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } lines(first:100) { edges { node { id quantity merchandise { ... on ProductVariant { id title product { title handle featuredImage { url altText } } } } } } } userErrors { field message } warnings { code message }`

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  try {
    const { action, cartId, lines = [] } = req.body || {}
    const mutations = {
      create: [`mutation($input:CartInput!){cartCreate(input:$input){${cartFields}}}`, { input: { lines } }],
      add: [`mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){${cartFields}}}`, { cartId, lines }],
      update: [`mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$cartId,lines:$lines){${cartFields}}}`, { cartId, lines }],
      remove: [`mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){${cartFields}}}`, { cartId, lineIds: lines }],
    }
    if (!mutations[action]) return res.status(400).json({ error: "Unknown cart action" })
    const [query, variables] = mutations[action]
    const data = await storefront(query, variables)
    const result = Object.values(data)[0]
    if (result.userErrors?.length) return res.status(422).json({ errors: result.userErrors })
    res.status(200).json({ cart: result })
  } catch (error) { sendError(res, error) }
}
