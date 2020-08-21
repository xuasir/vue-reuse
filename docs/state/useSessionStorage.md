## 简介
一个帮你处理将数据响应式持久化到`sessionStorage`中的`hooks`
> 1. 可自动在组件卸载时清除事件监听  
> 2. 以`ref`形态返回数据
> 3. 以正常对`ref`访问方式即可自动完成持久化数据

## 代码演示
#### 基本使用  
::: tip
1. 数据将会持久化的存储在`sessionStorage`
2. 将`num`设置成`undefined`时会自动清除`sessionStorage`的存储
:::
<use-session-storage />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useSessionStorage.vue
:::


## API  
```ts
const valueRef = useSessionStorage(key, initialValue)
```

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `valueRef` | 响应式的数据对象 | `Ref<typeof initialValue>` |

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 存储的键值 | `string` |
| `initialValue` | 初始值 | `T` |
