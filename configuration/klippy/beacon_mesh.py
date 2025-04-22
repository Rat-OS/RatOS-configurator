import collections
from . import bed_mesh as BedMesh

###
# Mesh constants
###
RATOS_TEMP_SCAN_MESH_NAME = "__BEACON_TEMP_SCAN_MESH__"
RATOS_TEMP_CONTACT_MESH_NAME = "__BEACON_TEMP_CONTACT_MESH__"
RATOS_DEFAULT_COMPENSATION_MESH_NAME = "Beacon Scan Compensation"
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
RATOS_MESH_BEACON_PROBE_METHOD_CHOICES = (RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY, RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC, RATOS_MESH_BEACON_PROBE_METHOD_CONTACT)

RATOS_MESH_VERSION_PARAMETER = "ratos_mesh_version"
# - versioning of the extra metadata attached to meshes by ratos
RATOS_MESH_BED_TEMP_PARAMETER = "ratos_bed_temp"
# - the prevailing target bed temp when the mesh was created. For a compensated mesh, it's the
#   target bed temp of the source measured mesh.
RATOS_MESH_KIND_PARAMETER = "ratos_mesh_kind"
RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER = "ratos_beacon_probe_method"
# - for measured meshes, it's the probe method of measurement
# - for compensation meshes, it's the probe method of the proximity mesh used to make the compensation mesh
# - for compensated meshes, it's the probe method of the measured mesh that was then compensated

RATOS_MESH_PARAMETERS = (
	RATOS_MESH_VERSION_PARAMETER,
	RATOS_MESH_BED_TEMP_PARAMETER,
	RATOS_MESH_KIND_PARAMETER,
	RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER)

#####
# Beacon Mesh
#####

class BeaconMesh:
	bed_temp_warning_margin = 15

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
							   desc=(self.desc_BEACON_MESH_INIT))
			self.gcode.register_command('BEACON_APPLY_SCAN_COMPENSATION', 
							   self.cmd_BEACON_APPLY_SCAN_COMPENSATION, 
							   desc=(self.desc_BEACON_APPLY_SCAN_COMPENSATION))
			self.gcode.register_command('CREATE_BEACON_COMPENSATION_MESH', 
							   self.cmd_CREATE_BEACON_COMPENSATION_MESH, 
							   desc=(self.desc_CREATE_BEACON_COMPENSATION_MESH))
			self.gcode.register_command('SET_ZERO_REFERENCE_POSITION', 
							   self.cmd_SET_ZERO_REFERENCE_POSITION, 
							   desc=(self.desc_SET_ZERO_REFERENCE_POSITION))
			self.gcode.register_command('_CHECK_ACTIVE_BEACON_MODEL_TEMP', 
							   self.cmd_CHECK_ACTIVE_BEACON_MODEL_TEMP, 
							   desc=(self.desc_CHECK_ACTIVE_BEACON_MODEL_TEMP))
			self.gcode.register_command('_VALIDATE_COMPENSATION_MESH_PROFILE',
							   self.cmd_VALIDATE_COMPENSATION_MESH_PROFILE, 
							   desc=(self.desc_VALIDATE_COMPENSATION_MESH_PROFILE))
			self.gcode.register_command('_APPLY_RATOS_BED_MESH_PARAMETERS', 
							   self.cmd_APPLY_RATOS_BED_MESH_PARAMETERS, 
							   desc=(self.desc_APPLY_RATOS_BED_MESH_PARAMETERS))
			self.gcode.register_command('GET_RATOS_EXTENDED_BED_MESH_PARAMETERS',
							   self.cmd_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS, 
							   desc=(self.desc_GET_RATOS_EXTENDED_BED_MESH_PARAMETERS))

	desc_BEACON_MESH_INIT = "Performs Beacon mesh initialization tasks"
	def cmd_BEACON_MESH_INIT(self, gcmd):
		# Note: we don't do these things in _connect as console logging would not be visible
		if self.bed_mesh:
			# Load additional RatOS mesh params
			self.load_extra_mesh_params()
			# run klippers inompatible profile check which is never called by bed_mesh
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

		params = collections.OrderedDict({k: v for k,v in mesh.get_mesh_params().items() if str(k).startswith("ratos_")})
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
		subject = gcmd.get("SUBJECT", f"Profile '{profile}'")
		bed_temp = gcmd.get_float("COMPARE_BED_TEMP", None)
		bed_temp_is_error = gcmd.get("COMPARE_BED_TEMP_IS_ERROR", "false").strip().lower() in ("1", "true")

		# eg, caller can use BED_TEMP=-1 when bed temp should not be checked
		if bed_temp < 0:
			bed_temp = None

		if not self._validate_extended_parameters(
			self._get_compensation_zmesh(profile, subject).get_mesh_params(),
			title,
			subject,
			compare_bed_temp=bed_temp,
			compare_bed_temp_is_error=bed_temp_is_error,
			allowed_kinds=(RATOS_MESH_KIND_COMPENSATION,)):

			raise self.printer.command_error(f"{subject} is not a valid compensation mesh profile")

	desc_BEACON_APPLY_SCAN_COMPENSATION = "Compensates a beacon scan mesh with a beacon compensation mesh."
	def cmd_BEACON_APPLY_SCAN_COMPENSATION(self, gcmd):
		profile = gcmd.get('PROFILE', RATOS_DEFAULT_COMPENSATION_MESH_NAME)
		if not profile.strip():
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")
		
		if not self.apply_scan_compensation(self._get_compensation_zmesh(profile)):
			raise self.printer.command_error("Could not apply scan compensation")
		
	desc_CREATE_BEACON_COMPENSATION_MESH = "Creates the beacon compensation mesh by calibrating and diffing a contact and a scan mesh."
	def cmd_CREATE_BEACON_COMPENSATION_MESH(self, gcmd):
		profile = gcmd.get('PROFILE', RATOS_DEFAULT_COMPENSATION_MESH_NAME)
		probe_count = BedMesh.parse_gcmd_pair(gcmd, 'PROBE_COUNT', minval=3)
		if not profile.strip():
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")
		if not probe_count:
			raise gcmd.error("Value for parameter 'PROBE_COUNT' must be specified")
		self.create_compensation_mesh(profile, probe_count)

	desc_SET_ZERO_REFERENCE_POSITION = "Sets the zero reference position for the currently loaded bed mesh."
	def cmd_SET_ZERO_REFERENCE_POSITION(self, gcmd):
		if (self.bed_mesh.z_mesh is None):
			self.ratos.console_echo("Set zero reference position error", "error", 
				"No bed mesh loaded._N_Either generate a new bed mesh or load it via BED_MESH_PROFILE LOAD=\"[profile_name]\"")
			return
		
		x_pos = gcmd.get_float('X')
		y_pos = gcmd.get_float('Y')	
		
		self.ratos.debug_echo("SET_ZERO_REFERENCE_POSITION", f"X:{x_pos:.2f} Y:{y_pos:.2f}")

		org_mesh = self.bed_mesh.get_mesh()
		new_mesh = BedMesh.ZMesh(org_mesh.get_mesh_params(), org_mesh.get_profile_name())
		new_mesh.build_mesh(org_mesh.get_probed_matrix())
		new_mesh.set_zero_reference(x_pos, y_pos)
		self.bed_mesh.set_mesh(new_mesh)
		
		self.bed_mesh.pmgr.save_profile(new_mesh.get_profile_name())
		self.ratos.console_echo("Set zero reference position", "info", 
			f"Zero reference position saved for profile '{new_mesh.get_profile_name()}'")

	def _get_compensation_zmesh(self, profile, subject=None):
		if not profile:
			raise TypeError("Argument profile cannot be None")
		
		if subject is None:
			subject = f"Profile '{profile}'"
		
		profiles = self.bed_mesh.pmgr.get_profiles()
		if profile not in profiles:
			raise self.printer.command_error(f"{subject} not found for Beacon scan compensation")
		
		try:
			compensation_zmesh = BedMesh.ZMesh(profiles[profile]["mesh_params"], profile)
			compensation_zmesh.build_mesh(profiles[profile]["points"])
			return compensation_zmesh
		except Exception as e:
			raise self.printer.command_error(f"Could not load {subject[0].lower()}{subject[1:]} for Beacon scan compensation: {str(e)}") from e

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

		if not all(p in params for p in RATOS_MESH_PARAMETERS):
			missing = [p for p in RATOS_MESH_PARAMETERS if p not in params]
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

		if compare_bed_temp is not None and (compare_bed_temp < bed_temp - self.bed_temp_warning_margin or compare_bed_temp > bed_temp + self.bed_temp_warning_margin):
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
	def apply_scan_compensation(self, compensation_zmesh) -> bool:
		if not compensation_zmesh:
			raise TypeError("Argument compensation_zmesh cannot be None")
		
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

			compensation_mesh_params = compensation_zmesh.get_mesh_params()
			compensation_mesh_name = compensation_zmesh.get_profile_name()
			
			if not self._validate_extended_parameters(
				compensation_mesh_params,
				"Apply scan compensation",
				f"Specified compensation mesh '{compensation_mesh_name}'",
				compare_bed_temp=measured_mesh_params[RATOS_MESH_BED_TEMP_PARAMETER],
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
					self.ratos.debug_echo("Beacon scan compensation", "measured: %0.4f  compensation: %0.4f  new: %0.4f" % (measured_z, compensation_z, new_z))
					new_points[y].append(new_z)

			measured_zmesh.build_mesh(new_points)
			# NB: build_mesh does not replace or mutate its params, so no need to reassign measured_mesh_params.
			measured_mesh_params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_COMPENSATION
			self.bed_mesh.save_profile(measured_mesh_name)
			self.bed_mesh.set_mesh(measured_zmesh)

			self.ratos.console_echo("Beacon scan compensation", "debug", 
				f"Measured mesh '{measured_mesh_name}' compensated with compensation mesh '{compensation_mesh_name}'")
			
			return True
			
		except BedMesh.BedMeshError as e:
			self.ratos.console_echo(error_title, "error", str(e))
			return False

	def create_compensation_mesh(self, profile, probe_count):
		if not self.beacon:
			self.ratos.console_echo("Create compensation mesh error", "error", 
				"Beacon module not loaded._N_Make sure you've configured Beacon as your z probe.")
			return

		if self.z_tilt and not self.z_tilt.z_status.applied:
			self.ratos.console_echo("Create compensation mesh warning", "warning", 
				"Z-tilt levelling is configured but has not been applied._N_"
				"This may result in inaccurate compensation.")
		
		if self.qgl and not self.qgl.z_status.applied:
			self.ratos.console_echo("Create compensation mesh warning", "warning", 
				"Quad gantry levelling is configured but has not been applied._N_"
				"This may result in inaccurate compensation.")

		beacon_contact_calibrate_model_on_print = str(self.gm_ratos.variables['beacon_contact_calibrate_model_on_print']).lower() == 'true'

		# Go to safe home
		self.gcode.run_script_from_command("_MOVE_TO_SAFE_Z_HOME Z_HOP=True")

		if beacon_contact_calibrate_model_on_print:
			# Calibrate a fresh model
			self.gcode.run_script_from_command("BEACON_AUTO_CALIBRATE")
		else:
			if self.beacon.model is None:
				self.ratos.console_echo("Create compensation mesh error", "error", 
					"No active Beacon model is selected._N_Make sure you've performed initial Beacon calibration.")
				return

			self.check_active_beacon_model_temp(title="Create compensation mesh warning")
			
			self.gcode.run_script_from_command("BEACON_AUTO_CALIBRATE SKIP_MODEL_CREATION=1")

		# create contact mesh
		self.gcode.run_script_from_command(
			"BED_MESH_CALIBRATE PROBE_METHOD=contact SAMPLES=2 SAMPLES_DROP=1 SAMPLES_TOLERANCE_RETRIES=10 "
			"PROBE_COUNT=%d,%d PROFILE='%s'" % (probe_count[0], probe_count[1], RATOS_TEMP_CONTACT_MESH_NAME))

		# create temp scan mesh
		self.gcode.run_script_from_command(
			"BED_MESH_CALIBRATE METHOD=automatic USE_CONTACT_AREA=1 "
			"PROBE_COUNT=%d,%d PROFILE='%s'" % (probe_count[0], probe_count[1], RATOS_TEMP_SCAN_MESH_NAME))

		self.gcode.run_script_from_command("BED_MESH_PROFILE LOAD='%s'" % RATOS_TEMP_SCAN_MESH_NAME)
		scan_mesh_points = self.bed_mesh.pmgr.get_profiles()[RATOS_TEMP_SCAN_MESH_NAME]["points"]
		self.gcode.run_script_from_command("BED_MESH_PROFILE LOAD='%s'" % RATOS_TEMP_CONTACT_MESH_NAME)
		contact_mesh_points = self.bed_mesh.pmgr.get_profiles()[RATOS_TEMP_CONTACT_MESH_NAME]["points"]
		compensation_mesh_points = []

		try:

			for y in range(len(contact_mesh_points)):
				compensation_mesh_points.append([])
				for x in range(len(contact_mesh_points[0])):
					contact_z = contact_mesh_points[y][x]
					scan_z = scan_mesh_points[y][x]
					offset_z = contact_z - scan_z
					self.ratos.debug_echo("Create compensation mesh", 
						   "scan: %0.4f  contact: %0.4f  offset: %0.4f" % (scan_z, contact_z, offset_z))
					compensation_mesh_points[y].append(offset_z)

			# Create new mesh
			params = self.bed_mesh.z_mesh.get_mesh_params()
			params[RATOS_MESH_VERSION_PARAMETER] = RATOS_MESH_VERSION
			params[RATOS_MESH_BED_TEMP_PARAMETER] = self._get_nominal_bed_temp()
			params[RATOS_MESH_KIND_PARAMETER] = RATOS_MESH_KIND_COMPENSATION
			params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = RATOS_MESH_BEACON_PROBE_METHOD_PROXIMITY_AUTOMATIC
			new_mesh = BedMesh.ZMesh(params, profile)
			new_mesh.build_mesh(compensation_mesh_points)
			self.bed_mesh.set_mesh(new_mesh)
			self.bed_mesh.save_profile(profile)

			# Remove temp meshes
			self.gcode.run_script_from_command("BED_MESH_PROFILE REMOVE='%s'" % RATOS_TEMP_CONTACT_MESH_NAME)
			self.gcode.run_script_from_command("BED_MESH_PROFILE REMOVE='%s'" % RATOS_TEMP_SCAN_MESH_NAME)

			self.ratos.console_echo("Create compensation mesh", "debug", "Compensation Mesh %s created" % (str(profile)))
		except BedMesh.BedMeshError as e:
			self.ratos.console_echo("Create compensation mesh error", "error", str(e))
		
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
				except config.error as ex:
					self.ratos.console_echo("RatOS Beacon bed mesh management", "error",
								f"Bed mesh profile '{profile_name}' configuration is invalid: {str(ex)}")
					self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
					continue
				
				profile_params[RATOS_MESH_VERSION_PARAMETER] = version
				profile_params[RATOS_MESH_KIND_PARAMETER] = mesh_kind
				profile_params[RATOS_MESH_BEACON_PROBE_METHOD_PARAMETER] = mesh_probe_method
				profile_params[RATOS_MESH_BED_TEMP_PARAMETER] = mesh_bed_temp
			else:				
				self.ratos.console_echo("RatOS Beacon bed mesh management", "warning",
							f"Bed mesh profile '{profile_name}' was created without extended RatOS Beacon bed mesh support."
							if version is None else
							f"Bed mesh profile '{profile_name}' has version {version} which is not compatible with this version of RatOS.")
				self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
				continue


#####
# Loader
#####
def load_config(config):
	return BeaconMesh(config)