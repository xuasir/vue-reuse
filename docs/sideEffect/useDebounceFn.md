## 简介
一个帮你处理生产一个`debounce`过的代理新`function`

## 代码演示
#### 基本使用  
---
<use-debounce-fn />
#### 代码  
---
```vue
<template>
  <div>
    <div class="block">num Ref: {{ num }}</div>
    <button @click="run">点击执行run</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useDebounceFn } from '@xuguo/vue-hooks'
export default {
  name: 'use-debounce-fn',
  setup() {
    const num = ref(0)
    const { run } = useDebounceFn(() => {
      num.value += 1
    }, 500)
    return {
      run,
      num,
    }
  },
}
</script>
```


## API  
```ts
const { run, cancel } = useDebounceFn(func, wait):
```

### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `run` | 代理原函数的新`debounce`函数 | `function` |
| `cancel` | 在`wait`时间到达之前，提供一个取消当前`run`的方法 | `function` |

### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `func` | 原始的函数 | `function` |
| `wait` | debounce的时长 | `number` |
