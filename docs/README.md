---
title: vue-hooks
home: true
heroImage: /imgs/logo.png
actionText: 开始 →
actionLink: ./info/
features:
  - title: Composable
    details: 利用Vue3 composition API 来构建逻辑复用函数，极大化了逻辑的组合能力
  - title: TypeScript支持
    details: 全部采用TypeScript实现，有良好的类型推导支持
footer: MIT License Copyright (c) 2020 happycoder
description: 基于composition API的可组合逻辑复用函数集
meta:
  - name: og:title
    content: vue-hooks
  - name: og:description
    content: 基于composition API的可组合逻辑复用函数集
---

### 安装和使用

- `@xuguo/vue-hooks`实现基于`Vue3 composition API`的 hooks 函数集

```JavaScript
// 安装依赖
npm install @xuguo/vue-hooks @xuguo/sku vue-demi
// 如果您使用的是vue2.x 您还需要安装并使用 composition API
npm install @vue/composition-api

// 使用
import { useScroll } from '@xuguo/vue-hooks'
```
