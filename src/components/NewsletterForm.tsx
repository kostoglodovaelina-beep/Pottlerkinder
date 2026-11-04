import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { FiLoader } from "react-icons/fi"
import {
  NEWSLETTER_CONSENT,
  submitNewsletter,
  validateNewsletter,
  type NewsletterErrors,
} from "@/lib/newsletter"
import "../styles/components/newsletter-form.css"

export default function NewsletterForm({
  accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "",
}: {
  accessKey?: string
}) {
  const id = useId()
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState("")
  const [errors, setErrors] = useState<NewsletterErrors>({})
  const [status, setStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle")
  const [feedback, setFeedback] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const pendingRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)
  const pending = status === "sending"

  useEffect(() => () => abortRef.current?.abort(), [])

  const edit = () => {
    setStatus("idle")
    setFeedback("")
  }

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pendingRef.current) return
    const values = { email, consent, website }
    const validation = validateNewsletter(values)
    setErrors(validation)
    if (Object.keys(validation).length) {
      const field = Object.keys(validation)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus()
      return
    }
    pendingRef.current = true
    setStatus("sending")
    setFeedback("")
    const controller = new AbortController()
    abortRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      await submitNewsletter(accessKey, values, controller.signal)
      setEmail("")
      setConsent(false)
      setWebsite("")
      setErrors({})
      setStatus("success")
      setFeedback(
        "Deine Anfrage wurde übermittelt. Das ist noch keine bestätigte Newsletter-Anmeldung.",
      )
      window.requestAnimationFrame(() => feedbackRef.current?.focus())
    } catch (error) {
      setStatus("error")
      setFeedback(
        controller.signal.aborted
          ? "Die Übermittlung dauert zu lange. Bitte versuche es erneut; deine E-Mail-Adresse bleibt erhalten."
          : error instanceof Error
            ? error.message
            : "Die Anfrage konnte nicht übermittelt werden. Bitte versuche es erneut.",
      )
    } finally {
      window.clearTimeout(timeout)
      pendingRef.current = false
      abortRef.current = null
    }
  }

  return (
    <form
      ref={formRef}
      className="newsletter-form"
      aria-label="Newsletter-Anfrage"
      noValidate
      onSubmit={send}
    >
      <label className="sr-only" htmlFor={`${id}-email`}>
        E-Mail-Adresse für den Newsletter
      </label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        required
        placeholder="deine@email.de"
        value={email}
        disabled={pending}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? `${id}-email-error` : undefined}
        onChange={(event) => {
          setEmail(event.target.value)
          setErrors((current) => ({ ...current, email: undefined }))
          edit()
        }}
      />
      {errors.email && (
        <p id={`${id}-email-error`} className="newsletter-error">
          {errors.email}
        </p>
      )}
      <div className="newsletter-consent">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          required
          checked={consent}
          disabled={pending}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
          onChange={(event) => {
            setConsent(event.target.checked)
            setErrors((current) => ({ ...current, consent: undefined }))
            edit()
          }}
        />
        <label htmlFor={`${id}-consent`}>
          {NEWSLETTER_CONSENT} <a href="/datenschutz">Datenschutzerklärung</a>.
        </label>
      </div>
      {errors.consent && (
        <p id={`${id}-consent-error`} className="newsletter-error">
          {errors.consent}
        </p>
      )}
      <div className="newsletter-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          disabled={pending}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <button
        className="btn-subscribe newsletter-submit"
        type="submit"
        disabled={pending}
        aria-busy={pending}
      >
        {pending && (
          <FiLoader className="newsletter-sending" aria-hidden="true" />
        )}
        <span>{pending ? "Wird übermittelt …" : "Newsletter anfragen"}</span>
      </button>
      <div
        ref={feedbackRef}
        tabIndex={-1}
        className={`newsletter-feedback is-${status}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback && <p>{feedback}</p>}
      </div>
    </form>
  )
}
