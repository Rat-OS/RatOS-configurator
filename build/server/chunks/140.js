"use strict";
exports.id = 140;
exports.ids = [140];
exports.modules = {

/***/ 7140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "klipperRestart": () => (/* binding */ klipperRestart)
});

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: ./server/helpers/logger.ts
var logger = __webpack_require__(799);
;// CONCATENATED MODULE: ./zods/moonraker.tsx


const MoonrakerBaseResult = external_zod_.z.object({
    eventtime: external_zod_.z.number()
});
const MoonrakerPrinterState = MoonrakerBaseResult.extend({
    status: external_zod_.z.object({
        print_stats: external_zod_.z.object({
            state: external_zod_.z.union([
                external_zod_.z.literal("paused"),
                external_zod_.z.literal("printing"),
                external_zod_.z.literal("complete"),
                external_zod_.z.literal("error"),
                external_zod_.z.literal("canceled"),
                external_zod_.z.literal("standby")
            ])
        })
    })
});
const MoonrakerHTTPResponse = external_zod_.z.object({
    result: MoonrakerBaseResult.passthrough()
});
const parseMoonrakerHTTPResponse = async (response, responseZod)=>{
    const jsonResult = await response.json();
    try {
        const res = MoonrakerHTTPResponse.parse(jsonResult);
        return {
            ...res,
            result: responseZod.parse(res.result)
        };
    } catch (e) {
        (0,logger.getLogger)().error("Error parsing moonraker response");
        (0,logger.getLogger)().error(jsonResult);
        throw e;
    }
};

;// CONCATENATED MODULE: ./server/helpers/klipper.ts

const klipperRestart = async (force = false)=>{
    const printerState = (await parseMoonrakerHTTPResponse(await fetch("http://localhost:7125/printer/objects/query?print_stats"), MoonrakerPrinterState)).result.status.print_stats.state;
    if (force || [
        "error",
        "complete",
        "canceled",
        "standby"
    ].includes(printerState)) {
        await fetch("http://localhost:7125/printer/restart", {
            method: "POST"
        });
        return true;
    }
    return false;
};


/***/ })

};
;