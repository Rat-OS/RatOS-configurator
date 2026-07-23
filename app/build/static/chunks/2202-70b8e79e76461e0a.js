(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2202],{17940:function(e,t,n){"use strict";n.d(t,{H:function(){return assertNotComplex}});var r=n(81284);/**
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
 */function assertNotComplex(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&r.D5U.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}},71928:function(e,t,n){"use strict";n.d(t,{j:function(){return concatImpl}});var r=n(81284);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concatImpl(e,t,n,a){let i=r.D5U.getArrayFromDType(n,r.D5U.sizeFromShape(t));if(a&&"string"!==n){let t=0;e.forEach(e=>{let n=r.D5U.sizeFromShape(e.shape);i.set(e.vals,t),t+=n})}else{let a=0;e.forEach(e=>{let s="string"===n?r.backend_util.fromUint8ToStringArray(e.vals):e.vals,o=0;for(let n=0;n<e.shape[0];++n){let r=n*t[1]+a;for(let t=0;t<e.shape[1];++t)i[r+t]=s[o++]}a+=e.shape[1]})}return i}},5350:function(e,t,n){"use strict";n.d(t,{b:function(){return rangeImpl}});var r=n(81284);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rangeImpl(e,t,n,a){let i=e<t&&n<0,s=t<e&&n>1;if(e===t||i||s)return r.D5U.makeZerosTypedArray(0,a);let o=Math.abs(Math.ceil((t-e)/n)),u=r.D5U.makeZerosTypedArray(o,a);t<e&&1===n&&(n=-1),u[0]=e;for(let e=1;e<u.length;e++)u[e]=u[e-1]+n;return u}},880:function(e,t,n){"use strict";n.d(t,{rT:function(){return sliceImpl}});var r=n(81284);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sliceImpl(e,t,n,a,i){let s=r.kuN.isSliceContinous(a,t,n),o=r.D5U.sizeFromShape(n),u=r.D5U.computeStrides(a);if(s){let n=r.kuN.computeFlatOffset(t,u);return"string"===i?e.slice(n,n+o):e.subarray(n,n+o)}let l="string"===i?r.backend_util.fromUint8ToStringArray(e):e,d=(0,r.f3b)(a,i,l),c=(0,r.f3b)(n,i);for(let e=0;e<c.size;++e){let n=c.indexToLoc(e),r=n.map((e,n)=>e+t[n]);c.set(d.get(...r),...n)}return"string"===i?r.backend_util.fromStringArrayToUint8(c.values):c.values}n(17940),r.p2w},60573:function(e,t,n){"use strict";n.d(t,{A:function(){return stringNGramsImpl}});var r=n(81284);/**
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
 */let StringNGramsOp=class StringNGramsOp{constructor(e,t,n,a,i,s){this.separator=r.D5U.encodeString(e),this.nGramWidths=t,this.leftPad=r.D5U.encodeString(n),this.rightPad=r.D5U.encodeString(a),this.padWidth=i,this.preserveShort=s}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let n=this.getPadWidth(t);return Math.max(0,e+2*n-t+1)}createNGrams(e,t,n,r,a,i){for(let s=0;s<a;++s){let o;let u=this.getPadWidth(i),l=Math.max(0,u-s),d=Math.max(0,u-(a-(s+1))),c=i-(l+d),p=t+(l>0?0:s-u);o=0+l*this.leftPad.length;for(let t=0;t<c;++t)o+=e[p+t].length;o+=d*this.rightPad.length;let f=l+d+c-1;o+=f*this.separator.length,n[r+s]=new Uint8Array(o);let h=n[r+s],m=0,appendToNGram=e=>e.forEach(e=>h[m++]=e);for(let e=0;e<l;++e)appendToNGram(this.leftPad),appendToNGram(this.separator);for(let t=0;t<c-1;++t)appendToNGram(e[p+t]),appendToNGram(this.separator);if(c>0){appendToNGram(e[p+c-1]);for(let e=0;e<d;++e)appendToNGram(this.separator),appendToNGram(this.rightPad)}else{for(let e=0;e<d-1;++e)appendToNGram(this.rightPad),appendToNGram(this.separator);appendToNGram(this.rightPad)}}}compute(e,t){let n=e.length,a=t.length;if(a>0){let e=t[0];if(0!==e)throw Error(`First split value must be 0, got ${e}`);for(let r=1;r<a;++r){let a=t[r]>=e;if(!(a=a&&t[r]<=n))throw Error(`Invalid split value ${t[r]}, must be in [${e}, ${n}]`);e=t[r]}if(e!==n)throw Error(`Last split value must be data size. Expected ${n}, got ${e}`)}let i=a-1,s=r.D5U.getArrayFromDType("int32",a);if(0===n||0===a){let e=Array(n);for(let e=0;e<=i;++e)s[e]=0;return[e,s]}s[0]=0;for(let e=1;e<=i;++e){let n=t[e]-t[e-1],r=0;this.nGramWidths.forEach(e=>{r+=this.getNumNGrams(n,e)}),this.preserveShort&&n>0&&0===r&&(r=1),s[e]=s[e-1]+r}let o=Array(s[i]);for(let n=0;n<i;++n){let r=t[n],a=s[n];if(this.nGramWidths.forEach(i=>{let s=t[n+1]-t[n],u=this.getNumNGrams(s,i);this.createNGrams(e,r,o,a,u,i),a+=u}),this.preserveShort&&a===s[n]){let i=t[n+1]-t[n];if(0===i)continue;let s=i+2*this.padWidth;this.createNGrams(e,r,o,a,1,s)}}return[o,s]}};function stringNGramsImpl(e,t,n,r,a,i,s,o){return new StringNGramsOp(n,r,a,i,s,o).compute(e,t)}},70913:function(e,t,n){"use strict";n.d(t,{Q:function(){return stringSplitImpl}});var r=n(81284);function stringSplitImpl(e,t,n){let a=e.length,i=[],s=0,o=0,u=Array(a);for(let r=0;r<a;++r){let a=i.length;!/**
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
 */function(e,t,n,r){if(!e.length)return;if(0===t.length){for(let t=0;t<e.length;++t)r.push(e.subarray(t,t+1));return}if(1===t.length){let a=t[0],i=e.indexOf(a);for(;-1!==i;){let t=e.subarray(0,i);n&&0===t.length||r.push(t),i=(e=e.subarray(i+1)).indexOf(a)}n&&0===e.length||r.push(e);return}let a=0;for(let i=0;i<e.length+1;i++)if(i===e.length||-1!==t.indexOf(e[i])){let t=e.subarray(a,i);n&&0===t.length||r.push(t),a=i+1}}(e[r],t,n,i);let l=i.length-a;u[r]=l,s+=l,o=Math.max(o,l)}let l=r.D5U.getArrayFromDType("int32",2*s),d=Array(s),c=[a,o],p=0;for(let e=0;e<a;++e)for(let t=0;t<u[e];++t)l[2*p]=e,l[2*p+1]=t,d[p]=i[p],++p;return[l,d,c]}},62322:function(e,t,n){"use strict";n.d(t,{h:function(){return stringToHashBucketFastImpl}});var r=n(81284);/**
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
 */function stringToHashBucketFastImpl(e,t){let n=r.D5U.getArrayFromDType("int32",e.length);for(let a=0;a<e.length;++a)n[a]=r.D5U.fingerPrint64(e[a]).modulo(t).getLowBitsUnsigned();return n}},71777:function(e,t,n){"use strict";n.d(t,{S:function(){return uniqueImpl}});var r=n(81284);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uniqueImpl(e,t,n,a){let i=r.D5U.parseAxisParam(t,n)[0],s=[1,n[0],1];for(let e=0;e<i;e++)s[0]*=n[e];s[1]=n[i];for(let e=i+1;e<n.length;e++)s[2]*=n[e];let o=new Map,u=new Int32Array(n[i]),l=new r.YDk(s,a,e),d=[],c=1===s[0]&&1===s[2];for(let t=0;t<n[i];t++){let n;if(c)n=e[t].toString();else{let e=[];for(let n=0;n<s[0];n++)for(let r=0;r<s[2];r++)e.push(l.get(n,t,r));n=e.join(",")}let r=o.get(n);if(null!=r)u[t]=r;else{let e=o.size;o.set(n,e),u[t]=e,d.push(t)}}let p=s.slice();p[1]=o.size;let f=new r.YDk(p,a);d.forEach((e,t)=>{for(let n=0;n<s[0];n++)for(let r=0;r<s[2];r++)f.set(l.get(n,e,r),n,t,r)});let h=n.slice();return h[i]=p[1],{outputValues:f.values,outputShape:h,indices:u}}},64526:function(e,t,n){"use strict";let r,a,i,s,o,u,l,d,c,p,f,h,m,g,b,y,_,w,I,k,S,v,A,M,B,x,N,D,T,R,F,O,U,P,C,$,L,W,G,z,V,H,j,q,K,Y,Z,X,J,Q,ee,et,en,er,ea,ei,es,eo,eu,el,ed,ec,ep,ef,eh,em,eg,eb,ey,e_,ew,eI,ek,eS,ev,eA,eE;n.d(t,{_1:function(){return setWasmPaths}});var eM,eB,ex,eN,eD,eT,eR,eF,eO=n(81284);(eM=eD||(eD={}))[eM.float32=0]="float32",eM[eM.int32=1]="int32",eM[eM.bool=2]="bool",eM[eM.string=3]="string",eM[eM.complex64=4]="complex64",(eB=eT||(eT={}))[eB.linear=0]="linear",eB[eB.relu=1]="relu",eB[eB.relu6=2]="relu6",eB[eB.prelu=3]="prelu",eB[eB.leakyrelu=4]="leakyrelu",eB[eB.sigmoid=5]="sigmoid",eB[eB.elu=6]="elu";let eU={kernelName:eO.usg,backendName:"wasm",setupFunc:function(e){r=e.wasm.cwrap(eO.usg,null,["number","array","number","number","array","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:a}=e,{a:i,b:s,bias:o,preluActivationWeights:u}=t;if("float32"!==i.dtype||"float32"!==s.dtype)throw Error("_FusedMatMul for non non-float32 tensors not yet supported.");let{transposeA:l,transposeB:d,activation:c,leakyreluAlpha:p}=a,f=n.dataIdMap.get(i.dataId).id,h=n.dataIdMap.get(s.dataId).id,m=0;if(null!=o){let e=n.dataIdMap.get(o.dataId);if(1!==e.shape.length)throw Error(`_FusedMatMul only supports rank-1 bias but got rank ${e.shape.length}.`);m=e.id}let g=null==u?0:n.dataIdMap.get(u.dataId).id,b=eT[c];if(null==b)throw Error(`${c} activation not yet supported for FusedConv2D in the wasm backend.`);let y=l?i.shape[2]:i.shape[1],_=d?s.shape[1]:s.shape[2],w=eO.Jyw.assertAndGetBroadcastShape(i.shape.slice(0,-2),s.shape.slice(0,-2)),I=n.makeOutput([...w,y,_],i.dtype),k=n.dataIdMap.get(I.dataId).id,S=new Uint8Array(new Int32Array(i.shape).buffer),v=new Uint8Array(new Int32Array(s.shape).buffer);return r(f,S,i.shape.length,h,v,s.shape.length,l,d,b,m,g,p||0,k),I}};/**
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
 */function createUnaryKernelConfig(e,t){let n;return{kernelName:e,backendName:"wasm",setupFunc:function(t){n=t.wasm.cwrap(e,null,["number","number","number"])},kernelFunc:function(e){let{backend:r,inputs:{x:a}}=e,i=r.dataIdMap.get(a.dataId).id,s=r.makeOutput(a.shape,t||a.dtype),o=r.dataIdMap.get(s.dataId).id;return 0===eO.D5U.sizeFromShape(s.shape)||n(i,eD[a.dtype],o),s}}}/**
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
 */let eP=createUnaryKernelConfig(eO.SYM),eC=createUnaryKernelConfig(eO.VGw),e$=createUnaryKernelConfig(eO.SpW);/**
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
 */function createBinaryKernelConfig(e,t,n){let r;return{kernelName:e,backendName:"wasm",setupFunc:function(t){r=t.wasm.cwrap(e,null,["number","array","number","number","array","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:a}=e,{a:i,b:s}=a,o=t.dataIdMap.get(i.dataId).id,u=t.dataIdMap.get(s.dataId).id,l=null!=n?n:i.dtype,d=eO.backend_util.assertAndGetBroadcastShape(i.shape,s.shape),c=t.makeOutput(d,l);if(0===eO.D5U.sizeFromShape(d))return c;let p=new Uint8Array(new Int32Array(i.shape).buffer),f=new Uint8Array(new Int32Array(s.shape).buffer),h=t.dataIdMap.get(c.dataId).id;return r(o,p,i.shape.length,u,f,s.shape.length,eD[i.dtype],h),c}}}let eL=createBinaryKernelConfig(eO.mm_,!0),eW={kernelName:eO.Xze,backendName:"wasm",setupFunc:function(e){a=e.wasm.cwrap(eO.Xze,null,["array","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n}=e,r=n.makeOutput(t[0].shape,t[0].dtype);if(0===eO.D5U.sizeFromShape(r.shape))return r;let i=t.map(e=>n.dataIdMap.get(e.dataId).id),s=new Uint8Array(new Int32Array(i).buffer),o=n.dataIdMap.get(r.dataId).id;return a(s,i.length,eD[r.dtype],o),r}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function identity(e){let{inputs:{x:t},backend:n}=e;if("string"===t.dtype)return(0,eO.XeE)(n.readSync(t.dataId),t.shape,t.dtype);let r=n.makeOutput(t.shape,t.dtype),a=n.typedArrayFromHeap(t),i=n.typedArrayFromHeap(r);return i.set(a),r}let eG={kernelName:eO.iJz,backendName:"wasm",kernelFunc:identity};function transpose(e){let{inputs:t,backend:n,attrs:r}=e,[a,s]=function(e,t){let n=[],r=[];for(let a=0;a<e.length;++a)1!==e[a]&&n.push(e[a]),1!==e[t[a]]&&r.push(t[a]);for(let e=0;e<r.length;++e){let t=-1;for(let n=0;n<r.length;++n)r[n]>=e&&(-1===t||r[t]>r[n])&&(t=n);r[t]=e}return[n,r]}(t.x.shape,r.perm),o=!0;for(let e=0;e<s.length;e++)s[e]!==e&&(o=!1);let u=function(e,t){let n=Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];return n}(t.x.shape,r.perm),l={dataId:t.x.dataId,shape:a,dtype:t.x.dtype};if(o){let e=identity({inputs:t,backend:n});return e.shape=u,e}let d=n.makeOutput(u,l.dtype),c=n.dataIdMap.get(l.dataId).id,p=n.dataIdMap.get(d.dataId).id,f=new Uint8Array(new Int32Array(s).buffer),h=new Uint8Array(new Int32Array(l.shape).buffer);return i(c,h,l.shape.length,eD[l.dtype],p,f,s.length),d}let ez={kernelName:eO.G3Y,backendName:"wasm",kernelFunc:transpose,setupFunc:function(e){i=e.wasm.cwrap(eO.G3Y,null,["number","array","number","number","number","array","number"])}};/**
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
 */function permuteAxesAndTranspose(e,t,n){let r=e.shape,a=e.shape.length,i=eO.D5U.parseAxisParam(t,r),s=i,o=eO.backend_util.getAxesPermutation(s,a),u=null,l=!1;if(null!=o){let t=Array(a);for(let e=0;e<t.length;e++)t[e]=r[o[e]];s=eO.backend_util.getInnerMostAxes(s.length,a),u=transpose({inputs:{x:e},attrs:{perm:o},backend:n});let i=n.dataIdMap.get(e.dataId).id,d=n.dataIdMap.get(u.dataId).id;d!==i&&(l=!0)}return{transposed:u,originalAxes:i,axes:s,inputWasTransposed:l}}let eV={kernelName:eO.oT6,backendName:"wasm",setupFunc:function(e){s=e.wasm.cwrap(eO.oT6,null,["number, number, number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:o}=n,u=t.dataIdMap.get(o.dataId).id,l=u,d=o,{transposed:c,axes:p,originalAxes:f,inputWasTransposed:h}=permuteAxesAndTranspose(o,a,t);if(h){let e=t.dataIdMap.get(c.dataId).id;d=c,l=e}let m=d.shape.length;eO.backend_util.assertAxesAreInnerMostDims("all",p,m);let[g,b]=eO.backend_util.computeOutAndReduceShapes(d.shape,p),y=eO.D5U.sizeFromShape(b),_=t.makeOutput(g,o.dtype);if(0!==eO.D5U.sizeFromShape(d.shape)){let e=t.dataIdMap.get(_.dataId).id;s(l,y,e)}if(h&&t.disposeData(c.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(_.shape,f);_.shape=e}return _}},eH={kernelName:eO.IKK,backendName:"wasm",setupFunc:function(e){o=e.wasm.cwrap(eO.IKK,null,["number, number, number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:s}=n,u=t.dataIdMap.get(s.dataId).id,l=u,d=s,{transposed:c,axes:p,originalAxes:f,inputWasTransposed:h}=permuteAxesAndTranspose(s,a,t);if(h){let e=t.dataIdMap.get(c.dataId).id;d=c,l=e}let m=d.shape.length;eO.backend_util.assertAxesAreInnerMostDims("any",p,m);let[g,b]=eO.backend_util.computeOutAndReduceShapes(d.shape,p),y=eO.D5U.sizeFromShape(b),_=t.makeOutput(g,s.dtype);if(0!==eO.D5U.sizeFromShape(d.shape)){let e=t.dataIdMap.get(_.dataId).id;o(l,y,e)}if(h&&t.disposeData(c.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(_.shape,f);_.shape=e}return _}};/**
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
 */function createArgMinMaxKernelConfig(e){let t;return{kernelName:e,backendName:"wasm",setupFunc:function(n){t=n.wasm.cwrap(e,null,["number","number","number","number","number"])},kernelFunc:function(e){let{backend:n,inputs:r,attrs:a}=e,{axis:i}=a,{x:s}=r,o=n.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,inputWasTransposed:p}=permuteAxesAndTranspose(s,i,n);if(p){let e=n.dataIdMap.get(d.dataId).id;e!==o&&(l=d,u=e)}let f=l.shape.slice(0,-1),h=n.makeOutput(f,"int32"),m=n.dataIdMap.get(h.dataId).id,g=eO.D5U.sizeFromShape(h.shape),b=l.shape[c[0]];return t(u,eD[l.dtype],g,b,m),p&&n.disposeData(d.dataId),h}}}/**
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
 */let ej=createArgMinMaxKernelConfig(eO.sJF),eq=createArgMinMaxKernelConfig(eO.aJk),eK=createUnaryKernelConfig(eO.M2y),eY=createUnaryKernelConfig(eO.qw7),eZ=createUnaryKernelConfig(eO.jMg),eX=createBinaryKernelConfig(eO.QCc,!1),eJ=createUnaryKernelConfig(eO.Oyi),eQ={kernelName:eO.JhU,backendName:"wasm",setupFunc:function(e){u=e.wasm.cwrap(eO.JhU,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,a=t.x,i=r.dataIdMap.get(a.dataId).id,{filterSize:s,strides:o,pad:l,dimRoundingMode:d}=n,c=eO.backend_util.computePool2DInfo(a.shape,s,o,1,l,d),p=c.filterHeight,f=c.filterWidth,h=c.padInfo.top,m=c.padInfo.right,g=c.padInfo.bottom,b=c.padInfo.left,y=c.strideHeight,_=c.strideWidth,w=c.inChannels;if("channelsLast"!==c.dataFormat)throw Error(`wasm backend does not support dataFormat:'${c.dataFormat}'. Please use 'channelsLast'.`);if(1!==c.dilationWidth||1!==c.dilationHeight)throw Error(`was backend only supports average pooling with dilation = [1, 1], got [${c.dilationHeight}, ${c.dilationWidth}].`);let I=r.makeOutput(c.outShape,"float32"),k=r.dataIdMap.get(I.dataId).id;return u(i,a.shape[0],a.shape[1],a.shape[2],p,f,h,m,g,b,y,_,w,k),I}},e0={kernelName:eO._k9,backendName:"wasm",setupFunc:function(e){l=e.wasm.cwrap("AvgPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{filterSize:i,strides:s,pad:o,dimRoundingMode:u,dataFormat:d}=r,c=eO.backend_util.computePool3DInfo(a.shape,i,s,1,o,u,d),p=n.makeOutput(c.outShape,a.dtype);return l(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left),p}},e1={kernelName:eO.IMb,backendName:"wasm",setupFunc:function(e){d=e.wasm.cwrap("AvgPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{dy:a,input:i}=t,{filterSize:s,strides:o,pad:u,dimRoundingMode:l}=r,c=eO.backend_util.computePool3DInfo(i.shape,s,o,1,u,l),p=n.makeOutput(i.shape,i.dtype);return d(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left,c.filterDepth,c.filterHeight,c.filterWidth),p}},e2={kernelName:eO.ROF,backendName:"wasm",setupFunc:function(e){c=e.wasm.cwrap("AvgPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{dy:a,input:i}=t,{filterSize:s,strides:o,pad:u}=r,l=eO.backend_util.computePool2DInfo(i.shape,s,o,1,u),d=n.makeOutput(i.shape,i.dtype);return c(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(d.dataId).id,l.batchSize,l.inChannels,l.inHeight,l.inWidth,l.outHeight,l.outWidth,l.strideHeight,l.strideWidth,l.dilationHeight,l.dilationWidth,l.effectiveFilterHeight,l.effectiveFilterWidth,l.padInfo.top,l.padInfo.left,l.filterHeight,l.filterWidth),d}};/**
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
 */function reshape(e){let{inputs:t,attrs:n}=e,{x:r}=t,{shape:a}=n,i=eO.D5U.sizeFromShape(r.shape),s=eO.D5U.inferFromImplicitShape(a,i);return eO.D5U.assert(i===eO.D5U.sizeFromShape(s),()=>`new shape: ${s}, old shape: ${r.shape}. New shape and old shape must have the same number of elements.`),e.backend.incRef(r.dataId),{dataId:r.dataId,shape:s,dtype:r.dtype}}let e3={kernelName:eO.HZH,backendName:"wasm",kernelFunc:reshape},e6={kernelName:eO.XLW,backendName:"wasm",setupFunc:function(e){p=e.wasm.cwrap(eO.XLW,null,["number","array","number","number","array","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{a,b:i}=t,{transposeA:s,transposeB:o}=r;if("float32"!==a.dtype||"float32"!==i.dtype)throw Error("BatchMatMul for non non-float32 tensors not yet supported.");let u=a.shape.length,l=i.shape.length,d=s?a.shape[u-2]:a.shape[u-1],c=o?i.shape[l-1]:i.shape[l-2],f=s?a.shape[u-1]:a.shape[u-2],h=o?i.shape[l-2]:i.shape[l-1],m=a.shape.slice(0,-2),g=i.shape.slice(0,-2),b=eO.D5U.sizeFromShape(m),y=eO.D5U.sizeFromShape(g),_=eO.Jyw.assertAndGetBroadcastShape(a.shape.slice(0,-2),i.shape.slice(0,-2)),w=_.concat([f,h]);eO.D5U.assert(d===c,()=>`Error in matMul: inner shapes (${d}) and (${c}) of Tensors with shapes ${a.shape} and ${i.shape} and transposeA=${s} and transposeB=${o} must match.`);let I=s?[b,d,f]:[b,f,d],k=o?[y,h,c]:[y,c,h],S=reshape({inputs:{x:a},backend:n,attrs:{shape:I}}),v=reshape({inputs:{x:i},backend:n,attrs:{shape:k}}),A=n.dataIdMap.get(S.dataId).id,M=n.dataIdMap.get(v.dataId).id,B=s?S.shape[2]:S.shape[1],x=o?v.shape[1]:v.shape[2],N=Math.max(b,y),D=n.makeOutput([N,B,x],S.dtype),T=n.dataIdMap.get(D.dataId).id,R=new Uint8Array(new Int32Array(S.shape).buffer),F=new Uint8Array(new Int32Array(v.shape).buffer);return p(A,R,S.shape.length,M,F,v.shape.length,s,o,T),n.disposeData(S.dataId),n.disposeData(v.dataId),D.shape=w,D}};var e8=n(880);/**
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
 */function slice(e){let{inputs:{x:t},attrs:{begin:n,size:r},backend:a}=e,[i,s]=eO.kuN.parseSliceParams(t,n,r),o=eO.kuN.isSliceContinous(t.shape,i,s),u=a.readSync(t.dataId),l=a.makeOutput(s,t.dtype),d=eO.D5U.computeStrides(t.shape),c=a.dataIdMap.get(l.dataId);if(o){let e=eO.kuN.computeFlatOffset(i,d);if("string"===t.dtype)c.stringBytes=u.slice(e,e+eO.D5U.sizeFromShape(s));else{let t=a.typedArrayFromHeap(l);t.set(u.subarray(e,e+eO.D5U.sizeFromShape(s)))}return l}if("string"===t.dtype){let e=(0,e8.rT)(u,i,s,t.shape,t.dtype);return c.stringBytes=e,l}let p=a.typedArrayFromHeap(l),f=t.shape.length;if(2===f)!function(e,t,n,r,a){let i=0,s=r[0],o=r[1],u=s+a[0];for(let r=s;r<u;r++){let s=r*t+o;n.set(e.subarray(s,s+a[1]),i),i+=a[1]}}(u,d[0],p,i,s);else if(3===f)!function(e,t,n,r,a,i){let s=0,o=a[0],u=a[1],l=a[2],d=o+i[0],c=u+i[1];for(let a=o;a<d;a++)for(let o=u;o<c;o++){let u=a*t+o*n+l;r.set(e.subarray(u,u+i[2]),s),s+=i[2]}}(u,d[0],d[1],p,i,s);else if(4===f)!function(e,t,n,r,a,i,s){let o=0,u=i[0],l=i[1],d=i[2],c=u+s[0],p=l+s[1],f=d+s[2],h=i[3];for(let i=u;i<c;i++)for(let u=l;u<p;u++)for(let l=d;l<f;l++){let d=i*t+u*n+l*r+h;a.set(e.subarray(d,d+s[3]),o),o+=s[3]}}(u,d[0],d[1],d[2],p,i,s);else{let e=(0,e8.rT)(u,i,s,t.shape,t.dtype);p.set(e)}return l}let e5={kernelName:eO.p2w,backendName:"wasm",kernelFunc:slice},e4={kernelName:eO.zws,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{blockShape:i,crops:s}=r,o=i.reduce((e,t)=>e*t),u=eO.backend_util.getReshaped(a.shape,i,o),l=eO.backend_util.getPermuted(u.length,i.length),d=eO.backend_util.getReshapedPermuted(a.shape,i,o),c=eO.backend_util.getSliceBeginCoords(s,i.length),p=eO.backend_util.getSliceSize(d,s,i.length),f=reshape({inputs:{x:a},backend:n,attrs:{shape:u}}),h=transpose({inputs:{x:f},backend:n,attrs:{perm:l}}),m=reshape({inputs:{x:h},backend:n,attrs:{shape:d}}),g=slice({inputs:{x:m},backend:n,attrs:{begin:c,size:p}});return n.disposeData(f.dataId),n.disposeData(h.dataId),n.disposeData(m.dataId),g}},e7={kernelName:eO.zvY,backendName:"wasm",setupFunc:function(e){f=e.wasm.cwrap(eO.zvY,null,["number","number","boolean","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{x:a,weights:i}=n,{size:s}=r,o=0!==i.shape.reduce((e,t)=>e*t,1),u=1===a.shape.length?[s]:[a.shape[0],s],l=t.makeOutput(u,i.dtype);function tensorId(e){return t.dataIdMap.get(e.dataId).id}return f(tensorId(a),s,o,tensorId(i),eD[i.dtype],tensorId(l)),l}},e9=createBinaryKernelConfig(eO.hCO,!0),te={kernelName:eO.eEB,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:n}=e,{s0:r,s1:a}=t,i=n.typedArrayFromHeap(r),s=n.typedArrayFromHeap(a),o=eO.backend_util.assertAndGetBroadcastShape(Array.from(i),Array.from(s));return n.makeOutput([o.length],"int32",void 0,new Int32Array(o))}};/**
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
 */function cast(e){let{inputs:{x:t},attrs:{dtype:n},backend:r}=e,a=r.makeOutput(t.shape,n),i=r.typedArrayFromHeap(t),s=r.typedArrayFromHeap(a);return s.set(i),a}let tt={kernelName:eO.RFZ,backendName:"wasm",kernelFunc:cast},tn=createUnaryKernelConfig(eO.gJX),tr={kernelName:eO.xnO,backendName:"wasm",setupFunc:function(e){h=e.wasm.cwrap(eO.xnO,null,["number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{clipValueMin:i,clipValueMax:s}=r,o=n.dataIdMap.get(a.dataId).id,u=n.makeOutput(a.shape,a.dtype),l=n.dataIdMap.get(u.dataId).id;return h(o,i,s,l),u}};var ta=n(71928);/**
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
 */function concat(e){let{inputs:t,backend:n}=e,r=eO.D5U.parseAxisParam(e.attrs.axis,t[0].shape)[0],a=t.map(e=>e.shape);eO.backend_util.assertParamsConsistent(a,r);let i=eO.backend_util.computeOutShape(t.map(e=>e.shape),r),s=t.filter(e=>eO.D5U.sizeFromShape(e.shape)>0);if(1===s.length)return identity({inputs:{x:s[0]},backend:n});let o=n.makeOutput(i,t[0].dtype);if(0===eO.D5U.sizeFromShape(i))return o;if("string"===s[0].dtype){let e=s.map(e=>{let t=eO.D5U.sizeFromShape(e.shape.slice(r));return reshape({inputs:{x:e},backend:n,attrs:{shape:[-1,t]}})}),a=e.map(e=>({vals:n.readSync(e.dataId),shape:e.shape}));i=eO.backend_util.computeOutShape(e.map(e=>e.shape),1);let u=1===e[0].shape[0],l=(0,ta.j)(a,i,t[0].dtype,u),d=eO.backend_util.computeOutShape(s.map(e=>e.shape),r);o.shape=d;let c=n.dataIdMap.get(o.dataId);return c.stringBytes=eO.backend_util.fromStringArrayToUint8(l),e.forEach(e=>n.disposeData(e.dataId)),o}let u=eO.D5U.sizeFromShape(s[0].shape.slice(0,r)),l=0,d=s.map(e=>{let t=eO.D5U.sizeFromShape(e.shape.slice(r));return l+=t,t}),c=s.map(e=>n.typedArrayFromHeap(e)),p=n.typedArrayFromHeap(o);for(let e=0;e<u;e++){let t=e*l;for(let n=0;n<c.length;n++){let r=d[n],a=e*r,i=c[n].subarray(a,a+r);p.set(i,t),t+=r}}return o}let ti={kernelName:eO.Eh3,backendName:"wasm",kernelFunc:concat},ts={kernelName:eO.mhS,backendName:"wasm",setupFunc:function(e){m=e.wasm.cwrap(eO.mhS,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,{x:a,filter:i}=t,s=r.dataIdMap.get(a.dataId).id,o=r.dataIdMap.get(i.dataId).id,{strides:u,dilations:l,pad:d,dimRoundingMode:c,dataFormat:p}=n,f=eO.backend_util.convertConv2DDataFormat(p),h=eO.backend_util.computeConv2DInfo(a.shape,i.shape,u,l,d,c,!1,f),g=h.filterHeight,b=h.filterWidth,y=h.padInfo.top,_=h.padInfo.right,w=h.padInfo.bottom,I=h.padInfo.left,k=h.dilationHeight,S=h.dilationWidth,v=h.strideHeight,A=h.strideWidth,M=h.inChannels,B=h.outChannels,x="SAME"===h.padInfo.type?1:0;if("channelsLast"!==h.dataFormat)throw Error(`wasm backend Conv2D does not support dataFormat:'${h.dataFormat}'. Please use 'channelsLast'.`);let N=r.makeOutput(h.outShape,"float32"),D=r.dataIdMap.get(N.dataId).id;return m(s,a.shape[0],a.shape[1],a.shape[2],o,g,b,y,_,w,I,x,k,S,v,A,M,B,D),N}},to={kernelName:eO.wm,backendName:"wasm",setupFunc:function(e){g=e.wasm.cwrap(eO.wm,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{dy:a,filter:i}=n,{strides:s,pad:o,dataFormat:u,dimRoundingMode:l,inputShape:d}=r,c=eO.backend_util.convertConv2DDataFormat(u),p=eO.backend_util.computeConv2DInfo(d,i.shape,s,1,o,l,!1,c),{batchSize:f,filterHeight:h,filterWidth:m,inChannels:b,inHeight:y,inWidth:_,outChannels:w,outHeight:I,outWidth:k,strideHeight:S,strideWidth:v}=p,A=h-1-p.padInfo.top,M=m-1-p.padInfo.left,B="channelsLast"===p.dataFormat,x=eO.D5U.computeStrides(p.inShape),N=eO.D5U.computeStrides(a.shape),[D,T,R]=eO.D5U.computeStrides(i.shape),F=x[0],O=B?x[1]:x[2],U=B?x[2]:1,P=B?1:x[1],C=N[0],$=B?N[1]:N[2],L=B?N[2]:1,W=B?1:N[1],G=t.makeOutput(p.inShape,"float32"),z=t.dataIdMap.get(G.dataId).id,V=t.dataIdMap.get(a.dataId).id,H=t.dataIdMap.get(i.dataId).id;return g(V,H,f,h,m,y,_,b,I,k,w,S,v,A,M,D,T,R,F,O,U,P,C,$,L,W,z),G}},tu={kernelName:eO.x12,backendName:"wasm",setupFunc:function(e){b=e.wasm.cwrap(eO.x12,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,filter:i}=t,{strides:s,pad:o,dilations:u}=r;if("float32"!==a.dtype)throw Error(`Tensor x must have dtype float32, got ${a.dtype}`);if("float32"!==i.dtype)throw Error(`Tensor filter must have dtype float32, got ${i.dtype}`);let l=eO.backend_util.computeConv3DInfo(a.shape,i.shape,s,u,o),d=n.makeOutput(l.outShape,a.dtype);return b(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),d}},tl={kernelName:eO.o2y,backendName:"wasm",setupFunc:function(e){y=e.wasm.cwrap(eO.o2y,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,dy:i}=t,{strides:s,pad:o,filterShape:u}=r;if("float32"!==a.dtype)throw Error(`Tensor dy must have dtype float32, got ${a.dtype}`);if("float32"!==i.dtype)throw Error(`Tensor filter must have dtype float32, got ${i.dtype}`);let l=eO.backend_util.computeConv3DInfo(a.shape,u,s,1,o),d=n.makeOutput(l.filterShape,i.dtype);return y(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),d}},td={kernelName:eO.ik2,backendName:"wasm",setupFunc:function(e){_=e.wasm.cwrap(eO.ik2,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{dy:a,filter:i}=t,{pad:s,strides:o,inputShape:u}=r;if("float32"!==a.dtype)throw Error(`Tensor dy must have dtype float32, got ${a.dtype}`);if("float32"!==i.dtype)throw Error(`Tensor filter must have dtype float32, got ${i.dtype}`);let l=eO.backend_util.computeConv3DInfo(u,i.shape,o,1,s),d=n.makeOutput(l.inShape,a.dtype);return _(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(d.dataId).id,l.batchSize,l.inDepth,l.inHeight,l.inWidth,l.inChannels,l.outDepth,l.outHeight,l.outWidth,l.outChannels,l.strideDepth,l.strideHeight,l.strideWidth,l.dilationDepth,l.dilationHeight,l.dilationWidth,l.filterDepth,l.filterHeight,l.filterWidth,l.padInfo.front,l.padInfo.top,l.padInfo.left),d}},tc=createUnaryKernelConfig(eO.mc4),tp=createUnaryKernelConfig(eO.TR1);(ex=eR||(eR={}))[ex.bilinear=0]="bilinear",ex[ex.nearest=1]="nearest";let tf={kernelName:eO.VcC,backendName:"wasm",setupFunc:function(e){w=e.wasm.cwrap(eO.VcC,null,["number","number","number","number","array","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r,attrs:a}=e,{method:i,extrapolationValue:s,cropSize:o}=a,{image:u,boxes:l,boxInd:d}=r,c=l.shape[0],[p,f]=o,h=[c,p,f,u.shape[3]],m=n.dataIdMap.get(u.dataId);"float32"!==u.dtype&&(t=cast({backend:n,inputs:{x:u},attrs:{dtype:"float32"}}),m=n.dataIdMap.get(t.dataId));let g=m.id,b=n.dataIdMap.get(l.dataId).id,y=n.dataIdMap.get(d.dataId).id,_=n.makeOutput(h,"float32"),I=n.dataIdMap.get(_.dataId).id,k=new Uint8Array(new Int32Array(u.shape).buffer);return w(g,b,y,c,k,p,f,eR[i],s,I),null!=t&&n.disposeData(t.dataId),_}},th={kernelName:eO.Byc,backendName:"wasm",setupFunc:function(e){I=e.wasm.cwrap(eO.Byc,null,["number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{axis:i,exclusive:s,reverse:o}=r,u=a.shape.length;eO.D5U.assert("float32"===a.dtype||"int32"===a.dtype,()=>`cumprod does not support ${a.dtype} tensors in the WASM backend`);let l=eO.backend_util.getAxesPermutation([i],u),d=a;null!==l&&(d=transpose({inputs:{x:a},attrs:{perm:l},backend:n}));let c=eO.backend_util.getInnerMostAxes(1,u)[0];eO.backend_util.assertAxesAreInnerMostDims("cumprod",[c],u);let p=n.makeOutput(d.shape,d.dtype),f=d.shape[c],h=n.dataIdMap.get(d.dataId).id,m=n.dataIdMap.get(p.dataId).id;I(h,s?1:0,o?1:0,f,m,eD[a.dtype]);let g=p;if(null!==l){let e=eO.backend_util.getUndoAxesPermutation(l);g=transpose({inputs:{x:p},attrs:{perm:e},backend:n}),n.disposeData(d.dataId),n.disposeData(p.dataId)}return g}},tm={kernelName:eO.iHb,backendName:"wasm",setupFunc:function(e){k=e.wasm.cwrap(eO.iHb,null,["number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{axis:i,exclusive:s,reverse:o}=r,u=a.shape.length;eO.D5U.assert("float32"===a.dtype||"int32"===a.dtype,()=>`cumsum does not support ${a.dtype} tensors in the WASM backend`);let l=eO.backend_util.getAxesPermutation([i],u),d=a;null!==l&&(d=transpose({inputs:{x:a},attrs:{perm:l},backend:n}));let c=eO.backend_util.getInnerMostAxes(1,u)[0];eO.backend_util.assertAxesAreInnerMostDims("cumsum",[c],u);let p=n.makeOutput(d.shape,d.dtype),f=d.shape[c],h=n.dataIdMap.get(d.dataId).id,m=n.dataIdMap.get(p.dataId).id;k(h,s?1:0,o?1:0,f,m,eD[a.dtype]);let g=p;if(null!==l){let e=eO.backend_util.getUndoAxesPermutation(l);g=transpose({inputs:{x:p},attrs:{perm:e},backend:n}),n.disposeData(d.dataId),n.disposeData(p.dataId)}return g}},tg={kernelName:eO.QRR,backendName:"wasm",setupFunc:function(e){S=e.wasm.cwrap("DenseBincount",null,["number","array","number","number","boolean","number","number","boolean","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{x:a,weights:i}=n,{size:s,binaryOutput:o}=r,u=0!==i.shape.reduce((e,t)=>e*t,1),l=1===a.shape.length?[s]:[a.shape[0],s],d=t.makeOutput(l,i.dtype);function tensorId(e){return t.dataIdMap.get(e.dataId).id}return S(tensorId(a),new Uint8Array(new Int32Array(a.shape).buffer),a.shape.length,s,u,tensorId(i),eD[i.dtype],o,tensorId(d)),d}},tb={kernelName:eO.T0n,backendName:"wasm",setupFunc:function(e){v=e.wasm.cwrap(eO.T0n,null,["number","number","number","array","number","array","array","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{x:a}=n,{blockSize:i,dataFormat:s}=r,o=a.shape[0],u="NHWC"===s?a.shape[1]:a.shape[2],l="NHWC"===s?a.shape[2]:a.shape[3],d="NHWC"===s?a.shape[3]:a.shape[1],c=u*i,p=l*i,f=d/(i*i),h="NHWC"===s?[o,c,p,f]:[o,f,c,p],m=t.makeOutput(h,"float32"),g=t.dataIdMap.get(a.dataId),b=g.id,y=new Uint8Array(new Int32Array(eO.D5U.computeStrides(a.shape)).buffer),_=new Uint8Array(new Int32Array(h).buffer),w=new Uint8Array(new Int32Array(eO.D5U.computeStrides(h)).buffer),I=t.dataIdMap.get(m.dataId).id;return v(b,i,"NHWC"===s?1:0,y,a.shape.length-1,_,w,h.length,I),m}},ty={kernelName:eO.cie,backendName:"wasm",setupFunc:function(e){A=e.wasm.cwrap(eO.cie,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,{x:a,filter:i}=t,s=r.dataIdMap.get(a.dataId).id,o=r.dataIdMap.get(i.dataId).id,{strides:u,dilations:l,pad:d,dimRoundingMode:c}=n,p=eO.backend_util.computeConv2DInfo(a.shape,i.shape,u,null==l?[1,1]:l,d,c,!0),f=p.filterHeight,h=p.filterWidth,m=p.padInfo.top,g=p.padInfo.right,b=p.padInfo.bottom,y=p.padInfo.left,_=p.dilationHeight,w=p.dilationWidth,I=p.strideHeight,k=p.strideWidth,S=p.inChannels,v=p.outChannels,M="SAME"===p.padInfo.type?1:0;if("channelsLast"!==p.dataFormat)throw Error(`wasm backend DepthwiseConv2dNative does not support dataFormat:'${p.dataFormat}'. Please use 'channelsLast'.`);let B=r.makeOutput(p.outShape,"float32"),x=r.dataIdMap.get(B.dataId).id;return A(s,a.shape[0],a.shape[1],a.shape[2],o,f,h,m,g,b,y,M,_,w,I,k,S,v,x),B}},t_={kernelName:eO.$w,backendName:"wasm",setupFunc:function(e){M=e.wasm.cwrap("Diag",null,["number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n}=e,{x:r}=t,a=eO.D5U.sizeFromShape(r.shape),i=n.makeOutput([...r.shape,...r.shape],r.dtype);return M(n.dataIdMap.get(r.dataId).id,eD[r.dtype],a,n.dataIdMap.get(i.dataId).id),i}},tw={kernelName:eO.p4S,backendName:"wasm",setupFunc:function(e){B=e.wasm.cwrap(eO.p4S,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,filter:i}=t,{strides:s,pad:o,dilations:u}=r;if(a.dtype!==i.dtype)throw Error(`Dilation2D error: x must have the same dtype as filter. Got ${a.dtype} and ${i.dtype}`);let l=eO.backend_util.computeDilation2DInfo(a.shape,i.shape,s,o,"NHWC",u),d=n.makeOutput(l.outShape,a.dtype);return B(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(d.dataId).id,eD[a.dtype],l.batchSize,l.inChannels,l.inHeight,l.inWidth,l.outHeight,l.outWidth,l.strideHeight,l.strideWidth,l.dilationHeight,l.dilationWidth,l.filterHeight,l.filterWidth,l.padInfo.top,l.padInfo.left),d}},tI={kernelName:eO.Vn9,backendName:"wasm",setupFunc:function(e){x=e.wasm.cwrap(eO.Vn9,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,filter:i,dy:s}=t,{strides:o,pad:u,dilations:l}=r;if(a.dtype!==i.dtype||a.dtype!==s.dtype)throw Error(`Dilation2DBackpropFilter error: x must have the same dtype as filter and dy. Got ${a.dtype}, ${i.dtype}, and ${s.dtype}`);let d=eO.backend_util.computeDilation2DInfo(a.shape,i.shape,o,u,"NHWC",l),c=n.makeOutput(i.shape,i.dtype);return x(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(s.dataId).id,n.dataIdMap.get(c.dataId).id,eD[a.dtype],d.batchSize,d.inChannels,d.inHeight,d.inWidth,d.outHeight,d.outWidth,d.strideHeight,d.strideWidth,d.dilationHeight,d.dilationWidth,d.filterHeight,d.filterWidth,d.padInfo.top,d.padInfo.left),c}},tk={kernelName:eO.ekb,backendName:"wasm",setupFunc:function(e){N=e.wasm.cwrap(eO.ekb,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,filter:i,dy:s}=t,{strides:o,pad:u,dilations:l}=r;if(a.dtype!==i.dtype||a.dtype!==s.dtype)throw Error(`Dilation2DBackpropInput error: x must have the same dtype as filter and dy. Got ${a.dtype}, ${i.dtype}, and ${s.dtype}`);let d=eO.backend_util.computeDilation2DInfo(a.shape,i.shape,o,u,"NHWC",l),c=n.makeOutput(a.shape,a.dtype);return N(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(s.dataId).id,n.dataIdMap.get(c.dataId).id,eD[a.dtype],d.batchSize,d.inChannels,d.inHeight,d.inWidth,d.outHeight,d.outWidth,d.strideHeight,d.strideWidth,d.dilationHeight,d.dilationWidth,d.filterHeight,d.filterWidth,d.padInfo.top,d.padInfo.left),c}},tS=createUnaryKernelConfig(eO.SX0),tv={kernelName:eO.HEU,backendName:"wasm",setupFunc:function(e){D=e.wasm.cwrap(eO.HEU,null,["number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n}=e,{dy:r,y:a}=t,i=n.makeOutput(a.shape,"float32"),tensorId=e=>n.dataIdMap.get(e.dataId).id;return D(tensorId(a),tensorId(r),tensorId(i)),i}},tA=createBinaryKernelConfig(eO.hdR,!1,"bool"),tE=createUnaryKernelConfig(eO.Omj),tM=createUnaryKernelConfig(eO.NEP,"float32");/**
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
 */function expandDims(e){let{inputs:t,attrs:n,backend:r}=e,{input:a}=t,{dim:i}=n,s=a.shape.length,o=a.shape.slice(),u=i;return i<0&&(eO.D5U.assert(-(s+1)<=i,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+i+1),o.splice(u,0,1),reshape({inputs:{x:a},backend:r,attrs:{shape:o}})}let tB={kernelName:eO.YFo,backendName:"wasm",kernelFunc:expandDims},tx=createUnaryKernelConfig(eO.Y0y,"float32");/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e){let{attrs:{shape:t,value:n},backend:r}=e,{attrs:{dtype:a}}=e;a=a||eO.D5U.inferDtype(n);let i=r.makeOutput(t,a),s=r.typedArrayFromHeap(i);return s.fill(n),i}let tN={kernelName:eO.deh,backendName:"wasm",kernelFunc:fill},tD={kernelName:eO.Uyb,backendName:"wasm",kernelFunc:function(e){let{inputs:t,backend:n}=e,{image:r}=t,a=n.makeOutput(r.shape,r.dtype),i=n.dataIdMap.get(r.dataId).id,s=n.dataIdMap.get(a.dataId).id,[o,u,l,d]=r.shape;return T(i,o,u,l,d,s),a},setupFunc:function(e){T=e.wasm.cwrap(eO.Uyb,null,["number","number","number","number","number","number"])}},tT=createUnaryKernelConfig(eO.OR),tR=createBinaryKernelConfig(eO.jeX,!1),tF={kernelName:eO.sHE,backendName:"wasm",setupFunc:function(e){R=e.wasm.cwrap(eO.sHE,null,["number","number","number","number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{varianceEpsilon:a}=r,{x:i,mean:s,variance:o,offset:u,scale:l}=n,d=t.dataIdMap.get(i.dataId).id,c=t.dataIdMap.get(s.dataId).id,p=t.dataIdMap.get(o.dataId).id,f=null!=u?t.dataIdMap.get(u.dataId).id:0,h=null!=l?t.dataIdMap.get(l.dataId).id:0,m=t.makeOutput(i.shape,i.dtype);if(0===eO.D5U.sizeFromShape(i.shape))return m;let g=t.dataIdMap.get(m.dataId).id;return R(d,c,p,f,h,a,g),m}},tO={kernelName:eO._V0,backendName:"wasm",setupFunc:function(e){F=e.wasm.cwrap(eO._V0,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,{x:a,filter:i,bias:s,preluActivationWeights:o}=t,{strides:u,pad:l,dilations:d,dataFormat:c,dimRoundingMode:p,activation:f,leakyreluAlpha:h}=n,m=eO.backend_util.computeConv2DInfo(a.shape,i.shape,u,d,l,p),g=eT[f];if(null==g)throw Error(`${f} activation not yet supported for FusedConv2D in the wasm backend.`);let b=r.dataIdMap.get(a.dataId).id,y=r.dataIdMap.get(i.dataId).id,_=m.outChannels,w=0;if(null!=s){let e=r.dataIdMap.get(s.dataId);if(1!==e.shape.length)throw Error(`FusedConv2D only supports rank-1 bias but got rank ${e.shape.length}.`);if(e.shape[0]!==_)throw Error(`FusedConv2D bias shape (${e.shape}) does not match the number of output channels (${_})`);w=e.id}let I=m.filterHeight,k=m.filterWidth,S=m.padInfo.top,v=m.padInfo.right,A=m.padInfo.bottom,M=m.padInfo.left,B=m.dilationHeight,x=m.dilationWidth,N=m.strideHeight,D=m.strideWidth,T=m.inChannels,R="SAME"===m.padInfo.type?1:0,O=m.batchSize,U=m.inHeight,P=m.inWidth;if("NHWC"!==c)throw Error(`wasm backend FusedConv2D does not support dataFormat:'${c}'. Please use 'NHWC'.`);let C=r.makeOutput(m.outShape,"float32"),$=r.dataIdMap.get(C.dataId).id,L=null==o?0:r.dataIdMap.get(o.dataId).id;return F(b,O,U,P,y,I,k,w,S,v,A,M,R,B,x,N,D,T,_,g,L,h||0,$),C}},tU={kernelName:eO.luS,backendName:"wasm",setupFunc:function(e){O=e.wasm.cwrap(eO.luS,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,{x:a,filter:i,bias:s,preluActivationWeights:o}=t,{strides:u,pad:l,dilations:d,dataFormat:c,dimRoundingMode:p,activation:f,leakyreluAlpha:h}=n,m=eO.backend_util.computeConv2DInfo(a.shape,i.shape,u,d,l,p,!0),g=eT[f];if(null==g)throw Error(`${f} activation not yet supported for FusedDepthwiseConv2D in the wasm backend.`);let b=r.dataIdMap.get(a.dataId).id,y=r.dataIdMap.get(i.dataId).id,_=m.outChannels,w=0;if(null!=s){let e=r.dataIdMap.get(s.dataId);if(1!==e.shape.length)throw Error(`FusedDepthwiseConv2D only supports rank-1 bias but got rank ${e.shape.length}.`);if(e.shape[0]!==_)throw Error(`FusedDepthwiseConv2D bias shape (${e.shape}) does not match the number of output channels (${_})`);w=e.id}let I=m.filterHeight,k=m.filterWidth,S=m.padInfo.top,v=m.padInfo.right,A=m.padInfo.bottom,M=m.padInfo.left,B=m.dilationHeight,x=m.dilationWidth,N=m.strideHeight,D=m.strideWidth,T=m.inChannels,R="SAME"===m.padInfo.type?1:0,F=m.batchSize,U=m.inHeight,P=m.inWidth;if("NHWC"!==c)throw Error(`wasm backend FusedDepthwiseConv2D does not support dataFormat:'${c}'. Please use 'NHWC'.`);let C=r.makeOutput(m.outShape,"float32"),$=r.dataIdMap.get(C.dataId).id,L=null==o?0:r.dataIdMap.get(o.dataId).id;return O(b,F,U,P,y,I,k,w,S,v,A,M,R,B,x,N,D,T,_,g,L,h||0,$),C}},tP={kernelName:eO.q1x,backendName:"wasm",setupFunc:function(e){U=e.wasm.cwrap(eO.q1x,null,["number","number","number","number","number","number","array","number"])},kernelFunc:function(e){let{backend:t,inputs:n}=e,{params:r,indices:a}=n,[i,s,o,u]=eO.DaI.prepareAndValidate(r,a),l=t.makeOutput(i,r.dtype);if(0===s)return l;let d=a.shape,c=d[d.length-1],p=t.dataIdMap.get(r.dataId),f=p.id,h=t.dataIdMap.get(a.dataId),m=h.id,g=new Uint8Array(new Int32Array(u).buffer),b=t.dataIdMap.get(l.dataId).id;return U(f,eD[r.dtype],m,s,c,o,g,b),l}},tC={kernelName:eO.qi_,backendName:"wasm",setupFunc:function(e){P=e.wasm.cwrap("Gather",null,["number","number","array","number","number","number","array","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{x:a,indices:i}=n,{axis:s,batchDims:o}=r,u=eO.D5U.parseAxisParam(s,a.shape)[0],l=t.readSync(i.dataId),d=a.shape[u];for(let e=0;e<l.length;++e){let t=l[e];eO.D5U.assert(t<=d-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${d-1}]`)}let c=eO.backend_util.segment_util.collectGatherOpShapeInfo(a,i,u,o),p=reshape({inputs:{x:a},attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]},backend:t}),f=eO.D5U.sizeFromShape(i.shape),h=reshape({inputs:{x:i},attrs:{shape:[c.batchSize,f/c.batchSize]},backend:t}),m=[c.batchSize,c.outerSize,f/c.batchSize,c.sliceSize],g=t.makeOutput(m,a.dtype);if(0===eO.D5U.sizeFromShape(a.shape))return g;let b=p.shape.length-1,y=t.dataIdMap.get(p.dataId),_=y.id,w=t.dataIdMap.get(h.dataId),I=w.id,k=t.dataIdMap.get(g.dataId).id,S=new Uint8Array(new Int32Array(eO.D5U.computeStrides(p.shape)).buffer),v=new Uint8Array(new Int32Array(eO.D5U.computeStrides(m)).buffer);return P(_,eD[a.dtype],S,b,I,c.batchSize,v,k),t.disposeData(p.dataId),t.disposeData(h.dataId),g.shape=c.outputShape,g}},t$=createBinaryKernelConfig(eO.iZT,!1,"bool"),tL=createBinaryKernelConfig(eO.Acj,!1,"bool"),tW=createUnaryKernelConfig(eO.avt,"bool"),tG=createUnaryKernelConfig(eO.iWB,"bool"),tz=createUnaryKernelConfig(eO.r7n,"bool"),tV={kernelName:eO.J$2,backendName:"wasm",setupFunc:function(e){C=e.wasm.cwrap(eO.J$2,null,["number","number","number","number"])},kernelFunc:function(e){let{inputs:{x:t},attrs:{alpha:n},backend:r}=e,a=r.dataIdMap.get(t.dataId).id,i=r.makeOutput(t.shape,"float32");if(0!==eO.D5U.sizeFromShape(t.shape)){let e=r.dataIdMap.get(i.dataId).id;C(a,eD[t.dtype],n,e)}return i}},tH=createBinaryKernelConfig(eO.vtC,!1,"bool"),tj=createBinaryKernelConfig(eO.CAk,!1,"bool"),tq={kernelName:eO.e7N,backendName:"wasm",setupFunc:function(e){$=e.wasm.cwrap(eO.e7N,null,["number","number","number","number"])},kernelFunc:function(e){let{attrs:t,backend:n}=e,{start:r,stop:a,num:i}=t,s=Math.floor(i),o=n.makeOutput([s],"float32");return $(n.dataIdMap.get(o.dataId).id,r,a,s),o}},tK=createUnaryKernelConfig(eO.ZbH),tY=createUnaryKernelConfig(eO.kU),tZ=createBinaryKernelConfig(eO.PYm,!1,"bool"),tX=createUnaryKernelConfig(eO.VfG),tJ=createBinaryKernelConfig(eO.MZg,!1,"bool"),tQ=createBinaryKernelConfig(eO.w6g,!1,"bool"),t0={kernelName:eO.eZ0,backendName:"wasm",setupFunc:function(e){L=e.wasm.cwrap(eO.eZ0,null,["number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{depthRadius:i,bias:s,alpha:o,beta:u}=r;if("float32"!==a.dtype)throw Error("LRN error: x must have dtype float32");let l=n.makeOutput(a.shape,a.dtype);return L(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(l.dataId).id,a.shape[3],i,s,o,u),l}},t1={kernelName:eO.Hhh,backendName:"wasm",setupFunc:function(e){W=e.wasm.cwrap(eO.Hhh,null,["number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a,y:i,dy:s}=t,{depthRadius:o,bias:u,alpha:l,beta:d}=r;if("float32"!==a.dtype||"float32"!==i.dtype||"float32"!==s.dtype)throw Error("LRNGrad error: x, y, and dy must have dtype float32");let c=n.makeOutput(a.shape,a.dtype);return W(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(s.dataId).id,n.dataIdMap.get(c.dataId).id,s.shape[3],o,u,l,d),c}},t2={kernelName:eO.YoZ,backendName:"wasm",setupFunc:function(e){G=e.wasm.cwrap(eO.YoZ,null,["number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{reductionIndices:a,keepDims:i}=r,{x:s}=n,o=t.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,originalAxes:p,inputWasTransposed:f}=permuteAxesAndTranspose(s,a,t);if(f){let e=t.dataIdMap.get(d.dataId).id;l=d,u=e}let h=l.shape.length;eO.backend_util.assertAxesAreInnerMostDims("max",c,h);let[m,g]=eO.backend_util.computeOutAndReduceShapes(l.shape,c),b=eO.D5U.sizeFromShape(g),y=t.makeOutput(m,s.dtype);if(0!==eO.D5U.sizeFromShape(l.shape)){let e=t.dataIdMap.get(y.dataId).id;G(u,eD[s.dtype],b,e)}if(f&&t.disposeData(d.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(y.shape,p);y.shape=e}return y}},t3=createBinaryKernelConfig(eO.BMI,!1),t6={kernelName:eO.mTV,backendName:"wasm",setupFunc:function(e){z=e.wasm.cwrap(eO.mTV,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,attrs:n,backend:r}=e,a=t.x,i=r.dataIdMap.get(a.dataId).id;eO.D5U.assert("float32"===a.dtype,()=>`Error in MaxPool: only float32 input is supported. Got ${a.dtype}.`);let{filterSize:s,strides:o,pad:u,dimRoundingMode:l}=n,d=eO.backend_util.computePool2DInfo(a.shape,s,o,1,u,l),c=d.filterHeight,p=d.filterWidth,f=d.padInfo.top,h=d.padInfo.right,m=d.padInfo.bottom,g=d.padInfo.left,b=d.dilationHeight,y=d.dilationWidth,_=d.strideHeight,w=d.strideWidth,I=d.inChannels,k=d.outChannels;if("channelsLast"!==d.dataFormat)throw Error(`wasm backend does not support dataFormat:'${d.dataFormat}'. Please use 'channelsLast'.`);let S=r.makeOutput(d.outShape,"float32"),v=r.dataIdMap.get(S.dataId).id;return z(i,a.shape[0],a.shape[1],a.shape[2],c,p,f,h,m,g,b,y,_,w,I,k,v),S}},t8={kernelName:eO.OAf,backendName:"wasm",setupFunc:function(e){V=e.wasm.cwrap("MaxPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{filterSize:i,strides:s,pad:o,dimRoundingMode:u,dataFormat:l}=r,d=eO.backend_util.computePool3DInfo(a.shape,i,s,1,o,u,l),c=n.makeOutput(d.outShape,a.dtype);return V(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(c.dataId).id,d.batchSize,d.inChannels,d.inDepth,d.inHeight,d.inWidth,d.outDepth,d.outHeight,d.outWidth,d.strideDepth,d.strideHeight,d.strideWidth,d.dilationDepth,d.dilationHeight,d.dilationWidth,d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth,d.padInfo.front,d.padInfo.top,d.padInfo.left),c}},t5={kernelName:eO.OU7,backendName:"wasm",setupFunc:function(e){H=e.wasm.cwrap("MaxPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{dy:a,input:i}=t,{filterSize:s,strides:o,pad:u,dimRoundingMode:l}=r,d=eO.backend_util.computePool3DInfo(i.shape,s,o,1,u,l),c=n.makeOutput(i.shape,i.dtype);return H(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(c.dataId).id,d.batchSize,d.inChannels,d.inDepth,d.inHeight,d.inWidth,d.outDepth,d.outHeight,d.outWidth,d.strideDepth,d.strideHeight,d.strideWidth,d.dilationDepth,d.dilationHeight,d.dilationWidth,d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth,d.padInfo.front,d.padInfo.top,d.padInfo.left),c}},t4={kernelName:eO.OV7,backendName:"wasm",setupFunc:function(e){j=e.wasm.cwrap("MaxPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{dy:a,input:i}=t,{filterSize:s,strides:o,pad:u,dimRoundingMode:l}=r,d=eO.backend_util.computePool2DInfo(i.shape,s,o,1,u,l),c=n.makeOutput(i.shape,i.dtype);return j(n.dataIdMap.get(i.dataId).id,n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(c.dataId).id,d.batchSize,d.inChannels,d.inHeight,d.inWidth,d.outHeight,d.outWidth,d.strideHeight,d.strideWidth,d.dilationHeight,d.dilationWidth,d.effectiveFilterHeight,d.effectiveFilterWidth,d.padInfo.top,d.padInfo.left),c}},t7={kernelName:eO.vFR,backendName:"wasm",setupFunc:function(e){q=e.wasm.cwrap("MaxPoolWithArgmax",null,["number","number","number","number","boolean","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{filterSize:i,strides:s,pad:o,includeBatchInIndex:u}=r;eO.D5U.assert(4===a.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${a.shape.length}.`);let l=[1,1];eO.D5U.assert(eO.backend_util.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);let d=eO.backend_util.computePool2DInfo(a.shape,i,s,[1,1],o),c=n.makeOutput(d.outShape,a.dtype),p=n.makeOutput(d.outShape,"int32");return q(n.dataIdMap.get(a.dataId).id,n.dataIdMap.get(c.dataId).id,n.dataIdMap.get(p.dataId).id,eD[a.dtype],u,d.batchSize,d.inChannels,d.inHeight,d.inWidth,d.outHeight,d.outWidth,d.strideHeight,d.strideWidth,d.dilationHeight,d.dilationWidth,d.effectiveFilterHeight,d.effectiveFilterWidth,d.padInfo.top,d.padInfo.left),[c,p]}},t9={kernelName:eO.q2K,backendName:"wasm",setupFunc:function(e){K=e.wasm.cwrap(eO.q2K,null,["number, number, number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:s}=n,o=t.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,originalAxes:p,inputWasTransposed:f}=permuteAxesAndTranspose(s,a,t),h=c;if(f){let e=t.dataIdMap.get(d.dataId).id;e!==o&&(l=d,u=e,h=eO.backend_util.getInnerMostAxes(h.length,l.shape.length))}eO.backend_util.assertAxesAreInnerMostDims("mean",h,l.shape.length);let[m,g]=eO.backend_util.computeOutAndReduceShapes(l.shape,h),b=eO.D5U.sizeFromShape(g),y=l;"float32"!==l.dtype&&(y=cast({backend:t,inputs:{x:l},attrs:{dtype:"float32"}}),u=t.dataIdMap.get(y.dataId).id);let _=t.makeOutput(m,"float32");if(0!==eO.D5U.sizeFromShape(l.shape)){let e=t.dataIdMap.get(_.dataId).id;K(u,b,e)}if(f&&t.disposeData(d.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(_.shape,p);_.shape=e}return"float32"!==l.dtype&&t.disposeData(y.dataId),_}},ne={kernelName:eO.c17,backendName:"wasm",setupFunc:function(e){Y=e.wasm.cwrap(eO.c17,null,["number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:s}=n,o=t.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,originalAxes:p,inputWasTransposed:f}=permuteAxesAndTranspose(s,a,t);if(f){let e=t.dataIdMap.get(d.dataId).id;e!==o&&(l=d,u=e)}let h=l.shape.length;eO.backend_util.assertAxesAreInnerMostDims("min",c,h);let[m,g]=eO.backend_util.computeOutAndReduceShapes(l.shape,c),b=eO.D5U.sizeFromShape(g),y=t.makeOutput(m,l.dtype);if(0!==eO.D5U.sizeFromShape(l.shape)){let e=t.dataIdMap.get(y.dataId).id;Y(u,eD[s.dtype],b,e)}if(f&&t.disposeData(d.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(y.shape,p);y.shape=e}return y}},nt=createBinaryKernelConfig(eO.q8u,!1);(eN=eF||(eF={}))[eN.reflect=0]="reflect",eN[eN.symmetric=1]="symmetric";let nn={kernelName:eO.jQs,backendName:"wasm",kernelFunc:function(e){let{inputs:{x:t},backend:n,attrs:{paddings:r,mode:a}}=e,i=r.map((e,n)=>e[0]+t.shape[n]+e[1]),s=n.dataIdMap.get(t.dataId).id,o=n.makeOutput(i,t.dtype),u=n.dataIdMap.get(o.dataId).id,l=new Uint8Array(new Int32Array(t.shape).buffer),d=r.map(e=>e[0]),c=r.map(e=>e[1]),p=new Uint8Array(new Int32Array(d).buffer),f=new Uint8Array(new Int32Array(c).buffer);return Z(s,l,t.shape.length,eD[t.dtype],p,f,eF[a],u),o},setupFunc:function(e){Z=e.wasm.cwrap(eO.jQs,null,["number","array","number","number","array","array","number","number"])}};function softmax(e){let{backend:t,inputs:{logits:n},attrs:{dim:r}}=e,a=t.dataIdMap.get(n.dataId).id,i=t.makeOutput(n.shape,n.dtype),s=t.dataIdMap.get(i.dataId).id,o=n.shape[r],u=eO.D5U.sizeFromShape(n.shape)/o;return 0===eO.D5U.sizeFromShape(i.shape)||X(a,s,o,u),i}let nr={kernelName:eO.Gcp,backendName:"wasm",setupFunc:function(e){X=e.wasm.cwrap(eO.Gcp,null,["number","number","number","number"])},kernelFunc:softmax},na={kernelName:eO.NZg,backendName:"wasm",setupFunc:function(e){J=e.wasm.cwrap(eO.NZg,null,["number","number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{logits:a}=t,{numSamples:i,seed:s,normalized:o}=r;if("float32"!==a.dtype)throw Error(`Tensor logits must have dtype float32, got ${a.dtype}`);let u=o?a:softmax({inputs:{logits:a},backend:n,attrs:{dim:a.shape.length-1}}),[l,d]=u.shape,c=n.makeOutput([l,i],"int32");return J(n.dataIdMap.get(u.dataId).id,l,d,i,s,n.dataIdMap.get(c.dataId).id),o||n.disposeData(u.dataId),c}},ni=createBinaryKernelConfig(eO.Vbg,!0),ns=createBinaryKernelConfig(eO.wYn,!0),no=createUnaryKernelConfig(eO.kuV);/**
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
 */function parseResultStruct(e,t){let n=new Int32Array(e.wasm.HEAPU8.buffer,t,4),r=n[0],a=n[1],i=n[2],s=n[3];return e.wasm._free(t),{pSelectedIndices:r,selectedSize:a,pSelectedScores:i,pValidOutputs:s}}let nu={kernelName:eO.uv1,backendName:"wasm",setupFunc:function(e){Q=e.wasm.cwrap(eO.uv1,"number",["number","number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:a,maxOutputSize:i,scoreThreshold:s}=r,{boxes:o,scores:u}=n,l=t.dataIdMap.get(o.dataId).id,d=t.dataIdMap.get(u.dataId).id,c=Q(l,d,i,a,s),{pSelectedIndices:p,selectedSize:f,pSelectedScores:h,pValidOutputs:m}=parseResultStruct(t,c);t.wasm._free(h),t.wasm._free(m);let g=t.makeOutput([f],"int32",p);return g}},nl={kernelName:eO.cye,backendName:"wasm",setupFunc:function(e){ee=e.wasm.cwrap(eO.cye,"number",["number","number","number","number","number","bool"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:a,maxOutputSize:i,scoreThreshold:s,padToMaxOutputSize:o}=r,{boxes:u,scores:l}=n,d=t.dataIdMap.get(u.dataId).id,c=t.dataIdMap.get(l.dataId).id,p=ee(d,c,i,a,s,o),{pSelectedIndices:f,selectedSize:h,pSelectedScores:m,pValidOutputs:g}=parseResultStruct(t,p);t.wasm._free(m);let b=t.makeOutput([h],"int32",f),y=t.makeOutput([],"int32",g);return[b,y]}},nd={kernelName:eO.W0H,backendName:"wasm",setupFunc:function(e){et=e.wasm.cwrap(eO.W0H,"number",["number","number","number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{iouThreshold:a,maxOutputSize:i,scoreThreshold:s,softNmsSigma:o}=r,{boxes:u,scores:l}=n,d=t.dataIdMap.get(u.dataId).id,c=t.dataIdMap.get(l.dataId).id,p=et(d,c,i,a,s,o),{pSelectedIndices:f,selectedSize:h,pSelectedScores:m,pValidOutputs:g}=parseResultStruct(t,p);t.wasm._free(g);let b=t.makeOutput([h],"int32",f),y=t.makeOutput([h],"float32",m);return[b,y]}},nc=createBinaryKernelConfig(eO.yQU,!1,"bool"),np={kernelName:eO.we_,backendName:"wasm",setupFunc:function(e){en=e.wasm.cwrap(eO.we_,null,["number","number","number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{indices:a}=t,{dtype:i,depth:s,onValue:o,offValue:u}=r,l=n.makeOutput([...a.shape,s],i),d=n.dataIdMap.get(l.dataId).id,c=n.dataIdMap.get(a.dataId),p=c.id;return en(p,s,o,u,d),l}},nf={kernelName:eO.qWM,backendName:"wasm",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:{x:t},backend:n}=e,r=n.makeOutput(t.shape,t.dtype),a=n.typedArrayFromHeap(r);return a.fill(1),r}},nh={kernelName:eO.QiL,backendName:"wasm",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:n,attrs:r}=e,{axis:a}=r;if(1===t.length)return expandDims({inputs:{input:t[0]},backend:n,attrs:{dim:a}});let i=t[0].shape,s=t[0].dtype;t.forEach(e=>{eO.D5U.assertShapesMatch(i,e.shape,"All tensors passed to stack must have matching shapes"),eO.D5U.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let o=[],u=t.map(e=>{let t=expandDims({inputs:{input:e},backend:n,attrs:{dim:a}});return o.push(t),t}),l=concat({inputs:u,backend:n,attrs:{axis:a}});return o.forEach(e=>n.disposeData(e.dataId)),l}},nm={kernelName:eO.lyA,backendName:"wasm",kernelFunc:function(e){let{inputs:{x:t},backend:n,attrs:{paddings:r,constantValue:a}}=e,i=r.map((e,n)=>e[0]+t.shape[n]+e[1]);if(0===eO.D5U.sizeFromShape(t.shape))return fill({backend:n,attrs:{shape:i,value:a,dtype:t.dtype}});let s=n.dataIdMap.get(t.dataId).id,o=n.makeOutput(i,t.dtype),u=n.dataIdMap.get(o.dataId),l=u.id,d=new Uint8Array(new Int32Array(t.shape).buffer),c=r.map(e=>e[0]),p=r.map(e=>e[1]),f=new Uint8Array(new Int32Array(c).buffer),h=new Uint8Array(new Int32Array(p).buffer);return er(s,d,t.shape.length,eD[t.dtype],f,h,a,l),o},setupFunc:function(e){er=e.wasm.cwrap(eO.lyA,null,["number","array","number","number","array","array","number","number"])}},ng=createBinaryKernelConfig(eO.pe_,!1),nb={kernelName:eO.o0g,backendName:"wasm",setupFunc:function(e){ea=e.wasm.cwrap(eO.o0g,null,["number","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n}=e,{x:r,alpha:a}=t,i=n.dataIdMap.get(r.dataId).id,s=n.dataIdMap.get(a.dataId).id,o=i,u=r;"float32"!==r.dtype&&(u=cast({backend:n,inputs:{x:r},attrs:{dtype:"float32"}}),o=n.dataIdMap.get(u.dataId).id);let l=n.makeOutput(r.shape,"float32"),d=n.dataIdMap.get(l.dataId).id;return ea(o,s,d),"float32"!==r.dtype&&n.disposeData(u.dataId),l}},ny={kernelName:eO.DlI,backendName:"wasm",setupFunc:function(e){ei=e.wasm.cwrap(eO.DlI,null,["number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:s}=n,o=t.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,originalAxes:p,inputWasTransposed:f}=permuteAxesAndTranspose(s,a,t),h=c;if(f){let e=t.dataIdMap.get(d.dataId).id;e!==o&&(l=d,u=e,h=eO.backend_util.getInnerMostAxes(h.length,l.shape.length))}eO.backend_util.assertAxesAreInnerMostDims("prod",h,l.shape.length);let[m,g]=eO.backend_util.computeOutAndReduceShapes(l.shape,h),b=eO.D5U.sizeFromShape(g),y=t.makeOutput(m,l.dtype);if(0!==eO.D5U.sizeFromShape(l.shape)){let e=t.dataIdMap.get(y.dataId).id;ei(u,b,eD[y.dtype],e)}if(f&&t.disposeData(d.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(y.shape,p);y.shape=e}return y}};var n_=n(5350);let nw={kernelName:eO.e6w,backendName:"wasm",kernelFunc:e=>{let{backend:t,attrs:n}=e,{start:r,stop:a,step:i,dtype:s}=n,o=(0,n_.b)(r,a,i,s),u=t.makeOutput([o.length],s),l=t.typedArrayFromHeap(u);return l.set(o),u}},nI=createBinaryKernelConfig(eO.oHH,!0),nk=createUnaryKernelConfig(eO.$HU),nS=createUnaryKernelConfig(eO.qkr),nv=createUnaryKernelConfig(eO.SbG),nA={kernelName:eO._Yw,backendName:"wasm",setupFunc:function(e){es=e.wasm.cwrap(eO._Yw,null,["number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r,attrs:a}=e,{images:i}=r,{alignCorners:s,halfPixelCenters:o,size:u}=a,[l,d]=u,[c,p,f,h]=i.shape,m=[c,l,d,h],g=n.dataIdMap.get(i.dataId);"float32"!==g.dtype&&(t=cast({backend:n,inputs:{x:i},attrs:{dtype:"float32"}}),g=n.dataIdMap.get(t.dataId));let b=g.id,y=n.makeOutput(m,"float32");if(0===eO.D5U.sizeFromShape(i.shape))return y;let _=n.dataIdMap.get(y.dataId).id;return es(b,c,p,f,h,l,d,s?1:0,o?1:0,_),null!=t&&n.disposeData(t.dataId),y}},nE={kernelName:eO.zbQ,backendName:"wasm",setupFunc:function(e){eo=e.wasm.cwrap(eO.zbQ,null,["number","number","number","array","array","boolean"])},kernelFunc:function(e){let t;let{inputs:n,backend:r,attrs:a}=e,{images:i,dy:s}=n,{alignCorners:o}=a,u=r.makeOutput(i.shape,"float32"),l=r.dataIdMap.get(i.dataId);return"float32"!==l.dtype&&(t=cast({backend:r,inputs:{x:i},attrs:{dtype:"float32"}}),l=r.dataIdMap.get(t.dataId)),eo(r.dataIdMap.get(i.dataId).id,r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(u.dataId).id,new Uint8Array(new Int32Array(i.shape).buffer),new Uint8Array(new Int32Array(s.shape).buffer),o),null!=t&&r.disposeData(t.dataId),u}},nM={kernelName:eO.dpD,backendName:"wasm",setupFunc:function(e){eu=e.wasm.cwrap(eO.dpD,null,["number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r,attrs:a}=e,{images:i}=r,{alignCorners:s,halfPixelCenters:o,size:u}=a,[l,d]=u,[c,p,f,h]=i.shape,m=[c,l,d,h],g=n.makeOutput(m,"float32");if(0===eO.D5U.sizeFromShape(i.shape))return g;let b=n.dataIdMap.get(i.dataId);"float32"!==b.dtype&&(t=cast({backend:n,inputs:{x:i},attrs:{dtype:"float32"}}),b=n.dataIdMap.get(t.dataId));let y=b.id,_=n.dataIdMap.get(g.dataId).id;return eu(y,c,p,f,h,l,d,s?1:0,o?1:0,_),null!=t&&n.disposeData(t.dataId),g}},nB={kernelName:eO.Hmb,backendName:"wasm",setupFunc:function(e){el=e.wasm.cwrap(eO.Hmb,null,["number","number","number","array","array","boolean"])},kernelFunc:function(e){let t;let{inputs:n,backend:r,attrs:a}=e,{images:i,dy:s}=n,{alignCorners:o}=a,u=r.makeOutput(i.shape,"float32"),l=r.dataIdMap.get(i.dataId);return"float32"!==l.dtype&&(t=cast({backend:r,inputs:{x:i},attrs:{dtype:"float32"}}),l=r.dataIdMap.get(t.dataId)),el(r.dataIdMap.get(i.dataId).id,r.dataIdMap.get(s.dataId).id,r.dataIdMap.get(u.dataId).id,new Uint8Array(new Int32Array(i.shape).buffer),new Uint8Array(new Int32Array(s.shape).buffer),o),null!=t&&r.disposeData(t.dataId),u}},nx={kernelName:eO.mKl,backendName:"wasm",kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{dims:i}=r,s=eO.D5U.parseAxisParam(i,a.shape);if(0===a.shape.length)return identity({inputs:{x:a},backend:n});let o=n.makeOutput(a.shape,a.dtype),u=n.dataIdMap.get(a.dataId).id,l=n.dataIdMap.get(o.dataId).id,d=new Uint8Array(new Int32Array(s).buffer),c=new Uint8Array(new Int32Array(a.shape).buffer);ed(u,d,s.length,c,a.shape.length,l);let p=reshape({inputs:{x:o},attrs:{shape:a.shape},backend:n});return n.disposeData(o.dataId),p},setupFunc:function(e){ed=e.wasm.cwrap(eO.mKl,null,["number","array","number","array","number","number"])}},nN={kernelName:eO.b9H,backendName:"wasm",kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{image:a}=t,{radians:i,fillValue:s,center:o}=r,u=n.makeOutput(a.shape,a.dtype),l=n.dataIdMap.get(a.dataId).id,d=n.dataIdMap.get(u.dataId).id,[c,p,f,h]=a.shape,[m,g]=eO.backend_util.getImageCenter(o,p,f),b="number"==typeof s?[s,s,s,0===s?0:255]:[...s,255],y=new Uint8Array(new Int32Array(b).buffer);return ec(l,c,p,f,h,i,m,g,y,b.length,d),u},setupFunc:function(e){ec=e.wasm.cwrap(eO.b9H,null,["number","number","number","number","number","number","number","number","array","number","number"])}},nD=createUnaryKernelConfig(eO.e07),nT=createUnaryKernelConfig(eO.bV0),nR={kernelName:eO.xQA,backendName:"wasm",setupFunc:function(e){ep=e.wasm.cwrap(eO.xQA,null,["number","number","number","number","number","number","array","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{indices:a,updates:i}=n,{shape:s}=r,o=t.makeOutput(s,i.dtype);if(0===eO.D5U.sizeFromShape(s))return o;let{sliceRank:u,numUpdates:l,sliceSize:d,strides:c,outputSize:p}=eO.yV1.calculateShapes(i,a,s),f=t.dataIdMap.get(a.dataId),h=f.id,m=t.dataIdMap.get(i.dataId),g=m.id,b=new Uint8Array(new Int32Array(c).buffer),y=t.dataIdMap.get(o.dataId).id;return ep(h,g,eD[i.dtype],u,l,d,b,p,y),o}},nF={kernelName:eO.nr8,backendName:"wasm",setupFunc:function(e){ef=e.wasm.cwrap(eO.nr8,null,["number","number","number","number","number","number","bool","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:a,values:i}=t,{side:s}=r;if(a.dtype!==i.dtype)throw Error(`SearchSorted error: sorted_sequence must have the same dtype as values. Got ${a.dtype} and ${i.dtype}`);let o=n.makeOutput(i.shape,"int32");function tensorId(e){return n.dataIdMap.get(e.dataId).id}return ef(tensorId(a),tensorId(i),a.shape[0],a.shape[1],i.shape[1],eD[a.dtype],"left"===s,tensorId(o)),o}},nO={kernelName:eO.PhF,backendName:"wasm",kernelFunc:function(e){let{inputs:t,backend:n}=e,{condition:r,t:a,e:i}=t,s=n.dataIdMap.get(r.dataId).id,o=n.dataIdMap.get(a.dataId).id,u=n.dataIdMap.get(i.dataId).id,l=n.makeOutput(a.shape,a.dtype),d=n.dataIdMap.get(l.dataId).id,c=r.shape.length,p=a.shape.length,f=0===c||c>1||1===p?1:eO.D5U.sizeFromShape(a.shape.slice(1));return eh(s,o,u,f,d),l},setupFunc:function(e){eh=e.wasm.cwrap("SelectV2",null,["number","number","number","number","number"])}},nU=createUnaryKernelConfig(eO.oFR),nP=createUnaryKernelConfig(eO.i5y),nC=createUnaryKernelConfig(eO.RQH),n$=createUnaryKernelConfig(eO.wYB),nL=createUnaryKernelConfig(eO.MRv),nW={kernelName:eO.TQc,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,{blockShape:i,paddings:s}=r,o=eO.D5U.sizeFromShape(i),u=[[0,0]];u.push(...s);for(let e=1+i.length;e<a.shape.length;++e)u.push([0,0]);let l=nm.kernelFunc({inputs:{x:a},backend:n,attrs:{paddings:u,constantValue:0}}),d=eO.backend_util.getReshaped(l.shape,i,o,!1),c=eO.backend_util.getPermuted(d.length,i.length,!1),p=eO.backend_util.getReshapedPermuted(l.shape,i,o,!1),f=reshape({inputs:{x:l},backend:n,attrs:{shape:d}}),h=transpose({inputs:{x:f},backend:n,attrs:{perm:c}}),m=reshape({inputs:{x:h},backend:n,attrs:{shape:p}});return n.disposeData(l.dataId),n.disposeData(f.dataId),n.disposeData(h.dataId),m}},nG={kernelName:eO.O3z,backendName:"wasm",setupFunc:function(e){eg=e.wasm.cwrap("SparseFillEmptyRows","number",["number","number","number","number","number","number","number","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r}=e,{indices:a,values:i,denseShape:s,defaultValue:o}=r,u=a.shape[0],l=a.shape[1],d=n.readSync(s.dataId)[0],c=[u+d,l],p=n.dataIdMap.get(a.dataId).id,f=n.dataIdMap.get(i.dataId).id,h=n.dataIdMap.get(o.dataId).id,m=n.makeOutput(c,a.dtype),g=n.dataIdMap.get(m.dataId).id,b=n.makeOutput(c.slice(0,1),i.dtype),y=n.dataIdMap.get(b.dataId).id,_=n.makeOutput([d],"bool"),w=n.dataIdMap.get(_.dataId).id,I=n.makeOutput([u],a.dtype),k=n.dataIdMap.get(I.dataId).id,S=n.makeOutput([4],"int32"),v=n.dataIdMap.get(S.dataId).id,A=eg(p,f,eD[i.dtype],u,d,l,h,g,y,w,k,v),M=n.readSync(S.dataId);switch(M[0]){case 1:t=eO.backend_util.getSparseFillEmptyRowsIndicesDenseShapeMismatch(M[1]);break;case 2:t=eO.backend_util.getSparseFillEmptyRowsNegativeIndexErrorMessage(M[1],M[2]);break;case 3:t=eO.backend_util.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(M[1],M[2],M[3]);break;default:t=""}if(n.disposeData(S.dataId),t)throw n.disposeData(m.dataId),n.disposeData(b.dataId),n.disposeData(_.dataId),n.disposeData(I.dataId),Error(t);let B=m,x=b;return A!==c[0]&&(B=slice({inputs:{x:m},attrs:{begin:0,size:[A,l]},backend:n}),x=slice({inputs:{x:b},attrs:{begin:0,size:A},backend:n}),n.disposeData(m.dataId),n.disposeData(b.dataId)),[B,x,_,I]}},nz={kernelName:eO.nhH,backendName:"wasm",setupFunc:function(e){eb=e.wasm.cwrap(eO.nhH,null,["number","number","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r}=e,{inputIndices:a,inputShape:i,newShape:s}=r;if(2!==a.shape.length)throw Error(`Input indices should be a matrix but received shape
        ${a.shape}`);if(1!==i.shape.length)throw Error(`Input shape should be a vector but received shape
        ${i.shape}`);if(1!==s.shape.length)throw Error(`Target shape should be a vector but received shape ${s.shape}`);let o=n.dataIdMap.get(a.dataId).id,u=n.dataIdMap.get(i.dataId).id,l=n.dataIdMap.get(s.dataId).id,d=a.shape[0],c=eO.D5U.sizeFromShape(s.shape),p=n.makeOutput([d,c],a.dtype),f=n.dataIdMap.get(p.dataId).id,h=n.makeOutput([c],s.dtype),m=n.dataIdMap.get(h.dataId).id,g=n.makeOutput([3],"int32"),b=n.dataIdMap.get(g.dataId).id;eb(o,u,l,d,f,m,b);let y=n.readSync(g.dataId);switch(y[0]){case 0:t=eO.backend_util.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(y[1],y[2]);break;case 1:t=eO.backend_util.getSparseReshapeNegativeOutputDimErrorMessage(y[1],y[2]);break;case 2:t=eO.backend_util.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage();break;case 3:{let e=Array.from(n.readSync(i.dataId)),r=Array.from(n.readSync(h.dataId));t=eO.backend_util.getSparseReshapeInputOutputMultipleErrorMessage(e,r);break}case 4:{let e=Array.from(n.readSync(i.dataId)),r=Array.from(n.readSync(h.dataId));t=eO.backend_util.getSparseReshapeInputOutputMismatchErrorMessage(e,r);break}default:t=""}if(n.disposeData(g.dataId),t)throw n.disposeData(p.dataId),n.disposeData(h.dataId),Error(t);return[p,h]}};function SparseSegmentReduction_setup(e){ey=e.wasm.cwrap("SparseSegmentReduction",null,["number","number","number","number","number","number","number","number","number"])}function sparseSegmentReduction(e,t){let n;let{backend:r,inputs:a}=e,{data:i,indices:s,segmentIds:o}=a,u=s.shape[0],l=r.readSync(o.dataId,u-1,u)[0],d=u>0?l+1:0;if(d<0)throw Error(eO.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let c=i.shape.slice();c[0]=d;let p=r.dataIdMap.get(i.dataId).id,f=r.dataIdMap.get(s.dataId).id,h=r.dataIdMap.get(o.dataId).id,m=r.makeOutput(c,i.dtype),g=r.dataIdMap.get(m.dataId).id,b=r.makeOutput([4],"int32"),y=r.dataIdMap.get(b.dataId).id;ey(p,eD[i.dtype],i.shape[0],f,h,g,y,t,0);let _=r.readSync(b.dataId);switch(_[0]){case 0:n=eO.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage();break;case 1:n=eO.backend_util.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage();break;case 2:n=eO.backend_util.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(_[1],_[2]);break;case 3:n=eO.backend_util.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(_[1],_[2],_[3]);break;default:n=""}if(r.disposeData(b.dataId),n)throw r.disposeData(m.dataId),Error(n);return m}let nV={kernelName:eO.w3H,backendName:"wasm",setupFunc:SparseSegmentReduction_setup,kernelFunc:/**
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
 */function(e){return sparseSegmentReduction(e,!0)}},nH={kernelName:eO.ZjV,backendName:"wasm",setupFunc:SparseSegmentReduction_setup,kernelFunc:/**
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
 */function(e){return sparseSegmentReduction(e,!1)}},nj={kernelName:eO.D2d,backendName:"wasm",setupFunc:function(e){e_=e.wasm.cwrap(eO.D2d,null,["number","number","number","number","number","number","number","number","array","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{sparseIndices:a,sparseValues:i,defaultValue:s}=n,{outputShape:o}=r,u=t.makeOutput(o,s.dtype);if(0===eO.D5U.sizeFromShape(o))return u;let{sliceRank:l,numUpdates:d,sliceSize:c,strides:p,outputSize:f}=eO.backend_util.calculateShapes(i,a,o),h=t.dataIdMap.get(a.dataId).id,m=t.dataIdMap.get(i.dataId).id,g=t.dataIdMap.get(s.dataId).id,b=new Uint8Array(new Int32Array(p).buffer),y=t.dataIdMap.get(u.dataId).id;return e_(h,m,i.shape.length,g,eD[s.dtype],l,d,c,b,f,y),u}},nq={kernelName:eO.L8s,backendName:"wasm",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,attrs:n,backend:r}=e,{x:a}=t,{numOrSizeSplits:i,axis:s}=n,o=eO.D5U.parseAxisParam(s,a.shape)[0],u=eO.backend_util.prepareSplitSize(a,i,o),l=Array(a.shape.length).fill(0),d=a.shape.slice();return u.map(e=>{let t=[...d];t[o]=e;let n=slice({inputs:{x:a},attrs:{begin:l,size:t},backend:r});return l[o]+=e,n})}},nK=createUnaryKernelConfig(eO.FKq),nY=createUnaryKernelConfig(eO.bK0),nZ=createBinaryKernelConfig(eO._tC,!0),nX={kernelName:eO.h8e,backendName:"wasm",setupFunc:function(e){ew=e.wasm.cwrap(eO.h8e,null,["number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{alpha:a}=r,{x:i}=n,s=t.dataIdMap.get(i.dataId).id,o=t.makeOutput(i.shape,i.dtype),u=t.dataIdMap.get(o.dataId).id;return ew(s,a,eD[i.dtype],u),o}},nJ={kernelName:eO.jQk,backendName:"wasm",setupFunc:function(e){eI=e.wasm.cwrap(eO.jQk,null,["number","array","number","array","array","array","array","array","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r,attrs:a}=e,{x:i}=r,{begin:s,end:o,strides:u,beginMask:l,endMask:d,ellipsisMask:c,newAxisMask:p,shrinkAxisMask:f}=a,{finalShapeSparse:h,finalShape:m,isIdentity:g,sliceDim0:b,isSimpleSlice:y,begin:_,end:w,strides:I}=eO.kuN.sliceInfo(i.shape,s,o,u,l,d,c,p,f);if(g)t=reshape({inputs:{x:i},backend:n,attrs:{shape:m}});else if(b||y){eO.D5U.assert(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=eO.kuN.computeOutShape(_,w,I),r=slice({inputs:{x:i},backend:n,attrs:{begin:_,size:e}});t=reshape({inputs:{x:r},backend:n,attrs:{shape:m}}),n.disposeData(r.dataId)}else{let e=n.makeOutput(h,"float32"),r=n.dataIdMap.get(i.dataId).id,a=new Uint8Array(new Int32Array(eO.D5U.computeStrides(i.shape)).buffer),s=new Uint8Array(new Int32Array(_).buffer),o=new Uint8Array(new Int32Array(w).buffer),u=new Uint8Array(new Int32Array(I).buffer),l=new Uint8Array(new Int32Array(h).buffer),d=new Uint8Array(new Int32Array(eO.D5U.computeStrides(h)).buffer),c=n.dataIdMap.get(e.dataId).id;eI(r,a,i.shape.length,s,o,u,l,d,h.length,c),t=reshape({inputs:{x:e},backend:n,attrs:{shape:m}}),n.disposeData(e.dataId)}return t}};var nQ=n(60573);let n0={kernelName:eO._JP,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{backend:t,inputs:n,attrs:r}=e,{data:a,dataSplits:i}=n,{separator:s,nGramWidths:o,leftPad:u,rightPad:l,padWidth:d,preserveShortSequences:c}=r,p=t.readSync(a.dataId),f=t.readSync(i.dataId),[h,m]=(0,nQ.A)(p,f,s,o,u,l,d,c),g=t.makeOutput([h.length],"string"),b=t.dataIdMap.get(g.dataId);b.stringBytes=h;let y=t.makeOutput(i.shape,"int32"),_=t.typedArrayFromHeap(y);return _.set(m),[g,y]}};var n1=n(70913);let n2={kernelName:eO.s1s,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{backend:t,inputs:n,attrs:r}=e,{input:a,delimiter:i}=n,{skipEmpty:s}=r,o=t.readSync(a.dataId),u=t.readSync(i.dataId),[l,d,c]=(0,n1.Q)(o,u[0],s),p=d.length,f=t.makeOutput([p,2],"int32"),h=t.typedArrayFromHeap(f);h.set(l);let m=t.makeOutput([p],"string"),g=t.dataIdMap.get(m.dataId);g.stringBytes=d;let b=t.makeOutput([2],"int32"),y=t.typedArrayFromHeap(b);return y.set(c),[f,m,b]}};var n3=n(62322);let n6={kernelName:eO.XkS,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{backend:t,inputs:n,attrs:r}=e,{input:a}=n,{numBuckets:i}=r,s=t.readSync(a.dataId),o=(0,n3.h)(s,i),u=t.makeOutput(a.shape,"int32"),l=t.typedArrayFromHeap(u);return l.set(o),u}},n8=createBinaryKernelConfig(eO.Tr8,!0),n5={kernelName:eO.GBy,backendName:"wasm",setupFunc:function(e){ek=e.wasm.cwrap(eO.GBy,null,["number","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{axis:a,keepDims:i}=r,{x:s}=n,o=t.dataIdMap.get(s.dataId).id,u=o,l=s,{transposed:d,axes:c,originalAxes:p,inputWasTransposed:f}=permuteAxesAndTranspose(s,a,t),h=c;if(f){let e=t.dataIdMap.get(d.dataId).id;e!==o&&(l=d,u=e,h=eO.backend_util.getInnerMostAxes(h.length,l.shape.length))}eO.backend_util.assertAxesAreInnerMostDims("sum",h,l.shape.length);let[m,g]=eO.backend_util.computeOutAndReduceShapes(l.shape,h),b=eO.D5U.sizeFromShape(g),y=t.makeOutput(m,l.dtype);if(0!==eO.D5U.sizeFromShape(l.shape)){let e=t.dataIdMap.get(y.dataId).id;ek(u,b,eD[y.dtype],e)}if(f&&t.disposeData(d.dataId),i){let e=eO.backend_util.expandShapeToKeepDim(y.shape,p);y.shape=e}return y}},n4=createUnaryKernelConfig(eO.sEM),n7=createUnaryKernelConfig(eO.MIZ),n9={kernelName:eO.SIB,backendName:"wasm",setupFunc:function(e){eS=e.wasm.cwrap(eO.SIB,null,["number","number","number","number","number","number","array","number","number","number"])},kernelFunc:function(e){let{backend:t,inputs:n,attrs:r}=e,{tensor:a,indices:i,updates:s}=n,{}=r,o=t.makeOutput(a.shape,a.dtype);if(0===eO.D5U.sizeFromShape(a.shape))return o;let{sliceRank:u,numUpdates:l,sliceSize:d,strides:c,outputSize:p}=eO.yV1.calculateShapes(s,i,a.shape),f=t.dataIdMap.get(i.dataId),h=f.id,m=t.dataIdMap.get(s.dataId),g=m.id,b=t.dataIdMap.get(a.dataId),y=b.id,_=new Uint8Array(new Int32Array(c).buffer),w=t.dataIdMap.get(o.dataId).id;return eS(h,g,eD[s.dtype],u,l,d,_,p,w,y),o}},re={kernelName:eO.n9L,backendName:"wasm",setupFunc:function(e){ev=e.wasm.cwrap(eO.n9L,null,["number","array","number","array","number","number"])},kernelFunc:function(e){let{inputs:t,backend:n,attrs:r}=e,{x:a}=t,i=n.dataIdMap.get(a.dataId).id,{reps:s}=r,o=Array(a.shape.length);for(let e=0;e<o.length;e++)o[e]=a.shape[e]*s[e];let u=new Uint8Array(new Int32Array(a.shape).buffer),l=new Uint8Array(new Int32Array(o).buffer),d=n.makeOutput(o,a.dtype),c=n.dataIdMap.get(d.dataId).id;return ev(i,u,a.shape.length,l,o.length,eD[d.dtype],c),d}},rt={kernelName:eO.cWu,backendName:"wasm",setupFunc:function(e){eA=e.wasm.cwrap(eO.cWu,null,["number","array","number","number","number","bool","number","number"])},kernelFunc:({inputs:e,backend:t,attrs:n})=>{let{x:r}=e,{k:a,sorted:i}=n,s=t.dataIdMap.get(r.dataId).id,o=new Uint8Array(new Int32Array(r.shape).buffer),u=r.shape.slice();u[u.length-1]=a;let l=t.makeOutput(u,r.dtype),d=t.dataIdMap.get(l.dataId).id,c=t.makeOutput(u,"int32"),p=t.dataIdMap.get(c.dataId).id;return eA(s,o,r.shape.length,eD[r.dtype],a,i,d,p),[l,c]}},rn={kernelName:eO.wx7,backendName:"wasm",setupFunc:function(e){eE=e.wasm.cwrap(eO.wx7,null,["number","number","bool","number","number","number","number","number","number","array","number","array","number","number","number","number","number"])},kernelFunc:function(e){let t;let{backend:n,inputs:r,attrs:a}=e,{image:i,transforms:s}=r,{interpolation:o,fillMode:u,fillValue:l,outputShape:d}=a,[c,p,f,h]=i.shape,[m,g]=null!=d?d:[p,f],b=[c,m,g,h],y=new Uint8Array(new Int32Array(eO.D5U.computeStrides(i.shape)).buffer),_=new Uint8Array(new Int32Array(eO.D5U.computeStrides(b)).buffer),w=n.makeOutput(b,i.dtype),I=n.dataIdMap.get(w.dataId).id,k=n.dataIdMap.get(i.dataId),S=k.id,v=n.dataIdMap.get(s.dataId),A=v.id;switch(u){case"constant":default:t=1;break;case"reflect":t=2;break;case"wrap":t=3;break;case"nearest":t=4}return eE(S,A,s.shape[0]>1,c,m,g,h,f,p,y,i.shape.length-1,_,b.length-1,"nearest"===o?1:2,t,l,I),w}};var rr=n(71777);let ra={kernelName:eO.kpP,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{inputs:t,attrs:n,backend:r}=e,{axis:a}=n,{x:i}=t,{outputValues:s,outputShape:o,indices:u}=(0,rr.S)(r.readSync(i.dataId),a,i.shape,i.dtype);return[r.makeOutput(o,i.dtype,void 0,s),r.makeOutput([u.length],"int32",void 0,u)]}},ri={kernelName:eO.ToN,backendName:"wasm",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:n,attrs:r}=e,{value:a}=t,{axis:i}=r;i<0&&(i+=a.shape.length);let s=a.shape[i],o=a.shape.length,u=Array(o-1),l=0;for(let e=0;e<o;e++)e!==i&&(u[l++]=a.shape[e]);let d=Array(s),c=Array(o).fill(0),p=a.shape.slice();p[i]=1;for(let e=0;e<d.length;e++)c[i]=e,d[e]=slice({inputs:{x:a},attrs:{begin:c,size:p},backend:n});return d.map(({dataId:e,dtype:t})=>({dataId:e,dtype:t,shape:u}))}},rs={kernelName:eO.RuY,backendName:"wasm",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:{x:t},backend:n}=e,r=n.makeOutput(t.shape,t.dtype),a=n.typedArrayFromHeap(r);return a.fill(0),r}},ro=[eU,eP,eC,e$,eL,eW,eV,eH,ej,eq,eK,eY,eZ,eX,eJ,eQ,e2,e0,e1,e6,e4,e7,e9,te,tt,tn,tr,ti,ts,to,tu,tl,td,tc,tp,tf,th,tm,tg,tb,ty,t_,tw,tI,tk,tS,tv,tA,tE,tM,tB,tx,tN,tD,tT,tR,tF,tO,tU,tP,tC,t$,tL,eG,tW,tG,tz,tV,tH,tj,tq,tY,tK,tZ,tX,tJ,tQ,t0,t1,t2,t3,t6,t8,t5,t4,t7,t9,ne,nt,nn,na,ni,ns,no,nu,nl,nd,nc,np,nf,nh,nm,ng,nb,ny,nw,nI,nk,nS,nv,e3,nA,nE,nM,nB,nx,nN,nD,nT,nR,nF,nO,nU,{kernelName:"Sigmoid",backendName:"wasm",setupFunc:function(e){em=e.wasm.cwrap(eO.a5O,null,["number","number"])},kernelFunc:function(e){let{backend:t,inputs:{x:n}}=e,r=t.dataIdMap.get(n.dataId).id,a=t.makeOutput(n.shape,n.dtype),i=t.dataIdMap.get(a.dataId).id;return 0===eO.D5U.sizeFromShape(a.shape)||em(r,i),a}},nP,nC,n$,e5,nr,nL,nW,nG,nz,nV,nH,nj,nq,nK,nY,nZ,nX,nJ,n0,n2,n6,n8,n5,n4,n7,n9,re,rt,rn,ez,ra,ri,rs];for(let e of ro)(0,eO.wCN)(e);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ru=(0,eO.OBj)();ru.registerFlag("WASM_HAS_SIMD_SUPPORT",async()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]))}catch(e){return!1}}),ru.registerFlag("WASM_HAS_MULTITHREAD_SUPPORT",async()=>{if(ru.get("IS_NODE"))return!1;try{return new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch(e){return!1}});var rl=n(38496),rd=n.n(rl),rc=n(17755),rp=n(77182),rf=n.n(rp);/**
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
 */let rh=rd()||rl,rm=rf()||rp;let BackendWasm=class BackendWasm extends eO.Zuw{constructor(e){super(),this.wasm=e,this.dataIdNextNumber=1,this.wasm.tfjs.initWithThreadsCount(rk),this.wasm.tfjs.getThreadsCount(),this.dataIdMap=new eO.JLz(this,(0,eO.SRH)())}write(e,t,n){let r={id:this.dataIdNextNumber++};return this.move(r,e,t,n,1),r}numDataIds(){return this.dataIdMap.numDataIds()}async time(e){let t=eO.D5U.now();e();let n=eO.D5U.now()-t;return{kernelMs:n}}move(e,t,n,r,a){let i=this.dataIdNextNumber++;if("string"===r){this.dataIdMap.set(e,{id:i,stringBytes:t,shape:n,dtype:r,memoryOffset:null,refCount:a});return}let s=eO.D5U.sizeFromShape(n),o=s*eO.D5U.bytesPerElement(r),u=this.wasm._malloc(o)>>>0;this.dataIdMap.set(e,{id:i,memoryOffset:u,shape:n,dtype:r,refCount:a}),this.wasm.tfjs.registerTensor(i,s,u),null!=t&&this.wasm.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,o),u)}async read(e){return this.readSync(e)}readSync(e,t,n){let{memoryOffset:r,dtype:a,shape:i,stringBytes:s}=this.dataIdMap.get(e);if("string"===a)return(null==t||0===t)&&(null==n||n>=s.length)?s:s.slice(t,n);t=t||0,n=n||eO.D5U.sizeFromShape(i);let o=eO.D5U.bytesPerElement(a),u=this.wasm.HEAPU8.slice(r+t*o,r+n*o);return function(e,t){switch(t){case"float32":return new Float32Array(e);case"int32":return new Int32Array(e);case"bool":return new Uint8Array(e);default:throw Error(`Unknown dtype ${t}`)}}(u.buffer,a)}disposeData(e,t=!1){if(this.dataIdMap.has(e)){let n=this.dataIdMap.get(e);if(n.refCount--,!t&&n.refCount>0)return!1;this.wasm._free(n.memoryOffset),this.wasm.tfjs.disposeData(n.id),this.dataIdMap.delete(e)}return!0}refCount(e){if(this.dataIdMap.has(e)){let t=this.dataIdMap.get(e);return t.refCount}return 0}incRef(e){let t=this.dataIdMap.get(e);null!=t&&t.refCount++}floatPrecision(){return 32}getMemoryOffset(e){return this.dataIdMap.get(e).memoryOffset}dispose(){this.wasm.tfjs.dispose(),"PThread"in this.wasm&&this.wasm.PThread.terminateAllThreads(),this.wasm=null}memory(){return{unreliable:!1}}makeOutput(e,t,n,r){let a;if(null==n)a=this.write(null!=r?r:null,e,t);else{let r=this.dataIdNextNumber++;a={id:r},this.dataIdMap.set(a,{id:r,memoryOffset:n,shape:e,dtype:t,refCount:1});let i=eO.D5U.sizeFromShape(e);this.wasm.tfjs.registerTensor(r,i,n)}return{dataId:a,shape:e,dtype:t}}typedArrayFromHeap({shape:e,dtype:t,dataId:n}){let r=this.wasm.HEAPU8.buffer,{memoryOffset:a}=this.dataIdMap.get(n),i=eO.D5U.sizeFromShape(e);switch(t){case"float32":return new Float32Array(r,a,i);case"int32":return new Int32Array(r,a,i);case"bool":return new Uint8Array(r,a,i);default:throw Error(`Unknown dtype ${t}`)}}};function getPathToWasmBinary(e,t,n){if(null!=rb)return rb;let r="tfjs-backend-wasm.wasm";return(e&&t?r="tfjs-backend-wasm-threaded-simd.wasm":e&&(r="tfjs-backend-wasm-simd.wasm"),null!=r_&&null!=r_[r])?r_[r]:n+r}async function init(){let[e,t]=await Promise.all([(0,eO.OBj)().getAsync("WASM_HAS_SIMD_SUPPORT"),(0,eO.OBj)().getAsync("WASM_HAS_MULTITHREAD_SUPPORT")]);return new Promise((n,r)=>{let a;let i={};if(i.locateFile=(n,r)=>{if(n.endsWith(".worker.js")){let e=rc.g.replace(/\n/g,"\\n"),t=new Blob([e],{type:"application/javascript"});return URL.createObjectURL(t)}return n.endsWith(".wasm")?getPathToWasmBinary(e,t,null!=ry?ry:r):r+n},rI){var s;i.instantiateWasm=(s=getPathToWasmBinary(e,t,null!=ry?ry:""),(e,t)=>(eO.D5U.fetch(s,{credentials:"same-origin"}).then(n=>{n.ok||e.env.a(`failed to load wasm binary file at '${s}'`),n.arrayBuffer().then(n=>{WebAssembly.instantiate(n,e).then(e=>{t(e.instance,e.module)})})}),{}))}let o=!1;i.onAbort=()=>{o||rw||(rw=!0,r({message:"Make sure the server can serve the `.wasm` file relative to the bundled js file. For more details see https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/README.md#using-bundlers"}))},t&&e&&null==rb?(i.mainScriptUrlOrBlob=new Blob(["var WasmBackendModuleThreadedSimd = "+rh.toString()],{type:"text/javascript"}),a=rh(i)):a=rm(i),a.then(e=>{o=!0,rw=!1,e.tfjs={init:e.cwrap("init",null,[]),initWithThreadsCount:e.cwrap("init_with_threads_count",null,["number"]),getThreadsCount:e.cwrap("get_threads_count","number",[]),registerTensor:e.cwrap("register_tensor",null,["number","number","number"]),disposeData:e.cwrap("dispose_data",null,["number"]),dispose:e.cwrap("dispose",null,[])},n({wasm:e})}).catch(r)})}let rg=["tfjs-backend-wasm.wasm","tfjs-backend-wasm-simd.wasm","tfjs-backend-wasm-threaded-simd.wasm"],rb=null,ry=null,r_={},rw=!1,rI=!1;function setWasmPaths(e,t=!1){if(rw)throw Error("The WASM backend was already initialized. Make sure you call `setWasmPaths()` before you call `tf.setBackend()` or `tf.ready()`");if("string"==typeof e)ry=e;else{r_=e;let t=rg.filter(e=>null==r_[e]);if(t.length>0)throw Error(`There were no entries found for the following binaries: ${t.join(",")}. Please either call setWasmPaths with a map providing a path for each binary, or with a string indicating the directory where all the binaries can be found.`)}rI=t}let rk=-1;(0,eO.jqO)("wasm",async()=>{let{wasm:e}=await init();return new BackendWasm(e)},2);/**
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
 */},38496:function(e,t,n){var r,a=n(28070),i=(r=(r="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0)||"/index.js",function(e){function GROWABLE_HEAP_U8(){return c.buffer!=f&&updateGlobalBufferAndViews(c.buffer),m}function GROWABLE_HEAP_I32(){return c.buffer!=f&&updateGlobalBufferAndViews(c.buffer),g}function GROWABLE_HEAP_U32(){return c.buffer!=f&&updateGlobalBufferAndViews(c.buffer),b}function GROWABLE_HEAP_F64(){return c.buffer!=f&&updateGlobalBufferAndViews(c.buffer),y}var t,i,s,o,u,l,d,c,p,f,h,m,g,b,y,_,w,I,k,S,v,A=void 0!==(e=e||{})?e:{};A.ready=new Promise(function(e,n){t=e,i=n}),void 0!==a&&a.listeners&&(s={uncaughtException:a.listeners("uncaughtException"),unhandledRejection:a.listeners("unhandledRejection")});var M=Object.assign({},A),B=[],quit_=(e,t)=>{throw t},x="object"==typeof window,N="function"==typeof importScripts,D="object"==typeof a&&"object"==typeof a.versions&&"string"==typeof a.versions.node,T=A.ENVIRONMENT_IS_PTHREAD||!1,R="";function locateFile(e){return A.locateFile?A.locateFile(e,R):R+e}if(D){let e;var F=n(65944),O=n(82437);R=N?O.dirname(R)+"/":"//",o=(e,t)=>(e=isFileURI(e)?new URL(e):O.normalize(e),F.readFileSync(e,t?void 0:"utf8")),l=e=>{var t=o(e,!0);return t.buffer||(t=new Uint8Array(t)),t},u=(e,t,n)=>{e=isFileURI(e)?new URL(e):O.normalize(e),F.readFile(e,function(e,r){e?n(e):t(r.buffer)})},a.argv.length>1&&a.argv[1].replace(/\\/g,"/"),B=a.argv.slice(2),a.on("uncaughtException",function(e){if(!(e instanceof ExitStatus))throw e}),a.on("unhandledRejection",function(e){throw e}),quit_=(e,t)=>{if(L)throw a.exitCode=e,t;t instanceof ExitStatus||$("exiting due to exception: "+t),a.exit(e)},A.inspect=function(){return"[Emscripten Module object]"};try{e=n(6009)}catch(e){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),e}n.g.Worker=e.Worker}else(x||N)&&(N?R=self.location.href:"undefined"!=typeof document&&document.currentScript&&(R=document.currentScript.src),void 0!==r&&r&&(R=r),R=0!==R.indexOf("blob:")?R.substr(0,R.replace(/[?#].*/,"").lastIndexOf("/")+1):"",D||(o=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},N&&(l=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),u=(e,t,n)=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=()=>{if(200==r.status||0==r.status&&r.response){t(r.response);return}n()},r.onerror=n,r.send(null)}));D&&"undefined"==typeof performance&&(n.g.performance=n(94345).performance);var U=console.log.bind(console),P=console.warn.bind(console);D&&(U=e=>F.writeSync(1,e+"\n"),P=e=>F.writeSync(2,e+"\n"));var C=A.print||U,$=A.printErr||P;Object.assign(A,M),M=null,A.arguments&&(B=A.arguments),A.thisProgram&&A.thisProgram,A.quit&&(quit_=A.quit),Atomics.load,Atomics.store,Atomics.compareExchange,A.wasmBinary&&(d=A.wasmBinary);var L=A.noExitRuntime||!0;"object"!=typeof WebAssembly&&abort("no native wasm support detected");var W=!1,G="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function UTF8ArrayToString(e,t,n){for(var r=(t>>>=0)+n,a=t;e[a]&&!(a>=r);)++a;if(a-t>16&&e.buffer&&G)return G.decode(e.buffer instanceof SharedArrayBuffer?e.slice(t,a):e.subarray(t,a));for(var i="";t<a;){var s=e[t++];if(!(128&s)){i+=String.fromCharCode(s);continue}var o=63&e[t++];if((224&s)==192){i+=String.fromCharCode((31&s)<<6|o);continue}var u=63&e[t++];if((s=(240&s)==224?(15&s)<<12|o<<6|u:(7&s)<<18|o<<12|u<<6|63&e[t++])<65536)i+=String.fromCharCode(s);else{var l=s-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}return i}function updateGlobalBufferAndViews(e){f=e,A.HEAP8=h=new Int8Array(e),A.HEAP16=new Int16Array(e),A.HEAP32=g=new Int32Array(e),A.HEAPU8=m=new Uint8Array(e),A.HEAPU16=new Uint16Array(e),A.HEAPU32=b=new Uint32Array(e),A.HEAPF32=new Float32Array(e),A.HEAPF64=y=new Float64Array(e)}T&&(f=A.buffer);var z=A.INITIAL_MEMORY||16777216;if(T)c=A.wasmMemory,f=A.buffer;else if(A.wasmMemory)c=A.wasmMemory;else if(!((c=new WebAssembly.Memory({initial:z/65536,maximum:65536,shared:!0})).buffer instanceof SharedArrayBuffer))throw $("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),D&&$("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");c&&(f=c.buffer),z=f.byteLength,updateGlobalBufferAndViews(f);var V=[],H=[],j=[],q=0,K=null,Y=null;function abort(e){A.onAbort&&A.onAbort(e),$(e="Aborted("+e+")"),W=!0,e+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(e);throw i(t),t}function isDataURI(e){return e.startsWith("data:application/octet-stream;base64,")}function isFileURI(e){return e.startsWith("file://")}function getBinary(e){try{if(e==w&&d)return new Uint8Array(d);if(l)return l(e);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}isDataURI(w="tfjs-backend-wasm-threaded-simd.wasm")||(w=locateFile(w));var Z={};function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function cleanupThread(e){var t=X.pthreads[e];t||abort(void 0),X.returnWorkerToPool(t)}function spawnThread(e){var t=X.getNewWorker();if(!t)return 6;X.runningWorkers.push(t),X.pthreads[e.pthread_ptr]=t,t.pthread_ptr=e.pthread_ptr;var n={cmd:"run",start_routine:e.startRoutine,arg:e.arg,pthread_ptr:e.pthread_ptr};return t.runPthread=()=>{D&&t.ref(),t.postMessage(n,e.transferList),delete t.runPthread},t.loaded&&t.runPthread(),0}function _proc_exit(e){if(T)return _emscripten_proxy_to_main_thread_js(1,1,e);L||(X.terminateAllThreads(),A.onExit&&A.onExit(e),W=!0),quit_(e,new ExitStatus(e))}var _exit=function(e,t){if(!t&&T)throw exitOnMainThread(e),"unwind";_proc_exit(e)},X={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){T?X.initWorker():X.initMainThread()},initMainThread:function(){for(var e=8;e--;)X.allocateUnusedWorker()},initWorker:function(){L=!1},setExitStatus:function(e){},terminateAllThreads:function(){for(var e of Object.values(X.pthreads))X.returnWorkerToPool(e);for(var e of X.unusedWorkers)e.terminate();X.unusedWorkers=[]},returnWorkerToPool:function(e){var t=e.pthread_ptr;delete X.pthreads[t],X.unusedWorkers.push(e),X.runningWorkers.splice(X.runningWorkers.indexOf(e),1),e.pthread_ptr=0,D&&e.unref(),eo(t)},receiveObjectTransfer:function(e){},threadInitTLS:function(){X.tlsInitFunctions.forEach(e=>e())},loadWasmModuleToWorker:function(e,t){e.onmessage=n=>{var r,a,i=n.data,s=i.cmd;if(e.pthread_ptr&&(X.currentProxiedOperationCallerThread=e.pthread_ptr),i.targetThread&&i.targetThread!=er()){var o=X.pthreads[i.targetThread];o?o.postMessage(i,i.transferList):$('Internal error! Worker sent a message "'+s+'" to target pthread '+i.targetThread+", but that thread no longer exists!"),X.currentProxiedOperationCallerThread=void 0;return}"processProxyingQueue"===s?executeNotifiedProxyingQueue(i.queue):"spawnThread"===s?spawnThread(i):"cleanupThread"===s?cleanupThread(i.thread):"killThread"===s?(r=i.thread,a=X.pthreads[r],delete X.pthreads[r],a.terminate(),eo(r),X.runningWorkers.splice(X.runningWorkers.indexOf(a),1),a.pthread_ptr=0):"cancelThread"===s?function(e){X.pthreads[e].postMessage({cmd:"cancel"})}(i.thread):"loaded"===s?(e.loaded=!0,D&&e.unref(),t&&t(e),e.runPthread&&e.runPthread()):"print"===s?C("Thread "+i.threadId+": "+i.text):"printErr"===s?$("Thread "+i.threadId+": "+i.text):"alert"===s?alert("Thread "+i.threadId+": "+i.text):"setimmediate"===i.target?e.postMessage(i):"callHandler"===s?A[i.handler](...i.args):s&&$("worker sent an unknown command "+s),X.currentProxiedOperationCallerThread=void 0},e.onerror=e=>{throw $("worker sent an error! "+e.filename+":"+e.lineno+": "+e.message),e},D&&(e.on("message",function(t){e.onmessage({data:t})}),e.on("error",function(t){e.onerror(t)}),e.on("detachedExit",function(){}));var n=[];for(var a of["onExit","onAbort","print","printErr"])A.hasOwnProperty(a)&&n.push(a);e.postMessage({cmd:"load",handlers:n,urlOrBlob:A.mainScriptUrlOrBlob||r,wasmMemory:c,wasmModule:p})},allocateUnusedWorker:function(){var e,t=locateFile("tfjs-backend-wasm-threaded-simd.worker.js");e=new Worker(t),X.unusedWorkers.push(e)},getNewWorker:function(){return 0==X.unusedWorkers.length&&(X.allocateUnusedWorker(),X.loadWasmModuleToWorker(X.unusedWorkers[0])),X.unusedWorkers.pop()}};function callRuntimeCallbacks(e){for(;e.length>0;)e.shift()(A)}function exitOnMainThread(e){if(T)return _emscripten_proxy_to_main_thread_js(2,0,e);try{_exit(e)}catch(e){var t;(t=e)instanceof ExitStatus||"unwind"==t||quit_(1,t)}}A.PThread=X,A.establishStackSpace=function(){var e=er(),t=GROWABLE_HEAP_I32()[e+52>>>2],n=t-GROWABLE_HEAP_I32()[e+56>>>2];el(t,n),ec(t)};var J=[];function pthreadCreateProxied(e,t,n,r){return T?_emscripten_proxy_to_main_thread_js(3,1,e,t,n,r):___pthread_create_js(e,t,n,r)}function ___pthread_create_js(e,t,n,r){if("undefined"==typeof SharedArrayBuffer)return $("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var a=[];if(T&&0===a.length)return pthreadCreateProxied(e,t,n,r);var i={startRoutine:n,pthread_ptr:e,arg:r,transferList:a};return T?(i.cmd="spawnThread",postMessage(i,a),0):spawnThread(i)}function executeNotifiedProxyingQueue(e){Atomics.store(GROWABLE_HEAP_I32(),e>>2,1),er()&&es(e),Atomics.compareExchange(GROWABLE_HEAP_I32(),e>>2,1,0)}function warnOnce(e){warnOnce.shown||(warnOnce.shown={}),warnOnce.shown[e]||(warnOnce.shown[e]=1,D&&(e="warning: "+e),$(e))}function getHeapMax(){return 4294901760}function _emscripten_proxy_to_main_thread_js(e,t){var n,r,a=arguments.length-2,i=arguments;return n=ed(),r=(()=>{for(var n=ep(8*a),r=n>>3,s=0;s<a;s++){var o=i[2+s];GROWABLE_HEAP_F64()[r+s>>>0]=o}return ei(e,a,n,t)})(),ec(n),r}A.invokeEntryPoint=function(e,t){var n,r=((n=J[e])||(e>=J.length&&(J.length=e+1),J[e]=n=_.get(e)),n)(t);L?X.setExitStatus(r):eu(r)},A.executeNotifiedProxyingQueue=executeNotifiedProxyingQueue,I=D?()=>{var e=a.hrtime();return 1e3*e[0]+e[1]/1e6}:()=>performance.timeOrigin+performance.now();var Q=[];function _fd_close(e){return T?_emscripten_proxy_to_main_thread_js(4,1,e):52}function _fd_seek(e,t,n,r,a){return T?_emscripten_proxy_to_main_thread_js(5,1,e,t,n,r,a):70}var ee=[null,[],[]];function _fd_write(e,t,n,r){if(T)return _emscripten_proxy_to_main_thread_js(6,1,e,t,n,r);for(var a=0,i=0;i<n;i++){var s=GROWABLE_HEAP_U32()[t>>>2],o=GROWABLE_HEAP_U32()[t+4>>>2];t+=8;for(var u=0;u<o;u++)!function(e,t){var n=ee[e];0===t||10===t?((1===e?C:$)(UTF8ArrayToString(n,0)),n.length=0):n.push(t)}(e,GROWABLE_HEAP_U8()[s+u>>>0]);a+=o}return GROWABLE_HEAP_U32()[r>>>2]=a,0}X.init();var et=[null,_proc_exit,exitOnMainThread,pthreadCreateProxied,_fd_close,_fd_seek,_fd_write],en={__emscripten_init_main_thread_js:function(e){ea(e,!N,1,!x),X.threadInitTLS()},__emscripten_thread_cleanup:function(e){T?postMessage({cmd:"cleanupThread",thread:e}):cleanupThread(e)},__pthread_create_js:___pthread_create_js,_emscripten_default_pthread_stack_size:function(){return 65536},_emscripten_get_now_is_monotonic:function(){return!0},_emscripten_notify_task_queue:function(e,t,n,r){if(e==t)setTimeout(()=>executeNotifiedProxyingQueue(r));else if(T)postMessage({targetThread:e,cmd:"processProxyingQueue",queue:r});else{var a=X.pthreads[e];if(!a)return;a.postMessage({cmd:"processProxyingQueue",queue:r})}return 1},_emscripten_set_offscreencanvas_size:function(e,t,n){return -1},abort:function(){abort("")},emscripten_check_blocking_allowed:function(){!D&&(N||warnOnce("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"))},emscripten_date_now:function(){return Date.now()},emscripten_get_heap_max:function(){return getHeapMax()},emscripten_get_now:I,emscripten_memcpy_big:function(e,t,n){GROWABLE_HEAP_U8().copyWithin(e>>>0,t>>>0,t+n>>>0)},emscripten_num_logical_cores:function(){return D?n(66322).cpus().length:navigator.hardwareConcurrency},emscripten_receive_on_main_thread_js:function(e,t,n){Q.length=t;for(var r=n>>3,a=0;a<t;a++)Q[a]=GROWABLE_HEAP_F64()[r+a>>>0];return(e<0?Z[-e-1]:et[e]).apply(null,Q)},emscripten_resize_heap:function(e){var t=GROWABLE_HEAP_U8().length;if((e>>>=0)<=t)return!1;var n=getHeapMax();if(e>n)return!1;let alignUp=(e,t)=>e+(t-e%t)%t;for(var r=1;r<=4;r*=2){var a=t*(1+.2/r);if(a=Math.min(a,e+100663296),function(e){try{return c.grow(e-f.byteLength+65535>>>16),updateGlobalBufferAndViews(c.buffer),1}catch(e){}}(Math.min(n,alignUp(Math.max(e,a),65536))))return!0}return!1},emscripten_unwind_to_js_event_loop:function(){throw"unwind"},exit:_exit,fd_close:_fd_close,fd_seek:_fd_seek,fd_write:_fd_write,memory:c||A.wasmMemory};(function(){var e={env:en,wasi_snapshot_preview1:en};function receiveInstance(e,t){var n,r,a=e.exports;if(A.asm=a,n=A.asm._emscripten_tls_init,X.tlsInitFunctions.push(n),_=A.asm.__indirect_function_table,r=A.asm.__wasm_call_ctors,H.unshift(r),p=t,!T){var i=X.unusedWorkers.length;X.unusedWorkers.forEach(function(e){X.loadWasmModuleToWorker(e,function(){--i||function(e){if(q--,A.monitorRunDependencies&&A.monitorRunDependencies(q),0==q&&(null!==K&&(clearInterval(K),K=null),Y)){var t=Y;Y=null,t()}}(0)})})}}function receiveInstantiationResult(e){receiveInstance(e.instance,e.module)}function instantiateArrayBuffer(t){return(function(){if(!d&&(x||N)){if("function"==typeof fetch&&!isFileURI(w))return fetch(w,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+w+"'";return e.arrayBuffer()}).catch(function(){return getBinary(w)});if(u)return new Promise(function(e,t){u(w,function(t){e(new Uint8Array(t))},t)})}return Promise.resolve().then(function(){return getBinary(w)})})().then(function(t){return WebAssembly.instantiate(t,e)}).then(function(e){return e}).then(t,function(e){$("failed to asynchronously prepare wasm: "+e),abort(e)})}if(!T&&(q++,A.monitorRunDependencies&&A.monitorRunDependencies(q)),A.instantiateWasm)try{return A.instantiateWasm(e,receiveInstance)}catch(e){$("Module.instantiateWasm callback failed with error: "+e),i(e)}(d||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(w)||isFileURI(w)||D||"function"!=typeof fetch?instantiateArrayBuffer(receiveInstantiationResult):fetch(w,{credentials:"same-origin"}).then(function(t){return WebAssembly.instantiateStreaming(t,e).then(receiveInstantiationResult,function(e){return $("wasm streaming compile failed: "+e),$("falling back to ArrayBuffer instantiation"),instantiateArrayBuffer(receiveInstantiationResult)})})).catch(i)})(),A.___wasm_call_ctors=function(){return(A.___wasm_call_ctors=A.asm.__wasm_call_ctors).apply(null,arguments)},A._init=function(){return(A._init=A.asm.init).apply(null,arguments)},A._init_with_threads_count=function(){return(A._init_with_threads_count=A.asm.init_with_threads_count).apply(null,arguments)},A._get_threads_count=function(){return(A._get_threads_count=A.asm.get_threads_count).apply(null,arguments)},A._register_tensor=function(){return(A._register_tensor=A.asm.register_tensor).apply(null,arguments)},A._dispose_data=function(){return(A._dispose_data=A.asm.dispose_data).apply(null,arguments)},A._dispose=function(){return(A._dispose=A.asm.dispose).apply(null,arguments)},A._Abs=function(){return(A._Abs=A.asm.Abs).apply(null,arguments)},A._Acos=function(){return(A._Acos=A.asm.Acos).apply(null,arguments)},A._Acosh=function(){return(A._Acosh=A.asm.Acosh).apply(null,arguments)},A._Add=function(){return(A._Add=A.asm.Add).apply(null,arguments)},A._AddN=function(){return(A._AddN=A.asm.AddN).apply(null,arguments)},A._All=function(){return(A._All=A.asm.All).apply(null,arguments)},A._Any=function(){return(A._Any=A.asm.Any).apply(null,arguments)},A._ArgMax=function(){return(A._ArgMax=A.asm.ArgMax).apply(null,arguments)},A._ArgMin=function(){return(A._ArgMin=A.asm.ArgMin).apply(null,arguments)},A._Asin=function(){return(A._Asin=A.asm.Asin).apply(null,arguments)},A._Asinh=function(){return(A._Asinh=A.asm.Asinh).apply(null,arguments)},A._Atan=function(){return(A._Atan=A.asm.Atan).apply(null,arguments)},A._Atan2=function(){return(A._Atan2=A.asm.Atan2).apply(null,arguments)},A._Atanh=function(){return(A._Atanh=A.asm.Atanh).apply(null,arguments)},A._AvgPool=function(){return(A._AvgPool=A.asm.AvgPool).apply(null,arguments)},A._AvgPool3D=function(){return(A._AvgPool3D=A.asm.AvgPool3D).apply(null,arguments)},A._AvgPool3DGrad=function(){return(A._AvgPool3DGrad=A.asm.AvgPool3DGrad).apply(null,arguments)},A._AvgPoolGrad=function(){return(A._AvgPoolGrad=A.asm.AvgPoolGrad).apply(null,arguments)},A._BatchMatMul=function(){return(A._BatchMatMul=A.asm.BatchMatMul).apply(null,arguments)},A._Bincount=function(){return(A._Bincount=A.asm.Bincount).apply(null,arguments)},A._BitwiseAnd=function(){return(A._BitwiseAnd=A.asm.BitwiseAnd).apply(null,arguments)},A._Ceil=function(){return(A._Ceil=A.asm.Ceil).apply(null,arguments)},A._ClipByValue=function(){return(A._ClipByValue=A.asm.ClipByValue).apply(null,arguments)},A._Conv2D=function(){return(A._Conv2D=A.asm.Conv2D).apply(null,arguments)},A._Conv2DBackpropInput=function(){return(A._Conv2DBackpropInput=A.asm.Conv2DBackpropInput).apply(null,arguments)},A._Conv3D=function(){return(A._Conv3D=A.asm.Conv3D).apply(null,arguments)},A._Conv3DBackpropFilterV2=function(){return(A._Conv3DBackpropFilterV2=A.asm.Conv3DBackpropFilterV2).apply(null,arguments)},A._Conv3DBackpropInputV2=function(){return(A._Conv3DBackpropInputV2=A.asm.Conv3DBackpropInputV2).apply(null,arguments)},A._Cos=function(){return(A._Cos=A.asm.Cos).apply(null,arguments)},A._Cosh=function(){return(A._Cosh=A.asm.Cosh).apply(null,arguments)},A._CropAndResize=function(){return(A._CropAndResize=A.asm.CropAndResize).apply(null,arguments)},A._Cumprod=function(){return(A._Cumprod=A.asm.Cumprod).apply(null,arguments)},A._Cumsum=function(){return(A._Cumsum=A.asm.Cumsum).apply(null,arguments)},A._DenseBincount=function(){return(A._DenseBincount=A.asm.DenseBincount).apply(null,arguments)},A._DepthToSpace=function(){return(A._DepthToSpace=A.asm.DepthToSpace).apply(null,arguments)},A._DepthwiseConv2dNative=function(){return(A._DepthwiseConv2dNative=A.asm.DepthwiseConv2dNative).apply(null,arguments)},A._Diag=function(){return(A._Diag=A.asm.Diag).apply(null,arguments)},A._Dilation2D=function(){return(A._Dilation2D=A.asm.Dilation2D).apply(null,arguments)},A._Dilation2DBackpropFilter=function(){return(A._Dilation2DBackpropFilter=A.asm.Dilation2DBackpropFilter).apply(null,arguments)},A._Dilation2DBackpropInput=function(){return(A._Dilation2DBackpropInput=A.asm.Dilation2DBackpropInput).apply(null,arguments)},A._Elu=function(){return(A._Elu=A.asm.Elu).apply(null,arguments)},A._EluGrad=function(){return(A._EluGrad=A.asm.EluGrad).apply(null,arguments)},A._Equal=function(){return(A._Equal=A.asm.Equal).apply(null,arguments)},A._Erf=function(){return(A._Erf=A.asm.Erf).apply(null,arguments)},A._Exp=function(){return(A._Exp=A.asm.Exp).apply(null,arguments)},A._Expm1=function(){return(A._Expm1=A.asm.Expm1).apply(null,arguments)},A._FlipLeftRight=function(){return(A._FlipLeftRight=A.asm.FlipLeftRight).apply(null,arguments)},A._Floor=function(){return(A._Floor=A.asm.Floor).apply(null,arguments)},A._FloorDiv=function(){return(A._FloorDiv=A.asm.FloorDiv).apply(null,arguments)},A._FusedBatchNorm=function(){return(A._FusedBatchNorm=A.asm.FusedBatchNorm).apply(null,arguments)},A._FusedConv2D=function(){return(A._FusedConv2D=A.asm.FusedConv2D).apply(null,arguments)},A._FusedDepthwiseConv2D=function(){return(A._FusedDepthwiseConv2D=A.asm.FusedDepthwiseConv2D).apply(null,arguments)},A._Gather=function(){return(A._Gather=A.asm.Gather).apply(null,arguments)},A._GatherNd=function(){return(A._GatherNd=A.asm.GatherNd).apply(null,arguments)},A._Greater=function(){return(A._Greater=A.asm.Greater).apply(null,arguments)},A._GreaterEqual=function(){return(A._GreaterEqual=A.asm.GreaterEqual).apply(null,arguments)},A._IsFinite=function(){return(A._IsFinite=A.asm.IsFinite).apply(null,arguments)},A._IsInf=function(){return(A._IsInf=A.asm.IsInf).apply(null,arguments)},A._IsNan=function(){return(A._IsNan=A.asm.IsNan).apply(null,arguments)},A._LRN=function(){return(A._LRN=A.asm.LRN).apply(null,arguments)},A._LRNGrad=function(){return(A._LRNGrad=A.asm.LRNGrad).apply(null,arguments)},A._LeakyRelu=function(){return(A._LeakyRelu=A.asm.LeakyRelu).apply(null,arguments)},A._Less=function(){return(A._Less=A.asm.Less).apply(null,arguments)},A._LessEqual=function(){return(A._LessEqual=A.asm.LessEqual).apply(null,arguments)},A._LinSpace=function(){return(A._LinSpace=A.asm.LinSpace).apply(null,arguments)},A._Log=function(){return(A._Log=A.asm.Log).apply(null,arguments)},A._Log1p=function(){return(A._Log1p=A.asm.Log1p).apply(null,arguments)},A._LogicalAnd=function(){return(A._LogicalAnd=A.asm.LogicalAnd).apply(null,arguments)},A._LogicalNot=function(){return(A._LogicalNot=A.asm.LogicalNot).apply(null,arguments)},A._LogicalOr=function(){return(A._LogicalOr=A.asm.LogicalOr).apply(null,arguments)},A._LogicalXor=function(){return(A._LogicalXor=A.asm.LogicalXor).apply(null,arguments)},A._Max=function(){return(A._Max=A.asm.Max).apply(null,arguments)},A._MaxPool=function(){return(A._MaxPool=A.asm.MaxPool).apply(null,arguments)},A._MaxPool3D=function(){return(A._MaxPool3D=A.asm.MaxPool3D).apply(null,arguments)},A._MaxPool3DGrad=function(){return(A._MaxPool3DGrad=A.asm.MaxPool3DGrad).apply(null,arguments)},A._MaxPoolGrad=function(){return(A._MaxPoolGrad=A.asm.MaxPoolGrad).apply(null,arguments)},A._MaxPoolWithArgmax=function(){return(A._MaxPoolWithArgmax=A.asm.MaxPoolWithArgmax).apply(null,arguments)},A._Maximum=function(){return(A._Maximum=A.asm.Maximum).apply(null,arguments)},A._Mean=function(){return(A._Mean=A.asm.Mean).apply(null,arguments)},A._Min=function(){return(A._Min=A.asm.Min).apply(null,arguments)},A._Minimum=function(){return(A._Minimum=A.asm.Minimum).apply(null,arguments)},A._MirrorPad=function(){return(A._MirrorPad=A.asm.MirrorPad).apply(null,arguments)},A._Mod=function(){return(A._Mod=A.asm.Mod).apply(null,arguments)},A._Multinomial=function(){return(A._Multinomial=A.asm.Multinomial).apply(null,arguments)},A._Multiply=function(){return(A._Multiply=A.asm.Multiply).apply(null,arguments)},A._Neg=function(){return(A._Neg=A.asm.Neg).apply(null,arguments)},A._NonMaxSuppressionV3=function(){return(A._NonMaxSuppressionV3=A.asm.NonMaxSuppressionV3).apply(null,arguments)},A._NonMaxSuppressionV4=function(){return(A._NonMaxSuppressionV4=A.asm.NonMaxSuppressionV4).apply(null,arguments)},A._NonMaxSuppressionV5=function(){return(A._NonMaxSuppressionV5=A.asm.NonMaxSuppressionV5).apply(null,arguments)},A._NotEqual=function(){return(A._NotEqual=A.asm.NotEqual).apply(null,arguments)},A._OneHot=function(){return(A._OneHot=A.asm.OneHot).apply(null,arguments)},A._PadV2=function(){return(A._PadV2=A.asm.PadV2).apply(null,arguments)},A._Pow=function(){return(A._Pow=A.asm.Pow).apply(null,arguments)},A._Prelu=function(){return(A._Prelu=A.asm.Prelu).apply(null,arguments)},A._Prod=function(){return(A._Prod=A.asm.Prod).apply(null,arguments)},A._RealDiv=function(){return(A._RealDiv=A.asm.RealDiv).apply(null,arguments)},A._Reciprocal=function(){return(A._Reciprocal=A.asm.Reciprocal).apply(null,arguments)},A._Relu=function(){return(A._Relu=A.asm.Relu).apply(null,arguments)},A._Relu6=function(){return(A._Relu6=A.asm.Relu6).apply(null,arguments)},A._ResizeBilinear=function(){return(A._ResizeBilinear=A.asm.ResizeBilinear).apply(null,arguments)},A._ResizeBilinearGrad=function(){return(A._ResizeBilinearGrad=A.asm.ResizeBilinearGrad).apply(null,arguments)},A._ResizeNearestNeighbor=function(){return(A._ResizeNearestNeighbor=A.asm.ResizeNearestNeighbor).apply(null,arguments)},A._ResizeNearestNeighborGrad=function(){return(A._ResizeNearestNeighborGrad=A.asm.ResizeNearestNeighborGrad).apply(null,arguments)},A._Reverse=function(){return(A._Reverse=A.asm.Reverse).apply(null,arguments)},A._RotateWithOffset=function(){return(A._RotateWithOffset=A.asm.RotateWithOffset).apply(null,arguments)},A._Round=function(){return(A._Round=A.asm.Round).apply(null,arguments)},A._Rsqrt=function(){return(A._Rsqrt=A.asm.Rsqrt).apply(null,arguments)},A._ScatterNd=function(){return(A._ScatterNd=A.asm.ScatterNd).apply(null,arguments)},A._SearchSorted=function(){return(A._SearchSorted=A.asm.SearchSorted).apply(null,arguments)},A._SelectV2=function(){return(A._SelectV2=A.asm.SelectV2).apply(null,arguments)},A._Selu=function(){return(A._Selu=A.asm.Selu).apply(null,arguments)},A._Sigmoid=function(){return(A._Sigmoid=A.asm.Sigmoid).apply(null,arguments)},A._Sign=function(){return(A._Sign=A.asm.Sign).apply(null,arguments)},A._Sin=function(){return(A._Sin=A.asm.Sin).apply(null,arguments)},A._Sinh=function(){return(A._Sinh=A.asm.Sinh).apply(null,arguments)},A._Softmax=function(){return(A._Softmax=A.asm.Softmax).apply(null,arguments)},A._Softplus=function(){return(A._Softplus=A.asm.Softplus).apply(null,arguments)},A._SparseFillEmptyRows=function(){return(A._SparseFillEmptyRows=A.asm.SparseFillEmptyRows).apply(null,arguments)},A._SparseReshape=function(){return(A._SparseReshape=A.asm.SparseReshape).apply(null,arguments)},A._SparseSegmentReduction=function(){return(A._SparseSegmentReduction=A.asm.SparseSegmentReduction).apply(null,arguments)},A._SparseToDense=function(){return(A._SparseToDense=A.asm.SparseToDense).apply(null,arguments)},A._Sqrt=function(){return(A._Sqrt=A.asm.Sqrt).apply(null,arguments)},A._Square=function(){return(A._Square=A.asm.Square).apply(null,arguments)},A._SquaredDifference=function(){return(A._SquaredDifference=A.asm.SquaredDifference).apply(null,arguments)},A._Step=function(){return(A._Step=A.asm.Step).apply(null,arguments)},A._StridedSlice=function(){return(A._StridedSlice=A.asm.StridedSlice).apply(null,arguments)},A._Sub=function(){return(A._Sub=A.asm.Sub).apply(null,arguments)},A._Sum=function(){return(A._Sum=A.asm.Sum).apply(null,arguments)},A._Tan=function(){return(A._Tan=A.asm.Tan).apply(null,arguments)},A._Tanh=function(){return(A._Tanh=A.asm.Tanh).apply(null,arguments)},A._TensorScatterUpdate=function(){return(A._TensorScatterUpdate=A.asm.TensorScatterUpdate).apply(null,arguments)},A._Tile=function(){return(A._Tile=A.asm.Tile).apply(null,arguments)},A._TopK=function(){return(A._TopK=A.asm.TopK).apply(null,arguments)},A._Transform=function(){return(A._Transform=A.asm.Transform).apply(null,arguments)},A._Transpose=function(){return(A._Transpose=A.asm.Transpose).apply(null,arguments)},A.__FusedMatMul=function(){return(A.__FusedMatMul=A.asm._FusedMatMul).apply(null,arguments)},A._malloc=function(){return(A._malloc=A.asm.malloc).apply(null,arguments)},A._free=function(){return(A._free=A.asm.free).apply(null,arguments)},A.__emscripten_tls_init=function(){return(A.__emscripten_tls_init=A.asm._emscripten_tls_init).apply(null,arguments)};var er=A._pthread_self=function(){return(er=A._pthread_self=A.asm.pthread_self).apply(null,arguments)},ea=(A.___errno_location=function(){return(A.___errno_location=A.asm.__errno_location).apply(null,arguments)},A.__emscripten_thread_init=function(){return(ea=A.__emscripten_thread_init=A.asm._emscripten_thread_init).apply(null,arguments)}),ei=(A.__emscripten_thread_crashed=function(){return(A.__emscripten_thread_crashed=A.asm._emscripten_thread_crashed).apply(null,arguments)},A._emscripten_main_thread_process_queued_calls=function(){return(A._emscripten_main_thread_process_queued_calls=A.asm.emscripten_main_thread_process_queued_calls).apply(null,arguments)},A._emscripten_main_browser_thread_id=function(){return(A._emscripten_main_browser_thread_id=A.asm.emscripten_main_browser_thread_id).apply(null,arguments)},A._emscripten_run_in_main_runtime_thread_js=function(){return(ei=A._emscripten_run_in_main_runtime_thread_js=A.asm.emscripten_run_in_main_runtime_thread_js).apply(null,arguments)}),es=(A._emscripten_dispatch_to_thread_=function(){return(A._emscripten_dispatch_to_thread_=A.asm.emscripten_dispatch_to_thread_).apply(null,arguments)},A.__emscripten_proxy_execute_task_queue=function(){return(es=A.__emscripten_proxy_execute_task_queue=A.asm._emscripten_proxy_execute_task_queue).apply(null,arguments)}),eo=A.__emscripten_thread_free_data=function(){return(eo=A.__emscripten_thread_free_data=A.asm._emscripten_thread_free_data).apply(null,arguments)},eu=A.__emscripten_thread_exit=function(){return(eu=A.__emscripten_thread_exit=A.asm._emscripten_thread_exit).apply(null,arguments)},el=A._emscripten_stack_set_limits=function(){return(el=A._emscripten_stack_set_limits=A.asm.emscripten_stack_set_limits).apply(null,arguments)},ed=A.stackSave=function(){return(ed=A.stackSave=A.asm.stackSave).apply(null,arguments)},ec=A.stackRestore=function(){return(ec=A.stackRestore=A.asm.stackRestore).apply(null,arguments)},ep=A.stackAlloc=function(){return(ep=A.stackAlloc=A.asm.stackAlloc).apply(null,arguments)};function run(e){if(e=e||B,!(q>0)){if(T){t(A),T||callRuntimeCallbacks(H),startWorker(A);return}(function(){if(A.preRun)for("function"==typeof A.preRun&&(A.preRun=[A.preRun]);A.preRun.length;){var e;e=A.preRun.shift(),V.unshift(e)}callRuntimeCallbacks(V)})(),q>0||(A.setStatus?(A.setStatus("Running..."),setTimeout(function(){setTimeout(function(){A.setStatus("")},1),doRun()},1)):doRun())}function doRun(){!k&&(k=!0,A.calledRun=!0,W||(T||callRuntimeCallbacks(H),t(A),A.onRuntimeInitialized&&A.onRuntimeInitialized(),function(){if(!T){if(A.postRun)for("function"==typeof A.postRun&&(A.postRun=[A.postRun]);A.postRun.length;){var e;e=A.postRun.shift(),j.unshift(e)}callRuntimeCallbacks(j)}}()))}}if(A.dynCall_iijjiiii=function(){return(A.dynCall_iijjiiii=A.asm.dynCall_iijjiiii).apply(null,arguments)},A.dynCall_jiji=function(){return(A.dynCall_jiji=A.asm.dynCall_jiji).apply(null,arguments)},A.keepRuntimeAlive=function(){return L},A.wasmMemory=c,A.cwrap=function(e,t,n,r){var a=(n=n||[]).every(e=>"number"===e||"boolean"===e);return"string"!==t&&a&&!r?A["_"+e]:function(){return function(e,t,n,r,a){var i,s,o={string:e=>{var t=0;if(null!=e&&0!==e){var n,r=(e.length<<2)+1;n=t=ep(r),function(e,t,n,r){if(n>>>=0,r>0){for(var a=n+r-1,i=0;i<e.length;++i){var s=e.charCodeAt(i);if(s>=55296&&s<=57343&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++i)),s<=127){if(n>=a)break;t[n++>>>0]=s}else if(s<=2047){if(n+1>=a)break;t[n++>>>0]=192|s>>6,t[n++>>>0]=128|63&s}else if(s<=65535){if(n+2>=a)break;t[n++>>>0]=224|s>>12,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|63&s}else{if(n+3>=a)break;t[n++>>>0]=240|s>>18,t[n++>>>0]=128|s>>12&63,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|63&s}}t[n>>>0]=0}}(e,GROWABLE_HEAP_U8(),n,r)}return t},array:e=>{var t=ep(e.length);return(c.buffer!=f&&updateGlobalBufferAndViews(c.buffer),h).set(e,t>>>0),t}},u=A["_"+e],l=[],d=0;if(r)for(var p=0;p<r.length;p++){var m=o[n[p]];m?(0===d&&(d=ed()),l[p]=m(r[p])):l[p]=r[p]}var g=u.apply(null,l);return s=g,0!==d&&ec(d),g="string"===t?(i=s>>>0)?UTF8ArrayToString(GROWABLE_HEAP_U8(),i,void 0):"":"boolean"===t?!!s:s}(e,t,n,arguments,0)}},A.ExitStatus=ExitStatus,A.PThread=X,Y=function runCaller(){k||run(),k||(Y=runCaller)},A.preInit)for("function"==typeof A.preInit&&(A.preInit=[A.preInit]);A.preInit.length>0;)A.preInit.pop()();if(run(),s&&(S={uncaughtException:a.listeners("uncaughtException").filter(function(e){return!s.uncaughtException.indexOf(e)>-1}),unhandledRejection:a.listeners("unhandledRejection").filter(function(e){return!s.unhandledRejection.indexOf(e)>-1})}),"undefined"!=typeof WasmBackendModule)v=WasmBackendModule;else if(void 0!==e)v=e;else throw Error("Could not find wasm module in post.js");if(S){var ef=v._dispose;v._dispose=function(){ef(),S.uncaughtException.forEach(function(e){a.removeListener("uncaughtException",e)}),S.unhandledRejection.forEach(function(e){a.removeListener("unhandledRejection",e)})}}return e.ready});e.exports=i},17755:function(e){e.exports.g=`"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f)},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"
");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"})};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=function(){postMessage({cmd:"callHandler",handler:handler,args:[...arguments]})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}WasmBackendModuleThreadedSimd(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};`},77182:function(e,t,n){var r,a=n(28070),i=(r=(r="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0)||"/index.js",function(e){var t,i,s,o,u,l,d,c,p,f,h,m,g,b,y,_,w,I=void 0!==(e=e||{})?e:{};I.ready=new Promise(function(e,t){i=e,s=t}),void 0!==a&&a.listeners&&(o={uncaughtException:a.listeners("uncaughtException"),unhandledRejection:a.listeners("unhandledRejection")});var k=Object.assign({},I),S=[],v="object"==typeof window,A="function"==typeof importScripts,M="object"==typeof a&&"object"==typeof a.versions&&"string"==typeof a.versions.node,B="";if(M){var x=n(65944),N=n(82437);B=A?N.dirname(B)+"/":"//",u=(e,t)=>(e=isFileURI(e)?new URL(e):N.normalize(e),x.readFileSync(e,t?void 0:"utf8")),d=e=>{var t=u(e,!0);return t.buffer||(t=new Uint8Array(t)),t},l=(e,t,n)=>{e=isFileURI(e)?new URL(e):N.normalize(e),x.readFile(e,function(e,r){e?n(e):t(r.buffer)})},a.argv.length>1&&a.argv[1].replace(/\\/g,"/"),S=a.argv.slice(2),a.on("uncaughtException",function(e){if(!(e instanceof ExitStatus))throw e}),a.on("unhandledRejection",function(e){throw e}),I.inspect=function(){return"[Emscripten Module object]"}}else(v||A)&&(A?B=self.location.href:"undefined"!=typeof document&&document.currentScript&&(B=document.currentScript.src),r&&(B=r),B=0!==B.indexOf("blob:")?B.substr(0,B.replace(/[?#].*/,"").lastIndexOf("/")+1):"",u=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},A&&(d=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),l=(e,t,n)=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=()=>{if(200==r.status||0==r.status&&r.response){t(r.response);return}n()},r.onerror=n,r.send(null)});var D=I.print||console.log.bind(console),T=I.printErr||console.warn.bind(console);Object.assign(I,k),k=null,I.arguments&&(S=I.arguments),I.thisProgram&&I.thisProgram,I.quit&&I.quit,I.wasmBinary&&(c=I.wasmBinary),I.noExitRuntime,"object"!=typeof WebAssembly&&abort("no native wasm support detected");var R=!1,F="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function UTF8ArrayToString(e,t,n){for(var r=(t>>>=0)+n,a=t;e[a]&&!(a>=r);)++a;if(a-t>16&&e.buffer&&F)return F.decode(e.subarray(t,a));for(var i="";t<a;){var s=e[t++];if(!(128&s)){i+=String.fromCharCode(s);continue}var o=63&e[t++];if((224&s)==192){i+=String.fromCharCode((31&s)<<6|o);continue}var u=63&e[t++];if((s=(240&s)==224?(15&s)<<12|o<<6|u:(7&s)<<18|o<<12|u<<6|63&e[t++])<65536)i+=String.fromCharCode(s);else{var l=s-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}return i}function updateGlobalBufferAndViews(e){f=e,I.HEAP8=h=new Int8Array(e),I.HEAP16=new Int16Array(e),I.HEAP32=new Int32Array(e),I.HEAPU8=m=new Uint8Array(e),I.HEAPU16=new Uint16Array(e),I.HEAPU32=g=new Uint32Array(e),I.HEAPF32=new Float32Array(e),I.HEAPF64=new Float64Array(e)}I.INITIAL_MEMORY;var O=[],U=[],P=[],C=0,$=null,L=null;function abort(e){I.onAbort&&I.onAbort(e),T(e="Aborted("+e+")"),R=!0,e+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(e);throw s(t),t}function isDataURI(e){return e.startsWith("data:application/octet-stream;base64,")}function isFileURI(e){return e.startsWith("file://")}function getBinary(e){try{if(e==b&&c)return new Uint8Array(c);if(d)return d(e);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function callRuntimeCallbacks(e){for(;e.length>0;)e.shift()(I)}function getHeapMax(){return 4294901760}isDataURI(b="tfjs-backend-wasm.wasm")||(t=b,b=I.locateFile?I.locateFile(t,B):B+t);var W=[null,[],[]],G={abort:function(){abort("")},emscripten_get_heap_max:function(){return getHeapMax()},emscripten_memcpy_big:function(e,t,n){m.copyWithin(e>>>0,t>>>0,t+n>>>0)},emscripten_resize_heap:function(e){var t=m.length;e>>>=0;var n=getHeapMax();if(e>n)return!1;let alignUp=(e,t)=>e+(t-e%t)%t;for(var r=1;r<=4;r*=2){var a=t*(1+.2/r);if(a=Math.min(a,e+100663296),function(e){try{return p.grow(e-f.byteLength+65535>>>16),updateGlobalBufferAndViews(p.buffer),1}catch(e){}}(Math.min(n,alignUp(Math.max(e,a),65536))))return!0}return!1},fd_close:function(e){return 52},fd_seek:function(e,t,n,r,a){return 70},fd_write:function(e,t,n,r){for(var a=0,i=0;i<n;i++){var s=g[t>>>2],o=g[t+4>>>2];t+=8;for(var u=0;u<o;u++)!function(e,t){var n=W[e];0===t||10===t?((1===e?D:T)(UTF8ArrayToString(n,0)),n.length=0):n.push(t)}(e,m[s+u>>>0]);a+=o}return g[r>>>2]=a,0}};(function(){var e={env:G,wasi_snapshot_preview1:G};function receiveInstance(e,t){var n,r=e.exports;I.asm=r,updateGlobalBufferAndViews((p=I.asm.memory).buffer),I.asm.__indirect_function_table,n=I.asm.__wasm_call_ctors,U.unshift(n),function(e){if(C--,I.monitorRunDependencies&&I.monitorRunDependencies(C),0==C&&(null!==$&&(clearInterval($),$=null),L)){var t=L;L=null,t()}}(0)}function receiveInstantiationResult(e){receiveInstance(e.instance)}function instantiateArrayBuffer(t){return(function(){if(!c&&(v||A)){if("function"==typeof fetch&&!isFileURI(b))return fetch(b,{credentials:"same-origin"}).then(function(e){if(!e.ok)throw"failed to load wasm binary file at '"+b+"'";return e.arrayBuffer()}).catch(function(){return getBinary(b)});if(l)return new Promise(function(e,t){l(b,function(t){e(new Uint8Array(t))},t)})}return Promise.resolve().then(function(){return getBinary(b)})})().then(function(t){return WebAssembly.instantiate(t,e)}).then(function(e){return e}).then(t,function(e){T("failed to asynchronously prepare wasm: "+e),abort(e)})}if(C++,I.monitorRunDependencies&&I.monitorRunDependencies(C),I.instantiateWasm)try{return I.instantiateWasm(e,receiveInstance)}catch(e){T("Module.instantiateWasm callback failed with error: "+e),s(e)}(c||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(b)||isFileURI(b)||M||"function"!=typeof fetch?instantiateArrayBuffer(receiveInstantiationResult):fetch(b,{credentials:"same-origin"}).then(function(t){return WebAssembly.instantiateStreaming(t,e).then(receiveInstantiationResult,function(e){return T("wasm streaming compile failed: "+e),T("falling back to ArrayBuffer instantiation"),instantiateArrayBuffer(receiveInstantiationResult)})})).catch(s)})(),I.___wasm_call_ctors=function(){return(I.___wasm_call_ctors=I.asm.__wasm_call_ctors).apply(null,arguments)},I._init=function(){return(I._init=I.asm.init).apply(null,arguments)},I._init_with_threads_count=function(){return(I._init_with_threads_count=I.asm.init_with_threads_count).apply(null,arguments)},I._get_threads_count=function(){return(I._get_threads_count=I.asm.get_threads_count).apply(null,arguments)},I._register_tensor=function(){return(I._register_tensor=I.asm.register_tensor).apply(null,arguments)},I._dispose_data=function(){return(I._dispose_data=I.asm.dispose_data).apply(null,arguments)},I._dispose=function(){return(I._dispose=I.asm.dispose).apply(null,arguments)},I._Abs=function(){return(I._Abs=I.asm.Abs).apply(null,arguments)},I._Acos=function(){return(I._Acos=I.asm.Acos).apply(null,arguments)},I._Acosh=function(){return(I._Acosh=I.asm.Acosh).apply(null,arguments)},I._Add=function(){return(I._Add=I.asm.Add).apply(null,arguments)},I._AddN=function(){return(I._AddN=I.asm.AddN).apply(null,arguments)},I._All=function(){return(I._All=I.asm.All).apply(null,arguments)},I._Any=function(){return(I._Any=I.asm.Any).apply(null,arguments)},I._ArgMax=function(){return(I._ArgMax=I.asm.ArgMax).apply(null,arguments)},I._ArgMin=function(){return(I._ArgMin=I.asm.ArgMin).apply(null,arguments)},I._Asin=function(){return(I._Asin=I.asm.Asin).apply(null,arguments)},I._Asinh=function(){return(I._Asinh=I.asm.Asinh).apply(null,arguments)},I._Atan=function(){return(I._Atan=I.asm.Atan).apply(null,arguments)},I._Atan2=function(){return(I._Atan2=I.asm.Atan2).apply(null,arguments)},I._Atanh=function(){return(I._Atanh=I.asm.Atanh).apply(null,arguments)},I._AvgPool=function(){return(I._AvgPool=I.asm.AvgPool).apply(null,arguments)},I._AvgPool3D=function(){return(I._AvgPool3D=I.asm.AvgPool3D).apply(null,arguments)},I._AvgPool3DGrad=function(){return(I._AvgPool3DGrad=I.asm.AvgPool3DGrad).apply(null,arguments)},I._AvgPoolGrad=function(){return(I._AvgPoolGrad=I.asm.AvgPoolGrad).apply(null,arguments)},I._BatchMatMul=function(){return(I._BatchMatMul=I.asm.BatchMatMul).apply(null,arguments)},I._Bincount=function(){return(I._Bincount=I.asm.Bincount).apply(null,arguments)},I._BitwiseAnd=function(){return(I._BitwiseAnd=I.asm.BitwiseAnd).apply(null,arguments)},I._Ceil=function(){return(I._Ceil=I.asm.Ceil).apply(null,arguments)},I._ClipByValue=function(){return(I._ClipByValue=I.asm.ClipByValue).apply(null,arguments)},I._Conv2D=function(){return(I._Conv2D=I.asm.Conv2D).apply(null,arguments)},I._Conv2DBackpropInput=function(){return(I._Conv2DBackpropInput=I.asm.Conv2DBackpropInput).apply(null,arguments)},I._Conv3D=function(){return(I._Conv3D=I.asm.Conv3D).apply(null,arguments)},I._Conv3DBackpropFilterV2=function(){return(I._Conv3DBackpropFilterV2=I.asm.Conv3DBackpropFilterV2).apply(null,arguments)},I._Conv3DBackpropInputV2=function(){return(I._Conv3DBackpropInputV2=I.asm.Conv3DBackpropInputV2).apply(null,arguments)},I._Cos=function(){return(I._Cos=I.asm.Cos).apply(null,arguments)},I._Cosh=function(){return(I._Cosh=I.asm.Cosh).apply(null,arguments)},I._CropAndResize=function(){return(I._CropAndResize=I.asm.CropAndResize).apply(null,arguments)},I._Cumprod=function(){return(I._Cumprod=I.asm.Cumprod).apply(null,arguments)},I._Cumsum=function(){return(I._Cumsum=I.asm.Cumsum).apply(null,arguments)},I._DenseBincount=function(){return(I._DenseBincount=I.asm.DenseBincount).apply(null,arguments)},I._DepthToSpace=function(){return(I._DepthToSpace=I.asm.DepthToSpace).apply(null,arguments)},I._DepthwiseConv2dNative=function(){return(I._DepthwiseConv2dNative=I.asm.DepthwiseConv2dNative).apply(null,arguments)},I._Diag=function(){return(I._Diag=I.asm.Diag).apply(null,arguments)},I._Dilation2D=function(){return(I._Dilation2D=I.asm.Dilation2D).apply(null,arguments)},I._Dilation2DBackpropFilter=function(){return(I._Dilation2DBackpropFilter=I.asm.Dilation2DBackpropFilter).apply(null,arguments)},I._Dilation2DBackpropInput=function(){return(I._Dilation2DBackpropInput=I.asm.Dilation2DBackpropInput).apply(null,arguments)},I._Elu=function(){return(I._Elu=I.asm.Elu).apply(null,arguments)},I._EluGrad=function(){return(I._EluGrad=I.asm.EluGrad).apply(null,arguments)},I._Equal=function(){return(I._Equal=I.asm.Equal).apply(null,arguments)},I._Erf=function(){return(I._Erf=I.asm.Erf).apply(null,arguments)},I._Exp=function(){return(I._Exp=I.asm.Exp).apply(null,arguments)},I._Expm1=function(){return(I._Expm1=I.asm.Expm1).apply(null,arguments)},I._FlipLeftRight=function(){return(I._FlipLeftRight=I.asm.FlipLeftRight).apply(null,arguments)},I._Floor=function(){return(I._Floor=I.asm.Floor).apply(null,arguments)},I._FloorDiv=function(){return(I._FloorDiv=I.asm.FloorDiv).apply(null,arguments)},I._FusedBatchNorm=function(){return(I._FusedBatchNorm=I.asm.FusedBatchNorm).apply(null,arguments)},I._FusedConv2D=function(){return(I._FusedConv2D=I.asm.FusedConv2D).apply(null,arguments)},I._FusedDepthwiseConv2D=function(){return(I._FusedDepthwiseConv2D=I.asm.FusedDepthwiseConv2D).apply(null,arguments)},I._Gather=function(){return(I._Gather=I.asm.Gather).apply(null,arguments)},I._GatherNd=function(){return(I._GatherNd=I.asm.GatherNd).apply(null,arguments)},I._Greater=function(){return(I._Greater=I.asm.Greater).apply(null,arguments)},I._GreaterEqual=function(){return(I._GreaterEqual=I.asm.GreaterEqual).apply(null,arguments)},I._IsFinite=function(){return(I._IsFinite=I.asm.IsFinite).apply(null,arguments)},I._IsInf=function(){return(I._IsInf=I.asm.IsInf).apply(null,arguments)},I._IsNan=function(){return(I._IsNan=I.asm.IsNan).apply(null,arguments)},I._LRN=function(){return(I._LRN=I.asm.LRN).apply(null,arguments)},I._LRNGrad=function(){return(I._LRNGrad=I.asm.LRNGrad).apply(null,arguments)},I._LeakyRelu=function(){return(I._LeakyRelu=I.asm.LeakyRelu).apply(null,arguments)},I._Less=function(){return(I._Less=I.asm.Less).apply(null,arguments)},I._LessEqual=function(){return(I._LessEqual=I.asm.LessEqual).apply(null,arguments)},I._LinSpace=function(){return(I._LinSpace=I.asm.LinSpace).apply(null,arguments)},I._Log=function(){return(I._Log=I.asm.Log).apply(null,arguments)},I._Log1p=function(){return(I._Log1p=I.asm.Log1p).apply(null,arguments)},I._LogicalAnd=function(){return(I._LogicalAnd=I.asm.LogicalAnd).apply(null,arguments)},I._LogicalNot=function(){return(I._LogicalNot=I.asm.LogicalNot).apply(null,arguments)},I._LogicalOr=function(){return(I._LogicalOr=I.asm.LogicalOr).apply(null,arguments)},I._LogicalXor=function(){return(I._LogicalXor=I.asm.LogicalXor).apply(null,arguments)},I._Max=function(){return(I._Max=I.asm.Max).apply(null,arguments)},I._MaxPool=function(){return(I._MaxPool=I.asm.MaxPool).apply(null,arguments)},I._MaxPool3D=function(){return(I._MaxPool3D=I.asm.MaxPool3D).apply(null,arguments)},I._MaxPool3DGrad=function(){return(I._MaxPool3DGrad=I.asm.MaxPool3DGrad).apply(null,arguments)},I._MaxPoolGrad=function(){return(I._MaxPoolGrad=I.asm.MaxPoolGrad).apply(null,arguments)},I._MaxPoolWithArgmax=function(){return(I._MaxPoolWithArgmax=I.asm.MaxPoolWithArgmax).apply(null,arguments)},I._Maximum=function(){return(I._Maximum=I.asm.Maximum).apply(null,arguments)},I._Mean=function(){return(I._Mean=I.asm.Mean).apply(null,arguments)},I._Min=function(){return(I._Min=I.asm.Min).apply(null,arguments)},I._Minimum=function(){return(I._Minimum=I.asm.Minimum).apply(null,arguments)},I._MirrorPad=function(){return(I._MirrorPad=I.asm.MirrorPad).apply(null,arguments)},I._Mod=function(){return(I._Mod=I.asm.Mod).apply(null,arguments)},I._Multinomial=function(){return(I._Multinomial=I.asm.Multinomial).apply(null,arguments)},I._Multiply=function(){return(I._Multiply=I.asm.Multiply).apply(null,arguments)},I._Neg=function(){return(I._Neg=I.asm.Neg).apply(null,arguments)},I._NonMaxSuppressionV3=function(){return(I._NonMaxSuppressionV3=I.asm.NonMaxSuppressionV3).apply(null,arguments)},I._NonMaxSuppressionV4=function(){return(I._NonMaxSuppressionV4=I.asm.NonMaxSuppressionV4).apply(null,arguments)},I._NonMaxSuppressionV5=function(){return(I._NonMaxSuppressionV5=I.asm.NonMaxSuppressionV5).apply(null,arguments)},I._NotEqual=function(){return(I._NotEqual=I.asm.NotEqual).apply(null,arguments)},I._OneHot=function(){return(I._OneHot=I.asm.OneHot).apply(null,arguments)},I._PadV2=function(){return(I._PadV2=I.asm.PadV2).apply(null,arguments)},I._Pow=function(){return(I._Pow=I.asm.Pow).apply(null,arguments)},I._Prelu=function(){return(I._Prelu=I.asm.Prelu).apply(null,arguments)},I._Prod=function(){return(I._Prod=I.asm.Prod).apply(null,arguments)},I._RealDiv=function(){return(I._RealDiv=I.asm.RealDiv).apply(null,arguments)},I._Reciprocal=function(){return(I._Reciprocal=I.asm.Reciprocal).apply(null,arguments)},I._Relu=function(){return(I._Relu=I.asm.Relu).apply(null,arguments)},I._Relu6=function(){return(I._Relu6=I.asm.Relu6).apply(null,arguments)},I._ResizeBilinear=function(){return(I._ResizeBilinear=I.asm.ResizeBilinear).apply(null,arguments)},I._ResizeBilinearGrad=function(){return(I._ResizeBilinearGrad=I.asm.ResizeBilinearGrad).apply(null,arguments)},I._ResizeNearestNeighbor=function(){return(I._ResizeNearestNeighbor=I.asm.ResizeNearestNeighbor).apply(null,arguments)},I._ResizeNearestNeighborGrad=function(){return(I._ResizeNearestNeighborGrad=I.asm.ResizeNearestNeighborGrad).apply(null,arguments)},I._Reverse=function(){return(I._Reverse=I.asm.Reverse).apply(null,arguments)},I._RotateWithOffset=function(){return(I._RotateWithOffset=I.asm.RotateWithOffset).apply(null,arguments)},I._Round=function(){return(I._Round=I.asm.Round).apply(null,arguments)},I._Rsqrt=function(){return(I._Rsqrt=I.asm.Rsqrt).apply(null,arguments)},I._ScatterNd=function(){return(I._ScatterNd=I.asm.ScatterNd).apply(null,arguments)},I._SearchSorted=function(){return(I._SearchSorted=I.asm.SearchSorted).apply(null,arguments)},I._SelectV2=function(){return(I._SelectV2=I.asm.SelectV2).apply(null,arguments)},I._Selu=function(){return(I._Selu=I.asm.Selu).apply(null,arguments)},I._Sigmoid=function(){return(I._Sigmoid=I.asm.Sigmoid).apply(null,arguments)},I._Sign=function(){return(I._Sign=I.asm.Sign).apply(null,arguments)},I._Sin=function(){return(I._Sin=I.asm.Sin).apply(null,arguments)},I._Sinh=function(){return(I._Sinh=I.asm.Sinh).apply(null,arguments)},I._Softmax=function(){return(I._Softmax=I.asm.Softmax).apply(null,arguments)},I._Softplus=function(){return(I._Softplus=I.asm.Softplus).apply(null,arguments)},I._SparseFillEmptyRows=function(){return(I._SparseFillEmptyRows=I.asm.SparseFillEmptyRows).apply(null,arguments)},I._SparseReshape=function(){return(I._SparseReshape=I.asm.SparseReshape).apply(null,arguments)},I._SparseSegmentReduction=function(){return(I._SparseSegmentReduction=I.asm.SparseSegmentReduction).apply(null,arguments)},I._SparseToDense=function(){return(I._SparseToDense=I.asm.SparseToDense).apply(null,arguments)},I._Sqrt=function(){return(I._Sqrt=I.asm.Sqrt).apply(null,arguments)},I._Square=function(){return(I._Square=I.asm.Square).apply(null,arguments)},I._SquaredDifference=function(){return(I._SquaredDifference=I.asm.SquaredDifference).apply(null,arguments)},I._Step=function(){return(I._Step=I.asm.Step).apply(null,arguments)},I._StridedSlice=function(){return(I._StridedSlice=I.asm.StridedSlice).apply(null,arguments)},I._Sub=function(){return(I._Sub=I.asm.Sub).apply(null,arguments)},I._Sum=function(){return(I._Sum=I.asm.Sum).apply(null,arguments)},I._Tan=function(){return(I._Tan=I.asm.Tan).apply(null,arguments)},I._Tanh=function(){return(I._Tanh=I.asm.Tanh).apply(null,arguments)},I._TensorScatterUpdate=function(){return(I._TensorScatterUpdate=I.asm.TensorScatterUpdate).apply(null,arguments)},I._Tile=function(){return(I._Tile=I.asm.Tile).apply(null,arguments)},I._TopK=function(){return(I._TopK=I.asm.TopK).apply(null,arguments)},I._Transform=function(){return(I._Transform=I.asm.Transform).apply(null,arguments)},I._Transpose=function(){return(I._Transpose=I.asm.Transpose).apply(null,arguments)},I.__FusedMatMul=function(){return(I.__FusedMatMul=I.asm._FusedMatMul).apply(null,arguments)},I._malloc=function(){return(I._malloc=I.asm.malloc).apply(null,arguments)},I._free=function(){return(I._free=I.asm.free).apply(null,arguments)},I.___errno_location=function(){return(I.___errno_location=I.asm.__errno_location).apply(null,arguments)};var z=I.stackSave=function(){return(z=I.stackSave=I.asm.stackSave).apply(null,arguments)},V=I.stackRestore=function(){return(V=I.stackRestore=I.asm.stackRestore).apply(null,arguments)},H=I.stackAlloc=function(){return(H=I.stackAlloc=I.asm.stackAlloc).apply(null,arguments)};function run(e){e=e||S,!(C>0)&&(function(){if(I.preRun)for("function"==typeof I.preRun&&(I.preRun=[I.preRun]);I.preRun.length;){var e;e=I.preRun.shift(),O.unshift(e)}callRuntimeCallbacks(O)}(),C>0||(I.setStatus?(I.setStatus("Running..."),setTimeout(function(){setTimeout(function(){I.setStatus("")},1),doRun()},1)):doRun()));function doRun(){!y&&(y=!0,I.calledRun=!0,R||(callRuntimeCallbacks(U),i(I),I.onRuntimeInitialized&&I.onRuntimeInitialized(),function(){if(I.postRun)for("function"==typeof I.postRun&&(I.postRun=[I.postRun]);I.postRun.length;){var e;e=I.postRun.shift(),P.unshift(e)}callRuntimeCallbacks(P)}()))}}if(I.dynCall_iijjiiii=function(){return(I.dynCall_iijjiiii=I.asm.dynCall_iijjiiii).apply(null,arguments)},I.dynCall_jiji=function(){return(I.dynCall_jiji=I.asm.dynCall_jiji).apply(null,arguments)},I.cwrap=function(e,t,n,r){var a=(n=n||[]).every(e=>"number"===e||"boolean"===e);return"string"!==t&&a&&!r?I["_"+e]:function(){return function(e,t,n,r,a){var i,s,o={string:e=>{var t=0;if(null!=e&&0!==e){var n=(e.length<<2)+1;t=H(n),function(e,t,n,r){if(n>>>=0,r>0){for(var a=n+r-1,i=0;i<e.length;++i){var s=e.charCodeAt(i);if(s>=55296&&s<=57343&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++i)),s<=127){if(n>=a)break;t[n++>>>0]=s}else if(s<=2047){if(n+1>=a)break;t[n++>>>0]=192|s>>6,t[n++>>>0]=128|63&s}else if(s<=65535){if(n+2>=a)break;t[n++>>>0]=224|s>>12,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|63&s}else{if(n+3>=a)break;t[n++>>>0]=240|s>>18,t[n++>>>0]=128|s>>12&63,t[n++>>>0]=128|s>>6&63,t[n++>>>0]=128|63&s}}t[n>>>0]=0}}(e,m,t,n)}return t},array:e=>{var t=H(e.length);return h.set(e,t>>>0),t}},u=I["_"+e],l=[],d=0;if(r)for(var c=0;c<r.length;c++){var p=o[n[c]];p?(0===d&&(d=z()),l[c]=p(r[c])):l[c]=r[c]}var f=u.apply(null,l);return s=f,0!==d&&V(d),f="string"===t?(i=s>>>0)?UTF8ArrayToString(m,i,void 0):"":"boolean"===t?!!s:s}(e,t,n,arguments,0)}},L=function runCaller(){y||run(),y||(L=runCaller)},I.preInit)for("function"==typeof I.preInit&&(I.preInit=[I.preInit]);I.preInit.length>0;)I.preInit.pop()();if(run(),o&&(_={uncaughtException:a.listeners("uncaughtException").filter(function(e){return!o.uncaughtException.indexOf(e)>-1}),unhandledRejection:a.listeners("unhandledRejection").filter(function(e){return!o.unhandledRejection.indexOf(e)>-1})}),void 0!==e)w=e;else if("undefined"!=typeof WasmBackendModuleThreadedSimd)w=WasmBackendModuleThreadedSimd;else throw Error("Could not find wasm module in post.js");if(_){var j=w._dispose;w._dispose=function(){j(),_.uncaughtException.forEach(function(e){a.removeListener("uncaughtException",e)}),_.unhandledRejection.forEach(function(e){a.removeListener("unhandledRejection",e)})}}return e.ready});e.exports=i},28621:function(e,t,n){"use strict";n.d(t,{JL:function(){return DataStorage},Zu:function(){return KernelBackend}});let DataStorage=class DataStorage{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}};let KernelBackend=class KernelBackend{refCount(e){return notYetImplemented("refCount")}incRef(e){return notYetImplemented("incRef")}timerAvailable(){return!0}time(e){return notYetImplemented("time")}read(e){return notYetImplemented("read")}readSync(e){return notYetImplemented("readSync")}readToGPU(e,t){return notYetImplemented("readToGPU")}numDataIds(){return notYetImplemented("numDataIds")}disposeData(e,t){return notYetImplemented("disposeData")}write(e,t,n){return notYetImplemented("write")}move(e,t,n,r,a){return notYetImplemented("move")}createTensorFromGPUData(e,t,n){return notYetImplemented("createTensorFromGPUData")}memory(){return notYetImplemented("memory")}floatPrecision(){return notYetImplemented("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}dispose(){return notYetImplemented("dispose")}};function notYetImplemented(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}},57017:function(e,t,n){"use strict";/**
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
 */function mergeRealAndImagArrays(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let n=new Float32Array(2*e.length);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function splitRealAndImagArrays(e){let t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function complexWithEvenIndex(e){let t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function complexWithOddIndex(e){let t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function getComplexWithIndex(e,t){let n=e[2*t],r=e[2*t+1];return{real:n,imag:r}}function assignToTypedArray(e,t,n,r){e[2*r]=t,e[2*r+1]=n}function exponents(e,t){let n=new Float32Array(e/2),r=new Float32Array(e/2);for(let a=0;a<Math.ceil(e/2);a++){let i=(t?2:-2)*Math.PI*(a/e);n[a]=Math.cos(i),r[a]=Math.sin(i)}return{real:n,imag:r}}function exponent(e,t,n){let r=(n?2:-2)*Math.PI*(e/t),a=Math.cos(r),i=Math.sin(r);return{real:a,imag:i}}n.d(t,{Cs:function(){return mergeRealAndImagArrays},GH:function(){return complexWithEvenIndex},H3:function(){return complexWithOddIndex},KV:function(){return assignToTypedArray},cC:function(){return getComplexWithIndex},cf:function(){return splitRealAndImagArrays},mG:function(){return exponents},ts:function(){return exponent}})},73807:function(e,t,n){"use strict";n.d(t,{I2:function(){return decodeEinsumEquation},NX:function(){return checkEinsumDimSizes},O5:function(){return getEinsumComputePath},lu:function(){return getEinsumPermutation},qF:function(){return isIdentityPermutation}});var r=n(62347);let a=/->/g;function decodeEinsumEquation(e,t){e=e.replace(/\s/g,"");let n=(e.length-e.replace(a,"").length)/2;if(n<1)throw Error("Equations without an arrow are not supported.");if(n>1)throw Error('Equation must contain exactly one arrow ("->").');let[i,s]=e.split("->");(0,r.hu)(-1===i.indexOf("..."),()=>'The ellipsis notation ("...") is not supported yet.');let o=i.split(","),u=o.length;if(t!==u)throw Error(`Expected ${u} input tensors, received ${t}`);if(u>2)throw Error("Support for more than 2 input tensors is not implemented yet.");let l=[];for(let e=0;e<s.length;++e){let t=s[e];if(!o.some(e=>-1!==e.indexOf(t)))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);-1===l.indexOf(t)&&l.push(t)}for(let e=0;e<i.length;++e){let t=i[e];-1===l.indexOf(t)&&","!==t&&l.push(t)}let d=Array(o.length);for(let e=0;e<u;++e){if(new Set(o[e].split("")).size!==o[e].length)throw Error(`Found duplicate axes in input component ${o[e]}. Support for duplicate axes in input is not implemented yet.`);d[e]=[];for(let t=0;t<o[e].length;++t)d[e].push(l.indexOf(o[e][t]))}let c=l.length,p=s.length,f=[];for(let e=p;e<c;++e)f.push(e);return{allDims:l,summedDims:f,idDims:d}}function getEinsumPermutation(e,t){let n=Array(e);n.fill(-1);for(let e=0;e<t.length;++e)n[t[e]]=e;let r=[];for(let t=0;t<e;++t)-1===n[t]&&r.push(t);return{permutationIndices:n=n.filter(e=>-1!==e),expandDims:r}}function checkEinsumDimSizes(e,t,n){let a=Array(e);for(let e=0;e<n.length;++e){let i=n[e].shape;for(let n=0;n<t[e].length;++n)void 0===a[t[e][n]]?a[t[e][n]]=i[n]:(0,r.hu)(a[t[e][n]]===i[n],()=>`Expected dimension ${a[t[e][n]]} at axis ${n} of input shaped ${JSON.stringify(i)}, but got dimension ${i[n]}`)}}function getEinsumComputePath(e,t){let n=[],r=0;0===e.length&&e.push(-1),r=e.length+1;for(let e=0;e<r;++e)n.push([]);let a=[];for(let r=0;r<e.length;++r){let i=e[r],s=function(e,t){let n=[];for(let r=0;r<e.length;++r)(0===e[r].length||-1!==e[r].indexOf(t)||-1===t)&&n.push(r);return n}(t,i);for(let e of s)-1===a.indexOf(e)&&(n[r].push(e),a.push(e))}return{path:e,steps:n}}function isIdentityPermutation(e){return e.every((e,t)=>e===t)}},83067:function(e,t,n){"use strict";function defaultComparator(e,t){return e>t?1:e<t?-1:0}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nonMaxSuppressionV3Impl(e,t,n,r,a){return nonMaxSuppressionImpl_(e,t,n,r,a,0)}function nonMaxSuppressionV4Impl(e,t,n,r,a,i){return nonMaxSuppressionImpl_(e,t,n,r,a,0,!1,i,!0)}function nonMaxSuppressionV5Impl(e,t,n,r,a,i){return nonMaxSuppressionImpl_(e,t,n,r,a,i,!0)}function nonMaxSuppressionImpl_(e,t,n,r,a,i,s=!1,o=!1,u=!1){let l=[];for(let e=0;e<t.length;e++)t[e]>a&&l.push({score:t[e],boxIndex:e,suppressBeginIndex:0});l.sort(ascendingComparator);let d=i>0?-.5/i:0,c=[],p=[];for(;c.length<n&&l.length>0;){let t=l.pop(),{score:n,boxIndex:i,suppressBeginIndex:s}=t;if(n<a)break;let o=!1;for(let n=c.length-1;n>=s;--n){let s=function(e,t,n){let r=e.subarray(4*t,4*t+4),a=e.subarray(4*n,4*n+4),i=Math.min(r[0],r[2]),s=Math.min(r[1],r[3]),o=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),l=Math.min(a[0],a[2]),d=Math.min(a[1],a[3]),c=Math.max(a[0],a[2]),p=Math.max(a[1],a[3]),f=(o-i)*(u-s),h=(c-l)*(p-d);if(f<=0||h<=0)return 0;let m=Math.max(i,l),g=Math.max(s,d),b=Math.min(o,c),y=Math.min(u,p),_=Math.max(b-m,0)*Math.max(y-g,0);return _/(f+h-_)}(e,i,c[n]);if(s>=r){o=!0;break}if(t.score=t.score*function(e,t,n){let r=Math.exp(t*n*n);return n<=e?r:0}(r,d,s),t.score<=a)break}t.suppressBeginIndex=c.length,!o&&(t.score===n?(c.push(i),p.push(t.score)):t.score>a&&/**
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
 */function(e,t,n){let r=function(e,t,n){let r=0,a=e.length,i=0,s=!1;for(;r<a;){i=r+(a-r>>>1);let o=n(t,e[i]);o>0?r=i+1:(a=i,s=!o)}return s?r:-r-1}(e,t,n||defaultComparator),a=r<0?-(r+1):r;e.splice(a,0,t)}(l,t,ascendingComparator))}let f=c.length,h=n-f;o&&h>0&&(c.push(...Array(h).fill(0)),p.push(...Array(h).fill(0)));let m={selectedIndices:c};return s&&(m.selectedScores=p),u&&(m.validOutputs=f),m}function ascendingComparator(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}n.d(t,{GP:function(){return nonMaxSuppressionV3Impl},qP:function(){return nonMaxSuppressionV4Impl},pA:function(){return nonMaxSuppressionV5Impl}})},1688:function(e,t,n){"use strict";let r;var a=n(90890);n(60684);var i=n(52788),s=n(65686),o=n(7120),u=n(25749),l=n(64958);if((0,i.OB)().get("IS_BROWSER")){(0,i.OB)().setPlatform("browser",new /**
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
 */class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if("undefined"==typeof window||!(0,i.OB)().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();let t=this.functionRefs[e.data.index];t(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return(0,l.j)(e)}});try{u.xQ.registerManager(o.Ew.URL_SCHEME,new o.JL)}catch(e){}try{u.xQ.registerManager(s.ns.URL_SCHEME,new s.y$)}catch(e){}}var d=n(28070);/**
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
 */let c={importFetch:()=>n(35477)};(0,i.OB)().get("IS_NODE")&&!(0,i.OB)().get("IS_BROWSER")&&(0,i.OB)().setPlatform("node",new class{constructor(){this.util=n(65092),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return null!=(0,i.OB)().global.fetch?(0,i.OB)().global.fetch(e,t):(null==r&&(r=c.importFetch()),r(e,t))}now(){let e=d.hrtime();return 1e3*e[0]+e[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}});var p=n(25694),f=n(77869),h=n(45208),m=n(95766);/**
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
 */(0,a.wv)();let g={buffer:p.f,cast:f.p,clone:h.d,print:/**
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
 */function(e,t=!1){console.log(e.toString(t))}};(0,m.Vp)(g)},90890:function(e,t,n){"use strict";n.d(t,{BV:function(){return f},wv:function(){return getOrMakeEngine}});var r=n(28621),a=n(52788),i=n(9904),s=n(57004),o=n(36470),u=n(52020),l=n(87767),d=n(62347);/**
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
 */let Profiler=class Profiler{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new Logger)}profileKernel(e,t,n){let r,i;let holdResultWrapperFn=()=>{r=n()},s=l.now();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(holdResultWrapperFn);else{for(let e of(holdResultWrapperFn(),r))e.dataSync();i=Promise.resolve({kernelMs:l.now()-s})}if((0,a.OB)().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let t=0;t<r.length;t++){let n=r[t];n.data().then(t=>{!function(e,t,n){if("float32"===t)for(let t=0;t<e.length;t++){let r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}}(t,n.dtype,e)})}let o={kernelName:e,outputs:r,inputs:t,timeMs:i.then(e=>e.kernelMs),extraInfo:i.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")};return o}logKernelProfile(e){let{kernelName:t,outputs:n,timeMs:r,inputs:a,extraInfo:i}=e;n.forEach(e=>{Promise.all([e.data(),r,i]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],a,n[2])})})}};let Logger=class Logger{logKernelProfile(e,t,n,r,a,i){let s="number"==typeof r?d.oj(`${r}ms`,9):r.error,o=d.oj(e,25),u=t.rank,l=t.size,c=d.oj(t.shape.toString(),14),p="";for(let e in a){let n=a[e];if(null!=n){let r=n.shape||t.shape,a=r.length;p+=`${e}: ${a}D ${a>0?r:""} `}}console.log(`%c${o}	%c${s}	%c${u}D ${c}	%c${l}	%c${p}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};var c=n(95766),p=n(15813);/**
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
 */function isRegisteredKernelInvocation(e){return null!=e.kernelName}let EngineState=class EngineState{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}};let Engine=class Engine{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new EngineState}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t],r=await this.initializeBackend(n).success;if(r){await this.setBackend(n);return}}throw Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(!(e in this.registryFactory))return null;{let{asyncInit:t}=this.initializeBackend(e);if(t)return null}}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(u.Z(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(null==this.registryFactory[e])throw Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;let{success:t,asyncInit:n}=this.initializeBackend(e),r=n?await t:t;if(!r)return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Profiler(this.backendInstance),!0}setupRegisteredKernels(){let e=(0,o.tr)(this.backendName);e.forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){let t=(0,o.tr)(e);t.forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(null==t)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let n=t.factory();if(!n||n instanceof r.Zu||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};{let t=++this.pendingBackendInitId,r=n.then(n=>!(t<this.pendingBackendInitId)&&(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>!(t<this.pendingBackendInitId)&&(this.pendingBackendInit=null,u.Z(`Initialization of backend ${e} failed`),u.Z(n.stack||n.message),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}}catch(t){return u.Z(`Initialization of backend ${e} failed`),u.Z(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t],{success:r,asyncInit:a}=this.initializeBackend(n);if(a||r)return{name:n,asyncInit:a}}throw Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){let n=this.state.tensorInfo.get(t),r=n.backend,a=this.readSync(t),i=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,a,n.shape,n.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n,r=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>((n=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(e,t,n){e();try{let e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return Engine.nextTensorId++}nextVariableId(){return Engine.nextVariableId++}clone(e){let t=f.runKernel(s.iJz,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],e=>({x:()=>f.runKernel(s.RFZ,{x:e},{dtype:"float32"})}),[],{}),t}runKernel(e,t,n){null==this.backendName&&this.backend;let r=null!=(0,o.pI)(e,this.backendName);if(!r)throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,n){let r=this.backend.numDataIds(),a=0;n.forEach(e=>{a+="complex64"===e.dtype?3:1});let i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=r-t-a-i;if(s>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${s} data ids) after running '${e}'`)}runKernelFunc(e){let t,n,r,a;let i=[],s=this.isTapeOn(),u=this.state.numBytes,l=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;let c=isRegisteredKernelInvocation(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(isRegisteredKernelInvocation(e)){let{kernelName:t,inputs:a,attrs:u}=e;null==this.backendName&&this.backend;let l=(0,o.pI)(t,this.backendName);d.hu(null!=l,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),n=()=>{let e=this.backend.numDataIds();r=l.kernelFunc({inputs:a,attrs:u,backend:this.backend});let n=Array.isArray(r)?r:[r];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,n);let o=n.map(e=>null!=e.rank?e:this.makeTensorFromTensorInfo(e));if(s){let e=this.getTensorsForGradient(t,a,o);i=this.saveTensorsForBackwardMode(e)}return o}}else{let{forwardFunc:t}=e,saveFunc=e=>{s&&(i=e.map(e=>this.keep(this.clone(e))))};n=()=>{let e=this.backend.numDataIds();r=this.tidy(()=>t(this.backend,saveFunc));let n=Array.isArray(r)?r:[r];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,e,n),n}}let{inputs:p,attrs:f}=e,h=isRegisteredKernelInvocation(e)?null:e.backwardsFunc;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(a=this.profiler.profileKernel(c,p,()=>n()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(a),t=a.outputs):t=n()}),s&&this.addTapeNode(c,p,t,h,i,f),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-u,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-l,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(p).map(e=>null!=p[e]?p[e].shape:null),outputShapes:t.map(e=>e.shape),kernelTimeMs:a.timeMs,extraInfo:a.extraInfo}),Array.isArray(r)?t:t[0]}saveTensorsForBackwardMode(e){let t=e.map(e=>this.keep(this.clone(e)));return t}getTensorsForGradient(e,t,n){let r=(0,o.uk)(e);if(null!=r){let e;let a=r.inputsToSave||[],i=r.outputsToSave||[];r.saveAllInputs?(d.hu(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),e=Object.keys(t).map(e=>t[e])):e=a.map(e=>t[e]);let s=n.filter((e,t)=>i[t]);return e.concat(s)}return[]}makeTensor(e,t,n,r){if(null==e)throw Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;let a=e;"string"===n&&d.HD(e[0])&&(a=e.map(e=>l.encodeString(e)));let i=r.write(a,t,n),s=new c.es(t,n,i,this.nextTensorId());if(this.trackTensor(s,r),"string"===n){let e=this.state.tensorInfo.get(i),t=(0,d.Ub)(a);this.state.numBytes+=t-e.bytes,e.bytes=t}return s}makeTensorFromDataId(e,t,n,r){n=n||"float32";let a={dataId:e,shape:t,dtype:n};return this.makeTensorFromTensorInfo(a,r)}makeTensorFromTensorInfo(e,t){let{dataId:n,shape:r,dtype:a}=e,i=new c.es(r,a,n,this.nextTensorId());return this.trackTensor(i,t),i}makeVariable(e,t=!0,n,r){n=n||this.nextVariableId().toString(),null!=r&&r!==e.dtype&&(e=e.cast(r));let a=new c._w(e,t,n,this.nextTensorId());if(null!=this.state.registeredVariables[a.name])throw Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;let n=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(n=e.size*d.bT(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof c._w||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){let t=e.size*d.bT(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,n=this.state.numTensors;for(let r of(this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n,this.state.activeProfile.kernels))r.kernelTimeMs=await r.kernelTimeMs,r.extraInfo=await r.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,n,r,a,i){let s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:a},u=(0,o.uk)(e);null!=u&&(r=u.gradFunc),null!=r&&(s.gradient=e=>r((e=e.map((e,t)=>{if(null==e){let e=n[t],r=d.wT(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e})).length>1?e:e[0],a,i)),this.state.activeTape.push(s)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=(0,p.Vu)(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];t.kept||n.has(t.id)||t.dispose()}let r=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==r.id||this.track(e)})}gradients(e,t,n,r=!1){if(d.hu(t.length>0,()=>"gradients() received an empty list of xs."),null!=n&&"float32"!==n.dtype)throw Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);let a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));d.hu(a instanceof c.es,()=>"The result y returned by f() must be a tensor.");let i=/**
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
 */function(e,t,n){let r={},a={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){let i=e[n],s=i.inputs;for(let e in s){let n=s[e],o=!1;for(let e=0;e<t.length;e++)if(r[n.id]){i.outputs.forEach(e=>r[e.id]=!0),o=!0,a[i.id]=!0;break}if(o)break}}let i={};i[n.id]=!0;let s={};for(let t=e.length-1;t>=0;t--){let n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(i[n.outputs[e].id]){for(let e in r)i[r[e].id]=!0,s[n.id]=!0;break}}let o=[];for(let t=0;t<e.length;t++){let n=e[t];if(a[n.id]&&s[n.id]){let e={};for(let t in n.inputs){let a=n.inputs[t];r[a.id]&&(e[t]=a)}let t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,o.push(t)}}return o}(this.state.activeTape,t,a);if(!r&&0===i.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let e={};e[a.id]=null==n?function(e){let t=(0,d.p8)((0,d.NA)(e),"float32");return f.makeTensor(t,e,"float32")}(a.shape):n,function(e,t,n,r){for(let a=t.length-1;a>=0;a--){let i=t[a],s=[];if(i.outputs.forEach(t=>{let n=e[t.id];null!=n?s.push(n):s.push(null)}),null==i.gradient)throw Error(`Cannot compute gradient: gradient function not found for ${i.kernelName}.`);let o=i.gradient(s);for(let t in i.inputs){if(!(t in o))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(o)}.`);let a=n(()=>o[t]());if("float32"!==a.dtype)throw Error(`Error in gradient for op ${i.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${a.dtype}'`);let s=i.inputs[t];if(!d.cO(a.shape,s.shape))throw Error(`Error in gradient for op ${i.kernelName}. The gradient of input '${t}' has shape '${a.shape}', which does not match the shape of the input '${s.shape}'`);if(null==e[s.id])e[s.id]=a;else{let t=e[s.id];e[s.id]=r(t,a),t.dispose()}}}}(e,i,e=>this.tidy(e),add);let r=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:a,grads:r}})}customGrad(e){return d.hu(d.mf(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let n;d.hu(t.every(e=>e instanceof c.es),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let r={};return t.forEach((e,t)=>{r[t]=e}),this.runKernelFunc({forwardFunc:(r,a)=>(n=e(...[...t,a]),d.hu(n.value instanceof c.es,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),d.hu(d.mf(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{let a=n.gradFunc(e,r),i=Array.isArray(a)?a:[a];d.hu(i.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),d.hu(i.every(e=>e instanceof c.es),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let s={};return i.forEach((e,t)=>{s[t]=()=>e}),s},inputs:r})}}readSync(e){let t=this.state.tensorInfo.get(e);return t.backend.readSync(e)}read(e){let t=this.state.tensorInfo.get(e);return t.backend.read(e)}readToGPU(e,t){let n=this.state.tensorInfo.get(e);return n.backend.readToGPU(e,t)}async time(e){let t=(0,l.now)(),n=await this.backend.time(e);return n.wallMs=(0,l.now)()-t,n}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){for(let e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new EngineState,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};function getOrMakeEngine(){let e=(0,i.D)();if(null==e._tfengine){let t=new a.qA(e);e._tfengine=new Engine(t)}return(0,a.iG)(e._tfengine.ENV),(0,c.Vi)(()=>e._tfengine),e._tfengine}Engine.nextTensorId=0,Engine.nextVariableId=0;let f=getOrMakeEngine();function add(e,t){return f.runKernel(s.mm_,{a:e,b:t})}},52788:function(e,t,n){"use strict";n.d(t,{OB:function(){return env},iG:function(){return setEnvironmentGlobal},qA:function(){return Environment}});var r=n(62347);/**
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
 */let a="tfjsflags";let Environment=class Environment{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=getQueryParams,this.populateURLFlags()}setPlatform(e,t){null==this.platform||i.getBool("IS_TEST")||i.getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},null!=this.urlFlags[e]){let t=this.urlFlags[e];i.getBool("IS_TEST")||i.getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if((0,r.tI)(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;let e=this.getQueryParams(this.global.location.search);if(a in e){let t=e[a].split(",");t.forEach(e=>{let[t,n]=e.split(":");this.urlFlags[t]=function(e,t){let n=t.toLowerCase();return"true"===n||"false"===n?"true"===n:`${+n}`===n?+n:t}(0,n)})}}};function getQueryParams(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>{var r,a;return r=n[0],a=n[1],t[decodeURIComponent(r)]=decodeURIComponent(a||""),n.join("=")}),t}function env(){return i}let i=null;function setEnvironmentGlobal(e){i=e}},60684:function(e,t,n){"use strict";n(90890);var r=n(35562),a=n(52788),i=n(28070);/**
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
 */let s=(0,a.OB)();s.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),s.registerFlag("IS_BROWSER",()=>r.isBrowser()),s.registerFlag("IS_NODE",()=>void 0!==i&&void 0!==i.versions&&void 0!==i.versions.node),s.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),s.registerFlag("IS_SAFARI",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),s.registerFlag("PROD",()=>!1),s.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>s.getBool("DEBUG")),s.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),s.registerFlag("IS_TEST",()=>!1),s.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>s.getBool("DEBUG")),s.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),s.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),s.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1)},9904:function(e,t,n){"use strict";let r;n.d(t,{D:function(){return getGlobalNamespace},R:function(){return getGlobal}});var a=n(28070);function getGlobalNamespace(){if(null==r){let e;if("undefined"!=typeof window)e=window;else if(void 0!==n.g)e=n.g;else if(void 0!==a)e=a;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");r=e}return r}function getGlobal(e,t){let n=function(){let e=getGlobalNamespace();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(n.has(e))return n.get(e);{let r=t();return n.set(e,r),n.get(e)}}},1354:function(e,t,n){"use strict";n.d(t,{cb:function(){return customGrad},pn:function(){return variableGrads}});var r=n(90890),a=n(95766),i=n(62347);function variableGrads(e,t){i.hu(i.mf(e),()=>"The f passed in variableGrads(f) must be a function"),i.hu(null==t||Array.isArray(t)&&t.every(e=>e instanceof a._w),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let n=null!=t;if(!n)for(let e in t=[],r.BV.registeredVariables)t.push(r.BV.registeredVariables[e]);let s=n?t.filter(e=>!e.trainable):null,o=t.length;t=t.filter(e=>e.trainable),i.hu(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${o} variables is trainable.`);let{value:u,grads:l}=r.BV.gradients(e,t,null,!0);i.hu(l.some(e=>null!=e),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),i.hu(0===u.rank,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${u.rank} tensor`);let d={};return t.forEach((e,t)=>{null!=l[t]&&(d[e.name]=l[t])}),null!=s&&s.forEach(e=>d[e.name]=null),{value:u,grads:d}}function customGrad(e){return r.BV.customGrad(e)}},24435:function(e,t,n){"use strict";n.d(t,{w:function(){return CompositeArrayBuffer}});var r=n(87767);let CompositeArrayBuffer=class CompositeArrayBuffer{static join(e){return new CompositeArrayBuffer(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,null==e||(e instanceof Array||(e=[e]),0===(e=e.map(e=>r.isTypedArray(e)?e.buffer:e)).length))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let n=0;n<e.length;n++){let r=e[n];n!==e.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let a=t+r.byteLength;this.shards.push({buffer:r,start:t,end:a}),t=a}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);let n=this.findShardForByte(e);if(-1===n)throw Error(`Could not find start shard for byte ${e}`);let r=t-e,a=new ArrayBuffer(r),i=new Uint8Array(a),s=0;for(let r=n;r<this.shards.length;r++){let n=this.shards[r],a=e+s,o=a-n.start,u=s,l=Math.min(t,n.end),d=l-n.start,c=new Uint8Array(n.buffer,o,d-o);if(i.set(c,u),s+=c.length,t<n.end)break}return a}findShardForByte(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function check(t){return e<t.start?-1:e>=t.end?1:0}if(0===check(this.shards[this.previousShardIndex]))return this.previousShardIndex;let t=function(e,t){let n=0,r=e.length;for(;n<=r;){let a=Math.floor((r-n)/2)+n,i=t(e[a]);if(0===i)return a;i<0?r=a:n=a+1}return -1}(this.shards,check);return -1===t?-1:(this.previousShardIndex=t,this.previousShardIndex)}}},65686:function(e,t,n){"use strict";n.d(t,{ns:function(){return BrowserIndexedDB},y$:function(){return BrowserIndexedDBManager}}),n(60684);var r=n(52788),a=n(6245),i=n(82200),s=n(24435);/**
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
 */let o="tensorflowjs",u="models_store",l="model_info_store";function getIndexedDBFactory(){if(!(0,r.OB)().getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function setUpDatabase(e){let t=e.result;t.createObjectStore(u,{keyPath:"modelPath"}),t.createObjectStore(l,{keyPath:"modelPath"})}let BrowserIndexedDB=class BrowserIndexedDB{constructor(e){if(this.indexedDB=getIndexedDBFactory(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{let r=this.indexedDB.open(o,1);r.onupgradeneeded=()=>setUpDatabase(r),r.onsuccess=()=>{let i=r.result;if(null==t){let t=i.transaction(u,"readonly"),r=t.objectStore(u),a=r.get(this.modelPath);a.onsuccess=()=>{if(null==a.result)return i.close(),n(Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(a.result.modelArtifacts)},a.onerror=e=>(i.close(),n(a.error)),t.oncomplete=()=>i.close()}else{let r,o;t.weightData=s.w.join(t.weightData);let d=(0,a.Q)(t),c=i.transaction(l,"readwrite"),p=c.objectStore(l);try{r=p.put({modelPath:this.modelPath,modelArtifactsInfo:d})}catch(e){return n(e)}r.onsuccess=()=>{let r;o=i.transaction(u,"readwrite");let a=o.objectStore(u);try{r=a.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:d})}catch(e){return n(e)}r.onsuccess=()=>e({modelArtifactsInfo:d}),r.onerror=e=>{p=c.objectStore(l);let t=p.delete(this.modelPath);t.onsuccess=()=>(i.close(),n(r.error)),t.onerror=e=>(i.close(),n(r.error))}},r.onerror=e=>(i.close(),n(r.error)),c.oncomplete=()=>{null==o?i.close():o.oncomplete=()=>i.close()}}},r.onerror=e=>n(r.error)})}};BrowserIndexedDB.URL_SCHEME="indexeddb://";let indexedDBRouter=e=>{var t;return(0,r.OB)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserIndexedDB.URL_SCHEME)?(t=e.slice(BrowserIndexedDB.URL_SCHEME.length),new BrowserIndexedDB(t)):null};i.U3.registerSaveRouter(indexedDBRouter),i.U3.registerLoadRouter(indexedDBRouter);let BrowserIndexedDBManager=class BrowserIndexedDBManager{constructor(){this.indexedDB=getIndexedDBFactory()}async listModels(){return new Promise((e,t)=>{let n=this.indexedDB.open(o,1);n.onupgradeneeded=()=>setUpDatabase(n),n.onsuccess=()=>{let r=n.result,a=r.transaction(l,"readonly"),i=a.objectStore(l),s=i.getAll();s.onsuccess=()=>{let t={};for(let e of s.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},s.onerror=e=>(r.close(),t(s.error)),a.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){var t;return e=(t=e).startsWith(BrowserIndexedDB.URL_SCHEME)?t.slice(BrowserIndexedDB.URL_SCHEME.length):t,new Promise((t,n)=>{let r=this.indexedDB.open(o,1);r.onupgradeneeded=()=>setUpDatabase(r),r.onsuccess=()=>{let a;let i=r.result,s=i.transaction(l,"readwrite"),o=s.objectStore(l),d=o.get(e);d.onsuccess=()=>{if(null==d.result)return i.close(),n(Error(`Cannot find model with path '${e}' in IndexedDB.`));{let r=o.delete(e),deleteModelData=()=>{a=i.transaction(u,"readwrite");let r=a.objectStore(u),s=r.delete(e);s.onsuccess=()=>t(d.result.modelArtifactsInfo),s.onerror=e=>n(d.error)};r.onsuccess=deleteModelData,r.onerror=e=>(deleteModelData(),i.close(),n(d.error))}},d.onerror=e=>(i.close(),n(d.error)),s.oncomplete=()=>{null==a?i.close():a.oncomplete=()=>i.close()}},r.onerror=e=>n(r.error)})}}},81385:function(e,t,n){"use strict";n(65686),n(7120),n(60684);var r=n(52788),a=n(6245),i=n(82200),s=n(24435);function defer(e){return new Promise(e=>setTimeout(e)).then(e)}let BrowserDownloads=class BrowserDownloads{constructor(e){if(!(0,r.OB)().getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(BrowserDownloads.URL_SCHEME)&&(e=e.slice(BrowserDownloads.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");let t=s.w.join(e.weightData),n=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let t=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],r=(0,a.Yd)(e,t),i=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),s=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor;if(s.download=this.modelJsonFileName,s.href=i,await defer(()=>s.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){let e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=n,await defer(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:(0,a.Q)(e)}}}};BrowserDownloads.URL_SCHEME="downloads://",i.U3.registerSaveRouter(e=>(0,r.OB)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserDownloads.URL_SCHEME)?function(e="model"){return new BrowserDownloads(e)}(e.slice(BrowserDownloads.URL_SCHEME.length)):null);var o=n(62347);/**
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
 */function monitorPromisesProgress(e,t,n,r){var a,i;(0,o.hu)(null!=e&&Array.isArray(e)&&e.length>0,()=>"promises must be a none empty array"),a=n=null==n?0:n,i=r=null==r?1:r,(0,o.hu)(a>=0&&a<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${a}`),(0,o.hu)(i>=0&&i<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${i}`),(0,o.hu)(i>=a,()=>`startFraction must be no more than endFraction, but got startFraction ${a} and endFraction ${i}`);let s=0;return Promise.all(e.map(a=>(a.then(a=>{let i=n+ ++s/e.length*(r-n);return t(i),a}),a)))}/**
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
 */async function loadWeightsAsArrayBuffer(e,t){null==t&&(t={});let n=null==t.fetchFunc?(0,r.OB)().platform.fetch:t.fetchFunc,a=e.map(e=>n(e,t.requestInit,{isBinary:!0})),i=null==t.onProgress?await Promise.all(a):await monitorPromisesProgress(a,t.onProgress,0,.5),s=i.map(e=>e.arrayBuffer()),o=null==t.onProgress?await Promise.all(s):await monitorPromisesProgress(s,t.onProgress,.5,1);return o}n(83477);let HTTPRequest=class HTTPRequest{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?((0,o.hu)("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=(0,r.OB)().platform.fetch,(0,o.hu)(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&(0,o.hu)(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let n=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],r=(0,a.Yd)(e,n);if(t.body.append("model.json",new Blob([JSON.stringify(r)],{type:"application/json"}),"model.json"),null!=e.weightData){let n=s.w.join(e.weightData);t.body.append("model.weights.bin",new Blob([n],{type:"application/octet-stream"}),"model.weights.bin")}let i=await this.fetch(this.path,t);if(i.ok)return{modelArtifactsInfo:(0,a.Q)(e),responses:[i]};throw Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${i.status}.`)}async loadModelJSON(){let e;let t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);try{e=await t.json()}catch(t){let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?e+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":e+=" Please make sure the server is serving valid JSON for this request.",Error(e)}let n=e.modelTopology,r=e.weightsManifest;if(null==n&&null==r)throw Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let e=await this.loadModelJSON();return(0,a.jN)(e,e=>this.loadWeights(e))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),n=(0,a.hu)(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:n,getWeightStream:()=>(function(e,t){var n;let a;let i=null==t.fetchFunc?(0,r.OB)().platform.fetch:t.fetchFunc,s=0;return null===(n=t.onProgress)||void 0===n||n.call(t,0),new ReadableStream({pull:async n=>{for(var r;s<e.length;){if(!a){let n=(await i(e[s],t.requestInit,{isBinary:!0})).body;a=n.getReader()}let{done:o,value:u}=await a.read();if(o){s++,a=void 0,null===(r=t.onProgress)||void 0===r||r.call(t,s/e.length);continue}n.enqueue(u);return}n.close()}})})(t,this.loadOptions)})}async getWeightUrls(e){let t=Array.isArray(this.path)?this.path[1]:this.path,[n,r]=function(e){let t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),r=e.substring(0,t),a=n>t?e.substring(n):"";return[r+"/",a]}(t),a=this.weightPathPrefix||n,i=[],s=[];for(let t of e)for(let e of t.paths)null!=this.weightUrlConverter?s.push(this.weightUrlConverter(e)):i.push(a+e+r);return this.weightUrlConverter&&i.push(...await Promise.all(s)),i}async loadWeights(e){let t=await this.getWeightUrls(e),n=(0,a.hu)(e),r=await loadWeightsAsArrayBuffer(t,this.loadOptions);return[n,r]}};function isHTTPScheme(e){return null!=e.match(HTTPRequest.URL_SCHEME_REGEX)}HTTPRequest.URL_SCHEME_REGEX=/^https?:\/\//;let httpRouter=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else if(Array.isArray(e)?e.every(e=>isHTTPScheme(e)):isHTTPScheme(e))return new HTTPRequest(e,t);return null};i.U3.registerSaveRouter(httpRouter),i.U3.registerLoadRouter(httpRouter),n(25749);/**
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
 */},6245:function(e,t,n){"use strict";n.d(t,{Q:function(){return getModelArtifactsInfoForJSON},Yd:function(){return getModelJSONForModelArtifacts},_n:function(){return arrayBufferToBase64String},hu:function(){return getWeightSpecs},jN:function(){return getModelArtifactsForJSON},n7:function(){return base64StringToArrayBuffer}}),n(83477);var r=n(24435),a=n(61900).lW;let i=void 0!==a&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function stringByteLength(e){return i?a.byteLength(e,"utf8"):new Blob([e]).size}function arrayBufferToBase64String(e){if(i)return a.from(e).toString("base64");let t=new Uint8Array(e),n="";for(let e=0,r=t.length;e<r;e++)n+=String.fromCharCode(t[e]);return btoa(n)}function base64StringToArrayBuffer(e){if(i){let t=a.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;++e)n.set([t.charCodeAt(e)],e);return n.buffer}function getModelJSONForModelArtifacts(e,t){let n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),n}async function getModelArtifactsForJSON(e,t){let n,r;return null!=e.weightsManifest&&([n,r]=await t(e.weightsManifest)),function(e,t,n){let r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=t,r.weightData=n}return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),r}(e,n,r)}function getModelArtifactsInfoForJSON(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:stringByteLength(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:stringByteLength(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new r.w(e.weightData).byteLength}}function getWeightSpecs(e){let t=[];for(let n of e)t.push(...n.weights);return t}},7120:function(e,t,n){"use strict";n.d(t,{Ew:function(){return BrowserLocalStorage},JL:function(){return BrowserLocalStorageManager}}),n(60684);var r=n(52788),a=n(62347),i=n(6245),s=n(24435),o=n(82200);let u="tensorflowjs_models",l="info";function getModelKeys(e){return{info:[u,e,l].join("/"),topology:[u,e,"model_topology"].join("/"),weightSpecs:[u,e,"weight_specs"].join("/"),weightData:[u,e,"weight_data"].join("/"),modelMetadata:[u,e,"model_metadata"].join("/")}}function removeItems(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}let BrowserLocalStorage=class BrowserLocalStorage{constructor(e){if(!(0,r.OB)().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=getModelKeys(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=(0,i.Q)(e),a=s.w.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,(0,i._n)(a));let s={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(s)),{modelArtifactsInfo:r}}catch(e){throw removeItems(this.keys),Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(null==n)throw Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;let r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==r)throw Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;let a=this.LS.getItem(this.keys.modelMetadata);if(null!=a){let e=JSON.parse(a);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,null!=e.signature&&(t.signature=e.signature),null!=e.userDefinedMetadata&&(t.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(t.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(t.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(t.trainingConfig=e.trainingConfig)}let s=this.LS.getItem(this.keys.weightData);if(null==s)throw Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=(0,i.n7)(s),t}};BrowserLocalStorage.URL_SCHEME="localstorage://";let localStorageRouter=e=>{var t;return(0,r.OB)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserLocalStorage.URL_SCHEME)?(t=e.slice(BrowserLocalStorage.URL_SCHEME.length),new BrowserLocalStorage(t)):null};o.U3.registerSaveRouter(localStorageRouter),o.U3.registerLoadRouter(localStorageRouter);let BrowserLocalStorageManager=class BrowserLocalStorageManager{constructor(){(0,a.hu)((0,r.OB)().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),(0,a.hu)("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let e={},t=u+"/",n="/"+l;for(let r=0;r<this.LS.length;++r){let a=this.LS.key(r);if(a.startsWith(t)&&a.endsWith(n)){let t=function(e){let t=e.split("/");if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join("/")}(a);e[t]=JSON.parse(this.LS.getItem(a))}}return e}async removeModel(e){var t;e=(t=e).startsWith(BrowserLocalStorage.URL_SCHEME)?t.slice(BrowserLocalStorage.URL_SCHEME.length):t;let n=getModelKeys(e);if(null==this.LS.getItem(n.info))throw Error(`Cannot find model at path '${e}'`);let r=JSON.parse(this.LS.getItem(n.info));return removeItems(n),r}}},25749:function(e,t,n){"use strict";n.d(t,{xQ:function(){return ModelStoreManagerRegistry}});var r=n(62347);n(82200);let ModelStoreManagerRegistry=class ModelStoreManagerRegistry{constructor(){this.managers={}}static getInstance(){return null==ModelStoreManagerRegistry.instance&&(ModelStoreManagerRegistry.instance=new ModelStoreManagerRegistry),ModelStoreManagerRegistry.instance}static registerManager(e,t){(0,r.hu)(null!=e,()=>"scheme must not be undefined or null."),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),(0,r.hu)(e.length>0,()=>"scheme must not be an empty string.");let n=ModelStoreManagerRegistry.getInstance();(0,r.hu)(null==n.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),n.managers[e]=t}static getManager(e){let t=ModelStoreManagerRegistry.getInstance().managers[e];if(null==t)throw Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(ModelStoreManagerRegistry.getInstance().managers)}}},82200:function(e,t,n){"use strict";n.d(t,{U3:function(){return IORouterRegistry}});/**
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
 */let IORouterRegistry=class IORouterRegistry{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==IORouterRegistry.instance&&(IORouterRegistry.instance=new IORouterRegistry),IORouterRegistry.instance}static registerSaveRouter(e){IORouterRegistry.getInstance().saveRouters.push(e)}static registerLoadRouter(e){IORouterRegistry.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return IORouterRegistry.getHandlers(e,"save")}static getLoadHandlers(e,t){return IORouterRegistry.getHandlers(e,"load",t)}static getHandlers(e,t,n){let r=[],a="load"===t?IORouterRegistry.getInstance().loadRouters:IORouterRegistry.getInstance().saveRouters;return a.forEach(t=>{let a=t(e,n);null!==a&&r.push(a)}),r}}},83477:function(e,t,n){},36470:function(e,t,n){"use strict";n.d(t,{pI:function(){return getKernel},tr:function(){return getKernelsForBackend},uk:function(){return getGradient},wC:function(){return registerKernel}});var r=n(9904),a=n(52020);/**
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
 */let i=(0,r.R)("kernelRegistry",()=>new Map),s=(0,r.R)("gradRegistry",()=>new Map);function getKernel(e,t){let n=`${t}_${e}`;return i.get(n)}function getGradient(e){return s.get(e)}function getKernelsForBackend(e){let t=i.entries(),n=[];for(;;){let{done:r,value:a}=t.next();if(r)break;let[i,s]=a,[o]=i.split("_");o===e&&n.push(s)}return n}function registerKernel(e){let{kernelName:t,backendName:n}=e,r=`${n}_${t}`;i.has(r)&&a.Z(`The kernel '${t}' for backend '${n}' is already registered`),i.set(r,e)}},52020:function(e,t,n){"use strict";n.d(t,{Z:function(){return warn},c:function(){return log}});var r=n(52788);/**
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
 */function warn(...e){(0,r.OB)().getBool("IS_TEST")||(0,r.OB)().getBool("PROD")||console.warn(...e)}function log(...e){(0,r.OB)().getBool("IS_TEST")||(0,r.OB)().getBool("PROD")||console.log(...e)}},88178:function(e,t,n){"use strict";n.d(t,{W:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({abs_:/**
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
 */function(e){let t=(0,i._1)(e,"x","abs");return"complex64"===t.dtype?r.BV.runKernel(a.yj2,{x:t}):r.BV.runKernel(a.SYM,{x:t})}})},81480:function(e,t,n){"use strict";n.d(t,{I:function(){return u}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({add_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","add"),o=(0,s._1)(t,"b","add");[n,o]=(0,i.T_)(n,o);let u={a:n,b:o};return r.BV.runKernel(a.mm_,u)}})},87162:function(e,t,n){"use strict";/**
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
 */function getReshaped(e,t,n,r=!0){let a=[];if(r)(a=a.concat(t.slice(0))).push(e[0]/n),a=a.concat(e.slice(1));else{a=a.concat(e[0]);let n=t.length;for(let r=0;r<n;++r)a=a.concat([e[r+1]/t[r],t[r]]);a=a.concat(e.slice(n+1))}return a}function getPermuted(e,t,n=!0){let r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{let n=[],a=[];for(let r=1;r<e;++r)r>=2*t+1||r%2==1?a.push(r):n.push(r);r.push(...n),r.push(0),r.push(...a)}return r}function getReshapedPermuted(e,t,n,r=!0){let a=[];r?a.push(e[0]/n):a.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?a.push(t[n-1]*e[n]):a.push(e[n]/t[n-1]):a.push(e[n]);return a}function getSliceBeginCoords(e,t){let n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function getSliceSize(e,t,n){let r=e.slice(0,1);for(let a=0;a<n;++a)r.push(e[a+1]-t[a][0]-t[a][1]);return r}n.d(t,{R7:function(){return getReshaped},TK:function(){return getReshapedPermuted},oP:function(){return getSliceBeginCoords},qX:function(){return getSliceSize},xw:function(){return getPermuted}})},8218:function(e,t,n){"use strict";n.d(t,{LJ:function(){return getUndoAxesPermutation},Q3:function(){return getAxesPermutation},Vh:function(){return combineLocations},YB:function(){return axesAreInnerMostDims},kz:function(){return computeOutAndReduceShapes},lB:function(){return assertAxesAreInnerMostDims},rv:function(){return expandShapeToKeepDim},sY:function(){return getInnerMostAxes}});var r=n(62347);/**
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
 */function axesAreInnerMostDims(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function combineLocations(e,t,n){let r=e.length+t.length,a=[],i=0,s=0;for(let o=0;o<r;o++)-1===n.indexOf(o)?a.push(e[i++]):a.push(t[s++]);return a}function computeOutAndReduceShapes(e,t){let n=[],r=e.length;for(let a=0;a<r;a++)-1===t.indexOf(a)&&n.push(e[a]);let a=t.map(t=>e[t]);return[n,a]}function expandShapeToKeepDim(e,t){let n=t.map(e=>1);return combineLocations(e,n,t)}function assertAxesAreInnerMostDims(e,t,n){r.hu(axesAreInnerMostDims(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function getAxesPermutation(e,t){if(axesAreInnerMostDims(e,t))return null;let n=[];for(let r=0;r<t;++r)-1===e.indexOf(r)&&n.push(r);return e.forEach(e=>n.push(e)),n}function getUndoAxesPermutation(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function getInnerMostAxes(e,t){let n=[];for(let r=t-e;r<t;++r)n.push(r);return n}},70269:function(e,t,n){"use strict";n.d(t,{U:function(){return d}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(45208),u=n(21772),l=n(5327);let d=(0,u.op)({broadcastTo_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,i._1)(e,"broadcastTo","x"),u=n.shape;if((0,s.Mu)(t),t.length<n.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){let e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=(0,l.X)(n,e)}let d=n.shape,c=Array.from(t);for(let e=t.length-1;e>=0;e--)if(d[e]===t[e])c[e]=1;else if(1!==n.shape[e])throw Error(`broadcastTo(): [${u}] cannot be broadcast to [${t}].`);let p=c.map((e,t)=>e>1?t:-1).filter(e=>e>=0);if(0===p.length)return(0,o.d)(n);let f={x:n};return r.BV.runKernel(a.n9L,f,{reps:c})}})},3109:function(e,t,n){"use strict";/**
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
 */function getBroadcastDims(e,t){let n=e.length,r=[];for(let a=0;a<n;a++){let i=n-1-a,s=e[i]||1,o=t[t.length-1-a]||1;o>1&&1===s&&r.unshift(i)}return r}function getReductionAxes(e,t){let n=[];for(let r=0;r<t.length;r++){let a=e[e.length-r-1],i=t.length-r-1,s=t[i];(null==a||1===a&&s>1)&&n.unshift(i)}return n}function assertAndGetBroadcastShape(e,t){let n=Math.max(e.length,t.length),r=Array(n);for(let a=0;a<n;a++){let i=e[e.length-a-1];null==i&&(i=1);let s=t[t.length-a-1];if(null==s&&(s=1),1===i)r[n-a-1]=s;else if(1===s)r[n-a-1]=i;else if(i!==s){let n=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(n)}else r[n-a-1]=i}return r}n.r(t),n.d(t,{assertAndGetBroadcastShape:function(){return assertAndGetBroadcastShape},getBroadcastDims:function(){return getBroadcastDims},getReductionAxes:function(){return getReductionAxes}})},25694:function(e,t,n){"use strict";n.d(t,{f:function(){return buffer}});var r=n(95766),a=n(62347);/**
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
 */function buffer(e,t="float32",n){return t=t||"float32",a.Mu(e),new r.YD(e,t,n)}},77869:function(e,t,n){"use strict";n.d(t,{p:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({cast_:/**
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
 */function(e,t){let n=(0,i._1)(e,"x","cast");if(!s.LP(t))throw Error(`Failed to cast to unknown dtype ${t}`);if("string"===t&&"string"!==n.dtype||"string"!==t&&"string"===n.dtype)throw Error("Only strings can be casted to strings");return r.BV.runKernel(a.RFZ,{x:n},{dtype:t})}})},45208:function(e,t,n){"use strict";n.d(t,{d:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({clone_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,i._1)(e,"x","clone","string_or_numeric");return r.BV.runKernel(a.iJz,{x:t})}})},55539:function(e,t,n){"use strict";n.d(t,{P:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({complex_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,i._1)(e,"real","complex"),o=(0,i._1)(t,"imag","complex");return s.k5(n.shape,o.shape,`real and imag shapes, ${n.shape} and ${o.shape}, must match in call to tf.complex().`),r.BV.runKernel(a.Zz9,{real:n,imag:o})}})},71059:function(e,t,n){"use strict";n.d(t,{z:function(){return l}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(45208),u=n(21772);let l=(0,u.op)({concat_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){(0,s.hu)(e.length>=1,()=>"Pass at least one tensor to concat");let n=(0,i.sI)(e,"tensors","concat","string_or_numeric");return("complex64"===n[0].dtype&&n.forEach(e=>{if("complex64"!==e.dtype)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),1===n.length)?(0,o.d)(n[0]):r.BV.runKernel(a.Eh3,n,{axis:t})}})},20565:function(e,t,n){"use strict";n.d(t,{N:function(){return computeOutShape},o:function(){return assertParamsConsistent}});var r=n(62347);/**
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
 */function assertParamsConsistent(e,t){let n=e[0].length;e.forEach((e,t)=>{r.hu(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),r.hu(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);let a=e[0];e.forEach((e,i)=>{for(let s=0;s<n;s++)r.hu(s===t||e[s]===a[s],()=>`Error in concat${n}D: Shape of tensors[${i}] (${e}) does not match the shape of the rest (${a}) along the non-concatenated axis ${i}.`)})}function computeOutShape(e,t){let n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}},62957:function(e,t,n){"use strict";n.d(t,{I0:function(){return tupleValuesAreOne},Ix:function(){return computeConv2DInfo},Rf:function(){return computeDilation2DInfo},U3:function(){return stridesOrDilationsArePositive},Xw:function(){return computePool2DInfo},aO:function(){return computeDefaultPad},jT:function(){return eitherStridesOrDilationsAreOne},jw:function(){return computeConv3DInfo},m:function(){return checkPadOnDimRoundingMode},pl:function(){return computePool3DInfo},sl:function(){return convertConv2DDataFormat}});var r=n(62347);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function computeDilation2DInfo(e,t,n,r,a="NHWC",i){let s=e[3],o=[...t,s],u=convertConv2DDataFormat(a);return computeConv2DInfo(e,o,n,i,r,null,null,u)}function computePool2DInfo(e,t,n,r,a,i,s="channelsLast"){let o;let[u,l]=parseTupleParam(t);if("channelsLast"===s)o=[u,l,e[3],e[3]];else if("channelsFirst"===s)o=[u,l,e[1],e[1]];else throw Error(`Unknown dataFormat ${s}`);return computeConv2DInfo(e,o,n,r,a,i,!1,s)}function computePool3DInfo(e,t,n,r,a,i,s="NDHWC"){let o,u;let[l,d,c]=parse3TupleParam(t);if("NDHWC"===s)u="channelsLast",o=[l,d,c,e[4],e[4]];else if("NCDHW"===s)u="channelsFirst",o=[l,d,c,e[1],e[1]];else throw Error(`Unknown dataFormat ${s}`);return computeConv3DInfo(e,o,n,r,a,!1,u,i)}function computeConv2DInfo(e,t,n,r,a,i,s=!1,o="channelsLast"){let u,[l,d,c,p]=[-1,-1,-1,-1];if("channelsLast"===o)[l,d,c,p]=e;else if("channelsFirst"===o)[l,p,d,c]=e;else throw Error(`Unknown dataFormat ${o}`);let[f,h,,m]=t,[g,b]=parseTupleParam(n),[y,_]=parseTupleParam(r),w=getEffectiveFilterSize(f,y),I=getEffectiveFilterSize(h,_),{padInfo:k,outHeight:S,outWidth:v}=function(e,t,n,r,a,i,s,o,u){let l,d,c;if("number"==typeof e){let a=0===e?"VALID":"NUMBER";l={top:e,bottom:e,left:e,right:e,type:a};let s=function(e,t,n,r,a){null==r&&(r=computeDefaultPad(e,t,n));let i=e[0],s=e[1],o=round((i-t+2*r)/n+1,a),u=round((s-t+2*r)/n+1,a);return[o,u]}([t,n],i,r,e,o);d=s[0],c=s[1]}else if("same"===e){d=Math.ceil(t/r),c=Math.ceil(n/a);let e=Math.max(0,(d-1)*r+i-t),o=Math.max(0,(c-1)*a+s-n),u=Math.floor(e/2),p=Math.floor(o/2);l={top:u,bottom:e-u,left:p,right:o-p,type:"SAME"}}else if("valid"===e)l={top:0,bottom:0,left:0,right:0,type:"VALID"},d=Math.ceil((t-i+1)/r),c=Math.ceil((n-s+1)/a);else if("object"==typeof e){let p="channelsLast"===u?e[1][0]:e[2][0],f="channelsLast"===u?e[1][1]:e[2][1],h="channelsLast"===u?e[2][0]:e[3][0],m="channelsLast"===u?e[2][1]:e[3][1],g=0===p&&0===f&&0===h&&0===m?"VALID":"EXPLICIT";l={top:p,bottom:f,left:h,right:m,type:g},d=round((t-i+p+f)/r+1,o),c=round((n-s+h+m)/a+1,o)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outHeight:d,outWidth:c}}(a,d,c,g,b,w,I,i,o),A=s?m*p:m;return"channelsFirst"===o?u=[l,A,S,v]:"channelsLast"===o&&(u=[l,S,v,A]),{batchSize:l,dataFormat:o,inHeight:d,inWidth:c,inChannels:p,outHeight:S,outWidth:v,outChannels:A,padInfo:k,strideHeight:g,strideWidth:b,filterHeight:f,filterWidth:h,effectiveFilterHeight:w,effectiveFilterWidth:I,dilationHeight:y,dilationWidth:_,inShape:e,outShape:u,filterShape:t}}function computeConv3DInfo(e,t,n,r,a,i=!1,s="channelsLast",o){let u,[l,d,c,p,f]=[-1,-1,-1,-1,-1];if("channelsLast"===s)[l,d,c,p,f]=e;else if("channelsFirst"===s)[l,f,d,c,p]=e;else throw Error(`Unknown dataFormat ${s}`);let[h,m,g,,b]=t,[y,_,w]=parse3TupleParam(n),[I,k,S]=parse3TupleParam(r),v=getEffectiveFilterSize(h,I),A=getEffectiveFilterSize(m,k),M=getEffectiveFilterSize(g,S),{padInfo:B,outDepth:x,outHeight:N,outWidth:D}=function(e,t,n,r,a,i,s,o,u,l,d){let c,p,f,h;if("valid"===e&&(e=0),"number"==typeof e){let m=0===e?"VALID":"NUMBER";c={top:e,bottom:e,left:e,right:e,front:e,back:e,type:m};let g=function(e,t,n,r,a,i){null==a&&(a=computeDefaultPad(e,t[0],r[0]));let s=[0,0,0,1];for(let n=0;n<3;n++)e[n]+2*a>=t[n]&&(s[n]=round((e[n]-t[n]+2*a)/r[n]+1,i));return s}([t,n,r,1],[o,u,l],0,[a,i,s],e,d);p=g[0],f=g[1],h=g[2]}else if("same"===e){p=Math.ceil(t/a),f=Math.ceil(n/i),h=Math.ceil(r/s);let e=(p-1)*a+o-t,d=(f-1)*i+u-n,m=(h-1)*s+l-r,g=Math.floor(e/2),b=Math.floor(d/2),y=Math.floor(m/2);c={top:b,bottom:d-b,left:y,right:m-y,front:g,back:e-g,type:"SAME"}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:p,outHeight:f,outWidth:h}}(a,d,c,p,y,_,w,v,A,M,o),T=i?b*f:b;return"channelsFirst"===s?u=[l,T,x,N,D]:"channelsLast"===s&&(u=[l,x,N,D,T]),{batchSize:l,dataFormat:s,inDepth:d,inHeight:c,inWidth:p,inChannels:f,outDepth:x,outHeight:N,outWidth:D,outChannels:T,padInfo:B,strideDepth:y,strideHeight:_,strideWidth:w,filterDepth:h,filterHeight:m,filterWidth:g,effectiveFilterDepth:v,effectiveFilterHeight:A,effectiveFilterWidth:M,dilationDepth:I,dilationHeight:k,dilationWidth:S,inShape:e,outShape:u,filterShape:t}}function computeDefaultPad(e,t,n,r=1){let a=getEffectiveFilterSize(t,r);return Math.floor((e[0]*(n-1)-n+a)/2)}function parseTupleParam(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function parse3TupleParam(e){return"number"==typeof e?[e,e,e]:e}function getEffectiveFilterSize(e,t){return t<=1?e:e+(e-1)*(t-1)}function round(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function tupleValuesAreOne(e){let[t,n,r]=parseTupleParam(e);return 1===t&&1===n&&1===r}function eitherStridesOrDilationsAreOne(e,t){return tupleValuesAreOne(e)||tupleValuesAreOne(t)}function stridesOrDilationsArePositive(e){return parseTupleParam(e).every(e=>e>0)}function convertConv2DDataFormat(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error(`Unknown dataFormat ${e}`)}function checkPadOnDimRoundingMode(e,t,n){if(null!=n){if("string"==typeof t)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if("number"==typeof t)r.hu(r.GN(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if("object"==typeof t)t.forEach(t=>{t.forEach(t=>{r.hu(r.GN(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}},44599:function(e,t,n){"use strict";n.d(t,{m:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({cos_:/**
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
 */function(e){let t=(0,i._1)(e,"x","cos","float32");return r.BV.runKernel(a.mc4,{x:t})}})},57239:function(e,t,n){"use strict";n.d(t,{h:function(){return l}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({floorDiv_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","floorDiv"),o=(0,s._1)(t,"b","floorDiv");[n,o]=(0,i.T_)(n,o);let u={a:n,b:o};return r.BV.runKernel(a.jeX,u)}}),l=(0,o.op)({div_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","div"),o=(0,s._1)(t,"b","div");if([n,o]=(0,i.T_)(n,o),"int32"===n.dtype&&"int32"===o.dtype)return u(n,o);let l={a:n,b:o};return r.BV.runKernel(a.oHH,l,{})}})},80416:function(e,t,n){"use strict";n.d(t,{Aj:function(){return a},IA:function(){return r},Kh:function(){return s},Qy:function(){return o},eh:function(){return u},py:function(){return i}});/**
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
 */let r=.3275911,a=.254829592,i=-.284496736,s=1.421413741,o=-1.453152027,u=1.061405429},79101:function(e,t,n){"use strict";n.d(t,{Q:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({exp_:/**
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
 */function(e){let t=(0,i._1)(e,"x","exp");return r.BV.runKernel(a.NEP,{x:t})}})},72482:function(e,t,n){"use strict";n.d(t,{d:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({expandDims_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){let n=(0,i._1)(e,"x","expandDims","string_or_numeric");return s.hu(t<=n.rank,()=>"Axis must be <= rank of the tensor"),r.BV.runKernel(a.YFo,{input:n},{dim:t})}})},43941:function(e,t,n){"use strict";n.d(t,{h:function(){return fill}});var r=n(90890),a=n(57004),i=n(62347);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e,t,n){(0,i.Mu)(e),n=n||(0,i.D2)(t);let s={shape:e,value:t,dtype:n};return r.BV.runKernel(a.deh,{},s)}},58665:function(e,t,n){"use strict";n.d(t,{QH:function(){return applyActivation},pf:function(){return getFusedBiasGradient},Fr:function(){return getFusedDyActivation},uy:function(){return shouldFuse}});var r=n(3109),a=n(90890),i=n(57004),s=n(99813),o=n(21772);let u=(0,o.op)({elu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,s._1)(e,"x","elu","float32");return a.BV.runKernel(i.SX0,{x:t})}}),l=(0,o.op)({leakyRelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=.2){let n=(0,s._1)(e,"x","leakyRelu");return a.BV.runKernel(i.J$2,{x:n},{alpha:t})}});var d=n(49594);let c=(0,o.op)({prelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"x","prelu"),r=(0,s._1)(t,"alpha","prelu");return a.BV.runKernel(i.o0g,{x:n,alpha:r})}});var p=n(78796);let f=(0,o.op)({relu6_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,s._1)(e,"x","relu6");return a.BV.runKernel(i.SbG,{x:t})}});var h=n(5327);let m=(0,o.op)({sigmoid_:/**
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
 */function(e){let t=(0,s._1)(e,"x","sigmoid","float32");return a.BV.runKernel(i.a5O,{x:t})}}),g=(0,o.op)({step_:/**
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
 */function(e,t=0){let n=(0,s._1)(e,"x","step");return a.BV.runKernel(i.h8e,{x:n},{alpha:t})}});var b=n(40536);/**
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
 */function getFusedDyActivation(e,t,n){if(null==n||"linear"===n)return e;if("relu"===n)return(0,d.d)(e,g(t));throw Error(`Cannot compute gradient for fused activation ${n}.`)}function getFusedBiasGradient(e,t){let n=t,a=r.getReductionAxes(e.shape,t.shape);return a.length>0&&(n=(0,b.S)(n,a)),(0,h.X)(n,e.shape)}function applyActivation(e,t,n,r){if("linear"===t)return e;if("relu"===t)return(0,p.U)(e);if("elu"===t)return u(e);if("relu6"===t)return f(e);if("prelu"===t)return c(e,n);if("leakyrelu"===t)return l(e,r);if("sigmoid"===t)return m(e);throw Error(`Unknown fused activation ${t}.`)}let shouldFuse=(e,t)=>!(e>0)||"linear"===t},81846:function(e,t,n){"use strict";n.r(t),n.d(t,{prepareAndValidate:function(){return prepareAndValidate}});var r=n(62347);function prepareAndValidate(e,t){let n=e.shape.length,a=t.shape.length;if(n<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(a<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${a}.`);if("int32"!==t.dtype)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[a-1]>n)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[a-1]} vs. ${n}`);if(0===(0,r.NA)(e.shape))throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let i=t.shape,s=i[i.length-1],o=1;for(let e=0;e<i.length-1;++e)o*=i[e];let u=e.shape,l=i.slice();l.pop();let d=1;for(let e=s;e<n;++e)d*=u[e],l.push(u[e]);let c=[...(0,r.e3)(e.shape).map(e=>e/d),1].slice(0,s);return[l,o,d,c]}},88664:function(e,t,n){"use strict";n.d(t,{p:function(){return l}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(3109),u=n(21772);let l=(0,u.op)({greater_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","greater","string_or_numeric"),u=(0,s._1)(t,"b","greater","string_or_numeric");[n,u]=(0,i.T_)(n,u),(0,o.assertAndGetBroadcastShape)(n.shape,u.shape);let l={a:n,b:u};return r.BV.runKernel(a.iZT,l)}})},39240:function(e,t,n){"use strict";n.d(t,{a:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({imag_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,i._1)(e,"input","imag");return r.BV.runKernel(a.J_u,{input:t})}})},32927:function(e,t,n){"use strict";n.d(t,{B:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({cropAndResize_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,o,u="bilinear",l=0){let d=(0,i._1)(e,"image","cropAndResize"),c=(0,i._1)(t,"boxes","cropAndResize","float32"),p=(0,i._1)(n,"boxInd","cropAndResize","int32"),f=c.shape[0];s.hu(4===d.rank,()=>`Error in cropAndResize: image must be rank 4,but got rank ${d.rank}.`),s.hu(2===c.rank&&4===c.shape[1],()=>`Error in cropAndResize: boxes must be have size [${f},4] but had shape ${c.shape}.`),s.hu(1===p.rank&&p.shape[0]===f,()=>`Error in cropAndResize: boxInd must be have size [${f}] but had shape ${c.shape}.`),s.hu(2===o.length,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${o.length}.`),s.hu(o[0]>=1&&o[1]>=1,()=>`cropSize must be atleast [1,1], but was ${o}`),s.hu("bilinear"===u||"nearest"===u,()=>`method must be bilinear or nearest, but was ${u}`);let h=r.BV.runKernel(a.VcC,{image:d,boxes:c,boxInd:p},{method:u,extrapolationValue:l,cropSize:o});return h}})},80517:function(e,t,n){"use strict";n.d(t,{V:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({flipLeftRight_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,i._1)(e,"image","flipLeftRight","float32");s.hu(4===t.rank,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let n=r.BV.runKernel(a.Uyb,{image:t},{});return n}})},16911:function(e,t,n){"use strict";n.d(t,{F:function(){return o}});var r=n(99813),a=n(62347),i=n(21772),s=n(8947);let o=(0,i.op)({grayscaleToRGB_:/**
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
 */function(e){let t=(0,r._1)(e,"image","grayscaleToRGB"),n=t.rank-1,i=t.shape[n];a.hu(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),a.hu(1===i,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${i}.`);let o=Array(t.rank);return o.fill(1,0,n),o[n]=3,(0,s.G)(t,o)}})},67266:function(e,t,n){"use strict";n.d(t,{o:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62340),o=n(21772);let u=(0,o.op)({nonMaxSuppression_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,o=.5,u=Number.NEGATIVE_INFINITY){let l=(0,i._1)(e,"boxes","nonMaxSuppression","float32"),d=(0,i._1)(t,"scores","nonMaxSuppression","float32"),c=(0,s.e)(l,d,n,o,u);n=c.maxOutputSize,o=c.iouThreshold,u=c.scoreThreshold;let p={maxOutputSize:n,iouThreshold:o,scoreThreshold:u};return r.BV.runKernel(a.uv1,{boxes:l,scores:d},p)}})},95069:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(83067),a=n(99813),i=n(62340),s=n(49658);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function nonMaxSuppressionAsync_(e,t,n,o=.5,u=Number.NEGATIVE_INFINITY){let l=(0,a._1)(e,"boxes","nonMaxSuppressionAsync"),d=(0,a._1)(t,"scores","nonMaxSuppressionAsync"),c=(0,i.e)(l,d,n,o,u);n=c.maxOutputSize,o=c.iouThreshold,u=c.scoreThreshold;let p=await Promise.all([l.data(),d.data()]),f=p[0],h=p[1],{selectedIndices:m}=(0,r.GP)(f,h,n,o,u);return l!==e&&l.dispose(),d!==t&&d.dispose(),(0,s.R)(m,"int32")}let o=nonMaxSuppressionAsync_},9977:function(e,t,n){"use strict";n.d(t,{q:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62340),o=n(21772);let u=(0,o.op)({nonMaxSuppressionPadded_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,o=.5,u=Number.NEGATIVE_INFINITY,l=!1){let d=(0,i._1)(e,"boxes","nonMaxSuppression"),c=(0,i._1)(t,"scores","nonMaxSuppression"),p=(0,s.e)(d,c,n,o,u,null),f=p.maxOutputSize,h=p.iouThreshold,m=p.scoreThreshold,g=r.BV.runKernel(a.cye,{boxes:d,scores:c},{maxOutputSize:f,iouThreshold:h,scoreThreshold:m,padToMaxOutputSize:l});return{selectedIndices:g[0],validOutputs:g[1]}}})},30644:function(e,t,n){"use strict";n.d(t,{N:function(){return u}});var r=n(83067),a=n(99813),i=n(62340),s=n(81080),o=n(49658);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function nonMaxSuppressionPaddedAsync_(e,t,n,u=.5,l=Number.NEGATIVE_INFINITY,d=!1){let c=(0,a._1)(e,"boxes","nonMaxSuppressionAsync"),p=(0,a._1)(t,"scores","nonMaxSuppressionAsync"),f=(0,i.e)(c,p,n,u,l,null),h=f.maxOutputSize,m=f.iouThreshold,g=f.scoreThreshold,[b,y]=await Promise.all([c.data(),p.data()]),{selectedIndices:_,validOutputs:w}=(0,r.qP)(b,y,h,m,g,d);return c!==e&&c.dispose(),p!==t&&p.dispose(),{selectedIndices:(0,o.R)(_,"int32"),validOutputs:(0,s.i)(w,"int32")}}let u=nonMaxSuppressionPaddedAsync_},22869:function(e,t,n){"use strict";n.d(t,{t:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62340),o=n(21772);let u=(0,o.op)({nonMaxSuppressionWithScore_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,o=.5,u=Number.NEGATIVE_INFINITY,l=0){let d=(0,i._1)(e,"boxes","nonMaxSuppression"),c=(0,i._1)(t,"scores","nonMaxSuppression"),p=(0,s.e)(d,c,n,o,u,l);n=p.maxOutputSize,o=p.iouThreshold,u=p.scoreThreshold,l=p.softNmsSigma;let f={maxOutputSize:n,iouThreshold:o,scoreThreshold:u,softNmsSigma:l},h=r.BV.runKernel(a.W0H,{boxes:d,scores:c},f);return{selectedIndices:h[0],selectedScores:h[1]}}})},24924:function(e,t,n){"use strict";n.d(t,{B:function(){return o}});var r=n(83067),a=n(99813),i=n(62340),s=n(49658);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function nonMaxSuppressionWithScoreAsync_(e,t,n,o=.5,u=Number.NEGATIVE_INFINITY,l=0){let d=(0,a._1)(e,"boxes","nonMaxSuppressionAsync"),c=(0,a._1)(t,"scores","nonMaxSuppressionAsync"),p=(0,i.e)(d,c,n,o,u,l);n=p.maxOutputSize,o=p.iouThreshold,u=p.scoreThreshold,l=p.softNmsSigma;let f=await Promise.all([d.data(),c.data()]),h=f[0],m=f[1],{selectedIndices:g,selectedScores:b}=(0,r.pA)(h,m,n,o,u,l);return d!==e&&d.dispose(),c!==t&&c.dispose(),{selectedIndices:(0,s.R)(g,"int32"),selectedScores:(0,s.R)(b)}}let o=nonMaxSuppressionWithScoreAsync_},85590:function(e,t,n){"use strict";n.d(t,{I:function(){return l}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772),u=n(5327);let l=(0,o.op)({resizeBilinear_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=!1,o=!1){let l=(0,i._1)(e,"images","resizeBilinear");s.hu(3===l.rank||4===l.rank,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${l.rank}.`),s.hu(2===t.length,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),s.hu(!1===o||!1===n,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let d=l,c=!1;3===l.rank&&(c=!0,d=(0,u.X)(l,[1,l.shape[0],l.shape[1],l.shape[2]]));let[]=t,p={images:d},f=r.BV.runKernel(a._Yw,p,{alignCorners:n,halfPixelCenters:o,size:t});return c?(0,u.X)(f,[f.shape[1],f.shape[2],f.shape[3]]):f}})},84231:function(e,t,n){"use strict";n.d(t,{j:function(){return l}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772),u=n(5327);let l=(0,o.op)({resizeNearestNeighbor_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=!1,o=!1){let l=(0,i._1)(e,"images","resizeNearestNeighbor");s.hu(3===l.rank||4===l.rank,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${l.rank}.`),s.hu(2===t.length,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),s.hu("float32"===l.dtype||"int32"===l.dtype,()=>"`images` must have `int32` or `float32` as dtype"),s.hu(!1===o||!1===n,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let d=l,c=!1;3===l.rank&&(c=!0,d=(0,u.X)(l,[1,l.shape[0],l.shape[1],l.shape[2]]));let[]=t,p={images:d},f=r.BV.runKernel(a.dpD,p,{alignCorners:n,halfPixelCenters:o,size:t});return c?(0,u.X)(f,[f.shape[1],f.shape[2],f.shape[3]]):f}})},41546:function(e,t,n){"use strict";n.d(t,{A:function(){return p}});var r=n(99813),a=n(62347),i=n(77869),s=n(90890),o=n(57004),u=n(21772);let l=(0,u.op)({einsum_:/**
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
 */function(e,...t){let n=t.map((e,t)=>(0,r._1)(e,`tensors${t}`,"einsum"));return s.BV.runKernel(o.$g6,n,{equation:e})}});var d=n(72482),c=n(49658);let p=(0,u.op)({rgbToGrayscale_:/**
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
 */function(e){let t;let n=(0,r._1)(e,"image","RGBToGrayscale"),s=n.rank-1,o=n.shape[s];a.hu(n.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${n.rank}.`),a.hu(3===o,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${o}.`);let u=n.dtype,p=(0,i.p)(n,"float32"),f=(0,c.R)([.2989,.587,.114]);switch(n.rank){case 2:t=l("ij,j->i",p,f);break;case 3:t=l("ijk,k->ij",p,f);break;case 4:t=l("ijkl,l->ijk",p,f);break;case 5:t=l("ijklm,m->ijkl",p,f);break;case 6:t=l("ijklmn,n->ijklm",p,f);break;default:throw Error("Not a valid tensor rank.")}return t=(0,d.d)(t,-1),(0,i.p)(t,u)}})},98191:function(e,t,n){"use strict";n.d(t,{f:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({rotateWithOffset_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=0,o=.5){let u=(0,i._1)(e,"image","rotateWithOffset","float32");s.hu(4===u.rank,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${u.rank}.`);let l=r.BV.runKernel(a.b9H,{image:u},{radians:t,fillValue:n,center:o});return l}})},75857:function(e,t,n){"use strict";n.d(t,{L:function(){return A}});var r=n(49658),a=n(21772),i=n(77869),s=n(767),o=n(90890),u=n(57004),l=n(99813),d=n(62347);let c=(0,a.op)({bincount_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n){let r=(0,l._1)(e,"x","bincount"),a=(0,l._1)(t,"weights","bincount");return d.hu("int32"===r.dtype,()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),d.hu(n>=0,()=>`size must be non-negative, but got ${n}.`),d.hu(a.size===r.size||0===a.size,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${a.shape}.`),o.BV.runKernel(u.zvY,{x:r,weights:a},{size:n})}});var p=n(73386),f=n(88664),h=n(40536),m=n(81480),g=n(49594),b=n(57239),y=n(94920);let _=(0,a.op)({round_:/**
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
 */function(e){let t=(0,l._1)(e,"x","round");return o.BV.runKernel(u.e07,{x:t})}});var w=n(14840),I=n(43941),k=n(91380),S=n(79336),v=n(37827);let A=(0,a.op)({threshold_:/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t="binary",n=!1,a=.5){let o,u,A,M;let B=(0,l._1)(e,"image","threshold"),x=B.shape[0]*B.shape[1],N=(0,g.d)((0,r.R)([a]),255);if(d.hu(3===B.rank,()=>`Error in threshold: image must be rank 3,but got rank ${B.rank}.`),d.hu(3===B.shape[2]||1===B.shape[2],()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${B.shape[2]}.`),d.hu("int32"===B.dtype||"float32"===B.dtype,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${B.dtype}.`),d.hu("otsu"===t||"binary"===t,()=>`Method must be binary or otsu, but was ${t}`),3===B.shape[2]){[o,u,A]=(0,s.V)(B,[1,1,1],-1);let e=(0,g.d)(o,.2989),t=(0,g.d)(u,.587),n=(0,g.d)(A,.114);M=(0,m.I)((0,m.I)(e,t),n)}else M=e;if("otsu"===t){let e=c((0,i.p)(_(M),"int32"),(0,v.X)([]),256);N=function(e,t){let n,a,i,s,o,u,l=(0,r.R)([-1]),d=(0,r.R)([0]),c=(0,r.R)([0]);for(let p=0;p<e.size-1;p++){n=(0,k.t)(e,0,p+1),a=(0,k.t)(e,p+1),o=(0,b.h)((0,h.S)(n),t),u=(0,b.h)((0,h.S)(a),t);let _=(0,h.S)((0,g.d)(n,(0,S.w)(0,n.size)));i=(0,b.h)(_,(0,h.S)(n));let v=(0,I.h)(a.shape,n.size),A=(0,m.I)((0,S.w)(0,a.size),v),M=(0,g.d)(a,A);s=(0,b.h)((0,h.S)(M),(0,h.S)(a));let B=(0,y.l)(i,s),x=(0,y.l)(i,s),N=(0,g.d)(o,u);c=(0,g.d)((0,g.d)(N,B),x);let D=(0,f.p)(c,d);d=(0,w.a)(D,c,d),l=(0,w.a)(D,(0,r.R)([p]),l)}return l}(e,x)}let D=n?(0,p.z)(M,N):(0,f.p)(M,N),T=(0,i.p)((0,g.d)(D,255),"int32");return T}})},99603:function(e,t,n){"use strict";n.d(t,{v:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({transform_:/**
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
 */function(e,t,n="nearest",o="constant",u=0,l){let d=(0,i._1)(e,"image","transform","float32"),c=(0,i._1)(t,"transforms","transform","float32");return s.hu(4===d.rank,()=>`Error in transform: image must be rank 4,but got rank ${d.rank}.`),s.hu(2===c.rank&&(c.shape[0]===d.shape[0]||1===c.shape[0])&&8===c.shape[1],()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),s.hu(null==l||2===l.length,()=>`Error in transform: outputShape must be [height, width] or null, but got ${l}.`),r.BV.runKernel(a.wx7,{image:d,transforms:c},{interpolation:n,fillMode:o,fillValue:u,outputShape:l})}})},73386:function(e,t,n){"use strict";n.d(t,{z:function(){return l}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(3109),u=n(21772);let l=(0,u.op)({lessEqual_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","lessEqual","string_or_numeric"),u=(0,s._1)(t,"b","lessEqual","string_or_numeric");[n,u]=(0,i.T_)(n,u),(0,o.assertAndGetBroadcastShape)(n.shape,u.shape);let l={a:n,b:u};return r.BV.runKernel(a.CAk,l)}})},81714:function(e,t,n){"use strict";n.d(t,{P:function(){return S}});var r=n(99813),a=n(62347),i=n(90890),s=n(57004),o=n(15813),u=n(3109),l=n(21772);let d=(0,l.op)({greaterEqual_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"a","greaterEqual","string_or_numeric"),a=(0,r._1)(t,"b","greaterEqual","string_or_numeric");[n,a]=(0,o.T_)(n,a),(0,u.assertAndGetBroadcastShape)(n.shape,a.shape);let l={a:n,b:a};return i.BV.runKernel(s.Acj,l)}}),c=(0,l.op)({less_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"a","less","string_or_numeric"),a=(0,r._1)(t,"b","less","string_or_numeric");[n,a]=(0,o.T_)(n,a),(0,u.assertAndGetBroadcastShape)(n.shape,a.shape);let l={a:n,b:a};return i.BV.runKernel(s.vtC,l)}});var p=n(73386);let f=(0,l.op)({logicalAnd_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"a","logicalAnd","bool"),a=(0,r._1)(t,"b","logicalAnd","bool");return(0,u.assertAndGetBroadcastShape)(n.shape,a.shape),i.BV.runKernel(s.PYm,{a:n,b:a})}});var h=n(78783),m=n(98389),g=n(79336),b=n(5327),y=n(41106),_=n(94920),w=n(81751),I=n(14840),k=n(20253);let S=(0,l.op)({bandPart_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n){let i,s;let o=(0,r._1)(e,"a","bandPart");(0,a.hu)(o.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${o.rank}.`);let u=o.shape,[l,S]=o.shape.slice(-2);"number"==typeof t?((0,a.hu)(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),(0,a.hu)(t<=l,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${l}).`),i=(0,r._1)(t<0?l:t,"numLower","bandPart")):((0,a.hu)("int32"===t.dtype,()=>"bandPart(): numLower's dtype must be an int32."),i=(0,I.a)(c(t,0),l,(0,h.L)(t,l))),"number"==typeof n?((0,a.hu)(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),(0,a.hu)(n<=S,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${S}).`),s=(0,r._1)(n<0?S:n,"numUpper","bandPart")):((0,a.hu)("int32"===n.dtype,()=>"bandPart(): numUpper's dtype must be an int32."),s=(0,I.a)(c(n,0),S,(0,h.L)(n,S)));let v=(0,b.X)((0,g.w)(0,l,1,"int32"),[-1,1]),A=(0,g.w)(0,S,1,"int32"),M=(0,_.l)(v,A),B=f((0,p.z)(M,i),d(M,(0,m.W)(s))),x=(0,k.l)([l,S],o.dtype);return(0,b.X)((0,y.k)((0,w.H)((0,b.X)(o,[-1,l,S])).map(e=>(0,I.a)(B,e,x))),u)}})},56755:function(e,t,n){"use strict";n.d(t,{G:function(){return g}});var r=n(90890),a=n(62347),i=n(57239),s=n(49594),o=n(20997),u=n(21772),l=n(767),d=n(99813),c=n(5327);let p=(0,u.op)({squeeze_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,d._1)(e,"x","squeeze","string_or_numeric");return(0,c.X)(n,(0,a.bp)(n.shape,t).newShape)}});var f=n(41106),h=n(94920),m=n(40536);let g=(0,u.op)({gramSchmidt_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;if(Array.isArray(e)){t=!1,(0,a.hu)(null!=e&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let n=e[0].shape[0];for(let t=1;t<e.length;++t)(0,a.hu)(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=(0,l.V)(e,e.shape[0],0).map(e=>p(e,[0]));(0,a.hu)(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);let n=[],u=e;for(let t=0;t<e.length;++t)n.push(r.BV.tidy(()=>{let e=u[t];if(t>0)for(let r=0;r<t;++r){let t=(0,s.d)((0,m.S)((0,s.d)(n[r],e)),n[r]);e=(0,h.l)(e,t)}return(0,i.h)(e,(0,o.K)(e,"euclidean"))}));return t?(0,f.k)(n,0):n}})},63017:function(e,t,n){"use strict";n.d(t,{qr:function(){return R}});var r=n(90890),a=n(47585),i=n(62347),s=n(45208),o=n(71059),u=n(57239),l=n(25694),d=n(72482),c=n(21772),p=n(5327),f=n(8947);let h=(0,c.op)({eye_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,r="float32"){null==t&&(t=e);let a=(0,l.f)([e,t],r),i=e<=t?e:t;for(let e=0;e<i;++e)a.set(1,e,e);let s=(0,p.X)(a.toTensor(),[e,t]);if(null==n)return s;if(1===n.length)return(0,f.G)((0,d.d)(s,0),[n[0],1,1]);if(2===n.length)return(0,f.G)((0,d.d)((0,d.d)(s,0),0),[n[0],n[1],1,1]);if(3===n.length)return(0,f.G)((0,d.d)((0,d.d)((0,d.d)(s,0),0),0),[n[0],n[1],n[2],1,1]);throw Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}});var m=n(88664),g=n(70343),b=n(49594),y=n(98389),_=n(20997),w=n(91380),I=n(41106),k=n(94920),S=n(82260),v=n(57004),A=n(99813),M=n(55539),B=n(39240),x=n(61450);let N=(0,c.op)({transpose_:/**
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
 */function(e,t,n){let s=(0,A._1)(e,"x","transpose");if(null==t&&(t=s.shape.map((e,t)=>t).reverse()),i.hu(s.rank===t.length,()=>`Error in transpose: rank of input ${s.rank} must match length of perm ${t}.`),t.forEach(e=>{i.hu(e>=0&&e<s.rank,()=>`All entries in 'perm' must be between 0 and ${s.rank-1} but got ${t}`)}),s.rank<=1)return s.clone();let o={perm:t};return"complex64"===s.dtype?(0,a.lu)(()=>{let e=(0,x.k)(s),t=(0,B.a)(s);return e=r.BV.runKernel(v.G3Y,{x:e},o),t=r.BV.runKernel(v.G3Y,{x:t},o),n&&(t=(0,y.W)(t)),(0,M.P)(e,t)}):r.BV.runKernel(v.G3Y,{x:s},o)}});var D=n(81751),T=n(14840);function qr2d(e,t=!1){return r.BV.tidy(()=>{(0,i.hu)(2===e.shape.length,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);let n=e.shape[0],l=e.shape[1],d=h(n),c=(0,s.d)(e),p=(0,S.o)([[1]],[1,1]),f=(0,s.d)(p),I=n>=l?l:n;for(let e=0;e<I;++e){let t=c,i=f,h=d;[f,c,d]=r.BV.tidy(()=>{let t=(0,w.t)(c,[e,e],[n-e,1]),r=(0,_.K)(t),a=(0,w.t)(c,[e,e],[1,1]),i=(0,T.a)((0,m.p)(a,0),(0,S.o)([[-1]]),(0,S.o)([[1]])),h=(0,k.l)(a,(0,b.d)(i,r)),I=(0,u.h)(t,h);f=1===I.shape[0]?(0,s.d)(p):(0,o.z)([p,(0,w.t)(I,[1,0],[I.shape[0]-1,I.shape[1]])],0);let v=(0,y.W)((0,u.h)((0,g.O)(i,h),r)),A=(0,w.t)(c,[e,0],[n-e,l]),M=(0,b.d)(v,f),B=N(f);if(0===e)c=(0,k.l)(A,(0,g.O)(M,(0,g.O)(B,A)));else{let t=(0,k.l)(A,(0,g.O)(M,(0,g.O)(B,A)));c=(0,o.z)([(0,w.t)(c,[0,0],[e,l]),t],0)}let x=N(M),D=(0,w.t)(d,[0,e],[n,d.shape[1]-e]);if(0===e)d=(0,k.l)(D,(0,g.O)((0,g.O)(D,f),x));else{let t=(0,k.l)(D,(0,g.O)((0,g.O)(D,f),x));d=(0,o.z)([(0,w.t)(d,[0,0],[n,e]),t],1)}return[f,c,d]}),(0,a.B9)([t,i,h])}return!t&&n>l&&(d=(0,w.t)(d,[0,0],[n,l]),c=(0,w.t)(c,[0,0],[l,l])),[d,c]})}let R=(0,c.op)({qr_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=!1){if((0,i.hu)(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),2===e.rank)return qr2d(e,t);{let n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=(0,D.H)((0,p.X)(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),a=[],i=[];r.forEach(e=>{let[n,r]=qr2d(e,t);a.push(n),i.push(r)});let s=(0,p.X)((0,I.k)(a,0),e.shape),o=(0,p.X)((0,I.k)(i,0),e.shape);return[s,o]}}})},51604:function(e,t,n){"use strict";n.d(t,{c:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({log_:/**
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
 */function(e){let t=(0,i._1)(e,"x","log","float32");return r.BV.runKernel(a.ZbH,{x:t})}})},22612:function(e,t,n){"use strict";var r,a;n.d(t,{I:function(){return r}}),(a=r||(r={}))[a.NONE=0]="NONE",a[a.MEAN=1]="MEAN",a[a.SUM=2]="SUM",a[a.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"},66701:function(e,t,n){"use strict";n.d(t,{O:function(){return d}});var r=n(99813),a=n(62347),i=n(88178),s=n(22612),o=n(21772),u=n(94920),l=n(74919);let d=(0,o.op)({absoluteDifference_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,o=s.I.SUM_BY_NONZERO_WEIGHTS){let d=(0,r._1)(e,"labels","absoluteDifference"),c=(0,r._1)(t,"predictions","absoluteDifference"),p=null;null!=n&&(p=(0,r._1)(n,"weights","absoluteDifference")),(0,a.k5)(d.shape,c.shape,"Error in absoluteDifference: ");let f=(0,i.W)((0,u.l)(d,c));return(0,l.m)(f,p,o)}})},74919:function(e,t,n){"use strict";n.d(t,{m:function(){return w}});var r=n(99813),a=n(77869),i=n(57239),s=n(22612),o=n(27010),u=n(49594),l=n(90890),d=n(57004),c=n(15813),p=n(3109),f=n(21772);let h=(0,f.op)({notEqual_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"a","notEqual","string_or_numeric"),a=(0,r._1)(t,"b","notEqual","string_or_numeric");[n,a]=(0,c.T_)(n,a),(0,p.assertAndGetBroadcastShape)(n.shape,a.shape);let i={a:n,b:a};return l.BV.runKernel(d.yQU,i)}});var m=n(62347),g=n(55539),b=n(20253),y=n(81080),_=n(40536);let w=(0,f.op)({computeWeightedLoss_:function(e,t,n=s.I.SUM_BY_NONZERO_WEIGHTS){let d=(0,r._1)(e,"losses","computeWeightedLoss"),c=null;null!=t&&(c=(0,r._1)(t,"weights","computeWeightedLoss"));let p=null==c?d:(0,u.d)(d,c);if(n===s.I.NONE)return p;if(n===s.I.SUM)return(0,_.S)(p);if(n===s.I.MEAN){if(null==c)return(0,o.J)(p);{let e=d.size/c.size,t=(0,i.h)((0,_.S)(p),(0,_.S)(c));return e>1?(0,i.h)(t,(0,y.i)(e)):t}}if(n===s.I.SUM_BY_NONZERO_WEIGHTS){if(null==c)return(0,i.h)((0,_.S)(p),(0,y.i)(d.size));{let e=(0,u.d)(c,/**
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
 */function ones(e,t="float32"){if((0,m.Mu)(e),"complex64"===t){let t=ones(e,"float32"),n=(0,b.l)(e,"float32");return(0,g.P)(t,n)}let n=(0,m.p8)((0,m.NA)(e),t);return l.BV.makeTensor(n,e,t)}(d.shape)),t=(0,a.p)((0,_.S)(h(e,(0,y.i)(0))),"float32");return(0,i.h)((0,_.S)(p),t)}}throw Error(`Unknown reduction: ${n}`)}})},45586:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(99813),a=n(62347),i=n(22612),s=n(49594),o=n(21772),u=n(81080),l=n(94920),d=n(40536),c=n(74919);let p=(0,o.op)({cosineDistance_:function(e,t,n,o,p=i.I.SUM_BY_NONZERO_WEIGHTS){let f=(0,r._1)(e,"labels","cosineDistance"),h=(0,r._1)(t,"predictions","cosineDistance"),m=null;null!=o&&(m=(0,r._1)(o,"weights","cosineDistance")),(0,a.k5)(f.shape,h.shape,"Error in cosineDistance: ");let g=(0,u.i)(1),b=(0,l.l)(g,(0,d.S)((0,s.d)(f,h),n,!0));return(0,c.m)(b,m,p)}})},96537:function(e,t,n){"use strict";n.d(t,{O:function(){return p}});var r=n(99813),a=n(62347),i=n(22612),s=n(49594),o=n(21772),u=n(78796),l=n(81080),d=n(94920),c=n(74919);let p=(0,o.op)({hingeLoss_:function(e,t,n,o=i.I.SUM_BY_NONZERO_WEIGHTS){let p=(0,r._1)(e,"labels","hingeLoss"),f=(0,r._1)(t,"predictions","hingeLoss"),h=null;null!=n&&(h=(0,r._1)(n,"weights","hingeLoss")),(0,a.k5)(p.shape,f.shape,"Error in hingeLoss: ");let m=(0,l.i)(1);p=(0,d.l)((0,s.d)((0,l.i)(2),p),m);let g=(0,u.U)((0,d.l)(m,(0,s.d)(p,f)));return(0,c.m)(g,h,o)}})},45553:function(e,t,n){"use strict";n.d(t,{H:function(){return m}});var r=n(99813),a=n(62347),i=n(88178),s=n(81480),o=n(22612),u=n(78783),l=n(49594),d=n(21772),c=n(81080),p=n(70052),f=n(94920),h=n(74919);let m=(0,d.op)({huberLoss_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,d=1,m=o.I.SUM_BY_NONZERO_WEIGHTS){let g=(0,r._1)(e,"labels","huberLoss"),b=(0,r._1)(t,"predictions","huberLoss"),y=null;null!=n&&(y=(0,r._1)(n,"weights","huberLoss")),(0,a.k5)(g.shape,b.shape,"Error in huberLoss: ");let _=(0,c.i)(d),w=(0,i.W)((0,f.l)(b,g)),I=(0,u.L)(w,_),k=(0,f.l)(w,I),S=(0,s.I)((0,l.d)((0,c.i)(.5),(0,p.h)(I)),(0,l.d)(_,k));return(0,h.m)(S,y,m)}})},95082:function(e,t,n){"use strict";n.d(t,{g:function(){return h}});var r=n(99813),a=n(62347),i=n(81480),s=n(51604),o=n(22612),u=n(49594),l=n(98389),d=n(21772),c=n(81080),p=n(94920),f=n(74919);let h=(0,d.op)({logLoss_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,d=1e-7,h=o.I.SUM_BY_NONZERO_WEIGHTS){let m=(0,r._1)(e,"labels","logLoss"),g=(0,r._1)(t,"predictions","logLoss"),b=null;null!=n&&(b=(0,r._1)(n,"weights","logLoss")),(0,a.k5)(m.shape,g.shape,"Error in logLoss: ");let y=(0,c.i)(1),_=(0,c.i)(d),w=(0,l.W)((0,u.d)(m,(0,s.c)((0,i.I)(g,_)))),I=(0,u.d)((0,p.l)(y,m),(0,s.c)((0,i.I)((0,p.l)(y,g),_))),k=(0,p.l)(w,I);return(0,f.m)(k,b,h)}})},99556:function(e,t,n){"use strict";n.d(t,{F:function(){return f}});var r=n(99813),a=n(62347),i=n(22612),s=n(21772),o=n(90890),u=n(57004),l=n(15813),d=n(3109);let c=(0,s.op)({squaredDifference_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"a","squaredDifference"),a=(0,r._1)(t,"b","squaredDifference");[n,a]=(0,l.T_)(n,a),(0,d.assertAndGetBroadcastShape)(n.shape,a.shape);let i={a:n,b:a};return o.BV.runKernel(u._tC,i,{})}});var p=n(74919);let f=(0,s.op)({meanSquaredError_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n,s=i.I.SUM_BY_NONZERO_WEIGHTS){let o=(0,r._1)(e,"labels","meanSquaredError"),u=(0,r._1)(t,"predictions","meanSquaredError"),l=null;null!=n&&(l=(0,r._1)(n,"weights","meanSquaredError")),(0,a.k5)(o.shape,u.shape,"Error in meanSquaredError: ");let d=c(o,u);return(0,p.m)(d,l,s)}})},67772:function(e,t,n){"use strict";n.d(t,{f:function(){return _}});var r=n(99813),a=n(62347),i=n(88178),s=n(81480),o=n(79101),u=n(90890),l=n(57004),d=n(21772);let c=(0,d.op)({log1p_:/**
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
 */function(e){let t=(0,r._1)(e,"x","log1p");return u.BV.runKernel(l.kU,{x:t})}});var p=n(22612),f=n(49594),h=n(98389),m=n(78796),g=n(81080),b=n(94920),y=n(74919);let _=(0,d.op)({sigmoidCrossEntropy_:function(e,t,n,u=0,l=p.I.SUM_BY_NONZERO_WEIGHTS){let d=(0,r._1)(e,"multiClassLabels","sigmoidCrossEntropy"),_=(0,r._1)(t,"logits","sigmoidCrossEntropy"),w=null;if(null!=n&&(w=(0,r._1)(n,"weights","sigmoidCrossEntropy")),(0,a.k5)(d.shape,_.shape,"Error in sigmoidCrossEntropy: "),u>0){let e=(0,g.i)(u),t=(0,g.i)(1),n=(0,g.i)(.5);d=(0,s.I)((0,f.d)(d,(0,b.l)(t,e)),(0,f.d)(n,e))}let I=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,r._1)(e,"labels","sigmoidCrossEntropyWithLogits"),u=(0,r._1)(t,"logits","sigmoidCrossEntropyWithLogits");(0,a.k5)(n.shape,u.shape,"Error in sigmoidCrossEntropyWithLogits: ");let l=(0,m.U)(u),d=(0,f.d)(u,n),p=c((0,o.Q)((0,h.W)((0,i.W)(u))));return(0,s.I)((0,b.l)(l,d),p)}(d,_);return(0,y.m)(I,w,l)}})},11300:function(e,t,n){"use strict";n.d(t,{E:function(){return S}});var r=n(1354),a=n(99813),i=n(62347),s=n(81480),o=n(8218),u=n(77869),l=n(57239),d=n(79101),c=n(51604),p=n(93334),f=n(21772),h=n(5327),m=n(94920),g=n(40536);let b=(0,f.op)({logSumExp_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=null,n=!1){let r=(0,a._1)(e,"x","logSumExp"),u=(0,i.EC)(t,r.shape),l=(0,p.F)(r,u,!0),f=(0,m.l)(r,l),b=(0,d.Q)(f),y=(0,g.S)(b,u),_=(0,c.c)(y),w=(0,s.I)((0,h.X)(l,_.shape),_);if(n){let e=(0,o.rv)(w.shape,u);return(0,h.X)(w,e)}return w}});var y=n(22612),_=n(49594),w=n(98389),I=n(81080),k=n(74919);let S=(0,f.op)({softmaxCrossEntropy_:function(e,t,n,c=0,p=y.I.SUM_BY_NONZERO_WEIGHTS){let f=(0,a._1)(e,"onehotLabels","softmaxCrossEntropy"),S=(0,a._1)(t,"logits","softmaxCrossEntropy"),v=null;if(null!=n&&(v=(0,a._1)(n,"weights","softmaxCrossEntropy")),(0,i.k5)(f.shape,S.shape,"Error in softmaxCrossEntropy: "),c>0){let e=(0,I.i)(c),t=(0,I.i)(1),n=(0,I.i)(f.shape[1]);f=(0,s.I)((0,_.d)(f,(0,m.l)(t,e)),(0,l.h)(e,n))}let A=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=-1){if(-1===n&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${n}`);let a=(0,r.cb)((e,t,r)=>{let a=b(t,[n],!0),i=(0,m.l)((0,u.p)(t,"float32"),a);r([e,i]);let s=(0,w.W)((0,_.d)(i,e)),l=(0,g.S)(s,[n]);return{value:l,gradFunc:(e,t)=>{let[r,a]=t,i=(0,o.rv)(e.shape,[n]);return[(0,_.d)((0,h.X)(e,i),(0,m.l)((0,u.p)(r,"float32"),(0,d.Q)(a))),(0,_.d)((0,h.X)(e,i),(0,m.l)((0,d.Q)(a),(0,u.p)(r,"float32")))]}}});return a(e,t)}(f,S);return(0,k.m)(A,v,p)}})},70343:function(e,t,n){"use strict";n.d(t,{O:function(){return u}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({matMul_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=!1,o=!1){let u=(0,s._1)(e,"a","matMul"),l=(0,s._1)(t,"b","matMul");[u,l]=(0,i.T_)(u,l);let d={a:u,b:l};return r.BV.runKernel(a.XLW,d,{transposeA:n,transposeB:o})}})},93334:function(e,t,n){"use strict";n.d(t,{F:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({max_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=null,n=!1){let s=(0,i._1)(e,"x","max");return r.BV.runKernel(a.YoZ,{x:s},{reductionIndices:t,keepDims:n})}})},27010:function(e,t,n){"use strict";n.d(t,{J:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({mean_:/**
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
 */function(e,t=null,n=!1){let s=(0,i._1)(e,"x","mean");return r.BV.runKernel(a.q2K,{x:s},{axis:t,keepDims:n})}})},78783:function(e,t,n){"use strict";n.d(t,{L:function(){return d}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(3109),u=n(77869),l=n(21772);let d=(0,l.op)({minimum_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","minimum"),l=(0,s._1)(t,"b","minimum");[n,l]=(0,i.T_)(n,l),"bool"===n.dtype&&(n=(0,u.p)(n,"int32"),l=(0,u.p)(l,"int32")),(0,o.assertAndGetBroadcastShape)(n.shape,l.shape);let d={a:n,b:l};return r.BV.runKernel(a.q8u,d)}})},49594:function(e,t,n){"use strict";n.d(t,{d:function(){return u}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({mul_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","mul"),o=(0,s._1)(t,"b","mul");[n,o]=(0,i.T_)(n,o);let u={a:n,b:o};return r.BV.runKernel(a.wYn,u)}})},98389:function(e,t,n){"use strict";n.d(t,{W:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({neg_:/**
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
 */function(e){let t=(0,i._1)(e,"x","neg");return r.BV.runKernel(a.kuV,{x:t})}})},62340:function(e,t,n){"use strict";n.d(t,{e:function(){return nonMaxSuppSanityCheck}});var r=n(62347);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nonMaxSuppSanityCheck(e,t,n,a,i,s){null==a&&(a=.5),null==i&&(i=Number.NEGATIVE_INFINITY),null==s&&(s=0);let o=e.shape[0];return n=Math.min(n,o),r.hu(0<=a&&a<=1,()=>`iouThreshold must be in [0, 1], but was '${a}'`),r.hu(2===e.rank,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),r.hu(4===e.shape[1],()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),r.hu(1===t.rank,()=>"scores must be a 1D tensor"),r.hu(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),r.hu(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:n,iouThreshold:a,scoreThreshold:i,softNmsSigma:s}}},20997:function(e,t,n){"use strict";n.d(t,{K:function(){return y}});var r=n(99813),a=n(62347),i=n(88178),s=n(8218),o=n(93334),u=n(90890),l=n(57004),d=n(21772);let c=(0,d.op)({min_:/**
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
 */function(e,t=null,n=!1){let a=(0,r._1)(e,"x","min");return u.BV.runKernel(l.c17,{x:a},{axis:t,keepDims:n})}});var p=n(60095),f=n(5327),h=n(81080),m=n(89639),g=n(70052),b=n(40536);let y=(0,d.op)({norm_:/**
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
 */function(e,t="euclidean",n=null,u=!1){e=(0,r._1)(e,"x","norm");let l=function normImpl(e,t,n=null){if(0===e.rank)return(0,i.W)(e);if(1!==e.rank&&null===n)return normImpl((0,f.X)(e,[-1]),t,n);if(1===e.rank||"number"==typeof n||Array.isArray(n)&&1===n.length){if(1===t)return(0,b.S)((0,i.W)(e),n);if(t===1/0)return(0,o.F)((0,i.W)(e),n);if(t===-1/0)return c((0,i.W)(e),n);if("euclidean"===t||2===t)return(0,m._)((0,b.S)((0,p.s)((0,i.W)(e),(0,h.i)(2,"int32")),n));throw Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&2===n.length){if(1===t)return(0,o.F)((0,b.S)((0,i.W)(e),n[0]),n[1]-1);if(t===1/0)return(0,o.F)((0,b.S)((0,i.W)(e),n[1]),n[0]);if(t===-1/0)return c((0,b.S)((0,i.W)(e),n[1]),n[0]);if("fro"===t||"euclidean"===t)return(0,m._)((0,b.S)((0,g.h)(e),n));throw Error(`Error in norm: invalid ord value: ${t}`)}throw Error(`Error in norm: invalid axis: ${n}`)}(e,t,n),d=l.shape;if(u){let t=(0,a.EC)(n,e.shape);d=s.rv(l.shape,t)}return(0,f.X)(l,d)}})},21772:function(e,t,n){"use strict";n.d(t,{op:function(){return op}});var r=n(90890),a=n(62347);function op(e){let t=Object.keys(e);if(1!==t.length)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0],i=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n+="__op";let f2=(...e)=>{r.BV.startScope(n);try{let t=i(...e);return(0,a.tI)(t)&&console.error("Cannot return a Promise inside of tidy."),r.BV.endScope(t),t}catch(e){throw r.BV.endScope(null),e}};return Object.defineProperty(f2,"name",{value:n,configurable:!0}),f2}},3979:function(e,t,n){"use strict";n.d(t,{N:function(){return u}});var r=n(99813),a=n(62347),i=n(70343),s=n(21772),o=n(5327);let u=(0,s.op)({outerProduct_:function(e,t){let n=(0,r._1)(e,"v1","outerProduct"),s=(0,r._1)(t,"v2","outerProduct");a.hu(1===n.rank&&1===s.rank,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${s.rank}.`);let u=(0,o.X)(n,[-1,1]),l=(0,o.X)(s,[1,-1]);return(0,i.O)(u,l)}})},60095:function(e,t,n){"use strict";n.d(t,{s:function(){return u}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({pow_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"base","pow"),o=(0,s._1)(t,"exp","pow");[n,o]=(0,i.T_)(n,o);let u={a:n,b:o};return r.BV.runKernel(a.pe_,u)}})},58743:function(e,t,n){"use strict";var r,a;function combineRaggedTensorToTensorShapes(e,t,n){let r=[];if(null==n&&null==t)return r;if(null==t)for(;r.length<e+n.length;)r.push(-1);else r=t.slice();if(null==n)return r;if(e+n.length!==r.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${r.length}`);for(let a=1;a<n.length;++a){let i=n[a],s=r[r.length-n.length+a],o=r[s];if(i>=0){if(o>=0){if(o!==i)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${a+e}] = ${i} but shape[${a+e}] = ${o}`)}else r[s]=i}}return r}function getRowPartitionTypesHelper(e){let t={FIRST_DIM_SIZE:r.FIRST_DIM_SIZE,VALUE_ROWIDS:r.VALUE_ROWIDS,ROW_LENGTHS:r.ROW_LENGTHS,ROW_SPLITS:r.ROW_SPLITS,ROW_LIMITS:r.ROW_LIMITS,ROW_STARTS:r.ROW_STARTS},n=[];for(let r of e)if(r in t)n.push(t[r]);else break;return n}function getRaggedRank(e){return 0===e.length?0:e[0]===r.FIRST_DIM_SIZE?e.length-1:e.length}function validateDefaultValueShape(e,t){if(null==e||null==t)return;let n=e.length,r=t.length;if(n>=r)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let a=0;a<Math.min(n,r-1);++a){let n=e[a],r=t[a+1];if(n>=0&&r>=0&&1!==n&&n!==r)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${a-e.length}] = ${n} but ragged tensor input.flatValues.shape[${a-e.length}] = ${r}`)}}n.d(t,{Qd:function(){return combineRaggedTensorToTensorShapes},Qh:function(){return getRaggedRank},Ys:function(){return validateDefaultValueShape},b2:function(){return r},zb:function(){return getRowPartitionTypesHelper}}),(a=r||(r={}))[a.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",a[a.VALUE_ROWIDS=1]="VALUE_ROWIDS",a[a.ROW_LENGTHS=2]="ROW_LENGTHS",a[a.ROW_SPLITS=3]="ROW_SPLITS",a[a.ROW_LIMITS=4]="ROW_LIMITS",a[a.ROW_STARTS=5]="ROW_STARTS"},79336:function(e,t,n){"use strict";n.d(t,{w:function(){return range}});var r=n(90890),a=n(57004);/**
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
 */function range(e,t,n=1,i="float32"){if(0===n)throw Error("Cannot have a step of zero");return r.BV.runKernel(a.e6w,{},{start:e,stop:t,step:n,dtype:i})}},61450:function(e,t,n){"use strict";n.d(t,{k:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({real_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,i._1)(e,"input","real");return r.BV.runKernel(a.xJR,{input:t})}})},25533:function(e,t,n){"use strict";n.d(t,{A:function(){return computeOptimalWindowSize},g:function(){return a}});var r=n(62347);/**
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
 */let a=30;function computeOptimalWindowSize(e){return e<=a?e:(0,r.jP)(e,Math.floor(Math.sqrt(e)))}},78796:function(e,t,n){"use strict";n.d(t,{U:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({relu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=(0,i._1)(e,"x","relu");return r.BV.runKernel(a.qkr,{x:t})}})},5327:function(e,t,n){"use strict";n.d(t,{X:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({reshape_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,i._1)(e,"x","reshape","string_or_numeric");return r.BV.runKernel(a.HZH,{x:n},{shape:t})}})},55191:function(e,t,n){"use strict";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getImageCenter(e,t,n){let r=n*("number"==typeof e?e:e[0]),a=t*("number"==typeof e?e:e[1]);return[r,a]}n.d(t,{Q:function(){return getImageCenter}})},81080:function(e,t,n){"use strict";n.d(t,{i:function(){return scalar}});var r=n(87767),a=n(32958);/**
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
 */function scalar(e,t){if(((0,r.isTypedArray)(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&(0,r.isTypedArray)(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return(0,a.H)(e,[],[],t)}},67846:function(e,t,n){"use strict";n.r(t),n.d(t,{calculateShapes:function(){return calculateShapes},validateInput:function(){return validateInput},validateUpdateShape:function(){return validateUpdateShape}});var r=n(62347);function validateUpdateShape(e,t,n){let r=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,i=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${r}, and batchDim: ${a}.`;if(n.rank<a)throw Error(i+` update.rank < ${a}. `);if(e.length<r+(n.rank-a))throw Error(i+` Output shape length < ${r+(n.rank-a)}`);if(n.rank!==a+e.length-r)throw Error(i+` update.rank != ${a+e.length-r}`);for(let e=0;e<a;++e)if(n.shape[e]!==t.shape[e])throw Error(i+` updates.shape[${e}] (${n.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<n.rank-a;++t)if(n.shape[t+a]!==e[t+r])throw Error(i+` updates.shape[${t+a}] (${n.shape[t+a]}) != shape[${t+a}] (${e[t+a]})`)}function validateInput(e,t,n){if(t.rank<1)throw Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(0===n.length){if(0===t.size)throw Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(0===e.size)throw Error(`Updates specified for empty output. updates shape: ${e.shape}`)}validateUpdateShape(n,t,e)}function calculateShapes(e,t,n){let a=t.shape.length,i=a>1?t.shape[a-1]:1,s=n.length,o=1;for(let e=i;e<s;++e)o*=n[e];let u=i<1?1:i,l=(0,r.NA)(t.shape)/u,d=[...(0,r.e3)(n.slice(0,i)),1],c=(0,r.NA)(n);return{sliceRank:i,numUpdates:l,sliceSize:o,strides:d,outputSize:c}}},30389:function(e,t,n){"use strict";n.r(t),n.d(t,{collectGatherOpShapeInfo:function(){return collectGatherOpShapeInfo},computeOutShape:function(){return computeOutShape},segOpComputeOptimalWindowSize:function(){return segOpComputeOptimalWindowSize}});var r=n(62347),a=n(25533);/**
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
 */function segOpComputeOptimalWindowSize(e,t){let n,i=!1;for(e<=a.g?(n=e,i=!0):n=(0,r.jP)(e,Math.floor(Math.sqrt(e)));!i;)n>t||n===e?i=!0:n=(0,r.jP)(e,n+1);return n}function computeOutShape(e,t,n){let r=[],a=e.length;for(let i=0;i<a;i++)i!==t?r.push(e[i]):r.push(n);return r}function collectGatherOpShapeInfo(e,t,n,r){let a=t.shape.length,i=e.shape.length;if(0!==r&&(r<-a||r>a))throw Error(`Expect batchDims in the range of [-${a}, ${a}], but got ${r}`);if(r<0&&(r+=a),r>i)throw Error(`batchDims (${r}) must be less than rank(x) (
    ${i}).`);if(n<r)throw Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let n=0;n<r;++n)if(e.shape[n]!==t.shape[n])throw Error(`x.shape[${n}]: ${e.shape[n]} should be equal to indices.shape[${n}]: ${t.shape[n]}.`);let s=e.shape[n],o=[],u=1,l=1,d=1;for(let t=0;t<r;++t)o.push(e.shape[t]),u*=e.shape[t];for(let t=r;t<n;t++)o.push(e.shape[t]),l*=e.shape[t];for(let e=r;e<a;e++)o.push(t.shape[e]);for(let t=n+1;t<i;t++)o.push(e.shape[t]),d*=e.shape[t];return{batchSize:u,sliceSize:d,outerSize:l,dimSize:s,outputShape:o}}},42605:function(e,t,n){"use strict";n.d(t,{$:function(){return a},y:function(){return r}});/**
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
 */let r=1.7580993408473768,a=1.0507009873554805},58031:function(e,t,n){"use strict";n.d(t,{W:function(){return l}});var r=n(71059),a=n(43941),i=n(21772),s=n(5327),o=n(91380),u=n(82260);let l=(0,i.op)({frame_:/**
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
 */function(e,t,n,i=!1,l=0){let d=0,c=[];for(;d+t<=e.size;)c.push((0,o.t)(e,d,t)),d+=n;if(i)for(;d<e.size;){let i=d+t-e.size,s=(0,r.z)([(0,o.t)(e,d,t-i),(0,a.h)([i],l)]);c.push(s),d+=n}return 0===c.length?(0,u.o)([],[0,t]):(0,s.X)((0,r.z)(c),[c.length,t])}})},95677:function(e,t,n){"use strict";n.d(t,{f:function(){return i}});var r=n(21772),a=n(14306);let i=(0,r.op)({hammingWindow_:/**
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
 */function(e){return(0,a.m)(e,.54,.46)}})},98698:function(e,t,n){"use strict";n.d(t,{l:function(){return i}});var r=n(21772),a=n(14306);let i=(0,r.op)({hannWindow_:/**
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
 */function(e){return(0,a.m)(e,.5,.5)}})},27211:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(49594),a=n(21772),i=n(14306),s=n(1312),o=n(58031),u=n(98698);let l=(0,a.op)({stft_:/**
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
 */function(e,t,n,a,l=u.l){null==a&&(a=(0,i.G)(t));let d=(0,o.W)(e,t,n),c=(0,r.d)(d,l(t));return(0,s.Q)(c,a)}})},14306:function(e,t,n){"use strict";n.d(t,{G:function(){return enclosingPowerOfTwo},m:function(){return cosineWindow}});var r=n(49658);/**
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
 */function enclosingPowerOfTwo(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function cosineWindow(e,t,n){let a=1-e%2,i=new Float32Array(e);for(let r=0;r<e;++r){let s=2*Math.PI*r/(e+a-1);i[r]=t-n*Math.cos(s)}return(0,r.R)(i,"float32")}},93547:function(e,t,n){"use strict";n.d(t,{O:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sin_:/**
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
 */function(e){let t=(0,i._1)(e,"x","sin","float32");return r.BV.runKernel(a.RQH,{x:t})}})},91380:function(e,t,n){"use strict";n.d(t,{t:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({slice_:/**
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
 */function(e,t,n){let s=(0,i._1)(e,"x","slice","string_or_numeric");if(0===s.rank)throw Error("Slicing scalar is not possible");return r.BV.runKernel(a.p2w,{x:s},{begin:t,size:n})}})},26288:function(e,t,n){"use strict";n.d(t,{j:function(){return o}});var r=n(99813),a=n(62347),i=n(21772),s=n(91380);let o=(0,i.op)({slice1d_:/**
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
 */function(e,t,n){let i=(0,r._1)(e,"x","slice1d");return a.hu(1===i.rank,()=>`slice1d expects a rank-1 tensor, but got a rank-${i.rank} tensor`),(0,s.t)(i,[t],[n])}})},2353:function(e,t,n){"use strict";n.r(t),n.d(t,{assertParamsValid:function(){return assertParamsValid},computeFlatOffset:function(){return computeFlatOffset},computeOutShape:function(){return computeOutShape},getNormalizedAxes:function(){return getNormalizedAxes},isSliceContinous:function(){return isSliceContinous},maskToAxes:function(){return maskToAxes},parseSliceParams:function(){return parseSliceParams},sliceInfo:function(){return sliceInfo},startForAxis:function(){return startForAxis},startIndicesWithElidedDims:function(){return startIndicesWithElidedDims},stopForAxis:function(){return stopForAxis},stopIndicesWithElidedDims:function(){return stopIndicesWithElidedDims},stridesForAxis:function(){return stridesForAxis},stridesWithElidedDims:function(){return stridesWithElidedDims}});var r=n(62347);function assertParamsValid(e,t,n){let a=e.shape.length;r.hu(a===t.length,()=>`Error in slice${a}D: Length of begin ${t} must match the rank of the array (${a}).`),r.hu(a===n.length,()=>`Error in slice${a}D: Length of size ${n} must match the rank of the array (${a}).`);for(let i=0;i<a;++i)r.hu(t[i]+n[i]<=e.shape[i],()=>`Error in slice${a}D: begin[${i}] + size[${i}] (${t[i]+n[i]}) would overflow input.shape[${i}] (${e.shape[i]})`)}function maskToAxes(e){let t=[],n=0;for(;e>0;)1&e&&t.push(n),e/=2,n++;return t}function computeOutShape(e,t,n){let r=[];for(let a=0;a<e.length;a++)r[a]=Math.ceil((t[a]-e[a])/n[a]);return r}function stridesWithElidedDims(e,t,n,r){let a=[...e];for(let e=a.length;e<r.length;e++)a.push(1);for(let e=0;e<n;e++)0===e?a[t]=1:(a.splice(t,0,1),a.pop());return a}function getElidedAxes(e,t){let n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function getNormalizedAxes(e,t,n,r,a,i,s,o,u){let l=e.length,d=Array(l),c=Array(l),p=Array(l);if(t.length&&n>0){let u=t[0],l=n+1;d=startIndicesWithElidedDims(s,u,l,r,e),c=stopIndicesWithElidedDims(o,u,l,a,e),p=stridesWithElidedDims(i,u,l,e)}else for(let t=0;t<l;t++)d[t]=startForAxis(s,r,i,e,t,u),c[t]=stopForAxis(o,a,i,e,t,u),p[t]=stridesForAxis(i,t,u);return{begin:d,end:c,strides:p}}function startIndicesWithElidedDims(e,t,n,r,a){let i=[...a],s=getElidedAxes(n,t);for(let a=0;a<i.length;a++)if(s.indexOf(a)>-1)i[a]=0;else{var o;let s=(o=a)<=t?o:o-(n-1),u=r[s];e&1<<s&&(u=0),i[a]=u}return i}function stopIndicesWithElidedDims(e,t,n,a,i){let s=[...i],o=getElidedAxes(n,t);for(let r=0;r<s.length;r++)if(o.indexOf(r)>-1)s[r]=Number.MAX_SAFE_INTEGER;else{var u;let i=(u=r)<=t?u:u-(n-1),o=a[i];e&1<<i&&(o=Number.MAX_SAFE_INTEGER),s[r]=o}for(let e=0;e<s.length;e++){let t=i[e];s[e]<0&&(s[e]+=t),s[e]=r.uZ(0,s[e],i[e])}return s}function stridesForAxis(e,t,n){let r=e[t];return(n&1<<t||null==r)&&(r=1),r}function startForAxis(e,t,n,a,i,s){let o=t[i],u=n[i]||1;(e&1<<i||s&1<<i||null==o)&&(o=u>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);let l=a[i];return o<0&&(o+=l),o=r.uZ(0,o,l-1)}function stopForAxis(e,t,n,a,i,s){let o=t[i],u=n[i]||1;(e&1<<i||s&1<<i||null==o)&&(o=u>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);let l=a[i];return o<0&&(o+=l),o=u>0?r.uZ(0,o,l):r.uZ(-1,o,l-1)}function isSliceContinous(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let a=r+1;a<n.length;a++)if(t[a]>0||n[a]!==e[a])return!1;return!0}function computeFlatOffset(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function parseSliceParams(e,t,n){let a,i;let s=e.shape.length;return(a="number"==typeof t?[t,...Array(s-1).fill(0)]:t.length<s?t.concat(Array(s-t.length).fill(0)):t.slice()).forEach(e=>{r.hu(-1!==e,()=>"slice() does not support negative begin indexing.")}),i=(i=null==n?Array(s).fill(-1):"number"==typeof n?[n,...Array(s-1).fill(-1)]:n.length<s?n.concat(Array(s-n.length).fill(-1)):n).map((t,n)=>t>=0?t:(r.hu(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-a[n])),[a,i]}function sliceInfo(e,t,n,r,a,i,s,o,u){let l;if(null==r?(l=Array(t.length)).fill(1):l=r,null!=s&&(s&s-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");let d=!1,c={dims:l.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:l.slice(),beginMask:a,endMask:i,ellipsisMask:s,newAxisMask:o,shrinkAxisMask:u};for(let e=0;e<c.dims;e++)d&&(1<<e&o)!=0&&c.numAddAxisAfterEllipsis++,1<<e&s&&(d=!0);!d&&(c.ellipsisMask|=1<<c.dims,c.dims++);let p={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};!function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(let r=0;r<e.dims;r++)if(1<<r&e.ellipsisMask){let a=Math.min(t.dims-(e.dims-r)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<a;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);null!=e.begin&&(t.begin[n]=e.begin[r]),null!=e.end&&(t.end[n]=e.end[r]),t.strides[n]=e.strides[r],e.beginMask&1<<r&&(t.beginMask|=1<<n),e.endMask&1<<r&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[n]=r,n++}}(c,p);let f=!0,h=!0,m=!0,g=[],b=[];for(let t=0;t<e.length;++t){let n;if(0===p.strides[t])throw Error(`strides[${t}] must be non-zero`);let r=!!(p.shrinkAxisMask&1<<t),a=e[t];if(-1===a){g.push(r?1:-1);continue}let i=[p.beginMask&1<<t,p.endMask&1<<t],s=[p.strides[t]>0?0:-1,p.strides[t]>0?a:a-1];if(r&&p.strides[t]<=0)throw Error("only stride 1 allowed on non-range indexing.");m=m&&1===p.strides[t];let o=!!(p.beginMask&1<<t&&p.endMask&1<<t);if(p.beginValid&&p.endValid){if(r){let e=p.begin[t]<0?a+p.begin[t]:p.begin[t];if(p.begin[t]=e,p.end[t]=p.begin[t]+1,e<0||e>=a)throw Error(`slice index ${p.begin[t]} of dimension ${t} out of bounds.`)}else p.begin[t]=canonical(p.begin[t],0,p.strides[t],a,i,s),p.end[t]=canonical(p.end[t],1,p.strides[t],a,i,s);let e=1===p.strides[t]&&0===p.begin[t]&&p.end[t]===a;f=f&&e,h=h&&(0===t&&1===p.strides[t]||e)}else f=f&&1===p.strides[t]&&o,h=h&&(0===t&&1===p.strides[t]||o);let u=!1;if(p.beginValid&&p.endValid?(n=p.end[t]-p.begin[t],u=!0):r?(n=1,u=!0):o&&a>=0&&(n=p.strides[t]<0?-a:a,u=!0),u){let e;e=0===n||n<0!=p.strides[t]<0?0:Math.trunc(n/p.strides[t])+(n%p.strides[t]!=0?1:0),g.push(e)}else g.push(-1)}for(let e=0;e<p.finalShapeGatherIndices.length;++e){let t=p.finalShapeGatherIndices[e];t>=0?b.push(g[t]):-2===t&&b.push(1)}let y=b.filter((e,t)=>-2!==p.finalShapeGatherIndices[t]);return{finalShapeSparse:y,finalShape:b,isIdentity:f,sliceDim0:h,isSimpleSlice:m,begin:p.begin,end:p.end,strides:p.strides}}function canonical(e,t,n,r,a,i){if(a[t])return n>0?i[t]:i[t+1&1];{let t=e<0?r+e:e;return t<i[0]?i[0]:t>i[1]?i[1]:t}}},48232:function(e,t,n){"use strict";n.d(t,{M:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sparseFillEmptyRows_:/**
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
 */function(e,t,n,s){let o=(0,i._1)(e,"indices","sparseFillEmptyRows","int32"),u=(0,i._1)(t,"values","sparseFillEmptyRows"),l=(0,i._1)(n,"denseShape","sparseFillEmptyRows","int32"),d=(0,i._1)(s,"defaultValue","sparseFillEmptyRows",u.dtype);if(2!==o.rank)throw Error(`Indices should be Tensor2D but received shape
        ${o.shape}`);if(1!==u.rank)throw Error(`Values should be Tensor1D but received shape ${u.shape}`);if(1!==l.rank)throw Error(`Dense shape should be Tensor1D but received shape ${l.shape}`);if(0!==d.rank)throw Error(`Default value should be a scalar but received shape ${d.shape}`);let c=r.BV.runKernel(a.O3z,{indices:o,values:u,denseShape:l,defaultValue:d});return{outputIndices:c[0],outputValues:c[1],emptyRowIndicator:c[2],reverseIndexMap:c[3]}}})},61338:function(e,t,n){"use strict";/**
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
 */function getSparseFillEmptyRowsIndicesDenseShapeMismatch(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function getSparseFillEmptyRowsNegativeIndexErrorMessage(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}n.d(t,{E3:function(){return getSparseFillEmptyRowsNegativeIndexErrorMessage},I_:function(){return getSparseFillEmptyRowsOutOfRangeIndexErrorMessage},h:function(){return getSparseFillEmptyRowsIndicesDenseShapeMismatch}})},46067:function(e,t,n){"use strict";n.d(t,{x:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sparseReshape_:/**
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
 */function(e,t,n){let s=(0,i._1)(e,"inputIndices","sparseReshape","int32"),o=(0,i._1)(t,"inputShape","sparseReshape","int32"),u=(0,i._1)(n,"newShape","sparseReshape","int32");if(2!==s.rank)throw Error(`Input indices should be Tensor2D but received shape
        ${s.shape}`);if(1!==o.rank)throw Error(`Input shape should be Tensor1D but received shape ${o.shape}`);if(1!==u.rank)throw Error(`New shape should be Tensor1D but received shape ${u.shape}`);let l=r.BV.runKernel(a.nhH,{inputIndices:s,inputShape:o,newShape:u});return{outputIndices:l[0],outputShape:l[1]}}})},93198:function(e,t,n){"use strict";n.d(t,{Y6:function(){return getSparseReshapeNegativeOutputDimErrorMessage},aY:function(){return getSparseReshapeInputOutputMismatchErrorMessage},rP:function(){return getSparseReshapeEmptyTensorZeroOutputDimErrorMessage},y5:function(){return getSparseReshapeMultipleNegativeOneOutputDimErrorMessage},yv:function(){return getSparseReshapeInputOutputMultipleErrorMessage}});var r=n(62347);/**
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
 */function getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function getSparseReshapeNegativeOutputDimErrorMessage(e,t){return`size ${e} must be non-negative, not ${t}`}function getSparseReshapeEmptyTensorZeroOutputDimErrorMessage(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function getSparseReshapeInputOutputMultipleErrorMessage(e,t){let n=(0,r.NA)(e),a=(0,r.NA)(t);return`Input to reshape is a SparseTensor with ${n}
  dense values, but the requested shape requires a multiple of ${a}. inputShape=${e} outputShape= ${t}`}function getSparseReshapeInputOutputMismatchErrorMessage(e,t){let n=(0,r.NA)(e),a=(0,r.NA)(t);return`Input to reshape is a tensor with ${n} dense values, but the requested shape has ${a}. inputShape=${e} outputShape=${t}`}},4080:function(e,t,n){"use strict";n.d(t,{S:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sparseSegmentMean_:/**
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
 */function(e,t,n){let s=(0,i._1)(e,"data","sparseSegmentMean"),o=(0,i._1)(t,"indices","sparseSegmentMean","int32"),u=(0,i._1)(n,"segmentIds","sparseSegmentMean","int32");if(s.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==o.rank)throw Error(`Indices should be Tensor1D but received shape
          ${o.shape}`);if(1!==u.rank)throw Error(`Segment ids should be Tensor1D but received shape
          ${u.shape}`);return r.BV.runKernel(a.w3H,{data:s,indices:o,segmentIds:u})}})},85904:function(e,t,n){"use strict";/**
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
 */function getSparseSegmentReductionNegativeSegmentIdsErrorMessage(){return"segment ids must be >= 0"}function getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage(){return"segment ids are not increasing"}function getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function getSparseSegmentReductionIndicesOutOfRangeErrorMessage(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}n.d(t,{GW:function(){return getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage},N5:function(){return getSparseSegmentReductionNegativeSegmentIdsErrorMessage},XL:function(){return getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage},u6:function(){return getSparseSegmentReductionIndicesOutOfRangeErrorMessage}})},33129:function(e,t,n){"use strict";n.d(t,{l:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sparseSegmentSum_:/**
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
 */function(e,t,n){let s=(0,i._1)(e,"data","sparseSegmentSum"),o=(0,i._1)(t,"indices","sparseSegmentSum","int32"),u=(0,i._1)(n,"segmentIds","sparseSegmentSum","int32");if(s.rank<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==o.rank)throw Error(`Indices should be Tensor1D but received shape
         ${o.shape}`);if(1!==u.rank)throw Error(`Segment ids should be Tensor1D but received shape
         ${u.shape}`);return r.BV.runKernel(a.ZjV,{data:s,indices:o,segmentIds:u})}})},67163:function(e,t,n){"use strict";n.d(t,{k:function(){return o}});var r=n(90890),a=n(57004),i=n(62347),s=n(21772);let o=(0,s.op)({fft_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return(0,i.hu)("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`),r.BV.runKernel(a.vwp,{input:e})}})},91411:function(e,t,n){"use strict";n.d(t,{S:function(){return o}});var r=n(90890),a=n(57004),i=n(62347),s=n(21772);let o=(0,s.op)({ifft_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return(0,i.hu)("complex64"===e.dtype,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`),r.BV.runKernel(a.Qg5,{input:e})}})},82545:function(e,t,n){"use strict";n.d(t,{w:function(){return b}});var r=n(55539),a=n(71059),i=n(39240),s=n(49594),o=n(21772),u=n(61450),l=n(5327),d=n(90890),c=n(57004),p=n(99813);let f=(0,o.op)({reverse_:/**
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
 */function(e,t){let n=(0,p._1)(e,"x","reverse");return d.BV.runKernel(c.mKl,{x:n},{dims:t})}});var h=n(81080),m=n(91380),g=n(91411);let b=(0,o.op)({irfft_:/**
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
 */function(e){let t;let n=e.shape[e.shape.length-1],o=e.size/n;if(n<=2){let r=(0,l.X)(e,[o,n]);t=(0,g.S)(r)}else{let d=[o,2*(n-1)],c=(0,l.X)((0,u.k)(e),[o,n]),p=(0,l.X)((0,i.a)(e),[o,n]),b=f((0,m.t)(c,[0,1],[o,n-2]),1),y=(0,s.d)(f((0,m.t)(p,[0,1],[o,n-2]),1),(0,h.i)(-1)),_=(0,a.z)([c,b],1),w=(0,a.z)([p,y],1),I=(0,l.X)((0,r.P)(_,w),[d[0],d[1]]);t=(0,g.S)(I)}if(t=(0,u.k)(t),3===e.rank&&0!==e.shape[0]){let n=t,r=e.shape[0];t=(0,l.X)(t,[r,t.shape[0]/r,t.shape[1]]),n.dispose()}return t}})},1312:function(e,t,n){"use strict";n.d(t,{Q:function(){return m}});var r=n(62347),a=n(55539),i=n(71059),s=n(39240),o=n(21772),u=n(61450),l=n(5327),d=n(91380),c=n(767),p=n(20253),f=n(57895),h=n(67163);let m=(0,o.op)({rfft_:/**
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
 */function(e,t){let n;(0,r.hu)("float32"===e.dtype,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let o=e.shape[e.shape.length-1],m=e.size/o;if(null!=t&&t<o){let r=e.shape.map(e=>0),a=e.shape.map(e=>e);a[e.shape.length-1]=t,n=(0,d.t)(e,r,a),o=t}else if(null!=t&&t>o){let r=e.shape.map(e=>e);r[e.shape.length-1]=t-o,n=(0,i.z)([e,(0,p.l)(r)],e.shape.length-1),o=t}else n=e;let g=(0,f.P)(n),b=(0,l.X)((0,a.P)(n,g),[m,o]),y=(0,h.k)(b),_=Math.floor(o/2)+1,w=(0,u.k)(y),I=(0,s.a)(y),k=(0,c.V)(w,[_,o-_],w.shape.length-1),S=(0,c.V)(I,[_,o-_],I.shape.length-1),v=n.shape.slice();return v[n.shape.length-1]=_,(0,l.X)((0,a.P)(k[0],S[0]),v)}})},767:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({split_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n=0){let s=(0,i._1)(e,"x","split");return r.BV.runKernel(a.L8s,{x:s},{numOrSizeSplits:t,axis:n})}})},92127:function(e,t,n){"use strict";n.d(t,{O:function(){return prepareSplitSize}});var r=n(62347);function prepareSplitSize(e,t,n=0){let a=[];if("number"==typeof t)(0,r.hu)(e.shape[n]%t==0,()=>"Number of splits must evenly divide the axis."),a=Array(t).fill(e.shape[n]/t);else{let i=t.reduce((e,t)=>(-1===t&&(e+=1),e),0);(0,r.hu)(i<=1,()=>"There should be only one negative value in split array.");let s=t.indexOf(-1);if(-1!==s){let r=t.reduce((e,t)=>t>0?e+t:e);t[s]=e.shape[n]-r}(0,r.hu)(e.shape[n]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),a=t}return a}},89639:function(e,t,n){"use strict";n.d(t,{_:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({sqrt_:/**
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
 */function(e){let t=(0,i._1)(e,"x","sqrt","float32");return r.BV.runKernel(a.FKq,{x:t})}})},70052:function(e,t,n){"use strict";n.d(t,{h:function(){return s}});var r=n(90890),a=n(99813),i=n(21772);let s=(0,i.op)({square_:/**
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
 */function(e){let t=(0,a._1)(e,"x","square");return r.BV.runKernel("Square",{x:t},{})}})},41106:function(e,t,n){"use strict";n.d(t,{k:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({stack_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){let n=(0,i.sI)(e,"tensors","stack","string_or_numeric");return s.hu(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&s.hu(t<=n[0].rank,()=>"Axis must be <= rank of the tensor"),r.BV.runKernel(a.QiL,n,{axis:t})}})},76899:function(e,t,n){"use strict";n.d(t,{i:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({staticRegexReplace_:/**
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
 */function(e,t,n,s=!0){let o=(0,i._1)(e,"input","staticRegexReplace","string");return r.BV.runKernel(a.e0R,{x:o},{pattern:t,rewrite:n,replaceGlobal:s})}})},56386:function(e,t,n){"use strict";n.d(t,{l:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({stringNGrams_:/**
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
 */function(e,t,n,s,o,u,l,d){let c=(0,i._1)(e,"data","stringNGrams","string");if("string"!==c.dtype)throw Error("Data must be of datatype string");if(1!==c.shape.length)throw Error(`Data must be a vector, saw: ${c.shape}`);let p=(0,i._1)(t,"dataSplits","stringNGrams");if("int32"!==p.dtype)throw Error("Data splits must be of datatype int32");let f=r.BV.runKernel(a._JP,{data:c,dataSplits:p},{separator:n,nGramWidths:s,leftPad:o,rightPad:u,padWidth:l,preserveShortSequences:d});return{nGrams:f[0],nGramsSplits:f[1]}}})},32448:function(e,t,n){"use strict";n.d(t,{S:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({stringSplit_:/**
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
 */function(e,t,n=!0){let s=(0,i._1)(e,"input","stringSplit","string"),o=(0,i._1)(t,"delimiter","stringSplit","string");if(1!==s.rank)throw Error(`Input should be Tensor1D but received shape ${s.shape}`);if(0!==o.rank)throw Error(`Delimiter should be a scalar but received shape ${o.shape}`);let u=r.BV.runKernel(a.s1s,{input:s,delimiter:o},{skipEmpty:n});return{indices:u[0],values:u[1],shape:u[2]}}})},81560:function(e,t,n){"use strict";n.d(t,{I:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({stringToHashBucketFast_:/**
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
 */function(e,t){let n=(0,i._1)(e,"input","stringToHashBucketFast","string");if(t<=0)throw Error("Number of buckets must be at least 1");return r.BV.runKernel(a.XkS,{input:n},{numBuckets:t})}})},94920:function(e,t,n){"use strict";n.d(t,{l:function(){return u}});var r=n(90890),a=n(57004),i=n(15813),s=n(99813),o=n(21772);let u=(0,o.op)({sub_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,s._1)(e,"a","sub"),o=(0,s._1)(t,"b","sub");[n,o]=(0,i.T_)(n,o);let u={a:n,b:o};return r.BV.runKernel(a.Tr8,u)}})},40536:function(e,t,n){"use strict";n.d(t,{S:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(77869),o=n(21772);let u=(0,o.op)({sum_:/**
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
 */function(e,t=null,n=!1){let o=(0,i._1)(e,"x","sum");"bool"===o.dtype&&(o=(0,s.p)(o,"int32"));let u={x:o};return r.BV.runKernel(a.GBy,u,{axis:t,keepDims:n})}})},37827:function(e,t,n){"use strict";n.d(t,{X:function(){return tensor}});var r=n(99813),a=n(32958);/**
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
 */function tensor(e,t,n){let i=(0,r.C)(e,n);return(0,a.H)(e,t,i,n)}},49658:function(e,t,n){"use strict";n.d(t,{R:function(){return tensor1d}});var r=n(99813),a=n(62347),i=n(32958);/**
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
 */function tensor1d(e,t){(0,a.Cq)(e);let n=(0,r.C)(e,t);if(1!==n.length)throw Error("tensor1d() requires values to be a flat/TypedArray");return(0,i.H)(e,null,n,t)}},82260:function(e,t,n){"use strict";n.d(t,{o:function(){return tensor2d}});var r=n(99813),a=n(62347),i=n(32958);/**
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
 */function tensor2d(e,t,n){if((0,a.Cq)(e),null!=t&&2!==t.length)throw Error("tensor2d() requires shape to have two numbers");let s=(0,r.C)(e,n);if(2!==s.length&&1!==s.length)throw Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===s.length&&null==t)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return(0,i.H)(e,t,s,n)}},32958:function(e,t,n){"use strict";n.d(t,{H:function(){return makeTensor}});var r=n(90890),a=n(50285),i=n(62347),s=n(87767);/**
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
 */function makeTensor(e,t,n,o){if(null==o)o=(0,i.D2)(e);else if("complex64"===o)throw Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if((0,a.$F)(e)||(0,a.Oq)(e)){if("float32"!==o&&"int32"!==o)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${o}.`);return r.BV.backend.createTensorFromGPUData(e,t||n,o)}if(!(0,s.isTypedArray)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){(0,i.Mu)(t);let e=(0,i.NA)(t),r=(0,i.NA)(n);(0,i.hu)(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){let r=n[e],a=e!==n.length-1||r!==(0,i.NA)(t.slice(e));(0,i.hu)(n[e]===t[e]||!a,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return(0,s.isTypedArray)(e)||Array.isArray(e)||(e=[e]),t=t||n,e="string"!==o?(0,s.toTypedArray)(e,o):(0,s.flatten)(e,[],!0),r.BV.makeTensor(e,t,o)}},8947:function(e,t,n){"use strict";n.d(t,{G:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({tile_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,i._1)(e,"x","tile","string_or_numeric");return s.hu(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`),r.BV.runKernel(a.n9L,{x:n},{reps:t})}})},81751:function(e,t,n){"use strict";n.d(t,{H:function(){return u}});var r=n(90890),a=n(57004),i=n(99813),s=n(62347),o=n(21772);let u=(0,o.op)({unstack_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){let n=(0,i._1)(e,"x","unstack","string_or_numeric");return s.hu(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`),r.BV.runKernel(a.ToN,{value:n},{axis:t})}})},14840:function(e,t,n){"use strict";n.d(t,{a:function(){return l}});var r=n(90890),a=n(57004),i=n(99813),s=n(70269),o=n(3109),u=n(21772);let l=(0,u.op)({where_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,n){let u=(0,i._1)(t,"a","where"),l=(0,i._1)(n,"b","where"),d=(0,i._1)(e,"condition","where","bool"),c=(0,o.assertAndGetBroadcastShape)((0,o.assertAndGetBroadcastShape)(d.shape,u.shape),l.shape),p=(0,s.U)(d,c),f=(0,s.U)(u,c),h=(0,s.U)(l,c);return r.BV.runKernel(a.PhF,{condition:p,t:f,e:h})}})},20253:function(e,t,n){"use strict";n.d(t,{l:function(){return(/**
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
 */function zeros(e,t="float32"){if((0,a.Mu)(e),"complex64"===t){let t=zeros(e,"float32"),n=zeros(e,"float32");return(0,i.P)(t,n)}let n=(0,a.wT)((0,a.NA)(e),t);return r.BV.makeTensor(n,e,t)})}});var r=n(90890),a=n(62347),i=n(55539)},57895:function(e,t,n){"use strict";n.d(t,{P:function(){return o}});var r=n(90890),a=n(57004),i=n(99813),s=n(21772);let o=(0,s.op)({zerosLike_:/**
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
 */function(e){let t=(0,i._1)(e,"x","zerosLike");return r.BV.runKernel(a.RuY,{x:t})}})},66582:function(e,t,n){"use strict";n.d(t,{V:function(){return registerOptimizers}});var r=n(90890),a=n(47585),i=n(81480),s=n(57239),o=n(49594),u=n(89639),l=n(70052),d=n(57895),c=n(1354),p=n(81080),f=n(62347);/**
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
 */let h=new Map,m=new Map;let Serializable=class Serializable{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}};let SerializationMap=class SerializationMap{constructor(){this.classNameMap={}}static getMap(){return null==SerializationMap.instance&&(SerializationMap.instance=new SerializationMap),SerializationMap.instance}static register(e){SerializationMap.getMap().classNameMap[e.className]=[e,e.fromConfig]}};/**
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
 */let Optimizer=class Optimizer extends Serializable{minimize(e,t=!1,n){let{value:r,grads:i}=this.computeGradients(e,n);if(null!=n){let e=n.map(e=>({name:e.name,tensor:i[e.name]}));this.applyGradients(e)}else this.applyGradients(i);return((0,a.B9)(i),t)?r:(r.dispose(),null)}get iterations(){return null==this.iterations_&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return(0,c.pn)(e,t)}dispose(){null!=this.iterations_&&(0,a.B9)(this.iterations_)}async saveIterations(){return null==this.iterations_&&(this.iterations_=0),{name:"iter",tensor:(0,p.i)(this.iterations_,"int32")}}async getWeights(){throw Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};Object.defineProperty(Optimizer,Symbol.hasInstance,{value:e=>null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients});var g=n(43941),b=n(60095),y=n(94920),_=n(88178),w=n(57004),I=n(15813),k=n(99813),S=n(3109),v=n(77869),A=n(21772);let M=(0,A.op)({maximum_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let n=(0,k._1)(e,"a","maximum"),a=(0,k._1)(t,"b","maximum");[n,a]=(0,I.T_)(n,a),"bool"===n.dtype&&(n=(0,v.p)(n,"int32"),a=(0,v.p)(a,"int32")),(0,S.assertAndGetBroadcastShape)(n.shape,a.shape);let i={a:n,b:a};return r.BV.runKernel(w.BMI,i)}});/**
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
 */let SGDOptimizer=class SGDOptimizer extends Optimizer{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,n)=>{let s=Array.isArray(e)?e[n].tensor:e[t];if(null==s)return;let u=r.BV.registeredVariables[t];(0,a.lu)(()=>{let e=(0,i.I)((0,o.d)(this.c,s),u);u.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=(0,a.Cn)((0,p.i)(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(0!==(e=await this.extractIterations(e)).length)throw Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}};/**
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
 */let B=[/**
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
 */class extends Optimizer{static get className(){return"Adadelta"}constructor(e,t,n=null){super(),this.learningRate=e,this.rho=t,this.epsilon=n,this.accumulatedGrads=[],this.accumulatedUpdates=[],null==n&&(this.epsilon=r.BV.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,n)=>{let c=r.BV.registeredVariables[t];null==this.accumulatedGrads[n]&&(this.accumulatedGrads[n]={originalName:`${t}/accum_grad`,variable:(0,a.lu)(()=>(0,d.P)(c).variable(!1))}),null==this.accumulatedUpdates[n]&&(this.accumulatedUpdates[n]={originalName:`${t}/accum_var`,variable:(0,a.lu)(()=>(0,d.P)(c).variable(!1))});let p=Array.isArray(e)?e[n].tensor:e[t];if(null==p)return;let f=this.accumulatedGrads[n].variable,h=this.accumulatedUpdates[n].variable;(0,a.lu)(()=>{let e=(0,i.I)((0,o.d)(f,this.rho),(0,o.d)((0,l.h)(p),1-this.rho)),t=(0,o.d)((0,s.h)((0,u._)((0,i.I)(h,this.epsilon)),(0,u._)((0,i.I)(f,this.epsilon))),p),n=(0,i.I)((0,o.d)(h,this.rho),(0,o.d)((0,l.h)(t),1-this.rho));f.assign(e),h.assign(n);let r=(0,i.I)((0,o.d)(t,-this.learningRate),c);c.assign(r)})}),this.incrementIterations()}dispose(){null!=this.accumulatedUpdates&&((0,a.B9)(this.accumulatedGrads.map(e=>e.variable)),(0,a.B9)(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedUpdates=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}},/**
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
 */class extends Optimizer{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,n)=>{let d=r.BV.registeredVariables[t];null==this.accumulatedGrads[n]&&(this.accumulatedGrads[n]={originalName:`${t}/accumulator`,variable:(0,a.lu)(()=>(0,g.h)(d.shape,this.initialAccumulatorValue).variable(!1))});let c=Array.isArray(e)?e[n].tensor:e[t];if(null==c)return;let p=this.accumulatedGrads[n].variable;(0,a.lu)(()=>{let e=(0,i.I)(p,(0,l.h)(c));p.assign(e);let t=(0,i.I)((0,o.d)((0,s.h)(c,(0,u._)((0,i.I)(e,r.BV.backend.epsilon()))),-this.learningRate),d);d.assign(t)})}),this.incrementIterations()}dispose(){null!=this.accumulatedGrads&&(0,a.B9)(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}},/**
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
 */class extends Optimizer{static get className(){return"Adam"}constructor(e,t,n,i=null){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=i,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],(0,a.lu)(()=>{this.accBeta1=(0,p.i)(t).variable(),this.accBeta2=(0,p.i)(n).variable()}),null==i&&(this.epsilon=r.BV.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);(0,a.lu)(()=>{let n=(0,y.l)(1,this.accBeta1),c=(0,y.l)(1,this.accBeta2);t.forEach((t,p)=>{let f=r.BV.registeredVariables[t];null==this.accumulatedFirstMoment[p]&&(this.accumulatedFirstMoment[p]={originalName:`${t}/m`,variable:(0,a.lu)(()=>(0,d.P)(f).variable(!1))}),null==this.accumulatedSecondMoment[p]&&(this.accumulatedSecondMoment[p]={originalName:`${t}/v`,variable:(0,a.lu)(()=>(0,d.P)(f).variable(!1))});let h=Array.isArray(e)?e[p].tensor:e[t];if(null==h)return;let m=this.accumulatedFirstMoment[p].variable,g=this.accumulatedSecondMoment[p].variable,b=(0,i.I)((0,o.d)(m,this.beta1),(0,o.d)(h,1-this.beta1)),y=(0,i.I)((0,o.d)(g,this.beta2),(0,o.d)((0,l.h)(h),1-this.beta2)),_=(0,s.h)(b,n),w=(0,s.h)(y,c);m.assign(b),g.assign(y);let I=(0,i.I)((0,o.d)((0,s.h)(_,(0,i.I)((0,u._)(w),this.epsilon)),-this.learningRate),f);f.assign(I)}),this.accBeta1.assign((0,o.d)(this.accBeta1,this.beta1)),this.accBeta2.assign((0,o.d)(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&(0,a.B9)(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedSecondMoment&&(0,a.B9)(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),(0,a.lu)(()=>{this.accBeta1.assign((0,b.s)(this.beta1,this.iterations_+1)),this.accBeta2.assign((0,b.s)(this.beta2,this.iterations_+1))});let t=e.length/2;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedSecondMoment=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}},/**
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
 */class extends Optimizer{static get className(){return"Adamax"}constructor(e,t,n,i=null,s=0){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=i,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],(0,a.lu)(()=>{this.iteration=(0,p.i)(0).variable(),this.accBeta1=(0,p.i)(t).variable()}),null==i&&(this.epsilon=r.BV.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);(0,a.lu)(()=>{let n=(0,y.l)(1,this.accBeta1),a=(0,s.h)(-this.learningRate,(0,i.I)((0,o.d)(this.iteration,this.decay),1));t.forEach((t,u)=>{let l=r.BV.registeredVariables[t];null==this.accumulatedFirstMoment[u]&&(this.accumulatedFirstMoment[u]={originalName:`${t}/m`,variable:(0,d.P)(l).variable(!1)}),null==this.accumulatedWeightedInfNorm[u]&&(this.accumulatedWeightedInfNorm[u]={originalName:`${t}/v`,variable:(0,d.P)(l).variable(!1)});let c=Array.isArray(e)?e[u].tensor:e[t];if(null==c)return;let p=this.accumulatedFirstMoment[u].variable,f=this.accumulatedWeightedInfNorm[u].variable,h=(0,i.I)((0,o.d)(p,this.beta1),(0,o.d)(c,1-this.beta1)),m=(0,o.d)(f,this.beta2),g=(0,_.W)(c),b=M(m,g);p.assign(h),f.assign(b);let y=(0,i.I)((0,o.d)((0,s.h)(a,n),(0,s.h)(h,(0,i.I)(b,this.epsilon))),l);l.assign(y)}),this.iteration.assign((0,i.I)(this.iteration,1)),this.accBeta1.assign((0,o.d)(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&(0,a.B9)(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedWeightedInfNorm&&(0,a.B9)(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}},/**
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
 */class extends SGDOptimizer{static get className(){return"Momentum"}constructor(e,t,n=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=n,this.accumulations=[],this.m=(0,p.i)(this.momentum)}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,n)=>{let s=r.BV.registeredVariables[t];null==this.accumulations[n]&&(this.accumulations[n]={originalName:`${t}/momentum`,variable:(0,a.lu)(()=>(0,d.P)(s).variable(!1))});let u=this.accumulations[n].variable,l=Array.isArray(e)?e[n].tensor:e[t];null!=l&&(0,a.lu)(()=>{let e;let t=(0,i.I)((0,o.d)(this.m,u),l);e=this.useNesterov?(0,i.I)((0,o.d)(this.c,(0,i.I)(l,(0,o.d)(t,this.m))),s):(0,i.I)((0,o.d)(this.c,t),s),u.assign(t),s.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),null!=this.accumulations&&(0,a.B9)(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}},/**
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
 */class extends Optimizer{static get className(){return"RMSProp"}constructor(e,t=.9,n=0,a=null,i=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=n,this.epsilon=a,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=i,null==a&&(this.epsilon=r.BV.backend.epsilon()),null==e)throw Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,n)=>{let c=r.BV.registeredVariables[t];null==this.accumulatedMeanSquares[n]&&(this.accumulatedMeanSquares[n]={originalName:`${t}/rms`,variable:(0,a.lu)(()=>(0,d.P)(c).variable(!1))}),null==this.accumulatedMoments[n]&&(this.accumulatedMoments[n]={originalName:`${t}/momentum`,variable:(0,a.lu)(()=>(0,d.P)(c).variable(!1))}),null==this.accumulatedMeanGrads[n]&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${t}/mg`,variable:(0,a.lu)(()=>(0,d.P)(c).variable(!1))});let p=Array.isArray(e)?e[n].tensor:e[t];if(null==p)return;let f=this.accumulatedMeanSquares[n].variable,h=this.accumulatedMoments[n].variable;(0,a.lu)(()=>{let e=(0,i.I)((0,o.d)(f,this.decay),(0,o.d)((0,l.h)(p),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[n].variable,r=(0,i.I)((0,o.d)(t,this.decay),(0,o.d)(p,1-this.decay)),a=(0,s.h)((0,o.d)(p,this.learningRate),(0,u._)((0,y.l)(e,(0,i.I)((0,l.h)(r),this.epsilon)))),d=(0,i.I)((0,o.d)(h,this.momentum),a);f.assign(e),t.assign(r),h.assign(d);let m=(0,y.l)(c,d);c.assign(m)}else{let e=(0,i.I)((0,o.d)(f,this.decay),(0,o.d)((0,l.h)(p),1-this.decay)),t=(0,i.I)((0,o.d)(h,this.momentum),(0,s.h)((0,o.d)(p,this.learningRate),(0,u._)((0,i.I)(e,this.epsilon))));f.assign(e),h.assign(t);let n=(0,y.l)(c,t);c.assign(n)}})}),this.incrementIterations()}dispose(){null!=this.accumulatedMeanSquares&&(0,a.B9)(this.accumulatedMeanSquares.map(e=>e.variable)),null!=this.accumulatedMeanGrads&&this.centered&&(0,a.B9)(this.accumulatedMeanGrads.map(e=>e.variable)),null!=this.accumulatedMoments&&(0,a.B9)(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedMoments=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}},SGDOptimizer];function registerOptimizers(){for(let e of B)!function(e,t,n){(0,f.hu)(null!=e.className,()=>"Class being registered does not have the static className property defined."),(0,f.hu)("string"==typeof e.className,()=>"className is required to be a string, but got type "+typeof e.className),(0,f.hu)(e.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),void 0===t&&(t="Custom"),void 0===n&&(n=e.className);let r=n,a=t+">"+r;SerializationMap.register(e),h.set(a,e),m.set(e,a)}(e)}},64958:function(e,t,n){"use strict";/**
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
 */function isTypedArrayBrowser(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}n.d(t,{j:function(){return isTypedArrayBrowser}})},95766:function(e,t,n){"use strict";n.d(t,{es:function(){return Tensor},YD:function(){return TensorBuffer},_w:function(){return Variable},t3:function(){return getGlobalTensorClass},FZ:function(){return setDeprecationWarningFn},Vp:function(){return setOpHandler},Vi:function(){return setTensorTracker}});var r=n(9904),a=n(62347);function valToString(e,t,n){let r;return r=Array.isArray(e)?`${parseFloat(e[0].toFixed(7))} + ${parseFloat(e[1].toFixed(7))}j`:(0,a.HD)(e)?`'${e}'`:"bool"===n?boolNumToString(e):parseFloat(e.toFixed(7)).toString(),(0,a.oj)(r,t)}function boolNumToString(e){return 0===e?"false":"true"}function createComplexTuples(e){let t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var i=n(87767);/**
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
 */let TensorBuffer=class TensorBuffer{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=a.NA(e),null!=n){let e=n.length;a.hu(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||a.rQ(t,this.size),this.strides=(0,a.e3)(e)}set(e,...t){0===t.length&&(t=[0]),a.hu(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let n=this.locToIndex(t);this.values[n]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];let t=Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return s().makeTensor(this.values,this.shape,this.dtype)}};let s=null,o=null;function setTensorTracker(e){s=e}function setOpHandler(e){o=e}function setDeprecationWarningFn(e){}let Tensor=class Tensor{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=a.NA(e),this.strides=(0,a.e3)(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let e=await this.data();return o.buffer(this.shape,this.dtype,e)}bufferSync(){return o.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return(0,a.GX)(this.shape,e,"complex64"===this.dtype)}arraySync(){return(0,a.GX)(this.shape,this.dataSync(),"complex64"===this.dtype)}async data(){this.throwIfDisposed();let e=s().read(this.dataId);if("string"===this.dtype){let t=await e;try{return t.map(e=>i.decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),s().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=s().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>i.decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();let e=await s().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),s().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error("Tensor is disposed.")}print(e=!1){return o.print(this,e)}clone(){return this.throwIfDisposed(),o.clone(this)}toString(e=!1){let t=this.dataSync();return function(e,t,n,r){let i=(0,a.e3)(t),s=function(e,t,n,r){let i=(0,a.NA)(t),s=r[r.length-1],o=Array(s).fill(0),u=t.length,l="complex64"===n?createComplexTuples(e):e;if(u>1)for(let e=0;e<i/s;e++){let t=e*s;for(let e=0;e<s;e++)o[e]=Math.max(o[e],valToString(l[t+e],0,n).length)}return o}(e,t,n,i),o=t.length,u=function subTensorToString(e,t,n,r,a,i=!0){let s="complex64"===n?2:1,o=t[0],u=t.length;if(0===u){if("complex64"===n){let t=createComplexTuples(e);return[valToString(t[0],0,n)]}return"bool"===n?[boolNumToString(e[0])]:[e[0].toString()]}if(1===u){if(o>20){let t=3*s,r=Array.from(e.slice(0,t)),i=Array.from(e.slice((o-3)*s,o*s));return"complex64"===n&&(r=createComplexTuples(r),i=createComplexTuples(i)),["["+r.map((e,t)=>valToString(e,a[t],n)).join(", ")+", ..., "+i.map((e,t)=>valToString(e,a[o-3+t],n)).join(", ")+"]"]}let t="complex64"===n?createComplexTuples(e):Array.from(e);return["["+t.map((e,t)=>valToString(e,a[t],n)).join(", ")+"]"]}let l=t.slice(1),d=r.slice(1),c=r[0]*s,p=[];if(o>20){for(let t=0;t<3;t++){let r=t*c,i=r+c;p.push(...subTensorToString(e.slice(r,i),l,n,d,a,!1))}p.push("...");for(let t=o-3;t<o;t++){let r=t*c,i=r+c;p.push(...subTensorToString(e.slice(r,i),l,n,d,a,t===o-1))}}else for(let t=0;t<o;t++){let r=t*c,i=r+c;p.push(...subTensorToString(e.slice(r,i),l,n,d,a,t===o-1))}let f=2===u?",":"";p[0]="["+(o>0?p[0]+f:"");for(let e=1;e<p.length-1;e++)p[e]=" "+p[e]+f;let h=",\n";for(let e=2;e<u;e++)h+="\n";return p[p.length-1]=" "+p[p.length-1]+"]"+(i?"":h),p}(e,t,n,i,s),l=["Tensor"];return r&&(l.push(`  dtype: ${n}`),l.push(`  rank: ${o}`),l.push(`  shape: [${t}]`),l.push("  values:")),l.push(u.map(e=>"    "+e).join("\n")),l.join("\n")}(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),o.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),s().makeVariable(this,e,t,n)}};function getGlobalTensorClass(){return(0,r.R)("Tensor",()=>Tensor)}Object.defineProperty(Tensor,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}),getGlobalTensorClass();let Variable=class Variable extends Tensor{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!a.cO(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);s().disposeTensor(this),this.dataId=e.dataId,s().incRef(this,null)}dispose(){s().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(Variable,Symbol.hasInstance,{value:e=>e instanceof Tensor&&null!=e.assign&&e.assign instanceof Function})},15813:function(e,t,n){"use strict";n.d(t,{T_:function(){return makeTypesMatch},Vu:function(){return getTensorsInContainer}});var r=n(95766),a=n(50285);/**
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
 */function makeTypesMatch(e,t){if(e.dtype===t.dtype)return[e,t];let n=(0,a.x8)(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function getTensorsInContainer(e){let t=[],n=new Set;return function walkTensorContainer(e,t,n){if(null!=e){if(e instanceof r.es){t.push(e);return}if(Array.isArray(e)||"object"==typeof e)for(let r in e){let a=e[r];n.has(a)||(n.add(a),walkTensorContainer(a,t,n))}}}(e,t,n),t}},99813:function(e,t,n){"use strict";n.d(t,{C:function(){return inferShape},_1:function(){return convertToTensor},sI:function(){return convertToTensorArray}});var r=n(90890),a=n(52788),i=n(95766),s=n(50285),o=n(87767),u=n(62347);/**
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
 */function inferShape(e,t){let n=e;if((0,o.isTypedArray)(e))return"string"===t?[]:[e.length];if((0,s.Oq)(e)){let t=e.channels||"RGBA";return[e.height,e.width*t.length]}if((0,s.$F)(e))return[e.buffer.size/(null==t?4:(0,u.bT)(t))];if(!Array.isArray(e))return[];let r=[];for(;Array.isArray(n)||(0,o.isTypedArray)(n)&&"string"!==t;)r.push(n.length),n=n[0];return Array.isArray(e)&&(0,a.OB)().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function deepAssertShapeConsistency(e,t,n){if(n=n||[],!Array.isArray(e)&&!(0,o.isTypedArray)(e)){(0,u.hu)(0===t.length,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}(0,u.hu)(t.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${e.length} elements`),(0,u.hu)(e.length===t[0],()=>`Element arr[${n.join("][")}] should have ${t[0]} elements, but has ${e.length} elements`);let r=t.slice(1);for(let t=0;t<e.length;++t)deepAssertShapeConsistency(e[t],r,n.concat(t))}(e,r,[]),r}function assertDtype(e,t,n,r){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function convertToTensor(e,t,n,a="numeric"){if(e instanceof(0,i.t3)())return assertDtype(a,e.dtype,t,n),e;let s=(0,u.D2)(e);if("string"!==s&&["bool","int32","float32"].indexOf(a)>=0&&(s=a),assertDtype(a,s,t,n),null==e||!(0,o.isTypedArray)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){let r=null==e?"null":e.constructor.name;throw Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}let l=inferShape(e,s);(0,o.isTypedArray)(e)||Array.isArray(e)||(e=[e]);let d="string"!==s?(0,o.toTypedArray)(e,s):(0,o.flatten)(e,[],!0);return r.BV.makeTensor(d,l,s)}function convertToTensorArray(e,t,n,r="numeric"){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,a)=>convertToTensor(e,`${t}[${a}]`,n,r))}},87767:function(e,t,n){"use strict";n.r(t),n.d(t,{arraysEqual:function(){return i.cO},arraysEqualWithNull:function(){return i.DK},assert:function(){return i.hu},assertNonNegativeIntegerDimensions:function(){return i.Mu},assertNonNull:function(){return i.Cq},assertShapesMatch:function(){return i.k5},bytesFromStringArray:function(){return i.Ub},bytesPerElement:function(){return i.bT},checkConversionForErrors:function(){return i.D5},clamp:function(){return i.uZ},computeStrides:function(){return i.e3},convertBackendValuesAndArrayBuffer:function(){return i.KS},createScalarValue:function(){return createScalarValue},createShuffledIndices:function(){return i.U$},decodeString:function(){return decodeString},distSquared:function(){return i.E7},encodeString:function(){return encodeString},fetch:function(){return util_fetch},fingerPrint64:function(){return fingerPrint64},flatten:function(){return flatten},getArrayFromDType:function(){return i.rQ},getTypedArrayFromDType:function(){return i.WP},hasEncodingLoss:function(){return i.QB},hexToLong:function(){return hexToLong},indexToLoc:function(){return i.NE},inferDtype:function(){return i.D2},inferFromImplicitShape:function(){return i.JZ},isBoolean:function(){return i.jn},isFunction:function(){return i.mf},isInt:function(){return i.GN},isNumber:function(){return i.hj},isPromise:function(){return i.tI},isScalarShape:function(){return i.xH},isString:function(){return i.HD},isTypedArray:function(){return isTypedArray},isValidDtype:function(){return i.LP},locToIndex:function(){return i.qy},makeOnesTypedArray:function(){return i.p8},makeZerosNestedTypedArray:function(){return i.l6},makeZerosTypedArray:function(){return i.wT},nearestDivisor:function(){return i.jP},nearestLargerEven:function(){return i.nY},now:function(){return now},parseAxisParam:function(){return i.EC},randUniform:function(){return i.bj},repeatedTry:function(){return i.WD},rightPad:function(){return i.oj},shuffle:function(){return i.TV},shuffleCombo:function(){return i.d7},sizeFromShape:function(){return i.NA},sizeToSquarishShape:function(){return i.YP},squeezeShape:function(){return i.bp},sum:function(){return i.Sm},swap:function(){return i.LF},tanh:function(){return i.AE},toNestedArray:function(){return i.GX},toTypedArray:function(){return toTypedArray}});var r=n(52788),a=n(64958),i=n(62347),s=n(6017),o=n.n(s);/**
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
 */let u=o()||s;function hexToLong(e){return u.fromString(e,!0,16)}let l=hexToLong("c3a5c85c97cb3127"),d=hexToLong("b492b66fbe98f273"),c=hexToLong("9ae16a3b2f90404f");function shiftMix(e){return e.xor(e.shru(47))}function fetch(e,t,n){let r=e.slice(t,t+n);return u.fromBytes(Array.from(r),!0,!0)}function fetch64(e,t){return fetch(e,t,8)}function rotate64(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function hashLen16(e,t,n=hexToLong("9ddfea08eb382d69")){let r=e.xor(t).mul(n);r=r.xor(r.shru(47));let a=t.xor(r).mul(n);return(a=a.xor(a.shru(47))).mul(n)}function weakHashLen32WithSeedsStr(e,t,n,r){return function(e,t,n,r,a,i){a=a.add(e),i=rotate64(i.add(a).add(r),21);let s=a;return a=(a=a.add(t)).add(n),i=i.add(rotate64(a,44)),[a.add(r),i.add(s)]}(fetch64(e,t),fetch64(e,t+8),fetch64(e,t+16),fetch64(e,t+24),n,r)}function fingerPrint64(e,t=e.length){let n=u.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t=e.length){if(t>=8){let n=c.add(2*t),r=fetch64(e,0).add(c),a=fetch64(e,t-8),i=rotate64(a,37).mul(n).add(r),s=rotate64(r,25).add(a).mul(n);return hashLen16(i,s,n)}if(t>=4){let n=c.add(2*t),r=fetch(e,0,4);return hashLen16(r.shl(3).add(t),fetch(e,t-4,4),n)}if(t>0){let n=e[0],r=e[t>>1],a=e[t-1],i=t+(a<<2);return shiftMix(c.mul(n+(r<<8)).xor(l.mul(i))).mul(c)}return c}(e,t):function(e,t=e.length){let n=c.add(2*t),r=fetch64(e,0).mul(d),a=fetch64(e,8),i=fetch64(e,t-8).mul(n),s=fetch64(e,t-16).mul(c);return hashLen16(rotate64(r.add(a),43).add(rotate64(i,30)).add(s),r.add(rotate64(a.add(c),18)).add(i),n)}(e,t);if(t<=64)return function(e,t=e.length){let n=c.add(2*t),r=fetch64(e,0).mul(c),a=fetch64(e,8),i=fetch64(e,t-8).mul(n),s=fetch64(e,t-16).mul(c),o=rotate64(r.add(a),43).add(rotate64(i,30)).add(s),u=hashLen16(o,r.add(rotate64(a.add(c),18)).add(i),n),l=fetch64(e,16).mul(n),d=fetch64(e,24),p=o.add(fetch64(e,t-32)).mul(n),f=u.add(fetch64(e,t-24)).mul(n);return hashLen16(rotate64(l.add(d),43).add(rotate64(p,30)).add(f),l.add(rotate64(d.add(r),18)).add(p),n)}(e,t);let r=n,a=n.mul(d).add(113),i=shiftMix(a.mul(c).add(113)).mul(c),s=[u.UZERO,u.UZERO],o=[u.UZERO,u.UZERO];r=r.mul(c).add(fetch64(e,0));let p=0,f=(t-1>>6)*64,h=f+(t-1&63)-63;do r=rotate64(r.add(a).add(s[0]).add(fetch64(e,p+8)),37).mul(d),a=rotate64(a.add(s[1]).add(fetch64(e,p+48)),42).mul(d),r=r.xor(o[1]),a=a.add(s[0]).add(fetch64(e,p+40)),i=rotate64(i.add(o[0]),33).mul(d),s=weakHashLen32WithSeedsStr(e,p,s[1].mul(d),r.add(o[0])),o=weakHashLen32WithSeedsStr(e,p+32,i.add(o[1]),a.add(fetch64(e,p+16))),[i,r]=[r,i],p+=64;while(p!==f);let m=d.add(i.and(255).shl(1));return p=h,o[0]=o[0].add(t-1&63),s[0]=s[0].add(o[0]),o[0]=o[0].add(s[0]),r=rotate64(r.add(a).add(s[0]).add(fetch64(e,p+8)),37).mul(m),a=rotate64(a.add(s[1]).add(fetch64(e,p+48)),42).mul(m),r=r.xor(o[1].mul(9)),a=a.add(s[0].mul(9).add(fetch64(e,p+40))),i=rotate64(i.add(o[0]),33).mul(m),s=weakHashLen32WithSeedsStr(e,p,s[1].mul(m),r.add(o[0])),o=weakHashLen32WithSeedsStr(e,p+32,i.add(o[1]),a.add(fetch64(e,p+16))),[i,r]=[r,i],hashLen16(hashLen16(s[0],o[0],m).add(shiftMix(a).mul(l)).add(i),hashLen16(s[1],o[1],m).add(r),m)}/**
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
 */function createScalarValue(e,t){return"string"===t?encodeString(e):toTypedArray([e],t)}function toTypedArray(e,t){var n;if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=flatten(e)),(0,r.OB)().getBool("DEBUG")&&i.D5(e,t),(n=e)instanceof Float32Array&&"float32"===t||n instanceof Int32Array&&"int32"===t||n instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){let t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)0!==Math.round(e[n])&&(t[n]=1);return t}throw Error(`Unknown data type ${t}`)}function now(){return(0,r.OB)().platform.now()}function util_fetch(e,t){return(0,r.OB)().platform.fetch(e,t)}function encodeString(e,t="utf-8"){return t=t||"utf-8",(0,r.OB)().platform.encode(e,t)}function decodeString(e,t="utf-8"){return t=t||"utf-8",(0,r.OB)().platform.decode(e,t)}function isTypedArray(e){return null!=(0,r.OB)().platform.isTypedArray?(0,r.OB)().platform.isTypedArray(e):(0,a.j)(e)}function flatten(e,t=[],n=!1){if(null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||i.tI(e)||null==e||isTypedArray(e)&&n)t.push(e);else if(Array.isArray(e)||isTypedArray(e))for(let r=0;r<e.length;++r)flatten(e[r],t,n);else{let r=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(r=Math.max(r,Number(t)));for(let a=0;a<=r;a++)flatten(e[a],t,n)}return t}},62347:function(e,t,n){"use strict";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function shuffle(e){let t=e.length,n=0;for(;t>0;)n=Math.random()*t|0,swap(e,--t,n)}function shuffleCombo(e,t){if(e.length!==t.length)throw Error(`Array sizes must match to be shuffled together First array length was ${e.length}Second array length was ${t.length}`);let n=e.length,r=0;for(;n>0;)r=Math.random()*n|0,swap(e,--n,r),swap(t,n,r)}function clamp(e,t,n){return Math.max(e,Math.min(t,n))}function nearestLargerEven(e){return e%2==0?e:e+1}function swap(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function sum(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function randUniform(e,t){let n=Math.random();return t*n+(1-n)*e}function distSquared(e,t){let n=0;for(let r=0;r<e.length;r++){let a=Number(e[r])-Number(t[r]);n+=a*a}return n}function assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function assertShapesMatch(e,t,n=""){assert(arraysEqual(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function assertNonNull(e){assert(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function sizeFromShape(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function isScalarShape(e){return 0===e.length}function arraysEqualWithNull(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(null!==e[n]&&null!==t[n]&&e[n]!==t[n])return!1;return!0}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function isInt(e){return e%1==0}function tanh(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return -1;{let t=Math.exp(2*e);return(t-1)/(t+1)}}function sizeToSquarishShape(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function createShuffledIndices(e){let t=new Uint32Array(e);for(let n=0;n<e;++n)t[n]=n;return shuffle(t),t}function rightPad(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function repeatedTry(e,t=e=>0,n,r){return new Promise((a,i)=>{let s=0,tryFn=()=>{if(e()){a();return}s++;let o=t(s);if(null!=n&&s>=n){i();return}null!=r?r(tryFn,o):setTimeout(tryFn,o)};tryFn()})}function inferFromImplicitShape(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(-1===e[t]){if(-1!==r)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(-1===r){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===n)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!=0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);let a=e.slice();return a[r]=t/n,a}function parseAxisParam(e,t){let n=t.length;return assert((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),assert(e.every(e=>isInt(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function squeezeShape(e,t){let n=[],r=[],a=null!=t&&Array.isArray(t)&&0===t.length,i=null==t||a?null:parseAxisParam(t,e).sort(),s=0;for(let t=0;t<e.length;++t){if(null!=i){if(i[s]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==i[s]||i[s]>t)&&1===e[t]&&(n.push(e[t]),r.push(t)),i[s]<=t&&s++}1!==e[t]&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function getTypedArrayFromDType(e,t){return getArrayFromDType(e,t)}function getArrayFromDType(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else if("bool"===e)n=new Uint8Array(t);else if("string"===e)n=Array(t);else throw Error(`Unknown data type ${e}`);return n}function checkConversionForErrors(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function isValidDtype(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function hasEncodingLoss(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)}function bytesPerElement(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error(`Unknown dtype ${e}`)}function bytesFromStringArray(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function isString(e){return"string"==typeof e||e instanceof String}function isBoolean(e){return"boolean"==typeof e}function isNumber(e){return"number"==typeof e}function isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nearestDivisor(e,t){for(let n=t;n<e;++n)if(e%n==0)return n;return e}function computeStrides(e){let t=e.length;if(t<2)return[];let n=Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function toNestedArray(e,t,n=!1){if(0===e.length)return t[0];let r=e.reduce((e,t)=>e*t)*(n?2:1);if(0===r)return[];if(r!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${n?" for a complex tensor":""}.`);return function createNestedArray(e,t,n,r=!1){let a=[];if(1===t.length){let i=t[0]*(r?2:1);for(let t=0;t<i;t++)a[t]=n[e+t]}else{let i=t[0],s=t.slice(1),o=s.reduce((e,t)=>e*t)*(r?2:1);for(let t=0;t<i;t++)a[t]=createNestedArray(e+t*o,s,n,r)}return a}(0,e,t,n)}function convertBackendValuesAndArrayBuffer(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function makeOnesTypedArray(e,t){let n=makeZerosTypedArray(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function makeZerosTypedArray(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function makeZerosNestedTypedArray(e,t){let n=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return toNestedArray(e,new Float32Array(n));if("int32"===t)return toNestedArray(e,new Int32Array(n));if("bool"===t)return toNestedArray(e,new Uint8Array(n));throw Error(`Unknown data type ${t}`)}function assertNonNegativeIntegerDimensions(e){e.forEach(t=>{assert(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function locToIndex(e,t,n){if(0===t)return 0;if(1===t)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function indexToLoc(e,t,n){if(0===t)return[];if(1===t)return[e];let r=Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function isPromise(e){return e&&e.then&&"function"==typeof e.then}n.d(t,{AE:function(){return tanh},Cq:function(){return assertNonNull},D2:function(){return function inferDtype(e){if(Array.isArray(e))return inferDtype(e[0]);if(e instanceof Float32Array);else if(e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray)return"int32";else if(isNumber(e));else if(isString(e))return"string";else if(isBoolean(e))return"bool";return"float32"}},D5:function(){return checkConversionForErrors},DK:function(){return arraysEqualWithNull},E7:function(){return distSquared},EC:function(){return parseAxisParam},GN:function(){return isInt},GX:function(){return toNestedArray},HD:function(){return isString},JZ:function(){return inferFromImplicitShape},KS:function(){return convertBackendValuesAndArrayBuffer},LF:function(){return swap},LP:function(){return isValidDtype},Mu:function(){return assertNonNegativeIntegerDimensions},NA:function(){return sizeFromShape},NE:function(){return indexToLoc},QB:function(){return hasEncodingLoss},Sm:function(){return sum},TV:function(){return shuffle},U$:function(){return createShuffledIndices},Ub:function(){return bytesFromStringArray},WD:function(){return repeatedTry},WP:function(){return getTypedArrayFromDType},YP:function(){return sizeToSquarishShape},bT:function(){return bytesPerElement},bj:function(){return randUniform},bp:function(){return squeezeShape},cO:function(){return arraysEqual},d7:function(){return shuffleCombo},e3:function(){return computeStrides},hj:function(){return isNumber},hu:function(){return assert},jP:function(){return nearestDivisor},jn:function(){return isBoolean},k5:function(){return assertShapesMatch},l6:function(){return makeZerosNestedTypedArray},mf:function(){return isFunction},nY:function(){return nearestLargerEven},oj:function(){return rightPad},p8:function(){return makeOnesTypedArray},qy:function(){return locToIndex},rQ:function(){return getArrayFromDType},tI:function(){return isPromise},uZ:function(){return clamp},wT:function(){return makeZerosTypedArray},xH:function(){return isScalarShape}})},81226:function(e,t){"use strict";t.byteLength=function(e){var t=getLens(e),n=t[0],r=t[1];return(n+r)*3/4-r},t.toByteArray=function(e){var t,n,i=getLens(e),s=i[0],o=i[1],u=new a((s+o)*3/4-o),l=0,d=o>0?s-4:s;for(n=0;n<d;n+=4)t=r[e.charCodeAt(n)]<<18|r[e.charCodeAt(n+1)]<<12|r[e.charCodeAt(n+2)]<<6|r[e.charCodeAt(n+3)],u[l++]=t>>16&255,u[l++]=t>>8&255,u[l++]=255&t;return 2===o&&(t=r[e.charCodeAt(n)]<<2|r[e.charCodeAt(n+1)]>>4,u[l++]=255&t),1===o&&(t=r[e.charCodeAt(n)]<<10|r[e.charCodeAt(n+1)]<<4|r[e.charCodeAt(n+2)]>>2,u[l++]=t>>8&255,u[l++]=255&t),u},t.fromByteArray=function(e){for(var t,r=e.length,a=r%3,i=[],s=0,o=r-a;s<o;s+=16383)i.push(function(e,t,r){for(var a,i=[],s=t;s<r;s+=3)i.push(n[(a=(e[s]<<16&16711680)+(e[s+1]<<8&65280)+(255&e[s+2]))>>18&63]+n[a>>12&63]+n[a>>6&63]+n[63&a]);return i.join("")}(e,s,s+16383>o?o:s+16383));return 1===a?i.push(n[(t=e[r-1])>>2]+n[t<<4&63]+"=="):2===a&&i.push(n[(t=(e[r-2]<<8)+e[r-1])>>10]+n[t>>4&63]+n[t<<2&63]+"="),i.join("")};for(var n=[],r=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0,o=i.length;s<o;++s)n[s]=i[s],r[i.charCodeAt(s)]=s;function getLens(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");-1===n&&(n=t);var r=n===t?0:4-n%4;return[n,r]}r["-".charCodeAt(0)]=62,r["_".charCodeAt(0)]=63},61900:function(e,t,n){"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */let r=n(81226),a=n(47354),i="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function createBuffer(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,Buffer.prototype),t}function Buffer(e,t,n){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return allocUnsafe(e)}return from(e,t,n)}function from(e,t,n){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!Buffer.isEncoding(t))throw TypeError("Unknown encoding: "+t);let n=0|byteLength(e,t),r=createBuffer(n),a=r.write(e,t);return a!==n&&(r=r.slice(0,a)),r}(e,t);if(ArrayBuffer.isView(e))return function(e){if(isInstance(e,Uint8Array)){let t=new Uint8Array(e);return fromArrayBuffer(t.buffer,t.byteOffset,t.byteLength)}return fromArrayLike(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(isInstance(e,ArrayBuffer)||e&&isInstance(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(isInstance(e,SharedArrayBuffer)||e&&isInstance(e.buffer,SharedArrayBuffer)))return fromArrayBuffer(e,t,n);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let r=e.valueOf&&e.valueOf();if(null!=r&&r!==e)return Buffer.from(r,t,n);let a=function(e){var t;if(Buffer.isBuffer(e)){let t=0|checked(e.length),n=createBuffer(t);return 0===n.length||e.copy(n,0,0,t),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?createBuffer(0):fromArrayLike(e):"Buffer"===e.type&&Array.isArray(e.data)?fromArrayLike(e.data):void 0}(e);if(a)return a;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return Buffer.from(e[Symbol.toPrimitive]("string"),t,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function assertSize(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromArrayLike(e){let t=e.length<0?0:0|checked(e.length),n=createBuffer(t);for(let r=0;r<t;r+=1)n[r]=255&e[r];return n}function fromArrayBuffer(e,t,n){let r;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(n||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(r=void 0===t&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,t):new Uint8Array(e,t,n),Buffer.prototype),r}function checked(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||isInstance(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let n=e.length,r=arguments.length>2&&!0===arguments[2];if(!r&&0===n)return 0;let a=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return base64ToBytes(e).length;default:if(a)return r?-1:utf8ToBytes(e).length;t=(""+t).toLowerCase(),a=!0}}function slowToString(e,t,n){let a=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===n||n>this.length)&&(n=this.length),n<=0||(n>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,n){let r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);let a="";for(let r=t;r<n;++r)a+=u[e[r]];return a}(this,t,n);case"utf8":case"utf-8":return utf8Slice(this,t,n);case"ascii":return function(e,t,n){let r="";n=Math.min(e.length,n);for(let a=t;a<n;++a)r+=String.fromCharCode(127&e[a]);return r}(this,t,n);case"latin1":case"binary":return function(e,t,n){let r="";n=Math.min(e.length,n);for(let a=t;a<n;++a)r+=String.fromCharCode(e[a]);return r}(this,t,n);case"base64":var i,s;return i=t,s=n,0===i&&s===this.length?r.fromByteArray(this):r.fromByteArray(this.slice(i,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,n){let r=e.slice(t,n),a="";for(let e=0;e<r.length-1;e+=2)a+=String.fromCharCode(r[e]+256*r[e+1]);return a}(this,t,n);default:if(a)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),a=!0}}function swap(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function bidirectionalIndexOf(e,t,n,r,a){var i;if(0===e.length)return -1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),(i=n=+n)!=i&&(n=a?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(a)return -1;n=e.length-1}else if(n<0){if(!a)return -1;n=0}if("string"==typeof t&&(t=Buffer.from(t,r)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,n,r,a);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?a?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):arrayIndexOf(e,[t],n,r,a);throw TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,n,r,a){let i,s=1,o=e.length,u=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return -1;s=2,o/=2,u/=2,n/=2}function read(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(a){let r=-1;for(i=n;i<o;i++)if(read(e,i)===read(t,-1===r?0:i-r)){if(-1===r&&(r=i),i-r+1===u)return r*s}else -1!==r&&(i-=i-r),r=-1}else for(n+u>o&&(n=o-u),i=n;i>=0;i--){let n=!0;for(let r=0;r<u;r++)if(read(e,i+r)!==read(t,r)){n=!1;break}if(n)return i}return -1}function utf8Slice(e,t,n){n=Math.min(e.length,n);let r=[],a=t;for(;a<n;){let t=e[a],i=null,s=t>239?4:t>223?3:t>191?2:1;if(a+s<=n){let n,r,o,u;switch(s){case 1:t<128&&(i=t);break;case 2:(192&(n=e[a+1]))==128&&(u=(31&t)<<6|63&n)>127&&(i=u);break;case 3:n=e[a+1],r=e[a+2],(192&n)==128&&(192&r)==128&&(u=(15&t)<<12|(63&n)<<6|63&r)>2047&&(u<55296||u>57343)&&(i=u);break;case 4:n=e[a+1],r=e[a+2],o=e[a+3],(192&n)==128&&(192&r)==128&&(192&o)==128&&(u=(15&t)<<18|(63&n)<<12|(63&r)<<6|63&o)>65535&&u<1114112&&(i=u)}}null===i?(i=65533,s=1):i>65535&&(i-=65536,r.push(i>>>10&1023|55296),i=56320|1023&i),r.push(i),a+=s}return function(e){let t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);let n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=4096));return n}(r)}function checkOffset(e,t,n){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>n)throw RangeError("Trying to access beyond buffer length")}function checkInt(e,t,n,r,a,i){if(!Buffer.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>a||t<i)throw RangeError('"value" argument is out of bounds');if(n+r>e.length)throw RangeError("Index out of range")}function wrtBigUInt64LE(e,t,n,r,a){checkIntBI(t,r,a,e,n,7);let i=Number(t&BigInt(4294967295));e[n++]=i,i>>=8,e[n++]=i,i>>=8,e[n++]=i,i>>=8,e[n++]=i;let s=Number(t>>BigInt(32)&BigInt(4294967295));return e[n++]=s,s>>=8,e[n++]=s,s>>=8,e[n++]=s,s>>=8,e[n++]=s,n}function wrtBigUInt64BE(e,t,n,r,a){checkIntBI(t,r,a,e,n,7);let i=Number(t&BigInt(4294967295));e[n+7]=i,i>>=8,e[n+6]=i,i>>=8,e[n+5]=i,i>>=8,e[n+4]=i;let s=Number(t>>BigInt(32)&BigInt(4294967295));return e[n+3]=s,s>>=8,e[n+2]=s,s>>=8,e[n+1]=s,s>>=8,e[n]=s,n+8}function checkIEEE754(e,t,n,r,a,i){if(n+r>e.length||n<0)throw RangeError("Index out of range")}function writeFloat(e,t,n,r,i){return t=+t,n>>>=0,i||checkIEEE754(e,t,n,4,34028234663852886e22,-34028234663852886e22),a.write(e,t,n,r,23,4),n+4}function writeDouble(e,t,n,r,i){return t=+t,n>>>=0,i||checkIEEE754(e,t,n,8,17976931348623157e292,-17976931348623157e292),a.write(e,t,n,r,52,8),n+8}t.lW=Buffer,t.h2=50,Buffer.TYPED_ARRAY_SUPPORT=function(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(Buffer.prototype,"parent",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.buffer}}),Object.defineProperty(Buffer.prototype,"offset",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.byteOffset}}),Buffer.poolSize=8192,Buffer.from=function(e,t,n){return from(e,t,n)},Object.setPrototypeOf(Buffer.prototype,Uint8Array.prototype),Object.setPrototypeOf(Buffer,Uint8Array),Buffer.alloc=function(e,t,n){return(assertSize(e),e<=0)?createBuffer(e):void 0!==t?"string"==typeof n?createBuffer(e).fill(t,n):createBuffer(e).fill(t):createBuffer(e)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==Buffer.prototype},Buffer.compare=function(e,t){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),isInstance(t,Uint8Array)&&(t=Buffer.from(t,t.offset,t.byteLength)),!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let n=e.length,r=t.length;for(let a=0,i=Math.min(n,r);a<i;++a)if(e[a]!==t[a]){n=e[a],r=t[a];break}return n<r?-1:r<n?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){let n;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);if(void 0===t)for(n=0,t=0;n<e.length;++n)t+=e[n].length;let r=Buffer.allocUnsafe(t),a=0;for(n=0;n<e.length;++n){let t=e[n];if(isInstance(t,Uint8Array))a+t.length>r.length?(Buffer.isBuffer(t)||(t=Buffer.from(t)),t.copy(r,a)):Uint8Array.prototype.set.call(r,t,a);else if(Buffer.isBuffer(t))t.copy(r,a);else throw TypeError('"list" argument must be an Array of Buffers');a+=t.length}return r},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.toLocaleString=Buffer.prototype.toString,Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){let e="",n=t.h2;return e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(e+=" ... "),"<Buffer "+e+">"},i&&(Buffer.prototype[i]=Buffer.prototype.inspect),Buffer.prototype.compare=function(e,t,n,r,a){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),!Buffer.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===a&&(a=this.length),t<0||n>e.length||r<0||a>this.length)throw RangeError("out of range index");if(r>=a&&t>=n)return 0;if(r>=a)return -1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,a>>>=0,this===e)return 0;let i=a-r,s=n-t,o=Math.min(i,s),u=this.slice(r,a),l=e.slice(t,n);for(let e=0;e<o;++e)if(u[e]!==l[e]){i=u[e],s=l[e];break}return i<s?-1:s<i?1:0},Buffer.prototype.includes=function(e,t,n){return -1!==this.indexOf(e,t,n)},Buffer.prototype.indexOf=function(e,t,n){return bidirectionalIndexOf(this,e,t,n,!0)},Buffer.prototype.lastIndexOf=function(e,t,n){return bidirectionalIndexOf(this,e,t,n,!1)},Buffer.prototype.write=function(e,t,n,r){var a,i,s,o,u,l,d,c;if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let p=this.length-t;if((void 0===n||n>p)&&(n=p),e.length>0&&(n<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");r||(r="utf8");let f=!1;for(;;)switch(r){case"hex":return function(e,t,n,r){let a;n=Number(n)||0;let i=e.length-n;r?(r=Number(r))>i&&(r=i):r=i;let s=t.length;for(r>s/2&&(r=s/2),a=0;a<r;++a){let r=parseInt(t.substr(2*a,2),16);if(r!=r)break;e[n+a]=r}return a}(this,e,t,n);case"utf8":case"utf-8":return a=t,i=n,blitBuffer(utf8ToBytes(e,this.length-a),this,a,i);case"ascii":case"latin1":case"binary":return s=t,o=n,blitBuffer(function(e){let t=[];for(let n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(e),this,s,o);case"base64":return u=t,l=n,blitBuffer(base64ToBytes(e),this,u,l);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return d=t,c=n,blitBuffer(function(e,t){let n,r;let a=[];for(let i=0;i<e.length&&!((t-=2)<0);++i)r=(n=e.charCodeAt(i))>>8,a.push(n%256),a.push(r);return a}(e,this.length-d),this,d,c);default:if(f)throw TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),f=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},Buffer.prototype.slice=function(e,t){let n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e);let r=this.subarray(e,t);return Object.setPrototypeOf(r,Buffer.prototype),r},Buffer.prototype.readUintLE=Buffer.prototype.readUIntLE=function(e,t,n){e>>>=0,t>>>=0,n||checkOffset(e,t,this.length);let r=this[e],a=1,i=0;for(;++i<t&&(a*=256);)r+=this[e+i]*a;return r},Buffer.prototype.readUintBE=Buffer.prototype.readUIntBE=function(e,t,n){e>>>=0,t>>>=0,n||checkOffset(e,t,this.length);let r=this[e+--t],a=1;for(;t>0&&(a*=256);)r+=this[e+--t]*a;return r},Buffer.prototype.readUint8=Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUint16LE=Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUint16BE=Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUint32LE=Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUint32BE=Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readBigUInt64LE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&boundsError(e,this.length-8);let r=t+256*this[++e]+65536*this[++e]+16777216*this[++e],a=this[++e]+256*this[++e]+65536*this[++e]+16777216*n;return BigInt(r)+(BigInt(a)<<BigInt(32))}),Buffer.prototype.readBigUInt64BE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&boundsError(e,this.length-8);let r=16777216*t+65536*this[++e]+256*this[++e]+this[++e],a=16777216*this[++e]+65536*this[++e]+256*this[++e]+n;return(BigInt(r)<<BigInt(32))+BigInt(a)}),Buffer.prototype.readIntLE=function(e,t,n){e>>>=0,t>>>=0,n||checkOffset(e,t,this.length);let r=this[e],a=1,i=0;for(;++i<t&&(a*=256);)r+=this[e+i]*a;return r>=(a*=128)&&(r-=Math.pow(2,8*t)),r},Buffer.prototype.readIntBE=function(e,t,n){e>>>=0,t>>>=0,n||checkOffset(e,t,this.length);let r=t,a=1,i=this[e+--r];for(;r>0&&(a*=256);)i+=this[e+--r]*a;return i>=(a*=128)&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return(e>>>=0,t||checkOffset(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);let n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);let n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readBigInt64LE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&boundsError(e,this.length-8);let r=this[e+4]+256*this[e+5]+65536*this[e+6]+(n<<24);return(BigInt(r)<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+16777216*this[++e])}),Buffer.prototype.readBigInt64BE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&boundsError(e,this.length-8);let r=(t<<24)+65536*this[++e]+256*this[++e]+this[++e];return(BigInt(r)<<BigInt(32))+BigInt(16777216*this[++e]+65536*this[++e]+256*this[++e]+n)}),Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),a.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),a.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),a.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),a.read(this,e,!1,52,8)},Buffer.prototype.writeUintLE=Buffer.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){let r=Math.pow(2,8*n)-1;checkInt(this,e,t,n,r,0)}let a=1,i=0;for(this[t]=255&e;++i<n&&(a*=256);)this[t+i]=e/a&255;return t+n},Buffer.prototype.writeUintBE=Buffer.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){let r=Math.pow(2,8*n)-1;checkInt(this,e,t,n,r,0)}let a=n-1,i=1;for(this[t+a]=255&e;--a>=0&&(i*=256);)this[t+a]=e/i&255;return t+n},Buffer.prototype.writeUint8=Buffer.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUint16LE=Buffer.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUint16BE=Buffer.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUint32LE=Buffer.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUint32BE=Buffer.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeBigUInt64LE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64LE(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),Buffer.prototype.writeBigUInt64BE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64BE(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),Buffer.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t>>>=0,!r){let r=Math.pow(2,8*n-1);checkInt(this,e,t,n,r-1,-r)}let a=0,i=1,s=0;for(this[t]=255&e;++a<n&&(i*=256);)e<0&&0===s&&0!==this[t+a-1]&&(s=1),this[t+a]=(e/i>>0)-s&255;return t+n},Buffer.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t>>>=0,!r){let r=Math.pow(2,8*n-1);checkInt(this,e,t,n,r-1,-r)}let a=n-1,i=1,s=0;for(this[t+a]=255&e;--a>=0&&(i*=256);)e<0&&0===s&&0!==this[t+a+1]&&(s=1),this[t+a]=(e/i>>0)-s&255;return t+n},Buffer.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeBigInt64LE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64LE(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),Buffer.prototype.writeBigInt64BE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64BE(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),Buffer.prototype.writeFloatLE=function(e,t,n){return writeFloat(this,e,t,!0,n)},Buffer.prototype.writeFloatBE=function(e,t,n){return writeFloat(this,e,t,!1,n)},Buffer.prototype.writeDoubleLE=function(e,t,n){return writeDouble(this,e,t,!0,n)},Buffer.prototype.writeDoubleBE=function(e,t,n){return writeDouble(this,e,t,!1,n)},Buffer.prototype.copy=function(e,t,n,r){if(!Buffer.isBuffer(e))throw TypeError("argument should be a Buffer");if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw RangeError("Index out of range");if(r<0)throw RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);let a=r-n;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,n,r):Uint8Array.prototype.set.call(e,this.subarray(n,r),t),a},Buffer.prototype.fill=function(e,t,n,r){let a;if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),void 0!==r&&"string"!=typeof r)throw TypeError("encoding must be a string");if("string"==typeof r&&!Buffer.isEncoding(r))throw TypeError("Unknown encoding: "+r);if(1===e.length){let t=e.charCodeAt(0);("utf8"===r&&t<128||"latin1"===r)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<n)throw RangeError("Out of range index");if(n<=t)return this;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(a=t;a<n;++a)this[a]=e;else{let i=Buffer.isBuffer(e)?e:Buffer.from(e,r),s=i.length;if(0===s)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(a=0;a<n-t;++a)this[a+t]=i[a%s]}return this};let s={};function E(e,t,n){s[e]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function addNumericalSeparator(e){let t="",n=e.length,r="-"===e[0]?1:0;for(;n>=r+4;n-=3)t=`_${e.slice(n-3,n)}${t}`;return`${e.slice(0,n)}${t}`}function checkIntBI(e,t,n,r,a,i){if(e>n||e<t){let r;let a="bigint"==typeof t?"n":"";throw r=i>3?0===t||t===BigInt(0)?`>= 0${a} and < 2${a} ** ${(i+1)*8}${a}`:`>= -(2${a} ** ${(i+1)*8-1}${a}) and < 2 ** ${(i+1)*8-1}${a}`:`>= ${t}${a} and <= ${n}${a}`,new s.ERR_OUT_OF_RANGE("value",r,e)}validateNumber(a,"offset"),(void 0===r[a]||void 0===r[a+i])&&boundsError(a,r.length-(i+1))}function validateNumber(e,t){if("number"!=typeof e)throw new s.ERR_INVALID_ARG_TYPE(t,"number",e)}function boundsError(e,t,n){if(Math.floor(e)!==e)throw validateNumber(e,n),new s.ERR_OUT_OF_RANGE(n||"offset","an integer",e);if(t<0)throw new s.ERR_BUFFER_OUT_OF_BOUNDS;throw new s.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${t}`,e)}E("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),E("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),E("ERR_OUT_OF_RANGE",function(e,t,n){let r=`The value of "${e}" is out of range.`,a=n;return Number.isInteger(n)&&Math.abs(n)>4294967296?a=addNumericalSeparator(String(n)):"bigint"==typeof n&&(a=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(a=addNumericalSeparator(a)),a+="n"),r+=` It must be ${t}. Received ${a}`},RangeError);let o=/[^+/0-9A-Za-z-_]/g;function utf8ToBytes(e,t){let n;t=t||1/0;let r=e.length,a=null,i=[];for(let s=0;s<r;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!a){if(n>56319||s+1===r){(t-=3)>-1&&i.push(239,191,189);continue}a=n;continue}if(n<56320){(t-=3)>-1&&i.push(239,191,189),a=n;continue}n=(a-55296<<10|n-56320)+65536}else a&&(t-=3)>-1&&i.push(239,191,189);if(a=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else if(n<1114112){if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}else throw Error("Invalid code point")}return i}function base64ToBytes(e){return r.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(o,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function blitBuffer(e,t,n,r){let a;for(a=0;a<r&&!(a+n>=t.length)&&!(a>=e.length);++a)t[a+n]=e[a];return a}function isInstance(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}let u=function(){let e="0123456789abcdef",t=Array(256);for(let n=0;n<16;++n){let r=16*n;for(let a=0;a<16;++a)t[r+a]=e[n]+e[a]}return t}();function defineBigIntMethod(e){return"undefined"==typeof BigInt?BufferBigIntNotDefined:e}function BufferBigIntNotDefined(){throw Error("BigInt not supported")}},47354:function(e,t){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */t.read=function(e,t,n,r,a){var i,s,o=8*a-r-1,u=(1<<o)-1,l=u>>1,d=-7,c=n?a-1:0,p=n?-1:1,f=e[t+c];for(c+=p,i=f&(1<<-d)-1,f>>=-d,d+=o;d>0;i=256*i+e[t+c],c+=p,d-=8);for(s=i&(1<<-d)-1,i>>=-d,d+=r;d>0;s=256*s+e[t+c],c+=p,d-=8);if(0===i)i=1-l;else{if(i===u)return s?NaN:(f?-1:1)*(1/0);s+=Math.pow(2,r),i-=l}return(f?-1:1)*s*Math.pow(2,i-r)},t.write=function(e,t,n,r,a,i){var s,o,u,l=8*i-a-1,d=(1<<l)-1,c=d>>1,p=23===a?5960464477539062e-23:0,f=r?0:i-1,h=r?1:-1,m=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(o=isNaN(t)?1:0,s=d):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),s+c>=1?t+=p/u:t+=p*Math.pow(2,1-c),t*u>=2&&(s++,u/=2),s+c>=d?(o=0,s=d):s+c>=1?(o=(t*u-1)*Math.pow(2,a),s+=c):(o=t*Math.pow(2,c-1)*Math.pow(2,a),s=0));a>=8;e[n+f]=255&o,f+=h,o/=256,a-=8);for(s=s<<a|o,l+=a;l>0;e[n+f]=255&s,f+=h,s/=256,l-=8);e[n+f-h]|=128*m}},6017:function(e){e.exports=Long;var t=null;try{t=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function Long(e,t,n){this.low=0|e,this.high=0|t,this.unsigned=!!n}function isLong(e){return!0===(e&&e.__isLong__)}Long.prototype.__isLong__,Object.defineProperty(Long.prototype,"__isLong__",{value:!0}),Long.isLong=isLong;var n={},r={};function fromInt(e,t){var a,i,s;return t?(e>>>=0,(s=0<=e&&e<256)&&(i=r[e]))?i:(a=fromBits(e,(0|e)<0?-1:0,!0),s&&(r[e]=a),a):(e|=0,(s=-128<=e&&e<128)&&(i=n[e]))?i:(a=fromBits(e,e<0?-1:0,!1),s&&(n[e]=a),a)}function fromNumber(e,t){if(isNaN(e))return t?d:l;if(t){if(e<0)return d;if(e>=s)return m}else{if(e<=-o)return g;if(e+1>=o)return h}return e<0?fromNumber(-e,t).neg():fromBits(e%i|0,e/i|0,t)}function fromBits(e,t,n){return new Long(e,t,n)}Long.fromInt=fromInt,Long.fromNumber=fromNumber,Long.fromBits=fromBits;var a=Math.pow;function fromString(e,t,n){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return l;if("number"==typeof t?(n=t,t=!1):t=!!t,(n=n||10)<2||36<n)throw RangeError("radix");if((r=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===r)return fromString(e.substring(1),t,n).neg();for(var r,i=fromNumber(a(n,8)),s=l,o=0;o<e.length;o+=8){var u=Math.min(8,e.length-o),d=parseInt(e.substring(o,o+u),n);if(u<8){var c=fromNumber(a(n,u));s=s.mul(c).add(fromNumber(d))}else s=(s=s.mul(i)).add(fromNumber(d))}return s.unsigned=t,s}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}Long.fromString=fromString,Long.fromValue=fromValue;var i=4294967296,s=18446744073709552e3,o=0x7fffffffffffffff,u=fromInt(16777216),l=fromInt(0);Long.ZERO=l;var d=fromInt(0,!0);Long.UZERO=d;var c=fromInt(1);Long.ONE=c;var p=fromInt(1,!0);Long.UONE=p;var f=fromInt(-1);Long.NEG_ONE=f;var h=fromBits(-1,2147483647,!1);Long.MAX_VALUE=h;var m=fromBits(-1,-1,!0);Long.MAX_UNSIGNED_VALUE=m;var g=fromBits(0,-2147483648,!1);Long.MIN_VALUE=g;var b=Long.prototype;b.toInt=function(){return this.unsigned?this.low>>>0:this.low},b.toNumber=function(){return this.unsigned?(this.high>>>0)*i+(this.low>>>0):this.high*i+(this.low>>>0)},b.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(!this.eq(g))return"-"+this.neg().toString(e);var t=fromNumber(e),n=this.div(t),r=n.mul(t).sub(this);return n.toString(e)+r.toInt().toString(e)}for(var i=fromNumber(a(e,6),this.unsigned),s=this,o="";;){var u=s.div(i),l=(s.sub(u.mul(i)).toInt()>>>0).toString(e);if((s=u).isZero())return l+o;for(;l.length<6;)l="0"+l;o=""+l+o}},b.getHighBits=function(){return this.high},b.getHighBitsUnsigned=function(){return this.high>>>0},b.getLowBits=function(){return this.low},b.getLowBitsUnsigned=function(){return this.low>>>0},b.getNumBitsAbs=function(){if(this.isNegative())return this.eq(g)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},b.isZero=function(){return 0===this.high&&0===this.low},b.eqz=b.isZero,b.isNegative=function(){return!this.unsigned&&this.high<0},b.isPositive=function(){return this.unsigned||this.high>=0},b.isOdd=function(){return(1&this.low)==1},b.isEven=function(){return(1&this.low)==0},b.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},b.eq=b.equals,b.notEquals=function(e){return!this.eq(e)},b.neq=b.notEquals,b.ne=b.notEquals,b.lessThan=function(e){return 0>this.comp(e)},b.lt=b.lessThan,b.lessThanOrEqual=function(e){return 0>=this.comp(e)},b.lte=b.lessThanOrEqual,b.le=b.lessThanOrEqual,b.greaterThan=function(e){return this.comp(e)>0},b.gt=b.greaterThan,b.greaterThanOrEqual=function(e){return this.comp(e)>=0},b.gte=b.greaterThanOrEqual,b.ge=b.greaterThanOrEqual,b.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},b.comp=b.compare,b.negate=function(){return!this.unsigned&&this.eq(g)?g:this.not().add(c)},b.neg=b.negate,b.add=function(e){isLong(e)||(e=fromValue(e));var t,n,r=this.high>>>16,a=65535&this.high,i=this.low>>>16,s=65535&this.low,o=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,c=0,p=0;return t=0+((n=0+(s+d))>>>16),n&=65535,t+=i+l,p+=t>>>16,t&=65535,p+=a+u,c+=p>>>16,p&=65535,c+=r+o,fromBits(t<<16|n,(c&=65535)<<16|p,this.unsigned)},b.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},b.sub=b.subtract,b.multiply=function(e){if(this.isZero())return l;if(isLong(e)||(e=fromValue(e)),t)return fromBits(t.mul(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned);if(e.isZero())return l;if(this.eq(g))return e.isOdd()?g:l;if(e.eq(g))return this.isOdd()?g:l;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(u)&&e.lt(u))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var n,r,a=this.high>>>16,i=65535&this.high,s=this.low>>>16,o=65535&this.low,d=e.high>>>16,c=65535&e.high,p=e.low>>>16,f=65535&e.low,h=0,m=0;return n=0+((r=0+o*f)>>>16),r&=65535,n+=s*f,m+=n>>>16,n&=65535,n+=o*p,m+=n>>>16,n&=65535,m+=i*f,h+=m>>>16,m&=65535,m+=s*p,h+=m>>>16,m&=65535,m+=o*c,h+=m>>>16,m&=65535,h+=a*f+i*p+s*c+o*d,fromBits(n<<16|r,(h&=65535)<<16|m,this.unsigned)},b.mul=b.multiply,b.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(t){var n,r,i;return this.unsigned||-2147483648!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?t.div_u:t.div_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?d:l;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return d;if(e.gt(this.shru(1)))return p;i=d}else{if(this.eq(g))return e.eq(c)||e.eq(f)?g:e.eq(g)?c:(n=this.shr(1).div(e).shl(1)).eq(l)?e.isNegative()?c:f:(r=this.sub(e.mul(n)),i=n.add(r.div(e)));if(e.eq(g))return this.unsigned?d:l;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=l}for(r=this;r.gte(e);){for(var s=Math.ceil(Math.log(n=Math.max(1,Math.floor(r.toNumber()/e.toNumber())))/Math.LN2),o=s<=48?1:a(2,s-48),u=fromNumber(n),h=u.mul(e);h.isNegative()||h.gt(r);)n-=o,h=(u=fromNumber(n,this.unsigned)).mul(e);u.isZero()&&(u=c),i=i.add(u),r=r.sub(h)}return i},b.div=b.divide,b.modulo=function(e){return(isLong(e)||(e=fromValue(e)),t)?fromBits((this.unsigned?t.rem_u:t.rem_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},b.mod=b.modulo,b.rem=b.modulo,b.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},b.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},b.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},b.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},b.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},b.shl=b.shiftLeft,b.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},b.shr=b.shiftRight,b.shiftRightUnsigned=function(e){if(isLong(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?fromBits(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?fromBits(t,0,this.unsigned):fromBits(t>>>e-32,0,this.unsigned)},b.shru=b.shiftRightUnsigned,b.shr_u=b.shiftRightUnsigned,b.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},b.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},b.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},b.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},b.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long.fromBytes=function(e,t,n){return n?Long.fromBytesLE(e,t):Long.fromBytesBE(e,t)},Long.fromBytesLE=function(e,t){return new Long(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long.fromBytesBE=function(e,t){return new Long(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}}}]);
//# sourceMappingURL=2202-70b8e79e76461e0a.js.map