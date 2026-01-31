# Improve Beacon true zero consistency
#
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.

import os
import math, time, logging, socket
import numpy as np
from . import probe


# NOTE: Not tested with multi-beacon setup. The design seeks to pass through the SENSOR argument, so multi-beacon
#       *might* work, but this has not yet been tested.

BEACON_AUTO_CALIBRATE = 'BEACON_AUTO_CALIBRATE'
RATOS_TITLE = 'BEACON_AUTO_CALIBRATE Multi-point Probing'
OFFSET_NAME = 'true_zero_correction'

class BeaconTrueZeroCorrection:
	def __init__(self, config):
		self.config = config
		self.printer = config.get_printer()
		self.reactor = self.printer.get_reactor()
		self.gcode = self.printer.lookup_object('gcode')
		self.name = config.get_name()

		self.status = None
		self.ratos = None
		self.named_offsets = None
		self.toolhead = None
		self.dual_carriage = None
		self.orig_cmd = None

		#######
		# Config
		#######

		# Allow the true zero correction to be disabled. This is useful for testing and debugging, and as an escape hatch.
		self.disabled = config.getboolean('disabled', False)

		# z values greater than z_rejection_threshold are rejected. These typically correspond to early triggering
		# of beacon contact before the nozzle has touched the bed. From test data, these are rare. Only 0.028% of samples
		# exceeded 75um (from over 32,000 samples across multiple machines and print surfaces).
		self.z_rejection_threshold = config.getfloat('z_rejection_threshold', 0.075, minval=0.03)

		# z values lower than low_z_rejection_threshold are rejected. These have never been observed in testing, but this
		# parameter provides a safety net against unexpected behaviour. The default is -0.15mm, which would in theory
		# still leave a 50um margin against bed damage in the case of a 200um first layer height. One possible scenario
		# is where true zero occurs on intact PEI coating, but is then followed by probing on a damaged area with no
		# PEI coating, causing a significantly lower z value.
		self.low_z_rejection_threshold = config.getfloat('low_z_rejection_threshold', -0.15, maxval=0.0)

		# The number of times to probe an additional point if any z values are rejected.
		self.max_retries = config.getint('max_retries', 10, minval=0, maxval=15)

		# Controls the sampling strategy, notably affecting the number of points probed.
		# - Level 1: 6 points probed, 1 zero sample, use mean of 3 minimal samples. This is the default and recommended level.
		# - Level 2: 10 points probed, 1 zero sample, use mean of 3 minimal samples. This is a more robust probing strategy.
		# - Level 3: 12 points probed, 1 zero sample, use mean of 3 minimal samples. This is the most robust probing strategy.
		# From extensive testing, level 1 is very effective and efficient, with levels 2 and 3 offering only very modest gains
		# and diminishing returns.Levels 2 and 3 are included for diagnostic purposes, but level 1 is recommended for most users.
		# The zero sample is the implied zero sample from BEACON_AUTO_CALIBRATE, which is expected to have been invoked.
		self.sampling_strategy = config.getint('sampling_strategy', 1, minval=1, maxval=3)

		# If true, each of the multiple probe locations will itself be probed several times using
		# the standard beacon error detection logic. From extensive testing, this mode offers no benefit
		# and should not be used. It is included only as an option for diagnostic purposes.
		self.use_error_corrected_probing = config.getboolean('use_error_corrected_probing', False)

		if self.disabled:
			logging.info(f"{self.name}: beacon true zero correction is disabled by configuration.")
			return

		if config.has_section('beacon'):
			self.printer.register_event_handler("klippy:connect",
												self._handle_connect)
			self.printer.register_event_handler("homing:home_rails_end",
												self._handle_homing_move_end)
		else:
			logging.info(f"{self.name}: beacon is not configured, beacon true zero correction disabled.")

	def _handle_connect(self):
		self.ratos = self.printer.lookup_object('ratos')
		self.named_offsets = self.printer.lookup_object('named_offsets')
		self.toolhead = self.printer.lookup_object("toolhead")

		if self.config.has_section("dual_carriage"):
			self.dual_carriage = self.printer.lookup_object("dual_carriage", None)

		self.orig_cmd = self.gcode.register_command(BEACON_AUTO_CALIBRATE, None)
		if self.orig_cmd is None:
			raise self.printer.config_error(f"{BEACON_AUTO_CALIBRATE} command is not registered, {self.name} cannot be enabled. Ensure that [beacon] occurs before [{self.name}] in the configuration.")

		self.gcode.register_command(
			BEACON_AUTO_CALIBRATE,
			self.cmd_BEACON_AUTO_CALIBRATE,
			desc=self.desc_BEACON_AUTO_CALIBRATE)

		self.gcode.register_command(
			'_BEACON_TRUE_ZERO_CORRECTION_DIAGNOSTICS',
			self.cmd_BEACON_TRUE_ZERO_CORRECTION_DIAGNOSTICS,
			desc=self.desc_BEACON_TRUE_ZERO_CORRECTION_DIAGNOSTICS)

	def _handle_homing_move_end(self, homing_state, rails):
		# Clear the true zero correction offset if the Z axis is homed.
		# Any existing true zero correction is invalidated when z is re-homed.
		if 2 in homing_state.get_axes():
			self.named_offsets.reset(OFFSET_NAME)

	######
	# Commands
	######
	desc_BEACON_AUTO_CALIBRATE = "Automatically calibrates the Beacon probe. Extended with RatOS multi-point probing for improved true zero consistency. Use SKIP_MULTIPOINT_PROBING=1 to bypass."
	def cmd_BEACON_AUTO_CALIBRATE(self, gcmd):
		# Clear existing offset
		self.named_offsets.reset(OFFSET_NAME)

		skip = gcmd.get('SKIP_MULTIPOINT_PROBING', '').lower() in ('1', 'true', 'yes')
		if skip:
			return self.orig_cmd(gcmd)

		zero_xy = self.toolhead.get_position()[:2]
		retval = self.orig_cmd(gcmd)
		self._check_homed()
		ps = ProbingSession(self, gcmd, zero_xy)
		ps.run()

		return retval

	desc_BEACON_TRUE_ZERO_CORRECTION_DIAGNOSTICS = "For developer use only. This command is used to run diagnostics on the Beacon true zero correction system."
	def cmd_BEACON_TRUE_ZERO_CORRECTION_DIAGNOSTICS(self, gcmd):
		action = gcmd.get('ACTION', '').lower()
		if action == 'capture':
			point_count = gcmd.get_int('POINT_COUNT', 21, minval=1)
			mpp_per_batch = gcmd.get_int('MPP_PER_BATCH', 20, minval=1)
			batch_count = gcmd.get_int('BATCH_COUNT', 5, minval=1)
			samples = gcmd.get_int('SAMPLES', 1, minval=1)
			samples_drop = gcmd.get_int('SAMPLES_DROP', 0, minval=0)
			samples_tolerance_retries = gcmd.get_int('SAMPLES_TOLERANCE_RETRIES', 10, minval=0)

			nozzle_tip_dia = self._get_nozzle_tip_diameter()

			# Calculate the nozzle-based min span as the length of the side of a
			# square with area four times the footprint of COUNT nozzle tips.
			span = math.sqrt(math.pi * (nozzle_tip_dia/2)**2 * point_count * 4.)
			half_span = span / 2

			self.gcode.run_script_from_command("M84\nG28\nBEACON_AUTO_CALIBRATE SKIP_MULTIPOINT_PROBING=1\nZ_TILT_ADJUST\n_MOVE_TO_SAFE_Z_HOME Z_HOP=1")

			zero_xy_position = self.toolhead.get_position()[:2]

			range_x = (zero_xy_position[0] - half_span, zero_xy_position[0] + half_span)
			range_y = (zero_xy_position[1] - half_span, zero_xy_position[1] + half_span)

			self._validate_probing_region(range_x, range_y, span)

			probe_args = dict(
				PROBE_METHOD='contact',
				SAMPLES=str(samples),
				SAMPLES_DROP=str(samples_drop),
				SAMPLES_TOLERANCE_RETRIES=str(samples_tolerance_retries)
			)

			sensor = gcmd.get('SENSOR', None)
			if sensor:
				probe_args['SENSOR'] = sensor

			probe_gcmd = self.gcode.create_gcode_command(
				gcmd.get_command(),
				gcmd.get_command()
					+ "".join(" " + k + "=" + v for k, v in probe_args.items()),
				probe_args
			)

			timestamp = time.strftime("%Y%m%d_%H%M%S")
			config_file = self.printer.get_start_args()['config_file']
			config_dir = os.path.dirname(config_file)
			filename = os.path.join(config_dir, f'mpp_capture_{timestamp}.csv')

			gcmd.respond_info(f"Capturing diagnostic data to {filename}...")

			with open(filename, 'a') as f:
				f.write(f"# Beacon True Zero Correction Multi-point Probing Capture at {timestamp} on {socket.gethostname()}\n")
				f.write(f"# Point Count: {point_count}, MPP per Batch: {mpp_per_batch}, Batch Count: {batch_count}\n")
				f.write(f"# Samples: {samples}, Samples Drop: {samples_drop}, Samples Tolerance Retries: {samples_tolerance_retries}\n")
				f.write(f"# Nozzle Tip Diameter: {nozzle_tip_dia:.3f}mm, Span: {span:.3f}mm\n")
				f.write(f"# Zero XY Position: {zero_xy_position[0]:.3f}, {zero_xy_position[1]:.3f}\n")
				f.write(f"# Range X: {range_x[0]:.3f} to {range_x[1]:.3f}, Range Y: {range_y[0]:.3f} to {range_y[1]:.3f}\n")

				def cb(_, positions):
					f.write(','.join(str(p[2]) for p in positions) + '\n')
					f.flush()
					return 'done'

				probe_helper = probe.ProbePointsHelper(self.config, cb, [])

				for batch_index in range(batch_count):
					gcmd.respond_info(f"Batch {batch_index + 1} of {batch_count}")
					self.gcode.run_script_from_command("M84\nG28\nBEACON_AUTO_CALIBRATE SKIP_MULTIPOINT_PROBING=1 SKIP_MODEL_CREATION=1")
					for mpp_index in range(mpp_per_batch):
						gcmd.respond_info(f"Batch {batch_index + 1} of {batch_count}, run {mpp_index + 1} of {mpp_per_batch}")
						self.gcode.run_script_from_command("_MOVE_TO_SAFE_Z_HOME Z_HOP=1")
						points = self._generate_points(point_count, range_x, range_y, nozzle_tip_dia)
						probe_helper.update_probe_points(points, len(points))
						probe_helper.start_probe(probe_gcmd)

			gcmd.respond_info(f"Capture complete, data saved to {filename}")
		else:
			raise self.gcode.error(f"Unknown action.")

	######
	# Helper methods
	######
	def _check_homed(self, msg = 'Must home all axes first'):
		status = self.toolhead.get_status(self.reactor.monotonic())
		homed_axes = status["homed_axes"]
		if any(axis not in homed_axes for axis in "xyz"):
			raise self.gcode.error( msg )

	def _generate_points(self, n, x_lim, y_lim, min_dist, avoid_centre=True, max_iter=1000):
		points = []
		centre = [np.mean(x_lim), np.mean(y_lim)]
		iterations = 0

		while len(points) < n and iterations < max_iter:
			# Generate a candidate point uniformly within the given x and y limits.
			candidate = np.array([np.random.uniform(x_lim[0], x_lim[1]),
								np.random.uniform(y_lim[0], y_lim[1])])

			# Check that candidate is at least min_dist away from every existing point.
			if ((not avoid_centre) or np.linalg.norm(candidate - centre) >= min_dist) \
				and all(np.linalg.norm(candidate - p) >= min_dist for p in points):
					points.append(candidate.tolist()) # don't leak numpy types

			iterations += 1

		if len(points) < n:
			raise self.gcode.error(
				"Could not generate all required probe points within the specified iteration limit. "
				"The conditions are too strict.")

		return points

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

	def _prepare_probe_command(self, gcmd):
		probe_args = dict(
			PROBE_METHOD='contact',
			SAMPLES='1',
			SAMPLES_DROP='0'
		) if not self.use_error_corrected_probing else dict(
			PROBE_METHOD='contact',
			SAMPLES='3',
			SAMPLES_DROP='1',
			SAMPLES_TOLERANCE_RETRIES='10'
		)

		sensor = gcmd.get('SENSOR', None)
		if sensor:
			probe_args['SENSOR'] = sensor

		return self.gcode.create_gcode_command(
			gcmd.get_command(),
			gcmd.get_command()
				+ "".join(" " + k + "=" + v for k, v in probe_args.items()),
			probe_args
		)

	def _validate_probing_region(self, range_x, range_y, span):
		r = self.ratos.get_beacon_probing_regions()

		if r is None:
			# This should not be possible, as this code should only be called when beacon and bed_mesh are present.
			raise self.gcode.error('get_beacon_probing_regions() unexpectedly returned None, this should not be possible.')

		probable_x = (r.mesh_contact_min[0], r.mesh_contact_max[0])
		probable_y = (r.mesh_contact_min[1], r.mesh_contact_max[1])

		def in_range(r, value):
			return r[0] <= value <= r[1]

		if not (
			in_range(probable_x, range_x[0]) and in_range(probable_x, range_x[1]) and
			in_range(probable_y, range_y[0]) and in_range(probable_y, range_y[1])):

			self.ratos.console_echo(RATOS_TITLE, 'error', f'The required probing region ({span:.1f}x{span:.1f}) would probe outside the configured contact probing area.')
			raise self.gcode.error('The required probing region would probe outside the contact probing area')

class ProbingSession:

	def __init__(self, tzc:BeaconTrueZeroCorrection, gcmd, zero_xy_position):
		self.gcmd = gcmd
		self.tzc = tzc
		self.zero_xy_position = zero_xy_position
		self.max_retries = tzc.max_retries
		self.retries = 0
		self.probe_helper = probe.ProbePointsHelper(self.tzc.config, self._probe_finalize, [])
		self._finalize_result = None
		self._has_run = False
		self._points = None
		self._next_points_index = 0

		# NOTE: The following values are hard-coded for now, but could be made configurable in the future.

		# The take-7-drop-4-max approach was determined from extensive testing, with a wide range of
		# print surfaces and printers. Statistical analysis of the data shows that this approach
		# provides a significantly-enhanced level of confidence that the true zero correction is
		# accurate and has significantly increased immunity to local location-dependent variation
		# in probe results.

		# Number of samples to take, including the implied zero sample from BEACON_AUTO_CALIBRATE
		self._take = (7, 11, 13)[tzc.sampling_strategy - 1]

		# Number of minimal samples to use in the final calculation.
		self._keep = 3

		# The zero-value initial sample is implied from BEACON_AUTO_CALIBRATE, which is expected to have
		# been invoked immediatley prior to this command, at the same location.
		self._samples = [0.]

	def run(self):
		if self._has_run:
			raise Exception("ProbingSession has already been run, and cannot be run more than once.")
		self._has_run = True

		num_points_to_generate = self._take - len(self._samples) + self.max_retries
		min_span = 9.

		nozzle_tip_dia = self.tzc._get_nozzle_tip_diameter()

		# Calculate the nozzle-based min span as the length of the side of a square with area four times
		# the footprint of COUNT nozzle tips.
		#
		# As an indicative maximum span for mainstream nozzles, a 1.2mm nozzle with 13 points and 15 retries
		# would have a minimum span of 23.9 mm. As nozzle diameters increase, so the typical first layer height
		# will increase. There will likely be a point where using true zero correction no longer makes sense,
		# as any error would be absorbed comfortably by the first layer height. For reference, something like
		# a GammaMaster 2.4mm nozzle with 13 points and 15 retries would have a minimum span of 35.2mm.

		nozzle_based_min_span = math.sqrt(math.pi * (nozzle_tip_dia/2)**2 * num_points_to_generate * 4.)
		span = max(min_span, nozzle_based_min_span)
		half_span = span / 2.

		logging.info(f"{self.tzc.name}: count: {num_points_to_generate}  min_span: {min_span}  nozzle_tip_dia: {nozzle_tip_dia:.3f}  nozzle_based_min_span: {nozzle_based_min_span:.2f}  use_span: {span:.2f}")

		# Calculate probing region
		range_x = (self.zero_xy_position[0] - half_span, self.zero_xy_position[0] + half_span)
		range_y = (self.zero_xy_position[1] - half_span, self.zero_xy_position[1] + half_span)

		self.tzc._validate_probing_region(range_x, range_y, span)

		probe_gcmd = self.tzc._prepare_probe_command(self.gcmd)

		self._points = self.tzc._generate_points(num_points_to_generate, range_x, range_y, nozzle_tip_dia)
		self._next_points_index = self._take - len(self._samples)
		self.probe_helper.update_probe_points(self._points[:self._next_points_index], 1)
		self.probe_helper.start_probe(probe_gcmd)

		self._finalize()

	def _finalize(self):
		if self._finalize_result == 'retry':
			self.tzc.ratos.console_echo(
				RATOS_TITLE,
				'error',
				'One or more z values were out of range, maximum retries exceeded.')
			raise self.gcmd.error('One or more z values were out of range, maximum retries exceeded.')
		elif isinstance(self._finalize_result, float):
			if self._finalize_result < -0.2:
				# Sanity check to reduce the risk of bed damage
				self.tzc.ratos.console_echo(
					RATOS_TITLE,
					'error',
					f'The measured true zero correction {self._finalize_result:.6f} is below the safety limit of -0.2mm._N_This is not expected behaviour.')
				raise self.gcmd.error('Measured correction is below safety limit')
			logging.info(f'{self.tzc.name}: applying correction {self._finalize_result:.6f}')
			self.gcmd.respond_info(f'Applying true zero correction of {self._finalize_result*1000.:.1f} µm')
			self.tzc.named_offsets.set(OFFSET_NAME, z=self._finalize_result)
		else:
			raise ValueError('Internal error: unexpected value for _finalize_result')

	def _probe_finalize(self, _, positions):
		zvals = [p[2] for p in positions]
		logging.info(f'{self.tzc.name}: probed z-values: {", ".join(f"{z:.6f}" for z in zvals)}')
		good = [z for z in zvals if z < self.tzc.z_rejection_threshold and z > self.tzc.low_z_rejection_threshold]
		self._samples.extend(good)
		if len(self._samples) == self._take:
			# Gathered enough good samples
			self._samples.sort()
			use_samples = self._samples[:self._keep]
			logging.info(f'{self.tzc.name}: samples: {", ".join(f"{z:.6f}" for z in self._samples)}  using: {", ".join(f"{z:.6f}" for z in use_samples)}')
			self._finalize_result = float(np.mean(use_samples))
			return 'done'

		rejects = [z for z in zvals if z >= self.tzc.z_rejection_threshold or z <= self.tzc.low_z_rejection_threshold]
		logging.info(f'{self.tzc.name}: rejected z-values: {", ".join(f"{z:.6f}" for z in rejects)}')

		if self._next_points_index + len(rejects) <= len(self._points):
			self.retries += 1
			self.gcmd.respond_info(f'{len(rejects)} z value(s) were out of range, probing additional point(s)')
			logging.info(f'{self.tzc.name}: will probe additional {len(rejects)}')
			self.probe_helper.update_probe_points(self._points[self._next_points_index:self._next_points_index + len(rejects)], 1)
			self._next_points_index += len(rejects)
			return 'retry'

		self.gcmd.respond_info(f'{len(rejects)} z value(s) were out of range, exceeding the number of available retry points.')
		self._finalize_result = 'retry'
		return 'done'

# Register the configuration
def load_config(config):
	return BeaconTrueZeroCorrection(config)