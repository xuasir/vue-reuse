import { renderComposable } from './utils'
import { useScroll } from '../src/useScroll'

describe('test use scroll ', () => {
  test('can be render ', async () => {
    const { vm } = renderComposable(() => {
      const [pos] = useScroll(document.body)
      return {
        pos
      }
    })
    await vm.$nextTick()
    expect(vm.$data.pos.x).toBe(0)
    expect(vm.$data.pos.y).toBe(0)
  })
})
