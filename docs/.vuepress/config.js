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
    editLinks: true,
    sidebarDepth: 3,
    nav: [
      { 
        text: 'vue-hooks', 
        link: '/vue-hooks/' 
      }
    ],
    sidebar: {
      '/': [
        '',
        {
          title: 'vue-hooks',
          sidebarDepth: 2,
          collapsable: false,
          children: [
            ['vue-hooks/', '介绍'],
            {
              title: 'Event',
              sidebarDepth: 1,
              collapsable: false,
              children: [
                ['vue-hooks/event/useEventlistener', 'useEventlistener'],
              ],
            },
          ],
        },
      ],
    },
  },
}
