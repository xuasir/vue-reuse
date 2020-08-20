type DragProps =
  | {
      draggable: 'true'
      key: string
      onDragStart: (evt: DragEvent) => void
    }
  | {
      draggable: 'true'
      key: (key: any) => string
      onDragStart: (key: any) => (evt: DragEvent) => void
    }
type DragFn = (key?: any) => DragProps

export function useDrag(): DragFn {
  function getProps(key?: any) {
    if (typeof key === 'undefined') {
      return {
        draggable: 'true' as const,
        key: (customKey: any) => JSON.stringify(customKey),
        onDragStart: (customKey: any) => (evt: DragEvent) => {
          evt.dataTransfer?.setData('custom', JSON.stringify(customKey))
        },
      }
    } else {
      return {
        draggable: 'true' as const,
        key: JSON.stringify(key),
        onDragStart: (evt: DragEvent) => {
          evt.dataTransfer?.setData('custom', JSON.stringify(key))
        },
      }
    }
  }
  return getProps
}
