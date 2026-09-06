import { sendError, storefront } from "./_shopify.js"

const productFields = `
  id title handle description productType tags
  featuredImage { url altText }
  images(first:5) { nodes { url altText } }
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
    // Public storefront data must never be fetched with the Admin API. The
    // Storefront API only exposes products that are published to this channel.
    const data = await storefront(query, handle ? { handle } : {})
    const products = handle ? (data.productByHandle ? [data.productByHandle] : []) : data.products.nodes
    res.status(200).json({ products })
  } catch (error) { sendError(res, error) }
}
