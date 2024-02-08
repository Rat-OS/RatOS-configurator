(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3267:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Inter_bfae0f', '__Inter_Fallback_bfae0f'","fontStyle":"normal"},
	"className": "__className_bfae0f"
};


/***/ }),

/***/ 8559:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.2.4_@babel+core@7.21.0_react-dom@18.2.0_react@18.2.0/node_modules/next/font/google/target.css?{"path":"pages/_app.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var _app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(3267);
var _app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
;// CONCATENATED MODULE: external "styled-jsx/style"
const style_namespaceObject = require("styled-jsx/style");
var style_default = /*#__PURE__*/__webpack_require__.n(style_namespaceObject);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(2199);
// EXTERNAL MODULE: external "@headlessui/react"
var react_ = __webpack_require__(7505);
// EXTERNAL MODULE: external "@heroicons/react/24/outline"
var outline_ = __webpack_require__(2135);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.2.4_@babel+core@7.21.0_react-dom@18.2.0_react@18.2.0/node_modules/next/image.js
var next_image = __webpack_require__(2805);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: external "next/config"
const config_namespaceObject = require("next/config");
var config_default = /*#__PURE__*/__webpack_require__.n(config_namespaceObject);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var compiled_react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./utils/trpc.ts
var trpc = __webpack_require__(945);
;// CONCATENATED MODULE: ./pages/_app.tsx










function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const navigation = [
    {
        name: "Setup Wizard",
        href: "/configure",
        current: true
    }
];
const getCurrentTheme = ()=>{
    if (false) {}
    return "light";
};
function App(props) {
    const { Component , pageProps  } = props;
    const [theme, setTheme] = (0,compiled_react_.useState)(null);
    const onThemeChange = ()=>{
        if (getCurrentTheme() === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };
    (0,compiled_react_.useEffect)(()=>{
        setTheme(getCurrentTheme());
    }, []);
    (0,compiled_react_.useEffect)(()=>{
        onThemeChange();
    }, [
        theme
    ]);
    const setDarkMode = ()=>{
        window.localStorage.theme = "dark";
        setTheme("dark");
    };
    const setLightMode = ()=>{
        window.localStorage.theme = "light";
        setTheme("light");
    };
    const setOSDefault = ()=>{
        window.localStorage.removeItem("theme");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            jsx_runtime_.jsx((style_default()), {
                id: "85d05add6f8f8e54",
                dynamic: [
                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                ],
                children: `:root{--inter-font:${(_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily}}`
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: style_default().dynamic([
                    [
                        "85d05add6f8f8e54",
                        [
                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                        ]
                    ]
                ]) + " " + "min-h-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure, {
                        as: "nav",
                        className: "bg-zinc-800",
                        children: ({ open  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: style_default().dynamic([
                                            [
                                                "85d05add6f8f8e54",
                                                [
                                                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                ]
                                            ]
                                        ]) + " " + "mx-auto max-w-7xl sm:px-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: style_default().dynamic([
                                                [
                                                    "85d05add6f8f8e54",
                                                    [
                                                        (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                    ]
                                                ]
                                            ]) + " " + "",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: style_default().dynamic([
                                                    [
                                                        "85d05add6f8f8e54",
                                                        [
                                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                        ]
                                                    ]
                                                ]) + " " + "flex h-16 items-center justify-between px-4 sm:px-0",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: style_default().dynamic([
                                                            [
                                                                "85d05add6f8f8e54",
                                                                [
                                                                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                ]
                                                            ]
                                                        ]) + " " + "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: style_default().dynamic([
                                                                    [
                                                                        "85d05add6f8f8e54",
                                                                        [
                                                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                        ]
                                                                    ]
                                                                ]) + " " + "flex-shrink-0",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    width: 160,
                                                                    height: 40,
                                                                    src: config_default()().publicRuntimeConfig.basePath + "/logo-white.svg",
                                                                    alt: "Workflow"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: style_default().dynamic([
                                                                    [
                                                                        "85d05add6f8f8e54",
                                                                        [
                                                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                        ]
                                                                    ]
                                                                ]) + " " + "hidden md:block",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: style_default().dynamic([
                                                                        [
                                                                            "85d05add6f8f8e54",
                                                                            [
                                                                                (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                            ]
                                                                        ]
                                                                    ]) + " " + "ml-4 flex items-baseline space-x-4",
                                                                    children: navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            href: item.href,
                                                                            "aria-current": item.current ? "page" : undefined,
                                                                            className: style_default().dynamic([
                                                                                [
                                                                                    "85d05add6f8f8e54",
                                                                                    [
                                                                                        (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                                    ]
                                                                                ]
                                                                            ]) + " " + (classNames(item.current ? "bg-brand-500 text-black" : "text-zinc-300 hover:bg-zinc-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium") || ""),
                                                                            children: item.name
                                                                        }, item.name))
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: style_default().dynamic([
                                                            [
                                                                "85d05add6f8f8e54",
                                                                [
                                                                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                ]
                                                            ]
                                                        ]) + " " + "hidden items-center justify-between space-x-2 md:flex",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: "https://github.com/sponsors/miklschmidt",
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: style_default().dynamic([
                                                                    [
                                                                        "85d05add6f8f8e54",
                                                                        [
                                                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                        ]
                                                                    ]
                                                                ]) + " " + "inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-400 focus:outline-none",
                                                                children: "Donate"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: "https://os.ratrig.com/docs/introduction",
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: style_default().dynamic([
                                                                    [
                                                                        "85d05add6f8f8e54",
                                                                        [
                                                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                        ]
                                                                    ]
                                                                ]) + " " + "inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm hover:bg-zinc-700 hover:text-white focus:outline-none",
                                                                children: "Documentation"
                                                            }),
                                                            theme === "light" ? /*#__PURE__*/ jsx_runtime_.jsx(outline_.MoonIcon, {
                                                                className: "h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500",
                                                                onClick: setDarkMode
                                                            }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.SunIcon, {
                                                                className: "h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500",
                                                                onClick: setLightMode
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: style_default().dynamic([
                                                            [
                                                                "85d05add6f8f8e54",
                                                                [
                                                                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                ]
                                                            ]
                                                        ]) + " " + "-mr-2 flex md:hidden",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Disclosure.Button, {
                                                            className: "inline-flex items-center justify-center rounded-md bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: style_default().dynamic([
                                                                        [
                                                                            "85d05add6f8f8e54",
                                                                            [
                                                                                (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                                            ]
                                                                        ]
                                                                    ]) + " " + "sr-only",
                                                                    children: "Open main menu"
                                                                }),
                                                                open ? /*#__PURE__*/ jsx_runtime_.jsx(outline_.XMarkIcon, {
                                                                    className: "block h-6 w-6",
                                                                    "aria-hidden": "true"
                                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.Bars3Icon, {
                                                                    className: "block h-6 w-6",
                                                                    "aria-hidden": "true"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure.Panel, {
                                        className: "md:hidden",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: style_default().dynamic([
                                                [
                                                    "85d05add6f8f8e54",
                                                    [
                                                        (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                                    ]
                                                ]
                                            ]) + " " + "space-y-1 pb-3 pt-2",
                                            children: [
                                                navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure.Button, {
                                                        as: "a",
                                                        href: item.href,
                                                        className: classNames(item.current ? "bg-brand-50 border-brand-500 text-brand-500" : "border-transparent text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100", "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"),
                                                        "aria-current": item.current ? "page" : undefined,
                                                        children: item.name
                                                    }, item.name)),
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure.Button, {
                                                    as: "a",
                                                    href: "https://github.com/sponsors/miklschmidt",
                                                    className: "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100",
                                                    children: "Donate"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure.Button, {
                                                    as: "a",
                                                    href: "https://os.ratrig.com/docs/introduction",
                                                    className: "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100",
                                                    children: "Documentation"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        className: style_default().dynamic([
                            [
                                "85d05add6f8f8e54",
                                [
                                    (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                ]
                            ]
                        ]) + " " + "py-10",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: style_default().dynamic([
                                [
                                    "85d05add6f8f8e54",
                                    [
                                        (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                    ]
                                ]
                            ]) + " " + "mx-auto max-w-7xl pb-12",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps,
                                className: style_default().dynamic([
                                    [
                                        "85d05add6f8f8e54",
                                        [
                                            (_app_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).style.fontFamily
                                        ]
                                    ]
                                ]) + " " + (pageProps && pageProps.className != null && pageProps.className || "")
                            })
                        })
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const _app = (trpc/* trpc.withTRPC */.SX.withTRPC(App));


/***/ }),

/***/ 2199:
/***/ (() => {



/***/ }),

/***/ 7505:
/***/ ((module) => {

"use strict";
module.exports = require("@headlessui/react");

/***/ }),

/***/ 2135:
/***/ ((module) => {

"use strict";
module.exports = require("@heroicons/react/24/outline");

/***/ }),

/***/ 8910:
/***/ ((module) => {

"use strict";
module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 5337:
/***/ ((module) => {

"use strict";
module.exports = require("@trpc/client");

/***/ }),

/***/ 7785:
/***/ ((module) => {

"use strict";
module.exports = require("@trpc/react-query");

/***/ }),

/***/ 6185:
/***/ ((module) => {

"use strict";
module.exports = require("@trpc/react-query/shared");

/***/ }),

/***/ 8161:
/***/ ((module) => {

"use strict";
module.exports = require("@trpc/server/shared");

/***/ }),

/***/ 8038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [323,387,805,945], () => (__webpack_exec__(8559)));
module.exports = __webpack_exports__;

})();