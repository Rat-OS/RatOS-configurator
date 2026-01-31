#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )
# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh
# shellcheck source=./configuration/scripts/klipper-mcu-update.sh
$SUDO "$SCRIPT_DIR"/klipper-mcu-update.sh
