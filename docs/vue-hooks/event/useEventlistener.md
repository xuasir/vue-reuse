## 简介
一个帮你处理`eventListener`的`hooks`
> 1. 可自动在组件卸载时清除事件监听  
> 2. 可直接采用`ref`方式监听`Dom`事件

### 代码演示
#### 基本使用  
---
<use-eventlistener />
#### 代码  
---
```vue
<template>
  <div>
    <div>num: {{ num }}</div>
    <button ref="el">点击num + 1</button>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useEventListener } from '@xuguo/vue-hooks'
export default {
  name: 'use-eventlisener',
  setup() {
    const num = ref(0)
    const el = useEventListener('click', () => (num.value += 1))
    return {
      num,
      el,
    }
  },
}
</script>
```

### API  
```ts
<button ref="elRef">some text</button>

const elRef = useEventListener(eventType, handler, options?)
```

### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `elRef` | 一个指定事件绑定元素的`ref`对象 | `Ref<null | HTMLElement>` |

### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `eventType` | 传递需要监听的事件类型 | `keyof WindowEventMap | keyof HTMLElementEventMap` |
| `handler` | 监听事件的回调函数 | `(evt: WindowEventMap[key] | HTMLElementEventMap[key]) => any` |
| `options` | 监听事件参数 | `{ dom?: TargetType } & Partial<AddEventListenerOptions>` |

### Options 
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `dom` | 接收绑定监听的元素，优先级高于`elRef` | `HTMLElement | Ref<HTMLElement> | () => HTMLElement | Window` |
| `once` | 是否只执行一次就自动销毁事件监听 | `Boolean` |
| `capture` | 表示 `listener` 会在该类型的事件捕获阶段传播到该 `EventTarget` 时触发 | `Boolean` |
| `passive` | 如果设置了`true`,表示 `listener` 永远不会调用 `preventDefault()` | `Boolean` |