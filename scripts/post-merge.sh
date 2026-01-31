#!/usr/bin/env bash

# This file is only here for backwards compatibility with the old location of the post-merge githook.
# It will be removed in a future version.
SCRIPT_DIR=$( cd -- "$( dirname -- "$(realpath -- "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )

sudo "$SCRIPT_DIR/update.sh"
