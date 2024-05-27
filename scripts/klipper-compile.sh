#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi

pushd "/home/pi/klipper" || exit 1

chown pi:pi -R /home/pi/klipper
sudo -u pi make olddefconfig
sudo -u pi make clean
sudo -u pi make

popd || exit 1