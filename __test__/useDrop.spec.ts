import { useDrop, useDrag } from '../src'

const mockUriEvent: any = (text: string) => ({
  dataTransfer: {
    getData: (key: string) => (key === 'text/uri-list' && text) || null,
    setData: () => {}
  },
  preventDefault: () => {},
  persist: () => {}
})

const mockDomEvent: any = (content: any) => ({
  dataTransfer: {
    getData: () => JSON.stringify(content),
    setData: () => {}
  },
  preventDefault: () => {},
  persist: () => {}
})

const mockTextEvent: any = (content: string) => ({
  dataTransfer: {
    getData: () => null,
    setData: () => {},
    items: [
      {
        getAsString: (cb: any) => {
          cb(content)
        }
      }
    ]
  },
  preventDefault: () => {},
  persist: () => {}
})

const mockFileEvent: any = (content: string[]) => ({
  dataTransfer: {
    getData: () => null,
    setData: () => {},
    files: content
  },
  preventDefault: () => {},
  persist: () => {}
})

describe('test drop drag ', () => {
  const KEY = 'drag'
  test('test drag', () => {
    const dragProps = useDrag()(KEY)
    expect(dragProps.key).toBe(JSON.stringify(KEY))
    const dragProps2 = useDrag()()
    expect(dragProps2.key(KEY)).toBe(JSON.stringify(KEY))
  })

  test('test drop ', async () => {
    const onDomFn = jest.fn()
    const onFilesFn = jest.fn()
    const onTextFn = jest.fn()
    const onUriFn = jest.fn()
    const [dropProps] = useDrop({
      onDom: onDomFn,
      onFiles: onFilesFn,
      onText: onTextFn,
      onUri: onUriFn
    })
    dropProps.onDrop(mockDomEvent('dom'))
    expect(onDomFn).toBeCalled()

    dropProps.onDrop(mockUriEvent('uri'))
    expect(onUriFn).toBeCalled()

    dropProps.onDrop(mockFileEvent(['file1', 'file2']))
    expect(onFilesFn).toBeCalled()

    dropProps.onDrop(mockTextEvent('text'))
    expect(onTextFn).toBeCalled()
  })
})
