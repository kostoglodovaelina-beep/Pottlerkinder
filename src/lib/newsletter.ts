import { submitWeb3Forms } from "./web3forms.ts"

export type NewsletterValues = {
  email: string
  consent: boolean
  website: string
}
export type NewsletterErrors = Partial<Record<keyof NewsletterValues, string>>

export const NEWSLETTER_CONSENT =
  "Ich möchte den Newsletter von Pottlerkinder erhalten."

export function validateNewsletter(values: NewsletterValues): NewsletterErrors {
  const errors: NewsletterErrors = {}
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.length > 254
  )
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein."
  if (!values.consent)
    errors.consent =
      "Bitte bestätige deinen Wunsch, den Newsletter zu erhalten."
  return errors
}

export async function submitNewsletter(
  accessKey: string,
  values: NewsletterValues,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
) {
  if (Object.keys(validateNewsletter(values)).length || values.website)
    throw new Error(
      "Bitte prüfe deine Eingaben und bestätige die Einwilligung.",
    )
  await submitWeb3Forms(
    accessKey,
    {
      form_type: "newsletter_request",
      from_name: "Pottlerkinder Newsletter",
      subject: "Newsletter-Anfrage – Pottlerkinder",
      email: values.email.trim(),
      replyto: values.email.trim(),
      message:
        "Neue Anfrage zum Newsletter. Dies ist noch keine bestätigte Anmeldung; bitte den Double-Opt-In-Prozess im Newsletter-Dienst durchführen.",
      newsletter_requested: true,
      consent: true,
      consent_text: NEWSLETTER_CONSENT,
      requested_at: new Date().toISOString(),
    },
    signal,
    fetcher,
  )
}
