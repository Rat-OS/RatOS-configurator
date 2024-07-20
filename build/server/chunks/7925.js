"use strict";exports.id=7925,exports.ids=[7925,2013],exports.modules={52013:(e,t,r)=>{var n,a,o,i,s,u,c,l,d,extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(a,o){function fulfilled(e){try{step(n.next(e))}catch(e){o(e)}}function rejected(e){try{step(n.throw(e))}catch(e){o(e)}}function step(e){var t;e.done?a(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}function __generator(e,t){var r,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function verb(o){return function(s){return function(o){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,o=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)i.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(a)throw a.error}}return i}function __spreadArray(e,t,r){if(r||2==arguments.length)for(var n,a=0,o=t.length;a<o;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}var h=function(){function DataStorage(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}return DataStorage.prototype.get=function(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)},DataStorage.prototype.set=function(e,t){this.dataIdsCount++,this.data.set(e,t)},DataStorage.prototype.has=function(e){return this.data.has(e)},DataStorage.prototype.delete=function(e){return this.dataIdsCount--,this.data.delete(e)},DataStorage.prototype.numDataIds=function(){return this.dataIdsCount},DataStorage}(),p=function(){function KernelBackend(){}return KernelBackend.prototype.refCount=function(e){return notYetImplemented("refCount")},KernelBackend.prototype.incRef=function(e){return notYetImplemented("incRef")},KernelBackend.prototype.timerAvailable=function(){return!0},KernelBackend.prototype.time=function(e){return notYetImplemented("time")},KernelBackend.prototype.read=function(e){return notYetImplemented("read")},KernelBackend.prototype.readSync=function(e){return notYetImplemented("readSync")},KernelBackend.prototype.readToGPU=function(e,t){return notYetImplemented("readToGPU")},KernelBackend.prototype.numDataIds=function(){return notYetImplemented("numDataIds")},KernelBackend.prototype.disposeData=function(e,t){return notYetImplemented("disposeData")},KernelBackend.prototype.write=function(e,t,r){return notYetImplemented("write")},KernelBackend.prototype.move=function(e,t,r,n,a){return notYetImplemented("move")},KernelBackend.prototype.createTensorFromGPUData=function(e,t,r){return notYetImplemented("createTensorFromGPUData")},KernelBackend.prototype.memory=function(){return notYetImplemented("memory")},KernelBackend.prototype.floatPrecision=function(){return notYetImplemented("floatPrecision")},KernelBackend.prototype.epsilon=function(){return 32===this.floatPrecision()?1e-7:1e-4},KernelBackend.prototype.dispose=function(){return notYetImplemented("dispose")},KernelBackend}();function notYetImplemented(e){throw Error("'".concat(e,"' not yet implemented or not found in the registry. ")+"This kernel may not be supported by the tfjs backend you have chosen")}/**
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
 */function shuffle(e){for(var t=e.length,r=0;t>0;)r=Math.random()*t|0,swap(e,--t,r)}function clamp(e,t,r){return Math.max(e,Math.min(t,r))}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function assertShapesMatch(e,t,r){void 0===r&&(r=""),assert(arraysEqual(e,t),function(){return r+" Shapes ".concat(e," and ").concat(t," must match")})}function assertNonNull(e){assert(null!=e,function(){return"The input to the tensor constructor must be a non-null value."})}function sizeFromShape(e){if(0===e.length)return 1;for(var t=e[0],r=1;r<e.length;r++)t*=e[r];return t}function arraysEqualWithNull(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(null!==e[r]&&null!==t[r]&&e[r]!==t[r])return!1;return!0}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function isInt(e){return e%1==0}function rightPad(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function parseAxisParam(e,t){var r=t.length;return assert((e=null==e?t.map(function(e,t){return t}):[].concat(e)).every(function(e){return e>=-r&&e<r}),function(){return"All values in axis param must be in range [-".concat(r,", ").concat(r,") but ")+"got axis ".concat(e)}),assert(e.every(function(e){return isInt(e)}),function(){return"All values in axis param must be integers but "+"got axis ".concat(e)}),e.map(function(e){return e<0?r+e:e})}function squeezeShape(e,t){for(var r=[],n=[],a=null!=t&&Array.isArray(t)&&0===t.length,o=null==t||a?null:parseAxisParam(t,e).sort(),i=0,s=0;s<e.length;++s){if(null!=o){if(o[i]===s&&1!==e[s])throw Error("Can't squeeze axis ".concat(s," since its dim '").concat(e[s],"' is not 1"));(null==o[i]||o[i]>s)&&1===e[s]&&(r.push(e[s]),n.push(s)),o[i]<=s&&i++}1!==e[s]&&(r.push(e[s]),n.push(s))}return{newShape:r,keptDims:n}}function getArrayFromDType(e,t){var r=null;if(null==e||"float32"===e)r=new Float32Array(t);else if("int32"===e)r=new Int32Array(t);else if("bool"===e)r=new Uint8Array(t);else if("string"===e)r=Array(t);else throw Error("Unknown data type ".concat(e));return r}function checkConversionForErrors(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type ".concat(t," being uploaded contains ").concat(n,"."))}}function isValidDtype(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function bytesPerElement(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error("Unknown dtype ".concat(e))}function bytesFromStringArray(e){if(null==e)return 0;var t=0;return e.forEach(function(e){return t+=e.length}),t}function isString(e){return"string"==typeof e||e instanceof String}function isBoolean(e){return"boolean"==typeof e}function isNumber(e){return"number"==typeof e}function inferDtype(e){if(Array.isArray(e))return inferDtype(e[0]);if(e instanceof Float32Array);else if(e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray)return"int32";else if(isNumber(e));else if(isString(e))return"string";else if(isBoolean(e))return"bool";return"float32"}function isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nearestDivisor(e,t){for(var r=t;r<e;++r)if(e%r==0)return r;return e}function computeStrides(e){var t=e.length;if(t<2)return[];var r=Array(t-1);r[t-2]=e[t-1];for(var n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}function toNestedArray(e,t,r){if(void 0===r&&(r=!1),0===e.length)return t[0];var n=e.reduce(function(e,t){return e*t})*(r?2:1);if(0===n)return[];if(n!==t.length)throw Error("[".concat(e,"] does not match the input size ").concat(t.length).concat(r?" for a complex tensor":"","."));return function createNestedArray(e,t,r,n){void 0===n&&(n=!1);var a=[];if(1===t.length)for(var o=t[0]*(n?2:1),i=0;i<o;i++)a[i]=r[e+i];else for(var o=t[0],s=t.slice(1),u=s.reduce(function(e,t){return e*t})*(n?2:1),i=0;i<o;i++)a[i]=createNestedArray(e+i*u,s,r,n);return a}(0,e,t,r)}function makeOnesTypedArray(e,t){for(var r=makeZerosTypedArray(e,t),n=0;n<r.length;n++)r[n]=1;return r}function makeZerosTypedArray(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error("Unknown data type ".concat(t))}function assertNonNegativeIntegerDimensions(e){e.forEach(function(t){assert(Number.isInteger(t)&&t>=0,function(){return"Tensor must have a shape comprised of positive integers but got "+"shape [".concat(e,"].")})})}function isPromise(e){return e&&e.then&&"function"==typeof e.then}var f="tfjsflags",m=function(){function Environment(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=getQueryParams,this.populateURLFlags()}return Environment.prototype.setPlatform=function(e,t){null==this.platform||env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Platform ".concat(this.platformName," has already been set. ")+"Overwriting the platform with ".concat(e,".")),this.platformName=e,this.platform=t},Environment.prototype.registerFlag=function(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},null!=this.urlFlags[e]){var n=this.urlFlags[e];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Setting feature override from URL ".concat(e,": ").concat(n,".")),this.set(e,n)}},Environment.prototype.getAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:if(e in this.flags)return[2,this.flags[e]];return t=this.flags,r=e,[4,this.evaluateFlag(e)];case 1:return t[r]=n.sent(),[2,this.flags[e]]}})})},Environment.prototype.get=function(e){if(e in this.flags)return this.flags[e];var t=this.evaluateFlag(e);if(isPromise(t))throw Error("Flag ".concat(e," cannot be synchronously evaluated. ")+"Please use getAsync() instead.");return this.flags[e]=t,this.flags[e]},Environment.prototype.getNumber=function(e){return this.get(e)},Environment.prototype.getBool=function(e){return this.get(e)},Environment.prototype.getString=function(e){return this.get(e)},Environment.prototype.getFlags=function(){return this.flags},Object.defineProperty(Environment.prototype,"features",{get:function(){return this.flags},enumerable:!1,configurable:!0}),Environment.prototype.set=function(e,t){if(null==this.flagRegistry[e])throw Error("Cannot set flag ".concat(e," as it has not been registered."));this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)},Environment.prototype.evaluateFlag=function(e){if(null==this.flagRegistry[e])throw Error("Cannot evaluate flag '".concat(e,"': no evaluation function found."));return this.flagRegistry[e].evaluationFn()},Environment.prototype.setFlags=function(e){this.flags=Object.assign({},e)},Environment.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},Environment.prototype.populateURLFlags=function(){var e=this;if(void 0!==this.global&&void 0!==this.global.location&&void 0!==this.global.location.search){var t=this.getQueryParams(this.global.location.search);f in t&&t[f].split(",").forEach(function(t){var r,n=__read(t.split(":"),2),a=n[0],o=n[1];e.urlFlags[a]="true"===(r=o.toLowerCase())||"false"===r?"true"===r:"".concat(+r)===r?+r:o})}},Environment}();function getQueryParams(e){var t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(e){for(var r,n,a=[],o=1;o<arguments.length;o++)a[o-1]=arguments[o];return r=a[0],n=a[1],t[decodeURIComponent(r)]=decodeURIComponent(n||""),a.join("=")}),t}function env(){return t.ENV}function getGlobalNamespace(){if(null==n){var e=void 0;if("undefined"!=typeof window)e=window;else if("undefined"!=typeof global)e=global;else if("undefined"!=typeof process)e=process;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");n=e}return n}function getGlobal(e,t){var r,n=(null==(r=getGlobalNamespace())._tfGlobals&&(r._tfGlobals=new Map),r._tfGlobals);if(n.has(e))return n.get(e);var a=t();return n.set(e,a),n.get(e)}t.ENV=null;var g="Acos",v="Acosh",y="AddN",b="ArgMax",_="ArgMin",T="Asin",w="Asinh",k="Atan",x="Atanh",S="Atan2",E="AvgPool",A="AvgPool3D",I="BatchMatMul",N="BatchToSpaceND",M="Bincount",D="BitwiseAnd",R="BroadcastArgs",O="Cast",P="Ceil",C="ClipByValue",B="Complex",F="ComplexAbs",Z="Concat",z="Conv2D",L="Conv2DBackpropFilter",G="Conv2DBackpropInput",U="Conv3D",W="Conv3DBackpropInputV2",K="Cosh",j="Cumprod",V="Cumsum",q="CropAndResize",H="DenseBincount",$="DepthToSpace",J="DepthwiseConv2dNative",Y="DepthwiseConv2dNativeBackpropFilter",X="DepthwiseConv2dNativeBackpropInput",Q="Diag",ee="Dilation2D",et="Draw",er="RealDiv",en="Einsum",ea="Equal",eo="ExpandDims",ei="Expm1",es="Fill",eu="FlipLeftRight",ec="Floor",el="FloorDiv",ed="FusedBatchNorm",eh="GatherV2",ep="GatherNd",ef="Greater",em="GreaterEqual",eg="Identity",ev="IFFT",ey="Imag",eb="IsFinite",e_="IsInf",eT="IsNan",ew="LeakyRelu",ek="Less",ex="LessEqual",eS="LinSpace",eE="Log1p",eA="LogicalAnd",eI="LogicalNot",eN="LogicalOr",eM="Maximum",eD="MaxPool",eR="MaxPool3D",eO="MaxPoolWithArgmax",eP="Mean",eC="Minimum",eB="MirrorPad",eF="Multinomial",eZ="Multiply",ez="NotEqual",eL="NonMaxSuppressionV3",eG="NonMaxSuppressionV4",eU="NonMaxSuppressionV5",eW="OnesLike",eK="OneHot",ej="Pack",eV="PadV2",eq="Prelu",eH="Prod",e$="RaggedGather",eJ="RaggedRange",eY="RaggedTensorToTensor",eX="Range",eQ="Real",e0="Reciprocal",e1="Relu",e2="Reshape",e3="ResizeNearestNeighbor",e4="ResizeBilinear",e6="Relu6",e5="Reverse",e7="Round",e8="Rsqrt",e9="ScatterNd",te="TensorScatterUpdate",tt="SearchSorted",tr="Select",tn="Selu",ta="Slice",to="Sinh",ti="Sign",ts="Sigmoid",tu="Softplus",tc="Sqrt",tl="SpaceToBatchND",td="SplitV",th="Softmax",tp="SparseFillEmptyRows",tf="SparseReshape",tm="SparseSegmentMean",tg="SparseSegmentSum",tv="SparseToDense",ty="SquaredDifference",tb="StaticRegexReplace",t_="StridedSlice",tT="StringNGrams",tw="StringSplit",tk="StringToHashBucketFast",tx="Tanh",tS="Tile",tE="TopK",tA="Transform",tI="Transpose",tN="Unique",tM="Unpack",tD="UnsortedSegmentSum",tR="ZerosLike",tO="Step",tP="FromPixels",tC="RotateWithOffset",tB="_FusedMatMul",tF="FusedConv2D",tZ="FusedDepthwiseConv2D";function warn(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn.apply(console,__spreadArray([],__read(e),!1))}var tz=getGlobal("kernelRegistry",function(){return new Map}),tL=getGlobal("gradRegistry",function(){return new Map});function getKernel(e,t){var r=makeKey(e,t);return tz.get(r)}function getGradient(e){return tL.get(e)}function getKernelsForBackend(e){for(var t=tz.entries(),r=[];;){var n=t.next(),a=n.done,o=n.value;if(a)break;var i=__read(o,2),s=i[0],u=i[1];__read(s.split("_"),1)[0]===e&&r.push(u)}return r}function registerKernel(e){var t=e.kernelName,r=e.backendName,n=makeKey(t,r);tz.has(n)&&warn("The kernel '".concat(t,"' for backend ")+"'".concat(r,"' is already registered")),tz.set(n,e)}function makeKey(e,t){return"".concat(t,"_").concat(e)}/**
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
 */function isTypedArrayBrowser(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var tG="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},tU=null;try{tU=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function Long$1(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function isLong(e){return!0===(e&&e.__isLong__)}Long$1.prototype.__isLong__,Object.defineProperty(Long$1.prototype,"__isLong__",{value:!0}),Long$1.isLong=isLong;var tW={},tK={};function fromInt(e,t){var r,n,a;return t?(e>>>=0,(a=0<=e&&e<256)&&(n=tK[e]))?n:(r=fromBits(e,(0|e)<0?-1:0,!0),a&&(tK[e]=r),r):(e|=0,(a=-128<=e&&e<128)&&(n=tW[e]))?n:(r=fromBits(e,e<0?-1:0,!1),a&&(tW[e]=r),r)}function fromNumber(e,t){if(isNaN(e))return t?tY:tJ;if(t){if(e<0)return tY;if(e>=tq)return t2}else{if(e<=-tH)return t3;if(e+1>=tH)return t1}return e<0?fromNumber(-e,t).neg():fromBits(e%tV|0,e/tV|0,t)}function fromBits(e,t,r){return new Long$1(e,t,r)}Long$1.fromInt=fromInt,Long$1.fromNumber=fromNumber,Long$1.fromBits=fromBits;var tj=Math.pow;function fromString(e,t,r){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return tJ;if("number"==typeof t?(r=t,t=!1):t=!!t,(r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return fromString(e.substring(1),t,r).neg();for(var n,a=fromNumber(tj(r,8)),o=tJ,i=0;i<e.length;i+=8){var s=Math.min(8,e.length-i),u=parseInt(e.substring(i,i+s),r);if(s<8){var c=fromNumber(tj(r,s));o=o.mul(c).add(fromNumber(u))}else o=(o=o.mul(a)).add(fromNumber(u))}return o.unsigned=t,o}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}Long$1.fromString=fromString,Long$1.fromValue=fromValue;var tV=4294967296,tq=18446744073709552e3,tH=0x7fffffffffffffff,t$=fromInt(16777216),tJ=fromInt(0);Long$1.ZERO=tJ;var tY=fromInt(0,!0);Long$1.UZERO=tY;var tX=fromInt(1);Long$1.ONE=tX;var tQ=fromInt(1,!0);Long$1.UONE=tQ;var t0=fromInt(-1);Long$1.NEG_ONE=t0;var t1=fromBits(-1,2147483647,!1);Long$1.MAX_VALUE=t1;var t2=fromBits(-1,-1,!0);Long$1.MAX_UNSIGNED_VALUE=t2;var t3=fromBits(0,-2147483648,!1);Long$1.MIN_VALUE=t3;var t4=Long$1.prototype;t4.toInt=function(){return this.unsigned?this.low>>>0:this.low},t4.toNumber=function(){return this.unsigned?(this.high>>>0)*tV+(this.low>>>0):this.high*tV+(this.low>>>0)},t4.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(!this.eq(t3))return"-"+this.neg().toString(e);var t=fromNumber(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var a=fromNumber(tj(e,6),this.unsigned),o=this,i="";;){var s=o.div(a),u=(o.sub(s.mul(a)).toInt()>>>0).toString(e);if((o=s).isZero())return u+i;for(;u.length<6;)u="0"+u;i=""+u+i}},t4.getHighBits=function(){return this.high},t4.getHighBitsUnsigned=function(){return this.high>>>0},t4.getLowBits=function(){return this.low},t4.getLowBitsUnsigned=function(){return this.low>>>0},t4.getNumBitsAbs=function(){if(this.isNegative())return this.eq(t3)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},t4.isZero=function(){return 0===this.high&&0===this.low},t4.eqz=t4.isZero,t4.isNegative=function(){return!this.unsigned&&this.high<0},t4.isPositive=function(){return this.unsigned||this.high>=0},t4.isOdd=function(){return(1&this.low)==1},t4.isEven=function(){return(1&this.low)==0},t4.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},t4.eq=t4.equals,t4.notEquals=function(e){return!this.eq(e)},t4.neq=t4.notEquals,t4.ne=t4.notEquals,t4.lessThan=function(e){return 0>this.comp(e)},t4.lt=t4.lessThan,t4.lessThanOrEqual=function(e){return 0>=this.comp(e)},t4.lte=t4.lessThanOrEqual,t4.le=t4.lessThanOrEqual,t4.greaterThan=function(e){return this.comp(e)>0},t4.gt=t4.greaterThan,t4.greaterThanOrEqual=function(e){return this.comp(e)>=0},t4.gte=t4.greaterThanOrEqual,t4.ge=t4.greaterThanOrEqual,t4.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},t4.comp=t4.compare,t4.negate=function(){return!this.unsigned&&this.eq(t3)?t3:this.not().add(tX)},t4.neg=t4.negate,t4.add=function(e){isLong(e)||(e=fromValue(e));var t,r,n=this.high>>>16,a=65535&this.high,o=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,h=0;return t=0+((r=0+(i+l))>>>16),r&=65535,t+=o+c,h+=t>>>16,t&=65535,h+=a+u,d+=h>>>16,h&=65535,d+=n+s,fromBits(t<<16|r,(d&=65535)<<16|h,this.unsigned)},t4.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},t4.sub=t4.subtract,t4.multiply=function(e){if(this.isZero())return tJ;if(isLong(e)||(e=fromValue(e)),tU)return fromBits(tU.mul(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned);if(e.isZero())return tJ;if(this.eq(t3))return e.isOdd()?t3:tJ;if(e.eq(t3))return this.isOdd()?t3:tJ;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(t$)&&e.lt(t$))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,a=65535&this.high,o=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,h=0;return t=0+((r=0+i*l)>>>16),r&=65535,t+=o*l,h+=t>>>16,t&=65535,t+=i*c,h+=t>>>16,t&=65535,h+=a*l,d+=h>>>16,h&=65535,h+=o*c,d+=h>>>16,h&=65535,h+=i*u,d+=h>>>16,h&=65535,d+=n*l+a*c+o*u+i*s,fromBits(t<<16|r,(d&=65535)<<16|h,this.unsigned)},t4.mul=t4.multiply,t4.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(tU){var t,r,n;return this.unsigned||-2147483648!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?tU.div_u:tU.div_s)(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?tY:tJ;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return tY;if(e.gt(this.shru(1)))return tQ;n=tY}else{if(this.eq(t3))return e.eq(tX)||e.eq(t0)?t3:e.eq(t3)?tX:(t=this.shr(1).div(e).shl(1)).eq(tJ)?e.isNegative()?tX:t0:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(t3))return this.unsigned?tY:tJ;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=tJ}for(r=this;r.gte(e);){for(var a=Math.ceil(Math.log(t=Math.max(1,Math.floor(r.toNumber()/e.toNumber())))/Math.LN2),o=a<=48?1:tj(2,a-48),i=fromNumber(t),s=i.mul(e);s.isNegative()||s.gt(r);)t-=o,s=(i=fromNumber(t,this.unsigned)).mul(e);i.isZero()&&(i=tX),n=n.add(i),r=r.sub(s)}return n},t4.div=t4.divide,t4.modulo=function(e){return(isLong(e)||(e=fromValue(e)),tU)?fromBits((this.unsigned?tU.rem_u:tU.rem_s)(this.low,this.high,e.low,e.high),tU.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},t4.mod=t4.modulo,t4.rem=t4.modulo,t4.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},t4.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},t4.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},t4.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},t4.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},t4.shl=t4.shiftLeft,t4.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},t4.shr=t4.shiftRight,t4.shiftRightUnsigned=function(e){if(isLong(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?fromBits(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?fromBits(t,0,this.unsigned):fromBits(t>>>e-32,0,this.unsigned)},t4.shru=t4.shiftRightUnsigned,t4.shr_u=t4.shiftRightUnsigned,t4.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},t4.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},t4.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},t4.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},t4.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long$1.fromBytes=function(e,t,r){return r?Long$1.fromBytesLE(e,t):Long$1.fromBytesBE(e,t)},Long$1.fromBytesLE=function(e,t){return new Long$1(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long$1.fromBytesBE=function(e,t){return new Long$1(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)};var t6=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(Long$1),t5=/**
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
 */function(e,t){return t.forEach(function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach(function(r){if("default"!==r&&!(r in e)){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})}),e}({__proto__:null,default:t6},[Long$1]),t7=t6||t5;function hexToLong(e){return t7.fromString(e,!0,16)}var t8=hexToLong("c3a5c85c97cb3127"),t9=hexToLong("b492b66fbe98f273"),re=hexToLong("9ae16a3b2f90404f");function shiftMix(e){return e.xor(e.shru(47))}function fetch$2(e,t,r){var n=e.slice(t,t+r);return t7.fromBytes(Array.from(n),!0,!0)}function fetch64(e,t){return fetch$2(e,t,8)}function rotate64(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function hashLen16(e,t,r){void 0===r&&(r=hexToLong("9ddfea08eb382d69"));var n=e.xor(t).mul(r);n=n.xor(n.shru(47));var a=t.xor(n).mul(r);return(a=a.xor(a.shru(47))).mul(r)}function weakHashLen32WithSeedsStr(e,t,r,n){var a,o,i,s,u,c,l;return a=fetch64(e,t),o=fetch64(e,t+8),i=fetch64(e,t+16),s=fetch64(e,t+24),u=r,c=n,u=u.add(a),c=rotate64(c.add(u).add(s),21),l=u,u=(u=u.add(o)).add(i),c=c.add(rotate64(u,44)),[u.add(s),c.add(l)]}function toTypedArray(e,t){if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=flatten(e)),env().getBool("DEBUG")&&checkConversionForErrors(e,t),(r=e)instanceof Float32Array&&"float32"===t||r instanceof Int32Array&&"int32"===t||r instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){for(var r,n=new Uint8Array(e.length),a=0;a<n.length;++a)0!==Math.round(e[a])&&(n[a]=1);return n}throw Error("Unknown data type ".concat(t))}function now(){return env().platform.now()}function encodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.encode(e,t)}function decodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.decode(e,t)}function isTypedArray(e){return null!=env().platform.isTypedArray?env().platform.isTypedArray(e):isTypedArrayBrowser(e)}function flatten(e,t,r){var n,a;if(void 0===t&&(t=[]),void 0===r&&(r=!1),null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||isPromise(e)||null==e||isTypedArray(e)&&r)t.push(e);else if(Array.isArray(e)||isTypedArray(e))for(var o=0;o<e.length;++o)flatten(e[o],t,r);else{var i=-1;try{for(var s=__values(Object.keys(e)),u=s.next();!u.done;u=s.next()){var c=u.value;/^([1-9]+[0-9]*|0)$/.test(c)&&(i=Math.max(i,Number(c)))}}catch(e){n={error:e}}finally{try{u&&!u.done&&(a=s.return)&&a.call(s)}finally{if(n)throw n.error}}for(var o=0;o<=i;o++)flatten(e[o],t,r)}return t}var rt=function(){function Profiler(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new rr)}return Profiler.prototype.profileKernel=function(e,t,r){var n,a,o,i,holdResultWrapperFn=function(){o=r()},s=now();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(holdResultWrapperFn);else{holdResultWrapperFn();try{for(var u=__values(o),c=u.next();!c.done;c=u.next())c.value.dataSync()}catch(e){n={error:e}}finally{try{c&&!c.done&&(a=u.return)&&a.call(u)}finally{if(n)throw n.error}}i=Promise.resolve({kernelMs:now()-s})}if(env().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(var l=0;l<o.length;l++)!function(t){var r=o[t];r.data().then(function(t){(function(e,t,r){if("float32"===t)for(var n=0;n<e.length;n++){var a=e[n];if(isNaN(a)||!isFinite(a))return console.warn("Found ".concat(a," in the result of '").concat(r,"'")),!0}})(t,r.dtype,e)})}(l);return{kernelName:e,outputs:o,inputs:t,timeMs:i.then(function(e){return e.kernelMs}),extraInfo:i.then(function(e){return null!=e.getExtraProfileInfo?e.getExtraProfileInfo():""})}},Profiler.prototype.logKernelProfile=function(e){var t=this,r=e.kernelName,n=e.outputs,a=e.timeMs,o=e.inputs,i=e.extraInfo;n.forEach(function(e){Promise.all([e.data(),a,i]).then(function(n){t.logger.logKernelProfile(r,e,n[0],n[1],o,n[2])})})},Profiler}(),rr=function(){function Logger(){}return Logger.prototype.logKernelProfile=function(e,t,r,n,a,o){var i="number"==typeof n?rightPad("".concat(n,"ms"),9):n.error,s=rightPad(e,25),u=t.rank,c=t.size,l=rightPad(t.shape.toString(),14),d="";for(var h in a){var p=a[h];if(null!=p){var f=p.shape||t.shape,m=f.length;d+="".concat(h,": ").concat(m,"D ").concat(m>0?f:""," ")}}console.log("%c".concat(s,"	%c").concat(i,"	%c").concat(u,"D ").concat(l,"	%c").concat(c,"	%c").concat(d,"	%c").concat(o),"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},Logger}();function valToString(e,t,r){return rightPad(Array.isArray(e)?"".concat(parseFloat(e[0].toFixed(7))," + ")+"".concat(parseFloat(e[1].toFixed(7)),"j"):isString(e)?"'".concat(e,"'"):"bool"===r?boolNumToString(e):parseFloat(e.toFixed(7)).toString(),t)}function boolNumToString(e){return 0===e?"false":"true"}function createComplexTuples(e){for(var t=[],r=0;r<e.length;r+=2)t.push([e[r],e[r+1]]);return t}var rn=function(){function TensorBuffer(e,t,r){var n=this;if(this.dtype=t,this.shape=e.slice(),this.size=sizeFromShape(e),null!=r){var a=r.length;assert(a===this.size,function(){return"Length of values '".concat(a,"' does not match the size ")+"inferred by the shape '".concat(n.size,"'.")})}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||getArrayFromDType(t,this.size),this.strides=computeStrides(e)}return TensorBuffer.prototype.set=function(e){for(var t=this,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];0===r.length&&(r=[0]),assert(r.length===this.rank,function(){return"The number of provided coordinates (".concat(r.length,") must ")+"match the rank (".concat(t.rank,")")});var a=this.locToIndex(r);this.values[a]=e},TensorBuffer.prototype.get=function(){for(var e,t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];0===r.length&&(r=[0]);var a=0;try{for(var o=__values(r),i=o.next();!i.done;i=o.next()){var s=i.value;if(s<0||s>=this.shape[a]){var u="Requested out of range element at ".concat(r,". ")+"  Buffer shape=".concat(this.shape);throw Error(u)}a++}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}for(var c=r[r.length-1],l=0;l<r.length-1;++l)c+=this.strides[l]*r[l];return this.values[c]},TensorBuffer.prototype.locToIndex=function(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];for(var t=e[e.length-1],r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t},TensorBuffer.prototype.indexToLoc=function(e){if(0===this.rank)return[];if(1===this.rank)return[e];for(var t=Array(this.shape.length),r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t},Object.defineProperty(TensorBuffer.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),TensorBuffer.prototype.toTensor=function(){return ra().makeTensor(this.values,this.shape,this.dtype)},TensorBuffer}(),ra=null,ro=null,ri=function(){function Tensor(e,t,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=sizeFromShape(e),this.strides=computeStrides(e),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}return Object.defineProperty(Tensor.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),Tensor.prototype.buffer=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,ro.buffer(this.shape,this.dtype,e)]}})})},Tensor.prototype.bufferSync=function(){return ro.buffer(this.shape,this.dtype,this.dataSync())},Tensor.prototype.array=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,toNestedArray(this.shape,e,"complex64"===this.dtype)]}})})},Tensor.prototype.arraySync=function(){return toNestedArray(this.shape,this.dataSync(),"complex64"===this.dtype)},Tensor.prototype.data=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:if(this.throwIfDisposed(),e=ra().read(this.dataId),"string"!==this.dtype)return[3,2];return[4,e];case 1:t=r.sent();try{return[2,t.map(function(e){return decodeString(e)})]}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}r.label=2;case 2:return[2,e]}})})},Tensor.prototype.dataToGPU=function(e){return this.throwIfDisposed(),ra().readToGPU(this.dataId,e)},Tensor.prototype.dataSync=function(){this.throwIfDisposed();var e=ra().readSync(this.dataId);if("string"===this.dtype)try{return e.map(function(e){return decodeString(e)})}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e},Tensor.prototype.bytes=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return this.throwIfDisposed(),[4,ra().read(this.dataId)];case 1:if(e=t.sent(),"string"===this.dtype)return[2,e];return[2,new Uint8Array(e.buffer)]}})})},Tensor.prototype.dispose=function(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),ra().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(Tensor.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!1,configurable:!0}),Tensor.prototype.throwIfDisposed=function(){if(this.isDisposed)throw Error("Tensor is disposed.")},Tensor.prototype.print=function(e){return void 0===e&&(e=!1),ro.print(this,e)},Tensor.prototype.clone=function(){return this.throwIfDisposed(),ro.clone(this)},Tensor.prototype.toString=function(e){var t,r,n,a,o,i,s,u,c;return void 0===e&&(e=!1),t=this.dataSync(),r=this.shape,n=this.dtype,a=e,o=computeStrides(r),i=function(e,t,r,n){var a=sizeFromShape(t),o=n[n.length-1],i=Array(o).fill(0),s=t.length,u="complex64"===r?createComplexTuples(e):e;if(s>1)for(var c=0;c<a/o;c++)for(var l=c*o,d=0;d<o;d++)i[d]=Math.max(i[d],valToString(u[l+d],0,r).length);return i}(t,r,n,o),s=r.length,u=function subTensorToString(e,t,r,n,a,o){void 0===o&&(o=!0);var i="complex64"===r?2:1,s=t[0],u=t.length;if(0===u)return"complex64"===r?[valToString(createComplexTuples(e)[0],0,r)]:"bool"===r?[boolNumToString(e[0])]:[e[0].toString()];if(1===u){if(s>20){var c=3*i,l=Array.from(e.slice(0,c)),d=Array.from(e.slice((s-3)*i,s*i));return"complex64"===r&&(l=createComplexTuples(l),d=createComplexTuples(d)),["["+l.map(function(e,t){return valToString(e,a[t],r)}).join(", ")+", ..., "+d.map(function(e,t){return valToString(e,a[s-3+t],r)}).join(", ")+"]"]}return["["+("complex64"===r?createComplexTuples(e):Array.from(e)).map(function(e,t){return valToString(e,a[t],r)}).join(", ")+"]"]}var h=t.slice(1),p=n.slice(1),f=n[0]*i,m=[];if(s>20){for(var g=0;g<3;g++){var v=g*f,y=v+f;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,a,!1)),!1))}m.push("...");for(var g=s-3;g<s;g++){var v=g*f,y=v+f;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,a,g===s-1)),!1))}}else for(var g=0;g<s;g++){var v=g*f,y=v+f;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,y),h,r,p,a,g===s-1)),!1))}var b=2===u?",":"";m[0]="["+(s>0?m[0]+b:"");for(var g=1;g<m.length-1;g++)m[g]=" "+m[g]+b;for(var _=",\n",g=2;g<u;g++)_+="\n";return m[m.length-1]=" "+m[m.length-1]+"]"+(o?"":_),m}(t,r,n,o,i),c=["Tensor"],a&&(c.push("  dtype: ".concat(n)),c.push("  rank: ".concat(s)),c.push("  shape: [".concat(r,"]")),c.push("  values:")),c.push(u.map(function(e){return"    "+e}).join("\n")),c.join("\n")},Tensor.prototype.cast=function(e){return this.throwIfDisposed(),ro.cast(this,e)},Tensor.prototype.variable=function(e,t,r){return void 0===e&&(e=!0),this.throwIfDisposed(),ra().makeVariable(this,e,t,r)},Tensor}();function getGlobalTensorClass(){return getGlobal("Tensor",function(){return ri})}Object.defineProperty(ri,Symbol.hasInstance,{value:function(e){return!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}}),getGlobalTensorClass();var rs=function(e){function Variable(t,r,n,a){var o=e.call(this,t.shape,t.dtype,t.dataId,a)||this;return o.trainable=r,o.name=n,o}return __extends(Variable,e),Variable.prototype.assign=function(e){if(e.dtype!==this.dtype)throw Error("dtype of the new value (".concat(e.dtype,") and ")+"previous value (".concat(this.dtype,") must match"));if(!arraysEqual(e.shape,this.shape))throw Error("shape of the new value (".concat(e.shape,") and ")+"previous value (".concat(this.shape,") must match"));ra().disposeTensor(this),this.dataId=e.dataId,ra().incRef(this,null)},Variable.prototype.dispose=function(){ra().disposeVariable(this),this.isDisposedInternal=!0},Variable}(ri);Object.defineProperty(rs,Symbol.hasInstance,{value:function(e){return e instanceof ri&&null!=e.assign&&e.assign instanceof Function}}),/**
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
 */t.Rank=void 0,function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"}(t.Rank||(t.Rank={})),function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"}(a||(a={})),function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"}(o||(o={})),function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"}(i||(i={})),function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"}(s||(s={}));var ru={float32:i,int32:a,bool:o,complex64:s};function upcastType(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw Error("Can not upcast ".concat(e," with ").concat(t))}return ru[e][t]}function isWebGLData(e){return null!=e&&"object"==typeof e&&"texture"in e&&e.texture instanceof WebGLTexture}function isWebGPUData(e){return"undefined"!=typeof GPUBuffer&&null!=e&&"object"==typeof e&&"buffer"in e&&e.buffer instanceof GPUBuffer}/**
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
 */function makeTypesMatch(e,t){if(e.dtype===t.dtype)return[e,t];var r=upcastType(e.dtype,t.dtype);return[e.cast(r),t.cast(r)]}function assertTypesMatch(e,t){assert(e.dtype===t.dtype,function(){return"The dtypes of the first(".concat(e.dtype,") and")+" second(".concat(t.dtype,") input must match")})}function getTensorsInContainer(e){var t=[];return function walkTensorContainer(e,t,r){if(null!=e){if(e instanceof ri){t.push(e);return}if(Array.isArray(e)||"object"==typeof e)for(var n in e){var a=e[n];r.has(a)||(r.add(a),walkTensorContainer(a,t,r))}}}(e,t,new Set),t}function isRegisteredKernelInvocation(e){return null!=e.kernelName}var rc=function(){function EngineState(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(function(e){return e.name})))}}}return EngineState.prototype.dispose=function(){for(var e in this.registeredVariables)this.registeredVariables[e].dispose()},EngineState}(),rl=function(){function Engine(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new rc}return Engine.prototype.ready=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r;return __generator(this,function(n){switch(n.label){case 0:if(null!=this.pendingBackendInit)return[2,this.pendingBackendInit.then(function(){})];if(null!=this.backendInstance)return[2];e=this.getSortedBackends(),t=0,n.label=1;case 1:if(!(t<e.length))return[3,5];return r=e[t],[4,this.initializeBackend(r).success];case 2:if(!n.sent())return[3,4];return[4,this.setBackend(r)];case 3:return n.sent(),[2];case 4:return t++,[3,1];case 5:throw Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(Engine.prototype,"backend",{get:function(){if(null!=this.pendingBackendInit)throw Error("Backend '".concat(this.backendName,"' has not yet been initialized. Make ")+"sure to await tf.ready() or await tf.setBackend() before calling other methods");if(null==this.backendInstance){var e=this.initializeBackendsAndReturnBest(),t=e.name;if(e.asyncInit)throw Error("The highest priority backend '".concat(t,"' has not yet been ")+"initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(t)}return this.backendInstance},enumerable:!1,configurable:!0}),Engine.prototype.backendNames=function(){return Object.keys(this.registryFactory)},Engine.prototype.findBackend=function(e){return e in this.registry||e in this.registryFactory&&!this.initializeBackend(e).asyncInit?this.registry[e]:null},Engine.prototype.findBackendFactory=function(e){return e in this.registryFactory?this.registryFactory[e].factory:null},Engine.prototype.registerBackend=function(e,t,r){return(void 0===r&&(r=1),e in this.registryFactory)?(warn("".concat(e," backend was already registered. ")+"Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:r},!0)},Engine.prototype.setBackend=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:if(null==this.registryFactory[e])throw Error("Backend name '".concat(e,"' not found in registry"));if(this.backendName=e,null!=this.registry[e])return[3,4];if(this.backendInstance=null,r=(t=this.initializeBackend(e)).success,!t.asyncInit)return[3,2];return[4,r];case 1:return n=a.sent(),[3,3];case 2:n=r,a.label=3;case 3:if(!n)return[2,!1];a.label=4;case 4:return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new rt(this.backendInstance),[2,!0]}})})},Engine.prototype.setupRegisteredKernels=function(){var e=this;getKernelsForBackend(this.backendName).forEach(function(t){null!=t.setupFunc&&t.setupFunc(e.backendInstance)})},Engine.prototype.disposeRegisteredKernels=function(e){var t=this;getKernelsForBackend(e).forEach(function(r){null!=r.disposeFunc&&r.disposeFunc(t.registry[e])})},Engine.prototype.initializeBackend=function(e){var t=this,r=this.registryFactory[e];if(null==r)throw Error("Cannot initialize backend ".concat(e,", no registration found."));try{var n=r.factory();if(!n||n instanceof p||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};var a=++this.pendingBackendInitId,o=n.then(function(r){return!(a<t.pendingBackendInitId)&&(t.registry[e]=r,t.pendingBackendInit=null,!0)}).catch(function(r){return!(a<t.pendingBackendInitId)&&(t.pendingBackendInit=null,warn("Initialization of backend ".concat(e," failed")),warn(r.stack||r.message),!1)});return this.pendingBackendInit=o,{success:o,asyncInit:!0}}catch(t){return warn("Initialization of backend ".concat(e," failed")),warn(t.stack||t.message),{success:!1,asyncInit:!1}}},Engine.prototype.removeBackend=function(e){if(!(e in this.registryFactory))throw Error("".concat(e," backend not found in registry"));this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},Engine.prototype.getSortedBackends=function(){var e=this;if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(t,r){return e.registryFactory[r].priority-e.registryFactory[t].priority})},Engine.prototype.initializeBackendsAndReturnBest=function(){for(var e=this.getSortedBackends(),t=0;t<e.length;t++){var r=e[t],n=this.initializeBackend(r),a=n.success,o=n.asyncInit;if(o||a)return{name:r,asyncInit:o}}throw Error("Could not initialize any backends, all backend initializations failed.")},Engine.prototype.moveData=function(e,t){var r=this.state.tensorInfo.get(t),n=r.backend,a=this.readSync(t),o=n.refCount(t);n.disposeData(t,!0),r.backend=e,e.move(t,a,r.shape,r.dtype,o),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},Engine.prototype.tidy=function(e,t){var r,n=this,a=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a=e}return this.scopedRun(function(){return n.startScope(a)},function(){return n.endScope(r)},function(){return(r=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r})},Engine.prototype.scopedRun=function(e,t,r){e();try{var n=r();return t(),n}catch(e){throw t(),e}},Engine.prototype.nextTensorId=function(){return Engine.nextTensorId++},Engine.prototype.nextVariableId=function(){return Engine.nextVariableId++},Engine.prototype.clone=function(e){var t=rd.runKernel(eg,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],function(e){return{x:function(){return rd.runKernel(O,{x:e},{dtype:"float32"})}}},[],{}),t},Engine.prototype.runKernel=function(e,t,r){if(null==this.backendName&&this.backend,!(null!=getKernel(e,this.backendName)))throw Error("Kernel '".concat(e,"' not registered for backend '").concat(this.backendName,"'"));return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})},Engine.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},Engine.prototype.checkKernelForMemLeak=function(e,t,r){var n=this.backend.numDataIds(),a=0;r.forEach(function(e){a+="complex64"===e.dtype?3:1});var o=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-t-a-o;if(i>0)throw Error("Backend '".concat(this.backendName,"' has an internal memory leak ")+"(".concat(i," data ids) after running '").concat(e,"'"))},Engine.prototype.runKernelFunc=function(e){var t,r,n,a,o=this,i=[],s=this.isTapeOn(),u=this.state.numBytes,c=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;var l=isRegisteredKernelInvocation(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(isRegisteredKernelInvocation(e)){var d=e.kernelName,h=e.inputs,p=e.attrs;null==this.backendName&&this.backend;var f=getKernel(d,this.backendName);assert(null!=f,function(){return"Cannot find registered kernel '".concat(d,"' for backend '").concat(o.backendName,"'")}),r=function(){var e=o.backend.numDataIds(),t=Array.isArray(n=f.kernelFunc({inputs:h,attrs:p,backend:o.backend}))?n:[n];o.shouldCheckForMemLeaks()&&o.checkKernelForMemLeak(d,e,t);var r=t.map(function(e){return null!=e.rank?e:o.makeTensorFromTensorInfo(e)});if(s){var a=o.getTensorsForGradient(d,h,r);i=o.saveTensorsForBackwardMode(a)}return r}}else{var m=e.forwardFunc,saveFunc_1=function(e){s&&(i=e.map(function(e){return o.keep(o.clone(e))}))};r=function(){var e=o.backend.numDataIds(),t=Array.isArray(n=o.tidy(function(){return m(o.backend,saveFunc_1)}))?n:[n];return o.shouldCheckForMemLeaks()&&o.checkKernelForMemLeak(l,e,t),t}}var g=e.inputs,v=e.attrs,y=isRegisteredKernelInvocation(e)?null:e.backwardsFunc;return this.scopedRun(function(){return o.state.kernelDepth++},function(){return o.state.kernelDepth--},function(){o.ENV.getBool("DEBUG")||o.state.profiling?(a=o.profiler.profileKernel(l,g,function(){return r()}),o.ENV.getBool("DEBUG")&&o.profiler.logKernelProfile(a),t=a.outputs):t=r()}),s&&this.addTapeNode(l,g,t,y,i,v),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-u,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-c,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(g).map(function(e){return null!=g[e]?g[e].shape:null}),outputShapes:t.map(function(e){return e.shape}),kernelTimeMs:a.timeMs,extraInfo:a.extraInfo}),Array.isArray(n)?t:t[0]},Engine.prototype.saveTensorsForBackwardMode=function(e){var t=this;return e.map(function(e){return t.keep(t.clone(e))})},Engine.prototype.getTensorsForGradient=function(e,t,r){var n=getGradient(e);if(null!=n){var a=n.inputsToSave||[],o=n.outputsToSave||[],i=void 0;n.saveAllInputs?(assert(Array.isArray(t),function(){return"saveAllInputs is true, expected inputs to be an array."}),i=Object.keys(t).map(function(e){return t[e]})):i=a.map(function(e){return t[e]});var s=r.filter(function(e,t){return o[t]});return i.concat(s)}return[]},Engine.prototype.makeTensor=function(e,t,r,n){if(null==e)throw Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;var a=e;"string"===r&&isString(e[0])&&(a=e.map(function(e){return encodeString(e)}));var o=n.write(a,t,r),i=new ri(t,r,o,this.nextTensorId());if(this.trackTensor(i,n),"string"===r){var s=this.state.tensorInfo.get(o),u=bytesFromStringArray(a);this.state.numBytes+=u-s.bytes,s.bytes=u}return i},Engine.prototype.makeTensorFromDataId=function(e,t,r,n){var a={dataId:e,shape:t,dtype:r=r||"float32"};return this.makeTensorFromTensorInfo(a,n)},Engine.prototype.makeTensorFromTensorInfo=function(e,t){var r=e.dataId,n=e.shape,a=e.dtype,o=new ri(n,a,r,this.nextTensorId());return this.trackTensor(o,t),o},Engine.prototype.makeVariable=function(e,t,r,n){void 0===t&&(t=!0),r=r||this.nextVariableId().toString(),null!=n&&n!==e.dtype&&(e=e.cast(n));var a=new rs(e,t,r,this.nextTensorId());if(null!=this.state.registeredVariables[a.name])throw Error("Variable with name ".concat(a.name," was already registered"));return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a},Engine.prototype.trackTensor=function(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;var r=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(r=e.size*bytesPerElement(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof rs||this.track(e)},Engine.prototype.incRef=function(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)},Engine.prototype.removeDataId=function(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)},Engine.prototype.disposeTensor=function(e){if(this.state.tensorInfo.has(e.dataId)){var t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){var r=e.size*bytesPerElement(e.dtype);this.state.numBytes-=r}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}},Engine.prototype.disposeVariables=function(){for(var e in this.state.registeredVariables){var t=this.state.registeredVariables[e];this.disposeVariable(t)}},Engine.prototype.disposeVariable=function(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]},Engine.prototype.memory=function(){var e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e},Engine.prototype.profile=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:return this.state.profiling=!0,t=this.state.numBytes,r=this.state.numTensors,this.state.activeProfile.kernels=[],n=this.state.activeProfile,[4,e()];case 1:n.result=d.sent(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,__spreadArray([],__read(this.state.activeProfile.kernels.map(function(e){return e.totalBytesSnapshot})),!1)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r,d.label=2;case 2:d.trys.push([2,8,9,10]),o=(a=__values(this.state.activeProfile.kernels)).next(),d.label=3;case 3:if(o.done)return[3,7];return s=i=o.value,[4,i.kernelTimeMs];case 4:return s.kernelTimeMs=d.sent(),u=i,[4,i.extraInfo];case 5:u.extraInfo=d.sent(),d.label=6;case 6:return o=a.next(),[3,3];case 7:return[3,10];case 8:return c={error:d.sent()},[3,10];case 9:try{o&&!o.done&&(l=a.return)&&l.call(a)}finally{if(c)throw c.error}return[7];case 10:return[2,this.state.activeProfile]}})})},Engine.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&0===this.state.kernelDepth},Engine.prototype.addTapeNode=function(e,t,r,n,a,o){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:a},u=getGradient(e);null!=u&&(n=u.gradFunc),null!=n&&(s.gradient=function(e){return n((e=e.map(function(e,t){if(null==e){var n=r[t],a=makeZerosTypedArray(n.size,n.dtype);return i.makeTensor(a,n.shape,n.dtype)}return e})).length>1?e:e[0],a,o)}),this.state.activeTape.push(s)},Engine.prototype.keep=function(e){return e.kept=!0,e},Engine.prototype.startTape=function(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++},Engine.prototype.endTape=function(){this.state.gradientDepth--},Engine.prototype.startScope=function(e){var t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t},Engine.prototype.endScope=function(e){for(var t=this,r=getTensorsInContainer(e),n=new Set(r.map(function(e){return e.id})),a=0;a<this.state.activeScope.track.length;a++){var o=this.state.activeScope.track[a];o.kept||n.has(o.id)||o.dispose()}var i=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],r.forEach(function(e){e.kept||e.scopeId!==i.id||t.track(e)})},Engine.prototype.gradients=function(e,t,r,n){var a=this;if(void 0===n&&(n=!1),assert(t.length>0,function(){return"gradients() received an empty list of xs."}),null!=r&&"float32"!==r.dtype)throw Error("dy must have 'float32' dtype, but has '".concat(r.dtype,"'"));var o=this.scopedRun(function(){return a.startTape()},function(){return a.endTape()},function(){return a.tidy("forward",e)});assert(o instanceof ri,function(){return"The result y returned by f() must be a tensor."});var i=/**
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
 */function(e,t,r){for(var n={},a={},o=0;o<t.length;o++)n[t[o].id]=!0;for(var o=0;o<e.length;o++){var i=e[o],s=i.inputs;for(var u in s){for(var c=s[u],l=!1,d=0;d<t.length;d++)if(n[c.id]){i.outputs.forEach(function(e){return n[e.id]=!0}),l=!0,a[i.id]=!0;break}if(l)break}}var h={};h[r.id]=!0;for(var p={},o=e.length-1;o>=0;o--)for(var i=e[o],s=i.inputs,d=0;d<i.outputs.length;d++)if(h[i.outputs[d].id]){for(var u in s)h[s[u].id]=!0,p[i.id]=!0;break}for(var f=[],o=0;o<e.length;o++){var i=e[o];if(a[i.id]&&p[i.id]){var m={};for(var u in i.inputs){var g=i.inputs[u];n[g.id]&&(m[u]=g)}var v=Object.assign({},i);v.inputs=m,v.outputs=i.outputs,f.push(v)}}return f}(this.state.activeTape,t,o);if(!n&&0===i.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var e,n,s={};s[o.id]=null==r?(n=makeOnesTypedArray(sizeFromShape(e=o.shape),"float32"),rd.makeTensor(n,e,"float32")):r,function(e,t,r,n){for(var a=t.length-1;a>=0;a--)!function(a){var o=t[a],i=[];if(o.outputs.forEach(function(t){var r=e[t.id];null!=r?i.push(r):i.push(null)}),null==o.gradient)throw Error("Cannot compute gradient: gradient function not found "+"for ".concat(o.kernelName,"."));var s=o.gradient(i),_loop_2=function(t){if(!(t in s))throw Error("Cannot backprop through input ".concat(t,". ")+"Available gradients found: ".concat(Object.keys(s),"."));var a=r(function(){return s[t]()});if("float32"!==a.dtype)throw Error("Error in gradient for op ".concat(o.kernelName,". The gradient of input ")+"".concat(t," must have 'float32' dtype, but has '").concat(a.dtype,"'"));var i=o.inputs[t];if(!arraysEqual(a.shape,i.shape))throw Error("Error in gradient for op ".concat(o.kernelName,". The gradient of input ")+"'".concat(t,"' has shape '").concat(a.shape,"', which does not match ")+"the shape of the input '".concat(i.shape,"'"));if(null==e[i.id])e[i.id]=a;else{var u=e[i.id];e[i.id]=n(u,a),u.dispose()}};for(var u in o.inputs)_loop_2(u)}(a)}(s,i,function(e){return a.tidy(e)},add$1);var u=t.map(function(e){return s[e.id]});return 0===a.state.gradientDepth&&(a.state.activeTape.forEach(function(e){var t,r;try{for(var n=__values(e.saved),a=n.next();!a.done;a=n.next())a.value.dispose()}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}),a.state.activeTape=null),{value:o,grads:u}})},Engine.prototype.customGrad=function(e){var t=this;return assert(isFunction(e),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var r,n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];assert(n.every(function(e){return e instanceof ri}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var o={};return n.forEach(function(e,t){o[t]=e}),t.runKernelFunc({forwardFunc:function(t,a){return assert((r=e.apply(void 0,__spreadArray([],__read(__spreadArray(__spreadArray([],__read(n),!1),[a],!1)),!1))).value instanceof ri,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),assert(isFunction(r.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),r.value},backwardsFunc:function(e,t){var a=r.gradFunc(e,t),o=Array.isArray(a)?a:[a];assert(o.length===n.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),assert(o.every(function(e){return e instanceof ri}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var i={};return o.forEach(function(e,t){i[t]=function(){return e}}),i},inputs:o})}},Engine.prototype.readSync=function(e){return this.state.tensorInfo.get(e).backend.readSync(e)},Engine.prototype.read=function(e){return this.state.tensorInfo.get(e).backend.read(e)},Engine.prototype.readToGPU=function(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)},Engine.prototype.time=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:return t=now(),[4,this.backend.time(e)];case 1:return(r=n.sent()).wallMs=now()-t,[2,r]}})})},Engine.prototype.track=function(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e},Object.defineProperty(Engine.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!1,configurable:!0}),Engine.prototype.reset=function(){for(var e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new rc,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},Engine}();function getOrMakeEngine(){var e,r=getGlobalNamespace();if(null==r._tfengine){var n=new m(r);r._tfengine=new rl(n)}return e=r._tfengine.ENV,t.ENV=e,ra=function(){return r._tfengine},r._tfengine}rl.nextTensorId=0,rl.nextVariableId=0;var rd=getOrMakeEngine();function add$1(e,t){return rd.runKernel("Add",{a:e,b:t})}function isBrowser(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}/**
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
 */function inferShape(e,t){var r=e;if(isTypedArray(e))return"string"===t?[]:[e.length];if(isWebGLData(e)){var n=e.channels||"RGBA";return[e.height,e.width*n.length]}if(isWebGPUData(e))return[e.buffer.size/(null==t?4:bytesPerElement(t))];if(!Array.isArray(e))return[];for(var a=[];Array.isArray(r)||isTypedArray(r)&&"string"!==t;)a.push(r.length),r=r[0];return Array.isArray(e)&&env().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function deepAssertShapeConsistency(e,t,r){if(r=r||[],!Array.isArray(e)&&!isTypedArray(e)){assert(0===t.length,function(){return"Element arr[".concat(r.join("]["),"] is a primitive, ")+"but should be an array/TypedArray of ".concat(t[0]," elements")});return}assert(t.length>0,function(){return"Element arr[".concat(r.join("]["),"] should be a primitive, ")+"but is an array of ".concat(e.length," elements")}),assert(e.length===t[0],function(){return"Element arr[".concat(r.join("]["),"] should have ").concat(t[0]," ")+"elements, but has ".concat(e.length," elements")});for(var n=t.slice(1),a=0;a<e.length;++a)deepAssertShapeConsistency(e[a],n,r.concat(a))}(e,a,[]),a}function assertDtype(e,t,r,n){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error("Argument '".concat(r,"' passed to '").concat(n,"' must ")+"be ".concat(e," tensor, but got ").concat(t," tensor"))}}function convertToTensor(e,t,r,n){if(void 0===n&&(n="numeric"),e instanceof getGlobalTensorClass())return assertDtype(n,e.dtype,t,r),e;var a=inferDtype(e);if("string"!==a&&["bool","int32","float32"].indexOf(n)>=0&&(a=n),assertDtype(n,a,t,r),null==e||!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){var o=null==e?"null":e.constructor.name;throw Error("Argument '".concat(t,"' passed to '").concat(r,"' must be a ")+"Tensor or TensorLike, but got '".concat(o,"'"))}var i=inferShape(e,a);isTypedArray(e)||Array.isArray(e)||(e=[e]);var s="string"!==a?toTypedArray(e,a):flatten(e,[],!0);return rd.makeTensor(s,i,a)}function convertToTensorArray(e,t,r,n){if(void 0===n&&(n="numeric"),!Array.isArray(e))throw Error("Argument ".concat(t," passed to ").concat(r," must be a ")+"`Tensor[]` or `TensorLike[]`");return e.map(function(e,a){return convertToTensor(e,"".concat(t,"[").concat(a,"]"),r,n)})}rh.registerFlag("DEBUG",function(){return!1},function(e){e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),rh.registerFlag("IS_BROWSER",function(){return isBrowser()}),rh.registerFlag("IS_NODE",function(){return"undefined"!=typeof process&&void 0!==process.versions&&void 0!==process.versions.node}),rh.registerFlag("IS_CHROME",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),rh.registerFlag("IS_SAFARI",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)}),rh.registerFlag("PROD",function(){return!1}),rh.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return rh.getBool("DEBUG")}),rh.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),rh.registerFlag("IS_TEST",function(){return!1}),rh.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",function(){return rh.getBool("DEBUG")}),rh.registerFlag("WRAP_TO_IMAGEBITMAP",function(){return!1}),rh.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",function(){return!1}),rh.registerFlag("USE_SETTIMEOUTCUSTOM",function(){return!1});var rp="__op";function op(e){var t=Object.keys(e);if(1!==t.length)throw Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+"".concat(t.length," keys."));var r=t[0],n=e[r];r.endsWith("_")&&(r=r.substring(0,r.length-1));var f2=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];rd.startScope(r);try{var a=n.apply(void 0,__spreadArray([],__read(e),!1));return isPromise(a)&&console.error("Cannot return a Promise inside of tidy."),rd.endScope(a),a}catch(e){throw rd.endScope(null),e}};return Object.defineProperty(f2,"name",{value:r+=rp,configurable:!0}),f2}var rf=op({complex_:/**
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
 */function(e,t){var r=convertToTensor(e,"real","complex"),n=convertToTensor(t,"imag","complex");return assertShapesMatch(r.shape,n.shape,"real and imag shapes, ".concat(r.shape," and ").concat(n.shape,", ")+"must match in call to tf.complex()."),rd.runKernel(B,{real:r,imag:n})}});/**
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
 */function makeTensor(e,t,r,n){if(null==n)n=inferDtype(e);else if("complex64"===n)throw Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(isWebGPUData(e)||isWebGLData(e)){if("float32"!==n&&"int32"!==n)throw Error("Creating tensor from GPU data only supports "+"'float32'|'int32' dtype, while the dtype is ".concat(n,"."));return rd.backend.createTensorFromGPUData(e,t||r,n)}if(!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){assertNonNegativeIntegerDimensions(t);var a=sizeFromShape(t),o=sizeFromShape(r);assert(a===o,function(){return"Based on the provided shape, [".concat(t,"], the tensor should have ")+"".concat(a," values but has ").concat(o)});for(var i=0;i<r.length;++i){var s=r[i],u=i!==r.length-1||s!==sizeFromShape(t.slice(i));assert(r[i]===t[i]||!u,function(){return"Error creating a new Tensor. Inferred shape "+"(".concat(r,") does not match the provided ")+"shape (".concat(t,"). ")})}}return isTypedArray(e)||Array.isArray(e)||(e=[e]),t=t||r,e="string"!==n?toTypedArray(e,n):flatten(e,[],!0),rd.makeTensor(e,t,n)}/**
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
 */var rm={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8},rg=function(){function CompositeArrayBuffer(e){if(this.shards=[],this.previousShardIndex=0,null!=e&&(e instanceof Array||(e=[e]),0!==(e=e.map(function(e){return isTypedArray(e)?e.buffer:e})).length)){this.bufferUniformSize=e[0].byteLength;for(var t=0,r=0;r<e.length;r++){var n=e[r];r!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);var a=t+n.byteLength;this.shards.push({buffer:n,start:t,end:a}),t=a}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}}return CompositeArrayBuffer.join=function(e){return new CompositeArrayBuffer(e).slice()},CompositeArrayBuffer.prototype.slice=function(e,t){if(void 0===e&&(e=0),void 0===t&&(t=this.byteLength),0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);var r=this.findShardForByte(e);if(-1===r)throw Error("Could not find start shard for byte ".concat(e));for(var n=t-e,a=new ArrayBuffer(n),o=new Uint8Array(a),i=0,s=r;s<this.shards.length;s++){var u=this.shards[s],c=e+i-u.start,l=i,d=Math.min(t,u.end)-u.start,h=new Uint8Array(u.buffer,c,d-c);if(o.set(h,l),i+=h.length,t<u.end)break}return a},CompositeArrayBuffer.prototype.findShardForByte=function(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function check(t){return e<t.start?-1:e>=t.end?1:0}if(0===check(this.shards[this.previousShardIndex]))return this.previousShardIndex;var t=function(e,t){for(var r=0,n=e.length;r<=n;){var a=Math.floor((n-r)/2)+r,o=t(e[a]);if(0===o)return a;o<0?n=a:r=a+1}return -1}(this.shards,check);return -1===t?-1:(this.previousShardIndex=t,this.previousShardIndex)},CompositeArrayBuffer}();function tidy(e,t){return rd.tidy(e,t)}function dispose(e){getTensorsInContainer(e).forEach(function(e){return e.dispose()})}function keep(e){return rd.keep(e)}function getBackend(){return rd.backendName}function backend(){return rd.backend}function decodeWeights(e,t){var r,n,a=new rg(e),o={},i=0;try{for(var s=__values(t),u=s.next();!u.done;u=s.next()){var c=u.value,l=function(e,t){var r,n=sizeFromShape(e.shape);if("quantization"in e)r=rm[e.quantization.dtype];else if("string"===e.dtype){for(var a=0,o=0;o<n;o++)a+=4+new Uint32Array(t(a,a+4))[0];return a}else r=rm[e.dtype];return n*r}(c,function(e,t){return a.slice(i+e,i+t)});o[c.name]=decodeWeight(c,a.slice(i,i+l)),i+=l}}catch(e){r={error:e}}finally{try{u&&!u.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}return o}function decodeWeight(e,t){var r,n=e.name,a=e.dtype,o=e.shape,i=sizeFromShape(o),s=0;if("quantization"in e){var u=e.quantization;if("uint8"===u.dtype||"uint16"===u.dtype){if(!("min"in u&&"scale"in u))throw Error("Weight ".concat(e.name," with quantization ").concat(u.dtype," ")+"doesn't have corresponding metadata min and scale.")}else if("float16"===u.dtype){if("float32"!==a)throw Error("Weight ".concat(e.name," is quantized with ").concat(u.dtype," ")+"which only supports weights of type float32 not ".concat(a,"."))}else throw Error("Weight ".concat(e.name," has unknown ")+"quantization dtype ".concat(u.dtype,". ")+"Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.");var c=rm[u.dtype],l="uint8"===u.dtype?new Uint8Array(t):new Uint16Array(t);if("float32"===a){if("uint8"===u.dtype||"uint16"===u.dtype){r=new Float32Array(l.length);for(var d,h,p,f=0;f<l.length;f++){var m=l[f];r[f]=m*u.scale+u.min}}else if("float16"===u.dtype)r=(d=function(){var e=new Uint32Array(2048);e[0]=0;for(var t=1;t<1024;t++)e[t]=function(e){for(var t=e<<13,r=0;(8388608&t)==0;)r-=8388608,t<<=1;return(t&=-8388609)|(r+=947912704)}(t);for(var t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}(),h=function(){var e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(var t=1;t<31;t++)e[t]=t<<23;for(var t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),p=function(){for(var e=new Uint32Array(64),t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}(),function(e){for(var t=new ArrayBuffer(4*e.length),r=new Uint32Array(t),n=0;n<e.length;n++){var a=e[n],o=d[p[a>>10]+(1023&a)]+h[a>>10];r[n]=o}return new Float32Array(t)})(l);else throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type float32.")}else if("int32"===a){if("uint8"!==u.dtype&&"uint16"!==u.dtype)throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type int32.");r=new Int32Array(l.length);for(var f=0;f<l.length;f++){var m=l[f];r[f]=Math.round(m*u.scale+u.min)}}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(a));s+=i*c}else if("string"===a){var g=sizeFromShape(e.shape);r=[];for(var f=0;f<g;f++){var v=new Uint32Array(t.slice(s,s+4))[0];s+=4;var y=new Uint8Array(t.slice(s,s+v));r.push(y),s+=v}}else{var b=rm[a];if("float32"===a)r=new Float32Array(t);else if("int32"===a)r=new Int32Array(t);else if("bool"===a)r=new Uint8Array(t);else if("complex64"===a){r=new Float32Array(t);for(var _=new Float32Array(r.length/2),T=new Float32Array(r.length/2),f=0;f<_.length;f++)_[f]=r[2*f],T[f]=r[2*f+1];var w=tensor(_,o,"float32"),k=tensor(T,o,"float32"),x=rf(w,k);return w.dispose(),k.dispose(),x}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(a));s+=i*b}return tensor(r,o,a)}function readToLength(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:n=new Uint8Array(t),c.label=1;case 1:if(!(n.byteLength<r))return[3,3];return[4,e.read()];case 2:if(o=(a=c.sent()).done,i=a.value,o&&null==i)throw s=r-n.byteLength,Error("Reader is done but ".concat(s," bytes are still expected"));return(u=new Uint8Array(n.length+i.byteLength)).set(n,0),u.set(new Uint8Array(i),n.length),n=u,[3,1];case 3:return[2,n.buffer]}})})}var rv="undefined"!=typeof Buffer&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function stringByteLength(e){return rv?Buffer.byteLength(e,"utf8"):new Blob([e]).size}function basename(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);var t=e.split("/");return t[t.length-1]}function getModelJSONForModelArtifacts(e,t){var r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),r}function getModelArtifactsForJSONSync(e,t,r){var n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!r)throw Error("modelJSON has weightsManifest but weightData is null");n.weightSpecs=t,n.weightData=r}return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),n}function getModelArtifactsForJSON(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a;return __generator(this,function(o){switch(o.label){case 0:if(!(null!=e.weightsManifest))return[3,2];return[4,t(e.weightsManifest)];case 1:r=(a=__read.apply(void 0,[o.sent(),2]))[0],n=a[1],o.label=2;case 2:return[2,getModelArtifactsForJSONSync(e,r,n)]}})})}function getModelArtifactsInfoForJSON(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:stringByteLength(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:stringByteLength(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new rg(e.weightData).byteLength}}function getWeightSpecs(e){var t,r,n=[];try{for(var a=__values(e),o=a.next();!o.done;o=a.next()){var i=o.value;n.push.apply(n,__spreadArray([],__read(i.weights),!1))}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return n}/**
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
 */var ry=function(){function IORouterRegistry(){this.saveRouters=[],this.loadRouters=[]}return IORouterRegistry.getInstance=function(){return null==IORouterRegistry.instance&&(IORouterRegistry.instance=new IORouterRegistry),IORouterRegistry.instance},IORouterRegistry.registerSaveRouter=function(e){IORouterRegistry.getInstance().saveRouters.push(e)},IORouterRegistry.registerLoadRouter=function(e){IORouterRegistry.getInstance().loadRouters.push(e)},IORouterRegistry.getSaveHandlers=function(e){return IORouterRegistry.getHandlers(e,"save")},IORouterRegistry.getLoadHandlers=function(e,t){return IORouterRegistry.getHandlers(e,"load",t)},IORouterRegistry.getHandlers=function(e,t,r){var n=[];return("load"===t?IORouterRegistry.getInstance().loadRouters:IORouterRegistry.getInstance().saveRouters).forEach(function(t){var a=t(e,r);null!==a&&n.push(a)}),n},IORouterRegistry}(),rb="tensorflowjs",r_="models_store",rT="model_info_store";function getIndexedDBFactory(){if(!env().getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function setUpDatabase(e){var t=e.result;t.createObjectStore(r_,{keyPath:"modelPath"}),t.createObjectStore(rT,{keyPath:"modelPath"})}var rw=function(){function BrowserIndexedDB(e){if(this.indexedDB=getIndexedDBFactory(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}return BrowserIndexedDB.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,e)]})})},BrowserIndexedDB.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,this.databaseAction(this.modelPath)]})})},BrowserIndexedDB.prototype.databaseAction=function(e,t){var r=this;return new Promise(function(e,n){var a=r.indexedDB.open(rb,1);a.onupgradeneeded=function(){return setUpDatabase(a)},a.onsuccess=function(){var o=a.result;if(null==t){var i=o.transaction(r_,"readonly"),s=i.objectStore(r_).get(r.modelPath);s.onsuccess=function(){if(null==s.result)return o.close(),n(Error("Cannot find model with path '".concat(r.modelPath,"' ")+"in IndexedDB."));e(s.result.modelArtifacts)},s.onerror=function(e){return o.close(),n(s.error)},i.oncomplete=function(){return o.close()}}else{t.weightData=rg.join(t.weightData);var u,c,l=getModelArtifactsInfoForJSON(t),d=o.transaction(rT,"readwrite"),h=d.objectStore(rT);try{u=h.put({modelPath:r.modelPath,modelArtifactsInfo:l})}catch(e){return n(e)}u.onsuccess=function(){var a,i=(c=o.transaction(r_,"readwrite")).objectStore(r_);try{a=i.put({modelPath:r.modelPath,modelArtifacts:t,modelArtifactsInfo:l})}catch(e){return n(e)}a.onsuccess=function(){return e({modelArtifactsInfo:l})},a.onerror=function(e){var t=(h=d.objectStore(rT)).delete(r.modelPath);t.onsuccess=function(){return o.close(),n(a.error)},t.onerror=function(e){return o.close(),n(a.error)}}},u.onerror=function(e){return o.close(),n(u.error)},d.oncomplete=function(){null==c?o.close():c.oncomplete=function(){return o.close()}}}},a.onerror=function(e){return n(a.error)}})},BrowserIndexedDB}();rw.URL_SCHEME="indexeddb://";var indexedDBRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rw.URL_SCHEME)?(t=e.slice(rw.URL_SCHEME.length),new rw(t)):null};ry.registerSaveRouter(indexedDBRouter),ry.registerLoadRouter(indexedDBRouter);var rk=function(){function BrowserIndexedDBManager(){this.indexedDB=getIndexedDBFactory()}return BrowserIndexedDBManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=e.indexedDB.open(rb,1);n.onupgradeneeded=function(){return setUpDatabase(n)},n.onsuccess=function(){var e=n.result,a=e.transaction(rT,"readonly"),o=a.objectStore(rT).getAll();o.onsuccess=function(){var e,r,n={};try{for(var a=__values(o.result),i=a.next();!i.done;i=a.next()){var s=i.value;n[s.modelPath]=s.modelArtifactsInfo}}catch(t){e={error:t}}finally{try{i&&!i.done&&(r=a.return)&&r.call(a)}finally{if(e)throw e.error}}t(n)},o.onerror=function(t){return e.close(),r(o.error)},a.oncomplete=function(){return e.close()}},n.onerror=function(e){return r(n.error)}})]})})},BrowserIndexedDBManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(r){return e=e.startsWith(rw.URL_SCHEME)?e.slice(rw.URL_SCHEME.length):e,[2,new Promise(function(r,n){var a=t.indexedDB.open(rb,1);a.onupgradeneeded=function(){return setUpDatabase(a)},a.onsuccess=function(){var t,o=a.result,i=o.transaction(rT,"readwrite"),s=i.objectStore(rT),u=s.get(e);u.onsuccess=function(){if(null==u.result)return o.close(),n(Error("Cannot find model with path '".concat(e,"' ")+"in IndexedDB."));var a=s.delete(e),deleteModelData_1=function(){var a=(t=o.transaction(r_,"readwrite")).objectStore(r_).delete(e);a.onsuccess=function(){return r(u.result.modelArtifactsInfo)},a.onerror=function(e){return n(u.error)}};a.onsuccess=deleteModelData_1,a.onerror=function(e){return deleteModelData_1(),o.close(),n(u.error)}},u.onerror=function(e){return o.close(),n(u.error)},i.oncomplete=function(){null==t?o.close():t.oncomplete=function(){return o.close()}}},a.onerror=function(e){return n(a.error)}})]})})},BrowserIndexedDBManager}(),rx="tensorflowjs_models",rS="info";function getModelKeys(e){return{info:[rx,e,rS].join("/"),topology:[rx,e,"model_topology"].join("/"),weightSpecs:[rx,e,"weight_specs"].join("/"),weightData:[rx,e,"weight_data"].join("/"),modelMetadata:[rx,e,"model_metadata"].join("/")}}function removeItems(e){var t,r;try{for(var n=__values(Object.values(e)),a=n.next();!a.done;a=n.next()){var o=a.value;window.localStorage.removeItem(o)}}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}var rE=function(){function BrowserLocalStorage(e){if(!env().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=getModelKeys(this.modelPath)}return BrowserLocalStorage.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o;return __generator(this,function(i){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),n=getModelArtifactsInfoForJSON(e),a=rg.join(e.weightData);try{return this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,function(e){if(rv)return Buffer.from(e).toString("base64");for(var t=new Uint8Array(e),r="",n=0,a=t.length;n<a;n++)r+=String.fromCharCode(t[n]);return btoa(r)}(a)),o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0},this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),[2,{modelArtifactsInfo:n}]}catch(e){throw removeItems(this.keys),Error("Failed to save model '".concat(this.modelPath,"' to local storage: ")+"size quota being exceeded is a possible cause of this failure: "+"modelTopologyBytes=".concat(n.modelTopologyBytes,", ")+"weightSpecsBytes=".concat(n.weightSpecsBytes,", ")+"weightDataBytes=".concat(n.weightDataBytes,"."))}return[2]})})},BrowserLocalStorage.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a,o,i;return __generator(this,function(s){if(null==(e=JSON.parse(this.LS.getItem(this.keys.info))))throw Error("In local storage, there is no model with name '".concat(this.modelPath,"'"));if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(t={},null==(r=JSON.parse(this.LS.getItem(this.keys.topology))))throw Error("In local storage, the topology of model '".concat(this.modelPath,"' ")+"is missing.");if(t.modelTopology=r,null==(n=JSON.parse(this.LS.getItem(this.keys.weightSpecs))))throw Error("In local storage, the weight specs of model '".concat(this.modelPath,"' ")+"are missing.");if(t.weightSpecs=n,null!=(a=this.LS.getItem(this.keys.modelMetadata))&&(o=JSON.parse(a),t.format=o.format,t.generatedBy=o.generatedBy,t.convertedBy=o.convertedBy,null!=o.signature&&(t.signature=o.signature),null!=o.userDefinedMetadata&&(t.userDefinedMetadata=o.userDefinedMetadata),null!=o.modelInitializer&&(t.modelInitializer=o.modelInitializer),null!=o.initializerSignature&&(t.initializerSignature=o.initializerSignature),null!=o.trainingConfig&&(t.trainingConfig=o.trainingConfig)),null==(i=this.LS.getItem(this.keys.weightData)))throw Error("In local storage, the binary weight values of model "+"'".concat(this.modelPath,"' are missing."));return t.weightData=function(e){if(rv){var t=Buffer.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}for(var r=atob(e),n=new Uint8Array(r.length),a=0;a<r.length;++a)n.set([r.charCodeAt(a)],a);return n.buffer}(i),[2,t]})})},BrowserLocalStorage}();rE.URL_SCHEME="localstorage://";var localStorageRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rE.URL_SCHEME)?(t=e.slice(rE.URL_SCHEME.length),new rE(t)):null};ry.registerSaveRouter(localStorageRouter),ry.registerLoadRouter(localStorageRouter);var rA=function(){function BrowserLocalStorageManager(){assert(env().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),assert("undefined"==typeof window||void 0!==window.localStorage,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}return BrowserLocalStorageManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a;return __generator(this,function(o){for(n=0,e={},t=rx+"/",r="/"+rS;n<this.LS.length;++n)(a=this.LS.key(n)).startsWith(t)&&a.endsWith(r)&&(e[function(e){var t=e.split("/");if(t.length<3)throw Error("Invalid key format: ".concat(e));return t.slice(1,t.length-1).join("/")}(a)]=JSON.parse(this.LS.getItem(a)));return[2,e]})})},BrowserLocalStorageManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){if(t=getModelKeys(e=e.startsWith(rE.URL_SCHEME)?e.slice(rE.URL_SCHEME.length):e),null==this.LS.getItem(t.info))throw Error("Cannot find model at path '".concat(e,"'"));return r=JSON.parse(this.LS.getItem(t.info)),removeItems(t),[2,r]})})},BrowserLocalStorageManager}(),rI=function(){function ModelStoreManagerRegistry(){this.managers={}}return ModelStoreManagerRegistry.getInstance=function(){return null==ModelStoreManagerRegistry.instance&&(ModelStoreManagerRegistry.instance=new ModelStoreManagerRegistry),ModelStoreManagerRegistry.instance},ModelStoreManagerRegistry.registerManager=function(e,t){assert(null!=e,function(){return"scheme must not be undefined or null."}),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),assert(e.length>0,function(){return"scheme must not be an empty string."});var r=ModelStoreManagerRegistry.getInstance();assert(null==r.managers[e],function(){return"A model store manager is already registered for scheme '".concat(e,"'.")}),r.managers[e]=t},ModelStoreManagerRegistry.getManager=function(e){var t=ModelStoreManagerRegistry.getInstance().managers[e];if(null==t)throw Error("Cannot find model manager for scheme '".concat(e,"'"));return t},ModelStoreManagerRegistry.getSchemes=function(){return Object.keys(ModelStoreManagerRegistry.getInstance().managers)},ModelStoreManagerRegistry}();function parseURL(e){if(-1===e.indexOf("://"))throw Error("The url string provided does not contain a scheme. Supported schemes are: "+"".concat(rI.getSchemes().join(",")));return{scheme:e.split("://")[0],path:e.split("://")[1]}}function cloneModelInternal(e,t,r){return void 0===r&&(r=!1),__awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d;return __generator(this,function(h){switch(h.label){case 0:return assert(e!==t,function(){return"Old path and new path are the same: '".concat(e,"'")}),assert((n=ry.getLoadHandlers(e)).length>0,function(){return"Copying failed because no load handler is found for source URL ".concat(e,".")}),assert(n.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"load handlers for source URL ".concat(e,".")}),a=n[0],assert((o=ry.getSaveHandlers(t)).length>0,function(){return"Copying failed because no save handler is found for destination "+"URL ".concat(t,".")}),assert(o.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"save handlers for destination URL ".concat(t,".")}),i=o[0],s=parseURL(e).scheme,u=parseURL(e).path,c=s===parseURL(e).scheme,[4,a.load()];case 1:if(l=h.sent(),!(r&&c))return[3,3];return[4,rI.getManager(s).removeModel(u)];case 2:h.sent(),h.label=3;case 3:return[4,i.save(l)];case 4:if(d=h.sent(),!(r&&!c))return[3,6];return[4,rI.getManager(s).removeModel(u)];case 5:h.sent(),h.label=6;case 6:return[2,d.modelArtifactsInfo]}})})}/**
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
 */var rN=function(){function PlatformBrowser(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}return PlatformBrowser.prototype.fetch=function(e,t){return fetch(e,t)},PlatformBrowser.prototype.now=function(){return performance.now()},PlatformBrowser.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Browser's encoder only supports utf-8, but got ".concat(t));return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)},PlatformBrowser.prototype.decode=function(e,t){return new TextDecoder(t).decode(e)},PlatformBrowser.prototype.setTimeoutCustom=function(e,t){var r=this;if("undefined"==typeof window||!env().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(function(){window.postMessage({name:r.messageName,index:r.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",function(e){e.source===window&&e.data.name===r.messageName&&(e.stopPropagation(),(0,r.functionRefs[e.data.index])(),r.handledMessageCount++,r.handledMessageCount===r.functionRefs.length&&(r.functionRefs=[],r.handledMessageCount=0))},!0))},PlatformBrowser.prototype.isTypedArray=function(e){return isTypedArrayBrowser(e)},PlatformBrowser}();if(env().get("IS_BROWSER")){env().setPlatform("browser",new rN);try{rI.registerManager(rE.URL_SCHEME,new rA)}catch(e){}try{rI.registerManager(rw.URL_SCHEME,new rk)}catch(e){}}/**
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
 */var rM={importFetch:function(){return r(81285)}},rD=function(){function PlatformNode(){this.util=r(73837),this.textEncoder=new this.util.TextEncoder}return PlatformNode.prototype.fetch=function(e,t){return null!=env().global.fetch?env().global.fetch(e,t):(null==c&&(c=rM.importFetch()),c(e,t))},PlatformNode.prototype.now=function(){var e=process.hrtime();return 1e3*e[0]+e[1]/1e6},PlatformNode.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Node built-in encoder only supports utf-8, but got ".concat(t));return this.textEncoder.encode(e)},PlatformNode.prototype.decode=function(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)},PlatformNode.prototype.isTypedArray=function(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)},PlatformNode}();/**
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
 */function(e,t){var r=convertToTensor(e,"x","cast");if(!isValidDtype(t))throw Error("Failed to cast to unknown dtype ".concat(t));if("string"===t&&"string"!==r.dtype||"string"!==t&&"string"===r.dtype)throw Error("Only strings can be casted to strings");return rd.runKernel(O,{x:r},{dtype:t})}}),rO=op({clone_:/**
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
 */function(e){var t=convertToTensor(e,"x","clone","string_or_numeric");return rd.runKernel(eg,{x:t})}});/**
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
 */getOrMakeEngine(),ro={buffer:buffer,cast:rR,clone:rO,print:print};var rP=op({add_:function(e,t){var r,n=convertToTensor(e,"a","add"),a=convertToTensor(t,"b","add"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Add",o)}}),rC=op({floorDiv_:function(e,t){var r,n=convertToTensor(e,"a","floorDiv"),a=convertToTensor(t,"b","floorDiv"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(el,o)}}),rB=op({div_:function(e,t){var r,n=convertToTensor(e,"a","div"),a=convertToTensor(t,"b","div");if(n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"int32"===n.dtype&&"int32"===a.dtype)return rC(n,a);var o={a:n,b:a};return rd.runKernel(er,o,{})}}),rF=op({mul_:function(e,t){var r,n=convertToTensor(e,"a","mul"),a=convertToTensor(t,"b","mul"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(eZ,o)}}),rZ=op({abs_:/**
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
 */function(e){var t=convertToTensor(e,"x","abs");if("complex64"===t.dtype){var r={x:t};return rd.runKernel(F,r)}var r={x:t};return rd.runKernel("Abs",r)}}),rz=op({acos_:/**
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
 */function(e){var t=convertToTensor(e,"x","acos");return rd.runKernel(g,{x:t})}}),rL=op({acosh_:/**
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
 */function(e){var t=convertToTensor(e,"x","acosh");return rd.runKernel(v,{x:t})}}),rG=op({addN_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","all","bool"),a={axis:t,keepDims:r};return rd.runKernel("All",{x:n},a)}}),rW=op({any_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","any","bool"),a={axis:t,keepDims:r};return rd.runKernel("Any",{x:n},a)}}),rK=op({argMax_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMax"),n={axis:t};return rd.runKernel(b,{x:r},n)}}),rj=op({argMin_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMin"),n={axis:t};return rd.runKernel(_,{x:r},n)}}),rV=op({asin_:/**
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
 */function(e){var t=convertToTensor(e,"x","asin");return rd.runKernel(T,{x:t})}}),rq=op({asinh_:/**
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
 */function(e){var t=convertToTensor(e,"x","asinh");return rd.runKernel(w,{x:t})}}),rH=op({atan_:/**
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
 */function(e){var t=convertToTensor(e,"x","atan");return rd.runKernel(k,{x:t})}}),r$=op({atan2_:function(e,t){var r,n=convertToTensor(e,"a","atan2"),a=convertToTensor(t,"b","atan2"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(S,o)}}),rJ=op({atanh_:/**
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
 */function(e){var t=convertToTensor(e,"x","atanh");return rd.runKernel(x,{x:t})}});function computePool2DInfo(e,t,r,n,a,o,i){void 0===i&&(i="channelsLast");var s,u=__read(parseTupleParam(t),2),c=u[0],l=u[1];if("channelsLast"===i)s=[c,l,e[3],e[3]];else if("channelsFirst"===i)s=[c,l,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv2DInfo(e,s,r,n,a,o,!1,i)}function computeConv2DInfo(e,t,r,n,a,o,i,s){void 0===i&&(i=!1),void 0===s&&(s="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1],4),h=d[0],p=d[1],f=d[2],m=d[3];if("channelsLast"===s)h=(u=__read(e,4))[0],p=u[1],f=u[2],m=u[3];else if("channelsFirst"===s)h=(c=__read(e,4))[0],m=c[1],p=c[2],f=c[3];else throw Error("Unknown dataFormat ".concat(s));var g=__read(t,4),v=g[0],y=g[1],b=g[3],_=__read(parseTupleParam(r),2),T=_[0],w=_[1],k=__read(parseTupleParam(n),2),x=k[0],S=k[1],E=getEffectiveFilterSize(v,x),A=getEffectiveFilterSize(y,S),I=function(e,t,r,n,a,o,i,s,u){if("number"==typeof e){var c,l,d,h,p,f,m,g=0===e?"VALID":"NUMBER";p={top:e,bottom:e,left:e,right:e,type:g};var v=(c=[t,r],null==(l=e)&&(l=computeDefaultPad(c,o,n)),d=c[0],h=c[1],[round$1((d-o+2*l)/n+1,s),round$1((h-o+2*l)/n+1,s)]);f=v[0],m=v[1]}else if("same"===e){var y=Math.max(0,((f=Math.ceil(t/n))-1)*n+o-t),b=Math.max(0,((m=Math.ceil(r/a))-1)*a+i-r),_=Math.floor(y/2),T=y-_,w=Math.floor(b/2),k=b-w;p={top:_,bottom:T,left:w,right:k,type:"SAME"}}else if("valid"===e)p={top:0,bottom:0,left:0,right:0,type:"VALID"},f=Math.ceil((t-o+1)/n),m=Math.ceil((r-i+1)/a);else if("object"==typeof e){var _="channelsLast"===u?e[1][0]:e[2][0],T="channelsLast"===u?e[1][1]:e[2][1],w="channelsLast"===u?e[2][0]:e[3][0],k="channelsLast"===u?e[2][1]:e[3][1],g=0===_&&0===T&&0===w&&0===k?"VALID":"EXPLICIT";p={top:_,bottom:T,left:w,right:k,type:g},f=round$1((t-o+_+T)/n+1,s),m=round$1((r-i+w+k)/a+1,s)}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:p,outHeight:f,outWidth:m}}(a,p,f,T,w,E,A,o,s),N=I.padInfo,M=I.outHeight,D=I.outWidth,R=i?b*m:b;return"channelsFirst"===s?l=[h,R,M,D]:"channelsLast"===s&&(l=[h,M,D,R]),{batchSize:h,dataFormat:s,inHeight:p,inWidth:f,inChannels:m,outHeight:M,outWidth:D,outChannels:R,padInfo:N,strideHeight:T,strideWidth:w,filterHeight:v,filterWidth:y,effectiveFilterHeight:E,effectiveFilterWidth:A,dilationHeight:x,dilationWidth:S,inShape:e,outShape:l,filterShape:t}}function computeConv3DInfo(e,t,r,n,a,o,i,s){void 0===o&&(o=!1),void 0===i&&(i="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1,-1],5),h=d[0],p=d[1],f=d[2],m=d[3],g=d[4];if("channelsLast"===i)h=(u=__read(e,5))[0],p=u[1],f=u[2],m=u[3],g=u[4];else if("channelsFirst"===i)h=(c=__read(e,5))[0],g=c[1],p=c[2],f=c[3],m=c[4];else throw Error("Unknown dataFormat ".concat(i));var v=__read(t,5),y=v[0],b=v[1],_=v[2],T=v[4],w=__read(parse3TupleParam(r),3),k=w[0],x=w[1],S=w[2],E=__read(parse3TupleParam(n),3),A=E[0],I=E[1],N=E[2],M=getEffectiveFilterSize(y,A),D=getEffectiveFilterSize(b,I),R=getEffectiveFilterSize(_,N),O=function(e,t,r,n,a,o,i,s,u,c,l){if("valid"===e&&(e=0),"number"==typeof e){var d,h,p,f,m=0===e?"VALID":"NUMBER";d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:m};var g=function(e,t,r,n,a,o){null==a&&(a=computeDefaultPad(e,t[0],n[0]));for(var i=[0,0,0,1],s=0;s<3;s++)e[s]+2*a>=t[s]&&(i[s]=round$1((e[s]-t[s]+2*a)/n[s]+1,o));return i}([t,r,n,1],[s,u,c],0,[a,o,i],e,l);h=g[0],p=g[1],f=g[2]}else if("same"===e){var v=((h=Math.ceil(t/a))-1)*a+s-t,y=((p=Math.ceil(r/o))-1)*o+u-r,b=((f=Math.ceil(n/i))-1)*i+c-n,_=Math.floor(v/2),T=Math.floor(y/2),w=Math.floor(b/2);d={top:T,bottom:y-T,left:w,right:b-w,front:_,back:v-_,type:"SAME"}}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:d,outDepth:h,outHeight:p,outWidth:f}}(a,p,f,m,k,x,S,M,D,R,s),P=O.padInfo,C=O.outDepth,B=O.outHeight,F=O.outWidth,Z=o?T*g:T;return"channelsFirst"===i?l=[h,Z,C,B,F]:"channelsLast"===i&&(l=[h,C,B,F,Z]),{batchSize:h,dataFormat:i,inDepth:p,inHeight:f,inWidth:m,inChannels:g,outDepth:C,outHeight:B,outWidth:F,outChannels:Z,padInfo:P,strideDepth:k,strideHeight:x,strideWidth:S,filterDepth:y,filterHeight:b,filterWidth:_,effectiveFilterDepth:M,effectiveFilterHeight:D,effectiveFilterWidth:R,dilationDepth:A,dilationHeight:I,dilationWidth:N,inShape:e,outShape:l,filterShape:t}}function computeDefaultPad(e,t,r,n){void 0===n&&(n=1);var a=getEffectiveFilterSize(t,n);return Math.floor((e[0]*(r-1)-r+a)/2)}function parseTupleParam(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function parse3TupleParam(e){return"number"==typeof e?[e,e,e]:e}function getEffectiveFilterSize(e,t){return t<=1?e:e+(e-1)*(t-1)}function round$1(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error("Unknown roundingMode ".concat(t))}}function tupleValuesAreOne(e){var t=__read(parseTupleParam(e),3),r=t[0],n=t[1],a=t[2];return 1===r&&1===n&&1===a}function eitherStridesOrDilationsAreOne(e,t){return tupleValuesAreOne(e)||tupleValuesAreOne(t)}function stridesOrDilationsArePositive(e){return parseTupleParam(e).every(function(e){return e>0})}function convertConv2DDataFormat(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error("Unknown dataFormat ".concat(e))}function checkPadOnDimRoundingMode(e,t,r){if(null!=r){if("string"==typeof t)throw Error("Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,"."));if("number"==typeof t)assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")});else if("object"==typeof t)t.forEach(function(t){t.forEach(function(t){assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")})})});else throw Error("Error in ".concat(e,": Unknown padding parameter: ").concat(t))}}var rY=op({reshape_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"x","avgPool","float32");assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in avgPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")});var i=o,s=!1;3===o.rank&&(s=!0,i=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),assert(4===i.rank,function(){return"Error in avgPool: x must be rank 4 but got rank ".concat(i.rank,".")}),checkPadOnDimRoundingMode("avgPool",n,a);var u={x:i},c=rd.runKernel(E,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:a});return(c=rR(c,o.dtype),s)?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),rQ=op({avgPool3d_:/**
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
 */function(e,t,r,n,a,o){void 0===o&&(o="NDHWC");var i=convertToTensor(e,"x","avgPool3d","float32"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in avgPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===o,function(){return"Error in avgPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(o)}),assert("number"==typeof r&&r>0||Array.isArray(r)&&r[0]>0&&r[1]>0&&r[2]>0,function(){return"Error in avgPool3d: Stride must be > 0, but got '".concat(r,"'")}),checkPadOnDimRoundingMode("avgPool3d",n,a);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:a,dataFormat:o},d=rd.runKernel(A,c,l);return(d=rR(d,s.dtype),u)?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),r0=op({concat_:/**
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
 */function(e,t){void 0===t&&(t=0),assert(e.length>=1,function(){return"Pass at least one tensor to concat"});var r=convertToTensorArray(e,"tensors","concat","string_or_numeric");if("complex64"===r[0].dtype&&r.forEach(function(e){if("complex64"!==e.dtype)throw Error("Cannot concatenate complex64 tensors with a tensor\n          with dtype ".concat(e.dtype,". "))}),1===r.length)return rO(r[0]);var n={axis:t};return rd.runKernel(Z,r,n)}}),r1=op({matMul_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a,o=convertToTensor(e,"a","matMul"),i=convertToTensor(t,"b","matMul"),s={a:o=(a=__read(makeTypesMatch(o,i),2))[0],b:i=a[1]},u={transposeA:r,transposeB:n};return rd.runKernel(I,s,u)}}),r2=op({sigmoid_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice","string_or_numeric");if(0===n.rank)throw Error("Slicing scalar is not possible");return rd.runKernel(ta,{x:n},{begin:t,size:r})}}),r4=op({tanh_:/**
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
 */function(e){var t=convertToTensor(e,"x","tanh","float32");return rd.runKernel(tx,{x:t})}}),r6=op({basicLSTMCell_:/**
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
 */function(e,t,r,n,a,o){var i=convertToTensor(e,"forgetBias","basicLSTMCell"),s=convertToTensor(t,"lstmKernel","basicLSTMCell"),u=convertToTensor(r,"lstmBias","basicLSTMCell"),c=convertToTensor(n,"data","basicLSTMCell"),l=convertToTensor(a,"c","basicLSTMCell"),d=rP(r1(r0([c,convertToTensor(o,"h","basicLSTMCell")],1),s),u),h=d.shape[0],p=d.shape[1]/4,f=[h,p],m=r3(d,[0,0],f),g=r3(d,[0,p],f),v=r3(d,[0,2*p],f),y=r3(d,[0,3*p],f),b=rP(rF(r2(m),r4(g)),rF(l,r2(rP(i,v)))),_=rF(r4(b),r2(y));return[b,_]}}),r5=op({batchToSpaceND_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","batchToSpaceND"),a=t.reduce(function(e,t){return e*t});return assert(n.rank>=1+t.length,function(){return"input rank is ".concat(n.rank," but should be > than blockShape.length ").concat(t.length)}),assert(r.length===t.length,function(){return"crops.length is ".concat(r.length," but should be equal to blockShape.length  ").concat(t.length)}),assert(n.shape[0]%a==0,function(){return"input tensor batch is ".concat(n.shape[0]," but is not divisible by the product of ")+"the elements of blockShape ".concat(t.join(" * ")," === ").concat(a)}),rd.runKernel(N,{x:n},{blockShape:t,crops:r})}}),r7=op({batchNorm_:/**
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
 */function(e,t,r,n,a,o){null==o&&(o=.001);var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(c.rank===l.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),assert(null==s||c.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),assert(null==i||c.rank===i.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."});var d={x:0===u.rank||1===u.rank?rY(u,[1,1,1,u.size]):2===u.rank?rY(u,[1,1,u.shape[0],u.shape[1]]):3===u.rank?rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]):u,scale:i,offset:s,mean:c,variance:l},h={varianceEpsilon:o};return rY(rd.runKernel(ed,d,h),u.shape)}}),r8=op({batchNorm2d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(2===u.rank,function(){return"Error in batchNorm2D: x must be rank 2 but got rank "+"".concat(u.rank,".")}),assert(2===c.rank||1===c.rank,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(2===l.rank||1===l.rank,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(2===i.rank||1===i.rank,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(2===s.rank||1===s.rank,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),r9=op({batchNorm3d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(3===u.rank,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+"".concat(u.rank,".")}),assert(3===c.rank||1===c.rank,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(3===l.rank||1===l.rank,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(3===i.rank||1===i.rank,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(3===s.rank||1===s.rank,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),ne=op({batchNorm4d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(4===u.rank,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+"".concat(u.rank,".")}),assert(4===c.rank||1===c.rank,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(4===l.rank||1===l.rank,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(4===i.rank||1===i.rank,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(4===s.rank||1===s.rank,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),nt=op({bincount_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","bincount"),a=convertToTensor(t,"weights","bincount");return assert("int32"===n.dtype,function(){return"Error in bincount: input "+"dtype must be int32, but got ".concat(n.dtype)}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(a.size===n.size||0===a.size,function(){return"Error in bincount: weights must have the same size as input or"+"0-length, but got input shape: ".concat(n.shape,", weights shape: ")+"".concat(a.shape,".")}),rd.runKernel(M,{x:n,weights:a},{size:r})}}),nr=op({bitwiseAnd_:/**
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
 */function(e,t){var r=convertToTensor(e,"s0","broadcastArgs","int32"),n=convertToTensor(t,"s1","broadcastArgs","int32");if(1!==r.rank)throw Error("broadcastArgs(): first input must be a vector (rank=1). "+"Has rank ".concat(r.rank));if(1!==n.rank)throw Error("broadcastArgs(): second input must be a vector (rank=1). "+"Has rank ".concat(n.rank));return rd.runKernel(R,{s0:r,s1:n})}}),na=op({broadcastTo_:/**
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
 */function(e,t){var r=convertToTensor(e,"broadcastTo","x"),n=r.shape;if(assertNonNegativeIntegerDimensions(t),t.length<r.rank)throw Error("broadcastTo(): shape.length=".concat(t.length," < input.rank=").concat(r.rank,"."));if(t.length>r.rank){for(var a=r.shape.slice();a.length<t.length;)a.unshift(1);r=rY(r,a)}for(var o=r.shape,i=Array.from(t),s=t.length-1;s>=0;s--)if(o[s]===t[s])i[s]=1;else if(1!==r.shape[s])throw Error("broadcastTo(): [".concat(n,"] cannot be broadcast to [").concat(t,"]."));if(0===i.map(function(e,t){return e>1?t:-1}).filter(function(e){return e>=0}).length)return rO(r);var u={x:r};return rd.runKernel(tS,u,{reps:i})}}),no=op({ceil_:/**
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
 */function(e){var t=convertToTensor(e,"x","ceil","float32");return rd.runKernel(P,{x:t})}});/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","clipByValue");return(assert(t<=r,function(){return"Error in clip: min (".concat(t,") must be ")+"less than or equal to max (".concat(r,").")}),t===r)?fill(n.shape,t,n.dtype):rd.runKernel(C,{x:n},{clipValueMin:t,clipValueMax:r})}}),ns=op({concat1d_:function(e){return r0(e,0)}}),nu=op({concat2d_:function(e,t){return r0(e,t)}}),nc=op({concat3d_:function(e,t){return r0(e,t)}}),nl=op({concat4d_:function(e,t){return r0(e,t)}}),nd=op({conv2d_:/**
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
 */function(e,t,r,n,a,o,i){void 0===a&&(a="NHWC"),void 0===o&&(o=[1,1]);var s=convertToTensor(e,"x","conv2d","float32"),u=convertToTensor(t,"filter","conv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in conv2d: input must be rank 4, but got rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in conv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv2d",n,i);var d="NHWC"===a?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in conv2d: depth of input (".concat(d,") must match ")+"input depth for filter ".concat(u.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(o,"'")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv2D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv2D: Strides should be larger than 0."});var h={x:c,filter:u},p={strides:r,pad:n,dataFormat:a,dilations:o,dimRoundingMode:i},f=rd.runKernel(z,h,p);return l?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nh=op({conv1d_:function(e,t,r,n,a,o,i){void 0===a&&(a="NWC"),void 0===o&&(o=1);var s=convertToTensor(e,"x","conv1d"),u=convertToTensor(t,"filter","conv1d"),c=s,l=!1;2===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1]])),assert(3===c.rank,function(){return"Error in conv1d: input must be rank 3, but got rank ".concat(c.rank,".")}),assert(3===u.rank,function(){return"Error in conv1d: filter must be rank 3, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv1d",n,i),assert(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input (".concat(c.shape[2],") must match ")+"input depth for filter ".concat(u.shape[1],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv1D: Either stride or dilation must be 1. "+"Got stride ".concat(r," and dilation '").concat(o,"'")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv1D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv1D: Stride should be larger than 0."}),assert("NWC"===a,function(){return"Error in conv1d: got dataFormat of ".concat(a," but only NWC is currently supported.")});var d=rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]),h=nd(rY(c,[c.shape[0],1,c.shape[1],c.shape[2]]),d,[1,r],n,"NHWC",[1,o],i);return l?rY(h,[h.shape[2],h.shape[3]]):rY(h,[h.shape[0],h.shape[2],h.shape[3]])}}),np=op({conv2DBackpropInput_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o="NHWC"),assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var s=e,u=t,c=!1;3===t.rank&&(c=!0,u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),assert(4===s.length,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+"".concat(s.length,".")}),assert(4===u.rank,function(){return"Error in conv2dDerInput: dy must be rank 4, but got "+"rank ".concat(u.rank)}),assert(4===r.rank,function(){return"Error in conv2dDerInput: filter must be rank 4, but got "+"rank ".concat(r.rank)});var l="NHWC"===o?s[3]:s[1],d="NHWC"===o?u.shape[3]:u.shape[1];assert(l===r.shape[2],function(){return"Error in conv2dDerInput: depth of input (".concat(l,") must ")+"match input depth for filter ".concat(r.shape[2],".")}),assert(d===r.shape[3],function(){return"Error in conv2dDerInput: depth of output (".concat(d,") must ")+"match output depth for filter ".concat(r.shape[3],".")}),checkPadOnDimRoundingMode("conv2dDerInput",a,i);var h={dy:u,filter:r},p={strides:n,pad:a,dataFormat:o,dimRoundingMode:i,inputShape:s},f=rd.runKernel(G,h,p);return c?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nf=op({conv2dTranspose_:function(e,t,r,n,a,o){return np(r,convertToTensor(e,"x","conv2dTranspose"),convertToTensor(t,"filter","conv2dTranspose"),n,a,"NHWC",o)}}),nm=op({conv3d_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a="NDHWC"),void 0===o&&(o=[1,1,1]);var i=convertToTensor(e,"x","conv3d"),s=convertToTensor(t,"filter","conv3d"),u=i,c=!1;4===i.rank&&(c=!0,u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===u.rank,function(){return"Error in conv3d: input must be rank 5, but got rank ".concat(u.rank,".")}),assert(5===s.rank,function(){return"Error in conv3d: filter must be rank 5, but got rank "+"".concat(s.rank,".")}),assert(u.shape[4]===s.shape[3],function(){return"Error in conv3d: depth of input (".concat(u.shape[4],") must match ")+"input depth for filter ".concat(s.shape[3],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv3D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(o,"'")}),assert("NDHWC"===a,function(){return"Error in conv3d: got dataFormat of ".concat(a," but only NDHWC is currently supported.")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv3D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv3D: Strides should be larger than 0."});var l={x:u,filter:s},d={strides:r,pad:n,dataFormat:a,dilations:o},h=rd.runKernel(U,l,d);return c?rY(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}}),ng=op({conv3DBackpropInput_:/**
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
 */function(e,t,r,n,a){assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var o=e,i=t,s=!1;4===t.rank&&(s=!0,i=rY(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),o=[1,e[0],e[1],e[2],e[3]]);var u=o[4],c=i.shape[4];assert(5===o.length,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+"".concat(o.length,".")}),assert(5===i.rank,function(){return"Error in conv3dDerInput: dy must be rank 5, but got "+"rank ".concat(i.rank)}),assert(5===r.rank,function(){return"Error in conv3dDerInput: filter must be rank 5, but got "+"rank ".concat(r.rank)}),assert(u===r.shape[3],function(){return"Error in conv3dDerInput: depth of input (".concat(u,") must ")+"match input depth for filter ".concat(r.shape[3],".")}),assert(c===r.shape[4],function(){return"Error in conv3dDerInput: depth of output (".concat(c,") must ")+"match output depth for filter ".concat(r.shape[4],".")});var l={dy:i,filter:r},d={pad:a,strides:n,inputShape:o},h=rd.runKernel(W,l,d);return s?rY(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}}),nv=op({conv3dTranspose_:function(e,t,r,n,a){return ng(r,convertToTensor(e,"x","conv3dTranspose"),convertToTensor(t,"filter","conv3dTranspose"),n,a)}}),ny=op({cos_:/**
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
 */function(e){var t=convertToTensor(e,"x","cosh","float32");return rd.runKernel(K,{x:t})}}),n_=op({cumprod_:/**
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
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"x","cumprod"),o={axis:t,exclusive:r,reverse:n};return rd.runKernel(j,{x:a},o)}}),nT=op({cumsum_:/**
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
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"x","cumsum"),o={axis:t,exclusive:r,reverse:n};return rd.runKernel(V,{x:a},o)}}),nw=op({denseBincount_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!1);var a=convertToTensor(e,"x","denseBincount"),o=convertToTensor(t,"weights","denseBincount");assert("int32"===a.dtype,function(){return"Error in denseBincount: input "+"dtype must be int32, but got ".concat(a.dtype)}),assert(a.rank<=2,function(){return"Error in denseBincount: input must be at most rank 2, but got "+"rank ".concat(a.rank,".")}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(o.size===a.size||0===o.size,function(){return"Error in denseBincount: weights must have the same shape as x or "+"0-length, but got x shape: ".concat(a.shape,", weights shape: ")+"".concat(o.shape,".")});var i={size:r,binaryOutput:n};return rd.runKernel(H,{x:a,weights:o},i)}}),nk=op({depthToSpace_:/**
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
 */function(e,t,r){void 0===r&&(r="NHWC");var n=convertToTensor(e,"x","depthToSpace","float32"),a="NHWC"===r?n.shape[1]:n.shape[2],o="NHWC"===r?n.shape[2]:n.shape[3],i="NHWC"===r?n.shape[3]:n.shape[1];assert(t>1,function(){return"blockSize should be > 1 for depthToSpace, but was: ".concat(t)}),assert(a*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(a," and ").concat(t,"  for depthToSpace with input shape\n    ").concat(n.shape)}),assert(o*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(o," and ").concat(t," for depthToSpace with input shape\n        ").concat(n.shape)}),assert(i%(t*t)==0,function(){return"Dimension size must be evenly divisible by ".concat(t*t," but is ").concat(i," for depthToSpace with input shape ").concat(n.shape)});var s={blockSize:t,dataFormat:r};return rd.runKernel($,{x:n},s)}}),nx=op({depthwiseConv2d_:/**
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
 */function(e,t,r,n,a,o,i){void 0===a&&(a="NHWC"),void 0===o&&(o=[1,1]);var s=convertToTensor(e,"x","depthwiseConv2d","float32"),u=convertToTensor(t,"filter","depthwiseConv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")});var d="NHWC"===a?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels "+"(".concat(d,") must match the inChannels dimension in ")+"filter ".concat(u.shape[2],".")}),checkPadOnDimRoundingMode("depthwiseConv2d",n,i);var h={x:c,filter:u},p={strides:r,pad:n,dataFormat:a,dilations:o,dimRoundingMode:i},f=rd.runKernel(J,h,p);return l?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),nS=op({diag_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a=[1,1]),void 0===o&&(o="NHWC");var i=convertToTensor(e,"x","dilation2d"),s=convertToTensor(t,"filter","dilation2d");assert(3===i.rank||4===i.rank,function(){return"Error in dilation2d: input must be rank 3 or 4, but got rank "+"".concat(i.rank,".")}),assert(3===s.rank,function(){return"Error in dilation2d: filter must be rank 3, but got rank "+"".concat(s.rank,".")}),assert("NHWC"===o,function(){return"Error in dilation2d: Only NHWC is currently supported, "+"but got dataFormat of ".concat(o)});var u=i,c=!1;3===i.rank&&(u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),assert(u.shape[3]===s.shape[2],function(){return"Error in dilation2d:  input and filter must have the same depth: ".concat(u.shape[3]," vs ").concat(s.shape[2])});var l={x:u,filter:s},d={strides:r,pad:n,dilations:a},h=rd.runKernel(ee,l,d);return c?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});/**
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
 */function getBroadcastDims(e,t){for(var r=e.length,n=[],a=0;a<r;a++){var o=r-1-a,i=e[o]||1;(t[t.length-1-a]||1)>1&&1===i&&n.unshift(o)}return n}function getReductionAxes(e,t){for(var r=[],n=0;n<t.length;n++){var a=e[e.length-n-1],o=t.length-n-1,i=t[o];(null==a||1===a&&i>1)&&r.unshift(o)}return r}function assertAndGetBroadcastShape(e,t){for(var r=Math.max(e.length,t.length),n=Array(r),a=0;a<r;a++){var o=e[e.length-a-1];null==o&&(o=1);var i=t[t.length-a-1];if(null==i&&(i=1),1===o)n[r-a-1]=i;else if(1===i)n[r-a-1]=o;else if(o!==i)throw Error("Operands could not be broadcast together with shapes "+"".concat(e," and ").concat(t,"."));else n[r-a-1]=o}return n}var nA=op({equal_:function(e,t){var r,n=convertToTensor(e,"a","equal","string_or_numeric"),a=convertToTensor(t,"b","equal","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ea,o)}}),nI=op({where_:/**
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
 */function(e,t,r){var n=convertToTensor(t,"a","where"),a=convertToTensor(r,"b","where"),o=convertToTensor(e,"condition","where","bool"),i=assertAndGetBroadcastShape(assertAndGetBroadcastShape(o.shape,n.shape),a.shape),s=na(o,i),u=na(n,i),c=na(a,i);return rd.runKernel(tr,{condition:s,t:u,e:c})}}),nN=op({zerosLike_:/**
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
 */function(e){var t=convertToTensor(e,"x","zerosLike");return rd.runKernel(tR,{x:t})}}),nM=op({divNoNan_:function(e,t){var r,n=convertToTensor(e,"a","div"),a=convertToTensor(t,"b","div"),o=rB(n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1]),i=nN(o);return nI(nA(a,i),i,o)}}),nD=op({dot_:/**
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
 */function(e,t){var r=convertToTensor(e,"t1","dot"),n=convertToTensor(t,"t2","dot");assert((1===r.rank||2===r.rank)&&(1===n.rank||2===n.rank),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")});var a=1===r.rank?r.size:r.shape[1],o=1===n.rank?n.size:n.shape[0];if(assert(a===o,function(){return"Error in dot: inner dimensions of inputs must match, but got "+"".concat(a," and ").concat(o,".")}),1===r.rank&&1===n.rank){var i=rY(r,[1,-1]),s=rY(n,[-1,1]),u=r1(i,s);return rY(u,[])}if(1===r.rank&&2===n.rank){var i=rY(r,[1,-1]),s=rY(n,[n.shape[0],n.shape[1]]),u=r1(i,s);return rY(u,[u.size])}if(2===r.rank&&1===n.rank){var s=rY(n,[-1,1]),u=r1(r,s);return rY(u,[u.size])}var s=rY(n,[n.shape[0],n.shape[1]]),u=r1(r,s);return u}}),nR=op({einsum_:/**
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
 */function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"einsum")});return rd.runKernel(en,n,{equation:e})}}),nO=op({elu_:/**
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
 */function(e){var t=convertToTensor(e,"x","elu","float32");return rd.runKernel("Elu",{x:t})}}),nP=op({ensureShape_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","ensureShape","string_or_numeric");if(!arraysEqualWithNull(r.shape,t))throw Error("EnsureShape: Shape of tensor ".concat(r.shape," is not compatible with expected shape ").concat(t));return e}}),nC=op({erf_:/**
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
 */function axesAreInnerMostDims(e,t){for(var r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0}function combineLocations(e,t,r){for(var n=e.length+t.length,a=[],o=0,i=0,s=0;s<n;s++)-1===r.indexOf(s)?a.push(e[o++]):a.push(t[i++]);return a}function expandShapeToKeepDim(e,t){return combineLocations(e,t.map(function(e){return 1}),t)}var nB=op({max_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","max"),a={reductionIndices:t,keepDims:r};return rd.runKernel("Max",{x:n},a)}}),nF=op({min_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","min"),a={axis:t,keepDims:r};return rd.runKernel("Min",{x:n},a)}}),nZ=op({pow_:function(e,t){var r,n=convertToTensor(e,"base","pow"),a=convertToTensor(t,"exp","pow"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Pow",o)}});/**
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
 */function scalar(e,t){if((isTypedArray(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&isTypedArray(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return makeTensor(e,[],[],t)}var nz=op({sqrt_:/**
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
 */function(e){var t=convertToTensor(e,"x","sqrt","float32");return rd.runKernel(tc,{x:t})}}),nL=op({square_:/**
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
 */function(e){var t=convertToTensor(e,"x","square");return rd.runKernel("Square",{x:t},{})}}),nG=op({sum_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","sum");"bool"===n.dtype&&(n=rR(n,"int32"));var a={x:n},o={axis:t,keepDims:r};return rd.runKernel("Sum",a,o)}}),nU=op({norm_:/**
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
 */function(e,t,r,n){void 0===t&&(t="euclidean"),void 0===r&&(r=null),void 0===n&&(n=!1);var a=function normImpl(e,t,r){if(void 0===r&&(r=null),0===e.rank)return rZ(e);if(1!==e.rank&&null===r)return normImpl(rY(e,[-1]),t,r);if(1===e.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===t)return nG(rZ(e),r);if(t===1/0)return nB(rZ(e),r);if(t===-1/0)return nF(rZ(e),r);if("euclidean"===t||2===t)return nz(nG(nZ(rZ(e),scalar(2,"int32")),r));throw Error("Error in norm: invalid ord value: ".concat(t))}if(Array.isArray(r)&&2===r.length){if(1===t)return nB(nG(rZ(e),r[0]),r[1]-1);if(t===1/0)return nB(nG(rZ(e),r[1]),r[0]);if(t===-1/0)return nF(nG(rZ(e),r[1]),r[0]);if("fro"===t||"euclidean"===t)return nz(nG(nL(e),r));throw Error("Error in norm: invalid ord value: ".concat(t))}throw Error("Error in norm: invalid axis: ".concat(r))}(e=convertToTensor(e,"x","norm"),t,r),o=a.shape;if(n){var i=parseAxisParam(r,e.shape);o=expandShapeToKeepDim(a.shape,i)}return rY(a,o)}}),nW=op({euclideanNorm_:/**
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
 */function(e,t,r){return void 0===t&&(t=null),void 0===r&&(r=!1),nU(e,"euclidean",t,r)}}),nK=op({exp_:/**
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
 */function(e){var t=convertToTensor(e,"x","exp");return rd.runKernel("Exp",{x:t})}}),nj=op({expandDims_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","expandDims","string_or_numeric");assert(t<=r.rank,function(){return"Axis must be <= rank of the tensor"});var n={dim:t};return rd.runKernel(eo,{input:r},n)}}),nV=op({expm1_:/**
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
 */function(e){var t=convertToTensor(e,"x","expm1");return rd.runKernel(ei,{x:t})}}),nq=op({tile_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","tile","string_or_numeric");return assert(r.rank===t.length,function(){return"Error in transpose: rank of input ".concat(r.rank," ")+"must match length of reps ".concat(t,".")}),rd.runKernel(tS,{x:r},{reps:t})}}),nH=op({eye_:/**
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
 */function(e,t,r,n){void 0===n&&(n="float32"),null==t&&(t=e);for(var a=buffer([e,t],n),o=e<=t?e:t,i=0;i<o;++i)a.set(1,i,i);var s=rY(a.toTensor(),[e,t]);if(null==r)return s;if(1===r.length)return nq(nj(s,0),[r[0],1,1]);if(2===r.length)return nq(nj(nj(s,0),0),[r[0],r[1],1,1]);if(3===r.length)return nq(nj(nj(nj(s,0),0),0),[r[0],r[1],r[2],1,1]);throw Error("eye() currently supports only 1D and 2D "+"batchShapes, but received ".concat(r.length,"D."))}}),n$=op({floor_:/**
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
 */function(e){var t=convertToTensor(e,"x","floor","float32");return rd.runKernel(ec,{x:t})}}),nJ=op({gather_:/**
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
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=0);var a=convertToTensor(e,"x","gather"),o=convertToTensor(t,"indices","gather","int32"),i={axis:r,batchDims:n};return rd.runKernel(eh,{x:a,indices:o},i)}}),nY=op({greater_:function(e,t){var r,n=convertToTensor(e,"a","greater","string_or_numeric"),a=convertToTensor(t,"b","greater","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ef,o)}}),nX=op({greaterEqual_:function(e,t){var r,n=convertToTensor(e,"a","greaterEqual","string_or_numeric"),a=convertToTensor(t,"b","greaterEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(em,o)}}),nQ=op({imag_:/**
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
 */function(e){var t=convertToTensor(e,"x","isInf");return rd.runKernel(e_,{x:t})}}),n2=op({isNaN_:/**
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
 */function(e){var t=convertToTensor(e,"x","isNaN");return rd.runKernel(eT,{x:t})}}),n3=op({leakyRelu_:/**
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
 */function(e,t){void 0===t&&(t=.2);var r=convertToTensor(e,"x","leakyRelu"),n={alpha:t};return rd.runKernel(ew,{x:r},n)}}),n4=op({less_:function(e,t){var r,n=convertToTensor(e,"a","less","string_or_numeric"),a=convertToTensor(t,"b","less","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ek,o)}}),n6=op({lessEqual_:function(e,t){var r,n=convertToTensor(e,"a","lessEqual","string_or_numeric"),a=convertToTensor(t,"b","lessEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ex,o)}}),n5=op({localResponseNormalization_:/**
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
 */function(e,t,r,n,a){void 0===t&&(t=5),void 0===r&&(r=1),void 0===n&&(n=1),void 0===a&&(a=.5);var o=convertToTensor(e,"x","localResponseNormalization");assert(4===o.rank||3===o.rank,function(){return"Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank ".concat(o.rank,".")}),assert(isInt(t),function(){return"Error in localResponseNormalization: depthRadius must be an "+"integer but got depthRadius ".concat(t,".")});var i=o,s=!1;3===o.rank&&(s=!0,i=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]]));var u={x:i},c={depthRadius:t,bias:r,alpha:n,beta:a},l=rd.runKernel("LRN",u,c);return s?rY(l,[l.shape[1],l.shape[2],l.shape[3]]):l}}),n7=op({log_:/**
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
 */function(e){var t=convertToTensor(e,"x","log","float32");return rd.runKernel("Log",{x:t})}}),n8=op({log1p_:/**
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
 */function(e){var t=convertToTensor(e,"x","log1p");return rd.runKernel(eE,{x:t})}});function variableGrads(e,t){assert(isFunction(e),function(){return"The f passed in variableGrads(f) must be a function"}),assert(null==t||Array.isArray(t)&&t.every(function(e){return e instanceof rs}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var r=null!=t;if(!r)for(var n in t=[],rd.registeredVariables)t.push(rd.registeredVariables[n]);var a=r?t.filter(function(e){return!e.trainable}):null,o=t.length;assert((t=t.filter(function(e){return e.trainable})).length>0,function(){return"variableGrads() expects at least one of the input variables to "+"be trainable, but none of the ".concat(o," variables is ")+"trainable."});var i=rd.gradients(e,t,null,!0),s=i.value,u=i.grads;assert(u.some(function(e){return null!=e}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),assert(0===s.rank,function(){return"The f passed in variableGrads(f) must return a scalar, but it "+"returned a rank-".concat(s.rank," tensor")});var c={};return t.forEach(function(e,t){null!=u[t]&&(c[e.name]=u[t])}),null!=a&&a.forEach(function(e){return c[e.name]=null}),{value:s,grads:c}}function customGrad(e){return rd.customGrad(e)}function checkGrads(e){if(e.filter(function(e){return null==e}).length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")}var n9=op({neg_:/**
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
 */function(e){var t=convertToTensor(e,"x","neg");return rd.runKernel("Neg",{x:t})}}),ae=op({softplus_:/**
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
 */function(e){var t=convertToTensor(e,"x","softplus");return rd.runKernel(tu,{x:t})}}),at=op({logSigmoid_:/**
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
 */function(e){var t=convertToTensor(e,"x","logSigmoid");return customGrad(function(e){return{value:n9(ae(n9(e))),gradFunc:function(t){return rF(t,r2(n9(e)))}}})(t)}}),ar=op({sub_:function(e,t){var r,n=convertToTensor(e,"a","sub"),a=convertToTensor(t,"b","sub"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Sub",o)}}),an=op({logSoftmax_:function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","logSoftmax");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and axis was ").concat(t));return customGrad(function(e,r){var n=nB(e,t,!0),a=ar(e,n),o=ar(rR(a,"float32"),n7(nG(nK(a),t,!0)));return r([o]),{value:o,gradFunc:function(e,r){var n=nK(__read(r,1)[0]);return ar(e,rF(nG(e,t,!0),n))}}})(r)}}),aa=op({logSumExp_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","logSumExp"),a=parseAxisParam(t,n.shape),o=nB(n,a,!0),i=n7(nG(nK(ar(n,o)),a)),s=rP(rY(o,i.shape),i);if(r){var u=expandShapeToKeepDim(s.shape,a);return rY(s,u)}return s}}),ao=op({logicalAnd_:/**
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
 */function(e,t){var r=convertToTensor(e,"a","logicalAnd","bool"),n=convertToTensor(t,"b","logicalAnd","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(eA,{a:r,b:n})}}),ai=op({logicalNot_:/**
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
 */function(e){var t=convertToTensor(e,"x","logicalNot","bool");return rd.runKernel(eI,{x:t})}}),as=op({logicalOr_:/**
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
 */function(e,t){var r=convertToTensor(e,"a","logicalOr","bool"),n=convertToTensor(t,"b","logicalOr","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(eN,{a:r,b:n})}}),au=op({logicalXor_:/**
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
 */function(e,t){var r=convertToTensor(e,"a","logicalXor","bool"),n=convertToTensor(t,"b","logicalXor","bool");return assertAndGetBroadcastShape(r.shape,n.shape),ao(as(e,t),ai(ao(e,t)))}}),ac=op({searchSorted_:function(e,t,r){void 0===r&&(r="left");var n=convertToTensor(e,"sortedSequence","searchSorted"),a=convertToTensor(t,"values","searchSorted"),o=n.shape[n.shape.length-1],i=a.shape[a.shape.length-1],s=rY(n,[-1,o]),u=rY(a,[-1,i]);if(s.rank<2)throw Error("Sorted input argument must be at least 2-dimensional");if(s.shape[0]!==u.shape[0])throw Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(sizeFromShape(u.shape)>=2147483648)throw Error("values tensor size must less than ".concat(2147483648));if(s.shape[1]>=2147483648)throw Error("trailing dim_size must less than ".concat(2147483648," for int32 output type, was ").concat(s.shape[1]));var c={side:r};return rd.runKernel(tt,{sortedSequence:s,values:u},c)}}),al=op({maxPool_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"x","maxPool"),i=o,s=!1;3===o.rank&&(s=!0,i=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),assert(4===i.rank,function(){return"Error in maxPool: input must be rank 4 but got rank ".concat(i.rank,".")}),assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in maxPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")}),checkPadOnDimRoundingMode("maxPool",n,a);var u={x:i},c=rd.runKernel(eD,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:a});return s?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),ad=op({maxPool3d_:/**
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
 */function(e,t,r,n,a,o){void 0===t&&(t=[1,1,1]),void 0===o&&(o="NDHWC");var i=convertToTensor(e,"x","maxPool3d"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in maxPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===o,function(){return"Error in maxPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(o)}),checkPadOnDimRoundingMode("maxPool3d",n,a);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:a,dataFormat:o},d=rd.runKernel(eR,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),ah=op({maxPoolWithArgmax_:/**
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
 */function(e,t,r,n,a){void 0===a&&(a=!1);var o=convertToTensor(e,"x","maxPoolWithArgmax"),i={filterSize:t,strides:r,pad:n,includeBatchInIndex:a},s=rd.runKernel(eO,{x:o},i);return{result:s[0],indexes:s[1]}}}),ap=op({maximum_:function(e,t){var r,n=convertToTensor(e,"a","maximum"),a=convertToTensor(t,"b","maximum");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"bool"===n.dtype&&(n=rR(n,"int32"),a=rR(a,"int32")),assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eM,o)}}),af=op({mean_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","mean"),a={axis:t,keepDims:r};return rd.runKernel(eP,{x:n},a)}});/**
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
 */function ones(e,t){if(void 0===t&&(t="float32"),assertNonNegativeIntegerDimensions(e),"complex64"===t)return rf(ones(e,"float32"),zeros(e,"float32"));var r=makeOnesTypedArray(sizeFromShape(e),t);return rd.makeTensor(r,e,t)}var am=op({minimum_:function(e,t){var r,n=convertToTensor(e,"a","minimum"),a=convertToTensor(t,"b","minimum");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"bool"===n.dtype&&(n=rR(n,"int32"),a=rR(a,"int32")),assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eC,o)}}),ag=op({mirrorPad_:/**
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
 */function(e,t,r){assert("reflect"===r||"symmetric"===r,function(){return"Invalid mode. Mode must be either reflect or symmetric. "+"Got ".concat(r,".")});var n=convertToTensor(e,"x","mirrorPad");if(0===n.rank)throw Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");assert(t.length===n.rank,function(){return"Padding doesn't match input. Must be ".concat(n.rank,". ")+"Got ".concat(t.length,".")});for(var a="reflect"===r?1:0,_loop_1=function(e){assert(2===t[e].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),assert(t[e][0]>=0&&t[e][0]<=n.shape[e]-a&&t[e][1]>=0&&t[e][1]<=n.shape[e]-a,function(){return"Padding in dimension ".concat(e," cannot be greater than or equal ")+"to ".concat(n.shape[e]-a," or less than 0 for input of ")+"shape ".concat(n.shape)})},o=0;o<n.rank;o++)_loop_1(o);return rd.runKernel(eB,{x:n},{paddings:t,mode:r})}}),av=op({mod_:function(e,t){var r,n=convertToTensor(e,"a","mod"),a=convertToTensor(t,"b","mod"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Mod",o)}}),ay=op({moments_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=parseAxisParam(t,(e=convertToTensor(e,"x","moments")).shape),a=af(e,n,r),o=a.shape;r||(o=expandShapeToKeepDim(a.shape,n));var i=af(nL(ar(rR(e,"float32"),rY(a,o))),n,r);return{mean:a,variance:i}}}),ab=op({multiRNNCell_:function(e,t,r,n){for(var a=convertToTensor(t,"data","multiRNNCell"),o=convertToTensorArray(r,"c","multiRNNCell"),i=convertToTensorArray(n,"h","multiRNNCell"),s=a,u=[],c=0;c<e.length;c++){var l=e[c](s,o[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}for(var d=[],h=[],c=0;c<u.length;c+=2)d.push(u[c]),h.push(u[c+1]);return[d,h]}}),a_=op({multinomial_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!1);var a=convertToTensor(e,"logits","multinomial"),o=a.size,i=a.rank;if(o<2)throw Error("Error in multinomial: you need at least 2 outcomes, but got "+"".concat(o,"."));if(i>2)throw Error("Rank of probabilities must be 1 or 2, but is ".concat(i));r=r||Math.random();var s=1===i?rY(a,[1,-1]):a,u={numSamples:t,seed:r,normalized:n},c=rd.runKernel(eF,{logits:s},u);return 1===i?rY(c,[c.size]):c}}),aT=op({notEqual_:function(e,t){var r,n=convertToTensor(e,"a","notEqual","string_or_numeric"),a=convertToTensor(t,"b","notEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ez,o)}}),aw=op({oneHot_:/**
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
 */function(e,t,r,n,a){if(void 0===r&&(r=1),void 0===n&&(n=0),void 0===a&&(a="int32"),t<2)throw Error("Error in oneHot: depth must be >=2, but it is ".concat(t));var o=convertToTensor(e,"indices","oneHot","int32"),i={dtype:a,depth:t,onValue:r,offValue:n};return rd.runKernel(eK,{indices:o},i)}}),ak=op({onesLike_:/**
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
 */function(e){var t=convertToTensor(e,"x","onesLike");return rd.runKernel(eW,{x:t})}}),ax=op({outerProduct_:function(e,t){var r=convertToTensor(e,"v1","outerProduct"),n=convertToTensor(t,"v2","outerProduct");return assert(1===r.rank&&1===n.rank,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")}),r1(rY(r,[-1,1]),rY(n,[1,-1]))}}),aS=op({pad_:/**
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
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","pad");if(0===n.rank)throw Error("pad(scalar) is not defined. Pass non-scalar to pad");var a={paddings:t,constantValue:r};return rd.runKernel(eV,{x:n},a)}}),aE=op({pad1d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length,function(){return"Invalid number of paddings. Must be length of 2."}),aS(e,[t],r)}}),aA=op({pad2d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length&&2===t[0].length&&2===t[1].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aS(e,t,r)}}),aI=op({pad3d_:function(e,t,r){return void 0===r&&(r=0),assert(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aS(e,t,r)}}),aN=op({pad4d_:function(e,t,r){return void 0===r&&(r=0),assert(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aS(e,t,r)}}),aM=op({spaceToBatchND_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","spaceToBatchND");return assert(n.rank>=1+t.length,function(){return"input rank ".concat(n.rank," should be > than [blockShape] ").concat(t.length)}),assert(r.length===t.length,function(){return"paddings.shape[0] ".concat(r.length," must be equal to [blockShape] ").concat(t.length)}),assert(n.shape.reduce(function(e,n,a){return a>0&&a<=t.length?e&&(n+r[a-1][0]+r[a-1][1])%t[a-1]==0:e},!0),function(){return"input spatial dimensions ".concat(n.shape.slice(1)," with paddings ").concat(r.toString()," must be divisible by blockShapes ").concat(t.toString())}),rd.runKernel(tl,{x:n},{blockShape:t,paddings:r})}}),aD=op({pool_:function(e,t,r,n,a,o,i){null==a&&(a=[1,1]),null==o&&(o=1),0===n&&(n="valid");var s,u,c,l,d,h,p,f,m,g,v=convertToTensor(e,"x","maxPool"),y=v,b=!1;3===v.rank&&(b=!0,y=rY(v,[1,v.shape[0],v.shape[1],v.shape[2]])),assert(eitherStridesOrDilationsAreOne(o,a),function(){return"Error in pool: Either strides or dilations must be 1. "+"Got strides ".concat(o," and dilations '").concat(a,"'")});var _=computePool2DInfo(y.shape,t,o,a,n),T=[_.dilationHeight,_.dilationWidth];g="same"===n?(u=(s=[_.filterHeight,_.filterWidth].map(function(e,t){return e+(e-1)*(T[t]-1)}).map(function(e){return e-1})).map(function(e){return Math.floor(e/2)}),c=s.map(function(e,t){return e-u[t]}),s.map(function(e,t){return[u[t],c[t]]})):[[0,0],[0,0]];var w=1===T[0]&&1===T[1],k=__read((l=[_.inHeight,_.inWidth],d=g.map(function(e){return e[0]}),p=l.concat(d,h=g.map(function(e){return e[1]})),f=T.map(function(e,t){return(e-p[t]%e)%e}),m=h.map(function(e,t){return e+f[t]}),[T.map(function(e,t){return[d[t],m[t]]}),T.map(function(e,t){return[0,f[t]]})]),2),x=k[0],S=k[1],E=w?n:"valid",A=w?y:aM(y,T,x),I=("avg"===r?function(){return rX(A,t,o,E,i)}:function(){return al(A,t,o,E,i)})(),N=w?I:r5(I,T,S);return b?rY(N,[N.shape[1],N.shape[2],N.shape[3]]):N}}),aR=op({prelu_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","prelu"),n=convertToTensor(t,"alpha","prelu");return rd.runKernel(eq,{x:r,alpha:n})}}),aO=op({prod_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","prod");"bool"===n.dtype&&(n=rR(n,"int32"));var a={x:n},o={axis:t,keepDims:r};return rd.runKernel(eH,a,o)}}),aP=op({raggedGather_:/**
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
 */function(e,t,r,n){var a=e.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedGather","int32")}),o=convertToTensor(t,"paramsDenseValues","raggedGather"),i=convertToTensor(r,"indices","raggedGather","int32"),s=rd.runKernel(e$,{paramsNestedSplits:a,paramsDenseValues:o,indices:i},{outputRaggedRank:n});return{outputNestedSplits:s.slice(0,s.length-1),outputDenseValues:s[s.length-1]}}}),aC=op({raggedRange_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"starts","raggedRange"),a=convertToTensor(t,"limits","raggedRange",n.dtype),o=convertToTensor(r,"deltas","raggedRange",n.dtype),i=rd.runKernel(eJ,{starts:n,limits:a,deltas:o});return{rtNestedSplits:i[0],rtDenseValues:i[1]}}}),aB=op({raggedTensorToTensor_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"shape","raggedTensorToTensor","int32"),i=convertToTensor(t,"values","raggedTensorToTensor"),s=convertToTensor(r,"defaultValue","raggedTensorToTensor",i.dtype),u=n.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedTensorToTensor","int32")});return rd.runKernel(eY,{shape:o,values:i,defaultValue:s,rowPartitionTensors:u},{rowPartitionTypes:a})}}),aF=op({rand_:/**
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
 */function(e,t,r){assertNonNegativeIntegerDimensions(e);var n=sizeFromShape(e),a=null;if(null==r||"float32"===r)a=new Float32Array(n);else if("int32"===r)a=new Int32Array(n);else if("bool"===r)a=new Uint8Array(n);else throw Error("Unknown data type ".concat(r));for(var o=0;o<n;o++)a[o]=t();return rd.makeTensor(a,e,r)}}),aZ={exports:{}};!function(e,t,r){function Alea(e){var t,r=this,n=(t=4022871197,function(e){e=String(e);for(var r=0;r<e.length;r++){var n=.02519603282416938*(t+=e.charCodeAt(r));t=n>>>0,n-=t,n*=t,t=n>>>0,n-=t,t+=4294967296*n}return(t>>>0)*23283064365386963e-26});r.next=function(){var e=2091639*r.s0+23283064365386963e-26*r.c;return r.s0=r.s1,r.s1=r.s2,r.s2=e-(r.c=0|e)},r.c=1,r.s0=n(" "),r.s1=n(" "),r.s2=n(" "),r.s0-=n(e),r.s0<0&&(r.s0+=1),r.s1-=n(e),r.s1<0&&(r.s1+=1),r.s2-=n(e),r.s2<0&&(r.s2+=1)}function copy(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function impl(e,t){var r=new Alea(e),n=t&&t.state,a=r.next;return a.int32=function(){return 4294967296*r.next()|0},a.double=function(){return a()+(2097152*a()|0)*11102230246251565e-32},a.quick=a,n&&("object"==typeof n&&copy(n,r),a.state=function(){return copy(r,{})}),a}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.alea=impl}(0,aZ,!1);var az=aZ.exports,aL={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor128=impl}(0,aL,!1);var aG=aL.exports,aU={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),n==r.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorwow=impl}(0,aU,!1);var aW=aU.exports,aK={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.x,a=t.i;return e=n[a],e^=e>>>7,r=e^e<<24^((e=n[a+1&7])^e>>>10)^((e=n[a+3&7])^e>>>3)^((e=n[a+4&7])^e<<7),e=n[a+7&7],e^=e<<13,r^=e^e<<9,n[a]=r,t.i=a+1&7,r},function(e,t){var r,n=[];if(t===(0|t))n[0]=t;else for(r=0,t=""+t;r<t.length;++r)n[7&r]=n[7&r]<<15^t.charCodeAt(r)+n[r+1&7]<<13;for(;n.length<8;)n.push(0);for(r=0;r<8&&0===n[r];++r);for(8==r?n[7]=-1:n[r],e.x=n,e.i=0,r=256;r>0;--r)e.next()}(t,e)}function copy(e,t){return t.x=e.x.slice(),t.i=e.i,t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.x&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorshift7=impl}(0,aK,!1);var aj=aK.exports,aV={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.w,a=t.X,o=t.i;return t.w=n=n+1640531527|0,r=a[o+34&127],e=a[o=o+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,r=a[o]=r^e,t.i=o,r+(n^n>>>16)|0},function(e,t){var r,n,a,o,i,s=[],u=128;for(t===(0|t)?(n=t,t=null):(t+="\x00",n=0,u=Math.max(u,t.length)),a=0,o=-32;o<u;++o)t&&(n^=t.charCodeAt((o+32)%t.length)),0===o&&(i=n),n^=n<<10,n^=n>>>15,n^=n<<4,n^=n>>>13,o>=0&&(i=i+1640531527|0,a=0==(r=s[127&o]^=n+i)?a+1:0);for(a>=128&&(s[127&(t&&t.length||0)]=-1),a=127,o=512;o>0;--o)n=s[a+34&127],r=s[a=a+1&127],n^=n<<13,r^=r<<17,n^=n>>>15,r^=r>>>12,s[a]=n^r;e.w=i,e.X=s,e.i=a}(t,e)}function copy(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.X&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor4096=impl}(0,aV,!1);var aq=aV.exports,aH={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.b,r=t.c,n=t.d,a=t.a;return e=e<<25^e>>>7^r,r=r-n|0,n=n<<24^n>>>8^a,a=a-e|0,t.b=e=e<<20^e>>>12^r,t.c=r=r-n|0,t.d=n<<16^r>>>16^a,t.a=a-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):r+=e;for(var n=0;n<r.length+20;n++)t.b^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.tychei=impl}(0,aH,!1);var a$=aH.exports,aJ={exports:{}};!function(e){!function(t,n,a){var o,i="random",s=a.pow(256,6),u=a.pow(2,52),c=2*u;function seedrandom(e,r,l){var d=[],h=mixkey(function flatten(e,t){var r,n=[],a=typeof e;if(t&&"object"==a)for(r in e)try{n.push(flatten(e[r],t-1))}catch(e){}return n.length?n:"string"==a?e:e+"\x00"}((r=!0==r?{entropy:!0}:r||{}).entropy?[e,tostring(n)]:null==e?function(){try{var e;return o&&(e=o.randomBytes)?e=e(256):(e=new Uint8Array(256),(t.crypto||t.msCrypto).getRandomValues(e)),tostring(e)}catch(e){var r=t.navigator,a=r&&r.plugins;return[+new Date,t,a,t.screen,tostring(n)]}}():e,3),d),p=new ARC4(d),prng=function(){for(var e=p.g(6),t=s,r=0;e<u;)e=(e+r)*256,t*=256,r=p.g(1);for(;e>=c;)e/=2,t/=2,r>>>=1;return(e+r)/t};return prng.int32=function(){return 0|p.g(4)},prng.quick=function(){return p.g(4)/4294967296},prng.double=prng,mixkey(tostring(p.S),n),(r.pass||l||function(e,t,r,n){return(n&&(n.S&&copy(n,p),e.state=function(){return copy(p,{})}),r)?(a[i]=e,t):e})(prng,h,"global"in r?r.global:this==a,r.state)}function ARC4(e){var t,r=e.length,n=this,a=0,o=n.i=n.j=0,i=n.S=[];for(r||(e=[r++]);a<256;)i[a]=a++;for(a=0;a<256;a++)i[a]=i[o=255&o+e[a%r]+(t=i[a])],i[o]=t;(n.g=function(e){for(var t,r=0,a=n.i,o=n.j,i=n.S;e--;)t=i[a=255&a+1],r=256*r+i[255&(i[a]=i[o=255&o+t])+(i[o]=t)];return n.i=a,n.j=o,r})(256)}function copy(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function mixkey(e,t){for(var r,n=e+"",a=0;a<n.length;)t[255&a]=255&(r^=19*t[255&a])+n.charCodeAt(a++);return tostring(t)}function tostring(e){return String.fromCharCode.apply(0,e)}if(mixkey(a.random(),n),e.exports){e.exports=seedrandom;try{o=r(6113)}catch(e){}}else a["seed"+i]=seedrandom}("undefined"!=typeof self?self:tG,[],Math)}(aJ);var aY=aJ.exports;function testEpsilon(){return 32===rd.backend.floatPrecision()?.001:.1}function expectArraysPredicate(e,t,r){var n=!0;if((isTypedArray(e)||isTypedArray(t))&&(n=!1),isTypedArray(e)&&isTypedArray(t)&&(n=!0),n){var a=e.constructor.name,o=t.constructor.name;if(a!==o)throw Error("Arrays are of different type. Actual: ".concat(a,". ")+"Expected: ".concat(o))}if(Array.isArray(e)&&Array.isArray(t)){var i=inferShape(e),s=inferShape(t);if(!arraysEqual(i,s))throw Error("Arrays have different shapes. "+"Actual: [".concat(i,"]. Expected: [").concat(s,"]"))}var u=isTypedArray(e)?e:flatten(e),c=isTypedArray(t)?t:flatten(t);if(u.length!==c.length)throw Error("Arrays have different lengths actual: ".concat(u.length," vs ")+"expected: ".concat(c.length,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."));for(var l=0;l<c.length;++l){var d=u[l],h=c[l];if(!r(d,h))throw Error("Arrays differ: actual[".concat(l,"] = ").concat(d,", expected[").concat(l,"] = ").concat(h,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."))}"undefined"!=typeof expect&&expect().nothing()}function areClose(e,t,r){return!(isFinite(e)||isFinite(t))||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>r)}aY.alea=az,aY.xor128=aG,aY.xorwow=aW,aY.xorshift7=aj,aY.xor4096=aq,aY.tychei=a$;/**
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
 */var aX=function(){function MPRandGauss(e,t,r,n,a){this.mean=e,this.stdDev=t,this.dtype=r,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var o=a||Math.random();this.random=aY.alea(o.toString())}return MPRandGauss.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var e,t,r=this.nextVal;return this.nextVal=NaN,r}for(var n=!1;!n;){var a=void 0,o=void 0,i=void 0;do i=(a=2*this.random()-1)*a+(o=2*this.random()-1)*o;while(i>=1||0===i);var s=Math.sqrt(-2*Math.log(i)/i);e=this.mean+this.stdDev*a*s,t=this.mean+this.stdDev*o*s,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)},MPRandGauss.prototype.convertValue=function(e){return null==this.dtype||"float32"===this.dtype?e:Math.round(e)},MPRandGauss.prototype.isValidTruncated=function(e){return e<=this.upper&&e>=this.lower},MPRandGauss}(),aQ=function(){function RandGamma(e,t,r,n){this.alpha=e,this.beta=1/t,this.dtype=r;var a=n||Math.random();this.randu=aY.alea(a.toString()),this.randn=new aX(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}return RandGamma.prototype.nextValue=function(){for(var e,t,r,n,a,o;;){do n=this.randn.nextValue(),o=1+this.c*n;while(o<=0);if(o*=o*o,t=1-.331*(e=n*n)*e,r=.5*e+this.d*(1-o+Math.log(o)),(a=this.randu())<t||Math.log(a)<r)break}return o=1/this.beta*this.d*o,this.alpha<1&&(o*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(o)},RandGamma.prototype.convertValue=function(e){return"float32"===this.dtype?e:Math.round(e)},RandGamma}(),a0=function(){function UniformRandom(e,t,r,n){void 0===e&&(e=0),void 0===t&&(t=1);var a=this;if(this.canReturnFloat=function(){return null==a.dtype||"float32"===a.dtype},this.min=e,this.range=t-e,this.dtype=r,null==n&&(n=Math.random()),"number"==typeof n&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw Error("The difference between ".concat(e," - ").concat(t," <= 1 and dtype is not float"));this.random=aY.alea(n)}return UniformRandom.prototype.convertValue=function(e){return this.canReturnFloat()?e:Math.round(e)},UniformRandom.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},UniformRandom}(),a1=op({randomGamma_:/**
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
 */function(e,t,r,n,a){if(void 0===r&&(r=1),void 0===n&&(n="float32"),assertNonNegativeIntegerDimensions(e),null==r&&(r=1),null==n&&(n="float32"),"float32"!==n&&"int32"!==n)throw Error("Unsupported data type ".concat(n));for(var o=new aQ(t,r,n,a),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),a2=op({randomNormal_:/**
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
 */function(e,t,r,n,a){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type ".concat(n));for(var o=new aX(t,r,n,!1,a),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),a3=op({randomStandardNormal_:/**
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
 */function(e,t,r){if(null!=t&&"bool"===t)throw Error("Unsupported data type ".concat(t));return a2(e,0,1,t,r)}}),a4=op({randomUniform_:/**
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
 */function(e,t,r,n,a){void 0===t&&(t=0),void 0===r&&(r=1),void 0===n&&(n="float32"),assertNonNegativeIntegerDimensions(e);for(var o=buffer(e,n),i=new a0(t,r,null,a),s=0;s<o.values.length;s++)o.values[s]=i.nextValue();return o.toTensor()}}),a6=op({randomUniformInt_:/**
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
 */function(e,t,r,n){return a4(e,t,r,"int32",n)}});/**
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
 */function range(e,t,r,n){if(void 0===r&&(r=1),void 0===n&&(n="float32"),0===r)throw Error("Cannot have a step of zero");var a={start:e,stop:t,step:r,dtype:n};return rd.runKernel(eX,{},a)}var a5=op({real_:/**
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
 */function(e){var t=convertToTensor(e,"input","real");return rd.runKernel(eQ,{input:t})}}),a7=op({reciprocal_:/**
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
 */function(e){var t=convertToTensor(e,"x","reciprocal");return rd.runKernel(e0,{x:t})}}),a8=op({relu_:/**
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
 */function(e){var t=convertToTensor(e,"x","relu");return rd.runKernel(e1,{x:t})}}),a9=op({relu6_:/**
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
 */function(e){var t=convertToTensor(e,"x","relu6");return rd.runKernel(e6,{x:t})}}),oe=op({reverse_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","reverse");return rd.runKernel(e5,{x:r},{dims:t})}}),ot=op({reverse1d_:/**
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
 */function(e){var t=convertToTensor(e,"x","reverse");return assert(1===t.rank,function(){return"Error in reverse1D: x must be rank 1 but got rank ".concat(t.rank,".")}),oe(t,0)}}),or=op({reverse2d_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(2===r.rank,function(){return"Error in reverse2D: x must be rank 2 but got rank ".concat(r.rank,".")}),oe(r,t)}}),on=op({reverse3d_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(3===r.rank,function(){return"Error in reverse3D: x must be rank 3 but got rank ".concat(r.rank,".")}),oe(r,t)}}),oa=op({reverse4d_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","reverse");return assert(4===r.rank,function(){return"Error in reverse4D: x must be rank 4 but got rank ".concat(r.rank,".")}),oe(r,t)}}),oo=op({round_:/**
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
 */function(e){var t=convertToTensor(e,"x","round");return rd.runKernel(e7,{x:t})}}),oi=op({rsqrt_:/**
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
 */function(e){var t=convertToTensor(e,"x","rsqrt","float32");return rd.runKernel(e8,{x:t})}}),os=op({selu_:/**
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
 */function(e){var t=convertToTensor(e,"x","selu");return rd.runKernel(tn,{x:t})}}),ou=op({separableConv2d_:function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]),void 0===i&&(i="NHWC");var s=convertToTensor(e,"x","separableConv2d"),u=convertToTensor(t,"depthwiseFilter","separableConv2d"),c=convertToTensor(r,"pointwiseFilter","separableConv2d"),l=s,d=!1;if(3===s.rank&&(d=!0,l=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),"NCHW"===i)throw Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");assert(4===l.rank,function(){return"Error in separableConv2d: input must be rank 4, but got "+"rank ".concat(l.rank,".")}),assert(4===u.rank,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(4===c.rank,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(1===c.shape[0],function(){return"Error in separableConv2d: the first dimension of pointwise filter "+" must be 1, but got ".concat(c.shape[0],".")}),assert(1===c.shape[1],function(){return"Error in separableConv2d: the second dimension of pointwise "+"filter must be 1, but got ".concat(c.shape[1],".")});var h=u.shape[2],p=u.shape[3];assert(c.shape[2]===h*p,function(){return"Error in separableConv2d: the third dimension of pointwise filter "+"must be ".concat(h*p,", ")+"but got ".concat(c.shape[2],".")});var f=nd(nx(l,u,n,a,i,o),c,1,"valid",i);return d?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}}),oc=op({sign_:/**
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
 */function(e){var t=convertToTensor(e,"x","sign");return rd.runKernel(ti,{x:t})}}),ol=op({sin_:/**
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
 */function(e){var t=convertToTensor(e,"x","sin","float32");return rd.runKernel("Sin",{x:t})}}),od=op({sinh_:/**
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
 */function(e){var t=convertToTensor(e,"x","sinh");return rd.runKernel(to,{x:t})}}),oh=op({slice1d_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice1d");return assert(1===n.rank,function(){return"slice1d expects a rank-1 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,[t],[r])}}),of=op({slice2d_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice2d");return assert(2===n.rank,function(){return"slice2d expects a rank-2 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),om=op({slice3d_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice3d");return assert(3===n.rank,function(){return"slice3d expects a rank-3 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),og=op({slice4d_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice4d");return assert(4===n.rank,function(){return"slice4d expects a rank-4 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,t,r)}}),ov=op({softmax_:/**
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
 */function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","softmax","float32");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and dim was ").concat(t));var n={dim:t};return rd.runKernel(th,{logits:r},n)}}),oy=op({fft_:/**
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
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.fft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel("FFT",{input:e})}}),ob=op({ifft_:/**
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
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.ifft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel(ev,{input:e})}}),o_=op({irfft_:/**
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
 */function(e){var t,r=e.shape[e.shape.length-1],n=e.size/r;if(r<=2){var a=rY(e,[n,r]);t=ob(a)}else{var o=[n,2*(r-1)],i=rY(a5(e),[n,r]),s=rY(nQ(e),[n,r]),u=oe(r3(i,[0,1],[n,r-2]),1),c=rF(oe(r3(s,[0,1],[n,r-2]),1),scalar(-1)),a=rY(rf(r0([i,u],1),r0([s,c],1)),[o[0],o[1]]);t=ob(a)}if(t=a5(t),3===e.rank&&0!==e.shape[0]){var l=t,d=e.shape[0];t=rY(t,[d,t.shape[0]/d,t.shape[1]]),l.dispose()}return t}}),oT=op({split_:/**
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
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","split"),a={numOrSizeSplits:t,axis:r};return rd.runKernel(td,{x:n},a)}}),ow=op({rfft_:/**
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
 */function(e,t){assert("float32"===e.dtype,function(){return"The dtype for rfft() must be real value but got ".concat(e.dtype)});var r,n=e.shape[e.shape.length-1],a=e.size/n;if(null!=t&&t<n){var o=e.shape.map(function(e){return 0}),i=e.shape.map(function(e){return e});i[e.shape.length-1]=t,r=r3(e,o,i),n=t}else if(null!=t&&t>n){var s=e.shape.map(function(e){return e});s[e.shape.length-1]=t-n,r=r0([e,zeros(s)],e.shape.length-1),n=t}else r=e;var u=nN(r),c=oy(rY(rf(r,u),[a,n])),l=Math.floor(n/2)+1,d=a5(c),h=nQ(c),p=oT(d,[l,n-l],d.shape.length-1),f=oT(h,[l,n-l],h.shape.length-1),m=r.shape.slice();return m[r.shape.length-1]=l,rY(rf(p[0],f[0]),m)}}),ok=op({squaredDifference_:function(e,t){var r,n=convertToTensor(e,"a","squaredDifference"),a=convertToTensor(t,"b","squaredDifference");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ty,o,{})}}),ox=op({squeeze_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","squeeze","string_or_numeric");return rY(r,squeezeShape(r.shape,t).newShape)}}),oS=op({stack_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensorArray(e,"tensors","stack","string_or_numeric");assert(r.length>=1,function(){return"Pass at least one tensor to tf.stack"}),r.length>0&&assert(t<=r[0].rank,function(){return"Axis must be <= rank of the tensor"});var n={axis:t};return rd.runKernel(ej,r,n)}}),oE=op({step_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","step"),n={alpha:t};return rd.runKernel(tO,{x:r},n)}}),oA=op({stridedSlice_:/**
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
 */function(e,t,r,n,a,o,i,s,u){void 0===a&&(a=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===s&&(s=0),void 0===u&&(u=0);var c=convertToTensor(e,"x","stridedSlice","string_or_numeric"),l={begin:t,end:r,strides:n,beginMask:a,endMask:o,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u};return rd.runKernel(t_,{x:c},l)}}),oI=op({tan_:/**
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
 */function tensor3d(e,t,r){if(assertNonNull(e),null!=t&&3!==t.length)throw Error("tensor3d() requires shape to have three numbers");var n=inferShape(e,r);if(3!==n.length&&1!==n.length)throw Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t,n,r)}function validateUpdateShape(e,t,r){var n=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,o="Must have updates.shape = indices.shape[:batchDim] + "+"shape[sliceDim:], got updates.shape: ".concat(r.shape)+", indices.shape: ".concat(t.shape,", shape: ").concat(e)+", sliceDim: ".concat(n,", and batchDim: ").concat(a,".");if(r.rank<a)throw Error(o+" update.rank < ".concat(a,". "));if(e.length<n+(r.rank-a))throw Error(o+" Output shape length < ".concat(n+(r.rank-a)));if(r.rank!==a+e.length-n)throw Error(o+" update.rank != ".concat(a+e.length-n));for(var i=0;i<a;++i)if(r.shape[i]!==t.shape[i])throw Error(o+" updates.shape[".concat(i,"] (").concat(r.shape[i],") != indices.shape[").concat(i,"] (").concat(t.shape[i],")."));for(var i=0;i<r.rank-a;++i)if(r.shape[i+a]!==e[i+n])throw Error(o+" updates.shape[".concat(i+a,"] (").concat(r.shape[i+a],") != shape[").concat(i+a,"] (").concat(e[i+a],")"))}function validateInput$1(e,t,r){if(t.rank<1)throw Error("tf.scatterND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(t.rank,"."));if(e.rank<1)throw Error("tf.scatterND() expects the updates to be rank 1 or higher,"+" but the rank was ".concat(e.rank,"."));if("int32"!==t.dtype)throw Error("The dtype of 'indices' should be int32, but got dtype: ".concat(t.dtype));if(r.length<1)throw Error("Output rank must be greater or equal to 1, but got shape: ".concat(r));if(0===r.length){if(0===t.size)throw Error("Indices specified for empty output. indices shape: ".concat(t.shape));if(0===e.size)throw Error("Updates specified for empty output. updates shape: ".concat(e.shape))}validateUpdateShape(r,t,e)}function calculateShapes(e,t,r){for(var n=t.shape.length,a=n>1?t.shape[n-1]:1,o=r.length,i=1,s=a;s<o;++s)i*=r[s];var u=a<1?1:a,c=sizeFromShape(t.shape)/u,l=__spreadArray(__spreadArray([],__read(computeStrides(r.slice(0,a))),!1),[1],!1);return{sliceRank:a,numUpdates:c,sliceSize:i,strides:l,outputSize:sizeFromShape(r)}}var oN=op({tensorScatterUpdate_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"tensor","tensorScatterupdate"),a=convertToTensor(t,"indices","tensorScatterupdate","int32"),o=convertToTensor(r,"updates","tensorScatterupdate");if(validateInput$1(o,a,n.shape),n.dtype!==o.dtype)throw Error("tensor and updates must have the same dtype, instead they are ".concat(n.dtype," and ").concat(o.dtype,"."));return rd.runKernel(te,{tensor:n,indices:a,updates:o},{})}}),oM=op({topk_:function(e,t,r){void 0===t&&(t=1),void 0===r&&(r=!0);var n=convertToTensor(e,"x","topk");if(0===n.rank)throw Error("topk() expects the input to be of rank 1 or higher");var a=n.shape[n.shape.length-1];if(t<0)throw Error("'k' passed to topk() must be >= 0 but got ".concat(t));if(t>a)throw Error("'k' passed to topk() must be <= the last dimension (".concat(a,") ")+"but got ".concat(t));var o={k:t,sorted:r},i=__read(rd.runKernel(tE,{x:n},o),2);return{values:i[0],indices:i[1]}}}),oD=op({truncatedNormal_:/**
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
 */function(e,t,r,n,a){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type $ { dtype }");for(var o=new aX(t,r,n,!0,a),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),oR=op({unique_:function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unique","string_or_numeric");assert(r.rank>0,function(){return"The input tensor must be at least 1D"});var n={axis:t},a=__read(rd.runKernel(tN,{x:r},n),2);return{values:a[0],indices:a[1]}}}),oO=op({unsortedSegmentSum_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","unsortedSegmentSum"),a=convertToTensor(t,"segmentIds","unsortedSegmentSum","int32");return assert(isInt(r),function(){return"numSegments must be of dtype int"}),rd.runKernel(tD,{x:n,segmentIds:a},{numSegments:r})}}),oP=op({unstack_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unstack","string_or_numeric");assert(t>=-r.shape.length&&t<r.shape.length,function(){return"Axis = ".concat(t," is not in [-").concat(r.shape.length,", ").concat(r.shape.length,")")});var n={axis:t};return rd.runKernel(tM,{value:r},n)}});/**
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
 */function whereImpl(e,t){for(var r=[],n=0;n<t.length;n++)t[n]&&r.push(n);for(var a=buffer(e,"int32"),o=buffer([r.length,e.length],"int32"),n=0;n<r.length;n++){var i=a.indexToLoc(r[n]),s=n*e.length;o.values.set(i,s)}return o.toTensor()}var whereAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:return[4,(t=convertToTensor(e,"condition","whereAsync","bool")).data()];case 1:return r=a.sent(),n=whereImpl(t.shape,r),e!==t&&t.dispose(),[2,n]}})})},oC=op({transpose_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","transpose");if(null==t&&(t=n.shape.map(function(e,t){return t}).reverse()),assert(n.rank===t.length,function(){return"Error in transpose: rank of input ".concat(n.rank," ")+"must match length of perm ".concat(t,".")}),t.forEach(function(e){assert(e>=0&&e<n.rank,function(){return"All entries in 'perm' must be between 0 and ".concat(n.rank-1)+" but got ".concat(t)})}),n.rank<=1)return n.clone();var a={perm:t};return"complex64"===n.dtype?tidy(function(){var e=a5(n),t=nQ(n);return e=rd.runKernel(tI,{x:e},a),t=rd.runKernel(tI,{x:t},a),r&&(t=n9(t)),rf(e,t)}):rd.runKernel(tI,{x:n},a)}}),oB=op({movingAverage_:/**
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
 */function(e,t,r,n,a){void 0===a&&(a=!0);var o=convertToTensor(e,"v","movingAverage"),i=convertToTensor(t,"x","movingAverage"),s=convertToTensor(r,"decay","movingAverage");assertTypesMatch(o,i),assert(arraysEqual(o.shape,i.shape),function(){return"Shape mismatch in v and x"});var u=scalar(1),c=ar(u,s),l=rF(ar(i,o),c);return a&&(assert(null!=n,function(){return"When using zeroDebias: true, step is required."}),l=rB(l,ar(u,nZ(s,convertToTensor(n,"step","movingAverage"))))),rP(o,l)}}),oF=op({scatterND_:/**
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
 */function(e,t,r){assertNonNegativeIntegerDimensions(r);var n=convertToTensor(e,"indices","scatterND","int32"),a=convertToTensor(t,"updates","scatterND");return validateInput$1(a,n,r),rd.runKernel(e9,{indices:n,updates:a},{shape:r})}}),oZ=op({sparseToDense_:/**
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
 */function(e,t,r,n){void 0===n&&(n=0),assertNonNegativeIntegerDimensions(r);var a=convertToTensor(e,"sparseIndices","sparseToDense","int32"),o=convertToTensor(t,"sparseValues","sparseToDense","string_or_numeric"),i=convertToTensor(n,"defaultValue","sparseToDense",o.dtype);return function(e,t,r,n){if("int32"!==e.dtype)throw Error("tf.sparseToDense() expects the indices to be int32 type,"+" but the dtype was ".concat(e.dtype,"."));if(e.rank>2)throw Error("sparseIndices should be a scalar, vector, or matrix,"+" but got shape ".concat(e.shape,"."));var a=e.rank>0?e.shape[0]:1,o=e.rank>1?e.shape[1]:1;if(r.length!==o)throw Error("outputShape has incorrect number of elements:,"+" ".concat(r.length,", should be: ").concat(o,"."));var i=t.size;if(!(0===t.rank||1===t.rank&&i===a))throw Error("sparseValues has incorrect shape "+"".concat(t.shape,", should be [] or [").concat(a,"]"));if(t.dtype!==n.dtype)throw Error("sparseValues.dtype must match defaultValues.dtype")}(a,o,r,i),rd.runKernel(tv,{sparseIndices:a,sparseValues:o,defaultValue:i},{outputShape:r})}}),oz=op({gatherND_:/**
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
 */function(e,t){var r=convertToTensor(t,"indices","gatherND","int32"),n=convertToTensor(e,"x","gatherND","string_or_numeric");return rd.runKernel(ep,{params:n,indices:r})}}),oL=op({dropout_:/**
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
 */function(e,t,r,n){var a=convertToTensor(e,"x","dropout");if(assert("float32"===a.dtype,function(){return"x has to be a floating point tensor since it's going to be "+"scaled, but got a ".concat(a.dtype," tensor instead.")}),assert(t>=0&&t<1,function(){return"rate must be a float in the range [0, 1), but got ".concat(t,".")}),0===t)return e instanceof ri?a.clone():a;var o=/**
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
 */function(e,t){if(null==t)return e.shape.slice();if(arraysEqual(e.shape,t))return t;if(e.shape.length===t.length){for(var r=[],n=0;n<e.shape.length;n++)null==t[n]&&null!=e.shape[n]?r.push(e.shape[n]):r.push(t[n]);return r}return t}(a,r),i=1-t;return rF(a,rB(n$(rP(a4(o,0,1,"float32",n),i)),i))}});/**
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
 */function enclosingPowerOfTwo(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function cosineWindow(e,t,r){for(var n=1-e%2,a=new Float32Array(e),o=0;o<e;++o){var i=2*Math.PI*o/(e+n-1);a[o]=t-r*Math.cos(i)}return tensor1d(a,"float32")}var oG=op({conv2DBackpropFilter_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o="NHWC");var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]])),assert(4===s.rank,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+"".concat(s.shape,".")}),assert(4===u.rank,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+"".concat(u.shape,".")}),assert(4===r.length,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+"".concat(r,".")});var c="NHWC"===o?s.shape[3]:s.shape[1],l="NHWC"===o?u.shape[3]:u.shape[1];assert(c===r[2],function(){return"Error in conv2dDerFilter: depth of input ".concat(c,") must ")+"match input depth in filter (".concat(r[2],".")}),assert(l===r[3],function(){return"Error in conv2dDerFilter: depth of dy (".concat(l,") must ")+"match output depth for filter (".concat(r[3],").")}),checkPadOnDimRoundingMode("conv2dDerFilter",a,i);var d={x:s,dy:u},h={strides:n,pad:a,dataFormat:o,dimRoundingMode:i,filterShape:r};return rd.runKernel(L,d,h)}});/**
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
 */function getFusedDyActivation(e,t,r){if(null==r||"linear"===r)return e;if("relu"===r)return rF(e,oE(t));throw Error("Cannot compute gradient for fused activation ".concat(r,"."))}function getFusedBiasGradient(e,t){var r=t,n=getReductionAxes(e.shape,t.shape);return n.length>0&&(r=nG(r,n)),rY(r,e.shape)}function applyActivation(e,t,r,n){if("linear"===t)return e;if("relu"===t)return a8(e);if("elu"===t)return nO(e);if("relu6"===t)return a9(e);if("prelu"===t)return aR(e,r);if("leakyrelu"===t)return n3(e,n);if("sigmoid"===t)return r2(e);throw Error("Unknown fused activation ".concat(t,"."))}var shouldFuse=function(e,t){return!(e>0)||"linear"===t},oU=op({fusedConv2d_:function(e){var t,r,n=e.x,a=e.filter,o=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,h=e.bias,p=e.activation,f=void 0===p?"linear":p,m=e.preluActivationWeights,g=e.leakyreluAlpha;if(f=f||"linear",!1===shouldFuse(rd.state.gradientDepth,f)){assert("NHWC"===u,function(){return"Error in fused conv2d: got dataFormat of ".concat(u," but ")+"only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear."});var v=nd(n,a,o,i,u,l,d);return null!=h&&(v=rP(v,h)),applyActivation(v,f,m,g)}var y=convertToTensor(n,"x","conv2d","float32"),b=convertToTensor(a,"filter","conv2d","float32"),_=y,T=!1;3===y.rank&&(T=!0,_=rY(y,[1,y.shape[0],y.shape[1],y.shape[2]])),assert(4===_.rank,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+"".concat(_.rank,".")}),assert(4===b.rank,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+"".concat(b.rank,".")}),checkPadOnDimRoundingMode("fused conv2d",i,d);var w="NHWC"===u?_.shape[3]:_.shape[1];assert(b.shape[2]===w,function(){return"Error in conv2d: depth of input (".concat(w,") must match ")+"input depth for filter ".concat(b.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(o,l),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(o," and dilations '").concat(l,"'")});var k=computeConv2DInfo(_.shape,b.shape,o,l,i,d);if(null!=h&&(t=__read(makeTypesMatch(t=convertToTensor(h,"bias","fused conv2d"),y),1)[0],"NHWC"===u?assertAndGetBroadcastShape(k.outShape,t.shape):(assert(t.shape.length<=1,function(){return"Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of "+"rank-".concat(t.shape.length,".")}),assert(0===t.shape.length||t.shape[0]===k.outChannels||1===t.shape[0],function(){return"Error in fused conv2d: bias shape (".concat(t.shape,") is not ")+"compatible with the number of output channels "+"(".concat(k.outChannels,")")}))),null!=m){var x=m.shape;if(assert(x.length<=1||3===x.length,function(){return"Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of "+"rank-".concat(x.length,".")}),1===x.length)assert(1===x[0]||x[0]===k.outChannels,function(){return"Error in fused conv2d: PReLU activation weights "+"(".concat(x,") is not compatible with the number of output ")+"channels (".concat(k.outChannels,").")});else if(3===x.length)try{assertAndGetBroadcastShape(x,k.outShape)}catch(e){throw Error("Error in fused conv2d: PReLU activation weights (".concat(x,") ")+"is not compatible with the output shape of the conv2d "+"(".concat(k.outShape,")."))}r=convertToTensor(m,"prelu weights","fused conv2d")}var grad=function(e,t){assert("NHWC"===u,function(){return"Error in gradient of fused conv2D: got dataFormat of ".concat(u," but only NHWC is currently supported.")});var r=__read(t,4),n=r[0],a=r[1],s=r[2],c=r[3],d=getFusedDyActivation(e,s,f);assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 "+"are not yet supported in gradients. Got dilations '".concat(l,"'")});var h=[np(a.shape,d,n,o,i),oG(a,d,n.shape,o,i)];if(null!=c){var p=getFusedBiasGradient(c,d);h.push(p)}return h},S={x:_,filter:b,bias:t,preluActivationWeights:r},E={strides:o,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:f,leakyreluAlpha:g};return null==h?customGrad(function(e,t,r){var n=rd.runKernel(tF,S,E);return r([t,e,n]),T&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(_,b):customGrad(function(e,t,r,n){var a=rd.runKernel(tF,S,E);return n([t,e,a,r]),T&&(a=rY(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:grad}})(_,b,t)}}),oW=op({depthwiseConv2dNativeBackpropFilter_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]);var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={x:s,dy:u},l={strides:n,pad:a,dimRoundingMode:i,dilations:o,filterShape:r};return rd.runKernel(Y,c,l)}}),oK=op({depthwiseConv2dNativeBackpropInput_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]);var s=t,u=!1;3===t.rank&&(u=!0,s=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={dy:s,filter:r},l={strides:n,pad:a,dimRoundingMode:i,dilations:o,inputShape:e},d=rd.runKernel(X,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3]]):d}}),oj=op({fusedDepthwiseConv2d_:function(e){var t,r,n=e.x,a=e.filter,o=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,h=e.bias,p=e.activation,f=void 0===p?"linear":p,m=e.preluActivationWeights,g=e.leakyreluAlpha;if(!1===shouldFuse(rd.state.gradientDepth,f)){var v=nx(n,a,o,i,u,l,d);return null!=h&&(v=rP(v,h)),applyActivation(v,f,m,g)}var y=convertToTensor(n,"x","depthwiseConv2d","float32"),b=convertToTensor(a,"filter","depthwiseConv2d","float32"),_=y,T=!1;3===y.rank&&(T=!0,_=rY(y,[1,y.shape[0],y.shape[1],y.shape[2]])),assert(4===_.rank,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(_.rank,".")}),assert(4===b.rank,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, "+"but got rank ".concat(b.rank,".")}),assert(_.shape[3]===b.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels "+"(".concat(_.shape[3],") must match the inChannels dimension in ")+"filter ".concat(b.shape[2],".")}),null==l&&(l=[1,1]),assert(eitherStridesOrDilationsAreOne(o,l),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must "+"be 1. Got strides ".concat(o," and dilations '").concat(l,"'")}),checkPadOnDimRoundingMode("fused depthwiseConv2d",i,d);var w=computeConv2DInfo(_.shape,b.shape,o,l,i,d,!0);null!=h&&(t=__read(makeTypesMatch(t=convertToTensor(h,"bias","fused conv2d"),y),1)[0],assertAndGetBroadcastShape(w.outShape,t.shape)),null!=m&&(r=convertToTensor(m,"prelu weights","fused depthwiseConv2d"));var grad=function(e,r){assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations "+"'".concat(l,"'")});var n=__read(r,4),a=n[0],s=n[1],u=n[2],c=n[3],h=getFusedDyActivation(e,u,f),p=oK(s.shape,h,a,o,i,l,d),m=oW(s,h,a.shape,o,i,l,d);return null!=c?[p,m,getFusedBiasGradient(t,h)]:[p,m]},k={x:_,filter:b,bias:t,preluActivationWeights:r},x={strides:o,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:f,leakyreluAlpha:g};return null==h?customGrad(function(e,t,r){var n=rd.runKernel(tZ,k,x);return r([t,e,n]),T&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(_,b):customGrad(function(e,t,r,n){var a=rd.runKernel(tZ,k,x);return n([t,e,a,r]),T&&(a=rY(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:grad}})(_,b,t)}}),oV=op({fusedMatMul_:function(e){var t,r,n,a=e.a,o=e.b,i=e.transposeA,s=void 0!==i&&i,u=e.transposeB,c=void 0!==u&&u,l=e.bias,d=e.activation,h=void 0===d?"linear":d,p=e.preluActivationWeights,f=e.leakyreluAlpha,m=void 0===f?.2:f;if(!1===shouldFuse(rd.state.gradientDepth,h)){var g=r1(a,o,s,c);return null!=l&&(g=rP(g,l)),applyActivation(g,h,p,m)}var v=convertToTensor(a,"a","fused matMul"),y=convertToTensor(o,"b","fused matMul");v=(t=__read(makeTypesMatch(v,y),2))[0],y=t[1];var b=s?v.shape[v.rank-2]:v.shape[v.rank-1],_=c?y.shape[y.rank-1]:y.shape[y.rank-2],T=s?v.shape[v.rank-1]:v.shape[v.rank-2],w=c?y.shape[y.rank-2]:y.shape[y.rank-1],k=v.shape.slice(0,-2),x=y.shape.slice(0,-2),S=sizeFromShape(k),E=sizeFromShape(x);assert(b===_,function(){return"Error in fused matMul: inner shapes (".concat(b,") and (")+"".concat(_,") of Tensors with shapes ").concat(v.shape," and ")+"".concat(y.shape," and transposeA=").concat(s)+" and transposeB=".concat(c," must match.")});var A=assertAndGetBroadcastShape(v.shape.slice(0,-2),y.shape.slice(0,-2)).concat([T,w]),I=s?rY(v,[S,b,T]):rY(v,[S,T,b]),N=c?rY(y,[E,w,_]):rY(y,[E,_,w]);null!=l&&assertAndGetBroadcastShape(A,(r=__read(makeTypesMatch(r=convertToTensor(l,"bias","fused matMul"),v),1)[0]).shape),null!=p&&(n=convertToTensor(p,"prelu weights","fused matMul"));var grad=function(e,t){var r,n,a=__read(t,4),o=a[0],i=a[1],u=a[2],d=a[3],p=getFusedDyActivation(rY(e,u.shape),u,h);return(s||c?!s&&c?(r=r1(p,i,!1,!1),n=r1(p,o,!0,!1)):s&&!c?(r=r1(i,p,!1,!0),n=r1(o,p,!1,!1)):(r=r1(i,p,!0,!0),n=r1(p,o,!0,!0)):(r=r1(p,i,!1,!0),n=r1(o,p,!0,!1)),null!=l)?[r,n,getFusedBiasGradient(d,p)]:[r,n]},M={a:I,b:N,bias:r,preluActivationWeights:n},D={transposeA:s,transposeB:c,activation:h,leakyreluAlpha:m};return null==l?customGrad(function(e,t,r){var n=rd.runKernel(tB,M,D);return r([e,t,n]),{value:rY(n,A),gradFunc:grad}})(I,N):customGrad(function(e,t,r,n){var a=rd.runKernel(tB,M,D);return n([e,t,a,r]),{value:rY(a,A),gradFunc:grad}})(I,N,r)}}),oq=op({hammingWindow_:/**
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
 */function(e){return cosineWindow(e,.54,.46)}}),oH=op({hannWindow_:/**
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
 */function(e){return cosineWindow(e,.5,.5)}}),o$=op({frame_:/**
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
 */function(e,t,r,n,a){void 0===n&&(n=!1),void 0===a&&(a=0);for(var o=0,i=[];o+t<=e.size;)i.push(r3(e,o,t)),o+=r;if(n)for(;o<e.size;){var s=o+t-e.size,u=r0([r3(e,o,t-s),fill([s],a)]);i.push(u),o+=r}return 0===i.length?tensor2d([],[0,t]):rY(r0(i),[i.length,t])}}),oJ=op({stft_:/**
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
 */function(e,t,r,n,a){return void 0===a&&(a=oH),null==n&&(n=enclosingPowerOfTwo(t)),ow(rF(o$(e,t,r),a(t)),n)}}),oY=op({cropAndResize_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a="bilinear"),void 0===o&&(o=0);var i=convertToTensor(e,"image","cropAndResize"),s=convertToTensor(t,"boxes","cropAndResize","float32"),u=convertToTensor(r,"boxInd","cropAndResize","int32"),c=s.shape[0];assert(4===i.rank,function(){return"Error in cropAndResize: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&4===s.shape[1],function(){return"Error in cropAndResize: boxes must be have size [".concat(c,",4] ")+"but had shape ".concat(s.shape,".")}),assert(1===u.rank&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size [".concat(c,"] ")+"but had shape ".concat(s.shape,".")}),assert(2===n.length,function(){return"Error in cropAndResize: cropSize must be of length 2, but got "+"length ".concat(n.length,".")}),assert(n[0]>=1&&n[1]>=1,function(){return"cropSize must be atleast [1,1], but was ".concat(n)}),assert("bilinear"===a||"nearest"===a,function(){return"method must be bilinear or nearest, but was ".concat(a)});var l={method:a,extrapolationValue:o,cropSize:n};return rd.runKernel(q,{image:i,boxes:s,boxInd:u},l)}}),oX=op({flipLeftRight_:/**
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
 */function(e){var t=convertToTensor(e,"image","flipLeftRight","float32");return assert(4===t.rank,function(){return"Error in flipLeftRight: image must be rank 4,"+"but got rank ".concat(t.rank,".")}),rd.runKernel(eu,{image:t},{})}}),oQ=op({grayscaleToRGB_:/**
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
 */function(e){var t=convertToTensor(e,"image","grayscaleToRGB"),r=t.rank-1,n=t.shape[r];assert(t.rank>=2,function(){return"Error in grayscaleToRGB: images must be at least rank 2, "+"but got rank ".concat(t.rank,".")}),assert(1===n,function(){return"Error in grayscaleToRGB: last dimension of a grayscale image "+"should be size 1, but got size ".concat(n,".")});var a=Array(t.rank);return a.fill(1,0,r),a[r]=3,nq(t,a)}}),o0=op({rgbToGrayscale_:/**
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
 */function(e){var t,r=convertToTensor(e,"image","RGBToGrayscale"),n=r.rank-1,a=r.shape[n];assert(r.rank>=2,function(){return"Error in RGBToGrayscale: images must be at least rank 2, "+"but got rank ".concat(r.rank,".")}),assert(3===a,function(){return"Error in RGBToGrayscale: last dimension of an RGB image "+"should be size 3, but got size ".concat(a,".")});var o=r.dtype,i=rR(r,"float32"),s=tensor1d([.2989,.587,.114]);switch(r.rank){case 2:t=nR("ij,j->i",i,s);break;case 3:t=nR("ijk,k->ij",i,s);break;case 4:t=nR("ijkl,l->ijk",i,s);break;case 5:t=nR("ijklm,m->ijkl",i,s);break;case 6:t=nR("ijklmn,n->ijklm",i,s);break;default:throw Error("Not a valid tensor rank.")}return rR(t=nj(t,-1),o)}}),o1=op({rotateWithOffset_:/**
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
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=.5);var a=convertToTensor(e,"image","rotateWithOffset","float32");assert(4===a.rank,function(){return"Error in rotateWithOffset: image must be rank 4,"+"but got rank ".concat(a.rank,".")});var o={radians:t,fillValue:r,center:n};return rd.runKernel(tC,{image:a},o)}});/**
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
 */function nonMaxSuppSanityCheck(e,t,r,n,a,o){null==n&&(n=.5),null==a&&(a=Number.NEGATIVE_INFINITY),null==o&&(o=0);var i=e.shape[0];return r=Math.min(r,i),assert(0<=n&&n<=1,function(){return"iouThreshold must be in [0, 1], but was '".concat(n,"'")}),assert(2===e.rank,function(){return"boxes must be a 2D tensor, but was of rank '".concat(e.rank,"'")}),assert(4===e.shape[1],function(){return"boxes must have 4 columns, but 2nd dimension was ".concat(e.shape[1])}),assert(1===t.rank,function(){return"scores must be a 1D tensor"}),assert(t.shape[0]===i,function(){return"scores has incompatible shape with boxes. Expected ".concat(i,", ")+"but was ".concat(t.shape[0])}),assert(0<=o&&o<=1,function(){return"softNmsSigma must be in [0, 1], but was '".concat(o,"'")}),{maxOutputSize:r,iouThreshold:n,scoreThreshold:a,softNmsSigma:o}}var o2=op({nonMaxSuppression_:/**
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
 */function(e,t,r,n,a){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY);var o=convertToTensor(e,"boxes","nonMaxSuppression","float32"),i=convertToTensor(t,"scores","nonMaxSuppression","float32"),s=nonMaxSuppSanityCheck(o,i,r,n,a),u={maxOutputSize:r=s.maxOutputSize,iouThreshold:n=s.iouThreshold,scoreThreshold:a=s.scoreThreshold};return rd.runKernel(eL,{boxes:o,scores:i},u)}});function defaultComparator(e,t){return e>t?1:e<t?-1:0}function nonMaxSuppressionV3Impl(e,t,r,n,a){return nonMaxSuppressionImpl_(e,t,r,n,a,0)}function nonMaxSuppressionV4Impl(e,t,r,n,a,o){return nonMaxSuppressionImpl_(e,t,r,n,a,0,!1,o,!0)}function nonMaxSuppressionV5Impl(e,t,r,n,a,o){return nonMaxSuppressionImpl_(e,t,r,n,a,o,!0)}function nonMaxSuppressionImpl_(e,t,r,n,a,o,i,s,u){void 0===i&&(i=!1),void 0===s&&(s=!1),void 0===u&&(u=!1);for(var c=[],l=0;l<t.length;l++)t[l]>a&&c.push({score:t[l],boxIndex:l,suppressBeginIndex:0});c.sort(ascendingComparator);for(var d=o>0?-.5/o:0,h=[],p=[];h.length<r&&c.length>0;){var f=c.pop(),m=f.score,g=f.boxIndex,v=f.suppressBeginIndex;if(m<a)break;for(var y=!1,b=h.length-1;b>=v;--b){var _=function(e,t,r){var n=e.subarray(4*t,4*t+4),a=e.subarray(4*r,4*r+4),o=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(a[0],a[2]),l=Math.min(a[1],a[3]),d=Math.max(a[0],a[2]),h=Math.max(a[1],a[3]),p=(s-o)*(u-i),f=(d-c)*(h-l);if(p<=0||f<=0)return 0;var m=Math.max(Math.min(s,d)-Math.max(o,c),0)*Math.max(Math.min(u,h)-Math.max(i,l),0);return m/(p+f-m)}(e,g,h[b]);if(_>=n){y=!0;break}if(f.score=f.score*function(e,t,r){var n=Math.exp(t*r*r);return r<=e?n:0}(n,d,_),f.score<=a)break}f.suppressBeginIndex=h.length,!y&&(f.score===m?(h.push(g),p.push(f.score)):f.score>a&&/**
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
 */function(e,t,r){var n=function(e,t,r){for(var n=0,a=e.length,o=0,i=!1;n<a;){var s=r(t,e[o=n+(a-n>>>1)]);s>0?n=o+1:(a=o,i=!s)}return i?n:-n-1}(e,t,r||defaultComparator),a=n<0?-(n+1):n;e.splice(a,0,t)}(c,f,ascendingComparator))}var T=h.length,w=r-T;s&&w>0&&(h.push.apply(h,__spreadArray([],__read(Array(w).fill(0)),!1)),p.push.apply(p,__spreadArray([],__read(Array(w).fill(0)),!1)));var k={selectedIndices:h};return i&&(k.selectedScores=p),u&&(k.validOutputs=T),k}function ascendingComparator(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}var o3=op({nonMaxSuppressionWithScore_:/**
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
 */function(e,t,r,n,a,o){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=0);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,a,o);r=u.maxOutputSize,n=u.iouThreshold;var c={maxOutputSize:r,iouThreshold:n,scoreThreshold:a=u.scoreThreshold,softNmsSigma:o=u.softNmsSigma},l=rd.runKernel(eU,{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),o4=op({nonMaxSuppressionPadded_:/**
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
 */function(e,t,r,n,a,o){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=!1);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,a,null),c={maxOutputSize:u.maxOutputSize,iouThreshold:u.iouThreshold,scoreThreshold:u.scoreThreshold,padToMaxOutputSize:o},l=rd.runKernel(eG,{boxes:i,scores:s},c);return{selectedIndices:l[0],validOutputs:l[1]}}}),o6=op({resizeBilinear_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"images","resizeBilinear");assert(3===a.rank||4===a.rank,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got "+"rank ".concat(a.rank,".")}),assert(2===t.length,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+"".concat(t,".")}),assert(!1===n||!1===r,function(){return"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false."});var o=a,i=!1;3===a.rank&&(i=!0,o=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),__read(t,0);var s={images:o},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e4,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),o5=op({resizeNearestNeighbor_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"images","resizeNearestNeighbor");assert(3===a.rank||4===a.rank,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got "+"rank ".concat(a.rank,".")}),assert(2===t.length,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+"".concat(t,".")}),assert("float32"===a.dtype||"int32"===a.dtype,function(){return"`images` must have `int32` or `float32` as dtype"}),assert(!1===n||!1===r,function(){return"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false."});var o=a,i=!1;3===a.rank&&(i=!0,o=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),__read(t,0);var s={images:o},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e3,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),o7=op({threshold_:function(e,t,r,n){void 0===t&&(t="binary"),void 0===r&&(r=!1),void 0===n&&(n=.5);var a,o,i,s,u,c=convertToTensor(e,"image","threshold"),l=c.shape[0]*c.shape[1],d=rF(tensor1d([n]),255);if(assert(3===c.rank,function(){return"Error in threshold: image must be rank 3,"+"but got rank ".concat(c.rank,".")}),assert(3===c.shape[2]||1===c.shape[2],function(){return"Error in threshold: image color channel must be equal to 3 or 1"+"but got ".concat(c.shape[2],".")}),assert("int32"===c.dtype||"float32"===c.dtype,function(){return"Error in dtype: image dtype must be int32 or float32,"+"but got dtype ".concat(c.dtype,".")}),assert("otsu"===t||"binary"===t,function(){return"Method must be binary or otsu, but was ".concat(t)}),3===c.shape[2]){o=(a=__read(oT(c,[1,1,1],-1),3))[0],i=a[1],s=a[2];var h=rF(o,.2989),p=rF(i,.587),f=rF(s,.114);u=rP(rP(h,p),f)}else u=e;return"otsu"===t&&(d=function(e,t){for(var r,n,a,o,i,s,u=tensor1d([-1]),c=tensor1d([0]),l=tensor1d([0]),d=0;d<e.size-1;d++){r=r3(e,0,d+1),n=r3(e,d+1),i=rB(nG(r),t),s=rB(nG(n),t),a=rB(nG(rF(r,range(0,r.size))),nG(r));var h=fill(n.shape,r.size),p=rP(range(0,n.size),h),f=ar(a,o=rB(nG(rF(n,p)),nG(n))),m=ar(a,o),g=rF(i,s),v=nY(l=rF(rF(g,f),m),c);c=nI(v,l,c),u=nI(v,tensor1d([d]),u)}return u}(nt(rR(oo(u),"int32"),tensor([]),256),l)),rR(rF(r?n6(u,d):nY(u,d),255),"int32")}}),o8=op({transform_:/**
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
 */function(e,t,r,n,a,o){void 0===r&&(r="nearest"),void 0===n&&(n="constant"),void 0===a&&(a=0);var i=convertToTensor(e,"image","transform","float32"),s=convertToTensor(t,"transforms","transform","float32");assert(4===i.rank,function(){return"Error in transform: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&(s.shape[0]===i.shape[0]||1===s.shape[0])&&8===s.shape[1],function(){return"Error in transform: Input transform should be batch x 8 or 1 x 8"}),assert(null==o||2===o.length,function(){return"Error in transform: outputShape must be [height, width] or null, "+"but got ".concat(o,".")});var u={interpolation:r,fillMode:n,fillValue:a,outputShape:o};return rd.runKernel(tA,{image:i,transforms:s},u)}}),o9=op({bandPart_:function(e,t,r){var n,a,o=convertToTensor(e,"a","bandPart");assert(o.rank>=2,function(){return"bandPart(): Rank must be at least 2, got ".concat(o.rank,".")});var i=o.shape,s=__read(o.shape.slice(-2),2),u=s[0],c=s[1];"number"==typeof t?(assert(t%1==0,function(){return"bandPart(): numLower must be an integer, got ".concat(t,".")}),assert(t<=u,function(){return"bandPart(): numLower (".concat(t,")")+" must not be greater than the number of rows (".concat(u,").")}),n=convertToTensor(t<0?u:t,"numLower","bandPart")):(assert("int32"===t.dtype,function(){return"bandPart(): numLower's dtype must be an int32."}),n=nI(n4(t,0),u,am(t,u))),"number"==typeof r?(assert(r%1==0,function(){return"bandPart(): numUpper must be an integer, got ".concat(r,".")}),assert(r<=c,function(){return"bandPart(): numUpper (".concat(r,")")+" must not be greater than the number of columns (".concat(c,").")}),a=convertToTensor(r<0?c:r,"numUpper","bandPart")):(assert("int32"===r.dtype,function(){return"bandPart(): numUpper's dtype must be an int32."}),a=nI(n4(r,0),c,am(r,c)));var l=ar(rY(range(0,u,1,"int32"),[-1,1]),range(0,c,1,"int32")),d=ao(n6(l,n),nX(l,n9(a))),h=zeros([u,c],o.dtype);return rY(oS(oP(rY(o,[-1,u,c])).map(function(e){return nI(d,e,h)})),i)}}),ie=op({gramSchmidt_:/**
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
 */function(e){if(Array.isArray(e)){t=!1,assert(null!=e&&e.length>0,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var t,r=e[0].shape[0],_loop_1=function(t){assert(e[t].shape[0]===r,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: "+"(".concat(e[t].shape[0]," vs. ").concat(r,")")})},n=1;n<e.length;++n)_loop_1(n)}else t=!0,e=oT(e,e.shape[0],0).map(function(e){return ox(e,[0])});assert(e.length<=e[0].shape[0],function(){return"Gram-Schmidt: Number of vectors (".concat(e.length,") exceeds ")+"number of dimensions (".concat(e[0].shape[0],").")});for(var a=[],o=e,_loop_2=function(e){a.push(rd.tidy(function(){var t=o[e];if(e>0)for(var r=0;r<e;++r){var n=rF(nG(rF(a[r],t)),a[r]);t=ar(t,n)}return rB(t,nU(t,"euclidean"))}))},n=0;n<e.length;++n)_loop_2(n);return t?oS(a,0):a}});function qr2d(e,t){return void 0===t&&(t=!1),rd.tidy(function(){assert(2===e.shape.length,function(){return"qr2d() requires a 2D Tensor, but got a ".concat(e.shape.length,"D Tensor.")});for(var r=e.shape[0],n=e.shape[1],a=nH(r),o=rO(e),i=tensor2d([[1]],[1,1]),s=rO(i),u=r>=n?n:r,_loop_1=function(e){var t,u=o,c=s,l=a;s=(t=__read(rd.tidy(function(){var t=r3(o,[e,e],[r-e,1]),u=nU(t),c=r3(o,[e,e],[1,1]),l=nI(nY(c,0),tensor2d([[-1]]),tensor2d([[1]])),d=ar(c,rF(l,u)),h=rB(t,d);s=1===h.shape[0]?rO(i):r0([i,r3(h,[1,0],[h.shape[0]-1,h.shape[1]])],0);var p=n9(rB(r1(l,d),u)),f=r3(o,[e,0],[r-e,n]),m=rF(p,s),g=oC(s);if(0===e)o=ar(f,r1(m,r1(g,f)));else{var v=ar(f,r1(m,r1(g,f)));o=r0([r3(o,[0,0],[e,n]),v],0)}var y=oC(m),b=r3(a,[0,e],[r,a.shape[1]-e]);if(0===e)a=ar(b,r1(r1(b,s),y));else{var _=ar(b,r1(r1(b,s),y));a=r0([r3(a,[0,0],[r,e]),_],1)}return[s,o,a]}),3))[0],o=t[1],a=t[2],dispose([u,c,l])},c=0;c<u;++c)_loop_1(c);return!t&&r>n&&(a=r3(a,[0,0],[r,n]),o=r3(o,[0,0],[n,n])),[a,o]})}var it=op({qr_:function(e,t){if(void 0===t&&(t=!1),assert(e.rank>=2,function(){return"qr() requires input tensor to have a rank >= 2, but got rank ".concat(e.rank)}),2===e.rank)return qr2d(e,t);var r=e.shape.slice(0,e.shape.length-2).reduce(function(e,t){return e*t}),n=oP(rY(e,[r,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),a=[],o=[];return n.forEach(function(e){var r=__read(qr2d(e,t),2),n=r[0],i=r[1];a.push(n),o.push(i)}),[rY(oS(a,0),e.shape),rY(oS(o,0),e.shape)]}});/**
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
 */t.Reduction=void 0,function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}(t.Reduction||(t.Reduction={}));var ir=op({computeWeightedLoss_:function(e,r,n){void 0===n&&(n=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var a=convertToTensor(e,"losses","computeWeightedLoss"),o=null;null!=r&&(o=convertToTensor(r,"weights","computeWeightedLoss"));var i=null==o?a:rF(a,o);if(n===t.Reduction.NONE)return i;if(n===t.Reduction.SUM)return nG(i);if(n===t.Reduction.MEAN){if(null==o)return af(i);var s=a.size/o.size,u=rB(nG(i),nG(o));return s>1?rB(u,scalar(s)):u}if(n===t.Reduction.SUM_BY_NONZERO_WEIGHTS){if(null==o)return rB(nG(i),scalar(a.size));var c=rR(nG(aT(rF(o,ones(a.shape)),scalar(0))),"float32");return rB(nG(i),c)}throw Error("Unknown reduction: ".concat(n))}}),ia=op({absoluteDifference_:/**
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
 */function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","absoluteDifference"),i=convertToTensor(r,"predictions","absoluteDifference"),s=null;return null!=n&&(s=convertToTensor(n,"weights","absoluteDifference")),assertShapesMatch(o.shape,i.shape,"Error in absoluteDifference: "),ir(rZ(ar(o,i)),s,a)}}),io=op({cosineDistance_:function(e,r,n,a,o){void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","cosineDistance"),s=convertToTensor(r,"predictions","cosineDistance"),u=null;return null!=a&&(u=convertToTensor(a,"weights","cosineDistance")),assertShapesMatch(i.shape,s.shape,"Error in cosineDistance: "),ir(ar(scalar(1),nG(rF(i,s),n,!0)),u,o)}}),ii=op({hingeLoss_:function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","hingeLoss"),i=convertToTensor(r,"predictions","hingeLoss"),s=null;null!=n&&(s=convertToTensor(n,"weights","hingeLoss")),assertShapesMatch(o.shape,i.shape,"Error in hingeLoss: ");var u=scalar(1);return o=ar(rF(scalar(2),o),u),ir(a8(ar(u,rF(o,i))),s,a)}}),is=op({huberLoss_:/**
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
 */function(e,r,n,a,o){void 0===a&&(a=1),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","huberLoss"),s=convertToTensor(r,"predictions","huberLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","huberLoss")),assertShapesMatch(i.shape,s.shape,"Error in huberLoss: ");var c=scalar(a),l=rZ(ar(s,i)),d=am(l,c),h=ar(l,d);return ir(rP(rF(scalar(.5),nL(d)),rF(c,h)),u,o)}}),iu=op({logLoss_:/**
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
 */function(e,r,n,a,o){void 0===a&&(a=1e-7),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","logLoss"),s=convertToTensor(r,"predictions","logLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","logLoss")),assertShapesMatch(i.shape,s.shape,"Error in logLoss: ");var c=scalar(1),l=scalar(a),d=n9(rF(i,n7(rP(s,l)))),h=rF(ar(c,i),n7(rP(ar(c,s),l)));return ir(ar(d,h),u,o)}}),ic=op({meanSquaredError_:/**
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
 */function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","meanSquaredError"),i=convertToTensor(r,"predictions","meanSquaredError"),s=null;return null!=n&&(s=convertToTensor(n,"weights","meanSquaredError")),assertShapesMatch(o.shape,i.shape,"Error in meanSquaredError: "),ir(ok(o,i),s,a)}}),il=op({sigmoidCrossEntropy_:function(e,r,n,a,o){void 0===a&&(a=0),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i,s,u,c,l,d=convertToTensor(e,"multiClassLabels","sigmoidCrossEntropy"),h=convertToTensor(r,"logits","sigmoidCrossEntropy"),p=null;if(null!=n&&(p=convertToTensor(n,"weights","sigmoidCrossEntropy")),assertShapesMatch(d.shape,h.shape,"Error in sigmoidCrossEntropy: "),a>0){var f=scalar(a),m=scalar(1),g=scalar(.5);d=rP(rF(d,ar(m,f)),rF(g,f))}return ir((i=convertToTensor(d,"labels","sigmoidCrossEntropyWithLogits"),s=convertToTensor(h,"logits","sigmoidCrossEntropyWithLogits"),assertShapesMatch(i.shape,s.shape,"Error in sigmoidCrossEntropyWithLogits: "),u=a8(s),c=rF(s,i),l=n8(nK(n9(rZ(s)))),rP(ar(u,c),l)),p,o)}}),id=op({softmaxCrossEntropy_:function(e,r,n,a,o){void 0===a&&(a=0),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"onehotLabels","softmaxCrossEntropy"),s=convertToTensor(r,"logits","softmaxCrossEntropy"),u=null;if(null!=n&&(u=convertToTensor(n,"weights","softmaxCrossEntropy")),assertShapesMatch(i.shape,s.shape,"Error in softmaxCrossEntropy: "),a>0){var c=scalar(a),l=scalar(1),d=scalar(i.shape[1]);i=rP(rF(i,ar(l,c)),rB(c,d))}return ir(function(e,t,r){if(void 0===r&&(r=-1),-1===r&&(r=t.rank-1),r!==t.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet "+"supported. Labels / logits was rank ".concat(t.rank," ")+"and dim was ".concat(r));return customGrad(function(e,t,n){var a=aa(t,[r],!0),o=ar(rR(t,"float32"),a);return n([e,o]),{value:nG(n9(rF(o,e)),[r]),gradFunc:function(e,t){var n=__read(t,2),a=n[0],o=n[1],i=expandShapeToKeepDim(e.shape,[r]);return[rF(rY(e,i),ar(rR(a,"float32"),nK(o))),rF(rY(e,i),ar(nK(o),rR(a,"float32")))]}}})(e,t)}(i,s),u,o)}}),ih=op({sparseFillEmptyRows_:/**
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
 */function(e,t,r,n){var a=convertToTensor(e,"indices","sparseFillEmptyRows","int32"),o=convertToTensor(t,"values","sparseFillEmptyRows"),i=convertToTensor(r,"denseShape","sparseFillEmptyRows","int32"),s=convertToTensor(n,"defaultValue","sparseFillEmptyRows",o.dtype);if(2!==a.rank)throw Error("Indices should be Tensor2D but received shape\n        ".concat(a.shape));if(1!==o.rank)throw Error("Values should be Tensor1D but received shape ".concat(o.shape));if(1!==i.rank)throw Error("Dense shape should be Tensor1D but received shape ".concat(i.shape));if(0!==s.rank)throw Error("Default value should be a scalar but received shape ".concat(s.shape));var u=rd.runKernel(tp,{indices:a,values:o,denseShape:i,defaultValue:s});return{outputIndices:u[0],outputValues:u[1],emptyRowIndicator:u[2],reverseIndexMap:u[3]}}}),ip=op({sparseReshape_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"inputIndices","sparseReshape","int32"),a=convertToTensor(t,"inputShape","sparseReshape","int32"),o=convertToTensor(r,"newShape","sparseReshape","int32");if(2!==n.rank)throw Error("Input indices should be Tensor2D but received shape\n        ".concat(n.shape));if(1!==a.rank)throw Error("Input shape should be Tensor1D but received shape ".concat(a.shape));if(1!==o.rank)throw Error("New shape should be Tensor1D but received shape ".concat(o.shape));var i=rd.runKernel(tf,{inputIndices:n,inputShape:a,newShape:o});return{outputIndices:i[0],outputShape:i[1]}}}),im=op({sparseSegmentMean_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"data","sparseSegmentMean"),a=convertToTensor(t,"indices","sparseSegmentMean","int32"),o=convertToTensor(r,"segmentIds","sparseSegmentMean","int32");if(n.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.rank)throw Error("Indices should be Tensor1D but received shape\n          ".concat(a.shape));if(1!==o.rank)throw Error("Segment ids should be Tensor1D but received shape\n          ".concat(o.shape));return rd.runKernel(tm,{data:n,indices:a,segmentIds:o})}}),ig=op({sparseSegmentSum_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"data","sparseSegmentSum"),a=convertToTensor(t,"indices","sparseSegmentSum","int32"),o=convertToTensor(r,"segmentIds","sparseSegmentSum","int32");if(n.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.rank)throw Error("Indices should be Tensor1D but received shape\n         ".concat(a.shape));if(1!==o.rank)throw Error("Segment ids should be Tensor1D but received shape\n         ".concat(o.shape));return rd.runKernel(tg,{data:n,indices:a,segmentIds:o})}}),iv=op({stringNGrams_:/**
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
 */function(e,t,r,n,a,o,i,s){var u=convertToTensor(e,"data","stringNGrams","string");if("string"!==u.dtype)throw Error("Data must be of datatype string");if(1!==u.shape.length)throw Error("Data must be a vector, saw: ".concat(u.shape));var c=convertToTensor(t,"dataSplits","stringNGrams");if("int32"!==c.dtype)throw Error("Data splits must be of datatype int32");var l=rd.runKernel(tT,{data:u,dataSplits:c},{separator:r,nGramWidths:n,leftPad:a,rightPad:o,padWidth:i,preserveShortSequences:s});return{nGrams:l[0],nGramsSplits:l[1]}}}),iy=op({stringSplit_:/**
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
 */function(e,t,r){void 0===r&&(r=!0);var n=convertToTensor(e,"input","stringSplit","string"),a=convertToTensor(t,"delimiter","stringSplit","string");if(1!==n.rank)throw Error("Input should be Tensor1D but received shape ".concat(n.shape));if(0!==a.rank)throw Error("Delimiter should be a scalar but received shape ".concat(a.shape));var o={skipEmpty:r},i=rd.runKernel(tw,{input:n,delimiter:a},o);return{indices:i[0],values:i[1],shape:i[2]}}}),ib=op({stringToHashBucketFast_:/**
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
 */function(e,t){var r=convertToTensor(e,"input","stringToHashBucketFast","string");if(t<=0)throw Error("Number of buckets must be at least 1");return rd.runKernel(tk,{input:r},{numBuckets:t})}}),i_=op({staticRegexReplace_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!0);var a=convertToTensor(e,"input","staticRegexReplace","string"),o={pattern:t,rewrite:r,replaceGlobal:n};return rd.runKernel(tb,{x:a},o)}}),iT=new Map,iw=new Map,ik=function(){function Serializable(){}return Serializable.prototype.getClassName=function(){return this.constructor.className},Serializable.fromConfig=function(e,t){return new e(t)},Serializable}(),ix=function(){function SerializationMap(){this.classNameMap={}}return SerializationMap.getMap=function(){return null==SerializationMap.instance&&(SerializationMap.instance=new SerializationMap),SerializationMap.instance},SerializationMap.register=function(e){SerializationMap.getMap().classNameMap[e.className]=[e,e.fromConfig]},SerializationMap}();function registerClass(e,t,r){assert(null!=e.className,function(){return"Class being registered does not have the static className property defined."}),assert("string"==typeof e.className,function(){return"className is required to be a string, but got type "+typeof e.className}),assert(e.className.length>0,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),void 0===t&&(t="Custom"),void 0===r&&(r=e.className);var n=t+">"+r;return ix.register(e),iT.set(n,e),iw.set(e,n),e}var iS=function(e){function Optimizer(){return null!==e&&e.apply(this,arguments)||this}return __extends(Optimizer,e),Optimizer.prototype.minimize=function(e,t,r){void 0===t&&(t=!1);var n=this.computeGradients(e,r),a=n.value,o=n.grads;if(null!=r){var i=r.map(function(e){return{name:e.name,tensor:o[e.name]}});this.applyGradients(i)}else this.applyGradients(o);return(dispose(o),t)?a:(a.dispose(),null)},Object.defineProperty(Optimizer.prototype,"iterations",{get:function(){return null==this.iterations_&&(this.iterations_=0),this.iterations_},enumerable:!1,configurable:!0}),Optimizer.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},Optimizer.prototype.computeGradients=function(e,t){return variableGrads(e,t)},Optimizer.prototype.dispose=function(){null!=this.iterations_&&dispose(this.iterations_)},Optimizer.prototype.saveIterations=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return null==this.iterations_&&(this.iterations_=0),[2,{name:"iter",tensor:scalar(this.iterations_,"int32")}]})})},Optimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for this optimizer yet.")})})},Optimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for this optimizer class "+"".concat(this.getClassName()))})})},Optimizer.prototype.extractIterations=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return t=this,[4,e[0].tensor.data()];case 1:return t.iterations_=r.sent()[0],[2,e.slice(1)]}})})},Optimizer}(ik);Object.defineProperty(iS,Symbol.hasInstance,{value:function(e){return null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients}});var iE=function(e){function AdadeltaOptimizer(t,r,n){void 0===n&&(n=null);var a=e.call(this)||this;return a.learningRate=t,a.rho=r,a.epsilon=n,a.accumulatedGrads=[],a.accumulatedUpdates=[],null==n&&(a.epsilon=rd.backend.epsilon()),a}return __extends(AdadeltaOptimizer,e),Object.defineProperty(AdadeltaOptimizer,"className",{get:function(){return"Adadelta"},enumerable:!1,configurable:!0}),AdadeltaOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accum_grad"),variable:tidy(function(){return nN(a).variable(!1)})}),null==t.accumulatedUpdates[n]&&(t.accumulatedUpdates[n]={originalName:"".concat(r,"/accum_var"),variable:tidy(function(){return nN(a).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedGrads[n].variable,s=t.accumulatedUpdates[n].variable;tidy(function(){var e=rP(rF(i,t.rho),rF(nL(o),1-t.rho)),r=rF(rB(nz(rP(s,t.epsilon)),nz(rP(i,t.epsilon))),o),n=rP(rF(s,t.rho),rF(nL(r),1-t.rho));i.assign(e),s.assign(n);var u=rP(rF(r,-t.learningRate),a);a.assign(u)})}}),this.incrementIterations()},AdadeltaOptimizer.prototype.dispose=function(){null!=this.accumulatedUpdates&&(dispose(this.accumulatedGrads.map(function(e){return e.variable})),dispose(this.accumulatedUpdates.map(function(e){return e.variable})))},AdadeltaOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedGrads),!1),__read(this.accumulatedUpdates),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdadeltaOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return t=(e=r.sent()).length/2,this.accumulatedGrads=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedUpdates=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdadeltaOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},AdadeltaOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.rho,t.epsilon)},AdadeltaOptimizer}(iS),iA=function(e){function AdagradOptimizer(t,r){void 0===r&&(r=.1);var n=e.call(this)||this;return n.learningRate=t,n.initialAccumulatorValue=r,n.accumulatedGrads=[],n}return __extends(AdagradOptimizer,e),Object.defineProperty(AdagradOptimizer,"className",{get:function(){return"Adagrad"},enumerable:!1,configurable:!0}),AdagradOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accumulator"),variable:tidy(function(){return fill(a.shape,t.initialAccumulatorValue).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedGrads[n].variable;tidy(function(){var e=rP(i,nL(o));i.assign(e);var r=rP(rF(rB(o,nz(rP(e,rd.backend.epsilon()))),-t.learningRate),a);a.assign(r)})}}),this.incrementIterations()},AdagradOptimizer.prototype.dispose=function(){null!=this.accumulatedGrads&&dispose(this.accumulatedGrads.map(function(e){return e.variable}))},AdagradOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdagradOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulatedGrads=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdagradOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},AdagradOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.initialAccumulatorValue)},AdagradOptimizer}(iS),iI=function(e){function AdamOptimizer(t,r,n,a){void 0===a&&(a=null);var o=e.call(this)||this;return o.learningRate=t,o.beta1=r,o.beta2=n,o.epsilon=a,o.accumulatedFirstMoment=[],o.accumulatedSecondMoment=[],tidy(function(){o.accBeta1=scalar(r).variable(),o.accBeta2=scalar(n).variable()}),null==a&&(o.epsilon=rd.backend.epsilon()),o}return __extends(AdamOptimizer,e),Object.defineProperty(AdamOptimizer,"className",{get:function(){return"Adam"},enumerable:!1,configurable:!0}),AdamOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=ar(1,t.accBeta1),a=ar(1,t.accBeta2);r.forEach(function(r,o){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[o]&&(t.accumulatedFirstMoment[o]={originalName:"".concat(r,"/m"),variable:tidy(function(){return nN(i).variable(!1)})}),null==t.accumulatedSecondMoment[o]&&(t.accumulatedSecondMoment[o]={originalName:"".concat(r,"/v"),variable:tidy(function(){return nN(i).variable(!1)})});var s=Array.isArray(e)?e[o].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[o].variable,c=t.accumulatedSecondMoment[o].variable,l=rP(rF(u,t.beta1),rF(s,1-t.beta1)),d=rP(rF(c,t.beta2),rF(nL(s),1-t.beta2)),h=rB(l,n),p=rB(d,a);u.assign(l),c.assign(d);var f=rP(rF(rB(h,rP(nz(p),t.epsilon)),-t.learningRate),i);i.assign(f)}}),t.accBeta1.assign(rF(t.accBeta1,t.beta1)),t.accBeta2.assign(rF(t.accBeta2,t.beta2))}),this.incrementIterations()},AdamOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedSecondMoment&&dispose(this.accumulatedSecondMoment.map(function(e){return e.variable}))},AdamOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedFirstMoment),!1),__read(this.accumulatedSecondMoment),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdamOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r=this;return __generator(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),tidy(function(){r.accBeta1.assign(nZ(r.beta1,r.iterations_+1)),r.accBeta2.assign(nZ(r.beta2,r.iterations_+1))}),t=e.length/2,this.accumulatedFirstMoment=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedSecondMoment=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdamOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},AdamOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)},AdamOptimizer}(iS),iN=function(e){function AdamaxOptimizer(t,r,n,a,o){void 0===a&&(a=null),void 0===o&&(o=0);var i=e.call(this)||this;return i.learningRate=t,i.beta1=r,i.beta2=n,i.epsilon=a,i.decay=o,i.accumulatedFirstMoment=[],i.accumulatedWeightedInfNorm=[],tidy(function(){i.iteration=scalar(0).variable(),i.accBeta1=scalar(r).variable()}),null==a&&(i.epsilon=rd.backend.epsilon()),i}return __extends(AdamaxOptimizer,e),Object.defineProperty(AdamaxOptimizer,"className",{get:function(){return"Adamax"},enumerable:!1,configurable:!0}),AdamaxOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=ar(1,t.accBeta1),a=rB(-t.learningRate,rP(rF(t.iteration,t.decay),1));r.forEach(function(r,o){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[o]&&(t.accumulatedFirstMoment[o]={originalName:"".concat(r,"/m"),variable:nN(i).variable(!1)}),null==t.accumulatedWeightedInfNorm[o]&&(t.accumulatedWeightedInfNorm[o]={originalName:"".concat(r,"/v"),variable:nN(i).variable(!1)});var s=Array.isArray(e)?e[o].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[o].variable,c=t.accumulatedWeightedInfNorm[o].variable,l=rP(rF(u,t.beta1),rF(s,1-t.beta1)),d=ap(rF(c,t.beta2),rZ(s));u.assign(l),c.assign(d);var h=rP(rF(rB(a,n),rB(l,rP(d,t.epsilon))),i);i.assign(h)}}),t.iteration.assign(rP(t.iteration,1)),t.accBeta1.assign(rF(t.accBeta1,t.beta1))}),this.incrementIterations()},AdamaxOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedWeightedInfNorm&&dispose(this.accumulatedWeightedInfNorm.map(function(e){return e.variable}))},AdamaxOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},AdamaxOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)},AdamaxOptimizer}(iS),iM=function(e){function SGDOptimizer(t){var r=e.call(this)||this;return r.learningRate=t,r.setLearningRate(t),r}return __extends(SGDOptimizer,e),Object.defineProperty(SGDOptimizer,"className",{get:function(){return"SGD"},enumerable:!1,configurable:!0}),SGDOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=Array.isArray(e)?e[n].tensor:e[r];if(null!=a){var o=rd.registeredVariables[r];tidy(function(){var e=rP(rF(t.c,a),o);o.assign(e)})}}),this.incrementIterations()},SGDOptimizer.prototype.setLearningRate=function(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=keep(scalar(-e))},SGDOptimizer.prototype.dispose=function(){this.c.dispose()},SGDOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}})})},SGDOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:if(0!==(e=t.sent()).length)throw Error("SGD optimizer does not have settable weights.");return[2]}})})},SGDOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate}},SGDOptimizer.fromConfig=function(e,t){return new e(t.learningRate)},SGDOptimizer}(iS),iD=function(e){function MomentumOptimizer(t,r,n){void 0===n&&(n=!1);var a=e.call(this,t)||this;return a.learningRate=t,a.momentum=r,a.useNesterov=n,a.accumulations=[],a.m=scalar(a.momentum),a}return __extends(MomentumOptimizer,e),Object.defineProperty(MomentumOptimizer,"className",{get:function(){return"Momentum"},enumerable:!1,configurable:!0}),MomentumOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulations[n]&&(t.accumulations[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nN(a).variable(!1)})});var o=t.accumulations[n].variable,i=Array.isArray(e)?e[n].tensor:e[r];null!=i&&tidy(function(){var e,r=rP(rF(t.m,o),i);e=t.useNesterov?rP(rF(t.c,rP(i,rF(r,t.m))),a):rP(rF(t.c,r),a),o.assign(r),a.assign(e)})}),this.incrementIterations()},MomentumOptimizer.prototype.dispose=function(){this.m.dispose(),null!=this.accumulations&&dispose(this.accumulations.map(function(e){return e.variable}))},MomentumOptimizer.prototype.setMomentum=function(e){this.momentum=e},MomentumOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},MomentumOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulations=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},MomentumOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},MomentumOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)},MomentumOptimizer}(iM),iR=function(e){function RMSPropOptimizer(t,r,n,a,o){void 0===r&&(r=.9),void 0===n&&(n=0),void 0===a&&(a=null),void 0===o&&(o=!1);var i=e.call(this)||this;if(i.learningRate=t,i.decay=r,i.momentum=n,i.epsilon=a,i.accumulatedMeanSquares=[],i.accumulatedMoments=[],i.accumulatedMeanGrads=[],i.centered=o,null==a&&(i.epsilon=rd.backend.epsilon()),null==t)throw Error("learningRate for RMSPropOptimizer must be defined.");return i}return __extends(RMSPropOptimizer,e),Object.defineProperty(RMSPropOptimizer,"className",{get:function(){return"RMSProp"},enumerable:!1,configurable:!0}),RMSPropOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedMeanSquares[n]&&(t.accumulatedMeanSquares[n]={originalName:"".concat(r,"/rms"),variable:tidy(function(){return nN(a).variable(!1)})}),null==t.accumulatedMoments[n]&&(t.accumulatedMoments[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nN(a).variable(!1)})}),null==t.accumulatedMeanGrads[n]&&t.centered&&(t.accumulatedMeanGrads[n]={originalName:"".concat(r,"/mg"),variable:tidy(function(){return nN(a).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedMeanSquares[n].variable,s=t.accumulatedMoments[n].variable;tidy(function(){var e=rP(rF(i,t.decay),rF(nL(o),1-t.decay));if(t.centered){var r=t.accumulatedMeanGrads[n].variable,u=rP(rF(r,t.decay),rF(o,1-t.decay)),c=rB(rF(o,t.learningRate),nz(ar(e,rP(nL(u),t.epsilon)))),l=rP(rF(s,t.momentum),c);i.assign(e),r.assign(u),s.assign(l);var d=ar(a,l);a.assign(d)}else{var h=rP(rF(i,t.decay),rF(nL(o),1-t.decay)),l=rP(rF(s,t.momentum),rB(rF(o,t.learningRate),nz(rP(h,t.epsilon))));i.assign(h),s.assign(l);var d=ar(a,l);a.assign(d)}})}}),this.incrementIterations()},RMSPropOptimizer.prototype.dispose=function(){null!=this.accumulatedMeanSquares&&dispose(this.accumulatedMeanSquares.map(function(e){return e.variable})),null!=this.accumulatedMeanGrads&&this.centered&&dispose(this.accumulatedMeanGrads.map(function(e){return e.variable})),null!=this.accumulatedMoments&&dispose(this.accumulatedMoments.map(function(e){return e.variable}))},RMSPropOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedMeanSquares),!1),__read(this.accumulatedMoments),!1),this.centered&&e.push.apply(e,__spreadArray([],__read(this.accumulatedMeanGrads),!1)),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},RMSPropOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),t=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedMoments=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}})),[2]}})})},RMSPropOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},RMSPropOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)},RMSPropOptimizer}(iS),iO=[iE,iA,iI,iN,iD,iR,iM];function defer(e){return new Promise(function(e){return setTimeout(e)}).then(e)}var iP=function(){function BrowserDownloads(e){if(!env().getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(BrowserDownloads.URL_SCHEME)&&(e=e.slice(BrowserDownloads.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}return BrowserDownloads.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s;return __generator(this,function(u){switch(u.label){case 0:if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");if(t=rg.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"})),!(e.modelTopology instanceof ArrayBuffer))return[3,1];throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],a=getModelJSONForModelArtifacts(e,n),o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),(i=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor).download=this.modelJsonFileName,i.href=o,[4,defer(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:if(u.sent(),!(null!=e.weightData))return[3,4];return(s=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=r,[4,defer(function(){return s.dispatchEvent(new MouseEvent("click"))})];case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e)}]}})})},BrowserDownloads}();iP.URL_SCHEME="downloads://";var iC=function(){function BrowserFiles(e){if(null==e||e.length<1)throw Error("When calling browserFiles, at least 1 file is required, "+"but received ".concat(e));this.jsonFile=e[0],this.weightsFiles=e.slice(1)}return BrowserFiles.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=new FileReader;n.onload=function(n){var a=JSON.parse(n.target.result),o=a.modelTopology;if(null==o){r(Error("modelTopology field is missing from file ".concat(e.jsonFile.name)));return}if(null==a.weightsManifest){r(Error("weightManifest field is missing from file ".concat(e.jsonFile.name)));return}if(0===e.weightsFiles.length){t({modelTopology:o});return}t(getModelArtifactsForJSON(a,function(t){return e.loadWeights(t)}))},n.onerror=function(t){return r("Failed to read model topology and weights manifest JSON "+"from file '".concat(e.jsonFile.name,"'. BrowserFiles supports loading ")+"Keras-style tf.Model artifacts only.")},n.readAsText(e.jsonFile)})]})})},BrowserFiles.prototype.loadWeights=function(e){var t,r,n=this,a=[],o=[];try{for(var i=__values(e),s=i.next();!s.done;s=i.next()){var u=s.value;a.push.apply(a,__spreadArray([],__read(u.weights),!1)),o.push.apply(o,__spreadArray([],__read(u.paths),!1))}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}var c=this.checkManifestAndWeightFiles(e);return Promise.all(o.map(function(e){return n.loadWeightsFile(e,c[e])})).then(function(e){return[a,e]})},BrowserFiles.prototype.loadWeightsFile=function(e,t){return new Promise(function(r,n){var a=new FileReader;a.onload=function(e){r(e.target.result)},a.onerror=function(t){return n("Failed to weights data from file of path '".concat(e,"'."))},a.readAsArrayBuffer(t)})},BrowserFiles.prototype.checkManifestAndWeightFiles=function(e){var t,r,n=this,a=[],o=this.weightsFiles.map(function(e){return basename(e.name)}),i={};try{for(var s=__values(e),u=s.next();!u.done;u=s.next())u.value.paths.forEach(function(e){var t=basename(e);if(-1!==a.indexOf(t))throw Error("Duplicate file basename found in weights manifest: "+"'".concat(t,"'"));if(a.push(t),-1===o.indexOf(t))throw Error("Weight file with basename '".concat(t,"' is not provided."));i[e]=n.weightsFiles[o.indexOf(t)]})}catch(e){t={error:e}}finally{try{u&&!u.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}if(a.length!==this.weightsFiles.length)throw Error("Mismatch in the number of files in weights manifest "+"(".concat(a.length,") and the number of weight files provided ")+"(".concat(this.weightsFiles.length,")."));return i},BrowserFiles}();/**
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
 */function monitorPromisesProgress(e,t,r,n){assert(null!=e&&Array.isArray(e)&&e.length>0,function(){return"promises must be a none empty array"}),a=r=null==r?0:r,o=n=null==n?1:n,assert(a>=0&&a<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got startFraction ".concat(a)}),assert(o>=0&&o<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got endFraction ".concat(o)}),assert(o>=a,function(){return"startFraction must be no more than endFraction, but "+"got startFraction ".concat(a," and endFraction ")+"".concat(o)});var a,o,i=0;return Promise.all(e.map(function(a){return a.then(function(a){return t(r+ ++i/e.length*(n-r)),a}),a}))}function loadWeightsAsArrayBuffer(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:if(null==t&&(t={}),r=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,n=e.map(function(e){return r(e,t.requestInit,{isBinary:!0})}),a=0,o=.5,null!=t.onProgress)return[3,2];return[4,Promise.all(n)];case 1:return i=d.sent(),[3,4];case 2:return[4,monitorPromisesProgress(n,t.onProgress,a,o)];case 3:i=d.sent(),d.label=4;case 4:if(s=i.map(function(e){return e.arrayBuffer()}),u=.5,c=1,null!=t.onProgress)return[3,6];return[4,Promise.all(s)];case 5:return l=d.sent(),[3,8];case 6:return[4,monitorPromisesProgress(s,t.onProgress,u,c)];case 7:l=d.sent(),d.label=8;case 8:return[2,l]}})})}function weightsLoaderFactory(e){var t=this;return function(r,n,a){return void 0===n&&(n=""),__awaiter(t,void 0,void 0,function(){var t,o,i,s,u,c,l,d,h,p;return __generator(this,function(f){switch(f.label){case 0:if(t=r.map(function(){return!1}),o={},i=null!=a?a.map(function(){return!1}):[],s=[],r.forEach(function(e,r){var n=0;e.weights.forEach(function(e){var u=rm["quantization"in e?e.quantization.dtype:e.dtype]*sizeFromShape(e.shape),enqueueWeightsForFetchingFn=function(){t[r]=!0,null==o[r]&&(o[r]=[]),o[r].push({manifestEntry:e,groupOffset:n,sizeBytes:u})};null!=a?a.forEach(function(t,r){t===e.name&&(enqueueWeightsForFetchingFn(),i[r]=!0)}):enqueueWeightsForFetchingFn(),s.push(e.name),n+=u})}),!i.every(function(e){return e}))throw u=a.filter(function(e,t){return!i[t]}),Error("Could not find weights in manifest with names: "+"".concat(u.join(", "),". \n")+"Manifest JSON has weights with names: "+"".concat(s.join(", "),"."));return c=t.reduce(function(e,t,r){return t&&e.push(r),e},[]),l=[],c.forEach(function(e){r[e].paths.forEach(function(e){var t=n+(n.endsWith("/")?"":"/")+e;l.push(t)})}),[4,e(l)];case 1:return d=f.sent(),h={},p=0,c.forEach(function(e){var t=r[e].paths.length,n=new rg(d.slice(p,p+t));o[e].forEach(function(e){var t=decodeWeights(n.slice(e.groupOffset,e.groupOffset+e.sizeBytes),[e.manifestEntry]);for(var r in t)h[r]=t[r]}),p+=t}),[2,h]}})})}}ry.registerSaveRouter(function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(iP.URL_SCHEME)?(void 0===(t=e.slice(iP.URL_SCHEME.length))&&(t="model"),new iP(t)):null});var iB=function(){function HTTPRequest(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(assert("function"==typeof t.fetchFunc,function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=t.fetchFunc):this.fetch=env().platform.fetch,assert(null!=e&&e.length>0,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(e)&&assert(2===e.length,function(){return"URL paths for http must have a length of 2, "+"(actual length is ".concat(e.length,").")}),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}return HTTPRequest.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o;return __generator(this,function(i){switch(i.label){case 0:if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=getModelJSONForModelArtifacts(e,r),t.body.append("model.json",new Blob([JSON.stringify(n)],{type:"application/json"}),"model.json"),null!=e.weightData&&(a=rg.join(e.weightData),t.body.append("model.weights.bin",new Blob([a],{type:"application/octet-stream"}),"model.weights.bin")),[4,this.fetch(this.path,t)];case 1:if((o=i.sent()).ok)return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e),responses:[o]}];throw Error("BrowserHTTPRequest.save() failed due to HTTP response status "+"".concat(o.status,"."))}})})},HTTPRequest.prototype.loadModelJSON=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a;return __generator(this,function(o){switch(o.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(e=o.sent()).ok)throw Error("Request to ".concat(this.path," failed with status code ")+"".concat(e.status,". Please verify this URL points to ")+"the model JSON of the model to load.");o.label=2;case 2:return o.trys.push([2,4,,5]),[4,e.json()];case 3:return t=o.sent(),[3,5];case 4:throw o.sent(),r="Failed to parse model JSON of response from ".concat(this.path,"."),this.path.endsWith(".pb")?r+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":r+=" Please make sure the server is serving valid JSON for this request.",Error(r);case 5:if(n=t.modelTopology,a=t.weightsManifest,null==n&&null==a)throw Error("The JSON from HTTP path ".concat(this.path," contains neither model ")+"topology or manifest for weights.");return[2,t]}})})},HTTPRequest.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:if(this.loadOptions.streamWeights)return[2,this.loadStream()];return[4,this.loadModelJSON()];case 1:return[2,getModelArtifactsForJSON(t.sent(),function(t){return e.loadWeights(t)})]}})})},HTTPRequest.prototype.loadStream=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a=this;return __generator(this,function(o){switch(o.label){case 0:return[4,this.loadModelJSON()];case 1:return e=o.sent(),[4,this.getWeightUrls(e.weightsManifest)];case 2:return t=o.sent(),r=getWeightSpecs(e.weightsManifest),n=function(){return function(e,t){var r,n,a=this,o=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,i=0;return null===(r=t.onProgress)||void 0===r||r.call(t,0),new ReadableStream({pull:function(r){return __awaiter(a,void 0,void 0,function(){var a,s,u,c;return __generator(this,function(l){switch(l.label){case 0:if(!(i<e.length))return[3,4];if(n)return[3,2];return[4,o(e[i],t.requestInit,{isBinary:!0})];case 1:n=l.sent().body.getReader(),l.label=2;case 2:return[4,n.read()];case 3:if(u=(s=l.sent()).done,c=s.value,u)return i++,n=void 0,null===(a=t.onProgress)||void 0===a||a.call(t,i/e.length),[3,0];return r.enqueue(c),[2];case 4:return r.close(),[2]}})})}})}(t,a.loadOptions)},[2,Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:n})]}})})},HTTPRequest.prototype.getWeightUrls=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s,u,c,l,d,h,p,f,m,g,v,y,b,_;return __generator(this,function(T){switch(T.label){case 0:var w,k,x;r=(t=__read((k=(w=Array.isArray(this.path)?this.path[1]:this.path).lastIndexOf("/"),x=w.lastIndexOf("?"),[w.substring(0,k)+"/",x>k?w.substring(x):""]),2))[0],n=t[1],a=this.weightPathPrefix||r,o=[],i=[];try{for(u=(s=__values(e)).next();!u.done;u=s.next()){c=u.value;try{for(b=void 0,d=(l=__values(c.paths)).next();!d.done;d=l.next())h=d.value,null!=this.weightUrlConverter?i.push(this.weightUrlConverter(h)):o.push(a+h+n)}catch(e){b={error:e}}finally{try{d&&!d.done&&(_=l.return)&&_.call(l)}finally{if(b)throw b.error}}}}catch(e){v={error:e}}finally{try{u&&!u.done&&(y=s.return)&&y.call(s)}finally{if(v)throw v.error}}if(!this.weightUrlConverter)return[3,2];return f=(p=o.push).apply,m=[o],g=[[]],[4,Promise.all(i)];case 1:f.apply(p,m.concat([__spreadArray.apply(void 0,g.concat([__read.apply(void 0,[T.sent()]),!1]))])),T.label=2;case 2:return[2,o]}})})},HTTPRequest.prototype.loadWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:return[4,this.getWeightUrls(e)];case 1:return t=a.sent(),r=getWeightSpecs(e),[4,loadWeightsAsArrayBuffer(t,this.loadOptions)];case 2:return n=a.sent(),[2,[r,n]]}})})},HTTPRequest}();function isHTTPScheme(e){return null!=e.match(iB.URL_SCHEME_REGEX)}iB.URL_SCHEME_REGEX=/^https?:\/\//;var httpRouter=function(e,t){if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else if(Array.isArray(e)?e.every(function(e){return isHTTPScheme(e)}):isHTTPScheme(e))return http(e,t);return null};function http(e,t){return new iB(e,t)}ry.registerSaveRouter(httpRouter),ry.registerLoadRouter(httpRouter);/**
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
 */var iF=function(){function PassthroughLoader(e){this.modelArtifacts=e}return PassthroughLoader.prototype.load=function(){return this.modelArtifacts},PassthroughLoader}(),iZ=function(){function PassthroughSaver(e){this.saveHandler=e}return PassthroughSaver.prototype.save=function(e){return this.saveHandler(e)},PassthroughSaver}(),PassthroughAsync=function(e){e.load&&(this.load=function(){return Promise.resolve(e.load())}),e.save&&(this.save=function(t){return Promise.resolve(e.save(t))})};function fromMemorySync(e,t,r,n){return 1!=arguments.length?(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iF({modelTopology:e,weightSpecs:t,weightData:r,trainingConfig:n})):null!=e.modelTopology||null!=e.weightSpecs?new iF(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iF({modelTopology:e}))}var iz=op({confusionMatrix_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"labels","confusionMatrix"),a=convertToTensor(t,"predictions","confusionMatrix");assert(null==r||r>0&&Number.isInteger(r),function(){return"If provided, numClasses must be a positive integer, "+"but got ".concat(r)}),assert(1===n.rank,function(){return"Expected the rank of labels to be 1, but got ".concat(n.rank)}),assert(1===a.rank,function(){return"Expected the rank of predictions to be 1, "+"but got ".concat(a.rank)}),assert(n.shape[0]===a.shape[0],function(){return"Mismatch in the number of examples: "+"".concat(n.shape[0]," vs. ").concat(a.shape[0],". ")+"Labels and predictions should have the same number of elements."}),assert(r>0&&Number.isInteger(r),function(){return"numClasses is required to be a positive integer, but got "+"".concat(r)});var o=aw(rR(n,"int32"),r),i=aw(rR(a,"int32"),r);return rR(r1(oC(o),i),"int32")}}),iL=!1;function fromPixels_(e,t){if(void 0===t&&(t=3),t>4)throw Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw Error("pixels passed to tf.browser.fromPixels() can not be null");var r,n,a=!1,o=!1,i=!1,s=!1,u=!1,c=!1;if(e.data instanceof Uint8Array)a=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)o=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)i=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)s=!0;else if(null!=e.getContext)u=!0;else if("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)c=!0;else throw Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, "+"but was ".concat(e.constructor.name));if(null!=getKernel(tP,rd.backendName)){var d={numChannels:t};return rd.runKernel(tP,{pixels:e},d)}var h=__read(i?[e.videoWidth,e.videoHeight]:[e.width,e.height],2),p=h[0],f=h[1];if(u)r=e.getContext("2d").getImageData(0,0,p,f).data;else if(o||a)r=e.data;else if(s||i||c){if(null==l){if("undefined"==typeof document){if("undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof OffscreenCanvasRenderingContext2D)l=new OffscreenCanvas(1,1).getContext("2d");else throw Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.")}else l=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})}l.canvas.width=p,l.canvas.height=f,l.drawImage(e,0,0,p,f),r=l.getImageData(0,0,p,f).data}if(4===t)n=new Int32Array(r);else{var m=p*f;n=new Int32Array(m*t);for(var g=0;g<m;g++)for(var v=0;v<t;++v)n[g*t+v]=r[4*g+v]}return tensor3d(n,[f,p,t],"int32")}function validateImgTensor(e){if(2!==e.rank&&3!==e.rank)throw Error("toPixels only supports rank 2 or 3 tensors, got rank ".concat(e.rank,"."));var t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw Error("toPixels only supports depth of size "+"1, 3 or 4 but got ".concat(t));if("float32"!==e.dtype&&"int32"!==e.dtype)throw Error("Unsupported type for toPixels: ".concat(e.dtype,".")+" Please use float32 or int32 tensors.")}var iG=op({fromPixels_:fromPixels_});function prepareAndValidate(e,t){var r=e.shape.length,n=t.shape.length;if(r<1)throw Error("tf.gatherND() expects the input to be rank 1 or higher,"+" but the rank was ".concat(r,"."));if(n<1)throw Error("tf.gatherND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(n,"."));if("int32"!==t.dtype)throw Error("tf.gatherND() expects the indices to be int32 type,"+" but the dtype was ".concat(t.dtype,"."));if(t.shape[n-1]>r)throw Error("index innermost dimension length must be <= tensor rank; saw: "+"".concat(t.shape[n-1]," vs. ").concat(r));if(0===sizeFromShape(e.shape))throw Error("Requested more than 0 entries, but input is empty."+" Input shape: ".concat(e.shape,"."));for(var a=t.shape,o=a[a.length-1],i=1,s=0;s<a.length-1;++s)i*=a[s];var u=e.shape,c=a.slice();c.pop();for(var l=1,s=o;s<r;++s)l*=u[s],c.push(u[s]);var d=__spreadArray(__spreadArray([],__read(computeStrides(e.shape).map(function(e){return e/l})),!1),[1],!1).slice(0,o);return[c,i,l,d]}function stridesWithElidedDims(e,t,r,n){for(var a=__spreadArray([],__read(e),!1),o=a.length;o<n.length;o++)a.push(1);for(var o=0;o<r;o++)0===o?a[t]=1:(a.splice(t,0,1),a.pop());return a}function getElidedAxes(e,t){for(var r=[],n=0;n<e;n++)r.push(t+n);return r}function startIndicesWithElidedDims(e,t,r,n,a){for(var o=__spreadArray([],__read(a),!1),i=getElidedAxes(r,t),s=0;s<o.length;s++)if(i.indexOf(s)>-1)o[s]=0;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=0),o[s]=l}return o}function stopIndicesWithElidedDims(e,t,r,n,a){for(var o=__spreadArray([],__read(a),!1),i=getElidedAxes(r,t),s=0;s<o.length;s++)if(i.indexOf(s)>-1)o[s]=Number.MAX_SAFE_INTEGER;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=Number.MAX_SAFE_INTEGER),o[s]=l}for(var d=0;d<o.length;d++){var h=a[d];o[d]<0&&(o[d]+=h),o[d]=clamp(0,o[d],a[d])}return o}function stridesForAxis(e,t,r){var n=e[t];return(r&1<<t||null==n)&&(n=1),n}function startForAxis(e,t,r,n,a,o){var i=t[a],s=r[a]||1;(e&1<<a||o&1<<a||null==i)&&(i=s>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var u=n[a];return i<0&&(i+=u),i=clamp(0,i,u-1)}function stopForAxis(e,t,r,n,a,o){var i=t[a],s=r[a]||1;(e&1<<a||o&1<<a||null==i)&&(i=s>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var u=n[a];return i<0&&(i+=u),i=s>0?clamp(0,i,u):clamp(-1,i,u-1)}function canonical(e,t,r,n,a,o){if(a[t])return r>0?o[t]:o[t+1&1];var i=e<0?n+e:e;return i<o[0]?o[0]:i>o[1]?o[1]:i}var iU={__proto__:null,assertParamsValid:function(e,t,r){var n=e.shape.length;assert(n===t.length,function(){return"Error in slice".concat(n,"D: Length of begin ").concat(t," must ")+"match the rank of the array (".concat(n,").")}),assert(n===r.length,function(){return"Error in slice".concat(n,"D: Length of size ").concat(r," must ")+"match the rank of the array (".concat(n,").")});for(var _loop_1=function(a){assert(t[a]+r[a]<=e.shape[a],function(){return"Error in slice".concat(n,"D: begin[").concat(a,"] + size[").concat(a,"] ")+"(".concat(t[a]+r[a],") would overflow input.shape[").concat(a,"] (").concat(e.shape[a],")")})},a=0;a<n;++a)_loop_1(a)},computeFlatOffset:function(e,t){for(var r=e.length>0?e[e.length-1]:1,n=0;n<e.length-1;n++)r+=e[n]*t[n];return r},computeOutShape:function(e,t,r){for(var n=[],a=0;a<e.length;a++)n[a]=Math.ceil((t[a]-e[a])/r[a]);return n},getNormalizedAxes:function(e,t,r,n,a,o,i,s,u){var c=e.length,l=Array(c),d=Array(c),h=Array(c);if(t.length&&r>0){var p=t[0],f=r+1;l=startIndicesWithElidedDims(i,p,f,n,e),d=stopIndicesWithElidedDims(s,p,f,a,e),h=stridesWithElidedDims(o,p,f,e)}else for(var m=0;m<c;m++)l[m]=startForAxis(i,n,o,e,m,u),d[m]=stopForAxis(s,a,o,e,m,u),h[m]=stridesForAxis(o,m,u);return{begin:l,end:d,strides:h}},isSliceContinous:function(e,t,r){for(var n=r.length,a=0;a<r.length;a++)if(r[a]>1){n=a;break}for(var a=n+1;a<r.length;a++)if(t[a]>0||r[a]!==e[a])return!1;return!0},maskToAxes:function(e){for(var t=[],r=0;e>0;)1&e&&t.push(r),e/=2,r++;return t},parseSliceParams:function(e,t,r){var n,a,o=e.shape.length;return(n="number"==typeof t?__spreadArray([t],__read(Array(o-1).fill(0)),!1):t.length<o?t.concat(Array(o-t.length).fill(0)):t.slice()).forEach(function(e){assert(-1!==e,function(){return"slice() does not support negative begin indexing."})}),a=(a=null==r?Array(o).fill(-1):"number"==typeof r?__spreadArray([r],__read(Array(o-1).fill(-1)),!1):r.length<o?r.concat(Array(o-r.length).fill(-1)):r).map(function(t,r){return t>=0?t:(assert(-1===t,function(){return"Negative size values should be exactly -1 but got "+"".concat(t," for the slice() size at index ").concat(r,".")}),e.shape[r]-n[r])}),[n,a]},sliceInfo:function(e,t,r,n,a,o,i,s,u){if(null==n?(c=Array(t.length)).fill(1):c=n,null!=i&&(i&i-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");for(var c,l=!1,d={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:r.slice(),strides:c.slice(),beginMask:a,endMask:o,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u},h=0;h<d.dims;h++)l&&(1<<h&s)!=0&&d.numAddAxisAfterEllipsis++,1<<h&i&&(l=!0);!l&&(d.ellipsisMask|=1<<d.dims,d.dims++);var p={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};(function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;var r=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(var n=0;n<e.dims;n++)if(1<<n&e.ellipsisMask)for(var a=Math.min(t.dims-(e.dims-n)+1+e.numAddAxisAfterEllipsis,t.dims);r<a;r++)t.begin[r]=0,t.end[r]=0,t.strides[r]=1,t.beginMask|=1<<r,t.endMask|=1<<r,t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[r]=n;else if(1<<n&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(r===t.begin.length)throw Error("Index out of range using input dim ".concat(r,"; input ")+"has only ".concat(t.dims," dims, ").concat(t.begin.length,"."));null!=e.begin&&(t.begin[r]=e.begin[n]),null!=e.end&&(t.end[r]=e.end[n]),t.strides[r]=e.strides[n],e.beginMask&1<<n&&(t.beginMask|=1<<r),e.endMask&1<<n&&(t.endMask|=1<<r),e.shrinkAxisMask&1<<n?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<r):(t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(n)),t.inputShapeGatherIndicesSparse[r]=n,r++}})(d,p);for(var f=!0,m=!0,g=!0,v=[],y=[],h=0;h<e.length;++h){if(0===p.strides[h])throw Error("strides[".concat(h,"] must be non-zero"));var b=!!(p.shrinkAxisMask&1<<h),_=e[h];if(-1===_){v.push(b?1:-1);continue}var T=[p.beginMask&1<<h,p.endMask&1<<h],w=[p.strides[h]>0?0:-1,p.strides[h]>0?_:_-1];if(b&&p.strides[h]<=0)throw Error("only stride 1 allowed on non-range indexing.");g=g&&1===p.strides[h];var k=!!(p.beginMask&1<<h&&p.endMask&1<<h);if(p.beginValid&&p.endValid){if(b){var x=p.begin[h]<0?_+p.begin[h]:p.begin[h];if(p.begin[h]=x,p.end[h]=p.begin[h]+1,x<0||x>=_)throw Error("slice index ".concat(p.begin[h]," of dimension ").concat(h," out of bounds."))}else p.begin[h]=canonical(p.begin[h],0,p.strides[h],_,T,w),p.end[h]=canonical(p.end[h],1,p.strides[h],_,T,w);var S=1===p.strides[h]&&0===p.begin[h]&&p.end[h]===_;f=f&&S,m=m&&(0===h&&1===p.strides[h]||S)}else f=f&&1===p.strides[h]&&k,m=m&&(0===h&&1===p.strides[h]||k);var E=void 0,A=!1;if(p.beginValid&&p.endValid?(E=p.end[h]-p.begin[h],A=!0):b?(E=1,A=!0):k&&_>=0&&(E=p.strides[h]<0?-_:_,A=!0),A){var I=void 0;I=0===E||E<0!=p.strides[h]<0?0:Math.trunc(E/p.strides[h])+(E%p.strides[h]!=0?1:0),v.push(I)}else v.push(-1)}for(var N=0;N<p.finalShapeGatherIndices.length;++N){var M=p.finalShapeGatherIndices[N];M>=0?y.push(v[M]):-2===M&&y.push(1)}return{finalShapeSparse:y.filter(function(e,t){return -2!==p.finalShapeGatherIndices[t]}),finalShape:y,isIdentity:f,sliceDim0:m,isSimpleSlice:g,begin:p.begin,end:p.end,strides:p.strides}},startForAxis:startForAxis,startIndicesWithElidedDims:startIndicesWithElidedDims,stopForAxis:stopForAxis,stopIndicesWithElidedDims:stopIndicesWithElidedDims,stridesForAxis:stridesForAxis,stridesWithElidedDims:stridesWithElidedDims},iW=function(){function OptimizerConstructors(){}return OptimizerConstructors.sgd=function(e){return new iM(e)},OptimizerConstructors.momentum=function(e,t,r){return void 0===r&&(r=!1),new iD(e,t,r)},OptimizerConstructors.rmsprop=function(e,t,r,n,a){return void 0===t&&(t=.9),void 0===r&&(r=0),void 0===n&&(n=null),void 0===a&&(a=!1),new iR(e,t,r,n,a)},OptimizerConstructors.adam=function(e,t,r,n){return void 0===e&&(e=.001),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),new iI(e,t,r,n)},OptimizerConstructors.adadelta=function(e,t,r){return void 0===e&&(e=.001),void 0===t&&(t=.95),void 0===r&&(r=null),new iE(e,t,r)},OptimizerConstructors.adamax=function(e,t,r,n,a){return void 0===e&&(e=.002),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),void 0===a&&(a=0),new iN(e,t,r,n,a)},OptimizerConstructors.adagrad=function(e,t){return void 0===t&&(t=.1),new iA(e,t)},OptimizerConstructors}(),iK="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:function(e){return e()};!function(e){e[e.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",e[e.VALUE_ROWIDS=1]="VALUE_ROWIDS",e[e.ROW_LENGTHS=2]="ROW_LENGTHS",e[e.ROW_SPLITS=3]="ROW_SPLITS",e[e.ROW_LIMITS=4]="ROW_LIMITS",e[e.ROW_STARTS=5]="ROW_STARTS"}(d||(d={}));var ij=/->/g;/**
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
 */(function(){var e,t;try{for(var r=__values(iO),n=r.next();!n.done;n=r.next()){var a=n.value;registerClass(a)}}catch(t){e={error:t}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}})(),t.Abs="Abs",t.Acos=g,t.Acosh=v,t.AdadeltaOptimizer=iE,t.AdagradOptimizer=iA,t.AdamOptimizer=iI,t.AdamaxOptimizer=iN,t.Add="Add",t.AddN=y,t.All="All",t.Any="Any",t.ArgMax=b,t.ArgMin=_,t.Asin=T,t.Asinh=w,t.Atan=k,t.Atan2=S,t.Atanh=x,t.AvgPool=E,t.AvgPool3D=A,t.AvgPool3DGrad="AvgPool3DGrad",t.AvgPoolGrad="AvgPoolGrad",t.BatchMatMul=I,t.BatchToSpaceND=N,t.Bincount=M,t.BitwiseAnd=D,t.BroadcastArgs=R,t.BroadcastTo="BroadcastTo",t.Cast=O,t.Ceil=P,t.ClipByValue=C,t.Complex=B,t.ComplexAbs=F,t.Concat=Z,t.Conv2D=z,t.Conv2DBackpropFilter=L,t.Conv2DBackpropInput=G,t.Conv3D=U,t.Conv3DBackpropFilterV2="Conv3DBackpropFilterV2",t.Conv3DBackpropInputV2=W,t.Cos="Cos",t.Cosh=K,t.CropAndResize=q,t.Cumprod=j,t.Cumsum=V,t.DataStorage=h,t.DenseBincount=H,t.DepthToSpace=$,t.DepthwiseConv2dNative=J,t.DepthwiseConv2dNativeBackpropFilter=Y,t.DepthwiseConv2dNativeBackpropInput=X,t.Diag=Q,t.Dilation2D=ee,t.Dilation2DBackpropFilter="Dilation2DBackpropFilter",t.Dilation2DBackpropInput="Dilation2DBackpropInput",t.Draw=et,t.Einsum=en,t.Elu="Elu",t.EluGrad="EluGrad",t.Environment=m,t.Equal=ea,t.Erf="Erf",t.Exp="Exp",t.ExpandDims=eo,t.Expm1=ei,t.FFT="FFT",t.Fill=es,t.FlipLeftRight=eu,t.Floor=ec,t.FloorDiv=el,t.FromPixels=tP,t.FusedBatchNorm=ed,t.FusedConv2D=tF,t.FusedDepthwiseConv2D=tZ,t.GatherNd=ep,t.GatherV2=eh,t.Greater=ef,t.GreaterEqual=em,t.IFFT=ev,t.Identity=eg,t.Imag=ey,t.IsFinite=eb,t.IsInf=e_,t.IsNan=eT,t.KernelBackend=p,t.LRN="LRN",t.LRNGrad="LRNGrad",t.LeakyRelu=ew,t.Less=ek,t.LessEqual=ex,t.LinSpace=eS,t.Log="Log",t.Log1p=eE,t.LogSoftmax="LogSoftmax",t.LogicalAnd=eA,t.LogicalNot=eI,t.LogicalOr=eN,t.LogicalXor="LogicalXor",t.LowerBound="LowerBound",t.MatrixBandPart="MatrixBandPart",t.Max="Max",t.MaxPool=eD,t.MaxPool3D=eR,t.MaxPool3DGrad="MaxPool3DGrad",t.MaxPoolGrad="MaxPoolGrad",t.MaxPoolWithArgmax=eO,t.Maximum=eM,t.Mean=eP,t.Min="Min",t.Minimum=eC,t.MirrorPad=eB,t.Mod="Mod",t.MomentumOptimizer=iD,t.Multinomial=eF,t.Multiply=eZ,t.Neg="Neg",t.NonMaxSuppressionV3=eL,t.NonMaxSuppressionV4=eG,t.NonMaxSuppressionV5=eU,t.NotEqual=ez,t.OP_SCOPE_SUFFIX=rp,t.OneHot=eK,t.OnesLike=eW,t.Optimizer=iS,t.OptimizerConstructors=iW,t.Pack=ej,t.PadV2=eV,t.Pool="Pool",t.Pow="Pow",t.Prelu=eq,t.Prod=eH,t.RMSPropOptimizer=iR,t.RaggedGather=e$,t.RaggedRange=eJ,t.RaggedTensorToTensor=eY,t.Range=eX,t.Real=eQ,t.RealDiv=er,t.Reciprocal=e0,t.Relu=e1,t.Relu6=e6,t.Reshape=e2,t.ResizeBilinear=e4,t.ResizeBilinearGrad="ResizeBilinearGrad",t.ResizeNearestNeighbor=e3,t.ResizeNearestNeighborGrad="ResizeNearestNeighborGrad",t.Reverse=e5,t.RotateWithOffset=tC,t.Round=e7,t.Rsqrt=e8,t.SGDOptimizer=iM,t.ScatterNd=e9,t.SearchSorted=tt,t.Select=tr,t.Selu=tn,t.Sigmoid=ts,t.Sign=ti,t.Sin="Sin",t.Sinh=to,t.Slice=ta,t.Softmax=th,t.Softplus=tu,t.SpaceToBatchND=tl,t.SparseFillEmptyRows=tp,t.SparseReshape=tf,t.SparseSegmentMean=tm,t.SparseSegmentSum=tg,t.SparseToDense=tv,t.SplitV=td,t.Sqrt=tc,t.Square="Square",t.SquaredDifference=ty,t.StaticRegexReplace=tb,t.Step=tO,t.StridedSlice=t_,t.StringNGrams=tT,t.StringSplit=tw,t.StringToHashBucketFast=tk,t.Sub="Sub",t.Sum="Sum",t.Tan="Tan",t.Tanh=tx,t.Tensor=ri,t.TensorBuffer=rn,t.TensorScatterUpdate=te,t.Tile=tS,t.TopK=tE,t.Transform=tA,t.Transpose=tI,t.Unique=tN,t.Unpack=tM,t.UnsortedSegmentSum=tD,t.UpperBound="UpperBound",t.Variable=rs,t.ZerosLike=tR,t._FusedMatMul=tB,t.abs=rZ,t.acos=rz,t.acosh=rL,t.add=rP,t.addN=rG,t.all=rU,t.any=rW,t.argMax=rK,t.argMin=rj,t.asin=rV,t.asinh=rq,t.atan=rH,t.atan2=r$,t.atanh=rJ,t.avgPool=rX,t.avgPool3d=rQ,t.backend=backend,t.backend_util={__proto__:null,ERF_A1:.254829592,ERF_A2:-.284496736,ERF_A3:1.421413741,ERF_A4:-1.453152027,ERF_A5:1.061405429,ERF_P:.3275911,PARALLELIZE_THRESHOLD:30,get RowPartitionType(){return d},SELU_SCALE:1.0507009873554805,SELU_SCALEALPHA:1.7580993408473768,applyActivation:applyActivation,assertAndGetBroadcastShape:assertAndGetBroadcastShape,assertAxesAreInnerMostDims:function(e,t,r){assert(axesAreInnerMostDims(t,r),function(){return"".concat(e," supports only inner-most axes for now. ")+"Got axes ".concat(t," and rank-").concat(r," input.")})},assertParamsConsistent:/**
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
 */function(e,t){var r=e[0].length;e.forEach(function(e,t){assert(e.length===r,function(){return"Error in concat".concat(r,"D: rank of tensors[").concat(t,"] must be the same ")+"as the rank of the rest (".concat(r,")")})}),assert(t>=0&&t<r,function(){return"Error in concat".concat(r,"D: axis must be between 0 and ").concat(r-1,".")});var n=e[0];e.forEach(function(e,a){for(var o=0;o<r;o++)assert(o===t||e[o]===n[o],function(){return"Error in concat".concat(r,"D: Shape of tensors[").concat(a,"] (").concat(e,") ")+"does not match the shape of the rest (".concat(n,") ")+"along the non-concatenated axis ".concat(a,".")})})},assignToTypedArray:function(e,t,r,n){e[2*n]=t,e[2*n+1]=r},axesAreInnerMostDims:axesAreInnerMostDims,calculateShapes:calculateShapes,checkEinsumDimSizes:function(e,t,r){for(var n=Array(e),_loop_2=function(e){for(var a=r[e].shape,_loop_3=function(r){void 0===n[t[e][r]]?n[t[e][r]]=a[r]:assert(n[t[e][r]]===a[r],function(){return"Expected dimension ".concat(n[t[e][r]]," at axis ").concat(r," ")+"of input shaped ".concat(JSON.stringify(a),", ")+"but got dimension ".concat(a[r])})},o=0;o<t[e].length;++o)_loop_3(o)},a=0;a<r.length;++a)_loop_2(a)},checkPadOnDimRoundingMode:checkPadOnDimRoundingMode,combineLocations:combineLocations,combineRaggedTensorToTensorShapes:function(e,t,r){var n=[];if(null==r&&null==t)return n;if(null==t)for(;n.length<e+r.length;)n.push(-1);else n=t.slice();if(null==r)return n;if(e+r.length!==n.length)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.rank = ").concat(e+r.length,", but shape.rank = ").concat(n.length));for(var a=1;a<r.length;++a){var o=r[a],i=n[n.length-r.length+a],s=n[i];if(o>=0){if(s>=0){if(s!==o)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.shape[").concat(a+e,"] = ").concat(o," but shape[").concat(a+e,"] = ").concat(s))}else n[i]=o}}return n},complexWithEvenIndex:function(e){for(var t=Math.ceil(e.length/4),r=new Float32Array(t),n=new Float32Array(t),a=0;a<e.length;a+=4)r[Math.floor(a/4)]=e[a],n[Math.floor(a/4)]=e[a+1];return{real:r,imag:n}},complexWithOddIndex:function(e){for(var t=Math.floor(e.length/4),r=new Float32Array(t),n=new Float32Array(t),a=2;a<e.length;a+=4)r[Math.floor(a/4)]=e[a],n[Math.floor(a/4)]=e[a+1];return{real:r,imag:n}},computeConv2DInfo:computeConv2DInfo,computeConv3DInfo:computeConv3DInfo,computeDefaultPad:computeDefaultPad,computeDilation2DInfo:function(e,t,r,n,a,o){void 0===a&&(a="NHWC");var i=e[3];return computeConv2DInfo(e,__spreadArray(__spreadArray([],__read(t),!1),[i],!1),r,o,n,null,null,convertConv2DDataFormat(a))},computeOptimalWindowSize:function(e){return e<=30?e:nearestDivisor(e,Math.floor(Math.sqrt(e)))},computeOutAndReduceShapes:function(e,t){for(var r=[],n=e.length,a=0;a<n;a++)-1===t.indexOf(a)&&r.push(e[a]);return[r,t.map(function(t){return e[t]})]},computeOutShape:function(e,t){for(var r=e[0].slice(),n=1;n<e.length;n++)r[t]+=e[n][t];return r},computePool2DInfo:computePool2DInfo,computePool3DInfo:function(e,t,r,n,a,o,i){void 0===i&&(i="NDHWC");var s,u,c=__read(parse3TupleParam(t),3),l=c[0],d=c[1],h=c[2];if("NDHWC"===i)u="channelsLast",s=[l,d,h,e[4],e[4]];else if("NCDHW"===i)u="channelsFirst",s=[l,d,h,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv3DInfo(e,s,r,n,a,!1,u,o)},convertConv2DDataFormat:convertConv2DDataFormat,decodeEinsumEquation:function(e,t){var r=((e=e.replace(/\s/g,"")).length-e.replace(ij,"").length)/2;if(r<1)throw Error("Equations without an arrow are not supported.");if(r>1)throw Error('Equation must contain exactly one arrow ("'.concat("->",'").'));var n=__read(e.split("->"),2),a=n[0],o=n[1];assert(-1===a.indexOf("..."),function(){return'The ellipsis notation ("'.concat("...",'") is not supported yet.')});var i=a.split(","),s=i.length;if(t!==s)throw Error("Expected ".concat(s," input tensors, received ").concat(t));if(s>2)throw Error("Support for more than 2 input tensors is not implemented yet.");for(var u=[],c=0;c<o.length;++c)!function(e){var t=o[e];if(!i.some(function(e){return -1!==e.indexOf(t)}))throw Error("Output subscripts contain the label ".concat(t," ")+"not present in the input subscripts.");-1===u.indexOf(t)&&u.push(t)}(c);for(var c=0;c<a.length;++c){var l=a[c];-1===u.indexOf(l)&&","!==l&&u.push(l)}for(var d=Array(i.length),c=0;c<s;++c){if(new Set(i[c].split("")).size!==i[c].length)throw Error("Found duplicate axes in input component ".concat(i[c],". ")+"Support for duplicate axes in input is not implemented yet.");d[c]=[];for(var h=0;h<i[c].length;++h)d[c].push(u.indexOf(i[c][h]))}for(var p=u.length,f=o.length,m=[],c=f;c<p;++c)m.push(c);return{allDims:u,summedDims:m,idDims:d}},eitherStridesOrDilationsAreOne:eitherStridesOrDilationsAreOne,expandShapeToKeepDim:expandShapeToKeepDim,exponent:function(e,t,r){var n=(r?2:-2)*Math.PI*(e/t);return{real:Math.cos(n),imag:Math.sin(n)}},exponents:function(e,t){for(var r=new Float32Array(e/2),n=new Float32Array(e/2),a=0;a<Math.ceil(e/2);a++){var o=(t?2:-2)*Math.PI*(a/e);r[a]=Math.cos(o),n[a]=Math.sin(o)}return{real:r,imag:n}},fromStringArrayToUint8:function(e){return e.map(function(e){return encodeString(e)})},fromUint8ToStringArray:/**
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
 */function(e){try{return e.map(function(e){return decodeString(e)})}catch(e){throw Error("Failed to decode encoded string bytes into utf-8, error: ".concat(e))}},getAxesPermutation:function(e,t){if(axesAreInnerMostDims(e,t))return null;for(var r=[],n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);return e.forEach(function(e){return r.push(e)}),r},getBroadcastDims:getBroadcastDims,getComplexWithIndex:function(e,t){return{real:e[2*t],imag:e[2*t+1]}},getEinsumComputePath:function(e,t){var r,n,a=[],o=0;0===e.length&&e.push(-1),o=e.length+1;for(var i=0;i<o;++i)a.push([]);for(var s=[],i=0;i<e.length;++i){var u=function(e,t){for(var r=[],n=0;n<e.length;++n)(0===e[n].length||-1!==e[n].indexOf(t)||-1===t)&&r.push(n);return r}(t,e[i]);try{for(var c=(r=void 0,__values(u)),l=c.next();!l.done;l=c.next()){var d=l.value;-1===s.indexOf(d)&&(a[i].push(d),s.push(d))}}catch(e){r={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(r)throw r.error}}}return{path:e,steps:a}},getEinsumPermutation:function(e,t){var r=Array(e);r.fill(-1);for(var n=0;n<t.length;++n)r[t[n]]=n;for(var a=[],n=0;n<e;++n)-1===r[n]&&a.push(n);return{permutationIndices:r=r.filter(function(e){return -1!==e}),expandDims:a}},getFusedBiasGradient:getFusedBiasGradient,getFusedDyActivation:getFusedDyActivation,getImageCenter:/**
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
 */function(e,t,r){return[r*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]},getInnerMostAxes:function(e,t){for(var r=[],n=t-e;n<t;++n)r.push(n);return r},getPermuted:function(e,t,r){void 0===r&&(r=!0);var n=[];if(r){n.push(t);for(var a=t+1;a<e;++a)a<=2*t?(n.push(a),n.push(a-(t+1))):n.push(a)}else{for(var o=[],i=[],a=1;a<e;++a)a>=2*t+1||a%2==1?i.push(a):o.push(a);n.push.apply(n,__spreadArray([],__read(o),!1)),n.push(0),n.push.apply(n,__spreadArray([],__read(i),!1))}return n},getRaggedRank:function(e){return 0===e.length?0:e[0]===d.FIRST_DIM_SIZE?e.length-1:e.length},getReductionAxes:getReductionAxes,getReshaped:/**
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
 */function(e,t,r,n){void 0===n&&(n=!0);var a=[];if(n)(a=a.concat(t.slice(0))).push(e[0]/r),a=a.concat(e.slice(1));else{a=a.concat(e[0]);for(var o=t.length,i=0;i<o;++i)a=a.concat([e[i+1]/t[i],t[i]]);a=a.concat(e.slice(o+1))}return a},getReshapedPermuted:function(e,t,r,n){void 0===n&&(n=!0);var a=[];n?a.push(e[0]/r):a.push(e[0]*r);for(var o=1;o<e.length;++o)o<=t.length?n?a.push(t[o-1]*e[o]):a.push(e[o]/t[o-1]):a.push(e[o]);return a},getRowPartitionTypesHelper:function(e){var t,r,n={FIRST_DIM_SIZE:d.FIRST_DIM_SIZE,VALUE_ROWIDS:d.VALUE_ROWIDS,ROW_LENGTHS:d.ROW_LENGTHS,ROW_SPLITS:d.ROW_SPLITS,ROW_LIMITS:d.ROW_LIMITS,ROW_STARTS:d.ROW_STARTS},a=[];try{for(var o=__values(e),i=o.next();!i.done;i=o.next()){var s=i.value;if(s in n)a.push(n[s]);else break}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}return a},getSliceBeginCoords:function(e,t){for(var r=[0],n=0;n<t;++n)r.push(e[n][0]);return r},getSliceSize:function(e,t,r){for(var n=e.slice(0,1),a=0;a<r;++a)n.push(e[a+1]-t[a][0]-t[a][1]);return n},getSparseFillEmptyRowsIndicesDenseShapeMismatch:/**
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
 */function(e,t){if(e.length!==t.length)throw Error("Cannot merge real and imag arrays of different lengths. real:"+"".concat(e.length,", imag: ").concat(t.length,"."));for(var r=new Float32Array(2*e.length),n=0;n<r.length;n+=2)r[n]=e[n/2],r[n+1]=t[n/2];return r},prepareAndValidate:prepareAndValidate,prepareSplitSize:function(e,t,r){void 0===r&&(r=0);var n=[];if("number"==typeof t)assert(e.shape[r]%t==0,function(){return"Number of splits must evenly divide the axis."}),n=Array(t).fill(e.shape[r]/t);else{assert(1>=t.reduce(function(e,t){return -1===t&&(e+=1),e},0),function(){return"There should be only one negative value in split array."});var a=t.indexOf(-1);if(-1!==a){var o=t.reduce(function(e,t){return t>0?e+t:e});t[a]=e.shape[r]-o}assert(e.shape[r]===t.reduce(function(e,t){return e+t}),function(){return"The sum of sizes must match the size of the axis dimension."}),n=t}return n},segment_util:{__proto__:null,collectGatherOpShapeInfo:function(e,t,r,n){var a=t.shape.length,o=e.shape.length;if(0!==n&&(n<-a||n>a))throw Error("Expect batchDims in the range of [-".concat(a,", ").concat(a,"], but got ").concat(n));if(n<0&&(n+=a),n>o)throw Error("batchDims (".concat(n,") must be less than rank(x) (\n    ").concat(o,")."));if(r<n)throw Error("batchDims (".concat(n,") must be less than or equal to axis (").concat(r,")."));for(var i=0;i<n;++i)if(e.shape[i]!==t.shape[i])throw Error("x.shape[".concat(i,"]: ").concat(e.shape[i]," should be equal to indices.shape[").concat(i,"]: ").concat(t.shape[i],"."));for(var s=e.shape[r],u=[],c=1,l=1,d=1,i=0;i<n;++i)u.push(e.shape[i]),c*=e.shape[i];for(var i=n;i<r;i++)u.push(e.shape[i]),l*=e.shape[i];for(var i=n;i<a;i++)u.push(t.shape[i]);for(var i=r+1;i<o;i++)u.push(e.shape[i]),d*=e.shape[i];return{batchSize:c,sliceSize:d,outerSize:l,dimSize:s,outputShape:u}},computeOutShape:function(e,t,r){for(var n=[],a=e.length,o=0;o<a;o++)o!==t?n.push(e[o]):n.push(r);return n},segOpComputeOptimalWindowSize:/**
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
 */function(e,t){var r,n=!1;for(e<=30?(r=e,n=!0):r=nearestDivisor(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=nearestDivisor(e,r+1);return r}},shouldFuse:shouldFuse,slice_util:iU,splitRealAndImagArrays:function(e){for(var t=new Float32Array(e.length/2),r=new Float32Array(e.length/2),n=0;n<e.length;n+=2)t[n/2]=e[n],r[n/2]=e[n+1];return{real:t,imag:r}},stridesOrDilationsArePositive:stridesOrDilationsArePositive,tupleValuesAreOne:tupleValuesAreOne,upcastType:upcastType,validateDefaultValueShape:function(e,t){if(null!=e&&null!=t){var r=e.length,n=t.length;if(r>=n)throw Error("defaultValue.shape=".concat(e," and ragged tensor flatValues.shape=").concat(t,", are incompatible: defaultValue.rank = ").concat(r," must be less than ragged tensor input flatValues.rank = ").concat(n,")"));for(var a=0;a<Math.min(r,n-1);++a){var o=e[a],i=t[a+1];if(o>=0&&i>=0&&1!==o&&o!==i)throw Error("defaultValue.shape=".concat(e,", and ragged tensor input flatValues.shape=").concat(t," are incompatible: defaultValue.shape[").concat(a-e.length,"] = ").concat(o," but ragged tensor input.flatValues.shape[").concat(a-e.length,"] = ").concat(i))}}},validateInput:validateInput$1,validateUpdateShape:validateUpdateShape,warn:warn},t.basicLSTMCell=r6,t.batchNorm=r7,t.batchNorm2d=r8,t.batchNorm3d=r9,t.batchNorm4d=ne,t.batchToSpaceND=r5,t.bincount=nt,t.bitwiseAnd=nr,t.booleanMaskAsync=function(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d,h,p,f,m;return __generator(this,function(g){switch(g.label){case 0:for(n=convertToTensor(e,"tensor","boolMask"),a=convertToTensor(t,"mask","boolMask","bool"),o=null==r?0:r,i=a.rank,s=n.shape,assert(i>0,function(){return"mask cannot be scalar"}),assertShapesMatch(s.slice(o,o+i),a.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=o;c<o+i;c++)u*=s[c];return l=s.slice(0,o).concat([u],s.slice(o+i)),d=rY(n,l),[4,whereAsync(h=rY(a,[-1]))];case 1:return f=ox(p=g.sent(),[1]),m=nJ(d,f,o),e!==n&&n.dispose(),t!==a&&a.dispose(),f.dispose(),d.dispose(),h.dispose(),p.dispose(),[2,m]}})})},t.broadcastArgs=nn,t.broadcastTo=na,t.broadcast_util={__proto__:null,assertAndGetBroadcastShape:assertAndGetBroadcastShape,getBroadcastDims:getBroadcastDims,getReductionAxes:getReductionAxes},t.browser={__proto__:null,draw:function(e,t,r){var n=convertToTensor(e,"img","draw");if(!(e instanceof ri)){var a=n;n=rR(a,"int32"),a.dispose()}validateImgTensor(n),function(e){var t=(null==e?void 0:e.alpha)||1;if(t>1||t<0)throw Error("Alpha value ".concat(t," is suppoed to be in range [0 - 1]."))}(null==r?void 0:r.imageOptions);var o={image:n};rd.runKernel(et,o,{canvas:t,options:r})},fromPixels:iG,fromPixelsAsync:function(e,t){return void 0===t&&(t=3),__awaiter(this,void 0,void 0,function(){var r,n;return __generator(this,function(a){switch(a.label){case 0:var o;if(r=null,!(env().getBool("WRAP_TO_IMAGEBITMAP")&&"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&null!=(o=e)&&0!==o.width&&0!==o.height&&!(null!=e&&e.data instanceof Uint8Array)))return[3,5];n=void 0,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,createImageBitmap(e,{premultiplyAlpha:"none"})];case 2:return n=a.sent(),[3,4];case 3:return a.sent(),n=null,[3,4];case 4:return r=null!=n&&n.width===e.width&&n.height===e.height?n:e,[3,6];case 5:r=e,a.label=6;case 6:return[2,fromPixels_(r,t)]}})})},toPixels:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d,h,p,f,m,g,v;return __generator(this,function(y){switch(y.label){case 0:return r=convertToTensor(e,"img","toPixels"),e instanceof ri||(r=rR(n=r,"int32"),n.dispose()),validateImgTensor(r),o=(a=__read(r.shape.slice(0,2),2))[0],i=a[1],s=2===r.rank?1:r.shape[2],[4,r.data()];case 1:for(d=0,u=y.sent(),c="float32"===r.dtype?255:1,l=new Uint8ClampedArray(i*o*4);d<o*i;++d){for(p=0,h=[0,0,0,255];p<s;p++){if(f=u[d*s+p],"float32"===r.dtype){if(f<0||f>1)throw Error("Tensor values for a float32 Tensor must be in the "+"range [0 - 1] but encountered ".concat(f,"."))}else if("int32"===r.dtype&&(f<0||f>255))throw Error("Tensor values for a int32 Tensor must be in the "+"range [0 - 255] but encountered ".concat(f,"."));1===s?(h[0]=f*c,h[1]=f*c,h[2]=f*c):h[p]=f*c}l[(m=4*d)+0]=Math.round(h[0]),l[m+1]=Math.round(h[1]),l[m+2]=Math.round(h[2]),l[m+3]=Math.round(h[3])}return null!=t&&(iL||null==getKernel(et,rd.backendName)||(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),iL=!0),t.width=i,t.height=o,g=t.getContext("2d"),v=new ImageData(l,i,o),g.putImageData(v,0,0)),r!==e&&r.dispose(),[2,l]}})})}},t.buffer=buffer,t.cast=rR,t.ceil=no,t.clipByValue=ni,t.clone=rO,t.complex=rf,t.concat=r0,t.concat1d=ns,t.concat2d=nu,t.concat3d=nc,t.concat4d=nl,t.conv1d=nh,t.conv2d=nd,t.conv2dTranspose=nf,t.conv3d=nm,t.conv3dTranspose=nv,t.copyRegisteredKernels=function(e,t){getKernelsForBackend(e).forEach(function(e){registerKernel(Object.assign({},e,{backendName:t}))})},t.cos=ny,t.cosh=nb,t.cosineWindow=cosineWindow,t.cumprod=n_,t.cumsum=nT,t.customGrad=customGrad,t.denseBincount=nw,t.deprecationWarn=function(e){env().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")},t.depthToSpace=nk,t.depthwiseConv2d=nx,t.device_util={__proto__:null,isBrowser:isBrowser,isMobile:function(e){if(void 0!==u)return u;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;var t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){var r=e;return r.userAgentData&&r.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1},mockIsMobile:function(e){u=e}},t.diag=nS,t.dilation2d=nE,t.disableDeprecationWarnings=function(){env().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")},t.dispose=dispose,t.disposeVariables=function(){rd.disposeVariables()},t.div=rB,t.divNoNan=nM,t.dot=nD,t.dropout=oL,t.einsum=nR,t.elu=nO,t.enableDebugMode=function(){env().set("DEBUG",!0)},t.enableProdMode=/**
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
 */function(){env().set("PROD",!0)},t.enclosingPowerOfTwo=enclosingPowerOfTwo,t.engine=function(){return rd},t.ensureShape=nP,t.env=env,t.equal=nA,t.erf=nC,t.euclideanNorm=nW,t.exp=nK,t.expandDims=nj,t.expm1=nV,t.eye=nH,t.fft=oy,t.fill=fill,t.findBackend=function(e){return rd.findBackend(e)},t.findBackendFactory=function(e){return rd.findBackendFactory(e)},t.floor=n$,t.floorDiv=rC,t.fused={__proto__:null,conv2d:oU,depthwiseConv2d:oj,matMul:oV},t.gather=nJ,t.gatherND=oz,t.gather_util={__proto__:null,prepareAndValidate:prepareAndValidate},t.getBackend=getBackend,t.getGradient=getGradient,t.getKernel=getKernel,t.getKernelsForBackend=getKernelsForBackend,t.grad=function(e){return assert(isFunction(e),function(){return"The f passed in grad(f) must be a function"}),function(t,r){var n=convertToTensor(t,"x","tf.grad","string_or_numeric"),a=null!=r?convertToTensor(r,"dy","tf.grad"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e(n)},[n],a),r=t.value,o=t.grads;return null!=a&&assertShapesMatch(r.shape,a.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),checkGrads(o),o[0]})}},t.grads=function(e){return assert(isFunction(e),function(){return"The f passed in grads(f) must be a function"}),function(t,r){assert(Array.isArray(t),function(){return"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s"});var n=convertToTensorArray(t,"args","tf.grads","string_or_numeric"),a=null!=r?convertToTensor(r,"dy","tf.grads"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(n),!1))},n,a),r=t.value,o=t.grads;return null!=a&&assertShapesMatch(r.shape,a.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(o),o})}},t.greater=nY,t.greaterEqual=nX,t.ifft=ob,t.imag=nQ,t.image={flipLeftRight:oX,grayscaleToRGB:oQ,resizeNearestNeighbor:o5,resizeBilinear:o6,rgbToGrayscale:o0,rotateWithOffset:o1,cropAndResize:oY,nonMaxSuppression:o2,nonMaxSuppressionAsync:function(e,t,r,n,a){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),__awaiter(this,void 0,void 0,function(){var o,i,s,u,c;return __generator(this,function(l){switch(l.label){case 0:return o=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),i=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(s=nonMaxSuppSanityCheck(o,i,r,n,a)).maxOutputSize,n=s.iouThreshold,a=s.scoreThreshold,[4,Promise.all([o.data(),i.data()])];case 1:return c=nonMaxSuppressionV3Impl((u=l.sent())[0],u[1],r,n,a).selectedIndices,o!==e&&o.dispose(),i!==t&&i.dispose(),[2,tensor1d(c,"int32")]}})})},nonMaxSuppressionWithScore:o3,nonMaxSuppressionWithScoreAsync:function(e,t,r,n,a,o){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=0),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,h;return __generator(this,function(p){switch(p.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(u=nonMaxSuppSanityCheck(i,s,r,n,a,o)).maxOutputSize,n=u.iouThreshold,a=u.scoreThreshold,o=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return d=(l=nonMaxSuppressionV5Impl((c=p.sent())[0],c[1],r,n,a,o)).selectedIndices,h=l.selectedScores,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(d,"int32"),selectedScores:tensor1d(h)}]}})})},nonMaxSuppressionPadded:o4,nonMaxSuppressionPaddedAsync:function(e,t,r,n,a,o){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=!1),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,h,p,f,m;return __generator(this,function(g){switch(g.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),c=(u=nonMaxSuppSanityCheck(i,s,r,n,a,null)).maxOutputSize,l=u.iouThreshold,d=u.scoreThreshold,[4,Promise.all([i.data(),s.data()])];case 1:return f=(p=nonMaxSuppressionV4Impl((h=__read.apply(void 0,[g.sent(),2]))[0],h[1],c,l,d,o)).selectedIndices,m=p.validOutputs,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(f,"int32"),validOutputs:scalar(m,"int32")}]}})})},threshold:o7,transform:o8},t.inTopKAsync=function(e,t,r){return void 0===r&&(r=1),__awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d,h,p,f,m,g;return __generator(this,function(v){switch(v.label){case 0:return n=convertToTensor(e,"predictions","inTopK"),a=convertToTensor(t,"targets","inTopK"),assert(n.rank>1,function(){return"inTopK() expects the predictions to be of rank 2 or higher, "+"but got ".concat(n.rank)}),assert(n.rank-1===a.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+"".concat(n.rank," and targets rank ").concat(a.rank)}),assertShapesMatch(n.shape.slice(0,n.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),o=n.shape[n.shape.length-1],assert(r>0&&r<=o,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last "+"dimension (".concat(o,"), but got ").concat(r)}),[4,n.data()];case 1:return i=v.sent(),[4,a.data()];case 2:for(s=v.sent(),c=(u=__read([i.length/o,o],2))[0],l=u[1],d=getArrayFromDType("bool",c),h=0;h<c;h++){for(g=0,p=h*l,f=i.subarray(p,p+l),m=[];g<f.length;g++)m.push({value:f[g],index:g});for(m.sort(function(e,t){return t.value-e.value}),d[h]=0,g=0;g<r;g++)if(m[g].index===s[h]){d[h]=1;break}}return e!==n&&n.dispose(),t!==a&&a.dispose(),[2,tensor(d,a.shape,"bool")]}})})},t.io={__proto__:null,CompositeArrayBuffer:rg,browserFiles:function(e){return new iC(e)},browserHTTPRequest:function(e,t){return http(e,t)},concatenateArrayBuffers:function(e){return rg.join(e)},copyModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!1)]})})},decodeWeights:decodeWeights,decodeWeightsStream:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d,h,p,f=this;return __generator(this,function(m){switch(m.label){case 0:r={},n=e.getReader(),a=new ArrayBuffer(0),m.label=1;case 1:m.trys.push([1,7,8,9]),i=(o=__values(t)).next(),m.label=2;case 2:if(i.done)return[3,6];return[4,function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:if(r=sizeFromShape(e.shape),!("quantization"in e))return[3,1];return n=rm[e.quantization.dtype],[3,7];case 1:if("string"!==e.dtype)return[3,6];a=0,o=0,c.label=2;case 2:if(!(o<r))return[3,5];return i=a,s=4,u=Uint32Array.bind,[4,t(a,a+4)];case 3:a=i+(s+new(u.apply(Uint32Array,[void 0,c.sent()]))()[0]),c.label=4;case 4:return o++,[3,2];case 5:return[2,a];case 6:n=rm[e.dtype],c.label=7;case 7:return[2,r*n]}})})}(s=i.value,function(e,t){return __awaiter(f,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return[4,readToLength(n,a,t)];case 1:return[2,(a=r.sent()).slice(e,t)]}})})})];case 3:return u=m.sent(),[4,readToLength(n,a,u)];case 4:c=(a=m.sent()).slice(0,u),a=a.slice(u),l=decodeWeight(s,c),r[s.name]=l,"webgpu"===getBackend()&&"uploadToGPU"in(d=backend())&&sizeFromShape(l.shape)>=env().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&d.uploadToGPU(l.dataId),m.label=5;case 5:return i=o.next(),[3,2];case 6:return[3,9];case 7:return h={error:m.sent()},[3,9];case 8:try{i&&!i.done&&(p=o.return)&&p.call(o)}finally{if(h)throw h.error}return[7];case 9:return[2,r]}})})},encodeWeights:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s=this;return __generator(this,function(u){switch(u.label){case 0:for(i=0,r=[],n=[],a=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e),o=function(o){var i=a[o],u=Array.isArray(e)?e[o].tensor:e[i];if("float32"!==u.dtype&&"int32"!==u.dtype&&"bool"!==u.dtype&&"string"!==u.dtype&&"complex64"!==u.dtype)throw Error("Unsupported dtype in weight '".concat(i,"': ").concat(u.dtype));var c={name:i,shape:u.shape,dtype:u.dtype};if("string"===u.dtype){var l=new Promise(function(e){return __awaiter(s,void 0,void 0,function(){var t,r,n,a,o,i,s;return __generator(this,function(c){switch(c.label){case 0:return[4,u.bytes()];case 1:for(o=0,r=(t=c.sent()).reduce(function(e,t){return e+t.length},0)+4*t.length,n=new Uint8Array(r),a=0;o<t.length;o++)i=t[o],s=new Uint8Array(new Uint32Array([i.length]).buffer),n.set(s,a),a+=4,n.set(i,a),a+=i.length;return e(n),[2]}})})});n.push(l)}else n.push(u.data());null!=t&&(c.group=t),r.push(c)};i<a.length;++i)o(i);return[4,Promise.all(n)];case 1:return[2,{data:function(e){if(null===e)throw Error("Invalid input value: ".concat(JSON.stringify(e)));var t=0,r=[];e.forEach(function(e){if(t+=e.byteLength,r.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error("Unsupported TypedArray subtype: ".concat(e.constructor.name))});var n=new Uint8Array(t),a=0;return r.forEach(function(e){n.set(new Uint8Array(e.buffer),a),a+=e.byteLength}),n.buffer}(u.sent()),specs:r}]}})})},fromMemory:function(e,t,r,n){var a=arguments;return new PassthroughAsync(fromMemorySync.apply(void 0,__spreadArray([],__read(a),!1)))},fromMemorySync:fromMemorySync,getLoadHandlers:function(e,t){return ry.getLoadHandlers(e,t)},getModelArtifactsForJSON:getModelArtifactsForJSON,getModelArtifactsForJSONSync:getModelArtifactsForJSONSync,getModelArtifactsInfoForJSON:getModelArtifactsInfoForJSON,getSaveHandlers:function(e){return ry.getSaveHandlers(e)},getWeightSpecs:getWeightSpecs,http:http,isHTTPScheme:isHTTPScheme,listModels:function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:e=rI.getSchemes(),t={},c.label=1;case 1:c.trys.push([1,6,7,8]),n=(r=__values(e)).next(),c.label=2;case 2:if(n.done)return[3,5];return a=n.value,[4,rI.getManager(a).listModels()];case 3:for(i in o=c.sent())t[a+"://"+i]=o[i];c.label=4;case 4:return n=r.next(),[3,2];case 5:return[3,8];case 6:return s={error:c.sent()},[3,8];case 7:try{n&&!n.done&&(u=r.return)&&u.call(r)}finally{if(s)throw s.error}return[7];case 8:return[2,t]}})})},loadWeights:function(e,t,r,n){return void 0===t&&(t=""),__awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2,weightsLoaderFactory(function(e){return loadWeightsAsArrayBuffer(e,{requestInit:n})})(e,t,r)]})})},moveModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!0)]})})},registerLoadRouter:function(e){return ry.registerLoadRouter(e)},registerSaveRouter:function(e){return ry.registerSaveRouter(e)},removeModel:function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){return t=parseURL(e),[2,rI.getManager(t.scheme).removeModel(t.path)]})})},weightsLoaderFactory:weightsLoaderFactory,withSaveHandler:function(e){return new iZ(e)},withSaveHandlerSync:function(e){return new iZ(e)}},t.irfft=o_,t.isFinite=n0,t.isInf=n1,t.isNaN=n2,t.keep=keep,t.kernel_impls={__proto__:null,nonMaxSuppressionV3Impl:nonMaxSuppressionV3Impl,nonMaxSuppressionV4Impl:nonMaxSuppressionV4Impl,nonMaxSuppressionV5Impl:nonMaxSuppressionV5Impl,whereImpl:whereImpl},t.leakyRelu=n3,t.less=n4,t.lessEqual=n6,t.linalg={bandPart:o9,gramSchmidt:ie,qr:it},t.linspace=/**
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
 */function(e,t,r){if(r<=0)throw Error("The number of values should be positive.");return rd.runKernel(eS,{},{start:e,stop:t,num:r})},t.localResponseNormalization=n5,t.log=n7,t.log1p=n8,t.logSigmoid=at,t.logSoftmax=an,t.logSumExp=aa,t.logicalAnd=ao,t.logicalNot=ai,t.logicalOr=as,t.logicalXor=au,t.losses={absoluteDifference:ia,computeWeightedLoss:ir,cosineDistance:io,hingeLoss:ii,huberLoss:is,logLoss:iu,meanSquaredError:ic,sigmoidCrossEntropy:il,softmaxCrossEntropy:id},t.lowerBound=/**
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
 */function(e,t){return ac(e,t,"left")},t.matMul=r1,t.math={__proto__:null,confusionMatrix:iz},t.max=nB,t.maxPool=al,t.maxPool3d=ad,t.maxPoolWithArgmax=ah,t.maximum=ap,t.mean=af,t.memory=function(){return rd.memory()},t.meshgrid=/**
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
 */function(e,t,r){var n=(void 0===r?{}:r).indexing,a=void 0===n?"xy":n;if("xy"!==a&&"ij"!==a)throw TypeError("".concat(a," is not a valid third argument to meshgrid"));if(void 0===e)return[];var o=convertToTensor(e,"x","meshgrid",e instanceof ri?e.dtype:"float32");if(void 0===t)return[o];var i=convertToTensor(t,"y","meshgrid",t instanceof ri?t.dtype:"float32"),s=sizeFromShape(o.shape),u=sizeFromShape(i.shape);return"xy"===a?(o=rY(o,[1,-1]),i=rY(i,[-1,1]),[r1(ones([u,1],o.dtype),o),r1(i,ones([1,s],i.dtype))]):(o=rY(o,[-1,1]),i=rY(i,[1,-1]),[r1(o,ones([1,u],o.dtype)),r1(ones([s,1],i.dtype),i)])},t.min=nF,t.minimum=am,t.mirrorPad=ag,t.mod=av,t.moments=ay,t.movingAverage=oB,t.mul=rF,t.multiRNNCell=ab,t.multinomial=a_,t.neg=n9,t.nextFrame=function(){return new Promise(function(e){return iK(function(){return e()})})},t.norm=nU,t.notEqual=aT,t.oneHot=aw,t.ones=ones,t.onesLike=ak,t.op=op,t.outerProduct=ax,t.pad=aS,t.pad1d=aE,t.pad2d=aA,t.pad3d=aI,t.pad4d=aN,t.pool=aD,t.pow=nZ,t.prelu=aR,t.print=print,t.prod=aO,t.profile=function(e){return rd.profile(e)},t.raggedGather=aP,t.raggedRange=aC,t.raggedTensorToTensor=aB,t.rand=aF,t.randomGamma=a1,t.randomNormal=a2,t.randomStandardNormal=a3,t.randomUniform=a4,t.randomUniformInt=a6,t.range=range,t.ready=function(){return rd.ready()},t.real=a5,t.reciprocal=a7,t.registerBackend=function(e,t,r){return void 0===r&&(r=1),rd.registerBackend(e,t,r)},t.registerGradient=function(e){var t=e.kernelName;tL.has(t)&&env().getBool("DEBUG")&&warn("Overriding the gradient for '".concat(t,"'")),tL.set(t,e)},t.registerKernel=registerKernel,t.relu=a8,t.relu6=a9,t.removeBackend=function(e){rd.removeBackend(e)},t.reshape=rY,t.reverse=oe,t.reverse1d=ot,t.reverse2d=or,t.reverse3d=on,t.reverse4d=oa,t.rfft=ow,t.round=oo,t.rsqrt=oi,t.scalar=scalar,t.scatterND=oF,t.scatter_util={__proto__:null,calculateShapes:calculateShapes,validateInput:validateInput$1,validateUpdateShape:validateUpdateShape},t.searchSorted=ac,t.selu=os,t.separableConv2d=ou,t.serialization={__proto__:null,Serializable:ik,SerializationMap:ix,getRegisteredName:function(e){return iw.has(e)?iw.get(e):e.className},registerClass:registerClass},t.setBackend=function(e){return rd.setBackend(e)},t.setPlatform=function(e,t){env().setPlatform(e,t)},t.setdiff1dAsync=function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d;return __generator(this,function(h){switch(h.label){case 0:return r=convertToTensor(e,"x","setdiff1d"),n=convertToTensor(t,"y","setdiff1d"),assert(r.dtype===n.dtype,function(){return"x and y should have the same dtype, but got x (".concat(r.dtype,") and y (").concat(n.dtype,").")}),assert(1===r.rank,function(){return"x should be 1D tensor, but got x (".concat(r.shape,").")}),assert(1===n.rank,function(){return"y should be 1D tensor, but got y (".concat(n.shape,").")}),[4,r.data()];case 1:return a=h.sent(),[4,n.data()];case 2:for(u=0,o=h.sent(),i=new Set(o),s=0;u<a.length;u++)!i.has(a[u])&&s++;for(u=0,c=new rn([s],r.dtype),l=new rn([s],"int32"),d=0;u<a.length;u++)!i.has(a[u])&&(c.values[d]=a[u],l.values[d]=u,d++);return[2,[c.toTensor(),l.toTensor()]]}})})},t.sigmoid=r2,t.sign=oc,t.signal={hammingWindow:oq,hannWindow:oH,frame:o$,stft:oJ},t.sin=ol,t.sinh=od,t.slice=r3,t.slice1d=oh,t.slice2d=of,t.slice3d=om,t.slice4d=og,t.slice_util=iU,t.softmax=ov,t.softplus=ae,t.spaceToBatchND=aM,t.sparse={sparseFillEmptyRows:ih,sparseReshape:ip,sparseSegmentMean:im,sparseSegmentSum:ig},t.sparseToDense=oZ,t.spectral={fft:oy,ifft:ob,rfft:ow,irfft:o_},t.split=oT,t.sqrt=nz,t.square=nL,t.squaredDifference=ok,t.squeeze=ox,t.stack=oS,t.step=oE,t.stridedSlice=oA,t.string={stringNGrams:iv,stringSplit:iy,stringToHashBucketFast:ib,staticRegexReplace:i_},t.sub=ar,t.sum=nG,t.sumOutType=function(e){return upcastType(e,"int32")},t.tan=oI,t.tanh=r4,t.tensor=tensor,t.tensor1d=tensor1d,t.tensor2d=tensor2d,t.tensor3d=tensor3d,t.tensor4d=/**
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
 */function(e,t,r){if(assertNonNull(e),null!=t&&6!==t.length)throw Error("tensor6d() requires shape to have six numbers");var n=inferShape(e,r);if(6!==n.length&&1!==n.length)throw Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor6d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t=t||n,n,r)},t.tensorScatterUpdate=oN,t.tensor_util={__proto__:null,assertTypesMatch:assertTypesMatch,getTensorsInContainer:getTensorsInContainer,isTensorInList:function(e,t){return t.some(function(t){return t.id===e.id})},makeTypesMatch:makeTypesMatch},t.test_util={__proto__:null,TEST_EPSILON_FLOAT16:.1,createVideoElement:function(e){var t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(function(e){t.addEventListener("loadeddata",function(r){return e(t)}),t.load()})},encodeStrings:function encodeStrings(e){for(var t=0;t<e.length;t++){var r=e[t];Array.isArray(r)?encodeStrings(r):e[t]=encodeString(r)}return e},expectArrayBuffersEqual:function(e,t){var r=new Float32Array(e),n=new Float32Array(t);if(r.length!==n.length)throw Error("Expected ArrayBuffer to be of length "+"".concat(n.length,", but it was ").concat(r.length));for(var a=0;a<n.length;a++)if(r[a]!==n[a])throw Error("Expected ArrayBuffer value at ".concat(a," to be ")+"".concat(n[a]," but got ").concat(r[a]," instead"))},expectArraysClose:function(e,t,r){return null==r&&(r=testEpsilon()),expectArraysPredicate(e,t,function(e,t){return areClose(e,t,r)})},expectArraysEqual:function(e,t){var r="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return isString(e)||isString(e[0])||isString(t)||isString(t[0])?expectArraysPredicate(e,r,function(e,t){return e==t}):expectArraysPredicate(e,t,function(e,t){return areClose(e,t,0)})},expectNumbersClose:function(e,t,r){if(null==r&&(r=testEpsilon()),!areClose(e,t,r))throw Error("Numbers differ: actual === ".concat(e,", expected === ").concat(t));"undefined"!=typeof expect&&expect().nothing()},expectPromiseToFail:function(e,t){e().then(function(){return t.fail()},function(){return t()}),"undefined"!=typeof expect&&expect().nothing()},expectValuesInRange:function(e,t,r){for(var n=0;n<e.length;n++)if(e[n]<t||e[n]>r)throw Error("Value out of range:".concat(e[n]," low: ").concat(t,", high: ").concat(r))},play:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,e.play()];case 1:if(t.sent(),!("requestVideoFrameCallback"in e))return[3,3];return[4,new Promise(function(t){e.requestVideoFrameCallback(t)})];case 2:t.sent(),t.label=3;case 3:return[2]}})})},testEpsilon:testEpsilon},t.tidy=tidy,t.tile=nq,t.time=function(e){return rd.time(e)},t.topk=oM,t.train=iW,t.transpose=oC,t.truncatedNormal=oD,t.unique=oR,t.unregisterGradient=function(e){if(!tL.has(e))throw Error("The gradient '".concat(e,"' for backend is not registered"));tL.delete(e)},t.unregisterKernel=function(e,t){var r=makeKey(e,t);if(!tz.has(r))throw Error("The kernel '".concat(e,"' for backend ")+"'".concat(t,"' is not registered"));tz.delete(r)},t.unsortedSegmentSum=oO,t.unstack=oP,t.upcastType=upcastType,t.upperBound=/**
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
 */function(e,t){return ac(e,t,"right")},t.util={__proto__:null,arraysEqual:arraysEqual,arraysEqualWithNull:arraysEqualWithNull,assert:assert,assertNonNegativeIntegerDimensions:assertNonNegativeIntegerDimensions,assertNonNull:assertNonNull,assertShapesMatch:assertShapesMatch,bytesFromStringArray:bytesFromStringArray,bytesPerElement:bytesPerElement,checkConversionForErrors:checkConversionForErrors,clamp:clamp,computeStrides:computeStrides,convertBackendValuesAndArrayBuffer:function(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error("Unknown dtype ".concat(t))},createScalarValue:function(e,t){return"string"===t?encodeString(e):toTypedArray([e],t)},createShuffledIndices:function(e){for(var t=new Uint32Array(e),r=0;r<e;++r)t[r]=r;return shuffle(t),t},decodeString:decodeString,distSquared:function(e,t){for(var r=0,n=0;n<e.length;n++){var a=Number(e[n])-Number(t[n]);r+=a*a}return r},encodeString:encodeString,fetch:function(e,t){return env().platform.fetch(e,t)},fingerPrint64:function(e,t){void 0===t&&(t=e.length);var r,n,a,o,i,s,u,c,l,d,h,p,f,m,g,v,y,b,_,T,w=t7.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t){if(void 0===t&&(t=e.length),t>=8){var r=re.add(2*t),n=fetch64(e,0).add(re),a=fetch64(e,t-8),o=rotate64(a,37).mul(r).add(n);return hashLen16(o,rotate64(n,25).add(a).mul(r),r)}if(t>=4){var r=re.add(2*t),n=fetch$2(e,0,4);return hashLen16(n.shl(3).add(t),fetch$2(e,t-4,4),r)}if(t>0){var n=e[0],a=e[t>>1],o=e[t-1],i=n+(a<<8),s=t+(o<<2);return shiftMix(re.mul(i).xor(t8.mul(s))).mul(re)}return re}(e,t):(void 0===(r=t)&&(r=e.length),n=re.add(2*r),a=fetch64(e,0).mul(t9),o=fetch64(e,8),i=fetch64(e,r-8).mul(n),s=fetch64(e,r-16).mul(re),hashLen16(rotate64(a.add(o),43).add(rotate64(i,30)).add(s),a.add(rotate64(o.add(re),18)).add(i),n));if(t<=64)return void 0===(u=t)&&(u=e.length),c=re.add(2*u),l=fetch64(e,0).mul(re),d=fetch64(e,8),h=fetch64(e,u-8).mul(c),p=fetch64(e,u-16).mul(re),m=hashLen16(f=rotate64(l.add(d),43).add(rotate64(h,30)).add(p),l.add(rotate64(d.add(re),18)).add(h),c),g=fetch64(e,16).mul(c),v=fetch64(e,24),y=f.add(fetch64(e,u-32)).mul(c),b=m.add(fetch64(e,u-24)).mul(c),hashLen16(rotate64(g.add(v),43).add(rotate64(y,30)).add(b),g.add(rotate64(v.add(l),18)).add(y),c);var k=w,x=w.mul(t9).add(113),S=shiftMix(x.mul(re).add(113)).mul(re),E=[t7.UZERO,t7.UZERO],A=[t7.UZERO,t7.UZERO];k=k.mul(re).add(fetch64(e,0));var I=0,N=(t-1>>6)*64,M=N+(t-1&63)-63;do k=rotate64(k.add(x).add(E[0]).add(fetch64(e,I+8)),37).mul(t9),x=rotate64(x.add(E[1]).add(fetch64(e,I+48)),42).mul(t9),k=k.xor(A[1]),x=x.add(E[0]).add(fetch64(e,I+40)),S=rotate64(S.add(A[0]),33).mul(t9),E=weakHashLen32WithSeedsStr(e,I,E[1].mul(t9),k.add(A[0])),A=weakHashLen32WithSeedsStr(e,I+32,S.add(A[1]),x.add(fetch64(e,I+16))),S=(_=__read([k,S],2))[0],k=_[1],I+=64;while(I!==N);var D=t9.add(S.and(255).shl(1));return I=M,A[0]=A[0].add(t-1&63),E[0]=E[0].add(A[0]),A[0]=A[0].add(E[0]),k=rotate64(k.add(x).add(E[0]).add(fetch64(e,I+8)),37).mul(D),x=rotate64(x.add(E[1]).add(fetch64(e,I+48)),42).mul(D),k=k.xor(A[1].mul(9)),x=x.add(E[0].mul(9).add(fetch64(e,I+40))),S=rotate64(S.add(A[0]),33).mul(D),E=weakHashLen32WithSeedsStr(e,I,E[1].mul(D),k.add(A[0])),A=weakHashLen32WithSeedsStr(e,I+32,S.add(A[1]),x.add(fetch64(e,I+16))),S=(T=__read([k,S],2))[0],k=T[1],hashLen16(hashLen16(E[0],A[0],D).add(shiftMix(x).mul(t8)).add(S),hashLen16(E[1],A[1],D).add(k),D)},flatten:flatten,getArrayFromDType:getArrayFromDType,getTypedArrayFromDType:function(e,t){return getArrayFromDType(e,t)},hasEncodingLoss:function(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)},hexToLong:hexToLong,indexToLoc:function(e,t,r){if(0===t)return[];if(1===t)return[e];for(var n=Array(t),a=0;a<n.length-1;++a)n[a]=Math.floor(e/r[a]),e-=n[a]*r[a];return n[n.length-1]=e,n},inferDtype:inferDtype,inferFromImplicitShape:function(e,t){for(var r=1,n=-1,a=0;a<e.length;++a)if(e[a]>=0)r*=e[a];else if(-1===e[a]){if(-1!==n)throw Error("Shapes can only have 1 implicit size. "+"Found -1 at dim ".concat(n," and dim ").concat(a));n=a}else if(e[a]<0)throw Error("Shapes can not be < 0. Found ".concat(e[a]," at dim ").concat(a));if(-1===n){if(t>0&&t!==r)throw Error("Size(".concat(t,") must match the product of shape ").concat(e));return e}if(0===r)throw Error("Cannot infer the missing size in [".concat(e,"] when ")+"there are 0 elements");if(t%r!=0)throw Error("The implicit shape can't be a fractional number. "+"Got ".concat(t," / ").concat(r));var o=e.slice();return o[n]=t/r,o},isBoolean:isBoolean,isFunction:isFunction,isInt:isInt,isNumber:isNumber,isPromise:isPromise,isScalarShape:function(e){return 0===e.length},isString:isString,isTypedArray:isTypedArray,isValidDtype:isValidDtype,locToIndex:function(e,t,r){if(0===t)return 0;if(1===t)return e[0];for(var n=e[e.length-1],a=0;a<e.length-1;++a)n+=r[a]*e[a];return n},makeOnesTypedArray:makeOnesTypedArray,makeZerosNestedTypedArray:function(e,t){var r=e.reduce(function(e,t){return e*t},1);if(null==t||"float32"===t)return toNestedArray(e,new Float32Array(r));if("int32"===t)return toNestedArray(e,new Int32Array(r));if("bool"===t)return toNestedArray(e,new Uint8Array(r));throw Error("Unknown data type ".concat(t))},makeZerosTypedArray:makeZerosTypedArray,nearestDivisor:nearestDivisor,nearestLargerEven:function(e){return e%2==0?e:e+1},now:now,parseAxisParam:parseAxisParam,randUniform:function(e,t){var r=Math.random();return t*r+(1-r)*e},repeatedTry:function(e,t,r,n){return void 0===t&&(t=function(e){return 0}),new Promise(function(a,o){var i=0,tryFn=function(){if(e()){a();return}i++;var s=t(i);if(null!=r&&i>=r){o();return}null!=n?n(tryFn,s):setTimeout(tryFn,s)};tryFn()})},rightPad:rightPad,shuffle:shuffle,shuffleCombo:function(e,t){if(e.length!==t.length)throw Error("Array sizes must match to be shuffled together "+"First array length was ".concat(e.length)+"Second array length was ".concat(t.length));for(var r=e.length,n=0;r>0;)n=Math.random()*r|0,swap(e,--r,n),swap(t,r,n)},sizeFromShape:sizeFromShape,sizeToSquarishShape:function(e){var t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]},squeezeShape:squeezeShape,sum:function(e){for(var t=0,r=0;r<e.length;r++)t+=e[r];return t},swap:swap,tanh:function(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return -1;var t=Math.exp(2*e);return(t-1)/(t+1)},toNestedArray:toNestedArray,toTypedArray:toTypedArray},t.valueAndGrad=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrad(f) must be a function"}),function(t,r){assert(t instanceof ri,function(){return"The x passed in valueAndGrad(f)(x) must be a tensor"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrad(f)(x, dy) must be a tensor"});var n=rd.gradients(function(){return e(t)},[t],r),a=n.grads,o=n.value;return checkGrads(a),{grad:a[0],value:o}}},t.valueAndGrads=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrads(f) must be a function"}),function(t,r){assert(Array.isArray(t)&&t.every(function(e){return e instanceof ri}),function(){return"The args passed in valueAndGrads(f)(args) must be array of tensors"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrads(f)(args, dy) must be a tensor"});var n=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(t),!1))},t,r);return null!=r&&assertShapesMatch(n.value.shape,r.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(n.grads),n}},t.variable=/**
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
 */function(e,t,r,n){return void 0===t&&(t=!0),rd.makeVariable(e,t,r,n)},t.variableGrads=variableGrads,t.version_core="4.20.0",t.where=nI,t.whereAsync=whereAsync,t.zeros=zeros,t.zerosLike=nN},39940:(e,t,r)=>{t.iF=t.UI=t.DC=t.bJ=void 0,r(49902),r(75763),r(65650),r(23802),r(98451),r(5174),r(59188),r(63242),r(88742),r(88826),r(8681),r(5246),r(62836),r(17646);var n=r(37970);Object.defineProperty(t,"bJ",{enumerable:!0,get:function(){return n.concatMap}}),r(25922),r(69262),r(81071),r(10788),r(55557),r(40999),r(62475),r(14443),r(35463);var a=r(84835);Object.defineProperty(t,"DC",{enumerable:!0,get:function(){return a.dematerialize}}),r(24730),r(59615),r(8775),r(47395),r(23080),r(70455),r(10770),r(14914),r(1147),r(69833),r(98),r(78785),r(88350),r(34538),r(26055),r(67128),r(45173),r(1434),r(340);var o=r(85920);Object.defineProperty(t,"UI",{enumerable:!0,get:function(){return o.map}}),r(70953);var i=r(93890);Object.defineProperty(t,"iF",{enumerable:!0,get:function(){return i.materialize}}),r(17417),r(82505),r(13536),r(71294),r(96660),r(70329),r(1199),r(59148),r(53640),r(43937),r(57125),r(57459),r(49510),r(34412),r(38668),r(68882),r(6921),r(96877),r(54962),r(15945),r(43249),r(31745),r(74790),r(37022),r(74679),r(32974),r(16326),r(7398),r(75611),r(20707),r(17516),r(33782),r(48527),r(86573),r(89818),r(73710),r(42712),r(74590),r(90652),r(83300),r(93462),r(74545),r(65954),r(64309),r(95929),r(47286),r(13840),r(68819),r(50632),r(63010),r(56207),r(50630),r(5807),r(63341),r(73016),r(50681),r(8594),r(54764),r(4459),r(6885),r(7163),r(12089),r(97210),r(12647),r(19272),r(65277)},58966:(e,t,r)=>{r.d(t,{T:()=>merge});var n=r(34353),a=r(278),o=r(75427),i=r(47266),s=r(95754);function merge(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=(0,i.yG)(e),u=(0,i._6)(e,1/0);return e.length?1===e.length?(0,a.Xf)(e[0]):(0,n.J)(u)((0,s.D)(e,r)):o.E}},74934:(e,t,r)=>{r.d(t,{R:()=>scan});var n=r(74317),a=r(11882);function scan(e,t){var r;return(0,n.e)((r=arguments.length>=2,function(n,o){var i=r,s=t,u=0;n.subscribe((0,a.x)(o,function(t){var r=u++;s=i?e(s,t,r):(i=!0,t),o.next(s)},void 0))}))}},40401:(e,t,r)=>{r.d(t,{d:()=>shareReplay});var n=r(90222),a=r(12530),o=r(32067),i=function(e){function ReplaySubject(t,r,n){void 0===t&&(t=1/0),void 0===r&&(r=1/0),void 0===n&&(n=o.l);var a=e.call(this)||this;return a._bufferSize=t,a._windowTime=r,a._timestampProvider=n,a._buffer=[],a._infiniteTimeWindow=!0,a._infiniteTimeWindow=r===1/0,a._bufferSize=Math.max(1,t),a._windowTime=Math.max(1,r),a}return(0,n.__extends)(ReplaySubject,e),ReplaySubject.prototype.next=function(t){var r=this.isStopped,n=this._buffer,a=this._infiniteTimeWindow,o=this._timestampProvider,i=this._windowTime;!r&&(n.push(t),a||n.push(o.now()+i)),this._trimBuffer(),e.prototype.next.call(this,t)},ReplaySubject.prototype._subscribe=function(e){this._throwIfClosed(),this._trimBuffer();for(var t=this._innerSubscribe(e),r=this._infiniteTimeWindow,n=this._buffer.slice(),a=0;a<n.length&&!e.closed;a+=r?1:2)e.next(n[a]);return this._checkFinalizedStatuses(e),t},ReplaySubject.prototype._trimBuffer=function(){var e=this._bufferSize,t=this._timestampProvider,r=this._buffer,n=this._infiniteTimeWindow,a=(n?1:2)*e;if(e<1/0&&a<r.length&&r.splice(0,r.length-a),!n){for(var o=t.now(),i=0,s=1;s<r.length&&r[s]<=o;s+=2)i=s;i&&r.splice(0,i+1)}},ReplaySubject}(a.x),s=r(46891);function shareReplay(e,t,r){var n,a,o,u,c=!1;return e&&"object"==typeof e?(u=void 0===(n=e.bufferSize)?1/0:n,t=void 0===(a=e.windowTime)?1/0:a,c=void 0!==(o=e.refCount)&&o,r=e.scheduler):u=null!=e?e:1/0,(0,s.B)({connector:function(){return new i(u,t,r)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:c})}},84518:(e,t,r)=>{r.d(t,{w:()=>switchMap});var n=r(278),a=r(74317),o=r(11882);function switchMap(e,t){return(0,a.e)(function(r,a){var i=null,s=0,u=!1,checkComplete=function(){return u&&!i&&a.complete()};r.subscribe((0,o.x)(a,function(r){null==i||i.unsubscribe();var u=0,c=s++;(0,n.Xf)(e(r,c)).subscribe(i=(0,o.x)(a,function(e){return a.next(t?t(r,e,c,u++):e)},function(){i=null,checkComplete()}))},function(){u=!0,checkComplete()}))})}},24906:(e,t,r)=>{r.d(t,{w:()=>switchScan});var n=r(84518),a=r(74317);function switchScan(e,t){return(0,a.e)(function(r,a){var o=t;return(0,n.w)(function(t,r){return e(o,t,r)},function(e,t){return o=t,t})(r).subscribe(a),function(){o=null}})}},83600:(e,t,r)=>{r.d(t,{P:()=>throttle});var n=r(74317),a=r(11882),o=r(278);function throttle(e,t){return(0,n.e)(function(r,n){var i=null!=t?t:{},s=i.leading,u=void 0===s||s,c=i.trailing,l=void 0!==c&&c,d=!1,h=null,p=null,f=!1,endThrottling=function(){null==p||p.unsubscribe(),p=null,l&&(send(),f&&n.complete())},cleanupThrottling=function(){p=null,f&&n.complete()},startThrottle=function(t){return p=(0,o.Xf)(e(t)).subscribe((0,a.x)(n,endThrottling,cleanupThrottling))},send=function(){if(d){d=!1;var e=h;h=null,n.next(e),f||startThrottle(e)}};r.subscribe((0,a.x)(n,function(e){d=!0,h=e,p&&!p.closed||(u?send():startThrottle(e))},function(){f=!0,l&&d&&p&&!p.closed||n.complete()}))})}},22212:(e,t,r)=>{r.d(t,{z:()=>a});var n=r(70500),a=new(r(77881)).v(n.o)},47266:(e,t,r)=>{r.d(t,{_6:()=>popNumber,yG:()=>popScheduler});var n=r(62343);function last(e){return e[e.length-1]}function popScheduler(e){return(0,n.K)(last(e))?e.pop():void 0}function popNumber(e,t){return"number"==typeof last(e)?e.pop():t}},72201:(e,t,r)=>{r.d(t,{U:()=>pipeFromArray,z:()=>pipe});var n=r(85235);function pipe(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return pipeFromArray(e)}function pipeFromArray(e){return 0===e.length?n.y:1===e.length?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}},63147:(e,t,r)=>{t.NumberRange=void 0,r(6381),r(54474),r(97822),r(14238),r(74379),r(71846),r(71846),r(71846),r(70002),r(70002),r(70002),r(70002),r(70002),r(12251),r(12251),r(12251),r(12251),r(12251),r(12251),r(23376),r(75730),r(75730),r(92442),r(92442),r(92442),r(92442),r(10190),r(10190),r(10190),r(27074),r(23623),r(44843),r(19866),r(19866),r(11585),r(71565),r(60375),r(63193),r(63193),r(31020),r(54001),r(87008),r(17237),r(67595),r(67595),r(28405),r(11727),r(59788),r(4169),r(75934),r(4252),r(86845),r(62390),r(62390),r(62390),r(88339),r(88339),r(88339),r(54876),r(63887),r(17127),r(20088),r(20088),r(20088),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(13983),r(34330),r(45708),r(78841),r(57900),r(36283),r(55180),r(34691),r(40671),r(39548),r(32423),r(97706),r(4049),r(99073),r(53218),r(39958),r(15533),r(92279),r(85932),r(76099),r(72942),r(72942),r(38682),r(698),r(34267),r(49817),r(49817),r(94066),r(35628),r(35628),r(35628),r(30831),r(30831),r(30831),r(18301),r(20),r(3008),r(31693),r(20296),r(27383),r(70938),r(8896),r(33295),r(17823),r(31795),r(59085),r(21036),r(77288),r(2530),r(88998),r(9694),r(27132),r(77874),r(57469),r(85397),r(27815),r(35390),r(65101),r(33899),r(72958),r(72958),r(72958),r(11547),r(6166),r(78125),r(30697),r(35166),r(33272),r(28770),r(4995),r(68343),r(655),r(30777),r(41973),r(27979),r(22361),r(45608),r(43183),r(16307),r(30470),r(66625),r(3582),r(83392),r(91654),r(43227),r(7248),r(17666),r(48577),r(86903),r(82873),r(55241),r(6017),r(44944),r(97676),r(97570),r(97570),r(97570),r(2310),r(20024),r(37009),r(80077),r(59470),r(7858),r(91613),r(3250),r(3250),r(55302),r(55302),r(55302),r(52598),r(71878),r(96082),r(25525),r(98814),r(98814),r(70846),r(81429),r(35992),r(83052),r(21641),r(25462),r(25462),r(25462),r(52035),r(52035),r(52035),r(52035),r(77589),r(96585),r(23150),r(23150),r(23150),r(91792),r(10452),r(74554),r(52551),r(97755),r(3633),r(8186),r(98126),r(54775),r(84178),r(84178),r(81475),r(39190),r(39190),r(31163),r(2223),r(88174),r(95665),r(40259),r(99530),r(56977),r(37513),r(20386),r(20386),r(60258),r(9721),r(40360),r(41349),r(78342),r(2341),r(12992),r(13418),r(13418),r(80119),r(80119),r(10901),r(40465),r(5150),r(29370),r(14717),r(49534),r(965),r(88659),r(71476),r(21390),r(95210),r(95210),r(93455),r(60347),r(12990),r(3414),r(3414),r(15395),r(15395),r(18911),r(49668),r(26846),r(14987),r(89627),r(89627),r(89627),r(89627),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(16125),r(12640),r(66491),r(73672),r(73672),r(73672),r(73672),r(73672),r(73672),r(36062),r(98388),r(56887),r(6251),r(80560),r(44318),r(67185),r(42648),r(64362),r(35862),r(96970),r(96970),r(23911),r(2218),r(7983),r(50508),r(13156),r(31265),r(52863),r(80334),r(95626),r(95626),r(47382),r(52786),r(94777),r(37703),r(90614),r(29931),r(35036),r(11435),r(75217),r(78789),r(38841),r(8790),r(80673),r(5850),r(21335),r(75292),r(85237),r(90660),r(17901),r(86193),r(44431),r(88501),r(75666),r(50307),r(9737),r(9737),r(85149),r(65011),r(16476),r(40214),r(78522),r(34709),r(30671),r(37387),r(30911),r(69282),r(42804),r(45753),r(59236),r(40622),r(32585),r(63771),r(93703),r(10245),r(54661),r(28373),r(10927),r(1811),r(99582),r(93504),r(39106),r(12501),r(13995),r(52984),r(79882),r(79882),r(67774),r(50593),r(83891),r(51747),r(2489),r(30953),r(71226),r(95712),r(37040),r(19869),r(10018),r(81265),r(89957),r(53312),r(29663),r(29663),r(29663),r(29663),r(29663),r(29663),r(17335),r(52821),r(41992),r(64622),r(64622),r(46414),r(83925),r(79130),r(3768),r(93899),r(34690),r(81897),r(15311),r(67234),r(8888),r(58204),r(53311),r(28917),r(58167),r(93681),r(44415),r(76713),r(67244),r(64946),r(95263),r(79948),r(15634),r(15634),r(15634),r(15634),r(29279),r(39308),r(88618),r(75464),r(87389),r(87389),r(87389),r(87389),r(4915),r(15004),r(93873),r(6914),r(6914),r(6914),r(28819),r(28819),r(11334),r(12085),r(91641),r(60491),r(31987),r(55823),r(83842),r(98056),r(98056),r(91541),r(91541),r(82556),r(8430),r(71436),r(68324),r(79137),r(16941),r(18075),r(85172),r(74392),r(74392),r(36233),r(37663),r(9394),r(9394),r(82256),r(1317),r(3352),r(50613),r(24962),r(24962),r(24962),r(24962),r(24962),r(83258),r(67116),r(1710),r(1710),r(50853),r(583),r(583),r(583),r(583),r(583),r(583),r(583),r(583),r(57908),r(53181),r(51358),r(31649),r(13400),r(89381),r(99406),r(26693),r(75594),r(92378),r(73796),r(73796),r(80088),r(97040),r(91079),r(42880),r(33503),r(24007),r(47734),r(55525),r(12543),r(1939),r(16556),r(73832),r(73832),r(73832),r(73832),r(35728),r(47630),r(47630),r(71110),r(63695),r(51208),r(44188),r(86370),r(95204),r(98556);var n=r(58573);Object.defineProperty(t,"NumberRange",{enumerable:!0,get:function(){return n.NumberRange}}),r(87039),r(58685),r(58685),r(16325),r(16325),r(87934),r(92991),r(35296),r(13095),r(13864),r(13864),r(13864),r(99474),r(1062),r(1062),r(6133),r(6133),r(6133),r(6133),r(47229),r(72098),r(20611),r(20611),r(25588),r(3479),r(48901),r(58871),r(67873),r(67873),r(17688),r(51526),r(33856),r(25934),r(25934),r(25934),r(25934),r(8606),r(51150),r(41251),r(41251),r(55832),r(1680),r(63506),r(81140),r(18990),r(28041),r(3085),r(66782),r(27838),r(6832),r(79534),r(67486),r(18458),r(93690),r(93690),r(93690),r(38358),r(8177),r(88398),r(70801),r(82976),r(82976),r(82976),r(87688),r(91095),r(13511),r(63787),r(22211),r(39767),r(99295),r(99295),r(9273),r(28141),r(12140),r(71759),r(43750),r(43750),r(43750),r(43750),r(38990),r(38990),r(61812),r(42064),r(94403),r(72991),r(79166),r(36407),r(61707),r(61707),r(61707),r(61707),r(61707),r(61707),r(61707),r(58017),r(58017),r(74797),r(74797),r(74797),r(74797),r(74797),r(74797),r(74797),r(74797),r(20694),r(20694),r(45161),r(46722),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(72912),r(67429),r(57404),r(38795),r(38795),r(95872),r(15825),r(1415),r(1415),r(39110),r(39110),r(49198),r(49198),r(63059),r(21463),r(17660),r(17660),r(17660),r(59814),r(27502),r(27502),r(21365),r(21365),r(21365),r(21365),r(21365),r(21365),r(21365),r(56566),r(56566),r(56566),r(56566),r(56566),r(56566),r(56566),r(71756),r(71756),r(51849),r(51849),r(51849),r(51849),r(51849),r(51849),r(51849),r(51849),r(51849),r(65111),r(48879),r(48879),r(71648),r(83565),r(83565),r(6394),r(6394),r(6394),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(14432),r(46359),r(46359),r(76175)},253:(e,t,r)=>{r.d(t,{YX:()=>runWorker});var n=r(88437),a=r(95754),o=r(7870),i=r(39940);function runWorker(e){let t=new e,r=(0,o.R)(self,"message");return(function(e,t){let r=t.pipe((0,i.UI)(e=>new n.P_(e.data.kind,e.data.value,e.data.error)),(0,i.DC)());return e.workUnit?r.pipe((0,i.bJ)(t=>(0,a.D)(e.workUnit(t)).pipe((0,i.iF)()))):e.work(r).pipe((0,i.iF)())})(t,r).subscribe(e=>{let r=postMessage;t.selectTransferables&&e.hasValue?r(e,t.selectTransferables(e.value)):r(e)})}},13728:(e,t,r)=>{let n;r.d(t,{z:()=>et}),function(e){e.assertEqual=e=>e,e.assertIs=function(e){},e.assertNever=function(e){throw Error()},e.arrayToEnum=e=>{let t={};for(let r of e)t[r]=r;return t},e.getValidEnumValues=t=>{let r=e.objectKeys(t).filter(e=>"number"!=typeof t[t[e]]),n={};for(let e of r)n[e]=t[e];return e.objectValues(n)},e.objectValues=t=>e.objectKeys(t).map(function(e){return t[e]}),e.objectKeys="function"==typeof Object.keys?e=>Object.keys(e):e=>{let t=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t},e.find=(e,t)=>{for(let r of e)if(t(r))return r},e.isInteger="function"==typeof Number.isInteger?e=>Number.isInteger(e):e=>"number"==typeof e&&isFinite(e)&&Math.floor(e)===e,e.joinValues=function(e,t=" | "){return e.map(e=>"string"==typeof e?`'${e}'`:e).join(t)},e.jsonStringifyReplacer=(e,t)=>"bigint"==typeof t?t.toString():t}(Y||(Y={})),(X||(X={})).mergeShapes=(e,t)=>({...e,...t});let a=Y.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),getParsedType=e=>{let t=typeof e;switch(t){case"undefined":return a.undefined;case"string":return a.string;case"number":return isNaN(e)?a.nan:a.number;case"boolean":return a.boolean;case"function":return a.function;case"bigint":return a.bigint;case"symbol":return a.symbol;case"object":if(Array.isArray(e))return a.array;if(null===e)return a.null;if(e.then&&"function"==typeof e.then&&e.catch&&"function"==typeof e.catch)return a.promise;if("undefined"!=typeof Map&&e instanceof Map)return a.map;if("undefined"!=typeof Set&&e instanceof Set)return a.set;if("undefined"!=typeof Date&&e instanceof Date)return a.date;return a.object;default:return a.unknown}},o=Y.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);let ZodError=class ZodError extends Error{constructor(e){super(),this.issues=[],this.addIssue=e=>{this.issues=[...this.issues,e]},this.addIssues=(e=[])=>{this.issues=[...this.issues,...e]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(e){return e.message},r={_errors:[]},processError=e=>{for(let n of e.issues)if("invalid_union"===n.code)n.unionErrors.map(processError);else if("invalid_return_type"===n.code)processError(n.returnTypeError);else if("invalid_arguments"===n.code)processError(n.argumentsError);else if(0===n.path.length)r._errors.push(t(n));else{let e=r,a=0;for(;a<n.path.length;){let r=n.path[a],o=a===n.path.length-1;o?(e[r]=e[r]||{_errors:[]},e[r]._errors.push(t(n))):e[r]=e[r]||{_errors:[]},e=e[r],a++}}};return processError(this),r}toString(){return this.message}get message(){return JSON.stringify(this.issues,Y.jsonStringifyReplacer,2)}get isEmpty(){return 0===this.issues.length}flatten(e=e=>e.message){let t={},r=[];for(let n of this.issues)n.path.length>0?(t[n.path[0]]=t[n.path[0]]||[],t[n.path[0]].push(e(n))):r.push(e(n));return{formErrors:r,fieldErrors:t}}get formErrors(){return this.flatten()}};ZodError.create=e=>{let t=new ZodError(e);return t};let errorMap=(e,t)=>{let r;switch(e.code){case o.invalid_type:r=e.received===a.undefined?"Required":`Expected ${e.expected}, received ${e.received}`;break;case o.invalid_literal:r=`Invalid literal value, expected ${JSON.stringify(e.expected,Y.jsonStringifyReplacer)}`;break;case o.unrecognized_keys:r=`Unrecognized key(s) in object: ${Y.joinValues(e.keys,", ")}`;break;case o.invalid_union:r="Invalid input";break;case o.invalid_union_discriminator:r=`Invalid discriminator value. Expected ${Y.joinValues(e.options)}`;break;case o.invalid_enum_value:r=`Invalid enum value. Expected ${Y.joinValues(e.options)}, received '${e.received}'`;break;case o.invalid_arguments:r="Invalid function arguments";break;case o.invalid_return_type:r="Invalid function return type";break;case o.invalid_date:r="Invalid date";break;case o.invalid_string:"object"==typeof e.validation?"includes"in e.validation?(r=`Invalid input: must include "${e.validation.includes}"`,"number"==typeof e.validation.position&&(r=`${r} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?r=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?r=`Invalid input: must end with "${e.validation.endsWith}"`:Y.assertNever(e.validation):r="regex"!==e.validation?`Invalid ${e.validation}`:"Invalid";break;case o.too_small:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:"date"===e.type?`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:"Invalid input";break;case o.too_big:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"bigint"===e.type?`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"date"===e.type?`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:"Invalid input";break;case o.custom:r="Invalid input";break;case o.invalid_intersection_types:r="Intersection results could not be merged";break;case o.not_multiple_of:r=`Number must be a multiple of ${e.multipleOf}`;break;case o.not_finite:r="Number must be finite";break;default:r=t.defaultError,Y.assertNever(e)}return{message:r}},i=errorMap;function getErrorMap(){return i}let makeIssue=e=>{let{data:t,path:r,errorMaps:n,issueData:a}=e,o=[...r,...a.path||[]],i={...a,path:o},s="",u=n.filter(e=>!!e).slice().reverse();for(let e of u)s=e(i,{data:t,defaultError:s}).message;return{...a,path:o,message:a.message||s}};function addIssueToContext(e,t){let r=makeIssue({issueData:t,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e)});e.common.issues.push(r)}let ParseStatus=class ParseStatus{constructor(){this.value="valid"}dirty(){"valid"===this.value&&(this.value="dirty")}abort(){"aborted"!==this.value&&(this.value="aborted")}static mergeArray(e,t){let r=[];for(let n of t){if("aborted"===n.status)return s;"dirty"===n.status&&e.dirty(),r.push(n.value)}return{status:e.value,value:r}}static async mergeObjectAsync(e,t){let r=[];for(let e of t)r.push({key:await e.key,value:await e.value});return ParseStatus.mergeObjectSync(e,r)}static mergeObjectSync(e,t){let r={};for(let n of t){let{key:t,value:a}=n;if("aborted"===t.status||"aborted"===a.status)return s;"dirty"===t.status&&e.dirty(),"dirty"===a.status&&e.dirty(),"__proto__"!==t.value&&(void 0!==a.value||n.alwaysSet)&&(r[t.value]=a.value)}return{status:e.value,value:r}}};let s=Object.freeze({status:"aborted"}),DIRTY=e=>({status:"dirty",value:e}),OK=e=>({status:"valid",value:e}),isAborted=e=>"aborted"===e.status,isDirty=e=>"dirty"===e.status,isValid=e=>"valid"===e.status,isAsync=e=>"undefined"!=typeof Promise&&e instanceof Promise;!function(e){e.errToObj=e=>"string"==typeof e?{message:e}:e||{},e.toString=e=>"string"==typeof e?e:null==e?void 0:e.message}(Q||(Q={}));let ParseInputLazyPath=class ParseInputLazyPath{constructor(e,t,r,n){this._cachedPath=[],this.parent=e,this.data=t,this._path=r,this._key=n}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}};let handleResult=(e,t)=>{if(isValid(t))return{success:!0,data:t.value};if(!e.common.issues.length)throw Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new ZodError(e.common.issues);return this._error=t,this._error}}};function processCreateParams(e){if(!e)return{};let{errorMap:t,invalid_type_error:r,required_error:n,description:a}=e;if(t&&(r||n))throw Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');return t?{errorMap:t,description:a}:{errorMap:(e,t)=>"invalid_type"!==e.code?{message:t.defaultError}:void 0===t.data?{message:null!=n?n:t.defaultError}:{message:null!=r?r:t.defaultError},description:a}}let ZodType=class ZodType{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return getParsedType(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new ParseStatus,ctx:{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(isAsync(t))throw Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let r=this.safeParse(e,t);if(r.success)return r.data;throw r.error}safeParse(e,t){var r;let n={common:{issues:[],async:null!==(r=null==t?void 0:t.async)&&void 0!==r&&r,contextualErrorMap:null==t?void 0:t.errorMap},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},a=this._parseSync({data:e,path:n.path,parent:n});return handleResult(n,a)}async parseAsync(e,t){let r=await this.safeParseAsync(e,t);if(r.success)return r.data;throw r.error}async safeParseAsync(e,t){let r={common:{issues:[],contextualErrorMap:null==t?void 0:t.errorMap,async:!0},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},n=this._parse({data:e,path:r.path,parent:r}),a=await (isAsync(n)?n:Promise.resolve(n));return handleResult(r,a)}refine(e,t){let getIssueProperties=e=>"string"==typeof t||void 0===t?{message:t}:"function"==typeof t?t(e):t;return this._refinement((t,r)=>{let n=e(t),setError=()=>r.addIssue({code:o.custom,...getIssueProperties(t)});return"undefined"!=typeof Promise&&n instanceof Promise?n.then(e=>!!e||(setError(),!1)):!!n||(setError(),!1)})}refinement(e,t){return this._refinement((r,n)=>!!e(r)||(n.addIssue("function"==typeof t?t(r,n):t),!1))}_refinement(e){return new ZodEffects({schema:this,typeName:ee.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ZodOptional.create(this,this._def)}nullable(){return ZodNullable.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return ZodArray.create(this,this._def)}promise(){return ZodPromise.create(this,this._def)}or(e){return ZodUnion.create([this,e],this._def)}and(e){return ZodIntersection.create(this,e,this._def)}transform(e){return new ZodEffects({...processCreateParams(this._def),schema:this,typeName:ee.ZodEffects,effect:{type:"transform",transform:e}})}default(e){return new ZodDefault({...processCreateParams(this._def),innerType:this,defaultValue:"function"==typeof e?e:()=>e,typeName:ee.ZodDefault})}brand(){return new ZodBranded({typeName:ee.ZodBranded,type:this,...processCreateParams(this._def)})}catch(e){return new ZodCatch({...processCreateParams(this._def),innerType:this,catchValue:"function"==typeof e?e:()=>e,typeName:ee.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return ZodPipeline.create(this,e)}readonly(){return ZodReadonly.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}};let u=/^c[^\s-]{8,}$/i,c=/^[a-z][a-z0-9]*$/,l=/^[0-9A-HJKMNP-TV-Z]{26}$/,d=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,h=/^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,p=/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,f=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,datetimeRegex=e=>e.precision?e.offset?RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`):RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`):0===e.precision?e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"):e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");let ZodString=class ZodString extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=String(e.data));let r=this._getType(e);if(r!==a.string){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.string,received:t.parsedType}),s}let i=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind)e.data.length<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),i.dirty());else if("max"===r.kind)e.data.length>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),i.dirty());else if("length"===r.kind){let n=e.data.length>r.value,a=e.data.length<r.value;(n||a)&&(t=this._getOrReturnCtx(e,t),n?addIssueToContext(t,{code:o.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}):a&&addIssueToContext(t,{code:o.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}),i.dirty())}else if("email"===r.kind)h.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"email",code:o.invalid_string,message:r.message}),i.dirty());else if("emoji"===r.kind)n||(n=RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")),n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"emoji",code:o.invalid_string,message:r.message}),i.dirty());else if("uuid"===r.kind)d.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"uuid",code:o.invalid_string,message:r.message}),i.dirty());else if("cuid"===r.kind)u.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid",code:o.invalid_string,message:r.message}),i.dirty());else if("cuid2"===r.kind)c.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid2",code:o.invalid_string,message:r.message}),i.dirty());else if("ulid"===r.kind)l.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ulid",code:o.invalid_string,message:r.message}),i.dirty());else if("url"===r.kind)try{new URL(e.data)}catch(n){addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"url",code:o.invalid_string,message:r.message}),i.dirty()}else if("regex"===r.kind){r.regex.lastIndex=0;let n=r.regex.test(e.data);n||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"regex",code:o.invalid_string,message:r.message}),i.dirty())}else if("trim"===r.kind)e.data=e.data.trim();else if("includes"===r.kind)e.data.includes(r.value,r.position)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{includes:r.value,position:r.position},message:r.message}),i.dirty());else if("toLowerCase"===r.kind)e.data=e.data.toLowerCase();else if("toUpperCase"===r.kind)e.data=e.data.toUpperCase();else if("startsWith"===r.kind)e.data.startsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{startsWith:r.value},message:r.message}),i.dirty());else if("endsWith"===r.kind)e.data.endsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{endsWith:r.value},message:r.message}),i.dirty());else if("datetime"===r.kind){let n=datetimeRegex(r);n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:"datetime",message:r.message}),i.dirty())}else if("ip"===r.kind){var m,g;m=e.data,("v4"===(g=r.version)||!g)&&p.test(m)||("v6"===g||!g)&&f.test(m)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ip",code:o.invalid_string,message:r.message}),i.dirty())}else Y.assertNever(r);return{status:i.value,value:e.data}}_regex(e,t,r){return this.refinement(t=>e.test(t),{validation:t,code:o.invalid_string,...Q.errToObj(r)})}_addCheck(e){return new ZodString({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...Q.errToObj(e)})}url(e){return this._addCheck({kind:"url",...Q.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...Q.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...Q.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...Q.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...Q.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...Q.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...Q.errToObj(e)})}datetime(e){var t;return"string"==typeof e?this._addCheck({kind:"datetime",precision:null,offset:!1,message:e}):this._addCheck({kind:"datetime",precision:void 0===(null==e?void 0:e.precision)?null:null==e?void 0:e.precision,offset:null!==(t=null==e?void 0:e.offset)&&void 0!==t&&t,...Q.errToObj(null==e?void 0:e.message)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...Q.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:null==t?void 0:t.position,...Q.errToObj(null==t?void 0:t.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...Q.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...Q.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...Q.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...Q.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...Q.errToObj(t)})}nonempty(e){return this.min(1,Q.errToObj(e))}trim(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>"datetime"===e.kind)}get isEmail(){return!!this._def.checks.find(e=>"email"===e.kind)}get isURL(){return!!this._def.checks.find(e=>"url"===e.kind)}get isEmoji(){return!!this._def.checks.find(e=>"emoji"===e.kind)}get isUUID(){return!!this._def.checks.find(e=>"uuid"===e.kind)}get isCUID(){return!!this._def.checks.find(e=>"cuid"===e.kind)}get isCUID2(){return!!this._def.checks.find(e=>"cuid2"===e.kind)}get isULID(){return!!this._def.checks.find(e=>"ulid"===e.kind)}get isIP(){return!!this._def.checks.find(e=>"ip"===e.kind)}get minLength(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodString.create=e=>{var t;return new ZodString({checks:[],typeName:ee.ZodString,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodNumber=class ZodNumber extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){let t;this._def.coerce&&(e.data=Number(e.data));let r=this._getType(e);if(r!==a.number){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.number,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("int"===r.kind)Y.isInteger(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_type,expected:"integer",received:"float",message:r.message}),n.dirty());else if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,minimum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,maximum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else"multipleOf"===r.kind?0!==function(e,t){let r=(e.toString().split(".")[1]||"").length,n=(t.toString().split(".")[1]||"").length,a=r>n?r:n,o=parseInt(e.toFixed(a).replace(".","")),i=parseInt(t.toFixed(a).replace(".",""));return o%i/Math.pow(10,a)}(e.data,r.value)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):"finite"===r.kind?Number.isFinite(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_finite,message:r.message}),n.dirty()):Y.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Q.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Q.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Q.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Q.toString(t))}setLimit(e,t,r,n){return new ZodNumber({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:Q.toString(n)}]})}_addCheck(e){return new ZodNumber({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:Q.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:Q.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:Q.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:Q.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:Q.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Q.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:Q.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:Q.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:Q.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>"int"===e.kind||"multipleOf"===e.kind&&Y.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let r of this._def.checks){if("finite"===r.kind||"int"===r.kind||"multipleOf"===r.kind)return!0;"min"===r.kind?(null===t||r.value>t)&&(t=r.value):"max"===r.kind&&(null===e||r.value<e)&&(e=r.value)}return Number.isFinite(t)&&Number.isFinite(e)}};ZodNumber.create=e=>new ZodNumber({checks:[],typeName:ee.ZodNumber,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodBigInt=class ZodBigInt extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){let t;this._def.coerce&&(e.data=BigInt(e.data));let r=this._getType(e);if(r!==a.bigint){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.bigint,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,type:"bigint",minimum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,type:"bigint",maximum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else"multipleOf"===r.kind?e.data%r.value!==BigInt(0)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):Y.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Q.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Q.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Q.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Q.toString(t))}setLimit(e,t,r,n){return new ZodBigInt({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:Q.toString(n)}]})}_addCheck(e){return new ZodBigInt({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:Q.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:Q.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:Q.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:Q.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Q.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodBigInt.create=e=>{var t;return new ZodBigInt({checks:[],typeName:ee.ZodBigInt,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodBoolean=class ZodBoolean extends ZodType{_parse(e){this._def.coerce&&(e.data=!!e.data);let t=this._getType(e);if(t!==a.boolean){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.boolean,received:t.parsedType}),s}return OK(e.data)}};ZodBoolean.create=e=>new ZodBoolean({typeName:ee.ZodBoolean,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodDate=class ZodDate extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=new Date(e.data));let r=this._getType(e);if(r!==a.date){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.date,received:t.parsedType}),s}if(isNaN(e.data.getTime())){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_date}),s}let n=new ParseStatus;for(let r of this._def.checks)"min"===r.kind?e.data.getTime()<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,message:r.message,inclusive:!0,exact:!1,minimum:r.value,type:"date"}),n.dirty()):"max"===r.kind?e.data.getTime()>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,message:r.message,inclusive:!0,exact:!1,maximum:r.value,type:"date"}),n.dirty()):Y.assertNever(r);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new ZodDate({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:Q.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:Q.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return null!=e?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return null!=e?new Date(e):null}};ZodDate.create=e=>new ZodDate({checks:[],coerce:(null==e?void 0:e.coerce)||!1,typeName:ee.ZodDate,...processCreateParams(e)});let ZodSymbol=class ZodSymbol extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.symbol){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.symbol,received:t.parsedType}),s}return OK(e.data)}};ZodSymbol.create=e=>new ZodSymbol({typeName:ee.ZodSymbol,...processCreateParams(e)});let ZodUndefined=class ZodUndefined extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.undefined,received:t.parsedType}),s}return OK(e.data)}};ZodUndefined.create=e=>new ZodUndefined({typeName:ee.ZodUndefined,...processCreateParams(e)});let ZodNull=class ZodNull extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.null){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.null,received:t.parsedType}),s}return OK(e.data)}};ZodNull.create=e=>new ZodNull({typeName:ee.ZodNull,...processCreateParams(e)});let ZodAny=class ZodAny extends ZodType{constructor(){super(...arguments),this._any=!0}_parse(e){return OK(e.data)}};ZodAny.create=e=>new ZodAny({typeName:ee.ZodAny,...processCreateParams(e)});let ZodUnknown=class ZodUnknown extends ZodType{constructor(){super(...arguments),this._unknown=!0}_parse(e){return OK(e.data)}};ZodUnknown.create=e=>new ZodUnknown({typeName:ee.ZodUnknown,...processCreateParams(e)});let ZodNever=class ZodNever extends ZodType{_parse(e){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.never,received:t.parsedType}),s}};ZodNever.create=e=>new ZodNever({typeName:ee.ZodNever,...processCreateParams(e)});let ZodVoid=class ZodVoid extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.void,received:t.parsedType}),s}return OK(e.data)}};ZodVoid.create=e=>new ZodVoid({typeName:ee.ZodVoid,...processCreateParams(e)});let ZodArray=class ZodArray extends ZodType{_parse(e){let{ctx:t,status:r}=this._processInputParams(e),n=this._def;if(t.parsedType!==a.array)return addIssueToContext(t,{code:o.invalid_type,expected:a.array,received:t.parsedType}),s;if(null!==n.exactLength){let e=t.data.length>n.exactLength.value,a=t.data.length<n.exactLength.value;(e||a)&&(addIssueToContext(t,{code:e?o.too_big:o.too_small,minimum:a?n.exactLength.value:void 0,maximum:e?n.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:n.exactLength.message}),r.dirty())}if(null!==n.minLength&&t.data.length<n.minLength.value&&(addIssueToContext(t,{code:o.too_small,minimum:n.minLength.value,type:"array",inclusive:!0,exact:!1,message:n.minLength.message}),r.dirty()),null!==n.maxLength&&t.data.length>n.maxLength.value&&(addIssueToContext(t,{code:o.too_big,maximum:n.maxLength.value,type:"array",inclusive:!0,exact:!1,message:n.maxLength.message}),r.dirty()),t.common.async)return Promise.all([...t.data].map((e,r)=>n.type._parseAsync(new ParseInputLazyPath(t,e,t.path,r)))).then(e=>ParseStatus.mergeArray(r,e));let i=[...t.data].map((e,r)=>n.type._parseSync(new ParseInputLazyPath(t,e,t.path,r)));return ParseStatus.mergeArray(r,i)}get element(){return this._def.type}min(e,t){return new ZodArray({...this._def,minLength:{value:e,message:Q.toString(t)}})}max(e,t){return new ZodArray({...this._def,maxLength:{value:e,message:Q.toString(t)}})}length(e,t){return new ZodArray({...this._def,exactLength:{value:e,message:Q.toString(t)}})}nonempty(e){return this.min(1,e)}};ZodArray.create=(e,t)=>new ZodArray({type:e,minLength:null,maxLength:null,exactLength:null,typeName:ee.ZodArray,...processCreateParams(t)});let ZodObject=class ZodObject extends ZodType{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(null!==this._cached)return this._cached;let e=this._def.shape(),t=Y.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){let t=this._getType(e);if(t!==a.object){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.object,received:t.parsedType}),s}let{status:r,ctx:n}=this._processInputParams(e),{shape:i,keys:u}=this._getCached(),c=[];if(!(this._def.catchall instanceof ZodNever&&"strip"===this._def.unknownKeys))for(let e in n.data)u.includes(e)||c.push(e);let l=[];for(let e of u){let t=i[e],r=n.data[e];l.push({key:{status:"valid",value:e},value:t._parse(new ParseInputLazyPath(n,r,n.path,e)),alwaysSet:e in n.data})}if(this._def.catchall instanceof ZodNever){let e=this._def.unknownKeys;if("passthrough"===e)for(let e of c)l.push({key:{status:"valid",value:e},value:{status:"valid",value:n.data[e]}});else if("strict"===e)c.length>0&&(addIssueToContext(n,{code:o.unrecognized_keys,keys:c}),r.dirty());else if("strip"===e);else throw Error("Internal ZodObject error: invalid unknownKeys value.")}else{let e=this._def.catchall;for(let t of c){let r=n.data[t];l.push({key:{status:"valid",value:t},value:e._parse(new ParseInputLazyPath(n,r,n.path,t)),alwaysSet:t in n.data})}}return n.common.async?Promise.resolve().then(async()=>{let e=[];for(let t of l){let r=await t.key;e.push({key:r,value:await t.value,alwaysSet:t.alwaysSet})}return e}).then(e=>ParseStatus.mergeObjectSync(r,e)):ParseStatus.mergeObjectSync(r,l)}get shape(){return this._def.shape()}strict(e){return Q.errToObj,new ZodObject({...this._def,unknownKeys:"strict",...void 0!==e?{errorMap:(t,r)=>{var n,a,o,i;let s=null!==(o=null===(a=(n=this._def).errorMap)||void 0===a?void 0:a.call(n,t,r).message)&&void 0!==o?o:r.defaultError;return"unrecognized_keys"===t.code?{message:null!==(i=Q.errToObj(e).message)&&void 0!==i?i:s}:{message:s}}}:{}})}strip(){return new ZodObject({...this._def,unknownKeys:"strip"})}passthrough(){return new ZodObject({...this._def,unknownKeys:"passthrough"})}extend(e){return new ZodObject({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){let t=new ZodObject({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:ee.ZodObject});return t}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new ZodObject({...this._def,catchall:e})}pick(e){let t={};return Y.objectKeys(e).forEach(r=>{e[r]&&this.shape[r]&&(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}omit(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{e[r]||(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}deepPartial(){return function deepPartialify(e){if(e instanceof ZodObject){let t={};for(let r in e.shape){let n=e.shape[r];t[r]=ZodOptional.create(deepPartialify(n))}return new ZodObject({...e._def,shape:()=>t})}return e instanceof ZodArray?new ZodArray({...e._def,type:deepPartialify(e.element)}):e instanceof ZodOptional?ZodOptional.create(deepPartialify(e.unwrap())):e instanceof ZodNullable?ZodNullable.create(deepPartialify(e.unwrap())):e instanceof ZodTuple?ZodTuple.create(e.items.map(e=>deepPartialify(e))):e}(this)}partial(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{let n=this.shape[r];e&&!e[r]?t[r]=n:t[r]=n.optional()}),new ZodObject({...this._def,shape:()=>t})}required(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{if(e&&!e[r])t[r]=this.shape[r];else{let e=this.shape[r],n=e;for(;n instanceof ZodOptional;)n=n._def.innerType;t[r]=n}}),new ZodObject({...this._def,shape:()=>t})}keyof(){return createZodEnum(Y.objectKeys(this.shape))}};ZodObject.create=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)}),ZodObject.strictCreate=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strict",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)}),ZodObject.lazycreate=(e,t)=>new ZodObject({shape:e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)});let ZodUnion=class ZodUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.options;if(t.common.async)return Promise.all(r.map(async e=>{let r={...t,common:{...t.common,issues:[]},parent:null};return{result:await e._parseAsync({data:t.data,path:t.path,parent:r}),ctx:r}})).then(function(e){for(let t of e)if("valid"===t.result.status)return t.result;for(let r of e)if("dirty"===r.result.status)return t.common.issues.push(...r.ctx.common.issues),r.result;let r=e.map(e=>new ZodError(e.ctx.common.issues));return addIssueToContext(t,{code:o.invalid_union,unionErrors:r}),s});{let e;let n=[];for(let a of r){let r={...t,common:{...t.common,issues:[]},parent:null},o=a._parseSync({data:t.data,path:t.path,parent:r});if("valid"===o.status)return o;"dirty"!==o.status||e||(e={result:o,ctx:r}),r.common.issues.length&&n.push(r.common.issues)}if(e)return t.common.issues.push(...e.ctx.common.issues),e.result;let a=n.map(e=>new ZodError(e));return addIssueToContext(t,{code:o.invalid_union,unionErrors:a}),s}}get options(){return this._def.options}};ZodUnion.create=(e,t)=>new ZodUnion({options:e,typeName:ee.ZodUnion,...processCreateParams(t)});let getDiscriminator=e=>{if(e instanceof ZodLazy)return getDiscriminator(e.schema);if(e instanceof ZodEffects)return getDiscriminator(e.innerType());if(e instanceof ZodLiteral)return[e.value];if(e instanceof ZodEnum)return e.options;if(e instanceof ZodNativeEnum)return Object.keys(e.enum);if(e instanceof ZodDefault)return getDiscriminator(e._def.innerType);if(e instanceof ZodUndefined)return[void 0];else if(e instanceof ZodNull)return[null];else return null};let ZodDiscriminatedUnion=class ZodDiscriminatedUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.object)return addIssueToContext(t,{code:o.invalid_type,expected:a.object,received:t.parsedType}),s;let r=this.discriminator,n=t.data[r],i=this.optionsMap.get(n);return i?t.common.async?i._parseAsync({data:t.data,path:t.path,parent:t}):i._parseSync({data:t.data,path:t.path,parent:t}):(addIssueToContext(t,{code:o.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),s)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,r){let n=new Map;for(let r of t){let t=getDiscriminator(r.shape[e]);if(!t)throw Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let a of t){if(n.has(a))throw Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);n.set(a,r)}}return new ZodDiscriminatedUnion({typeName:ee.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:n,...processCreateParams(r)})}};let ZodIntersection=class ZodIntersection extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e),handleParsed=(e,n)=>{if(isAborted(e)||isAborted(n))return s;let i=function mergeValues(e,t){let r=getParsedType(e),n=getParsedType(t);if(e===t)return{valid:!0,data:e};if(r===a.object&&n===a.object){let r=Y.objectKeys(t),n=Y.objectKeys(e).filter(e=>-1!==r.indexOf(e)),a={...e,...t};for(let r of n){let n=mergeValues(e[r],t[r]);if(!n.valid)return{valid:!1};a[r]=n.data}return{valid:!0,data:a}}if(r===a.array&&n===a.array){if(e.length!==t.length)return{valid:!1};let r=[];for(let n=0;n<e.length;n++){let a=e[n],o=t[n],i=mergeValues(a,o);if(!i.valid)return{valid:!1};r.push(i.data)}return{valid:!0,data:r}}return r===a.date&&n===a.date&&+e==+t?{valid:!0,data:e}:{valid:!1}}(e.value,n.value);return i.valid?((isDirty(e)||isDirty(n))&&t.dirty(),{status:t.value,value:i.data}):(addIssueToContext(r,{code:o.invalid_intersection_types}),s)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then(([e,t])=>handleParsed(e,t)):handleParsed(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}};ZodIntersection.create=(e,t,r)=>new ZodIntersection({left:e,right:t,typeName:ee.ZodIntersection,...processCreateParams(r)});let ZodTuple=class ZodTuple extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.array)return addIssueToContext(r,{code:o.invalid_type,expected:a.array,received:r.parsedType}),s;if(r.data.length<this._def.items.length)return addIssueToContext(r,{code:o.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),s;let n=this._def.rest;!n&&r.data.length>this._def.items.length&&(addIssueToContext(r,{code:o.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let i=[...r.data].map((e,t)=>{let n=this._def.items[t]||this._def.rest;return n?n._parse(new ParseInputLazyPath(r,e,r.path,t)):null}).filter(e=>!!e);return r.common.async?Promise.all(i).then(e=>ParseStatus.mergeArray(t,e)):ParseStatus.mergeArray(t,i)}get items(){return this._def.items}rest(e){return new ZodTuple({...this._def,rest:e})}};ZodTuple.create=(e,t)=>{if(!Array.isArray(e))throw Error("You must pass an array of schemas to z.tuple([ ... ])");return new ZodTuple({items:e,typeName:ee.ZodTuple,rest:null,...processCreateParams(t)})};let ZodRecord=class ZodRecord extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.object)return addIssueToContext(r,{code:o.invalid_type,expected:a.object,received:r.parsedType}),s;let n=[],i=this._def.keyType,u=this._def.valueType;for(let e in r.data)n.push({key:i._parse(new ParseInputLazyPath(r,e,r.path,e)),value:u._parse(new ParseInputLazyPath(r,r.data[e],r.path,e))});return r.common.async?ParseStatus.mergeObjectAsync(t,n):ParseStatus.mergeObjectSync(t,n)}get element(){return this._def.valueType}static create(e,t,r){return new ZodRecord(t instanceof ZodType?{keyType:e,valueType:t,typeName:ee.ZodRecord,...processCreateParams(r)}:{keyType:ZodString.create(),valueType:e,typeName:ee.ZodRecord,...processCreateParams(t)})}};let ZodMap=class ZodMap extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.map)return addIssueToContext(r,{code:o.invalid_type,expected:a.map,received:r.parsedType}),s;let n=this._def.keyType,i=this._def.valueType,u=[...r.data.entries()].map(([e,t],a)=>({key:n._parse(new ParseInputLazyPath(r,e,r.path,[a,"key"])),value:i._parse(new ParseInputLazyPath(r,t,r.path,[a,"value"]))}));if(r.common.async){let e=new Map;return Promise.resolve().then(async()=>{for(let r of u){let n=await r.key,a=await r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}})}{let e=new Map;for(let r of u){let n=r.key,a=r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}}}};ZodMap.create=(e,t,r)=>new ZodMap({valueType:t,keyType:e,typeName:ee.ZodMap,...processCreateParams(r)});let ZodSet=class ZodSet extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.set)return addIssueToContext(r,{code:o.invalid_type,expected:a.set,received:r.parsedType}),s;let n=this._def;null!==n.minSize&&r.data.size<n.minSize.value&&(addIssueToContext(r,{code:o.too_small,minimum:n.minSize.value,type:"set",inclusive:!0,exact:!1,message:n.minSize.message}),t.dirty()),null!==n.maxSize&&r.data.size>n.maxSize.value&&(addIssueToContext(r,{code:o.too_big,maximum:n.maxSize.value,type:"set",inclusive:!0,exact:!1,message:n.maxSize.message}),t.dirty());let i=this._def.valueType;function finalizeSet(e){let r=new Set;for(let n of e){if("aborted"===n.status)return s;"dirty"===n.status&&t.dirty(),r.add(n.value)}return{status:t.value,value:r}}let u=[...r.data.values()].map((e,t)=>i._parse(new ParseInputLazyPath(r,e,r.path,t)));return r.common.async?Promise.all(u).then(e=>finalizeSet(e)):finalizeSet(u)}min(e,t){return new ZodSet({...this._def,minSize:{value:e,message:Q.toString(t)}})}max(e,t){return new ZodSet({...this._def,maxSize:{value:e,message:Q.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};ZodSet.create=(e,t)=>new ZodSet({valueType:e,minSize:null,maxSize:null,typeName:ee.ZodSet,...processCreateParams(t)});let ZodFunction=class ZodFunction extends ZodType{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.function)return addIssueToContext(t,{code:o.invalid_type,expected:a.function,received:t.parsedType}),s;function makeArgsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:o.invalid_arguments,argumentsError:r}})}function makeReturnsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:o.invalid_return_type,returnTypeError:r}})}let r={errorMap:t.common.contextualErrorMap},n=t.data;if(this._def.returns instanceof ZodPromise){let e=this;return OK(async function(...t){let a=new ZodError([]),o=await e._def.args.parseAsync(t,r).catch(e=>{throw a.addIssue(makeArgsIssue(t,e)),a}),i=await Reflect.apply(n,this,o),s=await e._def.returns._def.type.parseAsync(i,r).catch(e=>{throw a.addIssue(makeReturnsIssue(i,e)),a});return s})}{let e=this;return OK(function(...t){let a=e._def.args.safeParse(t,r);if(!a.success)throw new ZodError([makeArgsIssue(t,a.error)]);let o=Reflect.apply(n,this,a.data),i=e._def.returns.safeParse(o,r);if(!i.success)throw new ZodError([makeReturnsIssue(o,i.error)]);return i.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new ZodFunction({...this._def,args:ZodTuple.create(e).rest(ZodUnknown.create())})}returns(e){return new ZodFunction({...this._def,returns:e})}implement(e){let t=this.parse(e);return t}strictImplement(e){let t=this.parse(e);return t}static create(e,t,r){return new ZodFunction({args:e||ZodTuple.create([]).rest(ZodUnknown.create()),returns:t||ZodUnknown.create(),typeName:ee.ZodFunction,...processCreateParams(r)})}};let ZodLazy=class ZodLazy extends ZodType{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.getter();return r._parse({data:t.data,path:t.path,parent:t})}};ZodLazy.create=(e,t)=>new ZodLazy({getter:e,typeName:ee.ZodLazy,...processCreateParams(t)});let ZodLiteral=class ZodLiteral extends ZodType{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{received:t.data,code:o.invalid_literal,expected:this._def.value}),s}return{status:"valid",value:e.data}}get value(){return this._def.value}};function createZodEnum(e,t){return new ZodEnum({values:e,typeName:ee.ZodEnum,...processCreateParams(t)})}ZodLiteral.create=(e,t)=>new ZodLiteral({value:e,typeName:ee.ZodLiteral,...processCreateParams(t)});let ZodEnum=class ZodEnum extends ZodType{_parse(e){if("string"!=typeof e.data){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{expected:Y.joinValues(r),received:t.parsedType,code:o.invalid_type}),s}if(-1===this._def.values.indexOf(e.data)){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{received:t.data,code:o.invalid_enum_value,options:r}),s}return OK(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e){return ZodEnum.create(e)}exclude(e){return ZodEnum.create(this.options.filter(t=>!e.includes(t)))}};ZodEnum.create=createZodEnum;let ZodNativeEnum=class ZodNativeEnum extends ZodType{_parse(e){let t=Y.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(e);if(r.parsedType!==a.string&&r.parsedType!==a.number){let e=Y.objectValues(t);return addIssueToContext(r,{expected:Y.joinValues(e),received:r.parsedType,code:o.invalid_type}),s}if(-1===t.indexOf(e.data)){let e=Y.objectValues(t);return addIssueToContext(r,{received:r.data,code:o.invalid_enum_value,options:e}),s}return OK(e.data)}get enum(){return this._def.values}};ZodNativeEnum.create=(e,t)=>new ZodNativeEnum({values:e,typeName:ee.ZodNativeEnum,...processCreateParams(t)});let ZodPromise=class ZodPromise extends ZodType{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.promise&&!1===t.common.async)return addIssueToContext(t,{code:o.invalid_type,expected:a.promise,received:t.parsedType}),s;let r=t.parsedType===a.promise?t.data:Promise.resolve(t.data);return OK(r.then(e=>this._def.type.parseAsync(e,{path:t.path,errorMap:t.common.contextualErrorMap})))}};ZodPromise.create=(e,t)=>new ZodPromise({type:e,typeName:ee.ZodPromise,...processCreateParams(t)});let ZodEffects=class ZodEffects extends ZodType{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===ee.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:r}=this._processInputParams(e),n=this._def.effect||null,a={addIssue:e=>{addIssueToContext(r,e),e.fatal?t.abort():t.dirty()},get path(){return r.path}};if(a.addIssue=a.addIssue.bind(a),"preprocess"===n.type){let e=n.transform(r.data,a);return r.common.issues.length?{status:"dirty",value:r.data}:r.common.async?Promise.resolve(e).then(e=>this._def.schema._parseAsync({data:e,path:r.path,parent:r})):this._def.schema._parseSync({data:e,path:r.path,parent:r})}if("refinement"===n.type){let executeRefinement=e=>{let t=n.refinement(e,a);if(r.common.async)return Promise.resolve(t);if(t instanceof Promise)throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return e};if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value).then(()=>({status:t.value,value:e.value}))));{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value),{status:t.value,value:e.value})}}if("transform"===n.type){if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>isValid(e)?Promise.resolve(n.transform(e.value,a)).then(e=>({status:t.value,value:e})):e);{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!isValid(e))return e;let o=n.transform(e.value,a);if(o instanceof Promise)throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}}Y.assertNever(n)}};ZodEffects.create=(e,t,r)=>new ZodEffects({schema:e,typeName:ee.ZodEffects,effect:t,...processCreateParams(r)}),ZodEffects.createWithPreprocess=(e,t,r)=>new ZodEffects({schema:t,effect:{type:"preprocess",transform:e},typeName:ee.ZodEffects,...processCreateParams(r)});let ZodOptional=class ZodOptional extends ZodType{_parse(e){let t=this._getType(e);return t===a.undefined?OK(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodOptional.create=(e,t)=>new ZodOptional({innerType:e,typeName:ee.ZodOptional,...processCreateParams(t)});let ZodNullable=class ZodNullable extends ZodType{_parse(e){let t=this._getType(e);return t===a.null?OK(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodNullable.create=(e,t)=>new ZodNullable({innerType:e,typeName:ee.ZodNullable,...processCreateParams(t)});let ZodDefault=class ZodDefault extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return t.parsedType===a.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};ZodDefault.create=(e,t)=>new ZodDefault({innerType:e,typeName:ee.ZodDefault,defaultValue:"function"==typeof t.default?t.default:()=>t.default,...processCreateParams(t)});let ZodCatch=class ZodCatch extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r={...t,common:{...t.common,issues:[]}},n=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return isAsync(n)?n.then(e=>({status:"valid",value:"valid"===e.status?e.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})})):{status:"valid",value:"valid"===n.status?n.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}};ZodCatch.create=(e,t)=>new ZodCatch({innerType:e,typeName:ee.ZodCatch,catchValue:"function"==typeof t.catch?t.catch:()=>t.catch,...processCreateParams(t)});let ZodNaN=class ZodNaN extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.nan){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.nan,received:t.parsedType}),s}return{status:"valid",value:e.data}}};ZodNaN.create=e=>new ZodNaN({typeName:ee.ZodNaN,...processCreateParams(e)});let m=Symbol("zod_brand");let ZodBranded=class ZodBranded extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return this._def.type._parse({data:r,path:t.path,parent:t})}unwrap(){return this._def.type}};let ZodPipeline=class ZodPipeline extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.common.async){let handleAsync=async()=>{let e=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),DIRTY(e.value)):this._def.out._parseAsync({data:e.value,path:r.path,parent:r})};return handleAsync()}{let e=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),{status:"dirty",value:e.value}):this._def.out._parseSync({data:e.value,path:r.path,parent:r})}}static create(e,t){return new ZodPipeline({in:e,out:t,typeName:ee.ZodPipeline})}};let ZodReadonly=class ZodReadonly extends ZodType{_parse(e){let t=this._def.innerType._parse(e);return isValid(t)&&(t.value=Object.freeze(t.value)),t}};ZodReadonly.create=(e,t)=>new ZodReadonly({innerType:e,typeName:ee.ZodReadonly,...processCreateParams(t)});let custom=(e,t={},r)=>e?ZodAny.create().superRefine((n,a)=>{var o,i;if(!e(n)){let e="function"==typeof t?t(n):"string"==typeof t?{message:t}:t,s=null===(i=null!==(o=e.fatal)&&void 0!==o?o:r)||void 0===i||i,u="string"==typeof e?{message:e}:e;a.addIssue({code:"custom",...u,fatal:s})}}):ZodAny.create(),g={object:ZodObject.lazycreate};!function(e){e.ZodString="ZodString",e.ZodNumber="ZodNumber",e.ZodNaN="ZodNaN",e.ZodBigInt="ZodBigInt",e.ZodBoolean="ZodBoolean",e.ZodDate="ZodDate",e.ZodSymbol="ZodSymbol",e.ZodUndefined="ZodUndefined",e.ZodNull="ZodNull",e.ZodAny="ZodAny",e.ZodUnknown="ZodUnknown",e.ZodNever="ZodNever",e.ZodVoid="ZodVoid",e.ZodArray="ZodArray",e.ZodObject="ZodObject",e.ZodUnion="ZodUnion",e.ZodDiscriminatedUnion="ZodDiscriminatedUnion",e.ZodIntersection="ZodIntersection",e.ZodTuple="ZodTuple",e.ZodRecord="ZodRecord",e.ZodMap="ZodMap",e.ZodSet="ZodSet",e.ZodFunction="ZodFunction",e.ZodLazy="ZodLazy",e.ZodLiteral="ZodLiteral",e.ZodEnum="ZodEnum",e.ZodEffects="ZodEffects",e.ZodNativeEnum="ZodNativeEnum",e.ZodOptional="ZodOptional",e.ZodNullable="ZodNullable",e.ZodDefault="ZodDefault",e.ZodCatch="ZodCatch",e.ZodPromise="ZodPromise",e.ZodBranded="ZodBranded",e.ZodPipeline="ZodPipeline",e.ZodReadonly="ZodReadonly"}(ee||(ee={}));let v=ZodString.create,y=ZodNumber.create,b=ZodNaN.create,_=ZodBigInt.create,T=ZodBoolean.create,w=ZodDate.create,k=ZodSymbol.create,x=ZodUndefined.create,S=ZodNull.create,E=ZodAny.create,A=ZodUnknown.create,I=ZodNever.create,N=ZodVoid.create,M=ZodArray.create,D=ZodObject.create,R=ZodObject.strictCreate,O=ZodUnion.create,P=ZodDiscriminatedUnion.create,C=ZodIntersection.create,B=ZodTuple.create,F=ZodRecord.create,Z=ZodMap.create,z=ZodSet.create,L=ZodFunction.create,G=ZodLazy.create,U=ZodLiteral.create,W=ZodEnum.create,K=ZodNativeEnum.create,j=ZodPromise.create,V=ZodEffects.create,q=ZodOptional.create,H=ZodNullable.create,$=ZodEffects.createWithPreprocess,J=ZodPipeline.create;var Y,X,Q,ee,et=Object.freeze({__proto__:null,defaultErrorMap:errorMap,setErrorMap:function(e){i=e},getErrorMap:getErrorMap,makeIssue:makeIssue,EMPTY_PATH:[],addIssueToContext:addIssueToContext,ParseStatus:ParseStatus,INVALID:s,DIRTY:DIRTY,OK:OK,isAborted:isAborted,isDirty:isDirty,isValid:isValid,isAsync:isAsync,get util(){return Y},get objectUtil(){return X},ZodParsedType:a,getParsedType:getParsedType,ZodType:ZodType,ZodString:ZodString,ZodNumber:ZodNumber,ZodBigInt:ZodBigInt,ZodBoolean:ZodBoolean,ZodDate:ZodDate,ZodSymbol:ZodSymbol,ZodUndefined:ZodUndefined,ZodNull:ZodNull,ZodAny:ZodAny,ZodUnknown:ZodUnknown,ZodNever:ZodNever,ZodVoid:ZodVoid,ZodArray:ZodArray,ZodObject:ZodObject,ZodUnion:ZodUnion,ZodDiscriminatedUnion:ZodDiscriminatedUnion,ZodIntersection:ZodIntersection,ZodTuple:ZodTuple,ZodRecord:ZodRecord,ZodMap:ZodMap,ZodSet:ZodSet,ZodFunction:ZodFunction,ZodLazy:ZodLazy,ZodLiteral:ZodLiteral,ZodEnum:ZodEnum,ZodNativeEnum:ZodNativeEnum,ZodPromise:ZodPromise,ZodEffects:ZodEffects,ZodTransformer:ZodEffects,ZodOptional:ZodOptional,ZodNullable:ZodNullable,ZodDefault:ZodDefault,ZodCatch:ZodCatch,ZodNaN:ZodNaN,BRAND:m,ZodBranded:ZodBranded,ZodPipeline:ZodPipeline,ZodReadonly:ZodReadonly,custom:custom,Schema:ZodType,ZodSchema:ZodType,late:g,get ZodFirstPartyTypeKind(){return ee},coerce:{string:e=>ZodString.create({...e,coerce:!0}),number:e=>ZodNumber.create({...e,coerce:!0}),boolean:e=>ZodBoolean.create({...e,coerce:!0}),bigint:e=>ZodBigInt.create({...e,coerce:!0}),date:e=>ZodDate.create({...e,coerce:!0})},any:E,array:M,bigint:_,boolean:T,date:w,discriminatedUnion:P,effect:V,enum:W,function:L,instanceof:(e,t={message:`Input not instance of ${e.name}`})=>custom(t=>t instanceof e,t),intersection:C,lazy:G,literal:U,map:Z,nan:b,nativeEnum:K,never:I,null:S,nullable:H,number:y,object:D,oboolean:()=>T().optional(),onumber:()=>y().optional(),optional:q,ostring:()=>v().optional(),pipeline:J,preprocess:$,promise:j,record:F,set:z,strictObject:R,string:v,symbol:k,transformer:V,tuple:B,undefined:x,union:O,unknown:A,void:N,NEVER:s,ZodIssueCode:o,quotelessJson:e=>{let t=JSON.stringify(e,null,2);return t.replace(/"([^"]+)":/g,"$1:")},ZodError:ZodError})}};