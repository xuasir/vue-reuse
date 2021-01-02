<template>
  <div>
    <div class="block">num Ref: {{ num }}</div>
    <button @click="run">点击执行run</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useThrottleFn } from '@xus/vue-reuse'
export default {
  name: 'use-throttle-fn',
  setup() {
    const num = ref(0)
    const { run } = useThrottleFn(() => {
      num.value += 1
    }, 500)
    return {
      run,
      num
    }
  }
}
</script>
