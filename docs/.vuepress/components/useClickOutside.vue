<template>
  <div>
    <div class="block">{{ num }}</div>
    <button ref="elRef">点击外部 num + 1</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useClickOutside } from '@xus/vue-reuse'
export default {
  name: 'use-click-outside',
  setup() {
    const num = ref(0)
    const elRef = useClickOutside(() => {
      num.value += 1
    })
    return {
      num,
      elRef
    }
  }
}
</script>
