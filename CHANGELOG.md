# [0.6.0](https://github.com/xus-code/vue-reuse/compare/v0.5.2...v0.6.0) (2021-01-09)


### Features

* **request:** 添加request缓存能力 ([17d4c13](https://github.com/xus-code/vue-reuse/commit/17d4c1300356b8b701f3cb53e27834d189cc7c28))
* **request:** 新增userequest复用函数 ([27b7cf9](https://github.com/xus-code/vue-reuse/commit/27b7cf97b672db14406e1d9fed77da2f45eba1fa))
* **src/useBoolean:** 新增boolean功能集合 ([4109e90](https://github.com/xus-code/vue-reuse/commit/4109e907b2ffe2c03e455a6024941bbc692e7ad0))
* **src/useBoolean:** 修复boolean功能的类型推导 ([214a735](https://github.com/xus-code/vue-reuse/commit/214a735ac01fe2c03ba51be295d051eb008582fa))



## [0.5.2](https://github.com/xus-code/vue-reuse/compare/v0.5.1...v0.5.2) (2021-01-01)

### Bug Fixes

- 虚拟列表计算错误修复 ([7a387f8](https://github.com/xus-code/vue-reuse/commit/7a387f8693c5fc13d2ff71e7b68fafbb2403fd79))

## [0.5.1](https://github.com/xus-code/vue-reuse/compare/v0.5.0...v0.5.1) (2020-12-28)

# [0.5.0](https://github.com/xus-code/vue-reuse/compare/v0.4.0...v0.5.0) (2020-09-14)

### Bug Fixes

- **virtuallist:** 修复虚拟列表 scrollto 计算 padding 错误 ([9ebc8c9](https://github.com/xus-code/vue-reuse/commit/9ebc8c9b014805258d59cd2775d1c4118de5737c))
- usedrop 类型错误 ([8a6d48f](https://github.com/xus-code/vue-reuse/commit/8a6d48f5224caf41aa521f0e3b6988588a706204))

### Performance Improvements

- **watch-stop:** 使用组件自动清除 watch 副作用替代手动清除 ([63975c7](https://github.com/xus-code/vue-reuse/commit/63975c75886db4794f3e258333ec204408c0d0ee))

# [0.4.0](https://github.com/xus-code/vue-reuse/compare/v0.3.2...v0.4.0) (2020-08-23)

### Bug Fixes

- 去除 usescroll 中的 shallowreadonly,不去除会导致 vuepress vue2.x 打包错误 ([39bf3d4](https://github.com/xus-code/vue-reuse/commit/39bf3d404b092495e3c3aeb1949e362db687b9fd))
- usehistorytravel 边界问题修复 ([9eaea19](https://github.com/xus-code/vue-reuse/commit/9eaea19aa0cd55a8ef485c836cff4c3a6891c2e8))
- **dom:** 兼容非 web 平台调用 web api 的情况 ([f8bcdaa](https://github.com/xus-code/vue-reuse/commit/f8bcdaa482fb539f278ce63c3d740e1329d50eba))

### Features

- 添加 usevirtuallist 处理虚拟列表 ([59ea0b9](https://github.com/xus-code/vue-reuse/commit/59ea0b9e91756fba474bc2bf38043be675af1938))

### Performance Improvements

- 设置 useClickoutside 的 captrue 为 false ([6a8f6e0](https://github.com/xus-code/vue-reuse/commit/6a8f6e0b463c0300de4267559b4b3997e81df32c))
- 为 usesku 添加 spuOps 选项 ([0bdd8e5](https://github.com/xus-code/vue-reuse/commit/0bdd8e54778c118dd0804de8bc0478ac50c46337))
- 修复依赖引用 ([513281a](https://github.com/xus-code/vue-reuse/commit/513281a0d18c651bbd6af56fe710f8dff49c789e))
- 虚拟列表添加动态数据支持 ([4021bcf](https://github.com/xus-code/vue-reuse/commit/4021bcfdfc254462411fe49d29ea13d50c9261f0))
- 优化虚拟列表,初始化计算可显示内容 ([980d2b6](https://github.com/xus-code/vue-reuse/commit/980d2b6784ece1f0bfa80e21e2cc9bba93ef21bc))
- 优化 usedrop files 相关逻辑 ([13e7738](https://github.com/xus-code/vue-reuse/commit/13e77389bef05667948b386c1adec4dedf113f88))
- 优化 usedrop 相关逻辑 ([1e40607](https://github.com/xus-code/vue-reuse/commit/1e40607f459002b8b7f8d4917f72233a6b4eedeb))
- 增加 paddingtop 计算缓存 ([ab7127e](https://github.com/xus-code/vue-reuse/commit/ab7127ee742b1c6873928c3eea38e6061c105cfa))

## [0.3.2](https://github.com/xus-code/vue-reuse/compare/v0.3.1...v0.3.2) (2020-08-20)

### Bug Fixes

- 调整 usescroll 节流时长为 100ms ([f555efe](https://github.com/xus-code/vue-reuse/commit/f555efe120534066b1509b707ff4b5be25c16078))
- 修复 clickoutside 事件绑定错误 ([e13acdf](https://github.com/xus-code/vue-reuse/commit/e13acdfa7d0e2d112b34ea916770e60308c3c7f7))

## [0.3.1](https://github.com/xus-code/vue-reuse/compare/v0.3.0...v0.3.1) (2020-08-20)

# (2020-08-20)

### Features

- 添加处理虚拟列表需求的 hooks ([152f58e](https://github.com/xus-code/vue-reuse/commit/152f58ea51fd1a0fa4b5ac35812fd55af5e50b6e))
- 添加能监听值历史记录的 hooks ([4518819](https://github.com/xus-code/vue-reuse/commit/45188192412dc34bd06e7b5941ec2f319d6d5d65))
- **sku:** 添加 sku 算法 hooks 函数 ([b33801e](https://github.com/xus-code/vue-reuse/commit/b33801ebb844120b79a1f8e380f4e84b97db7d60))
- 添加监听 scroll 相关 hooks 函数 ([7aa17ad](https://github.com/xus-code/vue-reuse/commit/7aa17addc0af9b9fdf454dea898e104494b6c03b))
- **storage:** 添加 storage 相关 hooks 函数 ([2c89e7c](https://github.com/xus-code/vue-reuse/commit/2c89e7c80f82f9d86843a3e56423966046be5cda))
- **ui:** 添加 drop drag 操作的 ui-hooks ([c4363e8](https://github.com/xus-code/vue-reuse/commit/c4363e890959148b5ad0481addc85db5bf20f93a))
- 添加防抖节流相关 hooks ([5d4f40e](https://github.com/xus-code/vue-reuse/commit/5d4f40ed8cc82311dbaecfc918772b9825c1b38e))
- **event:** 添加 event 类型的 hooks ([3c3426d](https://github.com/xus-code/vue-reuse/commit/3c3426d2a41ecab61b6cc7bfee2a96d23b299933))
