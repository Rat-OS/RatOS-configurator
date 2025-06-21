#!/bin/bash

KLIPPER_DIR=/mnt/persist/klipper
KLIPPER_ENV_DIR=/mnt/persist/klipper-env
MOONRAKER_DIR=/mnt/persist/moonraker
PRINTER_DATA_DIR=/mnt/persist/printer_data
CONFIGURATOR_ROOT_DIR=/mnt/persist/workspace

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
# shellcheck disable=SC2016
echo 'export PATH="$HOME/.local/share/pnpm:$PATH"' >> "$HOME/.profile"
export PATH="$HOME/.local/share/pnpm:$PATH"

# Navigate to src directory and install dependencies
cd "$CONFIGURATOR_ROOT_DIR/src" || exit 1
pnpm install --frozen-lockfile

# Create required directories for tests
mkdir -p "$PRINTER_DATA_DIR/config"
mkdir -p "$PRINTER_DATA_DIR/logs"
mkdir -p "$PRINTER_DATA_DIR/ratos-data"

# Clone Klipper pinned to commit from moonraker.conf
git clone https://github.com/Klipper3d/klipper.git "$KLIPPER_DIR"
cd "$KLIPPER_DIR" || exit 1
KLIPPER_COMMIT=$(grep -A1 "\[update_manager klipper\]" "$CONFIGURATOR_ROOT_DIR/configuration/moonraker.conf" | grep "pinned_commit:" | cut -d' ' -f2)
git checkout "$KLIPPER_COMMIT"
cd "$CONFIGURATOR_ROOT_DIR" || exit 1
mkdir -p "$KLIPPER_ENV_DIR"

# Clone Moonraker pinned to commit from moonraker.conf
git clone https://github.com/Arksine/moonraker.git "$MOONRAKER_DIR"
cd "$MOONRAKER_DIR" || exit 1
MOONRAKER_COMMIT=$(grep -A1 "\[update_manager moonraker\]" /mnt/persist/workspace/configuration/moonraker.conf | grep "pinned_commit:" | cut -d' ' -f2)
git checkout "$MOONRAKER_COMMIT"

cd "$CONFIGURATOR_ROOT_DIR/src" || exit 1

# Set up environment variables for tests
cat > .env.test.local << EOF
RATOS_CONFIGURATION_PATH="$CONFIGURATOR_ROOT_DIR/configuration"
KLIPPER_CONFIG_PATH="$PRINTER_DATA_DIR/config"
RATOS_SCRIPT_DIR="$CONFIGURATOR_ROOT_DIR/src/scripts"
KLIPPER_DIR="$KLIPPER_DIR"
KLIPPER_ENV_DIR="$KLIPPER_ENV_DIR"
MOONRAKER_DIR="$MOONRAKER_DIR"
LOG_FILE="$PRINTER_DATA_DIR/logs/ratos-configurator.log"
RATOS_DATA_DIR="$PRINTER_DATA_DIR/ratos-data"
NEXT_PUBLIC_KLIPPER_HOSTNAME=
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
EOF

# Copy to .env.local as well
cp .env.test.local .env.local