#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
# shellcheck source=./configuration/scripts/klipper-mcu-update.sh
sudo "$SCRIPT_DIR"/klipper-mcu-update.sh
