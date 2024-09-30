#!/bin/bash
if [ "$EUID" -ne 0 ]
  then 
  echo "ERROR: Please run as root"
  exit
fi

if [ "$#" -ne 1 ]
  then 
  echo "Missing hostname parameter"
  exit
fi

hostnamectl set-hostname $1
if [ $? -eq 0 ] 
then
	echo "Hostname has been changed, please reboot your Raspberry Pi for the change to take effect"
else
	echo "An error occured while attempting to change the hostname"
	exit 1
fi
