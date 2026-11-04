import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  EMPTY_CONTACT,
  submitContact,
  validateContact,
} from "../src/lib/contact.ts"
import { hasWeb3FormsKey, WEB3FORMS_ENDPOINT } from "../src/lib/web3forms.ts"

const key = "11111111-1111-4111-8111-111111111111"

const valid = {
  ...EMPTY_CONTACT,
  firstName: "Erika",
  lastName: "Mustermann",
  email: "erika@example.com",
  subject: "Frage zu einer Bestellung",
  message: "Ich habe eine Frage zu meiner Bestellung.",
  privacy: true,
}

test("contact has release copy and an enabled submit button without setup notices", () => {
  const component = readFileSync(
    new URL("../src/components/ContactPageContent.tsx", import.meta.url),
    "utf8",
  )
  assert.doesNotMatch(
    component,
    /configured|contact-setup-note|wird noch eingerichtet/,
  )
  assert.match(component, /disabled=\{status === "sending"\}/)
  assert.match(component, /Web3Forms/)
  assert.match(component, /href="\/datenschutz"/)
})

test("contact form validates all required fields and optional phone", () => {
  assert.deepEqual(Object.keys(validateContact(EMPTY_CONTACT)), [
    "firstName",
    "lastName",
    "email",
    "subject",
    "message",
    "privacy",
  ])
  assert.deepEqual(validateContact(valid), {})
  assert.ok(validateContact({ ...valid, email: "keine-adresse" }).email)
  assert.ok(validateContact({ ...valid, message: "kurz" }).message)
  assert.ok(validateContact({ ...valid, subject: " ".repeat(10) }).subject)
  assert.ok(validateContact({ ...valid, message: "x".repeat(5001) }).message)
  assert.ok(validateContact({ ...valid, phone: "1".repeat(41) }).phone)
})

test("Web3Forms configuration accepts an access key, never an endpoint URL", () => {
  assert.equal(hasWeb3FormsKey(key), true)
  assert.equal(hasWeb3FormsKey(`  ${key}  `), true)
  assert.equal(WEB3FORMS_ENDPOINT, "https://api.web3forms.com/submit")
  for (const value of [
    "",
    "https://example.com/access-key",
    "https://api.web3forms.com/submit",
    "YOUR_ACCESS_KEY_HERE",
    "../invalid-access-key",
    "javascript:alert(1)",
  ])
    assert.equal(hasWeb3FormsKey(value), false)
})

test("contact uses the Web3Forms success contract, reply address and access key", async () => {
  let request
  await submitContact(key, valid, undefined, async (url, options) => {
    request = { url, options }
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  })
  assert.equal(request.url, WEB3FORMS_ENDPOINT)
  assert.equal(request.options.method, "POST")
  assert.equal(request.options.credentials, "omit")
  const data = JSON.parse(request.options.body)
  assert.equal(data.name, "Erika Mustermann")
  assert.equal(data.email, valid.email)
  assert.equal(data.replyto, valid.email)
  assert.equal(data.message, valid.message)
  assert.equal(data.privacy_acknowledged, true)
  assert.equal(data.form_type, "contact")
  assert.equal(data.access_key, key)
  assert.equal(data.botcheck, false)
  assert.equal(data.subject, `Pottlerkinder Kontakt: ${valid.subject}`)
  assert.equal(request.options.headers.Authorization, undefined)
})

test("missing configuration, invalid values and honeypots never make requests", async () => {
  let calls = 0
  const fetcher = async () => {
    calls++
    throw new Error("Not expected")
  }
  await assert.rejects(
    submitContact("", valid, undefined, fetcher),
    /nicht übermittelt/,
  )
  await assert.rejects(
    submitContact(key, EMPTY_CONTACT, undefined, fetcher),
    /Eingaben/,
  )
  await assert.rejects(
    submitContact(key, { ...valid, website: "spam" }, undefined, fetcher),
    /Eingaben/,
  )
  assert.equal(calls, 0)
})

test("delivery errors, rate limits and non-JSON responses never report success", async () => {
  await assert.rejects(
    submitContact(
      key,
      valid,
      undefined,
      async () => new Response('{"success":false}', { status: 422 }),
    ),
    /nicht übermittelt/,
  )
  await assert.rejects(
    submitContact(
      key,
      valid,
      undefined,
      async () => new Response('{"success":false}', { status: 429 }),
    ),
    /Zu viele Anfragen/,
  )
  await assert.rejects(
    submitContact(
      key,
      valid,
      undefined,
      async () =>
        new Response("<html>Not a form response</html>", { status: 200 }),
    ),
    /nicht übermittelt/,
  )
  await assert.rejects(
    submitContact(key, valid, undefined, async () => {
      throw new Error("Offline")
    }),
    /Verbindung/,
  )
  await assert.rejects(
    submitContact(
      key,
      valid,
      undefined,
      async () => new Response('{"ok":true}', { status: 200 }),
    ),
    /nicht übermittelt/,
  )
})
