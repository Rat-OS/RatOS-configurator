#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Source the logging library first
# shellcheck source=./configuration/scripts/ratos-logging.sh
source "$SCRIPT_DIR"/ratos-logging.sh

# Set up error trapping and logging for this script
setup_error_trap "beacon-update"
log_script_start "beacon-update.sh" "1.0.0"

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

if [ "$EUID" -ne 0 ]; then
    echo "ERROR: Please run as root"
    log_error "Script must run as root but was executed by non-root user" "main" "ROOT_REQUIRED"
    exit 1
fi

log_info "Starting Beacon firmware update process" "main"

echo "##### Running beacon firmware update script"
# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh

if update_beacon_fw; then
    log_info "Beacon firmware update completed successfully" "main"
else
    log_error "Beacon firmware update failed" "main" "BEACON_UPDATE_FAILED"
    exit_code=1
fi

# Create log summary and complete
create_log_summary "beacon-update.sh" "$START_TIME"
log_script_complete "beacon-update.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "Beacon update completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "UPDATE_FAILED"
    echo "Beacon update completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "Beacon update completed successfully" "main"
    echo "Beacon update completed successfully"
fi

exit "$exit_code"