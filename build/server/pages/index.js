"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 4596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
;// CONCATENATED MODULE: ./server/helpers/iw.ts
/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Modified and converted to TS by Mikkel Schmidt.
 */ 

/**
 * Returns a truthy if the network has an ssid; falsy otherwise.
 *
 * @private
 * @static
 * @category iw
 * @param {object} network The scanned network object.
 * @returns {string} The ssid.
 *
 */ const hasSsid = (network)=>{
    return network.ssid;
};
/**
 * Returns a truthy if the network has any key; falsy otherwise.
 *
 * @private
 * @static
 * @category iw
 * @param {object} network The scanned network object.
 * @returns {boolean} True if any key.
 *
 */ const hasKeys = (network)=>{
    return Object.keys(network).length !== 0;
};
/**
 * A comparison function to sort networks ordered by signal strength.
 *
 * @private
 * @static
 * @category iw
 * @param {object} a A scanned network object.
 * @param {object} b Another scanned network object.
 * @returns {number} The comparison value.
 *
 */ const bySignal = (a, b)=>{
    return b.signal - a.signal;
};
/**
 * Parses a scanned wireless network cell.
 *
 * @private
 * @static
 * @category iw
 * @param {string} cell The section of stdout for the cell.
 * @returns {object} The scanned network object.
 *
 */ const parseCell = (cell)=>{
    var parsed = {};
    var match;
    if (match = cell.match(/BSS ([0-9A-Fa-f:-]{17})\(on/)) {
        parsed.address = match[1].toLowerCase();
    }
    if (match = cell.match(/freq: ([0-9]+)/)) {
        parsed.frequency = parseInt(match[1], 10);
    }
    if (match = cell.match(/signal: (-?[0-9.]+) dBm/)) {
        parsed.signal = parseFloat(match[1]);
    }
    if (match = cell.match(/last seen: ([0-9]+) ms ago/)) {
        parsed.lastSeenMs = parseInt(match[1], 10);
    }
    if (match = cell.match(/SSID: \\x00/)) {
        delete parsed.ssid;
    } else if (match = cell.match(/SSID: ([^\n]*)/)) {
        parsed.ssid = match[1];
    }
    if (match = cell.match(/Country: ([^\t]*)/)) {
        parsed.country = match[1];
    }
    if (match = cell.match(/DS Parameter set: channel ([0-9]+)/)) {
        parsed.channel = parseInt(match[1], 10);
    } else if (match = cell.match(/\* primary channel: ([0-9]+)/)) {
        parsed.channel = parseInt(match[1], 10);
    }
    if (match = cell.match(/RSN:[\s*]+Version: 1/)) {
        parsed.security = "wpa2";
    } else if (match = cell.match(/WPA:[\s*]+Version: 1/)) {
        parsed.security = "wpa";
    } else if (match = cell.match(/capability: ESS Privacy/)) {
        parsed.security = "wep";
    } else if (match = cell.match(/capability: ESS/)) {
        parsed.security = "open";
    }
    return parsed;
};
/**
 * Parses all scanned wireless network cells.
 *
 * @private
 * @static
 * @category iw
 * @param {function} callback The callback function.
 *
 */ const parseScan = (show_hidden)=>{
    return function({ stdout , stderr  }) {
        if (show_hidden) {
            return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasKeys).sort(bySignal);
        } else {
            return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasSsid).sort(bySignal);
        }
    };
};
const getWirelessInterface = async ()=>{
    const wifiInterface = await (0,external_util_.promisify)(external_child_process_.exec)(`iw dev | awk '$1=="Interface"{print $2}' | head -n1`);
    return wifiInterface.stdout.trim();
};
/**
 * The **iw scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 */ const scan = async (interfaceName, options)=>{
    const apForce = options.apForce ? " ap-force" : "";
    const iwResult = await (0,external_util_.promisify)(external_child_process_.exec)("sudo iw dev " + interfaceName + " scan" + apForce);
    return parseScan(options.showHidden ?? false)(iwResult);
};
/**
 * The **iw** command is used to control nl80211 radios.
 *
 * @static
 * @category iw
 *
 */ const iw = {
    scan: scan
};
/* harmony default export */ const helpers_iw = ((/* unused pure expression or super */ null && (iw)));

;// CONCATENATED MODULE: ./server/helpers/wpa-cli.tsx



const isConnectedToWifi = async ()=>{
    if (false) {}
    const wirelessInterface = await getWirelessInterface();
    try {
        const res = await (0,external_util_.promisify)(external_child_process_.exec)(`sudo wpa_cli -i "${wirelessInterface}" status | grep 'ip_address'`);
        if (res.stdout.indexOf("ip_address=192.168.50.1") > -1) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return false;
    }
};

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
;// CONCATENATED MODULE: external "tailwind-merge"
const external_tailwind_merge_namespaceObject = require("tailwind-merge");
// EXTERNAL MODULE: ./hooks/useMoonraker.tsx
var useMoonraker = __webpack_require__(3718);
;// CONCATENATED MODULE: ./hooks/useKlippyStateHandler.tsx



const KlippyStatusState = (0,external_recoil_.atom)({
    key: "KlippyReadyState",
    default: "unknown"
});
const useKlippyStateHandler = ()=>{
    const { query , lastMessage  } = (0,useMoonraker/* useMoonraker */.o)();
    const setKlippyReadyState = (0,external_recoil_.useSetRecoilState)(KlippyStatusState);
    const queryKlippyState = (0,react_.useCallback)(async ()=>{
        if (query != null) {
            try {
                const serverInfo = await query("server.info");
                if (serverInfo?.klippy_state == null) return;
                const klippyState = serverInfo.klippy_state;
                setKlippyReadyState(klippyState);
                if (klippyState === "startup") {
                    // Query for server info in two seconds as instructed by the moonraker docs.
                    // Seems unnecessary with globally published events?
                    setTimeout(()=>{
                        queryKlippyState();
                    }, 2000);
                }
            } catch (e) {
                setKlippyReadyState("unknown");
            }
        }
    }, [
        query,
        setKlippyReadyState
    ]);
    (0,react_.useEffect)(()=>{
        if (query != null) {
            queryKlippyState();
        }
    }, [
        query,
        queryKlippyState
    ]);
    (0,react_.useEffect)(()=>{
        if (lastMessage?.method === "notify_klippy_ready") {
            setKlippyReadyState("ready");
        }
        if (lastMessage?.method === "notify_klippy_shutdown") {
            setKlippyReadyState("shutdown");
        }
        if (lastMessage?.method === "notify_klippy_disconnected") {
            setKlippyReadyState("unknown");
            queryKlippyState();
        }
    }, [
        lastMessage,
        queryKlippyState,
        setKlippyReadyState
    ]);
};

;// CONCATENATED MODULE: external "class-variance-authority"
const external_class_variance_authority_namespaceObject = require("class-variance-authority");
;// CONCATENATED MODULE: ./components/common/badge.tsx



const badgeTextColorStyle = (0,external_class_variance_authority_namespaceObject.cva)("", {
    variants: {
        color: {
            rose: "text-rose-700 dark:text-rose-400",
            red: "text-red-700 dark:text-red-400",
            yellow: "text-yellow-800 dark:text-yellow-500",
            orange: "text-orange-800 dark:text-orange-500",
            green: "text-green-700 dark:text-green-400",
            lime: "text-lime-700 dark:text-lime-400",
            blue: "text-blue-700 dark:text-blue-400",
            sky: "text-sky-700 dark:text-sky-400",
            indigo: "text-indigo-700 dark:text-indigo-400",
            purple: "text-purple-700 dark:text-purple-400",
            pink: "text-pink-700 dark:text-pink-400",
            brand: "text-brand-700 dark:text-brand-400",
            gray: "text-zinc-600 dark:text-zinc-400",
            plain: "text-zinc-900 dark:text-zinc-100"
        }
    }
});
const badgeBackgroundColorStyle = (0,external_class_variance_authority_namespaceObject.cva)("", {
    variants: {
        color: {
            rose: "bg-rose-50 dark:bg-rose-400/10",
            red: "bg-red-50 dark:bg-red-400/10",
            yellow: "bg-yellow-50 dark:bg-yellow-400/10",
            orange: "bg-orange-50 dark:bg-orange-400/10",
            green: "bg-green-50 dark:bg-green-500/10",
            lime: "bg-lime-50 dark:bg-lime-500/10",
            blue: "bg-blue-50 dark:bg-blue-400/10",
            sky: "bg-sky-50 dark:bg-sky-400/10",
            indigo: "bg-indigo-50 dark:bg-indigo-400/10",
            purple: "bg-purple-50 dark:bg-purple-400/10",
            pink: "bg-pink-50 dark:bg-pink-400/10",
            brand: "bg-brand-100 dark:bg-brand-400/10",
            gray: "bg-zinc-50 dark:bg-zinc-400/10",
            plain: "bg-zinc-900/10 dark:bg-zinc-100/10"
        }
    }
});
const badgeBorderColorStyle = (0,external_class_variance_authority_namespaceObject.cva)("", {
    variants: {
        color: {
            rose: "border-rose-600/10 dark:border-rose-400/20 ring-rose-600/10 dark:ring-rose-400/20",
            red: "border-red-600/10 dark:border-red-400/20 ring-red-600/10 dark:ring-red-400/20",
            yellow: "border-yellow-600/20 dark:border-yellow-400/20 ring-yellow-600/20 dark:ring-yellow-400/20",
            orange: "border-orange-600/20 dark:border-orange-400/20 ring-orange-600/20 dark:ring-orange-400/20",
            green: "border-green-600/20 dark:border-green-500/20 ring-green-600/20 dark:ring-green-500/20",
            lime: "border-lime-600/20 dark:border-lime-500/20 ring-lime-600/20 dark:ring-lime-500/20",
            blue: "border-blue-700/10 dark:border-blue-400/30 ring-blue-700/10 dark:ring-blue-400/30",
            sky: "border-sky-700/10 dark:border-sky-400/30 ring-sky-700/10 dark:ring-sky-400/30",
            indigo: "border-indigo-700/10 dark:border-indigo-400/30 ring-indigo-700/10 dark:ring-indigo-400/30",
            purple: "border-purple-700/10 dark:border-purple-400/30 ring-purple-700/10 dark:ring-purple-400/30",
            pink: "border-pink-700/10 dark:border-pink-400/20 ring-pink-700/10 dark:ring-pink-400/20",
            brand: "border-brand-600/40 dark:border-brand-400/30 ring-brand-600/40 dark:ring-brand-400/30",
            gray: "border-zinc-500/10 dark:border-zinc-400/20 ring-zinc-500/10 dark:ring-zinc-400/20",
            plain: "border-zinc-900 dark:border-zinc-100 ring-zinc-900 dark:ring-zinc-100"
        }
    }
});
const badgeStyle = (0,external_class_variance_authority_namespaceObject.cva)("flex-0 inline-flex w-auto items-center rounded-md font-medium ring-1 ring-inset", {
    variants: {
        size: {
            sm: "px-1.5 py-1 text-2xs leading-3",
            md: "px-2 py-1 text-xs leading-4",
            lg: "px-2 py-1 text-xs leading-6"
        },
        color: {
            rose: [
                badgeBackgroundColorStyle({
                    color: "rose"
                }),
                badgeBorderColorStyle({
                    color: "rose"
                }),
                badgeTextColorStyle({
                    color: "rose"
                })
            ],
            red: [
                badgeBackgroundColorStyle({
                    color: "red"
                }),
                badgeBorderColorStyle({
                    color: "red"
                }),
                badgeTextColorStyle({
                    color: "red"
                })
            ],
            yellow: [
                badgeBackgroundColorStyle({
                    color: "yellow"
                }),
                badgeBorderColorStyle({
                    color: "yellow"
                }),
                badgeTextColorStyle({
                    color: "yellow"
                })
            ],
            orange: [
                badgeBackgroundColorStyle({
                    color: "orange"
                }),
                badgeBorderColorStyle({
                    color: "orange"
                }),
                badgeTextColorStyle({
                    color: "orange"
                })
            ],
            green: [
                badgeBackgroundColorStyle({
                    color: "green"
                }),
                badgeBorderColorStyle({
                    color: "green"
                }),
                badgeTextColorStyle({
                    color: "green"
                })
            ],
            lime: [
                badgeBackgroundColorStyle({
                    color: "lime"
                }),
                badgeBorderColorStyle({
                    color: "lime"
                }),
                badgeTextColorStyle({
                    color: "lime"
                })
            ],
            blue: [
                badgeBackgroundColorStyle({
                    color: "blue"
                }),
                badgeBorderColorStyle({
                    color: "blue"
                }),
                badgeTextColorStyle({
                    color: "blue"
                })
            ],
            sky: [
                badgeBackgroundColorStyle({
                    color: "sky"
                }),
                badgeBorderColorStyle({
                    color: "sky"
                }),
                badgeTextColorStyle({
                    color: "sky"
                })
            ],
            indigo: [
                badgeBackgroundColorStyle({
                    color: "indigo"
                }),
                badgeBorderColorStyle({
                    color: "indigo"
                }),
                badgeTextColorStyle({
                    color: "indigo"
                })
            ],
            purple: [
                badgeBackgroundColorStyle({
                    color: "purple"
                }),
                badgeBorderColorStyle({
                    color: "purple"
                }),
                badgeTextColorStyle({
                    color: "purple"
                })
            ],
            pink: [
                badgeBackgroundColorStyle({
                    color: "pink"
                }),
                badgeBorderColorStyle({
                    color: "pink"
                }),
                badgeTextColorStyle({
                    color: "pink"
                })
            ],
            brand: [
                badgeBackgroundColorStyle({
                    color: "brand"
                }),
                badgeBorderColorStyle({
                    color: "brand"
                }),
                badgeTextColorStyle({
                    color: "brand"
                })
            ],
            gray: [
                badgeBackgroundColorStyle({
                    color: "gray"
                }),
                badgeBorderColorStyle({
                    color: "gray"
                }),
                badgeTextColorStyle({
                    color: "gray"
                })
            ],
            plain: [
                badgeBackgroundColorStyle({
                    color: "plain"
                }),
                badgeBorderColorStyle({
                    color: "plain"
                }),
                badgeTextColorStyle({
                    color: "plain"
                })
            ]
        }
    },
    defaultVariants: {
        size: "md",
        color: "gray"
    }
});
const Badge = (props)=>{
    const { size , color , className , children , ...forwardProps } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx("span", {
        className: (0,external_tailwind_merge_namespaceObject.twMerge)(badgeStyle({
            size,
            color
        }), className),
        ...forwardProps,
        children: children
    });
};

;// CONCATENATED MODULE: ./components/klippy-state-badge.tsx






const klipperStateToText = (klippyState)=>{
    switch(klippyState){
        case "error":
            return "Klipper State: Error";
        case "ready":
            return "Klipper State: Ready";
        case "shutdown":
            return "Klipper State: Shutdown";
        case "startup":
            return "Klipper State: Startup";
        case "unknown":
            return "Klipper State: Unknown";
        default:
            return "Klipper State: Unknown";
    }
};
const KlippyStateBadge = (props)=>{
    useKlippyStateHandler();
    const klippyState = (0,external_recoil_.useRecoilValue)(KlippyStatusState);
    let color = "orange";
    switch(klippyState){
        case "error":
            color = "red";
            break;
        case "ready":
            color = "brand";
            break;
        case "shutdown":
            color = "orange";
            break;
        case "startup":
            color = "yellow";
            break;
        case "unknown":
            color = "orange";
            break;
        default:
            color = "orange";
            break;
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Badge, {
        color: color,
        title: klipperStateToText(klippyState),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                className: (0,external_tailwind_merge_namespaceObject.twJoin)(badgeTextColorStyle({
                    color
                }), "mr-1.5 h-2 w-2"),
                fill: "currentColor",
                viewBox: "0 0 8 8",
                children: /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                    cx: 4,
                    cy: 4,
                    r: 3
                })
            }),
            "Klipper"
        ]
    });
};

;// CONCATENATED MODULE: ./components/moonraker-state-badge.tsx





const moonrakerStatusToText = (moonrakerState)=>{
    switch(moonrakerState){
        case "not-running":
            return "Moonraker State: Not Running";
        case "connected":
            return "Moonraker State: Connected";
        case "connecting":
            return "Moonraker State: Connecting";
        default:
            return "Moonraker State: Unknown";
    }
};
const MoonrakerStateBadge = (props)=>{
    const { status  } = (0,useMoonraker/* useMoonraker */.o)();
    let color = "orange";
    switch(status){
        case "not-running":
            color = "red";
            break;
        case "connected":
            color = "brand";
            break;
        case "connecting":
            color = "yellow";
            break;
        default:
            color = "orange";
            break;
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Badge, {
        color: color,
        title: moonrakerStatusToText(status),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                className: (0,external_tailwind_merge_namespaceObject.twJoin)(badgeTextColorStyle({
                    color
                }), "mr-1.5 h-2 w-2"),
                fill: "currentColor",
                viewBox: "0 0 8 8",
                children: /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                    cx: 4,
                    cy: 4,
                    r: 3
                })
            }),
            "Moonraker"
        ]
    });
};

;// CONCATENATED MODULE: external "react-query"
const external_react_query_namespaceObject = require("react-query");
// EXTERNAL MODULE: ./helpers/trpc.ts
var trpc = __webpack_require__(8388);
// EXTERNAL MODULE: external "@headlessui/react"
var external_headlessui_react_ = __webpack_require__(7505);
;// CONCATENATED MODULE: external "@heroicons/react/20/solid"
const solid_namespaceObject = require("@heroicons/react/20/solid");
// EXTERNAL MODULE: external "@heroicons/react/24/outline"
var outline_ = __webpack_require__(2135);
;// CONCATENATED MODULE: external "clsx"
const external_clsx_namespaceObject = require("clsx");
var external_clsx_default = /*#__PURE__*/__webpack_require__.n(external_clsx_namespaceObject);
;// CONCATENATED MODULE: ./components/common/mutation-modal.tsx





const MutationModal = (props)=>{
    const { open , setOpen  } = props;
    const icon = props.isFailed ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-800",
        children: /*#__PURE__*/ jsx_runtime_.jsx(outline_.XMarkIcon, {
            className: "h-6 w-6 text-red-600 dark:text-red-300",
            "aria-hidden": "true"
        })
    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-700",
        children: /*#__PURE__*/ jsx_runtime_.jsx(outline_.CheckIcon, {
            className: "h-6 w-6 text-green-600 dark:text-green-100",
            "aria-hidden": "true"
        })
    });
    const buttonClass = external_clsx_default()("inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 sm:text-sm", props.isLoading ? "bg-brand-600 text-base font-medium text-white opacity-50 cursor-not-allowed" : "bg-brand-600 text-base font-medium text-white hover:bg-brand-700");
    return /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Root, {
        show: open,
        as: react_.Fragment,
        appear: true,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Dialog, {
            as: "div",
            className: "relative z-10",
            onClose: setOpen,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                    as: react_.Fragment,
                    enter: "ease-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "ease-in duration-200",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-800 dark:bg-opacity-75"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "fixed inset-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                            as: react_.Fragment,
                            enter: "ease-out duration-300",
                            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                            enterTo: "opacity-100 translate-y-0 sm:scale-100",
                            leave: "ease-in duration-200",
                            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Dialog.Panel, {
                                className: "dark relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-zinc-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 md:max-w-lg lg:max-w-xl xl:max-w-3xl",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            props.isLoading ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                    className: external_clsx_default()("h-6 w-6 animate-spin text-zinc-800 dark:text-zinc-200"),
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                                                            className: "opacity-25",
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                            className: "opacity-75",
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        })
                                                    ]
                                                })
                                            }) : icon,
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "mt-3 text-center sm:mt-5",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog.Title, {
                                                        as: "h3",
                                                        className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                        children: props.title
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "mt-2",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "text-sm text-zinc-500 dark:text-zinc-400",
                                                            children: props.children
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "mt-5 sm:mt-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            type: "button",
                                            className: buttonClass,
                                            onClick: props.isLoading ? undefined : ()=>setOpen(false),
                                            disabled: props.isLoading,
                                            children: props.dismissText
                                        })
                                    })
                                ]
                            })
                        })
                    })
                })
            ]
        })
    });
};

// EXTERNAL MODULE: ./recoil/toolhead.ts
var recoil_toolhead = __webpack_require__(8289);
;// CONCATENATED MODULE: ./components/common/actions-dropdown.tsx








function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const ActionsDropdown = ()=>{
    const [isSymlinkModalOpen, setIsSymlinkModalOpen] = (0,react_.useState)(false);
    const [isFlashModalOpen, setIsFlashModalOpen] = (0,react_.useState)(false);
    const [flashModalContent, setFlashModalContent] = (0,react_.useState)({
        title: "",
        children: null,
        dismissText: "OK"
    });
    const [symlinkModalContent, setSymlinkModalContent] = (0,react_.useState)({
        title: "",
        children: null,
        dismissText: "OK"
    });
    const symlinkExtensions = trpc/* trpc.klippy-extensions.symlink.useMutation */.S["klippy-extensions"].symlink.useMutation();
    const flashFirmware = trpc/* trpc.mcu.flashAllConnected.useMutation */.S.mcu.flashAllConnected.useMutation();
    const symlinkModal = isSymlinkModalOpen ? /*#__PURE__*/ jsx_runtime_.jsx(MutationModal, {
        ...symlinkModalContent,
        setOpen: setIsSymlinkModalOpen,
        open: isSymlinkModalOpen,
        isFailed: symlinkExtensions.isError,
        isLoading: symlinkExtensions.isLoading
    }) : null;
    const flashModal = isFlashModalOpen ? /*#__PURE__*/ jsx_runtime_.jsx(MutationModal, {
        ...flashModalContent,
        setOpen: setIsFlashModalOpen,
        open: isFlashModalOpen,
        isFailed: flashFirmware.isError,
        isLoading: flashFirmware.isLoading
    }) : null;
    const onClickFlash = (0,react_.useCallback)(()=>{
        setFlashModalContent({
            title: "Flash Firmware",
            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "Please wait while RatOS is flashing your connected boards..."
            }),
            dismissText: "Please wait..."
        });
        setIsFlashModalOpen(true);
        flashFirmware.mutateAsync().then((value)=>{
            setFlashModalContent({
                title: "Flashing Complete",
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    dangerouslySetInnerHTML: {
                        __html: value.report.replace(/\n/g, "<br />")
                    }
                }),
                dismissText: "OK"
            });
        }, (value)=>{
            setFlashModalContent({
                title: "Flashing Failed",
                children: typeof value === "string" || value instanceof String ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    dangerouslySetInnerHTML: {
                        __html: value.replace(/\n/g, "<br />")
                    }
                }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "Something wen't wrong while flashing the connected boards, please try again."
                }),
                dismissText: "OK"
            });
        });
    }, [
        flashFirmware
    ]);
    const onClickSymlink = (0,react_.useCallback)(()=>{
        setSymlinkModalContent({
            title: "Symlink Extensions",
            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "Please wait while RatOS is symlinking klippy extensions..."
            }),
            dismissText: "Please wait..."
        });
        setIsSymlinkModalOpen(true);
        symlinkExtensions.mutateAsync({}).then((value)=>{
            setSymlinkModalContent({
                title: "Symlink Complete",
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    dangerouslySetInnerHTML: {
                        __html: value.report.replace(/\n/g, "<br />")
                    }
                }),
                dismissText: "OK"
            });
        }, (value)=>{
            setSymlinkModalContent({
                title: "Symlink Failed",
                children: typeof value === "string" || value instanceof String ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    dangerouslySetInnerHTML: {
                        __html: value.replace(/\n/g, "<br />")
                    }
                }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "Something wen't wrong while symlinking the extensions, please try again."
                }),
                dismissText: "OK"
            });
        });
    }, [
        symlinkExtensions
    ]);
    const onClickTest = (0,external_recoil_.useRecoilCallback)(({ set  })=>()=>{
            set((0,recoil_toolhead/* PrinterToolheadState */.AF)(0), null);
        });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu, {
                as: "div",
                className: "relative inline-block text-left",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu.Button, {
                            className: "inline-flex w-full justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-600 ",
                            children: [
                                "Actions",
                                /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronDownIcon, {
                                    className: "-mr-1 ml-2 h-5 w-5",
                                    "aria-hidden": "true"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition, {
                        as: react_.Fragment,
                        enter: "transition ease-out duration-100",
                        enterFrom: "transform opacity-0 scale-95",
                        enterTo: "transform opacity-100 scale-100",
                        leave: "transition ease-in duration-75",
                        leaveFrom: "transform opacity-100 scale-100",
                        leaveTo: "transform opacity-0 scale-95",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu.Items, {
                            className: "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-800 dark:bg-zinc-900 dark:shadow-black dark:ring-zinc-800",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "py-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                        children: ({ active  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                onClick: onClickSymlink,
                                                className: classNames(active ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300", "block cursor-pointer px-4 py-2 text-sm"),
                                                children: "Symlink klippy extensions"
                                            })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "py-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                        children: ({ active  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                onClick: onClickFlash,
                                                className: classNames(active ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300", "block cursor-pointer px-4 py-2 text-sm"),
                                                children: "Flash all connected MCU's"
                                            })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "py-1",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                        children: ({ active  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                onClick: onClickTest,
                                                className: classNames(active ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300", "block cursor-pointer px-4 py-2 text-sm"),
                                                children: "Test toolhead state"
                                            })
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            symlinkModal,
            flashModal
        ]
    });
};

// EXTERNAL MODULE: ./components/sync-with-moonraker.tsx
var sync_with_moonraker = __webpack_require__(485);
;// CONCATENATED MODULE: ./hooks/isClient.tsx

const useIsClient = ()=>{
    const [isClient, setIsClient] = (0,react_.useState)(false);
    (0,react_.useEffect)(()=>{
        setIsClient(true);
    }, []);
    return isClient;
};

;// CONCATENATED MODULE: ./components/common/spinner.tsx


const Spinner = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
        className: (0,external_tailwind_merge_namespaceObject.twMerge)("h-5 w-5 animate-spin text-black dark:text-white", !props.noMargin ? "-ml-1 mr-3" : "", props.className),
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("circle", {
                className: "opacity-25",
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            })
        ]
    });
};

;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
// EXTERNAL MODULE: ./helpers/toolhead.ts
var helpers_toolhead = __webpack_require__(7187);
;// CONCATENATED MODULE: ./hooks/useSteps.tsx

const useSteps = (props)=>{
    const { onStepChange  } = props;
    const [currentStepIndex, _setCurrentStepIndex] = (0,react_.useState)(props.step != null && !isNaN(props.step) && props.steps[props.step] != null ? props.step : 0);
    const currentStep = props.steps[currentStepIndex];
    const currentStepRef = (0,react_.useRef)(currentStepIndex);
    currentStepRef.current = currentStepIndex;
    const setCurrentStepIndex = (0,react_.useCallback)((stepIndex)=>{
        onStepChange?.(stepIndex, "set");
        _setCurrentStepIndex(stepIndex);
    }, [
        onStepChange
    ]);
    (0,react_.useEffect)(()=>{
        if (props.step && !isNaN(props.step) && props.step !== currentStepRef.current && props.steps[props.step] != null) {
            _setCurrentStepIndex(props.step);
        }
    }, [
        props.step,
        props.steps
    ]);
    const hasNextScreen = currentStepIndex < props.steps.length - 1;
    const hasPreviousScreen = currentStepIndex > 0;
    const incrementStep = (0,react_.useCallback)(()=>{
        _setCurrentStepIndex((csi)=>{
            onStepChange?.(csi + 1, "increment");
            return csi + 1;
        });
    }, [
        onStepChange
    ]);
    const decrementStep = (0,react_.useCallback)(()=>{
        _setCurrentStepIndex((csi)=>{
            onStepChange?.(csi - 1, "decrement");
            return csi - 1;
        });
    }, [
        onStepChange
    ]);
    const partialScreenProps = {
        ..."extraScreenProps" in props ? props.extraScreenProps : {},
        key: "step-" + currentStepIndex,
        hasNextScreen: hasNextScreen || (props.parentScreenProps?.hasNextScreen ?? false),
        hasPreviousScreen: hasPreviousScreen || (props.parentScreenProps?.hasNextScreen ?? false),
        nextScreen: hasNextScreen ? incrementStep : props.parentScreenProps?.hasNextScreen ? props.parentScreenProps.nextScreen : undefined,
        previousScreen: hasPreviousScreen ? decrementStep : props.parentScreenProps?.hasPreviousScreen ? props.parentScreenProps.previousScreen : undefined,
        skipSteps: props.parentScreenProps && props.parentScreenProps.hasNextScreen ? props.parentScreenProps.nextScreen : undefined
    };
    const name = typeof currentStep.name === "function" ? currentStep.name(partialScreenProps) : currentStep.name;
    const description = typeof currentStep.description === "function" ? currentStep.description(partialScreenProps) : currentStep.description;
    const screenProps = {
        ...partialScreenProps,
        name,
        description
    };
    return {
        screenProps,
        currentStepIndex,
        setCurrentStepIndex: setCurrentStepIndex,
        currentStep: props.steps[currentStepIndex]
    };
};

;// CONCATENATED MODULE: external "@heroicons/react/24/solid"
const _24_solid_namespaceObject = require("@heroicons/react/24/solid");
;// CONCATENATED MODULE: ./components/common/vertical-steps.tsx




const VerticalSteps = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("nav", {
        "aria-label": "Progress",
        children: /*#__PURE__*/ jsx_runtime_.jsx("ol", {
            role: "list",
            className: "overflow-hidden",
            children: props.steps.map((step, stepIdx)=>{
                const name = typeof step.name === "function" ? step.name(props.screenProps) : step.name;
                const description = typeof step.description === "function" ? step.description(props.screenProps) : step.description;
                return /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: (0,external_tailwind_merge_namespaceObject.twJoin)(stepIdx !== props.steps.length - 1 ? "pb-10" : "", "relative"),
                    children: props.currentStepIndex > stepIdx ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-brand-600 dark:bg-brand-500",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: "group relative flex cursor-pointer items-start",
                                onClick: ()=>props.setCurrentStepIndex(stepIdx),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flex h-9 items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 dark:bg-brand-500",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(_24_solid_namespaceObject.CheckIcon, {
                                                className: "h-5 w-5 text-brand-100 dark:text-brand-900",
                                                "aria-hidden": "true"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold uppercase tracking-wide dark:text-zinc-200",
                                                children: name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-zinc-500 dark:text-zinc-400",
                                                children: description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }) : props.currentStepIndex === stepIdx ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-zinc-300 dark:bg-zinc-700",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: "group relative flex items-start",
                                "aria-current": "step",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flex h-9 items-center",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-600 bg-white dark:border-brand-500 dark:bg-zinc-800",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "h-2.5 w-2.5 rounded-full bg-brand-600 dark:bg-brand-500"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-500",
                                                children: name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-zinc-500 dark:text-zinc-400",
                                                children: description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-zinc-300 dark:bg-zinc-700",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: "group relative flex items-start",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flex h-9 items-center",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "h-2.5 w-2.5 rounded-full bg-transparent"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 flex min-w-0 flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-200",
                                                children: name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-zinc-500 dark:text-zinc-400",
                                                children: description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }, name);
            })
        })
    });
};

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.2.4_@babel+core@7.21.0_react-dom@18.2.0_react@18.2.0/node_modules/next/link.js
var next_link = __webpack_require__(6890);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/common/button.tsx







const buttonStyle = (0,external_class_variance_authority_namespaceObject.cva)("inline-flex space-x-2 items-center px-4 py-2 border text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 capitalize", {
    variants: {
        intent: {
            danger: "text-red-50 bg-red-500 hover:bg-red-600 border-transparent focus:ring-offset-2 focus:ring-red-600 dark:focus:ring-offset-zinc-900",
            warning: "text-white bg-yellow-500 hover:bg-yellow-600 border-transparent focus:ring-offset-2 focus:ring-yellow-600 dark:focus:ring-offset-zinc-900",
            info: "text-blue-50 bg-blue-500 hover:bg-blue-600 border-transparent focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-zinc-900",
            primary: "text-brand-900 bg-brand-500 hover:bg-brand-600 border-transparent focus:ring-offset-2 focus:ring-brand-600 dark:focus:ring-offset-zinc-900",
            success: "text-green-100 bg-green-500 hover:bg-green-600 border-transparent focus:ring-offset-2 focus:ring-green-600 dark:focus:ring-offset-zinc-900",
            indeterminate: "border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-black dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 focus:ring-offset-2 focus:ring-green-600 dark:focus:ring-offset-zinc-900",
            plain: "border-transparent shadow-none bg-transparent text-zinc-700 dark:text-zinc-300 hover:underline hover:text-zinc-800 dark:hover:text-zinc-200 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-offset-zinc-100"
        },
        disabled: {
            true: "opacity-60 cursor-not-allowed"
        }
    },
    compoundVariants: [
        {
            intent: "primary",
            disabled: true,
            class: "hover:bg-brand-500"
        },
        {
            intent: "danger",
            disabled: true,
            class: "hover:bg-red-500"
        },
        {
            intent: "warning",
            disabled: true,
            class: "hover:bg-yellow-500"
        },
        {
            intent: "indeterminate",
            disabled: true,
            class: "hover:bg-zinc-100 dark:hover:bg-zinc-900"
        },
        {
            intent: "info",
            disabled: true,
            class: "hover:bg-blue-500"
        }
    ],
    defaultVariants: {
        intent: "primary",
        disabled: false
    }
});
const Button = (props)=>{
    const buttonClasses = (0,external_tailwind_merge_namespaceObject.twMerge)(buttonStyle({
        intent: props.intent,
        disabled: props.disabled
    }), props.className);
    if (props.href) {
        return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: props.href,
            className: buttonClasses,
            onClick: props.onClick,
            title: props.title,
            children: props.children
        });
    }
    if (props.dropdownItems && props.onClick == null) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu, {
            as: "span",
            className: "relative inline-block text-left",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu.Button, {
                    className: buttonClasses,
                    title: props.title,
                    disabled: !!props.disabled,
                    children: [
                        props.children,
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronDownIcon, {
                            className: "-mr-1 ml-2 h-5 w-5",
                            "aria-hidden": "true"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition, {
                    as: react_.Fragment,
                    enter: "transition ease-out duration-100",
                    enterFrom: "transform opacity-0 scale-95",
                    enterTo: "transform opacity-100 scale-100",
                    leave: "transition ease-in duration-75",
                    leaveFrom: "transform opacity-100 scale-100",
                    leaveTo: "transform opacity-0 scale-95",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Items, {
                        className: "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-800 dark:bg-zinc-900 dark:shadow-black dark:ring-zinc-800",
                        children: props.dropdownItems.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "py-1",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                    children: ({ active  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            onClick: item.onClick,
                                            className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300", "block cursor-pointer break-words px-4 py-2 text-sm"),
                                            children: item.title
                                        })
                                })
                            }, item.title))
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        className: buttonClasses,
        onClick: props.disabled ? undefined : props.onClick,
        title: props.title,
        children: props.children
    });
};

;// CONCATENATED MODULE: ./components/step-nav-buttons.tsx





const StepNavButtons = (props)=>{
    const leftIcon = props.left.isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
        noMargin: true,
        className: "mr-3 dark:text-black"
    }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.PlayIcon, {
        className: "mr-3 h-5 w-5 rotate-180",
        "aria-hidden": "true"
    });
    const left = props.left.onClick ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex flex-1 justify-start",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
            intent: "indeterminate",
            disabled: props.left.disabled,
            onClick: !props.left.isLoading ? props.left.onClick : undefined,
            title: props.left.title,
            className: props.left.isLoading ? "cursor-wait" : "cursor-pointer",
            children: [
                leftIcon,
                props.left.label ?? "Back"
            ]
        })
    }) : null;
    const rightIcon = props.right.isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
        noMargin: true,
        className: "ml-3 dark:text-black"
    }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.PlayIcon, {
        className: "ml-3 h-5 w-5",
        "aria-hidden": "true"
    });
    const right = props.right.onClick ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-1 justify-end space-x-4",
        children: [
            props.skip && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
                intent: "indeterminate",
                onClick: props.skip.onClick,
                disabled: props.skip.disabled,
                title: props.skip.title,
                children: [
                    props.skip.label ?? "Skip",
                    /*#__PURE__*/ jsx_runtime_.jsx(outline_.ForwardIcon, {
                        className: "ml-3 h-5 w-5",
                        "aria-hidden": "true"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
                intent: "primary",
                disabled: props.right.disabled,
                onClick: !props.right.isLoading ? props.right.onClick : undefined,
                title: props.right.title,
                className: props.right.isLoading ? "cursor-wait" : "cursor-pointer",
                children: [
                    props.right.label ?? "Next",
                    rightIcon
                ]
            })
        ]
    }) : null;
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "px-8 pb-5",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
            className: "flex items-center justify-between border-t border-zinc-200    bg-white py-3 dark:border-zinc-700 dark:bg-zinc-800",
            "aria-label": "Pagination",
            children: [
                left,
                right
            ]
        })
    });
};

// EXTERNAL MODULE: ./utils/trpc.ts
var utils_trpc = __webpack_require__(945);
// EXTERNAL MODULE: ./hooks/usePrinterConfiguration.tsx
var usePrinterConfiguration = __webpack_require__(2312);
;// CONCATENATED MODULE: ./components/forms/dropdown.tsx










const OnDropdownOpened = ({ open , onShown  })=>{
    (0,react_.useEffect)(()=>{
        if (open) {
            onShown();
        }
    }, [
        open,
        onShown
    ]);
    return null;
};
const useDropdownPrinterQueryState = (query, vars, serializedPrinterConfiguration)=>{
    const [isShown, setIsShown] = (0,react_.useState)(false);
    const serializedConfig = (0,usePrinterConfiguration/* useSerializedPrinterConfiguration */.TD)();
    // Gigantic hack to avoid suspense in parent components from killing our atom updates.
    const variables = vars ?? (serializedPrinterConfiguration ? {} : undefined);
    if (variables && serializedPrinterConfiguration != null) {
        variables[serializedPrinterConfiguration] = serializedConfig;
    }
    const data = utils_trpc/* trpc.printer */.SX.printer[query].useQuery(variables, {
        enabled: isShown
    });
    return {
        options: data.data ?? [],
        onShown: ()=>setIsShown(true),
        isFetching: data.isFetching
    };
};
const DropdownWithPrinterQuery = (props)=>{
    const { query , vars , serializedPrinterConfiguration , ...rest } = props;
    const queryProps = useDropdownPrinterQueryState(query, vars, serializedPrinterConfiguration);
    return /*#__PURE__*/ jsx_runtime_.jsx((react_default()).Suspense, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Dropdown, {
            ...rest,
            ...queryProps
        })
    });
};
const Dropdown = (props)=>{
    const { onSelect , value  } = props;
    const onSelected = (0,react_.useCallback)((newSelection)=>{
        const option = props.options.find((o)=>o.id === newSelection);
        if (option) {
            onSelect?.(option);
        }
    }, [
        onSelect,
        props.options
    ]);
    const options = props.sort == false ? props.options : props.options.slice(0).sort((a, b)=>a.title.localeCompare(b.title));
    return /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Listbox, {
        value: value?.id ?? value === null ? null : undefined,
        onChange: onSelected,
        disabled: props.disabled,
        children: ({ open  })=>{
            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Listbox.Label, {
                        className: "block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300",
                        children: props.label
                    }),
                    props.onShown && /*#__PURE__*/ jsx_runtime_.jsx(OnDropdownOpened, {
                        open: open,
                        onShown: props.onShown
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "relative mt-1",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Listbox.Button, {
                                className: "relative flex w-full cursor-default items-center justify-between rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:focus:ring-brand-400",
                                disabled: props.disabled,
                                title: value?.title,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "flex-1 truncate",
                                        children: value?.title ?? "Pick from the list..."
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "-mr-1.5 flex items-center space-x-1",
                                        children: props.badge && (!Array.isArray(props.badge) ? [
                                            props.badge
                                        ] : props.badge).map((badge, i)=>/*#__PURE__*/ (0,react_.createElement)(Badge, {
                                                ...badge,
                                                key: i,
                                                color: badge.color ?? (props.disabled ? "plain" : badge.color),
                                                size: "sm"
                                            }))
                                    }),
                                    !props.disabled && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "pointer-events-none -mr-4 flex items-center pr-2",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronUpDownIcon, {
                                            className: "h-5 w-5 text-zinc-400",
                                            "aria-hidden": "true"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition, {
                                show: open,
                                as: react_.Fragment,
                                enter: "transition duration-150 ease-out",
                                enterFrom: "transform translate-y-1 opacity-0",
                                enterTo: "transform translate-y-0 opacity-100",
                                leave: "transition duration-200 ease-out",
                                leaveFrom: "transform translate-y-0 opacity-100",
                                leaveTo: "transform translate-y-1 opacity-0",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Listbox.Options, {
                                    className: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md focus:outline-none sm:text-sm dark:bg-zinc-900 dark:scrollbar-thumb-zinc-600",
                                    children: [
                                        props.isFetching && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
                                        }),
                                        !props.isFetching && options.length === 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500",
                                            children: "No options available"
                                        }),
                                        options.map((option)=>/*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Listbox.Option, {
                                                className: ({ active  })=>(0,external_tailwind_merge_namespaceObject.twJoin)(active ? "dark bg-brand-600 text-white" : "text-zinc-900 dark:text-zinc-300", "relative cursor-default select-none py-2 pl-3 pr-9"),
                                                value: option.id,
                                                children: ({ selected , active  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                className: (0,external_tailwind_merge_namespaceObject.twJoin)(selected ? "font-semibold" : "font-normal", "flex items-center space-x-2 truncate"),
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: option.title
                                                                    }),
                                                                    " ",
                                                                    option.badge && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                                                        ...option.badge,
                                                                        color: active ? "plain" : option.badge.color,
                                                                        size: "sm"
                                                                    })
                                                                ]
                                                            }),
                                                            selected ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "text-white" : "text-brand-600", "absolute inset-y-0 right-0 flex items-center pr-4"),
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.CheckIcon, {
                                                                    className: "h-5 w-5",
                                                                    "aria-hidden": "true"
                                                                })
                                                            }) : null
                                                        ]
                                                    })
                                            }, option.id))
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });
        }
    });
};

;// CONCATENATED MODULE: ./components/common/banner.tsx





const bannerStyle = (0,external_class_variance_authority_namespaceObject.cva)("rounded-md p-4 border", {
    variants: {
        color: {
            red: [
                badgeBackgroundColorStyle({
                    color: "red"
                }),
                badgeBorderColorStyle({
                    color: "red"
                }),
                badgeTextColorStyle({
                    color: "red"
                })
            ],
            yellow: [
                badgeBackgroundColorStyle({
                    color: "yellow"
                }),
                badgeBorderColorStyle({
                    color: "yellow"
                }),
                badgeTextColorStyle({
                    color: "yellow"
                })
            ],
            orange: [
                badgeBackgroundColorStyle({
                    color: "orange"
                }),
                badgeBorderColorStyle({
                    color: "orange"
                }),
                badgeTextColorStyle({
                    color: "orange"
                })
            ],
            green: [
                badgeBackgroundColorStyle({
                    color: "green"
                }),
                badgeBorderColorStyle({
                    color: "green"
                }),
                badgeTextColorStyle({
                    color: "green"
                })
            ],
            lime: [
                badgeBackgroundColorStyle({
                    color: "lime"
                }),
                badgeBorderColorStyle({
                    color: "lime"
                }),
                badgeTextColorStyle({
                    color: "lime"
                })
            ],
            blue: [
                badgeBackgroundColorStyle({
                    color: "blue"
                }),
                badgeBorderColorStyle({
                    color: "blue"
                }),
                badgeTextColorStyle({
                    color: "blue"
                })
            ],
            sky: [
                badgeBackgroundColorStyle({
                    color: "sky"
                }),
                badgeBorderColorStyle({
                    color: "sky"
                }),
                badgeTextColorStyle({
                    color: "sky"
                })
            ],
            indigo: [
                badgeBackgroundColorStyle({
                    color: "indigo"
                }),
                badgeBorderColorStyle({
                    color: "indigo"
                }),
                badgeTextColorStyle({
                    color: "indigo"
                })
            ],
            purple: [
                badgeBackgroundColorStyle({
                    color: "purple"
                }),
                badgeBorderColorStyle({
                    color: "purple"
                }),
                badgeTextColorStyle({
                    color: "purple"
                })
            ],
            pink: [
                badgeBackgroundColorStyle({
                    color: "pink"
                }),
                badgeBorderColorStyle({
                    color: "pink"
                }),
                badgeTextColorStyle({
                    color: "pink"
                })
            ],
            brand: [
                badgeBackgroundColorStyle({
                    color: "brand"
                }),
                badgeBorderColorStyle({
                    color: "brand"
                }),
                badgeTextColorStyle({
                    color: "brand"
                })
            ],
            gray: [
                badgeBackgroundColorStyle({
                    color: "gray"
                }),
                badgeBorderColorStyle({
                    color: "gray"
                }),
                badgeTextColorStyle({
                    color: "gray"
                })
            ]
        }
    },
    defaultVariants: {
        color: "gray"
    }
});
const Banner = (props)=>{
    const { Icon , className , title  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (0,external_tailwind_merge_namespaceObject.twMerge)(bannerStyle({
            color: props.color
        }), props.className),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex-shrink-0",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Icon, {
                        className: (0,external_tailwind_merge_namespaceObject.twJoin)("h-5 w-5"),
                        "aria-hidden": "true"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "ml-3 flex-1",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: (0,external_tailwind_merge_namespaceObject.twJoin)("text-sm font-bold"),
                            children: props.title
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "mt-2 text-sm",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: props.children
                            })
                        })
                    ]
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./components/common/error-message.tsx





const ErrorMessage = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Banner, {
        color: "red",
        Icon: _24_solid_namespaceObject.XCircleIcon,
        title: props.title ? "Error: " + props.title : "Error",
        className: (0,external_tailwind_merge_namespaceObject.twMerge)(props.className, "whitespace-pre-wrap"),
        children: props.children
    });
};

;// CONCATENATED MODULE: ./components/forms/toggle.tsx




const Toggle = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Switch.Group, {
        as: "div",
        className: "flex items-center justify-between gap-x-2",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex flex-grow flex-col",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Switch.Label, {
                        as: "span",
                        className: (0,external_tailwind_merge_namespaceObject.twMerge)("text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300", props.onLabel && props.value && "opacity-70", props.onLabel && !props.value && "text-brand-700 dark:text-brand-500"),
                        passive: true,
                        children: props.label
                    }),
                    props.description && /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Switch.Description, {
                        as: "span",
                        className: "text-sm text-zinc-500 dark:text-zinc-400",
                        children: props.description
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Switch, {
                checked: props.value,
                onChange: props.onChange,
                className: (0,external_tailwind_merge_namespaceObject.twJoin)(props.value && props.onLabel == null ? "bg-brand-600" : "bg-zinc-200 dark:bg-zinc-900", "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"),
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    "aria-hidden": "true",
                    className: (0,external_tailwind_merge_namespaceObject.twJoin)(props.value ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md shadow-black/20 ring-0 transition duration-200 ease-in-out dark:border-t dark:border-zinc-600 dark:bg-zinc-700 dark:shadow-black/100 ")
                })
            }),
            props.onLabel && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "flex flex-grow flex-col",
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Switch.Label, {
                    as: "span",
                    className: (0,external_tailwind_merge_namespaceObject.twMerge)("text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300", props.onLabel && !props.value && "opacity-70", props.onLabel && props.value && "text-brand-700 dark:text-brand-500"),
                    passive: true,
                    children: props.onLabel
                })
            })
        ]
    });
};

// EXTERNAL MODULE: ./data/drivers.ts
var drivers = __webpack_require__(1880);
// EXTERNAL MODULE: ./data/steppers.ts
var data_steppers = __webpack_require__(817);
;// CONCATENATED MODULE: ./components/forms/text-input.tsx





let uid = 0;
const TextInput = (props)=>{
    const fieldId = (0,react_.useRef)(uid++);
    const { onChange: _onChange  } = props;
    const [isPasswordVisible, setIsPasswordVisible] = (0,react_.useState)(false);
    let iconClass = (0,external_tailwind_merge_namespaceObject.twJoin)("h-5 w-5", props.error ? "text-red-500" : "text-red-500");
    const icon = props.error ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
        children: /*#__PURE__*/ jsx_runtime_.jsx(_24_solid_namespaceObject.ExclamationCircleIcon, {
            className: "h-5 w-5 text-red-500",
            "aria-hidden": "true"
        })
    }) : null;
    const inputClass = (0,external_tailwind_merge_namespaceObject.twJoin)(props.error ? "ring-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 dark:ring-red-500 dark:text-red-400 dark:placeholder-red-700" : "ring-zinc-300 text-zinc-900 placeholder-zinc-300 focus:ring-brand-600 dark:ring-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-700 dark:focus:ring-brand-400 ", "block w-full rounded-md bg-white py-1.5 pl-3 pr-3 text-leftshadow-sm ring-1 ring-inset focus:outline-none dark:bg-zinc-900 sm:text-sm sm:leading-6 border-0");
    const error = props.error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
        className: "mt-2 text-sm text-red-600",
        id: fieldId.current + "-error",
        children: props.error
    }) : null;
    const help = props.help ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
        className: "mt-2 text-sm text-zinc-500",
        id: "email-description",
        children: props.help
    }) : null;
    const onChange = (0,react_.useCallback)((e)=>{
        _onChange?.(props.type === "number" ? parseFloat(e.currentTarget.value) : e.currentTarget.value);
    }, [
        _onChange,
        props.type
    ]);
    const togglePasswordVisibility = (0,react_.useCallback)(()=>{
        setIsPasswordVisible((b)=>!b);
    }, []);
    const iconRight = icon != null ? "right-6" : "right-0";
    const visibility = props.type === "password" ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        onClick: togglePasswordVisibility,
        className: `absolute inset-y-0 ${iconRight} flex cursor-pointer items-center pr-3`,
        children: isPasswordVisible ? /*#__PURE__*/ jsx_runtime_.jsx(outline_.EyeSlashIcon, {
            className: "h-5 w-5 text-zinc-400"
        }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.EyeIcon, {
            className: "h-5 w-5 text-zinc-400"
        })
    }) : null;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                className: "block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300",
                children: props.label
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "relative mt-1 rounded-md shadow-sm",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        ...props,
                        type: isPasswordVisible ? "text" : props.type,
                        className: inputClass,
                        placeholder: props.placeholder,
                        defaultValue: props.defaultValue,
                        value: props.value,
                        onChange: onChange,
                        "aria-invalid": !!props.error,
                        "aria-describedby": props.error ? fieldId.current + "-error" : undefined
                    }),
                    icon,
                    visibility
                ]
            }),
            error ?? help
        ]
    });
};

// EXTERNAL MODULE: ./zods/motion.tsx
var motion = __webpack_require__(6680);
// EXTERNAL MODULE: ./utils/serialization.ts
var serialization = __webpack_require__(206);
// EXTERNAL MODULE: ./recoil/printer.ts
var recoil_printer = __webpack_require__(5155);
// EXTERNAL MODULE: ./zods/toolhead.tsx
var zods_toolhead = __webpack_require__(4130);
// EXTERNAL MODULE: ./data/endstops.ts
var endstops = __webpack_require__(1572);
;// CONCATENATED MODULE: ./hooks/useToolheadConfiguration.tsx








const useToolhead = (toolOrAxis)=>{
    const toolheadConfigs = (0,external_recoil_.useRecoilValue)(recoil_toolhead/* PrinterToolheadsState */.$T);
    const toolhead = (0,react_.useMemo)(()=>{
        if (toolOrAxis == null) {
            return null;
        }
        const toolheads = toolheadConfigs?.filter(Boolean).map((th)=>new helpers_toolhead/* ToolheadHelper */.D(th));
        const th = toolheads?.find((th)=>th.getTool() === toolOrAxis || th.getMotionAxis() === toolOrAxis || th.getExtruderAxis() === toolOrAxis);
        return th;
    }, [
        toolOrAxis,
        toolheadConfigs
    ]);
    return toolhead;
};
const useToolheadConfiguration = (toolOrAxis, errorIfNotExist = true)=>{
    const toolheadConfigs = (0,external_recoil_.useRecoilValue)(recoil_toolhead/* LoadablePrinterToolheadsState */.wm);
    const toolheadConfigsRef = (0,react_.useRef)(toolheadConfigs);
    if (toolheadConfigsRef.current !== toolheadConfigs && toolheadConfigs.length > 0) {
        toolheadConfigsRef.current = toolheadConfigs.slice();
    }
    const toolhead = (0,react_.useMemo)(()=>{
        const toolheads = toolheadConfigsRef.current?.filter(Boolean).map((th)=>new helpers_toolhead/* ToolheadHelper */.D(th));
        const th = toolheads?.find((th)=>th.getTool() === toolOrAxis || th.getMotionAxis() === toolOrAxis || th.getExtruderAxis() === toolOrAxis);
        if (th == null && errorIfNotExist) {
            throw new Error(`Toolhead with number or axis ${toolOrAxis} not found`);
        }
        return th ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        errorIfNotExist,
        toolOrAxis,
        toolheadConfigsRef.current
    ]);
    const [hasManuallySelectedThermistor, setHasManuallySelectedThermistor] = (0,react_.useState)(false);
    const setToolhead = (0,external_recoil_.useRecoilCallback)(({ set , snapshot  })=>async (th)=>{
            const helper = new helpers_toolhead/* ToolheadHelper */.D(th);
            const currentConfig = await snapshot.getPromise((0,recoil_toolhead/* PrinterToolheadState */.AF)(helper.getTool()));
            if (currentConfig == null) {
                throw new Error(`Toolhead ${helper.getToolCommand()} not found`);
            }
            const current = new helpers_toolhead/* ToolheadHelper */.D(currentConfig);
            if (th.extruder.id != current.getExtruder().id) {
                if (th.extruder.stepper != null) {
                    const stepper = (0,serialization/* deserializeStepper */.WZ)(th.extruder.stepper);
                    if (stepper != null) {
                        set((0,recoil_printer/* PrinterRailState */.ew)(helper.getExtruderAxis()), (rail)=>{
                            return rail == null ? null : {
                                ...rail,
                                stepper: stepper.id,
                                current: th.extruder.current ?? stepper.maxPeakCurrent * 0.71
                            };
                        });
                    }
                }
            }
            if (th.toolboard?.id != current.getToolboard()?.id) {
                if (th.toolboard == null && th.xEndstop.id === "endstop-toolboard") {
                    th.xEndstop = endstops/* defaultXEndstop */.Jt;
                }
            }
            if (th.thermistor != current.getThermistor()) {
                setHasManuallySelectedThermistor(true);
            } else if (th.hotend.id != current.getHotend().id && !hasManuallySelectedThermistor) {
                th.thermistor = th.hotend.thermistor;
            }
            const val = zods_toolhead/* BaseToolheadConfiguration.extend */.PY.extend({
                toolNumber: zods_toolhead/* ToolNumber */.Qr
            }).nullable().parse({
                ...th,
                toolNumber: current.getTool()
            });
            set((0,recoil_toolhead/* PrinterToolheadState */.AF)(current.getTool()), val);
            return;
        }, [
        hasManuallySelectedThermistor
    ]);
    return {
        toolhead: toolhead,
        setToolhead
    };
};

;// CONCATENATED MODULE: ./components/setup-steps/printer-rail-settings.tsx















const PrinterRailSettings = (props)=>{
    const toolhead = useToolhead(props.printerRailDefault.axis);
    const usesToolboard = toolhead?.getExtruderAxis() === props.printerRailDefault.axis && toolhead?.hasToolboard();
    const board = usesToolboard ? toolhead.getToolboard() : props.selectedBoard;
    const setPrinterRail = (0,external_recoil_.useSetRecoilState)((0,recoil_printer/* PrinterRailState */.ew)(props.printerRail.axis));
    const integratedDriver = board?.integratedDrivers && board.integratedDrivers[props.printerRail.axis.startsWith("extruder") ? motion/* PrinterAxis.extruder */.po.extruder : props.printerRail.axis];
    const [driver, setDriver] = (0,react_.useState)(integratedDriver != null ? (0,serialization/* deserializeDriver */.Df)(integratedDriver) ?? props.printerRail.driver : props.printerRail.driver);
    const [stepper, setStepper] = (0,react_.useState)(props.printerRail.stepper);
    const [homingSpeed, setHomingSpeed] = (0,react_.useState)(props.performanceMode ? props.printerRailDefault.performanceMode?.homingSpeed ?? props.printerRailDefault.homingSpeed : props.printerRailDefault.homingSpeed);
    const [motorSlot, setMotorSlot] = (0,react_.useState)(props.printerRail.motorSlot);
    const guessMotorSlot = utils_trpc/* trpc.mcu.reversePinLookup.useQuery */.SX.mcu.reversePinLookup.useQuery({
        axis: props.printerRail.axis,
        hasToolboard: toolhead?.hasToolboard() ?? false,
        boardPath: board?.path ?? ""
    }, {
        enabled: !!board
    });
    (0,react_.useEffect)(()=>{
        if (guessMotorSlot.data && motorSlot == null) {
            setMotorSlot(guessMotorSlot.data);
        }
    }, [
        guessMotorSlot.data,
        motorSlot
    ]);
    const supportedVoltages = (0,motion/* getSupportedVoltages */.Wx)(board, driver).map((v)=>{
        return {
            ...v,
            badge: (0,data_steppers/* findPreset */.a)(stepper, driver, v.id, undefined, props.performanceMode) != null ? {
                children: "Tuned Preset",
                color: "sky"
            } : undefined
        };
    });
    const [voltage, setVoltage] = (0,react_.useState)(supportedVoltages.find((v)=>v.id === props.printerRail.voltage) ?? supportedVoltages.find((v)=>v.id === (props.performanceMode && props.printerRailDefault.performanceMode?.voltage ? props.printerRailDefault.performanceMode.voltage : props.printerRailDefault.voltage)) ?? supportedVoltages[0]);
    const [current, setCurrent] = (0,react_.useState)(props.performanceMode && props.printerRailDefault.performanceMode ? props.printerRailDefault.performanceMode.current : props.printerRail.current);
    const defaultPreset = (0,react_.useMemo)(()=>(0,data_steppers/* findPreset */.a)(props.printerRailDefault.stepper, props.printerRailDefault.driver, props.printerRailDefault.voltage, props.printerRailDefault.current), [
        props.printerRailDefault
    ]);
    const recommendedPreset = (0,react_.useMemo)(()=>(0,data_steppers/* findPreset */.a)(stepper, driver, voltage.id, undefined, props.performanceMode), [
        stepper,
        driver,
        voltage,
        props.performanceMode
    ]);
    const matchingPreset = (0,react_.useMemo)(()=>(0,data_steppers/* findPreset */.a)(stepper, driver, voltage.id, current, props.performanceMode), [
        stepper,
        driver,
        voltage,
        props.performanceMode,
        current
    ]);
    const supportedDrivers = drivers/* Drivers.filter */.N.filter((d)=>{
        return d.protocol === "UART" || board?.stepperSPI != null;
    }).map((d)=>{
        return {
            ...d,
            badge: (0,data_steppers/* findPreset */.a)(stepper, d, voltage.id, undefined, props.performanceMode) != null ? {
                children: "Tuned Preset",
                color: "sky"
            } : undefined
        };
    });
    const steppers = data_steppers/* Steppers.map */.B.map((s)=>{
        return {
            ...s,
            badge: (0,data_steppers/* findPreset */.a)(s, driver, voltage.id, undefined, props.performanceMode) != null ? {
                children: "Tuned Preset",
                color: "sky"
            } : undefined
        };
    });
    (0,react_.useEffect)(()=>{
        // If current rail configuration matches the default rail configuration, adapt current and voltage
        // to match the performance mode when performance mode changes.
        if ((0,motion/* matchesDefaultRail */.R_)(props.printerRail, props.printerRailDefault, !props.performanceMode)) {
            if (props.performanceMode && props.printerRailDefault.performanceMode) {
                setHomingSpeed(props.printerRailDefault.performanceMode.homingSpeed ?? props.printerRail.homingSpeed);
                if (props.printerRailDefault.performanceMode.voltage != null) {
                    setVoltage(supportedVoltages.find((sv)=>sv.id === (props.printerRailDefault.performanceMode?.voltage ?? props.printerRailDefault.voltage)) ?? supportedVoltages[0]);
                }
                if (props.printerRailDefault.performanceMode.current != null) {
                    setCurrent(props.printerRailDefault.performanceMode.current);
                }
            } else {
                setHomingSpeed(props.printerRailDefault.homingSpeed);
                setVoltage(supportedVoltages.find((sv)=>sv.id === props.printerRailDefault.voltage) ?? supportedVoltages[0]);
                setCurrent(props.printerRailDefault.current);
            }
        }
    // We don't want to react to anything other than performance mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.performanceMode
    ]);
    (0,react_.useEffect)(()=>{
        const currentVoltage = supportedVoltages.find((sv)=>sv.id === voltage.id);
        if (!currentVoltage) {
            setVoltage(recommendedPreset ? supportedVoltages.find((sv)=>sv.id === recommendedPreset.voltage) ?? supportedVoltages[0] : supportedVoltages[0]);
            if (recommendedPreset) {
                setCurrent(recommendedPreset.run_current);
            }
        }
    }, [
        supportedVoltages,
        voltage,
        recommendedPreset
    ]);
    (0,react_.useEffect)(()=>{
        const newState = {
            axis: props.printerRail.axis,
            axisDescription: props.printerRail.axisDescription,
            rotationDistance: props.printerRail.rotationDistance,
            homingSpeed: homingSpeed,
            motorSlot: motorSlot,
            driver,
            voltage: voltage.id,
            stepper,
            current
        };
        const serializedNew = (0,serialization/* serializePrinterRail */.Yz)(newState);
        const serializedOld = (0,serialization/* serializePrinterRail */.Yz)(props.printerRail);
        const isDirty = Object.keys(serializedNew).some((key)=>{
            return serializedNew[key] !== serializedOld[key];
        });
        if (isDirty) {
            setPrinterRail(serializedNew);
        }
    }, [
        current,
        driver,
        props.printerRail,
        homingSpeed,
        setPrinterRail,
        stepper,
        voltage.id,
        motorSlot
    ]);
    const isRecommendedPresetCompatible = recommendedPreset && recommendedPreset.run_current === current;
    const extruderName = props.printerRail.axis === "extruder" ? "Extruder T0" : props.printerRail.axis === motion/* PrinterAxis.extruder1 */.po.extruder1 ? "Extruder T1" : "Stepper " + props.printerRail.axis.toLocaleUpperCase();
    return props.isVisible ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "break-inside-avoid-column rounded-md border border-zinc-300 p-4 shadow-lg dark:border-zinc-700",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: "text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300",
                        children: extruderName
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-sm text-zinc-500 dark:text-zinc-400",
                        children: props.printerRail.axisDescription
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2",
                children: [
                    board?.motorSlots != null && motorSlot != null && Object.keys(board.motorSlots).length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Dropdown, {
                            label: "Motor Slot",
                            options: Object.keys(board.motorSlots).map((ms)=>{
                                if (board.motorSlots?.[ms].title == null) {
                                    return null;
                                }
                                return {
                                    id: ms,
                                    title: board.motorSlots?.[ms].title
                                };
                            }).filter(Boolean),
                            onSelect: (ms)=>{
                                setMotorSlot(ms.id);
                            },
                            value: motorSlot ? {
                                id: motorSlot,
                                title: board.motorSlots?.[motorSlot].title
                            } : undefined
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Dropdown, {
                            label: "Driver",
                            options: supportedDrivers,
                            onSelect: setDriver,
                            value: driver,
                            disabled: integratedDriver != null,
                            badge: [
                                integratedDriver != null ? {
                                    children: "Integrated",
                                    color: "sky"
                                } : undefined,
                                usesToolboard ? {
                                    children: "Toolboard",
                                    color: "yellow"
                                } : undefined
                            ].filter(Boolean)
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Dropdown, {
                            label: "Stepper",
                            options: steppers,
                            onSelect: setStepper,
                            value: stepper
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-1",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Dropdown, {
                            label: "Voltage",
                            options: supportedVoltages,
                            onSelect: setVoltage,
                            value: voltage
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-1",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(TextInput, {
                            type: "number",
                            label: "Current",
                            value: current,
                            onChange: setCurrent,
                            inputMode: "decimal",
                            step: "any",
                            min: 0,
                            max: driver.maxCurrent
                        })
                    }),
                    stepper.maxPeakCurrent / 1.41 < current && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Banner, {
                        Icon: _24_solid_namespaceObject.FireIcon,
                        color: "yellow",
                        title: "Stepper overcurrent!",
                        className: "col-span-2",
                        children: [
                            "Your stepper motor is rated for ",
                            Math.floor(stepper.maxPeakCurrent * 100 / 1.41) / 100,
                            "A RMS, but you are using ",
                            current,
                            "A."
                        ]
                    }),
                    matchingPreset != null && /*#__PURE__*/ jsx_runtime_.jsx(Banner, {
                        Icon: outline_.LightBulbIcon,
                        color: "brand",
                        title: "Driver tuning applied!",
                        className: "col-span-2",
                        children: "RatOS preset applied automatically."
                    }),
                    matchingPreset?.run_current !== defaultPreset?.run_current && recommendedPreset && !isRecommendedPresetCompatible && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Banner, {
                        Icon: outline_.BoltIcon,
                        color: "sky",
                        title: "Recommended tuning preset available at different current",
                        className: "col-span-2",
                        children: [
                            "RatOS has a recommended preset for your current settings at ",
                            recommendedPreset.run_current,
                            "A. You can",
                            " ",
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: "cursor-pointer font-bold underline hover:no-underline",
                                onClick: ()=>setCurrent(recommendedPreset.run_current),
                                children: [
                                    "change the current to ",
                                    recommendedPreset.run_current,
                                    "A"
                                ]
                            }),
                            " ",
                            "to apply the preset automatically."
                        ]
                    })
                ]
            })
        ]
    }) : null;
};

// EXTERNAL MODULE: ./node_modules/.pnpm/@formkit+auto-animate@0.8.0/node_modules/@formkit/auto-animate/react/index.mjs + 1 modules
var react = __webpack_require__(6187);
;// CONCATENATED MODULE: ./components/warning-message.tsx




const WarningMessage = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Banner, {
        color: "yellow",
        Icon: _24_solid_namespaceObject.ExclamationCircleIcon,
        title: props.title ? "Warning: " + props.title : "Warning",
        className: props.className,
        children: props.children
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/toolhead-settings.tsx









const ToolheadSettings = (props)=>{
    const { toolhead , setToolhead  } = useToolheadConfiguration(props.toolOrAxis);
    const [selectedHotend, setSelectedHotend] = (0,react_.useState)(toolhead.getHotend() ?? null);
    const [selectedExtruder, setSelectedExtruder] = (0,react_.useState)(toolhead.getExtruder() ?? null);
    const [selectedThermistor, setSelectedThermistor] = (0,react_.useState)(toolhead.getThermistor() ?? null);
    const [selectedProbe, setSelectedProbe] = (0,react_.useState)(toolhead.getProbe() ?? null);
    const [selectedXEndstop, setSelectedXEndstop] = (0,react_.useState)(toolhead.getXEndstop() ?? null);
    const [selectedYEndstop, setSelectedYEndstop] = (0,react_.useState)(toolhead.getYEndstop() ?? null);
    const [selectedPartFan, setSelectedPartFan] = (0,react_.useState)(toolhead.getPartFan() ?? null);
    const [selectedHotendFan, setSelectedHotendFan] = (0,react_.useState)(toolhead.getHotendFan() ?? null);
    const [selectedXAccelerometer, setSelectedXAccelerometer] = (0,react_.useState)(toolhead.getXAccelerometer() ?? null);
    const [selectedYAccelerometer, setSelectedYAccelerometer] = (0,react_.useState)(toolhead.getYAccelerometer() ?? null);
    (0,react_.useEffect)(()=>{
        const updated = toolhead.getChangeSet({
            hotend: selectedHotend,
            extruder: selectedExtruder,
            thermistor: selectedThermistor,
            probe: selectedProbe ?? undefined,
            xEndstop: selectedXEndstop,
            yEndstop: selectedYEndstop,
            partFan: selectedPartFan,
            hotendFan: selectedHotendFan,
            xAccelerometer: selectedXAccelerometer,
            yAccelerometer: selectedYAccelerometer
        });
        if (updated && Object.keys(updated).length > 0) {
            setToolhead({
                ...toolhead.getConfig(),
                ...updated
            });
        }
    }, [
        selectedExtruder,
        selectedHotend,
        selectedHotendFan,
        selectedPartFan,
        selectedProbe,
        selectedThermistor,
        selectedXAccelerometer,
        selectedXEndstop,
        selectedYAccelerometer,
        selectedYEndstop,
        setToolhead,
        toolhead
    ]);
    if (toolhead == null) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "mt-4",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: "text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",
                            children: "Toolhead..."
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                            children: "Configure the hardware installed on your toolhead..."
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "mt-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mb-4 flex h-96 items-center justify-center",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (0,external_tailwind_merge_namespaceObject.twMerge)(badgeBorderColorStyle({
            color: "gray"
        }), "col-span-1 rounded-md border p-4 shadow-lg"),
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (0,external_tailwind_merge_namespaceObject.twMerge)(badgeBackgroundColorStyle({
                    color: "gray"
                }), badgeTextColorStyle({
                    color: "gray"
                }), badgeBorderColorStyle({
                    color: "gray"
                }), "-m-4 mb-0 rounded-t-md border-b p-4"),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                        className: "text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",
                        children: [
                            "Toolhead ",
                            toolhead.getToolCommand(),
                            " Hardware"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: "mt-2 max-w-4xl text-sm",
                        children: [
                            "Configure the hardware installed on ",
                            toolhead.getDescription().toLocaleLowerCase()
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            query: "hotends",
                            value: selectedHotend,
                            label: "Hotend",
                            onSelect: setSelectedHotend
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            label: "Hotend Thermistor",
                            query: "thermistors",
                            onSelect: (thermistor)=>{
                                setSelectedThermistor(thermistor.id);
                            },
                            value: (0,serialization/* stringToTitleObject */.DX)(selectedThermistor)
                        })
                    }),
                    toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === "PT1000" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-span-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(WarningMessage, {
                            title: "RatOS uses your toolboards alternate pullup resistor setting",
                            children: "Your toolboard has an option to use a separate pullup resistor for PT1000 sensors. This is usually done by inserting a jumper. Make sure you read the documentation for your board on how to enable the alternative resistor or you'll get ADC temperature errors in klipper."
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            label: "Extruder",
                            query: "extruders",
                            onSelect: setSelectedExtruder,
                            value: selectedExtruder
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            label: "Probe",
                            query: "probes",
                            onSelect: setSelectedProbe,
                            value: selectedProbe
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "X Endstop",
                            query: "xEndstops",
                            onSelect: setSelectedXEndstop,
                            value: selectedXEndstop
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "Y Endstop",
                            query: "yEndstops",
                            onSelect: setSelectedYEndstop,
                            value: selectedYEndstop
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "Part cooling fan",
                            query: "partFanOptions",
                            onSelect: setSelectedPartFan,
                            value: selectedPartFan
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "Hotend fan",
                            query: "hotendFanOptions",
                            onSelect: setSelectedHotendFan,
                            value: selectedHotendFan
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-700",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: "text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",
                        children: "Accelerometers"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                        children: "You can use the same accelerometer for both axes. If you don't plan on using an accelerometer, you can skip this and come back later if you change your mind."
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "X axis accelerometer",
                            query: "xAccelerometerOptions",
                            onSelect: setSelectedXAccelerometer,
                            value: selectedXAccelerometer,
                            sort: false
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                            vars: {
                                toolOrAxis: toolhead.getTool(),
                                config: {}
                            },
                            serializedPrinterConfiguration: "config",
                            label: "Y axis accelerometer",
                            query: "yAccelerometerOptions",
                            onSelect: setSelectedYAccelerometer,
                            value: selectedYAccelerometer,
                            sort: false
                        })
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/hardware-selection.tsx












const HardwareSelection = (props)=>{
    const [animate] = (0,react/* useAutoAnimate */.u)();
    const [railAnimate] = (0,react/* useAutoAnimate */.u)();
    const [advancedSteppers, setAdvancedSteppers] = (0,react_.useState)(false);
    const { selectedControllerFan , selectedBoard , selectedPrinter , performanceMode , setPerformanceMode , stealthchop , setStealthchop , standstillStealth , setStandstillStealth , selectedPrinterRails , setSelectedControllerFan: setControllerFan , serializedPrinterConfiguration , parsedPrinterConfiguration , partialPrinterConfiguration  } = (0,usePrinterConfiguration/* usePrinterConfiguration */.G3)();
    const errors = [];
    if (partialPrinterConfiguration != null) {
        if (parsedPrinterConfiguration.success === false) {
            parsedPrinterConfiguration.error.flatten().formErrors.forEach((message)=>{
                errors.push(message);
            });
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: "Select your printer hardware"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: "If your hardware isn't listed, pick the one closest to it and override as necessary in printer.cfg later"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        ref: animate,
                        className: "flex flex-col",
                        children: [
                            errors.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
                                className: "mb-4",
                                children: errors.map((e)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "mt-2",
                                        children: e
                                    }, e))
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "space-y-4",
                                children: serializedPrinterConfiguration?.toolheads?.map((th, i)=>th == null || th.axis == null ? null : /*#__PURE__*/ jsx_runtime_.jsx((react_default()).Suspense, {
                                        fallback: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {}),
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(ToolheadSettings, {
                                            toolOrAxis: th.axis
                                        })
                                    }, i))
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "flex",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            className: "flex-1 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",
                                            children: "Electronics"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                        children: "Configure miscellaneous electronics settings"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(DropdownWithPrinterQuery, {
                                        label: "Controller fan",
                                        query: "controllerFanOptions",
                                        vars: {
                                            config: serializedPrinterConfiguration
                                        },
                                        onSelect: setControllerFan,
                                        value: selectedControllerFan
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-4 border-t border-zinc-100 pt-8 dark:border-zinc-700",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                className: "flex-1 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",
                                                children: "Motion"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Toggle, {
                                                    label: "Simple",
                                                    onLabel: "Advanced",
                                                    onChange: setAdvancedSteppers,
                                                    value: !!advancedSteppers
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                        children: "Configure your stepper motor and driver settings"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-2 dark:border-zinc-700",
                                children: [
                                    selectedPrinter?.speedLimits.performance && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-span-2",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Toggle, {
                                            label: "Performance mode",
                                            description: "Increases the stepper power, max acceleration and velocity. Not recommended for initial setup. Requires actively cooled drivers (controller fan).",
                                            onChange: setPerformanceMode,
                                            value: !!performanceMode
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-span-2",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Toggle, {
                                            label: "Stealtchop",
                                            description: "Silent operation at the cost of a 135 mm/s velocity limit and less positional accuracy. Not recommended unless quiteness is absolutely necessary.",
                                            onChange: setStealthchop,
                                            value: !!stealthchop
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-span-2",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Toggle, {
                                            label: "Standstill Stealth",
                                            description: "Makes steppers stilent when idling, but can cause unpredictable behavior on some drivers. Can result in skipped steps and positional errors, use with caution.",
                                            onChange: setStandstillStealth,
                                            value: !!standstillStealth
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: selectedPrinter && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "grid gap-4 py-4 sm:grid-cols-2",
                            ref: railAnimate,
                            children: selectedPrinterRails.map((rail)=>{
                                const defaultRail = selectedPrinter.defaults.rails.find((r)=>r.axis === rail.axis);
                                if (defaultRail == null) {
                                    throw new Error("No printer default for axis " + rail.axis);
                                }
                                return /*#__PURE__*/ jsx_runtime_.jsx(PrinterRailSettings, {
                                    selectedBoard: selectedBoard,
                                    printerRail: rail,
                                    printerRailDefault: (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultRail),
                                    performanceMode: performanceMode,
                                    isVisible: advancedSteppers
                                }, rail.axis + (performanceMode ? "performance" : ""));
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                left: {
                    onClick: props.previousScreen
                },
                right: {
                    onClick: props.nextScreen,
                    disabled: !parsedPrinterConfiguration.success,
                    title: parsedPrinterConfiguration.success === false ? "Invalid printer configuration selected" : undefined
                }
            })
        ]
    });
};

// EXTERNAL MODULE: ./zods/boards.tsx
var boards = __webpack_require__(95);
;// CONCATENATED MODULE: ./components/common/query-status.tsx




const QueryStatus = (query)=>{
    const [parent] = (0,react/* useAutoAnimate */.u)();
    let content = null;
    if (query.isError) {
        content = /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "mb-4",
            children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
                children: query.error?.message
            })
        });
    }
    if (query.isLoading) {
        content = /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "mb-4 flex items-center justify-center bg-zinc-800",
            children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        ref: parent,
        children: content
    });
};

;// CONCATENATED MODULE: ./components/common/mutation-status.tsx



const MutationStatus = (mutation)=>{
    if (mutation.isError) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "mb-4 h-48",
            children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
                children: mutation.error?.message
            })
        });
    }
    if (mutation.isLoading && !mutation.isIdle && !mutation.isPaused) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "absolute right-5 top-9 mb-4 flex items-center",
            children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
        });
    }
    return null;
};

;// CONCATENATED MODULE: ./components/common/info-message.tsx




const InfoMessage = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Banner, {
        color: "blue",
        Icon: _24_solid_namespaceObject.InformationCircleIcon,
        title: props.title ? props.title : "Info",
        className: props.className,
        children: props.children
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/mcu/dfu-flash.tsx
/* eslint-disable @next/next/no-img-element */ 





const DFUFlash = (props)=>{
    const { data: dfuDetected , error  } = trpc/* trpc.mcu.dfuDetect.useQuery */.S.mcu.dfuDetect.useQuery({
        boardPath: props.board.path,
        toolhead: props.toolhead?.serialize()
    }, {
        refetchInterval: 1000
    });
    const flashDfuMutation = trpc/* trpc.mcu.dfuFlash.useMutation */.S.mcu.dfuFlash.useMutation({
        onSuccess: props.onSuccess
    });
    const [isFlashing, setIsFlashing] = (0,react_.useState)(false);
    const startFlash = (0,react_.useCallback)(async ()=>{
        setIsFlashing(true);
        flashDfuMutation.mutate({
            boardPath: props.board.path,
            toolhead: props.toolhead?.serialize()
        }, {
            onSettled: ()=>setIsFlashing(false)
        });
    }, [
        flashDfuMutation,
        props.board.path,
        props.toolhead
    ]);
    const dfuError = error ? /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
        children: error.message
    }) : null;
    const flashButtonTitle = isFlashing ? "Flashing..." : dfuDetected ? "Flash" : "Waiting for DFU...";
    const boardPathUri = "boardPath=" + encodeURIComponent(props.board.path);
    const instructions = props.board.dfu?.instructions.map((step, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
            children: step
        }, index));
    const detectionText = dfuDetected ? "DFU device detected" : "DFU not detected";
    const jumperReminder = dfuDetected && props.board.dfu?.hasBoot0Jumper ? /*#__PURE__*/ jsx_runtime_.jsx(InfoMessage, {
        title: "Reminder",
        children: "Make sure to remove the BOOT0 jumper from the board before flashing."
    }) : null;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                children: [
                    "Flashing ",
                    props.board.name,
                    " via DFU"
                ]
            }),
            dfuError,
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "mt-4 text-zinc-500 dark:text-zinc-400",
                children: [
                    "Status: ",
                    detectionText
                ]
            }),
            jumperReminder,
            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                intent: "primary",
                disabled: !dfuDetected || isFlashing,
                onClick: startFlash,
                children: flashButtonTitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                className: "text-sm font-medium text-zinc-900 dark:text-zinc-100",
                children: "DFU Boot Instructions"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "prose mt-4 text-base text-zinc-500 dark:text-zinc-400",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("ol", {
                        className: "mb-4 list-decimal pl-4",
                        children: instructions
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/configure/api/dfu-image?" + boardPathUri,
                        alt: "DFU boot buttons and/or jumper visualization"
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/common/modal.tsx

/* This example requires Tailwind CSS v2.0+ */ 


const Modal = (props)=>{
    const { onClick , onClose  } = props;
    const [open, setOpen] = (0,react_.useState)(true);
    const onButtonClick = (0,react_.useCallback)(()=>{
        onClick?.();
        setOpen(false);
    }, [
        onClick
    ]);
    const onDialogClose = (0,react_.useCallback)(()=>{
        onClose?.();
        setOpen(false);
    }, [
        onClose
    ]);
    const success = props.success ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full  bg-green-100 dark:bg-green-700",
        children: /*#__PURE__*/ jsx_runtime_.jsx(outline_.CheckIcon, {
            className: "h-6 w-6 text-green-600 dark:text-green-100",
            "aria-hidden": "true"
        })
    }) : null;
    return /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Root, {
        show: open,
        as: react_.Fragment,
        appear: true,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog, {
            as: "div",
            className: "fixed inset-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600",
            onClose: onDialogClose,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                        as: react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0",
                        enterTo: "opacity-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100",
                        leaveTo: "opacity-0",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog.Overlay, {
                            className: "fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-800 dark:bg-opacity-75"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "hidden sm:inline-block sm:h-screen sm:align-middle",
                        "aria-hidden": "true",
                        children: "​"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                        as: react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        enterTo: "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-zinc-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        success,
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "mt-3 text-center sm:mt-5",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog.Title, {
                                                    as: "h3",
                                                    className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: props.title
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "mt-2",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "text-sm text-zinc-500 dark:text-zinc-400",
                                                        children: props.body
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "mt-5 sm:mt-6",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: "inline-flex w-full justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 sm:text-sm",
                                        onClick: onButtonClick,
                                        children: props.buttonLabel
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/mcu/sd-card-flash.tsx
/**
 * 1) Check if board is already flashed and connected, if yes proceed to ?.
 * 2) Compile firmware for board and start download (if flash via sd card)
 * 3) Tell the user to follow the flashing instructions at os.ratrig.com. Poll board serial path in the background. Show tips about flashing.
 * 4) Once board presence is confirmed, verify automatic flashing if supported. (allow skipping)
 * 5) Printer configuration!
 */ 









const SDCardFlashing = (props)=>{
    const [shutdownModalVisible, setShutdownModalVisible] = (0,react_.useState)(false);
    const { query: moonrakerQuery , isReady  } = (0,useMoonraker/* useMoonraker */.o)();
    const [isFirmwareReady, setIsFirmwareReady] = (0,react_.useState)(false);
    const compile = trpc/* trpc.mcu.compile.useMutation */.S.mcu.compile.useMutation({
        onSuccess: ()=>setIsFirmwareReady(true),
        onError: ()=>setIsFirmwareReady(false)
    });
    const shutdownMutation = (0,external_react_query_namespaceObject.useMutation)(()=>{
        if (isReady) {
            return moonrakerQuery("machine.shutdown");
        }
        return Promise.reject("Cannot reboot raspberry pi: No connection to moonraker");
    });
    const shutdown = ()=>{
        shutdownMutation.mutate();
    };
    const onShutdown = ()=>{
        setShutdownModalVisible(true);
    };
    const compileButton = compile.isLoading ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        children: [
            "Compiling... ",
            /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
                className: "ml-1 inline",
                noMargin: true
            })
        ]
    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        children: [
            "Compile firmware ",
            /*#__PURE__*/ jsx_runtime_.jsx(_24_solid_namespaceObject.PlayIcon, {
                className: "inline h-5 w-5"
            })
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                children: [
                    props.board.manufacturer,
                    " ",
                    props.board.name,
                    " was not detected"
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                intent: "primary",
                onClick: isFirmwareReady ? undefined : ()=>compile.mutate({
                        boardPath: props.board.path,
                        toolhead: props.toolhead?.serialize()
                    }),
                className: "w-52 justify-center",
                disabled: compile.isLoading && !isFirmwareReady,
                href: isFirmwareReady ? "/api/download-firmware?boardPath=" + encodeURIComponent(props.board.path) : undefined,
                children: isFirmwareReady ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                    children: [
                        "Download firmware ",
                        /*#__PURE__*/ jsx_runtime_.jsx(_24_solid_namespaceObject.ArrowDownTrayIcon, {
                            className: "inline h-5 w-5"
                        })
                    ]
                }) : compileButton
            }),
            compile.error?.message ? /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
                children: compile.error?.message
            }) : null,
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "prose mt-4 text-base text-zinc-500 dark:text-zinc-400",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ol", {
                        className: "mb-4 list-decimal pl-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Disconnect all wires except Power and USB, and make sure your jumpers are set correctly."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Format the sd card for your board to FAT16 (sometimes just called FAT), or FAT32 with a clustersize of 8kb or 4kb."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "If you're reusing a card you've used for flashing before, be sure to delete ALL files on the card (or reformat it)."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Copy the firmware binary onto the sd card for your board"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: 'Make sure the firmware file is called firmware.bin on the sd card (enable "display file extensions" in your file explorer). The file you downloaded will already have the correct name.'
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Safely eject the SD card through your operating system."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Physically take out the sd card and insert it into your control board."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: "Click the reset button on the board, or turn it off and back on again. NOTE: if the Raspberry Pi running RatOS is currently powered by your control board or the same power source, please shut it down safely first by using the button below. When the green light stops blinking and is turned off, you can cut the power."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: 'Click "Check board status" below.'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex gap-x-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                intent: "indeterminate",
                                onClick: onShutdown,
                                children: "Shutdown RatOS"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                intent: "primary",
                                onClick: props.onSuccess,
                                children: "Check board status"
                            })
                        ]
                    })
                ]
            }),
            shutdownModalVisible ? /*#__PURE__*/ jsx_runtime_.jsx(Modal, {
                title: "Shutdown RatOS?",
                body: `You raspberry pi will shutdown and this page will become unresponsive until it's powered back on. Do not remove power before the green light on the Rasperry Pi has stopped blinking.`,
                buttonLabel: "Shutdown",
                onClick: shutdown,
                onClose: ()=>setTimeout(()=>setShutdownModalVisible(false), 500)
            }) : null
        ]
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/mcu/flash.tsx












const MCUFlashing = (props)=>{
    const [forceReflash, setForceReflash] = (0,react_.useState)(false);
    const [flashStrategy, setFlashStrategy] = (0,react_.useState)(null);
    const [flashPath, setFlashPath] = (0,react_.useState)(null);
    const { selectedControlboard , selectedToolboard , toolhead  } = props;
    const selectedBoardToFlash = toolhead ? selectedToolboard : selectedControlboard;
    const selectedBoard = selectedBoardToFlash?.board;
    const boardDetected = trpc/* trpc.mcu.detect.useQuery */.S.mcu.detect.useQuery({
        boardPath: selectedBoardToFlash?.board.path ?? "",
        toolhead: toolhead?.serialize()
    }, {
        refetchInterval: (data)=>{
            if (data === true) {
                return false;
            }
            return 1000;
        },
        enabled: selectedBoardToFlash !== null
    });
    const unidentifiedBoards = trpc/* trpc.mcu.unidentifiedDevices.useQuery */.S.mcu.unidentifiedDevices.useQuery();
    const boardVersion = trpc/* trpc.mcu.boardVersion.useQuery */.S.mcu.boardVersion.useQuery({
        boardPath: selectedBoardToFlash?.board.path ?? "",
        toolhead: toolhead?.serialize()
    }, {
        enabled: selectedBoardToFlash !== null && !!boardDetected.data && forceReflash === false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
    });
    const { data: klipperVersion  } = trpc/* trpc.klipperVersion.useQuery */.S.klipperVersion.useQuery(undefined, {
        refetchInterval: 60000
    });
    const flashViaPath = trpc/* trpc.mcu.flashViaPath.useMutation */.S.mcu.flashViaPath.useMutation({
        onSuccess: ()=>setForceReflash(false)
    });
    const reflash = (0,react_.useCallback)(()=>{
        setFlashStrategy(null);
        setForceReflash(true);
        setFlashPath(null);
        boardDetected.remove();
        boardVersion.remove();
    }, [
        boardVersion,
        boardDetected
    ]);
    let rightButton = {
        onClick: props.nextScreen,
        label: "Next",
        disabled: !boardDetected.data || forceReflash
    };
    let leftButton = {
        onClick: props.previousScreen
    };
    const onFlashViaPath = (0,react_.useCallback)(()=>{
        if (selectedBoard == null) return;
        setFlashStrategy("path");
        flashViaPath.mutate({
            boardPath: selectedBoard.path,
            toolhead: toolhead?.serialize()
        });
    }, [
        flashViaPath,
        selectedBoard,
        toolhead
    ]);
    let content = null;
    if (boardVersion.error && !forceReflash) {
        content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                    className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                    children: [
                        selectedBoard?.name,
                        " detected but is unresponsive."
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "Klipper doesn't seem to be running on your board, which may indicate faulty firmware or a faulty board. Please check your board and try flashing it again."
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
                        intent: "indeterminate",
                        onClick: reflash,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                children: "Flash again"
                            }),
                            " ",
                            /*#__PURE__*/ jsx_runtime_.jsx(outline_.ArrowPathIcon, {
                                className: "inline h-5 w-5"
                            })
                        ]
                    })
                })
            ]
        });
    } else if (boardVersion.isFetching) {
        content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                    className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
                            className: "relative -top-0.5 mr-2 inline",
                            noMargin: true
                        }),
                        " ",
                        selectedBoard?.name,
                        " detected, checking version..."
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: "Please wait while RatOS queries your board.."
                })
            ]
        });
    } else if (boardVersion.data || boardDetected.data && !forceReflash) {
        const dfuReminder = flashStrategy === "dfu" && selectedBoard?.dfu?.reminder ? /*#__PURE__*/ jsx_runtime_.jsx(InfoMessage, {
            title: "Reminder",
            children: selectedBoard?.dfu?.reminder
        }) : null;
        const versionMismatch = boardVersion.data != null && klipperVersion != null && boardVersion.data !== klipperVersion ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(WarningMessage, {
            title: "Version mismatch",
            children: [
                "The board is running version ",
                boardVersion.data,
                " but you your pi is on version ",
                klipperVersion,
                ". If you want to update your board click 'flash again' below."
            ]
        }) : null;
        content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                    className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(outline_.CheckCircleIcon, {
                            className: "relative -top-0.5 inline h-7 w-7 text-brand-700 dark:text-brand-500"
                        }),
                        " ",
                        selectedBoard?.name,
                        " detected"
                    ]
                }),
                dfuReminder,
                versionMismatch,
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                    children: [
                        "Proceed to the next step or",
                        " ",
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
                            intent: "indeterminate",
                            onClick: reflash,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: "Flash again"
                                }),
                                " ",
                                /*#__PURE__*/ jsx_runtime_.jsx(outline_.ArrowPathIcon, {
                                    className: "inline h-5 w-5"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    } else if (flashStrategy == null) {
        const dfuStrategyEnabled = selectedBoard?.dfu != null;
        const sdCardStrategyEnabled = !selectedBoard?.isToolboard;
        const pathStrategyEnabled = boardDetected.data && selectedBoard?.flashScript != null;
        const unidentifiedPathStrategyEnabled = unidentifiedBoards.data?.length;
        const dfu = /*#__PURE__*/ jsx_runtime_.jsx(Button, {
            intent: "indeterminate",
            onClick: ()=>setFlashStrategy("dfu"),
            disabled: !dfuStrategyEnabled,
            className: "justify-center",
            title: dfuStrategyEnabled ? undefined : "This board does not support DFU flashing.",
            children: "Flash manually via DFU"
        });
        const sdCard = /*#__PURE__*/ jsx_runtime_.jsx(Button, {
            intent: "indeterminate",
            onClick: ()=>setFlashStrategy("sdcard"),
            disabled: !sdCardStrategyEnabled,
            className: "justify-center",
            title: sdCardStrategyEnabled ? undefined : "This board does not support SD card flashing.",
            children: "Flash manually via SD card"
        });
        const path = /*#__PURE__*/ jsx_runtime_.jsx(Button, {
            intent: "indeterminate",
            onClick: onFlashViaPath,
            disabled: !pathStrategyEnabled,
            className: "justify-center",
            title: pathStrategyEnabled ? undefined : "Board was not detected.",
            children: "Flash automatically"
        });
        const unidentifiedPath = /*#__PURE__*/ jsx_runtime_.jsx(Button, {
            intent: "indeterminate",
            className: "justify-center",
            disabled: !unidentifiedPathStrategyEnabled,
            title: unidentifiedPathStrategyEnabled ? undefined : "No unidentified boards detected.",
            dropdownItems: unidentifiedBoards.data?.map((ub)=>({
                    onClick: ()=>{
                        if (selectedBoard == null) return;
                        setFlashStrategy("path");
                        setFlashPath(ub);
                        flashViaPath.mutate({
                            boardPath: selectedBoard.path,
                            flashPath: ub,
                            toolhead: toolhead?.serialize()
                        });
                    },
                    title: ub
                })),
            children: "Flash unidentified board"
        });
        content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                    className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                    children: [
                        "How do you want to flash your ",
                        selectedBoard?.name,
                        "?"
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
                    children: [
                        path,
                        dfu,
                        sdCard,
                        unidentifiedPath
                    ]
                })
            ]
        });
    } else {
        if (selectedBoard == null) {
            content = /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "prose mt-4 text-base text-red-700",
                    children: "You have to select a board before navigating to this screen."
                })
            });
        } else {
            switch(flashStrategy){
                case "dfu":
                    content = /*#__PURE__*/ jsx_runtime_.jsx(DFUFlash, {
                        board: selectedBoard,
                        onSuccess: ()=>setForceReflash(false),
                        toolhead: toolhead
                    });
                    break;
                case "sdcard":
                    content = /*#__PURE__*/ jsx_runtime_.jsx(SDCardFlashing, {
                        board: selectedBoard,
                        onSuccess: ()=>setForceReflash(false),
                        toolhead: toolhead
                    });
                    break;
                case "path":
                    content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                className: "text-xl font-medium text-zinc-900 dark:text-zinc-100",
                                children: [
                                    "Flashing ",
                                    selectedBoard.name,
                                    flashPath ? ` at ${flashPath}` : "",
                                    "..."
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "prose mt-4 text-base text-zinc-500",
                                children: "Please wait while RatOS flashes your board."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(MutationStatus, {
                                ...flashViaPath
                            })
                        ]
                    });
            }
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: props.name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: props.description
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "space-y-4 text-zinc-700 dark:text-zinc-300",
                        children: [
                            props.children,
                            content
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                right: rightButton,
                left: leftButton
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/card-selector.tsx





const CardSelector = (props)=>{
    const [selected, setSelected] = (0,react_.useState)(null);
    const { onSelect: _onSelect  } = props;
    const [parent] = (0,react/* useAutoAnimate */.u)();
    const onSelect = (0,react_.useCallback)((card)=>{
        if (props.value === undefined) {
            setSelected(card);
        }
        _onSelect?.(card);
    }, [
        _onSelect,
        props.value
    ]);
    (0,react_.useEffect)(()=>{
        if (props.value !== undefined) {
            setSelected(props.value);
        }
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.RadioGroup, {
        value: selected,
        onChange: onSelect,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                className: "sr-only",
                children: "Selector"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "space-y-4",
                ref: parent,
                children: props.cards.map((card, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Option, {
                        value: card,
                        className: ({ checked , active  })=>(0,external_tailwind_merge_namespaceObject.twJoin)(checked ? "border-transparent" : "border-zinc-300 dark:border-zinc-700", active ? "ring-2 ring-brand-600" : "", "relative flex cursor-pointer justify-between items-center rounded-lg border bg-white px-4 py-4 shadow-sm focus:outline-none dark:bg-zinc-900"),
                        children: ({ active , checked  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                                                as: "p",
                                                className: "text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2 mb-1",
                                                children: props.title ? props.title(card) : card.name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Description, {
                                                as: "div",
                                                className: "text-xs text-zinc-500 dark:text-zinc-400",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                    className: "sm:inline",
                                                    children: card.details
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Description, {
                                        as: "div",
                                        className: "mt-2 flex text-sm ml-4 sm:mt-0 sm:block sm:text-right",
                                        children: card.right
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "border" : "border-2", checked ? "border-brand-600" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                                        "aria-hidden": "true"
                                    })
                                ]
                            })
                    }, card.id))
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/mcu/pick.tsx






const MCUPicker = (props)=>{
    const { toolhead , skipSteps , setSelectedBoard , selectedControlboard , selectedToolboard , selectedPrinter , cards  } = props;
    // TODO: This should be determined on the basis of defined board drivers / heaters (check pins), whether it has an extruderless config and how many drivers and which axes the printer requires.
    const isToolboardRequired = (0,react_.useCallback)((controlboard = selectedControlboard)=>{
        return selectedPrinter != null && (controlboard?.board.driverCount ?? 0) < selectedPrinter.driverCountRequired;
    }, [
        selectedControlboard,
        selectedPrinter
    ]);
    const isBoardDetected = toolhead ? selectedToolboard?.board.detected : selectedControlboard?.board.detected;
    let content = /*#__PURE__*/ jsx_runtime_.jsx(CardSelector, {
        cards: cards,
        value: toolhead ? selectedToolboard : selectedControlboard,
        onSelect: setSelectedBoard,
        title: (card)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: card.name
                    }),
                    card.board.detected && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                        color: "green",
                        size: "sm",
                        children: "Detected"
                    }),
                    !toolhead && isToolboardRequired(card) && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                        color: "yellow",
                        size: "sm",
                        children: "Toolboard required"
                    })
                ]
            })
    });
    let rightButton = {
        onClick: props.nextScreen,
        label: "Next",
        disabled: true
    };
    let leftButton = {
        onClick: props.previousScreen
    };
    const skip = (0,react_.useCallback)(()=>{
        if (toolhead && skipSteps) {
            setSelectedBoard(null);
            skipSteps?.();
        }
    }, [
        toolhead,
        skipSteps,
        setSelectedBoard
    ]);
    let skipButton = (toolhead && !isToolboardRequired() || isBoardDetected) && props.skipSteps ? {
        onClick: skip,
        label: "Skip"
    } : undefined;
    if (toolhead && selectedToolboard != null || !toolhead && selectedControlboard != null) {
        rightButton = {
            onClick: props.nextScreen,
            label: "Next"
        };
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 flex border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                        className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                        children: props.name
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                        children: props.description
                                    })
                                ]
                            }),
                            toolhead && selectedToolboard != null && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                    onClick: ()=>setSelectedBoard(null),
                                    intent: "danger",
                                    children: "Clear selection"
                                })
                            })
                        ]
                    }),
                    props.children,
                    content
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                right: rightButton,
                left: leftButton,
                skip: skipButton
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/mcu-preparation.tsx












const MCUSteps = [
    {
        id: "01",
        name: (screenProps)=>`Pick ${screenProps.toolhead ? `${screenProps.toolhead.getToolCommand()} Toolboard` : "Control board"}`,
        description: (screenProps)=>`Pick the ${screenProps.toolhead ? `toolboard for ${screenProps.toolhead.getDescription()}.` : "control board. Toolboard(s) can be added in a later step."}`,
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(MCUPicker, {
                ...screenProps,
                key: screenProps.key
            })
    },
    {
        id: "02",
        name: (screenProps)=>`${screenProps.toolhead ? `${screenProps.toolhead.getToolCommand()} Toolboard` : "Control board"} flashing`,
        description: (screenProps)=>`Make sure your ${screenProps.toolhead ? `toolboard for ${screenProps.toolhead.getDescription()}` : "control board"} is flashed and up to date.`,
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(MCUFlashing, {
                ...screenProps,
                key: screenProps.key
            })
    }
];
const MCUPreparation = (props)=>{
    const { selectedPrinter , selectedBoard: _controlBoard , setSelectedBoard: _setControlboard  } = (0,usePrinterConfiguration/* usePrinterConfiguration */.G3)();
    const { toolhead , setToolhead  } = useToolheadConfiguration(props.toolOrAxis, false);
    const boardsQuery = trpc/* trpc.mcu.boards.useQuery */.S.mcu.boards.useQuery({
        boardFilters: {
            toolboard: toolhead != null,
            driverCountRequired: toolhead != null ? undefined : (selectedPrinter?.driverCountRequired ?? 0) - (selectedPrinter?.defaults.toolheads.length ?? 1)
        },
        toolhead: toolhead?.serialize()
    });
    const cards = (0,react_.useMemo)(()=>{
        if (boardsQuery.isError || boardsQuery.data == null) return [];
        return boardsQuery.data.map((b)=>({
                id: b.id,
                board: b,
                name: `${b.manufacturer} ${b.name}`,
                details: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "font-semibold",
                            children: "Automatic flashing:"
                        }),
                        " ",
                        b.flashScript && !b.disableAutoFlash ? "Yes" : "No"
                    ]
                }),
                right: /*#__PURE__*/ jsx_runtime_.jsx(outline_.CpuChipIcon, {
                    className: "h-8 w-8 text-zinc-500"
                })
            }));
    }, [
        boardsQuery.isError,
        boardsQuery.data
    ]);
    const selectedControlboard = cards.find((c)=>c.board.id == _controlBoard?.id) ?? null;
    const selectedToolboard = cards.find((c)=>c.board.id == toolhead?.getToolboard()?.id) ?? null;
    const setSelectedBoard = (0,react_.useCallback)((newBoard)=>{
        if (toolhead) {
            setToolhead({
                ...toolhead.getConfig(),
                toolboard: newBoard == null ? null : boards/* Toolboard.parse */.MG.parse(newBoard.board)
            });
        } else if (newBoard != null) {
            _setControlboard(boards/* Board.parse */.$l.parse(newBoard.board));
        }
    }, [
        _setControlboard,
        setToolhead,
        toolhead
    ]);
    const extraScreenProps = {
        selectedControlboard,
        selectedToolboard,
        cards,
        setSelectedBoard,
        selectedPrinter,
        toolhead
    };
    const { currentStep , screenProps  } = useSteps({
        steps: MCUSteps,
        parentScreenProps: props,
        extraScreenProps: extraScreenProps
    });
    return currentStep.renderScreen({
        ...screenProps,
        ...extraScreenProps,
        children: /*#__PURE__*/ jsx_runtime_.jsx(QueryStatus, {
            ...boardsQuery
        })
    });
};

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.2.4_@babel+core@7.21.0_react-dom@18.2.0_react@18.2.0/node_modules/next/image.js
var next_image = __webpack_require__(2805);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./components/card-selector-with-options.tsx






const CardSelectorWithOptions = (props)=>{
    const [selected, setSelected] = (0,react_.useState)(null);
    const [selectedOption, setSelectedOption] = (0,react_.useState)(null);
    const selectedRef = (0,react_.useRef)({
        selected,
        selectedOption
    });
    const { onSelect: _onSelect  } = props;
    const [parent] = (0,react/* useAutoAnimate */.u)();
    const onSelect = (0,react_.useCallback)((card)=>{
        // Do not select the same card twice, since onSelectOption might have been called first.
        if (selectedRef.current.selected !== card) {
            if (props.value === undefined) {
                setSelected(card);
                if (props.optionValue === undefined) {
                    setSelectedOption(card.options?.[0] ?? null);
                }
            }
            selectedRef.current.selected = card;
            selectedRef.current.selectedOption = card.options?.[0] ?? null;
            _onSelect?.(card, card.options?.[0] ?? null);
        }
    }, [
        _onSelect,
        props.value,
        props.optionValue
    ]);
    const onSelectOption = (0,react_.useCallback)((card, option)=>{
        if (props.value === undefined) {
            setSelected(card);
            setSelectedOption(option);
        }
        selectedRef.current.selected = card;
        selectedRef.current.selectedOption = option;
        _onSelect?.(card, option);
    }, [
        _onSelect,
        props.value
    ]);
    (0,react_.useEffect)(()=>{
        if (props.value !== undefined && props.value !== selectedRef.current.selected) {
            setSelected(props.value);
        }
        if (props.optionValue !== undefined && props.optionValue !== selectedRef.current.selectedOption) {
            setSelectedOption(props.optionValue);
        }
    }, [
        props.value,
        props.optionValue
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.RadioGroup, {
        value: selected,
        onChange: onSelect,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                className: "sr-only",
                children: "Selector"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "space-y-4",
                ref: parent,
                children: props.cards.map((card, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Option, {
                        value: card,
                        className: ({ checked , active  })=>(0,external_tailwind_merge_namespaceObject.twJoin)(checked ? "border-transparent" : "border-zinc-300 dark:border-zinc-700", active ? "ring-2 ring-brand-600 dark:ring-brand-500" : "", "relative cursor-pointer rounded-lg border bg-white px-4 py-4 shadow-sm focus:outline-none dark:bg-zinc-800"),
                        children: ({ active , checked  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                                                        as: "p",
                                                        className: "text-sm font-bold text-zinc-900 dark:text-zinc-100",
                                                        children: card.name
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Description, {
                                                        as: "div",
                                                        className: "text-xs text-zinc-500 dark:text-zinc-400",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            className: "sm:inline",
                                                            children: card.details
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Description, {
                                                as: "div",
                                                className: "mb-2 flex text-sm ml-4 sm:block sm:text-right",
                                                children: card.right
                                            })
                                        ]
                                    }),
                                    card.options != null && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.RadioGroup, {
                                        value: selected?.id === card.id ? selectedOption : null,
                                        onChange: (option)=>onSelectOption(card, option),
                                        className: "mt-2",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                                                className: "sr-only",
                                                children: " Choose a memory option "
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "grid grid-cols-3 gap-3 sm:grid-cols-6",
                                                children: card.options.map((option)=>/*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Option, {
                                                        value: option,
                                                        className: ({ active , checked  })=>(0,external_tailwind_merge_namespaceObject.twMerge)(active || checked ? "ring-2" : "ring-1", "ring-inset flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase sm:flex-1", badgeBackgroundColorStyle({
                                                                color: checked ? "brand" : "gray"
                                                            }), badgeBorderColorStyle({
                                                                color: active || checked ? "brand" : "gray"
                                                            }), badgeTextColorStyle({
                                                                color: active || checked ? "brand" : "gray"
                                                            })),
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.RadioGroup.Label, {
                                                            as: "span",
                                                            children: option.name
                                                        })
                                                    }, option.name))
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "border" : "border-2", checked ? "border-brand-600" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                                        "aria-hidden": "true"
                                    })
                                ]
                            })
                    }, card.id))
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/common/show-when-ready.tsx




const ShowWhenReady = (props)=>{
    if (props.queryErrors.length > 0 && props.showErrors) {
        return /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
            className: "mb-4",
            children: props.queryErrors.map((e)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "mt-2",
                    children: e
                }, e))
        });
    }
    if (!props.isReady && props.queryErrors.length === 0) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "flex h-12 items-center justify-center",
            children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
        });
    }
    return props.children;
};

;// CONCATENATED MODULE: ./components/setup-steps/printer-selection.tsx













const PrinterSelection = (props)=>{
    const printerQuery = trpc/* trpc.printer.printers.useQuery */.S.printer.printers.useQuery();
    const selectedPrinter = (0,external_recoil_.useRecoilValue)(recoil_printer/* LoadablePrinterState */.Xu);
    const selectedPrinterOption = (0,external_recoil_.useRecoilValue)(recoil_printer/* PrinterSizeState */.hq);
    // TODO: Set the toolheads here, should fix the problems!
    const cards = printerQuery.data ? printerQuery.data.slice().sort((a, b)=>a.manufacturer === "Rat Rig" && (b.manufacturer !== "Rat Rig" || b.description.indexOf("Discontinued") > -1) ? -1 : a.name.localeCompare(b.name)).map((p)=>{
        const printerImgUri = "printerId=" + encodeURIComponent(p.id);
        return {
            id: p.id,
            name: `${p.manufacturer} ${p.name}`,
            details: p.description,
            printer: p,
            right: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: "/configure/api/printer-image?" + printerImgUri,
                width: 50,
                className: "rounded-lg bg-white p-1 shadow-md dark:shadow-zinc-900",
                height: 50,
                alt: `${p.manufacturer} ${p.name}`
            }),
            options: p.sizes ? p.sizes.map((s)=>({
                    id: s,
                    name: s + ""
                })) : undefined
        };
    }) : [];
    const selectedCard = cards.find((c)=>c.id === selectedPrinter?.id);
    const selectedPrinterOptionFromCard = selectedCard?.options?.find((o)=>o.id === selectedPrinterOption);
    const onSelectPrinter = (0,external_recoil_.useRecoilCallback)(({ set , reset , snapshot  })=>async (card, option)=>{
            const printer = card.printer;
            if (printer == null) {
                console.error("No printer found matching the criteria");
                return;
            }
            const oldToolheads = await snapshot.getPromise(recoil_toolhead/* PrinterToolheadsState */.$T);
            oldToolheads.forEach((th)=>{
                reset((0,recoil_toolhead/* PrinterToolheadState */.AF)(th.toolNumber));
            });
            set(recoil_printer/* PrinterState */.H6, printer);
            if ((printer.sizes?.length ?? 0) > 0) {
                if (option == null || typeof option.id !== "number") {
                    throw new Error("An option must be selected for printers that come in different size configurations");
                }
                set(recoil_printer/* PrinterSizeState */.hq, option.id);
            } else {
                set(recoil_printer/* PrinterSizeState */.hq, null);
            }
            set(recoil_toolhead/* PrinterToolheadsState */.$T, printer.defaults.toolheads.map((th)=>({
                    ...th,
                    toolNumber: new helpers_toolhead/* ToolheadHelper */.D(th).getTool()
                })));
            reset(usePrinterConfiguration/* PerformanceModeState */.ad);
            reset(usePrinterConfiguration/* StealthchopState */.Am);
            reset(usePrinterConfiguration/* StandstillStealthState */.Yq);
            reset(usePrinterConfiguration/* ControllerFanState */.i$);
            reset(recoil_printer/* PrinterRailsState */.q7);
        }, [
        printerQuery.data
    ]);
    const [parent] = (0,react/* useAutoAnimate */.u)();
    const errors = printerQuery.error ? [
        printerQuery.error?.message
    ] : [];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                ref: parent,
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: "Select your printer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: "This will determine the template used for printer.cfg"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(ShowWhenReady, {
                        isReady: printerQuery.isFetched,
                        queryErrors: errors,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(CardSelectorWithOptions, {
                            cards: cards,
                            onSelect: onSelectPrinter,
                            value: selectedCard,
                            optionValue: selectedPrinterOptionFromCard
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                left: {
                    onClick: props.previousScreen
                },
                right: {
                    onClick: props.nextScreen,
                    disabled: selectedPrinter == null,
                    title: selectedPrinter == null ? "You have to select a printer" : undefined
                }
            })
        ]
    });
};

;// CONCATENATED MODULE: ./helpers/wifi.tsx

const parseSignal = (dBm)=>{
    if (dBm >= -40) {
        return /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "font-semibold text-green-700",
            children: "Excellent"
        });
    }
    if (dBm >= -67) {
        return /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "font-semibold text-lime-600",
            children: "Very good"
        });
    }
    if (dBm >= -70) {
        return /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "font-semibold text-yellow-600",
            children: "Okay"
        });
    }
    if (dBm >= -80) {
        return /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "font-semibold text-orange-500",
            children: "Not good"
        });
    }
    if (dBm >= -100) {
        return /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "font-semibold text-red-600",
            children: "Unusable"
        });
    }
};

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
;// CONCATENATED MODULE: ./helpers/validators/wifi.ts

const hostnameInput = external_zod_.z.object({
    hostname: external_zod_.z.string().min(2).regex(/^([a-zA-Z0-9]|-)+$/, "Hostname can only include a-Z, 0-9 and dashes.")
});
const joinInput = external_zod_.z.object({
    ssid: external_zod_.z.string(),
    passphrase: external_zod_.z.string().min(8).max(63),
    country: external_zod_.z.string().optional()
});

;// CONCATENATED MODULE: ./components/setup-steps/wifi-setup.tsx












const WifiSetup = (props)=>{
    const [apList, setApList] = (0,react_.useState)({});
    const [selectedNetwork, setSelectedNetwork] = (0,react_.useState)(null);
    const [password, setPassword] = (0,react_.useState)("");
    const [hostname, setHostname] = (0,react_.useState)("ratos");
    const [hostnameCompleted, setHostnameCompleted] = (0,react_.useState)(false);
    const { isError , error , data  } = trpc/* trpc.wifi.scan.useQuery */.S.wifi.scan.useQuery(undefined, {
        refetchInterval: (data, query)=>{
            if (query.state.error) {
                return false;
            }
            return 1000;
        },
        retry: false
    });
    const hostnameMutation = trpc/* trpc.wifi.hostname.useMutation */.S.wifi.hostname.useMutation();
    const wifiMutation = trpc/* trpc.wifi.join.useMutation */.S.wifi.join.useMutation();
    (0,react_.useEffect)(()=>{
        setApList((apList)=>{
            const newList = {
                ...apList
            };
            data?.forEach((ap)=>{
                newList[ap.address] = ap;
            });
            return newList;
        });
    }, [
        data
    ]);
    const hostnameValidation = hostnameInput.safeParse({
        hostname
    });
    const passwordValidation = joinInput.safeParse({
        passphrase: password,
        ssid: selectedNetwork?.ssid
    });
    const cards = (0,react_.useMemo)(()=>{
        if (isError) return [];
        return Object.keys(apList).map((ap)=>({
                name: apList[ap].ssid ?? "Unknown Network",
                id: ap,
                details: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "gap-4 md:grid md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "md:col-span-1",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "font-semibold",
                                    children: "Signal Strength:"
                                }),
                                " ",
                                parseSignal(apList[ap].signal)
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "md:col-span-1",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "font-semibold",
                                    children: "Frequency:"
                                }),
                                " ",
                                Math.round(apList[ap].frequency / 100) / 10,
                                "GHz"
                            ]
                        })
                    ]
                }),
                right: /*#__PURE__*/ jsx_runtime_.jsx(_24_solid_namespaceObject.WifiIcon, {
                    className: "h-8 w-8 text-zinc-500 dark:text-zinc-400"
                })
            }));
    }, [
        isError,
        apList
    ]);
    const onSelectCard = (0,react_.useCallback)((card)=>{
        setSelectedNetwork(apList[card.id]);
    }, [
        apList
    ]);
    const connectToWifi = (0,react_.useCallback)(()=>{
        if (selectedNetwork == null || selectedNetwork.ssid == null) {
            throw new Error("Cannot join wifi without selecting a network");
        }
        wifiMutation.mutate({
            passphrase: password,
            ssid: selectedNetwork.ssid,
            country: selectedNetwork.country
        });
    }, [
        password,
        selectedNetwork,
        wifiMutation
    ]);
    const rebootMutation = trpc/* trpc.reboot.useMutation */.S.reboot.useMutation();
    const rebootAndClose = (0,react_.useCallback)(async ()=>{
        await rebootMutation.mutateAsync();
        window.close();
    }, [
        rebootMutation
    ]);
    const confirmHostname = (0,react_.useCallback)(async ()=>{
        await hostnameMutation.mutateAsync({
            hostname
        });
        setHostnameCompleted(true);
    }, [
        hostnameMutation,
        hostname
    ]);
    const content = selectedNetwork && wifiMutation.isSuccess && hostnameCompleted && !rebootMutation.isSuccess && !rebootMutation.isError ? /*#__PURE__*/ jsx_runtime_.jsx(Modal, {
        title: "Settings saved!",
        body: `RatOS is now setup to connect to ${selectedNetwork.ssid}! Your raspberry pi will now reboot, and join your local wifi network. Click the button below to reboot the pi and close this window. You can then reconnect to your local network where http://${hostname}.local/ should be available in a few minutes. If RatOS fails to join ${selectedNetwork.ssid}, it will recreate the "ratos" hotspot and you'll have to try again.`,
        buttonLabel: "Got it!",
        onClick: rebootAndClose
    }) : rebootMutation.isError ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mb-4 h-48",
        children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
            children: rebootMutation.error.message
        })
    }) : rebootMutation.isLoading || rebootMutation.isSuccess ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mb-4 h-48",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mb-4 flex items-center justify-center font-bold text-zinc-900 dark:text-zinc-100",
                children: "Rebooting..."
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mb-4 flex items-center justify-center  text-zinc-600 dark:text-zinc-400",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        "Please reconnect to ",
                        selectedNetwork?.ssid ?? "your local network",
                        " and visit",
                        " ",
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                            href: `http://${hostname}.local/configure?step=1`,
                            className: "text-brand-600 dark:text-brand-400",
                            children: [
                                "http://",
                                hostname,
                                ".local/configure?step=1"
                            ]
                        }),
                        " ",
                        "in a few minutes."
                    ]
                })
            })
        ]
    }) : selectedNetwork && wifiMutation.isSuccess ? /*#__PURE__*/ jsx_runtime_.jsx(TextInput, {
        label: "Printer hostname",
        type: "text",
        defaultValue: "RatOS",
        error: hostnameMutation.isError ? hostnameMutation.error.message : hostnameValidation.success ? undefined : hostnameValidation.error.issues[0].message,
        onChange: (val)=>setHostname(val),
        help: 'Only use characters from a-Z and dashes. For example, entering "RatOS" will make your printer available at http://RatOS.local/'
    }, "hostname") : selectedNetwork ? /*#__PURE__*/ jsx_runtime_.jsx(TextInput, {
        label: selectedNetwork.security.toLocaleUpperCase() + " Password",
        type: "password",
        error: wifiMutation.isError ? wifiMutation.error.message : passwordValidation.success ? undefined : passwordValidation.error.issues[0].message,
        onChange: (val)=>setPassword(val + "")
    }, "password") : isError ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mb-4 h-48",
        children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
            title: "Unable to scan for wifi access points",
            children: error?.message
        })
    }) : Object.keys(apList).length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mb-4 flex h-48 items-center justify-center",
        children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
    }) : /*#__PURE__*/ jsx_runtime_.jsx(CardSelector, {
        cards: cards,
        onSelect: onSelectCard
    });
    let rightButton = {
        onClick: props.nextScreen,
        label: "Skip"
    };
    let leftButton = {
        onClick: props.previousScreen
    };
    let subtext = "Pick an access point to join";
    if (selectedNetwork) {
        rightButton = {
            label: "Save Wifi Credentials",
            disabled: !passwordValidation.success || wifiMutation.isLoading,
            isLoading: wifiMutation.isLoading,
            onClick: connectToWifi
        };
        leftButton = {
            onClick: ()=>setSelectedNetwork(null),
            label: "Back",
            disabled: wifiMutation.isLoading
        };
        subtext = "Enter password for " + selectedNetwork.ssid;
        if (wifiMutation.isSuccess) {
            rightButton = {
                label: "Save and Connect",
                disabled: !hostnameValidation.success || hostnameMutation.isLoading,
                onClick: confirmHostname
            };
            leftButton = {
                onClick: ()=>wifiMutation.reset(),
                label: "Back",
                disabled: wifiMutation.isLoading
            };
            subtext = "Enter the hostname you want to use for the printer";
            if (hostnameCompleted) {
                rightButton = {
                    onClick: props.nextScreen
                };
                leftButton = {};
                subtext = "Proceed to next step";
            }
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: "Configure Wifi Setup"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: subtext
                            })
                        ]
                    }),
                    content
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                right: rightButton,
                left: leftButton
            })
        ]
    });
};

;// CONCATENATED MODULE: external "react-diff-view"
const external_react_diff_view_namespaceObject = require("react-diff-view");
// EXTERNAL MODULE: ./node_modules/.pnpm/react-diff-view@3.2.0_react@18.2.0/node_modules/react-diff-view/style/index.css
var style = __webpack_require__(9496);
;// CONCATENATED MODULE: ./components/setup-steps/diff-modal.tsx

/* This example requires Tailwind CSS v2.0+ */ 






const TwoColumns = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        strokeWidth: "1.5",
        stroke: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        className: (0,external_tailwind_merge_namespaceObject.twMerge)("h-6 w-6", props.className),
        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M 12 4.5 L 12 19.5 M 4.125 19.5 L 19.875 19.5 C 20.496 19.5 21 18.996 21 18.375 L 21 5.625 C 21 5.004 20.496 4.5 19.875 4.5 L 4.125 4.5 C 3.504 4.5 3 5.004 3 5.625 L 3 18.375 C 3 18.996 3.504 19.5 4.125 19.5 Z"
        })
    });
};
const SingleColumn = (props)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        strokeWidth: "1.5",
        stroke: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        className: (0,external_tailwind_merge_namespaceObject.twMerge)("h-6 w-6", props.className),
        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M 4.125 19.5 L 19.875 19.5 C 20.496 19.5 21 18.996 21 18.375 L 21 5.625 C 21 5.004 20.496 4.5 19.875 4.5 L 4.125 4.5 C 3.504 4.5 3 5.004 3 5.625 L 3 18.375 C 3 18.996 3.504 19.5 4.125 19.5 Z"
        })
    });
};
const DiffModal = (props)=>{
    const { isOpen , setIsOpen  } = props;
    const [viewType, setViewType] = (0,react_.useState)("unified");
    const close = (0,react_.useCallback)(()=>{
        setIsOpen(false);
    }, [
        setIsOpen
    ]);
    const files = (0,react_.useMemo)(()=>{
        return (0,external_react_diff_view_namespaceObject.parseDiff)(props.diff);
    }, [
        props.diff
    ]);
    const diffType = props.state === "changed" ? "modify" : props.state === "created" ? "add" : "delete";
    return /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Root, {
        show: isOpen,
        as: react_.Fragment,
        appear: true,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog, {
            as: "div",
            className: "git-diff fixed inset-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600",
            onClose: close,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                        as: react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0",
                        enterTo: "opacity-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100",
                        leaveTo: "opacity-0",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Dialog.Overlay, {
                            className: "fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-950 dark:bg-opacity-75"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "hidden sm:inline-block sm:h-screen sm:align-middle",
                        "aria-hidden": "true",
                        children: "​"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition.Child, {
                        as: react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        enterTo: "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "relative inline-flex max-h-[80vh] max-w-screen-2xl transform flex-col overflow-hidden rounded-lg bg-white py-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:py-6 sm:align-middle dark:bg-zinc-800",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Dialog.Title, {
                                    as: "h3",
                                    className: "flex items-center justify-between border-b border-zinc-200 px-4 pb-4 text-lg font-semibold leading-6 text-zinc-900 sm:px-6 dark:border-zinc-700 dark:text-zinc-100",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            children: props.title
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "relative flex flex-nowrap items-center space-x-2 text-zinc-500 dark:text-zinc-400",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    className: (0,external_tailwind_merge_namespaceObject.twJoin)(viewType === "unified" ? "cursor-default text-sky-600 dark:text-sky-400" : "hover:text-zinc-800 dark:hover:text-zinc-100"),
                                                    onClick: ()=>setViewType("unified"),
                                                    title: "Unified View",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(SingleColumn, {
                                                        className: "h-6 w-6"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    className: (0,external_tailwind_merge_namespaceObject.twJoin)(viewType === "split" ? "cursor-default text-sky-600 dark:text-sky-400" : "hover:text-zinc-800 dark:hover:text-zinc-100"),
                                                    onClick: ()=>setViewType("split"),
                                                    title: "Split View",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(TwoColumns, {
                                                        className: "h-6 w-6"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "!ml-4 !mr-1 h-6 border-l border-l-zinc-200 dark:border-l-zinc-800"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    className: "hover:text-zinc-800 dark:hover:text-zinc-100",
                                                    onClick: close,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.XMarkIcon, {
                                                        className: "h-6 w-6"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600",
                                    children: files.map(({ hunks  }, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_react_diff_view_namespaceObject.Diff, {
                                            hunks: hunks,
                                            viewType: viewType,
                                            diffType: diffType
                                        }, i))
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex-end flex flex-row items-center justify-end space-x-2 border-t border-zinc-200 px-4 pt-4 sm:px-6 sm:pt-6 dark:border-zinc-700",
                                    children: [
                                        props.buttons ?? null,
                                        /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                            intent: "plain",
                                            onClick: close,
                                            children: "Close"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
};

;// CONCATENATED MODULE: ./components/common/state-circle.tsx




const StateCircleVariants = (0,external_class_variance_authority_namespaceObject.cva)("flex-none rounded-full p-1 relative flex", {
    variants: {
        state: {
            success: "dark:text-green-400 text-green-500 bg-green-400/20",
            info: "dark:text-sky-400 text-sky-500 bg-sky-400/20",
            warning: "dark:text-yellow-400 text-yellow-500 bg-yellow-400/20",
            danger: "dark:text-rose-400 text-rose-500 bg-rose-400/20",
            indeterminate: "dark:text-zinc-400 text-zinc-500 bg-zinc-500/20",
            plain: "dark:text-zinc-400 text-zinc-500 bg-zinc-500/20",
            primary: "dark:text-brand-400 text-brand-500 bg-brand-500/20"
        }
    }
});
const StateCircle = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: StateCircleVariants(props),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                title: props.title,
                className: (0,external_tailwind_merge_namespaceObject.twMerge)("absolute inset-0 transition-all duration-700", props.ping ? "opacity-100" : "opacity-0", props.pingClassName ?? "z-2"),
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (0,external_tailwind_merge_namespaceObject.twMerge)("absolute inset-0 inline-flex animate-ping rounded-full bg-current opacity-0 ease-out")
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "h-2 w-2 rounded-full bg-current"
            })
        ]
    });
};

;// CONCATENATED MODULE: ./hooks/useChangeEffect.tsx

const useChangeEffect = (deps, clearAfter)=>{
    const [hasChanged, setHasChanged] = (0,react_.useState)(false);
    const lastDeps = (0,react_.useRef)([
        ...deps
    ]);
    (0,react_.useEffect)(()=>{
        let changed = false;
        lastDeps.current.forEach((dep, i)=>{
            if (dep !== deps[i]) {
                changed = true;
            }
        });
        if (changed) {
            setHasChanged(true);
        }
        lastDeps.current = [
            ...deps
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ...deps
    ]);
    const clear = (0,react_.useCallback)(()=>{
        setHasChanged(false);
    }, []);
    (0,react_.useEffect)(()=>{
        if (clearAfter != null && hasChanged) {
            const timeout = setTimeout(()=>{
                setHasChanged(false);
            }, clearAfter);
            return ()=>{
                clearTimeout(timeout);
            };
        }
        return;
    }, [
        clearAfter,
        hasChanged
    ]);
    return [
        hasChanged,
        clear
    ];
};

;// CONCATENATED MODULE: ./components/setup-steps/file-changes.tsx












const statuses = {
    created: "text-green-700 bg-green-50 ring-green-600/20",
    unchanged: "text-zinc-600 bg-zinc-50 ring-zinc-500/10",
    changed: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
    removed: "text-rose-700 bg-rose-50 ring-rose-600/20"
};
const ChangedFile = (props)=>{
    const { addFileToIgnore , addFileToOverwrite , file , removeFileToIgnore , removeFileToOverwrite , isMarkedIgnored , isMarkedOverwritten  } = props;
    const [isDiffModalOpen, setIsDiffModalOpen] = (0,react_.useState)(false);
    const showDiffModal = (0,react_.useCallback)((file)=>{
        setIsDiffModalOpen(true);
    }, []);
    const wouldOtherwiseBeWritten = file.state === "changed" && (file.overwrite || isMarkedOverwritten) || file.state === "created" || file.state === "removed";
    const isOverwritable = file.state === "changed";
    const isIgnorable = file.state === "created" || file.state === "removed";
    const isIgnored = isMarkedIgnored || !wouldOtherwiseBeWritten;
    const isOverwritten = isMarkedOverwritten || file.overwrite && file.exists;
    const isDeleted = file.state === "removed" && !isIgnored;
    const isCreated = file.state === "created" && !isIgnored;
    const isChanged = file.state === "changed" && !isIgnored && isOverwritten;
    const actions = (0,react_.useMemo)(()=>{
        if (file.fileName === "RatOS.cfg") {
            return [];
        }
        let skip = null;
        let ignore = null;
        let overwrite = null;
        let write = null;
        let remove = null;
        if (isOverwritten && !isIgnored) {
            skip = {
                title: "Skip",
                intent: "indeterminate",
                action: isMarkedOverwritten ? removeFileToOverwrite : addFileToIgnore
            };
        } else if (isOverwritable) {
            overwrite = {
                title: "Overwrite",
                intent: "warning",
                action: isMarkedIgnored ? removeFileToIgnore : addFileToOverwrite
            };
        }
        if (isIgnorable && !isIgnored) {
            ignore = {
                title: "Ignore",
                intent: "indeterminate",
                action: addFileToIgnore
            };
        } else if (isIgnored) {
            if (file.state === "removed") {
                remove = {
                    title: "Delete",
                    intent: "danger",
                    action: removeFileToIgnore
                };
            } else if (isIgnorable) {
                write = {
                    title: "Write",
                    intent: "success",
                    action: removeFileToIgnore
                };
            }
        }
        return [
            skip,
            ignore,
            overwrite,
            write,
            remove
        ].filter(Boolean);
    }, [
        addFileToIgnore,
        addFileToOverwrite,
        file.fileName,
        file.state,
        isIgnorable,
        isIgnored,
        isMarkedIgnored,
        isMarkedOverwritten,
        isOverwritable,
        isOverwritten,
        removeFileToIgnore,
        removeFileToOverwrite
    ]);
    const fileState = (0,react_.useMemo)(()=>{
        if (file.state === "changed") {
            if (isIgnored && file.overwrite || isOverwritten && !file.overwrite) {
                return "warning";
            } else if (isOverwritten) {
                return "success";
            } else {
                return "indeterminate";
            }
        }
        if (file.state === "created") {
            if (isIgnored) {
                return "danger";
            } else {
                return "success";
            }
        }
        if (file.state === "removed") {
            if (!isIgnored) {
                return "warning";
            }
        }
        return "indeterminate";
    }, [
        file.overwrite,
        file.state,
        isIgnored,
        isOverwritten
    ]);
    const [shouldPing] = useChangeEffect([
        fileState
    ], 4000);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
        className: "flex items-center justify-between gap-x-6 py-5",
        children: [
            file?.diff != null && /*#__PURE__*/ jsx_runtime_.jsx(DiffModal, {
                diff: file.diff,
                title: `Changes to ${file.fileName}`,
                state: file.state,
                setIsOpen: setIsDiffModalOpen,
                buttons: actions.map((a)=>{
                    return /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                        onClick: ()=>{
                            a.action(file.fileName);
                            setIsDiffModalOpen(false);
                        },
                        intent: a.intent,
                        children: a.title
                    }, a.title);
                }),
                isOpen: isDiffModalOpen
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center gap-x-3",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(StateCircle, {
                                state: fileState,
                                ping: shouldPing
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100",
                                children: file.fileName
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                size: "sm",
                                color: file.state === "changed" ? "yellow" : file.state === "created" ? "green" : file.state === "removed" ? "rose" : "gray",
                                children: file.state === "changed" ? "Pending changes" : file.state === "created" ? "New file" : file.state === "removed" ? "Deleted" : "Unchanged"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mt-1 flex items-center gap-x-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: "",
                            children: [
                                file.state === "changed" && (isOverwritten && !isIgnored ? "File will be backed up and overwritten." + (file.fileName != "RatOS.cfg" ? ` Any changes you've made can be recovered from the backup.` : "") : "File will be skipped."),
                                file.state === "created" && (isIgnored ? "File will be skipped." : "File will be created."),
                                file.state === "removed" && (!isIgnored ? "File will be deleted." : "File will remain untouched.")
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-none items-center gap-x-4",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu, {
                    as: "div",
                    className: "relative flex-none",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu.Button, {
                            className: "-m-2.5 block p-2.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "sr-only",
                                    children: "Open options"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.EllipsisVerticalIcon, {
                                    className: "h-5 w-5",
                                    "aria-hidden": "true"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Transition, {
                            as: react_.Fragment,
                            enter: "transition ease-out duration-100",
                            enterFrom: "transform opacity-0 scale-95",
                            enterTo: "transform opacity-100 scale-100",
                            leave: "transition ease-in duration-75",
                            leaveFrom: "transform opacity-100 scale-100",
                            leaveTo: "transform opacity-0 scale-95",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Menu.Items, {
                                className: "absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none dark:bg-zinc-900 dark:ring-zinc-100/5",
                                children: [
                                    actions.map((action)=>/*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                            children: ({ active , disabled  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    onClick: ()=>action.action(file.fileName),
                                                    className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "bg-zinc-50 dark:bg-zinc-800" : "", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", "block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-200"),
                                                    children: action.title
                                                })
                                        }, action.title)),
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Menu.Item, {
                                        disabled: file.diff == null,
                                        children: ({ active , disabled  })=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                onClick: ()=>showDiffModal(file),
                                                className: (0,external_tailwind_merge_namespaceObject.twJoin)(active ? "bg-zinc-50 dark:bg-zinc-800" : "", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", "block px-3 py-1 text-sm leading-6 text-zinc-800 dark:text-zinc-200"),
                                                children: "View diff"
                                            })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    }, file.fileName);
};
const FileChanges = (props)=>{
    const { serializedConfig , onFilesToIgnoreChange , onFilesToOverwriteChange  } = props;
    const [filesToOverwrite, setFilesToOverwrite] = (0,react_.useState)([]);
    const addFileToOverwrite = (0,react_.useCallback)((fileName)=>{
        setFilesToOverwrite((files)=>files.includes(fileName) ? files : [
                ...files,
                fileName
            ]);
    }, []);
    const removeFileToOverwrite = (0,react_.useCallback)((fileName)=>{
        setFilesToOverwrite((files)=>files.includes(fileName) ? files.filter((file)=>file !== fileName) : files);
    }, []);
    const [filesToIgnore, setFilesToIgnore] = (0,react_.useState)([]);
    const addFileToIgnore = (0,react_.useCallback)((fileName)=>{
        setFilesToIgnore((files)=>files.includes(fileName) ? files : [
                ...files,
                fileName
            ]);
    }, []);
    const removeFileToIgnore = (0,react_.useCallback)((fileName)=>{
        setFilesToIgnore((files)=>files.includes(fileName) ? files.filter((file)=>file !== fileName) : files);
    }, []);
    (0,react_.useEffect)(()=>{
        onFilesToOverwriteChange(filesToOverwrite);
    }, [
        filesToOverwrite,
        onFilesToOverwriteChange
    ]);
    (0,react_.useEffect)(()=>{
        onFilesToIgnoreChange(filesToIgnore);
    }, [
        filesToIgnore,
        onFilesToIgnoreChange
    ]);
    const client = utils_trpc/* trpc.useUtils */.SX.useUtils().client;
    const filesToWrite = (0,external_react_query_namespaceObject.useQuery)({
        queryFn: async ()=>{
            const res = await client.printer.getFilesToWrite.mutate({
                config: serializedConfig ?? {}
            });
            return res;
        },
        enabled: serializedConfig != null
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("ul", {
        role: "list",
        className: "divide-y divide-zinc-100 dark:divide-zinc-700",
        children: filesToWrite.data?.map((fileToWrite)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx(ChangedFile, {
                file: fileToWrite,
                isMarkedIgnored: filesToIgnore.includes(fileToWrite.fileName),
                isMarkedOverwritten: filesToOverwrite.includes(fileToWrite.fileName),
                addFileToIgnore: addFileToIgnore,
                addFileToOverwrite: addFileToOverwrite,
                removeFileToIgnore: removeFileToIgnore,
                removeFileToOverwrite: removeFileToOverwrite
            }, fileToWrite.fileName);
        })
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/wizard-complete.tsx























const CompletionSteps = [
    {
        id: "01",
        name: "Confirm configuration",
        description: "Confirm your printer configuration",
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(ConfirmConfig, {
                ...screenProps,
                key: screenProps.key
            })
    },
    {
        id: "02",
        name: "Setup complete",
        description: "You've completed the initial setup, congratulations!",
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(ProceedToMainsail, {
                ...screenProps,
                key: screenProps.key
            })
    }
];
const ConfirmToolhead = (props)=>{
    const { toolhead , setToolhead  } = useToolheadConfiguration(props.toolOrAxis);
    const toolboardDetected = trpc/* trpc.mcu.detect.useQuery */.S.mcu.detect.useQuery({
        boardPath: toolhead.getToolboard()?.path ?? "",
        toolhead: toolhead.serialize()
    }, {
        enabled: toolhead.getToolboard() != null
    });
    const [ignoreEndstopWarning, setIgnoreEndstopWarning] = (0,react_.useState)(false);
    const setToolboardEndstop = (0,external_recoil_.useRecoilCallback)(({ snapshot , set  })=>async ()=>{
            const printerConfig = await snapshot.getPromise(usePrinterConfiguration/* PrinterConfigurationState */.J7);
            if (printerConfig == null) {
                return;
            }
            const toolboardEndstop = (0,endstops/* xEndstopOptions */.uo)((0,usePrinterConfiguration/* serializePartialPrinterConfiguration */.gd)(printerConfig), toolhead.serialize()).find((x)=>x.id === "endstop-toolboard");
            if (toolboardEndstop != null && toolhead != null) {
                setToolhead({
                    ...toolhead.getConfig(),
                    xEndstop: toolboardEndstop
                });
            }
        }, []);
    const [animateRef] = (0,react/* useAutoAnimate */.u)();
    if (toolhead == null) {
        return /*#__PURE__*/ jsx_runtime_.jsx("dl", {
            className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "sm:col-span-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
                })
            })
        });
    }
    const hasWarnings = toolhead.getToolboard() != null && !toolboardDetected.data || toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === "PT1000";
    return /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Disclosure, {
        as: "div",
        className: "",
        children: ({ open  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Disclosure.Button, {
                        as: "div",
                        className: "cursor-pointer border-b border-zinc-100 py-4 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                        className: "flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                children: [
                                                    "Toolhead ",
                                                    toolhead.getToolCommand()
                                                ]
                                            }),
                                            hasWarnings && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                                color: "orange",
                                                size: "md",
                                                children: "Has Warnings"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronRightIcon, {
                                            className: (0,external_tailwind_merge_namespaceObject.twJoin)("h-6 w-6 transition-all duration-200 ease-in-out", open ? "rotate-90" : "rotate-0")
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm",
                                children: toolhead.getDescription()
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        ref: animateRef,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Disclosure.Panel, {
                            className: "pt-4",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dt", {
                                                    className: "space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: "Toolboard"
                                                        }),
                                                        " ",
                                                        toolhead.getConfig().toolboard && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                                            color: toolboardDetected.data === true ? "green" : "red",
                                                            children: toolboardDetected.data === true ? "Detected" : "Not detected"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().toolboard == null ? "None selected" : `${toolhead.getConfig().toolboard?.manufacturer} ${toolhead.getConfig().toolboard?.name}`
                                                })
                                            ]
                                        }),
                                        toolhead.getToolboard() != null && !toolboardDetected.data && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "sm:col-span-2",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(WarningMessage, {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "space-y-2",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        children: "The toolboard you have selected does not seem to be connected, you can still save the config and proceed to mainsail, but you will get an 'mcu' connection error."
                                                    })
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Extruder"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().extruder?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Hotend"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().hotend?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Thermistor"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().thermistor ?? "None selected"
                                                })
                                            ]
                                        }),
                                        toolhead.getToolboard()?.alternativePT1000Resistor && toolhead.getThermistor() === "PT1000" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-span-2",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(WarningMessage, {
                                                title: "RatOS uses your toolboards alternate pullup resistor setting",
                                                children: "Your toolboard has an option to use a separate pullup resistor for PT1000 sensors. This is usually done by inserting a jumper. Make sure you read the documentation for your board on how to enable the alternative resistor or you'll get ADC temperature errors in klipper."
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "X Endstop"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().xEndstop?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Y Endstop"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().yEndstop?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Probe"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().probe?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        toolhead.getConfig().toolboard != null && toolhead.getConfig().xEndstop?.id === "endstop" && !ignoreEndstopWarning && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "sm:col-span-2",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(WarningMessage, {
                                                children: [
                                                    "The current configuration assumes the X endstop is connected to your controlboard, do you want to use an endstop connected to the toolboard instead?",
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "mt-4 flex justify-end space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                                                onClick: setToolboardEndstop,
                                                                intent: "warning",
                                                                children: "Yes, use the toolboard connection"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                                                                onClick: ()=>setIgnoreEndstopWarning(true),
                                                                intent: "plain",
                                                                children: "No, use the controlboard connection"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Part cooling fan"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().partFan?.title ?? "None selected"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Hotend cooling fan"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().hotendFan?.title ?? "None selected"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "X Accelerometer"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().xAccelerometer?.title ?? "None"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "sm:col-span-1",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                    children: "Y Accelerometer"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                    children: toolhead.getConfig().yAccelerometer?.title ?? "None"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
    });
};
const ConfirmConfig = (props)=>{
    const { parsedPrinterConfiguration , partialPrinterConfiguration  } = (0,usePrinterConfiguration/* usePrinterConfiguration */.G3)();
    const serializedPrinterConfiguration = (0,react_.useMemo)(()=>{
        if (parsedPrinterConfiguration.success === true) {
            return (0,usePrinterConfiguration/* serializePrinterConfiguration */.h$)(parsedPrinterConfiguration.data);
        }
        return null;
    }, [
        parsedPrinterConfiguration
    ]);
    const errors = [];
    const [filesToOverwrite, setFilesToOverwrite] = (0,react_.useState)([]);
    const [filesToIgnore, setFilesToIgnore] = (0,react_.useState)([]);
    const controlboardDetected = trpc/* trpc.mcu.detect.useQuery */.S.mcu.detect.useQuery({
        boardPath: partialPrinterConfiguration != null ? partialPrinterConfiguration.controlboard?.path ?? "" : ""
    }, {
        enabled: partialPrinterConfiguration?.controlboard != null
    });
    const saveConfigurationMutation = trpc/* trpc.printer.saveConfiguration.useMutation */.S.printer.saveConfiguration.useMutation();
    const saveConfiguration = (0,react_.useCallback)(async ()=>{
        if (parsedPrinterConfiguration.success) {
            saveConfigurationMutation.mutate({
                config: (0,usePrinterConfiguration/* serializePrinterConfiguration */.h$)(parsedPrinterConfiguration.data),
                overwriteFiles: filesToOverwrite
            }, {
                onSuccess: props.nextScreen,
                onError: (error)=>window.scrollTo(0, 0)
            });
        }
    }, [
        parsedPrinterConfiguration,
        saveConfigurationMutation,
        filesToOverwrite,
        props.nextScreen
    ]);
    const client = trpc/* trpc.useContext */.S.useContext().client;
    const filesToWrite = (0,external_react_query_namespaceObject.useQuery)({
        queryFn: async ()=>{
            const res = await client.printer.getFilesToWrite.mutate({
                config: serializedPrinterConfiguration ?? {}
            });
            return res;
        },
        enabled: parsedPrinterConfiguration.success
    });
    if (saveConfigurationMutation.error) {
        errors.push(saveConfigurationMutation.error.message);
    }
    if (parsedPrinterConfiguration.success === false) {
        // console.error(parsedPrinterConfiguration.error);
        const formErrors = parsedPrinterConfiguration.error.flatten().formErrors;
        const fieldErrors = parsedPrinterConfiguration.error.flatten().fieldErrors;
        if (formErrors.length) {
            formErrors.forEach((message)=>{
                errors.push(message);
            });
        } else {
            for(const field in fieldErrors){
                errors.push(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "capitalize",
                            children: field
                        }),
                        ": ",
                        fieldErrors[field]?.[0]
                    ]
                }));
            }
        }
    }
    const [animateRef] = (0,react/* useAutoAnimate */.u)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: props.name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: props.description
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "space-y-4 text-zinc-700 dark:text-zinc-300",
                        children: parsedPrinterConfiguration.success && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                errors.length > 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "mt-2",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
                                        children: errors.map((e, i)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "mt-2",
                                                children: e
                                            }, i))
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "mt-4",
                                    ref: animateRef,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Disclosure, {
                                            as: react_.Fragment,
                                            children: ({ open  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Disclosure.Button, {
                                                            as: "div",
                                                            className: "border-b border-zinc-100 py-4 dark:border-zinc-700",
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "flex cursor-pointer items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                                                        className: "flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100",
                                                                        children: [
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                children: "General"
                                                                            }),
                                                                            parsedPrinterConfiguration.data.controlboard != null && !controlboardDetected.data && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                                                                color: "orange",
                                                                                children: "Has Warnings"
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronRightIcon, {
                                                                            className: (0,external_tailwind_merge_namespaceObject.twJoin)("h-6 w-6 transition-all duration-200 ease-in-out", open ? "rotate-90" : "rotate-0")
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Disclosure.Panel, {
                                                            as: "dl",
                                                            className: "grid grid-cols-1 gap-x-4 gap-y-4 py-4 sm:grid-cols-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: "sm:col-span-2",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                            className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                            children: "Printer"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                            className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                            children: parsedPrinterConfiguration.data.printer != null ? `${parsedPrinterConfiguration.data.printer.manufacturer} ${parsedPrinterConfiguration.data.printer.name} ${parsedPrinterConfiguration.data.size}` : "None selected"
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: "sm:col-span-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dt", {
                                                                            className: "space-x-2 text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                    children: "Controlboard"
                                                                                }),
                                                                                parsedPrinterConfiguration.data.controlboard && /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                                                                                    color: controlboardDetected.data === true ? "green" : "red",
                                                                                    children: controlboardDetected.data === true ? "Detected" : "Not detected"
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                            className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                            children: parsedPrinterConfiguration.data.controlboard != null ? `${parsedPrinterConfiguration.data.controlboard.manufacturer} ${parsedPrinterConfiguration.data.controlboard.name}` : "None selected"
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: "sm:col-span-1",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                            className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                            children: "Controller cooling fan"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                            className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                            children: parsedPrinterConfiguration.data.controllerFan?.title ?? "None selected"
                                                                        })
                                                                    ]
                                                                }),
                                                                parsedPrinterConfiguration.data.controlboard != null && !controlboardDetected.data && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "sm:col-span-2",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(WarningMessage, {
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                            className: "space-y-2",
                                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                                children: "The controlboard you have selected does not seem to be connected, you can still save the config and proceed to mainsail, but you will get an 'mcu' connection error."
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "",
                                            children: parsedPrinterConfiguration.data.toolheads.map((tool)=>/*#__PURE__*/ jsx_runtime_.jsx(ConfirmToolhead, {
                                                    toolOrAxis: tool.axis
                                                }, tool.axis))
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Disclosure, {
                                            as: react_.Fragment,
                                            defaultOpen: false,
                                            children: ({ open  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(external_headlessui_react_.Disclosure.Button, {
                                                            as: "div",
                                                            className: "border-b border-zinc-100 py-4 dark:border-zinc-700",
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "flex cursor-pointer items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                        className: "flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100",
                                                                        children: "Motion"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ChevronRightIcon, {
                                                                            className: (0,external_tailwind_merge_namespaceObject.twJoin)("h-6 w-6 transition-all duration-200 ease-in-out", open ? "rotate-90" : "rotate-0")
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_headlessui_react_.Disclosure.Panel, {
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 py-4 sm:grid-cols-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                            className: "sm:col-span-1",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                                    children: "Performance mode"
                                                                                }),
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                                    children: parsedPrinterConfiguration.data.performanceMode ? "Enabled" : "Disabled"
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                            className: "sm:col-span-1",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                                    children: "Stealtchop"
                                                                                }),
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                                    children: parsedPrinterConfiguration.data.stealthchop ? "Enabled" : "Disabled"
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                            className: "sm:col-span-1",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                                    className: "text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                                                                    children: "Standstill Stealth"
                                                                                }),
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                                    children: parsedPrinterConfiguration.data.standstillStealth ? "Enabled" : "Disabled"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("dl", {
                                                                    className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
                                                                    children: parsedPrinterConfiguration.data.rails?.map((rail, i)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                            className: "sm:col-span-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dt", {
                                                                                    className: "text-sm font-medium capitalize leading-6 text-zinc-900 dark:text-zinc-100",
                                                                                    children: [
                                                                                        rail.axis === motion/* PrinterAxis.extruder */.po.extruder ? rail.axis : rail.axis.toLocaleUpperCase(),
                                                                                        " Motion Configuration"
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dd", {
                                                                                    className: "mt-1 text-sm leading-6 text-zinc-600 sm:mt-2 dark:text-zinc-400",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                rail.driver.title,
                                                                                                " @ ",
                                                                                                rail.voltage,
                                                                                                "V"
                                                                                            ]
                                                                                        }),
                                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                rail.stepper.title,
                                                                                                " @ ",
                                                                                                rail.current,
                                                                                                "A RMS"
                                                                                            ]
                                                                                        }),
                                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                rail.microstepping,
                                                                                                " microsteps"
                                                                                            ]
                                                                                        })
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }, i))
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "border-b border-zinc-100 py-4 dark:border-zinc-700",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex cursor-pointer items-center justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    className: "flex items-center space-x-2 text-base font-bold leading-7 text-zinc-900 dark:text-zinc-100",
                                                    children: "Config files"
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("dl", {
                                            className: "gap-y-4py-4 grid grid-cols-1 gap-x-4 sm:grid-cols-2",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: " space-y-4 sm:col-span-2 dark:border-zinc-700",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(FileChanges, {
                                                    serializedConfig: parsedPrinterConfiguration.success ? serializedPrinterConfiguration : null,
                                                    onFilesToIgnoreChange: setFilesToIgnore,
                                                    onFilesToOverwriteChange: setFilesToOverwrite
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("dl", {
                                            className: "grid grid-cols-1 gap-x-4 gap-y-4 border-t border-zinc-100 py-4 sm:grid-cols-2 dark:border-zinc-700",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: " space-y-4 sm:col-span-2 dark:border-zinc-700",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(InfoMessage, {
                                                    children: 'If the above information is correct, go ahead and save the configuration. If not, go back and change the configuration by clicking the steps in the "Setup Progress" panel.'
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                left: {
                    onClick: props.previousScreen
                },
                right: {
                    onClick: saveConfiguration,
                    disabled: !parsedPrinterConfiguration.success,
                    isLoading: saveConfigurationMutation.isLoading,
                    label: "Confirm and save"
                }
            })
        ]
    });
};
const ProceedToMainsail = (props)=>{
    const openMainsail = ()=>{
        window.location.href = "http://" + window.location.hostname;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: props.name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                                children: props.description
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "space-y-4 text-zinc-700 dark:text-zinc-300",
                        children: [
                            "Now that the base configuration has been saved, you can connect to your printer via Mainsail and start calibrating your printer.",
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-5",
                                children: [
                                    "You can now continue to",
                                    " ",
                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "https://os.ratrig.com/docs/configuration#initial-configuration",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "cursor-pointer text-brand-700 hover:text-brand-600",
                                        children: "the next step in the documentation."
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StepNavButtons, {
                left: {
                    onClick: props.previousScreen
                },
                right: {
                    onClick: openMainsail,
                    label: "Open Mainsail"
                }
            })
        ]
    });
};
const WizardComplete = (props)=>{
    const { currentStep , screenProps  } = useSteps({
        steps: CompletionSteps,
        parentScreenProps: props
    });
    return currentStep.renderScreen({
        ...screenProps
    });
};

;// CONCATENATED MODULE: ./components/setup-steps/index.tsx















const makeSteps = (toolheads)=>{
    let nextIndex = 0;
    const getNextIndex = ()=>{
        nextIndex++;
        return (nextIndex + "").padStart(2, "0");
    };
    const result = [
        {
            id: getNextIndex(),
            name: "Network connectivity",
            description: "Setup Wifi or Ethernet",
            href: "#",
            renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(WifiSetup, {
                    ...screenProps,
                    key: screenProps.key
                })
        },
        {
            id: getNextIndex(),
            name: "Printer Selection",
            description: "Select your printer",
            href: "#",
            renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(PrinterSelection, {
                    ...screenProps,
                    key: screenProps.key
                })
        },
        {
            id: getNextIndex(),
            name: "Control board preparation",
            description: "Firmware flashing and connectivity",
            href: "#",
            renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(MCUPreparation, {
                    ...screenProps,
                    key: screenProps.key
                })
        }
    ];
    toolheads.forEach((toolhead)=>{
        const th = new helpers_toolhead/* ToolheadHelper */.D(toolhead);
        result.push({
            id: getNextIndex(),
            name: `${th.getToolCommand()} Toolboard Preparation`,
            description: `Firmware flashing and connectivity for toolboard on ${th.getDescription().toLocaleLowerCase()}`,
            href: "#",
            renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(MCUPreparation, {
                    ...screenProps,
                    key: screenProps.key,
                    toolOrAxis: toolhead.axis
                })
        });
    });
    result.push({
        id: getNextIndex(),
        name: "Hardware Selection",
        description: "Select your printer",
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(HardwareSelection, {
                ...screenProps,
                key: screenProps.key
            })
    });
    result.push({
        id: getNextIndex(),
        name: "Confirm your setup",
        description: "Confirm your setup and start printing",
        href: "#",
        renderScreen: (screenProps)=>/*#__PURE__*/ (0,react_.createElement)(WizardComplete, {
                ...screenProps,
                key: screenProps.key
            })
    });
    // {
    // 	id: '06',
    // 	name: 'Kinematics',
    // 	description: 'Check directionality of your steppers',
    // 	href: '#',
    // 	renderScreen: (screenProps) => <CoreXYKinematics {...screenProps} />,
    // },
    // {
    // 	id: '07',
    // 	name: 'Heaters',
    // 	description: 'Calibrate your heaters',
    // 	href: '#',
    // 	renderScreen: () => null,
    // },
    return result;
};
const LoadScreen = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "p-8",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                        children: "Loading printer configuration..."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400",
                        children: "Please wait while RatOS loads your printer configuration"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mt-4 flex h-48 items-center justify-center",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
            })
        ]
    });
};
const SetupSteps = (props)=>{
    const router = (0,router_namespaceObject.useRouter)();
    const ths = (0,external_recoil_.useRecoilValue)(recoil_toolhead/* LoadablePrinterToolheadsState */.wm);
    const steps = (0,react_.useMemo)(()=>makeSteps(ths), [
        ths
    ]);
    const uriStep = router.query.step ? parseInt(router.query.step, 10) : null;
    const defaultStep = props.hasWifiInterface && !props.isConnectedToWifi ? 0 : 1;
    const { currentStepIndex , setCurrentStepIndex , screenProps , currentStep  } = useSteps({
        step: uriStep != null && uriStep < steps.length ? uriStep : defaultStep,
        onStepChange: (step)=>{
            router.push("/?step=" + step, undefined, {
                shallow: true
            });
            window.scrollTo(0, 0);
        },
        steps
    });
    const isReady = uriStep == null || uriStep === currentStepIndex;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "lg:col-span-2 lg:col-start-1",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "relative rounded-lg bg-white shadow dark:bg-zinc-800",
                    children: /*#__PURE__*/ jsx_runtime_.jsx((react_default()).Suspense, {
                        fallback: /*#__PURE__*/ jsx_runtime_.jsx(LoadScreen, {}),
                        children: isReady ? currentStep.renderScreen(screenProps) : /*#__PURE__*/ jsx_runtime_.jsx(LoadScreen, {})
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "space-y-6 lg:col-span-1 lg:col-start-3",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "overflow-hidden rounded-lg bg-white p-8 shadow dark:bg-zinc-800",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-800",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100",
                                children: "Setup Progress"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(VerticalSteps, {
                            steps: steps,
                            screenProps: screenProps,
                            currentStepIndex: currentStepIndex,
                            setCurrentStepIndex: setCurrentStepIndex
                        })
                    ]
                })
            })
        ]
    });
};

;// CONCATENATED MODULE: ./app/wizard.tsx












// Create a client
const queryClient = new external_react_query_namespaceObject.QueryClient();
const Wizard = (props)=>{
    const { data: version  } = trpc/* trpc.version.useQuery */.S.version.useQuery();
    const { data: ip  } = trpc/* trpc.ipAddress.useQuery */.S.ipAddress.useQuery();
    const isClient = useIsClient();
    return !isClient ? null : /*#__PURE__*/ jsx_runtime_.jsx(external_react_query_namespaceObject.QueryClientProvider, {
        client: queryClient,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_recoil_.RecoilRoot, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(sync_with_moonraker/* SyncWithMoonraker */.YG, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((react_default()).Suspense, {
                    fallback: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mb-4 flex h-96 items-center justify-center",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {})
                    }),
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "flex items-center space-x-5",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                                className: "text-2xl font-bold text-zinc-900 dark:text-zinc-100",
                                                children: "Printer Setup"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: "text-sm font-medium text-zinc-500 dark:text-zinc-400",
                                                children: [
                                                    "RatOS ",
                                                    version,
                                                    " @ ",
                                                    ip
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "mt-6 md:mt-0",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:flex-row md:space-x-3",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(KlippyStateBadge, {}),
                                                /*#__PURE__*/ jsx_runtime_.jsx(MoonrakerStateBadge, {})
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "mt-2 flex justify-end",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(ActionsDropdown, {})
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(SetupSteps, {
                            ...props
                        })
                    ]
                })
            })
        })
    });
};

;// CONCATENATED MODULE: ./pages/index.tsx






async function getServerSideProps() {
    return {
        props: {
            isConnectedToWifi: await isConnectedToWifi(),
            wifiInterface: await getWirelessInterface()
        }
    };
}
const Home = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "RatOS Configurator"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Wizard, {
                isConnectedToWifi: props.isConnectedToWifi,
                hasWifiInterface: props.wifiInterface != null && props.wifiInterface.trim() != ""
            })
        ]
    });
};
/* harmony default export */ const pages = (Home);


/***/ }),

/***/ 7505:
/***/ ((module) => {

module.exports = require("@headlessui/react");

/***/ }),

/***/ 2135:
/***/ ((module) => {

module.exports = require("@heroicons/react/24/outline");

/***/ }),

/***/ 8910:
/***/ ((module) => {

module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 5337:
/***/ ((module) => {

module.exports = require("@trpc/client");

/***/ }),

/***/ 7785:
/***/ ((module) => {

module.exports = require("@trpc/react-query");

/***/ }),

/***/ 6185:
/***/ ((module) => {

module.exports = require("@trpc/react-query/shared");

/***/ }),

/***/ 8161:
/***/ ((module) => {

module.exports = require("@trpc/server/shared");

/***/ }),

/***/ 8038:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 7636:
/***/ ((module) => {

module.exports = require("react-use-websocket");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ }),

/***/ 4101:
/***/ ((module) => {

module.exports = require("recoil-sync");

/***/ }),

/***/ 8316:
/***/ ((module) => {

module.exports = require("zod");

/***/ }),

/***/ 5140:
/***/ ((module) => {

module.exports = require("zod-refine");

/***/ }),

/***/ 2081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [323,387,805,49,876,680,945,377], () => (__webpack_exec__(4596)));
module.exports = __webpack_exports__;

})();