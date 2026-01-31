#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

# Script dir is scripts
sudo "$SCRIPT_DIR"/update.sh
# Important to run this after update.sh to ensure the CLI is up to date.
sudo "$SCRIPT_DIR"/../../configuration/scripts/ratos-update.sh
