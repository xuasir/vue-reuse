## 简介

一个帮你管理 boolean 值的 Hook。

## 代码演示

#### 基本使用
::: tip
1. 可以通过返回参数获取当前值的Boolean状态
2. 可以通过返回参数动态设置值的Bollean状态
3. 可以接受一个Boolean类型值来设置当前值状态
:::
<use-boolean />

#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useBoolean.vue
:::



## API  
```ts
const [ state, { changeState, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean
);
```

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `defaultValue` | 可选项，传入默认的状态值 | `boolean` |
| `options` | 可选项，接受一个reactive，动态设置Boolean取值 | `reactive` |

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `state` | 状态值 | `boolean` |
| `actions` | 操作集合（见下方表） | `Actions` |

#### Actions

| 参数     | 说明                                              | 类型                        |
|----------|---------------------------------------------------|-----------------------------|
| changeState   | 触发状态更改的函数,可接受一个参数修改状态值 | `(value?: boolean) => void` |
| setTrue  | 设置状态值为 true                                 | `() => void`                |
| setFalse | 设置状态值为 false                                | `() => void`                |