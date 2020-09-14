import { useDebounceRef } from '../src'

type noop = (...args: any[]) => any

describe('test useDebounceRef', () => {
  const nextTask = (fn: noop, time: number) => setTimeout(fn, time)
  test('ref will be debounce', () => {
    const debounceRef = useDebounceRef(0, 500)
    debounceRef.value = 1
    debounceRef.value = 2
    expect(debounceRef.value).toBe(0)
    nextTask(() => {
      expect(debounceRef.value).toBe(2)
    }, 550)
  })
})
