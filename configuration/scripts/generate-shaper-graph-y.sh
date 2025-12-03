#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# shellcheck source=./configuration/scripts/ratos-common.sh
source "$SCRIPT_DIR"/ratos-common.sh

NEWY=$(find /tmp -name "resonances_y_*.csv" -printf '%T@ %p\n' 2> /dev/null | sort -n | tail -1 | cut -f2- -d" ")
DATE=$(date +'%Y-%m-%d-%H%M%S')
outdir="${RATOS_PRINTER_DATA_DIR}"/config/input_shaper
if [ ! -d "${outdir}" ]
then
    mkdir "${outdir}"
    chown "${RATOS_USERNAME}:${RATOS_USERGROUP}" "${outdir}"
fi
"${KLIPPER_DIR}"/scripts/calibrate_shaper.py "$NEWY" -o "${outdir}/resonances_y_${DATE}.png"
