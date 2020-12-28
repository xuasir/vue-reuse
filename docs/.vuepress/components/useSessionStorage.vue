<template>
  <div>
    <div class="block">{{ num }}</div>
    <button @click="add">点击 num + 1</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useSessionStorage } from '@vcake/vue-hooks'
export default {
  name: 'use-session-storage',
  setup() {
    const num = useSessionStorage('test', 1)
    function add() {
      num.value += 1
    }
    return {
      num,
      add
    }
  }
}
</script>
