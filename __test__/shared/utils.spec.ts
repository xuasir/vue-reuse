import { createStorage } from '../../src/shared/utils'

describe('test utils ', () => {
  test(`test createStorage`, () => {
    const store = createStorage()
    expect(store.length).toBe(0)
    store.setItem('1', '1')
    expect(store.getItem('1')).toBe('1')
    store.setItem('2', '2')
    expect(store.key(1)).toBe('2')
    store.removeItem('1')
    expect(store.key(0)).toBe('2')
    store.clear()
    expect(store.length).toBe(0)
  })
})
