import {
  Ref,
  customRef
} from 'vue-demi'

export function useDebounceRef<T>(rawValue: T, wait = 0): Ref<T> {
  let timer: any = null
  function clear() {
    if(timer) {
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