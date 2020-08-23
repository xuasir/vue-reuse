## 简介
一个帮你处理虚拟列表逻辑的`hooks`  :tada:
> 1. 你所做的只需要将对应的`props`进行绑定

## 代码演示
#### 基本使用  
::: tip Tips
对于固定高度列表项目的情况，我们可以采用传递固定的`itemHeight`来设定高度
:::
<use-virtual-list />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useVirtualList.vue
:::

## API  
```ts
const {
  list,
  wrapperProps,
  containeProps,
  containeRef,
  scrollTo,
} = useVirtualList(rawList, {
  itemHeight,
  overscan?
})
```

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `list` | 虚拟列表当前显示的内容 | `Ref<{ data: T, index: number }[]>` |
| `wrapperProps` | 包裹列表项元素的容器所需要绑定的`props`(`reactive`对象) | `{ style }` |
| `containeProps` | 包裹滚动部分的容器所需要绑定的`props` | `{ onScroll(evt: Event): void, style: { overflowY: 'auto' } }` |
| `containeRef` | 包裹列表项元素容器`refs`需要绑定的`Ref`对象 | `Ref<null | HTMLElement>` |
| `scrollTo` | 滚动到某个列表项的方法 | `(index: number) => void` |

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `rawList` | 原始列表数据，可以是一个`Ref`的对象 | `T[] | Ref<T[]>` |
| `itemHeight` | 计算列表项目高度的参数 | `number | (index: number) => number` |
| `overscan` | 在可视范围外，上下各需要显示多少个元素 | `number` |

#### WrapperProps-style
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `width` | 宽度 | `'100%'` |
| `boxSizing` | 盒模型 | `'border-box'` |
| `height` | 高度 | `string` |
| `paddingTop` | 上内边距 | `string` |
