# Adaptive heat soak with thermal stability detection using Beacon proximity sensor data
#
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.

import time, logging, os, multiprocessing, traceback, pygam
import numpy as np
from .ratos import BackgroundDisplayStatusProgressHandler

class ThresholdPredictor:
	def __init__(self, printer):
		self.printer = printer
		self.reactor = printer.get_reactor()

	def predict_threshold(self, maximum_z_change_microns, period_seconds):
		'''
		Given the specified maximum amount of Z change that should be allowed during the specified
		period after the soak completes, predict the threshold value that should be used for the soak.

		The period is typically closely related to the first layer duration. The maximum Z change
		is typically associated with the amount of oversquish that is acceptable during the first layer.

		Parameters:
			maximum_z_change_microns: The maximum Z change allowed during the period after the
				soak completes, in microns.
			period_seconds: The time period in seconds after the soak completes, in seconds.
		Returns:
			The predicted adaptive heat soak threshold in nanometers per second.
		'''

		# Note: The implementation assumes that the method is called infrequently, and speed is not critical.
		# Computation is performed in a separate process, and the implementation is reactor-friendly.
		# Resources are released between calls to this method. At the time of writing, typical prediction
		# time is under 1s on a Raspberry Pi 4B, which is acceptable for the use case.

		parent_conn, child_conn = multiprocessing.Pipe()

		def do():
			try:
				child_conn.send(
					(False, self._do_predict_threshold(maximum_z_change_microns, period_seconds))
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
			raise self.printer.command_error("Error predicting adaptive heat soak threshold: %s" % (result,))
		else:
			return result

	def _do_predict_threshold(self, z, p):
		gam = self._get_model()
		z = float(z)
		p = float(p)
		X = np.array([[p, z, z / p, 1.0 / p]])
		prediction = gam.predict(X)
		if prediction.size == 0:
			raise LookupError("Prediction failed, no data available in the model.")
		t = float(prediction[0])

		# Ensure a minimum threshold of 12.5. From experimental data, we observe that thresholds
		# below this number approach the noise floor of the system and are not useful.
		t = max(t, 12.5)
		return t

	def _load_training_data(self):
		# The training data was derived from experimental data measured on multiple V-Core 4 machines.
		# It predicts z rate thresholds that have been evaluated as suitable for V-Core 4 300, 400 and 500 printers
		# with the stock aluminium extrusion and steel linear rail gantry, and also with limited evaluation
		# for steel and titanium box-section tube gantries.

		path = os.path.join(
			os.path.dirname(os.path.realpath(__file__)),
			'beacon_adaptive_heat_soak_model_training.csv')

		if not os.path.exists(path):
			raise FileNotFoundError(f"Beacon adaptive heat soak model training data file not found: {path}")

		try:
			data = np.genfromtxt(path, delimiter=',', names=True)
		except Exception as e:
			raise Exception(f"Failed to load model training data: {e}") from e

		return data

	def _get_model(self):
		# We train the model on demand rather the relying on a cached pickled model file.
		# This approach is somewhat inefficient but adequate for the current use case, and avoids
		# the challenges of robust and reliable pickling and unpickling the model as regards
		# package updates and changes to the model.

		data = self._load_training_data()

		Xp = data['period']  		# Period
		Xz = data['max_z_change']  	# Max Z Change
		y = data['threshold']  		# Threshold

		# Add additional columns to X to support additional smoothing terms in the GAM
		X = np.column_stack([
			Xp,  # Period
			Xz,  # Max Z Change
			Xz / Xp,  # rate
			1.0 / Xp,  # inverse period
		])

		gam = pygam.LinearGAM(
			pygam.s(0, n_splines=20)
			+ pygam.s(1, n_splines=20)
			+ pygam.te(0, 1, n_splines=[10,10])
			+ pygam.s(2, n_splines=20) 	# smooth on z/p
			+ pygam.s(3, n_splines=20), # smooth on 1/p
			tol=1e-6,
			lam=0.6,
			spline_order=3,
			fit_intercept=True)

		gam.fit(X, y)
		return gam

class BeaconZRateSession:
	def __init__(self, config, beacon, samples_per_mean=1000, window_size=30, window_step=1):
		self.config = config
		self.name = config.get_name()
		self.printer = config.get_printer()
		self.gcode = self.printer.lookup_object('gcode')
		self.reactor = self.printer.get_reactor()
		self.beacon = beacon
		self.samples_per_mean = samples_per_mean
		self.window_size = window_size
		self.window_step = window_step

		self._mean_distances = []
		self._times = []
		self._sample_buffer = np.zeros(samples_per_mean, dtype=np.float64)
		self._step_phase = window_step - window_size # Ensure that phase will be 0 after populating the initial window_size means

	def get_estimated_delay_for_first_z_rate(self, beacon_sampling_rate=1000.0):
		return self.window_size * (self.samples_per_mean / beacon_sampling_rate)

	def _get_next_mean(self):

		first_sample_time = None
		last_sample_time = None
		bad_sample_count = 0
		i = 0

		def cb(s):
			nonlocal i, bad_sample_count, first_sample_time, last_sample_time
			if i < self.samples_per_mean:
				dist = s["dist"]
				if dist is None or np.isinf(dist) or np.isnan(dist):
					bad_sample_count += 1
				else:
					self._sample_buffer[i] = dist
					if i == 0:
						first_sample_time = s["time"]

					i += 1

					if i == self.samples_per_mean:
						last_sample_time = s["time"]

		with self.beacon.streaming_session(cb):
			eventtime = self.reactor.monotonic()
			while i < self.samples_per_mean:
				if self.printer.is_shutdown():
					raise self.printer.command_error(f"{self.name}: Printer is shutting down")
				eventtime = self.reactor.pause(eventtime + 0.1)
				if bad_sample_count > 100:
					# Not expected. Could be that thermal deflection moved the beacon out of range (too close or too far from the bed).
					# We've not seen this happen in practice, but we handle it gracefully just in case.
					raise self.printer.command_error(f"{self.name}: Unexpected error: Beacon failed to measure a valid distance for {bad_sample_count} out of {bad_sample_count + i} samples.")

		if bad_sample_count > 0:
			logging.warning(f"{self.name}: {bad_sample_count} out of {bad_sample_count + i} samples were invalid.")

		self._step_phase = (self._step_phase + 1) % self.window_step

		# Beacon samples are approximately evenly spaced, so we can use the first and last sample times to calculate the mean time.
		mean_time = (first_sample_time + last_sample_time) / 2
		return (mean_time, np.mean(self._sample_buffer))

	def get_next_z_rate(self):
		while True:
			if len(self._mean_distances) == self.window_size:
				self._mean_distances.pop(0)
				self._times.pop(0)

			# The first call to get_next_z_rate will fill the means list with initial values,
			# subsequent calls will use the sliding window approach.
			while len(self._mean_distances) < self.window_size:
				time, mean = self._get_next_mean()
				self._mean_distances.append(mean)
				self._times.append(time)

			if self._step_phase == 0:
				break

		# Fit a 1-degree polynomial (line) to the data
		slope, intersect = np.polyfit(self._times, self._mean_distances, 1)

		mid_time = (self._times[0] + self._times[-1]) / 2.

		# Get the z value at the mid time
		mid_z = slope * mid_time + intersect

		# Convert from millimeters to nanometers per second
		slope_nm_per_sec = slope * 1e6

		return (mid_time, slope_nm_per_sec, mid_z)

class RunningAverage:
	# A running average implementation that maintains a circular buffer of the last `size` values,
	# and the current sum of the values in the buffer. Methods are provided to add a new value,
	# get the current average, and reset the buffer. The mean is updated efficiently by subtracting the
	# oldest value and adding the new value, rather than recalculating the mean from scratch.

	def __init__(self, size):
		if size <= 0:
			raise ValueError("Size must be greater than 0")
		self.size = size
		self.buffer = np.zeros(size, dtype=np.float64)
		self.index = 0
		self.sum = 0.0
		self.count = 0

	def get_average(self):
		if self.count == 0:
			return 0.0
		return float(self.sum / self.count)

	def is_full(self):
		return self.count == self.size

	def add(self, value):
		if self.count < self.size:
			self.count += 1
		else:
			self.sum -= self.buffer[self.index]
		self.buffer[self.index] = value
		self.sum += value
		self.index = (self.index + 1) % self.size

	def reset(self):
		self.buffer.fill(0.0)
		self.index = 0
		self.sum = 0.0
		self.count = 0

class BeaconAdaptiveHeatSoak:
	def __init__(self, config):
		self.config = config
		self.name = config.get_name()
		self.printer = config.get_printer()
		self.reactor = self.printer.get_reactor()
		self.gcode = self.printer.lookup_object('gcode')

		# Configuration values

		# The default layer quality for adaptive heat soak, which is used in conjunction with maximum_first_layer_duration
		# to determine the z rate threshold for thermal stability. The greater the quality value, the less oversquish is tolerated.
		# 1 = rough, 2 = draft, 3 = normal, 4 = high, 5 = maximum
		self.def_layer_quality = config.getint('default_layer_quality', 3, minval=1, maxval=5)

		# The default maximum first layer duration in seconds, which is used in conjunction with layer_quality to determine
		# the z rate threshold for thermal stability.
		self.def_maximum_first_layer_duration = config.getint('default_maximum_first_layer_duration', 1800, minval=60, maxval=7200)

		# The default maximum wait time in seconds for the printer to reach thermal stability.
		self.def_maximum_wait = config.getint('default_maximum_wait', 5400, minval=0)

		# The default minimum wait time in seconds for the printer to reach thermal stability.
		self.def_minimum_wait = config.getint('default_minimum_wait', 0, minval=0)

		# TODO: Make trend checks configurable.

		# Setup
		self.beacon = None

		# Register commands
		self.gcode.register_command(
			'BEACON_WAIT_FOR_PRINTER_HEAT_SOAK',
			self.cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK,
			desc=self.desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK)

		self.gcode.register_command(
			'_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_BEACON_SAMPLES',
			self.cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_BEACON_SAMPLES,
			desc=self.desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_BEACON_SAMPLES)

		self.gcode.register_command(
			'_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_Z_RATES',
			self.cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_Z_RATES,
			desc=self.desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_Z_RATES)

		self.gcode.register_command(
			'_TEST_PREDICT_ADAPTIVE_HEAT_SOAK_THRESHOLD',
			self.cmd_TEST_PREDICT_ADAPTIVE_HEAT_SOAK_THRESHOLD,
			desc=self.desc_TEST_PREDICT_ADAPTIVE_HEAT_SOAK_THRESHOLD)

		self.printer.register_event_handler("klippy:connect",
											self._handle_connect)

	def _handle_connect(self):
		if self.config.has_section("beacon"):
			self.beacon = self.printer.lookup_object('beacon')

	def _prepare_for_sampling_and_get_sampling_frequency(self):
		# During internal testing, we've seen one machine that occasionally fails to prepare
		# the beacon for sampling. This retry is a speculative workaround for that issuue. The cause
		# is unknown, and we don't know if this will help. Time (and wider usage) will tell.
		remaining_attempts = 3
		while remaining_attempts > 0:
			try:
				return self._prepare_for_sampling_and_get_sampling_frequency_core()
			except Exception as e:
				remaining_attempts -= 1
				if remaining_attempts == 0:
					raise
				else:
					logging.warning(f"{self.name}: Warning: Failed to prepare beacon for sampling, retrying: {e}")
					self.reactor.pause(self.reactor.monotonic() + 2.0)

	def _prepare_for_sampling_and_get_sampling_frequency_core(self):
		# We've seen issues where the first streaming_session after some operations begins with some bogus data,
		# so we throw away some samples to ensure the beacon is ready. Suspected operations include:
		# - klipper restart
		# - BEACON_AUTO_CALIBRATE
		bad_samples = 0
		good_samples = 0
		first_sample_time = None
		last_sample_time = None

		def cb(s):
			nonlocal good_samples, bad_samples, first_sample_time, last_sample_time
			if (first_sample_time is None):
				first_sample_time = s["time"]
			last_sample_time = s["time"]
			dist = s["dist"]
			if dist is None or np.isinf(dist) or np.isnan(dist):
				bad_samples += 1
			else:
				good_samples += 1

		with self.beacon.streaming_session(cb):
			# Wait up to 5 seconds for 1000 good samples to be collected
			# This is a bit arbitrary, but it should be enough to ensure the beacon is ready.
			start_time = eventtime = self.reactor.monotonic()
			while good_samples < 1000 and (eventtime - start_time) < 5:
				if self.printer.is_shutdown():
					raise self.printer.command_error(f"{self.name}: Printer is shutting down")
				eventtime = self.reactor.pause(eventtime + 0.1)

		logging.info(f"{self.name}: Prepared for sampling, collected {good_samples} good samples and {bad_samples} bad samples (total {good_samples+bad_samples} samples).")

		if good_samples < 1000:
			raise self.printer.command_error("Failed to prepare beacon for sampling, timed out waiting for good samples. Beacon must be calibrated and positioned correctly before running this command.")

		return (good_samples + bad_samples) / (last_sample_time - first_sample_time)

	def _check_trend_projection(self, moving_average_history, moving_average_history_times, trend_fit_window, trend_projection, threshold):
		if len(moving_average_history) < trend_fit_window:
			# Not enough data to fit a trend
			return False

		# Fit window 200 take about 1.5ms on Pi 4B, so for now we work on the assumption that
		# processing can take place in the main thread without blocking the reactor for too long.
		# If we need longer fit windows, we may need to move this to a separate process.

		# Keep track of time taken, warn if we risk timer too close error.
		start_time = self.reactor.monotonic()

		times = np.array(moving_average_history_times[-trend_fit_window:])
		values = np.array(moving_average_history[-trend_fit_window:])

		# Fit a linear regression to the last `trend_fit_window` samples
		slope, intercept = np.polyfit(times, values, 1)

		check_time = times[-1] + trend_projection
		check_value = slope * check_time + intercept

		time_taken = self.reactor.monotonic() - start_time

		if time_taken > 3.0:
			logging.warning(f"{self.name}: Trend projection check for fit window size {trend_fit_window} took {1000.*time_taken:.3f} ms, which risks causing a Klipper timer too close error. Consider reducing the trend fit window size.")

		self.reactor.pause(self.reactor.NOW)

		return abs(check_value) <= threshold

	def get_layer_quality_name(self, quality):
		# Returns the name of the layer quality based on the quality value.
		if quality < 1 or quality > 5:
			raise ValueError(f"Invalid layer quality {quality}, must be between 1 and 5.")

		return ("rough", "draft", "normal", "high", "maximum")[quality - 1]

	def _get_maximum_z_change_microns_for_quality(self, quality):
		if quality < 1 or quality > 5:
			raise ValueError(f"Invalid layer quality {quality}, must be between 1 and 5.")

		# Returns the maximum Z change in microns for the given layer quality.
		# This is a fixed mapping based on empirical data and should not be changed.
		return (150, 100, 50, 20, 10)[quality - 1]  # Microns for layer quality 1-5

	desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK = "Wait for printer to reach thermal stability using Beacon to monitor deflection changes"
	def cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK(self, gcmd):
		if self.beacon is None:
			raise self.printer.command_error("Beacon is not available. Please ensure RatOS is configured correctly.")

		if self.beacon.model is None:
			raise self.printer.command_error("Beacon model is not set. Calibrate the Beacon before running this command.")

		threshold = gcmd.get_int('_FORCE_THRESHOLD', None, minval=8)
		minimum_wait = gcmd.get_int('MINIMUM_WAIT', self.def_minimum_wait, minval=0)
		maximum_wait = gcmd.get_int('MAXIMUM_WAIT', self.def_maximum_wait, minval=0)
		layer_quality = gcmd.get_int('LAYER_QUALITY', self.def_layer_quality, minval=1, maxval=5)
		maximum_first_layer_duration = max(60, min(7200, gcmd.get_int('MAXIMUM_FIRST_LAYER_DURATION', self.def_maximum_first_layer_duration, minval=0)))

		params_msg = ''
		threshold_origin = "forced" if threshold is not None else "predicted"

		if threshold is None:
			# Calculate the threshold based on the layer quality and maximum first layer duration
			maximum_z_change_microns = self._get_maximum_z_change_microns_for_quality(layer_quality)

			# Add 120 seconds to the maximum first layer duration to account for the time between true zero probing
			# and the print starting (needs to cover beacon rapid scan, nozzle heating to full temperature, priming, etc.)
			period = maximum_first_layer_duration + 120

			predictor = ThresholdPredictor(self.printer)
			threshold = predictor.predict_threshold(maximum_z_change_microns, period)
			params_msg = f"\nto suit layer quality {layer_quality} ({self.get_layer_quality_name(layer_quality)}) with maximum first layer duration of {self._format_seconds(maximum_first_layer_duration)}"
			logging.info(f"{self.name}: predicted adaptive heat soak threshold for maximum Z change of {maximum_z_change_microns} microns (quality {layer_quality}) over {period} seconds: {threshold:.2f} nm/s")
		else:
			logging.info(f"{self.name}: using forced adaptive heat soak threshold: {threshold:.2f} nm/s")

		beacon_sampling_rate = self._prepare_for_sampling_and_get_sampling_frequency()

		# The following control values were determined experimentally, and should not be changed
		# without careful consideration and reference to the corpus of experimental data. Changing
		# these values will also invalidate the threshold predictor training data.
		moving_average_target_hold_count = 150
		moving_average_size = 210
		moving_average_trend_checks = ((75, 675), (200, 675))

		# level_2_moving_average... is the moving average of the moving average
		level_2_moving_average_target_hold_count = 150
		level_2_moving_average_size = 400
		level_2_moving_average_trend_checks = ((45, 675),)

		moving_average_hold_count = 0
		level_2_moving_average_hold_count = 0

		z_rate_ra = RunningAverage(moving_average_size)
		z_rate_count = 0

		moving_average_ra = RunningAverage(level_2_moving_average_size)

		moving_average_history = []
		moving_average_history_times = []

		level_2_moving_average_history = []
		level_2_moving_average_history_times = []

		gcmd.respond_info(f"Adaptive heat soak started, waiting for printer to reach thermal stability{params_msg}.\nCheck printer status for progress. Please wait...")

		progress_handler = None
		try:
			start_time = self.reactor.monotonic()
			z_rate_session = BeaconZRateSession(self.config, self.beacon)
			progress_handler = BackgroundDisplayStatusProgressHandler(self.printer, "{spinner} Heat soaking {progress:.1f}%")

			# Automatically increment progress to reach about 5% by the time the first z-rate moving average is available.
			estimated_time_to_first_moving_average = \
				z_rate_session.get_estimated_delay_for_first_z_rate(beacon_sampling_rate) \
				+ moving_average_size * (z_rate_session.samples_per_mean / beacon_sampling_rate)

			progress_handler.set_auto_rate(0.05 / estimated_time_to_first_moving_average)
			progress_handler.enable()

			ts = time.strftime("%Y%m%d_%H%M%S")
			fn = f"/tmp/heat_soak_{ts}.csv"

			logging.info(
				f"{self.name}: starting: threshold={threshold} ({threshold_origin}), est_t_to_first_ma={estimated_time_to_first_moving_average:.1f},  min_wait={minimum_wait}, max_wait={maximum_wait}, "
				f"layer_quality={layer_quality}, maximum_first_layer_duration={maximum_first_layer_duration}, beacon_sampling_rate={beacon_sampling_rate:.1f}, z_rates_file={fn}, "
				f"ma_hold_count={moving_average_target_hold_count}, ma_size={moving_average_size}, ma_trend_checks={moving_average_trend_checks}, "
				f"ma2_hold_count={level_2_moving_average_target_hold_count}, ma_size={level_2_moving_average_size}, ma_trend_checks={level_2_moving_average_trend_checks}")

			with open(fn, "w") as z_rates_file:
				z_rates_file.write("time,z_rate,z\n")
				time_zero = None
				progress_start = None
				progress_start_z_rate = None
				progress_z_rate_range = None
				progress_on_final_approach = False

				while True:
					if self.reactor.monotonic() - start_time > maximum_wait:
						gcmd.respond_info(f"Maximum wait time of {self._format_seconds(maximum_wait)} exceeded, wait completed.")
						return

					try:
						z_rate_result = z_rate_session.get_next_z_rate()
					except Exception as e:
						if self.printer.is_shutdown():
							raise
						else:
							raise self.printer.command_error(f"Error calculating Z-rate, wait ended prematurely: {e}") from e

					if time_zero is None:
						time_zero = z_rate_result[0]

					z_rates_file.write(f"{z_rate_result[0] - time_zero:.8e},{z_rate_result[1]:.8e},{z_rate_result[2]:.8e}\n")
					z_rate_ra.add(z_rate_result[1])
					z_rate_count += 1

					# Throttle logging
					should_log = z_rate_count % 20 == 0

					elapsed = self.reactor.monotonic() - start_time
					moving_average = None
					level_2_moving_average = None

					if z_rate_ra.is_full():
						moving_average = z_rate_ra.get_average()
						moving_average_ra.add(moving_average)
						moving_average_history.append(moving_average)
						moving_average_history_times.append(z_rate_result[0])

						if moving_average_ra.is_full():
							level_2_moving_average = moving_average_ra.get_average()
							level_2_moving_average_history.append(level_2_moving_average)
							level_2_moving_average_history_times.append(z_rate_result[0])

						if progress_start is None:
							progress_handler.set_auto_rate(0)
							progress_start = progress_handler.progress
							progress_start_z_rate = abs(moving_average)
							# This is the amount of z-rate change until we reach the threshold. We add 10% of the threshold
							# as we will surely move beyond the threshold. If we are *already* within the threshold
							# this happens with a very quick first layer - we must wait for proven z-rate stability:
							# we handle this by the max condition, which applies when threshold is larger than the start z-rate;
							# this will promptly cause the progress to transition to 95% and enter the final approach phase.
							progress_z_rate_range = max(1.0, (progress_start_z_rate - threshold) + 0.1 * threshold)
							logging.info(f"{self.name}: first ma: elapsed={elapsed:.1f}, progress_start={progress_start:.2f}, progress_start_z_rate={progress_start_z_rate:.2f}, progress_z_rate_range={progress_z_rate_range:.2f}, moving_average={moving_average:.2f} nm/s")
							if progress_start > 0.1:
								# This is unexpected. The value should be close to 5%. Force it, even though we'll jump
								# progress backwards.
								progress_handler.progress = progress_start = 0.1
								logging.warning(f"{self.name}: unexpected progress_start value {progress_start:.2f}, resetting to 0.1 to avoid confusion.")

						# Hold back 5% of progress to avoid confusion while waiting for hold count and trend checks to pass.
						# And don't allow progress to decrease.
						progress_handler.progress = max(
							progress_handler.progress,
							progress_start + (0.95 - progress_start) * min(1.0, (progress_start_z_rate - abs(moving_average)) / progress_z_rate_range)
						)

						if progress_handler.progress >= 0.949 and not progress_on_final_approach:
							# We're on the final approach to 100% progress. For now, fake a slow approach to 99%
							# over the next 10 minutes for user confidence. MVP implementation, we may want to
							# improve this later.
							progress_on_final_approach = True
							progress_handler.set_auto_rate(0.04 / 600.0)
						elif progress_handler.progress >= 0.989 and progress_on_final_approach:
							# Hold at ~99%
							progress_handler.set_auto_rate(0.0)

						moving_average_trend_checks_passed = 'N/A'
						level_2_moving_average_trend_checks_passed = 'N/A'
						min_wait_satisfied = 'N/A'

						if abs(moving_average) <= threshold:
							moving_average_hold_count += 1
						else:
							moving_average_hold_count = 0

						if moving_average_hold_count >= moving_average_target_hold_count:
							# For increased robustness, we perform one or more linear trend checks. Typically this will
							# include a trend fitted to a short history window, and a trend fitted to a longer history window.
							# Together, these checks ensure that the Z-rate is not only stable but also not trending towards instability.
							# In testing, this has been shown to reduce the risk of false positives.
							moving_average_trend_checks_passed = all(
								self._check_trend_projection(
									moving_average_history, moving_average_history_times,
									trend_check[0], trend_check[1], threshold
								) for trend_check in moving_average_trend_checks)

						if level_2_moving_average is not None:
							if abs(level_2_moving_average) <= threshold:
								level_2_moving_average_hold_count += 1
							else:
								level_2_moving_average_hold_count = 0

							if level_2_moving_average_hold_count >= level_2_moving_average_target_hold_count:
								level_2_moving_average_trend_checks_passed = all(
									self._check_trend_projection(
										level_2_moving_average_history, level_2_moving_average_history_times,
										trend_check[0], trend_check[1], threshold
									) for trend_check in level_2_moving_average_trend_checks)

						if moving_average_trend_checks_passed is True or level_2_moving_average_trend_checks_passed is True:
							if elapsed < minimum_wait:
								min_wait_satisfied = False
							else:
								msg = f"Adaptive heat soak completed in {self._format_seconds(elapsed)}."
								gcmd.respond_info(msg)
								return

						if should_log:
							logging.info(
								f"{self.name}: elapsed={elapsed:.1f} s, progress={progress_handler.progress * 100.0:.2f}%, "
								f"ma={moving_average:.2f} nm/s, ma_hold_count={moving_average_hold_count}/{moving_average_target_hold_count}, ma_trend_checks_passed={moving_average_trend_checks_passed}, "
								f"ma2={float('inf') if level_2_moving_average is None else level_2_moving_average:.2f} nm/s, ma2_hold_count={level_2_moving_average_hold_count}/{level_2_moving_average_target_hold_count}, ma2_trend_checks_passed={level_2_moving_average_trend_checks_passed}, "
								f"min_wait_satisfied={min_wait_satisfied}, threshold={threshold:.2f} nm/s")
					elif should_log:
						logging.info(f"{self.name}: elapsed={elapsed:.1f} s, waiting for first moving average to be available...")
		finally:
			if progress_handler is not None:
				progress_handler.disable()

	desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_Z_RATES = "For developer use only. This command is used to run diagnostics for Beacon adaptive heat soak."
	def cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_Z_RATES(self, gcmd):
		if self.beacon is None:
			raise self.printer.command_error("Beacon is not available. Please ensure RatOS is configured correctly.")

		if self.beacon.model is None:
			raise self.printer.command_error("Beacon model is not set. Calibrate the Beacon before running this command.")

		self._prepare_for_sampling_and_get_sampling_frequency()

		duration = gcmd.get_int('DURATION', 7200, minval=0)
		timestamp = time.strftime("%Y%m%d_%H%M%S")
		filename = gcmd.get('FILENAME', 'beacon_adaptive_heat_soak_z_rates') + f"_V2_{timestamp}.csv"

		fullpath = f'/home/pi/printer_data/config/{filename}'

		with open(fullpath, 'w') as f:
			f.write("time,z_rate,z\n")
			gcmd.respond_info(f'Capturing diagnostic Z-rates for {duration} seconds using V2 Z-rate calculation to file {fullpath}, please wait...')
			start_time = self.reactor.monotonic()
			z_rate_session = BeaconZRateSession(self.config, self.beacon)
			time_zero = None

			while self.reactor.monotonic() - start_time < duration:
				# Get the Z rate from the beacon
				try:
					z_rate_result = z_rate_session.get_next_z_rate()
				except Exception as e:
					if self.printer.is_shutdown():
						raise
					else:
						raise self.printer.command_error(f"Error calculating Z-rate: {e}") from e

				gcmd.respond_info(f"Z-rate {z_rate_result[1]:.3f} nm/s")

				if time_zero is None:
					time_zero = z_rate_result[0]

				f.write(f"{z_rate_result[0] - time_zero:.8e},{z_rate_result[1]:.8e},{z_rate_result[2]:.8e}\n")

			gcmd.respond_info(f'Diagnostic data captured to {fullpath}')

	desc_TEST_PREDICT_ADAPTIVE_HEAT_SOAK_THRESHOLD = "For developer use only. Specify Z (maximum z change in microns) and P (period in seconds)."
	def cmd_TEST_PREDICT_ADAPTIVE_HEAT_SOAK_THRESHOLD(self, gcmd):
		maximum_z_change_microns = gcmd.get_int('Z', 100, minval=1)
		period_seconds = gcmd.get_int('P', 300, minval=60)

		start_time = self.reactor.monotonic()
		predictor = ThresholdPredictor(self.printer)
		threshold = predictor.predict_threshold(maximum_z_change_microns, period_seconds)
		end_time = self.reactor.monotonic()

		gcmd.respond_info(f"Predicted adaptive heat soak threshold for maximum Z change of {maximum_z_change_microns} microns over {period_seconds} seconds: {threshold:.2f} nm/s (prediction took {1000. * (end_time - start_time):.1f} ms)")

	desc_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_BEACON_SAMPLES = "For developer use only. This command is used to run diagnostics for Beacon adaptive heat soak."
	def cmd_BEACON_WAIT_FOR_PRINTER_HEAT_SOAK_CAPTURE_BEACON_SAMPLES(self, gcmd):
		if self.beacon is None:
			raise self.printer.command_error("Beacon is not available. Please ensure RatOS is configured correctly.")

		if self.beacon.model is None:
			raise self.printer.command_error("Beacon model is not set. Calibrate the Beacon before running this command.")

		self._prepare_for_sampling_and_get_sampling_frequency()

		duration = gcmd.get_int('DURATION', 300, minval=60)
		chunk_duration = gcmd.get_int('CHUNK_DURATION', 5, minval=5)

		timestamp = time.strftime("%Y%m%d_%H%M%S")
		filename = f'/home/pi/printer_data/config/beacon_adaptive_heat_soak_beacon_samples_{timestamp}.txt'

		with open(filename, 'w') as f:
			gcmd.respond_info(f'Capturing diagnostic beacon samples for {duration} seconds in chunks of {chunk_duration} seconds to file {filename}, please wait...')
			start_time = self.reactor.monotonic()
			while self.reactor.monotonic() - start_time < duration:
				if self.printer.is_shutdown():
					raise self.printer.command_error(f"{self.name}: Printer is shutting down")

				samples = []
				def cb(s):
					unsmooth_data = s["data"]
					unsmooth_freq = self.beacon.count_to_freq(unsmooth_data)
					unsmooth_dist = self.beacon.freq_to_dist(unsmooth_freq, s["temp"])
					samples.append((s["time"], s["dist"], unsmooth_dist))

				with self.beacon.streaming_session(cb):
					self.reactor.pause(self.reactor.monotonic() + chunk_duration)

				np.savetxt(f, samples)
				f.flush()

		gcmd.respond_info(f'Diagnostic data captured to {filename}')

	def _format_seconds(self, seconds):
		seconds = int(seconds)
		hours = seconds // 3600
		minutes = (seconds % 3600) // 60
		secs = seconds % 60

		if hours > 0:
			if minutes > 0 or secs > 0:
				if secs > 0:
					return f"{hours}h {minutes}m {secs}s"
				return f"{hours}h {minutes}m"
			return f"{hours}h"
		elif minutes > 0:
			if secs > 0:
				return f"{minutes}m {secs}s"
			return f"{minutes}m"
		else:
			return f"{secs}s"

def load_config(config):
	return BeaconAdaptiveHeatSoak(config)