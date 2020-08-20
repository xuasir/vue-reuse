type ReturnValue<T> = {
  run(...args: T[]): void
  cancel(): void
}

export function useThrottleFn<T>(
  fn: (...args: T[]) => any,
  wait?: number
): ReturnValue<T> {
  const _wait = typeof wait === 'number' ? wait : 0
  let time: any = null
  function run(...args: T[]) {
    if (!time) {
      time = setTimeout(() => {
        fn(...args)
        time = null
      }, _wait)
    }
  }

  function cancel() {
    if (time) {
      clearTimeout(time)
    }
  }

  return {
    run,
    cancel,
  }
}
