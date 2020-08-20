import {
  Ref,
  ref,
  computed,
  ComputedRef,
  watch,
  getCurrentInstance,
  onUnmounted,
  reactive,
} from 'vue-demi'
type ReturnValue<T> = {
  list: ComputedRef<{ data: T; index: number }[]>
  wrapperProps: {
    style: {
      width: '100%'
      height: Ref<number>
      paddingTopRef: ComputedRef<number>
    }
  }
  containeProps: {
    containeRef: Ref<null | HTMLElement>
    onScroll(evt: Event): void
    style: { overflowY: 'auto' }
  }
  scrollTo(index: number): void
}

type Options = {
  itemHeight: number | ((index: number) => number)
  overscan?: number
}

export function useVirtualList<T>(list: T[], options: Options): ReturnValue<T> {
  const { itemHeight, overscan = 5 } = options
  const el = ref<null | HTMLElement>(null)
  const paddingTopRef = ref<number>(0)
  const totalHeightRef = ref<number>(0)
  // list
  // calculate change listState ---> computed run change listRef
  const listState = reactive({ start: 0, end: 10 })
  const listRef = computed<{ data: T; index: number }[]>(() =>
    list.slice(listState.start, listState.end).map((data, index) => {
      return {
        data,
        index: index + listState.start,
      }
    })
  )

  // totalheight
  function getHeight(index: number): number {
    if (typeof itemHeight === 'number') {
      return index * itemHeight
    } else {
      return list
        .slice(0, index)
        .reduce((sum, _, index) => sum + itemHeight(index), 0)
    }
  }
  const stopWatchListLen = watch(
    () => list.length,
    (newLen, oldLen) => {
      if (newLen !== oldLen) {
        totalHeightRef.value = getHeight(list.length)
      }
    },
    { immediate: true, flush: 'sync' }
  )
  // scroll to
  function scrollTo(index: number): void {
    if (el.value) {
      el.value.scrollTop = getHeight(index)
      // 计算list
      calculateRange()
    }
  }

  // set state
  function calculateRange() {
    const element = el.value
    if (element) {
      // 计算偏移量
      const offset = getOffset(element.scrollTop)
      // 计算一屏显示个数
      const viewCapacity = getViewCapacity(element.clientHeight)
      // 设置
      const from = offset - overscan
      const to = offset + viewCapacity + overscan
      listState.start = from < 0 ? 0 : from
      listState.end = to > list.length ? list.length : to
    }
  }

  function getOffset(top: number): number {
    if (typeof itemHeight === 'number') {
      return ((top / itemHeight) | 0) + 1
    } else {
      let sum = 0
      let offset = 0
      for (let i = 0; i < list.length; i++) {
        sum += itemHeight(i)
        if (sum > top) {
          offset = i
          break
        }
      }
      return offset + 1
    }
  }

  function getViewCapacity(height: number): number {
    if (typeof itemHeight === 'number') {
      return Math.ceil(height / itemHeight)
    } else {
      let sum = 0
      let capacity = 0
      for (let i = listState.start; i < list.length; i++) {
        sum += itemHeight(i)
        if (sum > height) {
          capacity = i
          break
        }
      }
      return capacity - listState.start
    }
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      stopWatchListLen()
    })
  }

  return {
    list: listRef,
    wrapperProps: {
      style: {
        width: '100%' as const,
        height: totalHeightRef,
        paddingTopRef: computed(() => paddingTopRef.value),
      },
    },
    containeProps: {
      containeRef: el,
      onScroll(e) {
        e.preventDefault()
        calculateRange()
      },
      style: { overflowY: 'auto' as const },
    },
    scrollTo,
  }
}
