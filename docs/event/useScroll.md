## 简介
一个帮你处理`scroll`事件的`hooks`
> 1. 可自动在组件卸载时清除事件监听  
> 2. 可直接采用`ref`方式监听`Dom`事件
> 3. 返回响应式的`pos`位置信息

## 代码演示
#### 基本使用  
---
<use-scroll />
#### 代码  
---
```vue
<template>
  <div>
    <div class="block">document scroll X: {{ pos.x }}</div>
    <div class="block">document scroll Y: {{ pos.y }}</div>
  </div>
</template>
<script>
import { useScroll } from '@xuguo/vue-hooks'
export default {
  name: 'use-scroll',
  setup() {
    const [pos] = useScroll()
    return {
      pos,
    }
  },
}
</script>
```


## API  
```ts
<div class="block">scroll X: {{ pos.x }}</div>
<div class="block">scroll Y: {{ pos.y }}</div>

const [pos, elRef] = useScroll()
const [pos] = useScroll(dom?)
```

### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `pos` | 响应式的位置信息对象 | `{ x: number, y: number }` |
| `elRef` | 一个指定事件绑定元素的`ref`对象 | `Ref<null | HTMLElement>` |

### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `dom` | 需要检测的`Dom` | `HTMLElement | (() => HTMLElement)` |
