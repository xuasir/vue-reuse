import {
  Service,
  AsyncResult,
  AsyncOptionsWithFormat,
  AsyncOptions,
  AsyncOptionsAll,
  Fetches,
  CurFetchResult,
  FetchResult
} from './utils/types'
import { Fetch } from './utils/fetch'
import { getCache, setCache } from './utils/cache'
import {
  onMounted,
  onUnmounted,
  shallowReactive,
  shallowRef,
  toRefs,
  // watch,
  watchEffect
} from 'vue-demi'

const DEFAULT_KEY = 'vue_reuse_request_default_fetch_key'

export function useAsync<R, P extends any[], U, UU extends U>(
  service: Service<R, P>,
  options: AsyncOptionsWithFormat<R, P, U, UU>
): AsyncResult<U, P>
export function useAsync<R, P extends any[]>(
  service: Service<R, P>,
  options?: AsyncOptions<R, P>
): AsyncResult<R, P>
export function useAsync<R, P extends any[], U, UU extends U>(
  service: Service<R, P>,
  options?: AsyncOptionsAll<R, P, U, UU>
): AsyncResult<UU, P> {
  const _opts = options || ({} as AsyncOptionsAll<R, P, U, UU>)
  const {
    // hooks
    onSuccess,
    onError,
    throwOnError,
    // time
    debounceTime,
    throttleTime,
    pollingTime,
    loadingDelay,
    // default
    defaultData = undefined,
    defaultLoading = false,
    defaultParams = [],
    manual,
    // cache and key
    fetchKey,
    cacheKey,
    cacheTime
  } = _opts

  // types patch
  const serve = service as any
  const initialData = defaultData as UU
  const initialParams = defaultParams as P
  let formatResult: any
  if ('formatResult' in _opts) {
    formatResult = _opts.formatResult
  }

  // fetch config
  const fetchConfig = {
    formatResult,
    onSuccess: onSuccess as (data: UU, params: P) => void,
    onError,
    throwOnError,
    pollingTime,
    debounceTime,
    throttleTime,
    loadingDelay
  }

  const fetches = shallowReactive<Fetches<UU, P>>({})
  const [curFetchResult, setCurFetchResult] = useFetchResult<UU, P>({
    data: initialData,
    loading: defaultLoading,
    params: initialParams,
    error: undefined,
    cancel: noopFn('cancel'),
    refresh: noopFn('refresh') as () => Promise<UU>
  })
  const curFetchKey = shallowRef(DEFAULT_KEY)
  const subscribe = (key: string, data: FetchResult<UU, P>) => {
    setCurFetchResult(data)
    fetches[key] = data
  }
  // get fetches from cache
  if (cacheKey) {
    const cached = getCache(cacheKey)
    if (cached?.data) {
      const cacheFetches = (cached.data?.fetches || {}) as Fetches<UU, P>
      Object.keys(cacheFetches).forEach((key) => {
        const fetch = new Fetch(serve, fetchConfig, subscribe.bind(null, key), {
          loading: cacheFetches[key].loading,
          data: cacheFetches[key].data,
          params: cacheFetches[key].params as P
        })
        fetches[key] = fetch.result
      })
      curFetchKey.value = cached.data?.fetchKey || DEFAULT_KEY
      setCurFetchResult(fetches[curFetchKey.value])
    }
  }

  // set fetches to cache
  watchEffect(() => {
    if (cacheKey && cacheTime) {
      setCache(
        cacheKey,
        {
          fetches: fetches,
          fetchKey: curFetchKey.value
        },
        cacheTime
      )
    }
  })

  const run = (...args: P) => {
    if (fetchKey) {
      curFetchKey.value = fetchKey(...args) || DEFAULT_KEY
    }
    let curFetch = fetches[curFetchKey.value]
    if (!curFetch) {
      const fetch = new Fetch(
        serve,
        fetchConfig,
        subscribe.bind(null, curFetchKey.value),
        {
          loading: defaultLoading,
          params: initialParams,
          data: initialData
        }
      )
      curFetch = fetches[curFetchKey.value] = fetch.result
    }

    return curFetch.run(...args)
  }
  const reset = () => {
    curFetchKey.value = DEFAULT_KEY
    Object.keys(fetches).forEach((key) => {
      const fetch = fetches[key]
      fetch.unmount()
      delete fetches[key]
    })
  }

  // setup
  onMounted(() => {
    if (!manual) {
      // 默认执行
      run(...initialParams)
    }
  })

  onUnmounted(() => {
    Object.keys(fetches).forEach((key) => {
      const fetch = fetches[key]
      fetch.unmount()
    })
  })

  return {
    run,
    ...toRefs(curFetchResult),
    fetches,
    reset
  } as AsyncResult<UU, P>
}

function useFetchResult<R, P extends any[]>(
  initalValue: Partial<CurFetchResult<R, P>> = {}
): [
  Partial<CurFetchResult<R, P>>,
  (args: Partial<CurFetchResult<R, P>>) => void
] {
  const fetchResult = shallowReactive<Partial<CurFetchResult<R, P>>>(
    initalValue
  )
  const setFetcResult = ({
    data,
    loading,
    params,
    error,
    cancel,
    refresh
  }: Partial<CurFetchResult<R, P>>) => {
    fetchResult.data = data
    fetchResult.loading = loading
    fetchResult.error = error
    fetchResult.params = params
    fetchResult.cancel = cancel || noopFn('cancel')
    fetchResult.refresh = refresh || (noopFn('refresh') as () => Promise<R>)
  }
  return [fetchResult, setFetcResult]
}

const noopFn = (name: string) => () =>
  console.warn(`function ${name} should be call when fetch ready`)
