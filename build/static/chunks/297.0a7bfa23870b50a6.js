"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[297],{60297:function(e,t,r){r.d(t,{addImpl:function(){return a},bincountImpl:function(){return bincountImpl},bincountReduceImpl:function(){return bincountReduceImpl},bitwiseAndImpl:function(){return i},castImpl:function(){return castImpl},ceilImpl:function(){return s},concatImpl:function(){return u.j},equalImpl:function(){return p},expImpl:function(){return m},expm1Impl:function(){return c},floorDivImpl:function(){return f},floorImpl:function(){return h},gatherNdImpl:function(){return gatherNdImpl},gatherV2Impl:function(){return gatherV2Impl},greaterEqualImpl:function(){return d},greaterImpl:function(){return g},lessEqualImpl:function(){return y},lessImpl:function(){return I},linSpaceImpl:function(){return linSpaceImpl},logImpl:function(){return T},maxImpl:function(){return maxImpl},maximumImpl:function(){return S},minimumImpl:function(){return D},multiplyImpl:function(){return b},negImpl:function(){return negImpl},notEqualImpl:function(){return R},prodImpl:function(){return prodImpl},raggedGatherImpl:function(){return raggedGatherImpl},raggedRangeImpl:function(){return raggedRangeImpl},raggedTensorToTensorImpl:function(){return raggedTensorToTensorImpl},rangeImpl:function(){return E.b},rsqrtImpl:function(){return x},scatterImpl:function(){return scatterImpl},sigmoidImpl:function(){return U},simpleAbsImpl:function(){return simpleAbsImpl},sliceImpl:function(){return k.rT},sparseFillEmptyRowsImpl:function(){return sparseFillEmptyRowsImpl},sparseReshapeImpl:function(){return sparseReshapeImpl},sparseSegmentReductionImpl:function(){return sparseSegmentReductionImpl},sqrtImpl:function(){return v},staticRegexReplaceImpl:function(){return A},stridedSliceImpl:function(){return stridedSliceImpl},stringNGramsImpl:function(){return M.A},stringSplitImpl:function(){return _.Q},stringToHashBucketFastImpl:function(){return K.h},subImpl:function(){return O},tileImpl:function(){return tileImpl},topKImpl:function(){return topKImpl},transposeImpl:function(){return transposeImpl},uniqueImpl:function(){return V.S}});var n=r(32307),l=r(60810);/**
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
 */function simpleAbsImpl(e){let t=new Float32Array(e.length);for(let r=0;r<e.length;++r)t[r]=Math.abs(e[r]);return t}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function createSimpleBinaryKernelImpl(e){return(t,r,l,a,o)=>{let i=n.backend_util.assertAndGetBroadcastShape(t,r),s=i.length,u=n.D5U.computeStrides(i),p=n.D5U.sizeFromShape(i),m=n.D5U.getTypedArrayFromDType(o,p),c=t.length,h=r.length,f=n.D5U.computeStrides(t),g=n.D5U.computeStrides(r),d=n.backend_util.getBroadcastDims(t,i),I=n.backend_util.getBroadcastDims(r,i);if(d.length+I.length===0)for(let t=0;t<m.length;++t)m[t]=e(l[t%l.length],a[t%a.length]);else for(let t=0;t<m.length;++t){let r=n.D5U.indexToLoc(t,s,u),o=r.slice(-c);d.forEach(e=>o[e]=0);let i=n.D5U.locToIndex(o,c,f),p=r.slice(-h);I.forEach(e=>p[e]=0);let y=n.D5U.locToIndex(p,h,g);m[t]=e(l[i],a[y])}return[m,i]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function complex(e){let{inputs:t,backend:r}=e,{real:n,imag:l}=t,a=r.data.get(n.dataId).values,o=r.data.get(l.dataId).values,i=r.makeTensorInfo(n.shape,"complex64"),s=r.data.get(i.dataId);return s.complexTensorInfos={real:r.makeTensorInfo(n.shape,"float32",a),imag:r.makeTensorInfo(l.shape,"float32",o)},i}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function identity(e){let{inputs:t,backend:r}=e,{x:n}=t;return r.incRef(n.dataId),{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function castImpl(e,t,r,l){if("int32"===l){let r=Int32Array.from(e);return[t,"int32",r]}if("bool"===l){let l=n.D5U.toTypedArray([0],r),[a,o]=createSimpleBinaryKernelImpl((e,t)=>e!==t?1:0)(t,[],e,l,"bool");return[o,"bool",a]}throw Error(`Error in Cast: failed to cast ${r} to ${l}`)}function cast(e){let{inputs:t,backend:r,attrs:l}=e,{x:a}=t,{dtype:o}=l;if("complex64"===o){if("complex64"===a.dtype)return identity({inputs:{x:a},backend:r});let e=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zeros(e,t,r="float32"){if("complex64"===r){let r=zeros(e,t,"float32"),n=zeros(e,t,"float32");return complex({inputs:{real:r,imag:n},backend:e})}let l=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(t),r);return e.makeTensorInfo(t,r,l)}(r,a.shape,a.dtype),t=cast({inputs:{x:a},backend:r,attrs:{dtype:"float32"}}),l=complex({inputs:{real:t,imag:e},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),l}if("complex64"===a.dtype){let e=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:n}=t,l=r.data.get(n.dataId).complexTensorInfos.real,a=r.data.get(l.dataId).values;return r.makeTensorInfo(l.shape,l.dtype,a)}({inputs:{input:a},backend:r}),t=cast({inputs:{x:e},backend:r,attrs:{dtype:o}});return r.disposeIntermediateTensorInfo(e),t}if(!n.D5U.hasEncodingLoss(a.dtype,o)){let e=identity({inputs:{x:a},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:o}}let i=r.data.get(a.dataId).values,[s,u,p]=castImpl(i,a.shape,a.dtype,o);return r.makeTensorInfo(s,u,p)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function binaryKernelFunc(e,t,r,a){return null==r?({inputs:r,backend:o})=>{let{a:i,b:s}=r;(0,l.H)([i,s],e);let u=o.data.get(i.dataId).values,p=o.data.get(s.dataId).values,m="string"===i.dtype?n.backend_util.fromUint8ToStringArray(u):u,c="string"===i.dtype?n.backend_util.fromUint8ToStringArray(p):p,h=a||i.dtype,[f,g]=t(i.shape,s.shape,m,c,h);return o.makeTensorInfo(g,h,f)}:({inputs:e,backend:n})=>{let{a:l,b:o}=e;if("complex64"===l.dtype||"complex64"===o.dtype){let e=cast({inputs:{x:l},backend:n,attrs:{dtype:"complex64"}}),t=n.data.get(e.dataId),a=t.complexTensorInfos.real,i=t.complexTensorInfos.imag,s=n.data.get(a.dataId).values,u=n.data.get(i.dataId).values,p=cast({inputs:{x:o},backend:n,attrs:{dtype:"complex64"}}),m=n.data.get(p.dataId),c=m.complexTensorInfos.real,h=m.complexTensorInfos.imag,f=n.data.get(c.dataId).values,g=n.data.get(h.dataId).values,[d,I,y]=r(l.shape,o.shape,s,u,f,g),T=n.makeTensorInfo(y,"float32",d),S=n.makeTensorInfo(y,"float32",I),D=complex({inputs:{real:T,imag:S},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(T),n.disposeIntermediateTensorInfo(S),D}{let e=n.data.get(l.dataId).values,r=n.data.get(o.dataId).values,i=a||l.dtype,[s,u]=t(l.shape,o.shape,e,r,i);return n.makeTensorInfo(u,i,s)}}}function createComplexBinaryKernelImpl(e){return(t,r,l,a,o,i)=>{let s=n.backend_util.assertAndGetBroadcastShape(t,r),u=n.D5U.sizeFromShape(s),p=s.length,m=n.D5U.computeStrides(s),c=n.D5U.getTypedArrayFromDType("float32",u),h=n.D5U.getTypedArrayFromDType("float32",u),f=n.backend_util.getBroadcastDims(t,s),g=n.backend_util.getBroadcastDims(r,s),d=n.backend_util.mergeRealAndImagArrays(l,a),I=n.backend_util.mergeRealAndImagArrays(o,i),y=t.length,T=n.D5U.computeStrides(t),S=r.length,D=n.D5U.computeStrides(r);if(f.length+g.length===0)for(let t=0;t<c.length;t++){let r=t%d.length,n=t%I.length,l=e(d[2*r],d[2*r+1],I[2*n],I[2*n+1]);c[t]=l.real,h[t]=l.imag}else for(let t=0;t<c.length;t++){let r=n.D5U.indexToLoc(t,p,m),l=r.slice(-y);f.forEach(e=>l[e]=0);let a=n.D5U.locToIndex(l,y,T),o=r.slice(-S);g.forEach(e=>o[e]=0);let i=n.D5U.locToIndex(o,S,D),s=e(d[2*a],d[2*a+1],I[2*i],I[2*i+1]);c[t]=s.real,h[t]=s.imag}return[c,h,s]}}n.SYM,n.Zz9,n.iJz,n.xJR,n.RFZ;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let a=createSimpleBinaryKernelImpl((e,t)=>e+t),o=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e+r,imag:t+n}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bincountImpl(e,t,r,l,a){let o=n.D5U.sizeFromShape(l),i=n.D5U.makeZerosTypedArray(a,r);for(let r=0;r<e.length;r++){let n=e[r];if(n<0)throw Error("Input x must be non-negative!");n>=a||(o>0?i[n]+=t[r]:i[n]+=1)}return i}function bincountReduceImpl(e,t,r,l=!1){let a=e.shape[0],o=e.shape[1],i=(0,n.f3b)([a,r],t.dtype);for(let n=0;n<a;n++)for(let a=0;a<o;a++){let o=e.get(n,a);if(o<0)throw Error("Input x must be non-negative!");o>=r||(l?i.set(1,n,o):t.size>0?i.set(i.get(n,o)+t.get(n,a),n,o):i.set(i.get(n,o)+1,n,o))}return i}binaryKernelFunc(n.mm_,a,o),n.mm_;/**
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
 */let i=createSimpleBinaryKernelImpl((e,t)=>e&t);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function createSimpleUnaryImpl(e){return(t,r,l)=>{let a=n.D5U.getArrayFromDType(r,t.length);for(let r=0;r<t.length;++r)a[r]=e(t[r],l);return a}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function unaryKernelFunc(e,t,r){let n=createSimpleUnaryImpl(t);return unaryKernelFuncFromImpl(e,n,r)}function unaryKernelFuncFromImpl(e,t,r){return({inputs:a,attrs:o,backend:i})=>{let s;let{x:u}=a;(0,l.H)(u,e);let p=i.data.get(u.dataId).values;if("string"===u.dtype){if(!Array.isArray(p))throw Error("String tensor's value was not an instance of Array");s=n.backend_util.fromUint8ToStringArray(p)}else s=p;let m=r||u.dtype,c=t(s,m,o);return i.makeTensorInfo(u.shape,m,c)}}binaryKernelFunc(n.hCO,i),n.hCO;/**
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
 */let s=createSimpleUnaryImpl(e=>Math.ceil(e));unaryKernelFuncFromImpl(n.gJX,s),n.gJX;var u=r(26330);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let p=createSimpleBinaryKernelImpl((e,t)=>e===t?1:0);binaryKernelFunc(n.hdR,p,null,"bool"),n.hdR;/**
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
 */let m=createSimpleUnaryImpl(e=>Math.exp(e));unaryKernelFuncFromImpl(n.NEP,m,"float32"),n.NEP;/**
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
 */let c=createSimpleUnaryImpl(e=>Math.expm1(e));unaryKernelFuncFromImpl(n.Y0y,c),n.Y0y;/**
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
 */let h=createSimpleUnaryImpl(e=>Math.floor(e));unaryKernelFuncFromImpl(n.OR,h),n.OR;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let f=createSimpleBinaryKernelImpl((e,t)=>Math.floor(e/t));/**
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
 */function gatherNdImpl(e,t,r,l,a,o,i,s,u){let p=(0,n.f3b)([l,o],r);for(let r=0;r<l;r++){let n=[],l=0;for(let t=0;t<a;t++){let o=e[r*a+t];l+=o*i[t],n.push(o)}if(l<0||l>=u/o)throw Error(`Invalid indices: ${n} does not index into ${s}`);for(let e=0;e<o;e++)p.values[r*o+e]=t.get(...t.indexToLoc(l*o+e))}return p}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gatherV2Impl(e,t,r){let l=(0,n.f3b)(r,e.dtype);for(let r=0;r<l.size;++r){let n=l.indexToLoc(r),a=n.slice(),o=a[0],i=a[2],s=t.locToIndex([o,i]);a[2]=t.values[s];let u=e.locToIndex(a);0<=u&&u<e.values.length&&(l.values[r]=e.values[u])}return l}binaryKernelFunc(n.jeX,f,null,"int32"),n.jeX;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let g=createSimpleBinaryKernelImpl((e,t)=>e>t?1:0);binaryKernelFunc(n.iZT,g,null,"bool"),n.iZT;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let d=createSimpleBinaryKernelImpl((e,t)=>e>=t?1:0);binaryKernelFunc(n.Acj,d,null,"bool"),n.Acj;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let I=createSimpleBinaryKernelImpl((e,t)=>e<t?1:0);binaryKernelFunc(n.vtC,I,null,"bool"),n.vtC;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let y=createSimpleBinaryKernelImpl((e,t)=>e<=t?1:0);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function linSpaceImpl(e,t,r){let l=(t-e)/(r-1),a=n.D5U.makeZerosTypedArray(r,"float32");a[0]=e;for(let e=1;e<a.length;e++)a[e]=a[e-1]+l;return a}binaryKernelFunc(n.CAk,y,null,"bool"),n.CAk;/**
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
 */let T=createSimpleUnaryImpl(e=>Math.log(e));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function maxImpl(e,t,r,l){let a=n.D5U.getTypedArrayFromDType(l,n.D5U.sizeFromShape(r));for(let r=0;r<a.length;++r){let n=r*t,l=e[n];for(let r=0;r<t;++r){let t=e[n+r];(Number.isNaN(t)||t>l)&&(l=t)}a[r]=l}return a}unaryKernelFuncFromImpl(n.ZbH,T),n.ZbH;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let S=createSimpleBinaryKernelImpl((e,t)=>Math.max(e,t));binaryKernelFunc(n.BMI,S),n.BMI;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let D=createSimpleBinaryKernelImpl((e,t)=>Math.min(e,t));binaryKernelFunc(n.q8u,D),n.q8u;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let b=createSimpleBinaryKernelImpl((e,t)=>e*t),w=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e*r-t*n,imag:e*n+t*r}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function negImpl(e,t,r){let l=n.D5U.createScalarValue(-1,r);return b([],t,l,e,r)}binaryKernelFunc(n.wYn,b,w),n.wYn,n.kuV;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let R=createSimpleBinaryKernelImpl((e,t)=>e!==t?1:0);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function transposeImpl(e,t,r,l,a){let o=t.length,i=n.D5U.sizeFromShape(t),s=n.D5U.computeStrides(t),u=n.D5U.computeStrides(a),p=n.D5U.getTypedArrayFromDType(r,n.D5U.sizeFromShape(a));for(let t=0;t<i;++t){let r=n.D5U.indexToLoc(t,o,s),a=Array(r.length);for(let e=0;e<a.length;e++)a[e]=r[l[e]];let i=n.D5U.locToIndex(a,o,u);p[i]=e[t]}return p}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function prodImpl(e,t,r,l){let[a,o]=n.backend_util.computeOutAndReduceShapes(e,l),i=(0,n.x8V)(t,"int32"),s=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(a),i),u=n.D5U.sizeFromShape(o);for(let e=0;e<s.length;++e){let t=e*u,n=1;for(let e=0;e<u;++e)n*=r[t+e];s[e]=n}return{outVals:s,outShape:a,outDtype:i}}function computeFlatOuterDims(e,t){let r=e.slice(0,t);for(;r.length<t;)r.push(1);for(let n=t;n<e.length;n++)r[t-1]*=e[n];return r}function raggedGatherImpl(e,t,r,l,a,o,i,s){if(0===e.length)throw Error("paramsNestedSplits must be non empty");if(0===t[0].length)throw Error("Split tensors must not be scalars");let u=t[0][0]-1;if(!/**
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
 */function(e,t,r){e.forEach((e,l)=>{if(e<0||e>=r){let a=n.D5U.indexToLoc(l,t.length,n.D5U.computeStrides(t)).join(",");throw Error(`indices[${a}] = ${e} is not in [0, ${r})`)}})}(o,i,u),0===l.length)throw Error("params.rank must be nonzero");let p=l[0],{outSplits:m,valueSlices:c,numValues:h}=function(e,t,r,n){let l=[],a=0,o=t.length-1+r.length,i=Array(o).fill(null).map(()=>[0]);!function(e,t){for(let r=0;r<e.length;++r){let n=e[r],l=r===e.length-1?t:e[r+1].length;if(0===n.length)throw Error("Ragged splits may not be empty");if(n[0]<0)throw Error("Ragged splits must be non-negative");if(n[n.length-1]>l)throw Error("Ragged splits must not point past values");for(let e=1;e<n.length;++e)if(n[e-1]>n[e])throw Error("Ragged splits must be sorted in ascending order")}}(r,n);let s=1;for(let e=0;e<t.length-1;++e){s*=t[e];let r=t[e+1];for(let t=1;t<s+1;++t)i[e].push(t*r)}for(let n=0;n<e.length;++n){let o=e[n],s=e[n]+1;for(let e=0;e<r.length;++e){let n=r[e],l=e+t.length-1;if(l>=0){let e=i[l],t=e[e.length-1]-n[o];for(let e=o;e<s;++e)i[l].push(n[e+1]+t)}o=n[o],s=n[s]}s!==o&&(l.push([o,s]),a+=s-o)}return{outSplits:i,valueSlices:l,numValues:a}}(o,i,e,p),f=function(e){let t=[];for(let r=0;r<e.length;++r){let l=e[r].length,a=n.D5U.getArrayFromDType("int32",l);t.push(a),e[r].forEach((e,t)=>a[t]=e)}return t}(m),g=function(e,t,r,l,a){let o=t.slice();o[0]=a;let i=n.D5U.getArrayFromDType(r,n.D5U.sizeFromShape(o)),s=e.length,u=0===s?0:s/t[0];return!function(e,t,r,n,l,a){let o=computeFlatOuterDims(t,2)[1],i=computeFlatOuterDims(a,2)[1],s=0;for(let t of r)for(let r=t[0];r<t[1];++r){for(let t=0;t<n;++t)l[s*i+t]=e[r*o+t];++s}}(e,t,l,u,i,o),[i,o]}(r,l,a,c,h);return[f,g[0],g[1]]}function raggedRangeImpl(e,t,r,l,a,o,i){if(t.length>1)throw Error("starts must be a scalar or vector");if(a.length>1)throw Error("limits must be a scalar or vector");if(i.length>1)throw Error("deltas must be a scalar or vector");let s=0===t.length,u=0===a.length,p=0===i.length,m=[];s||m.push(t[0]),u||m.push(a[0]),p||m.push(i[0]);for(let e=1;e<m.length;++e)if(m[e]!==m[e-1])throw Error("starts, limits, and deltas must have the same shape");let c=0===m.length?1:m[0],h=n.D5U.getArrayFromDType("int32",c+1);h[0]=0;for(let t=0;t<c;++t){let r;let n=s?e[0]:e[t],a=u?l[0]:l[t],i=p?o[0]:o[t];if(0===i)throw Error("Requires delta != 0");if(i>0&&a<n||i<0&&a>n)r=0;else if((r=Math.ceil(Math.abs((a-n)/i)))>2147483647)throw Error("Requires ((limit - start) / delta) <= 2147483647");h[t+1]=h[t]+r}let f=h[c],g=n.D5U.getArrayFromDType(r,f),d=0;for(let t=0;t<c;++t){let r=h[t+1]-h[t],n=s?e[0]:e[t],l=p?o[0]:o[t];for(let e=0;e<r;++e)g[d++]=n,n+=l}return[h,g]}binaryKernelFunc(n.yQU,R,null,"bool"),n.yQU,n.G3Y,n.DlI;/**
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
 */var F=n.backend_util.RowPartitionType;let RaggedTensorToTensorOp=class RaggedTensorToTensorOp{constructor(e,t,r,l,a,o,i,s,u,p){this.shape=e,this.shapeShape=t,this.values=r,this.valuesShape=l,this.valuesDType=a,this.defaultValue=o,this.defaultValueShape=i,this.rowPartitionValues=s,this.rowPartitionValuesShapes=u,this.rowPartitionTypes=n.backend_util.getRowPartitionTypesHelper(p),this.raggedRank=n.backend_util.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===F.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===F.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case F.VALUE_ROWIDS:return RaggedTensorToTensorOp.getMaxWidthValueRowID(t);case F.ROW_SPLITS:return RaggedTensorToTensorOp.getMaxWidthRowSplit(t);default:throw Error(`Cannot handle partition type ${F[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(0===t||1===t)return 0;let r=0;for(let n=0;n<t-1;++n){let t=e[n+1]-e[n];t>r&&(r=t)}return r}static getMaxWidthValueRowID(e){let t=e.length;if(0===t)return 0;let r=0,n=e[0],l=0;for(let a=1;a<t;++a){let t=e[a];t!==n&&(n=t,l=Math.max(a-r,l),r=a)}return Math.max(t-r,l)}tensorShapeFromTensor(e,t,r=!0){if(0===t.length){if(-1===e[0])return[];throw Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return makeShape(e,r)}calculateOutputSize(e){let t=this.valuesShape,r=this.defaultValueShape;n.backend_util.validateDefaultValueShape(r,t);let l=this.tensorShapeFromTensor(this.shape,this.shapeShape),a=n.backend_util.combineRaggedTensorToTensorShapes(this.raggedRank,l,t);a[0]<0&&(a[0]=e);for(let e=1;e<=this.raggedRank;++e)a[e]<0&&(a[e]=this.getMaxWidth(e));return a}calculateFirstParentOutputIndex(e,t,r){let l=Math.min(e,r),a=[],o=0;for(let e=0;e<l;++e,o+=t)a.push(o);for(let t=l;t<e;++t)a.push(-1);return n.D5U.assert(a.length===e,()=>"Final length of result must be equal to firstDimension."),a}calculateOutputIndexRowSplit(e,t,r,n){let l=e.length,a=[];for(let o=0;o<l-1;++o){let l=e[o+1]-e[o],i=Math.min(n,l),s=t[o];-1===s&&(i=0);for(let e=0;e<i;++e)a.push(s),s+=r;for(let e=0;e<l-i;++e)a.push(-1)}if(l>0&&a.length!==e[l-1])throw Error("Invalid row split size.");return a}calculateOutputIndexValueRowID(e,t,r,n){let l=e.length,a=[];if(0===l)return[];let o=0,i=e[0];if(i>=t.length)throw Error(`Got currentValueRowId=${i}, which is not less than ${t.length}`);let s=t[i];a.push(s);for(let u=1;u<l;++u){let l=e[u];if(l===i)s>=0&&(++o<n?s+=r:s=-1);else{if(o=0,i=l,l>=t.length)throw Error(`Got nextValueRowId=${l} which is not less than ${t.length}`);s=t[l]}a.push(s)}if(a.length!==e.length)throw Error("Invalid row ids.");return a}calculateOutputIndex(e,t,r,n){let l=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case F.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(l,t,r,n);case F.ROW_SPLITS:if(l.length-1>t.length)throw Error(`Row partition size is greater than output size: ${l.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(l,t,r,n);default:throw Error(`Unsupported partition type: ${F[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(0===this.rowPartitionTypes.length)throw Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case F.FIRST_DIM_SIZE:return e[0];case F.VALUE_ROWIDS:throw Error("Cannot handle VALUE_ROWIDS in first dimension.");case F.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${F[t]}`)}}compute(){let e=this.rowPartitionValues[0];if(e.length<=0)throw Error("Invalid first partition input. Tensor requires at least one element.");let t=this.getFirstDimensionSize(),r=this.calculateOutputSize(t),l=Array(this.raggedRank+1);l[l.length-1]=1;for(let e=l.length-2;e>=0;--e)l[e]=l[e+1]*r[e+1];let a=makeShape(r,!1),o=n.D5U.getArrayFromDType(this.valuesDType,n.D5U.sizeFromShape(a)),i=l[0]*r[0];if(i>0){let e=this.calculateFirstParentOutputIndex(t,l[0],r[0]);for(let t=1;t<=this.raggedRank;++t){let n=this.calculateOutputIndex(t-1,e,l[t],r[t]);e=n}this.setOutput(this.raggedRank,e,o,a)}return[a,o]}setOutput(e,t,r,l){if(0===r.length)return;let a=this.values,o=l.slice();o=o.slice(e+1);let i=n.D5U.sizeFromShape(o),s=t.length,u=this.defaultValue;if(u.length!==i&&1!==u.length){let e=this.defaultValueShape;(0,n.lub)(()=>{let t=(0,n.XLQ)(u,e),r=(0,n.UFq)(t,o);u=r.dataSync()})}let p=0,m=0,c=0;for(let e=0;e<=s;++e){let n=e<s?t[e]:-1;if(n===c){++c;continue}if(m<c){let e=a.subarray(p*i),t=r.subarray(m*i),n=(c-m)*i;copyArray(t,e,n)}if(e>=s){let e=r.length;n=Math.floor(e/i)}if(n>c){if(1===this.defaultValue.length)r.subarray(c*i,n*i).fill(this.defaultValue[0]),c=n;else for(;n>c;){let e=r.slice(c*i);copyArray(e,u,i),++c}}n<0?(p=e+1,m=c):(p=e,c=(m=c)+1)}}};function copyArray(e,t,r){for(let n=0;n<r;n++)e[n]=t[n]}function makeShape(e,t){let r=[];for(let n of e){if(n<0){if(!t)throw Error(`Dimension ${n} must be >= 0`);if(n<-1)throw Error(`Dimension ${n} must be >= -1`);n=-1}r.push(n)}return r}function raggedTensorToTensorImpl(e,t,r,n,l,a,o,i,s,u){return new RaggedTensorToTensorOp(e,t,r,n,l,a,o,i,s,u).compute()}var E=r(67086);/**
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
 */let x=createSimpleUnaryImpl(e=>1/Math.sqrt(e));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function scatterImpl(e,t,r,l,a,o,i,s,u,p){let m=[l/a,a],c=e.values,h=t.values;if(0===l)return(0,n.f3b)(r,t.dtype);let f=u instanceof n.YDk?u:(0,n.f3b)(m,t.dtype);"string"==typeof u?f.values.fill(u):"number"==typeof u?f.values.fill(u):"boolean"==typeof u&&f.values.fill(+u);for(let e=0;e<o;e++){let n=[],o=0;for(let t=0;t<i;t++){let r=c[e*i+t];n.push(r),o+=r*s[t]}if(o<0||o>=l/a)throw Error(`Invalid indices: ${n} does not index into ${r}`);for(let r=0;r<a;r++)p?f.values[o*a+r]+=h[e*a+r]:f.values[o*a+r]=0===t.rank?h[0]:h[e*a+r]}return f}unaryKernelFuncFromImpl(n.bV0,x),n.bV0;/**
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
 */let U=createSimpleUnaryImpl(e=>1/(1+Math.exp(-e)));unaryKernelFunc(n.a5O,e=>1/(1+Math.exp(-e))),n.a5O;var k=r(7968);/**
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
 */function sparseFillEmptyRowsImpl(e,t,r,l,a,o,i){let s=t[0],u=o[0],p=Array(u),m=Array(s),c=t[1];if(0===u){if(0!==s)throw Error(n.backend_util.getSparseFillEmptyRowsIndicesDenseShapeMismatch(s));let e=n.D5U.getArrayFromDType(r,0),t=n.D5U.getArrayFromDType(a,0);return[e,[0,c],t,p,m]}let h=!0,f=0,g=Array(u).fill(0);for(let t=0;t<s;++t){let r=e[t*c];if(r<0)throw Error(n.backend_util.getSparseFillEmptyRowsNegativeIndexErrorMessage(t,r));if(r>=u)throw Error(n.backend_util.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(t,r,u));++g[r],h=h&&r>=f,f=r}let d=!0;for(let e=0;e<u;++e){let t=0===g[e];p[e]=t,d=d&&!t,g[e]=Math.max(g[e],1),e>0&&(g[e]+=g[e-1])}if(d&&h){for(let e=0;e<s;++e)m[e]=e;return[e,[s,c],l,p,m]}{let t=g[u-1],o=n.D5U.getArrayFromDType(r,t*c),h=n.D5U.getArrayFromDType(a,t),f=Array(u).fill(0);for(let t=0;t<s;++t){let r=e[t*c],n=f[r],a=(0===r?0:g[r-1])+n;f[r]++;for(let r=0;r<c;++r)o[a*c+r]=e[t*c+r];h[a]=l[t],m[t]=a}for(let e=0;e<u;++e){let t=f[e];if(0===t){let t=0===e?0:g[e-1];o[t*c+0]=e;for(let e=1;e<c;++e)o[t*c+e]=0;h[t]=i}}return[o,[t,c],h,p,m]}}/**
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
 */function sparseReshapeImpl(e,t,r,l,a){let o=n.D5U.sizeFromShape(l),i=t[0],s=a.length,u=[],p=1,m=-1;for(let e=0;e<s;++e){let t=a[e];if(-1===t){if(-1!==m)throw Error(n.backend_util.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(m,e));m=e,u.push(1)}else{if(t<0)throw Error(n.backend_util.getSparseReshapeNegativeOutputDimErrorMessage(e,t));p*=t,u.push(t)}}if(-1!==m){if(p<=0)throw Error(n.backend_util.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let e=Math.trunc(o/p);if(p*e!==o)throw Error(n.backend_util.getSparseReshapeInputOutputMultipleErrorMessage(l,u));u[m]=e}let c=n.D5U.sizeFromShape(u);if(c!==o)throw Error(n.backend_util.getSparseReshapeInputOutputMismatchErrorMessage(l,u));let h=l.length,f=[];if(h>0){f[h-1]=1;for(let e=h-2;e>=0;--e)f[e]=f[e+1]*l[e+1]}let g=[];if(s>0){g[s-1]=1;for(let e=s-2;e>=0;--e)g[e]=g[e+1]*u[e+1]}let d=n.D5U.getArrayFromDType(r,i*s);for(let t=0;t<i;++t){let r=0;for(let n=0;n<h;++n)r+=e[t*h+n]*f[n];for(let e=0;e<s;++e)d[t*s+e]=Math.trunc(r/g[e]),r%=g[e]}return[d,[i,s],u]}/**
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
 */function sparseSegmentReductionImpl(e,t,r,l,a,o=!1,i=0){let s=l.length,u=[t[0],e.length/t[0]],p=u[1],m=s>0?a[s-1]+1:0;if(m<0)throw Error(n.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let c=t.slice();c[0]=m;let h=c.reduce((e,t)=>e*t,1),f=n.D5U.getArrayFromDType(r,h);if(0===s)return m>0&&f.fill(i),[f,c];if(m<=0)throw Error(n.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let g=0,d=1,I=0,y=a[0];for(;;){let t=0;if(d<s){if(y===(t=a[d])){++d;continue}if(y>=t)throw Error(n.backend_util.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(y<0||y>=m)throw Error(n.backend_util.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(y,m));y>I&&f.fill(i,I*p,y*p);for(let t=g;t<d;++t){let r=l[t];if(r<0||r>=u[0])throw Error(n.backend_util.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(t,l[t],u[0]));for(let t=0;t<p;t++)f[y*p+t]+=e[r*p+t]}if(o)for(let e=0;e<p;e++)f[y*p+e]/=d-g;if(g=d,++d,I=y+1,y=t,d>s)break}return I<m&&f.fill(i,I*p,m*p),[f,c]}/**
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
 */let v=createSimpleUnaryImpl(e=>Math.sqrt(e));unaryKernelFunc(n.FKq,e=>Math.sqrt(e)),n.FKq;/**
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
 */let A=createSimpleUnaryImpl((e,t)=>{let{pattern:r,replaceGlobal:n,rewrite:l}=t;return e.replace(new RegExp(r,n?"g":""),l)});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function stridedSliceImpl(e,t,r,l){let a=(0,n.f3b)(e,t.dtype);for(let e=0;e<a.size;e++){let n=a.indexToLoc(e),o=Array(n.length);for(let e=0;e<o.length;e++)o[e]=n[e]*r[e]+l[e];a.set(t.get(...o),...n)}return a}unaryKernelFuncFromImpl(n.e0R,A),n.e0R;var M=r(501),_=r(24495),K=r(43709);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let O=createSimpleBinaryKernelImpl((e,t)=>e-t),P=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e-r,imag:t-n}));/**
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
 */function tileImpl(e,t){let r=Array(e.rank);for(let n=0;n<r.length;n++)r[n]=e.shape[n]*t[n];let l=(0,n.f3b)(r,e.dtype);for(let t=0;t<l.values.length;++t){let r=l.indexToLoc(t),n=Array(e.rank);for(let t=0;t<n.length;t++)n[t]=r[t]%e.shape[t];let a=e.locToIndex(n);l.values[t]=e.values[a]}return l}binaryKernelFunc(n.Tr8,O,P),n.Tr8;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let comparePair=(e,t)=>{let r=t.value-e.value;return 0===r?e.index-t.index:r};function topKImpl(e,t,r,l,a){let o=t[t.length-1],[i,s]=[e.length/o,o],u=n.D5U.getTypedArrayFromDType(r,i*l),p=n.D5U.getTypedArrayFromDType("int32",i*l);for(let t=0;t<i;t++){let r=t*s,o=e.subarray(r,r+s),i=Array(o.length);o.forEach((e,t)=>i[t]={value:e,index:t}),l<i.length&&(function TopK_impl_select(e,t,r=0,l=e.length-1){for(;l>r;){if(l-r>600){let n=l-r+1,a=t-r+1,o=Math.log(n),i=.5*Math.exp(2*o/3),s=.5*Math.sqrt(o*i*(n-i)/n)*Math.sign(a-n/2),u=Math.max(r,Math.floor(t-a*i/n+s)),p=Math.min(l,Math.floor(t+(n-a)*i/n+s));TopK_impl_select(e,t,u,p)}let a=e[t],o=r,i=l;for(n.D5U.swap(e,r,t),comparePair(e[l],a)>0&&n.D5U.swap(e,r,l);o<i;){for(n.D5U.swap(e,o,i),o++,i--;0>comparePair(e[o],a);)o+=1;for(;comparePair(e[i],a)>0;)i-=1}0===comparePair(e[r],a)?n.D5U.swap(e,r,i):(i+=1,n.D5U.swap(e,i,l)),i<=t&&(r=i+1),t<=i&&(l=i-1)}}(i,l),i=i.slice(0,l)),a&&i.sort(comparePair);let m=t*l,c=u.subarray(m,m+l),h=p.subarray(m,m+l);for(let e=0;e<l;e++)c[e]=i[e].value,h[e]=i[e].index}let m=t.slice();return m[m.length-1]=l,[(0,n.f3b)(m,r,u),(0,n.f3b)(m,"int32",p)]}var V=r(10938);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */}}]);
//# sourceMappingURL=297.0a7bfa23870b50a6.js.map