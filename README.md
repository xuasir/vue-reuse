# vue-hooks

##### 基于 composition-api 的 hooks 函数库

![Lint Test](https://github.com/xuguo-code/vue-hooks/workflows/Lint%20Test%20CI/badge.svg)
[![Build Status](https://travis-ci.org/xuguo-code/vue-hooks.svg?branch=master)](https://travis-ci.org/xuguo-code/vue-hooks)
![Deploy Docs](https://github.com/xuguo-code/vue-hooks/workflows/Deploy%20Doc%20CI/badge.svg)
[![license scan](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fxuguo-code%2Fvue-hooks.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fxuguo-code%2Fvue-hooks?ref=badge_shield)
[![codecov](https://codecov.io/gh/xuguo-code/vue-hooks/branch/master/graph/badge.svg?token=PM1K5156D2)](https://codecov.io/gh/xuguo-code/vue-hooks)

## 特性

- 采用`typescript`实现，提供良好的类型提示
- 从基础逻辑到业务逻辑，提供多种组合函数（WIP）

## 参与开发

- 运行 `yarn` 安装依赖
- 运行 `yarn lint` 校验代码风格
- 运行 `yarn format` 格式化所有 `ts` 代码
- 运行 `yarn cm` 执行交互式 `commit-msg` 生成
- 运行 `yarn test` 执行单元测试，可支持 `jest` 相关参数
- 运行 `yarn docs:dev` 启动开发环境下文档系统

## 目录结构

当前项目采用独立 `npm` 包的形式来管理，基于 `ts` 开发；

1. `docs` 中使用的是 `vuepress` 来构建文档项目，每个不同文件夹放置不同分类中的 `vue-hooks` 文档，
   可参照现有案例编写。

2. `__test__` 中存放相应 `hooks` 的测试用例，如果遇到复杂 `hooks` 请在 `__test__` 下建立相应的文件夹。

3. `scripts` 中存放 发布、打包两个脚本

4. `src` 下存放 `hooks` 实现逻辑

5. `src/shared` 下存放共用逻辑和类型文件

## 提交规范

提交信息请严格遵循 `angular` 团队风格，通过交互式的方式来创建（会在 `git-hooks` 中进行校验拦截）

#### [`gitflows规范`](https://github.com/xuguo-code/vue-hooks/blob/master/.github/gitflows.md)

#### [`API规范`](https://github.com/xuguo-code/vue-hooks/blob/master/.github/API.md)

#### [`开发指南`](https://github.com/xuguo-code/vue-hooks/blob/master/.github/dev.md)
