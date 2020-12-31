import { useLocalStorage } from '../src/useLocalStorage'

const KEY = 'local'
describe('test useLocalStorage', () => {
  const nextTick = () => Promise.resolve().then()
  afterEach(() => {
    localStorage.clear()
  })

  test('storage will sync', async () => {
    const sv = useLocalStorage(KEY, 1)
    expect(sv.value).toBe(1)
    sv.value = 2
    await nextTick()
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(2))
  })

  test('test array', async () => {
    const sv = useLocalStorage(KEY, [1, 2, 3])
    expect(sv.value).toEqual([1, 2, 3])
    sv.value.push(4)
    await nextTick()
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(
      KEY,
      JSON.stringify([1, 2, 3, 4])
    )
  })

  test('test object', async () => {
    const sv = useLocalStorage(KEY, { a: 1, b: '2', c: { d: 4 } })
    expect(sv.value).toEqual({ a: 1, b: '2', c: { d: 4 } })
    sv.value.c.d = 5
    await nextTick()
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(
      KEY,
      JSON.stringify({ a: 1, b: '2', c: { d: 5 } })
    )
  })

  test('test undefined', async () => {
    const sv = useLocalStorage(KEY)
    expect(sv.value).toBeUndefined()
    sv.value = 1
    await nextTick()
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(1))
  })

  test('test null', async () => {
    const sv = useLocalStorage(KEY, null)
    expect(sv.value).toBeUndefined()
    sv.value = [1]
    await nextTick()
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify([1]))
  })
})
