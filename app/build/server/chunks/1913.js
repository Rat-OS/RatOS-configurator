"use strict";exports.id=1913,exports.ids=[1913,5160],exports.modules={95160:(e,t,r)=>{var n,a,o,i,s,u,c,l,d,extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(a,o){function fulfilled(e){try{step(n.next(e))}catch(e){o(e)}}function rejected(e){try{step(n.throw(e))}catch(e){o(e)}}function step(e){var t;e.done?a(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}function __generator(e,t){var r,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function verb(o){return function(s){return function(o){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,o=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)i.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(a)throw a.error}}return i}function __spreadArray(e,t,r){if(r||2==arguments.length)for(var n,a=0,o=t.length;a<o;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}var f=function(){function DataStorage(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}return DataStorage.prototype.get=function(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)},DataStorage.prototype.set=function(e,t){this.dataIdsCount++,this.data.set(e,t)},DataStorage.prototype.has=function(e){return this.data.has(e)},DataStorage.prototype.delete=function(e){return this.dataIdsCount--,this.data.delete(e)},DataStorage.prototype.numDataIds=function(){return this.dataIdsCount},DataStorage}(),p=function(){function KernelBackend(){}return KernelBackend.prototype.refCount=function(e){return notYetImplemented("refCount")},KernelBackend.prototype.incRef=function(e){return notYetImplemented("incRef")},KernelBackend.prototype.timerAvailable=function(){return!0},KernelBackend.prototype.time=function(e){return notYetImplemented("time")},KernelBackend.prototype.read=function(e){return notYetImplemented("read")},KernelBackend.prototype.readSync=function(e){return notYetImplemented("readSync")},KernelBackend.prototype.readToGPU=function(e,t){return notYetImplemented("readToGPU")},KernelBackend.prototype.numDataIds=function(){return notYetImplemented("numDataIds")},KernelBackend.prototype.disposeData=function(e,t){return notYetImplemented("disposeData")},KernelBackend.prototype.write=function(e,t,r){return notYetImplemented("write")},KernelBackend.prototype.move=function(e,t,r,n,a){return notYetImplemented("move")},KernelBackend.prototype.createTensorFromGPUData=function(e,t,r){return notYetImplemented("createTensorFromGPUData")},KernelBackend.prototype.memory=function(){return notYetImplemented("memory")},KernelBackend.prototype.floatPrecision=function(){return notYetImplemented("floatPrecision")},KernelBackend.prototype.epsilon=function(){return 32===this.floatPrecision()?1e-7:1e-4},KernelBackend.prototype.dispose=function(){return notYetImplemented("dispose")},KernelBackend}();function notYetImplemented(e){throw Error("'".concat(e,"' not yet implemented or not found in the registry. ")+"This kernel may not be supported by the tfjs backend you have chosen")}/**
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
 */function shuffle(e){for(var t=e.length,r=0;t>0;)r=Math.random()*t|0,swap(e,--t,r)}function clamp(e,t,r){return Math.max(e,Math.min(t,r))}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function assertShapesMatch(e,t,r){void 0===r&&(r=""),assert(arraysEqual(e,t),function(){return r+" Shapes ".concat(e," and ").concat(t," must match")})}function assertNonNull(e){assert(null!=e,function(){return"The input to the tensor constructor must be a non-null value."})}function sizeFromShape(e){if(0===e.length)return 1;for(var t=e[0],r=1;r<e.length;r++)t*=e[r];return t}function arraysEqualWithNull(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(null!==e[r]&&null!==t[r]&&e[r]!==t[r])return!1;return!0}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function isInt(e){return e%1==0}function rightPad(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function parseAxisParam(e,t){var r=t.length;return assert((e=null==e?t.map(function(e,t){return t}):[].concat(e)).every(function(e){return e>=-r&&e<r}),function(){return"All values in axis param must be in range [-".concat(r,", ").concat(r,") but ")+"got axis ".concat(e)}),assert(e.every(function(e){return isInt(e)}),function(){return"All values in axis param must be integers but "+"got axis ".concat(e)}),e.map(function(e){return e<0?r+e:e})}function squeezeShape(e,t){for(var r=[],n=[],a=null!=t&&Array.isArray(t)&&0===t.length,o=null==t||a?null:parseAxisParam(t,e).sort(),i=0,s=0;s<e.length;++s){if(null!=o){if(o[i]===s&&1!==e[s])throw Error("Can't squeeze axis ".concat(s," since its dim '").concat(e[s],"' is not 1"));(null==o[i]||o[i]>s)&&1===e[s]&&(r.push(e[s]),n.push(s)),o[i]<=s&&i++}1!==e[s]&&(r.push(e[s]),n.push(s))}return{newShape:r,keptDims:n}}function getArrayFromDType(e,t){var r=null;if(null==e||"float32"===e)r=new Float32Array(t);else if("int32"===e)r=new Int32Array(t);else if("bool"===e)r=new Uint8Array(t);else if("string"===e)r=Array(t);else throw Error("Unknown data type ".concat(e));return r}function checkConversionForErrors(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type ".concat(t," being uploaded contains ").concat(n,"."))}}function isValidDtype(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function bytesPerElement(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error("Unknown dtype ".concat(e))}function bytesFromStringArray(e){if(null==e)return 0;var t=0;return e.forEach(function(e){return t+=e.length}),t}function isString(e){return"string"==typeof e||e instanceof String}function isBoolean(e){return"boolean"==typeof e}function isNumber(e){return"number"==typeof e}function inferDtype(e){if(Array.isArray(e))return inferDtype(e[0]);if(e instanceof Float32Array);else if(e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray)return"int32";else if(isNumber(e));else if(isString(e))return"string";else if(isBoolean(e))return"bool";return"float32"}function isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nearestDivisor(e,t){for(var r=t;r<e;++r)if(e%r==0)return r;return e}function computeStrides(e){var t=e.length;if(t<2)return[];var r=Array(t-1);r[t-2]=e[t-1];for(var n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}function toNestedArray(e,t,r){if(void 0===r&&(r=!1),0===e.length)return t[0];var n=e.reduce(function(e,t){return e*t})*(r?2:1);if(0===n)return[];if(n!==t.length)throw Error("[".concat(e,"] does not match the input size ").concat(t.length).concat(r?" for a complex tensor":"","."));return function createNestedArray(e,t,r,n){void 0===n&&(n=!1);var a=[];if(1===t.length)for(var o=t[0]*(n?2:1),i=0;i<o;i++)a[i]=r[e+i];else for(var o=t[0],s=t.slice(1),u=s.reduce(function(e,t){return e*t})*(n?2:1),i=0;i<o;i++)a[i]=createNestedArray(e+i*u,s,r,n);return a}(0,e,t,r)}function makeOnesTypedArray(e,t){for(var r=makeZerosTypedArray(e,t),n=0;n<r.length;n++)r[n]=1;return r}function makeZerosTypedArray(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error("Unknown data type ".concat(t))}function assertNonNegativeIntegerDimensions(e){e.forEach(function(t){assert(Number.isInteger(t)&&t>=0,function(){return"Tensor must have a shape comprised of positive integers but got "+"shape [".concat(e,"].")})})}function isPromise(e){return e&&e.then&&"function"==typeof e.then}var h="tfjsflags",m=function(){function Environment(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=getQueryParams,this.populateURLFlags()}return Environment.prototype.setPlatform=function(e,t){null==this.platform||env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Platform ".concat(this.platformName," has already been set. ")+"Overwriting the platform with ".concat(e,".")),this.platformName=e,this.platform=t},Environment.prototype.registerFlag=function(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},null!=this.urlFlags[e]){var n=this.urlFlags[e];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn("Setting feature override from URL ".concat(e,": ").concat(n,".")),this.set(e,n)}},Environment.prototype.getAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:if(e in this.flags)return[2,this.flags[e]];return t=this.flags,r=e,[4,this.evaluateFlag(e)];case 1:return t[r]=n.sent(),[2,this.flags[e]]}})})},Environment.prototype.get=function(e){if(e in this.flags)return this.flags[e];var t=this.evaluateFlag(e);if(isPromise(t))throw Error("Flag ".concat(e," cannot be synchronously evaluated. ")+"Please use getAsync() instead.");return this.flags[e]=t,this.flags[e]},Environment.prototype.getNumber=function(e){return this.get(e)},Environment.prototype.getBool=function(e){return this.get(e)},Environment.prototype.getString=function(e){return this.get(e)},Environment.prototype.getFlags=function(){return this.flags},Object.defineProperty(Environment.prototype,"features",{get:function(){return this.flags},enumerable:!1,configurable:!0}),Environment.prototype.set=function(e,t){if(null==this.flagRegistry[e])throw Error("Cannot set flag ".concat(e," as it has not been registered."));this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)},Environment.prototype.evaluateFlag=function(e){if(null==this.flagRegistry[e])throw Error("Cannot evaluate flag '".concat(e,"': no evaluation function found."));return this.flagRegistry[e].evaluationFn()},Environment.prototype.setFlags=function(e){this.flags=Object.assign({},e)},Environment.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},Environment.prototype.populateURLFlags=function(){var e=this;if(void 0!==this.global&&void 0!==this.global.location&&void 0!==this.global.location.search){var t=this.getQueryParams(this.global.location.search);h in t&&t[h].split(",").forEach(function(t){var r,n=__read(t.split(":"),2),a=n[0],o=n[1];e.urlFlags[a]="true"===(r=o.toLowerCase())||"false"===r?"true"===r:"".concat(+r)===r?+r:o})}},Environment}();function getQueryParams(e){var t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(e){for(var r,n,a=[],o=1;o<arguments.length;o++)a[o-1]=arguments[o];return r=a[0],n=a[1],t[decodeURIComponent(r)]=decodeURIComponent(n||""),a.join("=")}),t}function env(){return t.ENV}function getGlobalNamespace(){if(null==n){var e=void 0;if("undefined"!=typeof window)e=window;else if("undefined"!=typeof global)e=global;else if("undefined"!=typeof process)e=process;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");n=e}return n}function getGlobal(e,t){var r,n=(null==(r=getGlobalNamespace())._tfGlobals&&(r._tfGlobals=new Map),r._tfGlobals);if(n.has(e))return n.get(e);var a=t();return n.set(e,a),n.get(e)}t.ENV=null;var g="Acos",v="Acosh",b="AddN",y="ArgMax",S="ArgMin",P="Asin",T="Asinh",x="Atan",_="Atanh",A="Atan2",O="AvgPool",w="AvgPool3D",E="BatchMatMul",k="BatchToSpaceND",D="Bincount",M="BitwiseAnd",C="BroadcastArgs",j="Cast",R="Ceil",I="ClipByValue",N="Complex",L="ComplexAbs",B="Concat",F="Conv2D",z="Conv2DBackpropFilter",Z="Conv2DBackpropInput",H="Conv3D",V="Conv3DBackpropInputV2",U="Cosh",G="Cumprod",W="Cumsum",K="CropAndResize",q="DenseBincount",X="DepthToSpace",$="DepthwiseConv2dNative",Y="DepthwiseConv2dNativeBackpropFilter",J="DepthwiseConv2dNativeBackpropInput",Q="Diag",ee="Dilation2D",et="Draw",er="RealDiv",en="Einsum",ea="Equal",eo="ExpandDims",ei="Expm1",es="Fill",eu="FlipLeftRight",ec="Floor",el="FloorDiv",ed="FusedBatchNorm",ef="GatherV2",ep="GatherNd",eh="Greater",em="GreaterEqual",eg="Identity",ev="IFFT",eb="Imag",ey="IsFinite",eS="IsInf",eP="IsNan",eT="LeakyRelu",ex="Less",e_="LessEqual",eA="LinSpace",eO="Log1p",ew="LogicalAnd",eE="LogicalNot",ek="LogicalOr",eD="Maximum",eM="MaxPool",eC="MaxPool3D",ej="MaxPoolWithArgmax",eR="Mean",eI="Minimum",eN="MirrorPad",eL="Multinomial",eB="Multiply",eF="NotEqual",ez="NonMaxSuppressionV3",eZ="NonMaxSuppressionV4",eH="NonMaxSuppressionV5",eV="OnesLike",eU="OneHot",eG="Pack",eW="PadV2",eK="Prelu",eq="Prod",eX="RaggedGather",e$="RaggedRange",eY="RaggedTensorToTensor",eJ="Range",eQ="Real",e0="Reciprocal",e1="Relu",e2="Reshape",e3="ResizeNearestNeighbor",e4="ResizeBilinear",e6="Relu6",e5="Reverse",e7="Round",e8="Rsqrt",e9="ScatterNd",te="TensorScatterUpdate",tt="SearchSorted",tr="Select",tn="Selu",ta="Slice",to="Sinh",ti="Sign",ts="Sigmoid",tu="Softplus",tc="Sqrt",tl="SpaceToBatchND",td="SplitV",tf="Softmax",tp="SparseFillEmptyRows",th="SparseReshape",tm="SparseSegmentMean",tg="SparseSegmentSum",tv="SparseToDense",tb="SquaredDifference",ty="StaticRegexReplace",tS="StridedSlice",tP="StringNGrams",tT="StringSplit",tx="StringToHashBucketFast",t_="Tanh",tA="Tile",tO="TopK",tw="Transform",tE="Transpose",tk="Unique",tD="Unpack",tM="UnsortedSegmentSum",tC="ZerosLike",tj="Step",tR="FromPixels",tI="RotateWithOffset",tN="_FusedMatMul",tL="FusedConv2D",tB="FusedDepthwiseConv2D";function warn(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];env().getBool("IS_TEST")||env().getBool("PROD")||console.warn.apply(console,__spreadArray([],__read(e),!1))}var tF=getGlobal("kernelRegistry",function(){return new Map}),tz=getGlobal("gradRegistry",function(){return new Map});function getKernel(e,t){var r=makeKey(e,t);return tF.get(r)}function getGradient(e){return tz.get(e)}function getKernelsForBackend(e){for(var t=tF.entries(),r=[];;){var n=t.next(),a=n.done,o=n.value;if(a)break;var i=__read(o,2),s=i[0],u=i[1];__read(s.split("_"),1)[0]===e&&r.push(u)}return r}function registerKernel(e){var t=e.kernelName,r=e.backendName,n=makeKey(t,r);tF.has(n)&&warn("The kernel '".concat(t,"' for backend ")+"'".concat(r,"' is already registered")),tF.set(n,e)}function makeKey(e,t){return"".concat(t,"_").concat(e)}/**
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
 */function isTypedArrayBrowser(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var tZ="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},tH=null;try{tH=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function Long$1(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function isLong(e){return!0===(e&&e.__isLong__)}Long$1.prototype.__isLong__,Object.defineProperty(Long$1.prototype,"__isLong__",{value:!0}),Long$1.isLong=isLong;var tV={},tU={};function fromInt(e,t){var r,n,a;return t?(e>>>=0,(a=0<=e&&e<256)&&(n=tU[e]))?n:(r=fromBits(e,(0|e)<0?-1:0,!0),a&&(tU[e]=r),r):(e|=0,(a=-128<=e&&e<128)&&(n=tV[e]))?n:(r=fromBits(e,e<0?-1:0,!1),a&&(tV[e]=r),r)}function fromNumber(e,t){if(isNaN(e))return t?tY:t$;if(t){if(e<0)return tY;if(e>=tK)return t2}else{if(e<=-tq)return t3;if(e+1>=tq)return t1}return e<0?fromNumber(-e,t).neg():fromBits(e%tW|0,e/tW|0,t)}function fromBits(e,t,r){return new Long$1(e,t,r)}Long$1.fromInt=fromInt,Long$1.fromNumber=fromNumber,Long$1.fromBits=fromBits;var tG=Math.pow;function fromString(e,t,r){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t$;if("number"==typeof t?(r=t,t=!1):t=!!t,(r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return fromString(e.substring(1),t,r).neg();for(var n,a=fromNumber(tG(r,8)),o=t$,i=0;i<e.length;i+=8){var s=Math.min(8,e.length-i),u=parseInt(e.substring(i,i+s),r);if(s<8){var c=fromNumber(tG(r,s));o=o.mul(c).add(fromNumber(u))}else o=(o=o.mul(a)).add(fromNumber(u))}return o.unsigned=t,o}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}Long$1.fromString=fromString,Long$1.fromValue=fromValue;var tW=4294967296,tK=18446744073709552e3,tq=0x7fffffffffffffff,tX=fromInt(16777216),t$=fromInt(0);Long$1.ZERO=t$;var tY=fromInt(0,!0);Long$1.UZERO=tY;var tJ=fromInt(1);Long$1.ONE=tJ;var tQ=fromInt(1,!0);Long$1.UONE=tQ;var t0=fromInt(-1);Long$1.NEG_ONE=t0;var t1=fromBits(-1,2147483647,!1);Long$1.MAX_VALUE=t1;var t2=fromBits(-1,-1,!0);Long$1.MAX_UNSIGNED_VALUE=t2;var t3=fromBits(0,-2147483648,!1);Long$1.MIN_VALUE=t3;var t4=Long$1.prototype;t4.toInt=function(){return this.unsigned?this.low>>>0:this.low},t4.toNumber=function(){return this.unsigned?(this.high>>>0)*tW+(this.low>>>0):this.high*tW+(this.low>>>0)},t4.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(!this.eq(t3))return"-"+this.neg().toString(e);var t=fromNumber(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var a=fromNumber(tG(e,6),this.unsigned),o=this,i="";;){var s=o.div(a),u=(o.sub(s.mul(a)).toInt()>>>0).toString(e);if((o=s).isZero())return u+i;for(;u.length<6;)u="0"+u;i=""+u+i}},t4.getHighBits=function(){return this.high},t4.getHighBitsUnsigned=function(){return this.high>>>0},t4.getLowBits=function(){return this.low},t4.getLowBitsUnsigned=function(){return this.low>>>0},t4.getNumBitsAbs=function(){if(this.isNegative())return this.eq(t3)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},t4.isZero=function(){return 0===this.high&&0===this.low},t4.eqz=t4.isZero,t4.isNegative=function(){return!this.unsigned&&this.high<0},t4.isPositive=function(){return this.unsigned||this.high>=0},t4.isOdd=function(){return(1&this.low)==1},t4.isEven=function(){return(1&this.low)==0},t4.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},t4.eq=t4.equals,t4.notEquals=function(e){return!this.eq(e)},t4.neq=t4.notEquals,t4.ne=t4.notEquals,t4.lessThan=function(e){return 0>this.comp(e)},t4.lt=t4.lessThan,t4.lessThanOrEqual=function(e){return 0>=this.comp(e)},t4.lte=t4.lessThanOrEqual,t4.le=t4.lessThanOrEqual,t4.greaterThan=function(e){return this.comp(e)>0},t4.gt=t4.greaterThan,t4.greaterThanOrEqual=function(e){return this.comp(e)>=0},t4.gte=t4.greaterThanOrEqual,t4.ge=t4.greaterThanOrEqual,t4.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},t4.comp=t4.compare,t4.negate=function(){return!this.unsigned&&this.eq(t3)?t3:this.not().add(tJ)},t4.neg=t4.negate,t4.add=function(e){isLong(e)||(e=fromValue(e));var t,r,n=this.high>>>16,a=65535&this.high,o=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,f=0;return t=0+((r=0+(i+l))>>>16),r&=65535,t+=o+c,f+=t>>>16,t&=65535,f+=a+u,d+=f>>>16,f&=65535,d+=n+s,fromBits(t<<16|r,(d&=65535)<<16|f,this.unsigned)},t4.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},t4.sub=t4.subtract,t4.multiply=function(e){if(this.isZero())return t$;if(isLong(e)||(e=fromValue(e)),tH)return fromBits(tH.mul(this.low,this.high,e.low,e.high),tH.get_high(),this.unsigned);if(e.isZero())return t$;if(this.eq(t3))return e.isOdd()?t3:t$;if(e.eq(t3))return this.isOdd()?t3:t$;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(tX)&&e.lt(tX))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,a=65535&this.high,o=this.low>>>16,i=65535&this.low,s=e.high>>>16,u=65535&e.high,c=e.low>>>16,l=65535&e.low,d=0,f=0;return t=0+((r=0+i*l)>>>16),r&=65535,t+=o*l,f+=t>>>16,t&=65535,t+=i*c,f+=t>>>16,t&=65535,f+=a*l,d+=f>>>16,f&=65535,f+=o*c,d+=f>>>16,f&=65535,f+=i*u,d+=f>>>16,f&=65535,d+=n*l+a*c+o*u+i*s,fromBits(t<<16|r,(d&=65535)<<16|f,this.unsigned)},t4.mul=t4.multiply,t4.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(tH){var t,r,n;return this.unsigned||-2147483648!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?tH.div_u:tH.div_s)(this.low,this.high,e.low,e.high),tH.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?tY:t$;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return tY;if(e.gt(this.shru(1)))return tQ;n=tY}else{if(this.eq(t3))return e.eq(tJ)||e.eq(t0)?t3:e.eq(t3)?tJ:(t=this.shr(1).div(e).shl(1)).eq(t$)?e.isNegative()?tJ:t0:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(t3))return this.unsigned?tY:t$;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=t$}for(r=this;r.gte(e);){for(var a=Math.ceil(Math.log(t=Math.max(1,Math.floor(r.toNumber()/e.toNumber())))/Math.LN2),o=a<=48?1:tG(2,a-48),i=fromNumber(t),s=i.mul(e);s.isNegative()||s.gt(r);)t-=o,s=(i=fromNumber(t,this.unsigned)).mul(e);i.isZero()&&(i=tJ),n=n.add(i),r=r.sub(s)}return n},t4.div=t4.divide,t4.modulo=function(e){return(isLong(e)||(e=fromValue(e)),tH)?fromBits((this.unsigned?tH.rem_u:tH.rem_s)(this.low,this.high,e.low,e.high),tH.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},t4.mod=t4.modulo,t4.rem=t4.modulo,t4.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},t4.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},t4.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},t4.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},t4.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},t4.shl=t4.shiftLeft,t4.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},t4.shr=t4.shiftRight,t4.shiftRightUnsigned=function(e){if(isLong(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?fromBits(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?fromBits(t,0,this.unsigned):fromBits(t>>>e-32,0,this.unsigned)},t4.shru=t4.shiftRightUnsigned,t4.shr_u=t4.shiftRightUnsigned,t4.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},t4.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},t4.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},t4.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},t4.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long$1.fromBytes=function(e,t,r){return r?Long$1.fromBytesLE(e,t):Long$1.fromBytesBE(e,t)},Long$1.fromBytesLE=function(e,t){return new Long$1(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long$1.fromBytesBE=function(e,t){return new Long$1(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)};var t6=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(Long$1),t5=/**
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
 */function(e,t){return t.forEach(function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach(function(r){if("default"!==r&&!(r in e)){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})}),e}({__proto__:null,default:t6},[Long$1]),t7=t6||t5;function hexToLong(e){return t7.fromString(e,!0,16)}var t8=hexToLong("c3a5c85c97cb3127"),t9=hexToLong("b492b66fbe98f273"),re=hexToLong("9ae16a3b2f90404f");function shiftMix(e){return e.xor(e.shru(47))}function fetch$2(e,t,r){var n=e.slice(t,t+r);return t7.fromBytes(Array.from(n),!0,!0)}function fetch64(e,t){return fetch$2(e,t,8)}function rotate64(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function hashLen16(e,t,r){void 0===r&&(r=hexToLong("9ddfea08eb382d69"));var n=e.xor(t).mul(r);n=n.xor(n.shru(47));var a=t.xor(n).mul(r);return(a=a.xor(a.shru(47))).mul(r)}function weakHashLen32WithSeedsStr(e,t,r,n){var a,o,i,s,u,c,l;return a=fetch64(e,t),o=fetch64(e,t+8),i=fetch64(e,t+16),s=fetch64(e,t+24),u=r,c=n,u=u.add(a),c=rotate64(c.add(u).add(s),21),l=u,u=(u=u.add(o)).add(i),c=c.add(rotate64(u,44)),[u.add(s),c.add(l)]}function toTypedArray(e,t){if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=flatten(e)),env().getBool("DEBUG")&&checkConversionForErrors(e,t),(r=e)instanceof Float32Array&&"float32"===t||r instanceof Int32Array&&"int32"===t||r instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){for(var r,n=new Uint8Array(e.length),a=0;a<n.length;++a)0!==Math.round(e[a])&&(n[a]=1);return n}throw Error("Unknown data type ".concat(t))}function now(){return env().platform.now()}function encodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.encode(e,t)}function decodeString(e,t){return void 0===t&&(t="utf-8"),t=t||"utf-8",env().platform.decode(e,t)}function isTypedArray(e){return null!=env().platform.isTypedArray?env().platform.isTypedArray(e):isTypedArrayBrowser(e)}function flatten(e,t,r){var n,a;if(void 0===t&&(t=[]),void 0===r&&(r=!1),null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||isPromise(e)||null==e||isTypedArray(e)&&r)t.push(e);else if(Array.isArray(e)||isTypedArray(e))for(var o=0;o<e.length;++o)flatten(e[o],t,r);else{var i=-1;try{for(var s=__values(Object.keys(e)),u=s.next();!u.done;u=s.next()){var c=u.value;/^([1-9]+[0-9]*|0)$/.test(c)&&(i=Math.max(i,Number(c)))}}catch(e){n={error:e}}finally{try{u&&!u.done&&(a=s.return)&&a.call(s)}finally{if(n)throw n.error}}for(var o=0;o<=i;o++)flatten(e[o],t,r)}return t}var rt=function(){function Profiler(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new rr)}return Profiler.prototype.profileKernel=function(e,t,r){var n,a,o,i,holdResultWrapperFn=function(){o=r()},s=now();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(holdResultWrapperFn);else{holdResultWrapperFn();try{for(var u=__values(o),c=u.next();!c.done;c=u.next())c.value.dataSync()}catch(e){n={error:e}}finally{try{c&&!c.done&&(a=u.return)&&a.call(u)}finally{if(n)throw n.error}}i=Promise.resolve({kernelMs:now()-s})}if(env().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(var l=0;l<o.length;l++)!function(t){var r=o[t];r.data().then(function(t){(function(e,t,r){if("float32"===t)for(var n=0;n<e.length;n++){var a=e[n];if(isNaN(a)||!isFinite(a))return console.warn("Found ".concat(a," in the result of '").concat(r,"'")),!0}})(t,r.dtype,e)})}(l);return{kernelName:e,outputs:o,inputs:t,timeMs:i.then(function(e){return e.kernelMs}),extraInfo:i.then(function(e){return null!=e.getExtraProfileInfo?e.getExtraProfileInfo():""})}},Profiler.prototype.logKernelProfile=function(e){var t=this,r=e.kernelName,n=e.outputs,a=e.timeMs,o=e.inputs,i=e.extraInfo;n.forEach(function(e){Promise.all([e.data(),a,i]).then(function(n){t.logger.logKernelProfile(r,e,n[0],n[1],o,n[2])})})},Profiler}(),rr=function(){function Logger(){}return Logger.prototype.logKernelProfile=function(e,t,r,n,a,o){var i="number"==typeof n?rightPad("".concat(n,"ms"),9):n.error,s=rightPad(e,25),u=t.rank,c=t.size,l=rightPad(t.shape.toString(),14),d="";for(var f in a){var p=a[f];if(null!=p){var h=p.shape||t.shape,m=h.length;d+="".concat(f,": ").concat(m,"D ").concat(m>0?h:""," ")}}console.log("%c".concat(s,"	%c").concat(i,"	%c").concat(u,"D ").concat(l,"	%c").concat(c,"	%c").concat(d,"	%c").concat(o),"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},Logger}();function valToString(e,t,r){return rightPad(Array.isArray(e)?"".concat(parseFloat(e[0].toFixed(7))," + ")+"".concat(parseFloat(e[1].toFixed(7)),"j"):isString(e)?"'".concat(e,"'"):"bool"===r?boolNumToString(e):parseFloat(e.toFixed(7)).toString(),t)}function boolNumToString(e){return 0===e?"false":"true"}function createComplexTuples(e){for(var t=[],r=0;r<e.length;r+=2)t.push([e[r],e[r+1]]);return t}var rn=function(){function TensorBuffer(e,t,r){var n=this;if(this.dtype=t,this.shape=e.slice(),this.size=sizeFromShape(e),null!=r){var a=r.length;assert(a===this.size,function(){return"Length of values '".concat(a,"' does not match the size ")+"inferred by the shape '".concat(n.size,"'.")})}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||getArrayFromDType(t,this.size),this.strides=computeStrides(e)}return TensorBuffer.prototype.set=function(e){for(var t=this,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];0===r.length&&(r=[0]),assert(r.length===this.rank,function(){return"The number of provided coordinates (".concat(r.length,") must ")+"match the rank (".concat(t.rank,")")});var a=this.locToIndex(r);this.values[a]=e},TensorBuffer.prototype.get=function(){for(var e,t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];0===r.length&&(r=[0]);var a=0;try{for(var o=__values(r),i=o.next();!i.done;i=o.next()){var s=i.value;if(s<0||s>=this.shape[a]){var u="Requested out of range element at ".concat(r,". ")+"  Buffer shape=".concat(this.shape);throw Error(u)}a++}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}for(var c=r[r.length-1],l=0;l<r.length-1;++l)c+=this.strides[l]*r[l];return this.values[c]},TensorBuffer.prototype.locToIndex=function(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];for(var t=e[e.length-1],r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t},TensorBuffer.prototype.indexToLoc=function(e){if(0===this.rank)return[];if(1===this.rank)return[e];for(var t=Array(this.shape.length),r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t},Object.defineProperty(TensorBuffer.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),TensorBuffer.prototype.toTensor=function(){return ra().makeTensor(this.values,this.shape,this.dtype)},TensorBuffer}(),ra=null,ro=null,ri=function(){function Tensor(e,t,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=sizeFromShape(e),this.strides=computeStrides(e),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}return Object.defineProperty(Tensor.prototype,"rank",{get:function(){return this.shape.length},enumerable:!1,configurable:!0}),Tensor.prototype.buffer=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,ro.buffer(this.shape,this.dtype,e)]}})})},Tensor.prototype.bufferSync=function(){return ro.buffer(this.shape,this.dtype,this.dataSync())},Tensor.prototype.array=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,toNestedArray(this.shape,e,"complex64"===this.dtype)]}})})},Tensor.prototype.arraySync=function(){return toNestedArray(this.shape,this.dataSync(),"complex64"===this.dtype)},Tensor.prototype.data=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:if(this.throwIfDisposed(),e=ra().read(this.dataId),"string"!==this.dtype)return[3,2];return[4,e];case 1:t=r.sent();try{return[2,t.map(function(e){return decodeString(e)})]}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}r.label=2;case 2:return[2,e]}})})},Tensor.prototype.dataToGPU=function(e){return this.throwIfDisposed(),ra().readToGPU(this.dataId,e)},Tensor.prototype.dataSync=function(){this.throwIfDisposed();var e=ra().readSync(this.dataId);if("string"===this.dtype)try{return e.map(function(e){return decodeString(e)})}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e},Tensor.prototype.bytes=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return this.throwIfDisposed(),[4,ra().read(this.dataId)];case 1:if(e=t.sent(),"string"===this.dtype)return[2,e];return[2,new Uint8Array(e.buffer)]}})})},Tensor.prototype.dispose=function(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),ra().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(Tensor.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!1,configurable:!0}),Tensor.prototype.throwIfDisposed=function(){if(this.isDisposed)throw Error("Tensor is disposed.")},Tensor.prototype.print=function(e){return void 0===e&&(e=!1),ro.print(this,e)},Tensor.prototype.clone=function(){return this.throwIfDisposed(),ro.clone(this)},Tensor.prototype.toString=function(e){var t,r,n,a,o,i,s,u,c;return void 0===e&&(e=!1),t=this.dataSync(),r=this.shape,n=this.dtype,a=e,o=computeStrides(r),i=function(e,t,r,n){var a=sizeFromShape(t),o=n[n.length-1],i=Array(o).fill(0),s=t.length,u="complex64"===r?createComplexTuples(e):e;if(s>1)for(var c=0;c<a/o;c++)for(var l=c*o,d=0;d<o;d++)i[d]=Math.max(i[d],valToString(u[l+d],0,r).length);return i}(t,r,n,o),s=r.length,u=function subTensorToString(e,t,r,n,a,o){void 0===o&&(o=!0);var i="complex64"===r?2:1,s=t[0],u=t.length;if(0===u)return"complex64"===r?[valToString(createComplexTuples(e)[0],0,r)]:"bool"===r?[boolNumToString(e[0])]:[e[0].toString()];if(1===u){if(s>20){var c=3*i,l=Array.from(e.slice(0,c)),d=Array.from(e.slice((s-3)*i,s*i));return"complex64"===r&&(l=createComplexTuples(l),d=createComplexTuples(d)),["["+l.map(function(e,t){return valToString(e,a[t],r)}).join(", ")+", ..., "+d.map(function(e,t){return valToString(e,a[s-3+t],r)}).join(", ")+"]"]}return["["+("complex64"===r?createComplexTuples(e):Array.from(e)).map(function(e,t){return valToString(e,a[t],r)}).join(", ")+"]"]}var f=t.slice(1),p=n.slice(1),h=n[0]*i,m=[];if(s>20){for(var g=0;g<3;g++){var v=g*h,b=v+h;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,b),f,r,p,a,!1)),!1))}m.push("...");for(var g=s-3;g<s;g++){var v=g*h,b=v+h;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,b),f,r,p,a,g===s-1)),!1))}}else for(var g=0;g<s;g++){var v=g*h,b=v+h;m.push.apply(m,__spreadArray([],__read(subTensorToString(e.slice(v,b),f,r,p,a,g===s-1)),!1))}var y=2===u?",":"";m[0]="["+(s>0?m[0]+y:"");for(var g=1;g<m.length-1;g++)m[g]=" "+m[g]+y;for(var S=",\n",g=2;g<u;g++)S+="\n";return m[m.length-1]=" "+m[m.length-1]+"]"+(o?"":S),m}(t,r,n,o,i),c=["Tensor"],a&&(c.push("  dtype: ".concat(n)),c.push("  rank: ".concat(s)),c.push("  shape: [".concat(r,"]")),c.push("  values:")),c.push(u.map(function(e){return"    "+e}).join("\n")),c.join("\n")},Tensor.prototype.cast=function(e){return this.throwIfDisposed(),ro.cast(this,e)},Tensor.prototype.variable=function(e,t,r){return void 0===e&&(e=!0),this.throwIfDisposed(),ra().makeVariable(this,e,t,r)},Tensor}();function getGlobalTensorClass(){return getGlobal("Tensor",function(){return ri})}Object.defineProperty(ri,Symbol.hasInstance,{value:function(e){return!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}}),getGlobalTensorClass();var rs=function(e){function Variable(t,r,n,a){var o=e.call(this,t.shape,t.dtype,t.dataId,a)||this;return o.trainable=r,o.name=n,o}return __extends(Variable,e),Variable.prototype.assign=function(e){if(e.dtype!==this.dtype)throw Error("dtype of the new value (".concat(e.dtype,") and ")+"previous value (".concat(this.dtype,") must match"));if(!arraysEqual(e.shape,this.shape))throw Error("shape of the new value (".concat(e.shape,") and ")+"previous value (".concat(this.shape,") must match"));ra().disposeTensor(this),this.dataId=e.dataId,ra().incRef(this,null)},Variable.prototype.dispose=function(){ra().disposeVariable(this),this.isDisposedInternal=!0},Variable}(ri);Object.defineProperty(rs,Symbol.hasInstance,{value:function(e){return e instanceof ri&&null!=e.assign&&e.assign instanceof Function}}),/**
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
 */function makeTypesMatch(e,t){if(e.dtype===t.dtype)return[e,t];var r=upcastType(e.dtype,t.dtype);return[e.cast(r),t.cast(r)]}function assertTypesMatch(e,t){assert(e.dtype===t.dtype,function(){return"The dtypes of the first(".concat(e.dtype,") and")+" second(".concat(t.dtype,") input must match")})}function getTensorsInContainer(e){var t=[];return function walkTensorContainer(e,t,r){if(null!=e){if(e instanceof ri){t.push(e);return}if(Array.isArray(e)||"object"==typeof e)for(var n in e){var a=e[n];r.has(a)||(r.add(a),walkTensorContainer(a,t,r))}}}(e,t,new Set),t}function isRegisteredKernelInvocation(e){return null!=e.kernelName}var rc=function(){function EngineState(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(function(e){return e.name})))}}}return EngineState.prototype.dispose=function(){for(var e in this.registeredVariables)this.registeredVariables[e].dispose()},EngineState}(),rl=function(){function Engine(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new rc}return Engine.prototype.ready=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r;return __generator(this,function(n){switch(n.label){case 0:if(null!=this.pendingBackendInit)return[2,this.pendingBackendInit.then(function(){})];if(null!=this.backendInstance)return[2];e=this.getSortedBackends(),t=0,n.label=1;case 1:if(!(t<e.length))return[3,5];return r=e[t],[4,this.initializeBackend(r).success];case 2:if(!n.sent())return[3,4];return[4,this.setBackend(r)];case 3:return n.sent(),[2];case 4:return t++,[3,1];case 5:throw Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(Engine.prototype,"backend",{get:function(){if(null!=this.pendingBackendInit)throw Error("Backend '".concat(this.backendName,"' has not yet been initialized. Make ")+"sure to await tf.ready() or await tf.setBackend() before calling other methods");if(null==this.backendInstance){var e=this.initializeBackendsAndReturnBest(),t=e.name;if(e.asyncInit)throw Error("The highest priority backend '".concat(t,"' has not yet been ")+"initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(t)}return this.backendInstance},enumerable:!1,configurable:!0}),Engine.prototype.backendNames=function(){return Object.keys(this.registryFactory)},Engine.prototype.findBackend=function(e){return e in this.registry||e in this.registryFactory&&!this.initializeBackend(e).asyncInit?this.registry[e]:null},Engine.prototype.findBackendFactory=function(e){return e in this.registryFactory?this.registryFactory[e].factory:null},Engine.prototype.registerBackend=function(e,t,r){return(void 0===r&&(r=1),e in this.registryFactory)?(warn("".concat(e," backend was already registered. ")+"Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:r},!0)},Engine.prototype.setBackend=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:if(null==this.registryFactory[e])throw Error("Backend name '".concat(e,"' not found in registry"));if(this.backendName=e,null!=this.registry[e])return[3,4];if(this.backendInstance=null,r=(t=this.initializeBackend(e)).success,!t.asyncInit)return[3,2];return[4,r];case 1:return n=a.sent(),[3,3];case 2:n=r,a.label=3;case 3:if(!n)return[2,!1];a.label=4;case 4:return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new rt(this.backendInstance),[2,!0]}})})},Engine.prototype.setupRegisteredKernels=function(){var e=this;getKernelsForBackend(this.backendName).forEach(function(t){null!=t.setupFunc&&t.setupFunc(e.backendInstance)})},Engine.prototype.disposeRegisteredKernels=function(e){var t=this;getKernelsForBackend(e).forEach(function(r){null!=r.disposeFunc&&r.disposeFunc(t.registry[e])})},Engine.prototype.initializeBackend=function(e){var t=this,r=this.registryFactory[e];if(null==r)throw Error("Cannot initialize backend ".concat(e,", no registration found."));try{var n=r.factory();if(!n||n instanceof p||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};var a=++this.pendingBackendInitId,o=n.then(function(r){return!(a<t.pendingBackendInitId)&&(t.registry[e]=r,t.pendingBackendInit=null,!0)}).catch(function(r){return!(a<t.pendingBackendInitId)&&(t.pendingBackendInit=null,warn("Initialization of backend ".concat(e," failed")),warn(r.stack||r.message),!1)});return this.pendingBackendInit=o,{success:o,asyncInit:!0}}catch(t){return warn("Initialization of backend ".concat(e," failed")),warn(t.stack||t.message),{success:!1,asyncInit:!1}}},Engine.prototype.removeBackend=function(e){if(!(e in this.registryFactory))throw Error("".concat(e," backend not found in registry"));this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},Engine.prototype.getSortedBackends=function(){var e=this;if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(t,r){return e.registryFactory[r].priority-e.registryFactory[t].priority})},Engine.prototype.initializeBackendsAndReturnBest=function(){for(var e=this.getSortedBackends(),t=0;t<e.length;t++){var r=e[t],n=this.initializeBackend(r),a=n.success,o=n.asyncInit;if(o||a)return{name:r,asyncInit:o}}throw Error("Could not initialize any backends, all backend initializations failed.")},Engine.prototype.moveData=function(e,t){var r=this.state.tensorInfo.get(t),n=r.backend,a=this.readSync(t),o=n.refCount(t);n.disposeData(t,!0),r.backend=e,e.move(t,a,r.shape,r.dtype,o),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},Engine.prototype.tidy=function(e,t){var r,n=this,a=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a=e}return this.scopedRun(function(){return n.startScope(a)},function(){return n.endScope(r)},function(){return(r=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r})},Engine.prototype.scopedRun=function(e,t,r){e();try{var n=r();return t(),n}catch(e){throw t(),e}},Engine.prototype.nextTensorId=function(){return Engine.nextTensorId++},Engine.prototype.nextVariableId=function(){return Engine.nextVariableId++},Engine.prototype.clone=function(e){var t=rd.runKernel(eg,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],function(e){return{x:function(){return rd.runKernel(j,{x:e},{dtype:"float32"})}}},[],{}),t},Engine.prototype.runKernel=function(e,t,r){if(null==this.backendName&&this.backend,!(null!=getKernel(e,this.backendName)))throw Error("Kernel '".concat(e,"' not registered for backend '").concat(this.backendName,"'"));return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})},Engine.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},Engine.prototype.checkKernelForMemLeak=function(e,t,r){var n=this.backend.numDataIds(),a=0;r.forEach(function(e){a+="complex64"===e.dtype?3:1});var o=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-t-a-o;if(i>0)throw Error("Backend '".concat(this.backendName,"' has an internal memory leak ")+"(".concat(i," data ids) after running '").concat(e,"'"))},Engine.prototype.runKernelFunc=function(e){var t,r,n,a,o=this,i=[],s=this.isTapeOn(),u=this.state.numBytes,c=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;var l=isRegisteredKernelInvocation(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(isRegisteredKernelInvocation(e)){var d=e.kernelName,f=e.inputs,p=e.attrs;null==this.backendName&&this.backend;var h=getKernel(d,this.backendName);assert(null!=h,function(){return"Cannot find registered kernel '".concat(d,"' for backend '").concat(o.backendName,"'")}),r=function(){var e=o.backend.numDataIds(),t=Array.isArray(n=h.kernelFunc({inputs:f,attrs:p,backend:o.backend}))?n:[n];o.shouldCheckForMemLeaks()&&o.checkKernelForMemLeak(d,e,t);var r=t.map(function(e){return null!=e.rank?e:o.makeTensorFromTensorInfo(e)});if(s){var a=o.getTensorsForGradient(d,f,r);i=o.saveTensorsForBackwardMode(a)}return r}}else{var m=e.forwardFunc,saveFunc_1=function(e){s&&(i=e.map(function(e){return o.keep(o.clone(e))}))};r=function(){var e=o.backend.numDataIds(),t=Array.isArray(n=o.tidy(function(){return m(o.backend,saveFunc_1)}))?n:[n];return o.shouldCheckForMemLeaks()&&o.checkKernelForMemLeak(l,e,t),t}}var g=e.inputs,v=e.attrs,b=isRegisteredKernelInvocation(e)?null:e.backwardsFunc;return this.scopedRun(function(){return o.state.kernelDepth++},function(){return o.state.kernelDepth--},function(){o.ENV.getBool("DEBUG")||o.state.profiling?(a=o.profiler.profileKernel(l,g,function(){return r()}),o.ENV.getBool("DEBUG")&&o.profiler.logKernelProfile(a),t=a.outputs):t=r()}),s&&this.addTapeNode(l,g,t,b,i,v),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-u,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-c,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(g).map(function(e){return null!=g[e]?g[e].shape:null}),outputShapes:t.map(function(e){return e.shape}),kernelTimeMs:a.timeMs,extraInfo:a.extraInfo}),Array.isArray(n)?t:t[0]},Engine.prototype.saveTensorsForBackwardMode=function(e){var t=this;return e.map(function(e){return t.keep(t.clone(e))})},Engine.prototype.getTensorsForGradient=function(e,t,r){var n=getGradient(e);if(null!=n){var a=n.inputsToSave||[],o=n.outputsToSave||[],i=void 0;n.saveAllInputs?(assert(Array.isArray(t),function(){return"saveAllInputs is true, expected inputs to be an array."}),i=Object.keys(t).map(function(e){return t[e]})):i=a.map(function(e){return t[e]});var s=r.filter(function(e,t){return o[t]});return i.concat(s)}return[]},Engine.prototype.makeTensor=function(e,t,r,n){if(null==e)throw Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;var a=e;"string"===r&&isString(e[0])&&(a=e.map(function(e){return encodeString(e)}));var o=n.write(a,t,r),i=new ri(t,r,o,this.nextTensorId());if(this.trackTensor(i,n),"string"===r){var s=this.state.tensorInfo.get(o),u=bytesFromStringArray(a);this.state.numBytes+=u-s.bytes,s.bytes=u}return i},Engine.prototype.makeTensorFromDataId=function(e,t,r,n){var a={dataId:e,shape:t,dtype:r=r||"float32"};return this.makeTensorFromTensorInfo(a,n)},Engine.prototype.makeTensorFromTensorInfo=function(e,t){var r=e.dataId,n=e.shape,a=e.dtype,o=new ri(n,a,r,this.nextTensorId());return this.trackTensor(o,t),o},Engine.prototype.makeVariable=function(e,t,r,n){void 0===t&&(t=!0),r=r||this.nextVariableId().toString(),null!=n&&n!==e.dtype&&(e=e.cast(n));var a=new rs(e,t,r,this.nextTensorId());if(null!=this.state.registeredVariables[a.name])throw Error("Variable with name ".concat(a.name," was already registered"));return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a},Engine.prototype.trackTensor=function(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;var r=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(r=e.size*bytesPerElement(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof rs||this.track(e)},Engine.prototype.incRef=function(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)},Engine.prototype.removeDataId=function(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)},Engine.prototype.disposeTensor=function(e){if(this.state.tensorInfo.has(e.dataId)){var t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){var r=e.size*bytesPerElement(e.dtype);this.state.numBytes-=r}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}},Engine.prototype.disposeVariables=function(){for(var e in this.state.registeredVariables){var t=this.state.registeredVariables[e];this.disposeVariable(t)}},Engine.prototype.disposeVariable=function(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]},Engine.prototype.memory=function(){var e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e},Engine.prototype.profile=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:return this.state.profiling=!0,t=this.state.numBytes,r=this.state.numTensors,this.state.activeProfile.kernels=[],n=this.state.activeProfile,[4,e()];case 1:n.result=d.sent(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,__spreadArray([],__read(this.state.activeProfile.kernels.map(function(e){return e.totalBytesSnapshot})),!1)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r,d.label=2;case 2:d.trys.push([2,8,9,10]),o=(a=__values(this.state.activeProfile.kernels)).next(),d.label=3;case 3:if(o.done)return[3,7];return s=i=o.value,[4,i.kernelTimeMs];case 4:return s.kernelTimeMs=d.sent(),u=i,[4,i.extraInfo];case 5:u.extraInfo=d.sent(),d.label=6;case 6:return o=a.next(),[3,3];case 7:return[3,10];case 8:return c={error:d.sent()},[3,10];case 9:try{o&&!o.done&&(l=a.return)&&l.call(a)}finally{if(c)throw c.error}return[7];case 10:return[2,this.state.activeProfile]}})})},Engine.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&0===this.state.kernelDepth},Engine.prototype.addTapeNode=function(e,t,r,n,a,o){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:a},u=getGradient(e);null!=u&&(n=u.gradFunc),null!=n&&(s.gradient=function(e){return n((e=e.map(function(e,t){if(null==e){var n=r[t],a=makeZerosTypedArray(n.size,n.dtype);return i.makeTensor(a,n.shape,n.dtype)}return e})).length>1?e:e[0],a,o)}),this.state.activeTape.push(s)},Engine.prototype.keep=function(e){return e.kept=!0,e},Engine.prototype.startTape=function(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++},Engine.prototype.endTape=function(){this.state.gradientDepth--},Engine.prototype.startScope=function(e){var t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t},Engine.prototype.endScope=function(e){for(var t=this,r=getTensorsInContainer(e),n=new Set(r.map(function(e){return e.id})),a=0;a<this.state.activeScope.track.length;a++){var o=this.state.activeScope.track[a];o.kept||n.has(o.id)||o.dispose()}var i=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],r.forEach(function(e){e.kept||e.scopeId!==i.id||t.track(e)})},Engine.prototype.gradients=function(e,t,r,n){var a=this;if(void 0===n&&(n=!1),assert(t.length>0,function(){return"gradients() received an empty list of xs."}),null!=r&&"float32"!==r.dtype)throw Error("dy must have 'float32' dtype, but has '".concat(r.dtype,"'"));var o=this.scopedRun(function(){return a.startTape()},function(){return a.endTape()},function(){return a.tidy("forward",e)});assert(o instanceof ri,function(){return"The result y returned by f() must be a tensor."});var i=/**
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
 */function(e,t,r){for(var n={},a={},o=0;o<t.length;o++)n[t[o].id]=!0;for(var o=0;o<e.length;o++){var i=e[o],s=i.inputs;for(var u in s){for(var c=s[u],l=!1,d=0;d<t.length;d++)if(n[c.id]){i.outputs.forEach(function(e){return n[e.id]=!0}),l=!0,a[i.id]=!0;break}if(l)break}}var f={};f[r.id]=!0;for(var p={},o=e.length-1;o>=0;o--)for(var i=e[o],s=i.inputs,d=0;d<i.outputs.length;d++)if(f[i.outputs[d].id]){for(var u in s)f[s[u].id]=!0,p[i.id]=!0;break}for(var h=[],o=0;o<e.length;o++){var i=e[o];if(a[i.id]&&p[i.id]){var m={};for(var u in i.inputs){var g=i.inputs[u];n[g.id]&&(m[u]=g)}var v=Object.assign({},i);v.inputs=m,v.outputs=i.outputs,h.push(v)}}return h}(this.state.activeTape,t,o);if(!n&&0===i.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var e,n,s={};s[o.id]=null==r?(n=makeOnesTypedArray(sizeFromShape(e=o.shape),"float32"),rd.makeTensor(n,e,"float32")):r,function(e,t,r,n){for(var a=t.length-1;a>=0;a--)!function(a){var o=t[a],i=[];if(o.outputs.forEach(function(t){var r=e[t.id];null!=r?i.push(r):i.push(null)}),null==o.gradient)throw Error("Cannot compute gradient: gradient function not found "+"for ".concat(o.kernelName,"."));var s=o.gradient(i),_loop_2=function(t){if(!(t in s))throw Error("Cannot backprop through input ".concat(t,". ")+"Available gradients found: ".concat(Object.keys(s),"."));var a=r(function(){return s[t]()});if("float32"!==a.dtype)throw Error("Error in gradient for op ".concat(o.kernelName,". The gradient of input ")+"".concat(t," must have 'float32' dtype, but has '").concat(a.dtype,"'"));var i=o.inputs[t];if(!arraysEqual(a.shape,i.shape))throw Error("Error in gradient for op ".concat(o.kernelName,". The gradient of input ")+"'".concat(t,"' has shape '").concat(a.shape,"', which does not match ")+"the shape of the input '".concat(i.shape,"'"));if(null==e[i.id])e[i.id]=a;else{var u=e[i.id];e[i.id]=n(u,a),u.dispose()}};for(var u in o.inputs)_loop_2(u)}(a)}(s,i,function(e){return a.tidy(e)},add$1);var u=t.map(function(e){return s[e.id]});return 0===a.state.gradientDepth&&(a.state.activeTape.forEach(function(e){var t,r;try{for(var n=__values(e.saved),a=n.next();!a.done;a=n.next())a.value.dispose()}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}),a.state.activeTape=null),{value:o,grads:u}})},Engine.prototype.customGrad=function(e){var t=this;return assert(isFunction(e),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var r,n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];assert(n.every(function(e){return e instanceof ri}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var o={};return n.forEach(function(e,t){o[t]=e}),t.runKernelFunc({forwardFunc:function(t,a){return assert((r=e.apply(void 0,__spreadArray([],__read(__spreadArray(__spreadArray([],__read(n),!1),[a],!1)),!1))).value instanceof ri,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),assert(isFunction(r.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),r.value},backwardsFunc:function(e,t){var a=r.gradFunc(e,t),o=Array.isArray(a)?a:[a];assert(o.length===n.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),assert(o.every(function(e){return e instanceof ri}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var i={};return o.forEach(function(e,t){i[t]=function(){return e}}),i},inputs:o})}},Engine.prototype.readSync=function(e){return this.state.tensorInfo.get(e).backend.readSync(e)},Engine.prototype.read=function(e){return this.state.tensorInfo.get(e).backend.read(e)},Engine.prototype.readToGPU=function(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)},Engine.prototype.time=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){switch(n.label){case 0:return t=now(),[4,this.backend.time(e)];case 1:return(r=n.sent()).wallMs=now()-t,[2,r]}})})},Engine.prototype.track=function(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e},Object.defineProperty(Engine.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!1,configurable:!0}),Engine.prototype.reset=function(){for(var e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new rc,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},Engine}();function getOrMakeEngine(){var e,r=getGlobalNamespace();if(null==r._tfengine){var n=new m(r);r._tfengine=new rl(n)}return e=r._tfengine.ENV,t.ENV=e,ra=function(){return r._tfengine},r._tfengine}rl.nextTensorId=0,rl.nextVariableId=0;var rd=getOrMakeEngine();function add$1(e,t){return rd.runKernel("Add",{a:e,b:t})}function isBrowser(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}/**
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
 */var rf=env();/**
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
 */function inferShape(e,t){var r=e;if(isTypedArray(e))return"string"===t?[]:[e.length];if(isWebGLData(e)){var n=e.channels||"RGBA";return[e.height,e.width*n.length]}if(isWebGPUData(e))return[e.buffer.size/(null==t?4:bytesPerElement(t))];if(!Array.isArray(e))return[];for(var a=[];Array.isArray(r)||isTypedArray(r)&&"string"!==t;)a.push(r.length),r=r[0];return Array.isArray(e)&&env().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function deepAssertShapeConsistency(e,t,r){if(r=r||[],!Array.isArray(e)&&!isTypedArray(e)){assert(0===t.length,function(){return"Element arr[".concat(r.join("]["),"] is a primitive, ")+"but should be an array/TypedArray of ".concat(t[0]," elements")});return}assert(t.length>0,function(){return"Element arr[".concat(r.join("]["),"] should be a primitive, ")+"but is an array of ".concat(e.length," elements")}),assert(e.length===t[0],function(){return"Element arr[".concat(r.join("]["),"] should have ").concat(t[0]," ")+"elements, but has ".concat(e.length," elements")});for(var n=t.slice(1),a=0;a<e.length;++a)deepAssertShapeConsistency(e[a],n,r.concat(a))}(e,a,[]),a}function assertDtype(e,t,r,n){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error("Argument '".concat(r,"' passed to '").concat(n,"' must ")+"be ".concat(e," tensor, but got ").concat(t," tensor"))}}function convertToTensor(e,t,r,n){if(void 0===n&&(n="numeric"),e instanceof getGlobalTensorClass())return assertDtype(n,e.dtype,t,r),e;var a=inferDtype(e);if("string"!==a&&["bool","int32","float32"].indexOf(n)>=0&&(a=n),assertDtype(n,a,t,r),null==e||!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){var o=null==e?"null":e.constructor.name;throw Error("Argument '".concat(t,"' passed to '").concat(r,"' must be a ")+"Tensor or TensorLike, but got '".concat(o,"'"))}var i=inferShape(e,a);isTypedArray(e)||Array.isArray(e)||(e=[e]);var s="string"!==a?toTypedArray(e,a):flatten(e,[],!0);return rd.makeTensor(s,i,a)}function convertToTensorArray(e,t,r,n){if(void 0===n&&(n="numeric"),!Array.isArray(e))throw Error("Argument ".concat(t," passed to ").concat(r," must be a ")+"`Tensor[]` or `TensorLike[]`");return e.map(function(e,a){return convertToTensor(e,"".concat(t,"[").concat(a,"]"),r,n)})}rf.registerFlag("DEBUG",function(){return!1},function(e){e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),rf.registerFlag("IS_BROWSER",function(){return isBrowser()}),rf.registerFlag("IS_NODE",function(){return"undefined"!=typeof process&&void 0!==process.versions&&void 0!==process.versions.node}),rf.registerFlag("IS_CHROME",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),rf.registerFlag("IS_SAFARI",function(){return"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)}),rf.registerFlag("PROD",function(){return!1}),rf.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return rf.getBool("DEBUG")}),rf.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),rf.registerFlag("IS_TEST",function(){return!1}),rf.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",function(){return rf.getBool("DEBUG")}),rf.registerFlag("WRAP_TO_IMAGEBITMAP",function(){return!1}),rf.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",function(){return!1}),rf.registerFlag("USE_SETTIMEOUTCUSTOM",function(){return!1});var rp="__op";function op(e){var t=Object.keys(e);if(1!==t.length)throw Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+"".concat(t.length," keys."));var r=t[0],n=e[r];r.endsWith("_")&&(r=r.substring(0,r.length-1));var f2=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];rd.startScope(r);try{var a=n.apply(void 0,__spreadArray([],__read(e),!1));return isPromise(a)&&console.error("Cannot return a Promise inside of tidy."),rd.endScope(a),a}catch(e){throw rd.endScope(null),e}};return Object.defineProperty(f2,"name",{value:r+=rp,configurable:!0}),f2}var rh=op({complex_:/**
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
 */function(e,t){var r=convertToTensor(e,"real","complex"),n=convertToTensor(t,"imag","complex");return assertShapesMatch(r.shape,n.shape,"real and imag shapes, ".concat(r.shape," and ").concat(n.shape,", ")+"must match in call to tf.complex()."),rd.runKernel(N,{real:r,imag:n})}});/**
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
 */var rm={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8},rg=function(){function CompositeArrayBuffer(e){if(this.shards=[],this.previousShardIndex=0,null!=e&&(e instanceof Array||(e=[e]),0!==(e=e.map(function(e){return isTypedArray(e)?e.buffer:e})).length)){this.bufferUniformSize=e[0].byteLength;for(var t=0,r=0;r<e.length;r++){var n=e[r];r!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);var a=t+n.byteLength;this.shards.push({buffer:n,start:t,end:a}),t=a}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}}return CompositeArrayBuffer.join=function(e){return new CompositeArrayBuffer(e).slice()},CompositeArrayBuffer.prototype.slice=function(e,t){if(void 0===e&&(e=0),void 0===t&&(t=this.byteLength),0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);var r=this.findShardForByte(e);if(-1===r)throw Error("Could not find start shard for byte ".concat(e));for(var n=t-e,a=new ArrayBuffer(n),o=new Uint8Array(a),i=0,s=r;s<this.shards.length;s++){var u=this.shards[s],c=e+i-u.start,l=i,d=Math.min(t,u.end)-u.start,f=new Uint8Array(u.buffer,c,d-c);if(o.set(f,l),i+=f.length,t<u.end)break}return a},CompositeArrayBuffer.prototype.findShardForByte=function(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function check(t){return e<t.start?-1:e>=t.end?1:0}if(0===check(this.shards[this.previousShardIndex]))return this.previousShardIndex;var t=function(e,t){for(var r=0,n=e.length;r<=n;){var a=Math.floor((n-r)/2)+r,o=t(e[a]);if(0===o)return a;o<0?n=a:r=a+1}return -1}(this.shards,check);return -1===t?-1:(this.previousShardIndex=t,this.previousShardIndex)},CompositeArrayBuffer}();function tidy(e,t){return rd.tidy(e,t)}function dispose(e){getTensorsInContainer(e).forEach(function(e){return e.dispose()})}function keep(e){return rd.keep(e)}function getBackend(){return rd.backendName}function backend(){return rd.backend}function decodeWeights(e,t){var r,n,a=new rg(e),o={},i=0;try{for(var s=__values(t),u=s.next();!u.done;u=s.next()){var c=u.value,l=function(e,t){var r,n=sizeFromShape(e.shape);if("quantization"in e)r=rm[e.quantization.dtype];else if("string"===e.dtype){for(var a=0,o=0;o<n;o++)a+=4+new Uint32Array(t(a,a+4))[0];return a}else r=rm[e.dtype];return n*r}(c,function(e,t){return a.slice(i+e,i+t)});o[c.name]=decodeWeight(c,a.slice(i,i+l)),i+=l}}catch(e){r={error:e}}finally{try{u&&!u.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}return o}function decodeWeight(e,t){var r,n=e.name,a=e.dtype,o=e.shape,i=sizeFromShape(o),s=0;if("quantization"in e){var u=e.quantization;if("uint8"===u.dtype||"uint16"===u.dtype){if(!("min"in u&&"scale"in u))throw Error("Weight ".concat(e.name," with quantization ").concat(u.dtype," ")+"doesn't have corresponding metadata min and scale.")}else if("float16"===u.dtype){if("float32"!==a)throw Error("Weight ".concat(e.name," is quantized with ").concat(u.dtype," ")+"which only supports weights of type float32 not ".concat(a,"."))}else throw Error("Weight ".concat(e.name," has unknown ")+"quantization dtype ".concat(u.dtype,". ")+"Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.");var c=rm[u.dtype],l="uint8"===u.dtype?new Uint8Array(t):new Uint16Array(t);if("float32"===a){if("uint8"===u.dtype||"uint16"===u.dtype){r=new Float32Array(l.length);for(var d,f,p,h=0;h<l.length;h++){var m=l[h];r[h]=m*u.scale+u.min}}else if("float16"===u.dtype)r=(d=function(){var e=new Uint32Array(2048);e[0]=0;for(var t=1;t<1024;t++)e[t]=function(e){for(var t=e<<13,r=0;(8388608&t)==0;)r-=8388608,t<<=1;return(t&=-8388609)|(r+=947912704)}(t);for(var t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}(),f=function(){var e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(var t=1;t<31;t++)e[t]=t<<23;for(var t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),p=function(){for(var e=new Uint32Array(64),t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}(),function(e){for(var t=new ArrayBuffer(4*e.length),r=new Uint32Array(t),n=0;n<e.length;n++){var a=e[n],o=d[p[a>>10]+(1023&a)]+f[a>>10];r[n]=o}return new Float32Array(t)})(l);else throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type float32.")}else if("int32"===a){if("uint8"!==u.dtype&&"uint16"!==u.dtype)throw Error("Unsupported quantization type ".concat(u.dtype," ")+"for weight type int32.");r=new Int32Array(l.length);for(var h=0;h<l.length;h++){var m=l[h];r[h]=Math.round(m*u.scale+u.min)}}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(a));s+=i*c}else if("string"===a){var g=sizeFromShape(e.shape);r=[];for(var h=0;h<g;h++){var v=new Uint32Array(t.slice(s,s+4))[0];s+=4;var b=new Uint8Array(t.slice(s,s+v));r.push(b),s+=v}}else{var y=rm[a];if("float32"===a)r=new Float32Array(t);else if("int32"===a)r=new Int32Array(t);else if("bool"===a)r=new Uint8Array(t);else if("complex64"===a){r=new Float32Array(t);for(var S=new Float32Array(r.length/2),P=new Float32Array(r.length/2),h=0;h<S.length;h++)S[h]=r[2*h],P[h]=r[2*h+1];var T=tensor(S,o,"float32"),x=tensor(P,o,"float32"),_=rh(T,x);return T.dispose(),x.dispose(),_}else throw Error("Unsupported dtype in weight '".concat(n,"': ").concat(a));s+=i*y}return tensor(r,o,a)}function readToLength(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:n=new Uint8Array(t),c.label=1;case 1:if(!(n.byteLength<r))return[3,3];return[4,e.read()];case 2:if(o=(a=c.sent()).done,i=a.value,o&&null==i)throw s=r-n.byteLength,Error("Reader is done but ".concat(s," bytes are still expected"));return(u=new Uint8Array(n.length+i.byteLength)).set(n,0),u.set(new Uint8Array(i),n.length),n=u,[3,1];case 3:return[2,n.buffer]}})})}var rv="undefined"!=typeof Buffer&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function stringByteLength(e){return rv?Buffer.byteLength(e,"utf8"):new Blob([e]).size}function basename(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);var t=e.split("/");return t[t.length-1]}function getModelJSONForModelArtifacts(e,t){var r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),r}function getModelArtifactsForJSONSync(e,t,r){var n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!r)throw Error("modelJSON has weightsManifest but weightData is null");n.weightSpecs=t,n.weightData=r}return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),n}function getModelArtifactsForJSON(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a;return __generator(this,function(o){switch(o.label){case 0:if(!(null!=e.weightsManifest))return[3,2];return[4,t(e.weightsManifest)];case 1:r=(a=__read.apply(void 0,[o.sent(),2]))[0],n=a[1],o.label=2;case 2:return[2,getModelArtifactsForJSONSync(e,r,n)]}})})}function getModelArtifactsInfoForJSON(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:stringByteLength(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:stringByteLength(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new rg(e.weightData).byteLength}}function getWeightSpecs(e){var t,r,n=[];try{for(var a=__values(e),o=a.next();!o.done;o=a.next()){var i=o.value;n.push.apply(n,__spreadArray([],__read(i.weights),!1))}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return n}/**
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
 */var rb=function(){function IORouterRegistry(){this.saveRouters=[],this.loadRouters=[]}return IORouterRegistry.getInstance=function(){return null==IORouterRegistry.instance&&(IORouterRegistry.instance=new IORouterRegistry),IORouterRegistry.instance},IORouterRegistry.registerSaveRouter=function(e){IORouterRegistry.getInstance().saveRouters.push(e)},IORouterRegistry.registerLoadRouter=function(e){IORouterRegistry.getInstance().loadRouters.push(e)},IORouterRegistry.getSaveHandlers=function(e){return IORouterRegistry.getHandlers(e,"save")},IORouterRegistry.getLoadHandlers=function(e,t){return IORouterRegistry.getHandlers(e,"load",t)},IORouterRegistry.getHandlers=function(e,t,r){var n=[];return("load"===t?IORouterRegistry.getInstance().loadRouters:IORouterRegistry.getInstance().saveRouters).forEach(function(t){var a=t(e,r);null!==a&&n.push(a)}),n},IORouterRegistry}(),ry="tensorflowjs",rS="models_store",rP="model_info_store";function getIndexedDBFactory(){if(!env().getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function setUpDatabase(e){var t=e.result;t.createObjectStore(rS,{keyPath:"modelPath"}),t.createObjectStore(rP,{keyPath:"modelPath"})}var rT=function(){function BrowserIndexedDB(e){if(this.indexedDB=getIndexedDBFactory(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}return BrowserIndexedDB.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,e)]})})},BrowserIndexedDB.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,this.databaseAction(this.modelPath)]})})},BrowserIndexedDB.prototype.databaseAction=function(e,t){var r=this;return new Promise(function(e,n){var a=r.indexedDB.open(ry,1);a.onupgradeneeded=function(){return setUpDatabase(a)},a.onsuccess=function(){var o=a.result;if(null==t){var i=o.transaction(rS,"readonly"),s=i.objectStore(rS).get(r.modelPath);s.onsuccess=function(){if(null==s.result)return o.close(),n(Error("Cannot find model with path '".concat(r.modelPath,"' ")+"in IndexedDB."));e(s.result.modelArtifacts)},s.onerror=function(e){return o.close(),n(s.error)},i.oncomplete=function(){return o.close()}}else{t.weightData=rg.join(t.weightData);var u,c,l=getModelArtifactsInfoForJSON(t),d=o.transaction(rP,"readwrite"),f=d.objectStore(rP);try{u=f.put({modelPath:r.modelPath,modelArtifactsInfo:l})}catch(e){return n(e)}u.onsuccess=function(){var a,i=(c=o.transaction(rS,"readwrite")).objectStore(rS);try{a=i.put({modelPath:r.modelPath,modelArtifacts:t,modelArtifactsInfo:l})}catch(e){return n(e)}a.onsuccess=function(){return e({modelArtifactsInfo:l})},a.onerror=function(e){var t=(f=d.objectStore(rP)).delete(r.modelPath);t.onsuccess=function(){return o.close(),n(a.error)},t.onerror=function(e){return o.close(),n(a.error)}}},u.onerror=function(e){return o.close(),n(u.error)},d.oncomplete=function(){null==c?o.close():c.oncomplete=function(){return o.close()}}}},a.onerror=function(e){return n(a.error)}})},BrowserIndexedDB}();rT.URL_SCHEME="indexeddb://";var indexedDBRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rT.URL_SCHEME)?(t=e.slice(rT.URL_SCHEME.length),new rT(t)):null};rb.registerSaveRouter(indexedDBRouter),rb.registerLoadRouter(indexedDBRouter);var rx=function(){function BrowserIndexedDBManager(){this.indexedDB=getIndexedDBFactory()}return BrowserIndexedDBManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=e.indexedDB.open(ry,1);n.onupgradeneeded=function(){return setUpDatabase(n)},n.onsuccess=function(){var e=n.result,a=e.transaction(rP,"readonly"),o=a.objectStore(rP).getAll();o.onsuccess=function(){var e,r,n={};try{for(var a=__values(o.result),i=a.next();!i.done;i=a.next()){var s=i.value;n[s.modelPath]=s.modelArtifactsInfo}}catch(t){e={error:t}}finally{try{i&&!i.done&&(r=a.return)&&r.call(a)}finally{if(e)throw e.error}}t(n)},o.onerror=function(t){return e.close(),r(o.error)},a.oncomplete=function(){return e.close()}},n.onerror=function(e){return r(n.error)}})]})})},BrowserIndexedDBManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(r){return e=e.startsWith(rT.URL_SCHEME)?e.slice(rT.URL_SCHEME.length):e,[2,new Promise(function(r,n){var a=t.indexedDB.open(ry,1);a.onupgradeneeded=function(){return setUpDatabase(a)},a.onsuccess=function(){var t,o=a.result,i=o.transaction(rP,"readwrite"),s=i.objectStore(rP),u=s.get(e);u.onsuccess=function(){if(null==u.result)return o.close(),n(Error("Cannot find model with path '".concat(e,"' ")+"in IndexedDB."));var a=s.delete(e),deleteModelData_1=function(){var a=(t=o.transaction(rS,"readwrite")).objectStore(rS).delete(e);a.onsuccess=function(){return r(u.result.modelArtifactsInfo)},a.onerror=function(e){return n(u.error)}};a.onsuccess=deleteModelData_1,a.onerror=function(e){return deleteModelData_1(),o.close(),n(u.error)}},u.onerror=function(e){return o.close(),n(u.error)},i.oncomplete=function(){null==t?o.close():t.oncomplete=function(){return o.close()}}},a.onerror=function(e){return n(a.error)}})]})})},BrowserIndexedDBManager}(),r_="tensorflowjs_models",rA="info";function getModelKeys(e){return{info:[r_,e,rA].join("/"),topology:[r_,e,"model_topology"].join("/"),weightSpecs:[r_,e,"weight_specs"].join("/"),weightData:[r_,e,"weight_data"].join("/"),modelMetadata:[r_,e,"model_metadata"].join("/")}}function removeItems(e){var t,r;try{for(var n=__values(Object.values(e)),a=n.next();!a.done;a=n.next()){var o=a.value;window.localStorage.removeItem(o)}}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}var rO=function(){function BrowserLocalStorage(e){if(!env().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=getModelKeys(this.modelPath)}return BrowserLocalStorage.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o;return __generator(this,function(i){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),n=getModelArtifactsInfoForJSON(e),a=rg.join(e.weightData);try{return this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,function(e){if(rv)return Buffer.from(e).toString("base64");for(var t=new Uint8Array(e),r="",n=0,a=t.length;n<a;n++)r+=String.fromCharCode(t[n]);return btoa(r)}(a)),o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0},this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),[2,{modelArtifactsInfo:n}]}catch(e){throw removeItems(this.keys),Error("Failed to save model '".concat(this.modelPath,"' to local storage: ")+"size quota being exceeded is a possible cause of this failure: "+"modelTopologyBytes=".concat(n.modelTopologyBytes,", ")+"weightSpecsBytes=".concat(n.weightSpecsBytes,", ")+"weightDataBytes=".concat(n.weightDataBytes,"."))}return[2]})})},BrowserLocalStorage.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a,o,i;return __generator(this,function(s){if(null==(e=JSON.parse(this.LS.getItem(this.keys.info))))throw Error("In local storage, there is no model with name '".concat(this.modelPath,"'"));if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(t={},null==(r=JSON.parse(this.LS.getItem(this.keys.topology))))throw Error("In local storage, the topology of model '".concat(this.modelPath,"' ")+"is missing.");if(t.modelTopology=r,null==(n=JSON.parse(this.LS.getItem(this.keys.weightSpecs))))throw Error("In local storage, the weight specs of model '".concat(this.modelPath,"' ")+"are missing.");if(t.weightSpecs=n,null!=(a=this.LS.getItem(this.keys.modelMetadata))&&(o=JSON.parse(a),t.format=o.format,t.generatedBy=o.generatedBy,t.convertedBy=o.convertedBy,null!=o.signature&&(t.signature=o.signature),null!=o.userDefinedMetadata&&(t.userDefinedMetadata=o.userDefinedMetadata),null!=o.modelInitializer&&(t.modelInitializer=o.modelInitializer),null!=o.initializerSignature&&(t.initializerSignature=o.initializerSignature),null!=o.trainingConfig&&(t.trainingConfig=o.trainingConfig)),null==(i=this.LS.getItem(this.keys.weightData)))throw Error("In local storage, the binary weight values of model "+"'".concat(this.modelPath,"' are missing."));return t.weightData=function(e){if(rv){var t=Buffer.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}for(var r=atob(e),n=new Uint8Array(r.length),a=0;a<r.length;++a)n.set([r.charCodeAt(a)],a);return n.buffer}(i),[2,t]})})},BrowserLocalStorage}();rO.URL_SCHEME="localstorage://";var localStorageRouter=function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rO.URL_SCHEME)?(t=e.slice(rO.URL_SCHEME.length),new rO(t)):null};rb.registerSaveRouter(localStorageRouter),rb.registerLoadRouter(localStorageRouter);var rw=function(){function BrowserLocalStorageManager(){assert(env().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),assert("undefined"==typeof window||void 0!==window.localStorage,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}return BrowserLocalStorageManager.prototype.listModels=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a;return __generator(this,function(o){for(n=0,e={},t=r_+"/",r="/"+rA;n<this.LS.length;++n)(a=this.LS.key(n)).startsWith(t)&&a.endsWith(r)&&(e[function(e){var t=e.split("/");if(t.length<3)throw Error("Invalid key format: ".concat(e));return t.slice(1,t.length-1).join("/")}(a)]=JSON.parse(this.LS.getItem(a)));return[2,e]})})},BrowserLocalStorageManager.prototype.removeModel=function(e){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(n){if(t=getModelKeys(e=e.startsWith(rO.URL_SCHEME)?e.slice(rO.URL_SCHEME.length):e),null==this.LS.getItem(t.info))throw Error("Cannot find model at path '".concat(e,"'"));return r=JSON.parse(this.LS.getItem(t.info)),removeItems(t),[2,r]})})},BrowserLocalStorageManager}(),rE=function(){function ModelStoreManagerRegistry(){this.managers={}}return ModelStoreManagerRegistry.getInstance=function(){return null==ModelStoreManagerRegistry.instance&&(ModelStoreManagerRegistry.instance=new ModelStoreManagerRegistry),ModelStoreManagerRegistry.instance},ModelStoreManagerRegistry.registerManager=function(e,t){assert(null!=e,function(){return"scheme must not be undefined or null."}),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),assert(e.length>0,function(){return"scheme must not be an empty string."});var r=ModelStoreManagerRegistry.getInstance();assert(null==r.managers[e],function(){return"A model store manager is already registered for scheme '".concat(e,"'.")}),r.managers[e]=t},ModelStoreManagerRegistry.getManager=function(e){var t=ModelStoreManagerRegistry.getInstance().managers[e];if(null==t)throw Error("Cannot find model manager for scheme '".concat(e,"'"));return t},ModelStoreManagerRegistry.getSchemes=function(){return Object.keys(ModelStoreManagerRegistry.getInstance().managers)},ModelStoreManagerRegistry}();function parseURL(e){if(-1===e.indexOf("://"))throw Error("The url string provided does not contain a scheme. Supported schemes are: "+"".concat(rE.getSchemes().join(",")));return{scheme:e.split("://")[0],path:e.split("://")[1]}}function cloneModelInternal(e,t,r){return void 0===r&&(r=!1),__awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d;return __generator(this,function(f){switch(f.label){case 0:return assert(e!==t,function(){return"Old path and new path are the same: '".concat(e,"'")}),assert((n=rb.getLoadHandlers(e)).length>0,function(){return"Copying failed because no load handler is found for source URL ".concat(e,".")}),assert(n.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"load handlers for source URL ".concat(e,".")}),a=n[0],assert((o=rb.getSaveHandlers(t)).length>0,function(){return"Copying failed because no save handler is found for destination "+"URL ".concat(t,".")}),assert(o.length<2,function(){return"Copying failed because more than one (".concat(n.length,") ")+"save handlers for destination URL ".concat(t,".")}),i=o[0],s=parseURL(e).scheme,u=parseURL(e).path,c=s===parseURL(e).scheme,[4,a.load()];case 1:if(l=f.sent(),!(r&&c))return[3,3];return[4,rE.getManager(s).removeModel(u)];case 2:f.sent(),f.label=3;case 3:return[4,i.save(l)];case 4:if(d=f.sent(),!(r&&!c))return[3,6];return[4,rE.getManager(s).removeModel(u)];case 5:f.sent(),f.label=6;case 6:return[2,d.modelArtifactsInfo]}})})}/**
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
 */var rk=function(){function PlatformBrowser(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}return PlatformBrowser.prototype.fetch=function(e,t){return fetch(e,t)},PlatformBrowser.prototype.now=function(){return performance.now()},PlatformBrowser.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Browser's encoder only supports utf-8, but got ".concat(t));return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)},PlatformBrowser.prototype.decode=function(e,t){return new TextDecoder(t).decode(e)},PlatformBrowser.prototype.setTimeoutCustom=function(e,t){var r=this;if("undefined"==typeof window||!env().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(function(){window.postMessage({name:r.messageName,index:r.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",function(e){e.source===window&&e.data.name===r.messageName&&(e.stopPropagation(),(0,r.functionRefs[e.data.index])(),r.handledMessageCount++,r.handledMessageCount===r.functionRefs.length&&(r.functionRefs=[],r.handledMessageCount=0))},!0))},PlatformBrowser.prototype.isTypedArray=function(e){return isTypedArrayBrowser(e)},PlatformBrowser}();if(env().get("IS_BROWSER")){env().setPlatform("browser",new rk);try{rE.registerManager(rO.URL_SCHEME,new rw)}catch(e){}try{rE.registerManager(rT.URL_SCHEME,new rx)}catch(e){}}/**
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
 */var rD={importFetch:function(){return r(81285)}},rM=function(){function PlatformNode(){this.util=r(73837),this.textEncoder=new this.util.TextEncoder}return PlatformNode.prototype.fetch=function(e,t){return null!=env().global.fetch?env().global.fetch(e,t):(null==c&&(c=rD.importFetch()),c(e,t))},PlatformNode.prototype.now=function(){var e=process.hrtime();return 1e3*e[0]+e[1]/1e6},PlatformNode.prototype.encode=function(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error("Node built-in encoder only supports utf-8, but got ".concat(t));return this.textEncoder.encode(e)},PlatformNode.prototype.decode=function(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)},PlatformNode.prototype.isTypedArray=function(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)},PlatformNode}();/**
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
 */function buffer(e,t,r){return void 0===t&&(t="float32"),t=t||"float32",assertNonNegativeIntegerDimensions(e),new rn(e,t,r)}env().get("IS_NODE")&&!env().get("IS_BROWSER")&&env().setPlatform("node",new rM);var rC=op({cast_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","cast");if(!isValidDtype(t))throw Error("Failed to cast to unknown dtype ".concat(t));if("string"===t&&"string"!==r.dtype||"string"!==t&&"string"===r.dtype)throw Error("Only strings can be casted to strings");return rd.runKernel(j,{x:r},{dtype:t})}}),rj=op({clone_:/**
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
 */getOrMakeEngine(),ro={buffer:buffer,cast:rC,clone:rj,print:print};var rR=op({add_:function(e,t){var r,n=convertToTensor(e,"a","add"),a=convertToTensor(t,"b","add"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Add",o)}}),rI=op({floorDiv_:function(e,t){var r,n=convertToTensor(e,"a","floorDiv"),a=convertToTensor(t,"b","floorDiv"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(el,o)}}),rN=op({div_:function(e,t){var r,n=convertToTensor(e,"a","div"),a=convertToTensor(t,"b","div");if(n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"int32"===n.dtype&&"int32"===a.dtype)return rI(n,a);var o={a:n,b:a};return rd.runKernel(er,o,{})}}),rL=op({mul_:function(e,t){var r,n=convertToTensor(e,"a","mul"),a=convertToTensor(t,"b","mul"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(eB,o)}}),rB=op({abs_:/**
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
 */function(e){var t=convertToTensor(e,"x","abs");if("complex64"===t.dtype){var r={x:t};return rd.runKernel(L,r)}var r={x:t};return rd.runKernel("Abs",r)}}),rF=op({acos_:/**
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
 */function(e){var t=convertToTensor(e,"x","acos");return rd.runKernel(g,{x:t})}}),rz=op({acosh_:/**
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
 */function(e){var t=convertToTensor(e,"x","acosh");return rd.runKernel(v,{x:t})}}),rZ=op({addN_:/**
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
 */function(e){assert(Array.isArray(e),function(){return"The argument passed to tf.addN() must be a list of tensors"}),assert(e.length>=1,function(){return"Must pass at least one tensor to tf.addN(), but got "+"".concat(e.length)});var t=e.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"addN")}),r=t[0];return t.forEach(function(e){if(e.dtype!==r.dtype)throw Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(function(e){if(!arraysEqual(e.shape,r.shape))throw Error("All tensors passed to tf.addN() must have the same shape")}),rd.runKernel(b,t)}}),rH=op({all_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","all","bool"),a={axis:t,keepDims:r};return rd.runKernel("All",{x:n},a)}}),rV=op({any_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","any","bool"),a={axis:t,keepDims:r};return rd.runKernel("Any",{x:n},a)}}),rU=op({argMax_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMax"),n={axis:t};return rd.runKernel(y,{x:r},n)}}),rG=op({argMin_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","argMin"),n={axis:t};return rd.runKernel(S,{x:r},n)}}),rW=op({asin_:/**
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
 */function(e){var t=convertToTensor(e,"x","asin");return rd.runKernel(P,{x:t})}}),rK=op({asinh_:/**
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
 */function(e){var t=convertToTensor(e,"x","asinh");return rd.runKernel(T,{x:t})}}),rq=op({atan_:/**
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
 */function(e){var t=convertToTensor(e,"x","atan");return rd.runKernel(x,{x:t})}}),rX=op({atan2_:function(e,t){var r,n=convertToTensor(e,"a","atan2"),a=convertToTensor(t,"b","atan2"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel(A,o)}}),r$=op({atanh_:/**
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
 */function(e){var t=convertToTensor(e,"x","atanh");return rd.runKernel(_,{x:t})}});function computePool2DInfo(e,t,r,n,a,o,i){void 0===i&&(i="channelsLast");var s,u=__read(parseTupleParam(t),2),c=u[0],l=u[1];if("channelsLast"===i)s=[c,l,e[3],e[3]];else if("channelsFirst"===i)s=[c,l,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv2DInfo(e,s,r,n,a,o,!1,i)}function computeConv2DInfo(e,t,r,n,a,o,i,s){void 0===i&&(i=!1),void 0===s&&(s="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1],4),f=d[0],p=d[1],h=d[2],m=d[3];if("channelsLast"===s)f=(u=__read(e,4))[0],p=u[1],h=u[2],m=u[3];else if("channelsFirst"===s)f=(c=__read(e,4))[0],m=c[1],p=c[2],h=c[3];else throw Error("Unknown dataFormat ".concat(s));var g=__read(t,4),v=g[0],b=g[1],y=g[3],S=__read(parseTupleParam(r),2),P=S[0],T=S[1],x=__read(parseTupleParam(n),2),_=x[0],A=x[1],O=getEffectiveFilterSize(v,_),w=getEffectiveFilterSize(b,A),E=function(e,t,r,n,a,o,i,s,u){if("number"==typeof e){var c,l,d,f,p,h,m,g=0===e?"VALID":"NUMBER";p={top:e,bottom:e,left:e,right:e,type:g};var v=(c=[t,r],null==(l=e)&&(l=computeDefaultPad(c,o,n)),d=c[0],f=c[1],[round$1((d-o+2*l)/n+1,s),round$1((f-o+2*l)/n+1,s)]);h=v[0],m=v[1]}else if("same"===e){var b=Math.max(0,((h=Math.ceil(t/n))-1)*n+o-t),y=Math.max(0,((m=Math.ceil(r/a))-1)*a+i-r),S=Math.floor(b/2),P=b-S,T=Math.floor(y/2),x=y-T;p={top:S,bottom:P,left:T,right:x,type:"SAME"}}else if("valid"===e)p={top:0,bottom:0,left:0,right:0,type:"VALID"},h=Math.ceil((t-o+1)/n),m=Math.ceil((r-i+1)/a);else if("object"==typeof e){var S="channelsLast"===u?e[1][0]:e[2][0],P="channelsLast"===u?e[1][1]:e[2][1],T="channelsLast"===u?e[2][0]:e[3][0],x="channelsLast"===u?e[2][1]:e[3][1],g=0===S&&0===P&&0===T&&0===x?"VALID":"EXPLICIT";p={top:S,bottom:P,left:T,right:x,type:g},h=round$1((t-o+S+P)/n+1,s),m=round$1((r-i+T+x)/a+1,s)}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:p,outHeight:h,outWidth:m}}(a,p,h,P,T,O,w,o,s),k=E.padInfo,D=E.outHeight,M=E.outWidth,C=i?y*m:y;return"channelsFirst"===s?l=[f,C,D,M]:"channelsLast"===s&&(l=[f,D,M,C]),{batchSize:f,dataFormat:s,inHeight:p,inWidth:h,inChannels:m,outHeight:D,outWidth:M,outChannels:C,padInfo:k,strideHeight:P,strideWidth:T,filterHeight:v,filterWidth:b,effectiveFilterHeight:O,effectiveFilterWidth:w,dilationHeight:_,dilationWidth:A,inShape:e,outShape:l,filterShape:t}}function computeConv3DInfo(e,t,r,n,a,o,i,s){void 0===o&&(o=!1),void 0===i&&(i="channelsLast");var u,c,l,d=__read([-1,-1,-1,-1,-1],5),f=d[0],p=d[1],h=d[2],m=d[3],g=d[4];if("channelsLast"===i)f=(u=__read(e,5))[0],p=u[1],h=u[2],m=u[3],g=u[4];else if("channelsFirst"===i)f=(c=__read(e,5))[0],g=c[1],p=c[2],h=c[3],m=c[4];else throw Error("Unknown dataFormat ".concat(i));var v=__read(t,5),b=v[0],y=v[1],S=v[2],P=v[4],T=__read(parse3TupleParam(r),3),x=T[0],_=T[1],A=T[2],O=__read(parse3TupleParam(n),3),w=O[0],E=O[1],k=O[2],D=getEffectiveFilterSize(b,w),M=getEffectiveFilterSize(y,E),C=getEffectiveFilterSize(S,k),j=function(e,t,r,n,a,o,i,s,u,c,l){if("valid"===e&&(e=0),"number"==typeof e){var d,f,p,h,m=0===e?"VALID":"NUMBER";d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:m};var g=function(e,t,r,n,a,o){null==a&&(a=computeDefaultPad(e,t[0],n[0]));for(var i=[0,0,0,1],s=0;s<3;s++)e[s]+2*a>=t[s]&&(i[s]=round$1((e[s]-t[s]+2*a)/n[s]+1,o));return i}([t,r,n,1],[s,u,c],0,[a,o,i],e,l);f=g[0],p=g[1],h=g[2]}else if("same"===e){var v=((f=Math.ceil(t/a))-1)*a+s-t,b=((p=Math.ceil(r/o))-1)*o+u-r,y=((h=Math.ceil(n/i))-1)*i+c-n,S=Math.floor(v/2),P=Math.floor(b/2),T=Math.floor(y/2);d={top:P,bottom:b-P,left:T,right:y-T,front:S,back:v-S,type:"SAME"}}else throw Error("Unknown padding parameter: ".concat(e));return{padInfo:d,outDepth:f,outHeight:p,outWidth:h}}(a,p,h,m,x,_,A,D,M,C,s),R=j.padInfo,I=j.outDepth,N=j.outHeight,L=j.outWidth,B=o?P*g:P;return"channelsFirst"===i?l=[f,B,I,N,L]:"channelsLast"===i&&(l=[f,I,N,L,B]),{batchSize:f,dataFormat:i,inDepth:p,inHeight:h,inWidth:m,inChannels:g,outDepth:I,outHeight:N,outWidth:L,outChannels:B,padInfo:R,strideDepth:x,strideHeight:_,strideWidth:A,filterDepth:b,filterHeight:y,filterWidth:S,effectiveFilterDepth:D,effectiveFilterHeight:M,effectiveFilterWidth:C,dilationDepth:w,dilationHeight:E,dilationWidth:k,inShape:e,outShape:l,filterShape:t}}function computeDefaultPad(e,t,r,n){void 0===n&&(n=1);var a=getEffectiveFilterSize(t,n);return Math.floor((e[0]*(r-1)-r+a)/2)}function parseTupleParam(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function parse3TupleParam(e){return"number"==typeof e?[e,e,e]:e}function getEffectiveFilterSize(e,t){return t<=1?e:e+(e-1)*(t-1)}function round$1(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error("Unknown roundingMode ".concat(t))}}function tupleValuesAreOne(e){var t=__read(parseTupleParam(e),3),r=t[0],n=t[1],a=t[2];return 1===r&&1===n&&1===a}function eitherStridesOrDilationsAreOne(e,t){return tupleValuesAreOne(e)||tupleValuesAreOne(t)}function stridesOrDilationsArePositive(e){return parseTupleParam(e).every(function(e){return e>0})}function convertConv2DDataFormat(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error("Unknown dataFormat ".concat(e))}function checkPadOnDimRoundingMode(e,t,r){if(null!=r){if("string"==typeof t)throw Error("Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,"."));if("number"==typeof t)assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")});else if("object"==typeof t)t.forEach(function(t){t.forEach(function(t){assert(isInt(t),function(){return"Error in ".concat(e,": pad must be an integer when using ")+"dimRoundingMode ".concat(r," but got pad ").concat(t,".")})})});else throw Error("Error in ".concat(e,": Unknown padding parameter: ").concat(t))}}var rY=op({reshape_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","reshape","string_or_numeric");return rd.runKernel(e2,{x:r},{shape:t})}}),rJ=op({avgPool_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"x","avgPool","float32");assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in avgPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")});var i=o,s=!1;3===o.rank&&(s=!0,i=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),assert(4===i.rank,function(){return"Error in avgPool: x must be rank 4 but got rank ".concat(i.rank,".")}),checkPadOnDimRoundingMode("avgPool",n,a);var u={x:i},c=rd.runKernel(O,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:a});return(c=rC(c,o.dtype),s)?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),rQ=op({avgPool3d_:/**
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
 */function(e,t,r,n,a,o){void 0===o&&(o="NDHWC");var i=convertToTensor(e,"x","avgPool3d","float32"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in avgPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===o,function(){return"Error in avgPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(o)}),assert("number"==typeof r&&r>0||Array.isArray(r)&&r[0]>0&&r[1]>0&&r[2]>0,function(){return"Error in avgPool3d: Stride must be > 0, but got '".concat(r,"'")}),checkPadOnDimRoundingMode("avgPool3d",n,a);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:a,dataFormat:o},d=rd.runKernel(w,c,l);return(d=rC(d,s.dtype),u)?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),r0=op({concat_:/**
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
 */function(e,t){void 0===t&&(t=0),assert(e.length>=1,function(){return"Pass at least one tensor to concat"});var r=convertToTensorArray(e,"tensors","concat","string_or_numeric");if("complex64"===r[0].dtype&&r.forEach(function(e){if("complex64"!==e.dtype)throw Error("Cannot concatenate complex64 tensors with a tensor\n          with dtype ".concat(e.dtype,". "))}),1===r.length)return rj(r[0]);var n={axis:t};return rd.runKernel(B,r,n)}}),r1=op({matMul_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a,o=convertToTensor(e,"a","matMul"),i=convertToTensor(t,"b","matMul"),s={a:o=(a=__read(makeTypesMatch(o,i),2))[0],b:i=a[1]},u={transposeA:r,transposeB:n};return rd.runKernel(E,s,u)}}),r2=op({sigmoid_:/**
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
 */function(e){var t=convertToTensor(e,"x","tanh","float32");return rd.runKernel(t_,{x:t})}}),r6=op({basicLSTMCell_:/**
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
 */function(e,t,r,n,a,o){var i=convertToTensor(e,"forgetBias","basicLSTMCell"),s=convertToTensor(t,"lstmKernel","basicLSTMCell"),u=convertToTensor(r,"lstmBias","basicLSTMCell"),c=convertToTensor(n,"data","basicLSTMCell"),l=convertToTensor(a,"c","basicLSTMCell"),d=rR(r1(r0([c,convertToTensor(o,"h","basicLSTMCell")],1),s),u),f=d.shape[0],p=d.shape[1]/4,h=[f,p],m=r3(d,[0,0],h),g=r3(d,[0,p],h),v=r3(d,[0,2*p],h),b=r3(d,[0,3*p],h),y=rR(rL(r2(m),r4(g)),rL(l,r2(rR(i,v)))),S=rL(r4(y),r2(b));return[y,S]}}),r5=op({batchToSpaceND_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","batchToSpaceND"),a=t.reduce(function(e,t){return e*t});return assert(n.rank>=1+t.length,function(){return"input rank is ".concat(n.rank," but should be > than blockShape.length ").concat(t.length)}),assert(r.length===t.length,function(){return"crops.length is ".concat(r.length," but should be equal to blockShape.length  ").concat(t.length)}),assert(n.shape[0]%a==0,function(){return"input tensor batch is ".concat(n.shape[0]," but is not divisible by the product of ")+"the elements of blockShape ".concat(t.join(" * ")," === ").concat(a)}),rd.runKernel(k,{x:n},{blockShape:t,crops:r})}}),r7=op({batchNorm_:/**
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
 */function(e,t,r,n,a,o){null==o&&(o=.001);var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(c.rank===l.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),assert(null==s||c.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),assert(null==i||c.rank===i.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."});var d={x:0===u.rank||1===u.rank?rY(u,[1,1,1,u.size]):2===u.rank?rY(u,[1,1,u.shape[0],u.shape[1]]):3===u.rank?rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]):u,scale:i,offset:s,mean:c,variance:l},f={varianceEpsilon:o};return rY(rd.runKernel(ed,d,f),u.shape)}}),r8=op({batchNorm2d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(2===u.rank,function(){return"Error in batchNorm2D: x must be rank 2 but got rank "+"".concat(u.rank,".")}),assert(2===c.rank||1===c.rank,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(2===l.rank||1===l.rank,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(2===i.rank||1===i.rank,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(2===s.rank||1===s.rank,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),r9=op({batchNorm3d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(3===u.rank,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+"".concat(u.rank,".")}),assert(3===c.rank||1===c.rank,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(3===l.rank||1===l.rank,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(3===i.rank||1===i.rank,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(3===s.rank||1===s.rank,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),ne=op({batchNorm4d_:function(e,t,r,n,a,o){var i,s,u=convertToTensor(e,"x","batchNorm"),c=convertToTensor(t,"mean","batchNorm"),l=convertToTensor(r,"variance","batchNorm");return null!=a&&(i=convertToTensor(a,"scale","batchNorm")),null!=n&&(s=convertToTensor(n,"offset","batchNorm")),assert(4===u.rank,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+"".concat(u.rank,".")}),assert(4===c.rank||1===c.rank,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but "+"got rank ".concat(c.rank,".")}),assert(4===l.rank||1===l.rank,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 "+"but got rank ".concat(l.rank,".")}),null!=i&&assert(4===i.rank||1===i.rank,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 "+"but got rank ".concat(i.rank,".")}),null!=s&&assert(4===s.rank||1===s.rank,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 "+"but got rank ".concat(s.rank,".")}),r7(u,c,l,s,i,o)}}),nt=op({bincount_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","bincount"),a=convertToTensor(t,"weights","bincount");return assert("int32"===n.dtype,function(){return"Error in bincount: input "+"dtype must be int32, but got ".concat(n.dtype)}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(a.size===n.size||0===a.size,function(){return"Error in bincount: weights must have the same size as input or"+"0-length, but got input shape: ".concat(n.shape,", weights shape: ")+"".concat(a.shape,".")}),rd.runKernel(D,{x:n,weights:a},{size:r})}}),nr=op({bitwiseAnd_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","bitwiseAnd"),n=convertToTensor(t,"y","bitwiseAnd");if(!arraysEqual(r.shape,n.shape))throw Error("BitwiseAnd: Tensors must have the same shape. x: ".concat(r.shape,", y: ").concat(n.shape));if("int32"!==r.dtype||"int32"!==n.dtype)throw Error("BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ".concat(r.dtype," and type of y: ").concat(n.dtype));return rd.runKernel(M,{a:r,b:n})}}),nn=op({broadcastArgs_:/**
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
 */function(e,t){var r=convertToTensor(e,"s0","broadcastArgs","int32"),n=convertToTensor(t,"s1","broadcastArgs","int32");if(1!==r.rank)throw Error("broadcastArgs(): first input must be a vector (rank=1). "+"Has rank ".concat(r.rank));if(1!==n.rank)throw Error("broadcastArgs(): second input must be a vector (rank=1). "+"Has rank ".concat(n.rank));return rd.runKernel(C,{s0:r,s1:n})}}),na=op({broadcastTo_:/**
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
 */function(e,t){var r=convertToTensor(e,"broadcastTo","x"),n=r.shape;if(assertNonNegativeIntegerDimensions(t),t.length<r.rank)throw Error("broadcastTo(): shape.length=".concat(t.length," < input.rank=").concat(r.rank,"."));if(t.length>r.rank){for(var a=r.shape.slice();a.length<t.length;)a.unshift(1);r=rY(r,a)}for(var o=r.shape,i=Array.from(t),s=t.length-1;s>=0;s--)if(o[s]===t[s])i[s]=1;else if(1!==r.shape[s])throw Error("broadcastTo(): [".concat(n,"] cannot be broadcast to [").concat(t,"]."));if(0===i.map(function(e,t){return e>1?t:-1}).filter(function(e){return e>=0}).length)return rj(r);var u={x:r};return rd.runKernel(tA,u,{reps:i})}}),no=op({ceil_:/**
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
 */function(e){var t=convertToTensor(e,"x","ceil","float32");return rd.runKernel(R,{x:t})}});/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","clipByValue");return(assert(t<=r,function(){return"Error in clip: min (".concat(t,") must be ")+"less than or equal to max (".concat(r,").")}),t===r)?fill(n.shape,t,n.dtype):rd.runKernel(I,{x:n},{clipValueMin:t,clipValueMax:r})}}),ns=op({concat1d_:function(e){return r0(e,0)}}),nu=op({concat2d_:function(e,t){return r0(e,t)}}),nc=op({concat3d_:function(e,t){return r0(e,t)}}),nl=op({concat4d_:function(e,t){return r0(e,t)}}),nd=op({conv2d_:/**
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
 */function(e,t,r,n,a,o,i){void 0===a&&(a="NHWC"),void 0===o&&(o=[1,1]);var s=convertToTensor(e,"x","conv2d","float32"),u=convertToTensor(t,"filter","conv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in conv2d: input must be rank 4, but got rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in conv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv2d",n,i);var d="NHWC"===a?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in conv2d: depth of input (".concat(d,") must match ")+"input depth for filter ".concat(u.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(o,"'")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv2D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv2D: Strides should be larger than 0."});var f={x:c,filter:u},p={strides:r,pad:n,dataFormat:a,dilations:o,dimRoundingMode:i},h=rd.runKernel(F,f,p);return l?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}}),nf=op({conv1d_:function(e,t,r,n,a,o,i){void 0===a&&(a="NWC"),void 0===o&&(o=1);var s=convertToTensor(e,"x","conv1d"),u=convertToTensor(t,"filter","conv1d"),c=s,l=!1;2===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1]])),assert(3===c.rank,function(){return"Error in conv1d: input must be rank 3, but got rank ".concat(c.rank,".")}),assert(3===u.rank,function(){return"Error in conv1d: filter must be rank 3, but got rank "+"".concat(u.rank,".")}),checkPadOnDimRoundingMode("conv1d",n,i),assert(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input (".concat(c.shape[2],") must match ")+"input depth for filter ".concat(u.shape[1],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv1D: Either stride or dilation must be 1. "+"Got stride ".concat(r," and dilation '").concat(o,"'")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv1D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv1D: Stride should be larger than 0."}),assert("NWC"===a,function(){return"Error in conv1d: got dataFormat of ".concat(a," but only NWC is currently supported.")});var d=rY(u,[1,u.shape[0],u.shape[1],u.shape[2]]),f=nd(rY(c,[c.shape[0],1,c.shape[1],c.shape[2]]),d,[1,r],n,"NHWC",[1,o],i);return l?rY(f,[f.shape[2],f.shape[3]]):rY(f,[f.shape[0],f.shape[2],f.shape[3]])}}),np=op({conv2DBackpropInput_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o="NHWC"),assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var s=e,u=t,c=!1;3===t.rank&&(c=!0,u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),assert(4===s.length,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+"".concat(s.length,".")}),assert(4===u.rank,function(){return"Error in conv2dDerInput: dy must be rank 4, but got "+"rank ".concat(u.rank)}),assert(4===r.rank,function(){return"Error in conv2dDerInput: filter must be rank 4, but got "+"rank ".concat(r.rank)});var l="NHWC"===o?s[3]:s[1],d="NHWC"===o?u.shape[3]:u.shape[1];assert(l===r.shape[2],function(){return"Error in conv2dDerInput: depth of input (".concat(l,") must ")+"match input depth for filter ".concat(r.shape[2],".")}),assert(d===r.shape[3],function(){return"Error in conv2dDerInput: depth of output (".concat(d,") must ")+"match output depth for filter ".concat(r.shape[3],".")}),checkPadOnDimRoundingMode("conv2dDerInput",a,i);var f={dy:u,filter:r},p={strides:n,pad:a,dataFormat:o,dimRoundingMode:i,inputShape:s},h=rd.runKernel(Z,f,p);return c?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}}),nh=op({conv2dTranspose_:function(e,t,r,n,a,o){return np(r,convertToTensor(e,"x","conv2dTranspose"),convertToTensor(t,"filter","conv2dTranspose"),n,a,"NHWC",o)}}),nm=op({conv3d_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a="NDHWC"),void 0===o&&(o=[1,1,1]);var i=convertToTensor(e,"x","conv3d"),s=convertToTensor(t,"filter","conv3d"),u=i,c=!1;4===i.rank&&(c=!0,u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===u.rank,function(){return"Error in conv3d: input must be rank 5, but got rank ".concat(u.rank,".")}),assert(5===s.rank,function(){return"Error in conv3d: filter must be rank 5, but got rank "+"".concat(s.rank,".")}),assert(u.shape[4]===s.shape[3],function(){return"Error in conv3d: depth of input (".concat(u.shape[4],") must match ")+"input depth for filter ".concat(s.shape[3],".")}),assert(eitherStridesOrDilationsAreOne(r,o),function(){return"Error in conv3D: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(o,"'")}),assert("NDHWC"===a,function(){return"Error in conv3d: got dataFormat of ".concat(a," but only NDHWC is currently supported.")}),assert(stridesOrDilationsArePositive(o),function(){return"Error in conv3D: Dilated rates should be larger than 0."}),assert(stridesOrDilationsArePositive(r),function(){return"Error in conv3D: Strides should be larger than 0."});var l={x:u,filter:s},d={strides:r,pad:n,dataFormat:a,dilations:o},f=rd.runKernel(H,l,d);return c?rY(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}}),ng=op({conv3DBackpropInput_:/**
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
 */function(e,t,r,n,a){assert(e.length===t.rank,function(){return"Length of inShape "+"(".concat(e.length,") and rank of dy (").concat(t.rank,") must match")});var o=e,i=t,s=!1;4===t.rank&&(s=!0,i=rY(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),o=[1,e[0],e[1],e[2],e[3]]);var u=o[4],c=i.shape[4];assert(5===o.length,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+"".concat(o.length,".")}),assert(5===i.rank,function(){return"Error in conv3dDerInput: dy must be rank 5, but got "+"rank ".concat(i.rank)}),assert(5===r.rank,function(){return"Error in conv3dDerInput: filter must be rank 5, but got "+"rank ".concat(r.rank)}),assert(u===r.shape[3],function(){return"Error in conv3dDerInput: depth of input (".concat(u,") must ")+"match input depth for filter ".concat(r.shape[3],".")}),assert(c===r.shape[4],function(){return"Error in conv3dDerInput: depth of output (".concat(c,") must ")+"match output depth for filter ".concat(r.shape[4],".")});var l={dy:i,filter:r},d={pad:a,strides:n,inputShape:o},f=rd.runKernel(V,l,d);return s?rY(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}}),nv=op({conv3dTranspose_:function(e,t,r,n,a){return ng(r,convertToTensor(e,"x","conv3dTranspose"),convertToTensor(t,"filter","conv3dTranspose"),n,a)}}),nb=op({cos_:/**
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
 */function(e){var t=convertToTensor(e,"x","cos","float32");return rd.runKernel("Cos",{x:t})}}),ny=op({cosh_:/**
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
 */function(e){var t=convertToTensor(e,"x","cosh","float32");return rd.runKernel(U,{x:t})}}),nS=op({cumprod_:/**
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
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"x","cumprod"),o={axis:t,exclusive:r,reverse:n};return rd.runKernel(G,{x:a},o)}}),nP=op({cumsum_:/**
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
 */function(e,t,r,n){void 0===t&&(t=0),void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"x","cumsum"),o={axis:t,exclusive:r,reverse:n};return rd.runKernel(W,{x:a},o)}}),nT=op({denseBincount_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!1);var a=convertToTensor(e,"x","denseBincount"),o=convertToTensor(t,"weights","denseBincount");assert("int32"===a.dtype,function(){return"Error in denseBincount: input "+"dtype must be int32, but got ".concat(a.dtype)}),assert(a.rank<=2,function(){return"Error in denseBincount: input must be at most rank 2, but got "+"rank ".concat(a.rank,".")}),assert(r>=0,function(){return"size must be non-negative, but got ".concat(r,".")}),assert(o.size===a.size||0===o.size,function(){return"Error in denseBincount: weights must have the same shape as x or "+"0-length, but got x shape: ".concat(a.shape,", weights shape: ")+"".concat(o.shape,".")});var i={size:r,binaryOutput:n};return rd.runKernel(q,{x:a,weights:o},i)}}),nx=op({depthToSpace_:/**
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
 */function(e,t,r){void 0===r&&(r="NHWC");var n=convertToTensor(e,"x","depthToSpace","float32"),a="NHWC"===r?n.shape[1]:n.shape[2],o="NHWC"===r?n.shape[2]:n.shape[3],i="NHWC"===r?n.shape[3]:n.shape[1];assert(t>1,function(){return"blockSize should be > 1 for depthToSpace, but was: ".concat(t)}),assert(a*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(a," and ").concat(t,"  for depthToSpace with input shape\n    ").concat(n.shape)}),assert(o*t>=0,function(){return"Negative dimension size caused by overflow when multiplying\n    ".concat(o," and ").concat(t," for depthToSpace with input shape\n        ").concat(n.shape)}),assert(i%(t*t)==0,function(){return"Dimension size must be evenly divisible by ".concat(t*t," but is ").concat(i," for depthToSpace with input shape ").concat(n.shape)});var s={blockSize:t,dataFormat:r};return rd.runKernel(X,{x:n},s)}}),n_=op({depthwiseConv2d_:/**
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
 */function(e,t,r,n,a,o,i){void 0===a&&(a="NHWC"),void 0===o&&(o=[1,1]);var s=convertToTensor(e,"x","depthwiseConv2d","float32"),u=convertToTensor(t,"filter","depthwiseConv2d","float32"),c=s,l=!1;3===s.rank&&(l=!0,c=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),assert(4===c.rank,function(){return"Error in depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(c.rank,".")}),assert(4===u.rank,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+"".concat(u.rank,".")});var d="NHWC"===a?c.shape[3]:c.shape[1];assert(d===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels "+"(".concat(d,") must match the inChannels dimension in ")+"filter ".concat(u.shape[2],".")}),checkPadOnDimRoundingMode("depthwiseConv2d",n,i);var f={x:c,filter:u},p={strides:r,pad:n,dataFormat:a,dilations:o,dimRoundingMode:i},h=rd.runKernel($,f,p);return l?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}}),nA=op({diag_:/**
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
 */function(e){var t=convertToTensor(e,"x","diag");return rd.runKernel(Q,{x:t})}}),nO=op({dilation2d_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a=[1,1]),void 0===o&&(o="NHWC");var i=convertToTensor(e,"x","dilation2d"),s=convertToTensor(t,"filter","dilation2d");assert(3===i.rank||4===i.rank,function(){return"Error in dilation2d: input must be rank 3 or 4, but got rank "+"".concat(i.rank,".")}),assert(3===s.rank,function(){return"Error in dilation2d: filter must be rank 3, but got rank "+"".concat(s.rank,".")}),assert("NHWC"===o,function(){return"Error in dilation2d: Only NHWC is currently supported, "+"but got dataFormat of ".concat(o)});var u=i,c=!1;3===i.rank&&(u=rY(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),assert(u.shape[3]===s.shape[2],function(){return"Error in dilation2d:  input and filter must have the same depth: ".concat(u.shape[3]," vs ").concat(s.shape[2])});var l={x:u,filter:s},d={strides:r,pad:n,dilations:a},f=rd.runKernel(ee,l,d);return c?rY(f,[f.shape[1],f.shape[2],f.shape[3]]):f}});/**
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
 */function getBroadcastDims(e,t){for(var r=e.length,n=[],a=0;a<r;a++){var o=r-1-a,i=e[o]||1;(t[t.length-1-a]||1)>1&&1===i&&n.unshift(o)}return n}function getReductionAxes(e,t){for(var r=[],n=0;n<t.length;n++){var a=e[e.length-n-1],o=t.length-n-1,i=t[o];(null==a||1===a&&i>1)&&r.unshift(o)}return r}function assertAndGetBroadcastShape(e,t){for(var r=Math.max(e.length,t.length),n=Array(r),a=0;a<r;a++){var o=e[e.length-a-1];null==o&&(o=1);var i=t[t.length-a-1];if(null==i&&(i=1),1===o)n[r-a-1]=i;else if(1===i)n[r-a-1]=o;else if(o!==i)throw Error("Operands could not be broadcast together with shapes "+"".concat(e," and ").concat(t,"."));else n[r-a-1]=o}return n}var nw=op({equal_:function(e,t){var r,n=convertToTensor(e,"a","equal","string_or_numeric"),a=convertToTensor(t,"b","equal","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ea,o)}}),nE=op({where_:/**
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
 */function(e,t,r){var n=convertToTensor(t,"a","where"),a=convertToTensor(r,"b","where"),o=convertToTensor(e,"condition","where","bool"),i=assertAndGetBroadcastShape(assertAndGetBroadcastShape(o.shape,n.shape),a.shape),s=na(o,i),u=na(n,i),c=na(a,i);return rd.runKernel(tr,{condition:s,t:u,e:c})}}),nk=op({zerosLike_:/**
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
 */function(e){var t=convertToTensor(e,"x","zerosLike");return rd.runKernel(tC,{x:t})}}),nD=op({divNoNan_:function(e,t){var r,n=convertToTensor(e,"a","div"),a=convertToTensor(t,"b","div"),o=rN(n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1]),i=nk(o);return nE(nw(a,i),i,o)}}),nM=op({dot_:/**
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
 */function(e,t){var r=convertToTensor(e,"t1","dot"),n=convertToTensor(t,"t2","dot");assert((1===r.rank||2===r.rank)&&(1===n.rank||2===n.rank),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")});var a=1===r.rank?r.size:r.shape[1],o=1===n.rank?n.size:n.shape[0];if(assert(a===o,function(){return"Error in dot: inner dimensions of inputs must match, but got "+"".concat(a," and ").concat(o,".")}),1===r.rank&&1===n.rank){var i=rY(r,[1,-1]),s=rY(n,[-1,1]),u=r1(i,s);return rY(u,[])}if(1===r.rank&&2===n.rank){var i=rY(r,[1,-1]),s=rY(n,[n.shape[0],n.shape[1]]),u=r1(i,s);return rY(u,[u.size])}if(2===r.rank&&1===n.rank){var s=rY(n,[-1,1]),u=r1(r,s);return rY(u,[u.size])}var s=rY(n,[n.shape[0],n.shape[1]]),u=r1(r,s);return u}}),nC=op({einsum_:/**
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
 */function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"einsum")});return rd.runKernel(en,n,{equation:e})}}),nj=op({elu_:/**
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
 */function(e){var t=convertToTensor(e,"x","elu","float32");return rd.runKernel("Elu",{x:t})}}),nR=op({ensureShape_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","ensureShape","string_or_numeric");if(!arraysEqualWithNull(r.shape,t))throw Error("EnsureShape: Shape of tensor ".concat(r.shape," is not compatible with expected shape ").concat(t));return e}}),nI=op({erf_:/**
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
 */function(e){var t=convertToTensor(e,"x","erf");assert("int32"===t.dtype||"float32"===t.dtype,function(){return"Input dtype must be `int32` or `float32`."}),"int32"===t.dtype&&(t=rC(t,"float32"));var r={x:t};return rd.runKernel("Erf",r)}});/**
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
 */function axesAreInnerMostDims(e,t){for(var r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0}function combineLocations(e,t,r){for(var n=e.length+t.length,a=[],o=0,i=0,s=0;s<n;s++)-1===r.indexOf(s)?a.push(e[o++]):a.push(t[i++]);return a}function expandShapeToKeepDim(e,t){return combineLocations(e,t.map(function(e){return 1}),t)}var nN=op({max_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","max"),a={reductionIndices:t,keepDims:r};return rd.runKernel("Max",{x:n},a)}}),nL=op({min_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","min"),a={axis:t,keepDims:r};return rd.runKernel("Min",{x:n},a)}}),nB=op({pow_:function(e,t){var r,n=convertToTensor(e,"base","pow"),a=convertToTensor(t,"exp","pow"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Pow",o)}});/**
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
 */function scalar(e,t){if((isTypedArray(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&isTypedArray(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return makeTensor(e,[],[],t)}var nF=op({sqrt_:/**
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
 */function(e){var t=convertToTensor(e,"x","sqrt","float32");return rd.runKernel(tc,{x:t})}}),nz=op({square_:/**
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
 */function(e){var t=convertToTensor(e,"x","square");return rd.runKernel("Square",{x:t},{})}}),nZ=op({sum_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","sum");"bool"===n.dtype&&(n=rC(n,"int32"));var a={x:n},o={axis:t,keepDims:r};return rd.runKernel("Sum",a,o)}}),nH=op({norm_:/**
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
 */function(e,t,r,n){void 0===t&&(t="euclidean"),void 0===r&&(r=null),void 0===n&&(n=!1);var a=function normImpl(e,t,r){if(void 0===r&&(r=null),0===e.rank)return rB(e);if(1!==e.rank&&null===r)return normImpl(rY(e,[-1]),t,r);if(1===e.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===t)return nZ(rB(e),r);if(t===1/0)return nN(rB(e),r);if(t===-1/0)return nL(rB(e),r);if("euclidean"===t||2===t)return nF(nZ(nB(rB(e),scalar(2,"int32")),r));throw Error("Error in norm: invalid ord value: ".concat(t))}if(Array.isArray(r)&&2===r.length){if(1===t)return nN(nZ(rB(e),r[0]),r[1]-1);if(t===1/0)return nN(nZ(rB(e),r[1]),r[0]);if(t===-1/0)return nL(nZ(rB(e),r[1]),r[0]);if("fro"===t||"euclidean"===t)return nF(nZ(nz(e),r));throw Error("Error in norm: invalid ord value: ".concat(t))}throw Error("Error in norm: invalid axis: ".concat(r))}(e=convertToTensor(e,"x","norm"),t,r),o=a.shape;if(n){var i=parseAxisParam(r,e.shape);o=expandShapeToKeepDim(a.shape,i)}return rY(a,o)}}),nV=op({euclideanNorm_:/**
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
 */function(e,t,r){return void 0===t&&(t=null),void 0===r&&(r=!1),nH(e,"euclidean",t,r)}}),nU=op({exp_:/**
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
 */function(e){var t=convertToTensor(e,"x","exp");return rd.runKernel("Exp",{x:t})}}),nG=op({expandDims_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","expandDims","string_or_numeric");assert(t<=r.rank,function(){return"Axis must be <= rank of the tensor"});var n={dim:t};return rd.runKernel(eo,{input:r},n)}}),nW=op({expm1_:/**
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
 */function(e){var t=convertToTensor(e,"x","expm1");return rd.runKernel(ei,{x:t})}}),nK=op({tile_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","tile","string_or_numeric");return assert(r.rank===t.length,function(){return"Error in transpose: rank of input ".concat(r.rank," ")+"must match length of reps ".concat(t,".")}),rd.runKernel(tA,{x:r},{reps:t})}}),nq=op({eye_:/**
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
 */function(e,t,r,n){void 0===n&&(n="float32"),null==t&&(t=e);for(var a=buffer([e,t],n),o=e<=t?e:t,i=0;i<o;++i)a.set(1,i,i);var s=rY(a.toTensor(),[e,t]);if(null==r)return s;if(1===r.length)return nK(nG(s,0),[r[0],1,1]);if(2===r.length)return nK(nG(nG(s,0),0),[r[0],r[1],1,1]);if(3===r.length)return nK(nG(nG(nG(s,0),0),0),[r[0],r[1],r[2],1,1]);throw Error("eye() currently supports only 1D and 2D "+"batchShapes, but received ".concat(r.length,"D."))}}),nX=op({floor_:/**
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
 */function(e){var t=convertToTensor(e,"x","floor","float32");return rd.runKernel(ec,{x:t})}}),n$=op({gather_:/**
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
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=0);var a=convertToTensor(e,"x","gather"),o=convertToTensor(t,"indices","gather","int32"),i={axis:r,batchDims:n};return rd.runKernel(ef,{x:a,indices:o},i)}}),nY=op({greater_:function(e,t){var r,n=convertToTensor(e,"a","greater","string_or_numeric"),a=convertToTensor(t,"b","greater","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eh,o)}}),nJ=op({greaterEqual_:function(e,t){var r,n=convertToTensor(e,"a","greaterEqual","string_or_numeric"),a=convertToTensor(t,"b","greaterEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(em,o)}}),nQ=op({imag_:/**
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
 */function(e){var t=convertToTensor(e,"input","imag");return rd.runKernel(eb,{input:t})}}),n0=op({isFinite_:/**
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
 */function(e){var t=convertToTensor(e,"x","isFinite");return rd.runKernel(ey,{x:t})}}),n1=op({isInf_:/**
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
 */function(e){var t=convertToTensor(e,"x","isInf");return rd.runKernel(eS,{x:t})}}),n2=op({isNaN_:/**
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
 */function(e){var t=convertToTensor(e,"x","isNaN");return rd.runKernel(eP,{x:t})}}),n3=op({leakyRelu_:/**
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
 */function(e,t){void 0===t&&(t=.2);var r=convertToTensor(e,"x","leakyRelu"),n={alpha:t};return rd.runKernel(eT,{x:r},n)}}),n4=op({less_:function(e,t){var r,n=convertToTensor(e,"a","less","string_or_numeric"),a=convertToTensor(t,"b","less","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(ex,o)}}),n6=op({lessEqual_:function(e,t){var r,n=convertToTensor(e,"a","lessEqual","string_or_numeric"),a=convertToTensor(t,"b","lessEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(e_,o)}}),n5=op({localResponseNormalization_:/**
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
 */function(e){var t=convertToTensor(e,"x","log1p");return rd.runKernel(eO,{x:t})}});function variableGrads(e,t){assert(isFunction(e),function(){return"The f passed in variableGrads(f) must be a function"}),assert(null==t||Array.isArray(t)&&t.every(function(e){return e instanceof rs}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var r=null!=t;if(!r)for(var n in t=[],rd.registeredVariables)t.push(rd.registeredVariables[n]);var a=r?t.filter(function(e){return!e.trainable}):null,o=t.length;assert((t=t.filter(function(e){return e.trainable})).length>0,function(){return"variableGrads() expects at least one of the input variables to "+"be trainable, but none of the ".concat(o," variables is ")+"trainable."});var i=rd.gradients(e,t,null,!0),s=i.value,u=i.grads;assert(u.some(function(e){return null!=e}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),assert(0===s.rank,function(){return"The f passed in variableGrads(f) must return a scalar, but it "+"returned a rank-".concat(s.rank," tensor")});var c={};return t.forEach(function(e,t){null!=u[t]&&(c[e.name]=u[t])}),null!=a&&a.forEach(function(e){return c[e.name]=null}),{value:s,grads:c}}function customGrad(e){return rd.customGrad(e)}function checkGrads(e){if(e.filter(function(e){return null==e}).length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")}var n9=op({neg_:/**
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
 */function(e){var t=convertToTensor(e,"x","logSigmoid");return customGrad(function(e){return{value:n9(ae(n9(e))),gradFunc:function(t){return rL(t,r2(n9(e)))}}})(t)}}),ar=op({sub_:function(e,t){var r,n=convertToTensor(e,"a","sub"),a=convertToTensor(t,"b","sub"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Sub",o)}}),an=op({logSoftmax_:function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","logSoftmax");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and axis was ").concat(t));return customGrad(function(e,r){var n=nN(e,t,!0),a=ar(e,n),o=ar(rC(a,"float32"),n7(nZ(nU(a),t,!0)));return r([o]),{value:o,gradFunc:function(e,r){var n=nU(__read(r,1)[0]);return ar(e,rL(nZ(e,t,!0),n))}}})(r)}}),aa=op({logSumExp_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","logSumExp"),a=parseAxisParam(t,n.shape),o=nN(n,a,!0),i=n7(nZ(nU(ar(n,o)),a)),s=rR(rY(o,i.shape),i);if(r){var u=expandShapeToKeepDim(s.shape,a);return rY(s,u)}return s}}),ao=op({logicalAnd_:/**
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
 */function(e,t){var r=convertToTensor(e,"a","logicalAnd","bool"),n=convertToTensor(t,"b","logicalAnd","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(ew,{a:r,b:n})}}),ai=op({logicalNot_:/**
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
 */function(e){var t=convertToTensor(e,"x","logicalNot","bool");return rd.runKernel(eE,{x:t})}}),as=op({logicalOr_:/**
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
 */function(e,t){var r=convertToTensor(e,"a","logicalOr","bool"),n=convertToTensor(t,"b","logicalOr","bool");return assertAndGetBroadcastShape(r.shape,n.shape),rd.runKernel(ek,{a:r,b:n})}}),au=op({logicalXor_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"x","maxPool"),i=o,s=!1;3===o.rank&&(s=!0,i=rY(o,[1,o.shape[0],o.shape[1],o.shape[2]])),assert(4===i.rank,function(){return"Error in maxPool: input must be rank 4 but got rank ".concat(i.rank,".")}),assert(eitherStridesOrDilationsAreOne(r,1),function(){return"Error in maxPool: Either strides or dilations must be 1. "+"Got strides ".concat(r," and dilations '").concat(1,"'")}),checkPadOnDimRoundingMode("maxPool",n,a);var u={x:i},c=rd.runKernel(eM,u,{filterSize:t,strides:r,pad:n,dimRoundingMode:a});return s?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),ad=op({maxPool3d_:/**
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
 */function(e,t,r,n,a,o){void 0===t&&(t=[1,1,1]),void 0===o&&(o="NDHWC");var i=convertToTensor(e,"x","maxPool3d"),s=i,u=!1;4===i.rank&&(u=!0,s=rY(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),assert(5===s.rank,function(){return"Error in maxPool3d: x must be rank 5 but got rank ".concat(s.rank,".")}),assert("NDHWC"===o,function(){return"Error in maxPool3d: Only NDHWC is currently supported, "+"but got dataFormat of ".concat(o)}),checkPadOnDimRoundingMode("maxPool3d",n,a);var c={x:s},l={filterSize:t,strides:r,pad:n,dimRoundingMode:a,dataFormat:o},d=rd.runKernel(eC,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}}),af=op({maxPoolWithArgmax_:/**
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
 */function(e,t,r,n,a){void 0===a&&(a=!1);var o=convertToTensor(e,"x","maxPoolWithArgmax"),i={filterSize:t,strides:r,pad:n,includeBatchInIndex:a},s=rd.runKernel(ej,{x:o},i);return{result:s[0],indexes:s[1]}}}),ap=op({maximum_:function(e,t){var r,n=convertToTensor(e,"a","maximum"),a=convertToTensor(t,"b","maximum");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"bool"===n.dtype&&(n=rC(n,"int32"),a=rC(a,"int32")),assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eD,o)}}),ah=op({mean_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","mean"),a={axis:t,keepDims:r};return rd.runKernel(eR,{x:n},a)}});/**
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
 */function zeros(e,t){if(void 0===t&&(t="float32"),assertNonNegativeIntegerDimensions(e),"complex64"===t)return rh(zeros(e,"float32"),zeros(e,"float32"));var r=makeZerosTypedArray(sizeFromShape(e),t);return rd.makeTensor(r,e,t)}/**
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
 */function ones(e,t){if(void 0===t&&(t="float32"),assertNonNegativeIntegerDimensions(e),"complex64"===t)return rh(ones(e,"float32"),zeros(e,"float32"));var r=makeOnesTypedArray(sizeFromShape(e),t);return rd.makeTensor(r,e,t)}var am=op({minimum_:function(e,t){var r,n=convertToTensor(e,"a","minimum"),a=convertToTensor(t,"b","minimum");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],"bool"===n.dtype&&(n=rC(n,"int32"),a=rC(a,"int32")),assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eI,o)}}),ag=op({mirrorPad_:/**
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
 */function(e,t,r){assert("reflect"===r||"symmetric"===r,function(){return"Invalid mode. Mode must be either reflect or symmetric. "+"Got ".concat(r,".")});var n=convertToTensor(e,"x","mirrorPad");if(0===n.rank)throw Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");assert(t.length===n.rank,function(){return"Padding doesn't match input. Must be ".concat(n.rank,". ")+"Got ".concat(t.length,".")});for(var a="reflect"===r?1:0,_loop_1=function(e){assert(2===t[e].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),assert(t[e][0]>=0&&t[e][0]<=n.shape[e]-a&&t[e][1]>=0&&t[e][1]<=n.shape[e]-a,function(){return"Padding in dimension ".concat(e," cannot be greater than or equal ")+"to ".concat(n.shape[e]-a," or less than 0 for input of ")+"shape ".concat(n.shape)})},o=0;o<n.rank;o++)_loop_1(o);return rd.runKernel(eN,{x:n},{paddings:t,mode:r})}}),av=op({mod_:function(e,t){var r,n=convertToTensor(e,"a","mod"),a=convertToTensor(t,"b","mod"),o={a:n=(r=__read(makeTypesMatch(n,a),2))[0],b:a=r[1]};return rd.runKernel("Mod",o)}}),ab=op({moments_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=parseAxisParam(t,(e=convertToTensor(e,"x","moments")).shape),a=ah(e,n,r),o=a.shape;r||(o=expandShapeToKeepDim(a.shape,n));var i=ah(nz(ar(rC(e,"float32"),rY(a,o))),n,r);return{mean:a,variance:i}}}),ay=op({multiRNNCell_:function(e,t,r,n){for(var a=convertToTensor(t,"data","multiRNNCell"),o=convertToTensorArray(r,"c","multiRNNCell"),i=convertToTensorArray(n,"h","multiRNNCell"),s=a,u=[],c=0;c<e.length;c++){var l=e[c](s,o[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}for(var d=[],f=[],c=0;c<u.length;c+=2)d.push(u[c]),f.push(u[c+1]);return[d,f]}}),aS=op({multinomial_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!1);var a=convertToTensor(e,"logits","multinomial"),o=a.size,i=a.rank;if(o<2)throw Error("Error in multinomial: you need at least 2 outcomes, but got "+"".concat(o,"."));if(i>2)throw Error("Rank of probabilities must be 1 or 2, but is ".concat(i));r=r||Math.random();var s=1===i?rY(a,[1,-1]):a,u={numSamples:t,seed:r,normalized:n},c=rd.runKernel(eL,{logits:s},u);return 1===i?rY(c,[c.size]):c}}),aP=op({notEqual_:function(e,t){var r,n=convertToTensor(e,"a","notEqual","string_or_numeric"),a=convertToTensor(t,"b","notEqual","string_or_numeric");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(eF,o)}}),aT=op({oneHot_:/**
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
 */function(e,t,r,n,a){if(void 0===r&&(r=1),void 0===n&&(n=0),void 0===a&&(a="int32"),t<2)throw Error("Error in oneHot: depth must be >=2, but it is ".concat(t));var o=convertToTensor(e,"indices","oneHot","int32"),i={dtype:a,depth:t,onValue:r,offValue:n};return rd.runKernel(eU,{indices:o},i)}}),ax=op({onesLike_:/**
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
 */function(e){var t=convertToTensor(e,"x","onesLike");return rd.runKernel(eV,{x:t})}}),a_=op({outerProduct_:function(e,t){var r=convertToTensor(e,"v1","outerProduct"),n=convertToTensor(t,"v2","outerProduct");return assert(1===r.rank&&1===n.rank,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+"".concat(r.rank," and ").concat(n.rank,".")}),r1(rY(r,[-1,1]),rY(n,[1,-1]))}}),aA=op({pad_:/**
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
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","pad");if(0===n.rank)throw Error("pad(scalar) is not defined. Pass non-scalar to pad");var a={paddings:t,constantValue:r};return rd.runKernel(eW,{x:n},a)}}),aO=op({pad1d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length,function(){return"Invalid number of paddings. Must be length of 2."}),aA(e,[t],r)}}),aw=op({pad2d_:function(e,t,r){return void 0===r&&(r=0),assert(2===t.length&&2===t[0].length&&2===t[1].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aA(e,t,r)}}),aE=op({pad3d_:function(e,t,r){return void 0===r&&(r=0),assert(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aA(e,t,r)}}),ak=op({pad4d_:function(e,t,r){return void 0===r&&(r=0),assert(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,function(){return"Invalid number of paddings. Must be length of 2 each."}),aA(e,t,r)}}),aD=op({spaceToBatchND_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","spaceToBatchND");return assert(n.rank>=1+t.length,function(){return"input rank ".concat(n.rank," should be > than [blockShape] ").concat(t.length)}),assert(r.length===t.length,function(){return"paddings.shape[0] ".concat(r.length," must be equal to [blockShape] ").concat(t.length)}),assert(n.shape.reduce(function(e,n,a){return a>0&&a<=t.length?e&&(n+r[a-1][0]+r[a-1][1])%t[a-1]==0:e},!0),function(){return"input spatial dimensions ".concat(n.shape.slice(1)," with paddings ").concat(r.toString()," must be divisible by blockShapes ").concat(t.toString())}),rd.runKernel(tl,{x:n},{blockShape:t,paddings:r})}}),aM=op({pool_:function(e,t,r,n,a,o,i){null==a&&(a=[1,1]),null==o&&(o=1),0===n&&(n="valid");var s,u,c,l,d,f,p,h,m,g,v=convertToTensor(e,"x","maxPool"),b=v,y=!1;3===v.rank&&(y=!0,b=rY(v,[1,v.shape[0],v.shape[1],v.shape[2]])),assert(eitherStridesOrDilationsAreOne(o,a),function(){return"Error in pool: Either strides or dilations must be 1. "+"Got strides ".concat(o," and dilations '").concat(a,"'")});var S=computePool2DInfo(b.shape,t,o,a,n),P=[S.dilationHeight,S.dilationWidth];g="same"===n?(u=(s=[S.filterHeight,S.filterWidth].map(function(e,t){return e+(e-1)*(P[t]-1)}).map(function(e){return e-1})).map(function(e){return Math.floor(e/2)}),c=s.map(function(e,t){return e-u[t]}),s.map(function(e,t){return[u[t],c[t]]})):[[0,0],[0,0]];var T=1===P[0]&&1===P[1],x=__read((l=[S.inHeight,S.inWidth],d=g.map(function(e){return e[0]}),p=l.concat(d,f=g.map(function(e){return e[1]})),h=P.map(function(e,t){return(e-p[t]%e)%e}),m=f.map(function(e,t){return e+h[t]}),[P.map(function(e,t){return[d[t],m[t]]}),P.map(function(e,t){return[0,h[t]]})]),2),_=x[0],A=x[1],O=T?n:"valid",w=T?b:aD(b,P,_),E=("avg"===r?function(){return rJ(w,t,o,O,i)}:function(){return al(w,t,o,O,i)})(),k=T?E:r5(E,P,A);return y?rY(k,[k.shape[1],k.shape[2],k.shape[3]]):k}}),aC=op({prelu_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","prelu"),n=convertToTensor(t,"alpha","prelu");return rd.runKernel(eK,{x:r,alpha:n})}}),aj=op({prod_:/**
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
 */function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=!1);var n=convertToTensor(e,"x","prod");"bool"===n.dtype&&(n=rC(n,"int32"));var a={x:n},o={axis:t,keepDims:r};return rd.runKernel(eq,a,o)}}),aR=op({raggedGather_:/**
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
 */function(e,t,r,n){var a=e.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedGather","int32")}),o=convertToTensor(t,"paramsDenseValues","raggedGather"),i=convertToTensor(r,"indices","raggedGather","int32"),s=rd.runKernel(eX,{paramsNestedSplits:a,paramsDenseValues:o,indices:i},{outputRaggedRank:n});return{outputNestedSplits:s.slice(0,s.length-1),outputDenseValues:s[s.length-1]}}}),aI=op({raggedRange_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"starts","raggedRange"),a=convertToTensor(t,"limits","raggedRange",n.dtype),o=convertToTensor(r,"deltas","raggedRange",n.dtype),i=rd.runKernel(e$,{starts:n,limits:a,deltas:o});return{rtNestedSplits:i[0],rtDenseValues:i[1]}}}),aN=op({raggedTensorToTensor_:/**
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
 */function(e,t,r,n,a){var o=convertToTensor(e,"shape","raggedTensorToTensor","int32"),i=convertToTensor(t,"values","raggedTensorToTensor"),s=convertToTensor(r,"defaultValue","raggedTensorToTensor",i.dtype),u=n.map(function(e,t){return convertToTensor(e,"tensors".concat(t),"raggedTensorToTensor","int32")});return rd.runKernel(eY,{shape:o,values:i,defaultValue:s,rowPartitionTensors:u},{rowPartitionTypes:a})}}),aL=op({rand_:/**
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
 */function(e,t,r){assertNonNegativeIntegerDimensions(e);var n=sizeFromShape(e),a=null;if(null==r||"float32"===r)a=new Float32Array(n);else if("int32"===r)a=new Int32Array(n);else if("bool"===r)a=new Uint8Array(n);else throw Error("Unknown data type ".concat(r));for(var o=0;o<n;o++)a[o]=t();return rd.makeTensor(a,e,r)}}),aB={exports:{}};!function(e,t,r){function Alea(e){var t,r=this,n=(t=4022871197,function(e){e=String(e);for(var r=0;r<e.length;r++){var n=.02519603282416938*(t+=e.charCodeAt(r));t=n>>>0,n-=t,n*=t,t=n>>>0,n-=t,t+=4294967296*n}return(t>>>0)*23283064365386963e-26});r.next=function(){var e=2091639*r.s0+23283064365386963e-26*r.c;return r.s0=r.s1,r.s1=r.s2,r.s2=e-(r.c=0|e)},r.c=1,r.s0=n(" "),r.s1=n(" "),r.s2=n(" "),r.s0-=n(e),r.s0<0&&(r.s0+=1),r.s1-=n(e),r.s1<0&&(r.s1+=1),r.s2-=n(e),r.s2<0&&(r.s2+=1)}function copy(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function impl(e,t){var r=new Alea(e),n=t&&t.state,a=r.next;return a.int32=function(){return 4294967296*r.next()|0},a.double=function(){return a()+(2097152*a()|0)*11102230246251565e-32},a.quick=a,n&&("object"==typeof n&&copy(n,r),a.state=function(){return copy(r,{})}),a}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.alea=impl}(0,aB,!1);var aF=aB.exports,az={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor128=impl}(0,az,!1);var aZ=az.exports,aH={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:r+=e;for(var n=0;n<r.length+64;n++)t.x^=0|r.charCodeAt(n),n==r.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorwow=impl}(0,aH,!1);var aV=aH.exports,aU={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.x,a=t.i;return e=n[a],e^=e>>>7,r=e^e<<24^((e=n[a+1&7])^e>>>10)^((e=n[a+3&7])^e>>>3)^((e=n[a+4&7])^e<<7),e=n[a+7&7],e^=e<<13,r^=e^e<<9,n[a]=r,t.i=a+1&7,r},function(e,t){var r,n=[];if(t===(0|t))n[0]=t;else for(r=0,t=""+t;r<t.length;++r)n[7&r]=n[7&r]<<15^t.charCodeAt(r)+n[r+1&7]<<13;for(;n.length<8;)n.push(0);for(r=0;r<8&&0===n[r];++r);for(8==r?n[7]=-1:n[r],e.x=n,e.i=0,r=256;r>0;--r)e.next()}(t,e)}function copy(e,t){return t.x=e.x.slice(),t.i=e.i,t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.x&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xorshift7=impl}(0,aU,!1);var aG=aU.exports,aW={exports:{}};!function(e,t,r){function XorGen(e){var t=this;t.next=function(){var e,r,n=t.w,a=t.X,o=t.i;return t.w=n=n+1640531527|0,r=a[o+34&127],e=a[o=o+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,r=a[o]=r^e,t.i=o,r+(n^n>>>16)|0},function(e,t){var r,n,a,o,i,s=[],u=128;for(t===(0|t)?(n=t,t=null):(t+="\x00",n=0,u=Math.max(u,t.length)),a=0,o=-32;o<u;++o)t&&(n^=t.charCodeAt((o+32)%t.length)),0===o&&(i=n),n^=n<<10,n^=n>>>15,n^=n<<4,n^=n>>>13,o>=0&&(i=i+1640531527|0,a=0==(r=s[127&o]^=n+i)?a+1:0);for(a>=128&&(s[127&(t&&t.length||0)]=-1),a=127,o=512;o>0;--o)n=s[a+34&127],r=s[a=a+1&127],n^=n<<13,r^=r<<17,n^=n>>>15,r^=r>>>12,s[a]=n^r;e.w=i,e.X=s,e.i=a}(t,e)}function copy(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function impl(e,t){null==e&&(e=+new Date);var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&(n.X&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.xor4096=impl}(0,aW,!1);var aK=aW.exports,aq={exports:{}};!function(e,t,r){function XorGen(e){var t=this,r="";t.next=function(){var e=t.b,r=t.c,n=t.d,a=t.a;return e=e<<25^e>>>7^r,r=r-n|0,n=n<<24^n>>>8^a,a=a-e|0,t.b=e=e<<20^e>>>12^r,t.c=r=r-n|0,t.d=n<<16^r>>>16^a,t.a=a-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):r+=e;for(var n=0;n<r.length+20;n++)t.b^=0|r.charCodeAt(n),t.next()}function copy(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function impl(e,t){var r=new XorGen(e),n=t&&t.state,prng=function(){return(r.next()>>>0)/4294967296};return prng.double=function(){do var e=((r.next()>>>11)+(r.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=r.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,r),prng.state=function(){return copy(r,{})}),prng}t&&t.exports?t.exports=impl:r&&r.amd?r(function(){return impl}):this.tychei=impl}(0,aq,!1);var aX=aq.exports,a$={exports:{}};!function(e){!function(t,n,a){var o,i="random",s=a.pow(256,6),u=a.pow(2,52),c=2*u;function seedrandom(e,r,l){var d=[],f=mixkey(function flatten(e,t){var r,n=[],a=typeof e;if(t&&"object"==a)for(r in e)try{n.push(flatten(e[r],t-1))}catch(e){}return n.length?n:"string"==a?e:e+"\x00"}((r=!0==r?{entropy:!0}:r||{}).entropy?[e,tostring(n)]:null==e?function(){try{var e;return o&&(e=o.randomBytes)?e=e(256):(e=new Uint8Array(256),(t.crypto||t.msCrypto).getRandomValues(e)),tostring(e)}catch(e){var r=t.navigator,a=r&&r.plugins;return[+new Date,t,a,t.screen,tostring(n)]}}():e,3),d),p=new ARC4(d),prng=function(){for(var e=p.g(6),t=s,r=0;e<u;)e=(e+r)*256,t*=256,r=p.g(1);for(;e>=c;)e/=2,t/=2,r>>>=1;return(e+r)/t};return prng.int32=function(){return 0|p.g(4)},prng.quick=function(){return p.g(4)/4294967296},prng.double=prng,mixkey(tostring(p.S),n),(r.pass||l||function(e,t,r,n){return(n&&(n.S&&copy(n,p),e.state=function(){return copy(p,{})}),r)?(a[i]=e,t):e})(prng,f,"global"in r?r.global:this==a,r.state)}function ARC4(e){var t,r=e.length,n=this,a=0,o=n.i=n.j=0,i=n.S=[];for(r||(e=[r++]);a<256;)i[a]=a++;for(a=0;a<256;a++)i[a]=i[o=255&o+e[a%r]+(t=i[a])],i[o]=t;(n.g=function(e){for(var t,r=0,a=n.i,o=n.j,i=n.S;e--;)t=i[a=255&a+1],r=256*r+i[255&(i[a]=i[o=255&o+t])+(i[o]=t)];return n.i=a,n.j=o,r})(256)}function copy(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function mixkey(e,t){for(var r,n=e+"",a=0;a<n.length;)t[255&a]=255&(r^=19*t[255&a])+n.charCodeAt(a++);return tostring(t)}function tostring(e){return String.fromCharCode.apply(0,e)}if(mixkey(a.random(),n),e.exports){e.exports=seedrandom;try{o=r(6113)}catch(e){}}else a["seed"+i]=seedrandom}("undefined"!=typeof self?self:tZ,[],Math)}(a$);var aY=a$.exports;function testEpsilon(){return 32===rd.backend.floatPrecision()?.001:.1}function expectArraysPredicate(e,t,r){var n=!0;if((isTypedArray(e)||isTypedArray(t))&&(n=!1),isTypedArray(e)&&isTypedArray(t)&&(n=!0),n){var a=e.constructor.name,o=t.constructor.name;if(a!==o)throw Error("Arrays are of different type. Actual: ".concat(a,". ")+"Expected: ".concat(o))}if(Array.isArray(e)&&Array.isArray(t)){var i=inferShape(e),s=inferShape(t);if(!arraysEqual(i,s))throw Error("Arrays have different shapes. "+"Actual: [".concat(i,"]. Expected: [").concat(s,"]"))}var u=isTypedArray(e)?e:flatten(e),c=isTypedArray(t)?t:flatten(t);if(u.length!==c.length)throw Error("Arrays have different lengths actual: ".concat(u.length," vs ")+"expected: ".concat(c.length,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."));for(var l=0;l<c.length;++l){var d=u[l],f=c[l];if(!r(d,f))throw Error("Arrays differ: actual[".concat(l,"] = ").concat(d,", expected[").concat(l,"] = ").concat(f,".\n")+"Actual:   ".concat(u,".\n")+"Expected: ".concat(c,"."))}"undefined"!=typeof expect&&expect().nothing()}function areClose(e,t,r){return!(isFinite(e)||isFinite(t))||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>r)}aY.alea=aF,aY.xor128=aZ,aY.xorwow=aV,aY.xorshift7=aG,aY.xor4096=aK,aY.tychei=aX;/**
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
 */var aJ=function(){function MPRandGauss(e,t,r,n,a){this.mean=e,this.stdDev=t,this.dtype=r,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var o=a||Math.random();this.random=aY.alea(o.toString())}return MPRandGauss.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var e,t,r=this.nextVal;return this.nextVal=NaN,r}for(var n=!1;!n;){var a=void 0,o=void 0,i=void 0;do i=(a=2*this.random()-1)*a+(o=2*this.random()-1)*o;while(i>=1||0===i);var s=Math.sqrt(-2*Math.log(i)/i);e=this.mean+this.stdDev*a*s,t=this.mean+this.stdDev*o*s,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)},MPRandGauss.prototype.convertValue=function(e){return null==this.dtype||"float32"===this.dtype?e:Math.round(e)},MPRandGauss.prototype.isValidTruncated=function(e){return e<=this.upper&&e>=this.lower},MPRandGauss}(),aQ=function(){function RandGamma(e,t,r,n){this.alpha=e,this.beta=1/t,this.dtype=r;var a=n||Math.random();this.randu=aY.alea(a.toString()),this.randn=new aJ(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}return RandGamma.prototype.nextValue=function(){for(var e,t,r,n,a,o;;){do n=this.randn.nextValue(),o=1+this.c*n;while(o<=0);if(o*=o*o,t=1-.331*(e=n*n)*e,r=.5*e+this.d*(1-o+Math.log(o)),(a=this.randu())<t||Math.log(a)<r)break}return o=1/this.beta*this.d*o,this.alpha<1&&(o*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(o)},RandGamma.prototype.convertValue=function(e){return"float32"===this.dtype?e:Math.round(e)},RandGamma}(),a0=function(){function UniformRandom(e,t,r,n){void 0===e&&(e=0),void 0===t&&(t=1);var a=this;if(this.canReturnFloat=function(){return null==a.dtype||"float32"===a.dtype},this.min=e,this.range=t-e,this.dtype=r,null==n&&(n=Math.random()),"number"==typeof n&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw Error("The difference between ".concat(e," - ").concat(t," <= 1 and dtype is not float"));this.random=aY.alea(n)}return UniformRandom.prototype.convertValue=function(e){return this.canReturnFloat()?e:Math.round(e)},UniformRandom.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},UniformRandom}(),a1=op({randomGamma_:/**
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
 */function(e,t,r,n,a){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type ".concat(n));for(var o=new aJ(t,r,n,!1,a),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),a3=op({randomStandardNormal_:/**
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
 */function range(e,t,r,n){if(void 0===r&&(r=1),void 0===n&&(n="float32"),0===r)throw Error("Cannot have a step of zero");var a={start:e,stop:t,step:r,dtype:n};return rd.runKernel(eJ,{},a)}var a5=op({real_:/**
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
 */function(e){var t=convertToTensor(e,"x","selu");return rd.runKernel(tn,{x:t})}}),ou=op({separableConv2d_:function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]),void 0===i&&(i="NHWC");var s=convertToTensor(e,"x","separableConv2d"),u=convertToTensor(t,"depthwiseFilter","separableConv2d"),c=convertToTensor(r,"pointwiseFilter","separableConv2d"),l=s,d=!1;if(3===s.rank&&(d=!0,l=rY(s,[1,s.shape[0],s.shape[1],s.shape[2]])),"NCHW"===i)throw Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");assert(4===l.rank,function(){return"Error in separableConv2d: input must be rank 4, but got "+"rank ".concat(l.rank,".")}),assert(4===u.rank,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(4===c.rank,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but "+"got rank ".concat(u.rank,".")}),assert(1===c.shape[0],function(){return"Error in separableConv2d: the first dimension of pointwise filter "+" must be 1, but got ".concat(c.shape[0],".")}),assert(1===c.shape[1],function(){return"Error in separableConv2d: the second dimension of pointwise "+"filter must be 1, but got ".concat(c.shape[1],".")});var f=u.shape[2],p=u.shape[3];assert(c.shape[2]===f*p,function(){return"Error in separableConv2d: the third dimension of pointwise filter "+"must be ".concat(f*p,", ")+"but got ".concat(c.shape[2],".")});var h=nd(n_(l,u,n,a,i,o),c,1,"valid",i);return d?rY(h,[h.shape[1],h.shape[2],h.shape[3]]):h}}),oc=op({sign_:/**
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
 */function(e){var t=convertToTensor(e,"x","sinh");return rd.runKernel(to,{x:t})}}),of=op({slice1d_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","slice1d");return assert(1===n.rank,function(){return"slice1d expects a rank-1 tensor, but got a rank-".concat(n.rank," tensor")}),r3(n,[t],[r])}}),oh=op({slice2d_:/**
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
 */function(e,t){void 0===t&&(t=-1);var r=convertToTensor(e,"logits","softmax","float32");if(-1===t&&(t=r.rank-1),t!==r.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. "+"Logits was rank ".concat(r.rank," and dim was ").concat(t));var n={dim:t};return rd.runKernel(tf,{logits:r},n)}}),ob=op({fft_:/**
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
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.fft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel("FFT",{input:e})}}),oy=op({ifft_:/**
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
 */function(e){return assert("complex64"===e.dtype,function(){return"The dtype for tf.spectral.ifft() must be complex64 "+"but got ".concat(e.dtype,".")}),rd.runKernel(ev,{input:e})}}),oS=op({irfft_:/**
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
 */function(e){var t,r=e.shape[e.shape.length-1],n=e.size/r;if(r<=2){var a=rY(e,[n,r]);t=oy(a)}else{var o=[n,2*(r-1)],i=rY(a5(e),[n,r]),s=rY(nQ(e),[n,r]),u=oe(r3(i,[0,1],[n,r-2]),1),c=rL(oe(r3(s,[0,1],[n,r-2]),1),scalar(-1)),a=rY(rh(r0([i,u],1),r0([s,c],1)),[o[0],o[1]]);t=oy(a)}if(t=a5(t),3===e.rank&&0!==e.shape[0]){var l=t,d=e.shape[0];t=rY(t,[d,t.shape[0]/d,t.shape[1]]),l.dispose()}return t}}),oP=op({split_:/**
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
 */function(e,t,r){void 0===r&&(r=0);var n=convertToTensor(e,"x","split"),a={numOrSizeSplits:t,axis:r};return rd.runKernel(td,{x:n},a)}}),oT=op({rfft_:/**
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
 */function(e,t){assert("float32"===e.dtype,function(){return"The dtype for rfft() must be real value but got ".concat(e.dtype)});var r,n=e.shape[e.shape.length-1],a=e.size/n;if(null!=t&&t<n){var o=e.shape.map(function(e){return 0}),i=e.shape.map(function(e){return e});i[e.shape.length-1]=t,r=r3(e,o,i),n=t}else if(null!=t&&t>n){var s=e.shape.map(function(e){return e});s[e.shape.length-1]=t-n,r=r0([e,zeros(s)],e.shape.length-1),n=t}else r=e;var u=nk(r),c=ob(rY(rh(r,u),[a,n])),l=Math.floor(n/2)+1,d=a5(c),f=nQ(c),p=oP(d,[l,n-l],d.shape.length-1),h=oP(f,[l,n-l],f.shape.length-1),m=r.shape.slice();return m[r.shape.length-1]=l,rY(rh(p[0],h[0]),m)}}),ox=op({squaredDifference_:function(e,t){var r,n=convertToTensor(e,"a","squaredDifference"),a=convertToTensor(t,"b","squaredDifference");n=(r=__read(makeTypesMatch(n,a),2))[0],a=r[1],assertAndGetBroadcastShape(n.shape,a.shape);var o={a:n,b:a};return rd.runKernel(tb,o,{})}}),o_=op({squeeze_:/**
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
 */function(e,t){var r=convertToTensor(e,"x","squeeze","string_or_numeric");return rY(r,squeezeShape(r.shape,t).newShape)}}),oA=op({stack_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensorArray(e,"tensors","stack","string_or_numeric");assert(r.length>=1,function(){return"Pass at least one tensor to tf.stack"}),r.length>0&&assert(t<=r[0].rank,function(){return"Axis must be <= rank of the tensor"});var n={axis:t};return rd.runKernel(eG,r,n)}}),oO=op({step_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","step"),n={alpha:t};return rd.runKernel(tj,{x:r},n)}}),ow=op({stridedSlice_:/**
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
 */function(e,t,r,n,a,o,i,s,u){void 0===a&&(a=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===s&&(s=0),void 0===u&&(u=0);var c=convertToTensor(e,"x","stridedSlice","string_or_numeric"),l={begin:t,end:r,strides:n,beginMask:a,endMask:o,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u};return rd.runKernel(tS,{x:c},l)}}),oE=op({tan_:/**
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
 */function tensor3d(e,t,r){if(assertNonNull(e),null!=t&&3!==t.length)throw Error("tensor3d() requires shape to have three numbers");var n=inferShape(e,r);if(3!==n.length&&1!==n.length)throw Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t,n,r)}function validateUpdateShape(e,t,r){var n=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,o="Must have updates.shape = indices.shape[:batchDim] + "+"shape[sliceDim:], got updates.shape: ".concat(r.shape)+", indices.shape: ".concat(t.shape,", shape: ").concat(e)+", sliceDim: ".concat(n,", and batchDim: ").concat(a,".");if(r.rank<a)throw Error(o+" update.rank < ".concat(a,". "));if(e.length<n+(r.rank-a))throw Error(o+" Output shape length < ".concat(n+(r.rank-a)));if(r.rank!==a+e.length-n)throw Error(o+" update.rank != ".concat(a+e.length-n));for(var i=0;i<a;++i)if(r.shape[i]!==t.shape[i])throw Error(o+" updates.shape[".concat(i,"] (").concat(r.shape[i],") != indices.shape[").concat(i,"] (").concat(t.shape[i],")."));for(var i=0;i<r.rank-a;++i)if(r.shape[i+a]!==e[i+n])throw Error(o+" updates.shape[".concat(i+a,"] (").concat(r.shape[i+a],") != shape[").concat(i+a,"] (").concat(e[i+a],")"))}function validateInput$1(e,t,r){if(t.rank<1)throw Error("tf.scatterND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(t.rank,"."));if(e.rank<1)throw Error("tf.scatterND() expects the updates to be rank 1 or higher,"+" but the rank was ".concat(e.rank,"."));if("int32"!==t.dtype)throw Error("The dtype of 'indices' should be int32, but got dtype: ".concat(t.dtype));if(r.length<1)throw Error("Output rank must be greater or equal to 1, but got shape: ".concat(r));if(0===r.length){if(0===t.size)throw Error("Indices specified for empty output. indices shape: ".concat(t.shape));if(0===e.size)throw Error("Updates specified for empty output. updates shape: ".concat(e.shape))}validateUpdateShape(r,t,e)}function calculateShapes(e,t,r){for(var n=t.shape.length,a=n>1?t.shape[n-1]:1,o=r.length,i=1,s=a;s<o;++s)i*=r[s];var u=a<1?1:a,c=sizeFromShape(t.shape)/u,l=__spreadArray(__spreadArray([],__read(computeStrides(r.slice(0,a))),!1),[1],!1);return{sliceRank:a,numUpdates:c,sliceSize:i,strides:l,outputSize:sizeFromShape(r)}}var ok=op({tensorScatterUpdate_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"tensor","tensorScatterupdate"),a=convertToTensor(t,"indices","tensorScatterupdate","int32"),o=convertToTensor(r,"updates","tensorScatterupdate");if(validateInput$1(o,a,n.shape),n.dtype!==o.dtype)throw Error("tensor and updates must have the same dtype, instead they are ".concat(n.dtype," and ").concat(o.dtype,"."));return rd.runKernel(te,{tensor:n,indices:a,updates:o},{})}}),oD=op({topk_:function(e,t,r){void 0===t&&(t=1),void 0===r&&(r=!0);var n=convertToTensor(e,"x","topk");if(0===n.rank)throw Error("topk() expects the input to be of rank 1 or higher");var a=n.shape[n.shape.length-1];if(t<0)throw Error("'k' passed to topk() must be >= 0 but got ".concat(t));if(t>a)throw Error("'k' passed to topk() must be <= the last dimension (".concat(a,") ")+"but got ".concat(t));var o={k:t,sorted:r},i=__read(rd.runKernel(tO,{x:n},o),2);return{values:i[0],indices:i[1]}}}),oM=op({truncatedNormal_:/**
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
 */function(e,t,r,n,a){if(void 0===t&&(t=0),void 0===r&&(r=1),assertNonNegativeIntegerDimensions(e),null!=n&&"bool"===n)throw Error("Unsupported data type $ { dtype }");for(var o=new aJ(t,r,n,!0,a),i=buffer(e,n),s=0;s<i.values.length;s++)i.values[s]=o.nextValue();return i.toTensor()}}),oC=op({unique_:function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unique","string_or_numeric");assert(r.rank>0,function(){return"The input tensor must be at least 1D"});var n={axis:t},a=__read(rd.runKernel(tk,{x:r},n),2);return{values:a[0],indices:a[1]}}}),oj=op({unsortedSegmentSum_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","unsortedSegmentSum"),a=convertToTensor(t,"segmentIds","unsortedSegmentSum","int32");return assert(isInt(r),function(){return"numSegments must be of dtype int"}),rd.runKernel(tM,{x:n,segmentIds:a},{numSegments:r})}}),oR=op({unstack_:/**
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
 */function(e,t){void 0===t&&(t=0);var r=convertToTensor(e,"x","unstack","string_or_numeric");assert(t>=-r.shape.length&&t<r.shape.length,function(){return"Axis = ".concat(t," is not in [-").concat(r.shape.length,", ").concat(r.shape.length,")")});var n={axis:t};return rd.runKernel(tD,{value:r},n)}});/**
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
 */function whereImpl(e,t){for(var r=[],n=0;n<t.length;n++)t[n]&&r.push(n);for(var a=buffer(e,"int32"),o=buffer([r.length,e.length],"int32"),n=0;n<r.length;n++){var i=a.indexToLoc(r[n]),s=n*e.length;o.values.set(i,s)}return o.toTensor()}var whereAsync=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:return[4,(t=convertToTensor(e,"condition","whereAsync","bool")).data()];case 1:return r=a.sent(),n=whereImpl(t.shape,r),e!==t&&t.dispose(),[2,n]}})})},oI=op({transpose_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"x","transpose");if(null==t&&(t=n.shape.map(function(e,t){return t}).reverse()),assert(n.rank===t.length,function(){return"Error in transpose: rank of input ".concat(n.rank," ")+"must match length of perm ".concat(t,".")}),t.forEach(function(e){assert(e>=0&&e<n.rank,function(){return"All entries in 'perm' must be between 0 and ".concat(n.rank-1)+" but got ".concat(t)})}),n.rank<=1)return n.clone();var a={perm:t};return"complex64"===n.dtype?tidy(function(){var e=a5(n),t=nQ(n);return e=rd.runKernel(tE,{x:e},a),t=rd.runKernel(tE,{x:t},a),r&&(t=n9(t)),rh(e,t)}):rd.runKernel(tE,{x:n},a)}}),oN=op({movingAverage_:/**
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
 */function(e,t,r,n,a){void 0===a&&(a=!0);var o=convertToTensor(e,"v","movingAverage"),i=convertToTensor(t,"x","movingAverage"),s=convertToTensor(r,"decay","movingAverage");assertTypesMatch(o,i),assert(arraysEqual(o.shape,i.shape),function(){return"Shape mismatch in v and x"});var u=scalar(1),c=ar(u,s),l=rL(ar(i,o),c);return a&&(assert(null!=n,function(){return"When using zeroDebias: true, step is required."}),l=rN(l,ar(u,nB(s,convertToTensor(n,"step","movingAverage"))))),rR(o,l)}}),oL=op({scatterND_:/**
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
 */function(e,t,r){assertNonNegativeIntegerDimensions(r);var n=convertToTensor(e,"indices","scatterND","int32"),a=convertToTensor(t,"updates","scatterND");return validateInput$1(a,n,r),rd.runKernel(e9,{indices:n,updates:a},{shape:r})}}),oB=op({sparseToDense_:/**
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
 */function(e,t,r,n){void 0===n&&(n=0),assertNonNegativeIntegerDimensions(r);var a=convertToTensor(e,"sparseIndices","sparseToDense","int32"),o=convertToTensor(t,"sparseValues","sparseToDense","string_or_numeric"),i=convertToTensor(n,"defaultValue","sparseToDense",o.dtype);return function(e,t,r,n){if("int32"!==e.dtype)throw Error("tf.sparseToDense() expects the indices to be int32 type,"+" but the dtype was ".concat(e.dtype,"."));if(e.rank>2)throw Error("sparseIndices should be a scalar, vector, or matrix,"+" but got shape ".concat(e.shape,"."));var a=e.rank>0?e.shape[0]:1,o=e.rank>1?e.shape[1]:1;if(r.length!==o)throw Error("outputShape has incorrect number of elements:,"+" ".concat(r.length,", should be: ").concat(o,"."));var i=t.size;if(!(0===t.rank||1===t.rank&&i===a))throw Error("sparseValues has incorrect shape "+"".concat(t.shape,", should be [] or [").concat(a,"]"));if(t.dtype!==n.dtype)throw Error("sparseValues.dtype must match defaultValues.dtype")}(a,o,r,i),rd.runKernel(tv,{sparseIndices:a,sparseValues:o,defaultValue:i},{outputShape:r})}}),oF=op({gatherND_:/**
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
 */function(e,t){var r=convertToTensor(t,"indices","gatherND","int32"),n=convertToTensor(e,"x","gatherND","string_or_numeric");return rd.runKernel(ep,{params:n,indices:r})}}),oz=op({dropout_:/**
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
 */function(e,t){if(null==t)return e.shape.slice();if(arraysEqual(e.shape,t))return t;if(e.shape.length===t.length){for(var r=[],n=0;n<e.shape.length;n++)null==t[n]&&null!=e.shape[n]?r.push(e.shape[n]):r.push(t[n]);return r}return t}(a,r),i=1-t;return rL(a,rN(nX(rR(a4(o,0,1,"float32",n),i)),i))}});/**
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
 */function enclosingPowerOfTwo(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function cosineWindow(e,t,r){for(var n=1-e%2,a=new Float32Array(e),o=0;o<e;++o){var i=2*Math.PI*o/(e+n-1);a[o]=t-r*Math.cos(i)}return tensor1d(a,"float32")}var oZ=op({conv2DBackpropFilter_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o="NHWC");var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]])),assert(4===s.rank,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+"".concat(s.shape,".")}),assert(4===u.rank,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+"".concat(u.shape,".")}),assert(4===r.length,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+"".concat(r,".")});var c="NHWC"===o?s.shape[3]:s.shape[1],l="NHWC"===o?u.shape[3]:u.shape[1];assert(c===r[2],function(){return"Error in conv2dDerFilter: depth of input ".concat(c,") must ")+"match input depth in filter (".concat(r[2],".")}),assert(l===r[3],function(){return"Error in conv2dDerFilter: depth of dy (".concat(l,") must ")+"match output depth for filter (".concat(r[3],").")}),checkPadOnDimRoundingMode("conv2dDerFilter",a,i);var d={x:s,dy:u},f={strides:n,pad:a,dataFormat:o,dimRoundingMode:i,filterShape:r};return rd.runKernel(z,d,f)}});/**
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
 */function getFusedDyActivation(e,t,r){if(null==r||"linear"===r)return e;if("relu"===r)return rL(e,oO(t));throw Error("Cannot compute gradient for fused activation ".concat(r,"."))}function getFusedBiasGradient(e,t){var r=t,n=getReductionAxes(e.shape,t.shape);return n.length>0&&(r=nZ(r,n)),rY(r,e.shape)}function applyActivation(e,t,r,n){if("linear"===t)return e;if("relu"===t)return a8(e);if("elu"===t)return nj(e);if("relu6"===t)return a9(e);if("prelu"===t)return aC(e,r);if("leakyrelu"===t)return n3(e,n);if("sigmoid"===t)return r2(e);throw Error("Unknown fused activation ".concat(t,"."))}var shouldFuse=function(e,t){return!(e>0)||"linear"===t},oH=op({fusedConv2d_:function(e){var t,r,n=e.x,a=e.filter,o=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,f=e.bias,p=e.activation,h=void 0===p?"linear":p,m=e.preluActivationWeights,g=e.leakyreluAlpha;if(h=h||"linear",!1===shouldFuse(rd.state.gradientDepth,h)){assert("NHWC"===u,function(){return"Error in fused conv2d: got dataFormat of ".concat(u," but ")+"only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear."});var v=nd(n,a,o,i,u,l,d);return null!=f&&(v=rR(v,f)),applyActivation(v,h,m,g)}var b=convertToTensor(n,"x","conv2d","float32"),y=convertToTensor(a,"filter","conv2d","float32"),S=b,P=!1;3===b.rank&&(P=!0,S=rY(b,[1,b.shape[0],b.shape[1],b.shape[2]])),assert(4===S.rank,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+"".concat(S.rank,".")}),assert(4===y.rank,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+"".concat(y.rank,".")}),checkPadOnDimRoundingMode("fused conv2d",i,d);var T="NHWC"===u?S.shape[3]:S.shape[1];assert(y.shape[2]===T,function(){return"Error in conv2d: depth of input (".concat(T,") must match ")+"input depth for filter ".concat(y.shape[2],".")}),assert(eitherStridesOrDilationsAreOne(o,l),function(){return"Error in conv2D: Either strides or dilations must be 1. "+"Got strides ".concat(o," and dilations '").concat(l,"'")});var x=computeConv2DInfo(S.shape,y.shape,o,l,i,d);if(null!=f&&(t=__read(makeTypesMatch(t=convertToTensor(f,"bias","fused conv2d"),b),1)[0],"NHWC"===u?assertAndGetBroadcastShape(x.outShape,t.shape):(assert(t.shape.length<=1,function(){return"Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of "+"rank-".concat(t.shape.length,".")}),assert(0===t.shape.length||t.shape[0]===x.outChannels||1===t.shape[0],function(){return"Error in fused conv2d: bias shape (".concat(t.shape,") is not ")+"compatible with the number of output channels "+"(".concat(x.outChannels,")")}))),null!=m){var _=m.shape;if(assert(_.length<=1||3===_.length,function(){return"Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of "+"rank-".concat(_.length,".")}),1===_.length)assert(1===_[0]||_[0]===x.outChannels,function(){return"Error in fused conv2d: PReLU activation weights "+"(".concat(_,") is not compatible with the number of output ")+"channels (".concat(x.outChannels,").")});else if(3===_.length)try{assertAndGetBroadcastShape(_,x.outShape)}catch(e){throw Error("Error in fused conv2d: PReLU activation weights (".concat(_,") ")+"is not compatible with the output shape of the conv2d "+"(".concat(x.outShape,")."))}r=convertToTensor(m,"prelu weights","fused conv2d")}var grad=function(e,t){assert("NHWC"===u,function(){return"Error in gradient of fused conv2D: got dataFormat of ".concat(u," but only NHWC is currently supported.")});var r=__read(t,4),n=r[0],a=r[1],s=r[2],c=r[3],d=getFusedDyActivation(e,s,h);assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 "+"are not yet supported in gradients. Got dilations '".concat(l,"'")});var f=[np(a.shape,d,n,o,i),oZ(a,d,n.shape,o,i)];if(null!=c){var p=getFusedBiasGradient(c,d);f.push(p)}return f},A={x:S,filter:y,bias:t,preluActivationWeights:r},O={strides:o,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:h,leakyreluAlpha:g};return null==f?customGrad(function(e,t,r){var n=rd.runKernel(tL,A,O);return r([t,e,n]),P&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(S,y):customGrad(function(e,t,r,n){var a=rd.runKernel(tL,A,O);return n([t,e,a,r]),P&&(a=rY(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:grad}})(S,y,t)}}),oV=op({depthwiseConv2dNativeBackpropFilter_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]);var s=e;3===e.rank&&(s=rY(e,[1,e.shape[0],e.shape[1],e.shape[2]]));var u=t;3===u.rank&&(u=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={x:s,dy:u},l={strides:n,pad:a,dimRoundingMode:i,dilations:o,filterShape:r};return rd.runKernel(Y,c,l)}}),oU=op({depthwiseConv2dNativeBackpropInput_:/**
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
 */function(e,t,r,n,a,o,i){void 0===o&&(o=[1,1]);var s=t,u=!1;3===t.rank&&(u=!0,s=rY(t,[1,t.shape[0],t.shape[1],t.shape[2]]));var c={dy:s,filter:r},l={strides:n,pad:a,dimRoundingMode:i,dilations:o,inputShape:e},d=rd.runKernel(J,c,l);return u?rY(d,[d.shape[1],d.shape[2],d.shape[3]]):d}}),oG=op({fusedDepthwiseConv2d_:function(e){var t,r,n=e.x,a=e.filter,o=e.strides,i=e.pad,s=e.dataFormat,u=void 0===s?"NHWC":s,c=e.dilations,l=void 0===c?[1,1]:c,d=e.dimRoundingMode,f=e.bias,p=e.activation,h=void 0===p?"linear":p,m=e.preluActivationWeights,g=e.leakyreluAlpha;if(!1===shouldFuse(rd.state.gradientDepth,h)){var v=n_(n,a,o,i,u,l,d);return null!=f&&(v=rR(v,f)),applyActivation(v,h,m,g)}var b=convertToTensor(n,"x","depthwiseConv2d","float32"),y=convertToTensor(a,"filter","depthwiseConv2d","float32"),S=b,P=!1;3===b.rank&&(P=!0,S=rY(b,[1,b.shape[0],b.shape[1],b.shape[2]])),assert(4===S.rank,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got "+"rank ".concat(S.rank,".")}),assert(4===y.rank,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, "+"but got rank ".concat(y.rank,".")}),assert(S.shape[3]===y.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels "+"(".concat(S.shape[3],") must match the inChannels dimension in ")+"filter ".concat(y.shape[2],".")}),null==l&&(l=[1,1]),assert(eitherStridesOrDilationsAreOne(o,l),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must "+"be 1. Got strides ".concat(o," and dilations '").concat(l,"'")}),checkPadOnDimRoundingMode("fused depthwiseConv2d",i,d);var T=computeConv2DInfo(S.shape,y.shape,o,l,i,d,!0);null!=f&&(t=__read(makeTypesMatch(t=convertToTensor(f,"bias","fused conv2d"),b),1)[0],assertAndGetBroadcastShape(T.outShape,t.shape)),null!=m&&(r=convertToTensor(m,"prelu weights","fused depthwiseConv2d"));var grad=function(e,r){assert(tupleValuesAreOne(l),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations "+"'".concat(l,"'")});var n=__read(r,4),a=n[0],s=n[1],u=n[2],c=n[3],f=getFusedDyActivation(e,u,h),p=oU(s.shape,f,a,o,i,l,d),m=oV(s,f,a.shape,o,i,l,d);return null!=c?[p,m,getFusedBiasGradient(t,f)]:[p,m]},x={x:S,filter:y,bias:t,preluActivationWeights:r},_={strides:o,pad:i,dataFormat:u,dilations:l,dimRoundingMode:d,activation:h,leakyreluAlpha:g};return null==f?customGrad(function(e,t,r){var n=rd.runKernel(tB,x,_);return r([t,e,n]),P&&(n=rY(n,[n.shape[1],n.shape[2],n.shape[3]])),{value:n,gradFunc:grad}})(S,y):customGrad(function(e,t,r,n){var a=rd.runKernel(tB,x,_);return n([t,e,a,r]),P&&(a=rY(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:grad}})(S,y,t)}}),oW=op({fusedMatMul_:function(e){var t,r,n,a=e.a,o=e.b,i=e.transposeA,s=void 0!==i&&i,u=e.transposeB,c=void 0!==u&&u,l=e.bias,d=e.activation,f=void 0===d?"linear":d,p=e.preluActivationWeights,h=e.leakyreluAlpha,m=void 0===h?.2:h;if(!1===shouldFuse(rd.state.gradientDepth,f)){var g=r1(a,o,s,c);return null!=l&&(g=rR(g,l)),applyActivation(g,f,p,m)}var v=convertToTensor(a,"a","fused matMul"),b=convertToTensor(o,"b","fused matMul");v=(t=__read(makeTypesMatch(v,b),2))[0],b=t[1];var y=s?v.shape[v.rank-2]:v.shape[v.rank-1],S=c?b.shape[b.rank-1]:b.shape[b.rank-2],P=s?v.shape[v.rank-1]:v.shape[v.rank-2],T=c?b.shape[b.rank-2]:b.shape[b.rank-1],x=v.shape.slice(0,-2),_=b.shape.slice(0,-2),A=sizeFromShape(x),O=sizeFromShape(_);assert(y===S,function(){return"Error in fused matMul: inner shapes (".concat(y,") and (")+"".concat(S,") of Tensors with shapes ").concat(v.shape," and ")+"".concat(b.shape," and transposeA=").concat(s)+" and transposeB=".concat(c," must match.")});var w=assertAndGetBroadcastShape(v.shape.slice(0,-2),b.shape.slice(0,-2)).concat([P,T]),E=s?rY(v,[A,y,P]):rY(v,[A,P,y]),k=c?rY(b,[O,T,S]):rY(b,[O,S,T]);null!=l&&assertAndGetBroadcastShape(w,(r=__read(makeTypesMatch(r=convertToTensor(l,"bias","fused matMul"),v),1)[0]).shape),null!=p&&(n=convertToTensor(p,"prelu weights","fused matMul"));var grad=function(e,t){var r,n,a=__read(t,4),o=a[0],i=a[1],u=a[2],d=a[3],p=getFusedDyActivation(rY(e,u.shape),u,f);return(s||c?!s&&c?(r=r1(p,i,!1,!1),n=r1(p,o,!0,!1)):s&&!c?(r=r1(i,p,!1,!0),n=r1(o,p,!1,!1)):(r=r1(i,p,!0,!0),n=r1(p,o,!0,!0)):(r=r1(p,i,!1,!0),n=r1(o,p,!0,!1)),null!=l)?[r,n,getFusedBiasGradient(d,p)]:[r,n]},D={a:E,b:k,bias:r,preluActivationWeights:n},M={transposeA:s,transposeB:c,activation:f,leakyreluAlpha:m};return null==l?customGrad(function(e,t,r){var n=rd.runKernel(tN,D,M);return r([e,t,n]),{value:rY(n,w),gradFunc:grad}})(E,k):customGrad(function(e,t,r,n){var a=rd.runKernel(tN,D,M);return n([e,t,a,r]),{value:rY(a,w),gradFunc:grad}})(E,k,r)}}),oK=op({hammingWindow_:/**
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
 */function(e){return cosineWindow(e,.54,.46)}}),oq=op({hannWindow_:/**
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
 */function(e){return cosineWindow(e,.5,.5)}}),oX=op({frame_:/**
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
 */function(e,t,r,n,a){void 0===n&&(n=!1),void 0===a&&(a=0);for(var o=0,i=[];o+t<=e.size;)i.push(r3(e,o,t)),o+=r;if(n)for(;o<e.size;){var s=o+t-e.size,u=r0([r3(e,o,t-s),fill([s],a)]);i.push(u),o+=r}return 0===i.length?tensor2d([],[0,t]):rY(r0(i),[i.length,t])}}),o$=op({stft_:/**
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
 */function(e,t,r,n,a){return void 0===a&&(a=oq),null==n&&(n=enclosingPowerOfTwo(t)),oT(rL(oX(e,t,r),a(t)),n)}}),oY=op({cropAndResize_:/**
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
 */function(e,t,r,n,a,o){void 0===a&&(a="bilinear"),void 0===o&&(o=0);var i=convertToTensor(e,"image","cropAndResize"),s=convertToTensor(t,"boxes","cropAndResize","float32"),u=convertToTensor(r,"boxInd","cropAndResize","int32"),c=s.shape[0];assert(4===i.rank,function(){return"Error in cropAndResize: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&4===s.shape[1],function(){return"Error in cropAndResize: boxes must be have size [".concat(c,",4] ")+"but had shape ".concat(s.shape,".")}),assert(1===u.rank&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size [".concat(c,"] ")+"but had shape ".concat(s.shape,".")}),assert(2===n.length,function(){return"Error in cropAndResize: cropSize must be of length 2, but got "+"length ".concat(n.length,".")}),assert(n[0]>=1&&n[1]>=1,function(){return"cropSize must be atleast [1,1], but was ".concat(n)}),assert("bilinear"===a||"nearest"===a,function(){return"method must be bilinear or nearest, but was ".concat(a)});var l={method:a,extrapolationValue:o,cropSize:n};return rd.runKernel(K,{image:i,boxes:s,boxInd:u},l)}}),oJ=op({flipLeftRight_:/**
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
 */function(e){var t=convertToTensor(e,"image","grayscaleToRGB"),r=t.rank-1,n=t.shape[r];assert(t.rank>=2,function(){return"Error in grayscaleToRGB: images must be at least rank 2, "+"but got rank ".concat(t.rank,".")}),assert(1===n,function(){return"Error in grayscaleToRGB: last dimension of a grayscale image "+"should be size 1, but got size ".concat(n,".")});var a=Array(t.rank);return a.fill(1,0,r),a[r]=3,nK(t,a)}}),o0=op({rgbToGrayscale_:/**
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
 */function(e){var t,r=convertToTensor(e,"image","RGBToGrayscale"),n=r.rank-1,a=r.shape[n];assert(r.rank>=2,function(){return"Error in RGBToGrayscale: images must be at least rank 2, "+"but got rank ".concat(r.rank,".")}),assert(3===a,function(){return"Error in RGBToGrayscale: last dimension of an RGB image "+"should be size 3, but got size ".concat(a,".")});var o=r.dtype,i=rC(r,"float32"),s=tensor1d([.2989,.587,.114]);switch(r.rank){case 2:t=nC("ij,j->i",i,s);break;case 3:t=nC("ijk,k->ij",i,s);break;case 4:t=nC("ijkl,l->ijk",i,s);break;case 5:t=nC("ijklm,m->ijkl",i,s);break;case 6:t=nC("ijklmn,n->ijklm",i,s);break;default:throw Error("Not a valid tensor rank.")}return rC(t=nG(t,-1),o)}}),o1=op({rotateWithOffset_:/**
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
 */function(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=.5);var a=convertToTensor(e,"image","rotateWithOffset","float32");assert(4===a.rank,function(){return"Error in rotateWithOffset: image must be rank 4,"+"but got rank ".concat(a.rank,".")});var o={radians:t,fillValue:r,center:n};return rd.runKernel(tI,{image:a},o)}});/**
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
 */function(e,t,r,n,a){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY);var o=convertToTensor(e,"boxes","nonMaxSuppression","float32"),i=convertToTensor(t,"scores","nonMaxSuppression","float32"),s=nonMaxSuppSanityCheck(o,i,r,n,a),u={maxOutputSize:r=s.maxOutputSize,iouThreshold:n=s.iouThreshold,scoreThreshold:a=s.scoreThreshold};return rd.runKernel(ez,{boxes:o,scores:i},u)}});function defaultComparator(e,t){return e>t?1:e<t?-1:0}function nonMaxSuppressionV3Impl(e,t,r,n,a){return nonMaxSuppressionImpl_(e,t,r,n,a,0)}function nonMaxSuppressionV4Impl(e,t,r,n,a,o){return nonMaxSuppressionImpl_(e,t,r,n,a,0,!1,o,!0)}function nonMaxSuppressionV5Impl(e,t,r,n,a,o){return nonMaxSuppressionImpl_(e,t,r,n,a,o,!0)}function nonMaxSuppressionImpl_(e,t,r,n,a,o,i,s,u){void 0===i&&(i=!1),void 0===s&&(s=!1),void 0===u&&(u=!1);for(var c=[],l=0;l<t.length;l++)t[l]>a&&c.push({score:t[l],boxIndex:l,suppressBeginIndex:0});c.sort(ascendingComparator);for(var d=o>0?-.5/o:0,f=[],p=[];f.length<r&&c.length>0;){var h=c.pop(),m=h.score,g=h.boxIndex,v=h.suppressBeginIndex;if(m<a)break;for(var b=!1,y=f.length-1;y>=v;--y){var S=function(e,t,r){var n=e.subarray(4*t,4*t+4),a=e.subarray(4*r,4*r+4),o=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(a[0],a[2]),l=Math.min(a[1],a[3]),d=Math.max(a[0],a[2]),f=Math.max(a[1],a[3]),p=(s-o)*(u-i),h=(d-c)*(f-l);if(p<=0||h<=0)return 0;var m=Math.max(Math.min(s,d)-Math.max(o,c),0)*Math.max(Math.min(u,f)-Math.max(i,l),0);return m/(p+h-m)}(e,g,f[y]);if(S>=n){b=!0;break}if(h.score=h.score*function(e,t,r){var n=Math.exp(t*r*r);return r<=e?n:0}(n,d,S),h.score<=a)break}h.suppressBeginIndex=f.length,!b&&(h.score===m?(f.push(g),p.push(h.score)):h.score>a&&/**
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
 */function(e,t,r){var n=function(e,t,r){for(var n=0,a=e.length,o=0,i=!1;n<a;){var s=r(t,e[o=n+(a-n>>>1)]);s>0?n=o+1:(a=o,i=!s)}return i?n:-n-1}(e,t,r||defaultComparator),a=n<0?-(n+1):n;e.splice(a,0,t)}(c,h,ascendingComparator))}var P=f.length,T=r-P;s&&T>0&&(f.push.apply(f,__spreadArray([],__read(Array(T).fill(0)),!1)),p.push.apply(p,__spreadArray([],__read(Array(T).fill(0)),!1)));var x={selectedIndices:f};return i&&(x.selectedScores=p),u&&(x.validOutputs=P),x}function ascendingComparator(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}var o3=op({nonMaxSuppressionWithScore_:/**
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
 */function(e,t,r,n,a,o){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=0);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,a,o);r=u.maxOutputSize,n=u.iouThreshold;var c={maxOutputSize:r,iouThreshold:n,scoreThreshold:a=u.scoreThreshold,softNmsSigma:o=u.softNmsSigma},l=rd.runKernel(eH,{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),o4=op({nonMaxSuppressionPadded_:/**
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
 */function(e,t,r,n,a,o){void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=!1);var i=convertToTensor(e,"boxes","nonMaxSuppression"),s=convertToTensor(t,"scores","nonMaxSuppression"),u=nonMaxSuppSanityCheck(i,s,r,n,a,null),c={maxOutputSize:u.maxOutputSize,iouThreshold:u.iouThreshold,scoreThreshold:u.scoreThreshold,padToMaxOutputSize:o},l=rd.runKernel(eZ,{boxes:i,scores:s},c);return{selectedIndices:l[0],validOutputs:l[1]}}}),o6=op({resizeBilinear_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"images","resizeBilinear");assert(3===a.rank||4===a.rank,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got "+"rank ".concat(a.rank,".")}),assert(2===t.length,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+"".concat(t,".")}),assert(!1===n||!1===r,function(){return"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false."});var o=a,i=!1;3===a.rank&&(i=!0,o=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),__read(t,0);var s={images:o},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e4,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),o5=op({resizeNearestNeighbor_:function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var a=convertToTensor(e,"images","resizeNearestNeighbor");assert(3===a.rank||4===a.rank,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got "+"rank ".concat(a.rank,".")}),assert(2===t.length,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+"".concat(t,".")}),assert("float32"===a.dtype||"int32"===a.dtype,function(){return"`images` must have `int32` or `float32` as dtype"}),assert(!1===n||!1===r,function(){return"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false."});var o=a,i=!1;3===a.rank&&(i=!0,o=rY(a,[1,a.shape[0],a.shape[1],a.shape[2]])),__read(t,0);var s={images:o},u={alignCorners:r,halfPixelCenters:n,size:t},c=rd.runKernel(e3,s,u);return i?rY(c,[c.shape[1],c.shape[2],c.shape[3]]):c}}),o7=op({threshold_:function(e,t,r,n){void 0===t&&(t="binary"),void 0===r&&(r=!1),void 0===n&&(n=.5);var a,o,i,s,u,c=convertToTensor(e,"image","threshold"),l=c.shape[0]*c.shape[1],d=rL(tensor1d([n]),255);if(assert(3===c.rank,function(){return"Error in threshold: image must be rank 3,"+"but got rank ".concat(c.rank,".")}),assert(3===c.shape[2]||1===c.shape[2],function(){return"Error in threshold: image color channel must be equal to 3 or 1"+"but got ".concat(c.shape[2],".")}),assert("int32"===c.dtype||"float32"===c.dtype,function(){return"Error in dtype: image dtype must be int32 or float32,"+"but got dtype ".concat(c.dtype,".")}),assert("otsu"===t||"binary"===t,function(){return"Method must be binary or otsu, but was ".concat(t)}),3===c.shape[2]){o=(a=__read(oP(c,[1,1,1],-1),3))[0],i=a[1],s=a[2];var f=rL(o,.2989),p=rL(i,.587),h=rL(s,.114);u=rR(rR(f,p),h)}else u=e;return"otsu"===t&&(d=function(e,t){for(var r,n,a,o,i,s,u=tensor1d([-1]),c=tensor1d([0]),l=tensor1d([0]),d=0;d<e.size-1;d++){r=r3(e,0,d+1),n=r3(e,d+1),i=rN(nZ(r),t),s=rN(nZ(n),t),a=rN(nZ(rL(r,range(0,r.size))),nZ(r));var f=fill(n.shape,r.size),p=rR(range(0,n.size),f),h=ar(a,o=rN(nZ(rL(n,p)),nZ(n))),m=ar(a,o),g=rL(i,s),v=nY(l=rL(rL(g,h),m),c);c=nE(v,l,c),u=nE(v,tensor1d([d]),u)}return u}(nt(rC(oo(u),"int32"),tensor([]),256),l)),rC(rL(r?n6(u,d):nY(u,d),255),"int32")}}),o8=op({transform_:/**
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
 */function(e,t,r,n,a,o){void 0===r&&(r="nearest"),void 0===n&&(n="constant"),void 0===a&&(a=0);var i=convertToTensor(e,"image","transform","float32"),s=convertToTensor(t,"transforms","transform","float32");assert(4===i.rank,function(){return"Error in transform: image must be rank 4,"+"but got rank ".concat(i.rank,".")}),assert(2===s.rank&&(s.shape[0]===i.shape[0]||1===s.shape[0])&&8===s.shape[1],function(){return"Error in transform: Input transform should be batch x 8 or 1 x 8"}),assert(null==o||2===o.length,function(){return"Error in transform: outputShape must be [height, width] or null, "+"but got ".concat(o,".")});var u={interpolation:r,fillMode:n,fillValue:a,outputShape:o};return rd.runKernel(tw,{image:i,transforms:s},u)}}),o9=op({bandPart_:function(e,t,r){var n,a,o=convertToTensor(e,"a","bandPart");assert(o.rank>=2,function(){return"bandPart(): Rank must be at least 2, got ".concat(o.rank,".")});var i=o.shape,s=__read(o.shape.slice(-2),2),u=s[0],c=s[1];"number"==typeof t?(assert(t%1==0,function(){return"bandPart(): numLower must be an integer, got ".concat(t,".")}),assert(t<=u,function(){return"bandPart(): numLower (".concat(t,")")+" must not be greater than the number of rows (".concat(u,").")}),n=convertToTensor(t<0?u:t,"numLower","bandPart")):(assert("int32"===t.dtype,function(){return"bandPart(): numLower's dtype must be an int32."}),n=nE(n4(t,0),u,am(t,u))),"number"==typeof r?(assert(r%1==0,function(){return"bandPart(): numUpper must be an integer, got ".concat(r,".")}),assert(r<=c,function(){return"bandPart(): numUpper (".concat(r,")")+" must not be greater than the number of columns (".concat(c,").")}),a=convertToTensor(r<0?c:r,"numUpper","bandPart")):(assert("int32"===r.dtype,function(){return"bandPart(): numUpper's dtype must be an int32."}),a=nE(n4(r,0),c,am(r,c)));var l=ar(rY(range(0,u,1,"int32"),[-1,1]),range(0,c,1,"int32")),d=ao(n6(l,n),nJ(l,n9(a))),f=zeros([u,c],o.dtype);return rY(oA(oR(rY(o,[-1,u,c])).map(function(e){return nE(d,e,f)})),i)}}),ie=op({gramSchmidt_:/**
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
 */function(e){if(Array.isArray(e)){t=!1,assert(null!=e&&e.length>0,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var t,r=e[0].shape[0],_loop_1=function(t){assert(e[t].shape[0]===r,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: "+"(".concat(e[t].shape[0]," vs. ").concat(r,")")})},n=1;n<e.length;++n)_loop_1(n)}else t=!0,e=oP(e,e.shape[0],0).map(function(e){return o_(e,[0])});assert(e.length<=e[0].shape[0],function(){return"Gram-Schmidt: Number of vectors (".concat(e.length,") exceeds ")+"number of dimensions (".concat(e[0].shape[0],").")});for(var a=[],o=e,_loop_2=function(e){a.push(rd.tidy(function(){var t=o[e];if(e>0)for(var r=0;r<e;++r){var n=rL(nZ(rL(a[r],t)),a[r]);t=ar(t,n)}return rN(t,nH(t,"euclidean"))}))},n=0;n<e.length;++n)_loop_2(n);return t?oA(a,0):a}});function qr2d(e,t){return void 0===t&&(t=!1),rd.tidy(function(){assert(2===e.shape.length,function(){return"qr2d() requires a 2D Tensor, but got a ".concat(e.shape.length,"D Tensor.")});for(var r=e.shape[0],n=e.shape[1],a=nq(r),o=rj(e),i=tensor2d([[1]],[1,1]),s=rj(i),u=r>=n?n:r,_loop_1=function(e){var t,u=o,c=s,l=a;s=(t=__read(rd.tidy(function(){var t=r3(o,[e,e],[r-e,1]),u=nH(t),c=r3(o,[e,e],[1,1]),l=nE(nY(c,0),tensor2d([[-1]]),tensor2d([[1]])),d=ar(c,rL(l,u)),f=rN(t,d);s=1===f.shape[0]?rj(i):r0([i,r3(f,[1,0],[f.shape[0]-1,f.shape[1]])],0);var p=n9(rN(r1(l,d),u)),h=r3(o,[e,0],[r-e,n]),m=rL(p,s),g=oI(s);if(0===e)o=ar(h,r1(m,r1(g,h)));else{var v=ar(h,r1(m,r1(g,h)));o=r0([r3(o,[0,0],[e,n]),v],0)}var b=oI(m),y=r3(a,[0,e],[r,a.shape[1]-e]);if(0===e)a=ar(y,r1(r1(y,s),b));else{var S=ar(y,r1(r1(y,s),b));a=r0([r3(a,[0,0],[r,e]),S],1)}return[s,o,a]}),3))[0],o=t[1],a=t[2],dispose([u,c,l])},c=0;c<u;++c)_loop_1(c);return!t&&r>n&&(a=r3(a,[0,0],[r,n]),o=r3(o,[0,0],[n,n])),[a,o]})}var it=op({qr_:function(e,t){if(void 0===t&&(t=!1),assert(e.rank>=2,function(){return"qr() requires input tensor to have a rank >= 2, but got rank ".concat(e.rank)}),2===e.rank)return qr2d(e,t);var r=e.shape.slice(0,e.shape.length-2).reduce(function(e,t){return e*t}),n=oR(rY(e,[r,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),a=[],o=[];return n.forEach(function(e){var r=__read(qr2d(e,t),2),n=r[0],i=r[1];a.push(n),o.push(i)}),[rY(oA(a,0),e.shape),rY(oA(o,0),e.shape)]}});/**
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
 */t.Reduction=void 0,function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}(t.Reduction||(t.Reduction={}));var ir=op({computeWeightedLoss_:function(e,r,n){void 0===n&&(n=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var a=convertToTensor(e,"losses","computeWeightedLoss"),o=null;null!=r&&(o=convertToTensor(r,"weights","computeWeightedLoss"));var i=null==o?a:rL(a,o);if(n===t.Reduction.NONE)return i;if(n===t.Reduction.SUM)return nZ(i);if(n===t.Reduction.MEAN){if(null==o)return ah(i);var s=a.size/o.size,u=rN(nZ(i),nZ(o));return s>1?rN(u,scalar(s)):u}if(n===t.Reduction.SUM_BY_NONZERO_WEIGHTS){if(null==o)return rN(nZ(i),scalar(a.size));var c=rC(nZ(aP(rL(o,ones(a.shape)),scalar(0))),"float32");return rN(nZ(i),c)}throw Error("Unknown reduction: ".concat(n))}}),ia=op({absoluteDifference_:/**
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
 */function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","absoluteDifference"),i=convertToTensor(r,"predictions","absoluteDifference"),s=null;return null!=n&&(s=convertToTensor(n,"weights","absoluteDifference")),assertShapesMatch(o.shape,i.shape,"Error in absoluteDifference: "),ir(rB(ar(o,i)),s,a)}}),io=op({cosineDistance_:function(e,r,n,a,o){void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","cosineDistance"),s=convertToTensor(r,"predictions","cosineDistance"),u=null;return null!=a&&(u=convertToTensor(a,"weights","cosineDistance")),assertShapesMatch(i.shape,s.shape,"Error in cosineDistance: "),ir(ar(scalar(1),nZ(rL(i,s),n,!0)),u,o)}}),ii=op({hingeLoss_:function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","hingeLoss"),i=convertToTensor(r,"predictions","hingeLoss"),s=null;null!=n&&(s=convertToTensor(n,"weights","hingeLoss")),assertShapesMatch(o.shape,i.shape,"Error in hingeLoss: ");var u=scalar(1);return o=ar(rL(scalar(2),o),u),ir(a8(ar(u,rL(o,i))),s,a)}}),is=op({huberLoss_:/**
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
 */function(e,r,n,a,o){void 0===a&&(a=1),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","huberLoss"),s=convertToTensor(r,"predictions","huberLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","huberLoss")),assertShapesMatch(i.shape,s.shape,"Error in huberLoss: ");var c=scalar(a),l=rB(ar(s,i)),d=am(l,c),f=ar(l,d);return ir(rR(rL(scalar(.5),nz(d)),rL(c,f)),u,o)}}),iu=op({logLoss_:/**
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
 */function(e,r,n,a,o){void 0===a&&(a=1e-7),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"labels","logLoss"),s=convertToTensor(r,"predictions","logLoss"),u=null;null!=n&&(u=convertToTensor(n,"weights","logLoss")),assertShapesMatch(i.shape,s.shape,"Error in logLoss: ");var c=scalar(1),l=scalar(a),d=n9(rL(i,n7(rR(s,l)))),f=rL(ar(c,i),n7(rR(ar(c,s),l)));return ir(ar(d,f),u,o)}}),ic=op({meanSquaredError_:/**
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
 */function(e,r,n,a){void 0===a&&(a=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var o=convertToTensor(e,"labels","meanSquaredError"),i=convertToTensor(r,"predictions","meanSquaredError"),s=null;return null!=n&&(s=convertToTensor(n,"weights","meanSquaredError")),assertShapesMatch(o.shape,i.shape,"Error in meanSquaredError: "),ir(ox(o,i),s,a)}}),il=op({sigmoidCrossEntropy_:function(e,r,n,a,o){void 0===a&&(a=0),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i,s,u,c,l,d=convertToTensor(e,"multiClassLabels","sigmoidCrossEntropy"),f=convertToTensor(r,"logits","sigmoidCrossEntropy"),p=null;if(null!=n&&(p=convertToTensor(n,"weights","sigmoidCrossEntropy")),assertShapesMatch(d.shape,f.shape,"Error in sigmoidCrossEntropy: "),a>0){var h=scalar(a),m=scalar(1),g=scalar(.5);d=rR(rL(d,ar(m,h)),rL(g,h))}return ir((i=convertToTensor(d,"labels","sigmoidCrossEntropyWithLogits"),s=convertToTensor(f,"logits","sigmoidCrossEntropyWithLogits"),assertShapesMatch(i.shape,s.shape,"Error in sigmoidCrossEntropyWithLogits: "),u=a8(s),c=rL(s,i),l=n8(nU(n9(rB(s)))),rR(ar(u,c),l)),p,o)}}),id=op({softmaxCrossEntropy_:function(e,r,n,a,o){void 0===a&&(a=0),void 0===o&&(o=t.Reduction.SUM_BY_NONZERO_WEIGHTS);var i=convertToTensor(e,"onehotLabels","softmaxCrossEntropy"),s=convertToTensor(r,"logits","softmaxCrossEntropy"),u=null;if(null!=n&&(u=convertToTensor(n,"weights","softmaxCrossEntropy")),assertShapesMatch(i.shape,s.shape,"Error in softmaxCrossEntropy: "),a>0){var c=scalar(a),l=scalar(1),d=scalar(i.shape[1]);i=rR(rL(i,ar(l,c)),rN(c,d))}return ir(function(e,t,r){if(void 0===r&&(r=-1),-1===r&&(r=t.rank-1),r!==t.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet "+"supported. Labels / logits was rank ".concat(t.rank," ")+"and dim was ".concat(r));return customGrad(function(e,t,n){var a=aa(t,[r],!0),o=ar(rC(t,"float32"),a);return n([e,o]),{value:nZ(n9(rL(o,e)),[r]),gradFunc:function(e,t){var n=__read(t,2),a=n[0],o=n[1],i=expandShapeToKeepDim(e.shape,[r]);return[rL(rY(e,i),ar(rC(a,"float32"),nU(o))),rL(rY(e,i),ar(nU(o),rC(a,"float32")))]}}})(e,t)}(i,s),u,o)}}),ip=op({sparseFillEmptyRows_:/**
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
 */function(e,t,r,n){var a=convertToTensor(e,"indices","sparseFillEmptyRows","int32"),o=convertToTensor(t,"values","sparseFillEmptyRows"),i=convertToTensor(r,"denseShape","sparseFillEmptyRows","int32"),s=convertToTensor(n,"defaultValue","sparseFillEmptyRows",o.dtype);if(2!==a.rank)throw Error("Indices should be Tensor2D but received shape\n        ".concat(a.shape));if(1!==o.rank)throw Error("Values should be Tensor1D but received shape ".concat(o.shape));if(1!==i.rank)throw Error("Dense shape should be Tensor1D but received shape ".concat(i.shape));if(0!==s.rank)throw Error("Default value should be a scalar but received shape ".concat(s.shape));var u=rd.runKernel(tp,{indices:a,values:o,denseShape:i,defaultValue:s});return{outputIndices:u[0],outputValues:u[1],emptyRowIndicator:u[2],reverseIndexMap:u[3]}}}),ih=op({sparseReshape_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"inputIndices","sparseReshape","int32"),a=convertToTensor(t,"inputShape","sparseReshape","int32"),o=convertToTensor(r,"newShape","sparseReshape","int32");if(2!==n.rank)throw Error("Input indices should be Tensor2D but received shape\n        ".concat(n.shape));if(1!==a.rank)throw Error("Input shape should be Tensor1D but received shape ".concat(a.shape));if(1!==o.rank)throw Error("New shape should be Tensor1D but received shape ".concat(o.shape));var i=rd.runKernel(th,{inputIndices:n,inputShape:a,newShape:o});return{outputIndices:i[0],outputShape:i[1]}}}),im=op({sparseSegmentMean_:/**
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
 */function(e,t,r,n,a,o,i,s){var u=convertToTensor(e,"data","stringNGrams","string");if("string"!==u.dtype)throw Error("Data must be of datatype string");if(1!==u.shape.length)throw Error("Data must be a vector, saw: ".concat(u.shape));var c=convertToTensor(t,"dataSplits","stringNGrams");if("int32"!==c.dtype)throw Error("Data splits must be of datatype int32");var l=rd.runKernel(tP,{data:u,dataSplits:c},{separator:r,nGramWidths:n,leftPad:a,rightPad:o,padWidth:i,preserveShortSequences:s});return{nGrams:l[0],nGramsSplits:l[1]}}}),ib=op({stringSplit_:/**
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
 */function(e,t,r){void 0===r&&(r=!0);var n=convertToTensor(e,"input","stringSplit","string"),a=convertToTensor(t,"delimiter","stringSplit","string");if(1!==n.rank)throw Error("Input should be Tensor1D but received shape ".concat(n.shape));if(0!==a.rank)throw Error("Delimiter should be a scalar but received shape ".concat(a.shape));var o={skipEmpty:r},i=rd.runKernel(tT,{input:n,delimiter:a},o);return{indices:i[0],values:i[1],shape:i[2]}}}),iy=op({stringToHashBucketFast_:/**
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
 */function(e,t){var r=convertToTensor(e,"input","stringToHashBucketFast","string");if(t<=0)throw Error("Number of buckets must be at least 1");return rd.runKernel(tx,{input:r},{numBuckets:t})}}),iS=op({staticRegexReplace_:/**
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
 */function(e,t,r,n){void 0===n&&(n=!0);var a=convertToTensor(e,"input","staticRegexReplace","string"),o={pattern:t,rewrite:r,replaceGlobal:n};return rd.runKernel(ty,{x:a},o)}}),iP=new Map,iT=new Map,ix=function(){function Serializable(){}return Serializable.prototype.getClassName=function(){return this.constructor.className},Serializable.fromConfig=function(e,t){return new e(t)},Serializable}(),i_=function(){function SerializationMap(){this.classNameMap={}}return SerializationMap.getMap=function(){return null==SerializationMap.instance&&(SerializationMap.instance=new SerializationMap),SerializationMap.instance},SerializationMap.register=function(e){SerializationMap.getMap().classNameMap[e.className]=[e,e.fromConfig]},SerializationMap}();function registerClass(e,t,r){assert(null!=e.className,function(){return"Class being registered does not have the static className property defined."}),assert("string"==typeof e.className,function(){return"className is required to be a string, but got type "+typeof e.className}),assert(e.className.length>0,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),void 0===t&&(t="Custom"),void 0===r&&(r=e.className);var n=t+">"+r;return i_.register(e),iP.set(n,e),iT.set(e,n),e}var iA=function(e){function Optimizer(){return null!==e&&e.apply(this,arguments)||this}return __extends(Optimizer,e),Optimizer.prototype.minimize=function(e,t,r){void 0===t&&(t=!1);var n=this.computeGradients(e,r),a=n.value,o=n.grads;if(null!=r){var i=r.map(function(e){return{name:e.name,tensor:o[e.name]}});this.applyGradients(i)}else this.applyGradients(o);return(dispose(o),t)?a:(a.dispose(),null)},Object.defineProperty(Optimizer.prototype,"iterations",{get:function(){return null==this.iterations_&&(this.iterations_=0),this.iterations_},enumerable:!1,configurable:!0}),Optimizer.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},Optimizer.prototype.computeGradients=function(e,t){return variableGrads(e,t)},Optimizer.prototype.dispose=function(){null!=this.iterations_&&dispose(this.iterations_)},Optimizer.prototype.saveIterations=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return null==this.iterations_&&(this.iterations_=0),[2,{name:"iter",tensor:scalar(this.iterations_,"int32")}]})})},Optimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for this optimizer yet.")})})},Optimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for this optimizer class "+"".concat(this.getClassName()))})})},Optimizer.prototype.extractIterations=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return t=this,[4,e[0].tensor.data()];case 1:return t.iterations_=r.sent()[0],[2,e.slice(1)]}})})},Optimizer}(ix);Object.defineProperty(iA,Symbol.hasInstance,{value:function(e){return null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients}});var iO=function(e){function AdadeltaOptimizer(t,r,n){void 0===n&&(n=null);var a=e.call(this)||this;return a.learningRate=t,a.rho=r,a.epsilon=n,a.accumulatedGrads=[],a.accumulatedUpdates=[],null==n&&(a.epsilon=rd.backend.epsilon()),a}return __extends(AdadeltaOptimizer,e),Object.defineProperty(AdadeltaOptimizer,"className",{get:function(){return"Adadelta"},enumerable:!1,configurable:!0}),AdadeltaOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accum_grad"),variable:tidy(function(){return nk(a).variable(!1)})}),null==t.accumulatedUpdates[n]&&(t.accumulatedUpdates[n]={originalName:"".concat(r,"/accum_var"),variable:tidy(function(){return nk(a).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedGrads[n].variable,s=t.accumulatedUpdates[n].variable;tidy(function(){var e=rR(rL(i,t.rho),rL(nz(o),1-t.rho)),r=rL(rN(nF(rR(s,t.epsilon)),nF(rR(i,t.epsilon))),o),n=rR(rL(s,t.rho),rL(nz(r),1-t.rho));i.assign(e),s.assign(n);var u=rR(rL(r,-t.learningRate),a);a.assign(u)})}}),this.incrementIterations()},AdadeltaOptimizer.prototype.dispose=function(){null!=this.accumulatedUpdates&&(dispose(this.accumulatedGrads.map(function(e){return e.variable})),dispose(this.accumulatedUpdates.map(function(e){return e.variable})))},AdadeltaOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedGrads),!1),__read(this.accumulatedUpdates),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdadeltaOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return t=(e=r.sent()).length/2,this.accumulatedGrads=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedUpdates=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdadeltaOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},AdadeltaOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.rho,t.epsilon)},AdadeltaOptimizer}(iA),iw=function(e){function AdagradOptimizer(t,r){void 0===r&&(r=.1);var n=e.call(this)||this;return n.learningRate=t,n.initialAccumulatorValue=r,n.accumulatedGrads=[],n}return __extends(AdagradOptimizer,e),Object.defineProperty(AdagradOptimizer,"className",{get:function(){return"Adagrad"},enumerable:!1,configurable:!0}),AdagradOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedGrads[n]&&(t.accumulatedGrads[n]={originalName:"".concat(r,"/accumulator"),variable:tidy(function(){return fill(a.shape,t.initialAccumulatorValue).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedGrads[n].variable;tidy(function(){var e=rR(i,nz(o));i.assign(e);var r=rR(rL(rN(o,nF(rR(e,rd.backend.epsilon()))),-t.learningRate),a);a.assign(r)})}}),this.incrementIterations()},AdagradOptimizer.prototype.dispose=function(){null!=this.accumulatedGrads&&dispose(this.accumulatedGrads.map(function(e){return e.variable}))},AdagradOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulatedGrads.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdagradOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulatedGrads=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdagradOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},AdagradOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.initialAccumulatorValue)},AdagradOptimizer}(iA),iE=function(e){function AdamOptimizer(t,r,n,a){void 0===a&&(a=null);var o=e.call(this)||this;return o.learningRate=t,o.beta1=r,o.beta2=n,o.epsilon=a,o.accumulatedFirstMoment=[],o.accumulatedSecondMoment=[],tidy(function(){o.accBeta1=scalar(r).variable(),o.accBeta2=scalar(n).variable()}),null==a&&(o.epsilon=rd.backend.epsilon()),o}return __extends(AdamOptimizer,e),Object.defineProperty(AdamOptimizer,"className",{get:function(){return"Adam"},enumerable:!1,configurable:!0}),AdamOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=ar(1,t.accBeta1),a=ar(1,t.accBeta2);r.forEach(function(r,o){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[o]&&(t.accumulatedFirstMoment[o]={originalName:"".concat(r,"/m"),variable:tidy(function(){return nk(i).variable(!1)})}),null==t.accumulatedSecondMoment[o]&&(t.accumulatedSecondMoment[o]={originalName:"".concat(r,"/v"),variable:tidy(function(){return nk(i).variable(!1)})});var s=Array.isArray(e)?e[o].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[o].variable,c=t.accumulatedSecondMoment[o].variable,l=rR(rL(u,t.beta1),rL(s,1-t.beta1)),d=rR(rL(c,t.beta2),rL(nz(s),1-t.beta2)),f=rN(l,n),p=rN(d,a);u.assign(l),c.assign(d);var h=rR(rL(rN(f,rR(nF(p),t.epsilon)),-t.learningRate),i);i.assign(h)}}),t.accBeta1.assign(rL(t.accBeta1,t.beta1)),t.accBeta2.assign(rL(t.accBeta2,t.beta2))}),this.incrementIterations()},AdamOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedSecondMoment&&dispose(this.accumulatedSecondMoment.map(function(e){return e.variable}))},AdamOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedFirstMoment),!1),__read(this.accumulatedSecondMoment),!1),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},AdamOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r=this;return __generator(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(e)];case 1:return e=n.sent(),tidy(function(){r.accBeta1.assign(nB(r.beta1,r.iterations_+1)),r.accBeta2.assign(nB(r.beta2,r.iterations_+1))}),t=e.length/2,this.accumulatedFirstMoment=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedSecondMoment=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},AdamOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},AdamOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)},AdamOptimizer}(iA),ik=function(e){function AdamaxOptimizer(t,r,n,a,o){void 0===a&&(a=null),void 0===o&&(o=0);var i=e.call(this)||this;return i.learningRate=t,i.beta1=r,i.beta2=n,i.epsilon=a,i.decay=o,i.accumulatedFirstMoment=[],i.accumulatedWeightedInfNorm=[],tidy(function(){i.iteration=scalar(0).variable(),i.accBeta1=scalar(r).variable()}),null==a&&(i.epsilon=rd.backend.epsilon()),i}return __extends(AdamaxOptimizer,e),Object.defineProperty(AdamaxOptimizer,"className",{get:function(){return"Adamax"},enumerable:!1,configurable:!0}),AdamaxOptimizer.prototype.applyGradients=function(e){var t=this,r=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e);tidy(function(){var n=ar(1,t.accBeta1),a=rN(-t.learningRate,rR(rL(t.iteration,t.decay),1));r.forEach(function(r,o){var i=rd.registeredVariables[r];null==t.accumulatedFirstMoment[o]&&(t.accumulatedFirstMoment[o]={originalName:"".concat(r,"/m"),variable:nk(i).variable(!1)}),null==t.accumulatedWeightedInfNorm[o]&&(t.accumulatedWeightedInfNorm[o]={originalName:"".concat(r,"/v"),variable:nk(i).variable(!1)});var s=Array.isArray(e)?e[o].tensor:e[r];if(null!=s){var u=t.accumulatedFirstMoment[o].variable,c=t.accumulatedWeightedInfNorm[o].variable,l=rR(rL(u,t.beta1),rL(s,1-t.beta1)),d=ap(rL(c,t.beta2),rB(s));u.assign(l),c.assign(d);var f=rR(rL(rN(a,n),rN(l,rR(d,t.epsilon))),i);i.assign(f)}}),t.iteration.assign(rR(t.iteration,1)),t.accBeta1.assign(rL(t.accBeta1,t.beta1))}),this.incrementIterations()},AdamaxOptimizer.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(function(e){return e.variable})),null!=this.accumulatedWeightedInfNorm&&dispose(this.accumulatedWeightedInfNorm.map(function(e){return e.variable}))},AdamaxOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("getWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){throw Error("setWeights() is not implemented for Adamax yet.")})})},AdamaxOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},AdamaxOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)},AdamaxOptimizer}(iA),iD=function(e){function SGDOptimizer(t){var r=e.call(this)||this;return r.learningRate=t,r.setLearningRate(t),r}return __extends(SGDOptimizer,e),Object.defineProperty(SGDOptimizer,"className",{get:function(){return"SGD"},enumerable:!1,configurable:!0}),SGDOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=Array.isArray(e)?e[n].tensor:e[r];if(null!=a){var o=rd.registeredVariables[r];tidy(function(){var e=rR(rL(t.c,a),o);o.assign(e)})}}),this.incrementIterations()},SGDOptimizer.prototype.setLearningRate=function(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=keep(scalar(-e))},SGDOptimizer.prototype.dispose=function(){this.c.dispose()},SGDOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()]]}})})},SGDOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:if(0!==(e=t.sent()).length)throw Error("SGD optimizer does not have settable weights.");return[2]}})})},SGDOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate}},SGDOptimizer.fromConfig=function(e,t){return new e(t.learningRate)},SGDOptimizer}(iA),iM=function(e){function MomentumOptimizer(t,r,n){void 0===n&&(n=!1);var a=e.call(this,t)||this;return a.learningRate=t,a.momentum=r,a.useNesterov=n,a.accumulations=[],a.m=scalar(a.momentum),a}return __extends(MomentumOptimizer,e),Object.defineProperty(MomentumOptimizer,"className",{get:function(){return"Momentum"},enumerable:!1,configurable:!0}),MomentumOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulations[n]&&(t.accumulations[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nk(a).variable(!1)})});var o=t.accumulations[n].variable,i=Array.isArray(e)?e[n].tensor:e[r];null!=i&&tidy(function(){var e,r=rR(rL(t.m,o),i);e=t.useNesterov?rR(rL(t.c,rR(i,rL(r,t.m))),a):rR(rL(t.c,r),a),o.assign(r),a.assign(e)})}),this.incrementIterations()},MomentumOptimizer.prototype.dispose=function(){this.m.dispose(),null!=this.accumulations&&dispose(this.accumulations.map(function(e){return e.variable}))},MomentumOptimizer.prototype.setMomentum=function(e){this.momentum=e},MomentumOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.saveIterations()];case 1:return[2,[e.sent()].concat(this.accumulations.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},MomentumOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.extractIterations(e)];case 1:return e=t.sent(),this.accumulations=e.map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),[2]}})})},MomentumOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},MomentumOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)},MomentumOptimizer}(iD),iC=function(e){function RMSPropOptimizer(t,r,n,a,o){void 0===r&&(r=.9),void 0===n&&(n=0),void 0===a&&(a=null),void 0===o&&(o=!1);var i=e.call(this)||this;if(i.learningRate=t,i.decay=r,i.momentum=n,i.epsilon=a,i.accumulatedMeanSquares=[],i.accumulatedMoments=[],i.accumulatedMeanGrads=[],i.centered=o,null==a&&(i.epsilon=rd.backend.epsilon()),null==t)throw Error("learningRate for RMSPropOptimizer must be defined.");return i}return __extends(RMSPropOptimizer,e),Object.defineProperty(RMSPropOptimizer,"className",{get:function(){return"RMSProp"},enumerable:!1,configurable:!0}),RMSPropOptimizer.prototype.applyGradients=function(e){var t=this;(Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e)).forEach(function(r,n){var a=rd.registeredVariables[r];null==t.accumulatedMeanSquares[n]&&(t.accumulatedMeanSquares[n]={originalName:"".concat(r,"/rms"),variable:tidy(function(){return nk(a).variable(!1)})}),null==t.accumulatedMoments[n]&&(t.accumulatedMoments[n]={originalName:"".concat(r,"/momentum"),variable:tidy(function(){return nk(a).variable(!1)})}),null==t.accumulatedMeanGrads[n]&&t.centered&&(t.accumulatedMeanGrads[n]={originalName:"".concat(r,"/mg"),variable:tidy(function(){return nk(a).variable(!1)})});var o=Array.isArray(e)?e[n].tensor:e[r];if(null!=o){var i=t.accumulatedMeanSquares[n].variable,s=t.accumulatedMoments[n].variable;tidy(function(){var e=rR(rL(i,t.decay),rL(nz(o),1-t.decay));if(t.centered){var r=t.accumulatedMeanGrads[n].variable,u=rR(rL(r,t.decay),rL(o,1-t.decay)),c=rN(rL(o,t.learningRate),nF(ar(e,rR(nz(u),t.epsilon)))),l=rR(rL(s,t.momentum),c);i.assign(e),r.assign(u),s.assign(l);var d=ar(a,l);a.assign(d)}else{var f=rR(rL(i,t.decay),rL(nz(o),1-t.decay)),l=rR(rL(s,t.momentum),rN(rL(o,t.learningRate),nF(rR(f,t.epsilon))));i.assign(f),s.assign(l);var d=ar(a,l);a.assign(d)}})}}),this.incrementIterations()},RMSPropOptimizer.prototype.dispose=function(){null!=this.accumulatedMeanSquares&&dispose(this.accumulatedMeanSquares.map(function(e){return e.variable})),null!=this.accumulatedMeanGrads&&this.centered&&dispose(this.accumulatedMeanGrads.map(function(e){return e.variable})),null!=this.accumulatedMoments&&dispose(this.accumulatedMoments.map(function(e){return e.variable}))},RMSPropOptimizer.prototype.getWeights=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=__spreadArray(__spreadArray([],__read(this.accumulatedMeanSquares),!1),__read(this.accumulatedMoments),!1),this.centered&&e.push.apply(e,__spreadArray([],__read(this.accumulatedMeanGrads),!1)),[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(e.map(function(e){return{name:e.originalName,tensor:e.variable}}))]}})})},RMSPropOptimizer.prototype.setWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.extractIterations(e)];case 1:return e=r.sent(),t=this.centered?e.length/3:e.length/2,this.accumulatedMeanSquares=e.slice(0,t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.accumulatedMoments=e.slice(t,2*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(function(e){return{originalName:e.name,variable:e.tensor.variable(!1)}})),[2]}})})},RMSPropOptimizer.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},RMSPropOptimizer.fromConfig=function(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)},RMSPropOptimizer}(iA),ij=[iO,iw,iE,ik,iM,iC,iD];function defer(e){return new Promise(function(e){return setTimeout(e)}).then(e)}var iR=function(){function BrowserDownloads(e){if(!env().getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(BrowserDownloads.URL_SCHEME)&&(e=e.slice(BrowserDownloads.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}return BrowserDownloads.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s;return __generator(this,function(u){switch(u.label){case 0:if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");if(t=rg.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"})),!(e.modelTopology instanceof ArrayBuffer))return[3,1];throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],a=getModelJSONForModelArtifacts(e,n),o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),(i=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor).download=this.modelJsonFileName,i.href=o,[4,defer(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:if(u.sent(),!(null!=e.weightData))return[3,4];return(s=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=r,[4,defer(function(){return s.dispatchEvent(new MouseEvent("click"))})];case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e)}]}})})},BrowserDownloads}();iR.URL_SCHEME="downloads://";var iI=function(){function BrowserFiles(e){if(null==e||e.length<1)throw Error("When calling browserFiles, at least 1 file is required, "+"but received ".concat(e));this.jsonFile=e[0],this.weightsFiles=e.slice(1)}return BrowserFiles.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){return[2,new Promise(function(t,r){var n=new FileReader;n.onload=function(n){var a=JSON.parse(n.target.result),o=a.modelTopology;if(null==o){r(Error("modelTopology field is missing from file ".concat(e.jsonFile.name)));return}if(null==a.weightsManifest){r(Error("weightManifest field is missing from file ".concat(e.jsonFile.name)));return}if(0===e.weightsFiles.length){t({modelTopology:o});return}t(getModelArtifactsForJSON(a,function(t){return e.loadWeights(t)}))},n.onerror=function(t){return r("Failed to read model topology and weights manifest JSON "+"from file '".concat(e.jsonFile.name,"'. BrowserFiles supports loading ")+"Keras-style tf.Model artifacts only.")},n.readAsText(e.jsonFile)})]})})},BrowserFiles.prototype.loadWeights=function(e){var t,r,n=this,a=[],o=[];try{for(var i=__values(e),s=i.next();!s.done;s=i.next()){var u=s.value;a.push.apply(a,__spreadArray([],__read(u.weights),!1)),o.push.apply(o,__spreadArray([],__read(u.paths),!1))}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}var c=this.checkManifestAndWeightFiles(e);return Promise.all(o.map(function(e){return n.loadWeightsFile(e,c[e])})).then(function(e){return[a,e]})},BrowserFiles.prototype.loadWeightsFile=function(e,t){return new Promise(function(r,n){var a=new FileReader;a.onload=function(e){r(e.target.result)},a.onerror=function(t){return n("Failed to weights data from file of path '".concat(e,"'."))},a.readAsArrayBuffer(t)})},BrowserFiles.prototype.checkManifestAndWeightFiles=function(e){var t,r,n=this,a=[],o=this.weightsFiles.map(function(e){return basename(e.name)}),i={};try{for(var s=__values(e),u=s.next();!u.done;u=s.next())u.value.paths.forEach(function(e){var t=basename(e);if(-1!==a.indexOf(t))throw Error("Duplicate file basename found in weights manifest: "+"'".concat(t,"'"));if(a.push(t),-1===o.indexOf(t))throw Error("Weight file with basename '".concat(t,"' is not provided."));i[e]=n.weightsFiles[o.indexOf(t)]})}catch(e){t={error:e}}finally{try{u&&!u.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}if(a.length!==this.weightsFiles.length)throw Error("Mismatch in the number of files in weights manifest "+"(".concat(a.length,") and the number of weight files provided ")+"(".concat(this.weightsFiles.length,")."));return i},BrowserFiles}();/**
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
 */function monitorPromisesProgress(e,t,r,n){assert(null!=e&&Array.isArray(e)&&e.length>0,function(){return"promises must be a none empty array"}),a=r=null==r?0:r,o=n=null==n?1:n,assert(a>=0&&a<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got startFraction ".concat(a)}),assert(o>=0&&o<=1,function(){return"Progress fraction must be in range [0, 1], but "+"got endFraction ".concat(o)}),assert(o>=a,function(){return"startFraction must be no more than endFraction, but "+"got startFraction ".concat(a," and endFraction ")+"".concat(o)});var a,o,i=0;return Promise.all(e.map(function(a){return a.then(function(a){return t(r+ ++i/e.length*(n-r)),a}),a}))}function loadWeightsAsArrayBuffer(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l;return __generator(this,function(d){switch(d.label){case 0:if(null==t&&(t={}),r=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,n=e.map(function(e){return r(e,t.requestInit,{isBinary:!0})}),a=0,o=.5,null!=t.onProgress)return[3,2];return[4,Promise.all(n)];case 1:return i=d.sent(),[3,4];case 2:return[4,monitorPromisesProgress(n,t.onProgress,a,o)];case 3:i=d.sent(),d.label=4;case 4:if(s=i.map(function(e){return e.arrayBuffer()}),u=.5,c=1,null!=t.onProgress)return[3,6];return[4,Promise.all(s)];case 5:return l=d.sent(),[3,8];case 6:return[4,monitorPromisesProgress(s,t.onProgress,u,c)];case 7:l=d.sent(),d.label=8;case 8:return[2,l]}})})}function weightsLoaderFactory(e){var t=this;return function(r,n,a){return void 0===n&&(n=""),__awaiter(t,void 0,void 0,function(){var t,o,i,s,u,c,l,d,f,p;return __generator(this,function(h){switch(h.label){case 0:if(t=r.map(function(){return!1}),o={},i=null!=a?a.map(function(){return!1}):[],s=[],r.forEach(function(e,r){var n=0;e.weights.forEach(function(e){var u=rm["quantization"in e?e.quantization.dtype:e.dtype]*sizeFromShape(e.shape),enqueueWeightsForFetchingFn=function(){t[r]=!0,null==o[r]&&(o[r]=[]),o[r].push({manifestEntry:e,groupOffset:n,sizeBytes:u})};null!=a?a.forEach(function(t,r){t===e.name&&(enqueueWeightsForFetchingFn(),i[r]=!0)}):enqueueWeightsForFetchingFn(),s.push(e.name),n+=u})}),!i.every(function(e){return e}))throw u=a.filter(function(e,t){return!i[t]}),Error("Could not find weights in manifest with names: "+"".concat(u.join(", "),". \n")+"Manifest JSON has weights with names: "+"".concat(s.join(", "),"."));return c=t.reduce(function(e,t,r){return t&&e.push(r),e},[]),l=[],c.forEach(function(e){r[e].paths.forEach(function(e){var t=n+(n.endsWith("/")?"":"/")+e;l.push(t)})}),[4,e(l)];case 1:return d=h.sent(),f={},p=0,c.forEach(function(e){var t=r[e].paths.length,n=new rg(d.slice(p,p+t));o[e].forEach(function(e){var t=decodeWeights(n.slice(e.groupOffset,e.groupOffset+e.sizeBytes),[e.manifestEntry]);for(var r in t)f[r]=t[r]}),p+=t}),[2,f]}})})}}rb.registerSaveRouter(function(e){var t;return env().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(iR.URL_SCHEME)?(void 0===(t=e.slice(iR.URL_SCHEME.length))&&(t="model"),new iR(t)):null});var iN=function(){function HTTPRequest(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(assert("function"==typeof t.fetchFunc,function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=t.fetchFunc):this.fetch=env().platform.fetch,assert(null!=e&&e.length>0,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(e)&&assert(2===e.length,function(){return"URL paths for http must have a length of 2, "+"(actual length is ".concat(e.length,").")}),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}return HTTPRequest.prototype.save=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o;return __generator(this,function(i){switch(i.label){case 0:if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=getModelJSONForModelArtifacts(e,r),t.body.append("model.json",new Blob([JSON.stringify(n)],{type:"application/json"}),"model.json"),null!=e.weightData&&(a=rg.join(e.weightData),t.body.append("model.weights.bin",new Blob([a],{type:"application/octet-stream"}),"model.weights.bin")),[4,this.fetch(this.path,t)];case 1:if((o=i.sent()).ok)return[2,{modelArtifactsInfo:getModelArtifactsInfoForJSON(e),responses:[o]}];throw Error("BrowserHTTPRequest.save() failed due to HTTP response status "+"".concat(o.status,"."))}})})},HTTPRequest.prototype.loadModelJSON=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a;return __generator(this,function(o){switch(o.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(e=o.sent()).ok)throw Error("Request to ".concat(this.path," failed with status code ")+"".concat(e.status,". Please verify this URL points to ")+"the model JSON of the model to load.");o.label=2;case 2:return o.trys.push([2,4,,5]),[4,e.json()];case 3:return t=o.sent(),[3,5];case 4:throw o.sent(),r="Failed to parse model JSON of response from ".concat(this.path,"."),this.path.endsWith(".pb")?r+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":r+=" Please make sure the server is serving valid JSON for this request.",Error(r);case 5:if(n=t.modelTopology,a=t.weightsManifest,null==n&&null==a)throw Error("The JSON from HTTP path ".concat(this.path," contains neither model ")+"topology or manifest for weights.");return[2,t]}})})},HTTPRequest.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:if(this.loadOptions.streamWeights)return[2,this.loadStream()];return[4,this.loadModelJSON()];case 1:return[2,getModelArtifactsForJSON(t.sent(),function(t){return e.loadWeights(t)})]}})})},HTTPRequest.prototype.loadStream=function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a=this;return __generator(this,function(o){switch(o.label){case 0:return[4,this.loadModelJSON()];case 1:return e=o.sent(),[4,this.getWeightUrls(e.weightsManifest)];case 2:return t=o.sent(),r=getWeightSpecs(e.weightsManifest),n=function(){return function(e,t){var r,n,a=this,o=null==t.fetchFunc?env().platform.fetch:t.fetchFunc,i=0;return null===(r=t.onProgress)||void 0===r||r.call(t,0),new ReadableStream({pull:function(r){return __awaiter(a,void 0,void 0,function(){var a,s,u,c;return __generator(this,function(l){switch(l.label){case 0:if(!(i<e.length))return[3,4];if(n)return[3,2];return[4,o(e[i],t.requestInit,{isBinary:!0})];case 1:n=l.sent().body.getReader(),l.label=2;case 2:return[4,n.read()];case 3:if(u=(s=l.sent()).done,c=s.value,u)return i++,n=void 0,null===(a=t.onProgress)||void 0===a||a.call(t,i/e.length),[3,0];return r.enqueue(c),[2];case 4:return r.close(),[2]}})})}})}(t,a.loadOptions)},[2,Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:n})]}})})},HTTPRequest.prototype.getWeightUrls=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n,a,o,i,s,u,c,l,d,f,p,h,m,g,v,b,y,S;return __generator(this,function(P){switch(P.label){case 0:var T,x,_;r=(t=__read((x=(T=Array.isArray(this.path)?this.path[1]:this.path).lastIndexOf("/"),_=T.lastIndexOf("?"),[T.substring(0,x)+"/",_>x?T.substring(_):""]),2))[0],n=t[1],a=this.weightPathPrefix||r,o=[],i=[];try{for(u=(s=__values(e)).next();!u.done;u=s.next()){c=u.value;try{for(y=void 0,d=(l=__values(c.paths)).next();!d.done;d=l.next())f=d.value,null!=this.weightUrlConverter?i.push(this.weightUrlConverter(f)):o.push(a+f+n)}catch(e){y={error:e}}finally{try{d&&!d.done&&(S=l.return)&&S.call(l)}finally{if(y)throw y.error}}}}catch(e){v={error:e}}finally{try{u&&!u.done&&(b=s.return)&&b.call(s)}finally{if(v)throw v.error}}if(!this.weightUrlConverter)return[3,2];return h=(p=o.push).apply,m=[o],g=[[]],[4,Promise.all(i)];case 1:h.apply(p,m.concat([__spreadArray.apply(void 0,g.concat([__read.apply(void 0,[P.sent()]),!1]))])),P.label=2;case 2:return[2,o]}})})},HTTPRequest.prototype.loadWeights=function(e){return __awaiter(this,void 0,void 0,function(){var t,r,n;return __generator(this,function(a){switch(a.label){case 0:return[4,this.getWeightUrls(e)];case 1:return t=a.sent(),r=getWeightSpecs(e),[4,loadWeightsAsArrayBuffer(t,this.loadOptions)];case 2:return n=a.sent(),[2,[r,n]]}})})},HTTPRequest}();function isHTTPScheme(e){return null!=e.match(iN.URL_SCHEME_REGEX)}iN.URL_SCHEME_REGEX=/^https?:\/\//;var httpRouter=function(e,t){if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else if(Array.isArray(e)?e.every(function(e){return isHTTPScheme(e)}):isHTTPScheme(e))return http(e,t);return null};function http(e,t){return new iN(e,t)}rb.registerSaveRouter(httpRouter),rb.registerLoadRouter(httpRouter);/**
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
 */var iL=function(){function PassthroughLoader(e){this.modelArtifacts=e}return PassthroughLoader.prototype.load=function(){return this.modelArtifacts},PassthroughLoader}(),iB=function(){function PassthroughSaver(e){this.saveHandler=e}return PassthroughSaver.prototype.save=function(e){return this.saveHandler(e)},PassthroughSaver}(),PassthroughAsync=function(e){e.load&&(this.load=function(){return Promise.resolve(e.load())}),e.save&&(this.save=function(t){return Promise.resolve(e.save(t))})};function fromMemorySync(e,t,r,n){return 1!=arguments.length?(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iL({modelTopology:e,weightSpecs:t,weightData:r,trainingConfig:n})):null!=e.modelTopology||null!=e.weightSpecs?new iL(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new iL({modelTopology:e}))}var iF=op({confusionMatrix_:/**
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
 */function(e,t,r){var n=convertToTensor(e,"labels","confusionMatrix"),a=convertToTensor(t,"predictions","confusionMatrix");assert(null==r||r>0&&Number.isInteger(r),function(){return"If provided, numClasses must be a positive integer, "+"but got ".concat(r)}),assert(1===n.rank,function(){return"Expected the rank of labels to be 1, but got ".concat(n.rank)}),assert(1===a.rank,function(){return"Expected the rank of predictions to be 1, "+"but got ".concat(a.rank)}),assert(n.shape[0]===a.shape[0],function(){return"Mismatch in the number of examples: "+"".concat(n.shape[0]," vs. ").concat(a.shape[0],". ")+"Labels and predictions should have the same number of elements."}),assert(r>0&&Number.isInteger(r),function(){return"numClasses is required to be a positive integer, but got "+"".concat(r)});var o=aT(rC(n,"int32"),r),i=aT(rC(a,"int32"),r);return rC(r1(oI(o),i),"int32")}}),iz=!1;function fromPixels_(e,t){if(void 0===t&&(t=3),t>4)throw Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw Error("pixels passed to tf.browser.fromPixels() can not be null");var r,n,a=!1,o=!1,i=!1,s=!1,u=!1,c=!1;if(e.data instanceof Uint8Array)a=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)o=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)i=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)s=!0;else if(null!=e.getContext)u=!0;else if("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap)c=!0;else throw Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, "+"but was ".concat(e.constructor.name));if(null!=getKernel(tR,rd.backendName)){var d={numChannels:t};return rd.runKernel(tR,{pixels:e},d)}var f=__read(i?[e.videoWidth,e.videoHeight]:[e.width,e.height],2),p=f[0],h=f[1];if(u)r=e.getContext("2d").getImageData(0,0,p,h).data;else if(o||a)r=e.data;else if(s||i||c){if(null==l){if("undefined"==typeof document){if("undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof OffscreenCanvasRenderingContext2D)l=new OffscreenCanvas(1,1).getContext("2d");else throw Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.")}else l=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})}l.canvas.width=p,l.canvas.height=h,l.drawImage(e,0,0,p,h),r=l.getImageData(0,0,p,h).data}if(4===t)n=new Int32Array(r);else{var m=p*h;n=new Int32Array(m*t);for(var g=0;g<m;g++)for(var v=0;v<t;++v)n[g*t+v]=r[4*g+v]}return tensor3d(n,[h,p,t],"int32")}function validateImgTensor(e){if(2!==e.rank&&3!==e.rank)throw Error("toPixels only supports rank 2 or 3 tensors, got rank ".concat(e.rank,"."));var t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw Error("toPixels only supports depth of size "+"1, 3 or 4 but got ".concat(t));if("float32"!==e.dtype&&"int32"!==e.dtype)throw Error("Unsupported type for toPixels: ".concat(e.dtype,".")+" Please use float32 or int32 tensors.")}var iZ=op({fromPixels_:fromPixels_});function prepareAndValidate(e,t){var r=e.shape.length,n=t.shape.length;if(r<1)throw Error("tf.gatherND() expects the input to be rank 1 or higher,"+" but the rank was ".concat(r,"."));if(n<1)throw Error("tf.gatherND() expects the indices to be rank 1 or higher,"+" but the rank was ".concat(n,"."));if("int32"!==t.dtype)throw Error("tf.gatherND() expects the indices to be int32 type,"+" but the dtype was ".concat(t.dtype,"."));if(t.shape[n-1]>r)throw Error("index innermost dimension length must be <= tensor rank; saw: "+"".concat(t.shape[n-1]," vs. ").concat(r));if(0===sizeFromShape(e.shape))throw Error("Requested more than 0 entries, but input is empty."+" Input shape: ".concat(e.shape,"."));for(var a=t.shape,o=a[a.length-1],i=1,s=0;s<a.length-1;++s)i*=a[s];var u=e.shape,c=a.slice();c.pop();for(var l=1,s=o;s<r;++s)l*=u[s],c.push(u[s]);var d=__spreadArray(__spreadArray([],__read(computeStrides(e.shape).map(function(e){return e/l})),!1),[1],!1).slice(0,o);return[c,i,l,d]}function stridesWithElidedDims(e,t,r,n){for(var a=__spreadArray([],__read(e),!1),o=a.length;o<n.length;o++)a.push(1);for(var o=0;o<r;o++)0===o?a[t]=1:(a.splice(t,0,1),a.pop());return a}function getElidedAxes(e,t){for(var r=[],n=0;n<e;n++)r.push(t+n);return r}function startIndicesWithElidedDims(e,t,r,n,a){for(var o=__spreadArray([],__read(a),!1),i=getElidedAxes(r,t),s=0;s<o.length;s++)if(i.indexOf(s)>-1)o[s]=0;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=0),o[s]=l}return o}function stopIndicesWithElidedDims(e,t,r,n,a){for(var o=__spreadArray([],__read(a),!1),i=getElidedAxes(r,t),s=0;s<o.length;s++)if(i.indexOf(s)>-1)o[s]=Number.MAX_SAFE_INTEGER;else{var u,c=(u=s)<=t?u:u-(r-1),l=n[c];e&1<<c&&(l=Number.MAX_SAFE_INTEGER),o[s]=l}for(var d=0;d<o.length;d++){var f=a[d];o[d]<0&&(o[d]+=f),o[d]=clamp(0,o[d],a[d])}return o}function stridesForAxis(e,t,r){var n=e[t];return(r&1<<t||null==n)&&(n=1),n}function startForAxis(e,t,r,n,a,o){var i=t[a],s=r[a]||1;(e&1<<a||o&1<<a||null==i)&&(i=s>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var u=n[a];return i<0&&(i+=u),i=clamp(0,i,u-1)}function stopForAxis(e,t,r,n,a,o){var i=t[a],s=r[a]||1;(e&1<<a||o&1<<a||null==i)&&(i=s>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var u=n[a];return i<0&&(i+=u),i=s>0?clamp(0,i,u):clamp(-1,i,u-1)}function canonical(e,t,r,n,a,o){if(a[t])return r>0?o[t]:o[t+1&1];var i=e<0?n+e:e;return i<o[0]?o[0]:i>o[1]?o[1]:i}var iH={__proto__:null,assertParamsValid:function(e,t,r){var n=e.shape.length;assert(n===t.length,function(){return"Error in slice".concat(n,"D: Length of begin ").concat(t," must ")+"match the rank of the array (".concat(n,").")}),assert(n===r.length,function(){return"Error in slice".concat(n,"D: Length of size ").concat(r," must ")+"match the rank of the array (".concat(n,").")});for(var _loop_1=function(a){assert(t[a]+r[a]<=e.shape[a],function(){return"Error in slice".concat(n,"D: begin[").concat(a,"] + size[").concat(a,"] ")+"(".concat(t[a]+r[a],") would overflow input.shape[").concat(a,"] (").concat(e.shape[a],")")})},a=0;a<n;++a)_loop_1(a)},computeFlatOffset:function(e,t){for(var r=e.length>0?e[e.length-1]:1,n=0;n<e.length-1;n++)r+=e[n]*t[n];return r},computeOutShape:function(e,t,r){for(var n=[],a=0;a<e.length;a++)n[a]=Math.ceil((t[a]-e[a])/r[a]);return n},getNormalizedAxes:function(e,t,r,n,a,o,i,s,u){var c=e.length,l=Array(c),d=Array(c),f=Array(c);if(t.length&&r>0){var p=t[0],h=r+1;l=startIndicesWithElidedDims(i,p,h,n,e),d=stopIndicesWithElidedDims(s,p,h,a,e),f=stridesWithElidedDims(o,p,h,e)}else for(var m=0;m<c;m++)l[m]=startForAxis(i,n,o,e,m,u),d[m]=stopForAxis(s,a,o,e,m,u),f[m]=stridesForAxis(o,m,u);return{begin:l,end:d,strides:f}},isSliceContinous:function(e,t,r){for(var n=r.length,a=0;a<r.length;a++)if(r[a]>1){n=a;break}for(var a=n+1;a<r.length;a++)if(t[a]>0||r[a]!==e[a])return!1;return!0},maskToAxes:function(e){for(var t=[],r=0;e>0;)1&e&&t.push(r),e/=2,r++;return t},parseSliceParams:function(e,t,r){var n,a,o=e.shape.length;return(n="number"==typeof t?__spreadArray([t],__read(Array(o-1).fill(0)),!1):t.length<o?t.concat(Array(o-t.length).fill(0)):t.slice()).forEach(function(e){assert(-1!==e,function(){return"slice() does not support negative begin indexing."})}),a=(a=null==r?Array(o).fill(-1):"number"==typeof r?__spreadArray([r],__read(Array(o-1).fill(-1)),!1):r.length<o?r.concat(Array(o-r.length).fill(-1)):r).map(function(t,r){return t>=0?t:(assert(-1===t,function(){return"Negative size values should be exactly -1 but got "+"".concat(t," for the slice() size at index ").concat(r,".")}),e.shape[r]-n[r])}),[n,a]},sliceInfo:function(e,t,r,n,a,o,i,s,u){if(null==n?(c=Array(t.length)).fill(1):c=n,null!=i&&(i&i-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");for(var c,l=!1,d={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:r.slice(),strides:c.slice(),beginMask:a,endMask:o,ellipsisMask:i,newAxisMask:s,shrinkAxisMask:u},f=0;f<d.dims;f++)l&&(1<<f&s)!=0&&d.numAddAxisAfterEllipsis++,1<<f&i&&(l=!0);!l&&(d.ellipsisMask|=1<<d.dims,d.dims++);var p={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};(function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;var r=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(var n=0;n<e.dims;n++)if(1<<n&e.ellipsisMask)for(var a=Math.min(t.dims-(e.dims-n)+1+e.numAddAxisAfterEllipsis,t.dims);r<a;r++)t.begin[r]=0,t.end[r]=0,t.strides[r]=1,t.beginMask|=1<<r,t.endMask|=1<<r,t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[r]=n;else if(1<<n&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(r===t.begin.length)throw Error("Index out of range using input dim ".concat(r,"; input ")+"has only ".concat(t.dims," dims, ").concat(t.begin.length,"."));null!=e.begin&&(t.begin[r]=e.begin[n]),null!=e.end&&(t.end[r]=e.end[n]),t.strides[r]=e.strides[n],e.beginMask&1<<n&&(t.beginMask|=1<<r),e.endMask&1<<n&&(t.endMask|=1<<r),e.shrinkAxisMask&1<<n?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<r):(t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(n)),t.inputShapeGatherIndicesSparse[r]=n,r++}})(d,p);for(var h=!0,m=!0,g=!0,v=[],b=[],f=0;f<e.length;++f){if(0===p.strides[f])throw Error("strides[".concat(f,"] must be non-zero"));var y=!!(p.shrinkAxisMask&1<<f),S=e[f];if(-1===S){v.push(y?1:-1);continue}var P=[p.beginMask&1<<f,p.endMask&1<<f],T=[p.strides[f]>0?0:-1,p.strides[f]>0?S:S-1];if(y&&p.strides[f]<=0)throw Error("only stride 1 allowed on non-range indexing.");g=g&&1===p.strides[f];var x=!!(p.beginMask&1<<f&&p.endMask&1<<f);if(p.beginValid&&p.endValid){if(y){var _=p.begin[f]<0?S+p.begin[f]:p.begin[f];if(p.begin[f]=_,p.end[f]=p.begin[f]+1,_<0||_>=S)throw Error("slice index ".concat(p.begin[f]," of dimension ").concat(f," out of bounds."))}else p.begin[f]=canonical(p.begin[f],0,p.strides[f],S,P,T),p.end[f]=canonical(p.end[f],1,p.strides[f],S,P,T);var A=1===p.strides[f]&&0===p.begin[f]&&p.end[f]===S;h=h&&A,m=m&&(0===f&&1===p.strides[f]||A)}else h=h&&1===p.strides[f]&&x,m=m&&(0===f&&1===p.strides[f]||x);var O=void 0,w=!1;if(p.beginValid&&p.endValid?(O=p.end[f]-p.begin[f],w=!0):y?(O=1,w=!0):x&&S>=0&&(O=p.strides[f]<0?-S:S,w=!0),w){var E=void 0;E=0===O||O<0!=p.strides[f]<0?0:Math.trunc(O/p.strides[f])+(O%p.strides[f]!=0?1:0),v.push(E)}else v.push(-1)}for(var k=0;k<p.finalShapeGatherIndices.length;++k){var D=p.finalShapeGatherIndices[k];D>=0?b.push(v[D]):-2===D&&b.push(1)}return{finalShapeSparse:b.filter(function(e,t){return -2!==p.finalShapeGatherIndices[t]}),finalShape:b,isIdentity:h,sliceDim0:m,isSimpleSlice:g,begin:p.begin,end:p.end,strides:p.strides}},startForAxis:startForAxis,startIndicesWithElidedDims:startIndicesWithElidedDims,stopForAxis:stopForAxis,stopIndicesWithElidedDims:stopIndicesWithElidedDims,stridesForAxis:stridesForAxis,stridesWithElidedDims:stridesWithElidedDims},iV=function(){function OptimizerConstructors(){}return OptimizerConstructors.sgd=function(e){return new iD(e)},OptimizerConstructors.momentum=function(e,t,r){return void 0===r&&(r=!1),new iM(e,t,r)},OptimizerConstructors.rmsprop=function(e,t,r,n,a){return void 0===t&&(t=.9),void 0===r&&(r=0),void 0===n&&(n=null),void 0===a&&(a=!1),new iC(e,t,r,n,a)},OptimizerConstructors.adam=function(e,t,r,n){return void 0===e&&(e=.001),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),new iE(e,t,r,n)},OptimizerConstructors.adadelta=function(e,t,r){return void 0===e&&(e=.001),void 0===t&&(t=.95),void 0===r&&(r=null),new iO(e,t,r)},OptimizerConstructors.adamax=function(e,t,r,n,a){return void 0===e&&(e=.002),void 0===t&&(t=.9),void 0===r&&(r=.999),void 0===n&&(n=null),void 0===a&&(a=0),new ik(e,t,r,n,a)},OptimizerConstructors.adagrad=function(e,t){return void 0===t&&(t=.1),new iw(e,t)},OptimizerConstructors}(),iU="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:function(e){return e()};!function(e){e[e.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",e[e.VALUE_ROWIDS=1]="VALUE_ROWIDS",e[e.ROW_LENGTHS=2]="ROW_LENGTHS",e[e.ROW_SPLITS=3]="ROW_SPLITS",e[e.ROW_LIMITS=4]="ROW_LIMITS",e[e.ROW_STARTS=5]="ROW_STARTS"}(d||(d={}));var iG=/->/g;/**
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
 */(function(){var e,t;try{for(var r=__values(ij),n=r.next();!n.done;n=r.next()){var a=n.value;registerClass(a)}}catch(t){e={error:t}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}})(),t.Abs="Abs",t.Acos=g,t.Acosh=v,t.AdadeltaOptimizer=iO,t.AdagradOptimizer=iw,t.AdamOptimizer=iE,t.AdamaxOptimizer=ik,t.Add="Add",t.AddN=b,t.All="All",t.Any="Any",t.ArgMax=y,t.ArgMin=S,t.Asin=P,t.Asinh=T,t.Atan=x,t.Atan2=A,t.Atanh=_,t.AvgPool=O,t.AvgPool3D=w,t.AvgPool3DGrad="AvgPool3DGrad",t.AvgPoolGrad="AvgPoolGrad",t.BatchMatMul=E,t.BatchToSpaceND=k,t.Bincount=D,t.BitwiseAnd=M,t.BroadcastArgs=C,t.BroadcastTo="BroadcastTo",t.Cast=j,t.Ceil=R,t.ClipByValue=I,t.Complex=N,t.ComplexAbs=L,t.Concat=B,t.Conv2D=F,t.Conv2DBackpropFilter=z,t.Conv2DBackpropInput=Z,t.Conv3D=H,t.Conv3DBackpropFilterV2="Conv3DBackpropFilterV2",t.Conv3DBackpropInputV2=V,t.Cos="Cos",t.Cosh=U,t.CropAndResize=K,t.Cumprod=G,t.Cumsum=W,t.DataStorage=f,t.DenseBincount=q,t.DepthToSpace=X,t.DepthwiseConv2dNative=$,t.DepthwiseConv2dNativeBackpropFilter=Y,t.DepthwiseConv2dNativeBackpropInput=J,t.Diag=Q,t.Dilation2D=ee,t.Dilation2DBackpropFilter="Dilation2DBackpropFilter",t.Dilation2DBackpropInput="Dilation2DBackpropInput",t.Draw=et,t.Einsum=en,t.Elu="Elu",t.EluGrad="EluGrad",t.Environment=m,t.Equal=ea,t.Erf="Erf",t.Exp="Exp",t.ExpandDims=eo,t.Expm1=ei,t.FFT="FFT",t.Fill=es,t.FlipLeftRight=eu,t.Floor=ec,t.FloorDiv=el,t.FromPixels=tR,t.FusedBatchNorm=ed,t.FusedConv2D=tL,t.FusedDepthwiseConv2D=tB,t.GatherNd=ep,t.GatherV2=ef,t.Greater=eh,t.GreaterEqual=em,t.IFFT=ev,t.Identity=eg,t.Imag=eb,t.IsFinite=ey,t.IsInf=eS,t.IsNan=eP,t.KernelBackend=p,t.LRN="LRN",t.LRNGrad="LRNGrad",t.LeakyRelu=eT,t.Less=ex,t.LessEqual=e_,t.LinSpace=eA,t.Log="Log",t.Log1p=eO,t.LogSoftmax="LogSoftmax",t.LogicalAnd=ew,t.LogicalNot=eE,t.LogicalOr=ek,t.LogicalXor="LogicalXor",t.LowerBound="LowerBound",t.MatrixBandPart="MatrixBandPart",t.Max="Max",t.MaxPool=eM,t.MaxPool3D=eC,t.MaxPool3DGrad="MaxPool3DGrad",t.MaxPoolGrad="MaxPoolGrad",t.MaxPoolWithArgmax=ej,t.Maximum=eD,t.Mean=eR,t.Min="Min",t.Minimum=eI,t.MirrorPad=eN,t.Mod="Mod",t.MomentumOptimizer=iM,t.Multinomial=eL,t.Multiply=eB,t.Neg="Neg",t.NonMaxSuppressionV3=ez,t.NonMaxSuppressionV4=eZ,t.NonMaxSuppressionV5=eH,t.NotEqual=eF,t.OP_SCOPE_SUFFIX=rp,t.OneHot=eU,t.OnesLike=eV,t.Optimizer=iA,t.OptimizerConstructors=iV,t.Pack=eG,t.PadV2=eW,t.Pool="Pool",t.Pow="Pow",t.Prelu=eK,t.Prod=eq,t.RMSPropOptimizer=iC,t.RaggedGather=eX,t.RaggedRange=e$,t.RaggedTensorToTensor=eY,t.Range=eJ,t.Real=eQ,t.RealDiv=er,t.Reciprocal=e0,t.Relu=e1,t.Relu6=e6,t.Reshape=e2,t.ResizeBilinear=e4,t.ResizeBilinearGrad="ResizeBilinearGrad",t.ResizeNearestNeighbor=e3,t.ResizeNearestNeighborGrad="ResizeNearestNeighborGrad",t.Reverse=e5,t.RotateWithOffset=tI,t.Round=e7,t.Rsqrt=e8,t.SGDOptimizer=iD,t.ScatterNd=e9,t.SearchSorted=tt,t.Select=tr,t.Selu=tn,t.Sigmoid=ts,t.Sign=ti,t.Sin="Sin",t.Sinh=to,t.Slice=ta,t.Softmax=tf,t.Softplus=tu,t.SpaceToBatchND=tl,t.SparseFillEmptyRows=tp,t.SparseReshape=th,t.SparseSegmentMean=tm,t.SparseSegmentSum=tg,t.SparseToDense=tv,t.SplitV=td,t.Sqrt=tc,t.Square="Square",t.SquaredDifference=tb,t.StaticRegexReplace=ty,t.Step=tj,t.StridedSlice=tS,t.StringNGrams=tP,t.StringSplit=tT,t.StringToHashBucketFast=tx,t.Sub="Sub",t.Sum="Sum",t.Tan="Tan",t.Tanh=t_,t.Tensor=ri,t.TensorBuffer=rn,t.TensorScatterUpdate=te,t.Tile=tA,t.TopK=tO,t.Transform=tw,t.Transpose=tE,t.Unique=tk,t.Unpack=tD,t.UnsortedSegmentSum=tM,t.UpperBound="UpperBound",t.Variable=rs,t.ZerosLike=tC,t._FusedMatMul=tN,t.abs=rB,t.acos=rF,t.acosh=rz,t.add=rR,t.addN=rZ,t.all=rH,t.any=rV,t.argMax=rU,t.argMin=rG,t.asin=rW,t.asinh=rK,t.atan=rq,t.atan2=rX,t.atanh=r$,t.avgPool=rJ,t.avgPool3d=rQ,t.backend=backend,t.backend_util={__proto__:null,ERF_A1:.254829592,ERF_A2:-.284496736,ERF_A3:1.421413741,ERF_A4:-1.453152027,ERF_A5:1.061405429,ERF_P:.3275911,PARALLELIZE_THRESHOLD:30,get RowPartitionType(){return d},SELU_SCALE:1.0507009873554805,SELU_SCALEALPHA:1.7580993408473768,applyActivation:applyActivation,assertAndGetBroadcastShape:assertAndGetBroadcastShape,assertAxesAreInnerMostDims:function(e,t,r){assert(axesAreInnerMostDims(t,r),function(){return"".concat(e," supports only inner-most axes for now. ")+"Got axes ".concat(t," and rank-").concat(r," input.")})},assertParamsConsistent:/**
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
 */function(e,t){var r=e[0].length;e.forEach(function(e,t){assert(e.length===r,function(){return"Error in concat".concat(r,"D: rank of tensors[").concat(t,"] must be the same ")+"as the rank of the rest (".concat(r,")")})}),assert(t>=0&&t<r,function(){return"Error in concat".concat(r,"D: axis must be between 0 and ").concat(r-1,".")});var n=e[0];e.forEach(function(e,a){for(var o=0;o<r;o++)assert(o===t||e[o]===n[o],function(){return"Error in concat".concat(r,"D: Shape of tensors[").concat(a,"] (").concat(e,") ")+"does not match the shape of the rest (".concat(n,") ")+"along the non-concatenated axis ".concat(a,".")})})},assignToTypedArray:function(e,t,r,n){e[2*n]=t,e[2*n+1]=r},axesAreInnerMostDims:axesAreInnerMostDims,calculateShapes:calculateShapes,checkEinsumDimSizes:function(e,t,r){for(var n=Array(e),_loop_2=function(e){for(var a=r[e].shape,_loop_3=function(r){void 0===n[t[e][r]]?n[t[e][r]]=a[r]:assert(n[t[e][r]]===a[r],function(){return"Expected dimension ".concat(n[t[e][r]]," at axis ").concat(r," ")+"of input shaped ".concat(JSON.stringify(a),", ")+"but got dimension ".concat(a[r])})},o=0;o<t[e].length;++o)_loop_3(o)},a=0;a<r.length;++a)_loop_2(a)},checkPadOnDimRoundingMode:checkPadOnDimRoundingMode,combineLocations:combineLocations,combineRaggedTensorToTensorShapes:function(e,t,r){var n=[];if(null==r&&null==t)return n;if(null==t)for(;n.length<e+r.length;)n.push(-1);else n=t.slice();if(null==r)return n;if(e+r.length!==n.length)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.rank = ").concat(e+r.length,", but shape.rank = ").concat(n.length));for(var a=1;a<r.length;++a){var o=r[a],i=n[n.length-r.length+a],s=n[i];if(o>=0){if(s>=0){if(s!==o)throw Error("rt input.shape and shape=".concat(t," are incompatible: rt input.shape[").concat(a+e,"] = ").concat(o," but shape[").concat(a+e,"] = ").concat(s))}else n[i]=o}}return n},complexWithEvenIndex:function(e){for(var t=Math.ceil(e.length/4),r=new Float32Array(t),n=new Float32Array(t),a=0;a<e.length;a+=4)r[Math.floor(a/4)]=e[a],n[Math.floor(a/4)]=e[a+1];return{real:r,imag:n}},complexWithOddIndex:function(e){for(var t=Math.floor(e.length/4),r=new Float32Array(t),n=new Float32Array(t),a=2;a<e.length;a+=4)r[Math.floor(a/4)]=e[a],n[Math.floor(a/4)]=e[a+1];return{real:r,imag:n}},computeConv2DInfo:computeConv2DInfo,computeConv3DInfo:computeConv3DInfo,computeDefaultPad:computeDefaultPad,computeDilation2DInfo:function(e,t,r,n,a,o){void 0===a&&(a="NHWC");var i=e[3];return computeConv2DInfo(e,__spreadArray(__spreadArray([],__read(t),!1),[i],!1),r,o,n,null,null,convertConv2DDataFormat(a))},computeOptimalWindowSize:function(e){return e<=30?e:nearestDivisor(e,Math.floor(Math.sqrt(e)))},computeOutAndReduceShapes:function(e,t){for(var r=[],n=e.length,a=0;a<n;a++)-1===t.indexOf(a)&&r.push(e[a]);return[r,t.map(function(t){return e[t]})]},computeOutShape:function(e,t){for(var r=e[0].slice(),n=1;n<e.length;n++)r[t]+=e[n][t];return r},computePool2DInfo:computePool2DInfo,computePool3DInfo:function(e,t,r,n,a,o,i){void 0===i&&(i="NDHWC");var s,u,c=__read(parse3TupleParam(t),3),l=c[0],d=c[1],f=c[2];if("NDHWC"===i)u="channelsLast",s=[l,d,f,e[4],e[4]];else if("NCDHW"===i)u="channelsFirst",s=[l,d,f,e[1],e[1]];else throw Error("Unknown dataFormat ".concat(i));return computeConv3DInfo(e,s,r,n,a,!1,u,o)},convertConv2DDataFormat:convertConv2DDataFormat,decodeEinsumEquation:function(e,t){var r=((e=e.replace(/\s/g,"")).length-e.replace(iG,"").length)/2;if(r<1)throw Error("Equations without an arrow are not supported.");if(r>1)throw Error('Equation must contain exactly one arrow ("'.concat("->",'").'));var n=__read(e.split("->"),2),a=n[0],o=n[1];assert(-1===a.indexOf("..."),function(){return'The ellipsis notation ("'.concat("...",'") is not supported yet.')});var i=a.split(","),s=i.length;if(t!==s)throw Error("Expected ".concat(s," input tensors, received ").concat(t));if(s>2)throw Error("Support for more than 2 input tensors is not implemented yet.");for(var u=[],c=0;c<o.length;++c)!function(e){var t=o[e];if(!i.some(function(e){return -1!==e.indexOf(t)}))throw Error("Output subscripts contain the label ".concat(t," ")+"not present in the input subscripts.");-1===u.indexOf(t)&&u.push(t)}(c);for(var c=0;c<a.length;++c){var l=a[c];-1===u.indexOf(l)&&","!==l&&u.push(l)}for(var d=Array(i.length),c=0;c<s;++c){if(new Set(i[c].split("")).size!==i[c].length)throw Error("Found duplicate axes in input component ".concat(i[c],". ")+"Support for duplicate axes in input is not implemented yet.");d[c]=[];for(var f=0;f<i[c].length;++f)d[c].push(u.indexOf(i[c][f]))}for(var p=u.length,h=o.length,m=[],c=h;c<p;++c)m.push(c);return{allDims:u,summedDims:m,idDims:d}},eitherStridesOrDilationsAreOne:eitherStridesOrDilationsAreOne,expandShapeToKeepDim:expandShapeToKeepDim,exponent:function(e,t,r){var n=(r?2:-2)*Math.PI*(e/t);return{real:Math.cos(n),imag:Math.sin(n)}},exponents:function(e,t){for(var r=new Float32Array(e/2),n=new Float32Array(e/2),a=0;a<Math.ceil(e/2);a++){var o=(t?2:-2)*Math.PI*(a/e);r[a]=Math.cos(o),n[a]=Math.sin(o)}return{real:r,imag:n}},fromStringArrayToUint8:function(e){return e.map(function(e){return encodeString(e)})},fromUint8ToStringArray:/**
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
 */function(e,t){var r,n=!1;for(e<=30?(r=e,n=!0):r=nearestDivisor(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=nearestDivisor(e,r+1);return r}},shouldFuse:shouldFuse,slice_util:iH,splitRealAndImagArrays:function(e){for(var t=new Float32Array(e.length/2),r=new Float32Array(e.length/2),n=0;n<e.length;n+=2)t[n/2]=e[n],r[n/2]=e[n+1];return{real:t,imag:r}},stridesOrDilationsArePositive:stridesOrDilationsArePositive,tupleValuesAreOne:tupleValuesAreOne,upcastType:upcastType,validateDefaultValueShape:function(e,t){if(null!=e&&null!=t){var r=e.length,n=t.length;if(r>=n)throw Error("defaultValue.shape=".concat(e," and ragged tensor flatValues.shape=").concat(t,", are incompatible: defaultValue.rank = ").concat(r," must be less than ragged tensor input flatValues.rank = ").concat(n,")"));for(var a=0;a<Math.min(r,n-1);++a){var o=e[a],i=t[a+1];if(o>=0&&i>=0&&1!==o&&o!==i)throw Error("defaultValue.shape=".concat(e,", and ragged tensor input flatValues.shape=").concat(t," are incompatible: defaultValue.shape[").concat(a-e.length,"] = ").concat(o," but ragged tensor input.flatValues.shape[").concat(a-e.length,"] = ").concat(i))}}},validateInput:validateInput$1,validateUpdateShape:validateUpdateShape,warn:warn},t.basicLSTMCell=r6,t.batchNorm=r7,t.batchNorm2d=r8,t.batchNorm3d=r9,t.batchNorm4d=ne,t.batchToSpaceND=r5,t.bincount=nt,t.bitwiseAnd=nr,t.booleanMaskAsync=function(e,t,r){return __awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d,f,p,h,m;return __generator(this,function(g){switch(g.label){case 0:for(n=convertToTensor(e,"tensor","boolMask"),a=convertToTensor(t,"mask","boolMask","bool"),o=null==r?0:r,i=a.rank,s=n.shape,assert(i>0,function(){return"mask cannot be scalar"}),assertShapesMatch(s.slice(o,o+i),a.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=o;c<o+i;c++)u*=s[c];return l=s.slice(0,o).concat([u],s.slice(o+i)),d=rY(n,l),[4,whereAsync(f=rY(a,[-1]))];case 1:return h=o_(p=g.sent(),[1]),m=n$(d,h,o),e!==n&&n.dispose(),t!==a&&a.dispose(),h.dispose(),d.dispose(),f.dispose(),p.dispose(),[2,m]}})})},t.broadcastArgs=nn,t.broadcastTo=na,t.broadcast_util={__proto__:null,assertAndGetBroadcastShape:assertAndGetBroadcastShape,getBroadcastDims:getBroadcastDims,getReductionAxes:getReductionAxes},t.browser={__proto__:null,draw:function(e,t,r){var n=convertToTensor(e,"img","draw");if(!(e instanceof ri)){var a=n;n=rC(a,"int32"),a.dispose()}validateImgTensor(n),function(e){var t=(null==e?void 0:e.alpha)||1;if(t>1||t<0)throw Error("Alpha value ".concat(t," is suppoed to be in range [0 - 1]."))}(null==r?void 0:r.imageOptions);var o={image:n};rd.runKernel(et,o,{canvas:t,options:r})},fromPixels:iZ,fromPixelsAsync:function(e,t){return void 0===t&&(t=3),__awaiter(this,void 0,void 0,function(){var r,n;return __generator(this,function(a){switch(a.label){case 0:var o;if(r=null,!(env().getBool("WRAP_TO_IMAGEBITMAP")&&"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&null!=(o=e)&&0!==o.width&&0!==o.height&&!(null!=e&&e.data instanceof Uint8Array)))return[3,5];n=void 0,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,createImageBitmap(e,{premultiplyAlpha:"none"})];case 2:return n=a.sent(),[3,4];case 3:return a.sent(),n=null,[3,4];case 4:return r=null!=n&&n.width===e.width&&n.height===e.height?n:e,[3,6];case 5:r=e,a.label=6;case 6:return[2,fromPixels_(r,t)]}})})},toPixels:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d,f,p,h,m,g,v;return __generator(this,function(b){switch(b.label){case 0:return r=convertToTensor(e,"img","toPixels"),e instanceof ri||(r=rC(n=r,"int32"),n.dispose()),validateImgTensor(r),o=(a=__read(r.shape.slice(0,2),2))[0],i=a[1],s=2===r.rank?1:r.shape[2],[4,r.data()];case 1:for(d=0,u=b.sent(),c="float32"===r.dtype?255:1,l=new Uint8ClampedArray(i*o*4);d<o*i;++d){for(p=0,f=[0,0,0,255];p<s;p++){if(h=u[d*s+p],"float32"===r.dtype){if(h<0||h>1)throw Error("Tensor values for a float32 Tensor must be in the "+"range [0 - 1] but encountered ".concat(h,"."))}else if("int32"===r.dtype&&(h<0||h>255))throw Error("Tensor values for a int32 Tensor must be in the "+"range [0 - 255] but encountered ".concat(h,"."));1===s?(f[0]=h*c,f[1]=h*c,f[2]=h*c):f[p]=h*c}l[(m=4*d)+0]=Math.round(f[0]),l[m+1]=Math.round(f[1]),l[m+2]=Math.round(f[2]),l[m+3]=Math.round(f[3])}return null!=t&&(iz||null==getKernel(et,rd.backendName)||(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),iz=!0),t.width=i,t.height=o,g=t.getContext("2d"),v=new ImageData(l,i,o),g.putImageData(v,0,0)),r!==e&&r.dispose(),[2,l]}})})}},t.buffer=buffer,t.cast=rC,t.ceil=no,t.clipByValue=ni,t.clone=rj,t.complex=rh,t.concat=r0,t.concat1d=ns,t.concat2d=nu,t.concat3d=nc,t.concat4d=nl,t.conv1d=nf,t.conv2d=nd,t.conv2dTranspose=nh,t.conv3d=nm,t.conv3dTranspose=nv,t.copyRegisteredKernels=function(e,t){getKernelsForBackend(e).forEach(function(e){registerKernel(Object.assign({},e,{backendName:t}))})},t.cos=nb,t.cosh=ny,t.cosineWindow=cosineWindow,t.cumprod=nS,t.cumsum=nP,t.customGrad=customGrad,t.denseBincount=nT,t.deprecationWarn=function(e){env().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")},t.depthToSpace=nx,t.depthwiseConv2d=n_,t.device_util={__proto__:null,isBrowser:isBrowser,isMobile:function(e){if(void 0!==u)return u;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;var t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){var r=e;return r.userAgentData&&r.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1},mockIsMobile:function(e){u=e}},t.diag=nA,t.dilation2d=nO,t.disableDeprecationWarnings=function(){env().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")},t.dispose=dispose,t.disposeVariables=function(){rd.disposeVariables()},t.div=rN,t.divNoNan=nD,t.dot=nM,t.dropout=oz,t.einsum=nC,t.elu=nj,t.enableDebugMode=function(){env().set("DEBUG",!0)},t.enableProdMode=/**
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
 */function(){env().set("PROD",!0)},t.enclosingPowerOfTwo=enclosingPowerOfTwo,t.engine=function(){return rd},t.ensureShape=nR,t.env=env,t.equal=nw,t.erf=nI,t.euclideanNorm=nV,t.exp=nU,t.expandDims=nG,t.expm1=nW,t.eye=nq,t.fft=ob,t.fill=fill,t.findBackend=function(e){return rd.findBackend(e)},t.findBackendFactory=function(e){return rd.findBackendFactory(e)},t.floor=nX,t.floorDiv=rI,t.fused={__proto__:null,conv2d:oH,depthwiseConv2d:oG,matMul:oW},t.gather=n$,t.gatherND=oF,t.gather_util={__proto__:null,prepareAndValidate:prepareAndValidate},t.getBackend=getBackend,t.getGradient=getGradient,t.getKernel=getKernel,t.getKernelsForBackend=getKernelsForBackend,t.grad=function(e){return assert(isFunction(e),function(){return"The f passed in grad(f) must be a function"}),function(t,r){var n=convertToTensor(t,"x","tf.grad","string_or_numeric"),a=null!=r?convertToTensor(r,"dy","tf.grad"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e(n)},[n],a),r=t.value,o=t.grads;return null!=a&&assertShapesMatch(r.shape,a.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),checkGrads(o),o[0]})}},t.grads=function(e){return assert(isFunction(e),function(){return"The f passed in grads(f) must be a function"}),function(t,r){assert(Array.isArray(t),function(){return"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s"});var n=convertToTensorArray(t,"args","tf.grads","string_or_numeric"),a=null!=r?convertToTensor(r,"dy","tf.grads"):null;return rd.tidy(function(){var t=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(n),!1))},n,a),r=t.value,o=t.grads;return null!=a&&assertShapesMatch(r.shape,a.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(o),o})}},t.greater=nY,t.greaterEqual=nJ,t.ifft=oy,t.imag=nQ,t.image={flipLeftRight:oJ,grayscaleToRGB:oQ,resizeNearestNeighbor:o5,resizeBilinear:o6,rgbToGrayscale:o0,rotateWithOffset:o1,cropAndResize:oY,nonMaxSuppression:o2,nonMaxSuppressionAsync:function(e,t,r,n,a){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),__awaiter(this,void 0,void 0,function(){var o,i,s,u,c;return __generator(this,function(l){switch(l.label){case 0:return o=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),i=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(s=nonMaxSuppSanityCheck(o,i,r,n,a)).maxOutputSize,n=s.iouThreshold,a=s.scoreThreshold,[4,Promise.all([o.data(),i.data()])];case 1:return c=nonMaxSuppressionV3Impl((u=l.sent())[0],u[1],r,n,a).selectedIndices,o!==e&&o.dispose(),i!==t&&i.dispose(),[2,tensor1d(c,"int32")]}})})},nonMaxSuppressionWithScore:o3,nonMaxSuppressionWithScoreAsync:function(e,t,r,n,a,o){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=0),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,f;return __generator(this,function(p){switch(p.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),r=(u=nonMaxSuppSanityCheck(i,s,r,n,a,o)).maxOutputSize,n=u.iouThreshold,a=u.scoreThreshold,o=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return d=(l=nonMaxSuppressionV5Impl((c=p.sent())[0],c[1],r,n,a,o)).selectedIndices,f=l.selectedScores,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(d,"int32"),selectedScores:tensor1d(f)}]}})})},nonMaxSuppressionPadded:o4,nonMaxSuppressionPaddedAsync:function(e,t,r,n,a,o){return void 0===n&&(n=.5),void 0===a&&(a=Number.NEGATIVE_INFINITY),void 0===o&&(o=!1),__awaiter(this,void 0,void 0,function(){var i,s,u,c,l,d,f,p,h,m;return __generator(this,function(g){switch(g.label){case 0:return i=convertToTensor(e,"boxes","nonMaxSuppressionAsync"),s=convertToTensor(t,"scores","nonMaxSuppressionAsync"),c=(u=nonMaxSuppSanityCheck(i,s,r,n,a,null)).maxOutputSize,l=u.iouThreshold,d=u.scoreThreshold,[4,Promise.all([i.data(),s.data()])];case 1:return h=(p=nonMaxSuppressionV4Impl((f=__read.apply(void 0,[g.sent(),2]))[0],f[1],c,l,d,o)).selectedIndices,m=p.validOutputs,i!==e&&i.dispose(),s!==t&&s.dispose(),[2,{selectedIndices:tensor1d(h,"int32"),validOutputs:scalar(m,"int32")}]}})})},threshold:o7,transform:o8},t.inTopKAsync=function(e,t,r){return void 0===r&&(r=1),__awaiter(this,void 0,void 0,function(){var n,a,o,i,s,u,c,l,d,f,p,h,m,g;return __generator(this,function(v){switch(v.label){case 0:return n=convertToTensor(e,"predictions","inTopK"),a=convertToTensor(t,"targets","inTopK"),assert(n.rank>1,function(){return"inTopK() expects the predictions to be of rank 2 or higher, "+"but got ".concat(n.rank)}),assert(n.rank-1===a.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+"".concat(n.rank," and targets rank ").concat(a.rank)}),assertShapesMatch(n.shape.slice(0,n.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),o=n.shape[n.shape.length-1],assert(r>0&&r<=o,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last "+"dimension (".concat(o,"), but got ").concat(r)}),[4,n.data()];case 1:return i=v.sent(),[4,a.data()];case 2:for(s=v.sent(),c=(u=__read([i.length/o,o],2))[0],l=u[1],d=getArrayFromDType("bool",c),f=0;f<c;f++){for(g=0,p=f*l,h=i.subarray(p,p+l),m=[];g<h.length;g++)m.push({value:h[g],index:g});for(m.sort(function(e,t){return t.value-e.value}),d[f]=0,g=0;g<r;g++)if(m[g].index===s[f]){d[f]=1;break}}return e!==n&&n.dispose(),t!==a&&a.dispose(),[2,tensor(d,a.shape,"bool")]}})})},t.io={__proto__:null,CompositeArrayBuffer:rg,browserFiles:function(e){return new iI(e)},browserHTTPRequest:function(e,t){return http(e,t)},concatenateArrayBuffers:function(e){return rg.join(e)},copyModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!1)]})})},decodeWeights:decodeWeights,decodeWeightsStream:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d,f,p,h=this;return __generator(this,function(m){switch(m.label){case 0:r={},n=e.getReader(),a=new ArrayBuffer(0),m.label=1;case 1:m.trys.push([1,7,8,9]),i=(o=__values(t)).next(),m.label=2;case 2:if(i.done)return[3,6];return[4,function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:if(r=sizeFromShape(e.shape),!("quantization"in e))return[3,1];return n=rm[e.quantization.dtype],[3,7];case 1:if("string"!==e.dtype)return[3,6];a=0,o=0,c.label=2;case 2:if(!(o<r))return[3,5];return i=a,s=4,u=Uint32Array.bind,[4,t(a,a+4)];case 3:a=i+(s+new(u.apply(Uint32Array,[void 0,c.sent()]))()[0]),c.label=4;case 4:return o++,[3,2];case 5:return[2,a];case 6:n=rm[e.dtype],c.label=7;case 7:return[2,r*n]}})})}(s=i.value,function(e,t){return __awaiter(h,void 0,void 0,function(){return __generator(this,function(r){switch(r.label){case 0:return[4,readToLength(n,a,t)];case 1:return[2,(a=r.sent()).slice(e,t)]}})})})];case 3:return u=m.sent(),[4,readToLength(n,a,u)];case 4:c=(a=m.sent()).slice(0,u),a=a.slice(u),l=decodeWeight(s,c),r[s.name]=l,"webgpu"===getBackend()&&"uploadToGPU"in(d=backend())&&sizeFromShape(l.shape)>=env().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&d.uploadToGPU(l.dataId),m.label=5;case 5:return i=o.next(),[3,2];case 6:return[3,9];case 7:return f={error:m.sent()},[3,9];case 8:try{i&&!i.done&&(p=o.return)&&p.call(o)}finally{if(f)throw f.error}return[7];case 9:return[2,r]}})})},encodeWeights:function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s=this;return __generator(this,function(u){switch(u.label){case 0:for(i=0,r=[],n=[],a=Array.isArray(e)?e.map(function(e){return e.name}):Object.keys(e),o=function(o){var i=a[o],u=Array.isArray(e)?e[o].tensor:e[i];if("float32"!==u.dtype&&"int32"!==u.dtype&&"bool"!==u.dtype&&"string"!==u.dtype&&"complex64"!==u.dtype)throw Error("Unsupported dtype in weight '".concat(i,"': ").concat(u.dtype));var c={name:i,shape:u.shape,dtype:u.dtype};if("string"===u.dtype){var l=new Promise(function(e){return __awaiter(s,void 0,void 0,function(){var t,r,n,a,o,i,s;return __generator(this,function(c){switch(c.label){case 0:return[4,u.bytes()];case 1:for(o=0,r=(t=c.sent()).reduce(function(e,t){return e+t.length},0)+4*t.length,n=new Uint8Array(r),a=0;o<t.length;o++)i=t[o],s=new Uint8Array(new Uint32Array([i.length]).buffer),n.set(s,a),a+=4,n.set(i,a),a+=i.length;return e(n),[2]}})})});n.push(l)}else n.push(u.data());null!=t&&(c.group=t),r.push(c)};i<a.length;++i)o(i);return[4,Promise.all(n)];case 1:return[2,{data:function(e){if(null===e)throw Error("Invalid input value: ".concat(JSON.stringify(e)));var t=0,r=[];e.forEach(function(e){if(t+=e.byteLength,r.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error("Unsupported TypedArray subtype: ".concat(e.constructor.name))});var n=new Uint8Array(t),a=0;return r.forEach(function(e){n.set(new Uint8Array(e.buffer),a),a+=e.byteLength}),n.buffer}(u.sent()),specs:r}]}})})},fromMemory:function(e,t,r,n){var a=arguments;return new PassthroughAsync(fromMemorySync.apply(void 0,__spreadArray([],__read(a),!1)))},fromMemorySync:fromMemorySync,getLoadHandlers:function(e,t){return rb.getLoadHandlers(e,t)},getModelArtifactsForJSON:getModelArtifactsForJSON,getModelArtifactsForJSONSync:getModelArtifactsForJSONSync,getModelArtifactsInfoForJSON:getModelArtifactsInfoForJSON,getSaveHandlers:function(e){return rb.getSaveHandlers(e)},getWeightSpecs:getWeightSpecs,http:http,isHTTPScheme:isHTTPScheme,listModels:function(){return __awaiter(this,void 0,void 0,function(){var e,t,r,n,a,o,i,s,u;return __generator(this,function(c){switch(c.label){case 0:e=rE.getSchemes(),t={},c.label=1;case 1:c.trys.push([1,6,7,8]),n=(r=__values(e)).next(),c.label=2;case 2:if(n.done)return[3,5];return a=n.value,[4,rE.getManager(a).listModels()];case 3:for(i in o=c.sent())t[a+"://"+i]=o[i];c.label=4;case 4:return n=r.next(),[3,2];case 5:return[3,8];case 6:return s={error:c.sent()},[3,8];case 7:try{n&&!n.done&&(u=r.return)&&u.call(r)}finally{if(s)throw s.error}return[7];case 8:return[2,t]}})})},loadWeights:function(e,t,r,n){return void 0===t&&(t=""),__awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2,weightsLoaderFactory(function(e){return loadWeightsAsArrayBuffer(e,{requestInit:n})})(e,t,r)]})})},moveModel:function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(r){return[2,cloneModelInternal(e,t,!0)]})})},registerLoadRouter:function(e){return rb.registerLoadRouter(e)},registerSaveRouter:function(e){return rb.registerSaveRouter(e)},removeModel:function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(r){return t=parseURL(e),[2,rE.getManager(t.scheme).removeModel(t.path)]})})},weightsLoaderFactory:weightsLoaderFactory,withSaveHandler:function(e){return new iB(e)},withSaveHandlerSync:function(e){return new iB(e)}},t.irfft=oS,t.isFinite=n0,t.isInf=n1,t.isNaN=n2,t.keep=keep,t.kernel_impls={__proto__:null,nonMaxSuppressionV3Impl:nonMaxSuppressionV3Impl,nonMaxSuppressionV4Impl:nonMaxSuppressionV4Impl,nonMaxSuppressionV5Impl:nonMaxSuppressionV5Impl,whereImpl:whereImpl},t.leakyRelu=n3,t.less=n4,t.lessEqual=n6,t.linalg={bandPart:o9,gramSchmidt:ie,qr:it},t.linspace=/**
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
 */function(e,t,r){if(r<=0)throw Error("The number of values should be positive.");return rd.runKernel(eA,{},{start:e,stop:t,num:r})},t.localResponseNormalization=n5,t.log=n7,t.log1p=n8,t.logSigmoid=at,t.logSoftmax=an,t.logSumExp=aa,t.logicalAnd=ao,t.logicalNot=ai,t.logicalOr=as,t.logicalXor=au,t.losses={absoluteDifference:ia,computeWeightedLoss:ir,cosineDistance:io,hingeLoss:ii,huberLoss:is,logLoss:iu,meanSquaredError:ic,sigmoidCrossEntropy:il,softmaxCrossEntropy:id},t.lowerBound=/**
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
 */function(e,t){return ac(e,t,"left")},t.matMul=r1,t.math={__proto__:null,confusionMatrix:iF},t.max=nN,t.maxPool=al,t.maxPool3d=ad,t.maxPoolWithArgmax=af,t.maximum=ap,t.mean=ah,t.memory=function(){return rd.memory()},t.meshgrid=/**
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
 */function(e,t,r){var n=(void 0===r?{}:r).indexing,a=void 0===n?"xy":n;if("xy"!==a&&"ij"!==a)throw TypeError("".concat(a," is not a valid third argument to meshgrid"));if(void 0===e)return[];var o=convertToTensor(e,"x","meshgrid",e instanceof ri?e.dtype:"float32");if(void 0===t)return[o];var i=convertToTensor(t,"y","meshgrid",t instanceof ri?t.dtype:"float32"),s=sizeFromShape(o.shape),u=sizeFromShape(i.shape);return"xy"===a?(o=rY(o,[1,-1]),i=rY(i,[-1,1]),[r1(ones([u,1],o.dtype),o),r1(i,ones([1,s],i.dtype))]):(o=rY(o,[-1,1]),i=rY(i,[1,-1]),[r1(o,ones([1,u],o.dtype)),r1(ones([s,1],i.dtype),i)])},t.min=nL,t.minimum=am,t.mirrorPad=ag,t.mod=av,t.moments=ab,t.movingAverage=oN,t.mul=rL,t.multiRNNCell=ay,t.multinomial=aS,t.neg=n9,t.nextFrame=function(){return new Promise(function(e){return iU(function(){return e()})})},t.norm=nH,t.notEqual=aP,t.oneHot=aT,t.ones=ones,t.onesLike=ax,t.op=op,t.outerProduct=a_,t.pad=aA,t.pad1d=aO,t.pad2d=aw,t.pad3d=aE,t.pad4d=ak,t.pool=aM,t.pow=nB,t.prelu=aC,t.print=print,t.prod=aj,t.profile=function(e){return rd.profile(e)},t.raggedGather=aR,t.raggedRange=aI,t.raggedTensorToTensor=aN,t.rand=aL,t.randomGamma=a1,t.randomNormal=a2,t.randomStandardNormal=a3,t.randomUniform=a4,t.randomUniformInt=a6,t.range=range,t.ready=function(){return rd.ready()},t.real=a5,t.reciprocal=a7,t.registerBackend=function(e,t,r){return void 0===r&&(r=1),rd.registerBackend(e,t,r)},t.registerGradient=function(e){var t=e.kernelName;tz.has(t)&&env().getBool("DEBUG")&&warn("Overriding the gradient for '".concat(t,"'")),tz.set(t,e)},t.registerKernel=registerKernel,t.relu=a8,t.relu6=a9,t.removeBackend=function(e){rd.removeBackend(e)},t.reshape=rY,t.reverse=oe,t.reverse1d=ot,t.reverse2d=or,t.reverse3d=on,t.reverse4d=oa,t.rfft=oT,t.round=oo,t.rsqrt=oi,t.scalar=scalar,t.scatterND=oL,t.scatter_util={__proto__:null,calculateShapes:calculateShapes,validateInput:validateInput$1,validateUpdateShape:validateUpdateShape},t.searchSorted=ac,t.selu=os,t.separableConv2d=ou,t.serialization={__proto__:null,Serializable:ix,SerializationMap:i_,getRegisteredName:function(e){return iT.has(e)?iT.get(e):e.className},registerClass:registerClass},t.setBackend=function(e){return rd.setBackend(e)},t.setPlatform=function(e,t){env().setPlatform(e,t)},t.setdiff1dAsync=function(e,t){return __awaiter(this,void 0,void 0,function(){var r,n,a,o,i,s,u,c,l,d;return __generator(this,function(f){switch(f.label){case 0:return r=convertToTensor(e,"x","setdiff1d"),n=convertToTensor(t,"y","setdiff1d"),assert(r.dtype===n.dtype,function(){return"x and y should have the same dtype, but got x (".concat(r.dtype,") and y (").concat(n.dtype,").")}),assert(1===r.rank,function(){return"x should be 1D tensor, but got x (".concat(r.shape,").")}),assert(1===n.rank,function(){return"y should be 1D tensor, but got y (".concat(n.shape,").")}),[4,r.data()];case 1:return a=f.sent(),[4,n.data()];case 2:for(u=0,o=f.sent(),i=new Set(o),s=0;u<a.length;u++)!i.has(a[u])&&s++;for(u=0,c=new rn([s],r.dtype),l=new rn([s],"int32"),d=0;u<a.length;u++)!i.has(a[u])&&(c.values[d]=a[u],l.values[d]=u,d++);return[2,[c.toTensor(),l.toTensor()]]}})})},t.sigmoid=r2,t.sign=oc,t.signal={hammingWindow:oK,hannWindow:oq,frame:oX,stft:o$},t.sin=ol,t.sinh=od,t.slice=r3,t.slice1d=of,t.slice2d=oh,t.slice3d=om,t.slice4d=og,t.slice_util=iH,t.softmax=ov,t.softplus=ae,t.spaceToBatchND=aD,t.sparse={sparseFillEmptyRows:ip,sparseReshape:ih,sparseSegmentMean:im,sparseSegmentSum:ig},t.sparseToDense=oB,t.spectral={fft:ob,ifft:oy,rfft:oT,irfft:oS},t.split=oP,t.sqrt=nF,t.square=nz,t.squaredDifference=ox,t.squeeze=o_,t.stack=oA,t.step=oO,t.stridedSlice=ow,t.string={stringNGrams:iv,stringSplit:ib,stringToHashBucketFast:iy,staticRegexReplace:iS},t.sub=ar,t.sum=nZ,t.sumOutType=function(e){return upcastType(e,"int32")},t.tan=oE,t.tanh=r4,t.tensor=tensor,t.tensor1d=tensor1d,t.tensor2d=tensor2d,t.tensor3d=tensor3d,t.tensor4d=/**
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
 */function(e,t,r){if(assertNonNull(e),null!=t&&6!==t.length)throw Error("tensor6d() requires shape to have six numbers");var n=inferShape(e,r);if(6!==n.length&&1!==n.length)throw Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor6d() requires shape to be provided when `values` are a flat array");return makeTensor(e,t=t||n,n,r)},t.tensorScatterUpdate=ok,t.tensor_util={__proto__:null,assertTypesMatch:assertTypesMatch,getTensorsInContainer:getTensorsInContainer,isTensorInList:function(e,t){return t.some(function(t){return t.id===e.id})},makeTypesMatch:makeTypesMatch},t.test_util={__proto__:null,TEST_EPSILON_FLOAT16:.1,createVideoElement:function(e){var t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(function(e){t.addEventListener("loadeddata",function(r){return e(t)}),t.load()})},encodeStrings:function encodeStrings(e){for(var t=0;t<e.length;t++){var r=e[t];Array.isArray(r)?encodeStrings(r):e[t]=encodeString(r)}return e},expectArrayBuffersEqual:function(e,t){var r=new Float32Array(e),n=new Float32Array(t);if(r.length!==n.length)throw Error("Expected ArrayBuffer to be of length "+"".concat(n.length,", but it was ").concat(r.length));for(var a=0;a<n.length;a++)if(r[a]!==n[a])throw Error("Expected ArrayBuffer value at ".concat(a," to be ")+"".concat(n[a]," but got ").concat(r[a]," instead"))},expectArraysClose:function(e,t,r){return null==r&&(r=testEpsilon()),expectArraysPredicate(e,t,function(e,t){return areClose(e,t,r)})},expectArraysEqual:function(e,t){var r="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return isString(e)||isString(e[0])||isString(t)||isString(t[0])?expectArraysPredicate(e,r,function(e,t){return e==t}):expectArraysPredicate(e,t,function(e,t){return areClose(e,t,0)})},expectNumbersClose:function(e,t,r){if(null==r&&(r=testEpsilon()),!areClose(e,t,r))throw Error("Numbers differ: actual === ".concat(e,", expected === ").concat(t));"undefined"!=typeof expect&&expect().nothing()},expectPromiseToFail:function(e,t){e().then(function(){return t.fail()},function(){return t()}),"undefined"!=typeof expect&&expect().nothing()},expectValuesInRange:function(e,t,r){for(var n=0;n<e.length;n++)if(e[n]<t||e[n]>r)throw Error("Value out of range:".concat(e[n]," low: ").concat(t,", high: ").concat(r))},play:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,e.play()];case 1:if(t.sent(),!("requestVideoFrameCallback"in e))return[3,3];return[4,new Promise(function(t){e.requestVideoFrameCallback(t)})];case 2:t.sent(),t.label=3;case 3:return[2]}})})},testEpsilon:testEpsilon},t.tidy=tidy,t.tile=nK,t.time=function(e){return rd.time(e)},t.topk=oD,t.train=iV,t.transpose=oI,t.truncatedNormal=oM,t.unique=oC,t.unregisterGradient=function(e){if(!tz.has(e))throw Error("The gradient '".concat(e,"' for backend is not registered"));tz.delete(e)},t.unregisterKernel=function(e,t){var r=makeKey(e,t);if(!tF.has(r))throw Error("The kernel '".concat(e,"' for backend ")+"'".concat(t,"' is not registered"));tF.delete(r)},t.unsortedSegmentSum=oj,t.unstack=oR,t.upcastType=upcastType,t.upperBound=/**
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
 */function(e,t){return ac(e,t,"right")},t.util={__proto__:null,arraysEqual:arraysEqual,arraysEqualWithNull:arraysEqualWithNull,assert:assert,assertNonNegativeIntegerDimensions:assertNonNegativeIntegerDimensions,assertNonNull:assertNonNull,assertShapesMatch:assertShapesMatch,bytesFromStringArray:bytesFromStringArray,bytesPerElement:bytesPerElement,checkConversionForErrors:checkConversionForErrors,clamp:clamp,computeStrides:computeStrides,convertBackendValuesAndArrayBuffer:function(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error("Unknown dtype ".concat(t))},createScalarValue:function(e,t){return"string"===t?encodeString(e):toTypedArray([e],t)},createShuffledIndices:function(e){for(var t=new Uint32Array(e),r=0;r<e;++r)t[r]=r;return shuffle(t),t},decodeString:decodeString,distSquared:function(e,t){for(var r=0,n=0;n<e.length;n++){var a=Number(e[n])-Number(t[n]);r+=a*a}return r},encodeString:encodeString,fetch:function(e,t){return env().platform.fetch(e,t)},fingerPrint64:function(e,t){void 0===t&&(t=e.length);var r,n,a,o,i,s,u,c,l,d,f,p,h,m,g,v,b,y,S,P,T=t7.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t){if(void 0===t&&(t=e.length),t>=8){var r=re.add(2*t),n=fetch64(e,0).add(re),a=fetch64(e,t-8),o=rotate64(a,37).mul(r).add(n);return hashLen16(o,rotate64(n,25).add(a).mul(r),r)}if(t>=4){var r=re.add(2*t),n=fetch$2(e,0,4);return hashLen16(n.shl(3).add(t),fetch$2(e,t-4,4),r)}if(t>0){var n=e[0],a=e[t>>1],o=e[t-1],i=n+(a<<8),s=t+(o<<2);return shiftMix(re.mul(i).xor(t8.mul(s))).mul(re)}return re}(e,t):(void 0===(r=t)&&(r=e.length),n=re.add(2*r),a=fetch64(e,0).mul(t9),o=fetch64(e,8),i=fetch64(e,r-8).mul(n),s=fetch64(e,r-16).mul(re),hashLen16(rotate64(a.add(o),43).add(rotate64(i,30)).add(s),a.add(rotate64(o.add(re),18)).add(i),n));if(t<=64)return void 0===(u=t)&&(u=e.length),c=re.add(2*u),l=fetch64(e,0).mul(re),d=fetch64(e,8),f=fetch64(e,u-8).mul(c),p=fetch64(e,u-16).mul(re),m=hashLen16(h=rotate64(l.add(d),43).add(rotate64(f,30)).add(p),l.add(rotate64(d.add(re),18)).add(f),c),g=fetch64(e,16).mul(c),v=fetch64(e,24),b=h.add(fetch64(e,u-32)).mul(c),y=m.add(fetch64(e,u-24)).mul(c),hashLen16(rotate64(g.add(v),43).add(rotate64(b,30)).add(y),g.add(rotate64(v.add(l),18)).add(b),c);var x=T,_=T.mul(t9).add(113),A=shiftMix(_.mul(re).add(113)).mul(re),O=[t7.UZERO,t7.UZERO],w=[t7.UZERO,t7.UZERO];x=x.mul(re).add(fetch64(e,0));var E=0,k=(t-1>>6)*64,D=k+(t-1&63)-63;do x=rotate64(x.add(_).add(O[0]).add(fetch64(e,E+8)),37).mul(t9),_=rotate64(_.add(O[1]).add(fetch64(e,E+48)),42).mul(t9),x=x.xor(w[1]),_=_.add(O[0]).add(fetch64(e,E+40)),A=rotate64(A.add(w[0]),33).mul(t9),O=weakHashLen32WithSeedsStr(e,E,O[1].mul(t9),x.add(w[0])),w=weakHashLen32WithSeedsStr(e,E+32,A.add(w[1]),_.add(fetch64(e,E+16))),A=(S=__read([x,A],2))[0],x=S[1],E+=64;while(E!==k);var M=t9.add(A.and(255).shl(1));return E=D,w[0]=w[0].add(t-1&63),O[0]=O[0].add(w[0]),w[0]=w[0].add(O[0]),x=rotate64(x.add(_).add(O[0]).add(fetch64(e,E+8)),37).mul(M),_=rotate64(_.add(O[1]).add(fetch64(e,E+48)),42).mul(M),x=x.xor(w[1].mul(9)),_=_.add(O[0].mul(9).add(fetch64(e,E+40))),A=rotate64(A.add(w[0]),33).mul(M),O=weakHashLen32WithSeedsStr(e,E,O[1].mul(M),x.add(w[0])),w=weakHashLen32WithSeedsStr(e,E+32,A.add(w[1]),_.add(fetch64(e,E+16))),A=(P=__read([x,A],2))[0],x=P[1],hashLen16(hashLen16(O[0],w[0],M).add(shiftMix(_).mul(t8)).add(A),hashLen16(O[1],w[1],M).add(x),M)},flatten:flatten,getArrayFromDType:getArrayFromDType,getTypedArrayFromDType:function(e,t){return getArrayFromDType(e,t)},hasEncodingLoss:function(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)},hexToLong:hexToLong,indexToLoc:function(e,t,r){if(0===t)return[];if(1===t)return[e];for(var n=Array(t),a=0;a<n.length-1;++a)n[a]=Math.floor(e/r[a]),e-=n[a]*r[a];return n[n.length-1]=e,n},inferDtype:inferDtype,inferFromImplicitShape:function(e,t){for(var r=1,n=-1,a=0;a<e.length;++a)if(e[a]>=0)r*=e[a];else if(-1===e[a]){if(-1!==n)throw Error("Shapes can only have 1 implicit size. "+"Found -1 at dim ".concat(n," and dim ").concat(a));n=a}else if(e[a]<0)throw Error("Shapes can not be < 0. Found ".concat(e[a]," at dim ").concat(a));if(-1===n){if(t>0&&t!==r)throw Error("Size(".concat(t,") must match the product of shape ").concat(e));return e}if(0===r)throw Error("Cannot infer the missing size in [".concat(e,"] when ")+"there are 0 elements");if(t%r!=0)throw Error("The implicit shape can't be a fractional number. "+"Got ".concat(t," / ").concat(r));var o=e.slice();return o[n]=t/r,o},isBoolean:isBoolean,isFunction:isFunction,isInt:isInt,isNumber:isNumber,isPromise:isPromise,isScalarShape:function(e){return 0===e.length},isString:isString,isTypedArray:isTypedArray,isValidDtype:isValidDtype,locToIndex:function(e,t,r){if(0===t)return 0;if(1===t)return e[0];for(var n=e[e.length-1],a=0;a<e.length-1;++a)n+=r[a]*e[a];return n},makeOnesTypedArray:makeOnesTypedArray,makeZerosNestedTypedArray:function(e,t){var r=e.reduce(function(e,t){return e*t},1);if(null==t||"float32"===t)return toNestedArray(e,new Float32Array(r));if("int32"===t)return toNestedArray(e,new Int32Array(r));if("bool"===t)return toNestedArray(e,new Uint8Array(r));throw Error("Unknown data type ".concat(t))},makeZerosTypedArray:makeZerosTypedArray,nearestDivisor:nearestDivisor,nearestLargerEven:function(e){return e%2==0?e:e+1},now:now,parseAxisParam:parseAxisParam,randUniform:function(e,t){var r=Math.random();return t*r+(1-r)*e},repeatedTry:function(e,t,r,n){return void 0===t&&(t=function(e){return 0}),new Promise(function(a,o){var i=0,tryFn=function(){if(e()){a();return}i++;var s=t(i);if(null!=r&&i>=r){o();return}null!=n?n(tryFn,s):setTimeout(tryFn,s)};tryFn()})},rightPad:rightPad,shuffle:shuffle,shuffleCombo:function(e,t){if(e.length!==t.length)throw Error("Array sizes must match to be shuffled together "+"First array length was ".concat(e.length)+"Second array length was ".concat(t.length));for(var r=e.length,n=0;r>0;)n=Math.random()*r|0,swap(e,--r,n),swap(t,r,n)},sizeFromShape:sizeFromShape,sizeToSquarishShape:function(e){var t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]},squeezeShape:squeezeShape,sum:function(e){for(var t=0,r=0;r<e.length;r++)t+=e[r];return t},swap:swap,tanh:function(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return -1;var t=Math.exp(2*e);return(t-1)/(t+1)},toNestedArray:toNestedArray,toTypedArray:toTypedArray},t.valueAndGrad=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrad(f) must be a function"}),function(t,r){assert(t instanceof ri,function(){return"The x passed in valueAndGrad(f)(x) must be a tensor"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrad(f)(x, dy) must be a tensor"});var n=rd.gradients(function(){return e(t)},[t],r),a=n.grads,o=n.value;return checkGrads(a),{grad:a[0],value:o}}},t.valueAndGrads=function(e){return assert(isFunction(e),function(){return"The f passed in valueAndGrads(f) must be a function"}),function(t,r){assert(Array.isArray(t)&&t.every(function(e){return e instanceof ri}),function(){return"The args passed in valueAndGrads(f)(args) must be array of tensors"}),assert(null==r||r instanceof ri,function(){return"The dy passed in valueAndGrads(f)(args, dy) must be a tensor"});var n=rd.gradients(function(){return e.apply(void 0,__spreadArray([],__read(t),!1))},t,r);return null!=r&&assertShapesMatch(n.value.shape,r.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),checkGrads(n.grads),n}},t.variable=/**
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
 */function(e,t,r,n){return void 0===t&&(t=!0),rd.makeVariable(e,t,r,n)},t.variableGrads=variableGrads,t.version_core="4.22.0",t.where=nE,t.whereAsync=whereAsync,t.zeros=zeros,t.zerosLike=nk},39940:(e,t,r)=>{t.iF=t.UI=t.DC=t.bJ=void 0,r(54845),r(75763),r(65650),r(23802),r(98451),r(5174),r(59188),r(63242),r(88742),r(88826),r(8681),r(5246),r(62836),r(17646);var n=r(37970);Object.defineProperty(t,"bJ",{enumerable:!0,get:function(){return n.concatMap}}),r(25922),r(69262),r(81071),r(10788),r(55557),r(40999),r(62475),r(8269),r(35463);var a=r(84835);Object.defineProperty(t,"DC",{enumerable:!0,get:function(){return a.dematerialize}}),r(24730),r(59615),r(8775),r(47395),r(23080),r(70455),r(10770),r(14914),r(1147),r(69833),r(98),r(78785),r(88350),r(34538),r(26055),r(67128),r(45173),r(1434),r(340);var o=r(85920);Object.defineProperty(t,"UI",{enumerable:!0,get:function(){return o.map}}),r(70953);var i=r(93890);Object.defineProperty(t,"iF",{enumerable:!0,get:function(){return i.materialize}}),r(17417),r(82505),r(13536),r(71294),r(96660),r(70329),r(1199),r(59148),r(53640),r(43937),r(57125),r(57459),r(49510),r(34412),r(38668),r(68882),r(6921),r(96877),r(54962),r(15945),r(43249),r(31745),r(74790),r(37022),r(74679),r(32974),r(16326),r(7398),r(75611),r(20707),r(17516),r(33782),r(48527),r(86573),r(89818),r(73710),r(42712),r(74590),r(90652),r(83300),r(93462),r(74545),r(65954),r(64309),r(95929),r(47286),r(13840),r(68819),r(50632),r(63010),r(56207),r(50630),r(5807),r(63341),r(73016),r(50681),r(8594),r(54764),r(4459),r(6885),r(7163),r(12089),r(97210),r(12647),r(19272),r(65277)},58966:(e,t,r)=>{r.d(t,{T:()=>merge});var n=r(34353),a=r(278),o=r(75427),i=r(47266),s=r(95754);function merge(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=(0,i.yG)(e),u=(0,i._6)(e,1/0);return e.length?1===e.length?(0,a.Xf)(e[0]):(0,n.J)(u)((0,s.D)(e,r)):o.E}},74934:(e,t,r)=>{r.d(t,{R:()=>scan});var n=r(74317),a=r(11882);function scan(e,t){var r;return(0,n.e)((r=arguments.length>=2,function(n,o){var i=r,s=t,u=0;n.subscribe((0,a.x)(o,function(t){var r=u++;s=i?e(s,t,r):(i=!0,t),o.next(s)},void 0))}))}},40401:(e,t,r)=>{r.d(t,{d:()=>shareReplay});var n=r(90222),a=r(12530),o=r(32067),i=function(e){function ReplaySubject(t,r,n){void 0===t&&(t=1/0),void 0===r&&(r=1/0),void 0===n&&(n=o.l);var a=e.call(this)||this;return a._bufferSize=t,a._windowTime=r,a._timestampProvider=n,a._buffer=[],a._infiniteTimeWindow=!0,a._infiniteTimeWindow=r===1/0,a._bufferSize=Math.max(1,t),a._windowTime=Math.max(1,r),a}return(0,n.__extends)(ReplaySubject,e),ReplaySubject.prototype.next=function(t){var r=this.isStopped,n=this._buffer,a=this._infiniteTimeWindow,o=this._timestampProvider,i=this._windowTime;!r&&(n.push(t),a||n.push(o.now()+i)),this._trimBuffer(),e.prototype.next.call(this,t)},ReplaySubject.prototype._subscribe=function(e){this._throwIfClosed(),this._trimBuffer();for(var t=this._innerSubscribe(e),r=this._infiniteTimeWindow,n=this._buffer.slice(),a=0;a<n.length&&!e.closed;a+=r?1:2)e.next(n[a]);return this._checkFinalizedStatuses(e),t},ReplaySubject.prototype._trimBuffer=function(){var e=this._bufferSize,t=this._timestampProvider,r=this._buffer,n=this._infiniteTimeWindow,a=(n?1:2)*e;if(e<1/0&&a<r.length&&r.splice(0,r.length-a),!n){for(var o=t.now(),i=0,s=1;s<r.length&&r[s]<=o;s+=2)i=s;i&&r.splice(0,i+1)}},ReplaySubject}(a.x),s=r(46891);function shareReplay(e,t,r){var n,a,o,u,c=!1;return e&&"object"==typeof e?(u=void 0===(n=e.bufferSize)?1/0:n,t=void 0===(a=e.windowTime)?1/0:a,c=void 0!==(o=e.refCount)&&o,r=e.scheduler):u=null!=e?e:1/0,(0,s.B)({connector:function(){return new i(u,t,r)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:c})}},84518:(e,t,r)=>{r.d(t,{w:()=>switchMap});var n=r(278),a=r(74317),o=r(11882);function switchMap(e,t){return(0,a.e)(function(r,a){var i=null,s=0,u=!1,checkComplete=function(){return u&&!i&&a.complete()};r.subscribe((0,o.x)(a,function(r){null==i||i.unsubscribe();var u=0,c=s++;(0,n.Xf)(e(r,c)).subscribe(i=(0,o.x)(a,function(e){return a.next(t?t(r,e,c,u++):e)},function(){i=null,checkComplete()}))},function(){u=!0,checkComplete()}))})}},24906:(e,t,r)=>{r.d(t,{w:()=>switchScan});var n=r(84518),a=r(74317);function switchScan(e,t){return(0,a.e)(function(r,a){var o=t;return(0,n.w)(function(t,r){return e(o,t,r)},function(e,t){return o=t,t})(r).subscribe(a),function(){o=null}})}},83600:(e,t,r)=>{r.d(t,{P:()=>throttle});var n=r(74317),a=r(11882),o=r(278);function throttle(e,t){return(0,n.e)(function(r,n){var i=null!=t?t:{},s=i.leading,u=void 0===s||s,c=i.trailing,l=void 0!==c&&c,d=!1,f=null,p=null,h=!1,endThrottling=function(){null==p||p.unsubscribe(),p=null,l&&(send(),h&&n.complete())},cleanupThrottling=function(){p=null,h&&n.complete()},startThrottle=function(t){return p=(0,o.Xf)(e(t)).subscribe((0,a.x)(n,endThrottling,cleanupThrottling))},send=function(){if(d){d=!1;var e=f;f=null,n.next(e),h||startThrottle(e)}};r.subscribe((0,a.x)(n,function(e){d=!0,f=e,p&&!p.closed||(u?send():startThrottle(e))},function(){h=!0,l&&d&&p&&!p.closed||n.complete()}))})}},22212:(e,t,r)=>{r.d(t,{z:()=>a});var n=r(70500),a=new(r(77881)).v(n.o)},47266:(e,t,r)=>{r.d(t,{_6:()=>popNumber,yG:()=>popScheduler});var n=r(62343);function last(e){return e[e.length-1]}function popScheduler(e){return(0,n.K)(last(e))?e.pop():void 0}function popNumber(e,t){return"number"==typeof last(e)?e.pop():t}},72201:(e,t,r)=>{r.d(t,{U:()=>pipeFromArray,z:()=>pipe});var n=r(85235);function pipe(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return pipeFromArray(e)}function pipeFromArray(e){return 0===e.length?n.y:1===e.length?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}},27693:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PolarArcZoomModifier=t.PointerEventsMediatorModifier=t.PinchZoomModifier=t.OverviewRangeSelectionModifier=t.MouseWheelZoomModifier=t.EActionType=t.ModifierMouseArgs=t.ModifierArgsBase=t.LegendModifier=t.DataPointSelectionModifier=t.ESelectionMode=t.DataPointSelectionChangedArgs=t.DataPointInfo=t.CustomChartModifier2D=t.adjustTooltipPosition=t.calcTooltipSize=t.defaultCursorTooltipSvgTemplate=t.CursorModifier=t.getActiveAxes=t.testIsOverAxes=t.ChartModifierBase2D=t.ChartModifierBase=t.AnnotationHoverModifier=t.getSubTypes=t.createType=t.getFunction=t.registerFunction=t.registerWasmType=t.registerType=t.chartBuilder=t.ensureRegistrations=t.configureChart=t.buildChart=t.chartReviver=t.configure3DSurface=t.configure2DSurface=t.buildSubCharts=t.build3DChart=t.buildPieChart=t.build2DPolarChart=t.build2DChart=t.buildSeries3D=t.buildSeries=t.buildModifiers3D=t.buildModifiers=t.buildDataSeries3D=t.buildDataSeries=t.buildAxis3D=t.buildAxes=t.buildAnnotations=void 0,t.CentralAxesLayoutManager=t.BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy=t.BottomAlignedOuterAxisLayoutStrategy=t.BottomAlignedInnerAxisLayoutStrategy=t.BaseCenteredAxisLayoutStrategy=t.BaseAxisLayoutStrategy=t.testLayoutManager=t.getCoordinateWithCoordinateMode=t.getValueWithCoordinateMode=t.updateTopAndBottomChartLayoutState=t.updateLeftAndRightChartLayoutState=t.getVerticalAxisRequiredSize=t.getHorizontalAxisRequiredSize=t.layoutAxisPartsBottomStrategy=t.layoutAxisPartsTopStrategy=t.layoutAxisPartsRightStrategy=t.layoutAxisPartsLeftStrategy=t.layoutAxisParts=t.updateAxisLayoutState=t.WebGlRenderContext2D=t.ELineDrawMode=t.calculateAbsoluteRenderLayer=t.WebGlPen=t.WebGlBrush=t.RenderContext2D=t.createPenInCache=t.getScrtPenFromCache=t.getWebGlPenFromCache=t.createBrushInCache=t.getScrtBrushFromCache=t.getWebGlBrushFromCache=t.BatchRenderContext=t.ZoomPanModifier=t.ZoomExtentsModifier=t.YAxisDragModifier=t.XAxisDragModifier=t.VerticalSliceModifier=t.SeriesSelectionModifier=t.getRubberBandRect=t.RubberBandXyZoomModifier=t.splitIntoClusters=t.RolloverModifier=t.PolarZoomExtentsModifier=t.PolarSeriesSelectionModifier=t.PolarPanModifier=t.EPolarPanModifierPanMode=t.PolarMouseWheelZoomModifier=t.PolarLegendModifier=t.PolarDataPointSelectionModifier=t.PolarCursorModifier=void 0,t.XyMovingAverageFilter=t.XyLinearTrendFilter=t.switchData=t.XyFilterBase=t.EDataSeriesField=t.XyCustomFilter=t.OhlcScaleOffsetFilter=t.OhlcFilterBase=t.OhlcCustomFilter=t.HlcScaleOffsetFilter=t.HlcFilterBase=t.HlcCustomFilter=t.FIFOVectorProvider=t.DoubleVectorProvider=t.DataPointSelectionPaletteProvider=t.DataDistributionCalculator=t.XyzSeriesInfo=t.XyySeriesInfo=t.XySeriesInfo=t.TriangleSeriesInfo=t.StackedXySeriesInfo=t.SeriesInfo=t.OhlcSeriesInfo=t.HlcSeriesInfo=t.HeatmapSeriesInfo=t.BoxPlotSeriesInfo=t.BoxPlotDataSeries=t.BasePaletteProvider=t.BaseHeatmapDataSeries=t.getWindowedYRange=t.BaseDataSeries=t.TopAlignedOuterHorizontallyStackedAxisLayoutStrategy=t.TopAlignedOuterAxisLayoutStrategy=t.TopAlignedInnerAxisLayoutStrategy=t.SynchronizedLayoutManager=t.SciChartVerticalGroup=t.SciChartHorizontalGroup=t.RightAlignedOuterVerticallyStackedAxisLayoutStrategy=t.RightAlignedOuterAxisLayoutStrategy=t.RightAlignedInnerAxisLayoutStrategy=t.RadialAxisLayoutStrategy=t.PolarLayoutManager=t.BasePolarAxisLayoutStrategy=t.AngularAxisLayoutStrategy=t.LeftAlignedOuterVerticallyStackedAxisLayoutStrategy=t.LeftAlignedOuterAxisLayoutStrategy=t.LeftAlignedInnerAxisLayoutStrategy=t.LayoutManager=t.EInnerAxisPlacementCoordinateMode=t.ChartLayoutState=void 0,t.IndexCoordinateCalculator=t.FlippedNumericCoordinateCalculator=t.FlippedIndexCoordinateCalculator=t.FlippedCategoryCoordinateCalculator=t.CoordinateCalculatorBase=t.CategoryCoordinateCalculator=t.XyzDataSeries=t.getYyYRange=t.XyyDataSeries=t.XyxyDataSeries=t.XyxDataSeries=t.XyTextDataSeries=t.XyNDataSeries=t.XyDataSeries=t.XDataSeries=t.UniformHeatmapDataSeries=t.XyzPointSeriesWrapped=t.XyzPointSeriesResampled=t.XyyPointSeriesWrapped=t.XyyPointSeriesResampled=t.XyPointSeriesWrapped=t.XyPointSeriesResampled=t.XyNPointSeriesResampled=t.OhlcPointSeriesWrapped=t.OhlcPointSeriesResampled=t.HlcPointSeriesWrapped=t.BoxPlotPointSeriesWrapped=t.BasePointSeriesWrapped=t.BasePointSeriesResampled=t.PaletteFactory=t.getOHLCYRange=t.OhlcDataSeries=t.NonUniformHeatmapDataSeries=t.MetadataPaletteProvider=t.TemplateMetadataGenerator=t.DefaultPaletteProvider=t.EFillPaletteMode=t.EStrokePaletteMode=t.EDataSeriesValueType=t.EDataChangeType=t.EDataSeriesType=t.HlcDataSeries=t.XyzScaleOffsetFilter=t.XyzFilterBase=t.XyzCustomFilter=t.XyyScaleOffsetFilter=t.XyyFilterBase=t.XyyCustomFilter=t.XyScaleOffsetFilter=t.XyRatioFilter=void 0,t.EAnnotationType=t.EAnnotationLayer=t.HtmlTextAnnotation=t.HtmlCustomAnnotation=t.HorizontalLineAnnotation=t.DomAnnotationBase=t.CustomAnnotation=t.CursorTooltipSvgAnnotation=t.CompositeAnnotation=t.BoxAnnotation=t.AxisMarkerAnnotation=t.ArcAnnotationBase=t.ArcAnnotation=t.AnnotationHoverEventArgs=t.annotationHelpers=t.AnnotationDragDeltaEventArgs=t.AnnotationClickEventArgs=t.AnnotationBase=t.ECoordinateMode=t.EDraggingGripPoint=t.AdornerLayer=t.SciChartJsNavyTheme=t.SciChartJSLightTheme=t.SciChartJSDarkv2Theme=t.SciChartJSDarkTheme=t.stripAutoColor=t.ThemeProvider=t.AUTO_COLOR=t.getAdjustedRotation=t.TitleRendererBase=t.SciChartRenderer=t.RenderPassInfo=t.RenderPassDataCollection=t.RenderPassData=t.ChartTitleRenderer=t.TickProvider=t.NumericTickProvider=t.LogarithmicTickProvider=t.ELogarithmicMajorTickMode=t.ELogarithmicMinorTickMode=t.IndexTickProvider=t.TickCoordinatesProvider=t.StaticTickCoordinatesProvider=t.PolarTickCoordinatesProvider=t.DefaultTickCoordinatesProvider=t.ResamplingParams=t.EResamplingMode=t.ExtremeResamplerHelper=t.NumericCoordinateCalculator=t.LogarithmicCoordinateCalculator=void 0,t.SmartDateLabelProvider=t.DEFAULT_LABEL_THRESHOLDS=t.EHighPrecisionLabelMode=t.EDatePrecision=t.ETradeChartLabelFormat=t.RadianLabelProvider=t.PieLabelProvider=t.NumericLabelProvider=t.LogarithmicLabelProvider=t.LabelProviderBase2D=t.LabelInfo=t.LabelProvider=t.labelCache=t.DateLabelProvider=t.getAxis3dById=t.getAxisById=t.DiscontinuousDateAxis=t.NumericDeltaCalculator=t.LogarithmicDeltaCalculator=t.IndexDeltaCalculator=t.DeltaCalculator=t.DateTimeDeltaCalculator=t.CategoryDeltaCalculator=t.DateTimeNumericAxis=t.CategoryAxisBase=t.CategoryAxis=t.BaseValueAxis=t.AxisTitleRenderer=t.AxisRenderer=t.PolarAxisLayoutState=t.AxisLayoutState=t.AxisCore=t.AxisBase2D=t.EClipMode=t.VerticalLineAnnotation=t.TextAnnotation=t.SvgLineAnnotation=t.SvgAnnotationBase=t.RolloverTooltipSvgAnnotation=t.RolloverMarkerSvgAnnotation=t.RolloverLegendSvgAnnotation=t.RenderContextAnnotationBase=t.PolarPointerAnnotation=t.PolarArcAnnotation=t.OverviewCustomResizableAnnotation=t.NativeTextAnnotation=t.EWrapTo=t.LineArrowAnnotation=t.EArrowHeadPosition=t.LineAnnotation=void 0,t.SciChart3DLegend=t.ManualLegend=t.polarChartHelper=t.getAllFontKeys=t.getFontKey=t.getVector3=t.getVector2=t.getVector4=t.getNativeRect=t.getTextBounds=t.getTextureVertex=t.getArcParams=t.getArcVertex=t.getVertex=t.getVectorArcVertex=t.getVectorColorTextureVertex=t.getVectorColorVertex=t.getVectorRectVertex=t.freeCache=t.deleteCache=t.FontKey=t.labelHelper=t.getLabelValue=t.getLineCoordinates=t.getLabelCoordinates=t.drawAxisMarkerAnnotation=t.drawLineAnnotation=t.drawModifiersAxisLabel=t.drawBorder=t.createSolidBrush=t.createSCRTPen=t.createNativeRect=t.HeatmapLegend=t.initializeChartEngine2D=t.getSharedWasmContext=t.VisibleRangeChangedArgs=t.TextureAxisRenderer=t.EPolarLabelMode=t.EPolarGridlineMode=t.EPolarAxisMode=t.PolarNumericAxis=t.PolarCategoryAxis=t.PolarAxisRenderer=t.PolarAxisBase=t.NumericAxis=t.NativeAxisRenderer=t.LogarithmicAxis=t.MIN_LOG_AXIS_VALUE=t.wrapText=t.TextLabelProvider=void 0,t.BaseStackedRenderableSeries=t.BaseStackedMountainRenderableSeries=t.BaseStackedCollection=t.BaseRenderableSeries=t.BaseOhlcRenderableSeries=t.BaseMountainRenderableSeries=t.BaseLineRenderableSeries=t.ELineType=t.BaseHeatmapRenderableSeries=t.BaseBandRenderableSeries=t.WaveAnimation=t.SweepAnimation=t.SeriesAnimation=t.ScatterAnimation=t.ScaleAnimation=t.PointMarkerStyle=t.OhlcAnimationStyle=t.OhlcAnimation=t.MountainAnimationStyle=t.MountainAnimation=t.LineAnimation=t.FadeAnimation=t.CustomPointMarkerStyle=t.ColumnAnimationStyle=t.ColumnAnimation=t.CandlestickAnimationStyle=t.CandlestickAnimation=t.BubbleAnimation=t.BasePointMarkerStyle=t.BaseAnimationStyle=t.BandAnimationStyle=t.BandAnimation=t.animationHelpers=t.XPointMarker=t.TrianglePointMarker=t.SquarePointMarker=t.SpritePointMarker=t.EllipsePointMarker=t.CrossPointMarker=t.BasePointMarker=t.DefaultSciChartLoader=t.licenseManager2dState=t.SciChartPieLegend=t.getLegendContainerHtml=t.getLegendItemHtml=t.SciChartLegendBase=t.ELegendType=t.ELegendPlacement=t.ELegendOrientation=t.SciChartLegend=void 0,t.getXRange=t.FastColumnRenderableSeries=t.FastCandlestickRenderableSeries=t.FastBubbleRenderableSeries=t.FastBoxPlotRenderableSeries=t.FastBandRenderableSeries=t.UniformHeatmapDrawingProvider=t.UniformContoursDrawingProvider=t.TriangleSeriesDrawingProvider=t.StackedColumnSeriesDrawingProvider=t.StackedColumnRenderPassData=t.SmearSeriesDrawingProvider=t.RectangleSeriesDrawingProvider=t.PointMarkerDrawingProvider=t.OhlcSeriesDrawingProvider=t.EOhlcDrawingMode=t.NonUniformHeatmapDrawingProvider=t.MountainSeriesDrawingProvider=t.LineSeriesDrawingProvider=t.LineSegmentSeriesDrawingProvider=t.HeightSeriesDrawingProvider=t.calculateHeatmapTexture=t.calculateCellCoordinates=t.calculateOffsets=t.createColorMap=t.getColor=t.getColorDataForTexture=t.ErrorSeriesDrawingProvider=t.ColumnSeriesDrawingProvider=t.BubbleSeriesDrawingProvider=t.BoxPlotSeriesDrawingProvider=t.BaseSeriesDrawingProvider=t.BandSeriesDrawingProvider=t.TextDataLabelProvider=t.StackedColumnSeriesDataLabelProvider=t.StackedCollectionDataLabelProvider=t.RectangleSeriesDataLabelProvider=t.RectangleDataLabelState=t.NonUniformHeatMapDataLabelProvider=t.LineSeriesDataLabelProvider=t.HeatMapDataLabelProvider=t.DataLabelState=t.DataLabelProvider=t.dataLabelHelpers=t.ContoursDataLabelProvider=t.ColumnSeriesDataLabelProvider=t.EColumnDataLabelPosition=t.BubbleSeriesDataLabelProvider=t.BaseDataLabelProvider=t.BandSeriesDataLabelProvider=void 0,t.PolarLineSeriesHitTestProvider=t.polarHitTestHelpers=t.PolarDataPointHitTestProvider=t.PolarTriangleSeriesDrawingProvider=t.PolarPointMarkerDrawingProvider=t.PolarLineSeriesDrawingProvider=t.PolarHeatmapDrawingProvider=t.PolarColumnSeriesDrawingProvider=t.PolarBandSeriesDrawingProvider=t.PolarTextDataLabelProvider=t.PolarHeatMapDataLabelProvider=t.PolarDataLabelState=t.PolarDataLabelProvider=t.PolarColumnSeriesDataLabelProvider=t.PolarColumnDataLabelState=t.NonUniformHeatmapRenderableSeries=t.HoveredChangedArgs=t.UniformHeatmapHitTestProvider=t.TriangleSeriesHitTestProvider=t.TextSeriesHitTestProvider=t.StackedMountainSeriesHitTestProvider=t.StackedColumnSeriesHitTestProvider=t.ScatterSeriesHitTestProvider=t.RectangleSeriesHitTestProvider=t.OhlcSeriesHitTestProvider=t.NonUniformHeatmapHitTestProvider=t.MountainSeriesHitTestProvider=t.LineSeriesHitTestProvider=t.LineSegmentSeriesHitTestProvider=t.ImpulseSeriesHitTestProvider=t.HitTestInfo=t.hitTestHelpersRectangleSeries=t.hitTestHelpers=t.ErrorSeriesHitTestProvider=t.ColumnSeriesHitTestProvider=t.BubbleSeriesHitTestProvider=t.BoxPlotSeriesHitTestProvider=t.BaseHitTestProvider=t.BandSeriesHitTestProvider=t.HeatmapColorMap=t.GlowEffect=t.FastTriangleRenderableSeries=t.FastTextRenderableSeries=t.FastRectangleRenderableSeries=t.FastOhlcRenderableSeries=t.FastMountainRenderableSeries=t.FastLineSegmentRenderableSeries=t.FastLineRenderableSeries=t.FastImpulseRenderableSeries=t.FastErrorBarsRenderableSeries=void 0,t.SciChartOverview=t.SciChartDefaults=t.RubberBandSvgRect=t.XyScatterRenderableSeries=t.UniformHeatmapRenderableSeries=t.UniformContoursRenderableSeries=t.EContourColorMapMode=t.StackedXyCollection=t.StackedMountainRenderableSeries=t.StackedMountainCollection=t.StackedColumnRenderableSeries=t.StackedColumnCollection=t.SplineMountainRenderableSeries=t.SplineLineRenderableSeries=t.SplineBandRenderableSeries=t.SmoothStackedMountainRenderableSeries=t.ShadowEffect=t.ShaderEffect=t.SeriesVisibleChangedArgs=t.SeriesSelectedArgs=t.SeriesHoveredArgs=t.SelectionChangedArgs=t.RolloverModifierRenderableSeriesProps=t.XyySplineRenderDataTransform=t.SplineRenderDataTransform=t.PolarInterpolateLineRenderDataTransform=t.PolarInterpolateBandRenderDataTransform=t.SmoothStackedRenderDataTransform=t.XyyBezierRenderDataTransform=t.BezierRenderDataTransform=t.bezierTransform=t.BaseRenderDataTransformJS=t.XyzBaseRenderDataTransform=t.OhlcBaseRenderDataTransform=t.XyyBaseRenderDataTransform=t.XyBaseRenderDataTransform=t.BaseRenderDataTransform=t.PolarXyScatterRenderableSeries=t.PolarUniformHeatmapRenderableSeries=t.PolarTriangleRenderableSeries=t.PolarTextRenderableSeries=t.PolarStackedMountainRenderableSeries=t.PolarStackedMountainCollection=t.PolarStackedColumnRenderableSeries=t.PolarStackedColumnCollection=t.PolarMountainRenderableSeries=t.PolarLineRenderableSeries=t.PolarColumnRenderableSeries=t.PolarBandRenderableSeries=t.PolarMountainSeriesHitTestProvider=void 0,t.getArraysEqual=t.getTextStylesEqual=t.getTArgbEqual=t.getLineStylesEqual=t.getDescriptorsEqual=t.ETextAlignment3D=t.EAxisSideClipping=t.AxisCubeEntity=t.AxisBase3D=t.EWhichAxis=t.TooltipSvgAnnotation3D=t.Vector3=t.XyzDataSeries3D=t.UniformGridDataSeries3D=t.BaseGridDataSeries3D=t.BaseDataSeries3D=t.EDataSeriesType3D=t.adjustTooltipPosition3D=t.TooltipModifier3D=t.SeriesSelectionModifier3D=t.ResetCamera3DModifier=t.PinchZoomModifier3D=t.OrbitModifier3D=t.MouseWheelZoomModifier3D=t.LegendModifier3D=t.CustomChartModifier3D=t.ChartModifierBase3D=t.CameraController=t.ECameraProjectionMode=t.UpdateSuspender=t.measureTextWidth=t.measureTextHeight=t.TextureManager=t.DpiHelper=t.CanvasTexture=t.SciChartSurfaceCore=t.createChartDestination=t.SciChartSurfaceBase=t.DebugForDpi=t.SciChartSurface=t.sciChartConfig=t.sciChartSubSurfaceCommon=t.SciChartSubSurface=t.SciChartPolarSurface=t.SciChartPolarSubSurface=t.SciChartPieSurface=t.EPieValueMode=t.EPieType=t.ESizingMode=t.PieSegment=void 0,t.EDrawMeshAs=t.SolidColorBrushPalette=t.MeshColorPalette=t.GradientColorPalette=t.SeriesInfo3D=t.Series3DVisibleChangedArgs=t.Series3DSelectedArgs=t.Series3DHoveredArgs=t.SelectionChangedArgs3D=t.ScatterRenderableSeries3D=t.PointLineRenderableSeries3D=t.HoveredChangedArgs3D=t.HitTestInfo3D=t.ESeriesType3D=t.ColumnRenderableSeries3D=t.BaseRenderableSeries3D=t.SurfaceMeshSceneEntity=t.SurfaceMeshSceneEntityState=t.SceneDescriptor=t.ScatterPointsSceneEntity=t.RenderPassInfo3D=t.RenderableSeriesSceneEntityState=t.RenderableSeriesSceneEntity=t.PointLine3DSceneEntity=t.DefaultEntityIdProvider=t.CrosshairLinesSceneEntity=t.ColumnSceneEntity=t.BaseSceneEntity3D=t.AxisCubeDescriptor=t.TrianglePointMarker3D=t.EllipsePointMarker3D=t.QuadPointMarker=t.PixelPointMarker3D=t.CylinderPointMarker3D=t.PyramidPointMarker3D=t.CubePointMarker3D=t.SpherePointMarker3D=t.BaseTexturePointMarker3D=t.BasePointMarker3D=t.EMarkerType=t.BaseMeshPointMarker3D=t.GizmoEntity=t.DefaultViewportManager3D=t.createSingle3dInternal=t.initializeChartEngine3D=t.getSharedWasmContext3D=t.AxisPlane=t.EAxisPlaneType=t.NumericAxis3D=t.LogarithmicAxis3D=void 0,t.EWebGLSupport=t.Thickness=t.sendTelemetry=t.shouldSendTelemetry=t.getUserCookie=t.localStorageApi=t.SimdHelper=t.Rect=t.PropertyChangedEventArgs=t.Point=t.OneTimePerformanceWarning=t.ObservableArrayChangedArgs=t.EObservableArrayChangedAction=t.ObservableArray=t.ObservableArrayBase=t.NumberUtil=t.NumberRange=t.MouseManager=t.List=t.IncludedItems=t.Guard=t.GradientParams=t.receiveNextEvent=t.EventHandler=t.Dictionary=t.deleteSafe=t.DeletableEntity=t.checkBuildStamp=t.libraryVersion=t.AnimationToken=t.NumberRangeAnimator=t.GenericAnimation=t.autoReverseEasing=t.easing=t.DoubleAnimator=t.animateAny=t.SeriesAnimationFiniteStateMachine=t.AnimationFiniteStateMachine=t.EAnimationStateTransition=t.EAnimationState=t.ViewportManager3DBase=t.SciChart3DSurface=t.sciChartConfig3D=t.SciChart3DRenderer=t.RootSceneEntity=t.XyzSeriesInfo3D=t.SurfaceMeshSeriesInfo3D=t.SurfaceMeshRenderableSeries3D=t.EMeshResolution=t.EMeshPaletteMode=void 0,t.EDefaultRenderLayer=t.EDataPointWidthMode=t.EDataLabelSkipMode=t.EDataLabelProviderType=t.EDataFilterType=t.ECursorStyle=t.convertCoordinateFromRelativeValue=t.convertCoordinateFromPixelValue=t.convertCoordinateFromDataValue=t.convertToRelativeCoordinate=t.convertToPixelCoordinate=t.convertToDataValue=t.convertCoordinateMode=t.convertFromAbsoluteCoordinate=t.convertAbsoluteCoordinateToRelativeValue=t.convertAbsoluteCoordinateToPixelValue=t.convertAbsoluteCoordinateToDataValue=t.convertToAbsoluteCoordinate=t.convertRelativeValueToAbsoluteCoordinate=t.convertPixelValueToAbsoluteCoordinate=t.convertDataValueToAbsoluteCoordinate=t.subtractCoord=t.addCoord=t.convertYColumnMode=t.EColumnYMode=t.convertColumnMode=t.EColumnMode=t.EColor=t.EChart3DModifierType=t.EChart2DModifierType=t.EModifierMouseArgKey=t.EExecuteOn=t.EBaseType=t.EAxisType=t.convertAxisPlaneVisibilityMode=t.EAxisPlaneVisibilityMode=t.convert3DPlaneModeForTitles=t.convert3DPlaneModeForLabels=t.EAxisPlaneDrawLabelsMode=t.handleInvalidAxisAlignment=t.getIsVertical=t.getIsHorizontal=t.EAxisAlignment=t.EAutoRange=t.EAutoColorMode=t.EAnnotationClippingMode=t.EAnimationType=t.EVerticalAnchorPoint=t.EHorizontalAnchorPoint=t.WebGlHelper=void 0,t.EColorMapMode=t.EThemeProviderType=t.convert3DTitleRotationMode=t.convert3DLabelOrientationMode=t.E3DTitleRotationMode=t.E3DLabelOrientationMode=t.ETitlePosition=t.ETextAlignment=t.convertMultiLineAlignment=t.EMultiLineAlignment=t.EVerticalTextPosition=t.EHorizontalTextPosition=t.ESurfaceType=t.ESubSurfacePositionCoordinateMode=t.ESubChartClippingMode=t.Size=t.EShaderEffectType=t.ESeriesType=t.convertSearchMode=t.ESearchMode=t.ESciChartSurfaceType=t.ESceneEntityType=t.ERenderLayer=t.EStrokeLineJoin=t.EPointMarkerType=t.EPointMarker3DType=t.EPaletteProviderType=t.OrderedRenderable=t.ENumericFormat=t.subArray=t.isNumberArray=t.isTypedArray=t.EMousePosition=t.EModifierType=t.ELayoutStrategyType=t.ELayoutManagerType=t.ELabelProviderType=t.ERadialAxisLabelPlacement=t.EAngularAxisLabelPlacement=t.EVerticalAlignment=t.EHorizontalAlignment=t.ELabelPlacement=t.ELabelAlignment=t.EHoverMode=t.EHeightSeriesMode=t.EColorPickMode=t.EUseWasmSimd=t.EErrorMode=t.EErrorDirection=t.EDragMode=void 0,t.getDefaultFontName=t.getFontString=t.logDoubleVector=t.formatUnixDateToHumanStringSSns=t.formatUnixDateToHumanStringSSus=t.formatUnixDateToHumanStringYYYY=t.formatUnixDateToHumanStringDD=t.formatUnixDateToHumanStringMMM=t.formatUnixDateToHumanStringMMMDD=t.formatUnixDateToHumanStringHHMM=t.formatUnixDateToHumanStringSSms=t.formatUnixDateToHumanStringHHMMSS=t.formatUnixDateToHumanStringDDMM=t.formatUnixDateToHumanStringDDMMHHMM=t.formatUnixDateToHumanStringDDMMYY=t.formatUnixDateToHumanString=t.copyDoubleVector=t.convertToPixel=t.convertRgbToHexColor=t.convertColor=t.applyOpacityToHtmlColor=t.uintArgbColorIsTransparent=t.uintArgbColorOverrideOpacity=t.uintArgbColorMultiplyOpacity=t.uintArgbColorToAbgr=t.linearColorMapLerp=t.uintArgbColorLerp=t.uintArgbColorLerp24bit=t.appendDoubleVectorFromBuffer=t.appendDoubleVectorFromJsArray=t.memCopyFloat32=t.insertDoubleVectorFromJsArray=t.SIZEOF_FLOAT32=t.SIZEOF_NUMBER=t.calcAverageForArray=t.calcAverageForDoubleVector=t.appendRangeFifo=t.makeIncArray=t.isArraySorted=t.arrayRemove=t.areArraysEqual=t.countUnique=t.getUniqueValues=t.EZoomState=t.EYRangeMode=t.EXyDirection=t.EWatermarkPosition=t.generateValueNamesForDataSeries=t.EValueName=t.ETriangleSeriesDrawMode=void 0,t.getRandomInRange=t.testPointInTriangle=t.calcDistanceFromLineSegment=t.calcDotProduct=t.testIsInInterval=t.testIsInXBounds=t.calcAnnotationBordersForAxisMarker=t.testIsInBounds=t.calcDistance=t.calcCrossProduct=t.calcDistanceFromLine=t.runAfterFramePaint=t.PerformanceDebugHelper=t.EPerformanceDebugLevel=t.EPerformanceMarkType=t.parseTArgbToHtmlColor=t.parseArgbToHtmlColor=t.parseColorToTArgb=t.toHex=t.parseColorToUIntAbgr=t.parseColorToUIntArgb=t.parseColorToHexStringAbgr=t.parseColorToHexStringArgb=t.checkIsNaN=t.toEngineering=t.toScientific=t.toSuperScript=t.formatNumber=t.numericHashCode=t.formatNumber2Digits=t.MemoryUsageHelper=t.ObjectRegistry=t.memoize=t.logToBase=t.fillNoisySinewave=t.getNoisySinewave=t.Logger=t.isRealNumber=t.createImagesArrayAsync=t.createImageAsync=t.stringOccurrences=t.htmlToElement=t.validateColorStops=t.HEIGHT_SERIES_MAX_TEXTURE_SIZE=t.hashUtils=t.hasAllProperties=t.base64Id=t.generateGuid=t.geometryHelpers=t.getFontFamily=void 0,t.zeroArray2D=t.watermarkHelpers=t.vectorToArrayViewI32=t.vectorToArrayViewUi32=t.vectorToArrayViewF32=t.vectorToArrayViewF64=t.vectorToArray=t.fromTsrVector4=t.updateTsrVector4=t.translateDataValueRectToAbsolute=t.translateToNotScaledRect=t.translateToScaledRect=t.translateToNotScaled=t.translateToScaled=t.translateFromSeriesViewRectToCanvasY=t.translateFromSeriesViewRectToCanvasX=t.translateFromCanvasToSeriesViewRectY=t.translateFromCanvasToSeriesViewRectX=t.translateFromSeriesViewRectToCanvas=t.translateFromCanvasToSeriesViewRect=t.EShift=t.ECoord=t.ESize=t.getNativeTextPosition=t.getMultilineTextHeight=t.getTextHeightToBaseline=t.getFirstLineHeightToBaseline=t.getNativeTextSize=t.convertToNativeLineSpacing=t.wrapNativeText=t.getAttributeFromString=t.getNextRandomPriceBarFactory=t.getStocksDataFactory=void 0;var n=r(38489);Object.defineProperty(t,"buildAnnotations",{enumerable:!0,get:function(){return n.buildAnnotations}});var a=r(76492);Object.defineProperty(t,"buildAxes",{enumerable:!0,get:function(){return a.buildAxes}});var o=r(76492);Object.defineProperty(t,"buildAxis3D",{enumerable:!0,get:function(){return o.buildAxis3D}});var i=r(8235);Object.defineProperty(t,"buildDataSeries",{enumerable:!0,get:function(){return i.buildDataSeries}});var s=r(8235);Object.defineProperty(t,"buildDataSeries3D",{enumerable:!0,get:function(){return s.buildDataSeries3D}});var u=r(91760);Object.defineProperty(t,"buildModifiers",{enumerable:!0,get:function(){return u.buildModifiers}});var c=r(91760);Object.defineProperty(t,"buildModifiers3D",{enumerable:!0,get:function(){return c.buildModifiers3D}});var l=r(28904);Object.defineProperty(t,"buildSeries",{enumerable:!0,get:function(){return l.buildSeries}});var d=r(28904);Object.defineProperty(t,"buildSeries3D",{enumerable:!0,get:function(){return d.buildSeries3D}});var f=r(38188);Object.defineProperty(t,"build2DChart",{enumerable:!0,get:function(){return f.build2DChart}});var p=r(38188);Object.defineProperty(t,"build2DPolarChart",{enumerable:!0,get:function(){return p.build2DPolarChart}});var h=r(38188);Object.defineProperty(t,"buildPieChart",{enumerable:!0,get:function(){return h.buildPieChart}});var m=r(38188);Object.defineProperty(t,"build3DChart",{enumerable:!0,get:function(){return m.build3DChart}});var g=r(38188);Object.defineProperty(t,"buildSubCharts",{enumerable:!0,get:function(){return g.buildSubCharts}});var v=r(38188);Object.defineProperty(t,"configure2DSurface",{enumerable:!0,get:function(){return v.configure2DSurface}});var b=r(38188);Object.defineProperty(t,"configure3DSurface",{enumerable:!0,get:function(){return b.configure3DSurface}});var y=r(62103);Object.defineProperty(t,"chartReviver",{enumerable:!0,get:function(){return y.chartReviver}});var S=r(62103);Object.defineProperty(t,"buildChart",{enumerable:!0,get:function(){return S.buildChart}});var P=r(62103);Object.defineProperty(t,"configureChart",{enumerable:!0,get:function(){return P.configureChart}});var T=r(62103);Object.defineProperty(t,"ensureRegistrations",{enumerable:!0,get:function(){return T.ensureRegistrations}});var x=r(62103);Object.defineProperty(t,"chartBuilder",{enumerable:!0,get:function(){return x.chartBuilder}});var _=r(22199);Object.defineProperty(t,"registerType",{enumerable:!0,get:function(){return _.registerType}});var A=r(22199);Object.defineProperty(t,"registerWasmType",{enumerable:!0,get:function(){return A.registerWasmType}});var O=r(22199);Object.defineProperty(t,"registerFunction",{enumerable:!0,get:function(){return O.registerFunction}});var w=r(22199);Object.defineProperty(t,"getFunction",{enumerable:!0,get:function(){return w.getFunction}});var E=r(22199);Object.defineProperty(t,"createType",{enumerable:!0,get:function(){return E.createType}});var k=r(22199);Object.defineProperty(t,"getSubTypes",{enumerable:!0,get:function(){return k.getSubTypes}});var D=r(81988);Object.defineProperty(t,"AnnotationHoverModifier",{enumerable:!0,get:function(){return D.AnnotationHoverModifier}});var M=r(69594);Object.defineProperty(t,"ChartModifierBase",{enumerable:!0,get:function(){return M.ChartModifierBase}});var C=r(86604);Object.defineProperty(t,"ChartModifierBase2D",{enumerable:!0,get:function(){return C.ChartModifierBase2D}});var j=r(86604);Object.defineProperty(t,"testIsOverAxes",{enumerable:!0,get:function(){return j.testIsOverAxes}});var R=r(86604);Object.defineProperty(t,"getActiveAxes",{enumerable:!0,get:function(){return R.getActiveAxes}});var I=r(455);Object.defineProperty(t,"CursorModifier",{enumerable:!0,get:function(){return I.CursorModifier}});var N=r(455);Object.defineProperty(t,"defaultCursorTooltipSvgTemplate",{enumerable:!0,get:function(){return N.defaultCursorTooltipSvgTemplate}});var L=r(455);Object.defineProperty(t,"calcTooltipSize",{enumerable:!0,get:function(){return L.calcTooltipSize}});var B=r(455);Object.defineProperty(t,"adjustTooltipPosition",{enumerable:!0,get:function(){return B.adjustTooltipPosition}});var F=r(76908);Object.defineProperty(t,"CustomChartModifier2D",{enumerable:!0,get:function(){return F.CustomChartModifier2D}});var z=r(88534);Object.defineProperty(t,"DataPointInfo",{enumerable:!0,get:function(){return z.DataPointInfo}});var Z=r(7608);Object.defineProperty(t,"DataPointSelectionChangedArgs",{enumerable:!0,get:function(){return Z.DataPointSelectionChangedArgs}});var H=r(89917);Object.defineProperty(t,"ESelectionMode",{enumerable:!0,get:function(){return H.ESelectionMode}});var V=r(89917);Object.defineProperty(t,"DataPointSelectionModifier",{enumerable:!0,get:function(){return V.DataPointSelectionModifier}});var U=r(6422);Object.defineProperty(t,"LegendModifier",{enumerable:!0,get:function(){return U.LegendModifier}});var G=r(59665);Object.defineProperty(t,"ModifierArgsBase",{enumerable:!0,get:function(){return G.ModifierArgsBase}});var W=r(33436);Object.defineProperty(t,"ModifierMouseArgs",{enumerable:!0,get:function(){return W.ModifierMouseArgs}});var K=r(43511);Object.defineProperty(t,"EActionType",{enumerable:!0,get:function(){return K.EActionType}});var q=r(43511);Object.defineProperty(t,"MouseWheelZoomModifier",{enumerable:!0,get:function(){return q.MouseWheelZoomModifier}});var X=r(88369);Object.defineProperty(t,"OverviewRangeSelectionModifier",{enumerable:!0,get:function(){return X.OverviewRangeSelectionModifier}});var $=r(11454);Object.defineProperty(t,"PinchZoomModifier",{enumerable:!0,get:function(){return $.PinchZoomModifier}});var Y=r(91933);Object.defineProperty(t,"PointerEventsMediatorModifier",{enumerable:!0,get:function(){return Y.PointerEventsMediatorModifier}});var J=r(74695);Object.defineProperty(t,"PolarArcZoomModifier",{enumerable:!0,get:function(){return J.PolarArcZoomModifier}});var Q=r(76179);Object.defineProperty(t,"PolarCursorModifier",{enumerable:!0,get:function(){return Q.PolarCursorModifier}});var ee=r(57218);Object.defineProperty(t,"PolarDataPointSelectionModifier",{enumerable:!0,get:function(){return ee.PolarDataPointSelectionModifier}});var et=r(50088);Object.defineProperty(t,"PolarLegendModifier",{enumerable:!0,get:function(){return et.PolarLegendModifier}});var er=r(99168);Object.defineProperty(t,"PolarMouseWheelZoomModifier",{enumerable:!0,get:function(){return er.PolarMouseWheelZoomModifier}});var en=r(1485);Object.defineProperty(t,"EPolarPanModifierPanMode",{enumerable:!0,get:function(){return en.EPolarPanModifierPanMode}});var ea=r(1485);Object.defineProperty(t,"PolarPanModifier",{enumerable:!0,get:function(){return ea.PolarPanModifier}});var eo=r(54705);Object.defineProperty(t,"PolarSeriesSelectionModifier",{enumerable:!0,get:function(){return eo.PolarSeriesSelectionModifier}});var ei=r(94078);Object.defineProperty(t,"PolarZoomExtentsModifier",{enumerable:!0,get:function(){return ei.PolarZoomExtentsModifier}});var es=r(7938);Object.defineProperty(t,"RolloverModifier",{enumerable:!0,get:function(){return es.RolloverModifier}});var eu=r(7938);Object.defineProperty(t,"splitIntoClusters",{enumerable:!0,get:function(){return eu.splitIntoClusters}});var ec=r(54374);Object.defineProperty(t,"RubberBandXyZoomModifier",{enumerable:!0,get:function(){return ec.RubberBandXyZoomModifier}});var el=r(54374);Object.defineProperty(t,"getRubberBandRect",{enumerable:!0,get:function(){return el.getRubberBandRect}});var ed=r(88188);Object.defineProperty(t,"SeriesSelectionModifier",{enumerable:!0,get:function(){return ed.SeriesSelectionModifier}});var ef=r(86125);Object.defineProperty(t,"VerticalSliceModifier",{enumerable:!0,get:function(){return ef.VerticalSliceModifier}});var ep=r(17322);Object.defineProperty(t,"XAxisDragModifier",{enumerable:!0,get:function(){return ep.XAxisDragModifier}});var eh=r(29135);Object.defineProperty(t,"YAxisDragModifier",{enumerable:!0,get:function(){return eh.YAxisDragModifier}});var em=r(42103);Object.defineProperty(t,"ZoomExtentsModifier",{enumerable:!0,get:function(){return em.ZoomExtentsModifier}});var eg=r(68674);Object.defineProperty(t,"ZoomPanModifier",{enumerable:!0,get:function(){return eg.ZoomPanModifier}});var ev=r(39887);Object.defineProperty(t,"BatchRenderContext",{enumerable:!0,get:function(){return ev.BatchRenderContext}});var eb=r(34843);Object.defineProperty(t,"getWebGlBrushFromCache",{enumerable:!0,get:function(){return eb.getWebGlBrushFromCache}});var ey=r(34843);Object.defineProperty(t,"getScrtBrushFromCache",{enumerable:!0,get:function(){return ey.getScrtBrushFromCache}});var eS=r(34843);Object.defineProperty(t,"createBrushInCache",{enumerable:!0,get:function(){return eS.createBrushInCache}});var eP=r(76434);Object.defineProperty(t,"getWebGlPenFromCache",{enumerable:!0,get:function(){return eP.getWebGlPenFromCache}});var eT=r(76434);Object.defineProperty(t,"getScrtPenFromCache",{enumerable:!0,get:function(){return eT.getScrtPenFromCache}});var ex=r(76434);Object.defineProperty(t,"createPenInCache",{enumerable:!0,get:function(){return ex.createPenInCache}});var e_=r(43244);Object.defineProperty(t,"RenderContext2D",{enumerable:!0,get:function(){return e_.RenderContext2D}});var eA=r(22803);Object.defineProperty(t,"WebGlBrush",{enumerable:!0,get:function(){return eA.WebGlBrush}});var eO=r(82615);Object.defineProperty(t,"WebGlPen",{enumerable:!0,get:function(){return eO.WebGlPen}});var ew=r(60517);Object.defineProperty(t,"calculateAbsoluteRenderLayer",{enumerable:!0,get:function(){return ew.calculateAbsoluteRenderLayer}});var eE=r(60517);Object.defineProperty(t,"ELineDrawMode",{enumerable:!0,get:function(){return eE.ELineDrawMode}});var ek=r(60517);Object.defineProperty(t,"WebGlRenderContext2D",{enumerable:!0,get:function(){return ek.WebGlRenderContext2D}});var eD=r(81160);Object.defineProperty(t,"updateAxisLayoutState",{enumerable:!0,get:function(){return eD.updateAxisLayoutState}});var eM=r(81160);Object.defineProperty(t,"layoutAxisParts",{enumerable:!0,get:function(){return eM.layoutAxisParts}});var eC=r(81160);Object.defineProperty(t,"layoutAxisPartsLeftStrategy",{enumerable:!0,get:function(){return eC.layoutAxisPartsLeftStrategy}});var ej=r(81160);Object.defineProperty(t,"layoutAxisPartsRightStrategy",{enumerable:!0,get:function(){return ej.layoutAxisPartsRightStrategy}});var eR=r(81160);Object.defineProperty(t,"layoutAxisPartsTopStrategy",{enumerable:!0,get:function(){return eR.layoutAxisPartsTopStrategy}});var eI=r(81160);Object.defineProperty(t,"layoutAxisPartsBottomStrategy",{enumerable:!0,get:function(){return eI.layoutAxisPartsBottomStrategy}});var eN=r(81160);Object.defineProperty(t,"getHorizontalAxisRequiredSize",{enumerable:!0,get:function(){return eN.getHorizontalAxisRequiredSize}});var eL=r(81160);Object.defineProperty(t,"getVerticalAxisRequiredSize",{enumerable:!0,get:function(){return eL.getVerticalAxisRequiredSize}});var eB=r(81160);Object.defineProperty(t,"updateLeftAndRightChartLayoutState",{enumerable:!0,get:function(){return eB.updateLeftAndRightChartLayoutState}});var eF=r(81160);Object.defineProperty(t,"updateTopAndBottomChartLayoutState",{enumerable:!0,get:function(){return eF.updateTopAndBottomChartLayoutState}});var ez=r(81160);Object.defineProperty(t,"getValueWithCoordinateMode",{enumerable:!0,get:function(){return ez.getValueWithCoordinateMode}});var eZ=r(81160);Object.defineProperty(t,"getCoordinateWithCoordinateMode",{enumerable:!0,get:function(){return eZ.getCoordinateWithCoordinateMode}});var eH=r(81160);Object.defineProperty(t,"testLayoutManager",{enumerable:!0,get:function(){return eH.testLayoutManager}});var eV=r(47070);Object.defineProperty(t,"BaseAxisLayoutStrategy",{enumerable:!0,get:function(){return eV.BaseAxisLayoutStrategy}});var eU=r(30718);Object.defineProperty(t,"BaseCenteredAxisLayoutStrategy",{enumerable:!0,get:function(){return eU.BaseCenteredAxisLayoutStrategy}});var eG=r(65069);Object.defineProperty(t,"BottomAlignedInnerAxisLayoutStrategy",{enumerable:!0,get:function(){return eG.BottomAlignedInnerAxisLayoutStrategy}});var eW=r(2414);Object.defineProperty(t,"BottomAlignedOuterAxisLayoutStrategy",{enumerable:!0,get:function(){return eW.BottomAlignedOuterAxisLayoutStrategy}});var eK=r(96909);Object.defineProperty(t,"BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy",{enumerable:!0,get:function(){return eK.BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy}});var eq=r(88634);Object.defineProperty(t,"CentralAxesLayoutManager",{enumerable:!0,get:function(){return eq.CentralAxesLayoutManager}});var eX=r(63461);Object.defineProperty(t,"ChartLayoutState",{enumerable:!0,get:function(){return eX.ChartLayoutState}});var e$=r(86956);Object.defineProperty(t,"EInnerAxisPlacementCoordinateMode",{enumerable:!0,get:function(){return e$.EInnerAxisPlacementCoordinateMode}});var eY=r(20794);Object.defineProperty(t,"LayoutManager",{enumerable:!0,get:function(){return eY.LayoutManager}});var eJ=r(38346);Object.defineProperty(t,"LeftAlignedInnerAxisLayoutStrategy",{enumerable:!0,get:function(){return eJ.LeftAlignedInnerAxisLayoutStrategy}});var eQ=r(60092);Object.defineProperty(t,"LeftAlignedOuterAxisLayoutStrategy",{enumerable:!0,get:function(){return eQ.LeftAlignedOuterAxisLayoutStrategy}});var e0=r(29289);Object.defineProperty(t,"LeftAlignedOuterVerticallyStackedAxisLayoutStrategy",{enumerable:!0,get:function(){return e0.LeftAlignedOuterVerticallyStackedAxisLayoutStrategy}});var e1=r(51317);Object.defineProperty(t,"AngularAxisLayoutStrategy",{enumerable:!0,get:function(){return e1.AngularAxisLayoutStrategy}});var e2=r(1529);Object.defineProperty(t,"BasePolarAxisLayoutStrategy",{enumerable:!0,get:function(){return e2.BasePolarAxisLayoutStrategy}});var e3=r(51524);Object.defineProperty(t,"PolarLayoutManager",{enumerable:!0,get:function(){return e3.PolarLayoutManager}});var e4=r(19541);Object.defineProperty(t,"RadialAxisLayoutStrategy",{enumerable:!0,get:function(){return e4.RadialAxisLayoutStrategy}});var e6=r(52180);Object.defineProperty(t,"RightAlignedInnerAxisLayoutStrategy",{enumerable:!0,get:function(){return e6.RightAlignedInnerAxisLayoutStrategy}});var e5=r(77556);Object.defineProperty(t,"RightAlignedOuterAxisLayoutStrategy",{enumerable:!0,get:function(){return e5.RightAlignedOuterAxisLayoutStrategy}});var e7=r(19612);Object.defineProperty(t,"RightAlignedOuterVerticallyStackedAxisLayoutStrategy",{enumerable:!0,get:function(){return e7.RightAlignedOuterVerticallyStackedAxisLayoutStrategy}});var e8=r(44823);Object.defineProperty(t,"SciChartHorizontalGroup",{enumerable:!0,get:function(){return e8.SciChartHorizontalGroup}});var e9=r(21906);Object.defineProperty(t,"SciChartVerticalGroup",{enumerable:!0,get:function(){return e9.SciChartVerticalGroup}});var te=r(32203);Object.defineProperty(t,"SynchronizedLayoutManager",{enumerable:!0,get:function(){return te.SynchronizedLayoutManager}});var tt=r(49859);Object.defineProperty(t,"TopAlignedInnerAxisLayoutStrategy",{enumerable:!0,get:function(){return tt.TopAlignedInnerAxisLayoutStrategy}});var tr=r(66587);Object.defineProperty(t,"TopAlignedOuterAxisLayoutStrategy",{enumerable:!0,get:function(){return tr.TopAlignedOuterAxisLayoutStrategy}});var tn=r(74801);Object.defineProperty(t,"TopAlignedOuterHorizontallyStackedAxisLayoutStrategy",{enumerable:!0,get:function(){return tn.TopAlignedOuterHorizontallyStackedAxisLayoutStrategy}});var ta=r(40224);Object.defineProperty(t,"BaseDataSeries",{enumerable:!0,get:function(){return ta.BaseDataSeries}});var to=r(40224);Object.defineProperty(t,"getWindowedYRange",{enumerable:!0,get:function(){return to.getWindowedYRange}});var ti=r(66252);Object.defineProperty(t,"BaseHeatmapDataSeries",{enumerable:!0,get:function(){return ti.BaseHeatmapDataSeries}});var ts=r(1178);Object.defineProperty(t,"BasePaletteProvider",{enumerable:!0,get:function(){return ts.BasePaletteProvider}});var tu=r(20504);Object.defineProperty(t,"BoxPlotDataSeries",{enumerable:!0,get:function(){return tu.BoxPlotDataSeries}});var tc=r(30964);Object.defineProperty(t,"BoxPlotSeriesInfo",{enumerable:!0,get:function(){return tc.BoxPlotSeriesInfo}});var tl=r(5204);Object.defineProperty(t,"HeatmapSeriesInfo",{enumerable:!0,get:function(){return tl.HeatmapSeriesInfo}});var td=r(2869);Object.defineProperty(t,"HlcSeriesInfo",{enumerable:!0,get:function(){return td.HlcSeriesInfo}});var tf=r(90312);Object.defineProperty(t,"OhlcSeriesInfo",{enumerable:!0,get:function(){return tf.OhlcSeriesInfo}});var tp=r(3057);Object.defineProperty(t,"SeriesInfo",{enumerable:!0,get:function(){return tp.SeriesInfo}});var th=r(68059);Object.defineProperty(t,"StackedXySeriesInfo",{enumerable:!0,get:function(){return th.StackedXySeriesInfo}});var tm=r(16512);Object.defineProperty(t,"TriangleSeriesInfo",{enumerable:!0,get:function(){return tm.TriangleSeriesInfo}});var tg=r(37020);Object.defineProperty(t,"XySeriesInfo",{enumerable:!0,get:function(){return tg.XySeriesInfo}});var tv=r(28638);Object.defineProperty(t,"XyySeriesInfo",{enumerable:!0,get:function(){return tv.XyySeriesInfo}});var tb=r(35631);Object.defineProperty(t,"XyzSeriesInfo",{enumerable:!0,get:function(){return tb.XyzSeriesInfo}});var ty=r(77668);Object.defineProperty(t,"DataDistributionCalculator",{enumerable:!0,get:function(){return ty.DataDistributionCalculator}});var tS=r(25809);Object.defineProperty(t,"DataPointSelectionPaletteProvider",{enumerable:!0,get:function(){return tS.DataPointSelectionPaletteProvider}});var tP=r(31260);Object.defineProperty(t,"DoubleVectorProvider",{enumerable:!0,get:function(){return tP.DoubleVectorProvider}});var tT=r(31260);Object.defineProperty(t,"FIFOVectorProvider",{enumerable:!0,get:function(){return tT.FIFOVectorProvider}});var tx=r(59974);Object.defineProperty(t,"HlcCustomFilter",{enumerable:!0,get:function(){return tx.HlcCustomFilter}});var t_=r(27077);Object.defineProperty(t,"HlcFilterBase",{enumerable:!0,get:function(){return t_.HlcFilterBase}});var tA=r(90901);Object.defineProperty(t,"HlcScaleOffsetFilter",{enumerable:!0,get:function(){return tA.HlcScaleOffsetFilter}});var tO=r(73204);Object.defineProperty(t,"OhlcCustomFilter",{enumerable:!0,get:function(){return tO.OhlcCustomFilter}});var tw=r(4983);Object.defineProperty(t,"OhlcFilterBase",{enumerable:!0,get:function(){return tw.OhlcFilterBase}});var tE=r(85820);Object.defineProperty(t,"OhlcScaleOffsetFilter",{enumerable:!0,get:function(){return tE.OhlcScaleOffsetFilter}});var tk=r(21818);Object.defineProperty(t,"XyCustomFilter",{enumerable:!0,get:function(){return tk.XyCustomFilter}});var tD=r(98212);Object.defineProperty(t,"EDataSeriesField",{enumerable:!0,get:function(){return tD.EDataSeriesField}});var tM=r(98212);Object.defineProperty(t,"XyFilterBase",{enumerable:!0,get:function(){return tM.XyFilterBase}});var tC=r(98212);Object.defineProperty(t,"switchData",{enumerable:!0,get:function(){return tC.switchData}});var tj=r(92507);Object.defineProperty(t,"XyLinearTrendFilter",{enumerable:!0,get:function(){return tj.XyLinearTrendFilter}});var tR=r(89385);Object.defineProperty(t,"XyMovingAverageFilter",{enumerable:!0,get:function(){return tR.XyMovingAverageFilter}});var tI=r(42710);Object.defineProperty(t,"XyRatioFilter",{enumerable:!0,get:function(){return tI.XyRatioFilter}});var tN=r(67912);Object.defineProperty(t,"XyScaleOffsetFilter",{enumerable:!0,get:function(){return tN.XyScaleOffsetFilter}});var tL=r(17123);Object.defineProperty(t,"XyyCustomFilter",{enumerable:!0,get:function(){return tL.XyyCustomFilter}});var tB=r(11740);Object.defineProperty(t,"XyyFilterBase",{enumerable:!0,get:function(){return tB.XyyFilterBase}});var tF=r(92587);Object.defineProperty(t,"XyyScaleOffsetFilter",{enumerable:!0,get:function(){return tF.XyyScaleOffsetFilter}});var tz=r(10014);Object.defineProperty(t,"XyzCustomFilter",{enumerable:!0,get:function(){return tz.XyzCustomFilter}});var tZ=r(50583);Object.defineProperty(t,"XyzFilterBase",{enumerable:!0,get:function(){return tZ.XyzFilterBase}});var tH=r(56798);Object.defineProperty(t,"XyzScaleOffsetFilter",{enumerable:!0,get:function(){return tH.XyzScaleOffsetFilter}});var tV=r(18515);Object.defineProperty(t,"HlcDataSeries",{enumerable:!0,get:function(){return tV.HlcDataSeries}});var tU=r(10799);Object.defineProperty(t,"EDataSeriesType",{enumerable:!0,get:function(){return tU.EDataSeriesType}});var tG=r(10799);Object.defineProperty(t,"EDataChangeType",{enumerable:!0,get:function(){return tG.EDataChangeType}});var tW=r(10799);Object.defineProperty(t,"EDataSeriesValueType",{enumerable:!0,get:function(){return tW.EDataSeriesValueType}});var tK=r(84019);Object.defineProperty(t,"EStrokePaletteMode",{enumerable:!0,get:function(){return tK.EStrokePaletteMode}});var tq=r(84019);Object.defineProperty(t,"EFillPaletteMode",{enumerable:!0,get:function(){return tq.EFillPaletteMode}});var tX=r(84019);Object.defineProperty(t,"DefaultPaletteProvider",{enumerable:!0,get:function(){return tX.DefaultPaletteProvider}});var t$=r(48763);Object.defineProperty(t,"TemplateMetadataGenerator",{enumerable:!0,get:function(){return t$.TemplateMetadataGenerator}});var tY=r(75775);Object.defineProperty(t,"MetadataPaletteProvider",{enumerable:!0,get:function(){return tY.MetadataPaletteProvider}});var tJ=r(79496);Object.defineProperty(t,"NonUniformHeatmapDataSeries",{enumerable:!0,get:function(){return tJ.NonUniformHeatmapDataSeries}});var tQ=r(93809);Object.defineProperty(t,"OhlcDataSeries",{enumerable:!0,get:function(){return tQ.OhlcDataSeries}});var t0=r(93809);Object.defineProperty(t,"getOHLCYRange",{enumerable:!0,get:function(){return t0.getOHLCYRange}});var t1=r(17939);Object.defineProperty(t,"PaletteFactory",{enumerable:!0,get:function(){return t1.PaletteFactory}});var t2=r(39975);Object.defineProperty(t,"BasePointSeriesResampled",{enumerable:!0,get:function(){return t2.BasePointSeriesResampled}});var t3=r(51284);Object.defineProperty(t,"BasePointSeriesWrapped",{enumerable:!0,get:function(){return t3.BasePointSeriesWrapped}});var t4=r(22394);Object.defineProperty(t,"BoxPlotPointSeriesWrapped",{enumerable:!0,get:function(){return t4.BoxPlotPointSeriesWrapped}});var t6=r(71537);Object.defineProperty(t,"HlcPointSeriesWrapped",{enumerable:!0,get:function(){return t6.HlcPointSeriesWrapped}});var t5=r(70255);Object.defineProperty(t,"OhlcPointSeriesResampled",{enumerable:!0,get:function(){return t5.OhlcPointSeriesResampled}});var t7=r(57861);Object.defineProperty(t,"OhlcPointSeriesWrapped",{enumerable:!0,get:function(){return t7.OhlcPointSeriesWrapped}});var t8=r(80240);Object.defineProperty(t,"XyNPointSeriesResampled",{enumerable:!0,get:function(){return t8.XyNPointSeriesResampled}});var t9=r(9298);Object.defineProperty(t,"XyPointSeriesResampled",{enumerable:!0,get:function(){return t9.XyPointSeriesResampled}});var re=r(56842);Object.defineProperty(t,"XyPointSeriesWrapped",{enumerable:!0,get:function(){return re.XyPointSeriesWrapped}});var rt=r(27846);Object.defineProperty(t,"XyyPointSeriesResampled",{enumerable:!0,get:function(){return rt.XyyPointSeriesResampled}});var rr=r(30129);Object.defineProperty(t,"XyyPointSeriesWrapped",{enumerable:!0,get:function(){return rr.XyyPointSeriesWrapped}});var rn=r(94477);Object.defineProperty(t,"XyzPointSeriesResampled",{enumerable:!0,get:function(){return rn.XyzPointSeriesResampled}});var ra=r(72500);Object.defineProperty(t,"XyzPointSeriesWrapped",{enumerable:!0,get:function(){return ra.XyzPointSeriesWrapped}});var ro=r(51547);Object.defineProperty(t,"UniformHeatmapDataSeries",{enumerable:!0,get:function(){return ro.UniformHeatmapDataSeries}});var ri=r(72677);Object.defineProperty(t,"XDataSeries",{enumerable:!0,get:function(){return ri.XDataSeries}});var rs=r(44039);Object.defineProperty(t,"XyDataSeries",{enumerable:!0,get:function(){return rs.XyDataSeries}});var ru=r(54495);Object.defineProperty(t,"XyNDataSeries",{enumerable:!0,get:function(){return ru.XyNDataSeries}});var rc=r(24743);Object.defineProperty(t,"XyTextDataSeries",{enumerable:!0,get:function(){return rc.XyTextDataSeries}});var rl=r(79972);Object.defineProperty(t,"XyxDataSeries",{enumerable:!0,get:function(){return rl.XyxDataSeries}});var rd=r(56689);Object.defineProperty(t,"XyxyDataSeries",{enumerable:!0,get:function(){return rd.XyxyDataSeries}});var rf=r(66002);Object.defineProperty(t,"XyyDataSeries",{enumerable:!0,get:function(){return rf.XyyDataSeries}});var rp=r(66002);Object.defineProperty(t,"getYyYRange",{enumerable:!0,get:function(){return rp.getYyYRange}});var rh=r(71981);Object.defineProperty(t,"XyzDataSeries",{enumerable:!0,get:function(){return rh.XyzDataSeries}});var rm=r(46965);Object.defineProperty(t,"CategoryCoordinateCalculator",{enumerable:!0,get:function(){return rm.CategoryCoordinateCalculator}});var rg=r(81304);Object.defineProperty(t,"CoordinateCalculatorBase",{enumerable:!0,get:function(){return rg.CoordinateCalculatorBase}});var rv=r(88991);Object.defineProperty(t,"FlippedCategoryCoordinateCalculator",{enumerable:!0,get:function(){return rv.FlippedCategoryCoordinateCalculator}});var rb=r(37583);Object.defineProperty(t,"FlippedIndexCoordinateCalculator",{enumerable:!0,get:function(){return rb.FlippedIndexCoordinateCalculator}});var ry=r(84221);Object.defineProperty(t,"FlippedNumericCoordinateCalculator",{enumerable:!0,get:function(){return ry.FlippedNumericCoordinateCalculator}});var rS=r(77379);Object.defineProperty(t,"IndexCoordinateCalculator",{enumerable:!0,get:function(){return rS.IndexCoordinateCalculator}});var rP=r(94266);Object.defineProperty(t,"LogarithmicCoordinateCalculator",{enumerable:!0,get:function(){return rP.LogarithmicCoordinateCalculator}});var rT=r(16807);Object.defineProperty(t,"NumericCoordinateCalculator",{enumerable:!0,get:function(){return rT.NumericCoordinateCalculator}});var rx=r(25775);Object.defineProperty(t,"ExtremeResamplerHelper",{enumerable:!0,get:function(){return rx.ExtremeResamplerHelper}});var r_=r(42646);Object.defineProperty(t,"EResamplingMode",{enumerable:!0,get:function(){return r_.EResamplingMode}});var rA=r(74753);Object.defineProperty(t,"ResamplingParams",{enumerable:!0,get:function(){return rA.ResamplingParams}});var rO=r(15539);Object.defineProperty(t,"DefaultTickCoordinatesProvider",{enumerable:!0,get:function(){return rO.DefaultTickCoordinatesProvider}});var rw=r(51493);Object.defineProperty(t,"PolarTickCoordinatesProvider",{enumerable:!0,get:function(){return rw.PolarTickCoordinatesProvider}});var rE=r(88744);Object.defineProperty(t,"StaticTickCoordinatesProvider",{enumerable:!0,get:function(){return rE.StaticTickCoordinatesProvider}});var rk=r(52015);Object.defineProperty(t,"TickCoordinatesProvider",{enumerable:!0,get:function(){return rk.TickCoordinatesProvider}});var rD=r(865);Object.defineProperty(t,"IndexTickProvider",{enumerable:!0,get:function(){return rD.IndexTickProvider}});var rM=r(21669);Object.defineProperty(t,"ELogarithmicMinorTickMode",{enumerable:!0,get:function(){return rM.ELogarithmicMinorTickMode}});var rC=r(21669);Object.defineProperty(t,"ELogarithmicMajorTickMode",{enumerable:!0,get:function(){return rC.ELogarithmicMajorTickMode}});var rj=r(21669);Object.defineProperty(t,"LogarithmicTickProvider",{enumerable:!0,get:function(){return rj.LogarithmicTickProvider}});var rR=r(33228);Object.defineProperty(t,"NumericTickProvider",{enumerable:!0,get:function(){return rR.NumericTickProvider}});var rI=r(37795);Object.defineProperty(t,"TickProvider",{enumerable:!0,get:function(){return rI.TickProvider}});var rN=r(65842);Object.defineProperty(t,"ChartTitleRenderer",{enumerable:!0,get:function(){return rN.ChartTitleRenderer}});var rL=r(74218);Object.defineProperty(t,"RenderPassData",{enumerable:!0,get:function(){return rL.RenderPassData}});var rB=r(38516);Object.defineProperty(t,"RenderPassDataCollection",{enumerable:!0,get:function(){return rB.RenderPassDataCollection}});var rF=r(87453);Object.defineProperty(t,"RenderPassInfo",{enumerable:!0,get:function(){return rF.RenderPassInfo}});var rz=r(89678);Object.defineProperty(t,"SciChartRenderer",{enumerable:!0,get:function(){return rz.SciChartRenderer}});var rZ=r(79137);Object.defineProperty(t,"TitleRendererBase",{enumerable:!0,get:function(){return rZ.TitleRendererBase}});var rH=r(79137);Object.defineProperty(t,"getAdjustedRotation",{enumerable:!0,get:function(){return rH.getAdjustedRotation}});var rV=r(37424);Object.defineProperty(t,"AUTO_COLOR",{enumerable:!0,get:function(){return rV.AUTO_COLOR}});var rU=r(37424);Object.defineProperty(t,"ThemeProvider",{enumerable:!0,get:function(){return rU.ThemeProvider}});var rG=r(37424);Object.defineProperty(t,"stripAutoColor",{enumerable:!0,get:function(){return rG.stripAutoColor}});var rW=r(29367);Object.defineProperty(t,"SciChartJSDarkTheme",{enumerable:!0,get:function(){return rW.SciChartJSDarkTheme}});var rK=r(91771);Object.defineProperty(t,"SciChartJSDarkv2Theme",{enumerable:!0,get:function(){return rK.SciChartJSDarkv2Theme}});var rq=r(8666);Object.defineProperty(t,"SciChartJSLightTheme",{enumerable:!0,get:function(){return rq.SciChartJSLightTheme}});var rX=r(61628);Object.defineProperty(t,"SciChartJsNavyTheme",{enumerable:!0,get:function(){return rX.SciChartJsNavyTheme}});var r$=r(35017);Object.defineProperty(t,"AdornerLayer",{enumerable:!0,get:function(){return r$.AdornerLayer}});var rY=r(31404);Object.defineProperty(t,"EDraggingGripPoint",{enumerable:!0,get:function(){return rY.EDraggingGripPoint}});var rJ=r(31404);Object.defineProperty(t,"ECoordinateMode",{enumerable:!0,get:function(){return rJ.ECoordinateMode}});var rQ=r(31404);Object.defineProperty(t,"AnnotationBase",{enumerable:!0,get:function(){return rQ.AnnotationBase}});var r0=r(44079);Object.defineProperty(t,"AnnotationClickEventArgs",{enumerable:!0,get:function(){return r0.AnnotationClickEventArgs}});var r1=r(46325);Object.defineProperty(t,"AnnotationDragDeltaEventArgs",{enumerable:!0,get:function(){return r1.AnnotationDragDeltaEventArgs}});var r2=r(17046);Object.defineProperty(t,"annotationHelpers",{enumerable:!0,get:function(){return r2.annotationHelpers}});var r3=r(75459);Object.defineProperty(t,"AnnotationHoverEventArgs",{enumerable:!0,get:function(){return r3.AnnotationHoverEventArgs}});var r4=r(54964);Object.defineProperty(t,"ArcAnnotation",{enumerable:!0,get:function(){return r4.ArcAnnotation}});var r6=r(4690);Object.defineProperty(t,"ArcAnnotationBase",{enumerable:!0,get:function(){return r6.ArcAnnotationBase}});var r5=r(68249);Object.defineProperty(t,"AxisMarkerAnnotation",{enumerable:!0,get:function(){return r5.AxisMarkerAnnotation}});var r7=r(822);Object.defineProperty(t,"BoxAnnotation",{enumerable:!0,get:function(){return r7.BoxAnnotation}});var r8=r(55713);Object.defineProperty(t,"CompositeAnnotation",{enumerable:!0,get:function(){return r8.CompositeAnnotation}});var r9=r(79146);Object.defineProperty(t,"CursorTooltipSvgAnnotation",{enumerable:!0,get:function(){return r9.CursorTooltipSvgAnnotation}});var ne=r(23482);Object.defineProperty(t,"CustomAnnotation",{enumerable:!0,get:function(){return ne.CustomAnnotation}});var nt=r(33577);Object.defineProperty(t,"DomAnnotationBase",{enumerable:!0,get:function(){return nt.DomAnnotationBase}});var nr=r(48903);Object.defineProperty(t,"HorizontalLineAnnotation",{enumerable:!0,get:function(){return nr.HorizontalLineAnnotation}});var nn=r(94668);Object.defineProperty(t,"HtmlCustomAnnotation",{enumerable:!0,get:function(){return nn.HtmlCustomAnnotation}});var na=r(96182);Object.defineProperty(t,"HtmlTextAnnotation",{enumerable:!0,get:function(){return na.HtmlTextAnnotation}});var no=r(92402);Object.defineProperty(t,"EAnnotationLayer",{enumerable:!0,get:function(){return no.EAnnotationLayer}});var ni=r(92402);Object.defineProperty(t,"EAnnotationType",{enumerable:!0,get:function(){return ni.EAnnotationType}});var ns=r(64038);Object.defineProperty(t,"LineAnnotation",{enumerable:!0,get:function(){return ns.LineAnnotation}});var nu=r(83756);Object.defineProperty(t,"EArrowHeadPosition",{enumerable:!0,get:function(){return nu.EArrowHeadPosition}});var nc=r(83756);Object.defineProperty(t,"LineArrowAnnotation",{enumerable:!0,get:function(){return nc.LineArrowAnnotation}});var nl=r(63213);Object.defineProperty(t,"EWrapTo",{enumerable:!0,get:function(){return nl.EWrapTo}});var nd=r(63213);Object.defineProperty(t,"NativeTextAnnotation",{enumerable:!0,get:function(){return nd.NativeTextAnnotation}});var nf=r(79705);Object.defineProperty(t,"OverviewCustomResizableAnnotation",{enumerable:!0,get:function(){return nf.OverviewCustomResizableAnnotation}});var np=r(59732);Object.defineProperty(t,"PolarArcAnnotation",{enumerable:!0,get:function(){return np.PolarArcAnnotation}});var nh=r(89183);Object.defineProperty(t,"PolarPointerAnnotation",{enumerable:!0,get:function(){return nh.PolarPointerAnnotation}});var nm=r(15731);Object.defineProperty(t,"RenderContextAnnotationBase",{enumerable:!0,get:function(){return nm.RenderContextAnnotationBase}});var ng=r(49708);Object.defineProperty(t,"RolloverLegendSvgAnnotation",{enumerable:!0,get:function(){return ng.RolloverLegendSvgAnnotation}});var nv=r(17655);Object.defineProperty(t,"RolloverMarkerSvgAnnotation",{enumerable:!0,get:function(){return nv.RolloverMarkerSvgAnnotation}});var nb=r(30013);Object.defineProperty(t,"RolloverTooltipSvgAnnotation",{enumerable:!0,get:function(){return nb.RolloverTooltipSvgAnnotation}});var ny=r(77395);Object.defineProperty(t,"SvgAnnotationBase",{enumerable:!0,get:function(){return ny.SvgAnnotationBase}});var nS=r(75647);Object.defineProperty(t,"SvgLineAnnotation",{enumerable:!0,get:function(){return nS.SvgLineAnnotation}});var nP=r(27257);Object.defineProperty(t,"TextAnnotation",{enumerable:!0,get:function(){return nP.TextAnnotation}});var nT=r(27013);Object.defineProperty(t,"VerticalLineAnnotation",{enumerable:!0,get:function(){return nT.VerticalLineAnnotation}});var nx=r(46526);Object.defineProperty(t,"EClipMode",{enumerable:!0,get:function(){return nx.EClipMode}});var n_=r(46526);Object.defineProperty(t,"AxisBase2D",{enumerable:!0,get:function(){return n_.AxisBase2D}});var nA=r(25219);Object.defineProperty(t,"AxisCore",{enumerable:!0,get:function(){return nA.AxisCore}});var nO=r(4620);Object.defineProperty(t,"AxisLayoutState",{enumerable:!0,get:function(){return nO.AxisLayoutState}});var nw=r(4620);Object.defineProperty(t,"PolarAxisLayoutState",{enumerable:!0,get:function(){return nw.PolarAxisLayoutState}});var nE=r(49767);Object.defineProperty(t,"AxisRenderer",{enumerable:!0,get:function(){return nE.AxisRenderer}});var nk=r(63970);Object.defineProperty(t,"AxisTitleRenderer",{enumerable:!0,get:function(){return nk.AxisTitleRenderer}});var nD=r(17260);Object.defineProperty(t,"BaseValueAxis",{enumerable:!0,get:function(){return nD.BaseValueAxis}});var nM=r(15940);Object.defineProperty(t,"CategoryAxis",{enumerable:!0,get:function(){return nM.CategoryAxis}});var nC=r(78924);Object.defineProperty(t,"CategoryAxisBase",{enumerable:!0,get:function(){return nC.CategoryAxisBase}});var nj=r(94851);Object.defineProperty(t,"DateTimeNumericAxis",{enumerable:!0,get:function(){return nj.DateTimeNumericAxis}});var nR=r(13347);Object.defineProperty(t,"CategoryDeltaCalculator",{enumerable:!0,get:function(){return nR.CategoryDeltaCalculator}});var nI=r(64049);Object.defineProperty(t,"DateTimeDeltaCalculator",{enumerable:!0,get:function(){return nI.DateTimeDeltaCalculator}});var nN=r(31100);Object.defineProperty(t,"DeltaCalculator",{enumerable:!0,get:function(){return nN.DeltaCalculator}});var nL=r(18897);Object.defineProperty(t,"IndexDeltaCalculator",{enumerable:!0,get:function(){return nL.IndexDeltaCalculator}});var nB=r(40275);Object.defineProperty(t,"LogarithmicDeltaCalculator",{enumerable:!0,get:function(){return nB.LogarithmicDeltaCalculator}});var nF=r(15642);Object.defineProperty(t,"NumericDeltaCalculator",{enumerable:!0,get:function(){return nF.NumericDeltaCalculator}});var nz=r(11840);Object.defineProperty(t,"DiscontinuousDateAxis",{enumerable:!0,get:function(){return nz.DiscontinuousDateAxis}});var nZ=r(70306);Object.defineProperty(t,"getAxisById",{enumerable:!0,get:function(){return nZ.getAxisById}});var nH=r(70306);Object.defineProperty(t,"getAxis3dById",{enumerable:!0,get:function(){return nH.getAxis3dById}});var nV=r(54997);Object.defineProperty(t,"DateLabelProvider",{enumerable:!0,get:function(){return nV.DateLabelProvider}});var nU=r(6802);Object.defineProperty(t,"labelCache",{enumerable:!0,get:function(){return nU.labelCache}});var nG=r(31579);Object.defineProperty(t,"LabelProvider",{enumerable:!0,get:function(){return nG.LabelProvider}});var nW=r(46709);Object.defineProperty(t,"LabelInfo",{enumerable:!0,get:function(){return nW.LabelInfo}});var nK=r(46709);Object.defineProperty(t,"LabelProviderBase2D",{enumerable:!0,get:function(){return nK.LabelProviderBase2D}});var nq=r(16734);Object.defineProperty(t,"LogarithmicLabelProvider",{enumerable:!0,get:function(){return nq.LogarithmicLabelProvider}});var nX=r(58968);Object.defineProperty(t,"NumericLabelProvider",{enumerable:!0,get:function(){return nX.NumericLabelProvider}});var n$=r(95467);Object.defineProperty(t,"PieLabelProvider",{enumerable:!0,get:function(){return n$.PieLabelProvider}});var nY=r(54819);Object.defineProperty(t,"RadianLabelProvider",{enumerable:!0,get:function(){return nY.RadianLabelProvider}});var nJ=r(15684);Object.defineProperty(t,"ETradeChartLabelFormat",{enumerable:!0,get:function(){return nJ.ETradeChartLabelFormat}});var nQ=r(15684);Object.defineProperty(t,"EDatePrecision",{enumerable:!0,get:function(){return nQ.EDatePrecision}});var n0=r(15684);Object.defineProperty(t,"EHighPrecisionLabelMode",{enumerable:!0,get:function(){return n0.EHighPrecisionLabelMode}});var n1=r(15684);Object.defineProperty(t,"DEFAULT_LABEL_THRESHOLDS",{enumerable:!0,get:function(){return n1.DEFAULT_LABEL_THRESHOLDS}});var n2=r(15684);Object.defineProperty(t,"SmartDateLabelProvider",{enumerable:!0,get:function(){return n2.SmartDateLabelProvider}});var n3=r(36947);Object.defineProperty(t,"TextLabelProvider",{enumerable:!0,get:function(){return n3.TextLabelProvider}});var n4=r(36947);Object.defineProperty(t,"wrapText",{enumerable:!0,get:function(){return n4.wrapText}});var n6=r(18235);Object.defineProperty(t,"MIN_LOG_AXIS_VALUE",{enumerable:!0,get:function(){return n6.MIN_LOG_AXIS_VALUE}});var n5=r(18235);Object.defineProperty(t,"LogarithmicAxis",{enumerable:!0,get:function(){return n5.LogarithmicAxis}});var n7=r(68415);Object.defineProperty(t,"NativeAxisRenderer",{enumerable:!0,get:function(){return n7.NativeAxisRenderer}});var n8=r(23762);Object.defineProperty(t,"NumericAxis",{enumerable:!0,get:function(){return n8.NumericAxis}});var n9=r(18053);Object.defineProperty(t,"PolarAxisBase",{enumerable:!0,get:function(){return n9.PolarAxisBase}});var ae=r(6952);Object.defineProperty(t,"PolarAxisRenderer",{enumerable:!0,get:function(){return ae.PolarAxisRenderer}});var at=r(8271);Object.defineProperty(t,"PolarCategoryAxis",{enumerable:!0,get:function(){return at.PolarCategoryAxis}});var ar=r(43344);Object.defineProperty(t,"PolarNumericAxis",{enumerable:!0,get:function(){return ar.PolarNumericAxis}});var an=r(80958);Object.defineProperty(t,"EPolarAxisMode",{enumerable:!0,get:function(){return an.EPolarAxisMode}});var aa=r(88733);Object.defineProperty(t,"EPolarGridlineMode",{enumerable:!0,get:function(){return aa.EPolarGridlineMode}});var ao=r(20530);Object.defineProperty(t,"EPolarLabelMode",{enumerable:!0,get:function(){return ao.EPolarLabelMode}});var ai=r(87724);Object.defineProperty(t,"TextureAxisRenderer",{enumerable:!0,get:function(){return ai.TextureAxisRenderer}});var as=r(84998);Object.defineProperty(t,"VisibleRangeChangedArgs",{enumerable:!0,get:function(){return as.VisibleRangeChangedArgs}});var au=r(94383);Object.defineProperty(t,"getSharedWasmContext",{enumerable:!0,get:function(){return au.getSharedWasmContext}});var ac=r(94383);Object.defineProperty(t,"initializeChartEngine2D",{enumerable:!0,get:function(){return ac.initializeChartEngine2D}});var al=r(31997);Object.defineProperty(t,"HeatmapLegend",{enumerable:!0,get:function(){return al.HeatmapLegend}});var ad=r(23294);Object.defineProperty(t,"createNativeRect",{enumerable:!0,get:function(){return ad.createNativeRect}});var af=r(98538);Object.defineProperty(t,"createSCRTPen",{enumerable:!0,get:function(){return af.createSCRTPen}});var ap=r(31151);Object.defineProperty(t,"createSolidBrush",{enumerable:!0,get:function(){return ap.createSolidBrush}});var ah=r(52945);Object.defineProperty(t,"drawBorder",{enumerable:!0,get:function(){return ah.drawBorder}});var am=r(51708);Object.defineProperty(t,"drawModifiersAxisLabel",{enumerable:!0,get:function(){return am.drawModifiersAxisLabel}});var ag=r(51708);Object.defineProperty(t,"drawLineAnnotation",{enumerable:!0,get:function(){return ag.drawLineAnnotation}});var av=r(51708);Object.defineProperty(t,"drawAxisMarkerAnnotation",{enumerable:!0,get:function(){return av.drawAxisMarkerAnnotation}});var ab=r(51708);Object.defineProperty(t,"getLabelCoordinates",{enumerable:!0,get:function(){return ab.getLabelCoordinates}});var ay=r(51708);Object.defineProperty(t,"getLineCoordinates",{enumerable:!0,get:function(){return ay.getLineCoordinates}});var aS=r(51708);Object.defineProperty(t,"getLabelValue",{enumerable:!0,get:function(){return aS.getLabelValue}});var aP=r(11199);Object.defineProperty(t,"labelHelper",{enumerable:!0,get:function(){return aP.labelHelper}});var aT=r(65218);Object.defineProperty(t,"FontKey",{enumerable:!0,get:function(){return aT.FontKey}});var ax=r(65218);Object.defineProperty(t,"deleteCache",{enumerable:!0,get:function(){return ax.deleteCache}});var a_=r(65218);Object.defineProperty(t,"freeCache",{enumerable:!0,get:function(){return a_.freeCache}});var aA=r(65218);Object.defineProperty(t,"getVectorRectVertex",{enumerable:!0,get:function(){return aA.getVectorRectVertex}});var aO=r(65218);Object.defineProperty(t,"getVectorColorVertex",{enumerable:!0,get:function(){return aO.getVectorColorVertex}});var aw=r(65218);Object.defineProperty(t,"getVectorColorTextureVertex",{enumerable:!0,get:function(){return aw.getVectorColorTextureVertex}});var aE=r(65218);Object.defineProperty(t,"getVectorArcVertex",{enumerable:!0,get:function(){return aE.getVectorArcVertex}});var ak=r(65218);Object.defineProperty(t,"getVertex",{enumerable:!0,get:function(){return ak.getVertex}});var aD=r(65218);Object.defineProperty(t,"getArcVertex",{enumerable:!0,get:function(){return aD.getArcVertex}});var aM=r(65218);Object.defineProperty(t,"getArcParams",{enumerable:!0,get:function(){return aM.getArcParams}});var aC=r(65218);Object.defineProperty(t,"getTextureVertex",{enumerable:!0,get:function(){return aC.getTextureVertex}});var aj=r(65218);Object.defineProperty(t,"getTextBounds",{enumerable:!0,get:function(){return aj.getTextBounds}});var aR=r(65218);Object.defineProperty(t,"getNativeRect",{enumerable:!0,get:function(){return aR.getNativeRect}});var aI=r(65218);Object.defineProperty(t,"getVector4",{enumerable:!0,get:function(){return aI.getVector4}});var aN=r(65218);Object.defineProperty(t,"getVector2",{enumerable:!0,get:function(){return aN.getVector2}});var aL=r(65218);Object.defineProperty(t,"getVector3",{enumerable:!0,get:function(){return aL.getVector3}});var aB=r(65218);Object.defineProperty(t,"getFontKey",{enumerable:!0,get:function(){return aB.getFontKey}});var aF=r(65218);Object.defineProperty(t,"getAllFontKeys",{enumerable:!0,get:function(){return aF.getAllFontKeys}});var az=r(50303);Object.defineProperty(t,"polarChartHelper",{enumerable:!0,get:function(){return az.polarChartHelper}});var aZ=r(34049);Object.defineProperty(t,"ManualLegend",{enumerable:!0,get:function(){return aZ.ManualLegend}});var aH=r(39664);Object.defineProperty(t,"SciChart3DLegend",{enumerable:!0,get:function(){return aH.SciChart3DLegend}});var aV=r(19618);Object.defineProperty(t,"SciChartLegend",{enumerable:!0,get:function(){return aV.SciChartLegend}});var aU=r(87444);Object.defineProperty(t,"ELegendOrientation",{enumerable:!0,get:function(){return aU.ELegendOrientation}});var aG=r(87444);Object.defineProperty(t,"ELegendPlacement",{enumerable:!0,get:function(){return aG.ELegendPlacement}});var aW=r(87444);Object.defineProperty(t,"ELegendType",{enumerable:!0,get:function(){return aW.ELegendType}});var aK=r(87444);Object.defineProperty(t,"SciChartLegendBase",{enumerable:!0,get:function(){return aK.SciChartLegendBase}});var aq=r(87444);Object.defineProperty(t,"getLegendItemHtml",{enumerable:!0,get:function(){return aq.getLegendItemHtml}});var aX=r(87444);Object.defineProperty(t,"getLegendContainerHtml",{enumerable:!0,get:function(){return aX.getLegendContainerHtml}});var a$=r(69013);Object.defineProperty(t,"SciChartPieLegend",{enumerable:!0,get:function(){return a$.SciChartPieLegend}});var aY=r(91952);Object.defineProperty(t,"licenseManager2dState",{enumerable:!0,get:function(){return aY.licenseManager2dState}});var aJ=r(40001);Object.defineProperty(t,"DefaultSciChartLoader",{enumerable:!0,get:function(){return aJ.DefaultSciChartLoader}});var aQ=r(54650);Object.defineProperty(t,"BasePointMarker",{enumerable:!0,get:function(){return aQ.BasePointMarker}});var a0=r(74137);Object.defineProperty(t,"CrossPointMarker",{enumerable:!0,get:function(){return a0.CrossPointMarker}});var a1=r(22863);Object.defineProperty(t,"EllipsePointMarker",{enumerable:!0,get:function(){return a1.EllipsePointMarker}});var a2=r(17715);Object.defineProperty(t,"SpritePointMarker",{enumerable:!0,get:function(){return a2.SpritePointMarker}});var a3=r(93293);Object.defineProperty(t,"SquarePointMarker",{enumerable:!0,get:function(){return a3.SquarePointMarker}});var a4=r(80783);Object.defineProperty(t,"TrianglePointMarker",{enumerable:!0,get:function(){return a4.TrianglePointMarker}});var a6=r(79563);Object.defineProperty(t,"XPointMarker",{enumerable:!0,get:function(){return a6.XPointMarker}});var a5=r(20374);Object.defineProperty(t,"animationHelpers",{enumerable:!0,get:function(){return a5.animationHelpers}});var a7=r(21118);Object.defineProperty(t,"BandAnimation",{enumerable:!0,get:function(){return a7.BandAnimation}});var a8=r(86144);Object.defineProperty(t,"BandAnimationStyle",{enumerable:!0,get:function(){return a8.BandAnimationStyle}});var a9=r(42510);Object.defineProperty(t,"BaseAnimationStyle",{enumerable:!0,get:function(){return a9.BaseAnimationStyle}});var oe=r(382);Object.defineProperty(t,"BasePointMarkerStyle",{enumerable:!0,get:function(){return oe.BasePointMarkerStyle}});var ot=r(27985);Object.defineProperty(t,"BubbleAnimation",{enumerable:!0,get:function(){return ot.BubbleAnimation}});var or=r(32659);Object.defineProperty(t,"CandlestickAnimation",{enumerable:!0,get:function(){return or.CandlestickAnimation}});var on=r(12771);Object.defineProperty(t,"CandlestickAnimationStyle",{enumerable:!0,get:function(){return on.CandlestickAnimationStyle}});var oa=r(41639);Object.defineProperty(t,"ColumnAnimation",{enumerable:!0,get:function(){return oa.ColumnAnimation}});var oo=r(90108);Object.defineProperty(t,"ColumnAnimationStyle",{enumerable:!0,get:function(){return oo.ColumnAnimationStyle}});var oi=r(83007);Object.defineProperty(t,"CustomPointMarkerStyle",{enumerable:!0,get:function(){return oi.CustomPointMarkerStyle}});var os=r(69468);Object.defineProperty(t,"FadeAnimation",{enumerable:!0,get:function(){return os.FadeAnimation}});var ou=r(97091);Object.defineProperty(t,"LineAnimation",{enumerable:!0,get:function(){return ou.LineAnimation}});var oc=r(2035);Object.defineProperty(t,"MountainAnimation",{enumerable:!0,get:function(){return oc.MountainAnimation}});var ol=r(54351);Object.defineProperty(t,"MountainAnimationStyle",{enumerable:!0,get:function(){return ol.MountainAnimationStyle}});var od=r(98147);Object.defineProperty(t,"OhlcAnimation",{enumerable:!0,get:function(){return od.OhlcAnimation}});var of=r(8563);Object.defineProperty(t,"OhlcAnimationStyle",{enumerable:!0,get:function(){return of.OhlcAnimationStyle}});var oh=r(68352);Object.defineProperty(t,"PointMarkerStyle",{enumerable:!0,get:function(){return oh.PointMarkerStyle}});var om=r(14158);Object.defineProperty(t,"ScaleAnimation",{enumerable:!0,get:function(){return om.ScaleAnimation}});var og=r(12834);Object.defineProperty(t,"ScatterAnimation",{enumerable:!0,get:function(){return og.ScatterAnimation}});var ov=r(8445);Object.defineProperty(t,"SeriesAnimation",{enumerable:!0,get:function(){return ov.SeriesAnimation}});var ob=r(26142);Object.defineProperty(t,"SweepAnimation",{enumerable:!0,get:function(){return ob.SweepAnimation}});var oy=r(25106);Object.defineProperty(t,"WaveAnimation",{enumerable:!0,get:function(){return oy.WaveAnimation}});var oS=r(90930);Object.defineProperty(t,"BaseBandRenderableSeries",{enumerable:!0,get:function(){return oS.BaseBandRenderableSeries}});var oP=r(62772);Object.defineProperty(t,"BaseHeatmapRenderableSeries",{enumerable:!0,get:function(){return oP.BaseHeatmapRenderableSeries}});var oT=r(44091);Object.defineProperty(t,"ELineType",{enumerable:!0,get:function(){return oT.ELineType}});var ox=r(44091);Object.defineProperty(t,"BaseLineRenderableSeries",{enumerable:!0,get:function(){return ox.BaseLineRenderableSeries}});var o_=r(63403);Object.defineProperty(t,"BaseMountainRenderableSeries",{enumerable:!0,get:function(){return o_.BaseMountainRenderableSeries}});var oA=r(90928);Object.defineProperty(t,"BaseOhlcRenderableSeries",{enumerable:!0,get:function(){return oA.BaseOhlcRenderableSeries}});var oO=r(20343);Object.defineProperty(t,"BaseRenderableSeries",{enumerable:!0,get:function(){return oO.BaseRenderableSeries}});var ow=r(55662);Object.defineProperty(t,"BaseStackedCollection",{enumerable:!0,get:function(){return ow.BaseStackedCollection}});var oE=r(35930);Object.defineProperty(t,"BaseStackedMountainRenderableSeries",{enumerable:!0,get:function(){return oE.BaseStackedMountainRenderableSeries}});var ok=r(67844);Object.defineProperty(t,"BaseStackedRenderableSeries",{enumerable:!0,get:function(){return ok.BaseStackedRenderableSeries}});var oD=r(67502);Object.defineProperty(t,"BandSeriesDataLabelProvider",{enumerable:!0,get:function(){return oD.BandSeriesDataLabelProvider}});var oM=r(18575);Object.defineProperty(t,"BaseDataLabelProvider",{enumerable:!0,get:function(){return oM.BaseDataLabelProvider}});var oC=r(7115);Object.defineProperty(t,"BubbleSeriesDataLabelProvider",{enumerable:!0,get:function(){return oC.BubbleSeriesDataLabelProvider}});var oj=r(99939);Object.defineProperty(t,"EColumnDataLabelPosition",{enumerable:!0,get:function(){return oj.EColumnDataLabelPosition}});var oR=r(99939);Object.defineProperty(t,"ColumnSeriesDataLabelProvider",{enumerable:!0,get:function(){return oR.ColumnSeriesDataLabelProvider}});var oI=r(21130);Object.defineProperty(t,"ContoursDataLabelProvider",{enumerable:!0,get:function(){return oI.ContoursDataLabelProvider}});var oN=r(93628);Object.defineProperty(t,"dataLabelHelpers",{enumerable:!0,get:function(){return oN.dataLabelHelpers}});var oL=r(72248);Object.defineProperty(t,"DataLabelProvider",{enumerable:!0,get:function(){return oL.DataLabelProvider}});var oB=r(98477);Object.defineProperty(t,"DataLabelState",{enumerable:!0,get:function(){return oB.DataLabelState}});var oF=r(51836);Object.defineProperty(t,"HeatMapDataLabelProvider",{enumerable:!0,get:function(){return oF.HeatMapDataLabelProvider}});var oz=r(48620);Object.defineProperty(t,"LineSeriesDataLabelProvider",{enumerable:!0,get:function(){return oz.LineSeriesDataLabelProvider}});var oZ=r(94481);Object.defineProperty(t,"NonUniformHeatMapDataLabelProvider",{enumerable:!0,get:function(){return oZ.NonUniformHeatMapDataLabelProvider}});var oH=r(83197);Object.defineProperty(t,"RectangleDataLabelState",{enumerable:!0,get:function(){return oH.RectangleDataLabelState}});var oV=r(50271);Object.defineProperty(t,"RectangleSeriesDataLabelProvider",{enumerable:!0,get:function(){return oV.RectangleSeriesDataLabelProvider}});var oU=r(95915);Object.defineProperty(t,"StackedCollectionDataLabelProvider",{enumerable:!0,get:function(){return oU.StackedCollectionDataLabelProvider}});var oG=r(78600);Object.defineProperty(t,"StackedColumnSeriesDataLabelProvider",{enumerable:!0,get:function(){return oG.StackedColumnSeriesDataLabelProvider}});var oW=r(72609);Object.defineProperty(t,"TextDataLabelProvider",{enumerable:!0,get:function(){return oW.TextDataLabelProvider}});var oK=r(43060);Object.defineProperty(t,"BandSeriesDrawingProvider",{enumerable:!0,get:function(){return oK.BandSeriesDrawingProvider}});var oq=r(39195);Object.defineProperty(t,"BaseSeriesDrawingProvider",{enumerable:!0,get:function(){return oq.BaseSeriesDrawingProvider}});var oX=r(4352);Object.defineProperty(t,"BoxPlotSeriesDrawingProvider",{enumerable:!0,get:function(){return oX.BoxPlotSeriesDrawingProvider}});var o$=r(34864);Object.defineProperty(t,"BubbleSeriesDrawingProvider",{enumerable:!0,get:function(){return o$.BubbleSeriesDrawingProvider}});var oY=r(85060);Object.defineProperty(t,"ColumnSeriesDrawingProvider",{enumerable:!0,get:function(){return oY.ColumnSeriesDrawingProvider}});var oJ=r(49044);Object.defineProperty(t,"ErrorSeriesDrawingProvider",{enumerable:!0,get:function(){return oJ.ErrorSeriesDrawingProvider}});var oQ=r(67748);Object.defineProperty(t,"getColorDataForTexture",{enumerable:!0,get:function(){return oQ.getColorDataForTexture}});var o0=r(67748);Object.defineProperty(t,"getColor",{enumerable:!0,get:function(){return o0.getColor}});var o1=r(67748);Object.defineProperty(t,"createColorMap",{enumerable:!0,get:function(){return o1.createColorMap}});var o2=r(67748);Object.defineProperty(t,"calculateOffsets",{enumerable:!0,get:function(){return o2.calculateOffsets}});var o3=r(67748);Object.defineProperty(t,"calculateCellCoordinates",{enumerable:!0,get:function(){return o3.calculateCellCoordinates}});var o4=r(67748);Object.defineProperty(t,"calculateHeatmapTexture",{enumerable:!0,get:function(){return o4.calculateHeatmapTexture}});var o6=r(7486);Object.defineProperty(t,"HeightSeriesDrawingProvider",{enumerable:!0,get:function(){return o6.HeightSeriesDrawingProvider}});var o5=r(86333);Object.defineProperty(t,"LineSegmentSeriesDrawingProvider",{enumerable:!0,get:function(){return o5.LineSegmentSeriesDrawingProvider}});var o7=r(13807);Object.defineProperty(t,"LineSeriesDrawingProvider",{enumerable:!0,get:function(){return o7.LineSeriesDrawingProvider}});var o8=r(77687);Object.defineProperty(t,"MountainSeriesDrawingProvider",{enumerable:!0,get:function(){return o8.MountainSeriesDrawingProvider}});var o9=r(52836);Object.defineProperty(t,"NonUniformHeatmapDrawingProvider",{enumerable:!0,get:function(){return o9.NonUniformHeatmapDrawingProvider}});var ie=r(96770);Object.defineProperty(t,"EOhlcDrawingMode",{enumerable:!0,get:function(){return ie.EOhlcDrawingMode}});var it=r(96770);Object.defineProperty(t,"OhlcSeriesDrawingProvider",{enumerable:!0,get:function(){return it.OhlcSeriesDrawingProvider}});var ir=r(68291);Object.defineProperty(t,"PointMarkerDrawingProvider",{enumerable:!0,get:function(){return ir.PointMarkerDrawingProvider}});var ia=r(85956);Object.defineProperty(t,"RectangleSeriesDrawingProvider",{enumerable:!0,get:function(){return ia.RectangleSeriesDrawingProvider}});var io=r(96833);Object.defineProperty(t,"SmearSeriesDrawingProvider",{enumerable:!0,get:function(){return io.SmearSeriesDrawingProvider}});var ii=r(41569);Object.defineProperty(t,"StackedColumnRenderPassData",{enumerable:!0,get:function(){return ii.StackedColumnRenderPassData}});var is=r(41569);Object.defineProperty(t,"StackedColumnSeriesDrawingProvider",{enumerable:!0,get:function(){return is.StackedColumnSeriesDrawingProvider}});var iu=r(93201);Object.defineProperty(t,"TriangleSeriesDrawingProvider",{enumerable:!0,get:function(){return iu.TriangleSeriesDrawingProvider}});var ic=r(24608);Object.defineProperty(t,"UniformContoursDrawingProvider",{enumerable:!0,get:function(){return ic.UniformContoursDrawingProvider}});var il=r(14443);Object.defineProperty(t,"UniformHeatmapDrawingProvider",{enumerable:!0,get:function(){return il.UniformHeatmapDrawingProvider}});var id=r(86075);Object.defineProperty(t,"FastBandRenderableSeries",{enumerable:!0,get:function(){return id.FastBandRenderableSeries}});var ip=r(49487);Object.defineProperty(t,"FastBoxPlotRenderableSeries",{enumerable:!0,get:function(){return ip.FastBoxPlotRenderableSeries}});var ih=r(1390);Object.defineProperty(t,"FastBubbleRenderableSeries",{enumerable:!0,get:function(){return ih.FastBubbleRenderableSeries}});var im=r(70654);Object.defineProperty(t,"FastCandlestickRenderableSeries",{enumerable:!0,get:function(){return im.FastCandlestickRenderableSeries}});var ig=r(99820);Object.defineProperty(t,"FastColumnRenderableSeries",{enumerable:!0,get:function(){return ig.FastColumnRenderableSeries}});var iv=r(99820);Object.defineProperty(t,"getXRange",{enumerable:!0,get:function(){return iv.getXRange}});var ib=r(22170);Object.defineProperty(t,"FastErrorBarsRenderableSeries",{enumerable:!0,get:function(){return ib.FastErrorBarsRenderableSeries}});var iy=r(31365);Object.defineProperty(t,"FastImpulseRenderableSeries",{enumerable:!0,get:function(){return iy.FastImpulseRenderableSeries}});var iS=r(76320);Object.defineProperty(t,"FastLineRenderableSeries",{enumerable:!0,get:function(){return iS.FastLineRenderableSeries}});var iP=r(52971);Object.defineProperty(t,"FastLineSegmentRenderableSeries",{enumerable:!0,get:function(){return iP.FastLineSegmentRenderableSeries}});var iT=r(55824);Object.defineProperty(t,"FastMountainRenderableSeries",{enumerable:!0,get:function(){return iT.FastMountainRenderableSeries}});var ix=r(60898);Object.defineProperty(t,"FastOhlcRenderableSeries",{enumerable:!0,get:function(){return ix.FastOhlcRenderableSeries}});var i_=r(62279);Object.defineProperty(t,"FastRectangleRenderableSeries",{enumerable:!0,get:function(){return i_.FastRectangleRenderableSeries}});var iA=r(60971);Object.defineProperty(t,"FastTextRenderableSeries",{enumerable:!0,get:function(){return iA.FastTextRenderableSeries}});var iO=r(15782);Object.defineProperty(t,"FastTriangleRenderableSeries",{enumerable:!0,get:function(){return iO.FastTriangleRenderableSeries}});var iw=r(28360);Object.defineProperty(t,"GlowEffect",{enumerable:!0,get:function(){return iw.GlowEffect}});var iE=r(50735);Object.defineProperty(t,"HeatmapColorMap",{enumerable:!0,get:function(){return iE.HeatmapColorMap}});var ik=r(94760);Object.defineProperty(t,"BandSeriesHitTestProvider",{enumerable:!0,get:function(){return ik.BandSeriesHitTestProvider}});var iD=r(61998);Object.defineProperty(t,"BaseHitTestProvider",{enumerable:!0,get:function(){return iD.BaseHitTestProvider}});var iM=r(73220);Object.defineProperty(t,"BoxPlotSeriesHitTestProvider",{enumerable:!0,get:function(){return iM.BoxPlotSeriesHitTestProvider}});var iC=r(79779);Object.defineProperty(t,"BubbleSeriesHitTestProvider",{enumerable:!0,get:function(){return iC.BubbleSeriesHitTestProvider}});var ij=r(44624);Object.defineProperty(t,"ColumnSeriesHitTestProvider",{enumerable:!0,get:function(){return ij.ColumnSeriesHitTestProvider}});var iR=r(1913);Object.defineProperty(t,"ErrorSeriesHitTestProvider",{enumerable:!0,get:function(){return iR.ErrorSeriesHitTestProvider}});var iI=r(28288);Object.defineProperty(t,"hitTestHelpers",{enumerable:!0,get:function(){return iI.hitTestHelpers}});var iN=r(20568);Object.defineProperty(t,"hitTestHelpersRectangleSeries",{enumerable:!0,get:function(){return iN.hitTestHelpersRectangleSeries}});var iL=r(40117);Object.defineProperty(t,"HitTestInfo",{enumerable:!0,get:function(){return iL.HitTestInfo}});var iB=r(91067);Object.defineProperty(t,"ImpulseSeriesHitTestProvider",{enumerable:!0,get:function(){return iB.ImpulseSeriesHitTestProvider}});var iF=r(22414);Object.defineProperty(t,"LineSegmentSeriesHitTestProvider",{enumerable:!0,get:function(){return iF.LineSegmentSeriesHitTestProvider}});var iz=r(16336);Object.defineProperty(t,"LineSeriesHitTestProvider",{enumerable:!0,get:function(){return iz.LineSeriesHitTestProvider}});var iZ=r(74625);Object.defineProperty(t,"MountainSeriesHitTestProvider",{enumerable:!0,get:function(){return iZ.MountainSeriesHitTestProvider}});var iH=r(67308);Object.defineProperty(t,"NonUniformHeatmapHitTestProvider",{enumerable:!0,get:function(){return iH.NonUniformHeatmapHitTestProvider}});var iV=r(15544);Object.defineProperty(t,"OhlcSeriesHitTestProvider",{enumerable:!0,get:function(){return iV.OhlcSeriesHitTestProvider}});var iU=r(15893);Object.defineProperty(t,"RectangleSeriesHitTestProvider",{enumerable:!0,get:function(){return iU.RectangleSeriesHitTestProvider}});var iG=r(53518);Object.defineProperty(t,"ScatterSeriesHitTestProvider",{enumerable:!0,get:function(){return iG.ScatterSeriesHitTestProvider}});var iW=r(64510);Object.defineProperty(t,"StackedColumnSeriesHitTestProvider",{enumerable:!0,get:function(){return iW.StackedColumnSeriesHitTestProvider}});var iK=r(3972);Object.defineProperty(t,"StackedMountainSeriesHitTestProvider",{enumerable:!0,get:function(){return iK.StackedMountainSeriesHitTestProvider}});var iq=r(56702);Object.defineProperty(t,"TextSeriesHitTestProvider",{enumerable:!0,get:function(){return iq.TextSeriesHitTestProvider}});var iX=r(3666);Object.defineProperty(t,"TriangleSeriesHitTestProvider",{enumerable:!0,get:function(){return iX.TriangleSeriesHitTestProvider}});var i$=r(63781);Object.defineProperty(t,"UniformHeatmapHitTestProvider",{enumerable:!0,get:function(){return i$.UniformHeatmapHitTestProvider}});var iY=r(17297);Object.defineProperty(t,"HoveredChangedArgs",{enumerable:!0,get:function(){return iY.HoveredChangedArgs}});var iJ=r(47791);Object.defineProperty(t,"NonUniformHeatmapRenderableSeries",{enumerable:!0,get:function(){return iJ.NonUniformHeatmapRenderableSeries}});var iQ=r(73370);Object.defineProperty(t,"PolarColumnDataLabelState",{enumerable:!0,get:function(){return iQ.PolarColumnDataLabelState}});var i0=r(18631);Object.defineProperty(t,"PolarColumnSeriesDataLabelProvider",{enumerable:!0,get:function(){return i0.PolarColumnSeriesDataLabelProvider}});var i1=r(91962);Object.defineProperty(t,"PolarDataLabelProvider",{enumerable:!0,get:function(){return i1.PolarDataLabelProvider}});var i2=r(95835);Object.defineProperty(t,"PolarDataLabelState",{enumerable:!0,get:function(){return i2.PolarDataLabelState}});var i3=r(74804);Object.defineProperty(t,"PolarHeatMapDataLabelProvider",{enumerable:!0,get:function(){return i3.PolarHeatMapDataLabelProvider}});var i4=r(17290);Object.defineProperty(t,"PolarTextDataLabelProvider",{enumerable:!0,get:function(){return i4.PolarTextDataLabelProvider}});var i6=r(25517);Object.defineProperty(t,"PolarBandSeriesDrawingProvider",{enumerable:!0,get:function(){return i6.PolarBandSeriesDrawingProvider}});var i5=r(56232);Object.defineProperty(t,"PolarColumnSeriesDrawingProvider",{enumerable:!0,get:function(){return i5.PolarColumnSeriesDrawingProvider}});var i7=r(37136);Object.defineProperty(t,"PolarHeatmapDrawingProvider",{enumerable:!0,get:function(){return i7.PolarHeatmapDrawingProvider}});var i8=r(58412);Object.defineProperty(t,"PolarLineSeriesDrawingProvider",{enumerable:!0,get:function(){return i8.PolarLineSeriesDrawingProvider}});var i9=r(90023);Object.defineProperty(t,"PolarPointMarkerDrawingProvider",{enumerable:!0,get:function(){return i9.PolarPointMarkerDrawingProvider}});var se=r(49441);Object.defineProperty(t,"PolarTriangleSeriesDrawingProvider",{enumerable:!0,get:function(){return se.PolarTriangleSeriesDrawingProvider}});var st=r(1295);Object.defineProperty(t,"PolarDataPointHitTestProvider",{enumerable:!0,get:function(){return st.PolarDataPointHitTestProvider}});var sr=r(12395);Object.defineProperty(t,"polarHitTestHelpers",{enumerable:!0,get:function(){return sr.polarHitTestHelpers}});var sn=r(18333);Object.defineProperty(t,"PolarLineSeriesHitTestProvider",{enumerable:!0,get:function(){return sn.PolarLineSeriesHitTestProvider}});var sa=r(24997);Object.defineProperty(t,"PolarMountainSeriesHitTestProvider",{enumerable:!0,get:function(){return sa.PolarMountainSeriesHitTestProvider}});var so=r(88683);Object.defineProperty(t,"PolarBandRenderableSeries",{enumerable:!0,get:function(){return so.PolarBandRenderableSeries}});var si=r(51886);Object.defineProperty(t,"PolarColumnRenderableSeries",{enumerable:!0,get:function(){return si.PolarColumnRenderableSeries}});var ss=r(85632);Object.defineProperty(t,"PolarLineRenderableSeries",{enumerable:!0,get:function(){return ss.PolarLineRenderableSeries}});var su=r(62768);Object.defineProperty(t,"PolarMountainRenderableSeries",{enumerable:!0,get:function(){return su.PolarMountainRenderableSeries}});var sc=r(83947);Object.defineProperty(t,"PolarStackedColumnCollection",{enumerable:!0,get:function(){return sc.PolarStackedColumnCollection}});var sl=r(58574);Object.defineProperty(t,"PolarStackedColumnRenderableSeries",{enumerable:!0,get:function(){return sl.PolarStackedColumnRenderableSeries}});var sd=r(37944);Object.defineProperty(t,"PolarStackedMountainCollection",{enumerable:!0,get:function(){return sd.PolarStackedMountainCollection}});var sf=r(6534);Object.defineProperty(t,"PolarStackedMountainRenderableSeries",{enumerable:!0,get:function(){return sf.PolarStackedMountainRenderableSeries}});var sp=r(47721);Object.defineProperty(t,"PolarTextRenderableSeries",{enumerable:!0,get:function(){return sp.PolarTextRenderableSeries}});var sh=r(37330);Object.defineProperty(t,"PolarTriangleRenderableSeries",{enumerable:!0,get:function(){return sh.PolarTriangleRenderableSeries}});var sm=r(75876);Object.defineProperty(t,"PolarUniformHeatmapRenderableSeries",{enumerable:!0,get:function(){return sm.PolarUniformHeatmapRenderableSeries}});var sg=r(58618);Object.defineProperty(t,"PolarXyScatterRenderableSeries",{enumerable:!0,get:function(){return sg.PolarXyScatterRenderableSeries}});var sv=r(25554);Object.defineProperty(t,"BaseRenderDataTransform",{enumerable:!0,get:function(){return sv.BaseRenderDataTransform}});var sb=r(25554);Object.defineProperty(t,"XyBaseRenderDataTransform",{enumerable:!0,get:function(){return sb.XyBaseRenderDataTransform}});var sy=r(25554);Object.defineProperty(t,"XyyBaseRenderDataTransform",{enumerable:!0,get:function(){return sy.XyyBaseRenderDataTransform}});var sS=r(25554);Object.defineProperty(t,"OhlcBaseRenderDataTransform",{enumerable:!0,get:function(){return sS.OhlcBaseRenderDataTransform}});var sP=r(25554);Object.defineProperty(t,"XyzBaseRenderDataTransform",{enumerable:!0,get:function(){return sP.XyzBaseRenderDataTransform}});var sT=r(22201);Object.defineProperty(t,"BaseRenderDataTransformJS",{enumerable:!0,get:function(){return sT.BaseRenderDataTransformJS}});var sx=r(10794);Object.defineProperty(t,"bezierTransform",{enumerable:!0,get:function(){return sx.bezierTransform}});var s_=r(10794);Object.defineProperty(t,"BezierRenderDataTransform",{enumerable:!0,get:function(){return s_.BezierRenderDataTransform}});var sA=r(10794);Object.defineProperty(t,"XyyBezierRenderDataTransform",{enumerable:!0,get:function(){return sA.XyyBezierRenderDataTransform}});var sO=r(10794);Object.defineProperty(t,"SmoothStackedRenderDataTransform",{enumerable:!0,get:function(){return sO.SmoothStackedRenderDataTransform}});var sw=r(67760);Object.defineProperty(t,"PolarInterpolateBandRenderDataTransform",{enumerable:!0,get:function(){return sw.PolarInterpolateBandRenderDataTransform}});var sE=r(74403);Object.defineProperty(t,"PolarInterpolateLineRenderDataTransform",{enumerable:!0,get:function(){return sE.PolarInterpolateLineRenderDataTransform}});var sk=r(76870);Object.defineProperty(t,"SplineRenderDataTransform",{enumerable:!0,get:function(){return sk.SplineRenderDataTransform}});var sD=r(78732);Object.defineProperty(t,"XyySplineRenderDataTransform",{enumerable:!0,get:function(){return sD.XyySplineRenderDataTransform}});var sM=r(91087);Object.defineProperty(t,"RolloverModifierRenderableSeriesProps",{enumerable:!0,get:function(){return sM.RolloverModifierRenderableSeriesProps}});var sC=r(20730);Object.defineProperty(t,"SelectionChangedArgs",{enumerable:!0,get:function(){return sC.SelectionChangedArgs}});var sj=r(67954);Object.defineProperty(t,"SeriesHoveredArgs",{enumerable:!0,get:function(){return sj.SeriesHoveredArgs}});var sR=r(89713);Object.defineProperty(t,"SeriesSelectedArgs",{enumerable:!0,get:function(){return sR.SeriesSelectedArgs}});var sI=r(42248);Object.defineProperty(t,"SeriesVisibleChangedArgs",{enumerable:!0,get:function(){return sI.SeriesVisibleChangedArgs}});var sN=r(94962);Object.defineProperty(t,"ShaderEffect",{enumerable:!0,get:function(){return sN.ShaderEffect}});var sL=r(96959);Object.defineProperty(t,"ShadowEffect",{enumerable:!0,get:function(){return sL.ShadowEffect}});var sB=r(79105);Object.defineProperty(t,"SmoothStackedMountainRenderableSeries",{enumerable:!0,get:function(){return sB.SmoothStackedMountainRenderableSeries}});var sF=r(97566);Object.defineProperty(t,"SplineBandRenderableSeries",{enumerable:!0,get:function(){return sF.SplineBandRenderableSeries}});var sz=r(8814);Object.defineProperty(t,"SplineLineRenderableSeries",{enumerable:!0,get:function(){return sz.SplineLineRenderableSeries}});var sZ=r(78399);Object.defineProperty(t,"SplineMountainRenderableSeries",{enumerable:!0,get:function(){return sZ.SplineMountainRenderableSeries}});var sH=r(37172);Object.defineProperty(t,"StackedColumnCollection",{enumerable:!0,get:function(){return sH.StackedColumnCollection}});var sV=r(79804);Object.defineProperty(t,"StackedColumnRenderableSeries",{enumerable:!0,get:function(){return sV.StackedColumnRenderableSeries}});var sU=r(11859);Object.defineProperty(t,"StackedMountainCollection",{enumerable:!0,get:function(){return sU.StackedMountainCollection}});var sG=r(70091);Object.defineProperty(t,"StackedMountainRenderableSeries",{enumerable:!0,get:function(){return sG.StackedMountainRenderableSeries}});var sW=r(1031);Object.defineProperty(t,"StackedXyCollection",{enumerable:!0,get:function(){return sW.StackedXyCollection}});var sK=r(711);Object.defineProperty(t,"EContourColorMapMode",{enumerable:!0,get:function(){return sK.EContourColorMapMode}});var sq=r(711);Object.defineProperty(t,"UniformContoursRenderableSeries",{enumerable:!0,get:function(){return sq.UniformContoursRenderableSeries}});var sX=r(54279);Object.defineProperty(t,"UniformHeatmapRenderableSeries",{enumerable:!0,get:function(){return sX.UniformHeatmapRenderableSeries}});var s$=r(96333);Object.defineProperty(t,"XyScatterRenderableSeries",{enumerable:!0,get:function(){return s$.XyScatterRenderableSeries}});var sY=r(75867);Object.defineProperty(t,"RubberBandSvgRect",{enumerable:!0,get:function(){return sY.RubberBandSvgRect}});var sJ=r(6958);Object.defineProperty(t,"SciChartDefaults",{enumerable:!0,get:function(){return sJ.SciChartDefaults}});var sQ=r(80150);Object.defineProperty(t,"SciChartOverview",{enumerable:!0,get:function(){return sQ.SciChartOverview}});var s0=r(3016);Object.defineProperty(t,"PieSegment",{enumerable:!0,get:function(){return s0.PieSegment}});var s1=r(4418);Object.defineProperty(t,"ESizingMode",{enumerable:!0,get:function(){return s1.ESizingMode}});var s2=r(4418);Object.defineProperty(t,"EPieType",{enumerable:!0,get:function(){return s2.EPieType}});var s3=r(4418);Object.defineProperty(t,"EPieValueMode",{enumerable:!0,get:function(){return s3.EPieValueMode}});var s4=r(4418);Object.defineProperty(t,"SciChartPieSurface",{enumerable:!0,get:function(){return s4.SciChartPieSurface}});var s6=r(58830);Object.defineProperty(t,"SciChartPolarSubSurface",{enumerable:!0,get:function(){return s6.SciChartPolarSubSurface}});var s5=r(31321);Object.defineProperty(t,"SciChartPolarSurface",{enumerable:!0,get:function(){return s5.SciChartPolarSurface}});var s7=r(83466);Object.defineProperty(t,"SciChartSubSurface",{enumerable:!0,get:function(){return s7.SciChartSubSurface}});var s8=r(49879);Object.defineProperty(t,"sciChartSubSurfaceCommon",{enumerable:!0,get:function(){return s8.sciChartSubSurfaceCommon}});var s9=r(19574);Object.defineProperty(t,"sciChartConfig",{enumerable:!0,get:function(){return s9.sciChartConfig}});var ue=r(19574);Object.defineProperty(t,"SciChartSurface",{enumerable:!0,get:function(){return ue.SciChartSurface}});var ut=r(49902);Object.defineProperty(t,"DebugForDpi",{enumerable:!0,get:function(){return ut.DebugForDpi}});var ur=r(49902);Object.defineProperty(t,"SciChartSurfaceBase",{enumerable:!0,get:function(){return ur.SciChartSurfaceBase}});var un=r(49902);Object.defineProperty(t,"createChartDestination",{enumerable:!0,get:function(){return un.createChartDestination}});var ua=r(22522);Object.defineProperty(t,"SciChartSurfaceCore",{enumerable:!0,get:function(){return ua.SciChartSurfaceCore}});var uo=r(69314);Object.defineProperty(t,"CanvasTexture",{enumerable:!0,get:function(){return uo.CanvasTexture}});var ui=r(26984);Object.defineProperty(t,"DpiHelper",{enumerable:!0,get:function(){return ui.DpiHelper}});var us=r(459);Object.defineProperty(t,"TextureManager",{enumerable:!0,get:function(){return us.TextureManager}});var uu=r(459);Object.defineProperty(t,"measureTextHeight",{enumerable:!0,get:function(){return uu.measureTextHeight}});var uc=r(459);Object.defineProperty(t,"measureTextWidth",{enumerable:!0,get:function(){return uc.measureTextWidth}});var ul=r(96584);Object.defineProperty(t,"UpdateSuspender",{enumerable:!0,get:function(){return ul.UpdateSuspender}});var ud=r(41360);Object.defineProperty(t,"ECameraProjectionMode",{enumerable:!0,get:function(){return ud.ECameraProjectionMode}});var uf=r(41360);Object.defineProperty(t,"CameraController",{enumerable:!0,get:function(){return uf.CameraController}});var up=r(74038);Object.defineProperty(t,"ChartModifierBase3D",{enumerable:!0,get:function(){return up.ChartModifierBase3D}});var uh=r(83379);Object.defineProperty(t,"CustomChartModifier3D",{enumerable:!0,get:function(){return uh.CustomChartModifier3D}});var um=r(4280);Object.defineProperty(t,"LegendModifier3D",{enumerable:!0,get:function(){return um.LegendModifier3D}});var ug=r(74799);Object.defineProperty(t,"MouseWheelZoomModifier3D",{enumerable:!0,get:function(){return ug.MouseWheelZoomModifier3D}});var uv=r(51444);Object.defineProperty(t,"OrbitModifier3D",{enumerable:!0,get:function(){return uv.OrbitModifier3D}});var ub=r(64855);Object.defineProperty(t,"PinchZoomModifier3D",{enumerable:!0,get:function(){return ub.PinchZoomModifier3D}});var uy=r(5650);Object.defineProperty(t,"ResetCamera3DModifier",{enumerable:!0,get:function(){return uy.ResetCamera3DModifier}});var uS=r(7234);Object.defineProperty(t,"SeriesSelectionModifier3D",{enumerable:!0,get:function(){return uS.SeriesSelectionModifier3D}});var uP=r(26233);Object.defineProperty(t,"TooltipModifier3D",{enumerable:!0,get:function(){return uP.TooltipModifier3D}});var uT=r(26233);Object.defineProperty(t,"adjustTooltipPosition3D",{enumerable:!0,get:function(){return uT.adjustTooltipPosition3D}});var ux=r(16282);Object.defineProperty(t,"EDataSeriesType3D",{enumerable:!0,get:function(){return ux.EDataSeriesType3D}});var u_=r(16282);Object.defineProperty(t,"BaseDataSeries3D",{enumerable:!0,get:function(){return u_.BaseDataSeries3D}});var uA=r(45206);Object.defineProperty(t,"BaseGridDataSeries3D",{enumerable:!0,get:function(){return uA.BaseGridDataSeries3D}});var uO=r(16818);Object.defineProperty(t,"UniformGridDataSeries3D",{enumerable:!0,get:function(){return uO.UniformGridDataSeries3D}});var uw=r(36475);Object.defineProperty(t,"XyzDataSeries3D",{enumerable:!0,get:function(){return uw.XyzDataSeries3D}});var uE=r(65770);Object.defineProperty(t,"Vector3",{enumerable:!0,get:function(){return uE.Vector3}});var uk=r(87786);Object.defineProperty(t,"TooltipSvgAnnotation3D",{enumerable:!0,get:function(){return uk.TooltipSvgAnnotation3D}});var uD=r(83679);Object.defineProperty(t,"EWhichAxis",{enumerable:!0,get:function(){return uD.EWhichAxis}});var uM=r(83679);Object.defineProperty(t,"AxisBase3D",{enumerable:!0,get:function(){return uM.AxisBase3D}});var uC=r(206);Object.defineProperty(t,"AxisCubeEntity",{enumerable:!0,get:function(){return uC.AxisCubeEntity}});var uj=r(17963);Object.defineProperty(t,"EAxisSideClipping",{enumerable:!0,get:function(){return uj.EAxisSideClipping}});var uR=r(14151);Object.defineProperty(t,"ETextAlignment3D",{enumerable:!0,get:function(){return uR.ETextAlignment3D}});var uI=r(57172);Object.defineProperty(t,"getDescriptorsEqual",{enumerable:!0,get:function(){return uI.getDescriptorsEqual}});var uN=r(57172);Object.defineProperty(t,"getLineStylesEqual",{enumerable:!0,get:function(){return uN.getLineStylesEqual}});var uL=r(57172);Object.defineProperty(t,"getTArgbEqual",{enumerable:!0,get:function(){return uL.getTArgbEqual}});var uB=r(57172);Object.defineProperty(t,"getTextStylesEqual",{enumerable:!0,get:function(){return uB.getTextStylesEqual}});var uF=r(57172);Object.defineProperty(t,"getArraysEqual",{enumerable:!0,get:function(){return uF.getArraysEqual}});var uz=r(75431);Object.defineProperty(t,"LogarithmicAxis3D",{enumerable:!0,get:function(){return uz.LogarithmicAxis3D}});var uZ=r(3630);Object.defineProperty(t,"NumericAxis3D",{enumerable:!0,get:function(){return uZ.NumericAxis3D}});var uH=r(71013);Object.defineProperty(t,"EAxisPlaneType",{enumerable:!0,get:function(){return uH.EAxisPlaneType}});var uV=r(71013);Object.defineProperty(t,"AxisPlane",{enumerable:!0,get:function(){return uV.AxisPlane}});var uU=r(26625);Object.defineProperty(t,"getSharedWasmContext3D",{enumerable:!0,get:function(){return uU.getSharedWasmContext3D}});var uG=r(26625);Object.defineProperty(t,"initializeChartEngine3D",{enumerable:!0,get:function(){return uG.initializeChartEngine3D}});var uW=r(70808);Object.defineProperty(t,"createSingle3dInternal",{enumerable:!0,get:function(){return uW.createSingle3dInternal}});var uK=r(83847);Object.defineProperty(t,"DefaultViewportManager3D",{enumerable:!0,get:function(){return uK.DefaultViewportManager3D}});var uq=r(5114);Object.defineProperty(t,"GizmoEntity",{enumerable:!0,get:function(){return uq.GizmoEntity}});var uX=r(61448);Object.defineProperty(t,"BaseMeshPointMarker3D",{enumerable:!0,get:function(){return uX.BaseMeshPointMarker3D}});var u$=r(72617);Object.defineProperty(t,"EMarkerType",{enumerable:!0,get:function(){return u$.EMarkerType}});var uY=r(72617);Object.defineProperty(t,"BasePointMarker3D",{enumerable:!0,get:function(){return uY.BasePointMarker3D}});var uJ=r(33460);Object.defineProperty(t,"BaseTexturePointMarker3D",{enumerable:!0,get:function(){return uJ.BaseTexturePointMarker3D}});var uQ=r(45217);Object.defineProperty(t,"SpherePointMarker3D",{enumerable:!0,get:function(){return uQ.SpherePointMarker3D}});var u0=r(45217);Object.defineProperty(t,"CubePointMarker3D",{enumerable:!0,get:function(){return u0.CubePointMarker3D}});var u1=r(45217);Object.defineProperty(t,"PyramidPointMarker3D",{enumerable:!0,get:function(){return u1.PyramidPointMarker3D}});var u2=r(45217);Object.defineProperty(t,"CylinderPointMarker3D",{enumerable:!0,get:function(){return u2.CylinderPointMarker3D}});var u3=r(45217);Object.defineProperty(t,"PixelPointMarker3D",{enumerable:!0,get:function(){return u3.PixelPointMarker3D}});var u4=r(45217);Object.defineProperty(t,"QuadPointMarker",{enumerable:!0,get:function(){return u4.QuadPointMarker}});var u6=r(45217);Object.defineProperty(t,"EllipsePointMarker3D",{enumerable:!0,get:function(){return u6.EllipsePointMarker3D}});var u5=r(45217);Object.defineProperty(t,"TrianglePointMarker3D",{enumerable:!0,get:function(){return u5.TrianglePointMarker3D}});var u7=r(51980);Object.defineProperty(t,"AxisCubeDescriptor",{enumerable:!0,get:function(){return u7.AxisCubeDescriptor}});var u8=r(84946);Object.defineProperty(t,"BaseSceneEntity3D",{enumerable:!0,get:function(){return u8.BaseSceneEntity3D}});var u9=r(92327);Object.defineProperty(t,"ColumnSceneEntity",{enumerable:!0,get:function(){return u9.ColumnSceneEntity}});var ce=r(15009);Object.defineProperty(t,"CrosshairLinesSceneEntity",{enumerable:!0,get:function(){return ce.CrosshairLinesSceneEntity}});var ct=r(38050);Object.defineProperty(t,"DefaultEntityIdProvider",{enumerable:!0,get:function(){return ct.DefaultEntityIdProvider}});var cr=r(98557);Object.defineProperty(t,"PointLine3DSceneEntity",{enumerable:!0,get:function(){return cr.PointLine3DSceneEntity}});var cn=r(62934);Object.defineProperty(t,"RenderableSeriesSceneEntity",{enumerable:!0,get:function(){return cn.RenderableSeriesSceneEntity}});var ca=r(7023);Object.defineProperty(t,"RenderableSeriesSceneEntityState",{enumerable:!0,get:function(){return ca.RenderableSeriesSceneEntityState}});var co=r(46799);Object.defineProperty(t,"RenderPassInfo3D",{enumerable:!0,get:function(){return co.RenderPassInfo3D}});var ci=r(69182);Object.defineProperty(t,"ScatterPointsSceneEntity",{enumerable:!0,get:function(){return ci.ScatterPointsSceneEntity}});var cs=r(37628);Object.defineProperty(t,"SceneDescriptor",{enumerable:!0,get:function(){return cs.SceneDescriptor}});var cu=r(26723);Object.defineProperty(t,"SurfaceMeshSceneEntityState",{enumerable:!0,get:function(){return cu.SurfaceMeshSceneEntityState}});var cc=r(26723);Object.defineProperty(t,"SurfaceMeshSceneEntity",{enumerable:!0,get:function(){return cc.SurfaceMeshSceneEntity}});var cl=r(74132);Object.defineProperty(t,"BaseRenderableSeries3D",{enumerable:!0,get:function(){return cl.BaseRenderableSeries3D}});var cd=r(51446);Object.defineProperty(t,"ColumnRenderableSeries3D",{enumerable:!0,get:function(){return cd.ColumnRenderableSeries3D}});var cf=r(77951);Object.defineProperty(t,"ESeriesType3D",{enumerable:!0,get:function(){return cf.ESeriesType3D}});var cp=r(87292);Object.defineProperty(t,"HitTestInfo3D",{enumerable:!0,get:function(){return cp.HitTestInfo3D}});var ch=r(14280);Object.defineProperty(t,"HoveredChangedArgs3D",{enumerable:!0,get:function(){return ch.HoveredChangedArgs3D}});var cm=r(61544);Object.defineProperty(t,"PointLineRenderableSeries3D",{enumerable:!0,get:function(){return cm.PointLineRenderableSeries3D}});var cg=r(64819);Object.defineProperty(t,"ScatterRenderableSeries3D",{enumerable:!0,get:function(){return cg.ScatterRenderableSeries3D}});var cv=r(92989);Object.defineProperty(t,"SelectionChangedArgs3D",{enumerable:!0,get:function(){return cv.SelectionChangedArgs3D}});var cb=r(5694);Object.defineProperty(t,"Series3DHoveredArgs",{enumerable:!0,get:function(){return cb.Series3DHoveredArgs}});var cy=r(47391);Object.defineProperty(t,"Series3DSelectedArgs",{enumerable:!0,get:function(){return cy.Series3DSelectedArgs}});var cS=r(75699);Object.defineProperty(t,"Series3DVisibleChangedArgs",{enumerable:!0,get:function(){return cS.Series3DVisibleChangedArgs}});var cP=r(57082);Object.defineProperty(t,"SeriesInfo3D",{enumerable:!0,get:function(){return cP.SeriesInfo3D}});var cT=r(32225);Object.defineProperty(t,"GradientColorPalette",{enumerable:!0,get:function(){return cT.GradientColorPalette}});var cx=r(63282);Object.defineProperty(t,"MeshColorPalette",{enumerable:!0,get:function(){return cx.MeshColorPalette}});var c_=r(48109);Object.defineProperty(t,"SolidColorBrushPalette",{enumerable:!0,get:function(){return c_.SolidColorBrushPalette}});var cA=r(863);Object.defineProperty(t,"EDrawMeshAs",{enumerable:!0,get:function(){return cA.EDrawMeshAs}});var cO=r(863);Object.defineProperty(t,"EMeshPaletteMode",{enumerable:!0,get:function(){return cO.EMeshPaletteMode}});var cw=r(863);Object.defineProperty(t,"EMeshResolution",{enumerable:!0,get:function(){return cw.EMeshResolution}});var cE=r(863);Object.defineProperty(t,"SurfaceMeshRenderableSeries3D",{enumerable:!0,get:function(){return cE.SurfaceMeshRenderableSeries3D}});var ck=r(19755);Object.defineProperty(t,"SurfaceMeshSeriesInfo3D",{enumerable:!0,get:function(){return ck.SurfaceMeshSeriesInfo3D}});var cD=r(42643);Object.defineProperty(t,"XyzSeriesInfo3D",{enumerable:!0,get:function(){return cD.XyzSeriesInfo3D}});var cM=r(37);Object.defineProperty(t,"RootSceneEntity",{enumerable:!0,get:function(){return cM.RootSceneEntity}});var cC=r(2345);Object.defineProperty(t,"SciChart3DRenderer",{enumerable:!0,get:function(){return cC.SciChart3DRenderer}});var cj=r(42981);Object.defineProperty(t,"sciChartConfig3D",{enumerable:!0,get:function(){return cj.sciChartConfig3D}});var cR=r(42981);Object.defineProperty(t,"SciChart3DSurface",{enumerable:!0,get:function(){return cR.SciChart3DSurface}});var cI=r(36216);Object.defineProperty(t,"ViewportManager3DBase",{enumerable:!0,get:function(){return cI.ViewportManager3DBase}});var cN=r(97811);Object.defineProperty(t,"EAnimationState",{enumerable:!0,get:function(){return cN.EAnimationState}});var cL=r(97811);Object.defineProperty(t,"EAnimationStateTransition",{enumerable:!0,get:function(){return cL.EAnimationStateTransition}});var cB=r(97811);Object.defineProperty(t,"AnimationFiniteStateMachine",{enumerable:!0,get:function(){return cB.AnimationFiniteStateMachine}});var cF=r(97811);Object.defineProperty(t,"SeriesAnimationFiniteStateMachine",{enumerable:!0,get:function(){return cF.SeriesAnimationFiniteStateMachine}});var cz=r(1971);Object.defineProperty(t,"animateAny",{enumerable:!0,get:function(){return cz.animateAny}});var cZ=r(84682);Object.defineProperty(t,"DoubleAnimator",{enumerable:!0,get:function(){return cZ.DoubleAnimator}});var cH=r(93291);Object.defineProperty(t,"easing",{enumerable:!0,get:function(){return cH.easing}});var cV=r(93291);Object.defineProperty(t,"autoReverseEasing",{enumerable:!0,get:function(){return cV.autoReverseEasing}});var cU=r(92366);Object.defineProperty(t,"GenericAnimation",{enumerable:!0,get:function(){return cU.GenericAnimation}});var cG=r(39727);Object.defineProperty(t,"NumberRangeAnimator",{enumerable:!0,get:function(){return cG.NumberRangeAnimator}});var cW=r(30615);Object.defineProperty(t,"AnimationToken",{enumerable:!0,get:function(){return cW.AnimationToken}});var cK=r(37291);Object.defineProperty(t,"libraryVersion",{enumerable:!0,get:function(){return cK.libraryVersion}});var cq=r(37291);Object.defineProperty(t,"checkBuildStamp",{enumerable:!0,get:function(){return cq.checkBuildStamp}});var cX=r(70528);Object.defineProperty(t,"DeletableEntity",{enumerable:!0,get:function(){return cX.DeletableEntity}});var c$=r(54435);Object.defineProperty(t,"deleteSafe",{enumerable:!0,get:function(){return c$.deleteSafe}});var cY=r(69213);Object.defineProperty(t,"Dictionary",{enumerable:!0,get:function(){return cY.Dictionary}});var cJ=r(61221);Object.defineProperty(t,"EventHandler",{enumerable:!0,get:function(){return cJ.EventHandler}});var cQ=r(61221);Object.defineProperty(t,"receiveNextEvent",{enumerable:!0,get:function(){return cQ.receiveNextEvent}});var c0=r(51511);Object.defineProperty(t,"GradientParams",{enumerable:!0,get:function(){return c0.GradientParams}});var c1=r(45813);Object.defineProperty(t,"Guard",{enumerable:!0,get:function(){return c1.Guard}});var c2=r(61252);Object.defineProperty(t,"IncludedItems",{enumerable:!0,get:function(){return c2.IncludedItems}});var c3=r(74774);Object.defineProperty(t,"List",{enumerable:!0,get:function(){return c3.List}});var c4=r(74437);Object.defineProperty(t,"MouseManager",{enumerable:!0,get:function(){return c4.MouseManager}});var c6=r(31035);Object.defineProperty(t,"NumberRange",{enumerable:!0,get:function(){return c6.NumberRange}});var c5=r(34661);Object.defineProperty(t,"NumberUtil",{enumerable:!0,get:function(){return c5.NumberUtil}});var c7=r(98115);Object.defineProperty(t,"ObservableArrayBase",{enumerable:!0,get:function(){return c7.ObservableArrayBase}});var c8=r(98115);Object.defineProperty(t,"ObservableArray",{enumerable:!0,get:function(){return c8.ObservableArray}});var c9=r(66636);Object.defineProperty(t,"EObservableArrayChangedAction",{enumerable:!0,get:function(){return c9.EObservableArrayChangedAction}});var le=r(66636);Object.defineProperty(t,"ObservableArrayChangedArgs",{enumerable:!0,get:function(){return le.ObservableArrayChangedArgs}});var lt=r(52229);Object.defineProperty(t,"OneTimePerformanceWarning",{enumerable:!0,get:function(){return lt.OneTimePerformanceWarning}});var lr=r(78437);Object.defineProperty(t,"Point",{enumerable:!0,get:function(){return lr.Point}});var ln=r(49088);Object.defineProperty(t,"PropertyChangedEventArgs",{enumerable:!0,get:function(){return ln.PropertyChangedEventArgs}});var la=r(2785);Object.defineProperty(t,"Rect",{enumerable:!0,get:function(){return la.Rect}});var lo=r(76986);Object.defineProperty(t,"SimdHelper",{enumerable:!0,get:function(){return lo.SimdHelper}});var li=r(56369);Object.defineProperty(t,"localStorageApi",{enumerable:!0,get:function(){return li.localStorageApi}});var ls=r(85260);Object.defineProperty(t,"getUserCookie",{enumerable:!0,get:function(){return ls.getUserCookie}});var lu=r(85260);Object.defineProperty(t,"shouldSendTelemetry",{enumerable:!0,get:function(){return lu.shouldSendTelemetry}});var lc=r(85260);Object.defineProperty(t,"sendTelemetry",{enumerable:!0,get:function(){return lc.sendTelemetry}});var ll=r(59564);Object.defineProperty(t,"Thickness",{enumerable:!0,get:function(){return ll.Thickness}});var ld=r(81484);Object.defineProperty(t,"EWebGLSupport",{enumerable:!0,get:function(){return ld.EWebGLSupport}});var lf=r(81484);Object.defineProperty(t,"WebGlHelper",{enumerable:!0,get:function(){return lf.WebGlHelper}});var lp=r(5819);Object.defineProperty(t,"EHorizontalAnchorPoint",{enumerable:!0,get:function(){return lp.EHorizontalAnchorPoint}});var lh=r(5819);Object.defineProperty(t,"EVerticalAnchorPoint",{enumerable:!0,get:function(){return lh.EVerticalAnchorPoint}});var lm=r(56683);Object.defineProperty(t,"EAnimationType",{enumerable:!0,get:function(){return lm.EAnimationType}});var lg=r(26065);Object.defineProperty(t,"EAnnotationClippingMode",{enumerable:!0,get:function(){return lg.EAnnotationClippingMode}});var lv=r(28895);Object.defineProperty(t,"EAutoColorMode",{enumerable:!0,get:function(){return lv.EAutoColorMode}});var lb=r(96702);Object.defineProperty(t,"EAutoRange",{enumerable:!0,get:function(){return lb.EAutoRange}});var ly=r(97335);Object.defineProperty(t,"EAxisAlignment",{enumerable:!0,get:function(){return ly.EAxisAlignment}});var lS=r(97335);Object.defineProperty(t,"getIsHorizontal",{enumerable:!0,get:function(){return lS.getIsHorizontal}});var lP=r(97335);Object.defineProperty(t,"getIsVertical",{enumerable:!0,get:function(){return lP.getIsVertical}});var lT=r(97335);Object.defineProperty(t,"handleInvalidAxisAlignment",{enumerable:!0,get:function(){return lT.handleInvalidAxisAlignment}});var lx=r(48841);Object.defineProperty(t,"EAxisPlaneDrawLabelsMode",{enumerable:!0,get:function(){return lx.EAxisPlaneDrawLabelsMode}});var l_=r(48841);Object.defineProperty(t,"convert3DPlaneModeForLabels",{enumerable:!0,get:function(){return l_.convert3DPlaneModeForLabels}});var lA=r(48841);Object.defineProperty(t,"convert3DPlaneModeForTitles",{enumerable:!0,get:function(){return lA.convert3DPlaneModeForTitles}});var lO=r(27526);Object.defineProperty(t,"EAxisPlaneVisibilityMode",{enumerable:!0,get:function(){return lO.EAxisPlaneVisibilityMode}});var lw=r(27526);Object.defineProperty(t,"convertAxisPlaneVisibilityMode",{enumerable:!0,get:function(){return lw.convertAxisPlaneVisibilityMode}});var lE=r(50909);Object.defineProperty(t,"EAxisType",{enumerable:!0,get:function(){return lE.EAxisType}});var lk=r(79019);Object.defineProperty(t,"EBaseType",{enumerable:!0,get:function(){return lk.EBaseType}});var lD=r(84643);Object.defineProperty(t,"EExecuteOn",{enumerable:!0,get:function(){return lD.EExecuteOn}});var lM=r(12120);Object.defineProperty(t,"EModifierMouseArgKey",{enumerable:!0,get:function(){return lM.EModifierMouseArgKey}});var lC=r(6542);Object.defineProperty(t,"EChart2DModifierType",{enumerable:!0,get:function(){return lC.EChart2DModifierType}});var lj=r(6542);Object.defineProperty(t,"EChart3DModifierType",{enumerable:!0,get:function(){return lj.EChart3DModifierType}});var lR=r(20066);Object.defineProperty(t,"EColor",{enumerable:!0,get:function(){return lR.EColor}});var lI=r(45864);Object.defineProperty(t,"EColumnMode",{enumerable:!0,get:function(){return lI.EColumnMode}});var lN=r(45864);Object.defineProperty(t,"convertColumnMode",{enumerable:!0,get:function(){return lN.convertColumnMode}});var lL=r(45864);Object.defineProperty(t,"EColumnYMode",{enumerable:!0,get:function(){return lL.EColumnYMode}});var lB=r(45864);Object.defineProperty(t,"convertYColumnMode",{enumerable:!0,get:function(){return lB.convertYColumnMode}});var lF=r(52233);Object.defineProperty(t,"addCoord",{enumerable:!0,get:function(){return lF.addCoord}});var lz=r(52233);Object.defineProperty(t,"subtractCoord",{enumerable:!0,get:function(){return lz.subtractCoord}});var lZ=r(52233);Object.defineProperty(t,"convertDataValueToAbsoluteCoordinate",{enumerable:!0,get:function(){return lZ.convertDataValueToAbsoluteCoordinate}});var lH=r(52233);Object.defineProperty(t,"convertPixelValueToAbsoluteCoordinate",{enumerable:!0,get:function(){return lH.convertPixelValueToAbsoluteCoordinate}});var lV=r(52233);Object.defineProperty(t,"convertRelativeValueToAbsoluteCoordinate",{enumerable:!0,get:function(){return lV.convertRelativeValueToAbsoluteCoordinate}});var lU=r(52233);Object.defineProperty(t,"convertToAbsoluteCoordinate",{enumerable:!0,get:function(){return lU.convertToAbsoluteCoordinate}});var lG=r(52233);Object.defineProperty(t,"convertAbsoluteCoordinateToDataValue",{enumerable:!0,get:function(){return lG.convertAbsoluteCoordinateToDataValue}});var lW=r(52233);Object.defineProperty(t,"convertAbsoluteCoordinateToPixelValue",{enumerable:!0,get:function(){return lW.convertAbsoluteCoordinateToPixelValue}});var lK=r(52233);Object.defineProperty(t,"convertAbsoluteCoordinateToRelativeValue",{enumerable:!0,get:function(){return lK.convertAbsoluteCoordinateToRelativeValue}});var lq=r(52233);Object.defineProperty(t,"convertFromAbsoluteCoordinate",{enumerable:!0,get:function(){return lq.convertFromAbsoluteCoordinate}});var lX=r(52233);Object.defineProperty(t,"convertCoordinateMode",{enumerable:!0,get:function(){return lX.convertCoordinateMode}});var l$=r(52233);Object.defineProperty(t,"convertToDataValue",{enumerable:!0,get:function(){return l$.convertToDataValue}});var lY=r(52233);Object.defineProperty(t,"convertToPixelCoordinate",{enumerable:!0,get:function(){return lY.convertToPixelCoordinate}});var lJ=r(52233);Object.defineProperty(t,"convertToRelativeCoordinate",{enumerable:!0,get:function(){return lJ.convertToRelativeCoordinate}});var lQ=r(52233);Object.defineProperty(t,"convertCoordinateFromDataValue",{enumerable:!0,get:function(){return lQ.convertCoordinateFromDataValue}});var l0=r(52233);Object.defineProperty(t,"convertCoordinateFromPixelValue",{enumerable:!0,get:function(){return l0.convertCoordinateFromPixelValue}});var l1=r(52233);Object.defineProperty(t,"convertCoordinateFromRelativeValue",{enumerable:!0,get:function(){return l1.convertCoordinateFromRelativeValue}});var l2=r(59940);Object.defineProperty(t,"ECursorStyle",{enumerable:!0,get:function(){return l2.ECursorStyle}});var l3=r(7031);Object.defineProperty(t,"EDataFilterType",{enumerable:!0,get:function(){return l3.EDataFilterType}});var l4=r(4462);Object.defineProperty(t,"EDataLabelProviderType",{enumerable:!0,get:function(){return l4.EDataLabelProviderType}});var l6=r(70549);Object.defineProperty(t,"EDataLabelSkipMode",{enumerable:!0,get:function(){return l6.EDataLabelSkipMode}});var l5=r(79511);Object.defineProperty(t,"EDataPointWidthMode",{enumerable:!0,get:function(){return l5.EDataPointWidthMode}});var l7=r(37319);Object.defineProperty(t,"EDefaultRenderLayer",{enumerable:!0,get:function(){return l7.EDefaultRenderLayer}});var l8=r(23389);Object.defineProperty(t,"EDragMode",{enumerable:!0,get:function(){return l8.EDragMode}});var l9=r(75168);Object.defineProperty(t,"EErrorDirection",{enumerable:!0,get:function(){return l9.EErrorDirection}});var de=r(5366);Object.defineProperty(t,"EErrorMode",{enumerable:!0,get:function(){return de.EErrorMode}});var dt=r(36677);Object.defineProperty(t,"EUseWasmSimd",{enumerable:!0,get:function(){return dt.EUseWasmSimd}});var dr=r(60807);Object.defineProperty(t,"EColorPickMode",{enumerable:!0,get:function(){return dr.EColorPickMode}});var dn=r(11109);Object.defineProperty(t,"EHeightSeriesMode",{enumerable:!0,get:function(){return dn.EHeightSeriesMode}});var da=r(94426);Object.defineProperty(t,"EHoverMode",{enumerable:!0,get:function(){return da.EHoverMode}});var di=r(75187);Object.defineProperty(t,"ELabelAlignment",{enumerable:!0,get:function(){return di.ELabelAlignment}});var ds=r(40977);Object.defineProperty(t,"ELabelPlacement",{enumerable:!0,get:function(){return ds.ELabelPlacement}});var du=r(40977);Object.defineProperty(t,"EHorizontalAlignment",{enumerable:!0,get:function(){return du.EHorizontalAlignment}});var dc=r(40977);Object.defineProperty(t,"EVerticalAlignment",{enumerable:!0,get:function(){return dc.EVerticalAlignment}});var dl=r(40977);Object.defineProperty(t,"EAngularAxisLabelPlacement",{enumerable:!0,get:function(){return dl.EAngularAxisLabelPlacement}});var dd=r(40977);Object.defineProperty(t,"ERadialAxisLabelPlacement",{enumerable:!0,get:function(){return dd.ERadialAxisLabelPlacement}});var df=r(40488);Object.defineProperty(t,"ELabelProviderType",{enumerable:!0,get:function(){return df.ELabelProviderType}});var dp=r(40098);Object.defineProperty(t,"ELayoutManagerType",{enumerable:!0,get:function(){return dp.ELayoutManagerType}});var dh=r(22177);Object.defineProperty(t,"ELayoutStrategyType",{enumerable:!0,get:function(){return dh.ELayoutStrategyType}});var dm=r(66909);Object.defineProperty(t,"EModifierType",{enumerable:!0,get:function(){return dm.EModifierType}});var dg=r(71127);Object.defineProperty(t,"EMousePosition",{enumerable:!0,get:function(){return dg.EMousePosition}});var dv=r(37244);Object.defineProperty(t,"isTypedArray",{enumerable:!0,get:function(){return dv.isTypedArray}});var db=r(37244);Object.defineProperty(t,"isNumberArray",{enumerable:!0,get:function(){return db.isNumberArray}});var dy=r(37244);Object.defineProperty(t,"subArray",{enumerable:!0,get:function(){return dy.subArray}});var dS=r(59090);Object.defineProperty(t,"ENumericFormat",{enumerable:!0,get:function(){return dS.ENumericFormat}});var dP=r(30786);Object.defineProperty(t,"OrderedRenderable",{enumerable:!0,get:function(){return dP.OrderedRenderable}});var dT=r(98508);Object.defineProperty(t,"EPaletteProviderType",{enumerable:!0,get:function(){return dT.EPaletteProviderType}});var dx=r(75305);Object.defineProperty(t,"EPointMarker3DType",{enumerable:!0,get:function(){return dx.EPointMarker3DType}});var d_=r(36135);Object.defineProperty(t,"EPointMarkerType",{enumerable:!0,get:function(){return d_.EPointMarkerType}});var dA=r(54131);Object.defineProperty(t,"EStrokeLineJoin",{enumerable:!0,get:function(){return dA.EStrokeLineJoin}});var dO=r(32232);Object.defineProperty(t,"ERenderLayer",{enumerable:!0,get:function(){return dO.ERenderLayer}});var dw=r(76353);Object.defineProperty(t,"ESceneEntityType",{enumerable:!0,get:function(){return dw.ESceneEntityType}});var dE=r(22026);Object.defineProperty(t,"ESciChartSurfaceType",{enumerable:!0,get:function(){return dE.ESciChartSurfaceType}});var dk=r(67893);Object.defineProperty(t,"ESearchMode",{enumerable:!0,get:function(){return dk.ESearchMode}});var dD=r(67893);Object.defineProperty(t,"convertSearchMode",{enumerable:!0,get:function(){return dD.convertSearchMode}});var dM=r(43332);Object.defineProperty(t,"ESeriesType",{enumerable:!0,get:function(){return dM.ESeriesType}});var dC=r(92444);Object.defineProperty(t,"EShaderEffectType",{enumerable:!0,get:function(){return dC.EShaderEffectType}});var dj=r(28632);Object.defineProperty(t,"Size",{enumerable:!0,get:function(){return dj.Size}});var dR=r(44716);Object.defineProperty(t,"ESubChartClippingMode",{enumerable:!0,get:function(){return dR.ESubChartClippingMode}});var dI=r(39210);Object.defineProperty(t,"ESubSurfacePositionCoordinateMode",{enumerable:!0,get:function(){return dI.ESubSurfacePositionCoordinateMode}});var dN=r(41551);Object.defineProperty(t,"ESurfaceType",{enumerable:!0,get:function(){return dN.ESurfaceType}});var dL=r(1230);Object.defineProperty(t,"EHorizontalTextPosition",{enumerable:!0,get:function(){return dL.EHorizontalTextPosition}});var dB=r(1230);Object.defineProperty(t,"EVerticalTextPosition",{enumerable:!0,get:function(){return dB.EVerticalTextPosition}});var dF=r(1230);Object.defineProperty(t,"EMultiLineAlignment",{enumerable:!0,get:function(){return dF.EMultiLineAlignment}});var dz=r(1230);Object.defineProperty(t,"convertMultiLineAlignment",{enumerable:!0,get:function(){return dz.convertMultiLineAlignment}});var dZ=r(45704);Object.defineProperty(t,"ETextAlignment",{enumerable:!0,get:function(){return dZ.ETextAlignment}});var dH=r(45704);Object.defineProperty(t,"ETitlePosition",{enumerable:!0,get:function(){return dH.ETitlePosition}});var dV=r(42060);Object.defineProperty(t,"E3DLabelOrientationMode",{enumerable:!0,get:function(){return dV.E3DLabelOrientationMode}});var dU=r(42060);Object.defineProperty(t,"E3DTitleRotationMode",{enumerable:!0,get:function(){return dU.E3DTitleRotationMode}});var dG=r(42060);Object.defineProperty(t,"convert3DLabelOrientationMode",{enumerable:!0,get:function(){return dG.convert3DLabelOrientationMode}});var dW=r(42060);Object.defineProperty(t,"convert3DTitleRotationMode",{enumerable:!0,get:function(){return dW.convert3DTitleRotationMode}});var dK=r(72290);Object.defineProperty(t,"EThemeProviderType",{enumerable:!0,get:function(){return dK.EThemeProviderType}});var dq=r(97638);Object.defineProperty(t,"EColorMapMode",{enumerable:!0,get:function(){return dq.EColorMapMode}});var dX=r(49581);Object.defineProperty(t,"ETriangleSeriesDrawMode",{enumerable:!0,get:function(){return dX.ETriangleSeriesDrawMode}});var d$=r(93370);Object.defineProperty(t,"EValueName",{enumerable:!0,get:function(){return d$.EValueName}});var dY=r(93370);Object.defineProperty(t,"generateValueNamesForDataSeries",{enumerable:!0,get:function(){return dY.generateValueNamesForDataSeries}});var dJ=r(42345);Object.defineProperty(t,"EWatermarkPosition",{enumerable:!0,get:function(){return dJ.EWatermarkPosition}});var dQ=r(83973);Object.defineProperty(t,"EXyDirection",{enumerable:!0,get:function(){return dQ.EXyDirection}});var d0=r(47024);Object.defineProperty(t,"EYRangeMode",{enumerable:!0,get:function(){return d0.EYRangeMode}});var d1=r(86641);Object.defineProperty(t,"EZoomState",{enumerable:!0,get:function(){return d1.EZoomState}});var d2=r(8545);Object.defineProperty(t,"getUniqueValues",{enumerable:!0,get:function(){return d2.getUniqueValues}});var d3=r(8545);Object.defineProperty(t,"countUnique",{enumerable:!0,get:function(){return d3.countUnique}});var d4=r(8545);Object.defineProperty(t,"areArraysEqual",{enumerable:!0,get:function(){return d4.areArraysEqual}});var d6=r(8545);Object.defineProperty(t,"arrayRemove",{enumerable:!0,get:function(){return d6.arrayRemove}});var d5=r(8545);Object.defineProperty(t,"isArraySorted",{enumerable:!0,get:function(){return d5.isArraySorted}});var d7=r(8545);Object.defineProperty(t,"makeIncArray",{enumerable:!0,get:function(){return d7.makeIncArray}});var d8=r(8545);Object.defineProperty(t,"appendRangeFifo",{enumerable:!0,get:function(){return d8.appendRangeFifo}});var d9=r(53787);Object.defineProperty(t,"calcAverageForDoubleVector",{enumerable:!0,get:function(){return d9.calcAverageForDoubleVector}});var fe=r(53787);Object.defineProperty(t,"calcAverageForArray",{enumerable:!0,get:function(){return fe.calcAverageForArray}});var ft=r(23244);Object.defineProperty(t,"SIZEOF_NUMBER",{enumerable:!0,get:function(){return ft.SIZEOF_NUMBER}});var fr=r(23244);Object.defineProperty(t,"SIZEOF_FLOAT32",{enumerable:!0,get:function(){return fr.SIZEOF_FLOAT32}});var fn=r(23244);Object.defineProperty(t,"insertDoubleVectorFromJsArray",{enumerable:!0,get:function(){return fn.insertDoubleVectorFromJsArray}});var fa=r(23244);Object.defineProperty(t,"memCopyFloat32",{enumerable:!0,get:function(){return fa.memCopyFloat32}});var fo=r(23244);Object.defineProperty(t,"appendDoubleVectorFromJsArray",{enumerable:!0,get:function(){return fo.appendDoubleVectorFromJsArray}});var fi=r(23244);Object.defineProperty(t,"appendDoubleVectorFromBuffer",{enumerable:!0,get:function(){return fi.appendDoubleVectorFromBuffer}});var fs=r(61162);Object.defineProperty(t,"uintArgbColorLerp24bit",{enumerable:!0,get:function(){return fs.uintArgbColorLerp24bit}});var fu=r(61162);Object.defineProperty(t,"uintArgbColorLerp",{enumerable:!0,get:function(){return fu.uintArgbColorLerp}});var fc=r(61162);Object.defineProperty(t,"linearColorMapLerp",{enumerable:!0,get:function(){return fc.linearColorMapLerp}});var fl=r(61162);Object.defineProperty(t,"uintArgbColorToAbgr",{enumerable:!0,get:function(){return fl.uintArgbColorToAbgr}});var fd=r(61162);Object.defineProperty(t,"uintArgbColorMultiplyOpacity",{enumerable:!0,get:function(){return fd.uintArgbColorMultiplyOpacity}});var ff=r(61162);Object.defineProperty(t,"uintArgbColorOverrideOpacity",{enumerable:!0,get:function(){return ff.uintArgbColorOverrideOpacity}});var fp=r(61162);Object.defineProperty(t,"uintArgbColorIsTransparent",{enumerable:!0,get:function(){return fp.uintArgbColorIsTransparent}});var fh=r(61162);Object.defineProperty(t,"applyOpacityToHtmlColor",{enumerable:!0,get:function(){return fh.applyOpacityToHtmlColor}});var fm=r(67084);Object.defineProperty(t,"convertColor",{enumerable:!0,get:function(){return fm.convertColor}});var fg=r(67084);Object.defineProperty(t,"convertRgbToHexColor",{enumerable:!0,get:function(){return fg.convertRgbToHexColor}});var fv=r(86103);Object.defineProperty(t,"convertToPixel",{enumerable:!0,get:function(){return fv.convertToPixel}});var fb=r(40599);Object.defineProperty(t,"copyDoubleVector",{enumerable:!0,get:function(){return fb.copyDoubleVector}});var fy=r(74432);Object.defineProperty(t,"formatUnixDateToHumanString",{enumerable:!0,get:function(){return fy.formatUnixDateToHumanString}});var fS=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringDDMMYY",{enumerable:!0,get:function(){return fS.formatUnixDateToHumanStringDDMMYY}});var fP=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringDDMMHHMM",{enumerable:!0,get:function(){return fP.formatUnixDateToHumanStringDDMMHHMM}});var fT=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringDDMM",{enumerable:!0,get:function(){return fT.formatUnixDateToHumanStringDDMM}});var fx=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringHHMMSS",{enumerable:!0,get:function(){return fx.formatUnixDateToHumanStringHHMMSS}});var f_=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringSSms",{enumerable:!0,get:function(){return f_.formatUnixDateToHumanStringSSms}});var fA=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringHHMM",{enumerable:!0,get:function(){return fA.formatUnixDateToHumanStringHHMM}});var fO=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringMMMDD",{enumerable:!0,get:function(){return fO.formatUnixDateToHumanStringMMMDD}});var fw=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringMMM",{enumerable:!0,get:function(){return fw.formatUnixDateToHumanStringMMM}});var fE=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringDD",{enumerable:!0,get:function(){return fE.formatUnixDateToHumanStringDD}});var fk=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringYYYY",{enumerable:!0,get:function(){return fk.formatUnixDateToHumanStringYYYY}});var fD=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringSSus",{enumerable:!0,get:function(){return fD.formatUnixDateToHumanStringSSus}});var fM=r(74432);Object.defineProperty(t,"formatUnixDateToHumanStringSSns",{enumerable:!0,get:function(){return fM.formatUnixDateToHumanStringSSns}});var fC=r(19259);Object.defineProperty(t,"logDoubleVector",{enumerable:!0,get:function(){return fC.logDoubleVector}});var fj=r(89019);Object.defineProperty(t,"getFontString",{enumerable:!0,get:function(){return fj.getFontString}});var fR=r(89019);Object.defineProperty(t,"getDefaultFontName",{enumerable:!0,get:function(){return fR.getDefaultFontName}});var fI=r(89019);Object.defineProperty(t,"getFontFamily",{enumerable:!0,get:function(){return fI.getFontFamily}});var fN=r(74797);Object.defineProperty(t,"geometryHelpers",{enumerable:!0,get:function(){return fN.geometryHelpers}});var fL=r(15675);Object.defineProperty(t,"generateGuid",{enumerable:!0,get:function(){return fL.generateGuid}});var fB=r(15675);Object.defineProperty(t,"base64Id",{enumerable:!0,get:function(){return fB.base64Id}});var fF=r(80140);Object.defineProperty(t,"hasAllProperties",{enumerable:!0,get:function(){return fF.hasAllProperties}});var fz=r(66052);Object.defineProperty(t,"hashUtils",{enumerable:!0,get:function(){return fz.hashUtils}});var fZ=r(38275);Object.defineProperty(t,"HEIGHT_SERIES_MAX_TEXTURE_SIZE",{enumerable:!0,get:function(){return fZ.HEIGHT_SERIES_MAX_TEXTURE_SIZE}});var fH=r(38275);Object.defineProperty(t,"validateColorStops",{enumerable:!0,get:function(){return fH.validateColorStops}});var fV=r(9180);Object.defineProperty(t,"htmlToElement",{enumerable:!0,get:function(){return fV.htmlToElement}});var fU=r(9180);Object.defineProperty(t,"stringOccurrences",{enumerable:!0,get:function(){return fU.stringOccurrences}});var fG=r(56246);Object.defineProperty(t,"createImageAsync",{enumerable:!0,get:function(){return fG.createImageAsync}});var fW=r(56246);Object.defineProperty(t,"createImagesArrayAsync",{enumerable:!0,get:function(){return fW.createImagesArrayAsync}});var fK=r(37657);Object.defineProperty(t,"isRealNumber",{enumerable:!0,get:function(){return fK.isRealNumber}});var fq=r(94120);Object.defineProperty(t,"Logger",{enumerable:!0,get:function(){return fq.Logger}});var fX=r(66467);Object.defineProperty(t,"getNoisySinewave",{enumerable:!0,get:function(){return fX.getNoisySinewave}});var f$=r(66467);Object.defineProperty(t,"fillNoisySinewave",{enumerable:!0,get:function(){return f$.fillNoisySinewave}});var fY=r(66467);Object.defineProperty(t,"logToBase",{enumerable:!0,get:function(){return fY.logToBase}});var fJ=r(4696);Object.defineProperty(t,"memoize",{enumerable:!0,get:function(){return fJ.memoize}});var fQ=r(75204);Object.defineProperty(t,"ObjectRegistry",{enumerable:!0,get:function(){return fQ.ObjectRegistry}});var f0=r(75204);Object.defineProperty(t,"MemoryUsageHelper",{enumerable:!0,get:function(){return f0.MemoryUsageHelper}});var f1=r(44275);Object.defineProperty(t,"formatNumber2Digits",{enumerable:!0,get:function(){return f1.formatNumber2Digits}});var f3=r(44275);Object.defineProperty(t,"numericHashCode",{enumerable:!0,get:function(){return f3.numericHashCode}});var f4=r(44275);Object.defineProperty(t,"formatNumber",{enumerable:!0,get:function(){return f4.formatNumber}});var f6=r(44275);Object.defineProperty(t,"toSuperScript",{enumerable:!0,get:function(){return f6.toSuperScript}});var f5=r(44275);Object.defineProperty(t,"toScientific",{enumerable:!0,get:function(){return f5.toScientific}});var f7=r(44275);Object.defineProperty(t,"toEngineering",{enumerable:!0,get:function(){return f7.toEngineering}});var f8=r(44275);Object.defineProperty(t,"checkIsNaN",{enumerable:!0,get:function(){return f8.checkIsNaN}});var f9=r(72315);Object.defineProperty(t,"parseColorToHexStringArgb",{enumerable:!0,get:function(){return f9.parseColorToHexStringArgb}});var pe=r(72315);Object.defineProperty(t,"parseColorToHexStringAbgr",{enumerable:!0,get:function(){return pe.parseColorToHexStringAbgr}});var pt=r(72315);Object.defineProperty(t,"parseColorToUIntArgb",{enumerable:!0,get:function(){return pt.parseColorToUIntArgb}});var pr=r(72315);Object.defineProperty(t,"parseColorToUIntAbgr",{enumerable:!0,get:function(){return pr.parseColorToUIntAbgr}});var pn=r(72315);Object.defineProperty(t,"toHex",{enumerable:!0,get:function(){return pn.toHex}});var pa=r(72315);Object.defineProperty(t,"parseColorToTArgb",{enumerable:!0,get:function(){return pa.parseColorToTArgb}});var po=r(72315);Object.defineProperty(t,"parseArgbToHtmlColor",{enumerable:!0,get:function(){return po.parseArgbToHtmlColor}});var pi=r(72315);Object.defineProperty(t,"parseTArgbToHtmlColor",{enumerable:!0,get:function(){return pi.parseTArgbToHtmlColor}});var ps=r(35855);Object.defineProperty(t,"EPerformanceMarkType",{enumerable:!0,get:function(){return ps.EPerformanceMarkType}});var pu=r(35855);Object.defineProperty(t,"EPerformanceDebugLevel",{enumerable:!0,get:function(){return pu.EPerformanceDebugLevel}});var pc=r(35855);Object.defineProperty(t,"PerformanceDebugHelper",{enumerable:!0,get:function(){return pc.PerformanceDebugHelper}});var pl=r(35855);Object.defineProperty(t,"runAfterFramePaint",{enumerable:!0,get:function(){return pl.runAfterFramePaint}});var pd=r(7417);Object.defineProperty(t,"calcDistanceFromLine",{enumerable:!0,get:function(){return pd.calcDistanceFromLine}});var pf=r(7417);Object.defineProperty(t,"calcCrossProduct",{enumerable:!0,get:function(){return pf.calcCrossProduct}});var pp=r(7417);Object.defineProperty(t,"calcDistance",{enumerable:!0,get:function(){return pp.calcDistance}});var ph=r(7417);Object.defineProperty(t,"testIsInBounds",{enumerable:!0,get:function(){return ph.testIsInBounds}});var pm=r(7417);Object.defineProperty(t,"calcAnnotationBordersForAxisMarker",{enumerable:!0,get:function(){return pm.calcAnnotationBordersForAxisMarker}});var pg=r(7417);Object.defineProperty(t,"testIsInXBounds",{enumerable:!0,get:function(){return pg.testIsInXBounds}});var pv=r(7417);Object.defineProperty(t,"testIsInInterval",{enumerable:!0,get:function(){return pv.testIsInInterval}});var pb=r(7417);Object.defineProperty(t,"calcDotProduct",{enumerable:!0,get:function(){return pb.calcDotProduct}});var py=r(7417);Object.defineProperty(t,"calcDistanceFromLineSegment",{enumerable:!0,get:function(){return py.calcDistanceFromLineSegment}});var pS=r(7417);Object.defineProperty(t,"testPointInTriangle",{enumerable:!0,get:function(){return pS.testPointInTriangle}});var pP=r(11602);Object.defineProperty(t,"getRandomInRange",{enumerable:!0,get:function(){return pP.getRandomInRange}});var pT=r(41555);Object.defineProperty(t,"getStocksDataFactory",{enumerable:!0,get:function(){return pT.getStocksDataFactory}});var px=r(41555);Object.defineProperty(t,"getNextRandomPriceBarFactory",{enumerable:!0,get:function(){return px.getNextRandomPriceBarFactory}});var p_=r(17155);Object.defineProperty(t,"getAttributeFromString",{enumerable:!0,get:function(){return p_.getAttributeFromString}});var pA=r(24924);Object.defineProperty(t,"wrapNativeText",{enumerable:!0,get:function(){return pA.wrapNativeText}});var pO=r(24924);Object.defineProperty(t,"convertToNativeLineSpacing",{enumerable:!0,get:function(){return pO.convertToNativeLineSpacing}});var pw=r(24924);Object.defineProperty(t,"getNativeTextSize",{enumerable:!0,get:function(){return pw.getNativeTextSize}});var pE=r(24924);Object.defineProperty(t,"getFirstLineHeightToBaseline",{enumerable:!0,get:function(){return pE.getFirstLineHeightToBaseline}});var pk=r(24924);Object.defineProperty(t,"getTextHeightToBaseline",{enumerable:!0,get:function(){return pk.getTextHeightToBaseline}});var pD=r(24924);Object.defineProperty(t,"getMultilineTextHeight",{enumerable:!0,get:function(){return pD.getMultilineTextHeight}});var pM=r(24924);Object.defineProperty(t,"getNativeTextPosition",{enumerable:!0,get:function(){return pM.getNativeTextPosition}});var pC=r(45690);Object.defineProperty(t,"ESize",{enumerable:!0,get:function(){return pC.ESize}});var pj=r(45690);Object.defineProperty(t,"ECoord",{enumerable:!0,get:function(){return pj.ECoord}});var pR=r(45690);Object.defineProperty(t,"EShift",{enumerable:!0,get:function(){return pR.EShift}});var pI=r(34055);Object.defineProperty(t,"translateFromCanvasToSeriesViewRect",{enumerable:!0,get:function(){return pI.translateFromCanvasToSeriesViewRect}});var pN=r(34055);Object.defineProperty(t,"translateFromSeriesViewRectToCanvas",{enumerable:!0,get:function(){return pN.translateFromSeriesViewRectToCanvas}});var pL=r(34055);Object.defineProperty(t,"translateFromCanvasToSeriesViewRectX",{enumerable:!0,get:function(){return pL.translateFromCanvasToSeriesViewRectX}});var pB=r(34055);Object.defineProperty(t,"translateFromCanvasToSeriesViewRectY",{enumerable:!0,get:function(){return pB.translateFromCanvasToSeriesViewRectY}});var pF=r(34055);Object.defineProperty(t,"translateFromSeriesViewRectToCanvasX",{enumerable:!0,get:function(){return pF.translateFromSeriesViewRectToCanvasX}});var pz=r(34055);Object.defineProperty(t,"translateFromSeriesViewRectToCanvasY",{enumerable:!0,get:function(){return pz.translateFromSeriesViewRectToCanvasY}});var pZ=r(34055);Object.defineProperty(t,"translateToScaled",{enumerable:!0,get:function(){return pZ.translateToScaled}});var pH=r(34055);Object.defineProperty(t,"translateToNotScaled",{enumerable:!0,get:function(){return pH.translateToNotScaled}});var pV=r(34055);Object.defineProperty(t,"translateToScaledRect",{enumerable:!0,get:function(){return pV.translateToScaledRect}});var pU=r(34055);Object.defineProperty(t,"translateToNotScaledRect",{enumerable:!0,get:function(){return pU.translateToNotScaledRect}});var pG=r(34055);Object.defineProperty(t,"translateDataValueRectToAbsolute",{enumerable:!0,get:function(){return pG.translateDataValueRectToAbsolute}});var pW=r(11162);Object.defineProperty(t,"updateTsrVector4",{enumerable:!0,get:function(){return pW.updateTsrVector4}});var pK=r(11162);Object.defineProperty(t,"fromTsrVector4",{enumerable:!0,get:function(){return pK.fromTsrVector4}});var pq=r(84281);Object.defineProperty(t,"vectorToArray",{enumerable:!0,get:function(){return pq.vectorToArray}});var pX=r(84281);Object.defineProperty(t,"vectorToArrayViewF64",{enumerable:!0,get:function(){return pX.vectorToArrayViewF64}});var p$=r(84281);Object.defineProperty(t,"vectorToArrayViewF32",{enumerable:!0,get:function(){return p$.vectorToArrayViewF32}});var pY=r(84281);Object.defineProperty(t,"vectorToArrayViewUi32",{enumerable:!0,get:function(){return pY.vectorToArrayViewUi32}});var pJ=r(84281);Object.defineProperty(t,"vectorToArrayViewI32",{enumerable:!0,get:function(){return pJ.vectorToArrayViewI32}});var pQ=r(57040);Object.defineProperty(t,"watermarkHelpers",{enumerable:!0,get:function(){return pQ.watermarkHelpers}});var p0=r(54968);Object.defineProperty(t,"zeroArray2D",{enumerable:!0,get:function(){return p0.zeroArray2D}})},253:(e,t,r)=>{r.d(t,{YX:()=>runWorker});var n=r(88437),a=r(95754),o=r(7870),i=r(39940);function runWorker(e){let t=new e,r=(0,o.R)(self,"message");return(function(e,t){let r=t.pipe((0,i.UI)(e=>new n.P_(e.data.kind,e.data.value,e.data.error)),(0,i.DC)());return e.workUnit?r.pipe((0,i.bJ)(t=>(0,a.D)(e.workUnit(t)).pipe((0,i.iF)()))):e.work(r).pipe((0,i.iF)())})(t,r).subscribe(e=>{let r=postMessage;t.selectTransferables&&e.hasValue?r(e,t.selectTransferables(e.value)):r(e)})}},13728:(e,t,r)=>{let n;r.d(t,{z:()=>et}),function(e){e.assertEqual=e=>e,e.assertIs=function(e){},e.assertNever=function(e){throw Error()},e.arrayToEnum=e=>{let t={};for(let r of e)t[r]=r;return t},e.getValidEnumValues=t=>{let r=e.objectKeys(t).filter(e=>"number"!=typeof t[t[e]]),n={};for(let e of r)n[e]=t[e];return e.objectValues(n)},e.objectValues=t=>e.objectKeys(t).map(function(e){return t[e]}),e.objectKeys="function"==typeof Object.keys?e=>Object.keys(e):e=>{let t=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t},e.find=(e,t)=>{for(let r of e)if(t(r))return r},e.isInteger="function"==typeof Number.isInteger?e=>Number.isInteger(e):e=>"number"==typeof e&&isFinite(e)&&Math.floor(e)===e,e.joinValues=function(e,t=" | "){return e.map(e=>"string"==typeof e?`'${e}'`:e).join(t)},e.jsonStringifyReplacer=(e,t)=>"bigint"==typeof t?t.toString():t}(Y||(Y={})),(J||(J={})).mergeShapes=(e,t)=>({...e,...t});let a=Y.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),getParsedType=e=>{let t=typeof e;switch(t){case"undefined":return a.undefined;case"string":return a.string;case"number":return isNaN(e)?a.nan:a.number;case"boolean":return a.boolean;case"function":return a.function;case"bigint":return a.bigint;case"symbol":return a.symbol;case"object":if(Array.isArray(e))return a.array;if(null===e)return a.null;if(e.then&&"function"==typeof e.then&&e.catch&&"function"==typeof e.catch)return a.promise;if("undefined"!=typeof Map&&e instanceof Map)return a.map;if("undefined"!=typeof Set&&e instanceof Set)return a.set;if("undefined"!=typeof Date&&e instanceof Date)return a.date;return a.object;default:return a.unknown}},o=Y.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);let ZodError=class ZodError extends Error{constructor(e){super(),this.issues=[],this.addIssue=e=>{this.issues=[...this.issues,e]},this.addIssues=(e=[])=>{this.issues=[...this.issues,...e]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(e){return e.message},r={_errors:[]},processError=e=>{for(let n of e.issues)if("invalid_union"===n.code)n.unionErrors.map(processError);else if("invalid_return_type"===n.code)processError(n.returnTypeError);else if("invalid_arguments"===n.code)processError(n.argumentsError);else if(0===n.path.length)r._errors.push(t(n));else{let e=r,a=0;for(;a<n.path.length;){let r=n.path[a],o=a===n.path.length-1;o?(e[r]=e[r]||{_errors:[]},e[r]._errors.push(t(n))):e[r]=e[r]||{_errors:[]},e=e[r],a++}}};return processError(this),r}toString(){return this.message}get message(){return JSON.stringify(this.issues,Y.jsonStringifyReplacer,2)}get isEmpty(){return 0===this.issues.length}flatten(e=e=>e.message){let t={},r=[];for(let n of this.issues)n.path.length>0?(t[n.path[0]]=t[n.path[0]]||[],t[n.path[0]].push(e(n))):r.push(e(n));return{formErrors:r,fieldErrors:t}}get formErrors(){return this.flatten()}};ZodError.create=e=>{let t=new ZodError(e);return t};let errorMap=(e,t)=>{let r;switch(e.code){case o.invalid_type:r=e.received===a.undefined?"Required":`Expected ${e.expected}, received ${e.received}`;break;case o.invalid_literal:r=`Invalid literal value, expected ${JSON.stringify(e.expected,Y.jsonStringifyReplacer)}`;break;case o.unrecognized_keys:r=`Unrecognized key(s) in object: ${Y.joinValues(e.keys,", ")}`;break;case o.invalid_union:r="Invalid input";break;case o.invalid_union_discriminator:r=`Invalid discriminator value. Expected ${Y.joinValues(e.options)}`;break;case o.invalid_enum_value:r=`Invalid enum value. Expected ${Y.joinValues(e.options)}, received '${e.received}'`;break;case o.invalid_arguments:r="Invalid function arguments";break;case o.invalid_return_type:r="Invalid function return type";break;case o.invalid_date:r="Invalid date";break;case o.invalid_string:"object"==typeof e.validation?"includes"in e.validation?(r=`Invalid input: must include "${e.validation.includes}"`,"number"==typeof e.validation.position&&(r=`${r} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?r=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?r=`Invalid input: must end with "${e.validation.endsWith}"`:Y.assertNever(e.validation):r="regex"!==e.validation?`Invalid ${e.validation}`:"Invalid";break;case o.too_small:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:"date"===e.type?`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:"Invalid input";break;case o.too_big:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"bigint"===e.type?`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"date"===e.type?`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:"Invalid input";break;case o.custom:r="Invalid input";break;case o.invalid_intersection_types:r="Intersection results could not be merged";break;case o.not_multiple_of:r=`Number must be a multiple of ${e.multipleOf}`;break;case o.not_finite:r="Number must be finite";break;default:r=t.defaultError,Y.assertNever(e)}return{message:r}},i=errorMap;function getErrorMap(){return i}let makeIssue=e=>{let{data:t,path:r,errorMaps:n,issueData:a}=e,o=[...r,...a.path||[]],i={...a,path:o},s="",u=n.filter(e=>!!e).slice().reverse();for(let e of u)s=e(i,{data:t,defaultError:s}).message;return{...a,path:o,message:a.message||s}};function addIssueToContext(e,t){let r=makeIssue({issueData:t,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e)});e.common.issues.push(r)}let ParseStatus=class ParseStatus{constructor(){this.value="valid"}dirty(){"valid"===this.value&&(this.value="dirty")}abort(){"aborted"!==this.value&&(this.value="aborted")}static mergeArray(e,t){let r=[];for(let n of t){if("aborted"===n.status)return s;"dirty"===n.status&&e.dirty(),r.push(n.value)}return{status:e.value,value:r}}static async mergeObjectAsync(e,t){let r=[];for(let e of t)r.push({key:await e.key,value:await e.value});return ParseStatus.mergeObjectSync(e,r)}static mergeObjectSync(e,t){let r={};for(let n of t){let{key:t,value:a}=n;if("aborted"===t.status||"aborted"===a.status)return s;"dirty"===t.status&&e.dirty(),"dirty"===a.status&&e.dirty(),"__proto__"!==t.value&&(void 0!==a.value||n.alwaysSet)&&(r[t.value]=a.value)}return{status:e.value,value:r}}};let s=Object.freeze({status:"aborted"}),DIRTY=e=>({status:"dirty",value:e}),OK=e=>({status:"valid",value:e}),isAborted=e=>"aborted"===e.status,isDirty=e=>"dirty"===e.status,isValid=e=>"valid"===e.status,isAsync=e=>"undefined"!=typeof Promise&&e instanceof Promise;!function(e){e.errToObj=e=>"string"==typeof e?{message:e}:e||{},e.toString=e=>"string"==typeof e?e:null==e?void 0:e.message}(Q||(Q={}));let ParseInputLazyPath=class ParseInputLazyPath{constructor(e,t,r,n){this._cachedPath=[],this.parent=e,this.data=t,this._path=r,this._key=n}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}};let handleResult=(e,t)=>{if(isValid(t))return{success:!0,data:t.value};if(!e.common.issues.length)throw Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new ZodError(e.common.issues);return this._error=t,this._error}}};function processCreateParams(e){if(!e)return{};let{errorMap:t,invalid_type_error:r,required_error:n,description:a}=e;if(t&&(r||n))throw Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');return t?{errorMap:t,description:a}:{errorMap:(e,t)=>"invalid_type"!==e.code?{message:t.defaultError}:void 0===t.data?{message:null!=n?n:t.defaultError}:{message:null!=r?r:t.defaultError},description:a}}let ZodType=class ZodType{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return getParsedType(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new ParseStatus,ctx:{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(isAsync(t))throw Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let r=this.safeParse(e,t);if(r.success)return r.data;throw r.error}safeParse(e,t){var r;let n={common:{issues:[],async:null!==(r=null==t?void 0:t.async)&&void 0!==r&&r,contextualErrorMap:null==t?void 0:t.errorMap},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},a=this._parseSync({data:e,path:n.path,parent:n});return handleResult(n,a)}async parseAsync(e,t){let r=await this.safeParseAsync(e,t);if(r.success)return r.data;throw r.error}async safeParseAsync(e,t){let r={common:{issues:[],contextualErrorMap:null==t?void 0:t.errorMap,async:!0},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},n=this._parse({data:e,path:r.path,parent:r}),a=await (isAsync(n)?n:Promise.resolve(n));return handleResult(r,a)}refine(e,t){let getIssueProperties=e=>"string"==typeof t||void 0===t?{message:t}:"function"==typeof t?t(e):t;return this._refinement((t,r)=>{let n=e(t),setError=()=>r.addIssue({code:o.custom,...getIssueProperties(t)});return"undefined"!=typeof Promise&&n instanceof Promise?n.then(e=>!!e||(setError(),!1)):!!n||(setError(),!1)})}refinement(e,t){return this._refinement((r,n)=>!!e(r)||(n.addIssue("function"==typeof t?t(r,n):t),!1))}_refinement(e){return new ZodEffects({schema:this,typeName:ee.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ZodOptional.create(this,this._def)}nullable(){return ZodNullable.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return ZodArray.create(this,this._def)}promise(){return ZodPromise.create(this,this._def)}or(e){return ZodUnion.create([this,e],this._def)}and(e){return ZodIntersection.create(this,e,this._def)}transform(e){return new ZodEffects({...processCreateParams(this._def),schema:this,typeName:ee.ZodEffects,effect:{type:"transform",transform:e}})}default(e){return new ZodDefault({...processCreateParams(this._def),innerType:this,defaultValue:"function"==typeof e?e:()=>e,typeName:ee.ZodDefault})}brand(){return new ZodBranded({typeName:ee.ZodBranded,type:this,...processCreateParams(this._def)})}catch(e){return new ZodCatch({...processCreateParams(this._def),innerType:this,catchValue:"function"==typeof e?e:()=>e,typeName:ee.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return ZodPipeline.create(this,e)}readonly(){return ZodReadonly.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}};let u=/^c[^\s-]{8,}$/i,c=/^[a-z][a-z0-9]*$/,l=/^[0-9A-HJKMNP-TV-Z]{26}$/,d=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,f=/^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,p=/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,h=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,datetimeRegex=e=>e.precision?e.offset?RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`):RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`):0===e.precision?e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"):e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");let ZodString=class ZodString extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=String(e.data));let r=this._getType(e);if(r!==a.string){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.string,received:t.parsedType}),s}let i=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind)e.data.length<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),i.dirty());else if("max"===r.kind)e.data.length>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),i.dirty());else if("length"===r.kind){let n=e.data.length>r.value,a=e.data.length<r.value;(n||a)&&(t=this._getOrReturnCtx(e,t),n?addIssueToContext(t,{code:o.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}):a&&addIssueToContext(t,{code:o.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}),i.dirty())}else if("email"===r.kind)f.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"email",code:o.invalid_string,message:r.message}),i.dirty());else if("emoji"===r.kind)n||(n=RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")),n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"emoji",code:o.invalid_string,message:r.message}),i.dirty());else if("uuid"===r.kind)d.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"uuid",code:o.invalid_string,message:r.message}),i.dirty());else if("cuid"===r.kind)u.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid",code:o.invalid_string,message:r.message}),i.dirty());else if("cuid2"===r.kind)c.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid2",code:o.invalid_string,message:r.message}),i.dirty());else if("ulid"===r.kind)l.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ulid",code:o.invalid_string,message:r.message}),i.dirty());else if("url"===r.kind)try{new URL(e.data)}catch(n){addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"url",code:o.invalid_string,message:r.message}),i.dirty()}else if("regex"===r.kind){r.regex.lastIndex=0;let n=r.regex.test(e.data);n||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"regex",code:o.invalid_string,message:r.message}),i.dirty())}else if("trim"===r.kind)e.data=e.data.trim();else if("includes"===r.kind)e.data.includes(r.value,r.position)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{includes:r.value,position:r.position},message:r.message}),i.dirty());else if("toLowerCase"===r.kind)e.data=e.data.toLowerCase();else if("toUpperCase"===r.kind)e.data=e.data.toUpperCase();else if("startsWith"===r.kind)e.data.startsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{startsWith:r.value},message:r.message}),i.dirty());else if("endsWith"===r.kind)e.data.endsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:{endsWith:r.value},message:r.message}),i.dirty());else if("datetime"===r.kind){let n=datetimeRegex(r);n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_string,validation:"datetime",message:r.message}),i.dirty())}else if("ip"===r.kind){var m,g;m=e.data,("v4"===(g=r.version)||!g)&&p.test(m)||("v6"===g||!g)&&h.test(m)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ip",code:o.invalid_string,message:r.message}),i.dirty())}else Y.assertNever(r);return{status:i.value,value:e.data}}_regex(e,t,r){return this.refinement(t=>e.test(t),{validation:t,code:o.invalid_string,...Q.errToObj(r)})}_addCheck(e){return new ZodString({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...Q.errToObj(e)})}url(e){return this._addCheck({kind:"url",...Q.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...Q.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...Q.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...Q.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...Q.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...Q.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...Q.errToObj(e)})}datetime(e){var t;return"string"==typeof e?this._addCheck({kind:"datetime",precision:null,offset:!1,message:e}):this._addCheck({kind:"datetime",precision:void 0===(null==e?void 0:e.precision)?null:null==e?void 0:e.precision,offset:null!==(t=null==e?void 0:e.offset)&&void 0!==t&&t,...Q.errToObj(null==e?void 0:e.message)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...Q.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:null==t?void 0:t.position,...Q.errToObj(null==t?void 0:t.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...Q.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...Q.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...Q.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...Q.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...Q.errToObj(t)})}nonempty(e){return this.min(1,Q.errToObj(e))}trim(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>"datetime"===e.kind)}get isEmail(){return!!this._def.checks.find(e=>"email"===e.kind)}get isURL(){return!!this._def.checks.find(e=>"url"===e.kind)}get isEmoji(){return!!this._def.checks.find(e=>"emoji"===e.kind)}get isUUID(){return!!this._def.checks.find(e=>"uuid"===e.kind)}get isCUID(){return!!this._def.checks.find(e=>"cuid"===e.kind)}get isCUID2(){return!!this._def.checks.find(e=>"cuid2"===e.kind)}get isULID(){return!!this._def.checks.find(e=>"ulid"===e.kind)}get isIP(){return!!this._def.checks.find(e=>"ip"===e.kind)}get minLength(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodString.create=e=>{var t;return new ZodString({checks:[],typeName:ee.ZodString,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodNumber=class ZodNumber extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){let t;this._def.coerce&&(e.data=Number(e.data));let r=this._getType(e);if(r!==a.number){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.number,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("int"===r.kind)Y.isInteger(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.invalid_type,expected:"integer",received:"float",message:r.message}),n.dirty());else if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,minimum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,maximum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else"multipleOf"===r.kind?0!==function(e,t){let r=(e.toString().split(".")[1]||"").length,n=(t.toString().split(".")[1]||"").length,a=r>n?r:n,o=parseInt(e.toFixed(a).replace(".","")),i=parseInt(t.toFixed(a).replace(".",""));return o%i/Math.pow(10,a)}(e.data,r.value)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):"finite"===r.kind?Number.isFinite(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_finite,message:r.message}),n.dirty()):Y.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Q.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Q.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Q.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Q.toString(t))}setLimit(e,t,r,n){return new ZodNumber({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:Q.toString(n)}]})}_addCheck(e){return new ZodNumber({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:Q.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:Q.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:Q.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:Q.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:Q.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Q.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:Q.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:Q.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:Q.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>"int"===e.kind||"multipleOf"===e.kind&&Y.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let r of this._def.checks){if("finite"===r.kind||"int"===r.kind||"multipleOf"===r.kind)return!0;"min"===r.kind?(null===t||r.value>t)&&(t=r.value):"max"===r.kind&&(null===e||r.value<e)&&(e=r.value)}return Number.isFinite(t)&&Number.isFinite(e)}};ZodNumber.create=e=>new ZodNumber({checks:[],typeName:ee.ZodNumber,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodBigInt=class ZodBigInt extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){let t;this._def.coerce&&(e.data=BigInt(e.data));let r=this._getType(e);if(r!==a.bigint){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.bigint,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,type:"bigint",minimum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,type:"bigint",maximum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else"multipleOf"===r.kind?e.data%r.value!==BigInt(0)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):Y.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Q.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Q.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Q.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Q.toString(t))}setLimit(e,t,r,n){return new ZodBigInt({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:Q.toString(n)}]})}_addCheck(e){return new ZodBigInt({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:Q.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:Q.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:Q.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:Q.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Q.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodBigInt.create=e=>{var t;return new ZodBigInt({checks:[],typeName:ee.ZodBigInt,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodBoolean=class ZodBoolean extends ZodType{_parse(e){this._def.coerce&&(e.data=!!e.data);let t=this._getType(e);if(t!==a.boolean){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.boolean,received:t.parsedType}),s}return OK(e.data)}};ZodBoolean.create=e=>new ZodBoolean({typeName:ee.ZodBoolean,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodDate=class ZodDate extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=new Date(e.data));let r=this._getType(e);if(r!==a.date){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.date,received:t.parsedType}),s}if(isNaN(e.data.getTime())){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_date}),s}let n=new ParseStatus;for(let r of this._def.checks)"min"===r.kind?e.data.getTime()<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_small,message:r.message,inclusive:!0,exact:!1,minimum:r.value,type:"date"}),n.dirty()):"max"===r.kind?e.data.getTime()>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:o.too_big,message:r.message,inclusive:!0,exact:!1,maximum:r.value,type:"date"}),n.dirty()):Y.assertNever(r);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new ZodDate({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:Q.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:Q.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return null!=e?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return null!=e?new Date(e):null}};ZodDate.create=e=>new ZodDate({checks:[],coerce:(null==e?void 0:e.coerce)||!1,typeName:ee.ZodDate,...processCreateParams(e)});let ZodSymbol=class ZodSymbol extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.symbol){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.symbol,received:t.parsedType}),s}return OK(e.data)}};ZodSymbol.create=e=>new ZodSymbol({typeName:ee.ZodSymbol,...processCreateParams(e)});let ZodUndefined=class ZodUndefined extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.undefined,received:t.parsedType}),s}return OK(e.data)}};ZodUndefined.create=e=>new ZodUndefined({typeName:ee.ZodUndefined,...processCreateParams(e)});let ZodNull=class ZodNull extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.null){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.null,received:t.parsedType}),s}return OK(e.data)}};ZodNull.create=e=>new ZodNull({typeName:ee.ZodNull,...processCreateParams(e)});let ZodAny=class ZodAny extends ZodType{constructor(){super(...arguments),this._any=!0}_parse(e){return OK(e.data)}};ZodAny.create=e=>new ZodAny({typeName:ee.ZodAny,...processCreateParams(e)});let ZodUnknown=class ZodUnknown extends ZodType{constructor(){super(...arguments),this._unknown=!0}_parse(e){return OK(e.data)}};ZodUnknown.create=e=>new ZodUnknown({typeName:ee.ZodUnknown,...processCreateParams(e)});let ZodNever=class ZodNever extends ZodType{_parse(e){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.never,received:t.parsedType}),s}};ZodNever.create=e=>new ZodNever({typeName:ee.ZodNever,...processCreateParams(e)});let ZodVoid=class ZodVoid extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.void,received:t.parsedType}),s}return OK(e.data)}};ZodVoid.create=e=>new ZodVoid({typeName:ee.ZodVoid,...processCreateParams(e)});let ZodArray=class ZodArray extends ZodType{_parse(e){let{ctx:t,status:r}=this._processInputParams(e),n=this._def;if(t.parsedType!==a.array)return addIssueToContext(t,{code:o.invalid_type,expected:a.array,received:t.parsedType}),s;if(null!==n.exactLength){let e=t.data.length>n.exactLength.value,a=t.data.length<n.exactLength.value;(e||a)&&(addIssueToContext(t,{code:e?o.too_big:o.too_small,minimum:a?n.exactLength.value:void 0,maximum:e?n.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:n.exactLength.message}),r.dirty())}if(null!==n.minLength&&t.data.length<n.minLength.value&&(addIssueToContext(t,{code:o.too_small,minimum:n.minLength.value,type:"array",inclusive:!0,exact:!1,message:n.minLength.message}),r.dirty()),null!==n.maxLength&&t.data.length>n.maxLength.value&&(addIssueToContext(t,{code:o.too_big,maximum:n.maxLength.value,type:"array",inclusive:!0,exact:!1,message:n.maxLength.message}),r.dirty()),t.common.async)return Promise.all([...t.data].map((e,r)=>n.type._parseAsync(new ParseInputLazyPath(t,e,t.path,r)))).then(e=>ParseStatus.mergeArray(r,e));let i=[...t.data].map((e,r)=>n.type._parseSync(new ParseInputLazyPath(t,e,t.path,r)));return ParseStatus.mergeArray(r,i)}get element(){return this._def.type}min(e,t){return new ZodArray({...this._def,minLength:{value:e,message:Q.toString(t)}})}max(e,t){return new ZodArray({...this._def,maxLength:{value:e,message:Q.toString(t)}})}length(e,t){return new ZodArray({...this._def,exactLength:{value:e,message:Q.toString(t)}})}nonempty(e){return this.min(1,e)}};ZodArray.create=(e,t)=>new ZodArray({type:e,minLength:null,maxLength:null,exactLength:null,typeName:ee.ZodArray,...processCreateParams(t)});let ZodObject=class ZodObject extends ZodType{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(null!==this._cached)return this._cached;let e=this._def.shape(),t=Y.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){let t=this._getType(e);if(t!==a.object){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.object,received:t.parsedType}),s}let{status:r,ctx:n}=this._processInputParams(e),{shape:i,keys:u}=this._getCached(),c=[];if(!(this._def.catchall instanceof ZodNever&&"strip"===this._def.unknownKeys))for(let e in n.data)u.includes(e)||c.push(e);let l=[];for(let e of u){let t=i[e],r=n.data[e];l.push({key:{status:"valid",value:e},value:t._parse(new ParseInputLazyPath(n,r,n.path,e)),alwaysSet:e in n.data})}if(this._def.catchall instanceof ZodNever){let e=this._def.unknownKeys;if("passthrough"===e)for(let e of c)l.push({key:{status:"valid",value:e},value:{status:"valid",value:n.data[e]}});else if("strict"===e)c.length>0&&(addIssueToContext(n,{code:o.unrecognized_keys,keys:c}),r.dirty());else if("strip"===e);else throw Error("Internal ZodObject error: invalid unknownKeys value.")}else{let e=this._def.catchall;for(let t of c){let r=n.data[t];l.push({key:{status:"valid",value:t},value:e._parse(new ParseInputLazyPath(n,r,n.path,t)),alwaysSet:t in n.data})}}return n.common.async?Promise.resolve().then(async()=>{let e=[];for(let t of l){let r=await t.key;e.push({key:r,value:await t.value,alwaysSet:t.alwaysSet})}return e}).then(e=>ParseStatus.mergeObjectSync(r,e)):ParseStatus.mergeObjectSync(r,l)}get shape(){return this._def.shape()}strict(e){return Q.errToObj,new ZodObject({...this._def,unknownKeys:"strict",...void 0!==e?{errorMap:(t,r)=>{var n,a,o,i;let s=null!==(o=null===(a=(n=this._def).errorMap)||void 0===a?void 0:a.call(n,t,r).message)&&void 0!==o?o:r.defaultError;return"unrecognized_keys"===t.code?{message:null!==(i=Q.errToObj(e).message)&&void 0!==i?i:s}:{message:s}}}:{}})}strip(){return new ZodObject({...this._def,unknownKeys:"strip"})}passthrough(){return new ZodObject({...this._def,unknownKeys:"passthrough"})}extend(e){return new ZodObject({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){let t=new ZodObject({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:ee.ZodObject});return t}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new ZodObject({...this._def,catchall:e})}pick(e){let t={};return Y.objectKeys(e).forEach(r=>{e[r]&&this.shape[r]&&(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}omit(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{e[r]||(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}deepPartial(){return function deepPartialify(e){if(e instanceof ZodObject){let t={};for(let r in e.shape){let n=e.shape[r];t[r]=ZodOptional.create(deepPartialify(n))}return new ZodObject({...e._def,shape:()=>t})}return e instanceof ZodArray?new ZodArray({...e._def,type:deepPartialify(e.element)}):e instanceof ZodOptional?ZodOptional.create(deepPartialify(e.unwrap())):e instanceof ZodNullable?ZodNullable.create(deepPartialify(e.unwrap())):e instanceof ZodTuple?ZodTuple.create(e.items.map(e=>deepPartialify(e))):e}(this)}partial(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{let n=this.shape[r];e&&!e[r]?t[r]=n:t[r]=n.optional()}),new ZodObject({...this._def,shape:()=>t})}required(e){let t={};return Y.objectKeys(this.shape).forEach(r=>{if(e&&!e[r])t[r]=this.shape[r];else{let e=this.shape[r],n=e;for(;n instanceof ZodOptional;)n=n._def.innerType;t[r]=n}}),new ZodObject({...this._def,shape:()=>t})}keyof(){return createZodEnum(Y.objectKeys(this.shape))}};ZodObject.create=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)}),ZodObject.strictCreate=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strict",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)}),ZodObject.lazycreate=(e,t)=>new ZodObject({shape:e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ee.ZodObject,...processCreateParams(t)});let ZodUnion=class ZodUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.options;if(t.common.async)return Promise.all(r.map(async e=>{let r={...t,common:{...t.common,issues:[]},parent:null};return{result:await e._parseAsync({data:t.data,path:t.path,parent:r}),ctx:r}})).then(function(e){for(let t of e)if("valid"===t.result.status)return t.result;for(let r of e)if("dirty"===r.result.status)return t.common.issues.push(...r.ctx.common.issues),r.result;let r=e.map(e=>new ZodError(e.ctx.common.issues));return addIssueToContext(t,{code:o.invalid_union,unionErrors:r}),s});{let e;let n=[];for(let a of r){let r={...t,common:{...t.common,issues:[]},parent:null},o=a._parseSync({data:t.data,path:t.path,parent:r});if("valid"===o.status)return o;"dirty"!==o.status||e||(e={result:o,ctx:r}),r.common.issues.length&&n.push(r.common.issues)}if(e)return t.common.issues.push(...e.ctx.common.issues),e.result;let a=n.map(e=>new ZodError(e));return addIssueToContext(t,{code:o.invalid_union,unionErrors:a}),s}}get options(){return this._def.options}};ZodUnion.create=(e,t)=>new ZodUnion({options:e,typeName:ee.ZodUnion,...processCreateParams(t)});let getDiscriminator=e=>{if(e instanceof ZodLazy)return getDiscriminator(e.schema);if(e instanceof ZodEffects)return getDiscriminator(e.innerType());if(e instanceof ZodLiteral)return[e.value];if(e instanceof ZodEnum)return e.options;if(e instanceof ZodNativeEnum)return Object.keys(e.enum);if(e instanceof ZodDefault)return getDiscriminator(e._def.innerType);if(e instanceof ZodUndefined)return[void 0];else if(e instanceof ZodNull)return[null];else return null};let ZodDiscriminatedUnion=class ZodDiscriminatedUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.object)return addIssueToContext(t,{code:o.invalid_type,expected:a.object,received:t.parsedType}),s;let r=this.discriminator,n=t.data[r],i=this.optionsMap.get(n);return i?t.common.async?i._parseAsync({data:t.data,path:t.path,parent:t}):i._parseSync({data:t.data,path:t.path,parent:t}):(addIssueToContext(t,{code:o.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),s)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,r){let n=new Map;for(let r of t){let t=getDiscriminator(r.shape[e]);if(!t)throw Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let a of t){if(n.has(a))throw Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);n.set(a,r)}}return new ZodDiscriminatedUnion({typeName:ee.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:n,...processCreateParams(r)})}};let ZodIntersection=class ZodIntersection extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e),handleParsed=(e,n)=>{if(isAborted(e)||isAborted(n))return s;let i=function mergeValues(e,t){let r=getParsedType(e),n=getParsedType(t);if(e===t)return{valid:!0,data:e};if(r===a.object&&n===a.object){let r=Y.objectKeys(t),n=Y.objectKeys(e).filter(e=>-1!==r.indexOf(e)),a={...e,...t};for(let r of n){let n=mergeValues(e[r],t[r]);if(!n.valid)return{valid:!1};a[r]=n.data}return{valid:!0,data:a}}if(r===a.array&&n===a.array){if(e.length!==t.length)return{valid:!1};let r=[];for(let n=0;n<e.length;n++){let a=e[n],o=t[n],i=mergeValues(a,o);if(!i.valid)return{valid:!1};r.push(i.data)}return{valid:!0,data:r}}return r===a.date&&n===a.date&&+e==+t?{valid:!0,data:e}:{valid:!1}}(e.value,n.value);return i.valid?((isDirty(e)||isDirty(n))&&t.dirty(),{status:t.value,value:i.data}):(addIssueToContext(r,{code:o.invalid_intersection_types}),s)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then(([e,t])=>handleParsed(e,t)):handleParsed(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}};ZodIntersection.create=(e,t,r)=>new ZodIntersection({left:e,right:t,typeName:ee.ZodIntersection,...processCreateParams(r)});let ZodTuple=class ZodTuple extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.array)return addIssueToContext(r,{code:o.invalid_type,expected:a.array,received:r.parsedType}),s;if(r.data.length<this._def.items.length)return addIssueToContext(r,{code:o.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),s;let n=this._def.rest;!n&&r.data.length>this._def.items.length&&(addIssueToContext(r,{code:o.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let i=[...r.data].map((e,t)=>{let n=this._def.items[t]||this._def.rest;return n?n._parse(new ParseInputLazyPath(r,e,r.path,t)):null}).filter(e=>!!e);return r.common.async?Promise.all(i).then(e=>ParseStatus.mergeArray(t,e)):ParseStatus.mergeArray(t,i)}get items(){return this._def.items}rest(e){return new ZodTuple({...this._def,rest:e})}};ZodTuple.create=(e,t)=>{if(!Array.isArray(e))throw Error("You must pass an array of schemas to z.tuple([ ... ])");return new ZodTuple({items:e,typeName:ee.ZodTuple,rest:null,...processCreateParams(t)})};let ZodRecord=class ZodRecord extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.object)return addIssueToContext(r,{code:o.invalid_type,expected:a.object,received:r.parsedType}),s;let n=[],i=this._def.keyType,u=this._def.valueType;for(let e in r.data)n.push({key:i._parse(new ParseInputLazyPath(r,e,r.path,e)),value:u._parse(new ParseInputLazyPath(r,r.data[e],r.path,e))});return r.common.async?ParseStatus.mergeObjectAsync(t,n):ParseStatus.mergeObjectSync(t,n)}get element(){return this._def.valueType}static create(e,t,r){return new ZodRecord(t instanceof ZodType?{keyType:e,valueType:t,typeName:ee.ZodRecord,...processCreateParams(r)}:{keyType:ZodString.create(),valueType:e,typeName:ee.ZodRecord,...processCreateParams(t)})}};let ZodMap=class ZodMap extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.map)return addIssueToContext(r,{code:o.invalid_type,expected:a.map,received:r.parsedType}),s;let n=this._def.keyType,i=this._def.valueType,u=[...r.data.entries()].map(([e,t],a)=>({key:n._parse(new ParseInputLazyPath(r,e,r.path,[a,"key"])),value:i._parse(new ParseInputLazyPath(r,t,r.path,[a,"value"]))}));if(r.common.async){let e=new Map;return Promise.resolve().then(async()=>{for(let r of u){let n=await r.key,a=await r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}})}{let e=new Map;for(let r of u){let n=r.key,a=r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}}}};ZodMap.create=(e,t,r)=>new ZodMap({valueType:t,keyType:e,typeName:ee.ZodMap,...processCreateParams(r)});let ZodSet=class ZodSet extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.set)return addIssueToContext(r,{code:o.invalid_type,expected:a.set,received:r.parsedType}),s;let n=this._def;null!==n.minSize&&r.data.size<n.minSize.value&&(addIssueToContext(r,{code:o.too_small,minimum:n.minSize.value,type:"set",inclusive:!0,exact:!1,message:n.minSize.message}),t.dirty()),null!==n.maxSize&&r.data.size>n.maxSize.value&&(addIssueToContext(r,{code:o.too_big,maximum:n.maxSize.value,type:"set",inclusive:!0,exact:!1,message:n.maxSize.message}),t.dirty());let i=this._def.valueType;function finalizeSet(e){let r=new Set;for(let n of e){if("aborted"===n.status)return s;"dirty"===n.status&&t.dirty(),r.add(n.value)}return{status:t.value,value:r}}let u=[...r.data.values()].map((e,t)=>i._parse(new ParseInputLazyPath(r,e,r.path,t)));return r.common.async?Promise.all(u).then(e=>finalizeSet(e)):finalizeSet(u)}min(e,t){return new ZodSet({...this._def,minSize:{value:e,message:Q.toString(t)}})}max(e,t){return new ZodSet({...this._def,maxSize:{value:e,message:Q.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};ZodSet.create=(e,t)=>new ZodSet({valueType:e,minSize:null,maxSize:null,typeName:ee.ZodSet,...processCreateParams(t)});let ZodFunction=class ZodFunction extends ZodType{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.function)return addIssueToContext(t,{code:o.invalid_type,expected:a.function,received:t.parsedType}),s;function makeArgsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:o.invalid_arguments,argumentsError:r}})}function makeReturnsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:o.invalid_return_type,returnTypeError:r}})}let r={errorMap:t.common.contextualErrorMap},n=t.data;if(this._def.returns instanceof ZodPromise){let e=this;return OK(async function(...t){let a=new ZodError([]),o=await e._def.args.parseAsync(t,r).catch(e=>{throw a.addIssue(makeArgsIssue(t,e)),a}),i=await Reflect.apply(n,this,o),s=await e._def.returns._def.type.parseAsync(i,r).catch(e=>{throw a.addIssue(makeReturnsIssue(i,e)),a});return s})}{let e=this;return OK(function(...t){let a=e._def.args.safeParse(t,r);if(!a.success)throw new ZodError([makeArgsIssue(t,a.error)]);let o=Reflect.apply(n,this,a.data),i=e._def.returns.safeParse(o,r);if(!i.success)throw new ZodError([makeReturnsIssue(o,i.error)]);return i.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new ZodFunction({...this._def,args:ZodTuple.create(e).rest(ZodUnknown.create())})}returns(e){return new ZodFunction({...this._def,returns:e})}implement(e){let t=this.parse(e);return t}strictImplement(e){let t=this.parse(e);return t}static create(e,t,r){return new ZodFunction({args:e||ZodTuple.create([]).rest(ZodUnknown.create()),returns:t||ZodUnknown.create(),typeName:ee.ZodFunction,...processCreateParams(r)})}};let ZodLazy=class ZodLazy extends ZodType{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.getter();return r._parse({data:t.data,path:t.path,parent:t})}};ZodLazy.create=(e,t)=>new ZodLazy({getter:e,typeName:ee.ZodLazy,...processCreateParams(t)});let ZodLiteral=class ZodLiteral extends ZodType{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{received:t.data,code:o.invalid_literal,expected:this._def.value}),s}return{status:"valid",value:e.data}}get value(){return this._def.value}};function createZodEnum(e,t){return new ZodEnum({values:e,typeName:ee.ZodEnum,...processCreateParams(t)})}ZodLiteral.create=(e,t)=>new ZodLiteral({value:e,typeName:ee.ZodLiteral,...processCreateParams(t)});let ZodEnum=class ZodEnum extends ZodType{_parse(e){if("string"!=typeof e.data){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{expected:Y.joinValues(r),received:t.parsedType,code:o.invalid_type}),s}if(-1===this._def.values.indexOf(e.data)){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{received:t.data,code:o.invalid_enum_value,options:r}),s}return OK(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e){return ZodEnum.create(e)}exclude(e){return ZodEnum.create(this.options.filter(t=>!e.includes(t)))}};ZodEnum.create=createZodEnum;let ZodNativeEnum=class ZodNativeEnum extends ZodType{_parse(e){let t=Y.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(e);if(r.parsedType!==a.string&&r.parsedType!==a.number){let e=Y.objectValues(t);return addIssueToContext(r,{expected:Y.joinValues(e),received:r.parsedType,code:o.invalid_type}),s}if(-1===t.indexOf(e.data)){let e=Y.objectValues(t);return addIssueToContext(r,{received:r.data,code:o.invalid_enum_value,options:e}),s}return OK(e.data)}get enum(){return this._def.values}};ZodNativeEnum.create=(e,t)=>new ZodNativeEnum({values:e,typeName:ee.ZodNativeEnum,...processCreateParams(t)});let ZodPromise=class ZodPromise extends ZodType{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.promise&&!1===t.common.async)return addIssueToContext(t,{code:o.invalid_type,expected:a.promise,received:t.parsedType}),s;let r=t.parsedType===a.promise?t.data:Promise.resolve(t.data);return OK(r.then(e=>this._def.type.parseAsync(e,{path:t.path,errorMap:t.common.contextualErrorMap})))}};ZodPromise.create=(e,t)=>new ZodPromise({type:e,typeName:ee.ZodPromise,...processCreateParams(t)});let ZodEffects=class ZodEffects extends ZodType{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===ee.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:r}=this._processInputParams(e),n=this._def.effect||null,a={addIssue:e=>{addIssueToContext(r,e),e.fatal?t.abort():t.dirty()},get path(){return r.path}};if(a.addIssue=a.addIssue.bind(a),"preprocess"===n.type){let e=n.transform(r.data,a);return r.common.issues.length?{status:"dirty",value:r.data}:r.common.async?Promise.resolve(e).then(e=>this._def.schema._parseAsync({data:e,path:r.path,parent:r})):this._def.schema._parseSync({data:e,path:r.path,parent:r})}if("refinement"===n.type){let executeRefinement=e=>{let t=n.refinement(e,a);if(r.common.async)return Promise.resolve(t);if(t instanceof Promise)throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return e};if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value).then(()=>({status:t.value,value:e.value}))));{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value),{status:t.value,value:e.value})}}if("transform"===n.type){if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>isValid(e)?Promise.resolve(n.transform(e.value,a)).then(e=>({status:t.value,value:e})):e);{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!isValid(e))return e;let o=n.transform(e.value,a);if(o instanceof Promise)throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}}Y.assertNever(n)}};ZodEffects.create=(e,t,r)=>new ZodEffects({schema:e,typeName:ee.ZodEffects,effect:t,...processCreateParams(r)}),ZodEffects.createWithPreprocess=(e,t,r)=>new ZodEffects({schema:t,effect:{type:"preprocess",transform:e},typeName:ee.ZodEffects,...processCreateParams(r)});let ZodOptional=class ZodOptional extends ZodType{_parse(e){let t=this._getType(e);return t===a.undefined?OK(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodOptional.create=(e,t)=>new ZodOptional({innerType:e,typeName:ee.ZodOptional,...processCreateParams(t)});let ZodNullable=class ZodNullable extends ZodType{_parse(e){let t=this._getType(e);return t===a.null?OK(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodNullable.create=(e,t)=>new ZodNullable({innerType:e,typeName:ee.ZodNullable,...processCreateParams(t)});let ZodDefault=class ZodDefault extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return t.parsedType===a.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};ZodDefault.create=(e,t)=>new ZodDefault({innerType:e,typeName:ee.ZodDefault,defaultValue:"function"==typeof t.default?t.default:()=>t.default,...processCreateParams(t)});let ZodCatch=class ZodCatch extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r={...t,common:{...t.common,issues:[]}},n=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return isAsync(n)?n.then(e=>({status:"valid",value:"valid"===e.status?e.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})})):{status:"valid",value:"valid"===n.status?n.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}};ZodCatch.create=(e,t)=>new ZodCatch({innerType:e,typeName:ee.ZodCatch,catchValue:"function"==typeof t.catch?t.catch:()=>t.catch,...processCreateParams(t)});let ZodNaN=class ZodNaN extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.nan){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:o.invalid_type,expected:a.nan,received:t.parsedType}),s}return{status:"valid",value:e.data}}};ZodNaN.create=e=>new ZodNaN({typeName:ee.ZodNaN,...processCreateParams(e)});let m=Symbol("zod_brand");let ZodBranded=class ZodBranded extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return this._def.type._parse({data:r,path:t.path,parent:t})}unwrap(){return this._def.type}};let ZodPipeline=class ZodPipeline extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.common.async){let handleAsync=async()=>{let e=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),DIRTY(e.value)):this._def.out._parseAsync({data:e.value,path:r.path,parent:r})};return handleAsync()}{let e=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),{status:"dirty",value:e.value}):this._def.out._parseSync({data:e.value,path:r.path,parent:r})}}static create(e,t){return new ZodPipeline({in:e,out:t,typeName:ee.ZodPipeline})}};let ZodReadonly=class ZodReadonly extends ZodType{_parse(e){let t=this._def.innerType._parse(e);return isValid(t)&&(t.value=Object.freeze(t.value)),t}};ZodReadonly.create=(e,t)=>new ZodReadonly({innerType:e,typeName:ee.ZodReadonly,...processCreateParams(t)});let custom=(e,t={},r)=>e?ZodAny.create().superRefine((n,a)=>{var o,i;if(!e(n)){let e="function"==typeof t?t(n):"string"==typeof t?{message:t}:t,s=null===(i=null!==(o=e.fatal)&&void 0!==o?o:r)||void 0===i||i,u="string"==typeof e?{message:e}:e;a.addIssue({code:"custom",...u,fatal:s})}}):ZodAny.create(),g={object:ZodObject.lazycreate};!function(e){e.ZodString="ZodString",e.ZodNumber="ZodNumber",e.ZodNaN="ZodNaN",e.ZodBigInt="ZodBigInt",e.ZodBoolean="ZodBoolean",e.ZodDate="ZodDate",e.ZodSymbol="ZodSymbol",e.ZodUndefined="ZodUndefined",e.ZodNull="ZodNull",e.ZodAny="ZodAny",e.ZodUnknown="ZodUnknown",e.ZodNever="ZodNever",e.ZodVoid="ZodVoid",e.ZodArray="ZodArray",e.ZodObject="ZodObject",e.ZodUnion="ZodUnion",e.ZodDiscriminatedUnion="ZodDiscriminatedUnion",e.ZodIntersection="ZodIntersection",e.ZodTuple="ZodTuple",e.ZodRecord="ZodRecord",e.ZodMap="ZodMap",e.ZodSet="ZodSet",e.ZodFunction="ZodFunction",e.ZodLazy="ZodLazy",e.ZodLiteral="ZodLiteral",e.ZodEnum="ZodEnum",e.ZodEffects="ZodEffects",e.ZodNativeEnum="ZodNativeEnum",e.ZodOptional="ZodOptional",e.ZodNullable="ZodNullable",e.ZodDefault="ZodDefault",e.ZodCatch="ZodCatch",e.ZodPromise="ZodPromise",e.ZodBranded="ZodBranded",e.ZodPipeline="ZodPipeline",e.ZodReadonly="ZodReadonly"}(ee||(ee={}));let v=ZodString.create,b=ZodNumber.create,y=ZodNaN.create,S=ZodBigInt.create,P=ZodBoolean.create,T=ZodDate.create,x=ZodSymbol.create,_=ZodUndefined.create,A=ZodNull.create,O=ZodAny.create,w=ZodUnknown.create,E=ZodNever.create,k=ZodVoid.create,D=ZodArray.create,M=ZodObject.create,C=ZodObject.strictCreate,j=ZodUnion.create,R=ZodDiscriminatedUnion.create,I=ZodIntersection.create,N=ZodTuple.create,L=ZodRecord.create,B=ZodMap.create,F=ZodSet.create,z=ZodFunction.create,Z=ZodLazy.create,H=ZodLiteral.create,V=ZodEnum.create,U=ZodNativeEnum.create,G=ZodPromise.create,W=ZodEffects.create,K=ZodOptional.create,q=ZodNullable.create,X=ZodEffects.createWithPreprocess,$=ZodPipeline.create;var Y,J,Q,ee,et=Object.freeze({__proto__:null,defaultErrorMap:errorMap,setErrorMap:function(e){i=e},getErrorMap:getErrorMap,makeIssue:makeIssue,EMPTY_PATH:[],addIssueToContext:addIssueToContext,ParseStatus:ParseStatus,INVALID:s,DIRTY:DIRTY,OK:OK,isAborted:isAborted,isDirty:isDirty,isValid:isValid,isAsync:isAsync,get util(){return Y},get objectUtil(){return J},ZodParsedType:a,getParsedType:getParsedType,ZodType:ZodType,ZodString:ZodString,ZodNumber:ZodNumber,ZodBigInt:ZodBigInt,ZodBoolean:ZodBoolean,ZodDate:ZodDate,ZodSymbol:ZodSymbol,ZodUndefined:ZodUndefined,ZodNull:ZodNull,ZodAny:ZodAny,ZodUnknown:ZodUnknown,ZodNever:ZodNever,ZodVoid:ZodVoid,ZodArray:ZodArray,ZodObject:ZodObject,ZodUnion:ZodUnion,ZodDiscriminatedUnion:ZodDiscriminatedUnion,ZodIntersection:ZodIntersection,ZodTuple:ZodTuple,ZodRecord:ZodRecord,ZodMap:ZodMap,ZodSet:ZodSet,ZodFunction:ZodFunction,ZodLazy:ZodLazy,ZodLiteral:ZodLiteral,ZodEnum:ZodEnum,ZodNativeEnum:ZodNativeEnum,ZodPromise:ZodPromise,ZodEffects:ZodEffects,ZodTransformer:ZodEffects,ZodOptional:ZodOptional,ZodNullable:ZodNullable,ZodDefault:ZodDefault,ZodCatch:ZodCatch,ZodNaN:ZodNaN,BRAND:m,ZodBranded:ZodBranded,ZodPipeline:ZodPipeline,ZodReadonly:ZodReadonly,custom:custom,Schema:ZodType,ZodSchema:ZodType,late:g,get ZodFirstPartyTypeKind(){return ee},coerce:{string:e=>ZodString.create({...e,coerce:!0}),number:e=>ZodNumber.create({...e,coerce:!0}),boolean:e=>ZodBoolean.create({...e,coerce:!0}),bigint:e=>ZodBigInt.create({...e,coerce:!0}),date:e=>ZodDate.create({...e,coerce:!0})},any:O,array:D,bigint:S,boolean:P,date:T,discriminatedUnion:R,effect:W,enum:V,function:z,instanceof:(e,t={message:`Input not instance of ${e.name}`})=>custom(t=>t instanceof e,t),intersection:I,lazy:Z,literal:H,map:B,nan:y,nativeEnum:U,never:E,null:A,nullable:q,number:b,object:M,oboolean:()=>P().optional(),onumber:()=>b().optional(),optional:K,ostring:()=>v().optional(),pipeline:$,preprocess:X,promise:G,record:L,set:F,strictObject:C,string:v,symbol:x,transformer:W,tuple:N,undefined:_,union:j,unknown:w,void:k,NEVER:s,ZodIssueCode:o,quotelessJson:e=>{let t=JSON.stringify(e,null,2);return t.replace(/"([^"]+)":/g,"$1:")},ZodError:ZodError})}};