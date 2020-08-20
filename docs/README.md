---
title: Vue/JavaScript-utils
home: true
actionText: 开始 →
actionLink: ./vue-hooks/
features:
  - title: JavaScript-toolbox
    details: 通用的JavaScript工具函数.
  - title: Composition Function
    details: 利用Vue3 composition API 来构建可复用UI无关逻辑的复用函数.
  - title: 算法和数据结构
    details: 采用typescript实现常用算法和数据结构.
  - title: sku算法
    details: 抽象实现的sku算法只需要通过简单的数据结构适配即可移植到您的项目.
  - title: TypeScript支持
    details: 全部采用TypeScript实现，有良好的类型推导支持
description: JavaScript utils, hooks based Vue3 composition API
meta:
  - name: og:title
    content: Vue/JavaScript-utils
  - name: og:description
    content: JavaScript utils, hooks based Vue3 composition API
---

### Packages和使用
1. `@xuguo/sku`实现sku算法  
```JavaScript
// 安装依赖
npm install @xuguo/sku

// 使用
import { createSkuSelector } from '@xuguo/sku'
```

2. `@xuguo/toolbox`实现JavaScript工具函数  
```JavaScript
// 安装依赖
npm install @xuguo/toolbox

// 使用
import { isNumber } from '@xuguo/sku'
```

3. `@xuguo/vue-hooks`实现基于`Vue3 composition API`的hooks函数集  
```JavaScript
// 安装依赖
npm install @xuguo/vue-hooks

// 使用
import { useScroll } from '@xuguo/sku'
```