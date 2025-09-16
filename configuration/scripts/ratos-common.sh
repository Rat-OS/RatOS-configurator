#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# shellcheck source=./configuration/scripts/environment.sh
source "$SCRIPT_DIR"/environment.sh
# shellcheck source=./configuration/scripts/ratos-logging.sh
source "$SCRIPT_DIR"/ratos-logging.sh

# Set up error trapping for this script
setup_error_trap "ratos-common"

report_status()
{
    echo -e "\n\n###### $1"
    log_info "$1" "status_report"
}

disable_modem_manager()
{
	log_info "Starting ModemManager disable process" "disable_modem_manager"
	report_status "Checking if ModemManager is enabled..."

	if ! sudo systemctl is-enabled ModemManager.service &> /dev/null; then
		report_status "Disabling ModemManager..."
		if execute_with_logging "disable_modem_manager" "MODEM_MANAGER_DISABLE_FAILED" sudo systemctl disable ModemManager.service; then
			log_info "ModemManager disabled successfully" "disable_modem_manager"
		else
			log_error "Failed to disable ModemManager" "disable_modem_manager" "MODEM_MANAGER_DISABLE_FAILED"
			return 1
		fi
	else
		report_status "ModemManager is already disabled.."
		log_info "ModemManager already disabled" "disable_modem_manager"
	fi
	report_status "Masking ModemManager to ensure it won't start in the future..."
	if execute_with_logging "disable_modem_manager" "MODEM_MANAGER_MASK_FAILED" sudo systemctl mask ModemManager.service; then
		log_info "ModemManager masked successfully" "disable_modem_manager"
	else
		log_error "Failed to mask ModemManager" "disable_modem_manager" "MODEM_MANAGER_MASK_FAILED"
		return 1
	fi
}

update_beacon_fw()
{
	log_info "Starting beacon firmware update" "update_beacon_fw"
	report_status "Updating beacon firmware..."
	if [ ! -d "$BEACON_DIR" ] || [ ! -e "$KLIPPER_DIR/klippy/extras/beacon.py" ]; then
		echo "beacon: beacon isn't installed, skipping..."
		log_info "Beacon not installed, skipping firmware update" "update_beacon_fw"
		return
	fi

	if [ ! -d "$KLIPPER_DIR" ] || [ ! -d "$KLIPPER_ENV" ]; then
		echo "beacon: klipper or klippy env doesn't exist"
		log_warn "Klipper or klippy environment doesn't exist" "update_beacon_fw"
		return
	fi

	if [ ! -f "$BEACON_DIR/update_firmware.py" ]; then
		echo "beacon: beacon firmware updater script doesn't exist, skipping..."
		log_warn "Beacon firmware updater script not found" "update_beacon_fw"
		return
	fi

	if execute_with_logging "update_beacon_fw" "BEACON_FW_UPDATE_FAILED" "$KLIPPER_ENV"/bin/python "$BEACON_DIR"/update_firmware.py update all --no-sudo; then
		log_info "Beacon firmware updated successfully" "update_beacon_fw"
	else
		log_error "Failed to update beacon firmware" "update_beacon_fw" "BEACON_FW_UPDATE_FAILED"
		return 1
	fi
}

install_beacon()
{
    log_info "Starting beacon module installation" "install_beacon"
    report_status "Installing beacon module..."

	if [ -d "$BEACON_DIR" ] || [ -e "$KLIPPER_DIR/klippy/extras/beacon.py" ]; then
		echo "beacon: beacon already installed, skipping..."
		log_info "Beacon already installed, skipping" "install_beacon"
		return
	fi

	if [ ! -d "$KLIPPER_DIR" ] || [ ! -d "$KLIPPER_ENV" ]; then
		echo "beacon: klipper or klippy env doesn't exist"
		log_error "Klipper or klippy environment doesn't exist" "install_beacon" "KLIPPER_ENV_MISSING"
		return 1
	fi

	if execute_with_logging "install_beacon" "BEACON_CLONE_FAILED" git clone https://github.com/beacon3d/beacon_klipper.git "$BEACON_DIR"; then
		log_info "Beacon repository cloned successfully" "install_beacon"
	else
		log_error "Failed to clone beacon repository" "install_beacon" "BEACON_CLONE_FAILED"
		return 1
	fi

	if execute_with_logging "install_beacon" "BEACON_OWNERSHIP_FAILED" chown -R "${RATOS_USERNAME}:${RATOS_USERGROUP}" "$BEACON_DIR"; then
		log_info "Beacon directory ownership set successfully" "install_beacon"
	else
		log_error "Failed to set beacon directory ownership" "install_beacon" "BEACON_OWNERSHIP_FAILED"
		return 1
	fi

	# install beacon requirements to env
	echo "beacon: installing python requirements to env."
	if execute_with_logging "install_beacon" "BEACON_REQUIREMENTS_FAILED" "${KLIPPER_ENV}"/bin/pip install -r "${BEACON_DIR}"/requirements.txt; then
		log_info "Beacon requirements installed successfully" "install_beacon"
	else
		log_error "Failed to install beacon requirements" "install_beacon" "BEACON_REQUIREMENTS_FAILED"
		return 1
	fi

	# Beacon extension will be registered in verify_registered_extensions
	log_info "Beacon module installation completed" "install_beacon"
}

regenerate_config() {
    log_info "Starting RatOS configuration regeneration" "regenerate_config"
    report_status "Regenerating RatOS configuration via RatOS Configurator..."

    if execute_with_logging "regenerate_config" "CONFIG_REGENERATE_FAILED" ratos config regenerate; then
        log_info "RatOS configuration regenerated successfully" "regenerate_config"
    else
        log_error "Failed to regenerate RatOS configuration" "regenerate_config" "CONFIG_REGENERATE_FAILED"
        return 1
    fi
}

remove_old_postprocessor()
{
	log_info "Checking for legacy post-processor" "remove_old_postprocessor"
	if [ -L "${KLIPPER_DIR}/klippy/extras/ratos_post_processor.py" ]; then
		report_status "Removing legacy post-processor..."
		if execute_with_logging "remove_old_postprocessor" "POSTPROCESSOR_REMOVE_FAILED" rm "${KLIPPER_DIR}/klippy/extras/ratos_post_processor.py"; then
			echo "Legacy post-processor removed!"
			log_info "Legacy post-processor removed successfully" "remove_old_postprocessor"
		else
			log_error "Failed to remove legacy post-processor" "remove_old_postprocessor" "POSTPROCESSOR_REMOVE_FAILED"
			return 1
		fi
	else
		log_info "No legacy post-processor found" "remove_old_postprocessor"
	fi
}

install_hooks()
{
    log_info "Starting git hooks installation" "install_hooks"
    report_status "Verifying git hooks are installed..."

	# Klipper hook
	klipper_source="$SCRIPT_DIR/klipper-post-merge.sh"
	klipper_target="${KLIPPER_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$klipper_target" ]] || [[ ! "$(readlink "$klipper_target")" = "$klipper_source" ]]
	then
		if execute_with_logging "install_hooks" "KLIPPER_HOOK_REMOVE_FAILED" rm -f "$klipper_target"; then
			if execute_with_logging "install_hooks" "KLIPPER_HOOK_INSTALL_FAILED" ln -s "$klipper_source" "$klipper_target"; then
				echo "Klipper git hook installed!"
				log_info "Klipper git hook installed successfully" "install_hooks"
			else
				log_error "Failed to install Klipper git hook" "install_hooks" "KLIPPER_HOOK_INSTALL_FAILED"
				return 1
			fi
		else
			log_error "Failed to remove old Klipper git hook" "install_hooks" "KLIPPER_HOOK_REMOVE_FAILED"
			return 1
		fi
	else
		log_info "Klipper git hook already correctly installed" "install_hooks"
	fi

	# Moonraker hook
	moonraker_source="$SCRIPT_DIR/moonraker-post-merge.sh"
	moonraker_target="${MOONRAKER_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$moonraker_target" ]] || [[ ! "$(readlink "$moonraker_target")" = "$moonraker_source" ]]
	then
		if execute_with_logging "install_hooks" "MOONRAKER_HOOK_REMOVE_FAILED" rm -f "$moonraker_target"; then
			if execute_with_logging "install_hooks" "MOONRAKER_HOOK_INSTALL_FAILED" ln -s "$moonraker_source" "$moonraker_target"; then
				echo "Moonraker git hook installed!"
				log_info "Moonraker git hook installed successfully" "install_hooks"
			else
				log_error "Failed to install Moonraker git hook" "install_hooks" "MOONRAKER_HOOK_INSTALL_FAILED"
				return 1
			fi
		else
			log_error "Failed to remove old Moonraker git hook" "install_hooks" "MOONRAKER_HOOK_REMOVE_FAILED"
			return 1
		fi
	else
		log_info "Moonraker git hook already correctly installed" "install_hooks"
	fi

	# Beacon hook
	beacon_source="$SCRIPT_DIR/beacon-post-merge.sh"
	beacon_target="${BEACON_DIR}/.git/hooks/post-merge"
	if [[ ! -L "$beacon_target" ]] || [[ ! "$(readlink "$beacon_target")" = "$beacon_source" ]]
	then
		if execute_with_logging "install_hooks" "BEACON_HOOK_REMOVE_FAILED" rm -f "$beacon_target"; then
			if execute_with_logging "install_hooks" "BEACON_HOOK_INSTALL_FAILED" ln -s "$beacon_source" "$beacon_target"; then
				echo "Beacon git hook installed!"
				log_info "Beacon git hook installed successfully" "install_hooks"
			else
				log_error "Failed to install Beacon git hook" "install_hooks" "BEACON_HOOK_INSTALL_FAILED"
				return 1
			fi
		else
			log_error "Failed to remove old Beacon git hook" "install_hooks" "BEACON_HOOK_REMOVE_FAILED"
			return 1
		fi
	else
		log_info "Beacon git hook already correctly installed" "install_hooks"
	fi

	echo "Git hooks are correctly installed!"
	log_info "All git hooks installation completed successfully" "install_hooks"
}

ensure_service_permission()
{
	log_info "Checking moonraker service permissions" "ensure_service_permission"
	if [ ! -e "${RATOS_PRINTER_DATA_DIR}/moonraker.asvc" ]; then
		report_status "Fixing moonraker service permissions..."
		if cat << EOF > "${RATOS_PRINTER_DATA_DIR}/moonraker.asvc"
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
		then
			echo "Moonraker service permissions restored!"
			log_info "Moonraker service permissions file created successfully" "ensure_service_permission"
		else
			log_error "Failed to create moonraker service permissions file" "ensure_service_permission" "MOONRAKER_ASVC_CREATE_FAILED"
			return 1
		fi
	else
		log_info "Moonraker service permissions file already exists" "ensure_service_permission"
	fi
}

patch_klipperscreen_service_restarts()
{
	log_info "Checking KlipperScreen service restart configuration" "patch_klipperscreen_service_restarts"
	if grep "StartLimitIntervalSec=0" /etc/systemd/system/klipperscreen.service &>/dev/null; then
		report_status "Patching KlipperScreen service restarts..."
		# Fix restarts
		if execute_with_logging "patch_klipperscreen_service_restarts" "KLIPPERSCREEN_RESTART_PATCH_FAILED" sudo sed -i 's/\RestartSec=1/\RestartSec=5/g' /etc/systemd/system/KlipperScreen.service; then
			if execute_with_logging "patch_klipperscreen_service_restarts" "KLIPPERSCREEN_LIMIT_PATCH_FAILED" sudo sed -i 's/\StartLimitIntervalSec=0/\StartLimitIntervalSec=100\nStartLimitBurst=4/g' /etc/systemd/system/KlipperScreen.service; then
				if execute_with_logging "patch_klipperscreen_service_restarts" "SYSTEMCTL_RELOAD_FAILED" sudo systemctl daemon-reload; then
					echo "KlipperScreen service patched!"
					log_info "KlipperScreen service restart configuration patched successfully" "patch_klipperscreen_service_restarts"
				else
					log_error "Failed to reload systemctl daemon" "patch_klipperscreen_service_restarts" "SYSTEMCTL_RELOAD_FAILED"
					return 1
				fi
			else
				log_error "Failed to patch KlipperScreen start limit configuration" "patch_klipperscreen_service_restarts" "KLIPPERSCREEN_LIMIT_PATCH_FAILED"
				return 1
			fi
		else
			log_error "Failed to patch KlipperScreen restart configuration" "patch_klipperscreen_service_restarts" "KLIPPERSCREEN_RESTART_PATCH_FAILED"
			return 1
		fi
	else
		log_info "KlipperScreen service restart configuration already correct" "patch_klipperscreen_service_restarts"
	fi
}

ensure_sudo_command_whitelisting()
{
	log_info "Starting sudo command whitelisting process" "ensure_sudo_command_whitelisting"
	sudo=""
	[ "$EUID" -ne 0 ] && sudo="sudo"
    report_status "Updating whitelisted commands"

	# Whitelist RatOS git hook scripts
	if [[ -e /etc/sudoers.d/030-ratos-githooks ]]
	then
		if execute_with_logging "ensure_sudo_command_whitelisting" "SUDOERS_REMOVE_FAILED" $sudo rm /etc/sudoers.d/030-ratos-githooks; then
			log_info "Old sudoers file removed successfully" "ensure_sudo_command_whitelisting"
		else
			log_error "Failed to remove old sudoers file" "ensure_sudo_command_whitelisting" "SUDOERS_REMOVE_FAILED"
			return 1
		fi
	fi

	if execute_with_logging "ensure_sudo_command_whitelisting" "SUDOERS_TEMP_CREATE_FAILED" touch /tmp/030-ratos-githooks; then
		if cat <<EOF > /tmp/030-ratos-githooks
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/ratos-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/klipper-mcu-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/beacon-update.sh
${RATOS_USERNAME}  ALL=(ALL) NOPASSWD: ${RATOS_PRINTER_DATA_DIR}/config/RatOS/scripts/moonraker-update.sh
EOF
		then
			if execute_with_logging "ensure_sudo_command_whitelisting" "SUDOERS_CHOWN_FAILED" $sudo chown root:root /tmp/030-ratos-githooks; then
				if execute_with_logging "ensure_sudo_command_whitelisting" "SUDOERS_CHMOD_FAILED" $sudo chmod 440 /tmp/030-ratos-githooks; then
					if execute_with_logging "ensure_sudo_command_whitelisting" "SUDOERS_COPY_FAILED" $sudo cp --preserve=mode /tmp/030-ratos-githooks /etc/sudoers.d/030-ratos-githooks; then
						echo "RatOS git hooks has successfully been whitelisted!"
						log_info "Sudo command whitelisting completed successfully" "ensure_sudo_command_whitelisting"
					else
						log_error "Failed to copy sudoers file to final location" "ensure_sudo_command_whitelisting" "SUDOERS_COPY_FAILED"
						return 1
					fi
				else
					log_error "Failed to set sudoers file permissions" "ensure_sudo_command_whitelisting" "SUDOERS_CHMOD_FAILED"
					return 1
				fi
			else
				log_error "Failed to set sudoers file ownership" "ensure_sudo_command_whitelisting" "SUDOERS_CHOWN_FAILED"
				return 1
			fi
		else
			log_error "Failed to write sudoers file content" "ensure_sudo_command_whitelisting" "SUDOERS_CONTENT_WRITE_FAILED"
			return 1
		fi
	else
		log_error "Failed to create temporary sudoers file" "ensure_sudo_command_whitelisting" "SUDOERS_TEMP_CREATE_FAILED"
		return 1
	fi
}

verify_registered_extensions()
{
    log_info "Starting extension verification process" "verify_registered_extensions"
    report_status "Verifying registered Klipper extensions..."

	RATOS_USER_HOME=$(getent passwd "${RATOS_USERNAME}" | cut -d: -f6)
	log_debug "User home directory: $RATOS_USER_HOME" "verify_registered_extensions"

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
			if execute_with_logging "verify_registered_extensions" "KLIPPER_EXT_REGISTER_FAILED" ratos extensions register klipper "$ext_name" "$EXT_PATH"; then
				log_info "Klipper extension $ext_name registered successfully" "verify_registered_extensions"
			else
				log_error "Failed to register Klipper extension $ext_name" "verify_registered_extensions" "KLIPPER_EXT_REGISTER_FAILED"
				return 1
			fi
        else
			echo "Klipper extension $ext_name is properly registered."
			log_debug "Klipper extension $ext_name already registered" "verify_registered_extensions"
		fi
    done

	# Check for missing moonraker extensions
	for ext_name in "${!expected_moonraker_extensions[@]}"; do
		if [[ ! -v found_moonraker_extensions["$ext_name"] ]]; then
			echo "Expected moonraker extension not registered: $ext_name"
			echo "Registering extension $ext_name..."
			EXT_PATH="${expected_moonraker_extensions[$ext_name]}"
			if execute_with_logging "verify_registered_extensions" "MOONRAKER_EXT_REGISTER_FAILED" ratos extensions register moonraker "$ext_name" "$EXT_PATH"; then
				log_info "Moonraker extension $ext_name registered successfully" "verify_registered_extensions"
			else
				log_error "Failed to register Moonraker extension $ext_name" "verify_registered_extensions" "MOONRAKER_EXT_REGISTER_FAILED"
				return 1
			fi
		else
			echo "Moonraker extension $ext_name is properly registered."
			log_debug "Moonraker extension $ext_name already registered" "verify_registered_extensions"
		fi
	done

    # Check for missing kinematics extensions
    for ext_name in "${!kinematics_extensions[@]}"; do
        if [[ ! -v found_kinematics["$ext_name"] ]]; then
            echo "Expected klipper kinematics extension not registered: $ext_name"
			echo "Registering klipper kinematics extension $ext_name..."
			EXT_PATH="${kinematics_extensions[$ext_name]}"
			if execute_with_logging "verify_registered_extensions" "KINEMATICS_EXT_REGISTER_FAILED" ratos extensions register klipper -k "$ext_name" "$EXT_PATH"; then
				log_info "Klipper kinematics extension $ext_name registered successfully" "verify_registered_extensions"
			else
				log_error "Failed to register Klipper kinematics extension $ext_name" "verify_registered_extensions" "KINEMATICS_EXT_REGISTER_FAILED"
				return 1
			fi
		else
			echo "Klipper kinematics extension $ext_name is properly registered."
			log_debug "Klipper kinematics extension $ext_name already registered" "verify_registered_extensions"
		fi
    done

    log_info "Extension verification process completed successfully" "verify_registered_extensions"
}

