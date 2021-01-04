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

export function nextTask(fn: noop, wait = 0): void {
  setTimeout(fn, wait)
}

export function waitTime(time = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const nextTick: () => Promise<void> = () => Promise.resolve().then()

export * from './types'
