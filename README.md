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
* Node v18.x (i prefer managing this with [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating))
* [PNPM](https://pnpm.io/installation)

Most bash scripts will assume user `pi` exists. Needs fixing, fortunately  you don't need them for most work.

### Installation

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
# Configuration repo
cd printer_data/config
git clone git@github.com:Rat-OS/RatOS-configuration.git RatOS
cd ../..
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
RATOS_SCRIPT_DIR=/home/myuser/RatOS-dev/RatOS-configurator/scripts
KLIPPER_DIR=/home/myuser/RatOS-dev/klipper
KLIPPER_ENV=/home/myuser/RatOS-dev/klippy-env
MOONRAKER_DIR=/home/myuser/RatOS-dev/moonraker
LOG_FILE=/home/myuser/RatOS-dev/printer_data/logs/ratos-configurator.log
RATOS_DATA_DIR=/home/myuser/RatOS-dev/printer_data/ratos
NEXT_PUBLIC_KLIPPER_HOSTNAME=hostnameofrunningtestprinter.local
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
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

## Help and support

Please use the unofficial Rat Rig discord for help and support. Only create an issue if you have found a bug and can describe how to reproduce it, feature requests and discussions should happen in the #ratos-development channel on discord.

<a href="http://discord.gg/ratrig" target="_blank" rel="noopener noreferrer" style="margin-left: 5px;"><img src="https://img.shields.io/discord/582187371529764864?color=%235865F2&amp;label=discord&amp;logo=discord&amp;logoColor=white&amp;style=flat" alt="discord"></a>
