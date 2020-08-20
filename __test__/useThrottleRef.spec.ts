import { ref } from 'vue-demi'
import { useThrottleRef } from '../src'

type noop = (...args: any[]) => any

describe('test useThrottleRef', () => {
  const nextTask = (fn: noop, wait: number) => setTimeout(fn, wait)

  test('should be run first time when run', () => {
    const rawValue = ref<number>(0)
    const throttleValue = useThrottleRef(rawValue, 500)
    rawValue.value = 1
    rawValue.value = 2
    rawValue.value = 3
    nextTask(() => {
      expect(rawValue.value).toBe(3)
      expect(throttleValue.value).toBe(1)
    }, 550)
  })
})
