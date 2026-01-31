#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Portable script directory resolution with fallbacks
if command -v realpath >/dev/null 2>&1; then
    # Primary method: use realpath when available (preferred for accuracy)
    SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
elif command -v readlink >/dev/null 2>&1 && readlink -f /dev/null >/dev/null 2>&1; then
    # Fallback method: use readlink -f if available and functional (test with /dev/null)
    # Note: macOS and BSD systems may have readlink but without -f flag support
    SCRIPT_DIR=$( cd -- "$( dirname -- "$(readlink -f "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
else
    # Ultimate fallback: use basic dirname approach for maximum compatibility
    # Note: This may not resolve symlinks, but provides basic functionality
    SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    if [ -z "$SCRIPT_DIR" ]; then
        echo "ERROR: Unable to determine script directory. Neither realpath nor functional readlink -f is available and basic dirname failed." >&2
        exit 1
    fi
fi

# Source logging library first
# shellcheck source=configuration/scripts/ratos-logging.sh
if [ ! -f "$SCRIPT_DIR/ratos-logging.sh" ]; then
  echo "ERROR: ratos-logging.sh not found in $SCRIPT_DIR"
  exit 1
fi
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/ratos-logging.sh

# Set up error trapping and logging
setup_error_trap "klipper-fork-migration"
START_TIME=$(get_timestamp)

# Log script start
log_script_start "klipper-fork-migration.sh" "1.0.0"

# Argument parsing
SKIP_OWNERSHIP=false
for arg in "$@"; do
    case "$arg" in
        --skip-ownership)
            SKIP_OWNERSHIP=true
            ;;
    esac
done

# If skipping ownership changes, log early informational notice
if [ "$SKIP_OWNERSHIP" = true ]; then
    log_info "Proceeding without ownership changes (--skip-ownership)" "script_init"
fi

# Check if running as root (after logging is available)
if [ "$EUID" -ne 0 ]; then
    if [ "$SKIP_OWNERSHIP" = true ]; then
        # Non-root run permitted when ownership changes are skipped
        log_debug "Non-root execution allowed due to --skip-ownership" "script_init"
    else
        log_fatal "Please run as root (or use --skip-ownership)" "script_init" "PERMISSION_DENIED"
        exit 1
    fi
fi

# shellcheck source=configuration/scripts/ratos-common.sh
if [ ! -f "$SCRIPT_DIR/ratos-common.sh" ]; then
  log_fatal "ratos-common.sh not found in $SCRIPT_DIR" "script_init" "FILE_NOT_FOUND"
  exit 1
fi
# shellcheck disable=SC1091
source "$SCRIPT_DIR"/ratos-common.sh

# Ensure log completion even on early exits (fatal validations)
LOG_COMPLETED=false
trap 'EXIT_CODE=$?; if [ "$LOG_COMPLETED" = false ]; then create_log_summary "klipper-fork-migration.sh" "$START_TIME"; log_script_complete "klipper-fork-migration.sh" "$EXIT_CODE"; fi' EXIT

# Required environment variables (sourced from ratos-common.sh -> environment.sh):
# - KLIPPER_DIR: Path to the Klipper installation directory
# - RATOS_USERNAME: RatOS system user for file ownership
# - RATOS_USERGROUP: RatOS system group for file ownership
# These variables are loaded from ~/.ratos.env.system or ~/.ratos.env

# validate_required_env_var() - Reusable helper function for environment variable validation
#
# Validates that required environment variables are set and optionally performs additional
# validation checks based on the validation type specified.
#
# PARAMETERS:
#   $1 - var_name: Name of the environment variable to validate
#   $2 - validation_type: Type of additional validation to perform
#        - "basic": Only check if variable is set (default)
#        - "directory": Check if path exists and is accessible
#        - "user": Check if user exists on the system
#        - "group": Check if group exists on the system
#
# RETURN CODES:
#   0 - Success: Variable is set and passes validation
#   1 - Failure: Variable validation failed (script will exit)
#
validate_required_env_var() {
    local var_name="$1"
    local validation_type="${2:-basic}"

    # Get the variable value using indirect expansion
    local var_value
    eval "var_value=\${${var_name}:-}"

    # Check if variable is set
    if [ -z "$var_value" ]; then
        log_fatal "$var_name environment variable is not set. This should be defined in ~/.ratos.env.system" "script_init" "ENV_VAR_MISSING"
        exit 1
    fi

    # Perform additional validation based on type
    case "$validation_type" in
        "directory")
            if [ ! -d "$var_value" ]; then
                log_fatal "$var_name path does not exist: $var_value" "script_init" "${var_name}_NOT_FOUND"
                exit 1
            fi
            if [ ! -r "$var_value" ] || [ ! -x "$var_value" ]; then
                log_fatal "$var_name path is not accessible: $var_value" "script_init" "${var_name}_ACCESS_FAILED"
                exit 1
            fi
            ;;
        "user")
            if ! id "$var_value" >/dev/null 2>&1; then
                log_fatal "$var_name user does not exist on system: $var_value" "script_init" "USER_NOT_FOUND"
                exit 1
            fi
            ;;
        "group")
            if ! getent group "$var_value" >/dev/null 2>&1; then
                log_fatal "$var_name group does not exist on system: $var_value" "script_init" "GROUP_NOT_FOUND"
                exit 1
            fi
            ;;
        "basic")
            # No additional validation needed
            ;;
        *)
            log_fatal "Invalid validation type '$validation_type' for $var_name" "script_init" "INVALID_VALIDATION_TYPE"
            exit 1
            ;;
    esac

    return 0
}

# Validate required environment variables using helper function
validate_required_env_var "KLIPPER_DIR" "directory"
validate_required_env_var "RATOS_USERNAME" "user"
validate_required_env_var "RATOS_USERGROUP" "group"

# Helper function to run git commands as the correct user
run_git() {
    if [ "$EUID" -eq 0 ]; then
        (cd "$KLIPPER_DIR" && run_as_user "${RATOS_USERNAME}" git "$@")
    else
        (cd "$KLIPPER_DIR" && git "$@")
    fi
}

# Migration constants (readonly to prevent accidental modification)
readonly OFFICIAL_KLIPPER_URL="https://github.com/Klipper3d/klipper.git"
readonly RATOS_FORK_URL="https://github.com/Rat-OS/klipper.git"
readonly DEPRECATED_FORK_URLS=(
	"https://github.com/tg73/klipper.git" # tg73 fork sometimes used during development
)
readonly RATOS_FORK_REMOTE="ratos-fork"
readonly TARGET_BRANCH="ratos/v2.1.x"
readonly MOONRAKER_CONF_PATH="$SCRIPT_DIR/../moonraker.conf"

# extract_target_commit_from_moonraker() - Dynamically extracts klipper pinned_commit from moonraker.conf
#
# Parses the moonraker.conf file to locate the [update_manager klipper] section and extract
# the pinned_commit value. This ensures the migration script always uses the correct target
# commit that matches the current moonraker configuration.
#
# CONFIGURATION FILE FORMAT:
#   [update_manager klipper]
#   channel: dev
#   pinned_commit: <commit_hash>
#
# RETURN CODES:
#   0 - Success: Target commit extracted successfully
#   1 - File error: moonraker.conf file not found or not readable
#   2 - Parse error: klipper section or pinned_commit not found
#   3 - Validation error: extracted commit hash is invalid format
#
# OUTPUT:
#   Prints the extracted commit hash to stdout on success
#
extract_target_commit_from_moonraker()
{
    log_info "Extracting target commit from moonraker.conf..." "extract_commit" 1>&2

    # Check if moonraker.conf exists and is readable
    if [ ! -f "$MOONRAKER_CONF_PATH" ]; then
        log_error "moonraker.conf not found at: $MOONRAKER_CONF_PATH" "extract_commit" "MOONRAKER_CONF_NOT_FOUND" 1>&2
        return 1
    fi

    if [ ! -r "$MOONRAKER_CONF_PATH" ]; then
        log_error "moonraker.conf is not readable: $MOONRAKER_CONF_PATH" "extract_commit" "MOONRAKER_CONF_NOT_READABLE" 1>&2
        return 1
    fi

    log_info "Reading moonraker.conf from: $MOONRAKER_CONF_PATH" "extract_commit" 1>&2

    # Parse the moonraker.conf file to extract pinned_commit from [update_manager klipper] section
    # Use awk for robust parsing that handles various formatting styles
    local extracted_commit
    extracted_commit=$(awk '
        BEGIN {
            in_klipper_section = 0
            pinned_commit = ""
        }

        # Match section headers and track if we are in the klipper update_manager section
        /^\[update_manager klipper\]/ {
            in_klipper_section = 1
            next
        }

        # Reset section tracking when we encounter a new section
        /^\[/ && !/^\[update_manager klipper\]/ {
            in_klipper_section = 0
            next
        }

        # Extract pinned_commit when in the correct section
        in_klipper_section && /^pinned_commit:/ {
            # Remove "pinned_commit:" prefix and trim whitespace
            gsub(/^pinned_commit:[ \t]*/, "")
            gsub(/[ \t]*$/, "")
            pinned_commit = $0
        }

        END {
            if (pinned_commit != "") {
                print pinned_commit
            }
        }
    ' "$MOONRAKER_CONF_PATH")

    # Check if we successfully extracted a commit hash
    if [ -z "$extracted_commit" ]; then
        log_error "Could not find pinned_commit in [update_manager klipper] section" "extract_commit" "KLIPPER_PINNED_COMMIT_NOT_FOUND" 1>&2
        log_error "Please ensure moonraker.conf contains a valid [update_manager klipper] section with pinned_commit field" "extract_commit" "KLIPPER_PINNED_COMMIT_NOT_FOUND" 1>&2
        return 2
    fi

    # Validate commit hash format (40-character hexadecimal string)
    if ! echo "$extracted_commit" | grep -qE '^[a-fA-F0-9]{40}$'; then
        log_error "Invalid commit hash format: $extracted_commit" "extract_commit" "INVALID_COMMIT_HASH_FORMAT" 1>&2
        log_error "Expected 40-character hexadecimal string" "extract_commit" "INVALID_COMMIT_HASH_FORMAT" 1>&2
        return 3
    fi

    log_info "Successfully extracted target commit: $extracted_commit" "extract_commit" 1>&2
    echo "$extracted_commit"
    return 0
}

# Extract TARGET_COMMIT dynamically from moonraker.conf
TARGET_COMMIT=$(extract_target_commit_from_moonraker)
extract_result=$?

if [ $extract_result -ne 0 ]; then
    log_fatal "Failed to extract target commit from moonraker.conf (exit code $extract_result)" "script_init" "TARGET_COMMIT_EXTRACTION_FAILED"
    exit 1
fi

# Make TARGET_COMMIT readonly after successful extraction
readonly TARGET_COMMIT

# check_klipper_repository() - Validates repository state and determines migration requirements
#
# Implements strict repository state validation with comprehensive edge case handling.
# Only supported repository configurations are allowed to proceed with migration.
#
# REPOSITORY STATE LOGIC:
#   1. Official Klipper Source or Deprecated RatOS Fork Source → Proceed with Migration
#      - Repository origin points to any official Klipper URL format OR deprecated RatOS fork URL format
#      - Return 0 to indicate migration is needed
#   2. RatOS Fork at Correct Commit → Skip Migration Gracefully
#      - Repository origin points to RatOS fork URL
#      - Current HEAD points to the pinned commit AND current branch is expected branch
#      - Return 1 to indicate migration not needed (safe skip)
#   3. RatOS Fork at Different Commit → Proceed with Migration
#      - Repository origin points to RatOS fork URL
#      - Current HEAD does NOT point to pinned commit OR current branch is not expected
#      - Return 0 to indicate migration is needed to reset to correct state
#   4. Any Other Remote/Source → Fatal Error
#      - Repository origin points to unsupported URL
#      - Return 2 (fatal error) with appropriate error logging
#
# RETURN CODES:
#   0 - Migration needed: Repository requires migration to RatOS fork
#   1 - Migration not needed: Repository is already at correct RatOS fork state
#   2 - Fatal error: Repository validation failed or unsupported configuration
#
check_klipper_repository()
{
    log_info "Checking Klipper repository configuration..." "check_repository"

    if [ ! -d "$KLIPPER_DIR" ]; then
        log_error "Klipper directory not found at $KLIPPER_DIR" "check_repository" "KLIPPER_DIR_NOT_FOUND"
        return 2  # Fatal error
    fi

    if [ ! -d "$KLIPPER_DIR/.git" ]; then
        log_error "Klipper directory is not a git repository" "check_repository" "KLIPPER_NOT_GIT_REPO"
        return 2  # Fatal error
    fi

    # Get current origin URL
    local current_origin
    local git_error
    if ! git_error=$(run_git -C "$KLIPPER_DIR" remote get-url origin 2>&1); then
        log_error "Cannot get origin URL from Klipper repository" "check_repository" "GIT_REMOTE_URL_FAILED"
        log_error "Git error: $git_error" "check_repository" "GIT_REMOTE_URL_FAILED"
        return 2  # Fatal error
    fi
    current_origin="$git_error"

    log_info "Repository origin URL: $current_origin" "check_repository"

    # Define all valid official Klipper repository URL formats
    local official_urls=(
        "$OFFICIAL_KLIPPER_URL"                              # HTTPS
        "git@github.com:Klipper3d/klipper.git"              # SSH shorthand
        "ssh://git@github.com/Klipper3d/klipper.git"        # SSH protocol
        "git://github.com/Klipper3d/klipper.git"            # Git protocol
    )

    # Check if current origin is official Klipper repository
    local is_official_repo=false
    for official_url in "${official_urls[@]}"; do
        if [[ "$current_origin" == "$official_url" ]]; then
            is_official_repo=true
            break
        fi
    done

    if [[ "$is_official_repo" == true ]]; then
        # Case 1: Official Klipper Source → Proceed with Migration
        log_info "Repository is using official Klipper source, migration needed." "check_repository"
        return 0
    fi

	# Check if current origin is a deprecated RatOS fork URL
	local is_deprecated_fork=false
	for deprecated_url in "${DEPRECATED_FORK_URLS[@]}"; do
		if [[ "$current_origin" == "$deprecated_url" ]]; then
			is_deprecated_fork=true
			break
		fi
	done

	if [[ "$is_deprecated_fork" == true ]]; then
		# Case 1: Deprecated RatOS Fork Source → Proceed with Migration
		log_info "Repository is using deprecated RatOS fork source, migration needed." "check_repository"
		return 0
	fi

    # Check if current origin is RatOS fork
    if [[ "$current_origin" == "$RATOS_FORK_URL" ]]; then
        log_info "Repository is using RatOS fork, checking current state..." "check_repository"

        # Get current HEAD commit
        local current_commit
        local git_error
        if ! git_error=$(run_git -C "$KLIPPER_DIR" rev-parse HEAD 2>&1); then
            log_error "Cannot get current HEAD commit from repository" "check_repository" "GIT_HEAD_FAILED"
            log_error "Git error: $git_error" "check_repository" "GIT_HEAD_FAILED"
            return 2  # Fatal error
        fi
        current_commit="$git_error"

        # Get current branch (handle detached HEAD state)
        local current_branch
        current_branch=$(run_git -C "$KLIPPER_DIR" branch --show-current 2>/dev/null || echo "")

        log_info "Current commit: $current_commit" "check_repository"
        log_info "Current branch: ${current_branch:-"(detached HEAD)"}" "check_repository"
        log_info "Expected commit: $TARGET_COMMIT" "check_repository"
        log_info "Expected branch: $TARGET_BRANCH" "check_repository"

        # Check if repository is at correct commit and branch
        if [[ "$current_commit" == "$TARGET_COMMIT" ]] && [[ "$current_branch" == "$TARGET_BRANCH" ]]; then
            # Case 2: RatOS Fork at Correct Commit → Skip Migration Gracefully
            log_info "Repository is already at correct RatOS fork state (commit $TARGET_COMMIT on branch $TARGET_BRANCH)" "check_repository"
            log_info "Migration not needed." "check_repository"
            return 1  # Skip migration
        else
            # Case 3: RatOS Fork at Different Commit → Proceed with Migration
            log_info "Repository is using RatOS fork but not at correct state:" "check_repository"
            if [[ "$current_commit" != "$TARGET_COMMIT" ]]; then
                log_info "  - Current commit ($current_commit) differs from expected ($TARGET_COMMIT)" "check_repository"
            fi
            if [[ "$current_branch" != "$TARGET_BRANCH" ]]; then
                log_info "  - Current branch (${current_branch:-"detached HEAD"}) differs from expected ($TARGET_BRANCH)" "check_repository"
            fi
            log_info "Migration needed to reset to correct state." "check_repository"
            return 0
        fi
    fi

    # Case 4: Any Other Remote/Source → Fatal Error
    log_error "Repository is using an unsupported remote source. Only official Klipper or RatOS fork repositories are supported." "check_repository" "UNSUPPORTED_REPOSITORY_SOURCE"
    log_error "Current origin URL: $current_origin" "check_repository" "UNSUPPORTED_REPOSITORY_SOURCE"
    log_error "Supported sources:" "check_repository" "UNSUPPORTED_REPOSITORY_SOURCE"
    log_error "  - Official Klipper: ${official_urls[*]}" "check_repository" "UNSUPPORTED_REPOSITORY_SOURCE"
    log_error "  - RatOS Fork: $RATOS_FORK_URL" "check_repository" "UNSUPPORTED_REPOSITORY_SOURCE"
    return 2  # Fatal error
}

# check_uncommitted_changes() - Validates repository working directory state
#
# Checks for staged and unstaged changes that would prevent safe migration.
# Uses Git plumbing commands for reliable detection of repository state.
#
# RETURN CODES:
#   0 - Success: No uncommitted changes found, migration can proceed
#   2 - Directory access error: Cannot access Klipper directory
#   3 - Uncommitted changes error: Staged or unstaged changes prevent migration
#
check_uncommitted_changes()
{
    log_info "Checking for uncommitted changes..." "check_changes"

    cd "$KLIPPER_DIR" || {
        log_error "Cannot change to Klipper directory" "check_changes" "KLIPPER_DIR_ACCESS_FAILED"
        return 2  # Directory access error
    }

    # Check for staged changes (index vs HEAD) using Git plumbing commands
    if ! run_git diff-index --cached --quiet HEAD --; then
        log_error "There are staged changes in the Klipper repository." "check_changes" "KLIPPER_STAGED_CHANGES"
        log_error "Please commit or stash these changes before running migration." "check_changes" "KLIPPER_STAGED_CHANGES"

        # Get list of staged files for error reporting
        local staged_files
        staged_files=$(run_git diff-index --cached --name-only HEAD -- | tr '\n' ' ')
        log_error "Staged files: $staged_files" "check_changes" "KLIPPER_STAGED_CHANGES"
        return 3  # Uncommitted changes error
    fi

    # Check for unstaged changes (working directory vs index) using Git plumbing commands
    if ! run_git diff-index --quiet HEAD --; then
        log_error "There are uncommitted changes in the Klipper repository." "check_changes" "KLIPPER_UNCOMMITTED_CHANGES"
        log_error "Please commit or stash these changes before running migration." "check_changes" "KLIPPER_UNCOMMITTED_CHANGES"

        # Get list of modified files for error reporting
        local modified_files
        modified_files=$(run_git diff-index --name-only HEAD -- | tr '\n' ' ')
        log_error "Modified files: $modified_files" "check_changes" "KLIPPER_UNCOMMITTED_CHANGES"
        return 3  # Uncommitted changes error
    fi

    log_info "No uncommitted changes found." "check_changes"
    return 0
}

handle_existing_remote()
{
    log_info "Checking for existing RatOS fork remote..." "handle_remote"

    cd "$KLIPPER_DIR" || {
        log_error "Cannot change to Klipper directory" "handle_remote" "KLIPPER_DIR_ACCESS_FAILED"
        return 1
    }

    # Cache the remote URL to avoid multiple git subprocess calls
    local existing_url
    existing_url=$(run_git remote get-url "$RATOS_FORK_REMOTE" 2>/dev/null || true)

    # Check if ratos-fork remote already exists
    if [ -n "$existing_url" ]; then
        if [ "$existing_url" != "$RATOS_FORK_URL" ]; then
            log_warn "Remote '$RATOS_FORK_REMOTE' exists but points to different URL:" "handle_remote" "REMOTE_URL_MISMATCH"
            log_warn "  Current: $existing_url" "handle_remote" "REMOTE_URL_MISMATCH"
            log_warn "  Expected: $RATOS_FORK_URL" "handle_remote" "REMOTE_URL_MISMATCH"
            log_info "Updating remote URL..." "handle_remote"

            if ! execute_with_logging "handle_remote" "GIT_REMOTE_UPDATE_FAILED" run_git remote set-url "$RATOS_FORK_REMOTE" "$RATOS_FORK_URL"; then
                log_error "Failed to update remote URL" "handle_remote" "GIT_REMOTE_UPDATE_FAILED"
                return 1
            fi
            log_info "Remote URL updated successfully." "handle_remote"
        else
            log_info "Remote '$RATOS_FORK_REMOTE' already exists with correct URL." "handle_remote"
        fi
    else
        log_info "Adding RatOS fork remote..." "handle_remote"
        if ! execute_with_logging "handle_remote" "GIT_REMOTE_ADD_FAILED" run_git remote add "$RATOS_FORK_REMOTE" "$RATOS_FORK_URL"; then
            log_error "Failed to add RatOS fork remote" "handle_remote" "GIT_REMOTE_ADD_FAILED"
            return 1
        fi
        log_info "RatOS fork remote added successfully." "handle_remote"
    fi

    return 0
}

fetch_ratos_fork()
{
    log_info "Fetching from RatOS fork..." "fetch_fork"

    cd "$KLIPPER_DIR" || {
        log_error "Cannot change to Klipper directory" "fetch_fork" "KLIPPER_DIR_ACCESS_FAILED"
        return 1
    }

    # Attempt to fetch with retries
    local max_retries=3
    local retry_count=0

    while [ $retry_count -lt $max_retries ]; do
        if execute_with_logging "fetch_fork" "GIT_FETCH_FAILED" run_git fetch "$RATOS_FORK_REMOTE"; then
            log_info "Successfully fetched from RatOS fork." "fetch_fork"
            return 0
        else
            retry_count=$((retry_count + 1))
            log_warn "Fetch attempt $retry_count failed." "fetch_fork" "GIT_FETCH_RETRY"
            if [ $retry_count -lt $max_retries ]; then
                log_info "Retrying in 5 seconds..." "fetch_fork"
                sleep 5
            fi
        fi
    done

    log_error "Failed to fetch from RatOS fork after $max_retries attempts" "fetch_fork" "GIT_FETCH_FAILED"
    log_error "Please check your network connection and try again." "fetch_fork" "NETWORK_ERROR"
    return 1
}

checkout_target_branch()
{
    log_info "Checking out target branch..." "checkout_branch"

    # Track if we created a temporary branch for cleanup
    local temp_branch=""
    local created_temp_branch=false

    # Shared cleanup function for temporary branches (called on error paths)
    cleanup_temp_branch_on_error() {
        if [ "$created_temp_branch" = true ] && [ -n "$temp_branch" ]; then
            log_info "Cleaning up temporary migration branch due to error: $temp_branch" "checkout_branch"
            if run_git -C "$KLIPPER_DIR" branch -D "$temp_branch" >/dev/null 2>&1; then
                log_info "Successfully cleaned up temporary branch: $temp_branch" "checkout_branch" "GIT_TEMP_BRANCH_CLEANUP"
            else
                log_warn "Failed to clean up temporary branch: $temp_branch (this is not critical)" "checkout_branch" "GIT_TEMP_BRANCH_CLEANUP_FAILED"
            fi
        fi
    }

    # Set up function-level ERR trap for unexpected failures (signals, unhandled command failures)
    # This provides additional safety beyond explicit cleanup calls on known error paths
    trap 'cleanup_temp_branch_on_error' ERR

    # Check if we're in detached HEAD state
    if ! run_git -C "$KLIPPER_DIR" symbolic-ref HEAD >/dev/null 2>&1; then
        log_info "Repository is in detached HEAD state." "checkout_branch"
        log_info "Creating and checking out a temporary branch..." "checkout_branch"
        temp_branch="temp-migration-$(date +%s)-$$"
        if ! execute_with_logging "checkout_branch" "GIT_TEMP_BRANCH_FAILED" run_git -C "$KLIPPER_DIR" checkout -b "$temp_branch"; then
            log_error "Failed to create temporary branch" "checkout_branch" "GIT_TEMP_BRANCH_FAILED"
            cleanup_temp_branch_on_error
            return 1
        fi
        created_temp_branch=true
    fi

    # Check if target branch already exists locally
    if run_git -C "$KLIPPER_DIR" show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
        log_info "Local branch '$TARGET_BRANCH' already exists, switching to it..." "checkout_branch"
        if ! execute_with_logging "checkout_branch" "GIT_CHECKOUT_FAILED" run_git -C "$KLIPPER_DIR" checkout "$TARGET_BRANCH"; then
            log_error "Failed to checkout existing branch '$TARGET_BRANCH'" "checkout_branch" "GIT_CHECKOUT_FAILED"
            cleanup_temp_branch_on_error
            return 1
        fi
    else
        log_info "Creating and checking out branch '$TARGET_BRANCH' from RatOS fork..." "checkout_branch"
        if ! execute_with_logging "checkout_branch" "GIT_CHECKOUT_REMOTE_FAILED" run_git -C "$KLIPPER_DIR" checkout -b "$TARGET_BRANCH" "$RATOS_FORK_REMOTE/$TARGET_BRANCH"; then
            log_error "Failed to checkout branch '$TARGET_BRANCH' from RatOS fork" "checkout_branch" "GIT_CHECKOUT_REMOTE_FAILED"
            log_error "Please ensure the branch exists on the remote repository." "checkout_branch" "GIT_CHECKOUT_REMOTE_FAILED"
            cleanup_temp_branch_on_error
            return 1
        fi
    fi

    # Clean up temporary branch if we created one (successful completion)
    if [ "$created_temp_branch" = true ] && [ -n "$temp_branch" ]; then
        log_info "Cleaning up temporary migration branch: $temp_branch" "checkout_branch"
        if execute_with_logging "checkout_branch" "GIT_TEMP_BRANCH_CLEANUP" run_git -C "$KLIPPER_DIR" branch -D "$temp_branch"; then
            log_info "Successfully cleaned up temporary branch: $temp_branch" "checkout_branch"
        else
            log_warn "Failed to clean up temporary branch: $temp_branch (this is not critical)" "checkout_branch" "GIT_TEMP_BRANCH_CLEANUP_FAILED"
        fi
    fi

    # Clear the ERR trap since we're completing successfully
    trap - ERR

    log_info "Successfully checked out branch '$TARGET_BRANCH'." "checkout_branch"
    return 0
}

reset_to_target_commit()
{
    log_info "Resetting to target commit..." "reset_commit"

    cd "$KLIPPER_DIR" || {
        log_error "Cannot change to Klipper directory" "reset_commit" "KLIPPER_DIR_ACCESS_FAILED"
        return 1
    }

    # Verify the target commit exists
    if ! run_git cat-file -e "$TARGET_COMMIT" 2>/dev/null; then
        log_error "Target commit '$TARGET_COMMIT' not found in repository" "reset_commit" "GIT_COMMIT_NOT_FOUND"
        log_error "Please ensure the commit exists and try again." "reset_commit" "GIT_COMMIT_NOT_FOUND"
        return 1
    fi

    # Reset to target commit
    if ! execute_with_logging "reset_commit" "GIT_RESET_FAILED" run_git reset --hard "$TARGET_COMMIT"; then
        log_error "Failed to reset to target commit '$TARGET_COMMIT'" "reset_commit" "GIT_RESET_FAILED"
        return 1
    fi

    log_info "Successfully reset to commit '$TARGET_COMMIT'." "reset_commit"

    # Set upstream tracking
    if ! execute_with_logging "reset_commit" "GIT_UPSTREAM_SET_FAILED" run_git branch --set-upstream-to="$RATOS_FORK_REMOTE/$TARGET_BRANCH" "$TARGET_BRANCH"; then
        log_warn "Failed to set upstream tracking, but migration completed successfully." "reset_commit" "GIT_UPSTREAM_SET_FAILED"
    else
        log_info "Upstream tracking set to '$RATOS_FORK_REMOTE/$TARGET_BRANCH'." "reset_commit"
    fi

    return 0
}

fix_klipper_ownership()
{
    log_info "Ensuring Klipper directory ownership..." "fix_ownership"

    local ownership_mismatch
    ownership_mismatch=$(find "$KLIPPER_DIR" \( \! -user "$RATOS_USERNAME" -o \! -group "$RATOS_USERGROUP" \) -quit)

    if [ "$SKIP_OWNERSHIP" = true ]; then
        if [ -n "$ownership_mismatch" ]; then
            log_warn "Ownership mismatch detected; skipping fix due to --skip-ownership" "fix_ownership" "OWNERSHIP_MISMATCH_SKIPPED"
        else
            log_info "Ownership already correct; no changes needed (--skip-ownership)" "fix_ownership"
        fi
        return 0
    fi

    if [ -n "$ownership_mismatch" ]; then
        if execute_with_logging "fix_ownership" "OWNERSHIP_CHANGE_FAILED" chown -R "$RATOS_USERNAME:$RATOS_USERGROUP" "$KLIPPER_DIR"; then
            log_info "Klipper directory ownership has been set to $RATOS_USERNAME:$RATOS_USERGROUP." "fix_ownership"
        else
            log_error "Failed to set Klipper directory ownership" "fix_ownership" "OWNERSHIP_CHANGE_FAILED"
            return 1
        fi
    else
        log_info "Klipper directory ownership already set correctly." "fix_ownership"
    fi

    return 0
}

# migrate_klipper_repository() - Main migration orchestration function
#
# This function coordinates the complete Klipper repository migration process from the
# original Klipper repository to the RatOS fork. It performs all necessary validation,
# setup, and migration steps in a specific order to ensure a safe and reliable migration.
#
# RETURN CODES:
#   0 - Success: Migration completed successfully or was not needed
#   2 - Fatal repository check error: Repository validation failed critically
#       - Repository is not a Git repository
#       - Repository directory is inaccessible
#       - Other critical repository state issues
#   3 - Uncommitted changes error: Repository has uncommitted changes that prevent migration
#       - Staged changes exist in the repository
#       - Modified files exist in the working directory
#       - User must commit or stash changes before migration
#   4 - Remote setup error: Failed to configure the RatOS fork remote
#       - Unable to add new remote
#       - Failed to update existing remote URL
#       - Git remote operations failed
#   5 - Fetch error: Failed to fetch from the RatOS fork remote
#       - Network connectivity issues
#       - Remote repository is inaccessible
#       - Authentication problems
#       - All retry attempts exhausted
#   6 - Checkout error: Failed to checkout the target branch
#       - Target branch doesn't exist on remote
#       - Git checkout operations failed
#       - Repository is in an inconsistent state
#   7 - Reset error: Failed to reset to the target commit
#       - Target commit doesn't exist
#       - Git reset operations failed
#       - Unable to set upstream tracking
#   8 - Ownership error: Failed to fix file ownership
#       - Insufficient permissions to change ownership
#       - Invalid user or group specified
#       - File system errors during ownership change
#
# DEPENDENCIES:
#   - check_klipper_repository(): Validates repository state
#   - check_uncommitted_changes(): Ensures clean working directory
#   - handle_existing_remote(): Configures RatOS fork remote
#   - fetch_ratos_fork(): Downloads latest changes from RatOS fork
#   - checkout_target_branch(): Switches to target branch
#   - reset_to_target_commit(): Resets to specific commit
#   - fix_klipper_ownership(): Ensures proper file ownership
#
# ENVIRONMENT VARIABLES REQUIRED:
#   - KLIPPER_DIR: Path to Klipper installation directory
#   - TARGET_BRANCH: Branch name to migrate to
#   - TARGET_COMMIT: Specific commit hash to reset to
#   - RATOS_FORK_REMOTE: Name of the RatOS fork remote
#   - RATOS_FORK_URL: URL of the RatOS fork repository
#   - RATOS_USERNAME: System username for ownership
#   - RATOS_USERGROUP: System group for ownership
#
# USAGE:
#   migrate_klipper_repository
#   exit_code=$?
#   if [ $exit_code -ne 0 ]; then
#       echo "Migration failed with exit code: $exit_code"
#   fi
#
migrate_klipper_repository()
{
    log_info "Starting Klipper repository migration to RatOS fork..." "migrate_repository"

    # Check if migration is needed
    local check_result
    check_klipper_repository || check_result=$?
    check_result=${check_result:-0}

    if [ "$check_result" -eq 1 ]; then
        # Migration not needed (safe skip)
        log_info "Migration not needed, skipping." "migrate_repository"
        return 0
    elif [ "$check_result" -eq 2 ]; then
        # Fatal error occurred
        log_error "Fatal error during repository check" "migrate_repository" "REPOSITORY_CHECK_FAILED"
        return 2
    fi

    # Check for uncommitted changes
    local code
    check_uncommitted_changes || code=$?
    code=${code:-0}
    if [ "$code" -eq 2 ]; then
        # Directory access error
        log_error "Cannot access Klipper directory for uncommitted changes check" "migrate_repository" "KLIPPER_DIR_ACCESS_FAILED"
        return 2
    elif [ "$code" -eq 3 ]; then
        # Uncommitted changes detected
        log_error "Uncommitted changes prevent migration" "migrate_repository" "KLIPPER_UNCOMMITTED_CHANGES"
        return 3
    fi

    # Handle existing remote
    handle_existing_remote || code=$?
    code=${code:-0}
    if [ "$code" -ne 0 ]; then
        log_error "Failed to handle existing remote (exit code $code)" "migrate_repository" "REMOTE_SETUP_FAILED"
        return 4
    fi

    # Fetch from RatOS fork
    fetch_ratos_fork || code=$?
    code=${code:-0}
    if [ "$code" -ne 0 ]; then
        log_error "Failed to fetch from RatOS fork (exit code $code)" "migrate_repository" "FETCH_FAILED"
        return 5
    fi

    # Checkout target branch
    checkout_target_branch || code=$?
    code=${code:-0}
    if [ "$code" -ne 0 ]; then
        log_error "Failed to checkout target branch (exit code $code)" "migrate_repository" "CHECKOUT_FAILED"
        return 6
    fi

    # Reset to target commit
    reset_to_target_commit || code=$?
    code=${code:-0}
    if [ "$code" -ne 0 ]; then
        log_error "Failed to reset to target commit (exit code $code)" "migrate_repository" "RESET_FAILED"
        return 7
    fi

    # Fix ownership
    fix_klipper_ownership || code=$?
    code=${code:-0}
    if [ "$code" -ne 0 ]; then
        log_error "Failed to fix ownership (exit code $code)" "migrate_repository" "OWNERSHIP_FAILED"
        return 8
    fi

    log_info "Klipper repository migration completed successfully!" "migrate_repository"
    log_info "Repository is now using RatOS fork at commit $TARGET_COMMIT" "migrate_repository"
    log_info "Branch: $TARGET_BRANCH" "migrate_repository"
    log_info "Remote: $RATOS_FORK_URL" "migrate_repository"

    return 0
}

# Main execution
migrate_klipper_repository || code=$?
code=${code:-0}

# Create log summary and complete
create_log_summary "klipper-fork-migration.sh" "$START_TIME"
log_script_complete "klipper-fork-migration.sh" "$code"
LOG_COMPLETED=true

if [ "$code" -ne 0 ]; then
    log_error "Klipper repository migration failed (exit code $code)!" "main" "KLIPPER_MIGRATION_FAILED"
    exit "$code"
fi

log_info "Klipper repository migration script completed successfully" "main"
exit 0
