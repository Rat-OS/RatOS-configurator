#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# shellcheck source=./src/scripts/common.sh
source "$SCRIPT_DIR/common.sh"

# Source the logging library
# shellcheck source=../../configuration/scripts/ratos-logging.sh
source "$BASE_DIR/configuration/scripts/ratos-logging.sh"

# Set up error trapping and logging for this script
setup_error_trap "ratos-configurator-update"
log_script_start "ratos-configurator-update.sh" "1.0.0"

verify_ready()
{
    log_info "Verifying script execution requirements" "verify_ready"
    if [ ! "$EUID" -eq 0 ]; then
        echo "This script must run as root"
        log_error "Script must run as root but was executed by non-root user" "verify_ready" "ROOT_REQUIRED"
        exit 1
    fi
    log_info "Script execution requirements verified" "verify_ready"
}

maybe_truncate_log()
{
    log_info "Checking for network credentials in log file" "maybe_truncate_log"
    LOG_FILE="/var/log/ratos-configurator.log"
    if grep -q "    'network=" $LOG_FILE; then
        report_status "Found network credentials in log, truncating ..."
        if execute_with_logging "maybe_truncate_log" "LOG_TRUNCATE_FAILED" truncate -s 0 "$LOG_FILE"; then
            report_status "Log truncated. If you've posted a debug-zip publically, please change your wifi password."
            log_warn "Log file truncated due to network credentials exposure" "maybe_truncate_log"
        else
            log_error "Failed to truncate log file" "maybe_truncate_log" "LOG_TRUNCATE_FAILED"
            return 1
        fi
    else
        log_info "No network credentials found in log file" "maybe_truncate_log"
    fi
}

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

log_info "Starting RatOS configurator update process" "main"

# Run update functions with error handling
set +e

verify_ready || exit_code=1
verify_users || exit_code=1
maybe_truncate_log || exit_code=1
ensure_pnpm_installation || exit_code=1
ensure_service_permission || exit_code=1
ensure_sudo_command_whitelisting || exit_code=1
install_hooks || exit_code=1
update_package_managers || exit_code=1
pnpm_install || exit_code=1
install_cli || exit_code=1
install_udev_rule || exit_code=1
patch_log_rotation || exit_code=1
symlink_configuration || exit_code=1
install_or_update_service_file || exit_code=1

# Re-enable exit on error for cleanup
set -e

# Create log summary and complete
create_log_summary "ratos-configurator-update.sh" "$START_TIME"
log_script_complete "ratos-configurator-update.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "RatOS configurator update completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "UPDATE_FAILED"
    echo "RatOS configurator update completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "RatOS configurator update completed successfully" "main"
    echo "RatOS configurator update completed successfully"
fi

exit "$exit_code"