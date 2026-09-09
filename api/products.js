import { admin, sendError } from "./_shopify.js"

const productFields = `
  id title handle description productType tags status
  featuredMedia { preview { image { url altText } } }
  media(first:5) { nodes { preview { image { url altText } } } }
  variants(first:100) {
    nodes {
      id title price compareAtPrice availableForSale inventoryQuantity
      inventoryItem { tracked }
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
    const sourceProducts = handle ? (data.productByHandle ? [data.productByHandle] : []) : data.products.nodes
    // Shopify Admin returns all variants, including sold-out variants. The
    // storefront must expose only variants that can actually be purchased.
    const products = sourceProducts.flatMap((product) => {
      if (!product || product.status !== "ACTIVE") return []
      const sellableVariants = (product.variants?.nodes || []).filter((variant) =>
        variant.availableForSale && (!variant.inventoryItem?.tracked || Number(variant.inventoryQuantity) > 0),
      )
      if (!sellableVariants.length) return []
      return [{ ...product, variants: { ...product.variants, nodes: sellableVariants } }]
    })
    res.status(200).json({ products })
  } catch (error) { sendError(res, error) }
}
