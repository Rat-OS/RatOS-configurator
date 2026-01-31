#!/usr/bin/env bash

# Check for root privileges
if [ "$EUID" -ne 0 ]; then 
    echo "ERROR: Please run as root"
    exit 1
fi

# Check for the hostname parameter
if [ "$#" -ne 1 ]; then 
    echo "Usage: $0 <new-hostname>"
    exit 1
fi

NEW_HOSTNAME="$1"

# 1. Attempt to set the system hostname
if hostnamectl set-hostname "$NEW_HOSTNAME"; then
    # 2. Update /etc/hosts 
    # We target 127.0.1.1 which is the Debian standard for the system's own name.
    if grep -q "^127.0.1.1" /etc/hosts; then
        sed -i "s/^127.0.1.1.*/127.0.1.1\t$NEW_HOSTNAME/g" /etc/hosts
        echo "Updated existing /etc/hosts entry for 127.0.1.1"
    else
		# Entry missing: Append it safely to the end of the file
        echo -e "127.0.1.1\t$NEW_HOSTNAME" >> /etc/hosts
        echo "Added missing 127.0.1.1 entry to /etc/hosts"
    fi

    echo "Hostname has been changed to '$NEW_HOSTNAME'."
    echo "Please reboot for all changes to take full effect."
else
    echo "An error occurred while attempting to change the hostname"
    exit 1
fi