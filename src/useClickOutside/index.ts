import { ref, Ref } from 'vue-demi'
import { useEventListener } from '../useEventListener'
type DomParam = HTMLElement | (() => HTMLElement)

export function useClickOutside(
  callback: (event: MouseEvent) => void,
  dom?: DomParam
): Ref<null | HTMLElement> {
  const element = ref<null | HTMLElement>(null)
  const handler = (event: MouseEvent) => {
    const targetElement = typeof dom === 'function' ? dom() : dom
    const el = targetElement || element.value
    if (!el || el.contains(event.target as Node)) {
      return
    }
    callback(event)
  }
  useEventListener('mouseover', handler, { dom: element as Ref<HTMLElement> })
  return element
}
