#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi

pushd "/home/pi/klipper" || exit 1

make olddefconfig
make clean
make

popd || exit 1