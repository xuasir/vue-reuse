<template>
  <div>
    <div class="input-wrap">
      <input
        type="number"
        placeholder="jump to index"
        @change="(e) => scrollTo(e.target.value)"
      />
    </div>
    <div
      class="containe"
      ref="containeRef"
      :style="containeProps.style"
      @scroll="containeProps.onScroll"
    >
      <div :style="wrapperProps.style">
        <span class="item" v-for="v in list">item {{ v.index }}</span>
      </div>
    </div>
    <div class="add">
      <button @click="addTen">添加10条数据</button>
    </div>
  </div>
</template>
<script>
import { useVirtualList } from '@xus/vue-reuse'
import {
  isReactive,
  reactive,
  watchEffect,
  shallowRef,
  ref
} from '@vue/composition-api'

export default {
  name: 'use-virtual-list',
  setup() {
    const rawList = ref(Array.from(Array(100).keys()))
    const {
      list,
      wrapperProps,
      containeProps,
      containeRef,
      scrollTo
    } = useVirtualList(rawList, {
      itemHeight: 50
    })

    function addTen() {
      rawList.value.push(...Array.from(Array(10)).keys())
    }

    return {
      list,
      wrapperProps,
      containeProps,
      containeRef,
      scrollTo,
      addTen
    }
  }
}
</script>
<style scoped>
.containe {
  height: 400px;
  width: 600px;
  margin: 0 auto;
  padding: 0 10px;
  border-right: 1px solid #3eaf7c;
  border-left: 1px solid #3eaf7c;
}
.item {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  margin-bottom: 8px;
  border: 1px solid gray;
  text-align: center;
  line-height: 42px;
  font-size: 14px;
  font-weight: 500;
}
.input-wrap {
  text-align: right;
  margin-bottom: 10px;
}
.add {
  text-align: right;
  margin-top: 10px;
}
</style>
