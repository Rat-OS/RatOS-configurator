# Support user z-offset (aka babystepping) when using beacon true zero
#
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
#
# The offset is applied and managed so that the user experience is just like
# using a normal z-probe with user z-offset support.

import logging

OFFSET_NAME = 'user_probe_z_offset'

class BeaconUserZOffsetManager:
	def __init__(self, config):
		self.printer = config.get_printer()
		self.name = config.get_name()
		self.configured_z_offset = config.getfloat('z_offset', 0.0)
		self.ratos = None
		self.gm_ratos = None
		self.named_offsets = None
		self._original_z_offset_apply_probe_cmd = None
		self.gcode = self.printer.lookup_object('gcode')

		if config.has_section('beacon'):
			self.printer.register_event_handler("klippy:connect",
												self._handle_connect)
		else:
			logging.info(f"{self.name}: beacon is not configured, beacon user z offset management disabled.")

	def _handle_connect(self):
		self.ratos = self.printer.lookup_object('ratos')
		self.named_offsets = self.printer.lookup_object('named_offsets')
		self.gm_ratos = self.printer.lookup_object('gcode_macro RatOS')

		beacon_contact_start_print_true_zero = self.gm_ratos.variables.get('beacon_contact_start_print_true_zero', False)
		if beacon_contact_start_print_true_zero != True:
			logging.info(f"{self.name}: beacon_contact_start_print_true_zero is not enabled, beacon user z-offset management is not required and will not be activated.")
			return

		self._original_z_offset_apply_probe_cmd = self._override_command(
			'Z_OFFSET_APPLY_PROBE',
			self.cmd_Z_OFFSET_APPLY_PROBE
		)
		logging.info(f"{self.name}: beacon_contact_start_print_true_zero is enabled, activating beacon user z-offset management. Applying configured z_offset of {self.configured_z_offset} mm to named offset '{OFFSET_NAME}'.")
		self.named_offsets.set(OFFSET_NAME, z=self.configured_z_offset)

	def _override_command(self, cmd_name, new_cmd, *, when_not_ready:bool=False):
		help_text = self.gcode.get_command_help().get(cmd_name, None)
		is_base_handler = self.gcode.base_gcode_handlers.get(cmd_name, None) is not None
		
		if is_base_handler != when_not_ready:
			raise self.printer.config_error(f"{cmd_name} is {'' if is_base_handler else 'not '}a base (aka 'when-not-ready') gcode handler, this is not expected. {self.name} cannot be enabled.")
		
		original_cmd = self.gcode.register_command(cmd_name, None)
		
		if original_cmd is None:
			raise self.printer.config_error(f"An existing {cmd_name} command is not registered, {self.name} cannot be enabled. Make sure that [beacon] is declared before [{self.name}] in printer.cfg.")

		self.gcode.register_command(cmd_name, new_cmd, when_not_ready=when_not_ready, desc=help_text)
		return original_cmd
	
	def cmd_Z_OFFSET_APPLY_PROBE(self, gcmd):
		configfile = self.printer.lookup_object('configfile')

		if gcmd.get('CLEAR', '0').lower() in ('1', 'true', 'yes'):
			configfile.set(self.name, 'z_offset', "0.0")
			gcmd.respond_info(
				"The offset for beacon true zero has been cleared.\n"
				"To apply the change, you must use the SAVE_CONFIG command to\n"
				"update the printer config file and restart the printer.")
			return
			
		# Based on klipper's probe.py, Copyright (C) 2017-2024 Kevin O'Connor, GPLv3		
		gcode_move = self.printer.lookup_object("gcode_move")
		offset = gcode_move.get_status()['homing_origin'].z
		if offset == 0:
			gcmd.respond_info("Nothing to do: Z Offset is 0")
			return
		offset += self.configured_z_offset
		gcmd.respond_info(
			f"The offset for beacon true zero has been adjusted, new value is {offset:.5f}\n"
			"To apply the change, you must use the SAVE_CONFIG command to\n"
			 "update the printer config file and restart the printer.")
		configfile.set(self.name, 'z_offset', "%.5f" % (offset,))
		
def load_config(config):
	return BeaconUserZOffsetManager(config)