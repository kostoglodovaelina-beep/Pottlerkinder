// @refresh reset
import { useState, useEffect, useMemo, useRef } from "react"
import {
  FaBeer,
  FaArrowsAlt,
  FaChild,
  FaEyeDropper,
  FaExpandArrowsAlt,
  FaFemale,
  FaGem,
  FaHatCowboy,
  FaMale,
  FaMugHot,
  FaRegSquare,
  FaRegStickyNote,
  FaShoppingBag,
  FaTags,
  FaThumbtack,
  FaTrash,
  FaTshirt,
  FaUsers,
} from "react-icons/fa"
import { GiPoloShirt } from "react-icons/gi"
import { HexColorPicker } from "react-colorful"

import imgHeroStripe from "@/imports/assets/sections/ticker-stripe.webp"
import imgBannerImage from "@/imports/assets/sections/design-banner-photo.webp"
import imgBannerImage1 from "@/imports/assets/sections/design-banner-overlay.webp"
import imgBannerContent from "@/imports/assets/sections/design-banner-texture.webp"
import imgProduct1 from "@/imports/assets/products/glueck-auf-tshirt.webp"
import imgProduct2 from "@/imports/assets/products/foerderturm-hoodie.webp"
import imgProduct3 from "@/imports/assets/products/kumpel-tshirt.webp"
import imgProduct4 from "@/imports/assets/products/bergmann-tshirt.webp"
import imgProduct5 from "@/imports/assets/products/schicht-im-schacht-polo.webp"
import imgCoalTexture from "@/imports/assets/sections/coal-texture.webp"
import imgHeaderBg from "@/imports/assets/header/header-background.webp"
import imgAccount from "@/imports/assets/header/account-icon.webp"
import imgCart from "@/imports/assets/header/cart-icon.webp"
import imgFooterBg from "@/imports/assets/sections/footer-background.webp"
import img11 from "@/imports/assets/categories/dtf-transfers.webp"
import img33 from "@/imports/assets/categories/hoodies.webp"
import img44 from "@/imports/assets/categories/polos.webp"
import img55 from "@/imports/assets/categories/glasses-and-mugs.webp"
import img66 from "@/imports/assets/categories/t-shirts.webp"
import hero1 from "@/imports/assets/hero/hero1.webp"
import hero2 from "@/imports/assets/hero/hero2.webp"
import hero3 from "@/imports/assets/hero/hero3.webp"
import svgPaths from "@/imports/assets/icons/svg-paths"
import imgTowerLogo from "@/imports/assets/header/logo-tower.webp"
import imgWordmarkLogo from "@/imports/assets/header/logo-wordmark.webp"
import imgZubehorPhoto from "@/imports/assets/categories/accessories.webp"
import imgHeaderCoal from "@/imports/assets/header/coal-texture.webp"
import imgGlobe from "@/imports/assets/header/language-globe.webp"
import customHoodie from "@/imports/Hoodie.jpg"
import customPolo from "@/imports/Polo.jpg"
import solsStockholmRed from "@/assets/designer/shopper/sols-stockholm-red.webp"
import customSweatshirt from "@/imports/Sweatshirt-1.jpg"
import twoToneMugYellow from "@/assets/designer/mug/two-tone/gelb.webp"
import customTshirt from "@/imports/t-shirt.jpg"
import customShirt from "@/imports/Hemd.jpg"
import customCap from "@/imports/Kappe.jpg"
import womenCapBlack from "@/assets/designer/women-cap/front/black-verified.webp"
import womenCapRed from "@/assets/designer/women-cap/front/red-verified.webp"
import womenCapWhite from "@/assets/designer/women-cap/front/white-verified.webp"
import womenCapRedWhite from "@/assets/designer/women-cap/front/red_white-verified.webp"
import womenCapKellyGreen from "@/assets/designer/women-cap/front/kelly_green-verified.webp"
import womenCapBottleGreen from "@/assets/designer/women-cap/front/bottle_green-verified.webp"
import womenCapFrenchNavyWhite from "@/assets/designer/women-cap/front/french_navy_white-verified.webp"
import womenCapRoyalBlue from "@/assets/designer/women-cap/front/royal_blue-verified.webp"
import womenCapFrenchNavy from "@/assets/designer/women-cap/front/french_navy-verified.webp"
import womenCapBlackBack from "@/assets/designer/women-cap/back/black-verified.webp"
import womenCapRedBack from "@/assets/designer/women-cap/back/red-verified.webp"
import womenCapWhiteBack from "@/assets/designer/women-cap/back/white-verified.webp"
import womenCapRedWhiteBack from "@/assets/designer/women-cap/back/red_white-verified.webp"
import womenCapKellyGreenBack from "@/assets/designer/women-cap/back/kelly_green-verified.webp"
import womenCapBottleGreenBack from "@/assets/designer/women-cap/back/bottle_green-verified.webp"
import womenCapFrenchNavyWhiteBack from "@/assets/designer/women-cap/back/french_navy_white-verified.webp"
import womenCapRoyalBlueBack from "@/assets/designer/women-cap/back/royal_blue-verified.webp"
import womenCapFrenchNavyBack from "@/assets/designer/women-cap/back/french_navy-verified.webp"
import sizeGuideShirt from "@/assets/designer/size-guide-shirt-white.png"
import hoodieBlack from "@/imports/9d.jpg"
import hoodieFireRed from "@/imports/36.jpg"
import hoodieNavy from "@/imports/54.jpg"
import hoodieAzureBlue from "@/imports/az.jpg"
import hoodieCharcoal from "@/imports/ca.jpg"
import hoodieFrenchNavy from "@/imports/fn.jpg"
import hoodieHeatherNavy from "@/imports/hn.jpg"
import hoodieHeatherGrey from "@/imports/hy.jpg"
import hoodieNewLightGrey from "@/imports/nw.jpg"
import hoodieOlive from "@/imports/ol.jpg"
import hoodieWhite from "@/imports/00.jpg"
import womenHoodieWhiteBack from "@/assets/designer/women-hoodie/back/white-back.jpg"
import womenHoodieFireRedBack from "@/assets/designer/women-hoodie/back/fire_red-back.jpg"
import womenHoodieOliveBack from "@/assets/designer/women-hoodie/back/olive-back.jpg"
import womenHoodieAzureBlueBack from "@/assets/designer/women-hoodie/back/azure_blue-back.jpg"
import womenHoodieNavyBack from "@/assets/designer/women-hoodie/back/navy-back.jpg"
import womenHoodieHeatherNavyBack from "@/assets/designer/women-hoodie/back/heather_navy-back.jpg"
import womenHoodieFrenchNavyBack from "@/assets/designer/women-hoodie/back/french_navy-back.jpg"
import womenHoodieCharcoalBack from "@/assets/designer/women-hoodie/back/charcoal-back.jpg"
import womenHoodieHeatherGreyBack from "@/assets/designer/women-hoodie/back/heather_grey-back.jpg"
import womenHoodieNewLightGreyBack from "@/assets/designer/women-hoodie/back/new_light_grey-back.jpg"
import womenHoodieBlackBack from "@/assets/designer/women-hoodie/back/black-back.jpg"
import pageCompany from "@/imports/assets/pages/company.webp"
import pageHistory from "@/imports/assets/pages/history.webp"
import pageCollieries from "@/imports/assets/pages/collieries.webp"
import pageBlog from "@/imports/assets/pages/blog.webp"
import { shopCart } from "@/lib/shopify"

// ─── Shared padding value (12vw clamped) ──────────────────────────────────────
const SECTION_PAD = "clamp(16px, 12vw, 210px)"

function PriceLegalNote() {
  return (
    <span className="price-legal-note">
      <span>inkl. MwSt., zzgl.</span>{' '}
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          window.dispatchEvent(new Event("pottlerkinder-open-shipping"))
        }}
      >
        Versandkosten <sup>[1]</sup>
      </button>
    </span>
  )
}

const cartSubscribers = new Set<(cart: any | null) => void>()
let sharedCart: any | null | undefined
let sharedCartRequest: Promise<any | null> | null = null
const catalogCache = new Map<string, any[]>()
const catalogRequests = new Map<string, Promise<any[]>>()

function publishCart(cart: any | null) {
  sharedCart = cart
  cartSubscribers.forEach((listener) => listener(cart))
  window.dispatchEvent(
    new CustomEvent("pottlerkinder-cart-updated", { detail: { cart } }),
  )
}

function cartHasVariant(cart: any | null | undefined, variantId?: string) {
  if (!variantId) return false
  return (cart?.lines?.edges || []).some(
    ({ node }: any) => node.merchandise?.id === variantId,
  )
}

function selectedProductVariant(product: any, size: string, color: string) {
  const colorLabel = product.colorOptions?.find((item: any) => item.value === color)?.label
  return (
    product.variants?.find((variant: any) => {
      const options = variant.selectedOptions || []
      const sizeOption = options.find((option: any) =>
        ["größe", "groesse", "size"].includes(option.name.toLowerCase()),
      )
      const colorOption = options.find((option: any) =>
        ["farbe", "color"].includes(option.name.toLowerCase()),
      )
      return (
        (!sizeOption || sizeOption.value === size) &&
        (!colorOption || !colorLabel || colorOption.value === colorLabel)
      )
    }) || product.variants?.[0]
  )
}

function cartWithoutLine(cart: any, lineId: string) {
  const removedLine = (cart?.lines?.edges || []).find(
    ({ node }: any) => node.id === lineId,
  )?.node
  return {
    ...cart,
    totalQuantity: Math.max(0, (cart?.totalQuantity || 0) - (removedLine?.quantity || 0)),
    lines: {
      ...cart.lines,
      edges: (cart?.lines?.edges || []).filter(
        ({ node }: any) => node.id !== lineId,
      ),
    },
  }
}

function cartWithLineQuantity(cart: any, lineId: string, quantity: number) {
  const previousLine = (cart?.lines?.edges || []).find(
    ({ node }: any) => node.id === lineId,
  )?.node
  const difference = quantity - (previousLine?.quantity || 0)
  return {
    ...cart,
    totalQuantity: Math.max(0, (cart?.totalQuantity || 0) + difference),
    lines: {
      ...cart.lines,
      edges: (cart?.lines?.edges || []).map(({ node }: any) =>
        node.id === lineId ? { node: { ...node, quantity } } : { node },
      ),
    },
  }
}

function ShippingCostsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="legal-dialog-layer" role="dialog" aria-modal="true" aria-labelledby="shipping-dialog-title">
      <button type="button" className="legal-dialog-backdrop" aria-label="Fenster schließen" onClick={onClose} />
      <section className="legal-dialog">
        <button type="button" className="legal-dialog-close" aria-label="Schließen" onClick={onClose}>×</button>
        <p className="legal-kicker">VERSAND & LIEFERUNG</p>
        <h2 id="shipping-dialog-title">VERSANDKOSTEN</h2>
        <div className="shipping-rate-card">
          <span>DEUTSCHLAND · DHL / GLS</span>
          <b>6,15 €</b>
          <small>pro Bestellung</small>
        </div>
        <p>Kostenloser Versand ab einem Warenwert von 85,00 €. Die verbindlichen Versandkosten werden vor Abschluss deiner Bestellung im Checkout angezeigt.</p>
        <a href="/versandkosten" onClick={onClose}>ALLE LIEFERINFORMATIONEN ANSEHEN →</a>
      </section>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    img: hero1,
    tag: "GLÜCK AUF · SEIT 2026 · TRAG DEINE GESCHICHTE",
    line1: "PRINTS AUS",
    line2: "DEM",
    line3: "REVIER",
    redLine: "line3",
    sub: "Authentisches Streetwear aus dem Ruhrgebiet. Bio-Baumwolle, Direktdruck — mit Kohlestaub in den Genen.",
  },
  {
    img: hero2,
    tag: "GLÜCK AUF · SEIT 2026 · TRAG DEINE GESCHICHTE",
    line1: "GLÜCK AUF",
    line2: "NEUE",
    line3: "KOLLEKTION",
    redLine: "line3",
    sub: "Neue Motive, starke Designs. Made im Ruhrpott — für Kumpel, die stolz auf ihre Heimat sind.",
  },
  {
    img: hero3,
    tag: "GLÜCK AUF · SEIT 2026 · TRAG DEINE GESCHICHTE",
    line1: "EIGENER",
    line2: "DEIN",
    line3: "DESIGN",
    redLine: "line3",
    sub: "Wähle aus 500+ Motiven oder lade dein Bild hoch. DTF-Druck auf Bio-Baumwolle — schnell und fair.",
  },
]

const CATEGORIES = [
  { img: img33, name: "HOODIES" },
  { img: img66, name: "T-SHIRTS" },
  { img: img44, name: "POLOS" },
  { img: img55, name: "GLÄSER & TASSEN" },
  { img: imgZubehorPhoto, name: "ACCESSOIRES" },
  { img: img11, name: "DTF-TRANSFERS" },
]

const PRODUCTS = [
  {
    img: imgProduct1,
    badge: "TOP",
    category: "Für das Revier",
    name: "Glück Auf T-Shirt",
    rating: 87,
    price: "24,90 €",
    swatches: ["#111111", "#444444", "#888888"],
  },
  {
    img: imgProduct2,
    badge: "NEU",
    category: "Industrial Feel · Warm",
    name: "Förderturm Hoodie",
    rating: 53,
    price: "40,90 €",
    swatches: ["#111111", "#2D3748"],
  },
  {
    img: imgProduct3,
    badge: "★ TOP",
    category: "Kumpel Kollektion",
    name: "Kumpel T-Shirt",
    rating: 71,
    price: "24,90 €",
    swatches: ["#1A1A1A", "#333333"],
  },
  {
    img: imgProduct4,
    badge: "NEU",
    category: "Revier Klassiker",
    name: "Bergmann T-Shirt",
    rating: 96,
    price: "24,90 €",
    swatches: ["#111111", "#ffffff"],
  },
  {
    img: imgProduct5,
    badge: "★ TOP",
    category: "Für die Zeit nach der Schicht",
    name: "Schicht im Schacht Polo",
    rating: 58,
    price: "34,90 €",
    swatches: ["#111111", "#1A202C", "#718096"],
  },
]

const TICKER_ITEMS = ["GLÜCK AUF", "◆", "MADE IM POTT", "◆", "RUHRGEBIET", "◆"]
const TEXT_FONTS = [
  "Oswald",
  "Montserrat",
  "Inter",
  "Anton",
  "Russo One",
  "Roboto Slab",
  "Playfair Display",
  "Lobster",
  "Pacifico",
  "Caveat",
  "Comfortaa",
  "Arial",
  "Arial Black",
  "Impact",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
]
const TEXT_COLOR_SWATCHES = [
  "#FFFFFF", "#D9D9D9", "#777777", "#111111", "#443D37", "#C1AF9B",
  "#962F3A", "#D92F2E", "#EC8B70", "#FF9918", "#FFE021", "#7FA964",
  "#305E34", "#26767B", "#4EAED0", "#1F4C68", "#A9A3D2", "#824A80",
  "#64205D", "#E1A3A7", "#EBC9D7", "#FFE7C0", "#D7762C", "#8E2714",
]
const PAGE_BACKDROPS = {
  company: pageCompany,
  history: pageHistory,
  collieries: pageCollieries,
  blog: pageBlog,
}

// ─── Decorative thin image bar ────────────────────────────────────────────────

function DecoBar() {
  return (
    <div
      className="relative w-full h-[16px] pointer-events-none overflow-hidden"
      style={{
        borderTop: "0.5px solid rgba(38,38,38,0.5)",
        borderBottom: "0.5px solid rgba(38,38,38,0.5)",
      }}
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <img
        src={imgHeroStripe}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.4)" }}
      />
    </div>
  )
}

// ─── Ticker Stripe ────────────────────────────────────────────────────────────

function TickerStripe({
  direction = "left",
}: {
  direction?: "left" | "right"
}) {
  const repeated = Array.from({ length: 10 }, () => TICKER_ITEMS).flat()
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "#111",
        borderTop: "0.5px solid rgba(38,38,38,0.5)",
        borderBottom: "0.5px solid rgba(38,38,38,0.5)",
      }}
    >
      <div
        className="h-[41px] flex items-center overflow-hidden"
        style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.4)" }}
      >
        <div
          className={`ticker-track flex items-center whitespace-nowrap ${
            direction === "left" ? "ticker-left" : "ticker-right"
          }`}
          style={{ width: "max-content" }}
        >
          {[0, 1, 2].map((group) => (
            <div className="ticker-group flex items-center gap-5" key={group}>
              {repeated.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "3.3px",
                  }}
                  className={
                    item === "◆" ? "text-[#e04545] uppercase" : "text-[#d3d3d3]"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TickerSpacerBottom() {
  return <div className="w-full h-[6px] bg-[#0a0a0a]" />
}

// ─── Brand Mark (Förderturm / winding tower) ────────────────────────────────────

function HeadframeMark({
  className = "",
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* apex cap + head beam */}
      <path d="M42 15 L50 7 L58 15" strokeWidth={4} />
      <path d="M30 15 H70" strokeWidth={4} />
      {/* winding sheave wheels */}
      <circle cx="41" cy="28" r="8" strokeWidth={3.4} />
      <circle cx="59" cy="28" r="8" strokeWidth={3.4} />
      <circle cx="41" cy="28" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="59" cy="28" r="1.7" fill="currentColor" stroke="none" />
      {/* tower legs */}
      <path d="M32 15 L28 77" strokeWidth={4} />
      <path d="M68 15 L72 77" strokeWidth={4} />
      {/* lattice bracing */}
      <path d="M30 42 L70 64" strokeWidth={2.6} />
      <path d="M70 42 L30 64" strokeWidth={2.6} />
      <path d="M29.5 53 H70.5" strokeWidth={2.6} />
      {/* shaft house */}
      <path d="M24 77 H76 V94 H24 Z" strokeWidth={3.6} />
      {/* windows */}
      <path
        d="M38 77 V94 M50 77 V94 M62 77 V94 M24 85.5 H76"
        strokeWidth={2.6}
      />
      {/* ground line */}
      <path d="M18 94 H82" strokeWidth={4} />
    </svg>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function CatalogIcon({
  type,
}: {
  type: "women" | "men" | "kids" | "accessories" | "glass" | "dtf"
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      aria-hidden="true"
      className="catalog-icon"
    >
      {type === "men" && (
        <>
          <circle cx="12" cy="5" r="3" fill="currentColor" />
          <path d="M8 10h8v10H8z" fill="currentColor" />
        </>
      )}
      {type === "women" && (
        <>
          <circle cx="12" cy="5" r="3" fill="currentColor" />
          <path d="M12 10 17 20H7l5-10Z" fill="currentColor" />
        </>
      )}
      {type === "kids" && (
        <>
          <circle cx="12" cy="6" r="2.5" fill="currentColor" />
          <path d="M9 10h6l2 4-2 1v5H9v-5l-2-1 2-4Z" fill="currentColor" />
        </>
      )}
      {type === "accessories" && (
        <>
          <path
            d="M5 8h14v13H5V8Zm5-3h4a3 3 0 0 1 3 3H7a3 3 0 0 1 3-3Z"
            fill="currentColor"
          />
          <rect x="7" y="11" width="10" height="1.6" rx=".8" fill="#171717" />
        </>
      )}
      {type === "glass" && (
        <>
          <path
            d="M5 5h13v9a6 6 0 0 1-12 0V5Zm13 3h2a3 3 0 0 1 0 6h-2v-2h2a1 1 0 0 0 0-2h-2V8ZM11 19h2v2h4v2H7v-2h4v-2Z"
            fill="currentColor"
          />
        </>
      )}
      {type === "dtf" && (
        <>
          <path
            d="M6 3h9l4 4v14H6V3Zm9 1.8V8h3.2L15 4.8ZM9 11h7v7H9v-7Z"
            fill="currentColor"
          />
          <path
            d="m12.5 12.1.65 1.55 1.68.14-1.28 1.1.4 1.64-1.45-.86-1.45.86.39-1.64-1.27-1.1 1.67-.14.66-1.55Z"
            fill="#171717"
          />
        </>
      )}
    </svg>
  )
}

const ACCOUNT_SECTIONS = [
  { id: "personal", label: "PERSÖNLICHE DATEN" },
  { id: "addresses", label: "ADRESSEN" },
  { id: "orders", label: "BESTELLUNGEN" },
]

function customerName(customer: CustomerAccount | null) {
  // Shopify may temporarily use the e-mail as a display/first name. Keep it
  // out of the prominent profile label until real personal data is available.
  return [customer?.firstName, customer?.lastName]
    .filter((value) => value && !String(value).includes("@"))
    .join(" ")
}

function useCustomerAccount() {
  const [customer, setCustomer] = useState<CustomerAccount | null>(null)
  const [loading, setLoading] = useState(true)
  const refresh = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/customer-account?action=profile", {
        credentials: "same-origin",
        cache: "no-store",
      })
      if (response.status === 401) {
        setCustomer(null)
        return null
      }
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setCustomer(data.customer)
      return data.customer as CustomerAccount
    } catch {
      setCustomer(null)
      return null
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    refresh()
  }, [])
  useEffect(() => {
    const clearLocalSession = () => {
      setCustomer(null)
      setLoading(false)
    }
    window.addEventListener("pottler-account-logout", clearLocalSession)
    return () =>
      window.removeEventListener("pottler-account-logout", clearLocalSession)
  }, [])
  const signOut = async () => {
    const cartId = window.localStorage.getItem("pottlerkinder-cart-id")
    if (cartId) await shopCart.detach(cartId).catch(() => undefined)
    await fetch("/api/customer-account?action=logout", {
      method: "POST",
      credentials: "same-origin",
    })
    setCustomer(null)
    window.sessionStorage.removeItem("pottler-registration-details")
    window.sessionStorage.removeItem("pottler-registration-warning")
    window.sessionStorage.removeItem("pottler-account-section")
    window.dispatchEvent(new Event("pottler-account-logout"))
  }
  return { customer, loading, refresh, signOut }
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { cart } = useShopifyCart()
  const {
    customer: accountCustomer,
    loading: accountLoading,
    signOut: signOutAccount,
  } = useCustomerAccount()
  const cartQuantity = cart?.totalQuantity || 0
  useEffect(() => {
    if (!accountOpen) return
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (
        !target.closest(".account-menu") &&
        !target.closest("[data-account-trigger]")
      )
        setAccountOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAccountOpen(false)
    }
    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [accountOpen])
  const catalogTarget = (section: string, child?: string) => {
    const params = new URLSearchParams()
    const gender =
      section === "FRAUEN"
        ? "FRAUEN"
        : section === "MÄNNER"
          ? "MÄNNER"
          : section === "KINDER"
            ? "KINDER"
            : ""
    const category =
      child === "HOODIES" ||
      child === "SWEATSHIRTS" ||
      child === "T-SHIRTS" ||
      child === "POLOS"
        ? child
        : section === "ACCESSOIRES"
          ? "ACCESSOIRES"
          : section === "GLÄSER & TASSEN"
            ? "GLÄSER & TASSEN"
            : section === "DTF-TRANSFERS"
              ? "DTF-TRANSFERS"
              : ""
    if (gender) params.set("gender", gender)
    if (category) params.set("category", category)
    if (
      child &&
      !["HOODIES", "SWEATSHIRTS", "T-SHIRTS", "POLOS"].includes(child)
    )
      params.set("sub", child)
    return `/katalog${params.size ? `?${params}` : ""}`
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      {/* TopBar */}
      <div
        className="bg-[#ebebeb] h-[30px] w-full flex items-center justify-end gap-5 overflow-hidden"
        style={{ paddingRight: SECTION_PAD }}
      >
        {[
          { label: "GESCHICHTE", to: "/geschichte" },
          { label: "•" },
          { label: "BLOG", to: "/blog" },
          { label: "•" },
          { label: "ZECHEN", to: "/zechen" },
          { label: "•" },
          { label: "DEUTSCH" },
        ].map((item, i) =>
          item.to ? (
            <a
              key={i}
              href={item.to}
              className="text-[#1f1f1f] whitespace-nowrap topbar-link"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "1.5px",
              }}
            >
              {item.label}
            </a>
          ) : (
            <span
              key={i}
              className="text-[#1f1f1f] whitespace-nowrap"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "1.5px",
              }}
            >
              {item.label === "DEUTSCH" && (
                <img
                  src={imgGlobe}
                  alt="Sprache"
                  className="inline-block w-4 h-4 mr-1.5 align-[-3px] object-contain"
                  style={{
                    filter: "invert(1)",
                    mixBlendMode: "multiply",
                    transform: "translateY(2px)",
                  }}
                />
              )}
              {item.label}
            </span>
          ),
        )}
      </div>

      {/* Main header */}
      <div
        className="relative bg-[#141414] w-full"
        onMouseLeave={() => setCatalogOpen(false)}
        style={{ minHeight: 136 }}
      >
        <img
          src={imgHeaderCoal}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.2] pointer-events-none"
          style={{
            objectPosition: "center 42%",
            filter: "contrast(1.15) saturate(0.6)",
          }}
        />
        <img
          src={imgHeaderBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.52), rgba(18,18,18,0.18) 50%, rgba(10,10,10,0.52))",
          }}
        />
        {/* Bottom red accent lines */}
        <div className="header-center-lines absolute left-0 right-0 top-[82%] h-px z-20 hidden lg:block pointer-events-none">
          <span className="header-line header-line-left" />
          <span className="header-line header-line-right" />
        </div>

        {/* ── Desktop: single-row layout matching reference ── */}
        <div
          className="hidden lg:flex items-center max-w-[1440px] mx-auto w-full"
          style={{
            height: "clamp(116px, 8.4vw, 142px)",
            paddingLeft: SECTION_PAD,
            paddingRight: SECTION_PAD,
          }}
        >
          {/* LEFT NAV */}
          <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
            {[
              { label: "KATALOG", hasLines: true },
              { label: "SALE" },
              { label: "FÜR UNTERNEHMEN" },
            ].map((item) =>
              item.label === "FÜR UNTERNEHMEN" ? (
                <a
                  key={item.label}
                  href="/unternehmen"
                  className="btn-glass flex items-center gap-2 whitespace-nowrap"
                  style={{ padding: "9px 14px" }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(10px, 0.9vw, 13px)",
                      letterSpacing: "2px",
                      color: "white",
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              ) : item.label === "SALE" ? (
                <a
                  key={item.label}
                  href="/sale"
                  className="btn-glass flex items-center gap-2 whitespace-nowrap"
                  style={{ padding: "9px 14px" }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(10px, 0.9vw, 13px)",
                      letterSpacing: "2px",
                      color: "white",
                    }}
                  >
                    SALE
                  </span>
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() =>
                    item.label === "KATALOG" && setCatalogOpen(!catalogOpen)
                  }
                  className="btn-glass flex items-center gap-2 whitespace-nowrap"
                  style={{ padding: "9px 14px" }}
                >
                  {item.hasLines && (
                    <span className="flex flex-col gap-[3.5px]">
                      {[0, 1, 2].map((j) => (
                        <span
                          key={j}
                          className="block h-px bg-white rounded"
                          style={{ width: 13 }}
                        />
                      ))}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(10px, 0.9vw, 13px)",
                      letterSpacing: "2px",
                      color: "white",
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ),
            )}
          </div>

          {/* RED LINE — left of logo */}
          <div className="hidden" />

          {/* LOGO */}
          <a
            href="/"
            aria-label="На главную"
            className="flex flex-col items-center justify-center flex-shrink-0"
            style={{ gap: 1 }}
          >
            <img
              src={imgTowerLogo}
              alt="Pottlerkinder Förderturm"
              className="object-contain"
              style={{
                width: "clamp(82px, 7vw, 108px)",
                height: "clamp(70px, 6vw, 94px)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))",
              }}
            />
            <img
              src={imgWordmarkLogo}
              alt="Pottlerkinder"
              className="object-contain"
              style={{
                width: "clamp(156px, 13vw, 205px)",
                height: "clamp(30px, 2.6vw, 40px)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))",
              }}
            />
          </a>

          {/* RED LINE — right of logo */}
          <div className="hidden" />

          {/* RIGHT NAV */}
          <div className="flex items-center gap-2 flex-shrink-0 relative z-[30]">
            {/* EIGENER DESIGN */}
            <button
              onClick={() => {
                window.location.href = "/designer"
              }}
              className="btn-red flex items-center gap-2 whitespace-nowrap rounded-[5px]"
              style={{ padding: "9px 16px" }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.5 2.5H2.5V11.5M2.5 2.5L11.5 11.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(10px, 0.9vw, 13px)",
                  letterSpacing: "2px",
                  color: "white",
                }}
              >
                EIGENER DESIGN
              </span>
            </button>
            {/* LOGIN */}
            <div className="relative z-[30]">
              <button
                type="button"
                data-account-trigger
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                className="btn-glass flex items-center gap-2 whitespace-nowrap"
                style={{ padding: "9px 14px" }}
              >
                <img
                  src={imgAccount}
                  alt=""
                  className="w-4 h-4 object-contain mix-blend-screen flex-shrink-0"
                />
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(10px, 0.9vw, 13px)",
                    letterSpacing: "2px",
                    color: "white",
                  }}
                >
                  {accountLoading
                    ? "LOGIN"
                    : accountCustomer
                      ? "KONTO"
                      : "LOGIN"}
                </span>
              </button>
              {accountOpen && (
                <div className="desktop-account-menu hidden lg:block">
                  <AccountMenu
                    customer={accountCustomer}
                    onClose={() => setAccountOpen(false)}
                    onSignOut={signOutAccount}
                  />
                </div>
              )}
            </div>
            {/* WARENKORB */}
            <button
              type="button"
              onClick={() => {
                setCartOpen(true)
              }}
              className="btn-glass flex items-center gap-2 whitespace-nowrap"
              style={{ padding: "9px 14px" }}
            >
              <img
                src={imgCart}
                alt=""
                className="w-4 h-4 object-contain mix-blend-screen flex-shrink-0"
              />
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(10px, 0.9vw, 13px)",
                  letterSpacing: "2px",
                  color: "white",
                }}
              >
                WARENKORB
              </span>
              {cartQuantity > 0 && (
                <span className="cart-count">{cartQuantity}</span>
              )}
            </button>
          </div>
        </div>

        {catalogOpen && (
          <div
            className="desktop-catalog-menu hidden lg:block"
            style={{
              left: "max(16px, calc((100% - 1440px) / 2 + clamp(16px, 12vw, 210px)))",
            }}
          >
            <p className="catalog-menu-kicker">KOLLEKTIONEN</p>
            {[
              {
                label: "FRAUEN",
                icon: "women" as const,
                children: ["HOODIES", "T-SHIRTS", "SWEATSHIRTS", "POLOS"],
              },
              {
                label: "MÄNNER",
                icon: "men" as const,
                children: ["HOODIES", "T-SHIRTS", "SWEATSHIRTS", "POLOS"],
              },
              {
                label: "KINDER",
                icon: "kids" as const,
                children: ["HOODIES", "T-SHIRTS", "SWEATSHIRTS", "POLOS"],
              },
              {
                label: "UNISEX",
                icon: "unisex" as const,
                children: ["HOODIES", "T-SHIRTS", "SWEATSHIRTS", "POLOS"],
              },
              {
                label: "ACCESSOIRES",
                icon: "accessories" as const,
                sectionStart: true,
                children: ["KOPFBEDECKUNG", "SHOPPER", "SCHMUCK", "PINS"],
              },
              {
                label: "GLÄSER & TASSEN",
                icon: "glass" as const,
                children: ["TASSEN", "BIERGLÄSER", "UNTERSETZER"],
              },
              {
                label: "DTF-TRANSFERS",
                icon: "dtf" as const,
                children: ["FÜR KLEIDUNG & TEXTILIEN"],
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`catalog-menu-item ${
                  item.sectionStart ? "catalog-section-start" : ""
                }`}
              >
                <button
                  onClick={() => {
                    window.location.href = catalogTarget(item.label)
                  }}
                  className="catalog-menu-trigger"
                >
                  <FilterOptionIcon label={item.label} />
                  <span>{item.label}</span>
                  <span className="catalog-chevron" />
                </button>
                {item.children && (
                  <div className="catalog-submenu">
                    {item.children.map((child) => (
                      <button
                        onClick={() => {
                          window.location.href = catalogTarget(
                            item.label,
                            child,
                          )
                        }}
                        key={child}
                      >
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* ── Mobile header row ── */}
        <div
          className="mobile-header flex lg:hidden items-center justify-between px-4"
          style={{ height: "clamp(86px, 19vw, 108px)" }}
        >
          <a
            href="/"
            aria-label="На главную"
            className="mobile-brand flex flex-col items-center justify-center"
            style={{ gap: 1 }}
          >
            <img
              src={imgTowerLogo}
              alt="Pottlerkinder Förderturm"
              className="object-contain"
              style={{
                width: 57,
                height: 53,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))",
              }}
            />
            <img
              src={imgWordmarkLogo}
              alt="Pottlerkinder"
              className="object-contain"
              style={{
                width: 122,
                height: 26,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.75))",
              }}
            />
          </a>
          <div className="mobile-actions flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                data-account-trigger
                onClick={() => setAccountOpen((open) => !open)}
                aria-label="Login"
                aria-expanded={accountOpen}
                className="btn-glass mobile-icon-btn"
              >
                <img src={imgAccount} alt="" className="mobile-icon-glyph" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setCartOpen(true)
              }}
              aria-label="Warenkorb"
              className="btn-glass mobile-icon-btn"
            >
              <img src={imgCart} alt="" className="mobile-icon-glyph" />
              {cartQuantity > 0 && (
                <span className="cart-count">{cartQuantity}</span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-glass mobile-menu-btn flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            >
              <span className="block w-5 h-0.5 bg-white rounded" />
              <span className="block w-5 h-0.5 bg-white rounded" />
              <span className="block w-5 h-0.5 bg-white rounded" />
            </button>
          </div>
        </div>

        {accountOpen && (
          <div className="mobile-account-menu flex lg:hidden">
            <AccountMenu
              customer={accountCustomer}
              onClose={() => setAccountOpen(false)}
              onSignOut={signOutAccount}
            />
          </div>
        )}

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d0d] border-t border-[rgba(255,255,255,0.07)] px-5 py-4 flex flex-col gap-1">
            {["KATALOG", "SALE"].map((item) =>
              item === "SALE" ? (
                <a
                  key={item}
                  href="/sale"
                  className="mobile-menu-action text-left"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: "2px",
                  }}
                >
                  SALE
                </a>
              ) : (
                <button
                  key={item}
                  className="mobile-menu-action text-left"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: "2px",
                  }}
                >
                  {item}
                </button>
              ),
            )}
            <a
              href="/unternehmen"
              className="mobile-menu-action text-left"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "2px",
              }}
            >
              FÜR UNTERNEHMEN
            </a>
            <a
              href="/designer"
              className="mobile-menu-action mobile-menu-design text-left mt-1"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "2px",
              }}
            >
              EIGENER DESIGN
            </a>
          </div>
        )}
      </div>
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </header>
  )
}

function CartQuantityControl({
  quantity,
  maxQuantity,
  onChange,
  disabled = false,
}: {
  quantity: number
  maxQuantity?: number | null
  onChange: (quantity: number) => void
  disabled?: boolean
}) {
  const atMaximum = typeof maxQuantity === "number" && quantity >= maxQuantity
  return (
    <div className="cart-quantity-control" aria-label="Menge auswählen">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= 1}
        aria-label="Menge verringern"
      >
        −
      </button>
      <output aria-live="polite">{quantity}</output>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={disabled || atMaximum}
        aria-label={atMaximum ? "Maximale verfügbare Menge erreicht" : "Menge erhöhen"}
      >
        +
      </button>
    </div>
  )
}

function CartDrawer({
  cart,
  onClose,
}: {
  cart: any | null
  onClose: () => void
}) {
  const [removing, setRemoving] = useState<string | null>(null)
  const lines = cart?.lines?.edges || []
  const total = cart?.cost?.totalAmount
  const subtotal = cart?.cost?.subtotalAmount || total
  const currency = subtotal?.currencyCode || "EUR"
  const subtotalValue = Number(subtotal?.amount || 0)
  const shippingValue = subtotalValue >= 85 ? 0 : 6.15
  const formatCartMoney = (amount: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(
      amount,
    )
  const removeLine = async (lineId: string) => {
    if (!cart?.id) return
    setRemoving(lineId)
    const previousCart = cart
    publishCart(cartWithoutLine(cart, lineId))
    try {
      const response = await shopCart.remove(cart.id, [lineId])
      publishCart((response as { cart: any }).cart)
    } catch {
      publishCart(previousCart)
    } finally {
      setRemoving(null)
    }
  }
  const updateLineQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id || quantity < 1) return
    setRemoving(lineId)
    const previousCart = cart
    publishCart(cartWithLineQuantity(cart, lineId, quantity))
    try {
      const response = await shopCart.update(cart.id, [{ id: lineId, quantity }])
      publishCart((response as { cart: any }).cart)
    } catch {
      publishCart(previousCart)
    } finally {
      setRemoving(null)
    }
  }
  return (
    <div
      className="cart-drawer-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Warenkorb"
    >
      <button
        type="button"
        className="cart-drawer-backdrop"
        onClick={onClose}
        aria-label="Warenkorb schließen"
      />
      <aside className="cart-drawer">
        <header className="cart-drawer-head">
          <div>
            <span>DEINE AUSWAHL</span>
            <h2>
              WARENKORB <b>{cart?.totalQuantity || 0}</b>
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Schließen">
            ×
          </button>
        </header>
        <div className="cart-drawer-lines">
          {!cart && (
            <p className="cart-drawer-empty">WARENKORB WIRD GELADEN.</p>
          )}
          {cart && lines.length === 0 && (
            <p className="cart-drawer-empty">DEIN WARENKORB IST LEER.</p>
          )}
          {lines.map(({ node }: any) => {
            const variant = node.merchandise
            const image = variant.product.featuredImage
            const price = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: variant.price.currencyCode,
            }).format(Number(variant.price.amount))
            return (
              <article className="cart-drawer-line" key={node.id}>
                <div className="cart-drawer-image">
                  {image?.url && (
                    <img
                      src={image.url}
                      alt={image.altText || variant.product.title}
                    />
                  )}
                </div>
                <div className="cart-drawer-copy">
                  <p>{variant.product.title}</p>
                  <span>{variant.title}</span>
                  <strong>
                    {node.quantity} × {price}
                  </strong>
                  <PriceLegalNote />
                  <CartQuantityControl
                    quantity={node.quantity}
                    maxQuantity={typeof variant.quantityAvailable === "number" ? variant.quantityAvailable : null}
                    onChange={(quantity) => updateLineQuantity(node.id, quantity)}
                    disabled={removing === node.id}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(node.id)}
                  disabled={removing === node.id}
                  className="cart-drawer-remove"
                >
                  ENTFERNEN
                </button>
              </article>
            )
          })}
        </div>
        <footer className="cart-drawer-foot">
          <div className="cart-drawer-costs">
            <div>
              <span>ZWISCHENSUMME</span>
              <strong>{subtotal ? formatCartMoney(subtotalValue) : "—"}</strong>
            </div>
            <div>
              <span>VERSAND · DHL / GLS</span>
              <strong className={shippingValue === 0 ? "is-free" : ""}>
                {shippingValue === 0
                  ? "KOSTENLOS"
                  : formatCartMoney(shippingValue)}
              </strong>
            </div>
            <div className="cart-drawer-grand-total">
              <span>VORAUSSICHTLICH GESAMT</span>
              <strong>
                {subtotal
                  ? formatCartMoney(subtotalValue + shippingValue)
                  : "—"}
              </strong>
            </div>
          </div>
          <p className="cart-shipping-note">
            * KOSTENLOSER VERSAND AB 85,00 € WARENWERT.
          </p>
          <a href="/katalog" onClick={onClose} className="cart-drawer-continue">
            ← WEITER EINKAUFEN
          </a>
          {cart?.checkoutUrl && lines.length > 0 && (
            <a href={cart.checkoutUrl} className="btn-red cart-drawer-checkout">
              SICHER ZUR KASSE <span>→</span>
            </a>
          )}
        </footer>
      </aside>
    </div>
  )
}

function AccountMenu({
  customer,
  onClose,
  onSignOut,
}: {
  customer: CustomerAccount | null
  onClose: () => void
  onSignOut: () => Promise<void>
}) {
  const go = (section: string) => {
    onClose()
    window.location.href = `/account?section=${section}`
  }
  const name = customerName(customer)
  return (
    <div className="account-menu" role="menu">
      <div className="account-menu-head">
        <span>GLÜCK AUF</span>
        {customer && <strong>{name || "MEIN KONTO"}</strong>}
      </div>
      {!customer && (
        <button
          type="button"
          className="account-menu-login btn-red"
          onClick={() => go("personal")}
        >
          ANMELDEN
        </button>
      )}
      {ACCOUNT_SECTIONS.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => go(item.id)}
          role="menuitem"
        >
          <span>{item.label}</span>
          <b aria-hidden="true">›</b>
        </button>
      ))}
      {customer && (
        <div className="account-menu-footer">
          <button
            type="button"
            className="btn-glass account-menu-logout"
            onClick={async () => {
              await onSignOut()
              onClose()
            }}
          >
            ABMELDEN
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Hero Carousel ─────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % 3), 7000)
    return () => clearInterval(t)
  }, [])

  const slide = HERO_SLIDES[current]

  return (
    <div
      className="hero-carousel relative w-full overflow-hidden bg-[#0a0a0a]"
      style={{ height: "clamp(420px, 56vw, 1000px)" }}
    >
      {/* Slides — cross-fade */}
      {HERO_SLIDES.map((s, i) => (
        <img
          key={i}
          src={s.img}
          alt=""
          className={`hero-slide hero-slide-${i} absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000`}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          decoding="async"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.62) 30%, rgba(5,5,5,0.26) 57%, rgba(5,5,5,0.05) 78%)",
        }}
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,5,5,0.62) 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <div
        className="hero-content relative h-full max-w-[1440px] mx-auto flex flex-col justify-center pb-16 pt-8"
        style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
      >
        <div className="hero-content-panel">
          <div key={current} className="hero-copy">
            <div
              className="inline-flex items-center h-[24px] px-3 mb-5 w-fit"
              style={{
                background: "rgba(128,28,28,0.6)",
                border: "1.5px solid #7f1d1d",
              }}
            >
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "2px",
                  color: "#e04545",
                }}
                className="whitespace-nowrap"
              >
                {slide.tag}
              </span>
            </div>
            <div className="mb-5 min-h-[clamp(120px,19vw,284px)]">
              {[slide.line1, slide.line2, slide.line3].map((line, i) => {
                const isRed =
                  (i === 0 && slide.redLine === "line1") ||
                  (i === 1 && slide.redLine === "line2") ||
                  (i === 2 && slide.redLine === "line3")
                return (
                  <p
                    key={i}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(38px, 6vw, 90px)",
                      lineHeight: 1.2,
                      letterSpacing: "3px",
                      color: isRed ? "#db2626" : "#f5f5f5",
                      textTransform: "uppercase",
                    }}
                  >
                    {line}
                  </p>
                )
              })}
            </div>
            <p
              className="mb-8 max-w-[500px] min-h-[78px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.35vw, 17px)",
                lineHeight: 1.65,
                letterSpacing: "1.5px",
                color: "#f0f0f0",
              }}
            >
              {slide.sub}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="hero-actions flex flex-wrap gap-4 mb-10">
            <a
              href="/katalog"
              className="btn-red flex items-center justify-center rounded-[4px]"
              style={{
                height: "clamp(48px, 4vw, 58px)",
                width: "clamp(160px, 15vw, 210px)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(12px, 1.1vw, 15px)",
                  letterSpacing: "2.2px",
                  color: "white",
                }}
                className="uppercase"
              >
                ZUM KATALOG
              </span>
            </a>
            <a
              href="/designer"
              className="btn-outline flex items-center justify-center rounded-[4px]"
              style={{
                height: "clamp(48px, 4vw, 58px)",
                width: "clamp(180px, 17vw, 238px)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(12px, 1.1vw, 15px)",
                  letterSpacing: "2.2px",
                  color: "white",
                }}
                className="uppercase"
              >
                EIGENES DESIGN
              </span>
            </a>
          </div>

          {/* Mini stats */}
          <div className="hidden sm:flex gap-10 lg:gap-14">
            {[
              { value: "100%", label: "Bio-Cotton" },
              { value: "Schneller", label: "Versand" },
              { value: "Beste", label: "Qualität" },
            ].map((stat) => (
              <div
                key={stat.value}
                className="relative pl-3"
                style={{ borderLeft: "1.5px solid #991b1b" }}
              >
                <p
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2.2vw, 30px)",
                    letterSpacing: "3.6px",
                    color: "#f5f5f5",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(10px, 0.9vw, 13px)",
                    letterSpacing: "1.6px",
                    color: "rgba(245,245,245,0.8)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div
        className="absolute bottom-7 right-8 flex gap-2 items-center"
        style={{ right: SECTION_PAD }}
      >
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="hero-dot"
            style={{
              width: i === current ? 22 : 8,
              height: 8,
              background: i === current ? "#dc2626" : "rgba(255,255,255,0.28)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Banner Section ───────────────────────────────────────────────────────────

function BannerSection() {
  return (
    <div
      className="w-full bg-[#0a0a0a]"
      style={{ minHeight: "clamp(280px, 40vw, 660px)" }}
    >
      <div
        className="promo-banner flex flex-col md:flex-row"
        style={{ height: "clamp(280px, 40vw, 660px)" }}
      >
        {/* Left: image */}
        <div className="relative flex-[1.45] overflow-hidden min-h-[200px]">
          <img
            src={imgBannerImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(2,2,2,0.15)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0) 75%, rgba(10,10,10,0.88) 100%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={imgBannerImage1}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(10,10,10,0) 80%, rgba(10,10,10,0.5) 100%)",
              }}
            />
          </div>
          <div
            className="absolute left-0 top-0 w-[3px] h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(204,0,0,0) 0%, rgba(204,0,0,0.5) 25%, rgba(204,0,0,0.5) 75%, rgba(204,0,0,0) 100%)",
            }}
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block relative w-[40px] bg-[#070707] flex-shrink-0 overflow-hidden">
          <div
            className="signal-divider absolute left-[19.5px] top-[30px] w-px"
            style={{
              height: "calc(100% - 60px)",
              background: "rgba(115,15,15,0.55)",
              filter: "blur(0.4px)",
            }}
          />
        </div>

        {/* Right: copy */}
        <div
          className="relative flex-1 flex flex-col justify-center overflow-hidden min-h-[240px]"
          style={{
            paddingLeft: "clamp(24px, 4vw, 64px)",
            paddingRight: "clamp(24px, 4vw, 64px)",
            paddingTop: "clamp(24px, 3vw, 48px)",
            paddingBottom: "clamp(24px, 3vw, 48px)",
          }}
        >
          <img
            src={imgBannerContent}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(20,20,20,0.8)" }}
          />
          <div className="relative z-10 flex flex-col gap-5">
            <div className="w-[50px] h-[3px] bg-[#ba1c1c]" />
            <div>
              {["EIGENER DESIGN –", "DEIN SHIRT,", "DEINE REGELN"].map(
                (line) => (
                  <p
                    key={line}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(20px, 3.2vw, 44px)",
                      letterSpacing: "clamp(2px, 0.35vw, 5px)",
                      color: "#f5f5f5",
                      lineHeight: 1.45,
                    }}
                  >
                    {line}
                  </p>
                ),
              )}
            </div>
            <p
              className="max-w-[460px]"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 1.2vw, 16px)",
                lineHeight: 1.65,
                letterSpacing: "1.8px",
                color: "#d3d3d3",
              }}
            >
              Wähle aus über 500+ Motiven oder lade dein eigenes Bild hoch. Wir
              drucken es mit modernster DTF-Technologie auf Bio-Baumwolle – fair
              und nachhaltig.
            </p>
            <button
              className="btn-red flex items-center justify-center self-start rounded-[4px]"
              style={{
                height: "clamp(44px, 3.5vw, 56px)",
                padding: "0 clamp(20px, 3vw, 40px)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(11px, 1.1vw, 15px)",
                  letterSpacing: "2.2px",
                  color: "white",
                }}
              >
                JETZT GESTALTEN
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Categories Section ───────────────────────────────────────────────────────

function CategoryCard({ img, name }: { img: string name: string }) {
  return (
    <a
      href={`/katalog?category=${encodeURIComponent(name)}`}
      className="group cat-card flex-1 relative overflow-hidden rounded-[4px] min-w-0 cursor-pointer shadow-[0px_2px_12px_2px_rgba(0,0,0,0.6)] bg-[#0d0d0d]"
      style={{ minHeight: "clamp(160px, 22vw, 500px)" }}
    >
      {/* Image — framed / contained so the whole product is visible, not over-zoomed */}
      <img
        src={img}
        alt={name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)" }}
      />
      {/* Base gradient — keeps the label legible over the product photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 40%, transparent 62%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-7 lg:p-8">
        <p
          className="cat-name"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(16px, 2.5vw, 34px)",
            letterSpacing: "clamp(2px, 0.3vw, 4px)",
            color: "white",
            textTransform: "uppercase",
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {name}
        </p>
        <div className="hier-btn mt-2">
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(10px, 1vw, 13px)",
              letterSpacing: "clamp(1px, 0.2vw, 2px)",
              color: "rgba(255,255,255,0.8)",
              textTransform: "uppercase",
            }}
          >
            HIER STÖBERN
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(10px, 1vw, 13px)",
            }}
            className="transition-transform duration-300 group-hover:translate-x-1 inline-block"
          >
            →
          </span>
        </div>
      </div>
    </a>
  )
}

function CategoriesSection() {
  return (
    <div
      className="bg-[#0a0a0a] w-full relative"
      style={{ padding: "clamp(6px, 0.8vw, 15px)" }}
    >
      <div className="flex flex-col gap-[15px]">
        <div
          className="categories-row flex flex-col sm:flex-row gap-[15px]"
          style={{ height: "clamp(160px, 22vw, 530px)" }}
        >
          {CATEGORIES.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.name} img={cat.img} name={cat.name} />
          ))}
        </div>
        <div
          className="categories-row flex flex-col sm:flex-row gap-[15px]"
          style={{ height: "clamp(160px, 22vw, 530px)" }}
        >
          {CATEGORIES.slice(3).map((cat) => (
            <CategoryCard key={cat.name} img={cat.img} name={cat.name} />
          ))}
        </div>
      </div>
      <div
        className="cat-signal cat-signal-v cat-signal-v-one absolute top-[15px] bottom-[15px] hidden sm:block pointer-events-none"
        style={{
          left: "calc(33.333% + 5px)",
          width: 1,
          background: "rgba(115,15,15,0.6)",
          filter: "blur(0.5px)",
        }}
      />
      <div
        className="cat-signal cat-signal-v cat-signal-v-two absolute top-[15px] bottom-[15px] hidden sm:block pointer-events-none"
        style={{
          left: "calc(66.666% + 5px)",
          width: 1,
          background: "rgba(115,15,15,0.6)",
          filter: "blur(0.5px)",
        }}
      />
      <div
        className="cat-signal cat-signal-h absolute left-[15px] right-[15px] hidden sm:block pointer-events-none"
        style={{
          top: "50%",
          height: 1,
          background: "rgba(115,15,15,0.6)",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  )
}

// ─── Bestseller Carousel ──────────────────────────────────────────────────────

type BestsellerProduct = {
  slug: string
  img: string
  badge: string
  category: string
  name: string
  rating?: number
  price: string
  swatches: string[]
}

function ProductCard({ product }: { product: BestsellerProduct }) {
  return (
    <div
      className="product-card relative rounded-[8px] flex-shrink-0 overflow-hidden"
      role="link"
      tabIndex={0}
      data-product-url={`/katalog/${product.slug}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ")
          window.location.href = `/katalog/${product.slug}`
      }}
      style={{
        background: "#202020",
        border: "1px solid #484848",
        width: "clamp(260px, 22vw, 340px)",
        boxShadow: "0px 10px 24px -10px rgba(0,0,0,0.55)",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(220px, 18vw, 310px)" }}
      >
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "150px",
            background:
              "linear-gradient(180deg, transparent 20%, rgba(6,6,6,0.22) 42%, rgba(6,6,6,0.9) 100%)",
          }}
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[4px] bg-[#b91c1c]">
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "1.4px",
              color: "white",
            }}
          >
            {product.badge}
          </span>
        </div>
        {/* Wishlist */}
        <button
          onClick={(event) => event.stopPropagation()}
          className="btn-wishlist absolute top-3 right-3 w-9 h-9 rounded-full bg-black/45 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={svgPaths.p3bd7ee70}
              stroke="white"
              strokeLinecap="round"
              strokeOpacity="0.9"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        {/* Meta overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "1.7px",
              color: "#aaa",
              textTransform: "uppercase",
            }}
          >
            {product.category}
          </p>
          <p
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "white",
            }}
          >
            {product.name}
          </p>
          {product.rating && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[#f59e0b] text-[13px]">★★★★★</span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "#a3a3a3",
                }}
              >
                ({product.rating})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action row */}
      <div
        className="flex items-center justify-between p-4 bg-[#292929]"
        style={{ borderTop: "1px solid #4a4a4a" }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1.5">
            {product.swatches.map((c, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-[#222]"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="product-card-price"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              color: "white",
            }}
          >
            {product.price}
            <PriceLegalNote />
          </div>
        </div>
        <a
          href={`/katalog/${product.slug}`}
          className="btn-ansehen flex items-center gap-1.5 px-4 py-2.5 rounded-[6px]"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          aria-label={`${product.name} ansehen`}
        >
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "white",
              letterSpacing: "1px",
            }}
          >
            Ansehen
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="arrow-icon"
          >
            <path
              d={svgPaths.p278a3600}
              stroke="white"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

function BestsellerSection() {
  const [drag, setDrag] = useState<{ x: number position: number } | null>(null)
  const { products: shopifyProducts } = useShopifyCatalog()
  const bestsellers = useMemo<BestsellerProduct[]>(
    () =>
      [...(shopifyProducts ?? [])]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map((product) => ({
          slug: product.slug,
          img: product.image,
          badge: "BESTSELLER",
          category: product.category,
          name: product.name,
          price: product.price,
          swatches: product.colors,
        })),
    [shopifyProducts],
  )
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const carouselStarted = useRef(false)
  const carouselPosition = useRef(0)
  const canLoopBestsellers = bestsellers.length > 1

  useEffect(() => {
    if (!canLoopBestsellers) return
    const viewport = carouselRef.current
    const group =
      carouselTrackRef.current?.querySelector<HTMLElement>(".bestseller-group")
    const track = carouselTrackRef.current
    if (!viewport || !group || !track) return
    const unit = group.offsetWidth
    if (!carouselStarted.current) {
      carouselPosition.current = unit
      carouselStarted.current = true
    }
    let frame = 0
    let previous = performance.now()
    const draw = () => {
      track.style.transform = `translate3d(${-carouselPosition.current}px,0,0)`
    }
    const move = (now: number) => {
      if (!drag) {
        carouselPosition.current -= (now - previous) * 0.018
        if (carouselPosition.current <= 0) carouselPosition.current += unit
        if (carouselPosition.current >= unit * 2)
          carouselPosition.current -= unit
        draw()
      }
      previous = now
      frame = requestAnimationFrame(move)
    }
    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [drag, bestsellers.length])

  return (
    <div className="w-full bg-[#0a0a0a] py-8 sm:py-10">
      {/* Header row with consistent padding */}
      <div
        className="bestseller-header max-w-[1440px] mx-auto mb-6 flex items-center justify-between"
        style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-[38px] rounded-[2px] bg-[#b91c1c]" />
          <div>
            <p
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "1.6px",
                color: "#888",
              }}
            >
              Bestseller & Neuheiten
            </p>
            <p
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2.5vw, 30px)",
                letterSpacing: "3.4px",
                color: "white",
              }}
            >
              BESTSELLER & NEUHEITEN
            </p>
          </div>
        </div>
        <a href="/katalog" className="bestseller-all whitespace-nowrap">
          ALLE ANSEHEN <span>→</span>
        </a>
      </div>

      {/* Scrolling carousel */}
      <div
        className={`bestseller-viewport w-full overflow-hidden ${
          drag ? "is-dragging" : ""
        }`}
        ref={carouselRef}
        onPointerDown={(event) => {
          if (!canLoopBestsellers || event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          setDrag({ x: event.clientX, position: carouselPosition.current })
        }}
        onPointerMove={(event) => {
          if (!canLoopBestsellers || !drag || !carouselTrackRef.current) return
          let next = drag.position - (event.clientX - drag.x)
          const unit =
            carouselTrackRef.current.querySelector<HTMLElement>(
              ".bestseller-group",
            )?.offsetWidth ?? 0
          if (unit) {
            while (next <= 0) next += unit
            while (next >= unit * 2) next -= unit
          }
          carouselPosition.current = next
          carouselTrackRef.current.style.transform = `translate3d(${-next}px,0,0)`
        }}
        onPointerUp={(event) => {
          const wasClick = drag && Math.abs(event.clientX - drag.x) < 7
          setDrag(null)
          if (!wasClick) return
          const target = event.target as HTMLElement
          if (target.closest(".btn-wishlist")) return
          const card = target.closest<HTMLElement>(".product-card")
          const productUrl = card?.dataset.productUrl
          if (productUrl) {
            event.preventDefault()
            window.location.assign(productUrl)
          }
        }}
        onPointerCancel={() => setDrag(null)}
      >
        <div style={{ paddingLeft: SECTION_PAD }}>
          <div
            ref={carouselTrackRef}
            className={`bestseller-track flex ${
              canLoopBestsellers ? "" : "justify-center"
            }`}
            style={{ width: canLoopBestsellers ? "max-content" : "100%" }}
          >
            {(canLoopBestsellers ? [0, 1, 2] : [0]).map((group) => (
              <div className="bestseller-group flex gap-4" key={group}>
                {bestsellers.map((product) => (
                  <ProductCard
                    key={`${group}-${product.name}`}
                    product={product}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Trust Badges Bar ─────────────────────────────────────────────────────────

function TrustBadgesBar() {
  const badges = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d={svgPaths.p1980b800} fill="white" />
          <path d={svgPaths.p3e3ad280} fill="white" />
          <path d={svgPaths.p26a56b80} fill="white" />
          <path d={svgPaths.p31961980} fill="white" />
          <path d={svgPaths.p22e07330} fill="white" />
        </svg>
      ),
      title: "Made im Ruhrpott",
      sub: "Jedes Stück mit Geschichte",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d={svgPaths.p30474200} fill="white" />
          <path d={svgPaths.pe449880} fill="white" />
        </svg>
      ),
      title: "100% Bio-Baumwolle",
      sub: "OEKO-TEX® zertifiziert",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d={svgPaths.p23c029d0} fill="white" />
          <path d={svgPaths.p2bd42100} fill="white" />
          <path d={svgPaths.p1c504500} fill="white" />
          <path d={svgPaths.p39c3ec00} fill="white" />
        </svg>
      ),
      title: "Gratis Versand ab 85€",
      sub: "3–5 Werktage Lieferzeit",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d={svgPaths.p25bc3a80} fill="white" />
        </svg>
      ),
      title: "30 Tage Rückgabe",
      sub: "Für Produkte aus dem Katalog",
    },
  ]

  return (
    <div
      className="w-full"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}
    >
      <div
        className="trust-grid max-w-[1440px] mx-auto flex flex-wrap sm:flex-nowrap justify-around gap-6 py-9"
        style={{
          paddingLeft: SECTION_PAD,
          paddingRight: SECTION_PAD,
          minHeight: 120,
        }}
      >
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex flex-col items-center gap-2.5 flex-1 min-w-[120px]"
          >
            {badge.icon}
            <div className="text-center">
              <p
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(12px, 1.1vw, 15px)",
                  letterSpacing: "1.8px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {badge.title}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(11px, 0.9vw, 13px)",
                  color: "#a3a3a3",
                }}
              >
                {badge.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Brand / Coal Section ─────────────────────────────────────────────────────

function BrandSection() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#0a0a0a]"
      style={{ minHeight: "clamp(380px, 48vw, 920px)" }}
    >
      <img
        src={imgCoalTexture}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(10,10,10) 0%, rgb(10,10,10) 38%, rgba(10,10,10,0.85) 54%, rgba(5,5,5,0.5) 68%, rgba(0,0,0,0.2) 84%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div
        className="brand-content relative max-w-[1440px] mx-auto flex flex-col justify-between"
        style={{
          paddingLeft: SECTION_PAD,
          paddingRight: SECTION_PAD,
          paddingTop: "clamp(52px, 6vw, 96px)",
          paddingBottom: "clamp(52px, 6vw, 96px)",
          minHeight: "clamp(380px, 48vw, 920px)",
        }}
      >
        <div className="flex flex-col gap-8 max-w-[600px]">
          <div className="w-[56px] h-[3px] bg-[#dc2626]" />
          <p
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 3.8vw, 54px)",
              letterSpacing: "3.8px",
              color: "#f5f5f5",
              textTransform: "uppercase",
              lineHeight: 1.22,
            }}
          >
            <span>RESPEKT FÜR DIE VERGANGENHEIT. </span>
            <span style={{ color: "#b91c1c" }}>DESIGN FÜR DIE ZUKUNFT.</span>
          </p>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.35vw, 18px)",
              lineHeight: 1.7,
              color: "#ccc",
            }}
          >
            <p className="mb-4">
              Das Ruhrgebiet befindet sich im großen Wandel. Halden und
              Fördertürme werden zunehmend von Industriestandorten zu Orten der
              Kultur, Begegnung und Romantik. Wir von Pottlerkinder bewahren
              dieses Erbe sorgfältig und hauchen ihm neues Leben ein.
            </p>
            <p>
              Vom hochwertigen DTF-Druck auf T-Shirts und Hoodies bis hin zum
              einzigartigen Schmuck aus echter Ruhrkohle schaffen wir Produkte,
              die die Seele der Region tragen. Klicken Sie auf den Button, um
              mehr über unseren Weg zu erfahren.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-start">
          <a
            href="/ueber-uns"
            className="btn-red flex items-center justify-center rounded-[2px]"
            style={{ padding: "15px 44px" }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(12px, 1.1vw, 15px)",
                letterSpacing: "3px",
                color: "white",
              }}
            >
              DIE GANZE GESCHICHTE
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "Eigene", sub: "Produktion" },
    { value: "100%", sub: "Bio-Baumwolle" },
    { value: "500+", sub: "Zufriedene Kumpel" },
    { value: "3–5 Tage", sub: "Lieferzeit" },
  ]

  return (
    <div className="w-full bg-[#1a1a1a] overflow-hidden">
      <div
        className="stats-grid max-w-[1440px] mx-auto py-5 grid grid-cols-2 sm:grid-cols-4 gap-4"
        style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
      >
        {stats.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center">
            <p
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2.2vw, 28px)",
                letterSpacing: "3.4px",
                color: "white",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(10px, 0.8vw, 12px)",
                letterSpacing: "1.2px",
                color: "#aaa",
                textAlign: "center",
              }}
            >
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Social bar */}
      <div className="w-full bg-[#111] border-t border-b border-[#242424] py-7">
        <div
          className="max-w-[1440px] mx-auto flex flex-col items-center gap-5"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <p
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "2px",
              color: "white",
            }}
          >
            FOLGT UNS AUF:
          </p>
          <div className="flex gap-5">
            {/* Facebook */}
            <button className="btn-social w-14 h-14 rounded-[14px] bg-[#373737] border border-white/60 flex items-center justify-center cursor-pointer">
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                f
              </span>
            </button>
            {/* Instagram */}
            <button className="btn-social w-14 h-14 rounded-[14px] bg-[#373737] border border-white/60 flex items-center justify-center cursor-pointer">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect
                  x="1.25"
                  y="1.25"
                  width="25.5"
                  height="25.5"
                  rx="6.75"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="5.25"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="21" cy="7" r="1.75" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src={imgFooterBg}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(10,10,10,0.88)]" />
        <div
          className="footer-content relative max-w-[1440px] mx-auto py-12 sm:py-16"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* HILFE */}
            <div>
              <div className="border-b border-[#2a2a2a] pb-4 mb-5">
                <p
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "2.8px",
                    color: "#d4d4d4",
                  }}
                >
                  HILFE
                </p>
              </div>
              <div className="footer-help-links">
              {[
                ["Zahlung", "/zahlung"],
                ["Versandkosten", "/versandkosten"],
                ["Rücksendung & Umtausch", "/rueckgabe-umtausch"],
                ["Widerrufsbelehrung", "/widerrufsbelehrung"],
                ["Kontakt", "mailto:kontakt@pottlerkinder.de"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="footer-link mb-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    letterSpacing: "1.5px",
                    color: "#ccc",
                    lineHeight: 2,
                  }}
                >
                  {label}
                </a>
              ))}
              </div>
            </div>

            {/* ZAHLUNGSMETHODEN */}
            <div>
              <div className="border-b border-[#2a2a2a] pb-4 mb-5">
                <p
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "2.8px",
                    color: "#d4d4d4",
                  }}
                >
                  ZAHLUNGSMETHODEN
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PayPal", "Visa", "Mastercard", "Stripe"].map((method) => (
                  <div
                    key={method}
                    className="h-9 px-4 flex items-center justify-center rounded-[4px]"
                    style={{ background: "#1a1a1a", border: "1px solid #333" }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        color: "#e0e0e0",
                      }}
                    >
                      {method}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* VERSAND */}
            <div>
              <div className="border-b border-[#2a2a2a] pb-4 mb-5">
                <p
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "2.8px",
                    color: "#d4d4d4",
                  }}
                >
                  VERSAND DURCH
                </p>
              </div>
              <div className="flex gap-2 mb-4">
                {["DHL", "GLS"].map((s) => (
                  <div
                    key={s}
                    className="px-5 py-2.5 rounded-[4px]"
                    style={{ background: "#1a1a1a", border: "1px solid #333" }}
                  >
                    <span
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        letterSpacing: "1.6px",
                        color: "#e0e0e0",
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  letterSpacing: "1.5px",
                  color: "#888",
                  lineHeight: 1.6,
                }}
              >
                Lieferzeit 3–5 Werktage. Versand innerhalb Deutschlands 6,15 €.
                Kostenloser Versand ab 85 €.
              </p>
            </div>

            {/* NEWSLETTER */}
            <div>
              <div className="border-b border-[#2a2a2a] pb-4 mb-5">
                <p
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "2.8px",
                    color: "#d4d4d4",
                  }}
                >
                  NEWSLETTER
                </p>
              </div>
              <p
                className="mb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  letterSpacing: "1.5px",
                  color: "#888",
                  lineHeight: 1.6,
                }}
              >
                Neue Motive, Aktionen & exklusive Angebote direkt aus dem
                Revier.
              </p>
              <input
                type="email"
                placeholder="deine@email.de"
                className="w-full mb-2.5 px-3.5 py-2.5 rounded-[2px] outline-none"
                style={{
                  background: "#1a1a1a",
                  border: "1.5px solid white",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  letterSpacing: "1.5px",
                  color: "#8c8c8c",
                }}
              />
              <button
                className="btn-subscribe w-full py-3 rounded-[2px] mb-3"
                style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
              >
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "1.6px",
                    color: "white",
                  }}
                >
                  Newsletter abonnieren
                </span>
              </button>
              <label className="flex items-start gap-2 cursor-pointer">
                <div
                  className="w-[13px] h-[13px] flex-shrink-0 mt-0.5 rounded-[2px]"
                  style={{ background: "#1a1a1a", border: "1px solid #555" }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    color: "#555",
                    lineHeight: 1.55,
                  }}
                >
                  Ich stimme der{" "}
                  <span className="text-[#888] underline">
                    Datenschutzerklärung
                  </span>{" "}
                  zu.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-[#1e1e1e] bg-[#020202]">
        <div
          className="copyright-row max-w-[1440px] mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <div className="flex flex-wrap gap-4 sm:gap-5 justify-center sm:justify-start">
            {[
              "AGB",
              "Datenschutz",
              "Impressum",
              "Widerrufsbelehrung",
            ].map((link) => (
              <a
                href={`/${link === "AGB" ? "agb" : link === "Datenschutz" ? "datenschutz" : link === "Impressum" ? "impressum" : "widerrufsbelehrung"}`}
                key={link}
                className="copy-link"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  letterSpacing: "1.3px",
                  color: "#aaa",
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              letterSpacing: "1.3px",
              color: "#8c8c8c",
              textAlign: "center",
            }}
          >
            © 2026 Pottlerkinder · Alle Preise inkl. MwSt. zzgl. Versandkosten
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function PageShell({
  children,
  inner = false,
}: {
  children: React.ReactNode
  inner?: boolean
}) {
  return (
    <div
      className={`w-full min-h-screen flex flex-col ${
        inner ? "page-shell-inner" : "bg-[#0a0a0a]"
      }`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  )
}

function PageHero({
  eyebrow,
  title,
  lead,
  image = imgCoalTexture,
  compact = false,
}: {
  eyebrow: string
  title: string
  lead: string
  image?: string
  compact?: boolean
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-[#301414] ${
        compact ? "page-hero-compact" : ""
      }`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      <div
        className="absolute inset-0"
        style={{
          background: compact
            ? "linear-gradient(90deg,rgba(5,5,5,.82),rgba(10,10,10,.48) 55%,rgba(5,5,5,.7))"
            : "linear-gradient(90deg,rgba(5,5,5,.98),rgba(10,10,10,.77) 48%,rgba(5,5,5,.83))",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(116deg,transparent 0,transparent 48px,rgba(208,42,42,.16) 49px,transparent 50px)",
        }}
      />
      <div
        className={`relative max-w-[1440px] mx-auto ${
          compact ? "py-9 sm:py-12" : "py-20 sm:py-28"
        }`}
        style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
      >
        <p
          className="mb-5 text-[#d73737]"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "3px",
          }}
        >
          {eyebrow}
        </p>
        <h1
          className="max-w-4xl text-white uppercase"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: compact
              ? "clamp(34px, 4.4vw, 60px)"
              : "clamp(38px, 6vw, 82px)",
            letterSpacing: "3px",
            lineHeight: 1.22,
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={
              compact
                ? "mt-4 max-w-2xl text-[#cfcfcf]"
                : "mt-8 max-w-2xl text-[#cfcfcf]"
            }
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(14px, 1.25vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  )
}

function TextPage({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  image?: string
  children: React.ReactNode
}) {
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero eyebrow={eyebrow} title={title} lead={lead} image={image} />
        <article
          className="page-article max-w-[1000px] mx-auto py-14 sm:py-20"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          {children}
        </article>
      </main>
    </PageShell>
  )
}

type LegalSection = { title: string; text: string }

const LEGAL_PAGES: Record<string, { eyebrow: string; title: string; lead: string; sections: LegalSection[] }> = {
  "/agb": {
    eyebrow: "RECHTLICHE INFORMATIONEN", title: "ALLGEMEINE GESCHÄFTSBEDINGUNGEN", lead: "Allgemeine Geschäftsbedingungen von Pottlerkinder, Inhaberin Natalia Lewandowski.",
    sections: [
      { title: "1. GELTUNGSBEREICH", text: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Waren und Dienstleistungen zwischen Pottlerkinder und Kundinnen und Kunden. Für Verbraucher gelten die gesetzlichen Vorschriften; gegenüber Unternehmern gelten ergänzende Regelungen dieser AGB." },
      { title: "2. VERTRAGSGEGENSTAND & VERTRAGSSCHLUSS", text: "Wir bieten Textilien, DTF-Drucke, Stickereien, Tassen und weitere veredelte oder personalisierte Produkte an. Die Darstellung im Shop ist kein verbindliches Angebot. Mit der Bestellung geben Sie ein verbindliches Angebot ab; der Vertrag kommt mit unserer Auftragsbestätigung oder Lieferung zustande." },
      { title: "3. INDIVIDUELL GEFERTIGTE PRODUKTE", text: "Produkte, die nach Kundenspezifikation angefertigt oder eindeutig personalisiert werden, sind vom gesetzlichen Widerrufsrecht ausgeschlossen. Dazu zählen insbesondere Motive, Namen, Logos, Texte und individuell veredelte Artikel." },
      { title: "4. KUNDENDATEIEN, URHEBERRECHT & RECHTE DRITTER", text: "Für hochgeladene Motive, Logos und Dateien sind Sie verantwortlich. Sie bestätigen, über die erforderlichen Nutzungsrechte zu verfügen und keine Rechte Dritter oder gesetzlichen Vorschriften zu verletzen. Bei Ansprüchen Dritter stellen Sie Pottlerkinder von berechtigten Ansprüchen frei." },
      { title: "5. PREISE, ZAHLUNG & LIEFERUNG", text: "Alle Preise verstehen sich in Euro einschließlich der gesetzlichen Mehrwertsteuer zuzüglich Versandkosten. Die verfügbaren Zahlungsarten werden im Checkout angezeigt. Der Versand erfolgt innerhalb Deutschlands über DHL oder GLS; Lieferzeiten können bei personalisierten Produkten bis zu 15 Werktage betragen." },
      { title: "6. MÄNGEL, HAFTUNG & SCHLUSSBESTIMMUNGEN", text: "Es gelten die gesetzlichen Mängelrechte. Farbabweichungen, Materialeigenschaften und technisch bedingte Abweichungen bei Textil- oder Druckerzeugnissen können handelsüblich sein. Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gesetzliche Verbraucherrechte und die Regelungen zur Streitbeilegung bleiben unberührt." },
    ],
  },
  "/datenschutz": {
    eyebrow: "RECHTLICHE INFORMATIONEN", title: "DATENSCHUTZERKLÄRUNG", lead: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO und TDDDG.",
    sections: [
      { title: "1. VERANTWORTLICHE STELLE", text: "Pottlerkinder · Inhaberin Natalia Lewandowski · Horster Str. 118 · 45897 Gelsenkirchen · Deutschland. Telefon: +49 209 36171378 · WhatsApp: +49 176 26091435 · E-Mail: kontakt@pottlerkinder.de." },
      { title: "2. RECHTSGRUNDLAGEN", text: "Wir verarbeiten Daten nach DSGVO und TDDDG, insbesondere zur Vertragserfüllung, aufgrund berechtigter Interessen, gesetzlicher Pflichten oder Ihrer Einwilligung." },
      { title: "3. SHOP, BESTELLUNG & KUNDENKONTO", text: "Der Shop wird über Shopify bereitgestellt. Für Bestellungen und Kundenkonten verarbeiten wir insbesondere Name, Anschrift, E-Mail-Adresse, Zahlungs- und Bestelldaten. Die Verarbeitung dient der Bestellung, Lieferung, Zahlung, Kommunikation und Erfüllung gesetzlicher Aufbewahrungspflichten." },
      { title: "4. PERSONALISIERTE INHALTE & KONTAKT", text: "Hochgeladene Designs, Texte und Motive werden ausschließlich zur Herstellung und Abwicklung der Bestellung verarbeitet. Bei einer Kontaktaufnahme verarbeiten wir die übermittelten Daten zur Bearbeitung Ihres Anliegens." },
      { title: "5. DIENSTLEISTER, COOKIES & EXTERNE INHALTE", text: "Zahlungsdienste, Versanddienstleister (DHL/GLS), Shopify sowie gegebenenfalls Google Maps, Instagram und Analysedienste verarbeiten Daten nur im jeweils erforderlichen Umfang. Nicht notwendige Cookies und Analysefunktionen werden nur nach Ihrer Einwilligung eingesetzt." },
      { title: "6. IHRE RECHTE", text: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch sowie Widerruf einer Einwilligung. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde." },
    ],
  },
  "/impressum": {
    eyebrow: "RECHTLICHE INFORMATIONEN", title: "IMPRESSUM", lead: "Angaben gemäß § 5 DDG.",
    sections: [
      { title: "ANBIETER", text: "Pottlerkinder · Inhaberin: Natalia Lewandowski · Horster Str. 118 · 45897 Gelsenkirchen · Deutschland." },
      { title: "KONTAKT", text: "Telefon: +49 209 36171378 · WhatsApp: +49 176 26091435 · E-Mail: kontakt@pottlerkinder.de." },
      { title: "UMSATZSTEUER", text: "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE355669789." },
      { title: "INHALTLICH VERANTWORTLICH", text: "Natalia Lewandowski, Horster Str. 118, 45897 Gelsenkirchen. Pottlerkinder ist ein Einzelunternehmen und nicht im Handelsregister eingetragen." },
      { title: "VERBRAUCHERSTREITBEILEGUNG", text: "Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." },
    ],
  },
  "/versandkosten": {
    eyebrow: "VERSAND & LIEFERUNG", title: "VERSANDKOSTEN", lead: "Transparente Lieferinformationen für Bestellungen innerhalb Deutschlands.",
    sections: [
      { title: "VERSAND INNERHALB DEUTSCHLANDS", text: "Wir versenden unsere Produkte innerhalb Deutschlands mit DHL / GLS. Die Versandkosten betragen 6,15 € pro Bestellung. Ab einem Bestellwert von 85,00 € ist der Versand innerhalb Deutschlands kostenfrei. Die Versandkosten werden im Bestellprozess vor Abschluss der Bestellung nochmals angezeigt." },
      { title: "BEARBEITUNGSZEIT", text: "Standardprodukte: Die Bearbeitungszeit beträgt in der Regel 3–5 Werktage. Personalisierte und individuell angefertigte Produkte: Die Bearbeitungszeit beträgt in der Regel bis zu 15 Werktage. Die anschließende Versandlaufzeit richtet sich nach DHL und ist in diesen Bearbeitungszeiten nicht enthalten. Bei individuell gestalteten Produkten kann die Bearbeitungszeit je nach Umfang und Art des Auftrags variieren. Die für das jeweilige Produkt angegebene Lieferzeit ist maßgeblich." },
      { title: "VERSANDBESTÄTIGUNG", text: "Sobald deine Bestellung an DHL übergeben wurde, erhältst du – sofern verfügbar – eine Versandbestätigung mit den Informationen zur Sendungsverfolgung." },
      { title: "LIEFERADRESSE", text: "Bitte achte bei deiner Bestellung auf die korrekte und vollständige Lieferadresse. Für Verzögerungen, die durch fehlerhafte oder unvollständige Adressangaben entstehen, können zusätzliche Kosten anfallen." },
      { title: "AUSLANDSLIEFERUNGEN", text: "Der Versand erfolgt derzeit ausschließlich innerhalb Deutschlands." },
      { title: "PERSONALISIERTE PRODUKTE", text: "Bei personalisierten und individuell angefertigten Produkten beginnt die Bearbeitung nach Eingang der Bestellung bzw. nach vollständiger Klärung der erforderlichen Angaben und Gestaltung. Bitte beachte, dass sich die Bearbeitungszeit verlängern kann, wenn Angaben oder Freigaben für die Anfertigung fehlen. Informationen zum Widerrufsrecht bei individuell angefertigten und personalisierten Produkten findest du in unserer Widerrufsbelehrung." },
    ],
  },
  "/rueckgabe-umtausch": {
    eyebrow: "SERVICE", title: "RÜCKGABE & UMTAUSCH", lead: "So bearbeiten wir Rückgaben und Umtauschanfragen.",
    sections: [
      { title: "DEIN ANLIEGEN", text: "Du möchtest einen Artikel zurückgeben oder gegen einen anderen Artikel tauschen? Kein Problem – teile uns einfach kurz mit, um welchen Artikel es geht und was wir für dich tun dürfen. Bitte nenne dabei Bestellnummer, Artikel beziehungsweise Artikelnummer, Menge, Größe und Grund der Rückgabe." },
      { title: "GRUND DER RÜCKGABE", text: "Mögliche Gründe: Größe passt nicht, gefällt mir nicht, anders als erwartet, falscher Artikel, beschädigt / fehlerhaft oder ein sonstiger Grund." },
      { title: "RÜCKZAHLUNG ODER UMTAUSCH", text: "Du kannst eine Rückzahlung des Kaufbetrags oder einen Umtausch gegen einen anderen Artikel anfragen. Bei einem Umtausch nenne bitte den gewünschten Artikel, die Artikelnummer und Größe. Der gewünschte Ersatzartikel sollte dem ursprünglichen Warenwert entsprechen." },
      { title: "KONTAKT", text: "Bei Fragen zur Rückgabe oder zum Umtausch erreichst du uns unter: Pottlerkinder – Natalia Lewandowski, Horster Str. 118, 45897 Gelsenkirchen. E-Mail: lubenskaja@gmail.com · Telefon: +49 209 36171378 · WhatsApp: +49 176 26091435." },
    ],
  },
  "/widerrufsbelehrung": {
    eyebrow: "RECHTLICHE INFORMATIONEN", title: "WIDERRUFSBELEHRUNG", lead: "Informationen zum gesetzlichen Widerrufsrecht für Verbraucherinnen und Verbraucher.",
    sections: [
      { title: "WIDERRUFSRECHT", text: "Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Die Widerrufsfrist beträgt grundsätzlich 14 Tage. Die Frist beginnt nach Maßgabe der gesetzlichen Vorschriften. Zur Ausübung des Widerrufsrechts muss der Verbraucher den Unternehmer mittels einer eindeutigen Erklärung über seinen Entschluss informieren, den Vertrag zu widerrufen." },
      { title: "AUSSCHLUSS BZW. ERLÖSCHEN DES WIDERRUFSRECHTS", text: "Das Widerrufsrecht besteht nicht bei Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind. Hierzu gehören insbesondere individuell personalisierte Produkte, die nach den Vorgaben des Kunden hergestellt werden und nicht ohne Weiteres anderweitig verkauft werden können, beispielsweise Textilien, T-Shirts, Hoodies, Taschen, Tassen, Glasartikel, Geschenkartikel, Gravuren, Stickereien und Drucke." },
      { title: "REGULÄRE WAREN OHNE INDIVIDUELLE ANPASSUNG", text: "Wird ein Produkt aus dem regulären Sortiment ohne individuelle Änderung oder Personalisierung von Druck, Stickerei, Text, Motiv oder sonstiger Gestaltung geliefert, handelt es sich grundsätzlich nicht um eine individuell angefertigte Ware. Für solche Waren gilt das gesetzliche Widerrufsrecht, soweit keine andere gesetzliche Ausnahme vorliegt. Das bloße Auswählen eines bereits vorhandenen Designs aus dem regulären Sortiment stellt grundsätzlich keine individuelle Gestaltung nach Kundenspezifikation dar." },
      { title: "RÜCKGABE WEGEN NICHTGEFALLENS", text: "Bei regulären Waren kann der Verbraucher sein gesetzliches Widerrufsrecht nach Maßgabe der gesetzlichen Vorschriften ausüben. Bei individuell nach Kundenvorgaben angefertigten Waren ist eine Rückgabe allein wegen Nichtgefallens der individuellen Gestaltung grundsätzlich ausgeschlossen, soweit die gesetzlichen Voraussetzungen für den Ausschluss des Widerrufsrechts erfüllt sind." },
      { title: "GESETZLICHE GEWÄHRLEISTUNGSRECHTE", text: "Der Ausschluss des Widerrufsrechts bei individuell angefertigten Waren bedeutet nicht, dass gesetzliche Gewährleistungsrechte ausgeschlossen werden. Bei mangelhaften Waren stehen dem Kunden die gesetzlichen Rechte zu, insbesondere bei Herstellungsfehlern, Beschädigungen, fehlerhafter Ausführung, erheblichen Abweichungen von der vereinbarten Gestaltung oder sonstigen Sachmängeln." },
    ],
  },
  "/zahlung": {
    eyebrow: "SERVICE", title: "ZAHLUNG", lead: "Sichere Zahlung über den Shopify-Checkout.",
    sections: [{ title: "SICHERE ZAHLUNGSABWICKLUNG", text: "Die Zahlungsabwicklung erfolgt im sicheren Shopify-Checkout. Die für deine Bestellung verfügbaren Zahlungsarten werden dort vor Abschluss der Bestellung angezeigt. Je nach ausgewählter Zahlungsart verarbeitet der jeweilige Zahlungsdienstleister die zur Zahlungsabwicklung erforderlichen Daten. Wir speichern grundsätzlich keine vollständigen Kreditkartendaten." }, { title: "PREISE & BESTELLUNG", text: "Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Die Preise verstehen sich in Euro und enthalten, soweit gesetzlich vorgeschrieben, die gesetzliche Umsatzsteuer. Zusätzlich anfallende Versandkosten werden vor Abschluss des Bestellvorgangs mitgeteilt. Bei individuell angefertigten Produkten kann die Herstellung erst nach Eingang der erforderlichen Zahlung beziehungsweise nach entsprechender Zahlungsbestätigung erfolgen." }],
  },
}

function LegalPage({ path }: { path: string }) {
  const page = LEGAL_PAGES[path]
  if (!page) return null
  return (
    <PageShell inner>
      <main className="legal-document-shell">
        <div className="legal-document-wrap">
          <nav className="legal-breadcrumb" aria-label="Seitennavigation">
            <a href="/">STARTSEITE</a><span>/</span><span>RECHTLICHE INFORMATIONEN</span>
          </nav>
          <article className={`legal-document ${path === "/zahlung" ? "legal-payment-document" : ""}`}>
            <header className="legal-document-head">
              <p>{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <div>{page.lead}</div>
            </header>
            {path === "/zahlung" && <div className="legal-payment-status"><span>✓</span><p>ZAHLUNG WIRD SICHER ÜBER DEN SHOPIFY-CHECKOUT ABGEWICKELT</p></div>}
            <div className="legal-page-content">
              {page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
            </div>
            <footer className="legal-document-foot">
              <a href="/">ZURÜCK ZUM SHOP</a>
            </footer>
          </article>
        </div>
      </main>
    </PageShell>
  )
}

const companyOffers = [
  "Arbeitskleidung mit Firmenlogo – T-Shirts, Poloshirts, Sweatshirts, Hoodies, Jacken und mehr",
  "Mitarbeiterbekleidung – einheitlicher und professioneller Auftritt Ihres Teams",
  "Personalisierte Kleidung – Namen, Positionen, Logos und individuelle Beschriftungen",
  "Firmen- und Vereinsbekleidung – individuell nach Ihren Vorstellungen",
  "Werbeartikel – personalisierte Tassen, Taschen, Caps, Bierkrüge, Schiefer-Untersetzer und weitere Produkte",
  "Kunden- und Mitarbeitergeschenke – individuelle Geschenkideen für besondere Anlässe",
  "Merchandise – eigene Kollektionen mit Ihrem Logo, Slogan oder Design",
  "Kleinserien und Einzelstücke – auch für kleinere Unternehmen und individuelle Projekte",
  "Individuelle Gestaltung – wir setzen Ihre Ideen, Logos und Motive professionell auf verschiedene Produkte um",
]

function CompanyPage() {
  return (
    <TextPage
      image={PAGE_BACKDROPS.company}
      eyebrow="POTTLERKINDER FÜR B2B"
      title="INDIVIDUELLE LÖSUNGEN FÜR UNTERNEHMEN"
      lead="Wir bieten Unternehmen individuelle Lösungen rund um Arbeitskleidung, Firmenbekleidung, Textilveredelung und Werbeartikel."
    >
      <p>
        Ob kleines Unternehmen, Handwerksbetrieb, Gastronomie, Verein oder
        größeres Unternehmen – wir gestalten und veredeln Produkte passend zu
        Ihrem Corporate Design.
      </p>
      <h2>WAS WIR FÜR IHR UNTERNEHMEN ANBIETEN</h2>
      <ul>
        {companyOffers.map((offer) => (
          <li key={offer}>{offer}</li>
        ))}
      </ul>
      <h2>IDEAL FÜR</h2>
      <p>
        Handwerksbetriebe • Gastronomie • Einzelhandel • Dienstleister •
        Industrie • Vereine • Start-ups • Unternehmen jeder Größe
      </p>
      <p className="page-highlight">
        Sie haben eine Idee – wir machen daraus ein individuelles Produkt für
        Ihr Unternehmen.
      </p>
      <p className="page-signature">
        Pottlerkinder – individuell. professionell. aus dem Pott.
      </p>
    </TextPage>
  )
}

const aboutServices = [
  "DTF-Druck auf T-Shirts, Poloshirts, Hoodies, Schürzen und nahezu allen Textilien",
  "Sublimationsdruck",
  "Textil- und Maschinenstickerei",
  "Druck auf Tassen, Biergläsern, Bierkrügen und weiteren Geschenkartikeln",
  "Lasergravur auf Holz und Metall",
  "Aufkleber, Sticker und Schaufensterbeschriftungen",
  "Handgefertigte Spielzeuge",
  "Individuelle Werbeartikel und kreative Geschenkideen",
  "Und vieles mehr",
]

function AboutPage() {
  return (
    <TextPage
      image={PAGE_BACKDROPS.history}
      eyebrow="ÜBER POTTLERKINDER"
      title="DRUCK, KREATIVE PRODUKTE & ECHTE RUHRPOTT-IDEEN"
      lead="Pottlerkinder steht für kreative Ideen, hochwertige Druckprodukte und die besondere Verbindung zum Ruhrgebiet."
    >
      <h2>ÜBER UNS</h2>
      <p>
        Wir bieten individuelle Werbe- und Textilprodukte für Unternehmen,
        Vereine und Gastronomiebetriebe sowie kreative und einzigartige
        Geschenkideen für Privatkunden.
      </p>
      <p>
        Gemeinsam mit Ihnen entwickeln wir das passende Design und finden die
        optimale Lösung für Ihre Wünsche – ganz gleich, ob Sie einen
        Sportverein, ein Restaurant, ein Unternehmen oder eine andere
        Organisation vertreten.
      </p>
      <p>
        Unser Sortiment umfasst tausende Produkte – von Caps, T-Shirts und
        Hoodies über Schürzen und Sportbekleidung bis hin zu hochwertigen
        Poloshirts und vielen weiteren Artikeln.
      </p>
      <p>
        Besuchen Sie uns in unserem Büro in Gelsenkirchen-Buer. Wir beraten Sie
        persönlich und finden gemeinsam die passende Lösung für Ihr Projekt.
      </p>
      <h2>UNSERE LEISTUNGEN</h2>
      <ul>
        {aboutServices.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <p>
        Dabei ist uns besonders wichtig: Sie bekommen nicht einfach ein Produkt
        von der Stange. Wir entwickeln gemeinsam mit Ihnen eine Idee, die zu
        Ihnen, Ihrer Marke und Ihrem Unternehmen passt.
      </p>
      <h2>POTTLERKINDER – UNSERE EIGENE MARKE</h2>
      <p>
        Neben individuellen Aufträgen entwickeln und produzieren wir auch unsere
        eigene Marke Pottlerkinder.
      </p>
      <p>
        Das Ruhrgebiet befindet sich im Wandel. Ehemalige Zechenstandorte werden
        zunehmend zu Orten der Geschichte, Kultur und Begegnung. Doch die Zeit
        des Bergbaus hat ihre Spuren hinterlassen – und diese Spuren sind bis
        heute tief in der Identität und Kultur der Region verwurzelt.
      </p>
      <p>
        Auch die kommenden Generationen haben oft keinen direkten Bezug mehr zur
        Arbeit unter Tage. Trotzdem sehen sie jeden Tag die Halden, Fördertürme
        und Zechenanlagen, die das Bild des Ruhrgebiets prägen. Sie gehören zu
        unserer Landschaft und beeinflussen, was diese Region ausmacht.
      </p>
      <p>
        Früher stand der Eiffelturm als Symbol für technischen Fortschritt.
        Heute ist er längst zu einem Symbol für Paris, Romantik und Liebe
        geworden. Millionen Menschen reisen jedes Jahr dorthin, um ihn zu sehen.
      </p>
      <p>
        Auch im Ruhrgebiet haben sich ehemalige Zechen und Fördertürme zu
        besonderen Orten entwickelt. Heute werden dort Hochzeiten gefeiert,
        Erinnerungen geschaffen und sogar Eheversprechen gegeben.
      </p>
      <p className="page-highlight">
        Aus industrieller Vergangenheit wird kulturelle Identität.
      </p>
      <p>
        Genau diese Geschichte möchten wir mit Pottlerkinder bewahren und neu
        interpretieren – modern, kreativ und mit einem Augenzwinkern.
      </p>
      <h2>SCHMUCK AUS ECHTER RUHRGEBIETSKOHLE</h2>
      <p>
        Eine unserer besonderen Ideen sind einzigartige Schmuckstücke aus Kohle.
      </p>
      <p>
        Kohle und Diamant bestehen beide aus Kohlenstoff – ihre Eigenschaften
        und Entstehungsbedingungen sind jedoch grundlegend unterschiedlich.
        Gerade das macht Kohle für uns so faszinierend: In einem kleinen,
        scheinbar unscheinbaren Stück steckt die Millionen Jahre alte Geschichte
        unserer Erde und zugleich die Geschichte des Ruhrgebiets.
      </p>
      <p>
        Aus diesem besonderen Material entstehen individuelle Schmuckstücke, die
        nicht nur schön sind, sondern auch eine Geschichte erzählen.
      </p>
      <p className="page-highlight">
        Ein Stück Ruhrgebiet, das man bei sich tragen kann.
      </p>
      <h2>IHRE IDEE. UNSERE UMSETZUNG.</h2>
      <p>
        Wir sind immer offen für neue Ideen, ungewöhnliche Wünsche und kreative
        Projekte. Sie haben eine Idee, wissen aber noch nicht genau, wie sie
        umgesetzt werden kann? Sprechen Sie uns an. Gemeinsam machen wir daraus
        ein konkretes Produkt.
      </p>
    </TextPage>
  )
}

function HistoryPage() {
  return (
    <TextPage
      image={PAGE_BACKDROPS.history}
      eyebrow="GESCHICHTE"
      title="WAS AUS DEM POTT BLEIBT"
      lead="Pottlerkinder erzählt keine ausgedachten Geschichten – sondern greift das auf, was das Ruhrgebiet bis heute prägt."
    >
      <p>
        Fördertürme, Halden und ehemalige Zechen gehören zur Landschaft des
        Ruhrgebiets. Sie erinnern an Arbeit, Gemeinschaft und eine industrielle
        Vergangenheit, die in der Kultur der Region bis heute sichtbar ist.
      </p>
      <p>
        Viele Orte verändern sich: Wo früher gearbeitet wurde, entstehen heute
        Räume für Kultur, Begegnung und neue Erinnerungen. Diese Veränderung ist
        Teil unserer Haltung – Respekt für das, was war, und Raum für neue
        Ideen.
      </p>
      <h2>UNSERE INTERPRETATION</h2>
      <p>
        Mit Pottlerkinder übersetzen wir diese Verbundenheit in Produkte, Drucke
        und Motive. Modern, kreativ und mit einem Augenzwinkern – ohne die
        Herkunft aus den Augen zu verlieren.
      </p>
      <p className="page-highlight">
        Aus industrieller Vergangenheit wird kulturelle Identität.
      </p>
      <a
        href="/ueber-uns"
        className="btn-red inline-flex mt-8 px-7 py-4 text-white"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 600,
          letterSpacing: "2px",
        }}
      >
        DIE GANZE GESCHICHTE
      </a>
    </TextPage>
  )
}

function BlogPage() {
  return (
    <TextPage
      image={PAGE_BACKDROPS.blog}
      eyebrow="BLOG"
      title="NEUES AUS DEM REVIER"
      lead="Geschichten, Ideen und Einblicke aus dem Pott."
    >
      <div className="page-empty">
        <span>◆</span>
        <h2>NOCH KEINE BEITRÄGE</h2>
        <p>Hier entsteht bald Raum für Neues aus dem Revier.</p>
        <a
          href="/"
          className="btn-outline inline-flex px-6 py-3 mt-4 text-white"
          style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "2px" }}
        >
          ZUR STARTSEITE
        </a>
      </div>
    </TextPage>
  )
}

const COLLIERIES = [
  {
    name: "ZECHE TREMONIA",
    image:
      "https://images.unsplash.com/photo-1642658475391-b5bc1332888e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Anfänge der Zeche Tremonia liegen weit zurück in der Vergangenheit. Bereits in der zweiten Hälfte des 18. Jahrhunderts begann Wilhelm Friedrich von Hövel am Rande der Emscher mit Schürfarbeiten. Im Jahr 1774 wurden vier Schächte abgeteuft und eine Kohlenbank erschlossen. Von Hövel benannte sein Bergwerk „Zeche Dickmüllerbaum“. 1855 wurde die Bergbau-AG Tremonia gegründet und das Bergwerk gleichnamig umbenannt. 1931 erfolgte die Stilllegung; 1996 wurde auch die Versuchsgrube aufgegeben. Heute deuten lediglich zwei ehemalige Verwaltungsgebäude auf die Existenz der Anlage hin.",
  },
  {
    name: "ZECHE CONSOL",
    image:
      "https://images.unsplash.com/photo-1734675511024-12f6f8d4bd3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Consolidation, im Volksmund „Consol“, begann 1865 mit der Förderung von Steinkohle. Als großer Pionier des Ruhrbergbaus gilt der Essener Kaufmann Friedrich Grillo, Mitbegründer der Anlage. Lange blieben die Schächte 3 und 4 Hauptförderschächte, bevor 1922 das Doppelstrebengerüst für Schacht 9 errichtet wurde. 1997 wurde die Kohleförderung eingestellt. Das stählerne Fördergerüst über Schacht 9 sowie das Betonfördergerüst über Schacht 4 gehören heute zu den Highlights des Industriedenkmals.",
  },
  {
    name: "ZECHE AUGUSTE VICTORIA",
    image:
      "https://images.unsplash.com/photo-1784122672978-4016cf00f948?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Auguste Victoria war eine der letzten aktiven Zechen des Ruhrgebiets. Die Schächte 3/7 und 4/5 spielten geschichtlich unterschiedliche Rollen. An den Schächten 4/5 wurden neben Kohle auch Erze abgebaut; 1928 begann das Abteufen, 1936 der Abbau von Roherz, Zink und Silber. Das Koepe-Strebengerüst über Schacht 4 steht seit 1995 unter Denkmalschutz. Die klassische Kohleförderung fand vorrangig über die Schächte 3/7 statt. 2015 wurde das Bergwerk Auguste Victoria stillgelegt.",
  },
  {
    name: "ZECHE ZOLLERN",
    image:
      "https://images.unsplash.com/photo-1714039103670-679b67dd3f37?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Zollern in Dortmund wurde von Zeitgenossen als „Schloss der Arbeit“ betitelt: Die Anlage erinnert eher an eine Residenz als an einen einfachen Bergbaustandort. Nach der Stilllegung in den 60er Jahren sollte sie abgerissen werden. Die Gebäudekette rund um die Maschinenhalle mit ihrem prächtigen Jugendstilportal blieb dank großer Widerstände erhalten. Heute führt das LWL-Industriemuseum Zeche Zollern mit Exponaten und Lebensläufen der Arbeiter in die Geschichte des Bergbaus ein.",
  },
  {
    name: "ZECHE PROSPER",
    image:
      "https://images.unsplash.com/photo-1734627731011-b07c35e04e54?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Prosper, Teil des Bergwerks Prosper-Haniel, war seit Ende 2015 das einzig verbliebene aktive Steinkohlebergwerk im Ruhrgebiet. Die Schließung kurz vor Weihnachten 2018 besiegelte das Ende der Steinkohlenförderung in Deutschland. Prosper I wurde 1856 gegründet, 1875 folgte Prosper II. Der Prosper-Turm hielt technischen Weiterentwicklungen stand und ist heute das einzige Exemplar seiner Art in der Region. Ein Förderband brachte Rohkohle durch einen schrägen Tunnel aus 779 Metern Tiefe ans Tageslicht.",
  },
  {
    name: "ZECHE LOHBERG",
    image:
      "https://images.unsplash.com/photo-1740907628172-acd27c2e1de8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Lohberg gehörte lange zum Thyssen-Imperium. 1914 begann die regelmäßige Kohleförderung, 1930 erreichte die Anlage den Status einer Großschachtanlage. Das 70,5 Meter hohe Fördergerüst über Schacht II war damals das höchste Fördergerüst im Ruhrgebiet und ist bis heute weithin sichtbar. Nach der Stilllegung 2006 wurde das Gelände zum Begegnungsort für Kunst und Kultur umgewandelt: Das Kreativ.Quartier Lohberg entstand.",
  },
  {
    name: "ZECHE SCHLÄGEL & EISEN",
    image:
      "https://images.unsplash.com/photo-1687198562209-8a4e31dff71b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Anfänge der Zeche Schlägel und Eisen gehen auf 1873 zurück. Namensgebend ist die Gewerkschaft Schlägel und Eisen, die bei Erkundungsbohrungen ein erstes Kohlenflöz anbohrte. In den 1930er Jahren wurden die Schächte zur Zentralschachtanlage ausgebaut. 1975 erreichte die Zeche mit gut zwei Millionen Tonnen Kohle ihre höchste Förderleistung. Ihr Erkennungsmerkmal ist das älteste erhaltene deutsche Strebengerüst der Bauart Promnitz in Nordrhein-Westfalen – eine seltene dreibeinige Konstruktion.",
  },
  {
    name: "ZECHE FRIEDRICH HEINRICH",
    image:
      "https://images.unsplash.com/photo-1655382852570-af94883b8855?auto=format&fit=crop&w=1200&q=80",
    description:
      "In gut 100 Jahren Geschichte wurden auf der Zeche Friedrich Heinrich weit über 200 Millionen Tonnen Steinkohle gefördert. Der Rekord der Jahresfördermenge lag 1993 bei 4,17 Millionen Tonnen. Die auch als „Versuchszeche“ bekannte Friedrich Heinrich erreichte 1958 als erste im Ruhrgebiet den vollständig mechanisierten Abbau. Ende 2012 wurde mit der Stilllegung des Bergwerks West die Kohleförderung am Niederrhein beendet.",
  },
  {
    name: "ZECHE BLUMENTHAL",
    image:
      "https://images.unsplash.com/photo-1734627731059-d0315c779857?auto=format&fit=crop&w=1200&q=80",
    description:
      "Als Probebohrungen 1872 auf Kohle stießen, begann die Geschichte des Bergwerks General Blumenthal. 1873 startete der Bau und Schacht I wurde abgeteuft. In den folgenden Jahrzehnten kam es wiederholt zu schweren Schlagwetterereignissen. Nach der Errichtung von Schacht 6 firmierte die Anlage als General Blumenthal 1/2/6. 2001 wurden sämtliche Blumenthaler Übertage-Anlagen aufgegeben. Außer den Schächten Blumenthal 7 und Haard erinnert heute nur wenig an diese Bergbauvergangenheit.",
  },
  {
    name: "ZECHE FÜRST LEOPOLD",
    image:
      "https://images.unsplash.com/photo-1780004033152-3612e3017352?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Zeche Fürst Leopold spiegelt den Strukturwandel im Ruhrgebiet. Auf dem Gelände finden sich historische Industrieanlagen sowie Kunst, Kultur und Gastronomie. Die bauliche Struktur blieb weitgehend erhalten. 1913 wurde hier erstmals Kohle gefördert; bis zur Schließung 2001 durchlief das Bergwerk viele Entwicklungsstufen. Zu den Highlights zählen die bis 2008 mit Dampf betriebenen Fördermaschinen.",
  },
  {
    name: "ZECHE MÖLLER",
    image:
      "https://images.unsplash.com/photo-1736162087099-47170d710a3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Die Möllerschächte haben eine bewegte Geschichte. Bereits zwischen 1871 und 1873 wurden erste Bohrungen durchgeführt, 1876 entstanden die Grubenfelder „Vereinigte Gladbeck“. August Thyssen begann 1881, Anteile zu kaufen; 1896 starteten die ersten Abteufarbeiten von Schacht Thyssen 1. Nach dem Erwerb durch den preußischen Staat entwickelte sich das Bergwerk wirtschaftlich erfolgreich. Trotz starker Proteste wurden die Möllerschächte am 1. April 1967 stillgelegt.",
  },
]
function CollieriesPage() {
  const [selected, setSelected] = useState<typeof COLLIERIES[number] | null>(
    null,
  )
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero
          image={PAGE_BACKDROPS.collieries}
          eyebrow="ZECHEN DES RUHRGEBIETS"
          title="ORTE, DIE DAS REVIER PRÄGEN"
          lead=""
        />
        <section
          className="max-w-[1440px] mx-auto py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          {COLLIERIES.map((zeche) => (
            <button
              key={zeche.name}
              onClick={() => setSelected(zeche)}
              className="zeche-card relative text-left overflow-hidden min-h-[230px] bg-[linear-gradient(135deg,#1d1d1d,#090909)]"
            >
              <span
                className="absolute top-5 left-6 text-[#b92a2a]"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 15,
                  letterSpacing: "3px",
                }}
              >
                ◆ ZECHENARCHIV
              </span>
              <span
                className="relative z-10 block h-full p-6 flex flex-col justify-end text-white"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: "2px",
                }}
              >
                {zeche.name}
                <small
                  className="mt-2 text-[#e34b4b]"
                  style={{ fontSize: 12, letterSpacing: "2px" }}
                >
                  ANSICHT ÖFFNEN →
                </small>
              </span>
            </button>
          ))}
        </section>
      </main>
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 p-4 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="zeche-modal relative max-w-2xl w-full overflow-hidden bg-[#111] border border-[#722]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-8">
              <button
                aria-label="Schließen"
                className="absolute right-4 top-3 text-white text-2xl"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
              <p
                className="text-[#d73737]"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "2px",
                }}
              >
                ZECHENARCHIV
              </p>
              <h2
                className="mt-3 text-white"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: 38,
                  letterSpacing: "2px",
                }}
              >
                {selected.name}
              </h2>
              <p
                className="mt-5 text-[#c7c7c7]"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}

const BASE_CATALOG_PRODUCTS = [
  {
    slug: "glueck-auf-shirt",
    image: imgProduct1,
    name: "GLÜCK AUF T-SHIRT",
    category: "T-SHIRTS",
    gender: "UNISEX",
    colors: ["#121212", "#e6e6e6", "#cf3131"],
    price: "24,90 €",
    short: "Bio-Baumwolle · DTF-Print · Made im Pott",
    description:
      "Ein klares Statement für alle, die ihre Heimat tragen wollen. Weiche Bio-Baumwolle trifft auf einen langlebigen DTF-Print.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    slug: "foerderturm-hoodie",
    image: imgProduct2,
    name: "FÖRDERTURM HOODIE",
    category: "HOODIES",
    gender: "MÄNNER",
    colors: ["#111111", "#4a4a4a"],
    price: "40,90 €",
    short: "Heavy Cotton · Kapuze · Revier-Print",
    description:
      "Schwerer Hoodie für kühle Schichten und lange Tage. Der Förderturm-Print bringt die Industriegeschichte des Potts auf die Brust.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    slug: "kumpel-shirt",
    image: imgProduct3,
    name: "KUMPEL T-SHIRT",
    category: "T-SHIRTS",
    gender: "UNISEX",
    colors: ["#181818", "#757575"],
    price: "24,90 €",
    short: "Regular Fit · Bio-Baumwolle · Kumpel-Kollektion",
    description:
      "Ein unkompliziertes Shirt mit Haltung. Angenehm im Alltag, klar im Auftritt und bereit für die nächste Schicht.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "bergmann-shirt",
    image: imgProduct4,
    name: "BERGMANN T-SHIRT",
    category: "T-SHIRTS",
    gender: "FRAUEN",
    colors: ["#111111", "#f3f3f3"],
    price: "24,90 €",
    short: "Soft Touch · Damen Fit · Revier-Klassiker",
    description:
      "Der Revier-Klassiker in einer weichen, unkomplizierten Passform. Für die Geschichte des Ruhrgebiets und den Alltag von heute.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "schicht-im-schacht-polo",
    image: imgProduct5,
    name: "SCHICHT IM SCHACHT POLO",
    category: "POLOS",
    gender: "MÄNNER",
    colors: ["#161616", "#30343a", "#7c8794"],
    price: "34,90 €",
    short: "Piqué · Polokragen · Dezenter Brustprint",
    description:
      "Ein Polo für einen aufgeräumten Look mit Ruhrpott-Charakter. Robust, bequem und passend für Team, Alltag und Feierabend.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    slug: "glueck-auf-tasse",
    image: img55,
    name: "GLÜCK AUF TASSE",
    category: "GLÄSER & TASSEN",
    sub: "TASSEN",
    gender: "UNISEX",
    colors: ["#f3f3f3"],
    price: "14,90 €",
    short: "Keramik · 330 ml · Spülmaschinenfest",
    description:
      "Eine Tasse mit Revierhaltung für Kaffee, Tee und die Pause nach der Schicht.",
    sizes: ["ALLE"],
  },
  {
    slug: "ruhrkohle-schmuck",
    image: imgZubehorPhoto,
    name: "RUHRKOHLE SCHMUCK",
    category: "ACCESSOIRES",
    sub: "SCHMUCK",
    gender: "UNISEX",
    colors: ["#161616"],
    price: "29,90 €",
    short: "Echte Ruhrkohle · Handgefertigt",
    description:
      "Ein kleines Stück Ruhrgebiet für jeden Tag – individuell und mit Geschichte.",
    sizes: ["ALLE"],
  },
  {
    slug: "dtf-transfer-revier",
    image: img11,
    name: "DTF TRANSFER REVIER",
    category: "DTF-TRANSFERS",
    sub: "FÜR KLEIDUNG & TEXTILIEN",
    gender: "UNISEX",
    colors: ["#e7473d", "#f4f4f4"],
    price: "9,90 €",
    short: "Für Textilien · Langlebig · Einfach aufzubringen",
    description: "Dein Motiv für Textilien: bereit für die eigene Veredelung.",
    sizes: ["ALLE"],
  },
]

const TEST_CATEGORIES = [
  "HOODIES",
  "SWEATSHIRTS",
  "T-SHIRTS",
  "POLOS",
  "ACCESSOIRES",
  "GLÄSER & TASSEN",
  "DTF-TRANSFERS",
] as const
const TEST_SUBCATEGORIES: Record<string, string[]> = {
  ACCESSOIRES: ["KOPFBEDECKUNG", "SHOPPER", "SCHMUCK", "PINS"],
  "GLÄSER & TASSEN": ["TASSEN", "BIERGLÄSER", "UNTERSETZER"],
  "DTF-TRANSFERS": ["FÜR KLEIDUNG & TEXTILIEN"],
}
const TEST_PREFIXES = [
  "KUMPEL",
  "SCHICHT",
  "REVlER",
  "GLÜCK AUF",
  "KOHLE",
  "ZECHEN",
  "RUHRPOTT",
  "FÖRDERTURM",
]
const TEST_GENDERS = ["MÄNNER", "FRAUEN", "KINDER", "UNISEX"]

const CATALOG_PRODUCTS = Array.from({ length: 100 }, (_, index) => {
  const source = BASE_CATALOG_PRODUCTS[index % BASE_CATALOG_PRODUCTS.length]
  const category = TEST_CATEGORIES[index % TEST_CATEGORIES.length]
  const subcategories = TEST_SUBCATEGORIES[category]
  const textile = !subcategories
  const number = String(index + 1).padStart(3, "0")
  return {
    ...source,
    slug: `test-${number}-${source.slug}`,
    name: `${TEST_PREFIXES[index % TEST_PREFIXES.length]} ${
      category === "T-SHIRTS" ? "T-SHIRT" : category.slice(0, -1)
    } ${number}`,
    category,
    sub: subcategories?.[index % subcategories.length],
    gender: textile ? TEST_GENDERS[index % TEST_GENDERS.length] : "UNISEX",
    colors: ["#161616", "#cf3131", "#f3f3f3", "#4a4a4a"].slice(
      0,
      (index % 3) + 1,
    ),
    price: `${14 + ((index * 3) % 46)},90 €`,
    sizes: textile
      ? index % 4 === 2
        ? ["04A (104)", "06A (116)", "08A (128)", "10A (140)", "12A (152)"]
        : ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
      : ["ALLE"],
  }
})

const SHOPIFY_CATEGORY_MAP: Record<string, string> = {
  HOODIES: "HOODIES",
  SWEATSHIRTS: "SWEATSHIRTS",
  TSHIRTS: "T-SHIRTS",
  T_SHIRTS: "T-SHIRTS",
  POLOS: "POLOS",
  ACCESSOIRES: "ACCESSOIRES",
  ACCESSORIES: "ACCESSOIRES",
  GLAESER_TASSEN: "GLÄSER & TASSEN",
  DTF_TRANSFERS: "DTF-TRANSFERS",
}
const SHOPIFY_GENDER_MAP: Record<string, string> = {
  MAENNER: "MÄNNER",
  MANNER: "MÄNNER",
  FRAUEN: "FRAUEN",
  KINDER: "KINDER",
  UNISEX: "UNISEX",
}
const SHOPIFY_SUBCATEGORY_MAP: Record<string, string> = {
  KOPFBEDECKUNG: "KOPFBEDECKUNG",
  SHOPPER: "SHOPPER",
  SCHMUCK: "SCHMUCK",
  PINS: "PINS",
  TASSEN: "TASSEN",
  BIERGLAESER: "BIERGLÄSER",
  UNTERSETZER: "UNTERSETZER",
  FUER_KLEIDUNG_TEXTILIEN: "FÜR KLEIDUNG & TEXTILIEN",
}
const SHOPIFY_COLORS: Record<string, string> = {
  schwarz: "#161616",
  black: "#161616",
  weiß: "#f4f4f4",
  weiss: "#f4f4f4",
  white: "#f4f4f4",
  rot: "#cf3131",
  red: "#cf3131",
  grau: "#777",
  grey: "#777",
  gray: "#777",
  blau: "#3189d6",
  blue: "#3189d6",
  grün: "#36b95a",
  green: "#36b95a",
}

function shopifyCatalogProduct(product: any) {
  const tags = product.tags || []
  const tag = (prefix: string) =>
    tags
      .find((item: string) => item.toLowerCase().startsWith(prefix))
      ?.slice(prefix.length)
  const variants = (product.variants?.nodes || []).filter(
    (variant: any) => variant.availableForSale,
  )
  const option = (name: string) =>
    variants
      .flatMap((variant: any) => variant.selectedOptions || [])
      .filter((item: any) => item.name.toLowerCase() === name)
      .map((item: any) => item.value)
  const normalizeTag = (value: string) =>
    value
      .toUpperCase()
      .replace(/Ä/g, "AE")
      .replace(/Ö/g, "OE")
      .replace(/Ü/g, "UE")
      .replace(/ß/g, "SS")
      .replace(/[\s&-]+/g, "_")
  const categoryValue = normalizeTag(
    tag("category_") || product.productType || "T-SHIRTS",
  )
  const category = SHOPIFY_CATEGORY_MAP[categoryValue] || "T-SHIRTS"
  const genderValue = normalizeTag(tag("gender_") || "UNISEX")
  const gender = SHOPIFY_GENDER_MAP[genderValue] || "UNISEX"
  const colorOptions = Array.from(
    new Set(option("farbe").concat(option("color"))),
  ).map((item: string) => ({
    label: item,
    value: SHOPIFY_COLORS[item.toLowerCase()] || "#777",
  }))
  const selectedColors = colorOptions.map((item) => item.value)
  const selectedSizes = Array.from(
    new Set(option("größe").concat(option("groesse"), option("size"))),
  )
  const firstVariant = variants[0]
  const images = (product.media?.nodes || [])
    .map((media: any) => media.preview?.image)
    .filter(Boolean)
    .slice(0, 5)
  const formatPrice = (value: string | null | undefined) =>
    value
      ? new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(Number(value))
      : "–"
  if (!variants.length) return null
  return {
    id: product.id,
    slug: product.handle,
    image: product.featuredMedia?.preview?.image?.url || imgProduct1,
    images: images.length
      ? images
      : [
          {
            url: product.featuredMedia?.preview?.image?.url || imgProduct1,
            altText: product.title,
          },
        ],
    name: product.title,
    category,
    sub: tag("sub_")
      ? SHOPIFY_SUBCATEGORY_MAP[normalizeTag(tag("sub_")!)]
      : undefined,
    gender,
    colors: selectedColors.length ? selectedColors : ["#161616"],
    colorOptions,
    price: formatPrice(firstVariant?.price),
    compareAtPrice: firstVariant?.compareAtPrice
      ? formatPrice(firstVariant.compareAtPrice)
      : null,
    short: product.productType || "Pottlerkinder · Made im Pott",
    description: product.description || "",
    sizes: selectedSizes.length ? selectedSizes : ["ALLE"],
    variants,
  }
}

function useShopifyCatalog(handle?: string) {
  const [products, setProducts] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let active = true
    const cacheKey = handle || "all"
    const loadCatalog = () => {
      const cachedProducts = catalogCache.get(cacheKey)
      if (cachedProducts) return Promise.resolve(cachedProducts)

      const activeRequest = catalogRequests.get(cacheKey)
      if (activeRequest) return activeRequest

      const request = fetch(
        `/api/products${handle ? `?handle=${encodeURIComponent(handle)}` : ""}`,
      )
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(new Error("Shopify products unavailable")),
        )
        .then((data) => {
          const mappedProducts = (data.products || [])
            .map(shopifyCatalogProduct)
            .filter(Boolean)
          catalogCache.set(cacheKey, mappedProducts)
          return mappedProducts
        })
        .finally(() => catalogRequests.delete(cacheKey))
      catalogRequests.set(cacheKey, request)
      return request
    }

    loadCatalog()
      .then((nextProducts) => active && setProducts(nextProducts))
      .catch((requestError) => active && setError(requestError.message))
    return () => {
      active = false
    }
  }, [handle])
  return { products, error }
}

function useShopifyCart() {
  const [cart, setCart] = useState<any | null>(sharedCart ?? null)
  const [loading, setLoading] = useState(sharedCart === undefined)
  const refreshCart = () => {
    const cartId = window.localStorage.getItem("pottlerkinder-cart-id")
    if (!cartId) {
      publishCart(null)
      return Promise.resolve(null)
    }
    if (!sharedCartRequest) {
      sharedCartRequest = shopCart
      .get(cartId)
      .then((response) => {
        const nextCart = (response as { cart: any }).cart
        if (!nextCart) window.localStorage.removeItem("pottlerkinder-cart-id")
        publishCart(nextCart || null)
        return nextCart || null
      })
      .catch(() => {
        window.localStorage.removeItem("pottlerkinder-cart-id")
        publishCart(null)
        return null
      })
      .finally(() => {
        sharedCartRequest = null
      })
    }
    return sharedCartRequest
  }
  useEffect(() => {
    const receiveSharedCart = (nextCart: any | null) => {
      setCart(nextCart)
      setLoading(false)
    }
    cartSubscribers.add(receiveSharedCart)
    refreshCart().finally(() => setLoading(false))
    const receiveCart = (event: Event) => {
      const nextCart = (event as CustomEvent<{ cart?: any | null }>).detail?.cart
      if (nextCart !== undefined) {
        receiveSharedCart(nextCart)
        return
      }
      refreshCart()
    }
    window.addEventListener("pottlerkinder-cart-updated", receiveCart)
    window.addEventListener("pottler-account-logout", refreshCart)
    return () => {
      cartSubscribers.delete(receiveSharedCart)
      window.removeEventListener("pottlerkinder-cart-updated", receiveCart)
      window.removeEventListener("pottler-account-logout", refreshCart)
    }
  }, [])
  return { cart, loading, refreshCart }
}

const CATALOG_CATEGORIES = [
  "ALLE",
  "HOODIES",
  "SWEATSHIRTS",
  "T-SHIRTS",
  "POLOS",
  "ACCESSOIRES",
  "GLÄSER & TASSEN",
  "DTF-TRANSFERS",
]
const COLOR_FILTERS = [
  { label: "Mehrfarbig", value: "multi" },
  { label: "Rot", value: "#e7473d" },
  { label: "Orange", value: "#ef801b" },
  { label: "Gelb", value: "#e6c716" },
  { label: "Grün", value: "#36b95a" },
  { label: "Blau", value: "#3189d6" },
  { label: "Violett", value: "#8d55c7" },
  { label: "Pink", value: "#ec6b9f" },
  { label: "Schwarz", value: "#161616" },
  { label: "Weiß", value: "#f4f4f4" },
  { label: "Grau", value: "#92a3a3" },
]

function FilterLabel({
  type,
  children,
}: {
  type: "gender" | "category" | "color" | "size"
  children: React.ReactNode
}) {
  const paths = {
    gender: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6.5 20c.5-4 2.4-6 5.5-6s5 2 5.5 6" />
      </>
    ),
    category: (
      <>
        <path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z" />
        <path d="M4 12.5 12 17l8-4.5M4 17l8 4 8-4" />
      </>
    ),
    color: (
      <>
        <path d="M12 3a7 7 0 0 0 0 14h1.2a1.8 1.8 0 0 1 1.7 2.4A1.2 1.2 0 0 0 16 21a7 7 0 0 0-4-18Z" />
        <circle cx="7.8" cy="10" r=".8" fill="currentColor" />
        <circle cx="11.5" cy="6.8" r=".8" fill="currentColor" />
        <circle cx="16" cy="10" r=".8" fill="currentColor" />
      </>
    ),
    size: (
      <>
        <path d="m5 5 14 14M7 3l14 14M3 7l14 14" />
        <path d="M4 20 20 4" />
      </>
    ),
  }
  return (
    <p className="catalog-filter-label">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths[type]}
      </svg>
      {children}
    </p>
  )
}

function FilterOptionIcon({ label }: { label: string }) {
  if (label === "HOODIES")
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="catalog-filter-option-icon catalog-garment-icon"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8 3.3c-2 .2-3.5 1.5-4.3 3.3L2 11.8l3.1 2.1 1.7-1.4V21h4.1v-5h2.2v5h4.1v-8.5l1.7 1.4 3.1-2.1-1.7-5.2c-.8-1.8-2.3-3.1-4.3-3.3L15.3 7H8.7L8 3.3Zm2.4 2c.5-.5 2.7-.5 3.2 0L14.1 6H9.9l.5-.7Z"
        />
        <path
          d="M9.2 9.6c.7.6 1.6.9 2.8.9s2.1-.3 2.8-.9"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    )
  if (label === "SWEATSHIRTS")
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="catalog-filter-option-icon catalog-garment-icon"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m8 4.2-4 2.4-2 5.2 3.2 2.1 1.7-1.4V21h10.2v-8.5l1.7 1.4 3.2-2.1-2-5.2-4-2.4-1 2.2H9l-1-2.2Zm2 1.5c.5.5 1.2.8 2 .8s1.5-.3 2-.8l.5 1.1c-.6.6-1.4.9-2.5.9s-1.9-.3-2.5-.9l.5-1.1Z"
        />
        <path
          d="M7 18.7h10M4.1 10.3l1.5 1M19.9 10.3l-1.5 1"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    )
  const icons = {
    ALLE: FaTags,
    MÄNNER: FaMale,
    FRAUEN: FaFemale,
    KINDER: FaChild,
    UNISEX: FaUsers,
    "T-SHIRTS": FaTshirt,
    POLOS: GiPoloShirt,
    ACCESSOIRES: FaShoppingBag,
    "GLÄSER & TASSEN": FaMugHot,
    "DTF-TRANSFERS": FaRegStickyNote,
    KOPFBEDECKUNG: FaHatCowboy,
    SHOPPER: FaShoppingBag,
    SCHMUCK: FaGem,
    PINS: FaThumbtack,
    TASSEN: FaMugHot,
    BIERGLÄSER: FaBeer,
    UNTERSETZER: FaRegSquare,
    "FÜR KLEIDUNG & TEXTILIEN": FaRegStickyNote,
  }
  const Icon = icons[(label as keyof typeof icons)] || FaTags
  return <Icon aria-hidden="true" className="catalog-filter-option-icon" />
}

function CatalogAddToCartButton({ product, cart }: { product: any; cart: any | null }) {
  // Catalog items are sourced exclusively from Shopify.
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const variant = product.variants?.[0]
  const inCart = cartHasVariant(cart, variant?.id)

  const addToCart = async () => {
    if (!variant?.id) {
      setStatus("error")
      return
    }

    setStatus("loading")
    try {
      const cartId = window.localStorage.getItem("pottlerkinder-cart-id")
      const response = cartId
        ? await shopCart.add(cartId, [{ merchandiseId: variant.id, quantity: 1 }])
        : await shopCart.create([{ merchandiseId: variant.id, quantity: 1 }])
      const cart = (response as { cart: { id: string } }).cart
      window.localStorage.setItem("pottlerkinder-cart-id", cart.id)
      publishCart(cart)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const label =
    status === "loading"
      ? "WIRD HINZUGEFÜGT"
      : inCart
        ? "HINZUGEFÜGT"
        : status === "error"
          ? "ERNEUT VERSUCHEN"
          : "IN DEN WARENKORB"

  return (
    <button
      type="button"
      className={`catalog-add-to-cart ${inCart ? "is-success" : ""} ${status === "error" ? "is-error" : ""}`}
      onClick={addToCart}
      disabled={status === "loading"}
      aria-label={`${product.name} – ${label}`}
      title={label}
    >
      <FaShoppingBag aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}

function CatalogPage() {
  const { products: shopifyProducts, error: shopifyError } = useShopifyCatalog()
  const { cart } = useShopifyCart()
  const catalogProducts = shopifyProducts ?? []
  const params = new URLSearchParams(window.location.search)
  const [category, setCategory] = useState(
    () => params.get("category") || "ALLE",
  )
  const [gender, setGender] = useState(() => params.get("gender") || "ALLE")
  const [size, setSize] = useState("ALLE")
  const [color, setColor] = useState<string | null>(null)
  const [sort, setSort] = useState("BELIEBTHEIT")
  const [sub, setSub] = useState(() => params.get("sub") || "ALLE")
  const [page, setPage] = useState(1)
  const catalogResultsRef = useRef<HTMLElement>(null)
  const nonTextileCategories = [
    "ACCESSOIRES",
    "GLÄSER & TASSEN",
    "DTF-TRANSFERS",
  ]
  const nonTextileCategory = nonTextileCategories.includes(category)
  const subcategories =
    category === "ACCESSOIRES"
      ? ["KOPFBEDECKUNG", "SHOPPER", "SCHMUCK", "PINS"]
      : category === "GLÄSER & TASSEN"
        ? ["TASSEN", "BIERGLÄSER", "UNTERSETZER"]
        : category === "DTF-TRANSFERS"
          ? ["FÜR KLEIDUNG & TEXTILIEN"]
          : []
  const products = catalogProducts
    .filter(
      (product) =>
        (category === "ALLE" || product.category === category) &&
        (sub === "ALLE" || product.sub === sub) &&
        (category !== "ALLE" ||
          gender === "ALLE" ||
          !nonTextileCategories.includes(product.category)) &&
        (nonTextileCategory ||
          gender === "ALLE" ||
          product.gender === gender ||
          product.gender === "UNISEX") &&
        (nonTextileCategory ||
          size === "ALLE" ||
          product.sizes.includes(size)) &&
        (nonTextileCategory ||
          !color ||
          (color === "multi" && product.colors.length > 1) ||
          product.colors.includes(color)),
    )
    .sort((a, b) =>
      sort === "NIEDRIGSTER PREIS"
        ? Number(a.price.replace(",", ".")) - Number(b.price.replace(",", "."))
        : sort === "HÖCHSTER PREIS"
          ? Number(b.price.replace(",", ".")) -
            Number(a.price.replace(",", "."))
          : 0,
    )
  const productsPerPage = 50
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage))
  const visibleProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage,
  )

  useEffect(() => {
    setPage(1)
  }, [category, gender, size, color, sort, sub])

  const changePage = (nextPage: number) => {
    setPage(nextPage)
    window.setTimeout(
      () =>
        catalogResultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    )
  }
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero
          compact
          image={imgHeaderCoal}
          eyebrow="POTTLERKINDER SHOP"
          title="KATALOG"
          lead="Streetwear, kreative Produkte und Drucke direkt aus dem Pott."
        />
        <div
          className="catalog-layout max-w-[1440px] mx-auto py-8 sm:py-12"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <aside className="catalog-filters">
            <div className="catalog-filter-head">
              <span>FILTER</span>
              <button
                onClick={() => {
                  setCategory("ALLE")
                  setGender("ALLE")
                  setSize("ALLE")
                  setColor(null)
                  setSub("ALLE")
                  setPage(1)
                }}
              >
                ZURÜCKSETZEN
              </button>
            </div>
            <div className="catalog-filter">
              <FilterLabel type="gender">GESCHLECHT</FilterLabel>
              {["ALLE", "MÄNNER", "FRAUEN", "KINDER", "UNISEX"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setGender(item)
                    if (nonTextileCategory) {
                      setCategory("ALLE")
                      setSub("ALLE")
                    }
                    if (item === "KINDER") setSize("ALLE")
                  }}
                  className={gender === item ? "is-active" : ""}
                >
                  <FilterOptionIcon label={item} />
                  {item}
                </button>
              ))}
            </div>
            <div className="catalog-filter">
              <FilterLabel type="category">KATEGORIE</FilterLabel>
              {CATALOG_CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item)
                    setSub("ALLE")
                    if (
                      [
                        "ACCESSOIRES",
                        "GLÄSER & TASSEN",
                        "DTF-TRANSFERS",
                      ].includes(item)
                    )
                      setGender("ALLE")
                  }}
                  className={`${category === item ? "is-active" : ""} ${
                    [
                      "ACCESSOIRES",
                      "GLÄSER & TASSEN",
                      "DTF-TRANSFERS",
                    ].includes(item)
                      ? "catalog-nontextile"
                      : ""
                  } ${item === "ACCESSOIRES" ? "catalog-section-break" : ""}`}
                >
                  <FilterOptionIcon label={item} />
                  {item}
                </button>
              ))}
              {subcategories.length > 0 && (
                <div className="catalog-subcategory-filter">
                  <span>UNTERKATEGORIEN</span>
                  <button
                    onClick={() => setSub("ALLE")}
                    className={sub === "ALLE" ? "is-active" : ""}
                  >
                    <FilterOptionIcon label="ALLE" />
                    ALLE
                  </button>
                  {subcategories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSub(item)}
                      className={sub === item ? "is-active" : ""}
                    >
                      <FilterOptionIcon label={item} />
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              className={`catalog-filter ${
                nonTextileCategory ? "is-disabled" : ""
              }`}
            >
              <FilterLabel type="color">FARBE</FilterLabel>
              <div className="color-filter-grid">
                {COLOR_FILTERS.map((item) => (
                  <button
                    key={item.label}
                    aria-label={item.label}
                    title={item.label}
                    disabled={nonTextileCategory}
                    onClick={() =>
                      setColor(color === item.value ? null : item.value)
                    }
                    className={`${color === item.value ? "is-active" : ""} ${
                      item.value === "multi" ? "is-multicolor" : ""
                    }`}
                    style={
                      item.value === "multi"
                        ? undefined
                        : { background: item.value }
                    }
                  />
                ))}
              </div>
            </div>
            <div
              className={`catalog-filter ${
                nonTextileCategory ? "is-disabled" : ""
              }`}
            >
              <FilterLabel type="size">GRÖSSE</FilterLabel>
              <span
                className={`size-filter-label ${
                  gender === "KINDER" ? "is-disabled" : ""
                }`}
              >
                ERWACHSENE
              </span>
              <div
                className={`size-filter-grid ${
                  gender === "KINDER" ? "is-disabled" : ""
                }`}
              >
                {["ALLE", "XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
                  (item) => (
                    <button
                      key={item}
                      disabled={nonTextileCategory || gender === "KINDER"}
                      onClick={() => setSize(item)}
                      className={size === item ? "is-active" : ""}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
              <span
                className={`size-filter-label size-filter-kids ${
                  gender === "KINDER" ? "is-priority" : ""
                }`}
              >
                KINDER
              </span>
              <div
                className={`size-filter-grid ${
                  gender === "KINDER" ? "is-priority" : ""
                }`}
              >
                {[
                  "04A (104)",
                  "06A (116)",
                  "08A (128)",
                  "10A (140)",
                  "12A (152)",
                ].map((item) => (
                  <button
                    key={item}
                    disabled={nonTextileCategory}
                    onClick={() => setSize(item)}
                    className={size === item ? "is-active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <section className="catalog-results" ref={catalogResultsRef}>
            <div className="catalog-result-head">
              <p>
                <span>{products.length}</span> PRODUKTE
              </p>
              <div className="catalog-sort">
                <label htmlFor="catalog-sort">SORTIERUNG</label>
                <select
                  id="catalog-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option>BELIEBTHEIT</option>
                  <option>NIEDRIGSTER PREIS</option>
                  <option>HÖCHSTER PREIS</option>
                  <option>ARTIKELBEZEICHNUNG</option>
                </select>
              </div>
            </div>
            <div className="catalog-product-grid">
              {visibleProducts.map((product) => (
                <article key={product.slug} className="catalog-product-card">
                  <a
                    href={`/katalog/${product.slug}`}
                    className="catalog-product-image"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                  </a>
                  <div className="catalog-product-copy">
                    <h2>{product.name}</h2>
                    <p className="catalog-product-short">{product.short}</p>
                    <div className="catalog-price-block">
                      <div className="catalog-price-copy">
                        <strong>{product.price}</strong>
                        <PriceLegalNote />
                      </div>
                      <CatalogAddToCartButton product={product} cart={cart} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {shopifyProducts === null && !shopifyError && (
              <div className="catalog-no-results">
                SHOPIFY KATALOG WIRD GELADEN.
              </div>
            )}
            {shopifyProducts !== null && products.length === 0 && (
              <div className="catalog-no-results">
                {shopifyError
                  ? "SHOPIFY KATALOG IST MOMENTAN NICHT VERFÜGBAR."
                  : "KEINE PRODUKTE FÜR DIESE AUSWAHL."}
              </div>
            )}
            {totalPages > 1 && (
              <nav className="catalog-pagination" aria-label="Katalogseiten">
                <button
                  type="button"
                  onClick={() => changePage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  ← ZURÜCK
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => changePage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  NÄCHSTE 50 →
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
    </PageShell>
  )
}

function SalePage() {
  const { products: shopifyProducts, error: shopifyError } = useShopifyCatalog()
  const { cart } = useShopifyCart()
  const [page, setPage] = useState(1)
  const resultsRef = useRef<HTMLElement>(null)
  const perPage = 20
  const saleProducts = (shopifyProducts ?? []).filter(
    (product) => product.compareAtPrice,
  )
  const totalPages = Math.max(1, Math.ceil(saleProducts.length / perPage))
  const products = saleProducts.slice((page - 1) * perPage, page * perPage)
  const changePage = (nextPage: number) => {
    setPage(nextPage)
    window.setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      0,
    )
  }
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero
          compact
          image={imgHeaderCoal}
          eyebrow="NUR SOLANGE DER VORRAT REICHT"
          title="SALE"
          lead="Ausgewählte Stücke zu Sonderpreisen."
        />
        <section
          ref={resultsRef}
          className="max-w-[1440px] mx-auto py-10 sm:py-14"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <div className="catalog-result-head">
            <p>
              <span>{saleProducts.length}</span> ANGEBOTE
            </p>
            <span>REDUZIERTE ARTIKEL</span>
          </div>
          <div className="sale-product-grid catalog-product-grid">
            {products.map((product) => (
              <article key={product.slug} className="catalog-product-card">
                <a
                  href={`/katalog/${product.slug}`}
                  className="catalog-product-image relative"
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="sale-badge">SALE</span>
                </a>
                <div className="catalog-product-copy">
                  <h2>{product.name}</h2>
                  <p className="catalog-product-short">{product.short}</p>
                  <div className="catalog-price-block">
                    <div className="catalog-price-copy">
                      <strong>
                        <s>{product.price}</s> {product.price}
                      </strong>
                      <PriceLegalNote />
                    </div>
                    <CatalogAddToCartButton product={product} cart={cart} />
                  </div>
                </div>
              </article>
            ))}
          </div>
          {shopifyProducts === null && !shopifyError && (
            <div className="catalog-no-results">SHOPIFY SALE WIRD GELADEN.</div>
          )}
          {shopifyProducts !== null && products.length === 0 && (
            <div className="catalog-no-results">
              {shopifyError
                ? "SHOPIFY SALE IST MOMENTAN NICHT VERFÜGBAR."
                : "AKTUELL SIND KEINE SALE-ARTIKEL VERFÜGBAR."}
            </div>
          )}
          {totalPages > 1 && (
            <nav className="catalog-pagination" aria-label="Sale Seiten">
              <button
                type="button"
                onClick={() => changePage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                ← ZURÜCK
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => changePage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                NÄCHSTE 20 →
              </button>
            </nav>
          )}
        </section>
      </main>
    </PageShell>
  )
}

function ShopifyProductPage({ handle }: { handle: string }) {
  const { products, error } = useShopifyCatalog(handle)
  if (products?.[0]) return <ProductPage product={products[0]} />
  return (
    <PageShell inner>
      <main className="flex-1 flex items-center justify-center min-h-[55vh] px-6">
        <p className="catalog-no-results">
          {error || products
            ? "DIESER ARTIKEL IST NICHT VERFÜGBAR."
            : "ARTIKEL WIRD GELADEN."}
        </p>
      </main>
    </PageShell>
  )
}

function ProductPage({ product }: { product: any }) {
  const [size, setSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const productImages = product.images || [
    { url: product.image, altText: product.name },
  ]
  const { cart } = useShopifyCart()
  const [cartStatus, setCartStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle")
  const variant = selectedProductVariant(product, size, selectedColor)
  const inCart = cartHasVariant(cart, variant?.id)
  const addToCart = async () => {
    if (!variant?.id) {
      setCartStatus("error")
      return
    }
    setCartStatus("loading")
    try {
      const cartId = window.localStorage.getItem("pottlerkinder-cart-id")
      const response = cartId
        ? await shopCart.add(cartId, [
            { merchandiseId: variant.id, quantity: 1 },
          ])
        : await shopCart.create([{ merchandiseId: variant.id, quantity: 1 }])
      const cart = (response as { cart: { id: string } }).cart
      window.localStorage.setItem("pottlerkinder-cart-id", cart.id)
      publishCart(cart)
      setCartStatus("success")
    } catch {
      setCartStatus("error")
    }
  }
  return (
    <PageShell inner>
      <main className="flex-1">
        <div
          className="product-detail max-w-[1440px] mx-auto py-10 sm:py-16"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          <a href="/katalog" className="product-back">
            ← ZURÜCK ZUM KATALOG
          </a>
          <div className="product-detail-grid">
            <div className="product-detail-media">
              {productImages.length > 1 && (
                <div className="product-gallery" aria-label="Produktbilder">
                  {productImages.map((image: any, index: number) => (
                    <button
                      type="button"
                      key={image.url}
                      onClick={() => setSelectedImage(index)}
                      className={selectedImage === index ? "is-active" : ""}
                      aria-label={`Bild ${index + 1} anzeigen`}
                    >
                      <img src={image.url} alt="" />
                    </button>
                  ))}
                </div>
              )}
              <div className="product-detail-image">
                <img
                  src={productImages[selectedImage]?.url || product.image}
                  alt={productImages[selectedImage]?.altText || product.name}
                />
              </div>
            </div>
            <div className="product-detail-copy">
              <p>
                {product.category} · {product.gender}
              </p>
              <h1>{product.name}</h1>
              <p className="product-detail-lead">{product.description}</p>
              <div className="product-detail-price">
                <strong>{product.price}</strong>
                <PriceLegalNote />
              </div>
              <div className="product-purchase-panel">
                <div className="product-option">
                  <span>FARBE</span>
                  <div>
                    {product.colors.map((color) => (
                      <button
                        type="button"
                        key={color}
                        aria-label="Farbe auswählen"
                        aria-pressed={selectedColor === color}
                        onClick={() => setSelectedColor(color)}
                        className={`catalog-swatch ${selectedColor === color ? "is-selected" : ""}`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="product-option">
                  <span>GRÖSSE</span>
                  <div className="product-size-options">
                    {product.sizes.map((item) => (
                      <button
                        type="button"
                        key={item}
                        aria-pressed={size === item}
                        onClick={() => setSize(item)}
                        className={size === item ? "is-active" : ""}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className={`btn-red product-cart-button ${inCart ? "is-success" : ""}`}
                  onClick={addToCart}
                  disabled={cartStatus === "loading"}
                >
                  {cartStatus === "loading"
                    ? "WIRD HINZUGEFÜGT"
                    : inCart
                    ? "IM WARENKORB"
                    : "IN DEN WARENKORB"}{" "}
                  <span>→</span>
                </button>
                {inCart && (
                  <p className="product-cart-feedback">
                    IM WARENKORB GESPEICHERT.
                  </p>
                )}
                {cartStatus === "error" && (
                  <p className="product-cart-feedback is-error">
                    WARENKORB KONNTE NICHT AKTUALISIERT WERDEN.
                  </p>
                )}
              </div>
            </div>
          </div>
          <section id="details" className="product-more-details">
            <p>ARTIKELBESCHREIBUNG</p>
            <h2>{product.name}</h2>
            <p>
              {product.short}. Der Artikel ist für den täglichen Einsatz
              konzipiert und wird mit Sorgfalt für Pottlerkinder ausgewählt und
              veredelt.
            </p>
          </section>
        </div>
      </main>
    </PageShell>
  )
}

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <DecoBar />
        <TickerStripe direction="left" />
        <TickerSpacerBottom />
        <BannerSection />
        <TickerSpacerBottom />
        <TickerStripe direction="right" />
        <TickerSpacerBottom />
        <CategoriesSection />
        <TickerStripe direction="left" />
        <DecoBar />
        <BestsellerSection />
        <div className="w-full h-px bg-[#1a1a1a]" />
        <TrustBadgesBar />
        <BrandSection />
        <StatsBar />
      </main>
      <Footer />
    </div>
  )
}

function CartPage() {
  const { cart, loading } = useShopifyCart()
  const [updating, setUpdating] = useState<string | null>(null)
  const lines = cart?.lines?.edges || []
  const subtotal = cart?.cost?.subtotalAmount || cart?.cost?.totalAmount
  const currency = subtotal?.currencyCode || "EUR"
  const subtotalValue = Number(subtotal?.amount || 0)
  const shippingValue = subtotalValue >= 85 ? 0 : 6.15
  const formatCartMoney = (amount: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(
      amount,
    )
  const removeLine = async (lineId: string) => {
    if (!cart?.id) return
    setUpdating(lineId)
    const previousCart = cart
    publishCart(cartWithoutLine(cart, lineId))
    try {
      const response = await shopCart.remove(cart.id, [lineId])
      publishCart((response as { cart: any }).cart)
    } catch {
      publishCart(previousCart)
    } finally {
      setUpdating(null)
    }
  }
  const updateLineQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id || quantity < 1) return
    setUpdating(lineId)
    const previousCart = cart
    publishCart(cartWithLineQuantity(cart, lineId, quantity))
    try {
      const response = await shopCart.update(cart.id, [{ id: lineId, quantity }])
      publishCart((response as { cart: any }).cart)
    } catch {
      publishCart(previousCart)
    } finally {
      setUpdating(null)
    }
  }
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero
          compact
          image={imgHeaderCoal}
          eyebrow="POTTLERKINDER SHOP"
          title="WARENKORB"
          lead="Deine Auswahl aus dem Pott."
        />
        <section
          className="cart-page max-w-[1120px] mx-auto"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          {!cart && (
            <p className="catalog-no-results">
              {loading ? "WARENKORB WIRD GELADEN." : "DEIN WARENKORB IST LEER."}
            </p>
          )}
          {cart && lines.length === 0 && (
            <p className="catalog-no-results">DEIN WARENKORB IST LEER.</p>
          )}
          {lines.length > 0 && (
            <div className="cart-layout">
              <div className="cart-lines">
                {lines.map(({ node }: any) => {
                  const variant = node.merchandise
                  const image = variant.product.featuredImage
                  return (
                    <article key={node.id} className="cart-line">
                      {image?.url && (
                        <img
                          src={image.url}
                          alt={image.altText || variant.product.title}
                        />
                      )}
                      <div>
                        <p>{variant.product.title}</p>
                        <span>{variant.title}</span>
                        <div className="cart-line-price">
                          <small>
                          {node.quantity} ×{" "}
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: variant.price.currencyCode,
                          }).format(Number(variant.price.amount))}
                          </small>
                          <PriceLegalNote />
                        </div>
                        <CartQuantityControl
                          quantity={node.quantity}
                          maxQuantity={typeof variant.quantityAvailable === "number" ? variant.quantityAvailable : null}
                          onChange={(quantity) => updateLineQuantity(node.id, quantity)}
                          disabled={updating === node.id}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(node.id)}
                        disabled={updating === node.id}
                        className="cart-line-remove"
                      >
                        ENTFERNEN
                      </button>
                    </article>
                  )
                })}
              </div>
              <aside className="cart-summary">
                <p>ZWISCHENSUMME</p>
                <div className="cart-summary-price"><strong>{formatCartMoney(subtotalValue)}</strong><PriceLegalNote /></div>
                <div className="cart-summary-shipping">
                  <span>VERSAND · DHL / GLS</span>
                  <b className={shippingValue === 0 ? "is-free" : ""}>
                    {shippingValue === 0
                      ? "KOSTENLOS"
                      : formatCartMoney(shippingValue)}
                  </b>
                </div>
                <div className="cart-summary-total">
                  <span>VORAUSSICHTLICH GESAMT</span>
                  <b>{formatCartMoney(subtotalValue + shippingValue)}</b>
                </div>
                <small>* KOSTENLOSER VERSAND AB 85,00 € WARENWERT.</small>
                {cart?.checkoutUrl && lines.length > 0 ? (
                  <a className="btn-red" href={cart.checkoutUrl}>SICHER ZUR KASSE →</a>
                ) : null}
                <span>Bezahlung und Versand erfolgen sicher über Shopify.</span>
              </aside>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  )
}

type CustomerAccount = {
  displayName?: string
  firstName?: string
  lastName?: string
  emailAddress?: { emailAddress?: string }
  defaultAddress?: CustomerAddress
  addresses?: { nodes?: CustomerAddress[] }
  orders?: { nodes?: CustomerOrder[] }
}
type CustomerAddress = {
  id: string
  firstName?: string
  lastName?: string
  address1?: string
  address2?: string
  city?: string
  zip?: string
  country?: string
  territoryCode?: string
}
type CustomerOrder = {
  id: string
  name?: string
  confirmationNumber?: string
  processedAt?: string
  createdAt?: string
  cancelledAt?: string
  cancelReason?: string
  financialStatus?: string
  fulfillmentStatus?: string
  totalPrice?: { amount: string currencyCode: string }
  totalShipping?: { amount: string currencyCode: string }
  shippingLine?: {
    title?: string
    originalPrice?: { amount: string currencyCode: string }
  }
  shippingAddress?: CustomerAddress
  lineItems?: {
    nodes?: Array<{
      id: string
      name?: string
      variantTitle?: string
      quantity?: number
      image?: { url?: string altText?: string }
      totalPrice?: { amount: string currencyCode: string }
    }>
  }
}

function AccountCallbackPage() {
  const [message, setMessage] = useState("ANMELDUNG WIRD ABGESCHLOSSEN …")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const state = params.get("state")
    if (!code) {
      setMessage("DIE ANMELDUNG WURDE ABGEBROCHEN.")
      return
    }
    fetch(
      `/api/customer-account?action=callback&code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || "")}`,
      { credentials: "same-origin" },
    )
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok)
          throw new Error(data.error || "Anmeldung fehlgeschlagen")
        const registration = window.sessionStorage.getItem(
          "pottler-registration-details",
        )
        if (registration) {
          const saved = await fetch(
            "/api/customer-account?action=complete-registration",
            {
              method: "POST",
              credentials: "same-origin",
              headers: { "Content-Type": "application/json" },
              body: registration,
            },
          )
          if (saved.ok)
            window.sessionStorage.removeItem("pottler-registration-details")
          else
            window.sessionStorage.setItem(
              "pottler-registration-warning",
              "Dein Konto wurde erstellt. Die Adresse konnte noch nicht gespeichert werden – bitte ergänze sie später in deinem Konto.",
            )
        }
        const section =
          window.sessionStorage.getItem("pottler-account-section") || "personal"
        window.sessionStorage.removeItem("pottler-account-section")
        window.location.replace(`/account?section=${section}`)
      })
      .catch(() =>
        setMessage(
          "DIE ANMELDUNG KONNTE NICHT ABGESCHLOSSEN WERDEN. BITTE VERSUCHE ES ERNEUT.",
        ),
      )
  }, [])
  return (
    <PageShell inner>
      <main className="flex-1">
        <PageHero
          compact
          eyebrow="POTTLERKINDER ACCOUNT"
          title="EINEN MOMENT"
          lead={message}
          image={imgHeaderCoal}
        />
      </main>
    </PageShell>
  )
}

function AccountPage() {
  const initialSection =
    new URLSearchParams(window.location.search).get("section") || "personal"
  const [section, setSection] = useState(
    ACCOUNT_SECTIONS.some((item) => item.id === initialSection)
      ? initialSection
      : "personal",
  )
  const { customer, loading, signOut, refresh } = useCustomerAccount()
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    privacy: false,
  })
  const [registrationError, setRegistrationError] = useState("")
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const registrationSaveInProgress = useRef(false)
  useEffect(() => {
    if (!customer || registrationSaveInProgress.current) return
    registrationSaveInProgress.current = true
    fetch("/api/customer-account?action=complete-registration", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body:
        window.sessionStorage.getItem("pottler-registration-details") || "{}",
    })
      .then(async (response) => {
        if (!response.ok) return
        const result = await response.json()
        window.sessionStorage.removeItem("pottler-registration-details")
        if (!result.saved) return
        // The Customer Account session was loaded before the registration
        // details were written. Reload it so name and address appear now.
        await refresh()
      })
      .catch(() => undefined)
      .finally(() => {
        registrationSaveInProgress.current = false
      })
  }, [customer])
  const selectSection = (next: string) => {
    setSection(next)
    window.history.replaceState({}, "", `/account?section=${next}`)
  }
  const beginLogin = () => {
    window.sessionStorage.setItem("pottler-account-section", section)
    window.location.assign("/api/customer-account?action=login")
  }
  const beginRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const missing = ["firstName", "lastName", "address1", "zip", "city"].filter(
      (field) => !registration[(field as keyof typeof registration)],
    )
    if (!/^\S+@\S+\.\S+$/.test(registration.email)) missing.push("email")
    if (!registration.privacy) missing.push("privacy")
    if (missing.length) {
      setInvalidFields(missing)
      setRegistrationError("BITTE PRÜFE DIE MARKIERTEN FELDER.")
      return
    }
    setInvalidFields([])
    setRegistrationError("")
    const response = await fetch(
      "/api/customer-account?action=registration-pending",
      {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      },
    )
    if (!response.ok) {
      setRegistrationError(
        "DEINE ANGABEN KONNTEN NICHT GESPEICHERT WERDEN. BITTE VERSUCHE ES ERNEUT.",
      )
      return
    }
    beginLogin()
  }
  const accountName = customerName(customer)
  const orders = customer?.orders?.nodes || []
  const activeLabel =
    ACCOUNT_SECTIONS.find((item) => item.id === section)?.label ||
    "PERSÖNLICHE DATEN"
  const isInvalid = (field: string) => invalidFields.includes(field)
  const [accountMessage, setAccountMessage] = useState("")
  const saveAccount = async (
    action: string,
    payload: Record<string, string>,
  ) => {
    setAccountMessage("")
    const response = await fetch(`/api/customer-account?action=${action}`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (!response.ok) {
      setAccountMessage(
        data.error || "Änderung konnte nicht gespeichert werden.",
      )
      return false
    }
    await refresh()
    setAccountMessage("ÄNDERUNGEN WURDEN GESPEICHERT.")
    return true
  }
  return (
    <PageShell inner>
      <main className="flex-1">
        <section
          className="account-page account-page-access max-w-[1440px] mx-auto"
          style={{ paddingLeft: SECTION_PAD, paddingRight: SECTION_PAD }}
        >
          {loading && <p className="account-loading">KONTO WIRD GELADEN …</p>}
          {!loading && !customer && (
            <div className="account-login-panel">
              <div className="account-login-intro">
                <p className="account-kicker">SICHERER ZUGANG</p>
                <h2>
                  DEIN KONTO.
                  <br />
                  DEIN REVIER.
                </h2>
                <p>
                  Bestehende Kunden melden sich schnell per Code an. Neue Kunden
                  hinterlegen ihre Lieferdaten direkt vor dem ersten Zugang.
                </p>
              </div>
              <div className="account-access-grid account-access-grid-register">
                <article className="account-access-card">
                  <div className="account-access-symbol">@</div>
                  <p className="account-kicker">ICH BIN BEREITS KUNDE</p>
                  <h3>
                    MIT CODE
                    <br />
                    ANMELDEN
                  </h3>
                  <p>
                    Melde dich auf der geschützten Anmeldeseite an und bestätige
                    den Code aus deinem Postfach.
                  </p>
                  <button
                    type="button"
                    className="btn-red account-login-button"
                    onClick={beginLogin}
                  >
                    ZUR ANMELDUNG
                  </button>
                </article>
                <form
                  className="account-registration-form"
                  onSubmit={beginRegistration}
                  noValidate
                >
                  <p className="account-kicker">ICH BIN NEUER KUNDE</p>
                  <h3>KONTO ERSTELLEN</h3>
                  <p>
                    Deine Angaben werden nach der Bestätigung sicher in deinem
                    Kundenkonto gespeichert.
                  </p>
                  <div className="account-form-grid">
                    <label
                      className={isInvalid("firstName") ? "is-invalid" : ""}
                    >
                      VORNAME*
                      <input
                        value={registration.firstName}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            firstName: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("firstName")}
                      />
                      {isInvalid("firstName") && (
                        <small>! BITTE AUSFÜLLEN</small>
                      )}
                    </label>
                    <label
                      className={isInvalid("lastName") ? "is-invalid" : ""}
                    >
                      NACHNAME*
                      <input
                        value={registration.lastName}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            lastName: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("lastName")}
                      />
                      {isInvalid("lastName") && (
                        <small>! BITTE AUSFÜLLEN</small>
                      )}
                    </label>
                    <label
                      className={`account-form-wide ${
                        isInvalid("email") ? "is-invalid" : ""
                      }`}
                    >
                      E-MAIL-ADRESSE*
                      <input
                        type="email"
                        value={registration.email}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            email: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("email")}
                      />
                      {isInvalid("email") && (
                        <small>! GÜLTIGE E-MAIL EINGEBEN</small>
                      )}
                    </label>
                    <label
                      className={`account-form-wide ${
                        isInvalid("address1") ? "is-invalid" : ""
                      }`}
                    >
                      STRASSE & HAUSNUMMER*
                      <input
                        value={registration.address1}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            address1: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("address1")}
                      />
                      {isInvalid("address1") && (
                        <small>! BITTE AUSFÜLLEN</small>
                      )}
                    </label>
                    <label className="account-form-wide">
                      ADRESSZUSATZ{" "}
                      <input
                        value={registration.address2}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            address2: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className={isInvalid("zip") ? "is-invalid" : ""}>
                      POSTLEITZAHL*
                      <input
                        value={registration.zip}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            zip: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("zip")}
                      />
                      {isInvalid("zip") && <small>! BITTE AUSFÜLLEN</small>}
                    </label>
                    <label className={isInvalid("city") ? "is-invalid" : ""}>
                      ORT*
                      <input
                        value={registration.city}
                        onChange={(e) =>
                          setRegistration({
                            ...registration,
                            city: e.target.value,
                          })
                        }
                        aria-invalid={isInvalid("city")}
                      />
                      {isInvalid("city") && <small>! BITTE AUSFÜLLEN</small>}
                    </label>
                  </div>
                  <label
                    className={`account-privacy ${
                      isInvalid("privacy") ? "is-invalid" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={registration.privacy}
                      onChange={(e) =>
                        setRegistration({
                          ...registration,
                          privacy: e.target.checked,
                        })
                      }
                      aria-invalid={isInvalid("privacy")}
                    />{" "}
                    <span>
                      Ich habe die Datenschutzerklärung gelesen und akzeptiere
                      sie.
                    </span>
                    {isInvalid("privacy") && <small>! BITTE BESTÄTIGEN</small>}
                  </label>
                  {registrationError && (
                    <small className="account-form-error">
                      {registrationError}
                    </small>
                  )}
                  <button
                    className="btn-red account-login-button"
                    type="submit"
                  >
                    KONTO MIT E-MAIL ERSTELLEN
                  </button>
                </form>
              </div>
              <small className="account-login-note">
                Danach öffnen wir direkt {activeLabel.toLowerCase()}.
              </small>
            </div>
          )}
          {!loading && customer && (
            <div className="account-layout">
              <aside className="account-profile">
                <p className="account-kicker">MEIN POTTLERKINDER</p>
                {accountName && <h2>{accountName}</h2>}
                <p>{customer.emailAddress?.emailAddress}</p>
                <nav className="account-side-nav">
                  {ACCOUNT_SECTIONS.map((item) => (
                    <button
                      type="button"
                      className={section === item.id ? "is-active" : ""}
                      onClick={() => selectSection(item.id)}
                      key={item.id}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <button
                  type="button"
                  className="btn-glass account-logout"
                  onClick={signOut}
                >
                  ABMELDEN
                </button>
              </aside>
              <div className="account-content">
                {section === "personal" && (
                  <PersonalDataForm
                    customer={customer}
                    onSave={saveAccount}
                    message={accountMessage}
                  />
                )}
                {section === "addresses" && (
                  <AddressManager
                    addresses={customer.addresses?.nodes || []}
                    onSave={saveAccount}
                    message={accountMessage}
                  />
                )}
                {section === "orders" && <OrdersList orders={orders} />}
              </div>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  )
}

function PersonalDataForm({
  customer,
  onSave,
  message,
}: {
  customer: CustomerAccount
  onSave: (action: string, payload: Record<string, string>) => Promise<boolean>
  message: string
}) {
  const [firstName, setFirstName] = useState(customer.firstName || "")
  const [lastName, setLastName] = useState(customer.lastName || "")
  return (
    <section>
      <div className="account-section-head">
        <div>
          <p className="account-kicker">MEIN KONTO</p>
          <h2>PERSÖNLICHE DATEN</h2>
        </div>
      </div>
      <form
        className="account-edit-form"
        onSubmit={(e) => {
          e.preventDefault()
          onSave("update-profile", { firstName, lastName })
        }}
      >
        <label>
          VORNAME
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          NACHNAME
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="account-edit-wide">
          E-MAIL-ADRESSE
          <input value={customer.emailAddress?.emailAddress || ""} disabled />
        </label>
        <button className="btn-red" type="submit">
          ÄNDERUNGEN SPEICHERN
        </button>
      </form>
      {message && <p className="account-save-message">{message}</p>}
    </section>
  )
}

const formatCustomerMoney = (money?: {
  amount: string
  currencyCode: string
}) =>
  money
    ? new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: money.currencyCode,
      }).format(Number(money.amount))
    : "—"

function orderStatusLabel(
  status?: string,
  kind: "payment" | "fulfillment" = "fulfillment",
) {
  const normalized = (status || "").toUpperCase()
  const labels: Record<string, string> =
    kind === "payment"
      ? {
          PENDING: "ZAHLUNG AUSSTEHEND",
          AUTHORIZED: "ZAHLUNG AUTORISIERT",
          PAID: "BEZAHLT",
          PARTIALLY_PAID: "TEILWEISE BEZAHLT",
          REFUNDED: "ERSTATTET",
          PARTIALLY_REFUNDED: "TEILWEISE ERSTATTET",
          VOIDED: "STORNIERT",
          EXPIRED: "ABGELAUFEN",
        }
      : {
          UNFULFILLED: "NOCH NICHT VERSENDET",
          PARTIALLY_FULFILLED: "TEILWEISE VERSENDET",
          FULFILLED: "VERSENDET",
          RESTOCKED: "STORNIERT",
          IN_PROGRESS: "IN BEARBEITUNG",
          ON_HOLD: "ANGEHALTEN",
          SCHEDULED: "GEPLANT",
        }
  return (
    labels[normalized] ||
    (kind === "payment" ? "ZAHLUNG WIRD GEPRÜFT" : "IN BEARBEITUNG")
  )
}

function OrdersList({ orders }: { orders: CustomerOrder[] }) {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null)
  return (
    <section>
      <div className="account-section-head">
        <div>
          <p className="account-kicker">BESTELLUNGEN</p>
          <h2>DEINE LETZTEN SCHICHTEN</h2>
        </div>
        <span>
          {orders.length} {orders.length === 1 ? "BESTELLUNG" : "BESTELLUNGEN"}
        </span>
      </div>
      {orders.length === 0 ? (
        <div className="account-empty">
          <strong>NOCH KEINE BESTELLUNGEN</strong>
          <p>Deine nächste Auswahl aus dem Pott wartet im Katalog.</p>
          <a href="/katalog" className="btn-red">
            ZUM KATALOG →
          </a>
        </div>
      ) : (
        <div className="account-orders">
          {orders.map((order) => {
            const isOpen = openOrderId === order.id
            const isCancelled =
              Boolean(order.cancelledAt) ||
              order.financialStatus?.toUpperCase() === "VOIDED"
            const date = order.processedAt || order.createdAt
            const fulfillment = isCancelled
              ? "STORNIERT"
              : orderStatusLabel(order.fulfillmentStatus)
            const payment = orderStatusLabel(order.financialStatus, "payment")
            const items = order.lineItems?.nodes || []
            const shippingAddress = order.shippingAddress
            const addressLines = shippingAddress
              ? [
                  shippingAddress.firstName,
                  shippingAddress.lastName,
                  shippingAddress.address1,
                  shippingAddress.address2,
                  [shippingAddress.zip, shippingAddress.city]
                    .filter(Boolean)
                    .join(" "),
                  shippingAddress.country,
                ].filter(Boolean)
              : []
            return (
              <article
                className={`account-order ${isOpen ? "is-open" : ""}`}
                key={order.id}
              >
                <button
                  type="button"
                  className="account-order-summary"
                  aria-expanded={isOpen}
                  aria-controls={`order-${order.id}`}
                  onClick={() => setOpenOrderId(isOpen ? null : order.id)}
                >
                  <div>
                    <strong>
                      {order.name || order.confirmationNumber || "BESTELLUNG"}
                    </strong>
                    <span>
                      {date
                        ? new Intl.DateTimeFormat("de-DE", {
                            dateStyle: "medium",
                          }).format(new Date(date))
                        : ""}
                    </span>
                  </div>
                  <div className="account-order-total">
                    <small className={isCancelled ? "is-cancelled" : ""}>
                      {fulfillment}
                    </small>
                    <b>{formatCustomerMoney(order.totalPrice)}</b>
                    <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                  </div>
                </button>
                {isOpen && (
                  <div
                    className="account-order-details"
                    id={`order-${order.id}`}
                  >
                    <div className="account-order-meta">
                      <div>
                        <small>BESTELLNUMMER</small>
                        <b>{order.name || order.confirmationNumber || "—"}</b>
                      </div>
                      <div>
                        <small>ZAHLUNGSSTATUS</small>
                        <b>{payment}</b>
                      </div>
                      <div>
                        <small>VERSANDSTATUS</small>
                        <b className={isCancelled ? "is-cancelled" : ""}>
                          {fulfillment}
                        </b>
                      </div>
                      <div>
                        <small>VERSANDART</small>
                        <b>{order.shippingLine?.title || "VERSAND"}</b>
                      </div>
                      <div>
                        <small>VERSANDKOSTEN</small>
                        <b>
                          {formatCustomerMoney(
                            order.totalShipping ||
                              order.shippingLine?.originalPrice,
                          )}
                        </b>
                      </div>
                    </div>
                    {addressLines.length > 0 && (
                      <div className="account-order-delivery">
                        <small>LIEFERADRESSE</small>
                        <address>
                          {addressLines.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </address>
                      </div>
                    )}
                    {isCancelled && (
                      <p className="account-order-notice">
                        DIESE BESTELLUNG WURDE STORNIERT
                        {order.cancelReason
                          ? ` · ${order.cancelReason.replaceAll("_", " ")}`
                          : ""}
                        .
                      </p>
                    )}
                    <div className="account-order-items">
                      {items.length ? (
                        items.map((item) => (
                          <div className="account-order-item" key={item.id}>
                            {item.image?.url ? (
                              <img
                                src={item.image.url}
                                alt={
                                  item.image.altText || item.name || "Produkt"
                                }
                              />
                            ) : (
                              <div
                                className="account-order-item-placeholder"
                                aria-hidden="true"
                              />
                            )}
                            <div>
                              <strong>{item.name || "ARTIKEL"}</strong>
                              {item.variantTitle &&
                                item.variantTitle !== "Default Title" && (
                                  <span>{item.variantTitle}</span>
                                )}
                              <small>
                                {item.quantity || 1} ×{" "}
                                {formatCustomerMoney(item.totalPrice)}
                              </small>
                            </div>
                            <b>{formatCustomerMoney(item.totalPrice)}</b>
                          </div>
                        ))
                      ) : (
                        <p className="account-order-items-empty">
                          DIE ARTIKEL DIESER BESTELLUNG WERDEN VON SHOPIFY NOCH
                          GELADEN.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

function AddressManager({
  addresses,
  onSave,
  message,
}: {
  addresses: CustomerAddress[]
  onSave: (action: string, payload: Record<string, string>) => Promise<boolean>
  message: string
}) {
  const empty = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
  }
  const [editing, setEditing] = useState<CustomerAddress | null>(null)
  const [editorOpen, setEditorOpen] = useState(addresses.length === 0)
  const [form, setForm] = useState<Record<string, string>>(empty)
  const open = (item?: CustomerAddress) => {
    setEditing(item || null)
    setEditorOpen(true)
    setForm(
      item
        ? {
            firstName: item.firstName || "",
            lastName: item.lastName || "",
            address1: item.address1 || "",
            address2: item.address2 || "",
            zip: item.zip || "",
            city: item.city || "",
          }
        : empty,
    )
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.address1 || !form.zip || !form.city) return
    const ok = await onSave(
      editing ? "update-address" : "create-address",
      editing ? { ...form, id: editing.id } : form,
    )
    if (ok) {
      setEditing(null)
      setEditorOpen(false)
    }
  }
  return (
    <section>
      <div className="account-section-head">
        <div>
          <p className="account-kicker">MEIN KONTO</p>
          <h2>ADRESSEN</h2>
        </div>
        <span>{addresses.length}/3 GESPEICHERT</span>
      </div>
      <div className="account-address-list">
        {addresses.map((item) => (
          <article key={item.id}>
            <p>
              {item.firstName} {item.lastName}
              <br />
              {item.address1}
              {item.address2 && `, ${item.address2}`}
              <br />
              {item.zip} {item.city}
            </p>
            <div>
              <button
                type="button"
                className="account-address-action"
                onClick={() => open(item)}
              >
                BEARBEITEN
              </button>
              <button
                type="button"
                className="account-address-action is-danger"
                onClick={() => onSave("delete-address", { id: item.id })}
              >
                LÖSCHEN
              </button>
            </div>
          </article>
        ))}
      </div>
      {addresses.length < 3 && (
        <button
          className="account-add-address"
          type="button"
          onClick={() => open()}
        >
          + NEUE ADRESSE HINZUFÜGEN
        </button>
      )}
      {editorOpen ? (
        <form
          className="account-edit-form account-address-form"
          onSubmit={submit}
        >
          <h3>{editing ? "ADRESSE BEARBEITEN" : "NEUE ADRESSE"}</h3>
          <label>
            VORNAME
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </label>
          <label>
            NACHNAME
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </label>
          <label className="account-edit-wide">
            STRASSE & HAUSNUMMER*
            <input
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
              required
            />
          </label>
          <label className="account-edit-wide">
            ADRESSZUSATZ
            <input
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
            />
          </label>
          <label>
            PLZ*
            <input
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              required
            />
          </label>
          <label>
            ORT*
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
          </label>
          <button className="btn-red" type="submit">
            ADRESSE SPEICHERN
          </button>
          {editing && (
            <button
              type="button"
              className="account-cancel"
              onClick={() => {
                setEditing(null)
                setEditorOpen(false)
              }}
            >
              ABBRECHEN
            </button>
          )}
        </form>
      ) : null}
      {message && <p className="account-save-message">{message}</p>}
    </section>
  )
}

function AccountInformation({
  title,
  rows,
}: {
  title: string
  rows: Array<[string, string | undefined]>
}) {
  return (
    <>
      <div className="account-section-head">
        <div>
          <p className="account-kicker">MEIN KONTO</p>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="account-information">
        {rows.map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <p>{value || "NICHT HINTERLEGT"}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const DESIGNER_PRODUCTS = [
  {
    id: "hoodie",
    title: "HOODIE",
    name: "Herren Hoodie",
    image: customHoodie,
    type: "textile",
    zone: "standard",
  },
  {
    id: "tshirt",
    title: "T-SHIRT",
    name: "Herren T-Shirt",
    image: customTshirt,
    type: "textile",
    zone: "standard",
  },
  {
    id: "polo",
    title: "POLO",
    name: "Herren Polo",
    image: customPolo,
    type: "textile",
    zone: "standard",
  },
  {
    id: "sweatshirt",
    title: "SWEATSHIRT",
    name: "Herren Sweatshirt",
    image: customSweatshirt,
    type: "textile",
    zone: "standard",
  },
  {
    id: "shirt",
    title: "HEMD",
    name: "Herren Hemd",
    image: customShirt,
    type: "textile",
    zone: "standard",
  },
  {
    id: "mug",
    title: "GLÄSER & TASSEN",
    name: "Tasse Two Tone",
    image: twoToneMugYellow,
    type: "single",
    zone: "mug",
  },
  {
    id: "shopper",
    title: "SHOPPER",
    name: "Shopper",
    image: solsStockholmRed,
    type: "single",
    zone: "shopper",
  },
  {
    id: "headwear",
    title: "KOPFBEDECKUNG",
    name: "Kopfbedeckung",
    image: customCap,
    type: "single",
    zone: "cap",
  },
] as const

const OTHER_DESIGNER_PRODUCTS = DESIGNER_PRODUCTS.filter((item) =>
  ["mug", "shopper"].includes(item.id),
)

const FRAUEN_HOODIE_COLORS = [
  {
    id: "00",
    label: "WHITE",
    swatch: "#f4f4f1",
    image: hoodieWhite,
    backImage: womenHoodieWhiteBack,
  },
  {
    id: "36",
    label: "FIRE RED",
    swatch: "#c62830",
    image: hoodieFireRed,
    backImage: womenHoodieFireRedBack,
  },
  {
    id: "OL",
    label: "OLIVE",
    swatch: "#667347",
    image: hoodieOlive,
    backImage: womenHoodieOliveBack,
  },
  {
    id: "AZ",
    label: "AZURE BLUE",
    swatch: "#147fbd",
    image: hoodieAzureBlue,
    backImage: womenHoodieAzureBlueBack,
  },
  {
    id: "54",
    label: "NAVY",
    swatch: "#172e57",
    image: hoodieNavy,
    backImage: womenHoodieNavyBack,
  },
  {
    id: "HN",
    label: "HEATHER NAVY",
    swatch: "#3f506b",
    image: hoodieHeatherNavy,
    backImage: womenHoodieHeatherNavyBack,
  },
  {
    id: "FN",
    label: "FRENCH NAVY",
    swatch: "#283a59",
    image: hoodieFrenchNavy,
    backImage: womenHoodieFrenchNavyBack,
  },
  {
    id: "CA",
    label: "CHARCOAL",
    swatch: "#3d3d3c",
    image: hoodieCharcoal,
    backImage: womenHoodieCharcoalBack,
  },
  {
    id: "HY",
    label: "HEATHER GREY",
    swatch: "#a7a8a7",
    image: hoodieHeatherGrey,
    backImage: womenHoodieHeatherGreyBack,
  },
  {
    id: "NW",
    label: "NEW LIGHT GREY",
    swatch: "#d1d1cf",
    image: hoodieNewLightGrey,
    backImage: womenHoodieNewLightGreyBack,
  },
  {
    id: "9D",
    label: "BLACK",
    swatch: "#151515",
    image: hoodieBlack,
    backImage: womenHoodieBlackBack,
  },
] as const

const menHoodieFrontImages = import.meta.glob(
  "./assets/designer/men-hoodie/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const menHoodieBackImages = import.meta.glob(
  "./assets/designer/men-hoodie/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const MAENNER_HOODIE_COLORS = [
  ["36", "FIRE RED", "#c62830", "fire_red"],
  ["OL", "OLIVE", "#667347", "olive"],
  ["AZ", "AZURE BLUE", "#147fbd", "azure_blue"],
  ["54", "NAVY", "#172e57", "navy"],
  ["HN", "HEATHER NAVY", "#3f506b", "heather_navy"],
  ["FN", "FRENCH NAVY", "#283a59", "french_navy"],
  ["A5", "BERRY", "#692842", "berry"],
  ["CA", "CHARCOAL", "#3d3d3c", "charcoal"],
  ["HY", "HEATHER GREY", "#a7a8a7", "heather_grey"],
  ["NW", "NEW LIGHT GREY", "#d1d1cf", "new_light_grey"],
  ["9D", "BLACK", "#151515", "black"],
  ["00", "WHITE", "#f4f4f1", "white"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    menHoodieFrontImages[`./assets/designer/men-hoodie/front/${imageKey}.webp`],
  backImage:
    menHoodieBackImages[`./assets/designer/men-hoodie/back/${imageKey}.webp`],
}))

const unisexHoodieFrontImages = import.meta.glob(
  "./assets/designer/unisex-hoodie/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const unisexHoodieBackImages = import.meta.glob(
  "./assets/designer/unisex-hoodie/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const UNISEX_HOODIE_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["143", "CREAMY PINK", "#f4e1d9", "creamy_pink"],
  ["146", "BURGUNDY", "#521323", "burgundy"],
  ["161", "BRIGHT RED", "#e00404", "bright_red"],
  ["171", "ASTRAL PURPLE", "#662c55", "astral_purple"],
  ["199", "ARTIC BLUE", "#c5e7e1", "artic_blue"],
  ["205", "BLUE", "#65769a", "blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["251", "CREAMY BLUE", "#bad4dd", "creamy_blue"],
  ["260", "LIGHT YELLOW", "#fffe94", "light_yellow"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["269", "ARMY", "#605e51", "army"],
  ["290", "SPRING GREEN", "#57ab6e", "spring_green"],
  ["292", "FROZEN GREEN", "#b4d4b2", "frozen_green"],
  ["295", "POOL BLUE", "#51b9b3", "pool_blue"],
  ["300", "ASH", "#dcd8d3", "ash"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["323", "CREAMY GREEN", "#cbdbd3", "creamy_green"],
  ["348", "CHARCOAL MELANGE", "#38393b", "charcoal_melange"],
  ["360", "GREY MELANGE 2", "#b1b3b4", "grey_melange_2"],
  ["411", "POP ORANGE", "#f35c53", "pop_orange"],
  ["701", "LILAC", "#d8c9d7", "lilac"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    unisexHoodieFrontImages[
      `./assets/designer/unisex-hoodie/front/${imageKey}.webp`
    ],
  backImage:
    unisexHoodieBackImages[
      `./assets/designer/unisex-hoodie/back/${imageKey}.webp`
    ],
}))

const kidsHoodieFrontImages = import.meta.glob(
  "./assets/designer/kids-hoodie/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const kidsHoodieBackImages = import.meta.glob(
  "./assets/designer/kids-hoodie/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const KINDER_HOODIE_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["143", "CREAMY PINK", "#f4e1d9", "creamy_pink"],
  ["161", "BRIGHT RED", "#e00404", "bright_red"],
  ["205", "BLUE", "#65769a", "blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["260", "LIGHT YELLOW", "#fffe94", "light_yellow"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["360", "GREY MELANGE 2", "#b1b3b4", "grey_melange_2"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    kidsHoodieFrontImages[
      `./assets/designer/kids-hoodie/front/${imageKey}.webp`
    ],
  backImage:
    kidsHoodieBackImages[`./assets/designer/kids-hoodie/back/${imageKey}.webp`],
}))

const kidsTshirtFrontImages = import.meta.glob(
  "./assets/designer/kids-tshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const kidsTshirtBackImages = import.meta.glob(
  "./assets/designer/kids-tshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const KINDER_TSHIRT_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["117", "ABSOLUTE WHITE", "#f4f9fe", "absolute_white"],
  ["137", "MEDIUM PINK", "#f6cdc4", "medium_pink"],
  ["145", "RED", "#c41e39", "red"],
  ["220", "SKY BLUE", "#a1b8d9", "sky_blue"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["309", "DEEP BLACK", "#2d2927", "deep_black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["350", "GREY MELANGE", "#b1b3b4", "grey_melange"],
  ["398", "CHOCOLATE", "#3b3129", "chocolate"],
  ["400", "ORANGE", "#fe5001", "orange"],
  ["712", "DARK PURPLE", "#553e7c", "dark_purple"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    kidsTshirtFrontImages[
      `./assets/designer/kids-tshirt/front/${imageKey}.webp`
    ],
  backImage:
    kidsTshirtBackImages[
      `./assets/designer/kids-tshirt/back/${imageKey}.webp`
    ] ||
    kidsTshirtFrontImages[
      `./assets/designer/kids-tshirt/front/${imageKey}.webp`
    ],
}))

const womenTshirtFrontImages = import.meta.glob(
  "./assets/designer/women-tshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const womenTshirtBackImages = import.meta.glob(
  "./assets/designer/women-tshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const FRAUEN_TSHIRT_COLORS = [
  ["101", "NATURAL", "#f2efd9", "natural"],
  ["102", "WHITE", "#ffffff", "white"],
  ["140", "FUCHSIA", "#ac005b", "fuchsia"],
  ["145", "RED", "#c41e39", "red"],
  ["146", "BURGUNDY", "#521323", "burgundy"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["244", "DENIM", "#364254", "denim"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["268", "KHAKI", "#9d9882", "khaki"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["280", "APPLE GREEN", "#bace70", "apple_green"],
  ["300", "ASH", "#dcd8d3", "ash"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["309", "DEEP BLACK", "#2d2927", "deep_black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["350", "GREY MELANGE", "#b1b3b4", "grey_melange"],
  ["381", "MOUSE GREY", "#3c3e4c", "mouse_grey"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    womenTshirtFrontImages[
      `./assets/designer/women-tshirt/front/${imageKey}.webp`
    ],
  backImage:
    womenTshirtBackImages[
      `./assets/designer/women-tshirt/back/${imageKey}.webp`
    ],
}))

const menTshirtFrontImages = import.meta.glob(
  "./assets/designer/men-tshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const menTshirtBackImages = import.meta.glob(
  "./assets/designer/men-tshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const MAENNER_TSHIRT_COLORS = [
  ["146", "BURGUNDY", "#521323", "burgundy"],
  ["145", "RED", "#c41e39", "red"],
  ["400", "ORANGE", "#fe5001", "orange"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["268", "KHAKI", "#9d9882", "khaki"],
  ["101", "NATURAL", "#f2efd9", "natural"],
  ["280", "APPLE GREEN", "#bace70", "apple_green"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["244", "DENIM", "#364254", "denim"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["140", "FUCHSIA", "#ac005b", "fuchsia"],
  ["300", "ASH", "#dcd8d3", "ash"],
  ["350", "GREY MELANGE", "#b1b3b4", "grey_melange"],
  ["381", "MOUSE GREY", "#3c3e4c", "mouse_grey"],
  ["309", "DEEP BLACK", "#2d2927", "deep_black"],
  ["102", "WHITE", "#ffffff", "white"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    menTshirtFrontImages[`./assets/designer/men-tshirt/front/${imageKey}.webp`],
  backImage:
    menTshirtBackImages[`./assets/designer/men-tshirt/back/${imageKey}.webp`],
}))

const unisexTshirtFrontImages = import.meta.glob(
  "./assets/designer/unisex-tshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const unisexTshirtBackImages = import.meta.glob(
  "./assets/designer/unisex-tshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const UNISEX_TSHIRT_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["104", "OFF WHITE", "#faf6ef", "off_white"],
  ["119", "LINEN", "#cfbfb3", "linen"],
  ["123", "ROPE", "#c7c0b1", "rope"],
  ["126", "DARK BEIGE", "#b9986e", "dark_beige"],
  ["127", "CANDY PINK", "#f4b0bc", "candy_pink"],
  ["161", "BRIGHT RED", "#e00404", "bright_red"],
  ["171", "ASTRAL PURPLE", "#662c55", "astral_purple"],
  ["172", "FOLK PINK", "#cf6977", "folk_pink"],
  ["173", "FOLK RED", "#902d44", "folk_red"],
  ["199", "ARTIC BLUE", "#c5e7e1", "artic_blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["244", "DENIM", "#364254", "denim"],
  ["260", "LIGHT YELLOW", "#fffe94", "light_yellow"],
  ["268", "KHAKI", "#9d9882", "khaki"],
  ["290", "SPRING GREEN", "#57ab6e", "spring_green"],
  ["291", "EMPIRE GREEN", "#01351e", "empire_green"],
  ["292", "FROZEN GREEN", "#b4d4b2", "frozen_green"],
  ["295", "POOL BLUE", "#51b9b3", "pool_blue"],
  ["309", "DEEP BLACK", "#2d2927", "deep_black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["342", "PURE GREY", "#b9c2cb", "pure_grey"],
  ["350", "GREY MELANGE", "#b1b3b4", "grey_melange"],
  ["409", "PEACH", "#fc9d5d", "peach"],
  ["411", "POP ORANGE", "#f35c53", "pop_orange"],
  ["701", "LILAC", "#d8c9d7", "lilac"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    unisexTshirtFrontImages[
      `./assets/designer/unisex-tshirt/front/${imageKey}.webp`
    ],
  backImage:
    unisexTshirtBackImages[
      `./assets/designer/unisex-tshirt/back/${imageKey}.webp`
    ],
}))

const womenPoloFrontImages = import.meta.glob(
  "./assets/designer/women-polo/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const womenPoloBackImages = import.meta.glob(
  "./assets/designer/women-polo/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const FRAUEN_POLO_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["104", "OFF WHITE", "#faf6ef", "off_white"],
  ["119", "LINEN", "#cfbfb3", "linen"],
  ["123", "ROPE", "#c7c0b1", "rope"],
  ["127", "CANDY PINK", "#f4b0bc", "candy_pink"],
  ["145", "RED", "#c41e39", "red"],
  ["200", "SKY BLUE", "#a1b8d9", "sky_blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["244", "DENIM", "#364254", "denim"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["342", "PURE GREY", "#b9c2cb", "pure_grey"],
  ["360", "GREY MELANGE", "#b1b3b4", "grey_melange_2"],
  ["381", "MOUSE GREY", "#3c3e4c", "mouse_grey"],
  ["400", "ORANGE", "#fe5001", "orange"],
  ["701", "LILAC", "#d8c9d7", "lilac"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    womenPoloFrontImages[`./assets/designer/women-polo/front/${imageKey}.webp`],
  backImage:
    womenPoloBackImages[`./assets/designer/women-polo/back/${imageKey}.webp`],
}))

const menPoloFrontImages = import.meta.glob(
  "./assets/designer/men-polo/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const menPoloBackImages = import.meta.glob(
  "./assets/designer/men-polo/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const MAENNER_POLO_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["104", "OFF WHITE", "#faf6ef", "off_white"],
  ["119", "LINEN", "#cfbfb3", "linen"],
  ["123", "ROPE", "#c7c0b1", "rope"],
  ["127", "CANDY PINK", "#f4b0bc", "candy_pink"],
  ["145", "RED", "#c41e39", "red"],
  ["200", "SKY BLUE", "#a1b8d9", "sky_blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["244", "DENIM", "#364254", "denim"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["301", "GOLD", "#f8b61a", "gold"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["342", "PURE GREY", "#b9c2cb", "pure_grey"],
  ["360", "GREY MELANGE 2", "#b1b3b4", "grey_melange_2"],
  ["381", "MOUSE GREY", "#3c3e4c", "mouse_grey"],
  ["400", "ORANGE", "#fe5001", "orange"],
  ["701", "LILAC", "#d8c9d7", "lilac"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    menPoloFrontImages[`./assets/designer/men-polo/front/${imageKey}.webp`],
  backImage:
    menPoloBackImages[`./assets/designer/men-polo/back/${imageKey}.webp`],
}))

const unisexPoloFrontImages = import.meta.glob(
  "./assets/designer/unisex-polo/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const unisexPoloBackImages = import.meta.glob(
  "./assets/designer/unisex-polo/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const UNISEX_POLO_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["145", "RED", "#c41e39", "red"],
  ["174", "RIBBON PINK", "#f04e98", "ribbon_pink"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["269", "ARMY", "#605e51", "army"],
  ["295", "POOL BLUE", "#51b9b3", "pool_blue"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["321", "AQUA", "#008caf", "aqua"],
  ["342", "PURE GREY", "#b9c2cb", "pure_grey"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    unisexPoloFrontImages[
      `./assets/designer/unisex-polo/front/${imageKey}.webp`
    ],
  backImage:
    unisexPoloBackImages[`./assets/designer/unisex-polo/back/${imageKey}.webp`],
}))

const kidsPoloFrontImages = import.meta.glob(
  "./assets/designer/kids-polo/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const kidsPoloBackImages = import.meta.glob(
  "./assets/designer/kids-polo/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const KINDER_POLO_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["145", "RED", "#c41e39", "red"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["318", "NAVY", "#1b2432", "navy"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    kidsPoloFrontImages[`./assets/designer/kids-polo/front/${imageKey}.webp`],
  backImage:
    kidsPoloBackImages[`./assets/designer/kids-polo/back/${imageKey}.webp`],
}))

const kidsSweatshirtFrontImages = import.meta.glob(
  "./assets/designer/kids-sweatshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const kidsSweatshirtBackImages = import.meta.glob(
  "./assets/designer/kids-sweatshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const shopperImages = import.meta.glob("./assets/designer/shopper/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>
const SHOPPER_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["145", "RED", "#c41e39", "red"],
  ["205", "BLUE", "#65769a", "blue"],
  ["268", "KHAKI", "#9d9882", "khaki"],
  ["312", "BLACK", "#29282d", "black"],
  ["318", "NAVY", "#1b2432", "navy"],
  ["409", "PEACH", "#fc9d5d", "peach"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image: shopperImages[`./assets/designer/shopper/${imageKey}.webp`],
  backImage: shopperImages[`./assets/designer/shopper/${imageKey}.webp`],
}))
const twoToneMugImages = import.meta.glob(
  "./assets/designer/mug/two-tone/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const MUG_COLORS = [
  ["blau", "WEISS / BLAU", "#0000ff", "blau"],
  ["cambridge_blau", "WEISS / CAMBRIDGE BLAU", "#0962bb", "cambridge_blau"],
  ["gelb", "WEISS / GELB", "#ffcc00", "gelb"],
  ["goldgelb", "WEISS / GOLDGELB", "#ffc900", "goldgelb"],
  ["grau", "WEISS / GRAU", "#9e9e9e", "grau"],
  ["gruen", "WEISS / GRÜN", "#003300", "gruen"],
  ["hellblau", "WEISS / HELLBLAU", "#66ccff", "hellblau"],
  ["hellgruen", "WEISS / HELLGRÜN", "#97db3e", "hellgruen"],
  ["maroon", "WEISS / MAROON", "#920404", "maroon"],
  ["mint", "WEISS / MINT", "#40c1ac", "mint"],
  ["orange", "WEISS / ORANGE", "#ff6600", "orange"],
  ["rosa", "WEISS / ROSA", "#f7cac9", "rosa"],
  ["rot", "WEISS / ROT", "#ff0000", "rot"],
  ["schwarz", "WEISS / SCHWARZ", "#000000", "schwarz"],
  ["tuerkis", "WEISS / TÜRKIS", "#50b3ba", "tuerkis"],
  ["violett", "WEISS / VIOLETT", "#563969", "violett"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image: twoToneMugImages[`./assets/designer/mug/two-tone/${imageKey}.webp`],
}))
const KINDER_SWEATSHIRT_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["143", "CREAMY PINK", "#f4e1d9", "creamy_pink"],
  ["161", "BRIGHT RED", "#e00404", "bright_red"],
  ["205", "BLUE", "#65769a", "blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["260", "LIGHT YELLOW", "#fffe94", "light_yellow"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["360", "GREY MELANGE 2", "#b1b3b4", "grey_melange_2"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    kidsSweatshirtFrontImages[
      `./assets/designer/kids-sweatshirt/front/${imageKey}.webp`
    ],
  backImage:
    kidsSweatshirtBackImages[
      `./assets/designer/kids-sweatshirt/back/${imageKey}.webp`
    ],
}))

const columbiaFrontImages = import.meta.glob(
  "./assets/designer/columbia-sweatshirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const columbiaBackImages = import.meta.glob(
  "./assets/designer/columbia-sweatshirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const COLUMBIA_SWEATSHIRT_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["143", "CREAMY PINK", "#f4e1d9", "creamy_pink"],
  ["146", "BURGUNDY", "#521323", "burgundy"],
  ["161", "BRIGHT RED", "#e00404", "bright_red"],
  ["205", "BLUE", "#65769a", "blue"],
  ["241", "ROYAL BLUE", "#003373", "royal_blue"],
  ["251", "CREAMY BLUE", "#bad4dd", "creamy_blue"],
  ["260", "LIGHT YELLOW", "#fffe94", "light_yellow"],
  ["264", "BOTTLE GREEN", "#384e42", "bottle_green"],
  ["269", "ARMY", "#605e51", "army"],
  ["272", "KELLY GREEN", "#27964e", "kelly_green"],
  ["295", "POOL BLUE", "#51b9b3", "pool_blue"],
  ["312", "BLACK", "#29282d", "black"],
  ["319", "FRENCH NAVY", "#2a2d3d", "french_navy"],
  ["323", "CREAMY GREEN", "#cbdbd3", "creamy_green"],
  ["348", "CHARCOAL MELANGE", "#38393b", "charcoal_melange"],
  ["360", "GREY MELANGE", "#b1b3b4", "grey_melange_2"],
  ["400", "ORANGE", "#fe5001", "orange"],
  ["701", "LILAC", "#d8c9d7", "lilac"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    columbiaFrontImages[
      `./assets/designer/columbia-sweatshirt/front/${imageKey}.webp`
    ],
  backImage:
    columbiaBackImages[
      `./assets/designer/columbia-sweatshirt/back/${imageKey}.webp`
    ],
}))

const womenShirtFrontImages = import.meta.glob(
  "./assets/designer/women-shirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const womenShirtBackImages = import.meta.glob(
  "./assets/designer/women-shirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const FRAUEN_SHIRT_COLORS = [
  ["219", "BRIGHT SKY", "#b6c1db", "bright_sky"],
  ["228", "DARK BLUE", "#0d1223", "dark_blue"],
  ["312", "BLACK", "#29282d", "black"],
  ["102", "WHITE", "#ffffff", "white"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    womenShirtFrontImages[
      `./assets/designer/women-shirt/front/${imageKey}.webp`
    ],
  backImage:
    womenShirtBackImages[`./assets/designer/women-shirt/back/${imageKey}.webp`],
}))

const menShirtFrontImages = import.meta.glob(
  "./assets/designer/men-shirt/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const menShirtBackImages = import.meta.glob(
  "./assets/designer/men-shirt/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const MAENNER_SHIRT_COLORS = [
  ["102", "WHITE", "#ffffff", "white"],
  ["219", "BRIGHT SKY", "#b6c1db", "bright_sky"],
  ["228", "DARK BLUE", "#0d1223", "dark_blue"],
  ["312", "BLACK", "#29282d", "black"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    menShirtFrontImages[`./assets/designer/men-shirt/front/${imageKey}.webp`],
  backImage:
    menShirtBackImages[`./assets/designer/men-shirt/back/${imageKey}.webp`],
}))

const FRAUEN_HOODIE_SIZES: Record<string, string[]> = {
  "00": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "36": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  OL: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  AZ: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "54": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  HN: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  FN: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  CA: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  HY: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  NW: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "9D": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
}
const MAENNER_HOODIE_SIZES: Record<string, string[]> = Object.fromEntries(
  MAENNER_HOODIE_COLORS.map(({ id }) => [
    id,
    ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  ]),
)
const UNISEX_HOODIE_SIZES: Record<string, string[]> = Object.fromEntries(
  UNISEX_HOODIE_COLORS.map(({ id }) => [
    id,
    ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  ]),
)
const KINDER_HOODIE_SIZES: Record<string, string[]> = Object.fromEntries(
  KINDER_HOODIE_COLORS.map(({ id }) => [
    id,
    ["04A", "06A", "08A", "10A", "12A", "14A"],
  ]),
)
const KINDER_TSHIRT_SIZES: Record<string, string[]> = Object.fromEntries(
  KINDER_TSHIRT_COLORS.map(({ id }) => [
    id,
    ["02A", "04A", "06A", "08A", "10A", "12A"],
  ]),
)
const FRAUEN_TSHIRT_SIZES: Record<string, string[]> = {
  "101": ["S", "M", "L", "XL", "XXL"],
  "102": ["S", "M", "L", "XL", "XXL", "3XL"],
  "140": ["S", "M", "L", "XL", "XXL"],
  "145": ["S", "M", "L", "XL", "XXL", "3XL"],
  "146": ["S", "M", "L", "XL", "XXL"],
  "241": ["S", "M", "L", "XL", "XXL", "3XL"],
  "244": ["S", "M", "L", "XL", "XXL"],
  "264": ["S", "M", "L", "XL", "XXL", "3XL"],
  "268": ["S", "M", "L", "XL", "XXL"],
  "272": ["S", "M", "L", "XL", "XXL"],
  "280": ["S", "M", "L", "XL", "XXL"],
  "300": ["S", "M", "L", "XL", "XXL", "3XL"],
  "301": ["S", "M", "L", "XL", "XXL"],
  "309": ["S", "M", "L", "XL", "XXL", "3XL"],
  "319": ["S", "M", "L", "XL", "XXL", "3XL"],
  "321": ["S", "M", "L", "XL", "XXL"],
  "350": ["S", "M", "L", "XL", "XXL", "3XL"],
  "381": ["S", "M", "L", "XL", "XXL"],
}
const MAENNER_TSHIRT_SIZES: Record<string, string[]> = Object.fromEntries(
  MAENNER_TSHIRT_COLORS.map(({ id }) => [
    id,
    ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  ]),
)
const UNISEX_TSHIRT_SIZES: Record<string, string[]> = Object.fromEntries(
  UNISEX_TSHIRT_COLORS.map(({ id }) => [
    id,
    ["XXS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  ]),
)

const FRAUEN_POLO_SIZES: Record<string, string[]> = {
  "102": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "312": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "319": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "104": ["XS", "S", "M", "L", "XL", "XXL"],
  "119": ["XS", "S", "M", "L", "XL", "XXL"],
  "123": ["XS", "S", "M", "L", "XL", "XXL"],
  "127": ["XS", "S", "M", "L", "XL", "XXL"],
  "145": ["XS", "S", "M", "L", "XL", "XXL"],
  "200": ["XS", "S", "M", "L", "XL", "XXL"],
  "241": ["XS", "S", "M", "L", "XL", "XXL"],
  "244": ["XS", "S", "M", "L", "XL", "XXL"],
  "264": ["XS", "S", "M", "L", "XL", "XXL"],
  "272": ["XS", "S", "M", "L", "XL", "XXL"],
  "301": ["XS", "S", "M", "L", "XL", "XXL"],
  "321": ["XS", "S", "M", "L", "XL", "XXL"],
  "342": ["XS", "S", "M", "L", "XL", "XXL"],
  "360": ["XS", "S", "M", "L", "XL", "XXL"],
  "381": ["XS", "S", "M", "L", "XL", "XXL"],
  "400": ["XS", "S", "M", "L", "XL", "XXL"],
  "701": ["XS", "S", "M", "L", "XL", "XXL"],
}
const MAENNER_POLO_SIZES: Record<string, string[]> = Object.fromEntries(
  MAENNER_POLO_COLORS.map(({ id }) => [
    id,
    ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  ]),
)
const UNISEX_POLO_SIZES: Record<string, string[]> = Object.fromEntries(
  UNISEX_POLO_COLORS.map(({ id }) => [
    id,
    ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  ]),
)
const KINDER_POLO_SIZES: Record<string, string[]> = Object.fromEntries(
  KINDER_POLO_COLORS.map(({ id }) => [id, ["04A", "06A", "08A", "10A", "12A"]]),
)
const KINDER_SWEATSHIRT_SIZES: Record<string, string[]> = Object.fromEntries(
  KINDER_SWEATSHIRT_COLORS.map(({ id }) => [
    id,
    ["04A", "06A", "08A", "10A", "12A", "14A"],
  ]),
)
const MAENNER_SHIRT_SIZES: Record<string, string[]> = Object.fromEntries(
  MAENNER_SHIRT_COLORS.map(({ id }) => [
    id,
    ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  ]),
)

const COLUMBIA_SWEATSHIRT_SIZES: Record<string, string[]> = {
  "102": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  "241": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  "264": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  "312": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  "319": ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
  "143": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "146": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "161": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "205": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "251": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "260": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "269": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "272": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "295": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "323": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "348": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "360": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "400": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "701": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
}
const FRAUEN_SHIRT_SIZES: Record<string, string[]> = {
  "219": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "228": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "312": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  "102": ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
}

const kidsCapFrontImages = import.meta.glob(
  "./assets/designer/kids-cap/front/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const kidsCapBackImages = import.meta.glob(
  "./assets/designer/kids-cap/back/*.webp",
  { eager: true, import: "default" },
) as Record<string, string>
const KINDER_CAP_COLORS = [
  ["AQ", "AQUA", "#84c2ea", "aqua"],
  ["BL", "BLACK", "#000000", "black"],
  ["BU", "BURGUNDY", "#69292d", "burgundy"],
  ["DGR", "DARK GREEN", "#005b57", "dark_green"],
  ["DGRE", "DARK GREY", "#535353", "dark_grey"],
  ["DKH", "DARK KHAKI", "#746c4b", "dark_khaki"],
  ["GOYE", "GOLD YELLOW", "#fdba13", "gold_yellow"],
  ["GR", "GREEN", "#345d35", "green"],
  ["LGRE", "LIGHT GREY", "#c2c4c6", "light_grey"],
  ["LIM", "LIME GREEN", "#99c279", "lime_green"],
  ["NY", "NAVY", "#092e56", "navy"],
  ["OR", "ORANGE", "#f57f20", "orange"],
  ["PI", "PINK", "#f07fb2", "pink"],
  ["RY", "ROYAL", "#005393", "royal"],
  ["SRD", "SIGNAL RED", "#cd203c", "signal_red"],
  ["TU", "TURQUOISE", "#42beda", "turquoise"],
  ["WH", "WHITE", "#ffffff", "white"],
  ["YE", "YELLOW", "#f5dc54", "yellow"],
].map(([id, label, swatch, imageKey]) => ({
  id,
  label,
  swatch,
  image:
    kidsCapFrontImages[`./assets/designer/kids-cap/front/${imageKey}.webp`],
  backImage:
    kidsCapBackImages[`./assets/designer/kids-cap/back/${imageKey}.webp`],
}))

const FRAUEN_CAP_COLORS = [
  {
    id: "908",
    label: "RED / WHITE",
    swatch: "#b02530",
    image: womenCapRedWhite,
    backImage: womenCapRedWhiteBack,
  },
  {
    id: "145",
    label: "RED",
    swatch: "#c51f35",
    image: womenCapRed,
    backImage: womenCapRedBack,
  },
  {
    id: "272",
    label: "KELLY GREEN",
    swatch: "#258947",
    image: womenCapKellyGreen,
    backImage: womenCapKellyGreenBack,
  },
  {
    id: "264",
    label: "BOTTLE GREEN",
    swatch: "#304e3d",
    image: womenCapBottleGreen,
    backImage: womenCapBottleGreenBack,
  },
  {
    id: "912",
    label: "FRENCH NAVY / WHITE",
    swatch: "#233357",
    image: womenCapFrenchNavyWhite,
    backImage: womenCapFrenchNavyWhiteBack,
  },
  {
    id: "241",
    label: "ROYAL BLUE",
    swatch: "#003682",
    image: womenCapRoyalBlue,
    backImage: womenCapRoyalBlueBack,
  },
  {
    id: "319",
    label: "FRENCH NAVY",
    swatch: "#252b40",
    image: womenCapFrenchNavy,
    backImage: womenCapFrenchNavyBack,
  },
  {
    id: "312",
    label: "BLACK",
    swatch: "#181818",
    image: womenCapBlack,
    backImage: womenCapBlackBack,
  },
  {
    id: "102",
    label: "WHITE",
    swatch: "#f6f6f4",
    image: womenCapWhite,
    backImage: womenCapWhiteBack,
  },
] as const

type DesignerStoredImage = { id: string; blob: Blob }

const DESIGNER_IMAGE_DB = "pottlerkinder-designer-images"
const DESIGNER_IMAGE_STORE = "images"

const openDesignerImageDb = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DESIGNER_IMAGE_DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(DESIGNER_IMAGE_STORE, { keyPath: "id" })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

const saveDesignerImage = async (blob: Blob) => {
  const db = await openDesignerImageDb()
  const id = window.crypto.randomUUID()
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(DESIGNER_IMAGE_STORE, "readwrite").objectStore(DESIGNER_IMAGE_STORE).put({ id, blob } satisfies DesignerStoredImage)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
  db.close()
  return id
}

const loadDesignerImages = async (ids: string[]) => {
  const db = await openDesignerImageDb()
  const images = await Promise.all(ids.map((id) => new Promise<{ id: string; url: string } | null>((resolve, reject) => {
    const request = db.transaction(DESIGNER_IMAGE_STORE, "readonly").objectStore(DESIGNER_IMAGE_STORE).get(id)
    request.onsuccess = () => {
      const image = request.result as DesignerStoredImage | undefined
      resolve(image ? { id, url: URL.createObjectURL(image.blob) } : null)
    }
    request.onerror = () => reject(request.error)
  })))
  db.close()
  return images.filter((image): image is { id: string; url: string } => Boolean(image))
}

const deleteDesignerImage = async (id: string) => {
  const db = await openDesignerImageDb()
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(DESIGNER_IMAGE_STORE, "readwrite").objectStore(DESIGNER_IMAGE_STORE).delete(id)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
  db.close()
}

const migrateLegacyDesignerImage = async (dataUrl: string) => {
  const response = await fetch(dataUrl)
  return saveDesignerImage(await response.blob())
}

// Fixed print-zone positions shared by every colour of a product model.
const PRINT_ZONE_POSITIONS: Record<
  string,
  { x: number; y: number; width?: number; height?: number }
> = {
  "mug:STANDARD:STANDARD:front": { x: 50, y: 52, width: 64, height: 24 },
  "shopper:STANDARD:STANDARD:front": { x: 49.04, y: 65.89 },
  "shopper:STANDARD:STANDARD:back": { x: 51.8, y: 66.25 },
  "hoodie:FRAUEN:STANDARD:front": { x: 49.05158201968026, y: 36.91783337280758, width: 27.61099130089125, height: 23.548914789474363 },
  "tshirt:FRAUEN:STANDARD:front": { x: 49.75, y: 32.95677258912199, width: 34, height: 29 },
  "polo:FRAUEN:STANDARD:front": { x: 61.88559228446475, y: 32.808035387001254, width: 14.75264407126829, height: 12.583137590199422 },
  "sweatshirt:FRAUEN:STANDARD:front": { x: 50.89, y: 32.645318921845146, width: 36.150197769756716, height: 30.83399221538073 },
  "shirt:FRAUEN:STANDARD:front": { x: 61.5, y: 31.41, width: 15.3, height: 13.05 },
  "headwear:FRAUEN:STANDARD:front": { x: 50, y: 39.29, width: 34.5, height: 28.5 },
  "headwear:MÄNNER:STANDARD:front": { x: 50, y: 40, width: 34.5, height: 28.5 },
  "headwear:KINDER:STANDARD:front": { x: 50, y: 40, width: 34.5, height: 28.5 },
  "headwear:UNISEX:STANDARD:front": { x: 50, y: 40, width: 34.5, height: 28.5 },
  "hoodie:MÄNNER:STANDARD:front": { x: 50.44304461970935, y: 40.0674328918514, width: 33.72, height: 28.76 },
  "tshirt:MÄNNER:STANDARD:front": { x: 50.3143502996849, y: 36.71221959096721, width: 34, height: 29 },
  "polo:MÄNNER:STANDARD:front": { x: 59.6, y: 34.21, width: 15.3, height: 13.05 },
  "sweatshirt:MÄNNER:STANDARD:front": { x: 50.3962685344715, y: 32.88338147576651, width: 35.18, height: 30.01 },
  "shirt:MÄNNER:STANDARD:front": { x: 60.35, y: 36.51, width: 15.3, height: 13.05 },
  "hoodie:KINDER:STANDARD:front": { x: 50.39999398786161, y: 44.58896303418676, width: 32.74, height: 27.92 },
  "tshirt:KINDER:STANDARD:front": { x: 50.09, y: 40.30315879152627, width: 34, height: 29 },
  "polo:KINDER:STANDARD:front": { x: 61.6, y: 30.42, width: 16.21, height: 13.83 },
  "sweatshirt:KINDER:STANDARD:front": { x: 49.73845038965669, y: 34.172926292459344, width: 33.95, height: 28.96 },
  "hoodie:FRAUEN:STANDARD:back": { x: 49.05158201968026, y: 36.91783337280758, width: 27.61099130089125, height: 23.548914789474363 },
  "tshirt:FRAUEN:STANDARD:back": { x: 49.75, y: 32.95677258912199, width: 34, height: 29 },
  "polo:FRAUEN:STANDARD:back": { x: 50.00000288337232, y: 32.36809332202457, width: 31.685740413864153, height: 27.02607270594295 },
  "sweatshirt:FRAUEN:STANDARD:back": { x: 50.89, y: 32.645318921845146, width: 36.150197769756716, height: 30.83399221538073 },
  "shirt:FRAUEN:STANDARD:back": { x: 49.05158201968026, y: 36.91783337280758, width: 27.61099130089125, height: 23.548914789474363 },
  "hoodie:MÄNNER:STANDARD:back": { x: 50.44304461970935, y: 40.0674328918514, width: 33.72, height: 28.76 },
  "tshirt:MÄNNER:STANDARD:back": { x: 50.3143502996849, y: 36.71221959096721, width: 34, height: 29 },
  "polo:MÄNNER:STANDARD:back": { x: 50.753910760581306, y: 33.71357978131175, width: 34, height: 29 },
  "sweatshirt:MÄNNER:STANDARD:back": { x: 50.3962685344715, y: 32.88338147576651, width: 35.18, height: 30.01 },
  "shirt:MÄNNER:STANDARD:back": { x: 50.55434241075426, y: 37.799558325657756, width: 34, height: 29 },
  "sweatshirt:KINDER:STANDARD:back": { x: 49.73845038965669, y: 34.172926292459344, width: 33.95, height: 28.96 },
  "polo:KINDER:STANDARD:back": { x: 50.48121756864675, y: 32.30418185708582, width: 34, height: 29 },
  "tshirt:KINDER:STANDARD:back": { x: 50.09, y: 40.30315879152627, width: 34, height: 29 },
  "hoodie:KINDER:STANDARD:back": { x: 50.39999398786161, y: 44.58896303418676, width: 32.74, height: 27.92 },
  "hoodie:UNISEX:STANDARD:front": { x: 49.23331418957621, y: 50.58899630187037, width: 27.228337588914858, height: 23.224170296427378 },
  "hoodie:UNISEX:STANDARD:back": { x: 51.28844865948206, y: 36.48017417273122, width: 32.80745498738442, height: 27.98282925394553 },
  "tshirt:UNISEX:STANDARD:front": { x: 49.78662729304617, y: 34.90193636491302, width: 34, height: 29 },
  "tshirt:UNISEX:STANDARD:back": { x: 49.78662729304617, y: 34.90193636491302, width: 34, height: 29 },
  "polo:UNISEX:STANDARD:front": { x: 61.514232406084375, y: 31.30907371759764, width: 15.254676944908462, height: 13.011342100068982 },
  "polo:UNISEX:STANDARD:back": { x: 50.418983749360635, y: 31.4457618592659, width: 31.928963563059398, height: 27.233527744962426 },
  "sweatshirt:UNISEX:STANDARD:front": { x: 49.879691098734526, y: 33.27789726902822, width: 36.78527232912706, height: 31.37567345719661 },
  "sweatshirt:UNISEX:STANDARD:back": { x: 49.879691098734526, y: 33.27789726902822, width: 36.78527232912706, height: 31.37567345719661 },
}

function TwoToneMugMockup({
  color,
  label,
  showGuides = true,
}: {
  color: string
  label: string
  showGuides?: boolean
}) {
  return (
    <svg
      className="designer-mockup designer-two-tone-mug"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label={`Tasse Two Tone in ${label}`}
    >
      <defs>
        <linearGradient id="two-tone-mug-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d7d8dc" />
          <stop offset="0.12" stopColor="#f9f9fa" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="0.88" stopColor="#f4f4f5" />
          <stop offset="1" stopColor="#d4d5d9" />
        </linearGradient>
        <linearGradient id="two-tone-mug-edge" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#fdfdfd" />
          <stop offset="1" stopColor="#dedfe2" />
        </linearGradient>
        <filter id="two-tone-mug-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#64666c" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect width="1000" height="1000" fill="#f5f6f8" />
      <g filter="url(#two-tone-mug-shadow)">
        <path
          d="M184 438C91 401 58 450 58 510s33 109 126 72"
          fill="none"
          stroke={color}
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M816 438c93-37 126 12 126 72s-33 109-126 72"
          fill="none"
          stroke={color}
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M184 438C91 401 58 450 58 510s33 109 126 72M816 438c93-37 126 12 126 72s-33 109-126 72"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.28"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="180" y="360" width="640" height="320" rx="5" fill="url(#two-tone-mug-body)" stroke="#c7c8cc" strokeWidth="2" />
        <path d="M180 360h640v17H180z" fill="url(#two-tone-mug-edge)" opacity="0.9" />
        <path d="M181 668h638v10H181z" fill="#dfe0e3" opacity="0.48" />
        <path d="M185 370h630" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2" />
        <path d="M180 678h640" stroke="#b9bbc0" strokeOpacity="0.8" strokeWidth="2" />
        <path d="M180 362v314M820 362v314" stroke="#aeb0b5" strokeOpacity="0.6" strokeWidth="2" />
      </g>
      {showGuides && (
        <g>
          <path d="M180 360h640" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <path d="M393.33 340v356M606.67 340v356" fill="none" stroke="#ed1d25" strokeWidth="4" strokeDasharray="12 10" />
        </g>
      )}
      {showGuides && <g transform="translate(0 112)">
        <g transform="translate(250 0)">
          <path d="M-73 0A73 73 0 0 0 0 73" fill="none" stroke="#ed1d25" strokeWidth="6" strokeLinecap="round" />
          <circle cx="0" cy="0" r="68" fill="#c8c9cd" />
          <circle cx="0" cy="0" r="60" fill={color} />
          <circle cx="0" cy="0" r="57" fill="none" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="3" />
          <path d="M-68 0h-28" stroke="#b8b9bd" strokeWidth="15" strokeLinecap="round" />
        </g>
        <g transform="translate(500 0)">
          <path d="M-52 52A73 73 0 0 0 52 52" fill="none" stroke="#ed1d25" strokeWidth="6" strokeLinecap="round" />
          <circle cx="0" cy="0" r="68" fill="#c8c9cd" />
          <circle cx="0" cy="0" r="60" fill={color} />
          <circle cx="0" cy="0" r="57" fill="none" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="3" />
          <path d="M0-68v-28" stroke="#b8b9bd" strokeWidth="15" strokeLinecap="round" />
        </g>
        <g transform="translate(750 0)">
          <path d="M0 73A73 73 0 0 0 73 0" fill="none" stroke="#ed1d25" strokeWidth="6" strokeLinecap="round" />
          <circle cx="0" cy="0" r="68" fill="#c8c9cd" />
          <circle cx="0" cy="0" r="60" fill={color} />
          <circle cx="0" cy="0" r="57" fill="none" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="3" />
          <path d="M68 0h28" stroke="#b8b9bd" strokeWidth="15" strokeLinecap="round" />
        </g>
      </g>}
    </svg>
  )
}

function DesignerStudio() {
  const id = new URLSearchParams(window.location.search).get("product")
  const initialProduct =
    DESIGNER_PRODUCTS.find((item) => item.id === id) || DESIGNER_PRODUCTS[0]
  const [productId, setProductId] = useState(initialProduct.id)
  const product =
    DESIGNER_PRODUCTS.find((item) => item.id === productId) ||
    DESIGNER_PRODUCTS[0]
  const [panel, setPanel] = useState<"design" | "text">("design")
  const [object, setObject] = useState<"image" | "text">("image")
  const [uploadedImage, setUploadedImage] = useState("")
  const [imageLibrary, setImageLibrary] = useState<string[]>([])
  const [imageLibraryIds, setImageLibraryIds] = useState<string[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [uploadedImage2, setUploadedImage2] = useState("")
  const [text, setText] = useState("")
  const [text2, setText2] = useState("")
  const [isTextInputFocused, setIsTextInputFocused] = useState(false)
  const [text2Color, setText2Color] = useState("#ffffff")
  const [text2Font, setText2Font] = useState("Oswald")
  const [text2Scale, setText2Scale] = useState(1)
  const [text2Rotation, setText2Rotation] = useState(0)
  const [text2X, setText2X] = useState(0)
  const [text2Y, setText2Y] = useState(0)
  const [activeSlot, setActiveSlot] = useState<"text1" | "text2">("text1")
  const [textColor, setTextColor] = useState("#ffffff")
  const [font, setFont] = useState("Oswald")
  const [fontPickerOpen, setFontPickerOpen] = useState(false)
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false)
  const [objectScale, setObjectScale] = useState(1)
  const [objectRotation, setObjectRotation] = useState(0)
  const [objectX, setObjectX] = useState(0)
  const [objectY, setObjectY] = useState(0)
  const [textScale, setTextScale] = useState(1)
  const [textRotation, setTextRotation] = useState(0)
  const [textX, setTextX] = useState(0)
  const [textY, setTextY] = useState(0)
  const [canvasScale, setCanvasScale] = useState(1.4)
  const [canvasX, setCanvasX] = useState(0)
  const [canvasY, setCanvasY] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [size, setSize] = useState("M")
  const [gender, setGender] = useState(
    ["mug", "shopper"].includes(initialProduct.id) ? "" : "FRAUEN",
  )
  const [productPickerOpen, setProductPickerOpen] = useState(false)
  const [modelPickerOpen, setModelPickerOpen] = useState(false)
  const [model, setModel] = useState("STANDARD")
  const [hoodieColor, setHoodieColor] =
    useState<typeof FRAUEN_HOODIE_COLORS[number]["id"]>("9D")
  const [menHoodieColor, setMenHoodieColor] = useState("9D")
  const [unisexHoodieColor, setUnisexHoodieColor] = useState("312")
  const [kidsHoodieColor, setKidsHoodieColor] = useState("312")
  const [tshirtColor, setTshirtColor] = useState("146")
  const [menTshirtColor, setMenTshirtColor] = useState("146")
  const [unisexTshirtColor, setUnisexTshirtColor] = useState("312")
  const [kidsTshirtColor, setKidsTshirtColor] = useState("309")
  const [poloColor, setPoloColor] = useState("102")
  const [menPoloColor, setMenPoloColor] = useState("400")
  const [unisexPoloColor, setUnisexPoloColor] = useState("312")
  const [kidsPoloColor, setKidsPoloColor] = useState("318")
  const [kidsSweatshirtColor, setKidsSweatshirtColor] = useState("312")
  const [sweatshirtColor, setSweatshirtColor] = useState("269")
  const [shirtColor, setShirtColor] = useState("228")
  const [menShirtColor, setMenShirtColor] = useState("228")
  const [capColor, setCapColor] = useState("312")
  const [kidsCapColor, setKidsCapColor] = useState("LIM")
  const [shopperColor, setShopperColor] = useState("268")
  const [mugColor, setMugColor] = useState("gelb")
  const [printSide, setPrintSide] = useState<"front" | "back">("front")
  const [reviewOpen, setReviewOpen] = useState(false)
  const [productInfoOpen, setProductInfoOpen] = useState(false)
  const [productInfoTab, setProductInfoTab] = useState<"details" | "size">(
    "details",
  )
  const [helpStep, setHelpStep] = useState<number | null>(null)
  const [forbiddenThemesOpen, setForbiddenThemesOpen] = useState(false)
  const [copyrightUploadOpen, setCopyrightUploadOpen] = useState(false)
  const [copyrightAccepted, setCopyrightAccepted] = useState(false)
  const [copyrightUploadConfirmed, setCopyrightUploadConfirmed] = useState(
    () => window.localStorage.getItem("pottlerkinder-copyright-upload-confirmed") === "true",
  )
  const [uploadError, setUploadError] = useState("")
  const [draftReady, setDraftReady] = useState(false)
  const [historyVersion, setHistoryVersion] = useState(0)
  const [isObjectHandleDragging, setIsObjectHandleDragging] = useState(false)
  const [reviewPositionScale, setReviewPositionScale] = useState({ front: 390 / 540, back: 390 / 540 })
  const drag = useRef<{
    kind: "canvas" | "image" | "text" | "move" | "resize" | "rotate"
    x: number
    y: number
    scale?: number
    rotation?: number
    angle?: number
    centerX?: number
    centerY?: number
    textSlot?: "text1" | "text2"
    target?: "image" | "text"
  } | null>(null)
  const productPickerRef = useRef<HTMLElement | null>(null)
  const modelPickerRef = useRef<HTMLElement | null>(null)
  const fontPickerRef = useRef<HTMLDivElement | null>(null)
  const colorPaletteRef = useRef<HTMLDivElement | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const emptySideDesign = () => ({
    uploadedImage: "",
    text: "",
    textColor: "#ffffff",
    font: "Oswald",
    text2: "",
    text2Color: "#ffffff",
    text2Font: "Oswald",
    objectScale: 1,
    objectRotation: 0,
    objectX: 0,
    objectY: 0,
    textScale: 1,
    textRotation: 0,
    textX: 0,
    textY: 0,
    text2Scale: 1,
    text2Rotation: 0,
    text2X: 0,
    text2Y: 0,
    brightness: 100,
    contrast: 100,
  })
  const sideDesigns =
    useRef<Record<"front" | "back", ReturnType<typeof emptySideDesign>>>({
      front: emptySideDesign(),
      back: emptySideDesign(),
    })
  const historyRef = useRef<Array<Record<string, unknown>>>([])
  const historyIndexRef = useRef(-1)
  const restoringHistoryRef = useRef(false)
  const draftHistoryTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const draftSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedDraftRef = useRef("")
  const createDraft = () => ({
    productId,
    panel,
    object,
    uploadedImageId: imageLibraryIds[activeImageIndex] || "",
    imageLibraryIds,
    activeImageIndex,
    text,
    text2,
    text2Color,
    text2Font,
    text2Scale,
    text2Rotation,
    text2X,
    text2Y,
    activeSlot,
    textColor,
    font,
    objectScale,
    objectRotation,
    objectX,
    objectY,
    textScale,
    textRotation,
    textX,
    textY,
    canvasScale,
    canvasX,
    canvasY,
    brightness,
    contrast,
    size,
    gender,
    model,
    printSide,
    colors: {
      hoodieColor,
      menHoodieColor,
      unisexHoodieColor,
      kidsHoodieColor,
      tshirtColor,
      menTshirtColor,
      unisexTshirtColor,
      kidsTshirtColor,
      poloColor,
      menPoloColor,
      unisexPoloColor,
      kidsPoloColor,
      kidsSweatshirtColor,
      sweatshirtColor,
      shirtColor,
      menShirtColor,
      capColor,
      kidsCapColor,
      shopperColor,
      mugColor,
    },
    sideDesigns: Object.fromEntries(
      Object.entries(sideDesigns.current).map(([side, design]) => [side, {
        ...design,
        imageId: imageLibraryIds[imageLibrary.indexOf(design.uploadedImage)] || "",
        uploadedImage: "",
      }]),
    ),
  })
  const restoreDraft = (draft: Record<string, any>, loadedImages = imageLibrary, loadedIds = imageLibraryIds) => {
    const colors = draft.colors || {}
    setProductId(draft.productId || initialProduct.id)
    setPanel(draft.panel === "text" ? "text" : "design")
    setObject(draft.object === "text" ? "text" : "image")
    const restoredIds = Array.isArray(draft.imageLibraryIds) ? draft.imageLibraryIds : []
    const restoredLibrary = loadedImages.filter((_, index) => restoredIds.includes(loadedIds[index]))
    const restoredLibraryIds = loadedIds.filter((id) => restoredIds.includes(id))
    setImageLibrary(restoredLibrary)
    setImageLibraryIds(restoredLibraryIds)
    const restoredImageIndex = Math.max(0, Math.min(restoredLibraryIds.indexOf(draft.uploadedImageId), restoredLibrary.length - 1))
    setActiveImageIndex(restoredImageIndex)
    setUploadedImage(restoredLibrary[restoredImageIndex] || "")
    setText(draft.text || "")
    setText2(draft.text2 || "")
    setText2Color(draft.text2Color || "#ffffff")
    setText2Font(draft.text2Font || "Oswald")
    setText2Scale(Number(draft.text2Scale) || 1)
    setText2Rotation(Number(draft.text2Rotation) || 0)
    setText2X(Number(draft.text2X ?? 0))
    setText2Y(Number(draft.text2Y ?? 0))
    setActiveSlot(draft.activeSlot === "text2" ? "text2" : "text1")
    setTextColor(draft.textColor || "#ffffff")
    setFont(draft.font || "Oswald")
    setObjectScale(Number(draft.objectScale) || 1)
    setObjectRotation(Number(draft.objectRotation) || 0)
    setObjectX(Number(draft.objectX) || 0)
    setObjectY(Number(draft.objectY) || 0)
    setTextScale(Number(draft.textScale) || 1)
    setTextRotation(Number(draft.textRotation) || 0)
    setTextX(Number(draft.textX) || 0)
    setTextY(Number(draft.textY) || 0)
    setCanvasScale(Number(draft.canvasScale) || 1.4)
    setCanvasX(Number(draft.canvasX) || 0)
    setCanvasY(Number(draft.canvasY) || 0)
    setBrightness(Number(draft.brightness) || 100)
    setContrast(Number(draft.contrast) || 100)
    setSize(draft.size || "M")
    setGender(
      ["mug", "shopper"].includes(draft.productId)
        ? ""
        : draft.gender || "FRAUEN",
    )
    setModel(draft.model || "STANDARD")
    setPrintSide(draft.printSide === "back" ? "back" : "front")
    setHoodieColor(colors.hoodieColor || "9D")
    setMenHoodieColor(colors.menHoodieColor || "9D")
    setUnisexHoodieColor(colors.unisexHoodieColor || "312")
    setKidsHoodieColor(colors.kidsHoodieColor || "312")
    setTshirtColor(colors.tshirtColor || "146")
    setMenTshirtColor(colors.menTshirtColor || "146")
    setUnisexTshirtColor(colors.unisexTshirtColor || "312")
    setKidsTshirtColor(colors.kidsTshirtColor || "309")
    setPoloColor(colors.poloColor || "102")
    setMenPoloColor(colors.menPoloColor || "400")
    setUnisexPoloColor(colors.unisexPoloColor || "312")
    setKidsPoloColor(colors.kidsPoloColor || "318")
    setKidsSweatshirtColor(colors.kidsSweatshirtColor || "312")
    setSweatshirtColor(colors.sweatshirtColor || "269")
    setShirtColor(colors.shirtColor || "228")
    setMenShirtColor(colors.menShirtColor || "228")
    setCapColor(colors.capColor || "312")
    setKidsCapColor(colors.kidsCapColor || "LIM")
    setShopperColor(colors.shopperColor || "268")
    setMugColor(colors.mugColor || "gelb")
    const getSide = (side: "front" | "back") => {
      const design = { ...emptySideDesign(), ...(draft.sideDesigns?.[side] || {}) }
      return { ...design, uploadedImage: restoredLibrary[restoredLibraryIds.indexOf(design.imageId)] || "" }
    }
    sideDesigns.current = { front: getSide("front"), back: getSide("back") }
  }
  const draftKey = "pottlerkinder-designer-draft-v1"
  useEffect(() => {
    let active = true
    const initialiseDraft = async () => {
      try {
        const saved = window.localStorage.getItem(draftKey)
        if (saved) {
          const draft = JSON.parse(saved) as Record<string, any>
          let imageIds = Array.isArray(draft.imageLibraryIds) ? draft.imageLibraryIds : []
          if (!imageIds.length && Array.isArray(draft.imageLibrary)) {
            imageIds = await Promise.all(draft.imageLibrary.filter((image: unknown) => typeof image === "string" && image.startsWith("data:image/")).map(migrateLegacyDesignerImage))
            draft.imageLibraryIds = imageIds
            draft.uploadedImageId = imageIds[draft.activeImageIndex || 0] || ""
            draft.sideDesigns ||= {}
            for (const side of ["front", "back"] as const) {
              const legacyImage = draft.sideDesigns?.[side]?.uploadedImage
              const legacyIndex = draft.imageLibrary.indexOf(legacyImage)
              if (legacyIndex >= 0) draft.sideDesigns[side].imageId = imageIds[legacyIndex]
            }
          }
          const storedImages = await loadDesignerImages(imageIds)
          if (!active) return
          const storedIds = storedImages.map((image) => image.id)
          restoreDraft(draft, storedImages.map((image) => image.url), storedIds)
          historyRef.current = [createDraft()]
          historyIndexRef.current = 0
        } else {
          historyRef.current = [createDraft()]
          historyIndexRef.current = 0
        }
      } catch {
        historyRef.current = [createDraft()]
        historyIndexRef.current = 0
      }
      if (!active) return
      setDraftReady(true)
      setHistoryVersion((value) => value + 1)
    }
    void initialiseDraft()
    return () => { active = false }
  }, [])
  useEffect(() => {
    if (!draftReady) return
    const draft = createDraft()
    const serializedDraft = JSON.stringify(draft)
    if (restoringHistoryRef.current) {
      restoringHistoryRef.current = false
      return
    }
    if (draftHistoryTimer.current) clearTimeout(draftHistoryTimer.current)
    if (draftSaveTimer.current) clearTimeout(draftSaveTimer.current)
    draftHistoryTimer.current = setTimeout(() => {
      const current = historyRef.current[historyIndexRef.current]
      if (current && JSON.stringify(current) === serializedDraft) return
      historyRef.current = historyRef.current
        .slice(0, historyIndexRef.current + 1)
        .concat(draft)
        .slice(-10)
      historyIndexRef.current = historyRef.current.length - 1
      setHistoryVersion((value) => value + 1)
    }, 220)
    draftSaveTimer.current = setTimeout(() => {
      if (lastSavedDraftRef.current === serializedDraft) return
      try {
        window.localStorage.setItem(draftKey, serializedDraft)
        lastSavedDraftRef.current = serializedDraft
      } catch {
        // The editor remains usable if private browsing or storage limits block saving.
      }
    }, 800)
    return () => {
      if (draftHistoryTimer.current) clearTimeout(draftHistoryTimer.current)
      if (draftSaveTimer.current) clearTimeout(draftSaveTimer.current)
    }
  }, [
    draftReady,
    productId,
    panel,
    object,
    uploadedImage,
    imageLibraryIds,
    activeImageIndex,
    text,
    text2,
    text2Color,
    text2Font,
    text2Scale,
    text2Rotation,
    text2X,
    text2Y,
    activeSlot,
    textColor,
    font,
    objectScale,
    objectRotation,
    objectX,
    objectY,
    textScale,
    textRotation,
    textX,
    textY,
    canvasScale,
    canvasX,
    canvasY,
    brightness,
    contrast,
    size,
    gender,
    model,
    printSide,
    hoodieColor,
    menHoodieColor,
    unisexHoodieColor,
    kidsHoodieColor,
    tshirtColor,
    menTshirtColor,
    unisexTshirtColor,
    kidsTshirtColor,
    poloColor,
    menPoloColor,
    unisexPoloColor,
    kidsPoloColor,
    kidsSweatshirtColor,
    sweatshirtColor,
    shirtColor,
    menShirtColor,
    capColor,
    kidsCapColor,
    shopperColor,
    mugColor,
  ])
  const undo = () => {
    if (historyIndexRef.current <= 0) return
    historyIndexRef.current -= 1
    restoringHistoryRef.current = true
    restoreDraft(
      historyRef.current[historyIndexRef.current] as Record<string, any>,
    )
    setHistoryVersion((value) => value + 1)
  }
  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return
    historyIndexRef.current += 1
    restoringHistoryRef.current = true
    restoreDraft(
      historyRef.current[historyIndexRef.current] as Record<string, any>,
    )
    setHistoryVersion((value) => value + 1)
  }
  const isFrauenHoodie = gender === "FRAUEN" && product.id === "hoodie"
  const isMug = product.id === "mug"
  const isShopper = product.id === "shopper"
  const isMaennerHoodie = gender === "MÄNNER" && product.id === "hoodie"
  const isUnisexHoodie = gender === "UNISEX" && product.id === "hoodie"
  const isKinderHoodie = gender === "KINDER" && product.id === "hoodie"
  const isFrauenTshirt = gender === "FRAUEN" && product.id === "tshirt"
  const isMaennerTshirt = gender === "MÄNNER" && product.id === "tshirt"
  const isUnisexTshirt = gender === "UNISEX" && product.id === "tshirt"
  const isKinderTshirt = gender === "KINDER" && product.id === "tshirt"
  const isFrauenPolo = gender === "FRAUEN" && product.id === "polo"
  const isMaennerPolo = gender === "MÄNNER" && product.id === "polo"
  const isUnisexPolo = gender === "UNISEX" && product.id === "polo"
  const isKinderPolo = gender === "KINDER" && product.id === "polo"
  const isKinderSweatshirt = gender === "KINDER" && product.id === "sweatshirt"
  const isFrauenShirt = gender === "FRAUEN" && product.id === "shirt"
  const isMaennerShirt = gender === "MÄNNER" && product.id === "shirt"
  const isKinderCap = gender === "KINDER" && product.id === "headwear"
  const isFrauenCap =
    product.id === "headwear" && ["FRAUEN", "MÄNNER", "UNISEX"].includes(gender)
  const isAnyCap = isFrauenCap || isKinderCap
  const printZoneKey = [product.id, gender || "STANDARD", model, printSide].join(":")
  const defaultPrintZone = {
    x: 50,
    y: isShopper ? 50 : isMug ? 49 : isAnyCap ? 40 : 43,
    width: isMug ? 51 : isShopper ? 34 : isAnyCap ? 23 : 34,
    height: isMug ? 23 : isShopper ? 34 : isAnyCap ? 19 : 29,
  }
  const currentPrintZone = {
    ...defaultPrintZone,
    ...PRINT_ZONE_POSITIONS[printZoneKey],
  }
  const isOneSizeProduct = isAnyCap || ["mug", "shopper"].includes(product.id)
  const isColumbiaSweatshirt =
    product.id === "sweatshirt" &&
    ["FRAUEN", "MÄNNER", "UNISEX"].includes(gender)
  const availableDesignerProducts = DESIGNER_PRODUCTS.filter(
    (item) =>
      !["mug", "shopper"].includes(item.id) &&
      (!["UNISEX", "KINDER"].includes(gender) || item.id !== "shirt"),
  )
  const productPickerProducts = ["mug", "shopper"].includes(product.id)
    ? OTHER_DESIGNER_PRODUCTS.filter((item) => item.id === product.id)
    : availableDesignerProducts
  const isConfiguredTextile =
    isFrauenHoodie ||
    isMaennerHoodie ||
    isUnisexHoodie ||
    isKinderHoodie ||
    isFrauenTshirt ||
    isMaennerTshirt ||
    isUnisexTshirt ||
    isKinderTshirt ||
    isFrauenPolo ||
    isMaennerPolo ||
    isUnisexPolo ||
    isKinderPolo ||
    isKinderSweatshirt ||
    isFrauenShirt ||
    isMaennerShirt ||
    isColumbiaSweatshirt
  const selectedHoodieColor =
    FRAUEN_HOODIE_COLORS.find((item) => item.id === hoodieColor) ||
    FRAUEN_HOODIE_COLORS[0]
  const selectedMenHoodieColor =
    MAENNER_HOODIE_COLORS.find((item) => item.id === menHoodieColor) ||
    MAENNER_HOODIE_COLORS[0]
  const selectedUnisexHoodieColor =
    UNISEX_HOODIE_COLORS.find((item) => item.id === unisexHoodieColor) ||
    UNISEX_HOODIE_COLORS[0]
  const selectedKidsHoodieColor =
    KINDER_HOODIE_COLORS.find((item) => item.id === kidsHoodieColor) ||
    KINDER_HOODIE_COLORS[0]
  const selectedTshirtColor =
    FRAUEN_TSHIRT_COLORS.find((item) => item.id === tshirtColor) ||
    FRAUEN_TSHIRT_COLORS[0]
  const selectedMenTshirtColor =
    MAENNER_TSHIRT_COLORS.find((item) => item.id === menTshirtColor) ||
    MAENNER_TSHIRT_COLORS[0]
  const selectedUnisexTshirtColor =
    UNISEX_TSHIRT_COLORS.find((item) => item.id === unisexTshirtColor) ||
    UNISEX_TSHIRT_COLORS[0]
  const selectedKidsTshirtColor =
    KINDER_TSHIRT_COLORS.find((item) => item.id === kidsTshirtColor) ||
    KINDER_TSHIRT_COLORS[0]
  const selectedPoloColor =
    FRAUEN_POLO_COLORS.find((item) => item.id === poloColor) ||
    FRAUEN_POLO_COLORS[0]
  const selectedMenPoloColor =
    MAENNER_POLO_COLORS.find((item) => item.id === menPoloColor) ||
    MAENNER_POLO_COLORS[0]
  const selectedUnisexPoloColor =
    UNISEX_POLO_COLORS.find((item) => item.id === unisexPoloColor) ||
    UNISEX_POLO_COLORS[0]
  const selectedKidsPoloColor =
    KINDER_POLO_COLORS.find((item) => item.id === kidsPoloColor) ||
    KINDER_POLO_COLORS[0]
  const selectedKidsSweatshirtColor =
    KINDER_SWEATSHIRT_COLORS.find((item) => item.id === kidsSweatshirtColor) ||
    KINDER_SWEATSHIRT_COLORS[0]
  const selectedShirtColor =
    FRAUEN_SHIRT_COLORS.find((item) => item.id === shirtColor) ||
    FRAUEN_SHIRT_COLORS[0]
  const selectedMenShirtColor =
    MAENNER_SHIRT_COLORS.find((item) => item.id === menShirtColor) ||
    MAENNER_SHIRT_COLORS[0]
  const selectedSweatshirtColor =
    COLUMBIA_SWEATSHIRT_COLORS.find((item) => item.id === sweatshirtColor) ||
    COLUMBIA_SWEATSHIRT_COLORS[0]
  const selectedCapColor =
    FRAUEN_CAP_COLORS.find((item) => item.id === capColor) ||
    FRAUEN_CAP_COLORS[0]
  const selectedKidsCapColor =
    KINDER_CAP_COLORS.find((item) => item.id === kidsCapColor) ||
    KINDER_CAP_COLORS[0]
  const selectedShopperColor =
    SHOPPER_COLORS.find((item) => item.id === shopperColor) || SHOPPER_COLORS[0]
  const selectedMugColor =
    MUG_COLORS.find((item) => item.id === mugColor) || MUG_COLORS[0]
  const configuredColors = isMug
    ? MUG_COLORS
    : isShopper
    ? SHOPPER_COLORS
    : isFrauenHoodie
      ? FRAUEN_HOODIE_COLORS
      : isMaennerHoodie
        ? MAENNER_HOODIE_COLORS
        : isUnisexHoodie
          ? UNISEX_HOODIE_COLORS
          : isKinderHoodie
            ? KINDER_HOODIE_COLORS
            : isFrauenTshirt
              ? FRAUEN_TSHIRT_COLORS
              : isMaennerTshirt
                ? MAENNER_TSHIRT_COLORS
                : isUnisexTshirt
                  ? UNISEX_TSHIRT_COLORS
                  : isKinderTshirt
                    ? KINDER_TSHIRT_COLORS
                    : isFrauenPolo
                      ? FRAUEN_POLO_COLORS
                      : isMaennerPolo
                        ? MAENNER_POLO_COLORS
                        : isUnisexPolo
                          ? UNISEX_POLO_COLORS
                          : isKinderPolo
                            ? KINDER_POLO_COLORS
                            : isKinderSweatshirt
                              ? KINDER_SWEATSHIRT_COLORS
                              : isFrauenShirt
                                ? FRAUEN_SHIRT_COLORS
                                : isMaennerShirt
                                  ? MAENNER_SHIRT_COLORS
                                  : isKinderCap
                                    ? KINDER_CAP_COLORS
                                    : isFrauenCap
                                      ? FRAUEN_CAP_COLORS
                                      : COLUMBIA_SWEATSHIRT_COLORS
  const selectedConfiguredColor = isMug
    ? selectedMugColor
    : isShopper
    ? selectedShopperColor
    : isFrauenHoodie
      ? selectedHoodieColor
      : isMaennerHoodie
        ? selectedMenHoodieColor
        : isUnisexHoodie
          ? selectedUnisexHoodieColor
          : isKinderHoodie
            ? selectedKidsHoodieColor
            : isFrauenTshirt
              ? selectedTshirtColor
              : isMaennerTshirt
                ? selectedMenTshirtColor
                : isUnisexTshirt
                  ? selectedUnisexTshirtColor
                  : isKinderTshirt
                    ? selectedKidsTshirtColor
                    : isFrauenPolo
                      ? selectedPoloColor
                      : isMaennerPolo
                        ? selectedMenPoloColor
                        : isUnisexPolo
                          ? selectedUnisexPoloColor
                          : isKinderPolo
                            ? selectedKidsPoloColor
                            : isKinderSweatshirt
                              ? selectedKidsSweatshirtColor
                              : isFrauenShirt
                                ? selectedShirtColor
                                : isMaennerShirt
                                  ? selectedMenShirtColor
                                  : isKinderCap
                                    ? selectedKidsCapColor
                                    : isFrauenCap
                                      ? selectedCapColor
                                      : selectedSweatshirtColor
  const productName = isFrauenHoodie
    ? "Frauen Hoodie"
    : isMaennerHoodie
      ? "Männer Hoodie"
      : isUnisexHoodie
        ? "Unisex Hoodie"
        : isKinderHoodie
          ? "Kinder Hoodie"
          : isFrauenTshirt
            ? "Frauen T-Shirt"
            : isMaennerTshirt
              ? "Männer T-Shirt"
              : isUnisexTshirt
                ? "Unisex T-Shirt"
                : isKinderTshirt
                  ? "Kinder T-Shirt"
                  : isFrauenPolo
                    ? "Frauen Polo"
                    : isMaennerPolo
                      ? "Männer Polo"
                      : isUnisexPolo
                        ? "Unisex Polo"
                        : isKinderPolo
                          ? "Kinder Polo"
                          : isKinderSweatshirt
                            ? "Kinder Sweatshirt"
                            : isFrauenShirt
                              ? "Frauen Hemd"
                              : isMaennerShirt
                                ? "Männer Hemd"
                                : isKinderCap
                                  ? "Kinder Cap"
                                  : isFrauenCap
                                    ? `${
                                        gender === "FRAUEN"
                                          ? "Frauen"
                                          : gender === "MÄNNER"
                                            ? "Männer"
                                            : "Unisex"
                                      } Cap`
                                    : isColumbiaSweatshirt
                                      ? `${gender[0]}${gender.slice(1).toLowerCase()} Sweatshirt`
                                      : product.name
  const productImage = isMug
    ? selectedMugColor.image
    : isShopper
    ? selectedShopperColor.image
    : isFrauenHoodie
      ? printSide === "back"
        ? selectedHoodieColor.backImage
        : selectedHoodieColor.image
      : isMaennerHoodie
        ? printSide === "back"
          ? selectedMenHoodieColor.backImage
          : selectedMenHoodieColor.image
        : isUnisexHoodie
          ? printSide === "back"
            ? selectedUnisexHoodieColor.backImage
            : selectedUnisexHoodieColor.image
          : isKinderHoodie
            ? printSide === "back"
              ? selectedKidsHoodieColor.backImage
              : selectedKidsHoodieColor.image
            : isFrauenTshirt
              ? printSide === "back"
                ? selectedTshirtColor.backImage
                : selectedTshirtColor.image
              : isMaennerTshirt
                ? printSide === "back"
                  ? selectedMenTshirtColor.backImage
                  : selectedMenTshirtColor.image
                : isUnisexTshirt
                  ? printSide === "back"
                    ? selectedUnisexTshirtColor.backImage
                    : selectedUnisexTshirtColor.image
                  : isKinderTshirt
                    ? printSide === "back"
                      ? selectedKidsTshirtColor.backImage
                      : selectedKidsTshirtColor.image
                    : isFrauenPolo
                      ? printSide === "back"
                        ? selectedPoloColor.backImage
                        : selectedPoloColor.image
                      : isMaennerPolo
                        ? printSide === "back"
                          ? selectedMenPoloColor.backImage
                          : selectedMenPoloColor.image
                        : isUnisexPolo
                          ? printSide === "back"
                            ? selectedUnisexPoloColor.backImage
                            : selectedUnisexPoloColor.image
                          : isKinderPolo
                            ? printSide === "back"
                              ? selectedKidsPoloColor.backImage
                              : selectedKidsPoloColor.image
                            : isKinderSweatshirt
                              ? printSide === "back"
                                ? selectedKidsSweatshirtColor.backImage
                                : selectedKidsSweatshirtColor.image
                              : isFrauenShirt
                                ? printSide === "back"
                                  ? selectedShirtColor.backImage
                                  : selectedShirtColor.image
                                : isMaennerShirt
                                  ? printSide === "back"
                                    ? selectedMenShirtColor.backImage
                                    : selectedMenShirtColor.image
                                  : isKinderCap
                                    ? printSide === "back"
                                      ? selectedKidsCapColor.backImage
                                      : selectedKidsCapColor.image
                                    : isFrauenCap
                                      ? printSide === "back"
                                        ? selectedCapColor.backImage
                                        : selectedCapColor.image
                                      : isColumbiaSweatshirt
                                        ? printSide === "back"
                                          ? selectedSweatshirtColor.backImage
                                          : selectedSweatshirtColor.image
                                        : product.image
  const hasObject =
    object === "image"
      ? Boolean(uploadedImage)
      : Boolean(activeSlot === "text2" ? text2.trim() : text.trim())
  const hasBackDesign =
    printSide === "back"
      ? Boolean(uploadedImage || text.trim() || text2.trim())
      : Boolean(
          sideDesigns.current.back.uploadedImage ||
            sideDesigns.current.back.text.trim() ||
            sideDesigns.current.back.text2.trim(),
        )
  const hasFrontDesign =
    printSide === "front"
      ? Boolean(uploadedImage || text.trim() || text2.trim())
      : Boolean(
          sideDesigns.current.front.uploadedImage ||
            sideDesigns.current.front.text.trim() ||
            sideDesigns.current.front.text2.trim(),
        )
  const hasAnyDesign = Boolean(
    uploadedImage ||
      text.trim() ||
      text2.trim() ||
      sideDesigns.current.front.uploadedImage ||
      sideDesigns.current.front.text.trim() ||
      sideDesigns.current.front.text2.trim() ||
      sideDesigns.current.back.uploadedImage ||
      sideDesigns.current.back.text.trim() ||
      sideDesigns.current.back.text2.trim(),
  )
  const designPrice =
    50 +
    6.15 +
    ((isMug ? hasAnyDesign : hasFrontDesign) ? 4.99 : 0) +
    ((isConfiguredTextile || isShopper) && hasBackDesign ? 9.99 : 0)
  const designPriceLabel = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(designPrice)
  const reset = () => {
    sideDesigns.current = { front: emptySideDesign(), back: emptySideDesign() }
    setUploadedImage("")
    setText("")
    setText2("")
    setText2Color("#ffffff")
    setText2Font("Oswald")
    setObjectScale(1)
    setObjectRotation(0)
    setObjectX(0)
    setObjectY(0)
    setTextScale(1)
    setTextRotation(0)
    setTextX(0)
    setTextY(0)
    setText2Scale(1)
    setText2Rotation(0)
    setText2X(0)
    setText2Y(0)
    setActiveSlot("text1")
    setCanvasScale(1.4)
    setCanvasX(0)
    setCanvasY(0)
    setBrightness(100)
    setContrast(100)
    setPrintSide("front")
  }
  const upload = async (file?: File) => {
    if (!file) return
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setUploadError("NUR PNG ODER JPEG SIND ERLAUBT.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("DIE DATEI DARF MAXIMAL 5 MB GROSS SEIN.")
      return
    }
    if (imageLibrary.length >= 3) {
      setUploadError("MAXIMAL 3 BILDER KÖNNEN GESPEICHERT WERDEN. LÖSCHE EIN BILD, UM EINEN PLATZ FREIZUGEBEN.")
      return
    }
    // Show the image immediately. IndexedDB is only a convenience for restoring
    // a draft after refresh and must never prevent a customer from designing.
    const image = URL.createObjectURL(file)
    const temporaryId = `temporary-${window.crypto.randomUUID()}`
    setImageLibrary((items) => [...items, image])
    setImageLibraryIds((items) => [...items, temporaryId])
    setActiveImageIndex(imageLibrary.length)
    setUploadedImage(image)
    setObjectScale(1)
    setObjectRotation(0)
    setObjectX(0)
    setObjectY(0)
    setBrightness(100)
    setContrast(100)
    setObject("image")
    setPanel("design")
    setUploadError("")
    void saveDesignerImage(file)
      .then((storedId) => {
        setImageLibraryIds((items) => items.map((id) => id === temporaryId ? storedId : id))
      })
      .catch(() => {
        // Embedded/private browser sessions may not provide IndexedDB.
      })
  }
  const requestImageUpload = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (copyrightUploadConfirmed) return
    event.preventDefault()
    setCopyrightAccepted(false)
    setCopyrightUploadOpen(true)
  }
  const confirmCopyrightUpload = () => {
    window.localStorage.setItem("pottlerkinder-copyright-upload-confirmed", "true")
    setCopyrightUploadConfirmed(true)
  }
  const uploadSecond = (file?: File) => {
    if (!file || !["image/png", "image/jpeg"].includes(file.type) || file.size > 5 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => { setUploadedImage2(String(reader.result)); setActiveSlot("text1") }
    reader.readAsDataURL(file)
  }
  const stopDragging = () => {
    drag.current = null
    setIsObjectHandleDragging(false)
  }
  const onPointerDown = (
    event: React.PointerEvent,
    kind: "canvas" | "image" | "text" | "move" | "resize" | "rotate",
    textSlot: "text1" | "text2" = activeSlot === "text2" ? "text2" : "text1",
  ) => {
    if (event.button !== 0) return
    event.preventDefault()
    const layer = (event.currentTarget as HTMLElement).closest(
      ".designer-object-layer, .designer-object-handle-layer",
    )
    const rect = layer?.getBoundingClientRect()
    const target = kind === "image" ? "image" : kind === "text" ? "text" : object
    drag.current = {
      kind,
      textSlot,
      target,
      x: event.clientX,
      y: event.clientY,
      scale: target === "image" ? objectScale : textSlot === "text2" ? text2Scale : textScale,
      rotation: target === "image" ? objectRotation : textSlot === "text2" ? text2Rotation : textRotation,
      angle: rect
        ? Math.atan2(
            event.clientY - rect.top - rect.height / 2,
            event.clientX - rect.left - rect.width / 2,
          )
        : 0,
      centerX: rect ? rect.left + rect.width / 2 : event.clientX,
      centerY: rect ? rect.top + rect.height / 2 : event.clientY,
    }
    if (kind !== "canvas")
      setIsObjectHandleDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current || event.buttons === 0) {
      stopDragging()
      return
    }
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    const objectDx = dx * 0.72
    const objectDy = dy * 0.72
    if (drag.current.kind === "canvas") {
      setCanvasX((value) => value + dx)
      setCanvasY((value) => value + dy)
    } else if (
      drag.current.target === "image" &&
      (drag.current.kind === "image" || drag.current.kind === "move")
    ) {
      setObjectX((value) => value + objectDx)
      setObjectY((value) => value + objectDy)
    } else if (
      drag.current.target === "text" &&
      (drag.current.kind === "text" || drag.current.kind === "move")
    ) {
      if (drag.current.textSlot === "text2") {
        setText2X((value) => value + objectDx)
        setText2Y((value) => value + objectDy)
      } else {
        setTextX((value) => value + objectDx)
        setTextY((value) => value + objectDy)
      }
    } else if (drag.current.kind === "resize") {
      const scale = Math.min(
        2,
        Math.max(0.3, (drag.current.scale || 1) + (dx + dy) / 170),
      )
      if (drag.current.target === "image") setObjectScale(scale)
      else if (drag.current.textSlot === "text2") setText2Scale(scale)
      else setTextScale(scale)
    } else {
      const angle = Math.atan2(
        event.clientY - (drag.current.centerY || event.clientY),
        event.clientX - (drag.current.centerX || event.clientX),
      )
      const rotation =
        (drag.current.rotation || 0) +
        ((angle - (drag.current.angle || 0)) * 180) / Math.PI
      if (drag.current.target === "image") setObjectRotation(rotation)
      else if (drag.current.textSlot === "text2") setText2Rotation(rotation)
      else setTextRotation(rotation)
    }
    if (
      drag.current.kind === "canvas" ||
      drag.current.kind === "image" ||
      drag.current.kind === "text" ||
      drag.current.kind === "move"
    )
      drag.current = { ...drag.current, x: event.clientX, y: event.clientY }
  }
  const onWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    setCanvasScale((value) =>
      Math.min(2.52, Math.max(0.65, value + (event.deltaY < 0 ? 0.08 : -0.08))),
    )
  }
  useEffect(() => {
    const closePickers = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!productPickerRef.current?.contains(target))
        setProductPickerOpen(false)
      if (!modelPickerRef.current?.contains(target)) setModelPickerOpen(false)
      if (!fontPickerRef.current?.contains(target)) setFontPickerOpen(false)
      if (!colorPaletteRef.current?.contains(target)) setColorPaletteOpen(false)
    }
    document.addEventListener("pointerdown", closePickers)
    return () => document.removeEventListener("pointerdown", closePickers)
  }, [])
  const chooseProduct = (next: typeof DESIGNER_PRODUCTS[number]) => {
    setProductId(next.id)
    if (["mug", "shopper"].includes(next.id)) setGender("")
    if (next.id === "shopper") setShopperColor("268")
    if (next.id === "mug") setMugColor("gelb")
    setProductPickerOpen(false)
    setModelPickerOpen(false)
    setSize(
      ["headwear", "mug", "shopper"].includes(next.id)
        ? "ONE SIZE"
        : next.type === "textile"
          ? "M"
          : "STANDARD",
    )
    reset()
  }
  const chooseGender = (next: string) => {
    const isOtherProduct = ["mug", "shopper"].includes(product.id)
    setGender(next)
    if (
      isOtherProduct ||
      (["UNISEX", "KINDER"].includes(next) && product.id === "shirt")
    ) {
      setProductId("hoodie")
    }
    setSize(
      isOtherProduct
        ? "M"
        : product.id === "headwear"
          ? "ONE SIZE"
          : product.type === "textile"
            ? "M"
            : "STANDARD",
    )
    setProductPickerOpen(false)
    setModelPickerOpen(false)
    reset()
  }
  const choosePrintSide = (next: "front" | "back") => {
    if (
      next === printSide ||
      (next === "back" && !isConfiguredTextile && !isAnyCap && !isShopper)
    )
      return
    if (isAnyCap) {
      setPrintSide(next)
      return
    }
    sideDesigns.current[printSide] = {
      uploadedImage,
      text,
      textColor,
      font,
      text2,
      text2Color,
      text2Font,
      objectScale,
      objectRotation,
      objectX,
      objectY,
      textScale,
      textRotation,
      textX,
      textY,
      text2Scale,
      text2Rotation,
      text2X,
      text2Y,
      brightness,
      contrast,
    }
    const saved = sideDesigns.current[next]
    setUploadedImage(saved.uploadedImage)
    setText(saved.text)
    setTextColor(saved.textColor || "#ffffff")
    setFont(saved.font || "Oswald")
    setText2(saved.text2 || "")
    setText2Color(saved.text2Color || "#ffffff")
    setText2Font(saved.text2Font || "Oswald")
    setObjectScale(saved.objectScale)
    setObjectRotation(saved.objectRotation)
    setObjectX(saved.objectX)
    setObjectY(saved.objectY)
    setTextScale(saved.textScale || 1)
    setTextRotation(saved.textRotation || 0)
    setTextX(saved.textX || 0)
    setTextY(saved.textY || 0)
    setText2Scale(saved.text2Scale || 1)
    setText2Rotation(saved.text2Rotation || 0)
    setText2X(saved.text2X ?? 0)
    setText2Y(saved.text2Y ?? 0)
    setBrightness(saved.brightness)
    setContrast(saved.contrast)
    setObject(saved.uploadedImage ? "image" : saved.text || saved.text2 ? "text" : "image")
    setActiveSlot(saved.text2 ? "text2" : "text1")
    setPrintSide(next)
  }
  const configuredSizes = isOneSizeProduct
    ? ["ONE SIZE"]
    : isFrauenHoodie
      ? FRAUEN_HOODIE_SIZES[hoodieColor]
      : isMaennerHoodie
        ? MAENNER_HOODIE_SIZES[menHoodieColor]
        : isUnisexHoodie
          ? UNISEX_HOODIE_SIZES[unisexHoodieColor]
          : isKinderHoodie
            ? KINDER_HOODIE_SIZES[kidsHoodieColor]
            : isFrauenTshirt
              ? FRAUEN_TSHIRT_SIZES[tshirtColor]
              : isMaennerTshirt
                ? MAENNER_TSHIRT_SIZES[menTshirtColor]
                : isUnisexTshirt
                  ? UNISEX_TSHIRT_SIZES[unisexTshirtColor]
                  : isKinderTshirt
                    ? KINDER_TSHIRT_SIZES[kidsTshirtColor]
                    : isFrauenPolo
                      ? FRAUEN_POLO_SIZES[poloColor]
                      : isMaennerPolo
                        ? MAENNER_POLO_SIZES[menPoloColor]
                        : isUnisexPolo
                          ? UNISEX_POLO_SIZES[unisexPoloColor]
                          : isKinderPolo
                            ? KINDER_POLO_SIZES[kidsPoloColor]
                            : isKinderSweatshirt
                              ? KINDER_SWEATSHIRT_SIZES[kidsSweatshirtColor]
                              : isFrauenShirt
                                ? FRAUEN_SHIRT_SIZES[shirtColor]
                                : isMaennerShirt
                                  ? MAENNER_SHIRT_SIZES[menShirtColor]
                                  : COLUMBIA_SWEATSHIRT_SIZES[sweatshirtColor]
  const safeConfiguredSizes = Array.isArray(configuredSizes)
    ? configuredSizes
    : ["M"]
  const sizes =
    isOneSizeProduct || isConfiguredTextile
      ? safeConfiguredSizes
      : product.type === "textile"
        ? ["XS", "S", "M", "L", "XL"]
        : ["STANDARD"]
  const chooseConfiguredColor = (nextColor: string) => {
    const nextSizes = isOneSizeProduct
      ? ["ONE SIZE"]
      : isFrauenHoodie
        ? FRAUEN_HOODIE_SIZES[nextColor]
        : isMaennerHoodie
          ? MAENNER_HOODIE_SIZES[nextColor]
          : isUnisexHoodie
            ? UNISEX_HOODIE_SIZES[nextColor]
            : isKinderHoodie
              ? KINDER_HOODIE_SIZES[nextColor]
              : isFrauenTshirt
                ? FRAUEN_TSHIRT_SIZES[nextColor]
                : isMaennerTshirt
                  ? MAENNER_TSHIRT_SIZES[nextColor]
                  : isUnisexTshirt
                    ? UNISEX_TSHIRT_SIZES[nextColor]
                    : isKinderTshirt
                      ? KINDER_TSHIRT_SIZES[nextColor]
                      : isFrauenPolo
                        ? FRAUEN_POLO_SIZES[nextColor]
                        : isMaennerPolo
                          ? MAENNER_POLO_SIZES[nextColor]
                          : isUnisexPolo
                            ? UNISEX_POLO_SIZES[nextColor]
                            : isKinderPolo
                              ? KINDER_POLO_SIZES[nextColor]
                              : isKinderSweatshirt
                                ? KINDER_SWEATSHIRT_SIZES[nextColor]
                                : isFrauenShirt
                                  ? FRAUEN_SHIRT_SIZES[nextColor]
                                  : isMaennerShirt
                                    ? MAENNER_SHIRT_SIZES[nextColor]
                                    : COLUMBIA_SWEATSHIRT_SIZES[nextColor]
    if (isMug) setMugColor(nextColor)
    else if (isShopper) setShopperColor(nextColor)
    else if (isKinderCap) setKidsCapColor(nextColor)
    else if (isFrauenCap) setCapColor(nextColor)
    else if (isFrauenHoodie) setHoodieColor(nextColor as typeof hoodieColor)
    else if (isMaennerHoodie) setMenHoodieColor(nextColor)
    else if (isUnisexHoodie) setUnisexHoodieColor(nextColor)
    else if (isKinderHoodie) setKidsHoodieColor(nextColor)
    else if (isFrauenTshirt) setTshirtColor(nextColor)
    else if (isMaennerTshirt) setMenTshirtColor(nextColor)
    else if (isUnisexTshirt) setUnisexTshirtColor(nextColor)
    else if (isKinderTshirt) setKidsTshirtColor(nextColor)
    else if (isFrauenPolo) setPoloColor(nextColor)
    else if (isMaennerPolo) setMenPoloColor(nextColor)
    else if (isUnisexPolo) setUnisexPoloColor(nextColor)
    else if (isKinderPolo) setKidsPoloColor(nextColor)
    else if (isKinderSweatshirt) setKidsSweatshirtColor(nextColor)
    else if (isFrauenShirt) setShirtColor(nextColor)
    else if (isMaennerShirt) setMenShirtColor(nextColor)
    else setSweatshirtColor(nextColor)
    const validNextSizes = Array.isArray(nextSizes) ? nextSizes : ["M"]
    setSize((current) =>
      validNextSizes.includes(current) ? current : validNextSizes[0],
    )
  }
  const sizeMeasurements: Record<string, string> = isKinderSweatshirt
    ? {
        "04A": "44 / 36",
        "06A": "49 / 38",
        "08A": "54 / 41",
        "10A": "58 / 44",
        "12A": "64 / 47",
        "14A": "65 / 50",
      }
    : isKinderPolo
      ? {
          "04A": "44 / 34",
          "06A": "47 / 37",
          "08A": "50 / 40",
          "10A": "54 / 43",
          "12A": "58 / 46",
        }
      : isKinderTshirt
        ? {
            "02A": "40 / 29",
            "04A": "43 / 32",
            "06A": "46 / 35",
            "08A": "49 / 38",
            "10A": "52 / 41",
            "12A": "55 / 44",
          }
        : isKinderHoodie
          ? {
              "04A": "44 / 36",
              "06A": "49 / 38",
              "08A": "54 / 41",
              "10A": "58 / 44",
              "12A": "64 / 47",
              "14A": "65 / 50",
            }
          : isUnisexPolo
            ? {
                XS: "67 / 45",
                S: "70 / 48",
                M: "72 / 50",
                L: "73 / 53",
                XL: "75 / 56",
                XXL: "77 / 59",
                "3XL": "79 / 62",
              }
            : isUnisexTshirt
              ? {
                  XXS: "64 / 46",
                  S: "70 / 50",
                  M: "72 / 53",
                  L: "74 / 56",
                  XL: "76 / 59",
                  XXL: "78 / 62",
                  "3XL": "80 / 65",
                  "4XL": "82 / 68",
                }
              : isUnisexHoodie
                ? {
                    XS: "68 / 46",
                    S: "70 / 51",
                    M: "71 / 56",
                    L: "73 / 61",
                    XL: "74 / 66",
                    XXL: "76 / 71",
                    "3XL": "77 / 76",
                    "4XL": "79 / 81",
                    "5XL": "80 / 86",
                  }
                : isMaennerShirt
                  ? {
                      S: "76 / 54",
                      M: "78 / 57",
                      L: "80 / 60",
                      XL: "82 / 63",
                      XXL: "84 / 66",
                      "3XL": "86 / 69",
                      "4XL": "88 / 72",
                      "5XL": "88 / 75",
                    }
                  : isMaennerPolo
                    ? {
                        S: "70 / 49",
                        M: "72 / 52",
                        L: "74 / 55",
                        XL: "76 / 58",
                        XXL: "78 / 61",
                        "3XL": "81 / 64",
                        "4XL": "83 / 67",
                        "5XL": "85 / 70",
                      }
                    : isMaennerTshirt
                      ? {
                          XS: "68 / 45",
                          S: "70 / 48",
                          M: "72 / 51",
                          L: "74 / 54",
                          XL: "76 / 57",
                          XXL: "78 / 60",
                          "3XL": "80 / 63",
                          "4XL": "82 / 66",
                        }
                      : isMaennerHoodie
                        ? {
                            XS: "67 / 47",
                            S: "69 / 50",
                            M: "71 / 53",
                            L: "73 / 56",
                            XL: "75 / 59",
                            XXL: "77 / 62",
                            "3XL": "79 / 65",
                          }
                        : isColumbiaSweatshirt
                          ? {
                              XS: "68 / 46",
                              S: "70 / 51",
                              M: "71 / 56",
                              L: "73 / 61",
                              XL: "74 / 66",
                              XXL: "76 / 71",
                              "3XL": "77 / 76",
                              "4XL": "79 / 81",
                              "5XL": "80 / 86",
                            }
                          : isFrauenTshirt
                            ? {
                                S: "61 / 41",
                                M: "63 / 44",
                                L: "65 / 47",
                                XL: "67 / 50",
                                XXL: "69 / 53",
                                "3XL": "71 / 56",
                              }
                            : isFrauenPolo
                              ? {
                                  XS: "60 / 42",
                                  S: "62 / 45",
                                  M: "64 / 48",
                                  L: "66 / 51",
                                  XL: "68 / 54",
                                  XXL: "70 / 57",
                                  "3XL": "72 / 60",
                                }
                              : isFrauenShirt
                                ? {
                                    XS: "62 / 45",
                                    S: "64 / 48",
                                    M: "66 / 51",
                                    L: "68 / 54",
                                    XL: "70 / 57",
                                    XXL: "72 / 60",
                                    "3XL": "73 / 63",
                                  }
                                : {
                                    XS: "60 / 42",
                                    S: "62 / 45",
                                    M: "64 / 48",
                                    L: "66 / 51",
                                    XL: "68 / 54",
                                    XXL: "70 / 57",
                                    "3XL": "72 / 60",
                                  }
  const help = [
    "WÄHLE LINKS DESIGN ODER TEXT.",
    "PLATZIERE DEIN MOTIV MITTEN AUF DEINEM PRODUKT.",
    "MIT MAUSRAD UND MAUSZUG KANNST DU DAS PRODUKT BEWEGEN.",
    "PRÜFE VOR DEM WARENKORB DEINE VORSCHAU.",
  ]
  const activeDesign = {
    uploadedImage,
    text,
    textColor,
    font,
    text2,
    text2Color,
    text2Font,
    objectScale,
    objectRotation,
    objectX,
    objectY,
    textScale,
    textRotation,
    textX,
    textY,
    text2Scale,
    text2Rotation,
    text2X,
    text2Y,
    brightness,
    contrast,
  }
  const frontReviewDesign =
    printSide === "front" ? activeDesign : sideDesigns.current.front
  const backReviewDesign =
    printSide === "back" ? activeDesign : sideDesigns.current.back
  const frontPreviewImage = isMug
    ? selectedMugColor.image
    : isShopper
    ? selectedShopperColor.image
    : isFrauenHoodie
      ? selectedHoodieColor.image
      : isMaennerHoodie
        ? selectedMenHoodieColor.image
        : isUnisexHoodie
          ? selectedUnisexHoodieColor.image
          : isKinderHoodie
            ? selectedKidsHoodieColor.image
            : isFrauenTshirt
              ? selectedTshirtColor.image
              : isMaennerTshirt
                ? selectedMenTshirtColor.image
                : isUnisexTshirt
                  ? selectedUnisexTshirtColor.image
                  : isKinderTshirt
                    ? selectedKidsTshirtColor.image
                    : isFrauenPolo
                      ? selectedPoloColor.image
                      : isMaennerPolo
                        ? selectedMenPoloColor.image
                        : isUnisexPolo
                          ? selectedUnisexPoloColor.image
                          : isKinderPolo
                            ? selectedKidsPoloColor.image
                            : isKinderSweatshirt
                              ? selectedKidsSweatshirtColor.image
                              : isFrauenShirt
                                ? selectedShirtColor.image
                                : isMaennerShirt
                                  ? selectedMenShirtColor.image
                                  : isKinderCap
                                    ? selectedKidsCapColor.image
                                    : isFrauenCap
                                      ? selectedCapColor.image
                                      : isColumbiaSweatshirt
                                        ? selectedSweatshirtColor.image
                                        : product.image
  const backPreviewImage = isMug
    ? selectedMugColor.image
    : isShopper
    ? selectedShopperColor.backImage
    : isFrauenHoodie
      ? selectedHoodieColor.backImage
      : isMaennerHoodie
        ? selectedMenHoodieColor.backImage
        : isUnisexHoodie
          ? selectedUnisexHoodieColor.backImage
          : isKinderHoodie
            ? selectedKidsHoodieColor.backImage
            : isFrauenTshirt
              ? selectedTshirtColor.backImage
              : isMaennerTshirt
                ? selectedMenTshirtColor.backImage
                : isUnisexTshirt
                  ? selectedUnisexTshirtColor.backImage
                  : isKinderTshirt
                    ? selectedKidsTshirtColor.backImage
                    : isFrauenPolo
                      ? selectedPoloColor.backImage
                      : isMaennerPolo
                        ? selectedMenPoloColor.backImage
                        : isUnisexPolo
                          ? selectedUnisexPoloColor.backImage
                          : isKinderPolo
                            ? selectedKidsPoloColor.backImage
                            : isKinderSweatshirt
                              ? selectedKidsSweatshirtColor.backImage
                              : isFrauenShirt
                                ? selectedShirtColor.backImage
                                : isMaennerShirt
                                  ? selectedMenShirtColor.backImage
                                  : isKinderCap
                                    ? selectedKidsCapColor.backImage
                                    : isFrauenCap
                                      ? selectedCapColor.backImage
                                      : isColumbiaSweatshirt
                                        ? selectedSweatshirtColor.backImage
                                        : product.image
  const productManufacturer =
    isFrauenHoodie || isMaennerHoodie ? "X.O by Promodoro" : "SOL'S"
  const productCategory = isAnyCap
    ? "Kopfbedeckung"
    : isColumbiaSweatshirt || isKinderSweatshirt
      ? "Sweatshirt"
      : isFrauenPolo || isMaennerPolo || isKinderPolo
        ? "Polo"
        : isUnisexPolo
          ? "Polo"
          : isFrauenTshirt ||
              isMaennerTshirt ||
              isUnisexTshirt ||
              isKinderTshirt
            ? "T-Shirt"
            : isFrauenShirt || isMaennerShirt
              ? "Hemd"
              : "Hoodie"
  const productGender = isKinderCap
    ? "Kinder, Unisex"
    : isFrauenCap
      ? gender === "FRAUEN"
        ? "Frauen, Unisex"
        : gender === "MÄNNER"
          ? "Männer, Unisex"
          : "Unisex"
      : isMaennerHoodie
        ? "Männer"
        : isUnisexHoodie
          ? "Herren, Unisex"
          : isKinderHoodie
            ? "Kinder, Unisex"
            : isMaennerTshirt
              ? "Männer"
              : isUnisexTshirt
                ? "Herren, Unisex"
                : isKinderTshirt
                  ? "Kinder, Unisex"
                  : isMaennerPolo
                    ? "Männer"
                    : isUnisexPolo
                      ? "Herren, Unisex"
                      : isKinderPolo
                        ? "Kinder, Unisex"
                        : isKinderSweatshirt
                          ? "Kinder, Unisex"
                          : isMaennerShirt
                            ? "Männer"
                            : isColumbiaSweatshirt
                              ? gender === "UNISEX"
                                ? "Unisex"
                                : `${gender[0]}${gender.slice(1).toLowerCase()}, Unisex`
                              : "Frauen"
  const productWeight = isKinderCap
    ? "350 g/m²"
    : isFrauenCap
      ? "180 g/m²"
      : isColumbiaSweatshirt || isKinderSweatshirt
        ? "280 g/m²"
        : isUnisexHoodie
          ? "280 g/m²"
          : isKinderHoodie
            ? "280 g/m²"
            : isFrauenPolo || isMaennerPolo
              ? "170 g/m²"
              : isUnisexPolo
                ? "130 g/m²"
                : isKinderPolo
                  ? "170 g/m²"
                  : isFrauenTshirt || isMaennerTshirt || isUnisexTshirt
                    ? "175 g/m²"
                    : isKinderTshirt
                      ? "190 g/m²"
                      : isFrauenShirt || isMaennerShirt
                        ? "140 g/m²"
                        : "280 g/m²"
  const productFit = isAnyCap
    ? "Klettverschluss"
    : isFrauenTshirt || isMaennerTshirt
      ? "Slim"
      : isUnisexTshirt
        ? "Medium Fit"
        : isKinderTshirt
          ? "Regular"
          : isFrauenPolo ||
              isMaennerPolo ||
              isUnisexPolo ||
              isKinderPolo ||
              isKinderSweatshirt ||
              isColumbiaSweatshirt
            ? "Regular"
            : isUnisexHoodie
              ? "Regular"
              : isKinderHoodie
                ? "Regular"
                : isFrauenShirt
                  ? "Slim"
                  : isMaennerShirt
                    ? "Slim"
                    : "Slim"
  const renderReviewPrint = (design: ReturnType<typeof emptySideDesign>, side: "front" | "back") => {
    const previewPosition = (value: number | undefined) => (value || 0) * reviewPositionScale[side]
    const reviewPrintZone = {
      ...defaultPrintZone,
      ...PRINT_ZONE_POSITIONS[
        [product.id, gender || "STANDARD", model, side].join(":")
      ],
    }
    return (
    <div
      className={`designer-review-print is-${product.zone}`}
      style={{
        left: `${reviewPrintZone.x}%`,
        top: `${reviewPrintZone.y}%`,
        width: `${reviewPrintZone.width}%`,
        height: `${reviewPrintZone.height}%`,
      }}
    >
      {design.uploadedImage && (
        <img
          src={design.uploadedImage}
          alt="Dein Design"
          style={{
            transform: `translate(calc(-50% + ${previewPosition(design.objectX)}px), calc(-50% + ${previewPosition(design.objectY)}px)) scale(${design.objectScale}) rotate(${design.objectRotation}deg)`,
            filter: `brightness(${design.brightness}%) contrast(${design.contrast}%)`,
          }}
        />
      )}
      {design.text.trim() && (
        <span
          style={{
            transform: `translate(calc(-50% + ${previewPosition(design.textX)}px), calc(-50% + ${previewPosition(design.textY)}px)) scale(${design.textScale || 1}) rotate(${design.textRotation || 0}deg)`,
            color: design.textColor || "#ffffff",
            fontFamily: design.font || "Oswald",
          }}
        >
          {design.text}
        </span>
      )}
      {design.text2.trim() && (
        <span
          style={{
            transform: `translate(calc(-50% + ${previewPosition(design.text2X)}px), calc(-50% + ${previewPosition(design.text2Y)}px)) scale(${design.text2Scale || 1}) rotate(${design.text2Rotation || 0}deg)`,
            color: design.text2Color || "#ffffff",
            fontFamily: design.text2Font || "Oswald",
          }}
        >
          {design.text2}
        </span>
      )}
    </div>
    )
  }
  const removeImageFromLibrary = (imageIndex: number) => {
    const imageId = imageLibraryIds[imageIndex]
    const imageUrl = imageLibrary[imageIndex]
    const removesActiveImage = imageUrl === uploadedImage
    setImageLibrary((items) => {
      const next = items.filter((_, index) => index !== imageIndex)
      setActiveImageIndex((currentIndex) =>
        imageIndex < currentIndex ? currentIndex - 1 : Math.min(currentIndex, Math.max(0, next.length - 1)),
      )
      if (removesActiveImage) setUploadedImage("")
      if (removesActiveImage && (text.trim() || text2.trim())) {
        setObject("text")
        setPanel("text")
      }
      return next
    })
    setImageLibraryIds((items) => items.filter((_, index) => index !== imageIndex))
    for (const side of ["front", "back"] as const) {
      if (sideDesigns.current[side].uploadedImage === imageUrl) {
        sideDesigns.current[side] = { ...sideDesigns.current[side], uploadedImage: "" }
      }
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    if (imageId && !imageId.startsWith("temporary-")) void deleteDesignerImage(imageId).catch(() => {})
    setUploadError("")
  }
  const removeSelectedObject = () => {
    if (object === "image") {
      sideDesigns.current[printSide] = {
        ...sideDesigns.current[printSide],
        uploadedImage: "",
      }
      setUploadedImage("")
      if (text.trim() || text2.trim()) {
        setObject("text")
        setPanel("text")
      }
      return
    }
    if (activeSlot === "text2") {
      sideDesigns.current[printSide] = {
        ...sideDesigns.current[printSide],
        text2: "",
      }
      setText2("")
    } else {
      sideDesigns.current[printSide] = {
        ...sideDesigns.current[printSide],
        text: "",
      }
      setText("")
    }
    if (uploadedImage) {
      setObject("image")
      setPanel("design")
    } else if (activeSlot === "text2" ? text.trim() : text2.trim()) {
      setActiveSlot(activeSlot === "text2" ? "text1" : "text2")
    }
  }
  const imageHandleScale = Math.min(objectScale, 1.12)
  const activeText = activeSlot === "text2" ? text2 : text
  const activeTextColor = activeSlot === "text2" ? text2Color : textColor
  const activeTextFont = activeSlot === "text2" ? text2Font : font
  const activeTextScale = activeSlot === "text2" ? text2Scale : textScale
  const activeTextRotation = activeSlot === "text2" ? text2Rotation : textRotation
  const activeTextX = activeSlot === "text2" ? text2X : textX
  const activeTextY = activeSlot === "text2" ? text2Y : textY
  const textHandleScale = Math.min(activeTextScale, 1.12)
  const activeObjectX = object === "image" ? objectX : activeTextX
  const activeObjectY = object === "image" ? objectY : activeTextY
  const [hoveredFont, setHoveredFont] = useState<string | null>(null)
  const previewFont = hoveredFont || activeTextFont
  useEffect(() => {
    if (!reviewOpen) return
    const measure = () => {
      const front = document.querySelector<HTMLElement>('[data-review-side="front"]')
      const back = document.querySelector<HTMLElement>('[data-review-side="back"]')
      setReviewPositionScale({
        front: front ? front.clientWidth / 540 : 390 / 540,
        back: back ? back.clientWidth / 540 : 390 / 540,
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    document.querySelectorAll<HTMLElement>("[data-review-side]").forEach((node) => observer.observe(node))
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [reviewOpen])
  const applyTextColor = (value: string) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return
    if (activeSlot === "text2") setText2Color(value)
    else setTextColor(value)
  }
  const pickTextColor = async () => {
    const EyeDropper = (window as any).EyeDropper
    if (!EyeDropper) return
    try {
      const result = await new EyeDropper().open()
      applyTextColor(result.sRGBHex)
    } catch {
      // The native picker can be cancelled without changing the selected color.
    }
  }
  const resetObjectSetting = (setting: "scale" | "rotation" | "brightness" | "contrast" | "font") => {
    if (setting === "brightness") return setBrightness(100)
    if (setting === "contrast") return setContrast(100)
    if (setting === "font") return activeSlot === "text2" ? setText2Font("Oswald") : setFont("Oswald")
    if (object === "image") {
      if (setting === "scale") setObjectScale(1)
      else setObjectRotation(0)
      return
    }
    if (activeSlot === "text2") {
      if (setting === "scale") setText2Scale(1)
      else setText2Rotation(0)
    } else if (setting === "scale") setTextScale(1)
    else setTextRotation(0)
  }
  const centerActiveObject = (axis: "horizontal" | "vertical") => {
    if (object === "image") {
      if (axis === "horizontal") setObjectX(0)
      else setObjectY(0)
      return
    }
    if (activeSlot === "text2") {
      if (axis === "horizontal") setText2X(0)
      else setText2Y(0)
    } else if (axis === "horizontal") setTextX(0)
    else setTextY(0)
  }
  const renderObjectSettings = () => {
    if (!hasObject) return null
    const isTextMode = panel === "text"
    return (
      <section className="designer-object-settings">
        <p>OBJEKT</p>
        <div className="designer-segmented designer-object-mode">
          <button type="button" className="is-active" disabled>
            {isTextMode ? "TEXT" : "BILD"}
          </button>
        </div>
        <div className="designer-object-controls">
          {isTextMode && (
            <div className="designer-object-font" ref={fontPickerRef}>
              <span>SCHRIFT</span>
              <button type="button" className={`designer-product-button ${fontPickerOpen ? "is-open" : ""}`} onClick={() => setFontPickerOpen((open) => !open)}>
                <span style={{ fontFamily: previewFont }}>{previewFont}</span><b>⌄</b>
              </button>
              <button type="button" className="designer-control-reset" onClick={() => resetObjectSetting("font")} aria-label="Schrift zurücksetzen">↺</button>
              {fontPickerOpen && <div className="designer-product-picker designer-font-list" onMouseLeave={() => setHoveredFont(null)}>{TEXT_FONTS.map((item) => <button type="button" onMouseEnter={() => setHoveredFont(item)} onFocus={() => setHoveredFont(item)} onClick={() => { if (activeSlot === "text2") setText2Font(item); else setFont(item); setHoveredFont(null); setFontPickerOpen(false) }} className={activeTextFont === item || hoveredFont === item ? "is-active" : ""} style={{ fontFamily: item }} key={item}>{item}</button>)}</div>}
            </div>
          )}
          <div className="designer-object-control-row">
            <label>SKALIERUNG<input type="range" min=".3" max="2" step=".05" value={object === "text" ? activeTextScale : objectScale} onChange={(event) => { const value = Number(event.target.value); if (object === "text" && activeSlot === "text2") setText2Scale(value); else if (object === "text") setTextScale(value); else setObjectScale(value) }} /></label>
            <button type="button" className="designer-control-reset" onClick={() => resetObjectSetting("scale")} aria-label="Skalierung zurücksetzen">↺</button>
          </div>
          <div className="designer-object-control-row">
            <label>DREHUNG<input type="range" min="-180" max="180" value={object === "text" ? activeTextRotation : objectRotation} onChange={(event) => { const value = Number(event.target.value); if (object === "text" && activeSlot === "text2") setText2Rotation(value); else if (object === "text") setTextRotation(value); else setObjectRotation(value) }} /></label>
            <button type="button" className="designer-control-reset" onClick={() => resetObjectSetting("rotation")} aria-label="Drehung zurücksetzen">↺</button>
          </div>
          {!isTextMode && (
            <>
              <div className="designer-object-control-row"><label>HELLIGKEIT<input type="range" min="40" max="170" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} /></label><button type="button" className="designer-control-reset" onClick={() => resetObjectSetting("brightness")} aria-label="Helligkeit zurücksetzen">↺</button></div>
              <div className="designer-object-control-row"><label>KONTRAST<input type="range" min="40" max="170" value={contrast} onChange={(event) => setContrast(Number(event.target.value))} /></label><button type="button" className="designer-control-reset" onClick={() => resetObjectSetting("contrast")} aria-label="Kontrast zurücksetzen">↺</button></div>
            </>
          )}
          <div className="designer-center-controls">
            <span>ZENTRIEREN</span>
            <button type="button" onClick={() => centerActiveObject("horizontal")} aria-label="Horizontal zentrieren">↔</button>
            <button type="button" onClick={() => centerActiveObject("vertical")} aria-label="Vertikal zentrieren">↕</button>
          </div>
        </div>
      </section>
    )
  }
  return (
    <div className="designer-studio">
      <aside className="designer-tools">
        <a href="/" className="designer-brand" aria-label="На главную">
          <img src={imgTowerLogo} alt="Pottlerkinder" />
          <img src={imgWordmarkLogo} alt="Pottlerkinder" />
        </a>
        <div className="designer-tool-tabs">
          <button
            type="button"
            className={panel === "design" ? "is-active" : ""}
            onClick={() => {
              setPanel("design")
              setObject("image")
            }}
          >
            ▣ <span>DESIGN</span>
          </button>
          <button
            type="button"
            className={panel === "text" ? "is-active" : ""}
            onClick={() => {
              setPanel("text")
              setObject("text")
            }}
          >
            T <span>TEXT</span>
          </button>
        </div>
        <div className="designer-tool-content">
          {panel === "design" ? (
            <>
              <label htmlFor="designer-image-upload" className="designer-upload" onClick={requestImageUpload}>
                <input
                  id="designer-image-upload"
                  ref={uploadInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onClick={(event) => { event.currentTarget.value = "" }}
                  onChange={(event) => {
                    upload(event.target.files?.[0])
                    setCopyrightUploadOpen(false)
                  }}
                />
                <b>BILD HOCHLADEN</b>
                <span>PNG ODER JPEG · MAX. 5 MB</span>
                <span>1 BILD PRO DRUCKSEITE · BIS ZU 3 BILDER IN DER BIBLIOTHEK</span>
              </label>
              {uploadError && <p className="designer-error">{uploadError}</p>}
              {imageLibrary.map((image, index) => (
                <div className="designer-image-library-item" key={image}>
                  <button type="button" className={`designer-object-select ${activeImageIndex === index ? "is-active" : ""}`} onClick={() => { setActiveImageIndex(index); setUploadedImage(image); setObject("image") }}>
                    <img className="designer-library-thumbnail" src={image} alt="" />
                    <span>BILD {index + 1}</span>
                    <b>✓</b>
                  </button>
                  {activeImageIndex === index && (
                    <button type="button" className="designer-library-delete" onClick={() => removeImageFromLibrary(index)} aria-label={`Bild ${index + 1} löschen`}>
                      <FaTrash aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
              {renderObjectSettings()}
            </>
          ) : (
            <div className="designer-text-settings">
              <section>
                <p>DEIN TEXT</p>
                <textarea
                  maxLength={70}
                  placeholder={!isTextInputFocused && !activeText.trim() ? "BIS ZU 2 TEXTFELDER HINZUFÜGEN …" : ""}
                  onFocus={() => setIsTextInputFocused(true)}
                  onBlur={() => setIsTextInputFocused(false)}
                  value={activeSlot === "text2" ? text2 : text}
                  onChange={(event) => {
                    if (activeSlot === "text2") {
                      if (!text2.trim() && event.target.value.trim()) {
                        setText2Scale(1)
                        setText2Rotation(0)
                        setText2X(0)
                        setText2Y(0)
                      }
                      setText2(event.target.value)
                    } else {
                      if (!text.trim() && event.target.value.trim()) {
                        setTextScale(1)
                        setTextRotation(0)
                        setTextX(0)
                        setTextY(0)
                      }
                      setText(event.target.value)
                    }
                    setObject("text")
                  }}
                />
                <div className="designer-object-slots">
                  <button type="button" className={activeSlot === "text1" ? "is-active" : ""} onClick={() => { setActiveSlot("text1"); setObject("text") }}>TEXT 1</button>
                  <button type="button" className={activeSlot === "text2" ? "is-active" : ""} onClick={() => { setActiveSlot("text2"); setObject("text") }}>TEXT 2</button>
                </div>
              </section>
              {renderObjectSettings()}
              <section className="designer-text-colors" ref={colorPaletteRef}>
                <div className="designer-color-label-row">
                  <p>FARBE</p>
                  <button
                    type="button"
                    className="designer-active-color-swatch"
                    style={{ backgroundColor: activeTextColor }}
                    aria-label="Farbpalette öffnen"
                    aria-expanded={colorPaletteOpen}
                    onClick={() => setColorPaletteOpen((open) => !open)}
                  />
                </div>
                {colorPaletteOpen && (
                  <div className="designer-text-palette" aria-label="Textfarbe auswählen">
                  {TEXT_COLOR_SWATCHES.map((color) => (
                    <button
                      type="button"
                      key={color}
                      title={color}
                      aria-label={`Textfarbe ${color}`}
                      className={activeTextColor.toLowerCase() === color.toLowerCase() ? "is-active" : ""}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        applyTextColor(color)
                        setColorPaletteOpen(false)
                      }}
                    />
                  ))}
                  </div>
                )}
              </section>
              <section>
                <p>TEXTFARBE</p>
                <div className="designer-color-picker">
                  <div className="designer-color-codebar">
                    <button type="button" className="designer-eyedropper" style={{ color: activeTextColor }} onClick={pickTextColor} aria-label="Farbe mit Pipette auswählen"><FaEyeDropper aria-hidden="true" /></button>
                    <output
                      aria-label="Ausgewählter Farbcode"
                      style={{ color: activeTextColor }}
                    >
                      {activeTextColor.toUpperCase()}
                    </output>
                  </div>
                  <HexColorPicker color={activeTextColor} onChange={applyTextColor} />
                </div>
              </section>
            </div>
          )}
        </div>
        <div className="designer-tool-bottom">
          <div
            className="designer-history-controls"
            aria-label="Bearbeitungshistorie"
          >
            <button
              type="button"
              onClick={undo}
              disabled={historyIndexRef.current <= 0}
            >
              ↶ RÜCKGÄNGIG
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={
                historyIndexRef.current >= historyRef.current.length - 1
              }
            >
              ↷ WIEDERHOLEN
            </button>
          </div>
          <button
            type="button"
            className="btn-red designer-reset-button"
            onClick={reset}
          >
            <FaTrash aria-hidden="true" />
            <span>ZURÜCKSETZEN</span>
          </button>
        </div>
      </aside>
      <main className="designer-workspace">
        <div className="designer-workspace-head">
          <span>DESIGN-STUDIO</span>
          <p>{productName.toUpperCase()} · PERSONALISIEREN</p>
        </div>
        <div
          className="designer-stage"
          onWheel={onWheel}
          onPointerDown={(event) => onPointerDown(event, "canvas")}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onLostPointerCapture={stopDragging}
        >
          <div className="designer-stage-grid" />
          <div
            className="designer-product-canvas"
            style={{
              transform: `translate(-50%, -50%) translate(${canvasX}px, ${canvasY}px) scale(${canvasScale})`,
            }}
          >
            {isMug ? (
              <TwoToneMugMockup
                color={selectedMugColor.swatch}
                label={selectedMugColor.label}
              />
            ) : (
              <img
                className={`designer-mockup ${
                  isShopper && printSide === "back" ? "is-shopper-back" : ""
                }`}
                src={productImage}
                alt={`Vorschau ${productName}`}
                draggable="false"
              />
            )}
            <div
              className={`designer-print-zone is-${product.zone} ${
                isAnyCap && printSide === "back" ? "is-preview-only" : ""
              }`}
              style={{
                left: `${currentPrintZone.x}%`,
                top: `${currentPrintZone.y}%`,
                width: `${currentPrintZone.width}%`,
                height: `${currentPrintZone.height}%`,
              }}
            >
              <div className="designer-print-artwork">
                {uploadedImage && (
                  <div
                    className={`designer-object-layer designer-image-layer ${
                      object === "image" ? "is-selected" : ""
                    }`}
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      setObject("image")
                      setPanel("design")
                      onPointerDown(event, "image")
                    }}
                    style={{
                      transform: `translate(calc(-50% + ${objectX}px), calc(-50% + ${objectY}px)) scale(${objectScale}) rotate(${objectRotation}deg)`,
                    }}
                  >
                    <img
                      className="designer-object-image"
                      src={uploadedImage}
                      alt="Dein hochgeladenes Design"
                      draggable="false"
                      onDragStart={(event) => event.preventDefault()}
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                      }}
                    />
                  </div>
                )}
                {(!isAnyCap || printSide === "front") && text.trim() && (
                  <div
                    className={`designer-object-layer designer-text-layer ${
                      object === "text" && activeSlot === "text1" ? "is-selected" : ""
                    }`}
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      setObject("text")
                      setActiveSlot("text1")
                      setPanel("text")
                      onPointerDown(event, "text", "text1")
                    }}
                    style={{
                      transform: `translate(calc(-50% + ${textX}px), calc(-50% + ${textY}px)) scale(${textScale}) rotate(${textRotation}deg)`,
                    }}
                  >
                    <div
                      className="designer-object-text"
                      style={{ color: textColor, fontFamily: font }}
                  >
                    {text}
                  </div>
                </div>
              )}
                {(!isAnyCap || printSide === "front") && text2.trim() && (
                  <div
                    className={`designer-object-layer designer-text-layer ${
                      object === "text" && activeSlot === "text2" ? "is-selected" : ""
                    }`}
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      setObject("text")
                      setActiveSlot("text2")
                      setPanel("text")
                      onPointerDown(event, "text", "text2")
                    }}
                    style={{
                      transform: `translate(calc(-50% + ${text2X}px), calc(-50% + ${text2Y}px)) scale(${text2Scale}) rotate(${text2Rotation}deg)`,
                    }}
                  >
                    <div
                      className="designer-object-text"
                      style={{ color: text2Color, fontFamily: text2Font }}
                    >
                      {text2}
                    </div>
                  </div>
                )}
              </div>
              {isObjectHandleDragging && (
                <div className={`designer-alignment-guides ${Math.abs(activeObjectX) < 18 ? "is-near-vertical" : ""} ${Math.abs(activeObjectY) < 18 ? "is-near-horizontal" : ""}`} aria-hidden="true">
                  <i className="is-horizontal" />
                  <i className="is-vertical" />
                </div>
              )}
              {object === "image" &&
                uploadedImage &&
                !isObjectHandleDragging && (
                  <div
                    className="designer-object-handle-layer designer-image-handle-layer"
                    style={{
                      transform: `translate(calc(-50% + ${objectX}px), calc(-50% + ${objectY}px)) scale(${imageHandleScale}) rotate(${objectRotation}deg)`,
                    }}
                  >
                    <div className="designer-object-handles">
                      <button
                        type="button"
                        className="designer-move-handle"
                        aria-label="Bild verschieben"
                        style={{ transform: `scale(${1 / imageHandleScale})` }}
                        onPointerDown={(event) => {
                          event.stopPropagation()
                          onPointerDown(event, "move")
                        }}
                      >
                        <FaArrowsAlt aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="designer-rotate-handle"
                        aria-label="Bild drehen"
                        style={{ transform: `scale(${1 / imageHandleScale})` }}
                        onPointerDown={(event) => {
                          event.stopPropagation()
                          onPointerDown(event, "rotate")
                        }}
                      >
                        ↻
                      </button>
                      <button
                        type="button"
                        className="designer-delete-handle"
                        aria-label="Bild löschen"
                        style={{ transform: `scale(${1 / imageHandleScale})` }}
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={removeSelectedObject}
                      >
                        <FaTrash aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="designer-resize-handle"
                        aria-label="Bild skalieren"
                        style={{ transform: `scale(${1 / imageHandleScale})` }}
                        onPointerDown={(event) => {
                          event.stopPropagation()
                          onPointerDown(event, "resize")
                        }}
                      >
                        <FaExpandArrowsAlt aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              {object === "text" && activeText.trim() && !isObjectHandleDragging && (
                <div
                  className="designer-object-handle-layer designer-text-handle-layer"
                  style={{
                    transform: `translate(calc(-50% + ${activeTextX}px), calc(-50% + ${activeTextY}px)) scale(${textHandleScale}) rotate(${activeTextRotation}deg)`,
                  }}
                >
                  <span
                    className="designer-handle-text-measure"
                    style={{ fontFamily: activeTextFont }}
                  >
                    {activeText}
                  </span>
                  <div className="designer-object-handles">
                    <button
                      type="button"
                      className="designer-move-handle"
                      aria-label="Text verschieben"
                      style={{ transform: `scale(${1 / textHandleScale})` }}
                      onPointerDown={(event) => {
                        event.stopPropagation()
                          onPointerDown(event, "move", activeSlot === "text2" ? "text2" : "text1")
                      }}
                    >
                      <FaArrowsAlt aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="designer-rotate-handle"
                      aria-label="Text drehen"
                      style={{ transform: `scale(${1 / textHandleScale})` }}
                      onPointerDown={(event) => {
                        event.stopPropagation()
                          onPointerDown(event, "rotate", activeSlot === "text2" ? "text2" : "text1")
                      }}
                    >
                      ↻
                    </button>
                    <button
                      type="button"
                      className="designer-delete-handle"
                      aria-label="Text löschen"
                      style={{ transform: `scale(${1 / textHandleScale})` }}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={removeSelectedObject}
                    >
                      <FaTrash aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="designer-resize-handle"
                      aria-label="Text skalieren"
                      style={{ transform: `scale(${1 / textHandleScale})` }}
                      onPointerDown={(event) => {
                        event.stopPropagation()
                          onPointerDown(event, "resize", activeSlot === "text2" ? "text2" : "text1")
                      }}
                    >
                      <FaExpandArrowsAlt aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="designer-zoom"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setCanvasScale((value) => Math.max(0.65, value - 0.1))
              }
            >
              −
            </button>
            <span>{Math.round((canvasScale / 1.4) * 100)}%</span>
            <button
              type="button"
              onClick={() =>
                setCanvasScale((value) => Math.min(2.52, value + 0.1))
              }
            >
              +
            </button>
          </div>
          <div className="designer-stage-actions">
            <div className="designer-stage-links">
              <button
                type="button"
                className="designer-help-button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setHelpStep(0)}
              >
                <b>?</b> HILFE ZUM KONSTRUKTEUR
              </button>
              <button
                type="button"
                className="designer-forbidden-button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setForbiddenThemesOpen(true)}
              >
                <b>!</b> VERBOTENE THEMEN
              </button>
            </div>
          </div>
        </div>
      </main>
      <aside className="designer-options">
        <div className="designer-options-scroll">
          <section>
            <p>GENDER</p>
            <div className="designer-gender-choice">
              {["FRAUEN", "MÄNNER", "KINDER", "UNISEX"].map((item) => (
                <button
                  type="button"
                  className={gender === item ? "is-active" : ""}
                  onClick={() => chooseGender(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
          <section>
            <p>ANDERES</p>
            <div className="designer-gender-choice designer-other-choice">
              {OTHER_DESIGNER_PRODUCTS.map((item) => (
                <button
                  type="button"
                  className={item.id === product.id ? "is-active" : ""}
                  onClick={() => chooseProduct(item)}
                  key={item.id}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </section>
          <section ref={productPickerRef}>
            <p>PRODUKT</p>
            <button
              type="button"
              className={`designer-product-button ${
                productPickerOpen ? "is-open" : ""
              }`}
              onClick={() => {
                setProductPickerOpen((open) => !open)
                setModelPickerOpen(false)
              }}
            >
              <span>{productName}</span>
              <b>⌄</b>
            </button>
            {productPickerOpen && (
              <div className="designer-product-picker">
                {productPickerProducts.map((item) => (
                  <button
                    type="button"
                    onClick={() => chooseProduct(item)}
                    className={item.id === product.id ? "is-active" : ""}
                    key={item.id}
                  >
                    {item.id === "mug" ? "TASSE TWO TONE" : item.title}
                  </button>
                ))}
              </div>
            )}
          </section>
          <section ref={modelPickerRef}>
            <p>MODELL</p>
            <button
              type="button"
              className={`designer-product-button ${
                modelPickerOpen ? "is-open" : ""
              }`}
              onClick={() => {
                setModelPickerOpen((open) => !open)
                setProductPickerOpen(false)
              }}
            >
              <span>{model}</span>
              <b>⌄</b>
            </button>
            {modelPickerOpen && (
              <div className="designer-product-picker designer-model-picker">
                <button
                  type="button"
                  className="is-active"
                  onClick={() => {
                    setModel("STANDARD")
                    setModelPickerOpen(false)
                    reset()
                  }}
                >
                  STANDARD
                </button>
              </div>
            )}
          </section>
          {(isConfiguredTextile || isAnyCap || isShopper || isMug) && (
            <section>
              <p>FARBE</p>
              <div className="designer-model-colors">
                {(Array.isArray(configuredColors) ? configuredColors : []).map(
                  (item) => (
                    <button
                      type="button"
                      title={item.label}
                      aria-label={item.label}
                      className={
                        selectedConfiguredColor.id === item.id
                          ? "is-active"
                          : ""
                      }
                      style={{
                        background: isMug
                          ? `linear-gradient(90deg, #fff 0 50%, ${item.swatch} 50% 100%)`
                          : item.swatch,
                      }}
                      onClick={() => chooseConfiguredColor(item.id)}
                      key={item.id}
                    />
                  ),
                )}
              </div>
              <small className="designer-color-name">
                {selectedConfiguredColor.label}
              </small>
            </section>
          )}
          <section>
            <p>ÜBER DAS PRODUKT</p>
            <button
              type="button"
              className="designer-info-button"
              onClick={() => {
                setProductInfoTab("details")
                setProductInfoOpen(true)
              }}
            >
              PRODUKTDETAILS <b>→</b>
            </button>
          </section>
          {(product.type === "textile" || isAnyCap || isShopper || isMug) && (
            <section>
              <p>DRUCKSEITE</p>
              {isMug ? (
                <>
                  <div className="designer-side-choice">
                    <button type="button" className="is-active">
                      RUNDUMDRUCK +4,99 €
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="designer-side-choice">
                    <button
                      type="button"
                      className={printSide === "front" ? "is-active" : ""}
                      onClick={() => choosePrintSide("front")}
                    >
                      VORNE +4,99 €
                    </button>
                    <button
                      type="button"
                      className={printSide === "back" ? "is-active" : ""}
                      onClick={() => choosePrintSide("back")}
                      disabled={!isConfiguredTextile && !isAnyCap && !isShopper}
                    >
                      {isAnyCap ? "HINTEN" : "HINTEN +9,99 €"}
                    </button>
                  </div>
                  {isAnyCap ? (
                    <small>NUR VORDERSEITE IST BEDRUCKBAR.</small>
                  ) : isConfiguredTextile || isShopper ? (
                    <small>AUFPREISE FÜR BEDRUCKTE SEITEN.</small>
                  ) : null}
                </>
              )}
            </section>
          )}
          <section>
            <p>GRÖSSE</p>
            <div className="designer-sizes">
              {(Array.isArray(sizes) ? sizes : []).map((item) => (
                <button
                  type="button"
                  className={size === item ? "is-active" : ""}
                  onClick={() => setSize(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
        <footer>
          <div className="designer-price-summary">
            <span className="designer-price-label">DEIN PREIS</span>
            <strong className="designer-price-value">{designPriceLabel}</strong>
            <PriceLegalNote />
          </div>
          <button
            type="button"
            className="btn-red"
            onClick={() => setReviewOpen(true)}
            disabled={!hasAnyDesign}
          >
            VORSCHAU PRÜFEN <b>→</b>
          </button>
        </footer>
      </aside>
      {productInfoOpen && (
        <div
          className="designer-info-layer"
          role="dialog"
          aria-modal="true"
          aria-label="Produktinformationen"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setProductInfoOpen(false)
          }}
        >
          <div className="designer-info-modal">
            <button
              type="button"
              className="designer-info-close"
              onClick={() => setProductInfoOpen(false)}
              aria-label="Fenster schließen"
            >
              ×
            </button>
            <div className="designer-info-tabs">
              <button
                type="button"
                className={productInfoTab === "details" ? "is-active" : ""}
                onClick={() => setProductInfoTab("details")}
              >
                ÜBER DAS PRODUKT
              </button>
              <button
                type="button"
                className={productInfoTab === "size" ? "is-active" : ""}
                onClick={() => setProductInfoTab("size")}
              >
                GRÖSSENTABELLE
              </button>
            </div>
            {productInfoTab === "details" ? (
              <div className="designer-info-content">
                <div>
                  {isMug ? (
                    <>
                      <p className="designer-info-kicker">
                        SUBLITASSE TWO TONE · 11 OZ
                      </p>
                      <h2>TASSE TWO TONE</h2>
                      <p>
                        Die Sublitasse Two Tone ist die ideale Basis für
                        farbstarke, individuelle Motive. Ihre hochweiß-glänzende
                        Orca-Beschichtung sorgt für brillante
                        Sublimationsergebnisse; die farbige Innenseite und der
                        C-förmige Henkel setzen einen klaren Akzent.
                      </p>
                      <h3>PRODUKTDETAILS</h3>
                      <ul>
                        <li>Fassungsvermögen: 11 oz (ca. 330 ml)</li>
                        <li>Material: Keramik</li>
                        <li>Hochwertige Orca-Beschichtung</li>
                        <li>Hochweiß-glänzende Oberfläche</li>
                        <li>Farbige Innenseite und C-förmiger Henkel</li>
                        <li>Höhe: 95 mm · Durchmesser: 80 mm</li>
                        <li>Spülmaschinenfest für mehr als 3.000 Spülgänge</li>
                      </ul>
                    </>
                  ) : isShopper ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S STOCKHOLM · 04091
                      </p>
                      <h2>SOL'S STOCKHOLM – 04091</h2>
                      <p>
                        Die SOL'S Stockholm ist eine klassische Tragetasche aus
                        100 % Bio-Baumwolle mit einem Gewicht von 140 g/m².
                        Leicht, aber stabil genug für den täglichen Gebrauch.
                        Mit langen Henkeln (70 cm) lässt sie sich bequem über
                        der Schulter tragen, ob beim Einkaufen, als
                        Merchandise-Artikel oder bei Events. Das herausnehmbare
                        Etikett macht sie ideal für neutrale Weiterverarbeitung.
                        Die glatte Baumwollfläche bietet eine perfekte Grundlage
                        für Druck oder kreative Veredelung, und das mit gutem
                        Gewissen.
                      </p>
                      <p>
                        Pflegehinweis: Nicht waschen – mit einem Schwamm feucht
                        abwischen.
                      </p>
                    </>
                  ) : isKinderCap ? (
                    <>
                      <p className="designer-info-kicker">
                        DAIBER 5 PANEL KINDER CAP · MB7010
                      </p>
                      <h2>KINDER CAP</h2>
                      <p>
                        Die Daiber 5 Panel Kinder Cap ist für Kinder ab vier
                        Jahren mit einem Kopfumfang von 54 cm ausgelegt. Der
                        Klettverschluss ermöglicht eine einfache Anpassung.
                      </p>
                      <p>
                        Schwere, gebürstete Baumwolle sowie ein gefüttertes
                        Satinschweißband bieten Stabilität und angenehmen
                        Tragekomfort für Alltag, Schule und Verein.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % schwere, gebürstete Baumwolle</li>
                        <li>350 g/m² · 5-Panel-Form · niedriges Profil</li>
                        <li>4 gestickte Luftlöcher</li>
                        <li>8 Ziernähte am Schild</li>
                        <li>Verstellbarer Klettverschluss</li>
                      </ul>
                    </>
                  ) : isFrauenCap ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S SUNNY · 88110
                      </p>
                      <h2>{productName.toUpperCase()}</h2>
                      <p>
                        Die SOL'S Sunny ist eine klassische 5-Panel-Cap für
                        Alltag, Events und individuelle Veredelung.
                      </p>
                      <p>
                        Der vorgeformte Schirm schützt vor Sonne, vier umstickte
                        Luftösen unterstützen die Atmungsaktivität. Der
                        Klettverschluss lässt sich schnell und komfortabel
                        anpassen.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % leichte, gebürstete Baumwolle</li>
                        <li>180 g/m²</li>
                        <li>Vorgeformter Schirm</li>
                        <li>4 umstickte Lüftungsösen</li>
                        <li>Verstellbarer Klettverschluss</li>
                      </ul>
                    </>
                  ) : isKinderHoodie ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S CONDOR KIDS · 04238
                      </p>
                      <h2>KINDER HOODIE</h2>
                      <p>
                        Der SOL'S Condor Kids ist ein neutraler Kapuzen-Sweater
                        für Schule, Freizeit, Sportverein und kreative
                        Gruppenprojekte. Der Nackenbereich ohne Markenlabel ist
                        direkt für individuelle Gestaltung vorbereitet.
                      </p>
                      <p>
                        Das innen angeraute Material sorgt für angenehmen
                        Tragekomfort. Die gefütterte Kapuze kommt bewusst ohne
                        Kordeln und ist damit altersgerecht gestaltet.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>
                          80 % ringgesponnene Baumwolle, 20 % recycelter
                          Polyester
                        </li>
                        <li>280 g/m² · innen angeraut</li>
                        <li>Regular Fit · Set-In-Ärmel</li>
                        <li>Gefütterte Kapuze ohne Kordeln</li>
                        <li>
                          No-Label-Nackenbereich mit neutralem Größenetikett
                        </li>
                      </ul>
                    </>
                  ) : isUnisexHoodie ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S CONDOR · 03815
                      </p>
                      <h2>UNISEX HOODIE</h2>
                      <p>
                        Der SOL'S Condor ist ein vielseitiger Unisex
                        Kapuzen-Sweater für Teamwear, Freizeit und eigene
                        Kollektionen. Der labelfreie Nackenbereich ist direkt
                        für deine individuelle Gestaltung vorbereitet.
                      </p>
                      <p>
                        Das angeraute Material, die gefütterte Kapuze mit
                        Ton-in-Ton-Kordeln und elastische Rippstrickbündchen
                        sorgen für Komfort und Formstabilität.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>
                          80 % ringgesponnene Baumwolle, 20 % recycelter
                          Polyester
                        </li>
                        <li>280 g/m² · innen angeraut</li>
                        <li>Regular Fit · Set-In-Ärmel</li>
                        <li>Gefütterte Kapuze mit Ton-in-Ton-Kordeln</li>
                        <li>
                          No-Label-Nackenbereich mit neutralem Größenetikett
                        </li>
                      </ul>
                    </>
                  ) : isMaennerHoodie ? (
                    <>
                      <p className="designer-info-kicker">
                        X.O BY PROMODORO MEN HOODY SWEATER · 1680
                      </p>
                      <h2>MÄNNER HOODIE</h2>
                      <p>
                        Der X.O by Promodoro Men Hoody Sweater ist ein schmal
                        geschnittener Herren-Kapuzen-Sweater für einen klaren,
                        modernen Look.
                      </p>
                      <p>
                        Die angeraute Innenseite und die zweilagige Kapuze
                        sorgen für angenehmen Tragekomfort und machen ihn zu
                        einer zuverlässigen Grundlage für individuelle
                        Veredelung.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>280 g/m² · innen angeraut</li>
                        <li>Zweilagige Kapuze</li>
                        <li>Schmal geschnittener Herren-Fit</li>
                        <li>Ideal für Druck, Teamwear und Merchandise</li>
                      </ul>
                    </>
                  ) : isKinderTshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S IMPERIAL KIDS · 11770
                      </p>
                      <h2>KINDER T-SHIRT</h2>
                      <p>
                        Das SOL'S Imperial Kids ist ein strapazierfähiges
                        Kinder-Basic aus halbgekämmter, ringgesponnener
                        Baumwolle. Die robuste Jersey-Qualität eignet sich ideal
                        für Druck, Stick und Transfertechniken.
                      </p>
                      <p>
                        Der Rippstrickkragen mit Elasthan und das Nackenband
                        sorgen für einen angenehmen, formstabilen Sitz. Bis
                        Größe 06A ist das Shirt mit Seitennähten gefertigt, ab
                        08A als Rundstrick ohne Seitennähte.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % halbgekämmte, ringgesponnene Baumwolle</li>
                        <li>Robuster Jersey · 190 g/m²</li>
                        <li>Regular Fit · Kurzarm · Set-In-Ärmel</li>
                        <li>Rippstrickkragen mit Elasthan und Nackenband</li>
                        <li>
                          Ideal für Schulkleidung, Vereine und
                          Kinder-Merchandise
                        </li>
                      </ul>
                    </>
                  ) : isUnisexTshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S LEGEND · 03981
                      </p>
                      <h2>UNISEX T-SHIRT</h2>
                      <p>
                        Das SOL'S Legend ist ein hochwertiges Unisex T-Shirt aus
                        gekämmter Bio-Baumwolle in Conversion. Die neutrale
                        Verarbeitung macht es zur starken Grundlage für Druck,
                        Stick und eigene Labels.
                      </p>
                      <p>
                        Seitennähte, ein Rippstrick-Rundhalsausschnitt und ein
                        durchgehendes Nackenband sorgen für einen klassischen,
                        formstabilen Sitz im Alltag.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % gekämmte Bio-Baumwolle in Conversion</li>
                        <li>Single Jersey · 175 g/m²</li>
                        <li>Medium Fit · Kurzarm · Set-In-Ärmel</li>
                        <li>Seitennähte für dauerhafte Formstabilität</li>
                        <li>
                          No-Label-Nackenbereich mit neutralem Größenetikett
                        </li>
                      </ul>
                    </>
                  ) : isMaennerTshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S PIONEER MEN · 03565
                      </p>
                      <h2>MÄNNER T-SHIRT</h2>
                      <p>
                        Das SOL'S Pioneer Men ist ein schlichtes T-Shirt mit
                        schlanker Passform und Rundhalsausschnitt.
                      </p>
                      <p>
                        Es besteht aus 100 % Bio-Baumwolle. Die enzymgewaschene
                        Oberfläche sorgt für eine glatte, angenehme Haptik und
                        eine hochwertige Basis für deine Gestaltung.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % Bio-Baumwolle · 175 g/m²</li>
                        <li>Slim Fit mit Rundhalsausschnitt</li>
                        <li>Kurzarm · Set-In-Ärmel</li>
                        <li>Enzymgewaschene Oberfläche</li>
                      </ul>
                    </>
                  ) : isKinderPolo ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S SUMMER II KIDS · 11344
                      </p>
                      <h2>KINDER POLO</h2>
                      <p>
                        Das SOL'S Summer II Kids ist ein leichtes Kinder-Piqué-
                        Polo aus 100 % gekämmter, ringgesponnener Baumwolle. Es
                        eignet sich für Schule, Vereine und eigene Designs.
                      </p>
                      <p>
                        Ein 1×1-Rippstrickkragen, die Ton-in-Ton-Knopfleiste mit
                        drei Knöpfen und Seitenschlitze sorgen für Komfort und
                        Bewegungsfreiheit.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % gekämmte, ringgesponnene Baumwolle</li>
                        <li>Piqué · 170 g/m²</li>
                        <li>Regular Fit · Kurzarm</li>
                        <li>1×1-Rippstrickkragen · 3 Ton-in-Ton-Knöpfe</li>
                        <li>Seitenschlitze für Bewegungsfreiheit</li>
                      </ul>
                    </>
                  ) : isUnisexPolo ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S PITCHER · 04442
                      </p>
                      <h2>UNISEX POLO</h2>
                      <p>
                        Das SOL'S Pitcher ist ein leichtes Unisex Sport-Polo aus
                        vollständig recyceltem Polyester. Die feine
                        Piqué-Struktur ist atmungsaktiv und schnell trocknend.
                      </p>
                      <p>
                        Der 1×1-Rippstrickkragen und die Knopfleiste mit drei
                        Ton-in-Ton-Knöpfen schaffen einen klaren, sportlichen
                        Look für Teams, Events und Promotion.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % recycelter Polyester</li>
                        <li>Leichtes Piqué · 130 g/m²</li>
                        <li>Regular Fit · Kurzarm</li>
                        <li>1×1-Rippstrickkragen · 3 Ton-in-Ton-Knöpfe</li>
                        <li>Für Sublimationsdruck geeignet</li>
                      </ul>
                    </>
                  ) : isMaennerPolo ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S PULSE · 04502
                      </p>
                      <h2>MÄNNER POLO</h2>
                      <p>
                        Das SOL'S Pulse ist ein Herren-Piqué-Polo aus 100 %
                        gekämmter, ringgesponnener Baumwolle. Es verbindet einen
                        klaren, klassischen Look mit angenehmem Komfort.
                      </p>
                      <p>
                        Der 1×1-Rippstrickkragen, die zwei Ton-in-Ton-Knöpfe und
                        das neutrale Größenetikett machen es zur sauberen Basis
                        für Teamwear, Rebranding und Veredelung.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % gekämmte, ringgesponnene Baumwolle</li>
                        <li>Piqué · 170 g/m²</li>
                        <li>Regular Fit · Kurzarm</li>
                        <li>1×1-Rippstrickkragen · 2 Ton-in-Ton-Knöpfe</li>
                        <li>Neutrales Größenetikett im Nacken</li>
                      </ul>
                    </>
                  ) : isKinderSweatshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S COLUMBIA KIDS · 04239
                      </p>
                      <h2>KINDER SWEATSHIRT</h2>
                      <p>
                        Das SOL'S Columbia Kids ist ein klassischer Kinder-
                        Sweater aus 80 % Baumwolle und 20 % recyceltem
                        Polyester. Die innen angeraute Qualität bietet Wärme und
                        ein angenehmes Tragegefühl.
                      </p>
                      <p>
                        Rippstrickbündchen mit Elasthan an Hals, Ärmeln und Saum
                        sorgen für einen bequemen, formstabilen Sitz. Die
                        Jersey-Halbmondpasse und das Nackenband ergänzen den
                        hochwertigen Look.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>80 % Baumwolle · 20 % recycelter Polyester</li>
                        <li>Innen angeraut · 280 g/m²</li>
                        <li>Regular Fit · Langarm</li>
                        <li>Rippstrickbündchen mit Elasthan</li>
                        <li>Neutrales Größenetikett im Nacken</li>
                      </ul>
                    </>
                  ) : isColumbiaSweatshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S COLUMBIA · 03814
                      </p>
                      <h2>{productName.toUpperCase()}</h2>
                      <p>
                        Der SOL'S Columbia ist ein zeitloser Unisex Sweater mit
                        klassischem Schnitt. Die Mischung aus 80 % Baumwolle und
                        20 % recyceltem Polyester bietet Wärme und hohen
                        Tragekomfort.
                      </p>
                      <p>
                        Die angeraute Innenseite, Rippstrickbündchen mit
                        Elasthan sowie Nackenband und Jersey-Halbmondpasse
                        sorgen für Formstabilität und einen sauberen Look.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>80 % Baumwolle, 20 % recycelter Polyester</li>
                        <li>280 g/m² mit angerauter Innenseite</li>
                        <li>Klassischer Unisex-Schnitt</li>
                        <li>Rippstrickbündchen mit Elasthan</li>
                      </ul>
                    </>
                  ) : isFrauenPolo ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S PULSE WOMEN · 04501
                      </p>
                      <h2>FRAUEN POLO</h2>
                      <p>
                        Das SOL'S Pulse Women verbindet eine feminine Passform
                        mit zeitlosem Stil. Das leichte Material aus 100 %
                        gekämmter, ringgesponnener Baumwolle fühlt sich angenehm
                        an und ist für individuelle Veredelung vorbereitet.
                      </p>
                      <p>
                        Der 1×1-Rippstrickkragen, die Ton-in-Ton-Knopfleiste und
                        das neutrale Nackenetikett machen es zur idealen
                        Grundlage für Teamwear und Rebranding.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % gekämmte, ringgesponnene Baumwolle</li>
                        <li>Leichte Qualität mit 170 g/m²</li>
                        <li>Feminine Passform</li>
                        <li>Neutrales Design für Druck und Stick</li>
                      </ul>
                    </>
                  ) : isFrauenTshirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL\'S PIONEER WOMEN · 03579
                      </p>
                      <h2>FRAUEN T-SHIRT</h2>
                      <p>
                        Das SOL\'S Pioneer Women besteht aus 100 % Bio-Baumwolle
                        und fühlt sich weich und natürlich auf der Haut an. Die
                        enzymgewaschene Oberfläche sorgt für eine glatte,
                        angenehme Haptik.
                      </p>
                      <p>
                        Das T-Shirt ist für die Veredelung und individuelle
                        Gestaltung gemacht. Ash enthält 98 % Baumwolle und 2 %
                        Viskose, Grey Melange 85 % Baumwolle und 15 % Viskose.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>100 % Bio-Baumwolle</li>
                        <li>Enzymgewaschene, glatte Oberfläche</li>
                        <li>Feminine Passform</li>
                        <li>Ideal für individuelle Veredelung</li>
                      </ul>
                    </>
                  ) : isMaennerShirt ? (
                    <>
                      <p className="designer-info-kicker">
                        SOL'S BRIGHTON · 17000
                      </p>
                      <h2>MÄNNER HEMD</h2>
                      <p>
                        Das SOL'S Brighton ist ein modernes Langarmhemd aus
                        Stretch-Popeline. Es verbindet Bewegungsfreiheit mit
                        einer klaren, professionellen Optik für Business, Teams
                        und Vereine.
                      </p>
                      <p>
                        Der Kentkragen, die Manschetten mit zwei Ton-in-Ton-
                        Knöpfen und die Easy-Care-Ausrüstung sorgen für einen
                        gepflegten Auftritt im Alltag.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>97 % Baumwolle, 3 % Elasthan</li>
                        <li>Stretch-Popeline · 140 g/m²</li>
                        <li>Slim Fit · Langarm</li>
                        <li>Kentkragen · keine Brusttasche</li>
                        <li>Easy Care · Tear-Away-Label</li>
                      </ul>
                    </>
                  ) : isFrauenShirt ? (
                    <>
                      <p className="designer-info-kicker">SOL'S EDEN · 17015</p>
                      <h2>FRAUEN HEMD</h2>
                      <p>
                        Die SOL'S Eden ist eine taillierte Langarmbluse aus
                        Popeline Stretch. Das leichte Material verbindet einen
                        gepflegten Auftritt mit angenehmer Bewegungsfreiheit.
                      </p>
                      <p>
                        Ein klassischer Kragen mit Knopf, Manschetten mit zwei
                        Ton-in-Ton-Knöpfen und die Easy-Care-Ausrüstung machen
                        sie zur zuverlässigen Basis für Teamwear und
                        individuelle Veredelung.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>97 % Baumwolle, 3 % Elasthan</li>
                        <li>Popeline Stretch · 140 g/m²</li>
                        <li>Taillierter Schnitt</li>
                        <li>Easy Care</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="designer-info-kicker">
                        X.O BY PROMODORO WOMEN HOODY SWEATER · 1781
                      </p>
                      <h2>FRAUEN HOODIE</h2>
                      <p>
                        Der X.O by Promodoro Women Hoody Sweater überzeugt mit
                        einem femininen, schmalen Schnitt und angenehmem
                        Innenfutter. Er eignet sich für individuelle Veredelung,
                        Teamwear und Merchandise.
                      </p>
                      <p>
                        Die zweilagige Kapuze und die elastischen
                        Rippstrickbündchen sorgen für ein komfortables
                        Tragegefühl und eine klare, moderne Passform.
                      </p>
                      <h3>PRODUKT-HIGHLIGHTS</h3>
                      <ul>
                        <li>Schmaler, femininer Schnitt</li>
                        <li>Zweilagige Kapuze für zusätzlichen Komfort</li>
                        <li>Rippstrickbündchen an Ärmeln und Bund</li>
                        <li>Neutrales Größenetikett für deine Veredelung</li>
                      </ul>
                    </>
                  )}
                </div>
                {isMug ? (
                  <dl>
                    <div>
                      <dt>HERSTELLER</dt>
                      <dd>Sublitasse</dd>
                    </div>
                    <div>
                      <dt>MATERIAL</dt>
                      <dd>Keramik</dd>
                    </div>
                    <div>
                      <dt>TRANSFERTECHNIK</dt>
                      <dd>Sublimation</dd>
                    </div>
                  </dl>
                ) : isShopper ? (
                  <dl>
                    <div>
                      <dt>HERSTELLER</dt>
                      <dd>SOL'S</dd>
                    </div>
                    <div>
                      <dt>GESCHLECHT</dt>
                      <dd>Unisex</dd>
                    </div>
                    <div>
                      <dt>LABEL</dt>
                      <dd>Tear Away</dd>
                    </div>
                    <div>
                      <dt>KATEGORIE</dt>
                      <dd>Einkaufstasche</dd>
                    </div>
                    <div>
                      <dt>GRAMMATUR</dt>
                      <dd>140 g/m²</dd>
                    </div>
                    <div>
                      <dt>HENKEL</dt>
                      <dd>Lang</dd>
                    </div>
                  </dl>
                ) : (
                  <dl>
                    <div>
                      <dt>HERSTELLER</dt>
                      <dd>{productManufacturer}</dd>
                    </div>
                    <div>
                      <dt>GESCHLECHT</dt>
                      <dd>{productGender}</dd>
                    </div>
                    <div>
                      <dt>KATEGORIE</dt>
                      <dd>{productCategory}</dd>
                    </div>
                    <div>
                      <dt>PFLEGE</dt>
                      <dd>40 °C waschbar</dd>
                    </div>
                    <div>
                      <dt>GRAMMATUR</dt>
                      <dd>{productWeight}</dd>
                    </div>
                    <div>
                      <dt>{isAnyCap ? "VERSCHLUSS" : "PASSFORM"}</dt>
                      <dd>{productFit}</dd>
                    </div>
                  </dl>
                )}
              </div>
            ) : isOneSizeProduct ? (
              <div className="designer-size-content">
                <p>
                  {isAnyCap
                    ? "Diese Cap ist in einer verstellbaren Einheitsgröße erhältlich."
                    : "Dieses Produkt ist in einer Einheitsgröße erhältlich."}
                </p>
                <div className="designer-size-table">
                  <div>
                    <span>GRÖSSE</span>
                    <span>ONE SIZE</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="designer-size-content">
                <p>Die Maße sind Richtwerte in Zentimetern.</p>
                <div className="designer-size-guide">
                  <img
                    src={sizeGuideShirt}
                    alt="Schema zur Messung von Länge und Brustweite"
                  />
                  <div className="designer-size-table">
                    <div>
                      {["GRÖSSE", ...sizes].map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div>
                      {[
                        "A / B",
                        ...sizes.map((item) => sizeMeasurements[item] || "—"),
                      ].map((item, index) => (
                        <span key={`${item}-${index}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <small>A = Länge · B = Brustweite</small>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {reviewOpen && (
        <div className="designer-review-layer">
          <div className="designer-review">
            <button
              type="button"
              className="designer-review-close"
              onClick={() => setReviewOpen(false)}
            >
              ×
            </button>
            <p>LETZTER BLICK</p>
            <h2>DEIN EIGENER DESIGN</h2>
            <div
              className={`designer-review-mockup ${
                (hasBackDesign && (isConfiguredTextile || isShopper)) ||
                isAnyCap
                  ? "is-double"
                  : ""
              }`}
            >
              <div className="designer-review-side">
                <span>VORNE</span>
                <div className="designer-review-product" data-review-side="front">
                  {isMug ? (
                    <TwoToneMugMockup
                      color={selectedMugColor.swatch}
                      label={selectedMugColor.label}
                      showGuides={false}
                    />
                  ) : (
                    <img
                      className="designer-mockup"
                      src={frontPreviewImage}
                      alt={`Vorderseite ${productName}`}
                      draggable="false"
                    />
                  )}
                  {renderReviewPrint(frontReviewDesign, "front")}
                </div>
              </div>
              {((hasBackDesign && (isConfiguredTextile || isShopper)) ||
                isAnyCap) && (
                <div className="designer-review-side">
                  <span>HINTEN</span>
                  <div className="designer-review-product" data-review-side="back">
                    <img
                      className={`designer-mockup ${
                        isShopper ? "is-shopper-back" : ""
                      }`}
                      src={backPreviewImage}
                      alt={`Rückseite ${productName}`}
                      draggable="false"
                    />
                    {!isAnyCap && renderReviewPrint(backReviewDesign, "back")}
                  </div>
                </div>
              )}
            </div>
            <div className="designer-review-details">
              <span>
                {product.name} · {size}
              </span>
              <div className="designer-review-price"><strong>{designPriceLabel}</strong><PriceLegalNote /></div>
            </div>
            <div className="designer-review-actions">
              <button
                type="button"
              className="designer-back-edit"
              onClick={() => setReviewOpen(false)}
            >
                <b>←</b> ZURÜCK ZUR BEARBEITUNG
            </button>
              <button
                type="button"
                className="btn-red designer-final-cart"
                onClick={() => {
                  setReviewOpen(false)
                  alert(
                    "Die Shopify-Verknüpfung für personalisierte Produkte wird im nächsten Schritt eingerichtet.",
                  )
                }}
              >
                IN DEN WARENKORB <b>→</b>
              </button>
            </div>
          </div>
        </div>
      )}
      {copyrightUploadOpen && (
        <div className="legal-dialog-layer" role="dialog" aria-modal="true" aria-labelledby="copyright-upload-title">
          <button type="button" className="legal-dialog-backdrop" aria-label="Fenster schließen" onClick={() => setCopyrightUploadOpen(false)} />
          <section className="legal-dialog copyright-upload-dialog">
            <button type="button" className="legal-dialog-close" aria-label="Schließen" onClick={() => setCopyrightUploadOpen(false)}>×</button>
            <p className="legal-kicker">BILD HOCHLADEN</p>
            <h2 id="copyright-upload-title">URHEBERRECHT BESTÄTIGEN</h2>
            <p>Bitte bestätige vor dem ersten Upload, dass du dein Motiv rechtmäßig verwenden darfst.</p>
            <label className="copyright-confirmation">
              <input type="checkbox" checked={copyrightAccepted} onChange={(event) => setCopyrightAccepted(event.target.checked)} />
              <span>Mit dem Hochladen bestätige ich, dass ich die erforderlichen Urheber- bzw. Nutzungsrechte an diesem Bild besitze und das Motiv nicht gegen deutsches Recht verstößt.</span>
            </label>
            {copyrightAccepted ? (
              <label className="btn-red copyright-confirm-button" onClick={confirmCopyrightUpload}>
                WEITER ZUR DATEIAUSWAHL →
                <input
                  className="copyright-file-input"
                  type="file"
                  accept="image/png,image/jpeg"
                  onClick={(event) => { event.currentTarget.value = "" }}
                  onChange={(event) => {
                    upload(event.target.files?.[0])
                    setCopyrightUploadOpen(false)
                  }}
                />
              </label>
            ) : (
              <button type="button" className="btn-red copyright-confirm-button" disabled>WEITER ZUR DATEIAUSWAHL →</button>
            )}
          </section>
        </div>
      )}
      {helpStep !== null && (
        <div className="designer-help-layer">
          <div className="designer-help">
            <span>
              {helpStep + 1} / {help.length}
            </span>
            <p>{help[helpStep]}</p>
            <div>
              {helpStep > 0 && (
                <button type="button" onClick={() => setHelpStep(helpStep - 1)}>
                  ZURÜCK
                </button>
              )}
              {helpStep < help.length - 1 ? (
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => setHelpStep(helpStep + 1)}
                >
                  WEITER
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => setHelpStep(null)}
                >
                  VERSTANDEN
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {forbiddenThemesOpen && (
        <div
          className="designer-forbidden-layer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forbidden-themes-title"
          onPointerDown={() => setForbiddenThemesOpen(false)}
        >
          <section
            className="designer-forbidden-dialog"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="designer-forbidden-close"
              onClick={() => setForbiddenThemesOpen(false)}
              aria-label="Hinweis schließen"
            >
              ×
            </button>
            <p className="designer-dialog-kicker">WICHTIGER HINWEIS</p>
            <h2 id="forbidden-themes-title">
              WELCHE MOTIVE KÖNNEN NICHT GEDRUCKT WERDEN?
            </h2>
            <p className="designer-forbidden-lead">
              Wir müssen Druckaufträge ablehnen, wenn sie Marken, unzulässige
              Inhalte oder bearbeitete Darstellungen geschützter Marken enthalten.
            </p>
            <div className="designer-forbidden-rules">
              <article>
                <h3>MARKEN &amp; URHEBERRECHT</h3>
                <p>
                  Nicht druckbar sind fremde Marken, Logos und urheberrechtlich
                  geschützte Bilder – auch dann nicht, wenn sie verändert wurden.
                </p>
              </article>
              <article>
                <h3>HASS, GEWALT &amp; EXTREMISMUS</h3>
                <p>
                  Keine Kriegspropaganda, Hassrede oder Herabwürdigung aufgrund
                  von Herkunft, Religion oder Nationalität. Ebenfalls verboten
                  sind Gewaltverherrlichung, Terrorismus, extremistisches Material
                  sowie NS-, Neonazi- und rechtsextreme Symbole, einschließlich
                  Symbolen mit Hakenkreuz-Elementen.
                </p>
              </article>
              <article>
                <h3>POLITIK &amp; PERSONEN</h3>
                <p>
                  Nicht zulässig sind emotional wertende politische Botschaften,
                  Aufrufe zu politischen Handlungen, Inhalte zu politisch
                  bedeutsamen Ereignissen sowie Beleidigungen oder Gewaltaufrufe
                  gegen Amtsträgerinnen und Amtsträger.
                </p>
              </article>
              <article>
                <h3>JUGENDSCHUTZ &amp; GESUNDHEIT</h3>
                <p>
                  Pornografische Inhalte, die Verherrlichung von Grausamkeit,
                  Suizidaufrufe oder Hinweise zu Selbstverletzung sind ausgeschlossen.
                  Das gilt ebenso für die Bewerbung von Alkohol, Tabak, Drogen,
                  Rauschmitteln und deren Beschaffung oder Herstellung.
                </p>
              </article>
              <article>
                <h3>VERTRAULICHE INFORMATIONEN</h3>
                <p>
                  Inhalte mit Staats-, Geschäfts- oder Dienstgeheimnissen sowie
                  verleumderische Aussagen können nicht verarbeitet werden.
                </p>
              </article>
            </div>
            <div className="designer-forbidden-footer">
              <span>
                Im Zweifel prüfen wir dein Motiv vor dem Druck individuell.
              </span>
              <button
                type="button"
                className="btn-red"
                onClick={() => setForbiddenThemesOpen(false)}
              >
                VERSTANDEN
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false)
  useEffect(() => {
    const openShippingDialog = () => setShippingDialogOpen(true)
    window.addEventListener("pottlerkinder-open-shipping", openShippingDialog)
    return () => window.removeEventListener("pottlerkinder-open-shipping", openShippingDialog)
  }, [])
  const pages: Record<string, React.ReactNode> = {
    "/katalog": <CatalogPage />,
    "/sale": <SalePage />,
    "/warenkorb": <CartPage />,
    "/unternehmen": <CompanyPage />,
    "/ueber-uns": <AboutPage />,
    "/geschichte": <HistoryPage />,
    "/zechen": <CollieriesPage />,
    "/blog": <BlogPage />,
    "/account": <AccountPage />,
    "/account/callback": <AccountCallbackPage />,
    "/designer": <DesignerStudio />,
  }
  const productHandle =
    window.location.pathname.match(/^\/katalog\/([^/]+)$/)?.[1]
  const content = productHandle ? (
    <ShopifyProductPage handle={decodeURIComponent(productHandle)} />
  ) : (
    LEGAL_PAGES[window.location.pathname] ? <LegalPage path={window.location.pathname} /> : (pages[window.location.pathname] ?? <HomePage />)
  )
  return <>{content}<ShippingCostsDialog open={shippingDialogOpen} onClose={() => setShippingDialogOpen(false)} /></>
}
