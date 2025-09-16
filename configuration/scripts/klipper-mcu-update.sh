#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Source the logging library
# shellcheck source=./configuration/scripts/ratos-logging.sh
source "$SCRIPT_DIR/ratos-logging.sh"

# Set up error trapping and logging for this script
setup_error_trap "klipper-mcu-update"
log_script_start "klipper-mcu-update.sh" "1.0.0"

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

if [ "$EUID" -ne 0 ]; then
    echo "ERROR: This script should be run as root"
    log_error "Script must run as root but was executed by non-root user" "main" "ROOT_REQUIRED"
    exit 1
fi

log_info "Starting Klipper MCU update process" "main"

echo "##### Flashing connected MCU's"
if execute_with_logging "klipper_mcu_update" "MCU_FLASH_FAILED" ratos flash; then
    log_info "MCU flashing completed successfully" "main"
else
    log_error "MCU flashing failed" "main" "MCU_FLASH_FAILED"
    exit_code=1
fi

echo "##### Symlinking registered extensions"
if execute_with_logging "klipper_mcu_update" "EXTENSION_SYMLINK_FAILED" ratos extensions symlink klipper; then
    log_info "Extension symlinking completed successfully" "main"
else
    log_error "Extension symlinking failed" "main" "EXTENSION_SYMLINK_FAILED"
    exit_code=1
fi

# Create log summary and complete
create_log_summary "klipper-mcu-update.sh" "$START_TIME"
log_script_complete "klipper-mcu-update.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "Klipper MCU update completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "UPDATE_FAILED"
    echo "Klipper MCU update completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "Klipper MCU update completed successfully" "main"
    echo "Klipper MCU update completed successfully"
fi

exit "$exit_code"