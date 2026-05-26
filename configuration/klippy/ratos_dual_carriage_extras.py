# Enhancements and utilities for printers with a dual carriage axis
#
# Copyright (C) 2026 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.

import logging
import os

class RatOSDualCarriageExtras:
	def __init__(self, config):
		self.name = config.get_name()
		self.printer = config.get_printer()

		self.auto_align_on_mode_change = config.getboolean('auto_align_on_mode_change', True)

		if not config.has_section("dual_carriage"):
			logging.info(f"{self.name}: configuration section [dual_carriage] not found, {self.name} will not be initialized.")
			return

		self.gcode = self.printer.lookup_object('gcode')

		# Note: all config settings we own must be accessed during the ctor as per Klipper guidelines,
		# as access during this phase has the side effect of defining the set of valid config keys.
		# Only use self.config to later access settings we don't own.
		self.config = config

		self.ratos = None
		self.gm_ratos = None
		self.dual_carriage = None
		self.dc_axis_index = None
		self.dc_axis_name = None
		self._original_set_dual_carriage_cmd = None

		self.printer.register_event_handler("klippy:connect", self._connect)

	def _connect(self):
		self.ratos = self.printer.lookup_object('ratos')
		self.gm_ratos = self.printer.lookup_object('gcode_macro RatOS')
		self.dual_carriage = self.printer.lookup_object("dual_carriage")
		self.dc_axis_index = self.dual_carriage.axis
		self.dc_axis_name = {0: 'x', 1: 'y'}[self.dual_carriage.axis]

		self._register_commands()
		self._register_command_overrides()

	#####
	# Gcode commands
	#####
	def _register_commands(self):
		self.gcode.register_command('CONFIGURE_DC_ENDSTOP', self.cmd_CONFIGURE_DC_ENDSTOP, desc=self.desc_CONFIGURE_DC_ENDSTOP)
		self.gcode.register_command('RESET_DC_ENDSTOP_CONFIGURATION', self.cmd_RESET_DC_ENDSTOP_CONFIGURATION, desc=self.desc_RESET_DC_ENDSTOP_CONFIGURATION)
		self.gcode.register_command('INCREASE_Y_MAX', self.cmd_INCREASE_Y_MAX, desc=self.desc_INCREASE_Y_MAX)
		self.gcode.register_command('RESET_Y_MAX_ADJUSTMENT', self.cmd_RESET_Y_MAX_ADJUSTMENT, desc=self.desc_RESET_Y_MAX_ADJUSTMENT)

	def _register_command_overrides(self):
		if self.auto_align_on_mode_change:
			self._original_set_dual_carriage_cmd = self._override_command('SET_DUAL_CARRIAGE', self.override_SET_DUAL_CARRIAGE, desc_suffix=self.desc_suffix_SET_DUAL_CARRIAGE)
			logging.info(f"{self.name}: auto_align_on_mode_change is enabled: toolhead will be aligned to kinematic position on {self.dc_axis_name.upper()} axis before changing dual carriage mode to prevent {self.dc_axis_name}-offset drift. Use SKIP_ALIGN=1 with SET_DUAL_CARRIAGE to skip the alignment if needed.")
		else:
			logging.info(f"{self.name}: auto_align_on_mode_change is disabled: toolhead will not be automatically aligned to kinematic position before changing dual carriage mode. This may result in {self.dc_axis_name}-offset drift between toolheads. Use auto_align_on_mode_change: True to enable automatic alignment.")
			
	def _override_command(self, cmd_name, new_cmd, *, when_not_ready:bool=False, desc:str=None, desc_suffix:str=None):
		if desc is None:
			desc = self.gcode.get_command_help().get(cmd_name, None)

		if desc_suffix is not None:
			if desc is None:
				desc = desc_suffix
			else:
				if not desc.endswith('.'):
					desc = desc + '.'
				desc = desc + ' ' + desc_suffix

		is_base_handler = self.gcode.base_gcode_handlers.get(cmd_name, None) is not None
		
		if is_base_handler != when_not_ready:
			raise self.printer.config_error(f"{cmd_name} is {'' if is_base_handler else 'not '}a base (aka 'when-not-ready') gcode handler, this is not expected. {self.name} cannot be enabled.")
		
		original_cmd = self.gcode.register_command(cmd_name, None)
		
		if original_cmd is None:
			raise self.printer.config_error(f"An existing {cmd_name} command is not registered, {self.name} cannot be enabled. Make sure that [beacon] is declared before [{self.name}] in printer.cfg.")

		self.gcode.register_command(cmd_name, new_cmd, when_not_ready=when_not_ready, desc=desc)
		return original_cmd

	desc_suffix_SET_DUAL_CARRIAGE = "Enhanced by RatOS to first align toolhead to kinematic position, to prevent potential positional drift due to sub-microstep rounding behaviours. Use SKIP_ALIGN=1 to skip the alignment if desired."
	def override_SET_DUAL_CARRIAGE(self, gcmd):
		skip_align = gcmd.get('SKIP_ALIGN', '').lower() in ('true', 'yes', '1')
		if self.auto_align_on_mode_change and not skip_align:
			self._align_to_kinematic_position(self.dc_axis_name)
		self._original_set_dual_carriage_cmd(gcmd)

	def _align_to_kinematic_position(self, axis_name):
		"""
		Align toolhead to kinematic position on the specified axis, if the discrepancy is within a reasonable threshold.
		
		Parameters:
			axis_name (str): The axis to align, one of 'x', 'y', or 'z' (case-insensitive).		
		"""
		# This is intended to correct sub-microstep offsets that can arise between the toolhead position
		# and the kinematic position. Such offsets can result in positional drift when changing dual carriage modes,
		# typically of one microstep distance per cycle of mode changes (eg, T0->T1->T0) - the MCU step count
		# drifts while the calculated kinematic position does not. This drift does not always happen: it
		# appears to depend on some discrepancy in rounding at different layers of the motion system that is not
		# fully round-tripable.
		#
		# The simple safety rule is: don't change dual carriage mode when the toolhead position is not at a
		# microstep boundary on the dual carriage axis (typically the X axis).
		if len(axis_name) != 1 or axis_name not in 'xyz':
			raise self.gcode.error(f"Invalid axis_name: '{axis_name}'. Must be one of x, y, or z.")
		axis_index = 'xyz'.index(axis_name)
		axis_name_upper = axis_name.upper()

		toolhead = self.printer.lookup_object('toolhead')
		toolhead.flush_step_generation()
		kin = toolhead.get_kinematics()
		steppers = kin.get_steppers()

		stepper_positions_list = [(s.get_name(), s.get_commanded_position()) for s in steppers]
		stepper_positions = dict(stepper_positions_list)
		kin_pos = kin.calc_position(stepper_positions)

		toolhead_pos = toolhead.get_position()
		
		kin_ap = kin_pos[axis_index]
		toolhead_ap = toolhead_pos[axis_index]
		delta = abs(kin_ap - toolhead_ap)
		
		if delta < 1e-9:
			logging.debug(f"{self.name}: _align_to_kinematic_position: toolhead is already aligned to kinematic position on axis {axis_name_upper} (delta {delta:.6f}), no action needed.")
			return

		# Note that *by definition*, after flush_step_generation(), the kinematic and toolhead positions
		# should not differ by more than a microstep. We perform a belt and braces sanity check out of
		# an abundance of caution, and to provide a more informative message if the positions appear
		# significantly misaligned.
		#
		# Determine the minimum change in kinematic position on the specified axis that could result
		# in a change in commanded stepper position any of the steppers that affect this axis. We will
		# not perform a move if the discrepancy is larger than this, as a) it would cause an actual
		# physical move; and b) this is not an expected scenario and indicates a misunderstanding or
		# fault state that should be investigated rather than automatically corrected.
		#
		# We simulate moves in both directions for each stepper, as the cartesian result may differ
		# for non-linear kinematics.
		max_no_stepper_move_distance = None
		for stepper in steppers:
			name = stepper.get_name()
			step_dist = stepper.get_step_dist()
			
			# Check the forward step (+1)
			steppers_forward = dict(stepper_positions)
			steppers_forward[name] += step_dist
			kin_forward = kin.calc_position(steppers_forward)
			one_step_shift_forward = abs(kin_forward[axis_index] - kin_pos[axis_index])
			
			# Check the backward step (-1)
			steppers_backward = dict(stepper_positions)
			steppers_backward[name] -= step_dist
			kin_backward = kin.calc_position(steppers_backward)
			one_step_shift_backward = abs(kin_backward[axis_index] - kin_pos[axis_index])
			
			min_step_shift = min(one_step_shift_forward, one_step_shift_backward)

			# min_step_shift will be zero for inactive steppers (eg, the inactive carriage in dual carriage),
			# ignore those as they do not affect the position on this axis.
			if min_step_shift < 1e-9:
				continue

			if max_no_stepper_move_distance is None or min_step_shift < max_no_stepper_move_distance:
				max_no_stepper_move_distance = min_step_shift

		if max_no_stepper_move_distance is None:
			# This should not happen, as there should be at least one stepper affecting each axis, but we check just in case.
			# Note: we don't raise an error here because we don't want to cause a failure in this command if the kinematics are in some unexpected state; we just won't perform the alignment.
			logging.error(f"{self.name}: _align_to_kinematic_position: could not determine the minimum stepper move distance for {axis_name_upper} axis: no steppers found affecting this axis.")
			return
		
		# floating point boundary allowance
		max_no_stepper_move_distance += 1e-7
		
		curtime = self.printer.get_reactor().monotonic()
		is_homed = axis_name in kin.get_status(curtime)['homed_axes']
		is_sensible = delta <= max_no_stepper_move_distance

		if not is_sensible:
			logging.error(
				f"{self.name}: _align_to_kinematic_position: divergence between toolhead position and kinematic {axis_name_upper} position exceeds safe threshold of {max_no_stepper_move_distance:.9f}:\n"
				f"kinematic: {kin_ap:.6f}, toolhead: {toolhead_ap:.6f}, delta: {delta:.9f}\n"
				"Alignment skipped to avoid unexpected physical move.")
		elif not is_homed:
			logging.debug(f"{self.name}: _align_to_kinematic_position: {axis_name_upper} axis is not homed; skipping alignment")
		else:
			logging.info(f"{self.name}: _align_to_kinematic_position: aligning toolhead to kinematic position for {axis_name_upper} axis: {toolhead_ap:.6f} -> {kin_ap:.6f} (delta {delta:.6f}, safe threshold {max_no_stepper_move_distance:.6f})")
			pos = [None] * 4
			pos[axis_index] = kin_pos[axis_index]
			toolhead.manual_move(pos, 100.)

	desc_RESET_Y_MAX_ADJUSTMENT = "Resets the adjustment of the maximum Y position. The adjustment is used only on IDEX machines when it's not possible to position the nozzle over the VAOC camera. Run INCREASE_Y_MAX to increase the maximum Y position by one millimeter each time it is run."
	def cmd_RESET_Y_MAX_ADJUSTMENT(self, gcmd):
		main_config_path = self.printer.get_start_args()['config_file']
		if not main_config_path:
			raise self.printer.command_error("Could not determine the config path to update adjust-y-max.cfg")
		config_dir = os.path.dirname(main_config_path)		
		config_path = os.path.join(config_dir, 'ratos_generated', 'adjust-y-max.cfg')
		content = \
			'# WARNING. THIS FILE IS GENERATED BY RATOS AND\n' + \
			'# WILL BE UPDATED BY THE INCREASE_Y_MAX MACRO.\n' + \
			'# DO NOT DELETE OR MODIFY THIS FILE.\n'		
		try:
			os.makedirs(os.path.dirname(config_path), exist_ok=True)
			with open(config_path, 'w') as f:
				f.write(content)
		except Exception as e:
			self.ratos.console_echo('Failed to reset adjustment of maximum Y position', 'error', f'Could not write to {config_path}: {str(e)}')
			return		
		self.ratos.console_echo('Adjustment of maximum Y position reset', 'info', f'Successfully reset {config_path}_N_You must restart klipper for the changes to take effect, then run INCREASE_Y_MAX to perform the configuration.')
	
	desc_INCREASE_Y_MAX = "Increases the maximum Y position by one millimeter. Used only on IDEX machines when it's not possible to position the nozzle over the VAOC camera."
	def cmd_INCREASE_Y_MAX(self, gcmd):
		bed_margin_y = self.gm_ratos.variables.get('bed_margin_y')
		# bed_margin_y is expected to be [number, number]
		if bed_margin_y is None or not isinstance(bed_margin_y, list) or len(bed_margin_y) != 2 or not all(isinstance(v, (int, float)) for v in bed_margin_y):
			self.ratos.console_echo('Missing or invalid RatOS variable', 'error', 'The required [gcode_macro RatOS] variable_bed_margin_y is missing or invalid.')
			return
		if not self.config.has_section("stepper_y"):
			self.ratos.console_echo('Missing [stepper_y] section', 'error', 'The required [stepper_y] configuration section is missing.')
			return
		stepper_y_config = self.config.getsection("stepper_y")
		stepper_y_position_max = stepper_y_config.getfloat("position_max", default=None)
		stepper_y_position_endstop = stepper_y_config.getfloat("position_endstop", default=None)
		if stepper_y_position_max is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [stepper_y] position_max setting is missing from the configuration.')
			return
		if stepper_y_position_endstop is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [stepper_y] position_endstop setting is missing from the configuration.')
			return
		new_max_y = stepper_y_position_max + 1.0
		content = \
			'# WARNING. THIS FILE WAS GENERATED BY THE RATOS INCREASE_Y_MAX MACRO.\n' + \
			'# DO NOT DELETE OR MODIFY THIS FILE.\n' + \
			'#\n' + \
			'# To reset the adjustment, so that the default unadjusted value is used,\n' + \
			'# run the RESET_Y_MAX_ADJUSTMENT macro.\n' + \
			'\n' + \
			'[stepper_y]\n' + \
			f'position_max: {new_max_y:.3f}\n' + \
			'\n' + \
			'[gcode_macro RatOS]\n' + \
			f'variable_bed_margin_y: [{abs(stepper_y_position_endstop):.3f}, {bed_margin_y[1] + 1:.3f}]\n'				
		main_config_path = self.printer.get_start_args()['config_file']
		if not main_config_path:
			raise self.printer.command_error("Could not determine the config path to update adjust-y-max.cfg")		
		config_dir = os.path.dirname(main_config_path)		
		config_path = os.path.join(config_dir, 'ratos_generated', 'adjust-y-max.cfg')
		try:
			os.makedirs(os.path.dirname(config_path), exist_ok=True)
			with open(config_path, 'w') as f:
				f.write(content)
		except Exception as e:
			self.ratos.console_echo('Failed to update maximum Y position adjustment', 'error', f'Could not write to {config_path}: {str(e)}')
			return
		if str(gcmd.get('RESTART', '0')).strip().lower() in ('1', 'true', 'yes'):
			self.ratos.console_echo('Maximum Y position adjustment updated', 'info', f'Updated {config_path}_N_New maximum Y position is {new_max_y:.3f}._N_Restarting klipper to allow the changes to take effect...')
			# Request a restart
			self.gcode.request_restart('restart')
		else:
			self.ratos.console_echo('Maximum Y position adjustment updated', 'info', f'Updated {config_path}_N_New maximum Y position is {new_max_y:.3f}._N_You must RESTART klipper for the changes to take effect.')

	desc_RESET_DC_ENDSTOP_CONFIGURATION = "Resets the dc-endstop.cfg configuration file, allowing reconfiguration of dual carriage endstop settings using the CONFIGURE_DC_ENDSTOP macro."
	def cmd_RESET_DC_ENDSTOP_CONFIGURATION(self, gcmd):
		main_config_path = self.printer.get_start_args()['config_file']
		if not main_config_path:
			raise self.printer.command_error("Could not determine the config path to update dc-endstop.cfg")
		config_dir = os.path.dirname(main_config_path)		
		config_path = os.path.join(config_dir, 'ratos_generated', 'dc-endstop.cfg')
		content = \
			'# WARNING. THIS FILE IS GENERATED BY RATOS AND\n' + \
			'# WILL BE UPDATED BY THE CONFIGURE_DC_ENDSTOP MACRO.\n' + \
			'# DO NOT DELETE OR MODIFY THIS FILE.\n'		
		try:
			os.makedirs(os.path.dirname(config_path), exist_ok=True)
			with open(config_path, 'w') as f:
				f.write(content)
		except Exception as e:
			self.ratos.console_echo('Failed to reset DC endstop configuration', 'error', f'Could not write to {config_path}: {str(e)}')
			return		
		self.ratos.console_echo('DC endstop configuration reset', 'info', f'Successfully reset {config_path}_N_You must restart klipper for the changes to take effect, then run CONFIGURE_DC_ENDSTOP to perform the configuration.')

	desc_CONFIGURE_DC_ENDSTOP = "Updates the dc-endstop.cfg configuration file, configuring dual carriage endstop settings taking account of the last measured IDEX toolhead offsets (for example, from VAOC)."
	def cmd_CONFIGURE_DC_ENDSTOP(self, gcmd):		
		is_configured = self.gm_ratos.variables.get('dc_endstop_is_configured', False) == True
		if is_configured:
			self.ratos.console_echo(
				'DC endstop already configured', 'warning', 
				'The dual carriage endstop has already been configured. If you want to reconfigure it,_N_' + \
				'you must run the RESET_DC_ENDSTOP_CONFIGURATION macro first, then RESTART klipper, then run CONFIGURE_DC_ENDSTOP again.')
			return
		if not self.config.has_section("stepper_x"):
			self.ratos.console_echo('Missing [stepper_x] section', 'error', 'The required [stepper_x] configuration section is missing.')
			return		
		if not self.config.has_section("save_variables"):
			self.ratos.console_echo('Missing [save_variables] section', 'error', 'The required [save_variables] configuration section is missing.')
			return		
		dc_config = self.config.getsection("dual_carriage")
		stepper_x_config = self.config.getsection("stepper_x")

		stepper_x_position_max = stepper_x_config.getfloat("position_max", default=None)
		stepper_x_position_endstop = stepper_x_config.getfloat("position_endstop", default=None)
		dual_carriage_position_max = dc_config.getfloat("position_max", default=None)
		dual_carriage_position_endstop = dc_config.getfloat("position_endstop", default=None)

		if stepper_x_position_max is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [stepper_x] position_max setting is missing from the configuration.')
			return
		if stepper_x_position_endstop is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [stepper_x] position_endstop setting is missing from the configuration.')
			return
		if dual_carriage_position_max is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [dual_carriage] position_max setting is missing from the configuration.')
			return
		if dual_carriage_position_endstop is None:
			self.ratos.console_echo('Missing configuration value', 'error', 'The required [dual_carriage] position_endstop setting is missing from the configuration.')
			return

		svv = self.printer.lookup_object("save_variables", None)
		if svv is None:
			self.ratos.console_echo('save_variables object not found', 'error', 'The save_variables object was not found.')
			return
		svv = self.printer.lookup_object("save_variables").allVariables
		missingKeys = []
		for key in ('idex_xoffset', 'idex_xcontrolpoint', 'idex_ycontrolpoint'):
			if not key in svv:
				missingKeys.append(key)
		if len(missingKeys) > 0:
			self.ratos.console_echo('Missing saved variable(s)', 'error', 'The following required saved variable(s) are missing: ' + ', '.join(missingKeys) + '. Please run the VAOC calibration first.')
			return
		idex_xoffset = float(svv['idex_xoffset'])
		idex_xcontrolpoint = float(svv['idex_xcontrolpoint'])
		idex_ycontrolpoint = float(svv['idex_ycontrolpoint'])

		content = \
			'# WARNING. THIS FILE WAS GENERATED BY THE RATOS CONFIGURE_DC_ENDSTOP MACRO.\n' + \
			'# DO NOT DELETE OR MODIFY THIS FILE.\n' + \
			'#\n' + \
			'# To reconfigure:\n' + \
			'# 1. Run the RESET_DC_ENDSTOP_CONFIGURATION macro which will reset this file.\n' + \
			'# 2. RESTART klipper, so the reset changes take effect.\n' + \
			'# 3. Run the CONFIGURE_DC_ENDSTOP macro to perform the configuration.\n' + \
			'# 4. RESTART klipper again to apply the new configuration\n' + \
			'\n' + \
			'[dual_carriage]\n' + \
			f'position_max: {dual_carriage_position_max + idex_xoffset:.3f}\n' + \
			f'position_endstop: {dual_carriage_position_endstop + idex_xoffset:.3f}\n' + \
			'\n' + \
			'[gcode_macro RatOS]\n' + \
			'variable_dc_endstop_is_configured: True\n' + \
			f'variable_bed_margin_x: [{abs(stepper_x_position_endstop):.3f}, {dual_carriage_position_max - stepper_x_position_max + idex_xoffset:.3f}]\n' + \
			'\n' + \
			'[gcode_macro _VAOC]\n' + \
			f'variable_expected_camera_x_position: {idex_xcontrolpoint:.3f}\n' + \
			f'variable_expected_camera_y_position: {idex_ycontrolpoint:.3f}\n' + \
			'\n' + \
			'[gcode_macro T0]\n' + \
			f'variable_parking_position: {stepper_x_position_endstop + 2:.3f}\n' + \
			'\n' + \
			'[gcode_macro T1]\n' + \
			f'variable_parking_position: {dual_carriage_position_endstop + idex_xoffset - 2:.3f}\n'

		main_config_path = self.printer.get_start_args()['config_file']
		if not main_config_path:
			raise self.printer.command_error("Could not determine the config path to update dc-endstop.cfg")
		config_dir = os.path.dirname(main_config_path)		
		config_path = os.path.join(config_dir, 'ratos_generated', 'dc-endstop.cfg')
		existing_content = None
		
		if os.path.exists(config_path):
			try:
				with open(config_path, 'r') as f:
					existing_content = f.read()
			except Exception:
				pass
		
		if existing_content == content:
			self.ratos.console_echo('DC endstop configuration is up to date', 'info', f'No changes were made to dc-endstop.cfg at {config_path}.')
			return
		
		try:
			os.makedirs(os.path.dirname(config_path), exist_ok=True)
			with open(config_path, 'w') as f:
				f.write(content)
		except Exception as e:
			self.ratos.console_echo('Failed to update DC endstop configuration', 'error', f'Could not write to {config_path}: {str(e)}')
			return

		# Reset idex_xoffset to zero since it's now been implicitly applied via DC endstop configuration
		self.gcode.run_script_from_command("SAVE_VARIABLE VARIABLE=idex_xoffset VALUE=0")

		if str(gcmd.get('RESTART', '0')).strip().lower() in ('1', 'true', 'yes'):
			self.ratos.console_echo('DC endstop configuration updated', 'info', f'Updated {config_path}_N_Restarting klipper to allow the changes to take effect...')
			# Request a restart
			self.gcode.request_restart('restart')
		else:
			self.ratos.console_echo('DC endstop configuration updated', 'info', f'Updated {config_path}_N_You must RESTART klipper for the changes to take effect.')

#####
# Loader
#####
def load_config(config):
	return RatOSDualCarriageExtras(config)
