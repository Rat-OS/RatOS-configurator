"use strict";
exports.id = 62;
exports.ids = [62];
exports.modules = {

/***/ 3062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ KlippyStatusState)
/* harmony export */ });
/* unused harmony export useKlippyStateHandler */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3040);



const KlippyStatusState = (0,recoil__WEBPACK_IMPORTED_MODULE_1__.atom)({
  key: 'KlippyReadyState',
  default: 'unknown'
});
const useKlippyStateHandler = () => {
  const moonrakerQuery = useRecoilValue(MoonrakerQueryState);
  const moonrakerReadyState = useRecoilValue(MoonrakerReadyState);
  const moonrakerMessage = useRecoilValue(MoonrakerMessageState);
  const setMoonrakerStatus = useSetRecoilState(MoonrakerStatusState);
  const setKlippyReadyState = useSetRecoilState(KlippyStatusState);
  const queryKlippyState = useCallback(async () => {
    if (moonrakerReadyState === 1 && moonrakerQuery != null) {
      try {
        const serverInfo = await moonrakerQuery('server.info');
        if ((serverInfo === null || serverInfo === void 0 ? void 0 : serverInfo.klippy_state) == null) return;
        const klippyState = serverInfo.klippy_state;
        setKlippyReadyState(klippyState);

        if (klippyState === 'startup') {
          // Query for server info in to seconds as instructed by the moonraker docs.
          // Seems unnecessary with globally published events?
          setTimeout(() => {
            queryKlippyState();
          }, 2000);
        }
      } catch (e) {
        setMoonrakerStatus('not-running');
      }
    }
  }, [moonrakerQuery, moonrakerReadyState, setMoonrakerStatus, setKlippyReadyState]);
  useEffect(() => {
    if (moonrakerReadyState === 1 && moonrakerQuery != null) {
      queryKlippyState();
    }
  }, [moonrakerReadyState, moonrakerQuery, queryKlippyState]);
  useEffect(() => {
    if ((moonrakerMessage === null || moonrakerMessage === void 0 ? void 0 : moonrakerMessage.method) === 'notify_klippy_ready') {
      setKlippyReadyState('ready');
    }

    if ((moonrakerMessage === null || moonrakerMessage === void 0 ? void 0 : moonrakerMessage.method) === 'notify_klippy_shutdown') {
      setKlippyReadyState('shutdown');
    }

    if ((moonrakerMessage === null || moonrakerMessage === void 0 ? void 0 : moonrakerMessage.method) === 'notify_klippy_disconnected') {
      setKlippyReadyState('unknown');
      queryKlippyState();
    }
  }, [moonrakerMessage, queryKlippyState, setKlippyReadyState]);
};

/***/ }),

/***/ 3040:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cv": () => (/* binding */ MoonrakerStatusState),
/* harmony export */   "V5": () => (/* binding */ MoonrakerQueryState)
/* harmony export */ });
/* unused harmony exports MoonrakerReadyState, MoonrakerMessageState, useMoonraker */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7636);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_use_websocket__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_2__);



const MoonrakerReadyState = (0,recoil__WEBPACK_IMPORTED_MODULE_2__.atom)({
  key: 'MoonrakerReadyState',
  default: 0
});
const MoonrakerStatusState = (0,recoil__WEBPACK_IMPORTED_MODULE_2__.atom)({
  key: 'MoonrakerStatus',
  default: 'connecting'
});
const MoonrakerQueryState = (0,recoil__WEBPACK_IMPORTED_MODULE_2__.atom)({
  key: 'MoonrakerQuery',
  default: null
});
const MoonrakerMessageState = (0,recoil__WEBPACK_IMPORTED_MODULE_2__.atom)({
  key: 'MoonrakerMessage',
  default: null
});
let REQ_ID = 0;
const inFlightRequests = {};
const inFlightRequestTimeouts = {};
const useMoonraker = hostname => {
  const {
    lastJsonMessage,
    sendJsonMessage,
    readyState
  } = useWebSocket(`ws://${((hostname === null || hostname === void 0 ? void 0 : hostname.trim()) ?? '') != '' ? hostname : window.location.hostname}:7125/websocket`, {
    shouldReconnect: closeEvent => {
      return true;
    },
    reconnectAttempts: Infinity,
    reconnectInterval: 3000
  });
  const setMoonrakerReadyState = useSetRecoilState(MoonrakerReadyState);
  const setMoonrakerStatus = useSetRecoilState(MoonrakerStatusState);
  const setMoonrakerMessage = useSetRecoilState(MoonrakerMessageState);
  const [moonrakerQuery, setMoonrakerQuery] = useRecoilState(MoonrakerQueryState);
  const call = useCallback((method, params, cb) => {
    if (readyState === 1) {
      sendJsonMessage({
        jsonrpc: '2.0',
        method,
        params,
        id: ++REQ_ID
      });
      inFlightRequests[REQ_ID] = cb;
      inFlightRequestTimeouts[REQ_ID] = window.setTimeout(() => {
        inFlightRequests[REQ_ID](new Error('Request timed out'), null);
        delete inFlightRequests[REQ_ID];
        delete inFlightRequestTimeouts[REQ_ID];
      }, 10 * 1000); // 10 second timeout.
    } else {
      throw new Error('Socket connection not ready');
    }
  }, [readyState, sendJsonMessage]);
  useEffect(() => {
    if (readyState === 1) {
      setMoonrakerQuery(() => (method, params = {}) => {
        return new Promise((resolve, reject) => {
          call(method, params, (err, result) => {
            if (err) {
              return reject(err);
            }

            resolve(result);
          });
        });
      });
    } else {
      setMoonrakerQuery(null);
    }
  }, [call, readyState, setMoonrakerQuery]);
  useEffect(() => {
    setMoonrakerReadyState(readyState);

    if (readyState === 1) {
      setMoonrakerStatus('connected');
    } else {
      setMoonrakerStatus('connecting');
    }
  }, [readyState, setMoonrakerStatus, setMoonrakerReadyState]);
  useEffect(() => {
    if (lastJsonMessage !== null && lastJsonMessage !== void 0 && lastJsonMessage.id && inFlightRequests[lastJsonMessage.id]) {
      window.clearTimeout(inFlightRequestTimeouts[lastJsonMessage.id]);
      inFlightRequests[lastJsonMessage.id](null, lastJsonMessage.result);
      delete inFlightRequestTimeouts[lastJsonMessage.id];
      delete inFlightRequests[lastJsonMessage.id];
    } else {
      setMoonrakerMessage(lastJsonMessage);
    }
  }, [lastJsonMessage, setMoonrakerMessage]);
  useEffect(() => {
    return () => {
      for (const reqId in inFlightRequestTimeouts) {
        delete inFlightRequestTimeouts[reqId];
        delete inFlightRequests[reqId];
      }
    };
  }, []);
  return moonrakerQuery;
};

/***/ })

};
;