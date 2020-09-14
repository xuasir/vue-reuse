import { useThrottleRef } from '../src'

type noop = (...args: any[]) => any

describe('test useThrottleRef', () => {
  const nextTask = (fn: noop, wait: number) => setTimeout(fn, wait)

  test('should be run first time when run', () => {
    const throttleValue = useThrottleRef(0, 500)
    throttleValue.value = 1
    throttleValue.value = 2
    throttleValue.value = 3
    expect(throttleValue.value).toBe(1)
    nextTask(() => {
      expect(throttleValue.value).toBe(1)
    }, 550)
  })
})
