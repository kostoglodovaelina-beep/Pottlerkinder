import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import ts from "typescript"

const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8")

test("production catalog contains no demo generators or local cart simulation", () => {
  const ast = ts.createSourceFile("App.tsx", app, ts.ScriptTarget.Latest, true)
  const prohibited =
    /^(DEMO_|TEST_|BASE_CATALOG_PRODUCTS$|CATALOG_PRODUCTS$|createDemoProduct$|addDemoVariant$|updateDemoCartLine$|isDemo$|isDemoCart$)/
  function visit(node) {
    if (ts.isIdentifier(node)) assert.doesNotMatch(node.text, prohibited)
    ts.forEachChild(node, visit)
  }
  visit(ast)
  assert.match(app, /catalogCache\.set\(cacheKey, mappedProducts\)/)
  assert.match(app, /setProducts\(\[\]\)/)
  assert.doesNotMatch(app, /@\/imports\//)
})

test("old preview cart data is discarded without deleting the Shopify cart", () => {
  assert.match(app, /localStorage\.removeItem\("pottlerkinder-demo-cart"\)/)
  assert.match(app, /shopCart\s*\.get\(cartId\)/)
  assert.match(app, /shopCart\.create\(/)
  assert.match(app, /shopCart\.add\(/)
  assert.match(app, /shopCart\.update\(/)
  assert.match(app, /shopCart\.remove\(/)
})

test("products without a Shopify image use a neutral asset, not a mock product", () => {
  assert.match(app, /\|\| productUnavailable/)
  assert.doesNotMatch(app, /imgProduct\d|test-\$\{/)
  const placeholder = readFileSync(
    new URL("../src/assets/product-unavailable.svg", import.meta.url),
    "utf8",
  )
  assert.match(placeholder, /Kein Produktbild verfügbar/)
})
