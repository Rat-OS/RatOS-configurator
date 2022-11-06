#!/bin/bash
if [ ! "$EUID" -eq 0 ]; then
	echo "This script must run as root"
	exit -1
fi
echo "Compiling firmware at /home/pi/klipper_config/config/boards/$1..."
/home/pi/klipper_config/config/boards/$1
