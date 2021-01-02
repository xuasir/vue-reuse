import path from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

const resolve = (p) => path.resolve(__dirname, p)
let formats = process.env.FORMATS
const needBuildTypes = !!process.env.BUILDTYPES
const pkgJson = require(resolve('./package.json'))

const outputConfigMap = {
  esm: {
    file: resolve(`dist/vue.reuse.esm.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/vue.reuse.cjs.js`),
    format: 'cjs',
  },
  umd: {
    file: resolve(`dist/vue.reuse.js`),
    format: 'umd',
    name: 'VueReuse'
  },
}

let RollupConfigs = []

formats = formats ? formats.split('-') : Object.keys(outputConfigMap)

formats.forEach(format => {
  RollupConfigs.push(createConfig(format, outputConfigMap[format]))
})

needBuildTypes &&
  RollupConfigs.push({
    input: resolve(`dist/src/index.d.ts`),
    output: {
      file: resolve(`dist/vue.reuse.d.ts`),
      format: 'es',
    },
    plugins: [dts()],
  })

export default RollupConfigs

function createConfig(format, output) {
  if (format === 'umd') {
    output.sourcemap = !!process.env.SOURCEMAP
  }
  // 打包ts
  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfigDefaults: resolve('tsconfig.json'),
    cacheRoot: resolve('./node_modules/.ts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        target: 'es5',
        sourceMap: !!process.env.SOURCEMAP,
        removeComments: true,
        declaration: needBuildTypes,
        declarationMap: needBuildTypes,
      },
      include: [`src/`],
      exclude: ['__test__/**'],
    },
  })
  // external
  const external = [
    ...Object.keys(pkgJson.peerDependencies || {}),
    ...Object.keys(pkgJson.dependencies || {}),
    ...(pkgJson.external || [])
  ]
  // node plugins
  const nodePlugins =
    format === 'cjs'
      ? []
      : [
        require('@rollup/plugin-node-resolve').nodeResolve({
          referBuiltins: true,
        }),
        require('@rollup/plugin-commonjs')({
          sourceMap: true,
        }),
      ]
  // prod plugins
  const prodPlugins =
    process.env.NODE_ENV === 'production'
      ? [
        require('rollup-plugin-terser').terser({
          module: format === 'esm',
          compress: {
            ecma: 2015,
          },
        })
      ]
      : []

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [tsPlugin, ...nodePlugins, ...prodPlugins],
    external,
    treeshake: {
      moduleSideEffects: false,
    },
  }
}
