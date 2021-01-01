# Vue-Hooks 贡献指南

Hi! 首先感谢你关注并使用 Vue-Hooks。

Vue-Hooks 是一套采用`typescript`实现，为开发者提供基础逻辑到业务逻辑，提供多种组合函数的 Hooks库

Vue-Hooks 的成长离不开大家的支持，如果你愿意为 Vue-Hooks 贡献代码或提供建议，请阅读以下内容。

## Issue 规范
- issue 仅用于提交 Bug 或 Feature 以及设计相关的内容，其它内容可能会被直接关闭。

- 在提交 issue 之前，请搜索相关内容是否已被提出。

- TODO

## Pull Request 规范

- 请先 fork 一份到自己的项目下，不要直接在仓库下建分支。

- 获取项目后,添加主代码库：
    
    git remote add upstream https://github.com/xuguo-code/vue-hooks.git

- 更新/同步主仓库的代码 

    更新仓库： git fetch upstream

    同步对应分支的代码，比如`master`：git rebase upstream/master

- 分支规范/提交信息规范

    严格按照：[gitflow](https://github.com/xuguo-code/vue-hooks/blob/master/.github/gitflows.md)

- **不要提交** `yarn.lock` 文件。
 

## PR操作流程

 1. 根据提交需求，在 master/feat 等分支建立本地新分支 `master/doc/xxx`/`feat/xxx`

 2. 开发完成后进行下列操作
    ```
    git rebase `主分支名称` 对主分支进行线性合并

    git rebase -i 进行commit message的整合，保证提交简洁。

    git push 推送代码到远端

    发起代码合并请求到对应主分支
    ```
 3. 如果你是hooks开发请遵照TDD规则：设计好hooks后写对应单测，然后跑测试覆盖率达到85%代表你的功能就开发符合要求

## 开发环境

首先你需要 Node.js ，yarn

yarn docs:dev