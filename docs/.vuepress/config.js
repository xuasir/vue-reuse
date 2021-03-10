const path = require('path')
module.exports = {
  title: 'vue-reuse',
  description: 'vue hooks based composition API',
  plugins: ['@vuepress/back-to-top'],
  dest: 'doc-dist',
  base: process.env.DOCS_BASE || '/vue-reuse/',
  configureWebpack: {
    resolve: {
      alias: {
        '@xus/vue-reuse': path.resolve(__dirname, '../../src/index.ts')
      },
      extensions: ['.ts', '.js', '.styl']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          },
          exclude: /node_modules/
        }
      ]
    }
  },
  nav: [
    { text: '国内镜像', link: 'https://a-sir.gitee.io/vue-reuse' },
    {
      text: '我有问题',
      link: 'https://github.com/xuguo-code/vue-reuse/issues'
    },
    { text: 'vue3源码分析', link: 'http://xuguo.xyz/vue3-anaylsis' }
  ],
  // head: [],
  themeConfig: {
    repo: 'xus-code/vue-reuse',
    docsRepo: 'xus-code/vue-reuse',
    logo: '/imgs/logo.png',
    docsDir: 'docs',
    editLinks: false,
    nav: [
      {
        text: '指南',
        link: '/info/'
      }
    ],
    sidebar: {
      '/': [
        ['info/', '指南'],
        {
          title: 'async',
          collapsable: false,
          children: [['async/useRequest', 'useRequest']]
        },
        {
          title: 'UI',
          collapsable: false,
          children: [
            ['UI/useDrop', 'useDrop'],
            ['UI/useVirtualList', 'useVirtualList']
          ]
        },
        {
          title: 'work',
          collapsable: false,
          children: [['work/useSku', 'useSku']]
        },
        {
          title: 'Event',
          collapsable: false,
          children: [
            ['event/useEventlistener', 'useEventlistener'],
            ['event/useClickOutside', 'useClickOutside'],
            ['event/useScroll', 'useScroll']
          ]
        },
        {
          title: 'State',
          collapsable: false,
          children: [
            ['state/useHistoryTravel', 'useHistoryTravel'],
            ['state/useLocalStorage', 'useLocalStorage'],
            ['state/useSessionStorage', 'useSessionStorage'],
            ['state/useBoolean', 'useBoolean']
          ]
        },
        {
          title: 'sideEffect',
          collapsable: false,
          children: [
            ['sideEffect/useDebounceRef', 'useDebounceRef'],
            ['sideEffect/useDebounceFn', 'useDebounceFn'],
            ['sideEffect/useThrottleRef', 'useThrottleRef'],
            ['sideEffect/useThrottleFn', 'useThrottleFn']
          ]
        }
      ]
    }
  }
}
