import { Ref } from 'vue-demi'
import { useStorage } from '../useStorage'

export function useLocalStorage(key: string, defaultValue?: undefined): Ref<any>
export function useLocalStorage(key: string, defaultValue: null): Ref<any>
export function useLocalStorage(key: string, defaultValue: string): Ref<string>
export function useLocalStorage(key: string, defaultValue: number): Ref<number>
export function useLocalStorage(
  key: string,
  defaultValue: boolean
): Ref<boolean>
export function useLocalStorage<T extends Record<string, unknown>>(
  key: string,
  defaultValue: T
): Ref<T>
export function useLocalStorage<T extends unknown[]>(
  key: string,
  defaultValue: T
): Ref<T>
export function useLocalStorage<
  T extends string | number | boolean | Record<string, unknown> | [] | null
>(key: string, initialValue: T): Ref<any> {
  return useStorage(localStorage, key, initialValue as any)
}
