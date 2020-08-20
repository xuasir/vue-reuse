import { useThrottleFn } from '../src'

type noop = (...args: any[]) => any

describe('test useThrottleFn', () => {
  const nextTask = (fn: noop, wait: number) => setTimeout(fn, wait)

  test('fn should be called when run', () => {
    const fn = jest.fn()
    const { run } = useThrottleFn(fn, 500)
    run(1)
    run(2)
    run(3)
    nextTask(() => {
      expect(fn).toBeCalledTimes(1)
      expect(fn).lastCalledWith(1)
    }, 550)
  })

  test('fn should not be called when cancelled', () => {
    const fn = jest.fn()
    const { run, cancel } = useThrottleFn(fn, 500)
    run()
    run()
    run()
    run()
    cancel()
    nextTask(() => {
      expect(fn).not.toBeCalled()
    }, 550)
  })
})
