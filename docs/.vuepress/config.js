const path = require('path')
module.exports = {
  title: 'vue-hooks',
  description: 'vue hooks based composition API',
  plugins: ['@vuepress/back-to-top'],
  dest: 'doc-dist',
  base: process.env.DOCS_BASE || '/vue-hooks/',
  configureWebpack: {
    resolve: {
      alias: {
        '@xuguo/vue-hooks': path.resolve(__dirname, '../../dist/vue.hooks.esm.js')
      }
    }
  },
  // head: [],
  themeConfig: {
    repo: 'xuguo-code/vue-hooks',
    docsRepo: 'xuguo-code/vue-hooks',
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
          title: 'UI',
          collapsable: false,
          children: [
            ['UI/useDrop', 'useDrop'],
          ],
        },
        {
          title: 'Event',
          collapsable: false,
          children: [
            ['event/useEventlistener', 'useEventlistener'],
            ['event/useClickOutside', 'useClickOutside'],
            ['event/useScroll', 'useScroll'],
          ],
        },
        {
          title: 'State',
          collapsable: false,
          children: [
            ['state/useHistoryTravel', 'useHistoryTravel'],
            ['state/useLocalStorage', 'useLocalStorage'],
            ['state/useSessionStorage', 'useSessionStorage'],
          ],
        },
        {
          title: 'sideEffect',
          collapsable: false,
          children: [
            ['sideEffect/useDebounceRef', 'useDebounceRef'],
            ['sideEffect/useDebounceFn', 'useDebounceFn'],
            ['sideEffect/useThrottleRef', 'useThrottleRef'],
            ['sideEffect/useThrottleFn', 'useThrottleFn'],
          ],
        },
      ],
    },
  },
}
