import { Wrapper } from '@vue/test-utils'
import { useRequest } from '../src/useRequest'
import { getCache } from '../src/useRequest/utils/cache'
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

const customRequest = (p: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(p)
    }, 100)
  })

const customRequest2 = (p: string, a: string, b: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(p + a + b)
    }, 100)
  })

describe('test use async ', () => {
  let wrapper: Wrapper<Vue>
  afterEach(() => {
    wrapper.destroy()
  })

  test('test request ', async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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

  test(`test request manaul `, async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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

  test(`test request parallel `, async () => {
    wrapper = renderComposable(() =>
      useRequest(parallelFetch, {
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

  test(`test request formatResult `, async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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

  test(`test request debouce `, async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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

  test(`test request throttle `, async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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

  test(`test request polling `, async () => {
    const onSuccess = jest.fn()
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
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
      useRequest(Fetch, {
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

  test(`test request error `, async () => {
    const onError = jest.fn()
    wrapper = renderComposable(() =>
      useRequest(FetchError, {
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

  test(`test request error throw `, async () => {
    const onError = jest.fn()
    wrapper = renderComposable(() =>
      useRequest(FetchError, {
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

  test(`test request reset `, async () => {
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
        manual: true
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.data).toBeUndefined()
    await vm.$data.run(2)
    expect(vm.$data.data).toBe(2)
    vm.$data.reset()
    await vm.$nextTick()
    expect(vm.$data.data).toBe(2)
    expect(vm.$data.fetches).toEqual({})
  })

  test(`test request cache `, async () => {
    const CacheKey = 'test_cache'
    const DefaultKey = `vue_reuse_request_default_fetch_key`
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
        defaultParams: [1],
        cacheKey: CacheKey,
        cacheTime: 200
      })
    )
    const { vm } = wrapper
    // after mount
    await vm.$nextTick()
    expect(vm.$data.loading).toBeTruthy()
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toBeUndefined()
    await waitTime(110)
    expect(vm.$data.loading).toBeFalsy()
    expect(vm.$data.params).toEqual([1])
    expect(vm.$data.data).toBe(1)
    vm.$destroy()
    const cached = getCache(CacheKey)
    expect(cached.data?.fetchKey).toBe(DefaultKey)
    expect(cached.data?.fetches[DefaultKey].data).toBe(1)
    // in any where request again cache data will be initial
    wrapper = renderComposable(() =>
      useRequest(Fetch, {
        defaultParams: [2],
        cacheKey: CacheKey,
        cacheTime: 200
      })
    )
    const { vm: vm2 } = wrapper
    // after mount
    await vm2.$nextTick()
    expect(vm2.$data.loading).toBeTruthy()
    expect(vm2.$data.params).toEqual([2])
    expect(vm2.$data.data).toBe(1)
    // after request
    await waitTime(110)
    expect(vm2.$data.loading).toBeFalsy()
    expect(vm2.$data.params).toEqual([2])
    expect(vm2.$data.data).toBe(2)
    // after clear cache
    await waitTime(100)
    const cached2 = getCache(CacheKey)
    expect(cached2.data?.fetchKey).toBeUndefined()
    expect(cached2.data?.fetches).toBeUndefined()
  })

  test(`test custom request method `, async () => {
    wrapper = renderComposable(() =>
      useRequest('1', {
        requestMethod: customRequest2,
        defaultParams: ['2', '3']
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual(['2', '3'])
    expect(vm.$data.data).toBeUndefined()
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual(['2', '3'])
    expect(vm.$data.data).toBe('123')
  })

  test(`test custom request method functional service `, async () => {
    const url = (p: string) => p
    wrapper = renderComposable(() =>
      useRequest(url, {
        requestMethod: customRequest,
        defaultParams: ['1']
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual(['1'])
    expect(vm.$data.data).toBeUndefined()
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual(['1'])
    expect(vm.$data.data).toBe('1')
  })

  test(`test custom request method object service `, async () => {
    const customRequest = ({ url }: { url: string }) =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(url)
        }, 100)
      })
    const url = (url: string) => ({ url })
    wrapper = renderComposable(() =>
      useRequest(url, {
        requestMethod: customRequest,
        defaultParams: ['1']
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.loading).toBe(true)
    expect(vm.$data.params).toEqual(['1'])
    expect(vm.$data.data).toBeUndefined()
    await waitTime(110)
    expect(vm.$data.loading).toBe(false)
    expect(vm.$data.params).toEqual(['1'])
    expect(vm.$data.data).toBe('1')
    vm.$destroy()
    // object
    wrapper = renderComposable(() =>
      useRequest(
        { url: '1' },
        {
          requestMethod: customRequest
        }
      )
    )
    const { vm: vm1 } = wrapper
    await vm1.$nextTick()
    expect(vm1.$data.loading).toBe(true)
    expect(vm1.$data.params).toEqual([])
    expect(vm1.$data.data).toBeUndefined()
    await waitTime(110)
    expect(vm1.$data.loading).toBe(false)
    expect(vm1.$data.params).toEqual([])
    expect(vm1.$data.data).toBe('1')
  })

  test(`test global fetch `, async () => {
    wrapper = renderComposable(() =>
      useRequest('1', {
        manual: true
      })
    )
    const { vm } = wrapper
    await vm.$nextTick()
    expect(vm.$data.data).toBeUndefined()
    await vm.$data.run()
    expect(vm.$data.data).toBe('1')
    await vm.$data.run({ error: 'error' }).catch((err: Error) => {
      expect(err).toBe(
        `useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.`
      )
    })
  })
})
