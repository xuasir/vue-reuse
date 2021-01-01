#### 开发指南

目前仓库推荐两种开发模式： 文档驱动和测试驱动

> 本文以 `useDebounceFn` 为示例

- 文档驱动

文档驱动的开发就类似平常的业务开发流程，由于文档系统本就是一个基于 `vue` 的应用，

所以首先的第一步就是通过 `npm run docs:dev` / `yarn docs:dev` 指令启动文档应用；

接下来将采问答的形式来阐述整个开发环节。

1. 如何创建一个 `useDebounceFn` 的文档页面？

   我们通常会在 `doc` 文件夹下来进行文档工作，具体文件位置如下：

   ```
   |-doc
   	|-sideEffct
   		|-useDebounceFn.md
   ```

   `useDebounceFn` 被归纳到 `sideEffect` 类别之中，所以在 `sideEffect` 下创建相应的 `.md` 文档，这是第一步；

   建立完文档后，我们需要进行菜单配置如下：

   ```js
   |-doc
   	|-.vuepress
   		|-config

   // config.js
   sidebar: {
         '/': [
         	...
           {
             title: 'sideEffect',
             collapsable: false,
             children: [
               ['sideEffect/useDebounceFn', 'useDebounceFn'],
             ],
           },
         ],
       },
   ```

   至此文档页面已经配置完成。

2. 如何在文档页面中书写 `hooks` 示例？

   同样我们将其分为两步，第一步声明用来书写示例的 `vue` 组件：

   ```js
   |-doc
   	|-.vuepress
   		|-components
   			|-useDebounceFn.vue
   ```

   在这个 `.vue` 文件中我们基于 `vue2` + `composition api` 的形式来编写示例。

   第二步就是在文档页面中引入我们书写的示例：

   ```markdown
   #### 基本使用

   <use-debounce-fn />
   #### 代码  
   ::: details 点击查看代码
   <<< @/docs/.vuepress/components/useDebounceFn.vue
   :::
   ```

   这就是 `vuepress` 中 一个最常用的在 `md` 中使用组件的示例。

3. 如何在示例代码中使用我们在 `src` 下书写的 `hook` 源码？

   ```vue
   <template>
     <div>
       <div class="block">num Ref: {{ num }}</div>
       <button @click="run">点击执行run</button>
     </div>
   </template>
   <script>
   import { ref } from '@vue/composition-api'
   import { useDebounceFn } from '@vcake/vue-hooks'
   export default {
     name: 'use-debounce-fn',
     setup() {
       const num = ref(0)
       const { run } = useDebounceFn(() => {
         num.value += 1
       }, 500)
       return {
         run,
         num
       }
     }
   }
   </script>
   ```

   我们仅需要通过 `@vcake/vue-hooks` 引入的形式拿到我们实时编写的 `hook` 函数。

通过以上三个个问题基本能将基于文档开发如何进行的流程表达清楚，我们通过一个示例代码来驱动 `hooks` 的开发的模式和业务开发较为形似。

- 测试驱动

  测试驱动开发是基于我们设计的 `API` 接口进行的，首先我们需要明确的是 当前开发 `hook` 的功能和输入输出；

  以 `useDebounceFn` 为例，我们的主要功能是生成防抖函数，而输入就是目标函数 `fn` 和防抖时长 `wait`，

  输出就是取消运行 `cancel` 和运行 `run` 两个函数。

  1. 如何创建测试文件和启动测试系统？

     我们在 `__test__` 文件夹下创建如下文件：

     ```js
     |-__test__
     	|-useDebounceFn.spec.ts
     ```

     通过 `yarn test -o -w` / `npm run test -o -w` 来启动测试系统。

  2. 测试驱动的模式是怎么执行的？

     通过输入输出以及需求的确定我们很容易编写如下测试用例：

     ```js
     import { useDebounceFn } from '../src'

     test('fn will be called when run', () => {
       const fn = jest.fn()
       const { run } = useDebounceFn(fn, 500)
       run(1)
       run()
       nextTask(() => {
         expect(fn).toBeCalledTimes(1)
         expect(fn).toBeCalledWith()
       })
     })
     ```

     在 `useDebounceFn` 未实现的情况下，测试运行的结果肯定是 `failed` 我们通过编写 `hook` 代码来解决 `failed` 以达到开发完整功能的目的。

- 总结

  至此已经介绍完这两种开发模式了，具体的语法细节还需要参照 `vuepress` 、`jest` 以及 `@vue/test-utils` 的文档来进行具体的熟悉。
