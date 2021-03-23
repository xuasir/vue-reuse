import {useLatest}  from '../src'
import {isRef,ref} from 'vue-demi'

const count = ref<number>(0)

describe('test useLatest', () => {
  const current1 = useLatest(count)
  test('test current value', async () => { 
    expect(isRef(current1)).toBe(true)
    expect(current1.value).toBe(0)
  })
})