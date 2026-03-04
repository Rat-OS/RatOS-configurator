# Beacon contact compensation mesh
#
# Copyright (C) 2024 Helge Keck <HelgeKeck@hotmail.com>
# Copyright (C) 2024-2025 Mikkel Schmidt <mikkel.schmidt@gmail.com>
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
#
# Contains portions of code adapted from beacon.py (GPLv3) https://github.com/beacon3d/beacon_klipper
# Copyright (C) 2020-2023 Matt Baker <baker.matt.j@gmail.com>
# Copyright (C) 2020-2023 Lasse Dalegaard <dalegaard@gmail.com>
# Copyright (C) 2023 Beacon <beacon3d.com>

from enum import Enum
import logging
import math
import multiprocessing, traceback
from collections import OrderedDict
from typing import Any, Dict, List, Optional, Tuple, NamedTuple
import numpy as np
import importlib
from dataclasses import dataclass

from . import bed_mesh as BedMesh
from . import probe
from .ratos import BeaconProbingRegions, BackgroundDisplayStatusProgressHandler

DEFAULT_REACTOR_PAUSE_OFFSET = 0.006 # 6ms

# Temporary mesh names
RATOS_TEMP_SCAN_MESH_BEFORE_NAME = "__BEACON_TEMP_SCAN_MESH_BEFORE__"
RATOS_TEMP_SCAN_MESH_ATFER_NAME = "__BEACON_TEMP_SCAN_MESH_AFTER__"

###
# Mesh constants
###
RATOS_TEMP_SCAN_MESH_NAME = "__BEACON_TEMP_SCAN_MESH__"
RATOS_TEMP_CONTACT_MESH_NAME = "__BEACON_TEMP_CONTACT_MESH__"
RATOS_COMPENSATION_MESH_NAME_AUTO = "auto"
RATOS_MESH_VERSION = 1

RATOS_MESH_KIND_MEASURED = "measured"
# - a regular, uncorrected bed mesh
RATOS_MESH_KIND_COMPENSATION = "compensation"
# - can be used to compensate a proximity mesh to account for the proximity/contact difference.
RATOS_MESH_KIND_COMPENSATED = "compensated"
# - a compensated mesh. A measured proximity mesh that was compensated with a compensation mesh.
RATOS_MESH_KIND_CHOICES = (RATOS_MESH_KIND_MEASURED, RATOS_MESH_KIND_COMPENSATION, RATOS_MESH_KIND_COMPENSATED)

RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY = "proximity"
# - rapid scan
RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC = "proximity_automatic"
# - stop and sample (with diving if needed)
RATOS_MESH_BEACON_PROBE_METHOD_CONTACT = "contact"
RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_OFFSET_ALIGNED = "cotemporal_offset_aligned"
RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_POINT_BY_POINT = "cotemporal_point_by_point"
RATOS_MESH_BEACON_PROBE_METHOD_CHOICES = (RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY, RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC, RATOS_MESH_BEACON_PROBE_METHOD_CONTACT, RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_OFFSET_ALIGNED, RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_POINT_BY_POINT)

RATOS_MESH_VERSION_PARAMETER = "ratos_mesh_version"
# - versioning of the extra metadata attached to meshes by ratos
RATOS_MESH_BED_TEMP_PARAMETER = "ratos_bed_temp"
# - the prevailing target bed temp when the mesh was created. For a compensated mesh, it's the
#   target bed temp of the source measured mesh.
RATOS_MESH_CHAMBER_TEMP_PARAMETER = "ratos_chamber_temp"
# - the demanded chamber temp when the mesh was created.
RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER = "ratos_proximity_mesh_bounds"
# - only for compensation meshes, the bounds of the proximity mesh that was used to make the compensation mesh. left, bottom, right, top (aka min x,y, max x,y)
RATOS_MESH_KIND_PARAMETER = "ratos_mesh_kind"
RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER = "ratos_beacon_probe_method"
# - for measured meshes, it's the probe method of measurement
# - for compensation meshes, it's the probe method of the proximity mesh used to make the compensation mesh
# - for compensated meshes, it's the probe method of the measured mesh that was then compensated
RATOS_MESH_NOTES_PARAMETER = "ratos_notes"
# - abitrary notes, optional

RATOS_REQUIRED_MESH_PARAMETERS = (
	RATOS_MESH_VERSION_PARAMETER,
	RATOS_MESH_BED_TEMP_PARAMETER,
	RATOS_MESH_KIND_PARAMETER,
	RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER)

class RatOSBeaconMeshError(Exception):
	pass

class Region:
	def __init__(self, x_min, x_max, y_min, y_max):
		self.x_min = x_min
		self.x_max = x_max
		self.y_min = y_min
		self.y_max = y_max

	def is_point_within(self, x, y):
		return (x > self.x_min and x < self.x_max) and (
			y > self.y_min and y < self.y_max
		)

#####
# Beacon Mesh
#####

class BeaconMesh:
	BED_TEMP_WARNING_MARGIN = 15.0
	POINT_BY_POINT_FORCE_MULTIPOINT_SPACING_THRESHOLD = 25.0

	@staticmethod
	def format_pretty_list(items, conjunction="or"):
		if len(items) == 0:
			return ""
		elif len(items) == 1:
			return items[0]
		else:
			return ", ".join(items[:-1]) + f" {conjunction} " + items[-1]

	#####
	# Initialize
	#####
	def __init__(self, config):
		self.config = config
		self.printer = config.get_printer()
		self.name = config.get_name()
		self.gcode = self.printer.lookup_object('gcode')
		self.reactor = self.printer.get_reactor()
		self._cotemporal_probing_helper = CotemporalProbingHelper(self.config)

		# These are loaded on klippy:connect.
		self.beacon = None
		self.ratos = None
		self.gm_ratos = None
		self.bed_mesh = None
		self.heater_bed = None
		self.heaters = None
		self.z_tilt = None
		self.qgl = None

		self.offset_mesh = None
		self.offset_mesh_points = [[]]

		# Loaded on demand if needed
		self.scipy_ndimage = None
		self.scipy = None

		self.register_commands()
		self.register_handler()

	#####
	# Handler
	#####
	def register_handler(self):
		self.printer.register_event_handler("klippy:connect", self._connect)

	def _connect(self):
		if self.config.has_section("ratos"):
			self.ratos = self.printer.lookup_object('ratos')
			self.gm_ratos = self.printer.lookup_object('gcode_macro RatOS')
		if self.config.has_section("bed_mesh"):
			self.bed_mesh = self.printer.lookup_object('bed_mesh')
		if self.config.has_section("beacon"):
			self.beacon = self.printer.lookup_object('beacon')
		if self.config.has_section("heater_bed"):
			self.heater_bed = self.printer.lookup_object('heater_bed')
		if self.config.has_section("z_tilt"):
			self.z_tilt = self.printer.lookup_object('z_tilt')
		if self.config.has_section("quad_gantry_level"):
			self.qgl = self.printer.lookup_object('quad_gantry_level')

		self.heaters = self.printer.lookup_object('heaters', None)

	#####
	# Gcode commands
	#####
	def register_commands(self):
		if self.config.has_section("beacon"):
			self.gcode.register_command('_BEACON_MESH_INIT',
							   self.cmd_BEACON_MESH_INIT,
							   desc=self.desc_BEACON_MESH_INIT)
			self.gcode.register_command('BEACON_APPLY_SCAN_COMPENSATION',
							   self.cmd_BEACON_APPLY_SCAN_COMPENSATION,
							   desc=self.desc_BEACON_APPLY_SCAN_COMPENSATION)
			self.gcode.register_command('_BEACON_CREATE_SCAN_COMPENSATION_MESH_CORE',
							   self.cmd_BEACON_CREATE_SCAN_COMPENSATION_MESH_CORE,
							   desc=self.desc_BEACON_CREATE_SCAN_COMPENSATION_MESH_CORE)
			self.gcode.register_command('_CHECK_ACTIVE_BEACON_MODEL_TEMP',
							   self.cmd_CHECK_ACTIVE_BEACON_MODEL_TEMP,
							   desc=self.desc_CHECK_ACTIVE_BEACON_MODEL_TEMP)
			self.gcode.register_command('_VALIDATE_COMPENSATION_MESH_PROFILE',
							   self.cmd_VALIDATE_COMPENSATION_MESH_PROFILE,
							   desc=self.desc_VALIDATE_COMPENSATION_MESH_PROFILE)
			self.gcode.register_command('_APPLY_RATOS_BED_MESH_PARAMETERS',
							   self.cmd_APPLY_RATOS_BED_MESH_PARAMETERS,
							   desc=self.desc_APPLY_RATOS_BED_MESH_PARAMETERS)
			self.gcode.register_command('GET_RATOS_EXTENDED_BED_MESH_PARAMETERS',
							   self.cmd_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS,
							   desc=self.desc_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS)
			self.gcode.register_command('_TEST_COMPENSATION_MESH_AUTO_SELECTION',
							   self.cmd_TEST_COMPENSATION_MESH_AUTO_SELECTION,
							   desc=self.desc_TEST_COMPENSATION_MESH_AUTO_SELECTION)
			self.gcode.register_command('_BED_MESH_SUBTRACT',
							   self.cmd_BED_MESH_SUBTRACT,
							   desc=self.desc_BED_MESH_SUBTRACT)

	desc_BEACON_MESH_INIT = "Performs Beacon mesh initialization tasks"
	def cmd_BEACON_MESH_INIT(self, gcmd):
		# Note: we don't do these things in _connect as console logging would not be visible
		if self.bed_mesh:
			# Load additional RatOS mesh params
			self.load_extra_mesh_params()
			# run klippers incompatible profile check which is never called by bed_mesh
			self.bed_mesh.pmgr._check_incompatible_profiles()

	desc_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS = "Writes the extended RatOS bed mesh parameters to console for the active bed mesh"
	def cmd_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS(self, gcmd):
		if self.bed_mesh is None:
			gcmd.respond_info("The [bed_mesh] component is not active")
			return

		mesh = self.bed_mesh.get_mesh()
		if mesh is None:
			gcmd.respond_info("There is no active bed mesh")
			return

		params = OrderedDict({k: v for k,v in mesh.get_mesh_params().items() if str(k).startswith("ratos_")})
		if len(params) == 0:
			gcmd.respond_info('No extended RatOS bed mesh parameters found')
		else:
			gcmd.respond_info('\n'.join(f"{key}: {value}" for key, value in params.items()))

	desc_APPLY_RATOS_BED_MESH_PARAMETERS = "Applies RatOS extended Beacon bed mesh parameters immediately following BED_MESH_CALIBRATE"
	def cmd_APPLY_RATOS_BED_MESH_PARAMETERS(self, gcmd):
		# This should only be called by our override of BED_MESH_CALIBRATE immediately after the call to the original
		# macro, and with the same rawargs as passed to BED_MESH_CALIBRATE.

		mesh = self.bed_mesh.get_mesh()
		if mesh is None:
			raise gcmd.error("Expected an active bed mesh, but there is none")

		# replicate beacon defaults exactly as per start of beacon.py cmd_BED_MESH_CALIBRATE:
		method = gcmd.get("METHOD", "beacon").lower()
		probe_method = gcmd.get( "PROBE_METHOD", self.beacon.default_probe_method ).lower()
		if probe_method != "proximity":
			method = "automatic"
		# end of beacon defaults

		if probe_method == "proximity":
			ratos_probe_method = RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC if method == "automatic" else RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY
		else:
			ratos_probe_method = RATOS_MESH_BEACON_PROBE_METHOD_CONTACT

		bed_temp = self._get_nominal_bed_temp()

		params = mesh.get_mesh_params()
		params[RATOS_MESH_VERSION_PARAMETER] = RATOS_MESH_VERSION
		params[RATOS_MESH_BED_TEMP_PARAMETER] = bed_temp
		params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_MEASURED
		params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = ratos_probe_method
		params.pop(RATOS_MESH_NOTES_PARAMETER, None)

		msg = (
			f"Setting parameters for active bed mesh '{mesh.get_profile_name()}':_N_"
			f"{RATOS_MESH_BED_TEMP_PARAMETER}: {params[RATOS_MESH_BED_TEMP_PARAMETER]}_N_"
			f"{RATOS_MESH_KIND_PARAMETER}: {params[RATOS_MESH_KIND_PARAMETER]}_N_"
			f"{RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER}: {params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER]}")

		self.ratos.debug_echo("_APPLY_RATOS_BED_MESH_PARAMETERS_FOR_MEASURED", msg)

		self.bed_mesh.pmgr.save_profile( mesh.get_profile_name() )

	def _get_nominal_bed_temp(self):
		target_temp = self.heater_bed.heater.target_temp if self.heater_bed else 0.
		actual_temp = self.heater_bed.heater.smoothed_temp if self.heater_bed else 0.

		self.ratos.debug_echo("BeaconMesh._get_nominal_bed_temp", f"target_temp={target_temp:.2f}, actual_temp={actual_temp:.2f}")

		return round(target_temp if target_temp > 0. else actual_temp, 1)

	desc_CHECK_ACTIVE_BEACON_MODEL_TEMP = "Warns if the active Beacon model temperature is far from the current Beacon coil temperature"
	def cmd_CHECK_ACTIVE_BEACON_MODEL_TEMP(self, gcmd):
		margin = gcmd.get_int('MARGIN', 20, minval=1)
		title = gcmd.get('TITLE', 'Active Beacon model temperature warning')
		self.check_active_beacon_model_temp(margin, title)

	def check_active_beacon_model_temp(self, margin=20, title='Active Beacon model temperature warning'):
		if self.ratos and self.beacon and self.beacon.model:
			coil_temp = self.beacon.last_temp
			model_temp = self.beacon.model.temp

			if coil_temp < model_temp - margin or coil_temp > model_temp + margin:
				self.ratos.console_echo(title, "warning",
					"The active Beacon model ('%s') is calibrated for a temperature that is %0.2fC different than the current Beacon coil temperature._N_"
					"This may result in inaccurate compensation." % (self.beacon.model.name, abs(coil_temp - model_temp)))

	desc_VALIDATE_COMPENSATION_MESH_PROFILE = "Raises an error if the speficied profile is not a valid compensation mesh, and warns if there is a significant temperature difference"
	def cmd_VALIDATE_COMPENSATION_MESH_PROFILE(self, gcmd):

		profile = gcmd.get("PROFILE").strip()
		if not profile:
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")

		title = gcmd.get("TITLE", "Validate compensation mesh profile")
		subject = gcmd.get("SUBJECT", None)
		bed_temp = gcmd.get_float("COMPARE_BED_TEMP", None)
		bed_temp_is_error = gcmd.get("COMPARE_BED_TEMP_IS_ERROR", "false").strip().lower() in ("1", "true")

		if profile.lower() == RATOS_COMPENSATION_MESH_NAME_AUTO:
			profile = self.auto_select_compensation_mesh(bed_temp)

		# eg, caller can use BED_TEMP=-1 when bed temp should not be checked
		if bed_temp < 0:
			bed_temp = None

		if not self._validate_extended_parameters(
			self._create_zmesh_from_profile(profile, subject, "Beacon compensation mesh validation").get_mesh_params(),
			title,
			subject,
			compare_bed_temp=bed_temp,
			compare_bed_temp_is_error=bed_temp_is_error,
			allowed_kinds=(RATOS_MESH_KIND_COMPENSATION,)):

			raise self.printer.command_error(f"{subject} is not a valid compensation mesh profile")

	def get_profiles(self, kind=None):
		# Gets a dictionary of all RatOS-valid profiles, optionally filtered by kind.
		profiles = self.bed_mesh.pmgr.get_profiles()

		result = {}

		for profile_name, profile in profiles.items():
			params = profile["mesh_params"]
			# Consider only RatOS-valid profiles
			if RATOS_MESH_VERSION_PARAMETER in params:
				if kind is None or params[RATOS_MESH_KIND_PARAMETER] == kind:
					result[profile_name] = profile

		return result

	def auto_select_compensation_mesh(self, bed_temperature=None):
		# Automatically selects a compensation mesh based on the specified bed_temperature, or the
		# current target bed temperature if bed_temperature is None.

		link_url = "https://os.ratrig.com/docs/configuration/beacon"
		link_text = "Beacon Contact Compensation Mesh"
		link_line = f'Learn more about <a href="{link_url}" target="_blank">{link_text}</a>'

		profiles = self.get_profiles(RATOS_MESH_KIND_COMPENSATION)

		if not profiles:
			self.ratos.console_echo("Auto-select compensation mesh error", "error",
						   "No compensation mesh profiles found. Create a compensation mesh, or disable the_N_"
						   "Beacon compensation mesh feature._N_"
						   + link_line)

			raise self.printer.command_error("No compensation mesh profiles found")

		if bed_temperature is None:
			bed_temperature = self._get_nominal_bed_temp()

		profile_list = ", ".join(f"{name} ({profile['mesh_params'][RATOS_MESH_BED_TEMP_PARAMETER]}°C)" for name, profile in profiles.items())
		self.ratos.debug_echo("auto_select_compensation_mesh",
			f"Available compensation mesh profiles: {profile_list}")

		# Find the closest compensation mesh profile based on bed temperature
		best_profiles = []
		best_temp_diff = float('inf')

		for profile_name, profile in profiles.items():
			params = profile["mesh_params"]
			profile_bed_temp = params[RATOS_MESH_BED_TEMP_PARAMETER]
			temp_diff = abs(profile_bed_temp - bed_temperature)

			if temp_diff < best_temp_diff:
				best_temp_diff = temp_diff
				best_profiles = [(profile_name, profile_bed_temp)]
			elif temp_diff == best_temp_diff:
				best_profiles.append((profile_name, profile_bed_temp))

		# If there are multiple candidate profiles with the same bed temperature, then the result
		# is ambiguous, which is considered an error.
		distinct_bed_temps = set(temp for _, temp in best_profiles)
		if len(distinct_bed_temps) != len(best_profiles):
			self.ratos.console_echo("Auto-select compensation mesh error", "error",
				"A compensation mesh cannot be selected automatically because there is more than one equally-suitable profile._N_"
				"Either delete one of the following profiles, or configure the desired profile explicitly:_N_"
				+ "_N_".join(f"  '{name}' ({temp}°C)" for name, temp in best_profiles)
				+ f"_N_{link_line}")

			raise self.printer.command_error("Automatic compensation mesh selection is ambiguous")

		# Pick the candidate profile with the highest bed temperature
		best_profile, best_temp = max(best_profiles, key=lambda x: x[1])

		# Check if the temperature difference is too large
		if best_temp_diff > self.BED_TEMP_WARNING_MARGIN:
			self.ratos.console_echo("Auto-select compensation mesh warning", "warning",
				f"Selected compensation mesh '{best_profile}' has a bed temperature of {best_temp}°C, "
				f"which differs by {best_temp_diff:.1f}°C from the requested {bed_temperature:.1f}°C._N_"
				"This may result in inaccurate compensation."
				+ f"_N_{link_line}")
		else:
			self.gcode.respond_info(
				f"Selected compensation mesh '{best_profile}' with bed temperature {best_temp}°C "
				f"(requested: {bed_temperature:.1f}°C, difference: {best_temp_diff:.1f}°C)")

		return best_profile

	desc_TEST_COMPENSATION_MESH_AUTO_SELECTION = "Tests the automatic selection of a compensation mesh. Will raise an error if no suitable mesh is found."
	def cmd_TEST_COMPENSATION_MESH_AUTO_SELECTION(self, gcmd):
		bed_temp = gcmd.get_float('BED_TEMP', self._get_nominal_bed_temp())
		try:
			profile_name = self.auto_select_compensation_mesh(bed_temp)
			gcmd.respond_info(f"Auto-selected compensation mesh profile: {profile_name}")
		except Exception as e:
			raise gcmd.error(str(e)) from e

	desc_BEACON_APPLY_SCAN_COMPENSATION = "Compensates a beacon scan mesh with a beacon compensation mesh."
	def cmd_BEACON_APPLY_SCAN_COMPENSATION(self, gcmd):
		profile = gcmd.get('PROFILE', RATOS_COMPENSATION_MESH_NAME_AUTO).strip()
		if not profile:
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")

		if not self.apply_scan_compensation(profile):
			raise self.printer.command_error("Could not apply scan compensation")

	def _get_unique_profile_name(self, base_name):
		# Obtains a unique profile name based on the base_name.
		# If the base_name already exists, appends a number to make it unique.
		# Returns a tuple of (unique_name, base_name_is_unique).
		profiles = self.bed_mesh.pmgr.get_profiles()
		if base_name not in profiles:
			return (base_name, True)

		i = 1
		while f"{base_name}_{i}" in profiles:
			i += 1

		return (f"{base_name}_{i}", False)

	desc_BEACON_CREATE_SCAN_COMPENSATION_MESH_CORE = \
		"Do not invoke this command directly, use BEACON_CREATE_SCAN_COMPENSATION_MESH instead." \
		"Performs the core operation of creating a beacon compensation mesh based on the difference between proximity and contact probes."
	def cmd_BEACON_CREATE_SCAN_COMPENSATION_MESH_CORE(self, gcmd):
		if not self.beacon:
			self.ratos.console_echo("Create compensation mesh error", "error",
				"Beacon module not loaded._N_Make sure you've configured Beacon as your z probe.")
			raise gcmd.error("Beacon module not loaded")

		profile = gcmd.get('PROFILE', RATOS_COMPENSATION_MESH_NAME_AUTO).strip()

		if gcmd.get('PROBE_COUNT', None) is not None:
			# Sanity check: RatOS scripts know about this, and this command should not be called directly by users,
			# but just in case...
			raise gcmd.error("Parameter 'PROBE_COUNT' is no longer supported.")

		desired_spacing = gcmd.get_float("DESIRED_SPACING", float(self.gm_ratos.variables.get('beacon_scan_compensation_desired_spacing', 10.)))
		minimum_spacing = gcmd.get_float("MINIMUM_SPACING", desired_spacing * 0.8)
		chamber_temp = gcmd.get_float('CHAMBER_TEMP', 0)

		if desired_spacing < minimum_spacing:
			raise gcmd.error("Parameter 'DESIRED_SPACING' must be greater than or equal to 'MINIMUM_SPACING'")

		if not profile:
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")

		if profile.lower() == RATOS_COMPENSATION_MESH_NAME_AUTO:
			base_name = f"compensation_bed_{round(self._get_nominal_bed_temp())}C"
			profile, is_unique = self._get_unique_profile_name(base_name)
			if not is_unique:
				self.ratos.console_echo("Create beacon compensation mesh", "info",
					f"The default automatic profile name '{base_name}' already exists. The unique name '{profile}' will be used instead.")
			gcmd.respond_info(f"Using automatic profile name '{profile}' for the new compensation mesh")

		if self.z_tilt and not self.z_tilt.z_status.applied:
			self.ratos.console_echo("Create compensation mesh warning", "warning",
				"Z-tilt leveling is configured but has not been applied._N_"
				"This may result in inaccurate compensation.")

		if self.qgl and not self.qgl.z_status.applied:
			self.ratos.console_echo("Create compensation mesh warning", "warning",
				"Quad gantry leveling is configured but has not been applied._N_"
				"This may result in inaccurate compensation.")

		keep_temp_meshes = gcmd.get('KEEP_TEMP_MESHES', '0').strip().lower() in ('1', 'true', 'yes')

		logging.info(f"{self.name}: keep_temp_meshes: {keep_temp_meshes}")

		beacon_contact_calibrate_model_on_true_zero = str(self.gm_ratos.variables['beacon_contact_calibrate_model_on_true_zero']).lower() == 'true'

		# Go to safe home
		self.gcode.run_script_from_command("_MOVE_TO_SAFE_Z_HOME Z_HOP=True")

		if beacon_contact_calibrate_model_on_true_zero:
			# Calibrate a fresh model
			self.gcode.run_script_from_command("BEACON_AUTO_CALIBRATE SKIP_MULTIPOINT_PROBING=1")
		else:
			if self.beacon.model is None:
				self.ratos.console_echo("Create compensation mesh error", "error",
					"No active Beacon model is selected._N_Make sure you've performed initial Beacon calibration.")
				raise gcmd.error("No active Beacon model selected")

			self.check_active_beacon_model_temp(title="Create compensation mesh warning")

			self.gcode.run_script_from_command("BEACON_AUTO_CALIBRATE SKIP_MULTIPOINT_PROBING=1 SKIP_MODEL_CREATION=1")

		self.create_compensation_mesh(gcmd, profile, desired_spacing, minimum_spacing, chamber_temp, keep_temp_meshes)

	def _create_zmesh_from_profile(self, profile, subject=None, purpose=None):
		if not profile:
			raise TypeError("Argument profile cannot be None")

		if subject is None:
			subject = f"Profile '{profile}'"

		if purpose:
			purpose = f" for {purpose}"

		profiles = self.bed_mesh.pmgr.get_profiles()
		if profile not in profiles:
			raise self.printer.command_error(f"{subject} not found{purpose}")

		try:
			zmesh = BedMesh.ZMesh(profiles[profile]["mesh_params"], profile, self.reactor)
			zmesh.build_mesh(profiles[profile]["points"])
			return zmesh
		except Exception as e:
			raise self.printer.command_error(f"Could not load {subject[0].lower()}{subject[1:]}{purpose}: {str(e)}") from e

	# Logs to console for any problems with extended mesh parameters. Returns True if the extended parameters are present
	# and valid, otherwise False. Version must be the current version.
	def _validate_extended_parameters(self,
								   	params,
								   	title,
								   	subject="Mesh",
								   	compare_bed_temp=None,
									compare_bed_temp_is_error=False,
									allowed_kinds=RATOS_MESH_KIND_CHOICES,
									allowed_probe_methods=RATOS_MESH_BEACON_PROBE_METHOD_CHOICES ) -> bool:

		if not params:
			raise TypeError("Argument params cannot be None")

		# - Earlier versions stored in config will have been migrated where possible by load_extra_mesh_params()
		# - load_extra_mesh_params() will only deserialize and apply a valid config, never a partial or unmigratable config.
		# - the only scenario where we should encounter a partial or invalid set of params is when they have been
		#   set weirdly by python code at runtime. This would either be a bug here, or some other bad actor code.

		error_title = title + " error"
		warning_title = title + " warning"

		if not all(p in params for p in RATOS_REQUIRED_MESH_PARAMETERS):
			missing = [p for p in RATOS_REQUIRED_MESH_PARAMETERS if p not in params]
			self.ratos.debug_echo("BeaconMesh._validate_extended_parameters", f"missing parameters: {', '.join(missing)}")
			self.ratos.console_echo(error_title, "error",
				f"{subject} has incomplete extended metadata.")
			return False

		if params[RATOS_MESH_VERSION_PARAMETER] != RATOS_MESH_VERSION:
			self.ratos.console_echo(error_title, "error",
				f"{subject} is not compatible with this version of RatOS.")
			return False

		if params[RATOS_MESH_KIND_PARAMETER] not in RATOS_MESH_KIND_CHOICES:
			self.ratos.debug_echo("BeaconMesh._validate_extended_parameters", f"invalid {RATOS_MESH_KIND_PARAMETER} value '{params[RATOS_MESH_KIND_PARAMETER]}'")
			self.ratos.console_echo(error_title, "error",
				f"{subject} has invalid extended metadata.")
			return False

		if params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] not in RATOS_MESH_BEACON_PROBE_METHOD_CHOICES:
			self.ratos.debug_echo("BeaconMesh._validate_extended_parameters", f"invalid {RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER} value '{params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER]}'")
			self.ratos.console_echo(error_title, "error",
				f"{subject} has invalid extended metadata.")
			return False

		bed_temp = params[RATOS_MESH_BED_TEMP_PARAMETER]
		if not isinstance(bed_temp, float):
			self.ratos.debug_echo("BeaconMesh._validate_extended_parameters", f"invalid {RATOS_MESH_BED_TEMP_PARAMETER} value type {type(params[RATOS_MESH_BED_TEMP_PARAMETER])}")
			self.ratos.console_echo(error_title, "error",
				f"{subject} has invalid extended metadata.")
			return False

		if bed_temp < 0:
			self.ratos.debug_echo("BeaconMesh._validate_extended_parameters", f"invalid {RATOS_MESH_BED_TEMP_PARAMETER} value {bed_temp}")
			self.ratos.console_echo(error_title, "error",
				f"{subject} has invalid extended metadata.")
			return False

		if params[RATOS_MESH_KIND_PARAMETER] not in allowed_kinds:
			self.ratos.console_echo(error_title, "error",
				f"{subject} must be a {self.format_pretty_list(allowed_kinds)} mesh. A {params[RATOS_MESH_KIND_PARAMETER]} mesh cannot be used.")
			return False

		if params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] not in allowed_probe_methods:
			self.ratos.console_echo(error_title, "error",
				f"{subject} must be a {self.format_pretty_list(allowed_probe_methods)} probe method mesh. A {params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER]} probe method mesh cannot be used.")
			return False

		if compare_bed_temp is not None and (compare_bed_temp < bed_temp - self.BED_TEMP_WARNING_MARGIN or compare_bed_temp > bed_temp + self.BED_TEMP_WARNING_MARGIN):
			self.ratos.console_echo(
				error_title if compare_bed_temp_is_error else warning_title,
				"error" if compare_bed_temp_is_error else "warning",
				f"{subject} was created with a bed temperature that differs by {abs(bed_temp - compare_bed_temp)}._N_"
				"This may result in innaccurate compensation.")
			if compare_bed_temp_is_error:
				return False

		return True

	#####
	# Beacon Scan Compensation
	#####
	def apply_scan_compensation(self, comp_mesh_profile_name) -> bool:
		if not comp_mesh_profile_name:
			raise TypeError("Argument comp_mesh_profile_name must be provided")

		error_title = "Apply scan compensation error"
		try:
			measured_zmesh = self.bed_mesh.z_mesh

			if not measured_zmesh:
				self.ratos.console_echo(error_title, "error",
					"No mesh loaded._N_Either generate a new bed mesh or load it via BED_MESH_PROFILE LOAD=\"[profile_name]\"")
				return False

			measured_mesh_params = measured_zmesh.get_mesh_params()
			measured_mesh_name = measured_zmesh.get_profile_name()

			if not self._validate_extended_parameters(
				measured_mesh_params,
				"Apply scan compensation",
				f"Loaded mesh '{measured_mesh_name}'",
				allowed_kinds=(RATOS_MESH_KIND_MEASURED,),
				allowed_probe_methods=(RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY, RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC)):
				return False

			measured_mesh_bed_temp = measured_mesh_params[RATOS_MESH_BED_TEMP_PARAMETER]

			if comp_mesh_profile_name.lower() == RATOS_COMPENSATION_MESH_NAME_AUTO:
				comp_mesh_profile_name = self.auto_select_compensation_mesh(measured_mesh_bed_temp)

			compensation_zmesh = self._create_zmesh_from_profile(comp_mesh_profile_name, purpose="Beacon scan compensation")
			compensation_mesh_params = compensation_zmesh.get_mesh_params()
			compensation_mesh_name = compensation_zmesh.get_profile_name()

			if not self._validate_extended_parameters(
				compensation_mesh_params,
				"Apply scan compensation",
				f"Specified compensation mesh '{compensation_mesh_name}'",
				compare_bed_temp=measured_mesh_bed_temp,
				allowed_kinds=(RATOS_MESH_KIND_COMPENSATION,)):
				return False

			if measured_mesh_name == compensation_mesh_name:
				self.ratos.console_echo(error_title, "error",
					f"Compensation profile name '{compensation_mesh_name}' is the same as the scan profile name '{measured_mesh_name}'")
				return False

			measured_points = self.bed_mesh.pmgr.get_profiles()[measured_mesh_name]["points"]

			x_step = ((measured_mesh_params["max_x"] - measured_mesh_params["min_x"]) / (len(measured_points[0]) - 1))
			y_step = ((measured_mesh_params["max_y"] - measured_mesh_params["min_y"]) / (len(measured_points) - 1))
			new_points = []

			self.ratos.debug_echo("Beacon scan compensation", f"measured mesh: '{measured_mesh_name}'")
			self.ratos.debug_echo("Beacon scan compensation", f"compensation mesh: '{compensation_mesh_name}'")

			for y in range(len(measured_points)):
				new_points.append([])
				for x in range(len(measured_points[0])):
					x_pos = measured_mesh_params["min_x"] + x * x_step
					y_pos = measured_mesh_params["min_y"] + y * y_step
					measured_z = measured_points[y][x]
					compensation_z = compensation_zmesh.calc_z(x_pos, y_pos)
					new_z = measured_z + compensation_z
					# Debug disabled: this can produce thousands of lines of output, and also ratos.debug_echo(...)
					# is implemented as a gcode_macro call, which is relatively heavy-weight.
					# self.ratos.debug_echo("Beacon scan compensation", "measured: %0.4f  compensation: %0.4f  new: %0.4f" % (measured_z, compensation_z, new_z))
					new_points[y].append(new_z)
				self.reactor.pause(self.reactor.monotonic() + DEFAULT_REACTOR_PAUSE_OFFSET)

			measured_zmesh.build_mesh(new_points)
			# NB: build_mesh does not replace or mutate its params, so no need to reassign measured_mesh_params.
			measured_mesh_params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_COMPENSATED
			self.bed_mesh.save_profile(measured_mesh_name)
			self.bed_mesh.set_mesh(measured_zmesh)

			self.ratos.console_echo("Beacon scan compensation", "debug",
				f"Measured mesh '{measured_mesh_name}' compensated with compensation mesh '{compensation_mesh_name}'")

			return True

		except BedMesh.BedMeshError as e:
			self.ratos.console_echo(error_title, "error", str(e))
			return False

	def _apply_local_low_filter(self, data):
		parent_conn, child_conn = multiprocessing.Pipe()

		def do():
			try:
				child_conn.send(
					(False, self._do_local_low_filter(np.array(data)))
				)
			except Exception:
				child_conn.send((True, traceback.format_exc()))
			child_conn.close()

		child = multiprocessing.Process(target=do)
		child.daemon = True
		child.start()
		reactor = self.reactor
		eventtime = reactor.monotonic()
		while child.is_alive():
			eventtime = reactor.pause(eventtime + 0.1)
		is_err, result = parent_conn.recv()
		child.join()
		parent_conn.close()
		if is_err:
			raise RatOSBeaconMeshError("Error applying local-low filter: %s" % (result,))
		else:
			return result

	def _gaussian_filter(self, data, sigma, mode):
		if not self.scipy_ndimage:
			try:
				self.scipy_ndimage = importlib.import_module("scipy.ndimage")
			except ImportError:
				raise Exception(
					"Could not load `scipy.ndimage`. To install it, simply run `ratos doctor`. This "
					"module is required for Beacon contact compensation mesh creation."
				)

		return self.scipy_ndimage.gaussian_filter(data, sigma=sigma, mode=mode)

	def _do_local_low_filter(self, data, lowpass_sigma=1.):
		# 1. Low-pass filter to obtain general shape
		lowpass = self._gaussian_filter(data, sigma=lowpass_sigma, mode='nearest')

		# 2. Subtract the low-pass filtered version from the original
		# to get the high-frequency details
		high_freq_details = data - lowpass

		# 3. Prepare a new array of the same shape as the original
		filtered_data = np.zeros_like(data)

		# 4. For each point in the original array:
		rows, cols = data.shape
		for i in range(rows):
			for j in range(cols):
				# Get the 5x5 neighborhood around the current point within the high-frequency details
				neighbours = []
				neighbour_coords = []
				neighbour_distances = []
				for di in [-2, -1, 0, 1, 2]:
					for dj in [-2, -1, 0, 1, 2]:
						ni, nj = i + di, j + dj
						if 0 <= ni < rows and 0 <= nj < cols:
							neighbours.append(high_freq_details[ni, nj])
							neighbour_coords.append((ni, nj))
							neighbour_distances.append((di**2 + dj**2)**0.5)

				# Identify the indices of the N lowest values from the neighborhood
				lowest_indices = np.argsort(neighbours)[:math.floor(len(neighbours) / 2)]

				# Select the corresponding values from the original array
				lowest_values = [data[neighbour_coords[idx]] for idx in lowest_indices]

				# Select the corresponding distances
				lowest_values_distances = [neighbour_distances[idx] for idx in lowest_indices]

				# Calculate weights for the lowest values based on their distances
				lowest_values_weights = [1.0 / (d + 1) for d in lowest_values_distances]

				# Set the current point in the new array to the weighted average of these lowest values
				filtered_data[i, j] = np.average(lowest_values, weights=lowest_values_weights)

		# 5. Return the new array. Don't leak numpy types to the caller.
		return filtered_data.tolist()

	def create_compensation_mesh(self, gcmd, profile, desired_spacing, minimum_spacing, chamber_temp, keep_temp_meshes):
		try:
			bpr: BeaconProbingRegions = self.ratos.get_beacon_probing_regions()
			safe_min_x = max(bpr.mesh_proximity_min_coil_pos[0], bpr.mesh_contact_min[0])
			safe_max_x = min(bpr.mesh_proximity_max_coil_pos[0], bpr.mesh_contact_max[0])
			safe_min_y = max(bpr.mesh_proximity_min_coil_pos[1], bpr.mesh_contact_min[1])
			safe_max_y = min(bpr.mesh_proximity_max_coil_pos[1], bpr.mesh_contact_max[1])

			if (bpr.mesh_contact_min != bpr.mesh_proximity_min_coil_pos or bpr.mesh_contact_max != bpr.mesh_proximity_max_coil_pos):
				logging.info(f'{self.name}: beacon probing regions contact and proximity bounds do not match, the compensation mesh bounds will be reduced to the intersecting region.')

			if self._cotemporal_probing_helper.faulty_regions:
				gcmd.respond_info(f"{len(self._cotemporal_probing_helper.faulty_regions)} faulty proximity probing regions are configured. Proximity values for points within these regions will be interpolated.")
				logging.info(f"{self.name}: faulty proximity probing regions: {self._cotemporal_probing_helper.faulty_regions}")

			use_offset_aligned = self._cotemporal_probing_helper.can_use_offset_aligned_probing(minimum_spacing)
			skip_local_low_filter = False
			primary_axis = None
			extra_notes = ""

			if use_offset_aligned:
				pattern = "offset-aligned"
				primary_axis, probe_count_x, probe_count_y, max_x, max_y, actions = self._cotemporal_probing_helper.generate_probe_action_sequence_beacon_offset_aligned(
					desired_spacing,
					minimum_spacing,
					(safe_min_x, safe_min_y),
					(safe_max_x, safe_max_y)
				)

				x_spacing = (max_x - safe_min_x) / (probe_count_x - 1)
				y_spacing = (max_y - safe_min_y) / (probe_count_y - 1)

				gcmd.respond_info(
					f"Using {pattern} cotemporal probing strategy:\n"
					f"Generated {len(actions)} probe actions for the region from ({safe_min_x:.2f}, {safe_min_y:.2f}) to ({safe_max_x:.2f}, {safe_max_y:.2f})\n"
					f"Mesh points: {probe_count_x} x {probe_count_y}, max coordinates: ({max_x:.2f}, {max_y:.2f}), spacing: ({x_spacing:.2f}, {y_spacing:.2f})")

				progress_handler = None
				try:
					progress_handler = BackgroundDisplayStatusProgressHandler(self.printer, "{spinner} Probing {progress:.1f}%")
					progress_handler.enable()

					faulty_proximity_count, results = self._cotemporal_probing_helper.run_probe_action_sequence(
						gcmd,
						probe_count_x, probe_count_y,
						actions,
						progress_handler=progress_handler
					)
				finally:
					if progress_handler:
						progress_handler.disable()

				contact_points = [[results[y][x].contact_z for x in range(len(results[y]))] for y in range(len(results))]
				proximity_points = [[results[y][x].proximity_z for x in range(len(results[y]))] for y in range(len(results))]

			else:
				# This is the simple but slow point-by-point probing strategy.
				# Note that the filtering logic is geared towards quite high-resolution meshes (eg, 10mm spacing).
				# Low-resolution meshes are not recommended.
				pattern = "point-by-point"

				# Require at least 4 points in each axis to avoid breaking filter and interpolation logic.
				probe_count_x = max(4, int((safe_max_x - safe_min_x) / desired_spacing + 1))
				probe_count_y = max(4, int((safe_max_y - safe_min_y) / desired_spacing + 1))

				# There's some rounding of the distance between points, so the actual max coordinates are
				# returned by generate_mesh_points.
				max_x, max_y, points = self.generate_mesh_points(
					probe_count_x, probe_count_y,
					[safe_min_x, safe_min_y],
					[safe_max_x, safe_max_y])

				x_spacing = (max_x - safe_min_x) / (probe_count_x - 1)
				y_spacing = (max_y - safe_min_y) / (probe_count_y - 1)

				force_multipoint_probing = (
					x_spacing > self.POINT_BY_POINT_FORCE_MULTIPOINT_SPACING_THRESHOLD or
					y_spacing > self.POINT_BY_POINT_FORCE_MULTIPOINT_SPACING_THRESHOLD
				)

				if force_multipoint_probing:
					skip_local_low_filter = True
					extra_notes += ", using multi-sample probing due to large spacing (local-low filter skipped)"
					logging.info(f"{self.name}: Using multi-sample probing for point-by-point probing strategy due to large spacing (x_spacing: {x_spacing:.2f}, y_spacing: {y_spacing:.2f})")

				contact_z = None
				faulty_proximity_count = 0
				results = [[None] * probe_count_x for _ in range(probe_count_y)]

				gcmd.respond_info(
					f"Using {pattern} cotemporal probing strategy:\n"
					f"Generated {len(points)} probe points for the region from ({safe_min_x:.2f}, {safe_min_y:.2f}) to ({safe_max_x:.2f}, {safe_max_y:.2f})\n"
					f"Mesh points: {probe_count_x} x {probe_count_y}, max coordinates: ({max_x:.2f}, {max_y:.2f}), spacing: ({x_spacing:.2f}, {y_spacing:.2f})"
					+ (", using multi-sample probing due to large spacing" if force_multipoint_probing else ""))

				progress_handler = None
				try:
					progress_handler = BackgroundDisplayStatusProgressHandler(self.printer, "{spinner} Probing {progress:.1f}%")
					progress_handler.enable()

					for i, point in enumerate(points):
						progress_handler.progress = (i + 1) / len(points)

						contact_z, proximity_z = self._cotemporal_probing_helper.probe_single_location(
							gcmd,
							point[2:],
							None if force_multipoint_probing else contact_z)

						if math.isnan(proximity_z):
							faulty_proximity_count += 1

						results[point[1]][point[0]] = (point[2], point[3], contact_z, proximity_z)
				finally:
					if progress_handler:
						progress_handler.disable()

				gcmd.respond_info(f"Probed {len(points)} points in the region from ({safe_min_x:.2f}, {safe_min_y:.2f}) to ({safe_max_x:.2f}, {safe_max_y:.2f})")

				contact_points = [[results[y][x][2] for x in range(len(results[y]))] for y in range(len(results))]
				proximity_points = [[results[y][x][3] for x in range(len(results[y]))] for y in range(len(results))]

			if faulty_proximity_count > 0:
				gcmd.respond_info(f"{faulty_proximity_count} faulty region proximity probe values will be interpolated.")
				proximity_points = self._interpolate_faulty_region_values(proximity_points, x_spacing, y_spacing)

			extra_params = {}
			extra_params[RATOS_MESH_VERSION_PARAMETER] = RATOS_MESH_VERSION
			extra_params[RATOS_MESH_BED_TEMP_PARAMETER] = self._get_nominal_bed_temp()
			extra_params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_MEASURED
			extra_params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_OFFSET_ALIGNED if use_offset_aligned else RATOS_MESH_BEACON_PROBE_METHOD_COTEMPORAL_POINT_BY_POINT
			extra_params[RATOS_MESH_NOTES_PARAMETER] = f"input mesh for cotemporal mesh created using {pattern} sampling pattern"

			# Store a few fields that might be useful for compatibility checking in the future,
			# but the checks don't yet exist.
			extra_params[RATOS_MESH_CHAMBER_TEMP_PARAMETER] = chamber_temp
			extra_params[RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER] = (safe_min_x, safe_min_y, safe_max_x, safe_max_y)

			if primary_axis is not None:
				deridged_contact_points = self._apply_deridging_filter(contact_points, primary_axis)
				deridged_proximity_points = self._apply_deridging_filter(proximity_points, primary_axis)

				contact_rmse = self._get_mesh_difference_rmse(contact_points, deridged_contact_points)
				proximity_rmse = self._get_mesh_difference_rmse(proximity_points, deridged_proximity_points)

				extra_notes += f", deridged (primary axis: {primary_axis}, contact RMSE: {contact_rmse:.4f}, proximity RMSE: {proximity_rmse:.4f})"

				filtered_contact_points = deridged_contact_points if skip_local_low_filter else self._apply_local_low_filter(deridged_contact_points)

				if keep_temp_meshes:
					self._install_and_save_new_mesh(
						f"{profile}_CONTACT",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						contact_points
					)

					self._install_and_save_new_mesh(
						f"{profile}_CONTACT_DERIDGED",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						deridged_contact_points
					)

					self._install_and_save_new_mesh(
						f"{profile}_PROXIMITY",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						proximity_points
					)

					self._install_and_save_new_mesh(
						f"{profile}_PROXIMITY_DERIDGED",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						deridged_proximity_points
					)

				proximity_points = deridged_proximity_points
			else:
				filtered_contact_points = contact_points if skip_local_low_filter else self._apply_local_low_filter(contact_points)

				if keep_temp_meshes:
					self._install_and_save_new_mesh(
						f"{profile}_CONTACT",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						contact_points
					)

					self._install_and_save_new_mesh(
						f"{profile}_PROXIMITY",
						extra_params,
						(safe_min_x, safe_min_y),
						(max_x, max_y),
						proximity_points
					)

			if keep_temp_meshes and not skip_local_low_filter:
				self._install_and_save_new_mesh(
					f"{profile}_CONTACT_FILTERED",
					extra_params,
					(safe_min_x, safe_min_y),
					(max_x, max_y),
					filtered_contact_points
				)

			comp_points = [[filtered_contact_points[y][x] - proximity_points[y][x] for x in range(len(proximity_points[y]))] for y in range(len(proximity_points))]
			extra_params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_COMPENSATION
			extra_params[RATOS_MESH_NOTES_PARAMETER] = f"cotemporal compensation mesh created using {pattern} sampling pattern{extra_notes}"

			self._install_and_save_new_mesh(
				f"{profile}",
				extra_params,
				(safe_min_x, safe_min_y),
				(max_x, max_y),
				comp_points
			)

			gcmd.respond_info(f"Compensation mesh created with profile '{profile}'")

		except RatOSBeaconMeshError as e:
			raise gcmd.error(f"Failed to create compensation mesh: {str(e)}") from e

	def load_extra_mesh_params(self):
		profiles = self.bed_mesh.pmgr.get_profiles()

		for profile_name in profiles.keys():
			profile = profiles[profile_name]
			profile_params = profile["mesh_params"]

			# Try to find the config section for this profile
			# Handle profile names with spaces correctly
			try:
				config_section_name = self.bed_mesh.pmgr.name + " " + profile_name
				config = self.config.getsection(config_section_name)
			except Exception:
				# Skip if no config section exists for this profile
				continue

			version = config.getint(RATOS_MESH_VERSION_PARAMETER, None)

			if version == 1:
				try:
					mesh_kind = config.getchoice(RATOS_MESH_KIND_PARAMETER, list(RATOS_MESH_KIND_CHOICES))
					mesh_probe_method = config.getchoice(RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER, list(RATOS_MESH_BEACON_PROBE_METHOD_CHOICES))
					mesh_bed_temp = config.getfloat(RATOS_MESH_BED_TEMP_PARAMETER)
					mesh_chamber_temp = config.getfloat(RATOS_MESH_CHAMBER_TEMP_PARAMETER, None)
					mesh_proximity_mesh_bounds_str = config.get(RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER, None)
					if mesh_proximity_mesh_bounds_str:
						# "(min_x,min_y,max_x,max_y)" format
						mesh_proximity_mesh_bounds = tuple(float(x) for x in mesh_proximity_mesh_bounds_str.strip("()").split(","))
						if len(mesh_proximity_mesh_bounds) != 4:
							raise config.error(f"Invalid value for {RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER}: {mesh_proximity_mesh_bounds_str}")
					else:
						mesh_proximity_mesh_bounds = None
					notes = config.get(RATOS_MESH_NOTES_PARAMETER, None)
				except config.error as ex:
					self.ratos.console_echo("RatOS Beacon bed mesh management", "error",
								f"Bed mesh profile '{profile_name}' configuration is invalid: {str(ex)}")
					self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
					continue

				profile_params[RATOS_MESH_VERSION_PARAMETER] = version
				profile_params[RATOS_MESH_KIND_PARAMETER] = mesh_kind
				profile_params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = mesh_probe_method
				profile_params[RATOS_MESH_BED_TEMP_PARAMETER] = mesh_bed_temp

				if notes:
					profile_params[RATOS_MESH_NOTES_PARAMETER] = notes
				else:
					profile_params.pop(RATOS_MESH_NOTES_PARAMETER, None)

				if mesh_chamber_temp is not None:
					profile_params[RATOS_MESH_CHAMBER_TEMP_PARAMETER] = mesh_chamber_temp
				else:
					profile_params.pop(RATOS_MESH_CHAMBER_TEMP_PARAMETER, None)

				if mesh_proximity_mesh_bounds is not None:
					profile_params[RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER] = mesh_proximity_mesh_bounds
				else:
					profile_params.pop(RATOS_MESH_PROXIMITY_MESH_BOUNDS_PARAMETER, None)
			else:
				self.ratos.console_echo("RatOS Beacon bed mesh management", "warning",
							f"Bed mesh profile '{profile_name}' was created without extended RatOS Beacon bed mesh support."
							if version is None else
							f"Bed mesh profile '{profile_name}' has version {version} which is not compatible with this version of RatOS.")
				self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
				continue

	desc_BED_MESH_SUBTRACT = "For diagnostic use. Subtracts mesh A from mesh B and creates a new mesh with the result. The new mesh will have the grid of the PRIMARY mesh."
	def cmd_BED_MESH_SUBTRACT(self, gcmd):
		profile_a = gcmd.get('A').strip()
		profile_b = gcmd.get('B').strip()
		primary= gcmd.get('PRIMARY', 'a').strip().lower()
		if profile_a == profile_b:
			raise gcmd.error("Profiles A and B must be different.")
		if primary not in ('a', 'b'):
			raise gcmd.error(f"Invalid PRIMARY value '{primary}'. Must be 'A' or 'B'.")

		zmesh_a = self._create_zmesh_from_profile(profile_a)
		zmesh_b = self._create_zmesh_from_profile(profile_b)

		pri, sec = (zmesh_a, zmesh_b) if primary == 'a' else (zmesh_b, zmesh_a)

		pri_points = pri.probed_matrix
		sec_points = sec.probed_matrix
		diff_points = np.full_like(pri_points, 0.)

		grid_is_same = pri.mesh_x_min == sec.mesh_x_min and \
			pri.mesh_x_max == sec.mesh_x_max and \
			pri.mesh_y_min == sec.mesh_y_min and \
			pri.mesh_y_max == sec.mesh_y_max and \
			len(pri_points) == len(sec_points) and \
			len(pri_points[0]) == len(sec_points[0])

		for y in range(len(pri_points)):
			for x in range(len(pri_points[0])):
				pri_z = pri_points[y][x]
				x_pos = pri.mesh_x_min + x * ((pri.mesh_x_max - pri.mesh_x_min) / (len(pri.probed_matrix[0]) - 1))
				y_pos = pri.mesh_y_min + y * ((pri.mesh_y_max - pri.mesh_y_min) / (len(pri.probed_matrix) - 1))
				sec_z = sec_points[y][x] if grid_is_same else sec.calc_z(x_pos, y_pos)
				diff = pri_z - sec_z if primary == 'a' else sec_z - pri_z
				diff_points[y][x] = diff
				if ( x == 0 or x == len(pri_points[0]) - 1 ) and (y == 0 or y == len(pri_points) - 1):
					# Only log the corners
					gcmd.respond_info(
						f"Subtracting {profile_b} from {profile_a} at point {x}, {y} ({x_pos:.2f}, {y_pos:.2f}): "
						f"pri={pri_z:.4f}, sec={sec_z:.4f}, diff={diff:.4f}"
					)

		# Some of the parameters values used here are not strictly correct, but they are "safe"
		# given that this mesh is synthetic, this method is a diagnostic tool, and it wasn't worth the effort to
		# invent new parameter values.
		extra_params = {}
		extra_params[RATOS_MESH_VERSION_PARAMETER] = RATOS_MESH_VERSION
		extra_params[RATOS_MESH_BED_TEMP_PARAMETER] = 0
		extra_params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_MEASURED
		extra_params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY
		extra_params[RATOS_MESH_NOTES_PARAMETER] = f"Mesh subtraction of '{profile_a}' minus '{profile_b}' based on the grid of '{profile_a if primary == 'a' else profile_b}'."

		self._install_and_save_new_mesh(
			f"{profile_a}_MINUS_{profile_b}",
			extra_params,
			(pri.mesh_x_min, pri.mesh_y_min),
			(pri.mesh_x_max, pri.mesh_y_max),
			diff_points.tolist()
		)

	def _get_mesh_difference_rmse(self, points_a: List[List[float]], points_b: List[List[float]]) -> float:
		parent_conn, child_conn = multiprocessing.Pipe()

		def do():
			try:
				child_conn.send(
					(False, self._do_get_mesh_difference_rmse(points_a, points_b))
				)
			except Exception:
				child_conn.send((True, traceback.format_exc()))
			child_conn.close()

		child = multiprocessing.Process(target=do)
		child.daemon = True
		child.start()
		reactor = self.reactor
		eventtime = reactor.monotonic()
		while child.is_alive():
			eventtime = reactor.pause(eventtime + 0.1)
		is_err, result = parent_conn.recv()
		child.join()
		parent_conn.close()
		if is_err:
			raise RatOSBeaconMeshError("Error calculating mesh difference RMSE: %s" % (result,))
		else:
			return result

	def _do_get_mesh_difference_rmse(self, points_a: List[List[float]], points_b: List[List[float]]) -> float:
		"""
		Calculate the RMSE (Root Mean Square Error) between two sets of mesh points.
		:param points_a: First set of mesh points.
		:param points_b: Second set of mesh points.
		:return: RMSE value.
		"""
		np_a = np.array(points_a)
		np_b = np.array(points_b)

		if np_a.shape != np_b.shape:
			raise ValueError("The two point sets must have the same shape.")

		diff = np_a - np_b
		rmse = np.sqrt(np.mean(np.square(diff)))
		return rmse

	def _apply_deridging_filter(self, input_points: List[List[float]], primary_axis: str) -> List[List[float]]:
		parent_conn, child_conn = multiprocessing.Pipe()

		def do():
			try:
				child_conn.send(
					(False, self._do_apply_deridging_filter(input_points, primary_axis))
				)
			except Exception:
				child_conn.send((True, traceback.format_exc()))
			child_conn.close()

		child = multiprocessing.Process(target=do)
		child.daemon = True
		child.start()
		reactor = self.reactor
		eventtime = reactor.monotonic()
		while child.is_alive():
			eventtime = reactor.pause(eventtime + 0.1)
		is_err, result = parent_conn.recv()
		child.join()
		parent_conn.close()
		if is_err:
			raise RatOSBeaconMeshError("Error applying deridging filter: %s" % (result,))
		else:
			return result

	def _do_apply_deridging_filter(self, input_points: List[List[float]], primary_axis: str) -> List[List[float]]:
		"""
		Apply a de-ridging filter to the input points along the specified primary axis.
		:param input_points: List of points to filter, where each point is a list of coordinates.
		:param primary_axis: The primary axis along which to apply the filter ('x' or 'y').
		:return: Filtered list of points.
		:raises ValueError: If the primary_axis is not 'x' or 'y'.
		"""
		arr = np.array(input_points)
		if primary_axis == 'y':
			# Filter along axis 1 (columns)
			result = np.zeros_like(arr)
			# Middle points
			result[:, 1:-1] = (
				0.25 * arr[:, :-2] +
				0.5  * arr[:, 1:-1] +
				0.25 * arr[:, 2:]
			)
			# Left edge
			result[:, 0] = 0.5 * arr[:, 0] + 0.5 * arr[:, 1]
			# Right edge
			result[:, -1] = 0.5 * arr[:, -1] + 0.5 * arr[:, -2]
		elif primary_axis == 'x':
			# Filter along axis 0 (rows)
			result = np.zeros_like(arr)
			# Middle points
			result[1:-1, :] = (
				0.25 * arr[:-2, :] +
				0.5  * arr[1:-1, :] +
				0.25 * arr[2:, :]
			)
			# Top edge
			result[0, :] = 0.5 * arr[0, :] + 0.5 * arr[1, :]
			# Bottom edge
			result[-1, :] = 0.5 * arr[-1, :] + 0.5 * arr[-2, :]
		else:
			raise ValueError(f"Invalid primary_axis: {primary_axis}")

		return result.tolist()

	def _install_and_save_new_mesh(
			self,
			profile_name,
			extra_params:Dict[str, Any],
			mesh_min:Tuple[float,float],
			mesh_max:Tuple[float,float],
			probed_points:List[List[float]],
			*,
			mesh_pps:Optional[Tuple[int, int]] = None,
			algorithm:Optional[str] = None,
			):

		x_count = len(probed_points[0])
		y_count = len(probed_points)

		cmd_params = dict(
			PROBE_COUNT=f"{x_count},{y_count}",
			MESH_MIN=f"{mesh_min[0]:.3f},{mesh_min[1]:.3f}",
			MESH_MAX=f"{mesh_max[0]:.3f},{mesh_max[1]:.3f}",
		)

		if mesh_pps:
			cmd_params['MESH_PPS'] = f"{mesh_pps[0]},{mesh_pps[1]}"

		if algorithm:
			cmd_params['ALGORITHM'] = algorithm

		self.bed_mesh.set_mesh(None)  # Clear any existing mesh before setting the new one
		bed_mesh_calibrate_like_command = self.gcode.create_gcode_command(
			"_", "_",
			cmd_params
		)

		try:
			self.bed_mesh.bmc.update_config(bed_mesh_calibrate_like_command)
		except BedMesh.BedMeshError as e:
			raise RatOSBeaconMeshError(f"Error updating bed mesh config: {str(e)}") from e

		params = dict(self.bed_mesh.bmc.mesh_config)
		params.update(extra_params)
		params['min_x'] = mesh_min[0]
		params['max_x'] = mesh_max[0]
		params['min_y'] = mesh_min[1]
		params['max_y'] = mesh_max[1]

		z_mesh = BedMesh.ZMesh(params, profile_name, self.reactor)

		try:
			z_mesh.build_mesh(probed_points)
		except BedMesh.BedMeshError as e:
			raise RatOSBeaconMeshError(str(e)) from e

		self.bed_mesh.set_mesh(z_mesh)
		self.bed_mesh.save_profile(profile_name)

	# This method originally adapted from Klipper's bed_mesh.py module, Copyright (C) 2018-2019 Eric Callahan <arksine.code@gmail.com>
	def generate_mesh_points(self, x_count, y_count, mesh_min, mesh_max) -> Tuple[float, float, List[Tuple[int, int, float, float]]]:
		min_x, min_y = mesh_min
		max_x, max_y = mesh_max
		x_dist = (max_x - min_x) / (x_count - 1)
		y_dist = (max_y - min_y) / (y_count - 1)
		# floor distances down to next hundredth
		x_dist = math.floor(x_dist * 100) / 100
		y_dist = math.floor(y_dist * 100) / 100
		if x_dist < 1. or y_dist < 1.:
			raise RatOSBeaconMeshError(f"{self.name}: min/max points too close together")

		max_x = min_x + x_dist * (x_count - 1)
		max_y = min_y + y_dist * (y_count - 1)
		pos_y = min_y
		points = []
		for i in range(y_count):
			for j in range(x_count):
				if not i % 2:
					# move in positive directon
					pos_x = min_x + j * x_dist
					idx_x = j
				else:
					# move in negative direction
					pos_x = max_x - j * x_dist
					idx_x = x_count - j - 1

				# rectangular bed, append
				points.append((idx_x, i, pos_x, pos_y))
			pos_y += y_dist
		return (max_x, max_y, points)

	def _interpolate_faulty_region_values(self, points: List[List[float]], x_spacing: float, y_spacing: float) -> List[List[float]]:
		parent_conn, child_conn = multiprocessing.Pipe()

		def do():
			try:
				child_conn.send(
					(False, self._do_interpolate_faulty_region_values(points, x_spacing, y_spacing))
				)
			except Exception:
				child_conn.send((True, traceback.format_exc()))
			child_conn.close()

		child = multiprocessing.Process(target=do)
		child.daemon = True
		child.start()
		reactor = self.reactor
		eventtime = reactor.monotonic()
		while child.is_alive():
			eventtime = reactor.pause(eventtime + 0.1)
		is_err, result = parent_conn.recv()
		child.join()
		parent_conn.close()
		if is_err:
			raise RatOSBeaconMeshError("Error interpolating faulty region values: %s" % (result,))
		else:
			return result

	def _do_interpolate_faulty_region_values(self, points: List[List[float]], x_spacing, y_spacing) -> List[List[float]]:
		# Replace faulty points with interpolated values, modifying the input array in place. Return the modified array.
		# x_spacing and y_spacing are the distances between points in the mesh, used to determine adjacency.
		# points is a 2D array of floats, where faulty points are NaN.

		if not self.scipy:
			try:
				self.scipy = importlib.import_module("scipy")
			except ImportError:
				raise Exception(
					"Could not load `scipy`. To install it, simply run `ratos doctor`. This "
					"module is required for Beacon contact compensation mesh creation."
				)

			if not hasattr(self.scipy.interpolate, "RBFInterpolator"):
				raise Exception(
					"The RBFInterpolator class is missing from the scipy module. Try using `ratos doctor`. This "
					"class is required for Beacon contact compensation mesh creation."
				)

		pp = np.array(points)

		# Find faulty points (NaN)
		mask_faulty = np.isnan(pp)

		# If no faulty points, return as is
		if not np.any(mask_faulty):
			return points

		y_count, x_count = pp.shape

		# Build coordinate arrays
		xs = np.arange(x_count) * x_spacing
		ys = np.arange(y_count) * y_spacing
		grid_x, grid_y = np.meshgrid(xs, ys)

		# Get valid points
		valid_mask = ~mask_faulty
		valid_x = grid_x[valid_mask].flatten()
		valid_y = grid_y[valid_mask].flatten()
		valid_z = pp[valid_mask].flatten()

		# Prepare coordinates for interpolation
		interp_coords = np.column_stack((valid_x, valid_y))
		query_coords = np.column_stack((grid_x[mask_faulty], grid_y[mask_faulty]))

		# Interpolate faulty points
		interpolated = self.scipy.interpolate.RBFInterpolator(interp_coords, valid_z, neighbors=64)(query_coords)

		# Fill in repaired values
		pp[mask_faulty] = interpolated

		return pp.tolist()

class ProbeCommandKind(Enum):
	CONTACT_SINGLE = 1
	CONTACT_MULTI = 2
	PROXIMITY = 3

class ProbeAction(NamedTuple):
	"""
	Represents a single probing action.

	Attributes:
		is_contact:
			True if this is a contact probe, False if this is a proximity probe.
		idx_x: The x index of the point in the mesh.
		idx_y: The y index of the point in the mesh.
		pos_x: The x coordinate of the toolhead at which the probing action should take place (ie, proximity actions are adjusted for the beacon offset).
		pos_y: The y coordinate of the toolhead at which the probing action should take place (ie, proximity actions are adjusted for the beacon offset).
	"""
	is_contact: bool
	idx_x: int
	idx_y: int
	pos_x: float
	pos_y: float

@dataclass
class ProbeActionResult:
	"""
	Represents the result of a probing action.

	Attributes:
		contact_z: The z value from the contact probe.
		proximity_z: The z value from the proximity probe.
		contact_time: The reactor monotonic time when the contact probe was completed.
		proximity_time: The reactor monotonic time when the proximity probe was completed.
	"""
	contact_z: Optional[float] = None
	proximity_z: Optional[float] = None
	contact_time: Optional[float] = None
	proximity_time: Optional[float] = None

class CotemporalProbingHelper:

	# For offset-aligned probing, this is the maximum allowed offset in the direction perpendicular to the
	# primary movement. For example, if the primary movement is 'x', this is the maximum allowed offset in
	# the 'y' direction. With offset-aligned algorithm, we don't move the probe off the primary axis, so
	# MAXIMUM_SECONDARY_BEACON_OFFSET limits how far off-axis we allow the probe to be.
	# NB: Beacons mounted off-axis have not been tested, so this value is speculative.
	MAXIMUM_SECONDARY_BEACON_OFFSET = 2.0 # mm

	def __init__(self, config):
		self.printer = config.get_printer()
		self.reactor = self.printer.get_reactor()
		self.gcode = self.printer.lookup_object("gcode")

		self.beacon = None
		self._probe_finalize = None
		self._probe_helper = None
		self._beacon_proximity_offsets = None
		self.faulty_regions = []

		if not config.has_section("beacon"):
			return

		if config.has_section("bed_mesh"):
			mesh_config = config.getsection("bed_mesh")

			for i in list(range(1, 100, 1)):
				start = mesh_config.getfloatlist(
					"faulty_region_%d_min" % (i,), None, count=2
				)
				if start is None:
					break
				end = mesh_config.getfloatlist("faulty_region_%d_max" % (i,), count=2)
				x_min = min(start[0], end[0])
				x_max = max(start[0], end[0])
				y_min = min(start[1], end[1])
				y_max = max(start[1], end[1])
				self.faulty_regions.append(Region(x_min, x_max, y_min, y_max))

		self._probe_helper = probe.ProbePointsHelper(config, self._call_probe_finalize, [])
		self.printer.register_event_handler("klippy:connect", self._connect)

	def _connect(self):
		self.beacon = self.printer.lookup_object("beacon")

		# NB: We can't rely on beacon.get_offsets() because the output depends on beacon._current_probe: basically,
		# beacon.get_offsets() appears to be designed for API compliance in limited circumstances, not for general use.
		# Futher, ProbePointsHelper.use_xy_offsets() relies on beacon.get_offsets(), and the same limited
		# circumstances restriction applies. Our use case here is not one of those circumstances.
		#
		# Further, any direct or indirect reliance on beacon.get_offsets() has a nasty risk of leading to very confusing
		# bugs, as the value returned when called outside designed-for limited circumstances depends on whether the
		# last expected-circumstance probe was a contact or proximity probe.
		self._beacon_proximity_offsets = (self.beacon.x_offset, self.beacon.y_offset, self.beacon.trigger_distance)

	def _is_faulty_coordinate(self, x, y, add_offsets=False):
		if add_offsets:
			xo, yo = self.beacon.x_offset, self.beacon.y_offset
			x += xo
			y += yo
		for r in self.faulty_regions:
			if r.is_point_within(x, y):
				return True
		return False

	def do_contact_probe(self, gcmd, position, contact_reference_z: Optional[float]=None, delta_contact_z_limit=0.075) -> float:
		"""
		Perform a contact probe at a single position.
		:param gcmd: Gcode command object
		:param position: A single [x, y] coordinate to probe.
		:param contact_reference_z: The reference z value to compare against for contact probing validity checking.
		:param delta_contact_z_limit: The maximum allowed difference between the contact probe z value and the reference z value.
		:return: The z value from the contact probe.
		"""
		if not self.beacon:
			raise RatOSBeaconMeshError("Beacon module is not loaded")

		try:
			contact_z = None
			contact_complete = False
			contact_force_multi = False

			self._probe_helper.update_probe_points([position], 1)

			while not contact_complete:
				contact_cmd = None

				if contact_force_multi or contact_reference_z is None:
					contact_cmd = self._get_probe_command(gcmd, ProbeCommandKind.CONTACT_MULTI)
					def contact_cb(_, positions):
						nonlocal contact_z, contact_complete
						if len(positions) != 1:
							raise RatOSBeaconMeshError(f"Expected exactly one position from contact probe, got {len(positions)}")
						contact_z = positions[0][2]
						contact_complete = True
						return "done"
				else:
					contact_cmd = self._get_probe_command(gcmd, ProbeCommandKind.CONTACT_SINGLE)
					def contact_cb(_, positions):
						nonlocal contact_z, contact_complete, contact_force_multi
						if len(positions) != 1:
							raise RatOSBeaconMeshError(f"Expected exactly one position from contact probe, got {len(positions)}")
						z = positions[0][2]
						dz = abs(z - contact_reference_z)
						if dz > delta_contact_z_limit:
							self.gcode.respond_info(f"Single-contact probe z={z:.4f} is not within limit of {delta_contact_z_limit:.4f} from reference z={contact_reference_z:.4f}, retrying with multi-contact")
							contact_force_multi = True
						else:
							contact_z = z
							contact_complete = True

						return "done"

				self._probe_finalize = contact_cb
				self._probe_helper.start_probe(contact_cmd)

			return contact_z
		finally:
			self._probe_finalize = None

	def do_proximity_probe(self, gcmd, position, subtract_offset=False) -> float:
		"""
		Perform a proximity probe at a single position.
		:param gcmd: Gcode command object
		:param position: A single [x, y] coordinate to probe.
		:param subtract_offset: If True, subtract the beacon proximity offsets from the position.
		:return: The z value from the proximity probe.
		"""
		if not self.beacon:
			raise RatOSBeaconMeshError("Beacon module is not loaded")

		try:
			proximity_z = None

			if subtract_offset:
				position = [
					position[0] - self._beacon_proximity_offsets[0],
					position[1] - self._beacon_proximity_offsets[1]
				]

			if self._is_faulty_coordinate(position[0], position[1], add_offsets=True):
				gcmd.respond_info(f"Skipping proximity probe at faulty region coordinate ({position[0] + self._beacon_proximity_offsets[0]:.2f}, {position[1] + self._beacon_proximity_offsets[1]:.2f})")
				return float('nan')

			proximity_cmd = self._get_probe_command(gcmd, ProbeCommandKind.PROXIMITY)

			def proximity_cb(_, positions):
				nonlocal proximity_z
				if len(positions) != 1:
					raise RatOSBeaconMeshError(f"Expected exactly one position from proximity probe, got {len(positions)}")
				proximity_z = positions[0][2]
				return "done"

			self._probe_helper.update_probe_points([position], 1)
			self._probe_finalize = proximity_cb
			self._probe_helper.start_probe(proximity_cmd)

			return proximity_z - self._beacon_proximity_offsets[2]
		finally:
			self._probe_finalize = None

	def probe_single_location(self, gcmd, position, contact_reference_z: Optional[float], delta_contact_z_limit=0.075) -> Tuple[float, float]:
		"""
		Probe contact and proximity at a single location.
		:param gcmd: Gcode command object
		:param position: A single [x, y] coordinate to probe.
		:param contact_reference_z: The reference z value to compare against for contact probing validity checking.
		:param delta_contact_z_limit: The maximum allowed difference between the contact probe z value and the reference z value.
		:return: A tuple of (contact_z, proximity_z) where contact_z is the z value from the contact probe and proximity_z is the z value from the proximity probe.
		"""
		if not self.beacon:
			# We don't expect to be called if the beacon module is not loaded.
			raise RatOSBeaconMeshError("Beacon module is not loaded")

		contact_z = self.do_contact_probe(
			gcmd,
			position,
			contact_reference_z=contact_reference_z,
			delta_contact_z_limit=delta_contact_z_limit)

		proximity_z = self.do_proximity_probe(
			gcmd,
			position,
			subtract_offset=True)

		return contact_z, proximity_z

	def _call_probe_finalize(self, offsets, positions):
		if self._probe_finalize is None:
			raise RatOSBeaconMeshError("_probe_finalize callback is not set")

		return self._probe_finalize(offsets, positions)

	def _get_probe_command(self, gcmd, kind: ProbeCommandKind):
		#PROBE PROBE_METHOD=contact PROBE_SPEED=3 LIFT_SPEED=15 SAMPLES=5 SAMPLE_RETRACT_DIST=3 SAMPLES_TOLERANCE=0.005 SAMPLES_TOLERANCE_RETRIES=10 SAMPLES_RESULT=median
		if kind == ProbeCommandKind.CONTACT_SINGLE:
			probe_args = dict(
				PROBE_METHOD='contact',
				SAMPLES='1',
				SAMPLES_DROP='0',
				HORIZONTAL_MOVE_Z=str(self._beacon_proximity_offsets[2])
			)
		elif kind == ProbeCommandKind.CONTACT_MULTI:
			probe_args = dict(
				PROBE_METHOD='contact',
				SAMPLES='3',
				SAMPLES_DROP='1',
				SAMPLES_TOLERANCE_RETRIES='15'
			)
		elif kind == ProbeCommandKind.PROXIMITY:
			probe_args = dict(
				PROBE_METHOD='proximity',
				SAMPLES='1',
				SAMPLES_DROP='0',
				HORIZONTAL_MOVE_Z=str(self._beacon_proximity_offsets[2])
			)
		else:
			raise RatOSBeaconMeshError(f"Unknown ProbeCommandKind: {kind}")

		sensor = gcmd.get('SENSOR', None)
		if sensor:
			probe_args['SENSOR'] = sensor

		return self.gcode.create_gcode_command(
			gcmd.get_command(),
			gcmd.get_command()
				+ "".join(" " + k + "=" + v for k, v in probe_args.items()),
			probe_args
		)

	def run_probe_action_sequence(
			self,
			gcmd,
			count_x:int,
			count_y:int,
			probe_actions:List[ProbeAction],
			*,
			delta_contact_z_limit=0.075,
			progress_handler:Optional[BackgroundDisplayStatusProgressHandler]=None) -> Tuple[int, List[List[ProbeActionResult]]]:
		"""
		Perform a sequence of probing actions.
		:param gcmd: Gcode command object
		:param probe_actions: A list of ProbeAction objects representing the probing actions to perform.
		:return: A tuple of (faulty_count, results) where:
				faulty_count is the number of faulty proximity points detected during probing.
				results is a grid of tuples (contact_z, proximity_z, contact_time, proximity_time) where contact_z is the z value from the contact
				 probe, proximity_z is the z value from the proximity probe and time_difference is the
				 time that elapsed between the contact and proximity probes in seconds.
		"""
		if not self.beacon:
			# We don't expect to be called if the beacon module is not loaded.
			raise RatOSBeaconMeshError("Beacon module is not loaded")

		results = [[ProbeActionResult() for _ in range(count_x)] for _ in range(count_y)]

		faulty_count = 0
		last_contact_z = None

		for i, action in enumerate(probe_actions):
			if action.idx_x < 0 or action.idx_x >= count_x or action.idx_y < 0 or action.idx_y >= count_y:
				raise RatOSBeaconMeshError(f"ProbeAction indices out of bounds: idx_x={action.idx_x}, idx_y={action.idx_y}, count_x={count_x}, count_y={count_y}")

			action_result = results[action.idx_y][action.idx_x]

			if action.is_contact:
				# Perform a contact probe
				contact_z = self.do_contact_probe(
					gcmd,
					[action.pos_x, action.pos_y],
					last_contact_z,
					delta_contact_z_limit=delta_contact_z_limit
				)
				last_contact_z = contact_z
				action_result.contact_z = contact_z
				action_result.contact_time = self.reactor.monotonic()
			else:
				proximity_z = self.do_proximity_probe(
					gcmd,
					[action.pos_x, action.pos_y])
				action_result.proximity_z = proximity_z
				action_result.proximity_time = self.reactor.monotonic()
				if math.isnan(proximity_z):
					# Faulty point detected
					faulty_count += 1

			if progress_handler:
				progress_handler.progress = (i + 1) / len(probe_actions)

		return (faulty_count, results)

	def can_use_offset_aligned_probing(self, minimum_spacing) -> bool:
		"""
		Deterimes if offset-aligned probing can be used with the current beacon offsets and minimum spacing.
		:param minimum_spacing: The minimum allowed spacing of mesh points in mm.
		:return: True if offset-aligned probing can be used, False otherwise.
		"""
		offsets = self._beacon_proximity_offsets
		if offsets[0] < 5. and offsets[1] < 5.:
			# It's not physically possible to have the beacon overlap with the nozzle. The check above
			# is actually more permissive than current beacon physical dimensions so it allows for future
			# beacon hardware revisions.
			raise RatOSBeaconMeshError(f"The configured Beacon sensor offset ({offsets[0]:.3f}, {offsets[1]:.3f}) is not valid.")

		primary_axis = 'x' if abs(offsets[0]) > abs(offsets[1]) else 'y'
		primary_offset = offsets[0] if primary_axis == 'x' else offsets[1]
		secondary_offset = offsets[1] if primary_axis == 'x' else offsets[0]
		abs_primary_offset = abs(primary_offset)
		abs_secondary_offset = abs(secondary_offset)

		if abs_secondary_offset > self.MAXIMUM_SECONDARY_BEACON_OFFSET:
			# This happens when the beacon is not mounted off to one side of the nozzle predominantly in the
			# x axis or predominantly in the y axis, for example if the beacon is mounted diagnonally offset from the nozzle.
			return False

		if abs_primary_offset < minimum_spacing:
			# If the primary axis offset is smaller than the finest resolution allowed.
			return False

		return True

	def generate_probe_action_sequence_beacon_offset_aligned(
			self,
			desired_spacing:float,
			minimum_spacing:float,
			mesh_min:Tuple[float,float],
			mesh_max:Tuple[float,float]) -> Tuple[int, int, float, float, List[ProbeAction]]:
		"""
		Generate a sampling sequence for a rectangular bed with the primary axis of movement aligned to primary axis of the beacon mounting offset.
		The actual resolution of the mesh will be the primary axis beacon offset divided by some whole number.
		:param desired_spacing: The desired spacing of mesh points in mm.
		:param minimum_spacing: The minimum allowed spacing of mesh points in mm.
		:param mesh_min: Minimum x, y coordinates of the mesh (min_x, min_y)
		:param mesh_max: Maximum x, y coordinates of the mesh (max_x, max_y)
		:return: A tuple of (count_x, count_y, max_x, max_y, points) where:
				count_x and count_y are the number of points in the mesh.
				max_x and max_y are the maximum x, y coordinates of the mesh (max_x, max_y).
				points is a list of tuples (is_contact, idx_x, idx_y, pos_x, pos_y), where:
					idx_x and idx_y are the indices of the point in the mesh, pos_x and pos_y are the coordinates of the
					toolhead at which the probing action should take place (ie, proximity actions are for adjusted for the beacon offset).
		"""
		if desired_spacing < minimum_spacing:
			raise RatOSBeaconMeshError(
				f"The desired spacing ({desired_spacing:.3f} mm) is less than the minimum spacing allowed ({minimum_spacing:.3f} mm).")

		# Maximum allowed secondary offset in mm

		offsets = self._beacon_proximity_offsets
		if offsets[0] < 5. and offsets[1] < 5.:
			# It's not physically possible to have the beacon overlap with the nozzle. The check above
			# is actually more permissive than current beacon physical dimensions so it allows for future
			# beacon hardware revisions.
			raise RatOSBeaconMeshError(f"The configured Beacon sensor offset ({offsets[0]:.3f}, {offsets[1]:.3f}) is not valid.")

		primary_axis = 'x' if abs(offsets[0]) > abs(offsets[1]) else 'y'
		secondary_axis = 'y' if primary_axis == 'x' else 'x'
		primary_offset = offsets[0] if primary_axis == 'x' else offsets[1]
		secondary_offset = offsets[1] if primary_axis == 'x' else offsets[0]
		abs_primary_offset = abs(primary_offset)
		abs_secondary_offset = abs(secondary_offset)

		if abs_secondary_offset > self.MAXIMUM_SECONDARY_BEACON_OFFSET:
			# This happens when the beacon is not mounted off to one side of the nozzle predominantly in the
			# x axis or predominantly in the y axis, for example if the beacon is mounted diagnonally offset from the nozzle.
			raise RatOSBeaconMeshError(
				f"The secondary Beacon sensor offset (|{secondary_axis}|={abs_secondary_offset}) is too large for use with the offset-aligned data collection method. "
				f"Maximum allowed secondary offset is {self.MAXIMUM_SECONDARY_BEACON_OFFSET:.3f} mm.")

		if abs_primary_offset < minimum_spacing:
			# If the primary axis offset is smaller than the finest resolution allowed, we can't use this method.
			raise RatOSBeaconMeshError(
				f"The primary Beacon sensor offset (|{primary_axis}|={abs_primary_offset}) is smaller than the finest resolution allowed ({minimum_spacing:.3f} mm). "
				f"To use offset-aligned data collection, the finest resolution allowed must be decreased.")

		offset_divisor = round(abs_primary_offset / desired_spacing)
		if offset_divisor < 1:
			offset_divisor = 1
		elif offset_divisor > 1 and abs_primary_offset / offset_divisor < minimum_spacing:
			offset_divisor -= 1

		# Round the resolution to the nearest hundredth of a millimeter, beacause Klipper's bed_mesh module
		# does this too. I'm not certain why, might be simply to keep numbers tidy for display.
		resolution = round(abs_primary_offset / offset_divisor, 2)

		x_count = int((mesh_max[0] - mesh_min[0]) / resolution + 1)
		y_count = int((mesh_max[1] - mesh_min[1]) / resolution + 1)

		max_x = mesh_min[0] + resolution * (x_count - 1)
		max_y = mesh_min[1] + resolution * (y_count - 1)

		primary_count, secondary_count = (x_count, y_count) if primary_axis == 'x' else (y_count, x_count)

		# - We always start probing at mesh_min
		# - We start by probing along the primary axis, moving in the positive direction.
		# - We then move to the next point along the secondary axis, and then probe along the primary axis in the negative direction.
		# - We repeat this until we have probed all points.

		# For each line of probing along the primary axis:
		# - We must determine if the beacon offset is leading or trailing the nozzle. This is
		#   determined by the sign of the primary axis offset compared to the primary axis direction.
		#   If the sign of the primary axis direction is the same as the sign of the primary axis offset,
		#   the beacon is leading the nozzle, otherwise it is trailing.
		# - If the beacon is leading the nozzle, we probe the proximity point first, then the contact point.
		# - If the beacon is trailing the nozzle, we probe the contact point first, then the proximity point.
		# - The toolhead location progresses monotonically along the primary axis.
		# - If offset_divisor is greater than 1, we must probe the first (offset_divisor - 1) proximity or
		#   contact points (accorinding to whether the beacon is leading or trailing), and thereafter we
		#   probe both contact and proximity points at the same toolhead location, although the location
		#   measured by proximity will be offset by the beacon offset in the primary axis direction.

		probe_actions = []
		def append_probe_action(is_contact, primary_idx, secondary_idx):
			x_index = primary_idx if primary_axis == 'x' else secondary_idx
			y_index = secondary_idx if primary_axis == 'x' else primary_idx
			x_pos = mesh_min[0] + x_index * resolution
			y_pos = mesh_min[1] + y_index * resolution
			if not is_contact:
				if primary_axis == 'x':
					x_pos -= primary_offset
				else:
					y_pos -= primary_offset

			probe_actions.append(ProbeAction(is_contact, x_index, y_index, x_pos, y_pos))

		for secondary_idx in range(secondary_count):
			# Determine if the beacon is leading or trailing the nozzle
			beacon_leading = ( primary_offset > 0 ) == ( secondary_idx % 2 == 0 )

			def primary_idx_from_line_idx(primary_line_idx):
				if secondary_idx % 2 == 0:
					return primary_line_idx
				else:
					return primary_count - primary_line_idx - 1

			# Add any initial probe actions for the first (offset_divisor - 1) points
			for primary_line_idx in range(offset_divisor - 1):
				append_probe_action(not beacon_leading, primary_idx_from_line_idx(primary_line_idx), secondary_idx)
				pass

			# Add probe actions where contact and proximity are probed at the same toolhead position
			for primary_line_idx in range(primary_count - (offset_divisor - 1)):
				append_probe_action(not beacon_leading, primary_idx_from_line_idx(primary_line_idx + offset_divisor - 1), secondary_idx)
				append_probe_action(beacon_leading, primary_idx_from_line_idx(primary_line_idx), secondary_idx)

			# Add any final probe actions for the last (offset_divisor - 1) points
			for primary_line_idx in range(offset_divisor - 1):
				append_probe_action(beacon_leading, primary_idx_from_line_idx(primary_count - (offset_divisor - 1) + primary_line_idx), secondary_idx)

		return primary_axis, x_count, y_count, max_x, max_y, probe_actions

#####
# Loader
#####
def load_config(config):
	return BeaconMesh(config)