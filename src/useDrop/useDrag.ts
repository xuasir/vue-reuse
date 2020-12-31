type DragProps<T> = {
  draggable: 'true'
  key: T extends unknown ? (key: any) => string : string
  onDragStart: T extends unknown
    ? (key: any) => (evt: DragEvent) => void
    : (evt: DragEvent) => void
}

type DragFn = <T extends any>(key?: T) => DragProps<T>

export function useDrag(): DragFn {
  function getProps(): DragProps<unknown>
  function getProps(key: any): DragProps<any>
  function getProps(key?: any): any {
    if (typeof key === 'undefined') {
      return {
        draggable: 'true' as const,
        key: (customKey: any) => JSON.stringify(customKey),
        onDragStart: (customKey: any) => (evt: DragEvent) => {
          evt.dataTransfer?.setData('custom', JSON.stringify(customKey))
        }
      }
    } else {
      return {
        draggable: 'true' as const,
        key: JSON.stringify(key),
        onDragStart: (evt: DragEvent) => {
          evt.dataTransfer?.setData('custom', JSON.stringify(key))
        }
      }
    }
  }
  return getProps
}
