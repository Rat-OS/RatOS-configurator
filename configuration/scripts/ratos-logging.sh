#!/usr/bin/env bash

# RatOS Structured Logging Library
# Provides JSON-formatted logging compatible with pino for bash scripts

# Load environment
SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
# shellcheck source=configuration/scripts/environment.sh
if [[ -f "$SCRIPT_DIR/environment.sh" ]]; then
    source "$SCRIPT_DIR/environment.sh"
else
    echo "Error: Cannot find environment.sh in $SCRIPT_DIR" >&2
    exit 1
fi

# Load logging configuration management
# shellcheck source=configuration/scripts/ratos-logging-config.sh
if [[ -f "$SCRIPT_DIR/ratos-logging-config.sh" ]]; then
    source "$SCRIPT_DIR/ratos-logging-config.sh"

    # Initialize configuration if not already done
    if [[ -z "${RATOS_CONFIG_INITIALIZED:-}" ]]; then
        init_logging_config
        export RATOS_CONFIG_INITIALIZED=1
    fi
else
    echo "Warning: Cannot find ratos-logging-config.sh, using defaults" >&2

    # Default log configuration (fallback)
    RATOS_LOG_LEVEL=${RATOS_LOG_LEVEL:-"info"}
    RATOS_LOG_FILE=${RATOS_LOG_FILE:-"${LOG_FILE:-/var/log/ratos-configurator.log}"}
    RATOS_LOG_MAX_SIZE=${RATOS_LOG_MAX_SIZE:-0}  # 0 = disabled
    RATOS_LOG_BACKUP_COUNT=${RATOS_LOG_BACKUP_COUNT:-0}
fi

# Convert RATOS_LOG_LEVEL to lowercase for case-insensitive matching
RATOS_LOG_LEVEL=${RATOS_LOG_LEVEL:-"info"}
RATOS_LOG_LEVEL=${RATOS_LOG_LEVEL,,}  # Convert to lowercase

# Ensure log directory exists
mkdir -p "$(dirname "$RATOS_LOG_FILE")"

# Log levels (matching pino levels)
declare -gA LOG_LEVELS=(
    ["trace"]=10
    ["debug"]=20
    ["info"]=30
    ["warn"]=40
    ["error"]=50
    ["fatal"]=60
)

# Validate log level and default to "info" if invalid
if [[ -z "${LOG_LEVELS[$RATOS_LOG_LEVEL]}" ]]; then
    RATOS_LOG_LEVEL="info"
fi

# Current log level numeric value
CURRENT_LOG_LEVEL=${LOG_LEVELS[$RATOS_LOG_LEVEL]}

# Helper function to escape strings for JSON
escape_json() {
    # Handle empty input
    if [[ -z "$1" ]]; then
        printf ''
        return 0
    fi

    # Escape special characters for JSON
    printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g; s/\r/\\r/g; s/\n/\\n/g; s/\f/\\f/g; s/\x08/\\b/g'
}

# Validate log level
validate_log_level() {
    local level="$1"
    if [[ -z "${LOG_LEVELS[$level]:-}" ]]; then
        return 1
    fi
    return 0
}

# Safe file write with error handling
safe_write_log() {
    local log_entry="$1"
    local max_retries=3
    local retry_count=0

    while [[ $retry_count -lt $max_retries ]]; do
        if echo "$log_entry" >> "$RATOS_LOG_FILE" 2>/dev/null; then
            return 0
        fi

        ((retry_count++))

        # Try to create log file if it doesn't exist
        if [[ ! -f "$RATOS_LOG_FILE" ]]; then
            check_log_file_exists
        fi

        # Brief delay before retry
        sleep 0.1
    done

    # If all retries failed, write to stderr as fallback
    echo "ERROR: Failed to write to log file after $max_retries attempts: $log_entry" >&2
    return 1
}

# Get current timestamp as Unix timestamp in milliseconds (Pino format)
get_timestamp() {
    # Get current time in milliseconds since epoch
    date +%s%3N
}

# Performance monitoring variables
declare -gA PERFORMANCE_TIMERS=()
declare -gA PERFORMANCE_COUNTERS=()

# Function to start a performance timer
start_timer() {
    local timer_name="$1"
    local context="${2:-performance}"

    if [[ -z "$timer_name" ]]; then
        log_error "start_timer called without timer name" "$context" "TIMER_NAME_MISSING"
        return 1
    fi

    PERFORMANCE_TIMERS["$timer_name"]=$(get_timestamp)

    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        log_debug "Started timer: $timer_name" "$context"
    fi
}

# Function to stop a performance timer and log the duration
stop_timer() {
    local timer_name="$1"
    local context="${2:-performance}"
    local log_level="${3:-debug}"

    if [[ -z "$timer_name" ]]; then
        log_error "stop_timer called without timer name" "$context" "TIMER_NAME_MISSING"
        return 1
    fi

    if [[ -z "${PERFORMANCE_TIMERS[$timer_name]:-}" ]]; then
        log_error "Timer '$timer_name' was not started" "$context" "TIMER_NOT_STARTED"
        return 1
    fi

    local start_time="${PERFORMANCE_TIMERS[$timer_name]}"
    local end_time
    end_time=$(get_timestamp)
    local duration=$((end_time - start_time))

    # Remove timer from active timers
    unset "PERFORMANCE_TIMERS[$timer_name]"

    # Log the duration
    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        case "$log_level" in
            "info") log_info "Timer '$timer_name' completed in ${duration}ms" "$context" ;;
            "warn") log_warn "Timer '$timer_name' completed in ${duration}ms" "$context" ;;
            "error") log_error "Timer '$timer_name' completed in ${duration}ms" "$context" ;;
            *) log_debug "Timer '$timer_name' completed in ${duration}ms" "$context" ;;
        esac
    fi

    # Return duration for use by caller
    echo "$duration"
}

# Function to increment a performance counter
increment_counter() {
    local counter_name="$1"
    local increment="${2:-1}"
    local context="${3:-performance}"

    if [[ -z "$counter_name" ]]; then
        log_error "increment_counter called without counter name" "$context" "COUNTER_NAME_MISSING"
        return 1
    fi

    if ! [[ "$increment" =~ ^[0-9]+$ ]]; then
        log_error "increment_counter called with invalid increment value: $increment" "$context" "INVALID_INCREMENT"
        return 1
    fi

    local current_value="${PERFORMANCE_COUNTERS[$counter_name]:-0}"
    PERFORMANCE_COUNTERS["$counter_name"]=$((current_value + increment))

    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        log_debug "Counter '$counter_name' incremented by $increment to ${PERFORMANCE_COUNTERS[$counter_name]}" "$context"
    fi
}

# Function to get current counter value
get_counter() {
    local counter_name="$1"
    echo "${PERFORMANCE_COUNTERS[$counter_name]:-0}"
}

# Function to reset a counter
reset_counter() {
    local counter_name="$1"
    local context="${2:-performance}"

    if [[ -z "$counter_name" ]]; then
        log_error "reset_counter called without counter name" "$context" "COUNTER_NAME_MISSING"
        return 1
    fi

    PERFORMANCE_COUNTERS["$counter_name"]=0

    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        log_debug "Counter '$counter_name' reset to 0" "$context"
    fi
}

# Function to log all active performance metrics
log_performance_summary() {
    local context="${1:-performance_summary}"

    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" != "true" ]]; then
		echo "Performance monitoring is disabled, skipping performance summary" >&2
        return 0
    fi

    log_info "Performance Summary" "$context"

    # Log active timers
    if [[ ${#PERFORMANCE_TIMERS[@]} -gt 0 ]]; then
        log_info "Active timers: ${#PERFORMANCE_TIMERS[@]}" "$context"
        for timer_name in "${!PERFORMANCE_TIMERS[@]}"; do
            local start_time="${PERFORMANCE_TIMERS[$timer_name]}"
            local current_time
            current_time=$(get_timestamp)
            local elapsed=$((current_time - start_time))
            log_info "  $timer_name: ${elapsed}ms (still running)" "$context"
        done
    fi

    # Log counters
    if [[ ${#PERFORMANCE_COUNTERS[@]} -gt 0 ]]; then
        log_info "Performance counters:" "$context"
        for counter_name in "${!PERFORMANCE_COUNTERS[@]}"; do
            log_info "  $counter_name: ${PERFORMANCE_COUNTERS[$counter_name]}" "$context"
        done
    fi
}

# Get process info
get_process_info() {
    echo "{\"pid\":$$,\"hostname\":\"$(hostname)\"}"
}

# Enhanced log rotation with advanced features
# Load log rotation functionality if available
if [[ -f "$SCRIPT_DIR/ratos-log-rotation.sh" ]]; then
    # shellcheck source=configuration/scripts/ratos-log-rotation.sh
    source "$SCRIPT_DIR/ratos-log-rotation.sh"
    LOG_ROTATION_AVAILABLE=true
else
    LOG_ROTATION_AVAILABLE=false
fi

# Rotate log file if it exceeds max size
# Note: Rotation is disabled when using main log file (RATOS_LOG_MAX_SIZE=0)
# as the main log file has its own logrotate configuration
rotate_log_if_needed() {
    # Skip rotation if disabled (using main log file)
    if [[ $RATOS_LOG_MAX_SIZE -eq 0 ]]; then
        return 0
    fi

    # Use advanced rotation if available
    if [[ $LOG_ROTATION_AVAILABLE == true ]]; then
        # Convert RATOS_LOG_MAX_SIZE to size format expected by rotation script
        local max_size_str="${RATOS_LOG_MAX_SIZE}"
        if [[ $RATOS_LOG_MAX_SIZE -gt 0 ]]; then
            # Convert bytes to MB for readability
            max_size_str="$((RATOS_LOG_MAX_SIZE / 1024 / 1024))M"
        fi

        rotate_log_file "$RATOS_LOG_FILE" "$max_size_str" "$RATOS_LOG_BACKUP_COUNT" "true"
        return $?
    fi

    # Fallback to simple rotation
    if [[ -f "$RATOS_LOG_FILE" ]] && [[ $(stat -c%s "$RATOS_LOG_FILE" 2>/dev/null || echo 0) -gt $RATOS_LOG_MAX_SIZE ]]; then
        # Rotate existing backups
        for ((i=RATOS_LOG_BACKUP_COUNT; i>=1; i--)); do
            if [[ -f "${RATOS_LOG_FILE}.$i" ]]; then
                if [[ $i -eq $RATOS_LOG_BACKUP_COUNT ]]; then
                    rm -f "${RATOS_LOG_FILE}.$i"
                else
                    mv "${RATOS_LOG_FILE}.$i" "${RATOS_LOG_FILE}.$((i+1))"
                fi
            fi
        done

        # Move current log to .1
        mv "$RATOS_LOG_FILE" "${RATOS_LOG_FILE}.1"

        # Create new log file
        touch "$RATOS_LOG_FILE"
        chmod 664 "$RATOS_LOG_FILE"
    fi
}

check_log_file_exists() {
    if [[ ! -f "$RATOS_LOG_FILE" ]]; then
		echo "DEBUG: Log file $RATOS_LOG_FILE does not exist, creating it..."
        if ! touch "$RATOS_LOG_FILE"; then
            echo "Error: Failed to create log file $RATOS_LOG_FILE" >&2
            return 1
        fi
        if ! chmod 664 "$RATOS_LOG_FILE"; then
            echo "Error: Failed to set permissions on log file $RATOS_LOG_FILE" >&2
            return 1
        fi
    fi
}

# Core logging function
log_message() {
    local level="$1"
    local message="$2"
    local context="$3"
    local error_code="$4"

    # Input validation
    if [[ -z "$level" ]]; then
		# Returning 1 will kill the script if set -e is used
        echo "ERROR: log_message called without level parameter" >&2
        return 0
    fi

    if [[ -z "$message" ]]; then
		# Returning 1 will kill the script if set -e is used
        echo "ERROR: log_message called without message parameter" >&2
        return 0
    fi

    # Validate log level
    if ! validate_log_level "$level"; then
		# Returning 1 will kill the script if set -e is used
        echo "ERROR: Invalid log level passed to log_message: '$level'" >&2
        return 0
    fi

    # Check if we should log this level
    local level_value=${LOG_LEVELS[$level]}
    if [[ $level_value -lt $CURRENT_LOG_LEVEL ]]; then
        return 0
    fi

    # Rotate log if needed (with error handling)
    if ! rotate_log_if_needed; then
        echo "WARNING: Log rotation failed" >&2
    fi

    # Ensure log file exists; do not abort on failure to avoid killing callers using set -e
    if ! check_log_file_exists; then
        echo "ERROR: Cannot create or access log file" >&2
        # Continue; fallback writing to stderr will occur in safe_write_log below
    fi

    # Build JSON log entry with error handling
    local timestamp
    local escaped_message
    local log_entry

    # Get timestamp with fallback
    if ! timestamp=$(get_timestamp); then
        timestamp=$(date +%s000)  # Fallback to seconds with 000 milliseconds
    fi

    # Escape message for JSON (handle control characters)
    escaped_message=$(escape_json "$message")

    # Build context JSON with proper escaping
    local context_json=""
    if [[ -n "$context" ]]; then
        local escaped_context
        escaped_context=$(escape_json "$context")
        context_json=",\"context\":\"$escaped_context\""
    fi

    # Build error code JSON with proper escaping
    local error_code_json=""
    if [[ -n "$error_code" ]]; then
        local escaped_error_code
        escaped_error_code=$(escape_json "$error_code")
        error_code_json=",\"errorCode\":\"$escaped_error_code\""
    fi

    # Create log entry with error handling
    local pid_hostname
    if ! pid_hostname="\"pid\":$$,\"hostname\":\"$(hostname)\""; then
        pid_hostname="\"pid\":$$,\"hostname\":\"unknown\""
    fi

    log_entry="{\"level\":$level_value,\"time\":$timestamp,\"msg\":\"$escaped_message\",\"source\":\"ratos-update\"$context_json$error_code_json,$pid_hostname}"

    # Write to log file with retry logic
    if ! safe_write_log "$log_entry"; then
        echo "WARNING: Failed to write to log file, continuing..." >&2
    fi

    # Also output to console for immediate feedback (always show, regardless of log file issues)
    display_console_message "$level" "$message"
}

# Separate function for console display
display_console_message() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date '+%H:%M:%S' 2>/dev/null || echo "??:??:??")

	if [[ $RATOS_CONSOLE_OUTPUT == "false" ]]; then
		return 0
	fi

    case $level in
        "fatal")
            echo -e "\033[31m[$timestamp] FATAL ERROR: $message\033[0m" >&2
            ;;
        "error")
            echo -e "\033[31m[$timestamp] ERROR: $message\033[0m" >&2
            ;;
        "warn")
            echo -e "\033[33m[$timestamp] WARN: $message\033[0m" >&2
            ;;
        "info")
            echo -e "\033[32m[$timestamp] INFO: $message\033[0m"
            ;;
        "debug")
            if [[ $RATOS_LOG_LEVEL == "debug" || $RATOS_LOG_LEVEL == "trace" ]]; then
                echo -e "\033[36m[$timestamp] DEBUG: $message\033[0m"
            fi
            ;;
        "trace")
            if [[ $RATOS_LOG_LEVEL == "trace" ]]; then
                echo -e "\033[35m[$timestamp] TRACE: $message\033[0m"
            fi
            ;;
    esac
}

# Convenience logging functions
log_trace() { log_message "trace" "$1" "$2" "$3"; }
log_debug() { log_message "debug" "$1" "$2" "$3"; }
log_info() { log_message "info" "$1" "$2" "$3"; }
log_warn() { log_message "warn" "$1" "$2" "$3"; }
log_error() { log_message "error" "$1" "$2" "$3"; }
log_fatal() { log_message "fatal" "$1" "$2" "$3"; }

# Function to log command execution with error handling
# Usage: execute_with_logging "context" "error_code" [timeout_seconds] command arg1 arg2 ...
# If timeout_seconds is provided and > 0, the command will be killed after that many seconds
execute_with_logging() {
    local context="$1"
    local error_code="$2"
    shift 2

    # Input validation
    if [[ -z "$context" ]]; then
        echo "ERROR: execute_with_logging called without context parameter" >&2
        return 1
    fi

    if [[ -z "$error_code" ]]; then
        echo "ERROR: execute_with_logging called without error_code parameter" >&2
        return 1
    fi

    if [[ $# -eq 0 ]]; then
        echo "ERROR: execute_with_logging called without command to execute" >&2
        return 1
    fi

    # Check if first argument is a timeout (numeric)
    local timeout=0
    if [[ $1 =~ ^[0-9]+$ ]]; then
        timeout="$1"
        shift
    fi

    local cmd_str="$*"
    log_debug "Executing command: $cmd_str" "$context"

    if [[ $timeout -gt 0 ]]; then
        log_debug "Command timeout set to $timeout seconds" "$context"
    fi

    # Start performance timer if monitoring is enabled
    local timer_name
    timer_name="cmd_${context}_$$_$(date +%s)"
    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        start_timer "$timer_name" "$context"
    fi

    # Create temporary files for capturing output while still displaying it
    local temp_output
    local temp_exit
    if ! temp_output=$(mktemp); then
        log_error "Failed to create temporary output file" "$context" "${error_code}_TEMP_FILE_FAILED"
        return 1
    fi

    if ! temp_exit=$(mktemp); then
        log_error "Failed to create temporary exit code file" "$context" "${error_code}_TEMP_FILE_FAILED"
        rm -f "$temp_output"
        return 1
    fi

    local exit_code
    local start_time
    start_time=$(date +%s)

    # Execute command with optional timeout
    if [[ $timeout -gt 0 ]]; then
        # Execute with timeout
        if timeout "$timeout" "$@" 2>&1 | tee "$temp_output"; then
            echo "${PIPESTATUS[0]}" > "$temp_exit"
        else
            local cmd_exit_code=$?
            if [[ $cmd_exit_code -eq 124 ]]; then
                echo "124" > "$temp_exit"  # timeout exit code
                echo "Command timed out after $timeout seconds" >> "$temp_output"
            else
                echo "$cmd_exit_code" > "$temp_exit"
            fi
        fi
    else
        # Execute without timeout
        if "$@" 2>&1 | tee "$temp_output"; then
            echo "${PIPESTATUS[0]}" > "$temp_exit"
        else
            local cmd_exit_code=$?
            echo "$cmd_exit_code" > "$temp_exit"
        fi
    fi

    # Get the actual exit code from the command (not tee)
    if [[ -f "$temp_exit" ]]; then
        exit_code=$(cat "$temp_exit" 2>/dev/null || echo "1")
    else
        exit_code=1
        log_error "Failed to read command exit code" "$context" "${error_code}_EXIT_CODE_READ_FAILED"
    fi

    # Read the captured output
    local output
    if [[ -f "$temp_output" ]]; then
        output=$(cat "$temp_output" 2>/dev/null || echo "")
    else
        output=""
        log_error "Failed to read command output" "$context" "${error_code}_OUTPUT_READ_FAILED"
    fi

    # Calculate execution time
    local end_time
    local duration
    end_time=$(date +%s)
    duration=$((end_time - start_time))

    # Stop performance timer if monitoring is enabled
    if [[ "${RATOS_PERFORMANCE_MONITORING:-false}" == "true" ]]; then
        stop_timer "$timer_name" "$context" "debug" >/dev/null 2>&1 || true

        # Increment command counters
        increment_counter "total_commands" 1 "$context"
        if [[ $exit_code -eq 0 ]]; then
            increment_counter "successful_commands" 1 "$context"
        else
            increment_counter "failed_commands" 1 "$context"
        fi

        # Track slow commands (> 5 seconds)
        if [[ $duration -gt 5 ]]; then
            increment_counter "slow_commands" 1 "$context"
            log_warn "Slow command detected (${duration}s): $cmd_str" "$context" "SLOW_COMMAND"
        fi
    fi

    # Log results
    if [[ $exit_code -eq 0 ]]; then
        log_info "Command completed successfully in ${duration}s: $cmd_str" "$context"
        if [[ -n "$output" && ${#output} -lt 1000 ]]; then
            log_debug "Command output: $output" "$context"
        elif [[ -n "$output" ]]; then
            log_debug "Command output (truncated): ${output:0:500}..." "$context"
        fi
    elif [[ $exit_code -eq 124 ]]; then
        log_error "Command timed out after ${timeout}s: $cmd_str" "$context" "${error_code}_TIMEOUT"
        if [[ -n "$output" ]]; then
            log_error "Command output before timeout: $output" "$context" "${error_code}_TIMEOUT"
        fi
    else
        log_error "Command failed with exit code $exit_code after ${duration}s: $cmd_str" "$context" "${error_code:-CMD_FAILED}"
        if [[ -n "$output" && ${#output} -lt 1000 ]]; then
            log_error "Command error output: $output" "$context" "${error_code:-CMD_FAILED}"
        elif [[ -n "$output" ]]; then
            log_error "Command error output (truncated): ${output:0:500}..." "$context" "${error_code:-CMD_FAILED}"
        fi
    fi

    # Clean up temporary files
    rm -f "$temp_output" "$temp_exit" 2>/dev/null || true

    return "$exit_code"
}

# Function to set up error trapping
setup_error_trap() {
    local context="$1"

    # Enable error trapping but be more selective about exit behavior
    set -E  # Inherit ERR trap to functions and subshells

    # shellcheck disable=SC2064
    trap "handle_error \$? \$LINENO \"${context}\"" ERR
}

# Error trap handler
handle_error() {
    local exit_code="$1"
    local line_number="$2"
    local context="$3"
    
    log_fatal "Script failed at line $line_number with exit code $exit_code" "$context" "SCRIPT_ERROR"
    
    # Log stack trace if available
    if command -v caller >/dev/null 2>&1; then
        local frame=0
        log_error "Stack trace:" "$context" "SCRIPT_ERROR"
        while caller "$frame"; do
            ((frame++))
        done 2>&1 | while read -r line; do
            log_error "  $line" "$context" "SCRIPT_ERROR"
        done
    fi

    exit "$exit_code"
}

# Function to log script start
log_script_start() {
    local script_name="$1"
    local version="$2"
    
    log_info "Starting $script_name" "script_lifecycle" "SCRIPT_START"
    if [[ -n "$version" ]]; then
        log_info "Script version: $version" "script_lifecycle"
    fi
    log_info "Log file: $RATOS_LOG_FILE" "script_lifecycle"
    log_info "Log level: $RATOS_LOG_LEVEL" "script_lifecycle"
}

# Function to log script completion
log_script_complete() {
    local script_name="$1"
    local exit_code="${2:-0}"
    
    if [[ $exit_code -eq 0 ]]; then
        log_info "$script_name completed successfully" "script_lifecycle" "SCRIPT_SUCCESS"
    else
        log_error "$script_name completed with errors (exit code: $exit_code)" "script_lifecycle" "SCRIPT_ERROR"
    fi
}

# Function to create a summary of the current log session
create_log_summary() {
    local script_name="$1"
    local start_time="$2"
    local end_time="${3:-$(get_timestamp)}"
    
    # Count log entries by level for this session (filtered by ratos-update source)
    local error_count
    local warn_count
    local info_count

    error_count=$(grep '"source":"ratos-update"' "$RATOS_LOG_FILE" 2>/dev/null | grep -c '"level":50' || echo 0)
    warn_count=$(grep '"source":"ratos-update"' "$RATOS_LOG_FILE" 2>/dev/null | grep -c '"level":40' || echo 0)
    info_count=$(grep '"source":"ratos-update"' "$RATOS_LOG_FILE" 2>/dev/null | grep -c '"level":30' || echo 0)
    
    log_info "Log summary for $script_name:" "script_lifecycle" "SCRIPT_SUMMARY"
    log_info "  Errors: $error_count, Warnings: $warn_count, Info: $info_count" "script_lifecycle" "SCRIPT_SUMMARY"
    log_info "  Duration: $start_time to $end_time" "script_lifecycle" "SCRIPT_SUMMARY"
}

# Function to check system resources and log warnings if low
check_system_resources() {
    local context="${1:-system_check}"

    # Check disk space for log directory
    local log_dir
    log_dir=$(dirname "$RATOS_LOG_FILE")

    if command -v df >/dev/null 2>&1; then
        local disk_usage
        disk_usage=$(df "$log_dir" 2>/dev/null | awk 'NR==2 {print $5}' | sed 's/%//')

        if [[ -n "$disk_usage" && "$disk_usage" =~ ^[0-9]+$ ]]; then
            if [[ $disk_usage -gt 90 ]]; then
                log_warn "Disk space critically low: ${disk_usage}% used in $log_dir" "$context" "DISK_SPACE_CRITICAL"
            elif [[ $disk_usage -gt 80 ]]; then
                log_warn "Disk space low: ${disk_usage}% used in $log_dir" "$context" "DISK_SPACE_LOW"
            else
                log_debug "Disk space OK: ${disk_usage}% used in $log_dir" "$context"
            fi
        fi
    fi

    # Check memory usage
    if command -v free >/dev/null 2>&1; then
        local mem_usage
        mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')

        if [[ -n "$mem_usage" && "$mem_usage" =~ ^[0-9]+$ ]]; then
            if [[ $mem_usage -gt 90 ]]; then
                log_warn "Memory usage high: ${mem_usage}%" "$context" "MEMORY_HIGH"
            else
                log_debug "Memory usage: ${mem_usage}%" "$context"
            fi
        fi
    fi

    # Check load average
    if [[ -f /proc/loadavg ]]; then
        local load_avg
        load_avg=$(cut -d' ' -f1 /proc/loadavg 2>/dev/null)

        if [[ -n "$load_avg" ]]; then
            log_debug "System load average: $load_avg" "$context"

            # Warn if load is very high (> 4.0)
            if command -v bc >/dev/null 2>&1; then
                if [[ $(echo "$load_avg > 4.0" | bc 2>/dev/null) -eq 1 ]]; then
                    log_warn "System load average high: $load_avg" "$context" "LOAD_HIGH"
                fi
            fi
        fi
    fi
}

# Function to validate logging environment
validate_logging_environment() {
    local issues=0

    # Check if log file is writable
    if [[ ! -w "$RATOS_LOG_FILE" ]] && [[ ! -w "$(dirname "$RATOS_LOG_FILE")" ]]; then
        echo "ERROR: Cannot write to log file $RATOS_LOG_FILE" >&2
        ((issues++))
    fi

    # Check if required commands are available
    local required_commands=("date" "hostname" "mktemp")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            echo "WARNING: Required command '$cmd' not found" >&2
            ((issues++))
        fi
    done

    # Check log level validity
    if ! validate_log_level "$RATOS_LOG_LEVEL"; then
        echo "ERROR: Invalid environment variable RATOS_LOG_LEVEL: '$RATOS_LOG_LEVEL'" >&2
        ((issues++))
    fi

    return $issues
}

# Function to create a health check log entry
log_health_check() {
    local context="${1:-health_check}"

    log_info "Performing system health check" "$context"

    # Check system resources
    check_system_resources "$context"

    # Log system information
    if command -v uname >/dev/null 2>&1; then
        local system_info
        system_info=$(uname -a 2>/dev/null || echo "unknown")
        log_debug "System info: $system_info" "$context"
    fi

    # Log current user and permissions
    log_debug "Running as user: $(whoami 2>/dev/null || echo "unknown")" "$context"
    log_debug "Process ID: $$" "$context"

    # Log environment variables relevant to logging
    log_debug "Log file: $RATOS_LOG_FILE" "$context"
    log_debug "Log level: $RATOS_LOG_LEVEL" "$context"
    log_debug "Log max size: $RATOS_LOG_MAX_SIZE" "$context"
}

# Export functions for use in other scripts
export -f log_trace log_debug log_info log_warn log_error log_fatal
export -f escape_json execute_with_logging setup_error_trap handle_error
export -f log_script_start log_script_complete create_log_summary
export -f validate_log_level safe_write_log display_console_message
export -f check_system_resources validate_logging_environment log_health_check
export -f start_timer stop_timer increment_counter get_counter reset_counter log_performance_summary