import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react"
import { FiArrowRight, FiHeart } from "react-icons/fi"
import { catalogLabel } from "@/lib/catalog"
import "../styles/components/catalog-page.css"
import "../styles/components/bestseller-carousel.css"

type Props = {
  products: any[]
  loading: boolean
  renderPriceNote: () => ReactNode
}

type Drag = {
  x: number
  y: number
  position: number
  pointerId: number
}

export default function BestsellerCarousel({
  products,
  loading,
  renderPriceNote,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const position = useRef(0)
  const groupWidth = useRef(0)
  const drag = useRef<Drag | null>(null)
  const moved = useRef(false)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [pointerDown, setPointerDown] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [resumingFromDrag, setResumingFromDrag] = useState(false)
  const [autoPlay, setAutoPlay] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [favorites, setFavorites] = useState<string[]>([])
  const canLoop = products.length > 1

  const draw = (next: number) => {
    const unit = groupWidth.current
    position.current =
      unit > 0 ? unit + ((((next - unit) % unit) + unit) % unit) : 0
    if (trackRef.current)
      trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`
  }

  useEffect(() => {
    const track = trackRef.current
    const group = track?.querySelector<HTMLElement>(".bestseller-group")
    if (!track || !group) return
    const measure = () => {
      const unit = group.getBoundingClientRect().width
      const progress = groupWidth.current
        ? position.current / groupWidth.current
        : 1
      groupWidth.current = canLoop ? unit : 0
      draw(canLoop ? progress * unit : 0)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(group)
    // Repeated groups are visual copies, not extra keyboard stops.
    track
      .querySelectorAll<HTMLElement>(
        '[aria-hidden="true"] a, [aria-hidden="true"] button',
      )
      .forEach((element) => {
        element.tabIndex = -1
      })
    return () => observer.disconnect()
  }, [products.length, canLoop])

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setAutoPlay(!preference.matches)
    preference.addEventListener("change", onChange)
    return () => preference.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (
      !canLoop ||
      !autoPlay ||
      keyboardFocused ||
      pointerDown ||
      (hovered && !resumingFromDrag)
    )
      return
    let frame = 0
    let previous = performance.now()
    const animate = (now: number) => {
      if (!document.hidden)
        draw(position.current - Math.min(now - previous, 50) * 0.018)
      previous = now
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [
    canLoop,
    autoPlay,
    hovered,
    keyboardFocused,
    pointerDown,
    resumingFromDrag,
  ])

  const step = (direction: number) => {
    const card =
      trackRef.current?.querySelector<HTMLElement>(".bestseller-card")
    const group =
      trackRef.current?.querySelector<HTMLElement>(".bestseller-group")
    if (!canLoop || !card || !group) return
    draw(
      position.current +
        direction *
          (card.getBoundingClientRect().width +
            parseFloat(getComputedStyle(group).gap || "0")),
    )
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    const wasDragged = moved.current
    // Clear first: releasing capture may synchronously dispatch lostpointercapture.
    drag.current = null
    suppressClick.current = wasDragged
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    setDragging(false)
    setPointerDown(false)
    if (wasDragged) {
      // A completed drag resumes even while the mouse remains over the rail.
      setKeyboardFocused(false)
      setResumingFromDrag(true)
    }
  }

  return (
    <section
      className="bestseller-section"
      aria-labelledby="bestseller-title"
      aria-roledescription="Karussell"
    >
      <div className="bs-heading">
        <div className="bs-heading-inner">
          <div className="bs-title-lockup">
            <span className="bs-title-mark" aria-hidden="true" />
            <h2 id="bestseller-title">
              Bestseller <span>&amp;</span> Neuheiten
            </h2>
          </div>
          <a href="/katalog" className="bs-catalog-link">
            Zum Katalog <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <p id="bestseller-instructions" className="sr-only">
        Zum Blättern ziehen, wischen oder die Pfeiltasten verwenden. Der
        automatische Lauf pausiert beim Lesen und bei Tastaturfokus. Nach dem
        Ziehen läuft die Auswahl automatisch weiter.
      </p>
      <div
        ref={viewportRef}
        className={`bestseller-viewport ${dragging ? "is-dragging" : ""}`}
        tabIndex={canLoop ? 0 : undefined}
        role="group"
        aria-label="Produktauswahl"
        aria-describedby="bestseller-instructions"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            if (!hovered) setResumingFromDrag(false)
            setHovered(true)
          }
        }}
        onPointerLeave={() => {
          setHovered(false)
          setResumingFromDrag(false)
          if (drag.current && !moved.current) {
            drag.current = null
            setPointerDown(false)
          }
        }}
        onFocusCapture={(event) => {
          const card = (event.target as HTMLElement).closest<HTMLElement>(
            ".bestseller-card",
          )
          setKeyboardFocused(
            (event.target as HTMLElement).matches(":focus-visible"),
          )
          if (
            !card ||
            !viewportRef.current ||
            card.closest('[aria-hidden="true"]')
          )
            return
          viewportRef.current.scrollLeft = 0
          const cardBox = card.getBoundingClientRect()
          const viewportBox = viewportRef.current.getBoundingClientRect()
          if (
            cardBox.left < viewportBox.left ||
            cardBox.right > viewportBox.right
          )
            draw(card.offsetLeft)
        }}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as HTMLElement | null
          if (!next || !event.currentTarget.contains(next))
            setKeyboardFocused(false)
        }}
        onKeyDown={(event) => {
          suppressClick.current = false
          setKeyboardFocused(true)
          setResumingFromDrag(false)
          if (event.target !== event.currentTarget) return
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            step(event.key === "ArrowRight" ? 1 : -1)
          }
        }}
        onPointerDownCapture={() => {
          setKeyboardFocused(false)
          setResumingFromDrag(false)
        }}
        onPointerDown={(event) => {
          suppressClick.current = false
          if (
            !canLoop ||
            !event.isPrimary ||
            event.button !== 0 ||
            (event.target as HTMLElement).closest("[data-carousel-control]")
          )
            return
          moved.current = false
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            position: position.current,
            pointerId: event.pointerId,
          }
          setPointerDown(true)
        }}
        onPointerMove={(event) => {
          const start = drag.current
          if (!start || start.pointerId !== event.pointerId) return
          const delta = event.clientX - start.x
          if (!moved.current) {
            if (
              Math.abs(delta) < 7 ||
              Math.abs(delta) < Math.abs(event.clientY - start.y)
            )
              return
            moved.current = true
            event.currentTarget.setPointerCapture(event.pointerId)
            setDragging(true)
          }
          draw(start.position - delta)
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={(event) => {
          // Touch transfers its implicit capture from the link to the viewport.
          if (event.target !== event.currentTarget) return
          endDrag(event)
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return
          event.preventDefault()
          event.stopPropagation()
          suppressClick.current = false
        }}
      >
        <div className="bs-track-inset">
          <div
            ref={trackRef}
            className={`bestseller-track ${canLoop ? "" : "bs-single"}`}
          >
            {(canLoop ? [0, 1, 2] : [1]).map((group) => (
              <div
                className="bestseller-group"
                key={group}
                aria-hidden={group === 1 ? undefined : true}
              >
                {products.map((product) => {
                  const favorite = favorites.includes(product.slug)
                  const sizes = product.sizes || []
                  const sizeLabel =
                    sizes.length > 1
                      ? `${sizes[0]} – ${sizes[sizes.length - 1]}`
                      : sizes[0] === "ALLE"
                        ? "One Size"
                        : sizes[0]
                  const url = `/katalog/${product.slug}`
                  return (
                    <article
                      className="bestseller-card catalog-card"
                      key={product.slug}
                    >
                      <div className="catalog-card-visual">
                        <a
                          href={url}
                          draggable={false}
                          className="catalog-card-image"
                          aria-label={`${product.name} ansehen`}
                          tabIndex={group === 1 ? undefined : -1}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />
                        </a>
                        {product.compareAtPrice ? (
                          <span className="catalog-card-badge">
                            Sale
                          </span>
                        ) : null}
                        <button
                          type="button"
                          data-carousel-control
                          className="catalog-heart"
                          tabIndex={group === 1 ? undefined : -1}
                          aria-label={`${product.name} ${
                            favorite
                              ? "nicht mehr merken"
                              : "für diesen Besuch merken"
                          }`}
                          aria-pressed={favorite}
                          onClick={() =>
                            setFavorites((current) =>
                              current.includes(product.slug)
                                ? current.filter(
                                    (slug) => slug !== product.slug,
                                  )
                                : [...current, product.slug],
                            )
                          }
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
                            href={url}
                            draggable={false}
                            title={product.name}
                            tabIndex={group === 1 ? undefined : -1}
                          >
                            {product.name}
                          </a>
                        </h3>
                      </div>
                      <div className="catalog-card-commerce">
                        <div
                          className="catalog-card-swatches"
                          aria-label={`${product.colors.length} Farben`}
                        >
                          {product.colors
                            .slice(0, 3)
                            .map((color: string, index: number) => (
                              <span
                                key={`${color}-${index}`}
                                className="bs-color"
                                style={{ background: color }}
                                title={product.colorOptions?.[index]?.label}
                              />
                            ))}
                          {product.colors.length > 3 && (
                            <span>+{product.colors.length - 3}</span>
                          )}
                        </div>
                        <div className="catalog-card-price">
                          {product.compareAtPrice && (
                            <s>{product.compareAtPrice}</s>
                          )}
                          <strong>{product.price}</strong>
                        </div>
                      </div>
                      <div className="catalog-card-legal">
                        {renderPriceNote()}
                      </div>
                    </article>
                  )
                })}
              </div>
            ))}
          </div>
          {loading && (
            <div className="bs-loading" role="status">
              Produkte werden geladen …
            </div>
          )}
          {!loading && products.length === 0 && (
            <div className="bs-empty">
              <p>Entdecke unsere Produkte im Katalog.</p>
              <a href="/katalog">Zum Katalog</a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
