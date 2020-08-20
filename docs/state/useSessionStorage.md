## 简介
一个帮你处理将数据响应式持久化到`sessionStorage`中的`hooks`
> 1. 可自动在组件卸载时清除事件监听  
> 2. 以`ref`形态返回数据
> 3. 以正常对`ref`访问方式即可自动完成持久化数据

## 代码演示
#### 基本使用  
---
<use-session-storage />
#### 代码  
---
```vue
<template>
  <div>
    <div class="block">{{ num }}</div>
    <button @click="add">点击 num + 1</button>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useSessionStorage } from '@xuguo/vue-hooks'
export default {
  name: 'use-Session-storage',
  setup() {
    const num = useSessionStorage('test', 1)
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
```


## API  
```ts
const valueRef = useSessionStorage(key, initialValue)
```

### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `valueRef` | 响应式的数据对象 | `Ref<typeof initialValue>` |

### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 存储的键值 | `string` |
| `initialValue` | 初始值 | `T` |
