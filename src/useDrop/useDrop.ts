import { ref, Ref, computed, ComputedRef } from 'vue-demi'
type DropOpt = {
  onDom?: (content: any, evt?: DragEvent) => void
  onText?: (text: string, evt?: ClipboardEvent) => void
  onUri?: (uri: string, evt?: DragEvent) => void
  onFiles?: (files: File[], evt?: DragEvent) => void
}
type DragEventHandler = (evt: DragEvent) => any
type DropProps = {
  onDragOver: DragEventHandler
  onDragEnter: DragEventHandler
  onDragLeave: DragEventHandler
  onDrop: DragEventHandler
  onPaste: (evt: ClipboardEvent) => any
}

type CallbackFn = (
  dataTransfer: DataTransfer,
  evt: DragEvent | ClipboardEvent
) => any

function getProps(callback: CallbackFn, isHovering: Ref<boolean>): DropProps {
  return {
    onDragOver(evt) {
      evt.preventDefault()
    },
    onDragEnter(evt) {
      evt.preventDefault()
      isHovering.value = true
    },
    onDragLeave(evt) {
      evt.preventDefault()
      isHovering.value = false
    },
    onDrop(evt) {
      evt.preventDefault()
      isHovering.value = false
      callback(evt.dataTransfer!, evt)
    },
    onPaste(evt) {
      evt.preventDefault()
      callback(evt.clipboardData!, evt)
    },
  }
}

export function useDrop(
  options: DropOpt = {}
): [DropProps, ComputedRef<boolean>] {
  const isHovering = ref(false)
  const callback: CallbackFn = (dataTransfer, evt) => {
    const uri = dataTransfer?.getData('text/uri-list')
    const dom = dataTransfer?.getData('custom')
    if (uri && options?.onUri) {
      options.onUri(uri, evt as DragEvent)
    }
    if (dom && options?.onDom) {
      options.onDom(dom, evt as DragEvent)
    }
    if (dataTransfer.files && options?.onFiles) {
      options.onFiles([...dataTransfer.files], evt as DragEvent)
    }
    if (
      dataTransfer.items &&
      dataTransfer.items.length > 0 &&
      options?.onText
    ) {
      dataTransfer.items[0].getAsString((text) => {
        options.onText!(text, evt as ClipboardEvent)
      })
    }
  }
  return [getProps(callback, isHovering), computed(() => isHovering.value)]
}
