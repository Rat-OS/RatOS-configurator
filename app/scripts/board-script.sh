#!/usr/bin/env bash
if [ ! "$EUID" -eq 0 ]; then
	echo "This script must run as root"
	exit 1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# shellcheck source=./src/scripts/common.sh
source "$SCRIPT_DIR/common.sh"

printf "Running board script ${RATOS_PRINTER_DATA_DIR}/config/RatOS/boards/%s\n\n" "$1"
"${RATOS_PRINTER_DATA_DIR}/config/RatOS/boards/$1"
res=$?
chown -R "${RATOS_USERNAME}":"${RATOS_USERGROUP}" "${KLIPPER_DIR}"
exit $res
