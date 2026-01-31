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

if [[ -z "${RATOS_PRINTER_DATA_DIR:-}" ]]; then
	echo "Error: RATOS_PRINTER_DATA_DIR is not set. Please ensure environment.sh is configured correctly." >&2
	exit 1
fi

# NOTE/TODO: environment.sh DOES NOT source ~/ratos-configurator/src|app/.env, so don't expect it to
# be set at this point. This is the expected behaviour of environment.sh, which sources from
# ~/.ratos.env (and some variants, see that script for details).
# See NOTE! at the top of /LOGGING_SYSTEM.md for more details/discussion.

# Default log configuration
# Convert RATOS_LOG_LEVEL to lowercase for case-insensitive matching
RATOS_LOG_LEVEL=${RATOS_LOG_LEVEL:-"debug"}
RATOS_LOG_LEVEL=${RATOS_LOG_LEVEL,,}  # Convert to lowercase
RATOS_LOG_FILE=${RATOS_LOG_FILE:-"${LOG_FILE:-$RATOS_PRINTER_DATA_DIR/logs/ratos-configurator.log}"}
# Disable custom rotation since main log file has its own rotation
RATOS_LOG_MAX_SIZE=${RATOS_LOG_MAX_SIZE:-0}  # 0 = disabled
RATOS_LOG_BACKUP_COUNT=${RATOS_LOG_BACKUP_COUNT:-0}

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
if [[ -z "${LOG_LEVELS[$RATOS_LOG_LEVEL]:-}" ]]; then
    echo "Warning: Invalid log level '$RATOS_LOG_LEVEL', defaulting to 'info'" >&2
    RATOS_LOG_LEVEL="info"
fi

# Current log level numeric value
CURRENT_LOG_LEVEL=${LOG_LEVELS[$RATOS_LOG_LEVEL]}

# Helper function to escape strings for JSON using Python for robust handling.
escape_json() {
    # Use Python's json library to dump the string, then strip the surrounding quotes
    # because log_message adds its own quotes.
    printf '%s' "$1" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read())[1:-1])'
}

# Get current timestamp as Unix timestamp in milliseconds (Pino format)
get_timestamp() {
    # Get current time in milliseconds since epoch
    date +%s%3N
}

# Get process info
get_process_info() {
    echo "{\"pid\":$$,\"hostname\":\"$(hostname)\"}"
}

# Rotate log file if it exceeds max size
# Note: Rotation is disabled when using main log file (RATOS_LOG_MAX_SIZE=0)
# as the main log file has its own logrotate configuration
rotate_log_if_needed() {
    # Skip rotation if disabled (using main log file)
    if [[ $RATOS_LOG_MAX_SIZE -eq 0 ]]; then
        return 0
    fi

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
            exit 1
        fi
        if ! chmod 664 "$RATOS_LOG_FILE"; then
            echo "Error: Failed to set permissions on log file $RATOS_LOG_FILE" >&2
            exit 1
        fi
    fi
}

# Core logging function
log_message() {
    local level="$1"
    local message="$2"
    local context="$3"
    local error_code="$4"
    
    # Check if we should log this level
    local level_value=${LOG_LEVELS[$level]}
    if [[ $level_value -lt $CURRENT_LOG_LEVEL ]]; then
        return 0
    fi
    
    # Rotate log if needed
    rotate_log_if_needed
	check_log_file_exists
    
    # Build JSON log entry
    local timestamp
    local escaped_message

    timestamp=$(get_timestamp)

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
    
    # Create log entry
    local log_entry
    local pid_hostname
    pid_hostname="\"pid\":$$,\"hostname\":\"$(hostname)\""
    log_entry="{\"level\":$level_value,\"time\":$timestamp,\"msg\":\"$escaped_message\",\"source\":\"ratos-update\"$context_json$error_code_json,$pid_hostname}"
    
    # Write to log file
    echo "$log_entry" >> "$RATOS_LOG_FILE"

    # Also output to console for immediate feedback
    case $level in
		"fatal")
			echo -e "\033[31m[$(date '+%H:%M:%S')] FATAL ERROR: $message\033[0m" >&2
			;;
        "error")
            echo -e "\033[31m[$(date '+%H:%M:%S')] ERROR: $message\033[0m" >&2
            ;;
        "warn")
            echo -e "\033[33m[$(date '+%H:%M:%S')] WARN: $message\033[0m" >&2
            ;;
        "info")
            echo -e "\033[32m[$(date '+%H:%M:%S')] INFO: $message\033[0m"
            ;;
        "debug")
            if [[ $RATOS_LOG_LEVEL == "debug" ]]; then
                echo -e "\033[36m[$(date '+%H:%M:%S')] DEBUG: $message\033[0m"
            fi
            ;;
        "trace")
            if [[ $RATOS_LOG_LEVEL == "trace" ]]; then
                echo -e "\033[35m[$(date '+%H:%M:%S')] TRACE: $message\033[0m"
            fi
            ;;
    esac
}

# Convenience logging functions
log_trace() { log_message "trace" "$1" "${2:-}" "${3:-}"; }
log_debug() { log_message "debug" "$1" "${2:-}" "${3:-}"; }
log_info() { log_message "info" "$1" "${2:-}" "${3:-}"; }
log_warn() { log_message "warn" "$1" "${2:-}" "${3:-}"; }
log_error() { log_message "error" "$1" "${2:-}" "${3:-}"; }
log_fatal() { log_message "fatal" "$1" "${2:-}" "${3:-}"; }

# Function to log command execution with error handling
# Usage: execute_with_logging "context" "error_code" command arg1 arg2 ...
execute_with_logging() {
    local context="$1"
    local error_code="$2"
    shift 2

    # Build command string space-separated regardless of IFS
    local cmd_str
    cmd_str=$(printf "%s " "$@")
    cmd_str=${cmd_str% }
    log_debug "Executing command: $cmd_str" "$context"

    # Create temporary file for capturing output while still displaying it
    local temp_output
    temp_output=$(mktemp)
    local exit_code

    # Execute command with tee to both display and capture output
    # Use process substitution to capture both stdout and stderr
    {
        "$@" 2>&1 | tee "$temp_output"
        echo "${PIPESTATUS[0]}" > "${temp_output}.exit"
    }

    # Get the actual exit code from the command (not tee)
    exit_code=$(cat "${temp_output}.exit")

    # Read the captured output
    local output
    output=$(cat "$temp_output")

    if [[ $exit_code -eq 0 ]]; then
        log_info "Command completed successfully: $cmd_str" "$context"
        if [[ -n "$output" ]]; then
            log_debug "Command output: $output" "$context"
        fi
    else
        log_error "Command failed with exit code $exit_code: $cmd_str" "$context" "${error_code:-CMD_FAILED}"
        if [[ -n "$output" ]]; then
            log_error "Command error output: $output" "$context" "${error_code:-CMD_FAILED}"
        fi
    fi

    # Clean up temporary files
    rm -f "$temp_output" "${temp_output}.exit"

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

    # Prevent recursive traps during error handling
    trap - ERR
    set +e
    set +o pipefail 2>/dev/null || true

    log_fatal "Script failed at line $line_number with exit code $exit_code" "$context" "SCRIPT_ERROR"

    # Log stack trace if available
    if command -v caller >/dev/null 2>&1; then
        local frame=0
        log_error "Stack trace:" "$context" "SCRIPT_ERROR"
        # Use a simple loop without pipelines to avoid pipefail interactions
        while caller "$frame" >/dev/null 2>&1; do
            local call_line
            call_line=$(caller "$frame")
            log_error "  $call_line" "$context" "SCRIPT_ERROR"
            ((frame++))
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

# Export functions for use in other scripts
export -f log_trace log_debug log_info log_warn log_error log_fatal
export -f escape_json execute_with_logging setup_error_trap handle_error
export -f log_script_start log_script_complete create_log_summary