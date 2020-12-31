import { useVirtualList, Options } from '../src/useVirtualList'
import { nextTick } from './utils'

describe('test use virtual list', () => {
  let mockEle = { scrollTop: 0, clientHeight: 300 }
  const setup = (opts: Partial<Options> = {}) => {
    const res = useVirtualList(
      Array.from({ length: 100 }).map((_, i) => i + 1),
      {
        itemHeight: 30,
        ...opts
      }
    )
    res.containeRef.value = mockEle as HTMLElement
    return res
  }

  afterEach(() => {
    mockEle = { scrollTop: 0, clientHeight: 300 }
  })

  test(`oversacn default 5 `, async () => {
    const { list, scrollTo, wrapperProps } = setup()
    await nextTick()
    expect(list.value.length).toBe(10)
    expect(wrapperProps.style.height).toBe(`0px`)
    scrollTo(20)
    // default overscan 5 * 2 + 10
    expect(mockEle.scrollTop).toBe(30 * 20)
    expect(list.value.length).toBe(20)
  })

  test('func itemHeight ', () => {
    const { list, scrollTo } = setup({ itemHeight: () => 10 })
    expect(list.value.length).toBe(10)
    scrollTo(20)
    // default overscan 5 * 2 + 30
    expect(mockEle.scrollTop).toBe(10 * 20)
    expect(list.value.length).toBe(40)
  })
})
