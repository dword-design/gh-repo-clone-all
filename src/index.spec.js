import {
  endent,
  join,
  omit,
  property,
  pullAll,
  split,
} from '@dword-design/functions'
import proxyquire from '@dword-design/proxyquire'
import tester from '@dword-design/tester'
import execa from 'execa'
import globby from 'globby'
import P from 'path'
import which from 'which'
import withLocalTmpDir from 'with-local-tmp-dir'

const pathDelimiter = process.platform === 'win32' ? ';' : ':'

const getModifiedPath = async () =>
  process.env.PATH
  |> split(pathDelimiter)
  |> pullAll([P.dirname(which('gh') |> await), '/bin'])
  |> join(pathDelimiter)

export default tester(
  {
    async branch() {
      const self = proxyquire('.', {
        './gh-git-protocol': () => 'https',
        './gh-repo-list': () => endent`
        dword-design/gh-repo-clone-all-test1
        dword-design/gh-repo-clone-all-test2
      `,
      })
      await self({ branch: 'foo' })
      expect(await globby('*', { onlyFiles: false })).toEqual([
        'gh-repo-clone-all-test1',
        'gh-repo-clone-all-test2',
      ])
      expect(
        execa.command('git status', {
          all: true,
          cwd: 'gh-repo-clone-all-test1',
        })
          |> await
          |> property('all')
      ).toMatchSnapshot(this)
      expect(
        (await execa.command('git status', {
          all: true,
          cwd: 'gh-repo-clone-all-test2',
        }))
          |> await
          |> property('all')
      ).toMatchSnapshot(this)
    },
    cwd: async () => {
      const self = proxyquire('.', {
        './gh-git-protocol': () => 'https',
        './gh-repo-list': () => endent`
        dword-design/gh-repo-clone-all-test1
        dword-design/gh-repo-clone-all-test2
      `,
      })
      expect(await self()).toEqual([])
      expect(await globby('*', { onlyFiles: false })).toEqual([
        'gh-repo-clone-all-test1',
        'gh-repo-clone-all-test2',
      ])
      expect(
        await globby('*', {
          cwd: 'gh-repo-clone-all-test1',
          dot: true,
          onlyFiles: false,
        })
      ).toEqual(['.git'])
      expect(
        await globby('*', {
          cwd: 'gh-repo-clone-all-test2',
          dot: true,
          onlyFiles: false,
        })
      ).toEqual(['.git'])
    },
    'gh missing': async () => {
      const self = proxyquire('.', {})
      // https://github.com/nodejs/node/issues/34667
      process.env =
        { ...process.env, PATH: await getModifiedPath() } |> omit(['Path'])
      await expect(self()).rejects.toThrow(
        'You may need to install GitHub CLI (https://cli.github.com/manual) or login.'
      )
    },
    'non-existing branch': async function () {
      const self = proxyquire('.', {
        './gh-git-protocol': () => 'https',
        './gh-repo-list': () => endent`
        dword-design/gh-repo-clone-all-test1
        dword-design/gh-repo-clone-all-test2
      `,
      })
      expect(await self({ branch: 'bar' })).toMatchSnapshot(this)
      expect(await globby('*', { onlyFiles: false })).toEqual([
        'gh-repo-clone-all-test2',
      ])
      expect(
        (await execa.command('git status', {
          all: true,
          cwd: 'gh-repo-clone-all-test2',
        }))
          |> await
          |> property('all')
      ).toMatchSnapshot(this)
    },
    'repository not found': async function () {
      const self = proxyquire('.', {
        './gh-git-protocol': () => 'https',
        './gh-repo-list': () => 'foo',
      })
      expect(await self()).toMatchSnapshot(this)
    },
  },
  [
    {
      afterEach() {
        process.env = this.previousEnv
      },
      beforeEach() {
        this.previousEnv = process.env
      },
    },
    {
      transform: test =>
        function () {
          return withLocalTmpDir(() => test.call(this))
        },
    },
  ]
)
