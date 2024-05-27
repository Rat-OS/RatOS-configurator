#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi
MCU=$1
if [ "$MCU" == "" ]; then
	echo "ERROR: Please specify a device to flash"
	exit
fi
pushd /home/pi/klipper || exit
service klipper stop
echo "Flashing DFU device"
make flash FLASH_DEVICE=0483:df11
chown pi:pi -R /home/pi/klipper
sleep 5
if [ -h "$MCU" ]; then
    echo "Flashing Successful!"
else
    echo "Flashing failed :("
    service klipper start
    popd || exit
    exit 1
fi
service klipper start
popd || exit
