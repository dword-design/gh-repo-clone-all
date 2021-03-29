#!/usr/bin/env node

import { slice } from '@dword-design/functions'
import makeCli from 'make-cli'
import parsePkgName from 'parse-pkg-name'

import packageConfig from '@/package.json'

import api from '.'

// if (process.platform === 'win32') {
console.log('In self:')
console.log(JSON.stringify(Object.keys(process.env)))
console.log(process.env.PATH)
console.log(process.env.FOO)

// }
const packageName = parsePkgName(packageConfig.name).name
makeCli({
  action: (directory, options, command) =>
    api({
      directory,
      ghArgs: directory ? command.args |> slice(1) : command.args,
      quiet: false,
      ...options,
    }).catch(error => {
      console.error(error.message)
      process.exit(1)
    }),
  allowUnknownOption: true,
  arguments: '[directory]',
  name: `${packageName} [directory] [options] [gh repo list options]`,
  options: [
    {
      description: 'the branch to checkout',
      name: '-b, --branch <branch>',
    },
  ],
  usage:
    '\n\nYou can pass the supported options through from gh repo list. The options below are additional.',
})
