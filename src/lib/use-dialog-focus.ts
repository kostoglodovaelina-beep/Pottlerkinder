import { useEffect, useRef } from "react"

export default function useDialogFocus(
  selector: string | null,
  onClose: () => void,
) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!selector) return
    const panel = document.querySelector<HTMLElement>(selector)
    if (!panel) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    const controls = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select, textarea, [tabindex="0"]',
        ),
      ).filter(
        (control) =>
          control.tabIndex >= 0 && control.getBoundingClientRect().width > 0,
      )
    document.body.style.overflow = "hidden"
    controls()[0]?.focus()
    const keyboard = (event: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) return
      if (event.key === "Escape") {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== "Tab") return
      const items = controls()
      const first = items[0]
      const last = items[items.length - 1]
      if (
        !panel.contains(document.activeElement) ||
        (!event.shiftKey && document.activeElement === last)
      ) {
        event.preventDefault()
        first?.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      }
    }
    document.addEventListener("keydown", keyboard)
    return () => {
      document.removeEventListener("keydown", keyboard)
      document.body.style.overflow = overflow
      if (previous?.isConnected) previous.focus()
    }
  }, [selector])
}
