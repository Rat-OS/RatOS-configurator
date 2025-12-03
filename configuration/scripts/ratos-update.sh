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

# Main execution with error handling
main() {
	local exit_code=0

	log_info "Starting RatOS update process" "main"

	# Run update functions with error handling
	# Use set +e to prevent immediate exit on function failure
	set +e

	update_symlinks || exit_code=1
	ensure_sudo_command_whitelisting || exit_code=1
	ensure_service_permission || exit_code=1
	ensure_node_18 || exit_code=1
	fix_klippy_env_ownership || exit_code=1
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
