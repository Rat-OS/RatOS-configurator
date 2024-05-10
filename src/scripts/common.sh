#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
GIT_DIR=$SCRIPT_DIR/../.git
if echo "$SCRIPT_DIR" | grep "/src/" > /dev/null; then
	# in the deployment branch src is the root. In main src is a subdirectory.
	GIT_DIR=$SCRIPT_DIR/../../.git
fi
SRC_DIR=$(realpath "$SCRIPT_DIR/..")
GIT_DIR=$(realpath "$GIT_DIR")

report_status()
{
    echo -e "\n\n###### $1"
}

pnpm_install() {
    pushd "$SRC_DIR" || exit 1
	if [ "$EUID" -eq 0 ]; then
		# Check if node_modules is owned by root and delete
		# Fixes old 2.0 installations
		if [ -d "$SRC_DIR/node_modules" ] && [ "$(stat -c %U "$SRC_DIR/node_modules")" == "root" ]; then
			report_status "Deleting root owned node_modules"
			rm -rf "$SRC_DIR/node_modules"
		fi
        sudo -u pi pnpm install --frozen-lockfile --aggregate-output --no-color --config.confirmModulesPurge=false
    else
		pnpm install --frozen-lockfile --aggregate-output --no-color --config.confirmModulesPurge=false
	fi
    popd || exit 1
}

ensure_pnpm_installation() {
	if ! which pnpm &> /dev/null; then
		report_status "Installing pnpm"
		npm install -g pnpm
		# remove old node modules
		rm -rf "$SRC_DIR/node_modules"
		pnpm_install
	fi
}

ensure_service_permission()
{
	report_status "Updating service permissions"
	if ! grep -q "ratos-configurator" /home/pi/printer_data/moonraker.asvc; then
		printf '\nratos-configurator' >> /home/pi/printer_data/moonraker.asvc
		report_status "Configurator added to moonraker service permissions"
	fi
}

build() {
    pushd "$SCRIPT_DIR/.." || exit 1
	pnpm build
	popd || exit 1
}

install_hooks()
{
    report_status "Installing git hooks"
	if [ ! -L "$GIT_DIR/hooks/post-merge" ]; then
 	   ln -s "$SCRIPT_DIR/post-merge.sh" "$GIT_DIR/hooks/post-merge"
	fi
}


install_logrotation() {
    LOGROTATE_FILE="/etc/logrotate.d/ratos-configurator"
    LOGFILE="/home/${USER}/printer_data/logs/ratos-configurator.log"
    report_status "Installing RatOS Configurator log rotation script..."
    sudo /bin/sh -c "cat > ${LOGROTATE_FILE}" << __EOF
#### RatOS-configurator
####
#### Written by Mikkel Schmidt <mikkel.schmidt@gmail.com>
#### Copyright 2022
#### https://github.com/Rat-OS/RatOS-Configurator
####
#### This File is distributed under GPLv3
####


${LOGFILE} {
    rotate 3
    missingok
    notifempty
    copy
    daily
    dateext
    dateformat .%Y-%m-%d
    maxsize 10M
}
__EOF
    sudo chmod 644 ${LOGROTATE_FILE}
}

patch_log_rotation() {
	if [ -e /etc/logrotate.d/ratos-configurator ]; then
		if grep -q "/printer_data/logs/configurator.log" /etc/logrotate.d/ratos-configurator; then
			report_status "Patching log rotation"
			sudo sed -i 's|rotate 4|rotate 3|g' /etc/logrotate.d/ratos-configurator
			sudo sed -i 's|/printer_data/logs/configurator.log"|/printer_data/logs/ratos-configurator.log"|g' /etc/logrotate.d/ratos-configurator
		fi
	else
		install_logrotation
	fi
}

install_cli()
{
	report_status "Installing RatOS CLI"
	sudo=""
	if [ "$EUID" -ne 0 ]
	then
		sudo="sudo"
	fi
	if [ ! -L "/usr/local/bin/ratos" ]; then
 	   $sudo ln -s "$SRC_DIR/bin/ratos" "/usr/local/bin/ratos"
	   $sudo chmod a+x "/usr/local/bin/ratos"
	fi
}

verify_users()
{
	if ! id "pi" &>/dev/null; then
		echo "User pi is not present on the system"
		exit 1
	fi
}

install_udev_rule()
{
	report_status "Installing udev rule"
	sudo=""
	if [ "$EUID" -ne 0 ]
	then
		sudo="sudo"
	fi
	if [ ! -e /etc/udev/rules.d/97-ratos.rules ]; then
		$sudo ln -s "$SCRIPT_DIR/ratos.rules" /etc/udev/rules.d/97-ratos.rules
	fi
}

ensure_sudo_command_whitelisting()
{
	sudo=""
	if [ "$EUID" -ne 0 ]
	then
		sudo="sudo"
	fi
    report_status "Updating whitelisted commands"
	# Whitelist RatOS configurator git hook scripts
	if [[ -e /etc/sudoers.d/030-ratos-configurator-githooks ]]
	then
		$sudo rm /etc/sudoers.d/030-ratos-configurator-githooks
	fi
	touch /tmp/030-ratos-configurator-githooks
	cat << __EOF > /tmp/030-ratos-configurator-githooks
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/update.sh
__EOF

	$sudo chown root:root /tmp/030-ratos-configurator-githooks
	$sudo chmod 440 /tmp/030-ratos-configurator-githooks
	$sudo cp --preserve=mode /tmp/030-ratos-configurator-githooks /etc/sudoers.d/030-ratos-configurator-githooks

	# Whitelist configurator scripts
	if [[ -e /etc/sudoers.d/030-ratos-configurator-scripts ]]
	then
		$sudo rm /etc/sudoers.d/030-ratos-configurator-scripts
	fi
	touch /tmp/030-ratos-configurator-scripts
	cat << __EOF > /tmp/031-ratos-configurator-scripts
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/add-wifi-network.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/change-hostname.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/dfu-flash.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/board-script.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/flash-path.sh
pi  ALL=(ALL) NOPASSWD: $SCRIPT_DIR/klipper-compile.sh
__EOF

	$sudo chown root:root /tmp/031-ratos-configurator-scripts
	$sudo chmod 440 /tmp/031-ratos-configurator-scripts
	$sudo cp --preserve=mode /tmp/031-ratos-configurator-scripts /etc/sudoers.d/031-ratos-configurator-scripts

	# Whitelist configurator commands
	if [[ -e /etc/sudoers.d/031-ratos-configurator-wifi ]]
	then
		$sudo rm /etc/sudoers.d/031-ratos-configurator-wifi
	fi
	touch /tmp/031-ratos-configurator-wifi
	cat << __EOF > /tmp/031-ratos-configurator-wifi
pi  ALL=(ALL) NOPASSWD: /usr/sbin/iw
pi  ALL=(ALL) NOPASSWD: /usr/sbin/wpa_cli
__EOF

	$sudo chown root:root /tmp/031-ratos-configurator-wifi
	$sudo chmod 440 /tmp/031-ratos-configurator-wifi
	$sudo cp --preserve=mode /tmp/031-ratos-configurator-wifi /etc/sudoers.d/031-ratos-configurator-wifi

}
