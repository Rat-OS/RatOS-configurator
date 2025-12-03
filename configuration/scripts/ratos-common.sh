#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# shellcheck source=./configuration/scripts/environment.sh
source "$SCRIPT_DIR"/environment.sh

report_status()
{
    echo -e "\n\n###### $1"
}

disable_modem_manager()
{
	report_status "Checking if ModemManager is enabled..."
	
	if ! sudo systemctl is-enabled ModemManager.service &> /dev/null; then
		report_status "Disabling ModemManager..."
		sudo systemctl disable ModemManager.service
	else
		report_status "ModemManager is already disabled.."
	fi
	report_status "Masking ModemManager to ensure it won't start in the future..."
	sudo systemctl mask ModemManager.service
}

update_beacon_fw()
{
	report_status "Updating beacon firmware..."
	if [ ! -d "$BEACON_DIR" ] || [ ! -e "$KLIPPER_DIR/klippy/extras/beacon.py" ]; then
		echo "beacon: beacon isn't installed, skipping..."
		return
	fi

	if [ ! -d "$KLIPPER_DIR" ] || [ ! -d "$KLIPPER_ENV" ]; then
		echo "beacon: klipper or klippy env doesn't exist"
		return
	fi

	if [ ! -f "$BEACON_DIR/update_firmware.py" ]; then
		echo "beacon: beacon firmware updater script doesn't exist, skipping..."
		return
	fi
	"$KLIPPER_ENV"/bin/python "$BEACON_DIR"/update_firmware.py update all --no-sudo
}

install_beacon()
{
    report_status "Installing beacon module..."

	if [ -d "$BEACON_DIR" ] || [ -e "$KLIPPER_DIR/klippy/extras/beacon.py" ]; then
		echo "beacon: beacon already installed, skipping..."
		return
	fi

	if [ ! -d "$KLIPPER_DIR" ] || [ ! -d "$KLIPPER_ENV" ]; then
		echo "beacon: klipper or klippy env doesn't exist"
		return
	fi

	git clone https://github.com/beacon3d/beacon_klipper.git "$BEACON_DIR"
	chown -R "${RATOS_USERNAME}:${RATOS_USERGROUP}" "$BEACON_DIR"

	# install beacon requirements to env
	echo "beacon: installing python requirements to env."
	"${KLIPPER_ENV}"/bin/pip install -r "${BEACON_DIR}"/requirements.txt

	# Beacon extension will be registered in verify_registered_extensions
}

regenerate_config() {
    report_status "Regenerating RatOS configuration via RatOS Configurator..."

    ratos config regenerate
}

remove_old_postprocessor()
{
	if [ -L "${KLIPPER_DIR}/klippy/extras/ratos_post_processor.py" ]; then
		report_status "Removing legacy post-processor..."
		rm "${KLIPPER_DIR}/klippy/extras/ratos_post_processor.py"
		echo "Legacy post-processor removed!"
	fi
}

install_hooks()
{
    report_status "Verifying git hooks are installed..."
	# Klipper hook
	klipper_source="$SCRIPT_DIR/klipper-post-merge.sh"
	klipper_target="${KLIPPER_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$klipper_target" ]] || [[ ! "$(readlink "$klipper_target")" = "$klipper_source" ]]
	then
		rm -f "$klipper_target"
		ln -s "$klipper_source" "$klipper_target"
		echo "Klipper git hook installed!"
	fi

	# Moonraker hook
	moonraker_source="$SCRIPT_DIR/moonraker-post-merge.sh"
	moonraker_target="${MOONRAKER_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$moonraker_target" ]] || [[ ! "$(readlink "$moonraker_target")" = "$moonraker_source" ]]
	then
		rm -f "$moonraker_target"
		ln -s "$moonraker_source" "$moonraker_target"
		echo "Moonraker git hook installed!"
	fi

	# Beacon hook
	beacon_source="$SCRIPT_DIR/beacon-post-merge.sh"
	beacon_target="${BEACON_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$beacon_target" ]] || [[ ! "$(readlink "$beacon_target")" = "$beacon_source" ]]
	then
		rm -f "$beacon_target"
		ln -s "$beacon_source" "$beacon_target"
		echo "Beacon git hook installed!"
	fi
	echo "Git hooks are correctly installed!"
}

ensure_service_permission()
{
	if [ ! -e "${RATOS_PRINTER_DATA_DIR}/moonraker.asvc" ]; then
		report_status "Fixing moonraker service permissions..."
		cat << EOF > "${RATOS_PRINTER_DATA_DIR}/moonraker.asvc"
klipper_mcu
webcamd
MoonCord
KlipperScreen
moonraker-telegram-bot
moonraker-obico
sonar
crowsnest
octoeverywhere
ratos-configurator
EOF

		echo "Moonraker service permissions restored!"
	fi
}

patch_klipperscreen_service_restarts()
{
	if grep "StartLimitIntervalSec=0" /etc/systemd/system/klipperscreen.service &>/dev/null; then
		report_status "Patching KlipperScreen service restarts..."
		# Fix restarts
		sudo sed -i 's/\RestartSec=1/\RestartSec=5/g' /etc/systemd/system/KlipperScreen.service
		sudo sed -i 's/\StartLimitIntervalSec=0/\StartLimitIntervalSec=100\nStartLimitBurst=4/g' /etc/systemd/system/KlipperScreen.service
		sudo systemctl daemon-reload
		echo "KlipperScreen service patched!"
	fi
}

ensure_sudo_command_whitelisting()
{
	sudo=""
	[ "$EUID" -ne 0 ] && sudo="sudo"
    report_status "Updating whitelisted commands"
	# Whitelist RatOS git hook scripts
	if [[ -e /etc/sudoers.d/030-ratos-githooks ]]
	then
		$sudo rm /etc/sudoers.d/030-ratos-githooks
	fi
	touch /tmp/030-ratos-githooks
	cat <<EOF > /tmp/030-ratos-githooks
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/ratos-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/klipper-mcu-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/beacon-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/moonraker-update.sh
EOF

	$sudo chown root:root /tmp/030-ratos-githooks
	$sudo chmod 440 /tmp/030-ratos-githooks
	$sudo cp --preserve=mode /tmp/030-ratos-githooks /etc/sudoers.d/030-ratos-githooks

	echo "RatOS git hooks has successfully been whitelisted!"
}

verify_registered_extensions()
{
    report_status "Verifying registered Klipper extensions..."

	RATOS_USER_HOME=$(getent passwd "${RATOS_USERNAME}" | cut -d: -f6)

    # Define expected extensions and their relative paths
    declare -A expected_extensions=(
        ["beacon"]=$(realpath "${BEACON_DIR}/beacon.py")
        ["gcode_shell_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/gcode_shell_command.py")
        ["ratos_homing_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/ratos_homing.py")
		["linear_movement_analysis"]=$(realpath "${RATOS_USER_HOME}/klipper_linear_movement_analysis/linear_movement_vibrations.py")
        ["z_offset_probe_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/z_offset_probe.py")
        ["resonance_generator_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/resonance_generator.py")
        ["ratos_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/ratos.py")
        ["beacon_mesh_extension"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/beacon_mesh.py")
    )

	declare -A kinematics_extensions=(
		["ratos_hybrid_corexy"]=$(realpath "${RATOS_PRINTER_DATA_DIR}/config/RatOS/klippy/kinematics/ratos_hybrid_corexy.py")
	)

	declare -A expected_moonraker_extensions=(
		["timelapse"]=$(realpath "${RATOS_USER_HOME}/moonraker-timelapse/component/timelapse.py")
	)

    # Track found extensions
    declare -A found_extensions
    declare -A found_kinematics
	declare -A found_moonraker_extensions
    
	declare extension_type="klipper"

	# Check registered extensions
    while IFS= read -r line; do
        # Skip empty lines and check headers
        [[ -z "$line" ]] && continue
        if [[ "$line" == *"Registered Klipper Extensions:"* ]]; then
			extension_type="klipper"
			continue
		fi
        if [[ "$line" == *"Registered Moonraker"* ]]; then
			extension_type="moonraker"
			continue
		fi

        # Extract extension name and filepath
        if [[ "$line" =~ [[:space:]]*([A-Za-z0-9_]+)[[:space:]]*-\>[[:space:]]*([^[:space:]].+)[[:space:]]*$ ]]; then
            ext_name="${BASH_REMATCH[1]}"
            filepath="${BASH_REMATCH[2]}"

			# Check if it's a kinematics extension
			if [[ -v kinematics_extensions["$ext_name"] ]]; then
				found_kinematics["$ext_name"]=1

				# Check if filepath matches expected path
				if [[ "$filepath" != "${kinematics_extensions[$ext_name]}" ]]; then
					echo "WARNING: Kinematics extension $ext_name has unexpected filepath:"
					echo "  Expected: ${kinematics_extensions[$ext_name]}"
					echo "  Found: $filepath"
					echo "Removing extension $ext_name..."
					ratos extensions unregister klipper "$ext_name"
					echo "Reregistering extension $ext_name..."
					EXT_PATH="${kinematics_extensions[$ext_name]}"
					ratos extensions register klipper -k "$ext_name" "$EXT_PATH" "$EXT_FILE"
				fi
				continue
			fi

			# Mark as found
			if [[ "$extension_type" == "klipper" ]]; then
				found_extensions["$ext_name"]=1
			fi
			if [[ "$extension_type" == "moonraker" ]]; then
				found_moonraker_extensions["$ext_name"]=1
			fi

			# Check if extension is expected
			if [[ ! -v expected_extensions["$ext_name"] ]] && [[ ! -v expected_moonraker_extensions["$ext_name"] ]]; then
				echo "WARNING: Unexpected $extension_type extension found: $ext_name. This may have been registered by a third party."
				echo "To remove the extension, run 'ratos extensions unregister $extension_type $ext_name'"
				continue
			fi

			# Check if filepath matches expected path
			if [[ "$filepath" != "${expected_extensions[$ext_name]}" ]] && [[ "$filepath" != "${expected_moonraker_extensions[$ext_name]}" ]]; then
				echo "WARNING: Extension $ext_name has unexpected filepath:"
				echo "  Expected: ${expected_extensions[$ext_name]}"
				echo "  Found: $filepath"
				echo "Removing $extension_type extension $ext_name..."
				ratos extensions unregister "$extension_type" "$ext_name"
				echo "Reregistering $extension_type extension $ext_name..."
				EXT_PATH="${expected_extensions[$ext_name]}"
				ratos extensions register "$extension_type" "$ext_name" "$EXT_PATH"
			fi

			# Check if file exists
			if [ ! -f "$filepath" ]; then
				echo "WARNING: Extension file not found: $filepath. If you keep seeing this message, please report it to RatOS maintainers."
				echo "Unregistering $extension_type extension $ext_name..."
				ratos extensions unregister "$extension_type" "$ext_name"
			fi
        fi
    done < <(ratos extensions list --non-interactive)

    # Check for missing expected extensions
    for ext_name in "${!expected_extensions[@]}"; do
        if [[ ! -v found_extensions["$ext_name"] ]]; then
            echo "Expected klipper extension not registered: $ext_name"
			echo "Registering extension $ext_name..."
			EXT_PATH="${expected_extensions[$ext_name]}"
			ratos extensions register klipper "$ext_name" "$EXT_PATH"
        else
			echo "Klipper extension $ext_name is properly registered."
		fi
    done

	# Check for missing moonraker extensions
	for ext_name in "${!expected_moonraker_extensions[@]}"; do
		if [[ ! -v found_moonraker_extensions["$ext_name"] ]]; then
			echo "Expected moonraker extension not registered: $ext_name"
			echo "Registering extension $ext_name..."
			EXT_PATH="${expected_moonraker_extensions[$ext_name]}"
			ratos extensions register moonraker "$ext_name" "$EXT_PATH"
		else
			echo "Moonraker extension $ext_name is properly registered."
		fi
	done

    # Check for missing kinematics extensions
    for ext_name in "${!kinematics_extensions[@]}"; do
        if [[ ! -v found_kinematics["$ext_name"] ]]; then
            echo "Expected klipper kinematics extension not registered: $ext_name"
			echo "Registering klipper kinematics extension $ext_name..."
			EXT_PATH="${kinematics_extensions[$ext_name]}"
			ratos extensions register klipper -k "$ext_name" "$EXT_PATH"
		else
			echo "Klipper kinematics extension $ext_name is properly registered."
		fi
    done
}

