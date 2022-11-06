exports.id = 972;
exports.ids = [972];
exports.modules = {

/***/ 1820:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(2600);
} else {}


/***/ }),

/***/ 2600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({ value: true });

var _toConsumableArray = __webpack_require__(3592);
var _asyncToGenerator = __webpack_require__(7280);
var _slicedToArray = __webpack_require__(1774);
var _objectSpread = __webpack_require__(4788);
var _regeneratorRuntime = __webpack_require__(2294);
var react = __webpack_require__(1782);
var React = __webpack_require__(6689);
var reactQuery = __webpack_require__(1175);
var ssrPrepass = __webpack_require__(7583);

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefault(_regeneratorRuntime);
var React__default = /*#__PURE__*/_interopDefault(React);
var ssrPrepass__default = /*#__PURE__*/_interopDefault(ssrPrepass);

function transformQueryOrMutationCacheErrors(result) {
  var error = result.state.error;

  if (error instanceof Error && error.name === 'TRPCClientError') {
    var newError = {
      message: error.message,
      data: error.data,
      shape: error.shape
    };
    return _objectSpread(_objectSpread({}, result), {}, {
      state: _objectSpread(_objectSpread({}, result.state), {}, {
        error: newError
      })
    });
  }

  return result;
}

function withTRPC(opts) {
  var getClientConfig = opts.config;
  return function (AppOrPage) {
    var trpc = react.createReactQueryHooks();

    var WithTRPC = function WithTRPC(props) {
      var _props$pageProps;

      var _useState = React.useState(function () {
        if (props.trpc) {
          return props.trpc;
        }

        var config = getClientConfig({});
        var queryClient = new reactQuery.QueryClient(config.queryClientConfig);
        var trpcClient = trpc.createClient(config);
        return {
          queryClient: queryClient,
          trpcClient: trpcClient,
          ssrState: opts.ssr ? 'mounting' : false,
          ssrContext: null
        };
      }),
          _useState2 = _slicedToArray(_useState, 1),
          _useState2$ = _useState2[0],
          queryClient = _useState2$.queryClient,
          trpcClient = _useState2$.trpcClient,
          ssrState = _useState2$.ssrState,
          ssrContext = _useState2$.ssrContext;

      var hydratedState = trpc.useDehydratedState(trpcClient, (_props$pageProps = props.pageProps) === null || _props$pageProps === void 0 ? void 0 : _props$pageProps.trpcState);
      return /*#__PURE__*/React__default['default'].createElement(trpc.Provider, {
        client: trpcClient,
        queryClient: queryClient,
        ssrState: ssrState,
        ssrContext: ssrContext
      }, /*#__PURE__*/React__default['default'].createElement(reactQuery.QueryClientProvider, {
        client: queryClient
      }, /*#__PURE__*/React__default['default'].createElement(reactQuery.Hydrate, {
        state: hydratedState
      }, /*#__PURE__*/React__default['default'].createElement(AppOrPage, props))));
    };

    if (AppOrPage.getInitialProps || opts.ssr) {
      WithTRPC.getInitialProps = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(appOrPageCtx) {
          var _opts$responseMeta;

          var AppTree, isApp, ctx, pageProps, _originalProps$pagePr, originalProps, originalPageProps, getAppTreeProps, config, trpcClient, queryClient, trpcProp, prepassProps, dehydratedCache, dehydratedCacheWithErrors, appTreeProps, meta, _i, _Object$entries, _Object$entries$_i, key, value, _ctx$res;

          return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  AppTree = appOrPageCtx.AppTree; // Determine if we are wrapping an App component or a Page component.

                  isApp = !!appOrPageCtx.Component;
                  ctx = isApp ? appOrPageCtx.ctx : appOrPageCtx; // Run the wrapped component's getInitialProps function.

                  pageProps = {};

                  if (!AppOrPage.getInitialProps) {
                    _context.next = 10;
                    break;
                  }

                  _context.next = 7;
                  return AppOrPage.getInitialProps(appOrPageCtx);

                case 7:
                  originalProps = _context.sent;
                  originalPageProps = isApp ? (_originalProps$pagePr = originalProps.pageProps) !== null && _originalProps$pagePr !== void 0 ? _originalProps$pagePr : {} : originalProps;
                  pageProps = _objectSpread(_objectSpread({}, originalPageProps), pageProps);

                case 10:
                  getAppTreeProps = function getAppTreeProps(props) {
                    return isApp ? {
                      pageProps: props
                    } : props;
                  };

                  if (!(typeof window !== 'undefined' || !opts.ssr)) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt("return", getAppTreeProps(pageProps));

                case 13:
                  config = getClientConfig({
                    ctx: ctx
                  });
                  trpcClient = react.createTRPCClient(config);
                  queryClient = new reactQuery.QueryClient(config.queryClientConfig);
                  trpcProp = {
                    config: config,
                    trpcClient: trpcClient,
                    queryClient: queryClient,
                    ssrState: 'prepass',
                    ssrContext: ctx
                  };
                  prepassProps = {
                    pageProps: pageProps,
                    trpc: trpcProp
                  }; // Run the prepass step on AppTree. This will run all trpc queries on the server.
                  // multiple prepass ensures that we can do batching on the server

                case 18:

                  _context.next = 21;
                  return ssrPrepass__default['default']( /*#__PURE__*/React.createElement(AppTree, prepassProps));

                case 21:
                  if (queryClient.isFetching()) {
                    _context.next = 23;
                    break;
                  }

                  return _context.abrupt("break", 27);

                case 23:
                  _context.next = 25;
                  return new Promise(function (resolve) {
                    var unsub = queryClient.getQueryCache().subscribe(function (event) {
                      if ((event === null || event === void 0 ? void 0 : event.query.getObserversCount()) === 0) {
                        resolve();
                        unsub();
                      }
                    });
                  });

                case 25:
                  _context.next = 18;
                  break;

                case 27:
                  dehydratedCache = reactQuery.dehydrate(queryClient, {
                    shouldDehydrateQuery: function shouldDehydrateQuery() {
                      // makes sure errors are also dehydrated
                      return true;
                    }
                  }); // since error instances can't be serialized, let's make them into `TRPCClientErrorLike`-objects

                  dehydratedCacheWithErrors = _objectSpread(_objectSpread({}, dehydratedCache), {}, {
                    queries: dehydratedCache.queries.map(transformQueryOrMutationCacheErrors),
                    mutations: dehydratedCache.mutations.map(transformQueryOrMutationCacheErrors)
                  }); // dehydrate query client's state and add it to the props

                  pageProps.trpcState = trpcClient.runtime.transformer.serialize(dehydratedCacheWithErrors);
                  appTreeProps = getAppTreeProps(pageProps);
                  meta = ((_opts$responseMeta = opts.responseMeta) === null || _opts$responseMeta === void 0 ? void 0 : _opts$responseMeta.call(opts, {
                    ctx: ctx,
                    clientErrors: [].concat(_toConsumableArray(dehydratedCache.queries), _toConsumableArray(dehydratedCache.mutations)).map(function (v) {
                      return v.state.error;
                    }).flatMap(function (err) {
                      return err instanceof Error && err.name === 'TRPCClientError' ? [err] : [];
                    })
                  })) || {};

                  for (_i = 0, _Object$entries = Object.entries(meta.headers || {}); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];

                    if (typeof value === 'string') {
                      (_ctx$res = ctx.res) === null || _ctx$res === void 0 ? void 0 : _ctx$res.setHeader(key, value);
                    }
                  }

                  if (meta.status && ctx.res) {
                    ctx.res.statusCode = meta.status;
                  }

                  return _context.abrupt("return", appTreeProps);

                case 35:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    }

    var displayName = AppOrPage.displayName || AppOrPage.name || 'Component';
    WithTRPC.displayName = "withTRPC(".concat(displayName, ")");
    return WithTRPC;
  };
}

exports.withTRPC = withTRPC;


/***/ }),

/***/ 8566:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Image;

var _react = _interopRequireWildcard(__webpack_require__(6689));

var _head = _interopRequireDefault(__webpack_require__(4957));

var _imageConfig = __webpack_require__(5843);

var _useIntersection = __webpack_require__(639);

var _imageConfigContext = __webpack_require__(744);

var _utils = __webpack_require__(9232);

var _normalizeTrailingSlash = __webpack_require__(4969);

function Image(_param) {
  var {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    lazyRoot = null,
    lazyBoundary,
    className,
    quality,
    width,
    height,
    style,
    objectFit,
    objectPosition,
    onLoadingComplete,
    placeholder = 'empty',
    blurDataURL
  } = _param,
      all = _objectWithoutPropertiesLoose(_param, ["src", "sizes", "unoptimized", "priority", "loading", "lazyRoot", "lazyBoundary", "className", "quality", "width", "height", "style", "objectFit", "objectPosition", "onLoadingComplete", "placeholder", "blurDataURL"]);

  const configContext = (0, _react).useContext(_imageConfigContext.ImageConfigContext);
  const config = (0, _react).useMemo(() => {
    const c = configEnv || configContext || _imageConfig.imageConfigDefault;
    const allSizes = [...c.deviceSizes, ...c.imageSizes].sort((a, b) => a - b);
    const deviceSizes = c.deviceSizes.sort((a, b) => a - b);
    return _extends({}, c, {
      allSizes,
      deviceSizes
    });
  }, [configContext]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';

  if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread on <img>:

    delete rest.layout;
  }

  let loader = defaultImageLoader;

  if ('loader' in rest) {
    if (rest.loader) {
      const customImageLoader = rest.loader;

      var _tmp;

      _tmp = obj => {
        const {
          config: _
        } = obj,
              opts = _objectWithoutPropertiesLoose(obj, ["config"]); // The config object is internal only so we must
        // not pass it to the user-defined loader()


        return customImageLoader(opts);
      }, loader = _tmp, _tmp;
    } // Remove property so it's not spread on <img>


    delete rest.loader;
  }

  let staticSrc = '';

  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
    }

    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;

    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;

      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;
  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src.startsWith('data:') || src.startsWith('blob:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  if (false) {}

  if (experimentalUnoptimized) {
    unoptimized = true;
  }

  const [blurComplete, setBlurComplete] = (0, _react).useState(false);
  const [setIntersection, isIntersected, resetIntersected] = (0, _useIntersection).useIntersection({
    rootRef: lazyRoot,
    rootMargin: lazyBoundary || '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  const wrapperStyle = {
    boxSizing: 'border-box',
    display: 'block',
    overflow: 'hidden',
    width: 'initial',
    height: 'initial',
    background: 'none',
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0
  };
  const sizerStyle = {
    boxSizing: 'border-box',
    display: 'block',
    width: 'initial',
    height: 'initial',
    background: 'none',
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0
  };
  let hasSizer = false;
  let sizerSvgUrl;
  const layoutStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };
  let widthInt = getInt(width);
  let heightInt = getInt(height);
  const qualityInt = getInt(quality);

  if (false) {}

  const imgStyle = Object.assign({}, style, layoutStyle);
  const blurStyle = placeholder === 'blur' && !blurComplete ? {
    backgroundSize: objectFit || 'cover',
    backgroundPosition: objectPosition || '0% 0%',
    filter: 'blur(20px)',
    backgroundImage: `url("${blurDataURL}")`
  } : {};

  if (layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle.display = 'block';
    wrapperStyle.position = 'absolute';
    wrapperStyle.top = 0;
    wrapperStyle.left = 0;
    wrapperStyle.bottom = 0;
    wrapperStyle.right = 0;
  } else if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle.display = 'block';
      wrapperStyle.position = 'relative';
      hasSizer = true;
      sizerStyle.paddingTop = paddingTop;
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle.display = 'inline-block';
      wrapperStyle.position = 'relative';
      wrapperStyle.maxWidth = '100%';
      hasSizer = true;
      sizerStyle.maxWidth = '100%';
      sizerSvgUrl = `data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${widthInt}%27%20height=%27${heightInt}%27/%3e`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle.display = 'inline-block';
      wrapperStyle.position = 'relative';
      wrapperStyle.width = widthInt;
      wrapperStyle.height = heightInt;
    }
  } else {
    // <Image src="i.png" />
    if (false) {}
  }

  let imgAttributes = {
    src: emptyDataURL,
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      config,
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  let srcString = src;

  if (false) {}

  let imageSrcSetPropName = 'imagesrcset';
  let imageSizesPropName = 'imagesizes';

  if (false) {}

  const linkProps = {
    // Note: imagesrcset and imagesizes are not in the link element type with react 17.
    [imageSrcSetPropName]: imgAttributes.srcSet,
    [imageSizesPropName]: imgAttributes.sizes
  };
  const useLayoutEffect =  true ? _react.default.useEffect : 0;
  const onLoadingCompleteRef = (0, _react).useRef(onLoadingComplete);
  const previousImageSrc = (0, _react).useRef(src);
  (0, _react).useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);
  useLayoutEffect(() => {
    if (previousImageSrc.current !== src) {
      resetIntersected();
      previousImageSrc.current = src;
    }
  }, [resetIntersected, src]);

  const imgElementArgs = _extends({
    isLazy,
    imgAttributes,
    heightInt,
    widthInt,
    qualityInt,
    layout,
    className,
    imgStyle,
    blurStyle,
    loading,
    config,
    unoptimized,
    placeholder,
    loader,
    srcString,
    onLoadingCompleteRef,
    setBlurComplete,
    setIntersection,
    isVisible,
    noscriptSizes: sizes
  }, rest);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    style: wrapperStyle
  }, hasSizer ? /*#__PURE__*/_react.default.createElement("span", {
    style: sizerStyle
  }, sizerSvgUrl ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      display: 'block',
      maxWidth: '100%',
      width: 'initial',
      height: 'initial',
      background: 'none',
      opacity: 1,
      border: 0,
      margin: 0,
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    src: sizerSvgUrl
  }) : null) : null, /*#__PURE__*/_react.default.createElement(ImageElement, Object.assign({}, imgElementArgs))), priority ? // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset

  /*#__PURE__*/
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", Object.assign({
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src
  }, linkProps))) : null);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const {
  experimentalRemotePatterns = [],
  experimentalUnoptimized
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/configure/_next/image","loader":"default"} || {};
const configEnv = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/configure/_next/image","loader":"default"};
const loadedImageURLs = new Set();
const allImgs = new Map();
let perfObserver;
const emptyDataURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

if (true) {
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = (/* unused pure expression or super */ null && (['lazy', 'eager', undefined]));
const loaders = new Map([['default', defaultLoader], ['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['custom', customLoader]]);
const VALID_LAYOUT_VALUES = (/* unused pure expression or super */ null && (['fill', 'fixed', 'intrinsic', 'responsive', undefined]));

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}

function getWidths({
  deviceSizes,
  allSizes
}, width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];

    for (let match; match = viewportWidthRe.exec(sizes); match) {
      percentSizes.push(parseInt(match[2]));
    }

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= deviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: deviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  config,
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(config, width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      config,
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      config,
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  var ref;
  const loaderKey = ((ref = loaderProps.config) == null ? void 0 : ref.loader) || 'default';
  const load = loaders.get(loaderKey);

  if (load) {
    return load(loaderProps);
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${loaderKey}`);
} // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.


function handleLoading(img, src, layout, placeholder, onLoadingCompleteRef, setBlurComplete) {
  if (!img || img.src === emptyDataURL || img['data-loaded-src'] === src) {
    return;
  }

  img['data-loaded-src'] = src;
  const p = 'decode' in img ? img.decode() : Promise.resolve();
  p.catch(() => {}).then(() => {
    if (!img.parentNode) {
      // Exit early in case of race condition:
      // - onload() is called
      // - decode() is called but incomplete
      // - unmount is called
      // - decode() completes
      return;
    }

    loadedImageURLs.add(src);

    if (placeholder === 'blur') {
      setBlurComplete(true);
    }

    if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
      const {
        naturalWidth,
        naturalHeight
      } = img; // Pass back read-only primitive values but not the
      // underlying DOM element because it could be misused.

      onLoadingCompleteRef.current({
        naturalWidth,
        naturalHeight
      });
    }

    if (false) { var ref; }
  });
}

const ImageElement = _param => {
  var {
    imgAttributes,
    heightInt,
    widthInt,
    qualityInt,
    layout,
    className,
    imgStyle,
    blurStyle,
    isLazy,
    placeholder,
    loading,
    srcString,
    config,
    unoptimized,
    loader,
    onLoadingCompleteRef,
    setBlurComplete,
    setIntersection,
    onLoad,
    onError,
    isVisible,
    noscriptSizes
  } = _param,
      rest = _objectWithoutPropertiesLoose(_param, ["imgAttributes", "heightInt", "widthInt", "qualityInt", "layout", "className", "imgStyle", "blurStyle", "isLazy", "placeholder", "loading", "srcString", "config", "unoptimized", "loader", "onLoadingCompleteRef", "setBlurComplete", "setIntersection", "onLoad", "onError", "isVisible", "noscriptSizes"]);

  loading = isLazy ? 'lazy' : loading;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    "data-nimg": layout,
    className: className,
    style: _extends({}, imgStyle, blurStyle),
    ref: (0, _react).useCallback(img => {
      if (false) {}

      setIntersection(img);

      if (img == null ? void 0 : img.complete) {
        handleLoading(img, srcString, layout, placeholder, onLoadingCompleteRef, setBlurComplete);
      }
    }, [setIntersection, srcString, layout, placeholder, onLoadingCompleteRef, setBlurComplete]),
    onLoad: event => {
      const img = event.currentTarget;
      handleLoading(img, srcString, layout, placeholder, onLoadingCompleteRef, setBlurComplete);

      if (onLoad) {
        onLoad(event);
      }
    },
    onError: event => {
      if (placeholder === 'blur') {
        // If the real image fails to load, this will still remove the placeholder.
        setBlurComplete(true);
      }

      if (onError) {
        onError(event);
      }
    }
  })), (isLazy || placeholder === 'blur') && /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    config,
    src: srcString,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes: noscriptSizes,
    loader
  }), {
    decoding: "async",
    "data-nimg": layout,
    style: imgStyle,
    className: className,
    // @ts-ignore - TODO: upgrade to `@types/react@17`
    loading: loading
  }))));
};

function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  config,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
  const url = new URL(`${config.path}${normalizeSrc(src)}`);
  const params = url.searchParams;
  params.set('auto', params.get('auto') || 'format');
  params.set('fit', params.get('fit') || 'max');
  params.set('w', params.get('w') || width.toString());

  if (quality) {
    params.set('q', quality.toString());
  }

  return url.href;
}

function akamaiLoader({
  config,
  src,
  width
}) {
  return `${config.path}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  config,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  const paramsString = params.join(',') + '/';
  return `${config.path}${paramsString}${normalizeSrc(src)}`;
}

function customLoader({
  src
}) {
  throw new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`);
}

function defaultLoader({
  config,
  src,
  width,
  quality
}) {
  if (false) {}

  if (src.endsWith('.svg') && !config.dangerouslyAllowSVG) {
    // Special case to make svg serve as-is to avoid proxying
    // through the built-in Image Optimization API.
    return src;
  }

  return `${(0, _normalizeTrailingSlash).normalizePathTrailingSlash(config.path)}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', {
    value: true
  });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

/***/ }),

/***/ 5675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(8566)


/***/ }),

/***/ 2048:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4365:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8164:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(2048);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7280:
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8008:
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9862:
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7286:
/***/ ((module) => {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9245:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2324:
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(8008);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(224)["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1774:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(4365);

var iterableToArrayLimit = __webpack_require__(7286);

var unsupportedIterableToArray = __webpack_require__(855);

var nonIterableRest = __webpack_require__(9245);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(8164);

var iterableToArray = __webpack_require__(9862);

var unsupportedIterableToArray = __webpack_require__(855);

var nonIterableSpread = __webpack_require__(2324);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 224:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(2048);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(4908)();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

};
;