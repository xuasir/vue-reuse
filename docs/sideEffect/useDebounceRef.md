## 简介
一个帮你处理生产一个`debounce`过的代理新`Ref`
> 1. 可自动在组件卸载时清除事件监听  
> 2. 以`ref`形态返回数据
> 3. 以正常对`rawRef`访问方式即可自动`debounce`新的代理`Ref`

## 代码演示
#### 基本使用  
---
<use-debounce-ref />
#### 代码  
---
```vue
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
```


## API  
```ts
const debounceRef = useDebounceRef(rawRef, wait):
```

### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `debounceRef` | 代理`rawRef`的新`Ref`对象 | `Ref<UnwrapRef<typeof rawRef>>` |

### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `rawRef` | 原始的`Ref`对象 | `Ref` |
| `wait` | debounce的时长 | `number` |
