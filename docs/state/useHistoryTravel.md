## 简介
一个能静默的帮你记录`ref`曾经被赋予过的值的`hooks`
> 对于代理过后拥有记录历史能力的`ref`你仅需要想使用普通`ref`一样使用它  
> 并且还提供了在历史记录中穿梭的能力

## 代码演示
#### 基本使用  
::: tip
1. 我通过一个历史记录列表来展示所有曾到达的记录，通过高亮标识当前的值为哪一个  
2. 通过前进、后退和`go`我们能达到任何历史状态
3. 也可以通过`forwardLength`和`backLength`来实时获取可前进后退的步数
:::
<use-history-travel />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useHistoryTravel.vue
:::


## API  
```ts
const { 
      current, 
      backLength, 
      forwardLength, 
      back, 
      forward, 
      go } = useHistoryTravel(initialValue?)
```

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `current` | 拥有记录历史能力的`Ref` | `Ref<typeof initialValue>` |
| `backLength` | 可后退步数 | `ComputedRef<number>` |
| `forwardLength` | 可前进步数 | `ComputedRef<number>` |
| `back` | 后退方法 | `() => void` |
| `forward` | 前进方法 | `() => void` |
| `go` | 跳转方法 | `(step: number) => void` |

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `initialValue` | 初始值 | `any` |
