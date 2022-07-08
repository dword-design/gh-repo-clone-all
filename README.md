<!-- TITLE/ -->
# gh-repo-clone-all
<!-- /TITLE -->

<!-- BADGES/ -->
  <p>
    <a href="https://npmjs.org/package/gh-repo-clone-all">
      <img
        src="https://img.shields.io/npm/v/gh-repo-clone-all.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/gh-repo-clone-all/actions">
      <img
        src="https://github.com/dword-design/gh-repo-clone-all/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/gh-repo-clone-all">
      <img
        src="https://codecov.io/gh/dword-design/gh-repo-clone-all/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/gh-repo-clone-all">
      <img src="https://img.shields.io/david/dword-design/gh-repo-clone-all" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/gh-repo-clone-all">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        width="114"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        width="114"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://sebastianlandwehr.com/images/paypal.svg"
        alt="PayPal"
        width="163"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://sebastianlandwehr.com/images/patreon.svg"
        alt="Patreon"
        width="163"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Addition to GitHub CLI that clones all public and private repositories. It uses GitHub CLI and its authentication system and passes the filter options through to gh repo list.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install -g gh-repo-clone-all

# Yarn
$ yarn global add gh-repo-clone-all
```
<!-- /INSTALL -->

## Usage

First of all, you need to have [GitHub CLI](https://cli.github.com/manual/) installed. You can find out by running `gh version`. Also make sure that you are logged in so that `gh-repo-clone-all` can fetch the repository list. You can find out by running `gh auth status`.

Now we can run the command like this:

```bash
Usage: gh-repo-clone-all [directory] [options] [gh repo list options] 

You can pass the supported options through from gh repo list. The options below are additional.

Options:
  -b, --branch <branch>  The branch to checkout
  -h, --help             display help for command
```

See the [gh repo list docs](https://cli.github.com/manual/gh_repo_list) for details about the filtering options.

## Cloning

The simplest case is to just clone into the current directory (which has to be empty):

```bash
$ gh-repo-clone-all

Cloning into /Users/foobar/repos …

Successfully cloned john-doe/repo1.
Successfully cloned john-doe/repo2.
Successfully cloned john-doe/repo3.
Successfully cloned john-doe/repo4.

Done!
```

Usually you will want to provide a directory name, which is then created:

```bash
$ gh-repo-clone-all my-repos
```

`gh repo list` has a default limit of 30, which is rather low. So let's put it up to clone more repositories:

```bash
$ gh-repo-clone-all my-repos --limit 100
```

You can actually just put a very high limit to clone everything:

```hash
$ gh-repo-clone-all my-repos --limit 9999
```

## Checking Out a Branch

Instead of the default branch, you can checkout a specific branch like this:

```bash
$ gh-repo-clone-all my-repos --branch renovate/lock-file-maintenance
```

Note that if a branch cannot be checked out by a repository, the repository will not be cloned.

## Filtering

You can use the filtering options from [gh repo list](https://cli.github.com/manual/gh_repo_list) to filter the repositories you would like to clone:

```bash

# Clone only archived repositories
$ gh-repo-clone-all --archived

# Clone only forks
$ gh-repo-clone-all --fork

# Clone only repositories of a language
$ gh-repo-clone-all --language lang

# Clone up to a limit
$ gh-repo-clone-all --limit x

# Do not clone archived repositories
$ gh-repo-clone-all --no-archived

# Clone only private repositories
$ gh-repo-clone-all --source

# Clone only public repositories
$ gh-repo-clone-all --public

# Clone only non-forks
$ gh-repo-clone-all --source
```

## The Git Protocol

`gh-repo-clone-all` uses the protocol defined in GitHub CLI to clone repositories. You can find out which via `gh config get git_protocol`, and you can set it via `gh config set git_protocol [ssh,https]`.

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/gh-repo-clone-all/issues) or a [pull request](https://github.com/dword-design/gh-repo-clone-all/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
