# NVM (Node Version Manager)

Source: [Node Version Manager](https://github.com/nvm-sh/nvm)

Installing and Updating
-----

→ Install & Update Script
-----

To install or update nvm, you should run the install script. To do that, you may either download and run the script manually, or use the following cURL or Wget command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
```


→ Git Install
-----

If you have git installed (requires git v1.7.10+):

1. Clone this repo in the root of your user profile
    - `cd ~/` from anywhere then `git clone https://github.com/nvm-sh/nvm.git .nvm`
2. `cd ~/.nvm` and check out the latest version with `git checkout v0.40.7`
3. Activate `nvm` by sourcing it from your shell: `. ./nvm.sh`

Now add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login: (you may have to add to more than one of the above files)

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```


→ Manual Install
-----

For a fully manual install, execute the following lines to first clone the `nvm` repository into `$HOME/.nvm`, and then load `nvm`:

```bash
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"
```

Now add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login: (you may have to add to more than one of the above files)

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```


→ Manual Upgrade
-----

For manual upgrade with git (requires git v1.7.10+):

1. Change to the $NVM_DIR
2. Pull down the latest changes
3. Check out the latest version
4. Activate the new version

```bash
(
  cd "$NVM_DIR"
  git fetch --tags origin
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"
```


→ Verify Installation
-----

After installing Node Version Manager, just close the terminal and launch it back again. Now you can check the version of NVM typing:

`nvm --version`


Usage
-----

To download, compile, and install the latest release of node, do this:

```bash
nvm install node # "node" is an alias for the latest version
```

To install a specific version of node:

```bash
nvm install 14.7.0 # or 16.3.0, 12.22.1, etc
```

To set an alias:

```bash
nvm alias my_alias v14.4.0
```

Make sure that your alias does not contain any spaces or slashes.

The first version installed becomes the default. New shells will start with the default version of node (e.g., `nvm alias default`).

You can list available versions using ls-remote:

```bash
nvm ls-remote
```

And then in any new shell just use the installed version:

```bash
nvm use node
```

Or you can just run it:

```bash
nvm run node --version
```

Or, you can run any arbitrary command in a subshell with the desired version of node:

```bash
nvm exec 4.2 node --version
```

You can also get the path to the executable to where it was installed:

```bash
nvm which 12.22
```

In place of a version pointer like "14.7" or "16.3" or "12.22.1", you can use the following special default aliases with `nvm install`, `nvm use`, `nvm run`, `nvm exec`, `nvm which`, etc:

- `node`: this installs the latest version of `node`
- `iojs`: this installs the latest version of `io.js`
- `stable`: this alias is deprecated, and only truly applies to `node v0.12` and earlier. Currently, this is an alias for `node`.
- `unstable`: this alias points to node `v0.11` - the last "unstable" node release, since post-1.0, all node versions are stable. (in SemVer, versions communicate breakage, not stability).
- `current`: the version currently active in this shell (i.e. what node resolves to via `$PATH`). It is not affected by `.nvmrc`. Useful when you want to refer to the active version explicitly — e.g. nvm which current always prints the path to the active node, regardless of whether an .nvmrc file is present.

Long-term Support
-----

Node has a schedule for long-term support (LTS) You can reference LTS versions in aliases and `.nvmrc` files with the notation `lts/*` for the latest LTS, and `lts/argon` for LTS releases from the "argon" line, for example. In addition, the following commands support LTS arguments:

```bash
nvm install --lts / nvm install --lts=argon / nvm install 'lts/*' / nvm install lts/argon
nvm uninstall --lts / nvm uninstall --lts=argon / nvm uninstall 'lts/*' / nvm uninstall lts/argon
nvm use --lts / nvm use --lts=argon / nvm use 'lts/*' / nvm use lts/argon
nvm exec --lts / nvm exec --lts=argon / nvm exec 'lts/*' / nvm exec lts/argon
nvm run --lts / nvm run --lts=argon / nvm run 'lts/*' / nvm run lts/argon
nvm ls-remote --lts / nvm ls-remote --lts=argon nvm ls-remote 'lts/*' / nvm ls-remote lts/argon
nvm version-remote --lts / nvm version-remote --lts=argon / nvm version-remote 'lts/*' / nvm version-remote lts/argon
```

Any time your local copy of nvm connects to https://nodejs.org, it will re-create the appropriate local aliases for all available LTS lines. These aliases (stored under `$NVM_DIR/alias/lts`), are managed by `nvm`, and you should not modify, remove, or create these files - expect your changes to be undone, and expect meddling with these files to cause bugs that will likely not be supported.

To get the latest LTS version of node and migrate your existing installed packages, use:

```bash
nvm install --reinstall-packages-from=current 'lts/*'
```
