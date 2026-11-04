import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const surfaces = [
  "site-header.css",
  "commerce-surfaces.css",
  "catalog-page.css",
  "product-page.css",
  "bestseller-carousel.css",
  "history-page.css",
  "company-page.css",
  "news-page.css",
  "contact-page.css",
  "service-info-dialog.css",
  "footer-updates.css",
  "newsletter-form.css",
  "../readability.css",
]

test("shop interface colors stay monochrome or red, not olive or beige", () => {
  for (const name of surfaces) {
    // The multicolor product filter represents actual merchandise, not UI chrome.
    const css = read(`src/styles/components/${name}`).replace(
      /conic-gradient\([^)]*\)/g,
      "",
    )
    const colors = css.matchAll(
      /#([a-f\d]{8}|[a-f\d]{6}|[a-f\d]{4}|[a-f\d]{3})\b/gi,
    )
    for (const [, hex] of colors) {
      const expanded =
        hex.length < 5 ? [...hex].map((digit) => digit.repeat(2)).join("") : hex
      const [r, g, b] = [0, 2, 4].map((offset) =>
        parseInt(expanded.slice(offset, offset + 2), 16),
      )
      const neutral = r === g && g === b
      const red =
        r > g &&
        r > b &&
        (Math.max(g, b) - Math.min(g, b)) / (r - Math.min(g, b)) <= 0.26
      assert.ok(neutral || red, `${name}: #${hex} is outside the brand palette`)
    }
  }
})

test("history stays complete without a second catalog or designer promotion", () => {
  const history = read("src/components/HistoryContent.tsx")
  for (const id of ["herkunft", "wandel", "marke", "kohle"]) {
    assert.match(history, new RegExp(`<section id="${id}">`))
  }
  assert.doesNotMatch(
    history,
    /Die Geschichte geht weiter|Mit deinem nächsten Stück|history-next/,
  )
  assert.doesNotMatch(history, /href="\/(?:katalog|designer)"/)
  assert.match(history, /zollverein\.webp/)
  assert.ok(
    readFileSync(
      new URL("../src/assets/history/zollverein.webp", import.meta.url),
    ).length > 0,
  )
})

test("original Login copy and the minecart asset are retained", () => {
  const app = read("src/App.tsx")
  assert.doesNotMatch(app, /Alles an einem Ort\./)
  assert.match(app, /<span>GLÜCK AUF<\/span>/)
  assert.match(
    app,
    /<img src=\{imgCart\} alt="" className="cart-drawer-minecart"/,
  )
})
