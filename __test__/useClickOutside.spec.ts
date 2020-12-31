import { renderComposable } from './utils'
import { useClickOutside } from '../src/useClickOutside'

describe('test use click outside ', () => {
  let div: HTMLDivElement, button: HTMLButtonElement
  beforeEach(() => {
    div = document.createElement('div')
    button = document.createElement('button')
    document.body.appendChild(button)
    document.body.appendChild(div)
  })

  afterEach(() => {
    document.body.removeChild(button)
    document.body.removeChild(div)
  })

  test('test listener by dom ', async () => {
    const fn = jest.fn()
    const wrapper = renderComposable(() => {
      const elRef = useClickOutside(fn, button)
      return { elRef }
    })
    const { vm } = wrapper
    vm.$data.elRef = button
    await vm.$nextTick()
    expect(vm.$data.elRef).toBeDefined()
    await button.click()
    expect(fn).not.toBeCalled()
    await div.click()
    expect(fn).toBeCalled()
    await div.click()
    expect(fn).toBeCalledTimes(2)

    wrapper.destroy()
  })

  test('test listener by dom func ', async () => {
    const fn = jest.fn()
    const wrapper = renderComposable(() => {
      const elRef = useClickOutside(fn, () => button)
      return { elRef }
    })
    const { vm } = wrapper
    vm.$data.elRef = button
    await vm.$nextTick()
    expect(vm.$data.elRef).toBeDefined()
    await button.click()
    expect(fn).not.toBeCalled()
    await div.click()
    expect(fn).toBeCalled()
    await div.click()
    expect(fn).toBeCalledTimes(2)

    wrapper.destroy()
  })
})
