import { Ref, customRef } from 'vue-demi'

export function useThrottleRef<T>(value: T, wait = 0): Ref<T> {
  let rawValue = value
  let timer: any = null
  return customRef((track, trigegr) => {
    return {
      get() {
        track()
        return rawValue
      },
      set(val) {
        if (!timer) {
          rawValue = val
          trigegr()
          timer = setTimeout(() => {
            timer = null
          }, wait)
        }
      }
    }
  })
}
