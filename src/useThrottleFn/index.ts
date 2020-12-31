type ReturnValue<T> = {
  run(...args: T[]): void
  cancel(): void
}

export function useThrottleFn<T>(
  fn: (...args: T[]) => any,
  wait = 0
): ReturnValue<T> {
  let time: any = null
  function run(...args: T[]) {
    if (!time) {
      time = setTimeout(() => {
        fn(...args)
        time = null
      }, wait)
    }
  }

  function cancel() {
    if (time) {
      clearTimeout(time)
    }
  }

  return {
    run,
    cancel
  }
}
