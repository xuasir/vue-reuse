<template>
  <div>
    <div class="block">scroll X: {{ pos.x }}</div>
    <div class="block">scroll Y: {{ pos.y }}</div>
  </div>
</template>
<script>
import { useScroll } from '@vcake/vue-hooks'
export default {
  name: 'use-scroll',
  setup() {
    const [pos] = useScroll()
    return {
      pos
    }
  }
}
</script>
