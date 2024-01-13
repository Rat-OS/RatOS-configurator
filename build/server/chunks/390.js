exports.id = 390;
exports.ids = [390];
exports.modules = {

/***/ 6390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "deserializePartialPrinterConfiguration": () => (/* binding */ deserializePartialPrinterConfiguration),
  "deserializePartialToolheadConfiguration": () => (/* binding */ deserializePartialToolheadConfiguration),
  "deserializePrinterConfiguration": () => (/* binding */ deserializePrinterConfiguration),
  "deserializeToolheadConfiguration": () => (/* binding */ deserializeToolheadConfiguration),
  "getFilesToWrite": () => (/* binding */ getFilesToWrite),
  "getPrinters": () => (/* binding */ getPrinters),
  "loadSerializedConfig": () => (/* binding */ loadSerializedConfig),
  "parseDirectory": () => (/* binding */ parseDirectory),
  "printerRouter": () => (/* binding */ printerRouter),
  "regenerateKlipperConfiguration": () => (/* binding */ regenerateKlipperConfiguration)
});

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: ./server/helpers/logger.ts
var logger = __webpack_require__(799);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: external "readline"
var external_readline_ = __webpack_require__(4521);
// EXTERNAL MODULE: ./env/schema.mjs
var schema = __webpack_require__(6165);
// EXTERNAL MODULE: ./zods/boards.tsx
var zods_boards = __webpack_require__(95);
;// CONCATENATED MODULE: ./helpers/util.ts
const getScriptRoot = ()=>{
    // This is ... not great.. come up with something better
    return process.env.RATOS_SCRIPT_DIR ?? __dirname.split("configurator/")[0] + "configurator/scripts/";
};

// EXTERNAL MODULE: external "node-cache"
var external_node_cache_ = __webpack_require__(4580);
var external_node_cache_default = /*#__PURE__*/__webpack_require__.n(external_node_cache_);
;// CONCATENATED MODULE: ./server/helpers/cache.ts

const ServerCache = new (external_node_cache_default())({
    useClones: false
});
const MetadataCache = new (external_node_cache_default())({
    useClones: false
});
const cachePromiseLookup = new Map();
const now = new Date().getTime();
const cacheAsyncMetadataFn = (fn, key, cache)=>{
    return async (fileName)=>{
        let result = cache.get(`${key}-${fileName}`);
        if (result == null) {
            let promise = cachePromiseLookup.get(`${key}-${fileName}`);
            if (promise == null) {
                promise = fn(fileName);
                cachePromiseLookup.set(`${key}-${fileName}`, promise);
            } else {}
            const val = await promise;
            cache.set(`${key}-${fileName}`, val);
            return val;
        }
        return result;
    };
};
const cacheMetadataFn = (fn, key, cache)=>{
    return (fileName)=>{
        let result = cache.get(`${key}-${fileName}`);
        if (result == null) {
            const val = fn(fileName);
            cache.set(`${key}-${fileName}`, val);
            return val;
        }
        return result;
    };
};

;// CONCATENATED MODULE: ./server/helpers/metadata.ts










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
        content.id = fileName.replace(/\.cfg$/g, "");
        return zod.parse(content);
    } catch (e) {
        if (e instanceof Error) {
            (0,logger.getLogger)().error(e.message);
        }
        throw new Error("Failed to parse JSON from file: " + cfgFile + " with content: " + jsonArray.join("\n"));
    }
};
const parsePinValue = (value)=>{
    if (value === "null") {
        return undefined;
    }
    if (value.startsWith("<") && value.endsWith(">")) {
        return undefined;
    }
    return value;
};
const parsePinAlias = cacheAsyncMetadataFn(async (file)=>{
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
        pins[frags[0]] = parsePinValue(frags[1]);
    });
    return pins;
}, "parsePinAlias", MetadataCache);
const exportBoardPinAlias = (pinAlias, pins, mcu)=>{
    const aliases = Object.keys(pins).map((k, i)=>{
        if (pins[k] == null) {
            return k + "=null";
        }
        return k + "=" + pins[k];
    });
    const result = [
        `[board_pins ${pinAlias}]`
    ];
    if (mcu != null) {
        result.push(`mcu: ${mcu}`);
    }
    result.push(`aliases:`, `\t${aliases.join(",\n	")}`);
    return result.join("\n");
};
const parseBoardPinConfig = async (board, extruderLess)=>{
    let file = external_path_default().join(board.path, board.isToolboard ? "toolboard-config.cfg" : extruderLess && board.extruderlessConfig != null ? board.extruderlessConfig : "config.cfg");
    const zod = board.isToolboard ? zods_boards/* ToolboardPinMap */.Oy : extruderLess ? zods_boards/* ExtruderlessControlBoardPinMap */.Fh : zods_boards/* ControlBoardPinMap */.MW;
    return zod.parse(await parsePinAlias(file));
};
const extractMcuFromFirmwareConfig = cacheAsyncMetadataFn(async (filePath)=>{
    if (!(0,external_fs_.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,external_fs_.createReadStream)(filePath);
    const rl = (0,external_readline_.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    const startOfMCULine = `CONFIG_MCU="`;
    for await (const line of rl){
        // Each line in input.txt will be successively available here as `line`.
        if (line.startsWith(startOfMCULine)) {
            return line.substring(startOfMCULine.length, line.length - 2);
        }
    }
    throw new Error("Failed to find MCU in firmware config file: " + filePath);
}, "extractMcuFromFirmwareConfig", MetadataCache);
const getExtruderRotationDistance = cacheMetadataFn((extruderId)=>{
    const environment = schema.serverSchema.parse(process.env);
    const extruderCfgPath = external_path_default().join(environment.RATOS_CONFIGURATION_PATH, "extruders", extruderId + ".cfg");
    const scriptRoot = getScriptRoot();
    const configUnparsed = (0,external_child_process_.execSync)(`python3 ${external_path_default().join(scriptRoot, "initojson.py")} ${extruderCfgPath}`);
    const config = JSON.parse(configUnparsed.toString());
    if (config == null) {
        throw new Error("Failed to parse config file: " + extruderCfgPath);
    }
    const extruderSection = Object.keys(config).find((section)=>section.startsWith("extruder"));
    if (extruderSection == null) {
        throw new Error("Failed to find extruder section in config file: " + extruderCfgPath);
    }
    const extruder = config[extruderSection];
    if (extruder == null || extruder.rotation_distance == null) {
        throw new Error("Failed to find extruder rotation distance");
    }
    return extruder.rotation_distance;
}, "getExtruderRotationDistance", MetadataCache);
const readInclude = (fileName)=>{
    const environment = schema.serverSchema.parse(process.env);
    const fullPath = external_path_default().join(environment.RATOS_CONFIGURATION_PATH, fileName);
    if (!(0,external_fs_.existsSync)(fullPath)) {
        throw new Error("Extruder config file doesn't exist: " + fileName);
    }
    return (0,external_fs_.readFileSync)(fullPath, "utf-8");
};
const stripIncludes = (content)=>{
    return stripLinesStartingWith(content, "[include");
};
const stripCommentLines = (content)=>{
    return stripLinesStartingWith(content, "#");
};
const stripLinesStartingWith = (content, start)=>{
    return content.split("\n").filter((l)=>!l.trim().startsWith(start)).join("\n");
};
const stripDriverSections = (content)=>{
    let insideDriverSection = false;
    return content.split("\n").map((l)=>{
        if (l.trim().startsWith("[tmc")) {
            insideDriverSection = true;
        }
        if (insideDriverSection) {
            if (l.trim().startsWith("[")) {
                insideDriverSection = false;
            } else {
                return null;
            }
        }
        return l;
    }).filter((l)=>l != null).join("\n");
};
const replaceLinesStartingWith = (content, start, replace)=>{
    return content.split("\n").map((l)=>l.trim().startsWith(start) ? replace : l).join("\n");
};

// EXTERNAL MODULE: ./zods/hardware.tsx
var hardware = __webpack_require__(7670);
// EXTERNAL MODULE: ./zods/printer.tsx
var zods_printer = __webpack_require__(5996);
// EXTERNAL MODULE: ./zods/printer-configuration.tsx
var printer_configuration = __webpack_require__(4342);
// EXTERNAL MODULE: ./zods/toolhead.tsx
var toolhead = __webpack_require__(4130);
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
// EXTERNAL MODULE: ./helpers/toolhead.ts
var helpers_toolhead = __webpack_require__(7187);
;// CONCATENATED MODULE: ./helpers/board.ts
const getBoardSerialPath = (board, toolhead)=>{
    if (board.isHost && "serialPath" in board && board.serialPath != null) {
        return board.serialPath;
    }
    return "/dev/RatOS/" + getBoardChipId(board, toolhead);
};
const getBoardChipId = (board, toolhead)=>{
    if (board.isHost) {
        throw new Error("Cannot get chip ID for a host board");
    }
    return board.id + (toolhead ? `-${toolhead.getSerialSuffix()}` : "");
};

;// CONCATENATED MODULE: ./server/helpers/config-generation/toolhead.ts




class ToolheadGenerator extends helpers_toolhead/* ToolheadHelper */.D {
    static async fromConfig(config, controlPins) {
        const toolboardPins = config.toolboard ? await parseBoardPinConfig(config.toolboard) : null;
        return new ToolheadGenerator(config, toolboardPins, controlPins);
    }
    constructor(toolhead, toolboardPins, controlboardPins){
        super(toolhead);
        this.toolboardPins = toolboardPins;
        this.controlboardPins = controlboardPins;
    }
    requireControlboardPin(pin) {
        if (this.controlboardPins?.[pin] == null) {
            throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for ${pin}, but the controlboard does not define a pin with that name.`);
        }
    }
    requireToolboardPin(pin) {
        if (this.toolboardPins?.[pin] == null) {
            throw new Error(`Toolhead ${this.getTool()} is configured to use the toolboard for ${pin}, but the toolboard does not define a pin with that name.`);
        }
    }
    getExtruderToolAxisPinPrefix() {
        if (this.getTool() === 0) {
            return "";
        }
        return this.getTool();
    }
    getToolheadPin(axis, alias) {
        const prefix = axis === this.getExtruderAxis() ? this.getPinPrefix() : "";
        const axisAlias = axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis !== this.getExtruderAxis() ? axis : this.getToolboard() != null ? "e" : "e" + this.getExtruderToolAxisPinPrefix();
        const pinName = axisAlias + alias;
        let pinValue = null;
        try {
            pinValue = this.getPinFromAlias(pinName);
        } catch (e) {
            pinValue = null;
        }
        if (pinValue == null) {
            throw new Error(`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found on toolhead ${this.getToolCommand()} with extruder axis ${this.getExtruderAxis()}. Resolved axis alias ${axisAlias}. Searched in ${this.getToolboard() ? "toolboard" : "controlboard"}`);
        }
        return prefix + pinValue;
    }
    getPinFromAlias(alias) {
        let pin = null;
        if (this.getToolboard()) {
            if (this.toolboardPins?.[alias] != null) {
                pin = this.toolboardPins[alias];
            } else {
                throw new Error(`Alias "${alias}" not found in toolboard pin definition.`);
            }
        } else if (this.controlboardPins?.[alias] != null) {
            pin = this.controlboardPins[alias];
        }
        if (pin != null) {
            return pin;
        }
        throw new Error(`Unknown pin alias ${alias}`);
    }
    getXEndstopPin() {
        let pin;
        switch(this.getXEndstop().id){
            case "endstop":
                if (this.controlboardPins?.x_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no x_endstop_pin`);
                }
                pin = this.controlboardPins.x_endstop_pin;
                break;
            case "endstop-toolboard":
                if (this.toolboardPins?.x_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no x_endstop_pin`);
                }
                pin = this.getPinPrefix() + this.toolboardPins.x_endstop_pin;
                break;
            default:
                throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
        }
        return pin;
    }
    getYEndstopPin() {
        let pin;
        switch(this.getYEndstop().id){
            case "endstop":
                if (this.controlboardPins?.y_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no y_endstop_pin`);
                }
                pin = this.controlboardPins.y_endstop_pin;
                break;
            case "endstop-toolboard":
                if (this.toolboardPins?.y_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no y_endstop_pin`);
                }
                pin = this.getPinPrefix() + this.toolboardPins.y_endstop_pin;
                break;
            default:
                throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
        }
        return pin;
    }
    getPinPrefix() {
        if (this.config.toolboard) {
            return `${this.getToolboardName()}:`;
        } else {
            return ""; // use controlboard
        }
    }
    renderToolboard() {
        const pins = this.toolboardPins;
        const toolboard = this.config.toolboard;
        if (toolboard == null || pins == null) {
            return "";
        }
        const result = [
            "",
            exportBoardPinAlias(this.getToolboardName(), pins, this.getToolboardName()),
            "",
            `[mcu ${this.getToolboardName()}]`,
            `serial: ${getBoardSerialPath(toolboard, this)}`
        ];
        if (toolboard.hasMcuTempSensor) {
            result.push(""); // Add a newline for readability.
            result.push(`[temperature_sensor ${toolboard.name.replace(/\s/g, "_")}_${this.getToolCommand()}]`);
            result.push(`sensor_type: temperature_mcu`);
            result.push(`sensor_mcu: ${this.getToolboardName()}`);
        }
        if (toolboard.ADXL345SPI != null) {
            result.push(""); // Add a newline for readability.
            result.push(`[adxl345 ${this.getToolboardName()}]`);
            result.push(`cs_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.cs_pin}`);
            if ("hardware" in toolboard.ADXL345SPI) {
                result.push(`spi_bus: ${toolboard.ADXL345SPI.hardware.bus}`);
            } else {
                result.push(`spi_software_mosi_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.mosi}`);
                result.push(`spi_software_miso_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.miso}`);
                result.push(`spi_software_sclk_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.sclk}`);
            }
        }
        if (toolboard.outputPins != null) {
            toolboard.outputPins.forEach((pindef)=>{
                result.push(""); // Add a newline for readability.
                result.push(`[output_pin ${pindef.name}]`);
                result.push(`pin: ${this.getPinPrefix()}${pindef.pin}`);
                result.push(`value: ${pindef.value}`);
            });
        }
        return result.join("\n");
    }
    renderHotend() {
        // Todo parse modify and output hotend config
        let result = [];
        let hotend = readInclude(`hotends/${this.getHotend().id}.cfg`);
        hotend = stripCommentLines(hotend);
        hotend = stripIncludes(hotend);
        hotend = replaceLinesStartingWith(hotend, "[extruder]", `[${this.getExtruderAxis()}]`);
        hotend = replaceLinesStartingWith(hotend, "heater_pin", `heater_pin: ${this.getToolheadPin(this.getExtruderAxis(), "_heater_pin")}`);
        hotend = replaceLinesStartingWith(hotend, "sensor_pin", `sensor_pin: ${this.getToolheadPin(this.getExtruderAxis(), "_sensor_pin")}`);
        if (this.getThermistor() === "PT1000" && this.getToolboard()?.alternativePT1000Resistor != null) {
            if (hotend.split("\n").some((line)=>line.trim().startsWith("pullup_resistor"))) {
                hotend = replaceLinesStartingWith(hotend, "pullup_resistor", `pullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`);
            } else {
                hotend = replaceLinesStartingWith(hotend, "sensor_type", `sensor_type: ${this.getThermistor()}\npullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`);
            }
        } else {
            hotend = replaceLinesStartingWith(hotend, "sensor_type", `sensor_type: ${this.getThermistor()}`);
        }
        result.push(`# ${this.getToolCommand()} ${this.getHotend().title} definition (from RatOS/hotends/${this.getHotend().id}.cfg)`);
        result.push(hotend.trim());
        return result.join("\n");
    }
    renderExtruder() {
        let result = [];
        // Get rid of the stepper/driver includes in the extruder config and paste it inline (backwards compatibility with 2.0).
        result.push(`# ${this.getToolCommand()} ${this.getExtruder().title} definition (from RatOS/extruders/${this.getExtruder().id}.cfg)`);
        let extruder = stripCommentLines(stripIncludes(stripDriverSections(readInclude(`extruders/${this.getExtruder().id}.cfg`))));
        extruder = replaceLinesStartingWith(extruder, "[extruder]", `[${this.getExtruderAxis()}]`);
        result.push(extruder.trim());
        return result.join("\n");
    }
    renderPartFan(multipleToolheadPartFans = false) {
        let result = [];
        if (multipleToolheadPartFans) {
            const fanName = `part_fan_${this.getShortToolName()}`;
            result.push(`[fan_generic ${fanName}]`);
        } else {
            result.push(`[fan]`);
        }
        switch(this.getPartFan().id){
            case "2pin":
                this.requireControlboardPin("fan_part_cooling_pin");
                result.push(`# 2-pin fan connected to the controller board`);
                result.push(`pin: ${this.controlboardPins?.fan_part_cooling_pin}`);
                break;
            case "4pin":
                this.requireControlboardPin("fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to the controller board`);
                result.push(`pin: !${this.controlboardPins?.fan_part_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated":
                this.requireControlboardPin("4p_fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                result.push(`pin: !${this.controlboardPins?.["4p_fan_part_cooling_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.controlboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            case "2pin-toolboard":
                this.requireToolboardPin("fan_part_cooling_pin");
                result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
                break;
            case "4pin-toolboard":
                this.requireToolboardPin("fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated-toolboard":
                this.requireToolboardPin("4p_fan_part_cooling_tach_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.toolboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ${this.toolboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            default:
                throw new Error(`Unsupported part cooling fan option "${this.getHotendFan().title}"`);
        }
        return result.join("\n");
    }
    renderHotendFan() {
        let result = [];
        result.push(`[heater_fan toolhead_cooling_fan${this.getTool() > 0 ? `_${this.getShortToolName()}` : ""}]`);
        switch(this.getHotendFan().id){
            case "2pin":
                this.requireControlboardPin("fan_toolhead_cooling_pin");
                result.push(`# 2-pin fan connected to the controller board`);
                result.push(`pin: ${this.controlboardPins?.fan_toolhead_cooling_pin}`);
                break;
            case "4pin":
                this.requireControlboardPin("fan_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to the controller board`);
                result.push(`pin: !${this.controlboardPins?.fan_toolhead_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated":
                this.requireControlboardPin("4p_fan_part_cooling_tach_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                result.push(`pin: !${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.controlboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ^${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            case "2pin-toolboard":
                this.requireToolboardPin("fan_toolhead_cooling_pin");
                result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
                break;
            case "4pin-toolboard":
                this.requireToolboardPin("fan_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated-toolboard":
                this.requireToolboardPin("4p_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.["4p_toolhead_cooling_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.toolboardPins?.["4p_toolhead_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ^${this.toolboardPins?.["4p_toolhead_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            default:
                throw new Error(`Unsupported hotend fan option "${this.getHotendFan().title}"`);
        }
        return result.join("\n");
    }
}

;// CONCATENATED MODULE: ./server/helpers/klipper-config.ts








const constructKlipperConfigUtils = async (config)=>{
    const toolboardDriverCount = config.toolheads.reduce((prev, current)=>prev + (current.toolboard?.driverCount ?? 0), 0);
    const extruderLessConfigBonus = config.controlboard.extruderlessConfig != null ? 1 : 0;
    const isExtruderlessBoard = config.printer.driverCountRequired > config.controlboard.driverCount;
    const cbPins = await parseBoardPinConfig(config.controlboard, isExtruderlessBoard);
    const toolheads = await Promise.all(config.toolheads.map(async (thConfig)=>{
        if (thConfig.toolboard == null) {
            if (isExtruderlessBoard) {
                throw new Error("A toolboard is required when using an extruderless controlboard configuration (your controlboard alone does not have enough drivers for this printer). Please add a toolboard to your configuration.");
            }
            return await ToolheadGenerator.fromConfig(thConfig, cbPins);
        }
        return await ToolheadGenerator.fromConfig(thConfig, cbPins);
    }));
    return {
        extruderLessConfigBonus,
        isExtruderlessBoard,
        toolboardDriverCount,
        getControlboardPins: ()=>{
            return {
                ...cbPins
            };
        },
        requireControlboardPin (pin) {
            if (this.getControlboardPins()[pin] == null) {
                throw new Error(`The controlboard has no "${pin}" defined in its config.`);
            }
        },
        isExtruderToolheadAxis (axis) {
            return toolheads.some((th)=>th.getExtruderAxis() === axis);
        },
        getToolhead: (toolOrAxis)=>{
            const th = typeof toolOrAxis === "number" ? toolheads.find((th)=>th.getTool() === toolOrAxis) : toolheads.find((th)=>th.getExtruderAxis() === toolOrAxis || th.getMotionAxis() === toolOrAxis);
            if (th == null) {
                throw new Error(`No toolhead found for tool/axis ${toolOrAxis}`);
            }
            return th;
        },
        renderCommentHeader (text, lines) {
            const separator = `------------------------------------------------------------------------------------------------------------`;
            const textPadding = (separator.length - text.length - 2) / 2;
            const separatorWithText = `#${"-".repeat(Math.floor(textPadding))} ${text} ${"-".repeat(Math.ceil(textPadding))}`;
            return [
                separatorWithText,
                ...lines,
                `#${separator}`
            ];
        },
        getToolheads: ()=>{
            return toolheads.slice();
        },
        getRail (axis) {
            const rail = config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            return rail;
        },
        getAxisPin (axis, alias) {
            const pinName = (axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis) + alias;
            let pinValue = null;
            if (this.isExtruderToolheadAxis(axis)) {
                pinValue = this.getToolhead(axis).getToolheadPin(axis, alias);
            } else {
                const rail = this.getRail(axis);
                const slotPin = alias.startsWith("_") ? alias.substring(1) : alias;
                if (config.controlboard.motorSlots != null && rail.motorSlot != null && slotPin in config.controlboard.motorSlots[rail.motorSlot]) {
                    pinValue = config.controlboard.motorSlots[rail.motorSlot][slotPin];
                    if (pinValue == null) {
                        throw new Error(`Motor slot was selected, but pin ${slotPin} wasn't found in motor slot config.`);
                    }
                } else {
                    pinValue = cbPins[pinName];
                }
            }
            if (pinValue == null) {
                throw new Error(`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found in board pin configs.`);
            }
            return pinValue;
        },
        getAxisStepperName (axis) {
            if (axis === motion/* PrinterAxis.extruder */.po.extruder) {
                return "extruder";
            }
            if (axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                return "extruder1";
            }
            if (axis === motion/* PrinterAxis.dual_carriage */.po.dual_carriage) {
                return "dual_carriage";
            }
            return "stepper" + "_" + axis;
        },
        getAxisDriverType (axis) {
            return this.getRail(axis).driver.type.toLowerCase();
        },
        getAxisDriverVariables (axis, enumerate = false, additionalAxes = []) {
            const rails = config.rails.filter((r)=>(enumerate ? r.axis.startsWith(axis) : r.axis === axis) || additionalAxes.includes(r.axis));
            const variables = [];
            variables.push(`variable_${axis}_driver_types: [${rails.map((r)=>`"${r.driver.type.toLowerCase()}"`).join(", ")}]`);
            variables.push(`variable_${axis}_axes: [${rails.map((r)=>`"${r.axis}"`).join(", ")}]`);
            return variables.join("\n");
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
                return `diag_pin: ^${this.getAxisPin(axis, "_diag_pin")}`;
            }
            if (this.getRail(axis).driver.protocol === "SPI") {
                return `diag1_pin: ^${this.getAxisPin(axis, "_diag_pin")}`;
            }
            return "";
        },
        getAxisDriverHomingCurrent (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            return rail.stepper.maxPeakCurrent * 0.71 * factor;
        },
        getExtruderPinPrefix (tool = 0) {
            const th = this.getToolhead(tool);
            if (th == null) {
                throw new Error(`No toolhead found for tool ${tool}`);
            }
            return th.getPinPrefix();
        },
        formatInlineComments (lines, commentChar = "#") {
            const longestLine = lines.reduce((prev, current)=>Math.max(prev, current.substring(0, current.indexOf(commentChar)).trim().length), 0);
            return lines.map((l)=>{
                let commentIndex = l.indexOf(commentChar);
                const lastCommentIndex = l.lastIndexOf(commentChar);
                if ((commentIndex === -1 || l.trim().startsWith(commentChar)) && lastCommentIndex === commentIndex) {
                    // No comment or comment is only at the start of the line, no need to format.
                    return l;
                }
                if (commentIndex !== lastCommentIndex) {
                    commentIndex = l.indexOf(commentChar, commentIndex + 1);
                }
                const comment = l.substring(commentIndex);
                const line = l.substring(0, commentIndex).trim();
                const padding = longestLine - line.length;
                return line + " ".repeat(padding) + " " + comment;
            });
        }
    };
};
const constructKlipperConfigExtrasGenerator = (config, utils)=>{
    const _filesToWrite = [];
    const _reminders = [];
    return {
        getFilesToWrite () {
            return _filesToWrite.slice();
        },
        addFileToRender (fileToRender) {
            _filesToWrite.push(fileToRender);
        },
        getReminders () {
            return _reminders.slice();
        },
        generateSensorlessHomingIncludes () {
            const filesToWrite = [];
            if (utils.getToolhead(motion/* PrinterAxis.x */.po.x).getXEndstop().id === "sensorless") {
                filesToWrite.push({
                    fileName: "sensorless-homing-x.cfg",
                    content: (0,sensorless_homing.sensorlessXTemplate)(config, utils),
                    overwrite: false
                });
            }
            if (utils.getToolheads().some((th)=>th.getYEndstop().id === "sensorless")) {
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
    return {
        ...utils,
        renderToolboards () {
            return utils.getToolheads().map((th)=>{
                return th.renderToolboard();
            }).join("\n");
        },
        renderControlboard () {
            const result = [
                "",
                exportBoardPinAlias(config.controlboard.id, utils.getControlboardPins()),
                "",
                `[mcu]`,
                `serial: ${getBoardSerialPath(config.controlboard)}`
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
                if (config.controlboard.driverCount + utils.toolboardDriverCount + utils.extruderLessConfigBonus < config.printer.driverCountRequired) {
                    throw new Error("Your control and toolboard combination does not make up enough drivers for this printer.");
                }
            }
            const result = [
                "[include RatOS/boards/rpi/config.cfg]",
                this.renderControlboard(),
                this.renderToolboards()
            ];
            return result.join("\n");
        },
        renderStepperSections () {
            return config.rails.map((r)=>{
                return this.renderStepperSection(r);
            }).join("\n");
        },
        getMotorComments (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = [
                `# ${rail.axisDescription}`
            ];
            if (rail.motorSlot && config.controlboard.motorSlots) {
                section.push(`# Connected to ${config.controlboard.motorSlots[rail.motorSlot].title} on ${config.controlboard.name}`);
            } else if (this.isExtruderToolheadAxis(rail.axis)) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`# Connected to ${(toolhead.getToolboard() || config.controlboard).name}`);
            }
            return utils.renderCommentHeader(rail.axis.toUpperCase(), section);
        },
        renderMotorSections () {
            const sections = config.rails.map((r)=>{
                return this.getMotorComments(r).join("\n") + "\n" + this.renderDriverSection(r, true) + "\n" + this.renderStepperSection(r, true);
            });
            sections.push(this.renderBoardQuirks());
            return sections.join("\n");
        },
        renderStepperSection (axis, noHeader = false) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = noHeader ? [] : this.getMotorComments(rail);
            section.push(`[${utils.getAxisStepperName(rail.axis)}]`, `step_pin: ${utils.getAxisPin(rail.axis, "_step_pin")}`, `dir_pin: ${utils.getAxisPin(rail.axis, "_dir_pin")}`, `enable_pin: !${utils.getAxisPin(rail.axis, "_enable_pin")}`, `microsteps: ${rail.microstepping}`);
            if (rail.axis === motion/* PrinterAxis.extruder */.po.extruder || rail.axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`rotation_distance: ${getExtruderRotationDistance(toolhead.getExtruder().id)}`);
            } else {
                section.push(`rotation_distance: ${rail.rotationDistance}`);
            }
            if (rail.axis === motion/* PrinterAxis.z */.po.z) {
                // Lower position_min to allow for probe calibration (and componensation functions). 
                // Very much dislike that this is necessary.
                section.push(`position_min: -5`);
            }
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
                const probeToolhead = config.toolheads.find((th)=>th.probe != null);
                if (probeToolhead?.probe != null) {
                    section.push(`endstop_pin: probe:z_virtual_endstop`);
                }
            }
            return section.join("\n") + "\n";
        },
        renderUserStepperSections (customization) {
            return this.formatInlineComments(config.rails.map((r)=>{
                const { directionInverted , rotationComment , additionalLines  } = customization[r.axis] ?? {};
                return this.renderUserStepperSection(r.axis, directionInverted, rotationComment, additionalLines);
            }).join("\n").split("\n")).join("\n");
        },
        renderUserStepperSection (axis, directionInverted = false, rotationComment, additionalLines) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const dirComment = directionInverted ? `# Remove ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}` : `# Add ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`;
            const section = this.getMotorComments(rail).concat([
                `[${utils.getAxisStepperName(rail.axis)}]`,
                `dir_pin: ${directionInverted ? "!" : ""}${utils.getAxisPin(rail.axis, "_dir_pin")} ${dirComment}`
            ]);
            if (rail.axis === motion/* PrinterAxis.extruder */.po.extruder || rail.axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`rotation_distance: ${getExtruderRotationDistance(toolhead.getExtruder().id)} # ${toolhead.getExtruder().title} default`);
            } else {
                section.push(`rotation_distance: ${rail.rotationDistance} ${rotationComment ? `# ${rotationComment}` : ""}`);
            }
            if ([
                motion/* PrinterAxis.x */.po.x,
                motion/* PrinterAxis.y */.po.y,
                motion/* PrinterAxis.z */.po.z
            ].includes(rail.axis)) {
                section.push(`homing_speed: ${rail.homingSpeed}`);
            }
            if (additionalLines != null) {
                section.push(...additionalLines);
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
        renderDriverSection (axis, noHeader = false) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const preset = (0,steppers/* findPreset */.a)(rail.stepper, rail.driver, rail.voltage, rail.current);
            const section = noHeader ? [] : this.getMotorComments(rail);
            section.push(`[${utils.getAxisDriverSectionName(rail.axis)}]`, `stealthchop_threshold: ${config.stealthchop ? "9999999" : config.standstillStealth ? "1" : "0"}`, `interpolate: ${rail.microstepping < 64 || config.stealthchop ? "True" : "False"}`);
            if (rail.driver.protocol === "UART") {
                // Render optional motor slot pins
                if (rail.motorSlot) {
                    const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
                    if (slotPins == null || !(0,zods_boards/* hasUART */.uh)(config.controlboard.motorSlots?.[rail.motorSlot])) {
                        throw new Error(`No controlboard motor slot UART pins defined for motor slot ${rail.motorSlot}`);
                    }
                    Object.entries(zods_boards/* UARTPins.parse */.X2.parse(slotPins)).forEach(([key, pin])=>{
                        section.push(`${key}: ${pin}`);
                    });
                } else {
                    section.push(`uart_pin: ${utils.getAxisPin(rail.axis, "_uart_pin")}`);
                }
            }
            if (rail.driver.protocol === "SPI") {
                if (rail.motorSlot) {
                    const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
                    if (slotPins == null || !(0,zods_boards/* hasSPI */._u)(config.controlboard.motorSlots?.[rail.motorSlot])) {
                        throw new Error(`No controlboard motor slot SPI pins defined for motor slot ${rail.motorSlot}`);
                    }
                    Object.entries(zods_boards/* SPIPins.parse */.WX.parse(slotPins)).forEach(([key, pin])=>{
                        section.push(`${key}: ${pin}`);
                    });
                } else {
                    section.push(`cs_pin: ${utils.getAxisPin(rail.axis, "_uart_pin")}`);
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
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
                `variable_macro_travel_accel: ${this.getMacroTravelAccel()}`
            ].join("\n");
        },
        getMacroTravelSpeed () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "135" : limits.travel_velocity;
        },
        getMacroTravelAccel () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "1000" : limits.travel_accel;
        },
        renderBoardQuirks () {
            let result = [];
            if (config.controlboard.hasQuirksFiles) {
                result.push("# Include controlboard quirk file");
                if (utils.getToolhead(motion/* PrinterAxis.extruder */.po.extruder) != null) {
                    result.push(`[include RatOS/boards/${config.controlboard.id}/quirks-toolboard.cfg]`);
                } else {
                    result.push(`[include RatOS/boards/${config.controlboard.id}/quirks.cfg]`);
                }
            }
            utils.getToolheads().forEach((th)=>{
                const toolboard = th.getToolboard();
                if (toolboard?.hasQuirksFiles) {
                    result.push("# Include toolboard quirk file");
                    result.push(`[include RatOS/boards/${toolboard.id}/quirks.cfg]`);
                }
            });
            return result.join("\n");
        },
        renderHotend () {
            let result = this.getToolheads().map((th)=>{
                return th.renderHotend();
            });
            return result.join("\n");
        },
        renderExtruder () {
            let result = this.getToolheads().map((th)=>{
                return th.renderExtruder();
            });
            return result.join("\n");
        },
        renderInputShaper (printerSize) {
            // Only renders x toolhead input shaper for now, IDEX uses macro magic for handling both toolheads.
            let result = [];
            result.push("[resonance_tester]");
            const xToolhead = this.getToolhead(motion/* PrinterAxis.x */.po.x);
            result.push(`accel_chip_x: adxl345 ${xToolhead.getXAccelerometerName()}`);
            result.push(`accel_chip_y: adxl345 ${xToolhead.getYAccelerometerName()}`);
            result.push("probe_points:");
            result.push(`\t${printerSize / 2},${printerSize / 2},20`);
            return result.join("\n");
        },
        renderProbeIncludes () {
            const result = [];
            const th = this.getToolheads().find((th)=>th.getProbe() != null);
            if (th) {
                result.push(`[include RatOS/z-probe/${th.getProbe()?.id + ".cfg"}]`);
                if (th.hasToolboard() && th.getProbe()?.id === "bltouch") {
                    result.push("[include RatOS/toolboard/bltouch.cfg]");
                }
            }
            return result.join("\n");
        },
        renderProbePinSection () {
            const result = [];
            const th = this.getToolheads().find((th)=>th.getProbe() != null);
            if (th) {
                switch(th.getProbe()?.id){
                    case "bltouch":
                        result.push(`# BLTouch configuration`);
                        result.push(`[bltouch]`);
                        result.push(`z_offset: 0`);
                        break;
                    case "beacon":
                        // print reminder about beacon calibration
                        const reminder = [];
                        reminder.push("# REMEMBER TO CALIBRATE YOUR BEACON!");
                        reminder.push("# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon");
                        extrasGenerator.addReminder(reminder.join("\n"));
                        break;
                    default:
                        const pinPrefix = th.getPinPrefix();
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
            const toolheads = this.getToolheads();
            let yPin = "sensorless";
            toolheads.forEach((th)=>{
                if (th.getXEndstop().id !== "sensorless") {
                    result.push(""); // Add a newline for readability.
                    result.push(`# Physical X endstop configuration`);
                    result.push(`[${th.getMotionStepperName()}]`);
                    result.push(`endstop_pin: ${th.getXEndstopPin()}`);
                    result.push(`[gcode_macro RatOS]`);
                    result.push(`variable_homing_x: "endstop"`);
                }
                if (th.getYEndstop().id !== "sensorless") {
                    if (yPin == "sensorless") {
                        yPin = th.getYEndstopPin();
                    } else if (yPin !== th.getYEndstopPin()) {
                        throw new Error(`Multiple toolheads configured with different y endstops is currently not supported.`);
                    }
                }
            });
            if (yPin !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Y endstop configuration`);
                result.push(`[stepper_y]`);
                result.push(`endstop_pin: ${yPin}`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_y: "endstop"`);
            }
            if (toolheads.some((th)=>th.getXEndstop().id === "sensorless" || th.getYEndstop().id === "sensorless")) {
                const defaultXRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.x */.po.x);
                const defaultDCRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
                const defaultYRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.y */.po.y);
                result.push(""); // Add a newline for readability.
                if (defaultXRail && defaultYRail && pretunedSensorlessConfig != null && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.x */.po.x), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultXRail), config.performanceMode) && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.y */.po.y), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultYRail), config.performanceMode) && (defaultDCRail == null || (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.dual_carriage */.po.dual_carriage), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultDCRail), config.performanceMode))) {
                    result.push(`[include ${pretunedSensorlessConfig}]`);
                } else {
                    result.push(extrasGenerator.generateSensorlessHomingIncludes());
                }
            }
            if (this.getToolheads().every((th)=>th.getProbe() == null)) {
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
        renderMacroVariableOverrides (size) {
            const result = [
                `variable_bed_margin_x: [${config.printer.bedMargin.x[0]}, ${config.printer.bedMargin.x[1]}]`,
                `variable_bed_margin_y: [${config.printer.bedMargin.y[0]}, ${config.printer.bedMargin.y[1]}]`
            ];
            const toolheads = this.getToolheads();
            const isIdex = toolheads.some((th)=>th.getMotionAxis() === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
            if (isIdex) {
                const probeTool = toolheads.find((th)=>th.getProbe() != null)?.getTool();
                result.push(`variable_default_toolhead: ${probeTool}                             # the toolhead with the z-probe, 0=left 1=right toolhead`);
                const firstADXL = this.getToolhead(0).getXAccelerometerName();
                const secondADXL = this.getToolhead(1).getXAccelerometerName();
                result.push(`variable_adxl_chip: [${firstADXL}, ${secondADXL}]           # toolheads adxl chip names`);
            }
            return this.formatInlineComments(result).join("\n");
        },
        renderUserMacroVariableOverrides (size) {
            const result = [
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
                `variable_macro_travel_accel: ${this.getMacroTravelAccel()}`
            ];
            const toolheads = this.getToolheads();
            const isIdex = toolheads.some((th)=>th.getMotionAxis() === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
            if (isIdex) {
                const endstopSafetyMargin = 5;
                const dcParkX = (size ?? config.size ?? 300) + config.printer.bedMargin.x[1] - endstopSafetyMargin;
                result.push(`variable_parking_position: [-${config.printer.bedMargin.x[0] + endstopSafetyMargin}, ${dcParkX}]                      # toolhead x parking position`);
                result.push(`variable_toolchange_travel_speed: ${this.getMacroTravelSpeed()}     # parking travel speed`);
                result.push(`variable_toolchange_travel_accel: ${this.getMacroTravelAccel()}     # parking travel accel`);
            }
            return this.formatInlineComments(result).join("\n");
        },
        renderControllerFan () {
            let result = [];
            result.push(`[controller_fan controller_fan]`);
            switch(config.controllerFan.id){
                case "2pin":
                    this.requireControlboardPin("fan_controller_board_pin");
                    result.push(`# 2-pin fan connected to the controller board`);
                    result.push(`pin: ${this.getControlboardPins().fan_controller_board_pin}`);
                    break;
                case "4pin":
                    this.requireControlboardPin("fan_controller_board_pin");
                    result.push(`# 4-pin fan connected to the controller board`);
                    result.push(`pin: !${this.getControlboardPins().fan_controller_board_pin}`);
                    result.push(`cycle_time:  0.00004`);
                    break;
                case "4pin-dedicated":
                    this.requireControlboardPin("4p_fan_part_cooling_tach_pin");
                    result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                    result.push(`pin: !${this.getControlboardPins()["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`cycle_time:  0.00004`);
                    if (this.getControlboardPins()["4p_fan_part_cooling_tach_pin"] != null) {
                        result.push(`tachometer_pin: ^${this.getControlboardPins()["4p_fan_part_cooling_tach_pin"]}`);
                        result.push(`tachometer_poll_interval: 0.0005`);
                    }
                    break;
                default:
                    throw new Error(`Unsupported controller fan option "${config.controllerFan.title}"`);
            }
            return result.join("\n");
        },
        renderFans () {
            const result = [];
            const multipleToolheadPartFans = this.getToolheads().filter((th)=>th.getPartFan()).length > 1;
            // Part fan
            result.push(`# Part cooling fan`);
            if (multipleToolheadPartFans) {
                result.push("# Multiple toolheads with part cooling fans configured");
                result.push("# [fan] will use an unused io pin, proxy m106 settings to active toolhead via macro.");
                result.push(`[fan]`);
                result.push(`pin: rpi:gpio4         # sacrifical part fan, use this to independently control your both toolhead part fans`);
            }
            result.push(this.getToolheads().map((th)=>th.renderPartFan(multipleToolheadPartFans)).join("\n"));
            // Hotend fan
            result.push(``);
            result.push(`# Hotend cooling fan`);
            result.push(this.getToolheads().map((th)=>th.renderHotendFan()).join("\n"));
            // Controller fan
            result.push(``);
            result.push(`# Controller cooling fan`);
            result.push(this.renderControllerFan());
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

// EXTERNAL MODULE: ./data/fans.ts
var fans = __webpack_require__(7645);
// EXTERNAL MODULE: external "@trpc/server"
var server_ = __webpack_require__(2756);
;// CONCATENATED MODULE: ./server/helpers/run-script.ts



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
                    reject("An error occured while attempting to run script: \n" + stdout + "\n" + stderr);
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

// EXTERNAL MODULE: ./server/trpc.ts
var trpc = __webpack_require__(5601);
// EXTERNAL MODULE: external "glob"
var external_glob_ = __webpack_require__(4230);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(3292);
// EXTERNAL MODULE: ./server/helpers/file-operations.ts
var file_operations = __webpack_require__(8145);
;// CONCATENATED MODULE: ./server/routers/mcu.ts





















const inputSchema = external_zod_.z.object({
    boardPath: external_zod_.z.string().optional(),
    toolhead: toolhead/* SerializedToolheadConfiguration.optional */.Qk.optional()
});
const detect = (board, toolhead)=>{
    return external_fs_default().existsSync(getBoardSerialPath(board, toolhead));
};
const getBoards = async ()=>{
    const cached = ServerCache.get("boards");
    if (cached != null && cached.length > 0) {
        return cached.map((b)=>{
            b.detected = detect(b);
            return b;
        });
    }
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
    const boards = external_zod_.z.array(zods_boards/* BoardWithDetectionStatus */.Ai).parse(defs.map((f)=>f.trim() === "" ? null : {
            ...JSON.parse(external_fs_default().readFileSync(f).toString()),
            path: f.replace("board-definition.json", "")
        }).filter(Boolean).map((b)=>{
        b.detected = detect(b);
        return b;
    }));
    ServerCache.set("boards", boards);
    return boards;
};
const updateDetectionStatus = async (boards, toolhead)=>{
    return boards.map((b)=>{
        b.detected = detect(b, toolhead);
        return b;
    });
};
const compileFirmware = async (board, toolhead, skipCompile)=>{
    let compileResult = null;
    const environment = schema.serverSchema.parse(process.env);
    try {
        const dest = external_path_default().join(environment.KLIPPER_DIR, ".config");
        await (0,promises_.copyFile)(external_path_default().join(environment.RATOS_CONFIGURATION_PATH, "boards", board.id, "firmware.config"), dest);
        await (0,file_operations/* replaceInFileByLine */.u)(dest, /CONFIG_USB_SERIAL_NUMBER=".+"/g, `CONFIG_USB_SERIAL_NUMBER="${getBoardChipId(board, toolhead)}"`);
        if (skipCompile) {
            return (0,external_fs_.readFileSync)(dest).toString();
        }
        compileResult = await runSudoScript("klipper-compile.sh");
        return compileResult;
    } catch (e) {
        const message = e instanceof Error ? e.message : e;
        throw new server_.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Could not compile firmware for ${board.name}: ${compileResult?.stdout ?? message}'}`,
            cause: e
        });
    }
};
const getBoardsWithoutHost = (boards)=>{
    return boards.filter((b)=>!b.isHost);
};
const getToolboards = (boards)=>{
    return external_zod_.z.array(zods_boards/* ToolboardWithDetectionStatus */.m9).parse(boards.filter((b)=>b.isToolboard));
};
const getBoardsWithDriverCount = (boards, driverCount)=>{
    return boards.filter((b)=>b.driverCount >= driverCount || b.extruderlessConfig != null && b.driverCount >= driverCount - 1);
};
const mcuMiddleware = (0,trpc/* middleware */.qR)(async ({ ctx , next , meta , rawInput  })=>{
    let boards = null;
    let toolhead = null;
    const parsedInput = inputSchema.safeParse(rawInput);
    try {
        boards = await getBoards();
        toolhead = parsedInput.success && parsedInput.data.toolhead ? new helpers_toolhead/* ToolheadHelper */.D(await deserializeToolheadConfiguration(parsedInput.data.toolhead, {}, boards)) : undefined;
        boards = await updateDetectionStatus(boards, toolhead);
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
    if (meta?.boardRequired && (!parsedInput.success || parsedInput.data.boardPath == null)) {
        throw new server_.TRPCError({
            code: "PRECONDITION_FAILED",
            message: `boardPath parameter missing.`
        });
    }
    if (parsedInput.success && parsedInput.data.boardPath != null) {
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
            board: board,
            toolhead: toolhead
        }
    });
});
const mcuProcedure = trpc/* publicProcedure.use */.$y.use(mcuMiddleware);
const mcuRouter = (0,trpc/* router */.Nd)({
    boards: mcuProcedure.input(external_zod_.z.object({
        boardFilters: external_zod_.z.object({
            toolboard: external_zod_.z.boolean().optional(),
            driverCountRequired: external_zod_.z.number().optional()
        }).optional(),
        toolhead: toolhead/* SerializedToolheadConfiguration.optional */.Qk.optional()
    })).output(external_zod_.z.array(zods_boards/* BoardWithDetectionStatus */.Ai)).query(({ ctx , input  })=>{
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
        return detect(ctx.board, ctx.toolhead);
    }),
    unidentifiedDevices: mcuProcedure.query(async ({ ctx  })=>{
        const detected = ctx.boards.filter((b)=>b.detected).map((b)=>external_fs_default().realpathSync(getBoardSerialPath(b)));
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
            version = await (0,external_util_.promisify)(external_child_process_.exec)(`${external_path_default().join(process.env.KLIPPER_ENV, "bin", "python")} ${external_path_default().join(scriptRoot, "check-version.py")} ${getBoardSerialPath(ctx.board, ctx.toolhead)}`, {
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
        boardPath: external_zod_.z.string(),
        toolhead: toolhead/* SerializedToolheadConfiguration.optional */.Qk.optional()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new server_.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        await compileFirmware(ctx.board, ctx.toolhead);
        return "success";
    }),
    reversePinLookup: mcuProcedure.meta({
        boardRequired: true
    }).input(external_zod_.z.object({
        axis: external_zod_.z.nativeEnum(motion/* PrinterAxis */.po),
        hasToolboard: external_zod_.z.boolean(),
        boardPath: external_zod_.z.string()
    })).query(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            return undefined;
        }
        const isExtruderlessBoard = ctx.board.extruderlessConfig != null && input.hasToolboard;
        const pins = await parseBoardPinConfig(ctx.board, isExtruderlessBoard);
        const axisAlias = input.axis === motion/* PrinterAxis.z */.po.z ? "z0" : input.axis === motion/* PrinterAxis.extruder */.po.extruder ? "e" : motion/* PrinterAxis.extruder1 */.po.extruder1 === input.axis ? "e1" : input.axis;
        return (0,zods_boards/* reversePinLookup */.MO)({
            step_pin: pins[`${axisAlias}_step_pin`],
            dir_pin: pins[`${axisAlias}_dir_pin`]
        }, ctx.board);
    }),
    flashAllConnected: mcuProcedure.meta({
        boardRequired: false,
        includeHost: true
    }).mutation(async ({ ctx  })=>{
        const environment = schema.serverSchema.parse(process.env);
        const filePath = external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json");
        if (!(0,external_fs_.existsSync)(filePath)) {
            throw new Error("Couldn't find printer settings file: " + filePath);
        }
        const config = await loadSerializedConfig(filePath);
        const toolheadHelpers = config.toolheads.map((t)=>{
            return new helpers_toolhead/* ToolheadHelper */.D(t);
        });
        const connectedBoards = ctx.boards.map((b)=>{
            if (b.flashScript && b.compileScript && b.disableAutoFlash !== true) {
                if (detect(b)) {
                    return {
                        board: b,
                        toolhead: null
                    };
                }
                const toolboard = toolheadHelpers.map((th)=>{
                    if (detect(b, th)) {
                        return {
                            board: b,
                            toolhead: th
                        };
                    }
                }).find((b)=>b != null) ?? null;
                return toolboard;
            }
            return null;
        }).filter(Boolean);
        const flashResults = [];
        for (const b of connectedBoards){
            try {
                const current = zods_boards/* AutoFlashableBoard.parse */.AN.parse(b.board);
                compileFirmware(b.board, b.toolhead);
                let flashResult = null;
                try {
                    const flashScript = external_path_default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.flashScript);
                    flashResult = b.toolhead ? await runSudoScript("flash-path.sh", getBoardSerialPath(b.board, b.toolhead)) : await runSudoScript("board-script.sh", flashScript);
                } catch (e) {
                    const message = e instanceof Error ? e.message : e;
                    throw new server_.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Could not flash firmware to ${b.board.name}: \n\n ${flashResult?.stdout ?? message}`,
                        cause: e
                    });
                }
                flashResults.push({
                    board: b.board,
                    result: "success",
                    message: `${b.board.manufacturer} ${b.board.name} was successfully flashed.`
                });
            } catch (e) {
                const message = e instanceof Error ? e.message : e;
                flashResults.push({
                    board: b.board,
                    result: "error",
                    message: typeof message === "string" ? message : `Unknown error occured while flashing ${b.board.manufacturer} ${b.board.name}`
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
        return {
            report,
            flashResults
        };
    }),
    flashViaPath: mcuProcedure.input(external_zod_.z.object({
        boardPath: external_zod_.z.string(),
        flashPath: external_zod_.z.string().optional(),
        toolhead: toolhead/* SerializedToolheadConfiguration.optional */.Qk.optional()
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
        await compileFirmware(ctx.board, ctx.toolhead);
        let flashResult = null;
        try {
            const flashScript = external_path_default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.flashScript);
            flashResult = input.flashPath ? await runSudoScript("flash-path.sh", getBoardSerialPath(ctx.board, ctx.toolhead), input.flashPath) : ctx.toolhead ? await runSudoScript("flash-path.sh", getBoardSerialPath(ctx.board, ctx.toolhead)) : await runSudoScript("board-script.sh", flashScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult?.stdout ?? message}`,
                cause: e
            });
        }
        if (!detect(ctx.board, ctx.toolhead)) {
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}, device did not show up at expected path.: \n\n ${flashResult.stdout}`
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
        try {
            await compileFirmware(ctx.board, ctx.toolhead);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new server_.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${message}`,
                cause: e
            });
        }
        try {
            const flashResult = await runSudoScript("dfu-flash.sh", getBoardSerialPath(ctx.board, ctx.toolhead));
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
const xAccelerometerOptions = (config, toolheadConfig)=>{
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
    if (toolheadConfig?.toolboard != null && toolheadConfig.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};
const yAccelerometerOptions = (config, toolheadConfig)=>{
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
    if (toolheadConfig?.toolboard != null && toolheadConfig.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};

// EXTERNAL MODULE: ./hooks/usePrinterConfiguration.tsx
var usePrinterConfiguration = __webpack_require__(2312);
// EXTERNAL MODULE: ./server/helpers/klipper.ts + 1 modules
var klipper = __webpack_require__(7140);
;// CONCATENATED MODULE: ./server/routers/printer.ts























function isNodeError(error) {
    return error instanceof Error;
}
const parseDirectory = async (directory, zod)=>{
    const cached = ServerCache.get(directory);
    if (cached != null) {
        return external_zod_.z.array(zod).parse(cached);
    }
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
    const res = (await Promise.all(defs.map((f)=>f.trim()).filter((f)=>f !== "").map(async (f)=>{
        const parsedFile = await parseMetadata(f, zod);
        if (parsedFile == null) {
            (0,logger.getLogger)().warn(`No metadata present in ${f} skipping..`);
            return null;
        }
        return parsedFile;
    }))).filter((f)=>f != null);
    ServerCache.set(directory, res);
    return res;
};
const serializedPartialConfigFromPrinterDefinition = (def)=>{
    return printer_configuration/* SerializedPartialPrinterConfiguration.parse */.NN.parse({
        printer: def.id,
        controlboard: def.defaults.board
    });
};
const getPrinters = async (resolveToolheads = false)=>{
    const defs = (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
    const hotends = parseDirectory("hotends", hardware/* Hotend */.Uy);
    const boards = getBoards();
    const toolheadPromises = {};
    const printers = (await defs).map((f)=>f.trim() === "" ? null : {
            ...JSON.parse((0,external_fs_.readFileSync)(f).toString()),
            path: f.replace("printer-definition.json", ""),
            id: f.replace("/printer-definition.json", "").split("/").pop()
        }).filter(Boolean);
    printers.forEach((p)=>{
        toolheadPromises[p.id] = p.defaults.toolheads.map(async (th)=>{
            const hotend = (await hotends).find((h)=>h.id === th.hotend);
            if (th.thermistor == null && hotend != null) {
                th.thermistor = hotend.thermistor;
            }
            if (resolveToolheads) {
                const dth = deserializeToolheadConfiguration(th, serializedPartialConfigFromPrinterDefinition(p), await boards);
                th = await dth;
            }
            return th;
        });
    });
    const resolvedToolheads = {};
    await Promise.all(Object.keys(toolheadPromises).map(async (printerId)=>{
        const promises = toolheadPromises[printerId];
        resolvedToolheads[printerId] = await Promise.all(promises);
    }));
    return external_zod_.z.array(resolveToolheads ? zods_printer/* PrinterDefinitionWithResolvedToolheads */.O : zods_printer/* PrinterDefinition */.Q).parse(printers.map((p)=>{
        p.defaults.toolheads = resolvedToolheads[p.id];
        return p;
    }));
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
const deserializeToolheadConfiguration = async (config, printerConfig, boards)=>{
    const loadedBoards = boards == null ? await getBoards() : boards;
    const controlboard = loadedBoards.find((b)=>b.id === printerConfig.controlboard);
    const toolboards = getToolboards(loadedBoards);
    const hotends = await parseDirectory("hotends", hardware/* Hotend */.Uy);
    const extruders = await parseDirectory("extruders", hardware/* Extruder */.U3);
    const probes = await parseDirectory("z-probe", hardware/* Probe */.lV);
    const toolboard = toolboards.find((b)=>b.id === config.toolboard) ?? null;
    const xAccels = xAccelerometerOptions({
        controlboard
    }, {
        toolboard
    });
    const yAccels = yAccelerometerOptions({
        controlboard
    }, {
        toolboard
    });
    return toolhead/* ToolheadConfiguration.parse */.x8.parse({
        ...config,
        toolboard: toolboard,
        hotend: hotends.find((h)=>h.id === config.hotend),
        extruder: extruders.find((e)=>e.id === config.extruder),
        probe: probes.find((p)=>p.id === config.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config.thermistor),
        xEndstop: (0,endstops/* xEndstopOptions */.uo)(printerConfig, config).find((e)=>e.id === config.xEndstop),
        yEndstop: (0,endstops/* yEndstopOptions */.Xo)(printerConfig, config).find((e)=>e.id === config.yEndstop),
        xAccelerometer: xAccels.find((a)=>a.id === config.xAccelerometer) ?? (toolboard && toolboard.ADXL345SPI != null) ? xAccels.find((a)=>a.id === "toolboard") : null,
        yAccelerometer: yAccels.find((a)=>a.id === config.yAccelerometer) ?? (toolboard && toolboard.ADXL345SPI != null) ? xAccels.find((a)=>a.id === "toolboard") : null,
        partFan: (0,fans/* partFanOptions */.gL)({
            controlboard
        }, {
            toolboard,
            axis: config.axis
        }).find((f)=>f.id === config.partFan),
        hotendFan: (0,fans/* hotendFanOptions */.Yo)({
            controlboard
        }, {
            toolboard,
            axis: config.axis
        }).find((f)=>f.id === config.hotendFan)
    });
};
const deserializePartialToolheadConfiguration = async (config, printerConfig, boards)=>{
    boards = boards ?? await getBoards();
    const controlboard = boards.find((b)=>b.id === printerConfig?.controlboard);
    const toolboards = getToolboards(boards);
    const hotends = await parseDirectory("hotends", hardware/* Hotend */.Uy);
    const extruders = await parseDirectory("extruders", hardware/* Extruder */.U3);
    const probes = await parseDirectory("z-probe", hardware/* Probe */.lV);
    const toolboard = toolboards.find((b)=>b.id === config?.toolboard);
    return toolhead/* PartialToolheadConfiguration.parse */.b2.parse({
        ...config,
        toolboard: toolboard ?? null,
        hotend: hotends.find((h)=>h.id === config?.hotend),
        extruder: extruders.find((e)=>e.id === config?.extruder),
        probe: probes.find((p)=>p.id === config?.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config?.thermistor),
        xEndstop: (0,endstops/* xEndstopOptions */.uo)(printerConfig, config).find((e)=>e.id === config?.xEndstop),
        yEndstop: (0,endstops/* yEndstopOptions */.Xo)(printerConfig, config).find((e)=>e.id === config?.yEndstop),
        xAccelerometer: xAccelerometerOptions({
            controlboard
        }, {
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard
        }, {
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        partFan: (0,fans/* partFanOptions */.gL)({
            controlboard
        }, {
            toolboard,
            axis: config?.axis ?? motion/* PrinterAxis.x */.po.x
        }).find((f)=>f.id === config?.partFan),
        hotendFan: (0,fans/* hotendFanOptions */.Yo)({
            controlboard
        }, {
            toolboard,
            axis: config?.axis ?? motion/* PrinterAxis.x */.po.x
        }).find((f)=>f.id === config?.hotendFan)
    });
};
const deserializePartialPrinterConfiguration = async (config)=>{
    const boards = await getBoards();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolheads = config.toolheads == null ? undefined : await Promise.all(config.toolheads.map(async (th)=>await deserializePartialToolheadConfiguration(th, config, boards)));
    return printer_configuration/* PartialPrinterConfiguration.parse */.jz.parse({
        toolheads: toolheads,
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        controllerFan: (0,fans/* controllerFanOptions */.VD)({
            controlboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth,
        rails: config?.rails?.map((r)=>(0,serialization/* deserializePrinterRail */.Ak)(r))
    });
};
const deserializePrinterConfiguration = async (config)=>{
    const boards = await getBoards();
    const controlboard = boards.find((b)=>b.id === config?.controlboard);
    const toolheads = config.toolheads == null ? undefined : await Promise.all(config.toolheads.map((th)=>deserializeToolheadConfiguration(th, config, boards)));
    return printer_configuration/* PrinterConfiguration.parse */.dl.parse({
        toolheads: toolheads,
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        controllerFan: (0,fans/* controllerFanOptions */.VD)({
            controlboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
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
const getFilesToWrite = async (config, overwriteFiles)=>{
    const utils = await constructKlipperConfigUtils(config);
    const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
    const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
    const { template , initialPrinterCfg  } = await __webpack_require__(5866)(`./${config.printer.template.replace("-printer.template.cfg", ".ts")}`);
    const renderedTemplate = template(config, helper).trim();
    const renderedPrinterCfg = initialPrinterCfg(config, helper).trim();
    const extras = extrasGenerator.getFilesToWrite();
    return extras.concat([
        {
            fileName: "RatOS.cfg",
            content: renderedTemplate,
            overwrite: true
        },
        {
            fileName: "printer.cfg",
            content: renderedPrinterCfg,
            overwrite: !await isPrinterCfgInitialized()
        }
    ]).map((f)=>{
        const fileWithExists = f;
        if (overwriteFiles?.includes(fileWithExists.fileName) || overwriteFiles?.includes("*")) {
            fileWithExists.overwrite = true;
        }
        fileWithExists.exists = (0,external_fs_.existsSync)(external_path_default().join(schema.serverSchema.parse(process.env).KLIPPER_CONFIG_PATH, fileWithExists.fileName));
        return fileWithExists;
    });
};
const generateKlipperConfiguration = async (config, overwriteFiles)=>{
    const environment = schema.serverSchema.parse(process.env);
    const filesToWrite = await getFilesToWrite(config, overwriteFiles);
    const results = await Promise.all(filesToWrite.map(async (file)=>{
        let action = "created";
        try {
            await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_fs_.constants.F_OK);
            // At this point we know the file exists.
            if (file.overwrite) {
                // Make a back up.
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
    return results;
};
const loadSerializedConfig = async (filePath)=>{
    const configJson = (0,external_fs_.readFileSync)(filePath);
    const serializedConfig = printer_configuration/* SerializedPrinterConfiguration.parse */.q_.parse(JSON.parse(configJson.toString()));
    const config = await deserializePrinterConfiguration(serializedConfig);
    return config;
};
const regenerateKlipperConfiguration = async (fromFile, overwriteFiles)=>{
    const environment = schema.serverSchema.parse(process.env);
    const filePath = fromFile ?? external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json");
    if (!(0,external_fs_.existsSync)(filePath)) {
        throw new Error("Couldn't find printer settings file: " + filePath);
    }
    const config = await loadSerializedConfig(filePath);
    return await generateKlipperConfiguration(config, overwriteFiles);
};
const getToolhead = async (config, toolOrAxis, serialize)=>{
    const th = (0,serialization/* extractToolheadFromPrinterConfiguration */.Pw)(toolOrAxis, await deserializePartialPrinterConfiguration(config ?? {})) ?? null;
    if (th == null) {
        return null;
    }
    if (serialize === true) {
        return th.serialize();
    }
    return th;
};
const getToolheads = async (config, serialize)=>{
    const toolheads = (0,serialization/* extractToolheadsFromPrinterConfiguration */.s)(await deserializePartialPrinterConfiguration(config ?? {})) ?? null;
    if (toolheads == null) {
        return null;
    }
    if (serialize === true) {
        return toolheads.map((th)=>th.serialize());
    }
    return toolheads;
};
const printerRouter = (0,trpc/* router */.Nd)({
    printers: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(zods_printer/* PrinterDefinitionWithResolvedToolheads */.O)).query(async ()=>(await getPrinters(true)).sort((a, b)=>a.manufacturer === "Rat Rig" && (b.manufacturer !== "Rat Rig" || b.description.indexOf("Discontinued") > -1) ? -1 : a.name.localeCompare(b.name))),
    printer: trpc/* publicProcedure.input */.$y.input(external_zod_.z.string()).output(zods_printer/* PrinterDefinitionWithResolvedToolheads.nullable */.O.nullable()).query(async (ctx)=>{
        const printer = (await getPrinters()).find((p)=>p.id === ctx.input);
        if (printer) {
            printer.defaults.toolheads = await Promise.all(printer.defaults.toolheads.map((th)=>deserializeToolheadConfiguration(th, serializedPartialConfigFromPrinterDefinition(printer))));
        } else {
            return null;
        }
        return zods_printer/* PrinterDefinitionWithResolvedToolheads.parse */.O.parse(printer);
    }),
    hotends: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Hotend */.Uy)).query(()=>parseDirectory("hotends", hardware/* Hotend */.Uy)),
    extruders: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Extruder */.U3)).query(()=>parseDirectory("extruders", hardware/* Extruder */.U3)),
    probes: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Probe */.lV)).query(()=>parseDirectory("z-probe", hardware/* Probe */.lV)),
    thermistors: trpc/* publicProcedure.query */.$y.query(()=>hardware/* thermistors.map */.b6.map(serialization/* stringToTitleObject */.DX)),
    xEndstops: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Endstop */.ws)).query(async (ctx)=>(0,endstops/* xEndstopOptions */.uo)(ctx.input.config, await getToolhead(ctx.input.config, ctx.input.toolOrAxis, true))),
    yEndstops: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Endstop */.ws)).query(async (ctx)=>(0,endstops/* yEndstopOptions */.Xo)(ctx.input.config, await getToolhead(ctx.input.config, ctx.input.toolOrAxis, true))),
    partFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>(0,fans/* partFanOptions */.gL)(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    hotendFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>(0,fans/* hotendFanOptions */.Yo)(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    controllerFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable()
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>(0,fans/* controllerFanOptions */.VD)(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolheads(ctx.input.config))?.map((th)=>th.getConfig()))),
    xAccelerometerOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>xAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    yAccelerometerOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPartialPrinterConfiguration.nullable */.NN.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>yAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    deserializeToolheadConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: toolhead/* SerializedToolheadConfiguration */.Qk,
        printerConfig: printer_configuration/* SerializedPartialPrinterConfiguration.optional */.NN.optional()
    })).query(async (ctx)=>{
        return await deserializeToolheadConfiguration(ctx.input.config, ctx.input.printerConfig ?? {});
    }),
    printercfgStatus: trpc/* publicProcedure.query */.$y.query(async ()=>{
        return {
            isInitialized: await isPrinterCfgInitialized()
        };
    }),
    regenerateConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        overwriteFiles: external_zod_.z.array(external_zod_.z.string()).optional()
    })).mutation(async ({ input  })=>{
        const res = await regenerateKlipperConfiguration(undefined, input.overwriteFiles);
        if (res.some((r)=>r.action === "created" || r.action === "overwritten")) {
            (0,klipper.klipperRestart)();
        }
        return res;
    }),
    // Has to be a mutation as printer config is too large for url string.
    getFilesToWrite: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPrinterConfiguration */.q_
    })).mutation(async (ctx)=>{
        const { config: serializedConfig  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        return (await getFilesToWrite(config)).map((f)=>{
            return {
                fileName: f.fileName,
                exists: f.exists,
                overwrite: f.overwrite
            };
        });
    }),
    saveConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration/* SerializedPrinterConfiguration */.q_,
        overwriteFiles: external_zod_.z.array(external_zod_.z.string()).optional()
    })).mutation(async (ctx)=>{
        const { config: serializedConfig , overwriteFiles  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        const configResult = await generateKlipperConfiguration(config, overwriteFiles);
        (0,klipper.klipperRestart)();
        return configResult;
    })
});


/***/ }),

/***/ 5866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./caramba": [
		2490,
		490
	],
	"./caramba-hybrid": [
		4487,
		487
	],
	"./caramba-hybrid.ts": [
		4487,
		487
	],
	"./caramba-idex": [
		1868,
		868
	],
	"./caramba-idex.ts": [
		1868,
		868
	],
	"./caramba.ts": [
		2490,
		490
	],
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
		263
	],
	"./v-core-3.ts": [
		9263,
		263
	],
	"./v-core-pro": [
		1028,
		28
	],
	"./v-core-pro.ts": [
		1028,
		28
	],
	"./v-minion": [
		2525,
		525
	],
	"./v-minion.ts": [
		2525,
		525
	],
	"./voron-v01": [
		1881,
		881
	],
	"./voron-v01.ts": [
		1881,
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