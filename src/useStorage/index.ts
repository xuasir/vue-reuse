import { Ref, ref, watch, getCurrentInstance, onUnmounted } from 'vue-demi'

type BasicType = boolean | string | number

export function useStorage(
  storage: Storage,
  key: string,
  defaultValue?: undefined
): Ref<any>
export function useStorage(
  storage: Storage,
  key: string,
  defaultValue: null
): Ref<any>
export function useStorage(
  storage: Storage,
  key: string,
  defaultValue: string
): Ref<string>
export function useStorage(
  storage: Storage,
  key: string,
  defaultValue: number
): Ref<number>
export function useStorage(
  storage: Storage,
  key: string,
  defaultValue: boolean
): Ref<boolean>
export function useStorage<T extends Record<string, unknown>>(
  storage: Storage,
  key: string,
  defaultValue: T
): Ref<T>
export function useStorage<T extends unknown[]>(
  storage: Storage,
  key: string,
  defaultValue: T
): Ref<T>
export function useStorage<
  T extends BasicType | Record<string, unknown> | unknown[] | null
>(storage: Storage, key: string, defaultValue: T): Ref<any> {
  const storageValue = ref<T>()

  function readValue(): T | undefined {
    try {
      const rawValue = storage.getItem(key)
      if (rawValue) {
        return JSON.parse(rawValue)
      } else {
        return defaultValue
      }
    } catch (error) {
      console.warn(error)
    }
  }

  function writeValue(value: T | undefined) {
    if (typeof value === 'undefined') {
      storage.removeItem(key)
    } else {
      storage.setItem(key, JSON.stringify(value))
    }
  }

  const _dv = readValue()
  _dv && (storageValue.value = _dv)

  const stop = watch(
    storageValue,
    (newValue) => {
      writeValue(newValue)
    },
    {
      flush: 'post',
      deep: true,
    }
  )

  if (getCurrentInstance()) {
    onUnmounted(() => stop())
  }

  return storageValue
}
