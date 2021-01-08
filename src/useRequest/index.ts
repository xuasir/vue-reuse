import {
  Service,
  BaseRequestOptions,
  BaseRequestOptionsWithFormat,
  RequestService,
  RequestOptions,
  RequestOptionsWithFormat,
  AsyncResult
} from './utils/types'
import { fetchProxy } from './utils/fetchProxy'
import { useAsync } from './useAsync'

export function useRequest<R, P extends any[]>(
  service: Service<R, P>,
  config: BaseRequestOptions<R, P>
): AsyncResult<R, P>
export function useRequest<R, P extends any[], U, UU extends U>(
  service: Service<R, P>,
  config: BaseRequestOptionsWithFormat<R, P, U, UU>
): AsyncResult<UU, P>
// custom request
export function useRequest<R, P extends any[]>(
  service: RequestService<P>,
  config: RequestOptions<R, P, typeof service>
): AsyncResult<R, P>
export function useRequest<R, P extends any[], U, UU extends U>(
  service: RequestService<P>,
  config: RequestOptionsWithFormat<R, P, U, UU, typeof service>
): AsyncResult<UU, P>

export function useRequest(service: any, config: any = {}): any {
  const { requestMethod, ...rest } = config
  const userService = requestMethod || fetchProxy
  let finalRequest: () => Promise<any>
  switch (typeof service) {
    case 'string':
      finalRequest = (...args: any[]) => userService(service, ...args)
      break

    case 'object':
      {
        const { url, ...rest } = service
        finalRequest = (...args: any[]) =>
          requestMethod
            ? requestMethod(service, ...args)
            : fetchProxy(url, rest)
      }
      break

    default:
      finalRequest = (...args: any[]) =>
        new Promise((resolve, reject) => {
          const s = service(...args)
          let fn = s
          if (!s?.then) {
            switch (typeof s) {
              case 'string':
                fn = userService(s)
                break

              case 'object':
                {
                  const { url, ...rest } = s
                  fn = requestMethod ? requestMethod(s) : fetchProxy(url, rest)
                }
                break
            }
          }
          fn.then(resolve).catch(reject)
        })
  }

  return useAsync(finalRequest, rest)
}
