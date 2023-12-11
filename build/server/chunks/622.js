exports.id = 622;
exports.ids = [622];
exports.modules = {

/***/ 8269:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addBasePath = addBasePath;
var _addPathPrefix = __webpack_require__(1751);
var _normalizeTrailingSlash = __webpack_require__(1513);
const basePath = "/configure" || 0;
function addBasePath(path, required) {
    if (false) {}
    return (0, _normalizeTrailingSlash).normalizePathTrailingSlash((0, _addPathPrefix).addPathPrefix(path, basePath));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 4924:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addLocale = void 0;
var _normalizeTrailingSlash = __webpack_require__(1513);
const addLocale = (path, ...args)=>{
    if (false) {}
    return path;
};
exports.addLocale = addLocale;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 5430:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getDomainLocale = getDomainLocale;
const basePath = (/* unused pure expression or super */ null && ("/configure" || 0));
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-domain-locale.js.map


/***/ }),

/***/ 1823:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(6239)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(8038));
var _resolveHref = __webpack_require__(7782);
var _isLocalUrl = __webpack_require__(1109);
var _formatUrl = __webpack_require__(3938);
var _utils = __webpack_require__(9232);
var _addLocale = __webpack_require__(4924);
var _routerContext = __webpack_require__(4964);
var _appRouterContext = __webpack_require__(3280);
var _useIntersection = __webpack_require__(2569);
var _getDomainLocale = __webpack_require__(5430);
var _addBasePath = __webpack_require__(8269);
const prefetched = new Set();
function prefetch(router, href, as, options, isAppRouter) {
    if (true) {
        return;
    }
    // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    if (!isAppRouter && !(0, _isLocalUrl).isLocalURL(href)) {
        return;
    }
    // We should only dedupe requests when experimental.optimisticClientCache is
    // disabled.
    if (!options.bypassPrefetchedCheck) {
        const locale = typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : undefined;
        const prefetchedKey = href + "%" + as + "%" + locale;
        // If we've already fetched the key, then don't prefetch it again!
        if (prefetched.has(prefetchedKey)) {
            return;
        }
        // Mark this URL as prefetched.
        prefetched.add(prefetchedKey);
    }
    // Prefetch the JSON page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    Promise.resolve(router.prefetch(href, as, options)).catch((err)=>{
        if (false) {}
    });
}
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
    const { nodeName  } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    !isAppRouter && !(0, _isLocalUrl).isLocalURL(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                forceOptimisticNavigation: !prefetchEnabled
            });
        }
    };
    if (isAppRouter) {
        // @ts-expect-error startTransition exists.
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
        return urlObjOrString;
    }
    return (0, _formatUrl).formatUrl(urlObjOrString);
}
/**
 * React Component that enables client-side transitions between routes.
 */ const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    if (false) {}
    let children;
    const { href: hrefProp , as: asProp , children: childrenProp , prefetch: prefetchProp , passHref , replace , shallow , scroll , locale , onClick , onMouseEnter: onMouseEnterProp , onTouchStart: onTouchStartProp , legacyBehavior =true === false  } = props, restProps = _object_without_properties_loose(props, [
        "href",
        "as",
        "children",
        "prefetch",
        "passHref",
        "replace",
        "shallow",
        "scroll",
        "locale",
        "onClick",
        "onMouseEnter",
        "onTouchStart",
        "legacyBehavior"
    ]);
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /*#__PURE__*/ _react.default.createElement("a", null, children);
    }
    const prefetchEnabled = prefetchProp !== false;
    const pagesRouter = _react.default.useContext(_routerContext.RouterContext);
    const appRouter = _react.default.useContext(_appRouterContext.AppRouterContext);
    const router = pagesRouter != null ? pagesRouter : appRouter;
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    if (false) {}
    const { href , as  } = _react.default.useMemo(()=>{
        if (!pagesRouter) {
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
        const [resolvedHref, resolvedAs] = (0, _resolveHref).resolveHref(pagesRouter, hrefProp, true);
        return {
            href: resolvedHref,
            as: asProp ? (0, _resolveHref).resolveHref(pagesRouter, asProp) : resolvedAs || resolvedHref
        };
    }, [
        pagesRouter,
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (false) {} else {
            child = _react.default.Children.only(children);
        }
    } else {
        if (false) { var ref; }
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useIntersection).useIntersection({
        rootMargin: "200px"
    });
    const setRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
            if (typeof childRef === "function") childRef(el);
            else if (typeof childRef === "object") {
                childRef.current = el;
            }
        }
    }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        // in dev, we only prefetch on hover to avoid wasting resources as the prefetch will trigger compiling the page.
        if (false) {}
        if (!router) {
            return;
        }
        // If we don't need to prefetch the URL, don't do prefetch.
        if (!isVisible || !prefetchEnabled) {
            return;
        }
        // Prefetch the URL.
        prefetch(router, href, as, {
            locale
        }, isAppRouter);
    }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router,
        isAppRouter
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if (false) {}
            if (!legacyBehavior && typeof onClick === "function") {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, isAppRouter);
        },
        onTouchStart (e) {
            if (!legacyBehavior && typeof onTouchStartProp === "function") {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, isAppRouter);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the domain and locale.
    if ((0, _utils).isAbsoluteUrl(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        // we only render domain locales if we are currently on a domain locale
        // so that locale links are still visitable in development/preview envs
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getDomainLocale).getDomainLocale(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addBasePath).addBasePath((0, _addLocale).addLocale(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ _react.default.createElement("a", Object.assign({}, restProps, childProps), children);
});
var _default = Link;
exports["default"] = _default;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map


/***/ }),

/***/ 1513:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.normalizePathTrailingSlash = void 0;
var _removeTrailingSlash = __webpack_require__(3297);
var _parsePath = __webpack_require__(8854);
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith("/") || undefined) {
        return path;
    }
    const { pathname , query , hash  } = (0, _parsePath).parsePath(path);
    if (false) {}
    return `${(0, _removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
};
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 7765:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
exports.requestIdleCallback = requestIdleCallback;
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
exports.cancelIdleCallback = cancelIdleCallback;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 2569:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useIntersection = useIntersection;
var _react = __webpack_require__(8038);
var _requestIdleCallback = __webpack_require__(7765);
const hasIntersectionObserver = typeof IntersectionObserver === "function";
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id , observer , elements  } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection({ rootRef , rootMargin , disabled  }) {
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react).useState(false);
    const elementRef = (0, _react).useRef(null);
    const setElement = (0, _react).useCallback((element)=>{
        elementRef.current = element;
    }, []);
    (0, _react).useEffect(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestIdleCallback).requestIdleCallback(()=>setVisible(true));
                return ()=>(0, _requestIdleCallback).cancelIdleCallback(idleCallback);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
    ]);
    const resetVisible = (0, _react).useCallback(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


/***/ }),

/***/ 6890:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1823)


/***/ }),

/***/ 6187:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "u": () => (/* binding */ useAutoAnimate)
});

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@formkit+auto-animate@0.8.0/node_modules/@formkit/auto-animate/index.mjs
/**
 * A set of all the parents currently being observe. This is the only non weak
 * registry.
 */
const parents = new Set();
/**
 * Element coordinates that is constantly kept up to date.
 */
const coords = new WeakMap();
/**
 * Siblings of elements that have been removed from the dom.
 */
const siblings = new WeakMap();
/**
 * Animations that are currently running.
 */
const animations = new WeakMap();
/**
 * A map of existing intersection observers used to track element movements.
 */
const intersections = new WeakMap();
/**
 * Intervals for automatically checking the position of elements occasionally.
 */
const intervals = new WeakMap();
/**
 * The configuration options for each group of elements.
 */
const options = new WeakMap();
/**
 * Debounce counters by id, used to debounce calls to update positions.
 */
const debounces = new WeakMap();
/**
 * All parents that are currently enabled are tracked here.
 */
const enabled = new WeakSet();
/**
 * The document used to calculate transitions.
 */
let root;
/**
 * The root’s XY scroll positions.
 */
let scrollX = 0;
let scrollY = 0;
/**
 * Used to sign an element as the target.
 */
const TGT = "__aa_tgt";
/**
 * Used to sign an element as being part of a removal.
 */
const DEL = "__aa_del";
/**
 * Used to sign an element as being "new". When an element is removed from the
 * dom, but may cycle back in we can sign it with new to ensure the next time
 * it is recognized we consider it new.
 */
const NEW = "__aa_new";
/**
 * Callback for handling all mutations.
 * @param mutations - A mutation list
 */
const handleMutations = (mutations) => {
    const elements = getElements(mutations);
    // If elements is "false" that means this mutation that should be ignored.
    if (elements) {
        elements.forEach((el) => animate(el));
    }
};
/**
 *
 * @param entries - Elements that have been resized.
 */
const handleResizes = (entries) => {
    entries.forEach((entry) => {
        if (entry.target === root)
            updateAllPos();
        if (coords.has(entry.target))
            updatePos(entry.target);
    });
};
/**
 * Observe this elements position.
 * @param el - The element to observe the position of.
 */
function observePosition(el) {
    const oldObserver = intersections.get(el);
    oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.disconnect();
    let rect = coords.get(el);
    let invocations = 0;
    const buffer = 5;
    if (!rect) {
        rect = getCoords(el);
        coords.set(el, rect);
    }
    const { offsetWidth, offsetHeight } = root;
    const rootMargins = [
        rect.top - buffer,
        offsetWidth - (rect.left + buffer + rect.width),
        offsetHeight - (rect.top + buffer + rect.height),
        rect.left - buffer,
    ];
    const rootMargin = rootMargins
        .map((px) => `${-1 * Math.floor(px)}px`)
        .join(" ");
    const observer = new IntersectionObserver(() => {
        ++invocations > 1 && updatePos(el);
    }, {
        root,
        threshold: 1,
        rootMargin,
    });
    observer.observe(el);
    intersections.set(el, observer);
}
/**
 * Update the exact position of a given element.
 * @param el - An element to update the position of.
 */
function updatePos(el) {
    clearTimeout(debounces.get(el));
    const optionsOrPlugin = getOptions(el);
    const delay = isPlugin(optionsOrPlugin) ? 500 : optionsOrPlugin.duration;
    debounces.set(el, setTimeout(async () => {
        const currentAnimation = animations.get(el);
        try {
            await (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished);
            coords.set(el, getCoords(el));
            observePosition(el);
        }
        catch {
            // ignore errors as the `.finished` promise is rejected when animations were cancelled
        }
    }, delay));
}
/**
 * Updates all positions that are currently being tracked.
 */
function updateAllPos() {
    clearTimeout(debounces.get(root));
    debounces.set(root, setTimeout(() => {
        parents.forEach((parent) => forEach(parent, (el) => lowPriority(() => updatePos(el))));
    }, 100));
}
/**
 * Its possible for a quick scroll or other fast events to get past the
 * intersection observer, so occasionally we need want "cold-poll" for the
 * latests and greatest position. We try to do this in the most non-disruptive
 * fashion possible. First we only do this ever couple seconds, staggard by a
 * random offset.
 * @param el - Element
 */
function poll(el) {
    setTimeout(() => {
        intervals.set(el, setInterval(() => lowPriority(updatePos.bind(null, el)), 2000));
    }, Math.round(2000 * Math.random()));
}
/**
 * Perform some operation that is non critical at some point.
 * @param callback
 */
function lowPriority(callback) {
    if (typeof requestIdleCallback === "function") {
        requestIdleCallback(() => callback());
    }
    else {
        requestAnimationFrame(() => callback());
    }
}
/**
 * The mutation observer responsible for watching each root element.
 */
let mutations;
/**
 * A resize observer, responsible for recalculating elements on resize.
 */
let resize;
/**
 * If this is in a browser, initialize our Web APIs
 */
if (typeof window !== "undefined") {
    root = document.documentElement;
    mutations = new MutationObserver(handleMutations);
    resize = new ResizeObserver(handleResizes);
    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        scrollX = window.scrollX;
    });
    resize.observe(root);
}
/**
 * Retrieves all the elements that may have been affected by the last mutation
 * including ones that have been removed and are no longer in the DOM.
 * @param mutations - A mutation list.
 * @returns
 */
function getElements(mutations) {
    const observedNodes = mutations.reduce((nodes, mutation) => {
        return [
            ...nodes,
            ...Array.from(mutation.addedNodes),
            ...Array.from(mutation.removedNodes),
        ];
    }, []);
    // Short circuit if _only_ comment nodes are observed
    const onlyCommentNodesObserved = observedNodes.every((node) => node.nodeName === "#comment");
    if (onlyCommentNodesObserved)
        return false;
    return mutations.reduce((elements, mutation) => {
        // Short circuit if we find a purposefully deleted node.
        if (elements === false)
            return false;
        if (mutation.target instanceof Element) {
            target(mutation.target);
            if (!elements.has(mutation.target)) {
                elements.add(mutation.target);
                for (let i = 0; i < mutation.target.children.length; i++) {
                    const child = mutation.target.children.item(i);
                    if (!child)
                        continue;
                    if (DEL in child) {
                        return false;
                    }
                    target(mutation.target, child);
                    elements.add(child);
                }
            }
            if (mutation.removedNodes.length) {
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const child = mutation.removedNodes[i];
                    if (DEL in child) {
                        return false;
                    }
                    if (child instanceof Element) {
                        elements.add(child);
                        target(mutation.target, child);
                        siblings.set(child, [
                            mutation.previousSibling,
                            mutation.nextSibling,
                        ]);
                    }
                }
            }
        }
        return elements;
    }, new Set());
}
/**
 * Assign the target to an element.
 * @param el - The root element
 * @param child
 */
function target(el, child) {
    if (!child && !(TGT in el))
        Object.defineProperty(el, TGT, { value: el });
    else if (child && !(TGT in child))
        Object.defineProperty(child, TGT, { value: el });
}
/**
 * Determines what kind of change took place on the given element and then
 * performs the proper animation based on that.
 * @param el - The specific element to animate.
 */
function animate(el) {
    var _a;
    const isMounted = el.isConnected;
    const preExisting = coords.has(el);
    if (isMounted && siblings.has(el))
        siblings.delete(el);
    if (animations.has(el)) {
        (_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.cancel();
    }
    if (NEW in el) {
        add(el);
    }
    else if (preExisting && isMounted) {
        remain(el);
    }
    else if (preExisting && !isMounted) {
        remove(el);
    }
    else {
        add(el);
    }
}
/**
 * Removes all non-digits from a string and casts to a number.
 * @param str - A string containing a pixel value.
 * @returns
 */
function raw(str) {
    return Number(str.replace(/[^0-9.\-]/g, ""));
}
/**
 * Get the scroll offset of elements
 * @param el - Element
 * @returns
 */
function getScrollOffset(el) {
    let p = el.parentElement;
    while (p) {
        if (p.scrollLeft || p.scrollTop) {
            return { x: p.scrollLeft, y: p.scrollTop };
        }
        p = p.parentElement;
    }
    return { x: 0, y: 0 };
}
/**
 * Get the coordinates of elements adjusted for scroll position.
 * @param el - Element
 * @returns
 */
function getCoords(el) {
    const rect = el.getBoundingClientRect();
    const { x, y } = getScrollOffset(el);
    return {
        top: rect.top + y,
        left: rect.left + x,
        width: rect.width,
        height: rect.height,
    };
}
/**
 * Returns the width/height that the element should be transitioned between.
 * This takes into account box-sizing.
 * @param el - Element being animated
 * @param oldCoords - Old set of Coordinates coordinates
 * @param newCoords - New set of Coordinates coordinates
 * @returns
 */
function getTransitionSizes(el, oldCoords, newCoords) {
    let widthFrom = oldCoords.width;
    let heightFrom = oldCoords.height;
    let widthTo = newCoords.width;
    let heightTo = newCoords.height;
    const styles = getComputedStyle(el);
    const sizing = styles.getPropertyValue("box-sizing");
    if (sizing === "content-box") {
        const paddingY = raw(styles.paddingTop) +
            raw(styles.paddingBottom) +
            raw(styles.borderTopWidth) +
            raw(styles.borderBottomWidth);
        const paddingX = raw(styles.paddingLeft) +
            raw(styles.paddingRight) +
            raw(styles.borderRightWidth) +
            raw(styles.borderLeftWidth);
        widthFrom -= paddingX;
        widthTo -= paddingX;
        heightFrom -= paddingY;
        heightTo -= paddingY;
    }
    return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round);
}
/**
 * Retrieves animation options for the current element.
 * @param el - Element to retrieve options for.
 * @returns
 */
function getOptions(el) {
    return TGT in el && options.has(el[TGT])
        ? options.get(el[TGT])
        : { duration: 250, easing: "ease-in-out" };
}
/**
 * Returns the target of a given animation (generally the parent).
 * @param el - An element to check for a target
 * @returns
 */
function getTarget(el) {
    if (TGT in el)
        return el[TGT];
    return undefined;
}
/**
 * Checks if animations are enabled or disabled for a given element.
 * @param el - Any element
 * @returns
 */
function isEnabled(el) {
    const target = getTarget(el);
    return target ? enabled.has(target) : false;
}
/**
 * Iterate over the children of a given parent.
 * @param parent - A parent element
 * @param callback - A callback
 */
function forEach(parent, ...callbacks) {
    callbacks.forEach((callback) => callback(parent, options.has(parent)));
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children.item(i);
        if (child) {
            callbacks.forEach((callback) => callback(child, options.has(child)));
        }
    }
}
/**
 * Always return tuple to provide consistent interface
 */
function getPluginTuple(pluginReturn) {
    if (Array.isArray(pluginReturn))
        return pluginReturn;
    return [pluginReturn];
}
/**
 * Determine if config is plugin
 */
function isPlugin(config) {
    return typeof config === "function";
}
/**
 * The element in question is remaining in the DOM.
 * @param el - Element to flip
 * @returns
 */
function remain(el) {
    const oldCoords = coords.get(el);
    const newCoords = getCoords(el);
    if (!isEnabled(el))
        return coords.set(el, newCoords);
    let animation;
    if (!oldCoords)
        return;
    const pluginOrOptions = getOptions(el);
    if (typeof pluginOrOptions !== "function") {
        const deltaX = oldCoords.left - newCoords.left;
        const deltaY = oldCoords.top - newCoords.top;
        const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
        const start = {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
        };
        const end = {
            transform: `translate(0, 0)`,
        };
        if (widthFrom !== widthTo) {
            start.width = `${widthFrom}px`;
            end.width = `${widthTo}px`;
        }
        if (heightFrom !== heightTo) {
            start.height = `${heightFrom}px`;
            end.height = `${heightTo}px`;
        }
        animation = el.animate([start, end], {
            duration: pluginOrOptions.duration,
            easing: pluginOrOptions.easing,
        });
    }
    else {
        const [keyframes] = getPluginTuple(pluginOrOptions(el, "remain", oldCoords, newCoords));
        animation = new Animation(keyframes);
        animation.play();
    }
    animations.set(el, animation);
    coords.set(el, newCoords);
    animation.addEventListener("finish", updatePos.bind(null, el));
}
/**
 * Adds the element with a transition.
 * @param el - Animates the element being added.
 */
function add(el) {
    if (NEW in el)
        delete el[NEW];
    const newCoords = getCoords(el);
    coords.set(el, newCoords);
    const pluginOrOptions = getOptions(el);
    if (!isEnabled(el))
        return;
    let animation;
    if (typeof pluginOrOptions !== "function") {
        animation = el.animate([
            { transform: "scale(.98)", opacity: 0 },
            { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
            { transform: "scale(1)", opacity: 1 },
        ], {
            duration: pluginOrOptions.duration * 1.5,
            easing: "ease-in",
        });
    }
    else {
        const [keyframes] = getPluginTuple(pluginOrOptions(el, "add", newCoords));
        animation = new Animation(keyframes);
        animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", updatePos.bind(null, el));
}
/**
 * Clean up after removing an element from the dom.
 * @param el - Element being removed
 * @param styles - Optional styles that should be removed from the element.
 */
function cleanUp(el, styles) {
    var _a;
    el.remove();
    coords.delete(el);
    siblings.delete(el);
    animations.delete(el);
    (_a = intersections.get(el)) === null || _a === void 0 ? void 0 : _a.disconnect();
    setTimeout(() => {
        if (DEL in el)
            delete el[DEL];
        Object.defineProperty(el, NEW, { value: true, configurable: true });
        if (styles && el instanceof HTMLElement) {
            for (const style in styles) {
                el.style[style] = "";
            }
        }
    }, 0);
}
/**
 * Animates the removal of an element.
 * @param el - Element to remove
 */
function remove(el) {
    var _a;
    if (!siblings.has(el) || !coords.has(el))
        return;
    const [prev, next] = siblings.get(el);
    Object.defineProperty(el, DEL, { value: true, configurable: true });
    const finalX = window.scrollX;
    const finalY = window.scrollY;
    if (next && next.parentNode && next.parentNode instanceof Element) {
        next.parentNode.insertBefore(el, next);
    }
    else if (prev && prev.parentNode) {
        prev.parentNode.appendChild(el);
    }
    else {
        (_a = getTarget(el)) === null || _a === void 0 ? void 0 : _a.appendChild(el);
    }
    if (!isEnabled(el))
        return cleanUp(el);
    const [top, left, width, height] = deletePosition(el);
    const optionsOrPlugin = getOptions(el);
    const oldCoords = coords.get(el);
    if (finalX !== scrollX || finalY !== scrollY) {
        adjustScroll(el, finalX, finalY, optionsOrPlugin);
    }
    let animation;
    let styleReset = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        margin: "0",
        pointerEvents: "none",
        transformOrigin: "center",
        zIndex: "100",
    };
    if (!isPlugin(optionsOrPlugin)) {
        Object.assign(el.style, styleReset);
        animation = el.animate([
            {
                transform: "scale(1)",
                opacity: 1,
            },
            {
                transform: "scale(.98)",
                opacity: 0,
            },
        ], { duration: optionsOrPlugin.duration, easing: "ease-out" });
    }
    else {
        const [keyframes, options] = getPluginTuple(optionsOrPlugin(el, "remove", oldCoords));
        if ((options === null || options === void 0 ? void 0 : options.styleReset) !== false) {
            styleReset = (options === null || options === void 0 ? void 0 : options.styleReset) || styleReset;
            Object.assign(el.style, styleReset);
        }
        animation = new Animation(keyframes);
        animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", cleanUp.bind(null, el, styleReset));
}
/**
 * If the element being removed is at the very bottom of the page, and the
 * the page was scrolled into a space being "made available" by the element
 * that was removed, the page scroll will have jumped up some amount. We need
 * to offset the jump by the amount that the page was "automatically" scrolled
 * up. We can do this by comparing the scroll position before and after the
 * element was removed, and then offsetting by that amount.
 *
 * @param el - The element being deleted
 * @param finalX - The final X scroll position
 * @param finalY - The final Y scroll position
 * @param optionsOrPlugin - The options or plugin
 * @returns
 */
function adjustScroll(el, finalX, finalY, optionsOrPlugin) {
    const scrollDeltaX = scrollX - finalX;
    const scrollDeltaY = scrollY - finalY;
    const scrollBefore = document.documentElement.style.scrollBehavior;
    const scrollBehavior = getComputedStyle(root).scrollBehavior;
    if (scrollBehavior === "smooth") {
        document.documentElement.style.scrollBehavior = "auto";
    }
    window.scrollTo(window.scrollX + scrollDeltaX, window.scrollY + scrollDeltaY);
    if (!el.parentElement)
        return;
    const parent = el.parentElement;
    let lastHeight = parent.clientHeight;
    let lastWidth = parent.clientWidth;
    const startScroll = performance.now();
    // Here we use a manual scroll animation to keep the element using the same
    // easing and timing as the parent’s scroll animation.
    function smoothScroll() {
        requestAnimationFrame(() => {
            if (!isPlugin(optionsOrPlugin)) {
                const deltaY = lastHeight - parent.clientHeight;
                const deltaX = lastWidth - parent.clientWidth;
                if (startScroll + optionsOrPlugin.duration > performance.now()) {
                    window.scrollTo({
                        left: window.scrollX - deltaX,
                        top: window.scrollY - deltaY,
                    });
                    lastHeight = parent.clientHeight;
                    lastWidth = parent.clientWidth;
                    smoothScroll();
                }
                else {
                    document.documentElement.style.scrollBehavior = scrollBefore;
                }
            }
        });
    }
    smoothScroll();
}
/**
 * Determines the position of the element being removed.
 * @param el - The element being deleted
 * @returns
 */
function deletePosition(el) {
    const oldCoords = coords.get(el);
    const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el));
    let offsetParent = el.parentElement;
    while (offsetParent &&
        (getComputedStyle(offsetParent).position === "static" ||
            offsetParent instanceof HTMLBodyElement)) {
        offsetParent = offsetParent.parentElement;
    }
    if (!offsetParent)
        offsetParent = document.body;
    const parentStyles = getComputedStyle(offsetParent);
    const parentCoords = coords.get(offsetParent) || getCoords(offsetParent);
    const top = Math.round(oldCoords.top - parentCoords.top) -
        raw(parentStyles.borderTopWidth);
    const left = Math.round(oldCoords.left - parentCoords.left) -
        raw(parentStyles.borderLeftWidth);
    return [top, left, width, height];
}
/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
function autoAnimate(el, config = {}) {
    if (mutations && resize) {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const isDisabledDueToReduceMotion = mediaQuery.matches &&
            !isPlugin(config) &&
            !config.disrespectUserMotionPreference;
        if (!isDisabledDueToReduceMotion) {
            enabled.add(el);
            if (getComputedStyle(el).position === "static") {
                Object.assign(el.style, { position: "relative" });
            }
            forEach(el, updatePos, poll, (element) => resize === null || resize === void 0 ? void 0 : resize.observe(element));
            if (isPlugin(config)) {
                options.set(el, config);
            }
            else {
                options.set(el, { duration: 250, easing: "ease-in-out", ...config });
            }
            mutations.observe(el, { childList: true });
            parents.add(el);
        }
    }
    return Object.freeze({
        parent: el,
        enable: () => {
            enabled.add(el);
        },
        disable: () => {
            enabled.delete(el);
        },
        isEnabled: () => enabled.has(el),
    });
}
/**
 * The vue directive.
 */
const vAutoAnimate = {
    mounted: (el, binding) => {
        autoAnimate(el, binding.value || {});
    },
    // ignore ssr see #96:
    getSSRProps: () => ({}),
};



;// CONCATENATED MODULE: ./node_modules/.pnpm/@formkit+auto-animate@0.8.0/node_modules/@formkit/auto-animate/react/index.mjs



/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
function useAutoAnimate(options) {
    const [controller, setController] = (0,react_.useState)();
    const element = (0,react_.useCallback)((node) => {
        if (node instanceof HTMLElement) {
            setController(autoAnimate(node, options));
        }
        else {
            setController(undefined);
        }
    }, [options]);
    const setEnabled = (0,react_.useCallback)((enabled) => {
        if (controller) {
            enabled ? controller.enable() : controller.disable();
        }
    }, [controller]);
    return [element, setEnabled];
}




/***/ })

};
;