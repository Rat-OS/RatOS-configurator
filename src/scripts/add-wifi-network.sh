#!/usr/bin/env bash
if [ ! "$EUID" -eq 0 ]; then
	echo "This script must run as root"
	exit -1
fi
NETWORK=$(sh -c "wpa_passphrase '$1' '$2'")
if [[ ! $NETWORK =~ ^network ]]; then
	echo "Invalid wifi credentials"
	exit -1
fi

# NetworkManager operation mode
if systemctl is-active --quiet NetworkManager; then
	nmcli con add type wifi ifname wlan0 con-name "$1" autoconnect yes ssid "$1" 
	nmcli con modify "$1" wifi-sec.key-mgmt wpa-psk
	nmcli con modify "$1" wifi-sec.psk "$2"
	nmcli con modify "$1" wifi-sec.auth-alg open
	exit 0
fi

# wpa_supplicant operation mode
cat << __EOF > /etc/wpa_supplicant/wpa_supplicant.conf
# Use this file to configure your wifi connection(s).
#
# Just uncomment the lines prefixed with a single # of the configuration
# that matches your wifi setup and fill in SSID and passphrase.
#
# You can configure multiple wifi connections by adding more 'network'
# blocks.
#
# See https://linux.die.net/man/5/wpa_supplicant.conf
# (or 'man -s 5 wpa_supplicant.conf') for advanced options going beyond
# the examples provided below (e.g. various WPA Enterprise setups).
#
# !!!!! HEADS-UP WINDOWS USERS !!!!!
#
# Do not use Wordpad for editing this file, it will mangle it and your
# configuration won't work. Use a proper text editor instead.
# Recommended: Notepad++, VSCode, Atom, SublimeText.
#
# !!!!! HEADS-UP MACOSX USERS !!!!!
#
# If you use Textedit to edit this file make sure to use "plain text format"
# and "disable smart quotes" in "Textedit > Preferences", otherwise Textedit
# will use none-compatible characters and your network configuration won't
# work!

## WPA/WPA2 secured
#network={
#  ssid="put SSID here"
#  psk="put password here"
#}

## Open/unsecured
#network={
#  ssid="put SSID here"
#  key_mgmt=NONE
#}

## WEP "secured"
##
## WEP can be cracked within minutes. If your network is still relying on this
## encryption scheme you should seriously consider to update your network ASAP.
#network={
#  ssid="put SSID here"
#  key_mgmt=NONE
#  wep_key0="put password here"
#  wep_tx_keyidx=0
#}

# Supplied by RatOS Configurator
$NETWORK

# Uncomment the country your Pi is in to activate Wifi in RaspberryPi 3 B+ and above
# For full list see: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
#country=GB # United Kingdom
#country=CA # Canada
#country=DE # Germany
#country=FR # France
#country=US # United States
country=$3

### You should not have to change the lines below #####################
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
__EOF

# autohotspotN

function get_sbc  {
    cat /etc/board-release | grep BOARD_NAME | cut -d '=' -f2
}

#CB1
if [[ -e /etc/board-release && $(get_sbc ) = '"BTT-CB1"' ]]
then
  cat << __EOF > /boot/system.cfg
#-----------------------------------------#
check_interval=5        # Cycle to detect whether wifi is connected, time 5s
router_ip=8.8.8.8       # Reference DNS, used to detect network connections

eth=eth0        # Ethernet card device number
wlan=wlan0      # Wireless NIC device number

###########################################
# wifi name
#WIFI_SSID="ZYIPTest"
# wifi password
#WIFI_PASSWD="12345678"

###########################################
WIFI_AP="false"             # Whether to open wifi AP mode, default off
WIFI_AP_SSID="rtl8189"      # Hotspot name created by wifi AP mode
WIFI_AP_PASSWD="12345678"   # wifi AP mode to create hotspot connection password

# Supplied by RatOS Configurator
WIFI_SSID="$1"
WIFI_PASSWD="$2"
__EOF
fi