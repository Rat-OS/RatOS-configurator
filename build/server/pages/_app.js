"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(755);
// EXTERNAL MODULE: ./hooks/useKlippyStateHandler.tsx
var hooks_useKlippyStateHandler = __webpack_require__(852);
// EXTERNAL MODULE: ./hooks/useMoonraker.tsx
var hooks_useMoonraker = __webpack_require__(277);
;// CONCATENATED MODULE: ./components/moonraker.tsx


const Moonraker = ({ hostname  })=>{
    useMoonraker(hostname);
    useKlippyStateHandler();
    return null;
};

// EXTERNAL MODULE: external "@headlessui/react"
var react_ = __webpack_require__(505);
// EXTERNAL MODULE: external "@heroicons/react/outline"
var outline_ = __webpack_require__(768);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(675);
// EXTERNAL MODULE: external "next/config"
var config_ = __webpack_require__(558);
var config_default = /*#__PURE__*/__webpack_require__.n(config_);
;// CONCATENATED MODULE: ./pages/_app.tsx








function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const navigation = [
    {
        name: 'Dashboard',
        href: '#',
        current: false
    },
    {
        name: 'Setup',
        href: '#',
        current: true
    }, 
];
function MyApp(props) {
    const { Component , pageProps  } = props;
    const moonraker =  false ? /*#__PURE__*/ 0 : null;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_recoil_.RecoilRoot, {
        children: [
            moonraker,
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "min-h-full",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-zinc-300",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Disclosure, {
                            as: "nav",
                            className: "bg-zinc-800",
                            children: ({ open  })=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "max-w-7xl mx-auto sm:px-6",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "border-b border-zinc-700",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "flex items-center justify-between h-16 px-4 sm:px-0",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "flex-shrink-0",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                                                                    width: 160,
                                                                    height: 40,
                                                                    src: config_default()().publicRuntimeConfig.basePath + '/logo-white.svg',
                                                                    alt: "Workflow"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "hidden md:block",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "ml-4 flex items-baseline space-x-4",
                                                                    children: navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            href: item.href,
                                                                            className: classNames(item.current ? 'bg-brand-500 text-black' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium'),
                                                                            "aria-current": item.current ? 'page' : undefined,
                                                                            children: item.name
                                                                        }, item.name)
                                                                    )
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "hidden md:flex justify-between items-center",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: "https://github.com/sponsors/miklschmidt",
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-zinc-300 hover:bg-zinc-400 focus:outline-none",
                                                                children: "Donate"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: "https://os.ratrig.com/docs/introduction",
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: "inline-flex items-center justify-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-300 bg-transparent hover:bg-zinc-700 hover:text-white focus:outline-none",
                                                                children: "Documentation"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "-mr-2 flex md:hidden",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Disclosure.Button, {
                                                            className: "bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: "sr-only",
                                                                    children: "Open main menu"
                                                                }),
                                                                open ? /*#__PURE__*/ jsx_runtime_.jsx(outline_.XIcon, {
                                                                    className: "block h-6 w-6",
                                                                    "aria-hidden": "true"
                                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.MenuIcon, {
                                                                    className: "block h-6 w-6",
                                                                    "aria-hidden": "true"
                                                                })
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        className: "py-10",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "max-w-7xl mx-auto pb-12",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps
                            })
                        })
                    })
                ]
            })
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 505:
/***/ ((module) => {

module.exports = require("@headlessui/react");

/***/ }),

/***/ 768:
/***/ ((module) => {

module.exports = require("@heroicons/react/outline");

/***/ }),

/***/ 558:
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ 28:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 18:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 636:
/***/ ((module) => {

module.exports = require("react-use-websocket");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675,852], () => (__webpack_exec__(944)));
module.exports = __webpack_exports__;

})();