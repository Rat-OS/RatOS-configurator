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

# Force script to exit if an error occurs
set -e

verify_ready
verify_users
install_hooks
ensure_sudo_command_whitelisting
yarn_install
