export type noop = (...args: any[]) => any

// ------------- useRequest ------------- //

export type RequestService = string | { url: string; [key: string]: any }
export type CombineService<R, P extends any[]> = RequestService | Service<R, P>

export interface RequestOptions<R, P extends any[]> {
  requestMethod?: (service: any) => Promise<any>
  defaultLoading?: boolean
  defaultParams?: P
  defaultData?: R

  formatResult?: (res: any) => R

  onSuccess?: (data: R, params: P) => void
  onError?: (error: Error, params: P) => void

  manual?: boolean

  loadingDelay?: number
  pollingTime?: number
  debounceTime?: number
  throttleTime?: number

  throwOnError?: boolean
  // 缓存
  cacheKey?: string
  cacheTime?: number
  fetchKey?: (...args: P) => string
}

// ------------- Fetch ------------- //
export type Service<R, P extends any[]> = (...args: P) => Promise<R>

export type Subscribe<R, P extends any[]> = (result: FetchResult<R, P>) => any

export interface Fetches<R, P extends any[]> {
  [key: string]: FetchResult<R, P>
}

export interface FetchResult<R, P extends any[]> {
  loading: boolean
  data: R | undefined
  error: Error | undefined
  params: P | undefined
  cancel: noop
  refresh: () => Promise<R>
  run: (...args: P) => Promise<R>
  unmount: () => void
}

export interface FetchConfig<R, P extends any[]> {
  // 请求结果格式化
  formatResult?: (res: any) => R

  onSuccess?: (data: R, params: P) => void
  onError?: (error: Error, params: P) => void

  pollingTime?: number

  loadingDelay?: number

  debounceTime?: number
  throttleTime?: number

  throwOnError?: boolean
}
