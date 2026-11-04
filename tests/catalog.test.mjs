import assert from "node:assert/strict"
import test from "node:test"
import {
  catalogLabel,
  catalogPrice,
  filterCatalogProducts,
  isCatalogSale,
} from "../src/lib/catalog.ts"

const selection = {
  category: "ALLE",
  gender: "ALLE",
  size: "ALLE",
  color: null,
  sub: "ALLE",
  sort: "BELIEBTHEIT",
  query: "",
  minPrice: 0,
  maxPrice: Infinity,
  favoritesOnly: false,
  favorites: [],
}
const hoodie = {
  slug: "classic-hoodie",
  name: "Classic Hoodie",
  category: "HOODIES",
  gender: "UNISEX",
  sizes: ["S", "M", "XL"],
  colors: ["#161616", "#cf3131"],
  price: "39,90 €",
  variants: [{ sku: "PK-0201" }],
}
const shirt = {
  slug: "revier-shirt",
  name: "Revier Shirt",
  category: "T-SHIRTS",
  gender: "FRAUEN",
  sizes: ["XS", "S"],
  colors: ["#f4f4f4"],
  price: "19,90 €",
}
const mug = {
  slug: "pott-tasse",
  name: "Pott Tasse",
  category: "GLÄSER & TASSEN",
  sub: "TASSEN",
  gender: "UNISEX",
  sizes: ["ALLE"],
  colors: ["#f4f4f4"],
  price: "12,90 €",
}
const kids = {
  slug: "kids-shirt",
  name: "Kinder Shirt",
  category: "T-SHIRTS",
  gender: "KINDER",
  sizes: ["04A (104)", "06A (116)"],
  colors: ["#cf3131"],
  price: "15,90 €",
}
const products = [hoodie, shirt, mug, kids]
const select = (changes) =>
  filterCatalogProducts(products, { ...selection, ...changes })

test("German prices include thousands, decimals, nonbreaking spaces and currency", () => {
  assert.equal(catalogPrice("1.299,90 €"), 1299.9)
  assert.equal(catalogPrice("19,90 €"), 19.9)
})
test("default ordering and source array are preserved", () => {
  assert.deepEqual(select({}), products)
  select({ sort: "NIEDRIGSTER PREIS" })
  assert.equal(products[0], hoodie)
})
test("category and accessory subcategory work together", () => {
  assert.deepEqual(select({ category: "GLÄSER & TASSEN", sub: "TASSEN" }), [
    mug,
  ])
  assert.deepEqual(
    select({ category: "GLÄSER & TASSEN", sub: "BIERGLÄSER" }),
    [],
  )
})
test("gender includes unisex textiles but excludes nontextile items in All", () => {
  assert.deepEqual(select({ gender: "FRAUEN" }), [hoodie, shirt])
  assert.deepEqual(select({ gender: "MÄNNER" }), [hoodie])
})
test("nontextile categories ignore the disabled textile filters", () => {
  assert.deepEqual(
    select({
      category: "GLÄSER & TASSEN",
      gender: "MÄNNER",
      size: "XL",
      color: "#161616",
    }),
    [mug],
  )
})
test("adult and kids sizes remain filterable", () => {
  assert.deepEqual(select({ size: "XL" }), [hoodie])
  assert.deepEqual(select({ gender: "KINDER", size: "04A (104)" }), [kids])
})
test("actual Shopify color values and multicolor filter are supported", () => {
  assert.deepEqual(select({ color: "#cf3131" }), [hoodie, kids])
  assert.deepEqual(select({ color: "multi" }), [hoodie])
})
test("search trims whitespace, ignores case and includes provided SKU", () => {
  assert.deepEqual(select({ query: "  CLASSIC  " }), [hoodie])
  assert.deepEqual(select({ query: "pk-0201" }), [hoodie])
  assert.deepEqual(select({ query: "no-such-product" }), [])
})
test("price range boundaries are inclusive", () => {
  assert.deepEqual(select({ minPrice: 19.9, maxPrice: 39.9 }), [hoodie, shirt])
})
test("all exposed sort options affect ordering", () => {
  assert.deepEqual(select({ sort: "NIEDRIGSTER PREIS" }), [
    mug,
    kids,
    shirt,
    hoodie,
  ])
  assert.deepEqual(select({ sort: "HÖCHSTER PREIS" }), [
    hoodie,
    shirt,
    kids,
    mug,
  ])
  assert.deepEqual(select({ sort: "ARTIKELBEZEICHNUNG" }), [
    hoodie,
    kids,
    mug,
    shirt,
  ])
})
test("wishlist restricts the results and combines with other filters", () => {
  assert.deepEqual(
    select({ favoritesOnly: true, favorites: [shirt.slug, mug.slug] }),
    [shirt, mug],
  )
  assert.deepEqual(
    select({
      favoritesOnly: true,
      favorites: [shirt.slug],
      category: "HOODIES",
    }),
    [],
  )
})
test("category labels retain the German catalog vocabulary", () => {
  assert.equal(catalogLabel("GLÄSER & TASSEN"), "Gläser & Tassen")
  assert.equal(catalogLabel("ALLE"), "Alle Produkte")
  assert.equal(catalogLabel("4XL"), "4XL")
})

test("Sale includes genuine price reductions only", () => {
  const discounted = { ...hoodie, compareAtPrice: "49,90 €" }
  assert.equal(isCatalogSale(discounted), true)
  assert.equal(isCatalogSale({ ...hoodie, compareAtPrice: "39,90 €" }), false)
  assert.equal(isCatalogSale({ ...hoodie, compareAtPrice: "29,90 €" }), false)
  assert.equal(isCatalogSale(hoodie), false)
  assert.deepEqual(
    filterCatalogProducts([hoodie, discounted, shirt], {
      ...selection,
      saleOnly: true,
    }),
    [discounted],
  )
})

test("Sale combines with the existing search, size and price filters", () => {
  const discounted = { ...hoodie, compareAtPrice: "49,90 €" }
  const options = { ...selection, saleOnly: true }
  assert.deepEqual(
    filterCatalogProducts([discounted], {
      ...options,
      query: "classic",
      size: "XL",
    }),
    [discounted],
  )
  assert.deepEqual(
    filterCatalogProducts([discounted], { ...options, maxPrice: 30 }),
    [],
  )
  assert.deepEqual(
    filterCatalogProducts([discounted], { ...options, size: "XS" }),
    [],
  )
  assert.deepEqual(
    filterCatalogProducts([discounted], { ...options, query: "polo" }),
    [],
  )
})
