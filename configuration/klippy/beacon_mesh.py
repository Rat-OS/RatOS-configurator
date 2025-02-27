import logging, collections
from . import bed_mesh as BedMesh

###
# Mesh constants
###
RATOS_TEMP_SCAN_MESH_NAME = "__BEACON_TEMP_SCAN_MESH__"
RATOS_TEMP_CONTACT_MESH_NAME = "__BEACON_TEMP_CONTACT_MESH__"
RATOS_DEFAULT_COMPENSATION_MESH_NAME = "Beacon Compensation Mesh"
RATOS_MESH_VERSION = 1
RATOS_MESH_PROFILE_OPTIONS = {
	"ratos_mesh_version": int,
	"beacon_model_temp": float,
	"beacon_model_name": str
}


#####
# Beacon Mesh
#####

class BeaconMesh:

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
		self.bed_mesh = None

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
		if self.config.has_section("bed_mesh"):
			self.bed_mesh = self.printer.lookup_object('bed_mesh')
			# Load additional RatOS mesh params
			self.load_extra_mesh_params()
			# run klippers inompatible profile check which is never called by bed_mesh
			self.bed_mesh.pmgr._check_incompatible_profiles()
		if self.config.has_section("beacon"):
			self.beacon = self.printer.lookup_object('beacon')

	#####
	# Gcode commands
	#####
	def register_commands(self):
		if self.config.has_section("beacon"):
			self.gcode.register_command('BEACON_APPLY_SCAN_COMPENSATION', 
							   self.cmd_BEACON_APPLY_SCAN_COMPENSATION, 
							   desc=(self.desc_BEACON_APPLY_SCAN_COMPENSATION))
			self.gcode.register_command('CREATE_BEACON_COMPENSATION_MESH', 
							   self.cmd_CREATE_BEACON_COMPENSATION_MESH, 
							   desc=(self.desc_CREATE_BEACON_COMPENSATION_MESH))
			self.gcode.register_command('SET_ZERO_REFERENCE_POSITION', 
							   self.cmd_SET_ZERO_REFERENCE_POSITION, 
							   desc=(self.desc_SET_ZERO_REFERENCE_POSITION))

	desc_BEACON_APPLY_SCAN_COMPENSATION = "Compensates a beacon scan mesh with a beacon compensation mesh."
	def cmd_BEACON_APPLY_SCAN_COMPENSATION(self, gcmd):
		profile = gcmd.get('PROFILE', RATOS_DEFAULT_COMPENSATION_MESH_NAME)
		if not profile.strip():
			raise gcmd.error("Value for parameter 'PROFILE' must be specified")
		
		profiles = self.bed_mesh.pmgr.get_profiles()
		if profile not in profiles:
			raise self.printer.command_error("Profile " + str(profile) + " not found for Beacon scan compensation")
		
		self.offset_mesh = BedMesh.ZMesh(profiles[profile]["mesh_params"], profile)
		
		try:
			self.offset_mesh.build_mesh(profiles[profile]["points"])
		except BedMesh.BedMeshError as e:
			raise self.gcode.error(str(e))
		
		if not self.offset_mesh:
			raise self.printer.command_error("Could not load profile " + str(profile) + " for Beacon scan compensation")
		
		self.apply_scan_compensation(profile)

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
		
		x_pos = gcmd.get('X', 0.0)
		y_pos = gcmd.get('Y', 0.0)
		save_profile = gcmd.get('SAVE_PROFILE', False)
		
		
		org_mesh = self.bed_mesh.get_mesh()
		new_mesh = BedMesh.ZMesh(org_mesh.get_mesh_params(), org_mesh.get_profile_name())
		new_mesh.build_mesh(org_mesh.get_mesh_matrix())
		new_mesh.set_zero_reference(x_pos, y_pos)
		self.bed_mesh.set_mesh(new_mesh)
		
		if save_profile:
			self.bed_mesh.pmgr.save_profile(new_mesh.get_profile_name())
			self.ratos.console_echo("Set zero reference position", "info", 
				"Zero reference position saved for profile %s" % (str(new_mesh.get_profile_name())))
		else:
			self.ratos.console_echo("Set zero reference position", "info", 
				"Zero reference position set for profile %s" % (str(new_mesh.get_profile_name())))

	#####
	# Beacon Scan Compensation
	#####
	def apply_scan_compensation(self, profile):
		if not self.bed_mesh.z_mesh:
			self.ratos.console_echo("Apply scan compensation error", "error", 
				"No scan mesh loaded._N_Either generate a new bed mesh or load it via BED_MESH_PROFILE LOAD=\"[profile_name]\"")
			return
		
		if not self.offset_mesh:
			self.ratos.console_echo("Apply scan compensation error", "error", 
				"No scan compensation mesh loaded.")
			return
		
		offset_mesh_params = self.offset_mesh.get_mesh_params()
		
		if "ratos_mesh_version" not in offset_mesh_params:
			self.ratos.console_echo("Apply scan compensation error", "error", 
				"Compensation mesh is missing version information.")
			return
		
		if offset_mesh_params["ratos_mesh_version"] != RATOS_MESH_VERSION:
			self.ratos.console_echo("Apply scan compensation error", "error", 
				"Compensation mesh is not compatible with this version of RatOS.")
			return

		if "beacon_model_name" not in offset_mesh_params:
			self.ratos.console_echo("Apply scan compensation error", "warning", 
				"Compensation mesh is missing beacon model information._N_"
				"This may result in inaccurate compensation.")
		elif offset_mesh_params["beacon_model_name"] != self.beacon.model.name:
			self.ratos.console_echo("Apply scan compensation error", "warning", 
				"Compensation mesh is calibrated for a different beacon model than the one currently loaded._N_"
				"This may result in inaccurate compensation.")

		if "beacon_model_temp" not in offset_mesh_params:
			self.ratos.console_echo("Apply scan compensation error", "warning", 
				"Compensation mesh is missing temperature calibration information._N_"
				"This may result in inaccurate compensation.")
		elif offset_mesh_params["beacon_model_temp"] > self.beacon.model.temp + 2.5 or offset_mesh_params["beacon_model_temp"] < self.beacon.model.temp - 2.5:
			self.ratos.console_echo("Apply scan compensation error", "warning", 
				"Compensation mesh is calibrated for a temperature that is %0.2fC different than the one currently loaded._N_"
				"This may result in inaccurate compensation." % (abs(offset_mesh_params["beacon_model_temp"] - self.beacon.model.temp)))
		
		try:
			profile_name = self.bed_mesh.z_mesh.get_profile_name()
			if profile_name == profile:
				self.ratos.console_echo("Beacon scan compensation error", "error", 
					"Compensation profile name %s is the same as the scan profile name %s" % (str(profile), str(profile_name)))
				return

			points = self.bed_mesh.pmgr.get_profiles()[profile_name]["points"]
			params = self.bed_mesh.z_mesh.get_mesh_params()
			x_step = ((params["max_x"] - params["min_x"]) / (len(points[0]) - 1))
			y_step = ((params["max_y"] - params["min_y"]) / (len(points) - 1))
			new_points = []

			self.ratos.debug_echo("Beacon scan compensation", "scan mesh: %s" % (str(profile_name)))
			self.ratos.debug_echo("Beacon scan compensation", "offset mesh: %s" % (str(profile)))

			for y in range(len(points)):
				new_points.append([])
				for x in range(len(points[0])):
					x_pos = params["min_x"] + x * x_step
					y_pos = params["min_y"] + y * y_step
					scan_z = points[y][x]
					offset_z = self.offset_mesh.calc_z(x_pos, y_pos)
					new_z = scan_z + offset_z
					self.ratos.debug_echo("Beacon scan compensation", "scan: %0.4f  offset: %0.4f  new: %0.4f" % (scan_z, offset_z, new_z))
					new_points[y].append(new_z)

			self.bed_mesh.z_mesh.build_mesh(new_points)
			self.bed_mesh.save_profile(profile_name)
			self.bed_mesh.set_mesh(self.bed_mesh.z_mesh)

			self.ratos.console_echo("Beacon scan compensation", "debug", 
				"Mesh scan profile %s compensated with contact profile %s" % (str(profile_name), str(profile)))
			
		except BedMesh.BedMeshError as e:
			self.ratos.console_echo("Beacon scan compensation error", "error", str(e))

	def create_compensation_mesh(self, profile, probe_count):
		if not self.bed_mesh.z_mesh:
			self.ratos.console_echo("Create compensation mesh error", "error", 
				"No scan mesh loaded._N_Either generate a new bed mesh or load it via BED_MESH_PROFILE LOAD=[profile_name]")
			return
		if not self.beacon:
			self.ratos.console_echo("Create compensation mesh error", "error", 
				"Beacon module not loaded._N_Make sure you've configured Beacon as your z probe.")
			return

		# Calibrate a fresh model
		self.gcode.run_script_from_command("BEACON_AUTO_CALIBRATE")

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

			# Get the beacon model
			beacon_model = self.beacon.model

			# Create new mesh
			params = self.bed_mesh.z_mesh.get_mesh_params()
			params["ratos_mesh_version"] = RATOS_MESH_VERSION
			params["beacon_model_temp"] = beacon_model.temp
			params["beacon_model_name"] = beacon_model.name
			new_mesh = BedMesh.ZMesh(self.bed_mesh.z_mesh.get_mesh_params(), profile)
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
		modified_profiles = {}
		
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
				
			# Load the extra parameters from config
			for key, t in RATOS_MESH_PROFILE_OPTIONS.items():
				try:
					if t is int:
						profile_params[key] = config.getint(key)
					elif t is float:
						profile_params[key] = config.getfloat(key)
					elif t is str:
						profile_params[key] = config.get(key)
				except Exception:
					# Skip parameters that don't exist in the config
					self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
					continue
			
			# Check for version compatibility
			try:
				ratos_mesh_version = profile_params.get('ratos_mesh_version')
				if ratos_mesh_version is not None and ratos_mesh_version != RATOS_MESH_VERSION:
					logging.info(
						"beacon_mesh: Profile [%s] is not compatible with this version of RatOS.\n"
						"Profile Version: %d\nCurrent Version: %d "
						% (profile_name, ratos_mesh_version, RATOS_MESH_VERSION))
					self.bed_mesh.pmgr.incompatible_profiles.append(profile_name)
					continue
			except Exception:
				# If we can't determine version compatibility, continue anyway
				pass
				
			modified_profiles[profile_name] = profile
			
		return modified_profiles

#####
# Loader
#####
def load_config(config):
	return BeaconMesh(config)