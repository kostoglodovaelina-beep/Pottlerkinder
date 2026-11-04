import { useRef, type CSSProperties, type ReactNode } from "react"
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiRefreshCcw,
  FiShoppingBag,
  FiTruck,
  FiX,
  FiZoomIn,
} from "react-icons/fi"
import { catalogLabel } from "@/lib/catalog"
import {
  findProductVariant,
  formatVariantPrice,
  type ProductVariant,
} from "@/lib/product"
import "../styles/components/product-page.css"
import { openServiceInfo } from "@/lib/service-info"

type Props = {
  product: any
  images: any[]
  selectedImage: number
  size: string
  selectedColor: string
  variant: ProductVariant | undefined
  inCart: boolean
  cartStatus: "idle" | "loading" | "success" | "error"
  onImageChange: (index: number) => void
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onAddToCart: () => void
  renderPriceNote: () => ReactNode
}

export default function ProductView({
  product,
  images,
  selectedImage,
  size,
  selectedColor,
  variant,
  inCart,
  cartStatus,
  onImageChange,
  onColorChange,
  onSizeChange,
  onAddToCart,
  renderPriceNote,
}: Props) {
  const zoomRef = useRef<HTMLDialogElement>(null)
  const image = images[selectedImage] || images[0]
  const colorName = (color: string, index: number) =>
    product.colorOptions?.find((option: any) => option.value === color)
      ?.label || `Farbe ${index + 1}`
  const selectedColorName = colorName(
    selectedColor,
    product.colors.indexOf(selectedColor),
  )
  const sizeName = size === "ALLE" ? "One Size" : size
  const price = formatVariantPrice(variant?.price) || product.price
  const comparePrice =
    variant?.compareAtPrice &&
    Number(variant.compareAtPrice) > Number(variant.price)
      ? formatVariantPrice(variant.compareAtPrice)
      : null
  const available = Boolean(variant?.id)
  const pending = cartStatus === "loading"
  const navigateImage = (direction: number) =>
    onImageChange((selectedImage + direction + images.length) % images.length)
  const categoryURL = `/katalog?category=${encodeURIComponent(product.category)}`

  return (
    <main className="product-page">
      <div className="pd-container">
        <nav className="pd-breadcrumbs" aria-label="Brotkrumennavigation">
          <a href="/katalog">Katalog</a>
          <span aria-hidden="true">/</span>
          <a href={categoryURL}>{catalogLabel(product.category)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="pd-layout">
          <section className="pd-media" aria-label="Produktbilder">
            <div className="pd-image-stage">
              <button
                type="button"
                className="pd-image-open"
                aria-label="Produktbild vergrößern"
                onClick={() => zoomRef.current?.showModal()}
              >
                <img
                  src={image?.url || product.image}
                  alt={image?.altText || product.name}
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="pd-zoom-hint">
                  <FiZoomIn aria-hidden="true" />
                </span>
              </button>
              {comparePrice && <span className="pd-sale-label">Sale</span>}
            </div>
            <div className="pd-gallery-bar">
              {images.length > 1 && (
                <div className="pd-thumbnails" aria-label="Bildauswahl">
                  {images.map((image: any, index: number) => (
                    <button
                      type="button"
                      key={`${image.url}-${index}`}
                      aria-label={`Bild ${index + 1} anzeigen`}
                      aria-pressed={selectedImage === index}
                      onClick={() => onImageChange(index)}
                    >
                      <img src={image.url} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              <div className="pd-image-navigation">
                {images.length > 1 && (
                  <button
                    type="button"
                    aria-label="Vorheriges Bild"
                    onClick={() => navigateImage(-1)}
                  >
                    <FiChevronLeft aria-hidden="true" />
                  </button>
                )}
                <span>
                  {String(selectedImage + 1).padStart(2, "0")}{" "}
                  <span>/ {String(images.length).padStart(2, "0")}</span>
                </span>
                {images.length > 1 && (
                  <button
                    type="button"
                    aria-label="Nächstes Bild"
                    onClick={() => navigateImage(1)}
                  >
                    <FiChevronRight aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <a className="pd-back" href={categoryURL}>
              <FiArrowLeft aria-hidden="true" /> Zurück zum Katalog
            </a>
          </section>

          <section className="pd-buybox" aria-labelledby="pd-title">
            <div className="pd-kicker">
              <a href={categoryURL}>{catalogLabel(product.category)}</a>
              <span aria-hidden="true">/</span>
              <span>{catalogLabel(product.gender)}</span>
            </div>
            <h1 id="pd-title">{product.name}</h1>
            {variant?.sku && <p className="pd-sku">Art.-Nr. {variant.sku}</p>}
            <div className="pd-pricing" aria-live="polite" aria-atomic="true">
              <div className="pd-price-value">
                <strong>{price}</strong>
                {comparePrice && <s>{comparePrice}</s>}
              </div>
              {renderPriceNote()}
            </div>

            <div className="pd-choices">
              <fieldset className="pd-option" disabled={pending}>
                <legend>
                  Farbe <span>{selectedColorName}</span>
                </legend>
                <div className="pd-colors">
                  {product.colors.map((color: string, index: number) => (
                    <button
                      type="button"
                      key={`${color}-${index}`}
                      aria-label={`Farbe ${colorName(color, index)}`}
                      aria-pressed={selectedColor === color}
                      title={colorName(color, index)}
                      style={{ "--swatch": color } as CSSProperties}
                      onClick={() => onColorChange(color)}
                    >
                      <span>
                        {selectedColor === color && (
                          <FiCheck aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="pd-option" disabled={pending}>
                <legend>
                  Größe <span>{sizeName}</span>
                </legend>
                <div className="pd-sizes">
                  {product.sizes.map((item: string) => {
                    const availableSize = Boolean(
                      findProductVariant(product, item, selectedColor),
                    )
                    return (
                      <button
                        type="button"
                        key={item}
                        disabled={!availableSize}
                        data-unavailable={!availableSize || undefined}
                        aria-pressed={size === item}
                        aria-label={`Größe ${
                          item === "ALLE" ? "One Size" : item
                        }${availableSize ? "" : " – nicht verfügbar"}`}
                        title={
                          availableSize
                            ? undefined
                            : "In dieser Farbe nicht verfügbar"
                        }
                        onClick={() => onSizeChange(item)}
                      >
                        {item === "ALLE" ? "One Size" : item}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            </div>
            <div
              className={`pd-availability ${available ? "" : "is-unavailable"}`}
              role="status"
            >
              <span aria-hidden="true" />
              {available
                ? "Diese Auswahl ist verfügbar"
                : "Diese Kombination ist nicht verfügbar. Bitte wähle eine andere Größe."}
            </div>
            <div className="pd-selection-summary">
              <span>Deine Auswahl</span>
              <strong>
                {selectedColorName} <span aria-hidden="true">/</span> {sizeName}
              </strong>
            </div>
            <button
              type="button"
              className={`pd-add-to-cart ${inCart ? "is-success" : ""}`}
              onClick={onAddToCart}
              disabled={pending || !available}
              aria-busy={pending}
            >
              {inCart ? (
                <FiCheck aria-hidden="true" />
              ) : (
                <FiShoppingBag aria-hidden="true" />
              )}
              <span>
                {pending
                  ? "WIRD HINZUGEFÜGT"
                  : !available
                    ? "NICHT VERFÜGBAR"
                    : inCart
                      ? "IM WARENKORB"
                      : cartStatus === "error"
                        ? "ERNEUT VERSUCHEN"
                        : "IN DEN WARENKORB"}
              </span>
              <FiArrowRight aria-hidden="true" />
            </button>
            <div className="pd-cart-feedback" role="status" aria-live="polite">
              {cartStatus === "error" ? (
                <p className="is-error">
                  Der Artikel konnte nicht hinzugefügt werden. Bitte versuche es
                  erneut.
                </p>
              ) : inCart ? (
                <a href="/warenkorb">
                  Dein Artikel ist im Warenkorb. Warenkorb ansehen{" "}
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div className="pd-service-links">
              <button type="button" onClick={() => openServiceInfo("shipping")}>
                <FiTruck aria-hidden="true" />
                <span>
                  Versand mit DHL / GLS
                  <small>Lieferung &amp; Versandkosten</small>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </button>
              <button type="button" onClick={() => openServiceInfo("returns")}>
                <FiRefreshCcw aria-hidden="true" />
                <span>
                  Rückgabe &amp; Umtausch
                  <small>Informationen zu deiner Bestellung</small>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </button>
            </div>
            <a href="/designer" className="pd-personalize">
              <FiEdit3 aria-hidden="true" />
              <span>
                Lieber dein eigenes Motiv?
                <strong>Im Designstudio selbst gestalten</strong>
              </span>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </section>
        </div>

        <section
          id="details"
          className="pd-information"
          aria-label="Produktinformationen"
        >
          <div className="pd-information-heading">
            <span>Gut zu wissen</span>
            <h2>Dein Produkt im Detail.</h2>
          </div>
          <div className="pd-information-content">
            <details open>
              <summary>
                Beschreibung <FiChevronDown aria-hidden="true" />
              </summary>
              <div className="pd-description">
                {product.description || product.short || product.name}
              </div>
            </details>
            <details open>
              <summary>
                Produktdetails <FiChevronDown aria-hidden="true" />
              </summary>
              <dl>
                <div>
                  <dt>Kategorie</dt>
                  <dd>{catalogLabel(product.category)}</dd>
                </div>
                <div>
                  <dt>Für wen</dt>
                  <dd>{catalogLabel(product.gender)}</dd>
                </div>
                <div>
                  <dt>Farben</dt>
                  <dd>
                    {product.colorOptions
                      ?.map((option: any) => option.label)
                      .join(", ") || `${product.colors.length} Farben`}
                  </dd>
                </div>
                <div>
                  <dt>Größen</dt>
                  <dd>
                    {product.sizes
                      .map((item: string) =>
                        item === "ALLE" ? "One Size" : item,
                      )
                      .join(", ")}
                  </dd>
                </div>
                {variant?.sku && (
                  <div>
                    <dt>Art.-Nr.</dt>
                    <dd>{variant.sku}</dd>
                  </div>
                )}
              </dl>
            </details>
          </div>
        </section>
      </div>

      <dialog
        ref={zoomRef}
        className="pd-zoom"
        aria-label={`${product.name} – Produktbild`}
        onClick={(event) => {
          if (event.target === event.currentTarget) zoomRef.current?.close()
        }}
      >
        <button
          type="button"
          className="pd-zoom-close"
          aria-label="Bildansicht schließen"
          onClick={() => zoomRef.current?.close()}
        >
          <FiX aria-hidden="true" />
        </button>
        <img
          src={image?.url || product.image}
          alt={image?.altText || product.name}
        />
        {images.length > 1 && (
          <div className="pd-zoom-navigation">
            <button
              type="button"
              aria-label="Vorheriges vergrößertes Bild"
              onClick={() => navigateImage(-1)}
            >
              <FiChevronLeft aria-hidden="true" />
            </button>
            <span>
              {selectedImage + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Nächstes vergrößertes Bild"
              onClick={() => navigateImage(1)}
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </main>
  )
}
