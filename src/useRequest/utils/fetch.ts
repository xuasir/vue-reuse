import { debounce, throttle } from 'lodash'
import { FetchConfig, FetchResult, noop, Service, Subscribe } from './types'

export class Fetch<R, P extends any[]> {
  that: any = this
  config: FetchConfig<R, P>
  service: Service<R, P>
  count = 0
  unmountedFlag = false

  result: FetchResult<R, P> = {
    loading: false,
    data: undefined,
    error: undefined,
    params: undefined,
    cancel: this.cancel.bind(this.that),
    refresh: this.refresh.bind(this.that),
    run: this.run.bind(this.that),
    unmount: this.unmount.bind(this.that)
  }

  setResult(s = {}): void {
    this.result = {
      ...this.result,
      ...s
    }
    this.subscribe(this.result)
  }

  subscribe: Subscribe<R, P>

  unSubscribe: noop[] = []

  debounceTimer: any
  throttleTimer: any
  debounceRun: any
  throttleRun: any

  loadDelayTimer: any
  pollingTimer: any

  constructor(
    service: Service<R, P>,
    config: FetchConfig<R, P>,
    subscribe: Subscribe<R, P>,
    initResult?: { loading?: boolean; data?: R; params: P }
  ) {
    this.service = service
    this.config = config
    this.subscribe = subscribe
    if (initResult) {
      this.result = {
        ...this.result,
        ...initResult
      }
    }

    this.debounceRun = this.config?.debounceTime
      ? debounce(this._run, this.config.debounceTime)
      : undefined

    this.throttleRun = this.config?.throttleTime
      ? throttle(this._run, this.config.throttleTime)
      : undefined
  }

  _run(...args: P): Promise<R | undefined> {
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer)
    }
    if (this.loadDelayTimer) {
      clearTimeout(this.loadDelayTimer)
    }

    this.count++

    const currentCount = this.count

    this.setResult({
      loading: !this.config?.loadingDelay,
      params: args
    })

    if (this.config?.loadingDelay) {
      this.loadDelayTimer = setTimeout(() => {
        this.setResult({
          loading: true
        })
      }, this.config.loadingDelay)
    }

    return this.service(...args)
      .then((data) => {
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.loadDelayTimer) {
            clearTimeout(this.loadDelayTimer)
          }
          const result = this.config?.formatResult
            ? this.config.formatResult(data)
            : data

          this.config?.onSuccess && this.config.onSuccess(result, args)

          this.setResult({
            data: result,
            error: null,
            loading: false
          })

          return result
        }
      })
      .catch((error) => {
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.loadDelayTimer) {
            clearTimeout(this.loadDelayTimer)
          }

          this.setResult({
            data: null,
            error,
            loading: false
          })

          if (this.config?.onError) {
            this.config.onError(error, args)
          }

          if (this.config?.throwOnError) {
            throw error
          }

          console.error(error)

          return Promise.reject(
            `useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.`
          )
        }
      })
      .finally(() => {
        // 处理轮询
        if (!this.unmountedFlag && currentCount === this.count) {
          if (this.config?.pollingTime) {
            this.pollingTimer = setTimeout(() => {
              this._run(...args)
            }, this.config.pollingTime)
          }
        }
      })
  }

  run(...args: P): Promise<any> {
    if (this.debounceRun) {
      return this.debounceRun(...args)
    }
    if (this.throttleRun) {
      return this.throttleRun(...args)
    }
    return this._run(...args)
  }

  cancel(): void {
    this.debounceRun && this.debounceRun.cancel()
    this.throttleRun && this.throttleRun.cancel()
    this.loadDelayTimer && clearTimeout(this.loadDelayTimer)
    this.pollingTimer && clearTimeout(this.pollingTimer)
    this.count += 1
    this.setResult({
      loading: false
    })
  }

  refresh(): Promise<any> {
    return this.run(...(this.result.params as P))
  }

  unmount(): void {
    this.unmountedFlag = true
    this.cancel()
    this.unSubscribe.forEach((us) => {
      us()
    })
  }
}
