import { property } from '@dword-design/functions'
import execa from 'execa'

export default async args =>
  execa('gh', ['repo', 'list', ...args], {
    stderr: 'inherit',
  })
  |> await
  |> property('stdout')
