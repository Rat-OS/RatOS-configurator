#!/usr/bin/env bash
if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit 1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Source logging library first
# shellcheck source=configuration/scripts/ratos-logging.sh
source "$SCRIPT_DIR"/ratos-logging.sh

# Set up error trapping and logging
setup_error_trap "ratos-update"
START_TIME=$(get_timestamp)

# Log script start
log_script_start "ratos-update.sh" "2.1.0"

# shellcheck source=configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh
# shellcheck source=configuration/scripts/moonraker-ensure-policykit-rules.sh
source "$SCRIPT_DIR"/moonraker-ensure-policykit-rules.sh

ensure_system_packages()
{
	log_info "Ensuring system packages from PKGLIST are installed" "ensure_system_packages"
	report_status "Ensuring required system packages are installed"

	if [ -z "${PKGLIST:-}" ]; then
		log_error "PKGLIST is not defined; expected from ratos-common.sh" "ensure_system_packages" "PKGLIST_MISSING"
		echo "PKGLIST is not defined; expected from ratos-common.sh"
		return 1
	fi

	# Build list of missing packages
	local -a pkgs missing
	local pkg
	# shellcheck disable=SC2206
	pkgs=( $PKGLIST )
	missing=()
	for pkg in "${pkgs[@]}"; do
		if ! dpkg -s "$pkg" >/dev/null 2>&1; then
			missing+=("$pkg")
		fi
	done

	if [ ${#missing[@]} -eq 0 ]; then
		log_info "All required system packages are already installed" "ensure_system_packages"
		echo "All required system packages are already installed"
		return 0
	fi

	log_info "Missing packages: ${missing[*]}" "ensure_system_packages"
	echo "Installing missing packages: ${missing[*]}"

	if ! execute_with_logging "ensure_system_packages" "APT_UPDATE_FAILED" apt-get update; then
		log_error "apt-get update failed" "ensure_system_packages" "APT_UPDATE_FAILED"
		return 1
	fi

	# shellcheck disable=SC2068
	if ! execute_with_logging "ensure_system_packages" "APT_INSTALL_FAILED" apt-get install -y ${missing[@]}; then
		log_error "Failed to install one or more system packages" "ensure_system_packages" "APT_INSTALL_FAILED"
		return 1
	fi

	log_info "System packages installed successfully" "ensure_system_packages"
	echo "System packages installed successfully"
}

ensure_pip_requirements()
{
	log_info "Ensuring Python pip requirements are installed in KLIPPER_ENV" "ensure_pip_requirements"
	report_status "Installing Python requirements into Klipper env"

	local req_file py_bin pip_bin
	req_file="${SCRIPT_DIR}/../klippy/requirements.txt"
	py_bin="${KLIPPER_ENV}/bin/python"
	pip_bin="${KLIPPER_ENV}/bin/pip"

	if [ -z "${KLIPPER_ENV:-}" ] || [ ! -d "$KLIPPER_ENV" ]; then
		log_error "Klipper environment not found or KLIPPER_ENV unset: $KLIPPER_ENV" "ensure_pip_requirements" "PYTHON_ENV_MISSING"
		echo "Klipper environment not found or KLIPPER_ENV unset: $KLIPPER_ENV"
		return 1
	fi

	if [ ! -x "$pip_bin" ]; then
		if [ -x "$py_bin" ]; then
			pip_bin="$py_bin -m pip"
		else
			log_error "pip not found in Klipper environment: $pip_bin" "ensure_pip_requirements" "PIP_NOT_FOUND"
			echo "pip not found in Klipper environment: $pip_bin"
			return 1
		fi
	fi

	if [ ! -f "$req_file" ]; then
		log_error "Requirements file not found: $req_file" "ensure_pip_requirements" "PIP_REQUIREMENTS_FILE_MISSING"
		echo "Requirements file not found: $req_file"
		return 1
	fi

	# Log currently installed versions of packages in requirements.txt
	log_info "Checking installed versions of required packages..." "ensure_pip_requirements"
	echo "Checking installed versions of required packages..."
	local pkg_spec pkg_name version_info
	while IFS= read -r line || [ -n "$line" ]; do
		# Skip empty lines and comments
		[[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
		
		pkg_spec=$(echo "$line" | xargs)
		# Extract package name (before ==, >=, <=, <, >, etc.)
		pkg_name=$(echo "$pkg_spec" | sed -E 's/([a-zA-Z0-9_-]+).*/\1/')
		
		version_info=$(run_as_user "${RATOS_USERNAME}" "$py_bin" -m pip show "$pkg_name" 2>/dev/null | grep "^Version:" || echo "missing")
		if [[ "$version_info" == "missing" ]]; then
			log_info "  $pkg_name: missing" "ensure_pip_requirements"
			echo "  $pkg_name: missing"
		else
			version=$(echo "$version_info" | awk '{print $2}')
			log_info "  $pkg_name: $version" "ensure_pip_requirements"
			echo "  $pkg_name: $version"
		fi
	done < "$req_file"

	# Install requirements with verbose output to capture what gets installed
	log_info "Installing pip requirements from $req_file..." "ensure_pip_requirements"
	echo "Installing pip requirements from $req_file..."
	
	local install_output install_result
	install_output=$(run_as_user "${RATOS_USERNAME}" "$py_bin" -m pip install -r "$req_file" 2>&1)
	install_result=$?
	
	if [[ $install_result -ne 0 ]]; then
		log_error "Failed to install Python requirements into Klipper environment" "ensure_pip_requirements" "PIP_INSTALL_FAILED"
		log_error "pip output: $install_output" "ensure_pip_requirements" "PIP_INSTALL_FAILED"
		echo "Failed to install Python requirements into Klipper environment"
		echo "$install_output"
		return 1
	fi

	# Log installation outcomes
	log_info "pip install output:" "ensure_pip_requirements"
	echo "$install_output"
	
	# Parse and log what was installed/upgraded
	if echo "$install_output" | grep -q "Successfully installed"; then
		local installed_packages
		installed_packages=$(echo "$install_output" | grep "Successfully installed" | sed 's/Successfully installed //')
		log_info "Installed/upgraded packages: $installed_packages" "ensure_pip_requirements"
		echo "Installed/upgraded packages: $installed_packages"
	elif echo "$install_output" | grep -q "Requirement already satisfied"; then
		log_info "All requirements already satisfied, no packages installed" "ensure_pip_requirements"
		echo "All requirements already satisfied"
	fi

	# Log final versions after installation
	log_info "Verifying final package versions..." "ensure_pip_requirements"
	echo "Verifying final package versions..."
	while IFS= read -r line || [ -n "$line" ]; do
		[[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
		
		pkg_spec=$(echo "$line" | xargs)
		pkg_name=$(echo "$pkg_spec" | sed -E 's/([a-zA-Z0-9_-]+).*/\1/')
		
		version_info=$(run_as_user "${RATOS_USERNAME}" "$py_bin" -m pip show "$pkg_name" 2>/dev/null | grep "^Version:" || echo "ERROR: missing")
		if [[ "$version_info" == "ERROR: missing" ]]; then
			log_error "  $pkg_name: still missing after install!" "ensure_pip_requirements" "PACKAGE_MISSING"
			echo "  $pkg_name: ERROR - still missing!"
		else
			version=$(echo "$version_info" | awk '{print $2}')
			log_info "  $pkg_name: $version" "ensure_pip_requirements"
			echo "  $pkg_name: $version"
		fi
	done < "$req_file"

	log_info "Python requirements installed successfully" "ensure_pip_requirements"
	echo "Python requirements installed successfully"
}

update_symlinks()
{
  log_info "Updating RatOS device symlinks..." "update_symlinks"
  report_status "Updating RatOS device symlinks..."

  # Get list of board rule files
  board_rules=("${RATOS_PRINTER_DATA_DIR}"/config/RatOS/boards/*/*.rules)

  local updated_count=0
  local skipped_count=0

  # Check each board rule file
  for source in "${board_rules[@]}"; do
    if [ ! -f "$source" ]; then
      log_debug "Skipping non-existent rule file: $source" "update_symlinks"
      continue
    fi

    filename=$(basename "$source")
    target="/etc/udev/rules.d/98-${filename}"

    # Check if symlink exists and points to correct source
    if [ ! -L "$target" ] || [ ! "$(readlink "$target")" = "$source" ]; then
      if execute_with_logging "update_symlinks" "SYMLINK_REMOVE_FAILED" rm -f "$target"; then
        if execute_with_logging "update_symlinks" "SYMLINK_CREATE_FAILED" ln -s "$source" "$target"; then
          log_info "Updated symlink for ${filename}" "update_symlinks"
          echo "Updated symlink for ${filename}"
          ((updated_count++))
        else
          log_error "Failed to create symlink for ${filename}" "update_symlinks" "SYMLINK_CREATE_FAILED"
          return 1
        fi
      else
        log_error "Failed to remove old symlink for ${filename}" "update_symlinks" "SYMLINK_REMOVE_FAILED"
        return 1
      fi
    else
      log_debug "Symlink for ${filename} already correct" "update_symlinks"
      echo "Symlink for ${filename} already correct"
      ((skipped_count++))
    fi
  done

  log_info "Symlink update complete: $updated_count updated, $skipped_count skipped" "update_symlinks"
  echo "RatOS device symlinks are up to date!"
}

ensure_node_18()
{
	log_info "Ensuring Node 18 is installed" "ensure_node_18"
	report_status "Ensuring Node 18 is installed"

	if node -v | grep "^v18" > /dev/null; then
		log_info "Node 18 already installed" "ensure_node_18"
		echo "Node 18 already installed"
	else
		log_info "Installing Node 18" "ensure_node_18"
		echo "Installing Node 18"

		if execute_with_logging "ensure_node_18" "NODE_REPO_UPDATE_FAILED" sed -i 's/node_16\.x/node_18\.x/g' /etc/apt/sources.list.d/nodesource.list; then
			if execute_with_logging "ensure_node_18" "APT_UPDATE_FAILED" apt-get update; then
				if execute_with_logging "ensure_node_18" "NODE_INSTALL_FAILED" apt-get install -y nodejs; then
					log_info "Node 18 installed successfully" "ensure_node_18"
					echo "Node 18 installed!"
				else
					log_error "Failed to install Node 18" "ensure_node_18" "NODE_INSTALL_FAILED"
					return 1
				fi
			else
				log_error "Failed to update package lists" "ensure_node_18" "APT_UPDATE_FAILED"
				return 1
			fi
		else
			log_error "Failed to update Node.js repository configuration" "ensure_node_18" "NODE_REPO_UPDATE_FAILED"
			return 1
		fi
	fi
}

fix_klippy_env_ownership()
{
	log_info "Ensuring klipper environment ownership" "fix_klippy_env_ownership"
	report_status "Ensuring klipper environment ownership"

	if [ -n "$(find "${KLIPPER_ENV}" \! -user "${RATOS_USERNAME}" -o \! -group "${RATOS_USERGROUP}" -quit)" ]; then
		if execute_with_logging "fix_klippy_env_ownership" "OWNERSHIP_CHANGE_FAILED" chown -R "${RATOS_USERNAME}:${RATOS_USERGROUP}" "${KLIPPER_ENV}"; then
			log_info "Klipper environment ownership has been set to ${RATOS_USERNAME}:${RATOS_USERGROUP}" "fix_klippy_env_ownership"
			echo "Klipper environment ownership has been set to ${RATOS_USERNAME}:${RATOS_USERGROUP}."
		else
			log_error "Failed to change klipper environment ownership" "fix_klippy_env_ownership" "OWNERSHIP_CHANGE_FAILED"
			return 1
		fi
	else
		log_info "Klipper environment ownership already set correctly" "fix_klippy_env_ownership"
		echo "Klipper environment ownership already set correctly."
	fi
}

ensure_raspi_config_cpu_governor_default()
{
	log_info "Ensuring raspi-config CPU governor default configuration" "ensure_raspi_config_cpu_governor_default"
	report_status "Ensuring raspi-config CPU governor default configuration"

	local config_file="/etc/default/cpu_governor"
	local desired_governor="performance"

	# Check if config file exists
	if [ ! -f "$config_file" ]; then
		log_info "Config file $config_file does not exist, creating with default governor: $desired_governor" "ensure_raspi_config_cpu_governor_default"
		echo "Creating $config_file with default governor: $desired_governor"
		
		if echo "CPU_DEFAULT_GOVERNOR=\"$desired_governor\"" > "$config_file"; then
			log_info "Created $config_file with CPU_DEFAULT_GOVERNOR=\"$desired_governor\"" "ensure_raspi_config_cpu_governor_default"
			echo "raspi-config CPU governor default configuration created successfully"
			return 0
		else
			log_error "Failed to create $config_file" "ensure_raspi_config_cpu_governor_default" "CONFIG_CREATE_FAILED"
			echo "Failed to create raspi-config CPU governor configuration file"
			return 1
		fi
	fi

	# File exists, check if CPU_DEFAULT_GOVERNOR is defined
	log_info "Config file $config_file exists, checking CPU_DEFAULT_GOVERNOR setting" "ensure_raspi_config_cpu_governor_default"

	# Check for active (uncommented) CPU_DEFAULT_GOVERNOR setting
	if grep -q "^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=" "$config_file"; then
		# Extract the current value
		local current_value
		current_value=$(grep "^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=" "$config_file" | head -n1 | sed 's/^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=[[:space:]]*["'\'']*\([^"'\'']*\)["'\'']*.*$/\1/')
		
		log_info "Found active CPU_DEFAULT_GOVERNOR setting with value: $current_value" "ensure_raspi_config_cpu_governor_default"
		
		if [ "$current_value" = "$desired_governor" ]; then
			log_info "CPU_DEFAULT_GOVERNOR already set to desired value: $desired_governor" "ensure_raspi_config_cpu_governor_default"
			echo "raspi-config CPU governor default already configured correctly: $desired_governor"
			return 0
		else
			log_warn "CPU_DEFAULT_GOVERNOR is set to '$current_value' but expected '$desired_governor'. Manual configuration detected, leaving as-is." "ensure_raspi_config_cpu_governor_default" "GOVERNOR_MISMATCH"
			echo "WARNING: raspi-config CPU governor is set to '$current_value' but RatOS recommends '$desired_governor'"
			return 0
		fi
	fi

	# Check if there's a commented CPU_DEFAULT_GOVERNOR line
	if grep -q "^[[:space:]]*#.*CPU_DEFAULT_GOVERNOR[[:space:]]*=" "$config_file"; then
		log_info "Found commented CPU_DEFAULT_GOVERNOR line, uncommenting and setting to: $desired_governor" "ensure_raspi_config_cpu_governor_default"
		echo "Uncommenting and setting CPU_DEFAULT_GOVERNOR to: $desired_governor"
		
		# Uncomment the first occurrence and set the value
		if sed -i "0,/^[[:space:]]*#.*CPU_DEFAULT_GOVERNOR[[:space:]]*=/s|^[[:space:]]*#.*CPU_DEFAULT_GOVERNOR[[:space:]]*=.*|CPU_DEFAULT_GOVERNOR=\"$desired_governor\"|" "$config_file"; then
			log_info "Successfully uncommented and set CPU_DEFAULT_GOVERNOR=\"$desired_governor\"" "ensure_raspi_config_cpu_governor_default"
			echo "raspi-config CPU governor default configuration updated successfully"
			return 0
		else
			log_error "Failed to uncomment and set CPU_DEFAULT_GOVERNOR" "ensure_raspi_config_cpu_governor_default" "CONFIG_UPDATE_FAILED"
			echo "Failed to update raspi-config CPU governor configuration"
			return 1
		fi
	fi

	# No CPU_DEFAULT_GOVERNOR line found, append new line
	log_info "No CPU_DEFAULT_GOVERNOR line found, appending to config file" "ensure_raspi_config_cpu_governor_default"
	echo "Adding CPU_DEFAULT_GOVERNOR to configuration file"
	
	if echo "CPU_DEFAULT_GOVERNOR=\"$desired_governor\"" >> "$config_file"; then
		log_info "Successfully appended CPU_DEFAULT_GOVERNOR=\"$desired_governor\"" "ensure_raspi_config_cpu_governor_default"
		echo "raspi-config CPU governor default configuration added successfully"
		return 0
	else
		log_error "Failed to append CPU_DEFAULT_GOVERNOR to config file" "ensure_raspi_config_cpu_governor_default" "CONFIG_APPEND_FAILED"
		echo "Failed to add raspi-config CPU governor configuration"
		return 1
	fi
}

ensure_cpufrequtils_cpu_governor_default()
{
	log_info "Ensuring cpufrequtils CPU governor default configuration" "ensure_cpufrequtils_cpu_governor_default"
	report_status "Ensuring cpufrequtils CPU governor default configuration"

	local config_file="/etc/default/cpufrequtils"
	local desired_governor="performance"

	# Check if config file exists
	if [ ! -f "$config_file" ]; then
		log_info "Config file $config_file does not exist, creating with default governor: $desired_governor" "ensure_cpufrequtils_cpu_governor_default"
		echo "Creating $config_file with default governor: $desired_governor"
		
		if echo "GOVERNOR=\"$desired_governor\"" > "$config_file"; then
			log_info "Created $config_file with GOVERNOR=\"$desired_governor\"" "ensure_cpufrequtils_cpu_governor_default"
			echo "cpufrequtils CPU governor default configuration created successfully"
			return 0
		else
			log_error "Failed to create $config_file" "ensure_cpufrequtils_cpu_governor_default" "CONFIG_CREATE_FAILED"
			echo "Failed to create cpufrequtils CPU governor configuration file"
			return 1
		fi
	fi

	# File exists, check if GOVERNOR is defined
	log_info "Config file $config_file exists, checking GOVERNOR setting" "ensure_cpufrequtils_cpu_governor_default"

	# Check for active (uncommented) GOVERNOR setting
	if grep -q "^[[:space:]]*GOVERNOR[[:space:]]*=" "$config_file"; then
		# Extract the current value
		local current_value
		current_value=$(grep "^[[:space:]]*GOVERNOR[[:space:]]*=" "$config_file" | head -n1 | sed 's/^[[:space:]]*GOVERNOR[[:space:]]*=[[:space:]]*["'\'']*\([^"'\'']*\)["'\'']*.*$/\1/')
		
		log_info "Found active GOVERNOR setting with value: $current_value" "ensure_cpufrequtils_cpu_governor_default"
		
		if [ "$current_value" = "$desired_governor" ]; then
			log_info "GOVERNOR already set to desired value: $desired_governor" "ensure_cpufrequtils_cpu_governor_default"
			echo "cpufrequtils CPU governor default already configured correctly: $desired_governor"
			return 0
		else
			log_warn "GOVERNOR is set to '$current_value' but expected '$desired_governor'. Manual configuration detected, leaving as-is." "ensure_cpufrequtils_cpu_governor_default" "GOVERNOR_MISMATCH"
			echo "WARNING: cpufrequtils CPU governor is set to '$current_value' but RatOS recommends '$desired_governor'"
			return 0
		fi
	fi

	# Check if there's a commented GOVERNOR line
	if grep -q "^[[:space:]]*#.*GOVERNOR[[:space:]]*=" "$config_file"; then
		log_info "Found commented GOVERNOR line, uncommenting and setting to: $desired_governor" "ensure_cpufrequtils_cpu_governor_default"
		echo "Uncommenting and setting GOVERNOR to: $desired_governor"
		
		# Uncomment the first occurrence and set the value
		if sed -i "0,/^[[:space:]]*#.*GOVERNOR[[:space:]]*=/s|^[[:space:]]*#.*GOVERNOR[[:space:]]*=.*|GOVERNOR=\"$desired_governor\"|" "$config_file"; then
			log_info "Successfully uncommented and set GOVERNOR=\"$desired_governor\"" "ensure_cpufrequtils_cpu_governor_default"
			echo "cpufrequtils CPU governor default configuration updated successfully"
			return 0
		else
			log_error "Failed to uncomment and set GOVERNOR" "ensure_cpufrequtils_cpu_governor_default" "CONFIG_UPDATE_FAILED"
			echo "Failed to update cpufrequtils CPU governor configuration"
			return 1
		fi
	fi

	# No GOVERNOR line found, append new line
	log_info "No GOVERNOR line found, appending to config file" "ensure_cpufrequtils_cpu_governor_default"
	echo "Adding GOVERNOR to configuration file"
	
	if echo "GOVERNOR=\"$desired_governor\"" >> "$config_file"; then
		log_info "Successfully appended GOVERNOR=\"$desired_governor\"" "ensure_cpufrequtils_cpu_governor_default"
		echo "cpufrequtils CPU governor default configuration added successfully"
		return 0
	else
		log_error "Failed to append GOVERNOR to config file" "ensure_cpufrequtils_cpu_governor_default" "CONFIG_APPEND_FAILED"
		echo "Failed to add cpufrequtils CPU governor configuration"
		return 1
	fi
}

ensure_cpu_governor_active()
{
	log_info "Ensuring CPU governor is actively set" "ensure_cpu_governor_active"
	report_status "Ensuring CPU governor is actively set"

	local config_file="/etc/default/cpu_governor"
	local desired_governor="performance"

	# Determine the desired governor from config file if it exists
	if [ -f "$config_file" ]; then
		if grep -q "^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=" "$config_file"; then
			desired_governor=$(grep "^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=" "$config_file" | head -n1 | sed 's/^[[:space:]]*CPU_DEFAULT_GOVERNOR[[:space:]]*=[[:space:]]*["'\'']*\([^"'\'']*\)["'\'']*.*$/\1/')
			log_info "Using CPU governor from config: $desired_governor" "ensure_cpu_governor_active"
		fi
	fi

	# Check if CPU frequency scaling is available
	if [ ! -d "/sys/devices/system/cpu/cpu0/cpufreq" ]; then
		log_warn "CPU frequency scaling not available on this system, skipping governor check" "ensure_cpu_governor_active" "CPUFREQ_NOT_AVAILABLE"
		echo "CPU frequency scaling not available on this system"
		return 0
	fi

	# Check current governor settings
	local cpu_governors
	cpu_governors=$(cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor 2>/dev/null | sort -u)
	
	if [ -z "$cpu_governors" ]; then
		log_error "Failed to read CPU governor settings" "ensure_cpu_governor_active" "GOVERNOR_READ_FAILED"
		echo "Failed to read CPU governor settings"
		return 1
	fi

	log_info "Current CPU governor(s): $(echo "$cpu_governors" | tr '\n' ' ')" "ensure_cpu_governor_active"

	# Check if all CPUs are already set to desired governor
	local all_match=true
	for gov in $cpu_governors; do
		if [ "$gov" != "$desired_governor" ]; then
			all_match=false
			break
		fi
	done

	if $all_match && [ "$(echo "$cpu_governors" | wc -l)" -eq 1 ]; then
		log_info "All CPU cores already set to desired governor: $desired_governor" "ensure_cpu_governor_active"
		echo "CPU governor already set correctly: $desired_governor"
		return 0
	fi

	# Set the governor on all CPU cores
	log_info "Setting CPU governor to: $desired_governor" "ensure_cpu_governor_active"
	echo "Setting CPU governor to: $desired_governor"

	if echo "$desired_governor" | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor > /dev/null 2>&1; then
		log_info "Successfully set CPU governor to $desired_governor on all cores" "ensure_cpu_governor_active"
		echo "CPU governor set successfully: $desired_governor"
		
		# Verify the change
		local new_governors
		new_governors=$(cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor 2>/dev/null | sort -u)
		log_info "Verified CPU governor(s) after change: $(echo "$new_governors" | tr '\n' ' ')" "ensure_cpu_governor_active"
		return 0
	else
		log_error "Failed to set CPU governor to $desired_governor" "ensure_cpu_governor_active" "GOVERNOR_SET_FAILED"
		echo "Failed to set CPU governor"
		return 1
	fi
}

symlink_extensions()
{
	log_info "Symlinking klippy extensions" "symlink_extensions"
	report_status "Symlinking klippy extensions"

	if execute_with_logging "symlink_extensions" "EXTENSION_SYMLINK_FAILED" ratos extensions symlink; then
		log_info "Klippy extensions symlinked successfully" "symlink_extensions"
		echo "Klippy extensions symlinked!"
	else
		log_error "Failed to symlink klippy extensions. Is the RatOS configurator running?" "symlink_extensions" "EXTENSION_SYMLINK_FAILED"
		echo "Failed to symlink klippy extensions. Is the RatOS configurator running?"
		return 1
	fi
}


# ensure_klipper_fork_migration() - Ensures Klipper repository is migrated to RatOS fork
#
# This function delegates all repository state validation and migration logic to the
# dedicated klipper-fork-migration.sh script, which provides comprehensive handling of:
# - Official Klipper repositories (migration needed)
# - RatOS fork repositories at correct state (migration not needed)
# - RatOS fork repositories at incorrect state (migration needed)
# - Unsupported repository sources (fatal error)
# - All edge cases including detached HEAD, uncommitted changes, etc.
#
# RETURN CODES:
#   0 - Success: Migration completed successfully or was not needed
#   1+ - Error: Migration failed (specific error codes from migration script)
#
ensure_klipper_fork_migration()
{
	log_info "Ensuring Klipper repository is properly configured..." "ensure_klipper_migration"

	# Delegate all repository validation and migration logic to the dedicated script
	# The migration script handles all scenarios comprehensively:
	# - Repository state validation with 4 distinct scenarios
	# - Graceful skipping when migration is not needed
	# - Comprehensive error handling and edge case management
	# - Consistent logging and error reporting
	"$SCRIPT_DIR"/klipper-fork-migration.sh
	local code=$?
	if [[ $code -ne 0 ]]; then
		log_error "Klipper fork migration failed (exit code $code)!" "ensure_klipper_migration" "KLIPPER_MIGRATION_FAILED"
		return $code
	fi

	log_info "Klipper repository configuration verified successfully!" "ensure_klipper_migration"
	return 0
}

# Main execution with error handling
main() {
	local exit_code=0

	log_info "Starting RatOS update process" "main"

	# Run update functions with error handling
	# Use set +e to prevent immediate exit on function failure
	set +e

	ensure_klipper_fork_migration || exit_code=1
	ensure_system_packages || exit_code=1
	update_symlinks || exit_code=1
	ensure_sudo_command_whitelisting || exit_code=1
	ensure_service_permission || exit_code=1
	ensure_node_18 || exit_code=1
	ensure_raspi_config_cpu_governor_default || exit_code=1
	ensure_cpufrequtils_cpu_governor_default || exit_code=1
	ensure_cpu_governor_active || exit_code=1
	fix_klippy_env_ownership || exit_code=1
	ensure_pip_requirements || exit_code=1
	patch_klipperscreen_service_restarts || exit_code=1
	install_beacon || exit_code=1
	install_hooks || exit_code=1
	remove_old_postprocessor || exit_code=1
	verify_registered_extensions || exit_code=1
	symlink_extensions || exit_code=1
	update_beacon_fw || exit_code=1

	# Re-enable exit on error for cleanup
	set -e

	# Create log summary and complete
	create_log_summary "ratos-update.sh" "$START_TIME"
	log_script_complete "ratos-update.sh" "$exit_code"

	if [[ $exit_code -ne 0 ]]; then
		log_error "RatOS update completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "UPDATE_FAILED"
		echo "RatOS update completed with errors. Check the log file: $RATOS_LOG_FILE"
	else
		log_info "RatOS update completed successfully" "main"
		echo "RatOS update completed successfully"
	fi

	exit "$exit_code"
}

# Run main function
main
