const semver = require('semver')
const execa = require('execa')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))

const skipTests = args.skipTests || args.st
const skipBuild = args.skipBuild || args.sb
const preId = args.preId || ''

const versionIncrements = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease',
]

const inc = (curVersion, i) => semver.inc(curVersion, i, preId)

const run = (bin, args, opts = {}) =>
  execa(bin, args, {
    stdio: 'inherit',
    ...opts,
  })
const resolve = p => path.resolve(__dirname, '../', p)
const step = (msg) => console.log(chalk.cyan(msg))

const pkgJson = require(resolve('package.json'))
// 主函数
async function main() {
  const nextVersion = await ensureVersion()
  workForPublish(nextVersion)
}

async function ensureVersion() {
  let targetVersion = ''
  const currentVersion = pkgJson.version
  if (pkgJson.private) {
    return
  }
  step(`ensure version for ${chalk.yellow(`vue-reuse`)}`)
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(currentVersion, i)})`)
      .concat(['custom']),
  })
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`version: ${targetVersion} is invalid!`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  return targetVersion
}

async function workForPublish(nextVersion) {
  // run test
  step(`run test...`)
  if (!skipTests) {
    await run('yarn', ['test'])
  } else {
    console.log(`(skipped)`)
  }

  // run build
  step(`run build...`)
  if (!skipBuild) {
    await run('yarn', [
      'build',
      '-s',
      '-t',
      '-p',
    ])
  } else {
    console.log(`(skipped)`)
  }

  // update version
  step(`Updating cross dependencies...`)
  updateVersion(nextVersion)

  // generate changelog
  step(`generate changelog...`)
  await run('yarn', ['changelog'])
  const { stdout } = await run('git', ['diff'], {
    stdio: 'pipe',
  })
  if (stdout) {
    step(`committing changes...`)
    await run('git', ['add', '-A'])
    await run('git', [
      'commit',
      '-m',
      `release: publish packages: v${nextVersion}`,
      '--no-verify',
    ])
  } else {
    console.info(`nothing to commit...`)
  }

  // publish
  step(`publish packages...`)
  pubilshPackage(nextVersion)

  // push and tag
  step(`push to giihub...`)
  await run('git', ['tag', `v${nextVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${nextVersion}`])
  await run('git', ['push', 'origin', 'master'])

  console.log()
}

function updateVersion(nextVersion) {
  const pkgJsonPath = resolve('package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
  pkgJson.version = nextVersion
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
}

async function pubilshPackage(nextVersion) {
  if (pkgJson.private) {
    return
  }

  step(`publishing...`)
  try {
    await run(
      'yarn',
      ['publish', '--new-version', nextVersion, '--access', 'public'],
      {
        cwd: resolve('./'),
        stdio: 'pipe',
      }
    )
    console.log(
      chalk.green(`Successfully published @xus/vue-reuse v${nextVersion}`)
    )
  } catch (e) {
    console.log()
    throw e
  }
}

main().catch((err) => {
  console.error(err)
})
