"use strict";
exports.id = 736;
exports.ids = [736];
exports.modules = {

/***/ 7883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var e = __webpack_require__(8038);

function _interopDefaultLegacy(e) {
  return e && "object" == typeof e && "default" in e ? e : {
    default: e
  };
}

var r = _interopDefaultLegacy(e);

function _extends() {
  _extends = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) {
        if (Object.prototype.hasOwnProperty.call(t, n)) {
          e[n] = t[n];
        }
      }
    }
    return e;
  };
  return _extends.apply(this, arguments);
}

var t = 60103;

var n = 60106;

var u = 60107;

var o = 60108;

var a = 60114;

var i = 60109;

var c = 60110;

var l = 60111;

var f = 60112;

var s = 60113;

var v = 60115;

var p = 60116;

if ("function" == typeof Symbol && Symbol.for) {
  var d = Symbol.for;
  t = d("react.element");
  n = d("react.portal");
  u = d("react.fragment");
  o = d("react.strict_mode");
  a = d("react.profiler");
  i = d("react.provider");
  c = d("react.context");
  l = Symbol.for("react.concurrent_mode");
  f = d("react.forward_ref");
  s = d("react.suspense");
  v = d("react.memo");
  p = d("react.lazy");
}

var m = t;

var h = n;

var y = u;

var _ = o;

var S = a;

var x = i;

var b = c;

var g = l;

var M = f;

var k = s;

var w = v;

var F = p;

var E = e.Children.toArray;

var isAbstractElement = function(e) {
  return null !== e && "object" == typeof e;
};

var getChildrenArray = function(e) {
  return E(e).filter(isAbstractElement);
};

var computeProps = function(e, r) {
  return "object" == typeof r ? _extends({}, r, e) : e;
};

var I = new Map;

var q = {};

var D = void 0;

var C = void 0;

var getCurrentContextMap = function() {
  return _extends({}, q);
};

var getCurrentContextStore = function() {
  return new Map(I);
};

var flushPrevContextMap = function() {
  var e = D;
  D = void 0;
  return e;
};

var flushPrevContextStore = function() {
  var e = C;
  C = void 0;
  return e;
};

var restoreContextMap = function(e) {
  if (void 0 !== e) {
    _extends(q, e);
  }
};

var restoreContextStore = function(e) {
  if (void 0 !== e) {
    I.set(e[0], e[1]);
  }
};

var setCurrentContextMap = function(e) {
  D = void 0;
  q = e;
};

var setCurrentContextStore = function(e) {
  C = void 0;
  I = e;
};

var readContextValue = function(e) {
  var r = I.get(e);
  if (void 0 !== r) {
    return r;
  }
  return e._currentValue;
};

var P = {};

var maskContext = function(e) {
  var r = e.contextType;
  var t = e.contextTypes;
  if (r) {
    return readContextValue(r);
  } else if (!t) {
    return P;
  }
  var n = {};
  for (var u in t) {
    n[u] = q[u];
  }
  return n;
};

var R = null;

var getCurrentErrorFrame = function() {
  return R;
};

var setCurrentErrorFrame = function(e) {
  R = e || null;
};

var z = {
  current: {
    uniqueID: 0
  }
};

var O = "function" == typeof Object.is ? Object.is : function is(e, r) {
  return e === r && (0 !== e || 1 / e == 1 / r) || e != e && r != r;
};

var W = null;

var setCurrentIdentity = function(e) {
  W = e;
};

var getCurrentIdentity = function() {
  if (null === W) {
    throw new Error("[react-ssr-prepass] Hooks can only be called inside the body of a function component. (https://fb.me/react-invalid-hook-call)");
  }
  return W;
};

var j = null;

var H = null;

var T = !1;

var U = null;

var $ = 0;

var setFirstHook = function(e) {
  j = e;
};

function createWorkInProgressHook() {
  if (null === H) {
    if (null === j) {
      return j = H = {
        memoizedState: null,
        queue: null,
        next: null
      };
    } else {
      return H = j;
    }
  } else if (null === H.next) {
    return H = H.next = {
      memoizedState: null,
      queue: null,
      next: null
    };
  } else {
    return H = H.next;
  }
}

function basicStateReducer(e, r) {
  return "function" == typeof r ? r(e) : r;
}

function useReducer(e, r, t) {
  var n = getCurrentIdentity();
  if (null === (H = createWorkInProgressHook()).queue) {
    var u;
    if (e === basicStateReducer) {
      u = "function" == typeof r ? r() : r;
    } else {
      u = void 0 !== t ? t(r) : r;
    }
    H.memoizedState = u;
  }
  var o = H.queue || (H.queue = {
    last: null,
    dispatch: null
  });
  var a = o.dispatch || (o.dispatch = dispatchAction.bind(null, n, o));
  if (null !== U) {
    var i = U.get(o);
    if (void 0 !== i) {
      U.delete(o);
      var c = H.memoizedState;
      var l = i;
      do {
        c = e(c, l.action);
        l = l.next;
      } while (null !== l);
      H.memoizedState = c;
    }
  }
  return [ H.memoizedState, a ];
}

function useMemo(e, r) {
  getCurrentIdentity();
  var t = void 0 === r ? null : r;
  var n = (H = createWorkInProgressHook()).memoizedState;
  if (null !== n && null !== t) {
    if (function areHookInputsEqual(e, r) {
      if (null === r) {
        return !1;
      }
      for (var t = 0; t < r.length && t < e.length; t++) {
        if (!O(e[t], r[t])) {
          return !1;
        }
      }
      return !0;
    }(t, n[1])) {
      return n[0];
    }
  }
  var u = e();
  H.memoizedState = [ u, t ];
  return u;
}

function useOpaqueIdentifier() {
  getCurrentIdentity();
  if (!(H = createWorkInProgressHook()).memoizedState) {
    H.memoizedState = "R:" + (z.current.uniqueID++).toString(36);
  }
  return H.memoizedState;
}

function dispatchAction(e, r, t) {
  if (e === W) {
    T = !0;
    var n = {
      action: t,
      next: null
    };
    if (null === U) {
      U = new Map;
    }
    var u = U.get(r);
    if (void 0 === u) {
      U.set(r, n);
    } else {
      var o = u;
      while (null !== o.next) {
        o = o.next;
      }
      o.next = n;
    }
  }
}

function noop() {}

function _ref$2(e) {
  e();
}

var A = {
  readContext: function readContext(e, r) {
    return readContextValue(e);
  },
  useSyncExternalStore: function useSyncExternalStore(e, r, t) {
    return r();
  },
  useContext: function useContext(e, r) {
    getCurrentIdentity();
    return readContextValue(e);
  },
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: function useRef(e) {
    getCurrentIdentity();
    var r = (H = createWorkInProgressHook()).memoizedState;
    if (null === r) {
      var t = {
        current: e
      };
      H.memoizedState = t;
      return t;
    } else {
      return r;
    }
  },
  useState: function useState(e) {
    return useReducer(basicStateReducer, e);
  },
  useCallback: function useCallback(e, r) {
    return useMemo((function() {
      return e;
    }), r);
  },
  useMutableSource: function useMutableSource(e, r, t) {
    getCurrentIdentity();
    return r(e._source);
  },
  useTransition: function useTransition() {
    return [ _ref$2, !1 ];
  },
  useDeferredValue: function useDeferredValue(e) {
    return e;
  },
  useOpaqueIdentifier: useOpaqueIdentifier,
  useId: useOpaqueIdentifier,
  unstable_useId: useOpaqueIdentifier,
  unstable_useOpaqueIdentifier: useOpaqueIdentifier,
  useLayoutEffect: noop,
  useImperativeHandle: noop,
  useEffect: noop,
  useDebugValue: noop
};

var resolve = function(e) {
  var r = e._payload || e;
  if (0 === r._status) {
    return r._result;
  } else if (1 === r._status) {
    return Promise.resolve(r._result);
  } else if (2 === r._status) {
    return Promise.reject(r._result);
  }
  r._status = 0;
  return r._result = (r._ctor || r._result)().then((function(e) {
    r._result = e;
    if ("function" == typeof e) {
      r._status = 1;
    } else if (null !== e && "object" == typeof e && "function" == typeof e.default) {
      r._result = e.default;
      r._status = 1;
    } else {
      r._status = 2;
    }
  })).catch((function(e) {
    r._status = 2;
    r._result = e;
    return Promise.reject(e);
  }));
};

var render$3 = function(r, t, n) {
  var u = r._payload || r;
  if (1 === u._status) {
    return e.createElement(u._result, t);
  }
  return null;
};

var makeFrame$1 = function(e, r, t) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    id: getCurrentIdentity(),
    hook: j,
    kind: "frame.hooks",
    errorFrame: getCurrentErrorFrame(),
    thenable: t,
    props: r,
    type: e
  };
};

var render$2 = function(e, r, t) {
  try {
    return function renderWithHooks(e, r, t) {
      H = null;
      var n = e(r, t);
      while ($ < 25 && T) {
        T = !1;
        $ += 1;
        H = null;
        n = e(r, t);
      }
      $ = 0;
      U = null;
      H = null;
      return n;
    }(e, computeProps(r, e.defaultProps), maskContext(e));
  } catch (n) {
    if ("function" != typeof n.then) {
      throw n;
    }
    t.push(makeFrame$1(e, r, n));
    return null;
  }
};

function _ref$1() {
  return !1;
}

function _ref2() {
  return null;
}

var createInstance = function(e, r) {
  var t = {
    _thrown: 0,
    queue: n = [],
    isMounted: _ref$1,
    enqueueForceUpdate: _ref2,
    enqueueReplaceState: function(e, r) {
      if (e._isMounted) {
        n.length = 0;
        n.push(r);
      }
    },
    enqueueSetState: function(e, r) {
      if (e._isMounted) {
        n.push(r);
      }
    }
  };
  var n;
  var u = computeProps(r, e.defaultProps);
  var o = maskContext(e);
  var a = new e(u, o, t);
  a.props = u;
  a.context = o;
  a.updater = t;
  a._isMounted = !0;
  if (void 0 === a.state) {
    a.state = null;
  }
  if ("function" == typeof a.componentDidCatch || "function" == typeof e.getDerivedStateFromError) {
    var i = makeFrame(e, a, null);
    i.errorFrame = i;
    setCurrentErrorFrame(i);
  }
  if ("function" == typeof e.getDerivedStateFromProps) {
    var c = (0, e.getDerivedStateFromProps)(a.props, a.state);
    if (null != c) {
      a.state = _extends({}, a.state, c);
    }
  } else if ("function" == typeof a.componentWillMount) {
    a.componentWillMount();
  } else if ("function" == typeof a.UNSAFE_componentWillMount) {
    a.UNSAFE_componentWillMount();
  }
  return a;
};

var makeFrame = function(e, r, t) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    errorFrame: getCurrentErrorFrame(),
    thenable: t,
    kind: "frame.class",
    error: null,
    instance: r,
    type: e
  };
};

var render$1 = function(e, r, t) {
  !function(e) {
    var r = e.updater.queue;
    if (r.length > 0) {
      var t = _extends({}, e.state);
      for (var n = 0, u = r.length; n < u; n++) {
        var o = r[n];
        var a = "function" == typeof o ? o.call(e, t, e.props, e.context) : o;
        if (null !== a) {
          _extends(t, a);
        }
      }
      e.state = t;
      r.length = 0;
    }
  }(r);
  var n = null;
  try {
    n = r.render();
  } catch (n) {
    if ("function" != typeof n.then) {
      throw n;
    }
    t.push(makeFrame(e, r, n));
    return null;
  }
  if (void 0 !== e.childContextTypes && "function" == typeof r.getChildContext) {
    var u = r.getChildContext();
    if (null !== u && "object" == typeof u) {
      !function(e) {
        D = {};
        for (var r in e) {
          D[r] = q[r];
          q[r] = e[r];
        }
      }(u);
    }
  }
  if ("function" != typeof r.getDerivedStateFromProps && ("function" == typeof r.componentWillMount || "function" == typeof r.UNSAFE_componentWillMount) && "function" == typeof r.componentWillUnmount) {
    try {
      r.componentWillUnmount();
    } catch (e) {}
  }
  r._isMounted = !1;
  return n;
};

var L = r.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;

var N = "function" == typeof setImmediate;

var render = function(e, r, t, n, u) {
  return (o = e).prototype && o.prototype.isReactComponent ? function(e, r, t, n, u) {
    setCurrentIdentity(null);
    var o = createInstance(e, r);
    var a = n(u, o);
    if (a) {
      t.push(makeFrame(e, o, a));
      return null;
    }
    return render$1(e, o, t);
  }(e, r, t, n, u) : function(e, r, t, n, u) {
    setFirstHook(null);
    setCurrentIdentity({});
    var o = n(u);
    if (o) {
      t.push(makeFrame$1(e, r, o));
      return null;
    }
    return render$2(e, r, t);
  }(e, r, t, n, u);
  var o;
};

var visitElement = function(r, t, n) {
  switch (function(e) {
    switch (e.$$typeof) {
     case h:
      return h;

     case m:
      switch (e.type) {
       case g:
        return g;

       case y:
        return y;

       case S:
        return S;

       case _:
        return _;

       case k:
        return k;

       default:
        switch (e.type && e.type.$$typeof) {
         case F:
          return F;

         case w:
          return w;

         case b:
          return b;

         case x:
          return x;

         case M:
          return M;

         default:
          return m;
        }
      }

     default:
      return;
    }
  }(r)) {
   case k:
   case _:
   case g:
   case S:
   case y:
    return getChildrenArray(r.props.children);

   case x:
    var u = r.props;
    var o = u.children;
    !function(e, r) {
      C = [ e, I.get(e) ];
      I.set(e, r);
    }(r.type._context, u.value);
    return getChildrenArray(o);

   case b:
    var a = r.props.children;
    if ("function" == typeof a) {
      var i = r.type;
      var c = readContextValue("object" == typeof i._context ? i._context : i);
      return getChildrenArray(a(c));
    } else {
      return [];
    }

   case F:
    var l = function(e, r, t) {
      if ((e._payload || e)._status <= 0) {
        t.push({
          kind: "frame.lazy",
          contextMap: getCurrentContextMap(),
          contextStore: getCurrentContextStore(),
          errorFrame: getCurrentErrorFrame(),
          thenable: resolve(e),
          props: r,
          type: e
        });
        return null;
      }
      return render$3(e, r);
    }(r.type, r.props, t);
    return getChildrenArray(l);

   case w:
    var f = e.createElement(r.type.type, r.props);
    return getChildrenArray(f);

   case M:
    var s = r.type;
    var v = s.render;
    var p = computeProps(r.props, s.defaultProps);
    var d = e.createElement(v, p);
    return getChildrenArray(d);

   case m:
    if ("string" == typeof r.type) {
      return getChildrenArray(r.props.children);
    } else {
      var E = render(r.type, r.props, t, n, r);
      return getChildrenArray(E);
    }

   default:
    return [];
  }
};

var visitLoop = function(e, r, t, n, u, o) {
  var a = L.current;
  var i = Date.now();
  try {
    L.current = A;
    while (e.length > 0) {
      var c = e[e.length - 1].shift();
      if (void 0 !== c) {
        var l = visitElement(c, u, o);
        e.push(l);
        r.push(flushPrevContextMap());
        t.push(flushPrevContextStore());
        n.push(getCurrentErrorFrame());
      } else {
        e.pop();
        restoreContextMap(r.pop());
        restoreContextStore(t.pop());
        setCurrentErrorFrame(n.pop());
      }
      if (N && Date.now() - i > 5) {
        return !0;
      }
    }
    return !1;
  } catch (e) {
    var f = getCurrentErrorFrame();
    if (!f) {
      throw e;
    }
    f.error = e;
    u.unshift(f);
    return !1;
  } finally {
    L.current = a;
  }
};

var makeYieldFrame = function(e, r, t, n) {
  return {
    contextMap: getCurrentContextMap(),
    contextStore: getCurrentContextStore(),
    errorFrame: getCurrentErrorFrame(),
    thenable: null,
    kind: "frame.yield",
    traversalChildren: e,
    traversalMap: r,
    traversalStore: t,
    traversalErrorFrame: n
  };
};

var visit = function(e, r, t) {
  var n = [ e ];
  var u = [ flushPrevContextMap() ];
  var o = [ flushPrevContextStore() ];
  var a = [ getCurrentErrorFrame() ];
  if (visitLoop(n, u, o, a, r, t)) {
    r.unshift(makeYieldFrame(n, u, o, a));
  }
};

var update = function(e, r, t) {
  if ("frame.yield" === e.kind) {
    setCurrentIdentity(null);
    setCurrentContextMap(e.contextMap);
    setCurrentContextStore(e.contextStore);
    setCurrentErrorFrame(e.errorFrame);
    if (visitLoop(e.traversalChildren, e.traversalMap, e.traversalStore, e.traversalErrorFrame, r, t)) {
      r.unshift(makeYieldFrame(e.traversalChildren, e.traversalMap, e.traversalStore, e.traversalErrorFrame));
    }
  } else {
    var n = L.current;
    var u = null;
    L.current = A;
    try {
      if ("frame.class" === e.kind) {
        u = function(e, r) {
          setCurrentIdentity(null);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          if (r.error) {
            if (++r.instance.updater._thrown >= 25) {
              return null;
            }
            r.instance._isMounted = !0;
            if ("function" == typeof r.instance.componentDidCatch) {
              r.instance.componentDidCatch(r.error);
            }
            if ("function" == typeof r.type.getDerivedStateFromError) {
              r.instance.updater.enqueueSetState(r.instance, r.type.getDerivedStateFromError(r.error));
            }
          }
          return render$1(r.type, r.instance, e);
        }(r, e);
      } else if ("frame.hooks" === e.kind) {
        u = function(e, r) {
          setFirstHook(r.hook);
          setCurrentIdentity(r.id);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          return render$2(r.type, r.props, e);
        }(r, e);
      } else if ("frame.lazy" === e.kind) {
        u = function(e, r) {
          setCurrentIdentity(null);
          setCurrentContextMap(r.contextMap);
          setCurrentContextStore(r.contextStore);
          setCurrentErrorFrame(r.errorFrame);
          return render$3(r.type, r.props);
        }(0, e);
      }
    } catch (e) {
      var o = getCurrentErrorFrame();
      if (!o) {
        throw e;
      }
      o.error = e;
      r.unshift(o);
      u = null;
    } finally {
      L.current = n;
    }
    visit(getChildrenArray(u), r, t);
  }
};

function _ref(e, r) {
  setImmediate(e);
}

var flushFrames = function(e, r, t) {
  var n = e.shift();
  if (!n) {
    return Promise.resolve();
  }
  if (N && "frame.yield" === n.kind) {
    n.thenable = new Promise(_ref);
  }
  return Promise.resolve(n.thenable).then((function() {
    !function(e) {
      z.current = e;
    }(t);
    update(n, e, r);
    return flushFrames(e, r, t);
  }), (function(t) {
    if (!n.errorFrame) {
      throw t;
    }
    n.errorFrame.error = t;
    update(n.errorFrame, e, r);
  }));
};

var defaultVisitor = function() {
  return;
};

module.exports = function(e, r) {
  if (!r) {
    r = defaultVisitor;
  }
  var t = [];
  var n = z.current = {
    uniqueID: 0
  };
  setCurrentContextMap({});
  setCurrentContextStore(new Map);
  setCurrentErrorFrame(null);
  try {
    visit(getChildrenArray(e), t, r);
  } catch (e) {
    return Promise.reject(e);
  }
  return flushFrames(t, r, n);
};
//# sourceMappingURL=react-ssr-prepass.js.map


/***/ }),

/***/ 3736:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ createTRPCNext)
/* harmony export */ });
/* unused harmony export withTRPC */
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8910);
/* harmony import */ var _trpc_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7785);
/* harmony import */ var _trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6185);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8038);
/* harmony import */ var react_ssr_prepass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7883);
/* harmony import */ var _trpc_server_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8161);







function transformQueryOrMutationCacheErrors(result) {
    const error = result.state.error;
    if (error instanceof Error && error.name === 'TRPCClientError') {
        const newError = {
            message: error.message,
            data: error.data,
            shape: error.shape
        };
        return {
            ...result,
            state: {
                ...result.state,
                error: newError
            }
        };
    }
    return result;
}
function withTRPC(opts) {
    const { config: getClientConfig  } = opts;
    return (AppOrPage)=>{
        const trpc = (0,_trpc_react_query__WEBPACK_IMPORTED_MODULE_1__.createReactQueryHooks)(opts);
        const WithTRPC = (props)=>{
            const [prepassProps] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(()=>{
                if (props.trpc) {
                    return props.trpc;
                }
                const config = getClientConfig({});
                const queryClient = (0,_trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__.getQueryClient)(config);
                const trpcClient = trpc.createClient(config);
                return {
                    abortOnUnmount: config.abortOnUnmount,
                    queryClient,
                    trpcClient,
                    ssrState: opts.ssr ? 'mounting' : false,
                    ssrContext: null
                };
            });
            const { queryClient , trpcClient , ssrState , ssrContext  } = prepassProps;
            // allow normal components to be wrapped, not just app/pages
            const hydratedState = trpc.useDehydratedState(trpcClient, props.pageProps?.trpcState);
            return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(trpc.Provider, {
                abortOnUnmount: prepassProps.abortOnUnmount ?? false,
                client: trpcClient,
                queryClient: queryClient,
                ssrState: ssrState,
                ssrContext: ssrContext
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClientProvider, {
                client: queryClient
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.Hydrate, {
                state: hydratedState
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.createElement(AppOrPage, Object.assign({}, props)))));
        };
        if (AppOrPage.getInitialProps ?? opts.ssr) {
            WithTRPC.getInitialProps = async (appOrPageCtx)=>{
                const shouldSsr = async ()=>{
                    if (typeof opts.ssr === 'function') {
                        if (typeof window !== 'undefined') {
                            return false;
                        }
                        try {
                            return await opts.ssr({
                                ctx: appOrPageCtx.ctx
                            });
                        } catch (e) {
                            return false;
                        }
                    }
                    return opts.ssr;
                };
                const ssr = await shouldSsr();
                const AppTree = appOrPageCtx.AppTree;
                // Determine if we are wrapping an App component or a Page component.
                const isApp = !!appOrPageCtx.Component;
                const ctx = isApp ? appOrPageCtx.ctx : appOrPageCtx;
                // Run the wrapped component's getInitialProps function.
                let pageProps = {};
                if (AppOrPage.getInitialProps) {
                    const originalProps = await AppOrPage.getInitialProps(appOrPageCtx);
                    const originalPageProps = isApp ? originalProps.pageProps ?? {} : originalProps;
                    pageProps = {
                        ...originalPageProps,
                        ...pageProps
                    };
                }
                const getAppTreeProps = (props)=>isApp ? {
                        pageProps: props
                    } : props;
                if (typeof window !== 'undefined' || !ssr) {
                    return getAppTreeProps(pageProps);
                }
                const config = getClientConfig({
                    ctx
                });
                const trpcClient = (0,_trpc_react_query__WEBPACK_IMPORTED_MODULE_1__.createTRPCClient)(config);
                const queryClient = (0,_trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__.getQueryClient)(config);
                const trpcProp = {
                    config,
                    trpcClient,
                    queryClient,
                    ssrState: 'prepass',
                    ssrContext: ctx
                };
                const prepassProps = {
                    pageProps,
                    trpc: trpcProp
                };
                // Run the prepass step on AppTree. This will run all trpc queries on the server.
                // multiple prepass ensures that we can do batching on the server
                while(true){
                    // render full tree
                    await react_ssr_prepass__WEBPACK_IMPORTED_MODULE_5__(/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(AppTree, prepassProps));
                    if (!queryClient.isFetching()) {
                        break;
                    }
                    // wait until the query cache has settled it's promises
                    await new Promise((resolve)=>{
                        const unsub = queryClient.getQueryCache().subscribe((event)=>{
                            if (event?.query.getObserversCount() === 0) {
                                resolve();
                                unsub();
                            }
                        });
                    });
                }
                const dehydratedCache = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.dehydrate)(queryClient, {
                    shouldDehydrateQuery () {
                        // makes sure errors are also dehydrated
                        return true;
                    }
                });
                // since error instances can't be serialized, let's make them into `TRPCClientErrorLike`-objects
                const dehydratedCacheWithErrors = {
                    ...dehydratedCache,
                    queries: dehydratedCache.queries.map(transformQueryOrMutationCacheErrors),
                    mutations: dehydratedCache.mutations.map(transformQueryOrMutationCacheErrors)
                };
                // dehydrate query client's state and add it to the props
                pageProps.trpcState = trpcClient.runtime.combinedTransformer.output.serialize(dehydratedCacheWithErrors);
                const appTreeProps = getAppTreeProps(pageProps);
                if ('responseMeta' in opts) {
                    const meta = opts.responseMeta?.({
                        ctx,
                        clientErrors: [
                            ...dehydratedCache.queries,
                            ...dehydratedCache.mutations
                        ].map((v)=>v.state.error).flatMap((err)=>err instanceof Error && err.name === 'TRPCClientError' ? [
                                err
                            ] : [])
                    }) ?? {};
                    for (const [key, value] of Object.entries(meta.headers ?? {})){
                        if (typeof value === 'string') {
                            ctx.res?.setHeader(key, value);
                        }
                    }
                    if (meta.status && ctx.res) {
                        ctx.res.statusCode = meta.status;
                    }
                }
                return appTreeProps;
            };
        }
        const displayName = AppOrPage.displayName ?? AppOrPage.name ?? 'Component';
        WithTRPC.displayName = `withTRPC(${displayName})`;
        return WithTRPC;
    };
}

/* istanbul ignore file -- @preserve */ // We're testing this through E2E-testing
function createTRPCNext(opts) {
    const hooks = (0,_trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__.createHooksInternal)(opts);
    // TODO: maybe set TSSRContext to `never` when using `WithTRPCNoSSROptions`
    const _withTRPC = withTRPC(opts);
    return (0,_trpc_server_shared__WEBPACK_IMPORTED_MODULE_4__.createFlatProxy)((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = hooks.useUtils();
                // create a stable reference of the utils context
                return (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>{
                    return (0,_trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__.createReactQueryUtilsProxy)(context);
                }, [
                    context
                ]);
            };
        }
        if (key === 'useQueries') {
            return hooks.useQueries;
        }
        if (key === 'withTRPC') {
            return _withTRPC;
        }
        return (0,_trpc_react_query_shared__WEBPACK_IMPORTED_MODULE_2__.createReactProxyDecoration)(key, hooks);
    });
}




/***/ })

};
;