#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# Script dir is .git/hooks
sudo $SCRIPT_DIR/../../scripts/update.sh
