#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
BASE_DIR=$(realpath "$SCRIPT_DIR/../..")

# Source the logging library
# shellcheck source=../../configuration/scripts/ratos-logging.sh
source "$BASE_DIR/configuration/scripts/ratos-logging.sh"

# Set up error trapping and logging for this script
setup_error_trap "change-hostname"
log_script_start "change-hostname.sh" "1.0.0"

# Track script execution
START_TIME=$(get_timestamp)

if [ "$EUID" -ne 0 ]; then
    echo "ERROR: Please run as root"
    log_error "Script must run as root but was executed by non-root user" "main" "ROOT_REQUIRED"
    exit 1
fi

if [ "$#" -ne 1 ]; then
    echo "Missing hostname parameter"
    log_error "Script called without required hostname parameter" "main" "MISSING_PARAMETER"
    exit 1
fi

NEW_HOSTNAME="$1"
log_info "Attempting to change hostname to: $NEW_HOSTNAME" "main"

# Validate hostname format
if [[ ! "$NEW_HOSTNAME" =~ ^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$ ]]; then
    echo "ERROR: Invalid hostname format"
    log_error "Invalid hostname format: $NEW_HOSTNAME" "main" "INVALID_HOSTNAME"
    exit 1
fi

if execute_with_logging "change_hostname" "HOSTNAME_CHANGE_FAILED" hostnamectl set-hostname "$NEW_HOSTNAME"; then
    echo "Hostname has been changed, please reboot your Raspberry Pi for the change to take effect"
    log_info "Hostname changed successfully to: $NEW_HOSTNAME" "main"
    log_info "Reboot required for change to take effect" "main"
else
    echo "An error occurred while attempting to change the hostname"
    log_error "Failed to change hostname to: $NEW_HOSTNAME" "main" "HOSTNAME_CHANGE_FAILED"
    exit 1
fi

# Create log summary and complete
create_log_summary "change-hostname.sh" "$START_TIME"
log_script_complete "change-hostname.sh" "0"
