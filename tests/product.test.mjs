import assert from "node:assert/strict"
import test from "node:test"
import { findProductVariant, formatVariantPrice } from "../src/lib/product.ts"

const product = {
  colorOptions: [
    { label: "Schwarz", value: "#161616" },
    { label: "Weiß", value: "#f4f4f4" },
  ],
  variants: [
    {
      id: "black-s",
      price: "29.90",
      availableForSale: true,
      selectedOptions: [
        { name: "Farbe", value: "Schwarz" },
        { name: "Größe", value: "S" },
      ],
    },
    {
      id: "black-m",
      price: "31.90",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Schwarz" },
        { name: "Size", value: "M" },
      ],
    },
    {
      id: "white-s",
      price: "32.90",
      availableForSale: true,
      selectedOptions: [
        { name: "Farbe", value: "Weiß" },
        { name: "Groesse", value: "S" },
      ],
    },
    {
      id: "white-xl",
      price: "32.90",
      availableForSale: false,
      selectedOptions: [
        { name: "Farbe", value: "Weiß" },
        { name: "Größe", value: "XL" },
      ],
    },
  ],
}

test("color swatches resolve to the exact Shopify size and color variant", () => {
  assert.equal(findProductVariant(product, "S", "#161616")?.id, "black-s")
  assert.equal(findProductVariant(product, "M", "#161616")?.id, "black-m")
  assert.equal(findProductVariant(product, "S", "#f4f4f4")?.id, "white-s")
})
test("unavailable combinations never fall back to the first purchasable variant", () => {
  assert.equal(findProductVariant(product, "M", "#f4f4f4"), undefined)
  assert.equal(findProductVariant(product, "XL", "#f4f4f4"), undefined)
  assert.equal(findProductVariant(product, "L", "#161616"), undefined)
})
test("unknown colors never silently select another color", () => {
  assert.equal(findProductVariant(product, "S", "#cf3131"), undefined)
})
test("one-size products without color/size options remain purchasable", () => {
  assert.equal(
    findProductVariant({ variants: [{ id: "one-size" }] }, "ALLE", "#161616")
      ?.id,
    "one-size",
  )
  assert.equal(findProductVariant({}, "ALLE", "#161616"), undefined)
})
test("prices reflect the selected variant and use German currency formatting", () => {
  assert.equal(
    formatVariantPrice(findProductVariant(product, "M", "#161616")?.price),
    "31,90 €",
  )
  assert.equal(formatVariantPrice("0"), "0,00 €")
  assert.equal(formatVariantPrice("1299.90"), "1.299,90 €")
})
test("missing or invalid prices do not render zero as a substitute", () => {
  assert.equal(formatVariantPrice(undefined), null)
  assert.equal(formatVariantPrice(null), null)
  assert.equal(formatVariantPrice(""), null)
  assert.equal(formatVariantPrice("invalid"), null)
})
