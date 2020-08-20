import {
  shallowReadonly,
  reactive,
  Ref,
  ref,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from 'vue-demi'
import { useThrottleFn } from '../useThrottleFn'

interface Pos {
  x: number
  y: number
}

type Target = HTMLElement | Document
type Dom = Target | (() => Target)

export function useScroll(): [Readonly<Pos>, Ref<null | Target>]
export function useScroll(dom: Dom): [Readonly<Pos>]
export function useScroll(dom: Dom = document): any {
  const position = reactive({
    x: 0,
    y: 0,
  })
  const el = ref<null | HTMLElement>(null)

  let element: Target
  function updatePosition(target: Target) {
    if (target === document) {
      if (target.scrollingElement) {
        position.x = target.scrollingElement.scrollLeft
        position.x = target.scrollingElement.scrollTop
      }
    } else {
      position.x = (target as HTMLElement).scrollLeft
      position.y = (target as HTMLElement).scrollTop
    }
  }
  const { run: handler } = useThrottleFn((evt: Event) => {
    if (!evt.target) return
    updatePosition(evt.target as Target)
  }, 500)

  if (getCurrentInstance()) {
    onMounted(() => {
      const element = (typeof dom === 'function' ? dom() : dom) || el.value
      updatePosition(element)
      element.addEventListener('scroll', handler)
    })

    onUnmounted(() => {
      element?.removeEventListener('scroll', handler)
    })
  }

  return [shallowReadonly(position), el]
}
