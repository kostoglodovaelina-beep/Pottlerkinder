import { useEffect, useRef } from "react"
import {
  FiArrowLeft,
  FiPackage,
  FiRefreshCcw,
  FiTruck,
  FiX,
} from "react-icons/fi"
import type { ServiceInfoKind } from "@/lib/service-info"
import "../styles/components/service-info-dialog.css"

type Section = {
  title: string
  text: string
}
type Props = {
  kind: ServiceInfoKind
  sections: Section[]
  onClose: () => void
}

export default function ServiceInfoDialog({ kind, sections, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const shipping = kind === "shipping"

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog?.showModal()
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="service-info-dialog legal-dialog-layer"
      aria-labelledby="service-info-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button, a[href], input, [tabindex="0"]',
          ),
        ).filter((control) => control.getBoundingClientRect().width > 0)
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
    >
      <div className="service-info-panel">
        <header className="service-info-head">
          <div>
            <p>GUT ZU WISSEN</p>
            <h2 id="service-info-title">
              {shipping ? "Versand & Lieferung" : "Rückgabe & Umtausch"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fenster schließen"
          >
            <FiX aria-hidden="true" />
          </button>
        </header>
        <div
          className="service-info-body"
          role="region"
          aria-label={
            shipping ? "Versandinformationen" : "Rückgabeinformationen"
          }
          tabIndex={0}
        >
          {shipping ? (
            <>
              <div className="service-info-rate">
                <FiTruck aria-hidden="true" />
                <div>
                  <span>DEUTSCHLAND · DHL / GLS</span>
                  <p>Kostenfrei ab 85,00 € Warenwert</p>
                </div>
                <strong>
                  6,15 €<small>pro Bestellung</small>
                </strong>
              </div>
              <div className="service-info-times">
                <div>
                  <FiPackage aria-hidden="true" />
                  <p>
                    Katalogprodukte<strong>3–5 Werktage</strong>
                  </p>
                </div>
                <div>
                  <FiRefreshCcw aria-hidden="true" />
                  <p>
                    Individuell aus dem Konfigurator
                    <strong>Bis zu 15 Werktage</strong>
                  </p>
                </div>
              </div>
              <p className="service-info-note">
                Bearbeitungszeit, zuzüglich Versandlaufzeit. Maßgeblich ist die
                beim jeweiligen Produkt angegebene Lieferzeit.
              </p>
            </>
          ) : (
            <div className="service-info-return-note">
              <FiRefreshCcw aria-hidden="true" />
              <p>
                Für reguläre Waren gilt grundsätzlich das gesetzliche
                Widerrufsrecht von 14 Tagen. Für individuell angefertigte Waren
                können gesetzliche Ausnahmen gelten. Deine gesetzlichen
                Mängelrechte bleiben unberührt.
              </p>
            </div>
          )}
          {sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
        <footer className="service-info-foot">
          <span>Du bleibst auf deiner aktuellen Seite.</span>
          <button type="button" onClick={onClose}>
            <FiArrowLeft aria-hidden="true" /> Weiterstöbern
          </button>
        </footer>
      </div>
    </dialog>
  )
}
