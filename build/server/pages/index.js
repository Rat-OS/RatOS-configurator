"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 5588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3180);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



const Button = props => {
  const buttonClassName = (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_2__/* .classNames */ .A)(props.className ? props.className : '', props.color === 'gray' ? 'border-zinc-300 bg-gray-100 hover:bg-gray-200 text-black' : '', props.color === 'brand' ? 'text-black bg-brand-500 hover:bg-brand-600 border-transparent' : '', props.disabled ? 'opacity-60 cursor-not-allowed' : '', 'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600');

  if (props.href) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
      href: props.href,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("a", {
        className: buttonClassName,
        onClick: props.onClick,
        children: props.children
      })
    });
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: buttonClassName,
    onClick: props.disabled ? undefined : props.onClick,
    children: props.children
  });
};

/***/ }),

/***/ 4769:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ CardSelector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3180);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_1__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* This example requires Tailwind CSS v2.0+ */






const CardSelector = props => {
  const {
    0: selected,
    1: setSelected
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    onSelect: _onSelect
  } = props;
  const onSelect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(card => {
    if (props.value === undefined) {
      setSelected(card);
    }

    _onSelect === null || _onSelect === void 0 ? void 0 : _onSelect(card);
  }, [_onSelect, props.value]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (props.value !== undefined) {
      setSelected(props.value);
    }
  }, [props.value]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup, {
    value: selected,
    onChange: onSelect,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup.Label, {
      className: "sr-only",
      children: "Server size"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "space-y-4",
      children: props.cards.map((card, i) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup.Option, {
        value: card,
        className: ({
          checked,
          active
        }) => (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_3__/* .classNames */ .A)(checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-brand-600' : '', 'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'),
        children: ({
          active,
          checked
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
            className: "flex items-center",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup.Label, {
                as: "p",
                className: "font-bold text-gray-900 text-sm",
                children: card.name
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup.Description, {
                as: "div",
                className: "text-gray-500 text-xs",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("p", {
                  className: "sm:inline",
                  children: card.details
                })
              })]
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.RadioGroup.Description, {
            as: "div",
            className: "mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right",
            children: card.right
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
            className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_3__/* .classNames */ .A)(active ? 'border' : 'border-2', checked ? 'border-brand-600' : 'border-transparent', 'absolute -inset-px rounded-lg pointer-events-none'),
            "aria-hidden": "true"
          })]
        })
      }, card.name + i))
    })]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9710:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ ActionsDropdown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9476);
/* harmony import */ var _heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3729);
/* harmony import */ var _mutation_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5597);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_1__, _mutation_modal__WEBPACK_IMPORTED_MODULE_4__]);
([_headlessui_react__WEBPACK_IMPORTED_MODULE_1__, _mutation_modal__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ActionsDropdown = () => {
  const {
    0: isSymlinkModalOpen,
    1: setIsSymlinkModalOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: isFlashModalOpen,
    1: setIsFlashModalOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: flashModalContent,
    1: setFlashModalContent
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: '',
    children: null,
    dismissText: 'OK'
  });
  const {
    0: symlinkModalContent,
    1: setSymlinkModalContent
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: '',
    children: null,
    dismissText: 'OK'
  });
  const symlinkExtensions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_3__/* .trpc.useMutation */ .S.useMutation('klippy-extensions.symlink');
  const flashFirmware = _helpers_trpc__WEBPACK_IMPORTED_MODULE_3__/* .trpc.useMutation */ .S.useMutation('mcu.flash-all-connected');
  const symlinkModal = isSymlinkModalOpen ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_mutation_modal__WEBPACK_IMPORTED_MODULE_4__/* .MutationModal */ .l, _objectSpread(_objectSpread({}, symlinkModalContent), {}, {
    setOpen: setIsSymlinkModalOpen,
    open: isSymlinkModalOpen,
    isFailed: symlinkExtensions.isError,
    isLoading: symlinkExtensions.isLoading
  })) : null;
  const flashModal = isFlashModalOpen ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_mutation_modal__WEBPACK_IMPORTED_MODULE_4__/* .MutationModal */ .l, _objectSpread(_objectSpread({}, flashModalContent), {}, {
    setOpen: setIsFlashModalOpen,
    open: isFlashModalOpen,
    isFailed: flashFirmware.isError,
    isLoading: flashFirmware.isLoading
  })) : null;
  const onClickFlash = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setFlashModalContent({
      title: 'Flash Firmware',
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
        children: "Please wait while RatOS is flashing your connected boards..."
      }),
      dismissText: 'Please wait...'
    });
    setIsFlashModalOpen(true);
    flashFirmware.mutateAsync().then(value => {
      setFlashModalContent({
        title: 'Flashing Complete',
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          dangerouslySetInnerHTML: {
            __html: value.replace(/\n/g, '<br />')
          }
        }),
        dismissText: 'OK'
      });
    }, value => {
      setFlashModalContent({
        title: 'Flashing Failed',
        children: typeof value === 'string' || value instanceof String ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          dangerouslySetInnerHTML: {
            __html: value.replace(/\n/g, '<br />')
          }
        }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          children: "Something wen't wrong while flashing the connected boards, please try again."
        }),
        dismissText: 'OK'
      });
    });
  }, [flashFirmware]);
  const onClickSymlink = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setSymlinkModalContent({
      title: 'Symlink Extensions',
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
        children: "Please wait while RatOS is symlinking klippy extensions..."
      }),
      dismissText: 'Please wait...'
    });
    setIsSymlinkModalOpen(true);
    symlinkExtensions.mutateAsync().then(value => {
      setSymlinkModalContent({
        title: 'Symlink Complete',
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          dangerouslySetInnerHTML: {
            __html: value.replace(/\n/g, '<br />')
          }
        }),
        dismissText: 'OK'
      });
    }, value => {
      setSymlinkModalContent({
        title: 'Symlink Failed',
        children: typeof value === 'string' || value instanceof String ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          dangerouslySetInnerHTML: {
            __html: value.replace(/\n/g, '<br />')
          }
        }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("p", {
          children: "Something wen't wrong while symlinking the extensions, please try again."
        }),
        dismissText: 'OK'
      });
    });
  }, [symlinkExtensions]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Menu, {
      as: "div",
      className: "relative inline-block text-left",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Menu.Button, {
          className: "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-100",
          children: ["Actions", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_2__.ChevronDownIcon, {
            className: "-mr-1 ml-2 h-5 w-5",
            "aria-hidden": "true"
          })]
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition, {
        as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
        enter: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Menu.Items, {
          className: "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("div", {
            className: "py-1",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Menu.Item, {
              children: ({
                active
              }) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
                onClick: onClickSymlink,
                className: classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer'),
                children: "Symlink klippy extensions"
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("div", {
            className: "py-1",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Menu.Item, {
              children: ({
                active
              }) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
                onClick: onClickFlash,
                className: classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer'),
                children: "Flash all connected MCU's"
              })
            })
          })]
        })
      })]
    }), symlinkModal, flashModal]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5597:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ MutationModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_1__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const MutationModal = props => {
  const {
    open,
    setOpen
  } = props;
  const icon = props.isFailed ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
    className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__.XMarkIcon, {
      className: "h-6 w-6 text-red-600",
      "aria-hidden": "true"
    })
  }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
    className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__.CheckIcon, {
      className: "h-6 w-6 text-green-600",
      "aria-hidden": "true"
    })
  });
  const buttonClass = clsx__WEBPACK_IMPORTED_MODULE_3___default()('inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 sm:text-sm', props.isLoading ? 'bg-brand-600 text-base font-medium text-white opacity-50 cursor-not-allowed' : 'bg-brand-600 text-base font-medium text-white hover:bg-brand-700');
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Root, {
    show: open,
    as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
      as: "div",
      className: "relative z-10",
      onClose: setOpen,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Child, {
        as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: "fixed inset-0 z-10 overflow-y-auto",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Child, {
            as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Panel, {
              className: "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl sm:p-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                children: [props.isLoading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                  className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()('animate-spin h-6 w-6 text-gray-800'),
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("circle", {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4"
                    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("path", {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })]
                  })
                }) : icon, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "mt-3 text-center sm:mt-5",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Title, {
                    as: "h3",
                    className: "text-lg font-medium leading-6 text-gray-900",
                    children: props.title
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                      className: "text-sm text-gray-500",
                      children: props.children
                    })
                  })]
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                className: "mt-5 sm:mt-6",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("button", {
                  type: "button",
                  className: buttonClass,
                  onClick: props.isLoading ? undefined : () => setOpen(false),
                  disabled: props.isLoading,
                  children: props.dismissText
                })
              })]
            })
          })
        })
      })]
    })
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ MutationStatus)
/* harmony export */ });
/* harmony import */ var _error_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5621);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3273);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const MutationStatus = mutation => {
  if (mutation.isError) {
    var _mutation$error;

    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "mb-4 h-48",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_error_message__WEBPACK_IMPORTED_MODULE_0__/* .ErrorMessage */ .B, {
        children: (_mutation$error = mutation.error) === null || _mutation$error === void 0 ? void 0 : _mutation$error.message
      })
    });
  }

  if (mutation.isLoading) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "flex items-center mb-4 absolute top-9 right-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_1__/* .Spinner */ .$, {})
    });
  }

  return null;
};

/***/ }),

/***/ 9884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ QueryStatus)
/* harmony export */ });
/* harmony import */ var _error_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5621);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3273);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const QueryStatus = query => {
  if (query.isError) {
    var _query$error;

    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "mb-4 h-48",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_error_message__WEBPACK_IMPORTED_MODULE_0__/* .ErrorMessage */ .B, {
        children: (_query$error = query.error) === null || _query$error === void 0 ? void 0 : _query$error.message
      })
    });
  }

  if (query.isFetching) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "flex items-center mb-4 absolute top-9 right-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_1__/* .Spinner */ .$, {})
    });
  }

  return null;
};

/***/ }),

/***/ 5621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ ErrorMessage)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const ErrorMessage = props => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: "rounded-md bg-red-50 p-4",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: "flex-shrink-0",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__.XCircleIcon, {
          className: "h-5 w-5 text-red-400",
          "aria-hidden": "true"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "ml-3",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("h3", {
          className: "text-sm font-medium text-red-800",
          children: "Error"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
          className: "mt-2 text-sm text-red-700",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("p", {
            children: props.children
          })
        })]
      })]
    })
  });
};

/***/ }),

/***/ 6087:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ TextInput)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3180);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);






let uid = 0;
const TextInput = props => {
  const fieldId = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(uid++);
  const {
    onChange: _onChange
  } = props;
  const {
    0: isPasswordVisible,
    1: setIsPasswordVisible
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  let iconClass = (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)('h-5 w-5', props.error ? 'text-red-500' : 'text-red-500');
  const icon = props.error ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_1__.ExclamationCircleIcon, {
      className: "h-5 w-5 text-red-500",
      "aria-hidden": "true"
    })
  }) : null;
  const inputClass = (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(props.error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-300 focus:ring-brand-600 focus:border-brand-600', 'block w-full pr-10 focus:outline-none sm:text-sm rounded-md shadow-sm');
  const error = props.error ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
    className: "mt-2 text-sm text-red-600",
    id: fieldId.current + '-error',
    children: props.error
  }) : null;
  const help = props.help ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
    className: "mt-2 text-sm text-gray-500",
    id: "email-description",
    children: props.help
  }) : null;
  const onChange = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(e => {
    _onChange === null || _onChange === void 0 ? void 0 : _onChange(e.currentTarget.value);
  }, [_onChange]);
  const togglePasswordVisibility = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    setIsPasswordVisible(b => !b);
  }, []);
  const iconRight = icon != null ? 'right-6' : 'right-0';
  const visibility = props.type === 'password' ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    onClick: togglePasswordVisibility,
    className: `absolute inset-y-0 ${iconRight} pr-3 flex items-center cursor-pointer`,
    children: isPasswordVisible ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.EyeSlashIcon, {
      className: "h-5 w-5 text-gray-400"
    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.EyeIcon, {
      className: "h-5 w-5 text-gray-400"
    })
  }) : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("label", {
      htmlFor: "email",
      className: "block text-sm font-medium text-gray-700",
      children: props.label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "mt-1 relative rounded-md shadow-sm",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("input", {
        type: isPasswordVisible ? 'text' : props.type,
        className: inputClass,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        onChange: onChange,
        "aria-invalid": !!props.error,
        "aria-describedby": props.error ? fieldId.current + '-error' : undefined
      }), icon, visibility]
    }), error ?? help]
  });
};

/***/ }),

/***/ 2468:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ InfoMessage)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const InfoMessage = props => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: "rounded-md bg-cyan-50 p-4",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: "flex-shrink-0",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__.InformationCircleIcon, {
          className: "h-5 w-5 text-cyan-400",
          "aria-hidden": "true"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "ml-3",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("h3", {
          className: "text-sm font-medium text-cyan-800",
          children: props.title ?? 'Info'
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
          className: "mt-2 text-sm text-cyan-700",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("p", {
            children: props.children
          })
        })]
      })]
    })
  });
};

/***/ }),

/***/ 5264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ KlippyStateBadge)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3180);
/* harmony import */ var _hooks_useKlippyStateHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3062);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);






const KlippyStateBadge = props => {
  const klippyState = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilValue)(_hooks_useKlippyStateHandler__WEBPACK_IMPORTED_MODULE_2__/* .KlippyStatusState */ .I);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(klippyState === 'error' ? 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700' : '', klippyState === 'ready' ? 'text-brand-700 bg-brand-100 dark:text-brand-100 dark:bg-brand-700' : '', klippyState === 'shutdown' || klippyState === 'unknown' ? 'text-orange-700 bg-orange-100 dark:text-orange-100 dark:bg-orange-700' : '', klippyState === 'startup' ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-700' : '', props.className != null ? props.className : '', 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold'),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("svg", {
      className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(klippyState === 'error' ? 'text-red-400' : '', klippyState === 'ready' ? 'text-brand-400' : '', klippyState === 'shutdown' || klippyState === 'unknown' ? 'text-orange-400' : '', klippyState === 'startup' ? 'text-yellow-400' : '', '-ml-1 mr-1.5 h-2 w-2'),
      fill: "currentColor",
      viewBox: "0 0 8 8",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("circle", {
        cx: 4,
        cy: 4,
        r: 3
      })
    }), "Klipper"]
  });
};

/***/ }),

/***/ 3680:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1185);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_1__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* This example requires Tailwind CSS v2.0+ */





const Modal = props => {
  const {
    onClick
  } = props;
  const {
    0: open,
    1: setOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const onButtonClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    onClick === null || onClick === void 0 ? void 0 : onClick();
    setOpen(false);
  }, [onClick]);
  const success = props.success ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_2__.CheckIcon, {
      className: "h-6 w-6 text-green-600",
      "aria-hidden": "true"
    })
  }) : null;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Root, {
    show: open,
    as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
      as: "div",
      className: "fixed z-10 inset-0 overflow-y-auto",
      onClose: onButtonClick,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Child, {
          as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Overlay, {
            className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
          className: "hidden sm:inline-block sm:align-middle sm:h-screen",
          "aria-hidden": "true",
          children: "\u200B"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Transition.Child, {
          as: react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              children: [success, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                className: "mt-3 text-center sm:mt-5",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Dialog.Title, {
                  as: "h3",
                  className: "text-lg leading-6 font-medium text-gray-900",
                  children: props.title
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
                  className: "mt-2",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
                    className: "text-sm text-gray-500",
                    children: props.body
                  })
                })]
              })]
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
              className: "mt-5 sm:mt-6",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
                type: "button",
                className: "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm",
                onClick: onButtonClick,
                children: props.buttonLabel
              })
            })]
          })
        })]
      })
    })
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ MoonrakerStateBadge)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3180);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3040);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);






const MoonrakerStateBadge = props => {
  const moonrakerState = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.useRecoilValue)(_hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_2__/* .MoonrakerStatusState */ .Cv);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(moonrakerState === 'not-running' ? 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700' : '', moonrakerState === 'connected' ? 'text-brand-700 bg-brand-100 dark:text-brand-100 dark:bg-brand-700' : '', moonrakerState === 'connecting' ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-700' : '', props.className != null ? props.className : '', 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold'),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("svg", {
      className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .A)(moonrakerState === 'not-running' ? 'text-red-400' : '', moonrakerState === 'connected' ? 'text-brand-400' : '', moonrakerState === 'connecting' ? 'text-yellow-400' : '', '-ml-1 mr-1.5 h-2 w-2'),
      fill: "currentColor",
      viewBox: "0 0 8 8",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("circle", {
        cx: 4,
        cy: 4,
        r: 3
      })
    }), "Moonraker"]
  });
};

/***/ }),

/***/ 2821:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ MCUPreparation)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3729);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3040);
/* harmony import */ var _hooks_useSteps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7482);
/* harmony import */ var _common_query_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9884);
/* harmony import */ var _mcu_flash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(70);
/* harmony import */ var _mcu_pick__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6100);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_mcu_flash__WEBPACK_IMPORTED_MODULE_8__, _mcu_pick__WEBPACK_IMPORTED_MODULE_9__]);
([_mcu_flash__WEBPACK_IMPORTED_MODULE_8__, _mcu_pick__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














const MCUSteps = [{
  id: '01',
  name: screenProps => screenProps.toolboards ? 'Toolboard' : 'Control board',
  description: screenProps => `Pick your ${screenProps.toolboards ? 'toolboard' : 'control board. If you also use a toolboard, you can add that later.'}`,
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_mcu_pick__WEBPACK_IMPORTED_MODULE_9__/* .MCUPicker */ .M, _objectSpread({}, screenProps))
}, {
  id: '02',
  name: screenProps => `${screenProps.toolboards ? 'Toolboard' : 'Control board'} flashing`,
  description: screenProps => `Make sure your ${screenProps.toolboards ? 'toolboard' : 'control board'} is flashed and up to date`,
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_mcu_flash__WEBPACK_IMPORTED_MODULE_8__/* .MCUFlashing */ .e, _objectSpread({}, screenProps))
}];
const MCUPreparation = props => {
  const {
    0: selectedBoards,
    1: _setSelectedBoards
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const moonrakerQuery = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.useRecoilValue)(_hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_5__/* .MoonrakerQueryState */ .V5);
  const boardsQuery = _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__/* .trpc.useQuery */ .S.useQuery(['mcu.boards']);
  const setBoardMutation = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)(async selectedBoards => {
    if (moonrakerQuery == null) {
      throw new Error('Moonraker not connected');
    }

    const response = await moonrakerQuery('server.database.post_item', {
      namespace: 'RatOS',
      key: props.toolboards ? 'toolboards' : 'boards',
      value: JSON.stringify(selectedBoards)
    });
    return response;
  });
  const selectedBoardQuery = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)('selectedBoard', async () => {
    if (moonrakerQuery == null) {
      throw new Error('Moonraker not connected');
    }

    const response = await moonrakerQuery('server.database.get_item', {
      namespace: 'RatOS',
      key: props.toolboards ? 'toolboards' : 'boards'
    });
    return JSON.parse(response.value);
  });
  const setSelectedBoard = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(selectedBoard => {
    setBoardMutation.mutate([selectedBoard.board]);

    _setSelectedBoards([selectedBoard]);
  }, [setBoardMutation]);
  const cards = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (boardsQuery.isError || boardsQuery.data == null) return [];
    return boardsQuery.data.map(b => ({
      board: b,
      name: b.manufacturer + ' ' + b.name,
      details: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("span", {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("span", {
          className: "font-semibold",
          children: "Automatic flashing:"
        }), " ", b.flashScript ? 'Yes' : 'No']
      }),
      right: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.CpuChipIcon, {
        className: "h-8 w-8 text-slate-500"
      })
    }));
  }, [boardsQuery.isError, boardsQuery.data]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Only handle single board selection for now
    const board = cards.find(c => {
      var _selectedBoardQuery$d;

      return c.board.serialPath === ((_selectedBoardQuery$d = selectedBoardQuery.data) === null || _selectedBoardQuery$d === void 0 ? void 0 : _selectedBoardQuery$d[0].serialPath);
    });

    _setSelectedBoards(board ? [board] : []);
  }, [selectedBoardQuery.data, cards]);
  const extraScreenProps = {
    selectedBoards,
    cards,
    setSelectedBoard,
    toolboards: props.toolboards
  };
  const {
    currentStep,
    screenProps
  } = (0,_hooks_useSteps__WEBPACK_IMPORTED_MODULE_6__/* .useSteps */ .h)({
    steps: MCUSteps,
    parentScreenProps: props,
    extraScreenProps: extraScreenProps
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [currentStep.renderScreen(_objectSpread(_objectSpread({}, screenProps), extraScreenProps)), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_common_query_status__WEBPACK_IMPORTED_MODULE_7__/* .QueryStatus */ .o, _objectSpread({}, boardsQuery))]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ DFUFlash)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3729);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5588);
/* harmony import */ var _error_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5621);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable @next/next/no-img-element */






const DFUFlash = props => {
  var _props$board$dfu;

  const {
    data: dfuDetected,
    error
  } = _helpers_trpc__WEBPACK_IMPORTED_MODULE_1__/* .trpc.useQuery */ .S.useQuery(['mcu.dfu-detect', {
    boardPath: props.board.path
  }], {
    refetchInterval: 1000
  });
  const flashDfuMutation = _helpers_trpc__WEBPACK_IMPORTED_MODULE_1__/* .trpc.useMutation */ .S.useMutation('mcu.dfu-flash', {
    onSuccess: props.onSuccess
  });
  const {
    0: isFlashing,
    1: setIsFlashing
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const startFlash = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setIsFlashing(true);
    flashDfuMutation.mutate({
      boardPath: props.board.path
    }, {
      onSettled: () => setIsFlashing(false)
    });
  }, [flashDfuMutation, props.board.path]);
  const dfuError = error ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_error_message__WEBPACK_IMPORTED_MODULE_3__/* .ErrorMessage */ .B, {
    children: error.message
  }) : null;
  const flashButtonTitle = isFlashing ? 'Flashing...' : dfuDetected ? 'Flash' : 'Waiting for DFU...';
  const boardPathUri = 'boardPath=' + encodeURIComponent(props.board.path);
  const instructions = (_props$board$dfu = props.board.dfu) === null || _props$board$dfu === void 0 ? void 0 : _props$board$dfu.instructions.map((step, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("li", {
    children: step
  }, index));
  const detectionText = dfuDetected ? 'DFU device detected' : 'DFU not detected';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "space-y-4",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("h3", {
      className: "text-xl font-medium text-gray-900",
      children: ["Flashing ", props.board.name, " via DFU"]
    }), dfuError, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
      className: "mt-4 text-gray-500",
      children: ["Status: ", detectionText]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
      color: "brand",
      disabled: !dfuDetected || isFlashing,
      onClick: startFlash,
      children: flashButtonTitle
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("h4", {
      className: "text-sm font-medium text-gray-900",
      children: "DFU Boot Instructions"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "mt-4 prose text-base text-gray-500",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("ol", {
        className: "list-decimal pl-4 mb-4",
        children: instructions
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("img", {
        src: '/configure/api/dfu-image?' + boardPathUri,
        alt: "DFU boot buttons and or jumper visualization"
      })]
    })]
  });
};

/***/ }),

/***/ 70:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ MCUFlashing)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3729);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5588);
/* harmony import */ var _common_mutation_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(223);
/* harmony import */ var _info_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2468);
/* harmony import */ var _step_nav_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7511);
/* harmony import */ var _dfu_flash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4911);
/* harmony import */ var _sd_card_flash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7500);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_sd_card_flash__WEBPACK_IMPORTED_MODULE_8__]);
_sd_card_flash__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const MCUFlashing = props => {
  const {
    data: isBoardDetected
  } = _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpc.useQuery */ .S.useQuery(['mcu.detect', {
    boardPath: props.selectedBoards[0].board.path
  }], {
    refetchInterval: 1000
  });
  const {
    0: forceReflash,
    1: setForceReflash
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: flashStrategy,
    1: setFlashStrategy
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const flashViaPath = _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpc.useMutation */ .S.useMutation('mcu.flash-via-path', {
    onSuccess: () => setForceReflash(false)
  });
  const reflash = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    console.log('reflash!');
    setFlashStrategy(null);
    setForceReflash(true);
  }, []);
  let rightButton = {
    onClick: props.nextScreen,
    label: 'Next',
    disabled: !isBoardDetected || forceReflash
  };
  let leftButton = {
    onClick: props.previousScreen
  };
  const firstBoard = props.selectedBoards[0].board;
  const onFlashViaPath = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setFlashStrategy('path');
    flashViaPath.mutate({
      boardPath: firstBoard.path
    });
  }, [flashViaPath, firstBoard.path]);
  let content = null;

  if (isBoardDetected && !forceReflash) {
    var _firstBoard$dfu, _firstBoard$dfu2;

    const jumperReminder = flashStrategy === 'dfu' && (_firstBoard$dfu = firstBoard.dfu) !== null && _firstBoard$dfu !== void 0 && _firstBoard$dfu.reminder ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_info_message__WEBPACK_IMPORTED_MODULE_5__/* .InfoMessage */ .$, {
      title: "Reminder",
      children: (_firstBoard$dfu2 = firstBoard.dfu) === null || _firstBoard$dfu2 === void 0 ? void 0 : _firstBoard$dfu2.reminder
    }) : null;
    content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h3", {
        className: "text-xl font-medium text-gray-900",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.CheckCircleIcon, {
          className: "text-brand-700 h-7 w-7 inline"
        }), " ", firstBoard.name, " detected"]
      }), jumperReminder, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("p", {
        children: ["Proceed to the next step or", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("button", {
          color: "gray",
          className: "text-brand-700 hover:text-brand-600",
          onClick: reflash,
          children: ["flash again ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.ArrowPathIcon, {
            className: "h-5 w-5 inline"
          })]
        })]
      })]
    });
  } else if (flashStrategy == null) {
    let dfu = null;
    let sdCard = null;
    let path = null;

    if (firstBoard.dfu != null) {
      dfu = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
        color: "gray",
        onClick: () => setFlashStrategy('dfu'),
        className: "justify-center",
        children: "Flash manually via DFU"
      });
    }

    if (!firstBoard.isToolboard) {
      sdCard = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
        color: "gray",
        onClick: () => setFlashStrategy('sdcard'),
        className: "justify-center",
        children: "Flash manually via SD card"
      });
    }

    if (isBoardDetected && firstBoard.flashScript != null) {
      path = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
        color: "gray",
        onClick: onFlashViaPath,
        className: "justify-center",
        children: "Flash automatically"
      });
    }

    content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h3", {
        className: "text-xl font-medium text-gray-900",
        children: ["How do you want to flash your ", firstBoard.name, "?"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
        children: [path, dfu, sdCard]
      })]
    });
  } else {
    switch (flashStrategy) {
      case 'dfu':
        content = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_dfu_flash__WEBPACK_IMPORTED_MODULE_7__/* .DFUFlash */ .h, {
          board: firstBoard,
          onSuccess: () => setForceReflash(false)
        });
        break;

      case 'sdcard':
        content = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_sd_card_flash__WEBPACK_IMPORTED_MODULE_8__/* .SDCardFlashing */ .f, {
          board: firstBoard,
          onSuccess: () => setForceReflash(false)
        });
        break;

      case 'path':
        content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h3", {
            className: "text-xl font-medium text-gray-900",
            children: ["Flashing ", firstBoard.name, "..."]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
            className: "mt-4 prose text-base text-gray-500",
            children: "Please wait while RatOS flashes your board."
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_common_mutation_status__WEBPACK_IMPORTED_MODULE_4__/* .MutationStatus */ .y, _objectSpread({}, flashViaPath))]
        });
    }
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "p-8",
      children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "pb-5 mb-5 border-b border-gray-200",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("h3", {
          className: "text-lg leading-6 font-medium text-gray-900",
          children: props.name
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("p", {
          className: "mt-2 max-w-4xl text-sm text-gray-500",
          children: props.description
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("div", {
        className: "space-y-4",
        children: content
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_step_nav_buttons__WEBPACK_IMPORTED_MODULE_6__/* .StepNavButtons */ .Q, {
      right: rightButton,
      left: leftButton
    })]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6100:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ MCUPicker)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _card_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4769);
/* harmony import */ var _step_nav_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7511);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_card_selector__WEBPACK_IMPORTED_MODULE_1__]);
_card_selector__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const MCUPicker = props => {
  const cards = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return props.cards.filter(card => props.toolboards === true ? card.board.isToolboard : !card.board.isToolboard);
  }, [props.toolboards, props.cards]);

  let content = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_card_selector__WEBPACK_IMPORTED_MODULE_1__/* .CardSelector */ .$, {
    cards: cards,
    value: props.selectedBoards[0],
    onSelect: props.setSelectedBoard
  });

  let rightButton = {
    onClick: props.nextScreen,
    label: 'Next',
    disabled: true
  };
  let leftButton = {
    onClick: props.previousScreen
  };
  let skipButton = props.toolboards && props.skipSteps ? {
    onClick: props.skipSteps,
    label: 'Skip'
  } : undefined;

  if (props.selectedBoards.length > 0) {
    rightButton = {
      onClick: props.nextScreen,
      label: 'Next'
    };
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "p-8",
      children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pb-5 mb-5 border-b border-gray-200",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h3", {
          className: "text-lg leading-6 font-medium text-gray-900",
          children: props.name
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
          className: "mt-2 max-w-4xl text-sm text-gray-500",
          children: props.description
        })]
      }), content]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_step_nav_buttons__WEBPACK_IMPORTED_MODULE_2__/* .StepNavButtons */ .Q, {
      right: rightButton,
      left: leftButton,
      skip: skipButton
    })]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7500:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ SDCardFlashing)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3729);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3040);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5588);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3680);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3273);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modal__WEBPACK_IMPORTED_MODULE_7__]);
_modal__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * 1) Check if board is already flashed and connected, if yes proceed to ?.
 * 2) Compile firmware for board and start download (if flash via sd card)
 * 3) Tell the user to follow the flashing instructions at os.ratrig.com. Poll board serial path in the background. Show tips about flashing.
 * 4) Once board presence is confirmed, verify automatic flashing if supported. (allow skipping)
 * 5) Printer configuration!
 */











const SDCardFlashing = props => {
  const {
    0: shutdownModalVisible,
    1: setShutdownModalVisible
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const moonrakerQuery = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.useRecoilValue)(_hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_5__/* .MoonrakerQueryState */ .V5);
  const {
    0: isFirmwareReady,
    1: setIsFirmwareReady
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const compile = _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__/* .trpc.useMutation */ .S.useMutation('mcu.compile', {
    onSuccess: () => setIsFirmwareReady(true),
    onError: () => setIsFirmwareReady(false)
  });
  const shutdownMutation = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useMutation)(() => {
    if (moonrakerQuery) {
      return moonrakerQuery('machine.shutdown');
    }

    return Promise.reject('Cannot reboot raspberry pi: No connection to moonraker');
  });

  const shutdown = () => {
    shutdownMutation.mutate();
  };

  const onShutdown = () => {
    setShutdownModalVisible(true);
  };

  const compileButton = compile.isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
    children: ["Compiling... ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_8__/* .Spinner */ .$, {
      className: "inline ml-1",
      noMargin: true
    })]
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
    children: ["Compile firmware ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__.PlayIcon, {
      className: "h-5 w-5 inline"
    })]
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "space-y-4",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h3", {
      className: "text-xl font-medium text-gray-900",
      children: [props.board.manufacturer, " ", props.board.name, " was not detected"]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
      color: "brand",
      onClick: isFirmwareReady ? props.onSuccess : () => compile.mutate({
        boardPath: props.board.path
      }),
      className: "w-52 justify-center",
      disabled: compile.isLoading && !isFirmwareReady,
      href: isFirmwareReady ? '/api/download-firmware?boardPath=' + encodeURIComponent(props.board.path) : undefined,
      children: isFirmwareReady ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
        children: ["Download firmware ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__.ArrowDownTrayIcon, {
          className: "h-5 w-5 inline"
        })]
      }) : compileButton
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "mt-4 prose text-base text-gray-500",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("ol", {
        className: "list-decimal pl-4 mb-4",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Disconnect all wires except Power and USB, and make sure your jumpers are set correctly."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Format the sd card for your board to FAT16 (sometimes just called FAT), or FAT32 with a clustersize of 8kb or 4kb."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Put it onto the sd card for your board"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Make sure the firmware file is called firmware.bin on the sd card (enable \"display file extensions\" in your file explorer). The file you downloaded will already have the correct name."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Safely eject the SD card through your operating system."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Physically take out the sd card and insert it into your control board."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx("li", {
          children: "Click the reset button on the board, or turn it off and back on again. NOTE: if the Raspberry Pi running RatOS is currently powered by your control board or the same power source, please shut it down safely first by using the button below. When the green light stops blinking and is turned off, you can cut the power."
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
        color: "gray",
        onClick: onShutdown,
        children: "Shutdown RatOS"
      })]
    }), shutdownModalVisible ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_modal__WEBPACK_IMPORTED_MODULE_7__/* .Modal */ .u, {
      title: "Shutdown RatOS?",
      body: `You raspberry pi will shutdown and this page will become unresponsive until it's powered back on. Do not remove power before the green light on the Rasperry Pi has stopped blinking.`,
      buttonLabel: "Shutdown",
      onClick: shutdown
    }) : null]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2109:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ WifiSetup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _card_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4769);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3273);
/* harmony import */ var _error_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5621);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _forms_text_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6087);
/* harmony import */ var _step_nav_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7511);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3680);
/* harmony import */ var _helpers_wifi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2141);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3040);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3729);
/* harmony import */ var _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4430);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_card_selector__WEBPACK_IMPORTED_MODULE_1__, _modal__WEBPACK_IMPORTED_MODULE_7__, _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_12__]);
([_card_selector__WEBPACK_IMPORTED_MODULE_1__, _modal__WEBPACK_IMPORTED_MODULE_7__, _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















const WifiSetup = props => {
  const {
    0: apList,
    1: setApList
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const {
    0: selectedNetwork,
    1: setSelectedNetwork
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: password,
    1: setPassword
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const moonrakerQuery = (0,recoil__WEBPACK_IMPORTED_MODULE_10__.useRecoilValue)(_hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_9__/* .MoonrakerQueryState */ .V5);
  const {
    0: hostname,
    1: setHostname
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ratos');
  const {
    0: hostnameCompleted,
    1: setHostnameCompleted
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    isLoading,
    isError,
    error,
    data
  } = _helpers_trpc__WEBPACK_IMPORTED_MODULE_11__/* .trpc.useQuery */ .S.useQuery(['wifi.scan'], {
    refetchInterval: (data, query) => {
      if (query.state.error) {
        return false;
      }

      return 1000;
    }
  });
  const hostnameMutation = _helpers_trpc__WEBPACK_IMPORTED_MODULE_11__/* .trpc.useMutation */ .S.useMutation(['wifi.hostname']);
  const wifiMutation = _helpers_trpc__WEBPACK_IMPORTED_MODULE_11__/* .trpc.useMutation */ .S.useMutation(['wifi.join']);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setApList(apList => {
      const newList = _objectSpread({}, apList);

      data === null || data === void 0 ? void 0 : data.forEach(ap => {
        newList[ap.address] = ap;
      });
      return newList;
    });
  }, [data]);
  const hostnameValidation = _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_12__/* .hostnameInput.safeParse */ .k.safeParse({
    hostname
  });
  const passwordValidation = _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_12__/* .joinInput.safeParse */ .K.safeParse({
    passphrase: password,
    ssid: selectedNetwork === null || selectedNetwork === void 0 ? void 0 : selectedNetwork.ssid
  });
  const cards = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (isError) return [];
    return Object.keys(apList).map(ap => ({
      name: apList[ap].ssid ?? 'Unknown Network',
      id: ap,
      details: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
          className: "mr-4",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("span", {
            className: "font-semibold",
            children: "Signal Strength:"
          }), " ", (0,_helpers_wifi__WEBPACK_IMPORTED_MODULE_8__/* .parseSignal */ .y)(apList[ap].signal)]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("span", {
            className: "font-semibold",
            children: "Frequency:"
          }), " ", Math.round(apList[ap].frequency / 100) / 10, "GHz"]
        })]
      }),
      right: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_4__.WifiIcon, {
        className: "h-8 w-8 text-slate-500"
      })
    }));
  }, [isError, apList]);
  const onSelectCard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(card => {
    setSelectedNetwork(apList[card.id]);
  }, [apList]);
  const connectToWifi = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (selectedNetwork == null || selectedNetwork.ssid == null) {
      throw new Error('Cannot join wifi without selecting a network');
    }

    wifiMutation.mutate({
      passphrase: password,
      ssid: selectedNetwork.ssid,
      country: selectedNetwork.country
    });
  }, [password, selectedNetwork, wifiMutation]);
  const rebootMutation = _helpers_trpc__WEBPACK_IMPORTED_MODULE_11__/* .trpc.useMutation */ .S.useMutation('reboot');
  const rebootAndClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    await rebootMutation.mutateAsync();
    window.close();
  }, [rebootMutation]);
  const confirmHostname = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    await hostnameMutation.mutateAsync({
      hostname
    });
    setHostnameCompleted(true);
  }, [hostnameMutation, hostname]);
  const content = selectedNetwork && wifiMutation.isSuccess && hostnameCompleted && !rebootMutation.isSuccess && !rebootMutation.isError ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_modal__WEBPACK_IMPORTED_MODULE_7__/* .Modal */ .u, {
    title: "Settings saved!",
    body: `RatOS is now setup to connect to ${selectedNetwork.ssid}! Your raspberry pi will now reboot, and join your local wifi network. Click the button below to reboot the pi and close this window. You can then reconnect to your local network where http://${hostname}.local/ should be available in a few minutes. If RatOS fails to join ${selectedNetwork.ssid}, it will recreate the "ratos" hotspot and you'll have to try again.`,
    buttonLabel: "Got it!",
    onClick: rebootAndClose
  }) : rebootMutation.isError ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
    className: "mb-4 h-48",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_error_message__WEBPACK_IMPORTED_MODULE_3__/* .ErrorMessage */ .B, {
      children: rebootMutation.error
    })
  }) : rebootMutation.isLoading || rebootMutation.isSuccess ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
    className: "mb-4 h-48",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
      className: "flex justify-center items-center mb-4 h-8",
      children: "Rebooting..."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "flex justify-center items-center mb-4 h-48",
      children: ["Please reconnect to ", (selectedNetwork === null || selectedNetwork === void 0 ? void 0 : selectedNetwork.ssid) ?? 'your local network', " and visit http://", hostname, ".local/ in a few minutes."]
    })]
  }) : selectedNetwork && wifiMutation.isSuccess ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_forms_text_input__WEBPACK_IMPORTED_MODULE_5__/* .TextInput */ .o, {
    label: "Printer hostname",
    type: "text",
    defaultValue: "RatOS",
    error: hostnameMutation.isError ? hostnameMutation.error.message : hostnameValidation.success ? undefined : hostnameValidation.error.issues[0].message,
    onChange: setHostname,
    help: "Only use characters from a-Z and dashes. For example, entering \"RatOS\" will make your printer available at http://RatOS.local/"
  }, "hostname") : selectedNetwork ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_forms_text_input__WEBPACK_IMPORTED_MODULE_5__/* .TextInput */ .o, {
    label: selectedNetwork.security.toLocaleUpperCase() + ' Password',
    type: "password",
    error: wifiMutation.isError ? wifiMutation.error.message : passwordValidation.success ? undefined : passwordValidation.error.issues[0].message,
    onChange: setPassword
  }, "password") : isError ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
    className: "mb-4 h-48",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_error_message__WEBPACK_IMPORTED_MODULE_3__/* .ErrorMessage */ .B, {
      children: error === null || error === void 0 ? void 0 : error.message
    })
  }) : Object.keys(apList).length === 0 ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
    className: "flex justify-center items-center mb-4 h-48",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_2__/* .Spinner */ .$, {})
  }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_card_selector__WEBPACK_IMPORTED_MODULE_1__/* .CardSelector */ .$, {
    cards: cards,
    onSelect: onSelectCard
  });
  let rightButton = {
    onClick: props.nextScreen,
    label: 'Skip'
  };
  let leftButton = {
    onClick: props.previousScreen
  };
  let subtext = 'Pick an access point to join';

  if (selectedNetwork) {
    rightButton = {
      label: 'Save Wifi Credentials',
      disabled: !passwordValidation.success || wifiMutation.isLoading,
      isLoading: wifiMutation.isLoading,
      onClick: connectToWifi
    };
    leftButton = {
      onClick: () => setSelectedNetwork(null),
      label: 'Back',
      disabled: wifiMutation.isLoading
    };
    subtext = 'Enter password for ' + selectedNetwork.ssid;

    if (wifiMutation.isSuccess) {
      rightButton = {
        label: 'Save and Connect',
        disabled: !hostnameValidation.success || hostnameMutation.isLoading,
        onClick: confirmHostname
      };
      leftButton = {
        onClick: () => wifiMutation.reset(),
        label: 'Back',
        disabled: wifiMutation.isLoading
      };
      subtext = 'Enter the hostname you want to use for the printer';

      if (hostnameCompleted) {
        rightButton = {
          onClick: props.nextScreen
        };
        leftButton = {};
        subtext = 'Proceed to next step';
      }
    }
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "p-8",
      children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        className: "pb-5 mb-5 border-b border-gray-200",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("h3", {
          className: "text-lg leading-6 font-medium text-gray-900",
          children: "Configure Wifi Setup"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("p", {
          className: "mt-2 max-w-4xl text-sm text-gray-500",
          children: subtext
        })]
      }), content]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_step_nav_buttons__WEBPACK_IMPORTED_MODULE_6__/* .StepNavButtons */ .Q, {
      right: rightButton,
      left: leftButton
    })]
  });
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ WizardComplete)
/* harmony export */ });
/* harmony import */ var _step_nav_buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7511);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




const WizardComplete = props => {
  const openMainsail = () => {
    window.location.href = 'http://' + window.location.hostname;
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "p-8",
      children: [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "pb-5 mb-5 border-b border-gray-200",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h3", {
          className: "text-lg leading-6 font-medium text-gray-900",
          children: props.name
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
          className: "mt-2 max-w-4xl text-sm text-gray-500",
          children: props.description
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "space-y-4",
        children: ["Now that your controlboard is configured, you can connect to your printer via Mainsail and start configuring and calibrating your printer.", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "mt-5",
          children: ["You can now continue to", ' ', /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("a", {
            href: "https://os.ratrig.com/docs/configuration#initial-configuration",
            target: "_blank",
            rel: "noreferrer",
            className: "text-brand-700 hover:text-brand-600 cursor-pointer",
            children: "the next step in the documentation."
          })]
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_step_nav_buttons__WEBPACK_IMPORTED_MODULE_0__/* .StepNavButtons */ .Q, {
      left: {
        onClick: props.previousScreen
      },
      right: {
        onClick: openMainsail,
        label: 'Open Mainsail'
      }
    })]
  });
};

/***/ }),

/***/ 3273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ Spinner)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



const Spinner = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    className: clsx__WEBPACK_IMPORTED_MODULE_0___default()('animate-spin h-5 w-5 text-black', !props.noMargin ? '-ml-1 mr-3' : '', props.className),
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("circle", {
      className: "opacity-25",
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("path", {
      className: "opacity-75",
      fill: "currentColor",
      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })]
  });
};

/***/ }),

/***/ 7511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ StepNavButtons)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2135);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5588);
/* harmony import */ var _spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3273);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






const StepNavButtons = props => {
  const leftIcon = props.left.isLoading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_3__/* .Spinner */ .$, {}) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.PlayIcon, {
    className: "mr-3 h-5 w-5 text-black rotate-180",
    "aria-hidden": "true"
  });
  const left = props.left.onClick ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
    className: "flex-1 flex justify-start",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
      color: "gray",
      disabled: props.left.disabled,
      onClick: props.left.onClick,
      children: [leftIcon, props.left.label ?? 'Back']
    })
  }) : null;
  const rightIcon = props.right.isLoading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_spinner__WEBPACK_IMPORTED_MODULE_3__/* .Spinner */ .$, {}) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.PlayIcon, {
    className: "ml-3 h-5 w-5 text-black-400",
    "aria-hidden": "true"
  });
  const right = props.right.onClick ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "flex-1 flex justify-end space-x-4",
    children: [props.skip && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
      color: "gray",
      onClick: props.skip.onClick,
      disabled: props.skip.disabled,
      children: [props.skip.label ?? 'Skip', /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_0__.ForwardIcon, {
        className: "ml-3 h-5 w-5 text-black",
        "aria-hidden": "true"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
      color: "brand",
      disabled: props.right.disabled,
      onClick: props.right.onClick,
      children: [props.right.label ?? 'Next', rightIcon]
    })]
  }) : null;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
    className: "px-8 pb-5",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("nav", {
      className: "bg-white py-3 flex items-center  justify-between border-t border-gray-200",
      "aria-label": "Pagination",
      children: [left, right]
    })
  });
};

/***/ }),

/***/ 2750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ VerticalSteps)
/* harmony export */ });
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8802);
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_classNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3180);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






const VerticalSteps = props => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("nav", {
    "aria-label": "Progress",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ol", {
      role: "list",
      className: "overflow-hidden",
      children: props.steps.map((step, stepIdx) => {
        const name = typeof step.name === 'function' ? step.name(props.screenProps) : step.name;
        const description = typeof step.description === 'function' ? step.description(props.screenProps) : step.description;
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("li", {
          className: (0,_helpers_classNames__WEBPACK_IMPORTED_MODULE_3__/* .classNames */ .A)(stepIdx !== props.steps.length - 1 ? 'pb-10' : '', 'relative'),
          children: props.currentStepIndex > stepIdx ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
            children: [stepIdx !== props.steps.length - 1 ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
              className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600",
              "aria-hidden": "true"
            }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
              className: "relative flex items-start group",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                className: "h-9 flex items-center",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-600",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_0__.CheckIcon, {
                    className: "w-5 h-5 text-white",
                    "aria-hidden": "true"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
                className: "ml-4 min-w-0 flex flex-col",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-xs font-semibold tracking-wide uppercase",
                  children: name
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-sm text-gray-500",
                  children: description
                })]
              })]
            })]
          }) : props.currentStepIndex === stepIdx ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
            children: [stepIdx !== props.steps.length - 1 ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
              className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300",
              "aria-hidden": "true"
            }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
              className: "relative flex items-start group",
              "aria-current": "step",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                className: "h-9 flex items-center",
                "aria-hidden": "true",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-brand-600 rounded-full",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                    className: "h-2.5 w-2.5 bg-brand-600 rounded-full"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
                className: "ml-4 min-w-0 flex flex-col",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-xs font-semibold tracking-wide uppercase text-brand-600",
                  children: name
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-sm text-gray-500",
                  children: description
                })]
              })]
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
            children: [stepIdx !== props.steps.length - 1 ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
              className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300",
              "aria-hidden": "true"
            }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
              className: "relative flex items-start group",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                className: "h-9 flex items-center",
                "aria-hidden": "true",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                    className: "h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
                className: "ml-4 min-w-0 flex flex-col",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-xs font-semibold tracking-wide uppercase text-gray-500",
                  children: name
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
                  className: "text-sm text-gray-500",
                  children: description
                })]
              })]
            })]
          })
        }, name);
      })
    })
  });
};

/***/ }),

/***/ 3180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ classNames)
/* harmony export */ });
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

/***/ }),

/***/ 3729:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ trpc)
/* harmony export */ });
/* harmony import */ var _trpc_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1782);
/* harmony import */ var _trpc_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_react__WEBPACK_IMPORTED_MODULE_0__);

const trpc = (0,_trpc_react__WEBPACK_IMPORTED_MODULE_0__.createReactQueryHooks)();

/***/ }),

/***/ 4430:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ joinInput),
/* harmony export */   "k": () => (/* binding */ hostnameInput)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const hostnameInput = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  hostname: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(2).regex(/^([a-zA-Z0-9]|-)+$/, 'Hostname can only include a-Z, 0-9 and dashes.')
});
const joinInput = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  ssid: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  passphrase: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(8).max(63),
  country: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2141:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ parseSignal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const parseSignal = dBm => {
  if (dBm >= -40) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: "text-green-700 font-semibold",
      children: "Excellent"
    });
  }

  if (dBm >= -67) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: "text-lime-600 font-semibold",
      children: "Very good"
    });
  }

  if (dBm >= -70) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: "text-yellow-600 font-semibold",
      children: "Okay"
    });
  }

  if (dBm >= -80) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: "text-orange-500 font-semibold",
      children: "Not good"
    });
  }

  if (dBm >= -100) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
      className: "text-red-600 font-semibold",
      children: "Unusable"
    });
  }
};

/***/ }),

/***/ 4646:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "e": () => (/* binding */ isConnectedToWifi)
});

;// CONCATENATED MODULE: external "child_process"
const external_child_process_namespaceObject = require("child_process");
;// CONCATENATED MODULE: external "util"
const external_util_namespaceObject = require("util");
;// CONCATENATED MODULE: ./helpers/iw.ts
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
 */
const hasSsid = network => {
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
 */


const hasKeys = network => {
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
 */


const bySignal = (a, b) => {
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
 */


const parseCell = cell => {
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
    parsed.security = 'wpa2';
  } else if (match = cell.match(/WPA:[\s*]+Version: 1/)) {
    parsed.security = 'wpa';
  } else if (match = cell.match(/capability: ESS Privacy/)) {
    parsed.security = 'wep';
  } else if (match = cell.match(/capability: ESS/)) {
    parsed.security = 'open';
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
 */


const parseScan = show_hidden => {
  return function ({
    stdout,
    stderr
  }) {
    if (show_hidden) {
      return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasKeys).sort(bySignal);
    } else {
      return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasSsid).sort(bySignal);
    }
  };
};

const getWirelessInterface = async () => {
  const wifiInterface = await (0,external_util_namespaceObject.promisify)(external_child_process_namespaceObject.exec)(`iw dev | awk '$1=="Interface"{print $2}' | head -n1`);
  return wifiInterface.stdout.trim();
};
/**
 * The **iw scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 */

const scan = async (interfaceName, options) => {
  const apForce = options.apForce ? ' ap-force' : '';
  const iwResult = await (0,external_util_namespaceObject.promisify)(external_child_process_namespaceObject.exec)('sudo iw dev ' + interfaceName + ' scan' + apForce);
  return parseScan(options.showHidden ?? false)(iwResult);
};
/**
 * The **iw** command is used to control nl80211 radios.
 *
 * @static
 * @category iw
 *
 */

const iw = {
  scan: scan
};
/* harmony default export */ const helpers_iw = ((/* unused pure expression or super */ null && (iw)));
;// CONCATENATED MODULE: ./helpers/wpa-cli.tsx



const isConnectedToWifi = async () => {
  if (false) {}

  const wirelessInterface = await getWirelessInterface();

  try {
    const res = await (0,external_util_namespaceObject.promisify)(external_child_process_namespaceObject.exec)(`sudo wpa_cli -i "${wirelessInterface}" status | grep 'ip_address'`);

    if (res.stdout.indexOf('ip_address=192.168.50.1') > -1) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
};

/***/ }),

/***/ 7482:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ useSteps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const useSteps = props => {
  var _props$parentScreenPr, _props$parentScreenPr2, _props$parentScreenPr3, _props$parentScreenPr4;

  const {
    onIncrementStep,
    onDecrementStep
  } = props;
  const {
    0: currentStepIndex,
    1: setCurrentStepIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.step != null && !isNaN(props.step) ? props.step : 0);
  const currentStep = props.steps[currentStepIndex];
  const currentStepRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(currentStepIndex);
  currentStepRef.current = currentStepIndex;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (props.step && !isNaN(props.step) && props.step !== currentStepRef.current) {
      setCurrentStepIndex(props.step);
    }
  }, [props.step]);
  const hasNextScreen = currentStepIndex < props.steps.length - 1;
  const hasPreviousScreen = currentStepIndex > 0;
  const incrementStep = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setCurrentStepIndex(csi => {
      onIncrementStep === null || onIncrementStep === void 0 ? void 0 : onIncrementStep(csi + 1);
      return csi + 1;
    });
  }, [onIncrementStep]);
  const decrementStep = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setCurrentStepIndex(csi => {
      onDecrementStep === null || onDecrementStep === void 0 ? void 0 : onDecrementStep(csi - 1);
      return csi - 1;
    });
  }, [onDecrementStep]);

  const partialScreenProps = _objectSpread(_objectSpread({}, 'extraScreenProps' in props ? props.extraScreenProps : {}), {}, {
    key: 'step-' + currentStepIndex,
    hasNextScreen: hasNextScreen || (((_props$parentScreenPr = props.parentScreenProps) === null || _props$parentScreenPr === void 0 ? void 0 : _props$parentScreenPr.hasNextScreen) ?? false),
    hasPreviousScreen: hasPreviousScreen || (((_props$parentScreenPr2 = props.parentScreenProps) === null || _props$parentScreenPr2 === void 0 ? void 0 : _props$parentScreenPr2.hasNextScreen) ?? false),
    nextScreen: hasNextScreen ? incrementStep : (_props$parentScreenPr3 = props.parentScreenProps) !== null && _props$parentScreenPr3 !== void 0 && _props$parentScreenPr3.hasNextScreen ? props.parentScreenProps.nextScreen : undefined,
    previousScreen: hasPreviousScreen ? decrementStep : (_props$parentScreenPr4 = props.parentScreenProps) !== null && _props$parentScreenPr4 !== void 0 && _props$parentScreenPr4.hasPreviousScreen ? props.parentScreenProps.previousScreen : undefined,
    skipSteps: props.parentScreenProps && props.parentScreenProps.hasNextScreen ? props.parentScreenProps.nextScreen : undefined
  });

  const name = typeof currentStep.name === 'function' ? currentStep.name(partialScreenProps) : currentStep.name;
  const description = typeof currentStep.description === 'function' ? currentStep.description(partialScreenProps) : currentStep.description;

  const screenProps = _objectSpread(_objectSpread({}, partialScreenProps), {}, {
    name,
    description
  });

  return {
    screenProps,
    currentStepIndex,
    currentStep: props.steps[currentStepIndex]
  };
};

/***/ }),

/***/ 2119:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var babel_plugin_superjson_next_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1421);
/* harmony import */ var babel_plugin_superjson_next_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_superjson_next_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_klippy_state_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5264);
/* harmony import */ var _components_moonraker_state_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1188);
/* harmony import */ var _components_vertical_steps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2750);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_setup_steps_wifi_setup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2109);
/* harmony import */ var _helpers_wpa_cli__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4646);
/* harmony import */ var _components_setup_steps_mcu_preparation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2821);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _hooks_useSteps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7482);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3729);
/* harmony import */ var _components_setup_steps_wizard_complete__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1717);
/* harmony import */ var _components_common_actions_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9710);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_setup_steps_wifi_setup__WEBPACK_IMPORTED_MODULE_7__, _components_setup_steps_mcu_preparation__WEBPACK_IMPORTED_MODULE_9__, _components_common_actions_dropdown__WEBPACK_IMPORTED_MODULE_14__]);
([_components_setup_steps_wifi_setup__WEBPACK_IMPORTED_MODULE_7__, _components_setup_steps_mcu_preparation__WEBPACK_IMPORTED_MODULE_9__, _components_common_actions_dropdown__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














 // Create a client



const queryClient = new react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();
const steps = [{
  id: '00',
  name: 'Wifi Setup',
  description: 'Setup Wifi Connectivity',
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_setup_steps_wifi_setup__WEBPACK_IMPORTED_MODULE_7__/* .WifiSetup */ .S, _objectSpread({}, screenProps))
}, {
  id: '01',
  name: 'Control board preparation',
  description: 'Firmware flashing and connectivity',
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_setup_steps_mcu_preparation__WEBPACK_IMPORTED_MODULE_9__/* .MCUPreparation */ .u, _objectSpread({}, screenProps))
}, {
  id: '02',
  name: 'Toolboard Preparation',
  description: 'Firmware flashing and connectivity',
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_setup_steps_mcu_preparation__WEBPACK_IMPORTED_MODULE_9__/* .MCUPreparation */ .u, _objectSpread(_objectSpread({}, screenProps), {}, {
    toolboards: true
  }))
}, {
  id: '03',
  name: 'Configure printer in Mainsail',
  description: 'Choose your hardware and start calibrating your printer',
  href: '#',
  renderScreen: screenProps => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_setup_steps_wizard_complete__WEBPACK_IMPORTED_MODULE_13__/* .WizardComplete */ .g, _objectSpread({}, screenProps))
} // {
// 	id: '02',
// 	name: 'Printer Selection',
// 	description: 'Select your printer',
// 	href: '#',
// 	renderScreen: (screenProps) => <PrinterSelection {...screenProps} />,
// },
// {
// 	id: '03',
// 	name: 'Hardware Selection',
// 	description: 'Select your hardware',
// 	href: '#',
// 	renderScreen: () => null,
// },
// {
// 	id: '04',
// 	name: 'Kinematics',
// 	description: 'Check directionality of your steppers',
// 	href: '#',
// 	renderScreen: (screenProps) => <CoreXYKinematics {...screenProps} />,
// },
// {
// 	id: '05',
// 	name: 'Heaters',
// 	description: 'Calibrate your heaters',
// 	href: '#',
// 	renderScreen: () => null,
// },
];
const getServerSideProps = (0,babel_plugin_superjson_next_tools__WEBPACK_IMPORTED_MODULE_0__.withSuperJSONProps)(async function getServerSideProps() {
  return {
    props: {
      isConnectedToWifi: await (0,_helpers_wpa_cli__WEBPACK_IMPORTED_MODULE_8__/* .isConnectedToWifi */ .e)()
    } // will be passed to the page component as props

  };
}, []);

const Home = props => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_10__.useRouter)();
  const uriStep = router.query.step ? parseInt(router.query.step, 10) : null;
  const {
    data: version
  } = _helpers_trpc__WEBPACK_IMPORTED_MODULE_12__/* .trpc.useQuery */ .S.useQuery(['version']);
  const {
    data: ip
  } = _helpers_trpc__WEBPACK_IMPORTED_MODULE_12__/* .trpc.useQuery */ .S.useQuery(['ip-address']);
  const {
    currentStepIndex,
    screenProps,
    currentStep
  } = (0,_hooks_useSteps__WEBPACK_IMPORTED_MODULE_11__/* .useSteps */ .h)({
    step: uriStep ?? undefined,
    onIncrementStep: step => {
      router.push('/?step=' + step, undefined, {
        shallow: true
      });
    },
    onDecrementStep: step => {
      router.push('/?step=' + step, undefined, {
        shallow: true
      });
    },
    steps
  });
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {
    client: queryClient,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("title", {
          children: "RatOS Configurator"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("link", {
          rel: "icon",
          href: "/favicon.ico"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
          className: "flex items-center space-x-5",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("h1", {
              className: "text-2xl font-bold text-gray-900",
              children: "Printer Setup"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("p", {
              className: "text-sm font-medium text-gray-500",
              children: ["RatOS ", version, " @ ", ip]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "mt-6 md:mt-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:flex-row md:space-x-3",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_klippy_state_badge__WEBPACK_IMPORTED_MODULE_3__/* .KlippyStateBadge */ .y, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_moonraker_state_badge__WEBPACK_IMPORTED_MODULE_4__/* .MoonrakerStateBadge */ .i, {})]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
            className: "flex justify-end mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_common_actions_dropdown__WEBPACK_IMPORTED_MODULE_14__/* .ActionsDropdown */ .m, {})
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
          className: "lg:col-start-1 lg:col-span-2",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
            className: "bg-white rounded-lg shadow overflow-hidden relative",
            children: currentStep.renderScreen(screenProps)
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
          className: "space-y-6 lg:col-start-3 lg:col-span-1",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "bg-white rounded-lg shadow overflow-hidden p-8",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("div", {
              className: "pb-5 mb-5 border-b border-gray-200",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx("h3", {
                className: "text-lg leading-6 font-medium text-gray-900",
                children: "Setup Progress"
              })
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx(_components_vertical_steps__WEBPACK_IMPORTED_MODULE_5__/* .VerticalSteps */ .u, {
              steps: steps,
              screenProps: screenProps,
              currentStepIndex: currentStepIndex
            })]
          })
        })]
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,babel_plugin_superjson_next_tools__WEBPACK_IMPORTED_MODULE_0__.withSuperJSONPage)(Home));
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9476:
/***/ ((module) => {

module.exports = require("@heroicons/react/20/solid");

/***/ }),

/***/ 2135:
/***/ ((module) => {

module.exports = require("@heroicons/react/24/outline");

/***/ }),

/***/ 8802:
/***/ ((module) => {

module.exports = require("@heroicons/react/24/solid");

/***/ }),

/***/ 1782:
/***/ ((module) => {

module.exports = require("@trpc/react");

/***/ }),

/***/ 1421:
/***/ ((module) => {

module.exports = require("babel-plugin-superjson-next/tools");

/***/ }),

/***/ 8103:
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 1175:
/***/ ((module) => {

module.exports = require("react-query");

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

/***/ 1185:
/***/ ((module) => {

module.exports = import("@headlessui/react");;

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [286,383,246,664,62], () => (__webpack_exec__(2119)));
module.exports = __webpack_exports__;

})();