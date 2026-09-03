import { sendError, storefront } from "./_shopify.js"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" })
  try {
    const { action, input } = req.body || {}
    const operations = {
      register: [`mutation($input:CustomerCreateInput!){customerCreate(input:$input){customer{id email firstName lastName} customerUserErrors{field message code}}}`, { input }],
      login: [`mutation($input:CustomerAccessTokenCreateInput!){customerAccessTokenCreate(input:$input){customerAccessToken{accessToken expiresAt} customerUserErrors{field message code}}}`, { input }],
      recover: [`mutation($email:String!){customerRecover(email:$email){customerUserErrors{field message code}}}`, { email: input?.email }],
    }
    if (!operations[action]) return res.status(400).json({ error: "Unknown account action" })
    const [query, variables] = operations[action]
    const data = await storefront(query, variables)
    const result = Object.values(data)[0]
    const errors = result.customerUserErrors || []
    if (errors.length) return res.status(422).json({ errors })
    res.status(200).json(result)
  } catch (error) { sendError(res, error) }
}
