import { admin, requireAdmin, sendError } from "../_shopify.js"

const productFields = "id title handle status descriptionHtml featuredMedia { preview { image { url altText } } } variants(first:100){nodes{id title price inventoryQuantity}}"

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  try {
    if (req.method === "GET") {
      const data = await admin(`query{products(first:100,sortKey:UPDATED_AT,reverse:true){nodes{${productFields}}}}`)
      return res.status(200).json(data.products.nodes)
    }
    if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
    const { action, product, id } = req.body || {}
    const operations = {
      create: [`mutation($product:ProductCreateInput!){productCreate(product:$product){product{${productFields}} userErrors{field message}}}`, { product }],
      update: [`mutation($product:ProductUpdateInput!){productUpdate(product:$product){product{${productFields}} userErrors{field message}}}`, { product }],
      delete: [`mutation($input:ProductDeleteInput!){productDelete(input:$input){deletedProductId userErrors{field message}}}`, { input: { id } }],
    }
    if (!operations[action]) return res.status(400).json({ error: "Unknown admin action" })
    const [query, variables] = operations[action]
    const data = await admin(query, variables)
    const result = Object.values(data)[0]
    if (result.userErrors?.length) return res.status(422).json({ errors: result.userErrors })
    res.status(200).json(result)
  } catch (error) { sendError(res, error) }
}
