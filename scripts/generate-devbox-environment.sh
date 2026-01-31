#!/usr/bin/env bash

USER=$(whoami)

# When run inside devbox, this variable is provided by devbox itself. When this
# script is run outside devbox (for local setup or testing), fall back to the
# repository root so paths behave sensibly.
if [ -z "$DEVBOX_PROJECT_ROOT" ]; then
	echo "ERROR: DEVBOX_PROJECT_ROOT is not set. This script must be run inside devbox." >&2
	echo "If you're running locally (outside devbox), use ./scripts/setup-local-dev.sh instead." >&2
	exit 1
fi

# Ensure devbox helper directories exist. This is required so later calls to
# mkdir inside the app don't fail with ENOENT when parent directories are missing.
mkdir -p "$DEVBOX_PROJECT_ROOT/devbox.d/printer-config/ratos"
mkdir -p "$DEVBOX_PROJECT_ROOT/devbox.d/printer-config/logs"

KLIPPER_SRC="$DEVBOX_PROJECT_ROOT/.devbox/nix/profile/default/lib/klipper"
if [ -d "$KLIPPER_SRC" ]; then
	rsync -r --mkpath --copy-links --copy-dirlinks -E --progress "$KLIPPER_SRC" "$DEVBOX_PROJECT_ROOT/devbox.d"
else
	echo "Klipper distribution not available at $KLIPPER_SRC — skipping rsync"
fi

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

echo "Devbox environment prepared at: $DEVBOX_PROJECT_ROOT"