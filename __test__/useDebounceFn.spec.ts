import { useDebounceFn } from '../src'

type noop = (...args: any[]) => any

describe('test useDebounceFn', () => {
  const nextTask = (fn: noop) => setTimeout(fn)

  test('fn will be called when run', () => {
    const fn = jest.fn()
    const { run } = useDebounceFn(fn, 500)
    run(1)
    run()
    nextTask(() => {
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith()
    })
  })

  test('fn will not be called when cancel', () => {
    const fn = jest.fn()
    const { run, cancel } = useDebounceFn(fn, 500)
    run(1)
    run(2)
    nextTask(() => {
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith(2)
    })

    run(3)
    cancel()
    nextTask(() => {
      expect(fn).toBeCalledTimes(1)
    })
  })
})
