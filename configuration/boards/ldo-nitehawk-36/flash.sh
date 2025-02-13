#!/bin/bash
MCU=/dev/ldo-nitehawk-36
if [ "$EUID" -ne 0 ]
  then echo "ERROR: Please run as root"
  exit
fi
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

FLASH_SCRIPT=$(realpath "$SCRIPT_DIR/../../scripts/flash-path.sh")
if [ ! -f "$FLASH_SCRIPT" ]; then
  echo "ERROR: Flash script not found at $FLASH_SCRIPT"
  exit 1
fi
if [ ! -e "$MCU" ]; then
  echo "ERROR: Device $MCU not found"
  exit 1
fi
$FLASH_SCRIPT $MCU