<template>
  <div>
    <input type="text" @input="(e) => (throttleRef = e.target.value)" />
    <div class="block">throttle Ref: {{ throttleRef }}</div>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useThrottleRef } from '@xuguo/vue-hooks'
export default {
  name: 'use-throttle-ref',
  setup() {
    const throttleRef = useThrottleRef('', 300)
    return {
      throttleRef,
    }
  },
}
</script>
