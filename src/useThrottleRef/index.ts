import {
  ref,
  Ref,
  UnwrapRef,
  watch,
  getCurrentInstance,
  onUnmounted,
} from 'vue-demi'
import { useThrottleFn } from '../useThrottleFn'

export function useThrottleRef<T extends Ref>(rawValue: T, wait?: number): T {
  const throttleValue = ref<UnwrapRef<T>>(rawValue.value)

  const { run, cancel } = useThrottleFn<UnwrapRef<T>[]>((newValue) => {
    throttleValue.value = newValue
  }, wait)

  const stop = watch(rawValue, (newValue) => run(newValue))

  if (getCurrentInstance()) {
    onUnmounted(() => {
      stop()
      cancel()
    })
  }

  return throttleValue
}
