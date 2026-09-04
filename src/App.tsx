import { useState, useEffect, useMemo, useRef } from "react"
import { FaBeer, FaChild, FaFemale, FaGem, FaHatCowboy, FaMale, FaMugHot, FaRegSquare, FaRegStickyNote, FaShoppingBag, FaTags, FaThumbtack, FaTshirt, FaUsers } from "react-icons/fa"
import { GiPoloShirt } from "react-icons/gi"

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
import pageCompany from "@/imports/assets/pages/company.webp"
import pageHistory from "@/imports/assets/pages/history.webp"
import pageCollieries from "@/imports/assets/pages/collieries.webp"
import pageBlog from "@/imports/assets/pages/blog.webp"
import { shopCart } from "@/lib/shopify"

// ─── Shared padding value (12vw clamped) ──────────────────────────────────────
const SECTION_PAD = "clamp(16px, 12vw, 210px)"

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

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
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
          <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
            {/* EIGENER DESIGN */}
            <button
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
            <button
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
                LOGIN
              </span>
            </button>
            {/* WARENKORB */}
            <button
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
            <button aria-label="Login" className="btn-glass mobile-icon-btn">
              <img src={imgAccount} alt="" className="mobile-icon-glyph" />
            </button>
            <button
              aria-label="Warenkorb"
              className="btn-glass mobile-icon-btn"
            >
              <img src={imgCart} alt="" className="mobile-icon-glyph" />
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
            <button
              className="mobile-menu-action mobile-menu-design text-left mt-1"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: "2px",
              }}
            >
              EIGENER DESIGN
            </button>
          </div>
        )}
      </div>
    </header>
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
            <button
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
            </button>
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
      onClick={() => { window.location.href = `/katalog/${product.slug}` }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") window.location.href = `/katalog/${product.slug}`
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
        <button onClick={(event) => event.stopPropagation()} className="btn-wishlist absolute top-3 right-3 w-9 h-9 rounded-full bg-black/45 flex items-center justify-center">
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
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              color: "white",
            }}
          >
            {product.price}
          </p>
        </div>
        <button className="btn-ansehen flex items-center gap-1.5 px-4 py-2.5 rounded-[6px]">
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
        </button>
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
        className={`bestseller-viewport w-full overflow-hidden ${drag ? "is-dragging" : ""}`}
        ref={carouselRef}
        onPointerDown={(event) => {
          if (!canLoopBestsellers || event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          setDrag({ x: event.clientX, position: carouselPosition.current })
        }}
        onPointerMove={(event) => {
          if (!canLoopBestsellers || !drag || !carouselTrackRef.current) return
          let next = drag.position - (event.clientX - drag.x)
          const unit = carouselTrackRef.current.querySelector<HTMLElement>(".bestseller-group")?.offsetWidth ?? 0
          if (unit) {
            while (next <= 0) next += unit
            while (next >= unit * 2) next -= unit
          }
          carouselPosition.current = next
          carouselTrackRef.current.style.transform = `translate3d(${-next}px,0,0)`
        }}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
      >
        <div style={{ paddingLeft: SECTION_PAD }}>
          <div
            ref={carouselTrackRef}
            className={`bestseller-track flex ${canLoopBestsellers ? "" : "justify-center"}`}
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
      title: "Gratis Versand ab 80€",
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
              {[
                "Zahlung",
                "Versandkosten",
                "Rücksendung & Umtausch",
                "Widerrufsbelehrung",
                "Kontakt",
              ].map((link) => (
                <p
                  key={link}
                  className="footer-link mb-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    letterSpacing: "1.5px",
                    color: "#ccc",
                    lineHeight: 2,
                  }}
                >
                  {link}
                </p>
              ))}
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
                {["DHL", "Hermes"].map((s) => (
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
                Lieferzeit 3–5 Werktage. Kostenloser Versand ab 80 €.
                Expresslieferung ab 9,99 €.
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
              "Maloche/Jobs",
              "AGB",
              "Datenschutz",
              "Impressum",
              "Widerrufsbelehrung",
            ].map((link) => (
              <span
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
              </span>
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
            © 2026 Pottlerkinder GmbH · Alle Preise inkl. 19% MwSt. zzgl.
            Versandkosten
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function PageShell({ children, inner = false }: { children: React.ReactNode; inner?: boolean }) {
  return (
    <div className={`w-full min-h-screen flex flex-col ${inner ? "page-shell-inner" : "bg-[#0a0a0a]"}`}>
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
    name: `${TEST_PREFIXES[index % TEST_PREFIXES.length]} ${category === "T-SHIRTS" ? "T-SHIRT" : category.slice(0, -1)} ${number}`,
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
  HOODIES: "HOODIES", SWEATSHIRTS: "SWEATSHIRTS", "T-SHIRTS": "T-SHIRTS", TSHIRTS: "T-SHIRTS", POLOS: "POLOS",
  ACCESSOIRES: "ACCESSOIRES", ACCESSORIES: "ACCESSOIRES", "GLÄSER & TASSEN": "GLÄSER & TASSEN", "GLASER & TASSEN": "GLÄSER & TASSEN", "DTF-TRANSFERS": "DTF-TRANSFERS",
}
const SHOPIFY_GENDER_MAP: Record<string, string> = { MAENNER: "MÄNNER", MANNER: "MÄNNER", FRAUEN: "FRAUEN", KINDER: "KINDER", UNISEX: "UNISEX" }
const SHOPIFY_COLORS: Record<string, string> = { schwarz: "#161616", black: "#161616", weiß: "#f4f4f4", weiss: "#f4f4f4", white: "#f4f4f4", rot: "#cf3131", red: "#cf3131", grau: "#777", grey: "#777", gray: "#777", blau: "#3189d6", blue: "#3189d6", grün: "#36b95a", green: "#36b95a" }

function shopifyCatalogProduct(product: any) {
  const tags = product.tags || []
  const tag = (prefix: string) => tags.find((item: string) => item.toLowerCase().startsWith(prefix))?.slice(prefix.length)
  const variants = product.variants?.nodes || []
  const option = (name: string) => variants.flatMap((variant: any) => variant.selectedOptions || []).filter((item: any) => item.name.toLowerCase() === name).map((item: any) => item.value)
  const categoryValue = (tag("category_") || product.productType || "T-SHIRTS").toUpperCase()
  const category = SHOPIFY_CATEGORY_MAP[categoryValue] || "T-SHIRTS"
  const genderValue = (tag("gender_") || "UNISEX").toUpperCase()
  const gender = SHOPIFY_GENDER_MAP[genderValue] || "UNISEX"
  const selectedColors = Array.from(new Set(option("farbe").concat(option("color")))).map((item: string) => SHOPIFY_COLORS[item.toLowerCase()] || "#777")
  const selectedSizes = Array.from(new Set(option("größe").concat(option("groesse"), option("size"))))
  const firstVariant = variants[0]
  const formatPrice = (value: string | null | undefined) => value ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(Number(value)) : "–"
  return {
    id: product.id,
    slug: product.handle,
    image: product.featuredMedia?.preview?.image?.url || imgProduct1,
    name: product.title,
    category,
    sub: tag("sub_")?.toUpperCase(),
    gender,
    colors: selectedColors.length ? selectedColors : ["#161616"],
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
    fetch(`/api/products${handle ? `?handle=${encodeURIComponent(handle)}` : ""}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Shopify products unavailable")))
      .then((data) => active && setProducts((data.products || []).map(shopifyCatalogProduct)))
      .catch((requestError) => active && setError(requestError.message))
    return () => { active = false }
  }, [handle])
  return { products, error }
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
    gender: <><circle cx="12" cy="7" r="3" /><path d="M6.5 20c.5-4 2.4-6 5.5-6s5 2 5.5 6" /></>,
    category: <><path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z" /><path d="M4 12.5 12 17l8-4.5M4 17l8 4 8-4" /></>,
    color: <><path d="M12 3a7 7 0 0 0 0 14h1.2a1.8 1.8 0 0 1 1.7 2.4A1.2 1.2 0 0 0 16 21a7 7 0 0 0-4-18Z" /><circle cx="7.8" cy="10" r=".8" fill="currentColor" /><circle cx="11.5" cy="6.8" r=".8" fill="currentColor" /><circle cx="16" cy="10" r=".8" fill="currentColor" /></>,
    size: <><path d="m5 5 14 14M7 3l14 14M3 7l14 14" /><path d="M4 20 20 4" /></>,
  }
  return <p className="catalog-filter-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>{children}</p>
}

function FilterOptionIcon({ label }: { label: string }) {
  if (label === "HOODIES") return <svg viewBox="0 0 24 24" aria-hidden="true" className="catalog-filter-option-icon catalog-garment-icon"><path fill="currentColor" fillRule="evenodd" d="M8 3.3c-2 .2-3.5 1.5-4.3 3.3L2 11.8l3.1 2.1 1.7-1.4V21h4.1v-5h2.2v5h4.1v-8.5l1.7 1.4 3.1-2.1-1.7-5.2c-.8-1.8-2.3-3.1-4.3-3.3L15.3 7H8.7L8 3.3Zm2.4 2c.5-.5 2.7-.5 3.2 0L14.1 6H9.9l.5-.7Z"/><path d="M9.2 9.6c.7.6 1.6.9 2.8.9s2.1-.3 2.8-.9" fill="none" stroke="#1a1a1a" strokeWidth="1.15" strokeLinecap="round"/></svg>
  if (label === "SWEATSHIRTS") return <svg viewBox="0 0 24 24" aria-hidden="true" className="catalog-filter-option-icon catalog-garment-icon"><path fill="currentColor" fillRule="evenodd" d="m8 4.2-4 2.4-2 5.2 3.2 2.1 1.7-1.4V21h10.2v-8.5l1.7 1.4 3.2-2.1-2-5.2-4-2.4-1 2.2H9l-1-2.2Zm2 1.5c.5.5 1.2.8 2 .8s1.5-.3 2-.8l.5 1.1c-.6.6-1.4.9-2.5.9s-1.9-.3-2.5-.9l.5-1.1Z"/><path d="M7 18.7h10M4.1 10.3l1.5 1M19.9 10.3l-1.5 1" fill="none" stroke="#1a1a1a" strokeWidth="1.15" strokeLinecap="round"/></svg>
  const icons = {
    ALLE: FaTags, MÄNNER: FaMale, FRAUEN: FaFemale, KINDER: FaChild, UNISEX: FaUsers,
    "T-SHIRTS": FaTshirt, POLOS: GiPoloShirt,
    ACCESSOIRES: FaShoppingBag, "GLÄSER & TASSEN": FaMugHot, "DTF-TRANSFERS": FaRegStickyNote,
    KOPFBEDECKUNG: FaHatCowboy, SHOPPER: FaShoppingBag, SCHMUCK: FaGem, PINS: FaThumbtack,
    TASSEN: FaMugHot, BIERGLÄSER: FaBeer, UNTERSETZER: FaRegSquare, "FÜR KLEIDUNG & TEXTILIEN": FaRegStickyNote,
  }
  const Icon = icons[label as keyof typeof icons] || FaTags
  return <Icon aria-hidden="true" className="catalog-filter-option-icon" />
}

function CatalogPage() {
  const { products: shopifyProducts, error: shopifyError } = useShopifyCatalog()
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
  const products = catalogProducts.filter(
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
      (nonTextileCategory || size === "ALLE" || product.sizes.includes(size)) &&
      (nonTextileCategory ||
        !color ||
        (color === "multi" && product.colors.length > 1) ||
        product.colors.includes(color)),
  ).sort((a, b) =>
    sort === "NIEDRIGSTER PREIS"
      ? Number(a.price.replace(",", ".")) - Number(b.price.replace(",", "."))
      : sort === "HÖCHSTER PREIS"
        ? Number(b.price.replace(",", ".")) - Number(a.price.replace(",", "."))
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
                  <button onClick={() => setSub("ALLE")} className={sub === "ALLE" ? "is-active" : ""}><FilterOptionIcon label="ALLE" />ALLE</button>
                  {subcategories.map((item) => <button key={item} onClick={() => setSub(item)} className={sub === item ? "is-active" : ""}><FilterOptionIcon label={item} />{item}</button>)}
                </div>
              )}
            </div>
            <div className={`catalog-filter ${nonTextileCategory ? "is-disabled" : ""}`}>
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
            <div className={`catalog-filter ${nonTextileCategory ? "is-disabled" : ""}`}>
              <FilterLabel type="size">GRÖSSE</FilterLabel>
              <span className={`size-filter-label ${gender === "KINDER" ? "is-disabled" : ""}`}>ERWACHSENE</span>
              <div className={`size-filter-grid ${gender === "KINDER" ? "is-disabled" : ""}`}>
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
              <span className={`size-filter-label size-filter-kids ${gender === "KINDER" ? "is-priority" : ""}`}>KINDER</span>
              <div className={`size-filter-grid ${gender === "KINDER" ? "is-priority" : ""}`}>
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
                    <strong>{product.price}</strong>
                  </div>
                </article>
              ))}
            </div>
            {shopifyProducts === null && !shopifyError && (
              <div className="catalog-no-results">SHOPIFY KATALOG WIRD GELADEN.</div>
            )}
            {shopifyProducts !== null && products.length === 0 && (
              <div className="catalog-no-results">
                {shopifyError ? "SHOPIFY KATALOG IST MOMENTAN NICHT VERFÜGBAR." : "KEINE PRODUKTE FÜR DIESE AUSWAHL."}
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
  const [page, setPage] = useState(1)
  const resultsRef = useRef<HTMLElement>(null)
  const perPage = 20
  const saleProducts = (shopifyProducts ?? []).filter((product) => product.compareAtPrice)
  const totalPages = Math.max(1, Math.ceil(saleProducts.length / perPage))
  const products = saleProducts.slice((page - 1) * perPage, page * perPage)
  const changePage = (nextPage: number) => {
    setPage(nextPage)
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0)
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
                  <strong>
                    <s>{product.price}</s>{" "}
                    {product.price}
                  </strong>
                </div>
              </article>
            ))}
          </div>
          {shopifyProducts === null && !shopifyError && (
            <div className="catalog-no-results">SHOPIFY SALE WIRD GELADEN.</div>
          )}
          {shopifyProducts !== null && products.length === 0 && (
            <div className="catalog-no-results">
              {shopifyError ? "SHOPIFY SALE IST MOMENTAN NICHT VERFÜGBAR." : "AKTUELL SIND KEINE SALE-ARTIKEL VERFÜGBAR."}
            </div>
          )}
          {totalPages > 1 && (
            <nav className="catalog-pagination" aria-label="Sale Seiten">
              <button type="button" onClick={() => changePage(Math.max(1, page - 1))} disabled={page === 1}>← ZURÜCK</button>
              <span>{page} / {totalPages}</span>
              <button type="button" onClick={() => changePage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>NÄCHSTE 20 →</button>
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
        <p className="catalog-no-results">{error ? "DIESER ARTIKEL IST NICHT VERFÜGBAR." : "ARTIKEL WIRD GELADEN."}</p>
      </main>
    </PageShell>
  )
}

function ProductPage({
  product,
}: {
  product: any
}) {
  const [size, setSize] = useState(product.sizes[0])
  const [cartStatus, setCartStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [cartError, setCartError] = useState("")
  const addToCart = async () => {
    const variant = product.variants?.find((item: any) =>
      item.selectedOptions?.some((option: any) =>
        ["größe", "groesse", "size"].includes(option.name.toLowerCase()) && option.value === size,
      ),
    ) || product.variants?.[0]
    if (!variant?.id) {
      setCartStatus("error")
      return
    }
    setCartStatus("loading")
    setCartError("")
    try {
      const cartId = window.localStorage.getItem("pottlerkinder-cart-id")
      const response = cartId
        ? await shopCart.add(cartId, [{ merchandiseId: variant.id, quantity: 1 }])
        : await shopCart.create([{ merchandiseId: variant.id, quantity: 1 }])
      const cart = (response as { cart: { id: string } }).cart
      window.localStorage.setItem("pottlerkinder-cart-id", cart.id)
      setCartStatus("success")
    } catch (error) {
      window.localStorage.removeItem("pottlerkinder-cart-id")
      setCartError(error instanceof Error ? error.message : "Unbekannter Shopify-Fehler")
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
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail-copy">
              <p>
                {product.category} · {product.gender}
              </p>
              <h1>{product.name}</h1>
              <strong>{product.price}</strong>
              <p className="product-detail-lead">{product.description}</p>
              <div className="product-option">
                <span>FARBE</span>
                <div>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      aria-label="Farbe"
                      className="catalog-swatch is-selected"
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
                      key={item}
                      onClick={() => setSize(item)}
                      className={size === item ? "is-active" : ""}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn-red product-cart-button" onClick={addToCart} disabled={cartStatus === "loading"}>
                {cartStatus === "loading" ? "WIRD HINZUGEFÜGT" : "IN DEN WARENKORB"} <span>→</span>
              </button>
              {cartStatus === "success" && <p className="product-cart-feedback">IM WARENKORB GESPEICHERT.</p>}
              {cartStatus === "error" && <p className="product-cart-feedback is-error">WARENKORB KONNTE NICHT AKTUALISIERT WERDEN: {cartError}</p>}
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

export default function App() {
  const pages: Record<string, React.ReactNode> = {
    "/katalog": <CatalogPage />,
    "/sale": <SalePage />,
    "/unternehmen": <CompanyPage />,
    "/ueber-uns": <AboutPage />,
    "/geschichte": <HistoryPage />,
    "/zechen": <CollieriesPage />,
    "/blog": <BlogPage />,
  }
  const productHandle = window.location.pathname.match(/^\/katalog\/([^/]+)$/)?.[1]
  return productHandle ? <ShopifyProductPage handle={decodeURIComponent(productHandle)} /> : (pages[window.location.pathname] ?? <HomePage />)
}
