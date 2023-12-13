exports.id = 103;
exports.ids = [103];
exports.modules = {

/***/ 3103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "deserializePartialPrinterConfiguration": () => (/* binding */ deserializePartialPrinterConfiguration),
  "deserializePrinterConfiguration": () => (/* binding */ deserializePrinterConfiguration),
  "getPrinters": () => (/* binding */ getPrinters),
  "parseDirectory": () => (/* binding */ parseDirectory),
  "printerRouter": () => (/* binding */ printerRouter),
  "regenerateKlipperConfiguration": () => (/* binding */ regenerateKlipperConfiguration)
});

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: external "pino"
var external_pino_ = __webpack_require__(8545);
var external_pino_default = /*#__PURE__*/__webpack_require__.n(external_pino_);
// EXTERNAL MODULE: external "pino-pretty"
var external_pino_pretty_ = __webpack_require__(3009);
var external_pino_pretty_default = /*#__PURE__*/__webpack_require__.n(external_pino_pretty_);
;// CONCATENATED MODULE: ./helpers/logger.ts


let logger = null;
const getLogger = ()=>{
    if (logger != null) {
        return logger;
    }
    if (process.env.LOG_FILE == null) {
        throw new Error("No LOG_FILE specified in environment");
    }
    const transportOption =  false ? 0 : {
        target: "pino/file",
        options: {
            destination: process.env.LOG_FILE,
            append: false
        }
    };
    const stream = external_pino_pretty_default()({
        colorize: true
    });
    logger = external_pino_default()(stream);
    return logger;
};

// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ./zods/boards.tsx
var boards = __webpack_require__(95);
;// CONCATENATED MODULE: ./helpers/util.ts
const getScriptRoot = ()=>{
    // This is ... not great.. come up with something better
    return process.env.RATOS_SCRIPT_DIR ?? __dirname.split("configurator/")[0] + "configurator/scripts/";
};

;// CONCATENATED MODULE: ./helpers/metadata.ts





const parseMetadata = async (cfgFile, zod)=>{
    if (cfgFile.trim() === "") return null;
    const hashmarkPrefixedJson = await (0,external_util_.promisify)(external_child_process_.exec)(`sed -n '/^# {/{:a; N; /\\n# }/!ba; p}' ${cfgFile}`);
    const jsonArray = hashmarkPrefixedJson.stdout.split("\n").map((l)=>l.trim()).filter((l)=>l !== "").map((l)=>l.indexOf("#") === 0 ? l.substring(1) : l);
    if (jsonArray.length === 0) {
        return null;
    }
    try {
        const content = JSON.parse(jsonArray.join("\n"));
        content.path = cfgFile;
        const fileName = cfgFile.split("/").pop();
        if (fileName == null) {
            throw new Error("File name couldn't be parsed from path: " + cfgFile);
        }
        content.id = fileName;
        return zod.parse(content);
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        throw new Error("Failed to parse JSON from file: " + cfgFile + " with content: " + jsonArray.join("\n"));
    }
};
const _parsePinValue = (value)=>{
    if (value === "null") {
        return undefined;
    }
    if (value.startsWith("<") && value.endsWith(">")) {
        return undefined;
    }
    return value;
};
const _parsePinAlias = async (file)=>{
    const scriptRoot = getScriptRoot();
    const configUnparsed = await (0,external_util_.promisify)(external_child_process_.exec)(`python3 ${external_path_default().join(scriptRoot, "initojson.py")} ${file}`);
    const config = JSON.parse(configUnparsed.stdout);
    if (config == null) {
        throw new Error("Failed to parse config file: " + file);
    }
    const boardPinSection = Object.keys(config).find((section)=>section.startsWith("board_pins"));
    if (boardPinSection == null) {
        throw new Error("Failed to find board pin section in config file: " + file);
    }
    const unparsedPins = config[boardPinSection].aliases.map((a)=>a.replace(",", ""));
    const badPins = config[boardPinSection].aliases.filter((a)=>!a.includes("="));
    if (badPins.length > 0) {
        throw new Error('Board pin aliases do not parse correctly, got "' + badPins.join(", ") + '"');
    }
    const pins = {};
    unparsedPins.forEach((p)=>{
        const frags = p.split("=");
        if (frags.length > 2) {
            throw new Error('Board pin aliases do not parse correctly, got "' + p + '"');
        }
        pins[frags[0]] = _parsePinValue(frags[1]);
    });
    return pins;
};
const exportBoardPinAlias = (name, pins, mcu)=>{
    const aliases = Object.keys(pins).map((k, i)=>{
        if (pins[k] == null) {
            return k + "=null";
        }
        return k + "=" + pins[k];
    });
    const result = [
        `[board_pins ${name}]`
    ];
    if (mcu != null) {
        result.push(`mcu: ${mcu}`);
    }
    result.push(`aliases:`, `\t${aliases.join(",\n	")}`);
    return result.join("\n");
};
const parseBoardConfig = async (board, extruderLess)=>{
    let file = external_path_default().join(board.path, board.isToolboard ? "toolboard-config.cfg" : extruderLess && board.extruderlessConfig != null ? board.extruderlessConfig : "config.cfg");
    const zod = board.isToolboard ? boards/* ToolboardPinMap */.Oy : boards/* ControlBoardPinMap */.MW;
    return zod.parse(await _parsePinAlias(file));
};

// EXTERNAL MODULE: ./zods/hardware.tsx
var hardware = __webpack_require__(7670);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: ./zods/printer.tsx
var printer = __webpack_require__(5996);
// EXTERNAL MODULE: ./zods/printer-configuration.tsx
var printer_configuration = __webpack_require__(4342);
// EXTERNAL MODULE: ./data/endstops.ts
var endstops = __webpack_require__(1572);
// EXTERNAL MODULE: ./templates/extras/sensorless-homing.ts
var sensorless_homing = __webpack_require__(1096);
// EXTERNAL MODULE: ./zods/motion.tsx
var motion = __webpack_require__(6680);
// EXTERNAL MODULE: ./data/steppers.ts
var steppers = __webpack_require__(817);
// EXTERNAL MODULE: ./utils/serialization.ts
var serialization = __webpack_require__(206);
// EXTERNAL MODULE: ./env/schema.mjs
var schema = __webpack_require__(6165);
;// CONCATENATED MODULE: ./helpers/klipper-config.ts








const environment = schema.serverSchema.parse(process.env);
const constructKlipperConfigUtils = (config)=>{
    return {
        getRail (axis) {
            const rail = config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            return rail;
        },
        getAxisPinName (axis, alias) {
            const prefix = axis === motion/* PrinterAxis.extruder */.po.extruder ? this.getExtruderPinPrefix() : "";
            return prefix + (axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis === motion/* PrinterAxis.extruder */.po.extruder ? "e" : axis) + alias;
        },
        getAxisStepperName (axis) {
            return axis === motion/* PrinterAxis.extruder */.po.extruder ? "extruder" : "stepper" + "_" + axis;
        },
        getAxisDriverType (axis) {
            return this.getRail(axis).driver.type.toLowerCase();
        },
        getAxisDriverSectionName (axis) {
            return `${this.getAxisDriverType(axis)} ${this.getAxisStepperName(axis)}`;
        },
        getAxisVirtualEndstop (axis) {
            return `${this.getAxisDriverType(axis)}_${this.getAxisStepperName(axis)}:virtual_endstop`;
        },
        getAxisDriverStallGuardThreshold (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            if ([
                "TMC2130",
                "TMC5160",
                "TMC2240"
            ].includes(rail.driver.type)) {
                return `driver_SGT: ${Math.round(factor * 127) - 64}`;
            } else {
                return `driver_SGTHRS: ${Math.round(factor * 255)}`;
            }
        },
        getAxisDriverDiagConfig (axis) {
            if (this.getRail(axis).driver.protocol === "UART") {
                return `diag_pin: ^${this.getAxisPinName(axis, "_diag_pin")}`;
            }
            if (this.getRail(axis).driver.protocol === "SPI") {
                return `diag1_pin: ^${this.getAxisPinName(axis, "_diag_pin")}`;
            }
            return "";
        },
        getAxisDriverHomingCurrent (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            return rail.stepper.maxPeakCurrent * 0.71 * factor;
        },
        readInclude (fileName) {
            return (0,external_fs_.readFileSync)(external_path_default().join(environment.RATOS_CONFIGURATION_PATH, fileName), "utf-8");
        },
        stripIncludes (content) {
            return content.split("\n").filter((l)=>!l.trim().startsWith("[include")).join("\n");
        },
        stripCommentLines (content) {
            return content.split("\n").filter((l)=>l.trim().indexOf("#") !== 0).join("\n");
        },
        getExtruderPinPrefix () {
            if (config.toolboard != null) {
                return "toolboard:";
            }
            return "";
        },
        getProbePinPrefix () {
            if (config.toolboard != null) {
                return "toolboard:";
            }
            return "";
        },
        getXEndstopPinPrefix () {
            if (config.toolboard != null && config.xEndstop.id === "endstop-toolboard") {
                return "toolboard:";
            }
            return "";
        },
        getYEndstopPinPrefix () {
            return "";
        }
    };
};
const constructKlipperConfigExtrasGenerator = (config, utils)=>{
    const _filesToWrite = [];
    const _reminders = [];
    return {
        getFilesToWrite (overwrite) {
            return _filesToWrite.slice().map((f)=>({
                    ...f,
                    overwrite: overwrite != null ? overwrite : f.overwrite
                }));
        },
        addFileToRender (fileToRender) {
            _filesToWrite.push(fileToRender);
        },
        getReminders () {
            return _reminders.slice();
        },
        generateSensorlessHomingIncludes () {
            const filesToWrite = [];
            if (config.xEndstop.id === "sensorless") {
                filesToWrite.push({
                    fileName: "sensorless-homing-x.cfg",
                    content: (0,sensorless_homing.sensorlessXTemplate)(config, utils),
                    overwrite: false
                });
            }
            if (config.yEndstop.id === "sensorless") {
                filesToWrite.push({
                    fileName: "sensorless-homing-y.cfg",
                    content: (0,sensorless_homing.sensorlessYTemplate)(config, utils),
                    overwrite: false
                });
            }
            if (filesToWrite.length > 0) {
                const reminder = [];
                reminder.push("# REMEMBER TO TUNE SENSORLESS HOMING BEFORE ATTEMPTING TO PRINT!");
                reminder.push(`# You'll find instructions in the generated sensorless-homing-*.cfg file(s),`, `# where you should keep your sensorless homing settings.`);
                this.addReminder(reminder.join("\n"));
            }
            return filesToWrite.map((f)=>{
                this.addFileToRender(f);
                return `[include ${f.fileName}]`;
            }).join("\n");
        },
        addReminder (reminder) {
            _reminders.push(reminder);
        }
    };
};
/**
 * Constructs a printer agnostic helper object for generating klipper config files.
 * @param config the printer configuration to generate helpers for
 * @param extrasGenerator an extras generator for handling non-explicit template functionality
 * @returns
 */ const constructKlipperConfigHelpers = async (config, extrasGenerator, utils)=>{
    const cbPins = await parseBoardConfig(config.controlboard, config.printer.driverCountRequired > config.controlboard.driverCount);
    const tbPins = config.toolboard != null ? await parseBoardConfig(config.toolboard) : null;
    return {
        ...utils,
        renderToolboard () {
            if (config.toolboard == null || tbPins == null) {
                return "";
            }
            const result = [
                "",
                exportBoardPinAlias(config.toolboard.serialPath.replace("/dev/", ""), tbPins, "toolboard"),
                "",
                `[mcu toolboard]`,
                `serial: ${config.toolboard.serialPath}`
            ];
            if (config.toolboard.hasMcuTempSensor) {
                result.push(""); // Add a newline for readability.
                result.push(`[temperature_sensor ${config.toolboard.name.replace(/\s/g, "_")}]`);
                result.push(`sensor_type: temperature_mcu`);
                result.push(`sensor_mcu: toolboard`);
            }
            if (config.toolboard.ADXL345SPI != null) {
                result.push(""); // Add a newline for readability.
                result.push(`[adxl345 toolboard]`);
                result.push(`cs_pin: toolboard:${config.toolboard.ADXL345SPI.cs_pin}`);
                if ("hardware" in config.toolboard.ADXL345SPI) {
                    result.push(`spi_bus: ${config.toolboard.ADXL345SPI.hardware.bus}`);
                } else {
                    result.push(`spi_software_mosi_pin: toolboard:${config.toolboard.ADXL345SPI.software.mosi}`);
                    result.push(`spi_software_miso_pin: toolboard:${config.toolboard.ADXL345SPI.software.miso}`);
                    result.push(`spi_software_sclk_pin: toolboard:${config.toolboard.ADXL345SPI.software.sclk}`);
                }
            }
            if (config.toolboard.outputPins != null) {
                config.toolboard.outputPins.forEach((pindef)=>{
                    result.push(""); // Add a newline for readability.
                    result.push(`[output_pin ${pindef.name}]`);
                    result.push(`pin: toolboard:${pindef.pin}`);
                    result.push(`value: ${pindef.value}`);
                });
            }
            return result.join("\n");
        },
        renderControlboard () {
            const result = [
                "",
                exportBoardPinAlias(config.controlboard.serialPath.replace("/dev/", ""), cbPins),
                "",
                `[mcu]`,
                `serial: ${config.controlboard.serialPath}`
            ];
            if (config.controlboard.hasMcuTempSensor) {
                result.push(""); // Add a newline for readability.
                result.push(`[temperature_sensor ${config.controlboard.name.replace(/\s/g, "_")}]`);
                result.push(`sensor_type: temperature_mcu`);
            }
            if (config.controlboard.ADXL345SPI != null) {
                result.push(""); // Add a newline for readability.
                result.push(`[adxl345 controlboard]`);
                result.push(`cs_pin: ${config.controlboard.ADXL345SPI.cs_pin}`);
                if ("hardware" in config.controlboard.ADXL345SPI) {
                    result.push(`spi_bus: ${config.controlboard.ADXL345SPI.hardware.bus}`);
                } else {
                    result.push(`spi_software_mosi_pin: ${config.controlboard.ADXL345SPI.software.mosi}`);
                    result.push(`spi_software_miso_pin: ${config.controlboard.ADXL345SPI.software.miso}`);
                    result.push(`spi_software_sclk_pin: ${config.controlboard.ADXL345SPI.software.sclk}`);
                }
            }
            if (config.controlboard.outputPins != null) {
                config.controlboard.outputPins.forEach((pindef)=>{
                    result.push(""); // Add a newline for readability.
                    result.push(`[output_pin ${pindef.name}]`);
                    result.push(`pin: ${pindef.pin}`);
                    result.push(`value: ${pindef.value}`);
                });
            }
            return result.join("\n");
        },
        renderBoards () {
            if (config.printer.driverCountRequired > config.controlboard.driverCount) {
                if (config.controlboard.extruderlessConfig == null) {
                    throw new Error("Control board has insufficient amount of drivers and do not appear to have an extruderless config file.");
                }
                if (config.toolboard == null || config.controlboard.driverCount + config.toolboard.driverCount < config.printer.driverCountRequired) {
                    throw new Error("Control board + toolboard does not make up enough drivers for this printer.");
                }
            }
            const result = [
                "[include RatOS/boards/rpi/config.cfg]",
                this.renderControlboard(),
                this.renderToolboard()
            ];
            return result.join("\n");
        },
        renderStepperSections () {
            return config.rails.map((r)=>{
                return this.renderStepperSection(r);
            }).join("\n");
        },
        renderStepperSection (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = [
                `[${utils.getAxisStepperName(rail.axis)}]`,
                `step_pin: ${utils.getAxisPinName(rail.axis, "_step_pin")}`,
                `dir_pin: ${utils.getAxisPinName(rail.axis, "_dir_pin")}`,
                `enable_pin: !${utils.getAxisPinName(rail.axis, "_enable_pin")}`,
                `microsteps: ${rail.microstepping}`,
                `rotation_distance: ${rail.rotationDistance}`
            ];
            if ([
                motion/* PrinterAxis.x */.po.x,
                motion/* PrinterAxis.y */.po.y,
                motion/* PrinterAxis.z */.po.z
            ].includes(rail.axis)) {
                section.push(`homing_speed: ${rail.homingSpeed}`);
            }
            if (rail.gearRatio != null) {
                section.push(`gear_ratio: ${rail.gearRatio}`);
            }
            if (rail.axis === motion/* PrinterAxis.z */.po.z) {
                if (config.probe != null) {
                    section.push(`endstop_pin: probe:z_virtual_endstop`);
                }
            }
            return section.join("\n") + "\n";
        },
        renderDriverSections () {
            const sections = config.rails.map((r)=>{
                return this.renderDriverSection(r);
            });
            sections.push(this.renderBoardQuirks());
            return sections.join("\n");
        },
        renderDriverSection (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const preset = (0,steppers/* findPreset */.a)(rail.stepper, rail.driver, rail.voltage, rail.current);
            const section = [
                `[${utils.getAxisDriverSectionName(rail.axis)}]`,
                `stealthchop_threshold: ${config.stealthchop ? "9999999" : config.standstillStealth ? "1" : "0"}`,
                `interpolate: ${rail.microstepping < 64 || config.stealthchop ? "True" : "False"}`
            ];
            if (rail.driver.protocol === "UART") {
                section.push(`uart_pin: ${utils.getAxisPinName(rail.axis, "_uart_pin")}`);
            }
            if (rail.driver.protocol === "SPI") {
                section.push(`cs_pin: ${utils.getAxisPinName(rail.axis, "_cs_pin")}`);
                if (config.controlboard.stepperSPI != null) {
                    if ("hardware" in config.controlboard.stepperSPI) {
                        section.push(`spi_bus: ${config.controlboard.stepperSPI.hardware.bus}`);
                    } else {
                        section.push(`spi_software_mosi_pin: ${config.controlboard.stepperSPI.software.mosi}`);
                        section.push(`spi_software_miso_pin: ${config.controlboard.stepperSPI.software.miso}`);
                        section.push(`spi_software_sclk_pin: ${config.controlboard.stepperSPI.software.sclk}`);
                    }
                } else {
                    section.push(`spi_software_mosi_pin: stepper_spi_mosi_pin`);
                    section.push(`spi_software_miso_pin: stepper_spi_miso_pin`);
                    section.push(`spi_software_sclk_pin: stepper_spi_sclk_pin`);
                }
            }
            if (preset) {
                const { driver , voltage , ...rest } = preset;
                Object.entries(rest).forEach(([key, value])=>{
                    section.push(`${key}: ${value}`);
                });
            } else {
                section.push(`run_current: ${rail.current}`);
            }
            return section.join("\n") + "\n";
        },
        renderSpeedLimits () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return [
                `[printer]`,
                `max_velocity: ${config.stealthchop ? "135" : limits.velocity}`,
                `max_accel: ${limits.accel / (config.stealthchop ? 2 : 1)}`,
                `max_accel_to_decel: ${limits.accel / (config.stealthchop ? 4 : 2)}`,
                `max_z_velocity: ${limits.z_velocity}`,
                `max_z_accel: ${limits.z_accel}`,
                `square_corner_velocity: ${limits.square_corner_velocity}`,
                ``,
                `[gcode_macro RatOS]`,
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`
            ].join("\n");
        },
        getMacroTravelSpeed () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "135" : limits.velocity;
        },
        renderBoardQuirks () {
            let result = [];
            if (config.controlboard.hasQuirksFiles) {
                result.push("# Include controlboard quirk file");
                if (config.toolboard != null) {
                    result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace("/dev/", "")}/quirks-toolboard.cfg]`);
                } else {
                    result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace("/dev/", "")}/quirks.cfg]`);
                }
            }
            if (config.toolboard?.hasQuirksFiles) {
                result.push("# Include toolboard quirk file");
                result.push(`[include RatOS/boards/${config.toolboard.serialPath.replace("/dev/", "")}/quirks.cfg]`);
            }
            return result.join("\n");
        },
        renderHotend () {
            let result = [];
            result.push(`[include RatOS/hotends/${config.hotend.id}]`);
            result.push("[extruder]");
            result.push(`sensor_type: ${config.thermistor}`);
            if (config.toolboard != null) {
                result.push("# Use toolboard pins for heater and thermistor");
                result.push("heater_pin: toolboard:e_heater_pin");
                result.push("sensor_pin: toolboard:e_sensor_pin");
            }
            return result.join("\n");
        },
        renderExtruder () {
            let result = [];
            // Get rid of the stepper/driver includes in the extruder config and paste it inline (backwards compatibility with 2.0).
            result.push(`# ${config.extruder.title} definition (from RatOS/extruders/${config.extruder.id})`);
            result.push(utils.stripCommentLines(utils.stripIncludes(this.readInclude(`extruders/${config.extruder.id}`))));
            return result.join("\n");
        },
        renderInputShaper (printerSize) {
            let result = [];
            result.push("[resonance_tester]");
            switch(config.xAccelerometer?.id){
                case "controlboard":
                    result.push("accel_chip_x: adxl345 controlboard");
                    break;
                case "toolboard":
                    if (config.toolboard != null) {
                        result.push("accel_chip_x: adxl345 toolboard");
                        break;
                    }
                case "sbc":
                    result.push("accel_chip_x: adxl345 rpi");
                    break;
                default:
                    result.push("accel_chip_x: adxl345 controlboard");
                    break;
            }
            switch(config.yAccelerometer?.id){
                case "controlboard":
                    result.push("accel_chip_y: adxl345 controlboard");
                    break;
                case "toolboard":
                    if (config.toolboard != null) {
                        result.push("accel_chip_y: adxl345 toolboard");
                        break;
                    }
                case "sbc":
                    result.push("accel_chip_y: adxl345 rpi");
                    break;
                default:
                    result.push("accel_chip_y: adxl345 controlboard");
                    break;
            }
            result.push("probe_points:");
            result.push(`\t${printerSize / 2},${printerSize / 2},20`);
            return result.join("\n");
        },
        renderProbeIncludes () {
            const result = [];
            if (config.probe != null) {
                result.push(`[include RatOS/z-probe/${config.probe.id}]`);
                if (config.toolboard != null && config.probe.id === "bltouch") {
                    result.push("[include RatOS/toolboard/bltouch.cfg]");
                }
            }
            return result.join("\n");
        },
        renderProbePinSection () {
            const result = [];
            if (config.probe != null) {
                switch(config.probe.id){
                    case "bltouch.cfg":
                        result.push(`# BLTouch configuration`);
                        result.push(`[bltouch]`);
                        result.push(`z_offset: 0`);
                        break;
                    case "beacon.cfg":
                        // print reminder about beacon calibration
                        const reminder = [];
                        reminder.push("# REMEMBER TO CALIBRATE YOUR BEACON!");
                        reminder.push("# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon");
                        extrasGenerator.addReminder(reminder.join("\n"));
                        break;
                    default:
                        const pinPrefix = this.getProbePinPrefix();
                        result.push("# Probe configuration");
                        result.push("[probe]");
                        result.push("z_offset: 0.0 # Will be commented out after a successful PROBE_CALIBRATE and SAVE_CONFIG");
                        result.push(`pin: ^${pinPrefix}probe_pin # For NPN NC probes such as the Super Pinda / Vinda / SupCR / Decoprobe probes.`);
                        result.push(`#pin: ^!${pinPrefix}probe_pin # NPN NO (refer to the specs of your probe)`);
                        result.push(`#pin: ${pinPrefix}probe_pin # PNP NO (refer to the specs of your probe)`);
                        result.push(`#pin: !${pinPrefix}probe_pin # PNP NC (refer to the specs of your probe)`);
                        break;
                }
            }
            return result.join("\n");
        },
        renderEndstopSection (pretunedSensorlessConfig) {
            const result = [];
            if (config.xEndstop.id !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical X endstop configuration`);
                result.push(`[stepper_x]`);
                result.push(`endstop_pin: ${this.getXEndstopPinPrefix()}x_endstop_pin`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_x: "endstop"`);
            }
            if (config.yEndstop.id !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Y endstop configuration`);
                result.push(`[stepper_y]`);
                result.push(`endstop_pin: ${this.getYEndstopPinPrefix()}y_endstop_pin`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_y: "endstop"`);
            }
            if (config.xEndstop.id === "sensorless" || config.yEndstop.id === "sensorless") {
                const defaultXRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.x */.po.x);
                const defaultYRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.y */.po.y);
                result.push(""); // Add a newline for readability.
                if (defaultXRail && defaultYRail && pretunedSensorlessConfig != null && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.x */.po.x), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultXRail), config.performanceMode) && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.y */.po.y), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultYRail), config.performanceMode)) {
                    result.push(`[include ${pretunedSensorlessConfig}]`);
                } else {
                    result.push(extrasGenerator.generateSensorlessHomingIncludes());
                }
            }
            if (config.probe == null) {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Z endstop configuration`);
                result.push(`[stepper_z]`);
                result.push(`pin: z_endstop_pin`);
                result.push(`position_endstop: -0.1`);
                result.push(`second_homing_speed: 3.0`);
                result.push(`homing_retract_dist: 3.0`);
            }
            return result.join("\n");
        },
        renderFans () {
            const result = [];
            // Part fan
            result.push(`# Part cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/part-cooling-fan-25khz.cfg]`);
            } else {
                result.push(`[fan]`);
                if (config.toolboard) {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to toolboard fan terminal");
                        result.push(`pin: !toolboard:fan_part_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to toolboard fan terminal");
                        result.push(`pin: toolboard:fan_part_cooling_pin`);
                    }
                } else {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                        result.push(`pin: !fan_part_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to controlboard fan terminal");
                        result.push(`pin: fan_part_cooling_pin`);
                    }
                }
            }
            // Hotend fan
            result.push(``);
            result.push(`# Hotend cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/toolhead-fan-25khz.cfg]`);
            } else {
                result.push(`[heater_fan toolhead_cooling_fan]`);
                if (config.toolboard) {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to toolboard fan terminal");
                        result.push(`pin: !toolboard:fan_toolhead_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to toolboard fan terminal");
                        result.push(`pin: toolboard:fan_toolhead_cooling_pin`);
                    }
                } else {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                        result.push(`pin: !fan_toolhead_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to controlboard fan terminal");
                        result.push(`pin: fan_toolhead_cooling_pin`);
                    }
                }
            }
            // Controller fan
            result.push(``);
            result.push(`# Controller/driver cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/controller-fan-25khz.cfg]`);
            } else {
                result.push(`[controller_fan controller_fan]`);
                if (config.partFan.id === "4pin") {
                    result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                    result.push(`pin: !fan_controller_bard_pin`);
                } else {
                    result.push("# 2 pin fan connected to controlboard fan terminal");
                    result.push(`pin: fan_controller_bard_pin`);
                }
            }
            return result.join("\n");
        },
        renderBase () {
            return [
                `[include RatOS/homing.cfg]`,
                `[include RatOS/macros.cfg]`,
                `[include RatOS/shell-macros.cfg]`
            ].join("\n");
        },
        renderReminders () {
            return extrasGenerator.getReminders().join("\n");
        },
        uncommentIf (condition) {
            return condition === true ? "" : "#";
        }
    };
};

;// CONCATENATED MODULE: ./data/fans.ts
const partFanOptions = (config)=>{
    const fans = [
        {
            id: "2pin",
            title: "2-pin fan"
        },
        {
            id: "4pin",
            title: "4-pin fan"
        }
    ];
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};
const hotendFanOptions = (config)=>{
    const fans = [
        {
            id: "2pin",
            title: "2-pin fan"
        },
        {
            id: "4pin",
            title: "4-pin fan"
        }
    ];
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && config.controllerFan?.id !== "4pin-dedicated") {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};
const controllerFanOptions = (config)=>{
    const fans = [
        {
            id: "2pin",
            title: "2-pin fan"
        },
        {
            id: "4pin",
            title: "4-pin fan"
        }
    ];
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && config.hotendFan?.id !== "4pin-dedicated") {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};

// EXTERNAL MODULE: external "@trpc/server"
var server_ = __webpack_require__(2756);
;// CONCATENATED MODULE: ./helpers/run-script.ts



const runSudoScript = (script, ...args)=>{
    const scriptRoot = getScriptRoot();
    return new Promise((resolve, reject)=>{
        try {
            const child = (0,external_child_process_.spawn)("sudo", [
                external_path_default().join(scriptRoot, script),
                ...args
            ]);
            let stdout = "";
            let stderr = "";
            child.stdout.on("data", (data)=>{
                stdout += data;
            });
            child.stderr.on("data", (data)=>{
                stderr += data;
            });
            child.on("error", (err)=>{
                reject(err);
            });
            child.on("exit", (code)=>{
                if (code === 0) {
                    resolve({
                        stdout,
                        stderr
                    });
                } else {
                    reject("An error occured while attempting to run script");
                }
            });
            child.on("close", (code)=>{
                if (code === 0) {
                    resolve({
                        stderr,
                        stdout
                    });
                } else {
                    reject(stderr);
                }
            });
        } catch (e) {
            if (e instanceof Error) {
                return reject(e.message);
            }
            reject("An error occured while attempting to run script");
        }
    });
};

;// CONCATENATED MODULE: ./server/trpc.ts

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = server_.initTRPC.context().meta().create();
// Base router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;

// EXTERNAL MODULE: external "glob"
var external_glob_ = __webpack_require__(4230);
;// CONCATENATED MODULE: ./server/routers/mcu.ts











const inputSchema = external_zod_.z.object({
    boardPath: external_zod_.z.string()
});
const getBoards = async ()=>{
    const defs = await (0,external_util_.promisify)(external_child_process_.exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
    return external_zod_.z.array(boards/* BoardWithDetectionStatus */.Ai).parse(defs.stdout.split("\n").map((f)=>f.trim() === "" ? null : {
            ...JSON.parse(external_fs_default().readFileSync(f).toString()),
            path: f.replace("board-definition.json", "")
        }).filter((b)=>b != null).map((b)=>{
        b.detected = b != null && "serialPath" in b && b.serialPath != null ? external_fs_default().existsSync(b.serialPath) : false;
        return b;
    }));
};
const getBoardsWithoutHost = (boards)=>{
    return boards.filter((b)=>!b.isHost);
};
const getToolboards = (boards)=>{
    return boards.filter((b)=>b.isToolboard);
};
const getBoardsWithDriverCount = (boards, driverCount)=>{
    return boards.filter((b)=>b.driverCount >= driverCount || b.extruderlessConfig != null && b.driverCount >= driverCount - 1);
};
const mcuMiddleware = middleware(async ({ ctx , next , meta , rawInput  })=>{
    let boards = null;
    const parsedInput = inputSchema.safeParse(rawInput);
    try {
        boards = await getBoards();
        if (meta?.includeHost !== true) {
            boards = getBoardsWithoutHost(boards);
        }
    } catch (e) {
        throw new server_.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
            cause: e
        });
    }
    let board = null;
    if (meta?.boardRequired && !parsedInput.success) {
        throw new server_.TRPCError({
            code: "PRECONDITION_FAILED",
            message: `boardPath parameter missing.`
        });
    }
    if (parsedInput.success) {
        board = boards.find((b)=>b.path === parsedInput.data.boardPath);
        if (board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${parsedInput.data.boardPath}`
            });
        }
    }
    return next({
        ctx: {
            ...ctx,
            boards: boards,
            board: board
        }
    });
});
const mcuProcedure = publicProcedure.use(mcuMiddleware);
const mcuRouter = router({
    boards: mcuProcedure.input(external_zod_.z.object({
        boardFilters: external_zod_.z.object({
            toolboard: external_zod_.z.boolean().optional(),
            driverCountRequired: external_zod_.z.number().optional()
        }).optional()
    })).output(external_zod_.z.array(boards/* BoardWithDetectionStatus */.Ai)).query(({ ctx , input  })=>{
        let boards = ctx.boards;
        if (input.boardFilters?.toolboard === true) {
            boards = getToolboards(boards);
        }
        if (input.boardFilters?.driverCountRequired != null) {
            boards = getBoardsWithDriverCount(boards, input.boardFilters.driverCountRequired);
        }
        return boards;
    }),
    detect: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (external_fs_default().existsSync(ctx.board.serialPath)) {
            return true;
        }
        return false;
    }),
    unidentifiedDevices: mcuProcedure.query(async ({ ctx  })=>{
        const detected = ctx.boards.filter((b)=>b.detected).map((b)=>external_fs_default().realpathSync(b.serialPath));
        return (await (0,external_glob_.glob)("/dev/serial/by-id/usb-Klipper*")).filter((d)=>!detected.includes(external_fs_default().realpathSync(d)));
    }),
    boardVersion: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (process.env.KLIPPER_ENV == null || process.env.KLIPPER_ENV.trim() === "") {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `Environment variable KLIPPER_ENV is missing`
            });
        }
        if (process.env.KLIPPER_DIR == null || process.env.KLIPPER_DIR.trim() === "") {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `Environment variable KLIPPER_DIR is missing`
            });
        }
        const scriptRoot = getScriptRoot();
        // stop klipper
        let version = {
            stdout: ""
        };
        let error = null;
        try {
            await fetch("http://127.0.0.1:7125/machine/services/stop?service=klipper", {
                method: "POST"
            });
            version = await (0,external_util_.promisify)(external_child_process_.exec)(`${external_path_default().join(process.env.KLIPPER_ENV, "bin", "python")} ${external_path_default().join(scriptRoot, "check-version.py")} ${ctx.board.serialPath}`, {
                env: {
                    KLIPPER_DIR: process.env.KLIPPER_DIR,
                    NODE_ENV: "production"
                }
            });
        } catch (e) {
            error = e;
        } finally{
            await fetch("http://127.0.0.1:7125/machine/services/start?service=klipper", {
                method: "POST"
            });
        }
        if (error) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                cause: error
            });
        }
        const versionRegEx = /Version:\s(v\d+\.\d+\.\d+-\d+-\w{9})/;
        return version.stdout.match(versionRegEx)?.[1];
    }),
    compile: mcuProcedure.input(external_zod_.z.object({
        boardPath: external_zod_.z.string()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        let compileResult = null;
        const firmwareBinary = external_path_default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (external_fs_default().existsSync(firmwareBinary)) {
                external_fs_default().rmSync(firmwareBinary);
            }
            const compileScript = external_path_default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await runSudoScript("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
                cause: e
            });
        }
        if (!external_fs_default().existsSync(firmwareBinary)) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
            });
        }
        return "success";
    }),
    flashAllConnected: mcuProcedure.meta({
        boardRequired: false,
        includeHost: true
    }).mutation(async ({ ctx  })=>{
        const connectedBoards = ctx.boards.filter((b)=>external_fs_default().existsSync(b.serialPath) && b.flashScript && b.compileScript && b.disableAutoFlash !== true);
        const flashResults = [];
        for (const b of connectedBoards){
            try {
                const current = boards/* AutoFlashableBoard.parse */.AN.parse(b);
                await runSudoScript("board-script.sh", external_path_default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.compileScript));
                await runSudoScript("board-script.sh", external_path_default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.flashScript));
                flashResults.push({
                    board: b,
                    result: "success"
                });
            } catch (e) {
                const message = e instanceof Error ? e.message : e;
                flashResults.push({
                    board: b,
                    result: "error",
                    message: typeof message === "string" ? message : undefined
                });
            }
        }
        const successCount = flashResults.filter((r)=>r.result === "success").length;
        let report = `${successCount}/${connectedBoards.length} connected board(s) flashed successfully.\n`;
        flashResults.map((r)=>{
            if (r.result === "error") {
                report += `${r.board.manufacturer} ${r.board.name} failed to flash: ${r.message}\n`;
            } else {
                report += `${r.board.manufacturer} ${r.board.name} was successfully flashed.\n`;
            }
        });
        return report;
    }),
    flashViaPath: mcuProcedure.input(external_zod_.z.object({
        boardPath: external_zod_.z.string(),
        flashPath: external_zod_.z.string().optional()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (ctx.board.flashScript == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `${ctx.board.name} does not support automatic flashing via serial path.`
            });
        }
        if (input.flashPath && !external_fs_default().existsSync(input.flashPath)) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `The path ${input.flashPath} does not exist.`
            });
        }
        let compileResult = null;
        const firmwareBinary = external_path_default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (external_fs_default().existsSync(firmwareBinary)) {
                external_fs_default().rmSync(firmwareBinary);
            }
            const compileScript = external_path_default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await runSudoScript("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult?.stdout ?? message}'}`,
                cause: e
            });
        }
        if (!external_fs_default().existsSync(firmwareBinary)) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
            });
        }
        let flashResult = null;
        try {
            const flashScript = external_path_default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.flashScript);
            flashResult = input.flashPath ? await runSudoScript("flash-path.sh", ctx.board.serialPath, input.flashPath) : await runSudoScript("board-script.sh", flashScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult?.stdout ?? message}'}`,
                cause: e
            });
        }
        if (!external_fs_default().existsSync(ctx.board.serialPath)) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult.stdout}`
            });
        }
        return "success";
    }),
    dfuDetect: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(async ({ ctx , input  })=>{
        const dfuDeviceCount = parseInt((await (0,external_util_.promisify)(external_child_process_.exec)('lsusb | grep "0483:df11" | wc -l')).stdout, 10);
        if (dfuDeviceCount === 1) {
            return true;
        }
        if (dfuDeviceCount > 1) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: "Multiple DFU devices detected, please disconnect the other devices."
            });
        }
        return false;
    }),
    dfuFlash: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) return; // middleware takes care of the error message.
        if (ctx.board.dfu == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: "Board does not support DFU."
            });
        }
        let compileResult = null;
        const firmwareBinary = external_path_default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (external_fs_default().existsSync(firmwareBinary)) {
                external_fs_default().rmSync(firmwareBinary);
            }
            const compileScript = external_path_default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await runSudoScript("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${message}`,
                cause: e
            });
        }
        if (!external_fs_default().existsSync(firmwareBinary)) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${compileResult.stdout} ${compileResult.stderr}`
            });
        }
        try {
            const flashResult = await runSudoScript("dfu-flash.sh", ctx.board.serialPath);
            return flashResult.stdout;
        } catch (e) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to flash device",
                cause: e
            });
        }
    })
});

;// CONCATENATED MODULE: ./data/accelerometers.ts
const xAccelerometerOptions = (config)=>{
    const accelerometers = [
        {
            id: "none",
            title: "None"
        },
        {
            id: "sbc",
            title: "Wired to Host Computer"
        }
    ];
    if (config?.controlboard?.ADXL345SPI != null) {
        accelerometers.push({
            id: "controlboard",
            title: "Wired to Controlboard"
        });
    }
    if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};
const yAccelerometerOptions = (config)=>{
    const accelerometers = [
        {
            id: "none",
            title: "None"
        },
        {
            id: "sbc",
            title: "Wired to Host Computer"
        }
    ];
    if (config?.controlboard?.ADXL345SPI != null) {
        accelerometers.push({
            id: "controlboard",
            title: "Wired to Controlboard"
        });
    }
    if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};

// EXTERNAL MODULE: ./hooks/usePrinterConfiguration.tsx
var usePrinterConfiguration = __webpack_require__(2312);
;// CONCATENATED MODULE: ./server/routers/printer.ts



















function isNodeError(error) {
    return error instanceof Error;
}
const parseDirectory = async (directory, zod)=>{
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
    return (await Promise.all(defs.map((f)=>f.trim()).filter((f)=>f !== "").map(async (f)=>{
        const parsedFile = await parseMetadata(f, zod);
        if (parsedFile == null) {
            getLogger().error(`No metadata present in ${f} skipping..`);
            return null;
        }
        return parsedFile;
    }))).filter((f)=>f != null);
};
const getPrinters = async ()=>{
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
    return external_zod_.z.array(printer/* Printer */.F).parse(defs.map((f)=>f.trim() === "" ? null : {
            ...JSON.parse((0,external_fs_.readFileSync)(f).toString()),
            path: f.replace("printer-definition.json", ""),
            id: f.replace("/printer-definition.json", "").split("/").pop()
        }).filter((f)=>f != null));
};
const isPrinterCfgInitialized = async ()=>{
    const environment = schema.serverSchema.parse(process.env);
    try {
        await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, "printer.cfg"), external_fs_.constants.F_OK);
    } catch (e) {
        if (isNodeError(e) && e.code === "ENOENT") {
            // File does not exist, resume as normal.
            return false;
        } else {
            throw e;
        }
    }
    const currentcfg = await (0,external_util_.promisify)(external_fs_.readFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, "printer.cfg"));
    return currentcfg.indexOf("[include RatOS/printers/initial-setup.cfg]") === -1;
};
const deserializePartialPrinterConfiguration = async (config)=>{
    const boards = await getBoards();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolboard = boards.find((b)=>b.serialPath === config?.toolboard);
    return printer_configuration/* PartialPrinterConfiguration.parse */.jz.parse({
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        hotend: (await parseDirectory("hotends", hardware/* Hotend */.Uy)).find((h)=>h.id === config?.hotend),
        extruder: (await parseDirectory("extruders", hardware/* Extruder */.U3)).find((e)=>e.id === config?.extruder),
        probe: (await parseDirectory("z-probe", hardware/* Probe */.lV)).find((p)=>p.id === config?.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config?.thermistor),
        xEndstop: (0,endstops/* xEndstopOptions */.uo)(config).find((e)=>e.id === config?.xEndstop),
        yEndstop: (0,endstops/* yEndstopOptions */.Xo)(config).find((e)=>e.id === config?.yEndstop),
        partFan: partFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.partFan),
        hotendFan: hotendFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.hotendFan),
        controllerFan: controllerFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        toolboard: toolboard,
        xAccelerometer: xAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth
    });
};
const deserializePrinterConfiguration = async (config)=>{
    const boards = await getBoards();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolboard = boards.find((b)=>b.serialPath === config?.toolboard);
    return printer_configuration/* PrinterConfiguration.parse */.dl.parse({
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        hotend: (await parseDirectory("hotends", hardware/* Hotend */.Uy)).find((h)=>h.id === config?.hotend),
        extruder: (await parseDirectory("extruders", hardware/* Extruder */.U3)).find((e)=>e.id === config?.extruder),
        probe: (await parseDirectory("z-probe", hardware/* Probe */.lV)).find((p)=>p.id === config?.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config?.thermistor),
        xEndstop: (0,endstops/* xEndstopOptions */.uo)(config).find((e)=>e.id === config?.xEndstop),
        yEndstop: (0,endstops/* yEndstopOptions */.Xo)(config).find((e)=>e.id === config?.yEndstop),
        partFan: partFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.partFan),
        hotendFan: hotendFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.hotendFan),
        controllerFan: controllerFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        toolboard: toolboard,
        xAccelerometer: xAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth,
        rails: config?.rails.map((r)=>(0,serialization/* deserializePrinterRail */.Ak)(r))
    });
};
const getTimeStamp = ()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, "0");
    let min = String(today.getMinutes()).padStart(2, "0");
    let sec = String(today.getSeconds()).padStart(2, "0");
    return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
};
const generateKlipperConfiguration = async (config, overwritePrinterCfg = false, overwriteExtras)=>{
    const utils = constructKlipperConfigUtils(config);
    const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
    const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
    const { template , initialPrinterCfg  } = await __webpack_require__(5866)(`./${config.printer.template.replace("-printer.template.cfg", ".ts")}`);
    const environment = schema.serverSchema.parse(process.env);
    const renderedTemplate = template(config, helper).trim();
    const renderedPrinterCfg = initialPrinterCfg(config, helper).trim();
    const extras = extrasGenerator.getFilesToWrite(overwriteExtras);
    const filesToWrite = extras.concat([
        {
            fileName: "RatOS.cfg",
            content: renderedTemplate,
            overwrite: true
        },
        {
            fileName: "printer.cfg",
            content: renderedPrinterCfg,
            overwrite: !await isPrinterCfgInitialized() || overwritePrinterCfg
        }
    ]);
    const results = await Promise.all(filesToWrite.map(async (file)=>{
        let action = "created";
        try {
            await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_fs_.constants.F_OK);
            // At this point we know the file exists;
            if (file.overwrite) {
                const backupFilename = `${file.fileName.split(".").slice(0, -1).join(".")}-${getTimeStamp()}.cfg`;
                try {
                    await (0,external_util_.promisify)(external_fs_.copyFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_path_default().join(environment.KLIPPER_CONFIG_PATH, backupFilename));
                } catch (e) {
                    return {
                        fileName: file.fileName,
                        action: "error",
                        err: e
                    };
                }
                action = "overwritten";
            } else {
                // Skip this file.
                return {
                    fileName: file.fileName,
                    action: "skipped"
                };
            }
        } catch (e) {
            if (isNodeError(e) && e.code === "ENOENT") {
            // File does not exist, resume as normal.
            } else {
                // Unknown error, abort.
                return {
                    fileName: file.fileName,
                    action: "error",
                    err: e
                };
            }
        }
        try {
            await (0,external_util_.promisify)(external_fs_.writeFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), file.content);
            return {
                fileName: file.fileName,
                action: action
            };
        } catch (e) {
            return {
                fileName: file.fileName,
                action: "error",
                err: e
            };
        }
    }));
    const errors = results.filter((r)=>r.action === "error");
    if (errors.length > 0) {
        throw new Error("Something went wrong when saving the configuration. The following files couldn't be written: " + errors.map((e)=>e.fileName).join(", "));
    }
    try {
        await (0,external_util_.promisify)(external_fs_.writeFile)(external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json"), JSON.stringify((0,usePrinterConfiguration/* serializePrinterConfiguration */.h$)(config)));
    } catch (e) {
        throw new Error("Couldn't backup your current printer settings to disk, but your klipper configuration has been generated.");
    }
};
const regenerateKlipperConfiguration = async ()=>{
    const environment = schema.serverSchema.parse(process.env);
    const configJson = (0,external_fs_.readFileSync)(external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json"));
    const serializedConfig = printer_configuration/* SerializedPrinterConfiguration.parse */.q_.parse(JSON.parse(configJson.toString()));
    const config = await deserializePrinterConfiguration(serializedConfig);
    return await generateKlipperConfiguration(config);
};
const printerRouter = router({
    printers: publicProcedure.output(external_zod_.z.array(printer/* Printer */.F)).query(async ()=>(await getPrinters()).sort((a, b)=>a.manufacturer === "Rat Rig" && (b.manufacturer !== "Rat Rig" || b.description.indexOf("Discontinued") > -1) ? -1 : a.name.localeCompare(b.name))),
    hotends: publicProcedure.output(external_zod_.z.array(hardware/* Hotend */.Uy)).query(()=>parseDirectory("hotends", hardware/* Hotend */.Uy)),
    extruders: publicProcedure.output(external_zod_.z.array(hardware/* Extruder */.U3)).query(()=>parseDirectory("extruders", hardware/* Extruder */.U3)),
    probes: publicProcedure.output(external_zod_.z.array(hardware/* Probe */.lV)).query(()=>parseDirectory("z-probe", hardware/* Probe */.lV)),
    thermistors: publicProcedure.query(()=>hardware/* thermistors */.b6),
    xEndstops: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Endstop */.ws)).query((ctx)=>(0,endstops/* xEndstopOptions */.uo)(ctx.input)),
    yEndstops: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Endstop */.ws)).query((ctx)=>(0,endstops/* yEndstopOptions */.Xo)(ctx.input)),
    partFanOptions: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>partFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    hotendFanOptions: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>hotendFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    controllerFanOptions: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>controllerFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    xAccelerometerOptions: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>xAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    yAccelerometerOptions: publicProcedure.input(printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>yAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    printercfgStatus: publicProcedure.query(async (ctx)=>{
        return {
            isInitialized: await isPrinterCfgInitialized()
        };
    }),
    regenerateConfiguration: publicProcedure.mutation(async ()=>{
        return await regenerateKlipperConfiguration();
    }),
    saveConfiguration: publicProcedure.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPrinterConfiguration */.q_,
        overwritePrinterCfg: external_zod_.z.boolean().default(false)
    })).mutation(async (ctx)=>{
        const { config: serializedConfig , overwritePrinterCfg  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        return await generateKlipperConfiguration(config, overwritePrinterCfg);
    })
});


/***/ }),

/***/ 5866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./extras/sensorless-homing": [
		1096,
		680,
		96
	],
	"./extras/sensorless-homing.ts": [
		1096,
		680,
		96
	],
	"./prusa-mini": [
		9313,
		313
	],
	"./prusa-mini.ts": [
		9313,
		313
	],
	"./prusa-mk3s": [
		3351,
		351
	],
	"./prusa-mk3s.ts": [
		3351,
		351
	],
	"./v-core-3": [
		9263,
		680,
		263
	],
	"./v-core-3.ts": [
		9263,
		680,
		263
	],
	"./v-core-pro": [
		1028,
		680,
		28
	],
	"./v-core-pro.ts": [
		1028,
		680,
		28
	],
	"./v-minion": [
		2525,
		680,
		525
	],
	"./v-minion.ts": [
		2525,
		680,
		525
	],
	"./voron-v01": [
		1881,
		680,
		881
	],
	"./voron-v01.ts": [
		1881,
		680,
		881
	],
	"./voron-v24": [
		3187,
		187
	],
	"./voron-v24.ts": [
		3187,
		187
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 5866;
module.exports = webpackAsyncContext;

/***/ })

};
;