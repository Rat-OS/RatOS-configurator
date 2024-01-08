#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi

pushd "/home/pi/klipper" || exit 1

make olddefconfig
make clean
make
chown pi:pi -R /home/pi/klipper

popd || exit 1