<template>
  <div>
    <input type="text" @input="(e) => (rawRef = e.target.value)" />
    <div class="block">debounce Ref: {{ debounceRef }}</div>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useDebounceRef } from '@xuguo/vue-hooks'
export default {
  name: 'use-debounce-ref',
  setup() {
    const rawRef = ref('')
    const debounceRef = useDebounceRef(rawRef, 500)
    return {
      debounceRef,
      rawRef,
    }
  },
}
</script>
