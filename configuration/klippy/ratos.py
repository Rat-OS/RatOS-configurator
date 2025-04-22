import os, logging, glob
import json, subprocess, pathlib

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
		self.last_processed_file_result = None
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
		self.bed_mesh = None

		self.old_is_graph_files = []
		self.load_settings()
		self.register_commands()
		self.register_handler()
		self.load_settings()
		self.post_process_success = False

	#####
	# Handler
	#####
	def register_handler(self):
		self.printer.register_event_handler("klippy:connect", self._connect)

	def _connect(self):
		self.v_sd = self.printer.lookup_object('virtual_sdcard', None)
		self.sdcard_dirname = self.v_sd.sdcard_dirname
		self.dual_carriage = None
		if self.config.has_section("dual_carriage"):
			self.dual_carriage = self.printer.lookup_object("dual_carriage", None)
		self.rmmu_hub = None
		if self.config.has_section("rmmu_hub"):
			self.rmmu_hub = self.printer.lookup_object("rmmu_hub", None)
		if self.config.has_section("bed_mesh"):
			self.bed_mesh = self.printer.lookup_object('bed_mesh')

		# Register overrides.
		self.register_command_overrides()

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
		self.gcode.register_command('HELLO_RATOS', self.cmd_HELLO_RATOS, desc=(self.desc_HELLO_RATOS))
		self.gcode.register_command('CACHE_IS_GRAPH_FILES', self.cmd_CACHE_IS_GRAPH_FILES, desc=(self.desc_CACHE_IS_GRAPH_FILES))
		self.gcode.register_command('SHOW_IS_GRAPH_FILES', self.cmd_SHOW_IS_GRAPH_FILES, desc=(self.desc_SHOW_IS_GRAPH_FILES))
		self.gcode.register_command('CONSOLE_ECHO', self.cmd_CONSOLE_ECHO, desc=(self.desc_CONSOLE_ECHO))
		self.gcode.register_command('RATOS_LOG', self.cmd_RATOS_LOG, desc=(self.desc_RATOS_LOG))
		self.gcode.register_command('PROCESS_GCODE_FILE', self.cmd_PROCESS_GCODE_FILE, desc=(self.desc_PROCESS_GCODE_FILE))
		self.gcode.register_command('TEST_PROCESS_GCODE_FILE', self.cmd_TEST_PROCESS_GCODE_FILE, desc=(self.desc_TEST_PROCESS_GCODE_FILE))
		self.gcode.register_command('ALLOW_UNKNOWN_GCODE_GENERATOR', self.cmd_ALLOW_UNKNOWN_GCODE_GENERATOR, desc=(self.desc_ALLOW_UNKNOWN_GCODE_GENERATOR))
		self.gcode.register_command('BYPASS_GCODE_PROCESSING', self.cmd_BYPASS_GCODE_PROCESSING, desc=(self.desc_BYPASS_GCODE_PROCESSING))
		self.gcode.register_command('_SYNC_GCODE_POSITION', self.cmd_SYNC_GCODE_POSITION, desc=(self.desc_SYNC_GCODE_POSITION))
		self.gcode.register_command('_CHECK_BED_MESH_PROFILE_EXISTS', self.cmd_CHECK_BED_MESH_PROFILE_EXISTS, desc=(self.desc_CHECK_BED_MESH_PROFILE_EXISTS))
		self.gcode.register_command('_RAISE_ERROR', self.cmd_RAISE_ERROR, desc=(self.desc_RAISE_ERROR))
		self.gcode.register_command('_TRY', self.cmd_TRY, desc=(self.desc_TRY))

	def register_command_overrides(self):
		self.register_override('TEST_RESONANCES', self.override_TEST_RESONANCES, desc=(self.desc_TEST_RESONANCES))
		self.register_override('SHAPER_CALIBRATE', self.override_SHAPER_CALIBRATE, desc=(self.desc_SHAPER_CALIBRATE))

	def register_override(self, command, func, desc):
		if self.overridden_commands[command] is not None:
			if self.overridden_commands[command] != func:
				raise self.printer.config_error("Command '%s' is already overridden with a different function" % (command,))
			return

		prev_cmd = self.gcode.register_command(command, None)
		if prev_cmd is None:
			if (command == 'TEST_RESONANCES' or command == 'SHAPER_CALIBRATE') and not self.config.has_section('resonance_tester'):
				# No [resonance_tester] section found, don't throw an error, skip overriding.
				logging.info("No [resonance_tester] section found, skipping override of command '%s'" % (command,))
				return
			else:
				raise self.printer.config_error("Existing command '%s' not found in RatOS override" % (command,))
		if command not in self.overridden_commands:
			raise self.printer.config_error("Command '%s' not found in RatOS override list" % (command,))

		self.overridden_commands[command] = prev_cmd;
		self.gcode.register_command(command, func, desc=(desc))

	def get_prev_cmd(self, command):
		if command not in self.overridden_commands or self.overridden_commands[command] is None:
			raise self.printer.config_error("Previous function for command '%s' not found in RatOS override list" % (command,))
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

	desc_TEST_PROCESS_GCODE_FILE = "Test the G-code post-processor for IDEX and RMMU, only for debugging purposes"
	def cmd_TEST_PROCESS_GCODE_FILE(self, gcmd):
		dual_carriage = self.dual_carriage
		self.dual_carriage = gcmd.get('IDEX', dual_carriage != None).lower() == "true"
		filename = gcmd.get('FILENAME', "")
		if filename[0] == '/':
			filename = filename[1:]
		self.process_gcode_file(filename, True)
		self.dual_carriage = dual_carriage
		self.console_echo('Post processing test results', 'debug', 'Output: %s' % (self.last_processed_file_result))

	desc_HELLO_RATOS = "RatOS mainsail welcome message"
	def cmd_HELLO_RATOS(self, gcmd):
		url = "https://os.ratrig.com/"
		img = "../server/files/config/RatOS/Logo-white.png"
		ratos_version = self.get_ratos_version().split('-')
		_title = '<p style="font-weight: bold; margin:0; color:white">Welcome to RatOS ' +  ratos_version[0] + '</p>'
		_sub_title = '<div style="margin:0; padding:0; color: rgba(255, 255, 255, 0.7)">' + '-'.join(ratos_version) + '</div>'
		_info = '<div style="margin:0; padding:0; color: rgba(255, 255, 255, 0.7)">\nClick image to open documentation.</div>'
		_img = '\n<a href="' + url + '" target="_blank" ><img style="margin-top:6px;" src="' + img + '" width="258px"></a>'
		self.gcode.respond_raw('<div>' + _title + _sub_title + _img + _info + '</div>')

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
		prefix = gcmd.get('PREFIX')
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
		if self.bed_mesh:
			profile = gcmd.get('PROFILE', '')
			if not profile.strip():
				raise gcmd.error("Value for parameter 'PROFILE' must be specified")		
			msg = gcmd.get('MSG', "Bed mesh profile '%s' not found")
			profiles = self.bed_mesh.pmgr.get_profiles()
			if profile not in profiles:
				raise self.printer.command_error(msg % (profile))

	desc_PROCESS_GCODE_FILE = "G-code post-processor for IDEX and RMMU"
	def cmd_PROCESS_GCODE_FILE(self, gcmd):
		filename = gcmd.get('FILENAME', "")
		isIdex = self.config.has_section("dual_carriage")
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
				return False;

			if process.returncode != 0:
				# We should've already printed the error message in _interpret_output
				error = process.stderr.read().decode().strip()
				if error:
					logging.error(error)

				self.post_process_success = False
				return False;

			return self.post_process_success;

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
		self.gcode.run_script_from_command("RATOS_ECHO PREFIX='" + str(prefix) + "' MSG='" + str(msg) + "'")

	def debug_echo(self, prefix, msg):
		self.gcode.run_script_from_command("DEBUG_ECHO PREFIX='" + str(prefix) + "' MSG='" + str(msg) + "'")
	
	def console_echo(self, title, type, msg=''):
		color = "white"
		opacity = 1.0
		if type == 'info': color = "#38bdf8"
		if type == 'success': color = "#a3e635"
		if type == 'warning': color = "#fbbf24"
		if type == 'alert': color = "#f87171"
		if type == 'error': color = "#f87171"
		if type == 'debug': color = "#38bdf8"
		if type == 'debug': opacity = 0.7

		if (type == 'error' or type == 'alert'):
			logging.error(title + ": " + msg.replace("_N_","\n"))
		if (type == 'warning'):
			logging.warning(title + ": " + msg.replace("_N_","\n"))

		_title = '<p style="font-weight: bold; margin:0; opacity:' + str(opacity) + '; color:' + color + '">' + title + '</p>'
		if msg:
			_msg = '<p style="margin:0; opacity:' + str(opacity) + '; color:' + color + '">' + msg.replace("_N_","\n") + '</p>'
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
	
	def get_status(self, eventtime):
		return {'name': self.name, 'last_processed_file_result': self.last_processed_file_result}

#####
# Loader
#####
def load_config(config):
	return RatOS(config)