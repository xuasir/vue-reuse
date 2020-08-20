<template>
  <div>
    <div>num: {{ num }}</div>
    <button ref="el">点击num + 1</button>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useEventListener } from '@xuguo/vue-hooks'
export default {
  name: 'use-eventlisener',
  setup() {
    const num = ref(0)
    const el = useEventListener('click', () => (num.value += 1))
    return {
      num,
      el,
    }
  },
}
</script>
