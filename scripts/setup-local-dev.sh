#!/usr/bin/env bash

# Create minimal printer_data layout for local development and generate a .env.local
# This helps replicating the Raspberry Pi paths used in the project without devbox.

set -euo pipefail

ROOT_DIR=$(cd "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)
REPO_DIR=$(cd "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
PRINTER_DATA="$ROOT_DIR/printer_data"
CONFIG_PATH="$PRINTER_DATA/config"
RATOS_DATA="$PRINTER_DATA/ratos"

echo "Running local dev setup using project root: $ROOT_DIR"

mkdir -p "$CONFIG_PATH"
mkdir -p "$RATOS_DATA"

echo "Created $CONFIG_PATH and $RATOS_DATA"

# Symlink configuration into printer_data/config/RatOS if it doesn't already exist
if [ ! -e "$CONFIG_PATH/RatOS" ]; then
  ln -s "$ROOT_DIR/configuration" "$CONFIG_PATH/RatOS"
  echo "Linked configuration -> $CONFIG_PATH/RatOS"
else
  echo "Configuration link already exists: $CONFIG_PATH/RatOS"
fi

# Generate src/.env.local using project paths to avoid editing .env in repo
#
# Klipper/Moonraker hostname handling
# - You can pass the klipper/moonraker hostname for the client to connect to as the
#   first argument to this script: e.g. "./setup-local-dev.sh vc4-500-r-dev.local"
# - Alternatively you can pass a flag: "--host=vc4-500-r-dev.local"
# - Use -f or --force to overwrite an existing generated `src/.env.local` file.
# - If not provided the script will prompt. Leave blank to disable `NEXT_PUBLIC_KLIPPER_HOSTNAME`.
#
# The host name needs to be resolvable from the client browser. This is typically
# a printer running Klipper which provides Moonraker database access for the client
# to store state in. You must ensure the host running the client browser is
# listed under the `cors_domains` section in the target Moonraker's `moonraker.conf`.
#
# Example moonraker.conf snippet (add hostnames used by the client browser):
#
# [authorization]
# cors_domains:
#   http://localhost:3000
#   http://127.0.0.1:3000
#
# Notes:
# - The value must match the `Origin` header the browser sends (include scheme, host, and optionally port).
# - Avoid using overly permissive patterns; restrict to known development hostnames if possible.
ENV_FILE="$REPO_DIR/src/.env.local"

# Pick up a host provided via --host=foo, or the first positional arg if present.
# Accept force flag: -f or --force to overwrite existing $ENV_FILE
FORCE=false
MOONRAKER_HOSTNAME=""
for ARG in "$@"; do
  case $ARG in
    --host=*) MOONRAKER_HOSTNAME="${ARG#--host=}" ;;
    -h=*) MOONRAKER_HOSTNAME="${ARG#-h=}" ;;
    --force) FORCE=true ;;
    -f) FORCE=true ;;
  esac
done
if [ -z "$MOONRAKER_HOSTNAME" ] && [ "$#" -gt 0 ]; then
  # if not provided via flag, accept the first positional argument
  MOONRAKER_HOSTNAME="$1"
fi

if [ -z "$MOONRAKER_HOSTNAME" ]; then
  echo ""
  echo "Enter the Klipper/Moonraker hostname (resolvable from browser) for NEXT_PUBLIC_KLIPPER_HOSTNAME (leave blank to skip):"
  echo "  - Example: vc4-500-r-dev.local (include port if needed)."
  echo "  - This hostname must be resolvable by your browser."
  echo "  - Ensure this client (browser) origin is added to the remote Moonraker host's cors_domains."
  echo ""
  echo "Example moonraker.conf 'cors_domains' entry to allow localhost dev client:"
  echo ""
  cat <<'EOF'
[authorization]
cors_domains:
  http://localhost:3000
  http://127.0.0.1:3000
EOF
  echo ""
  echo "Tip: After adding the entry restart Moonraker on the printer host to apply the change."
  read -r MOONRAKER_HOSTNAME
fi
echo ""
if [ -n "$MOONRAKER_HOSTNAME" ]; then
  echo "Using Moonraker host: $MOONRAKER_HOSTNAME"
fi
PREEXISTS=false
if [ -f "$ENV_FILE" ]; then
  PREEXISTS=true
fi

if [ ! -f "$ENV_FILE" ] || [ "$FORCE" = true ]; then
  cat <<EOF > "$ENV_FILE"
USER=$(whoami)
RATOS_CONFIGURATION_PATH=$CONFIG_PATH/RatOS
KLIPPER_CONFIG_PATH=$CONFIG_PATH
RATOS_SCRIPT_DIR=$REPO_DIR/src/scripts
KLIPPER_DIR=$ROOT_DIR/klipper
KLIPPER_ENV=$ROOT_DIR/klippy-env
MOONRAKER_DIR=$ROOT_DIR/moonraker
LOG_FILE=$ROOT_DIR/printer_data/logs/ratos-configurator.log
RATOS_DATA_DIR=$RATOS_DATA
NEXT_PUBLIC_KLIPPER_HOSTNAME=$MOONRAKER_HOSTNAME
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false
EOF
  if [ "$FORCE" = true ] && [ "$PREEXISTS" = true ]; then
    echo "Overwrote existing $ENV_FILE"
  else
    echo "Generated $ENV_FILE"
  fi
else
  echo "$ENV_FILE already exists; not overwriting (pass -f or --force to overwrite)"
fi
echo ""
echo "Local dev setup finished."
echo "To start the dev server run: pnpm -C src run dev"
echo ""
echo "NOTE: The host name must be resolvable from the client browser. This is typically a printer"
echo "running Klipper which will provide Moonraker database access for the client to store state in."
echo "You must ensure that the host running the client browser is configured under the 'cors_domains'"
echo "section in the target Moonraker host's moonraker.conf. For local dev add the browser host"
echo "(e.g., http://localhost:3000) to the list and restart Moonraker."
