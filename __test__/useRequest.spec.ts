import { Wrapper } from '@vue/test-utils'
import { useAsync } from '../src/useRequest/useAsync'
import { waitTime, renderComposable } from './utils'

const Fetch = (p: number) =>
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(p)
    }, 100)
  })

const FetchError = (p: number) =>
  new Promise<number>((_, reject) => {
    setTimeout(() => {
      reject(p)
    }, 100)
  })

const parallelFetch = (p: { key: string; res: number }) =>
  new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(p.res)
    }, 100)
  })

describe('test use async ', () => {
  let wrapper: Wrapper<Vue>
  afterEach(() => {
    wrapper.destroy()
  })

  test('test async ', async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        defaultParams: [1]
      })
    )
    const { vm } = wrapper
    // create
    expect(vm.$data.loading).toBeUndefined()
    expect(vm.$data.params).toBeUndefined()
    expect(vm.$data.data).toBeUndefined()
    // after mount begin request
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toBeUndefined()
    // after request back
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toEqual(1)
  })

  test(`test async manaul `, async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        defaultData: 1,
        manual: true
      })
    )
    const { vm } = wrapper
    // after mount
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual([])
    expect(vm.$data.data).toBe(1)
    // start request
    vm.$data.run(3)
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual([3])
    expect(vm.$data.data).toBe(1)
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual([3])
    expect(vm.$data.data).toBe(3)
  })

  test(`test async parallel `, async () => {
    wrapper = renderComposable(() =>
      useAsync(parallelFetch, {
        manual: true,
        fetchKey: (p) => p.key
      })
    )
    const { vm } = wrapper
    // after mount
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual([])
    expect(vm.$data.data).toBeUndefined()
    // start some request
    vm.$data.run({ key: '1', res: 1 })
    expect(vm.$data.fetches['1'].loading).toBe(true)
    expect(vm.$data.fetches['1'].params).toEqual([{ key: '1', res: 1 }])
    expect(vm.$data.fetches['1'].data).toBeUndefined()
    vm.$data.run({ key: '2', res: 2 })
    expect(vm.$data.fetches['2'].loading).toBe(true)
    expect(vm.$data.fetches['2'].params).toEqual([{ key: '2', res: 2 }])
    expect(vm.$data.fetches['2'].data).toBeUndefined()
    // after request
    await waitTime(110)
    expect(vm.$data.fetches['1'].loading).toBe(false)
    expect(vm.$data.fetches['1'].params).toEqual([{ key: '1', res: 1 }])
    expect(vm.$data.fetches['1'].data).toBe(1)

    expect(vm.$data.fetches['2'].loading).toBe(false)
    expect(vm.$data.fetches['2'].params).toEqual([{ key: '2', res: 2 }])
    expect(vm.$data.fetches['2'].data).toBe(2)
    // re request
    vm.$data.run({ key: '1', res: 10 })
    vm.$data.run({ key: '2', res: 20 })
    await waitTime(110)
    expect(vm.$data.fetches['1'].data).toBe(10)
    expect(vm.$data.fetches['2'].data).toBe(20)
  })

  test(`test async formatResult `, async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        defaultParams: [1],
        formatResult: (res) => ({ res }),
        defaultData: { res: 2 }
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toEqual({ res: 2 })
    // after request
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toEqual({ res: 1 })
  })

  test(`test async debouce `, async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        manual: true,
        debounceTime: 50
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    vm.$data.run(1)
    vm.$data.run(2)
    vm.$data.run(3)
    vm.$data.run(4)
    await waitTime(160)
    expect(vm.$data.data).toBe(4)
  })

  test(`test async throttle `, async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        manual: true,
        throttleTime: 50
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    vm.$data.run(1)
    vm.$data.run(2)
    vm.$data.run(3)
    vm.$data.run(4)
    await waitTime(160)
    expect(vm.$data.data).toBe(4)
  })

  test(`test async polling `, async () => {
    const onSuccess = jest.fn()
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        manual: true,
        pollingTime: 50,
        onSuccess
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    vm.$data.run(1)
    // (100 + 50) * 2
    await waitTime(310)
    expect(onSuccess).toBeCalledTimes(2)
    // cancel polling
    vm.$data.cancel()
    await waitTime(310)
    expect(onSuccess).toBeCalledTimes(2)
  })

  test(`test loading delay `, async () => {
    wrapper = renderComposable(() =>
      useAsync(Fetch, {
        loadingDelay: 20,
        defaultParams: [1]
      })
    )
    const { vm } = wrapper
    // after mount
    await vm.$nextTick()
    expect(vm.$data.loading).toBeFalsy()
    // before delay
    await waitTime(10)
    expect(vm.$data.loading).toBeFalsy()
    // after delay
    await waitTime(30)
    expect(vm.$data.loading).toBeTruthy()
    // after request
    await waitTime(70)
    expect(vm.$data.loading).toBeFalsy()
    expect(vm.$data.data).toBe(1)
  })

  test(`test async error `, async () => {
    const onError = jest.fn()
    wrapper = renderComposable(() =>
      useAsync(FetchError, {
        manual: true,
        onError
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.error).toBeUndefined()
    await vm.$data.run(1).catch((err: Error) => {
      expect(err).toBe(
        `useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.`
      )
    })
    await vm.$nextTick()
    expect(onError).toBeCalled()
    expect(onError).toBeCalledWith(1, [1])
    expect(vm.$data.error).toBe(1)
  })

  test(`test async error throw `, async () => {
    const onError = jest.fn()
    wrapper = renderComposable(() =>
      useAsync(FetchError, {
        manual: true,
        onError,
        throwOnError: true
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.error).toBeUndefined()
    await vm.$data.run(2).catch((err: Error) => {
      expect(err).toBe(2)
    })
    await vm.$nextTick()
    expect(onError).toBeCalled()
    expect(onError).toBeCalledWith(2, [2])
    expect(vm.$data.error).toBe(2)
  })
})
