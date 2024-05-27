#!/bin/bash
if [ ! "$EUID" -eq 0 ]; then
	echo "This script must run as root"
	exit -1
fi
echo "Running board script /home/pi/printer_data/config/RatOS/boards/$1\n\n"
/home/pi/printer_data/config/RatOS/boards/$1
res=$?
chown -R pi:pi /home/pi/klipper/
exit $res
