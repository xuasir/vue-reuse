import { ref ,Ref} from 'vue-demi'
const useLatest = <T>(num: T): Ref<T> => {
  const refLatest = ref(num)
  refLatest.value = num.value
  return refLatest
}
export { useLatest }
