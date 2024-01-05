#!/usr/bin/env bash
SCRIPT_DIR=$(realpath "$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )")
# Script dir is scripts
sudo "$SCRIPT_DIR"/update.sh
