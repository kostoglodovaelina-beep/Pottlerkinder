export type ServiceInfoKind = "shipping" | "returns"

export const SERVICE_INFO_EVENTS = {
  shipping: "pottlerkinder-open-shipping",
  returns: "pottlerkinder-open-returns",
} as const

export function openServiceInfo(kind: ServiceInfoKind) {
  window.dispatchEvent(new Event(SERVICE_INFO_EVENTS[kind]))
}
