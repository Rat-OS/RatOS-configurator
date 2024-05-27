#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi
MCU=$1
FLASH_PATH=${2:-$MCU}
if [ "$MCU" == "" ]; then
	echo "ERROR: Please specify a device to flash"
	exit
fi
pushd /home/pi/klipper || exit
service klipper stop
dfuDevicesPreFlash=$(lsusb | grep -c "0483:df11")

if [ -h "$FLASH_PATH" ]; then
    echo "Flashing $MCU at $FLASH_PATH"
    make flash FLASH_DEVICE="$FLASH_PATH"
else
  echo "$MCU does not seems to be connected, at least it was not found at $FLASH_PATH"
  exit 1;
fi
sleep 5

retVal=1

if [ -h "$MCU" ]; then
	retVal=0
else
	dfuDevicesPostFlash=$(lsusb | grep -c "0483:df11")
	if [ "$dfuDevicesPreFlash" -eq 0 ] && [ "$dfuDevicesPostFlash" -eq 1 ]; then
		echo "Seems like flashing failed, but the device is still in DFU mode. Attempting to recover."
		make flash FLASH_DEVICE=0483:df11
		sleep 5
		if [ -h "$MCU" ]; then
			retVal=0
		fi
	fi
fi
if [ $retVal -eq 0 ]; then
	echo "Flashing successful."
else
	echo "Flashing failed."
fi
chown pi:pi -R /home/pi/klipper
service klipper start
popd || exit $retVal
exit $retVal