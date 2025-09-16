#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Source the logging library first
# shellcheck source=./configuration/scripts/ratos-logging.sh
source "$SCRIPT_DIR"/ratos-logging.sh

# Set up error trapping and logging for this script
setup_error_trap "moonraker-update"
log_script_start "moonraker-update.sh" "1.0.0"

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

log_info "Starting Moonraker update process" "main"

# shellcheck source=./configuration/scripts/moonraker-ensure-policykit-rules.sh
source "$SCRIPT_DIR"/moonraker-ensure-policykit-rules.sh
if ensure_moonraker_policiykit_rules; then
    log_info "Moonraker PolicyKit rules ensured successfully" "main"
else
    log_error "Failed to ensure Moonraker PolicyKit rules" "main" "POLICYKIT_RULES_FAILED"
    exit_code=1
fi

# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh
if ensure_service_permission; then
    log_info "Service permissions ensured successfully" "main"
else
    log_error "Failed to ensure service permissions" "main" "SERVICE_PERMISSION_FAILED"
    exit_code=1
fi

echo "##### Symlinking registered extensions"
if execute_with_logging "moonraker_update" "EXTENSION_SYMLINK_FAILED" ratos extensions symlink klipper; then
    log_info "Extension symlinking completed successfully" "main"
else
    log_error "Extension symlinking failed" "main" "EXTENSION_SYMLINK_FAILED"
    exit_code=1
fi

# Create log summary and complete
create_log_summary "moonraker-update.sh" "$START_TIME"
log_script_complete "moonraker-update.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "Moonraker update completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "UPDATE_FAILED"
    echo "Moonraker update completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "Moonraker update completed successfully" "main"
    echo "Moonraker update completed successfully"
fi

exit "$exit_code"
