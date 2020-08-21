<template>
  <div>
    <div class="info">
      <h4>所有可组合的Sku</h4>
      <span class="block" v-for="sku in allSku">{{ sku }}</span>
    </div>
    <div class="spec-line" v-for="specLine in skuList" :key="specLine.row">
      <h4>{{ specLine.specLineTitle }}</h4>
      <span
        :class="['spec', spec.status]"
        v-for="spec in specLine.specs"
        @click="specTap(spec)"
      >{{ spec.specValue }}</span>
    </div>
  </div>
</template>
<script>
import { MockData, generateSku } from '../mock'
import { useSku } from '@xuguo/vue-hooks'
export default {
  name: 'use-sku',
  setup() {
    const { skuList, specTap } = useSku(MockData)
    return {
      skuList,
      specTap,
      allSku: generateSku()
    }
  }
}
</script>
<style scoped>
.spec-line {
  display: block;
  margin: 10px 0;
}
h4 {
  margin: 0 0 10px 0;
}
.spec {
  display: inline-block;
  box-sizing: border-box;
  min-width: 80px;
  padding: 5px 10px;
  margin: 0 10px;
  border: solid 1px black;
  text-align: center;
  cursor: pointer;
}
.disabled {
  color: gray;
  border: dashed 1px gray;
}

.selected {
  color: white;
  background-color: #3eaf7c;
  border: solid 1px #3eaf7c;
}
.block {
  padding: 0 0 5px 0;
}
</style>
