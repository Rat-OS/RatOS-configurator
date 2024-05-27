#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source $SCRIPT_DIR/common.sh

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

install_service()
{
        # Create systemd service file
    SERVICE_FILE="/etc/systemd/system/ratos-configurator.service"
    report_status "Installing RatOS system start script..."
    sudo groupadd -f ratos-configurator
    sudo /bin/sh -c "cat > ${SERVICE_FILE}" << __EOF
#### RatOS-configurator - Systemd service file
####
#### Written by Mikkel Schmidt <mikkel.schmidt@gmail.com>
#### Copyright 2022
#### https://github.com/Rat-OS/RatOS-Configurator
####
#### This File is distributed under GPLv3
####
[Unit]
Description=API Server for Klipper
Requires=network-online.target
After=network-online.target
[Install]
WantedBy=multi-user.target
[Service]
Type=simple
User=$USER
SupplementaryGroups=ratos-configurator
RemainAfterExit=yes
WorkingDirectory=${SRC_DIR}
ExecStart=pnpm start
Restart=always
RestartSec=10
StandardOutput=append:/var/log/ratos-configurator.log
StandardError=append:/var/log/ratos-configurator.log
__EOF
    # Enable the ratos configurator systemd service script
    sudo systemctl enable ratos-configurator.service
    sudo systemctl daemon-reload
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
install_service
install_udev_rule
install_cli
