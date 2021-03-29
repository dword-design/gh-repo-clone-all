#!/usr/bin/env node

import { slice } from '@dword-design/functions'
import makeCli from 'make-cli'
import parsePkgName from 'parse-pkg-name'

import packageConfig from '@/package.json'

import api from '.'
import protocols from './protocols.json'

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
      choices: protocols,
      defaultValue: 'https',
      description: 'The protocol to use',
      name: '-p, --protocol <protocol>',
    },
    {
      description: 'The branch to checkout',
      name: '-b, --branch <branch>',
    },
  ],
  usage:
    '\n\nYou can pass the supported options from gh repo list through. The options below are additional.',
})
