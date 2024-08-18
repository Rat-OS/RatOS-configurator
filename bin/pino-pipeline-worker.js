var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// cjs-shim.ts
import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";
var init_cjs_shim = __esm({
  "cjs-shim.ts"() {
    "use strict";
    globalThis.require = createRequire(import.meta.url);
    globalThis.__filename = url.fileURLToPath(import.meta.url);
    globalThis.__dirname = path.dirname(__filename);
  }
});

// ../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js
var require_src = __commonJS({
  "../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js"(exports, module) {
    init_cjs_shim();
    var realImport = new Function("modulePath", "return import(modulePath)");
    function realRequire(modulePath) {
      if (typeof __non_webpack__require__ === "function") {
        return __non_webpack__require__(modulePath);
      }
      return __require(modulePath);
    }
    module.exports = { realImport, realRequire };
  }
});

// ../node_modules/.pnpm/pino@8.17.2/node_modules/pino/lib/transport-stream.js
var require_transport_stream = __commonJS({
  "../node_modules/.pnpm/pino@8.17.2/node_modules/pino/lib/transport-stream.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var { realImport, realRequire } = require_src();
    module.exports = loadTransportStreamBuilder;
    async function loadTransportStreamBuilder(target) {
      let fn;
      try {
        const toLoad = "file://" + target;
        if (toLoad.endsWith(".ts") || toLoad.endsWith(".cts")) {
          if (process[Symbol.for("ts-node.register.instance")]) {
            realRequire("ts-node/register");
          } else if (process.env && process.env.TS_NODE_DEV) {
            realRequire("ts-node-dev");
          }
          fn = realRequire(decodeURIComponent(target));
        } else {
          fn = await realImport(toLoad);
        }
      } catch (error) {
        if (error.code === "ENOTDIR" || error.code === "ERR_MODULE_NOT_FOUND") {
          fn = realRequire(target);
        } else if (error.code === void 0) {
          fn = realRequire(decodeURIComponent(target));
        } else {
          throw error;
        }
      }
      if (typeof fn === "object")
        fn = fn.default;
      if (typeof fn === "object")
        fn = fn.default;
      if (typeof fn !== "function")
        throw Error("exported worker is not a function");
      return fn;
    }
  }
});

// ../node_modules/.pnpm/pino@8.17.2/node_modules/pino/lib/worker-pipeline.js
var require_worker_pipeline = __commonJS({
  "../node_modules/.pnpm/pino@8.17.2/node_modules/pino/lib/worker-pipeline.js"(exports, module) {
    init_cjs_shim();
    var EE = __require("events");
    var loadTransportStreamBuilder = require_transport_stream();
    var { pipeline, PassThrough } = __require("stream");
    module.exports = async function({ targets }) {
      const streams = await Promise.all(targets.map(async (t) => {
        const fn = await loadTransportStreamBuilder(t.target);
        const stream2 = await fn(t.options);
        return stream2;
      }));
      const ee = new EE();
      const stream = new PassThrough({
        autoDestroy: true,
        destroy(_, cb) {
          ee.on("error", cb);
          ee.on("closed", cb);
        }
      });
      pipeline(stream, ...streams, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          ee.emit("error", err);
          return;
        }
        ee.emit("closed");
      });
      return stream;
    };
  }
});
export default require_worker_pipeline();
