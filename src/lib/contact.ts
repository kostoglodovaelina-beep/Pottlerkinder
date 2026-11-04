import { submitWeb3Forms } from "./web3forms.ts"

export type ContactValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  privacy: boolean
  website: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const EMPTY_CONTACT: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  privacy: false,
  website: "",
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.firstName.trim())
    errors.firstName = "Bitte gib deinen Vornamen ein."
  else if (values.firstName.length > 100)
    errors.firstName = "Bitte verwende höchstens 100 Zeichen."
  if (!values.lastName.trim())
    errors.lastName = "Bitte gib deinen Nachnamen ein."
  else if (values.lastName.length > 100)
    errors.lastName = "Bitte verwende höchstens 100 Zeichen."
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.length > 254
  )
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein."
  if (values.phone.length > 40)
    errors.phone = "Bitte verwende höchstens 40 Zeichen."
  if (!values.subject.trim()) errors.subject = "Bitte gib einen Betreff ein."
  else if (values.subject.length > 160)
    errors.subject = "Bitte verwende höchstens 160 Zeichen."
  if (values.message.trim().length < 10)
    errors.message = "Bitte beschreibe dein Anliegen mit mindestens 10 Zeichen."
  else if (values.message.length > 5000)
    errors.message = "Bitte verwende höchstens 5.000 Zeichen."
  if (!values.privacy)
    errors.privacy =
      "Bitte bestätige, dass du die Datenschutzhinweise gelesen hast."
  return errors
}

export async function submitContact(
  accessKey: string,
  values: ContactValues,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
) {
  if (Object.keys(validateContact(values)).length || values.website)
    throw new Error("Bitte prüfe deine Eingaben und versuche es erneut.")

  await submitWeb3Forms(
    accessKey,
    {
      form_type: "contact",
      from_name: "Pottlerkinder Kontaktformular",
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      email: values.email.trim(),
      replyto: values.email.trim(),
      phone: values.phone.trim(),
      subject: `Pottlerkinder Kontakt: ${values.subject.trim()}`,
      inquiry_subject: values.subject.trim(),
      message: values.message.trim(),
      privacy_acknowledged: true,
    },
    signal,
    fetcher,
  )
}
