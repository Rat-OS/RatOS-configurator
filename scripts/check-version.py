#!/usr/bin/env python2
# Module supporting uploads Klipper firmware to an SD Card via SPI
#
# Copyright (C) 2021 Eric Callahan <arksine.code@gmail.com>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
import sys
import os
KLIPPER_DIR = os.path.abspath(os.environ['KLIPPER_DIR'])
sys.path.append(os.path.join(KLIPPER_DIR, "klippy"))
import argparse
import logging
import time
import traceback
import reactor
import serialhdl
import clocksync
import mcu

###########################################################
#
# Helper methods
#
###########################################################

def output_line(msg):
    sys.stdout.write("%s\n" % (msg,))
    sys.stdout.flush()

def output(msg):
    sys.stdout.write("%s" % (msg,))
    sys.stdout.flush()

# Translate a serial device name to a stable serial name in
# /dev/serial/by-path/
# Borrowed from  klipper/scripts/flash_usb.py
def translate_serial_to_tty(device):
    ttyname = os.path.realpath(device)
    if os.path.exists('/dev/serial/by-path/'):
        for fname in os.listdir('/dev/serial/by-path/'):
            fname = '/dev/serial/by-path/' + fname
            if os.path.realpath(fname) == ttyname:
                return ttyname, fname
    return ttyname, ttyname

# MCU Command Constants
RESET_CMD = "reset"
GET_CFG_CMD = "get_config"
GET_CFG_RESPONSES = ( # Supported responses (sorted by newer revisions first).
    "config is_config=%c crc=%u is_shutdown=%c move_count=%hu", # d4aee4f
    "config is_config=%c crc=%u move_count=%hu is_shutdown=%c"  # Original
)

class VersionCheckError(Exception):
    pass

class MCUConfigError(VersionCheckError):
    pass

class MCUConnection:
    def __init__(self, k_reactor, device, baud):
        self.reactor = k_reactor
        self.serial_device = device
        self.baud = baud
        # TODO: a change in baudrate will cause an issue, come up
        # with a method for handling it gracefully
        self._serial = serialhdl.SerialReader(self.reactor)
        self.clocksync = clocksync.ClockSync(self.reactor)
        self.connect_completion = None
        self.connected = False
        self.enumerations = {}
        self.raw_dictionary = None
        self.proto_error = None

    def connect(self):
        output("Connecting to MCU..")
        self.connect_completion = self.reactor.completion()
        self.connected = False
        self.reactor.register_callback(self._do_serial_connect)
        curtime = self.reactor.monotonic()
        while True:
            curtime = self.reactor.pause(curtime + 1.)
            output(".")
            if self.connect_completion.test():
                self.connected = self.connect_completion.wait()
                break
        self.connect_completion = None
        if not self.connected:
            output("\n")
            raise VersionCheckError("Unable to connect to MCU")
        output_line("Connected")
        msgparser = self._serial.get_msgparser()
        self.enumerations = msgparser.get_enumerations()
        self.raw_dictionary = msgparser.get_raw_data_dictionary()
        self.proto_error = msgparser.error

    def _do_serial_connect(self, eventtime):
        endtime = eventtime + 60.
        while True:
            try:
                self._serial.connect_uart(self.serial_device, self.baud)
                self.clocksync.connect(self._serial)
            except Exception:
                curtime = self.reactor.monotonic()
                if curtime > endtime:
                    self.connect_completion.complete(False)
                    return
                output("Connection Error, retrying..")
                self._serial.disconnect()
                self.reactor.pause(curtime + 2.)
            else:
                break
        self.connect_completion.complete(True)

    def reset(self):
        output("Attempting MCU Reset...")
        # XXX: do we need to support other reset methods?
        self._serial.send(RESET_CMD)
        self.reactor.pause(self.reactor.monotonic() + 0.015)
        self.reactor.end()
        output_line("Done")

    def disconnect(self):
        if not self.connected:
            return
        self._serial.disconnect()
        self.connected = False

    def get_mcu_config(self):
        # Iterate through backwards compatible response strings
        for response in GET_CFG_RESPONSES:
            try:
                get_cfg_cmd = mcu.CommandQueryWrapper(
                    self._serial, GET_CFG_CMD, response)
                break
            except Exception as err:
                # Raise an exception if we hit the end of the list.
                if response == GET_CFG_RESPONSES[-1]:
                    raise err
                output("Trying fallback...")
        return get_cfg_cmd.send()

    def check_need_restart(self):
        output("Checking Current MCU Configuration...")
        params = self.get_mcu_config()
        output_line("Done")
        if params['is_config'] or params['is_shutdown']:
            output_line("MCU needs restart: is_config=%d, is_shutdown=%d"
                        % (params['is_config'], params['is_shutdown']))
            return True
        return False

    def get_version(self):
        msgparser = self._serial.get_msgparser()
        cur_dictionary = msgparser.get_raw_data_dictionary()
        # If we have a dictionary, check that it matches.
        output_line("Version: %s" % (msgparser.get_version_info()[0]))

class VersionCheck:
    def __init__(self, args):
        self.board_config = args
        if not os.path.exists(args['device']):
            raise VersionCheckError("No device found at '%s'" % (args['device'],))
        tty_name, dev_by_path = translate_serial_to_tty(args['device'])
        self.device_path = dev_by_path
        self.baud_rate = 250000
        self.mcu_conn = None

    def _wait_for_reconnect(self):
        output("Waiting for device to reconnect...")
        time.sleep(1.)
        if os.path.exists(self.device_path):
            # device is already available, this could be a UART
            time.sleep(2.)
        else:
            wait_left = 30
            while wait_left:
                time.sleep(1.)
                output(".")
                if os.path.exists(self.device_path):
                    break
                wait_left -= 1
            else:
                output_line("Error")
                raise VersionCheckError("Unable to reconnect")
        output_line("Done")

    def run_reset_verify(self, eventtime):
        # Reset MCU to default state if necessary
        self.mcu_conn.connect()
        if self.mcu_conn.check_need_restart():
            self.mcu_conn.reset()
            self.task_complete = True
        else:
            self.run_get_version(eventtime)

    def run_get_version(self, eventtime):
        # Reconnect and verify
        if not self.mcu_conn.connected:
            self.mcu_conn.connect()
        self.mcu_conn.get_version()
        self.mcu_conn.reset()
        self.task_complete = True

    def run_reactor_task(self, run_cb):
        self.task_complete = False
        k_reactor = reactor.Reactor()
        self.mcu_conn = MCUConnection(k_reactor, self.device_path,
                                      self.baud_rate)
        k_reactor.register_callback(run_cb)
        try:
            k_reactor.run()
        except VersionCheckError:
            raise
        except Exception:
            # ignore exceptions that occur after a task is complete
            if not self.task_complete:
                raise
        finally:
            self.mcu_conn.disconnect()
            k_reactor.finalize()
            self.mcu_conn = k_reactor = None

    def run(self):
        self.run_reactor_task(self.run_reset_verify)
        self._wait_for_reconnect()
        self.run_reactor_task(self.run_get_version)

def main():
    parser = argparse.ArgumentParser(
        description="Board version checker")
    args = parser.parse_known_args()
    parser.add_argument(
        "device", metavar="<device>", help="Device Serial Port")
    args = parser.parse_args()
    log_level = logging.CRITICAL
    logging.basicConfig(level=log_level)
    flash_args = {}
    flash_args['device'] = args.device
    try:
        check = VersionCheck(flash_args)
        check.run()
    except Exception as e:
        output_line("\nVersion Check Error: %s" % (str(e),))
        traceback.print_exc(file=sys.stdout)
        sys.exit(-1)
    output_line("Version Check Complete")


if __name__ == "__main__":
    main()