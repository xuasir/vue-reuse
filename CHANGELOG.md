# [0.4.0](https://github.com/xuguo-code/vue-hooks/compare/v0.3.2...v0.4.0) (2020-08-23)


### Bug Fixes

* 去除usescroll中的shallowreadonly,不去除会导致vuepress vue2.x 打包错误 ([39bf3d4](https://github.com/xuguo-code/vue-hooks/commit/39bf3d404b092495e3c3aeb1949e362db687b9fd))
* usehistorytravel边界问题修复 ([9eaea19](https://github.com/xuguo-code/vue-hooks/commit/9eaea19aa0cd55a8ef485c836cff4c3a6891c2e8))
* **dom:** 兼容非web平台调用web api的情况 ([f8bcdaa](https://github.com/xuguo-code/vue-hooks/commit/f8bcdaa482fb539f278ce63c3d740e1329d50eba))


### Features

* 添加usevirtuallist处理虚拟列表 ([59ea0b9](https://github.com/xuguo-code/vue-hooks/commit/59ea0b9e91756fba474bc2bf38043be675af1938))


### Performance Improvements

* 设置useClickoutside的captrue为false ([6a8f6e0](https://github.com/xuguo-code/vue-hooks/commit/6a8f6e0b463c0300de4267559b4b3997e81df32c))
* 为usesku添加spuOps选项 ([0bdd8e5](https://github.com/xuguo-code/vue-hooks/commit/0bdd8e54778c118dd0804de8bc0478ac50c46337))
* 修复依赖引用 ([513281a](https://github.com/xuguo-code/vue-hooks/commit/513281a0d18c651bbd6af56fe710f8dff49c789e))
* 虚拟列表添加动态数据支持 ([4021bcf](https://github.com/xuguo-code/vue-hooks/commit/4021bcfdfc254462411fe49d29ea13d50c9261f0))
* 优化虚拟列表,初始化计算可显示内容 ([980d2b6](https://github.com/xuguo-code/vue-hooks/commit/980d2b6784ece1f0bfa80e21e2cc9bba93ef21bc))
* 优化usedrop files相关逻辑 ([13e7738](https://github.com/xuguo-code/vue-hooks/commit/13e77389bef05667948b386c1adec4dedf113f88))
* 优化usedrop相关逻辑 ([1e40607](https://github.com/xuguo-code/vue-hooks/commit/1e40607f459002b8b7f8d4917f72233a6b4eedeb))
* 增加paddingtop 计算缓存 ([ab7127e](https://github.com/xuguo-code/vue-hooks/commit/ab7127ee742b1c6873928c3eea38e6061c105cfa))



## [0.3.2](https://github.com/xuguo-code/vue-hooks/compare/v0.3.1...v0.3.2) (2020-08-20)


### Bug Fixes

* 调整usescroll节流时长为100ms ([f555efe](https://github.com/xuguo-code/vue-hooks/commit/f555efe120534066b1509b707ff4b5be25c16078))
* 修复clickoutside事件绑定错误 ([e13acdf](https://github.com/xuguo-code/vue-hooks/commit/e13acdfa7d0e2d112b34ea916770e60308c3c7f7))



## [0.3.1](https://github.com/xuguo-code/vue-hooks/compare/v0.3.0...v0.3.1) (2020-08-20)



#  (2020-08-20)


### Features

* 添加处理虚拟列表需求的hooks ([152f58e](https://github.com/xuguo-code/vue-hooks/commit/152f58ea51fd1a0fa4b5ac35812fd55af5e50b6e))
* 添加能监听值历史记录的hooks ([4518819](https://github.com/xuguo-code/vue-hooks/commit/45188192412dc34bd06e7b5941ec2f319d6d5d65))
* **sku:** 添加sku算法hooks函数 ([b33801e](https://github.com/xuguo-code/vue-hooks/commit/b33801ebb844120b79a1f8e380f4e84b97db7d60))
* 添加监听scroll相关hooks函数 ([7aa17ad](https://github.com/xuguo-code/vue-hooks/commit/7aa17addc0af9b9fdf454dea898e104494b6c03b))
* **storage:** 添加storage相关hooks函数 ([2c89e7c](https://github.com/xuguo-code/vue-hooks/commit/2c89e7c80f82f9d86843a3e56423966046be5cda))
* **ui:** 添加drop drag操作的ui-hooks ([c4363e8](https://github.com/xuguo-code/vue-hooks/commit/c4363e890959148b5ad0481addc85db5bf20f93a))
* 添加防抖节流相关hooks ([5d4f40e](https://github.com/xuguo-code/vue-hooks/commit/5d4f40ed8cc82311dbaecfc918772b9825c1b38e))
* **event:** 添加event类型的hooks ([3c3426d](https://github.com/xuguo-code/vue-hooks/commit/3c3426d2a41ecab61b6cc7bfee2a96d23b299933))



