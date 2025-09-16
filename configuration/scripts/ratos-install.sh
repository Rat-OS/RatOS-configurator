#!/usr/bin/env bash
# This script installs additional dependencies for RatOS.

PKGLIST="python3-numpy python3-matplotlib curl git"

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
CFG_DIR=$(realpath "$SCRIPT_DIR/..")

# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh

# Set up logging for this script
log_script_start "ratos-install.sh" "1.0.0"

install_dependencies()
{
    log_info "Starting dependency installation" "install_dependencies"
    report_status "Installing RatOS dependencies"
    # shellcheck disable=SC2086
    if execute_with_logging "install_dependencies" "APT_UPDATE_FAILED" sudo apt-get update; then
        if execute_with_logging "install_dependencies" "PACKAGE_INSTALL_FAILED" sudo apt-get install -y $PKGLIST; then
            log_info "RatOS dependencies installed successfully" "install_dependencies"
        else
            log_error "Failed to install RatOS dependencies" "install_dependencies" "PACKAGE_INSTALL_FAILED"
            return 1
        fi
    else
        log_error "Failed to update package lists" "install_dependencies" "APT_UPDATE_FAILED"
        return 1
    fi
}

install_printer_config()
{
    log_info "Starting printer configuration installation" "install_printer_config"
    report_status "Copying printer configuration"
    PRINTER_CFG="${RATOS_PRINTER_DATA_DIR}/config/printer.cfg"
    if execute_with_logging "install_printer_config" "PRINTER_CONFIG_COPY_FAILED" tail -n +2 "$CFG_DIR"/templates/initial-printer.template.cfg > "$PRINTER_CFG"; then
        log_info "Printer configuration copied successfully" "install_printer_config"
    else
        log_error "Failed to copy printer configuration" "install_printer_config" "PRINTER_CONFIG_COPY_FAILED"
        return 1
    fi
}

install_udev_rules()
{
    log_info "Starting udev rules installation" "install_udev_rules"
    report_status "Installing udev rules"
    if execute_with_logging "install_udev_rules" "UDEV_RULES_INSTALL_FAILED" sudo ln -s "$CFG_DIR"/boards/*/*.rules /etc/udev/rules.d/; then
        log_info "Udev rules installed successfully" "install_udev_rules"
    else
        log_error "Failed to install udev rules" "install_udev_rules" "UDEV_RULES_INSTALL_FAILED"
        return 1
    fi
}

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

# Force script to exit if an error occurs
set -xe

# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

log_info "Starting RatOS installation process" "main"

# Run installation functions with error handling
set +e

verify_ready || exit_code=1
install_printer_config || exit_code=1
install_udev_rules || exit_code=1
install_beacon || exit_code=1
install_hooks || exit_code=1
install_dependencies || exit_code=1
ensure_sudo_command_whitelisting || exit_code=1
verify_registered_extensions || exit_code=1

# Re-enable exit on error for cleanup
set -e

# Create log summary and complete
create_log_summary "ratos-install.sh" "$START_TIME"
log_script_complete "ratos-install.sh" "$exit_code"

if [[ $exit_code -ne 0 ]]; then
    log_error "RatOS installation completed with errors. Check the log file: $RATOS_LOG_FILE" "main" "INSTALL_FAILED"
    echo "RatOS installation completed with errors. Check the log file: $RATOS_LOG_FILE"
else
    log_info "RatOS installation completed successfully" "main"
    echo "RatOS installation completed successfully"
fi

exit "$exit_code"
