import { ref, Ref, isReactive, reactive } from 'vue-demi'

type changeStateType = (value?: any) => void

type Actions = {
  setTrue: () => void
  setFalse: () => void
  changeState: changeStateType
}

type BolOptions = {
  [propName: string]: boolean
}

type ReturnValue = [Ref, Actions]

function toggleBase(
  defaultValue: boolean,
  options: BolOptions = {}
): [Ref, changeStateType] {
  const state = ref(defaultValue)

  // todo 是否需要抛出Set bolMap
  const bolMap: BolOptions = isReactive(options) ? options : reactive(options)

  const changeState = (value: any) => {
    if (bolMap[value] !== undefined) {
      state.value = bolMap[value]
    } else if (typeof value !== 'boolean') {
      state.value = !state.value
    } else {
      state.value = value
    }
  }

  return [state, changeState]
}

export function useBoolean(
  defaultValue: boolean,
  options?: BolOptions
): ReturnValue {
  const [state, changeState] = toggleBase(defaultValue, options)

  const actions = () => {
    const setTrue = () => changeState(true)
    const setFalse = () => changeState(false)
    return { changeState, setTrue, setFalse }
  }

  return [state, actions()]
}
