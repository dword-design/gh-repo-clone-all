#!/usr/bin/env node

import { slice } from '@dword-design/functions'
import makeCli from 'make-cli'
import parsePackagejsonName from 'parse-packagejson-name'

import packageConfig from '@/package.json'

import api from '.'

const packageName = parsePackagejsonName(packageConfig.name).fullName
makeCli({
  action: async (directory, options, command) => {
    try {
      await api({
        directory,
        ghArgs: directory ? command.args |> slice(1) : command.args,
        quiet: false,
        ...options,
      })
    } catch (error) {
      console.error(error.message)
      process.exit(1)
    }
  },
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
