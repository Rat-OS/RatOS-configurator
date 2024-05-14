(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4293],{6036:function(e,t,a){"use strict";var n=a(85964),r=a(97858);/**
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
 */let l=n.GDt.ZA;let MathBackendCPU=class MathBackendCPU extends n.Zuw{nextDataId(){return MathBackendCPU.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new n.JLz(this,(0,n.SRH)())}write(e,t,a){this.firstUse&&(this.firstUse=!1,(0,n.OBj)().get("IS_NODE")&&n.backend_util.warn("\n============================\nHi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. \n============================"));let r={id:this.nextDataId()};return this.data.set(r,{values:e,dtype:a,refCount:1}),r}makeTensorInfo(e,t,a){let r;if("string"===t&&null!=a&&a.length>0&&n.D5U.isString(a[0])){let l=a.map(e=>n.D5U.encodeString(e));r=this.write(l,e,t)}else r=this.write(a,e,t);return{dataId:r,shape:e,dtype:t}}refCount(e){if(this.data.has(e)){let t=this.data.get(e);return t.refCount}return 0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,a,n,r){this.data.set(e,{values:t,dtype:n,refCount:r})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:a}=this.data.get(e);if("complex64"===t){let e=this.readSync(a.real.dataId),t=this.readSync(a.imag.dataId);return n.backend_util.mergeRealAndImagArrays(e,t)}return n.D5U.convertBackendValuesAndArrayBuffer(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if("string"===e.dtype)try{let a=t.map(e=>n.D5U.decodeString(e));return(0,n.f3b)(e.shape,e.dtype,a)}catch(e){throw Error("Failed to decode encoded string bytes into utf-8")}return(0,n.f3b)(e.shape,e.dtype,t)}makeOutput(e,t,a){return(0,n.SRH)().makeTensorFromTensorInfo(this.makeTensorInfo(t,a,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:a}=this.data.get(e);null!=a&&(this.disposeData(a.real.dataId,!0),this.disposeData(a.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=n.D5U.now();e();let a=n.D5U.now()-t;return{kernelMs:a}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(e){(0,r.H)([e],"where");let t=this.readSync(e.dataId);return l(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};MathBackendCPU.nextDataId=0,/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(0,n.jqO)("cpu",()=>new MathBackendCPU,1);var o=a(925);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let s=(0,o.A)(n.SX0,e=>e>=0?e:Math.exp(e)-1),i={kernelName:n.SX0,backendName:"cpu",kernelFunc:s};var u=a(45195);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function leakyRelu(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{alpha:s}=l;(0,r.H)([o],"leakyRelu");let i=n.D5U.sizeFromShape(o.shape),u=a.data.get(o.dataId).values,d=n.D5U.getTypedArrayFromDType("float32",i);for(let e=0;e<u.length;e++)d[e]=u[e]<0?s*u[e]:u[e];return a.makeTensorInfo(o.shape,"float32",d)}let d={kernelName:n.J$2,backendName:"cpu",kernelFunc:leakyRelu};var p=a(62074);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let c=(0,p.b)((e,t)=>e<0?t*e:e);function prelu(e){let{inputs:t,backend:a}=e,{x:n,alpha:l}=t;(0,r.H)([n,l],"prelu");let o=a.data.get(n.dataId).values,s=a.data.get(l.dataId).values,[i,u]=c(n.shape,l.shape,o,s,"float32");return a.makeTensorInfo(u,"float32",i)}let h={kernelName:n.o0g,backendName:"cpu",kernelFunc:prelu},f=(0,o.A)(n.qkr,e=>Math.max(0,e)),m={kernelName:n.qkr,backendName:"cpu",kernelFunc:f},k=(0,o.A)(n.SbG,e=>Math.min(Math.max(0,e),6)),g={kernelName:n.SbG,backendName:"cpu",kernelFunc:k};var I=a(26488);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function applyActivation(e,t,a,n,r){if("linear"===a)return(0,u.y)({inputs:{x:t},backend:e});if("relu"===a)return f({inputs:{x:t},backend:e});if("elu"===a)return s({inputs:{x:t},backend:e});if("relu6"===a)return k({inputs:{x:t},backend:e});if("prelu"===a)return prelu({inputs:{x:t,alpha:n},backend:e});if("leakyrelu"===a)return leakyRelu({inputs:{x:t},backend:e,attrs:{alpha:r}});if("sigmoid"===a)return(0,I.XD)({inputs:{x:t},backend:e});throw Error(`Activation ${a} has not been implemented for the CPU backend.`)}var y=a(82479);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function reshape(e){let{inputs:t,backend:a,attrs:r}=e,{x:l}=t,{shape:o}=r,s=n.D5U.sizeFromShape(l.shape),i=n.D5U.inferFromImplicitShape(o,s),u=n.D5U.sizeFromShape(i);n.D5U.assert(s===u,()=>`The new shape (${i}) has ${u} elements and the old shape (${l.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`),a.incRef(l.dataId);let d=a.data.get(l.dataId);if(null!=d.complexTensorInfos){let e=d.complexTensorInfos.real,t=d.complexTensorInfos.imag;e.shape=i,t.shape=i}return{dataId:l.dataId,shape:i,dtype:l.dtype}}let b={kernelName:n.HZH,backendName:"cpu",kernelFunc:reshape};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function batchMatMul(e){let{inputs:t,backend:a,attrs:l}=e,{a:o,b:s}=t,{transposeA:i,transposeB:u}=l;(0,r.H)([o,s],"matMul");let d=o.shape.length,p=s.shape.length,c=i?o.shape[d-2]:o.shape[d-1],h=u?s.shape[p-1]:s.shape[p-2],f=i?o.shape[d-1]:o.shape[d-2],m=u?s.shape[p-2]:s.shape[p-1],k=o.shape.slice(0,-2),g=s.shape.slice(0,-2),I=n.D5U.sizeFromShape(k),y=n.D5U.sizeFromShape(g),b=n.Jyw.assertAndGetBroadcastShape(o.shape.slice(0,-2),s.shape.slice(0,-2)),v=b.concat([f,m]);n.D5U.assert(c===h,()=>`Error in matMul: inner shapes (${c}) and (${h}) of Tensors with shapes ${o.shape} and ${s.shape} and transposeA=${i} and transposeB=${u} must match.`);let x=i?[I,c,f]:[I,f,c],N=u?[y,m,h]:[y,h,m],D=reshape({inputs:{x:o},backend:a,attrs:{shape:x}}),S=reshape({inputs:{x:s},backend:a,attrs:{shape:N}}),T=i?D.shape[1]:D.shape[2],F=i?D.shape[2]:D.shape[1],M=u?S.shape[1]:S.shape[2],w=Math.max(I,y),A=a.data.get(D.dataId).values,U=a.data.get(S.dataId).values,_=n.D5U.computeStrides(D.shape),H=n.D5U.computeStrides(S.shape),[E,z,P]=i?[_[0],1,_[1]]:[_[0],_[1],1],[C,$,W]=u?[1,H[1],H[0]]:[H[1],1,H[0]],R=F*M,V=(0,n.f3b)([w,F,M],D.dtype),Z=V.values,O=a.blockSize;for(let e=0;e<w;e++){let t=e%I,a=e%y;for(let n=0;n<F;n+=O){let r=Math.min(n+O,F);for(let l=0;l<M;l+=O){let o=Math.min(l+O,M);for(let s=0;s<T;s+=O){let i=Math.min(s+O,T);for(let u=n;u<r;u++)for(let n=l;n<o;n++){let r=0;for(let e=s;e<i;e++){let l=A[t*E+u*z+e*P],o=U[e*C+n*$+a*W];r+=l*o}Z[e*R+(u*M+n)]+=r}}}}}return a.disposeIntermediateTensorInfo(D),a.disposeIntermediateTensorInfo(S),a.makeTensorInfo(v,V.dtype,V.values)}let v={kernelName:n.XLW,backendName:"cpu",kernelFunc:batchMatMul},x={kernelName:n.usg,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t,a,n;let{inputs:r,backend:l,attrs:o}=e,{a:s,b:i,bias:u,preluActivationWeights:d}=r,{transposeA:p,transposeB:c,activation:h,leakyreluAlpha:f}=o,m=[],k=batchMatMul({inputs:{a:s,b:i},attrs:{transposeA:p,transposeB:c},backend:l});for(let e of(t=k,u&&(a=(0,y.IH)({inputs:{a:t,b:u},backend:l}),m.push(t),t=a),h&&(n=applyActivation(l,t,h,d,f),m.push(t),t=n),m))l.disposeIntermediateTensorInfo(e);return t}};var N=a(65424);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let D=(0,o.A)(n.VGw,e=>Math.acos(e)),S={kernelName:n.VGw,backendName:"cpu",kernelFunc:D},T=(0,o.A)(n.SpW,e=>Math.acosh(e)),F={kernelName:n.SpW,backendName:"cpu",kernelFunc:T},M={kernelName:n.Xze,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e;(0,r.H)(t,"addN");let l=t.map(e=>a.data.get(e.dataId).values),o=(0,n.f3b)(t[0].shape,t[0].dtype),s=o.values;for(let e=0;e<t.length;e++){let t=l[e];for(let e=0;e<s.length;e++)s[e]+=t[e]}return a.makeTensorInfo(o.shape,o.dtype,o.values)}};var w=a(11618);let A={kernelName:n.oT6,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s,keepDims:i}=l;(0,r.H)(o,"all");let u=n.D5U.parseAxisParam(s,o.shape),d=u,p=n.backend_util.getAxesPermutation(d,o.shape.length),c=o;null!=p&&(c=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:p}}),d=n.backend_util.getInnerMostAxes(d.length,o.shape.length)),n.backend_util.assertAxesAreInnerMostDims("all",d,c.shape.length);let[h,f]=n.backend_util.computeOutAndReduceShapes(c.shape,d),m=n.D5U.sizeFromShape(f),k=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(h),c.dtype),g=a.data.get(c.dataId).values;for(let e=0;e<k.length;++e){let t=e*m,a=g[t];for(let e=0;e<m;++e){let n=g[t+e];a=a&&n}k[e]=a}null!=p&&a.disposeIntermediateTensorInfo(c);let I=a.makeTensorInfo(h,c.dtype,k);if(i){let e=n.backend_util.expandShapeToKeepDim(h,u),t=reshape({inputs:{x:I},backend:a,attrs:{shape:e}});return a.disposeIntermediateTensorInfo(I),t}return I}},U={kernelName:n.IKK,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s,keepDims:i}=l;(0,r.H)(o,"any");let u=n.D5U.parseAxisParam(s,o.shape),d=u,p=n.backend_util.getAxesPermutation(d,o.shape.length),c=o;null!=p&&(c=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:p}}),d=n.backend_util.getInnerMostAxes(d.length,o.shape.length)),n.backend_util.assertAxesAreInnerMostDims("any",d,c.shape.length);let[h,f]=n.backend_util.computeOutAndReduceShapes(c.shape,d),m=n.D5U.sizeFromShape(f),k=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(h),c.dtype),g=a.data.get(c.dataId).values;for(let e=0;e<k.length;++e){let t=e*m,a=g[t];for(let e=0;e<m;++e){let n=g[t+e];a=a||n}k[e]=a}null!=p&&a.disposeIntermediateTensorInfo(c);let I=a.makeTensorInfo(h,c.dtype,k);if(i){let e=n.backend_util.expandShapeToKeepDim(h,u),t=reshape({inputs:{x:I},backend:a,attrs:{shape:e}});return a.disposeIntermediateTensorInfo(I),t}return I}},_={kernelName:n.sJF,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s}=l;(0,r.H)(o,"argMax");let i=n.D5U.parseAxisParam(s,o.shape),u=n.backend_util.getAxesPermutation(i,o.shape.length),d=o,p=[];null!=u&&(p.push(d=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:u}})),i=n.backend_util.getInnerMostAxes(i.length,d.shape.length)),i=[i[0]],n.backend_util.assertAxesAreInnerMostDims("argMax",i,d.shape.length);let[c,h]=n.backend_util.computeOutAndReduceShapes(d.shape,i),f=n.D5U.sizeFromShape(c),m=n.D5U.makeZerosTypedArray(f,"int32"),k=n.D5U.sizeFromShape(h),g=a.data.get(d.dataId).values;for(let e=0;e<m.length;++e){let t=e*k,a=g[t],n=0;for(let e=0;e<k;++e){let r=g[t+e];r>a&&(a=r,n=e)}m[e]=n}return p.forEach(e=>a.disposeIntermediateTensorInfo(e)),a.makeTensorInfo(c,"int32",m)}},H={kernelName:n.aJk,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s}=l;(0,r.H)(o,"argMin");let i=n.D5U.parseAxisParam(s,o.shape),u=n.backend_util.getAxesPermutation(i,o.shape.length),d=o,p=[];null!=u&&(p.push(d=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:u}})),i=n.backend_util.getInnerMostAxes(i.length,d.shape.length)),i=[i[0]],n.backend_util.assertAxesAreInnerMostDims("argMin",i,d.shape.length);let[c,h]=n.backend_util.computeOutAndReduceShapes(d.shape,i),f=n.D5U.sizeFromShape(c),m=n.D5U.makeZerosTypedArray(f,"int32"),k=n.D5U.sizeFromShape(h),g=a.data.get(d.dataId).values;for(let e=0;e<m.length;++e){let t=e*k,a=g[t],n=0;for(let e=0;e<k;++e){let r=g[t+e];r<a&&(a=r,n=e)}m[e]=n}return p.forEach(e=>a.disposeIntermediateTensorInfo(e)),a.makeTensorInfo(c,"int32",m)}},E=(0,o.A)(n.M2y,e=>Math.asin(e)),z={kernelName:n.M2y,backendName:"cpu",kernelFunc:E},P=(0,o.A)(n.qw7,e=>Math.asinh(e)),C={kernelName:n.qw7,backendName:"cpu",kernelFunc:P},$=(0,o.A)(n.jMg,e=>Math.atan(e)),W={kernelName:n.jMg,backendName:"cpu",kernelFunc:$};var R=a(8093);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let V=(0,p.b)((e,t)=>Math.atan2(e,t)),Z=(0,R.j)(n.QCc,V),O={kernelName:n.QCc,backendName:"cpu",kernelFunc:Z},j=(0,o.A)(n.Oyi,e=>Math.atanh(e)),G={kernelName:n.Oyi,backendName:"cpu",kernelFunc:j};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pool(e,t,a,r,l,o){let s=l.strideHeight,i=l.strideWidth,u=l.dilationHeight,d=l.dilationWidth,p=l.effectiveFilterHeight,c=l.effectiveFilterWidth,h=l.padInfo.top,f=l.padInfo.left,m="max"===o?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,k=(0,n.f3b)(l.outShape,a),g=k.values,I=l.outShape[1]*l.outShape[2]*l.outShape[3],y=l.outShape[2]*l.outShape[3],b=l.outShape[3];for(let t=0;t<l.batchSize;++t){let a=t*I,n=t*r[0];for(let t=0;t<l.inChannels;++t)for(let k=0;k<l.outHeight;++k){let I=k*s-h,v=Math.max(0,I),x=Math.min(l.inHeight,p+I),N=a+k*y;for(let a=0;a<l.outWidth;++a){let s=a*i-f,p=Math.max(0,s),h=Math.min(l.inWidth,c+s),k=m,I=0,y=0;for(let a=v;a<x;a+=u){let l=n+a*r[1];for(let a=p;a<h;a+=d){let n=l+a*r[2],s=e[n+t];"max"===o&&s>k?k=s:"avg"===o&&(I+=s,y++)}if(isNaN(k))break}let D=N+a*b+t;g[D]="avg"===o?I/y:k}}}return k}function maxPoolPositions(e,t,a,r,l=!1,o=!1){let s=(0,n.f3b)(r.outShape,"int32"),i=r.strideHeight,u=r.strideWidth,d=r.dilationHeight,p=r.dilationWidth,c=r.effectiveFilterHeight,h=r.effectiveFilterWidth,f=r.padInfo.top,m=r.padInfo.left,k=(0,n.f3b)(t,a,e);for(let e=0;e<r.batchSize;++e)for(let t=0;t<r.inChannels;++t)for(let a=0;a<r.outHeight;++a){let n=a*i-f,g=n;for(;g<0;)g+=d;let I=Math.min(r.inHeight,c+n);for(let i=0;i<r.outWidth;++i){let c=i*u-m,f=c;for(;f<0;)f+=p;let y=Math.min(r.inWidth,h+c),b=Number.NEGATIVE_INFINITY,v=-1;for(let a=g;a<I;a+=d){let s=a-n;for(let n=f;n<y;n+=p){let i=n-c,u=k.get(e,a,n,t);u>b&&(b=u,v=l?o?((e*r.inHeight+a)*r.inWidth+n)*r.inChannels+t:(a*r.inWidth+n)*r.inChannels+t:s*h+i)}}s.set(v,e,a,i,t)}}return s}function pool3d(e,t,a,r,l,o){let s=l.strideDepth,i=l.strideHeight,u=l.strideWidth,d=l.dilationDepth,p=l.dilationHeight,c=l.dilationWidth,h=l.effectiveFilterDepth,f=l.effectiveFilterHeight,m=l.effectiveFilterWidth,k=l.padInfo.front,g=l.padInfo.top,I=l.padInfo.left,y="max"===o?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,b=(0,n.f3b)(l.outShape,a),v=b.values,x=l.outShape[1]*l.outShape[2]*l.outShape[3]*l.outShape[4],N=l.outShape[2]*l.outShape[3]*l.outShape[4],D=l.outShape[3]*l.outShape[4],S=l.outShape[4];for(let t=0;t<l.batchSize;++t){let a=t*x,n=t*r[0];for(let t=0;t<l.inChannels;++t)for(let b=0;b<l.outDepth;++b){let x=b*s-k,T=x;for(;T<0;)T+=d;let F=Math.min(l.inDepth,h+x),M=a+b*N;for(let a=0;a<l.outHeight;++a){let s=a*i-g,h=s;for(;h<0;)h+=p;let k=Math.min(l.inHeight,f+s),b=M+a*D;for(let a=0;a<l.outWidth;++a){let s=a*u-I,i=s;for(;i<0;)i+=c;let f=Math.min(l.inWidth,m+s),g=b+a*S,x=y,N=0,D=0;for(let a=T;a<F;a+=d){let l=n+a*r[1];for(let a=h;a<k;a+=p){let n=l+a*r[2];for(let a=i;a<f;a+=c){let l=n+a*r[3],s=e[l+t];if("max"===o&&s>x?x=s:"avg"===o&&(N+=s,D++),isNaN(x))break}if(isNaN(x))break}if(isNaN(x))break}let M=g+t;v[M]="avg"===o?N/Math.max(D,1):x}}}}return b}let q={kernelName:n.JhU,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:a,backend:l,attrs:o}=e,{x:s}=a;(0,r.H)(s,"avgPool");let{filterSize:i,strides:d,pad:p,dimRoundingMode:c}=o;n.D5U.assert(n.backend_util.eitherStridesOrDilationsAreOne(d,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${d} and dilations '1'`);let h=n.backend_util.computePool2DInfo(s.shape,i,d,1,p,c);if(1===h.filterWidth&&1===h.filterHeight&&n.D5U.arraysEqual(h.inShape,h.outShape))t=(0,u.y)({inputs:{x:s},backend:l});else{let e=l.data.get(s.dataId).values,a=n.D5U.computeStrides(s.shape),r=pool(e,s.shape,s.dtype,a,h,"avg");t=l.makeTensorInfo(h.outShape,s.dtype,r.values)}return t}},B={kernelName:n._k9,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{filterSize:s,strides:i,pad:u,dimRoundingMode:d,dataFormat:p}=l;(0,r.H)(o,"avgPool3d");let c=n.backend_util.computePool3DInfo(o.shape,s,i,1,u,d,p),h=a.data.get(o.dataId).values,f=pool3d(h,o.shape,o.dtype,n.D5U.computeStrides(o.shape),c,"avg");return a.makeTensorInfo(f.shape,"float32",f.values)}},L={kernelName:n.IMb,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,input:s}=t,{filterSize:i,strides:u,pad:d,dimRoundingMode:p}=l;(0,r.H)([o,s],"avgPool3DGrad");let c=n.backend_util.computePool3DInfo(s.shape,i,u,1,d,p),h=c.strideDepth,f=c.strideHeight,m=c.strideWidth,k=c.filterDepth,g=c.filterHeight,I=c.filterWidth,y=c.dilationDepth,b=c.dilationHeight,v=c.dilationWidth,x=c.effectiveFilterDepth,N=c.effectiveFilterHeight,D=c.effectiveFilterWidth,S=x-1-c.padInfo.front,T=D-1-c.padInfo.left,F=N-1-c.padInfo.top,M=(0,n.f3b)(s.shape,"float32"),w=1/(k*g*I),A=a.bufferSync(o);for(let e=0;e<c.batchSize;++e)for(let t=0;t<c.inChannels;++t)for(let a=0;a<c.inDepth;++a)for(let n=0;n<c.inHeight;++n)for(let r=0;r<c.inWidth;++r){let l=a-S,o=n-F,s=r-T,i=0;for(let a=0;a<x;a+=y){let n=(l+a)/h;if(!(n<0)&&!(n>=c.outDepth)&&Math.floor(n)===n)for(let a=0;a<N;a+=b){let r=(o+a)/f;if(!(r<0)&&!(r>=c.outHeight)&&Math.floor(r)===r)for(let a=0;a<D;a+=v){let l=(s+a)/m;if(l<0||l>=c.outWidth||Math.floor(l)!==l)continue;let o=A.get(e,n,r,l,t);i+=o}}}M.set(i*w,e,a,n,r,t)}return a.makeTensorInfo(M.shape,M.dtype,M.values)}},Y={kernelName:n.ROF,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,input:s}=t;(0,r.H)([o,s],"avgPoolGrad");let{filterSize:i,strides:u,pad:d}=l,p=n.backend_util.computePool2DInfo(s.shape,i,u,1,d),c=p.strideHeight,h=p.strideWidth,f=p.filterHeight,m=p.filterWidth,k=p.dilationHeight,g=p.dilationWidth,I=p.effectiveFilterHeight,y=p.effectiveFilterWidth,b=y-1-p.padInfo.left,v=I-1-p.padInfo.top,x=(0,n.f3b)(s.shape,"float32"),N=1/(f*m),D=a.data.get(o.dataId).values,S=(0,n.f3b)(o.shape,"float32",D);for(let e=0;e<p.batchSize;++e)for(let t=0;t<p.inChannels;++t)for(let a=0;a<p.inHeight;++a)for(let n=0;n<p.inWidth;++n){let r=a-v,l=n-b,o=0;for(let a=0;a<I;a+=k){let n=(r+a)/c;if(!(n<0)&&!(n>=p.outHeight)&&Math.floor(n)===n)for(let a=0;a<y;a+=g){let r=(l+a)/h;if(r<0||r>=p.outWidth||Math.floor(r)!==r)continue;let s=S.get(e,n,r,t);o+=s}}x.set(o*N,e,a,n,t)}return a.makeTensorInfo(x.shape,x.dtype,x.values)}},X={kernelName:n.sHE,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,scale:s,offset:i,mean:u,variance:d}=t;n.D5U.assert(u.shape.length===d.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),n.D5U.assert(null==i||u.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),n.D5U.assert(null==s||u.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),(0,r.H)([o,u,d,s,i],"batchNorm");let{varianceEpsilon:p}=l;null==p&&(p=.001);let c=a.data.get(o.dataId).values,h=a.data.get(u.dataId).values,f=a.data.get(d.dataId).values,m=s?a.data.get(s.dataId).values:new Float32Array([1]),k=i?a.data.get(i.dataId).values:new Float32Array([0]),g=new Float32Array(c.length),I=k.length,y=m.length,b=f.length,v=h.length,x=0,N=0,D=0,S=0;for(let e=0;e<c.length;++e)g[e]=k[x++]+(c[e]-h[N++])*m[D++]/Math.sqrt(f[S++]+p),x>=I&&(x=0),N>=v&&(N=0),D>=y&&(D=0),S>=b&&(S=0);return a.makeTensorInfo(o.shape,o.dtype,g)}};var K=a(37804);let Q={kernelName:n.zws,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{blockShape:s,crops:i}=l;(0,r.H)([o],"batchToSpaceND");let u=s.reduce((e,t)=>e*t),d=n.backend_util.getReshaped(o.shape,s,u),p=n.backend_util.getPermuted(d.length,s.length),c=n.backend_util.getReshapedPermuted(o.shape,s,u),h=n.backend_util.getSliceBeginCoords(i,s.length),f=n.backend_util.getSliceSize(c,i,s.length),m=reshape({inputs:{x:o},backend:a,attrs:{shape:d}}),k=(0,w.p)({inputs:{x:m},backend:a,attrs:{perm:p}}),g=reshape({inputs:{x:k},backend:a,attrs:{shape:c}}),I=(0,K.tP)({inputs:{x:g},backend:a,attrs:{begin:h,size:f}});return a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(k),a.disposeIntermediateTensorInfo(g),I}};var J=a(89590);let ee={kernelName:n.zvY,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:r,weights:l}=t,{size:o}=n,s=a.data.get(r.dataId).values,i=a.data.get(l.dataId).values,u=(0,J.W)(s,i,l.dtype,l.shape,o);return a.makeTensorInfo([o],l.dtype,u)}};var et=a(38066);let ea={kernelName:n.eEB,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{s0:r,s1:l}=t,o=a.data.get(r.dataId).values,s=a.data.get(l.dataId).values,i=n.backend_util.assertAndGetBroadcastShape(Array.from(o),Array.from(s));return a.makeTensorInfo([i.length],"int32",Int32Array.from(i))}};var en=a(964),er=a(23225);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let el=(0,o.A)(n.xnO,(e,t)=>e>t.clipValueMax?t.clipValueMax:e<t.clipValueMin?t.clipValueMin:e),eo={kernelName:n.xnO,backendName:"cpu",kernelFunc:el};var es=a(4471);let ei={kernelName:n.yj2,backendName:"cpu",kernelFunc:e=>{let{x:t}=e.inputs,a=e.backend,r=new Float32Array(n.D5U.sizeFromShape(t.shape)),l=a.data.get(t.dataId),o=l.complexTensorInfos.real,s=l.complexTensorInfos.imag,i=a.data.get(o.dataId).values,u=a.data.get(s.dataId).values;for(let e=0;e<i.length;e++){let t=i[e],a=u[e];r[e]=Math.hypot(t,a)}return a.makeOutput(r,t.shape,"float32")}};var eu=a(82846);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function imag(e){let{inputs:t,backend:a}=e,{input:n}=t,r=a.data.get(n.dataId).complexTensorInfos.imag,l=a.data.get(r.dataId).values;return a.makeTensorInfo(r.shape,r.dtype,l)}let ed={kernelName:n.J_u,backendName:"cpu",kernelFunc:imag};var ep=a(80748);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concat(e){let{inputs:t,backend:a,attrs:r}=e,{axis:l}=r,o=n.D5U.parseAxisParam(l,t[0].shape)[0],s=t.map(e=>e.shape);n.backend_util.assertParamsConsistent(s,o);let i=n.backend_util.computeOutShape(t.map(e=>e.shape),o);if(0===n.D5U.sizeFromShape(i))return a.makeTensorInfo(i,t[0].dtype,[]);let d=t.filter(e=>n.D5U.sizeFromShape(e.shape)>0);if(1===d.length)return(0,u.y)({inputs:{x:d[0]},backend:a});if("complex64"===d[0].dtype){let e=d.map(e=>(0,ep.k)({inputs:{input:e},backend:a})),t=d.map(e=>imag({inputs:{input:e},backend:a})),n=concat({inputs:e,backend:a,attrs:{axis:o}}),r=concat({inputs:t,backend:a,attrs:{axis:o}}),l=(0,es.P)({inputs:{real:n,imag:r},backend:a});return e.forEach(e=>a.disposeIntermediateTensorInfo(e)),t.forEach(e=>a.disposeIntermediateTensorInfo(e)),a.disposeIntermediateTensorInfo(n),a.disposeIntermediateTensorInfo(r),l}let p=d.map(e=>{let t=n.D5U.sizeFromShape(e.shape.slice(o));return reshape({inputs:{x:e},backend:a,attrs:{shape:[-1,t]}})}),c=p.map(e=>({vals:a.data.get(e.dataId).values,shape:e.shape}));i=n.backend_util.computeOutShape(p.map(e=>e.shape),1);let h=1===p[0].shape[0],f=(0,eu.j)(c,i,t[0].dtype,h),m=n.backend_util.computeOutShape(d.map(e=>e.shape),o),k=a.makeTensorInfo(m,t[0].dtype,f);return p.forEach(e=>a.disposeIntermediateTensorInfo(e)),k}let ec={kernelName:n.Eh3,backendName:"cpu",kernelFunc:concat};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function conv2D(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,filter:s}=t,{strides:i,pad:u,dataFormat:d,dilations:p,dimRoundingMode:c}=l;(0,r.H)([o,s],"conv2d");let h=n.backend_util.convertConv2DDataFormat(d),f=n.backend_util.computeConv2DInfo(o.shape,s.shape,i,p,u,c,!1,h),m=f.filterHeight,k=f.filterWidth,g=f.dilationHeight,I=f.dilationWidth,y=f.padInfo.left,b=f.padInfo.top,v="channelsLast"===f.dataFormat,x=new n.YDk(f.outShape,o.dtype),N=n.D5U.computeStrides(o.shape),D=n.D5U.computeStrides(s.shape),S=N[0],T=v?N[1]:N[2],F=v?N[2]:1,M=v?1:N[1],w=x.strides[0],A=v?x.strides[1]:x.strides[2],U=v?x.strides[2]:1,_=v?1:x.strides[1],H=a.data.get(o.dataId).values,E=a.data.get(s.dataId).values,z=x.values;for(let e=0;e<f.batchSize;++e){let t=e*S,a=e*w;for(let e=0;e<f.outHeight;++e){let n=a+e*A,r=e*f.strideHeight-b;for(let e=0;e<m;++e){let a=r+e*g;if(a<0||a>=f.inHeight)continue;let l=e*D[0],o=t+a*T;for(let e=0;e<f.outWidth;++e){let t=n+e*U,a=e*f.strideWidth-y;for(let e=0;e<k;++e){let n=a+e*I;if(n<0||n>=f.inWidth)continue;let r=l+e*D[1],s=o+n*F,i=r;for(let e=0;e<f.inChannels;++e){let a=H[s+e*M];for(let e=0;e<f.outChannels;++e)z[t+e*_]+=a*E[i+e];i+=f.outChannels}}}}}}return a.makeTensorInfo(x.shape,x.dtype,z)}let eh={kernelName:n.mhS,backendName:"cpu",kernelFunc:conv2D},ef={kernelName:n.wUP,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,dy:s}=t,{strides:i,pad:u,dataFormat:d,dimRoundingMode:p,filterShape:c}=l;(0,r.H)([o,s],"conv2dBackpropFilter");let h=n.backend_util.convertConv2DDataFormat(d),f=n.backend_util.computeConv2DInfo(o.shape,c,i,1,u,p,!1,h),{strideHeight:m,strideWidth:k,filterHeight:g,filterWidth:I}=f,y="channelsLast"===f.dataFormat,b=new n.YDk(f.filterShape,"float32"),v=f.padInfo.left,x=f.padInfo.top,N=a.data.get(o.dataId).values,D=a.data.get(s.dataId).values,S=new n.YDk(o.shape,o.dtype,N),T=new n.YDk(s.shape,s.dtype,D);for(let e=0;e<g;++e){let t=Math.max(0,Math.ceil((x-e)/m)),a=Math.min(f.outHeight,(f.inHeight+x-e)/m);for(let n=0;n<I;++n){let r=Math.max(0,Math.ceil((v-n)/k)),l=Math.min(f.outWidth,(f.inWidth+v-n)/k);for(let o=0;o<f.inChannels;++o)for(let s=0;s<f.outChannels;++s){let i=0;for(let u=0;u<f.batchSize;++u)for(let d=t;d<a;++d){let t=e+d*m-x;for(let e=r;e<l;++e){let a=n+e*k-v;y?i+=S.get(u,t,a,o)*T.get(u,d,e,s):i+=S.get(u,o,t,a)*T.get(u,s,d,e)}}b.set(i,e,n,o,s)}}}return a.makeTensorInfo(b.shape,b.dtype,b.values)}},em={kernelName:n.wm,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,filter:s}=t,{inputShape:i,strides:u,pad:d,dataFormat:p,dimRoundingMode:c}=l;(0,r.H)([o,s],"conv2dBackpropInput");let h=n.D5U.computeStrides(s.shape),f=n.D5U.computeStrides(o.shape),m=n.backend_util.convertConv2DDataFormat(p),k=n.backend_util.computeConv2DInfo(i,s.shape,u,1,d,c,!1,m),g=new n.YDk(k.inShape,"float32"),I=g.values,y=a.data.get(o.dataId).values,b=a.data.get(s.dataId).values,[v,x,N]=h,{batchSize:D,filterHeight:S,filterWidth:T,inChannels:F,inHeight:M,inWidth:w,outChannels:A,outHeight:U,outWidth:_,strideHeight:H,strideWidth:E}=k;m=k.dataFormat;let z=S-1-k.padInfo.top,P=T-1-k.padInfo.left,C="channelsLast"===m,$=g.strides[0],W=C?g.strides[1]:g.strides[2],R=C?g.strides[2]:1,V=C?1:g.strides[1],Z=f[0],O=C?f[1]:f[2],j=C?f[2]:1,G=C?1:f[1];for(let e=0;e<D;++e)for(let t=0;t<F;++t)for(let a=0;a<M;++a){let n=a-z,r=Math.max(0,Math.ceil(n/H)),l=Math.min(U,(S+n)/H);for(let o=0;o<w;++o){let s=o-P,i=Math.max(0,Math.ceil(s/E)),u=Math.min(_,(T+s)/E),d=0;for(let a=r;a<l;++a){let r=a*H-n;for(let n=i;n<u;++n){let l=n*E-s,o=Z*e+O*a+j*n,i=v*(S-1-r)+x*(T-1-l)+N*t;for(let e=0;e<A;++e){let t=y[o+G*e],a=b[i+e];d+=t*a}}}let p=$*e+W*a+R*o+V*t;I[p]=d}}return a.makeTensorInfo(g.shape,g.dtype,g.values)}},ek={kernelName:n.x12,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,filter:s}=t,{strides:i,pad:u,dilations:d}=l;(0,r.H)([o,s],"conv3d");let p=n.backend_util.computeConv3DInfo(o.shape,s.shape,i,d,u),{filterDepth:c,filterHeight:h,filterWidth:f,dilationDepth:m,dilationHeight:k,dilationWidth:g,padInfo:I}=p,y=I.front,b=I.left,v=I.top,x=new n.YDk(p.outShape,o.dtype),N=a.data.get(o.dataId).values,D=a.data.get(s.dataId).values,S=x.values,T=n.D5U.computeStrides(o.shape),F=n.D5U.computeStrides(s.shape);for(let e=0;e<p.batchSize;++e){let t=e*T[0],a=e*x.strides[0];for(let e=0;e<p.outDepth;++e){let n=a+e*x.strides[1],r=e*p.strideDepth-y;for(let e=0;e<c;++e){let a=r+e*m;if(a<0||a>=p.inDepth)continue;let l=e*F[0],o=t+a*T[1];for(let e=0;e<p.outHeight;++e){let t=n+e*x.strides[2],a=e*p.strideHeight-v;for(let e=0;e<h;++e){let n=a+e*k;if(n<0||n>=p.inHeight)continue;let r=l+e*F[1],s=o+n*T[2];for(let e=0;e<p.outWidth;++e){let a=t+e*p.outChannels,n=e*p.strideWidth-b;for(let e=0;e<f;++e){let t=n+e*g;if(t<0||t>=p.inWidth)continue;let l=r+e*F[2],o=s+t*p.inChannels,i=l;for(let e=0;e<p.inChannels;++e){let t=N[o+e];for(let e=0;e<p.outChannels;++e)S[a+e]+=t*D[i+e];i+=p.outChannels}}}}}}}}return a.makeTensorInfo(x.shape,x.dtype,x.values)}},eg={kernelName:n.o2y,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,dy:s}=t,{strides:i,pad:u,filterShape:d}=l;(0,r.H)([o,s],"conv3dBackpropFilterV2");let p=n.D5U.computeStrides(o.shape),c=n.D5U.computeStrides(s.shape),h=n.backend_util.computeConv3DInfo(o.shape,d,i,1,u),f=h.strideDepth,m=h.strideHeight,k=h.strideWidth,g=h.filterDepth,I=h.filterHeight,y=h.filterWidth,b=new n.YDk(h.filterShape,"float32"),v=b.values,[x,N,D,S]=b.strides,T=a.data.get(s.dataId).values,[F,M,w,A]=c,U=a.data.get(o.dataId).values,[_,H,E,z]=p,P=h.padInfo.front,C=h.padInfo.left,$=h.padInfo.top;for(let e=0;e<g;++e){let t=Math.max(0,Math.ceil((P-e)/f)),a=Math.min(h.outDepth,(h.inDepth+P-e)/f),n=e*x;for(let r=0;r<I;++r){let l=Math.max(0,Math.ceil(($-r)/m)),o=Math.min(h.outHeight,(h.inHeight+$-r)/m),s=r*N+n;for(let n=0;n<y;++n){let i=Math.max(0,Math.ceil((C-n)/k)),u=Math.min(h.outWidth,(h.inWidth+C-n)/k),d=n*D+s;for(let s=0;s<h.inChannels;++s){let p=s*S+d;for(let d=0;d<h.outChannels;++d){let c=0;for(let p=0;p<h.batchSize;++p){let h=p*_,g=p*F;for(let p=t;p<a;++p){let t=e+p*f-P,a=t*H+h,I=p*M+g;for(let e=l;e<o;++e){let t=r+e*m-$,l=t*E+a,o=e*w+I;for(let e=i;e<u;++e){let t=n+e*k-C,a=t*z+l,r=e*A+o;c+=U[a+s]*T[r+d]}}}}v[p+d]=c}}}}}return a.makeTensorInfo(b.shape,b.dtype,b.values)}},eI={kernelName:n.ik2,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,filter:s}=t,{pad:i,strides:u,inputShape:d}=l;(0,r.H)([o],"conv3dBackpropInputV2");let p=n.D5U.computeStrides(o.shape),c=n.D5U.computeStrides(s.shape),h=n.backend_util.computeConv3DInfo(d,s.shape,u,1,i),f=new n.YDk(h.inShape,"float32"),m=f.values,[k,g,I,y]=f.strides,b=a.data.get(o.dataId).values,[v,x,N,D]=p,S=a.data.get(s.dataId).values,[T,F,M,w]=c,{batchSize:A,filterDepth:U,filterHeight:_,filterWidth:H,inChannels:E,inDepth:z,inHeight:P,inWidth:C,outChannels:$,outDepth:W,outHeight:R,outWidth:V,strideDepth:Z,strideHeight:O,strideWidth:j}=h,G=U-1-h.padInfo.front,q=_-1-h.padInfo.top,B=H-1-h.padInfo.left;for(let e=0;e<A;++e)for(let t=0;t<E;++t)for(let a=0;a<z;++a){let n=a-G,r=Math.max(0,Math.ceil(n/Z)),l=Math.min(W,(U+n)/Z);for(let o=0;o<P;++o){let s=o-q,i=Math.max(0,Math.ceil(s/O)),u=Math.min(R,(_+s)/O);for(let d=0;d<C;++d){let p=d-B,c=Math.max(0,Math.ceil(p/j)),h=Math.min(V,(H+p)/j),f=0;for(let a=r;a<l;++a){let r=a*Z-n;for(let n=i;n<u;++n){let l=n*O-s;for(let o=c;o<h;++o){let s=o*j-p,i=v*e+x*a+N*n+D*o,u=T*(U-1-r)+F*(_-1-l)+M*(H-1-s)+w*t;for(let e=0;e<$;++e){let t=b[i+e],a=S[u+e];f+=t*a}}}}m[k*e+g*a+I*o+y*d+t]=f}}}return a.makeTensorInfo(f.shape,f.dtype,f.values)}},ey=(0,o.A)(n.mc4,e=>Math.cos(e)),eb={kernelName:n.mc4,backendName:"cpu",kernelFunc:ey},ev=(0,o.A)(n.TR1,e=>Math.cosh(e)),ex={kernelName:n.TR1,backendName:"cpu",kernelFunc:ev},eN={kernelName:n.VcC,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{image:l,boxes:o,boxInd:s}=t,{cropSize:i,method:u,extrapolationValue:d}=r,[p,c,h,f]=l.shape,m=o.shape[0],[k,g]=i,I=(0,n.f3b)([m,k,g,f],"float32"),y=a.data.get(o.dataId).values,b=a.data.get(s.dataId).values,v=a.data.get(l.dataId).values,x=n.D5U.computeStrides(l.shape),N=n.D5U.computeStrides(I.shape);for(let e=0;e<m;e++){let t=4*e,a=y[t],n=y[t+1],r=y[t+2],l=y[t+3],o=b[e];if(o>=p)continue;let s=k>1?(r-a)*(c-1)/(k-1):0,i=g>1?(l-n)*(h-1)/(g-1):0;for(let t=0;t<k;t++){let p=k>1?a*(c-1)+t*s:.5*(a+r)*(c-1);if(p<0||p>c-1){for(let a=0;a<g;a++)for(let n=0;n<f;n++){let r=n+a*N[2]+t*N[1]+e*N[0];I.values[r]=d}continue}if("bilinear"===u){let a=Math.floor(p),r=Math.ceil(p),s=p-a;for(let u=0;u<g;u++){let p=g>1?n*(h-1)+u*i:.5*(n+l)*(h-1);if(p<0||p>h-1){for(let a=0;a<f;a++){let n=a+u*N[2]+t*N[1]+e*N[0];I.values[n]=d}continue}let c=Math.floor(p),m=Math.ceil(p),k=p-c;for(let n=0;n<f;n++){let l=n+c*x[2]+a*x[1]+o*x[0],i=v[l];l=n+m*x[2]+a*x[1]+o*x[0];let d=v[l];l=n+c*x[2]+r*x[1]+o*x[0];let p=v[l];l=n+m*x[2]+r*x[1]+o*x[0];let h=v[l],f=i+(d-i)*k,g=p+(h-p)*k;l=n+u*N[2]+t*N[1]+e*N[0],I.values[l]=f+(g-f)*s}}}else for(let a=0;a<g;++a){let r=g>1?n*(h-1)+a*i:.5*(n+l)*(h-1);if(r<0||r>h-1){for(let n=0;n<f;n++){let r=n+a*N[2]+t*N[1]+e*N[0];I.values[r]=d}continue}let s=Math.round(r),u=Math.round(p);for(let n=0;n<f;n++){let r=n+s*x[2]+u*x[1]+o*x[0],l=n+a*N[2]+t*N[1]+e*N[0];I.values[l]=v[r]}}}}return a.makeTensorInfo(I.shape,I.dtype,I.values)}},eD={kernelName:n.Byc,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s,exclusive:i,reverse:u}=l;(0,r.H)(o,"cumprod");let d=n.backend_util.getAxesPermutation([s],o.shape.length),p=o;null!=d&&(p=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:d}}));let c=n.backend_util.getInnerMostAxes(1,o.shape.length)[0];if(c!==p.shape.length-1)throw Error(`backend.cumprod in CPU expects an inner-most axis=${p.shape.length-1} but got axis=${c}`);let h=(0,n.x8V)(p.dtype,"int32"),f=n.D5U.makeOnesTypedArray(n.D5U.sizeFromShape(p.shape),h),m=a.data.get(p.dataId).values,k=p.shape[p.shape.length-1],g=u?(e,t)=>e+k-t-1:(e,t)=>e+t;for(let e=0;e<m.length;e+=k)for(let t=0;t<k;t++){let a=g(e,t);if(0===t)f[a]=i?1:m[a];else{let n=g(e,t-1);f[a]=i?m[n]*f[n]:m[a]*f[n]}}let I=a.makeTensorInfo(p.shape,h,f);if(null!=d){let e=n.backend_util.getUndoAxesPermutation(d),t=(0,w.p)({inputs:{x:I},backend:a,attrs:{perm:e}});return a.disposeIntermediateTensorInfo(I),a.disposeIntermediateTensorInfo(p),t}return I}},eS={kernelName:n.iHb,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s,exclusive:i,reverse:u}=l;(0,r.H)(o,"cumsum");let d=n.backend_util.getAxesPermutation([s],o.shape.length),p=o;null!=d&&(p=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:d}}));let c=n.backend_util.getInnerMostAxes(1,o.shape.length)[0];if(c!==p.shape.length-1)throw Error(`backend.cumsum in CPU expects an inner-most axis=${p.shape.length-1} but got axis=${c}`);let h=(0,n.x8V)(p.dtype,"int32"),f=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(p.shape),h),m=a.data.get(p.dataId).values,k=p.shape[p.shape.length-1],g=u?(e,t)=>e+k-t-1:(e,t)=>e+t;for(let e=0;e<m.length;e+=k)for(let t=0;t<k;t++){let a=g(e,t);if(0===t)f[a]=i?0:m[a];else{let n=g(e,t-1);f[a]=i?m[n]+f[n]:m[a]+f[n]}}let I=a.makeTensorInfo(p.shape,h,f);if(null!=d){let e=n.backend_util.getUndoAxesPermutation(d),t=(0,w.p)({inputs:{x:I},backend:a,attrs:{perm:e}});return a.disposeIntermediateTensorInfo(I),a.disposeIntermediateTensorInfo(p),t}return I}},eT={kernelName:n.QRR,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:r,weights:l}=t,{size:o,binaryOutput:s}=n;if(1===r.shape.length){let e=a.data.get(r.dataId).values,t=a.data.get(l.dataId).values,n=(0,J.W)(e,t,l.dtype,l.shape,o);return a.makeTensorInfo([o],l.dtype,n)}if(2===r.shape.length){let e=a.bufferSync(r),t=a.bufferSync(l),n=(0,J.i)(e,t,o,s);return a.makeTensorInfo(n.shape,l.dtype,n.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${r.shape.length}.`)}},eF={kernelName:n.T0n,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{x:l}=t,{blockSize:o,dataFormat:s}=r;n.D5U.assert("NHWC"===s,()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${s}`);let i=l.shape[0],u=l.shape[1],d=l.shape[2],p=l.shape[3],c=u*o,h=d*o,f=p/(o*o),m=a.data.get(l.dataId).values,k=new Float32Array(i*c*h*f),g=0;for(let e=0;e<i;++e)for(let t=0;t<c;++t){let a=Math.floor(t/o),n=t%o;for(let t=0;t<h;++t){let r=Math.floor(t/o),l=t%o,s=(n*o+l)*f;for(let t=0;t<f;++t){let n=t+s,l=n+p*(r+d*(a+u*e));k[g++]=m[l]}}}return a.makeTensorInfo([i,c,h,f],l.dtype,k)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function depthwiseConv2dNative(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,filter:s}=t,{strides:i,pad:u,dilations:d,dimRoundingMode:p}=l;(0,r.H)([o,s],"depthwiseConv2DNative");let c=n.D5U.computeStrides(o.shape),h=n.D5U.computeStrides(s.shape),f=d;null==f&&(f=[1,1]),n.D5U.assert(n.backend_util.eitherStridesOrDilationsAreOne(i,f),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${f}'`);let m=n.backend_util.computeConv2DInfo(o.shape,s.shape,i,f,u,p,!0),{filterHeight:k,filterWidth:g,dilationHeight:I,dilationWidth:y,padInfo:b}=m,v=b.left,x=b.top,N=m.outChannels/m.inChannels,D=new n.YDk(m.outShape,o.dtype),S=a.data.get(o.dataId).values,T=a.data.get(s.dataId).values,F=D.values;for(let e=0;e<m.batchSize;++e){let t=e*c[0],a=e*D.strides[0];for(let e=0;e<m.outHeight;++e){let n=a+e*D.strides[1],r=e*m.strideHeight-x;for(let e=0;e<k;++e){let a=r+e*I;if(a<0||a>=m.inHeight)continue;let l=e*h[0],o=t+a*c[1];for(let e=0;e<m.outWidth;++e){let t=n+e*D.strides[2],a=e*m.strideWidth-v;for(let e=0;e<g;++e){let n=a+e*y;if(n<0||n>=m.inWidth)continue;let r=l+e*h[1],s=o+n*m.inChannels,i=t,u=r;for(let e=0;e<m.inChannels;++e){let t=S[s+e];for(let e=0;e<N;++e)F[i+e]+=t*T[u+e];i+=N,u+=N}}}}}}return a.makeTensorInfo(D.shape,D.dtype,D.values)}let eM={kernelName:n.cie,backendName:"cpu",kernelFunc:depthwiseConv2dNative},ew={kernelName:n.sL$,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,dy:s}=t,{strides:i,dilations:u,pad:d,dimRoundingMode:p,filterShape:c}=l;(0,r.H)([o,s],"depthwiseConv2dNativeBackpropFilter");let h=n.backend_util.computeConv2DInfo(o.shape,c,i,u,d,p,!0),{strideHeight:f,strideWidth:m,filterHeight:k,filterWidth:g}=h,I=new n.YDk(h.filterShape,"float32"),y=h.padInfo.left,b=h.padInfo.top,v=h.outChannels/h.inChannels,x=a.data.get(o.dataId).values,N=new n.YDk(o.shape,o.dtype,x),D=a.data.get(s.dataId).values,S=new n.YDk(s.shape,s.dtype,D);for(let e=0;e<k;++e){let t=Math.max(0,Math.ceil((b-e)/f)),a=Math.min(h.outHeight,(h.inHeight+b-e)/f);for(let n=0;n<g;++n){let r=Math.max(0,Math.ceil((y-n)/m)),l=Math.min(h.outWidth,(h.inWidth+y-n)/m);for(let o=0;o<h.outChannels;++o){let s=Math.trunc(o/v),i=o%v,u=0;for(let i=0;i<h.batchSize;++i)for(let d=t;d<a;++d){let t=e+d*f-b;for(let e=r;e<l;++e){let a=n+e*m-y;u+=N.get(i,t,a,s)*S.get(i,d,e,o)}}I.set(u,e,n,s,i)}}}return a.makeTensorInfo(I.shape,I.dtype,I.values)}},eA={kernelName:n.y7R,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,filter:s}=t,{strides:i,dilations:u,pad:d,dimRoundingMode:p,inputShape:c}=l;(0,r.H)([o,s],"depthwiseConv2DNativeBackpropInput");let h=n.D5U.computeStrides(o.shape),f=n.D5U.computeStrides(s.shape),m=n.backend_util.computeConv2DInfo(c,s.shape,i,u,d,p,!0),k=new n.YDk(m.inShape,"float32"),g=k.values,[I,y,b]=k.strides,v=a.data.get(o.dataId).values,[x,N,D]=h,S=a.data.get(s.dataId).values,[T,F,M]=f,{batchSize:w,filterHeight:A,filterWidth:U,inChannels:_,inHeight:H,inWidth:E,outChannels:z,outHeight:P,outWidth:C,strideHeight:$,strideWidth:W}=m,R=A-1-m.padInfo.top,V=U-1-m.padInfo.left,Z=z/_;for(let e=0;e<w;++e)for(let t=0;t<_;++t)for(let a=0;a<H;++a){let n=a-R,r=Math.max(0,Math.ceil(n/$)),l=Math.min(P,(A+n)/$);for(let o=0;o<E;++o){let s=o-V,i=Math.max(0,Math.ceil(s/W)),u=Math.min(C,(U+s)/W),d=0;for(let a=r;a<l;++a){let r=a*$-n;for(let n=i;n<u;++n){let l=n*W-s,o=x*e+N*a+D*n,i=T*(A-1-r)+F*(U-1-l)+M*t;for(let e=0;e<Z;++e){let a=t*Z+e,n=v[o+a],r=S[i+e];d+=n*r}}}g[I*e+y*a+b*o+t]=d}}return a.makeTensorInfo(k.shape,k.dtype,k.values)}},eU={kernelName:n.$w,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{x:r}=t,l=n.D5U.sizeFromShape(r.shape),o=a.data.get(r.dataId).values,s=(0,n.f3b)([l,l],r.dtype),i=s.values;for(let e=0;e<o.length;e++)i[e*l+e]=o[e];let u=[...r.shape,...r.shape];return a.makeTensorInfo(u,s.dtype,s.values)}},e_={kernelName:n.p4S,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:a})=>{let{x:r,filter:l}=e,{strides:o,pad:s,dilations:i}=a,u=t.data.get(r.dataId).values,d=r.shape.length,p=t.data.get(l.dataId).values,c=l.shape.length,{batchSize:h,inHeight:f,inWidth:m,inChannels:k,outHeight:g,outWidth:I,padInfo:y,strideHeight:b,strideWidth:v,filterHeight:x,filterWidth:N,dilationHeight:D,dilationWidth:S,outShape:T}=n.backend_util.computeDilation2DInfo(r.shape,l.shape,o,s,"NHWC",i),F=n.D5U.sizeFromShape(T),M=T.length,w=n.D5U.getArrayFromDType(r.dtype,F);for(let e=0;e<h;++e)for(let t=0;t<g;++t){let a=t*b-y.top;for(let o=0;o<I;++o){let s=o*v-y.left;for(let i=0;i<k;++i){let h=Number.MIN_SAFE_INTEGER;for(let t=0;t<x;++t){let o=a+t*D;if(o>=0&&o<f)for(let a=0;a<N;++a){let f=s+a*S;if(f>=0&&f<m){let s=n.D5U.locToIndex([e,o,f,i],d,n.D5U.computeStrides(r.shape)),m=n.D5U.locToIndex([t,a,i],c,n.D5U.computeStrides(l.shape)),k=u[s]+p[m];k>h&&(h=k)}}}let k=n.D5U.locToIndex([e,t,o,i],M,n.D5U.computeStrides(T));w[k]=h}}}let A=t.write(n.D5U.toTypedArray(w,r.dtype),T,r.dtype);return{dataId:A,shape:T,dtype:r.dtype}}},eH={kernelName:n.Vn9,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:a})=>{let{x:r,filter:l,dy:o}=e,{strides:s,pad:i,dilations:u}=a,d=n.D5U.toNestedArray(r.shape,t.data.get(r.dataId).values),p=n.D5U.toNestedArray(l.shape,t.data.get(l.dataId).values),{batchSize:c,inHeight:h,inWidth:f,inChannels:m,outHeight:k,outWidth:g,padInfo:I,strideHeight:y,strideWidth:b,filterHeight:v,filterWidth:x,dilationHeight:N,dilationWidth:D,outShape:S}=n.backend_util.computeDilation2DInfo(r.shape,l.shape,s,i,"NHWC",u);n.D5U.assert(o.rank===S.length,()=>`Error in ${n.Vn9}, dy must have the same rank as output ${S.length}, but got ${o.rank}`);let T=n.D5U.toNestedArray(S,t.data.get(o.dataId).values),F=n.D5U.makeZerosNestedTypedArray(l.shape,l.dtype);for(let e=0;e<c;++e)for(let t=0;t<k;++t){let a=t*y-I.top;for(let n=0;n<g;++n){let r=n*b-I.left;for(let l=0;l<m;++l){let o=Number.MIN_SAFE_INTEGER,s=0,i=0;for(let t=0;t<v;++t){let n=a+t*N;if(n>=0&&n<h)for(let a=0;a<x;++a){let u=r+a*D;if(u>=0&&u<f){let r=d[e][n][u][l]+p[t][a][l];r>o&&(o=r,s=t,i=a)}}}F[s][i][l]+=T[e][t][n][l]}}}let M=t.write(n.D5U.toTypedArray(F,r.dtype),l.shape,l.dtype);return{dataId:M,shape:l.shape,dtype:l.dtype}}},eE={kernelName:n.ekb,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:a})=>{let{x:r,filter:l,dy:o}=e,{strides:s,pad:i,dilations:u}=a,d=n.D5U.toNestedArray(r.shape,t.data.get(r.dataId).values),p=n.D5U.toNestedArray(l.shape,t.data.get(l.dataId).values),{batchSize:c,inHeight:h,inWidth:f,inChannels:m,outHeight:k,outWidth:g,padInfo:I,strideHeight:y,strideWidth:b,filterHeight:v,filterWidth:x,dilationHeight:N,dilationWidth:D,outShape:S}=n.backend_util.computeDilation2DInfo(r.shape,l.shape,s,i,"NHWC",u);n.D5U.assert(o.rank===S.length,()=>`Error in ${n.ekb}, dy must have the same rank as output ${S.length}, but got ${o.rank}`);let T=n.D5U.toNestedArray(S,t.data.get(o.dataId).values),F=n.D5U.makeZerosNestedTypedArray(r.shape,r.dtype);for(let e=0;e<c;++e)for(let t=0;t<k;++t){let a=t*y-I.top;for(let n=0;n<g;++n){let r=n*b-I.left;for(let l=0;l<m;++l){let o=Number.MIN_SAFE_INTEGER,s=a<0?0:a,i=r<0?0:r;for(let t=0;t<v;++t){let n=a+t*N;if(n>=0&&n<h)for(let a=0;a<x;++a){let u=r+a*D;if(u>=0&&u<f){let r=d[e][n][u][l]+p[t][a][l];r>o&&(o=r,s=n,i=u)}}}F[e][s][i][l]+=T[e][t][n][l]}}}let M=t.write(n.D5U.toTypedArray(F,r.dtype),r.shape,r.dtype);return{dataId:M,shape:r.shape,dtype:r.dtype}}},ez={kernelName:n.hGc,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{image:r}=t,{canvas:l,options:o}=n,{contextOptions:s,imageOptions:i}=o||{},u=(null==i?void 0:i.alpha)||1,d=(null==s?void 0:s.contextType)||"2d";if("2d"!==d)throw Error(`Context type ${s.contextType} is not supported by the CPU backend.`);let p=l.getContext(d,(null==s?void 0:s.contextAttributes)||{});if(null==p)throw Error(`Could not get the context with ${d} type.`);let[c,h]=r.shape.slice(0,2),f=2===r.shape.length?1:r.shape[2],m=a.data.get(r.dataId).values,k="float32"===r.dtype?255:1,g=new Uint8ClampedArray(h*c*4);for(let e=0;e<c*h;++e){let t=[0,0,0,255*u];for(let a=0;a<f;a++){let n=m[e*f+a];if("float32"===r.dtype){if(n<0||n>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${n}.`)}else if("int32"===r.dtype&&(n<0||n>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${n}.`);1===f?(t[0]=n*k,t[1]=n*k,t[2]=n*k):t[a]=n*k}let a=4*e;g[a+0]=Math.round(t[0]),g[a+1]=Math.round(t[1]),g[a+2]=Math.round(t[2]),g[a+3]=Math.round(t[3])}l.width=h,l.height=c;let I=new ImageData(g,h,c);return p.putImageData(I,0,0),r}};var eP=a(29556),eC=a(34258);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sum(e){let t;let{inputs:a,backend:l,attrs:o}=e,{x:s}=a,{axis:i,keepDims:d}=o;(0,r.H)(s,"sum"),t="bool"===s.dtype?(0,en.pj)({inputs:{x:s},backend:l,attrs:{dtype:"int32"}}):(0,u.y)({inputs:{x:s},backend:l});let p=t.shape.length,c=n.D5U.parseAxisParam(i,t.shape),h=n.backend_util.getAxesPermutation(c,p),f=c,m=t;null!=h&&(m=(0,w.p)({inputs:{x:t},backend:l,attrs:{perm:h}}),f=n.backend_util.getInnerMostAxes(f.length,p)),n.backend_util.assertAxesAreInnerMostDims("sum",f,m.shape.length);let[k,g]=n.backend_util.computeOutAndReduceShapes(m.shape,f),I=n.backend_util.upcastType(m.dtype,"int32"),y=(0,eC.l)(l,k,I),b=n.D5U.sizeFromShape(g),v=l.data.get(y.dataId).values,x=l.data.get(m.dataId).values;for(let e=0;e<v.length;++e){let t=e*b,a=0;for(let e=0;e<b;++e)a+=x[t+e];v[e]=a}if(d){let e=n.backend_util.expandShapeToKeepDim(y.shape,c),t=y;y=reshape({inputs:{x:y},backend:l,attrs:{shape:e}}),l.disposeIntermediateTensorInfo(t)}return l.disposeIntermediateTensorInfo(t),null!=h&&l.disposeIntermediateTensorInfo(m),y}let e$={kernelName:n.GBy,backendName:"cpu",kernelFunc:sum},eW={kernelName:n.$g6,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{equation:l}=r,{allDims:o,summedDims:s,idDims:i}=n.backend_util.decodeEinsumEquation(l,t.length);n.backend_util.checkEinsumDimSizes(o.length,i,t);let{path:u,steps:d}=n.backend_util.getEinsumComputePath(s,i),p=d.length,c=null,h=o.length,f=[];for(let e=0;e<p;++e){for(let r of d[e]){let e;let{permutationIndices:l,expandDims:o}=n.backend_util.getEinsumPermutation(h,i[r]);n.backend_util.isIdentityPermutation(l)?e=t[r]:(e=(0,w.p)({inputs:{x:t[r]},backend:a,attrs:{perm:l}}),f.push(e));let s=e.shape.slice();for(let e=0;e<o.length;++e)s.splice(o[e],0,1);n.D5U.arraysEqual(e.shape,s)||(e=reshape({inputs:{x:e},backend:a,attrs:{shape:s}}),f.push(e)),null===c?c=e:(c=(0,eP.Jp)({inputs:{a:e,b:c},backend:a}),f.push(c))}e<p-1&&(u[e]>=0&&(c=sum({inputs:{x:c},backend:a,attrs:{axis:u[e]-(o.length-h),keepDims:!1}}),f.push(c)),h--)}for(let e of f)e!==c&&a.disposeIntermediateTensorInfo(e);return c}},eR={kernelName:n.HEU,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{dy:l,y:o}=t;(0,r.H)([l,o],"eluGrad");let s=new Float32Array(n.D5U.sizeFromShape(o.shape)),i=a.data.get(o.dataId).values,u=a.data.get(l.dataId).values;for(let e=0;e<i.length;++e){let t=i[e];t>=0?s[e]=u[e]:s[e]=u[e]*(t+1)}return a.makeTensorInfo(o.shape,"float32",s)}};var eV=a(30339);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let eZ=n.backend_util.ERF_P,eO=n.backend_util.ERF_A1,ej=n.backend_util.ERF_A2,eG=n.backend_util.ERF_A3,eq=n.backend_util.ERF_A4,eB=n.backend_util.ERF_A5,eL=(0,o.A)(n.Omj,e=>{let t=Math.sign(e),a=Math.abs(e),n=1/(1+eZ*a);return t*(1-((((eB*n+eq)*n+eG)*n+ej)*n+eO)*n*Math.exp(-a*a))}),eY={kernelName:n.Omj,backendName:"cpu",kernelFunc:eL};var eX=a(86130);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function expandDims(e){let{inputs:t,backend:a,attrs:r}=e,{input:l}=t,{dim:o}=r,s=l.shape.length,i=l.shape.slice(),u=o;return o<0&&(n.D5U.assert(-(s+1)<=o,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+o+1),i.splice(u,0,1),reshape({inputs:{x:l},backend:a,attrs:{shape:i}})}let eK={kernelName:n.YFo,backendName:"cpu",kernelFunc:expandDims};var eQ=a(78819);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let eJ=(0,p.b)((e,t)=>e/t),e0=(0,R.j)(n.oHH,eJ),e1={kernelName:n.oHH,backendName:"cpu",kernelFunc:e0};var e2=a(27262);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fftBatch(e,t,a){let r=e.shape,l=r[0],o=r[1],s=a.data.get(e.dataId),i=s.complexTensorInfos.real,d=s.complexTensorInfos.imag,p=[l,o],c=n.D5U.sizeFromShape(p),h=n.D5U.getTypedArrayFromDType("float32",c),f=n.D5U.getTypedArrayFromDType("float32",c);for(let e=0;e<l;e++){let r=(0,K.tP)({inputs:{x:i},backend:a,attrs:{begin:[e,0],size:[1,o]}}),l=(0,K.tP)({inputs:{x:d},backend:a,attrs:{begin:[e,0],size:[1,o]}}),s=(0,es.P)({inputs:{real:r,imag:l},backend:a}),{real:p,imag:c}=function(e,t,a){let r=n.D5U.sizeFromShape(e.shape),l=a.data.get(e.dataId),o=a.data.get(l.complexTensorInfos.real.dataId).values,s=a.data.get(l.complexTensorInfos.imag.dataId).values;if((r&r-1)==0){let l=function fftRadix2(e,t,a,r,l){if(1===a)return{real:e,imag:t};let o=n.backend_util.mergeRealAndImagArrays(e,t),s=a/2,i=n.backend_util.complexWithEvenIndex(o),u=i.real,d=i.imag,p=[u.length],c=l.makeTensorInfo(p,"float32",u),h=l.makeTensorInfo(p,"float32",d),f=(0,es.P)({inputs:{real:c,imag:h},backend:l}),m=n.backend_util.complexWithOddIndex(o),k=m.real,g=m.imag,I=[k.length],b=l.makeTensorInfo(I,"float32",k),v=l.makeTensorInfo(I,"float32",g),x=(0,es.P)({inputs:{real:b,imag:v},backend:l}),N=fftRadix2(u,d,s,r,l),D=N.real,S=N.imag,T=[D.length],F=l.makeTensorInfo(T,"float32",D),M=l.makeTensorInfo(T,"float32",S),w=(0,es.P)({inputs:{real:F,imag:M},backend:l}),A=fftRadix2(k,g,s,r,l),U=A.real,_=A.imag,H=[U.length],E=l.makeTensorInfo(H,"float32",U),z=l.makeTensorInfo(H,"float32",_),P=(0,es.P)({inputs:{real:E,imag:z},backend:l}),C=n.backend_util.exponents(a,r),$=[C.real.length],W=l.makeTensorInfo($,"float32",C.real),R=l.makeTensorInfo($,"float32",C.imag),V=(0,es.P)({inputs:{real:W,imag:R},backend:l}),Z=(0,eP.Jp)({inputs:{a:V,b:P},backend:l}),O=(0,y.IH)({inputs:{a:w,b:Z},backend:l}),j=(0,e2.lu)({inputs:{a:w,b:Z},backend:l}),G=(0,ep.k)({inputs:{input:O},backend:l}),q=(0,ep.k)({inputs:{input:j},backend:l}),B=imag({inputs:{input:O},backend:l}),L=imag({inputs:{input:j},backend:l}),Y=concat({inputs:[G,q],backend:l,attrs:{axis:0}}),X=concat({inputs:[B,L],backend:l,attrs:{axis:0}}),K=l.data.get(Y.dataId).values,Q=l.data.get(X.dataId).values;return l.disposeIntermediateTensorInfo(c),l.disposeIntermediateTensorInfo(h),l.disposeIntermediateTensorInfo(f),l.disposeIntermediateTensorInfo(b),l.disposeIntermediateTensorInfo(v),l.disposeIntermediateTensorInfo(x),l.disposeIntermediateTensorInfo(F),l.disposeIntermediateTensorInfo(M),l.disposeIntermediateTensorInfo(w),l.disposeIntermediateTensorInfo(E),l.disposeIntermediateTensorInfo(z),l.disposeIntermediateTensorInfo(P),l.disposeIntermediateTensorInfo(W),l.disposeIntermediateTensorInfo(R),l.disposeIntermediateTensorInfo(V),l.disposeIntermediateTensorInfo(Z),l.disposeIntermediateTensorInfo(O),l.disposeIntermediateTensorInfo(j),l.disposeIntermediateTensorInfo(G),l.disposeIntermediateTensorInfo(B),l.disposeIntermediateTensorInfo(q),l.disposeIntermediateTensorInfo(L),l.disposeIntermediateTensorInfo(Y),l.disposeIntermediateTensorInfo(X),{real:K,imag:Q}}(o,s,r,t,a),i=[e.shape[0],e.shape[1]];if(t){let e=a.makeTensorInfo(i,"float32",l.real),t=a.makeTensorInfo(i,"float32",l.imag),o=a.makeTensorInfo([],"float32",n.D5U.createScalarValue(r,"float32")),s=(0,u.y)({inputs:{x:o},backend:a}),d=e1.kernelFunc({inputs:{a:e,b:o},backend:a}),p=e1.kernelFunc({inputs:{a:t,b:s},backend:a}),c=a.data.get(d.dataId).values,h=a.data.get(p.dataId).values;return a.disposeIntermediateTensorInfo(e),a.disposeIntermediateTensorInfo(t),a.disposeIntermediateTensorInfo(o),a.disposeIntermediateTensorInfo(s),a.disposeIntermediateTensorInfo(d),a.disposeIntermediateTensorInfo(p),{real:c,imag:h}}return l}{let e=n.backend_util.mergeRealAndImagArrays(o,s),a=function(e,t,a){let r=new Float32Array(2*t);for(let l=0;l<t;l++){let o=0,s=0;for(let r=0;r<t;r++){let i=n.backend_util.exponent(l*r,t,a),u=n.backend_util.getComplexWithIndex(e,r);o+=u.real*i.real-u.imag*i.imag,s+=u.real*i.imag+u.imag*i.real}a&&(o/=t,s/=t),n.backend_util.assignToTypedArray(r,o,s,l)}return r}(e,r,t);return n.backend_util.splitRealAndImagArrays(a)}}(s,t,a),m=n.backend_util.mergeRealAndImagArrays(p,c);for(let t=0;t<o;t++){let a=n.backend_util.getComplexWithIndex(m,t);h[e*o+t]=a.real,f[e*o+t]=a.imag}a.disposeIntermediateTensorInfo(r),a.disposeIntermediateTensorInfo(l),a.disposeIntermediateTensorInfo(s)}let m=a.makeTensorInfo(p,"float32",h),k=a.makeTensorInfo(p,"float32",f),g=(0,es.P)({inputs:{real:m,imag:k},backend:a});return a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(k),g}let e3={kernelName:n.vwp,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{input:r}=t,l=n.D5U.sizeFromShape(r.shape),o=r.shape[r.shape.length-1],s=l/o,i=reshape({inputs:{x:r},backend:a,attrs:{shape:[s,o]}}),u=fftBatch(i,!1,a),d=reshape({inputs:{x:u},backend:a,attrs:{shape:r.shape}});return a.disposeIntermediateTensorInfo(i),a.disposeIntermediateTensorInfo(u),d}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e){let{backend:t,attrs:a}=e,{shape:r,value:l,dtype:o}=a,s=o||n.D5U.inferDtype(l),i=n.D5U.getArrayFromDType(s,n.D5U.sizeFromShape(r));return function(e,t,a){e.fill(t)}(i,l,0),t.makeTensorInfo(r,s,i)}let e5={kernelName:n.deh,backendName:"cpu",kernelFunc:fill},e6={kernelName:n.Uyb,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:a})=>{let{image:r}=e,l=n.D5U.getTypedArrayFromDType(r.dtype,n.D5U.sizeFromShape(r.shape)),[o,s,i,u]=r.shape,d=a.data.get(r.dataId).values;for(let e=0;e<o;e++){let t=e*i*s*u;for(let e=0;e<s;e++){let a=e*(i*u);for(let e=0;e<i;e++){let n=e*u;for(let r=0;r<u;r++){let o=Math.round(i-e-1),s=t+a+n+r,p=d[s];if(o>=0&&o<i){let e=o*u,n=t+a+e+r;p=d[n]}l[s]=p}}}}let p=a.write(l,r.shape,r.dtype);return{dataId:p,shape:r.shape,dtype:r.dtype}}};var e4=a(29567);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let e9=(0,p.b)((e,t)=>Math.floor(e/t)),e7=(0,R.j)(n.jeX,e9,null,"int32"),e8={kernelName:n.jeX,backendName:"cpu",kernelFunc:e7},te={kernelName:n._V0,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:r,filter:l,bias:o,preluActivationWeights:s}=t,{strides:i,pad:u,dataFormat:d,dilations:p,dimRoundingMode:c,activation:h,leakyreluAlpha:f}=n,m=conv2D({inputs:{x:r,filter:l},backend:a,attrs:{strides:i,pad:u,dataFormat:d,dilations:p,dimRoundingMode:c}});if(o){let e=m;if("NCHW"===d&&1===o.shape.length&&1!==o.shape[0]){let e=reshape({inputs:{x:o},backend:a,attrs:{shape:[o.shape[0],1,1]}});m=(0,y.IH)({inputs:{a:m,b:e},backend:a}),a.disposeIntermediateTensorInfo(e)}else m=(0,y.IH)({inputs:{a:m,b:o},backend:a});a.disposeIntermediateTensorInfo(e)}if(h){let e=m;if("NCHW"===d&&"prelu"===h&&1===s.shape.length&&1!==s.shape[0]){let e=reshape({inputs:{x:s},backend:a,attrs:{shape:[s.shape[0],1,1]}});m=applyActivation(a,m,h,e,f),a.disposeIntermediateTensorInfo(e)}else m=applyActivation(a,m,h,s,f);a.disposeIntermediateTensorInfo(e)}return m}},tt={kernelName:n.luS,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:r,filter:l,bias:o,preluActivationWeights:s}=t,{strides:i,pad:u,dataFormat:d,dilations:p,dimRoundingMode:c,activation:h,leakyreluAlpha:f}=n,m=depthwiseConv2dNative({inputs:{x:r,filter:l},backend:a,attrs:{strides:i,pad:u,dataFormat:d,dilations:p,dimRoundingMode:c}});if(o){let e=m;m=(0,y.IH)({inputs:{a:m,b:o},backend:a}),a.disposeIntermediateTensorInfo(e)}if(h){let e=m;m=applyActivation(a,m,h,s,f),a.disposeIntermediateTensorInfo(e)}return m}};var ta=a(63246);let tn={kernelName:n.q1x,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{params:r,indices:l}=t,o=n.D5U.sizeFromShape(r.shape),s=l.shape,i=s[s.length-1],[u,d,p,c]=n.backend_util.prepareAndValidate(r,l);if(0===d)return a.makeTensorInfo(u,r.dtype,[]);let h=a.data.get(l.dataId).values,f=a.bufferSync(r),m=(0,ta.m)(h,f,r.dtype,d,i,p,c,r.shape,o);return a.makeTensorInfo(u,r.dtype,m.values)}};var tr=a(51167);let tl={kernelName:n.qi_,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,indices:s}=t,{axis:i,batchDims:u}=l;(0,r.H)([o,s],"gatherV2");let d=n.D5U.parseAxisParam(i,o.shape)[0],p=a.data.get(s.dataId).values,c=o.shape[d];for(let e=0;e<p.length;++e){let t=p[e];n.D5U.assert(t<=c-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${c-1}]`)}let h=u;null==u&&(h=0);let f=n.D5U.sizeFromShape(s.shape),m=n.backend_util.segment_util.collectGatherOpShapeInfo(o,s,d,h),k=reshape({inputs:{x:o},backend:a,attrs:{shape:[m.batchSize,m.outerSize,m.dimSize,m.sliceSize]}}),g=reshape({inputs:{x:s},backend:a,attrs:{shape:[m.batchSize,f/m.batchSize]}}),I=[m.batchSize,m.outerSize,f/m.batchSize,m.sliceSize],y=a.bufferSync(g),b=a.bufferSync(k),v=(0,tr.i)(b,y,I);return a.disposeIntermediateTensorInfo(k),a.disposeIntermediateTensorInfo(g),a.makeTensorInfo(m.outputShape,v.dtype,v.values)}};var to=a(26411),ts=a(68393);let ti={kernelName:n.Qg5,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{input:r}=t,l=n.D5U.sizeFromShape(r.shape),o=r.shape[r.shape.length-1],s=l/o,i=reshape({inputs:{x:r},backend:a,attrs:{shape:[s,o]}}),u=fftBatch(i,!0,a),d=reshape({inputs:{x:u},backend:a,attrs:{shape:r.shape}});return a.disposeIntermediateTensorInfo(i),a.disposeIntermediateTensorInfo(u),d}},tu=(0,o.A)(n.avt,e=>Number.isFinite(e)?1:0,"bool"),td={kernelName:n.avt,backendName:"cpu",kernelFunc:tu},tp=(0,o.A)(n.iWB,e=>Math.abs(e)===1/0?1:0,"bool"),tc={kernelName:n.iWB,backendName:"cpu",kernelFunc:tp},th=(0,o.A)(n.r7n,e=>Number.isNaN(e)?1:0,"bool"),tf={kernelName:n.r7n,backendName:"cpu",kernelFunc:th};var tm=a(17068),tk=a(89658),tg=a(86242);let tI={kernelName:n.e7N,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{backend:t,attrs:a}=e,{start:n,stop:r,num:l}=a,o=(0,tg.b)(n,r,l);return t.makeTensorInfo([o.length],"float32",o)}};var ty=a(79674);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let tb=(0,o.A)(n.kU,e=>Math.log1p(e)),tv={kernelName:n.kU,backendName:"cpu",kernelFunc:tb},tx=(0,p.b)((e,t)=>e&&t),tN=(0,R.j)(n.PYm,tx,null,"bool"),tD={kernelName:n.PYm,backendName:"cpu",kernelFunc:tN},tS=(0,o.A)(n.VfG,e=>e?0:1,"bool"),tT={kernelName:n.VfG,backendName:"cpu",kernelFunc:tS},tF=(0,p.b)((e,t)=>e||t),tM=(0,R.j)(n.MZg,tF,null,"bool"),tw={kernelName:n.MZg,backendName:"cpu",kernelFunc:tM},tA={kernelName:n.eZ0,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{depthRadius:s,bias:i,alpha:u,beta:d}=l;(0,r.H)(o,"LRN");let p=o.shape[3],c=p-1,h=a.data.get(o.dataId).values,f=n.D5U.sizeFromShape(o.shape),m=new Float32Array(f);for(let e=0;e<f;e++){let t=function(e){let t=e%p,a=e-t+Math.max(0,t-s),n=e-t+Math.min(t+s,c),r=0;for(;a<=n;a++){let e=h[a];r+=e*e}return r}(e),a=h[e]*Math.pow(i+u*t,-d);m[e]=a}return a.makeTensorInfo(o.shape,o.dtype,m)}},tU={kernelName:n.Hhh,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,y:s,dy:i}=t,{depthRadius:u,bias:d,alpha:p,beta:c}=l;(0,r.H)(i,"LRNGrad");let h=n.D5U.sizeFromShape(i.shape),f=i.shape[3],m=a.data.get(i.dataId).values,k=a.data.get(o.dataId).values,g=a.data.get(s.dataId).values,I=new Float32Array(h);for(let e=0;e<h;e++){let t=e%f,a=e-t+Math.max(0,t-u),n=e-t+Math.min(f,t+u+1),r=0;for(let e=a;e<n;e++)r+=Math.pow(k[e],2);r=p*r+d;for(let t=a;t<n;t++){let a=-2*p*c*k[t]*g[e]/r;e===t&&(a+=Math.pow(r,-c)),a*=m[e],I[t]+=a}}return a.makeTensorInfo(i.shape,o.dtype,I)}};var t_=a(81637),tH=a(26011);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function max(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{reductionIndices:s,keepDims:i}=l,u=o.shape,d=u.length,p=n.D5U.parseAxisParam(s,u),c=p,h=n.backend_util.getAxesPermutation(c,d),f=a.data.get(o.dataId).values;if(null!=h){let e=Array(d);for(let t=0;t<e.length;t++)e[t]=u[h[t]];f=(0,tH.H)(f,u,o.dtype,h,e),c=n.backend_util.getInnerMostAxes(c.length,d),u=e}(0,r.H)(o,"max"),n.backend_util.assertAxesAreInnerMostDims("max",c,d);let[m,k]=n.backend_util.computeOutAndReduceShapes(u,c),g=n.D5U.sizeFromShape(k),I=(0,t_.B)(f,g,m,o.dtype),y=a.write(I,m,o.dtype),b=m;if(i){let e=n.backend_util.expandShapeToKeepDim(m,p);b=e}return{dataId:y,shape:b,dtype:o.dtype}}let tE={kernelName:n.YoZ,backendName:"cpu",kernelFunc:max};var tz=a(11231);let tP={kernelName:n.mTV,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:a,backend:l,attrs:o}=e,{x:s}=a;(0,r.H)(s,"maxPool");let{filterSize:i,strides:d,pad:p,dimRoundingMode:c}=o;n.D5U.assert(n.backend_util.eitherStridesOrDilationsAreOne(d,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${d} and dilations '1'`);let h=n.backend_util.computePool2DInfo(s.shape,i,d,1,p,c);if(1===h.filterWidth&&1===h.filterHeight&&n.D5U.arraysEqual(h.inShape,h.outShape))t=(0,u.y)({inputs:{x:s},backend:l});else{let e=l.data.get(s.dataId).values,a=n.D5U.computeStrides(s.shape),r=pool(e,s.shape,s.dtype,a,h,"max");t=l.makeTensorInfo(h.outShape,s.dtype,r.values)}return t}},tC={kernelName:n.OAf,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{filterSize:s,strides:i,pad:u,dimRoundingMode:d,dataFormat:p}=l;(0,r.H)(o,"maxPool3d");let c=n.backend_util.computePool3DInfo(o.shape,s,i,1,u,d,p),h=a.data.get(o.dataId).values,f=pool3d(h,o.shape,o.dtype,n.D5U.computeStrides(o.shape),c,"max");return a.makeTensorInfo(f.shape,"float32",f.values)}},t$={kernelName:n.OU7,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,input:s}=t,{filterSize:i,strides:u,pad:d,dimRoundingMode:p}=l;(0,r.H)([o,s],"maxPool3DGrad");let c=n.backend_util.computePool3DInfo(s.shape,i,u,1,d,p),h=a.bufferSync(s),f=function(e,t){let a=(0,n.f3b)(t.outShape,"int32"),r=t.strideDepth,l=t.strideHeight,o=t.strideWidth,s=t.dilationDepth,i=t.dilationHeight,u=t.dilationWidth,d=t.effectiveFilterDepth,p=t.effectiveFilterHeight,c=t.effectiveFilterWidth,h=t.padInfo.front,f=t.padInfo.top,m=t.padInfo.left;for(let n=0;n<t.batchSize;++n)for(let k=0;k<t.inChannels;++k)for(let g=0;g<t.outDepth;++g){let I=g*r-h,y=I;for(;y<0;)y+=s;let b=Math.min(t.inDepth,d+I);for(let r=0;r<t.outHeight;++r){let d=r*l-f,h=d;for(;h<0;)h+=i;let v=Math.min(t.inHeight,p+d);for(let l=0;l<t.outWidth;++l){let f=l*o-m,x=f;for(;x<0;)x+=u;let N=Math.min(t.inWidth,c+f),D=Number.NEGATIVE_INFINITY,S=-1;for(let t=y;t<b;t+=s){let a=t-I;for(let r=h;r<v;r+=i){let l=r-d;for(let o=x;o<N;o+=u){let s=o-f,i=e.get(n,t,r,o,k);i>=D&&(D=i,S=a*p*c+l*p+s)}}}a.set(S,n,g,r,l,k)}}}return a}(h,c),m=c.strideDepth,k=c.strideHeight,g=c.strideWidth,I=c.dilationDepth,y=c.dilationHeight,b=c.dilationWidth,v=c.effectiveFilterDepth,x=c.effectiveFilterHeight,N=c.effectiveFilterWidth,D=v-1-c.padInfo.front,S=N-1-c.padInfo.left,T=x-1-c.padInfo.top,F=(0,n.f3b)(s.shape,"float32"),M=a.bufferSync(o);for(let e=0;e<c.batchSize;++e)for(let t=0;t<c.inChannels;++t)for(let a=0;a<c.inDepth;++a)for(let n=0;n<c.inHeight;++n)for(let r=0;r<c.inWidth;++r){let l=a-D,o=n-T,s=r-S,i=0;for(let a=0;a<v;a+=I){let n=(l+a)/m;if(!(n<0)&&!(n>=c.outDepth)&&Math.floor(n)===n)for(let r=0;r<x;r+=y){let l=(o+r)/k;if(!(l<0)&&!(l>=c.outHeight)&&Math.floor(l)===l)for(let o=0;o<N;o+=b){let u=(s+o)/g;if(u<0||u>=c.outWidth||Math.floor(u)!==u)continue;let d=v*x*N-1-f.get(e,n,l,u,t),p=a*x*N+r*N+o,h=d===p?1:0;if(0===h)continue;let m=M.get(e,n,l,u,t);i+=m*h}}}F.set(i,e,a,n,r,t)}return a.makeTensorInfo(F.shape,F.dtype,F.values)}},tW={kernelName:n.OV7,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{dy:o,input:s,output:i}=t;(0,r.H)([s,i],"maxPoolGrad");let{filterSize:u,strides:d,pad:p,dimRoundingMode:c}=l,h=n.backend_util.computePool2DInfo(s.shape,u,d,1,p,c),f=a.data.get(s.dataId).values,m=(0,n.f3b)(h.outShape,s.dtype,maxPoolPositions(f,s.shape,s.dtype,h).values),k=h.strideHeight,g=h.strideWidth,I=h.dilationHeight,y=h.dilationWidth,b=h.effectiveFilterHeight,v=h.effectiveFilterWidth,x=v-1-h.padInfo.left,N=b-1-h.padInfo.top,D=(0,n.f3b)(s.shape,"float32"),S=a.data.get(o.dataId).values,T=(0,n.f3b)(o.shape,"float32",S);for(let e=0;e<h.batchSize;++e)for(let t=0;t<h.inChannels;++t)for(let a=0;a<h.inHeight;++a)for(let n=0;n<h.inWidth;++n){let r=a-N,l=n-x,o=0;for(let a=0;a<b;a+=I){let n=(r+a)/k;if(!(n<0)&&!(n>=h.outHeight)&&Math.floor(n)===n)for(let r=0;r<v;r+=y){let s=(l+r)/g;if(s<0||s>=h.outWidth||Math.floor(s)!==s)continue;let i=b*v-1-m.get(e,n,s,t),u=a*v+r,d=i===u?1:0;if(0===d)continue;let p=T.get(e,n,s,t);o+=p*d}}D.set(o,e,a,n,t)}return a.makeTensorInfo(D.shape,D.dtype,D.values)}},tR={kernelName:n.vFR,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:a})=>{let{x:l}=e,{filterSize:o,strides:s,pad:i,includeBatchInIndex:u}=t;(0,r.H)(l,"MaxPoolWithArgmax");let d=a.data.get(l.dataId).values,p=n.backend_util.computePool2DInfo(l.shape,o,s,[1,1],i),[c,h]=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,a,r,l){let o=n.D5U.computeStrides(t),s=pool(e,t,a,o,l,"max"),i=maxPoolPositions(e,t,a,l,!0,r);return[s.values,i.values]}(d,l.shape,l.dtype,u,p),f=a.write(c,p.outShape,l.dtype),m=a.write(h,p.outShape,l.dtype);return[{dataId:f,shape:p.outShape,dtype:l.dtype},{dataId:m,shape:p.outShape,dtype:"int32"}]}},tV={kernelName:n.q2K,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{x:l}=t,{axis:o,keepDims:s}=r,i=n.D5U.parseAxisParam(o,l.shape),u=n.backend_util.computeOutAndReduceShapes(l.shape,i),d=u[1],p=n.D5U.sizeFromShape(d),c=[],h=a.makeTensorInfo([],"float32",new Float32Array([p]));c.push(h);let f=(0,en.pj)({inputs:{x:l},backend:a,attrs:{dtype:"float32"}});c.push(f);let m=e0({inputs:{a:f,b:h},backend:a});c.push(m);let k=sum({inputs:{x:m},backend:a,attrs:{axis:o,keepDims:s}});return c.forEach(e=>a.disposeIntermediateTensorInfo(e)),k}},tZ={kernelName:n.c17,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{axis:s,keepDims:i}=l;(0,r.H)(o,"min");let u=n.D5U.parseAxisParam(s,o.shape),d=u,p=n.backend_util.getAxesPermutation(d,o.shape.length),c=o;null!=p&&(c=(0,w.p)({inputs:{x:o},backend:a,attrs:{perm:p}}),d=n.backend_util.getInnerMostAxes(d.length,o.shape.length)),n.backend_util.assertAxesAreInnerMostDims("min",d,c.shape.length);let[h,f]=n.backend_util.computeOutAndReduceShapes(c.shape,d),m=n.D5U.sizeFromShape(f),k=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(h),c.dtype),g=a.data.get(c.dataId).values;for(let e=0;e<k.length;++e){let t=e*m,a=g[t];for(let e=0;e<m;++e){let n=g[t+e];(Number.isNaN(n)||n<a)&&(a=n)}k[e]=a}null!=p&&a.disposeIntermediateTensorInfo(c);let I=a.makeTensorInfo(h,c.dtype,k);if(i){let e=n.backend_util.expandShapeToKeepDim(h,u),t=reshape({inputs:{x:I},backend:a,attrs:{shape:e}});return a.disposeIntermediateTensorInfo(I),t}return I}};var tO=a(39252);let tj={kernelName:n.jQs,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{paddings:s,mode:i}=l;(0,r.H)(o,"mirrorPad");let u=s.map((e,t)=>e[0]+o.shape[t]+e[1]),d=s.map(e=>e[0]),p=s.map((e,t)=>e[0]+o.shape[t]),c="reflect"===i?0:1,h=a.data.get(o.dataId).values,f=o.shape.length,m=n.D5U.computeStrides(o.shape),k=n.D5U.sizeFromShape(u),g=u.length,I=n.D5U.computeStrides(u),y=n.D5U.getTypedArrayFromDType(o.dtype,k);for(let e=0;e<k;e++){let t=n.D5U.indexToLoc(e,g,I);for(let e=0;e<g;e++)t[e]<d[e]?t[e]=2*d[e]-t[e]-c:t[e]>=p[e]&&(t[e]=(p[e]-1)*2-t[e]+c);t=t.map((e,t)=>e-d[t]);let a=n.D5U.locToIndex(t,f,m);y[e]=h[a]}let b=a.write(y,u,o.dtype);return{dataId:b,shape:u,dtype:o.dtype}}},tG=(0,p.b)((e,t)=>{let a=e%t;return e<0&&t<0||e>=0&&t>=0?a:(a+t)%t}),tq=(0,R.j)(n.Vbg,tG),tB={kernelName:n.Vbg,backendName:"cpu",kernelFunc:tq};var tL=a(80120);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function softmax(e){let{inputs:t,backend:a,attrs:r}=e,{logits:l}=t,{dim:o}=r,s=l.shape.length,i=o;if(-1===i&&(i=s-1),i!==s-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${s} and dim was ${i}`);let u=n.D5U.parseAxisParam([i],l.shape),d=max({inputs:{x:l},backend:a,attrs:{reductionIndices:u,keepDims:!1}}),p=n.backend_util.expandShapeToKeepDim(d.shape,u),c=reshape({inputs:{x:d},backend:a,attrs:{shape:p}}),h=(0,e2.lu)({inputs:{a:l,b:c},backend:a}),f=(0,eX.Qq)({inputs:{x:h},backend:a}),m=sum({inputs:{x:f},backend:a,attrs:{axis:u,keepDims:!1}}),k=reshape({inputs:{x:m},backend:a,attrs:{shape:p}}),g=e0({inputs:{a:f,b:k},backend:a});return a.disposeIntermediateTensorInfo(d),a.disposeIntermediateTensorInfo(c),a.disposeIntermediateTensorInfo(h),a.disposeIntermediateTensorInfo(f),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(k),g}let tY={kernelName:n.Gcp,backendName:"cpu",kernelFunc:softmax},tX={kernelName:n.NZg,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{logits:o}=t,{numSamples:s,seed:i,normalized:u}=l;(0,r.H)(o,"multinomial");let d=u?o:softmax({inputs:{logits:o},backend:a,attrs:{dim:-1}}),p=d.shape[0],c=d.shape[1],h=a.data.get(d.dataId).values,f=[p,s],m=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(f),"int32");for(let e=0;e<p;++e){let t=e*c,a=new Float32Array(c-1);a[0]=h[t];for(let e=1;e<a.length;++e)a[e]=a[e-1]+h[t+e];let n=tL.alea(i.toString()),r=e*s;for(let e=0;e<s;++e){let t=n();m[r+e]=a.length;for(let n=0;n<a.length;n++)if(t<a[n]){m[r+e]=n;break}}}return u||a.disposeIntermediateTensorInfo(d),a.makeTensorInfo(f,"int32",m)}};var tK=a(92709);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let tQ=n.GDt.GP,tJ={kernelName:n.uv1,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:a,attrs:n}=e,{boxes:l,scores:o}=t,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u}=n;(0,r.H)(l,"NonMaxSuppression");let d=a.data.get(l.dataId).values,p=a.data.get(o.dataId).values,{selectedIndices:c}=tQ(d,p,s,i,u);return a.makeTensorInfo([c.length],"int32",new Int32Array(c))}},t0=n.GDt.qP,t1={kernelName:n.cye,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:a,attrs:n}=e,{boxes:l,scores:o}=t,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u,padToMaxOutputSize:d}=n;(0,r.H)(l,"NonMaxSuppressionPadded");let p=a.data.get(l.dataId).values,c=a.data.get(o.dataId).values,{selectedIndices:h,validOutputs:f}=t0(p,c,s,i,u,d);return[a.makeTensorInfo([h.length],"int32",new Int32Array(h)),a.makeTensorInfo([],"int32",new Int32Array([f]))]}},t2=n.GDt.pA,t3={kernelName:n.W0H,backendName:"cpu",kernelFunc:function(e){let{inputs:t,backend:a,attrs:n}=e,{boxes:l,scores:o}=t,{maxOutputSize:s,iouThreshold:i,scoreThreshold:u,softNmsSigma:d}=n;(0,r.H)(l,"NonMaxSuppressionWithScore");let p=a.data.get(l.dataId).values,c=a.data.get(o.dataId).values,{selectedIndices:h,selectedScores:f}=t2(p,c,s,i,u,d);return[a.makeTensorInfo([h.length],"int32",new Int32Array(h)),a.makeTensorInfo([f.length],"float32",new Float32Array(f))]}};var t5=a(67676);let t6={kernelName:n.we_,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{indices:o}=t,{dtype:s,depth:i,onValue:u,offValue:d}=l;(0,r.H)(o,"oneHot");let p=n.D5U.sizeFromShape(o.shape),c=new Float32Array(p*i);c.fill(d);let h=a.data.get(o.dataId).values;for(let e=0;e<p;++e)h[e]>=0&&h[e]<i&&(c[e*i+h[e]]=u);return a.makeTensorInfo([...o.shape,i],s,c)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zerosLike(e){let{inputs:t,backend:a}=e,{x:n}=t;if("string"===n.dtype)throw Error("zerosLike is not supported for string tensors");if("complex64"!==n.dtype)return fill({backend:a,attrs:{shape:n.shape,value:0,dtype:n.dtype}});{let e=(0,ep.k)({inputs:{input:n},backend:a}),t=zerosLike({inputs:{x:e},backend:a}),r=imag({inputs:{input:n},backend:a}),l=zerosLike({inputs:{x:r},backend:a}),o=(0,es.P)({inputs:{real:t,imag:l},backend:a});return a.disposeIntermediateTensorInfo(e),a.disposeIntermediateTensorInfo(t),a.disposeIntermediateTensorInfo(r),a.disposeIntermediateTensorInfo(l),o}}let t4={kernelName:n.RuY,backendName:"cpu",kernelFunc:zerosLike},t9={kernelName:n.qWM,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function onesLike(e){let{inputs:t,backend:a}=e,{x:n}=t;if("string"===n.dtype)throw Error("onesLike is not supported for string tensors");if("complex64"!==n.dtype)return fill({backend:a,attrs:{shape:n.shape,value:1,dtype:n.dtype}});{let e=(0,ep.k)({inputs:{input:n},backend:a}),t=onesLike({inputs:{x:e},backend:a}),r=imag({inputs:{input:n},backend:a}),l=zerosLike({inputs:{x:r},backend:a}),o=(0,es.P)({inputs:{real:t,imag:l},backend:a});return a.disposeIntermediateTensorInfo(e),a.disposeIntermediateTensorInfo(t),a.disposeIntermediateTensorInfo(r),a.disposeIntermediateTensorInfo(l),o}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pack(e){let{inputs:t,backend:a,attrs:r}=e,{axis:l}=r;if(1===t.length)return expandDims({inputs:{input:t[0]},backend:a,attrs:{dim:l}});let o=t[0].shape,s=t[0].dtype;t.forEach(e=>{n.D5U.assertShapesMatch(o,e.shape,"All tensors passed to stack must have matching shapes"),n.D5U.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],u=t.map(e=>{let t=expandDims({inputs:{input:e},backend:a,attrs:{dim:l}});return i.push(t),t}),d=concat({inputs:u,backend:a,attrs:{axis:l}});return i.forEach(e=>a.disposeIntermediateTensorInfo(e)),d}let t7={kernelName:n.QiL,backendName:"cpu",kernelFunc:pack},t8={kernelName:n.lyA,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{paddings:s,constantValue:i}=l;(0,r.H)(o,"pad");let u=s.map((e,t)=>e[0]+o.shape[t]+e[1]),d=s.map(e=>e[0]),p=a.data.get(o.dataId).values,c=n.D5U.sizeFromShape(o.shape),h=o.shape.length,f=n.D5U.computeStrides(o.shape),m=n.D5U.sizeFromShape(u),k=u.length,g=n.D5U.computeStrides(u),I=n.D5U.getTypedArrayFromDType(o.dtype,m);0!==i&&I.fill(i);for(let e=0;e<c;e++){let t=n.D5U.indexToLoc(e,h,f),a=t.map((e,t)=>e+d[t]),r=n.D5U.locToIndex(a,k,g);I[r]=p[e]}let y=a.write(I,u,o.dtype);return{dataId:y,shape:u,dtype:o.dtype}}},ae=(0,p.b)((e,t)=>Math.pow(e,t)),at=(0,R.j)(n.pe_,ae),aa={kernelName:n.pe_,backendName:"cpu",kernelFunc:at};var an=a(67419),ar=a(39168);let al={kernelName:n.dDz,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{paramsNestedSplits:r,paramsDenseValues:l,indices:o}=t,{outputRaggedRank:s}=n,i=r.map(e=>a.data.get(e.dataId).values),u=r.map(e=>e.shape),d=a.data.get(l.dataId).values,p=a.data.get(o.dataId).values,[c,h,f]=(0,ar.c)(i,u,d,l.shape,l.dtype,p,o.shape,s),m=c.map(e=>a.makeTensorInfo([e.length],"int32",e)),k=a.makeTensorInfo(f,l.dtype,h);return m.concat([k])}};var ao=a(62898);let as={kernelName:n.CQl,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{starts:n,limits:r,deltas:l}=t,o=a.data.get(n.dataId).values,s=a.data.get(r.dataId).values,i=a.data.get(l.dataId).values,[u,d]=(0,ao.S)(o,n.shape,n.dtype,s,r.shape,i,l.shape),p=a.makeTensorInfo([u.length],"int32",u),c=a.makeTensorInfo([d.length],n.dtype,d);return[p,c]}};var ai=a(62840);let au={kernelName:n.BiW,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{shape:r,values:l,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:i}=n,u=a.data.get(r.dataId).values,d=a.data.get(l.dataId).values,p=a.data.get(o.dataId).values,c=s.map(e=>a.data.get(e.dataId).values),h=s.map(e=>e.shape),[f,m]=(0,ai.p)(u,r.shape,d,l.shape,l.dtype,p,o.shape,c,h,i);return a.makeTensorInfo(f,l.dtype,m)}};var ad=a(42373);let ap={kernelName:n.e6w,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{backend:t,attrs:a}=e,{start:n,stop:r,dtype:l,step:o}=a,s=(0,ad.b)(n,r,o,l);return t.makeTensorInfo([s.length],l,s)}},ac=(0,o.A)(n.$HU,e=>1/e),ah={kernelName:n.$HU,backendName:"cpu",kernelFunc:ac},af={kernelName:n._Yw,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{images:o}=t,{alignCorners:s,halfPixelCenters:i,size:u}=l;(0,r.H)(o,"resizeBilinear");let d=n.D5U.computeStrides(o.shape),[p,c]=u,[h,f,m,k]=o.shape,g=a.data.get(o.dataId).values,I=new Float32Array(n.D5U.sizeFromShape([h,p,c,k])),y=[s&&p>1?f-1:f,s&&c>1?m-1:m],b=[s&&p>1?p-1:p,s&&c>1?c-1:c],v=0,x=y[0]/b[0],N=y[1]/b[1];for(let e=0;e<h;e++)for(let t=0;t<p;t++){let a;a=i?x*(t+.5)-.5:x*t;let n=Math.max(0,Math.floor(a)),r=a-n,l=Math.min(f-1,Math.ceil(a)),o=e*d[0]+n*d[1],s=e*d[0]+l*d[1];for(let e=0;e<c;e++){let t;t=i?N*(e+.5)-.5:N*e;let a=Math.max(0,Math.floor(t)),n=t-a,l=Math.min(m-1,Math.ceil(t)),u=o+a*d[2],p=s+a*d[2],c=o+l*d[2],h=s+l*d[2];for(let e=0;e<k;e++){let t=g[u+e],a=g[p+e],l=g[c+e],o=g[h+e],s=t+(l-t)*n,i=a+(o-a)*n,d=s+(i-s)*r;I[v++]=d}}}return a.makeTensorInfo([h,p,c,k],"float32",I)}},am={kernelName:n.zbQ,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{images:o,dy:s}=t,{alignCorners:i}=l;(0,r.H)([s,o],"resizeBilinearGrad");let u=n.D5U.computeStrides(o.shape),[d,p,c,h]=o.shape,[,f,m]=s.shape,k=new Float32Array(d*p*c*h),g=[i&&f>1?p-1:p,i&&m>1?c-1:c],I=[i&&f>1?f-1:f,i&&m>1?m-1:m],y=g[0]/I[0],b=g[1]/I[1],v=a.data.get(s.dataId).values,x=0;for(let e=0;e<d;e++){let t=e*u[0];for(let e=0;e<f;e++){let a=e*y,n=Math.floor(a),r=Math.min(Math.ceil(a),p-1),l=t+n*u[1],o=t+r*u[1],s=a-n,i=1-s;for(let e=0;e<m;e++){let t=e*b,a=Math.floor(t),n=Math.min(Math.ceil(t),c-1),r=t-a,d=1-r,p=l+a*u[2],f=l+n*u[2],m=o+a*u[2],g=o+n*u[2],I=i*d,y=i*r,N=s*d,D=s*r;for(let e=0;e<h;e++){let t=v[x++];k[p+e]+=t*I,k[f+e]+=t*y,k[m+e]+=t*N,k[g+e]+=t*D}}}}return a.makeTensorInfo([d,c,p,h],"float32",k)}},ak={kernelName:n.dpD,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{images:o}=t,{alignCorners:s,halfPixelCenters:i,size:u}=l;(0,r.H)(o,"resizeNearestNeighbor");let d=n.D5U.computeStrides(o.shape),[p,c]=u,[h,f,m,k]=o.shape,g=a.data.get(o.dataId).values,I=new Float32Array(h*p*c*k),y=[s&&p>1?f-1:f,s&&c>1?m-1:m],b=[s&&p>1?p-1:p,s&&c>1?c-1:c],v=y[0]/b[0],x=y[1]/b[1],N=0;for(let e=0;e<h;e++){let t=e*d[0];for(let e=0;e<p;e++){let a=i?v*(e+.5):v*e,n=Math.min(f-1,s?Math.round(a):Math.floor(a));i&&(n=Math.max(0,n));let r=t+n*d[1];for(let e=0;e<c;e++){let t=i?x*(e+.5):x*e,a=Math.min(m-1,s?Math.round(t):Math.floor(t));i&&(a=Math.max(0,a));let n=r+a*d[2];for(let e=0;e<k;e++){let t=g[n+e];I[N++]=t}}}}return a.makeTensorInfo([h,p,c,k],o.dtype,I)}},ag={kernelName:n.Hmb,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{images:o,dy:s}=t,{alignCorners:i}=l;(0,r.H)([s,o],"resizeNearestNeighborGrad");let u=n.D5U.computeStrides(o.shape),d=n.D5U.computeStrides(s.shape),[p,c,h,f]=o.shape,[,m,k]=s.shape,g=new Float32Array(p*c*h*f),I=a.data.get(s.dataId).values,y=[i&&m>1?c-1:c,i&&k>1?h-1:h],b=[i&&m>1?m-1:m,i&&k>1?k-1:k],v=y[0]/b[0],x=y[1]/b[1],N=1/v,D=1/x,S=2*Math.ceil(N)+2,T=2*Math.ceil(D)+2;for(let e=0;e<p;e++){let t=e*u[0];for(let e=0;e<c;e++){let a=t+e*u[1],n=Math.floor(e*N),r=Math.floor(n-S/2);for(let n=0;n<h;n++){let l=a+n*u[2],o=Math.floor(n*D),s=Math.floor(o-T/2);for(let a=0;a<f;a++){let o=0;for(let l=0;l<S;l++){let u=l+r;if(u<0||u>=m)continue;let p=t+u*d[1],f=u*v,g=Math.min(c-1,i?Math.round(f):Math.floor(f));if(e===g)for(let e=0;e<T;e++){let t=e+s;if(t<0||t>=k)continue;let r=p+t*d[2],l=t*x,u=Math.min(h-1,i?Math.round(l):Math.floor(l));n===u&&(o+=I[r+a])}}g[l+a]=o}}}}return a.makeTensorInfo(o.shape,o.dtype,g)}},aI={kernelName:n.mKl,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{dims:s}=l;(0,r.H)(o,"reverse");let i=o.shape.length,d=n.D5U.parseAxisParam(s,o.shape);if(0===i)return(0,u.y)({inputs:{x:o},backend:a});let p=new n.YDk(o.shape,o.dtype),c=a.bufferSync(o);for(let e=0;e<p.size;e++){let t=p.indexToLoc(e),a=t.slice();d.forEach(e=>a[e]=o.shape[e]-1-a[e]),p.set(c.get(...a),...t)}return a.makeTensorInfo(p.shape,p.dtype,p.values)}},ay={kernelName:n.b9H,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:a})=>{let{image:r}=e,{radians:l,fillValue:o,center:s}=t,i=n.D5U.getTypedArrayFromDType(r.dtype,n.D5U.sizeFromShape(r.shape)),[u,d,p,c]=r.shape,[h,f]=n.backend_util.getImageCenter(s,d,p),m=Math.sin(l),k=Math.cos(l),g=a.data.get(r.dataId).values;for(let e=0;e<u;e++){let t=e*p*d*c;for(let e=0;e<d;e++){let a=e*(p*c);for(let n=0;n<p;n++){let r=n*c;for(let l=0;l<c;l++){let s=[u,e,n,l],I=s[2],y=s[1],b=(I-h)*k-(y-f)*m,v=(I-h)*m+(y-f)*k;b=Math.round(b+h),v=Math.round(v+f);let x=o;if("number"!=typeof o&&(x=3===l?255:o[l]),b>=0&&b<p&&v>=0&&v<d){let e=v*(p*c),a=b*c,n=t+e+a+l;x=g[n]}let N=t+a+r+l;i[N]=x}}}}let I=a.write(i,r.shape,r.dtype);return{dataId:I,shape:r.shape,dtype:r.dtype}}},ab=(0,o.A)(n.e07,e=>{let t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2==0?t:t+1}),av={kernelName:n.e07,backendName:"cpu",kernelFunc:ab};var ax=a(81056),aN=a(6237);let aD={kernelName:n.xQA,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{indices:l,updates:o}=t,{shape:s}=r,{sliceRank:i,numUpdates:u,sliceSize:d,strides:p,outputSize:c}=n.backend_util.calculateShapes(o,l,s),h=a.bufferSync(l),f=a.bufferSync(o),m=(0,aN.N)(h,f,s,c,d,u,i,p,0,!0);return a.makeTensorInfo(s,m.dtype,m.values)}},aS={kernelName:n.nr8,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{sortedSequence:l,values:o}=t,{side:s}=r,i=a.data.get(l.dataId).values,u=a.data.get(o.dataId).values,d=function(e,t,a,r,l,o){let s=n.D5U.getArrayFromDType("int32",a*l);for(let n=0;n<a;++n){let a=e.slice(n*r,(n+1)*r),i=n*l;for(let e=0;e<l;++e)s[i+e]="left"===o?/**
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
 */function(e,t){let a=0,n=e.length,r=0;for(;a<n;)e[r=Math.floor((a+n)/2)]<t?a=r+1:n=r;return n}(a,t[e+i]):function(e,t){let a=0,n=e.length,r=0;for(;a<n;)e[r=Math.floor((a+n)/2)]<=t?a=r+1:n=r;return n}(a,t[e+i])}return s}(i,u,l.shape[0],l.shape[1],o.shape[1],s);return a.makeTensorInfo(o.shape,"int32",d)}},aT={kernelName:n.PhF,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a}=e,{condition:l,t:o,e:s}=t;(0,r.H)([l,o,s],"select");let i=l.shape.length,u=a.data.get(l.dataId).values,d=a.data.get(o.dataId).values,p=a.data.get(s.dataId).values,c=(0,n.x8V)(o.dtype,s.dtype),h=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(o.shape),c),f=0,m=0===i||i>1||1===o.shape.length?1:n.D5U.sizeFromShape(o.shape.slice(1));for(let e=0;e<u.length;e++)for(let t=0;t<m;t++)1===u[e]?h[f++]=d[e]:h[f++]=p[e];return a.makeTensorInfo(o.shape,c,h)}},aF=n.backend_util.SELU_SCALEALPHA,aM=n.backend_util.SELU_SCALE,aw=(0,o.A)(n.oFR,e=>e>=0?aM*e:aF*(Math.exp(e)-1)),aA={kernelName:n.oFR,backendName:"cpu",kernelFunc:aw},aU=(0,o.A)(n.i5y,e=>e<0?-1:e>0?1:0),a_={kernelName:n.i5y,backendName:"cpu",kernelFunc:aU},aH=(0,o.A)(n.RQH,e=>Math.sin(e)),aE={kernelName:n.RQH,backendName:"cpu",kernelFunc:aH},az=(0,o.A)(n.wYB,e=>Math.sinh(e)),aP={kernelName:n.wYB,backendName:"cpu",kernelFunc:az},aC=Math.log(11920928955078125e-23)+2,a$=(0,o.A)(n.MRv,e=>{let t=Math.exp(e);return e<aC?t:e>-aC?e:Math.log(1+t)}),aW={kernelName:n.MRv,backendName:"cpu",kernelFunc:a$},aR={kernelName:n.TQc,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o}=t,{blockShape:s,paddings:i}=l;(0,r.H)([o],"spaceToBatchND");let u=n.D5U.sizeFromShape(s),d=[[0,0]];d.push(...i);for(let e=1+s.length;e<o.shape.length;++e)d.push([0,0]);let p=t8.kernelFunc({inputs:{x:o},backend:a,attrs:{paddings:d,constantValue:0}}),c=n.backend_util.getReshaped(p.shape,s,u,!1),h=n.backend_util.getPermuted(c.length,s.length,!1),f=n.backend_util.getReshapedPermuted(p.shape,s,u,!1),m=reshape({inputs:{x:p},backend:a,attrs:{shape:c}}),k=(0,w.p)({inputs:{x:m},backend:a,attrs:{perm:h}}),g=reshape({inputs:{x:k},backend:a,attrs:{shape:f}});return a.disposeIntermediateTensorInfo(p),a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(k),g}};var aV=a(7562);let aZ={kernelName:n.O3z,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{indices:n,values:r,denseShape:l,defaultValue:o}=t;if(1!==l.shape.length)throw Error(`Dense shape must be a vector, saw:
        ${l.shape}`);if(2!==n.shape.length)throw Error(`Indices must be a matrix, saw:
        ${n.shape}`);if(1!==r.shape.length)throw Error(`Values must be a vector, saw:
        ${r.shape}`);if(0!==o.shape.length)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=a.data.get(n.dataId).values,i=a.data.get(r.dataId).values,u=a.data.get(l.dataId).values,d=a.data.get(o.dataId).values[0],[p,c,h,f,m]=(0,aV.c)(s,n.shape,n.dtype,i,r.dtype,u,d);return[a.makeTensorInfo(c,n.dtype,p),a.makeTensorInfo([c[0]],r.dtype,h),a.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),a.makeTensorInfo([m.length],n.dtype,new Int32Array(m))]}};var aO=a(10956);let aj={kernelName:n.nhH,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{inputIndices:n,inputShape:r,newShape:l}=t;if(2!==n.shape.length)throw Error(`Input indices should be a matrix but received shape
        ${n.shape}`);if(1!==r.shape.length)throw Error(`Input shape should be a vector but received shape
        ${r.shape}`);if(1!==l.shape.length)throw Error(`Target shape should be a vector but received shape ${l.shape}`);let o=Array.from(a.data.get(r.dataId).values),s=a.data.get(n.dataId).values,i=Array.from(a.data.get(l.dataId).values),[u,d,p]=(0,aO.U)(s,n.shape,n.dtype,o,i);return[a.makeTensorInfo(d,n.dtype,u),a.makeTensorInfo([p.length],l.dtype,new Int32Array(p))]}};var aG=a(35581);let aq={kernelName:n.w3H,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{data:n,indices:r,segmentIds:l}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==r.shape.length)throw Error(`Indices should be a vector but received shape
          ${r.shape}`);if(1!==l.shape.length)throw Error(`Segment ids should be a vector but received shape
          ${l.shape}`);if(r.shape[0]!==l.shape[0])throw Error("segmentIds and indices should have same size.");let o=a.data.get(n.dataId).values,s=a.data.get(r.dataId).values,i=a.data.get(l.dataId).values,[u,d]=(0,aG.V)(o,n.shape,n.dtype,s,i,!0);return a.makeTensorInfo(d,n.dtype,u)}},aB={kernelName:n.ZjV,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{data:n,indices:r,segmentIds:l}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==r.shape.length)throw Error(`Indices should be a vector but received shape
         ${r.shape}`);if(1!==l.shape.length)throw Error(`Segment ids should be a vector but received shape
         ${l.shape}`);if(r.shape[0]!==l.shape[0])throw Error("segmentIds and indices should have same size.");let o=a.data.get(n.dataId).values,s=a.data.get(r.dataId).values,i=a.data.get(l.dataId).values,[u,d]=(0,aG.V)(o,n.shape,n.dtype,s,i);return a.makeTensorInfo(d,n.dtype,u)}},aL={kernelName:n.D2d,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:a,backend:r,attrs:l}=e,{sparseIndices:o,sparseValues:s,defaultValue:i}=a,{outputShape:u}=l,{sliceRank:d,numUpdates:p,sliceSize:c,strides:h,outputSize:f}=n.backend_util.calculateShapes(s,o,u),m=r.bufferSync(o);switch(s.dtype){case"bool":{let e=r.bufferSync(s),a=!!r.data.get(i.dataId).values[0];t=(0,aN.N)(m,e,u,f,c,p,d,h,a,!1);break}case"float32":{let e=r.bufferSync(s),a=r.data.get(i.dataId).values[0];t=(0,aN.N)(m,e,u,f,c,p,d,h,a,!1);break}case"int32":{let e=r.bufferSync(s),a=r.data.get(i.dataId).values[0];t=(0,aN.N)(m,e,u,f,c,p,d,h,a,!1);break}case"string":{let e=r.bufferSync(s),a=n.D5U.decodeString(r.data.get(i.dataId).values[0]);t=(0,aN.N)(m,e,u,f,c,p,d,h,a,!1);break}default:throw Error(`Unsupported type ${s.dtype}`)}return r.makeTensorInfo(u,t.dtype,t.values)}},aY={kernelName:n.L8s,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:r}=e,{x:l}=t,{numOrSizeSplits:o,axis:s}=r,i=n.D5U.parseAxisParam(s,l.shape)[0],u=n.backend_util.prepareSplitSize(l,o,i),d=Array(l.shape.length).fill(0),p=l.shape.slice();return u.map(e=>{let t=[...p];t[i]=e;let n=(0,K.tP)({inputs:{x:l},backend:a,attrs:{begin:d,size:t}});return d[i]+=e,n})}};var aX=a(36374);/**
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
 */let aK={kernelName:n.bK0,backendName:"cpu",kernelFunc:({inputs:e,backend:t})=>{let{x:a}=e;(0,r.H)(a,"square");let n=t.data.get(a.dataId).values,l=new Float32Array(n.length);for(let e=0;e<n.length;++e){let t=n[e];l[e]=t*t}let o=t.write(l,a.shape,a.dtype);return{dataId:o,shape:a.shape,dtype:a.dtype}}},aQ=(0,p.b)((e,t)=>{let a=e-t;return a*a}),aJ=(0,R.j)(n._tC,aQ),a0={kernelName:n._tC,backendName:"cpu",kernelFunc:aJ};var a1=a(26808);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let a2=(0,o.A)(n.h8e,(e,t)=>isNaN(e)?NaN:e>0?1:t.alpha),a3={kernelName:n.h8e,backendName:"cpu",kernelFunc:a2};var a5=a(37025);let a6={kernelName:n.jQk,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:a,backend:l,attrs:o}=e,{x:s}=a,{begin:i,end:u,strides:d,beginMask:p,endMask:c,ellipsisMask:h,newAxisMask:f,shrinkAxisMask:m}=o;(0,r.H)(s,"stridedSlice");let{finalShapeSparse:k,finalShape:g,isIdentity:I,sliceDim0:y,isSimpleSlice:b,begin:v,end:x,strides:N}=n.kuN.sliceInfo(s.shape,i,u,d,p,c,h,f,m);if(I)t=reshape({inputs:{x:s},backend:l,attrs:{shape:g}});else if(y||b){n.D5U.assert(s.shape.length>=1,()=>`Input must have rank at least 1, got: ${s.shape.length}`);let e=n.kuN.computeOutShape(v,x,N),a=(0,K.tP)({inputs:{x:s},backend:l,attrs:{begin:v,size:e}});t=reshape({inputs:{x:a},backend:l,attrs:{shape:g}}),l.disposeIntermediateTensorInfo(a)}else{let e=l.bufferSync(s),a=(0,a5.t)(k,e,N,v);t=l.makeTensorInfo(g,a.dtype,a.values)}return t}};var a4=a(27414);let a9={kernelName:n._JP,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{separator:r,nGramWidths:l,leftPad:o,rightPad:s,padWidth:i,preserveShortSequences:u}=n,{data:d,dataSplits:p}=t,c=a.data.get(d.dataId).values,h=a.data.get(p.dataId).values,[f,m]=(0,a4.A)(c,h,r,l,o,s,i,u);return[a.makeTensorInfo([f.length],"string",f),a.makeTensorInfo(p.shape,"int32",m)]}};var a7=a(93157);let a8={kernelName:n.s1s,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{skipEmpty:r}=n,{input:l,delimiter:o}=t;if("string"!==l.dtype)throw Error("Input must be of datatype string");if(1!==l.shape.length)throw Error(`Input must be a vector, got shape: ${l.shape}`);if(0!==o.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=a.data.get(l.dataId).values,i=a.data.get(o.dataId).values[0],[u,d,p]=(0,a7.Q)(s,i,r),c=d.length;return[a.makeTensorInfo([c,2],"int32",u),a.makeTensorInfo([c],"string",d),a.makeTensorInfo([2],"int32",new Int32Array(p))]}};var ne=a(80912);let nt={kernelName:n.XkS,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{numBuckets:r}=n,{input:l}=t;if("string"!==l.dtype)throw Error("Input must be of datatype string");if(r<=0)throw Error("Number of buckets must be at least 1");let o=a.data.get(l.dataId).values,s=(0,ne.h)(o,r);return a.makeTensorInfo(l.shape,"int32",s)}},na=(0,o.A)(n.sEM,e=>Math.tan(e)),nn={kernelName:n.sEM,backendName:"cpu",kernelFunc:na},nr=(0,o.A)(n.MIZ,e=>Math.tanh(e)),nl={kernelName:n.MIZ,backendName:"cpu",kernelFunc:nr},no={kernelName:n.SIB,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:a}=e,{tensor:r,indices:l,updates:o}=t,{sliceRank:s,numUpdates:i,sliceSize:u,strides:d,outputSize:p}=n.backend_util.calculateShapes(o,l,r.shape),c=a.bufferSync(l),h=a.bufferSync(o),f=a.bufferSync(r),m=(0,aN.N)(c,h,r.shape,p,u,i,s,d,f,!1);return a.makeTensorInfo(r.shape,m.dtype,m.values)}};var ns=a(67674);let ni={kernelName:n.n9L,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:l}=t,{reps:o}=n;(0,r.H)(l,"tile");let s=(0,ns.R)(a.bufferSync(l),o);return a.makeTensorInfo(s.shape,s.dtype,s.values)}};var nu=a(88936);let nd={kernelName:n.cWu,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{x:l}=t,{k:o,sorted:s}=n;(0,r.H)(l,"topk");let i=a.data.get(l.dataId).values,[u,d]=(0,nu.W)(i,l.shape,l.dtype,o,s);return[a.makeTensorInfo(u.shape,u.dtype,u.values),a.makeTensorInfo(d.shape,d.dtype,d.values)]}},np={kernelName:n.wx7,backendName:"cpu",kernelFunc:/**
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
 */function(e){let{inputs:t,attrs:a,backend:r}=e,{image:l,transforms:o}=t,{interpolation:s,fillMode:i,fillValue:u,outputShape:d}=a,[p,c,h,f]=l.shape,[m,k]=null!=d?d:[c,h],g=[p,m,k,f],I=n.D5U.computeStrides(l.shape),y=I[0],b=I[1],v=I[2],x=n.D5U.computeStrides(g),N=x[0],D=x[1],S=x[2],T=n.D5U.getTypedArrayFromDType(l.dtype,n.D5U.sizeFromShape(g));T.fill(u);let F=r.data.get(l.dataId).values,M=r.data.get(o.dataId).values;for(let e=0;e<p;++e){let t=1===o.shape[0]?M:M.subarray(8*e,8*e+8);for(let a=0;a<m;++a)for(let n=0;n<k;++n)for(let r=0;r<f;++r){let l;let o=t[6]*n+t[7]*a+1;if(0===o)continue;let d=(t[0]*n+t[1]*a+t[2])/o,p=(t[3]*n+t[4]*a+t[5])/o,f=mapCoord(d,h,i),m=mapCoord(p,c,i);switch(s){case"nearest":l=function(e,t,a,n,r,l,o,s,i,u,d){let p=Math.round(s),c=Math.round(i);return readWithFillValue(e,t,a,n,r,l,o,p,c,u,d)}(F,c,h,y,b,v,e,m,f,r,u);break;case"bilinear":l=function(e,t,a,n,r,l,o,s,i,u,d){let p=Math.floor(s),c=Math.floor(i),h=p+1,f=c+1,m=(f-i)*readWithFillValue(e,t,a,n,r,l,o,p,c,u,d)+(i-c)*readWithFillValue(e,t,a,n,r,l,o,p,f,u,d),k=(f-i)*readWithFillValue(e,t,a,n,r,l,o,h,c,u,d)+(i-c)*readWithFillValue(e,t,a,n,r,l,o,h,f,u,d);return(h-s)*m+(s-p)*k}(F,c,h,y,b,v,e,m,f,r,u);break;default:throw Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${s}`)}let k=e*N+a*D+n*S+r;T[k]=l}return r.makeTensorInfo(g,l.dtype,T)}let w=r.write(T,g,l.dtype);return{dataId:w,shape:l.shape,dtype:l.dtype}}};function mapCoord(e,t,a){switch(a){case"reflect":return function(e,t){let a=e;if(a<0){if(t<=1)a=0;else{let e=2*t;a<e&&(a=e*Math.trunc(-a/e)+a),a=a<-t?a+e:-a-1}}else if(a>t-1){if(t<=1)a=0;else{let e=2*t;(a-=e*Math.trunc(a/e))>=t&&(a=e-a-1)}}return n.D5U.clamp(0,a,t-1)}(e,t);case"wrap":return function(e,t){let a=e;if(a<0){if(t<=1)a=0;else{let e=t-1;a+=t*(Math.trunc(-a/e)+1)}}else if(a>t-1){if(t<=1)a=0;else{let e=t-1;a-=t*Math.trunc(a/e)}}return n.D5U.clamp(0,a,t-1)}(e,t);case"nearest":return n.D5U.clamp(0,e,t-1);default:return e}}function readWithFillValue(e,t,a,n,r,l,o,s,i,u,d){return 0<=s&&s<t&&0<=i&&i<a?e[o*n+s*r+i*l+u]:d}var nc=a(78305);let nh={kernelName:n.kpP,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,attrs:a,backend:n}=e,{axis:l}=a,{x:o}=t;(0,r.H)(o,"unique");let s=n.data.get(o.dataId).values,{outputValues:i,outputShape:u,indices:d}=(0,nc.S)(s,l,o.shape,o.dtype);return[n.makeTensorInfo(u,o.dtype,i),n.makeTensorInfo([d.length],"int32",d)]}},nf={kernelName:n.ToN,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:n}=e,{value:r}=t,{axis:l}=n;l<0&&(l+=r.shape.length);let o=r.shape.length,s=r.shape[l],i=Array(o-1),u=0;for(let e=0;e<o;e++)e!==l&&(i[u++]=r.shape[e]);let d=Array(o).fill(0),p=r.shape.slice();p[l]=1;let c=Array(s);for(let e=0;e<c.length;e++){d[l]=e;let t=(0,K.tP)({inputs:{x:r},backend:a,attrs:{begin:d,size:p}});c[e]=reshape({inputs:{x:t},backend:a,attrs:{shape:i}}),a.disposeIntermediateTensorInfo(t)}return c}},nm={kernelName:n.Qvg,backendName:"cpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:a,attrs:l}=e,{x:o,segmentIds:s}=t,{numSegments:i}=l;(0,r.H)(o,"unsortedSegmentSum");let u=o.shape.length,d=s.shape.length,p=[],c=[],h=u-d,f=s;for(let e=0;e<h;++e){let t=expandDims({inputs:{input:f},backend:a,attrs:{dim:e+1}});f=t,c.push(t)}for(let e=0;e<i;++e){let t=n.D5U.createScalarValue(e,"int32"),r=a.makeTensorInfo([],"int32",t),l=(0,eV.Dg)({inputs:{a:r,b:f},backend:a}),s=(0,en.pj)({inputs:{x:l},backend:a,attrs:{dtype:"float32"}}),i=(0,eP.Jp)({inputs:{a:s,b:o},backend:a}),u=sum({inputs:{x:i},backend:a,attrs:{axis:0,keepDims:!1}});p.push(u),c.push(r),c.push(l),c.push(s),c.push(i),c.push(u)}let m=pack({inputs:p,backend:a,attrs:{axis:0}});return c.forEach(e=>a.disposeIntermediateTensorInfo(e)),m}},nk=[x,N.fC,S,F,y.j4,M,A,U,_,H,z,C,W,O,G,q,B,L,Y,v,X,Q,ee,et.T0,ea,en.Mq,er.y2,eo,es.z,ei,ec,eh,ef,em,ek,eg,eI,eb,ex,eN,eD,eS,eT,eF,eM,ew,eA,eU,e_,eH,eE,ez,eW,i,eR,eV.Kx,eY,eX.SX,eK,eQ.Vu,e3,e5,e6,e4.Ao,e8,te,tt,tn,tl,to.Ce,ts.V,u.I,ti,ed,td,tc,tf,d,tm.zh,tk.m3,tI,ty.xM,tv,tD,tT,tw,tA,tU,tE,tz.eJ,tP,tC,t$,tW,tR,tV,tZ,tO.u0,tj,tB,tX,eP.f$,tK.AF,tJ,t1,t3,t5.nP,t6,t9,t7,t8,aa,h,an.Iz,al,as,au,ap,ep.O,e1,ah,m,g,b,af,am,ak,ag,aI,ay,av,ax.FY,aD,aS,aT,aA,I.BP,a_,aE,aP,K.C6,tY,aW,aR,aZ,aj,aq,aB,aL,aY,aX.cz,aK,a0,a1.j,a3,a6,a9,a8,nt,e2.GR,e$,nn,nl,no,ni,nd,np,w.b,nh,nf,nm,t4];for(let e of nk)(0,n.wCN)(e);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */},8058:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("ArrowDownToDot",[["path",{d:"M12 2v14",key:"jyx4ut"}],["path",{d:"m19 9-7 7-7-7",key:"1oe3oy"}],["circle",{cx:"12",cy:"21",r:"1",key:"o0uj5v"}]])},31538:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("AudioLines",[["path",{d:"M2 10v3",key:"1fnikh"}],["path",{d:"M6 6v11",key:"11sgs0"}],["path",{d:"M10 3v18",key:"yhl04a"}],["path",{d:"M14 8v7",key:"3a1oy3"}],["path",{d:"M18 5v13",key:"123xd1"}],["path",{d:"M22 10v3",key:"154ddg"}]])},99376:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("AudioWaveform",[["path",{d:"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",key:"57tc96"}]])},16470:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]])},16195:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]])},66705:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]])},72263:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("List",[["line",{x1:"8",x2:"21",y1:"6",y2:"6",key:"7ey8pc"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12",key:"rjfblc"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18",key:"c3b1m8"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6",key:"1g7gq3"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12",key:"1pjlvk"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18",key:"28t2mc"}]])},83839:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Move3d",[["path",{d:"M5 3v16h16",key:"1mqmf9"}],["path",{d:"m5 19 6-6",key:"jh6hbb"}],["path",{d:"m2 6 3-3 3 3",key:"tkyvxa"}],["path",{d:"m18 16 3 3-3 3",key:"1d4glt"}]])},43983:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("MoveDiagonal2",[["polyline",{points:"5 11 5 5 11 5",key:"ncfzxk"}],["polyline",{points:"19 13 19 19 13 19",key:"1mk7hk"}],["line",{x1:"5",x2:"19",y1:"5",y2:"19",key:"mcyte3"}]])},49404:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("MoveDiagonal",[["polyline",{points:"13 5 19 5 19 11",key:"11219e"}],["polyline",{points:"11 19 5 19 5 13",key:"sfq3wq"}],["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}]])},61713:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("MoveHorizontal",[["polyline",{points:"18 8 22 12 18 16",key:"1hqrds"}],["polyline",{points:"6 8 2 12 6 16",key:"f0ernq"}],["line",{x1:"2",x2:"22",y1:"12",y2:"12",key:"1dnqot"}]])},47767:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("MoveRight",[["path",{d:"M18 8L22 12L18 16",key:"1r0oui"}],["path",{d:"M2 12H22",key:"1m8cig"}]])},80966:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("MoveVertical",[["polyline",{points:"8 18 12 22 16 18",key:"1uutw3"}],["polyline",{points:"8 6 12 2 16 6",key:"d60sxy"}],["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}]])},21262:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]])},46639:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("PencilRuler",[["path",{d:"m15 5 4 4",key:"1mk7zo"}],["path",{d:"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13",key:"orapub"}],["path",{d:"m8 6 2-2",key:"115y1s"}],["path",{d:"m2 22 5.5-1.5L21.17 6.83a2.82 2.82 0 0 0-4-4L3.5 16.5Z",key:"hes763"}],["path",{d:"m18 16 2-2",key:"ee94s4"}],["path",{d:"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",key:"cfq27r"}]])},21734:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]])},47826:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},65523:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]])},32962:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("SquareFunction",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3",key:"m1af9g"}],["path",{d:"M9 11.2h5.7",key:"3zgcl2"}]])},31517:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var n=a(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n.Z)("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]])},25374:function(e,t,a){e.exports=a(64839)},80120:function(e,t,a){var n=a(44115),r=a(58576),l=a(32862),o=a(43879),s=a(72288),i=a(62545),u=a(20019);u.alea=n,u.xor128=r,u.xorwow=l,u.xorshift7=o,u.xor4096=s,u.tychei=i,e.exports=u},44115:function(e,t,a){var n;!function(e,r,l){function Alea(e){var t,a=this,n=(t=4022871197,function(e){e=String(e);for(var a=0;a<e.length;a++){var n=.02519603282416938*(t+=e.charCodeAt(a));t=n>>>0,n-=t,n*=t,t=n>>>0,n-=t,t+=4294967296*n}return(t>>>0)*23283064365386963e-26});a.next=function(){var e=2091639*a.s0+23283064365386963e-26*a.c;return a.s0=a.s1,a.s1=a.s2,a.s2=e-(a.c=0|e)},a.c=1,a.s0=n(" "),a.s1=n(" "),a.s2=n(" "),a.s0-=n(e),a.s0<0&&(a.s0+=1),a.s1-=n(e),a.s1<0&&(a.s1+=1),a.s2-=n(e),a.s2<0&&(a.s2+=1)}function copy(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function impl(e,t){var a=new Alea(e),n=t&&t.state,r=a.next;return r.int32=function(){return 4294967296*a.next()|0},r.double=function(){return r()+(2097152*r()|0)*11102230246251565e-32},r.quick=r,n&&("object"==typeof n&&copy(n,a),r.state=function(){return copy(a,{})}),r}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.alea=impl}(0,e=a.nmd(e),a.amdD)},62545:function(e,t,a){var n;!function(e,r,l){function XorGen(e){var t=this,a="";t.next=function(){var e=t.b,a=t.c,n=t.d,r=t.a;return e=e<<25^e>>>7^a,a=a-n|0,n=n<<24^n>>>8^r,r=r-e|0,t.b=e=e<<20^e>>>12^a,t.c=a=a-n|0,t.d=n<<16^a>>>16^r,t.a=r-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):a+=e;for(var n=0;n<a.length+20;n++)t.b^=0|a.charCodeAt(n),t.next()}function copy(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function impl(e,t){var a=new XorGen(e),n=t&&t.state,prng=function(){return(a.next()>>>0)/4294967296};return prng.double=function(){do var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=a.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,a),prng.state=function(){return copy(a,{})}),prng}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.tychei=impl}(0,e=a.nmd(e),a.amdD)},58576:function(e,t,a){var n;!function(e,r,l){function XorGen(e){var t=this,a="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:a+=e;for(var n=0;n<a.length+64;n++)t.x^=0|a.charCodeAt(n),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function impl(e,t){var a=new XorGen(e),n=t&&t.state,prng=function(){return(a.next()>>>0)/4294967296};return prng.double=function(){do var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=a.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,a),prng.state=function(){return copy(a,{})}),prng}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.xor128=impl}(0,e=a.nmd(e),a.amdD)},72288:function(e,t,a){var n;!function(e,r,l){function XorGen(e){var t=this;t.next=function(){var e,a,n=t.w,r=t.X,l=t.i;return t.w=n=n+1640531527|0,a=r[l+34&127],e=r[l=l+1&127],a^=a<<13,e^=e<<17,a^=a>>>15,e^=e>>>12,a=r[l]=a^e,t.i=l,a+(n^n>>>16)|0},function(e,t){var a,n,r,l,o,s=[],i=128;for(t===(0|t)?(n=t,t=null):(t+="\x00",n=0,i=Math.max(i,t.length)),r=0,l=-32;l<i;++l)t&&(n^=t.charCodeAt((l+32)%t.length)),0===l&&(o=n),n^=n<<10,n^=n>>>15,n^=n<<4,n^=n>>>13,l>=0&&(o=o+1640531527|0,r=0==(a=s[127&l]^=n+o)?r+1:0);for(r>=128&&(s[127&(t&&t.length||0)]=-1),r=127,l=512;l>0;--l)n=s[r+34&127],a=s[r=r+1&127],n^=n<<13,a^=a<<17,n^=n>>>15,a^=a>>>12,s[r]=n^a;e.w=o,e.X=s,e.i=r}(t,e)}function copy(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function impl(e,t){null==e&&(e=+new Date);var a=new XorGen(e),n=t&&t.state,prng=function(){return(a.next()>>>0)/4294967296};return prng.double=function(){do var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=a.next,prng.quick=prng,n&&(n.X&&copy(n,a),prng.state=function(){return copy(a,{})}),prng}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.xor4096=impl}(0,e=a.nmd(e),a.amdD)},43879:function(e,t,a){var n;!function(e,r,l){function XorGen(e){var t=this;t.next=function(){var e,a,n=t.x,r=t.i;return e=n[r],e^=e>>>7,a=e^e<<24^((e=n[r+1&7])^e>>>10)^((e=n[r+3&7])^e>>>3)^((e=n[r+4&7])^e<<7),e=n[r+7&7],e^=e<<13,a^=e^e<<9,n[r]=a,t.i=r+1&7,a},function(e,t){var a,n=[];if(t===(0|t))n[0]=t;else for(a=0,t=""+t;a<t.length;++a)n[7&a]=n[7&a]<<15^t.charCodeAt(a)+n[a+1&7]<<13;for(;n.length<8;)n.push(0);for(a=0;a<8&&0===n[a];++a);for(8==a?n[7]=-1:n[a],e.x=n,e.i=0,a=256;a>0;--a)e.next()}(t,e)}function copy(e,t){return t.x=e.x.slice(),t.i=e.i,t}function impl(e,t){null==e&&(e=+new Date);var a=new XorGen(e),n=t&&t.state,prng=function(){return(a.next()>>>0)/4294967296};return prng.double=function(){do var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=a.next,prng.quick=prng,n&&(n.x&&copy(n,a),prng.state=function(){return copy(a,{})}),prng}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.xorshift7=impl}(0,e=a.nmd(e),a.amdD)},32862:function(e,t,a){var n;!function(e,r,l){function XorGen(e){var t=this,a="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:a+=e;for(var n=0;n<a.length+64;n++)t.x^=0|a.charCodeAt(n),n==a.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function impl(e,t){var a=new XorGen(e),n=t&&t.state,prng=function(){return(a.next()>>>0)/4294967296};return prng.double=function(){do var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=a.next,prng.quick=prng,n&&("object"==typeof n&&copy(n,a),prng.state=function(){return copy(a,{})}),prng}r&&r.exports?r.exports=impl:a.amdD&&a.amdO?void 0!==(n=(function(){return impl}).call(t,a,t,r))&&(r.exports=n):this.xorwow=impl}(0,e=a.nmd(e),a.amdD)},20019:function(e,t,a){var n;!function(r,l,o){var s,i=o.pow(256,6),u=o.pow(2,52),d=2*u;function seedrandom(e,t,a){var n=[],p=mixkey(function flatten(e,t){var a,n=[],r=typeof e;if(t&&"object"==r)for(a in e)try{n.push(flatten(e[a],t-1))}catch(e){}return n.length?n:"string"==r?e:e+"\x00"}((t=!0==t?{entropy:!0}:t||{}).entropy?[e,tostring(l)]:null==e?function(){try{var e;return s&&(e=s.randomBytes)?e=e(256):(e=new Uint8Array(256),(r.crypto||r.msCrypto).getRandomValues(e)),tostring(e)}catch(e){var t=r.navigator,a=t&&t.plugins;return[+new Date,r,a,r.screen,tostring(l)]}}():e,3),n),c=new ARC4(n),prng=function(){for(var e=c.g(6),t=i,a=0;e<u;)e=(e+a)*256,t*=256,a=c.g(1);for(;e>=d;)e/=2,t/=2,a>>>=1;return(e+a)/t};return prng.int32=function(){return 0|c.g(4)},prng.quick=function(){return c.g(4)/4294967296},prng.double=prng,mixkey(tostring(c.S),l),(t.pass||a||function(e,t,a,n){return(n&&(n.S&&copy(n,c),e.state=function(){return copy(c,{})}),a)?(o.random=e,t):e})(prng,p,"global"in t?t.global:this==o,t.state)}function ARC4(e){var t,a=e.length,n=this,r=0,l=n.i=n.j=0,o=n.S=[];for(a||(e=[a++]);r<256;)o[r]=r++;for(r=0;r<256;r++)o[r]=o[l=255&l+e[r%a]+(t=o[r])],o[l]=t;(n.g=function(e){for(var t,a=0,r=n.i,l=n.j,o=n.S;e--;)t=o[r=255&r+1],a=256*a+o[255&(o[r]=o[l=255&l+t])+(o[l]=t)];return n.i=r,n.j=l,a})(256)}function copy(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function mixkey(e,t){for(var a,n=e+"",r=0;r<n.length;)t[255&r]=255&(a^=19*t[255&r])+n.charCodeAt(r++);return tostring(t)}function tostring(e){return String.fromCharCode.apply(0,e)}if(mixkey(o.random(),l),e.exports){e.exports=seedrandom;try{s=a(21440)}catch(e){}}else void 0!==(n=(function(){return seedrandom}).call(t,a,t,e))&&(e.exports=n)}("undefined"!=typeof self?self:this,[],Math)},71576:function(e,t,a){"use strict";let n;a.d(t,{Z:function(){return esm_browser_v4}});let r="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var l={randomUUID:r};let o=new Uint8Array(16),s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));var esm_browser_v4=function(e,t,a){if(l.randomUUID&&!t&&!e)return l.randomUUID();e=e||{};let r=e.random||(e.rng||function(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(o)})();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){a=a||0;for(let e=0;e<16;++e)t[a+e]=r[e];return t}return function(e,t=0){return s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]}(r)}},54456:function(e,t,a){"use strict";function $ae6933e535247d3d$export$7d15b64cf5a3a4c4(e,[t,a]){return Math.min(a,Math.max(t,e))}a.d(t,{u:function(){return $ae6933e535247d3d$export$7d15b64cf5a3a4c4}})},73184:function(e,t,a){"use strict";a.d(t,{bU:function(){return V},e6:function(){return R},fC:function(){return $},fQ:function(){return W}});var n=a(36577),r=a(39164),l=a(54456),o=a(91036),s=a(50320),i=a(74706),u=a(34952),d=a(69770),p=a(76843),c=a(25800),h=a(32558),f=a(44910);let m=["PageUp","PageDown"],k=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],g={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},I="Slider",[y,b,v]=(0,f.B)(I),[x,N]=(0,i.b)(I,[v]),[D,S]=x(I),T=(0,r.forwardRef)((e,t)=>{let{name:a,min:i=0,max:d=100,step:p=1,orientation:c="horizontal",disabled:h=!1,minStepsBetweenThumbs:f=0,defaultValue:g=[i],value:I,onValueChange:b=()=>{},onValueCommit:v=()=>{},inverted:x=!1,...N}=e,[S,T]=(0,r.useState)(null),F=(0,s.e)(t,e=>T(e)),M=(0,r.useRef)(new Set),U=(0,r.useRef)(0),_=!S||!!S.closest("form"),H="horizontal"===c?w:A,[E=[],z]=(0,u.T)({prop:I,defaultProp:g,onChange:e=>{var t;let a=[...M.current];null===(t=a[U.current])||void 0===t||t.focus(),b(e)}}),P=(0,r.useRef)(E);function updateValues(e,t,{commit:a}={commit:!1}){let n=(String(p).split(".")[1]||"").length,r=function(e,t){let a=Math.pow(10,t);return Math.round(e*a)/a}(Math.round((e-i)/p)*p+i,n),o=(0,l.u)(r,[i,d]);z((e=[])=>{let n=function(e=[],t,a){let n=[...e];return n[a]=t,n.sort((e,t)=>e-t)}(e,o,t);if(!function(e,t){if(t>0){let a=e.slice(0,-1).map((t,a)=>e[a+1]-t),n=Math.min(...a);return n>=t}return!0}(n,f*p))return e;{U.current=n.indexOf(o);let t=String(n)!==String(e);return t&&a&&v(n),t?n:e}})}return(0,r.createElement)(D,{scope:e.__scopeSlider,disabled:h,min:i,max:d,valueIndexToChangeRef:U,thumbs:M.current,values:E,orientation:c},(0,r.createElement)(y.Provider,{scope:e.__scopeSlider},(0,r.createElement)(y.Slot,{scope:e.__scopeSlider},(0,r.createElement)(H,(0,n.Z)({"aria-disabled":h,"data-disabled":h?"":void 0},N,{ref:F,onPointerDown:(0,o.M)(N.onPointerDown,()=>{h||(P.current=E)}),min:i,max:d,inverted:x,onSlideStart:h?void 0:function(e){let t=function(e,t){if(1===e.length)return 0;let a=e.map(e=>Math.abs(e-t)),n=Math.min(...a);return a.indexOf(n)}(E,e);updateValues(e,t)},onSlideMove:h?void 0:function(e){updateValues(e,U.current)},onSlideEnd:h?void 0:function(){let e=P.current[U.current],t=E[U.current];t!==e&&v(E)},onHomeKeyDown:()=>!h&&updateValues(i,0,{commit:!0}),onEndKeyDown:()=>!h&&updateValues(d,E.length-1,{commit:!0}),onStepKeyDown:({event:e,direction:t})=>{if(!h){let a=m.includes(e.key),n=a||e.shiftKey&&k.includes(e.key),r=U.current,l=E[r],o=p*(n?10:1)*t;updateValues(l+o,r,{commit:!0})}}})))),_&&E.map((e,t)=>(0,r.createElement)($faa2e61a3361514f$var$BubbleInput,{key:t,name:a?a+(E.length>1?"[]":""):void 0,value:e})))}),[F,M]=x(I,{startEdge:"left",endEdge:"right",size:"width",direction:1}),w=(0,r.forwardRef)((e,t)=>{let{min:a,max:l,dir:o,inverted:i,onSlideStart:u,onSlideMove:p,onSlideEnd:c,onStepKeyDown:h,...f}=e,[m,k]=(0,r.useState)(null),I=(0,s.e)(t,e=>k(e)),y=(0,r.useRef)(),b=(0,d.gm)(o),v="ltr"===b,x=v&&!i||!v&&i;function getValueFromPointer(e){let t=y.current||m.getBoundingClientRect(),n=[0,t.width],r=$faa2e61a3361514f$var$linearScale(n,x?[a,l]:[l,a]);return y.current=t,r(e-t.left)}return(0,r.createElement)(F,{scope:e.__scopeSlider,startEdge:x?"left":"right",endEdge:x?"right":"left",direction:x?1:-1,size:"width"},(0,r.createElement)(U,(0,n.Z)({dir:b,"data-orientation":"horizontal"},f,{ref:I,style:{...f.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:e=>{let t=getValueFromPointer(e.clientX);null==u||u(t)},onSlideMove:e=>{let t=getValueFromPointer(e.clientX);null==p||p(t)},onSlideEnd:()=>{y.current=void 0,null==c||c()},onStepKeyDown:e=>{let t=g[x?"from-left":"from-right"].includes(e.key);null==h||h({event:e,direction:t?-1:1})}})))}),A=(0,r.forwardRef)((e,t)=>{let{min:a,max:l,inverted:o,onSlideStart:i,onSlideMove:u,onSlideEnd:d,onStepKeyDown:p,...c}=e,h=(0,r.useRef)(null),f=(0,s.e)(t,h),m=(0,r.useRef)(),k=!o;function getValueFromPointer(e){let t=m.current||h.current.getBoundingClientRect(),n=[0,t.height],r=$faa2e61a3361514f$var$linearScale(n,k?[l,a]:[a,l]);return m.current=t,r(e-t.top)}return(0,r.createElement)(F,{scope:e.__scopeSlider,startEdge:k?"bottom":"top",endEdge:k?"top":"bottom",size:"height",direction:k?1:-1},(0,r.createElement)(U,(0,n.Z)({"data-orientation":"vertical"},c,{ref:f,style:{...c.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:e=>{let t=getValueFromPointer(e.clientY);null==i||i(t)},onSlideMove:e=>{let t=getValueFromPointer(e.clientY);null==u||u(t)},onSlideEnd:()=>{m.current=void 0,null==d||d()},onStepKeyDown:e=>{let t=g[k?"from-bottom":"from-top"].includes(e.key);null==p||p({event:e,direction:t?-1:1})}})))}),U=(0,r.forwardRef)((e,t)=>{let{__scopeSlider:a,onSlideStart:l,onSlideMove:s,onSlideEnd:i,onHomeKeyDown:u,onEndKeyDown:d,onStepKeyDown:p,...c}=e,f=S(I,a);return(0,r.createElement)(h.WV.span,(0,n.Z)({},c,{ref:t,onKeyDown:(0,o.M)(e.onKeyDown,e=>{"Home"===e.key?(u(e),e.preventDefault()):"End"===e.key?(d(e),e.preventDefault()):m.concat(k).includes(e.key)&&(p(e),e.preventDefault())}),onPointerDown:(0,o.M)(e.onPointerDown,e=>{let t=e.target;t.setPointerCapture(e.pointerId),e.preventDefault(),f.thumbs.has(t)?t.focus():l(e)}),onPointerMove:(0,o.M)(e.onPointerMove,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&s(e)}),onPointerUp:(0,o.M)(e.onPointerUp,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&(t.releasePointerCapture(e.pointerId),i(e))})}))}),_=(0,r.forwardRef)((e,t)=>{let{__scopeSlider:a,...l}=e,o=S("SliderTrack",a);return(0,r.createElement)(h.WV.span,(0,n.Z)({"data-disabled":o.disabled?"":void 0,"data-orientation":o.orientation},l,{ref:t}))}),H="SliderRange",E=(0,r.forwardRef)((e,t)=>{let{__scopeSlider:a,...l}=e,o=S(H,a),i=M(H,a),u=(0,r.useRef)(null),d=(0,s.e)(t,u),p=o.values.length,c=o.values.map(e=>$faa2e61a3361514f$var$convertValueToPercentage(e,o.min,o.max)),f=p>1?Math.min(...c):0,m=100-Math.max(...c);return(0,r.createElement)(h.WV.span,(0,n.Z)({"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0},l,{ref:d,style:{...e.style,[i.startEdge]:f+"%",[i.endEdge]:m+"%"}}))}),z="SliderThumb",P=(0,r.forwardRef)((e,t)=>{let a=b(e.__scopeSlider),[l,o]=(0,r.useState)(null),i=(0,s.e)(t,e=>o(e)),u=(0,r.useMemo)(()=>l?a().findIndex(e=>e.ref.current===l):-1,[a,l]);return(0,r.createElement)(C,(0,n.Z)({},e,{ref:i,index:u}))}),C=(0,r.forwardRef)((e,t)=>{var a;let{__scopeSlider:l,index:i,...u}=e,d=S(z,l),p=M(z,l),[f,m]=(0,r.useState)(null),k=(0,s.e)(t,e=>m(e)),g=(0,c.t)(f),I=d.values[i],b=void 0===I?0:$faa2e61a3361514f$var$convertValueToPercentage(I,d.min,d.max),v=(a=d.values.length)>2?`Value ${i+1} of ${a}`:2===a?["Minimum","Maximum"][i]:void 0,x=null==g?void 0:g[p.size],N=x?function(e,t,a){let n=e/2,r=$faa2e61a3361514f$var$linearScale([0,50],[0,n]);return(n-r(t)*a)*a}(x,b,p.direction):0;return(0,r.useEffect)(()=>{if(f)return d.thumbs.add(f),()=>{d.thumbs.delete(f)}},[f,d.thumbs]),(0,r.createElement)("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[p.startEdge]:`calc(${b}% + ${N}px)`}},(0,r.createElement)(y.ItemSlot,{scope:e.__scopeSlider},(0,r.createElement)(h.WV.span,(0,n.Z)({role:"slider","aria-label":e["aria-label"]||v,"aria-valuemin":d.min,"aria-valuenow":I,"aria-valuemax":d.max,"aria-orientation":d.orientation,"data-orientation":d.orientation,"data-disabled":d.disabled?"":void 0,tabIndex:d.disabled?void 0:0},u,{ref:k,style:void 0===I?{display:"none"}:e.style,onFocus:(0,o.M)(e.onFocus,()=>{d.valueIndexToChangeRef.current=i})}))))}),$faa2e61a3361514f$var$BubbleInput=e=>{let{value:t,...a}=e,l=(0,r.useRef)(null),o=(0,p.D)(t);return(0,r.useEffect)(()=>{let e=l.current,a=window.HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(a,"value"),r=n.set;if(o!==t&&r){let a=new Event("input",{bubbles:!0});r.call(e,t),e.dispatchEvent(a)}},[o,t]),(0,r.createElement)("input",(0,n.Z)({style:{display:"none"}},a,{ref:l,defaultValue:t}))};function $faa2e61a3361514f$var$convertValueToPercentage(e,t,a){return(0,l.u)(100/(a-t)*(e-t),[0,100])}function $faa2e61a3361514f$var$linearScale(e,t){return a=>{if(e[0]===e[1]||t[0]===t[1])return t[0];let n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(a-e[0])}}let $=T,W=_,R=E,V=P},76843:function(e,t,a){"use strict";a.d(t,{D:function(){return $010c2913dbd2fe3d$export$5cae361ad82dce8b}});var n=a(39164);function $010c2913dbd2fe3d$export$5cae361ad82dce8b(e){let t=(0,n.useRef)({value:e,previous:e});return(0,n.useMemo)(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}},45489:function(e,t,a){"use strict";function _tagged_template_literal(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,{_:function(){return _tagged_template_literal}})}}]);
//# sourceMappingURL=4293-7d976f65d561cc55.js.map