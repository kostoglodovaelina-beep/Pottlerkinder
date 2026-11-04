import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import {
  NEWSLETTER_CONSENT,
  submitNewsletter,
  validateNewsletter,
} from "../src/lib/newsletter.ts"
import { WEB3FORMS_ENDPOINT } from "../src/lib/web3forms.ts"

const key = "11111111-1111-4111-8111-111111111111"
const values = { email: "erika@example.com", consent: true, website: "" }

test("newsletter button is enabled before setup and idle footer has no service notices", () => {
  const component = readFileSync(
    new URL("../src/components/NewsletterForm.tsx", import.meta.url),
    "utf8",
  )
  assert.match(component, /disabled=\{pending\}/)
  assert.doesNotMatch(
    component,
    /configured|newsletter-note|newsletter-setup|Anfrage über Web3Forms|Die Anfragefunktion wird/,
  )
  assert.match(component, /submitNewsletter\(accessKey/)
  assert.match(component, /href="\/datenschutz"/)
})

test("newsletter requires a valid email and explicit marketing consent", () => {
  assert.deepEqual(validateNewsletter(values), {})
  assert.deepEqual(
    Object.keys(validateNewsletter({ ...values, email: "", consent: false })),
    ["email", "consent"],
  )
  assert.ok(validateNewsletter({ ...values, email: "not-an-email" }).email)
})

test("newsletter delivers a request with consent wording, not a confirmed subscription", async () => {
  let payload
  await submitNewsletter(key, values, undefined, async (url, options) => {
    assert.equal(url, WEB3FORMS_ENDPOINT)
    payload = JSON.parse(options.body)
    assert.equal(options.credentials, "omit")
    return new Response('{"success":true}', { status: 200 })
  })
  assert.equal(payload.form_type, "newsletter_request")
  assert.equal(payload.access_key, key)
  assert.equal(payload.email, values.email)
  assert.equal(payload.replyto, values.email)
  assert.equal(payload.consent_text, NEWSLETTER_CONSENT)
  assert.equal(payload.consent, true)
  assert.equal(payload.botcheck, false)
  assert.equal(Number.isNaN(Date.parse(payload.requested_at)), false)
  assert.match(payload.message, /keine bestätigte Anmeldung/)
  assert.equal(payload.subscribed, undefined)
})

test("newsletter validation and honeypot prevent network submissions", async () => {
  let calls = 0
  const fetcher = async () => {
    calls++
    return new Response('{"success":true}')
  }
  await assert.rejects(
    submitNewsletter(key, { ...values, consent: false }, undefined, fetcher),
    /Einwilligung/,
  )
  await assert.rejects(
    submitNewsletter(key, { ...values, website: "spam" }, undefined, fetcher),
    /Einwilligung/,
  )
  assert.equal(calls, 0)
})

test("newsletter never treats a failed provider response as a subscription", async () => {
  await assert.rejects(
    submitNewsletter(
      key,
      values,
      undefined,
      async () => new Response('{"success":false}', { status: 200 }),
    ),
    /nicht übermittelt/,
  )
  await assert.rejects(submitNewsletter("", values), /nicht übermittelt/)
})
