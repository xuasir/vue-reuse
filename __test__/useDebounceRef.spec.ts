import { ref } from 'vue-demi'
import { useDebounceRef } from '../src'

type noop = (...args: any[]) => any

describe('test useDebounceRef', () => {
  const nextTask = (fn: noop, time: number) => setTimeout(fn, time)
  test('ref will be debounce', () => {
    const rawRef = ref<number>(0)
    const debounceRef = useDebounceRef(rawRef, 500)
    rawRef.value = 1
    rawRef.value = 2
    expect(rawRef.value).toBe(2)
    expect(debounceRef.value).toBe(0)
    nextTask(() => {
      expect(debounceRef.value).toBe(2)
    }, 550)
  })
})
