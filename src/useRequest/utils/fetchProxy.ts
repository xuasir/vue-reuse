export function fetchProxy(
  ...args: [RequestInfo, RequestInit | undefined]
): Promise<Response> {
  return fetch(...args).then((res: Response) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  })
}
