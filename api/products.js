import { admin, sendError } from "./_shopify.js"

const productFields = `
  id title handle description productType tags
  featuredMedia { preview { image { url altText } } }
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
    const data = await admin(query, handle ? { handle } : {})
    const products = handle ? (data.productByHandle ? [data.productByHandle] : []) : data.products.nodes
    res.status(200).json({ products })
  } catch (error) { sendError(res, error) }
}
