export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export function hasWeb3FormsKey(value: string): boolean {
  return (
    /^[a-z0-9_-]{20,200}$/i.test(value.trim()) &&
    !/your[_-]?access[_-]?key|placeholder/i.test(value)
  )
}

export async function submitWeb3Forms(
  accessKey: string,
  fields: Record<string, string | boolean>,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
) {
  if (!hasWeb3FormsKey(accessKey))
    throw new Error(
      "Deine Anfrage konnte nicht übermittelt werden. Bitte versuche es später erneut oder schreibe uns direkt an kontakt@pottlerkinder.de. Deine Eingaben bleiben erhalten.",
    )

  let response: Response
  try {
    response = await fetcher(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "omit",
      signal,
      body: JSON.stringify({
        ...fields,
        access_key: accessKey.trim(),
        botcheck: false,
      }),
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error(
      "Die Verbindung konnte nicht hergestellt werden. Bitte versuche es erneut. Deine Eingaben bleiben erhalten.",
    )
  }

  const result = await response.json().catch(() => null)
  if (!response.ok || result?.success !== true) {
    throw new Error(
      response.status === 429
        ? "Zu viele Anfragen. Bitte versuche es später erneut oder schreibe uns direkt per E-Mail."
        : "Deine Anfrage konnte nicht übermittelt werden. Deine Eingaben bleiben erhalten. Bitte versuche es erneut oder schreibe uns direkt per E-Mail.",
    )
  }
}
