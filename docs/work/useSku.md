## 简介
一个帮你处理`sku`逻辑的`hooks`
> 你仅需提供一个符合结构的`spu`数据  
> 您甚至还可以通过`spuOpt`来定制您现有数据结构的特殊键名

## 代码演示
#### 基本使用  
::: tip
通常情况需要`spu`数据满足如下结构：
```ts
spu: {
  [key: stirng]: any
  skuListKey: [
    {
      [key: stirng]: any
      specListKey: [
        {
          [key: stirng]: any
          specValueKey: any
          specValueIdKey: any
          specIdKey: any
        }
      ]
    }
  ]
}
```
:::
<use-sku />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useSku.vue
:::

#### 定制化使用  
::: tip
在定制化的情况下，我们任然需要维持`spu`的基本结构,对于`spu`的键值进行定制，比如当前情况的定制内容：
```ts
spuOpt = {
  getSkuList(spu) {
    return spu.skuList
  },
  getSkuSpecList(sku) {
    return sku.specs
  },
}
```
:::

<use-sku-custom />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useSkuCustom.vue
:::

## API  
```ts
const { skuList, specTap } = useSku(spu, spuOpt?)
```

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `skuList` | 包含整个`sku`算法需要显示的规格数据 | `SpecLineInstanceType[]` |
| `specTap` | 点击规格时候调用函数 | `(spec) => void` |

#### SpecLineInstanceType
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `specLineTitle` | 当前规格行的规格名称 | `string` |
| `specs` | 当前规格行的所有规格 | `SpecInstanceType[]` |
| `row` | 当前规格行的行号 | `number` |

#### SpecInstanceType
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `specValue` | 当前规格的规格值 | `string` |
| `specId` | 当前规格的规格id | `strin | number` |
| `specValueId` | 当前规格的规格值id | `string | number` |
| `status` | 当前规格的状态 | `SpecStatus` |

#### SpecStatus
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `PENDING` | 等待选定状态 | `pending` |
| `DISABLED` | 禁用状态 | `disabled` |
| `SELECTED` | 选中状态 | `selected` |

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `spu` | `spu`数据 | `any` |
| `spuOpt` | `spu`数据相关的定制内容 | `SpuOps` |

#### SpuOps
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `skuCodeJoiner` | `sku`中不同规格的连接符 | `string` |
| `specCodeJoiner` | 规格中`id`的连接符 | `string` |
| `getSkuList` | 从`spu`中获取`sku`列表的方法 | `(spu) => skuList` |
| `getSkuSpecList` | 从`sku`中获取规格列表的方法 | `(sku) => specList` |
| `getSkuId` | 从`sku`中获取`skuId`的方法 | `(sku) => skuId` |
| `getSpecId` | 从规格中获取规格id的方法 | `(spec) => specId` |
| `getspecValueId` | 从规格中获取规格值id的方法 | `(spec) => specValueId` |
| `getSpecTitle` | 从规格中获取规格名称的方法 | `(spec) => specTitle` |
| `getspecValue` | 从规格中获取规格值名称的方法 | `(spec) => specValue` |
