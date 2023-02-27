#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source $SCRIPT_DIR/common.sh

verify_ready()
{
    if [ ! "$EUID" -eq 0 ]; then
        echo "This script must run as root"
        exit -1
    fi
}

refresh_yarn_gpg_key()
{
    curl -sSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
}

verify_ready
verify_users
install_hooks
ensure_service_permission
ensure_sudo_command_whitelisting
ensure_pnpm_installation
pnpm_install
