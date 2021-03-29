import { property } from '@dword-design/functions'
import execa from 'execa'

export default async () =>
  execa.command('gh config get git_protocol', { all: true })
  |> await
  |> property('all')
