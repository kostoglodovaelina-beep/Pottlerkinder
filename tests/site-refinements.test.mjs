import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8")

test("footer exposes only the eight payment methods in the supplied screenshot", () => {
  const component = read("src/components/PaymentMethods.tsx")
  const names = [...component.matchAll(/name: "([^"]+)"/g)].map(
    (match) => match[1],
  )
  assert.deepEqual(names, [
    "Shop Pay",
    "Visa",
    "Mastercard",
    "American Express",
    "Maestro",
    "UnionPay",
    "Apple Pay",
    "Google Pay",
  ])
  for (const [, filename] of component.matchAll(
    /@\/assets\/payments\/([^"]+\.svg)/g,
  )) {
    const svg = read(`src/assets/payments/${filename}`)
    assert.match(svg, /<svg /)
    assert.doesNotMatch(svg, /<script|(?:xlink:)?href\s*=/gi)
  }
})

test("company brochure lives in Blog, not the company page or its opening offer", () => {
  const company = read("src/components/CompanyPageContent.tsx")
  assert.doesNotMatch(
    company,
    /ANGEBOT ANFRAGEN|brochure|FiDownload|b2b-download-row/,
  )
  const news = read("src/components/NewsPageContent.tsx")
  assert.match(news, /Alle Möglichkeiten im Überblick\./)
  assert.match(news, /Leistungsübersicht als PDF/)
  assert.match(
    news,
    /download="Pottlerkinder-Leistungen-fuer-Unternehmen\.pdf"/,
  )
})

test("product information starts expanded and service links open in-place dialogs", () => {
  const product = read("src/components/ProductView.tsx")
  assert.equal((product.match(/<details open>/g) || []).length, 2)
  assert.doesNotMatch(
    product,
    /Versand &amp; Rückgabe|href="\/versandkosten"|href="\/rueckgabe-umtausch"/,
  )
  assert.match(product, /openServiceInfo\("shipping"\)/)
  assert.match(product, /openServiceInfo\("returns"\)/)
})

test("Kontakt uses the reference form, published identity and explicit privacy information", () => {
  const app = read("src/App.tsx")
  assert.match(app, /\["Kontakt", "\/kontakt"\]/)
  assert.match(app, /"\/kontakt": <ContactPage \/>/)
  const contact = read("src/components/ContactPageContent.tsx")
  assert.match(contact, /Natalia Lewandowski/)
  assert.match(contact, /Horster Str\. 118/)
  assert.match(contact, /45897 Gelsenkirchen/)
  assert.match(contact, /href="\/datenschutz"/)
  assert.match(contact, /href="\/impressum"/)
  assert.doesNotMatch(contact, /<iframe|Öffnungszeiten/)
  assert.match(contact, /<form\s/)
  assert.match(contact, /VITE_WEB3FORMS_ACCESS_KEY/)
  assert.match(contact, /aria-invalid/)
  assert.match(contact, /Web3Forms/)
})

test("company service cards and sticker note no longer contain request actions", () => {
  const company = read("src/components/CompanyPageContent.tsx")
  const section = company.slice(
    company.indexOf('className="b2b-service-grid"'),
    company.indexOf('className="b2b-image-note"'),
  )
  assert.doesNotMatch(section, /<a(?:\s|>)|Anfragen/)
})

test("news uses an opening photograph without visible test-publication labels", () => {
  const news = read("src/components/NewsPageContent.tsx")
  assert.match(news, /shop-opening\.webp/)
  assert.doesNotMatch(news, /Testmeldung|news-test-notice|news-test-label/)
})

test("footer removes the stats strip and separates delivery times from shipping costs", () => {
  const app = read("src/App.tsx")
  assert.doesNotMatch(app, /StatsBar|stats-grid/)
  assert.match(app, /className="footer-shipping-copy"/)
  assert.doesNotMatch(app, /footer-delivery-times|footer-delivery-note/)
  assert.match(app, /<dt>Katalog<\/dt>\s*<dd>3–5 Werktage<\/dd>/)
  assert.match(app, /<dt>Konfigurator<\/dt>\s*<dd>Bis zu 15 Werktage<\/dd>/)
  assert.match(app, /Bearbeitungszeit, jeweils zzgl\. Versandlaufzeit\./)
  assert.match(app, /Deutschland · 6,15 €/)
  assert.match(app, /Kostenlos ab 85 €/)
  assert.match(app, /NewsletterForm/)
})

test("news is not desaturated and compact payment logos adapt to small screens", () => {
  assert.doesNotMatch(read("src/styles/components/news-page.css"), /grayscale/)
  assert.match(
    read("src/styles/components/footer-updates.css"),
    /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/,
  )
  const footer = read("src/styles/components/footer-updates.css")
  assert.match(footer, /@media \(max-width: 699px\)/)
  assert.match(
    footer,
    /\.payment-methods \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/,
  )
  assert.match(
    read("src/components/PaymentMethods.tsx"),
    /className="sr-only">\{method.name\}/,
  )
})

test("the actual news photograph retains color, not just an unfiltered grayscale file", async () => {
  const { default: sharp } = await import("sharp")
  const photo = readFileSync(
    new URL("../src/assets/news/shop-opening.webp", import.meta.url),
  )
  const stats = await sharp(photo).stats()
  const means = stats.channels.slice(0, 3).map((channel) => channel.mean)
  assert.ok(Math.max(...means) - Math.min(...means) > 1)
})
