#!/bin/bash
if [ ! "$EUID" -eq 0 ]; then
	echo "This script must run as root"
	exit -1
fi
echo "Running board script /home/pi/klipper_config/config/boards/$1\n\n"
/home/pi/klipper_config/config/boards/$1
chown -R pi:pi /home/pi/klipper/
