<template>
  <div>
    <input type="text" @input="(e) => (rawRef = e.target.value)" />
    <div class="block">throttle Ref: {{ throttleRef }}</div>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useThrottleRef } from '@xuguo/vue-hooks'
export default {
  name: 'use-throttle-ref',
  setup() {
    const rawRef = ref('')
    const throttleRef = useThrottleRef(rawRef, 300)
    return {
      throttleRef,
      rawRef,
    }
  },
}
</script>
