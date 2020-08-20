<template>
  <div>
    <div class="block">{{ num }}</div>
    <button @click="add">点击 num + 1</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useLocalStorage } from '@xuguo/vue-hooks'
export default {
  name: 'use-local-storage',
  setup() {
    const num = useLocalStorage('test', 1)
    function add() {
      num.value += 1
    }
    return {
      num,
      add,
    }
  },
}
</script>
