import { isRef } from 'vue-demi'
import { useHistoryTravel } from '../src'

describe('test history travel', () => {
  test('should be return a ref', () => {
    const { current, backLength, forwardLength } = useHistoryTravel(1)
    expect(isRef(current)).toBeTruthy()
    expect(current.value).toBe(1)
    // expect(isReadonly(backLength)).toBeTruthy()
    // expect(isReadonly(forwardLength)).toBeTruthy()
    expect(backLength.value).toBe(0)
    expect(forwardLength.value).toBe(0)
  })

  test('test history', () => {
    const {
      current,
      backLength,
      forwardLength,
      back,
      forward,
    } = useHistoryTravel(1)
    expect(isRef(current)).toBeTruthy()
    expect(current.value).toBe(1)
    current.value = 2
    expect(backLength.value).toBe(1)
    // back 1 step
    back()
    expect(current.value).toBe(1)
    expect(backLength.value).toBe(0)
    expect(forwardLength.value).toBe(1)
    // forward 1 step
    forward()
    expect(current.value).toBe(2)
    expect(backLength.value).toBe(1)
    expect(forwardLength.value).toBe(0)
  })

  test('method go', () => {
    const { current, backLength, forwardLength, go } = useHistoryTravel(1)

    for (const val of [2, 3, 4]) {
      current.value = val
      expect(current.value).toBe(val)
      // expect(backLength.value).toBe(val)
    }

    expect(backLength.value).toBe(3)
    expect(forwardLength.value).toBe(0)
    // back 2 step
    go(-2)
    expect(current.value).toBe(2)
    expect(backLength.value).toBe(1)
    expect(forwardLength.value).toBe(2)
    // forward 2 step
    go(2)
    expect(current.value).toBe(4)
    expect(backLength.value).toBe(3)
    expect(forwardLength.value).toBe(0)
  })
})
