# Mock Update Logs Generator

This directory contains scripts to generate realistic mock update log entries for testing the Update Logs Viewer component.

## Quick Start

### Method 1: Using the Web Interface (Development Only)

1. Start the development server
2. Navigate to `/update-logs` in your browser
3. Click the "Generate Test Data" button (only visible in development mode)
4. The page will automatically refresh with the new mock data

### Method 2: Using the Standalone Script

```bash
# From the project root
node src/scripts/generate-mock-logs.js
```

This will generate mock logs to the default location (`/tmp/ratos-configurator.log` or the path specified in `LOG_FILE` environment variable).

### Method 3: Using the TypeScript Version

```bash
# From the project root (requires tsx)
npx tsx src/scripts/generate-mock-update-logs.ts
```

## What Gets Generated

The mock data generator creates realistic update log scenarios including:

### Log Levels
- **TRACE (10)**: Function entry points, debug checkpoints
- **DEBUG (20)**: Status checks, command executions, configuration reads
- **INFO (30)**: Successful operations, process starts/completions, downloads
- **WARN (40)**: Version mismatches, retries, deprecated options, low disk space
- **ERROR (50)**: Failed operations, network errors, permission issues, timeouts
- **FATAL (60)**: Critical failures, system corruption, recovery failures

### Contexts (Update Operations)
- `update_symlinks` - Symbolic link management
- `install_dependencies` - Package installations
- `update_klipper` - Klipper firmware updates
- `update_moonraker` - Moonraker API server updates
- `update_mainsail` - Mainsail web interface updates
- `update_fluidd` - Fluidd web interface updates
- `update_crowsnest` - Camera streaming service updates
- `backup_config` - Configuration backup operations
- `restart_services` - Service restart operations
- `validate_config` - Configuration validation
- `cleanup_temp` - Temporary file cleanup
- `update_firmware` - Firmware update operations

### Error Codes
- `SYMLINK_CREATE_FAILED` - Failed to create symbolic links
- `DEPENDENCY_INSTALL_FAILED` - Package installation failures
- `SERVICE_RESTART_FAILED` - Service restart failures
- `CONFIG_VALIDATION_FAILED` - Configuration validation errors
- `NETWORK_TIMEOUT` - Network operation timeouts
- `PERMISSION_DENIED` - File permission issues
- `DISK_SPACE_LOW` - Insufficient disk space
- `BACKUP_FAILED` - Backup operation failures
- `KLIPPER_MIGRATION_FAILED` - Klipper repository migration failures
- `GIT_FETCH_FAILED` - Git fetch operation failures
- `GIT_CHECKOUT_FAILED` - Git checkout operation failures
- `KLIPPER_UNCOMMITTED_CHANGES` - Uncommitted changes in Klipper repository

### Test Scenarios

The generator creates 5 different update scenarios spanning the past week:

1. **7 days ago** - Successful update
2. **5 days ago** - Failed update (with errors and warnings)
3. **3 days ago** - Successful update
4. **1 day ago** - Successful update
5. **2 hours ago** - Failed update (recent failure for testing)

Each scenario includes:
- Pre-update validation and backup steps
- Multiple component updates (Klipper, Moonraker, web interfaces, dependencies)
- Realistic timing between operations
- Debug and trace entries for detailed operations
- Warnings and errors for failed scenarios
- Service restart operations
- Final status reporting

### Additional Details

Each log entry includes:
- **Timestamp**: Realistic timing progression
- **Process ID**: Random PIDs for different operations
- **Hostname**: Variety of common RatOS hostnames (`ratos-pi`, `ratos-cb1`, etc.)
- **Source**: All entries tagged with `source: "ratos-update"`
- **Context**: Specific operation context when applicable
- **Error Code**: Standardized error codes for failures

## Testing the Update Logs Viewer

After generating mock data, you can test:

1. **Badge Display**: Verify the new single-badge format shows correct colors and counts
2. **Dark Mode**: Confirm all text is visible and properly contrasted
3. **Filtering**: Test log level, context, and max lines filters
4. **Details Toggle**: Verify error codes, PIDs, and hostnames display correctly
5. **Errors Only View**: Check that only warnings, errors, and fatal entries appear
6. **Summary Statistics**: Confirm counts and success/failure status are accurate
7. **Responsive Design**: Test on different screen sizes
8. **Interactive Features**: Verify all buttons and controls work properly

## File Structure

- `generate-mock-update-logs.ts` - TypeScript version with full type safety
- `generate-mock-logs.js` - Standalone Node.js script for quick testing
- `README-mock-logs.md` - This documentation file

## Environment Variables

The scripts respect the following environment variables:

- `LOG_FILE` - Path to the log file (defaults to `/tmp/ratos-configurator.log`)
- `NODE_ENV` - When set to `development`, enables the web interface button

## Notes

- Mock data generation is only available in development mode for security
- The generated logs follow the exact NDJSON format used by the real system
- All timestamps are realistic and properly sequenced
- The data includes both successful and failed update scenarios for comprehensive testing
