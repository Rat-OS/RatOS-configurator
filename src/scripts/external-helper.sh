#!/bin/bash

register_klippy_extension() {
	EXT_NAME=$1
    EXT_PATH=$2
    EXT_FILE=$3
	ERROR_IF_EXISTS=$4
	[[ "$ERROR_IF_EXISTS" == "false" ]] && ERROR_IF_EXISTS="false" || ERROR_IF_EXISTS="true"

    report_status "Registering klippy extension '$EXT_NAME' with the RatOS Configurator..."
    if [ ! -e "$EXT_PATH/$EXT_FILE" ]
    then
        echo "ERROR: The file you're trying to register does not exist"
        exit 1
    fi
    
    if curl --fail -X POST 'http://localhost:3000/configure/api/trpc/klippy-extensions.register' \
		-H 'content-type: application/json' \
		--data-raw "{\"json\":{\"extensionName\":\"$EXT_NAME\",\"path\":\"$EXT_PATH\",\"fileName\":\"$EXT_FILE\",\"errorIfExists\":$ERROR_IF_EXISTS}}"
    then
        echo "Registered $EXT_NAME successfully."
    else
        echo "ERROR: Failed to register klippy extension $EXT_NAME. Is the RatOS configurator running?"
        exit 1
    fi
}

register_klippy_kinematic_extension() {
	EXT_NAME=$1
    EXT_PATH=$2
    EXT_FILE=$3
	ERROR_IF_EXISTS=$4
	[[ "$ERROR_IF_EXISTS" == "false" ]] && ERROR_IF_EXISTS="false" || ERROR_IF_EXISTS="true"

    report_status "Registering klippy extension '$EXT_NAME' with the RatOS Configurator..."
    if [ ! -e "$EXT_PATH/$EXT_FILE" ]
    then
        echo "ERROR: The file you're trying to register does not exist"
        exit 1
    fi
    
    if curl --fail -X POST 'http://localhost:3000/configure/api/trpc/klippy-extensions.register' \
		-H 'content-type: application/json' \
		--data-raw "{\"json\":{\"extensionName\":\"$EXT_NAME\",\"path\":\"$EXT_PATH\",\"fileName\":\"$EXT_FILE\",\"errorIfExists\":$ERROR_IF_EXISTS,\"isKinematics\":true}}"
    then
        echo "Registered $EXT_NAME kinematics successfully."
    else
        echo "ERROR: Failed to register $EXT_NAME kinematics. Is the RatOS configurator running?"
        exit 1
    fi
}

register_moonraker_extension() {
	EXT_NAME=$1
    EXT_PATH=$2
    EXT_FILE=$3
	ERROR_IF_EXISTS=$4
	[[ "$ERROR_IF_EXISTS" == "false" ]] && ERROR_IF_EXISTS="false" || ERROR_IF_EXISTS="true"

    report_status "Registering moonraker extension '$EXT_NAME' with the RatOS Configurator..."
    if [ ! -e "$EXT_PATH/$EXT_FILE" ]
    then
        echo "ERROR: The file you're trying to register does not exist"
        exit 1
    fi

    if curl --fail -X POST 'http://localhost:3000/configure/api/trpc/moonraker-extensions.register' \
		-H 'content-type: application/json' \
		--data-raw "{\"json\":{\"extensionName\":\"$EXT_NAME\",\"path\":\"$EXT_PATH\",\"fileName\":\"$EXT_FILE\",\"errorIfExists\":$ERROR_IF_EXISTS}}"
    then
        echo "Registered $EXT_NAME successfully."
    else
        echo "ERROR: Failed to register moonraker extension $EXT_NAME. Is the RatOS configurator running?"
        exit 1
    fi
}

export -f register_klippy_extension
export -f register_klippy_kinematic_extension
export -f register_moonraker_extension