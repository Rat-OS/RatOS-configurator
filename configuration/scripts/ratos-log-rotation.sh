#!/usr/bin/env bash

# RatOS Log Rotation and Cleanup System
# Provides advanced log rotation and cleanup functionality

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Default settings
DEFAULT_MAX_SIZE="50M"
DEFAULT_MAX_AGE="30"  # days
DEFAULT_BACKUP_COUNT="5"
DEFAULT_COMPRESS="true"
DEFAULT_CLEANUP_INTERVAL="daily"

# Function to convert size string to bytes
size_to_bytes() {
    local size="$1"
    local number
    local unit
    
    # Extract number and unit
    if [[ "$size" =~ ^([0-9]+)([KMG]?)$ ]]; then
        number="${BASH_REMATCH[1]}"
        unit="${BASH_REMATCH[2]}"
    else
        echo "0"
        return 1
    fi
    
    case "$unit" in
        "K"|"k") echo $((number * 1024)) ;;
        "M"|"m") echo $((number * 1024 * 1024)) ;;
        "G"|"g") echo $((number * 1024 * 1024 * 1024)) ;;
        "") echo "$number" ;;
        *) echo "0"; return 1 ;;
    esac
}

# Function to get file size in bytes
get_file_size() {
    local file="$1"
    if [[ -f "$file" ]]; then
        stat -c%s "$file" 2>/dev/null || echo "0"
    else
        echo "0"
    fi
}

# Function to get file age in days
get_file_age_days() {
    local file="$1"
    if [[ -f "$file" ]]; then
        local file_time
        local current_time
        file_time=$(stat -c%Y "$file" 2>/dev/null || echo "0")
        current_time=$(date +%s)
        echo $(( (current_time - file_time) / 86400 ))
    else
        echo "0"
    fi
}

# Function to compress a log file
compress_log() {
    local file="$1"
    local compressed_file="${file}.gz"
    
    if [[ ! -f "$file" ]]; then
        return 1
    fi
    
    if command -v gzip >/dev/null 2>&1; then
        if gzip -c "$file" > "$compressed_file" 2>/dev/null; then
            rm -f "$file"
            echo "Compressed $file to $compressed_file"
            return 0
        else
            rm -f "$compressed_file"
            echo "Failed to compress $file" >&2
            return 1
        fi
    else
        echo "gzip not available, skipping compression" >&2
        return 1
    fi
}

# Function to rotate a single log file
rotate_log_file() {
    local log_file="$1"
    local max_size="${2:-$DEFAULT_MAX_SIZE}"
    local backup_count="${3:-$DEFAULT_BACKUP_COUNT}"
    local compress="${4:-$DEFAULT_COMPRESS}"
    
    if [[ ! -f "$log_file" ]]; then
        return 0
    fi
    
    # Convert max_size to bytes
    local max_size_bytes
    max_size_bytes=$(size_to_bytes "$max_size")
    
    # Get current file size
    local current_size
    current_size=$(get_file_size "$log_file")
    
    # Check if rotation is needed
    if [[ $current_size -le $max_size_bytes ]]; then
        return 0
    fi
    
    echo "Rotating log file $log_file (size: $current_size bytes, max: $max_size_bytes bytes)"
    
    # Rotate existing backup files
    for ((i=backup_count; i>=1; i--)); do
        local current_backup="${log_file}.$i"
        local next_backup="${log_file}.$((i+1))"
        
        # Handle compressed files
        if [[ "$compress" == "true" ]]; then
            current_backup="${current_backup}.gz"
            next_backup="${next_backup}.gz"
        fi
        
        if [[ -f "$current_backup" ]]; then
            if [[ $i -eq $backup_count ]]; then
                # Remove oldest backup
                rm -f "$current_backup"
                echo "Removed oldest backup: $current_backup"
            else
                # Move to next backup number
                mv "$current_backup" "$next_backup"
                echo "Moved $current_backup to $next_backup"
            fi
        fi
    done
    
    # Move current log to .1
    local first_backup="${log_file}.1"
    mv "$log_file" "$first_backup"
    echo "Moved $log_file to $first_backup"
    
    # Compress the backup if enabled
    if [[ "$compress" == "true" ]]; then
        compress_log "$first_backup"
    fi
    
    # Create new empty log file
    touch "$log_file"
    chmod 664 "$log_file" 2>/dev/null || true
    echo "Created new log file: $log_file"
    
    return 0
}

# Function to clean up old log files
cleanup_old_logs() {
    local log_dir="$1"
    local max_age="${2:-$DEFAULT_MAX_AGE}"
    local pattern="${3:-*.log*}"
    
    if [[ ! -d "$log_dir" ]]; then
        echo "Log directory $log_dir does not exist" >&2
        return 1
    fi
    
    echo "Cleaning up log files older than $max_age days in $log_dir"
    
    local files_removed=0
    local space_freed=0
    
    # Find and remove old files
    while IFS= read -r -d '' file; do
        local age
        age=$(get_file_age_days "$file")
        
        if [[ $age -gt $max_age ]]; then
            local size
            size=$(get_file_size "$file")
            
            if rm -f "$file"; then
                echo "Removed old log file: $file (age: $age days, size: $size bytes)"
                ((files_removed++))
                ((space_freed += size))
            else
                echo "Failed to remove: $file" >&2
            fi
        fi
    done < <(find "$log_dir" -name "$pattern" -type f -print0 2>/dev/null)
    
    if [[ $files_removed -gt 0 ]]; then
        echo "Cleanup complete: removed $files_removed files, freed $space_freed bytes"
    else
        echo "No old log files found for cleanup"
    fi
    
    return 0
}

# Function to analyze disk usage of log files
analyze_log_disk_usage() {
    local log_dir="$1"
    
    if [[ ! -d "$log_dir" ]]; then
        echo "Log directory $log_dir does not exist" >&2
        return 1
    fi
    
    echo "Log Disk Usage Analysis for $log_dir"
    echo "===================================="
    
    # Total size of all log files
    local total_size=0
    local file_count=0
    
    while IFS= read -r -d '' file; do
        local size
        size=$(get_file_size "$file")
        ((total_size += size))
        ((file_count++))
    done < <(find "$log_dir" -name "*.log*" -type f -print0 2>/dev/null)
    
    echo "Total log files: $file_count"
    echo "Total size: $total_size bytes ($(( total_size / 1024 / 1024 )) MB)"
    
    # Disk space information
    if command -v df >/dev/null 2>&1; then
        echo ""
        echo "Disk space for $log_dir:"
        df -h "$log_dir" 2>/dev/null | tail -n 1 | awk '{print "Used: " $3 " / " $2 " (" $5 ")"}'
    fi
    
    # Largest log files
    echo ""
    echo "Largest log files:"
    find "$log_dir" -name "*.log*" -type f -exec ls -lh {} \; 2>/dev/null | \
        sort -k5 -hr | head -5 | awk '{print $5 "\t" $9}'
    
    return 0
}

# Function to create logrotate configuration
create_logrotate_config() {
    local log_file="$1"
    local config_file="/etc/logrotate.d/ratos-logging"
    local max_size="${2:-$DEFAULT_MAX_SIZE}"
    local backup_count="${3:-$DEFAULT_BACKUP_COUNT}"
    local compress="${4:-$DEFAULT_COMPRESS}"
    
    echo "Creating logrotate configuration for $log_file"
    
    # Create logrotate configuration
    cat > "/tmp/ratos-logrotate.conf" << EOF
$log_file {
    size $max_size
    rotate $backup_count
    missingok
    notifempty
    create 664 root root
    $([ "$compress" == "true" ] && echo "compress")
    $([ "$compress" == "true" ] && echo "delaycompress")
    postrotate
        # Signal processes to reopen log files if needed
        systemctl reload-or-restart ratos-configurator 2>/dev/null || true
    endscript
}
EOF
    
    # Install the configuration
    if sudo mv "/tmp/ratos-logrotate.conf" "$config_file" 2>/dev/null; then
        sudo chmod 644 "$config_file"
        echo "Logrotate configuration installed at $config_file"
        
        # Test the configuration
        if sudo logrotate -d "$config_file" >/dev/null 2>&1; then
            echo "Logrotate configuration is valid"
        else
            echo "WARNING: Logrotate configuration may have issues" >&2
        fi
        
        return 0
    else
        echo "Failed to install logrotate configuration" >&2
        rm -f "/tmp/ratos-logrotate.conf"
        return 1
    fi
}

# Function to perform comprehensive log maintenance
perform_log_maintenance() {
    local log_file="${1:-/var/log/ratos-configurator.log}"
    local max_size="${2:-$DEFAULT_MAX_SIZE}"
    local max_age="${3:-$DEFAULT_MAX_AGE}"
    local backup_count="${4:-$DEFAULT_BACKUP_COUNT}"
    local compress="${5:-$DEFAULT_COMPRESS}"
    
    echo "Performing log maintenance for $log_file"
    echo "Settings: max_size=$max_size, max_age=$max_age days, backups=$backup_count, compress=$compress"
    
    local log_dir
    log_dir=$(dirname "$log_file")
    
    # Analyze current usage
    analyze_log_disk_usage "$log_dir"
    
    echo ""
    echo "Starting maintenance tasks..."
    
    # Rotate if needed
    rotate_log_file "$log_file" "$max_size" "$backup_count" "$compress"
    
    # Clean up old files
    cleanup_old_logs "$log_dir" "$max_age" "$(basename "$log_file")*"
    
    # Create/update logrotate configuration
    create_logrotate_config "$log_file" "$max_size" "$backup_count" "$compress"
    
    echo "Log maintenance completed"
}

# Export functions for use in other scripts
export -f size_to_bytes get_file_size get_file_age_days compress_log
export -f rotate_log_file cleanup_old_logs analyze_log_disk_usage
export -f create_logrotate_config perform_log_maintenance
