import {
  Ref,
  ref,
  computed,
  ComputedRef,
  getCurrentInstance,
  reactive,
  onMounted,
  watchEffect,
  isRef,
} from 'vue-demi'
import { useThrottleFn } from 'src/useThrottleFn'
type ReturnValue<T> = {
  list: ComputedRef<{ data: T; index: number }[]>
  wrapperProps: {
    style: {
      width: '100%'
      boxSizing: 'border-box'
      height: string
      paddingTop: string
    }
  }
  containeRef: Ref<null | HTMLElement>
  containeProps: {
    onScroll(evt: Event): void
    style: { overflowY: 'auto' }
  }
  scrollTo(index: number): void
}

type Options = {
  itemHeight: number | ((index: number) => number)
  overscan?: number
}

export function useVirtualList<T>(
  rawList: T[] | Ref<T[]>,
  options: Options
): ReturnValue<T> {
  const { itemHeight, overscan = 5 } = options
  const el = ref<null | HTMLElement>(null)
  const paddingTopRef = ref<number>(0)
  const totalHeightRef = ref<number>(0)
  // list
  function list(): T[] {
    if (isRef(rawList)) {
      return rawList.value
    } else {
      return rawList
    }
  }
  const listState = reactive({ start: 0, end: 10 })
  const listRef = computed<{ data: T; index: number }[]>(() =>
    list()
      .slice(listState.start, listState.end)
      .map((data, index) => {
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
      return list()
        .slice(0, index)
        .reduce((sum, _, index) => sum + itemHeight(index), 0)
    }
  }

  // scroll to
  function scrollTo(index: number): void {
    if (el.value) {
      // 边界情况
      index < 0 && (index = 0)
      index > list.length && (index = list().length)
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
      const currentLen = list().length
      // 到达列表最末端时候不需要再修改
      if (to >= currentLen && listState.end === currentLen) return
      listState.start = from < 0 ? 0 : from
      listState.end = to > currentLen ? currentLen : to
      paddingTopRef.value = getHeight(listState.start)
    }
  }
  // throttle
  const { run: runCalcelateRange } = useThrottleFn(calculateRange, 80)

  function getOffset(top: number): number {
    if (typeof itemHeight === 'number') {
      return ((top / itemHeight) | 0) + 1
    } else {
      let sum = 0
      let offset = 0
      const len = list().length
      for (let i = 0; i < len; i++) {
        sum += itemHeight(i)
        if (sum >= top) {
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
      const len = list().length
      for (let i = listState.start + overscan; i < len; i++) {
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
    onMounted(() => {
      // init totalheight
      watchEffect(() => {
        const total = getHeight(list().length)
        if (total !== totalHeightRef.value) {
          totalHeightRef.value = total
        }
      })
      // init range
      calculateRange()
    })
  }

  return {
    list: listRef,
    wrapperProps: reactive({
      style: {
        width: '100%' as const,
        boxSizing: 'border-box' as const,
        height: computed(() => `${totalHeightRef.value}px`),
        paddingTop: computed(() => `${paddingTopRef.value}px`),
      },
    }),
    containeRef: el,
    containeProps: {
      onScroll(e) {
        e.preventDefault()
        runCalcelateRange()
      },
      style: { overflowY: 'auto' as const },
    },
    scrollTo,
  }
}
