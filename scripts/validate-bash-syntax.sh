#!/bin/bash

# validate-bash-syntax.sh - Standalone bash script syntax validation tool
#
# This script provides comprehensive bash script syntax validation with parallel processing
# for improved performance. It can be used in CI workflows, local development, and other
# automation contexts.
#
# FEATURES:
# - Discovers bash scripts (.sh files and files with bash shebangs)
# - Parallel validation using xargs -P for optimal performance
# - Comprehensive error reporting with clear output formatting
# - Configurable exclusion patterns and parallel processing limits
# - Works from any directory (automatically detects repository root)
# - Supports both CI and local development workflows
#
# USAGE:
#   ./scripts/validate-bash-syntax.sh [OPTIONS]
#
# OPTIONS:
#   -h, --help              Show this help message
#   -p, --max-parallel N    Maximum parallel processes (default: auto-detect, max 8)
#   -d, --directory DIR     Directory to validate (default: repository root)
#   -e, --exclude PATTERN   Additional exclusion pattern (can be used multiple times)
#   -v, --verbose           Enable verbose output
#   -q, --quiet             Suppress progress indicators (errors still shown)
#
# EXIT CODES:
#   0 - All scripts passed validation or no scripts found
#   1 - One or more scripts failed syntax validation
#   2 - Script execution error (invalid arguments, missing dependencies, etc.)
#
# EXAMPLES:
#   ./scripts/validate-bash-syntax.sh                    # Validate all scripts in repository
#   ./scripts/validate-bash-syntax.sh -p 4              # Use max 4 parallel processes
#   ./scripts/validate-bash-syntax.sh -d ./config       # Validate only scripts in config directory
#   ./scripts/validate-bash-syntax.sh -e "*/test/*"     # Exclude additional test directory
#   ./scripts/validate-bash-syntax.sh -q                # Quiet mode for CI integration
#

set -euo pipefail

# Script metadata
readonly SCRIPT_NAME="validate-bash-syntax.sh"
readonly SCRIPT_VERSION="1.0.0"

# Default configuration
DEFAULT_MAX_PARALLEL=0  # 0 means auto-detect
DEFAULT_DIRECTORY=""    # Empty means auto-detect repository root
DEFAULT_EXCLUSIONS=(
    "*/node_modules/*"
    "*/.git/*"
    "./.augment/*"
)
VERBOSE=false
QUIET=false

# Global variables
MAX_PARALLEL=$DEFAULT_MAX_PARALLEL
VALIDATION_DIRECTORY="$DEFAULT_DIRECTORY"
EXCLUSIONS=("${DEFAULT_EXCLUSIONS[@]}")

# Color codes for output formatting
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() {
    if [[ "$QUIET" != true ]]; then
        echo -e "${BLUE}ℹ️  $1${NC}"
    fi
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# shellcheck disable=SC2317  # Function may be used conditionally or in future features
log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}" >&2
}

log_verbose() {
    if [[ "$VERBOSE" == true ]]; then
        echo -e "${BLUE}🔍 $1${NC}"
    fi
}

# Help function
show_help() {
    cat << EOF
$SCRIPT_NAME v$SCRIPT_VERSION - Bash Script Syntax Validation Tool

USAGE:
    $SCRIPT_NAME [OPTIONS]

DESCRIPTION:
    Validates bash script syntax with parallel processing for optimal performance.
    Automatically discovers .sh files and files with bash shebangs, excluding
    common directories like node_modules, .git, and .augment.

OPTIONS:
    -h, --help              Show this help message and exit
    -p, --max-parallel N    Maximum parallel processes (default: auto-detect, max 8)
    -d, --directory DIR     Directory to validate (default: repository root)
    -e, --exclude PATTERN   Additional exclusion pattern (can be used multiple times)
    -v, --verbose           Enable verbose output for debugging
    -q, --quiet             Suppress progress indicators (errors still shown)

EXIT CODES:
    0 - All scripts passed validation or no scripts found
    1 - One or more scripts failed syntax validation
    2 - Script execution error (invalid arguments, missing dependencies, etc.)

EXAMPLES:
    $SCRIPT_NAME                           # Validate all scripts in repository
    $SCRIPT_NAME -p 4                      # Use max 4 parallel processes
    $SCRIPT_NAME -d ./configuration        # Validate only scripts in configuration directory
    $SCRIPT_NAME -e "*/test/*"             # Exclude additional test directory
    $SCRIPT_NAME -q                        # Quiet mode for CI integration
    $SCRIPT_NAME -v -p 2                   # Verbose mode with 2 parallel processes

INTEGRATION:
    CI Workflows:     Use -q flag for clean CI output
    Pre-commit:       Add to .git/hooks/pre-commit
    Local Dev:        Run without flags for full interactive output
    Custom Scripts:   Check exit code for automation integration

EOF
}

# Parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -p|--max-parallel)
                if [[ -z "${2:-}" ]] || [[ "$2" =~ ^- ]]; then
                    log_error "Option $1 requires a numeric argument"
                    exit 2
                fi
                if ! [[ "$2" =~ ^[0-9]+$ ]] || [[ "$2" -lt 1 ]]; then
                    log_error "Max parallel processes must be a positive integer, got: $2"
                    exit 2
                fi
                MAX_PARALLEL="$2"
                shift 2
                ;;
            -d|--directory)
                if [[ -z "${2:-}" ]] || [[ "$2" =~ ^- ]]; then
                    log_error "Option $1 requires a directory argument"
                    exit 2
                fi
                if [[ ! -d "$2" ]]; then
                    log_error "Directory does not exist: $2"
                    exit 2
                fi
                VALIDATION_DIRECTORY="$2"
                shift 2
                ;;
            -e|--exclude)
                if [[ -z "${2:-}" ]] || [[ "$2" =~ ^- ]]; then
                    log_error "Option $1 requires a pattern argument"
                    exit 2
                fi
                EXCLUSIONS+=("$2")
                shift 2
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            -q|--quiet)
                QUIET=true
                shift
                ;;
            -*)
                log_error "Unknown option: $1"
                log_error "Use -h or --help for usage information"
                exit 2
                ;;
            *)
                log_error "Unexpected argument: $1"
                log_error "Use -h or --help for usage information"
                exit 2
                ;;
        esac
    done
}

# Detect repository root directory
detect_repository_root() {
    local current_dir="$PWD"
    
    # Try to find .git directory by walking up the directory tree
    while [[ "$current_dir" != "/" ]]; do
        if [[ -d "$current_dir/.git" ]]; then
            echo "$current_dir"
            return 0
        fi
        current_dir="$(dirname "$current_dir")"
    done
    
    # If no .git found, use current directory
    echo "$PWD"
}

# Set up validation directory
setup_validation_directory() {
    if [[ -z "$VALIDATION_DIRECTORY" ]]; then
        VALIDATION_DIRECTORY="$(detect_repository_root)"
        log_verbose "Auto-detected repository root: $VALIDATION_DIRECTORY"
    else
        # Convert to absolute path
        VALIDATION_DIRECTORY="$(cd "$VALIDATION_DIRECTORY" && pwd)"
        log_verbose "Using specified directory: $VALIDATION_DIRECTORY"
    fi
    
    if [[ ! -d "$VALIDATION_DIRECTORY" ]]; then
        log_error "Validation directory does not exist: $VALIDATION_DIRECTORY"
        exit 2
    fi
    
    if [[ ! -r "$VALIDATION_DIRECTORY" ]]; then
        log_error "Validation directory is not readable: $VALIDATION_DIRECTORY"
        exit 2
    fi
}

# Determine optimal parallelism
setup_parallelism() {
    if [[ "$MAX_PARALLEL" -eq 0 ]]; then
        # Auto-detect number of CPU cores
        if command -v nproc >/dev/null 2>&1; then
            MAX_PARALLEL=$(nproc)
        elif command -v sysctl >/dev/null 2>&1; then
            # macOS fallback
            MAX_PARALLEL=$(sysctl -n hw.ncpu 2>/dev/null || echo 2)
        else
            # Conservative fallback
            MAX_PARALLEL=2
        fi

        # Cap at 8 to avoid overwhelming systems
        if [[ "$MAX_PARALLEL" -gt 8 ]]; then
            MAX_PARALLEL=8
        fi

        log_verbose "Auto-detected parallelism: $MAX_PARALLEL processes"
    else
        log_verbose "Using specified parallelism: $MAX_PARALLEL processes"
    fi
}

# Build find exclusion arguments
build_exclusion_args() {
    local exclusion_args=()

    for pattern in "${EXCLUSIONS[@]}"; do
        exclusion_args+=("-not" "-path" "$pattern")
    done

    printf '%s\n' "${exclusion_args[@]}"
}

# Discover bash scripts in the validation directory
discover_bash_scripts() {
    local bash_files=()
    local exclusion_args

    # Build exclusion arguments (redirect to stderr to avoid mixing with output)
    readarray -t exclusion_args < <(build_exclusion_args)

    # Log to stderr to avoid mixing with file list output
    log_info "Finding bash scripts in: $VALIDATION_DIRECTORY" >&2
    log_verbose "Using exclusion patterns: ${EXCLUSIONS[*]}" >&2

    # Find all .sh files
    while IFS= read -r -d '' file; do
        bash_files+=("$file")
    done < <(find "$VALIDATION_DIRECTORY" -name "*.sh" -type f "${exclusion_args[@]}" -print0 2>/dev/null)

    log_verbose "Found ${#bash_files[@]} .sh files" >&2

    # Find files with bash shebangs (excluding .sh files already found)
    while IFS= read -r -d '' file; do
        # Skip if it's already a .sh file
        if [[ "$file" != *.sh ]]; then
            bash_files+=("$file")
        fi
    done < <(find "$VALIDATION_DIRECTORY" -type f -not -name "*.*" "${exclusion_args[@]}" -exec grep -q "^#!/bin/bash\|^#!/usr/bin/env bash" {} \; -print0 2>/dev/null)

    log_verbose "Total bash scripts discovered: ${#bash_files[@]}" >&2

    # Return the array by printing each element on a separate line to stdout
    printf '%s\n' "${bash_files[@]}"
}

# Validation function for individual scripts (used by xargs)
# shellcheck disable=SC2317  # Function is called indirectly via xargs and export -f
validate_script() {
    local script="$1"
    local results_file="$2"
    local errors_file="$3"
    local output_dir="$4"

    # Make paths relative to validation directory for cleaner output
    local display_path="${script#"$VALIDATION_DIRECTORY"/}"
    if [[ "$display_path" == "$script" ]]; then
        display_path="$script"  # Keep absolute path if not under validation directory
    fi

    # Create a unique output file for this validation to avoid intermingled output
    local script_hash
    script_hash=$(echo "$script" | sha256sum | cut -d' ' -f1)
    local output_file="$output_dir/validation_$script_hash.out"

    # Capture all output for this script validation
    {
        if [[ "$QUIET" != true ]]; then
            echo "🔍 Checking syntax of: $display_path"
        fi

        if bash -n "$script" 2>/dev/null; then
            if [[ "$QUIET" != true ]]; then
                echo "✅ $display_path - syntax OK"
            fi
            echo "$script:OK" >> "$results_file"
        else
            echo "❌ $display_path - syntax ERROR:"
            bash -n "$script" 2>&1 | sed 's/^/    /'
            echo "$script:ERROR" >> "$results_file"
            echo "$script" >> "$errors_file"
        fi

        if [[ "$QUIET" != true ]]; then
            echo
        fi
    } > "$output_file"

    # Immediately display the results for real-time feedback
    # This provides responsive user experience while maintaining organized output per script
    cat "$output_file"
}

# Main validation function
validate_bash_scripts() {
    local bash_files=()

    # Discover bash scripts
    readarray -t bash_files < <(discover_bash_scripts)

    if [[ ${#bash_files[@]} -eq 0 ]]; then
        log_info "No bash scripts found in the validation directory - skipping syntax validation"
        log_info "This is normal for directories that don't contain shell scripts."
        return 0
    fi

    log_info "Found ${#bash_files[@]} bash script(s) to validate:"
    if [[ "$VERBOSE" == true ]]; then
        for script in "${bash_files[@]}"; do
            local display_path="${script#"$VALIDATION_DIRECTORY"/}"
            echo "  - $display_path"
        done
        echo
    fi

    # Create temporary files and directory for results
    local validation_results
    local validation_errors
    local output_dir
    validation_results=$(mktemp)
    validation_errors=$(mktemp)
    output_dir=$(mktemp -d)

    # Note: Cleanup will be handled manually to avoid trap interference with exit codes

    # Export the validation function for xargs
    export -f validate_script
    export VALIDATION_DIRECTORY
    export QUIET

    log_info "Running validation in parallel (max $MAX_PARALLEL processes)..."
    if [[ "$QUIET" != true ]]; then
        echo
    fi

    # Run validation in parallel using xargs
    # Each validate_script() call will immediately display its results for real-time feedback
    printf '%s\n' "${bash_files[@]}" | xargs -I {} -P "$MAX_PARALLEL" bash -c 'validate_script "$@"' _ {} "$validation_results" "$validation_errors" "$output_dir"

    # Read results and count failures
    local failed_count=0
    if [[ -f "$validation_errors" ]]; then
        failed_count=$(wc -l < "$validation_errors" 2>/dev/null || echo 0)
    fi

    # Report final results
    if [[ "$failed_count" -eq 0 ]]; then
        log_success "All bash scripts passed syntax validation!"
        # Cleanup temporary files and directory
        rm -f "$validation_results" "$validation_errors"
        rm -rf "$output_dir"
        return 0
    else
        log_error "$failed_count script(s) failed syntax validation:"
        if [[ -f "$validation_errors" ]]; then
            while IFS= read -r failed_script; do
                local display_path="${failed_script#"$VALIDATION_DIRECTORY"/}"
                echo "  - $display_path"
            done < "$validation_errors"
        fi
        echo
        log_error "Please fix the syntax errors in the above scripts before proceeding."
        # Cleanup temporary files and directory
        rm -f "$validation_results" "$validation_errors"
        rm -rf "$output_dir"
        return 1
    fi
}

# Main execution function
main() {
    # Parse command line arguments
    parse_arguments "$@"

    # Setup validation environment
    setup_validation_directory
    setup_parallelism

    # Change to validation directory
    cd "$VALIDATION_DIRECTORY"

    # Run validation and propagate exit code
    validate_bash_scripts
    return $?
}

# Execute main function with all arguments and exit with its return code
main "$@"
exit $?
