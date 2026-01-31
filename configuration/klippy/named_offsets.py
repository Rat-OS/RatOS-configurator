# Named Offsets
#
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
#
# Manages multiple named offsets with semantics similar to SET_GCODE_OFFSET. Allows
# setting, resetting, and querying of named offsets, each of which can have X, Y, Z, and E
# components. The combined offset is applied to all movements via the gcode_move transform.
#
# This allows for compartmentalised management of offsets for different purposes, such as IDEX toolhead
# adjustments and thermal expansion compensation - while leaving the primary offset controlled
# by SET_GCODE_OFFSET free for user adjustments.
#
# SAVE_GCODE_STATE and RESTORE_GCODE_STATE are overridden to include the named offsets in
# the saved/restored state.
#
# GET_POSITION is overridden to add reporting of the named offsets.
#
# get_status() is implemented to provide access to the individual named offsets and the combined offset
# in the same way as gcode_move's get_status() provides access to the gcode offset. For example,
# a macro template can use:
# 	`{% set x = printer.named_offsets.toolhead_alignment.x %}`
#
# Each named offset can be configured to reset on specific events (e.g. motor_off, end_print). This
# decouples high-level intent (e.g. "reset offsets at end of print") from the specific offsets that
# should be reset in response to that intent. The motor_off event is handled automatically. Other events
# can be triggered via the RESET_NAMED_OFFSET command.

from typing import Dict, Tuple, Final
from math import isclose
import logging
from dataclasses import dataclass, field
import textwrap

# TODO: consider:
#   allow valid offset names to be specificed in config (we restrict to valid to avoid accidental typos in use)
#     name_toolhead: "description of toolhead"
#     toolhead_reset_events: ['motor_off', 'some_other_event']

# a dataclass encapsulating configuration for a named offset
@dataclass
class NamedOffsetConfig:
	description: str
	reset_events: Tuple[str, ...] = field(default_factory=lambda: ('motor_off',))

OFFSETS: Final[Dict[str, NamedOffsetConfig]] = {
	'toolhead_alignment': NamedOffsetConfig(
		description='The offset that keeps nozzles aligned in multi-toolhead setups. Typically T0 is the reference toolhead with zero offset, and other toolheads have offsets to align them to T0.',
	),
	'idex_mode': NamedOffsetConfig(
		description='The IDEX mode-specific offset. For example, in copy and mirror mode, this offset remaps the X midpoint from the middle of the physical bed to one quarter of the way into the bed.',
	),
	'true_zero_correction': NamedOffsetConfig(
		description='The correction applied to a beacon true zero Z measurement by the beacon_true_zero_correction module (aka, multi-point true zero probing).',
	),
	'hotend_thermal_expansion': NamedOffsetConfig(
		description='Keeps the nozzle tip at the same Z height despite changes due to hotend thermal expansion. Only set when printing.',
		reset_events=('motor_off', 'end_print'),
	),
	'user_probe_z_offset': NamedOffsetConfig(
		description='The user-configured Z offset of the Z probe when not managed by the probe itself. Currently applies only when using beacon contact true zero.',
		reset_events=(),
	),
}

RESET_ALL_EVENT: Final = 'reset_all'
RESET_EVENTS: Final = { event for config in OFFSETS.values() for event in config.reset_events } | {'motor_off', 'end_print', RESET_ALL_EVENT} 
COMBINED_OFFSET_KEY: Final = 'combined_offset'
MAX_OFFSET_NAME_LENGTH: Final = max(max(len(name) for name in OFFSETS.keys()), len(COMBINED_OFFSET_KEY))
ZERO_OFFSET: Final = (0., 0., 0., 0.)
XYZE: Final = 'XYZE'

class NamedOffsetManager:
	# Items are name: (X,Y,Z,E)
	offsets: Dict[str, Tuple[float, float, float, float]]
	combined_offset: Tuple[float, float, float, float]

	def __init__(self, config):
		self.printer = config.get_printer()
		self.name = config.get_name()
		self.printer.register_event_handler("klippy:connect",
											self._handle_connect)

		self.printer.register_event_handler("stepper_enable:motor_off",
											self._handle_motor_off)

		self.gcode_move = None
		self.next_transform = None
		self.offsets = {}
		self.status = None
		self.combined_offset = ZERO_OFFSET
		self._original_save_gcode_state_cmd = None
		self._original_restore_gcode_state_cmd = None
		self._original_get_position_cmd = None
		self.saved_states = {}
		self.ratos = None
		self.gcode = self.printer.lookup_object('gcode')
		
		# collections.namedtuple('Coord', ('x', 'y', 'z', 'e'))
		# Use for macro-friendly status items that will behave the same as
		# for example `printer.gcode_move.gcode_position.z`
		self.Coord = self.gcode.Coord

		self.gcode.register_command('GET_NAMED_OFFSETS', self.cmd_GET_NAMED_OFFSETS,
							   desc=self.desc_GET_NAMED_OFFSETS)
		self.gcode.register_command('SET_NAMED_OFFSET', self.cmd_SET_NAMED_OFFSET,
							   desc=self.desc_SET_NAMED_OFFSET)
		self.gcode.register_command('RESET_NAMED_OFFSET', self.cmd_RESET_NAMED_OFFSET,
							   desc=self.desc_RESET_NAMED_OFFSET)

	def _debug_echo(self, prefix, msg):
		self.ratos.debug_echo(f"{self.name}: {prefix}", msg)

	def _handle_connect(self):
		self._original_save_gcode_state_cmd = self._override_command('SAVE_GCODE_STATE', self.cmd_SAVE_GCODE_STATE)
		self._original_restore_gcode_state_cmd = self._override_command('RESTORE_GCODE_STATE', self.cmd_RESTORE_GCODE_STATE)
		self._original_get_position_cmd = self._override_command('GET_POSITION', self.cmd_GET_POSITION, when_not_ready=True)
		
		self.ratos = self.printer.lookup_object('ratos')

		self.gcode_move = self.printer.lookup_object('gcode_move')
		self.next_transform = self.gcode_move.set_move_transform(self, force=True)

	def _handle_motor_off(self, print_time):
		self.reset_on_event('motor_off')

	def _override_command(self, cmd_name, new_cmd, *, when_not_ready:bool=False):
		help_text = self.gcode.get_command_help().get(cmd_name, None)
		is_base_handler = self.gcode.base_gcode_handlers.get(cmd_name, None) is not None
		
		if is_base_handler != when_not_ready:
			raise self.printer.config_error(f"{cmd_name} is {'' if is_base_handler else 'not '}a base (aka 'when-not-ready') gcode handler, this is not expected. {self.name} cannot be enabled.")
		
		original_cmd = self.gcode.register_command(cmd_name, None)
		
		if original_cmd is None:
			raise self.printer.config_error(f"{cmd_name} command is not registered, {self.name} cannot be enabled.")

		self.gcode.register_command(cmd_name, new_cmd, when_not_ready=when_not_ready, desc=help_text)
		return original_cmd

	######
	# commands
	######
	def cmd_GET_POSITION(self, gcmd):
		self._original_get_position_cmd(gcmd)
		msg = "\n".join( f"{self.name}: {k}: {' '.join(f'{XYZE[i]}:{p:.6f}' for i, p in enumerate(v))}" for k, v in sorted(self.offsets.items()))
		if msg:
			msg += f"\n{self.name}: {COMBINED_OFFSET_KEY}: {' '.join(f'{XYZE[i]}:{p:.6f}' for i, p in enumerate(self.combined_offset))}"
		else:
			msg = f"{self.name}: all named offsets are zero"
		gcmd.respond_info(msg)

	def cmd_SAVE_GCODE_STATE(self, gcmd):
		self._original_save_gcode_state_cmd(gcmd)
		state_name = gcmd.get('NAME', 'default')
		self.saved_states[state_name] = dict(self.offsets)

	def cmd_RESTORE_GCODE_STATE(self, gcmd):
		self._original_restore_gcode_state_cmd(gcmd)
		state_name = gcmd.get('NAME', 'default')
		saved_offsets = self.saved_states.get(state_name, None)
		if saved_offsets is None:
			raise gcmd.error(f"Unknown named offsets state '{state_name}'")
		self.offsets = dict(saved_offsets)
		move = gcmd.get_int('MOVE', 0) == 1
		speed = gcmd.get_float('MOVE_SPEED', None, above=0.)
		self._offset_changed(move, speed)

	desc_GET_NAMED_OFFSETS = "Report information about named offsets"
	def cmd_GET_NAMED_OFFSETS(self, gcmd):
		# Note: while GET_POSITION follows the same terse format as the base command, and only lists
		#   non-zero offsets, GET_NAMED_OFFSETS lists all named offsets for completeness.
		#   In the future, GET_NAMED_OFFSETS could report additional metadata about each offset if desired.
		verbose = gcmd.get('VERBOSE', '').strip().lower() in ('1', 'true', 'yes')
		names_and_offsets = sorted(((name, self.offsets.get(name, ZERO_OFFSET)) for name in OFFSETS.keys()))
		msg = "OFFSETS:\n| "
		msg += "\n| ".join( f"{k:<{MAX_OFFSET_NAME_LENGTH}} {' '.join(f'{XYZE[i]}:{p:>9.6f}' for i, p in enumerate(v))}" for k, v in names_and_offsets)
		msg += f"\n| {COMBINED_OFFSET_KEY:<{MAX_OFFSET_NAME_LENGTH}} {' '.join(f'{XYZE[i]}:{p:>9.6f}' for i, p in enumerate(self.combined_offset))}"
		if verbose:
			msg += "\nDESCRIPTIONS:"
			for name, config in sorted(OFFSETS.items()):
				wrapped_desc = textwrap.fill(config.description, width=70, subsequent_indent='|   ')
				msg += f"\n| {name}:\n|   {wrapped_desc}"
			msg += f"\n| {COMBINED_OFFSET_KEY}:\n|   The combined offset of all named offsets."
			msg += "\nRESET TRIGGERS:"
			if len(RESET_EVENTS) == 0:
				msg += "\n| (none)"
			else:
				for event in sorted(RESET_EVENTS):
					if event == RESET_ALL_EVENT:
						# Don't list RESET_ALL_EVENT here as it's a special purpose event
						continue
					offsets_with_events = [name for name, config in OFFSETS.items() if event in config.reset_events]
					if offsets_with_events:
						joined = "\n|   ".join(sorted(offsets_with_events))
						msg += f"\n| {event}:\n|   {joined}"
					else:
						msg += f"\n| {event}:\n|   (none)"
		else:
			msg += "\n(use GET_NAMED_OFFSETS VERBOSE=1 to see extended information)"
		gcmd.respond_info(msg)

	desc_SET_NAMED_OFFSET = "Set a named offset."
	def cmd_SET_NAMED_OFFSET(self, gcmd):
		name = gcmd.get('NAME').lower().strip()
		if name not in OFFSETS:
			raise self.gcode.error(f"Offset name '{name}' is not recognized.")
		offset = list(self.offsets.get(name, ZERO_OFFSET))
		for pos, axis in enumerate(XYZE):
			v = gcmd.get_float(axis, None)
			if v is None:
				v = gcmd.get_float(axis + '_ADJUST', None)
				if v is None:
					continue
				v += offset[pos]
			offset[pos] = v
		offset = tuple(offset)
		if self._offset_is_zero(offset):
			self._debug_echo("SET_NAMED_OFFSET", f"{name} -> zero")
			self.offsets.pop(name, None)
		else:
			self._debug_echo("SET_NAMED_OFFSET", f"{name} -> {offset}")
			self.offsets[name] = offset
		move = gcmd.get_int('MOVE', 0) == 1
		speed = gcmd.get_float('MOVE_SPEED', None, above=0.)
		self._offset_changed(move, speed)

	desc_RESET_NAMED_OFFSET = "Reset a named offset, or one or more offsets by signalling an event. This is equivalent to setting all components of the offset to zero."
	def cmd_RESET_NAMED_OFFSET(self, gcmd):
		name = gcmd.get('NAME', '').strip().lower()
		event = gcmd.get('EVENT', '').strip().lower()

		if not (name or event):
			raise gcmd.error("Either NAME or EVENT parameter must be specified.")
		
		if event and name:
			raise gcmd.error("Only one of NAME or EVENT parameter may be specified.")

		move = gcmd.get_int('MOVE', 0) == 1
		speed = gcmd.get_float('MOVE_SPEED', None, above=0.)

		if event:
			if event not in RESET_EVENTS:
				raise gcmd.error(f"Event '{event}' is not recognized.")
			self.reset_on_event(event, move, speed)
		else:
			if name not in OFFSETS:
				raise gcmd.error(f"Offset name '{name}' is not recognized.")
			self.reset(name, move, speed)

	def _offset_changed(self, move=False, move_speed=None,):
		# MOVE and MOVE_SPEED behave like SET_GCODE_OFFSET

		previous_offset = self.combined_offset
		new_combined_offset = [0.] * 4
		for offset in self.offsets.values():
			for i in range(4):
				new_combined_offset[i] += offset[i]
		self.combined_offset = tuple(new_combined_offset)
		if self._offset_is_zero(self.combined_offset):
			# Clamp to exact zero to avoid floating point error accumulated during summation above.
			self.combined_offset = ZERO_OFFSET

		# If all offsets are cleared, it's possible that combined_offset remains ZERO_OFFSET despite
		# the set of individual offsets changing. So always update status. We don't expect this to lead
		# to many strictly unnecessary updates in practice.
		self._update_status()

		offset_delta = tuple(self.combined_offset[i] - previous_offset[i] for i in range(4))

		# NB: we don't use a close check here otherwise we might suppress
		# a sequence of tiny moves that add up to a significant change.
		if offset_delta == ZERO_OFFSET:
			# no change to any component of the combined offset, no need to update
			# position or move.
			return
		
		gcode_move = self.gcode_move
		gcode_move.reset_last_position()

		# Move the toolhead by the given offset if requested.
		# This mimics the behaviour and implementation of SET_GCODE_OFFSET in gcode_move.py
		if move:
			speed = gcode_move.speed if move_speed is None else move_speed
			for i in range(4):
				gcode_move.last_position[i] += offset_delta[i]
			gcode_move.move_with_transform(gcode_move.last_position, speed)

	# For use by other extensions
	def set(self, name:str, *, x:float = None, y:float = None, z:float = None, e:float = None,
				x_adjust:float = None, y_adjust:float = None, z_adjust:float = None, e_adjust:float = None,
				 should_move:bool=False, move_speed:float=None):
		"""Set a named offset. Argument semantics follow that of SET_GCODE_OFFSET. If should_move is True, the toolhead will be moved by the offset."""
		if name:
			name = name.strip().lower()

		if name not in OFFSETS:
			raise self.gcode.error(f"Offset name '{name}' is not recognized.")

		offset = list(self.offsets.get(name, ZERO_OFFSET))

		for pos, (val, adjust) in enumerate(zip((x, y, z, e), (x_adjust, y_adjust, z_adjust, e_adjust))):
			if val is not None:
				offset[pos] = val
			elif adjust is not None:
				offset[pos] += adjust

		offset = tuple(offset)

		if self._offset_is_zero(offset):
			self._debug_echo("set", f"{name} -> zero")
			self.offsets.pop(name, None)
		else:
			self._debug_echo("set", f"{name} -> {offset}")
			self.offsets[name] = offset

		self._offset_changed(should_move, move_speed)

	def reset(self, name:str, move=False, move_speed=None):
		if name not in OFFSETS:
			raise self.gcode.error(f"Offset name '{name}' is not recognized.")
		
		if name in self.offsets:
			self._debug_echo("reset", f"{name} -> zero")
			self.offsets.pop(name)
			self._offset_changed(move, move_speed)
		
	def reset_on_event(self, event:str, move=False, move_speed=None):
		if event not in RESET_EVENTS:
			raise self.gcode.error(f"Event '{event}' is not recognized.")
		
		changed = False
		for name, config in OFFSETS.items():
			if event == RESET_ALL_EVENT or event in config.reset_events:
				if name in self.offsets:
					self._debug_echo("reset_on_event", f"{event}: {name} -> zero")
					self.offsets.pop(name)
					changed = True
		if changed:
			self._offset_changed(move, move_speed)

	######
	# gcode_move transform compliance
	######
	def get_position(self):
		# Remove correction
		offset = self.combined_offset
		pos = self.next_transform.get_position()[:]
		for i in range(4):
			pos[i] -= offset[i]
		return pos

	def move(self, newpos, speed):
		# Apply correction
		offset = self.combined_offset
		pos = newpos[:]
		for i in range(4):
			pos[i] += offset[i]
		self.next_transform.move(pos, speed)

	######
	# status
	######
	def _update_status(self):
		status = {name: self.Coord(*self.offsets.get(name, ZERO_OFFSET)) for name in OFFSETS.keys()}
		status[COMBINED_OFFSET_KEY] = self.Coord(*self.combined_offset)
		self.status = status

	def get_status(self, eventtime=None):
		if self.status is None:
			self._update_status()
		return self.status
	
	######
	# helpers
	######
	def _offset_is_zero(self, offset:Tuple[float, float, float, float]) -> bool:
		return all(isclose(v, 0.0, abs_tol=1e-9) for v in offset)

def load_config(config):
	return NamedOffsetManager(config)