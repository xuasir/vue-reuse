import { mount, Wrapper } from '@vue/test-utils'
import { noop } from './types'

export function renderComposable(
  cb: () => any,
  attachTo?: Element | string
): Wrapper<Vue> {
  return mount(
    {
      setup() {
        return cb()
      },
      render(h) {
        return h('div')
      }
    },
    { attachTo }
  )
}

export function nextTask(fn: noop): void {
  setTimeout(fn)
}

export const nextTick: () => Promise<void> = () => Promise.resolve().then()

export * from './types'
