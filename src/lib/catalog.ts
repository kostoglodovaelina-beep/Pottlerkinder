export type CatalogProduct = {
  slug: string
  name: string
  category: string
  gender: string
  sub?: string
  short?: string
  price: string
  compareAtPrice?: string | null
  sizes: string[]
  colors: string[]
  variants?: { sku?: string }[]
}

export type CatalogSelection = {
  category: string
  gender: string
  size: string
  color: string | null
  sub: string
  sort: string
  query: string
  minPrice: number
  maxPrice: number
  favoritesOnly: boolean
  favorites: string[]
  saleOnly?: boolean
}

const NON_TEXTILE = ["ACCESSOIRES", "GLÄSER & TASSEN", "DTF-TRANSFERS"]

export function catalogPrice(price: string): number {
  return (
    Number(
      price
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.-]/g, ""),
    ) || 0
  )
}

export function isCatalogSale(
  product: Pick<CatalogProduct, "price" | "compareAtPrice">,
): boolean {
  return (
    Boolean(product.compareAtPrice) &&
    catalogPrice(product.compareAtPrice!) > catalogPrice(product.price)
  )
}

export function filterCatalogProducts<T extends CatalogProduct>(
  products: T[],
  selection: CatalogSelection,
): T[] {
  const {
    category,
    gender,
    size,
    color,
    sub,
    sort,
    minPrice,
    maxPrice,
    favoritesOnly,
    favorites,
  } = selection
  const nonTextile = NON_TEXTILE.includes(category)
  const query = selection.query.trim().toLocaleLowerCase("de-DE")
  return products
    .filter((product) => {
      const price = catalogPrice(product.price)
      const searchable = [
        product.name,
        product.slug,
        product.short,
        ...(product.variants?.map((variant) => variant.sku) || []),
      ]
        .join(" ")
        .toLocaleLowerCase("de-DE")
      return (
        (category === "ALLE" || product.category === category) &&
        (sub === "ALLE" || product.sub === sub) &&
        (category !== "ALLE" ||
          gender === "ALLE" ||
          !NON_TEXTILE.includes(product.category)) &&
        (nonTextile ||
          gender === "ALLE" ||
          product.gender === gender ||
          product.gender === "UNISEX") &&
        (nonTextile || size === "ALLE" || product.sizes.includes(size)) &&
        (nonTextile ||
          !color ||
          (color === "multi" && product.colors.length > 1) ||
          product.colors.includes(color)) &&
        (!query || searchable.includes(query)) &&
        price >= minPrice &&
        price <= maxPrice &&
        (!selection.saleOnly || isCatalogSale(product)) &&
        (!favoritesOnly || favorites.includes(product.slug))
      )
    })
    .sort((a, b) =>
      sort === "NIEDRIGSTER PREIS"
        ? catalogPrice(a.price) - catalogPrice(b.price)
        : sort === "HÖCHSTER PREIS"
          ? catalogPrice(b.price) - catalogPrice(a.price)
          : sort === "ARTIKELBEZEICHNUNG"
            ? a.name.localeCompare(b.name, "de-DE", { numeric: true })
            : 0,
    )
}

export function catalogLabel(value: string): string {
  const labels: Record<string, string> = {
    ALLE: "Alle Produkte",
    "T-SHIRTS": "T-Shirts",
    HOODIES: "Hoodies",
    SWEATSHIRTS: "Sweatshirts",
    POLOS: "Polos",
    ACCESSOIRES: "Accessoires",
    "GLÄSER & TASSEN": "Gläser & Tassen",
    "DTF-TRANSFERS": "DTF-Transfers",
    FRAUEN: "Frauen",
    MÄNNER: "Männer",
    KINDER: "Kinder",
    UNISEX: "Unisex",
    KOPFBEDECKUNG: "Kopfbedeckung",
    SHOPPER: "Shopper",
    SCHMUCK: "Schmuck",
    PINS: "Pins",
    TASSEN: "Tassen",
    BIERGLÄSER: "Biergläser",
    UNTERSETZER: "Untersetzer",
    "FÜR KLEIDUNG & TEXTILIEN": "Für Kleidung & Textilien",
  }
  return labels[value] || value
}
