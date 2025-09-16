#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# shellcheck source=src/scripts/common.sh
source "$SCRIPT_DIR"/common.sh

# Source the logging library
# shellcheck source=../../configuration/scripts/ratos-logging.sh
source "$BASE_DIR/configuration/scripts/ratos-logging.sh"

# Set up error trapping and logging for this script
setup_error_trap "ratos-configurator-setup"
log_script_start "ratos-configurator-setup.sh" "1.0.0"

verify_ready()
{
    log_info "Verifying script execution requirements" "verify_ready"
    if [ "$EUID" -eq 0 ]; then
        echo "This script must not run as root"
        log_error "Script attempted to run as root" "verify_ready" "ROOT_EXECUTION_DENIED"
        exit 1
    fi
    log_info "Script execution requirements verified" "verify_ready"
}

disable_telemetry()
{
    log_info "Disabling Next.js telemetry" "disable_telemetry"
    if execute_with_logging "disable_telemetry" "TELEMETRY_DISABLE_FAILED" npx --yes -- next@13 telemetry disable; then
        log_info "Next.js telemetry disabled successfully" "disable_telemetry"
    else
        log_error "Failed to disable Next.js telemetry" "disable_telemetry" "TELEMETRY_DISABLE_FAILED"
        return 1
    fi
}

# Force script to exit if an error occurs
set -e

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

log_info "Starting RatOS configurator setup process" "main"

# Run setup functions with error handling
set +e

verify_ready || exit_code=1
verify_users || exit_code=1
install_hooks || exit_code=1
ensure_sudo_command_whitelisting || exit_code=1
ensure_pnpm_installation || exit_code=1
install_logrotation || exit_code=1
pnpm_install || exit_code=1
disable_telemetry || exit_code=1
install_udev_rule || exit_code=1
install_cli || exit_code=1
symlink_configuration || exit_code=1
install_or_update_service_file || exit_code=1

# Re-enable exit on error for cleanup
set -e

# Create log summary and complete
create_log_summary "ratos-configurator-setup.sh" "$START_TIME"
log_script_complete "ratos-configurator-setup.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "RatOS configurator setup completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "SETUP_FAILED"
    echo "RatOS configurator setup completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "RatOS configurator setup completed successfully" "main"
    echo "RatOS configurator setup completed successfully"
fi

exit "$exit_code"