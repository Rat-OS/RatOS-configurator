#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

"$SCRIPT_DIR"/compile.sh
if [ $? -ne 0 ]; then
  echo "ERROR: Compilation failed"
  exit 1
fi

"$SCRIPT_DIR"/flash.sh
if [ $? -ne 0 ]; then
  echo "ERROR: Flashing failed"
  exit 1
fi

echo "Successfully compiled and flashed firmware"
