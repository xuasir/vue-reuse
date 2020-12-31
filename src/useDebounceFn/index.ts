type ReturnValue<T extends any[]> = {
  run(...args: T): any
  cancel(): void
}

export function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  wait = 0
): ReturnValue<T> {
  let timer: any = null

  function run(...args: T) {
    cancel()
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
    }
  }

  return {
    run,
    cancel
  }
}
