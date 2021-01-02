const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
// 参数处理
const resolve = p => path.resolve(__dirname, '../', p)
const args = require('minimist')(process.argv.slice(2))
const formats = args._
const prod = args.prod || args.p
const sourceMap = args.sourceMap || args.s
const buildTypes = args.types || args.t

async function run() {
  // 如果指定了格式 则清除原dist文件夹
  if (!formats) {
    await fs.remove(resolve('dist'))
  }
  // 环境信息
  const env = prod ? 'production' : 'development'
  console.info(chalk.bold(chalk.yellow(`Rollup for vue-reuse`)))
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `NODE_ENV:${env}`,
        formats ? `FORMATS:${formats.join('-')}` : '',
        sourceMap ? `SOURCEMAP:true` : '',
        buildTypes ? `BUILDTYPES:true` : '',
      ]
        .filter(Boolean)
        .join(','),
    ],
    {
      stdio: 'inherit',
    }
  )

  fs.remove(resolve(`dist/src`))
}

run()