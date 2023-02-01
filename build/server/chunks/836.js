"use strict";
exports.id = 836;
exports.ids = [836];
exports.modules = {

/***/ 3137:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.normalizePathTrailingSlash = void 0;

var _removeTrailingSlash = __webpack_require__(3297);

var _parsePath = __webpack_require__(8854);

const normalizePathTrailingSlash = path => {
  if (!path.startsWith('/')) {
    return path;
  }

  const {
    pathname,
    query,
    hash
  } = (0, _parsePath).parsePath(path);

  if (false) {}

  return `${(0, _removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
};

exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', {
    value: true
  });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

/***/ }),

/***/ 7151:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useIntersection = useIntersection;

var _react = __webpack_require__(6689);

var _requestIdleCallback = __webpack_require__(8115);

const hasIntersectionObserver = typeof IntersectionObserver === 'function';

function useIntersection({
  rootRef,
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react).useRef();
  const [visible, setVisible] = (0, _react).useState(false);
  const [element, setElement] = (0, _react).useState(null);
  (0, _react).useEffect(() => {
    if (hasIntersectionObserver) {
      if (unobserve.current) {
        unobserve.current();
        unobserve.current = undefined;
      }

      if (isDisabled || visible) return;

      if (element && element.tagName) {
        unobserve.current = observe(element, isVisible => isVisible && setVisible(isVisible), {
          root: rootRef == null ? void 0 : rootRef.current,
          rootMargin
        });
      }

      return () => {
        unobserve.current == null ? void 0 : unobserve.current();
        unobserve.current = undefined;
      };
    } else {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback).requestIdleCallback(() => setVisible(true));
        return () => (0, _requestIdleCallback).cancelIdleCallback(idleCallback);
      }
    }
  }, [element, isDisabled, rootMargin, rootRef, visible]);
  const resetVisible = (0, _react).useCallback(() => {
    setVisible(false);
  }, []);
  return [setElement, visible, resetVisible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
      const index = idList.findIndex(obj => obj.root === id.root && obj.margin === id.margin);

      if (index > -1) {
        idList.splice(index, 1);
      }
    }
  };
}

const observers = new Map();
const idList = [];

function createObserver(options) {
  const id = {
    root: options.root || null,
    margin: options.rootMargin || ''
  };
  const existing = idList.find(obj => obj.root === id.root && obj.margin === id.margin);
  let instance;

  if (existing) {
    instance = observers.get(existing);

    if (instance) {
      return instance;
    }
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
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

if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', {
    value: true
  });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

/***/ })

};
;