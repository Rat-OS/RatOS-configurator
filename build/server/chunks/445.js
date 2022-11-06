"use strict";
exports.id = 445;
exports.ids = [445];
exports.modules = {

/***/ 5445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(497);
} else {}


/***/ }),

/***/ 497:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


__webpack_unused_export__ = ({ value: true });

var transformTRPCResponse = __webpack_require__(4690);
var nodeHTTPRequestHandler = __webpack_require__(9601);
__webpack_require__(7310);
__webpack_require__(2818);
__webpack_require__(2903);

/* eslint-disable @typescript-eslint/no-explicit-any */
function createNextApiHandler(opts) {
  return async (req, res) => {
    function getPath() {
      if (typeof req.query.trpc === 'string') {
        return req.query.trpc;
      }

      if (Array.isArray(req.query.trpc)) {
        return req.query.trpc.join('/');
      }

      return null;
    }

    const path = getPath();

    if (path === null) {
      const error = opts.router.getErrorShape({
        error: new transformTRPCResponse.TRPCError({
          message: 'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
          code: 'INTERNAL_SERVER_ERROR'
        }),
        type: 'unknown',
        ctx: undefined,
        path: undefined,
        input: undefined
      });
      const json = {
        id: -1,
        error
      };
      res.statusCode = 500;
      res.json(json);
      return;
    }

    await nodeHTTPRequestHandler.nodeHTTPRequestHandler({ ...opts,
      req,
      res,
      path
    });
  };
}

exports.createNextApiHandler = createNextApiHandler;


/***/ }),

/***/ 2903:
/***/ ((__unused_webpack_module, exports) => {



function invert(obj) {
  const newObj = Object.create(null);

  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }

  return newObj;
}

/**
 * JSON-RPC 2.0 Error codes
 *
 * `-32000` to `-32099` are reserved for implementation-defined server-errors.
 * For tRPC we're copying the last digits of HTTP 4XX errors.
 */

const TRPC_ERROR_CODES_BY_KEY = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR: -32700,

  /**
   * The JSON sent is not a valid Request object.
   */
  BAD_REQUEST: -32600,
  // 400

  /**
   * Internal JSON-RPC error.
   */
  INTERNAL_SERVER_ERROR: -32603,
  // Implementation specific errors
  UNAUTHORIZED: -32001,
  // 401
  FORBIDDEN: -32003,
  // 403
  NOT_FOUND: -32004,
  // 404
  METHOD_NOT_SUPPORTED: -32005,
  // 405
  TIMEOUT: -32008,
  // 408
  CONFLICT: -32009,
  // 409
  PRECONDITION_FAILED: -32012,
  // 412
  PAYLOAD_TOO_LARGE: -32013,
  // 413
  CLIENT_CLOSED_REQUEST: -32099 // 499

};
const TRPC_ERROR_CODES_BY_NUMBER = /*#__PURE__*/invert(TRPC_ERROR_CODES_BY_KEY);

exports.TRPC_ERROR_CODES_BY_KEY = TRPC_ERROR_CODES_BY_KEY;
exports.TRPC_ERROR_CODES_BY_NUMBER = TRPC_ERROR_CODES_BY_NUMBER;
exports.invert = invert;


/***/ }),

/***/ 9601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var url = __webpack_require__(7310);
var resolveHTTPResponse = __webpack_require__(2818);
var transformTRPCResponse = __webpack_require__(4690);

async function getPostBody({
  req,
  maxBodySize
}) {
  return new Promise(resolve => {
    if ('body' in req) {
      resolve({
        ok: true,
        data: req.body
      });
      return;
    }

    let body = '';
    let hasBody = false;
    req.on('data', function (data) {
      body += data;
      hasBody = true;

      if (typeof maxBodySize === 'number' && body.length > maxBodySize) {
        resolve({
          ok: false,
          error: new transformTRPCResponse.TRPCError({
            code: 'PAYLOAD_TOO_LARGE'
          })
        });
        req.socket.destroy();
      }
    });
    req.on('end', () => {
      resolve({
        ok: true,
        data: hasBody ? body : undefined
      });
    });
  });
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
resolveHTTPResponse.assertNotBrowser();
async function nodeHTTPRequestHandler(opts) {
  var _opts$teardown;

  const createContext = async function _createContext() {
    var _opts$createContext;

    return await ((_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, opts));
  };

  const {
    path,
    router
  } = opts;
  const bodyResult = await getPostBody(opts);
  const query = opts.req.query ? new url.URLSearchParams(opts.req.query) : new url.URLSearchParams(opts.req.url.split('?')[1]);
  const req = {
    method: opts.req.method,
    headers: opts.req.headers,
    query,
    body: bodyResult.ok ? bodyResult.data : undefined
  };
  const result = await resolveHTTPResponse.resolveHTTPResponse({
    batching: opts.batching,
    responseMeta: opts.responseMeta,
    path,
    createContext,
    router,
    req,
    error: bodyResult.ok ? null : bodyResult.error,

    onError(o) {
      var _opts$onError;

      opts === null || opts === void 0 ? void 0 : (_opts$onError = opts.onError) === null || _opts$onError === void 0 ? void 0 : _opts$onError.call(opts, { ...o,
        req: opts.req
      });
    }

  });
  const {
    res
  } = opts;

  if ('status' in result && (!res.statusCode || res.statusCode === 200)) {
    res.statusCode = result.status;
  }

  for (const [key, value] of Object.entries((_result$headers = result.headers) !== null && _result$headers !== void 0 ? _result$headers : {})) {
    var _result$headers;

    if (typeof value === 'undefined') {
      continue;
    }

    res.setHeader(key, value);
  }

  res.end(result.body);
  await ((_opts$teardown = opts.teardown) === null || _opts$teardown === void 0 ? void 0 : _opts$teardown.call(opts));
}

exports.nodeHTTPRequestHandler = nodeHTTPRequestHandler;


/***/ }),

/***/ 2818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var transformTRPCResponse = __webpack_require__(4690);
var codes = __webpack_require__(2903);

/* istanbul ignore file */
function assertNotBrowser() {
  if (typeof window !== 'undefined' &&         "production" !== 'test' && process.env.JEST_WORKER_ID === undefined) {
    throw new Error('Imported server-only code in the browser');
  }
}

const TRPC_ERROR_CODES_BY_NUMBER = /*#__PURE__*/codes.invert(codes.TRPC_ERROR_CODES_BY_KEY);
const JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  TIMEOUT: 408,
  CONFLICT: 409,
  CLIENT_CLOSED_REQUEST: 499,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  METHOD_NOT_SUPPORTED: 405
};

function getStatusCodeFromKey(code) {
  var _JSONRPC2_TO_HTTP_COD;

  return (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[code]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
}

function getHTTPStatusCode(json) {
  const arr = Array.isArray(json) ? json : [json];
  const httpStatuses = new Set(arr.map(res => {
    if ('error' in res) {
      const data = res.error.data;

      if (typeof data.httpStatus === 'number') {
        return data.httpStatus;
      }

      const code = TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
      return getStatusCodeFromKey(code);
    }

    return 200;
  }));

  if (httpStatuses.size !== 1) {
    return 207;
  }

  const httpStatus = httpStatuses.values().next().value;
  return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
  const {
    code
  } = error;
  return getStatusCodeFromKey(code);
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const HTTP_METHOD_PROCEDURE_TYPE_MAP = {
  GET: 'query',
  POST: 'mutation',
  PATCH: 'subscription'
};

function getRawProcedureInputOrThrow(req) {
  try {
    if (req.method === 'GET') {
      if (!req.query.has('input')) {
        return undefined;
      }

      const raw = req.query.get('input');
      return JSON.parse(raw);
    }

    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (cause) {
    throw new transformTRPCResponse.TRPCError({
      code: 'PARSE_ERROR',
      cause
    });
  }
}

async function resolveHTTPResponse(opts) {
  var _opts$batching$enable, _opts$batching, _HTTP_METHOD_PROCEDUR;

  const {
    createContext,
    onError,
    router,
    req
  } = opts;
  const batchingEnabled = (_opts$batching$enable = (_opts$batching = opts.batching) === null || _opts$batching === void 0 ? void 0 : _opts$batching.enabled) !== null && _opts$batching$enable !== void 0 ? _opts$batching$enable : true;

  if (req.method === 'HEAD') {
    // can be used for lambda warmup
    return {
      status: 204
    };
  }

  const type = (_HTTP_METHOD_PROCEDUR = HTTP_METHOD_PROCEDURE_TYPE_MAP[req.method]) !== null && _HTTP_METHOD_PROCEDUR !== void 0 ? _HTTP_METHOD_PROCEDUR : 'unknown';
  let ctx = undefined;
  let paths = undefined;
  const isBatchCall = !!req.query.get('batch');

  function endResponse(untransformedJSON, errors) {
    var _opts$responseMeta, _opts$responseMeta2;

    let status = getHTTPStatusCode(untransformedJSON);
    const headers = {
      'Content-Type': 'application/json'
    };
    const meta = (_opts$responseMeta = (_opts$responseMeta2 = opts.responseMeta) === null || _opts$responseMeta2 === void 0 ? void 0 : _opts$responseMeta2.call(opts, {
      ctx,
      paths,
      type,
      data: Array.isArray(untransformedJSON) ? untransformedJSON : [untransformedJSON],
      errors
    })) !== null && _opts$responseMeta !== void 0 ? _opts$responseMeta : {};

    for (const [key, value] of Object.entries((_meta$headers = meta.headers) !== null && _meta$headers !== void 0 ? _meta$headers : {})) {
      var _meta$headers;

      headers[key] = value;
    }

    if (meta.status) {
      status = meta.status;
    }

    const transformedJSON = transformTRPCResponse.transformTRPCResponse(router, untransformedJSON);
    const body = JSON.stringify(transformedJSON);
    return {
      body,
      status,
      headers
    };
  }

  try {
    if (opts.error) {
      throw opts.error;
    }

    if (isBatchCall && !batchingEnabled) {
      throw new Error(`Batching is not enabled on the server`);
    }

    if (type === 'unknown' || type === 'subscription') {
      throw new transformTRPCResponse.TRPCError({
        message: `Unexpected request method ${req.method}`,
        code: 'METHOD_NOT_SUPPORTED'
      });
    }

    const rawInput = getRawProcedureInputOrThrow(req);
    paths = isBatchCall ? opts.path.split(',') : [opts.path];
    ctx = await createContext();

    const deserializeInputValue = rawValue => {
      return typeof rawValue !== 'undefined' ? router._def.transformer.input.deserialize(rawValue) : rawValue;
    };

    const getInputs = () => {
      if (!isBatchCall) {
        return {
          0: deserializeInputValue(rawInput)
        };
      }

      if (rawInput == null || typeof rawInput !== 'object' || Array.isArray(rawInput)) {
        throw new transformTRPCResponse.TRPCError({
          code: 'BAD_REQUEST',
          message: '"input" needs to be an object when doing a batch call'
        });
      }

      const input = {};

      for (const key in rawInput) {
        const k = key;
        const rawValue = rawInput[k];
        const value = deserializeInputValue(rawValue);
        input[k] = value;
      }

      return input;
    };

    const inputs = getInputs();
    const rawResults = await Promise.all(paths.map(async (path, index) => {
      const input = inputs[index];

      try {
        const output = await transformTRPCResponse.callProcedure({
          ctx,
          router,
          path,
          input,
          type
        });
        return {
          input,
          path,
          data: output
        };
      } catch (cause) {
        const error = transformTRPCResponse.getErrorFromUnknown(cause);
        onError === null || onError === void 0 ? void 0 : onError({
          error,
          path,
          input,
          ctx,
          type: type,
          req
        });
        return {
          input,
          path,
          error
        };
      }
    }));
    const errors = rawResults.flatMap(obj => obj.error ? [obj.error] : []);
    const resultEnvelopes = rawResults.map(obj => {
      const {
        path,
        input
      } = obj;

      if (obj.error) {
        const json = {
          id: null,
          error: router.getErrorShape({
            error: obj.error,
            type,
            path,
            input,
            ctx
          })
        };
        return json;
      } else {
        const json = {
          id: null,
          result: {
            type: 'data',
            data: obj.data
          }
        };
        return json;
      }
    });
    const result = isBatchCall ? resultEnvelopes : resultEnvelopes[0];
    return endResponse(result, errors);
  } catch (cause) {
    // we get here if
    // - batching is called when it's not enabled
    // - `createContext()` throws
    // - post body is too large
    // - input deserialization fails
    const error = transformTRPCResponse.getErrorFromUnknown(cause);
    const json = {
      id: null,
      error: router.getErrorShape({
        error,
        type,
        path: undefined,
        input: undefined,
        ctx
      })
    };
    onError === null || onError === void 0 ? void 0 : onError({
      error,
      path: undefined,
      input: undefined,
      ctx,
      type: type,
      req
    });
    return endResponse(json, [error]);
  }
}

exports.assertNotBrowser = assertNotBrowser;
exports.getHTTPStatusCodeFromError = getHTTPStatusCodeFromError;
exports.resolveHTTPResponse = resolveHTTPResponse;


/***/ }),

/***/ 4690:
/***/ ((__unused_webpack_module, exports) => {



function getMessageFromUnkownError(err, fallback) {
  if (typeof err === 'string') {
    return err;
  }

  if (err instanceof Error && typeof err.message === 'string') {
    return err.message;
  }

  return fallback;
}
function getErrorFromUnknown(cause) {
  // this should ideally be an `instanceof TRPCError` but for some reason that isn't working
  // ref https://github.com/trpc/trpc/issues/331
  if (cause instanceof Error && cause.name === 'TRPCError') {
    return cause;
  }

  const err = new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    cause
  }); // take stack trace from cause

  if (cause instanceof Error) {
    err.stack = cause.stack;
  }

  return err;
}

class TRPCError extends Error {
  /**
   * @deprecated use `cause`
   */
  constructor(opts) {
    var _opts$cause, _opts$message;

    const cause = (_opts$cause = opts.cause) !== null && _opts$cause !== void 0 ? _opts$cause : opts.originalError;
    const code = opts.code;
    const message = (_opts$message = opts.message) !== null && _opts$message !== void 0 ? _opts$message : getMessageFromUnkownError(cause, code); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause

    super(message, {
      cause
    });
    this.originalError = void 0;
    this.cause = void 0;
    this.code = void 0;
    this.code = code;
    this.cause = this.originalError = cause;
    this.name = 'TRPCError';
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

async function callProcedure(opts) {
  const {
    type,
    path,
    input
  } = opts;
  const caller = opts.router.createCaller(opts.ctx);

  if (type === 'query') {
    return caller.query(path, input);
  }

  if (type === 'mutation') {
    return caller.mutation(path, input);
  }

  if (type === 'subscription') {
    const sub = await caller.subscription(path, input);
    return sub;
  }
  /* istanbul ignore next */


  throw new Error(`Unknown procedure type ${type}`);
}

function transformTRPCResponseItem(router, item) {
  if ('error' in item) {
    return { ...item,
      error: router._def.transformer.output.serialize(item.error)
    };
  }

  if (item.result.type !== 'data') {
    return item;
  }

  return { ...item,
    result: { ...item.result,
      data: router._def.transformer.output.serialize(item.result.data)
    }
  };
}
/**
 * Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
 **/


function transformTRPCResponse(router, itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map(item => transformTRPCResponseItem(router, item)) : transformTRPCResponseItem(router, itemOrItems);
}

exports.TRPCError = TRPCError;
exports.callProcedure = callProcedure;
exports.getErrorFromUnknown = getErrorFromUnknown;
exports.transformTRPCResponse = transformTRPCResponse;


/***/ })

};
;