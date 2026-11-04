import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiEdit3,
  FiGrid,
  FiHeart,
  FiRefreshCcw,
  FiSearch,
  FiSliders,
  FiTruck,
  FiX,
} from "react-icons/fi"
import {
  catalogLabel,
  catalogPrice,
  filterCatalogProducts,
  isCatalogSale,
} from "@/lib/catalog"
import "../styles/components/catalog-page.css"

const CATEGORIES = [
  "ALLE",
  "T-SHIRTS",
  "HOODIES",
  "SWEATSHIRTS",
  "POLOS",
  "ACCESSOIRES",
  "GLÄSER & TASSEN",
  "DTF-TRANSFERS",
]
const NON_TEXTILE = ["ACCESSOIRES", "GLÄSER & TASSEN", "DTF-TRANSFERS"]
const ADULT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
const KIDS_SIZES = [
  "04A (104)",
  "06A (116)",
  "08A (128)",
  "10A (140)",
  "12A (152)",
]
const FALLBACK_COLORS = [
  { label: "Schwarz", value: "#161616" },
  { label: "Weiß", value: "#f4f4f4" },
  { label: "Grau", value: "#777" },
  { label: "Blau", value: "#3189d6" },
  { label: "Rot", value: "#cf3131" },
  { label: "Grün", value: "#36b95a" },
]
const formatMoney = (amount: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount)

type ColorOption = Record<"label" | "value", string>

type Props = {
  products: any[] | null
  error: string | null
  renderPriceNote: () => ReactNode
  initialSaleOnly?: boolean
}

export default function CatalogView({
  products: sourceProducts,
  error,
  renderPriceNote,
  initialSaleOnly = false,
}: Props) {
  const catalogProducts = sourceProducts ?? []
  const catalogUnavailable = Boolean(error) && catalogProducts.length === 0
  const [category, setCategory] = useState(
    () => new URLSearchParams(window.location.search).get("category") || "ALLE",
  )
  const [gender, setGender] = useState(
    () => new URLSearchParams(window.location.search).get("gender") || "ALLE",
  )
  const [saleOnly, setSaleOnly] = useState(
    () =>
      initialSaleOnly ||
      new URLSearchParams(window.location.search).get("sale") === "1",
  )
  const [sub, setSub] = useState(
    () => new URLSearchParams(window.location.search).get("sub") || "ALLE",
  )
  const [size, setSize] = useState("ALLE")
  const [color, setColor] = useState<string | null>(null)
  const [sort, setSort] = useState("BELIEBTHEIT")
  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const resultsRef = useRef<HTMLElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const categoryTabsRef = useRef<HTMLElement>(null)
  const priceCeiling = Math.max(
    60,
    ...catalogProducts.map(
      (product) => Math.ceil(catalogPrice(product.price) / 10) * 10,
    ),
  )
  const upperPrice = maxPrice ?? priceCeiling
  const nonTextile = NON_TEXTILE.includes(category)
  const subcategories =
    category === "ACCESSOIRES"
      ? ["KOPFBEDECKUNG", "SHOPPER", "SCHMUCK", "PINS"]
      : category === "GLÄSER & TASSEN"
        ? ["TASSEN", "BIERGLÄSER", "UNTERSETZER"]
        : category === "DTF-TRANSFERS"
          ? ["FÜR KLEIDUNG & TEXTILIEN"]
          : []
  const availableColors = Array.from(
    new Map<string, ColorOption>(
      catalogProducts.flatMap((product) =>
        product.colorOptions?.length
          ? product.colorOptions.map(
              (option: ColorOption) => [option.value, option] as const,
            )
          : product.colors.map(
              (value: string) =>
                [
                  value,
                  FALLBACK_COLORS.find((option) => option.value === value) || {
                    label: value,
                    value,
                  },
                ] as const,
            ),
      ),
    ).values(),
  )
  const colorFilters = availableColors.length
    ? availableColors
    : FALLBACK_COLORS
  const allSizes = Array.from(
    new Set<string>(catalogProducts.flatMap((product) => product.sizes)),
  )
  const adultSizes = Array.from(
    new Set([
      ...ADULT_SIZES,
      ...allSizes.filter((item) => item !== "ALLE" && !/^\d+A/.test(item)),
    ]),
  )
  const kidsSizes = Array.from(
    new Set([...KIDS_SIZES, ...allSizes.filter((item) => /^\d+A/.test(item))]),
  )
  const products = filterCatalogProducts(catalogProducts, {
    category,
    gender,
    size,
    color,
    sub,
    sort,
    query,
    minPrice,
    maxPrice: upperPrice,
    favoritesOnly,
    favorites,
    saleOnly,
  })
  const productsPerPage = 30
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage))
  const currentPage = Math.min(page, totalPages)
  const visibleProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  useEffect(() => {
    setPage(1)
  }, [
    category,
    gender,
    size,
    color,
    sort,
    sub,
    query,
    minPrice,
    maxPrice,
    favoritesOnly,
    saleOnly,
  ])

  useEffect(() => {
    const tabs = categoryTabsRef.current
    const active = tabs?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!tabs || !active) return
    const offset =
      active.getBoundingClientRect().left - tabs.getBoundingClientRect().left
    if (offset < 0) tabs.scrollLeft += offset
    else if (offset + active.offsetWidth > tabs.clientWidth)
      tabs.scrollLeft += offset + active.offsetWidth - tabs.clientWidth
  }, [category, saleOnly])

  const resetFilters = () => {
    setSaleOnly(false)
    setCategory("ALLE")
    setGender("ALLE")
    setSize("ALLE")
    setColor(null)
    setSub("ALLE")
    setMinPrice(0)
    setMaxPrice(null)
    setSearchInput("")
    setQuery("")
    setFavoritesOnly(false)
    setPage(1)
  }
  const selectCategory = (value: string) => {
    setSaleOnly(false)
    setCategory(value)
    setSub("ALLE")
    if (NON_TEXTILE.includes(value)) setGender("ALLE")
  }
  const toggleFavorite = (slug: string) =>
    setFavorites((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    )
  const changePage = (next: number) => {
    setPage(next)
    resultsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    })
  }
  const chips = [
    ...(saleOnly ? [{ label: "Sale", clear: () => setSaleOnly(false) }] : []),
    ...(category !== "ALLE"
      ? [{ label: catalogLabel(category), clear: () => selectCategory("ALLE") }]
      : []),
    ...(sub !== "ALLE"
      ? [{ label: catalogLabel(sub), clear: () => setSub("ALLE") }]
      : []),
    ...(gender !== "ALLE"
      ? [{ label: catalogLabel(gender), clear: () => setGender("ALLE") }]
      : []),
    ...(!nonTextile && size !== "ALLE"
      ? [{ label: size, clear: () => setSize("ALLE") }]
      : []),
    ...(!nonTextile && color
      ? [
          {
            label:
              color === "multi"
                ? "Mehrfarbig"
                : colorFilters.find((item) => item.value === color)?.label ||
                  "Farbe",
            clear: () => setColor(null),
          },
        ]
      : []),
    ...(query
      ? [
          {
            label: `„${query}“`,
            clear: () => {
              setQuery("")
              setSearchInput("")
            },
          },
        ]
      : []),
    ...(minPrice > 0 || upperPrice < priceCeiling
      ? [
          {
            label: `${formatMoney(minPrice)} – ${formatMoney(upperPrice)}`,
            clear: () => {
              setMinPrice(0)
              setMaxPrice(null)
            },
          },
        ]
      : []),
    ...(favoritesOnly
      ? [{ label: "Merkliste", clear: () => setFavoritesOnly(false) }]
      : []),
  ]

  return (
    <main className="catalog-page">
      <div className="catalog-container">
        <nav className="catalog-breadcrumbs" aria-label="Brotkrumennavigation">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Katalog</span>
        </nav>
        <section className="catalog-intro" aria-label="Katalogsuche">
          <div>
            <div className="catalog-title-row">
              <h1>Der Katalog</h1>
              <span className="catalog-count">
                {catalogProducts.length} Produkte
              </span>
            </div>
          </div>
          <form
            className="catalog-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              setQuery(searchInput)
            }}
          >
            <FiSearch aria-hidden="true" />
            <label className="sr-only" htmlFor="catalog-search">
              Produkte durchsuchen
            </label>
            <input
              id="catalog-search"
              ref={searchRef}
              type="search"
              placeholder="Produkte suchen …"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value)
                if (!event.target.value) setQuery("")
              }}
            />
            {searchInput && (
              <button
                type="button"
                className="catalog-search-clear"
                aria-label="Suche zurücksetzen"
                onClick={() => {
                  setSearchInput("")
                  setQuery("")
                  searchRef.current?.focus()
                }}
              >
                <FiX aria-hidden="true" />
              </button>
            )}
            <button type="submit" className="catalog-search-submit">
              Suchen <FiArrowRight aria-hidden="true" />
            </button>
          </form>
        </section>

        <div className="catalog-category-bar">
          <nav
            ref={categoryTabsRef}
            className="catalog-category-tabs"
            aria-label="Produktkategorien"
          >
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={!saleOnly && category === item}
                className={!saleOnly && category === item ? "is-active" : ""}
                onClick={() => selectCategory(item)}
              >
                {catalogLabel(item)}
              </button>
            ))}
            <button
              type="button"
              className={`catalog-sale-tab ${saleOnly ? "is-active" : ""}`}
              aria-pressed={saleOnly}
              onClick={() => {
                setSaleOnly(!saleOnly)
                setCategory("ALLE")
                setSub("ALLE")
              }}
            >
              Sale
            </button>
          </nav>
          <a href="/designer" className="catalog-design-link">
            Eigene Motive? <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="catalog-workspace">
          <button
            ref={filterButtonRef}
            type="button"
            className="catalog-mobile-filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="catalog-filter-panel"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <FiSliders aria-hidden="true" /> Filter{" "}
            {chips.length > 0 && <span>{chips.length}</span>}
            <FiChevronDown aria-hidden="true" />
          </button>
          <aside
            id="catalog-filter-panel"
            className={`catalog-sidebar ${filtersOpen ? "is-open" : ""}`}
            aria-label="Produkte filtern"
          >
            <div className="catalog-sidebar-heading">
              <h2>
                <FiSliders aria-hidden="true" /> Filter
              </h2>
              <button type="button" onClick={resetFilters}>
                Zurücksetzen
              </button>
            </div>
            <details className="catalog-facet" open>
              <summary>
                Für wen <FiChevronDown aria-hidden="true" />
              </summary>
              <div className="catalog-checkboxes">
                {["ALLE", "FRAUEN", "MÄNNER", "KINDER", "UNISEX"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={gender === item}
                      onClick={() => {
                        setGender(item)
                        if (nonTextile) {
                          setCategory("ALLE")
                          setSub("ALLE")
                        }
                        if (item === "KINDER") setSize("ALLE")
                      }}
                    >
                      <span
                        className={`catalog-checkbox ${
                          gender === item ? "is-checked" : ""
                        }`}
                      >
                        {gender === item && <FiCheck aria-hidden="true" />}
                      </span>
                      {item === "ALLE" ? "Alle" : catalogLabel(item)}
                    </button>
                  ),
                )}
              </div>
            </details>
            {subcategories.length > 0 && (
              <details className="catalog-facet" open>
                <summary>
                  Unterkategorie <FiChevronDown aria-hidden="true" />
                </summary>
                <div className="catalog-checkboxes">
                  {["ALLE", ...subcategories].map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={sub === item}
                      onClick={() => setSub(item)}
                    >
                      <span
                        className={`catalog-checkbox ${
                          sub === item ? "is-checked" : ""
                        }`}
                      >
                        {sub === item && <FiCheck aria-hidden="true" />}
                      </span>
                      {item === "ALLE" ? "Alle" : catalogLabel(item)}
                    </button>
                  ))}
                </div>
              </details>
            )}
            <details
              className={`catalog-facet ${nonTextile ? "is-unavailable" : ""}`}
              open
            >
              <summary>
                Größe <FiChevronDown aria-hidden="true" />
              </summary>
              {nonTextile && (
                <p className="catalog-facet-hint">
                  Für diese Kategorie nicht erforderlich.
                </p>
              )}
              <div
                className="catalog-size-buttons"
                aria-label="Erwachsenengrößen"
              >
                {["ALLE", ...adultSizes].map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={nonTextile || gender === "KINDER"}
                    aria-pressed={size === item}
                    onClick={() => setSize(size === item ? "ALLE" : item)}
                  >
                    {item === "ALLE" ? "Alle" : item}
                  </button>
                ))}
              </div>
              <details
                className="catalog-kids-sizes"
                open={gender === "KINDER" || undefined}
              >
                <summary>
                  Kindergrößen <FiChevronDown aria-hidden="true" />
                </summary>
                <div className="catalog-size-buttons">
                  {kidsSizes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled={nonTextile}
                      aria-pressed={size === item}
                      onClick={() => setSize(size === item ? "ALLE" : item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </details>
            </details>
            <details
              className={`catalog-facet ${nonTextile ? "is-unavailable" : ""}`}
              open
            >
              <summary>
                Farbe <FiChevronDown aria-hidden="true" />
              </summary>
              <div className="catalog-color-buttons">
                {colorFilters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-label={item.label}
                    title={item.label}
                    disabled={nonTextile}
                    aria-pressed={color === item.value}
                    style={{ background: item.value }}
                    onClick={() =>
                      setColor(color === item.value ? null : item.value)
                    }
                  >
                    {color === item.value && (
                      <FiCheck
                        aria-hidden="true"
                        style={{
                          color: ["#f4f4f4", "#fff", "#ffffff"].includes(
                            item.value.toLowerCase(),
                          )
                            ? "#161616"
                            : "#fff",
                        }}
                      />
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  className="is-multicolor"
                  aria-label="Mehrfarbig"
                  title="Mehrfarbig"
                  disabled={nonTextile}
                  aria-pressed={color === "multi"}
                  onClick={() => setColor(color === "multi" ? null : "multi")}
                >
                  {color === "multi" && <FiCheck aria-hidden="true" />}
                </button>
              </div>
            </details>
            <details className="catalog-facet" open>
              <summary>
                Preis <FiChevronDown aria-hidden="true" />
              </summary>
              <div className="catalog-price-range">
                <div className="catalog-range-track">
                  <span
                    style={{
                      left: `${(minPrice / priceCeiling) * 100}%`,
                      right: `${100 - (upperPrice / priceCeiling) * 100}%`,
                    }}
                  />
                </div>
                <label className="sr-only" htmlFor="catalog-min-price">
                  Mindestpreis
                </label>
                <input
                  id="catalog-min-price"
                  type="range"
                  min={0}
                  max={priceCeiling}
                  step={1}
                  value={minPrice}
                  aria-valuetext={formatMoney(minPrice)}
                  onChange={(event) =>
                    setMinPrice(
                      Math.min(Number(event.target.value), upperPrice - 1),
                    )
                  }
                />
                <label className="sr-only" htmlFor="catalog-max-price">
                  Höchstpreis
                </label>
                <input
                  id="catalog-max-price"
                  type="range"
                  min={0}
                  max={priceCeiling}
                  step={1}
                  value={upperPrice}
                  aria-valuetext={formatMoney(upperPrice)}
                  onChange={(event) =>
                    setMaxPrice(
                      Math.max(Number(event.target.value), minPrice + 1),
                    )
                  }
                />
              </div>
              <div className="catalog-price-endpoints">
                <span>{formatMoney(minPrice)}</span>
                <span>{formatMoney(upperPrice)}</span>
              </div>
            </details>
            <a className="catalog-designer-card" href="/designer">
              <span>Dein Motiv. Dein Stück.</span>
              <strong>
                Selbst gestalten <FiArrowUpRight aria-hidden="true" />
              </strong>
            </a>
            <button
              type="button"
              className="catalog-apply-filters"
              onClick={() => {
                setFiltersOpen(false)
                filterButtonRef.current?.focus()
              }}
            >
              {products.length} Produkte anzeigen{" "}
              <FiArrowRight aria-hidden="true" />
            </button>
          </aside>

          <section
            className="catalog-listing"
            ref={resultsRef}
            aria-label="Katalogprodukte"
          >
            <div className="catalog-toolbar">
              <div
                className="catalog-result-summary"
                aria-live="polite"
                aria-atomic="true"
              >
                <h2>
                  {favoritesOnly
                    ? "Deine Merkliste"
                    : saleOnly
                      ? "Sale"
                      : catalogLabel(category)}
                </h2>
                <span>
                  {products.length
                    ? `${(currentPage - 1) * productsPerPage + 1}–${Math.min(currentPage * productsPerPage, products.length)}`
                    : "0"}{" "}
                  von {products.length}
                </span>
              </div>
              <div className="catalog-toolbar-actions">
                <button
                  type="button"
                  className="catalog-favorites-toggle"
                  aria-label={`Merkliste anzeigen (${favorites.length})`}
                  aria-pressed={favoritesOnly}
                  title="Merkliste für diesen Besuch"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                >
                  <FiHeart aria-hidden="true" />
                  <span>{favorites.length}</span>
                </button>
                <label className="sr-only" htmlFor="catalog-sort">
                  Sortierung
                </label>
                <div className="catalog-sort-control">
                  <select
                    id="catalog-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="BELIEBTHEIT">Empfohlen</option>
                    <option value="NIEDRIGSTER PREIS">Preis aufsteigend</option>
                    <option value="HÖCHSTER PREIS">Preis absteigend</option>
                    <option value="ARTIKELBEZEICHNUNG">Name A–Z</option>
                  </select>
                  <FiChevronDown aria-hidden="true" />
                </div>
                <FiGrid
                  className="catalog-grid-indicator"
                  aria-label="Rasteransicht"
                />
              </div>
            </div>
            {chips.length > 0 && (
              <div
                className="catalog-active-filters"
                aria-label="Aktive Filter"
              >
                {chips.map((chip) => (
                  <button
                    type="button"
                    key={chip.label}
                    onClick={chip.clear}
                    aria-label={`${chip.label} entfernen`}
                  >
                    {chip.label}
                    <FiX aria-hidden="true" />
                  </button>
                ))}
                <button
                  type="button"
                  className="catalog-clear-all"
                  onClick={resetFilters}
                >
                  Alle löschen
                </button>
              </div>
            )}

            <div className="catalog-cards">
              {visibleProducts.map((product, index) => {
                const isFavorite = favorites.includes(product.slug)
                const sku = product.variants?.find(
                  (variant: any) => variant.sku,
                )?.sku
                const sizeLabel =
                  product.sizes.length > 1
                    ? `${product.sizes[0]} – ${product.sizes[product.sizes.length - 1]}`
                    : product.sizes[0] === "ALLE"
                      ? "One Size"
                      : product.sizes[0]
                return (
                  <article className="catalog-card" key={product.slug}>
                    <div className="catalog-card-visual">
                      <a
                        href={`/katalog/${product.slug}`}
                        className="catalog-card-image"
                        aria-label={`${product.name} ansehen`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </a>
                      {isCatalogSale(product) && (
                        <span className="catalog-card-badge">Sale</span>
                      )}
                      <button
                        type="button"
                        className="catalog-heart"
                        aria-label={`${product.name} ${
                          isFavorite ? "von der Merkliste entfernen" : "merken"
                        }`}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(product.slug)}
                      >
                        <FiHeart aria-hidden="true" />
                      </button>
                    </div>
                    <div className="catalog-card-meta">
                      <span>{catalogLabel(product.category)}</span>
                      <span>{sizeLabel}</span>
                    </div>
                    <div className="catalog-card-heading">
                      <h3>
                        <a
                          href={`/katalog/${product.slug}`}
                          title={product.name}
                        >
                          {product.name}
                        </a>
                      </h3>
                      {sku && (
                        <p className="catalog-card-sku">Art.-Nr. {sku}</p>
                      )}
                    </div>
                    <div className="catalog-card-commerce">
                      <div
                        className="catalog-card-swatches"
                        aria-label={`${product.colors.length} Farben`}
                      >
                        {product.colors
                          .slice(0, 3)
                          .map((value: string, index: number) => (
                            <a
                              href={`/katalog/${product.slug}`}
                              key={`${value}-${index}`}
                              style={{ background: value }}
                              aria-label={`${product.colorOptions?.[index]?.label || "Farbe"} – Farben und Größen ansehen`}
                              title={
                                product.colorOptions?.[index]?.label ||
                                "Farbe ansehen"
                              }
                            />
                          ))}
                        {product.colors.length > 3 && (
                          <span>+{product.colors.length - 3}</span>
                        )}
                      </div>
                      <div className="catalog-card-price">
                        {isCatalogSale(product) && (
                          <s>{product.compareAtPrice}</s>
                        )}
                        <strong>{product.price}</strong>
                      </div>
                    </div>
                    <div className="catalog-card-legal">
                      {renderPriceNote()}
                    </div>
                    <a
                      className="catalog-card-details"
                      href={`/katalog/${product.slug}`}
                    >
                      Produkt ansehen <FiArrowRight aria-hidden="true" />
                    </a>
                  </article>
                )
              })}
              {sourceProducts === null &&
                !error &&
                Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="catalog-skeleton"
                    aria-hidden="true"
                  >
                    <div />
                    <span />
                    <span />
                  </div>
                ))}
            </div>
            {sourceProducts === null && !error && (
              <p className="catalog-loading" role="status">
                Katalog wird geladen …
              </p>
            )}
            {(sourceProducts !== null || error) && products.length === 0 && (
              <div className="catalog-empty" role="status">
                {favoritesOnly ? (
                  <FiHeart aria-hidden="true" />
                ) : (
                  <FiSearch aria-hidden="true" />
                )}
                <h3>
                  {catalogUnavailable
                    ? "Der Katalog konnte nicht geladen werden."
                    : favoritesOnly && !favorites.length
                      ? "Deine Merkliste wartet auf dich."
                      : "Noch nicht das Richtige dabei?"}
                </h3>
                <p>
                  {catalogUnavailable
                    ? "Bitte versuche es in Kürze erneut."
                    : favoritesOnly && !favorites.length
                      ? "Mit dem Herz am Produkt merkst du dir deine Favoriten für diesen Besuch."
                      : "Versuche einen anderen Suchbegriff oder passe deine Filter an."}
                </p>
                <button
                  type="button"
                  onClick={
                    catalogUnavailable
                      ? () => window.location.reload()
                      : resetFilters
                  }
                >
                  {catalogUnavailable
                    ? "Erneut laden"
                    : "Alle Produkte ansehen"}{" "}
                  <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
            {totalPages > 1 && (
              <nav className="catalog-pager" aria-label="Katalogseiten">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <FiArrowLeft aria-hidden="true" />
                  <span>Zurück</span>
                </button>
                <span>
                  Seite <strong>{currentPage}</strong> von {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                >
                  <span>Weiter</span>
                  <FiArrowRight aria-hidden="true" />
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
      <nav className="catalog-assurances" aria-label="Service & Informationen">
        <div className="catalog-assurance-grid">
          <a href="/versandkosten">
            <FiTruck className="catalog-service-icon" aria-hidden="true" />
            <span>
              <strong>Lieferung mit DHL / GLS</strong>
              <small>Versandkosten im Überblick</small>
            </span>
            <FiArrowUpRight
              className="catalog-service-arrow"
              aria-hidden="true"
            />
          </a>
          <a href="/designer">
            <FiEdit3 className="catalog-service-icon" aria-hidden="true" />
            <span>
              <strong>Dein Motiv. Dein Produkt.</strong>
              <small>Im Designstudio selbst gestalten</small>
            </span>
            <FiArrowUpRight
              className="catalog-service-arrow"
              aria-hidden="true"
            />
          </a>
          <a href="/rueckgabe-umtausch">
            <FiRefreshCcw className="catalog-service-icon" aria-hidden="true" />
            <span>
              <strong>Rückgabe &amp; Umtausch</strong>
              <small>Alle Bedingungen auf einen Blick</small>
            </span>
            <FiArrowUpRight
              className="catalog-service-arrow"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav>
    </main>
  )
}
