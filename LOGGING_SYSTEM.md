# RatOS Unified Logging System

This document describes the comprehensive unified logging system implemented for the RatOS-configurator project. The system consolidates all RatOS logs into a single main log file while providing specialized tools for viewing and analyzing logs from different sources, including update scripts and other system operations.

## Overview

The unified logging system consists of four main components:

1. **Structured Bash Logging Library** - Captures errors from shell scripts in JSON format, writing to the main RatOS log
2. **CLI Log Management Commands** - Command-line tools for viewing and analyzing logs with source filtering
3. **Web UI Integration** - Browser-based log viewer with filtering and analysis capabilities
4. **Debug Integration** - Automatic inclusion of logs in debug packages

## Architecture

### 1. Bash Logging Library (`configuration/scripts/ratos-logging.sh`)

The bash logging library provides structured logging capabilities for shell scripts, outputting logs in JSON format compatible with the pino logging system used throughout the application. **All logs are written to the main RatOS log file** (`/var/log/ratos-configurator.log`) with a `source: "ratos-update"` field for filtering.

#### Features:
- **JSON-formatted logs** compatible with pino
- **Multiple log levels**: trace, debug, info, warn, error, fatal
- **Unified log file** - writes to main RatOS log instead of separate files
- **Source identification** - all entries tagged with `source: "ratos-update"`
- **Error trapping** with stack trace capture
- **Command execution logging** with automatic error handling
- **Timestamped entries** with process information

#### Usage Example:
```bash
#!/bin/bash
source "$(dirname "$0")/ratos-logging.sh"

# Set up error trapping
setup_error_trap "my-script"

# Log script start
log_script_start "my-script.sh" "1.0.0"

# Log various levels
log_info "Starting operation" "main"
log_warn "This is a warning" "main" "WARN_CODE"
log_error "This is an error" "main" "ERROR_CODE"

# Execute commands with logging
execute_with_logging "package_update" "APT_UPDATE_FAILED" apt-get update

# Log script completion
log_script_complete "my-script.sh" $?
```

#### Configuration:
- `RATOS_LOG_LEVEL`: Set minimum log level (default: info)
- `RATOS_LOG_FILE`: Log file path (default: uses `${LOG_FILE}` from environment, typically `/var/log/ratos-configurator.log`)
- `RATOS_LOG_MAX_SIZE`: Maximum log file size before rotation (default: 0 = disabled when using main log)
- `RATOS_LOG_BACKUP_COUNT`: Number of backup files to keep (default: 0 = disabled when using main log)

**Note**: When using the unified logging system, log rotation is handled by the main RatOS log configuration, not by individual scripts.

### 2. CLI Log Management (`src/cli/commands/update-logs.tsx`)

The CLI provides several commands for viewing and analyzing update logs. **Update logs are now a subcommand of the main `logs` command** and automatically filter the main log file to show only entries with `source: "ratos-update"`.

#### Commands:

**`ratos logs update-logs summary`**
- Shows a summary of the most recent update attempt from the main log
- Displays success/failure status, error counts, and timing information
- Automatically filters by `source: "ratos-update"`

**`ratos logs update-logs show`**
- Shows detailed log entries with filtering options from the main log
- Options:
  - `-n, --lines <number>`: Number of recent lines to show (default: 50)
  - `-l, --level <level>`: Minimum log level (trace, debug, info, warn, error, fatal)
  - `-c, --context <context>`: Filter by context
  - `-d, --details`: Show detailed information

**`ratos logs update-logs errors`**
- Shows only errors and warnings from the most recent update
- Options:
  - `-d, --details`: Show detailed information

#### Usage Examples:
```bash
# Show update summary (note the new command structure)
ratos logs update-logs summary

# Show last 100 log entries at debug level
ratos logs update-logs show -n 100 -l debug

# Show only errors with details
ratos logs update-logs errors -d

# Show logs from specific context
ratos logs update-logs show -c "update_symlinks" -d

# Other log commands remain available:
ratos logs tail    # Tail the main log file
ratos logs rotate  # Force log rotation
```

### 3. Web UI Integration

The web interface provides a comprehensive log viewer accessible at `/configure/update-logs`.

#### Features:
- **Log Summary Dashboard**: Overview of recent update attempts
- **Interactive Log Viewer**: Browse and filter log entries
- **Real-time Filtering**: Filter by log level, context, and search terms
- **Error Highlighting**: Visual distinction for different log levels
- **Download Capability**: Download raw log files
- **Auto-refresh**: Automatic updates when new logs are available

#### Components:
- `UpdateLogsViewer`: Main component for displaying logs
- `UpdateLogsErrorBoundary`: Error boundary for graceful error handling
- `LogSummaryCard`: Summary statistics and controls
- `LogEntryComponent`: Individual log entry display

### 4. API Endpoints

#### TRPC Endpoints (`src/server/routers/update-logs.ts`):
- `update-logs.summary`: Get log summary statistics (filtered by `source: "ratos-update"`)
- `update-logs.entries`: Get filtered log entries (filtered by `source: "ratos-update"`)
- `update-logs.errors`: Get only errors and warnings (filtered by `source: "ratos-update"`)
- `update-logs.contexts`: Get available log contexts (filtered by `source: "ratos-update"`)
- `update-logs.clear`: **Disabled** - Cannot clear main log file (use log rotation instead)
- `update-logs.download`: Download main log file (contains all sources)

#### REST Endpoints:
- `GET /api/update-logs/download`: Download log file as attachment

### 5. Debug Integration

Update logs are automatically included in debug packages as part of the main log file:
- Main log file (`/var/log/ratos-configurator.log`) is added to debug packages
- Rotated log files (`.1`, `.2`, etc.) are included
- All log sources (including update logs) are included in a single file
- Logs are categorized appropriately in the debug package

## Log Format

All logs follow a consistent JSON format:

```json
{
  "level": 30,
  "time": "2024-01-01T10:00:00.000Z",
  "msg": "Log message",
  "source": "ratos-update",
  "context": "update_symlinks",
  "errorCode": "SYMLINK_CREATE_FAILED",
  "pid": 1234,
  "hostname": "ratos-pi"
}
```

### Fields:
- `level`: Numeric log level (10=trace, 20=debug, 30=info, 40=warn, 50=error, 60=fatal)
- `time`: ISO 8601 timestamp
- `msg`: Human-readable log message
- `source`: Source component (e.g., "ratos-update")
- `context`: Function or operation context (optional)
- `errorCode`: Standardized error code (optional)
- `pid`: Process ID
- `hostname`: System hostname

## Error Codes

Standardized error codes help identify common issues:

### Update Script Error Codes:
- `SCRIPT_ERROR`: General script failure
- `SCRIPT_SUCCESS`: Script completed successfully
- `SYMLINK_CREATE_FAILED`: Failed to create symbolic link
- `SYMLINK_REMOVE_FAILED`: Failed to remove symbolic link
- `NODE_INSTALL_FAILED`: Node.js installation failed
- `APT_UPDATE_FAILED`: Package list update failed
- `EXTENSION_SYMLINK_FAILED`: Extension symlinking failed
- `OWNERSHIP_CHANGE_FAILED`: File ownership change failed

### System Error Codes:
- `FILE_NOT_FOUND`: Required file not found
- `PERMISSION_DENIED`: Insufficient permissions
- `NETWORK_ERROR`: Network connectivity issue
- `DISK_FULL`: Insufficient disk space

## Error Handling and Retry Logic

### Bash Scripts:
- Automatic error trapping with `set -eE`
- Stack trace capture on script failure
- Graceful error reporting with context
- Exit codes indicate success/failure status

### Web UI:
- Error boundaries prevent UI crashes
- Automatic retry with exponential backoff
- Graceful degradation when logs unavailable
- User-friendly error messages

### CLI:
- Robust error handling for missing files
- Clear error messages with suggested actions
- Non-zero exit codes for scripting

## Monitoring and Alerting

### Log Rotation:
- Automatic rotation when files exceed 10MB
- Keeps 5 backup files by default
- Configurable via environment variables

### Performance:
- Efficient JSON parsing with error recovery
- Indexed log entries for fast filtering
- Lazy loading for large log files

## Troubleshooting

### Common Issues:

**Log file not found:**
- Ensure update scripts have been run at least once
- Check `RATOS_DATA_DIR` environment variable
- Verify directory permissions

**Permission errors:**
- Ensure log directory is writable by the RatOS user
- Check file ownership and permissions
- Run scripts with appropriate privileges

**Large log files:**
- Log rotation should handle this automatically
- Manually clear logs using `ratos update-logs clear` (CLI) or web UI
- Adjust `RATOS_LOG_MAX_SIZE` if needed

**Missing log entries:**
- Check `RATOS_LOG_LEVEL` setting
- Ensure scripts are using the logging library correctly
- Verify JSON format of log entries

### Debug Commands:
```bash
# Check main log file location and size
ls -la /var/log/ratos-configurator.log*

# View raw log file (all sources)
cat /var/log/ratos-configurator.log

# View only update logs
grep '"source":"ratos-update"' /var/log/ratos-configurator.log

# Test log parsing
ratos logs update-logs summary

# Force log rotation (instead of clearing)
ratos logs rotate

# Validate bash scripts with ShellCheck
shellcheck -ax -s bash configuration/scripts/ratos-logging.sh
shellcheck -ax -s bash configuration/scripts/ratos-update.sh
```

## Development

### Adding New Log Sources:
1. Source the logging library: `source "$(dirname "$0")/ratos-logging.sh"`
2. Set up error trapping: `setup_error_trap "script-name"`
3. Use logging functions: `log_info`, `log_error`, etc.
4. Add appropriate error codes to documentation

### Code Quality Standards:
- **ShellCheck Compliance**: All bash scripts must pass ShellCheck validation
- **Error Handling**: Use proper error trapping with selective `set +e`/`set -e`
- **Variable Quoting**: Always quote variables and use `read -r` for input
- **Exit Codes**: Use proper exit code handling and propagation

### Testing:
- Unit tests in `src/__tests__/update-logs.test.ts`
- Integration tests for CLI commands
- End-to-end tests for web UI
- ShellCheck validation in CI/CD pipeline

### Contributing:
- Follow existing log format and error code conventions
- Run ShellCheck on all bash scripts before committing
- Add tests for new functionality
- Update documentation for new features
- Ensure backward compatibility

## Security Considerations

- Log files may contain sensitive information
- Automatic inclusion in debug packages with user consent
- No credentials or secrets should be logged
- File permissions restrict access to RatOS user
- Log rotation prevents unbounded disk usage

## Future Enhancements

- Real-time log streaming via WebSocket
- Log aggregation from multiple sources
- Advanced filtering and search capabilities
- Integration with external monitoring systems
- Automated error pattern detection
- Performance metrics and trending
