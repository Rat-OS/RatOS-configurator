#!/usr/bin/env bash

# RatOS Logging Configuration Management
# Provides functions to manage logging configuration dynamically

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Default configuration file location
RATOS_LOGGING_CONFIG_FILE="${RATOS_PRINTER_DATA_DIR:-"~"}/ratos-logging.conf"
RATOS_LOGGING_CONFIG_DIR="$(dirname "$RATOS_LOGGING_CONFIG_FILE")"
RATOS_LOG_FILE=${RATOS_LOG_FILE:-"${RATOS_PRINTER_DATA_DIR:-"~"}/logs/ratos-configurator.log"}

# Configuration defaults
declare -gA LOGGING_DEFAULTS=(
    ["log_level"]="info"
    ["log_file"]=$RATOS_LOG_FILE
    ["max_size"]="0"  # 0 = disabled (use system logrotate)
    ["backup_count"]="0"
    ["console_output"]="true"
    ["json_format"]="true"
    ["include_hostname"]="true"
    ["include_pid"]="true"
    ["performance_monitoring"]="false"
    ["health_checks"]="true"
)

# Function to create default configuration file
create_default_config() {
    local config_file="$1"
    
    echo "Creating default logging configuration at $config_file"
    
    # Ensure directory exists
    if ! mkdir -p "$RATOS_LOGGING_CONFIG_DIR" 2>/dev/null; then
        echo "ERROR: Cannot create configuration directory $RATOS_LOGGING_CONFIG_DIR" >&2
        return 1
    fi
    
    # Create configuration file
    cat > "$config_file" << 'EOF'
# RatOS Logging Configuration
# This file controls the behavior of the RatOS logging system

# Log level: trace, debug, info, warn, error, fatal
log_level=info

# Log file location
log_file=$RATOS_LOG_FILE

# Log rotation settings (0 = disabled, use system logrotate)
max_size=0
backup_count=0

# Output settings
console_output=true
json_format=true
include_hostname=true
include_pid=true

# Advanced features
performance_monitoring=false
health_checks=true

EOF
    
    # Set appropriate permissions
    chmod 644 "$config_file" 2>/dev/null || true
    
    echo "Default logging configuration created successfully"
    return 0
}

# Function to load configuration from file
load_logging_config() {
    local config_file="${1:-$RATOS_LOGGING_CONFIG_FILE}"
    
    # Create default config if it doesn't exist
    if [[ ! -f "$config_file" ]]; then
        if ! create_default_config "$config_file"; then
            echo "WARNING: Could not create default config, using built-in defaults" >&2
            return 1
        fi
    fi
    
    # Source the configuration file
    if [[ -r "$config_file" ]]; then
        # shellcheck source=/dev/null
        source "$config_file"
        echo "Loaded logging configuration from $config_file"
        return 0
    else
        echo "WARNING: Cannot read configuration file $config_file, using defaults" >&2
        return 1
    fi
}

# Function to validate configuration values
validate_config() {
    local errors=0
    
    # Validate log level
    case "${log_level:-}" in
        trace|debug|info|warn|error|fatal)
            ;;
        *)
            echo "ERROR: Invalid log_level '$log_level'. Must be one of: trace, debug, info, warn, error, fatal" >&2
            ((errors++))
            ;;
    esac
    
    # Validate log file path
    if [[ -n "${log_file:-}" ]]; then
        local log_dir
        log_dir=$(dirname "$log_file")
        if [[ ! -d "$log_dir" ]] && ! mkdir -p "$log_dir" 2>/dev/null; then
            echo "ERROR: Cannot create log directory $log_dir" >&2
            ((errors++))
        fi
    else
        echo "ERROR: log_file must be specified" >&2
        ((errors++))
    fi
    
    # Validate numeric values
    for var in max_size backup_count; do
        local value="${!var:-}"
        if [[ -n "$value" ]] && ! [[ "$value" =~ ^[0-9]+$ ]]; then
            echo "ERROR: $var must be a non-negative integer, got '$value'" >&2
            ((errors++))
        fi
    done
    
    # Validate boolean values
    for var in console_output json_format include_hostname include_pid performance_monitoring health_checks; do
        local value="${!var:-}"
        if [[ -n "$value" ]] && [[ "$value" != "true" && "$value" != "false" ]]; then
            echo "ERROR: $var must be 'true' or 'false', got '$value'" >&2
            ((errors++))
        fi
    done
    
    return $errors
}

# Function to apply configuration to environment variables
apply_config() {
    # Apply configuration values to environment variables used by ratos-logging.sh
    export RATOS_LOG_LEVEL="${RATOS_LOG_LEVEL:-${log_level:-${LOGGING_DEFAULTS[log_level]}}}"
    export RATOS_LOG_FILE="${RATOS_LOG_FILE:-${log_file:-${LOGGING_DEFAULTS[log_file]}}}"
    export RATOS_LOG_MAX_SIZE="${RATOS_LOG_MAX_SIZE:-${max_size:-${LOGGING_DEFAULTS[max_size]}}}"
    export RATOS_LOG_BACKUP_COUNT="${RATOS_LOG_BACKUP_COUNT:-${backup_count:-${LOGGING_DEFAULTS[backup_count]}}}"
    
    # Apply advanced settings
    export RATOS_CONSOLE_OUTPUT="${RATOS_CONSOLE_OUTPUT:-${console_output:-${LOGGING_DEFAULTS[console_output]}}}"
    export RATOS_JSON_FORMAT="${RATOS_JSON_FORMAT:-${json_format:-${LOGGING_DEFAULTS[json_format]}}}"
    export RATOS_INCLUDE_HOSTNAME="${RATOS_INCLUDE_HOSTNAME:-${include_hostname:-${LOGGING_DEFAULTS[include_hostname]}}}"
    export RATOS_INCLUDE_PID="${RATOS_INCLUDE_PID:-${include_pid:-${LOGGING_DEFAULTS[include_pid]}}}"
    export RATOS_PERFORMANCE_MONITORING="${RATOS_PERFORMANCE_MONITORING:-${performance_monitoring:-${LOGGING_DEFAULTS[performance_monitoring]}}}"
    export RATOS_HEALTH_CHECKS="${RATOS_HEALTH_CHECKS:-${health_checks:-${LOGGING_DEFAULTS[health_checks]}}}"
    
    echo "Applied logging configuration to environment"
}

# Function to show current configuration
show_config() {
    echo "Current RatOS Logging Configuration:"
    echo "===================================="
    echo "Configuration file: ${RATOS_LOGGING_CONFIG_FILE}"
    echo "Log level: ${RATOS_LOG_LEVEL:-${log_level:-${LOGGING_DEFAULTS[log_level]}}}"
    echo "Log file: ${RATOS_LOG_FILE:-${log_file:-${LOGGING_DEFAULTS[log_file]}}}"
    echo "Max size: ${RATOS_LOG_MAX_SIZE:-${max_size:-${LOGGING_DEFAULTS[max_size]}}}"
    echo "Backup count: ${RATOS_LOG_BACKUP_COUNT:-${backup_count:-${LOGGING_DEFAULTS[backup_count]}}}"
    echo "Console output: ${RATOS_CONSOLE_OUTPUT:-${console_output:-${LOGGING_DEFAULTS[console_output]}}}"
    echo "JSON format: ${RATOS_JSON_FORMAT:-${json_format:-${LOGGING_DEFAULTS[json_format]}}}"
    echo "Include hostname: ${RATOS_INCLUDE_HOSTNAME:-${include_hostname:-${LOGGING_DEFAULTS[include_hostname]}}}"
    echo "Include PID: ${RATOS_INCLUDE_PID:-${include_pid:-${LOGGING_DEFAULTS[include_pid]}}}"
    echo "Performance monitoring: ${RATOS_PERFORMANCE_MONITORING:-${performance_monitoring:-${LOGGING_DEFAULTS[performance_monitoring]}}}"
    echo "Health checks: ${RATOS_HEALTH_CHECKS:-${health_checks:-${LOGGING_DEFAULTS[health_checks]}}}"
}

# Function to update a configuration value
update_config() {
    local key="$1"
    local value="$2"
    local config_file="${3:-$RATOS_LOGGING_CONFIG_FILE}"
    
    if [[ -z "$key" || -z "$value" ]]; then
        echo "ERROR: update_config requires key and value parameters" >&2
        return 1
    fi
    
    # Ensure config file exists
    if [[ ! -f "$config_file" ]]; then
        create_default_config "$config_file"
    fi
    
    # Update the configuration file
    if grep -q "^${key}=" "$config_file"; then
        # Update existing value
        sed -i "s/^${key}=.*/${key}=${value}/" "$config_file"
    else
        # Add new value
        echo "${key}=${value}" >> "$config_file"
    fi
    
    echo "Updated $key=$value in $config_file"
    
    # Reload configuration
    load_logging_config "$config_file"
    apply_config
}

# Function to initialize logging configuration
init_logging_config() {
    local config_file="${1:-$RATOS_LOGGING_CONFIG_FILE}"
    
    echo "Initializing RatOS logging configuration..."
    
    # Load configuration
    if load_logging_config "$config_file"; then
        # Validate configuration
        if validate_config; then
            # Apply configuration
            apply_config
            echo "Logging configuration initialized successfully"
            return 0
        else
            echo "ERROR: Configuration validation failed" >&2
            return 1
        fi
    else
        echo "WARNING: Using default configuration" >&2
        # Apply defaults
        for key in "${!LOGGING_DEFAULTS[@]}"; do
            declare -g "$key=${LOGGING_DEFAULTS[$key]}"
        done
        apply_config
        return 0
    fi
}

# Export functions for use in other scripts
export -f create_default_config load_logging_config validate_config
export -f apply_config show_config update_config init_logging_config
