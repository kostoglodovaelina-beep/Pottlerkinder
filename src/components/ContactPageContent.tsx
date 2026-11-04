import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  FiArrowRight,
  FiCheck,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi"
import {
  EMPTY_CONTACT,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact"
import "../styles/components/contact-page.css"

const fields = [
  {
    name: "firstName",
    label: "Vorname",
    type: "text",
    autoComplete: "given-name",
    required: true,
    maxLength: 100,
  },
  {
    name: "lastName",
    label: "Nachname",
    type: "text",
    autoComplete: "family-name",
    required: true,
    maxLength: 100,
  },
  {
    name: "email",
    label: "E-Mail-Adresse",
    type: "email",
    autoComplete: "email",
    required: true,
    maxLength: 254,
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    autoComplete: "tel",
    required: false,
    maxLength: 40,
  },
  {
    name: "subject",
    label: "Betreff",
    type: "text",
    autoComplete: "off",
    required: true,
    maxLength: 160,
  },
] as const

export default function ContactPageContent({
  accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "",
}: {
  accessKey?: string
}) {
  const [values, setValues] = useState<ContactValues>({ ...EMPTY_CONTACT })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const sendingRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = "Kontaktformular | Pottlerkinder"
    return () => {
      document.title = previousTitle
      abortRef.current?.abort()
    }
  }, [])

  const update = (name: keyof ContactValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status !== "sending") {
      setStatus("idle")
      setMessage("")
    }
  }

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sendingRef.current) return
    const validation = validateContact(values)
    setErrors(validation)
    if (Object.keys(validation).length) {
      setStatus("error")
      setMessage("Bitte prüfe die markierten Felder.")
      const first = Object.keys(validation)[0]
      const control = formRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`,
      )
      control?.focus()
      control?.scrollIntoView({ block: "center", behavior: "auto" })
      return
    }
    sendingRef.current = true
    setStatus("sending")
    setMessage("")
    const controller = new AbortController()
    abortRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      await submitContact(accessKey, values, controller.signal)
      setValues({ ...EMPTY_CONTACT })
      setErrors({})
      setStatus("success")
      setMessage(
        "Vielen Dank. Deine Nachricht wurde erfolgreich übermittelt. Wir melden uns per E-Mail bei dir.",
      )
      window.requestAnimationFrame(() => feedbackRef.current?.focus())
    } catch (error) {
      setStatus("error")
      setMessage(
        controller.signal.aborted
          ? "Die Übermittlung hat zu lange gedauert. Bitte prüfe deine Verbindung und versuche es erneut. Deine Eingaben bleiben erhalten."
          : error instanceof Error
            ? error.message
            : "Die Nachricht konnte nicht übermittelt werden. Bitte versuche es erneut.",
      )
    } finally {
      window.clearTimeout(timeout)
      sendingRef.current = false
      abortRef.current = null
    }
  }

  return (
    <main
      className="contact-page"
      id="main-content"
      aria-labelledby="contact-title"
    >
      <div className="contact-container">
        <nav className="contact-breadcrumb" aria-label="Brotkrümelnavigation">
          <a href="/">Startseite</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Kontaktformular</span>
        </nav>
        <div className="contact-form-column">
          <header className="contact-intro">
            <p className="contact-eyebrow">POTTLERKINDER / KONTAKT</p>
            <h1 id="contact-title">Kontaktformular</h1>
            <p>
              Du hast Fragen zu deiner Bestellung, unseren Produkten oder einem
              individuellen Auftrag? Schreib uns über das Formular oder
              kontaktiere uns direkt. Wir freuen uns auf deine Nachricht.
            </p>
          </header>
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={send}
            noValidate
            aria-labelledby="contact-form-title"
            aria-describedby="contact-required contact-data-note"
          >
            <h2 id="contact-form-title">Deine Nachricht an uns.</h2>
            <p id="contact-required" className="contact-required">
              Die mit einem <span aria-hidden="true">*</span>
              <span className="sr-only">Stern</span> markierten Felder sind
              Pflichtfelder.
            </p>
            <fieldset disabled={status === "sending"}>
              <legend className="sr-only">Kontaktdaten und Nachricht</legend>
              {fields.map((field) => (
                <div className="contact-field" key={field.name}>
                  <label htmlFor={`contact-${field.name}`}>
                    {field.label}
                    {field.required ? (
                      <span aria-hidden="true"> *</span>
                    ) : (
                      <span className="contact-optional"> (optional)</span>
                    )}
                  </label>
                  <input
                    id={`contact-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    maxLength={field.maxLength}
                    required={field.required}
                    value={values[field.name]}
                    spellCheck={field.name !== "email"}
                    onChange={(event) => update(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name]
                        ? `contact-${field.name}-error`
                        : undefined
                    }
                  />
                  {errors[field.name] && (
                    <p
                      id={`contact-${field.name}-error`}
                      className="contact-field-error"
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
              <div className="contact-field">
                <label htmlFor="contact-message">
                  Kommentar / Nachricht <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={6}
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={`contact-message-hint${
                    errors.message ? " contact-message-error" : ""
                  }`}
                />
                <p className="contact-field-hint" id="contact-message-hint">
                  Bei Fragen zu einer Bestellung hilft uns deine Bestellnummer.
                  Bitte sende keine Zahlungsdaten. Mindestens 10, höchstens
                  5.000 Zeichen.
                </p>
                {errors.message && (
                  <p id="contact-message-error" className="contact-field-error">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) => update("website", event.target.value)}
                />
              </div>
              <div className="contact-privacy-choice">
                <input
                  id="contact-privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  checked={values.privacy}
                  onChange={(event) => update("privacy", event.target.checked)}
                  aria-invalid={Boolean(errors.privacy)}
                  aria-describedby={
                    errors.privacy ? "contact-privacy-error" : undefined
                  }
                />
                <label htmlFor="contact-privacy">
                  Ich habe die{" "}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Datenschutzhinweise
                    <span className="sr-only">
                      {" "}
                      (öffnet in einem neuen Tab)
                    </span>
                  </a>{" "}
                  zur Kenntnis genommen. <span aria-hidden="true">*</span>
                </label>
              </div>
              {errors.privacy && (
                <p id="contact-privacy-error" className="contact-field-error">
                  {errors.privacy}
                </p>
              )}
            </fieldset>
            <p id="contact-data-note" className="contact-data-note">
              Beim Absenden werden deine Angaben über Web3Forms an uns
              übermittelt. Die Verarbeitung erfolgt zur Bearbeitung deiner
              Anfrage. Informationen zu diesem externen Dienst und deinen
              Rechten findest du in der{" "}
              <a href="/datenschutz">Datenschutzerklärung</a>.
            </p>
            <div
              ref={feedbackRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`contact-feedback is-${status}`}
            >
              {message && (
                <p>
                  {status === "success" && <FiCheck aria-hidden="true" />}
                  {message}
                </p>
              )}
            </div>
            <div className="contact-form-actions">
              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
              >
                {status === "sending" ? (
                  <FiLoader className="contact-sending" aria-hidden="true" />
                ) : null}
                <span>
                  {status === "sending" ? "WIRD GESENDET …" : "SENDEN"}
                </span>
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
          <aside
            className="contact-direct"
            aria-label="Weitere Kontaktmöglichkeiten"
          >
            <a href="mailto:kontakt@pottlerkinder.de">
              <FiMail aria-hidden="true" />
              kontakt@pottlerkinder.de
            </a>
            <a href="tel:+4920936171378">
              <FiPhone aria-hidden="true" />
              +49 209 36171378
            </a>
            <address>
              <FiMapPin aria-hidden="true" />
              <span>
                Pottlerkinder · Natalia Lewandowski
                <br />
                Horster Str. 118 · 45897 Gelsenkirchen
              </span>
            </address>
            <a className="contact-imprint" href="/impressum">
              Anbieterangaben im Impressum <FiArrowRight aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </main>
  )
}
