#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# shellcheck source=./src/scripts/common.sh
source "$SCRIPT_DIR/common.sh"

verify_ready()
{
    if [ ! "$EUID" -eq 0 ]; then
        echo "This script must run as root"
        exit 1
    fi
}

maybe_truncate_log()
{
    LOG_FILE="/var/log/ratos-configurator.log"
    if grep -q "    'network=" $LOG_FILE; then
        report_status "Found network credentials in log, truncating ..."
        truncate -s 0 "$LOG_FILE"
        report_status "Log truncated. If you've posted a debug-zip publically, please change your wifi password."
    fi
}

verify_ready
verify_users
maybe_truncate_log
ensure_pnpm_installation
ensure_service_permission
ensure_sudo_command_whitelisting
install_hooks
update_package_managers
pnpm_install
install_cli
install_udev_rule
patch_log_rotation
symlink_configuration
install_or_update_service_file