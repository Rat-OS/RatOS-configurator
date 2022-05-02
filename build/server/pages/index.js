"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 839:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(755);
;// CONCATENATED MODULE: ./helpers/classNames.tsx
const classNames = (...classes)=>{
    return classes.filter(Boolean).join(" ");
};

// EXTERNAL MODULE: ./hooks/useKlippyStateHandler.tsx
var useKlippyStateHandler = __webpack_require__(852);
;// CONCATENATED MODULE: ./components/klippy-state-badge.tsx





const KlippyStateBadge = (props)=>{
    const klippyState = (0,external_recoil_.useRecoilValue)(useKlippyStateHandler/* KlippyStatusState */.I);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: classNames(klippyState === 'error' ? 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700' : '', klippyState === 'ready' ? 'text-brand-700 bg-brand-100 dark:text-brand-100 dark:bg-brand-700' : '', klippyState === 'shutdown' || klippyState === 'unknown' ? 'text-orange-700 bg-orange-100 dark:text-orange-100 dark:bg-orange-700' : '', klippyState === 'startup' ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-700' : '', props.className != null ? props.className : '', 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold'),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                className: classNames(klippyState === 'error' ? 'text-red-400' : '', klippyState === 'ready' ? 'text-brand-400' : '', klippyState === 'shutdown' || klippyState === 'unknown' ? 'text-orange-400' : '', klippyState === 'startup' ? 'text-yellow-400' : '', '-ml-1 mr-1.5 h-2 w-2'),
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
    }));
};

// EXTERNAL MODULE: ./hooks/useMoonraker.tsx
var useMoonraker = __webpack_require__(277);
;// CONCATENATED MODULE: ./components/moonraker-state-badge.tsx





const MoonrakerStateBadge = (props)=>{
    const moonrakerState = (0,external_recoil_.useRecoilValue)(useMoonraker/* MoonrakerStatusState */.Cv);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: classNames(moonrakerState === 'not-running' ? 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700' : '', moonrakerState === 'connected' ? 'text-brand-700 bg-brand-100 dark:text-brand-100 dark:bg-brand-700' : '', moonrakerState === 'connecting' ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-700' : '', props.className != null ? props.className : '', 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold'),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                className: classNames(moonrakerState === 'not-running' ? 'text-red-400' : '', moonrakerState === 'connected' ? 'text-brand-400' : '', moonrakerState === 'connecting' ? 'text-yellow-400' : '', '-ml-1 mr-1.5 h-2 w-2'),
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
    }));
};

;// CONCATENATED MODULE: external "@heroicons/react/solid"
const solid_namespaceObject = require("@heroicons/react/solid");
;// CONCATENATED MODULE: ./components/vertical-steps.tsx




const VerticalSteps = (props)=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("nav", {
        "aria-label": "Progress",
        children: /*#__PURE__*/ jsx_runtime_.jsx("ol", {
            role: "list",
            className: "overflow-hidden",
            children: props.steps.map((step, stepIdx)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: classNames(stepIdx !== props.steps.length - 1 ? 'pb-10' : '', 'relative'),
                    children: props.currentStepIndex > stepIdx ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                href: step.href,
                                className: "relative flex items-start group",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "h-9 flex items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-600",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.CheckIcon, {
                                                className: "w-5 h-5 text-white",
                                                "aria-hidden": "true"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 min-w-0 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold tracking-wide uppercase",
                                                children: step.name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-gray-500",
                                                children: step.description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }) : props.currentStepIndex === stepIdx ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                href: step.href,
                                className: "relative flex items-start group",
                                "aria-current": "step",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "h-9 flex items-center",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-brand-600 rounded-full",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "h-2.5 w-2.5 bg-brand-600 rounded-full"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 min-w-0 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold tracking-wide uppercase text-brand-600",
                                                children: step.name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-gray-500",
                                                children: step.description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            stepIdx !== props.steps.length - 1 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300",
                                "aria-hidden": "true"
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                href: step.href,
                                className: "relative flex items-start group",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "h-9 flex items-center",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: "ml-4 min-w-0 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-xs font-semibold tracking-wide uppercase text-gray-500",
                                                children: step.name
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-sm text-gray-500",
                                                children: step.description
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }, step.name)
            )
        })
    }));
};

;// CONCATENATED MODULE: external "react-query"
const external_react_query_namespaceObject = require("react-query");
// EXTERNAL MODULE: external "@headlessui/react"
var react_ = __webpack_require__(505);
;// CONCATENATED MODULE: ./components/card-selector.tsx

/* This example requires Tailwind CSS v2.0+ */ 


const CardSelector = (props)=>{
    const { 0: selected , 1: setSelected  } = (0,external_react_.useState)(null);
    const { onSelect: _onSelect  } = props;
    const onSelect = (0,external_react_.useCallback)((card)=>{
        if (props.value === undefined) {
            setSelected(card);
        }
        _onSelect === null || _onSelect === void 0 ? void 0 : _onSelect(card);
    }, [
        _onSelect,
        props.value
    ]);
    (0,external_react_.useEffect)(()=>{
        if (props.value !== undefined) {
            setSelected(props.value);
        }
    }, [
        props.value
    ]);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.RadioGroup, {
        value: selected,
        onChange: onSelect,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_.RadioGroup.Label, {
                className: "sr-only",
                children: "Server size"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "space-y-4",
                children: props.cards.map((card, i)=>/*#__PURE__*/ jsx_runtime_.jsx(react_.RadioGroup.Option, {
                        value: card,
                        className: ({ checked , active  })=>classNames(checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-brand-600' : '', 'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none')
                        ,
                        children: ({ active , checked  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "flex items-center",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_.RadioGroup.Label, {
                                                    as: "p",
                                                    className: "font-bold text-gray-900 text-sm",
                                                    children: card.name
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_.RadioGroup.Description, {
                                                    as: "div",
                                                    className: "text-gray-500 text-xs",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "sm:inline",
                                                        children: card.details
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_.RadioGroup.Description, {
                                        as: "div",
                                        className: "mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right",
                                        children: card.right
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: classNames(active ? 'border' : 'border-2', checked ? 'border-brand-600' : 'border-transparent', 'absolute -inset-px rounded-lg pointer-events-none'),
                                        "aria-hidden": "true"
                                    })
                                ]
                            })
                    }, card.name + i)
                )
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./components/spinner.tsx

const Spinner = ()=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
        className: "animate-spin -ml-1 mr-3 h-5 w-5 text-black",
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
    }));
};

;// CONCATENATED MODULE: ./components/error-message.tsx



const ErrorMessage = (props)=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "rounded-md bg-red-50 p-4",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex-shrink-0",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.XCircleIcon, {
                        className: "h-5 w-5 text-red-400",
                        "aria-hidden": "true"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "ml-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: "text-sm font-medium text-red-800",
                            children: "Error"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "mt-2 text-sm text-red-700",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: props.children
                            })
                        })
                    ]
                })
            ]
        })
    }));
};

// EXTERNAL MODULE: external "@heroicons/react/outline"
var outline_ = __webpack_require__(768);
;// CONCATENATED MODULE: ./components/forms/text-input.tsx





let uid = 0;
const TextInput = (props)=>{
    const fieldId = (0,external_react_.useRef)(uid++);
    const { onChange: _onChange  } = props;
    const { 0: isPasswordVisible , 1: setIsPasswordVisible  } = (0,external_react_.useState)(false);
    let iconClass = classNames('h-5 w-5', props.error ? 'text-red-500' : 'text-red-500');
    const icon = props.error ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
        children: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ExclamationCircleIcon, {
            className: "h-5 w-5 text-red-500",
            "aria-hidden": "true"
        })
    }) : null;
    const inputClass = classNames(props.error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-300 focus:ring-brand-600 focus:border-brand-600', 'block w-full pr-10 focus:outline-none sm:text-sm rounded-md shadow-sm');
    const error = props.error ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
        className: "mt-2 text-sm text-red-600",
        id: fieldId.current + '-error',
        children: props.error
    }) : null;
    const help = props.help ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
        className: "mt-2 text-sm text-gray-500",
        id: "email-description",
        children: props.help
    }) : null;
    const onChange = (0,external_react_.useCallback)((e)=>{
        _onChange === null || _onChange === void 0 ? void 0 : _onChange(e.currentTarget.value);
    }, [
        _onChange
    ]);
    const togglePasswordVisibility = (0,external_react_.useCallback)(()=>{
        setIsPasswordVisible((b)=>!b
        );
    }, []);
    const visibility = props.type === 'password' ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        onClick: togglePasswordVisibility,
        className: "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",
        children: isPasswordVisible ? /*#__PURE__*/ jsx_runtime_.jsx(outline_.EyeOffIcon, {
            className: "h-5 w-5 text-gray-400"
        }) : /*#__PURE__*/ jsx_runtime_.jsx(outline_.EyeIcon, {
            className: "h-5 w-5 text-gray-400"
        })
    }) : null;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                htmlFor: "email",
                className: "block text-sm font-medium text-gray-700",
                children: props.label
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mt-1 relative rounded-md shadow-sm",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: isPasswordVisible ? 'text' : props.type,
                        className: inputClass,
                        placeholder: props.placeholder,
                        defaultValue: props.defaultValue,
                        onChange: onChange,
                        "aria-invalid": !!props.error,
                        "aria-describedby": props.error ? fieldId.current + '-error' : undefined
                    }),
                    icon,
                    visibility
                ]
            }),
            error ?? help
        ]
    }));
};

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./components/button.tsx


const Button = (props)=>{
    const buttonClassName = classNames(props.color === 'gray' ? 'border-zinc-300 bg-gray-100 hover:bg-gray-200 text-black' : '', props.color === 'brand' ? 'text-black bg-brand-500 hover:bg-brand-600 border-transparent' : '', props.disabled ? 'opacity-60 cursor-not-allowed' : '', 'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600');
    return(/*#__PURE__*/ jsx_runtime_.jsx("button", {
        className: buttonClassName,
        onClick: props.disabled ? undefined : props.onClick,
        children: props.children
    }));
};

;// CONCATENATED MODULE: ./components/step-nav-buttons.tsx





const StepNavButtons = (props)=>{
    const leftIcon = props.left.isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
    }) : /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ArrowNarrowLeftIcon, {
        className: "mr-3 h-5 w-5 text-black",
        "aria-hidden": "true"
    });
    const left = props.left.onClick ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex-1 flex justify-start",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
            color: "gray",
            disabled: props.left.disabled,
            onClick: props.left.onClick,
            children: [
                leftIcon,
                props.left.label ?? 'Previous'
            ]
        })
    }) : null;
    const rightIcon = props.right.isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
    }) : /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ArrowNarrowRightIcon, {
        className: "ml-3 h-5 w-5 text-black-400",
        "aria-hidden": "true"
    });
    const right = props.right.onClick ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex-1 flex justify-end",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Button, {
            color: "brand",
            disabled: props.right.disabled,
            onClick: props.right.onClick,
            children: [
                props.right.label ?? 'Next',
                rightIcon
            ]
        })
    }) : null;
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "px-8 pb-5",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
            className: "bg-white py-3 flex items-center justify-between border-t border-gray-200",
            "aria-label": "Pagination",
            children: [
                left,
                right
            ]
        })
    }));
};

;// CONCATENATED MODULE: ./components/modal.tsx

/* This example requires Tailwind CSS v2.0+ */ 


const Modal = (props)=>{
    const { onClick  } = props;
    const { 0: open , 1: setOpen  } = (0,external_react_.useState)(true);
    const onButtonClick = (0,external_react_.useCallback)(()=>{
        setOpen(false);
        onClick === null || onClick === void 0 ? void 0 : onClick();
    }, [
        onClick
    ]);
    const success = props.success ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100",
        children: /*#__PURE__*/ jsx_runtime_.jsx(outline_.CheckIcon, {
            className: "h-6 w-6 text-green-600",
            "aria-hidden": "true"
        })
    }) : null;
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Root, {
        show: open,
        as: external_react_.Fragment,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog, {
            as: "div",
            className: "fixed z-10 inset-0 overflow-y-auto",
            onClose: setOpen,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                        as: external_react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0",
                        enterTo: "opacity-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100",
                        leaveTo: "opacity-0",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog.Overlay, {
                            className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "hidden sm:inline-block sm:align-middle sm:h-screen",
                        "aria-hidden": "true",
                        children: "​"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                        as: external_react_.Fragment,
                        enter: "ease-out duration-300",
                        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        enterTo: "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        success,
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "mt-3 text-center sm:mt-5",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog.Title, {
                                                    as: "h3",
                                                    className: "text-lg leading-6 font-medium text-gray-900",
                                                    children: props.title
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "mt-2",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "text-sm text-gray-500",
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
                                        className: "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm",
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
    }));
};

// EXTERNAL MODULE: external "next/config"
var config_ = __webpack_require__(558);
var config_default = /*#__PURE__*/__webpack_require__.n(config_);
;// CONCATENATED MODULE: ./helpers/wifi.tsx

const parseSignal = (dBm)=>{
    if (dBm >= -40) {
        return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "text-green-700 font-semibold",
            children: "Excellent"
        }));
    }
    if (dBm >= -67) {
        return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "text-lime-600 font-semibold",
            children: "Very good"
        }));
    }
    if (dBm >= -70) {
        return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "text-yellow-600 font-semibold",
            children: "Okay"
        }));
    }
    if (dBm >= -80) {
        return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "text-orange-500 font-semibold",
            children: "Not good"
        }));
    }
    if (dBm >= -100) {
        return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "text-red-600 font-semibold",
            children: "Unusable"
        }));
    }
};

;// CONCATENATED MODULE: ./components/setup-steps/wifi-setup.tsx















const WifiSetup = (props)=>{
    const { 0: apList1 , 1: setApList  } = (0,external_react_.useState)({
    });
    const { 0: selectedNetwork , 1: setSelectedNetwork  } = (0,external_react_.useState)(null);
    const { 0: password , 1: setPassword  } = (0,external_react_.useState)('');
    const moonrakerQuery = (0,external_recoil_.useRecoilValue)(useMoonraker/* MoonrakerQueryState */.V5);
    const { 0: hostname , 1: setHostname  } = (0,external_react_.useState)('ratos');
    const { 0: hostnameCompleted , 1: setHostnameCompleted  } = (0,external_react_.useState)(false);
    const { isLoading , isError , error , data: data1  } = (0,external_react_query_namespaceObject.useQuery)('accessPoints', async ()=>{
        const response = await fetch(config_default()().publicRuntimeConfig.basePath + '/api/wifi/scan');
        if (!response.ok) {
            throw new Error('Error while scanning for wifi networks.');
        }
        const data = await response.json();
        if ((data === null || data === void 0 ? void 0 : data.result) === 'error') {
            throw new Error(data.data.message);
        }
        return data.data;
    }, {
        refetchInterval: (data, query)=>{
            if (query.state.error) {
                return false;
            }
            return 1000;
        }
    });
    (0,external_react_.useEffect)(()=>{
        setApList((apList)=>{
            const newList = {
                ...apList
            };
            data1 === null || data1 === void 0 ? void 0 : data1.accessPoints.forEach((ap)=>{
                newList[ap.address] = ap;
            });
            return newList;
        });
    }, [
        data1
    ]);
    const cards = (0,external_react_.useMemo)(()=>{
        if (isError) return [];
        return Object.keys(apList1).map((ap)=>({
                name: apList1[ap].ssid ?? 'Unknown Network',
                id: ap,
                details: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "mr-4",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "font-semibold",
                                    children: "Signal Strength:"
                                }),
                                " ",
                                parseSignal(apList1[ap].signal)
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "font-semibold",
                                    children: "Frequency:"
                                }),
                                " ",
                                Math.round(apList1[ap].frequency / 100) / 10,
                                "GHz"
                            ]
                        })
                    ]
                }),
                right: /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.WifiIcon, {
                    className: "h-8 w-8 text-slate-500"
                })
            })
        );
    }, [
        isError,
        apList1
    ]);
    const onSelectCard = (0,external_react_.useCallback)((card)=>{
        setSelectedNetwork(apList1[card.id]);
    }, [
        apList1
    ]);
    const hostnameMutation = (0,external_react_query_namespaceObject.useMutation)((hostnameInput)=>{
        return external_axios_default().post(config_default()().publicRuntimeConfig.basePath + '/api/wifi/hostname', hostnameInput).then((val)=>{
            if (val.data.result === 'error') {
                throw new Error(val.data.data.message);
            }
            return true;
        });
    });
    const wifiMutation = (0,external_react_query_namespaceObject.useMutation)((wifiCredentials)=>{
        return external_axios_default().post(config_default()().publicRuntimeConfig.basePath + '/api/wifi/join', wifiCredentials).then((val)=>{
            if (val.data.result === 'error') {
                throw new Error(val.data.data.message);
            }
            return true;
        });
    });
    const connectToWifi = (0,external_react_.useCallback)(()=>{
        if (selectedNetwork == null || selectedNetwork.ssid == null) {
            throw new Error('Cannot join wifi without selecting a network');
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
    const rebootMutation = (0,external_react_query_namespaceObject.useMutation)(()=>{
        if (moonrakerQuery) {
            return moonrakerQuery('machine.reboot');
        }
        return Promise.reject('Cannot reboot raspberry pi: No connection to moonraker');
    });
    const rebootAndClose = (0,external_react_.useCallback)(async ()=>{
        await rebootMutation.mutateAsync();
        window.close();
    }, [
        rebootMutation
    ]);
    const confirmHostname = (0,external_react_.useCallback)(async ()=>{
        await hostnameMutation.mutateAsync({
            hostname
        });
        setHostnameCompleted(true);
    }, [
        hostnameMutation,
        hostname
    ]);
    const content = selectedNetwork && wifiMutation.isSuccess && hostnameCompleted ? /*#__PURE__*/ jsx_runtime_.jsx(Modal, {
        title: "Settings saved!",
        body: `RatOS is now setup to connect to ${selectedNetwork.ssid}! Your raspberry pi will now reboot, and join your local wifi network. Click the button below to reboot the pi and close this window. You can then reconnect to your local network where http://${hostname}.local/ should be available in a few minutes. If RatOS fails to join ${selectedNetwork.ssid}, it will recreate the "ratos" hotspot and you'll have to try again.`,
        buttonLabel: "Got it!",
        onClick: rebootAndClose
    }) : selectedNetwork && wifiMutation.isSuccess ? /*#__PURE__*/ jsx_runtime_.jsx(TextInput, {
        label: "Printer hostname",
        type: "text",
        defaultValue: "RatOS",
        error: hostnameMutation.isError ? hostnameMutation.error : undefined,
        onChange: setHostname,
        help: "Only use characters from a-Z and dashes. For example, entering \"RatOS\" will make your printer available at http://RatOS.local/"
    }, "hostname") : selectedNetwork ? /*#__PURE__*/ jsx_runtime_.jsx(TextInput, {
        label: selectedNetwork.security.toLocaleUpperCase() + ' Password',
        type: "password",
        error: wifiMutation.isError ? wifiMutation.error : undefined,
        onChange: setPassword
    }, "password") : isError ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mb-4 h-48",
        children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
            children: error === null || error === void 0 ? void 0 : error.message
        })
    }) : rebootMutation.isError ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "mb-4 h-48",
        children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage, {
            children: rebootMutation.error
        })
    }) : rebootMutation.isLoading || rebootMutation.isSuccess ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mb-4 h-48",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex justify-center items-center mb-4 h-8",
                children: "Rebooting..."
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex justify-center items-center mb-4 h-48",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
                })
            })
        ]
    }) : Object.keys(apList1).length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex justify-center items-center mb-4 h-48",
        children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner, {
        })
    }) : /*#__PURE__*/ jsx_runtime_.jsx(CardSelector, {
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
    if (selectedNetwork) {
        rightButton = {
            label: 'Save Wifi Credentials',
            disabled: password.trim().length === 0 || wifiMutation.isLoading,
            isLoading: wifiMutation.isLoading,
            onClick: connectToWifi
        };
        leftButton = {
            onClick: ()=>setSelectedNetwork(null)
            ,
            label: 'Back',
            disabled: wifiMutation.isLoading
        };
        if (wifiMutation.isSuccess) {
            rightButton = {
                label: 'Save and Connect',
                disabled: hostname.trim().length === 0 || hostnameMutation.isLoading,
                onClick: confirmHostname
            };
            leftButton = {
                onClick: ()=>wifiMutation.reset()
                ,
                label: 'Back',
                disabled: wifiMutation.isLoading
            };
            if (hostnameCompleted) {
                rightButton = {
                    onClick: props.nextScreen
                };
                leftButton = {
                };
            }
        }
    }
    if (selectedNetwork && wifiMutation.isSuccess) {
    }
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-8",
                children: [
                    ' ',
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "pb-5 mb-5 border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "text-lg leading-6 font-medium text-gray-900",
                                children: "Configure Wifi Setup"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-2 max-w-4xl text-sm text-gray-500",
                                children: "Pick an access point to join"
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
    }));
};

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
    var parsed = {
    };
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
    const wifiInterface = await (0,external_util_namespaceObject.promisify)(external_child_process_namespaceObject.exec)(`iw dev | awk '$1=="Interface"{print $2}' | head -n1`);
    return wifiInterface.stdout.trim();
};
/**
 * The **iw scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 */ const scan = async (interfaceName, options)=>{
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
 */ const iw = {
    scan: scan
};
/* harmony default export */ const helpers_iw = ((/* unused pure expression or super */ null && (iw)));

;// CONCATENATED MODULE: ./helpers/wpa-cli.tsx



const isConnectedToWifi = async ()=>{
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

;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: ./pages/index.tsx










// Create a client
const queryClient = new external_react_query_namespaceObject.QueryClient();
const steps = [
    {
        id: '00',
        name: 'Wifi Setup',
        description: 'Setup Wifi Connectivity',
        href: '#',
        renderScreen: (screenProps)=>/*#__PURE__*/ jsx_runtime_.jsx(WifiSetup, {
                ...screenProps
            })
    }, 
];
async function getServerSideProps() {
    return {
        props: {
            isConnectedToWifi: await isConnectedToWifi()
        }
    };
}
const Home = (props)=>{
    const router = (0,router_namespaceObject.useRouter)();
    const uriStep = router.query.step ? parseInt(router.query.step, 10) : null;
    const { 0: currentStepIndex , 1: setCurrentStepIndex  } = (0,external_react_.useState)(uriStep != null && !isNaN(uriStep) ? uriStep : props.isConnectedToWifi && steps.length > 1 ? 1 : 0);
    const currentStepRef = (0,external_react_.useRef)(currentStepIndex);
    currentStepRef.current = currentStepIndex;
    (0,external_react_.useEffect)(()=>{
        if (uriStep && !isNaN(uriStep) && uriStep !== currentStepRef.current) {
            setCurrentStepIndex(uriStep);
        }
    }, [
        uriStep
    ]);
    const hasNextScreen = currentStepIndex < steps.length - 1;
    const hasPreviousScreen = currentStepIndex > 0;
    const incrementStep = (0,external_react_.useCallback)(()=>{
        setCurrentStepIndex((csi)=>{
            router.push('/?step=' + (csi + 1), undefined, {
                shallow: true
            });
            return csi + 1;
        });
    }, [
        router
    ]);
    const decrementStep = (0,external_react_.useCallback)(()=>{
        setCurrentStepIndex((csi)=>{
            router.push('/?step=' + (csi - 1), undefined, {
                shallow: true
            });
            return csi - 1;
        });
    }, [
        router
    ]);
    const screenProps = {
        hasNextScreen: hasNextScreen,
        hasPreviousScreen: hasPreviousScreen,
        nextScreen: hasNextScreen ? incrementStep : undefined,
        previousScreen: hasPreviousScreen ? decrementStep : undefined
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_query_namespaceObject.QueryClientProvider, {
        client: queryClient,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
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
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex items-center space-x-5",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: "Printer Setup"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-sm font-medium text-gray-500",
                                        children: "RatOS Version v1.0.1"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "mt-6 flex space-x-1 sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(KlippyStateBadge, {
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(MoonrakerStateBadge, {
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "lg:col-start-1 lg:col-span-2",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "bg-white rounded-lg shadow overflow-hidden ",
                                children: steps[currentStepIndex].renderScreen(screenProps)
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "space-y-6 lg:col-start-3 lg:col-span-1",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "bg-white rounded-lg shadow overflow-hidden p-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "pb-5 mb-5 border-b border-gray-200",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            className: "text-lg leading-6 font-medium text-gray-900",
                                            children: "Setup Progress"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(VerticalSteps, {
                                        steps: steps,
                                        currentStepIndex: currentStepIndex
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const pages = (Home);


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
var __webpack_exports__ = __webpack_require__.X(0, [852], () => (__webpack_exec__(839)));
module.exports = __webpack_exports__;

})();