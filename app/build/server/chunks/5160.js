"use strict";exports.id=5160,exports.ids=[5160],exports.modules={95160:(e,t,r)=>{var n,o,a,i,s,u,c,l,d,extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(o,a){function fulfilled(e){try{step(n.next(e))}catch(e){a(e)}}function rejected(e){try{step(n.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}function __generator(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function verb(a){return function(s){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=a.return)&&r.call(a)}finally{if(o)throw o.error}}return i}function __spreadArray(e,t,r){if(r||2==arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}var h=function(){function DataStorage(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}return DataStorage.prototype.get=function(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)},DataStorage.prototype.set=function(e,t){this.dataIdsCount++,this.data.set(e,t)},DataStorage.prototype.has=function(e){return this.data.has(e)},DataStorage.prototype.delete=function(e){return this.dataIdsCount--,this.data.delete(e)},DataStorage.prototype.numDataIds=function(){return this.dataIdsCount},DataStorage}(),p=function(){function KernelBackend(){}return KernelBackend.prototype.refCount=function(e){return notYetImplemented("refCount")},KernelBackend.prototype.incRef=function(e){return notYetImplemented("incRef")},KernelBackend.prototype.timerAvailable=function(){return!0},KernelBackend.prototype.time=function(e){return notYetImplemented("time")},KernelBackend.prototype.read=function(e){return notYetImplemented("read")},KernelBackend.prototype.readSync=function(e){return notYetImplemented("readSync")},KernelBackend.prototype.readToGPU=function(e,t){return notYetImplemented("readToGPU")},KernelBackend.prototype.numDataIds=function(){return notYetImplemented("numDataIds")},KernelBackend.prototype.disposeData=function(e,t){return notYetImplemented("disposeData")},KernelBackend.prototype.write=function(e,t,r){return notYetImplemented("write")},KernelBackend.prototype.move=function(e,t,r,n,o){return notYetImplemented("move")},KernelBackend.prototype.createTensorFromGPUData=function(e,t,r){return notYetImplemented("createTensorFromGPUData")},KernelBackend.prototype.memory=function(){return notYetImplemented("memory")},KernelBackend.prototype.floatPrecision=function(){return notYetImplemented("floatPrecision")},KernelBackend.prototype.epsilon=function(){return 32===this.floatPrecision()?1e-7:1e-4},KernelBackend.prototype.dispose=function(){return notYetImplemented("dispose")},KernelBackend}();function notYetImplemented(e){throw Error("'".concat(e,"' not yet implemented or not found in the registry. ")+"This kernel may not be supported by the tfjs backend you have chosen")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function shuffle(e){for(var t=e.length,r=0;t>0;)r=Math.random()*t|0,swap(e,--t,r)}function clamp(e,t,r){return Math.max(e,Math.min(t,r))}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function assertShapesMatch(e,t,r){void 0===r&&(r=""),assert(arraysEqual(e,t),function(){return r+" Shapes ".concat(e," and ").concat(t," must match")})}function assertNonNull(e){assert(null!=e,function(){return"The input to the tensor constructor must be a non-null value."})}function sizeFromShape(e){if(0===e.length)return 1;for(var t=e[0],r=1;r<e.length;r++)t*=e[r];return t}function arraysEqualWithNull(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(null!==e[r]&&null!==t[r]&&e[r]!==t[r])return!1;return!0}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function isInt(e){return e%1==0}function rightPad(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function parseAxisParam(e,t){var r=t.length;return assert((e=null==e?t.map(function(e,t){return t}):[].concat(e)).every(function(e){return e>=-r&&e<r}),function(){return"All values in axis param must be in range [-".concat(r,", ").concat(r,") but ")+"got axis ".concat(e)}),assert(e.every(function(e){return isInt(e)}),function(){return"All values in axis param must be integers but "+"got axis ".concat(e)}),e.map(function(e){return e<0?r+e:e})}function squeezeShape(e,t){for(var r=[],n=[],o=null!=t&&Array.isArray(t)&&0===t.length,a=null==t||o?null:parseAxisParam(t,e).sort(),i=0,s=0;s<e.length;++s){if(null!=a){if(a[i]===s&&1!==e[s])throw Error("Can't squeeze axis ".concat(s," since its dim '").concat(e[s],"' is not 1"));(null==a[i]||a[i]>s)&&1===e[s]&&(r.push(e[s]),n.push(s)),a[i]<=s&&i++}1!==e[s]&&(r.push(e[s]),n.push(s))}return{newShape:r,keptDims:n}}function getArrayFromDType(e,t){var r=null;if(null==e||"float32"===e)r=new Float32Array(t);else if("int32"===e)r=new Int32Array(t);else if("bool"===e)r=new Uint8Array(t);else if("string"===e)r=Array(t);else throw Error("Unknown data type ".concat(e));return r}function checkConversionForErrors(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type ".concat(t," being uploaded contains ").concat(n,"."))}}function isValidDtype(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function bytesPerElement(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error("Unknown dtype ".concat(e))}function bytesFromStringArray(e){if(null==e)return 0;var t=0;return e.forEach(function(e){return t+=e.length}),t}function isString(e){return"string"==typeof e||e instanceof String}function isBoolean(e){return"boolean"==typeof e}function isNumber(e){return"number"==typeof e}function inferDtype(e){if(Array.isArray(e))return inferDtype(e[0]);if(e instanceof Float32Array);else if(e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray)return"int32";else if(isNumber(e));else if(isString(e))return"string";else if(isBoolean(e))return"bool";return"float32"}function isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nearestDivisor(e,t){for(var r=t;r<e;++r)if(e%r==0)return r;return e}function computeStrides(e){var t=e.length;if(t<2)return[];var r=Array(t-1);r[t-2]=e[t-1];for(var n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}function toNestedArray(e,t,r){if(void 0===r&&(r=!1),0===e.length)return t[0];var n=e.reduce(function(e,t){return e*t})*(r?2:1);if(0===n)return[];if(n!==t.length)throw Error("[".concat(e,"] does not match the input size ").concat(t.length).concat(r?" for a complex tensor":"","."));return function createNestedArray(e,t,r,n){void 0===n&&(n=!1);var o=[];if(1===t.length)for(var a=t[0]*(n?2:1),i=0;i<a;i++)o[i]=r[e+i];else for(var a=t[0],s=t.slice(1),u=s.reduce(function(e,t){return e*t})*(n?2:1),i=0;i<a;i++)o[i]=createNestedArray(e+i*u,s,r,n);return o}(0,e,t,r)}function makeOnesTypedArray(e,t){for(var r=makeZerosTypedArray(e,t),n=0;n<r.length;n++)r[n]=1;return r}function makeZerosTypedArray(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error("Unknown data type ".concat(t))}function assertNonNegativeIntegerDimensions(e){e.forEach(function(t){assert(Number.isInteger(t)&&t>=0,function(){return"Tensor must have a shape comprised of positive integers but got "+"shape [".concat(e,"].")})})}function isPromise(e){return e&&e.then&&"function"==typeof e.then}var f="tfjsflags",g=function(){function Environment(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=getQueryParams,this.populateURLFlags()}return Environment.prototype.setPlatform=function(e,t){null==this.platform||env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Platform ".concat(this.platformName," has already been set. ")+"Overwriting the platform with ".concat(e,".")),this.platformName=e,this.platform=t},Environment.prototype.registerFlag=function(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},null!=this.urlFlags[e]){var n=this.urlFlags[e];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Setting feature override from URL ".concat(e,": ").concat(n,".")),this.set(e,n)}},Environment.prototype.getAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:if(e in this.flags)return[2,this.flags[e]];return t=this.flags,r=e,[4,this.evaluateFlag(e)];case 1:return t[r]=n.sent(),[2,this.flags[e]]}})})},Environment.prototype.get=function(e){if(e in this.flags)return this.flags[e];var t=this.evaluateFlag(e);if(isPromise(t))throw Error("Flag ".concat(e," cannot be synchronously evaluated. ")+"Please use getAsync() instead.");return this.flags[e]=t,this.flags[e]},Environment.prototype.getNumber=function(e){return this.get(e)},Environment.prototype.getBool=function(e){return this.get(e)},Environment.prototype.getString=function(e){return this.get(e)},Environment.prototype.getFlags=function(){return this.flags},Object.defineProperty(Environment.prototype,"features",{get:function(){return this.flags},enumerable:!1,configurable:!0}),Environment.prototype.set=function(e,t){if(null==this.flagRegistry[e])throw Error("Cannot set flag ".concat(e," as it has not been registered."));this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)},Environment.prototype.evaluateFlag=function(e){if(null==this.flagRegistry[e])throw Error("Cannot evaluate flag '".concat(e,"': no evaluation function found."));return this.flagRegistry[e].evaluationFn()},Environment.prototype.setFlags=function(e){this.flags=Object.assign({},e)},Environment.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},Environment.prototype.populateURLFlags=function(){var e=this;if(void 0!==this.global&&void 0!==this.global.location&&void 0!==this.global.location.search){var t=this.getQueryParams(this.global.location.search);f in t&&t[f].split(",").forEach(function(t){var r,n=__read(t.split(":"),2),o=n[0],a=n[1];e.urlFlags[o]="true"===(r=a.toLowerCase())||"false"===r?"true"===r:"".concat(+r)===r?+r:a})}},Environment}();function getQueryParams(e){var t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(e){for(var r,n,o=[],a=1;a<arguments.length;a++)o[a-1]=arguments[a];return r=o[0],n=o[1],t[decodeURIComponent(r)]=decodeURIComponent(n||""),o.join("=")}),t}function env(){return t.ENV}function getGlobalNamespace(){if(null==n){var e=void 0;if("undefined"!=typeof window)e=window;else if("undefined"!=typeof global)e=global;else if("undefined"!=typeof process)e=process;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");n=e}return n}function getGlobal(e,t){var r,n=(null==(r=getGlobalNamespace())._tfGlobals&&(r._tfGlobals=new Map),r._tfGlobals);if(n.has(e))return n.get(e);var o=t();return n.set(e,o),n.get(e)}t.ENV=null;var m="Acos",v="Acosh",y="AddN",b="ArgMax",T="ArgMin",w="Asin",_="Asinh",k="Atan",S="Atanh",x="Atan2",E="AvgPool",A="AvgPool3D",M="BatchMatMul",I="BatchToSpaceND",N="Bincount",D="BitwiseAnd",R="BroadcastArgs",B="Cast",F="Ceil",O="ClipByValue",P="Complex",C="ComplexAbs",z="Concat",L="Conv2D",G="Conv2DBackpropFilter",W="Conv2DBackpropInput",U="Conv3D",K="Conv3DBackpropInputV2",q="Cosh",V="Cumprod",H="Cumsum",j="CropAndResize",J="DenseBincount",$="DepthToSpace",Z="DepthwiseConv2dNative",Y="DepthwiseConv2dNativeBackpropFilter",X="DepthwiseConv2dNativeBackpropInput",Q="Diag",ee="Dilation2D",et="Draw",er="RealDiv",en="Einsum",eo="Equal",ea="ExpandDims",ei="Expm1",es="Fill",eu="FlipLeftRight",ec="Floor",el="FloorDiv",ed="FusedBatchNorm",eh="GatherV2",ep="GatherNd",ef="Greater",eg="GreaterEqual",em="Identity",ev="IFFT",ey="Imag",eb="IsFinite",eT="IsInf",ew="IsNan",e_="LeakyRelu",ek="Less",eS="LessEqual",ex="LinSpace",eE="Log1p",eA="LogicalAnd",eM="LogicalNot",eI="LogicalOr",eN="Maximum",eD="MaxPool",eR="MaxPool3D",eB="MaxPoolWithArgmax",eF="Mean",eO="Minimum",eP="MirrorPad",eC="Multinomial",ez="Multiply",eL="NotEqual",eG="NonMaxSuppressionV3",eW="NonMaxSuppressionV4",eU="NonMaxSuppressionV5",eK="OnesLike",eq="OneHot",eV="Pack",eH="PadV2",ej="Prelu",eJ="Prod",e$="RaggedGather",eZ="RaggedRange",eY="RaggedTensorToTensor",eX="Range",eQ="Real",e0="Reciprocal",e1="Relu",e2="Reshape",e3="ResizeNearestNeighbor",e4="ResizeBilinear",e6="Relu6",e5="Reverse",e8="Round",e7="Rsqrt",e9="ScatterNd",te="TensorScatterUpdate",tt="SearchSorted",tr="Select",tn="Selu",to="Slice",ta="Sinh",ti="Sign",ts="Sigmoid",tu="Softplus",tc="Sqrt",tl="SpaceToBatchND",td="SplitV",th="Softmax",tp="SparseFillEmptyRows",tf="SparseReshape",tg="SparseSegmentMean",tm="SparseSegmentSum",tv="SparseToDense",ty="SquaredDifference",tb="StaticRegexReplace",tT="StridedSlice",tw="StringNGrams",t_="StringSplit",tk="StringToHashBucketFast",tS="Tanh",tx="Tile",tE="TopK",tA="Transform",tM="Transpose",tI="Unique",tN="Unpack",tD="UnsortedSegmentSum",tR="ZerosLike",tB="Step",tF="FromPixels",tO="RotateWithOffset",tP="_FusedMatMul",tC="FusedConv2D",tz="FusedDepthwiseConv2D";function warn(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn.apply(console,__spreadArray([],__read(e),!1))}var tL=getGlobal("kernelRegistry",function(){return new Map}),tG=getGlobal("gradRegistry",function(){return new Map});function getKernel(e,t){var r=makeKey(e,t);return tL.get(r)}function getGradient(e){return tG.get(e)}function getKernelsForBackend(e){for(var t=tL.entries(),r=[];;){var n=t.next(),o=n.done,a=n.value;if(o)break;var i=__read(a,2),s=i[0],u=i[1];__read(s.split("_"),1)[0]===e&&r.push(u)}return r}function registerKernel(e){var t=e.kernelName,r=e.backendName,n=makeKey(t,r);tL.has(n)&&warn("The kernel '".concat(t,"' for backend ")+"'".concat(r,"' is already registered")),tL.set(n,e)}function makeKey(e,t){return"".concat(t,"_").concat(e)}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function isTypedArrayBrowser(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var tW="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},tU=null;try{tU=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function Long$1(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function isLong(e){return!0===(e&&e.__isLong__)}Long$1.prototype.__isLong__,Object.defineProperty(Long$1.prototype,"__isLong__",{value:!0}),Long$1.isLong=isLong;var tK={},tq={};function fromInt(e,t){var r,n,o;return t?(e>>>=0,(o=0<=e&&e<256)&&(n=tq[e]))?n:(r=fromBits(e,(0|e)<0?-1:0,!0),o&&(tq[e]=r),r):(e|=0,(o=-128<=e&&e<128)&&(n=tK[e]))?n:(r=fromBits(e,e<0?-1:0,!1),o&&(tK[e]=r),r)}function fromNumber(e,t){if(isNaN(e))return t?tY:tZ;if(t){if(e<0)return tY;if(e>=tj)return t2}else{if(e<=-tJ)return t3;if(e+1>=tJ)return t1}return e<0?fromNumber(-e,t).neg():fromBits(e%tH|0,e/tH|0,t)}function fromBits(e,t,r){return new Long$1(e,t,r)}Long$1.fromInt=fromInt,Long$1.fromNumber=fromNumber,Long$1.fromBits=fromBits;var tV=Math.pow;function fromString(e,t,r){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return tZ;if("number"==typeof t?(r=t,t=!1):t=!!t,(r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return fromString(e.substring(1),t,r).neg();for(var n,o=fromNumber(tV(r,8)),a=tZ,i=0;i<e.length;i+=8){var s=Math.min(8,e.length-i),u=parseInt(e.substring(i,i+s),r);if(s<8){var c=fromNumber(tV(r,s));a=a.mul(c).add(fromNumber(u))}else a=(a=a.mul(o)).add(fromNumber(u))}return a.unsigned=t,a}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}Long$1.fromString=fromString,Long$1.fromValue=fromValue;var tH=4294967296,tj=18446744073709552e3,tJ=0x7fffffffffffffff,t$=fromInt(16777216),tZ=fromInt(0);Long$1.ZERO=tZ;var tY=fromInt(0,!0);Long$1.UZERO=tY;var tX=fromInt(1);Long$1.ONE=tX;var tQ=fromInt(1,!0);Long$1.UONE=tQ;var t0=fromInt(-1);Long$1.NEG_ONE=t0;var t1=fromBits(-1,2147483647,!1);Long$1.MAX_VALUE=t1;var t2=fromBits(-1,-1,!0);Long$1.MAX_UNSIGNED_VALUE=t2;var t3=fromBits(0,-2147483648,!1);Long$1.MIN_VALUE=t3;var t4=Long$1.prototype;t4.toInt=function(){return this.unsigned?this.low>>>0:this.low},t4.toNumber=function(){return this.unsigned?(this.high>>>0)*tH+(this.low>>>0):this.high*tH+(this.low>>>0)},t4.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(!this.eq(t3))return"-"+this.neg().toString(e);var t=fromNumber(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var o=fromNumber(tV(e,6),this.unsigned),a=this,i="";;){var s=a.div(o),u=(a.sub(s.mul(o)).toInt()>>>0).toString(e);if((a=s).isZero())return u+i;for(;u.length<6;)u="0"+u;i=""+u+i}},t4.getHighBits=function(){return this.high},t4.getHighBitsUnsigned=function(){return this.high>>>0},t4.getLowBits=function(){return this.low},t4.getLowBitsUnsigned=function(){return this.low>>>0},t4.getNumBitsAbs=function(){if(this.isNegative())return this.eq(t3)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},t4.isZero=function(){return 0===this.high&&0===this.low},t4.eqz=t4.isZero,t4.isNegative=function(){return!this.unsigned&&this.high<0},t4.isPositive=function(){return this.unsigned||this.high>=0},t4.isOdd=function(){return(1&this.low)==1},t4.isEven=function(){return(1&this.low)==0},t4.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},t4.eq=t4.equals,t4.notEquals=function(e){return!this.eq(e)},t4.neq=t4.notEquals,t4.ne=t4.notEquals,t4.lessThan=function(e){return 0>this.comp(e)},t4.lt=t4.lessThan,t4.lessThanOrEqual=function(e){return 0>=this.comp(e)},t4.lte=t4.lessThanOrEqual,t4.le=t4.lessThanOrEqual,t4.greaterThan=function(e){return this.comp(e)>0},t4.gt=t4.greaterThan,t4.greaterThanOrEqual=function(e){return this.comp(e)>=0},t4.gte=t4.greaterThanOrEqual,t4.ge=t4.greaterThanOrEqual,t4.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},t4.comp=t4.compare,t4.negate=function(){return!this.unsigned&&this.eq(t3)?t3:this.not().add(tX)},t4.neg=t4.negate,t4.add=function(e){isLong(e)||(e=fromValue(e));var t,r,n=this.high>>>16,o=65535&this.high,a=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,h=0;return t=0+((r=0+(i+l))>>>16),r&=65535,t+=a+c,h+=t>>>16,t&=65535,h+=o+u,d+=h>>>16,h&=65535,d+=n+s,fromBits(t<<16|r,(d&=65535)<<16|h,this.unsigned)},t4.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},t4.sub=t4.subtract,t4.multiply=function(e){if(this.isZero())return tZ;if(isLong(e)||(e=fromValue(e)),tU)return fromBits(tU.mul(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned);if(e.isZero())return tZ;if(this.eq(t3))return e.isOdd()?t3:tZ;if(e.eq(t3))return this.isOdd()?t3:tZ;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(t$)&&e.lt(t$))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,o=65535&this.high,a=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,h=0;return t=0+((r=0+i*l)>>>16),r&=65535,t+=a*l,h+=t>>>16,t&=65535,t+=i*c,h+=t>>>16,t&=65535,h+=o*l,d+=h>>>16,h&=65535,h+=a*c,d+=h>>>16,h&=65535,h+=i*u,d+=h>>>16,h&=65535,d+=n*l+o*c+a*u+i*s,fromBits(t<<16|r,(d&=65535)<<16|h,this.unsigned)},t4.mul=t4.multiply,t4.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(tU){var t,r,n;return this.unsigned||-2147483648!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?tU.div_u:tU.div_s)(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?tY:tZ;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return tY;if(e.gt(this.shru(1)))return tQ;n=tY}else{if(this.eq(t3))return e.eq(tX)||e.eq(t0)?t3:e.eq(t3)?tX:(t=this.shr(1).div(e).shl(1)).eq(tZ)?e.isNegative()?tX:t0:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(t3))return this.unsigned?tY:tZ;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=tZ}for(r=this;r.gte(e);){for(var o=Math.ceil(Math.log(t=Math.max(1,Math.floor(r.toNumber()/e.toNumber())))/Math.LN2),a=o<=48?1:tV(2,o-48),i=fromNumber(t),s=i.mul(e);s.isNegative()||s.gt(r);)t-=a,s=(i=fromNumber(t,this.unsigned)).mul(e);i.isZero()&&(i=tX),n=n.add(i),r=r.sub(s)}return n},t4.div=t4.divide,t4.modulo=function(e){return(isLong(e)||(e=fromValue(e)),tU)?fromBits((this.unsigned?tU.rem_u:tU.rem_s)(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},t4.mod=t4.modulo,t4.rem=t4.modulo,t4.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},t4.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},t4.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},t4.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},t4.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},t4.shl=t4.shiftLeft,t4.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},t4.shr=t4.shiftRight,t4.shiftRightUnsigned=function(e){if(isLong(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?fromBits(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?fromBits(t,0,this.unsigned):fromBits(t>>>e-32,0,this.unsigned)},t4.shru=t4.shiftRightUnsigned,t4.shr_u=t4.shiftRightUnsigned,t4.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},t4.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},t4.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},t4.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},t4.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long$1.fromBytes=function(e,t,r){return r?Long$1.fromBytesLE(e,t):Long$1.fromBytesBE(e,t)},Long$1.fromBytesLE=function(e,t){return new Long$1(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long$1.fromBytesBE=function(e,t){return new Long$1(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)};var t6=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(Long$1),t5=/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){return t.forEach(function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach(function(r){if("default"!==r&&!(r in e)){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})}),e}({__proto__:null,default:t6},[Long$1]),t8=t6||t5;function hexToLong(e){return t8.fromString(e,!0,16)}var t7=hexToLong("c3a5c85c97cb3127"),t9=hexToLong("b492b66fbe98f273"),re=hexToLong("9ae16a3b2f90404f");function shiftMix(e){return e.xor(e.shru(47))}function fetch$2(e,t,r){var n=e.slice(t,t+r);return t8.fromBytes(Array.from(n),!0,!0)}function fetch64(e,t){return fetch$2(e,t,8)}function rotate64(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function hashLen16(e,t,r){void 0===r&&(r=hexToLong("9ddfea08eb382d69"));var n=e.xor(t).mul(r);n=n.xor(n.shru(47));var o=t.xor(n).mul(r);return(o=o.xor(o.shru(47))).mul(r)}function weakHashLen32WithSeedsStr(e,t,r,n){var o,a,i,s,u,c,l;return o=fetch64(e,t),a=fetch64(e,t+8),i=fetch64(e,t+16),s=fetch64(e,t+24),u=r,c=n,u=u.add(o),c=rotate64(c.add(u).add(s),21),l=u,u=(u=u.add(a)).add(i),c=c.add(rotate64(u,44)),[u.add(s),c.add(l)]}function toTypedArray(e,t){if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=flatten(e)),env().getBool("DEBUG")&&checkConversionForErrors(e,t),(r=e)instanceof Float32Array&&"float32"===t||r instanceof Int32Array&&"int32"===t||r instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){for(var r,n=new Uint8Array(e.length),o=0;o<n.length;++o)0!==Math.round(e[o])&&(n[o]=1);return n}throw Error("Unknown data type ".concat(t))}function now(){return env().platform.now()}function encodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.encode(e,t)}function decodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.decode(e,t)}function isTypedArray(e){return null!=env().platform.isTypedArray?env().platform.isTypedArray(e):isTypedArrayBrowser(e)}function flatten(e,t,r){var n,o;if(void 0===t&&(t=[]),void 0===r&&(r=!1),null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||isPromise(e)||null==e||isTypedArray(e)&&r)t.push(e);else if(Array.isArray(e)||isTypedArray(e))for(var a=0;a<e.length;++a)flatten(e[a],t,r);else{var i=-1;try{for(var s=__values(Object.keys(e)),u=s.next();!u.done;u=s.next()){var c=u.value;/^([1-9]+[0-9]*|0)$/.test(c)&&(i=Math.max(i,Number(c)))}}catch(e){n={error:e}}finally{try{u&&!u.done&&(o=s.return)&&o.call(s)}finally{if(n)throw n.error}}for(var a=0;a<=i;a++)flatten(e[a],t,r)}return t}var rt=function(){function Profiler(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new rr)}return Profiler.prototype.profileKernel=function(e,t,r){var n,o,a,i,holdResultWrapperFn=function(){a=r()},s=now();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(holdResultWrapperFn);else{holdResultWrapperFn();try{for(var u=__values(a),c=u.next();!c.done;c=u.next())c.value.dataSync()}catch(e){n={error:e}}finally{try{c&&!c.done&&(o=u.return)&&o.call(u)}finally{if(n)throw n.error}}i=Promise.resolve({kernelMs:now()-s})}if(env().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(var l=0;l<a.length;l++)!function(t){var r=a[t];r.data().then(function(t){(function(e,t,r){if("float32"===t)for(var n=0;n<e.length;n++){var o=e[n];if(isNaN(o)||!isFinite(o))return console.warn("Found ".concat(o," in the result of '").concat(r,"'")),!0}})(t,r.dtype,e)})}(l);return{kernelName:e,outputs:a,inputs:t,timeMs:i.then(function(e){return e.kernelMs}),extraInfo:i.then(function(e){return null!=e.getExtraProfileInfo?e.getExtraProfileInfo():""})}},Profiler.prototype.logKernelProfile=function(e){var t=this,r=e.kernelName,n=e.outputs,o=e.timeMs,a=e.inputs,i=e.extraInfo;n.forEach(function(e){Promise.all([e.data(),o,i]).then(function(n){t.logger.logKernelProfile(r,e,n[0],n[1],a,n[2])})})},Profiler}(),rr=function(){function Logger(){}return Logger.prototype.logKernelProfile=function(e,t,r,n,o,a){var i="number"==typeof n?rightPad("".concat(n,"ms"),9):n.error,s=rightPad(e,25),u=t.rank,c=t.size,l=rightPad(t.shape.toString(),14),d="";for(var h in o){var p=o[h];if(null!=p){var f=p.shape||t.shape,g=f.length;d+="".concat(h,": ").concat(g,"D ").concat(g>0?f:""," ")}}console.log("%c".concat(s,"	%c").concat(i,"	%c").concat(u,"D ").concat(l,"	%c").concat(c,"	%c").concat(d,"	%c").concat(a),"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},Logger}();function valToString(e,t,r){return rightPad(Array.isArray(e)?"".concat(parseFloat(e[0].toFixed(7))," + ")+"".concat(parseFloat(e[1].toFixed(7)),"j"):isString(e)?"'".concat(e,"'"):"bool"===r?boolNumToString(e):parseFloat(e.toFixed(7)).toString(),t)}function boolNumToString(e){return 0===e?"false":"true"}function createComplexTuples(e){for(var t=[],r=0;r<e.length;r+=2)t.push([e[r],e[r+1]]);return t}var rn=function(){function TensorBuffer(e,t,r){var n=this;if(this.dtype=t,this.shape=e.slice(),this.size=sizeFromShape(e),null!=r){var o=r.length;assert(o===this.size,function(){return"Length of values '".concat(o,"' does not match the size ")+"inferred by the shape '".concat(n.size,"'.")})}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||getArrayFromDType(t,this.size),this.strides=computeStrides(e)}return TensorBuffer.prototype.set=function(e){for(var t=this,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];0===r.length&&(r=[0]),assert(r.length===this.rank,function(){return"The number of provided coordinates (".concat(r.length,") must ")+"match the rank (".concat(t.rank,")")});var o=this.locToIndex(r);this.values[o]=e},TensorBuffer.prototype.get=function(){for(var e,t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];0===r.length&&(r=[0]);var o=0;try{for(var a=__values(r),i=a.next();!i.done;i=a.next()){var s=i.value;if(s<0||s>=this.shape[o]){var u="Requested out of range element at ".concat(r,". ")+"  Buffer shape=".concat(this.shape);throw Error(u)}o++}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=a.return)&&t.call(a)}finally{if(e)throw e.error}}for(var c=r[r.length-1],l=0;l<r.length-1;++l)c+=this.strides[l]*r[l];return this.values[c]},TensorBuffer.prototype.locToIndex=function(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];for(var t=e[e.length-1],r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t},TensorBuffer.prototype.indexToLoc=function(e){if(0===this.rank)return[];if(1===this.rank)return[e];for(var t=Array(this.shape.length),r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t},Object.defineProperty(TensorBuffer.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),TensorBuffer.prototype.toTensor=function(){return ro().makeTensor(this.values,this.shape,this.dtype)},TensorBuffer}(),ro=null,ra=null,ri=function(){function Tensor(e,t,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=sizeFromShape(e),this.strides=computeStrides(e),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}return Object.defineProperty(Tensor.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),Tensor.prototype.buffer=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,ra.buffer(this.shape,this.dtype,e)]}})})},Tensor.prototype.bufferSync=function(){return ra.buffer(this.shape,this.dtype,this.dataSync())},Tensor.prototype.array=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,toNestedArray(this.shape,e,"complex64"===this.dtype)]}})})},Tensor.prototype.arraySync=function(){return toNestedArray(this.shape,this.dataSync(),"complex64"===this.dtype)},Tensor.prototype.data=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:if(this.throwIfDisposed(),e=ro().read(this.dataId),"string"!==this.dtype)return[3,2];return[4,e];case 1:t=r.sent();try{return[2,t.map(function(e){return decodeString(e)})]}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}r.label=2;case 2:return[2,e]}})})},Tensor.prototype.dataToGPU=function(e){return this.throwIfDisposed(),ro().readToGPU(this.dataId,e)},Tensor.prototype.dataSync=function(){this.throwIfDisposed();var e=ro().readSync(this.dataId);if("string"===this.dtype)try{return e.map(function(e){return decodeString(e)})}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e},Tensor.prototype.bytes=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return this.throwIfDisposed(),[4,ro().read(this.dataId)];case 1:if(e=t.sent(),"string"===this.dtype)return[2,e];return[2,new Uint8Array(e.buffer)]}})})},Tensor.prototype.dispose=function(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),ro().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(Tensor.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!1,configurable:!0}),Tensor.prototype.throwIfDisposed=function(){if(this.isDisposed)throw Error("Tensor is disposed.")},Tensor.prototype.print=function(e){return void 0===e&&(e=!1),ra.print(this,e)},Tensor.prototype.clone=function(){return this.throwIfDisposed(),ra.clone(this)},Tensor.prototype.toString=function(e){var t,r,n,o,a,i,s,u,c;return void 0===e&&(e=!1),t=this.dataSync(),r=this.shape,n=this.dtype,o=e,a=computeStrides(r),i=function(e,t,r,n){var o=sizeFromShape(t),a=n[n.length-1],i=Array(a).fill(0),s=t.length,u="complex64"===r?createComplexTuples(e):e;if(s>1)for(var c=0;c<o/a;c++)for(var l=c*a,d=0;d<a;d++)i[d]=Math.max(i[d],valToString(u[l+d],0,r).length);return i}(t,r,n,a),s=r.length,u=function subTensorToString(e,t,r,n,o,a){void 0===a&&(a=!0);var i="complex64"===r?2:1,s=t[0],u=t.length;if(0===u)return"complex64"===r?[valToString(createComplexTuples(e)[0],0,r)]:"bool"===r?[boolNumToString(e[0])]:[e[0].toString()];if(1===u){if(s>20){var c=3*i,l=Array.from(e.slice(0,c)),d=Array.from(e.slice((s-3)*i,s*i));return"complex64"===r&&(l=createComplexTuples(l),d=createComplexTuples(d)),["["+l.map(function(e,t){return valToString(e,o[t],r)}).join(", ")+", ..., "+d.map(function(e,t){return valToString(e,o[s-3+t],r)}).join(", ")+"]"]}return["["+("complex64"===r?createComplexTuples(e):Array.from(e)).map(function(e,t){return valToString(e,o[t],r)}).join(", ")+"]"]}var h=t.slice(1),p=n.slice(1),f=n[0]*i,g=[];if(s>20){for(var m=0;m<3;m++){var v=m*f,y=v+f;g.push.apply(g,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,o,!1)),!1))}g.push("...");for(var m=s-3;m<s;m++){var v=m*f,y=v+f;g.push.apply(g,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,o,m===s-1)),!1))}}else for(var m=0;m<s;m++){var v=m*f,y=v+f;g.push.apply(g,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,o,m===s-1)),!1))}var b=2===u?",":"";g[0]="["+(s>0?g[0]+b:"");for(var m=1;m<g.length-1;m++)g[m]=" "+g[m]+b;for(var T=",\n",m=2;m<u;m++)T+="\n";return g[g.length-1]=" "+g[g.length-1]+"]"+(a?"":T),g}(t,r,n,a,i),c=["Tensor"],o&&(c.push("  dtype: ".concat(n)),c.push("  rank: ".concat(s)),c.push("  shape: [".concat(r,"]")),c.push("  values:")),c.push(u.map(function(e){return"    "+e}).join("\n")),c.join("\n")},Tensor.prototype.cast=function(e){return this.throwIfDisposed(),ra.cast(this,e)},Tensor.prototype.variable=function(e,t,r){return void 0===e&&(e=!0),this.throwIfDisposed(),ro().makeVariable(this,e,t,r)},Tensor}();function getGlobalTensorClass(){return getGlobal("Tensor",function(){return ri})}Object.defineProperty(ri,Symbol.hasInstance,{value:function(e){return!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}}),getGlobalTensorClass();var rs=function(e){function Variable(t,r,n,o){var a=e.call(this,t.shape,t.dtype,t.dataId,o)||this;return a.trainable=r,a.name=n,a}return __extends(Variable,e),Variable.prototype.assign=function(e){if(e.dtype!==this.dtype)throw Error("dtype of the new value (".concat(e.dtype,") and ")+"previous value (".concat(this.dtype,") must match"));if(!arraysEqual(e.shape,this.shape))throw Error("shape of the new value (".concat(e.shape,") and ")+"previous value (".concat(this.shape,") must match"));ro().disposeTensor(this),this.dataId=e.dataId,ro().incRef(this,null)},Variable.prototype.dispose=function(){ro().disposeVariable(this),this.isDisposedInternal=!0},Variable}(ri);Object.defineProperty(rs,Symbol.hasInstance,{value:function(e){return e instanceof ri&&null!=e.assign&&e.assign instanceof Function}}),/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */t.Rank=void 0,function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"}(t.Rank||(t.Rank={})),function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"}(o||(o={})),function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"}(a||(a={})),function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"}(i||(i={})),function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"}(s||(s={}));var ru={float32:i,int32:o,bool:a,complex64:s};function upcastType(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw Error("Can not upcast ".concat(e," with ").concat(t))}return ru[e][t]}function isWebGLData(e){return null!=e&&"object"==typeof e&&"texture"in e&&e.texture instanceof WebGLTexture}function isWebGPUData(e){return"undefined"!=typeof GPUBuffer&&null!=e&&"object"==typeof e&&"buffer"in e&&e.buffer instanceof GPUBuffer}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function makeTypesMatch(e,t){if(e.dtype===t.dtype)return[e,t];var r=upcastType(e.dtype,t.dtype);return[e.cast(r),t.cast(r)]}function assertTypesMatch(e,t){assert(e.dtype===t.dtype,function(){return"The dtypes of the first(".concat(e.dtype,") and")+" second(".concat(t.dtype,") input must match")})}function getTensorsInContainer(e){var t=[];return function walkTensorContainer(e,t,r){if(null!=e){if(e instanceof ri){t.push(e);return}if(Array.isArray(e)||"object"==typeof e)for(var n in e){var o=e[n];r.has(o)||(r.add(o),walkTensorContainer(o,t,r))}}}(e,t,new Set),t}function isRegisteredKernelInvocation(e){return null!=e.kernelName}var rc=function(){function EngineState(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(function(e){return e.name})))}}}return EngineState.prototype.dispose=function(){for(var e in this.registeredVariables)this.registeredVariables[e].dispose()},EngineState}(),rl=function(){function Engine(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new rc}return Engine.prototype.ready=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r;return __generator(this,function(n){switch(n.label){case 0:if(null!=this.pendingBackendInit)return[2,this.pendingBackendInit.then(function(){})];if(null!=this.backendInstance)return[2];e=this.getSortedBackends(),t=0,n.label=1;case 1:if(!(t<e.length))return[3,5];return r=e[t],[4,this.initializeBackend(r).success];case 2:if(!n.sent())return[3,4];return[4,this.setBackend(r)];case 3:return n.sent(),[2];case 4:return t++,[3,1];case 5:throw Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(Engine.prototype,"backend",{get:function(){if(null!=this.pendingBackendInit)throw Error("Backend '".concat(this.backendName,"' has not yet been initialized. Make ")+"sure to await tf.ready() or await tf.setBackend() before calling other methods");if(null==this.backendInstance){var e=this.initializeBackendsAndReturnBest(),t=e.name;if(e.asyncInit)throw Error("The highest priority backend '".concat(t,"' has not yet been ")+"initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(t)}return this.backendInstance},enumerable:!1,configurable:!0}),Engine.prototype.backendNames=function(){return Object.keys(this.registryFactory)},Engine.prototype.findBackend=function(e){return e in this.registry||e in this.registryFactory&&!this.initializeBackend(e).asyncInit?this.registry[e]:null},Engine.prototype.findBackendFactory=function(e){return e in this.registryFactory?this.registryFactory[e].factory:null},Engine.prototype.registerBackend=function(e,t,r){return(void 0===r&&(r=1),e in this.registryFactory)?(warn("".concat(e," backend was already registered. ")+"Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:r},!0)},Engine.prototype.setBackend=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(o){switch(o.label){case 0:if(null==this.registryFactory[e])throw Error("Backend name '".concat(e,"' not found in registry"));if(this.backendName=e,null!=this.registry[e])return[3,4];if(this.backendInstance=null,r=(t=this.initializeBackend(e)).success,!t.asyncInit)return[3,2];return[4,r];case 1:return n=o.sent(),[3,3];case 2:n=r,o.label=3;case 3:if(!n)return[2,!1];o.label=4;case 4:return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new rt(this.backendInstance),[2,!0]}})})},Engine.prototype.setupRegisteredKernels=function(){var e=this;getKernelsForBackend(this.backendName).forEach(function(t){null!=t.setupFunc&&t.setupFunc(e.backendInstance)})},Engine.prototype.disposeRegisteredKernels=function(e){var t=this;getKernelsForBackend(e).forEach(function(r){null!=r.disposeFunc&&r.disposeFunc(t.registry[e])})},Engine.prototype.initializeBackend=function(e){var t=this,r=this.registryFactory[e];if(null==r)throw Error("Cannot initialize backend ".concat(e,", no registration found."));try{var n=r.factory();if(!n||n instanceof p||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};var o=++this.pendingBackendInitId,a=n.then(function(r){return!(o<t.pendingBackendInitId)&&(t.registry[e]=r,t.pendingBackendInit=null,!0)}).catch(function(r){return!(o<t.pendingBackendInitId)&&(t.pendingBackendInit=null,warn("Initialization of backend ".concat(e," failed")),warn(r.stack||r.message),!1)});return this.pendingBackendInit=a,{success:a,asyncInit:!0}}catch(t){return warn("Initialization of backend ".concat(e," failed")),warn(t.stack||t.message),{success:!1,asyncInit:!1}}},Engine.prototype.removeBackend=function(e){if(!(e in this.registryFactory))throw Error("".concat(e," backend not found in registry"));this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},Engine.prototype.getSortedBackends=function(){var e=this;if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(t,r){return e.registryFactory[r].priority-e.registryFactory[t].priority})},Engine.prototype.initializeBackendsAndReturnBest=function(){for(var e=this.getSortedBackends(),t=0;t<e.length;t++){var r=e[t],n=this.initializeBackend(r),o=n.success,a=n.asyncInit;if(a||o)return{name:r,asyncInit:a}}throw Error("Could not initialize any backends, all backend initializations failed.")},Engine.prototype.moveData=function(e,t){var r=this.state.tensorInfo.get(t),n=r.backend,o=this.readSync(t),a=n.refCount(t);n.disposeData(t,!0),r.backend=e,e.move(t,o,r.shape,r.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},Engine.prototype.tidy=function(e,t){var r,n=this,o=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=e}return this.scopedRun(function(){return n.startScope(o)},function(){return n.endScope(r)},function(){return(r=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r})},Engine.prototype.scopedRun=function(e,t,r){e();try{var n=r();return t(),n}catch(e){throw t(),e}},Engine.prototype.nextTensorId=function(){return Engine.nextTensorId++},Engine.prototype.nextVariableId=function(){return Engine.nextVariableId++},Engine.prototype.clone=function(e){var t=rd.runKernel(em,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],function(e){return{x:function(){return rd.runKernel(B,{x:e},{dtype:"float32"})}}},[],{}),t},Engine.prototype.runKernel=function(e,t,r){if(null==this.backendName&&this.backend,!(null!=getKernel(e,this.backendName)))throw Error("Kernel '".concat(e,"' not registered for backend '").concat(this.backendName,"'"));return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})},Engine.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},Engine.prototype.checkKernelForMemLeak=function(e,t,r){var n=this.backend.numDataIds(),o=0;r.forEach(function(e){o+="complex64"===e.dtype?3:1});var a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-t-o-a;if(i>0)throw Error("Backend '".concat(this.backendName,"' has an internal memory leak ")+"(".concat(i," data ids) after running '").concat(e,"'"))},Engine.prototype.runKernelFunc=function(e){var t,r,n,o,a=this,i=[],s=this.isTapeOn(),u=this.state.numBytes,c=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;var l=isRegisteredKernelInvocation(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(isRegisteredKernelInvocation(e)){var d=e.kernelName,h=e.inputs,p=e.attrs;null==this.backendName&&this.backend;var f=getKernel(d,this.backendName);assert(null!=f,function(){return"Cannot find registered kernel '".concat(d,"' for backend '").concat(a.backendName,"'")}),r=function(){var e=a.backend.numDataIds(),t=Array.isArray(n=f.kernelFunc({inputs:h,attrs:p,backend:a.backend}))?n:[n];a.shouldCheckForMemLeaks()&&a.checkKernelForMemLeak(d,e,t);var r=t.map(function(e){return null!=e.rank?e:a.makeTensorFromTensorInfo(e)});if(s){var o=a.getTensorsForGradient(d,h,r);i=a.saveTensorsForBackwardMode(o)}return r}}else{var g=e.forwardFunc,saveFunc_1=function(e){s&&(i=e.map(function(e){return a.keep(a.clone(e))}))};r=function(){var e=a.backend.numDataIds(),t=Array.isArray(n=a.tidy(function(){return g(a.backend,saveFunc_1)}))?n:[n];return a.shouldCheckForMemLeaks()&&a.checkKernelForMemLeak(l,e,t),t}}var m=e.inputs,v=e.attrs,y=isRegisteredKernelInvocation(e)?null:e.backwardsFunc;return this.scopedRun(function(){return a.state.kernelDepth++},function(){return a.state.kernelDepth--},function(){a.ENV.getBool("DEBUG")||a.state.profiling?(o=a.profiler.profileKernel(l,m,function(){return r()}),a.ENV.getBool("DEBUG")&&a.profiler.logKernelProfile(o),t=o.outputs):t=r()}),s&&this.addTapeNode(l,m,t,y,i,v),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-u,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-c,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(m).map(function(e){return null!=m[e]?m[e].shape:null}),outputShapes:t.map(function(e){return e.shape}),kernelTimeMs:o.timeMs,extraInfo:o.extraInfo}),Array.isArray(n)?t:t[0]},Engine.prototype.saveTensorsForBackwardMode=function(e){var t=this;return e.map(function(e){return t.keep(t.clone(e))})},Engine.prototype.getTensorsForGradient=function(e,t,r){var n=getGradient(e);if(null!=n){var o=n.inputsToSave||[],a=n.outputsToSave||[],i=void 0;n.saveAllInputs?(assert(Array.isArray(t),function(){return"saveAllInputs is true, expected inputs to be an array."}),i=Object.keys(t).map(function(e){return t[e]})):i=o.map(function(e){return t[e]});var s=r.filter(function(e,t){return a[t]});return i.concat(s)}return[]},Engine.prototype.makeTensor=function(e,t,r,n){if(null==e)throw Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;var o=e;"string"===r&&isString(e[0])&&(o=e.map(function(e){return encodeString(e)}));var a=n.write(o,t,r),i=new ri(t,r,a,this.nextTensorId());if(this.trackTensor(i,n),"string"===r){var s=this.state.tensorInfo.get(a),u=bytesFromStringArray(o);this.state.numBytes+=u-s.bytes,s.bytes=u}return i},Engine.prototype.makeTensorFromDataId=function(e,t,r,n){var o={dataId:e,shape:t,dtype:r=r||"float32"};return this.makeTensorFromTensorInfo(o,n)},Engine.prototype.makeTensorFromTensorInfo=function(e,t){var r=e.dataId,n=e.shape,o=e.dtype,a=new ri(n,o,r,this.nextTensorId());return this.trackTensor(a,t),a},Engine.prototype.makeVariable=function(e,t,r,n){void 0===t&&(t=!0),r=r||this.nextVariableId().toString(),null!=n&&n!==e.dtype&&(e=e.cast(n));var o=new rs(e,t,r,this.nextTensorId());if(null!=this.state.registeredVariables[o.name])throw Error("Variable with name ".concat(o.name," was already registered"));return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o},Engine.prototype.trackTensor=function(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;var r=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(r=e.size*bytesPerElement(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof rs||this.track(e)},Engine.prototype.incRef=function(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)},Engine.prototype.removeDataId=function(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)},Engine.prototype.disposeTensor=function(e){if(this.state.tensorInfo.has(e.dataId)){var t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){var r=e.size*bytesPerElement(e.dtype);this.state.numBytes-=r}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}},Engine.prototype.disposeVariables=function(){for(var e in this.state.registeredVariables){var t=this.state.registeredVariables[e];this.disposeVariable(t)}},Engine.prototype.disposeVariable=function(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]},Engine.prototype.memory=function(){var e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e},Engine.prototype.profile=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,a,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:return this.state.profiling=!0,t=this.state.numBytes,r=this.state.numTensors,this.state.activeProfile.kernels=[],n=this.state.activeProfile,[4,e()];case 1:n.result=d.sent(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,__spreadArray([],__read(this.state.activeProfile.kernels.map(function(e){return e.totalBytesSnapshot})),!1)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r,d.label=2;case 2:d.trys.push([2,8,9,10]),a=(o=__values(this.state.activeProfile.kernels)).next(),d.label=3;case 3:if(a.done)return[3,7];return s=i=a.value,[4,i.kernelTimeMs];case 4:return s.kernelTimeMs=d.sent(),u=i,[4,i.extraInfo];case 5:u.extraInfo=d.sent(),d.label=6;case 6:return a=o.next(),[3,3];case 7:return[3,10];case 8:return c={error:d.sent()},[3,10];case 9:try{a&&!a.done&&(l=o.return)&&l.call(o)}finally{if(c)throw c.error}return[7];case 10:return[2,this.state.activeProfile]}})})},Engine.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&0===this.state.kernelDepth},Engine.prototype.addTapeNode=function(e,t,r,n,o,a){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:o},u=getGradient(e);null!=u&&(n=u.gradFunc),null!=n&&(s.gradient=function(e){return n((e=e.map(function(e,t){if(null==e){var n=r[t],o=makeZerosTypedArray(n.size,n.dtype);return i.makeTensor(o,n.shape,n.dtype)}return e})).length>1?e:e[0],o,a)}),this.state.activeTape.push(s)},Engine.prototype.keep=function(e){return e.kept=!0,e},Engine.prototype.startTape=function(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++},Engine.prototype.endTape=function(){this.state.gradientDepth--},Engine.prototype.startScope=function(e){var t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t},Engine.prototype.endScope=function(e){for(var t=this,r=getTensorsInContainer(e),n=new Set(r.map(function(e){return e.id})),o=0;o<this.state.activeScope.track.length;o++){var a=this.state.activeScope.track[o];a.kept||n.has(a.id)||a.dispose()}var i=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],r.forEach(function(e){e.kept||e.scopeId!==i.id||t.track(e)})},Engine.prototype.gradients=function(e,t,r,n){var o=this;if(void 0===n&&(n=!1),assert(t.length>0,function(){return"gradients() received an empty list of xs."}),null!=r&&"float32"!==r.dtype)throw Error("dy must have 'float32' dtype, but has '".concat(r.dtype,"'"));var a=this.scopedRun(function(){return o.startTape()},function(){return o.endTape()},function(){return o.tidy("forward",e)});assert(a instanceof ri,function(){return"The result y returned by f() must be a tensor."});var i=/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){for(var n={},o={},a=0;a<t.length;a++)n[t[a].id]=!0;for(var a=0;a<e.length;a++){var i=e[a],s=i.inputs;for(var u in s){for(var c=s[u],l=!1,d=0;d<t.length;d++)if(n[c.id]){i.outputs.forEach(function(e){return n[e.id]=!0}),l=!0,o[i.id]=!0;break}if(l)break}}var h={};h[r.id]=!0;for(var p={},a=e.length-1;a>=0;a--)for(var i=e[a],s=i.inputs,d=0;d<i.outputs.length;d++)if(h[i.outputs[d].id]){for(var u in s)h[s[u].id]=!0,p[i.id]=!0;break}for(var f=[],a=0;a<e.length;a++){var i=e[a];if(o[i.id]&&p[i.id]){var g={};for(var u in i.inputs){var m=i.inputs[u];n[m.id]&&(g[u]=m)}var v=Object.assign({},i);v.inputs=g,v.outputs=i.outputs,f.push(v)}}return f}(this.state.activeTape,t,a);if(!n&&0===i.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var e,n,s={};s[a.id]=null==r?(n=makeOnesTypedArray(sizeFromShape(e=a.shape),"float32"),rd.makeTensor(n,e,"float32")):r,function(e,t,r,n){for(var o=t.length-1;o>=0;o--)!function(o){var a=t[o],i=[];if(a.outputs.forEach(function(t){var r=e[t.id];null!=r?i.push(r):i.push(null)}),null==a.gradient)throw Error("Cannot compute gradient: gradient function not found "+"for ".concat(a.kernelName,"."));var s=a.gradient(i),_loop_2=function(t){if(!(t in s))throw Error("Cannot backprop through input ".concat(t,". ")+"Available gradients found: ".concat(Object.keys(s),"."));var o=r(function(){return s[t]()});if("float32"!==o.dtype)throw Error("Error in gradient for op ".concat(a.kernelName,". The gradient of input ")+"".concat(t," must have 'float32' dtype, but has '").concat(o.dtype,"'"));var i=a.inputs[t];if(!arraysEqual(o.shape,i.shape))throw Error("Error in gradient for op ".concat(a.kernelName,". The gradient of input ")+"'".concat(t,"' has shape '").concat(o.shape,"', which does not match ")+"the shape of the input '".concat(i.shape,"'"));if(null==e[i.id])e[i.id]=o;else{var u=e[i.id];e[i.id]=n(u,o),u.dispose()}};for(var u in a.inputs)_loop_2(u)}(o)}(s,i,function(e){return o.tidy(e)},add$1);var u=t.map(function(e){return s[e.id]});return 0===o.state.gradientDepth&&(o.state.activeTape.forEach(function(e){var t,r;try{for(var n=__values(e.saved),o=n.next();!o.done;o=n.next())o.value.dispose()}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}),o.state.activeTape=null),{value:a,grads:u}})},Engine.prototype.customGrad=function(e){var t=this;return assert(isFunction(e),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var r,n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];assert(n.every(function(e){return e instanceof ri}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var a={};return n.forEach(function(e,t){a[t]=e}),t.runKernelFunc({forwardFunc:function(t,o){return assert((r=e.apply(void 0,__spreadArray([],__read(__spreadArray(__spreadArray([],__read(n),!1),[o],!1)),!1))).value instanceof ri,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),assert(isFunction(r.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),r.value},backwardsFunc:function(e,t){var o=r.gradFunc(e,t),a=Array.isArray(o)?o:[o];assert(a.length===n.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),assert(a.every(function(e){return e instanceof ri}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var i={};return a.forEach(function(e,t){i[t]=function(){return e}}),i},inputs:a})}},Engine.prototype.readSync=function(e){return this.state.tensorInfo.get(e).backend.readSync(e)},Engine.prototype.read=function(e){return this.state.tensorInfo.get(e).backend.read(e)},Engine.prototype.readToGPU=function(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)},Engine.prototype.time=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:return t=now(),[4,this.backend.time(e)];case 1:return(r=n.sent()).wallMs=now()-t,[2,r]}})})},Engine.prototype.track=function(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e},Object.defineProperty(Engine.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!1,configurable:!0}),Engine.prototype.reset=function(){for(var e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new rc,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},Engine}();function getOrMakeEngine(){var e,r=getGlobalNamespace();if(null==r._tfengine){var n=new g(r);r._tfengine=new rl(n)}return e=r._tfengine.ENV,t.ENV=e,ro=function(){return r._tfengine},r._tfengine}rl.nextTensorId=0,rl.nextVariableId=0;var rd=getOrMakeEngine();function add$1(e,t){return rd.runKernel("Add",{a:e,b:t})}function isBrowser(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var rh=env();/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function inferShape(e,t){var r=e;if(isTypedArray(e))return"string"===t?[]:[e.length];if(isWebGLData(e)){var n=e.channels||"RGBA";return[e.height,e.width*n.length]}if(isWebGPUData(e))return[e.buffer.size/(null==t?4:bytesPerElement(t))];if(!Array.isArray(e))return[];for(var o=[];Array.isArray(r)||isTypedArray(r)&&"string"!==t;)o.push(r.length),r=r[0];return Array.isArray(e)&&env().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function deepAssertShapeConsistency(e,t,r){if(r=r||[],!Array.isArray(e)&&!isTypedArray(e)){assert(0===t.length,function(){return"Element arr[".concat(r.join("]["),"] is a primitive, ")+"but should be an array/TypedArray of ".concat(t[0]," elements")});return}assert(t.length>0,function(){return"Element arr[".concat(r.join("]["),"] should be a primitive, ")+"but is an array of ".concat(e.length," elements")}),assert(e.length===t[0],function(){return"Element arr[".concat(r.join("]["),"] should have ").concat(t[0]," ")+"elements, but has ".concat(e.length," elements")});for(var n=t.slice(1),o=0;o<e.length;++o)deepAssertShapeConsistency(e[o],n,r.concat(o))}(e,o,[]),o}function assertDtype(e,t,r,n){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error("Argument '".concat(r,"' passed to '").concat(n,"' must ")+"be ".concat(e," tensor, but got ").concat(t," tensor"))}}function convertToTensor(e,t,r,n){if(void 0===n&&(n="numeric"),e instanceof getGlobalTensorClass())return assertDtype(n,e.dtype,t,r),e;var o=inferDtype(e);if("string"!==o&&["bool","int32","float32"].indexOf(n)>=0&&(o=n),assertDtype(n,o,t,r),null==e||!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){var a=null==e?"null":e.constructor.name;throw Error("Argument '".concat(t,"' passed to '").concat(r,"' must be a ")+"Tensor or TensorLike, but got '".concat(a,"'"))}var i=inferShape(e,o);isTypedArray(e)||Array.isArray(e)||(e=[e]);var s="string"!==o?toTypedArray(e,o):flatten(e,[],!0);return rd.makeTensor(s,i,o)}function convertToTensorArray(e,t,r,n){if(void 0===n&&(n="numeric"),!Array.isArray(e))throw Error("Argument ".concat(t," passed to ").concat(r," must be a ")+"`Tensor[]` or `TensorLike[]`");return e.map(function(e,o){return convertToTensor(e,"".concat(t,"[").concat(o,"]"),r,n)})}rh.registerFlag("DEBUG",function(){return!1},function(e){e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),rh.registerFlag("IS_BROWSER",function(){return isBrowser()}),rh.registerFlag("IS_NODE",function(){return"undefined"!=typeof process&&void 0!==process.versions&&void 0!==process.versions.node}),rh.registerFlag("IS_CHROME",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),rh.registerFlag("IS_SAFARI",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)}),rh.registerFlag("PROD",function(){return!1}),rh.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return rh.getBool("DEBUG")}),rh.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),rh.registerFlag("IS_TEST",function(){return!1}),rh.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",function(){return rh.getBool("DEBUG")}),rh.registerFlag("WRAP_TO_IMAGEBITMAP",function(){return!1}),rh.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",function(){return!1}),rh.registerFlag("USE_SETTIMEOUTCUSTOM",function(){return!1});var rp="__op";function op(e){var t=Object.keys(e);if(1!==t.length)throw Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+"".concat(t.length," keys."));var r=t[0],n=e[r];r.endsWith("_")&&(r=r.substring(0,r.length-1));var f2=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];rd.startScope(r);try{var o=n.apply(void 0,__spreadArray([],__read(e),!1));return isPromise(o)&&console.error("Cannot return a Promise inside of tidy."),rd.endScope(o),o}catch(e){throw rd.endScope(null),e}};return Object.defineProperty(f2,"name",{value:r+=rp,configurable:!0}),f2}var rf=op({complex_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"real","complex"),n=convertToTensor(t,"imag","complex");return assertShapesMatch(r.shape,n.shape,"real and imag shapes, ".concat(r.shape," and ").concat(n.shape,", ")+"must match in call to tf.complex()."),rd.runKernel(P,{real:r,imag:n})}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function makeTensor(e,t,r,n){if(null==n)n=inferDtype(e);else if("complex64"===n)throw Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(isWebGPUData(e)||isWebGLData(e)){if("float32"!==n&&"int32"!==n)throw Error("Creating tensor from GPU data only supports "+"'float32'|'int32' dtype, while the dtype is ".concat(n,"."));return rd.backend.createTensorFromGPUData(e,t||r,n)}if(!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){assertNonNegativeIntegerDimensions(t);var o=sizeFromShape(t),a=sizeFromShape(r);assert(o===a,function(){return"Based on the provided shape, [".concat(t,"], the tensor should have ")+"".concat(o," values but has ").concat(a)});for(var i=0;i<r.length;++i){var s=r[i],u=i!==r.length-1||s!==sizeFromShape(t.slice(i));assert(r[i]===t[i]||!u,function(){return"Error creating a new Tensor. Inferred shape "+"(".concat(r,") does not match the provided ")+"shape (".concat(t,"). ")})}}return isTypedArray(e)||Array.isArray(e)||(e=[e]),t=t||r,e="string"!==n?toTypedArray(e,n):flatten(e,[],!0),rd.makeTensor(e,t,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tensor(e,t,r){var n=inferShape(e,r);return makeTensor(e,t,n,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var rg={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8},rm=function(){function CompositeArrayBuffer(e){if(this.shards=[],this.previousShardIndex=0,null!=e&&(e instanceof Array||(e=[e]),0!==(e=e.map(function(e){return isTypedArray(e)?e.buffer:e})).length)){this.bufferUniformSize=e[0].byteLength;for(var t=0,r=0;r<e.length;r++){var n=e[r];r!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);var o=t+n.byteLength;this.shards.push({buffer:n,start:t,end:o}),t=o}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}}return CompositeArrayBuffer.join=function(e){return new CompositeArrayBuffer(e).slice()},CompositeArrayBuffer.prototype.slice=function(e,t){if(void 0===e&&(e=0),void 0===t&&(t=this.byteLength),0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);var r=this.findShardForByte(e);if(-1===r)throw Error("Could not find start shard for byte ".concat(e));for(var n=t-e,o=new ArrayBuffer(n),a=new Uint8Array(o),i=0,s=r;s<this.shards.length;s++){var u=this.shards[s],c=e+i-u.start,l=i,d=Math.min(t,u.end)-u.start,h=new Uint8Array(u.buffer,c,d-c);if(a.set(h,l),i+=h.length,t<u.end)break}return o},CompositeArrayBuffer.prototype.findShardForByte=function(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function check(t){return e<t.start?-1:e>=t.end?1:0}if(0===check(this.shards[this.previousShardIndex]))return this.previousShardIndex;var t=function(e,t){for(var r=0,n=e.length;r<=n;){var o=Math.floor((n-r)/2)+r,a=t(e[o]);if(0===a)return o;a<0?n=o:r=o+1}return -1}(this.shards,check);return -1===t?-1:(this.previousShardIndex=t,this.previousShardIndex)},CompositeArrayBuffer}();function tidy(e,t){return rd.tidy(e,t)}function dispose(e){getTensorsInContainer(e).forEach(function(e){return e.dispose()})}function keep(e){return rd.keep(e)}function getBackend(){return rd.backendName}function backend(){return rd.backend}function decodeWeights(e,t){var r,n,o=new rm(e),a={},i=0;try{for(var s=__values(t),u=s.next();!u.done;u=s.next()){var c=u.value,l=function(e,t){var r,n=sizeFromShape(e.shape);if("quantization"in e)r=rg[e.quantization.dtype];else if("string"===e.dtype){for(var o=0,a=0;a<n;a++)o+=4+new Uint32Array(t(o,o+4))[0];return o}else r=rg[e.dtype];return n*r}(c,function(e,t){return o.slice(i+e,i+t)});a[c.name]=decodeWeight(c,o.slice(i,i+l)),i+=l}}catch(e){r={error:e}}finally{try{u&&!u.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}return a}function decodeWeight(e,t){var r,n=e.name,o=e.dtype,a=e.shape,i=sizeFromShape(a),s=0;if("quantization"in e){var u=e.quantization;if("uint8"===u.dtype||"uint16"===u.dtype){if(!("min"in u&&"scale"in u))throw Error("Weight ".concat(e.name," with quantization ").concat(u.dtype," ")+"doesn't have corresponding metadata min and scale.")}else if("float16"===u.dtype){if("float32"!==o)throw Error("Weight ".concat(e.name," is quantized with ").concat(u.dtype," ")+"which only supports weights of type float32 not ".concat(o,"."))}else throw Error("Weight ".concat(e.name," has unknown ")+"quantization dtype ".concat(u.dtype,". ")+"Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.");var c=rg[u.dtype],l="uint8"===u.dtype?new Uint8Array(t):new Uint16Array(t);if("float32"===o){if("uint8"===u.dtype||"uint16"===u.dtype){r=new Float32Array(l.length);for(var d,h,p,f=0;f<l.length;f++){var g=l[f];r[f]=g*u.scale+u.min}}else if("float16"===u.dtype)r=(d=function(){var e=new Uint32Array(2048);e[0]=0;for(var t=1;t<1024;t++)e[t]=function(e){for(var t=e<<13,r=0;(8388608&t)==0;)r-=8388608,t<<=1;return(t&=-8388609)|(r+=947912704)}(t);for(var t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}(),h=function(){var e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(var t=1;t<31;t++)e[t]=t<<23;for(var t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),p=function(){for(var e=new Uint32Array(64),t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}(),function(e){for(var t=new ArrayBuffer(4*e.length),r=new Uint32Array(t),n=0;n<e.length;n++){var o=e[n],a=d[p[o>>10]+(1023&o)]+h[o>>10];r[n]=a}return new Float32Array(t)})(l);else throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type float32.")}else if("int32"===o){if("uint8"!==u.dtype&&"uint16"!==u.dtype)throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type int32.");r=new Int32Array(l.length);for(var f=0;f<l.length;f++){var g=l[f];r[f]=Math.round(g*u.scale+u.min)}}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(o));s+=i*c}else if("string"===o){var m=sizeFromShape(e.shape);r=[];for(var f=0;f<m;f++){var v=new Uint32Array(t.slice(s,s+4))[0];s+=4;var y=new Uint8Array(t.slice(s,s+v));r.push(y),s+=v}}else{var b=rg[o];if("float32"===o)r=new Float32Array(t);else if("int32"===o)r=new Int32Array(t);else if("bool"===o)r=new Uint8Array(t);else if("complex64"===o){r=new Float32Array(t);for(var T=new Float32Array(r.length/2),w=new Float32Array(r.length/2),f=0;f<T.length;f++)T[f]=r[2*f],w[f]=r[2*f+1];var _=tensor(T,a,"float32"),k=tensor(w,a,"float32"),S=rf(_,k);return _.dispose(),k.dispose(),S}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(o));s+=i*b}return tensor(r,a,o)}function readToLength(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,o,a,i,s,u;return __generator(this,function(c){switch(c.label){case 0:n=new Uint8Array(t),c.label=1;case 1:if(!(n.byteLength<r))return[3,3];return[4,e.read()];case 2:if(a=(o=c.sent()).done,i=o.value,a&&null==i)throw s=r-n.byteLength,Error("Reader is done but ".concat(s," bytes are still expected"));return(u=new Uint8Array(n.length+i.byteLength)).set(n,0),u.set(new Uint8Array(i),n.length),n=u,[3,1];case 3:return[2,n.buffer]}})})}var rv="undefined"!=typeof Buffer&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function stringByteLength(e){return rv?Buffer.byteLength(e,"utf8"):new Blob([e]).size}function basename(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);var t=e.split("/");return t[t.length-1]}function getModelJSONForModelArtifacts(e,t){var r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),r}function getModelArtifactsForJSONSync(e,t,r){var n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!r)throw Error("modelJSON has weightsManifest but weightData is null");n.weightSpecs=t,n.weightData=r}return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),n}function getModelArtifactsForJSON(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o;return __generator(this,function(a){switch(a.label){case 0:if(!(null!=e.weightsManifest))return[3,2];return[4,t(e.weightsManifest)];case 1:r=(o=__read.apply(void 0,[a.sent(),2]))[0],n=o[1],a.label=2;case 2:return[2,getModelArtifactsForJSONSync(e,r,n)]}})})}function getModelArtifactsInfoForJSON(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:stringByteLength(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:stringByteLength(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new rm(e.weightData).byteLength}}function getWeightSpecs(e){var t,r,n=[];try{for(var o=__values(e),a=o.next();!a.done;a=o.next()){var i=a.value;n.push.apply(n,__spreadArray([],__read(i.weights),!1))}}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var ry=function(){function IORouterRegistry(){this.saveRouters=[],this.loadRouters=[]}return IORouterRegistry.getInstance=function(){return null==IORouterRegistry.instance&&(IORouterRegistry.instance=new IORouterRegistry),IORouterRegistry.instance},IORouterRegistry.registerSaveRouter=function(e){IORouterRegistry.getInstance().saveRouters.push(e)},IORouterRegistry.registerLoadRouter=function(e){IORouterRegistry.getInstance().loadRouters.push(e)},IORouterRegistry.getSaveHandlers=function(e){return IORouterRegistry.getHandlers(e,"save")},IORouterRegistry.getLoadHandlers=function(e,t){return IORouterRegistry.getHandlers(e,"load",t)},IORouterRegistry.getHandlers=function(e,t,r){var n=[];return("load"===t?IORouterRegistry.getInstance().loadRouters:IORouterRegistry.getInstance().saveRouters).forEach(function(t){var o=t(e,r);null!==o&&n.push(o)}),n},IORouterRegistry}(),rb="tensorflowjs",rT="models_store",rw="model_info_store";function getIndexedDBFactory(){if(!env().getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function setUpDatabase(e){var t=e.result;t.createObjectStore(rT,{keyPath:"modelPath"}),t.createObjectStore(rw,{keyPath:"modelPath"})}var r_=function(){function BrowserIndexedDB(e){if(this.indexedDB=getIndexedDBFactory(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}return BrowserIndexedDB.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,e)]})})},BrowserIndexedDB.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,this.databaseAction(this.modelPath)]})})},BrowserIndexedDB.prototype.databaseAction=function(e,t){var r=this;return new Promise(function(e,n){var o=r.indexedDB.open(rb,1);o.onupgradeneeded=function(){return setUpDatabase(o)},o.onsuccess=function(){var a=o.result;if(null==t){var i=a.transaction(rT,"readonly"),s=i.objectStore(rT).get(r.modelPath);s.onsuccess=function(){if(null==s.result)return a.close(),n(Error("Cannot find model with path '".concat(r.modelPath,"' ")+"in IndexedDB."));e(s.result.modelArtifacts)},s.onerror=function(e){return a.close(),n(s.error)},i.oncomplete=function(){return a.close()}}else{t.weightData=rm.join(t.weightData);var u,c,l=getModelArtifactsInfoForJSON(t),d=a.transaction(rw,"readwrite"),h=d.objectStore(rw);try{u=h.put({modelPath:r.modelPath,modelArtifactsInfo:l})}catch(e){return n(e)}u.onsuccess=function(){var o,i=(c=a.transaction(rT,"readwrite")).objectStore(rT);try{o=i.put({modelPath:r.modelPath,modelArtifacts:t,modelArtifactsInfo:l})}catch(e){return n(e)}o.onsuccess=function(){return e({modelArtifactsInfo:l})},o.onerror=function(e){var t=(h=d.objectStore(rw)).delete(r.modelPath);t.onsuccess=function(){return a.close(),n(o.error)},t.onerror=function(e){return a.close(),n(o.error)}}},u.onerror=function(e){return a.close(),n(u.error)},d.oncomplete=function(){null==c?a.close():c.oncomplete=function(){return a.close()}}}},o.onerror=function(e){return n(o.error)}})},BrowserIndexedDB}();r_.URL_SCHEME="indexeddb://";var indexedDBRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(r_.URL_SCHEME)?(t=e.slice(r_.URL_SCHEME.length),new r_(t)):null};ry.registerSaveRouter(indexedDBRouter),ry.registerLoadRouter(indexedDBRouter);var rk=function(){function BrowserIndexedDBManager(){this.indexedDB=getIndexedDBFactory()}return BrowserIndexedDBManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=e.indexedDB.open(rb,1);n.onupgradeneeded=function(){return setUpDatabase(n)},n.onsuccess=function(){var e=n.result,o=e.transaction(rw,"readonly"),a=o.objectStore(rw).getAll();a.onsuccess=function(){var e,r,n={};try{for(var o=__values(a.result),i=o.next();!i.done;i=o.next()){var s=i.value;n[s.modelPath]=s.modelArtifactsInfo}}catch(t){e={error:t}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}t(n)},a.onerror=function(t){return e.close(),r(a.error)},o.oncomplete=function(){return e.close()}},n.onerror=function(e){return r(n.error)}})]})})},BrowserIndexedDBManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(r){return e=e.startsWith(r_.URL_SCHEME)?e.slice(r_.URL_SCHEME.length):e,[2,new Promise(function(r,n){var o=t.indexedDB.open(rb,1);o.onupgradeneeded=function(){return setUpDatabase(o)},o.onsuccess=function(){var t,a=o.result,i=a.transaction(rw,"readwrite"),s=i.objectStore(rw),u=s.get(e);u.onsuccess=function(){if(null==u.result)return a.close(),n(Error("Cannot find model with path '".concat(e,"' ")+"in IndexedDB."));var o=s.delete(e),deleteModelData_1=function(){var o=(t=a.transaction(rT,"readwrite")).objectStore(rT).delete(e);o.onsuccess=function(){return r(u.result.modelArtifactsInfo)},o.onerror=function(e){return n(u.error)}};o.onsuccess=deleteModelData_1,o.onerror=function(e){return deleteModelData_1(),a.close(),n(u.error)}},u.onerror=function(e){return a.close(),n(u.error)},i.oncomplete=function(){null==t?a.close():t.oncomplete=function(){return a.close()}}},o.onerror=function(e){return n(o.error)}})]})})},BrowserIndexedDBManager}(),rS="tensorflowjs_models",rx="info";function getModelKeys(e){return{info:[rS,e,rx].join("/"),topology:[rS,e,"model_topology"].join("/"),weightSpecs:[rS,e,"weight_specs"].join("/"),weightData:[rS,e,"weight_data"].join("/"),modelMetadata:[rS,e,"model_metadata"].join("/")}}function removeItems(e){var t,r;try{for(var n=__values(Object.values(e)),o=n.next();!o.done;o=n.next()){var a=o.value;window.localStorage.removeItem(a)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}var rE=function(){function BrowserLocalStorage(e){if(!env().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=getModelKeys(this.modelPath)}return BrowserLocalStorage.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,a;return __generator(this,function(i){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),n=getModelArtifactsInfoForJSON(e),o=rm.join(e.weightData);try{return this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,function(e){if(rv)return Buffer.from(e).toString("base64");for(var t=new Uint8Array(e),r="",n=0,o=t.length;n<o;n++)r+=String.fromCharCode(t[n]);return btoa(r)}(o)),a={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0},this.LS.setItem(this.keys.modelMetadata,JSON.stringify(a)),[2,{modelArtifactsInfo:n}]}catch(e){throw removeItems(this.keys),Error("Failed to save model '".concat(this.modelPath,"' to local storage: ")+"size quota being exceeded is a possible cause of this failure: "+"modelTopologyBytes=".concat(n.modelTopologyBytes,", ")+"weightSpecsBytes=".concat(n.weightSpecsBytes,", ")+"weightDataBytes=".concat(n.weightDataBytes,"."))}return[2]})})},BrowserLocalStorage.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,o,a,i;return __generator(this,function(s){if(null==(e=JSON.parse(this.LS.getItem(this.keys.info))))throw Error("In local storage, there is no model with name '".concat(this.modelPath,"'"));if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(t={},null==(r=JSON.parse(this.LS.getItem(this.keys.topology))))throw Error("In local storage, the topology of model '".concat(this.modelPath,"' ")+"is missing.");if(t.modelTopology=r,null==(n=JSON.parse(this.LS.getItem(this.keys.weightSpecs))))throw Error("In local storage, the weight specs of model '".concat(this.modelPath,"' ")+"are missing.");if(t.weightSpecs=n,null!=(o=this.LS.getItem(this.keys.modelMetadata))&&(a=JSON.parse(o),t.format=a.format,t.generatedBy=a.generatedBy,t.convertedBy=a.convertedBy,null!=a.signature&&(t.signature=a.signature),null!=a.userDefinedMetadata&&(t.userDefinedMetadata=a.userDefinedMetadata),null!=a.modelInitializer&&(t.modelInitializer=a.modelInitializer),null!=a.initializerSignature&&(t.initializerSignature=a.initializerSignature),null!=a.trainingConfig&&(t.trainingConfig=a.trainingConfig)),null==(i=this.LS.getItem(this.keys.weightData)))throw Error("In local storage, the binary weight values of model "+"'".concat(this.modelPath,"' are missing."));return t.weightData=function(e){if(rv){var t=Buffer.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}for(var r=atob(e),n=new Uint8Array(r.length),o=0;o<r.length;++o)n.set([r.charCodeAt(o)],o);return n.buffer}(i),[2,t]})})},BrowserLocalStorage}();rE.URL_SCHEME="localstorage://";var localStorageRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rE.URL_SCHEME)?(t=e.slice(rE.URL_SCHEME.length),new rE(t)):null};ry.registerSaveRouter(localStorageRouter),ry.registerLoadRouter(localStorageRouter);var rA=function(){function BrowserLocalStorageManager(){assert(env().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),assert("undefined"==typeof window||void 0!==window.localStorage,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}return BrowserLocalStorageManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,o;return __generator(this,function(a){for(n=0,e={},t=rS+"/",r="/"+rx;n<this.LS.length;++n)(o=this.LS.key(n)).startsWith(t)&&o.endsWith(r)&&(e[function(e){var t=e.split("/");if(t.length<3)throw Error("Invalid key format: ".concat(e));return t.slice(1,t.length-1).join("/")}(o)]=JSON.parse(this.LS.getItem(o)));return[2,e]})})},BrowserLocalStorageManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){if(t=getModelKeys(e=e.startsWith(rE.URL_SCHEME)?e.slice(rE.URL_SCHEME.length):e),null==this.LS.getItem(t.info))throw Error("Cannot find model at path '".concat(e,"'"));return r=JSON.parse(this.LS.getItem(t.info)),removeItems(t),[2,r]})})},BrowserLocalStorageManager}(),rM=function(){function ModelStoreManagerRegistry(){this.managers={}}return ModelStoreManagerRegistry.getInstance=function(){return null==ModelStoreManagerRegistry.instance&&(ModelStoreManagerRegistry.instance=new ModelStoreManagerRegistry),ModelStoreManagerRegistry.instance},ModelStoreManagerRegistry.registerManager=function(e,t){assert(null!=e,function(){return"scheme must not be undefined or null."}),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),assert(e.length>0,function(){return"scheme must not be an empty string."});var r=ModelStoreManagerRegistry.getInstance();assert(null==r.managers[e],function(){return"A model store manager is already registered for scheme '".concat(e,"'.")}),r.managers[e]=t},ModelStoreManagerRegistry.getManager=function(e){var t=ModelStoreManagerRegistry.getInstance().managers[e];if(null==t)throw Error("Cannot find model manager for scheme '".concat(e,"'"));return t},ModelStoreManagerRegistry.getSchemes=function(){return Object.keys(ModelStoreManagerRegistry.getInstance().managers)},ModelStoreManagerRegistry}();function parseURL(e){if(-1===e.indexOf("://"))throw Error("The url string provided does not contain a scheme. Supported schemes are: "+"".concat(rM.getSchemes().join(",")));return{scheme:e.split("://")[0],path:e.split("://")[1]}}function cloneModelInternal(e,t,r){return void 0===r&&(r=!1),__awaiter(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,d;return __generator(this,function(h){switch(h.label){case 0:return assert(e!==t,function(){return"Old path and new path are the same: '".concat(e,"'")}),assert((n=ry.getLoadHandlers(e)).length>0,function(){return"Copying failed because no load handler is found for source URL ".concat(e,".")}),assert(n.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"load handlers for source URL ".concat(e,".")}),o=n[0],assert((a=ry.getSaveHandlers(t)).length>0,function(){return"Copying failed because no save handler is found for destination "+"URL ".concat(t,".")}),assert(a.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"save handlers for destination URL ".concat(t,".")}),i=a[0],s=parseURL(e).scheme,u=parseURL(e).path,c=s===parseURL(e).scheme,[4,o.load()];case 1:if(l=h.sent(),!(r&&c))return[3,3];return[4,rM.getManager(s).removeModel(u)];case 2:h.sent(),h.label=3;case 3:return[4,i.save(l)];case 4:if(d=h.sent(),!(r&&!c))return[3,6];return[4,rM.getManager(s).removeModel(u)];case 5:h.sent(),h.label=6;case 6:return[2,d.modelArtifactsInfo]}})})}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var rI=function(){function PlatformBrowser(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}return PlatformBrowser.prototype.fetch=function(e,t){return fetch(e,t)},PlatformBrowser.prototype.now=function(){return performance.now()},PlatformBrowser.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Browser's encoder only supports utf-8, but got ".concat(t));return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)},PlatformBrowser.prototype.decode=function(e,t){return new TextDecoder(t).decode(e)},PlatformBrowser.prototype.setTimeoutCustom=function(e,t){var r=this;if("undefined"==typeof window||!env().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(function(){window.postMessage({name:r.messageName,index:r.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",function(e){e.source===window&&e.data.name===r.messageName&&(e.stopPropagation(),(0,r.functionRefs[e.data.index])(),r.handledMessageCount++,r.handledMessageCount===r.functionRefs.length&&(r.functionRefs=[],r.handledMessageCount=0))},!0))},PlatformBrowser.prototype.isTypedArray=function(e){return isTypedArrayBrowser(e)},PlatformBrowser}();if(env().get("IS_BROWSER")){env().setPlatform("browser",new rI);try{rM.registerManager(rE.URL_SCHEME,new rA)}catch(e){}try{rM.registerManager(r_.URL_SCHEME,new rk)}catch(e){}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var rN={importFetch:function(){return r(81285)}},rD=function(){function PlatformNode(){this.util=r(73837),this.textEncoder=new this.util.TextEncoder}return PlatformNode.prototype.fetch=function(e,t){return null!=env().global.fetch?env().global.fetch(e,t):(null==c&&(c=rN.importFetch()),c(e,t))},PlatformNode.prototype.now=function(){var e=process.hrtime();return 1e3*e[0]+e[1]/1e6},PlatformNode.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Node built-in encoder only supports utf-8, but got ".concat(t));return this.textEncoder.encode(e)},PlatformNode.prototype.decode=function(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)},PlatformNode.prototype.isTypedArray=function(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)},PlatformNode}();/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function buffer(e,t,r){return void 0===t&&(t="float32"),t=t||"float32",assertNonNegativeIntegerDimensions(e),new rn(e,t,r)}env().get("IS_NODE")&&!env().get("IS_BROWSER")&&env().setPlatform("node",new rD);var rR=op({cast_:/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","cast");if(!isValidDtype(t))throw Error("Failed to cast to unknown dtype ".concat(t));if("string"===t&&"string"!==r.dtype||"string"!==t&&"string"===r.dtype)throw Error("Only strings can be casted to strings");return rd.runKernel(B,{x:r},{dtype:t})}}),rB=op({clone_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","clone","string_or_numeric");return rd.runKernel(em,{x:t})}});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function print(e,t){void 0===t&&(t=!1),console.log(e.toString(t))}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */getOrMakeEngine(),ra={buffer:buffer,cast:rR,clone:rB,print:print};var rF=op({add_:function(e,t){var r,n=convertToTensor(e,"a","add"),o=convertToTensor(t,"b","add"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel("Add",a)}}),rO=op({floorDiv_:function(e,t){var r,n=convertToTensor(e,"a","floorDiv"),o=convertToTensor(t,"b","floorDiv"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel(el,a)}}),rP=op({div_:function(e,t){var r,n=convertToTensor(e,"a","div"),o=convertToTensor(t,"b","div");if(n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],"int32"===n.dtype&&"int32"===o.dtype)return rO(n,o);var a={a:n,b:o};return rd.runKernel(er,a,{})}}),rC=op({mul_:function(e,t){var r,n=convertToTensor(e,"a","mul"),o=convertToTensor(t,"b","mul"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel(ez,a)}}),rz=op({abs_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","abs");if("complex64"===t.dtype){var r={x:t};return rd.runKernel(C,r)}var r={x:t};return rd.runKernel("Abs",r)}}),rL=op({acos_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","acos");return rd.runKernel(m,{x:t})}}),rG=op({acosh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","acosh");return rd.runKernel(v,{x:t})}}),rW=op({addN_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){assert(Array.isArray(e),function(){return"The argument passed to tf.addN() must be a list of tensors"}),assert(e.length>=1,function(){return"Must pass at least one tensor to tf.addN(), but got "+"".concat(e.length)});var t=e.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"addN")}),r=t[0];return t.forEach(function(e){if(e.dtype!==r.dtype)throw Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(function(e){if(!arraysEqual(e.shape,r.shape))throw Error("All tensors passed to tf.addN() must have the same shape")}),rd.runKernel(y,t)}}),rU=op({all_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","all","bool"),o={axis:t,keepDims:r};return rd.runKernel("All",{x:n},o)}}),rK=op({any_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","any","bool"),o={axis:t,keepDims:r};return rd.runKernel("Any",{x:n},o)}}),rq=op({argMax_:/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMax"),n={axis:t};return rd.runKernel(b,{x:r},n)}}),rV=op({argMin_:/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMin"),n={axis:t};return rd.runKernel(T,{x:r},n)}}),rH=op({asin_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","asin");return rd.runKernel(w,{x:t})}}),rj=op({asinh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","asinh");return rd.runKernel(_,{x:t})}}),rJ=op({atan_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","atan");return rd.runKernel(k,{x:t})}}),r$=op({atan2_:function(e,t){var r,n=convertToTensor(e,"a","atan2"),o=convertToTensor(t,"b","atan2"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel(x,a)}}),rZ=op({atanh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","atanh");return rd.runKernel(S,{x:t})}});function computePool2DInfo(e,t,r,n,o,a,i){void 0===i&&(i="channelsLast");var s,u=__read(parseTupleParam(t),2),c=u[0],l=u[1];if("channelsLast"===i)s=[c,l,e[3],e[3]];else if("channelsFirst"===i)s=[c,l,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv2DInfo(e,s,r,n,o,a,!1,i)}function computeConv2DInfo(e,t,r,n,o,a,i,s){void 0===i&&(i=!1),void 0===s&&(s="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1],4),h=d[0],p=d[1],f=d[2],g=d[3];if("channelsLast"===s)h=(u=__read(e,4))[0],p=u[1],f=u[2],g=u[3];else if("channelsFirst"===s)h=(c=__read(e,4))[0],g=c[1],p=c[2],f=c[3];else throw Error("Unknown dataFormat ".concat(s));var m=__read(t,4),v=m[0],y=m[1],b=m[3],T=__read(parseTupleParam(r),2),w=T[0],_=T[1],k=__read(parseTupleParam(n),2),S=k[0],x=k[1],E=getEffectiveFilterSize(v,S),A=getEffectiveFilterSize(y,x),M=function(e,t,r,n,o,a,i,s,u){if("number"==typeof e){var c,l,d,h,p,f,g,m=0===e?"VALID":"NUMBER";p={top:e,bottom:e,left:e,right:e,type:m};var v=(c=[t,r],null==(l=e)&&(l=computeDefaultPad(c,a,n)),d=c[0],h=c[1],[round$1((d-a+2*l)/n+1,s),round$1((h-a+2*l)/n+1,s)]);f=v[0],g=v[1]}else if("same"===e){var y=Math.max(0,((f=Math.ceil(t/n))-1)*n+a-t),b=Math.max(0,((g=Math.ceil(r/o))-1)*o+i-r),T=Math.floor(y/2),w=y-T,_=Math.floor(b/2),k=b-_;p={top:T,bottom:w,left:_,right:k,type:"SAME"}}else if("valid"===e)p={top:0,bottom:0,left:0,right:0,type:"VALID"},f=Math.ceil((t-a+1)/n),g=Math.ceil((r-i+1)/o);else if("object"==typeof e){var T="channelsLast"===u?e[1][0]:e[2][0],w="channelsLast"===u?e[1][1]:e[2][1],_="channelsLast"===u?e[2][0]:e[3][0],k="channelsLast"===u?e[2][1]:e[3][1],m=0===T&&0===w&&0===_&&0===k?"VALID":"EXPLICIT";p={top:T,bottom:w,left:_,right:k,type:m},f=round$1((t-a+T+w)/n+1,s),g=round$1((r-i+_+k)/o+1,s)}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:p,outHeight:f,outWidth:g}}(o,p,f,w,_,E,A,a,s),I=M.padInfo,N=M.outHeight,D=M.outWidth,R=i?b*g:b;return"channelsFirst"===s?l=[h,R,N,D]:"channelsLast"===s&&(l=[h,N,D,R]),{batchSize:h,dataFormat:s,inHeight:p,inWidth:f,inChannels:g,outHeight:N,outWidth:D,outChannels:R,padInfo:I,strideHeight:w,strideWidth:_,filterHeight:v,filterWidth:y,effectiveFilterHeight:E,effectiveFilterWidth:A,dilationHeight:S,dilationWidth:x,inShape:e,outShape:l,filterShape:t}}function computeConv3DInfo(e,t,r,n,o,a,i,s){void 0===a&&(a=!1),void 0===i&&(i="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1,-1],5),h=d[0],p=d[1],f=d[2],g=d[3],m=d[4];if("channelsLast"===i)h=(u=__read(e,5))[0],p=u[1],f=u[2],g=u[3],m=u[4];else if("channelsFirst"===i)h=(c=__read(e,5))[0],m=c[1],p=c[2],f=c[3],g=c[4];else throw Error("Unknown dataFormat ".concat(i));var v=__read(t,5),y=v[0],b=v[1],T=v[2],w=v[4],_=__read(parse3TupleParam(r),3),k=_[0],S=_[1],x=_[2],E=__read(parse3TupleParam(n),3),A=E[0],M=E[1],I=E[2],N=getEffectiveFilterSize(y,A),D=getEffectiveFilterSize(b,M),R=getEffectiveFilterSize(T,I),B=function(e,t,r,n,o,a,i,s,u,c,l){if("valid"===e&&(e=0),"number"==typeof e){var d,h,p,f,g=0===e?"VALID":"NUMBER";d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:g};var m=function(e,t,r,n,o,a){null==o&&(o=computeDefaultPad(e,t[0],n[0]));for(var i=[0,0,0,1],s=0;s<3;s++)e[s]+2*o>=t[s]&&(i[s]=round$1((e[s]-t[s]+2*o)/n[s]+1,a));return i}([t,r,n,1],[s,u,c],0,[o,a,i],e,l);h=m[0],p=m[1],f=m[2]}else if("same"===e){var v=((h=Math.ceil(t/o))-1)*o+s-t,y=((p=Math.ceil(r/a))-1)*a+u-r,b=((f=Math.ceil(n/i))-1)*i+c-n,T=Math.floor(v/2),w=Math.floor(y/2),_=Math.floor(b/2);d={top:w,bottom:y-w,left:_,right:b-_,front:T,back:v-T,type:"SAME"}}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:d,outDepth:h,outHeight:p,outWidth:f}}(o,p,f,g,k,S,x,N,D,R,s),F=B.padInfo,O=B.outDepth,P=B.outHeight,C=B.outWidth,z=a?w*m:w;return"channelsFirst"===i?l=[h,z,O,P,C]:"channelsLast"===i&&(l=[h,O,P,C,z]),{batchSize:h,dataFormat:i,inDepth:p,inHeight:f,inWidth:g,inChannels:m,outDepth:O,outHeight:P,outWidth:C,outChannels:z,padInfo:F,strideDepth:k,strideHeight:S,strideWidth:x,filterDepth:y,filterHeight:b,filterWidth:T,effectiveFilterDepth:N,effectiveFilterHeight:D,effectiveFilterWidth:R,dilationDepth:A,dilationHeight:M,dilationWidth:I,inShape:e,outShape:l,filterShape:t}}function computeDefaultPad(e,t,r,n){void 0===n&&(n=1);var o=getEffectiveFilterSize(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)}function parseTupleParam(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function parse3TupleParam(e){return"number"==typeof e?[e,e,e]:e}function getEffectiveFilterSize(e,t){return t<=1?e:e+(e-1)*(t-1)}function round$1(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error("Unknown roundingMode ".concat(t))}}function tupleValuesAreOne(e){var t=__read(parseTupleParam(e),3),r=t[0],n=t[1],o=t[2];return 1===r&&1===n&&1===o}function eitherStridesOrDilationsAreOne(e,t){return tupleValuesAreOne(e)||tupleValuesAreOne(t)}function stridesOrDilationsArePositive(e){return parseTupleParam(e).every(function(e){return e>0})}function convertConv2DDataFormat(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error("Unknown dataFormat ".concat(e))}function checkPadOnDimRoundingMode(e,t,r){if(null!=r){if("string"==typeof t)throw Error("Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,"."));if("number"==typeof t)assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")});else if("object"==typeof t)t.forEach(function(t){t.forEach(function(t){assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")})})});else throw Error("Error in ".concat(e,": Unknown padding parameter: ").concat(t))}}var rY=op({reshape_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","reshape","string_or_numeric");return rd.runKernel(e2,{x:r},{shape:t})}}),rX=op({avgPool_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){var a=convertToTensor(e,"x","avgPool","float32");assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in avgPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")});var i=a,s=!1;3===a.rank&&(s=!0,i=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),assert(4===i.rank,function(){return"Error in avgPool: x must be rank 4 but got rank ".concat(i.rank,".")}),checkPadOnDimRoundingMode("avgPool",n,o);var u={x:i},c=rd.runKernel(E,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:o});return(c=rR(c,a.dtype),s)?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),rQ=op({avgPool3d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===a&&(a="NDHWC");var i=convertToTensor(e,"x","avgPool3d","float32"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in avgPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===a,function(){return"Error in avgPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(a)}),assert("number"==typeof r&&r>0||Array.isArray(r)&&r[0]>0&&r[1]>0&&r[2]>0,function(){return"Error in avgPool3d: Stride must be > 0, but got '".concat(r,"'")}),checkPadOnDimRoundingMode("avgPool3d",n,o);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:o,dataFormat:a},d=rd.runKernel(A,c,l);return(d=rR(d,s.dtype),u)?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),r0=op({concat_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0),assert(e.length>=1,function(){return"Pass at least one tensor to concat"});var r=convertToTensorArray(e,"tensors","concat","string_or_numeric");if("complex64"===r[0].dtype&&r.forEach(function(e){if("complex64"!==e.dtype)throw Error("Cannot concatenate complex64 tensors with a tensor\n          with dtype ".concat(e.dtype,". "))}),1===r.length)return rB(r[0]);var n={axis:t};return rd.runKernel(z,r,n)}}),r1=op({matMul_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var o,a=convertToTensor(e,"a","matMul"),i=convertToTensor(t,"b","matMul"),s={a:a=(o=__read(makeTypesMatch(a,i),2))[0],b:i=o[1]},u={transposeA:r,transposeB:n};return rd.runKernel(M,s,u)}}),r2=op({sigmoid_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","sigmoid","float32");return rd.runKernel(ts,{x:t})}}),r3=op({slice_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","slice","string_or_numeric");if(0===n.rank)throw Error("Slicing scalar is not possible");return rd.runKernel(to,{x:n},{begin:t,size:r})}}),r4=op({tanh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","tanh","float32");return rd.runKernel(tS,{x:t})}}),r6=op({basicLSTMCell_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){var i=convertToTensor(e,"forgetBias","basicLSTMCell"),s=convertToTensor(t,"lstmKernel","basicLSTMCell"),u=convertToTensor(r,"lstmBias","basicLSTMCell"),c=convertToTensor(n,"data","basicLSTMCell"),l=convertToTensor(o,"c","basicLSTMCell"),d=rF(r1(r0([c,convertToTensor(a,"h","basicLSTMCell")],1),s),u),h=d.shape[0],p=d.shape[1]/4,f=[h,p],g=r3(d,[0,0],f),m=r3(d,[0,p],f),v=r3(d,[0,2*p],f),y=r3(d,[0,3*p],f),b=rF(rC(r2(g),r4(m)),rC(l,r2(rF(i,v)))),T=rC(r4(b),r2(y));return[b,T]}}),r5=op({batchToSpaceND_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","batchToSpaceND"),o=t.reduce(function(e,t){return e*t});return assert(n.rank>=1+t.length,function(){return"input rank is ".concat(n.rank," but should be > than blockShape.length ").concat(t.length)}),assert(r.length===t.length,function(){return"crops.length is ".concat(r.length," but should be equal to blockShape.length  ").concat(t.length)}),assert(n.shape[0]%o==0,function(){return"input tensor batch is ".concat(n.shape[0]," but is not divisible by the product of ")+"the elements of blockShape ".concat(t.join(" * ")," === ").concat(o)}),rd.runKernel(I,{x:n},{blockShape:t,crops:r})}}),r8=op({batchNorm_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){null==a&&(a=.001);var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");null!=o&&(i=convertToTensor(o,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(c.rank===l.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),assert(null==s||c.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),assert(null==i||c.rank===i.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."});var d={x:0===u.rank||1===u.rank?rY(u,[1,1,1,u.size]):2===u.rank?rY(u,[1,1,u.shape[0],u.shape[1]]):3===u.rank?rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]):u,scale:i,offset:s,mean:c,variance:l},h={varianceEpsilon:a};return rY(rd.runKernel(ed,d,h),u.shape)}}),r7=op({batchNorm2d_:function(e,t,r,n,o,a){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=o&&(i=convertToTensor(o,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(2===u.rank,function(){return"Error in batchNorm2D: x must be rank 2 but got rank "+"".concat(u.rank,".")}),assert(2===c.rank||1===c.rank,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(2===l.rank||1===l.rank,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(2===i.rank||1===i.rank,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(2===s.rank||1===s.rank,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 "+"but got rank ".concat(s.rank,".")}),r8(u,c,l,s,i,a)}}),r9=op({batchNorm3d_:function(e,t,r,n,o,a){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=o&&(i=convertToTensor(o,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(3===u.rank,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+"".concat(u.rank,".")}),assert(3===c.rank||1===c.rank,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(3===l.rank||1===l.rank,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(3===i.rank||1===i.rank,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(3===s.rank||1===s.rank,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 "+"but got rank ".concat(s.rank,".")}),r8(u,c,l,s,i,a)}}),ne=op({batchNorm4d_:function(e,t,r,n,o,a){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=o&&(i=convertToTensor(o,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(4===u.rank,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+"".concat(u.rank,".")}),assert(4===c.rank||1===c.rank,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(4===l.rank||1===l.rank,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(4===i.rank||1===i.rank,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(4===s.rank||1===s.rank,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 "+"but got rank ".concat(s.rank,".")}),r8(u,c,l,s,i,a)}}),nt=op({bincount_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","bincount"),o=convertToTensor(t,"weights","bincount");return assert("int32"===n.dtype,function(){return"Error in bincount: input "+"dtype must be int32, but got ".concat(n.dtype)}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(o.size===n.size||0===o.size,function(){return"Error in bincount: weights must have the same size as input or"+"0-length, but got input shape: ".concat(n.shape,", weights shape: ")+"".concat(o.shape,".")}),rd.runKernel(N,{x:n,weights:o},{size:r})}}),nr=op({bitwiseAnd_:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","bitwiseAnd"),n=convertToTensor(t,"y","bitwiseAnd");if(!arraysEqual(r.shape,n.shape))throw Error("BitwiseAnd: Tensors must have the same shape. x: ".concat(r.shape,", y: ").concat(n.shape));if("int32"!==r.dtype||"int32"!==n.dtype)throw Error("BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ".concat(r.dtype," and type of y: ").concat(n.dtype));return rd.runKernel(D,{a:r,b:n})}}),nn=op({broadcastArgs_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"s0","broadcastArgs","int32"),n=convertToTensor(t,"s1","broadcastArgs","int32");if(1!==r.rank)throw Error("broadcastArgs(): first input must be a vector (rank=1). "+"Has rank ".concat(r.rank));if(1!==n.rank)throw Error("broadcastArgs(): second input must be a vector (rank=1). "+"Has rank ".concat(n.rank));return rd.runKernel(R,{s0:r,s1:n})}}),no=op({broadcastTo_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"broadcastTo","x"),n=r.shape;if(assertNonNegativeIntegerDimensions(t),t.length<r.rank)throw Error("broadcastTo(): shape.length=".concat(t.length," < input.rank=").concat(r.rank,"."));if(t.length>r.rank){for(var o=r.shape.slice();o.length<t.length;)o.unshift(1);r=rY(r,o)}for(var a=r.shape,i=Array.from(t),s=t.length-1;s>=0;s--)if(a[s]===t[s])i[s]=1;else if(1!==r.shape[s])throw Error("broadcastTo(): [".concat(n,"] cannot be broadcast to [").concat(t,"]."));if(0===i.map(function(e,t){return e>1?t:-1}).filter(function(e){return e>=0}).length)return rB(r);var u={x:r};return rd.runKernel(tx,u,{reps:i})}}),na=op({ceil_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","ceil","float32");return rd.runKernel(F,{x:t})}});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e,t,r){assertNonNegativeIntegerDimensions(e),r=r||inferDtype(t);var n={shape:e,value:t,dtype:r};return rd.runKernel(es,{},n)}var ni=op({clipByValue_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","clipByValue");return(assert(t<=r,function(){return"Error in clip: min (".concat(t,") must be ")+"less than or equal to max (".concat(r,").")}),t===r)?fill(n.shape,t,n.dtype):rd.runKernel(O,{x:n},{clipValueMin:t,clipValueMax:r})}}),ns=op({concat1d_:function(e){return r0(e,0)}}),nu=op({concat2d_:function(e,t){return r0(e,t)}}),nc=op({concat3d_:function(e,t){return r0(e,t)}}),nl=op({concat4d_:function(e,t){return r0(e,t)}}),nd=op({conv2d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===o&&(o="NHWC"),void 0===a&&(a=[1,1]);var s=convertToTensor(e,"x","conv2d","float32"),u=convertToTensor(t,"filter","conv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in conv2d: input must be rank 4, but got rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in conv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv2d",n,i);var d="NHWC"===o?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in conv2d: depth of input (".concat(d,") must match ")+"input depth for filter ".concat(u.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(r,a),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(a,"'")}),assert(stridesOrDilationsArePositive(a),function(){return"Error in conv2D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv2D: Strides should be larger than 0."});var h={x:c,filter:u},p={strides:r,pad:n,dataFormat:o,dilations:a,dimRoundingMode:i},f=rd.runKernel(L,h,p);return l?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nh=op({conv1d_:function(e,t,r,n,o,a,i){void 0===o&&(o="NWC"),void 0===a&&(a=1);var s=convertToTensor(e,"x","conv1d"),u=convertToTensor(t,"filter","conv1d"),c=s,l=!1;2===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1]])),assert(3===c.rank,function(){return"Error in conv1d: input must be rank 3, but got rank ".concat(c.rank,".")}),assert(3===u.rank,function(){return"Error in conv1d: filter must be rank 3, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv1d",n,i),assert(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input (".concat(c.shape[2],") must match ")+"input depth for filter ".concat(u.shape[1],".")}),assert(eitherStridesOrDilationsAreOne(r,a),function(){return"Error in conv1D: Either stride or dilation must be 1. "+"Got stride ".concat(r," and dilation '").concat(a,"'")}),assert(stridesOrDilationsArePositive(a),function(){return"Error in conv1D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv1D: Stride should be larger than 0."}),assert("NWC"===o,function(){return"Error in conv1d: got dataFormat of ".concat(o," but only NWC is currently supported.")});var d=rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]),h=nd(rY(c,[c.shape[0],1,c.shape[1],c.shape[2]]),d,[1,r],n,"NHWC",[1,a],i);return l?rY(h,[h.shape[2],h.shape[3]]):rY(h,[h.shape[0],h.shape[2],h.shape[3]])}}),np=op({conv2DBackpropInput_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===a&&(a="NHWC"),assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var s=e,u=t,c=!1;3===t.rank&&(c=!0,u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),assert(4===s.length,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+"".concat(s.length,".")}),assert(4===u.rank,function(){return"Error in conv2dDerInput: dy must be rank 4, but got "+"rank ".concat(u.rank)}),assert(4===r.rank,function(){return"Error in conv2dDerInput: filter must be rank 4, but got "+"rank ".concat(r.rank)});var l="NHWC"===a?s[3]:s[1],d="NHWC"===a?u.shape[3]:u.shape[1];assert(l===r.shape[2],function(){return"Error in conv2dDerInput: depth of input (".concat(l,") must ")+"match input depth for filter ".concat(r.shape[2],".")}),assert(d===r.shape[3],function(){return"Error in conv2dDerInput: depth of output (".concat(d,") must ")+"match output depth for filter ".concat(r.shape[3],".")}),checkPadOnDimRoundingMode("conv2dDerInput",o,i);var h={dy:u,filter:r},p={strides:n,pad:o,dataFormat:a,dimRoundingMode:i,inputShape:s},f=rd.runKernel(W,h,p);return c?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nf=op({conv2dTranspose_:function(e,t,r,n,o,a){return np(r,convertToTensor(e,"x","conv2dTranspose"),convertToTensor(t,"filter","conv2dTranspose"),n,o,"NHWC",a)}}),ng=op({conv3d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===o&&(o="NDHWC"),void 0===a&&(a=[1,1,1]);var i=convertToTensor(e,"x","conv3d"),s=convertToTensor(t,"filter","conv3d"),u=i,c=!1;4===i.rank&&(c=!0,u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===u.rank,function(){return"Error in conv3d: input must be rank 5, but got rank ".concat(u.rank,".")}),assert(5===s.rank,function(){return"Error in conv3d: filter must be rank 5, but got rank "+"".concat(s.rank,".")}),assert(u.shape[4]===s.shape[3],function(){return"Error in conv3d: depth of input (".concat(u.shape[4],") must match ")+"input depth for filter ".concat(s.shape[3],".")}),assert(eitherStridesOrDilationsAreOne(r,a),function(){return"Error in conv3D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(a,"'")}),assert("NDHWC"===o,function(){return"Error in conv3d: got dataFormat of ".concat(o," but only NDHWC is currently supported.")}),assert(stridesOrDilationsArePositive(a),function(){return"Error in conv3D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv3D: Strides should be larger than 0."});var l={x:u,filter:s},d={strides:r,pad:n,dataFormat:o,dilations:a},h=rd.runKernel(U,l,d);return c?rY(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}}),nm=op({conv3DBackpropInput_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var a=e,i=t,s=!1;4===t.rank&&(s=!0,i=rY(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);var u=a[4],c=i.shape[4];assert(5===a.length,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+"".concat(a.length,".")}),assert(5===i.rank,function(){return"Error in conv3dDerInput: dy must be rank 5, but got "+"rank ".concat(i.rank)}),assert(5===r.rank,function(){return"Error in conv3dDerInput: filter must be rank 5, but got "+"rank ".concat(r.rank)}),assert(u===r.shape[3],function(){return"Error in conv3dDerInput: depth of input (".concat(u,") must ")+"match input depth for filter ".concat(r.shape[3],".")}),assert(c===r.shape[4],function(){return"Error in conv3dDerInput: depth of output (".concat(c,") must ")+"match output depth for filter ".concat(r.shape[4],".")});var l={dy:i,filter:r},d={pad:o,strides:n,inputShape:a},h=rd.runKernel(K,l,d);return s?rY(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}}),nv=op({conv3dTranspose_:function(e,t,r,n,o){return nm(r,convertToTensor(e,"x","conv3dTranspose"),convertToTensor(t,"filter","conv3dTranspose"),n,o)}}),ny=op({cos_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","cos","float32");return rd.runKernel("Cos",{x:t})}}),nb=op({cosh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","cosh","float32");return rd.runKernel(q,{x:t})}}),nT=op({cumprod_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var o=convertToTensor(e,"x","cumprod"),a={axis:t,exclusive:r,reverse:n};return rd.runKernel(V,{x:o},a)}}),nw=op({cumsum_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var o=convertToTensor(e,"x","cumsum"),a={axis:t,exclusive:r,reverse:n};return rd.runKernel(H,{x:o},a)}}),n_=op({denseBincount_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n=!1);var o=convertToTensor(e,"x","denseBincount"),a=convertToTensor(t,"weights","denseBincount");assert("int32"===o.dtype,function(){return"Error in denseBincount: input "+"dtype must be int32, but got ".concat(o.dtype)}),assert(o.rank<=2,function(){return"Error in denseBincount: input must be at most rank 2, but got "+"rank ".concat(o.rank,".")}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(a.size===o.size||0===a.size,function(){return"Error in denseBincount: weights must have the same shape as x or "+"0-length, but got x shape: ".concat(o.shape,", weights shape: ")+"".concat(a.shape,".")});var i={size:r,binaryOutput:n};return rd.runKernel(J,{x:o,weights:a},i)}}),nk=op({depthToSpace_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===r&&(r="NHWC");var n=convertToTensor(e,"x","depthToSpace","float32"),o="NHWC"===r?n.shape[1]:n.shape[2],a="NHWC"===r?n.shape[2]:n.shape[3],i="NHWC"===r?n.shape[3]:n.shape[1];assert(t>1,function(){return"blockSize should be > 1 for depthToSpace, but was: ".concat(t)}),assert(o*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(o," and ").concat(t,"  for depthToSpace with input shape\n    ").concat(n.shape)}),assert(a*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(a," and ").concat(t," for depthToSpace with input shape\n        ").concat(n.shape)}),assert(i%(t*t)==0,function(){return"Dimension size must be evenly divisible by ".concat(t*t," but is ").concat(i," for depthToSpace with input shape ").concat(n.shape)});var s={blockSize:t,dataFormat:r};return rd.runKernel($,{x:n},s)}}),nS=op({depthwiseConv2d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===o&&(o="NHWC"),void 0===a&&(a=[1,1]);var s=convertToTensor(e,"x","depthwiseConv2d","float32"),u=convertToTensor(t,"filter","depthwiseConv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")});var d="NHWC"===o?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels "+"(".concat(d,") must match the inChannels dimension in ")+"filter ".concat(u.shape[2],".")}),checkPadOnDimRoundingMode("depthwiseConv2d",n,i);var h={x:c,filter:u},p={strides:r,pad:n,dataFormat:o,dilations:a,dimRoundingMode:i},f=rd.runKernel(Z,h,p);return l?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nx=op({diag_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","diag");return rd.runKernel(Q,{x:t})}}),nE=op({dilation2d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===o&&(o=[1,1]),void 0===a&&(a="NHWC");var i=convertToTensor(e,"x","dilation2d"),s=convertToTensor(t,"filter","dilation2d");assert(3===i.rank||4===i.rank,function(){return"Error in dilation2d: input must be rank 3 or 4, but got rank "+"".concat(i.rank,".")}),assert(3===s.rank,function(){return"Error in dilation2d: filter must be rank 3, but got rank "+"".concat(s.rank,".")}),assert("NHWC"===a,function(){return"Error in dilation2d: Only NHWC is currently supported, "+"but got dataFormat of ".concat(a)});var u=i,c=!1;3===i.rank&&(u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),assert(u.shape[3]===s.shape[2],function(){return"Error in dilation2d:  input and filter must have the same depth: ".concat(u.shape[3]," vs ").concat(s.shape[2])});var l={x:u,filter:s},d={strides:r,pad:n,dilations:o},h=rd.runKernel(ee,l,d);return c?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getBroadcastDims(e,t){for(var r=e.length,n=[],o=0;o<r;o++){var a=r-1-o,i=e[a]||1;(t[t.length-1-o]||1)>1&&1===i&&n.unshift(a)}return n}function getReductionAxes(e,t){for(var r=[],n=0;n<t.length;n++){var o=e[e.length-n-1],a=t.length-n-1,i=t[a];(null==o||1===o&&i>1)&&r.unshift(a)}return r}function assertAndGetBroadcastShape(e,t){for(var r=Math.max(e.length,t.length),n=Array(r),o=0;o<r;o++){var a=e[e.length-o-1];null==a&&(a=1);var i=t[t.length-o-1];if(null==i&&(i=1),1===a)n[r-o-1]=i;else if(1===i)n[r-o-1]=a;else if(a!==i)throw Error("Operands could not be broadcast together with shapes "+"".concat(e," and ").concat(t,"."));else n[r-o-1]=a}return n}var nA=op({equal_:function(e,t){var r,n=convertToTensor(e,"a","equal","string_or_numeric"),o=convertToTensor(t,"b","equal","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eo,a)}}),nM=op({where_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(t,"a","where"),o=convertToTensor(r,"b","where"),a=convertToTensor(e,"condition","where","bool"),i=assertAndGetBroadcastShape(assertAndGetBroadcastShape(a.shape,n.shape),o.shape),s=no(a,i),u=no(n,i),c=no(o,i);return rd.runKernel(tr,{condition:s,t:u,e:c})}}),nI=op({zerosLike_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","zerosLike");return rd.runKernel(tR,{x:t})}}),nN=op({divNoNan_:function(e,t){var r,n=convertToTensor(e,"a","div"),o=convertToTensor(t,"b","div"),a=rP(n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1]),i=nI(a);return nM(nA(o,i),i,a)}}),nD=op({dot_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"t1","dot"),n=convertToTensor(t,"t2","dot");assert((1===r.rank||2===r.rank)&&(1===n.rank||2===n.rank),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")});var o=1===r.rank?r.size:r.shape[1],a=1===n.rank?n.size:n.shape[0];if(assert(o===a,function(){return"Error in dot: inner dimensions of inputs must match, but got "+"".concat(o," and ").concat(a,".")}),1===r.rank&&1===n.rank){var i=rY(r,[1,-1]),s=rY(n,[-1,1]),u=r1(i,s);return rY(u,[])}if(1===r.rank&&2===n.rank){var i=rY(r,[1,-1]),s=rY(n,[n.shape[0],n.shape[1]]),u=r1(i,s);return rY(u,[u.size])}if(2===r.rank&&1===n.rank){var s=rY(n,[-1,1]),u=r1(r,s);return rY(u,[u.size])}var s=rY(n,[n.shape[0],n.shape[1]]),u=r1(r,s);return u}}),nR=op({einsum_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"einsum")});return rd.runKernel(en,n,{equation:e})}}),nB=op({elu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","elu","float32");return rd.runKernel("Elu",{x:t})}}),nF=op({ensureShape_:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","ensureShape","string_or_numeric");if(!arraysEqualWithNull(r.shape,t))throw Error("EnsureShape: Shape of tensor ".concat(r.shape," is not compatible with expected shape ").concat(t));return e}}),nO=op({erf_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","erf");assert("int32"===t.dtype||"float32"===t.dtype,function(){return"Input dtype must be `int32` or `float32`."}),"int32"===t.dtype&&(t=rR(t,"float32"));var r={x:t};return rd.runKernel("Erf",r)}});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function axesAreInnerMostDims(e,t){for(var r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0}function combineLocations(e,t,r){for(var n=e.length+t.length,o=[],a=0,i=0,s=0;s<n;s++)-1===r.indexOf(s)?o.push(e[a++]):o.push(t[i++]);return o}function expandShapeToKeepDim(e,t){return combineLocations(e,t.map(function(e){return 1}),t)}var nP=op({max_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","max"),o={reductionIndices:t,keepDims:r};return rd.runKernel("Max",{x:n},o)}}),nC=op({min_:/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","min"),o={axis:t,keepDims:r};return rd.runKernel("Min",{x:n},o)}}),nz=op({pow_:function(e,t){var r,n=convertToTensor(e,"base","pow"),o=convertToTensor(t,"exp","pow"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel("Pow",a)}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function scalar(e,t){if((isTypedArray(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&isTypedArray(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return makeTensor(e,[],[],t)}var nL=op({sqrt_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","sqrt","float32");return rd.runKernel(tc,{x:t})}}),nG=op({square_:/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","square");return rd.runKernel("Square",{x:t},{})}}),nW=op({sum_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","sum");"bool"===n.dtype&&(n=rR(n,"int32"));var o={x:n},a={axis:t,keepDims:r};return rd.runKernel("Sum",o,a)}}),nU=op({norm_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===t&&(t="euclidean"),void 0===r&&(r=null),void 0===n&&(n=!1);var o=function normImpl(e,t,r){if(void 0===r&&(r=null),0===e.rank)return rz(e);if(1!==e.rank&&null===r)return normImpl(rY(e,[-1]),t,r);if(1===e.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===t)return nW(rz(e),r);if(t===1/0)return nP(rz(e),r);if(t===-1/0)return nC(rz(e),r);if("euclidean"===t||2===t)return nL(nW(nz(rz(e),scalar(2,"int32")),r));throw Error("Error in norm: invalid ord value: ".concat(t))}if(Array.isArray(r)&&2===r.length){if(1===t)return nP(nW(rz(e),r[0]),r[1]-1);if(t===1/0)return nP(nW(rz(e),r[1]),r[0]);if(t===-1/0)return nC(nW(rz(e),r[1]),r[0]);if("fro"===t||"euclidean"===t)return nL(nW(nG(e),r));throw Error("Error in norm: invalid ord value: ".concat(t))}throw Error("Error in norm: invalid axis: ".concat(r))}(e=convertToTensor(e,"x","norm"),t,r),a=o.shape;if(n){var i=parseAxisParam(r,e.shape);a=expandShapeToKeepDim(o.shape,i)}return rY(o,a)}}),nK=op({euclideanNorm_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){return void 0===t&&(t=null),void 0===r&&(r=!1),nU(e,"euclidean",t,r)}}),nq=op({exp_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","exp");return rd.runKernel("Exp",{x:t})}}),nV=op({expandDims_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","expandDims","string_or_numeric");assert(t<=r.rank,function(){return"Axis must be <= rank of the tensor"});var n={dim:t};return rd.runKernel(ea,{input:r},n)}}),nH=op({expm1_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","expm1");return rd.runKernel(ei,{x:t})}}),nj=op({tile_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","tile","string_or_numeric");return assert(r.rank===t.length,function(){return"Error in transpose: rank of input ".concat(r.rank," ")+"must match length of reps ".concat(t,".")}),rd.runKernel(tx,{x:r},{reps:t})}}),nJ=op({eye_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n="float32"),null==t&&(t=e);for(var o=buffer([e,t],n),a=e<=t?e:t,i=0;i<a;++i)o.set(1,i,i);var s=rY(o.toTensor(),[e,t]);if(null==r)return s;if(1===r.length)return nj(nV(s,0),[r[0],1,1]);if(2===r.length)return nj(nV(nV(s,0),0),[r[0],r[1],1,1]);if(3===r.length)return nj(nV(nV(nV(s,0),0),0),[r[0],r[1],r[2],1,1]);throw Error("eye() currently supports only 1D and 2D "+"batchShapes, but received ".concat(r.length,"D."))}}),n$=op({floor_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","floor","float32");return rd.runKernel(ec,{x:t})}}),nZ=op({gather_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=0);var o=convertToTensor(e,"x","gather"),a=convertToTensor(t,"indices","gather","int32"),i={axis:r,batchDims:n};return rd.runKernel(eh,{x:o,indices:a},i)}}),nY=op({greater_:function(e,t){var r,n=convertToTensor(e,"a","greater","string_or_numeric"),o=convertToTensor(t,"b","greater","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(ef,a)}}),nX=op({greaterEqual_:function(e,t){var r,n=convertToTensor(e,"a","greaterEqual","string_or_numeric"),o=convertToTensor(t,"b","greaterEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eg,a)}}),nQ=op({imag_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"input","imag");return rd.runKernel(ey,{input:t})}}),n0=op({isFinite_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","isFinite");return rd.runKernel(eb,{x:t})}}),n1=op({isInf_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","isInf");return rd.runKernel(eT,{x:t})}}),n2=op({isNaN_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","isNaN");return rd.runKernel(ew,{x:t})}}),n3=op({leakyRelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=.2);var r=convertToTensor(e,"x","leakyRelu"),n={alpha:t};return rd.runKernel(e_,{x:r},n)}}),n4=op({less_:function(e,t){var r,n=convertToTensor(e,"a","less","string_or_numeric"),o=convertToTensor(t,"b","less","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(ek,a)}}),n6=op({lessEqual_:function(e,t){var r,n=convertToTensor(e,"a","lessEqual","string_or_numeric"),o=convertToTensor(t,"b","lessEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eS,a)}}),n5=op({localResponseNormalization_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===t&&(t=5),void 0===r&&(r=1),void 0===n&&(n=1),void 0===o&&(o=.5);var a=convertToTensor(e,"x","localResponseNormalization");assert(4===a.rank||3===a.rank,function(){return"Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank ".concat(a.rank,".")}),assert(isInt(t),function(){return"Error in localResponseNormalization: depthRadius must be an "+"integer but got depthRadius ".concat(t,".")});var i=a,s=!1;3===a.rank&&(s=!0,i=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]]));var u={x:i},c={depthRadius:t,bias:r,alpha:n,beta:o},l=rd.runKernel("LRN",u,c);return s?rY(l,[l.shape[1],l.shape[2],l.shape[3]]):l}}),n8=op({log_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","log","float32");return rd.runKernel("Log",{x:t})}}),n7=op({log1p_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","log1p");return rd.runKernel(eE,{x:t})}});function variableGrads(e,t){assert(isFunction(e),function(){return"The f passed in variableGrads(f) must be a function"}),assert(null==t||Array.isArray(t)&&t.every(function(e){return e instanceof rs}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var r=null!=t;if(!r)for(var n in t=[],rd.registeredVariables)t.push(rd.registeredVariables[n]);var o=r?t.filter(function(e){return!e.trainable}):null,a=t.length;assert((t=t.filter(function(e){return e.trainable})).length>0,function(){return"variableGrads() expects at least one of the input variables to "+"be trainable, but none of the ".concat(a," variables is ")+"trainable."});var i=rd.gradients(e,t,null,!0),s=i.value,u=i.grads;assert(u.some(function(e){return null!=e}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),assert(0===s.rank,function(){return"The f passed in variableGrads(f) must return a scalar, but it "+"returned a rank-".concat(s.rank," tensor")});var c={};return t.forEach(function(e,t){null!=u[t]&&(c[e.name]=u[t])}),null!=o&&o.forEach(function(e){return c[e.name]=null}),{value:s,grads:c}}function customGrad(e){return rd.customGrad(e)}function checkGrads(e){if(e.filter(function(e){return null==e}).length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")}var n9=op({neg_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","neg");return rd.runKernel("Neg",{x:t})}}),oe=op({softplus_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","softplus");return rd.runKernel(tu,{x:t})}}),ot=op({logSigmoid_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","logSigmoid");return customGrad(function(e){return{value:n9(oe(n9(e))),gradFunc:function(t){return rC(t,r2(n9(e)))}}})(t)}}),or=op({sub_:function(e,t){var r,n=convertToTensor(e,"a","sub"),o=convertToTensor(t,"b","sub"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel("Sub",a)}}),on=op({logSoftmax_:function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","logSoftmax");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and axis was ").concat(t));return customGrad(function(e,r){var n=nP(e,t,!0),o=or(e,n),a=or(rR(o,"float32"),n8(nW(nq(o),t,!0)));return r([a]),{value:a,gradFunc:function(e,r){var n=nq(__read(r,1)[0]);return or(e,rC(nW(e,t,!0),n))}}})(r)}}),oo=op({logSumExp_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","logSumExp"),o=parseAxisParam(t,n.shape),a=nP(n,o,!0),i=n8(nW(nq(or(n,a)),o)),s=rF(rY(a,i.shape),i);if(r){var u=expandShapeToKeepDim(s.shape,o);return rY(s,u)}return s}}),oa=op({logicalAnd_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"a","logicalAnd","bool"),n=convertToTensor(t,"b","logicalAnd","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(eA,{a:r,b:n})}}),oi=op({logicalNot_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","logicalNot","bool");return rd.runKernel(eM,{x:t})}}),os=op({logicalOr_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"a","logicalOr","bool"),n=convertToTensor(t,"b","logicalOr","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(eI,{a:r,b:n})}}),ou=op({logicalXor_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"a","logicalXor","bool"),n=convertToTensor(t,"b","logicalXor","bool");return assertAndGetBroadcastShape(r.shape,n.shape),oa(os(e,t),oi(oa(e,t)))}}),oc=op({searchSorted_:function(e,t,r){void 0===r&&(r="left");var n=convertToTensor(e,"sortedSequence","searchSorted"),o=convertToTensor(t,"values","searchSorted"),a=n.shape[n.shape.length-1],i=o.shape[o.shape.length-1],s=rY(n,[-1,a]),u=rY(o,[-1,i]);if(s.rank<2)throw Error("Sorted input argument must be at least 2-dimensional");if(s.shape[0]!==u.shape[0])throw Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(sizeFromShape(u.shape)>=2147483648)throw Error("values tensor size must less than ".concat(2147483648));if(s.shape[1]>=2147483648)throw Error("trailing dim_size must less than ".concat(2147483648," for int32 output type, was ").concat(s.shape[1]));var c={side:r};return rd.runKernel(tt,{sortedSequence:s,values:u},c)}}),ol=op({maxPool_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){var a=convertToTensor(e,"x","maxPool"),i=a,s=!1;3===a.rank&&(s=!0,i=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),assert(4===i.rank,function(){return"Error in maxPool: input must be rank 4 but got rank ".concat(i.rank,".")}),assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in maxPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")}),checkPadOnDimRoundingMode("maxPool",n,o);var u={x:i},c=rd.runKernel(eD,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:o});return s?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),od=op({maxPool3d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===t&&(t=[1,1,1]),void 0===a&&(a="NDHWC");var i=convertToTensor(e,"x","maxPool3d"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in maxPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===a,function(){return"Error in maxPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(a)}),checkPadOnDimRoundingMode("maxPool3d",n,o);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:o,dataFormat:a},d=rd.runKernel(eR,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),oh=op({maxPoolWithArgmax_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===o&&(o=!1);var a=convertToTensor(e,"x","maxPoolWithArgmax"),i={filterSize:t,strides:r,pad:n,includeBatchInIndex:o},s=rd.runKernel(eB,{x:a},i);return{result:s[0],indexes:s[1]}}}),of=op({maximum_:function(e,t){var r,n=convertToTensor(e,"a","maximum"),o=convertToTensor(t,"b","maximum");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],"bool"===n.dtype&&(n=rR(n,"int32"),o=rR(o,"int32")),assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eN,a)}}),og=op({mean_:/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","mean"),o={axis:t,keepDims:r};return rd.runKernel(eF,{x:n},o)}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zeros(e,t){if(void 0===t&&(t="float32"),assertNonNegativeIntegerDimensions(e),"complex64"===t)return rf(zeros(e,"float32"),zeros(e,"float32"));var r=makeZerosTypedArray(sizeFromShape(e),t);return rd.makeTensor(r,e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ones(e,t){if(void 0===t&&(t="float32"),assertNonNegativeIntegerDimensions(e),"complex64"===t)return rf(ones(e,"float32"),zeros(e,"float32"));var r=makeOnesTypedArray(sizeFromShape(e),t);return rd.makeTensor(r,e,t)}var om=op({minimum_:function(e,t){var r,n=convertToTensor(e,"a","minimum"),o=convertToTensor(t,"b","minimum");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],"bool"===n.dtype&&(n=rR(n,"int32"),o=rR(o,"int32")),assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eO,a)}}),ov=op({mirrorPad_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){assert("reflect"===r||"symmetric"===r,function(){return"Invalid mode. Mode must be either reflect or symmetric. "+"Got ".concat(r,".")});var n=convertToTensor(e,"x","mirrorPad");if(0===n.rank)throw Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");assert(t.length===n.rank,function(){return"Padding doesn't match input. Must be ".concat(n.rank,". ")+"Got ".concat(t.length,".")});for(var o="reflect"===r?1:0,_loop_1=function(e){assert(2===t[e].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),assert(t[e][0]>=0&&t[e][0]<=n.shape[e]-o&&t[e][1]>=0&&t[e][1]<=n.shape[e]-o,function(){return"Padding in dimension ".concat(e," cannot be greater than or equal ")+"to ".concat(n.shape[e]-o," or less than 0 for input of ")+"shape ".concat(n.shape)})},a=0;a<n.rank;a++)_loop_1(a);return rd.runKernel(eP,{x:n},{paddings:t,mode:r})}}),oy=op({mod_:function(e,t){var r,n=convertToTensor(e,"a","mod"),o=convertToTensor(t,"b","mod"),a={a:n=(r=__read(makeTypesMatch(n,o),2))[0],b:o=r[1]};return rd.runKernel("Mod",a)}}),ob=op({moments_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=parseAxisParam(t,(e=convertToTensor(e,"x","moments")).shape),o=og(e,n,r),a=o.shape;r||(a=expandShapeToKeepDim(o.shape,n));var i=og(nG(or(rR(e,"float32"),rY(o,a))),n,r);return{mean:o,variance:i}}}),oT=op({multiRNNCell_:function(e,t,r,n){for(var o=convertToTensor(t,"data","multiRNNCell"),a=convertToTensorArray(r,"c","multiRNNCell"),i=convertToTensorArray(n,"h","multiRNNCell"),s=o,u=[],c=0;c<e.length;c++){var l=e[c](s,a[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}for(var d=[],h=[],c=0;c<u.length;c+=2)d.push(u[c]),h.push(u[c+1]);return[d,h]}}),ow=op({multinomial_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n=!1);var o=convertToTensor(e,"logits","multinomial"),a=o.size,i=o.rank;if(a<2)throw Error("Error in multinomial: you need at least 2 outcomes, but got "+"".concat(a,"."));if(i>2)throw Error("Rank of probabilities must be 1 or 2, but is ".concat(i));r=r||Math.random();var s=1===i?rY(o,[1,-1]):o,u={numSamples:t,seed:r,normalized:n},c=rd.runKernel(eC,{logits:s},u);return 1===i?rY(c,[c.size]):c}}),o_=op({notEqual_:function(e,t){var r,n=convertToTensor(e,"a","notEqual","string_or_numeric"),o=convertToTensor(t,"b","notEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(eL,a)}}),ok=op({oneHot_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){if(void 0===r&&(r=1),void 0===n&&(n=0),void 0===o&&(o="int32"),t<2)throw Error("Error in oneHot: depth must be >=2, but it is ".concat(t));var a=convertToTensor(e,"indices","oneHot","int32"),i={dtype:o,depth:t,onValue:r,offValue:n};return rd.runKernel(eq,{indices:a},i)}}),oS=op({onesLike_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","onesLike");return rd.runKernel(eK,{x:t})}}),ox=op({outerProduct_:function(e,t){var r=convertToTensor(e,"v1","outerProduct"),n=convertToTensor(t,"v2","outerProduct");return assert(1===r.rank&&1===n.rank,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")}),r1(rY(r,[-1,1]),rY(n,[1,-1]))}}),oE=op({pad_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","pad");if(0===n.rank)throw Error("pad(scalar) is not defined. Pass non-scalar to pad");var o={paddings:t,constantValue:r};return rd.runKernel(eH,{x:n},o)}}),oA=op({pad1d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length,function(){return"Invalid number of paddings. Must be length of 2."}),oE(e,[t],r)}}),oM=op({pad2d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length&&2===t[0].length&&2===t[1].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),oE(e,t,r)}}),oI=op({pad3d_:function(e,t,r){return void 0===r&&(r=0),assert(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),oE(e,t,r)}}),oN=op({pad4d_:function(e,t,r){return void 0===r&&(r=0),assert(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),oE(e,t,r)}}),oD=op({spaceToBatchND_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","spaceToBatchND");return assert(n.rank>=1+t.length,function(){return"input rank ".concat(n.rank," should be > than [blockShape] ").concat(t.length)}),assert(r.length===t.length,function(){return"paddings.shape[0] ".concat(r.length," must be equal to [blockShape] ").concat(t.length)}),assert(n.shape.reduce(function(e,n,o){return o>0&&o<=t.length?e&&(n+r[o-1][0]+r[o-1][1])%t[o-1]==0:e},!0),function(){return"input spatial dimensions ".concat(n.shape.slice(1)," with paddings ").concat(r.toString()," must be divisible by blockShapes ").concat(t.toString())}),rd.runKernel(tl,{x:n},{blockShape:t,paddings:r})}}),oR=op({pool_:function(e,t,r,n,o,a,i){null==o&&(o=[1,1]),null==a&&(a=1),0===n&&(n="valid");var s,u,c,l,d,h,p,f,g,m,v=convertToTensor(e,"x","maxPool"),y=v,b=!1;3===v.rank&&(b=!0,y=rY(v,[1,v.shape[0],v.shape[1],v.shape[2]])),assert(eitherStridesOrDilationsAreOne(a,o),function(){return"Error in pool: Either strides or dilations must be 1. "+"Got strides ".concat(a," and dilations '").concat(o,"'")});var T=computePool2DInfo(y.shape,t,a,o,n),w=[T.dilationHeight,T.dilationWidth];m="same"===n?(u=(s=[T.filterHeight,T.filterWidth].map(function(e,t){return e+(e-1)*(w[t]-1)}).map(function(e){return e-1})).map(function(e){return Math.floor(e/2)}),c=s.map(function(e,t){return e-u[t]}),s.map(function(e,t){return[u[t],c[t]]})):[[0,0],[0,0]];var _=1===w[0]&&1===w[1],k=__read((l=[T.inHeight,T.inWidth],d=m.map(function(e){return e[0]}),p=l.concat(d,h=m.map(function(e){return e[1]})),f=w.map(function(e,t){return(e-p[t]%e)%e}),g=h.map(function(e,t){return e+f[t]}),[w.map(function(e,t){return[d[t],g[t]]}),w.map(function(e,t){return[0,f[t]]})]),2),S=k[0],x=k[1],E=_?n:"valid",A=_?y:oD(y,w,S),M=("avg"===r?function(){return rX(A,t,a,E,i)}:function(){return ol(A,t,a,E,i)})(),I=_?M:r5(M,w,x);return b?rY(I,[I.shape[1],I.shape[2],I.shape[3]]):I}}),oB=op({prelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","prelu"),n=convertToTensor(t,"alpha","prelu");return rd.runKernel(ej,{x:r,alpha:n})}}),oF=op({prod_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","prod");"bool"===n.dtype&&(n=rR(n,"int32"));var o={x:n},a={axis:t,keepDims:r};return rd.runKernel(eJ,o,a)}}),oO=op({raggedGather_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){var o=e.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedGather","int32")}),a=convertToTensor(t,"paramsDenseValues","raggedGather"),i=convertToTensor(r,"indices","raggedGather","int32"),s=rd.runKernel(e$,{paramsNestedSplits:o,paramsDenseValues:a,indices:i},{outputRaggedRank:n});return{outputNestedSplits:s.slice(0,s.length-1),outputDenseValues:s[s.length-1]}}}),oP=op({raggedRange_:/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"starts","raggedRange"),o=convertToTensor(t,"limits","raggedRange",n.dtype),a=convertToTensor(r,"deltas","raggedRange",n.dtype),i=rd.runKernel(eZ,{starts:n,limits:o,deltas:a});return{rtNestedSplits:i[0],rtDenseValues:i[1]}}}),oC=op({raggedTensorToTensor_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){var a=convertToTensor(e,"shape","raggedTensorToTensor","int32"),i=convertToTensor(t,"values","raggedTensorToTensor"),s=convertToTensor(r,"defaultValue","raggedTensorToTensor",i.dtype),u=n.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedTensorToTensor","int32")});return rd.runKernel(eY,{shape:a,values:i,defaultValue:s,rowPartitionTensors:u},{rowPartitionTypes:o})}}),oz=op({rand_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){assertNonNegativeIntegerDimensions(e);var n=sizeFromShape(e),o=null;if(null==r||"float32"===r)o=new Float32Array(n);else if("int32"===r)o=new Int32Array(n);else if("bool"===r)o=new Uint8Array(n);else throw Error("Unknown data type ".concat(r));for(var a=0;a<n;a++)o[a]=t();return rd.makeTensor(o,e,r)}}),oL={exports:{}};!function(e,t,r){function Alea(e){var t,r=this,n=(t=4022871197,function(e){e=String(e);for(var r=0;r<e.length;r++){var n=.02519603282416938*(t+=e.charCodeAt(r));t=n>>>0,n-=t,n*=t,t=n>>>0,n-=t,t+=4294967296*n}return(t>>>0)*23283064365386963e-26});r.next=function(){var e=2091639*r.s0+23283064365386963e-26*r.c;return r.s0=r.s1,r.s1=r.s2,r.s2=e-(r.c=0|e)},r.c=1,r.s0=n(" "),r.s1=n(" "),r.s2=n(" "),r.s0-=n(e),r.s0<0&&(r.s0+=1),r.s1-=n(e),r.s1<0&&(r.s1+=1),r.s2-=n(e),r.s2<0&&(r.s2+=1)}function copy(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function impl(e,t){var r=new Alea(e),n=t&&t.state,o=r.next;return o.int32=function(){return 4294967296*r.next()|0},o.double=function(){return o()+(2097152*o()|0)*11102230246251565e-32},o.quick=o,n&&("object"==typeof n&&copy(n,r),o.state=function(){return copy(r,{})}),o}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.alea=impl}(0,oL,!1);var oG=oL.exports,oW={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor128=impl}(0,oW,!1);var oU=oW.exports,oK={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),n==r.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorwow=impl}(0,oK,!1);var oq=oK.exports,oV={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.x,o=t.i;return e=n[o],e^=e>>>7,r=e^e<<24^((e=n[o+1&7])^e>>>10)^((e=n[o+3&7])^e>>>3)^((e=n[o+4&7])^e<<7),e=n[o+7&7],e^=e<<13,r^=e^e<<9,n[o]=r,t.i=o+1&7,r},function(e,t){var r,n=[];if(t===(0|t))n[0]=t;else for(r=0,t=""+t;r<t.length;++r)n[7&r]=n[7&r]<<15^t.charCodeAt(r)+n[r+1&7]<<13;for(;n.length<8;)n.push(0);for(r=0;r<8&&0===n[r];++r);for(8==r?n[7]=-1:n[r],e.x=n,e.i=0,r=256;r>0;--r)e.next()}(t,e)}function copy(e,t){return t.x=e.x.slice(),t.i=e.i,t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.x&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorshift7=impl}(0,oV,!1);var oH=oV.exports,oj={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.w,o=t.X,a=t.i;return t.w=n=n+1640531527|0,r=o[a+34&127],e=o[a=a+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,r=o[a]=r^e,t.i=a,r+(n^n>>>16)|0},function(e,t){var r,n,o,a,i,s=[],u=128;for(t===(0|t)?(n=t,t=null):(t+="\x00",n=0,u=Math.max(u,t.length)),o=0,a=-32;a<u;++a)t&&(n^=t.charCodeAt((a+32)%t.length)),0===a&&(i=n),n^=n<<10,n^=n>>>15,n^=n<<4,n^=n>>>13,a>=0&&(i=i+1640531527|0,o=0==(r=s[127&a]^=n+i)?o+1:0);for(o>=128&&(s[127&(t&&t.length||0)]=-1),o=127,a=512;a>0;--a)n=s[o+34&127],r=s[o=o+1&127],n^=n<<13,r^=r<<17,n^=n>>>15,r^=r>>>12,s[o]=n^r;e.w=i,e.X=s,e.i=o}(t,e)}function copy(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.X&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor4096=impl}(0,oj,!1);var oJ=oj.exports,o$={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.b,r=t.c,n=t.d,o=t.a;return e=e<<25^e>>>7^r,r=r-n|0,n=n<<24^n>>>8^o,o=o-e|0,t.b=e=e<<20^e>>>12^r,t.c=r=r-n|0,t.d=n<<16^r>>>16^o,t.a=o-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):r+=e;for(var n=0;n<r.length+20;n++)t.b^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.tychei=impl}(0,o$,!1);var oZ=o$.exports,oY={exports:{}};!function(e){!function(t,n,o){var a,i="random",s=o.pow(256,6),u=o.pow(2,52),c=2*u;function seedrandom(e,r,l){var d=[],h=mixkey(function flatten(e,t){var r,n=[],o=typeof e;if(t&&"object"==o)for(r in e)try{n.push(flatten(e[r],t-1))}catch(e){}return n.length?n:"string"==o?e:e+"\x00"}((r=!0==r?{entropy:!0}:r||{}).entropy?[e,tostring(n)]:null==e?function(){try{var e;return a&&(e=a.randomBytes)?e=e(256):(e=new Uint8Array(256),(t.crypto||t.msCrypto).getRandomValues(e)),tostring(e)}catch(e){var r=t.navigator,o=r&&r.plugins;return[+new Date,t,o,t.screen,tostring(n)]}}():e,3),d),p=new ARC4(d),prng=function(){for(var e=p.g(6),t=s,r=0;e<u;)e=(e+r)*256,t*=256,r=p.g(1);for(;e>=c;)e/=2,t/=2,r>>>=1;return(e+r)/t};return prng.int32=function(){return 0|p.g(4)},prng.quick=function(){return p.g(4)/4294967296},prng.double=prng,mixkey(tostring(p.S),n),(r.pass||l||function(e,t,r,n){return(n&&(n.S&&copy(n,p),e.state=function(){return copy(p,{})}),r)?(o[i]=e,t):e})(prng,h,"global"in r?r.global:this==o,r.state)}function ARC4(e){var t,r=e.length,n=this,o=0,a=n.i=n.j=0,i=n.S=[];for(r||(e=[r++]);o<256;)i[o]=o++;for(o=0;o<256;o++)i[o]=i[a=255&a+e[o%r]+(t=i[o])],i[a]=t;(n.g=function(e){for(var t,r=0,o=n.i,a=n.j,i=n.S;e--;)t=i[o=255&o+1],r=256*r+i[255&(i[o]=i[a=255&a+t])+(i[a]=t)];return n.i=o,n.j=a,r})(256)}function copy(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function mixkey(e,t){for(var r,n=e+"",o=0;o<n.length;)t[255&o]=255&(r^=19*t[255&o])+n.charCodeAt(o++);return tostring(t)}function tostring(e){return String.fromCharCode.apply(0,e)}if(mixkey(o.random(),n),e.exports){e.exports=seedrandom;try{a=r(6113)}catch(e){}}else o["seed"+i]=seedrandom}("undefined"!=typeof self?self:tW,[],Math)}(oY);var oX=oY.exports;function testEpsilon(){return 32===rd.backend.floatPrecision()?.001:.1}function expectArraysPredicate(e,t,r){var n=!0;if((isTypedArray(e)||isTypedArray(t))&&(n=!1),isTypedArray(e)&&isTypedArray(t)&&(n=!0),n){var o=e.constructor.name,a=t.constructor.name;if(o!==a)throw Error("Arrays are of different type. Actual: ".concat(o,". ")+"Expected: ".concat(a))}if(Array.isArray(e)&&Array.isArray(t)){var i=inferShape(e),s=inferShape(t);if(!arraysEqual(i,s))throw Error("Arrays have different shapes. "+"Actual: [".concat(i,"]. Expected: [").concat(s,"]"))}var u=isTypedArray(e)?e:flatten(e),c=isTypedArray(t)?t:flatten(t);if(u.length!==c.length)throw Error("Arrays have different lengths actual: ".concat(u.length," vs ")+"expected: ".concat(c.length,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."));for(var l=0;l<c.length;++l){var d=u[l],h=c[l];if(!r(d,h))throw Error("Arrays differ: actual[".concat(l,"] = ").concat(d,", expected[").concat(l,"] = ").concat(h,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."))}"undefined"!=typeof expect&&expect().nothing()}function areClose(e,t,r){return!(isFinite(e)||isFinite(t))||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>r)}oX.alea=oG,oX.xor128=oU,oX.xorwow=oq,oX.xorshift7=oH,oX.xor4096=oJ,oX.tychei=oZ;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var oQ=function(){function MPRandGauss(e,t,r,n,o){this.mean=e,this.stdDev=t,this.dtype=r,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var a=o||Math.random();this.random=oX.alea(a.toString())}return MPRandGauss.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var e,t,r=this.nextVal;return this.nextVal=NaN,r}for(var n=!1;!n;){var o=void 0,a=void 0,i=void 0;do i=(o=2*this.random()-1)*o+(a=2*this.random()-1)*a;while(i>=1||0===i);var s=Math.sqrt(-2*Math.log(i)/i);e=this.mean+this.stdDev*o*s,t=this.mean+this.stdDev*a*s,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)},MPRandGauss.prototype.convertValue=function(e){return null==this.dtype||"float32"===this.dtype?e:Math.round(e)},MPRandGauss.prototype.isValidTruncated=function(e){return e<=this.upper&&e>=this.lower},MPRandGauss}(),o0=function(){function RandGamma(e,t,r,n){this.alpha=e,this.beta=1/t,this.dtype=r;var o=n||Math.random();this.randu=oX.alea(o.toString()),this.randn=new oQ(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}return RandGamma.prototype.nextValue=function(){for(var e,t,r,n,o,a;;){do n=this.randn.nextValue(),a=1+this.c*n;while(a<=0);if(a*=a*a,t=1-.331*(e=n*n)*e,r=.5*e+this.d*(1-a+Math.log(a)),(o=this.randu())<t||Math.log(o)<r)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(a)},RandGamma.prototype.convertValue=function(e){return"float32"===this.dtype?e:Math.round(e)},RandGamma}(),o1=function(){function UniformRandom(e,t,r,n){void 0===e&&(e=0),void 0===t&&(t=1);var o=this;if(this.canReturnFloat=function(){return null==o.dtype||"float32"===o.dtype},this.min=e,this.range=t-e,this.dtype=r,null==n&&(n=Math.random()),"number"==typeof n&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw Error("The difference between ".concat(e," - ").concat(t," <= 1 and dtype is not float"));this.random=oX.alea(n)}return UniformRandom.prototype.convertValue=function(e){return this.canReturnFloat()?e:Math.round(e)},UniformRandom.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},UniformRandom}(),o2=op({randomGamma_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){if(void 0===r&&(r=1),void 0===n&&(n="float32"),assertNonNegativeIntegerDimensions(e),null==r&&(r=1),null==n&&(n="float32"),"float32"!==n&&"int32"!==n)throw Error("Unsupported data type ".concat(n));for(var a=new o0(t,r,n,o),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),o3=op({randomNormal_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type ".concat(n));for(var a=new oQ(t,r,n,!1,o),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),o4=op({randomStandardNormal_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){if(null!=t&&"bool"===t)throw Error("Unsupported data type ".concat(t));return o3(e,0,1,t,r)}}),o6=op({randomUniform_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===t&&(t=0),void 0===r&&(r=1),void 0===n&&(n="float32"),assertNonNegativeIntegerDimensions(e);for(var a=buffer(e,n),i=new o1(t,r,null,o),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),o5=op({randomUniformInt_:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){return o6(e,t,r,"int32",n)}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function range(e,t,r,n){if(void 0===r&&(r=1),void 0===n&&(n="float32"),0===r)throw Error("Cannot have a step of zero");var o={start:e,stop:t,step:r,dtype:n};return rd.runKernel(eX,{},o)}var o8=op({real_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"input","real");return rd.runKernel(eQ,{input:t})}}),o7=op({reciprocal_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","reciprocal");return rd.runKernel(e0,{x:t})}}),o9=op({relu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","relu");return rd.runKernel(e1,{x:t})}}),ae=op({relu6_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","relu6");return rd.runKernel(e6,{x:t})}}),at=op({reverse_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","reverse");return rd.runKernel(e5,{x:r},{dims:t})}}),ar=op({reverse1d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","reverse");return assert(1===t.rank,function(){return"Error in reverse1D: x must be rank 1 but got rank ".concat(t.rank,".")}),at(t,0)}}),an=op({reverse2d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(2===r.rank,function(){return"Error in reverse2D: x must be rank 2 but got rank ".concat(r.rank,".")}),at(r,t)}}),ao=op({reverse3d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(3===r.rank,function(){return"Error in reverse3D: x must be rank 3 but got rank ".concat(r.rank,".")}),at(r,t)}}),aa=op({reverse4d_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(4===r.rank,function(){return"Error in reverse4D: x must be rank 4 but got rank ".concat(r.rank,".")}),at(r,t)}}),ai=op({round_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","round");return rd.runKernel(e8,{x:t})}}),as=op({rsqrt_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","rsqrt","float32");return rd.runKernel(e7,{x:t})}}),au=op({selu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","selu");return rd.runKernel(tn,{x:t})}}),ac=op({separableConv2d_:function(e,t,r,n,o,a,i){void 0===a&&(a=[1,1]),void 0===i&&(i="NHWC");var s=convertToTensor(e,"x","separableConv2d"),u=convertToTensor(t,"depthwiseFilter","separableConv2d"),c=convertToTensor(r,"pointwiseFilter","separableConv2d"),l=s,d=!1;if(3===s.rank&&(d=!0,l=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),"NCHW"===i)throw Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");assert(4===l.rank,function(){return"Error in separableConv2d: input must be rank 4, but got "+"rank ".concat(l.rank,".")}),assert(4===u.rank,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(4===c.rank,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(1===c.shape[0],function(){return"Error in separableConv2d: the first dimension of pointwise filter "+" must be 1, but got ".concat(c.shape[0],".")}),assert(1===c.shape[1],function(){return"Error in separableConv2d: the second dimension of pointwise "+"filter must be 1, but got ".concat(c.shape[1],".")});var h=u.shape[2],p=u.shape[3];assert(c.shape[2]===h*p,function(){return"Error in separableConv2d: the third dimension of pointwise filter "+"must be ".concat(h*p,", ")+"but got ".concat(c.shape[2],".")});var f=nd(nS(l,u,n,o,i,a),c,1,"valid",i);return d?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),al=op({sign_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","sign");return rd.runKernel(ti,{x:t})}}),ad=op({sin_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","sin","float32");return rd.runKernel("Sin",{x:t})}}),ah=op({sinh_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","sinh");return rd.runKernel(ta,{x:t})}}),ap=op({slice1d_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","slice1d");return assert(1===n.rank,function(){return"slice1d expects a rank-1 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,[t],[r])}}),af=op({slice2d_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","slice2d");return assert(2===n.rank,function(){return"slice2d expects a rank-2 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),ag=op({slice3d_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","slice3d");return assert(3===n.rank,function(){return"slice3d expects a rank-3 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),am=op({slice4d_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","slice4d");return assert(4===n.rank,function(){return"slice4d expects a rank-4 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),av=op({softmax_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","softmax","float32");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and dim was ").concat(t));var n={dim:t};return rd.runKernel(th,{logits:r},n)}}),ay=op({fft_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.fft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel("FFT",{input:e})}}),ab=op({ifft_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.ifft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel(ev,{input:e})}}),aT=op({irfft_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t,r=e.shape[e.shape.length-1],n=e.size/r;if(r<=2){var o=rY(e,[n,r]);t=ab(o)}else{var a=[n,2*(r-1)],i=rY(o8(e),[n,r]),s=rY(nQ(e),[n,r]),u=at(r3(i,[0,1],[n,r-2]),1),c=rC(at(r3(s,[0,1],[n,r-2]),1),scalar(-1)),o=rY(rf(r0([i,u],1),r0([s,c],1)),[a[0],a[1]]);t=ab(o)}if(t=o8(t),3===e.rank&&0!==e.shape[0]){var l=t,d=e.shape[0];t=rY(t,[d,t.shape[0]/d,t.shape[1]]),l.dispose()}return t}}),aw=op({split_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","split"),o={numOrSizeSplits:t,axis:r};return rd.runKernel(td,{x:n},o)}}),a_=op({rfft_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){assert("float32"===e.dtype,function(){return"The dtype for rfft() must be real value but got ".concat(e.dtype)});var r,n=e.shape[e.shape.length-1],o=e.size/n;if(null!=t&&t<n){var a=e.shape.map(function(e){return 0}),i=e.shape.map(function(e){return e});i[e.shape.length-1]=t,r=r3(e,a,i),n=t}else if(null!=t&&t>n){var s=e.shape.map(function(e){return e});s[e.shape.length-1]=t-n,r=r0([e,zeros(s)],e.shape.length-1),n=t}else r=e;var u=nI(r),c=ay(rY(rf(r,u),[o,n])),l=Math.floor(n/2)+1,d=o8(c),h=nQ(c),p=aw(d,[l,n-l],d.shape.length-1),f=aw(h,[l,n-l],h.shape.length-1),g=r.shape.slice();return g[r.shape.length-1]=l,rY(rf(p[0],f[0]),g)}}),ak=op({squaredDifference_:function(e,t){var r,n=convertToTensor(e,"a","squaredDifference"),o=convertToTensor(t,"b","squaredDifference");n=(r=__read(makeTypesMatch(n,o),2))[0],o=r[1],assertAndGetBroadcastShape(n.shape,o.shape);var a={a:n,b:o};return rd.runKernel(ty,a,{})}}),aS=op({squeeze_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"x","squeeze","string_or_numeric");return rY(r,squeezeShape(r.shape,t).newShape)}}),ax=op({stack_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensorArray(e,"tensors","stack","string_or_numeric");assert(r.length>=1,function(){return"Pass at least one tensor to tf.stack"}),r.length>0&&assert(t<=r[0].rank,function(){return"Axis must be <= rank of the tensor"});var n={axis:t};return rd.runKernel(eV,r,n)}}),aE=op({step_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","step"),n={alpha:t};return rd.runKernel(tB,{x:r},n)}}),aA=op({stridedSlice_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i,s,u){void 0===o&&(o=0),void 0===a&&(a=0),void 0===i&&(i=0),void 0===s&&(s=0),void 0===u&&(u=0);var c=convertToTensor(e,"x","stridedSlice","string_or_numeric"),l={begin:t,end:r,strides:n,beginMask:o,endMask:a,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u};return rd.runKernel(tT,{x:c},l)}}),aM=op({tan_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"x","tan","float32");return rd.runKernel("Tan",{x:t})}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tensor1d(e,t){assertNonNull(e);var r=inferShape(e,t);if(1!==r.length)throw Error("tensor1d() requires values to be a flat/TypedArray");return makeTensor(e,null,r,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tensor2d(e,t,r){if(assertNonNull(e),null!=t&&2!==t.length)throw Error("tensor2d() requires shape to have two numbers");var n=inferShape(e,r);if(2!==n.length&&1!==n.length)throw Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return makeTensor(e,t,n,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tensor3d(e,t,r){if(assertNonNull(e),null!=t&&3!==t.length)throw Error("tensor3d() requires shape to have three numbers");var n=inferShape(e,r);if(3!==n.length&&1!==n.length)throw Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t,n,r)}function validateUpdateShape(e,t,r){var n=t.rank>1?t.shape[t.rank-1]:1,o=t.rank>1?t.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + "+"shape[sliceDim:], got updates.shape: ".concat(r.shape)+", indices.shape: ".concat(t.shape,", shape: ").concat(e)+", sliceDim: ".concat(n,", and batchDim: ").concat(o,".");if(r.rank<o)throw Error(a+" update.rank < ".concat(o,". "));if(e.length<n+(r.rank-o))throw Error(a+" Output shape length < ".concat(n+(r.rank-o)));if(r.rank!==o+e.length-n)throw Error(a+" update.rank != ".concat(o+e.length-n));for(var i=0;i<o;++i)if(r.shape[i]!==t.shape[i])throw Error(a+" updates.shape[".concat(i,"] (").concat(r.shape[i],") != indices.shape[").concat(i,"] (").concat(t.shape[i],")."));for(var i=0;i<r.rank-o;++i)if(r.shape[i+o]!==e[i+n])throw Error(a+" updates.shape[".concat(i+o,"] (").concat(r.shape[i+o],") != shape[").concat(i+o,"] (").concat(e[i+o],")"))}function validateInput$1(e,t,r){if(t.rank<1)throw Error("tf.scatterND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(t.rank,"."));if(e.rank<1)throw Error("tf.scatterND() expects the updates to be rank 1 or higher,"+" but the rank was ".concat(e.rank,"."));if("int32"!==t.dtype)throw Error("The dtype of 'indices' should be int32, but got dtype: ".concat(t.dtype));if(r.length<1)throw Error("Output rank must be greater or equal to 1, but got shape: ".concat(r));if(0===r.length){if(0===t.size)throw Error("Indices specified for empty output. indices shape: ".concat(t.shape));if(0===e.size)throw Error("Updates specified for empty output. updates shape: ".concat(e.shape))}validateUpdateShape(r,t,e)}function calculateShapes(e,t,r){for(var n=t.shape.length,o=n>1?t.shape[n-1]:1,a=r.length,i=1,s=o;s<a;++s)i*=r[s];var u=o<1?1:o,c=sizeFromShape(t.shape)/u,l=__spreadArray(__spreadArray([],__read(computeStrides(r.slice(0,o))),!1),[1],!1);return{sliceRank:o,numUpdates:c,sliceSize:i,strides:l,outputSize:sizeFromShape(r)}}var aI=op({tensorScatterUpdate_:/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"tensor","tensorScatterupdate"),o=convertToTensor(t,"indices","tensorScatterupdate","int32"),a=convertToTensor(r,"updates","tensorScatterupdate");if(validateInput$1(a,o,n.shape),n.dtype!==a.dtype)throw Error("tensor and updates must have the same dtype, instead they are ".concat(n.dtype," and ").concat(a.dtype,"."));return rd.runKernel(te,{tensor:n,indices:o,updates:a},{})}}),aN=op({topk_:function(e,t,r){void 0===t&&(t=1),void 0===r&&(r=!0);var n=convertToTensor(e,"x","topk");if(0===n.rank)throw Error("topk() expects the input to be of rank 1 or higher");var o=n.shape[n.shape.length-1];if(t<0)throw Error("'k' passed to topk() must be >= 0 but got ".concat(t));if(t>o)throw Error("'k' passed to topk() must be <= the last dimension (".concat(o,") ")+"but got ".concat(t));var a={k:t,sorted:r},i=__read(rd.runKernel(tE,{x:n},a),2);return{values:i[0],indices:i[1]}}}),aD=op({truncatedNormal_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type $ { dtype }");for(var a=new oQ(t,r,n,!0,o),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),aR=op({unique_:function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unique","string_or_numeric");assert(r.rank>0,function(){return"The input tensor must be at least 1D"});var n={axis:t},o=__read(rd.runKernel(tI,{x:r},n),2);return{values:o[0],indices:o[1]}}}),aB=op({unsortedSegmentSum_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","unsortedSegmentSum"),o=convertToTensor(t,"segmentIds","unsortedSegmentSum","int32");return assert(isInt(r),function(){return"numSegments must be of dtype int"}),rd.runKernel(tD,{x:n,segmentIds:o},{numSegments:r})}}),aF=op({unstack_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unstack","string_or_numeric");assert(t>=-r.shape.length&&t<r.shape.length,function(){return"Axis = ".concat(t," is not in [-").concat(r.shape.length,", ").concat(r.shape.length,")")});var n={axis:t};return rd.runKernel(tN,{value:r},n)}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function whereImpl(e,t){for(var r=[],n=0;n<t.length;n++)t[n]&&r.push(n);for(var o=buffer(e,"int32"),a=buffer([r.length,e.length],"int32"),n=0;n<r.length;n++){var i=o.indexToLoc(r[n]),s=n*e.length;a.values.set(i,s)}return a.toTensor()}var whereAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(o){switch(o.label){case 0:return[4,(t=convertToTensor(e,"condition","whereAsync","bool")).data()];case 1:return r=o.sent(),n=whereImpl(t.shape,r),e!==t&&t.dispose(),[2,n]}})})},aO=op({transpose_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"x","transpose");if(null==t&&(t=n.shape.map(function(e,t){return t}).reverse()),assert(n.rank===t.length,function(){return"Error in transpose: rank of input ".concat(n.rank," ")+"must match length of perm ".concat(t,".")}),t.forEach(function(e){assert(e>=0&&e<n.rank,function(){return"All entries in 'perm' must be between 0 and ".concat(n.rank-1)+" but got ".concat(t)})}),n.rank<=1)return n.clone();var o={perm:t};return"complex64"===n.dtype?tidy(function(){var e=o8(n),t=nQ(n);return e=rd.runKernel(tM,{x:e},o),t=rd.runKernel(tM,{x:t},o),r&&(t=n9(t)),rf(e,t)}):rd.runKernel(tM,{x:n},o)}}),aP=op({movingAverage_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===o&&(o=!0);var a=convertToTensor(e,"v","movingAverage"),i=convertToTensor(t,"x","movingAverage"),s=convertToTensor(r,"decay","movingAverage");assertTypesMatch(a,i),assert(arraysEqual(a.shape,i.shape),function(){return"Shape mismatch in v and x"});var u=scalar(1),c=or(u,s),l=rC(or(i,a),c);return o&&(assert(null!=n,function(){return"When using zeroDebias: true, step is required."}),l=rP(l,or(u,nz(s,convertToTensor(n,"step","movingAverage"))))),rF(a,l)}}),aC=op({scatterND_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){assertNonNegativeIntegerDimensions(r);var n=convertToTensor(e,"indices","scatterND","int32"),o=convertToTensor(t,"updates","scatterND");return validateInput$1(o,n,r),rd.runKernel(e9,{indices:n,updates:o},{shape:r})}}),az=op({sparseToDense_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n=0),assertNonNegativeIntegerDimensions(r);var o=convertToTensor(e,"sparseIndices","sparseToDense","int32"),a=convertToTensor(t,"sparseValues","sparseToDense","string_or_numeric"),i=convertToTensor(n,"defaultValue","sparseToDense",a.dtype);return function(e,t,r,n){if("int32"!==e.dtype)throw Error("tf.sparseToDense() expects the indices to be int32 type,"+" but the dtype was ".concat(e.dtype,"."));if(e.rank>2)throw Error("sparseIndices should be a scalar, vector, or matrix,"+" but got shape ".concat(e.shape,"."));var o=e.rank>0?e.shape[0]:1,a=e.rank>1?e.shape[1]:1;if(r.length!==a)throw Error("outputShape has incorrect number of elements:,"+" ".concat(r.length,", should be: ").concat(a,"."));var i=t.size;if(!(0===t.rank||1===t.rank&&i===o))throw Error("sparseValues has incorrect shape "+"".concat(t.shape,", should be [] or [").concat(o,"]"));if(t.dtype!==n.dtype)throw Error("sparseValues.dtype must match defaultValues.dtype")}(o,a,r,i),rd.runKernel(tv,{sparseIndices:o,sparseValues:a,defaultValue:i},{outputShape:r})}}),aL=op({gatherND_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(t,"indices","gatherND","int32"),n=convertToTensor(e,"x","gatherND","string_or_numeric");return rd.runKernel(ep,{params:n,indices:r})}}),aG=op({dropout_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){var o=convertToTensor(e,"x","dropout");if(assert("float32"===o.dtype,function(){return"x has to be a floating point tensor since it's going to be "+"scaled, but got a ".concat(o.dtype," tensor instead.")}),assert(t>=0&&t<1,function(){return"rate must be a float in the range [0, 1), but got ".concat(t,".")}),0===t)return e instanceof ri?o.clone():o;var a=/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){if(null==t)return e.shape.slice();if(arraysEqual(e.shape,t))return t;if(e.shape.length===t.length){for(var r=[],n=0;n<e.shape.length;n++)null==t[n]&&null!=e.shape[n]?r.push(e.shape[n]):r.push(t[n]);return r}return t}(o,r),i=1-t;return rC(o,rP(n$(rF(o6(a,0,1,"float32",n),i)),i))}});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function enclosingPowerOfTwo(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function cosineWindow(e,t,r){for(var n=1-e%2,o=new Float32Array(e),a=0;a<e;++a){var i=2*Math.PI*a/(e+n-1);o[a]=t-r*Math.cos(i)}return tensor1d(o,"float32")}var aW=op({conv2DBackpropFilter_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===a&&(a="NHWC");var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]])),assert(4===s.rank,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+"".concat(s.shape,".")}),assert(4===u.rank,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+"".concat(u.shape,".")}),assert(4===r.length,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+"".concat(r,".")});var c="NHWC"===a?s.shape[3]:s.shape[1],l="NHWC"===a?u.shape[3]:u.shape[1];assert(c===r[2],function(){return"Error in conv2dDerFilter: depth of input ".concat(c,") must ")+"match input depth in filter (".concat(r[2],".")}),assert(l===r[3],function(){return"Error in conv2dDerFilter: depth of dy (".concat(l,") must ")+"match output depth for filter (".concat(r[3],").")}),checkPadOnDimRoundingMode("conv2dDerFilter",o,i);var d={x:s,dy:u},h={strides:n,pad:o,dataFormat:a,dimRoundingMode:i,filterShape:r};return rd.runKernel(G,d,h)}});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getFusedDyActivation(e,t,r){if(null==r||"linear"===r)return e;if("relu"===r)return rC(e,aE(t));throw Error("Cannot compute gradient for fused activation ".concat(r,"."))}function getFusedBiasGradient(e,t){var r=t,n=getReductionAxes(e.shape,t.shape);return n.length>0&&(r=nW(r,n)),rY(r,e.shape)}function applyActivation(e,t,r,n){if("linear"===t)return e;if("relu"===t)return o9(e);if("elu"===t)return nB(e);if("relu6"===t)return ae(e);if("prelu"===t)return oB(e,r);if("leakyrelu"===t)return n3(e,n);if("sigmoid"===t)return r2(e);throw Error("Unknown fused activation ".concat(t,"."))}var shouldFuse=function(e,t){return!(e>0)||"linear"===t},aU=op({fusedConv2d_:function(e){var t,r,n=e.x,o=e.filter,a=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,h=e.bias,p=e.activation,f=void 0===p?"linear":p,g=e.preluActivationWeights,m=e.leakyreluAlpha;if(f=f||"linear",!1===shouldFuse(rd.state.gradientDepth,f)){assert("NHWC"===u,function(){return"Error in fused conv2d: got dataFormat of ".concat(u," but ")+"only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear."});var v=nd(n,o,a,i,u,l,d);return null!=h&&(v=rF(v,h)),applyActivation(v,f,g,m)}var y=convertToTensor(n,"x","conv2d","float32"),b=convertToTensor(o,"filter","conv2d","float32"),T=y,w=!1;3===y.rank&&(w=!0,T=rY(y,[1,y.shape[0],y.shape[1],y.shape[2]])),assert(4===T.rank,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+"".concat(T.rank,".")}),assert(4===b.rank,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+"".concat(b.rank,".")}),checkPadOnDimRoundingMode("fused conv2d",i,d);var _="NHWC"===u?T.shape[3]:T.shape[1];assert(b.shape[2]===_,function(){return"Error in conv2d: depth of input (".concat(_,") must match ")+"input depth for filter ".concat(b.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(a,l),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(a," and dilations '").concat(l,"'")});var k=computeConv2DInfo(T.shape,b.shape,a,l,i,d);if(null!=h&&(t=__read(makeTypesMatch(t=convertToTensor(h,"bias","fused conv2d"),y),1)[0],"NHWC"===u?assertAndGetBroadcastShape(k.outShape,t.shape):(assert(t.shape.length<=1,function(){return"Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of "+"rank-".concat(t.shape.length,".")}),assert(0===t.shape.length||t.shape[0]===k.outChannels||1===t.shape[0],function(){return"Error in fused conv2d: bias shape (".concat(t.shape,") is not ")+"compatible with the number of output channels "+"(".concat(k.outChannels,")")}))),null!=g){var S=g.shape;if(assert(S.length<=1||3===S.length,function(){return"Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of "+"rank-".concat(S.length,".")}),1===S.length)assert(1===S[0]||S[0]===k.outChannels,function(){return"Error in fused conv2d: PReLU activation weights "+"(".concat(S,") is not compatible with the number of output ")+"channels (".concat(k.outChannels,").")});else if(3===S.length)try{assertAndGetBroadcastShape(S,k.outShape)}catch(e){throw Error("Error in fused conv2d: PReLU activation weights (".concat(S,") ")+"is not compatible with the output shape of the conv2d "+"(".concat(k.outShape,")."))}r=convertToTensor(g,"prelu weights","fused conv2d")}var grad=function(e,t){assert("NHWC"===u,function(){return"Error in gradient of fused conv2D: got dataFormat of ".concat(u," but only NHWC is currently supported.")});var r=__read(t,4),n=r[0],o=r[1],s=r[2],c=r[3],d=getFusedDyActivation(e,s,f);assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 "+"are not yet supported in gradients. Got dilations '".concat(l,"'")});var h=[np(o.shape,d,n,a,i),aW(o,d,n.shape,a,i)];if(null!=c){var p=getFusedBiasGradient(c,d);h.push(p)}return h},x={x:T,filter:b,bias:t,preluActivationWeights:r},E={strides:a,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:f,leakyreluAlpha:m};return null==h?customGrad(function(e,t,r){var n=rd.runKernel(tC,x,E);return r([t,e,n]),w&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(T,b):customGrad(function(e,t,r,n){var o=rd.runKernel(tC,x,E);return n([t,e,o,r]),w&&(o=rY(o,[o.shape[1],o.shape[2],o.shape[3]])),{value:o,gradFunc:grad}})(T,b,t)}}),aK=op({depthwiseConv2dNativeBackpropFilter_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===a&&(a=[1,1]);var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={x:s,dy:u},l={strides:n,pad:o,dimRoundingMode:i,dilations:a,filterShape:r};return rd.runKernel(Y,c,l)}}),aq=op({depthwiseConv2dNativeBackpropInput_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i){void 0===a&&(a=[1,1]);var s=t,u=!1;3===t.rank&&(u=!0,s=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={dy:s,filter:r},l={strides:n,pad:o,dimRoundingMode:i,dilations:a,inputShape:e},d=rd.runKernel(X,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3]]):d}}),aV=op({fusedDepthwiseConv2d_:function(e){var t,r,n=e.x,o=e.filter,a=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,h=e.bias,p=e.activation,f=void 0===p?"linear":p,g=e.preluActivationWeights,m=e.leakyreluAlpha;if(!1===shouldFuse(rd.state.gradientDepth,f)){var v=nS(n,o,a,i,u,l,d);return null!=h&&(v=rF(v,h)),applyActivation(v,f,g,m)}var y=convertToTensor(n,"x","depthwiseConv2d","float32"),b=convertToTensor(o,"filter","depthwiseConv2d","float32"),T=y,w=!1;3===y.rank&&(w=!0,T=rY(y,[1,y.shape[0],y.shape[1],y.shape[2]])),assert(4===T.rank,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(T.rank,".")}),assert(4===b.rank,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, "+"but got rank ".concat(b.rank,".")}),assert(T.shape[3]===b.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels "+"(".concat(T.shape[3],") must match the inChannels dimension in ")+"filter ".concat(b.shape[2],".")}),null==l&&(l=[1,1]),assert(eitherStridesOrDilationsAreOne(a,l),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must "+"be 1. Got strides ".concat(a," and dilations '").concat(l,"'")}),checkPadOnDimRoundingMode("fused depthwiseConv2d",i,d);var _=computeConv2DInfo(T.shape,b.shape,a,l,i,d,!0);null!=h&&(t=__read(makeTypesMatch(t=convertToTensor(h,"bias","fused conv2d"),y),1)[0],assertAndGetBroadcastShape(_.outShape,t.shape)),null!=g&&(r=convertToTensor(g,"prelu weights","fused depthwiseConv2d"));var grad=function(e,r){assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations "+"'".concat(l,"'")});var n=__read(r,4),o=n[0],s=n[1],u=n[2],c=n[3],h=getFusedDyActivation(e,u,f),p=aq(s.shape,h,o,a,i,l,d),g=aK(s,h,o.shape,a,i,l,d);return null!=c?[p,g,getFusedBiasGradient(t,h)]:[p,g]},k={x:T,filter:b,bias:t,preluActivationWeights:r},S={strides:a,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:f,leakyreluAlpha:m};return null==h?customGrad(function(e,t,r){var n=rd.runKernel(tz,k,S);return r([t,e,n]),w&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(T,b):customGrad(function(e,t,r,n){var o=rd.runKernel(tz,k,S);return n([t,e,o,r]),w&&(o=rY(o,[o.shape[1],o.shape[2],o.shape[3]])),{value:o,gradFunc:grad}})(T,b,t)}}),aH=op({fusedMatMul_:function(e){var t,r,n,o=e.a,a=e.b,i=e.transposeA,s=void 0!==i&&i,u=e.transposeB,c=void 0!==u&&u,l=e.bias,d=e.activation,h=void 0===d?"linear":d,p=e.preluActivationWeights,f=e.leakyreluAlpha,g=void 0===f?.2:f;if(!1===shouldFuse(rd.state.gradientDepth,h)){var m=r1(o,a,s,c);return null!=l&&(m=rF(m,l)),applyActivation(m,h,p,g)}var v=convertToTensor(o,"a","fused matMul"),y=convertToTensor(a,"b","fused matMul");v=(t=__read(makeTypesMatch(v,y),2))[0],y=t[1];var b=s?v.shape[v.rank-2]:v.shape[v.rank-1],T=c?y.shape[y.rank-1]:y.shape[y.rank-2],w=s?v.shape[v.rank-1]:v.shape[v.rank-2],_=c?y.shape[y.rank-2]:y.shape[y.rank-1],k=v.shape.slice(0,-2),S=y.shape.slice(0,-2),x=sizeFromShape(k),E=sizeFromShape(S);assert(b===T,function(){return"Error in fused matMul: inner shapes (".concat(b,") and (")+"".concat(T,") of Tensors with shapes ").concat(v.shape," and ")+"".concat(y.shape," and transposeA=").concat(s)+" and transposeB=".concat(c," must match.")});var A=assertAndGetBroadcastShape(v.shape.slice(0,-2),y.shape.slice(0,-2)).concat([w,_]),M=s?rY(v,[x,b,w]):rY(v,[x,w,b]),I=c?rY(y,[E,_,T]):rY(y,[E,T,_]);null!=l&&assertAndGetBroadcastShape(A,(r=__read(makeTypesMatch(r=convertToTensor(l,"bias","fused matMul"),v),1)[0]).shape),null!=p&&(n=convertToTensor(p,"prelu weights","fused matMul"));var grad=function(e,t){var r,n,o=__read(t,4),a=o[0],i=o[1],u=o[2],d=o[3],p=getFusedDyActivation(rY(e,u.shape),u,h);return(s||c?!s&&c?(r=r1(p,i,!1,!1),n=r1(p,a,!0,!1)):s&&!c?(r=r1(i,p,!1,!0),n=r1(a,p,!1,!1)):(r=r1(i,p,!0,!0),n=r1(p,a,!0,!0)):(r=r1(p,i,!1,!0),n=r1(a,p,!0,!1)),null!=l)?[r,n,getFusedBiasGradient(d,p)]:[r,n]},N={a:M,b:I,bias:r,preluActivationWeights:n},D={transposeA:s,transposeB:c,activation:h,leakyreluAlpha:g};return null==l?customGrad(function(e,t,r){var n=rd.runKernel(tP,N,D);return r([e,t,n]),{value:rY(n,A),gradFunc:grad}})(M,I):customGrad(function(e,t,r,n){var o=rd.runKernel(tP,N,D);return n([e,t,o,r]),{value:rY(o,A),gradFunc:grad}})(M,I,r)}}),aj=op({hammingWindow_:/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return cosineWindow(e,.54,.46)}}),aJ=op({hannWindow_:/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return cosineWindow(e,.5,.5)}}),a$=op({frame_:/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===n&&(n=!1),void 0===o&&(o=0);for(var a=0,i=[];a+t<=e.size;)i.push(r3(e,a,t)),a+=r;if(n)for(;a<e.size;){var s=a+t-e.size,u=r0([r3(e,a,t-s),fill([s],o)]);i.push(u),a+=r}return 0===i.length?tensor2d([],[0,t]):rY(r0(i),[i.length,t])}}),aZ=op({stft_:/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){return void 0===o&&(o=aJ),null==n&&(n=enclosingPowerOfTwo(t)),a_(rC(a$(e,t,r),o(t)),n)}}),aY=op({cropAndResize_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===o&&(o="bilinear"),void 0===a&&(a=0);var i=convertToTensor(e,"image","cropAndResize"),s=convertToTensor(t,"boxes","cropAndResize","float32"),u=convertToTensor(r,"boxInd","cropAndResize","int32"),c=s.shape[0];assert(4===i.rank,function(){return"Error in cropAndResize: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&4===s.shape[1],function(){return"Error in cropAndResize: boxes must be have size [".concat(c,",4] ")+"but had shape ".concat(s.shape,".")}),assert(1===u.rank&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size [".concat(c,"] ")+"but had shape ".concat(s.shape,".")}),assert(2===n.length,function(){return"Error in cropAndResize: cropSize must be of length 2, but got "+"length ".concat(n.length,".")}),assert(n[0]>=1&&n[1]>=1,function(){return"cropSize must be atleast [1,1], but was ".concat(n)}),assert("bilinear"===o||"nearest"===o,function(){return"method must be bilinear or nearest, but was ".concat(o)});var l={method:o,extrapolationValue:a,cropSize:n};return rd.runKernel(j,{image:i,boxes:s,boxInd:u},l)}}),aX=op({flipLeftRight_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"image","flipLeftRight","float32");return assert(4===t.rank,function(){return"Error in flipLeftRight: image must be rank 4,"+"but got rank ".concat(t.rank,".")}),rd.runKernel(eu,{image:t},{})}}),aQ=op({grayscaleToRGB_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t=convertToTensor(e,"image","grayscaleToRGB"),r=t.rank-1,n=t.shape[r];assert(t.rank>=2,function(){return"Error in grayscaleToRGB: images must be at least rank 2, "+"but got rank ".concat(t.rank,".")}),assert(1===n,function(){return"Error in grayscaleToRGB: last dimension of a grayscale image "+"should be size 1, but got size ".concat(n,".")});var o=Array(t.rank);return o.fill(1,0,r),o[r]=3,nj(t,o)}}),a0=op({rgbToGrayscale_:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){var t,r=convertToTensor(e,"image","RGBToGrayscale"),n=r.rank-1,o=r.shape[n];assert(r.rank>=2,function(){return"Error in RGBToGrayscale: images must be at least rank 2, "+"but got rank ".concat(r.rank,".")}),assert(3===o,function(){return"Error in RGBToGrayscale: last dimension of an RGB image "+"should be size 3, but got size ".concat(o,".")});var a=r.dtype,i=rR(r,"float32"),s=tensor1d([.2989,.587,.114]);switch(r.rank){case 2:t=nR("ij,j->i",i,s);break;case 3:t=nR("ijk,k->ij",i,s);break;case 4:t=nR("ijkl,l->ijk",i,s);break;case 5:t=nR("ijklm,m->ijkl",i,s);break;case 6:t=nR("ijklmn,n->ijklm",i,s);break;default:throw Error("Not a valid tensor rank.")}return rR(t=nV(t,-1),a)}}),a1=op({rotateWithOffset_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=.5);var o=convertToTensor(e,"image","rotateWithOffset","float32");assert(4===o.rank,function(){return"Error in rotateWithOffset: image must be rank 4,"+"but got rank ".concat(o.rank,".")});var a={radians:t,fillValue:r,center:n};return rd.runKernel(tO,{image:o},a)}});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nonMaxSuppSanityCheck(e,t,r,n,o,a){null==n&&(n=.5),null==o&&(o=Number.NEGATIVE_INFINITY),null==a&&(a=0);var i=e.shape[0];return r=Math.min(r,i),assert(0<=n&&n<=1,function(){return"iouThreshold must be in [0, 1], but was '".concat(n,"'")}),assert(2===e.rank,function(){return"boxes must be a 2D tensor, but was of rank '".concat(e.rank,"'")}),assert(4===e.shape[1],function(){return"boxes must have 4 columns, but 2nd dimension was ".concat(e.shape[1])}),assert(1===t.rank,function(){return"scores must be a 1D tensor"}),assert(t.shape[0]===i,function(){return"scores has incompatible shape with boxes. Expected ".concat(i,", ")+"but was ".concat(t.shape[0])}),assert(0<=a&&a<=1,function(){return"softNmsSigma must be in [0, 1], but was '".concat(a,"'")}),{maxOutputSize:r,iouThreshold:n,scoreThreshold:o,softNmsSigma:a}}var a2=op({nonMaxSuppression_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o){void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY);var a=convertToTensor(e,"boxes","nonMaxSuppression","float32"),i=convertToTensor(t,"scores","nonMaxSuppression","float32"),s=nonMaxSuppSanityCheck(a,i,r,n,o),u={maxOutputSize:r=s.maxOutputSize,iouThreshold:n=s.iouThreshold,scoreThreshold:o=s.scoreThreshold};return rd.runKernel(eG,{boxes:a,scores:i},u)}});function defaultComparator(e,t){return e>t?1:e<t?-1:0}function nonMaxSuppressionV3Impl(e,t,r,n,o){return nonMaxSuppressionImpl_(e,t,r,n,o,0)}function nonMaxSuppressionV4Impl(e,t,r,n,o,a){return nonMaxSuppressionImpl_(e,t,r,n,o,0,!1,a,!0)}function nonMaxSuppressionV5Impl(e,t,r,n,o,a){return nonMaxSuppressionImpl_(e,t,r,n,o,a,!0)}function nonMaxSuppressionImpl_(e,t,r,n,o,a,i,s,u){void 0===i&&(i=!1),void 0===s&&(s=!1),void 0===u&&(u=!1);for(var c=[],l=0;l<t.length;l++)t[l]>o&&c.push({score:t[l],boxIndex:l,suppressBeginIndex:0});c.sort(ascendingComparator);for(var d=a>0?-.5/a:0,h=[],p=[];h.length<r&&c.length>0;){var f=c.pop(),g=f.score,m=f.boxIndex,v=f.suppressBeginIndex;if(g<o)break;for(var y=!1,b=h.length-1;b>=v;--b){var T=function(e,t,r){var n=e.subarray(4*t,4*t+4),o=e.subarray(4*r,4*r+4),a=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),d=Math.max(o[0],o[2]),h=Math.max(o[1],o[3]),p=(s-a)*(u-i),f=(d-c)*(h-l);if(p<=0||f<=0)return 0;var g=Math.max(Math.min(s,d)-Math.max(a,c),0)*Math.max(Math.min(u,h)-Math.max(i,l),0);return g/(p+f-g)}(e,m,h[b]);if(T>=n){y=!0;break}if(f.score=f.score*function(e,t,r){var n=Math.exp(t*r*r);return r<=e?n:0}(n,d,T),f.score<=o)break}f.suppressBeginIndex=h.length,!y&&(f.score===g?(h.push(m),p.push(f.score)):f.score>o&&/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=function(e,t,r){for(var n=0,o=e.length,a=0,i=!1;n<o;){var s=r(t,e[a=n+(o-n>>>1)]);s>0?n=a+1:(o=a,i=!s)}return i?n:-n-1}(e,t,r||defaultComparator),o=n<0?-(n+1):n;e.splice(o,0,t)}(c,f,ascendingComparator))}var w=h.length,_=r-w;s&&_>0&&(h.push.apply(h,__spreadArray([],__read(Array(_).fill(0)),!1)),p.push.apply(p,__spreadArray([],__read(Array(_).fill(0)),!1)));var k={selectedIndices:h};return i&&(k.selectedScores=p),u&&(k.validOutputs=w),k}function ascendingComparator(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}var a3=op({nonMaxSuppressionWithScore_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY),void 0===a&&(a=0);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,o,a);r=u.maxOutputSize,n=u.iouThreshold;var c={maxOutputSize:r,iouThreshold:n,scoreThreshold:o=u.scoreThreshold,softNmsSigma:a=u.softNmsSigma},l=rd.runKernel(eU,{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),a4=op({nonMaxSuppressionPadded_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY),void 0===a&&(a=!1);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,o,null),c={maxOutputSize:u.maxOutputSize,iouThreshold:u.iouThreshold,scoreThreshold:u.scoreThreshold,padToMaxOutputSize:a},l=rd.runKernel(eW,{boxes:i,scores:s},c);return{selectedIndices:l[0],validOutputs:l[1]}}}),a6=op({resizeBilinear_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var o=convertToTensor(e,"images","resizeBilinear");assert(3===o.rank||4===o.rank,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got "+"rank ".concat(o.rank,".")}),assert(2===t.length,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+"".concat(t,".")}),assert(!1===n||!1===r,function(){return"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false."});var a=o,i=!1;3===o.rank&&(i=!0,a=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),__read(t,0);var s={images:a},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e4,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),a5=op({resizeNearestNeighbor_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var o=convertToTensor(e,"images","resizeNearestNeighbor");assert(3===o.rank||4===o.rank,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got "+"rank ".concat(o.rank,".")}),assert(2===t.length,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+"".concat(t,".")}),assert("float32"===o.dtype||"int32"===o.dtype,function(){return"`images` must have `int32` or `float32` as dtype"}),assert(!1===n||!1===r,function(){return"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false."});var a=o,i=!1;3===o.rank&&(i=!0,a=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),__read(t,0);var s={images:a},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e3,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),a8=op({threshold_:function(e,t,r,n){void 0===t&&(t="binary"),void 0===r&&(r=!1),void 0===n&&(n=.5);var o,a,i,s,u,c=convertToTensor(e,"image","threshold"),l=c.shape[0]*c.shape[1],d=rC(tensor1d([n]),255);if(assert(3===c.rank,function(){return"Error in threshold: image must be rank 3,"+"but got rank ".concat(c.rank,".")}),assert(3===c.shape[2]||1===c.shape[2],function(){return"Error in threshold: image color channel must be equal to 3 or 1"+"but got ".concat(c.shape[2],".")}),assert("int32"===c.dtype||"float32"===c.dtype,function(){return"Error in dtype: image dtype must be int32 or float32,"+"but got dtype ".concat(c.dtype,".")}),assert("otsu"===t||"binary"===t,function(){return"Method must be binary or otsu, but was ".concat(t)}),3===c.shape[2]){a=(o=__read(aw(c,[1,1,1],-1),3))[0],i=o[1],s=o[2];var h=rC(a,.2989),p=rC(i,.587),f=rC(s,.114);u=rF(rF(h,p),f)}else u=e;return"otsu"===t&&(d=function(e,t){for(var r,n,o,a,i,s,u=tensor1d([-1]),c=tensor1d([0]),l=tensor1d([0]),d=0;d<e.size-1;d++){r=r3(e,0,d+1),n=r3(e,d+1),i=rP(nW(r),t),s=rP(nW(n),t),o=rP(nW(rC(r,range(0,r.size))),nW(r));var h=fill(n.shape,r.size),p=rF(range(0,n.size),h),f=or(o,a=rP(nW(rC(n,p)),nW(n))),g=or(o,a),m=rC(i,s),v=nY(l=rC(rC(m,f),g),c);c=nM(v,l,c),u=nM(v,tensor1d([d]),u)}return u}(nt(rR(ai(u),"int32"),tensor([]),256),l)),rR(rC(r?n6(u,d):nY(u,d),255),"int32")}}),a7=op({transform_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a){void 0===r&&(r="nearest"),void 0===n&&(n="constant"),void 0===o&&(o=0);var i=convertToTensor(e,"image","transform","float32"),s=convertToTensor(t,"transforms","transform","float32");assert(4===i.rank,function(){return"Error in transform: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&(s.shape[0]===i.shape[0]||1===s.shape[0])&&8===s.shape[1],function(){return"Error in transform: Input transform should be batch x 8 or 1 x 8"}),assert(null==a||2===a.length,function(){return"Error in transform: outputShape must be [height, width] or null, "+"but got ".concat(a,".")});var u={interpolation:r,fillMode:n,fillValue:o,outputShape:a};return rd.runKernel(tA,{image:i,transforms:s},u)}}),a9=op({bandPart_:function(e,t,r){var n,o,a=convertToTensor(e,"a","bandPart");assert(a.rank>=2,function(){return"bandPart(): Rank must be at least 2, got ".concat(a.rank,".")});var i=a.shape,s=__read(a.shape.slice(-2),2),u=s[0],c=s[1];"number"==typeof t?(assert(t%1==0,function(){return"bandPart(): numLower must be an integer, got ".concat(t,".")}),assert(t<=u,function(){return"bandPart(): numLower (".concat(t,")")+" must not be greater than the number of rows (".concat(u,").")}),n=convertToTensor(t<0?u:t,"numLower","bandPart")):(assert("int32"===t.dtype,function(){return"bandPart(): numLower's dtype must be an int32."}),n=nM(n4(t,0),u,om(t,u))),"number"==typeof r?(assert(r%1==0,function(){return"bandPart(): numUpper must be an integer, got ".concat(r,".")}),assert(r<=c,function(){return"bandPart(): numUpper (".concat(r,")")+" must not be greater than the number of columns (".concat(c,").")}),o=convertToTensor(r<0?c:r,"numUpper","bandPart")):(assert("int32"===r.dtype,function(){return"bandPart(): numUpper's dtype must be an int32."}),o=nM(n4(r,0),c,om(r,c)));var l=or(rY(range(0,u,1,"int32"),[-1,1]),range(0,c,1,"int32")),d=oa(n6(l,n),nX(l,n9(o))),h=zeros([u,c],a.dtype);return rY(ax(aF(rY(a,[-1,u,c])).map(function(e){return nM(d,e,h)})),i)}}),ie=op({gramSchmidt_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){if(Array.isArray(e)){t=!1,assert(null!=e&&e.length>0,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var t,r=e[0].shape[0],_loop_1=function(t){assert(e[t].shape[0]===r,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: "+"(".concat(e[t].shape[0]," vs. ").concat(r,")")})},n=1;n<e.length;++n)_loop_1(n)}else t=!0,e=aw(e,e.shape[0],0).map(function(e){return aS(e,[0])});assert(e.length<=e[0].shape[0],function(){return"Gram-Schmidt: Number of vectors (".concat(e.length,") exceeds ")+"number of dimensions (".concat(e[0].shape[0],").")});for(var o=[],a=e,_loop_2=function(e){o.push(rd.tidy(function(){var t=a[e];if(e>0)for(var r=0;r<e;++r){var n=rC(nW(rC(o[r],t)),o[r]);t=or(t,n)}return rP(t,nU(t,"euclidean"))}))},n=0;n<e.length;++n)_loop_2(n);return t?ax(o,0):o}});function qr2d(e,t){return void 0===t&&(t=!1),rd.tidy(function(){assert(2===e.shape.length,function(){return"qr2d() requires a 2D Tensor, but got a ".concat(e.shape.length,"D Tensor.")});for(var r=e.shape[0],n=e.shape[1],o=nJ(r),a=rB(e),i=tensor2d([[1]],[1,1]),s=rB(i),u=r>=n?n:r,_loop_1=function(e){var t,u=a,c=s,l=o;s=(t=__read(rd.tidy(function(){var t=r3(a,[e,e],[r-e,1]),u=nU(t),c=r3(a,[e,e],[1,1]),l=nM(nY(c,0),tensor2d([[-1]]),tensor2d([[1]])),d=or(c,rC(l,u)),h=rP(t,d);s=1===h.shape[0]?rB(i):r0([i,r3(h,[1,0],[h.shape[0]-1,h.shape[1]])],0);var p=n9(rP(r1(l,d),u)),f=r3(a,[e,0],[r-e,n]),g=rC(p,s),m=aO(s);if(0===e)a=or(f,r1(g,r1(m,f)));else{var v=or(f,r1(g,r1(m,f)));a=r0([r3(a,[0,0],[e,n]),v],0)}var y=aO(g),b=r3(o,[0,e],[r,o.shape[1]-e]);if(0===e)o=or(b,r1(r1(b,s),y));else{var T=or(b,r1(r1(b,s),y));o=r0([r3(o,[0,0],[r,e]),T],1)}return[s,a,o]}),3))[0],a=t[1],o=t[2],dispose([u,c,l])},c=0;c<u;++c)_loop_1(c);return!t&&r>n&&(o=r3(o,[0,0],[r,n]),a=r3(a,[0,0],[n,n])),[o,a]})}var it=op({qr_:function(e,t){if(void 0===t&&(t=!1),assert(e.rank>=2,function(){return"qr() requires input tensor to have a rank >= 2, but got rank ".concat(e.rank)}),2===e.rank)return qr2d(e,t);var r=e.shape.slice(0,e.shape.length-2).reduce(function(e,t){return e*t}),n=aF(rY(e,[r,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),o=[],a=[];return n.forEach(function(e){var r=__read(qr2d(e,t),2),n=r[0],i=r[1];o.push(n),a.push(i)}),[rY(ax(o,0),e.shape),rY(ax(a,0),e.shape)]}});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */t.Reduction=void 0,function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}(t.Reduction||(t.Reduction={}));var ir=op({computeWeightedLoss_:function(e,r,n){void 0===n&&(n=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"losses","computeWeightedLoss"),a=null;null!=r&&(a=convertToTensor(r,"weights","computeWeightedLoss"));var i=null==a?o:rC(o,a);if(n===t.Reduction.NONE)return i;if(n===t.Reduction.SUM)return nW(i);if(n===t.Reduction.MEAN){if(null==a)return og(i);var s=o.size/a.size,u=rP(nW(i),nW(a));return s>1?rP(u,scalar(s)):u}if(n===t.Reduction.SUM_BY_NONZERO_WEIGHTS){if(null==a)return rP(nW(i),scalar(o.size));var c=rR(nW(o_(rC(a,ones(o.shape)),scalar(0))),"float32");return rP(nW(i),c)}throw Error("Unknown reduction: ".concat(n))}}),io=op({absoluteDifference_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,r,n,o){void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var a=convertToTensor(e,"labels","absoluteDifference"),i=convertToTensor(r,"predictions","absoluteDifference"),s=null;return null!=n&&(s=convertToTensor(n,"weights","absoluteDifference")),assertShapesMatch(a.shape,i.shape,"Error in absoluteDifference: "),ir(rz(or(a,i)),s,o)}}),ia=op({cosineDistance_:function(e,r,n,o,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","cosineDistance"),s=convertToTensor(r,"predictions","cosineDistance"),u=null;return null!=o&&(u=convertToTensor(o,"weights","cosineDistance")),assertShapesMatch(i.shape,s.shape,"Error in cosineDistance: "),ir(or(scalar(1),nW(rC(i,s),n,!0)),u,a)}}),ii=op({hingeLoss_:function(e,r,n,o){void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var a=convertToTensor(e,"labels","hingeLoss"),i=convertToTensor(r,"predictions","hingeLoss"),s=null;null!=n&&(s=convertToTensor(n,"weights","hingeLoss")),assertShapesMatch(a.shape,i.shape,"Error in hingeLoss: ");var u=scalar(1);return a=or(rC(scalar(2),a),u),ir(o9(or(u,rC(a,i))),s,o)}}),is=op({huberLoss_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,r,n,o,a){void 0===o&&(o=1),void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","huberLoss"),s=convertToTensor(r,"predictions","huberLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","huberLoss")),assertShapesMatch(i.shape,s.shape,"Error in huberLoss: ");var c=scalar(o),l=rz(or(s,i)),d=om(l,c),h=or(l,d);return ir(rF(rC(scalar(.5),nG(d)),rC(c,h)),u,a)}}),iu=op({logLoss_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,r,n,o,a){void 0===o&&(o=1e-7),void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","logLoss"),s=convertToTensor(r,"predictions","logLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","logLoss")),assertShapesMatch(i.shape,s.shape,"Error in logLoss: ");var c=scalar(1),l=scalar(o),d=n9(rC(i,n8(rF(s,l)))),h=rC(or(c,i),n8(rF(or(c,s),l)));return ir(or(d,h),u,a)}}),ic=op({meanSquaredError_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,r,n,o){void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var a=convertToTensor(e,"labels","meanSquaredError"),i=convertToTensor(r,"predictions","meanSquaredError"),s=null;return null!=n&&(s=convertToTensor(n,"weights","meanSquaredError")),assertShapesMatch(a.shape,i.shape,"Error in meanSquaredError: "),ir(ak(a,i),s,o)}}),il=op({sigmoidCrossEntropy_:function(e,r,n,o,a){void 0===o&&(o=0),void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i,s,u,c,l,d=convertToTensor(e,"multiClassLabels","sigmoidCrossEntropy"),h=convertToTensor(r,"logits","sigmoidCrossEntropy"),p=null;if(null!=n&&(p=convertToTensor(n,"weights","sigmoidCrossEntropy")),assertShapesMatch(d.shape,h.shape,"Error in sigmoidCrossEntropy: "),o>0){var f=scalar(o),g=scalar(1),m=scalar(.5);d=rF(rC(d,or(g,f)),rC(m,f))}return ir((i=convertToTensor(d,"labels","sigmoidCrossEntropyWithLogits"),s=convertToTensor(h,"logits","sigmoidCrossEntropyWithLogits"),assertShapesMatch(i.shape,s.shape,"Error in sigmoidCrossEntropyWithLogits: "),u=o9(s),c=rC(s,i),l=n7(nq(n9(rz(s)))),rF(or(u,c),l)),p,a)}}),id=op({softmaxCrossEntropy_:function(e,r,n,o,a){void 0===o&&(o=0),void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"onehotLabels","softmaxCrossEntropy"),s=convertToTensor(r,"logits","softmaxCrossEntropy"),u=null;if(null!=n&&(u=convertToTensor(n,"weights","softmaxCrossEntropy")),assertShapesMatch(i.shape,s.shape,"Error in softmaxCrossEntropy: "),o>0){var c=scalar(o),l=scalar(1),d=scalar(i.shape[1]);i=rF(rC(i,or(l,c)),rP(c,d))}return ir(function(e,t,r){if(void 0===r&&(r=-1),-1===r&&(r=t.rank-1),r!==t.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet "+"supported. Labels / logits was rank ".concat(t.rank," ")+"and dim was ".concat(r));return customGrad(function(e,t,n){var o=oo(t,[r],!0),a=or(rR(t,"float32"),o);return n([e,a]),{value:nW(n9(rC(a,e)),[r]),gradFunc:function(e,t){var n=__read(t,2),o=n[0],a=n[1],i=expandShapeToKeepDim(e.shape,[r]);return[rC(rY(e,i),or(rR(o,"float32"),nq(a))),rC(rY(e,i),or(nq(a),rR(o,"float32")))]}}})(e,t)}(i,s),u,a)}}),ih=op({sparseFillEmptyRows_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){var o=convertToTensor(e,"indices","sparseFillEmptyRows","int32"),a=convertToTensor(t,"values","sparseFillEmptyRows"),i=convertToTensor(r,"denseShape","sparseFillEmptyRows","int32"),s=convertToTensor(n,"defaultValue","sparseFillEmptyRows",a.dtype);if(2!==o.rank)throw Error("Indices should be Tensor2D but received shape\n        ".concat(o.shape));if(1!==a.rank)throw Error("Values should be Tensor1D but received shape ".concat(a.shape));if(1!==i.rank)throw Error("Dense shape should be Tensor1D but received shape ".concat(i.shape));if(0!==s.rank)throw Error("Default value should be a scalar but received shape ".concat(s.shape));var u=rd.runKernel(tp,{indices:o,values:a,denseShape:i,defaultValue:s});return{outputIndices:u[0],outputValues:u[1],emptyRowIndicator:u[2],reverseIndexMap:u[3]}}}),ip=op({sparseReshape_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"inputIndices","sparseReshape","int32"),o=convertToTensor(t,"inputShape","sparseReshape","int32"),a=convertToTensor(r,"newShape","sparseReshape","int32");if(2!==n.rank)throw Error("Input indices should be Tensor2D but received shape\n        ".concat(n.shape));if(1!==o.rank)throw Error("Input shape should be Tensor1D but received shape ".concat(o.shape));if(1!==a.rank)throw Error("New shape should be Tensor1D but received shape ".concat(a.shape));var i=rd.runKernel(tf,{inputIndices:n,inputShape:o,newShape:a});return{outputIndices:i[0],outputShape:i[1]}}}),ig=op({sparseSegmentMean_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"data","sparseSegmentMean"),o=convertToTensor(t,"indices","sparseSegmentMean","int32"),a=convertToTensor(r,"segmentIds","sparseSegmentMean","int32");if(n.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==o.rank)throw Error("Indices should be Tensor1D but received shape\n          ".concat(o.shape));if(1!==a.rank)throw Error("Segment ids should be Tensor1D but received shape\n          ".concat(a.shape));return rd.runKernel(tg,{data:n,indices:o,segmentIds:a})}}),im=op({sparseSegmentSum_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"data","sparseSegmentSum"),o=convertToTensor(t,"indices","sparseSegmentSum","int32"),a=convertToTensor(r,"segmentIds","sparseSegmentSum","int32");if(n.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==o.rank)throw Error("Indices should be Tensor1D but received shape\n         ".concat(o.shape));if(1!==a.rank)throw Error("Segment ids should be Tensor1D but received shape\n         ".concat(a.shape));return rd.runKernel(tm,{data:n,indices:o,segmentIds:a})}}),iv=op({stringNGrams_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n,o,a,i,s){var u=convertToTensor(e,"data","stringNGrams","string");if("string"!==u.dtype)throw Error("Data must be of datatype string");if(1!==u.shape.length)throw Error("Data must be a vector, saw: ".concat(u.shape));var c=convertToTensor(t,"dataSplits","stringNGrams");if("int32"!==c.dtype)throw Error("Data splits must be of datatype int32");var l=rd.runKernel(tw,{data:u,dataSplits:c},{separator:r,nGramWidths:n,leftPad:o,rightPad:a,padWidth:i,preserveShortSequences:s});return{nGrams:l[0],nGramsSplits:l[1]}}}),iy=op({stringSplit_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){void 0===r&&(r=!0);var n=convertToTensor(e,"input","stringSplit","string"),o=convertToTensor(t,"delimiter","stringSplit","string");if(1!==n.rank)throw Error("Input should be Tensor1D but received shape ".concat(n.shape));if(0!==o.rank)throw Error("Delimiter should be a scalar but received shape ".concat(o.shape));var a={skipEmpty:r},i=rd.runKernel(t_,{input:n,delimiter:o},a);return{indices:i[0],values:i[1],shape:i[2]}}}),ib=op({stringToHashBucketFast_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=convertToTensor(e,"input","stringToHashBucketFast","string");if(t<=0)throw Error("Number of buckets must be at least 1");return rd.runKernel(tk,{input:r},{numBuckets:t})}}),iT=op({staticRegexReplace_:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n=!0);var o=convertToTensor(e,"input","staticRegexReplace","string"),a={pattern:t,rewrite:r,replaceGlobal:n};return rd.runKernel(tb,{x:o},a)}}),iw=new Map,i_=new Map,ik=function(){function Serializable(){}return Serializable.prototype.getClassName=function(){return this.constructor.className},Serializable.fromConfig=function(e,t){return new e(t)},Serializable}(),iS=function(){function SerializationMap(){this.classNameMap={}}return SerializationMap.getMap=function(){return null==SerializationMap.instance&&(SerializationMap.instance=new SerializationMap),SerializationMap.instance},SerializationMap.register=function(e){SerializationMap.getMap().classNameMap[e.className]=[e,e.fromConfig]},SerializationMap}();function registerClass(e,t,r){assert(null!=e.className,function(){return"Class being registered does not have the static className property defined."}),assert("string"==typeof e.className,function(){return"className is required to be a string, but got type "+typeof e.className}),assert(e.className.length>0,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),void 0===t&&(t="Custom"),void 0===r&&(r=e.className);var n=t+">"+r;return iS.register(e),iw.set(n,e),i_.set(e,n),e}var ix=function(e){function Optimizer(){return null!==e&&e.apply(this,arguments)||this}return __extends(Optimizer,e),Optimizer.prototype.minimize=function(e,t,r){void 0===t&&(t=!1);var n=this.computeGradients(e,r),o=n.value,a=n.grads;if(null!=r){var i=r.map(function(e){return{name:e.name,tensor:a[e.name]}});this.applyGradients(i)}else this.applyGradients(a);return(dispose(a),t)?o:(o.dispose(),null)},Object.defineProperty(Optimizer.prototype,"iterations",{get:function(){return null==this.iterations_&&(this.iterations_=0),this.iterations_},enumerable:!1,configurable:!0}),Optimizer.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},Optimizer.prototype.computeGradients=function(e,t){return variableGrads(e,t)},Optimizer.prototype.dispose=function(){null!=this.iterations_&&dispose(this.iterations_)},Optimizer.prototype.saveIterations=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return null==this.iterations_&&(this.iterations_=0),[2,{name:"iter",tensor:scalar(this.iterations_,"int32")}]})})},Optimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for this optimizer yet.")})})},Optimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for this optimizer class "+"".concat(this.getClassName()))})})},Optimizer.prototype.extractIterations=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return t=this,[4,e[0].tensor.data()];case 1:return t.iterations_=r.sent()[0],[2,e.slice(1)]}})})},Optimizer}(ik);Object.defineProperty(ix,Symbol.hasInstance,{value:function(e){return null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients}});var iE=function(e){function AdadeltaOptimizer(t,r,n){void 0===n&&(n=null);var o=e.call(this)||this;return o.learningRate=t,o.rho=r,o.epsilon=n,o.accumulatedGrads=[],o.accumulatedUpdates=[],null==n&&(o.epsilon=rd.backend.epsilon()),o}return __extends(AdadeltaOptimizer,e),Object.defineProperty(AdadeltaOptimizer,"className",{get:function(){return"Adadelta"},enumerable:!1,configurable:!0}),AdadeltaOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var o=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accum_grad"),variable:tidy(function(){return nI(o).variable(!1)})}),null==t.accumulatedUpdates[n]&&(t.accumulatedUpdates[n]={originalName:"".concat(r,"/accum_var"),variable:tidy(function(){return nI(o).variable(!1)})});var a=Array.isArray(e)?e[n].tensor:e[r];if(null!=a){var i=t.accumulatedGrads[n].variable,s=t.accumulatedUpdates[n].variable;tidy(function(){var e=rF(rC(i,t.rho),rC(nG(a),1-t.rho)),r=rC(rP(nL(rF(s,t.epsilon)),nL(rF(i,t.epsilon))),a),n=rF(rC(s,t.rho),rC(nG(r),1-t.rho));i.assign(e),s.assign(n);var u=rF(rC(r,-t.learningRate),o);o.assign(u)})}}),this.incrementIterations()},AdadeltaOptimizer.prototype.dispose=function(){null!=this.accumulatedUpdates&&(dispose(this.accumulatedGrads.map(function(e){return e.variable})),dispose(this.accumulatedUpdates.map(function(e){return e.variable})))},AdadeltaOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedGrads),!1),__read(this.accumulatedUpdates),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdadeltaOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return t=(e=r.sent()).length/2,this.accumulatedGrads=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedUpdates=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdadeltaOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},AdadeltaOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.rho,t.epsilon)},AdadeltaOptimizer}(ix),iA=function(e){function AdagradOptimizer(t,r){void 0===r&&(r=.1);var n=e.call(this)||this;return n.learningRate=t,n.initialAccumulatorValue=r,n.accumulatedGrads=[],n}return __extends(AdagradOptimizer,e),Object.defineProperty(AdagradOptimizer,"className",{get:function(){return"Adagrad"},enumerable:!1,configurable:!0}),AdagradOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var o=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accumulator"),variable:tidy(function(){return fill(o.shape,t.initialAccumulatorValue).variable(!1)})});var a=Array.isArray(e)?e[n].tensor:e[r];if(null!=a){var i=t.accumulatedGrads[n].variable;tidy(function(){var e=rF(i,nG(a));i.assign(e);var r=rF(rC(rP(a,nL(rF(e,rd.backend.epsilon()))),-t.learningRate),o);o.assign(r)})}}),this.incrementIterations()},AdagradOptimizer.prototype.dispose=function(){null!=this.accumulatedGrads&&dispose(this.accumulatedGrads.map(function(e){return e.variable}))},AdagradOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdagradOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulatedGrads=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdagradOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},AdagradOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.initialAccumulatorValue)},AdagradOptimizer}(ix),iM=function(e){function AdamOptimizer(t,r,n,o){void 0===o&&(o=null);var a=e.call(this)||this;return a.learningRate=t,a.beta1=r,a.beta2=n,a.epsilon=o,a.accumulatedFirstMoment=[],a.accumulatedSecondMoment=[],tidy(function(){a.accBeta1=scalar(r).variable(),a.accBeta2=scalar(n).variable()}),null==o&&(a.epsilon=rd.backend.epsilon()),a}return __extends(AdamOptimizer,e),Object.defineProperty(AdamOptimizer,"className",{get:function(){return"Adam"},enumerable:!1,configurable:!0}),AdamOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=or(1,t.accBeta1),o=or(1,t.accBeta2);r.forEach(function(r,a){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[a]&&(t.accumulatedFirstMoment[a]={originalName:"".concat(r,"/m"),variable:tidy(function(){return nI(i).variable(!1)})}),null==t.accumulatedSecondMoment[a]&&(t.accumulatedSecondMoment[a]={originalName:"".concat(r,"/v"),variable:tidy(function(){return nI(i).variable(!1)})});var s=Array.isArray(e)?e[a].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[a].variable,c=t.accumulatedSecondMoment[a].variable,l=rF(rC(u,t.beta1),rC(s,1-t.beta1)),d=rF(rC(c,t.beta2),rC(nG(s),1-t.beta2)),h=rP(l,n),p=rP(d,o);u.assign(l),c.assign(d);var f=rF(rC(rP(h,rF(nL(p),t.epsilon)),-t.learningRate),i);i.assign(f)}}),t.accBeta1.assign(rC(t.accBeta1,t.beta1)),t.accBeta2.assign(rC(t.accBeta2,t.beta2))}),this.incrementIterations()},AdamOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedSecondMoment&&dispose(this.accumulatedSecondMoment.map(function(e){return e.variable}))},AdamOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedFirstMoment),!1),__read(this.accumulatedSecondMoment),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdamOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r=this;return __generator(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),tidy(function(){r.accBeta1.assign(nz(r.beta1,r.iterations_+1)),r.accBeta2.assign(nz(r.beta2,r.iterations_+1))}),t=e.length/2,this.accumulatedFirstMoment=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedSecondMoment=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdamOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},AdamOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)},AdamOptimizer}(ix),iI=function(e){function AdamaxOptimizer(t,r,n,o,a){void 0===o&&(o=null),void 0===a&&(a=0);var i=e.call(this)||this;return i.learningRate=t,i.beta1=r,i.beta2=n,i.epsilon=o,i.decay=a,i.accumulatedFirstMoment=[],i.accumulatedWeightedInfNorm=[],tidy(function(){i.iteration=scalar(0).variable(),i.accBeta1=scalar(r).variable()}),null==o&&(i.epsilon=rd.backend.epsilon()),i}return __extends(AdamaxOptimizer,e),Object.defineProperty(AdamaxOptimizer,"className",{get:function(){return"Adamax"},enumerable:!1,configurable:!0}),AdamaxOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=or(1,t.accBeta1),o=rP(-t.learningRate,rF(rC(t.iteration,t.decay),1));r.forEach(function(r,a){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[a]&&(t.accumulatedFirstMoment[a]={originalName:"".concat(r,"/m"),variable:nI(i).variable(!1)}),null==t.accumulatedWeightedInfNorm[a]&&(t.accumulatedWeightedInfNorm[a]={originalName:"".concat(r,"/v"),variable:nI(i).variable(!1)});var s=Array.isArray(e)?e[a].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[a].variable,c=t.accumulatedWeightedInfNorm[a].variable,l=rF(rC(u,t.beta1),rC(s,1-t.beta1)),d=of(rC(c,t.beta2),rz(s));u.assign(l),c.assign(d);var h=rF(rC(rP(o,n),rP(l,rF(d,t.epsilon))),i);i.assign(h)}}),t.iteration.assign(rF(t.iteration,1)),t.accBeta1.assign(rC(t.accBeta1,t.beta1))}),this.incrementIterations()},AdamaxOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedWeightedInfNorm&&dispose(this.accumulatedWeightedInfNorm.map(function(e){return e.variable}))},AdamaxOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},AdamaxOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)},AdamaxOptimizer}(ix),iN=function(e){function SGDOptimizer(t){var r=e.call(this)||this;return r.learningRate=t,r.setLearningRate(t),r}return __extends(SGDOptimizer,e),Object.defineProperty(SGDOptimizer,"className",{get:function(){return"SGD"},enumerable:!1,configurable:!0}),SGDOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var a=rd.registeredVariables[r];tidy(function(){var e=rF(rC(t.c,o),a);a.assign(e)})}}),this.incrementIterations()},SGDOptimizer.prototype.setLearningRate=function(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=keep(scalar(-e))},SGDOptimizer.prototype.dispose=function(){this.c.dispose()},SGDOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}})})},SGDOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:if(0!==(e=t.sent()).length)throw Error("SGD optimizer does not have settable weights.");return[2]}})})},SGDOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate}},SGDOptimizer.fromConfig=function(e,t){return new e(t.learningRate)},SGDOptimizer}(ix),iD=function(e){function MomentumOptimizer(t,r,n){void 0===n&&(n=!1);var o=e.call(this,t)||this;return o.learningRate=t,o.momentum=r,o.useNesterov=n,o.accumulations=[],o.m=scalar(o.momentum),o}return __extends(MomentumOptimizer,e),Object.defineProperty(MomentumOptimizer,"className",{get:function(){return"Momentum"},enumerable:!1,configurable:!0}),MomentumOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var o=rd.registeredVariables[r];null==t.accumulations[n]&&(t.accumulations[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nI(o).variable(!1)})});var a=t.accumulations[n].variable,i=Array.isArray(e)?e[n].tensor:e[r];null!=i&&tidy(function(){var e,r=rF(rC(t.m,a),i);e=t.useNesterov?rF(rC(t.c,rF(i,rC(r,t.m))),o):rF(rC(t.c,r),o),a.assign(r),o.assign(e)})}),this.incrementIterations()},MomentumOptimizer.prototype.dispose=function(){this.m.dispose(),null!=this.accumulations&&dispose(this.accumulations.map(function(e){return e.variable}))},MomentumOptimizer.prototype.setMomentum=function(e){this.momentum=e},MomentumOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},MomentumOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulations=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},MomentumOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},MomentumOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)},MomentumOptimizer}(iN),iR=function(e){function RMSPropOptimizer(t,r,n,o,a){void 0===r&&(r=.9),void 0===n&&(n=0),void 0===o&&(o=null),void 0===a&&(a=!1);var i=e.call(this)||this;if(i.learningRate=t,i.decay=r,i.momentum=n,i.epsilon=o,i.accumulatedMeanSquares=[],i.accumulatedMoments=[],i.accumulatedMeanGrads=[],i.centered=a,null==o&&(i.epsilon=rd.backend.epsilon()),null==t)throw Error("learningRate for RMSPropOptimizer must be defined.");return i}return __extends(RMSPropOptimizer,e),Object.defineProperty(RMSPropOptimizer,"className",{get:function(){return"RMSProp"},enumerable:!1,configurable:!0}),RMSPropOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var o=rd.registeredVariables[r];null==t.accumulatedMeanSquares[n]&&(t.accumulatedMeanSquares[n]={originalName:"".concat(r,"/rms"),variable:tidy(function(){return nI(o).variable(!1)})}),null==t.accumulatedMoments[n]&&(t.accumulatedMoments[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nI(o).variable(!1)})}),null==t.accumulatedMeanGrads[n]&&t.centered&&(t.accumulatedMeanGrads[n]={originalName:"".concat(r,"/mg"),variable:tidy(function(){return nI(o).variable(!1)})});var a=Array.isArray(e)?e[n].tensor:e[r];if(null!=a){var i=t.accumulatedMeanSquares[n].variable,s=t.accumulatedMoments[n].variable;tidy(function(){var e=rF(rC(i,t.decay),rC(nG(a),1-t.decay));if(t.centered){var r=t.accumulatedMeanGrads[n].variable,u=rF(rC(r,t.decay),rC(a,1-t.decay)),c=rP(rC(a,t.learningRate),nL(or(e,rF(nG(u),t.epsilon)))),l=rF(rC(s,t.momentum),c);i.assign(e),r.assign(u),s.assign(l);var d=or(o,l);o.assign(d)}else{var h=rF(rC(i,t.decay),rC(nG(a),1-t.decay)),l=rF(rC(s,t.momentum),rP(rC(a,t.learningRate),nL(rF(h,t.epsilon))));i.assign(h),s.assign(l);var d=or(o,l);o.assign(d)}})}}),this.incrementIterations()},RMSPropOptimizer.prototype.dispose=function(){null!=this.accumulatedMeanSquares&&dispose(this.accumulatedMeanSquares.map(function(e){return e.variable})),null!=this.accumulatedMeanGrads&&this.centered&&dispose(this.accumulatedMeanGrads.map(function(e){return e.variable})),null!=this.accumulatedMoments&&dispose(this.accumulatedMoments.map(function(e){return e.variable}))},RMSPropOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedMeanSquares),!1),__read(this.accumulatedMoments),!1),this.centered&&e.push.apply(e,__spreadArray([],__read(this.accumulatedMeanGrads),!1)),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},RMSPropOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),t=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedMoments=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}})),[2]}})})},RMSPropOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},RMSPropOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)},RMSPropOptimizer}(ix),iB=[iE,iA,iM,iI,iD,iR,iN];function defer(e){return new Promise(function(e){return setTimeout(e)}).then(e)}var iF=function(){function BrowserDownloads(e){if(!env().getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(BrowserDownloads.URL_SCHEME)&&(e=e.slice(BrowserDownloads.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}return BrowserDownloads.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,a,i,s;return __generator(this,function(u){switch(u.label){case 0:if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");if(t=rm.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"})),!(e.modelTopology instanceof ArrayBuffer))return[3,1];throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],o=getModelJSONForModelArtifacts(e,n),a=window.URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"})),(i=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor).download=this.modelJsonFileName,i.href=a,[4,defer(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:if(u.sent(),!(null!=e.weightData))return[3,4];return(s=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=r,[4,defer(function(){return s.dispatchEvent(new MouseEvent("click"))})];case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e)}]}})})},BrowserDownloads}();iF.URL_SCHEME="downloads://";var iO=function(){function BrowserFiles(e){if(null==e||e.length<1)throw Error("When calling browserFiles, at least 1 file is required, "+"but received ".concat(e));this.jsonFile=e[0],this.weightsFiles=e.slice(1)}return BrowserFiles.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=new FileReader;n.onload=function(n){var o=JSON.parse(n.target.result),a=o.modelTopology;if(null==a){r(Error("modelTopology field is missing from file ".concat(e.jsonFile.name)));return}if(null==o.weightsManifest){r(Error("weightManifest field is missing from file ".concat(e.jsonFile.name)));return}if(0===e.weightsFiles.length){t({modelTopology:a});return}t(getModelArtifactsForJSON(o,function(t){return e.loadWeights(t)}))},n.onerror=function(t){return r("Failed to read model topology and weights manifest JSON "+"from file '".concat(e.jsonFile.name,"'. BrowserFiles supports loading ")+"Keras-style tf.Model artifacts only.")},n.readAsText(e.jsonFile)})]})})},BrowserFiles.prototype.loadWeights=function(e){var t,r,n=this,o=[],a=[];try{for(var i=__values(e),s=i.next();!s.done;s=i.next()){var u=s.value;o.push.apply(o,__spreadArray([],__read(u.weights),!1)),a.push.apply(a,__spreadArray([],__read(u.paths),!1))}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}var c=this.checkManifestAndWeightFiles(e);return Promise.all(a.map(function(e){return n.loadWeightsFile(e,c[e])})).then(function(e){return[o,e]})},BrowserFiles.prototype.loadWeightsFile=function(e,t){return new Promise(function(r,n){var o=new FileReader;o.onload=function(e){r(e.target.result)},o.onerror=function(t){return n("Failed to weights data from file of path '".concat(e,"'."))},o.readAsArrayBuffer(t)})},BrowserFiles.prototype.checkManifestAndWeightFiles=function(e){var t,r,n=this,o=[],a=this.weightsFiles.map(function(e){return basename(e.name)}),i={};try{for(var s=__values(e),u=s.next();!u.done;u=s.next())u.value.paths.forEach(function(e){var t=basename(e);if(-1!==o.indexOf(t))throw Error("Duplicate file basename found in weights manifest: "+"'".concat(t,"'"));if(o.push(t),-1===a.indexOf(t))throw Error("Weight file with basename '".concat(t,"' is not provided."));i[e]=n.weightsFiles[a.indexOf(t)]})}catch(e){t={error:e}}finally{try{u&&!u.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}if(o.length!==this.weightsFiles.length)throw Error("Mismatch in the number of files in weights manifest "+"(".concat(o.length,") and the number of weight files provided ")+"(".concat(this.weightsFiles.length,")."));return i},BrowserFiles}();/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function monitorPromisesProgress(e,t,r,n){assert(null!=e&&Array.isArray(e)&&e.length>0,function(){return"promises must be a none empty array"}),o=r=null==r?0:r,a=n=null==n?1:n,assert(o>=0&&o<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got startFraction ".concat(o)}),assert(a>=0&&a<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got endFraction ".concat(a)}),assert(a>=o,function(){return"startFraction must be no more than endFraction, but "+"got startFraction ".concat(o," and endFraction ")+"".concat(a)});var o,a,i=0;return Promise.all(e.map(function(o){return o.then(function(o){return t(r+ ++i/e.length*(n-r)),o}),o}))}function loadWeightsAsArrayBuffer(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:if(null==t&&(t={}),r=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,n=e.map(function(e){return r(e,t.requestInit,{isBinary:!0})}),o=0,a=.5,null!=t.onProgress)return[3,2];return[4,Promise.all(n)];case 1:return i=d.sent(),[3,4];case 2:return[4,monitorPromisesProgress(n,t.onProgress,o,a)];case 3:i=d.sent(),d.label=4;case 4:if(s=i.map(function(e){return e.arrayBuffer()}),u=.5,c=1,null!=t.onProgress)return[3,6];return[4,Promise.all(s)];case 5:return l=d.sent(),[3,8];case 6:return[4,monitorPromisesProgress(s,t.onProgress,u,c)];case 7:l=d.sent(),d.label=8;case 8:return[2,l]}})})}function weightsLoaderFactory(e){var t=this;return function(r,n,o){return void 0===n&&(n=""),__awaiter(t,void 0,void 0,function(){var t,a,i,s,u,c,l,d,h,p;return __generator(this,function(f){switch(f.label){case 0:if(t=r.map(function(){return!1}),a={},i=null!=o?o.map(function(){return!1}):[],s=[],r.forEach(function(e,r){var n=0;e.weights.forEach(function(e){var u=rg["quantization"in e?e.quantization.dtype:e.dtype]*sizeFromShape(e.shape),enqueueWeightsForFetchingFn=function(){t[r]=!0,null==a[r]&&(a[r]=[]),a[r].push({manifestEntry:e,groupOffset:n,sizeBytes:u})};null!=o?o.forEach(function(t,r){t===e.name&&(enqueueWeightsForFetchingFn(),i[r]=!0)}):enqueueWeightsForFetchingFn(),s.push(e.name),n+=u})}),!i.every(function(e){return e}))throw u=o.filter(function(e,t){return!i[t]}),Error("Could not find weights in manifest with names: "+"".concat(u.join(", "),". \n")+"Manifest JSON has weights with names: "+"".concat(s.join(", "),"."));return c=t.reduce(function(e,t,r){return t&&e.push(r),e},[]),l=[],c.forEach(function(e){r[e].paths.forEach(function(e){var t=n+(n.endsWith("/")?"":"/")+e;l.push(t)})}),[4,e(l)];case 1:return d=f.sent(),h={},p=0,c.forEach(function(e){var t=r[e].paths.length,n=new rm(d.slice(p,p+t));a[e].forEach(function(e){var t=decodeWeights(n.slice(e.groupOffset,e.groupOffset+e.sizeBytes),[e.manifestEntry]);for(var r in t)h[r]=t[r]}),p+=t}),[2,h]}})})}}ry.registerSaveRouter(function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(iF.URL_SCHEME)?(void 0===(t=e.slice(iF.URL_SCHEME.length))&&(t="model"),new iF(t)):null});var iP=function(){function HTTPRequest(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(assert("function"==typeof t.fetchFunc,function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=t.fetchFunc):this.fetch=env().platform.fetch,assert(null!=e&&e.length>0,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(e)&&assert(2===e.length,function(){return"URL paths for http must have a length of 2, "+"(actual length is ".concat(e.length,").")}),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}return HTTPRequest.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,a;return __generator(this,function(i){switch(i.label){case 0:if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=getModelJSONForModelArtifacts(e,r),t.body.append("model.json",new Blob([JSON.stringify(n)],{type:"application/json"}),"model.json"),null!=e.weightData&&(o=rm.join(e.weightData),t.body.append("model.weights.bin",new Blob([o],{type:"application/octet-stream"}),"model.weights.bin")),[4,this.fetch(this.path,t)];case 1:if((a=i.sent()).ok)return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e),responses:[a]}];throw Error("BrowserHTTPRequest.save() failed due to HTTP response status "+"".concat(a.status,"."))}})})},HTTPRequest.prototype.loadModelJSON=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,o;return __generator(this,function(a){switch(a.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(e=a.sent()).ok)throw Error("Request to ".concat(this.path," failed with status code ")+"".concat(e.status,". Please verify this URL points to ")+"the model JSON of the model to load.");a.label=2;case 2:return a.trys.push([2,4,,5]),[4,e.json()];case 3:return t=a.sent(),[3,5];case 4:throw a.sent(),r="Failed to parse model JSON of response from ".concat(this.path,"."),this.path.endsWith(".pb")?r+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":r+=" Please make sure the server is serving valid JSON for this request.",Error(r);case 5:if(n=t.modelTopology,o=t.weightsManifest,null==n&&null==o)throw Error("The JSON from HTTP path ".concat(this.path," contains neither model ")+"topology or manifest for weights.");return[2,t]}})})},HTTPRequest.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:if(this.loadOptions.streamWeights)return[2,this.loadStream()];return[4,this.loadModelJSON()];case 1:return[2,getModelArtifactsForJSON(t.sent(),function(t){return e.loadWeights(t)})]}})})},HTTPRequest.prototype.loadStream=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,o=this;return __generator(this,function(a){switch(a.label){case 0:return[4,this.loadModelJSON()];case 1:return e=a.sent(),[4,this.getWeightUrls(e.weightsManifest)];case 2:return t=a.sent(),r=getWeightSpecs(e.weightsManifest),n=function(){return function(e,t){var r,n,o=this,a=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,i=0;return null===(r=t.onProgress)||void 0===r||r.call(t,0),new ReadableStream({pull:function(r){return __awaiter(o,void 0,void 0,function(){var o,s,u,c;return __generator(this,function(l){switch(l.label){case 0:if(!(i<e.length))return[3,4];if(n)return[3,2];return[4,a(e[i],t.requestInit,{isBinary:!0})];case 1:n=l.sent().body.getReader(),l.label=2;case 2:return[4,n.read()];case 3:if(u=(s=l.sent()).done,c=s.value,u)return i++,n=void 0,null===(o=t.onProgress)||void 0===o||o.call(t,i/e.length),[3,0];return r.enqueue(c),[2];case 4:return r.close(),[2]}})})}})}(t,o.loadOptions)},[2,Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:n})]}})})},HTTPRequest.prototype.getWeightUrls=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,o,a,i,s,u,c,l,d,h,p,f,g,m,v,y,b,T;return __generator(this,function(w){switch(w.label){case 0:var _,k,S;r=(t=__read((k=(_=Array.isArray(this.path)?this.path[1]:this.path).lastIndexOf("/"),S=_.lastIndexOf("?"),[_.substring(0,k)+"/",S>k?_.substring(S):""]),2))[0],n=t[1],o=this.weightPathPrefix||r,a=[],i=[];try{for(u=(s=__values(e)).next();!u.done;u=s.next()){c=u.value;try{for(b=void 0,d=(l=__values(c.paths)).next();!d.done;d=l.next())h=d.value,null!=this.weightUrlConverter?i.push(this.weightUrlConverter(h)):a.push(o+h+n)}catch(e){b={error:e}}finally{try{d&&!d.done&&(T=l.return)&&T.call(l)}finally{if(b)throw b.error}}}}catch(e){v={error:e}}finally{try{u&&!u.done&&(y=s.return)&&y.call(s)}finally{if(v)throw v.error}}if(!this.weightUrlConverter)return[3,2];return f=(p=a.push).apply,g=[a],m=[[]],[4,Promise.all(i)];case 1:f.apply(p,g.concat([__spreadArray.apply(void 0,m.concat([__read.apply(void 0,[w.sent()]),!1]))])),w.label=2;case 2:return[2,a]}})})},HTTPRequest.prototype.loadWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(o){switch(o.label){case 0:return[4,this.getWeightUrls(e)];case 1:return t=o.sent(),r=getWeightSpecs(e),[4,loadWeightsAsArrayBuffer(t,this.loadOptions)];case 2:return n=o.sent(),[2,[r,n]]}})})},HTTPRequest}();function isHTTPScheme(e){return null!=e.match(iP.URL_SCHEME_REGEX)}iP.URL_SCHEME_REGEX=/^https?:\/\//;var httpRouter=function(e,t){if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else if(Array.isArray(e)?e.every(function(e){return isHTTPScheme(e)}):isHTTPScheme(e))return http(e,t);return null};function http(e,t){return new iP(e,t)}ry.registerSaveRouter(httpRouter),ry.registerLoadRouter(httpRouter);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var iC=function(){function PassthroughLoader(e){this.modelArtifacts=e}return PassthroughLoader.prototype.load=function(){return this.modelArtifacts},PassthroughLoader}(),iz=function(){function PassthroughSaver(e){this.saveHandler=e}return PassthroughSaver.prototype.save=function(e){return this.saveHandler(e)},PassthroughSaver}(),PassthroughAsync=function(e){e.load&&(this.load=function(){return Promise.resolve(e.load())}),e.save&&(this.save=function(t){return Promise.resolve(e.save(t))})};function fromMemorySync(e,t,r,n){return 1!=arguments.length?(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iC({modelTopology:e,weightSpecs:t,weightData:r,trainingConfig:n})):null!=e.modelTopology||null!=e.weightSpecs?new iC(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iC({modelTopology:e}))}var iL=op({confusionMatrix_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=convertToTensor(e,"labels","confusionMatrix"),o=convertToTensor(t,"predictions","confusionMatrix");assert(null==r||r>0&&Number.isInteger(r),function(){return"If provided, numClasses must be a positive integer, "+"but got ".concat(r)}),assert(1===n.rank,function(){return"Expected the rank of labels to be 1, but got ".concat(n.rank)}),assert(1===o.rank,function(){return"Expected the rank of predictions to be 1, "+"but got ".concat(o.rank)}),assert(n.shape[0]===o.shape[0],function(){return"Mismatch in the number of examples: "+"".concat(n.shape[0]," vs. ").concat(o.shape[0],". ")+"Labels and predictions should have the same number of elements."}),assert(r>0&&Number.isInteger(r),function(){return"numClasses is required to be a positive integer, but got "+"".concat(r)});var a=ok(rR(n,"int32"),r),i=ok(rR(o,"int32"),r);return rR(r1(aO(a),i),"int32")}}),iG=!1;function fromPixels_(e,t){if(void 0===t&&(t=3),t>4)throw Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw Error("pixels passed to tf.browser.fromPixels() can not be null");var r,n,o=!1,a=!1,i=!1,s=!1,u=!1,c=!1;if(e.data instanceof Uint8Array)o=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)a=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)i=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)s=!0;else if(null!=e.getContext)u=!0;else if("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)c=!0;else throw Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, "+"but was ".concat(e.constructor.name));if(null!=getKernel(tF,rd.backendName)){var d={numChannels:t};return rd.runKernel(tF,{pixels:e},d)}var h=__read(i?[e.videoWidth,e.videoHeight]:[e.width,e.height],2),p=h[0],f=h[1];if(u)r=e.getContext("2d").getImageData(0,0,p,f).data;else if(a||o)r=e.data;else if(s||i||c){if(null==l){if("undefined"==typeof document){if("undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof OffscreenCanvasRenderingContext2D)l=new OffscreenCanvas(1,1).getContext("2d");else throw Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.")}else l=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})}l.canvas.width=p,l.canvas.height=f,l.drawImage(e,0,0,p,f),r=l.getImageData(0,0,p,f).data}if(4===t)n=new Int32Array(r);else{var g=p*f;n=new Int32Array(g*t);for(var m=0;m<g;m++)for(var v=0;v<t;++v)n[m*t+v]=r[4*m+v]}return tensor3d(n,[f,p,t],"int32")}function validateImgTensor(e){if(2!==e.rank&&3!==e.rank)throw Error("toPixels only supports rank 2 or 3 tensors, got rank ".concat(e.rank,"."));var t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw Error("toPixels only supports depth of size "+"1, 3 or 4 but got ".concat(t));if("float32"!==e.dtype&&"int32"!==e.dtype)throw Error("Unsupported type for toPixels: ".concat(e.dtype,".")+" Please use float32 or int32 tensors.")}var iW=op({fromPixels_:fromPixels_});function prepareAndValidate(e,t){var r=e.shape.length,n=t.shape.length;if(r<1)throw Error("tf.gatherND() expects the input to be rank 1 or higher,"+" but the rank was ".concat(r,"."));if(n<1)throw Error("tf.gatherND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(n,"."));if("int32"!==t.dtype)throw Error("tf.gatherND() expects the indices to be int32 type,"+" but the dtype was ".concat(t.dtype,"."));if(t.shape[n-1]>r)throw Error("index innermost dimension length must be <= tensor rank; saw: "+"".concat(t.shape[n-1]," vs. ").concat(r));if(0===sizeFromShape(e.shape))throw Error("Requested more than 0 entries, but input is empty."+" Input shape: ".concat(e.shape,"."));for(var o=t.shape,a=o[o.length-1],i=1,s=0;s<o.length-1;++s)i*=o[s];var u=e.shape,c=o.slice();c.pop();for(var l=1,s=a;s<r;++s)l*=u[s],c.push(u[s]);var d=__spreadArray(__spreadArray([],__read(computeStrides(e.shape).map(function(e){return e/l})),!1),[1],!1).slice(0,a);return[c,i,l,d]}function stridesWithElidedDims(e,t,r,n){for(var o=__spreadArray([],__read(e),!1),a=o.length;a<n.length;a++)o.push(1);for(var a=0;a<r;a++)0===a?o[t]=1:(o.splice(t,0,1),o.pop());return o}function getElidedAxes(e,t){for(var r=[],n=0;n<e;n++)r.push(t+n);return r}function startIndicesWithElidedDims(e,t,r,n,o){for(var a=__spreadArray([],__read(o),!1),i=getElidedAxes(r,t),s=0;s<a.length;s++)if(i.indexOf(s)>-1)a[s]=0;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=0),a[s]=l}return a}function stopIndicesWithElidedDims(e,t,r,n,o){for(var a=__spreadArray([],__read(o),!1),i=getElidedAxes(r,t),s=0;s<a.length;s++)if(i.indexOf(s)>-1)a[s]=Number.MAX_SAFE_INTEGER;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=Number.MAX_SAFE_INTEGER),a[s]=l}for(var d=0;d<a.length;d++){var h=o[d];a[d]<0&&(a[d]+=h),a[d]=clamp(0,a[d],o[d])}return a}function stridesForAxis(e,t,r){var n=e[t];return(r&1<<t||null==n)&&(n=1),n}function startForAxis(e,t,r,n,o,a){var i=t[o],s=r[o]||1;(e&1<<o||a&1<<o||null==i)&&(i=s>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var u=n[o];return i<0&&(i+=u),i=clamp(0,i,u-1)}function stopForAxis(e,t,r,n,o,a){var i=t[o],s=r[o]||1;(e&1<<o||a&1<<o||null==i)&&(i=s>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var u=n[o];return i<0&&(i+=u),i=s>0?clamp(0,i,u):clamp(-1,i,u-1)}function canonical(e,t,r,n,o,a){if(o[t])return r>0?a[t]:a[t+1&1];var i=e<0?n+e:e;return i<a[0]?a[0]:i>a[1]?a[1]:i}var iU={__proto__:null,assertParamsValid:function(e,t,r){var n=e.shape.length;assert(n===t.length,function(){return"Error in slice".concat(n,"D: Length of begin ").concat(t," must ")+"match the rank of the array (".concat(n,").")}),assert(n===r.length,function(){return"Error in slice".concat(n,"D: Length of size ").concat(r," must ")+"match the rank of the array (".concat(n,").")});for(var _loop_1=function(o){assert(t[o]+r[o]<=e.shape[o],function(){return"Error in slice".concat(n,"D: begin[").concat(o,"] + size[").concat(o,"] ")+"(".concat(t[o]+r[o],") would overflow input.shape[").concat(o,"] (").concat(e.shape[o],")")})},o=0;o<n;++o)_loop_1(o)},computeFlatOffset:function(e,t){for(var r=e.length>0?e[e.length-1]:1,n=0;n<e.length-1;n++)r+=e[n]*t[n];return r},computeOutShape:function(e,t,r){for(var n=[],o=0;o<e.length;o++)n[o]=Math.ceil((t[o]-e[o])/r[o]);return n},getNormalizedAxes:function(e,t,r,n,o,a,i,s,u){var c=e.length,l=Array(c),d=Array(c),h=Array(c);if(t.length&&r>0){var p=t[0],f=r+1;l=startIndicesWithElidedDims(i,p,f,n,e),d=stopIndicesWithElidedDims(s,p,f,o,e),h=stridesWithElidedDims(a,p,f,e)}else for(var g=0;g<c;g++)l[g]=startForAxis(i,n,a,e,g,u),d[g]=stopForAxis(s,o,a,e,g,u),h[g]=stridesForAxis(a,g,u);return{begin:l,end:d,strides:h}},isSliceContinous:function(e,t,r){for(var n=r.length,o=0;o<r.length;o++)if(r[o]>1){n=o;break}for(var o=n+1;o<r.length;o++)if(t[o]>0||r[o]!==e[o])return!1;return!0},maskToAxes:function(e){for(var t=[],r=0;e>0;)1&e&&t.push(r),e/=2,r++;return t},parseSliceParams:function(e,t,r){var n,o,a=e.shape.length;return(n="number"==typeof t?__spreadArray([t],__read(Array(a-1).fill(0)),!1):t.length<a?t.concat(Array(a-t.length).fill(0)):t.slice()).forEach(function(e){assert(-1!==e,function(){return"slice() does not support negative begin indexing."})}),o=(o=null==r?Array(a).fill(-1):"number"==typeof r?__spreadArray([r],__read(Array(a-1).fill(-1)),!1):r.length<a?r.concat(Array(a-r.length).fill(-1)):r).map(function(t,r){return t>=0?t:(assert(-1===t,function(){return"Negative size values should be exactly -1 but got "+"".concat(t," for the slice() size at index ").concat(r,".")}),e.shape[r]-n[r])}),[n,o]},sliceInfo:function(e,t,r,n,o,a,i,s,u){if(null==n?(c=Array(t.length)).fill(1):c=n,null!=i&&(i&i-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");for(var c,l=!1,d={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:r.slice(),strides:c.slice(),beginMask:o,endMask:a,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u},h=0;h<d.dims;h++)l&&(1<<h&s)!=0&&d.numAddAxisAfterEllipsis++,1<<h&i&&(l=!0);!l&&(d.ellipsisMask|=1<<d.dims,d.dims++);var p={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};(function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;var r=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(var n=0;n<e.dims;n++)if(1<<n&e.ellipsisMask)for(var o=Math.min(t.dims-(e.dims-n)+1+e.numAddAxisAfterEllipsis,t.dims);r<o;r++)t.begin[r]=0,t.end[r]=0,t.strides[r]=1,t.beginMask|=1<<r,t.endMask|=1<<r,t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[r]=n;else if(1<<n&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(r===t.begin.length)throw Error("Index out of range using input dim ".concat(r,"; input ")+"has only ".concat(t.dims," dims, ").concat(t.begin.length,"."));null!=e.begin&&(t.begin[r]=e.begin[n]),null!=e.end&&(t.end[r]=e.end[n]),t.strides[r]=e.strides[n],e.beginMask&1<<n&&(t.beginMask|=1<<r),e.endMask&1<<n&&(t.endMask|=1<<r),e.shrinkAxisMask&1<<n?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<r):(t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(n)),t.inputShapeGatherIndicesSparse[r]=n,r++}})(d,p);for(var f=!0,g=!0,m=!0,v=[],y=[],h=0;h<e.length;++h){if(0===p.strides[h])throw Error("strides[".concat(h,"] must be non-zero"));var b=!!(p.shrinkAxisMask&1<<h),T=e[h];if(-1===T){v.push(b?1:-1);continue}var w=[p.beginMask&1<<h,p.endMask&1<<h],_=[p.strides[h]>0?0:-1,p.strides[h]>0?T:T-1];if(b&&p.strides[h]<=0)throw Error("only stride 1 allowed on non-range indexing.");m=m&&1===p.strides[h];var k=!!(p.beginMask&1<<h&&p.endMask&1<<h);if(p.beginValid&&p.endValid){if(b){var S=p.begin[h]<0?T+p.begin[h]:p.begin[h];if(p.begin[h]=S,p.end[h]=p.begin[h]+1,S<0||S>=T)throw Error("slice index ".concat(p.begin[h]," of dimension ").concat(h," out of bounds."))}else p.begin[h]=canonical(p.begin[h],0,p.strides[h],T,w,_),p.end[h]=canonical(p.end[h],1,p.strides[h],T,w,_);var x=1===p.strides[h]&&0===p.begin[h]&&p.end[h]===T;f=f&&x,g=g&&(0===h&&1===p.strides[h]||x)}else f=f&&1===p.strides[h]&&k,g=g&&(0===h&&1===p.strides[h]||k);var E=void 0,A=!1;if(p.beginValid&&p.endValid?(E=p.end[h]-p.begin[h],A=!0):b?(E=1,A=!0):k&&T>=0&&(E=p.strides[h]<0?-T:T,A=!0),A){var M=void 0;M=0===E||E<0!=p.strides[h]<0?0:Math.trunc(E/p.strides[h])+(E%p.strides[h]!=0?1:0),v.push(M)}else v.push(-1)}for(var I=0;I<p.finalShapeGatherIndices.length;++I){var N=p.finalShapeGatherIndices[I];N>=0?y.push(v[N]):-2===N&&y.push(1)}return{finalShapeSparse:y.filter(function(e,t){return -2!==p.finalShapeGatherIndices[t]}),finalShape:y,isIdentity:f,sliceDim0:g,isSimpleSlice:m,begin:p.begin,end:p.end,strides:p.strides}},startForAxis:startForAxis,startIndicesWithElidedDims:startIndicesWithElidedDims,stopForAxis:stopForAxis,stopIndicesWithElidedDims:stopIndicesWithElidedDims,stridesForAxis:stridesForAxis,stridesWithElidedDims:stridesWithElidedDims},iK=function(){function OptimizerConstructors(){}return OptimizerConstructors.sgd=function(e){return new iN(e)},OptimizerConstructors.momentum=function(e,t,r){return void 0===r&&(r=!1),new iD(e,t,r)},OptimizerConstructors.rmsprop=function(e,t,r,n,o){return void 0===t&&(t=.9),void 0===r&&(r=0),void 0===n&&(n=null),void 0===o&&(o=!1),new iR(e,t,r,n,o)},OptimizerConstructors.adam=function(e,t,r,n){return void 0===e&&(e=.001),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),new iM(e,t,r,n)},OptimizerConstructors.adadelta=function(e,t,r){return void 0===e&&(e=.001),void 0===t&&(t=.95),void 0===r&&(r=null),new iE(e,t,r)},OptimizerConstructors.adamax=function(e,t,r,n,o){return void 0===e&&(e=.002),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),void 0===o&&(o=0),new iI(e,t,r,n,o)},OptimizerConstructors.adagrad=function(e,t){return void 0===t&&(t=.1),new iA(e,t)},OptimizerConstructors}(),iq="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:function(e){return e()};!function(e){e[e.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",e[e.VALUE_ROWIDS=1]="VALUE_ROWIDS",e[e.ROW_LENGTHS=2]="ROW_LENGTHS",e[e.ROW_SPLITS=3]="ROW_SPLITS",e[e.ROW_LIMITS=4]="ROW_LIMITS",e[e.ROW_STARTS=5]="ROW_STARTS"}(d||(d={}));var iV=/->/g;/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(function(){var e,t;try{for(var r=__values(iB),n=r.next();!n.done;n=r.next()){var o=n.value;registerClass(o)}}catch(t){e={error:t}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}})(),t.Abs="Abs",t.Acos=m,t.Acosh=v,t.AdadeltaOptimizer=iE,t.AdagradOptimizer=iA,t.AdamOptimizer=iM,t.AdamaxOptimizer=iI,t.Add="Add",t.AddN=y,t.All="All",t.Any="Any",t.ArgMax=b,t.ArgMin=T,t.Asin=w,t.Asinh=_,t.Atan=k,t.Atan2=x,t.Atanh=S,t.AvgPool=E,t.AvgPool3D=A,t.AvgPool3DGrad="AvgPool3DGrad",t.AvgPoolGrad="AvgPoolGrad",t.BatchMatMul=M,t.BatchToSpaceND=I,t.Bincount=N,t.BitwiseAnd=D,t.BroadcastArgs=R,t.BroadcastTo="BroadcastTo",t.Cast=B,t.Ceil=F,t.ClipByValue=O,t.Complex=P,t.ComplexAbs=C,t.Concat=z,t.Conv2D=L,t.Conv2DBackpropFilter=G,t.Conv2DBackpropInput=W,t.Conv3D=U,t.Conv3DBackpropFilterV2="Conv3DBackpropFilterV2",t.Conv3DBackpropInputV2=K,t.Cos="Cos",t.Cosh=q,t.CropAndResize=j,t.Cumprod=V,t.Cumsum=H,t.DataStorage=h,t.DenseBincount=J,t.DepthToSpace=$,t.DepthwiseConv2dNative=Z,t.DepthwiseConv2dNativeBackpropFilter=Y,t.DepthwiseConv2dNativeBackpropInput=X,t.Diag=Q,t.Dilation2D=ee,t.Dilation2DBackpropFilter="Dilation2DBackpropFilter",t.Dilation2DBackpropInput="Dilation2DBackpropInput",t.Draw=et,t.Einsum=en,t.Elu="Elu",t.EluGrad="EluGrad",t.Environment=g,t.Equal=eo,t.Erf="Erf",t.Exp="Exp",t.ExpandDims=ea,t.Expm1=ei,t.FFT="FFT",t.Fill=es,t.FlipLeftRight=eu,t.Floor=ec,t.FloorDiv=el,t.FromPixels=tF,t.FusedBatchNorm=ed,t.FusedConv2D=tC,t.FusedDepthwiseConv2D=tz,t.GatherNd=ep,t.GatherV2=eh,t.Greater=ef,t.GreaterEqual=eg,t.IFFT=ev,t.Identity=em,t.Imag=ey,t.IsFinite=eb,t.IsInf=eT,t.IsNan=ew,t.KernelBackend=p,t.LRN="LRN",t.LRNGrad="LRNGrad",t.LeakyRelu=e_,t.Less=ek,t.LessEqual=eS,t.LinSpace=ex,t.Log="Log",t.Log1p=eE,t.LogSoftmax="LogSoftmax",t.LogicalAnd=eA,t.LogicalNot=eM,t.LogicalOr=eI,t.LogicalXor="LogicalXor",t.LowerBound="LowerBound",t.MatrixBandPart="MatrixBandPart",t.Max="Max",t.MaxPool=eD,t.MaxPool3D=eR,t.MaxPool3DGrad="MaxPool3DGrad",t.MaxPoolGrad="MaxPoolGrad",t.MaxPoolWithArgmax=eB,t.Maximum=eN,t.Mean=eF,t.Min="Min",t.Minimum=eO,t.MirrorPad=eP,t.Mod="Mod",t.MomentumOptimizer=iD,t.Multinomial=eC,t.Multiply=ez,t.Neg="Neg",t.NonMaxSuppressionV3=eG,t.NonMaxSuppressionV4=eW,t.NonMaxSuppressionV5=eU,t.NotEqual=eL,t.OP_SCOPE_SUFFIX=rp,t.OneHot=eq,t.OnesLike=eK,t.Optimizer=ix,t.OptimizerConstructors=iK,t.Pack=eV,t.PadV2=eH,t.Pool="Pool",t.Pow="Pow",t.Prelu=ej,t.Prod=eJ,t.RMSPropOptimizer=iR,t.RaggedGather=e$,t.RaggedRange=eZ,t.RaggedTensorToTensor=eY,t.Range=eX,t.Real=eQ,t.RealDiv=er,t.Reciprocal=e0,t.Relu=e1,t.Relu6=e6,t.Reshape=e2,t.ResizeBilinear=e4,t.ResizeBilinearGrad="ResizeBilinearGrad",t.ResizeNearestNeighbor=e3,t.ResizeNearestNeighborGrad="ResizeNearestNeighborGrad",t.Reverse=e5,t.RotateWithOffset=tO,t.Round=e8,t.Rsqrt=e7,t.SGDOptimizer=iN,t.ScatterNd=e9,t.SearchSorted=tt,t.Select=tr,t.Selu=tn,t.Sigmoid=ts,t.Sign=ti,t.Sin="Sin",t.Sinh=ta,t.Slice=to,t.Softmax=th,t.Softplus=tu,t.SpaceToBatchND=tl,t.SparseFillEmptyRows=tp,t.SparseReshape=tf,t.SparseSegmentMean=tg,t.SparseSegmentSum=tm,t.SparseToDense=tv,t.SplitV=td,t.Sqrt=tc,t.Square="Square",t.SquaredDifference=ty,t.StaticRegexReplace=tb,t.Step=tB,t.StridedSlice=tT,t.StringNGrams=tw,t.StringSplit=t_,t.StringToHashBucketFast=tk,t.Sub="Sub",t.Sum="Sum",t.Tan="Tan",t.Tanh=tS,t.Tensor=ri,t.TensorBuffer=rn,t.TensorScatterUpdate=te,t.Tile=tx,t.TopK=tE,t.Transform=tA,t.Transpose=tM,t.Unique=tI,t.Unpack=tN,t.UnsortedSegmentSum=tD,t.UpperBound="UpperBound",t.Variable=rs,t.ZerosLike=tR,t._FusedMatMul=tP,t.abs=rz,t.acos=rL,t.acosh=rG,t.add=rF,t.addN=rW,t.all=rU,t.any=rK,t.argMax=rq,t.argMin=rV,t.asin=rH,t.asinh=rj,t.atan=rJ,t.atan2=r$,t.atanh=rZ,t.avgPool=rX,t.avgPool3d=rQ,t.backend=backend,t.backend_util={__proto__:null,ERF_A1:.254829592,ERF_A2:-.284496736,ERF_A3:1.421413741,ERF_A4:-1.453152027,ERF_A5:1.061405429,ERF_P:.3275911,PARALLELIZE_THRESHOLD:30,get RowPartitionType(){return d},SELU_SCALE:1.0507009873554805,SELU_SCALEALPHA:1.7580993408473768,applyActivation:applyActivation,assertAndGetBroadcastShape:assertAndGetBroadcastShape,assertAxesAreInnerMostDims:function(e,t,r){assert(axesAreInnerMostDims(t,r),function(){return"".concat(e," supports only inner-most axes for now. ")+"Got axes ".concat(t," and rank-").concat(r," input.")})},assertParamsConsistent:/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r=e[0].length;e.forEach(function(e,t){assert(e.length===r,function(){return"Error in concat".concat(r,"D: rank of tensors[").concat(t,"] must be the same ")+"as the rank of the rest (".concat(r,")")})}),assert(t>=0&&t<r,function(){return"Error in concat".concat(r,"D: axis must be between 0 and ").concat(r-1,".")});var n=e[0];e.forEach(function(e,o){for(var a=0;a<r;a++)assert(a===t||e[a]===n[a],function(){return"Error in concat".concat(r,"D: Shape of tensors[").concat(o,"] (").concat(e,") ")+"does not match the shape of the rest (".concat(n,") ")+"along the non-concatenated axis ".concat(o,".")})})},assignToTypedArray:function(e,t,r,n){e[2*n]=t,e[2*n+1]=r},axesAreInnerMostDims:axesAreInnerMostDims,calculateShapes:calculateShapes,checkEinsumDimSizes:function(e,t,r){for(var n=Array(e),_loop_2=function(e){for(var o=r[e].shape,_loop_3=function(r){void 0===n[t[e][r]]?n[t[e][r]]=o[r]:assert(n[t[e][r]]===o[r],function(){return"Expected dimension ".concat(n[t[e][r]]," at axis ").concat(r," ")+"of input shaped ".concat(JSON.stringify(o),", ")+"but got dimension ".concat(o[r])})},a=0;a<t[e].length;++a)_loop_3(a)},o=0;o<r.length;++o)_loop_2(o)},checkPadOnDimRoundingMode:checkPadOnDimRoundingMode,combineLocations:combineLocations,combineRaggedTensorToTensorShapes:function(e,t,r){var n=[];if(null==r&&null==t)return n;if(null==t)for(;n.length<e+r.length;)n.push(-1);else n=t.slice();if(null==r)return n;if(e+r.length!==n.length)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.rank = ").concat(e+r.length,", but shape.rank = ").concat(n.length));for(var o=1;o<r.length;++o){var a=r[o],i=n[n.length-r.length+o],s=n[i];if(a>=0){if(s>=0){if(s!==a)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.shape[").concat(o+e,"] = ").concat(a," but shape[").concat(o+e,"] = ").concat(s))}else n[i]=a}}return n},complexWithEvenIndex:function(e){for(var t=Math.ceil(e.length/4),r=new Float32Array(t),n=new Float32Array(t),o=0;o<e.length;o+=4)r[Math.floor(o/4)]=e[o],n[Math.floor(o/4)]=e[o+1];return{real:r,imag:n}},complexWithOddIndex:function(e){for(var t=Math.floor(e.length/4),r=new Float32Array(t),n=new Float32Array(t),o=2;o<e.length;o+=4)r[Math.floor(o/4)]=e[o],n[Math.floor(o/4)]=e[o+1];return{real:r,imag:n}},computeConv2DInfo:computeConv2DInfo,computeConv3DInfo:computeConv3DInfo,computeDefaultPad:computeDefaultPad,computeDilation2DInfo:function(e,t,r,n,o,a){void 0===o&&(o="NHWC");var i=e[3];return computeConv2DInfo(e,__spreadArray(__spreadArray([],__read(t),!1),[i],!1),r,a,n,null,null,convertConv2DDataFormat(o))},computeOptimalWindowSize:function(e){return e<=30?e:nearestDivisor(e,Math.floor(Math.sqrt(e)))},computeOutAndReduceShapes:function(e,t){for(var r=[],n=e.length,o=0;o<n;o++)-1===t.indexOf(o)&&r.push(e[o]);return[r,t.map(function(t){return e[t]})]},computeOutShape:function(e,t){for(var r=e[0].slice(),n=1;n<e.length;n++)r[t]+=e[n][t];return r},computePool2DInfo:computePool2DInfo,computePool3DInfo:function(e,t,r,n,o,a,i){void 0===i&&(i="NDHWC");var s,u,c=__read(parse3TupleParam(t),3),l=c[0],d=c[1],h=c[2];if("NDHWC"===i)u="channelsLast",s=[l,d,h,e[4],e[4]];else if("NCDHW"===i)u="channelsFirst",s=[l,d,h,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv3DInfo(e,s,r,n,o,!1,u,a)},convertConv2DDataFormat:convertConv2DDataFormat,decodeEinsumEquation:function(e,t){var r=((e=e.replace(/\s/g,"")).length-e.replace(iV,"").length)/2;if(r<1)throw Error("Equations without an arrow are not supported.");if(r>1)throw Error('Equation must contain exactly one arrow ("'.concat("->",'").'));var n=__read(e.split("->"),2),o=n[0],a=n[1];assert(-1===o.indexOf("..."),function(){return'The ellipsis notation ("'.concat("...",'") is not supported yet.')});var i=o.split(","),s=i.length;if(t!==s)throw Error("Expected ".concat(s," input tensors, received ").concat(t));if(s>2)throw Error("Support for more than 2 input tensors is not implemented yet.");for(var u=[],c=0;c<a.length;++c)!function(e){var t=a[e];if(!i.some(function(e){return -1!==e.indexOf(t)}))throw Error("Output subscripts contain the label ".concat(t," ")+"not present in the input subscripts.");-1===u.indexOf(t)&&u.push(t)}(c);for(var c=0;c<o.length;++c){var l=o[c];-1===u.indexOf(l)&&","!==l&&u.push(l)}for(var d=Array(i.length),c=0;c<s;++c){if(new Set(i[c].split("")).size!==i[c].length)throw Error("Found duplicate axes in input component ".concat(i[c],". ")+"Support for duplicate axes in input is not implemented yet.");d[c]=[];for(var h=0;h<i[c].length;++h)d[c].push(u.indexOf(i[c][h]))}for(var p=u.length,f=a.length,g=[],c=f;c<p;++c)g.push(c);return{allDims:u,summedDims:g,idDims:d}},eitherStridesOrDilationsAreOne:eitherStridesOrDilationsAreOne,expandShapeToKeepDim:expandShapeToKeepDim,exponent:function(e,t,r){var n=(r?2:-2)*Math.PI*(e/t);return{real:Math.cos(n),imag:Math.sin(n)}},exponents:function(e,t){for(var r=new Float32Array(e/2),n=new Float32Array(e/2),o=0;o<Math.ceil(e/2);o++){var a=(t?2:-2)*Math.PI*(o/e);r[o]=Math.cos(a),n[o]=Math.sin(a)}return{real:r,imag:n}},fromStringArrayToUint8:function(e){return e.map(function(e){return encodeString(e)})},fromUint8ToStringArray:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){try{return e.map(function(e){return decodeString(e)})}catch(e){throw Error("Failed to decode encoded string bytes into utf-8, error: ".concat(e))}},getAxesPermutation:function(e,t){if(axesAreInnerMostDims(e,t))return null;for(var r=[],n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);return e.forEach(function(e){return r.push(e)}),r},getBroadcastDims:getBroadcastDims,getComplexWithIndex:function(e,t){return{real:e[2*t],imag:e[2*t+1]}},getEinsumComputePath:function(e,t){var r,n,o=[],a=0;0===e.length&&e.push(-1),a=e.length+1;for(var i=0;i<a;++i)o.push([]);for(var s=[],i=0;i<e.length;++i){var u=function(e,t){for(var r=[],n=0;n<e.length;++n)(0===e[n].length||-1!==e[n].indexOf(t)||-1===t)&&r.push(n);return r}(t,e[i]);try{for(var c=(r=void 0,__values(u)),l=c.next();!l.done;l=c.next()){var d=l.value;-1===s.indexOf(d)&&(o[i].push(d),s.push(d))}}catch(e){r={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(r)throw r.error}}}return{path:e,steps:o}},getEinsumPermutation:function(e,t){var r=Array(e);r.fill(-1);for(var n=0;n<t.length;++n)r[t[n]]=n;for(var o=[],n=0;n<e;++n)-1===r[n]&&o.push(n);return{permutationIndices:r=r.filter(function(e){return -1!==e}),expandDims:o}},getFusedBiasGradient:getFusedBiasGradient,getFusedDyActivation:getFusedDyActivation,getImageCenter:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){return[r*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]},getInnerMostAxes:function(e,t){for(var r=[],n=t-e;n<t;++n)r.push(n);return r},getPermuted:function(e,t,r){void 0===r&&(r=!0);var n=[];if(r){n.push(t);for(var o=t+1;o<e;++o)o<=2*t?(n.push(o),n.push(o-(t+1))):n.push(o)}else{for(var a=[],i=[],o=1;o<e;++o)o>=2*t+1||o%2==1?i.push(o):a.push(o);n.push.apply(n,__spreadArray([],__read(a),!1)),n.push(0),n.push.apply(n,__spreadArray([],__read(i),!1))}return n},getRaggedRank:function(e){return 0===e.length?0:e[0]===d.FIRST_DIM_SIZE?e.length-1:e.length},getReductionAxes:getReductionAxes,getReshaped:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){void 0===n&&(n=!0);var o=[];if(n)(o=o.concat(t.slice(0))).push(e[0]/r),o=o.concat(e.slice(1));else{o=o.concat(e[0]);for(var a=t.length,i=0;i<a;++i)o=o.concat([e[i+1]/t[i],t[i]]);o=o.concat(e.slice(a+1))}return o},getReshapedPermuted:function(e,t,r,n){void 0===n&&(n=!0);var o=[];n?o.push(e[0]/r):o.push(e[0]*r);for(var a=1;a<e.length;++a)a<=t.length?n?o.push(t[a-1]*e[a]):o.push(e[a]/t[a-1]):o.push(e[a]);return o},getRowPartitionTypesHelper:function(e){var t,r,n={FIRST_DIM_SIZE:d.FIRST_DIM_SIZE,VALUE_ROWIDS:d.VALUE_ROWIDS,ROW_LENGTHS:d.ROW_LENGTHS,ROW_SPLITS:d.ROW_SPLITS,ROW_LIMITS:d.ROW_LIMITS,ROW_STARTS:d.ROW_STARTS},o=[];try{for(var a=__values(e),i=a.next();!i.done;i=a.next()){var s=i.value;if(s in n)o.push(n[s]);else break}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return o},getSliceBeginCoords:function(e,t){for(var r=[0],n=0;n<t;++n)r.push(e[n][0]);return r},getSliceSize:function(e,t,r){for(var n=e.slice(0,1),o=0;o<r;++o)n.push(e[o+1]-t[o][0]-t[o][1]);return n},getSparseFillEmptyRowsIndicesDenseShapeMismatch:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return"Received SparseTensor with denseShape[0] = 0 but\n  indices.shape[0] = ".concat(e)},getSparseFillEmptyRowsNegativeIndexErrorMessage:function(e,t){return"indices(".concat(e,", 0) is invalid: ").concat(t," < 0")},getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:function(e,t,r){return"indices(".concat(e,", 0) is invalid: ").concat(t," >= ").concat(r)},getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:function(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"},getSparseReshapeInputOutputMismatchErrorMessage:function(e,t){var r=sizeFromShape(e),n=sizeFromShape(t);return"Input to reshape is a tensor with ".concat(r," dense values, but the requested shape has ").concat(n,". inputShape=").concat(e," outputShape=").concat(t)},getSparseReshapeInputOutputMultipleErrorMessage:function(e,t){var r=sizeFromShape(e),n=sizeFromShape(t);return"Input to reshape is a SparseTensor with ".concat(r,"\n  dense values, but the requested shape requires a multiple of ").concat(n,". inputShape=").concat(e," outputShape= ").concat(t)},getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){return"only one output dimension may be -1, not both ".concat(e," and ").concat(t)},getSparseReshapeNegativeOutputDimErrorMessage:function(e,t){return"size ".concat(e," must be non-negative, not ").concat(t)},getSparseSegmentReductionIndicesOutOfRangeErrorMessage:function(e,t,r){return"Bad: indices[".concat(e,"] == ").concat(t," out of range [0, ").concat(r,")")},getSparseSegmentReductionNegativeSegmentIdsErrorMessage:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(){return"segment ids must be >= 0"},getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:function(){return"segment ids are not increasing"},getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:function(e,t){return"Segment id ".concat(e," out of range [0, ").concat(t,"), possibly because segmentIds input is not sorted.")},getUndoAxesPermutation:function(e){return e.map(function(e,t){return[t,e]}).sort(function(e,t){return e[1]-t[1]}).map(function(e){return e[0]})},isIdentityPermutation:function(e){return e.every(function(e,t){return e===t})},log:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];env().getBool("IS_TEST")||env().getBool("PROD")||console.log.apply(console,__spreadArray([],__read(e),!1))},mergeRealAndImagArrays:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){if(e.length!==t.length)throw Error("Cannot merge real and imag arrays of different lengths. real:"+"".concat(e.length,", imag: ").concat(t.length,"."));for(var r=new Float32Array(2*e.length),n=0;n<r.length;n+=2)r[n]=e[n/2],r[n+1]=t[n/2];return r},prepareAndValidate:prepareAndValidate,prepareSplitSize:function(e,t,r){void 0===r&&(r=0);var n=[];if("number"==typeof t)assert(e.shape[r]%t==0,function(){return"Number of splits must evenly divide the axis."}),n=Array(t).fill(e.shape[r]/t);else{assert(1>=t.reduce(function(e,t){return -1===t&&(e+=1),e},0),function(){return"There should be only one negative value in split array."});var o=t.indexOf(-1);if(-1!==o){var a=t.reduce(function(e,t){return t>0?e+t:e});t[o]=e.shape[r]-a}assert(e.shape[r]===t.reduce(function(e,t){return e+t}),function(){return"The sum of sizes must match the size of the axis dimension."}),n=t}return n},segment_util:{__proto__:null,collectGatherOpShapeInfo:function(e,t,r,n){var o=t.shape.length,a=e.shape.length;if(0!==n&&(n<-o||n>o))throw Error("Expect batchDims in the range of [-".concat(o,", ").concat(o,"], but got ").concat(n));if(n<0&&(n+=o),n>a)throw Error("batchDims (".concat(n,") must be less than rank(x) (\n    ").concat(a,")."));if(r<n)throw Error("batchDims (".concat(n,") must be less than or equal to axis (").concat(r,")."));for(var i=0;i<n;++i)if(e.shape[i]!==t.shape[i])throw Error("x.shape[".concat(i,"]: ").concat(e.shape[i]," should be equal to indices.shape[").concat(i,"]: ").concat(t.shape[i],"."));for(var s=e.shape[r],u=[],c=1,l=1,d=1,i=0;i<n;++i)u.push(e.shape[i]),c*=e.shape[i];for(var i=n;i<r;i++)u.push(e.shape[i]),l*=e.shape[i];for(var i=n;i<o;i++)u.push(t.shape[i]);for(var i=r+1;i<a;i++)u.push(e.shape[i]),d*=e.shape[i];return{batchSize:c,sliceSize:d,outerSize:l,dimSize:s,outputShape:u}},computeOutShape:function(e,t,r){for(var n=[],o=e.length,a=0;a<o;a++)a!==t?n.push(e[a]):n.push(r);return n},segOpComputeOptimalWindowSize:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){var r,n=!1;for(e<=30?(r=e,n=!0):r=nearestDivisor(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=nearestDivisor(e,r+1);return r}},shouldFuse:shouldFuse,slice_util:iU,splitRealAndImagArrays:function(e){for(var t=new Float32Array(e.length/2),r=new Float32Array(e.length/2),n=0;n<e.length;n+=2)t[n/2]=e[n],r[n/2]=e[n+1];return{real:t,imag:r}},stridesOrDilationsArePositive:stridesOrDilationsArePositive,tupleValuesAreOne:tupleValuesAreOne,upcastType:upcastType,validateDefaultValueShape:function(e,t){if(null!=e&&null!=t){var r=e.length,n=t.length;if(r>=n)throw Error("defaultValue.shape=".concat(e," and ragged tensor flatValues.shape=").concat(t,", are incompatible: defaultValue.rank = ").concat(r," must be less than ragged tensor input flatValues.rank = ").concat(n,")"));for(var o=0;o<Math.min(r,n-1);++o){var a=e[o],i=t[o+1];if(a>=0&&i>=0&&1!==a&&a!==i)throw Error("defaultValue.shape=".concat(e,", and ragged tensor input flatValues.shape=").concat(t," are incompatible: defaultValue.shape[").concat(o-e.length,"] = ").concat(a," but ragged tensor input.flatValues.shape[").concat(o-e.length,"] = ").concat(i))}}},validateInput:validateInput$1,validateUpdateShape:validateUpdateShape,warn:warn},t.basicLSTMCell=r6,t.batchNorm=r8,t.batchNorm2d=r7,t.batchNorm3d=r9,t.batchNorm4d=ne,t.batchToSpaceND=r5,t.bincount=nt,t.bitwiseAnd=nr,t.booleanMaskAsync=function(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,d,h,p,f,g;return __generator(this,function(m){switch(m.label){case 0:for(n=convertToTensor(e,"tensor","boolMask"),o=convertToTensor(t,"mask","boolMask","bool"),a=null==r?0:r,i=o.rank,s=n.shape,assert(i>0,function(){return"mask cannot be scalar"}),assertShapesMatch(s.slice(a,a+i),o.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=a;c<a+i;c++)u*=s[c];return l=s.slice(0,a).concat([u],s.slice(a+i)),d=rY(n,l),[4,whereAsync(h=rY(o,[-1]))];case 1:return f=aS(p=m.sent(),[1]),g=nZ(d,f,a),e!==n&&n.dispose(),t!==o&&o.dispose(),f.dispose(),d.dispose(),h.dispose(),p.dispose(),[2,g]}})})},t.broadcastArgs=nn,t.broadcastTo=no,t.broadcast_util={__proto__:null,assertAndGetBroadcastShape:assertAndGetBroadcastShape,getBroadcastDims:getBroadcastDims,getReductionAxes:getReductionAxes},t.browser={__proto__:null,draw:function(e,t,r){var n=convertToTensor(e,"img","draw");if(!(e instanceof ri)){var o=n;n=rR(o,"int32"),o.dispose()}validateImgTensor(n),function(e){var t=(null==e?void 0:e.alpha)||1;if(t>1||t<0)throw Error("Alpha value ".concat(t," is suppoed to be in range [0 - 1]."))}(null==r?void 0:r.imageOptions);var a={image:n};rd.runKernel(et,a,{canvas:t,options:r})},fromPixels:iW,fromPixelsAsync:function(e,t){return void 0===t&&(t=3),__awaiter(this,void 0,void 0,function(){var r,n;return __generator(this,function(o){switch(o.label){case 0:var a;if(r=null,!(env().getBool("WRAP_TO_IMAGEBITMAP")&&"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&null!=(a=e)&&0!==a.width&&0!==a.height&&!(null!=e&&e.data instanceof Uint8Array)))return[3,5];n=void 0,o.label=1;case 1:return o.trys.push([1,3,,4]),[4,createImageBitmap(e,{premultiplyAlpha:"none"})];case 2:return n=o.sent(),[3,4];case 3:return o.sent(),n=null,[3,4];case 4:return r=null!=n&&n.width===e.width&&n.height===e.height?n:e,[3,6];case 5:r=e,o.label=6;case 6:return[2,fromPixels_(r,t)]}})})},toPixels:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s,u,c,l,d,h,p,f,g,m,v;return __generator(this,function(y){switch(y.label){case 0:return r=convertToTensor(e,"img","toPixels"),e instanceof ri||(r=rR(n=r,"int32"),n.dispose()),validateImgTensor(r),a=(o=__read(r.shape.slice(0,2),2))[0],i=o[1],s=2===r.rank?1:r.shape[2],[4,r.data()];case 1:for(d=0,u=y.sent(),c="float32"===r.dtype?255:1,l=new Uint8ClampedArray(i*a*4);d<a*i;++d){for(p=0,h=[0,0,0,255];p<s;p++){if(f=u[d*s+p],"float32"===r.dtype){if(f<0||f>1)throw Error("Tensor values for a float32 Tensor must be in the "+"range [0 - 1] but encountered ".concat(f,"."))}else if("int32"===r.dtype&&(f<0||f>255))throw Error("Tensor values for a int32 Tensor must be in the "+"range [0 - 255] but encountered ".concat(f,"."));1===s?(h[0]=f*c,h[1]=f*c,h[2]=f*c):h[p]=f*c}l[(g=4*d)+0]=Math.round(h[0]),l[g+1]=Math.round(h[1]),l[g+2]=Math.round(h[2]),l[g+3]=Math.round(h[3])}return null!=t&&(iG||null==getKernel(et,rd.backendName)||(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),iG=!0),t.width=i,t.height=a,m=t.getContext("2d"),v=new ImageData(l,i,a),m.putImageData(v,0,0)),r!==e&&r.dispose(),[2,l]}})})}},t.buffer=buffer,t.cast=rR,t.ceil=na,t.clipByValue=ni,t.clone=rB,t.complex=rf,t.concat=r0,t.concat1d=ns,t.concat2d=nu,t.concat3d=nc,t.concat4d=nl,t.conv1d=nh,t.conv2d=nd,t.conv2dTranspose=nf,t.conv3d=ng,t.conv3dTranspose=nv,t.copyRegisteredKernels=function(e,t){getKernelsForBackend(e).forEach(function(e){registerKernel(Object.assign({},e,{backendName:t}))})},t.cos=ny,t.cosh=nb,t.cosineWindow=cosineWindow,t.cumprod=nT,t.cumsum=nw,t.customGrad=customGrad,t.denseBincount=n_,t.deprecationWarn=function(e){env().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")},t.depthToSpace=nk,t.depthwiseConv2d=nS,t.device_util={__proto__:null,isBrowser:isBrowser,isMobile:function(e){if(void 0!==u)return u;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;var t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){var r=e;return r.userAgentData&&r.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1},mockIsMobile:function(e){u=e}},t.diag=nx,t.dilation2d=nE,t.disableDeprecationWarnings=function(){env().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")},t.dispose=dispose,t.disposeVariables=function(){rd.disposeVariables()},t.div=rP,t.divNoNan=nN,t.dot=nD,t.dropout=aG,t.einsum=nR,t.elu=nB,t.enableDebugMode=function(){env().set("DEBUG",!0)},t.enableProdMode=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(){env().set("PROD",!0)},t.enclosingPowerOfTwo=enclosingPowerOfTwo,t.engine=function(){return rd},t.ensureShape=nF,t.env=env,t.equal=nA,t.erf=nO,t.euclideanNorm=nK,t.exp=nq,t.expandDims=nV,t.expm1=nH,t.eye=nJ,t.fft=ay,t.fill=fill,t.findBackend=function(e){return rd.findBackend(e)},t.findBackendFactory=function(e){return rd.findBackendFactory(e)},t.floor=n$,t.floorDiv=rO,t.fused={__proto__:null,conv2d:aU,depthwiseConv2d:aV,matMul:aH},t.gather=nZ,t.gatherND=aL,t.gather_util={__proto__:null,prepareAndValidate:prepareAndValidate},t.getBackend=getBackend,t.getGradient=getGradient,t.getKernel=getKernel,t.getKernelsForBackend=getKernelsForBackend,t.grad=function(e){return assert(isFunction(e),function(){return"The f passed in grad(f) must be a function"}),function(t,r){var n=convertToTensor(t,"x","tf.grad","string_or_numeric"),o=null!=r?convertToTensor(r,"dy","tf.grad"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e(n)},[n],o),r=t.value,a=t.grads;return null!=o&&assertShapesMatch(r.shape,o.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),checkGrads(a),a[0]})}},t.grads=function(e){return assert(isFunction(e),function(){return"The f passed in grads(f) must be a function"}),function(t,r){assert(Array.isArray(t),function(){return"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s"});var n=convertToTensorArray(t,"args","tf.grads","string_or_numeric"),o=null!=r?convertToTensor(r,"dy","tf.grads"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(n),!1))},n,o),r=t.value,a=t.grads;return null!=o&&assertShapesMatch(r.shape,o.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(a),a})}},t.greater=nY,t.greaterEqual=nX,t.ifft=ab,t.imag=nQ,t.image={flipLeftRight:aX,grayscaleToRGB:aQ,resizeNearestNeighbor:a5,resizeBilinear:a6,rgbToGrayscale:a0,rotateWithOffset:a1,cropAndResize:aY,nonMaxSuppression:a2,nonMaxSuppressionAsync:function(e,t,r,n,o){return void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY),__awaiter(this,void 0,void 0,function(){var a,i,s,u,c;return __generator(this,function(l){switch(l.label){case 0:return a=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),i=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(s=nonMaxSuppSanityCheck(a,i,r,n,o)).maxOutputSize,n=s.iouThreshold,o=s.scoreThreshold,[4,Promise.all([a.data(),i.data()])];case 1:return c=nonMaxSuppressionV3Impl((u=l.sent())[0],u[1],r,n,o).selectedIndices,a!==e&&a.dispose(),i!==t&&i.dispose(),[2,tensor1d(c,"int32")]}})})},nonMaxSuppressionWithScore:a3,nonMaxSuppressionWithScoreAsync:function(e,t,r,n,o,a){return void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY),void 0===a&&(a=0),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,h;return __generator(this,function(p){switch(p.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(u=nonMaxSuppSanityCheck(i,s,r,n,o,a)).maxOutputSize,n=u.iouThreshold,o=u.scoreThreshold,a=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return d=(l=nonMaxSuppressionV5Impl((c=p.sent())[0],c[1],r,n,o,a)).selectedIndices,h=l.selectedScores,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(d,"int32"),selectedScores:tensor1d(h)}]}})})},nonMaxSuppressionPadded:a4,nonMaxSuppressionPaddedAsync:function(e,t,r,n,o,a){return void 0===n&&(n=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY),void 0===a&&(a=!1),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,h,p,f,g;return __generator(this,function(m){switch(m.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),c=(u=nonMaxSuppSanityCheck(i,s,r,n,o,null)).maxOutputSize,l=u.iouThreshold,d=u.scoreThreshold,[4,Promise.all([i.data(),s.data()])];case 1:return f=(p=nonMaxSuppressionV4Impl((h=__read.apply(void 0,[m.sent(),2]))[0],h[1],c,l,d,a)).selectedIndices,g=p.validOutputs,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(f,"int32"),validOutputs:scalar(g,"int32")}]}})})},threshold:a8,transform:a7},t.inTopKAsync=function(e,t,r){return void 0===r&&(r=1),__awaiter(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,d,h,p,f,g,m;return __generator(this,function(v){switch(v.label){case 0:return n=convertToTensor(e,"predictions","inTopK"),o=convertToTensor(t,"targets","inTopK"),assert(n.rank>1,function(){return"inTopK() expects the predictions to be of rank 2 or higher, "+"but got ".concat(n.rank)}),assert(n.rank-1===o.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+"".concat(n.rank," and targets rank ").concat(o.rank)}),assertShapesMatch(n.shape.slice(0,n.shape.length-1),o.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),a=n.shape[n.shape.length-1],assert(r>0&&r<=a,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last "+"dimension (".concat(a,"), but got ").concat(r)}),[4,n.data()];case 1:return i=v.sent(),[4,o.data()];case 2:for(s=v.sent(),c=(u=__read([i.length/a,a],2))[0],l=u[1],d=getArrayFromDType("bool",c),h=0;h<c;h++){for(m=0,p=h*l,f=i.subarray(p,p+l),g=[];m<f.length;m++)g.push({value:f[m],index:m});for(g.sort(function(e,t){return t.value-e.value}),d[h]=0,m=0;m<r;m++)if(g[m].index===s[h]){d[h]=1;break}}return e!==n&&n.dispose(),t!==o&&o.dispose(),[2,tensor(d,o.shape,"bool")]}})})},t.io={__proto__:null,CompositeArrayBuffer:rm,browserFiles:function(e){return new iO(e)},browserHTTPRequest:function(e,t){return http(e,t)},concatenateArrayBuffers:function(e){return rm.join(e)},copyModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!1)]})})},decodeWeights:decodeWeights,decodeWeightsStream:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s,u,c,l,d,h,p,f=this;return __generator(this,function(g){switch(g.label){case 0:r={},n=e.getReader(),o=new ArrayBuffer(0),g.label=1;case 1:g.trys.push([1,7,8,9]),i=(a=__values(t)).next(),g.label=2;case 2:if(i.done)return[3,6];return[4,function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s,u;return __generator(this,function(c){switch(c.label){case 0:if(r=sizeFromShape(e.shape),!("quantization"in e))return[3,1];return n=rg[e.quantization.dtype],[3,7];case 1:if("string"!==e.dtype)return[3,6];o=0,a=0,c.label=2;case 2:if(!(a<r))return[3,5];return i=o,s=4,u=Uint32Array.bind,[4,t(o,o+4)];case 3:o=i+(s+new(u.apply(Uint32Array,[void 0,c.sent()]))()[0]),c.label=4;case 4:return a++,[3,2];case 5:return[2,o];case 6:n=rg[e.dtype],c.label=7;case 7:return[2,r*n]}})})}(s=i.value,function(e,t){return __awaiter(f,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return[4,readToLength(n,o,t)];case 1:return[2,(o=r.sent()).slice(e,t)]}})})})];case 3:return u=g.sent(),[4,readToLength(n,o,u)];case 4:c=(o=g.sent()).slice(0,u),o=o.slice(u),l=decodeWeight(s,c),r[s.name]=l,"webgpu"===getBackend()&&"uploadToGPU"in(d=backend())&&sizeFromShape(l.shape)>=env().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&d.uploadToGPU(l.dataId),g.label=5;case 5:return i=a.next(),[3,2];case 6:return[3,9];case 7:return h={error:g.sent()},[3,9];case 8:try{i&&!i.done&&(p=a.return)&&p.call(a)}finally{if(h)throw h.error}return[7];case 9:return[2,r]}})})},encodeWeights:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s=this;return __generator(this,function(u){switch(u.label){case 0:for(i=0,r=[],n=[],o=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e),a=function(a){var i=o[a],u=Array.isArray(e)?e[a].tensor:e[i];if("float32"!==u.dtype&&"int32"!==u.dtype&&"bool"!==u.dtype&&"string"!==u.dtype&&"complex64"!==u.dtype)throw Error("Unsupported dtype in weight '".concat(i,"': ").concat(u.dtype));var c={name:i,shape:u.shape,dtype:u.dtype};if("string"===u.dtype){var l=new Promise(function(e){return __awaiter(s,void 0,void 0,function(){var t,r,n,o,a,i,s;return __generator(this,function(c){switch(c.label){case 0:return[4,u.bytes()];case 1:for(a=0,r=(t=c.sent()).reduce(function(e,t){return e+t.length},0)+4*t.length,n=new Uint8Array(r),o=0;a<t.length;a++)i=t[a],s=new Uint8Array(new Uint32Array([i.length]).buffer),n.set(s,o),o+=4,n.set(i,o),o+=i.length;return e(n),[2]}})})});n.push(l)}else n.push(u.data());null!=t&&(c.group=t),r.push(c)};i<o.length;++i)a(i);return[4,Promise.all(n)];case 1:return[2,{data:function(e){if(null===e)throw Error("Invalid input value: ".concat(JSON.stringify(e)));var t=0,r=[];e.forEach(function(e){if(t+=e.byteLength,r.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error("Unsupported TypedArray subtype: ".concat(e.constructor.name))});var n=new Uint8Array(t),o=0;return r.forEach(function(e){n.set(new Uint8Array(e.buffer),o),o+=e.byteLength}),n.buffer}(u.sent()),specs:r}]}})})},fromMemory:function(e,t,r,n){var o=arguments;return new PassthroughAsync(fromMemorySync.apply(void 0,__spreadArray([],__read(o),!1)))},fromMemorySync:fromMemorySync,getLoadHandlers:function(e,t){return ry.getLoadHandlers(e,t)},getModelArtifactsForJSON:getModelArtifactsForJSON,getModelArtifactsForJSONSync:getModelArtifactsForJSONSync,getModelArtifactsInfoForJSON:getModelArtifactsInfoForJSON,getSaveHandlers:function(e){return ry.getSaveHandlers(e)},getWeightSpecs:getWeightSpecs,http:http,isHTTPScheme:isHTTPScheme,listModels:function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,o,a,i,s,u;return __generator(this,function(c){switch(c.label){case 0:e=rM.getSchemes(),t={},c.label=1;case 1:c.trys.push([1,6,7,8]),n=(r=__values(e)).next(),c.label=2;case 2:if(n.done)return[3,5];return o=n.value,[4,rM.getManager(o).listModels()];case 3:for(i in a=c.sent())t[o+"://"+i]=a[i];c.label=4;case 4:return n=r.next(),[3,2];case 5:return[3,8];case 6:return s={error:c.sent()},[3,8];case 7:try{n&&!n.done&&(u=r.return)&&u.call(r)}finally{if(s)throw s.error}return[7];case 8:return[2,t]}})})},loadWeights:function(e,t,r,n){return void 0===t&&(t=""),__awaiter(this,void 0,void 0,function(){return __generator(this,function(o){return[2,weightsLoaderFactory(function(e){return loadWeightsAsArrayBuffer(e,{requestInit:n})})(e,t,r)]})})},moveModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!0)]})})},registerLoadRouter:function(e){return ry.registerLoadRouter(e)},registerSaveRouter:function(e){return ry.registerSaveRouter(e)},removeModel:function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){return t=parseURL(e),[2,rM.getManager(t.scheme).removeModel(t.path)]})})},weightsLoaderFactory:weightsLoaderFactory,withSaveHandler:function(e){return new iz(e)},withSaveHandlerSync:function(e){return new iz(e)}},t.irfft=aT,t.isFinite=n0,t.isInf=n1,t.isNaN=n2,t.keep=keep,t.kernel_impls={__proto__:null,nonMaxSuppressionV3Impl:nonMaxSuppressionV3Impl,nonMaxSuppressionV4Impl:nonMaxSuppressionV4Impl,nonMaxSuppressionV5Impl:nonMaxSuppressionV5Impl,whereImpl:whereImpl},t.leakyRelu=n3,t.less=n4,t.lessEqual=n6,t.linalg={bandPart:a9,gramSchmidt:ie,qr:it},t.linspace=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){if(r<=0)throw Error("The number of values should be positive.");return rd.runKernel(ex,{},{start:e,stop:t,num:r})},t.localResponseNormalization=n5,t.log=n8,t.log1p=n7,t.logSigmoid=ot,t.logSoftmax=on,t.logSumExp=oo,t.logicalAnd=oa,t.logicalNot=oi,t.logicalOr=os,t.logicalXor=ou,t.losses={absoluteDifference:io,computeWeightedLoss:ir,cosineDistance:ia,hingeLoss:ii,huberLoss:is,logLoss:iu,meanSquaredError:ic,sigmoidCrossEntropy:il,softmaxCrossEntropy:id},t.lowerBound=/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){return oc(e,t,"left")},t.matMul=r1,t.math={__proto__:null,confusionMatrix:iL},t.max=nP,t.maxPool=ol,t.maxPool3d=od,t.maxPoolWithArgmax=oh,t.maximum=of,t.mean=og,t.memory=function(){return rd.memory()},t.meshgrid=/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){var n=(void 0===r?{}:r).indexing,o=void 0===n?"xy":n;if("xy"!==o&&"ij"!==o)throw TypeError("".concat(o," is not a valid third argument to meshgrid"));if(void 0===e)return[];var a=convertToTensor(e,"x","meshgrid",e instanceof ri?e.dtype:"float32");if(void 0===t)return[a];var i=convertToTensor(t,"y","meshgrid",t instanceof ri?t.dtype:"float32"),s=sizeFromShape(a.shape),u=sizeFromShape(i.shape);return"xy"===o?(a=rY(a,[1,-1]),i=rY(i,[-1,1]),[r1(ones([u,1],a.dtype),a),r1(i,ones([1,s],i.dtype))]):(a=rY(a,[-1,1]),i=rY(i,[1,-1]),[r1(a,ones([1,u],a.dtype)),r1(ones([s,1],i.dtype),i)])},t.min=nC,t.minimum=om,t.mirrorPad=ov,t.mod=oy,t.moments=ob,t.movingAverage=aP,t.mul=rC,t.multiRNNCell=oT,t.multinomial=ow,t.neg=n9,t.nextFrame=function(){return new Promise(function(e){return iq(function(){return e()})})},t.norm=nU,t.notEqual=o_,t.oneHot=ok,t.ones=ones,t.onesLike=oS,t.op=op,t.outerProduct=ox,t.pad=oE,t.pad1d=oA,t.pad2d=oM,t.pad3d=oI,t.pad4d=oN,t.pool=oR,t.pow=nz,t.prelu=oB,t.print=print,t.prod=oF,t.profile=function(e){return rd.profile(e)},t.raggedGather=oO,t.raggedRange=oP,t.raggedTensorToTensor=oC,t.rand=oz,t.randomGamma=o2,t.randomNormal=o3,t.randomStandardNormal=o4,t.randomUniform=o6,t.randomUniformInt=o5,t.range=range,t.ready=function(){return rd.ready()},t.real=o8,t.reciprocal=o7,t.registerBackend=function(e,t,r){return void 0===r&&(r=1),rd.registerBackend(e,t,r)},t.registerGradient=function(e){var t=e.kernelName;tG.has(t)&&env().getBool("DEBUG")&&warn("Overriding the gradient for '".concat(t,"'")),tG.set(t,e)},t.registerKernel=registerKernel,t.relu=o9,t.relu6=ae,t.removeBackend=function(e){rd.removeBackend(e)},t.reshape=rY,t.reverse=at,t.reverse1d=ar,t.reverse2d=an,t.reverse3d=ao,t.reverse4d=aa,t.rfft=a_,t.round=ai,t.rsqrt=as,t.scalar=scalar,t.scatterND=aC,t.scatter_util={__proto__:null,calculateShapes:calculateShapes,validateInput:validateInput$1,validateUpdateShape:validateUpdateShape},t.searchSorted=oc,t.selu=au,t.separableConv2d=ac,t.serialization={__proto__:null,Serializable:ik,SerializationMap:iS,getRegisteredName:function(e){return i_.has(e)?i_.get(e):e.className},registerClass:registerClass},t.setBackend=function(e){return rd.setBackend(e)},t.setPlatform=function(e,t){env().setPlatform(e,t)},t.setdiff1dAsync=function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,o,a,i,s,u,c,l,d;return __generator(this,function(h){switch(h.label){case 0:return r=convertToTensor(e,"x","setdiff1d"),n=convertToTensor(t,"y","setdiff1d"),assert(r.dtype===n.dtype,function(){return"x and y should have the same dtype, but got x (".concat(r.dtype,") and y (").concat(n.dtype,").")}),assert(1===r.rank,function(){return"x should be 1D tensor, but got x (".concat(r.shape,").")}),assert(1===n.rank,function(){return"y should be 1D tensor, but got y (".concat(n.shape,").")}),[4,r.data()];case 1:return o=h.sent(),[4,n.data()];case 2:for(u=0,a=h.sent(),i=new Set(a),s=0;u<o.length;u++)!i.has(o[u])&&s++;for(u=0,c=new rn([s],r.dtype),l=new rn([s],"int32"),d=0;u<o.length;u++)!i.has(o[u])&&(c.values[d]=o[u],l.values[d]=u,d++);return[2,[c.toTensor(),l.toTensor()]]}})})},t.sigmoid=r2,t.sign=al,t.signal={hammingWindow:aj,hannWindow:aJ,frame:a$,stft:aZ},t.sin=ad,t.sinh=ah,t.slice=r3,t.slice1d=ap,t.slice2d=af,t.slice3d=ag,t.slice4d=am,t.slice_util=iU,t.softmax=av,t.softplus=oe,t.spaceToBatchND=oD,t.sparse={sparseFillEmptyRows:ih,sparseReshape:ip,sparseSegmentMean:ig,sparseSegmentSum:im},t.sparseToDense=az,t.spectral={fft:ay,ifft:ab,rfft:a_,irfft:aT},t.split=aw,t.sqrt=nL,t.square=nG,t.squaredDifference=ak,t.squeeze=aS,t.stack=ax,t.step=aE,t.stridedSlice=aA,t.string={stringNGrams:iv,stringSplit:iy,stringToHashBucketFast:ib,staticRegexReplace:iT},t.sub=or,t.sum=nW,t.sumOutType=function(e){return upcastType(e,"int32")},t.tan=aM,t.tanh=r4,t.tensor=tensor,t.tensor1d=tensor1d,t.tensor2d=tensor2d,t.tensor3d=tensor3d,t.tensor4d=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){if(assertNonNull(e),null!=t&&4!==t.length)throw Error("tensor4d() requires shape to have four numbers");var n=inferShape(e,r);if(4!==n.length&&1!==n.length)throw Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor4d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t,n,r)},t.tensor5d=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){if(assertNonNull(e),null!=t&&5!==t.length)throw Error("tensor5d() requires shape to have five numbers");var n=inferShape(e,r);if(5!==n.length&&1!==n.length)throw Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor5d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t,n,r)},t.tensor6d=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){if(assertNonNull(e),null!=t&&6!==t.length)throw Error("tensor6d() requires shape to have six numbers");var n=inferShape(e,r);if(6!==n.length&&1!==n.length)throw Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor6d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t=t||n,n,r)},t.tensorScatterUpdate=aI,t.tensor_util={__proto__:null,assertTypesMatch:assertTypesMatch,getTensorsInContainer:getTensorsInContainer,isTensorInList:function(e,t){return t.some(function(t){return t.id===e.id})},makeTypesMatch:makeTypesMatch},t.test_util={__proto__:null,TEST_EPSILON_FLOAT16:.1,createVideoElement:function(e){var t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(function(e){t.addEventListener("loadeddata",function(r){return e(t)}),t.load()})},encodeStrings:function encodeStrings(e){for(var t=0;t<e.length;t++){var r=e[t];Array.isArray(r)?encodeStrings(r):e[t]=encodeString(r)}return e},expectArrayBuffersEqual:function(e,t){var r=new Float32Array(e),n=new Float32Array(t);if(r.length!==n.length)throw Error("Expected ArrayBuffer to be of length "+"".concat(n.length,", but it was ").concat(r.length));for(var o=0;o<n.length;o++)if(r[o]!==n[o])throw Error("Expected ArrayBuffer value at ".concat(o," to be ")+"".concat(n[o]," but got ").concat(r[o]," instead"))},expectArraysClose:function(e,t,r){return null==r&&(r=testEpsilon()),expectArraysPredicate(e,t,function(e,t){return areClose(e,t,r)})},expectArraysEqual:function(e,t){var r="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return isString(e)||isString(e[0])||isString(t)||isString(t[0])?expectArraysPredicate(e,r,function(e,t){return e==t}):expectArraysPredicate(e,t,function(e,t){return areClose(e,t,0)})},expectNumbersClose:function(e,t,r){if(null==r&&(r=testEpsilon()),!areClose(e,t,r))throw Error("Numbers differ: actual === ".concat(e,", expected === ").concat(t));"undefined"!=typeof expect&&expect().nothing()},expectPromiseToFail:function(e,t){e().then(function(){return t.fail()},function(){return t()}),"undefined"!=typeof expect&&expect().nothing()},expectValuesInRange:function(e,t,r){for(var n=0;n<e.length;n++)if(e[n]<t||e[n]>r)throw Error("Value out of range:".concat(e[n]," low: ").concat(t,", high: ").concat(r))},play:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,e.play()];case 1:if(t.sent(),!("requestVideoFrameCallback"in e))return[3,3];return[4,new Promise(function(t){e.requestVideoFrameCallback(t)})];case 2:t.sent(),t.label=3;case 3:return[2]}})})},testEpsilon:testEpsilon},t.tidy=tidy,t.tile=nj,t.time=function(e){return rd.time(e)},t.topk=aN,t.train=iK,t.transpose=aO,t.truncatedNormal=aD,t.unique=aR,t.unregisterGradient=function(e){if(!tG.has(e))throw Error("The gradient '".concat(e,"' for backend is not registered"));tG.delete(e)},t.unregisterKernel=function(e,t){var r=makeKey(e,t);if(!tL.has(r))throw Error("The kernel '".concat(e,"' for backend ")+"'".concat(t,"' is not registered"));tL.delete(r)},t.unsortedSegmentSum=aB,t.unstack=aF,t.upcastType=upcastType,t.upperBound=/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){return oc(e,t,"right")},t.util={__proto__:null,arraysEqual:arraysEqual,arraysEqualWithNull:arraysEqualWithNull,assert:assert,assertNonNegativeIntegerDimensions:assertNonNegativeIntegerDimensions,assertNonNull:assertNonNull,assertShapesMatch:assertShapesMatch,bytesFromStringArray:bytesFromStringArray,bytesPerElement:bytesPerElement,checkConversionForErrors:checkConversionForErrors,clamp:clamp,computeStrides:computeStrides,convertBackendValuesAndArrayBuffer:function(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error("Unknown dtype ".concat(t))},createScalarValue:function(e,t){return"string"===t?encodeString(e):toTypedArray([e],t)},createShuffledIndices:function(e){for(var t=new Uint32Array(e),r=0;r<e;++r)t[r]=r;return shuffle(t),t},decodeString:decodeString,distSquared:function(e,t){for(var r=0,n=0;n<e.length;n++){var o=Number(e[n])-Number(t[n]);r+=o*o}return r},encodeString:encodeString,fetch:function(e,t){return env().platform.fetch(e,t)},fingerPrint64:function(e,t){void 0===t&&(t=e.length);var r,n,o,a,i,s,u,c,l,d,h,p,f,g,m,v,y,b,T,w,_=t8.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t){if(void 0===t&&(t=e.length),t>=8){var r=re.add(2*t),n=fetch64(e,0).add(re),o=fetch64(e,t-8),a=rotate64(o,37).mul(r).add(n);return hashLen16(a,rotate64(n,25).add(o).mul(r),r)}if(t>=4){var r=re.add(2*t),n=fetch$2(e,0,4);return hashLen16(n.shl(3).add(t),fetch$2(e,t-4,4),r)}if(t>0){var n=e[0],o=e[t>>1],a=e[t-1],i=n+(o<<8),s=t+(a<<2);return shiftMix(re.mul(i).xor(t7.mul(s))).mul(re)}return re}(e,t):(void 0===(r=t)&&(r=e.length),n=re.add(2*r),o=fetch64(e,0).mul(t9),a=fetch64(e,8),i=fetch64(e,r-8).mul(n),s=fetch64(e,r-16).mul(re),hashLen16(rotate64(o.add(a),43).add(rotate64(i,30)).add(s),o.add(rotate64(a.add(re),18)).add(i),n));if(t<=64)return void 0===(u=t)&&(u=e.length),c=re.add(2*u),l=fetch64(e,0).mul(re),d=fetch64(e,8),h=fetch64(e,u-8).mul(c),p=fetch64(e,u-16).mul(re),g=hashLen16(f=rotate64(l.add(d),43).add(rotate64(h,30)).add(p),l.add(rotate64(d.add(re),18)).add(h),c),m=fetch64(e,16).mul(c),v=fetch64(e,24),y=f.add(fetch64(e,u-32)).mul(c),b=g.add(fetch64(e,u-24)).mul(c),hashLen16(rotate64(m.add(v),43).add(rotate64(y,30)).add(b),m.add(rotate64(v.add(l),18)).add(y),c);var k=_,S=_.mul(t9).add(113),x=shiftMix(S.mul(re).add(113)).mul(re),E=[t8.UZERO,t8.UZERO],A=[t8.UZERO,t8.UZERO];k=k.mul(re).add(fetch64(e,0));var M=0,I=(t-1>>6)*64,N=I+(t-1&63)-63;do k=rotate64(k.add(S).add(E[0]).add(fetch64(e,M+8)),37).mul(t9),S=rotate64(S.add(E[1]).add(fetch64(e,M+48)),42).mul(t9),k=k.xor(A[1]),S=S.add(E[0]).add(fetch64(e,M+40)),x=rotate64(x.add(A[0]),33).mul(t9),E=weakHashLen32WithSeedsStr(e,M,E[1].mul(t9),k.add(A[0])),A=weakHashLen32WithSeedsStr(e,M+32,x.add(A[1]),S.add(fetch64(e,M+16))),x=(T=__read([k,x],2))[0],k=T[1],M+=64;while(M!==I);var D=t9.add(x.and(255).shl(1));return M=N,A[0]=A[0].add(t-1&63),E[0]=E[0].add(A[0]),A[0]=A[0].add(E[0]),k=rotate64(k.add(S).add(E[0]).add(fetch64(e,M+8)),37).mul(D),S=rotate64(S.add(E[1]).add(fetch64(e,M+48)),42).mul(D),k=k.xor(A[1].mul(9)),S=S.add(E[0].mul(9).add(fetch64(e,M+40))),x=rotate64(x.add(A[0]),33).mul(D),E=weakHashLen32WithSeedsStr(e,M,E[1].mul(D),k.add(A[0])),A=weakHashLen32WithSeedsStr(e,M+32,x.add(A[1]),S.add(fetch64(e,M+16))),x=(w=__read([k,x],2))[0],k=w[1],hashLen16(hashLen16(E[0],A[0],D).add(shiftMix(S).mul(t7)).add(x),hashLen16(E[1],A[1],D).add(k),D)},flatten:flatten,getArrayFromDType:getArrayFromDType,getTypedArrayFromDType:function(e,t){return getArrayFromDType(e,t)},hasEncodingLoss:function(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)},hexToLong:hexToLong,indexToLoc:function(e,t,r){if(0===t)return[];if(1===t)return[e];for(var n=Array(t),o=0;o<n.length-1;++o)n[o]=Math.floor(e/r[o]),e-=n[o]*r[o];return n[n.length-1]=e,n},inferDtype:inferDtype,inferFromImplicitShape:function(e,t){for(var r=1,n=-1,o=0;o<e.length;++o)if(e[o]>=0)r*=e[o];else if(-1===e[o]){if(-1!==n)throw Error("Shapes can only have 1 implicit size. "+"Found -1 at dim ".concat(n," and dim ").concat(o));n=o}else if(e[o]<0)throw Error("Shapes can not be < 0. Found ".concat(e[o]," at dim ").concat(o));if(-1===n){if(t>0&&t!==r)throw Error("Size(".concat(t,") must match the product of shape ").concat(e));return e}if(0===r)throw Error("Cannot infer the missing size in [".concat(e,"] when ")+"there are 0 elements");if(t%r!=0)throw Error("The implicit shape can't be a fractional number. "+"Got ".concat(t," / ").concat(r));var a=e.slice();return a[n]=t/r,a},isBoolean:isBoolean,isFunction:isFunction,isInt:isInt,isNumber:isNumber,isPromise:isPromise,isScalarShape:function(e){return 0===e.length},isString:isString,isTypedArray:isTypedArray,isValidDtype:isValidDtype,locToIndex:function(e,t,r){if(0===t)return 0;if(1===t)return e[0];for(var n=e[e.length-1],o=0;o<e.length-1;++o)n+=r[o]*e[o];return n},makeOnesTypedArray:makeOnesTypedArray,makeZerosNestedTypedArray:function(e,t){var r=e.reduce(function(e,t){return e*t},1);if(null==t||"float32"===t)return toNestedArray(e,new Float32Array(r));if("int32"===t)return toNestedArray(e,new Int32Array(r));if("bool"===t)return toNestedArray(e,new Uint8Array(r));throw Error("Unknown data type ".concat(t))},makeZerosTypedArray:makeZerosTypedArray,nearestDivisor:nearestDivisor,nearestLargerEven:function(e){return e%2==0?e:e+1},now:now,parseAxisParam:parseAxisParam,randUniform:function(e,t){var r=Math.random();return t*r+(1-r)*e},repeatedTry:function(e,t,r,n){return void 0===t&&(t=function(e){return 0}),new Promise(function(o,a){var i=0,tryFn=function(){if(e()){o();return}i++;var s=t(i);if(null!=r&&i>=r){a();return}null!=n?n(tryFn,s):setTimeout(tryFn,s)};tryFn()})},rightPad:rightPad,shuffle:shuffle,shuffleCombo:function(e,t){if(e.length!==t.length)throw Error("Array sizes must match to be shuffled together "+"First array length was ".concat(e.length)+"Second array length was ".concat(t.length));for(var r=e.length,n=0;r>0;)n=Math.random()*r|0,swap(e,--r,n),swap(t,r,n)},sizeFromShape:sizeFromShape,sizeToSquarishShape:function(e){var t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]},squeezeShape:squeezeShape,sum:function(e){for(var t=0,r=0;r<e.length;r++)t+=e[r];return t},swap:swap,tanh:function(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return -1;var t=Math.exp(2*e);return(t-1)/(t+1)},toNestedArray:toNestedArray,toTypedArray:toTypedArray},t.valueAndGrad=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrad(f) must be a function"}),function(t,r){assert(t instanceof ri,function(){return"The x passed in valueAndGrad(f)(x) must be a tensor"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrad(f)(x, dy) must be a tensor"});var n=rd.gradients(function(){return e(t)},[t],r),o=n.grads,a=n.value;return checkGrads(o),{grad:o[0],value:a}}},t.valueAndGrads=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrads(f) must be a function"}),function(t,r){assert(Array.isArray(t)&&t.every(function(e){return e instanceof ri}),function(){return"The args passed in valueAndGrads(f)(args) must be array of tensors"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrads(f)(args, dy) must be a tensor"});var n=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(t),!1))},t,r);return null!=r&&assertShapesMatch(n.value.shape,r.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(n.grads),n}},t.variable=/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){return void 0===t&&(t=!0),rd.makeVariable(e,t,r,n)},t.variableGrads=variableGrads,t.version_core="4.22.0",t.where=nM,t.whereAsync=whereAsync,t.zeros=zeros,t.zerosLike=nI}};