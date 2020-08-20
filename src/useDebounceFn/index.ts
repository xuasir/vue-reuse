type ReturnValue<T extends any[]> = {
  run(...args: T): any
  cancel(): void
}

export function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  wait: number
): ReturnValue<T> {
  const _wait = typeof wait === 'number' ? wait : 0
  let timer: any = null

  function run(...args: T) {
    cancel()
    timer = setTimeout(() => {
      fn(...args)
    }, _wait)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
    }
  }

  return {
    run,
    cancel,
  }
}
