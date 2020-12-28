<template>
  <div>
    <input type="text" @input="(e) => (debounceRef = e.target.value)" />
    <div class="block">debounce Ref: {{ debounceRef }}</div>
  </div>
</template>
<script>
import { useDebounceRef } from '@vcake/vue-hooks'
export default {
  name: 'use-debounce-ref',
  setup() {
    const debounceRef = useDebounceRef('', 500)
    return {
      debounceRef
    }
  }
}
</script>
