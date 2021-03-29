import { compact, includes, join, map } from '@dword-design/functions'
import emptyDir from 'empty-dir'
import execa from 'execa'
import { ensureDir, exists } from 'fs-extra'
import P from 'path'
import stdEnv from 'std-env'

import ghRepoList from './gh-repo-list'
import protocols from './protocols.json'

export default async options => {
  options = {
    protocol: 'https',
    quiet: stdEnv.test,
    ...options,
  }
  options.directory = P.resolve(options.directory || '.')
  if (!(protocols |> includes(options.protocol))) {
    throw new Error(
      `Unknown protocol ${options.protocol}. Please choose between ${
        protocols |> join(', ')
      }`
    )
  }
  await execa.command('which gh', { stdio: 'inherit' })
  try {
    await execa.command('gh version')
  } catch {
    throw new Error(
      'It seems like GitHub CLI is not installed on your machine. Install it at https://cli.github.com/manual.'
    )
  }

  const output = await ghRepoList(options.ghArgs)

  const repoNames = output.match(/^([^\s]*)/gm)
  if (
    (await exists(options.directory)) &&
    !(await emptyDir(options.directory))
  ) {
    throw new Error('The directory is not empty.')
  }
  await ensureDir(options.directory)
  if (!options.quiet) {
    console.log()
    console.log(`Cloning into ${options.directory} …`)
    console.log()
  }

  const clone = async name => {
    // it is not possible to clone via gh repo clone because it makes api requests,
    // which lead to rate limiting issues.
    const url =
      options.protocol === 'ssh'
        ? `git@github.com:${name}.git`
        : `https://github.com/${name}.git`
    try {
      await execa(
        'git',
        ['clone', url, ...(options.branch ? ['--branch', options.branch] : [])],
        { cwd: options.directory }
      )
    } catch (error) {
      if (!options.quiet) {
        console.error(error.message)
      }

      return error.message
    }
    if (!options.quiet) {
      console.log(`Successfully cloned ${name}.`)
    }

    return undefined
  }

  const result = repoNames |> map(clone) |> Promise.all |> await |> compact
  if (!options.quiet) {
    console.log()
    console.log('Done!')
  }

  return result
}