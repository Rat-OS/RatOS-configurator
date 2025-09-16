# RatOS Logging System Documentation

## Overview

The RatOS logging system provides structured, JSON-formatted logging compatible with pino for bash scripts. It includes advanced features like performance monitoring, log rotation, configuration management, and health checks.

## Features

- **Structured JSON Logging**: Compatible with pino log format
- **Multiple Log Levels**: trace, debug, info, warn, error, fatal
- **Performance Monitoring**: Built-in timing and counters
- **Log Rotation**: Automatic log rotation and cleanup
- **Configuration Management**: Dynamic configuration with file-based settings
- **Health Checks**: System resource monitoring
- **Error Handling**: Comprehensive error trapping and reporting
- **Console Output**: Colored console output with timestamps

## Quick Start

### Basic Usage

```bash
#!/usr/bin/env bash

# Source the logging library
source "/path/to/ratos-logging.sh"

# Set up error trapping
setup_error_trap "my-script"

# Log script start
log_script_start "my-script.sh" "1.0.0"

# Basic logging
log_info "Script started successfully" "main"
log_debug "Debug information" "main"
log_warn "Warning message" "main"
log_error "Error occurred" "main" "ERROR_CODE"

# Execute commands with logging
if execute_with_logging "main" "COMMAND_FAILED" ls -la; then
    log_info "Command executed successfully" "main"
else
    log_error "Command failed" "main" "COMMAND_FAILED"
fi

# Log script completion
log_script_complete "my-script.sh" "0"
```

### Configuration

Create a configuration file at `/etc/ratos/logging.conf`:

```bash
# Log level: trace, debug, info, warn, error, fatal
log_level=info

# Log file location
log_file=/var/log/ratos-configurator.log

# Log rotation settings (0 = disabled, use system logrotate)
max_size=50M
backup_count=5

# Output settings
console_output=true
json_format=true
include_hostname=true
include_pid=true

# Advanced features
performance_monitoring=true
health_checks=true
error_notifications=false
```

## Core Functions

### Logging Functions

#### `log_info(message, context, error_code)`
Log an informational message.

```bash
log_info "Operation completed" "main"
log_info "User logged in" "auth" "USER_LOGIN"
```

#### `log_error(message, context, error_code)`
Log an error message.

```bash
log_error "Failed to connect to database" "database" "DB_CONNECTION_FAILED"
```

#### `log_debug(message, context, error_code)`
Log a debug message (only shown when log level is debug or trace).

```bash
log_debug "Processing user data: $user_data" "processing"
```

#### `log_warn(message, context, error_code)`
Log a warning message.

```bash
log_warn "Disk space low: 85% used" "system" "DISK_SPACE_LOW"
```

### Command Execution

#### `execute_with_logging(context, error_code, [timeout], command...)`
Execute a command with comprehensive logging.

```bash
# Basic usage
execute_with_logging "backup" "BACKUP_FAILED" rsync -av /src/ /dest/

# With timeout (30 seconds)
execute_with_logging "backup" "BACKUP_FAILED" 30 rsync -av /src/ /dest/

# Complex command
execute_with_logging "install" "PACKAGE_INSTALL_FAILED" apt-get install -y package-name
```

### Performance Monitoring

#### `start_timer(timer_name, context)`
Start a performance timer.

```bash
start_timer "database_query" "database"
# ... perform operation ...
duration=$(stop_timer "database_query" "database")
echo "Operation took ${duration}ms"
```

#### `increment_counter(counter_name, increment, context)`
Increment a performance counter.

```bash
increment_counter "processed_files" 1 "processing"
increment_counter "bytes_transferred" 1024 "network"
```

#### `log_performance_summary(context)`
Log a summary of all performance metrics.

```bash
log_performance_summary "script_completion"
```

### Script Lifecycle

#### `log_script_start(script_name, version)`
Log script startup with metadata.

```bash
log_script_start "backup-script.sh" "2.1.0"
```

#### `log_script_complete(script_name, exit_code)`
Log script completion with exit status.

```bash
log_script_complete "backup-script.sh" "$exit_code"
```

#### `setup_error_trap(context)`
Set up automatic error trapping and logging.

```bash
setup_error_trap "my-script"
# Now any command that fails will be automatically logged
```

## Configuration Management

### Loading Configuration

```bash
# Load configuration from default location
init_logging_config

# Load from custom location
init_logging_config "/custom/path/logging.conf"

# Show current configuration
show_config
```

### Updating Configuration

```bash
# Update log level
update_config "log_level" "debug"

# Update log file location
update_config "log_file" "/var/log/custom.log"

# Enable performance monitoring
update_config "performance_monitoring" "true"
```

## Log Rotation and Cleanup

### Manual Log Rotation

```bash
# Source the log rotation library
source "/path/to/ratos-log-rotation.sh"

# Rotate a specific log file
rotate_log_file "/var/log/app.log" "10M" "5" "true"

# Clean up old log files
cleanup_old_logs "/var/log" "30" "*.log*"

# Perform comprehensive maintenance
perform_log_maintenance "/var/log/app.log" "50M" "30" "5" "true"
```

### Automatic Log Rotation

The system can create logrotate configurations automatically:

```bash
create_logrotate_config "/var/log/app.log" "50M" "5" "true"
```

### Implementation Details and Defaults

- Default values (when arguments are omitted):
  - `max_size`: `50M`
  - `max_age` (days, for cleanup): `30`
  - `backup_count`: `5`
  - `compress`: `true` (uses gzip; original file removed after compression)

- Rotation behavior:
  - Rotates when current size exceeds `max_size`.
  - Backs up as `file.1[.gz]`, increments existing backups up to `backup_count`, deletes the oldest.
  - Creates a fresh log file with mode `664`.

- Cleanup behavior:
  - Removes files matching the provided pattern older than `max_age` days.

### Helper Utilities

The log rotation library also exposes low-level helpers:

```bash
# Convert human size to bytes (e.g. 50M -> 52428800)
size_to_bytes "50M"

# Introspection utilities
get_file_size "/var/log/app.log"            # bytes
get_file_age_days "/var/log/app.log"        # days

# On-demand compression (gzip, removes original on success)
compress_log "/var/log/app.log.1"
```

### Generated logrotate Configuration

`create_logrotate_config` writes a config to `/etc/logrotate.d/ratos-logging` with options equivalent to:

```conf
/var/log/app.log {
    size 50M
    rotate 5
    missingok
    notifempty
    create 664 root root
    compress
    delaycompress
    postrotate
        systemctl reload-or-restart ratos-configurator 2>/dev/null || true
    endscript
}
```

Validation is performed via `logrotate -d` after installation.

## Health Checks

### System Resource Monitoring

```bash
# Check system resources and log warnings if needed
check_system_resources "health_check"

# Perform comprehensive health check
log_health_check "startup"
```

### Disk Usage Analysis

```bash
# Analyze log disk usage
analyze_log_disk_usage "/var/log"
```

## Best Practices

### 1. Use Appropriate Log Levels

- **trace**: Very detailed debugging information
- **debug**: Debugging information for development
- **info**: General informational messages
- **warn**: Warning conditions that should be noted
- **error**: Error conditions that need attention
- **fatal**: Critical errors that cause script termination

### 2. Provide Context

Always provide meaningful context strings:

```bash
# Good
log_info "User authentication successful" "auth"
log_error "Database connection failed" "database" "DB_CONN_FAILED"

# Avoid
log_info "Success" ""
log_error "Failed" "" ""
```

### 3. Use Error Codes

Provide specific error codes for better debugging:

```bash
log_error "Failed to create backup directory" "backup" "BACKUP_DIR_CREATE_FAILED"
log_error "Insufficient disk space" "backup" "BACKUP_DISK_SPACE_INSUFFICIENT"
```

### 4. Monitor Performance

Enable performance monitoring for critical operations:

```bash
# Set environment variable
export RATOS_PERFORMANCE_MONITORING=true

# Or in configuration file
performance_monitoring=true
```

### 5. Handle Errors Gracefully

Use error trapping for automatic error handling:

```bash
#!/usr/bin/env bash
set -e  # Exit on error

source "/path/to/ratos-logging.sh"
setup_error_trap "my-script"

# Any command that fails will be automatically logged
```

### 6. Clean Up Resources

Always clean up temporary files and log completion:

```bash
# Track script execution
START_TIME=$(get_timestamp)
exit_code=0

# ... script logic ...

# Create summary and complete
create_log_summary "my-script.sh" "$START_TIME"
log_script_complete "my-script.sh" "$exit_code"
```

## Environment Variables

### Core Configuration

- `RATOS_LOG_LEVEL`: Log level (trace, debug, info, warn, error, fatal)
- `RATOS_LOG_FILE`: Path to log file

### Advanced Features

- `RATOS_PERFORMANCE_MONITORING`: Enable performance monitoring (true/false)
- `RATOS_HEALTH_CHECKS`: Enable health checks (true/false)
- `RATOS_CONSOLE_OUTPUT`: Enable console output (true/false)
- `RATOS_JSON_FORMAT`: Use JSON format (true/false)
- `RATOS_INCLUDE_HOSTNAME`: Include hostname in logs (true/false)
- `RATOS_INCLUDE_PID`: Include process ID in logs (true/false)

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure the script has write access to the log file directory
2. **Log File Not Created**: Check directory permissions and disk space
3. **Performance Impact**: Disable performance monitoring in production if needed
4. **Large Log Files**: Configure appropriate log rotation settings

### Debug Mode

Enable debug logging to troubleshoot issues:

```bash
export RATOS_LOG_LEVEL=debug
```

### Validation

Validate your logging configuration:

```bash
source "/path/to/ratos-logging-config.sh"
validate_config
```

## Integration Examples

### With Existing Scripts

```bash
#!/usr/bin/env bash

# Add logging to existing script
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source "$SCRIPT_DIR/ratos-logging.sh"

setup_error_trap "existing-script"
log_script_start "existing-script.sh" "1.0.0"

# Replace echo statements with log functions
# echo "Starting backup..." 
log_info "Starting backup process" "backup"

# Replace command execution
# rsync -av /src/ /dest/
execute_with_logging "backup" "RSYNC_FAILED" rsync -av /src/ /dest/

log_script_complete "existing-script.sh" "0"
```

### With Systemd Services

Create a service that uses the logging system:

```ini
[Unit]
Description=RatOS Script with Logging
After=network.target

[Service]
Type=oneshot
ExecStart=/path/to/script-with-logging.sh
Environment=RATOS_LOG_LEVEL=info
Environment=RATOS_LOG_FILE=/var/log/service.log

[Install]
WantedBy=multi-user.target
```

## Quick Reference

### Essential Functions

```bash
# Logging
log_info "message" "context" ["error_code"]
log_error "message" "context" ["error_code"]
log_debug "message" "context" ["error_code"]
log_warn "message" "context" ["error_code"]

# Command execution
execute_with_logging "context" "error_code" [timeout] command args...

# Script lifecycle
setup_error_trap "script_name"
log_script_start "script.sh" "version"
log_script_complete "script.sh" "exit_code"

# Performance monitoring
start_timer "timer_name" "context"
stop_timer "timer_name" "context" ["log_level"]
increment_counter "counter_name" [increment] "context"
log_performance_summary "context"

# Configuration
init_logging_config [config_file]
update_config "key" "value" [config_file]
show_config

# Health checks
check_system_resources "context"
log_health_check "context"

# Log rotation
rotate_log_file "file" "max_size" "backup_count" "compress"
cleanup_old_logs "directory" "max_age_days" "pattern"
analyze_log_disk_usage "directory"
create_logrotate_config "file" "max_size" "backup_count" "compress"
perform_log_maintenance "file" "max_size" "max_age_days" "backup_count" "compress"
```

### Configuration File Template

```bash
# /etc/ratos/logging.conf
log_level=info
log_file=/var/log/ratos-configurator.log
max_size=50M
backup_count=5
console_output=true
json_format=true
include_hostname=true
include_pid=true
performance_monitoring=false
health_checks=true
error_notifications=false
```

## API Reference

For complete API documentation, see the function definitions in:
- `ratos-logging.sh`: Core logging functions
- `ratos-logging-config.sh`: Configuration management
- `ratos-log-rotation.sh`: Log rotation and cleanup
