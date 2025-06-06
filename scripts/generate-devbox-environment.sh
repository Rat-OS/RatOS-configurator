#!/bin/bash

USER=$(whoami)

rsync -r --mkpath --copy-links --copy-dirlinks -E --progress "$DEVBOX_PROJECT_ROOT/.devbox/nix/profile/default/lib/klipper" "$DEVBOX_PROJECT_ROOT/devbox.d"

cat <<EOF > "$DEVBOX_PROJECT_ROOT/src/.env.local"
USER=$USER
RATOS_CONFIGURATION_PATH=$DEVBOX_PROJECT_ROOT/configuration
KLIPPER_CONFIG_PATH=$DEVBOX_PROJECT_ROOT/devbox.d/printer-config/config
RATOS_SCRIPT_DIR=$DEVBOX_PROJECT_ROOT/src/scripts
KLIPPER_DIR=$DEVBOX_PROJECT_ROOT/devbox.d/klipper
KLIPPER_ENV=$DEVBOX_PROJECT_ROOT/devbox.d/klippy-env
MOONRAKER_DIR=$DEVBOX_PROJECT_ROOT/.devbox/nix/profile/default/lib/moonraker
LOG_FILE=$DEVBOX_PROJECT_ROOT/devbox.d/printer-config/logs/ratos-configurator.log
RATOS_DATA_DIR=$DEVBOX_PROJECT_ROOT/devbox.d/printer-config/ratos
NEXT_PUBLIC_KLIPPER_HOSTNAME=
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
EOF

cp "$DEVBOX_PROJECT_ROOT/src/.env.local" "$DEVBOX_PROJECT_ROOT/src/.env.test.local"