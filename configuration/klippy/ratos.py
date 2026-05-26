# RatOS general purpose module
#
# Copyright (C) 2024 Helge Keck <HelgeKeck@hotmail.com.com>
# Copyright (C) 2024 Mikkel Schmidt <mikkel.schmidt@gmail.com>
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.

import os, logging, glob, traceback, inspect, re, time
import json, subprocess, pathlib, random, math
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from collections import namedtuple
import numpy as np

from . import bed_mesh as BedMesh

def _download_task(url, path):
	urllib.request.urlretrieve(url, path)
	return True

BeaconProbingRegions = namedtuple('BeaconProbingRegions', 
	[
		'x_offset',
		'y_offset',
		'printable_x_max',
		'printable_y_max',
		'mesh_proximity_min_coil_pos',
		'mesh_proximity_max_coil_pos',
		'mesh_proximity_min_toolhead_pos',
		'mesh_proximity_max_toolhead_pos',
		'mesh_contact_min',
		'mesh_contact_max',
		'logical_proximity_min_coil_pos',
		'logical_proximity_max_coil_pos',
		'logical_proximity_min_toolhead_pos',
		'logical_proximity_max_toolhead_pos',
		'logical_contact_min',
		'logical_contact_max'
		])
"""
 A named tuple containing:
	- x_offset: X offset of the Beacon probe
	- y_offset: Y offset of the Beacon probe
	- printable_x_max: Maximum printable X dimension (from gcode_macro RatOS variable_printable_x_max)
	- printable_y_max: Maximum printable Y dimension (from gcode_macro RatOS variable_printable_y_max)
	- mesh_proximity_min_coil_pos: Tuple of (min_x, min_y) for proximity probing for meshing (coil position)
	- mesh_proximity_max_coil_pos: Tuple of (max_x, max_y) for proximity probing for meshing (coil position)
	- mesh_proximity_min_toolhead_pos: Tuple of (min_x, min_y) for proximity probing for meshing (toolhead position)
	- mesh_proximity_max_toolhead_pos: Tuple of (max_x, max_y) for proximity probing for meshing (toolhead position)
	- mesh_contact_min: Tuple of (min_x, min_y) for contact probing for meshing (toolhead position)
	- mesh_contact_max: Tuple of (max_x, max_y) for contact probing for meshing (toolhead position)
	- logical_proximity_min_coil_pos: Tuple of (min_x, min_y) for proximity probing calculated from the printable area and beacon offsets (coil position)
	- logical_proximity_max_coil_pos: Tuple of (max_x, max_y) for proximity probing calculated from the printable area and beacon offsets (coil position)
	- logical_proximity_min_toolhead_pos: Tuple of (min_x, min_y) for proximity probing calculated from the printable area and beacon offsets (toolhead position)
	- logical_proximity_max_toolhead_pos: Tuple of (max_x, max_y) for proximity probing calculated from the printable area and beacon offsets (toolhead position)
	- logical_contact_min: Tuple of (min_x, min_y) for contact probing calculated from the printable area and beacon offsets (toolhead position)
	- logical_contact_max: Tuple of (max_x, max_y) for contact probing calculated from the printable area and beacon offsets (toolhead position)
  Notes:
	- COIL POSITION VS TOOLHEAD POSITION FOR PROXIMITY VALUES
	  
	  - The values suffixed "_coil_pos" represent the position of the beacon coil itself.

	  - The values suffixes "_toolhead_pos" represent the position of the toolhead (aka, nozzle), taking account of
		the beacon offsets. This is where the toolhead must be positioned to ensure that the beacon coil is over the
		corresponding "_coil_pos" position.

	- TOOLHEAD POSITION FOR CONTACT VALUES

	  All contact values represent the toolhead (aka, nozzle) position.

	- LOGICAL VALUES
	  
	  The "logical" values assume that a 40mm circle of printable area under the beacon coil is required for proximity
	  probing to be reliable, and that a 20mm circle of printable area under the beacon coil is required for contact
	  probing to be reliable. 
	  
	  The configured mesh bounds may sometimes exceed the logical area, because the configured mesh bounds can take account
	  of the extent of the underlying bed plate and other metal constructions which may extend beyond the printable area.
	  On the other hand, mesh bounds may have a restricted extent that may be exceeded by the logical bounds on some sides.

	  The logical bounds may include toolhead coordinates that are outside the printable area but which are still valid* for probing
	  because the beacon probe offset ensures that the beacon coil is still over the printable area when the toolhead is at those
	  coordinates. Such coordinates might be outside the hard movement limits of the printer - this is considered to be a 
	  separate concern.
	  
	  *IMPORTANT: it is the responsibility of the consumer to ensure that contact probing is only attempted at coordinates
	  where the nozzle is expected to be over the build sheet: for example, contact probing at negative y positions should
	  only be performed if there is confidence that the build sheet will be positioned reliably and extends forward beyond
	  the nominal printable area.
"""

#####
# RatOS
#####

class RatOS:

	#####
	# Initialize
	#####
	def __init__(self, config):
		self.config = config
		self.printer = config.get_printer()
		self.name = config.get_name()
		self.bypass_post_processing = False
		self.enable_gcode_transform = False
		self.allow_unsupported_slicer_versions = False
		self.allow_unknown_gcode_generator = False
		self.gcode = self.printer.lookup_object('gcode')
		self.reactor = self.printer.get_reactor()
		self.overridden_commands = {
			'TEST_RESONANCES': None,
			'SHAPER_CALIBRATE': None,
		}

		# Fields initialized in _connect
		self.v_sd = None
		self.sdcard_dirname = None
		self.dual_carriage = None
		self.rmmu_hub = None
		self.bed_mesh = None
		self.gm_ratos = None
		self.gm_calculate_printable_area = None
		self.toolhead = None
		self.beacon = None
		self.display_status = None

		# Status fields
		self.last_processed_file_result = None
		self.last_check_bed_mesh_profile_exists_result = None
		self.last_move_to_safe_z_home_position = None

		# Other fields
		self._last_camera_snapshot_index_by_subdir = {}
		self.old_is_graph_files = []
		self.post_process_success = False
		self._beacon_probing_regions: BeaconProbingRegions = None

		# HELLO_RATOS is called from delayed gcode 2 seconds after startup. Several other macros initialize
		# before that. Console output may not been seen by moonraker/mainsail if printed too early, so
		# we defer all console_echo output until after HELLO_RATOS is run. However, we still log the messages
		# to the klipper log immediately. We also write any deferred messages to the console if klipper
		# shuts down before HELLO_RATOS is run.
		self._deferred_init_messages = []
		self._defer_console_messages = True

		self.load_settings()
		self.register_commands()
		self.register_handlers()
		self.load_settings()

	#####
	# Handler
	#####
	def register_handlers(self):
		self.printer.register_event_handler("klippy:connect", self._connect)
		self.printer.register_event_handler("klippy:shutdown", self._handle_shutdown)

	def _connect(self):
		self.v_sd = self.printer.lookup_object('virtual_sdcard', None)
		self.sdcard_dirname = self.v_sd.sdcard_dirname
		self.gm_ratos = self.printer.lookup_object('gcode_macro RatOS')
		self.gm_calculate_printable_area = self.printer.lookup_object('gcode_macro CALCULATE_PRINTABLE_AREA')
		self.toolhead = self.printer.lookup_object("toolhead")
		self.display_status = self.printer.lookup_object("display_status")

		if self.config.has_section("dual_carriage"):
			self.dual_carriage = self.printer.lookup_object("dual_carriage", None)
		if self.config.has_section("rmmu_hub"):
			self.rmmu_hub = self.printer.lookup_object("rmmu_hub", None)
		if self.config.has_section("bed_mesh"):
			self.bed_mesh = self.printer.lookup_object('bed_mesh')
		if self.config.has_section("beacon"):
			self.beacon = self.printer.lookup_object('beacon')

		# Register overrides.
		self.register_command_overrides()

	def _handle_shutdown(self):
		try:
			self._write_deferred_init_messages()
		except:
			pass

	def _write_deferred_init_messages(self):
		if self._defer_console_messages:
			self._defer_console_messages = False
			if self._deferred_init_messages:
				logging.info(f"Writing {len(self._deferred_init_messages)} deferred RatOS console messages")
				for title, type, msg in self._deferred_init_messages:
					self.console_echo(title, type, msg)
				logging.info(f"Finished writing deferred RatOS console messages")
			else:
				logging.info("No deferred RatOS console messages to write.")
			self._deferred_init_messages = None
		
	def _check_cpu_governors(self):
		desired_governor = 'performance'
		try:
			governors = self.get_cpu_governors()
		except Exception as e:
			self.console_echo(
				'CPU governor check', 'warning',
				f'Failed to check current CPU governors. RatOS recommends setting all CPU governors to "{desired_governor}" for optimal printing performance._N_' +
				'Reason: ' + str(e))
			return
		non_performance_governors = governors - {desired_governor}
		if non_performance_governors:
			self.console_echo(
				'CPU governor check', 'warning',
				f'RatOS recommends setting all CPU governors to "{desired_governor}" for optimal printing performance._N_' +
				'Current CPU governor(s) detected: ' + ', '.join(governors))		
	#####
	# Settings
	#####
	def load_settings(self):
		self.enable_gcode_transform = self.config.getboolean('enable_gcode_transform', False)
		self.bypass_post_processing = self.config.getboolean('bypass_post_processing', False)
		self.allow_unknown_gcode_generator = self.config.getboolean('allow_unknown_gcode_generator', False)
		self.allow_unsupported_slicer_versions = self.config.getboolean('allow_unsupported_slicer_versions', False)

	#####
	# Gcode commands
	#####
	def register_commands(self):
		self.gcode.register_command('HELLO_RATOS', self.cmd_HELLO_RATOS, desc=self.desc_HELLO_RATOS)
		self.gcode.register_command('CACHE_IS_GRAPH_FILES', self.cmd_CACHE_IS_GRAPH_FILES, desc=self.desc_CACHE_IS_GRAPH_FILES)
		self.gcode.register_command('SHOW_IS_GRAPH_FILES', self.cmd_SHOW_IS_GRAPH_FILES, desc=self.desc_SHOW_IS_GRAPH_FILES)
		self.gcode.register_command('CONSOLE_ECHO', self.cmd_CONSOLE_ECHO, desc=self.desc_CONSOLE_ECHO)
		self.gcode.register_command('RATOS_LOG', self.cmd_RATOS_LOG, desc=self.desc_RATOS_LOG)
		self.gcode.register_command('PROCESS_GCODE_FILE', self.cmd_PROCESS_GCODE_FILE, desc=self.desc_PROCESS_GCODE_FILE)
		self.gcode.register_command('ALLOW_UNKNOWN_GCODE_GENERATOR', self.cmd_ALLOW_UNKNOWN_GCODE_GENERATOR, desc=self.desc_ALLOW_UNKNOWN_GCODE_GENERATOR)
		self.gcode.register_command('BYPASS_GCODE_PROCESSING', self.cmd_BYPASS_GCODE_PROCESSING, desc=self.desc_BYPASS_GCODE_PROCESSING)
		self.gcode.register_command('_SYNC_GCODE_POSITION', self.cmd_SYNC_GCODE_POSITION, desc=self.desc_SYNC_GCODE_POSITION)
		self.gcode.register_command('_CHECK_BED_MESH_PROFILE_EXISTS', self.cmd_CHECK_BED_MESH_PROFILE_EXISTS, desc=self.desc_CHECK_BED_MESH_PROFILE_EXISTS)
		self.gcode.register_command('_RAISE_ERROR', self.cmd_RAISE_ERROR, desc=self.desc_RAISE_ERROR)
		self.gcode.register_command('_TRY', self.cmd_TRY, desc=self.desc_TRY)
		self.gcode.register_command('_DEBUG_ECHO_STACK_TRACE', self.cmd_DEBUG_ECHO_STACK_TRACE, desc=self.desc_DEBUG_ECHO_STACK_TRACE)
		self.gcode.register_command('_MOVE_TO_SAFE_Z_HOME', self.cmd_MOVE_TO_SAFE_Z_HOME, desc=self.desc_MOVE_TO_SAFE_Z_HOME)
		self.gcode.register_command('_BEACON_CHECK_DIRECTIONAL_REPEATABILITY', self.cmd_BEACON_CHECK_DIRECTIONAL_REPEATABILITY, desc=self.desc_BEACON_CHECK_DIRECTIONAL_REPEATABILITY)
		self.gcode.register_command('_CAMERA_SNAPSHOT', self.cmd_CAMERA_SNAPSHOT, desc=self.desc_CAMERA_SNAPSHOT)
		self.gcode.register_command('BEACON_PROBE_CLEAN', self.cmd_BEACON_PROBE_CLEAN, desc=self.desc_BEACON_PROBE_CLEAN)
		self.gcode.register_command('SET_ZERO_REFERENCE_POSITION', self.cmd_SET_ZERO_REFERENCE_POSITION, desc=self.desc_SET_ZERO_REFERENCE_POSITION)

	def register_command_overrides(self):
		if self.config.has_section('resonance_tester'):
			self.register_override('TEST_RESONANCES', self.override_TEST_RESONANCES, desc=self.desc_TEST_RESONANCES)
			self.register_override('SHAPER_CALIBRATE', self.override_SHAPER_CALIBRATE, desc=self.desc_SHAPER_CALIBRATE)

	def register_override(self, command, func, desc=None, desc_suffix=None, skip_if_not_registered=False):
		if self.overridden_commands[command] is not None:
			if self.overridden_commands[command] != func:
				raise self.printer.config_error("Command '%s' is already overridden with a different function" % (command,))
			return
		
		if desc is None:
			desc = self.gcode.get_command_help().get(command, None)

		if desc_suffix is not None:
			if desc is None:
				desc = desc_suffix
			else:
				if not desc.endswith('.'):
					desc = desc + '.'
				desc = desc + ' ' + desc_suffix
		
		prev_cmd = self.gcode.register_command(command, None)
		
		if prev_cmd is None:
			if skip_if_not_registered:
				logging.info(f"{self.name}: existing command '{command}' not found, skipping override registration")
				return
			else:
				raise self.printer.config_error(f"{self.name}: expected existing command '{command}' not found, cannot register override")
		
		if command not in self.overridden_commands:
			raise self.printer.config_error(f"{self.name}: command '{command}' not found in override list")

		self.overridden_commands[command] = prev_cmd
		self.gcode.register_command(command, func, desc=desc)

	def get_prev_cmd(self, command):
		if command not in self.overridden_commands or self.overridden_commands[command] is None:
			raise self.printer.config_error(f"{self.name}: previous function for command '{command}' not found in RatOS override list")
		
		return self.overridden_commands[command]

	desc_TEST_RESONANCES = ("Runs the resonance test for a specifed axis, positioning errors caused by sweeping are corrected by a RatOS override of this command.")
	def override_TEST_RESONANCES(self, gcmd):
		prev_cmd = self.get_prev_cmd('TEST_RESONANCES')
		prev_cmd(gcmd)
		self.cmd_SYNC_GCODE_POSITION(gcmd)

	desc_SHAPER_CALIBRATE = ("Runs the shaper calibration for a specifed axis, positioning errors caused by sweeping are corrected by a RatOS override of this command.")
	def override_SHAPER_CALIBRATE(self, gcmd):
		prev_cmd = self.get_prev_cmd('SHAPER_CALIBRATE')
		prev_cmd(gcmd)
		self.cmd_SYNC_GCODE_POSITION(gcmd)

	desc_SYNC_GCODE_POSITION = ("Syncs the toolhead position to the printer position, used internally to correct positioning errors caused by sweeping in resonance tests.")
	def cmd_SYNC_GCODE_POSITION(self, gcmd):
		toolhead = self.printer.lookup_object('toolhead')
		toolhead.manual_move((None, None, None), 100)

	desc_ALLOW_UNKNOWN_GCODE_GENERATOR = "Temporarily allow gcode from generators that cannot be identified by the postprocessor"
	def cmd_ALLOW_UNKNOWN_GCODE_GENERATOR(self, gcmd):
		self.allow_unknown_gcode_generator = True

	desc_BYPASS_GCODE_PROCESSING = "Disables postprocessor for the next print."
	def cmd_BYPASS_GCODE_PROCESSING(self, gcmd):
		self.bypass_post_processing = True
		self.console_echo('Post-processing bypassed on next print', 'info', "_N_".join([
			'Post-processing will be bypassed on the next print.',
			'You can bypass post-processing permanently by adding the following to printer.cfg._N_',
			'[ratos]',
			'bypass_post_processing: True_N_'
		]))

	desc_HELLO_RATOS = "RatOS mainsail welcome message"
	def cmd_HELLO_RATOS(self, gcmd):
		url = "https://os.ratrig.com/"
		img = "../server/files/config/RatOS/Logo-white.png"
		ratos_version = self.get_ratos_version().split('-')
		ratos_distro = self.get_ratos_distro()
		logging.info(f"HELLO_RATOS: version: {'-'.join(ratos_version)}, distro: {ratos_distro}")
		_title = '<p style="font-weight: bold; margin:0; color:white">Welcome to RatOS ' +  ratos_version[0] + '</p>'
		_sub_title = '<div style="margin:0; padding:0; color: rgba(255, 255, 255, 0.7)">Base image: ' + ratos_distro + '\nUpdated to: ' + '-'.join(ratos_version) + '</div>'
		_info = '<div style="margin:0; padding:0; color: rgba(255, 255, 255, 0.7)">\nClick image to open documentation.</div>'
		_img = '\n<a href="' + url + '" target="_blank" ><img style="margin-top:6px;" src="' + img + '" width="258px"></a>'
		self.gcode.respond_raw('<div>' + _title + _sub_title + _img + _info +'</div>')
		self._write_deferred_init_messages()
		self._check_cpu_governors()

	desc_CONSOLE_ECHO = "Multiline console output"
	def cmd_CONSOLE_ECHO(self, gcmd):
		title = gcmd.get('TITLE', '')
		msg = gcmd.get('MSG', None)
		type = gcmd.get('TYPE', '')

		self.console_echo(title, type, msg)

	desc_SHOW_IS_GRAPH_FILES = "Shows the last generated IS graph in the console"
	def cmd_SHOW_IS_GRAPH_FILES(self, gcmd):
		try:
			counter = 0
			new_is_graph_files = self.get_is_graph_files()
			for file_path in new_is_graph_files:
				if file_path not in self.old_is_graph_files:
					title = gcmd.get('TITLE', '')
					file_name = file_path.replace("/home/pi/printer_data/config/input_shaper/", "")
					url = file_path.replace("/home/pi/printer_data", "../server/files")
					title = title + ': ' if title != '' else ''
					_title = '<p style="font-weight: bold; margin:0; color:white">' + title + file_name + '</p>'
					_link = 'Click image to download or right click for options.'
					_img = '<a href="' + url + '" target="_blank" ><img src="' + url + '" width="100%"></a>'
					self.gcode.respond_raw(_title + _link + _img)
					counter += 1
					if counter == 10:
						break
			self.old_is_graph_files = []
		except Exception as exc:
			self.console_echo("Error showing IS graph files", "error", "Please report this issue on discord or GitHub and attach a debug-zip from the configurator.")
			logging.error(exc)
			self.debug_echo("SHOW_IS_GRAPH_FILES", str(exc))

	desc_CACHE_IS_GRAPH_FILES = "Caches the current is graph files"
	def cmd_CACHE_IS_GRAPH_FILES(self, gcmd):
		self.old_is_graph_files = self.get_is_graph_files()

	desc_RATOS_LOG = "G-code logging command "
	def cmd_RATOS_LOG(self, gcmd):
		prefix = gcmd.get('PREFIX', 'RatOS')
		msg = gcmd.get('MSG')
		logging.info(prefix + ": " + msg)

	desc_RAISE_ERROR = "Raises an error when the macro is executed, unlike {action_raise_error()} which is executed when the macro is evaluated (rendered)"
	def cmd_RAISE_ERROR(self, gcmd):
		# This is implemented in python to avoid the unhelpful prefixing of the current macro name to the error message
		# when {action_raise_error()} is used in a [gcode_macro] template.
		msg = gcmd.get('MSG')
		raise self.printer.command_error(msg)

	desc_TRY = "Implements the try/except/finally pattern"
	def cmd_TRY(self, gcmd):
		command = gcmd.get("__COMMAND").strip()
		if not command:
			raise gcmd.error("Value for parameter '__COMMAND' must be specified")
		
		_except = gcmd.get("__EXCEPT", "").strip()
		_finally = gcmd.get("__FINALLY", "").strip()
		
		to_run = f'{command} {gcmd.get_raw_command_parameters()}'

		self.debug_echo("TRY", f"Command: {command}")
		self.debug_echo("TRY", f"Run: {to_run}")
		if _except:
			self.debug_echo("TRY", f"Except: {_except}")
		if _finally:
			self.debug_echo("TRY", f"Finally: {_finally}")

		try:
			self.gcode.run_script_from_command(to_run)
		except:
			if _except:
				try:
					self.gcode.run_script_from_command(_except)
				except Exception as ex:
					self.debug_echo("TRY", f"Except command failed: {str(ex)}")
			raise
		finally:
			if _finally:
				try:
					self.gcode.run_script_from_command(_finally)
				except Exception as ex:
					self.debug_echo("TRY", f"Finally command failed: {str(ex)}")

	desc_CHECK_BED_MESH_PROFILE_EXISTS = "Sets status last_check_bed_mesh_profile_exists_result to True if [bed_mesh] is configured and the specified profile exists, otherwise False."
	def cmd_CHECK_BED_MESH_PROFILE_EXISTS(self, gcmd):
		self.last_check_bed_mesh_profile_exists_result = False
		if self.bed_mesh:
			profile = gcmd.get('PROFILE', '')
			if not profile.strip():
				raise gcmd.error("Value for parameter 'PROFILE' must be specified")
			profiles = self.bed_mesh.pmgr.get_profiles()
			if profile in profiles:
				self.last_check_bed_mesh_profile_exists_result = True

	desc_SET_ZERO_REFERENCE_POSITION = "Sets the zero reference position for the currently loaded bed mesh."
	def cmd_SET_ZERO_REFERENCE_POSITION(self, gcmd):
		if not self.bed_mesh:
			raise gcmd.error("The bed_mesh module is not configured. This command requires a [bed_mesh] section in the printer configuration.")
		
		if (self.bed_mesh.z_mesh is None):
			self.console_echo("Set zero reference position error", "error",
				"No bed mesh loaded._N_Either generate a new bed mesh or load it via BED_MESH_PROFILE LOAD=\"[profile_name]\"")
			return

		x_pos = gcmd.get_float('X')
		y_pos = gcmd.get_float('Y')

		self.debug_echo("SET_ZERO_REFERENCE_POSITION", f"X:{x_pos:.2f} Y:{y_pos:.2f}")

		org_mesh = self.bed_mesh.get_mesh()
		new_mesh = BedMesh.ZMesh(org_mesh.get_mesh_params(), org_mesh.get_profile_name(), self.reactor)
		new_mesh.build_mesh(org_mesh.get_probed_matrix())
		new_mesh.set_zero_reference(x_pos, y_pos)
		self.bed_mesh.set_mesh(new_mesh)

		self.bed_mesh.pmgr.save_profile(new_mesh.get_profile_name())
		self.console_echo("Set zero reference position", "info",
			f"Zero reference position saved for profile '{new_mesh.get_profile_name()}'")

	desc_PROCESS_GCODE_FILE = "G-code post-processor for IDEX and RMMU"
	def cmd_PROCESS_GCODE_FILE(self, gcmd):
		filename = gcmd.get('FILENAME', "")
		isIdex = self.dual_carriage is not None
		if filename[0] == '/':
			filename = filename[1:]
		self.gcode.run_script_from_command("SET_GCODE_VARIABLE MACRO=START_PRINT VARIABLE=first_x VALUE=-1")
		self.gcode.run_script_from_command("SET_GCODE_VARIABLE MACRO=START_PRINT VARIABLE=first_y VALUE=-1")
		if self.bypass_post_processing:
			self.bypass_post_processing = self.config.getboolean('bypass_post_processing', False)
			self.console_echo('Bypassing post-processing', 'info', 'Configuration option `bypass_post_processing` is set to true. Bypassing post-processing...')
			if isIdex:
				self.console_echo('Bypassing post-processing on IDEX machines is not recommended', 'warning', '_N_'.join([
					'RatOS IDEX features require gcode processing and transformation to be enabled.',
					'You can enable it by adding the following to printer.cfg._N_',
					'[ratos]',
					'bypass_post_processing: False',
					'enable_gcode_transform: True_N_'
				]))
			self.v_sd.cmd_SDCARD_PRINT_FILE(gcmd)
			return
		
		if self.process_gcode_file(filename, self.enable_gcode_transform):
			self.v_sd.cmd_SDCARD_PRINT_FILE(gcmd)
		else:
			self.console_echo('Print aborted', 'error')

	#####
	# Gcode Post Processor
	#####
	def process_gcode_file(self, filename, enable_gcode_transform):
		try:
			[path, size] = self.get_gcode_file_info(filename)
			# Start ratos postprocess command
			args = ['ratos', 'postprocess', '--non-interactive']
			isIdex = self.config.has_section("dual_carriage")

			if enable_gcode_transform:
				args.append('--overwrite-input')
			if isIdex:
				args.append('--idex')
			if self.allow_unknown_gcode_generator:
				args.append('--allow-unknown-generator')
			if self.allow_unsupported_slicer_versions:
				args.append('--allow-unsupported-slicer-versions')
			args.append(path)
			
			if not enable_gcode_transform and isIdex:
				self.console_echo('Post-processing on IDEX machines without gcode transformation is not recommended', 'warning', '_N_'.join([
					'RatOS IDEX features require gcode transformation to be enabled.',
					'You can enable it by adding the following to printer.cfg._N_',
					'[ratos]',
					'enable_gcode_transform: True_N_'
				]))

			logging.info('Post-processing started via RatOS CLI: ' + str(args))
			self.console_echo('Post-processing started', 'info',  'Processing %s (%.2f mb)...' % (filename, size / 1024 / 1024));

			process = subprocess.Popen(
				args,
				stdout=subprocess.PIPE,
				stderr=subprocess.PIPE
			)

			self.partial_output = ""
			reactor = self.printer.get_reactor()
			def _interpret_output(data):
				# Handle the parsed data
				if data['result'] == 'error' and 'message' in data:
					self.last_processed_file_result = None
					self.console_echo("Error: " + data['title'], 'alert', data['message'])
					
					if data['code'] == 'UNKNOWN_GCODE_GENERATOR':
						message = '_N_'.join([
							'You can allow gcode from unknown generators by running <a class="command">ALLOW_UNKNOWN_GCODE_GENERATOR</a> in the console before starting a print',
							'Keep in mind that this may cause unexpected behaviour, but it can be useful for calibration prints',
							'such as the ones found in <a href="https://ellis3dp.com/Print-Tuning-Guide/">Ellis\' Print Tuning Guide</a>.'
						])
						self.console_echo('Do you want to allow gcode from unknown generators/slicers?', 'info', message)

					return False

				if data['result'] == 'warning' and 'message' in data:
					self.console_echo("Warning: " + data['title'], 'warning', data['message'])

				if data['result'] == 'success':
					self.last_processed_file_result = data['payload']
					printability = data['payload']['printability']

					if printability == 'PROCESSOR_NOT_SUPPORTED':
						self.console_echo('Post-processing Error: file was processed by an obsolete or future version of the RatOS postprocessor', 'error', "You can bypass the processor for this file by running BYPASS_GCODE_PROCESSING before starting the print, but there is no guarantee that it will print correctly._N__N_Reasons for failure:_N_ %s" % ("_N_".join(data['payload']['printabilityReasons'])))
						return False

					if printability == 'NOT_SUPPORTED':
						self.console_echo('Post-processing Error: slicer version not supported', 'error', "You can allow unsupported slicers by adding the following to printer.cfg._N__N_[ratos]_N_allow_unsupported_slicer_versions: True_N__N_Reasons for failure:_N_ %s" % ("_N_".join(data['payload']['printabilityReasons'])))
						return False
						
					if printability == 'MUST_REPROCESS':
						self.console_echo('Post-processing Error: file must be reprocessed', 'error', 'File must be reprocessed before it can be printed, please slice and upload the unprocessed file again._N_Reasons for failure:_N_ %s' % ("_N_".join(data['payload']['printabilityReasons'])))
						return False

					if printability == "UNKNOWN" and data['payload']['generator'] == "unknown" and self.allow_unknown_gcode_generator:
						self.console_echo('Post-processing skipped', 'info', 'File contains gcode from an unknown/unidentified generator._N_Post processing has been skipped since gcode from unknown generators is allowed in your configuration.')
						self.post_process_success = True
						return True
					
					if printability != 'READY':
						self.console_echo('Post-processing Error: file is not ready to be printed', 'error', '%s_N_File is not ready to be printed, please slice and upload the unprocessed file again._N_Reasons for failure:_N_ %s' % ("_N_".join(data['payload']['printabilityReasons'])))
						return False

					analysis_result = data['payload']['analysisResult']
					if not analysis_result:
						self.console_echo('Post-processing Error: no analysis result', 'error', 'No analysis result found, something is wrong... Please report this issue on GitHub and attach a debug-zip from the configurator, along with the file you tried to print.')
						return False

					if 'firstMoveX' in analysis_result:
						self.gcode.run_script_from_command("SET_GCODE_VARIABLE MACRO=START_PRINT VARIABLE=first_x VALUE=" + str(analysis_result['firstMoveX']))
					if 'firstMoveY' in analysis_result:
						self.gcode.run_script_from_command("SET_GCODE_VARIABLE MACRO=START_PRINT VARIABLE=first_y VALUE=" + str(analysis_result['firstMoveY']))

					tool_shifts = analysis_result["toolChangeCount"] if "toolChangeCount" in analysis_result else 0
					used_tools = analysis_result["usedTools"] if "usedTools" in analysis_result else "0"
					
					success_msg_lines = [
						f'Slicer: {data["payload"]["generator"]} v{data["payload"]["generatorVersion"]} '
						f'_N_Used tools: T{", T".join(used_tools)}',
					]
					if tool_shifts > 0:
						success_msg_lines.append(f'_N_Toolshifts: {tool_shifts}')

					self.console_echo(
						'Post-processing completed', 
						'success',
						"_N_".join(success_msg_lines)
					)
					self.post_process_success = True
					return True

				if data['result'] == 'progress':
					eta_secs = data['payload']['eta']

					if eta_secs < 60:
						eta_str = f"{eta_secs}s"
					elif eta_secs < 3600:
						mins = eta_secs // 60
						secs = eta_secs % 60
						eta_str = f"{mins}m {secs}s"
					else:
						hours = eta_secs // 3600
						mins = (eta_secs % 3600) // 60
						secs = eta_secs % 60
						eta_str = f"{hours}h {mins}m {secs}s"

					if data['payload']['percentage'] < 100:
						self.console_echo(f"Post-processing ({data['payload']['percentage']}%)... {eta_str} remaining", 'info')
					else:
						self.console_echo(f"Post-processing ({data['payload']['percentage']}%)...", 'info')

				if data['result'] == 'waiting':
					self.console_echo('Post-processing waiting', 'info', 'Waiting for input file to finish being written...')


			def _process_output(eventtime):
				if process.stdout is None:
					return
				try:
					data = os.read(process.stdout.fileno(), 4096)
				except Exception:
					return

				data = self.partial_output + data.decode()
				
				if '\n' not in data:
					self.partial_output = data
					return
				elif data[-1] != '\n':
					split = data.rfind('\n') + 1
					self.partial_output = data[split:]
					data = data[:split]
				else:
					self.partial_output = ""

				for line in data.splitlines():
					try:
						# Parse JSON from each line
						json_data = json.loads(line)
						if not 'result' in json_data:
							continue
						_interpret_output(json_data)
					except json.JSONDecodeError:
						# Skip lines that aren't valid JSON
						logging.warning("RatOS postprocessor: Invalid JSON line: " + line)

			# Reset post-processing success flag
			self.post_process_success = False

			# Register file descriptor with reactor
			hdl = reactor.register_fd(process.stdout.fileno(), _process_output)

			# Wait for process completion with timeout
			eventtime = reactor.monotonic()
			endtime = eventtime + 3600.0 # 30 minute timeout
			complete = False

			while eventtime < endtime:
				eventtime = reactor.pause(eventtime + .05)
				if process.poll() is not None:
					complete = True
					break

			# Cleanup
			reactor.unregister_fd(hdl)
			if not complete:
				process.terminate()
				self.console_echo("Post-processing failed", "error", "Post processing timed out after 30 minutes.")
				return False

			if process.returncode != 0:
				# We should've already printed the error message in _interpret_output
				error = process.stderr.read().decode().strip()
				if error:
					logging.error(error)

				self.post_process_success = False
				return False

			return self.post_process_success

		except Exception as e:
			raise
		return self.post_process_success;


	def get_gcode_file_info(self, filename):
		files = self.v_sd.get_file_list(True)
		flist = [f[0] for f in files]
		files_by_lower = { filepath.lower(): [filepath, fsize] for filepath, fsize in files }
		filepath = filename
		try:
			if filepath not in flist:
				filepath = files_by_lower[filepath.lower()]
				return filepath
			fullpath = os.path.join(self.sdcard_dirname, filepath);
			return [fullpath, os.path.getsize(fullpath)]
		except:
			raise self.printer.command_error("Can not get path for file " + filename)

	#####
	# Helper
	#####
	def ratos_echo(self, prefix, msg):
		if self.gcode.is_printer_ready:
			self.gcode.run_script_from_command("RATOS_ECHO PREFIX='" + str(prefix) + "' MSG='" + str(msg).replace("'", "`").replace("\n", "_N_") + "'")

	def debug_echo(self, prefix, msg):
		if self.gcode.is_printer_ready:
			self.gcode.run_script_from_command("DEBUG_ECHO PREFIX='" + str(prefix) + "' MSG='" + str(msg).replace("'", "`").replace("\n", "_N_") + "'")
	
	def console_echo(self, title, type, msg=''):
		if self._defer_console_messages:
			if (type == 'error' or type == 'alert'):
				logging.error(title + ": " + msg)

			if (type == 'warning'):
				logging.warning(title + ": " + msg)
			
			self._deferred_init_messages.append( (title, type, msg) )
			return
		
		color = "white"
		opacity = 1.0
		if type == 'info': color = "#38bdf8"
		if type == 'success': color = "#a3e635"
		if type == 'warning': color = "#fbbf24"
		if type == 'alert': color = "#f87171"
		if type == 'error': color = "#f87171"
		if type == 'debug': color = "#38bdf8"
		if type == 'debug': opacity = 0.7

		msg = msg.replace("_N_","\n")

		if (type == 'error' or type == 'alert'):
			logging.error(title + ": " + msg)
			self.display_status.message = f"ERROR: {title} (check the console for details)"
		if (type == 'warning'):
			logging.warning(title + ": " + msg)
			self.display_status.message = f"WARNING: {title} (check the console for details)"

		_title = '<p style="font-weight: bold; margin:0; opacity:' + str(opacity) + '; color:' + color + '">' + title + '</p>'
		if msg:
			_msg = '<p style="margin:0; opacity:' + str(opacity) + '; color:' + color + '">' + msg + '</p>'
		else:
			_msg = ''

		self.gcode.respond_raw('<div>' + _title + _msg + '</div>')

	def get_is_graph_files(self):
		try:
			folder_path = r"/home/pi/printer_data/config/input_shaper/"
			file_type = r"*.png"
			return glob.glob(os.path.join(folder_path, file_type))
		except Exception as exc:
			self.debug_echo("get_is_graph_files", "Something went wrong. " + str(exc))
		return None		

	def get_ratos_version(self):
		version = '?'
		path = pathlib.Path('/home/pi/ratos-configurator/.git')
		gitdir = os.path.join(path, '..')
		prog_desc = ('git', '-C', gitdir, 'describe', '--always',
					'--tags', '--long', '--dirty')
		prog_status = ('git', '-C', gitdir, 'status', '--porcelain', '--ignored')
		try:
			process = subprocess.Popen(prog_desc, stdout=subprocess.PIPE,
									stderr=subprocess.PIPE)
			ver, err = process.communicate()
			retcode = process.wait()
			if retcode == 0:
				version = str(ver.strip().decode())
				process = subprocess.Popen(prog_status, stdout=subprocess.PIPE,
										stderr=subprocess.PIPE)
				retcode = process.wait()
				return version
			else:
				self.debug_echo("get_ratos_version", ("Error getting git version: %s", err))
		except Exception as exc:
			self.debug_echo("get_ratos_version", ("Exception on run: %s", exc))
		return version
	
	def get_ratos_distro(self):
		distro = 'unknown'
		try:
			path = pathlib.Path('/etc/ratos-release')
			distro = path.read_text().strip()			
		except Exception as exc:
			self.debug_echo("get_ratos_distro", f"Error getting ratos-distro: {exc}")
		return distro

	def get_beacon_probing_regions(self) -> BeaconProbingRegions:
		"""Gets the probing regions configuration for the Beacon probe, or None if not available.
		Returns:
			BeaconProbingRegions or None: A named tuple containing:
				- x_offset: X offset of the Beacon probe
				- y_offset: Y offset of the Beacon probe
				- printable_x_max: Maximum printable X dimension (from gcode_macro RatOS variable_printable_x_max)
				- printable_y_max: Maximum printable Y dimension (from gcode_macro RatOS variable_printable_y_max)
				- mesh_proximity_min_coil_pos: Tuple of (min_x, min_y) for proximity probing for meshing (coil position)
				- mesh_proximity_max_coil_pos: Tuple of (max_x, max_y) for proximity probing for meshing (coil position)
				- mesh_proximity_min_toolhead_pos: Tuple of (min_x, min_y) for proximity probing for meshing (toolhead position)
				- mesh_proximity_max_toolhead_pos: Tuple of (max_x, max_y) for proximity probing for meshing (toolhead position)
				- mesh_contact_min: Tuple of (min_x, min_y) for contact probing for meshing (toolhead position)
				- mesh_contact_max: Tuple of (max_x, max_y) for contact probing for meshing (toolhead position)
				- logical_proximity_min_coil_pos: Tuple of (min_x, min_y) for proximity probing calculated from the printable area and beacon offsets (coil position)
				- logical_proximity_max_coil_pos: Tuple of (max_x, max_y) for proximity probing calculated from the printable area and beacon offsets (coil position)
				- logical_proximity_min_toolhead_pos: Tuple of (min_x, min_y) for proximity probing calculated from the printable area and beacon offsets (toolhead position)
				- logical_proximity_max_toolhead_pos: Tuple of (max_x, max_y) for proximity probing calculated from the printable area and beacon offsets (toolhead position)
				- logical_contact_min: Tuple of (min_x, min_y) for contact probing calculated from the printable area and beacon offsets (toolhead position)
				- logical_contact_max: Tuple of (max_x, max_y) for contact probing calculated from the printable area and beacon offsets (toolhead position)
			Returns None if bed_mesh or beacon configuration is not available.
		"""
		if self.beacon is None:
			return None

		# printable_x_max and printable_y_max are calculated by delayed a gcode macro, so might possibly change during runtime.
		# We only need to update the cached probing regions if these values change.		
		printable_x_max, printable_y_max = self.get_printable_max_dimensions()

		if self._beacon_probing_regions is not None:
			if self._beacon_probing_regions.printable_x_max == printable_x_max and self._beacon_probing_regions.printable_y_max == printable_y_max:
				return self._beacon_probing_regions

		prox_pr = 20.0 # the radius of the circle of printable area under the beacon coil for reliable proximity probing
		contact_pr = 10.0 # the radius of the circle of printable area under the beacon coil for reliable contact probing

		bpr = BeaconProbingRegions(
			x_offset=self.beacon.x_offset,
			y_offset=self.beacon.y_offset,
			printable_x_max=printable_x_max,
			printable_y_max=printable_y_max,
			mesh_proximity_min_coil_pos=(self.beacon.mesh_helper.def_min_x, self.beacon.mesh_helper.def_min_y),
			mesh_proximity_max_coil_pos=(self.beacon.mesh_helper.def_max_x, self.beacon.mesh_helper.def_max_y),
			mesh_proximity_min_toolhead_pos=(self.beacon.mesh_helper.def_min_x - self.beacon.x_offset, self.beacon.mesh_helper.def_min_y - self.beacon.y_offset),
			mesh_proximity_max_toolhead_pos=(self.beacon.mesh_helper.def_max_x - self.beacon.x_offset, self.beacon.mesh_helper.def_max_y - self.beacon.y_offset),
			mesh_contact_min=tuple(self.beacon.mesh_helper.def_contact_min),
			mesh_contact_max=tuple(self.beacon.mesh_helper.def_contact_max),
			logical_proximity_min_coil_pos=(prox_pr, prox_pr),
			logical_proximity_max_coil_pos=(printable_x_max - prox_pr, printable_y_max - prox_pr),
			logical_proximity_min_toolhead_pos=(prox_pr - self.beacon.x_offset, prox_pr - self.beacon.y_offset),
			logical_proximity_max_toolhead_pos=(printable_x_max - prox_pr - self.beacon.x_offset, printable_y_max - prox_pr - self.beacon.y_offset),
			logical_contact_min=(contact_pr - self.beacon.x_offset, contact_pr - self.beacon.y_offset),
			logical_contact_max=(printable_x_max - contact_pr - self.beacon.x_offset, printable_y_max - contact_pr - self.beacon.y_offset))
		
		logging.info(f"{self.name}: beacon probing regions updated: {bpr}")
		
		self._beacon_probing_regions = bpr
		return bpr

	def get_printable_max_dimensions(self, none_if_not_valid=False):
		# If CALCULATE_PRINTABLE_AREA has not completed yet, shutdown as it indicates
		# a critical RatOS initialization order failure. We cannot continue safely.
		# We don't just call CALCULATE_PRINTABLE_AREA here as this should never
		# happen during normal operation, and the cause should be investigated.
		cpa_done = bool(self.gm_calculate_printable_area.variables['calculated'])
		if not cpa_done:
			if none_if_not_valid:
				return (None, None)
			if not self.printer.is_shutdown():
				self.printer.invoke_shutdown(f"{self.name}: RatOS initialization has not completed in time (CALCULATE_PRINTABLE_AREA).")

		printable_x_max = float(self.gm_ratos.variables['printable_x_max'])
		printable_y_max = float(self.gm_ratos.variables['printable_y_max'])
		return (printable_x_max, printable_y_max)
	
	def get_safe_home_position(self, none_if_not_valid=False):
		printable_x_max, printable_y_max = self.get_printable_max_dimensions(none_if_not_valid)
		if printable_x_max is None or printable_y_max is None:
			return (None, None)
		raw_safe_home_x = safe_home_x = self.gm_ratos.variables.get('safe_home_x', None)
		raw_safe_home_y = safe_home_y = self.gm_ratos.variables.get('safe_home_y', None)
		safe_home_x = printable_x_max / 2 if safe_home_x is None or str(safe_home_x).lower() == 'middle' else float(safe_home_x)
		safe_home_y = printable_y_max / 2 if safe_home_y is None or str(safe_home_y).lower() == 'middle' else float(safe_home_y)
		
		bpr = self.get_beacon_probing_regions()
		if bpr is not None:
			safe_min_x = max(bpr.mesh_proximity_min_coil_pos[0], bpr.mesh_contact_min[0])
			safe_max_x = min(bpr.mesh_proximity_max_coil_pos[0], bpr.mesh_contact_max[0])
			safe_min_y = max(bpr.mesh_proximity_min_coil_pos[1], bpr.mesh_contact_min[1])
			safe_max_y = min(bpr.mesh_proximity_max_coil_pos[1], bpr.mesh_contact_max[1])
			if safe_home_x < safe_min_x or safe_home_x > safe_max_x or safe_home_y < safe_min_y or safe_home_y > safe_max_y:
				if none_if_not_valid:
					return (None, None)
				if not self.printer.is_shutdown():
					logging.info(f"{self.name}: (safe_home_x, safe_home_y) is not within beacon-probable region: printable_x_max={printable_x_max}, printable_y_max={printable_y_max}, safe_home_x={safe_home_x}, safe_home_y={safe_home_y}, raw_safe_home_x={raw_safe_home_x}, raw_safe_home_y={raw_safe_home_y}, beacon probing region: ({safe_min_x}, {safe_min_y}) - ({safe_max_x}, {safe_max_y})")
					self.printer.invoke_shutdown(f"{self.name}: (safe_home_x, safe_home_y) must be within the region that Beacon can probe: ({safe_min_x}, {safe_min_y}) - ({safe_max_x}, {safe_max_y}). The configured location ({safe_home_x:.2f}, {safe_home_y:.2f}) is outside this region.")			
		
		return (safe_home_x, safe_home_y)

	desc_MOVE_TO_SAFE_Z_HOME = "Move to safe home position with optional Z_HOP (pass Z_HOP=True as parameter)"
	def cmd_MOVE_TO_SAFE_Z_HOME(self, gcmd):
		speed = float(self.gm_ratos.variables['macro_travel_speed']) * 60
		fuzzy_radius = gcmd.get_float('FUZZY_RADIUS', 0, minval=0.)
		z_hop = gcmd.get('Z_HOP', '').lower() in ('true', 'yes', '1')
		x, y = self.get_safe_home_position()
		
		if fuzzy_radius > 0:
			# Set the home position to a random point anywhere within the circle centered on the safe home position
			# Generate random radius between 0 and fuzzy_radius (sqrt of random ensures uniform distribution)
			random_radius = fuzzy_radius * math.sqrt(random.random())
			# Generate random angle
			angle = random.uniform(0, 2 * math.pi)
			# Calculate new position
			x += random_radius * math.cos(angle)
			y += random_radius * math.sin(angle)

			# Limit to the beacon probing region if defined
			bpr = self.get_beacon_probing_regions()
			if bpr is not None:
				safe_min_x = max(bpr.mesh_proximity_min_coil_pos[0], bpr.mesh_contact_min[0])
				safe_max_x = min(bpr.mesh_proximity_max_coil_pos[0], bpr.mesh_contact_max[0])
				safe_min_y = max(bpr.mesh_proximity_min_coil_pos[1], bpr.mesh_contact_min[1])
				safe_max_y = min(bpr.mesh_proximity_max_coil_pos[1], bpr.mesh_contact_max[1])
				constrained_x = max(safe_min_x, min(x, safe_max_x))
				constrained_y = max(safe_min_y, min(y, safe_max_y))
			else:
				# Limit to printable area if no beacon probing region is defined
				printable_x_max, printable_y_max = self.get_printable_max_dimensions()
				constrained_x = max(0, min(x, printable_x_max))
				constrained_y = max(0, min(y, printable_y_max))

			if (constrained_x, constrained_y) != (x, y):
				logging.warning(f"{self.name}: _MOVE_TO_SAFE_Z_HOME: fuzzy position had to be constrained to fit within the printable or beacon probing regions, the intended fuzzy behaviour may not be achieved.")
				x, y = constrained_x, constrained_y

		if z_hop:
			self.gcode.run_script_from_command("_Z_HOP")

		self.gcode.run_script_from_command(f"__MOVE_TO_SAFE_Z_HOME_ECHO_DEBUG X={x} Y={y} FUZZY_RADIUS={fuzzy_radius} Z_HOP={z_hop}")
		self.gcode.run_script_from_command(f"G0 X{x} Y{y} F{speed}")

		self.last_move_to_safe_z_home_position = (x, y)

	def get_status(self, eventtime=None):
		return {
			'name': self.name,
			'last_processed_file_result': self.last_processed_file_result,
			'last_check_bed_mesh_profile_exists_result': self.last_check_bed_mesh_profile_exists_result,
			# The configured safe home position
			'safe_home_position': self.get_safe_home_position(none_if_not_valid=True),
			# The last position moved to by _MOVE_TO_SAFE_Z_HOME, which may differ from safe_home_position
			# if FUZZY_RADIUS was used.
			'last_move_to_safe_z_home_position': self.last_move_to_safe_z_home_position }

	#####
	# Stack trace
	#####

	_rx_stack_crawl_ = re.compile(r";\$(\S+)")
	desc_DEBUG_ECHO_STACK_TRACE = "Logs a gcode command stack trace when debug is enabled. Add comments to template macros formatted exactly {';$some-short-text-without-whitespace'} to enhance callsite identification."
	def cmd_DEBUG_ECHO_STACK_TRACE(self, gcmd):
		macro = self.printer.lookup_object('gcode_macro DEBUG_ECHO')
		if macro.variables['enabled']:			
			def callback(frame_info):
				locals = frame_info.frame.f_locals
				self_obj = locals.get("self", None)
				if self_obj:
					if isinstance(self_obj, type(macro)):
						f_gcmd = locals.get('gcmd',None)
						if f_gcmd:
							return (False,f"    {f_gcmd.get_commandline()}")
						return (False,f"    {self_obj.alias}")
					if type(self_obj).__name__ == 'GCodeDispatch':
						f_commands = locals.get('commands', None)
						f_origline = locals.get('origline', None)
						if f_commands and f_origline:
							def format_with_preceding_crawlmark(index):
								for index2, line2 in enumerate(f_commands[index::-1]):
									match = self._rx_stack_crawl_.search(line2)
									if match:
										return f"{match.group(1)}+{index2}" if index2 > 0 else match.group(1)
								return str(index)
							matches = []
							for index, line in enumerate(f_commands):
								if f_origline is line:
									matches = [format_with_preceding_crawlmark(index)]
									break
								if f_origline == line.strip():
									matches.append(format_with_preceding_crawlmark(index))
							if matches:
								return (False,f"      from line {' or '.join(matches)} of:")
				gcmd_args = self.get_function_arguments_of_type(frame_info, 'GCodeCommand')
				if len(gcmd_args) == 1:
					return (True,f"    {gcmd_args[0][1].get_commandline()}")
				return (False, None)
			msg = self.get_formatted_extended_stack_trace(callback, 0)
			self.console_echo("RATOS_STACK_TRACE", "debug", msg)
			logging.info("RATOS_STACK_TRACE" + "\n" + msg)

	# Helper for get_formatted_extended_stack_trace callbacks.
	@staticmethod
	def get_function_arguments_of_type(frame_info, type_name):
		function_name = frame_info.function  # Get the function name
		if function_name:
			locals = frame_info.frame.f_locals
			function_object = frame_info.frame.f_globals.get(function_name, None)  # Retrieve the function object
			if function_object:
				signature = inspect.signature(function_object)  # Get the function signature
				return [(name, locals.get(name,None)) for name in signature.parameters.keys() if type(locals.get(name, None)).__name__ == type_name]
		return []

	@staticmethod
	def get_formatted_extended_stack_trace(callback=None, skip=0):
		"""
		Capture the current stack, format it like traceback.format_list,
		and for each frame allow a callback (if provided) to add extra lines.
		
		Parameters:
		callback (function): A function that takes an inspect.FrameInfo object
							and returns a string containing extra info (or '' if none).
		skip (int): Number of frames to skip from the bottom of the stack.
					For example, skip=1 will omit the current frame.
		
		Returns:
		str: The formatted multi-line string of the stack trace plus any extra info.
		"""
		# Get the current stack. Using inspect.stack() returns a list where each
		# element is an inspect.FrameInfo object.
		# We skip the first few frames (including this function itself) using skip.
		stack = inspect.stack()[skip+1:]
		lines = []
		
		for frame_info in stack:
			# Convert each inspect.FrameInfo to a FrameSummary, which is what
			# traceback.format_list expects. This lets us format it the usual way.
			code_line = frame_info.code_context[0].strip() if frame_info.code_context else None
			frame_summary = traceback.FrameSummary(frame_info.filename, frame_info.lineno, frame_info.function, line=code_line)
						
			# If a callback is provided, get extra information from it.
			should_emit, extra_lines  = callback(frame_info) if callback is not None else (True, None)
			if should_emit:
				# Format the frame like traceback.format_list
				lines.extend(traceback.format_list([frame_summary]))

			if extra_lines:
				# Append the extra info as extra lines
				lines.append(extra_lines + "\n")
		
		return "".join(lines)
	
	def get_cpu_governors(self) -> set[str]:
		"""Return the set of distinct current CPU governor names (lowercased).

		Reads all `/sys/devices/system/cpu/cpu*/cpufreq/scaling_governor` files and
		returns a set containing the distinct governor names converted to lower
		case. If CPU frequency scaling is unavailable or no readable values are
		found, an empty set is returned. Multiple differing governors are accepted
		and will be returned as multiple items in the set.
		"""
		cpu_glob = "/sys/devices/system/cpu/cpu*/cpufreq/scaling_governor"
		files = glob.glob(cpu_glob)
		if not files:
			logging.warning(f"{self.name}: expected CPU governor device files not found: {cpu_glob}")
			raise FileNotFoundError(f"expected CPU governor operating system device files not found")

		governors = set()
		for path in files:
			try:
				with open(path, 'r') as fh:
					val = fh.read().strip().lower()
					if val:
						governors.add(val)
			except Exception as e:
				logging.warning(f"{self.name}: failed to read operating system device file at {path}: {e}")
				raise IOError(f"failed to read operating system device file at {path}: {e}") from e

		if not governors:
			logging.error(f"{self.name}: Failed to read any CPU governor values")
			raise ValueError("failed to read any CPU governor values")			

		logging.info(f"{self.name}: Current CPU governor(s): {', '.join(sorted(governors))}")
		return governors
	
	def _get_nozzle_diameter(self):
		extruder_name = 'extruder'

		if self.dual_carriage and self.dual_carriage.dc[1].mode.lower() == 'primary':
			extruder_name = 'extruder1'

		extruder = self.printer.lookup_object(extruder_name)
		nozzle_diameter = extruder.nozzle_diameter
		return nozzle_diameter

	def _get_nozzle_tip_diameter(self, nozzle_diameter=None):
		if nozzle_diameter is None:
			nozzle_diameter = self._get_nozzle_diameter()

		# Based on V6 standard, total nozzle tip diameter is typically 2.5 times hole diameter (spec'd up to 0.8mm),
		# except below 0.25mm where it's 1.5 times hole diameter. FIN specifies 2.0 times hole diameter.
		# Slice GammaMaster 2.4mm nozzle has ~3.75mm tip (from their published STEP model), a multiplier
		# of 1.56, or an increase of 1.35. Here we make some effort at a reasonable approximation.
		if nozzle_diameter < 0.25:
			nozzle_tip_dia = 1.5 * nozzle_diameter
		elif nozzle_diameter <= 0.8:
			nozzle_tip_dia = 2.5 * nozzle_diameter
		else:
			nozzle_tip_dia = nozzle_diameter + 1.35

		return nozzle_tip_dia

	desc_BEACON_PROBE_CLEAN = "Perform a series of beacon contact probes to displace filament from the nozzle tip."
	def cmd_BEACON_PROBE_CLEAN(self, gcmd):
		if self.beacon is None:
			raise self.printer.command_error("beacon is not configured, cannot run BEACON_PROBE_CLEAN")
		
		x = gcmd.get_float('X')
		y = gcmd.get_float('Y')		
		
		count = gcmd.get_int('COUNT', 6, minval=1)
		spacing = gcmd.get_float('SPACING', self._get_nozzle_tip_diameter(), minval=0.0)
		stamp_skip = gcmd.get_int('STAMP_SKIP', 0, minval=0)
		stamp_depth = gcmd.get_float('STAMP_DEPTH', 0.1, minval=0.0, maxval=0.2)
		stamp_wait = gcmd.get_int('STAMP_WAIT', 200, minval=0)
		stamp = gcmd.get('STAMP', '1').lower() in ('1', 'true', 'yes')
		
		speed = float(self.gm_ratos.variables.get('macro_travel_speed')) * 60.
		z_speed = float(self.gm_ratos.variables.get('macro_z_speed')) * 60.

		# Move to start position, perform initial probe which will be discarded beacuse first probe values can be unreliable
		self.gcode.run_script_from_command(
			f"G0 Z5 F{z_speed}\n"
			f"G0 X{x} Y{y} F{speed}\n"
			f"PROBE PROBE_METHOD=contact SAMPLES=1")

		# Perform the series of probes
		for i in range(count):
			self.gcode.run_script_from_command(f"G0 X{x + i * spacing} F{speed}\nPROBE PROBE_METHOD=contact SAMPLES=1")
			last_z_result = self.beacon.last_z_result
			if stamp and i >= stamp_skip:
				self.gcode.run_script_from_command(f"G0 Z{last_z_result - stamp_depth} F{z_speed}\nG4 P{stamp_wait}\nG0 Z2 F{z_speed}")

	desc_BEACON_CHECK_DIRECTIONAL_REPEATABILITY = "For diagnostics: perform a series of probe points to check the repeatability of the Beacon probe."
	def cmd_BEACON_CHECK_DIRECTIONAL_REPEATABILITY(self, gcmd):
		if self.beacon is None:
			raise self.printer.command_error("Beacon probe not configured")
		
		proceed = gcmd.get('PROCEED', '').lower() in ('true', 'yes', '1')
		if not proceed:
			self.console_echo('BEACON_CHECK_DIRECTIONAL_REPEATABILITY', 'info', 
				'_N_'.join([
					'This command will perform a series of probe points to check the repeatability',
					'of the Beacon probe. Before proceeding:',
					'- Ensure that the printer is fully commissioned and mechanically sound.',
					'- Ensure that the print sheet (eg, PEI spring steel sheet) is in place, and',
					'  is clean and free of debris.',
					'- Ensure the nozzle is clean and free of filament residue.',
					'- Ensure the printer is in a stable thermal state so that test results are not',
					'  affected by thermal or dimensional changes. Typically this means leaving the',
					'  printer open and unheated at room temperature for at least 2 hours, unless you',
					'  are specifically testing under heated conditions.',
					'- Ensure there are no drafts or vibrations that could affect the probe readings,',
					'  unless you are specifically testing under such conditions.',
					'',
					'Run the command again with PROCEED=YES to actually run the test.',
					'',
					'Optional parameters:',
					'- ACCEL: Acceleration in mm/s² for the moves (default: 4000, min: 100)',
					'- CYCLES: Number of full cycles to perform (default: 5, min: 1)',
					'- DIVISIONS: Number of divisions around the circle (default: 8, min: 4)',
					'- SPEED: Speed in mm/s for the moves (default: 300, min: 10)',
					'- DISTANCE: Distance in mm to move from center (default: 50, min: 5)',
					'- X: X coordinate of center point (default: safe home X position)',
					'- Y: Y coordinate of center point (default: safe home Y position)',

				]))
			return

		accel = gcmd.get_float('ACCEL', 4000., minval=100.)
		cycles = gcmd.get_int('CYCLES', 5, minval=1)
		divisions = gcmd.get_int('DIVISIONS', 8, minval=4)
		speed = gcmd.get_float('SPEED', 300., minval=10.)
		distance = gcmd.get_float('DISTANCE', 50., minval=5.)
		def_x, def_y = self.get_safe_home_position()
		x = gcmd.get_float('X', def_x)
		y = gcmd.get_float('Y', def_y)		
		
		bpr = self.get_beacon_probing_regions()
		
		if bpr is None:
			raise gcmd.error("Unexpected error: beacon probing regions are not available")
		
		if x < bpr.mesh_contact_min[0] or x > bpr.mesh_contact_max[0] or y < bpr.mesh_contact_min[1] or y > bpr.mesh_contact_max[1]:
			raise gcmd.error(f"X and Y must be within the beacon contact probing region: ({bpr.mesh_contact_min[0]}, {bpr.mesh_contact_min[1]}) - ({bpr.mesh_contact_max[0]}, {bpr.mesh_contact_max[1]})")

		printable_x_max, printable_y_max = self.get_printable_max_dimensions()

		# Ensure that the full movement circle is within the printable area
		if (x - distance) < 0 or (x + distance) > printable_x_max or (y - distance) < 0 or (y + distance) > printable_y_max:
			# Work out the nearest compatible coordiantes to what the user requested
			nearest_x = max(distance, min(x, printable_x_max - distance))
			nearest_y = max(distance, min(y, printable_y_max - distance))
			raise gcmd.error(f"The full movement circle must be within the printable area (0,0) - ({printable_x_max}, {printable_y_max}). For distance {distance}, the nearest compatible position to ({x}, {y}) is ({nearest_x}, {nearest_y}). Please adjust X, Y, or DISTANCE accordingly.")

		self.console_echo('BEACON_CHECK_DIRECTIONAL_REPEATABILITY', 'info', 
			'_N_'.join([
				f'Running {cycles} cycles of {divisions} divisions at ({x:.0f}, {y:.0f}), moving {distance} mm at {speed} mm/s, {accel} mm/s² acceleration.',
				'This may take several minutes, please wait...'
			]))
			
		self.gcode.run_script_from_command("MAYBE_HOME ABL=1\nSAVE_GCODE_STATE NAME=_BEACON_CHECK_REPEATABILITY")
		try:			
			self._beacon_check_directional_repeatability(gcmd, x, y, cycle_count=cycles, divisions=divisions, accel=accel, speed_mms=speed, distance=distance)
		finally:
			self.gcode.run_script_from_command("RESTORE_GCODE_STATE NAME=_BEACON_CHECK_REPEATABILITY")

	def _beacon_check_directional_repeatability(self, gcmd, x: float, y: float, *, cycle_count: int = 10, distance: float = 50., speed_mms: float = 300., accel: float = 4000., divisions: int = 8, timestamp = None):
		# For each cycle:
		#   For each division around a circle centered on (x, y):
		#     Move out to the point at distance along that angle
		#	  Move back to center and probe
		#     Record the probe result
		# After all cycles, compute statistics for each division
		# and report results.
		speed_f = speed_mms * 60
		# Move to start position
		self.gcode.run_script_from_command(f"_Z_HOP\nG0 X{x} Y{y} F{speed_f}")
		self.gcode.run_script_from_command(f"SET_VELOCITY_LIMIT ACCEL={accel}")
		results = []
		for cycle in range(cycle_count):
			for division in range(divisions):
				angle_rad = math.pi/2 - (2.0 * math.pi / divisions) * division
				target_x = x + distance * math.cos(angle_rad)
				target_y = y + distance * math.sin(angle_rad)
				# Move out to target
				self.gcode.run_script_from_command(f"G0 X{target_x} Y{target_y} F{speed_f}")
				# Move back to center
				self.gcode.run_script_from_command(f"G0 X{x} Y{y} F{speed_f}")
				# Probe
				self.gcode.run_script_from_command("PROBE PROBE_METHOD=contact SAMPLES=1 SAMPLES_DROP=0")
				# Get last probe result
				last_z = self.beacon.last_z_result
				results.append( (division, last_z) )
				
		stats_by_division = {}
		pc_groups = (('<=30pc', 30), ('<=85pc', 85), ('<=98pc', 98), ('all', 100))
		
		# used_values_mask is a numpy boolean array which the function updates to indicate which values were used
		# in the calculation (ie, below the percentile cutoff). When computing per-division statistics
		# pass the `indices` argument (list of indices into the global `results`) so the mask can be
		# updated at the correct positions.
		def get_stats_below_percentile(arr, p, used_values_mask = None, indices = None):
			pc = np.percentile(arr, p)
			pc_below = arr[arr <= pc]
			if len(pc_below) == 0:
				return {
					'mean': None,
					'stddev': None,
					'min': None,
					'max': None,
					'range': None,
					'gradient': None,
					'count': 0
				}
			
			# Mark used values in the mask. If `indices` is provided, arr represents a slice of the
			# global results and we must assign into the full-length mask at those indices.
			if used_values_mask is not None:
				if indices is None:
					used_values_mask |= (arr <= pc)
				else:
					used_values_mask[np.array(indices, dtype=int)] |= (arr <= pc)

			# Fit a 1-degree polynomial (line) to the data to get the gradient
			# x values are the indices of the points
			x_vals = np.arange(len(pc_below))
			if len(pc_below) >= 2:
				p_coeff = np.polyfit(x_vals, pc_below, 1)
				gradient = p_coeff[0]
			else:
				gradient = 0.0
			return {
				'mean': round(float(np.mean(pc_below)), 4),
				'stddev': round(float(np.std(pc_below)), 4),
				'min': round(float(np.min(pc_below)), 4),
				'max': round(float(np.max(pc_below)), 4),
				'range': round(float(np.max(pc_below) - np.min(pc_below)), 4),
				'count': len(pc_below),
				'gradient': round(float(gradient), 6)
			}

		used_values_masks_by_pc_label = { pc_label: np.zeros(len(results), dtype=bool) for (pc_label, pc) in pc_groups }

		for division in range(divisions):
			# Preserve the original indices into `results` so the global used_values_mask can be updated
			division_results = [(idx, z) for idx, (div, z) in enumerate(results) if div == division]
			indices = [idx for idx, _ in division_results]
			arr = np.array([z for _, z in division_results])
			stats = {
				# angle, where 0 is +Y axis and increases clockwise
				'angle': (360.0 / divisions) * division,
			}
			for pc_label, pc in pc_groups:
				stats[pc_label] = get_stats_below_percentile(arr, pc, used_values_masks_by_pc_label[pc_label], indices=indices)
			stats_by_division[division] = stats
			self.reactor.pause(self.reactor.monotonic() + 0.1)
		
		def format_stats(stats):
			mean = f"{stats['mean']*1000.:7.0f}"  if stats['mean']  is not None else f"{'-':>7}"
			sd   = f"{stats['stddev']*1000.:7.1f}" if stats['stddev'] is not None else f"{'-':>7}"
			mn   = f"{stats['min']*1000.:7.0f}"    if stats['min']    is not None else f"{'-':>7}"
			mx   = f"{stats['max']*1000.:7.0f}"    if stats['max']    is not None else f"{'-':>7}"
			rng  = f"{stats['range']*1000.:7.0f}"  if stats['range']  is not None else f"{'-':>7}"
			return mean, sd, mn, mx, rng
		
		def format_angle(angle):
			prefix = ''
			if math.isclose(angle, 0):
				prefix = '+Y'
			elif math.isclose(angle, 90):
				prefix = '+X'
			elif math.isclose(angle, 180):
				prefix = '-Y'
			elif math.isclose(angle, 270):
				prefix = '-X'
			return f"{prefix}{angle:>8.0f}" if prefix else f"{angle:>10.0f}"			
		
		header = f"| {'Angle (°)':>10} {'Count':>6} {'Mean':>7} {'StdDev':>7} {'Min':>7} {'Max':>7} {'Range':>7} (µm)"
		def format_line(angle, count, mean, sd, mn, mx, rng, gradient):
			note = ''
			if count < 5:
				note = ' ~ low count'
			elif gradient > 0.0005:
				note = f' ! trend gradient {gradient*1000.:.1f} µm/point, possible thermal drift'

			return f"| {f'{angle:>10}' if isinstance(angle, str) else format_angle(angle)} {count:>6d} {mean} {sd} {mn} {mx} {rng}{note}"
		
		for pc_label, pc in pc_groups:
			table_lines = []
			table_lines.append(header)
			for division in range(divisions):
				stats = stats_by_division[division][pc_label]
				angle = stats_by_division[division]['angle']
				count = stats['count']
				gradient = stats['gradient']
				mean, sd, mn, mx, rng = format_stats(stats)
				line = format_line(angle, count, mean, sd, mn, mx, rng, gradient)
				table_lines.append(line)

			# Add a line showing the stats for values used in this percentile group accross divisions
			# Here are rejecting values above the percentile cutoff for each division (considered *by division*)
			# Note that the use of a mask allows the orginal order of samples to be considered, which is relevant
			# for the gradient calculation.
			used_values_mask = used_values_masks_by_pc_label[pc_label]
			used_values = [z for i, (div, z) in enumerate(results) if used_values_mask[i]]
			arr = np.array(used_values)
			used_stats = get_stats_below_percentile(arr, 100)
			mean, sd, mn, mx, rng = format_stats(used_stats)
			count = used_stats['count']
			gradient = used_stats['gradient']
			line = format_line('USED ABOVE', count, mean, sd, mn, mx, rng, gradient)
			table_lines.append(line)
			# Add a final line showing the stats applying the percentile cutoff to all results together.
			# Here the percentile cutoff is applied *globally* across all divisions.
			all_results = [z for (div, z) in results]
			arr = np.array(all_results)
			all_stats = get_stats_below_percentile(arr, pc)
			mean, sd, mn, mx, rng = format_stats(all_stats)
			count = all_stats['count']
			gradient = all_stats['gradient']
			line = format_line('ALL', count, mean, sd, mn, mx, rng, gradient)
			table_lines.append(line)
			
			table_str = "\n".join(table_lines)
			
			gcmd.respond_info(f'({x:.0f}, {y:.0f}) {cycle_count} x {distance} mm @ {speed_mms} mm/s @ {accel} mm/s² {pc_label}:\n\n{table_str}')
		
		self.reactor.pause(self.reactor.monotonic() + 0.1)
		
		json_output = {
			'x_center': x,
			'y_center': y,
			'cycle_count': cycle_count,
			'distance': distance,
			'speed_mms': speed_mms,
			'accel': accel,
			'divisions': divisions,
			'stats': stats_by_division,
			'results': {
				division: [z for (div, z) in results if div == division]
				for division in range(divisions)
			}
		}

		json_str = json.dumps(json_output, indent=4)
		self.reactor.pause(self.reactor.monotonic() + 0.1)

		timestamp_str = time.strftime("%Y%m%d_%H%M%S", timestamp or time.localtime())
		config_file = self.printer.get_start_args()['config_file']
		config_dir = os.path.dirname(config_file)
		diag_dir = os.path.join(config_dir, 'diagnostics')
		
		if not os.path.exists(diag_dir):
			try:
				os.makedirs(diag_dir)
			except Exception as e:
				self.console_echo('BEACON_CHECK_DIRECTIONAL_REPEATABILITY', 'error', f'Failed to create diagnostics directory at {diag_dir}: {e}')
				diag_dir = config_dir
			self.reactor.pause(self.reactor.monotonic() + 0.1)

		json_path = os.path.join(diag_dir, f'beacon_repeatability_{timestamp_str}_x{x:.0f}_y{y:.0f}.json')

		try:
			with open(json_path, 'w') as fh:
				fh.write(json_str)
			self.console_echo('BEACON_CHECK_DIRECTIONAL_REPEATABILITY', 'info', f'Results written to {json_path}')
		except Exception as e:
			self.console_echo('BEACON_CHECK_DIRECTIONAL_REPEATABILITY', 'error', f'Failed to write results to {json_path}: {e}')

	desc_CAMERA_SNAPSHOT = "For development use only. Take a snapshot from crowsnest snapshot URL and save it to the snapshots subdirectory of the Klipper config directory. Optionally specify SUBDIR to save in a subdirectory of snapshots. Optionally specify URL (default is 'localhost:8080/snapshot')."
	def cmd_CAMERA_SNAPSHOT(self, gcmd):
		subdir = gcmd.get('SUBDIR', '').strip()
		url = gcmd.get('URL', 'http://localhost:8080/snapshot')

		main_config_path = self.printer.get_start_args()['config_file']
		if not main_config_path:
			raise self.printer.command_error("Could not determine the klipper config path!")
		config_dir = os.path.dirname(main_config_path)
		snapshots_dir = os.path.join(config_dir, 'snapshots')		
		if subdir:
			snapshots_dir = os.path.join(snapshots_dir, subdir)

		if not os.path.exists(snapshots_dir):
			try:
				os.makedirs(snapshots_dir)
			except Exception as e:
				return (True, f"Failed to create output directory at {snapshots_dir}: {e}")
			index = 0
		else:
			# find the next available filename
			def index_exists(idx):
				image_path = os.path.join(snapshots_dir, f"image_{idx:04d}.jpg")
				return os.path.exists(image_path)

			# Use self._last_camera_snapshot_index_by_subdir as a simple hint to avoid scanning the directory every time
			last_index = self._last_camera_snapshot_index_by_subdir.get(subdir, 0)
			if index_exists(last_index) and not index_exists(last_index + 1):
				index = last_index + 1
			else:
				index = 0
				while True:
					if not index_exists(index):
						break
					index += 1

		self._last_camera_snapshot_index_by_subdir[subdir] = index
		image_path = os.path.join(snapshots_dir, f"image_{index:04d}.jpg")		
		executor = ThreadPoolExecutor(max_workers=1)
		future = executor.submit(_download_task, url, image_path)
		
		while not future.done():
			self.reactor.pause(self.reactor.monotonic() + 0.1)
		
		executor.shutdown(wait=False)
		
		e = future.exception()
		if e is not None:
			raise gcmd.error(f"Failed to retrieve snapshot from {url}: {e!r}") from e
		
		gcmd.respond_info(f"Snapshot saved to {image_path}")
	
		
class BackgroundDisplayStatusProgressHandler:
	def __init__(
			self, 
			printer,
			msg_fmt = "{spinner} {progress:.0f}%",
			display_status_update_interval=0.8,
			spinner_sequence="⠋⠙⠹⠸⠼⠴⠦⠧⠇"):
				
		self.reactor = printer.get_reactor()
		self.gcode = printer.lookup_object('gcode')
		self.display_status = printer.lookup_object('display_status')
		self.display_status_update_interval = display_status_update_interval
		self._spinner_sequence = spinner_sequence
		self._spinner_phase = 0
		self._timer = None
		self._auto_rate_last_eventtime = None
		self.msg_fmt = msg_fmt
		self._progress = 0.0
		self._auto_rate = 0.0

	def enable(self):
		if self._timer:
			return
		
		self._timer = self.reactor.register_timer(
			self._handle_timer, self.reactor.NOW)

	def disable(self):
		if self._timer is None:
			return
		
		self.reactor.unregister_timer(self._timer)
		self._timer = None
		self.display_status.message = None
		self.display_status.progress = None

	@property
	def progress(self):
		return self._progress

	@progress.setter
	def progress(self, value):
		self._progress = min(1.0, max(0.0, value))

	def set_auto_rate(self, increment_per_second):
		"""
		Set the auto rate for the background progress handler.
		This is the amount by which the progress will be automatically incremented per second.
		"""
		self._auto_rate_last_eventtime = None
		self._auto_rate = increment_per_second

	def _handle_timer(self, eventtime):
		if self._auto_rate_last_eventtime is None:
			self._auto_rate_last_eventtime = eventtime

		if self._auto_rate > 0.0:
			self._progress = min(1.0, max(0.0, self._progress + self._auto_rate * (eventtime - self._auto_rate_last_eventtime)))

		self._auto_rate_last_eventtime = eventtime

		spinner = self._spinner_sequence[self._spinner_phase]
		self._spinner_phase = (self._spinner_phase + 1) % len(self._spinner_sequence)

		if self.msg_fmt is not None:
			self.display_status.message = self.msg_fmt.format(progress=self._progress * 100.0, spinner=spinner)
		
		return self.reactor.monotonic() + self.display_status_update_interval

#####
# Loader
#####
def load_config(config):
	return RatOS(config)