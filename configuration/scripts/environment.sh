#!/usr/bin/env bash

# performed outside of a function so that other scripts sourcing this in will run this by default

# Order of precedence, latter overrides former:
# 1. $envFile
# 2. $userEnvFile
# 3. Inline environment variables ie. "RATOS_USERNAME=foo ./scripts/some-script.sh"

# Get the real user (not root) when script is run with sudo

if [ -n "${SUDO_USER:-}" ] && [ "${SUDO_USER:-}" != "root" ]; then
    REAL_USER=$SUDO_USER
    REAL_HOME=$(getent passwd "$SUDO_USER" | cut -d: -f6)
elif [ "$EUID" -ne 0 ]; then
    REAL_USER=${USER:-$(whoami)}
    REAL_HOME=${HOME:-$(eval echo "/home/$REAL_USER")}
elif [ -n "${CI:-}" ] || [ -n "${GITHUB_ACTIONS:-}" ] || [ -n "${VITEST:-}" ]; then
    # In CI environment, use a safe default
    REAL_USER=${USER:-"ci-user"}
    REAL_HOME=${HOME:-"/tmp/ci-home"}
else
    REAL_USER="pi"
    REAL_HOME="/home/pi"
fi

# Only exit if we truly can't determine a user (not in CI)
if [ "$REAL_USER" = "root" ] && [ -z "${CI:-}" ] && [ -z "${GITHUB_ACTIONS:-}" ] && [ -z "${VITEST:-}" ]; then
    echo "Fatal Error: Unable to determine non-root user, please run as a normal user or use sudo, exiting..." >&2
    exit 1
fi

# Determine environment file paths based on execution context
# NEVER use sudo - this script runs in non-interactive contexts
if [ "$EUID" -eq 0 ] && [ -w "/usr/local/etc" ] 2>/dev/null; then
    # Running as root with write access to system directory
    envFile="/usr/local/etc/.ratos.env"
else
    # Non-root user or no system access - always use user directory
    envFile="${REAL_HOME}/.ratos.env.system"
fi

userEnvFile="${REAL_HOME}/.ratos.env"

# create $envFile if file does not exist using sane defaults
if [ ! -f "$envFile" ]; then
	echo "$envFile not found, determining default values..."

	# Ensure directory exists
	mkdir -p "$(dirname "$envFile")" 2>/dev/null || true

	RATOS_USER=$REAL_USER

	tee "$envFile" > /dev/null <<EOF
RATOS_USERNAME=${RATOS_USER}
RATOS_USERGROUP=${RATOS_USER}
RATOS_PRINTER_DATA_DIR=${REAL_HOME}/printer_data
MOONRAKER_DIR=${REAL_HOME}/moonraker
KLIPPER_DIR=${REAL_HOME}/klipper
KLIPPER_ENV=${REAL_HOME}/klippy-env
BEACON_DIR=${REAL_HOME}/beacon
EOF
	# Set permissions if possible (only if we can write to the file)
	if [ -w "$envFile" ]; then
		chmod a+r "$envFile" 2>/dev/null || true
	fi

	echo "Created $envFile with default values:"
	cat "$envFile" 2>/dev/null || echo "Environment file created but not readable in current context"
	echo "You can create $userEnvFile to override these values for $RATOS_USER or modify $envFile to change them for all users."
fi

profileLink="/etc/profile.d/ratos.sh"
localProfileLink="$REAL_HOME/.profile.d/ratos.sh"
# Create symlink in profile.d if directory exists
if [ -d "$REAL_HOME/.profile.d" ]; then
	if [ ! -e "$localProfileLink" ]; then
		echo "Creating shell profile symlink $localProfileLink to $envFile"
		rm -f "$localProfileLink"
		ln -s "$envFile" "$localProfileLink" || echo "Warning: Failed to create profile.d symlink"
	fi
fi
# Create symlink in system profile.d only if running as root
# NEVER use sudo - this script runs in non-interactive contexts
if [ -d "/etc/profile.d" ] && [ "$EUID" -eq 0 ] && [ -w "/etc/profile.d" ]; then
    if [ ! -e "$profileLink" ]; then
		echo "Creating shell profile symlink $profileLink to $envFile"
        rm -f "$profileLink" 2>/dev/null || true
        ln -s "$envFile" "$profileLink" 2>/dev/null || echo "Warning: Failed to create profile.d symlink"
    fi
fi

# Function to load env files
load_env() {
    local file="$1"
    if [ -f "$file" ]; then
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # Skip comments and empty lines
            [[ $key =~ ^[[:space:]]*# ]] && continue
            [[ -z "$key" ]] && continue
            
            # Only set if not already defined
            # Use eval to safely check if variable is set and non-empty
            if ! eval "[ -n \"\${${key}:-}\" ]"; then
                export "$key=$value"
            fi
        done < "$file"
    fi
}

if [ ! -f "$envFile" ] && [ ! -f "$userEnvFile" ] ; then
	echo "Fatal Error: Unable to load RatOS environment, neither $envFile nor $userEnvFile found, exiting..." >&2
	exit 1
fi
if [ -f "$envFile" ]; then
    load_env "$envFile"
fi
if [ "$EUID" -ne 0 ] && [ -f "$userEnvFile" ]; then
    load_env "$userEnvFile"
fi
