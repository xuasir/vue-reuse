## 简介

一个帮你处理生产一个`throttle`过的代理新`Ref`

> 1. 可自动在组件卸载时清除事件监听
> 2. 以`ref`形态返回数据
> 3. 以正常对`rawRef`访问方式即可自动`throttle`新的代理`Ref`

## 代码演示

#### 基本使用

<use-throttle-ref />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useThrottleRef.vue
:::

## API

```ts
const throttleRef = useThrottleRef(rawValue, wait):
```

#### RetrunValue

| 参数          | 说明                        | 类型                   |
| ------------- | --------------------------- | ---------------------- |
| `throttleRef` | 代理`rawValue`的新`Ref`对象 | `Ref<typeof rawValue>` |

#### Params

| 参数   | 说明                  | 类型     |
| ------ | --------------------- | -------- |
| `raw`  | `throttleRef`的初始值 | `any`    |
| `wait` | throttle 的时长       | `number` |
