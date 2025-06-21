#!/bin/bash

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
echo 'export PATH="$HOME/.local/share/pnpm:$PATH"' >> $HOME/.profile
export PATH="$HOME/.local/share/pnpm:$PATH"

# Navigate to src directory and install dependencies
cd /mnt/persist/workspace/src
pnpm install --frozen-lockfile

# Create required directories for tests
mkdir -p /mnt/persist/printer_data/config
mkdir -p /mnt/persist/printer_data/logs
mkdir -p /mnt/persist/printer_data/ratos-data

# Clone Klipper pinned to commit from moonraker.conf
git clone https://github.com/Klipper3d/klipper.git /mnt/persist/workspace/klipper
cd /mnt/persist/workspace/klipper
KLIPPER_COMMIT=$(grep -A1 "\[update_manager klipper\]" /mnt/persist/workspace/configuration/moonraker.conf | grep "pinned_commit:" | cut -d' ' -f2)
git checkout $KLIPPER_COMMIT
cd /mnt/persist/workspace/src
mkdir -p /mnt/persist/workspace/klippy-env

# Clone Moonraker pinned to commit from moonraker.conf
git clone https://github.com/Arksine/moonraker.git /mnt/persist/workspace/moonraker
cd /mnt/persist/workspace/moonraker
MOONRAKER_COMMIT=$(grep -A1 "\[update_manager moonraker\]" /mnt/persist/workspace/configuration/moonraker.conf | grep "pinned_commit:" | cut -d' ' -f2)
git checkout $MOONRAKER_COMMIT
cd /mnt/persist/workspace/src

# Set up environment variables for tests
cat > .env.test.local << EOF
RATOS_CONFIGURATION_PATH=/mnt/persist/workspace/configuration
KLIPPER_CONFIG_PATH=/mnt/persist/printer_data/config
RATOS_SCRIPT_DIR=/mnt/persist/workspace/src/scripts
KLIPPER_DIR=/mnt/persist/klipper
KLIPPER_ENV=/mnt/persist/klippy-env
MOONRAKER_DIR=/mnt/persist/moonraker
LOG_FILE=/mnt/persist/printer_data/logs/ratos-configurator.log
RATOS_DATA_DIR=/mnt/persist/printer_data/ratos-data
NEXT_PUBLIC_KLIPPER_HOSTNAME=
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
EOF

# Copy to .env.local as well
cp .env.test.local .env.local