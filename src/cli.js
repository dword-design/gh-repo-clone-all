#!/usr/bin/env node

import { slice } from '@dword-design/functions'
import makeCli from 'make-cli'

import api from '.'
import protocols from './protocols.json'

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
})
