import { Ref, customRef } from 'vue-demi'

export function useDebounceRef<T>(value: T, wait = 0): Ref<T> {
  let rawValue = value
  let timer: any = null
  function clear() {
    if (timer) {
      clearTimeout(timer)
    }
  }
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return rawValue
      },
      set(val) {
        clear()
        timer = setTimeout(() => {
          rawValue = val
          trigger()
        }, wait)
      }
    }
  })
}
