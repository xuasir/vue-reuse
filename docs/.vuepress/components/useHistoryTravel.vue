<template>
  <div>
    <div class="add">
      <input type="text" placeholder="请输入" v-model="inputRef" />
      <button @click="add">添加</button>
    </div>
    <ul class="list">
      <h4>历史记录</h4>
      <li
        v-for="(val, i) in allData"
        :key="i"
        :class="{ current: val == current }"
      >
        {{ val }}
      </li>
    </ul>
    <div class="operate">
      <button @click="forward">前进</button>
      <button @click="back">后退</button>
    </div>
    <div class="operate">
      <input type="number" v-model="goRef" />
      <button @click="() => go(+goRef)">Go</button>
    </div>
    <div class="info">
      <span class="block">可前进步数：{{ forwardLength }}</span>
      <span class="block">可后退步数：{{ backLength }}</span>
    </div>
  </div>
</template>
<script>
import { useHistoryTravel } from '@vcake/vue-hooks'
import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'use-history-travel',
  setup() {
    const allData = reactive([])
    const {
      current,
      backLength,
      forwardLength,
      back,
      forward,
      go
    } = useHistoryTravel('initial value')

    allData.push(current.value)

    const inputRef = ref('')
    const goRef = ref(0)
    function add() {
      current.value = inputRef.value
      inputRef.value = ''
      allData.push(current.value)
    }

    return {
      current,
      backLength,
      forwardLength,
      back,
      forward,
      go,
      allData,
      inputRef,
      add,
      goRef
    }
  }
}
</script>
<style scoped>
h4 {
  margin: 0 0 10px 0;
}
input {
  box-sizing: border-box;
  height: 30px;
}
button {
  box-sizing: border-box;
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 500;
}
.list {
  margin: 0;
  padding: 20px 0;
  border-bottom: 1px solid gray;
}
.list .current {
  color: #3eaf7c;
}
.operate {
  margin: 10px 0;
}
.operate input {
  margin-left: 0;
  width: 100px;
}
</style>
