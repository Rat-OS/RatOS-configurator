"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export Moonraker */
/* harmony import */ var _hooks_useKlippyStateHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3062);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3040);


const Moonraker = ({
  hostname
}) => {
  useMoonraker(hostname);
  useKlippyStateHandler();
  return null;
};

/***/ }),

/***/ 3611:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_moonraker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9382);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4558);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _trpc_next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1820);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(72);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(superjson__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [{
  name: 'Setup Wizard',
  href: '/configure',
  current: true
}];

function MyApp(props) {
  const {
    Component,
    pageProps
  } = props;
  const moonraker =  false ? /*#__PURE__*/0 : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(recoil__WEBPACK_IMPORTED_MODULE_0__.RecoilRoot, {
    children: [moonraker, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "min-h-full",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure, {
        as: "nav",
        className: "bg-zinc-800",
        children: ({
          open
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
            className: "max-w-7xl mx-auto sm:px-6",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
              className: "border-b border-zinc-700",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "flex items-center justify-between h-16 px-4 sm:px-0",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "flex items-center",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                    className: "flex-shrink-0",
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                      width: 160,
                      height: 40,
                      src: next_config__WEBPACK_IMPORTED_MODULE_5___default()().publicRuntimeConfig.basePath + '/logo-white.svg',
                      alt: "Workflow"
                    })
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                    className: "hidden md:block",
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                      className: "ml-4 flex items-baseline space-x-4",
                      children: navigation.map(item => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                        href: item.href,
                        className: classNames(item.current ? 'bg-brand-500 text-black' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium'),
                        "aria-current": item.current ? 'page' : undefined,
                        children: item.name
                      }, item.name))
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "hidden md:flex justify-between items-center",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                    href: "https://github.com/sponsors/miklschmidt",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-zinc-300 hover:bg-zinc-400 focus:outline-none",
                    children: "Donate"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                    href: "https://os.ratrig.com/docs/introduction",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center justify-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-300 bg-transparent hover:bg-zinc-700 hover:text-white focus:outline-none",
                    children: "Documentation"
                  })]
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                  className: "-mr-2 flex md:hidden",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure.Button, {
                    className: "bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white",
                    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("span", {
                      className: "sr-only",
                      children: "Open main menu"
                    }), open ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.XMarkIcon, {
                      className: "block h-6 w-6",
                      "aria-hidden": "true"
                    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__.Bars3Icon, {
                      className: "block h-6 w-6",
                      "aria-hidden": "true"
                    })]
                  })
                })]
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure.Panel, {
            className: "md:hidden",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "space-y-1 pt-2 pb-3",
              children: [navigation.map(item => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure.Button, {
                as: "a",
                href: item.href,
                className: classNames(item.current ? 'bg-brand-50 border-brand-500 text-brand-500' : 'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'),
                "aria-current": item.current ? 'page' : undefined,
                children: item.name
              }, item.name)), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure.Button, {
                as: "a",
                href: 'https://github.com/sponsors/miklschmidt',
                className: 'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100 block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                children: "Donate"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Disclosure.Button, {
                as: "a",
                href: "https://os.ratrig.com/docs/introduction",
                className: 'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100 block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                children: "Documentation"
              })]
            })
          })]
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("main", {
        className: "py-10",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
          className: "max-w-7xl mx-auto pb-12",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(Component, _objectSpread({}, pageProps))
        })
      })]
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_trpc_next__WEBPACK_IMPORTED_MODULE_6__.withTRPC)({
  config({
    ctx
  }) {
    if (false) {}
    /**
     * SSR
     * @link https://trpc.io/docs/ssr
     */


    const url =  false ? 0 : 'http://localhost/configure/api/trpc';
    return {
      transformer: (superjson__WEBPACK_IMPORTED_MODULE_7___default()),
      url,
      headers: {
        'x-ssr': '1'
      }
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */

    };
  },

  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})(MyApp));
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2135:
/***/ ((module) => {

module.exports = require("@heroicons/react/24/outline");

/***/ }),

/***/ 1782:
/***/ ((module) => {

module.exports = require("@trpc/react");

/***/ }),

/***/ 4558:
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 1175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 7583:
/***/ ((module) => {

module.exports = require("react-ssr-prepass");

/***/ }),

/***/ 7636:
/***/ ((module) => {

module.exports = require("react-use-websocket");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = import("@headlessui/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [286,246,972,62], () => (__webpack_exec__(3611)));
module.exports = __webpack_exports__;

})();