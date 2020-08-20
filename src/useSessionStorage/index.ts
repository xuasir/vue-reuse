import { Ref } from 'vue-demi'
import { useStorage } from '../useStorage'

export function useSessionStorage(
  key: string,
  defaultValue?: undefined
): Ref<any>
export function useSessionStorage(key: string, defaultValue: null): Ref<any>
export function useSessionStorage(
  key: string,
  defaultValue: string
): Ref<string>
export function useSessionStorage(
  key: string,
  defaultValue: number
): Ref<number>
export function useSessionStorage(
  key: string,
  defaultValue: boolean
): Ref<boolean>
export function useSessionStorage<T extends Record<string, unknown>>(
  key: string,
  defaultValue: T
): Ref<T>
export function useSessionStorage<T extends unknown[]>(
  key: string,
  defaultValue: T
): Ref<T>
export function useSessionStorage<
  T extends string | number | boolean | Record<string, unknown> | [] | null
>(key: string, initialValue: T): Ref<any> {
  return useStorage(sessionStorage, key, initialValue as any)
}
