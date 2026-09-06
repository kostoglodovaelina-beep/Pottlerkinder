import { admin, sendError } from "./_shopify.js"

const productFields = `
  id title handle description productType tags
  featuredMedia { preview { image { url altText } } }
  media(first:5) { nodes { preview { image { url altText } } } }
  variants(first:100) {
    nodes {
      id title price compareAtPrice availableForSale
      selectedOptions { name value }
    }
  }
`

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" })
  try {
    const handle = typeof req.query.handle === "string" ? req.query.handle : null
    const query = handle
      ? `query($handle:String!){productByHandle(handle:$handle){${productFields}}}`
      : `query{products(first:250,sortKey:UPDATED_AT,reverse:true){nodes{${productFields}}}}`
    // This route is server-side only. The Admin token never reaches the
    // browser and lets the custom storefront list the products you manage in
    // Shopify, without requiring a separate Headless sales-channel publish.
    const data = await admin(query, handle ? { handle } : {})
    const products = handle ? (data.productByHandle ? [data.productByHandle] : []) : data.products.nodes
    res.status(200).json({ products })
  } catch (error) { sendError(res, error) }
}
