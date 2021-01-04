import { useBoolean } from '../src'
import { reactive } from 'vue-demi'

describe('test useBoolean', () => {
  test('test state and actions', async () => {
    const [state, { changeState, setTrue, setFalse }] = useBoolean(true)
    expect(state.value).toBe(true)

    setFalse()
    expect(state.value).toBe(false)

    setTrue()

    expect(state.value).toBe(true)

    changeState()

    expect(state.value).toBe(!state)
  })

  test('test options judge', async () => {
    const options: {
      [propName: string]: boolean
    } = reactive({
      0: true,
      '': true,
      usefalse: false
    })

    const [state, { changeState }] = useBoolean(true, options)

    expect(state.value).toBe(true)

    changeState(0)

    expect(state.value).toBe(true)

    changeState('usefalse')

    expect(state.value).toBe(false)

    changeState('')

    expect(state.value).toBe(true)

    options.usefalse = true

    changeState('usefalse')

    expect(state.value).toBe(true)

    options.addOptions = false

    changeState('addOptions')

    expect(state.value).toBe(false)
  })

})
