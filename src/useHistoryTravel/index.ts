import {
  Ref,
  watch,
  ref,
  UnwrapRef,
  getCurrentInstance,
  onUnmounted,
  computed,
  ComputedRef,
} from 'vue-demi'

type OptionalUnwrapRef<T> = UnwrapRef<T> | undefined

type ReturnValue<T> = {
  current: Ref<OptionalUnwrapRef<T>>
  go(step: number): void
  forward(): void
  back(): void
  forwardLength: ComputedRef<number>
  backLength: ComputedRef<number>
}

type TravelState<T> = {
  past: T[]
  future: T[]
}

enum UpdateStateFrom {
  GO,
  USER,
}

function dumpIndex(step: number, arr: any[]) {
  let index = step > 0 ? step - 1 : arr.length + step
  if (index >= arr.length) {
    index = arr.length - 1
  }
  if (index < 0) {
    index = 0
  }
  return index
}
function split<T>(step: number, arr: T[]) {
  const index = dumpIndex(step, arr)

  return {
    _before: arr.slice(0, index),
    _after: arr.slice(index + 1),
    _current: arr[index],
  }
}

export function useHistoryTravel<T>(initialValue?: T): ReturnValue<T> {
  const current = ref<T | undefined>(initialValue)
  const _backLength = ref<number>(0)
  const _forwardLength = ref<number>(0)
  let updateFrom: UpdateStateFrom = UpdateStateFrom.USER
  const travelState: TravelState<OptionalUnwrapRef<T>> = {
    past: [],
    future: [],
  }

  function updatePast(oldState: OptionalUnwrapRef<T>[], fullUpdate = false) {
    if (fullUpdate) {
      travelState.past = oldState
    } else {
      travelState.past = [...travelState.past, ...oldState]
    }
  }

  function updateFuture(oldState: OptionalUnwrapRef<T>[], fullUpdate = false) {
    if (fullUpdate) {
      travelState.future = oldState
    } else {
      travelState.future = [...travelState.future, ...oldState]
    }
  }

  function updateLength() {
    _backLength.value = travelState.past.length
    _forwardLength.value = travelState.future.length
  }

  function _back(step = -1) {
    const { _after, _current, _before } = split(step, travelState.past)
    updatePast(_before, true)
    updateFuture([..._after, current.value])
    current.value = _current
  }

  function _forward(step = 1) {
    const { _after, _current, _before } = split(step, travelState.future)
    updatePast([current.value, ..._before])
    updateFuture(_after, true)
    current.value = _current
  }

  function go(step = 0) {
    if (step === 0) {
      return
    }
    updateFrom = UpdateStateFrom.GO
    if (step > 0) {
      return _forward(step)
    }
    return _back(step)
  }

  const stop = watch(
    current,
    (_, oldState) => {
      if (updateFrom === UpdateStateFrom.USER) {
        updatePast([oldState])
      } else {
        updateFrom = UpdateStateFrom.USER
      }
      updateLength()
    },
    { flush: 'sync' }
  )

  if (getCurrentInstance()) {
    onUnmounted(() => stop())
  }

  return {
    current,
    go,
    forward: () => go(1),
    back: () => go(-1),
    backLength: computed(() => _backLength.value),
    forwardLength: computed(() => _forwardLength.value),
  }
}
