import {
  // shallowReadonly,
  reactive,
  Ref,
  ref,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  computed
} from 'vue-demi'
import { useThrottleFn } from '../useThrottleFn'
import { isBrowser } from '../shared/utils'

interface Pos {
  x: number
  y: number
}

type Target = HTMLElement | Document
type Dom = Target | (() => Target) | undefined

export function useScroll(): [Readonly<Pos>, Ref<null | Target>]
export function useScroll(dom: Dom): [Readonly<Pos>]
export function useScroll(dom: Dom = isBrowser ? document : undefined): any {
  const position = reactive({
    x: 0,
    y: 0
  })
  const el = ref<null | HTMLElement>(null)

  let element: Target
  function updatePosition(target: Target) {
    if (typeof target === 'undefined') return
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
  }, 100)

  if (getCurrentInstance()) {
    onMounted(() => {
      const element = (typeof dom === 'function' ? dom() : dom) || el.value
      if (element) {
        updatePosition(element)
        element.addEventListener('scroll', handler)
      }
    })

    onUnmounted(() => {
      element?.removeEventListener('scroll', handler)
    })
  }

  return [computed(() => position), el]
  // use shallowReadonly vuepress will build error
  // return [shallowReadonly(position), el]
}
