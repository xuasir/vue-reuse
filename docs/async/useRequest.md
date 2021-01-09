## 简介

一个帮你处理处理异步请求的复用函数 :tada: :100:

## 代码演示

::: tip 默认请求
在当前例子中，`useReuqest`接收一个`service`函数，
并且通过`defaultParams`传递了该异步请求函数的参数在组件`setup`后立即执行，
`useReuqest`将接管`data`、`loading`、`error`等相关状态。
:::

<request-base />

::: details 点击查看代码
<<< @/docs/.vuepress/components/requestBase.vue
:::

## API

```ts
const {
  data,
  loading,
  error,
  run,
  cancel,
  refresh,
  reset,
  fetches
} = useReuqest(service, options):
```

#### RetrunValue

| 参数      | 说明                                                                    | 类型                                                     |
| --------- | ----------------------------------------------------------------------- | -------------------------------------------------------- |
| `data`    | 请求结果                                                                | `Ref<any>`                                               |
| `loading` | 请求状态                                                                | `Ref<Boolean>`                                           |
| `error`   | 请求错误状态                                                            | `Ref<null | Error>`                                      |
| `run`     | 配置手动执行请求函数时，调用的执行函数                                  | `function`                                               |
| `cancel`  | 配置防抖节流或者轮询时在`wait`时间到达之前，提供一个取消当前`run`的方法 | `Ref<function>`                                          |
| `refresh` | 使用最后一次请求参数重新请求                                            | `Ref<function>`                                          |
| `reset`   | 重置当前`useRequest`声明的请求                                          | `function`                                               |
| `fetches` | 多个请求并行时对应的请求状态                                            | `{[fetchKey]: { data, loading, error, cancel, refresh}}` |

#### Params

| 参数      | 说明                 | 类型             |
| --------- | -------------------- | ---------------- |
| `service` | 请求函数             | `RequestService` |
| `options` | `useRequest`配置文件 | `RequestOptions` |

#### RequestService

| 可接受类型                                                         | 说明                                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `(...args: any[]) => Promise<any>`                                 | 一般的`Promise`化请求函数                                                      |
| `string | { url: string, [key: string]: any }`                     | 需要传递`requestMethod`配置项，会作为第一个参数传递到`requestMethod`           |
| `(...args: any[]) => string | { url: string, [key: string]: any }` | 需要传递`requestMethod`配置项，函数返回值会作为第一个参数传递到`requestMethod` |

#### RequestOptions

| 配置项           | 说明                         | 类型                                    |
| ---------------- | ---------------------------- | --------------------------------------- |
| `requestMethod`  | 请求函数                     | `(...args: any[]) => Promise<any>`      |
| `formatResult`   | 请求结果格式化函数           | `(res: any) => any`                     |
| `defaultLoading` | 默认加载状态                 | `any`                                   |
| `defaultParams`  | 默认请求参数                 | `any[]`                                 |
| `defaultData`    | 默认请求结果                 | `any`                                   |
| `onSuccess`      | 成功回调                     | `(data: any, params: any[]) => void`    |
| `onError`        | 错误回调                     | `(error: Error, params: any[]) => void` |
| `throwOnError`   | 请求错误是否对外抛出         | `Boolean`                               |
| `manual`         | 是否手动执行请求             | `Boolean`                               |
| `loadingDelay`   | 加载状态变为`true`的延迟时长 | `number`                                |
| `pollingTime`    | 轮询间隔时长                 | `number`                                |
| `debounceTime`   | 防抖时长                     | `number`                                |
| `throttleTime`   | 节流时长                     | `number`                                |
| `cacheKey`       | 当前请求硬缓存的键值         | `string`                                |
| `cacheTime`      | 当前请求硬缓存的超时时间     | `number`                                |
| `fetchKey`       | 多请求时对应请求的键值       | `(...args: any[]) => string`            |
