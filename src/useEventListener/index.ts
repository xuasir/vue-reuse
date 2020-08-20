import { Ref, onMounted, isRef, onUnmounted, ref } from 'vue-demi'

type TargetType = HTMLElement | Ref<HTMLElement> | (() => HTMLElement) | Window
type Options = { dom?: TargetType } & Partial<AddEventListenerOptions>
type ExtractDomOptions = Pick<Options, Exclude<keyof Options, 'dom'>>

export function useEventListener<T extends keyof WindowEventMap>(
  type: T,
  handler: (this: Window, event: WindowEventMap[T]) => any,
  options?: ExtractDomOptions
): void
export function useEventListener<T extends keyof HTMLElementEventMap>(
  type: T,
  handler: (this: HTMLElement, event: HTMLElementEventMap[T]) => any,
  options: Options
): Ref<null | HTMLElement>
export function useEventListener(
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: Options
): Ref<null | HTMLElement> {
  const el = ref<null | HTMLElement>(null)
  let element: HTMLElement | Window
  onMounted(() => {
    element = options?.dom
      ? typeof options?.dom === 'function'
        ? options?.dom()
        : isRef(options?.dom)
        ? options.dom.value
        : options?.dom
      : window
    el.value && (element = el.value)
    element.addEventListener(type, handler, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive,
    })
  })
  onUnmounted(() => {
    element.removeEventListener(type, handler, {
      capture: options?.capture,
    })
  })

  return el
}
