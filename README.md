# RatOS Configurator

This is the repository for the [RatOS](os.ratrig.com) configurator - a 3d printer provisioning application for RatOS with config generation, board identification, provisioning and automatic flashing. 

## Contributing

All non-hotfix pull requests (meaning additions, enhancements and features) should be submitted against the `development` branch.
Bug fixes should be submitted against the v2.x branch and subseqently merged into `development`.

## Local setup

### Requirements

This thing still need to be dockerized (PR's welcome), but will run on any linux based machine with the following prerequisites:

* Linux or WSL
* VSCode
* Node v20.x (i prefer managing this with [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating))
* [PNPM](https://pnpm.io/installation)

Most bash scripts will assume user `pi` exists. Needs fixing, fortunately  you don't need them for most work.

### Installation

The `RatOS-configuration` has been incorporated into `RatOS-configurator` (the so-called "monorepo" update), so the `RatOS-configuration` repo is no longer used and should not be cloned. The correct development environment installation process for the monorepo setup is not fully documented yet.

Clone repositories
```bash
mkdir RatOS-dev && cd RatOS-dev
mkdir -p printer_data/ratos
mkdir -p printer_data/logs
mkdir -p printer_data/config
git clone git@github.com:Rat-OS/RatOS-configurator.git
# External dependencies
git clone git@github.com:klipper3d/klipper.git
git clone git@github.com:Arksine/moonraker.git
# Configuration repo ** SEE MONOREPO NOTE ABOVE **
ln -s /home/myuser/RatOS-dev/RatOS-configurator/configuration /home/myuser/RatOS-dev/printer_data/config/RatOS
#cd printer_data/config
#git clone git@github.com:Rat-OS/RatOS-configuration.git RatOS
#cd ../..
```

Install dependencies
```bash
cd RatOS-configurator/src
pnpm install
```

Copy environment constants and define paths in .env.local
```bash
cp .env .env.local
cd ..
# Start vscode
code .
```

Edit .env.local and modify the paths to match your setup ie:
```
RATOS_CONFIGURATION_PATH=/home/myuser/RatOS-dev/printer_data/config/RatOS
KLIPPER_CONFIG_PATH=/home/myuser/RatOS-dev/printer_data/config
RATOS_SCRIPT_DIR=/home/myuser/RatOS-dev/RatOS-configurator/src/scripts
KLIPPER_DIR=/home/myuser/RatOS-dev/klipper
KLIPPER_ENV=/home/myuser/RatOS-dev/klippy-env
MOONRAKER_DIR=/home/myuser/RatOS-dev/moonraker
LOG_FILE=/home/myuser/RatOS-dev/printer_data/logs/ratos-configurator.log
RATOS_DATA_DIR=/home/myuser/RatOS-dev/printer_data/ratos
NEXT_PUBLIC_KLIPPER_HOSTNAME=hostnameofrunningtestprinter.local
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
```
NOTE: for modern monorepo setups, the following change to the above is at least partially functional:
```
RATOS_CONFIGURATION_PATH=/home/myuser/RatOS-dev/RatOS-configurator/configuration
```

It may also be necessary to create .env.test.local:
```bash
cd RatOS-configurator/src
cp .env.local .env.test.local
```

The `NEXT_PUBLIC_KLIPPER_HOSTNAME` variable is used by the frontend to connect to moonraker and klipper, those need to be real. The RatOS configurator will save configuration to the database on the moonraker instance running on that host.

You can try and run klipper and moonraker locally (i have not gone down this path yet).

### (Optional) link the RatOS cli binary (commands only work when dev server is running)
```bash
sudo ln -s "/home/myuser/RatOS-dev/RatOS-configurator/src/bin/ratos" "/usr/local/bin/ratos"
sudo chmod a+x "/usr/local/bin/ratos"
```
You should no be able to run the `ratos` cli command.

### Developing

in `RatOS-dev/RatOS-configurator/src` you can run

* `pnpm run dev` to run the development server
* `pnpm run test` to run the tests
* `pnpm run typecheck` to run typechecking
* `pnpm run lint` to run linting

### Testing Deployments with Deployment Branches

RatOS-Configurator currently uses deployment branches to release and publish
the compiled RatOS-configurator app. There is a utility script
at `./scripts/create-local-deployment.sh` that will automatically
create a local deployment branch derived from you current working branch
and directory.

The script can be run from any directory in the RatOS-configurator repo, and **it will create a new directory
in the RatOS-Configurator's parent directory**

*Note: This script is for development purposes only, and may not
produce the same final output in your deployment branch that would
be created in the official release/publish workflow*.

```console
cd /path/to/RatOS-configurator
./scripts/create-local-deployment.sh
```

This will:

- create a new worktree with a folder named `configurator-deployment-worktrees/<current-branch>-deployment`. The `configurator-deployment-worktrees` will be in the same parent directory as your `RatOS-configurator` repo.
- run install and build commands on the worktree
- remove uneeded files in the deployment branch
- rename folders to match deployment usage on ratos

#### Publishing the test Deployment branch

The `create-local-deployment` uses [`git worktree`](https://git-scm.com/docs/git-worktree) to create your
deployment branch in a separate working directory. This allows you
to keep both your current branch, and the deployment branch
checked out simultaneously.

To commit, cd into the worktree, and use `git push -u <remote> <branch>`.

## Help and support

Please use the unofficial Rat Rig discord for help and support. Only create an issue if you have found a bug and can describe how to reproduce it, feature requests and discussions should happen in the #ratos-development channel on discord.

<a href="http://discord.gg/ratrig" target="_blank" rel="noopener noreferrer" style="margin-left: 5px;"><img src="https://img.shields.io/discord/582187371529764864?color=%235865F2&amp;label=discord&amp;logo=discord&amp;logoColor=white&amp;style=flat" alt="discord"></a>
