#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# shellcheck source=src/scripts/common.sh
source "$SCRIPT_DIR"/common.sh

verify_ready()
{
    if [ "$EUID" -eq 0 ]; then
        echo "This script must not run as root"
        exit 1
    fi
}

disable_telemetry()
{
    npx --yes -- next@13 telemetry disable
}

# Force script to exit if an error occurs
set -e

verify_ready
verify_users
install_hooks
ensure_sudo_command_whitelisting
ensure_pnpm_installation
install_logrotation
pnpm_install
disable_telemetry
install_udev_rule
install_cli
symlink_configuration
install_or_update_service_file