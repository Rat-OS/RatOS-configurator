(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5233],{40300:function(e,t,r){"use strict";r.d(t,{addImpl:function(){return a},bincountImpl:function(){return bincountImpl},bincountReduceImpl:function(){return bincountReduceImpl},bitwiseAndImpl:function(){return o},castImpl:function(){return castImpl},ceilImpl:function(){return s},concatImpl:function(){return concatImpl},equalImpl:function(){return l},expImpl:function(){return u},expm1Impl:function(){return c},floorDivImpl:function(){return h},floorImpl:function(){return d},gatherNdImpl:function(){return gatherNdImpl},gatherV2Impl:function(){return gatherV2Impl},greaterEqualImpl:function(){return p},greaterImpl:function(){return f},lessEqualImpl:function(){return g},lessImpl:function(){return m},linSpaceImpl:function(){return linSpaceImpl},logImpl:function(){return y},maxImpl:function(){return maxImpl},maximumImpl:function(){return x},minimumImpl:function(){return b},multiplyImpl:function(){return v},negImpl:function(){return negImpl},notEqualImpl:function(){return w},prodImpl:function(){return prodImpl},raggedGatherImpl:function(){return raggedGatherImpl},raggedRangeImpl:function(){return raggedRangeImpl},raggedTensorToTensorImpl:function(){return raggedTensorToTensorImpl},rangeImpl:function(){return rangeImpl},rsqrtImpl:function(){return k},scatterImpl:function(){return scatterImpl},sigmoidImpl:function(){return $},simpleAbsImpl:function(){return simpleAbsImpl},sliceImpl:function(){return sliceImpl},sparseFillEmptyRowsImpl:function(){return sparseFillEmptyRowsImpl},sparseReshapeImpl:function(){return sparseReshapeImpl},sparseSegmentReductionImpl:function(){return sparseSegmentReductionImpl},sqrtImpl:function(){return A},staticRegexReplaceImpl:function(){return N},stridedSliceImpl:function(){return stridedSliceImpl},stringNGramsImpl:function(){return stringNGramsImpl},stringSplitImpl:function(){return stringSplitImpl},stringToHashBucketFastImpl:function(){return stringToHashBucketFastImpl},subImpl:function(){return F},tileImpl:function(){return tileImpl},topKImpl:function(){return topKImpl},transposeImpl:function(){return transposeImpl},uniqueImpl:function(){return uniqueImpl}});var n=r(82783);/**
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
 */function assertNotComplex(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&n.D5U.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}/**
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
 */function createSimpleBinaryKernelImpl(e){return(t,r,a,i,o)=>{let s=n.backend_util.assertAndGetBroadcastShape(t,r),l=s.length,u=n.D5U.computeStrides(s),c=n.D5U.sizeFromShape(s),d=n.D5U.getTypedArrayFromDType(o,c),h=t.length,f=r.length,p=n.D5U.computeStrides(t),m=n.D5U.computeStrides(r),g=n.backend_util.getBroadcastDims(t,s),y=n.backend_util.getBroadcastDims(r,s);if(g.length+y.length===0)for(let t=0;t<d.length;++t)d[t]=e(a[t%a.length],i[t%i.length]);else for(let t=0;t<d.length;++t){let r=n.D5U.indexToLoc(t,l,u),o=r.slice(-h);g.forEach(e=>o[e]=0);let s=n.D5U.locToIndex(o,h,p),c=r.slice(-f);y.forEach(e=>c[e]=0);let x=n.D5U.locToIndex(c,f,m);d[t]=e(a[s],i[x])}return[d,s]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function complex(e){let{inputs:t,backend:r}=e,{real:n,imag:a}=t,i=r.data.get(n.dataId).values,o=r.data.get(a.dataId).values,s=r.makeTensorInfo(n.shape,"complex64"),l=r.data.get(s.dataId);return l.complexTensorInfos={real:r.makeTensorInfo(n.shape,"float32",i),imag:r.makeTensorInfo(a.shape,"float32",o)},s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
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
 */function castImpl(e,t,r,a){if("int32"===a){let r=Int32Array.from(e);return[t,"int32",r]}if("bool"===a){let a=n.D5U.toTypedArray([0],r),[i,o]=createSimpleBinaryKernelImpl((e,t)=>e!==t?1:0)(t,[],e,a,"bool");return[o,"bool",i]}throw Error(`Error in Cast: failed to cast ${r} to ${a}`)}function cast(e){let{inputs:t,backend:r,attrs:a}=e,{x:i}=t,{dtype:o}=a;if("complex64"===o){if("complex64"===i.dtype)return identity({inputs:{x:i},backend:r});let e=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zeros(e,t,r="float32"){if("complex64"===r){let r=zeros(e,t,"float32"),n=zeros(e,t,"float32");return complex({inputs:{real:r,imag:n},backend:e})}let a=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(t),r);return e.makeTensorInfo(t,r,a)}(r,i.shape,i.dtype),t=cast({inputs:{x:i},backend:r,attrs:{dtype:"float32"}}),a=complex({inputs:{real:t,imag:e},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),a}if("complex64"===i.dtype){let e=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:n}=t,a=r.data.get(n.dataId).complexTensorInfos.real,i=r.data.get(a.dataId).values;return r.makeTensorInfo(a.shape,a.dtype,i)}({inputs:{input:i},backend:r}),t=cast({inputs:{x:e},backend:r,attrs:{dtype:o}});return r.disposeIntermediateTensorInfo(e),t}if(!n.D5U.hasEncodingLoss(i.dtype,o)){let e=identity({inputs:{x:i},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:o}}let s=r.data.get(i.dataId).values,[l,u,c]=castImpl(s,i.shape,i.dtype,o);return r.makeTensorInfo(l,u,c)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function binaryKernelFunc(e,t,r,a){return null==r?({inputs:r,backend:i})=>{let{a:o,b:s}=r;assertNotComplex([o,s],e);let l=i.data.get(o.dataId).values,u=i.data.get(s.dataId).values,c="string"===o.dtype?n.backend_util.fromUint8ToStringArray(l):l,d="string"===o.dtype?n.backend_util.fromUint8ToStringArray(u):u,h=a||o.dtype,[f,p]=t(o.shape,s.shape,c,d,h);return i.makeTensorInfo(p,h,f)}:({inputs:e,backend:n})=>{let{a:i,b:o}=e;if("complex64"===i.dtype||"complex64"===o.dtype){let e=cast({inputs:{x:i},backend:n,attrs:{dtype:"complex64"}}),t=n.data.get(e.dataId),a=t.complexTensorInfos.real,s=t.complexTensorInfos.imag,l=n.data.get(a.dataId).values,u=n.data.get(s.dataId).values,c=cast({inputs:{x:o},backend:n,attrs:{dtype:"complex64"}}),d=n.data.get(c.dataId),h=d.complexTensorInfos.real,f=d.complexTensorInfos.imag,p=n.data.get(h.dataId).values,m=n.data.get(f.dataId).values,[g,y,x]=r(i.shape,o.shape,l,u,p,m),b=n.makeTensorInfo(x,"float32",g),v=n.makeTensorInfo(x,"float32",y),C=complex({inputs:{real:b,imag:v},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(v),C}{let e=n.data.get(i.dataId).values,r=n.data.get(o.dataId).values,s=a||i.dtype,[l,u]=t(i.shape,o.shape,e,r,s);return n.makeTensorInfo(u,s,l)}}}function createComplexBinaryKernelImpl(e){return(t,r,a,i,o,s)=>{let l=n.backend_util.assertAndGetBroadcastShape(t,r),u=n.D5U.sizeFromShape(l),c=l.length,d=n.D5U.computeStrides(l),h=n.D5U.getTypedArrayFromDType("float32",u),f=n.D5U.getTypedArrayFromDType("float32",u),p=n.backend_util.getBroadcastDims(t,l),m=n.backend_util.getBroadcastDims(r,l),g=n.backend_util.mergeRealAndImagArrays(a,i),y=n.backend_util.mergeRealAndImagArrays(o,s),x=t.length,b=n.D5U.computeStrides(t),v=r.length,C=n.D5U.computeStrides(r);if(p.length+m.length===0)for(let t=0;t<h.length;t++){let r=t%g.length,n=t%y.length,a=e(g[2*r],g[2*r+1],y[2*n],y[2*n+1]);h[t]=a.real,f[t]=a.imag}else for(let t=0;t<h.length;t++){let r=n.D5U.indexToLoc(t,c,d),a=r.slice(-x);p.forEach(e=>a[e]=0);let i=n.D5U.locToIndex(a,x,b),o=r.slice(-v);m.forEach(e=>o[e]=0);let s=n.D5U.locToIndex(o,v,C),l=e(g[2*i],g[2*i+1],y[2*s],y[2*s+1]);h[t]=l.real,f[t]=l.imag}return[h,f,l]}}n.SYM,n.Zz9,n.iJz,n.xJR,n.RFZ;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let a=createSimpleBinaryKernelImpl((e,t)=>e+t),i=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e+r,imag:t+n}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bincountImpl(e,t,r,a,i){let o=n.D5U.sizeFromShape(a),s=n.D5U.makeZerosTypedArray(i,r);for(let r=0;r<e.length;r++){let n=e[r];if(n<0)throw Error("Input x must be non-negative!");n>=i||(o>0?s[n]+=t[r]:s[n]+=1)}return s}function bincountReduceImpl(e,t,r,a=!1){let i=e.shape[0],o=e.shape[1],s=(0,n.f3b)([i,r],t.dtype);for(let n=0;n<i;n++)for(let i=0;i<o;i++){let o=e.get(n,i);if(o<0)throw Error("Input x must be non-negative!");o>=r||(a?s.set(1,n,o):t.size>0?s.set(s.get(n,o)+t.get(n,i),n,o):s.set(s.get(n,o)+1,n,o))}return s}binaryKernelFunc(n.mm_,a,i),n.mm_;/**
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
 */let o=createSimpleBinaryKernelImpl((e,t)=>e&t);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function createSimpleUnaryImpl(e){return(t,r,a)=>{let i=n.D5U.getArrayFromDType(r,t.length);for(let r=0;r<t.length;++r)i[r]=e(t[r],a);return i}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function unaryKernelFunc(e,t,r){let n=createSimpleUnaryImpl(t);return unaryKernelFuncFromImpl(e,n,r)}function unaryKernelFuncFromImpl(e,t,r){return({inputs:a,attrs:i,backend:o})=>{let s;let{x:l}=a;assertNotComplex(l,e);let u=o.data.get(l.dataId).values;if("string"===l.dtype){if(!Array.isArray(u))throw Error("String tensor's value was not an instance of Array");s=n.backend_util.fromUint8ToStringArray(u)}else s=u;let c=r||l.dtype,d=t(s,c,i);return o.makeTensorInfo(l.shape,c,d)}}binaryKernelFunc(n.hCO,o),n.hCO;/**
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
 */let s=createSimpleUnaryImpl(e=>Math.ceil(e));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concatImpl(e,t,r,a){let i=n.D5U.getArrayFromDType(r,n.D5U.sizeFromShape(t));if(a&&"string"!==r){let t=0;e.forEach(e=>{let r=n.D5U.sizeFromShape(e.shape);i.set(e.vals,t),t+=r})}else{let a=0;e.forEach(e=>{let o="string"===r?n.backend_util.fromUint8ToStringArray(e.vals):e.vals,s=0;for(let r=0;r<e.shape[0];++r){let n=r*t[1]+a;for(let t=0;t<e.shape[1];++t)i[n+t]=o[s++]}a+=e.shape[1]})}return i}unaryKernelFuncFromImpl(n.gJX,s),n.gJX;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let l=createSimpleBinaryKernelImpl((e,t)=>e===t?1:0);binaryKernelFunc(n.hdR,l,null,"bool"),n.hdR;/**
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
 */let u=createSimpleUnaryImpl(e=>Math.exp(e));unaryKernelFuncFromImpl(n.NEP,u,"float32"),n.NEP;/**
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
 */let d=createSimpleUnaryImpl(e=>Math.floor(e));unaryKernelFuncFromImpl(n.OR,d),n.OR;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let h=createSimpleBinaryKernelImpl((e,t)=>Math.floor(e/t));/**
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
 */function gatherNdImpl(e,t,r,a,i,o,s,l,u){let c=(0,n.f3b)([a,o],r);for(let r=0;r<a;r++){let n=[],a=0;for(let t=0;t<i;t++){let o=e[r*i+t];a+=o*s[t],n.push(o)}if(a<0||a>=u/o)throw Error(`Invalid indices: ${n} does not index into ${l}`);for(let e=0;e<o;e++)c.values[r*o+e]=t.get(...t.indexToLoc(a*o+e))}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gatherV2Impl(e,t,r){let a=(0,n.f3b)(r,e.dtype);for(let r=0;r<a.size;++r){let n=a.indexToLoc(r),i=n.slice(),o=i[0],s=i[2],l=t.locToIndex([o,s]);i[2]=t.values[l];let u=e.locToIndex(i);0<=u&&u<e.values.length&&(a.values[r]=e.values[u])}return a}binaryKernelFunc(n.jeX,h,null,"int32"),n.jeX;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let f=createSimpleBinaryKernelImpl((e,t)=>e>t?1:0);binaryKernelFunc(n.iZT,f,null,"bool"),n.iZT;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let p=createSimpleBinaryKernelImpl((e,t)=>e>=t?1:0);binaryKernelFunc(n.Acj,p,null,"bool"),n.Acj;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let m=createSimpleBinaryKernelImpl((e,t)=>e<t?1:0);binaryKernelFunc(n.vtC,m,null,"bool"),n.vtC;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let g=createSimpleBinaryKernelImpl((e,t)=>e<=t?1:0);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function linSpaceImpl(e,t,r){let a=(t-e)/(r-1),i=n.D5U.makeZerosTypedArray(r,"float32");i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+a;return i}binaryKernelFunc(n.CAk,g,null,"bool"),n.CAk;/**
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
 */let y=createSimpleUnaryImpl(e=>Math.log(e));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function maxImpl(e,t,r,a){let i=n.D5U.getTypedArrayFromDType(a,n.D5U.sizeFromShape(r));for(let r=0;r<i.length;++r){let n=r*t,a=e[n];for(let r=0;r<t;++r){let t=e[n+r];(Number.isNaN(t)||t>a)&&(a=t)}i[r]=a}return i}unaryKernelFuncFromImpl(n.ZbH,y),n.ZbH;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let x=createSimpleBinaryKernelImpl((e,t)=>Math.max(e,t));binaryKernelFunc(n.BMI,x),n.BMI;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let b=createSimpleBinaryKernelImpl((e,t)=>Math.min(e,t));binaryKernelFunc(n.q8u,b),n.q8u;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let v=createSimpleBinaryKernelImpl((e,t)=>e*t),C=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e*r-t*n,imag:e*n+t*r}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function negImpl(e,t,r){let a=n.D5U.createScalarValue(-1,r);return v([],t,a,e,r)}binaryKernelFunc(n.wYn,v,C),n.wYn,n.kuV;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let w=createSimpleBinaryKernelImpl((e,t)=>e!==t?1:0);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function transposeImpl(e,t,r,a,i){let o=t.length,s=n.D5U.sizeFromShape(t),l=n.D5U.computeStrides(t),u=n.D5U.computeStrides(i),c=n.D5U.getTypedArrayFromDType(r,n.D5U.sizeFromShape(i));for(let t=0;t<s;++t){let r=n.D5U.indexToLoc(t,o,l),i=Array(r.length);for(let e=0;e<i.length;e++)i[e]=r[a[e]];let s=n.D5U.locToIndex(i,o,u);c[s]=e[t]}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function prodImpl(e,t,r,a){let[i,o]=n.backend_util.computeOutAndReduceShapes(e,a),s=(0,n.x8V)(t,"int32"),l=n.D5U.makeZerosTypedArray(n.D5U.sizeFromShape(i),s),u=n.D5U.sizeFromShape(o);for(let e=0;e<l.length;++e){let t=e*u,n=1;for(let e=0;e<u;++e)n*=r[t+e];l[e]=n}return{outVals:l,outShape:i,outDtype:s}}function computeFlatOuterDims(e,t){let r=e.slice(0,t);for(;r.length<t;)r.push(1);for(let n=t;n<e.length;n++)r[t-1]*=e[n];return r}function raggedGatherImpl(e,t,r,a,i,o,s,l){if(0===e.length)throw Error("paramsNestedSplits must be non empty");if(0===t[0].length)throw Error("Split tensors must not be scalars");let u=t[0][0]-1;if(!/**
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
 */function(e,t,r){e.forEach((e,a)=>{if(e<0||e>=r){let i=n.D5U.indexToLoc(a,t.length,n.D5U.computeStrides(t)).join(",");throw Error(`indices[${i}] = ${e} is not in [0, ${r})`)}})}(o,s,u),0===a.length)throw Error("params.rank must be nonzero");let c=a[0],{outSplits:d,valueSlices:h,numValues:f}=function(e,t,r,n){let a=[],i=0,o=t.length-1+r.length,s=Array(o).fill(null).map(()=>[0]);!function(e,t){for(let r=0;r<e.length;++r){let n=e[r],a=r===e.length-1?t:e[r+1].length;if(0===n.length)throw Error("Ragged splits may not be empty");if(n[0]<0)throw Error("Ragged splits must be non-negative");if(n[n.length-1]>a)throw Error("Ragged splits must not point past values");for(let e=1;e<n.length;++e)if(n[e-1]>n[e])throw Error("Ragged splits must be sorted in ascending order")}}(r,n);let l=1;for(let e=0;e<t.length-1;++e){l*=t[e];let r=t[e+1];for(let t=1;t<l+1;++t)s[e].push(t*r)}for(let n=0;n<e.length;++n){let o=e[n],l=e[n]+1;for(let e=0;e<r.length;++e){let n=r[e],a=e+t.length-1;if(a>=0){let e=s[a],t=e[e.length-1]-n[o];for(let e=o;e<l;++e)s[a].push(n[e+1]+t)}o=n[o],l=n[l]}l!==o&&(a.push([o,l]),i+=l-o)}return{outSplits:s,valueSlices:a,numValues:i}}(o,s,e,c),p=function(e){let t=[];for(let r=0;r<e.length;++r){let a=e[r].length,i=n.D5U.getArrayFromDType("int32",a);t.push(i),e[r].forEach((e,t)=>i[t]=e)}return t}(d),m=function(e,t,r,a,i){let o=t.slice();o[0]=i;let s=n.D5U.getArrayFromDType(r,n.D5U.sizeFromShape(o)),l=e.length,u=0===l?0:l/t[0];return!function(e,t,r,n,a,i){let o=computeFlatOuterDims(t,2)[1],s=computeFlatOuterDims(i,2)[1],l=0;for(let t of r)for(let r=t[0];r<t[1];++r){for(let t=0;t<n;++t)a[l*s+t]=e[r*o+t];++l}}(e,t,a,u,s,o),[s,o]}(r,a,i,h,f);return[p,m[0],m[1]]}function raggedRangeImpl(e,t,r,a,i,o,s){if(t.length>1)throw Error("starts must be a scalar or vector");if(i.length>1)throw Error("limits must be a scalar or vector");if(s.length>1)throw Error("deltas must be a scalar or vector");let l=0===t.length,u=0===i.length,c=0===s.length,d=[];l||d.push(t[0]),u||d.push(i[0]),c||d.push(s[0]);for(let e=1;e<d.length;++e)if(d[e]!==d[e-1])throw Error("starts, limits, and deltas must have the same shape");let h=0===d.length?1:d[0],f=n.D5U.getArrayFromDType("int32",h+1);f[0]=0;for(let t=0;t<h;++t){let r;let n=l?e[0]:e[t],i=u?a[0]:a[t],s=c?o[0]:o[t];if(0===s)throw Error("Requires delta != 0");if(s>0&&i<n||s<0&&i>n)r=0;else if((r=Math.ceil(Math.abs((i-n)/s)))>2147483647)throw Error("Requires ((limit - start) / delta) <= 2147483647");f[t+1]=f[t]+r}let p=f[h],m=n.D5U.getArrayFromDType(r,p),g=0;for(let t=0;t<h;++t){let r=f[t+1]-f[t],n=l?e[0]:e[t],a=c?o[0]:o[t];for(let e=0;e<r;++e)m[g++]=n,n+=a}return[f,m]}binaryKernelFunc(n.yQU,w,null,"bool"),n.yQU,n.G3Y,n.DlI;/**
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
 */var _=n.backend_util.RowPartitionType;let RaggedTensorToTensorOp=class RaggedTensorToTensorOp{constructor(e,t,r,a,i,o,s,l,u,c){this.shape=e,this.shapeShape=t,this.values=r,this.valuesShape=a,this.valuesDType=i,this.defaultValue=o,this.defaultValueShape=s,this.rowPartitionValues=l,this.rowPartitionValuesShapes=u,this.rowPartitionTypes=n.backend_util.getRowPartitionTypesHelper(c),this.raggedRank=n.backend_util.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===_.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===_.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case _.VALUE_ROWIDS:return RaggedTensorToTensorOp.getMaxWidthValueRowID(t);case _.ROW_SPLITS:return RaggedTensorToTensorOp.getMaxWidthRowSplit(t);default:throw Error(`Cannot handle partition type ${_[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(0===t||1===t)return 0;let r=0;for(let n=0;n<t-1;++n){let t=e[n+1]-e[n];t>r&&(r=t)}return r}static getMaxWidthValueRowID(e){let t=e.length;if(0===t)return 0;let r=0,n=e[0],a=0;for(let i=1;i<t;++i){let t=e[i];t!==n&&(n=t,a=Math.max(i-r,a),r=i)}return Math.max(t-r,a)}tensorShapeFromTensor(e,t,r=!0){if(0===t.length){if(-1===e[0])return[];throw Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return makeShape(e,r)}calculateOutputSize(e){let t=this.valuesShape,r=this.defaultValueShape;n.backend_util.validateDefaultValueShape(r,t);let a=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=n.backend_util.combineRaggedTensorToTensorShapes(this.raggedRank,a,t);i[0]<0&&(i[0]=e);for(let e=1;e<=this.raggedRank;++e)i[e]<0&&(i[e]=this.getMaxWidth(e));return i}calculateFirstParentOutputIndex(e,t,r){let a=Math.min(e,r),i=[],o=0;for(let e=0;e<a;++e,o+=t)i.push(o);for(let t=a;t<e;++t)i.push(-1);return n.D5U.assert(i.length===e,()=>"Final length of result must be equal to firstDimension."),i}calculateOutputIndexRowSplit(e,t,r,n){let a=e.length,i=[];for(let o=0;o<a-1;++o){let a=e[o+1]-e[o],s=Math.min(n,a),l=t[o];-1===l&&(s=0);for(let e=0;e<s;++e)i.push(l),l+=r;for(let e=0;e<a-s;++e)i.push(-1)}if(a>0&&i.length!==e[a-1])throw Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(e,t,r,n){let a=e.length,i=[];if(0===a)return[];let o=0,s=e[0];if(s>=t.length)throw Error(`Got currentValueRowId=${s}, which is not less than ${t.length}`);let l=t[s];i.push(l);for(let u=1;u<a;++u){let a=e[u];if(a===s)l>=0&&(++o<n?l+=r:l=-1);else{if(o=0,s=a,a>=t.length)throw Error(`Got nextValueRowId=${a} which is not less than ${t.length}`);l=t[a]}i.push(l)}if(i.length!==e.length)throw Error("Invalid row ids.");return i}calculateOutputIndex(e,t,r,n){let a=this.getRowPartitionTensor(e),i=this.getRowPartitionTypeByDimension(e);switch(i){case _.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(a,t,r,n);case _.ROW_SPLITS:if(a.length-1>t.length)throw Error(`Row partition size is greater than output size: ${a.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(a,t,r,n);default:throw Error(`Unsupported partition type: ${_[i]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(0===this.rowPartitionTypes.length)throw Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case _.FIRST_DIM_SIZE:return e[0];case _.VALUE_ROWIDS:throw Error("Cannot handle VALUE_ROWIDS in first dimension.");case _.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${_[t]}`)}}compute(){let e=this.rowPartitionValues[0];if(e.length<=0)throw Error("Invalid first partition input. Tensor requires at least one element.");let t=this.getFirstDimensionSize(),r=this.calculateOutputSize(t),a=Array(this.raggedRank+1);a[a.length-1]=1;for(let e=a.length-2;e>=0;--e)a[e]=a[e+1]*r[e+1];let i=makeShape(r,!1),o=n.D5U.getArrayFromDType(this.valuesDType,n.D5U.sizeFromShape(i)),s=a[0]*r[0];if(s>0){let e=this.calculateFirstParentOutputIndex(t,a[0],r[0]);for(let t=1;t<=this.raggedRank;++t){let n=this.calculateOutputIndex(t-1,e,a[t],r[t]);e=n}this.setOutput(this.raggedRank,e,o,i)}return[i,o]}setOutput(e,t,r,a){if(0===r.length)return;let i=this.values,o=a.slice();o=o.slice(e+1);let s=n.D5U.sizeFromShape(o),l=t.length,u=this.defaultValue;if(u.length!==s&&1!==u.length){let e=this.defaultValueShape;(0,n.lub)(()=>{let t=(0,n.XLQ)(u,e),r=(0,n.UFq)(t,o);u=r.dataSync()})}let c=0,d=0,h=0;for(let e=0;e<=l;++e){let n=e<l?t[e]:-1;if(n===h){++h;continue}if(d<h){let e=i.subarray(c*s),t=r.subarray(d*s),n=(h-d)*s;copyArray(t,e,n)}if(e>=l){let e=r.length;n=Math.floor(e/s)}if(n>h){if(1===this.defaultValue.length)r.subarray(h*s,n*s).fill(this.defaultValue[0]),h=n;else for(;n>h;){let e=r.slice(h*s);copyArray(e,u,s),++h}}n<0?(c=e+1,d=h):(c=e,h=(d=h)+1)}}};function copyArray(e,t,r){for(let n=0;n<r;n++)e[n]=t[n]}function makeShape(e,t){let r=[];for(let n of e){if(n<0){if(!t)throw Error(`Dimension ${n} must be >= 0`);if(n<-1)throw Error(`Dimension ${n} must be >= -1`);n=-1}r.push(n)}return r}function raggedTensorToTensorImpl(e,t,r,n,a,i,o,s,l,u){return new RaggedTensorToTensorOp(e,t,r,n,a,i,o,s,l,u).compute()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rangeImpl(e,t,r,a){let i=e<t&&r<0,o=t<e&&r>1;if(e===t||i||o)return n.D5U.makeZerosTypedArray(0,a);let s=Math.abs(Math.ceil((t-e)/r)),l=n.D5U.makeZerosTypedArray(s,a);t<e&&1===r&&(r=-1),l[0]=e;for(let e=1;e<l.length;e++)l[e]=l[e-1]+r;return l}/**
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
 */let k=createSimpleUnaryImpl(e=>1/Math.sqrt(e));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function scatterImpl(e,t,r,a,i,o,s,l,u,c){let d=[a/i,i],h=e.values,f=t.values;if(0===a)return(0,n.f3b)(r,t.dtype);let p=u instanceof n.YDk?u:(0,n.f3b)(d,t.dtype);"string"==typeof u?p.values.fill(u):"number"==typeof u?p.values.fill(u):"boolean"==typeof u&&p.values.fill(+u);for(let e=0;e<o;e++){let n=[],o=0;for(let t=0;t<s;t++){let r=h[e*s+t];n.push(r),o+=r*l[t]}if(o<0||o>=a/i)throw Error(`Invalid indices: ${n} does not index into ${r}`);for(let r=0;r<i;r++)c?p.values[o*i+r]+=f[e*i+r]:p.values[o*i+r]=0===t.rank?f[0]:f[e*i+r]}return p}unaryKernelFuncFromImpl(n.bV0,k),n.bV0;/**
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
 */let $=createSimpleUnaryImpl(e=>1/(1+Math.exp(-e)));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sliceImpl(e,t,r,a,i){let o=n.kuN.isSliceContinous(a,t,r),s=n.D5U.sizeFromShape(r),l=n.D5U.computeStrides(a);if(o){let r=n.kuN.computeFlatOffset(t,l);return"string"===i?e.slice(r,r+s):e.subarray(r,r+s)}let u="string"===i?n.backend_util.fromUint8ToStringArray(e):e,c=(0,n.f3b)(a,i,u),d=(0,n.f3b)(r,i);for(let e=0;e<d.size;++e){let r=d.indexToLoc(e),n=r.map((e,r)=>e+t[r]);d.set(c.get(...n),...r)}return"string"===i?n.backend_util.fromStringArrayToUint8(d.values):d.values}/**
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
 */function sparseFillEmptyRowsImpl(e,t,r,a,i,o,s){let l=t[0],u=o[0],c=Array(u),d=Array(l),h=t[1];if(0===u){if(0!==l)throw Error(n.backend_util.getSparseFillEmptyRowsIndicesDenseShapeMismatch(l));let e=n.D5U.getArrayFromDType(r,0),t=n.D5U.getArrayFromDType(i,0);return[e,[0,h],t,c,d]}let f=!0,p=0,m=Array(u).fill(0);for(let t=0;t<l;++t){let r=e[t*h];if(r<0)throw Error(n.backend_util.getSparseFillEmptyRowsNegativeIndexErrorMessage(t,r));if(r>=u)throw Error(n.backend_util.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(t,r,u));++m[r],f=f&&r>=p,p=r}let g=!0;for(let e=0;e<u;++e){let t=0===m[e];c[e]=t,g=g&&!t,m[e]=Math.max(m[e],1),e>0&&(m[e]+=m[e-1])}if(g&&f){for(let e=0;e<l;++e)d[e]=e;return[e,[l,h],a,c,d]}{let t=m[u-1],o=n.D5U.getArrayFromDType(r,t*h),f=n.D5U.getArrayFromDType(i,t),p=Array(u).fill(0);for(let t=0;t<l;++t){let r=e[t*h],n=p[r],i=(0===r?0:m[r-1])+n;p[r]++;for(let r=0;r<h;++r)o[i*h+r]=e[t*h+r];f[i]=a[t],d[t]=i}for(let e=0;e<u;++e){let t=p[e];if(0===t){let t=0===e?0:m[e-1];o[t*h+0]=e;for(let e=1;e<h;++e)o[t*h+e]=0;f[t]=s}}return[o,[t,h],f,c,d]}}/**
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
 */function sparseReshapeImpl(e,t,r,a,i){let o=n.D5U.sizeFromShape(a),s=t[0],l=i.length,u=[],c=1,d=-1;for(let e=0;e<l;++e){let t=i[e];if(-1===t){if(-1!==d)throw Error(n.backend_util.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(d,e));d=e,u.push(1)}else{if(t<0)throw Error(n.backend_util.getSparseReshapeNegativeOutputDimErrorMessage(e,t));c*=t,u.push(t)}}if(-1!==d){if(c<=0)throw Error(n.backend_util.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let e=Math.trunc(o/c);if(c*e!==o)throw Error(n.backend_util.getSparseReshapeInputOutputMultipleErrorMessage(a,u));u[d]=e}let h=n.D5U.sizeFromShape(u);if(h!==o)throw Error(n.backend_util.getSparseReshapeInputOutputMismatchErrorMessage(a,u));let f=a.length,p=[];if(f>0){p[f-1]=1;for(let e=f-2;e>=0;--e)p[e]=p[e+1]*a[e+1]}let m=[];if(l>0){m[l-1]=1;for(let e=l-2;e>=0;--e)m[e]=m[e+1]*u[e+1]}let g=n.D5U.getArrayFromDType(r,s*l);for(let t=0;t<s;++t){let r=0;for(let n=0;n<f;++n)r+=e[t*f+n]*p[n];for(let e=0;e<l;++e)g[t*l+e]=Math.trunc(r/m[e]),r%=m[e]}return[g,[s,l],u]}/**
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
 */function sparseSegmentReductionImpl(e,t,r,a,i,o=!1,s=0){let l=a.length,u=[t[0],e.length/t[0]],c=u[1],d=l>0?i[l-1]+1:0;if(d<0)throw Error(n.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let h=t.slice();h[0]=d;let f=h.reduce((e,t)=>e*t,1),p=n.D5U.getArrayFromDType(r,f);if(0===l)return d>0&&p.fill(s),[p,h];if(d<=0)throw Error(n.backend_util.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=0,g=1,y=0,x=i[0];for(;;){let t=0;if(g<l){if(x===(t=i[g])){++g;continue}if(x>=t)throw Error(n.backend_util.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(x<0||x>=d)throw Error(n.backend_util.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(x,d));x>y&&p.fill(s,y*c,x*c);for(let t=m;t<g;++t){let r=a[t];if(r<0||r>=u[0])throw Error(n.backend_util.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(t,a[t],u[0]));for(let t=0;t<c;t++)p[x*c+t]+=e[r*c+t]}if(o)for(let e=0;e<c;e++)p[x*c+e]/=g-m;if(m=g,++g,y=x+1,x=t,g>l)break}return y<d&&p.fill(s,y*c,d*c),[p,h]}unaryKernelFunc(n.a5O,e=>1/(1+Math.exp(-e))),n.a5O,n.p2w;/**
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
 */let A=createSimpleUnaryImpl(e=>Math.sqrt(e));unaryKernelFunc(n.FKq,e=>Math.sqrt(e)),n.FKq;/**
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
 */let N=createSimpleUnaryImpl((e,t)=>{let{pattern:r,replaceGlobal:n,rewrite:a}=t;return e.replace(new RegExp(r,n?"g":""),a)});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function stridedSliceImpl(e,t,r,a){let i=(0,n.f3b)(e,t.dtype);for(let e=0;e<i.size;e++){let n=i.indexToLoc(e),o=Array(n.length);for(let e=0;e<o.length;e++)o[e]=n[e]*r[e]+a[e];i.set(t.get(...o),...n)}return i}unaryKernelFuncFromImpl(n.e0R,N),n.e0R;/**
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
 */let StringNGramsOp=class StringNGramsOp{constructor(e,t,r,a,i,o){this.separator=n.D5U.encodeString(e),this.nGramWidths=t,this.leftPad=n.D5U.encodeString(r),this.rightPad=n.D5U.encodeString(a),this.padWidth=i,this.preserveShort=o}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let r=this.getPadWidth(t);return Math.max(0,e+2*r-t+1)}createNGrams(e,t,r,n,a,i){for(let o=0;o<a;++o){let s;let l=this.getPadWidth(i),u=Math.max(0,l-o),c=Math.max(0,l-(a-(o+1))),d=i-(u+c),h=t+(u>0?0:o-l);s=0+u*this.leftPad.length;for(let t=0;t<d;++t)s+=e[h+t].length;s+=c*this.rightPad.length;let f=u+c+d-1;s+=f*this.separator.length,r[n+o]=new Uint8Array(s);let p=r[n+o],m=0,appendToNGram=e=>e.forEach(e=>p[m++]=e);for(let e=0;e<u;++e)appendToNGram(this.leftPad),appendToNGram(this.separator);for(let t=0;t<d-1;++t)appendToNGram(e[h+t]),appendToNGram(this.separator);if(d>0){appendToNGram(e[h+d-1]);for(let e=0;e<c;++e)appendToNGram(this.separator),appendToNGram(this.rightPad)}else{for(let e=0;e<c-1;++e)appendToNGram(this.rightPad),appendToNGram(this.separator);appendToNGram(this.rightPad)}}}compute(e,t){let r=e.length,a=t.length;if(a>0){let e=t[0];if(0!==e)throw Error(`First split value must be 0, got ${e}`);for(let n=1;n<a;++n){let a=t[n]>=e;if(!(a=a&&t[n]<=r))throw Error(`Invalid split value ${t[n]}, must be in [${e}, ${r}]`);e=t[n]}if(e!==r)throw Error(`Last split value must be data size. Expected ${r}, got ${e}`)}let i=a-1,o=n.D5U.getArrayFromDType("int32",a);if(0===r||0===a){let e=Array(r);for(let e=0;e<=i;++e)o[e]=0;return[e,o]}o[0]=0;for(let e=1;e<=i;++e){let r=t[e]-t[e-1],n=0;this.nGramWidths.forEach(e=>{n+=this.getNumNGrams(r,e)}),this.preserveShort&&r>0&&0===n&&(n=1),o[e]=o[e-1]+n}let s=Array(o[i]);for(let r=0;r<i;++r){let n=t[r],a=o[r];if(this.nGramWidths.forEach(i=>{let o=t[r+1]-t[r],l=this.getNumNGrams(o,i);this.createNGrams(e,n,s,a,l,i),a+=l}),this.preserveShort&&a===o[r]){let i=t[r+1]-t[r];if(0===i)continue;let o=i+2*this.padWidth;this.createNGrams(e,n,s,a,1,o)}}return[s,o]}};function stringNGramsImpl(e,t,r,n,a,i,o,s){return new StringNGramsOp(r,n,a,i,o,s).compute(e,t)}function stringSplitImpl(e,t,r){let a=e.length,i=[],o=0,s=0,l=Array(a);for(let n=0;n<a;++n){let a=i.length;!/**
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
 */function(e,t,r,n){if(!e.length)return;if(0===t.length){for(let t=0;t<e.length;++t)n.push(e.subarray(t,t+1));return}if(1===t.length){let a=t[0],i=e.indexOf(a);for(;-1!==i;){let t=e.subarray(0,i);r&&0===t.length||n.push(t),i=(e=e.subarray(i+1)).indexOf(a)}r&&0===e.length||n.push(e);return}let a=0;for(let i=0;i<e.length+1;i++)if(i===e.length||-1!==t.indexOf(e[i])){let t=e.subarray(a,i);r&&0===t.length||n.push(t),a=i+1}}(e[n],t,r,i);let u=i.length-a;l[n]=u,o+=u,s=Math.max(s,u)}let u=n.D5U.getArrayFromDType("int32",2*o),c=Array(o),d=[a,s],h=0;for(let e=0;e<a;++e)for(let t=0;t<l[e];++t)u[2*h]=e,u[2*h+1]=t,c[h]=i[h],++h;return[u,c,d]}/**
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
 */function stringToHashBucketFastImpl(e,t){let r=n.D5U.getArrayFromDType("int32",e.length);for(let a=0;a<e.length;++a)r[a]=n.D5U.fingerPrint64(e[a]).modulo(t).getLowBitsUnsigned();return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let F=createSimpleBinaryKernelImpl((e,t)=>e-t),D=createComplexBinaryKernelImpl((e,t,r,n)=>({real:e-r,imag:t-n}));/**
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
 */function tileImpl(e,t){let r=Array(e.rank);for(let n=0;n<r.length;n++)r[n]=e.shape[n]*t[n];let a=(0,n.f3b)(r,e.dtype);for(let t=0;t<a.values.length;++t){let r=a.indexToLoc(t),n=Array(e.rank);for(let t=0;t<n.length;t++)n[t]=r[t]%e.shape[t];let i=e.locToIndex(n);a.values[t]=e.values[i]}return a}binaryKernelFunc(n.Tr8,F,D),n.Tr8;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let comparePair=(e,t)=>{let r=t.value-e.value;return 0===r?e.index-t.index:r};function topKImpl(e,t,r,a,i){let o=t[t.length-1],[s,l]=[e.length/o,o],u=n.D5U.getTypedArrayFromDType(r,s*a),c=n.D5U.getTypedArrayFromDType("int32",s*a);for(let t=0;t<s;t++){let r=t*l,o=e.subarray(r,r+l),s=Array(o.length);o.forEach((e,t)=>s[t]={value:e,index:t}),a<s.length&&(function TopK_impl_select(e,t,r=0,a=e.length-1){for(;a>r;){if(a-r>600){let n=a-r+1,i=t-r+1,o=Math.log(n),s=.5*Math.exp(2*o/3),l=.5*Math.sqrt(o*s*(n-s)/n)*Math.sign(i-n/2),u=Math.max(r,Math.floor(t-i*s/n+l)),c=Math.min(a,Math.floor(t+(n-i)*s/n+l));TopK_impl_select(e,t,u,c)}let i=e[t],o=r,s=a;for(n.D5U.swap(e,r,t),comparePair(e[a],i)>0&&n.D5U.swap(e,r,a);o<s;){for(n.D5U.swap(e,o,s),o++,s--;0>comparePair(e[o],i);)o+=1;for(;comparePair(e[s],i)>0;)s-=1}0===comparePair(e[r],i)?n.D5U.swap(e,r,s):(s+=1,n.D5U.swap(e,s,a)),s<=t&&(r=s+1),t<=s&&(a=s-1)}}(s,a),s=s.slice(0,a)),i&&s.sort(comparePair);let d=t*a,h=u.subarray(d,d+a),f=c.subarray(d,d+a);for(let e=0;e<a;e++)h[e]=s[e].value,f[e]=s[e].index}let d=t.slice();return d[d.length-1]=a,[(0,n.f3b)(d,r,u),(0,n.f3b)(d,"int32",c)]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uniqueImpl(e,t,r,a){let i=n.D5U.parseAxisParam(t,r)[0],o=[1,r[0],1];for(let e=0;e<i;e++)o[0]*=r[e];o[1]=r[i];for(let e=i+1;e<r.length;e++)o[2]*=r[e];let s=new Map,l=new Int32Array(r[i]),u=new n.YDk(o,a,e),c=[],d=1===o[0]&&1===o[2];for(let t=0;t<r[i];t++){let r;if(d)r=e[t].toString();else{let e=[];for(let r=0;r<o[0];r++)for(let n=0;n<o[2];n++)e.push(u.get(r,t,n));r=e.join(",")}let n=s.get(r);if(null!=n)l[t]=n;else{let e=s.size;s.set(r,e),l[t]=e,c.push(t)}}let h=o.slice();h[1]=s.size;let f=new n.YDk(h,a);c.forEach((e,t)=>{for(let r=0;r<o[0];r++)for(let n=0;n<o[2];n++)f.set(u.get(r,e,n),r,t,n)});let p=r.slice();return p[i]=h[1],{outputValues:f.values,outputShape:p,indices:l}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */},58876:function(e,t,r){"use strict";r.d(t,{jl:function(){return function getWebGLContext(e,t){if(!(e in a)||null!=t){let r=function(e,t){if(1!==e&&2!==e)throw Error("Cannot get WebGL rendering context, WebGL is disabled.");let r=null==t?function(e){if(!(0,n.OBj)().getBool("IS_SAFARI")&&"undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw Error("Cannot create a canvas in this context")}(e):t;return(r.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete a[e]},!1),(0,n.OBj)().getBool("SOFTWARE_WEBGL_ENABLED")&&(i.failIfMajorPerformanceCaveat=!1),1===e)?r.getContext("webgl",i)||r.getContext("experimental-webgl",i):r.getContext("webgl2",i)}(e,t);if(null===r)return console.log("Could not get context for WebGL version",e),null;a[e]=r}let r=a[e];return null==r||r.isContextLost()?(delete a[e],getWebGLContext(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),a[e])}},nd:function(){return setWebGLContext}});var n=r(82783);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let a={},i={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function setWebGLContext(e,t){a[e]=t}},90564:function(e,t,r){"use strict";r.d(t,{_:function(){return DecodeMatrixProgram}});var n=r(12011),a=r(58257),i=r(37589),o=r(15389);/**
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
 */let DecodeMatrixProgram=class DecodeMatrixProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=o.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?i.Kn(["r","c","d"],e):i.RW(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}}},4880:function(e,t,r){"use strict";r.d(t,{G:function(){return DecodeMatrixPackedProgram}});var n=r(12011),a=r(58257),i=r(37589),o=r(15389);/**
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
 */let DecodeMatrixPackedProgram=class DecodeMatrixPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=o.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?i.Kn(["r","c","d"],e):i.RW(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}}},65347:function(e,t,r){"use strict";r.d(t,{q:function(){return EncodeFloatProgram}});var n=r(12011),a=r(37589),i=r(15389);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeFloatProgram=class EncodeFloatProgram{constructor(e){this.variableNames=["A"],this.outTexUsage=i.v2.DOWNLOAD;let t=(0,n.A)();this.outputShape=e,this.userCode=`
      ${a.ye}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}}},43564:function(e,t,r){"use strict";r.d(t,{d:function(){return EncodeFloatPackedProgram}});var n=r(12011),a=r(37589),i=r(15389);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeFloatPackedProgram=class EncodeFloatPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=i.v2.DOWNLOAD;let t=(0,n.A)();this.outputShape=e,this.userCode=`
      ${a.ye}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}}},12616:function(e,t,r){"use strict";r.d(t,{F:function(){return EncodeMatrixProgram}});var n=r(12011),a=r(58257),i=r(37589);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let o={R:0,G:1,B:2,A:3};let EncodeMatrixProgram=class EncodeMatrixProgram{constructor(e,t=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let s=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let l="result";t&&(l="floor(result * 255. + 0.5)");let u="";for(let e=0;e<r.length;e++){let t=r[e];u+=`
          if(offset == ${e}) {
            result = values[${o[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?i.nc():i.ku(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${r.length});

        flatIndex = idiv(flatIndex, ${r.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${s.texture2D}(A, uv);
          ${u}
        }
        ${s.output} = vec4(${l}, 0., 0., 0.);
      }
    `}}},88501:function(e,t,r){"use strict";r.d(t,{Z:function(){return EncodeMatrixPackedProgram}});var n=r(12011),a=r(58257),i=r(37589);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeMatrixPackedProgram=class EncodeMatrixPackedProgram{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=(0,n.A)();this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let o="",s="result";t&&(s="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){let a=2*t+n;o+=`
          localCoords = coords;
          if(localCoords[2] + ${n} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${n};
          if (localCoords[1] + ${t} < ${this.enableShapeUniforms?"outShape[1]":`${e[1]}`}) {
            localCoords[1] += ${t};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${r.texture2D}(A, uv);

            if (offset == 0) {
              result[${a}] = values[0];
            } else if (offset == 1) {
              result[${a}] = values[1];
            } else if (offset == 2) {
              result[${a}] = values[2];
            } else {
              result[${a}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?i.nc():i.ku(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${o}

          ${r.output} = ${s};
        }
    `}}},77674:function(e,t,r){"use strict";var n=r(82783),a=r(67818);/**
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
 */let i=(0,n.OBj)();i.registerFlag("HAS_WEBGL",()=>i.getNumber("WEBGL_VERSION")>0),i.registerFlag("WEBGL_VERSION",()=>(0,a.isWebGLVersionEnabled)(2)?2:(0,a.isWebGLVersionEnabled)(1)?1:0),i.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),i.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===i.get("WEBGL_VERSION")),i.registerFlag("WEBGL_CPU_FORWARD",()=>!0),i.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),i.registerFlag("WEBGL_PACK",()=>i.getBool("HAS_WEBGL")),i.registerFlag("WEBGL_PACK_NORMALIZATION",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_CLIP",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_REDUCE",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_LAZILY_UNPACK",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_CONV_IM2COL",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>i.getBool("WEBGL_PACK")),i.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>(0,a.getWebGLMaxTextureSize)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>(0,a.getMaxTexturesInShader)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let e=i.getNumber("WEBGL_VERSION");return 0===e?0:(0,a.getWebGLDisjointQueryTimerVersion)(e)}),i.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>i.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!n.C2$.isMobile()),i.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>(0,a.isCapableOfRenderingToFloatTexture)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!i.getBool("WEBGL_FORCE_F16_TEXTURES")&&i.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),i.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>(0,a.isDownloadFloatTextureEnabled)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_FENCE_API_ENABLED",()=>(0,a.isWebGLFenceEnabled)(i.getNumber("WEBGL_VERSION"))),i.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>{let e=i.getBool("WEBGL_RENDER_FLOAT32_ENABLED");return e?4:0}),i.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),i.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>n.C2$.isMobile()?1:-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),i.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),i.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),i.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),i.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),i.registerFlag("WEBGL_EXP_CONV",()=>!1),i.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>i.getBool("IS_TEST")),i.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),i.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),i.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),i.registerFlag("ENGINE_COMPILE_ONLY",()=>!1)},12011:function(e,t,r){"use strict";r.d(t,{A:function(){return getGlslDifferences}});var n=r(82783);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getGlslDifferences(){let e,t,r,a,i,o,s,l,u,c;return 2===(0,n.OBj)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",r="out",a="in",i="texture",o="outputColor",s="out vec4 outputColor;",l=(0,n.OBj)().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e="",t="attribute",r="varying",a="varying",i="texture2D",o="gl_FragColor",s="",l=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:r,varyingFs:a,texture2D:i,output:o,defineOutput:s,defineSpecialNaN:l,defineSpecialInf:u,defineRound:c}}},99233:function(e,t,r){"use strict";r.d(t,{A:function(){return GPGPUContext}});var n=r(82783),a=r(58876),i=r(25121),o=r(15389),s=r(67818);/**
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
 */let GPGPUContext=class GPGPUContext{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=(0,n.OBj)().getNumber("WEBGL_VERSION");if(null!=e?(this.gl=e,(0,a.nd)(t,e)):this.gl=(0,a.jl)(t),e=this.gl,2===(0,n.OBj)().getNumber("WEBGL_VERSION")){let t=e;this.createVertexArray=()=>s.callAndCheck(t,()=>t.createVertexArray()),this.bindVertexArray=e=>s.callAndCheck(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>s.callAndCheck(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>s.callAndCheck(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(null!=e){let t=e.getExtension("OES_vertex_array_object");if(null==t)throw Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>s.callAndCheck(e,()=>t.createVertexArrayOES()),this.bindVertexArray=r=>s.callAndCheck(e,()=>t.bindVertexArrayOES(r)),this.deleteVertexArray=r=>s.callAndCheck(e,()=>t.deleteVertexArrayOES(r)),this.getVertexArray=()=>s.callAndCheck(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let r="WEBGL_color_buffer_float",l="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),1===(0,n.OBj)().getNumber("WEBGL_VERSION")){let e="OES_texture_half_float";if(this.textureFloatExtension=s.getExtensionOrThrow(this.gl,"OES_texture_float"),s.hasExtension(this.gl,e))this.textureHalfFloatExtension=s.getExtensionOrThrow(this.gl,e);else if((0,n.OBj)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=s.getExtensionOrThrow(this.gl,l);else if((0,n.OBj)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",s.hasExtension(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else if(s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=this.gl.getExtension(l);else throw Error("GL context does not support color renderable floats");this.vertexBuffer=i.createVertexBuffer(this.gl),this.indexBuffer=i.createIndexBuffer(this.gl),this.framebuffer=s.createFramebuffer(this.gl),this.textureConfig=o.Sq(this.gl,this.textureHalfFloatExtension)}get debug(){return(0,n.OBj)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;s.callAndCheck(e,()=>e.finish()),s.callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),s.callAndCheck(e,()=>e.deleteFramebuffer(this.framebuffer)),s.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat32MatrixTexture(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat16MatrixTexture(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),i.createUnsignedBytesMatrixTexture(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),i.uploadPixelDataToTexture(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,r,n){this.throwIfDisposed(),i.uploadDenseMatrixToTexture(this.gl,e,t,r,n,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),i.createFloat16PackedMatrixTexture(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),i.createPackedMatrixTexture(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer),this.outputTexture=null),s.callAndCheck(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r){return this.downloadMatrixDriver(e,()=>i.downloadByteEncodedFloatMatrixFromOutputTexture(this.gl,t,r,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,r,n,a,o){return i.downloadPackedMatrixFromBuffer(this.gl,e,t,r,n,a,o,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return i.downloadFloat32MatrixFromBuffer(this.gl,e,t)}createBufferFromTexture(e,t,r){this.bindTextureToFrameBuffer(e);let n=i.createBufferFromOutputTexture(this.gl,t,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r;if((0,n.OBj)().getBool("WEBGL_FENCE_API_ENABLED")){let n=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),r=()=>{let t=e.clientWaitSync(n,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},t=n}else(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(t,(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:t,isFencePassed:r}}downloadMatrixFromPackedTexture(e,t,r){return this.downloadMatrixDriver(e,()=>i.downloadMatrixFromPackedOutputTexture(this.gl,t,r))}createProgram(e){this.throwIfDisposed();let t=this.gl;null==this.vertexShader&&(this.vertexShader=i.createVertexShader(t));let r=s.createProgram(t);s.callAndCheck(t,()=>t.attachShader(r,this.vertexShader)),s.callAndCheck(t,()=>t.attachShader(r,e)),s.linkProgram(t,r);let n=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&s.validateProgram(t,n),n}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;s.callAndCheck(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),i.bindVertexProgramAttributeStreams(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&(s.callAndCheck(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&s.validateProgram(this.gl,this.program),s.callAndCheck(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,r=!0){return(this.throwIfDisposed(),r)?s.getProgramUniformLocationOrThrow(this.gl,e,t):s.getProgramUniformLocation(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,r){this.throwIfDisposed(),this.throwIfNoProgram(),s.bindTextureToProgramUniformSampler(this.gl,e,t,r)}setOutputMatrixTexture(e,t,r){this.setOutputMatrixTextureDriver(e,r,t)}setOutputPackedMatrixTexture(e,t,r){this.throwIfDisposed();let[n,a]=o.qe(t,r);this.setOutputMatrixTextureDriver(e,n,a)}setOutputMatrixWriteRegion(e,t,r,n){this.setOutputMatrixWriteRegionDriver(r,e,n,t)}setOutputPackedMatrixWriteRegion(e,t,r,n){throw Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&s.validateProgram(this.gl,this.program),s.validateFramebuffer(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}s.callAndCheck(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=s.getExtensionOrThrow(this.gl,2===(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await n.D5U.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,(0,n.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){let t=this.gl,r=t.getQueryParameter(e,t.QUERY_RESULT);return r/1e6}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT);return r/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){let t=this.gl,r=this.getQueryTimerExtensionWebGL2(),n=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),n&&!this.disjoint}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),r&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=function(e){let t=0;for(;t<e.length;++t){let r=e[t]();if(!r)break}return t-1}(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){let r;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||("setTimeoutCustom"in(0,n.OBj)().platform&&(r=(0,n.OBj)().platform.setTimeoutCustom.bind((0,n.OBj)().platform)),n.D5U.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length),()=>0,null,r))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),s.bindColorTextureToFramebuffer(this.gl,e,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(s.bindColorTextureToFramebuffer(this.gl,this.outputTexture,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)):s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let r=t();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(e,t,r){this.throwIfDisposed();let n=this.gl;s.bindColorTextureToFramebuffer(n,e,this.framebuffer),this.debug&&s.validateFramebuffer(n),this.outputTexture=e,s.callAndCheck(n,()=>n.viewport(0,0,t,r)),s.callAndCheck(n,()=>n.scissor(0,0,t,r))}setOutputMatrixWriteRegionDriver(e,t,r,n){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.scissor(e,t,r,n))}throwIfDisposed(){if(this.disposed)throw Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw Error("No GPU program is currently set.")}}},58257:function(e,t,r){"use strict";r.d(t,{C9:function(){return useShapeUniforms},IJ:function(){return compileProgram},Yv:function(){return getUniformLocations},_s:function(){return runProgram},mi:function(){return makeShaderKey}});var n=r(82783),a=r(10058),i=r(67818);/**
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
 */function compileProgram(e,t,r,o){let s=r.map((e,r)=>{let n={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(n.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[r],shapeInfo:n}}),l=s.map(e=>e.shapeInfo),u={logicalShape:o.shape,texShape:o.texData.texShape,isUniform:!1,isPacked:o.texData.isPacked,flatOffset:null},c=a.Vm(s,u,t),d=(0,i.createFragmentShader)(e.gl,c),h=e.createProgram(d);return(0,n.OBj)().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:d,source:c,webGLProgram:h,inShapeInfos:l,outShapeInfo:u,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(h),Object.assign({program:t,fragmentShader:d,source:c,webGLProgram:h,inShapeInfos:l,outShapeInfo:u},getUniformLocations(e,t,h)))}function getUniformLocations(e,t,r){let a,i,o;let s=[],l=[],u=null,c=null;for(let a of(c=e.getUniformLocation(r,"NAN",!1),1===(0,n.OBj)().getNumber("WEBGL_VERSION")&&(u=e.getUniformLocation(r,"INFINITY",!1)),t.variableNames)){let n={name:a,uniform:e.getUniformLocation(r,a,!1),offset:e.getUniformLocation(r,`offset${a}`,!1)};t.enableShapeUniforms&&(n.shape=e.getUniformLocation(r,`${a}Shape`,!1),n.texShape=e.getUniformLocation(r,`${a}TexShape`,!1)),s.push(n)}if(t.enableShapeUniforms&&(a=e.getUniformLocation(r,"outShape",!1),o=e.getUniformLocation(r,"outShapeStrides",!1),i=e.getUniformLocation(r,"outTexShape",!1)),t.customUniforms)for(let n of t.customUniforms)l.push(e.getUniformLocation(r,n.name,!1));return{variablesLocations:s,customUniformLocations:l,infLoc:u,nanLoc:c,outShapeLocation:a,outShapeStridesLocation:o,outTexShapeLocation:i}}function validateBinaryAndProgram(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,r)=>{let a=e.logicalShape,i=t[r],o=i.shape;if(!n.D5U.arraysEqual(a,o))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${a} and ${o} must match`);if(e.isUniform&&i.isUniform)return;let s=e.texShape,l=i.isUniform?null:i.texData.texShape;if(!n.D5U.arraysEqual(s,l))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${s} and ${l} must match`)})}function runProgram(e,t,r,i,o){t.program.enableShapeUniforms||(validateBinaryAndProgram(t.inShapeInfos,r),validateBinaryAndProgram([t.outShapeInfo],[i]));let s=i.texData.texture,l=i.texData.texShape;i.texData.isPacked?e.setOutputPackedMatrixTexture(s.texture,l[0],l[1]):e.setOutputMatrixTexture(s.texture,l[0],l[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),1===(0,n.OBj)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN);for(let i=0;i<r.length;++i){let o=r[i],{uniform:s,offset:l,shape:u,texShape:c}=t.variablesLocations[i];if(u){let{uniformShape:r}=a.Tt(t.program.packedInputs,o.shape,o.texData.texShape);switch(r.length){case 1:e.gl.uniform1iv(u,new Int32Array(r));break;case 2:e.gl.uniform2iv(u,new Int32Array(r));break;case 3:e.gl.uniform3iv(u,new Int32Array(r));break;case 4:e.gl.uniform4iv(u,new Int32Array(r))}}if(c&&e.gl.uniform2i(c,o.texData.texShape[0],o.texData.texShape[1]),null!=s){if(o.isUniform){if(2>n.D5U.sizeFromShape(o.shape))e.gl.uniform1f(s,o.uniformValues[0]);else{let t=o.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(s,t)}continue}null!=o.texData.slice&&null!=l&&e.gl.uniform1i(l,o.texData.slice.flatOffset),e.setInputMatrixTexture(o.texData.texture.texture,s,i)}}let u=t.outShapeLocation;if(u)switch(i.shape.length){case 1:e.gl.uniform1iv(u,new Int32Array(i.shape));break;case 2:e.gl.uniform2iv(u,new Int32Array(i.shape));break;case 3:e.gl.uniform3iv(u,new Int32Array(i.shape));break;case 4:e.gl.uniform4iv(u,new Int32Array(i.shape))}if(t.outShapeStridesLocation){let r=n.D5U.computeStrides(i.shape);switch(i.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(r));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(r));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(r))}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,i.texData.texShape[0],i.texData.texShape[1]),t.program.customUniforms&&o)for(let r=0;r<t.program.customUniforms.length;++r){let n=t.program.customUniforms[r],a=t.customUniformLocations[r],i=o[r];if("float"===n.type)e.gl.uniform1fv(a,i);else if("vec2"===n.type)e.gl.uniform2fv(a,i);else if("vec3"===n.type)e.gl.uniform3fv(a,i);else if("vec4"===n.type)e.gl.uniform4fv(a,i);else if("int"===n.type)e.gl.uniform1iv(a,i);else if("ivec2"===n.type)e.gl.uniform2iv(a,i);else if("ivec3"===n.type)e.gl.uniform3iv(a,i);else if("ivec4"===n.type)e.gl.uniform4iv(a,i);else throw Error(`uniform type ${n.type} is not supported yet.`)}e.executeProgram()}function makeShaderKey(e,t,r){let i="";t.concat(r).forEach(t=>{let o=null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let s=t.texData.texShape,{useSqueezeShape:l,uniformShape:u,keptDims:c}=a.Tt(e.packedInputs,t.shape,s),d="",h="",f="";if(1===u.length&&e.packedInputs){let e=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];d=`${e[0]>1}_${e[1]>1}`}else if(2!==u.length||e.packedInputs){if(u.length>2&&!e.packedInputs){let e=n.D5U.computeStrides(u);f=`${e[0]===s[1]}_${e[e.length-1]===s[1]}`}}else h=`${u[0]>1}_${u[1]>1}`;let p=t.shape.length,m=2===u.length&&n.D5U.arraysEqual(t.shape,s),g=1===n.D5U.sizeFromShape(t.shape),y=n.backend_util.getBroadcastDims(t.shape,r.shape),x=!e.packedInputs&&p===r.shape.length&&n.D5U.arraysEqual(s,r.texData.texShape),b=e.packedInputs||u.length>2?"":`${s[0]>1}_${s[1]>1}`;i+=`${p}_${x}_${l?c:""}_${u.length}_${g}_${y}_${m}_${d}_${h}_${f}_${b}_${o}`}else{let e=t.isUniform?"uniform":t.texData.texShape;i+=`${t.shape}_${e}_${o}`}});let o=e.userCode;return e.constructor.name+("_"+i+"_"+o)+`${(0,n.OBj)().getNumber("WEBGL_VERSION")}`}function useShapeUniforms(e){return(0,n.OBj)().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&e<=4}},25121:function(e,t,r){"use strict";r.r(t),r.d(t,{bindVertexProgramAttributeStreams:function(){return bindVertexProgramAttributeStreams},createBufferFromOutputTexture:function(){return createBufferFromOutputTexture},createFloat16MatrixTexture:function(){return createFloat16MatrixTexture},createFloat16PackedMatrixTexture:function(){return createFloat16PackedMatrixTexture},createFloat32MatrixTexture:function(){return createFloat32MatrixTexture},createIndexBuffer:function(){return createIndexBuffer},createPackedMatrixTexture:function(){return createPackedMatrixTexture},createUnsignedBytesMatrixTexture:function(){return createUnsignedBytesMatrixTexture},createVertexBuffer:function(){return createVertexBuffer},createVertexShader:function(){return createVertexShader},downloadByteEncodedFloatMatrixFromOutputTexture:function(){return downloadByteEncodedFloatMatrixFromOutputTexture},downloadFloat32MatrixFromBuffer:function(){return downloadFloat32MatrixFromBuffer},downloadMatrixFromPackedOutputTexture:function(){return downloadMatrixFromPackedOutputTexture},downloadPackedMatrixFromBuffer:function(){return downloadPackedMatrixFromBuffer},getInternalFormatForFloat16MatrixTexture:function(){return getInternalFormatForFloat16MatrixTexture},getInternalFormatForFloat16PackedMatrixTexture:function(){return getInternalFormatForFloat16PackedMatrixTexture},getInternalFormatForFloat32MatrixTexture:function(){return getInternalFormatForFloat32MatrixTexture},getInternalFormatForPackedMatrixTexture:function(){return getInternalFormatForPackedMatrixTexture},getInternalFormatForUnsignedBytesMatrixTexture:function(){return getInternalFormatForUnsignedBytesMatrixTexture},uploadDenseMatrixToTexture:function(){return uploadDenseMatrixToTexture},uploadPixelDataToTexture:function(){return uploadPixelDataToTexture}});var n=r(82783),a=r(12011),i=r(15389),o=r(67818);/**
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
 */function createVertexShader(e){let t=(0,a.A)(),r=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return o.createVertexShader(e,r)}function createVertexBuffer(e){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return o.createStaticVertexBuffer(e,t)}function createIndexBuffer(e){let t=new Uint16Array([0,1,2,2,1,3]);return o.createStaticIndexBuffer(e,t)}function createAndConfigureTexture(e,t,r,a,i,s){o.validateTextureSize(t,r);let l=o.createTexture(e),u=e.TEXTURE_2D;return o.callAndCheck(e,()=>e.bindTexture(u,l)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MIN_FILTER,e.NEAREST)),o.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MAG_FILTER,e.NEAREST)),1===(0,n.OBj)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texImage2D(u,0,a,t,r,0,i,s,null)):o.callAndCheck(e,()=>e.texStorage2D(u,1,a,t,r)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:l,texShape:[r,t]}}function getInternalFormatForFloat32MatrixTexture(e){return e.internalFormatFloat}function createFloat32MatrixTexture(e,t,r,n){let[a,o]=i.kk(t,r);return createAndConfigureTexture(e,a,o,getInternalFormatForFloat32MatrixTexture(n),n.textureFormatFloat,e.FLOAT)}function getInternalFormatForFloat16MatrixTexture(e){return e.internalFormatHalfFloat}function createFloat16MatrixTexture(e,t,r,n){let[a,o]=i.kk(t,r);return createAndConfigureTexture(e,a,o,getInternalFormatForFloat16MatrixTexture(n),n.textureFormatFloat,n.textureTypeHalfFloat)}function getInternalFormatForUnsignedBytesMatrixTexture(e){return e.downloadTextureFormat}function createUnsignedBytesMatrixTexture(e,t,r,n){let[a,o]=i.kk(t,r);return createAndConfigureTexture(e,a,o,getInternalFormatForUnsignedBytesMatrixTexture(n),e.RGBA,e.UNSIGNED_BYTE)}function getInternalFormatForPackedMatrixTexture(e){return e.internalFormatPackedFloat}function createPackedMatrixTexture(e,t,r,n){let[a,o]=i.qe(t,r);return createAndConfigureTexture(e,a,o,getInternalFormatForPackedMatrixTexture(n),e.RGBA,e.FLOAT)}function getInternalFormatForFloat16PackedMatrixTexture(e){return e.internalFormatPackedHalfFloat}function createFloat16PackedMatrixTexture(e,t,r,n){let[a,o]=i.qe(t,r);return createAndConfigureTexture(e,a,o,getInternalFormatForFloat16PackedMatrixTexture(n),e.RGBA,n.textureTypeHalfFloat)}function bindVertexProgramAttributeStreams(e,t,r){o.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r));let n=o.bindVertexBufferToProgramAttribute(e,t,"clipSpacePos",r,3,20,0);return n&&o.bindVertexBufferToProgramAttribute(e,t,"uv",r,2,20,12)}function uploadDenseMatrixToTexture(e,t,r,a,i,s){let l,u,c;o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),i instanceof Uint8Array?(l=new Uint8Array(r*a*4),u=e.UNSIGNED_BYTE,c=e.RGBA):(l=new Float32Array(r*a*4),u=e.FLOAT,c=s.internalFormatPackedFloat),l.set(i),2===(0,n.OBj)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r,a,e.RGBA,u,l)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,c,r,a,0,e.RGBA,u,l)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function uploadPixelDataToTexture(e,t,r){o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),r.data instanceof Uint8Array?2===(0,n.OBj)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,e.RGBA,e.UNSIGNED_BYTE,r.data)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,r.data)):2===(0,n.OBj)().getNumber("WEBGL_VERSION")?o.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,r)):o.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)),o.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function createBufferFromOutputTexture(e,t,r,n){let a=e.createBuffer();o.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,a));let i=16*t*r;return o.callAndCheck(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,i,e.STREAM_READ)),o.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,0)),o.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),a}function downloadFloat32MatrixFromBuffer(e,t,r){let n=new Float32Array(r);return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),n}function downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r,n){let[a,s]=i.kk(t,r),l=new Uint8Array(i.yb(t*r,4));return o.callAndCheck(e,()=>e.readPixels(0,0,a,s,n.downloadTextureFormat,e.UNSIGNED_BYTE,l)),new Float32Array(l.buffer)}function downloadPackedMatrixFromBuffer(e,t,r,n,a,o,s,l){let u=new Float32Array(i.Se(o,s));return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,u),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),u}function downloadMatrixFromPackedOutputTexture(e,t,r){let n=new Float32Array(t*r*4);return o.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,n)),n}},83675:function(e,t,r){"use strict";let n;r.r(t),r.d(t,{GPGPUContext:function(){return h.A},MathBackendWebGL:function(){return s.QC},forceHalfFloat:function(){return forceHalfFloat},gpgpu_util:function(){return u},setWebGLContext:function(){return d.nd},version_webgl:function(){return l},webgl:function(){return f},webgl_util:function(){return c}});var a,i,o=r(82783),s=r(21469);/** @license See the LICENSE file. */let l="4.19.0";var u=r(25121),c=r(67818),d=r(58876),h=r(99233);/**
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
 */function forceHalfFloat(){(0,o.OBj)().set("WEBGL_FORCE_F16_TEXTURES",!0)}o.C2$.isBrowser()&&(0,o.jqO)("webgl",()=>new s.QC,2);let f={forceHalfFloat:forceHalfFloat};var p=r(58257);/**
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
 */let m=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;let BinaryOpProgram=class BinaryOpProgram{constructor(e,t,r){this.variableNames=["A","B"],this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r),this.enableShapeUniforms=(0,p.C9)(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var g=r(4573),y=r(10058);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let x=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;let BinaryOpPackedProgram=class BinaryOpPackedProgram{constructor(e,t,r,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r);let a=this.outputShape.length;this.enableShapeUniforms=(0,p.C9)(a);let i="";if(n){if(0===a||1===o.D5U.sizeFromShape(this.outputShape))i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else{let e=(0,y.kW)(a);if(i=`
          ${e} coords = getOutputCoords();
        `,1===a)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=(0,g.Ky)("coords",a);this.enableShapeUniforms?i+=`
            bool nextRowOutOfBounds =
              (${e[a-2]} + 1) >= outShape[${a} - 2];
            bool nextColOutOfBounds =
              (${e[a-1]} + 1) >= outShape[${a} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:i+=`
            bool nextRowOutOfBounds =
              (${e[a-2]} + 1) >= ${this.outputShape[a-2]};
            bool nextColOutOfBounds =
              (${e[a-1]} + 1) >= ${this.outputShape[a-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}}}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function identity(e){let{inputs:t,backend:r}=e,{x:n}=t;return r.incRef(n.dataId),{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}let b={kernelName:o.iJz,backendName:"webgl",kernelFunc:identity};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function complex(e){let{inputs:t,backend:r}=e,{real:n,imag:a}=t,i=r.makeTensorInfo(n.shape,"complex64"),o=r.texData.get(i.dataId),s=identity({inputs:{x:n},backend:r}),l=identity({inputs:{x:a},backend:r});return o.complexTensorInfos={real:s,imag:l},i}let v={kernelName:o.Zz9,backendName:"webgl",kernelFunc:complex},C="return (a < 0.) ? b * a : a;",w=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,_={kernelName:o.J$2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{alpha:i}=n,s=r.makeTensorInfo([],"float32",o.D5U.createScalarValue(i,"float32")),l=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(w,a.shape,s.shape):new BinaryOpProgram(C,a.shape,s.shape),u=r.runWebGLProgram(l,[a,s],"float32");return r.disposeIntermediateTensorInfo(s),u}},k="return (a < 0.) ? b * a : a;",$=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,A={kernelName:o.o0g,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:n,alpha:a}=t,i=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram($,n.shape,a.shape):new BinaryOpProgram(k,n.shape,a.shape);return r.runWebGLProgram(i,[n,a],"float32")}};var N=r(13150),F=r(38595);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let D="if (isnan(x)) return x;";function unaryKernelFunc({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:r,dtype:n}){return({inputs:a,backend:i})=>{let s;let{x:l}=a,u=n||l.dtype;if(i.shouldExecuteOnCPU([l])&&null!=r){let e=i.texData.get(l.dataId),t=r(e.values,u);return i.makeTensorInfo(l.shape,u,t)}let c=(0,o.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&null!=t;return s=c?new F.cc(l.shape,t):new N.l(l.shape,e),i.runWebGLProgram(s,[l],u)}}function binaryKernelFunc({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:r=!1,supportsComplex:n=!1,cpuKernelImpl:a,dtype:i}){return({inputs:s,backend:l})=>{let u;let{a:c,b:d}=s;if(n&&"complex64"===c.dtype){let t=l.texData.get(c.dataId),r=l.texData.get(d.dataId),[n,a]=[[t.complexTensorInfos.real,r.complexTensorInfos.real],[t.complexTensorInfos.imag,r.complexTensorInfos.imag]].map(t=>{let[r,n]=t,a={dataId:r.dataId,dtype:r.dtype,shape:c.shape},i={dataId:n.dataId,dtype:n.dtype,shape:d.shape},s=new BinaryOpProgram(e,c.shape,d.shape);return l.runWebGLProgram(s,[a,i],(0,o.x8V)(r.dtype,n.dtype))}),i=complex({inputs:{real:n,imag:a},backend:l});return l.disposeIntermediateTensorInfo(n),l.disposeIntermediateTensorInfo(a),i}let h=i||(0,o.x8V)(c.dtype,d.dtype);if(("string"===c.dtype||"string"===d.dtype||l.shouldExecuteOnCPU([c,d]))&&null!=a){let e=l.texData.get(c.dataId).values,t=l.texData.get(d.dataId).values,r="string"===c.dtype?o.backend_util.fromUint8ToStringArray(e):e,n="string"===c.dtype?o.backend_util.fromUint8ToStringArray(t):t,[i,s]=a(c.shape,d.shape,r,n,h),u=l.makeTensorInfo(s,h),f=l.texData.get(u.dataId);return f.values=i,u}let f=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t;return u=f?new BinaryOpPackedProgram(t,c.shape,d.shape,r):new BinaryOpProgram(e,c.shape,d.shape),l.runWebGLProgram(u,[c,d],h)}}function mapActivationToShaderProgram(e,t=!1){if("linear"===e)return t?F.t$:N.t$;if("relu"===e)return t?F.RX:N.RX;if("elu"===e)return t?F.Cv:N.Cv;if("relu6"===e)return t?F.eW:N.eW;if("prelu"===e)return t?$:k;if("leakyrelu"===e)return t?w:C;if("sigmoid"===e)return t?F.Tq:N.Tq;throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MatMulPackedProgram=class MatMulPackedProgram{constructor(e,t,r,n=!1,a=!1,i=!1,o=null,s=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let u=n?e[1]:e[2],c=Math.ceil(u/2),d=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],h=a?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],f="",m="";o&&(f=s?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:l?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:`vec4 activation(vec4 x) {
          ${o}
        }`,m="result = activation(result);"),i&&this.variableNames.push("bias"),s&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let g="rc.x",y="rc.x";e[0]<t[0]?g=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(y=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${f}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${c}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${g};
        int batchB = ${y};
        for (int i = 0; i < ${c}; i++) {
          vec4 a = getMatrixA(batchA, ${n?"i * 2, rc.y":"rc.y, i * 2"});
          vec4 b = getMatrixB(batchB, ${a?"rc.z, i * 2":"i * 2, rc.z"});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${d[0]} * ${h[0]});
          result += (${d[1]} * ${h[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${i?"result += getBiasAtOutCoords();":""}

        ${m}

        setOutput(result);
      }
    `}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let B={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};let BinaryOpComplexProgram=class BinaryOpComplexProgram{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=o.backend_util.assertAndGetBroadcastShape(t,r),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};var M=r(48816);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let L="return a * b;";function multiply(e){let t;let{inputs:r,backend:n}=e,{a,b:i}=r,s=o.backend_util.upcastType(a.dtype,i.dtype);if("complex64"===a.dtype){let e=n.texData.get(a.dataId),t=n.texData.get(i.dataId),r=new BinaryOpComplexProgram(B.REAL,a.shape,i.shape),o=new BinaryOpComplexProgram(B.IMAG,a.shape,i.shape),s=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:a.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:a.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:i.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:i.shape}],l=n.runWebGLProgram(r,s,"float32"),u=n.runWebGLProgram(o,s,"float32"),c=complex({inputs:{real:l,imag:u},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),c}if(n.shouldExecuteOnCPU([a,i])){let e=n.texData.get(a.dataId),t=n.texData.get(i.dataId),[r,o]=(0,M.Th)(a.shape,i.shape,e.values,t.values,s),l=n.makeTensorInfo(o,s),u=n.texData.get(l.dataId);return u.values=r,l}return t=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(L,a.shape,i.shape):new BinaryOpProgram(L,a.shape,i.shape),n.runWebGLProgram(t,[a,i],s)}let U={kernelName:o.wYn,backendName:"webgl",kernelFunc:multiply};var W=r(68588);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function reshape(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{shape:i}=n,s=o.D5U.sizeFromShape(a.shape),l=o.D5U.inferFromImplicitShape(i,s),u=o.D5U.sizeFromShape(l);o.D5U.assert(s===u,()=>`The new shape (${l}) has ${u} elements and the old shape (${a.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`);let d=r.texData.get(a.dataId);return!d.isPacked||(0,c.isReshapeFree)(a.shape,l)||null!==d.texture&&(0,c.isReshapeFree)(d.shape,l)?(r.incRef(a.dataId),{dataId:a.dataId,shape:l,dtype:a.dtype}):/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){let n=[(0,c.getBatchDim)(e.shape),...(0,c.getRowsCols)(e.shape)],a={dtype:e.dtype,shape:n,dataId:e.dataId},i=[(0,c.getBatchDim)(t),...(0,c.getRowsCols)(t)],o=new W.v(i,n),s=[n],l=r.runWebGLProgram(o,[a],e.dtype,s,!0);return{dataId:l.dataId,shape:t,dtype:l.dtype}}(a,l,r)}let z={kernelName:o.HZH,backendName:"webgl",kernelFunc:reshape};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MeanProgram=class MeanProgram{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:a,outSize:i}=e;this.outputShape=[n,i];let s=4*Math.floor(r/4),l=r%4,u="sumValue += dot(values, ones);";if(null!=t){let e=1/t;u=`sumValue += dot(values * ${o.D5U.isInt(e)?e.toPrecision(2):e}, ones);`}let c="";a%r>0&&(c=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${c}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        float sumValue = 0.0;

        for (int i = 0; i < ${s}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${u}
        }

        int inIdx = inOffset + ${s};
        if (${1===l}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${u}
        } else if (${2===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${u}
        } else if (${3===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${u}
        }
        setOutput(sumValue);
      }
    `}};/**
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
 */let ReduceProgram=class ReduceProgram{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:a,outSize:i}=e;this.outputShape=[n,i];let o="0.0",s="";"prod"===t?o="1.0":"min"===t?(o="1.0 / 1e-20",s="min"):"max"===t&&(o="-1.0 / 1e-20",s="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?l="sumValue":"prod"===t?l="prodValue":"all"===t?l="allValue":"any"===t&&(l="anyValue");let u=4*Math.floor(r/4),c=r%4,d=`
      if (${"sum"===t}) {
        sumValue += dot(values, ones);
      } else if (${"prod"===t}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${s}(values, minMaxValue);
        if (${"min"===t} || ${"max"===t}) {
          minMaxValue = ${s}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,h="vec4";"all"===t?(o="1.0",d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,h="bvec4"):"any"===t&&(o="0.0",d=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,h="bvec4");let f="";a%r>0&&(f=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${o};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${o});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${h} values = ${h}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${d}
        }

        int inIdx = inOffset + ${u};
        if (${1===c}) {
          ${h} values = ${h}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${2===c}) {
          ${h} values = ${h}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${3===c}) {
          ${h} values = ${h}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${d}
        }
        setOutput(${l});
      }
    `}};function reduce(e,t,r,n){let a=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=[];for(;0===t.length||1!==t[t.length-1].outSize;){let r=t.length?t[t.length-1].outSize:e[1],n=o.backend_util.computeOptimalWindowSize(r);t.push({inSize:r,windowSize:n,outSize:Math.ceil(r/n)})}return t}(e.shape),i=e;for(let o=0;o<a.length;o++){let s,l;let{inSize:u,windowSize:c,outSize:d}=a[o];s="mean"===r?0===o?new MeanProgram({windowSize:c,inSize:u,batchSize:e.shape[0],outSize:d},u):new MeanProgram({windowSize:c,inSize:u,batchSize:e.shape[0],outSize:d}):new ReduceProgram({windowSize:c,inSize:u,batchSize:e.shape[0],outSize:d},r),l=i,i=n.runWebGLProgram(s,[i],t),l.dataId!==e.dataId&&n.disposeIntermediateTensorInfo(l)}return i}/**
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
 */let TransposeProgram=class TransposeProgram{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[t[n]];this.outputShape=r,this.rank=r.length;let n=(0,y.kW)(this.rank),a=function(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],n=Array(t);for(let t=0;t<e.length;t++)n[e[t]]=r[t];return n.join()}(t);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${a}));
    }
    `}};/**
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
 */let TransposePackedProgram=class TransposePackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[t[n]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=(0,y.kW)(this.rank),a=(0,g.k6)("rc",this.rank),i=Array(this.rank);for(let e=0;e<t.length;e++)i[t[e]]=a[e];let o=`vec2(${i.slice(-2).join()})`,s=`++${a[this.rank-1]} < ${r[this.rank-1]}`,l=`getChannel(getA(${i.join()}), ${o})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${s}) {
        result[1] = ${l};
      }
      --${a[this.rank-1]};
      if(++${a[this.rank-2]} < ${r[this.rank-2]}) {
        result[2] = ${l};
        if(${s}) {
          result[3] = ${l};
        }
      }
      setOutput(result);
    }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function transposeImpl(e,t,r){let n=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new TransposePackedProgram(e.shape,t):new TransposeProgram(e.shape,t);return r.runWebGLProgram(n,[e],e.dtype)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sum(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i,keepDims:s}=n;return(/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){let a=e.shape.length,i=o.D5U.parseAxisParam(t,e.shape),s=i,l=o.backend_util.getAxesPermutation(s,a),u=null!=l,c=e;u&&(c=transposeImpl(e,l,n),s=o.backend_util.getInnerMostAxes(s.length,a)),o.backend_util.assertAxesAreInnerMostDims("sum",s,a);let[d,h]=o.backend_util.computeOutAndReduceShapes(c.shape,s),f=d;r&&(f=o.backend_util.expandShapeToKeepDim(d,i));let p=o.D5U.sizeFromShape(h),m=o.D5U.sizeFromShape(e.shape),g=m/p,y=reshape({inputs:{x:c},attrs:{shape:[g,p]},backend:n}),x=(0,o.z4k)(e.dtype),b=reduce(y,x,"sum",n),v=reshape({inputs:{x:b},attrs:{shape:f},backend:n});return n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(b),u&&n.disposeIntermediateTensorInfo(c),v}(a,i,s,r))}let Z={kernelName:o.GBy,backendName:"webgl",kernelFunc:sum};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function transpose(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{perm:o}=a,s=i.shape.length,l=Array(s);for(let e=0;e<l.length;e++)l[e]=i.shape[o[e]];if(n.shouldExecuteOnCPU([i])){let e=n.texData.get(i.dataId),r=e.values,a=(0,M.Fv)(r,i.shape,i.dtype,o,l);t=n.makeTensorInfo(l,i.dtype);let s=n.texData.get(t.dataId);s.values=a}else t=transposeImpl(i,o,n);return t}let j={kernelName:o.G3Y,backendName:"webgl",kernelFunc:transpose};function batchMatMulImpl({a:e,b:t,transposeA:r,transposeB:n,backend:a,bias:i=null,preluActivationWeights:s=null,leakyreluAlpha:l=0,activation:u=null}){let c;let d=e.shape.length,h=t.shape.length,f=r?e.shape[d-2]:e.shape[d-1],p=n?t.shape[h-1]:t.shape[h-2],m=r?e.shape[d-1]:e.shape[d-2],g=n?t.shape[h-2]:t.shape[h-1],y=e.shape.slice(0,-2),x=t.shape.slice(0,-2),b=o.D5U.sizeFromShape(y),v=o.D5U.sizeFromShape(x),C=o.Jyw.assertAndGetBroadcastShape(e.shape.slice(0,-2),t.shape.slice(0,-2)),w=C.concat([m,g]);o.D5U.assert(f===p,()=>`Error in matMul: inner shapes (${f}) and (${p}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${r} and transposeB=${n} must match.`);let _=r?[b,f,m]:[b,m,f],k=n?[v,g,p]:[v,p,g],$=reshape({inputs:{x:e},backend:a,attrs:{shape:_}}),A=reshape({inputs:{x:t},backend:a,attrs:{shape:k}}),N=[$,A],F=Math.max(b,v),D=r?$.shape[1]:$.shape[2],B=null!=i,M=null!=s,L="leakyrelu"===u,U=null!=u?mapActivationToShaderProgram(u,!0):null,W=B||M||L||null!=U;if((1===m||1===g)&&D>1e3&&!1===W){let e=$,t=A;r&&(e=transpose({inputs:{x:$},backend:a,attrs:{perm:[0,2,1]}}),N.push(e)),n&&(t=transpose({inputs:{x:A},backend:a,attrs:{perm:[0,2,1]}}),N.push(t));let i=1!==g,o=1===g,s=e;i&&(s=reshape({inputs:{x:e},backend:a,attrs:{shape:[F,D,1]}}),N.push(s));let l=1===g?2:1,u=t;o&&(u=reshape({inputs:{x:t},backend:a,attrs:{shape:[F,1,D]}}),N.push(u));let d=multiply({inputs:{a:s,b:u},backend:a});c=sum({inputs:{x:d},backend:a,attrs:{axis:l,keepDims:!0}}),N.push(d)}else{let u=(0,o.x8V)(e.dtype,t.dtype),d=new MatMulPackedProgram(_,k,[F,m,g],r,n,B,U,M,L),h=[$,A];if(null!=i&&h.push(i),M&&h.push(s),L){let e=a.makeTensorInfo([],"float32",o.D5U.createScalarValue(l,"float32"));h.push(e),N.push(e)}c=a.runWebGLProgram(d,h,u)}let z=reshape({inputs:{x:c},backend:a,attrs:{shape:w}});for(let e of(N.push(c),N))a.disposeIntermediateTensorInfo(e);return z}let K={kernelName:o.usg,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{a,b:i,bias:o,preluActivationWeights:s}=t,{transposeA:l,transposeB:u,activation:c,leakyreluAlpha:d}=n;return batchMatMulImpl({a,b:i,transposeA:l,transposeB:u,backend:r,bias:o,preluActivationWeights:s,leakyreluAlpha:d,activation:c})}},X="return abs(x);",q={kernelName:o.SYM,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{x:a}=r;if(n.shouldExecuteOnCPU([a])&&"complex64"!==a.dtype){let e=n.texData.get(a.dataId),t=(0,M.CJ)(e.values);return n.makeTensorInfo(a.shape,a.dtype,t)}return t=(0,o.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new F.cc(a.shape,X):new N.l(a.shape,X),n.runWebGLProgram(t,[a],a.dtype)}},Y=N.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,Q=unaryKernelFunc({opSnippet:Y}),J={kernelName:o.VGw,backendName:"webgl",kernelFunc:Q},ee=N.D1+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,et=unaryKernelFunc({opSnippet:ee}),er={kernelName:o.SpW,backendName:"webgl",kernelFunc:et},en="return a + b;",ea=binaryKernelFunc({opSnippet:en,packedOpSnippet:en,supportsComplex:!0,cpuKernelImpl:M.cK}),ei={kernelName:o.mm_,backendName:"webgl",kernelFunc:ea};/**
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
 */let AddNProgram=class AddNProgram{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`float v${e} = get${e}AtOutCoords();`)});let n=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        float result = ${n};
        setOutput(result);
      }
    `}};/**
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
 */let AddNPackedProgram=class AddNPackedProgram{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`vec4 v${e} = get${e}AtOutCoords();`)});let n=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};let eo={kernelName:o.Xze,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function addN(e){let{inputs:t,backend:r}=e;if(1===t.length)return identity({inputs:{x:t[0]},backend:r});if(t.length>(0,o.OBj)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let e=Math.floor(t.length/2),n=addN({inputs:t.slice(0,e),backend:r}),a=addN({inputs:t.slice(e),backend:r});return addN({inputs:[n,a],backend:r})}let n=t.map(e=>e.dtype).reduce((e,t)=>(0,o.x8V)(e,t)),a=t.map(e=>e.shape),i=(0,o.OBj)().getBool("WEBGL_PACK"),s=i?new AddNPackedProgram(t[0].shape,a):new AddNProgram(t[0].shape,a);return r.runWebGLProgram(s,t,n)}},es={kernelName:o.oT6,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,c=o.D5U.parseAxisParam(s,i.shape),d=c,h=o.backend_util.getAxesPermutation(d,u),f=i;null!=h&&(f=transpose({inputs:{x:i},backend:n,attrs:{perm:h}}),d=o.backend_util.getInnerMostAxes(d.length,u)),o.backend_util.assertAxesAreInnerMostDims("all",d,u);let[p,m]=o.backend_util.computeOutAndReduceShapes(f.shape,d),g=o.D5U.sizeFromShape(m),y=reshape({inputs:{x:f},backend:n,attrs:{shape:[-1,g]}}),x=reduce(y,y.dtype,"all",n);if(l){let e=o.backend_util.expandShapeToKeepDim(p,c);t=reshape({inputs:{x:x},backend:n,attrs:{shape:e}})}else t=reshape({inputs:{x:x},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(x),null!=h&&n.disposeIntermediateTensorInfo(f),t}},el={kernelName:o.IKK,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,c=o.D5U.parseAxisParam(s,i.shape),d=c,h=o.backend_util.getAxesPermutation(d,u),f=i;null!=h&&(f=transpose({inputs:{x:i},backend:n,attrs:{perm:h}}),d=o.backend_util.getInnerMostAxes(d.length,u)),o.backend_util.assertAxesAreInnerMostDims("any",d,u);let[p,m]=o.backend_util.computeOutAndReduceShapes(f.shape,d),g=o.D5U.sizeFromShape(m),y=reshape({inputs:{x:f},backend:n,attrs:{shape:[-1,g]}}),x=reduce(y,y.dtype,"any",n);if(l){let e=o.backend_util.expandShapeToKeepDim(p,c);t=reshape({inputs:{x:x},backend:n,attrs:{shape:e}})}else t=reshape({inputs:{x:x},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(x),null!=h&&n.disposeIntermediateTensorInfo(f),t}};/**
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
 */let ArgMinMaxProgram=class ArgMinMaxProgram{constructor(e,t,r){this.variableNames=["A"];let{windowSize:n,batchSize:a,outSize:i}=e;r||this.variableNames.push("bestIndicesA"),this.outputShape=[a,i],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${r?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));"};
          float candidate = getA(batch, inIdx);
          if (candidate ${"max"===t?">":"<"} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};/**
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
 */let ArgMinMaxPackedProgram=class ArgMinMaxPackedProgram{constructor(e,t,r,n){let a,i;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,o.D5U.assert(e.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let s=e[e.length-1],l=Math.ceil(s/t);this.outputShape=e.slice(0,-1),l>1&&this.outputShape.push(l),n||this.variableNames.push("bestIndicesA");let u=this.outputShape,c=u.length,d=(0,y.kW)(c),h=(0,g.Ky)("coords",c);if(1===l){i=c+1;let e=(0,y.kW)(i);a=`
        ${e} sourceLocR = ${e}(${h.join()}, 0);
        ++${h[c-1]};
        ${e} sourceLocG = ${e}(${h.join()}, 0);
        ++${h[c-2]};
        ${e} sourceLocA = ${e}(${h.join()}, 0);
        --${h[c-1]};
        ${e} sourceLocB = ${e}(${h.join()}, 0);
        --${h[c-2]};`}else i=c,a=`
        ${d} sourceLocR = coords;
        ++${h[c-1]};
        ${d} sourceLocG = coords;
        ++${h[c-2]};
        ${d} sourceLocA = coords;
        --${h[c-1]};
        ${d} sourceLocB = coords;
        --${h[c-2]};`;let f=["x","y","z","w","u","v"].slice(0,i),p="."+f[i-1],m=f.map(e=>"int "+e),x=(0,g.Ky)("sourceLocR",i-1).concat("inIdx.r"),b=(0,g.Ky)("sourceLocG",i-1).concat("inIdx.g"),v=(0,g.Ky)("sourceLocB",i-1).concat("inIdx.b"),C=(0,g.Ky)("sourceLocA",i-1).concat("inIdx.a"),w=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${v.join()}),
                             getBestIndicesAChannel(${C.join()})));`,_=`vec4(
            getAChannel(${x.join()}),
            hasNextCol ? getAChannel(${b.join()}) : 0.,
            hasNextRow ? getAChannel(${v.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${C.join()}) : 0.)`,k=n?"":`
      float getBestIndicesAChannel(${m.join()}) {
        return getChannel(getBestIndicesA(${f.join()}),
                                          vec2(${f.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${m.join()}) {
        return getChannel(getA(${f.join()}),
                               vec2(${f.slice(-2).join()}));
      }
      ${k}
      void main() {
        ${d} coords = getOutputCoords();
        bool hasNextCol = ${h[c-1]} < ${u[c-1]-1};
        bool hasNextRow = ${h[c-2]} < ${u[c-2]-1};
        ${a}
        ivec4 srcIdx = ivec4(sourceLocR${p}, sourceLocG${p},
          sourceLocB${p}, sourceLocA${p}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${_};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${w}
          vec4 candidate = ${_};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${"max"===r?"greaterThan":"lessThan"}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function argMinMaxReduce(e,t,r,n){let a=[r];if(o.backend_util.assertAxesAreInnerMostDims("arg"+n.charAt(0).toUpperCase()+n.slice(1),a,t.shape.length),!(0,o.OBj)().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let r=[],i=e.texData.get(t.dataId),s=null!==i&&i.isPacked,l=t;s&&r.push(l=e.unpackTensor(t));let[u,c]=o.backend_util.computeOutAndReduceShapes(l.shape,a),d=o.D5U.sizeFromShape(c),h=reshape({inputs:{x:l},backend:e,attrs:{shape:[-1,d]}});r.push(h);let f=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function argReduce(e,t,r,n=null){let a=t.shape[0],i=t.shape[1];null!=n&&(a=n.shape[0],i=n.shape[1]);let s=o.backend_util.computeOptimalWindowSize(i),l={windowSize:s,inSize:i,batchSize:a,outSize:Math.ceil(i/s)},u=new ArgMinMaxProgram(l,r,null==n),c=[t];null!=n&&c.push(n);let d=e.runWebGLProgram(u,c,"int32");if(1===d.shape[1])return d;let h=argReduce(e,t,r,d);return e.disposeIntermediateTensorInfo(d),h}(e,h,n);r.push(f);let p=reshape({inputs:{x:f},backend:e,attrs:{shape:u}});return r.forEach(t=>e.disposeIntermediateTensorInfo(t)),p}return function argReducePacked(e,t,r,n=null){let a=null!=n?n.shape:t.shape,i=a[a.length-1],s=o.backend_util.computeOptimalWindowSize(i),l=new ArgMinMaxPackedProgram(a,s,r,null==n),u=null==n?[t]:[t,n],c=e.runWebGLProgram(l,u,"int32");if(c.shape.length===t.shape.length){let n=argReducePacked(e,t,r,c);return e.disposeIntermediateTensorInfo(c),n}return c}(e,t,n)}let eu={kernelName:o.sJF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i}=n,s=o.D5U.parseAxisParam(i,a.shape),l=o.backend_util.getAxesPermutation(s,a.shape.length),u=a,c=[];null!=l&&(c.push(u=transpose({inputs:{x:a},backend:r,attrs:{perm:l}})),s=o.backend_util.getInnerMostAxes(s.length,u.shape.length)),o.backend_util.assertAxesAreInnerMostDims("argMax",[s[0]],u.shape.length);let d=argMinMaxReduce(r,u,s[0],"max");return c.forEach(e=>r.disposeIntermediateTensorInfo(e)),d}},ec={kernelName:o.aJk,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:i}=n,s=o.D5U.parseAxisParam(i,a.shape),l=o.backend_util.getAxesPermutation(s,a.shape.length),u=a,c=[];null!=l&&(c.push(u=transpose({inputs:{x:a},backend:r,attrs:{perm:l}})),s=o.backend_util.getInnerMostAxes(s.length,u.shape.length)),o.backend_util.assertAxesAreInnerMostDims("argMin",[s[0]],u.shape.length);let d=argMinMaxReduce(r,u,s[0],"min");return c.forEach(e=>r.disposeIntermediateTensorInfo(e)),d}},ed=N.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,eh=unaryKernelFunc({opSnippet:ed}),ef={kernelName:o.M2y,backendName:"webgl",kernelFunc:eh},ep=N.D1+"return log(x + sqrt(x * x + 1.0));",em=unaryKernelFunc({opSnippet:ep}),eg={kernelName:o.qw7,backendName:"webgl",kernelFunc:em},ey=N.D1+`
  return atan(x);
`,ex=unaryKernelFunc({opSnippet:ey}),eb={kernelName:o.jMg,backendName:"webgl",kernelFunc:ex},ev=m+`
  return atan(a, b);
`,eI=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+x+`
  return result;
`,eC=binaryKernelFunc({opSnippet:ev,packedOpSnippet:eI}),ew={kernelName:o.QCc,backendName:"webgl",kernelFunc:eC},e_=N.D1+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,eS=unaryKernelFunc({opSnippet:e_}),eT={kernelName:o.Oyi,backendName:"webgl",kernelFunc:eS};/**
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
 */let Pool2DProgram=class Pool2DProgram{constructor(e,t,r,n=!1,a=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let i=e.filterWidth,o=e.strideHeight,s=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterHeight,d=e.effectiveFilterWidth,h=e.padInfo.top,f=e.padInfo.left;this.outputShape=e.outShape;let p="avg"===t,m=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,g=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,y="0.0";if(p||(y="-1.0 / 1e-20"),r){this.userCode=`
        const ivec2 strides = ivec2(${o}, ${s});
        const ivec2 pads = ivec2(${h}, ${f});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${c};
              wR += ${l}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?a?m:g:`wR * ${d} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let x=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(x="avgValue / max(count, 1.0)");let b=4*Math.floor(i/4),v=i%4,C=`
      if (${p}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${o}, ${s});
      const ivec2 pads = ivec2(${h}, ${f});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${y});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${c};
            wR += ${l}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${b}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${C}
          }

          int xC = xCCorner + ${b};
          if (${1===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${C}
          } else if (${2===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${C}
          } else if (${3===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${C}
          }
        }
        setOutput(${x});
      }
    `}};let Pool3DProgram=class Pool3DProgram{constructor(e,t,r,n=!1,a=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let i=e.filterWidth,o=e.strideDepth,s=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,c=e.dilationHeight,d=e.dilationWidth,h=e.effectiveFilterDepth,f=e.effectiveFilterHeight,p=e.effectiveFilterWidth,m=e.padInfo.front,g=e.padInfo.top,y=e.padInfo.left;this.outputShape=e.outShape;let x="avg"===t,b="0.0";if(x||(b="-1.0 / 1e-20"),r){this.userCode=`
        const ivec3 strides =
            ivec3(${o}, ${s}, ${l});
        const ivec3 pads = ivec3(${m}, ${g}, ${y});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${h};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${c}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${p};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?a?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${f} * ${p} +
                      wR * ${p} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / max(count, 1.0)");let C=4*Math.floor(i/4),w=i%4,_=`
      if (${x}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${o}, ${s}, ${l});
      const ivec3 pads = ivec3(${m}, ${g}, ${y});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${h};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${C}; wC += 4) {
              int xC = xCCorner + wC * ${d};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                getValue(batch, xD, xR, xC + 3 * ${d}, ch)
              );

              ${_}
            }

            int xC = xCCorner + ${C};
            if (${1===w}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${_}
            } else if (${2===w}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${_}
            } else if (${3===w}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${_}
            }
          }
        }
        setOutput(${v});
      }
    `}};let ek={kernelName:o.JhU,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;(0,c.assertNotComplex)(a,"avgPool");let{filterSize:i,strides:s,pad:l,dimRoundingMode:u}=n;o.D5U.assert(o.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let d=o.backend_util.computePool2DInfo(a.shape,i,s,1,l,u);if(1===d.filterWidth&&1===d.filterHeight&&o.D5U.arraysEqual(d.inShape,d.outShape))return identity({inputs:{x:a},backend:r});let h=new Pool2DProgram(d,"avg",!1);return r.runWebGLProgram(h,[a],"float32")}},eE={kernelName:o._k9,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{filterSize:i,strides:s,pad:l,dimRoundingMode:u,dataFormat:c}=n,d=o.backend_util.computePool3DInfo(a.shape,i,s,[1,1,1],l,u,c),h=new Pool3DProgram(d,"avg",!1);return r.runWebGLProgram(h,[a],"float32")}};/**
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
 */let AvgPool2DBackpropProgram=class AvgPool2DBackpropProgram{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=s-1-e.padInfo.top,c=l-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${u}, ${c});
      const float avgMultiplier = float(${1/(t*r)});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
            wR += ${i}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${l};
            wC+= ${o}) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}};let AvgPool3DBackpropProgram=class AvgPool3DBackpropProgram{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterDepth,d=e.effectiveFilterHeight,h=e.effectiveFilterWidth,f=c-1-e.padInfo.front,p=d-1-e.padInfo.top,m=h-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${f}, ${p}, ${m});
      const float avgMultiplier = float(${1/(t*r*n)});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${c};
            wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${a}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${l}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${h};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let eR={kernelName:o.IMb,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:c}=n,d=o.backend_util.computePool3DInfo(i.shape,s,l,[1,1,1],u,c),h=new AvgPool3DBackpropProgram(d);return r.runWebGLProgram(h,[a],i.dtype)}},e$={kernelName:o.ROF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t;(0,c.assertNotComplex)([a,i],"avgPoolGrad");let{filterSize:s,strides:l,pad:u}=n,d=o.backend_util.computePool2DInfo(i.shape,s,l,1,u),h=new AvgPool2DBackpropProgram(d);return r.runWebGLProgram(h,[a],i.dtype)}},eA={kernelName:o.XLW,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{a,b:i}=t,{transposeA:o,transposeB:s}=n;return batchMatMulImpl({a,b:i,transposeA:o,transposeB:s,backend:r})}};/**
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
 */let BatchNormProgram=class BatchNormProgram{constructor(e,t,r,n,a,i){this.outputShape=[],this.variableNames=["x","mean","variance"],o.backend_util.assertAndGetBroadcastShape(e,t),o.backend_util.assertAndGetBroadcastShape(e,r);let s="0.0";null!=n&&(o.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="1.0";null!=a&&(o.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${s};
        float scale = ${l};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let BatchNormPackedProgram=class BatchNormPackedProgram{constructor(e,t,r,n,a,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],o.backend_util.assertAndGetBroadcastShape(e,t),o.backend_util.assertAndGetBroadcastShape(e,r);let s="vec4(0.0)";null!=n&&(o.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="vec4(1.0)";null!=a&&(o.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${s};
        vec4 scale = ${l};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}};let eN={kernelName:o.sHE,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:n,mean:a,variance:i,offset:s,scale:l}=e;o.D5U.assert(a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),o.D5U.assert(null==s||a.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),o.D5U.assert(null==l||a.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=r;null==u&&(u=.001);let c=[n,a,i],d=null;null!=s&&(d=s.shape,c.push(s));let h=null;null!=l&&(h=l.shape,c.push(l));let f=(0,o.OBj)().getBool("WEBGL_PACK_NORMALIZATION")?new BatchNormPackedProgram(n.shape,a.shape,i.shape,d,h,u):new BatchNormProgram(n.shape,a.shape,i.shape,d,h,u),p=t.runWebGLProgram(f,c,c[0].dtype);return p}};/**
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
 */let SliceProgram=class SliceProgram{constructor(e){let t;this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let r=(0,y.kW)(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let n=function(e){if(1===e)return"sourceLoc";if(e<=6)return eO.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}(this.rank),a=e.map((e,t)=>`sourceLoc.${eO[t]} = start[${t}] + coords.${eO[t]};`);t=`
        ${r} sourceLoc;
        ${r} coords = getOutputCoords();
        ${a.join("\n")}
      `,this.userCode=`
      void main() {
        ${t}
        setOutput(getSource(${n}));
      }
    `}};let eO=["x","y","z","w","u","v"];/**
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
 */let SlicePackedProgram=class SlicePackedProgram{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=(0,y.kW)(this.rank),r=(0,g.Ky)("coords",this.rank),n=(0,g.Ky)("sourceLoc",this.rank),a=1===this.rank?"sourceLoc":`vec2(${n.slice(-2).join()})`,i=`getChannel(getSource(${n.join()}), ${a})`,o=`
      result.x = ${i};
      if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${i};
        --${n[this.rank-1]};
      }
    `,s=1===this.rank?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${e[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${i};
        if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${i};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${n[t]} = ${r[t]} + start[${t}];`).join("\n");this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${l}
        vec4 result = vec4(0.);
        ${o}
        ${s}
        setOutput(result);
      }
    `}};function slice(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{begin:i,size:s}=n,[l,u]=o.kuN.parseSliceParams(a,i,s);if(o.kuN.assertParamsValid(a,l,u),0===o.D5U.sizeFromShape(u))return r.makeTensorInfo(u,a.dtype,[]);if(r.shouldExecuteOnCPU([a])||"string"===a.dtype){let e=r.texData.get(a.dataId),t=(0,M.nT)(e.values,l,u,a.shape,a.dtype);return r.makeTensorInfo(u,a.dtype,t)}let{isPacked:c}=r.texData.get(a.dataId),d=o.kuN.isSliceContinous(a.shape,l,u);if(c||!d){let e=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new SlicePackedProgram(u):new SliceProgram(u),t=[l];return r.runWebGLProgram(e,[a],a.dtype,t)}return r.uploadToGPU(a.dataId),/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){let a=n.texData.get(e.dataId),i=n.makeTensorInfo(r,e.dtype),s=n.texData.get(i.dataId);Object.assign(s,a),s.refCount=1,s.shape=r,s.dtype=e.dtype;let l=o.kuN.computeFlatOffset(t,o.D5U.computeStrides(e.shape));a.slice&&(l+=a.slice.flatOffset),s.slice={flatOffset:l,origDataId:a.slice&&a.slice.origDataId||e.dataId};let u=n.dataRefCount.get(s.slice.origDataId)||1;return n.dataRefCount.set(s.slice.origDataId,u+1),i}(a,l,u,r)}let eF={kernelName:o.p2w,backendName:"webgl",kernelFunc:slice},eP={kernelName:o.zws,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockShape:i,crops:s}=n;o.D5U.assert(a.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let l=i.reduce((e,t)=>e*t),u=o.backend_util.getReshaped(a.shape,i,l),c=o.backend_util.getPermuted(u.length,i.length),d=o.backend_util.getReshapedPermuted(a.shape,i,l),h=o.backend_util.getSliceBeginCoords(s,i.length),f=o.backend_util.getSliceSize(d,s,i.length),p=[],m=reshape({inputs:{x:a},backend:r,attrs:{shape:u}}),g=transpose({inputs:{x:m},backend:r,attrs:{perm:c}}),y=reshape({inputs:{x:g},backend:r,attrs:{shape:d}}),x=slice({inputs:{x:y},backend:r,attrs:{begin:h,size:f}});return p.push(m),p.push(g),p.push(y),p.forEach(e=>r.disposeIntermediateTensorInfo(e)),x}},eD={kernelName:o.zvY,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,weights:i}=t,{size:o}=n,s=r.readSync(a.dataId),l=r.readSync(i.dataId),u=(0,M.qO)(s,l,i.dtype,i.shape,o);return r.makeTensorInfo([o],i.dtype,u)}},eB=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,eM=`
  return float(int(a.r) & int(b.r));
`,eL={kernelName:o.hCO,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{a,b:i}=r,s=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS"),l=(0,o.OBj)().getNumber("WEBGL_VERSION");if(n.shouldExecuteOnCPU([a,i])||1===l){let e=n.texData.get(a.dataId).values,t=n.texData.get(i.dataId).values,[r,o]=(0,M.XM)(a.shape,i.shape,e,t,a.dtype),s=n.makeTensorInfo(o,a.dtype),l=n.texData.get(s.dataId);return l.values=r,s}return t=s?new BinaryOpPackedProgram(eB,a.shape,i.shape,!1):new BinaryOpProgram(eM,a.shape,i.shape),n.runWebGLProgram(t,[a,i],a.dtype)}},eU={kernelName:o.eEB,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{s0:n,s1:a}=t,i=r.readSync(n.dataId),s=r.readSync(a.dataId),l=o.backend_util.assertAndGetBroadcastShape(Array.from(i),Array.from(s));return r.makeTensorInfo([l.length],"int32",Int32Array.from(l))}},eV=binaryKernelFunc({opSnippet:"return float(a != b);",cpuKernelImpl:M.cZ,dtype:"bool"}),eW={kernelName:o.yQU,backendName:"webgl",kernelFunc:eV};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function real(e){let{inputs:t,backend:r}=e,{input:n}=t,a=r.texData.get(n.dataId);return identity({inputs:{x:a.complexTensorInfos.real},backend:r})}let ez={kernelName:o.xJR,backendName:"webgl",kernelFunc:real},eG={kernelName:o.RFZ,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cast(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{dtype:i}=n;if("complex64"===i){if("complex64"===a.dtype)return identity({inputs:{x:a},backend:r});let e=o.lls(a.shape),t=cast({inputs:{x:a},backend:r,attrs:{dtype:"float32"}}),n=complex({inputs:{real:t,imag:e},backend:r});return e.dispose(),r.disposeIntermediateTensorInfo(t),n}if("complex64"===a.dtype){let e=real({inputs:{input:a},backend:r}),t=cast({inputs:{x:e},backend:r,attrs:{dtype:i}});return r.disposeIntermediateTensorInfo(e),t}if(!o.D5U.hasEncodingLoss(a.dtype,i)){let e=identity({inputs:{x:a},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:i}}if(r.shouldExecuteOnCPU([a])){let e=r.texData.get(a.dataId).values,[t,n,o]=(0,M.cm)(e,a.shape,a.dtype,i);return r.makeTensorInfo(t,n,o)}if("int32"===i)return function(e,t){let r=new N.l(e.shape,"return float(int(x));"),n=t.runWebGLProgram(r,[e],"int32");return{dataId:n.dataId,shape:n.shape,dtype:n.dtype}}(a,r);if("bool"===i){let e=r.makeTensorInfo([],"bool",o.D5U.getTypedArrayFromDType("bool",1)),t=eV({inputs:{a:a,b:e},backend:r});return r.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${a.dtype} to ${i}`)}},eZ="return ceil(x);",ej=unaryKernelFunc({opSnippet:eZ,packedOpSnippet:eZ,cpuKernelImpl:M.pk}),eK={kernelName:o.gJX,backendName:"webgl",kernelFunc:ej};/**
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
 */let ClipProgram=class ClipProgram{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ClipPackedProgram=class ClipPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};let eH={kernelName:o.xnO,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{clipValueMin:s,clipValueMax:l}=a;t=(0,o.OBj)().getBool("WEBGL_PACK_CLIP")?new ClipPackedProgram(i.shape):new ClipProgram(i.shape);let u=[[s],[l]];return n.runWebGLProgram(t,[i],i.dtype,u)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ComplexAbsProgram=class ComplexAbsProgram{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function makeComplexComponentTensorInfo(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}let eX={kernelName:o.yj2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:n}=t,a=r.texData.get(n.dataId),i=new ComplexAbsProgram(n.shape),o=[makeComplexComponentTensorInfo(n,a.complexTensorInfos.real),makeComplexComponentTensorInfo(n,a.complexTensorInfos.imag)];return r.runWebGLProgram(i,o,o[0].dtype)}};/**
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
 */let ConcatProgram=class ConcatProgram{constructor(e){this.outputShape=[],this.outputShape=o.backend_util.computeOutShape(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let r=1;r<t.length;r++)t[r]=t[r-1]+e[r][1];let r=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let n=t[e-1];r.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${n}));`)}let n=t.length,a=t[t.length-1];r.push(`else setOutput(getT${n}(yR, yC-${a}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${r.join("\n        ")}
      }
    `}};/**
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
 */let ConcatPackedProgram=class ConcatPackedProgram{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=o.backend_util.computeOutShape(e,t);let r=this.outputShape,n=r.length,a=(0,y.kW)(n),i=(0,g.Ky)("coords",n),s=["x","y","z","w","u","v"].slice(0,n);this.variableNames=e.map((e,t)=>`T${t}`);let l=Array(e.length-1);l[0]=e[0][t];for(let r=1;r<l.length;r++)l[r]=l[r-1]+e[r][t];let u=s[t],c=s.slice(-2),d=s.join(),h=`if (${u} < ${l[0]}) {
        return getChannel(
            getT0(${d}), vec2(${c.join()}));
        }`;for(let e=1;e<l.length;e++){let t=l[e-1];h+=`
        if (${u} < ${l[e]}  && ${u} >= ${l[e-1]}) {
          return getChannel(
            getT${e}(${shiftedChannels(s,u,t)}),
            vec2(${shiftedChannels(c,u,t)}));
        }`}let f=l.length,p=l[l.length-1];h+=`
        return getChannel(
          getT${f}(${shiftedChannels(s,u,p)}),
          vec2(${shiftedChannels(c,u,p)}));`,this.userCode=`
      float getValue(${s.map(e=>"int "+e)}) {
        ${h}
      }

      void main() {
        ${a} coords = getOutputCoords();
        vec4 result = vec4(getValue(${i}), 0., 0., 0.);

        ${i[n-1]} = ${i[n-1]} + 1;
        if (${i[n-1]} < ${r[n-1]}) {
          result.g = getValue(${i});
        }

        ${i[n-2]} = ${i[n-2]} + 1;
        if (${i[n-2]} < ${r[n-2]}) {
          result.a = getValue(${i});
        }

        ${i[n-1]} = ${i[n-1]} - 1;
        if (${i[n-2]} < ${r[n-2]} &&
            ${i[n-1]} < ${r[n-1]}) {
          result.b = getValue(${i});
        }
        setOutput(result);
      }
    `}};function shiftedChannels(e,t,r){let n=e.indexOf(t),a=e.map((e,t)=>t===n?`${e} - ${r}`:e);return a.join()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function imag(e){let{inputs:t,backend:r}=e,{input:n}=t,a=r.texData.get(n.dataId);return identity({inputs:{x:a.complexTensorInfos.imag},backend:r})}let eq={kernelName:o.J_u,backendName:"webgl",kernelFunc:imag};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concat(e){let{inputs:t,backend:r,attrs:n}=e,{axis:a}=n,i=o.D5U.parseAxisParam(a,t[0].shape)[0],s=t.map(e=>e.shape);o.backend_util.assertParamsConsistent(s,i);let l=o.backend_util.computeOutShape(t.map(e=>e.shape),i);if(0===o.D5U.sizeFromShape(l))return r.makeTensorInfo(l,t[0].dtype,[]);let u=t.filter(e=>o.D5U.sizeFromShape(e.shape)>0);return 1===u.length?identity({inputs:{x:u[0]},backend:r}):/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concatImpl(e,t,r){let n=e[0].dtype;if("complex64"===n){let n=e.map(e=>real({inputs:{input:e},backend:r})),a=e.map(e=>imag({inputs:{input:e},backend:r})),i=concatImpl(n,t,r),o=concatImpl(a,t,r),s=complex({inputs:{real:i,imag:o},backend:r});return n.forEach(e=>r.disposeIntermediateTensorInfo(e)),a.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.disposeIntermediateTensorInfo(i),r.disposeIntermediateTensorInfo(o),s}let a=r.shouldExecuteOnCPU(e);if("string"===n&&(a=!0),a){let a=e.map(e=>{let n=o.D5U.sizeFromShape(e.shape.slice(t));return reshape({inputs:{x:e},backend:r,attrs:{shape:[-1,n]}})}),i=a.map(e=>({vals:r.readSync(e.dataId),shape:e.shape})),s=o.backend_util.computeOutShape(a.map(e=>e.shape),1),l=1===a[0].shape[0],u=(0,M.n7)(i,s,n,l),c=o.backend_util.computeOutShape(e.map(e=>e.shape),t),d=r.makeTensorInfo(c,n,u);return a.forEach(e=>r.disposeIntermediateTensorInfo(e)),d}let i=e.filter(e=>o.D5U.sizeFromShape(e.shape)>0),s=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&i[0].shape.length>1;if(1===i.length){let t=s?new N.l(e[0].shape,N.bl):new F.cc(e[0].shape,N.bl);return r.runWebGLProgram(t,e,n)}let l=(0,o.OBj)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(i.length>l){let e=[];for(let n=0;n<i.length;n+=l){let a=i.slice(n,n+l);e.push(concatImpl(a,t,r))}let n=concatImpl(e,t,r);for(let t of e)r.disposeIntermediateTensorInfo(t);return n}if(s){let e=new ConcatPackedProgram(i.map(e=>e.shape),t);return r.runWebGLProgram(e,i,n)}let{tensors2D:u,outShape:c}=function(e,t,r){let n=o.backend_util.computeOutShape(e.map(e=>e.shape),t),a=e.map(e=>reshape({inputs:{x:e},attrs:{shape:[-1,o.D5U.sizeFromShape(e.shape.slice(t))]},backend:r}));return{tensors2D:a,outShape:n}}(i,t,r),d=new ConcatProgram(u.map(e=>e.shape)),h=r.runWebGLProgram(d,u,n);u.forEach(e=>r.disposeIntermediateTensorInfo(e));let f=reshape({inputs:{x:h},attrs:{shape:c},backend:r});return r.disposeIntermediateTensorInfo(h),f}(u,i,r)}let eY={kernelName:o.Eh3,backendName:"webgl",kernelFunc:concat};/**
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
 */let Conv2DProgram=class Conv2DProgram{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let i=e.padInfo.top,o=e.padInfo.left,s=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,d=e.filterHeight,h=e.filterWidth,f=4*Math.floor(e.inChannels/4),p=e.inChannels%4,m="channelsLast"===e.dataFormat,g="",y="";r&&(g=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,y="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${g}

      const ivec2 strides = ivec2(${s}, ${l});
      const ivec2 pads = ivec2(${i}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${m?3:1}];

        ivec2 xRCCorner =
            ivec2(coords[${m?1:2}], coords[${m?2:3}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${d}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${h}; wC++) {
            int xC = xCCorner + wC * ${c};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${f}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${m}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${1===p}) {

              if (${m}) {
                dotProd +=
                    getX(batch, xR, xC, ${f}) *
                    getW(wR, wC, ${f}, d2);
              } else {
                dotProd +=
                    getX(batch, ${f}, xR, xC) *
                    getW(wR, wC, ${f}, d2);
              }

            } else if (${2===p}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2)
              );

              if (${m}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${3===p}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2),
                getW(wR, wC, ${f} + 2, d2)
              );

              if (${m}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1),
                  getX(batch, xR, xC, ${f} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC),
                  getX(batch, ${f} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${y}
        setOutput(result);
      }
    `}};let Conv3DProgram=class Conv3DProgram{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,r=e.padInfo.top,n=e.padInfo.left,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.filterDepth,d=e.filterHeight,h=e.filterWidth,f=4*Math.floor(e.inChannels/4),p=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${a}, ${i}, ${o});
      const ivec3 pads = ivec3(${t}, ${r}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${c}; wF++) {
          int xF = xFCorner + wF * ${s};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${l};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${h}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${f}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${1===p}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${f}) *
                  getW(wF, wR, wC, ${f}, d2);
              } else if (${2===p}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${3===p}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1),
                  getX(batch, xF, xR, xC, ${f} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2),
                  getW(wF, wR, wC, ${f} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};/**
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
 */let Conv2DPackedProgram=class Conv2DPackedProgram{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let i=e.padInfo.left,s=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,c=e.filterWidth,d=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<c;e++)d+=`
           vec4 xTexelC${2*e};
           int xTexelC${2*e}Ready;
           vec4 xTexelC${2*e+1};
           int xTexelC${2*e+1}Ready;
           vec4 xC${e};`;d+=`
     for (int r = 0; r < ${u}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<c;e++)d+=`
           xTexelC${2*e} = vec4(0.0);
           xTexelC${2*e}Ready = 0;
           xTexelC${2*e+1} = vec4(0.0);
           xTexelC${2*e+1}Ready = 0;
           xC${e} = vec4(0.0);`;d+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(c+1)/2;t++){let r=2*t;if(d+=`
           xC = xCCorner + ${r*l};
           `,1===s){if(r<c&&(i%2==1?(d+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }
               `,1===l&&r>0?d+=`
                 xC${r} = vec4(xTexelC${r-2}.zw, xTexelC${r}.xy);
                 `:d+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${r} = vec4(previous.zw, xTexelC${r}.xy);
                   } else {
                     xC${r} = vec4(0.0, 0.0, xTexelC${r}.xy);
                   }
                   `):d+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xC${r} = xTexelC${r};
                 `,r+1<c)){let e=i%2==0?o.D5U.nearestLargerEven(l):l;l%2==0&&i%2==1||l%2!=0&&i%2!=1?(d+=`
                   xCOffset = xC + imod(pads[1], 2) + ${e};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                     xTexelC${r+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${r+1}.zw = vec2(0.0);
                     }
                     xTexelC${r+1}Ready = 1;
                   }
                   `,l>1?d+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${r+1} = vec4(previous.zw, xTexelC${r+1}.xy);
                     } else {
                      xC${r+1} = vec4(0.0, 0.0, xTexelC${r+1}.xy);
                     }
                     `:d+=`
                     xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.xy);
                     `):1===e?d+=`
                     xC${r+1} = xTexelC${r};
                     `:d+=`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                       xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${r+1}.zw = vec2(0.0);
                       }
                       xTexelC${r+1}Ready = 1;
                     }

                     xC${r+1} = xTexelC${r+1};
                     `}}else r<c&&(i%2==1?(d+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.0);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
               `,r+1<c&&(d+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${r+1} = vec4(xTexelC${r+1}.xy, final.xy);
                 `)):(d+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                   xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${r+1}.zw = vec2(0.);
                   }
                   xTexelC${r+1}Ready = 1;
                 }

                 xC${r} = vec4(
                   xTexelC${r}.xy, xTexelC${r+1}.xy);
               `,r+1<c&&(d+=`
                   xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
                 `)));r<c&&(d+=`
             wTexel = getW(r, ${r}, d1, d2);
             dotProd += xC${r}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${r}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,r+1<c&&(d+=`
               wTexel = getW(r, ${r+1}, d1, d2);
               dotProd += xC${r+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${r+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}d+=`
     }
   
     }
   
     }
   `;let h="",f="";r&&(h=n?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:a?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:`vec4 activation(vec4 x) {
           ${r}
         }`,f="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${h}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${d}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${t?"result += getBiasAtOutCoords();":""}
         ${f}
         setOutput(result);
       }
     `}};var eQ=r(12011);/**
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
 */let Im2ColPackedProgram=class Im2ColPackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let{dataFormat:r}=t,n=(0,eQ.A)(),a="channelsLast"===r,i=a?1:2,o=a?2:3,s=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)l+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${s}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${i}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${o}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${a}) {
                  innerDims = vec2(d1, ch);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${2*e+t}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${l}

        ${n.output} = result;
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getShapeForBatchMatMul(e,t){let r=e.length;return r>=3?t?[...e.slice(0,-3),e[r-3]*e[r-2],e[r-1]]:[...e.slice(0,-3),e[r-3],e[r-2]*e[r-1]]:!t&&1===r&&e[0]>1?[e[0],1]:null}function conv2dByMatMul({x:e,filter:t,convInfo:r,backend:n,bias:a=null,preluActivationWeights:i=null,leakyreluAlpha:s=0,activation:l=null}){let u;let d=e.shape,h=n.texData.get(e.dataId),f=r.inChannels,p=d[0]*d[1]*d[2],m=r.outChannels,g="channelsLast"===r.dataFormat,y=[];if(null!=i){let e=getShapeForBatchMatMul(i.shape,g);null!=e&&(i=reshape({inputs:{x:i},backend:n,attrs:{shape:e}}),y.push(i))}if(null!=a){let e=getShapeForBatchMatMul(a.shape,g);null!=e&&(a=reshape({inputs:{x:a},backend:n,attrs:{shape:e}}),y.push(a))}let x=!((1===p||1===m)&&f>1e3)&&h.isPacked&&g&&null!=h.texture&&d[2]%2!=0&&o.D5U.arraysEqual(h.shape.slice(-3),d.slice(-3));if(x){let f=d[0]*d[1]*(d[2]+1),p={dataId:e.dataId,shape:[1,f,r.inChannels],dtype:e.dtype},m=h.shape;h.shape=h.shape.slice(),h.shape[h.shape.length-2]++,o.D5U.assert(c.isReshapeFree(h.shape,p.shape),()=>`packed reshape ${h.shape} to ${p.shape} isn't free`);let g=reshape({inputs:{x:t},backend:n,attrs:{shape:[1,r.inChannels,r.outChannels]}});y.push(g);let x=batchMatMulImpl({a:p,b:g,backend:n,transposeA:!1,transposeB:!1,bias:a,activation:l,preluActivationWeights:i,leakyreluAlpha:s}),b=n.texData.get(x.dataId);o.D5U.assert(b.isPacked,()=>"batchMatMul result is expected to be packed"),h.shape=m,b.shape=r.outShape,(u=identity({inputs:{x:x},backend:n})).shape=r.outShape,y.push(x)}else{let o=r.outHeight*r.outWidth,c=reshape({inputs:{x:e},backend:n,attrs:{shape:g?[r.batchSize,o,r.inChannels]:[r.batchSize,r.inChannels,o]}}),d=reshape({inputs:{x:t},backend:n,attrs:{shape:[1,r.inChannels,r.outChannels]}}),h=batchMatMulImpl({a:g?c:d,b:g?d:c,transposeA:!g,transposeB:!1,backend:n,bias:a,activation:l,preluActivationWeights:i,leakyreluAlpha:s});u=reshape({inputs:{x:h},backend:n,attrs:{shape:r.outShape}}),y.push(c),y.push(d),y.push(h)}for(let e of y)n.disposeIntermediateTensorInfo(e);return u}function conv2dWithIm2Row({x:e,filter:t,convInfo:r,backend:n,bias:a=null,preluActivationWeights:i=null,leakyreluAlpha:s=0,activation:l=null}){let{filterWidth:u,filterHeight:c,inChannels:d,outWidth:h,outHeight:f,dataFormat:p}=r,m="channelsLast"===p,g=u*c*d,y=f*h,x=[r.batchSize,g,y],b=[];if(null!=i){let e=getShapeForBatchMatMul(i.shape,m);null!=e&&(i=reshape({inputs:{x:i},backend:n,attrs:{shape:e}}),b.push(i))}if(null!=a){let e=getShapeForBatchMatMul(a.shape,m);null!=e&&(a=reshape({inputs:{x:a},backend:n,attrs:{shape:e}}),b.push(a))}let v=reshape({inputs:{x:t},backend:n,attrs:{shape:[1,g,o.D5U.sizeFromShape(t.shape)/g]}});b.push(v);let C=new Im2ColPackedProgram(x,r),w=[e.shape,[r.padInfo.top,r.padInfo.left],[r.strideHeight,r.strideWidth],[r.dilationHeight,r.dilationWidth],[r.inChannels],[r.filterWidth*r.inChannels],[r.outWidth]],_=n.runWebGLProgram(C,[e],"float32",w),k=reshape({inputs:{x:_},backend:n,attrs:{shape:x}});b.push(_),b.push(k);let $=null!=a,A=null!=i,N="leakyrelu"===l,F=l?mapActivationToShaderProgram(l,!0):null,D=new MatMulPackedProgram(m?k.shape:v.shape,m?v.shape:k.shape,m?[r.batchSize,y,r.outChannels]:[r.batchSize,r.outChannels,y],!0,!1,$,F,A,N),B=m?[k,v]:[v,k];if(a&&B.push(a),A&&B.push(i),N){let e=n.makeTensorInfo([],"float32",o.D5U.createScalarValue(s,"float32"));B.push(e),b.push(e)}let M=n.runWebGLProgram(D,B,"float32"),L=reshape({inputs:{x:M},backend:n,attrs:{shape:r.outShape}});for(let e of(b.push(M),b))n.disposeIntermediateTensorInfo(e);return L}let eJ={kernelName:o.mhS,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dataFormat:c,dilations:d,dimRoundingMode:h}=a,f=o.backend_util.convertConv2DDataFormat(c),p=o.backend_util.computeConv2DInfo(i.shape,s.shape,l,d,u,h,!1,f);if(1===p.filterHeight&&1===p.filterWidth&&1===p.dilationHeight&&1===p.dilationWidth&&1===p.strideHeight&&1===p.strideWidth&&("SAME"===p.padInfo.type||"VALID"===p.padInfo.type))t=conv2dByMatMul({x:i,filter:s,convInfo:p,backend:n});else if(p.strideWidth<=2&&"channelsLast"===f&&(0,o.OBj)().getBool("WEBGL_EXP_CONV")){let e=new Conv2DPackedProgram(p),r=[[p.padInfo.top,p.padInfo.left],[p.strideHeight,p.strideWidth],[p.dilationHeight,p.dilationWidth],[p.inHeight,p.inWidth]];t=n.runWebGLProgram(e,[i,s],"float32",r)}else if((0,o.OBj)().getBool("WEBGL_CONV_IM2COL"))t=conv2dWithIm2Row({x:i,filter:s,convInfo:p,backend:n});else{let e=new Conv2DProgram(p);t=n.runWebGLProgram(e,[i,s],"float32")}let m=reshape({inputs:{x:t},backend:n,attrs:{shape:p.outShape}});return n.disposeIntermediateTensorInfo(t),m}};/**
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
 */let Conv2DDerFilterProgram=class Conv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,a=e.padInfo.left,i="channelsLast"===e.dataFormat;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${a};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${i?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let Conv2DDerInputProgram=class Conv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i="channelsLast"===e.dataFormat,o=t-1-e.padInfo.top,s=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${i?3:1}];

        ivec2 dyCorner = ivec2(coords[${i?1:2}], coords[${i?2:3}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${i}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}};let Conv3DDerFilterProgram=class Conv3DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,a=e.padInfo.front,i=e.padInfo.top,o=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${a};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${i};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${o};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let Conv3DDerInputProgram=class Conv3DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,a=e.strideDepth,i=e.strideHeight,o=e.strideWidth,s=t-1-e.padInfo.front,l=r-1-e.padInfo.top,u=n-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${s}, ${l}, ${u});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${a}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let e0={kernelName:o.wUP,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,pad:l,dataFormat:u,dimRoundingMode:c,filterShape:d}=n,h=o.backend_util.convertConv2DDataFormat(u),f=o.backend_util.computeConv2DInfo(a.shape,d,s,1,l,c,!1,h),p=new Conv2DDerFilterProgram(f);return r.runWebGLProgram(p,[a,i],"float32")}};/**
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
 */let Conv2DDerInputPackedProgram=class Conv2DDerInputPackedProgram{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let t=e.filterHeight,r=e.filterWidth,n=t-1-e.padInfo.top,a=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${n}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            int wCPerm = ${r} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};let e1={kernelName:o.wm,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{inputShape:s,strides:l,pad:u,dataFormat:c,dimRoundingMode:d}=n,h=o.backend_util.convertConv2DDataFormat(c),f=o.backend_util.computeConv2DInfo(s,i.shape,l,1,u,d,!1,h);if((0,o.OBj)().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&"channelsLast"===h){let e=[[f.strideHeight,f.strideWidth]],t=new Conv2DDerInputPackedProgram(f);return r.runWebGLProgram(t,[a,i],"float32",e)}{let e=new Conv2DDerInputProgram(f);return r.runWebGLProgram(e,[a,i],"float32")}}},e2={kernelName:o.x12,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,filter:i}=t,{strides:s,pad:l,dilations:u}=n,c=o.backend_util.computeConv3DInfo(a.shape,i.shape,s,u,l),d=new Conv3DProgram(c);return r.runWebGLProgram(d,[a,i],"float32")}},e3={kernelName:o.o2y,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,pad:l,filterShape:u}=n,c=o.backend_util.computeConv3DInfo(a.shape,u,s,1,l),d=new Conv3DDerFilterProgram(c);return r.runWebGLProgram(d,[a,i],"float32")}},e4={kernelName:o.ik2,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{pad:s,strides:l,inputShape:u}=n,c=o.backend_util.computeConv3DInfo(u,i.shape,l,1,s),d=new Conv3DDerInputProgram(c);return r.runWebGLProgram(d,[a,i],"float32")}},e5=D+`
  return cos(x);
`,e6=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${x}
  return result;
`,e8=unaryKernelFunc({opSnippet:e5,packedOpSnippet:e6}),e7={kernelName:o.mc4,backendName:"webgl",kernelFunc:e8},e9=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,te=unaryKernelFunc({opSnippet:e9}),tt={kernelName:o.TR1,backendName:"webgl",kernelFunc:te};/**
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
 */let CropAndResizeProgram=class CropAndResizeProgram{constructor(e,t,r,n,a){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[i,o,s,l]=e,[u]=t,[c,d]=r;this.outputShape=[u,c,d,l];let[h,f]=[`${o-1}.0`,`${s-1}.0`],[p,m,g]=c>1?[`${(o-1)/(c-1)}`,"(y2-y1) * height_ratio",`y1*${h} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${h}`],[y,x,b]=d>1?[`${(s-1)/(d-1)}`,"(x2-x1) * width_ratio",`x1*${f} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${f}`];this.userCode=`
      const float height_ratio = float(${p});
      const float width_ratio = float(${y});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${i}) {
          return;
        }

        float height_scale = ${m};
        float width_scale = ${x};

        float in_y = ${g};
        if( in_y < 0.0 || in_y > ${h} ) {
          setOutput(float(${a}));
          return;
        }
        float in_x = ${b};
        if( in_x < 0.0 || in_x > ${f} ) {
          setOutput(float(${a}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${"bilinear"===n?1:0} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};let tr={kernelName:o.VcC,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{image:a,boxes:i,boxInd:o}=t,{cropSize:s,method:l,extrapolationValue:u}=n,c=new CropAndResizeProgram(a.shape,i.shape,s,l,u);return r.runWebGLProgram(c,[a,i,o],"float32")}};(a=i||(i={})).Prod="*",a.Sum="+";let CumProgram=class CumProgram{constructor(e,t,r,n){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let a=this.outputShape.length,o=this.op===i.Prod?"1.0":"0.0",s=r?o:`getX(${cum_gpu_getCoords(a,"coords",this.op)})`,l=this.outputShape[this.outputShape.length-1],u="",c="";r?(u=n?`end != ${l-1}`:"end != 0",c=n?"end + 1":"end - 1"):(u=n?`end + pow2 < ${l}`:"end >= pow2",c=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${(0,y.kW)(a)} coords = getOutputCoords();
        int end = ${getFinalCoord(a,"coords",this.op)};
        float val = ${s};
        int pow2 = int(pow(2.0, index));
        if (${u}) {
          int idx = ${c};
          ${getFinalCoord(a,"coords",this.op)} = idx;
          val ${this.op}= getX(${cum_gpu_getCoords(a,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function cum_gpu_getCoords(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}function getFinalCoord(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.y`;if(3===e)return`${t}.z`;if(4===e)return`${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}/**
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
 */function cumImpl(e,t,r,n,a,i){let s=t.shape.length,l=o.backend_util.getAxesPermutation([n],s),u=t;null!=l&&(u=transpose({inputs:{x:t},backend:r,attrs:{perm:l}}));let c=o.backend_util.getInnerMostAxes(1,s)[0];if(c!==s-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${n}`);let d=u.shape[c],h=identity({inputs:{x:u},backend:r});for(let t=0;t<=Math.ceil(Math.log2(d))-1;t++){let n=new CumProgram(e,u.shape,!1,i),a=[[t]],o=h;h=r.runWebGLProgram(n,[h],h.dtype,a),r.disposeIntermediateTensorInfo(o)}if(a){let t=new CumProgram(e,u.shape,a,i),n=h;h=r.runWebGLProgram(t,[h],h.dtype),r.disposeIntermediateTensorInfo(n)}if(null!=l){let e=o.backend_util.getUndoAxesPermutation(l),t=transpose({inputs:{x:h},backend:r,attrs:{perm:e}});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(u),t}return h}let tn={kernelName:o.Byc,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:o,exclusive:s,reverse:l}=n;return cumImpl(i.Prod,a,r,o,s,l)}},ta={kernelName:o.iHb,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{axis:o,exclusive:s,reverse:l}=n;return cumImpl(i.Sum,a,r,o,s,l)}},ti={kernelName:o.QRR,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,weights:i}=t,{size:o,binaryOutput:s}=n;if(1===a.shape.length){let e=r.readSync(a.dataId),t=r.readSync(i.dataId),n=(0,M.qO)(e,t,i.dtype,i.shape,o);return r.makeTensorInfo([o],i.dtype,n)}if(2===a.shape.length){let e=r.bufferSync(a),t=r.bufferSync(i),n=(0,M.cx)(e,t,o,s);return r.makeTensorInfo(n.shape,i.dtype,n.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${a.shape.length}.`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let DepthToSpaceProgram=class DepthToSpaceProgram{constructor(e,t,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};let to={kernelName:o.T0n,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockSize:i,dataFormat:o}=n,s=a.shape[0],l="NHWC"===o?a.shape[1]:a.shape[2],u="NHWC"===o?a.shape[2]:a.shape[3],c="NHWC"===o?a.shape[3]:a.shape[1],d=l*i,h=u*i,f=c/(i*i),p="NHWC"===o?[s,d,h,f]:[s,f,d,h],m=new DepthToSpaceProgram(p,i,o);return r.runWebGLProgram(m,[a],a.dtype)}};/**
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
 */let DepthwiseConv2DProgram=class DepthwiseConv2DProgram{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let i=e.filterHeight,o=e.filterWidth,s=e.outChannels/e.inChannels,l="",u="";r&&(l=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,u="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${l}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${s};
        int q = d2 - d1 * ${s};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${i}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${o}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${u}
        setOutput(result);
      }
    `}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let DepthwiseConvPacked2DProgram=class DepthwiseConvPacked2DProgram{constructor(e,t=!1,r=null,n=!1,a=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,p.C9)(this.outputShape.length);let i=e.outChannels/e.inChannels,s=e.padInfo.left,l=e.strideWidth,u=e.dilationWidth,c=e.filterHeight,d=e.filterWidth,h=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<d;e++)h+=`
          vec4 xTexelC${2*e};
          int xTexelC${2*e}Ready;
          vec4 xTexelC${2*e+1};
          int xTexelC${2*e+1}Ready;
          vec4 xC${e};`;h+=`
    for (int r = 0; r < ${c}; r++) {
      `;for(let e=0;e<d;e++)h+=`
          xTexelC${2*e} = vec4(0.0);
          xTexelC${2*e}Ready = 0;
          xTexelC${2*e+1} = vec4(0.0);
          xTexelC${2*e+1}Ready = 0;
          xC${e} = vec4(0.0);`;h+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(d+1)/2;e++){let t=2*e;if(h+=`
          xC = xCCorner + ${t*u};
          `,1===l){if(t<d&&(s%2==1?(h+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }
              `,1===u&&t>0?h+=`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:h+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${t} = vec4(previous.zw, xTexelC${t}.xy);
                  } else {
                    xC${t} = vec4(0.0, 0.0, xTexelC${t}.xy);
                  }
                  `):h+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<d)){let e=s%2==0?o.D5U.nearestLargerEven(u):u;u%2==0&&s%2==1||u%2!=0&&s%2!=1?(h+=`
                  xCOffset = xC + imod(pads[1], 2) + ${e};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                    xTexelC${t+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${t+1}.zw = vec2(0.0);
                    }
                    xTexelC${t+1}Ready = 1;
                  }
                  `,u>1?h+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:h+=`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):1===e?h+=`
                    xC${t+1} = xTexelC${t};
                    `:h+=`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<d&&(s%2==1?(h+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.0);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
              `,t+1<d&&(h+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(h+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                  xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${t+1}.zw = vec2(0.);
                  }
                  xTexelC${t+1}Ready = 1;
                }

                xC${t} = vec4(
                  xTexelC${t}.xy, xTexelC${t+1}.xy);
              `,t+1<d&&(h+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<d&&(h+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<d&&(h+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}h+=`
    }
  
      }
    `;let f="",m="";r&&(f=n?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:a?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`vec4 activation(vec4 x) {
          ${r}
        }`,m="result = activation(result);"),t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${f}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${h}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${t?"result += getBiasAtOutCoords();":""}
        ${m}
        setOutput(result);
      }
    `}};let ts={kernelName:o.cie,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dilations:c,dimRoundingMode:d}=a,h=c;null==h&&(h=[1,1]),o.D5U.assert(o.backend_util.eitherStridesOrDilationsAreOne(l,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${h}'`);let f=o.backend_util.computeConv2DInfo(i.shape,s.shape,l,h,u,d,!0);t=(0,o.OBj)().getBool("WEBGL_PACK_DEPTHWISECONV")&&f.strideWidth<=2&&f.outChannels/f.inChannels==1?new DepthwiseConvPacked2DProgram(f):new DepthwiseConv2DProgram(f);let p=[[f.padInfo.top,f.padInfo.left],[f.strideHeight,f.strideWidth],[f.dilationHeight,f.dilationWidth],[f.inHeight,f.inWidth]];return n.runWebGLProgram(t,[i,s],"float32",p)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let DepthwiseConv2DDerFilterProgram=class DepthwiseConv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,a=e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${a};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let DepthwiseConv2DDerInputProgram=class DepthwiseConv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,a=e.strideWidth,i=t-1-e.padInfo.top,o=r-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${o});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${a}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${s}; dm++) {
              int d2 = d1 * ${s} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let tl={kernelName:o.sL$,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,dy:i}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:c,filterShape:d}=n,h=o.backend_util.computeConv2DInfo(a.shape,d,s,l,u,c,!0),f=new DepthwiseConv2DDerFilterProgram(h);return r.runWebGLProgram(f,[a,i],"float32")}},tu={kernelName:o.y7R,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,filter:i}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:c,inputShape:d}=n,h=o.backend_util.computeConv2DInfo(d,i.shape,s,l,u,c,!0),f=new DepthwiseConv2DDerInputProgram(h);return r.runWebGLProgram(f,[a,i],"float32")}};/**
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
 */let DiagProgram=class DiagProgram{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};let tc={kernelName:o.$w,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{x:n}=t,a=[...n.shape,...n.shape],i=o.D5U.sizeFromShape(n.shape),s=reshape({inputs:{x:n},backend:r,attrs:{shape:[i]}}),l=new DiagProgram(i),u=r.runWebGLProgram(l,[s],s.dtype),c=reshape({inputs:{x:u},backend:r,attrs:{shape:a}});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(u),c}};/**
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
 */let Dilation2DProgram=class Dilation2DProgram{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:r,padInfo:n,strideHeight:a,strideWidth:i,filterHeight:o,filterWidth:s,dilationHeight:l,dilationWidth:u}=e,{top:c,left:d}=n;this.userCode=`
      const ivec2 strides = ivec2(${a}, ${i});
      const ivec2 pads = ivec2(${c}, ${d});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${o}; h++) {
          int hIn = hBeg + h * ${l};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${s}; w++) {
              int wIn = wBeg + w * ${u};

              if (wIn >= 0 && wIn < ${r}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};let td={kernelName:o.p4S,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s}=r,{strides:l,pad:u,dilations:c}=a,d=o.backend_util.computeDilation2DInfo(i.shape,s.shape,l,u,"NHWC",c),h=new Dilation2DProgram(d);t=n.runWebGLProgram(h,[i,s],"float32");let f=reshape({inputs:{x:t},backend:n,attrs:{shape:d.outShape}});return n.disposeIntermediateTensorInfo(t),f}},th={kernelName:o.$g6,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{equation:a}=n,{allDims:i,summedDims:s,idDims:l}=o.backend_util.decodeEinsumEquation(a,t.length);o.backend_util.checkEinsumDimSizes(i.length,l,t);let{path:u,steps:c}=o.backend_util.getEinsumComputePath(s,l),d=c.length,h=null,f=i.length,p=[];for(let e=0;e<d;++e){for(let n of c[e]){let e;let{permutationIndices:a,expandDims:i}=o.backend_util.getEinsumPermutation(f,l[n]);o.backend_util.isIdentityPermutation(a)?e=t[n]:(e=transpose({inputs:{x:t[n]},backend:r,attrs:{perm:a}}),p.push(e));let s=e.shape.slice();for(let e=0;e<i.length;++e)s.splice(i[e],0,1);o.D5U.arraysEqual(e.shape,s)||(e=reshape({inputs:{x:e},backend:r,attrs:{shape:s}}),p.push(e)),null===h?h=e:(h=multiply({inputs:{a:e,b:h},backend:r}),p.push(h))}e<d-1&&(u[e]>=0&&(h=sum({inputs:{x:h},backend:r,attrs:{axis:u[e]-(i.length-f),keepDims:!1}}),p.push(h)),f--)}for(let e of p)e!==h&&r.disposeIntermediateTensorInfo(e);return h}},tf=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,tp=unaryKernelFunc({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:tf}),tm={kernelName:o.SX0,backendName:"webgl",kernelFunc:tp},tg=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,ty={kernelName:o.HEU,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r}=e,{dy:n,y:a}=t,i=(0,o.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(tg,n.shape,a.shape):new BinaryOpProgram("return (b >= 0.0) ? a : a * (b + 1.0);",n.shape,a.shape);return r.runWebGLProgram(i,[n,a],n.dtype)}},tx=`
  return vec4(equal(a, b));
`,tb=binaryKernelFunc({opSnippet:"return float(a == b);",packedOpSnippet:tx,dtype:"bool",cpuKernelImpl:M.gv}),tv={kernelName:o.hdR,backendName:"webgl",kernelFunc:tb},tI=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${o.backend_util.ERF_P};
  float a1 = ${o.backend_util.ERF_A1};
  float a2 = ${o.backend_util.ERF_A2};
  float a3 = ${o.backend_util.ERF_A3};
  float a4 = ${o.backend_util.ERF_A4};
  float a5 = ${o.backend_util.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,tC=unaryKernelFunc({opSnippet:tI}),tw={kernelName:o.Omj,backendName:"webgl",kernelFunc:tC},t_=D+`
  return exp(x);
`,tS=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,tT=unaryKernelFunc({opSnippet:t_,packedOpSnippet:tS,cpuKernelImpl:M.aX,dtype:"float32"}),tk={kernelName:o.NEP,backendName:"webgl",kernelFunc:tT};/**
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
 */function expandDims(e){let{inputs:t,attrs:r,backend:n}=e,{dim:a}=r,{input:i}=t,s=i.shape.length,l=i.shape.slice(),u=a;return a<0&&(o.D5U.assert(-(s+1)<=a,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+a+1),l.splice(u,0,1),reshape({inputs:{x:i},backend:n,attrs:{shape:l}})}let tE={kernelName:o.YFo,backendName:"webgl",kernelFunc:expandDims},tR="return exp(x) - 1.0;",t$=unaryKernelFunc({opSnippet:tR,packedOpSnippet:tR,cpuKernelImpl:M.tx}),tA={kernelName:o.Y0y,backendName:"webgl",kernelFunc:t$};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FFTProgram=class FFTProgram{constructor(e,t,r){let n;this.variableNames=["real","imag"];let a=t[1];this.outputShape=t;let i=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,o=r?`${a}.0`:"1.0";if("real"===e)n="return real * expR - imag * expI;";else if("imag"===e)n="return real * expI + imag * expR;";else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${i};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${n}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${a});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${a}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${o};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fftImpl(e,t,r){let n=r.texData.get(e.dataId),a=o.D5U.sizeFromShape(e.shape),i=e.shape[e.shape.length-1],s=a/i,l=reshape({inputs:{x:e},backend:r,attrs:{shape:[s,i]}}),u=l.shape,c=new FFTProgram("real",u,t),d=new FFTProgram("imag",u,t),h=[{dataId:n.complexTensorInfos.real.dataId,dtype:n.complexTensorInfos.real.dtype,shape:u},{dataId:n.complexTensorInfos.imag.dataId,dtype:n.complexTensorInfos.imag.dtype,shape:u}],f=r.runWebGLProgram(c,h,"float32"),p=r.runWebGLProgram(d,h,"float32"),m=complex({inputs:{real:f,imag:p},backend:r});r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(p);let g=reshape({inputs:{x:m},backend:r,attrs:{shape:e.shape}});return r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(m),g}let tN={kernelName:o.vwp,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:n}=t;return fftImpl(n,!1,r)}};/**
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
 */let FillProgram=class FillProgram{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e){let{backend:t,attrs:r}=e,{shape:n,value:a}=r,{dtype:i}=r;if("string"===(i=i||o.D5U.inferDtype(a))){let e=o.D5U.getArrayFromDType(i,o.D5U.sizeFromShape(n));return e.fill(a),t.makeTensorInfo(n,i,e)}{let e=new FillProgram(n,a),r=[[a]];return t.runWebGLProgram(e,[],i,r)}}let tO={kernelName:o.deh,backendName:"webgl",kernelFunc:fill};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FlipLeftRightProgram=class FlipLeftRightProgram{constructor(e){this.variableNames=["Image"],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let tF={kernelName:o.Uyb,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{let{image:r}=e,n=new FlipLeftRightProgram(r.shape),a=t.runWebGLProgram(n,[r],r.dtype);return a}},tP="return floor(x);",tD=unaryKernelFunc({opSnippet:tP,packedOpSnippet:tP,cpuKernelImpl:M.MZ}),tB={kernelName:o.OR,backendName:"webgl",kernelFunc:tD},tM=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,tL=`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,tU=binaryKernelFunc({opSnippet:tM,packedOpSnippet:tL,dtype:"int32"}),tV={kernelName:o.jeX,backendName:"webgl",kernelFunc:tU};var tW=r(15389);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FromPixelsProgram=class FromPixelsProgram{constructor(e){this.variableNames=["A"];let t=(0,eQ.A)(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${r}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FromPixelsPackedProgram=class FromPixelsPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=(0,eQ.A)(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${r}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}};/**
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
 */let tz={kernelName:o.eBW,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{pixels:i}=t,{numChannels:s}=a,l="undefined"!=typeof HTMLVideoElement&&i instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&i instanceof HTMLImageElement,[c,d]=l?[i.videoWidth,i.videoHeight]:[i.width,i.height],h=[d,c],f=[d,c,s];if(u||l){let e=(0,o.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(null==n||e!==tG)&&(tG=e,n=document.createElement("canvas").getContext("2d",{willReadFrequently:tG})),n.canvas.width=c,n.canvas.height=d,n.drawImage(i,0,0,c,d),i=n.canvas}let p=r.makeTensorInfo(h,"int32");r.texData.get(p.dataId).usage=tW.v2.PIXELS,r.gpgpu.uploadPixelDataToTexture(r.getTexture(p.dataId),i);let m=(0,o.OBj)().getBool("WEBGL_PACK")?new FromPixelsPackedProgram(f):new FromPixelsProgram(f),g=r.runWebGLProgram(m,[p],"int32");return r.disposeData(p.dataId),g}},tG=(0,o.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU"),tZ={kernelName:o._V0,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s,bias:l,preluActivationWeights:u}=r,{strides:c,pad:d,dataFormat:h,dilations:f,dimRoundingMode:p,activation:m,leakyreluAlpha:g}=a,y=o.backend_util.convertConv2DDataFormat(h),x=o.backend_util.computeConv2DInfo(i.shape,s.shape,c,f,d,p,!1,y),b=[],v=null!=l,C=null!=u,w="leakyrelu"===m,prepareInputs=()=>{let e=[i,s],alignInputWithDataFormat=(e,t)=>{if("NCHW"===t&&1===e.shape.length&&1!==e.shape[0]){let t=reshape({inputs:{x:e},backend:n,attrs:{shape:[e.shape[0],1,1]}});return b.push(t),t}return e};if(v&&e.push(alignInputWithDataFormat(l,h)),C&&e.push(alignInputWithDataFormat(u,h)),w){let t=n.makeTensorInfo([],"float32",o.D5U.createScalarValue(g,"float32"));e.push(t),b.push(t)}return e};if(1===x.filterHeight&&1===x.filterWidth&&1===x.dilationHeight&&1===x.dilationWidth&&1===x.strideHeight&&1===x.strideWidth&&("SAME"===x.padInfo.type||"VALID"===x.padInfo.type))t=conv2dByMatMul({x:i,filter:s,convInfo:x,backend:n,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:g});else if(x.strideWidth<=2&&"channelsLast"===y&&(0,o.OBj)().getBool("WEBGL_EXP_CONV")){let e=m?mapActivationToShaderProgram(m,!0):null,r=new Conv2DPackedProgram(x,v,e,C,w),a=[[x.padInfo.top,x.padInfo.left],[x.strideHeight,x.strideWidth],[x.dilationHeight,x.dilationWidth],[x.inHeight,x.inWidth]],i=prepareInputs();t=n.runWebGLProgram(r,i,"float32",a)}else if((0,o.OBj)().getBool("WEBGL_CONV_IM2COL"))t=conv2dWithIm2Row({x:i,filter:s,convInfo:x,backend:n,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:g});else{let e=m?mapActivationToShaderProgram(m,!1):null,r=new Conv2DProgram(x,v,e,C,w),a=prepareInputs();t=n.runWebGLProgram(r,a,"float32")}let _=reshape({inputs:{x:t},backend:n,attrs:{shape:x.outShape}});return b.push(t),b.forEach(e=>n.disposeIntermediateTensorInfo(e)),_}},tj={kernelName:o.luS,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i,filter:s,bias:l,preluActivationWeights:u}=r,{strides:c,pad:d,dilations:h,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=a,g=[],y=h;null==y&&(y=[1,1]),o.D5U.assert(o.backend_util.eitherStridesOrDilationsAreOne(c,y),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${c} and dilations '${y}'`);let x=o.backend_util.computeConv2DInfo(i.shape,s.shape,c,y,d,f,!0),b=(0,o.OBj)().getBool("WEBGL_PACK_DEPTHWISECONV")&&x.strideWidth<=2&&x.outChannels/x.inChannels==1,v=p?mapActivationToShaderProgram(p,b):null,C=[i,s],w=null!=l,_=null!=u,k="leakyrelu"===p;if(w&&C.push(l),_&&C.push(u),k){let e=n.makeTensorInfo([],"float32",o.D5U.createScalarValue(m,"float32"));C.push(e),g.push(e)}t=b?new DepthwiseConvPacked2DProgram(x,w,v,_,k):new DepthwiseConv2DProgram(x,w,v,_,k);let $=[[x.padInfo.top,x.padInfo.left],[x.strideHeight,x.strideWidth],[x.dilationHeight,x.dilationWidth],[x.inHeight,x.inWidth]],A=n.runWebGLProgram(t,C,"float32",$);return g.forEach(e=>n.disposeIntermediateTensorInfo(e)),A}};let GatherNDProgram=class GatherNDProgram{constructor(e,t,r,n){this.sliceDim=e,this.strides=t,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=r;let a=(0,y.kW)(r.length),i=`
    int index;`;for(let e=0;e<this.sliceDim;e++)i+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${a} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${i}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};let tK={kernelName:o.q1x,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{params:n,indices:a}=t,i=a.shape,s=i[i.length-1],l=o.D5U.sizeFromShape(n.shape),[u,c,d,h]=o.backend_util.prepareAndValidate(n,a),f=reshape({inputs:{x:a},backend:r,attrs:{shape:[c,s]}}),p=reshape({inputs:{x:n},backend:r,attrs:{shape:[o.D5U.sizeFromShape(n.shape)/d,d]}});if(r.shouldExecuteOnCPU([n,a])||"string"===n.dtype){let e=r.readSync(a.dataId),t=r.bufferSync(n),i=(0,M.TD)(e,t,n.dtype,c,s,d,h,n.shape,l);return r.makeTensorInfo(u,n.dtype,i.values)}let m=new GatherNDProgram(s,h,[c,d],n.shape),g=r.runWebGLProgram(m,[p,f],p.dtype),y=reshape({inputs:{x:g},backend:r,attrs:{shape:u}});return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(g),y}};/**
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
 */let GatherProgram=class GatherProgram{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let r=(0,y.kW)(this.rank),n=function(e,t){let r=["resRC.x","resRC.y","resRC.z","resRC.w"],n=[];for(let t=0;t<e.length;t++)2===t?n.push("index"):n.push(`${r[t]}`);return n.join()}(e,0);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gatherV2(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,indices:i}=t,{axis:s,batchDims:l}=n,u=o.D5U.parseAxisParam(s,a.shape)[0];if((0,o.OBj)().get("DEBUG")){let e=r.readSync(i.dataId),t=a.shape[u];for(let r=0;r<e.length;++r){let n=e[r];o.D5U.assert(n<=t-1&&n>=0,()=>`GatherV2: the index value ${n} is not in [0, ${t-1}]`)}}let c=o.backend_util.segment_util.collectGatherOpShapeInfo(a,i,u,l),d=o.D5U.sizeFromShape(i.shape),h=[],f=reshape({inputs:{x:a},backend:r,attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]}}),p=reshape({inputs:{x:i},backend:r,attrs:{shape:[c.batchSize,d/c.batchSize]}});h.push(f),h.push(p);let m=[c.batchSize,c.outerSize,d/c.batchSize,c.sliceSize];if(r.shouldExecuteOnCPU([a,i])||"string"===a.dtype){let e=r.bufferSync(p),t=r.bufferSync(f),n=(0,M.m$)(t,e,m);return h.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(c.outputShape,n.dtype,n.values)}let g=new GatherProgram(f.shape,m),y=r.runWebGLProgram(g,[f,p],f.dtype);h.push(y);let x=reshape({inputs:{x:y},backend:r,attrs:{shape:c.outputShape}});return h.forEach(e=>r.disposeIntermediateTensorInfo(e)),x}let tH={kernelName:o.qi_,backendName:"webgl",kernelFunc:gatherV2},tX=`
  return vec4(greaterThan(a, b));
`,tq=binaryKernelFunc({opSnippet:"return float(a > b);",packedOpSnippet:tX,cpuKernelImpl:M.B_,dtype:"bool"}),tY={kernelName:o.iZT,backendName:"webgl",kernelFunc:tq},tQ=`
  return vec4(greaterThanEqual(a, b));
`,tJ=binaryKernelFunc({opSnippet:"return float(a >= b);",packedOpSnippet:tQ,dtype:"bool",cpuKernelImpl:M.ji}),t0={kernelName:o.Acj,backendName:"webgl",kernelFunc:tJ},t1={kernelName:o.Qg5,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:n}=t;return fftImpl(n,!0,r)}},t2=unaryKernelFunc({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),t3={kernelName:o.avt,backendName:"webgl",kernelFunc:t2},t4=unaryKernelFunc({opSnippet:"return float(isinf(x));",dtype:"bool"}),t5={kernelName:o.iWB,backendName:"webgl",kernelFunc:t4},t6=unaryKernelFunc({opSnippet:"return float(isnan(x));",dtype:"bool"}),t8={kernelName:o.r7n,backendName:"webgl",kernelFunc:t6},t7=`
  return vec4(lessThan(a, b));
`,t9=binaryKernelFunc({opSnippet:"return float(a < b);",packedOpSnippet:t7,cpuKernelImpl:M.kY,dtype:"bool"}),re={kernelName:o.vtC,backendName:"webgl",kernelFunc:t9},rt=`
  return vec4(lessThanEqual(a, b));
`,rr=binaryKernelFunc({opSnippet:"return float(a <= b);",packedOpSnippet:rt,cpuKernelImpl:M.Rn,dtype:"bool"}),rn={kernelName:o.CAk,backendName:"webgl",kernelFunc:rr},ra={kernelName:o.e7N,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{backend:t,attrs:r}=e,{start:n,stop:a,num:i}=r,o=(0,M.PQ)(n,a,i);return t.makeTensorInfo([o.length],"float32",o)}},ri=D+`
  return x < 0.0 ? 0./0. : log(x);
`,ro=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,rs=unaryKernelFunc({opSnippet:ri,packedOpSnippet:ro,cpuKernelImpl:M.Sd}),rl={kernelName:o.ZbH,backendName:"webgl",kernelFunc:rs},ru=D+`
  return log(1.0 + x);
`,rc=unaryKernelFunc({opSnippet:ru}),rd={kernelName:o.kU,backendName:"webgl",kernelFunc:rc},rh=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,rf=binaryKernelFunc({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:rh,dtype:"bool"}),rp={kernelName:o.PYm,backendName:"webgl",kernelFunc:rf},rm=unaryKernelFunc({opSnippet:"return float(!(x >= 1.0));"}),rg={kernelName:o.VfG,backendName:"webgl",kernelFunc:rm},ry=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,rx=binaryKernelFunc({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:ry,dtype:"bool"}),rb={kernelName:o.MZg,backendName:"webgl",kernelFunc:rx};/**
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
 */let LRNProgram=class LRNProgram{constructor(e,t,r,n,a){let i;this.variableNames=["x"],this.outputShape=[];let o=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${n}) * sum`;i=.5===a?`inversesqrt(${s})`:1===a?`1.0/(${s})`:`exp(log(${s}) * float(-${a}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${t}; j <= ${t}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${o}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${i};
        setOutput(val);
      }
    `}};/**
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
 */let LRNPackedProgram=class LRNPackedProgram{constructor(e,t,r,n,a){let i;this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let o=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${n}) * sum`;i=.5===a?`inversesqrt(${s})`:1===a?`1.0/(${s})`:`exp(log(${s}) * float(-${a}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${t};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${t}; j <= ${t}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${o}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${i};
        setOutput(result);
      }
    `}};let rv={kernelName:o.eZ0,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{depthRadius:i,bias:s,alpha:l,beta:u}=n,c=(0,o.OBj)().getBool("WEBGL_PACK_NORMALIZATION")?new LRNPackedProgram(a.shape,i,s,l,u):new LRNProgram(a.shape,i,s,l,u);return r.runWebGLProgram(c,[a],a.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let LRNGradProgram=class LRNGradProgram{constructor(e,t,r,n,a){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=r,this.alpha=n,this.beta=a,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${a})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${a});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};let rI={kernelName:o.Hhh,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a,y:i,dy:o}=t,{depthRadius:s,bias:l,alpha:u,beta:c}=n,d=new LRNGradProgram(a.shape,s,l,u,c);return r.runWebGLProgram(d,[a,i,o],a.dtype)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function max(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{reductionIndices:s,keepDims:l}=a,u=i.shape.length,c=o.D5U.parseAxisParam(s,i.shape),d=c,h=o.backend_util.getAxesPermutation(d,u),f=null!=h,p=n.shouldExecuteOnCPU([i]),m=i;if(f){if(p){let e=n.texData.get(m.dataId),t=e.values,r=Array(u);for(let e=0;e<r.length;e++)r[e]=i.shape[h[e]];let a=(0,M.Fv)(t,i.shape,i.dtype,h,r);m=n.makeTensorInfo(r,i.dtype);let o=n.texData.get(m.dataId);o.values=a}else m=transposeImpl(i,h,n);d=o.backend_util.getInnerMostAxes(d.length,u)}o.backend_util.assertAxesAreInnerMostDims("max",d,u);let[g,y]=o.backend_util.computeOutAndReduceShapes(m.shape,d),x=g;if(l&&(x=o.backend_util.expandShapeToKeepDim(g,c)),p){let e=n.texData.get(m.dataId),r=e.values,a=(0,M.$O)(r,o.D5U.sizeFromShape(y),x,i.dtype);t=n.makeTensorInfo(x,i.dtype);let s=n.texData.get(t.dataId);s.values=a}else t=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){let a=o.D5U.sizeFromShape(t),i=o.D5U.sizeFromShape(e.shape),s=i/a,l=reshape({inputs:{x:e},attrs:{shape:[s,a]},backend:n}),u=reduce(l,e.dtype,"max",n),c=reshape({inputs:{x:u},attrs:{shape:r},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),c}(m,y,x,n);return f&&n.disposeIntermediateTensorInfo(m),t}let rC={kernelName:o.YoZ,backendName:"webgl",kernelFunc:max},rw=m+`
  return max(a, b);
`,r_=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+x+`
  return result;
`,rS=binaryKernelFunc({opSnippet:rw,packedOpSnippet:r_,cpuKernelImpl:M.nL}),rT={kernelName:o.BMI,backendName:"webgl",kernelFunc:rS},rk={kernelName:o.mTV,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;(0,c.assertNotComplex)(a,"maxPool");let{filterSize:i,strides:s,pad:l,dimRoundingMode:u}=n;o.D5U.assert(o.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let d=o.backend_util.computePool2DInfo(a.shape,i,s,1,l,u);if(1===d.filterWidth&&1===d.filterHeight&&o.D5U.arraysEqual(d.inShape,d.outShape))return identity({inputs:{x:a},backend:r});let h=new Pool2DProgram(d,"max",!1);return r.runWebGLProgram(h,[a],a.dtype)}},rE={kernelName:o.OAf,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{filterSize:i,strides:s,pad:l,dataFormat:u,dimRoundingMode:c}=n,d=o.backend_util.computePool3DInfo(a.shape,i,s,[1,1,1],l,c,u),h=new Pool3DProgram(d,"max",!1);return r.runWebGLProgram(h,[a],a.dtype)}};/**
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
 */let MaxPool2DBackpropProgram=class MaxPool2DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,r=e.strideWidth,n=e.dilationHeight,a=e.effectiveFilterHeight,i=e.effectiveFilterWidth,o=a-1-e.padInfo.top,s=i-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${a};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${a*i-1} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${i} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}};let MaxPool3DBackpropProgram=class MaxPool3DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,a=e.dilationDepth,i=e.dilationHeight,o=e.dilationWidth,s=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=s-1-e.padInfo.front,d=l-1-e.padInfo.top,h=u-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${c}, ${d}, ${h});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${s};
           wD += ${a}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${l};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${o}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${s*l*u-1} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${l} * ${u} +
                  wR * ${u} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let rR={kernelName:o.OU7,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:c}=n,d=o.backend_util.computePool3DInfo(i.shape,s,l,[1,1,1],u,c),h=new Pool3DProgram(d,"max",!0),f=r.runWebGLProgram(h,[i],i.dtype),p=new MaxPool3DBackpropProgram(d),m=r.runWebGLProgram(p,[a,f],i.dtype);return r.disposeIntermediateTensorInfo(f),m}},r$={kernelName:o.OV7,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{dy:a,input:i,output:s}=t;(0,c.assertNotComplex)([i,s],"maxPoolGrad");let{filterSize:l,strides:u,pad:d,dimRoundingMode:h}=n,f=o.backend_util.computePool2DInfo(i.shape,l,u,1,d,h),p=new Pool2DProgram(f,"max",!0),m=r.runWebGLProgram(p,[i],i.dtype),g=new MaxPool2DBackpropProgram(f),y=r.runWebGLProgram(g,[a,m],i.dtype);return r.disposeIntermediateTensorInfo(m),y}},rA={kernelName:o.vFR,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:n}=e,{filterSize:a,strides:i,pad:s,includeBatchInIndex:l}=t;o.D5U.assert(4===n.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${n.shape.length}.`);let u=[1,1];o.D5U.assert(o.backend_util.eitherStridesOrDilationsAreOne(i,u),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${u}'`);let c=o.backend_util.computePool2DInfo(n.shape,a,i,u,s),[d,h]=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){let a=new Pool2DProgram(r,"max",!1),i=n.runWebGLProgram(a,[e],"float32");a=new Pool2DProgram(r,"max",!0,!0,t);let o=n.runWebGLProgram(a,[e],"float32");return[i,o]}(n,l,c,r);return[d,h]}},rN={kernelName:o.q2K,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:n}=e,{keepDims:a,axis:i}=t,s=n.shape.length,l=o.D5U.parseAxisParam(i,n.shape),u=l,c=o.backend_util.getAxesPermutation(u,s),d=null!=c,h=r.shouldExecuteOnCPU([n]),f=[],p=n;if(d){if(h){let e=r.texData.get(p.dataId),t=e.values,a=Array(s);for(let e=0;e<a.length;e++)a[e]=n.shape[c[e]];let i=(0,M.Fv)(t,n.shape,n.dtype,c,a);p=r.makeTensorInfo(a,n.dtype);let o=r.texData.get(p.dataId);o.values=i}else p=transposeImpl(n,c,r);f.push(p),u=o.backend_util.getInnerMostAxes(u.length,s)}o.backend_util.assertAxesAreInnerMostDims("sum",u,s);let[m,g]=o.backend_util.computeOutAndReduceShapes(p.shape,u),y=m;a&&(y=o.backend_util.expandShapeToKeepDim(m,l));let x=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,n){let a=o.D5U.sizeFromShape(t),i=o.D5U.sizeFromShape(e.shape),s=i/a,l=reshape({inputs:{x:e},attrs:{shape:[s,a]},backend:n}),u=reduce(l,"float32","mean",n),c=reshape({inputs:{x:u},attrs:{shape:r},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(u),c}(p,g,y,r);for(let e of f)r.disposeIntermediateTensorInfo(e);return x}},rO={kernelName:o.c17,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,c=o.D5U.parseAxisParam(s,i.shape),d=c,h=o.backend_util.getAxesPermutation(d,u),f=i;null!=h&&(f=transpose({inputs:{x:i},backend:n,attrs:{perm:h}}),d=o.backend_util.getInnerMostAxes(d.length,i.shape.length)),o.backend_util.assertAxesAreInnerMostDims("min",d,u);let[p,m]=o.backend_util.computeOutAndReduceShapes(f.shape,d),g=o.D5U.sizeFromShape(m),y=reshape({inputs:{x:f},backend:n,attrs:{shape:[-1,g]}}),x=reduce(y,y.dtype,"min",n);if(l){let e=o.backend_util.expandShapeToKeepDim(p,c);t=reshape({inputs:{x:x},backend:n,attrs:{shape:e}})}else t=reshape({inputs:{x:x},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(x),null!=h&&n.disposeIntermediateTensorInfo(f),t}},rF=m+`
  return min(a, b);
`,rP=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+x+`
  return result;
`,rD=binaryKernelFunc({opSnippet:rF,packedOpSnippet:rP,cpuKernelImpl:M.r}),rB={kernelName:o.q8u,backendName:"webgl",kernelFunc:rD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MirrorPadProgram=class MirrorPadProgram{constructor(e,t,r){this.variableNames=["x"],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,y.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),l="reflect"===r?0:1;if(1===n){this.userCode=`
        int start = ${i};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${l};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${l};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${a} start = ${a}(${i});
      ${a} end = ${a}(${o});

      void main() {
        ${a} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${l};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${l};
          }
        }
        ${a} coords = outC - start;
        setOutput(getX(${s}));
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MirrorPadPackedProgram=class MirrorPadPackedProgram{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,y.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,g.Ky)("rc",n),l=(0,g.Ky)("source",n),u=`${s[n-1]} < ${this.outputShape[n-1]}`,c=1===n?"source":`vec2(${l.slice(-2).join()})`,d="reflect"===r?0:1,h="";if(1===n){let e=`
        ${a} source = rc;
        if (source < start) {
          source = start * 2 - source - ${d};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${d};
        }
        source -= start;
      `;h=`
        ${a} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${c});
        ${s[n-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${c});
        }
      `}else{let e=`
        ${a} source = rc;
        ${a} lt = ${a}(lessThan(source, start));
        ${a} gte = ${a}(greaterThanEqual(source, end));
        ${a} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${d}) +
                gte * ((end - 1) * 2 - source + ${d});
        source -= start;
      `;h=`
        ${a} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${c});
        ${s[n-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${c});
        }
        rc = outputLoc;
        ${s[n-2]} += 1;
        if(${s[n-2]} < ${this.outputShape[n-2]}) {
          ${e}
          result[2] = getChannel(getX(${l.join()}), ${c});
          ${s[n-1]} += 1;
          if(${u}) {
            ${e}
            result[3] = getChannel(getX(${l.join()}), ${c});
          }
        }
      `}this.userCode=`
      const ${a} start = ${a}(${i});
      const ${a} end = ${a}(${o});

      void main() {
        ${a} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${h}
        setOutput(result);
      }
    `}};let rM={kernelName:o.jQs,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:n}=e,{paddings:a,mode:i}=r,s=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new MirrorPadPackedProgram(n.shape,a,i):new MirrorPadProgram(n.shape,a,i),l=t.runWebGLProgram(s,[n],n.dtype);return l}},rL=`if (b == 0.0) return NAN;
  return mod(a, b);`,rU=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+x+`
  return result;
`,rV=binaryKernelFunc({opSnippet:rL,packedOpSnippet:rU}),rW={kernelName:o.Vbg,backendName:"webgl",kernelFunc:rV};/**
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
 */let MultinomialProgram=class MultinomialProgram{constructor(e,t,r){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,r],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let rz=`
if (a == b) {
  return 1.0;
};
return a / b;`,rG=`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,rZ=binaryKernelFunc({opSnippet:rz,packedOpSnippet:rG,checkOutOfBounds:!0}),rj={kernelName:o.oHH,backendName:"webgl",kernelFunc:rZ},rK="return a - b;",rH=binaryKernelFunc({opSnippet:rK,packedOpSnippet:rK,supportsComplex:!0,cpuKernelImpl:M.kI}),rX={kernelName:o.Tr8,backendName:"webgl",kernelFunc:rH};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function softmax(e){let{inputs:t,backend:r,attrs:n}=e,{logits:a}=t,{dim:i}=n,s=o.D5U.parseAxisParam([i],a.shape),l=max({inputs:{x:a},backend:r,attrs:{reductionIndices:s,keepDims:!1}}),u=o.backend_util.expandShapeToKeepDim(l.shape,s),c=reshape({inputs:{x:l},backend:r,attrs:{shape:u}}),d=rH({inputs:{a:a,b:c},backend:r}),h=tT({inputs:{x:d},backend:r}),f=sum({inputs:{x:h},backend:r,attrs:{axis:s,keepDims:!1}}),p=reshape({inputs:{x:f},backend:r,attrs:{shape:u}}),m=rZ({inputs:{a:h,b:p},backend:r});return r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(p),m}let rq={kernelName:o.Gcp,backendName:"webgl",kernelFunc:softmax},rY={kernelName:o.NZg,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{logits:a}=t,{numSamples:i,seed:o,normalized:s}=n,l=s?a:softmax({inputs:{logits:a},backend:r,attrs:{dim:a.shape.length-1}}),u=l.shape[0],c=l.shape[1],d=new MultinomialProgram(u,c,i),h=r.runWebGLProgram(d,[l],"int32",[[o]]);return s||r.disposeIntermediateTensorInfo(l),h}},rQ=N.D1+`
  return -x;
`,rJ=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,r0={kernelName:o.kuV,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:n}=e,{x:a}=r;if(n.shouldExecuteOnCPU([a])){let e=n.texData.get(a.dataId),[t,r]=(0,M.Bo)(e.values,a.shape,a.dtype);return n.makeTensorInfo(r,a.dtype,t)}return t=(0,o.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new F.cc(a.shape,rJ):new N.l(a.shape,rQ),n.runWebGLProgram(t,[a],a.dtype)}},r1=o.GDt.nonMaxSuppressionV3Impl,r2={kernelName:o.uv1,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u}=n,c=r.readSync(a.dataId),d=r.readSync(i.dataId),{selectedIndices:h}=r1(c,d,s,l,u);return r.makeTensorInfo([h.length],"int32",new Int32Array(h))}},r3=o.GDt.nonMaxSuppressionV4Impl,r4={kernelName:o.cye,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:c}=n,d=r.readSync(a.dataId),h=r.readSync(i.dataId),{selectedIndices:f,validOutputs:p}=r3(d,h,s,l,u,c);return[r.makeTensorInfo([f.length],"int32",new Int32Array(f)),r.makeTensorInfo([],"int32",new Int32Array([p]))]}},r5=o.GDt.nonMaxSuppressionV5Impl,r6={kernelName:o.W0H,backendName:"webgl",kernelFunc:function(e){o.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:n}=e,{boxes:a,scores:i}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,softNmsSigma:c}=n,d=r.readSync(a.dataId),h=r.readSync(i.dataId),{selectedIndices:f,selectedScores:p}=r5(d,h,s,l,u,c);return[r.makeTensorInfo([f.length],"int32",new Int32Array(f)),r.makeTensorInfo([p.length],"float32",new Float32Array(p))]}};/**
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
 */let OneHotProgram=class OneHotProgram{constructor(e,t,r,n){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${r}),
                      float(index == coords.y)));
      }
    `}};let r8={kernelName:o.we_,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{indices:a}=t,{dtype:i,depth:s,onValue:l,offValue:u}=n,c=o.D5U.sizeFromShape(a.shape),d=new OneHotProgram(c,s,l,u),h=reshape({inputs:{x:a},backend:r,attrs:{shape:[c]}}),f=r.runWebGLProgram(d,[h],i);r.disposeIntermediateTensorInfo(h);let p=[...a.shape,s],m=reshape({inputs:{x:f},backend:r,attrs:{shape:p}});return r.disposeIntermediateTensorInfo(f),m}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zerosLike(e){let{inputs:t,backend:r}=e,{x:n}=t;if("complex64"!==n.dtype)return fill({attrs:{shape:n.shape,dtype:n.dtype,value:"string"===n.dtype?"":0},backend:r});{let e=real({inputs:{input:n},backend:r}),t=zerosLike({inputs:{x:e},backend:r}),a=imag({inputs:{input:n},backend:r}),i=zerosLike({inputs:{x:a},backend:r}),o=complex({inputs:{real:t,imag:i},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(i),o}}let r7={kernelName:o.RuY,backendName:"webgl",kernelFunc:zerosLike},r9={kernelName:o.qWM,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function onesLike(e){let{inputs:t,backend:r}=e,{x:n}=t;if("string"===n.dtype)throw Error("onesLike is not supported under string dtype");if("complex64"!==n.dtype)return fill({attrs:{shape:n.shape,dtype:n.dtype,value:1},backend:r});{let e=real({inputs:{input:n},backend:r}),t=onesLike({inputs:{x:e},backend:r}),a=imag({inputs:{input:n},backend:r}),i=zerosLike({inputs:{x:a},backend:r}),o=complex({inputs:{real:t,imag:i},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(i),o}}},ne={kernelName:o.QiL,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{axis:a}=n;if(1===t.length)return expandDims({inputs:{input:t[0]},backend:r,attrs:{dim:a}});let i=t[0].shape,s=t[0].dtype;t.forEach(e=>{o.D5U.assertShapesMatch(i,e.shape,"All tensors passed to stack must have matching shapes"),o.D5U.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=t.map(e=>{let t=expandDims({inputs:{input:e},backend:r,attrs:{dim:a}});return l.push(t),t}),c=concat({inputs:u,backend:r,attrs:{axis:a}});return l.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}};/**
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
 */let PadProgram=class PadProgram{constructor(e,t,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,y.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(1===n){this.userCode=`
        int start = ${i};
        int end = ${o};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${a} start = ${a}(${i});
      ${a} end = ${a}(${o});

      void main() {
        ${a} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${a} coords = outC - start;
          setOutput(getX(${s}));
        }
      }
    `}};/**
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
 */let PadPackedProgram=class PadPackedProgram{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let n=e.length,a=(0,y.kW)(n),i=t.map(e=>e[0]).join(","),o=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,g.Ky)("rc",n),l=(0,g.Ky)("source",n),u=`${s[n-1]} < ${this.outputShape[n-1]}`,c=1===n?"source":`vec2(${l.slice(-2).join()})`,d=[`${a} rc = outputLoc;`,`${s[n-1]} += 1;
       if(${u}) {
      `,1===n?"":`}
       rc = outputLoc;
       ${s[n-2]} += 1;
       if(${s[n-2]} < ${this.outputShape[n-2]}) {`,1===n?"":`  ${s[n-1]} += 1;
         if(${u}) {`],h=1===n?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",f="";for(let e=0,t=1===n?2:4;e<t;e++)f+=`
        ${d[e]}
        if (${h}) {
          result[${e}] = float(value);
        } else {
          ${a} source = rc - start;
          result[${e}] = getChannel(getX(${l.join()}), ${c});
        }
      `;f+=1===n?"} ":"}}",this.userCode=`
      const ${a} start = ${a}(${i});
      const ${a} end = ${a}(${o});

      void main() {
        ${a} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let padV2=e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{paddings:i,constantValue:s}=n;if(0===o.D5U.sizeFromShape(a.shape)){let e=i.map((e,t)=>e[0]+a.shape[t]+e[1]);return fill({backend:r,attrs:{shape:e,value:s,dtype:a.dtype}})}let l=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new PadPackedProgram(a.shape,i,s):new PadProgram(a.shape,i,s),u=[[s]];return r.runWebGLProgram(l,[a],a.dtype,u)},nt={kernelName:o.lyA,backendName:"webgl",kernelFunc:padV2},nr=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,nn=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+x+`
  return result;
`,na=binaryKernelFunc({opSnippet:nr,packedOpSnippet:nn}),ni={kernelName:o.pe_,backendName:"webgl",kernelFunc:na},no={kernelName:o.DlI,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{axis:s,keepDims:l}=a,u=i.shape.length,c=[],d=o.D5U.parseAxisParam(s,i.shape),h=d,f=o.backend_util.getAxesPermutation(h,u),p=i;if(null!=f&&(p=transpose({inputs:{x:i},backend:n,attrs:{perm:f}}),h=o.backend_util.getInnerMostAxes(h.length,u),c.push(p)),o.backend_util.assertAxesAreInnerMostDims("prod",h,u),n.shouldExecuteOnCPU([p])){let e=n.texData.get(p.dataId).values,{outVals:r,outShape:a,outDtype:i}=(0,M.Tg)(p.shape,p.dtype,e,h);t=n.makeTensorInfo(a,i,r)}else{let[e,r]=o.backend_util.computeOutAndReduceShapes(p.shape,h),a=o.D5U.sizeFromShape(r),s=reshape({inputs:{x:p},backend:n,attrs:{shape:[-1,a]}}),l=(0,o.z4k)(i.dtype),u=reduce(s,l,"prod",n);t=reshape({inputs:{x:u},backend:n,attrs:{shape:e}}),c.push(s),c.push(u)}if(l){c.push(t);let e=o.backend_util.expandShapeToKeepDim(t.shape,d);t=reshape({inputs:{x:t},backend:n,attrs:{shape:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),t}},ns={kernelName:o.dDz,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{paramsNestedSplits:a,paramsDenseValues:i,indices:o}=t,{outputRaggedRank:s}=n,l=a.map(e=>r.readSync(e.dataId)),u=a.map(e=>e.shape),c=r.readSync(i.dataId),d=r.readSync(o.dataId),[h,f,p]=(0,M.Qs)(l,u,c,i.shape,i.dtype,d,o.shape,s),m=h.map(e=>r.makeTensorInfo([e.length],"int32",e)),g=r.makeTensorInfo(p,i.dtype,f);return m.concat([g])}},nl={kernelName:o.CQl,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{starts:n,limits:a,deltas:i}=t,o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,c]=(0,M.M8)(o,n.shape,n.dtype,s,a.shape,l,i.shape),d=r.makeTensorInfo([u.length],"int32",u),h=r.makeTensorInfo([c.length],n.dtype,c);return[d,h]}},nu={kernelName:o.BiW,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{shape:a,values:i,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:l}=n,u=r.readSync(a.dataId),c=r.readSync(i.dataId),d=r.readSync(o.dataId),h=s.map(e=>r.readSync(e.dataId)),f=s.map(e=>e.shape),[p,m]=(0,M.fy)(u,a.shape,c,i.shape,i.dtype,d,o.shape,h,f,l);return r.makeTensorInfo(p,i.dtype,m)}},range=e=>{let{backend:t,attrs:r}=e,{start:n,stop:a,step:i,dtype:o}=r,s=(0,M.hO)(n,a,i,o);return t.makeTensorInfo([s.length],o,s)},nc={kernelName:o.e6w,backendName:"webgl",kernelFunc:range},nd=unaryKernelFunc({opSnippet:"return 1.0 / x;"}),nh={kernelName:o.$HU,backendName:"webgl",kernelFunc:nd},nf=N.D1+`
  return (x < 0.0) ? 0.0 : x;
`,np=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,nm=unaryKernelFunc({opSnippet:nf,packedOpSnippet:np}),ng={kernelName:o.qkr,backendName:"webgl",kernelFunc:nm},ny=N.D1+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,nx=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,nb=unaryKernelFunc({opSnippet:ny,packedOpSnippet:nx}),nv={kernelName:o.SbG,backendName:"webgl",kernelFunc:nb};/**
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
 */let ResizeBilinearProgram=class ResizeBilinearProgram{constructor(e,t,r,n,a){this.variableNames=["A"],this.outputShape=[];let[i,o,s,l]=e;this.outputShape=[i,t,r,l];let u=[n&&t>1?o-1:o,n&&r>1?s-1:s],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/c[0]},
          ${u[1]/c[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${a?"(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}};/**
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
 */let ResizeBilinearPackedProgram=class ResizeBilinearPackedProgram{constructor(e,t,r,n,a){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,o,s,l]=e;this.outputShape=[i,t,r,l];let u=[n&&t>1?o-1:o,n&&r>1?s-1:s],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/c[0]},
          ${u[1]/c[1]},
          ${u[1]/c[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${a?"(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};let nI={kernelName:o._Yw,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a}=t,{alignCorners:i,halfPixelCenters:s,size:l}=n,[u,c]=l,d=(0,o.OBj)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ResizeBilinearPackedProgram(a.shape,u,c,i,s):new ResizeBilinearProgram(a.shape,u,c,i,s);return r.runWebGLProgram(d,[a],"float32")}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeBilinearBackpropProgram=class ResizeBilinearBackpropProgram{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,a]=t,[,i,o]=e,s=[r&&i>1?n-1:n,r&&o>1?a-1:a],l=[r&&i>1?i-1:i,r&&o>1?o-1:o],u=s[0]/l[0],c=s[1]/l[1],d=1/u,h=1/c,f=2*Math.ceil(d)+2,p=2*Math.ceil(h)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${c});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${h});

        const int winHeight = int(${f});
        const int winWidth = int(${p});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${a-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};let nC={kernelName:o.zbQ,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a,dy:i}=t,{alignCorners:o}=n,s=new ResizeBilinearBackpropProgram(i.shape,a.shape,o);return r.runWebGLProgram(s,[i],i.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeNearestNeighborProgram=class ResizeNearestNeighborProgram{constructor(e,t,r,n,a){this.variableNames=["A"],this.outputShape=[];let[i,o,s,l]=e;this.outputShape=[i,t,r,l];let u=[n&&t>1?o-1:o,n&&r>1?s-1:s],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/c[0]},
          ${u[1]/c[1]});
      const vec2 inputShapeRC = vec2(${o}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${a?"max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${n?"0.5":"0.0"})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}};/**
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
 */let ResizeNearestNeighborPackedProgram=class ResizeNearestNeighborPackedProgram{constructor(e,t,r,n,a){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,o,s,l]=e;this.outputShape=[i,t,r,l];let u=[n&&t>1?o-1:o,n&&r>1?s-1:s],c=[n&&t>1?t-1:t,n&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/c[0]},
          ${u[1]/c[1]},
          ${u[1]/c[1]});
      const vec3 inputShapeRC = vec3(${o}.0, ${s}.0,
                                     ${s}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${a?"max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${n?"0.5":"0.0"})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};let nw={kernelName:o.dpD,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a}=t,{alignCorners:i,halfPixelCenters:s,size:l}=n,[u,c]=l,d=(0,o.OBj)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ResizeNearestNeighborPackedProgram(a.shape,u,c,i,s):new ResizeNearestNeighborProgram(a.shape,u,c,i,s);return r.runWebGLProgram(d,[a],a.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeNearestNeigborBackpropProgram=class ResizeNearestNeigborBackpropProgram{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,a]=t,[,i,o]=e,s=[r&&i>1?n-1:n,r&&o>1?a-1:a],l=[r&&i>1?i-1:i,r&&o>1?o-1:o],u=s[0]/l[0],c=s[1]/l[1],d=1/u,h=1/c,f=2*Math.ceil(d)+2,p=2*Math.ceil(h)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${c});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${h});

        const int winHeight = int(${f});
        const int winWidth = int(${p});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${o}) {
              continue;
            }

            float sourceFracRow =
              float(${s[0]}) *
                (float(dyR) / float(${l[0]}));

            float sourceFracCol =
                float(${s[1]}) *
                  (float(dyC) / float(${l[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${a}) - 1),
                ${r} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};let n_={kernelName:o.Hmb,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{images:a,dy:i}=t,{alignCorners:o}=n,s=new ResizeNearestNeigborBackpropProgram(i.shape,a.shape,o);return r.runWebGLProgram(s,[i],i.dtype)}};/**
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
 */let ReverseProgram=class ReverseProgram{constructor(e,t){this.variableNames=["x"];let r=e.length;if(r>4)throw Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);if(this.outputShape=e,1===r){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let getInCoord=r=>-1!==t.indexOf(r)&&1!==e[r]?`${e[r]} - coords[${r}] - 1`:`coords[${r}]`,n=e.map((e,t)=>getInCoord(t)).join(","),a=(0,y.kW)(r);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${n}));
      }
    `}};/**
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
 */let ReversePackedProgram=class ReversePackedProgram{constructor(e,t){var r,n,a;this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let i=e.length;if(i>4)throw Error(`WebGL backend: Reverse of rank-${i} tensor is not yet supported`);this.outputShape=e;let o=(0,g.Ky)("rc",i),s=`${o[i-1]} + 1 < ${this.outputShape[i-1]}`,l=`${o[i-2]} + 1 < ${this.outputShape[i-2]}`,u=(0,y.kW)(i);function getChannel(r){let n=e.map((n,a)=>-1!==t.indexOf(a)&&1!==e[a]?`${e[a]} - ${r[a]} - 1`:`${r[a]}`),a=n.join(","),i=n.slice(-2).join(",");return`getChannel(getX(${a}), vec2(${i}))`}1===i?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${u} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${getChannel(o.slice())};
          if(${s}){
            result.g = ${(r=o.slice())[i-1]="("+r[i-1]+" + 1)",getChannel(r)};
          }
          if(${l}) {
            result.b = ${(n=o.slice())[i-2]="("+n[i-2]+" + 1)",getChannel(n)};
            if(${s}) {
              result.a = ${(a=o.slice())[i-1]="("+a[i-1]+" + 1)",a[i-2]="("+a[i-2]+" + 1)",getChannel(a)};
            }
          }
          setOutput(result);
        }
    `}};let nS={kernelName:o.mKl,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{dims:i}=n,s=a.shape.length,l=o.D5U.parseAxisParam(i,a.shape);if(0===s)return identity({inputs:{x:a},backend:r});let u=(0,o.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ReversePackedProgram(a.shape,l):new ReverseProgram(a.shape,l);return r.runWebGLProgram(u,[a],a.dtype)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let RotateProgram=class RotateProgram{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=e[1],n=e[2];this.outputShape=e;let a="";a="number"==typeof t?`float outputValue = ${t.toFixed(2)};`:`
        vec3 fill = vec3(${t.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${a}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${r}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let nT={kernelName:o.b9H,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:n}=e,{radians:a,fillValue:i,center:s}=t,l=new RotateProgram(n.shape,i),[u,c]=o.backend_util.getImageCenter(s,n.shape[1],n.shape[2]),d=[[u,c,Math.sin(a),Math.cos(a)]],h=r.runWebGLProgram(l,[n],n.dtype,d);return h}},nk=`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`,nE=unaryKernelFunc({opSnippet:nk}),nR={kernelName:o.e07,backendName:"webgl",kernelFunc:nE},n$=unaryKernelFunc({opSnippet:"return inversesqrt(x);",cpuKernelImpl:M.St}),nA={kernelName:o.bV0,backendName:"webgl",kernelFunc:n$};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ScatterProgram=class ScatterProgram{constructor(e,t,r,n,a,i,o=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;let l=(0,y.kW)(a.length),u=(0,y.kW)(i.length),c="";1===r?c="i":2===r&&(c="i, j");let d=`getIndices(${c})`,h="";1===n?h="i":2===n&&(h="i, coords[1]");let f=`getUpdates(${h})`,p="";s&&(p="coords[0], coords[1]");let m=`getDefaultValue(${p})`;this.userCode=`
        ${l} strides = ${l}(${a});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${d});
              flattenedIndex += index * ${t>1?"strides[j]":"strides"};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(${m}, sum, float(found)));
        }
      `}};/**
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
 */let ScatterPackedProgram=class ScatterPackedProgram{constructor(e,t,r,n,a,i,o=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;let l=(0,y.kW)(a.length),u=(0,y.kW)(i.length),c="";1===r?c="i":2===r&&(c="i, j");let d=`getIndices(${c})`,h="";1===n?h="i":2===n&&(h="i, coords[1]");let f=`getUpdates(${h})`,p="";s&&(p="coords[0], coords[1]");let m=`getDefaultValue(${p})`;this.userCode=`
        ${l} strides = ${l}(${a});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${t>1?"strides[j]":"strides"};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${t>1?"strides[j + 1]":"strides"};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${f};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${m}, sum, found));
        }
      `}};let nN={kernelName:o.xQA,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{indices:i,updates:s}=r,{shape:l}=a,{sliceRank:u,numUpdates:c,sliceSize:d,strides:h,outputSize:f}=o.backend_util.calculateShapes(s,i,l),p=[f/d,d];if(0===f)return n.makeTensorInfo(l,i.dtype);let m=reshape({inputs:{x:i},backend:n,attrs:{shape:[c,u]}}),g=reshape({inputs:{x:s},backend:n,attrs:{shape:[c,d]}}),y=n.makeTensorInfo([],"float32",new Float32Array([0]));t=(0,o.OBj)().getBool("WEBGL_PACK")?new ScatterPackedProgram(c,u,m.shape.length,g.shape.length,h,p):new ScatterProgram(c,u,m.shape.length,g.shape.length,h,p);let x=n.runWebGLProgram(t,[g,m,y],g.dtype),b=reshape({inputs:{x:x},backend:n,attrs:{shape:l}});return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(y),b}};/**
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
 */let SearchSortedProgram=class SearchSortedProgram{constructor(e,t,r,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,r];let a=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,i=2===(0,o.OBj)().getNumber("WEBGL_VERSION")?"while (left < right) {":a;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${i}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${"left"===n?"<":"<="} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};let nO={kernelName:o.nr8,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{sortedSequence:a,values:i}=t,{side:o}=n,s=new SearchSortedProgram(a.shape[0],a.shape[1],i.shape[1],o),l=[[a.shape[1]]];return r.runWebGLProgram(s,[a,i],"int32",l)}};/**
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
 */let SelectProgram=class SelectProgram{constructor(e,t,r){let n,a;if(this.variableNames=["c","a","b"],this.outputShape=t,r>4)throw Error(`Where for rank ${r} is not yet supported`);if(1===r)a="resRC",n="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],o=[];for(let n=0;n<t.length;n++)o.push(`${r[n]}`),n<e&&i.push(`${r[n]}`);n=i.join(),a=o.join()}let i=(0,y.kW)(r);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${a}));
        } else {
          setOutput(getB(${a}));
        }
      }
    `}};let nF={kernelName:o.PhF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{condition:n,t:a,e:i}=t,s=new SelectProgram(n.shape.length,a.shape,a.shape.length);return r.runWebGLProgram(s,[n,a,i],(0,o.x8V)(a.dtype,i.dtype))}},nP=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${o.backend_util.SELU_SCALEALPHA};
  float scale = ${o.backend_util.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,nD=unaryKernelFunc({opSnippet:nP}),nB={kernelName:o.oFR,backendName:"webgl",kernelFunc:nD},nM=D+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,nL=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,nU=unaryKernelFunc({opSnippet:nM,packedOpSnippet:nL,cpuKernelImpl:M.UN}),nV={kernelName:o.a5O,backendName:"webgl",kernelFunc:nU},nW=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,nz=unaryKernelFunc({opSnippet:nW}),nG={kernelName:o.i5y,backendName:"webgl",kernelFunc:nz},nZ=D+`
  return sin(x);
`,nj=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${x}
  return result;
`,nK=unaryKernelFunc({opSnippet:nZ,packedOpSnippet:nj}),nH={kernelName:o.RQH,backendName:"webgl",kernelFunc:nK},nX=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,nq=unaryKernelFunc({opSnippet:nX}),nY={kernelName:o.wYB,backendName:"webgl",kernelFunc:nq},nQ=`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`,nJ=unaryKernelFunc({opSnippet:nQ}),n0={kernelName:o.MRv,backendName:"webgl",kernelFunc:nJ},n1={kernelName:o.TQc,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{blockShape:i,paddings:s}=n;o.D5U.assert(a.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let l=i.reduce((e,t)=>e*t),u=[[0,0]];u.push(...s);for(let e=1+i.length;e<a.shape.length;++e)u.push([0,0]);let c=[],d=padV2({inputs:{x:a},backend:r,attrs:{paddings:u,constantValue:0}}),h=o.backend_util.getReshaped(d.shape,i,l,!1),f=o.backend_util.getPermuted(h.length,i.length,!1),p=o.backend_util.getReshapedPermuted(d.shape,i,l,!1),m=reshape({inputs:{x:d},backend:r,attrs:{shape:h}}),g=transpose({inputs:{x:m},backend:r,attrs:{perm:f}}),y=reshape({inputs:{x:g},backend:r,attrs:{shape:p}});return c.push(d),c.push(m),c.push(g),c.forEach(e=>r.disposeIntermediateTensorInfo(e)),y}},n2={kernelName:o.O3z,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{indices:n,values:a,denseShape:i,defaultValue:o}=t;if(1!==i.shape.length)throw Error(`Dense shape must be a vector, saw:
         ${i.shape}`);if(2!==n.shape.length)throw Error(`Indices must be a matrix, saw:
         ${n.shape}`);if(1!==a.shape.length)throw Error(`Values must be a vector, saw:
         ${a.shape}`);if(0!==o.shape.length)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=r.readSync(n.dataId),l=r.readSync(a.dataId),u=r.readSync(i.dataId),c=r.readSync(o.dataId)[0],[d,h,f,p,m]=(0,M.X8)(s,n.shape,n.dtype,l,a.dtype,u,c);return[r.makeTensorInfo(h,n.dtype,d),r.makeTensorInfo([h[0]],a.dtype,f),r.makeTensorInfo([p.length],"bool",new Uint8Array(p.map(e=>Number(e)))),r.makeTensorInfo([m.length],n.dtype,new Int32Array(m))]}},n3={kernelName:o.nhH,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{inputIndices:n,inputShape:a,newShape:i}=t;if(2!==n.shape.length)throw Error(`Input indices should be a matrix but received shape ${n.shape}`);if(1!==a.shape.length)throw Error(`Input shape should be a vector but received shape ${a.shape}`);if(1!==i.shape.length)throw Error(`Target shape should be a vector but received shape ${i.shape}`);let o=Array.from(r.readSync(a.dataId)),s=r.readSync(n.dataId),l=Array.from(r.readSync(i.dataId)),[u,c,d]=(0,M.LS)(s,n.shape,n.dtype,o,l);return[r.makeTensorInfo(c,n.dtype,u),r.makeTensorInfo([d.length],i.dtype,new Int32Array(d))]}},n4={kernelName:o.w3H,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:n,indices:a,segmentIds:i}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.shape.length)throw Error(`Indices should be a vector but received shape
              ${a.shape}`);if(1!==i.shape.length)throw Error(`Segment ids should be a vector but received shape
              ${i.shape}`);let o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,c]=(0,M.AR)(o,n.shape,n.dtype,s,l,!0);return r.makeTensorInfo(c,n.dtype,u)}},n5={kernelName:o.ZjV,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:n,indices:a,segmentIds:i}=t;if(n.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==a.shape.length)throw Error(`Indices should be a vector but received shape
             ${a.shape}`);if(1!==i.shape.length)throw Error(`Segment ids should be a vector but received shape
             ${i.shape}`);let o=r.readSync(n.dataId),s=r.readSync(a.dataId),l=r.readSync(i.dataId),[u,c]=(0,M.AR)(o,n.shape,n.dtype,s,l);return r.makeTensorInfo(c,n.dtype,u)}},n6={kernelName:o.D2d,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{sparseIndices:a,sparseValues:i,defaultValue:s}=t,{outputShape:l}=n,{sliceRank:u,numUpdates:c,sliceSize:d,strides:h,outputSize:f}=o.backend_util.calculateShapes(i,a,l);if("string"===i.dtype){let e=r.bufferSync(a),t=r.bufferSync(i),n=o.D5U.decodeString(r.readSync(s.dataId)[0]),p=(0,M.Y1)(e,t,l,f,d,c,u,h,n,!1);return r.makeTensorInfo(l,p.dtype,p.values)}let p=new ScatterProgram(c,u,a.shape.length,i.shape.length,h,[f,1],!1),m=r.runWebGLProgram(p,[i,a,s],i.dtype),g=reshape({inputs:{x:m},backend:r,attrs:{shape:l}});return r.disposeIntermediateTensorInfo(m),g}},n8={kernelName:o.L8s,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{numOrSizeSplits:i,axis:s}=n,l=o.D5U.parseAxisParam(s,a.shape)[0],u=o.backend_util.prepareSplitSize(a,i,l),c=a.shape.length,d=Array(c).fill(0),h=a.shape.slice();return u.map(e=>{let t=[...h];t[l]=e;let n=slice({inputs:{x:a},backend:r,attrs:{begin:d,size:t}});return d[l]+=e,n})}},n7="return sqrt(x);",n9=unaryKernelFunc({opSnippet:n7,packedOpSnippet:n7,cpuKernelImpl:M.Bk}),ae={kernelName:o.FKq,backendName:"webgl",kernelFunc:n9},at=unaryKernelFunc({opSnippet:"return x * x;"}),ar={kernelName:o.bK0,backendName:"webgl",kernelFunc:at},an="return (a - b) * (a - b);",aa=binaryKernelFunc({opSnippet:an,packedOpSnippet:an}),ai={kernelName:o._tC,backendName:"webgl",kernelFunc:aa},ao={kernelName:o.e0R,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t;if("string"!==a.dtype)throw Error("Input must be of datatype string");let i=r.readSync(a.dataId),s=o.backend_util.fromUint8ToStringArray(i),l=(0,M.F1)(s,"string",n);return r.makeTensorInfo(a.shape,"string",l)}},as={kernelName:o.h8e,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function({inputs:e,attrs:t,backend:r}){let{x:n}=e,a=N.D1+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,i=new N.l(n.shape,a);return r.runWebGLProgram(i,[n],n.dtype)}};/**
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
 */let StridedSliceProgram=class StridedSliceProgram{constructor(e,t,r){this.variableNames=["x"],this.outputShape=r;let n=r.length,a=(0,y.kW)(r.length),i=(0,y.kW)(r.length),o="";if(1===n)o="coords * strides + begin";else{let e=0;o=r.map((t,n)=>(e++,1===r.length?`coords * strides[${n}] + begin[${n}]`:`coords[${e-1}] * strides[${n}] + begin[${n}]`)).join(",")}this.userCode=`
      ${a} begin = ${a}(${e});
      ${a} strides = ${a}(${t});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${o}));
      }
    `}};let al={kernelName:o.jQk,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:n,attrs:a}=e,{x:i}=r,{begin:s,end:l,strides:u,beginMask:c,endMask:d,ellipsisMask:h,newAxisMask:f,shrinkAxisMask:p}=a,{finalShapeSparse:m,finalShape:g,isIdentity:y,sliceDim0:x,isSimpleSlice:b,begin:v,end:C,strides:w}=o.kuN.sliceInfo(i.shape,s,l,u,c,d,h,f,p);if(y)t=reshape({inputs:{x:i},backend:n,attrs:{shape:g}});else if(x||b){o.D5U.assert(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=o.kuN.computeOutShape(v,C,w),r=slice({inputs:{x:i},backend:n,attrs:{begin:v,size:e}});t=reshape({inputs:{x:r},backend:n,attrs:{shape:g}}),n.disposeIntermediateTensorInfo(r)}else{let e=n.shouldExecuteOnCPU([i]);if(e){let e=n.readSync(i.dataId),r=(0,o.f3b)(i.shape,i.dtype,e),a=(0,M.$u)(m,r,w,v);t=n.makeTensorInfo(g,i.dtype,a.values)}else{let e=new StridedSliceProgram(v,w,m);t=n.runWebGLProgram(e,[i],i.dtype)}}let _=reshape({inputs:{x:t},backend:n,attrs:{shape:g}});return n.disposeIntermediateTensorInfo(t),_}},au={kernelName:o._JP,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{separator:a,nGramWidths:i,leftPad:o,rightPad:s,padWidth:l,preserveShortSequences:u}=n,{data:c,dataSplits:d}=t,h=r.readSync(c.dataId),f=r.readSync(d.dataId),[p,m]=(0,M.$j)(h,f,a,i,o,s,l,u);return[r.makeTensorInfo([p.length],"string",p),r.makeTensorInfo(d.shape,"int32",m)]}},ac={kernelName:o.s1s,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{skipEmpty:a}=n,{input:i,delimiter:o}=t;if("string"!==i.dtype)throw Error("Input must be of datatype string");if(1!==i.shape.length)throw Error(`Input must be a vector, got shape: ${i.shape}`);if(0!==o.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=r.readSync(i.dataId),l=r.readSync(o.dataId)[0],[u,c,d]=(0,M.A0)(s,l,a),h=c.length;return[r.makeTensorInfo([h,2],"int32",u),r.makeTensorInfo([h],"string",c),r.makeTensorInfo([2],"int32",new Int32Array(d))]}},ad={kernelName:o.XkS,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{numBuckets:a}=n,{input:i}=t;if("string"!==i.dtype)throw Error("Input must be of datatype string");if(a<=0)throw Error("Number of buckets must be at least 1");let o=r.readSync(i.dataId),s=(0,M._9)(o,a);return r.makeTensorInfo(i.shape,"int32",s)}},ah=unaryKernelFunc({opSnippet:"return tan(x);"}),af={kernelName:o.sEM,backendName:"webgl",kernelFunc:ah},ap=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,am=unaryKernelFunc({opSnippet:ap}),ag={kernelName:o.MIZ,backendName:"webgl",kernelFunc:am},ay={kernelName:o.SIB,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{tensor:a,indices:i,updates:s}=t,{}=n,{sliceRank:l,numUpdates:u,sliceSize:c,strides:d,outputSize:h}=o.backend_util.calculateShapes(s,i,a.shape),f=[h/c,c];if(0===h)return r.makeTensorInfo(a.shape,i.dtype);let p=reshape({inputs:{x:i},backend:r,attrs:{shape:[u,l]}}),m=reshape({inputs:{x:s},backend:r,attrs:{shape:[u,c]}}),g=reshape({inputs:{x:a},backend:r,attrs:{shape:f}}),y=new ScatterProgram(u,l,p.shape.length,m.shape.length,d,f,!1,!0),x=r.runWebGLProgram(y,[m,p,g],g.dtype),b=reshape({inputs:{x:x},backend:r,attrs:{shape:a.shape}});return r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(m),r.disposeIntermediateTensorInfo(g),r.disposeIntermediateTensorInfo(x),b}};/**
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
 */let TileProgram=class TileProgram{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let n=0;n<r.length;n++)r[n]=e[n]*t[n];this.outputShape=r,this.rank=r.length;let n=(0,y.kW)(this.rank),a=function(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],n=[];for(let t=0;t<e.length;t++)n.push(`imod(${r[t]}, ${e[t]})`);return n.join()}(e);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${a}));
      }
    `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tile(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{reps:i}=n;if("string"===a.dtype||a.shape.length>5){let e=r.readSync(a.dataId),t="string"===a.dtype?e.map(e=>o.D5U.decodeString(e)):e,n=(0,o.f3b)(a.shape,a.dtype,t),s=(0,M.KX)(n,i);return r.makeTensorInfo(s.shape,s.dtype,s.values)}let s=new TileProgram(a.shape,i),l=r.runWebGLProgram(s,[a],a.dtype);return l}let ax={kernelName:o.n9L,backendName:"webgl",kernelFunc:tile};let SwapProgram=class SwapProgram{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}};let MergeProgram=class MergeProgram{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function disposeIntermediateTensorInfoOrNull(e,t){null!==t&&e.disposeIntermediateTensorInfo(t)}function roundUpToPow2(e){let t=1;for(;t<e;)t*=2;return t}let ab={kernelName:o.cWu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a}=t,{k:i,sorted:s}=n,l=(0,o.OBj)().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),u=(0,o.OBj)().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),c=a.shape,d=c[c.length-1];if(r.shouldExecuteOnCPU([a])||d<l||i>u){let e=r.readSync(a.dataId),[t,n]=(0,M.oC)(e,c,a.dtype,i,s);return[r.makeTensorInfo(t.shape,t.dtype,t.values),r.makeTensorInfo(n.shape,n.dtype,n.values)]}if(0===i)return c[c.length-1]=0,[r.makeTensorInfo(c,a.dtype,[]),r.makeTensorInfo(c,"int32",[])];if(1===d)return[a,fill({attrs:{shape:c,dtype:"int32",value:0},backend:r})];let h=r.texData.get(a.dataId),f=null!==h&&h.isPacked,p=f?r.unpackTensor(a):a,m=o.D5U.sizeFromShape(c),g=m/d,y=reshape({inputs:{x:p},attrs:{shape:[g,d]},backend:r});f&&disposeIntermediateTensorInfoOrNull(r,p);let x=roundUpToPow2(i),b=roundUpToPow2(d),v=null,getInputs=()=>null===v?[y,y]:[y,v],runSwap=(e,t,n)=>{let a=getInputs(),i=new SwapProgram(n),o=null===v?1:0,s=[[d],[o],[Number.NEGATIVE_INFINITY],[e],[t]],l=v;v=r.runWebGLProgram(i,a,"int32",s),disposeIntermediateTensorInfoOrNull(r,l)};for(let e=1;e<x;e*=2){let t=2*e;for(let r=e;r>=1;r/=2)runSwap(t,r,[g,b])}for(let e=b;e>x;e/=2){let t=getInputs(),n=new MergeProgram([g,e/2]),a=null===v?1:0,i=[[d],[a],[x]],o=v;v=r.runWebGLProgram(n,t,"int32",i),disposeIntermediateTensorInfoOrNull(r,o);let s=x/2,l=2*s;for(let e=s;e>=1;e/=2)runSwap(l,e,v.shape)}let C=v;v=slice({inputs:{x:v},backend:r,attrs:{begin:0,size:[g,i]}}),disposeIntermediateTensorInfoOrNull(r,C);let w=gatherV2({inputs:{x:y,indices:v},backend:r,attrs:{axis:1,batchDims:1}});disposeIntermediateTensorInfoOrNull(r,y);let _=c.slice(0,-1);_.push(i),C=v,v=reshape({inputs:{x:v},attrs:{shape:_},backend:r}),disposeIntermediateTensorInfoOrNull(r,C);let k=w;return w=reshape({inputs:{x:w},attrs:{shape:_},backend:r}),disposeIntermediateTensorInfoOrNull(r,k),[w,v]}};/**
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
 */let TransformProgram=class TransformProgram{constructor(e,t,r,n,a,i){let o;switch(this.variableNames=["Image","Transforms"],this.outputShape=i,n){case"constant":default:o=1;break;case"reflect":o=2;break;case"wrap":o=3;break;case"nearest":o=4}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${o} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${o} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${a});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${a});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${"nearest"===r?1:2} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};let av={kernelName:o.wx7,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{image:a,transforms:i}=t,{interpolation:o,fillMode:s,fillValue:l,outputShape:u}=n,[c,d,h,f]=a.shape,[p,m]=null!=u?u:[d,h],g=new TransformProgram(d,h,o,s,l,[c,p,m,f]);return r.runWebGLProgram(g,[a,i],"float32")}},aI={kernelName:o.kpP,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,attrs:r,backend:n}=e,{axis:a}=r,{x:i}=t;(0,c.assertNotComplex)(i,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let o=n.readSync(i.dataId),{outputValues:s,outputShape:l,indices:u}=(0,M.CV)(o,a,i.shape,i.dtype);return[n.makeTensorInfo(l,i.dtype,s),n.makeTensorInfo([u.length],"int32",u)]}},aC={kernelName:o.ToN,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{value:a}=t,{axis:i}=n;i<0&&(i+=a.shape.length);let o=a.shape.length,s=a.shape[i],l=Array(o-1),u=0;for(let e=0;e<o;e++)e!==i&&(l[u++]=a.shape[e]);let c=[],d=Array(o).fill(0),h=a.shape.slice();h[i]=1;let f=Array(s);for(let e=0;e<f.length;e++){d[i]=e;let t=slice({inputs:{x:a},backend:r,attrs:{begin:d,size:h}}),n=reshape({inputs:{x:t},backend:r,attrs:{shape:l}});f[e]=n,c.push(t)}return c.forEach(e=>r.disposeIntermediateTensorInfo(e)),f}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let SegmentOpProgram=class SegmentOpProgram{constructor(e,t){this.variableNames=["x","segmentIds"];let r=e.windowSize,n=e.batchSize,a=e.inSize,i=e.numSegments,o=i*Math.ceil(a/r);this.outputShape=[n,o];let s=4*Math.floor(r/4),l=r%4,u=`
        sumValue += dot(values, segFilter);
    `,c="";a%r>0&&(c=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return initializationValue;
        }
      `);let d="";a%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${a}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${c}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${i})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${i})));

        float sumValue = 0.0;

        for (int i = 0; i < ${s}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${u}
        }

        int inIdx = inOffset + ${s};
        if (${1===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${u}
        } else if (${2===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${u}
        } else if (${3===l}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${u}
        }
        setOutput(sumValue);
      }
    `}};let aw={kernelName:o.Qvg,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:n}=e,{x:a,segmentIds:i}=t,{numSegments:s}=n,l=a.shape.length,u=[],c=0,d=o.backend_util.getAxesPermutation([c],l),h=a;null!=d&&(h=transpose({inputs:{x:a},backend:r,attrs:{perm:d}}),u.push(h),c=o.backend_util.getInnerMostAxes(1,l)[0]);let f=o.backend_util.segment_util.computeOutShape(h.shape,c,s),p=o.D5U.sizeFromShape([h.shape[c]]),m=reshape({inputs:{x:h},backend:r,attrs:{shape:[-1,p]}});u.push(m);let g=(0,o.z4k)(a.dtype),segOpCompute=(e,t,n,a,i)=>{let s=e.shape[0],l=e.shape[1],c=o.backend_util.segment_util.segOpComputeOptimalWindowSize(l,i),d=new SegmentOpProgram({windowSize:c,inSize:l,batchSize:s,numSegments:i},t),h=r.compileAndRun(d,[e,n],a);if(u.push(h),h.shape[1]===i)return h;let f=range({backend:r,attrs:{start:0,stop:i,step:1,dtype:"float32"}}),p=tile({inputs:{x:f},backend:r,attrs:{reps:[l/c]}});u.push(f),u.push(p);let m=segOpCompute(h,t,p,a,i);return m},y=segOpCompute(m,"unsortedSegmentSum",i,g,s),x=reshape({inputs:{x:y},backend:r,attrs:{shape:f}}),b=x;if(null!=d){u.push(x);let e=o.backend_util.getUndoAxesPermutation(d);b=transpose({inputs:{x:b},backend:r,attrs:{perm:e}})}return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),b}};for(let e of[K,q,J,er,ei,eo,es,el,eu,ec,ef,eg,eb,ew,eT,ek,eE,eR,e$,eA,eN,eP,eD,eL,eU,eG,eK,eH,v,eX,eY,eJ,e0,e1,e2,e3,e4,e7,tt,tr,tn,ta,ti,to,ts,tl,tu,tc,td,th,tm,ty,tv,tw,tk,tE,tA,tN,tO,tF,tB,tV,tz,tZ,tj,tK,tH,tY,t0,b,t1,eq,t3,t5,t8,_,re,rn,ra,rl,rd,rp,rg,rb,rv,rI,rC,rT,rk,rE,rR,r$,rA,rN,rO,rB,rM,rW,rY,U,r0,r2,r4,r6,eW,r8,r9,ne,nt,ni,A,no,ns,nl,nu,nc,ez,rj,nh,ng,nv,z,nI,nC,nw,n_,nS,nT,nR,nA,nN,nO,nF,nB,nV,nG,nH,nY,eF,rq,n0,n1,n2,n3,n4,n5,n6,n8,ae,ar,ai,ao,as,al,au,ac,ad,rX,Z,af,ag,ay,ax,ab,av,j,aI,aC,aw,r7])(0,o.wCN)(e);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */},48816:function(e,t,r){"use strict";r.d(t,{$O:function(){return _},$j:function(){return et},$u:function(){return ee},A0:function(){return er},AR:function(){return Y},B_:function(){return y},Bk:function(){return Q},Bo:function(){return N},CJ:function(){return j},CV:function(){return el},F1:function(){return J},Fv:function(){return es},KX:function(){return ei},LS:function(){return q},M8:function(){return M},MZ:function(){return p},PQ:function(){return C},Qs:function(){return B},Rn:function(){return v},Sd:function(){return w},St:function(){return W},TD:function(){return m},Tg:function(){return D},Th:function(){return A},UN:function(){return Z},X8:function(){return X},XM:function(){return s},Y1:function(){return z},_9:function(){return en},aX:function(){return h},cK:function(){return a},cZ:function(){return F},cm:function(){return l},cx:function(){return o},fy:function(){return L},gv:function(){return d},hO:function(){return U},ji:function(){return x},kI:function(){return ea},kY:function(){return b},m$:function(){return g},n7:function(){return c},nL:function(){return k},nT:function(){return K},oC:function(){return eo},pk:function(){return u},qO:function(){return i},r:function(){return $},tx:function(){return f}});var n=r(40300);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let{addImpl:a,bincountImpl:i,bincountReduceImpl:o,bitwiseAndImpl:s,castImpl:l,ceilImpl:u,concatImpl:c,equalImpl:d,expImpl:h,expm1Impl:f,floorImpl:p,gatherNdImpl:m,gatherV2Impl:g,greaterImpl:y,greaterEqualImpl:x,lessImpl:b,lessEqualImpl:v,linSpaceImpl:C,logImpl:w,maxImpl:_,maximumImpl:k,minimumImpl:$,multiplyImpl:A,negImpl:N,notEqualImpl:F,prodImpl:D,raggedGatherImpl:B,raggedRangeImpl:M,raggedTensorToTensorImpl:L,rangeImpl:U,rsqrtImpl:W,scatterImpl:z,sigmoidImpl:Z,simpleAbsImpl:j,sliceImpl:K,sparseFillEmptyRowsImpl:X,sparseReshapeImpl:q,sparseSegmentReductionImpl:Y,sqrtImpl:Q,staticRegexReplaceImpl:J,stridedSliceImpl:ee,stringNGramsImpl:et,stringSplitImpl:er,stringToHashBucketFastImpl:en,subImpl:ea,tileImpl:ei,topKImpl:eo,transposeImpl:es,uniqueImpl:el}=n},20344:function(e,t,r){"use strict";r.d(t,{U:function(){return PackProgram}});var n=r(58257),a=r(4573),i=r(10058);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let PackProgram=class PackProgram{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),0===this.rank)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=(0,a.Ky)("rc",this.rank),t=(0,i.kW)(this.rank),r=this.getOutOfBoundsCondition(e),n=this.getSetup(e),o=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${r}) {
            setOutput(vec4(0));
          } else {
            ${n}

            setOutput(vec4(${o}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let r=0;r<=1;r++)for(let n=0;n<=1;n++){let a=`${0===r?"r":"rp1"}, ${0===n?"c":"cp1"}`;for(let t=2;t<this.rank;t++)a=`${e[e.length-1-t]},`+a;t.push(a)}return t}getOutOfBoundsCondition(e){if(1===this.rank)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let r=this.rank-2;r<this.rank;r++)t+=`${e[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(t+="||");return t}getSetup(e){if(1===this.rank)return"";let t=e.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${n};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);if(1===this.rank){let e=this.enableShapeUniforms?"outShape":this.outputShape[0];return`getA(rc), (rc + 1 >= ${e} ? 0. : getA(rc + 1)), 0, 0`}return`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}}},4573:function(e,t,r){"use strict";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getVecChannels(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function getChannels(e,t){return 1===t?[e]:getVecChannels(e,t)}function getSourceCoords(e,t){if(1===e)return"rc";let r="";for(let n=0;n<e;n++)r+=t[n],n<e-1&&(r+=",");return r}r.d(t,{Ky:function(){return getChannels},Qc:function(){return getSourceCoords},k6:function(){return getVecChannels}})},68588:function(e,t,r){"use strict";r.d(t,{v:function(){return ReshapePackedProgram}});var n=r(58257),a=r(37589);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ReshapePackedProgram=class ReshapePackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let r="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),r+=`
        ${t}
        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?"}":""}
      `}this.userCode=`
      ${function(e,t){let r=t?a.al(["r","c","d"],"inputShape"):a.RW(["r","c","d"],e);return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${r}
      return ivec3(r, c, d);
    }
  `}(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?a.nc():a.ku(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${r}

        setOutput(result);
      }
    `}}},37589:function(e,t,r){"use strict";r.d(t,{Kn:function(){return getOutputLogicalCoordinatesFromFlatIndexByUniform},RW:function(){return getLogicalCoordinatesFromFlatIndex},al:function(){return getLogicalCoordinatesFromFlatIndexByUniform},ku:function(){return getFlatIndexFrom3D},nc:function(){return getFlatIndexFrom3DOutput},ye:function(){return a}});var n=r(82783);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getLogicalCoordinatesFromFlatIndex(e,t,r="index"){let a=n.D5U.computeStrides(t);return a.map((t,n)=>{let i=`int ${e[n]} = ${r} / ${t}`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * ${t}`:`index -= ${e[n]} * ${t}`;return`${i}; ${o};`}).join("")}function getOutputLogicalCoordinatesFromFlatIndexByUniform(e,t,r="index"){let a=n.D5U.computeStrides(t);return a.map((t,n)=>{let i=`int ${e[n]} = ${r} / outShapeStrides[${n}]`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * outShapeStrides[${n}]`:`index -= ${e[n]} * outShapeStrides[${n}]`;return`${i}; ${o};`}).join("")}function getLogicalCoordinatesFromFlatIndexByUniform(e,t,r="index"){let n=e.map((e,t)=>t),a=function(e,t){let r=e.length,n=e.map(e=>`${t}[${e}]`),a=Array(r-1);a[r-2]=n[r-1];for(let e=r-3;e>=0;--e)a[e]=`(${a[e+1]} * ${n[e+1]})`;return a}(n,t);return a.map((t,n)=>{let i=`int ${e[n]} = ${r} / ${a[n]}`,o=n===a.length-1?`int ${e[n+1]} = ${r} - ${e[n]} * ${a[n]}`:`index -= ${e[n]} * ${a[n]}`;return`${i}; ${o};`}).join("")}function getFlatIndexFrom3D(e){let t=n.D5U.computeStrides(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function getFlatIndexFrom3DOutput(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}let a=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`},15389:function(e,t,r){"use strict";r.d(t,{Se:function(){return getPackedRGBAArraySizeFromMatrixShape},Sq:function(){return getTextureConfig},V9:function(){return l},Yz:function(){return getDenseTexShape},kk:function(){return getUnpackedMatrixTextureShapeWidthHeight},m1:function(){return o},qe:function(){return getPackedMatrixTextureShapeWidthHeight},v2:function(){return s},yb:function(){return getUnpackedArraySizeFromMatrixSize}});var n,a,i,o,s,l,u=r(82783);function getUnpackedMatrixTextureShapeWidthHeight(e,t){return[t,e]}function getUnpackedArraySizeFromMatrixSize(e,t){return e*t}function getDenseTexShape(e){let t=u.D5U.sizeFromShape(e),r=Math.ceil(t/4);return u.D5U.sizeToSquarishShape(r)}function getPackedMatrixTextureShapeWidthHeight(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function getPackedRGBAArraySizeFromMatrixShape(e,t){let[r,n]=getPackedMatrixTextureShapeWidthHeight(e,t);return r*n*4}function getTextureConfig(e,t){let r,n,a,i,o,s,l,c,d,h;return 2===(0,u.OBj)().getNumber("WEBGL_VERSION")?(r=e.R32F,n=e.R16F,a=e.RGBA16F,i=e.RGBA32F,o=e.RED,l=4,c=1,d=e.HALF_FLOAT,h=e.FLOAT,s=e.RGBA8):(r=e.RGBA,n=e.RGBA,a=e.RGBA,i=e.RGBA,o=e.RGBA,l=4,c=4,d=null!=t?t.HALF_FLOAT_OES:null,h=e.FLOAT,s=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:i,textureFormatFloat:o,downloadTextureFormat:s,downloadUnpackNumChannels:l,defaultNumChannels:c,textureTypeHalfFloat:d,textureTypeFloat:h}}(n=o||(o={}))[n.DENSE=0]="DENSE",n[n.SHARED_BATCH=1]="SHARED_BATCH",(a=s||(s={}))[a.RENDER=0]="RENDER",a[a.UPLOAD=1]="UPLOAD",a[a.PIXELS=2]="PIXELS",a[a.DOWNLOAD=3]="DOWNLOAD",(i=l||(l={}))[i.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",i[i.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",i[i.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",i[i.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",i[i.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"},31089:function(e,t,r){"use strict";r.d(t,{I:function(){return TextureManager}});var n=r(82783),a=r(25121),i=r(15389);/**
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
 */let TextureManager=class TextureManager{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,r){let n;let a=getPhysicalFromLogicalTextureType(t,r),o=getKeyFromTextureShape(e,a,r);o in this.freeTextures||(this.freeTextures[o]=[]),o in this.usedTextures||(this.usedTextures[o]=[]);let s=computeBytes(e,a,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[o].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=s,this.log();let e=this.freeTextures[o].pop();return this.usedTextures[o].push(e),e}return a===i.V9.PACKED_2X2_FLOAT32?n=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):a===i.V9.PACKED_2X2_FLOAT16?n=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):a===i.V9.UNPACKED_FLOAT32?n=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):a===i.V9.UNPACKED_FLOAT16?n=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):a===i.V9.PACKED_4X1_UNSIGNED_BYTE&&(n=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[o].push(n),this.numUsedTextures++,this._numBytesAllocated+=s,this.log(),n}releaseTexture(e,t,r,a){if(null==this.freeTextures)return;let i=getPhysicalFromLogicalTextureType(r,a),o=getKeyFromTextureShape(t,i,a);o in this.freeTextures||(this.freeTextures[o]=[]);let s=computeBytes(t,i,this.gpgpu.gl,this.gpgpu.textureConfig,a),l=(0,n.OBj)().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==l&&this._numBytesAllocated>l?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=s):(this.freeTextures[o].push(e),this.numFreeTextures++,this._numBytesFree+=s),this.numUsedTextures--;let u=this.usedTextures[o],c=u&&u.indexOf(e);if(null==c||c<0)throw Error("Cannot release a texture that was never provided by this texture manager");u[c]=u[u.length-1],u.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function computeBytes(e,t,r,n,o){let s;let l=function(e,t){switch(e){case i.V9.PACKED_2X2_FLOAT32:return(0,a.getInternalFormatForPackedMatrixTexture)(t);case i.V9.PACKED_2X2_FLOAT16:return(0,a.getInternalFormatForFloat16PackedMatrixTexture)(t);case i.V9.UNPACKED_FLOAT32:return(0,a.getInternalFormatForFloat32MatrixTexture)(t);case i.V9.UNPACKED_FLOAT16:return(0,a.getInternalFormatForFloat16MatrixTexture)(t);case i.V9.PACKED_4X1_UNSIGNED_BYTE:return(0,a.getInternalFormatForUnsignedBytesMatrixTexture)(t);default:throw Error(`Unknown physical texture type ${e}`)}}(t,n);if(o){let[t,r]=(0,i.qe)(e[0],e[1]);s=t*r}else{let[t,r]=(0,i.kk)(e[0],e[1]);s=t*r}let u=function(e,t){if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F||t===e.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}(r,l);return s*u}function getPhysicalFromLogicalTextureType(e,t){if(e===i.v2.UPLOAD)return i.V9.PACKED_2X2_FLOAT32;if(e===i.v2.RENDER||null==e)return(0,n.OBj)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?i.V9.PACKED_2X2_FLOAT32:i.V9.UNPACKED_FLOAT32:t?i.V9.PACKED_2X2_FLOAT16:i.V9.UNPACKED_FLOAT16;if(e===i.v2.DOWNLOAD||e===i.v2.PIXELS)return i.V9.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function getKeyFromTextureShape(e,t,r){return`${e[0]}_${e[1]}_${t}_${r}`}},13150:function(e,t,r){"use strict";r.d(t,{Cv:function(){return s},D1:function(){return a},Et:function(){return o},RX:function(){return l},Tq:function(){return d},bl:function(){return c},eW:function(){return u},l:function(){return UnaryOpProgram},t$:function(){return i}});var n=r(58257);/**
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
 */let UnaryOpProgram=class UnaryOpProgram{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}};let a="if (isnan(x)) return x;",i="return x;",o="return abs(x);",s="return (x >= 0.0) ? x : (exp(x) - 1.0);",l=a+`
  return (x < 0.0) ? 0.0 : x;
`,u=a+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,c="return x;",d="return 1.0 / (1.0 + exp(-1.0 * x));"},38595:function(e,t,r){"use strict";r.d(t,{Cv:function(){return i},RX:function(){return o},Tq:function(){return l},cc:function(){return UnaryOpPackedProgram},eW:function(){return s},t$:function(){return a}});var n=r(58257);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let a="return x;",i=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,o=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,s=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,l="return 1.0 / (1.0 + exp(-1.0 * x));";let UnaryOpPackedProgram=class UnaryOpPackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}},28063:function(e,t,r){"use strict";r.d(t,{W:function(){return UnpackProgram}});var n=r(58257),a=r(4573),i=r(10058);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let UnpackProgram=class UnpackProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let t=e.length,r=(0,a.Ky)("rc",t),o=(0,i.kW)(t),s=(0,a.Qc)(t,r),l=r.slice(-2),u=t<=1?"rc":`vec2(${l.join(",")})`;this.userCode=`
      void main() {
        ${o} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${u}));
      }
    `}}},67818:function(e,t,r){"use strict";let n,a;r.r(t),r.d(t,{assertNotComplex:function(){return assertNotComplex},bindCanvasToFramebuffer:function(){return bindCanvasToFramebuffer},bindColorTextureToFramebuffer:function(){return bindColorTextureToFramebuffer},bindTextureToProgramUniformSampler:function(){return bindTextureToProgramUniformSampler},bindTextureUnit:function(){return bindTextureUnit},bindVertexBufferToProgramAttribute:function(){return bindVertexBufferToProgramAttribute},callAndCheck:function(){return callAndCheck},canBeRepresented:function(){return canBeRepresented},createFragmentShader:function(){return createFragmentShader},createFramebuffer:function(){return createFramebuffer},createProgram:function(){return createProgram},createStaticIndexBuffer:function(){return createStaticIndexBuffer},createStaticVertexBuffer:function(){return createStaticVertexBuffer},createTexture:function(){return createTexture},createVertexShader:function(){return createVertexShader},getBatchDim:function(){return getBatchDim},getExtensionOrThrow:function(){return getExtensionOrThrow},getFramebufferErrorMessage:function(){return getFramebufferErrorMessage},getMaxTexturesInShader:function(){return getMaxTexturesInShader},getNumChannels:function(){return getNumChannels},getProgramUniformLocation:function(){return getProgramUniformLocation},getProgramUniformLocationOrThrow:function(){return getProgramUniformLocationOrThrow},getRowsCols:function(){return getRowsCols},getShapeAs3D:function(){return getShapeAs3D},getTextureShapeFromLogicalShape:function(){return getTextureShapeFromLogicalShape},getWebGLDisjointQueryTimerVersion:function(){return getWebGLDisjointQueryTimerVersion},getWebGLErrorMessage:function(){return getWebGLErrorMessage},getWebGLMaxTextureSize:function(){return getWebGLMaxTextureSize},hasExtension:function(){return hasExtension},isCapableOfRenderingToFloatTexture:function(){return isCapableOfRenderingToFloatTexture},isDownloadFloatTextureEnabled:function(){return isDownloadFloatTextureEnabled},isReshapeFree:function(){return isReshapeFree},isWebGLFenceEnabled:function(){return isWebGLFenceEnabled},isWebGLVersionEnabled:function(){return isWebGLVersionEnabled},linkProgram:function(){return linkProgram},logShaderSourceAndInfoLog:function(){return logShaderSourceAndInfoLog},resetMaxTextureSize:function(){return resetMaxTextureSize},resetMaxTexturesInShader:function(){return resetMaxTexturesInShader},unbindColorTextureFromFramebuffer:function(){return unbindColorTextureFromFramebuffer},unbindTextureUnit:function(){return unbindTextureUnit},validateFramebuffer:function(){return validateFramebuffer},validateProgram:function(){return validateProgram},validateTextureSize:function(){return validateTextureSize}});var i=r(82783),o=r(58876),s=r(15389);/**
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
 */function callAndCheck(e,t){let r=t();return(0,i.OBj)().getBool("DEBUG")&&function(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error("WebGL Error: "+getWebGLErrorMessage(e,t))}(e),r}function canBeRepresented(e){return!!((0,i.OBj)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===e||596e-10<Math.abs(e)&&65504>Math.abs(e))}function getWebGLErrorMessage(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function getExtensionOrThrow(e,t){return throwIfNull(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function createVertexShader(e,t){let r=throwIfNull(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(callAndCheck(e,()=>e.shaderSource(r,t)),callAndCheck(e,()=>e.compileShader(r)),!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(r)),Error("Failed to compile vertex shader.");return r}function createFragmentShader(e,t){let r=throwIfNull(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(callAndCheck(e,()=>e.shaderSource(r,t)),callAndCheck(e,()=>e.compileShader(r)),(0,i.OBj)().get("ENGINE_COMPILE_ONLY"))return r;if(!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw logShaderSourceAndInfoLog(t,e.getShaderInfoLog(r)),Error("Failed to compile fragment shader.");return r}let l=/ERROR: [0-9]+:([0-9]+):/g;function logShaderSourceAndInfoLog(e,t){let r=l.exec(t);if(null==r){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let n=+r[1],a=e.split("\n"),o=a.length.toString().length+2,s=a.map((e,t)=>i.D5U.rightPad((t+1).toString(),o)+e),u=0;for(let e=0;e<s.length;e++)u=Math.max(s[e].length,u);let c=s.slice(0,n-1),d=s.slice(n-1,n),h=s.slice(n);console.log(c.join("\n")),console.log(t.split("\n")[0]),console.log(`%c ${i.D5U.rightPad(d[0],u)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(h.join("\n"))}function createProgram(e){return throwIfNull(e,()=>e.createProgram(),"Unable to create WebGLProgram.")}function linkProgram(e,t){if(callAndCheck(e,()=>e.linkProgram(t)),!(0,i.OBj)().get("ENGINE_COMPILE_ONLY")&&!1===e.getProgramParameter(t,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Failed to link vertex and fragment shaders.")}function validateProgram(e,t){if(callAndCheck(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Shader program validation failed.")}function createStaticVertexBuffer(e,t){let r=throwIfNull(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),callAndCheck(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function createStaticIndexBuffer(e,t){let r=throwIfNull(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return callAndCheck(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r)),callAndCheck(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function getNumChannels(){return 2===(0,i.OBj)().getNumber("WEBGL_VERSION")?1:4}function createTexture(e){return throwIfNull(e,()=>e.createTexture(),"Unable to create WebGLTexture.")}function validateTextureSize(e,t){let r=(0,i.OBj)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0){let r=`[${e}x${t}]`;throw Error("Requested texture size "+r+" is invalid.")}if(e>r||t>r){let n=`[${e}x${t}]`,a=`[${r}x${r}]`;throw Error("Requested texture size "+n+" greater than WebGL maximum on this browser / GPU "+a+".")}}function createFramebuffer(e){return throwIfNull(e,()=>e.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function bindVertexBufferToProgramAttribute(e,t,r,n,a,i,o){let s=e.getAttribLocation(t,r);return -1!==s&&(callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),callAndCheck(e,()=>e.vertexAttribPointer(s,a,e.FLOAT,!1,i,o)),callAndCheck(e,()=>e.enableVertexAttribArray(s)),!0)}function bindTextureUnit(e,t,r){validateTextureUnit(e,r),callAndCheck(e,()=>e.activeTexture(e.TEXTURE0+r)),callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t))}function unbindTextureUnit(e,t){validateTextureUnit(e,t),callAndCheck(e,()=>e.activeTexture(e.TEXTURE0+t)),callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function getProgramUniformLocationOrThrow(e,t,r){return throwIfNull(e,()=>e.getUniformLocation(t,r),'uniform "'+r+'" not present in program.')}function getProgramUniformLocation(e,t,r){return e.getUniformLocation(t,r)}function bindTextureToProgramUniformSampler(e,t,r,n){callAndCheck(e,()=>bindTextureUnit(e,t,n)),callAndCheck(e,()=>e.uniform1i(r,n))}function bindCanvasToFramebuffer(e){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),callAndCheck(e,()=>e.viewport(0,0,e.canvas.width,e.canvas.height)),callAndCheck(e,()=>e.scissor(0,0,e.canvas.width,e.canvas.height))}function bindColorTextureToFramebuffer(e,t,r){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,r)),callAndCheck(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function unbindColorTextureFromFramebuffer(e,t){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),callAndCheck(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function validateFramebuffer(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error("Error binding framebuffer: "+getFramebufferErrorMessage(e,t))}function getFramebufferErrorMessage(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function throwIfNull(e,t,r){let n=callAndCheck(e,()=>t());if(null==n)throw Error(r);return n}function validateTextureUnit(e,t){let r=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,n=t+e.TEXTURE0;if(n<e.TEXTURE0||n>r){let e=`[gl.TEXTURE0, gl.TEXTURE${r}]`;throw Error(`textureUnit must be in ${e}.`)}}function getBatchDim(e,t=2){return i.D5U.sizeFromShape(e.slice(0,e.length-t))}function getRowsCols(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function getShapeAs3D(e){let t=[1,1,1],r=0===e.length||1===e.length&&1===e[0];return r||(t=[getBatchDim(e),...getRowsCols(e)]),t}function getTextureShapeFromLogicalShape(e,t=!1){let r=(0,i.OBj)().getNumber("WEBGL_MAX_TEXTURE_SIZE"),n=(0,i.OBj)().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");if(n===1/0&&(0,i.OBj)().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(n=r/2),t&&(r*=2,n*=2,1===(e=e.map((t,r)=>r>=e.length-2?i.D5U.nearestLargerEven(e[r]):e[r])).length&&(e=[2,e[0]])),2!==e.length){let t=i.D5U.squeezeShape(e);e=t.newShape}let a=i.D5U.sizeFromShape(e),o=null;e.length<=1&&a<=r?o=[1,a]:2===e.length&&e[0]<=r&&e[1]<=r?o=e:3===e.length&&e[0]*e[1]<=r&&e[2]<=r?o=[e[0]*e[1],e[2]]:3===e.length&&e[0]<=r&&e[1]*e[2]<=r?o=[e[0],e[1]*e[2]]:4===e.length&&e[0]*e[1]*e[2]<=r&&e[3]<=r?o=[e[0]*e[1]*e[2],e[3]]:4===e.length&&e[0]<=r&&e[1]*e[2]*e[3]<=r&&(o=[e[0],e[1]*e[2]*e[3]]);let s=null!=o&&Math.max(...o)>n&&Math.min(...o)<=(t?2:1)&&Math.min(...o)>0;if(null==o||s){if(t){let t=getBatchDim(e),r=2,n=2;e.length&&([r,n]=getRowsCols(e)),a=t*(r/2)*(n/2),o=i.D5U.sizeToSquarishShape(a).map(e=>2*e)}else o=i.D5U.sizeToSquarishShape(a)}return o}function isReshapeFree(e,t){if(e=e.slice(-2),t=t.slice(-2),i.D5U.arraysEqual(e,t)||!e.length||!t.length||0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){let r=e[e.length-1],n=t[t.length-1];if(r===n||r%2==0&&n%2==0&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&e[0]%2==0&&t[0]%2==0}function getWebGLMaxTextureSize(e){if(null==n){let t=(0,o.jl)(e);n=t.getParameter(t.MAX_TEXTURE_SIZE)}return n}function resetMaxTextureSize(){n=null}function resetMaxTexturesInShader(){a=null}function getMaxTexturesInShader(e){if(null==a){let t=(0,o.jl)(e);a=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,a)}function getWebGLDisjointQueryTimerVersion(e){if(0===e)return 0;let t=(0,o.jl)(e);return hasExtension(t,"EXT_disjoint_timer_query_webgl2")&&2===e?2:hasExtension(t,"EXT_disjoint_timer_query")?1:0}function hasExtension(e,t){let r=e.getExtension(t);return null!=r}function isWebGLVersionEnabled(e){try{let t=(0,o.jl)(e);if(null!=t)return!0}catch(e){console.log("Error when getting WebGL context: ",e)}return!1}function isCapableOfRenderingToFloatTexture(e){if(0===e)return!1;let t=(0,o.jl)(e);if(1===e){if(!hasExtension(t,"OES_texture_float"))return!1}else if(!hasExtension(t,"EXT_color_buffer_float"))return!1;let r=createFloatTextureAndBindToFramebuffer(t);return r}function isDownloadFloatTextureEnabled(e){if(0===e)return!1;let t=(0,o.jl)(e);if(1===e){if(!hasExtension(t,"OES_texture_float")||!hasExtension(t,"WEBGL_color_buffer_float"))return!1}else{if(hasExtension(t,"EXT_color_buffer_float"))return createFloatTextureAndBindToFramebuffer(t);let e="EXT_color_buffer_half_float";if(hasExtension(t,e)){let r=t.getExtension(e);return function(e,t){let r=(0,s.Sq)(e,t),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,r.internalFormatHalfFloat,1,1,0,r.textureFormatFloat,r.textureTypeHalfFloat,null);let a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(a),i}(t,r)}return!1}let r=createFloatTextureAndBindToFramebuffer(t);return r}function createFloatTextureAndBindToFramebuffer(e){let t=(0,s.Sq)(e),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(n),a}function isWebGLFenceEnabled(e){if(2!==e)return!1;let t=(0,o.jl)(e),r=null!=t.fenceSync;return r}function assertNotComplex(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&i.D5U.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}},82783:function(e,t,r){"use strict";let n,a,i;r.d(t,{SYM:function(){return B},VGw:function(){return M},SpW:function(){return L},mm_:function(){return U},Xze:function(){return W},oT6:function(){return z},IKK:function(){return Z},sJF:function(){return j},aJk:function(){return K},M2y:function(){return X},qw7:function(){return q},jMg:function(){return Y},QCc:function(){return J},Oyi:function(){return Q},JhU:function(){return ee},_k9:function(){return er},IMb:function(){return en},ROF:function(){return et},XLW:function(){return ea},zws:function(){return ei},zvY:function(){return eo},hCO:function(){return es},eEB:function(){return el},RFZ:function(){return eu},gJX:function(){return ec},xnO:function(){return ed},Zz9:function(){return eh},yj2:function(){return ef},Eh3:function(){return ep},mhS:function(){return em},wUP:function(){return eg},wm:function(){return ey},x12:function(){return ex},o2y:function(){return eb},ik2:function(){return ev},mc4:function(){return eI},TR1:function(){return eC},VcC:function(){return eS},Byc:function(){return ew},iHb:function(){return e_},JLz:function(){return DataStorage},QRR:function(){return eT},T0n:function(){return ek},cie:function(){return eE},sL$:function(){return eR},y7R:function(){return e$},$w:function(){return eA},p4S:function(){return eN},Vn9:function(){return eF},ekb:function(){return eO},hGc:function(){return eP},$g6:function(){return eB},SX0:function(){return eM},HEU:function(){return eL},hdR:function(){return eV},Omj:function(){return eU},NEP:function(){return eW},YFo:function(){return ez},Y0y:function(){return eG},vwp:function(){return eZ},deh:function(){return ej},Uyb:function(){return eK},OR:function(){return eH},jeX:function(){return eX},eBW:function(){return rT},sHE:function(){return eq},_V0:function(){return rR},luS:function(){return r$},q1x:function(){return eQ},qi_:function(){return eY},iZT:function(){return eJ},Acj:function(){return e0},Qg5:function(){return e2},iJz:function(){return e1},J_u:function(){return e3},avt:function(){return e4},iWB:function(){return e5},r7n:function(){return e6},Zuw:function(){return KernelBackend},eZ0:function(){return to},Hhh:function(){return ts},J$2:function(){return e8},vtC:function(){return e7},CAk:function(){return e9},e7N:function(){return te},ZbH:function(){return tt},kU:function(){return tr},PYm:function(){return tn},VfG:function(){return ta},MZg:function(){return ti},YoZ:function(){return tl},mTV:function(){return tc},OAf:function(){return th},OU7:function(){return tf},OV7:function(){return td},vFR:function(){return tp},BMI:function(){return tu},q2K:function(){return tm},c17:function(){return tg},q8u:function(){return ty},jQs:function(){return tx},Vbg:function(){return tb},NZg:function(){return tv},wYn:function(){return tI},kuV:function(){return tC},uv1:function(){return t_},cye:function(){return tS},W0H:function(){return tT},yQU:function(){return tw},we_:function(){return tE},qWM:function(){return tk},QiL:function(){return tR},lyA:function(){return t$},pe_:function(){return tA},o0g:function(){return tN},DlI:function(){return tO},dDz:function(){return tF},CQl:function(){return tP},BiW:function(){return tD},e6w:function(){return tB},xJR:function(){return tM},oHH:function(){return eD},$HU:function(){return tL},qkr:function(){return tU},SbG:function(){return tj},HZH:function(){return tV},_Yw:function(){return tG},zbQ:function(){return tZ},dpD:function(){return tW},Hmb:function(){return tz},mKl:function(){return tK},b9H:function(){return rk},e07:function(){return tH},bV0:function(){return tX},xQA:function(){return tq},nr8:function(){return tQ},PhF:function(){return tJ},oFR:function(){return t0},a5O:function(){return t5},i5y:function(){return t4},RQH:function(){return t2},wYB:function(){return t3},p2w:function(){return t1},Gcp:function(){return rt},MRv:function(){return t6},TQc:function(){return t9},O3z:function(){return rr},nhH:function(){return rn},w3H:function(){return ra},ZjV:function(){return ri},D2d:function(){return ro},L8s:function(){return re},FKq:function(){return t8},bK0:function(){return rl},_tC:function(){return rs},e0R:function(){return ru},h8e:function(){return rS},jQk:function(){return rc},_JP:function(){return rd},s1s:function(){return rh},XkS:function(){return rf},Tr8:function(){return rp},GBy:function(){return t7},sEM:function(){return rm},MIZ:function(){return rg},YDk:function(){return TensorBuffer},SIB:function(){return tY},n9L:function(){return ry},cWu:function(){return rx},wx7:function(){return rb},G3Y:function(){return rv},kpP:function(){return rI},ToN:function(){return rC},Qvg:function(){return rw},RuY:function(){return r_},usg:function(){return rE},backend_util:function(){return $},UFq:function(){return ns},Jyw:function(){return w},f3b:function(){return buffer},C2$:function(){return C},hiC:function(){return r4},SRH:function(){return engine},OBj:function(){return environment_env},GDt:function(){return A},J69:function(){return nl},glt:function(){return nextFrame},sQ3:function(){return nt},Cd_:function(){return ready},jqO:function(){return registerBackend},wCN:function(){return registerKernel},XLQ:function(){return no},iD$:function(){return scalar},CQI:function(){return setBackend},tdS:function(){return nE},kuN:function(){return _},Vl2:function(){return nu},luU:function(){return nr},Smz:function(){return nc},z4k:function(){return sumOutType},odF:function(){return tensor2d},lub:function(){return tidy},x8V:function(){return upcastType},D5U:function(){return v},lls:function(){return zeros}});var o,s,l,u,c,d,h,f,p,m,g,y,x,b,v={};r.r(v),r.d(v,{arraysEqual:function(){return arraysEqual},arraysEqualWithNull:function(){return arraysEqualWithNull},assert:function(){return util_base_assert},assertNonNegativeIntegerDimensions:function(){return assertNonNegativeIntegerDimensions},assertNonNull:function(){return assertNonNull},assertShapesMatch:function(){return assertShapesMatch},bytesFromStringArray:function(){return bytesFromStringArray},bytesPerElement:function(){return bytesPerElement},checkConversionForErrors:function(){return checkConversionForErrors},clamp:function(){return clamp},computeStrides:function(){return computeStrides},convertBackendValuesAndArrayBuffer:function(){return convertBackendValuesAndArrayBuffer},createScalarValue:function(){return createScalarValue},createShuffledIndices:function(){return createShuffledIndices},decodeString:function(){return decodeString},distSquared:function(){return distSquared},encodeString:function(){return encodeString},fetch:function(){return util_fetch},fingerPrint64:function(){return fingerPrint64},flatten:function(){return flatten},getArrayFromDType:function(){return getArrayFromDType},getTypedArrayFromDType:function(){return getTypedArrayFromDType},hasEncodingLoss:function(){return hasEncodingLoss},hexToLong:function(){return hexToLong},indexToLoc:function(){return indexToLoc},inferDtype:function(){return inferDtype},inferFromImplicitShape:function(){return inferFromImplicitShape},isBoolean:function(){return isBoolean},isFunction:function(){return isFunction},isInt:function(){return isInt},isNumber:function(){return isNumber},isPromise:function(){return isPromise},isScalarShape:function(){return isScalarShape},isString:function(){return isString},isTypedArray:function(){return isTypedArray},isValidDtype:function(){return isValidDtype},locToIndex:function(){return locToIndex},makeOnesTypedArray:function(){return makeOnesTypedArray},makeZerosNestedTypedArray:function(){return makeZerosNestedTypedArray},makeZerosTypedArray:function(){return makeZerosTypedArray},nearestDivisor:function(){return nearestDivisor},nearestLargerEven:function(){return nearestLargerEven},now:function(){return now},parseAxisParam:function(){return parseAxisParam},randUniform:function(){return randUniform},repeatedTry:function(){return repeatedTry},rightPad:function(){return rightPad},shuffle:function(){return shuffle},shuffleCombo:function(){return shuffleCombo},sizeFromShape:function(){return util_base_sizeFromShape},sizeToSquarishShape:function(){return sizeToSquarishShape},squeezeShape:function(){return squeezeShape},sum:function(){return sum},swap:function(){return swap},tanh:function(){return tanh},toNestedArray:function(){return toNestedArray},toTypedArray:function(){return toTypedArray}});var C={};r.r(C),r.d(C,{isBrowser:function(){return isBrowser},isMobile:function(){return isMobile},mockIsMobile:function(){return mockIsMobile}});var w={};r.r(w),r.d(w,{assertAndGetBroadcastShape:function(){return assertAndGetBroadcastShape},getBroadcastDims:function(){return getBroadcastDims},getReductionAxes:function(){return getReductionAxes}});var _={};r.r(_),r.d(_,{assertParamsValid:function(){return assertParamsValid},computeFlatOffset:function(){return computeFlatOffset},computeOutShape:function(){return computeOutShape},getNormalizedAxes:function(){return getNormalizedAxes},isSliceContinous:function(){return isSliceContinous},maskToAxes:function(){return maskToAxes},parseSliceParams:function(){return parseSliceParams},sliceInfo:function(){return sliceInfo},startForAxis:function(){return startForAxis},startIndicesWithElidedDims:function(){return startIndicesWithElidedDims},stopForAxis:function(){return stopForAxis},stopIndicesWithElidedDims:function(){return stopIndicesWithElidedDims},stridesForAxis:function(){return stridesForAxis},stridesWithElidedDims:function(){return stridesWithElidedDims}});var k={};r.r(k),r.d(k,{collectGatherOpShapeInfo:function(){return collectGatherOpShapeInfo},computeOutShape:function(){return segment_util_computeOutShape},segOpComputeOptimalWindowSize:function(){return segOpComputeOptimalWindowSize}});var $={};r.r($),r.d($,{ERF_A1:function(){return nU},ERF_A2:function(){return nV},ERF_A3:function(){return nW},ERF_A4:function(){return nz},ERF_A5:function(){return nG},ERF_P:function(){return nL},PARALLELIZE_THRESHOLD:function(){return nD},RowPartitionType:function(){return b},SELU_SCALE:function(){return nM},SELU_SCALEALPHA:function(){return nB},applyActivation:function(){return applyActivation},assertAndGetBroadcastShape:function(){return assertAndGetBroadcastShape},assertAxesAreInnerMostDims:function(){return assertAxesAreInnerMostDims},assertParamsConsistent:function(){return assertParamsConsistent},assignToTypedArray:function(){return assignToTypedArray},axesAreInnerMostDims:function(){return axesAreInnerMostDims},calculateShapes:function(){return calculateShapes},checkEinsumDimSizes:function(){return checkEinsumDimSizes},checkPadOnDimRoundingMode:function(){return checkPadOnDimRoundingMode},combineLocations:function(){return combineLocations},combineRaggedTensorToTensorShapes:function(){return combineRaggedTensorToTensorShapes},complexWithEvenIndex:function(){return complexWithEvenIndex},complexWithOddIndex:function(){return complexWithOddIndex},computeConv2DInfo:function(){return computeConv2DInfo},computeConv3DInfo:function(){return computeConv3DInfo},computeDefaultPad:function(){return computeDefaultPad},computeDilation2DInfo:function(){return computeDilation2DInfo},computeOptimalWindowSize:function(){return computeOptimalWindowSize},computeOutAndReduceShapes:function(){return computeOutAndReduceShapes},computeOutShape:function(){return concat_util_computeOutShape},computePool2DInfo:function(){return computePool2DInfo},computePool3DInfo:function(){return computePool3DInfo},convertConv2DDataFormat:function(){return convertConv2DDataFormat},decodeEinsumEquation:function(){return decodeEinsumEquation},eitherStridesOrDilationsAreOne:function(){return eitherStridesOrDilationsAreOne},expandShapeToKeepDim:function(){return expandShapeToKeepDim},exponent:function(){return exponent},exponents:function(){return exponents},fromStringArrayToUint8:function(){return fromStringArrayToUint8},fromUint8ToStringArray:function(){return fromUint8ToStringArray},getAxesPermutation:function(){return getAxesPermutation},getBroadcastDims:function(){return getBroadcastDims},getComplexWithIndex:function(){return getComplexWithIndex},getEinsumComputePath:function(){return getEinsumComputePath},getEinsumPermutation:function(){return getEinsumPermutation},getFusedBiasGradient:function(){return getFusedBiasGradient},getFusedDyActivation:function(){return getFusedDyActivation},getImageCenter:function(){return getImageCenter},getInnerMostAxes:function(){return getInnerMostAxes},getPermuted:function(){return getPermuted},getRaggedRank:function(){return getRaggedRank},getReductionAxes:function(){return getReductionAxes},getReshaped:function(){return getReshaped},getReshapedPermuted:function(){return getReshapedPermuted},getRowPartitionTypesHelper:function(){return getRowPartitionTypesHelper},getSliceBeginCoords:function(){return getSliceBeginCoords},getSliceSize:function(){return getSliceSize},getSparseFillEmptyRowsIndicesDenseShapeMismatch:function(){return getSparseFillEmptyRowsIndicesDenseShapeMismatch},getSparseFillEmptyRowsNegativeIndexErrorMessage:function(){return getSparseFillEmptyRowsNegativeIndexErrorMessage},getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:function(){return getSparseFillEmptyRowsOutOfRangeIndexErrorMessage},getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:function(){return getSparseReshapeEmptyTensorZeroOutputDimErrorMessage},getSparseReshapeInputOutputMismatchErrorMessage:function(){return getSparseReshapeInputOutputMismatchErrorMessage},getSparseReshapeInputOutputMultipleErrorMessage:function(){return getSparseReshapeInputOutputMultipleErrorMessage},getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:function(){return getSparseReshapeMultipleNegativeOneOutputDimErrorMessage},getSparseReshapeNegativeOutputDimErrorMessage:function(){return getSparseReshapeNegativeOutputDimErrorMessage},getSparseSegmentReductionIndicesOutOfRangeErrorMessage:function(){return getSparseSegmentReductionIndicesOutOfRangeErrorMessage},getSparseSegmentReductionNegativeSegmentIdsErrorMessage:function(){return getSparseSegmentReductionNegativeSegmentIdsErrorMessage},getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:function(){return getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage},getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:function(){return getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage},getUndoAxesPermutation:function(){return getUndoAxesPermutation},isIdentityPermutation:function(){return isIdentityPermutation},log:function(){return log_log},mergeRealAndImagArrays:function(){return mergeRealAndImagArrays},prepareAndValidate:function(){return prepareAndValidate},prepareSplitSize:function(){return prepareSplitSize},segment_util:function(){return k},shouldFuse:function(){return shouldFuse},slice_util:function(){return _},splitRealAndImagArrays:function(){return splitRealAndImagArrays},stridesOrDilationsArePositive:function(){return stridesOrDilationsArePositive},tupleValuesAreOne:function(){return tupleValuesAreOne},upcastType:function(){return upcastType},validateDefaultValueShape:function(){return validateDefaultValueShape},validateInput:function(){return validateInput},validateUpdateShape:function(){return validateUpdateShape},warn:function(){return warn}});var A={};r.r(A),r.d(A,{nonMaxSuppressionV3Impl:function(){return nonMaxSuppressionV3Impl},nonMaxSuppressionV4Impl:function(){return nonMaxSuppressionV4Impl},nonMaxSuppressionV5Impl:function(){return nonMaxSuppressionV5Impl},whereImpl:function(){return whereImpl}});let DataStorage=class DataStorage{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}};let KernelBackend=class KernelBackend{refCount(e){return notYetImplemented("refCount")}incRef(e){return notYetImplemented("incRef")}timerAvailable(){return!0}time(e){return notYetImplemented("time")}read(e){return notYetImplemented("read")}readSync(e){return notYetImplemented("readSync")}readToGPU(e,t){return notYetImplemented("readToGPU")}numDataIds(){return notYetImplemented("numDataIds")}disposeData(e,t){return notYetImplemented("disposeData")}write(e,t,r){return notYetImplemented("write")}move(e,t,r,n,a){return notYetImplemented("move")}createTensorFromGPUData(e,t,r){return notYetImplemented("createTensorFromGPUData")}memory(){return notYetImplemented("memory")}floatPrecision(){return notYetImplemented("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}dispose(){return notYetImplemented("dispose")}};function notYetImplemented(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function shuffle(e){let t=e.length,r=0;for(;t>0;)r=Math.random()*t|0,swap(e,--t,r)}function shuffleCombo(e,t){if(e.length!==t.length)throw Error(`Array sizes must match to be shuffled together First array length was ${e.length}Second array length was ${t.length}`);let r=e.length,n=0;for(;r>0;)n=Math.random()*r|0,swap(e,--r,n),swap(t,r,n)}function clamp(e,t,r){return Math.max(e,Math.min(t,r))}function nearestLargerEven(e){return e%2==0?e:e+1}function swap(e,t,r){let n=e[t];e[t]=e[r],e[r]=n}function sum(e){let t=0;for(let r=0;r<e.length;r++)t+=e[r];return t}function randUniform(e,t){let r=Math.random();return t*r+(1-r)*e}function distSquared(e,t){let r=0;for(let n=0;n<e.length;n++){let a=Number(e[n])-Number(t[n]);r+=a*a}return r}function util_base_assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function assertShapesMatch(e,t,r=""){util_base_assert(arraysEqual(e,t),()=>r+` Shapes ${e} and ${t} must match`)}function assertNonNull(e){util_base_assert(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function util_base_sizeFromShape(e){if(0===e.length)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}function isScalarShape(e){return 0===e.length}function arraysEqualWithNull(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(null!==e[r]&&null!==t[r]&&e[r]!==t[r])return!1;return!0}function arraysEqual(e,t){if(e===t)return!0;if(null==e||null==t||e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function isInt(e){return e%1==0}function tanh(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return -1;{let t=Math.exp(2*e);return(t-1)/(t+1)}}function sizeToSquarishShape(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function createShuffledIndices(e){let t=new Uint32Array(e);for(let r=0;r<e;++r)t[r]=r;return shuffle(t),t}function rightPad(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function repeatedTry(e,t=e=>0,r,n){return new Promise((a,i)=>{let o=0,tryFn=()=>{if(e()){a();return}o++;let s=t(o);if(null!=r&&o>=r){i();return}null!=n?n(tryFn,s):setTimeout(tryFn,s)};tryFn()})}function inferFromImplicitShape(e,t){let r=1,n=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)r*=e[t];else if(-1===e[t]){if(-1!==n)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${n} and dim ${t}`);n=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(-1===n){if(t>0&&t!==r)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===r)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%r!=0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${r}`);let a=e.slice();return a[n]=t/r,a}function parseAxisParam(e,t){let r=t.length;return util_base_assert((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-r&&e<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${e}`),util_base_assert(e.every(e=>isInt(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?r+e:e)}function squeezeShape(e,t){let r=[],n=[],a=null!=t&&Array.isArray(t)&&0===t.length,i=null==t||a?null:parseAxisParam(t,e).sort(),o=0;for(let t=0;t<e.length;++t){if(null!=i){if(i[o]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==i[o]||i[o]>t)&&1===e[t]&&(r.push(e[t]),n.push(t)),i[o]<=t&&o++}1!==e[t]&&(r.push(e[t]),n.push(t))}return{newShape:r,keptDims:n}}function getTypedArrayFromDType(e,t){return getArrayFromDType(e,t)}function getArrayFromDType(e,t){let r=null;if(null==e||"float32"===e)r=new Float32Array(t);else if("int32"===e)r=new Int32Array(t);else if("bool"===e)r=new Uint8Array(t);else if("string"===e)r=Array(t);else throw Error(`Unknown data type ${e}`);return r}function checkConversionForErrors(e,t){for(let r=0;r<e.length;r++){let n=e[r];if(isNaN(n)||!isFinite(n))throw Error(`A tensor of type ${t} being uploaded contains ${n}.`)}}function isValidDtype(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function hasEncodingLoss(e,t){return"complex64"!==t&&("float32"!==t||"complex64"===e)&&("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)}function bytesPerElement(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw Error(`Unknown dtype ${e}`)}function bytesFromStringArray(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function isString(e){return"string"==typeof e||e instanceof String}function isBoolean(e){return"boolean"==typeof e}function isNumber(e){return"number"==typeof e}function inferDtype(e){if(Array.isArray(e))return inferDtype(e[0]);if(e instanceof Float32Array);else if(e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray)return"int32";else if(isNumber(e));else if(isString(e))return"string";else if(isBoolean(e))return"bool";return"float32"}function isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}function nearestDivisor(e,t){for(let r=t;r<e;++r)if(e%r==0)return r;return e}function computeStrides(e){let t=e.length;if(t<2)return[];let r=Array(t-1);r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}function toNestedArray(e,t,r=!1){if(0===e.length)return t[0];let n=e.reduce((e,t)=>e*t)*(r?2:1);if(0===n)return[];if(n!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${r?" for a complex tensor":""}.`);return function createNestedArray(e,t,r,n=!1){let a=[];if(1===t.length){let i=t[0]*(n?2:1);for(let t=0;t<i;t++)a[t]=r[e+t]}else{let i=t[0],o=t.slice(1),s=o.reduce((e,t)=>e*t)*(n?2:1);for(let t=0;t<i;t++)a[t]=createNestedArray(e+t*s,o,r,n)}return a}(0,e,t,r)}function convertBackendValuesAndArrayBuffer(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function makeOnesTypedArray(e,t){let r=makeZerosTypedArray(e,t);for(let e=0;e<r.length;e++)r[e]=1;return r}function makeZerosTypedArray(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function makeZerosNestedTypedArray(e,t){let r=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return toNestedArray(e,new Float32Array(r));if("int32"===t)return toNestedArray(e,new Int32Array(r));if("bool"===t)return toNestedArray(e,new Uint8Array(r));throw Error(`Unknown data type ${t}`)}function assertNonNegativeIntegerDimensions(e){e.forEach(t=>{util_base_assert(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function locToIndex(e,t,r){if(0===t)return 0;if(1===t)return e[0];let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=r[t]*e[t];return n}function indexToLoc(e,t,r){if(0===t)return[];if(1===t)return[e];let n=Array(t);for(let t=0;t<n.length-1;++t)n[t]=Math.floor(e/r[t]),e-=n[t]*r[t];return n[n.length-1]=e,n}function isPromise(e){return e&&e.then&&"function"==typeof e.then}/**
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
 */let N="tfjsflags";let Environment=class Environment{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=getQueryParams,this.populateURLFlags()}setPlatform(e,t){null==this.platform||F.getBool("IS_TEST")||F.getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`),this.platformName=e,this.platform=t}registerFlag(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},null!=this.urlFlags[e]){let t=this.urlFlags[e];F.getBool("IS_TEST")||F.getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(isPromise(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;let e=this.getQueryParams(this.global.location.search);if(N in e){let t=e[N].split(",");t.forEach(e=>{let[t,r]=e.split(":");this.urlFlags[t]=function(e,t){let r=t.toLowerCase();return"true"===r||"false"===r?"true"===r:`${+r}`===r?+r:t}(0,r)})}}};function getQueryParams(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...r)=>{var n,a;return n=r[0],a=r[1],t[decodeURIComponent(n)]=decodeURIComponent(a||""),r.join("=")}),t}function environment_env(){return F}let F=null;var D=r(28070);function getGlobalNamespace(){if(null==n){let e;if("undefined"!=typeof window)e=window;else if(void 0!==r.g)e=r.g;else if(void 0!==D)e=D;else if("undefined"!=typeof self)e=self;else throw Error("Could not find a global object");n=e}return n}function getGlobal(e,t){let r=function(){let e=getGlobalNamespace();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(r.has(e))return r.get(e);{let n=t();return r.set(e,n),r.get(e)}}let B="Abs",M="Acos",L="Acosh",U="Add",W="AddN",z="All",Z="Any",j="ArgMax",K="ArgMin",X="Asin",q="Asinh",Y="Atan",Q="Atanh",J="Atan2",ee="AvgPool",et="AvgPoolGrad",er="AvgPool3D",en="AvgPool3DGrad",ea="BatchMatMul",ei="BatchToSpaceND",eo="Bincount",es="BitwiseAnd",el="BroadcastArgs",eu="Cast",ec="Ceil",ed="ClipByValue",eh="Complex",ef="ComplexAbs",ep="Concat",em="Conv2D",eg="Conv2DBackpropFilter",ey="Conv2DBackpropInput",ex="Conv3D",eb="Conv3DBackpropFilterV2",ev="Conv3DBackpropInputV2",eI="Cos",eC="Cosh",ew="Cumprod",e_="Cumsum",eS="CropAndResize",eT="DenseBincount",ek="DepthToSpace",eE="DepthwiseConv2dNative",eR="DepthwiseConv2dNativeBackpropFilter",e$="DepthwiseConv2dNativeBackpropInput",eA="Diag",eN="Dilation2D",eO="Dilation2DBackpropInput",eF="Dilation2DBackpropFilter",eP="Draw",eD="RealDiv",eB="Einsum",eM="Elu",eL="EluGrad",eU="Erf",eV="Equal",eW="Exp",ez="ExpandDims",eG="Expm1",eZ="FFT",ej="Fill",eK="FlipLeftRight",eH="Floor",eX="FloorDiv",eq="FusedBatchNorm",eY="GatherV2",eQ="GatherNd",eJ="Greater",e0="GreaterEqual",e1="Identity",e2="IFFT",e3="Imag",e4="IsFinite",e5="IsInf",e6="IsNan",e8="LeakyRelu",e7="Less",e9="LessEqual",te="LinSpace",tt="Log",tr="Log1p",tn="LogicalAnd",ta="LogicalNot",ti="LogicalOr",to="LRN",ts="LRNGrad",tl="Max",tu="Maximum",tc="MaxPool",td="MaxPoolGrad",th="MaxPool3D",tf="MaxPool3DGrad",tp="MaxPoolWithArgmax",tm="Mean",tg="Min",ty="Minimum",tx="MirrorPad",tb="Mod",tv="Multinomial",tI="Multiply",tC="Neg",tw="NotEqual",t_="NonMaxSuppressionV3",tS="NonMaxSuppressionV4",tT="NonMaxSuppressionV5",tk="OnesLike",tE="OneHot",tR="Pack",t$="PadV2",tA="Pow",tN="Prelu",tO="Prod",tF="RaggedGather",tP="RaggedRange",tD="RaggedTensorToTensor",tB="Range",tM="Real",tL="Reciprocal",tU="Relu",tV="Reshape",tW="ResizeNearestNeighbor",tz="ResizeNearestNeighborGrad",tG="ResizeBilinear",tZ="ResizeBilinearGrad",tj="Relu6",tK="Reverse",tH="Round",tX="Rsqrt",tq="ScatterNd",tY="TensorScatterUpdate",tQ="SearchSorted",tJ="Select",t0="Selu",t1="Slice",t2="Sin",t3="Sinh",t4="Sign",t5="Sigmoid",t6="Softplus",t8="Sqrt",t7="Sum",t9="SpaceToBatchND",re="SplitV",rt="Softmax",rr="SparseFillEmptyRows",rn="SparseReshape",ra="SparseSegmentMean",ri="SparseSegmentSum",ro="SparseToDense",rs="SquaredDifference",rl="Square",ru="StaticRegexReplace",rc="StridedSlice",rd="StringNGrams",rh="StringSplit",rf="StringToHashBucketFast",rp="Sub",rm="Tan",rg="Tanh",ry="Tile",rx="TopK",rb="Transform",rv="Transpose",rI="Unique",rC="Unpack",rw="UnsortedSegmentSum",r_="ZerosLike",rS="Step",rT="FromPixels",rk="RotateWithOffset",rE="_FusedMatMul",rR="FusedConv2D",r$="FusedDepthwiseConv2D";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function warn(...e){F.getBool("IS_TEST")||F.getBool("PROD")||console.warn(...e)}function log_log(...e){F.getBool("IS_TEST")||F.getBool("PROD")||console.log(...e)}/**
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
 */let rA=getGlobal("kernelRegistry",()=>new Map),rN=getGlobal("gradRegistry",()=>new Map);function getKernel(e,t){let r=`${t}_${e}`;return rA.get(r)}function getKernelsForBackend(e){let t=rA.entries(),r=[];for(;;){let{done:n,value:a}=t.next();if(n)break;let[i,o]=a,[s]=i.split("_");s===e&&r.push(o)}return r}function registerKernel(e){let{kernelName:t,backendName:r}=e,n=`${r}_${t}`;rA.has(n)&&warn(`The kernel '${t}' for backend '${r}' is already registered`),rA.set(n,e)}/**
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
 */function isTypedArrayBrowser(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var rO=r(6017),rF=r.n(rO);/**
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
 */let rP=rF()||rO;function hexToLong(e){return rP.fromString(e,!0,16)}let rD=hexToLong("c3a5c85c97cb3127"),rB=hexToLong("b492b66fbe98f273"),rM=hexToLong("9ae16a3b2f90404f");function shiftMix(e){return e.xor(e.shru(47))}function hash_util_fetch(e,t,r){let n=e.slice(t,t+r);return rP.fromBytes(Array.from(n),!0,!0)}function fetch64(e,t){return hash_util_fetch(e,t,8)}function rotate64(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function hashLen16(e,t,r=hexToLong("9ddfea08eb382d69")){let n=e.xor(t).mul(r);n=n.xor(n.shru(47));let a=t.xor(n).mul(r);return(a=a.xor(a.shru(47))).mul(r)}function weakHashLen32WithSeedsStr(e,t,r,n){return function(e,t,r,n,a,i){a=a.add(e),i=rotate64(i.add(a).add(n),21);let o=a;return a=(a=a.add(t)).add(r),i=i.add(rotate64(a,44)),[a.add(n),i.add(o)]}(fetch64(e,t),fetch64(e,t+8),fetch64(e,t+16),fetch64(e,t+24),r,n)}function fingerPrint64(e,t=e.length){let r=rP.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t=e.length){if(t>=8){let r=rM.add(2*t),n=fetch64(e,0).add(rM),a=fetch64(e,t-8),i=rotate64(a,37).mul(r).add(n),o=rotate64(n,25).add(a).mul(r);return hashLen16(i,o,r)}if(t>=4){let r=rM.add(2*t),n=hash_util_fetch(e,0,4);return hashLen16(n.shl(3).add(t),hash_util_fetch(e,t-4,4),r)}if(t>0){let r=e[0],n=e[t>>1],a=e[t-1],i=t+(a<<2);return shiftMix(rM.mul(r+(n<<8)).xor(rD.mul(i))).mul(rM)}return rM}(e,t):function(e,t=e.length){let r=rM.add(2*t),n=fetch64(e,0).mul(rB),a=fetch64(e,8),i=fetch64(e,t-8).mul(r),o=fetch64(e,t-16).mul(rM);return hashLen16(rotate64(n.add(a),43).add(rotate64(i,30)).add(o),n.add(rotate64(a.add(rM),18)).add(i),r)}(e,t);if(t<=64)return function(e,t=e.length){let r=rM.add(2*t),n=fetch64(e,0).mul(rM),a=fetch64(e,8),i=fetch64(e,t-8).mul(r),o=fetch64(e,t-16).mul(rM),s=rotate64(n.add(a),43).add(rotate64(i,30)).add(o),l=hashLen16(s,n.add(rotate64(a.add(rM),18)).add(i),r),u=fetch64(e,16).mul(r),c=fetch64(e,24),d=s.add(fetch64(e,t-32)).mul(r),h=l.add(fetch64(e,t-24)).mul(r);return hashLen16(rotate64(u.add(c),43).add(rotate64(d,30)).add(h),u.add(rotate64(c.add(n),18)).add(d),r)}(e,t);let n=r,a=r.mul(rB).add(113),i=shiftMix(a.mul(rM).add(113)).mul(rM),o=[rP.UZERO,rP.UZERO],s=[rP.UZERO,rP.UZERO];n=n.mul(rM).add(fetch64(e,0));let l=0,u=(t-1>>6)*64,c=u+(t-1&63)-63;do n=rotate64(n.add(a).add(o[0]).add(fetch64(e,l+8)),37).mul(rB),a=rotate64(a.add(o[1]).add(fetch64(e,l+48)),42).mul(rB),n=n.xor(s[1]),a=a.add(o[0]).add(fetch64(e,l+40)),i=rotate64(i.add(s[0]),33).mul(rB),o=weakHashLen32WithSeedsStr(e,l,o[1].mul(rB),n.add(s[0])),s=weakHashLen32WithSeedsStr(e,l+32,i.add(s[1]),a.add(fetch64(e,l+16))),[i,n]=[n,i],l+=64;while(l!==u);let d=rB.add(i.and(255).shl(1));return l=c,s[0]=s[0].add(t-1&63),o[0]=o[0].add(s[0]),s[0]=s[0].add(o[0]),n=rotate64(n.add(a).add(o[0]).add(fetch64(e,l+8)),37).mul(d),a=rotate64(a.add(o[1]).add(fetch64(e,l+48)),42).mul(d),n=n.xor(s[1].mul(9)),a=a.add(o[0].mul(9).add(fetch64(e,l+40))),i=rotate64(i.add(s[0]),33).mul(d),o=weakHashLen32WithSeedsStr(e,l,o[1].mul(d),n.add(s[0])),s=weakHashLen32WithSeedsStr(e,l+32,i.add(s[1]),a.add(fetch64(e,l+16))),[i,n]=[n,i],hashLen16(hashLen16(o[0],s[0],d).add(shiftMix(a).mul(rD)).add(i),hashLen16(o[1],s[1],d).add(n),d)}/**
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
 */function createScalarValue(e,t){return"string"===t?encodeString(e):toTypedArray([e],t)}function toTypedArray(e,t){var r;if("string"===t)throw Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=flatten(e)),F.getBool("DEBUG")&&checkConversionForErrors(e,t),(r=e)instanceof Float32Array&&"float32"===t||r instanceof Int32Array&&"int32"===t||r instanceof Uint8Array&&"bool"===t)return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){let t=new Uint8Array(e.length);for(let r=0;r<t.length;++r)0!==Math.round(e[r])&&(t[r]=1);return t}throw Error(`Unknown data type ${t}`)}function now(){return F.platform.now()}function util_fetch(e,t){return F.platform.fetch(e,t)}function encodeString(e,t="utf-8"){return t=t||"utf-8",F.platform.encode(e,t)}function decodeString(e,t="utf-8"){return t=t||"utf-8",F.platform.decode(e,t)}function isTypedArray(e){return null!=F.platform.isTypedArray?F.platform.isTypedArray(e):isTypedArrayBrowser(e)}function flatten(e,t=[],r=!1){if(null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||isPromise(e)||null==e||isTypedArray(e)&&r)t.push(e);else if(Array.isArray(e)||isTypedArray(e))for(let n=0;n<e.length;++n)flatten(e[n],t,r);else{let n=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(n=Math.max(n,Number(t)));for(let a=0;a<=n;a++)flatten(e[a],t,r)}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Profiler=class Profiler{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new Logger)}profileKernel(e,t,r){let n,a;let holdResultWrapperFn=()=>{n=r()},i=now();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(holdResultWrapperFn);else{for(let e of(holdResultWrapperFn(),n))e.dataSync();a=Promise.resolve({kernelMs:now()-i})}if(F.getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let t=0;t<n.length;t++){let r=n[t];r.data().then(t=>{!function(e,t,r){if("float32"===t)for(let t=0;t<e.length;t++){let n=e[t];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${r}'`),!0}}(t,r.dtype,e)})}let o={kernelName:e,outputs:n,inputs:t,timeMs:a.then(e=>e.kernelMs),extraInfo:a.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")};return o}logKernelProfile(e){let{kernelName:t,outputs:r,timeMs:n,inputs:a,extraInfo:i}=e;r.forEach(e=>{Promise.all([e.data(),n,i]).then(r=>{this.logger.logKernelProfile(t,e,r[0],r[1],a,r[2])})})}};let Logger=class Logger{logKernelProfile(e,t,r,n,a,i){let o="number"==typeof n?rightPad(`${n}ms`,9):n.error,s=rightPad(e,25),l=t.rank,u=t.size,c=rightPad(t.shape.toString(),14),d="";for(let e in a){let r=a[e];if(null!=r){let n=r.shape||t.shape,a=n.length;d+=`${e}: ${a}D ${a>0?n:""} `}}console.log(`%c${s}	%c${o}	%c${l}D ${c}	%c${u}	%c${d}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function valToString(e,t,r){return rightPad(Array.isArray(e)?`${parseFloat(e[0].toFixed(7))} + ${parseFloat(e[1].toFixed(7))}j`:isString(e)?`'${e}'`:"bool"===r?boolNumToString(e):parseFloat(e.toFixed(7)).toString(),t)}function boolNumToString(e){return 0===e?"false":"true"}function createComplexTuples(e){let t=[];for(let r=0;r<e.length;r+=2)t.push([e[r],e[r+1]]);return t}/**
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
 */let TensorBuffer=class TensorBuffer{constructor(e,t,r){if(this.dtype=t,this.shape=e.slice(),this.size=util_base_sizeFromShape(e),null!=r){let e=r.length;util_base_assert(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||getArrayFromDType(t,this.size),this.strides=computeStrides(e)}set(e,...t){0===t.length&&(t=[0]),util_base_assert(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let r=this.locToIndex(t);this.values[r]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(let r of e){if(r<0||r>=this.shape[t]){let t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw Error(t)}t++}let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=this.strides[t]*e[t];return this.values[r]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];let t=Array(this.shape.length);for(let r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return rL().makeTensor(this.values,this.shape,this.dtype)}};let rL=null,rU=null;let tensor_Tensor=class tensor_Tensor{constructor(e,t,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=util_base_sizeFromShape(e),this.strides=computeStrides(e),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let e=await this.data();return rU.buffer(this.shape,this.dtype,e)}bufferSync(){return rU.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return toNestedArray(this.shape,e,"complex64"===this.dtype)}arraySync(){return toNestedArray(this.shape,this.dataSync(),"complex64"===this.dtype)}async data(){this.throwIfDisposed();let e=rL().read(this.dataId);if("string"===this.dtype){let t=await e;try{return t.map(e=>decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),rL().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=rL().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>decodeString(e))}catch(e){throw Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();let e=await rL().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),rL().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error("Tensor is disposed.")}print(e=!1){return rU.print(this,e)}clone(){return this.throwIfDisposed(),rU.clone(this)}toString(e=!1){let t=this.dataSync();return function(e,t,r,n){let a=computeStrides(t),i=function(e,t,r,n){let a=util_base_sizeFromShape(t),i=n[n.length-1],o=Array(i).fill(0),s=t.length,l="complex64"===r?createComplexTuples(e):e;if(s>1)for(let e=0;e<a/i;e++){let t=e*i;for(let e=0;e<i;e++)o[e]=Math.max(o[e],valToString(l[t+e],0,r).length)}return o}(e,t,r,a),o=t.length,s=function subTensorToString(e,t,r,n,a,i=!0){let o="complex64"===r?2:1,s=t[0],l=t.length;if(0===l){if("complex64"===r){let t=createComplexTuples(e);return[valToString(t[0],0,r)]}return"bool"===r?[boolNumToString(e[0])]:[e[0].toString()]}if(1===l){if(s>20){let t=3*o,n=Array.from(e.slice(0,t)),i=Array.from(e.slice((s-3)*o,s*o));return"complex64"===r&&(n=createComplexTuples(n),i=createComplexTuples(i)),["["+n.map((e,t)=>valToString(e,a[t],r)).join(", ")+", ..., "+i.map((e,t)=>valToString(e,a[s-3+t],r)).join(", ")+"]"]}let t="complex64"===r?createComplexTuples(e):Array.from(e);return["["+t.map((e,t)=>valToString(e,a[t],r)).join(", ")+"]"]}let u=t.slice(1),c=n.slice(1),d=n[0]*o,h=[];if(s>20){for(let t=0;t<3;t++){let n=t*d,i=n+d;h.push(...subTensorToString(e.slice(n,i),u,r,c,a,!1))}h.push("...");for(let t=s-3;t<s;t++){let n=t*d,i=n+d;h.push(...subTensorToString(e.slice(n,i),u,r,c,a,t===s-1))}}else for(let t=0;t<s;t++){let n=t*d,i=n+d;h.push(...subTensorToString(e.slice(n,i),u,r,c,a,t===s-1))}let f=2===l?",":"";h[0]="["+(s>0?h[0]+f:"");for(let e=1;e<h.length-1;e++)h[e]=" "+h[e]+f;let p=",\n";for(let e=2;e<l;e++)p+="\n";return h[h.length-1]=" "+h[h.length-1]+"]"+(i?"":p),h}(e,t,r,a,i),l=["Tensor"];return n&&(l.push(`  dtype: ${r}`),l.push(`  rank: ${o}`),l.push(`  shape: [${t}]`),l.push("  values:")),l.push(s.map(e=>"    "+e).join("\n")),l.join("\n")}(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),rU.cast(this,e)}variable(e=!0,t,r){return this.throwIfDisposed(),rL().makeVariable(this,e,t,r)}};function getGlobalTensorClass(){return getGlobal("Tensor",()=>tensor_Tensor)}Object.defineProperty(tensor_Tensor,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}),getGlobalTensorClass();let Variable=class Variable extends tensor_Tensor{constructor(e,t,r,n){super(e.shape,e.dtype,e.dataId,n),this.trainable=t,this.name=r}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!arraysEqual(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);rL().disposeTensor(this),this.dataId=e.dataId,rL().incRef(this,null)}dispose(){rL().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(Variable,Symbol.hasInstance,{value:e=>e instanceof tensor_Tensor&&null!=e.assign&&e.assign instanceof Function}),(o=f||(f={})).R0="R0",o.R1="R1",o.R2="R2",o.R3="R3",o.R4="R4",o.R5="R5",o.R6="R6",(s=p||(p={})).float32="float32",s.int32="int32",s.bool="int32",s.complex64="complex64",(l=m||(m={})).float32="float32",l.int32="int32",l.bool="bool",l.complex64="complex64",(u=g||(g={})).float32="float32",u.int32="float32",u.bool="float32",u.complex64="complex64",(c=y||(y={})).float32="complex64",c.int32="complex64",c.bool="complex64",c.complex64="complex64";let rV={float32:g,int32:p,bool:m,complex64:y};function upcastType(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw Error(`Can not upcast ${e} with ${t}`)}return rV[e][t]}function sumOutType(e){return upcastType(e,"int32")}function isWebGLData(e){return null!=e&&"object"==typeof e&&"texture"in e&&e.texture instanceof WebGLTexture}function isWebGPUData(e){return"undefined"!=typeof GPUBuffer&&null!=e&&"object"==typeof e&&"buffer"in e&&e.buffer instanceof GPUBuffer}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function makeTypesMatch(e,t){if(e.dtype===t.dtype)return[e,t];let r=upcastType(e.dtype,t.dtype);return[e.cast(r),t.cast(r)]}function getTensorsInContainer(e){let t=[],r=new Set;return function walkTensorContainer(e,t,r){if(null!=e){if(e instanceof tensor_Tensor){t.push(e);return}if(Array.isArray(e)||"object"==typeof e)for(let n in e){let a=e[n];r.has(a)||(r.add(a),walkTensorContainer(a,t,r))}}}(e,t,r),t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function isRegisteredKernelInvocation(e){return null!=e.kernelName}let EngineState=class EngineState{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}};let Engine=class Engine{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new EngineState}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t],n=await this.initializeBackend(r).success;if(n){await this.setBackend(r);return}}throw Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(!(e in this.registryFactory))return null;{let{asyncInit:t}=this.initializeBackend(e);if(t)return null}}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,r=1){return e in this.registryFactory?(warn(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:r},!0)}async setBackend(e){if(null==this.registryFactory[e])throw Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;let{success:t,asyncInit:r}=this.initializeBackend(e),n=r?await t:t;if(!n)return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Profiler(this.backendInstance),!0}setupRegisteredKernels(){let e=getKernelsForBackend(this.backendName);e.forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){let t=getKernelsForBackend(e);t.forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(null==t)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let r=t.factory();if(!r||r instanceof KernelBackend||"function"!=typeof r.then)return this.registry[e]=r,{success:!0,asyncInit:!1};{let t=++this.pendingBackendInitId,n=r.then(r=>!(t<this.pendingBackendInitId)&&(this.registry[e]=r,this.pendingBackendInit=null,!0)).catch(r=>!(t<this.pendingBackendInitId)&&(this.pendingBackendInit=null,warn(`Initialization of backend ${e} failed`),warn(r.stack||r.message),!1));return this.pendingBackendInit=n,{success:n,asyncInit:!0}}}catch(t){return warn(`Initialization of backend ${e} failed`),warn(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t],{success:n,asyncInit:a}=this.initializeBackend(r);if(a||n)return{name:r,asyncInit:a}}throw Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){let r=this.state.tensorInfo.get(t),n=r.backend,a=this.readSync(t),i=n.refCount(t);n.disposeData(t,!0),r.backend=e,e.move(t,a,r.shape,r.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let r,n=null;if(null==t){if("function"!=typeof e)throw Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw Error("When calling with two arguments, the 2nd argument to tidy() must be a function");n=e}return this.scopedRun(()=>this.startScope(n),()=>this.endScope(r),()=>((r=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r))}scopedRun(e,t,r){e();try{let e=r();return t(),e}catch(e){throw t(),e}}nextTensorId(){return Engine.nextTensorId++}nextVariableId(){return Engine.nextVariableId++}clone(e){let t=rW.runKernel(e1,{x:e});return this.addTapeNode(this.state.activeScope.name,{x:e},[t],e=>({x:()=>rW.runKernel(eu,{x:e},{dtype:"float32"})}),[],{}),t}runKernel(e,t,r){null==this.backendName&&this.backend;let n=null!=getKernel(e,this.backendName);if(!n)throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,r){let n=this.backend.numDataIds(),a=0;r.forEach(e=>{a+="complex64"===e.dtype?3:1});let i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=n-t-a-i;if(o>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,r,n,a;let i=[],o=this.isTapeOn(),s=this.state.numBytes,l=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;let u=isRegisteredKernelInvocation(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(isRegisteredKernelInvocation(e)){let{kernelName:t,inputs:a,attrs:s}=e;null==this.backendName&&this.backend;let l=getKernel(t,this.backendName);util_base_assert(null!=l,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),r=()=>{let e=this.backend.numDataIds();n=l.kernelFunc({inputs:a,attrs:s,backend:this.backend});let r=Array.isArray(n)?n:[n];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,r);let u=r.map(e=>null!=e.rank?e:this.makeTensorFromTensorInfo(e));if(o){let e=this.getTensorsForGradient(t,a,u);i=this.saveTensorsForBackwardMode(e)}return u}}else{let{forwardFunc:t}=e,saveFunc=e=>{o&&(i=e.map(e=>this.keep(this.clone(e))))};r=()=>{let e=this.backend.numDataIds();n=this.tidy(()=>t(this.backend,saveFunc));let r=Array.isArray(n)?n:[n];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(u,e,r),r}}let{inputs:c,attrs:d}=e,h=isRegisteredKernelInvocation(e)?null:e.backwardsFunc;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(a=this.profiler.profileKernel(u,c,()=>r()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(a),t=a.outputs):t=r()}),o&&this.addTapeNode(u,c,t,h,i,d),this.state.profiling&&this.state.activeProfile.kernels.push({name:u,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-l,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(c).map(e=>null!=c[e]?c[e].shape:null),outputShapes:t.map(e=>e.shape),kernelTimeMs:a.timeMs,extraInfo:a.extraInfo}),Array.isArray(n)?t:t[0]}saveTensorsForBackwardMode(e){let t=e.map(e=>this.keep(this.clone(e)));return t}getTensorsForGradient(e,t,r){let n=rN.get(e);if(null!=n){let e;let a=n.inputsToSave||[],i=n.outputsToSave||[];n.saveAllInputs?(util_base_assert(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),e=Object.keys(t).map(e=>t[e])):e=a.map(e=>t[e]);let o=r.filter((e,t)=>i[t]);return e.concat(o)}return[]}makeTensor(e,t,r,n){if(null==e)throw Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;let a=e;"string"===r&&isString(e[0])&&(a=e.map(e=>encodeString(e)));let i=n.write(a,t,r),o=new tensor_Tensor(t,r,i,this.nextTensorId());if(this.trackTensor(o,n),"string"===r){let e=this.state.tensorInfo.get(i),t=bytesFromStringArray(a);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,r,n){r=r||"float32";let a={dataId:e,shape:t,dtype:r};return this.makeTensorFromTensorInfo(a,n)}makeTensorFromTensorInfo(e,t){let{dataId:r,shape:n,dtype:a}=e,i=new tensor_Tensor(n,a,r,this.nextTensorId());return this.trackTensor(i,t),i}makeVariable(e,t=!0,r,n){r=r||this.nextVariableId().toString(),null!=n&&n!==e.dtype&&(e=e.cast(n));let a=new Variable(e,t,r,this.nextTensorId());if(null!=this.state.registeredVariables[a.name])throw Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;let r=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(r=e.size*bytesPerElement(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof Variable||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){let t=e.size*bytesPerElement(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,r=this.state.numTensors;for(let n of(this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r,this.state.activeProfile.kernels))n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,r,n,a,i){let o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:a},s=rN.get(e);null!=s&&(n=s.gradFunc),null!=n&&(o.gradient=e=>n((e=e.map((e,t)=>{if(null==e){let e=r[t],n=makeZerosTypedArray(e.size,e.dtype);return this.makeTensor(n,e.shape,e.dtype)}return e})).length>1?e:e[0],a,i)),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=getTensorsInContainer(e),r=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];t.kept||r.has(t.id)||t.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==n.id||this.track(e)})}gradients(e,t,r,n=!1){if(util_base_assert(t.length>0,()=>"gradients() received an empty list of xs."),null!=r&&"float32"!==r.dtype)throw Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);let a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));util_base_assert(a instanceof tensor_Tensor,()=>"The result y returned by f() must be a tensor.");let i=/**
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
 */function(e,t,r){let n={},a={};for(let e=0;e<t.length;e++)n[t[e].id]=!0;for(let r=0;r<e.length;r++){let i=e[r],o=i.inputs;for(let e in o){let r=o[e],s=!1;for(let e=0;e<t.length;e++)if(n[r.id]){i.outputs.forEach(e=>n[e.id]=!0),s=!0,a[i.id]=!0;break}if(s)break}}let i={};i[r.id]=!0;let o={};for(let t=e.length-1;t>=0;t--){let r=e[t],n=r.inputs;for(let e=0;e<r.outputs.length;e++)if(i[r.outputs[e].id]){for(let e in n)i[n[e].id]=!0,o[r.id]=!0;break}}let s=[];for(let t=0;t<e.length;t++){let r=e[t];if(a[r.id]&&o[r.id]){let e={};for(let t in r.inputs){let a=r.inputs[t];n[a.id]&&(e[t]=a)}let t=Object.assign({},r);t.inputs=e,t.outputs=r.outputs,s.push(t)}}return s}(this.state.activeTape,t,a);if(!n&&0===i.length&&t.length>0)throw Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let e={};e[a.id]=null==r?function(e){let t=makeOnesTypedArray(util_base_sizeFromShape(e),"float32");return rW.makeTensor(t,e,"float32")}(a.shape):r,function(e,t,r,n){for(let a=t.length-1;a>=0;a--){let i=t[a],o=[];if(i.outputs.forEach(t=>{let r=e[t.id];null!=r?o.push(r):o.push(null)}),null==i.gradient)throw Error(`Cannot compute gradient: gradient function not found for ${i.kernelName}.`);let s=i.gradient(o);for(let t in i.inputs){if(!(t in s))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(s)}.`);let a=r(()=>s[t]());if("float32"!==a.dtype)throw Error(`Error in gradient for op ${i.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${a.dtype}'`);let o=i.inputs[t];if(!arraysEqual(a.shape,o.shape))throw Error(`Error in gradient for op ${i.kernelName}. The gradient of input '${t}' has shape '${a.shape}', which does not match the shape of the input '${o.shape}'`);if(null==e[o.id])e[o.id]=a;else{let t=e[o.id];e[o.id]=n(t,a),t.dispose()}}}}(e,i,e=>this.tidy(e),add);let n=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:a,grads:n}})}customGrad(e){return util_base_assert(isFunction(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let r;util_base_assert(t.every(e=>e instanceof tensor_Tensor),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let n={};return t.forEach((e,t)=>{n[t]=e}),this.runKernelFunc({forwardFunc:(n,a)=>(util_base_assert((r=e(...[...t,a])).value instanceof tensor_Tensor,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),util_base_assert(isFunction(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),backwardsFunc:(e,n)=>{let a=r.gradFunc(e,n),i=Array.isArray(a)?a:[a];util_base_assert(i.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),util_base_assert(i.every(e=>e instanceof tensor_Tensor),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let o={};return i.forEach((e,t)=>{o[t]=()=>e}),o},inputs:n})}}readSync(e){let t=this.state.tensorInfo.get(e);return t.backend.readSync(e)}read(e){let t=this.state.tensorInfo.get(e);return t.backend.read(e)}readToGPU(e,t){let r=this.state.tensorInfo.get(e);return r.backend.readToGPU(e,t)}async time(e){let t=now(),r=await this.backend.time(e);return r.wallMs=now()-t,r}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){for(let e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new EngineState,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};function getOrMakeEngine(){let e=getGlobalNamespace();if(null==e._tfengine){let t=new Environment(e);e._tfengine=new Engine(t)}return F=e._tfengine.ENV,rL=()=>e._tfengine,e._tfengine}Engine.nextTensorId=0,Engine.nextVariableId=0;let rW=getOrMakeEngine();function add(e,t){return rW.runKernel(U,{a:e,b:t})}function mockIsMobile(e){a=e}function isMobile(e){if(void 0!==a)return a;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;let t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){let t=e;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function isBrowser(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}var rz=r(28070);/**
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
 */let rG=F;rG.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),rG.registerFlag("IS_BROWSER",()=>isBrowser()),rG.registerFlag("IS_NODE",()=>void 0!==rz&&void 0!==rz.versions&&void 0!==rz.versions.node),rG.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),rG.registerFlag("IS_SAFARI",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),rG.registerFlag("PROD",()=>!1),rG.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>rG.getBool("DEBUG")),rG.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),rG.registerFlag("IS_TEST",()=>!1),rG.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>rG.getBool("DEBUG")),rG.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),rG.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),rG.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);let composite_array_buffer_CompositeArrayBuffer=class composite_array_buffer_CompositeArrayBuffer{static join(e){return new composite_array_buffer_CompositeArrayBuffer(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,null==e||(e instanceof Array||(e=[e]),0===(e=e.map(e=>isTypedArray(e)?e.buffer:e)).length))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let r=0;r<e.length;r++){let n=e[r];r!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let a=t+n.byteLength;this.shards.push({buffer:n,start:t,end:a}),t=a}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(0===this.shards.length||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e))return new ArrayBuffer(0);let r=this.findShardForByte(e);if(-1===r)throw Error(`Could not find start shard for byte ${e}`);let n=t-e,a=new ArrayBuffer(n),i=new Uint8Array(a),o=0;for(let n=r;n<this.shards.length;n++){let r=this.shards[n],a=e+o,s=a-r.start,l=o,u=Math.min(t,r.end),c=u-r.start,d=new Uint8Array(r.buffer,s,c-s);if(i.set(d,l),o+=d.length,t<r.end)break}return a}findShardForByte(e){if(0===this.shards.length||e<0||e>=this.byteLength)return -1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function check(t){return e<t.start?-1:e>=t.end?1:0}if(0===check(this.shards[this.previousShardIndex]))return this.previousShardIndex;let t=function(e,t){let r=0,n=e.length;for(;r<=n;){let a=Math.floor((n-r)/2)+r,i=t(e[a]);if(0===i)return a;i<0?n=a:r=a+1}return -1}(this.shards,check);return -1===t?-1:(this.previousShardIndex=t,this.previousShardIndex)}};var rZ=r(61900).lW;let rj=void 0!==rZ&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function stringByteLength(e){return rj?rZ.byteLength(e,"utf8"):new Blob([e]).size}function getModelJSONForModelArtifacts(e,t){let r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),r}async function io_utils_getModelArtifactsForJSON(e,t){let r,n;return null!=e.weightsManifest&&([r,n]=await t(e.weightsManifest)),function(e,t,r){let n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw Error("modelJSON has weightsManifest but weightSpecs is null");if(!r)throw Error("modelJSON has weightsManifest but weightData is null");n.weightSpecs=t,n.weightData=r}return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),n}(e,r,n)}function getModelArtifactsInfoForJSON(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:stringByteLength(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:stringByteLength(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new composite_array_buffer_CompositeArrayBuffer(e.weightData).byteLength}}function getWeightSpecs(e){let t=[];for(let r of e)t.push(...r.weights);return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let router_registry_IORouterRegistry=class router_registry_IORouterRegistry{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==router_registry_IORouterRegistry.instance&&(router_registry_IORouterRegistry.instance=new router_registry_IORouterRegistry),router_registry_IORouterRegistry.instance}static registerSaveRouter(e){router_registry_IORouterRegistry.getInstance().saveRouters.push(e)}static registerLoadRouter(e){router_registry_IORouterRegistry.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return router_registry_IORouterRegistry.getHandlers(e,"save")}static getLoadHandlers(e,t){return router_registry_IORouterRegistry.getHandlers(e,"load",t)}static getHandlers(e,t,r){let n=[],a="load"===t?router_registry_IORouterRegistry.getInstance().loadRouters:router_registry_IORouterRegistry.getInstance().saveRouters;return a.forEach(t=>{let a=t(e,r);null!==a&&n.push(a)}),n}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let rK="tensorflowjs",rH="models_store",rX="model_info_store";function getIndexedDBFactory(){if(!F.getBool("IS_BROWSER"))throw Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw Error("The current browser does not appear to support IndexedDB.");return t}function setUpDatabase(e){let t=e.result;t.createObjectStore(rH,{keyPath:"modelPath"}),t.createObjectStore(rX,{keyPath:"modelPath"})}let BrowserIndexedDB=class BrowserIndexedDB{constructor(e){if(this.indexedDB=getIndexedDBFactory(),null==e||!e)throw Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,r)=>{let n=this.indexedDB.open(rK,1);n.onupgradeneeded=()=>setUpDatabase(n),n.onsuccess=()=>{let a=n.result;if(null==t){let t=a.transaction(rH,"readonly"),n=t.objectStore(rH),i=n.get(this.modelPath);i.onsuccess=()=>{if(null==i.result)return a.close(),r(Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(i.result.modelArtifacts)},i.onerror=e=>(a.close(),r(i.error)),t.oncomplete=()=>a.close()}else{let n,i;t.weightData=composite_array_buffer_CompositeArrayBuffer.join(t.weightData);let o=getModelArtifactsInfoForJSON(t),s=a.transaction(rX,"readwrite"),l=s.objectStore(rX);try{n=l.put({modelPath:this.modelPath,modelArtifactsInfo:o})}catch(e){return r(e)}n.onsuccess=()=>{let n;i=a.transaction(rH,"readwrite");let u=i.objectStore(rH);try{n=u.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:o})}catch(e){return r(e)}n.onsuccess=()=>e({modelArtifactsInfo:o}),n.onerror=e=>{l=s.objectStore(rX);let t=l.delete(this.modelPath);t.onsuccess=()=>(a.close(),r(n.error)),t.onerror=e=>(a.close(),r(n.error))}},n.onerror=e=>(a.close(),r(n.error)),s.oncomplete=()=>{null==i?a.close():i.oncomplete=()=>a.close()}}},n.onerror=e=>r(n.error)})}};BrowserIndexedDB.URL_SCHEME="indexeddb://";let indexedDBRouter=e=>{var t;return F.getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserIndexedDB.URL_SCHEME)?(t=e.slice(BrowserIndexedDB.URL_SCHEME.length),new BrowserIndexedDB(t)):null};router_registry_IORouterRegistry.registerSaveRouter(indexedDBRouter),router_registry_IORouterRegistry.registerLoadRouter(indexedDBRouter);let rq="tensorflowjs_models",rY="info";function getModelKeys(e){return{info:[rq,e,rY].join("/"),topology:[rq,e,"model_topology"].join("/"),weightSpecs:[rq,e,"weight_specs"].join("/"),weightData:[rq,e,"weight_data"].join("/"),modelMetadata:[rq,e,"model_metadata"].join("/")}}function removeItems(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}let BrowserLocalStorage=class BrowserLocalStorage{constructor(e){if(!F.getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=getModelKeys(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),n=getModelArtifactsInfoForJSON(e),a=composite_array_buffer_CompositeArrayBuffer.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,function(e){if(rj)return rZ.from(e).toString("base64");let t=new Uint8Array(e),r="";for(let e=0,n=t.length;e<n;e++)r+=String.fromCharCode(t[e]);return btoa(r)}(a));let i={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(i)),{modelArtifactsInfo:n}}catch(e){throw removeItems(this.keys),Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let t={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(null==r)throw Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=r;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==n)throw Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=n;let a=this.LS.getItem(this.keys.modelMetadata);if(null!=a){let e=JSON.parse(a);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,null!=e.signature&&(t.signature=e.signature),null!=e.userDefinedMetadata&&(t.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(t.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(t.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(t.trainingConfig=e.trainingConfig)}let i=this.LS.getItem(this.keys.weightData);if(null==i)throw Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=function(e){if(rj){let t=rZ.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;++e)r.set([t.charCodeAt(e)],e);return r.buffer}(i),t}};BrowserLocalStorage.URL_SCHEME="localstorage://";let localStorageRouter=e=>{var t;return F.getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserLocalStorage.URL_SCHEME)?(t=e.slice(BrowserLocalStorage.URL_SCHEME.length),new BrowserLocalStorage(t)):null};router_registry_IORouterRegistry.registerSaveRouter(localStorageRouter),router_registry_IORouterRegistry.registerLoadRouter(localStorageRouter);let ModelStoreManagerRegistry=class ModelStoreManagerRegistry{constructor(){this.managers={}}static getInstance(){return null==ModelStoreManagerRegistry.instance&&(ModelStoreManagerRegistry.instance=new ModelStoreManagerRegistry),ModelStoreManagerRegistry.instance}static registerManager(e,t){util_base_assert(null!=e,()=>"scheme must not be undefined or null."),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),util_base_assert(e.length>0,()=>"scheme must not be an empty string.");let r=ModelStoreManagerRegistry.getInstance();util_base_assert(null==r.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),r.managers[e]=t}static getManager(e){let t=ModelStoreManagerRegistry.getInstance().managers[e];if(null==t)throw Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(ModelStoreManagerRegistry.getInstance().managers)}};if(F.get("IS_BROWSER")){F.setPlatform("browser",new /**
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
 */class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if("undefined"==typeof window||!F.getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();let t=this.functionRefs[e.data.index];t(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return isTypedArrayBrowser(e)}});try{ModelStoreManagerRegistry.registerManager(BrowserLocalStorage.URL_SCHEME,new class{constructor(){util_base_assert(F.getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),util_base_assert("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let e={},t=rq+"/",r="/"+rY;for(let n=0;n<this.LS.length;++n){let a=this.LS.key(n);if(a.startsWith(t)&&a.endsWith(r)){let t=function(e){let t=e.split("/");if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join("/")}(a);e[t]=JSON.parse(this.LS.getItem(a))}}return e}async removeModel(e){var t;e=(t=e).startsWith(BrowserLocalStorage.URL_SCHEME)?t.slice(BrowserLocalStorage.URL_SCHEME.length):t;let r=getModelKeys(e);if(null==this.LS.getItem(r.info))throw Error(`Cannot find model at path '${e}'`);let n=JSON.parse(this.LS.getItem(r.info));return removeItems(r),n}})}catch(e){}try{ModelStoreManagerRegistry.registerManager(BrowserIndexedDB.URL_SCHEME,new class{constructor(){this.indexedDB=getIndexedDBFactory()}async listModels(){return new Promise((e,t)=>{let r=this.indexedDB.open(rK,1);r.onupgradeneeded=()=>setUpDatabase(r),r.onsuccess=()=>{let n=r.result,a=n.transaction(rX,"readonly"),i=a.objectStore(rX),o=i.getAll();o.onsuccess=()=>{let t={};for(let e of o.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},o.onerror=e=>(n.close(),t(o.error)),a.oncomplete=()=>n.close()},r.onerror=e=>t(r.error)})}async removeModel(e){var t;return e=(t=e).startsWith(BrowserIndexedDB.URL_SCHEME)?t.slice(BrowserIndexedDB.URL_SCHEME.length):t,new Promise((t,r)=>{let n=this.indexedDB.open(rK,1);n.onupgradeneeded=()=>setUpDatabase(n),n.onsuccess=()=>{let a;let i=n.result,o=i.transaction(rX,"readwrite"),s=o.objectStore(rX),l=s.get(e);l.onsuccess=()=>{if(null==l.result)return i.close(),r(Error(`Cannot find model with path '${e}' in IndexedDB.`));{let n=s.delete(e),deleteModelData=()=>{a=i.transaction(rH,"readwrite");let n=a.objectStore(rH),o=n.delete(e);o.onsuccess=()=>t(l.result.modelArtifactsInfo),o.onerror=e=>r(l.error)};n.onsuccess=deleteModelData,n.onerror=e=>(deleteModelData(),i.close(),r(l.error))}},l.onerror=e=>(i.close(),r(l.error)),o.oncomplete=()=>{null==a?i.close():a.oncomplete=()=>i.close()}},n.onerror=e=>r(n.error)})}})}catch(e){}}var rQ=r(28070);/**
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
 */let rJ={importFetch:()=>r(4112)};/**
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
 */function buffer(e,t="float32",r){return t=t||"float32",assertNonNegativeIntegerDimensions(e),new TensorBuffer(e,t,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function inferShape(e,t){let r=e;if(isTypedArray(e))return"string"===t?[]:[e.length];if(isWebGLData(e)){let t=e.channels||"RGBA";return[e.height,e.width*t.length]}if(isWebGPUData(e))return[e.buffer.size/(null==t?4:bytesPerElement(t))];if(!Array.isArray(e))return[];let n=[];for(;Array.isArray(r)||isTypedArray(r)&&"string"!==t;)n.push(r.length),r=r[0];return Array.isArray(e)&&F.getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function deepAssertShapeConsistency(e,t,r){if(r=r||[],!Array.isArray(e)&&!isTypedArray(e)){util_base_assert(0===t.length,()=>`Element arr[${r.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}util_base_assert(t.length>0,()=>`Element arr[${r.join("][")}] should be a primitive, but is an array of ${e.length} elements`),util_base_assert(e.length===t[0],()=>`Element arr[${r.join("][")}] should have ${t[0]} elements, but has ${e.length} elements`);let n=t.slice(1);for(let t=0;t<e.length;++t)deepAssertShapeConsistency(e[t],n,r.concat(t))}(e,n,[]),n}function assertDtype(e,t,r,n){if("string_or_numeric"!==e){if(null==e)throw Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw Error(`Argument '${r}' passed to '${n}' must be ${e} tensor, but got ${t} tensor`)}}function tensor_util_env_convertToTensor(e,t,r,n="numeric"){if(e instanceof getGlobalTensorClass())return assertDtype(n,e.dtype,t,r),e;let a=inferDtype(e);if("string"!==a&&["bool","int32","float32"].indexOf(n)>=0&&(a=n),assertDtype(n,a,t,r),null==e||!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){let n=null==e?"null":e.constructor.name;throw Error(`Argument '${t}' passed to '${r}' must be a Tensor or TensorLike, but got '${n}'`)}let i=inferShape(e,a);isTypedArray(e)||Array.isArray(e)||(e=[e]);let o="string"!==a?toTypedArray(e,a):flatten(e,[],!0);return rW.makeTensor(o,i,a)}function op(e){let t=Object.keys(e);if(1!==t.length)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let r=t[0],n=e[r];r.endsWith("_")&&(r=r.substring(0,r.length-1)),r+="__op";let f2=(...e)=>{rW.startScope(r);try{let t=n(...e);return isPromise(t)&&console.error("Cannot return a Promise inside of tidy."),rW.endScope(t),t}catch(e){throw rW.endScope(null),e}};return Object.defineProperty(f2,"name",{value:r,configurable:!0}),f2}F.get("IS_NODE")&&!F.get("IS_BROWSER")&&F.setPlatform("node",new class{constructor(){this.util=r(23062),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return null!=F.global.fetch?F.global.fetch(e,t):(null==i&&(i=rJ.importFetch()),i(e,t))}now(){let e=rQ.hrtime();return 1e3*e[0]+e[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}});let r0=op({cast_:/**
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
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"x","cast");if(!isValidDtype(t))throw Error(`Failed to cast to unknown dtype ${t}`);if("string"===t&&"string"!==r.dtype||"string"!==t&&"string"===r.dtype)throw Error("Only strings can be casted to strings");return rW.runKernel(eu,{x:r},{dtype:t})}}),r1=op({clone_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","clone","string_or_numeric");return rW.runKernel(e1,{x:t})}});function engine(){return rW}function tidy(e,t){return rW.tidy(e,t)}function dispose(e){let t=getTensorsInContainer(e);t.forEach(e=>e.dispose())}function setBackend(e){return rW.setBackend(e)}function ready(){return rW.ready()}function registerBackend(e,t,r=1){return rW.registerBackend(e,t,r)}/**
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
 */getOrMakeEngine(),rU={buffer:buffer,cast:r0,clone:r1,print:/**
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
 */function(e,t=!1){console.log(e.toString(t))}};let r2=op({add_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","add"),n=tensor_util_env_convertToTensor(t,"b","add");[r,n]=makeTypesMatch(r,n);let a={a:r,b:n};return rW.runKernel(U,a)}}),r3=op({floorDiv_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","floorDiv"),n=tensor_util_env_convertToTensor(t,"b","floorDiv");[r,n]=makeTypesMatch(r,n);let a={a:r,b:n};return rW.runKernel(eX,a)}}),r4=op({div_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","div"),n=tensor_util_env_convertToTensor(t,"b","div");if([r,n]=makeTypesMatch(r,n),"int32"===r.dtype&&"int32"===n.dtype)return r3(r,n);let a={a:r,b:n};return rW.runKernel(eD,a,{})}}),r5=op({mul_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","mul"),n=tensor_util_env_convertToTensor(t,"b","mul");[r,n]=makeTypesMatch(r,n);let a={a:r,b:n};return rW.runKernel(tI,a)}}),r6=op({sqrt_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","sqrt","float32");return rW.runKernel(t8,{x:t})}}),r8=op({square_:/**
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
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","square");return rW.runKernel("Square",{x:t},{})}}),r7=op({zerosLike_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","zerosLike");return rW.runKernel(r_,{x:t})}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function makeTensor(e,t,r,n){if(null==n)n=inferDtype(e);else if("complex64"===n)throw Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(isWebGPUData(e)||isWebGLData(e)){if("float32"!==n&&"int32"!==n)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${n}.`);return rW.backend.createTensorFromGPUData(e,t||r,n)}if(!isTypedArray(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){assertNonNegativeIntegerDimensions(t);let e=util_base_sizeFromShape(t),n=util_base_sizeFromShape(r);util_base_assert(e===n,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${n}`);for(let e=0;e<r.length;++e){let n=r[e],a=e!==r.length-1||n!==util_base_sizeFromShape(t.slice(e));util_base_assert(r[e]===t[e]||!a,()=>`Error creating a new Tensor. Inferred shape (${r}) does not match the provided shape (${t}). `)}}return isTypedArray(e)||Array.isArray(e)||(e=[e]),t=t||r,e="string"!==n?toTypedArray(e,n):flatten(e,[],!0),rW.makeTensor(e,t,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function scalar(e,t){if((isTypedArray(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&isTypedArray(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return makeTensor(e,[],[],t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let r9=new Map,ne=new Map;let Serializable=class Serializable{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}};let SerializationMap=class SerializationMap{constructor(){this.classNameMap={}}static getMap(){return null==SerializationMap.instance&&(SerializationMap.instance=new SerializationMap),SerializationMap.instance}static register(e){SerializationMap.getMap().classNameMap[e.className]=[e,e.fromConfig]}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Optimizer=class Optimizer extends Serializable{minimize(e,t=!1,r){let{value:n,grads:a}=this.computeGradients(e,r);if(null!=r){let e=r.map(e=>({name:e.name,tensor:a[e.name]}));this.applyGradients(e)}else this.applyGradients(a);return(dispose(a),t)?n:(n.dispose(),null)}get iterations(){return null==this.iterations_&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return function(e,t){util_base_assert(isFunction(e),()=>"The f passed in variableGrads(f) must be a function"),util_base_assert(null==t||Array.isArray(t)&&t.every(e=>e instanceof Variable),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let r=null!=t;if(!r)for(let e in t=[],rW.registeredVariables)t.push(rW.registeredVariables[e]);let n=r?t.filter(e=>!e.trainable):null,a=t.length;util_base_assert((t=t.filter(e=>e.trainable)).length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${a} variables is trainable.`);let{value:i,grads:o}=rW.gradients(e,t,null,!0);util_base_assert(o.some(e=>null!=e),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),util_base_assert(0===i.rank,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${i.rank} tensor`);let s={};return t.forEach((e,t)=>{null!=o[t]&&(s[e.name]=o[t])}),null!=n&&n.forEach(e=>s[e.name]=null),{value:i,grads:s}}(e,t)}dispose(){null!=this.iterations_&&dispose(this.iterations_)}async saveIterations(){return null==this.iterations_&&(this.iterations_=0),{name:"iter",tensor:scalar(this.iterations_,"int32")}}async getWeights(){throw Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fill(e,t,r){assertNonNegativeIntegerDimensions(e),r=r||inferDtype(t);let n={shape:e,value:t,dtype:r};return rW.runKernel(ej,{},n)}Object.defineProperty(Optimizer,Symbol.hasInstance,{value:e=>null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients});let nt=op({pow_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"base","pow"),n=tensor_util_env_convertToTensor(t,"exp","pow");[r,n]=makeTypesMatch(r,n);let a={a:r,b:n};return rW.runKernel(tA,a)}}),nr=op({sub_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","sub"),n=tensor_util_env_convertToTensor(t,"b","sub");[r,n]=makeTypesMatch(r,n);let a={a:r,b:n};return rW.runKernel(rp,a)}}),nn=op({abs_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","abs");return"complex64"===t.dtype?rW.runKernel(ef,{x:t}):rW.runKernel(B,{x:t})}});/**
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
 */function getBroadcastDims(e,t){let r=e.length,n=[];for(let a=0;a<r;a++){let i=r-1-a,o=e[i]||1,s=t[t.length-1-a]||1;s>1&&1===o&&n.unshift(i)}return n}function getReductionAxes(e,t){let r=[];for(let n=0;n<t.length;n++){let a=e[e.length-n-1],i=t.length-n-1,o=t[i];(null==a||1===a&&o>1)&&r.unshift(i)}return r}function assertAndGetBroadcastShape(e,t){let r=Math.max(e.length,t.length),n=Array(r);for(let a=0;a<r;a++){let i=e[e.length-a-1];null==i&&(i=1);let o=t[t.length-a-1];if(null==o&&(o=1),1===i)n[r-a-1]=o;else if(1===o)n[r-a-1]=i;else if(i!==o){let r=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(r)}else n[r-a-1]=i}return n}let na=op({maximum_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"a","maximum"),n=tensor_util_env_convertToTensor(t,"b","maximum");[r,n]=makeTypesMatch(r,n),"bool"===r.dtype&&(r=r0(r,"int32"),n=r0(n,"int32")),assertAndGetBroadcastShape(r.shape,n.shape);let a={a:r,b:n};return rW.runKernel(tu,a)}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let SGDOptimizer=class SGDOptimizer extends Optimizer{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,r)=>{let n=Array.isArray(e)?e[r].tensor:e[t];if(null==n)return;let a=rW.registeredVariables[t];tidy(()=>{let e=r2(r5(this.c,n),a);a.assign(e)})}),this.incrementIterations()}setLearningRate(e){var t;this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=(t=scalar(-e),rW.keep(t))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(0!==(e=await this.extractIterations(e)).length)throw Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}};/**
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
 */let ni=[/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends Optimizer{static get className(){return"Adadelta"}constructor(e,t,r=null){super(),this.learningRate=e,this.rho=t,this.epsilon=r,this.accumulatedGrads=[],this.accumulatedUpdates=[],null==r&&(this.epsilon=rW.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,r)=>{let n=rW.registeredVariables[t];null==this.accumulatedGrads[r]&&(this.accumulatedGrads[r]={originalName:`${t}/accum_grad`,variable:tidy(()=>r7(n).variable(!1))}),null==this.accumulatedUpdates[r]&&(this.accumulatedUpdates[r]={originalName:`${t}/accum_var`,variable:tidy(()=>r7(n).variable(!1))});let a=Array.isArray(e)?e[r].tensor:e[t];if(null==a)return;let i=this.accumulatedGrads[r].variable,o=this.accumulatedUpdates[r].variable;tidy(()=>{let e=r2(r5(i,this.rho),r5(r8(a),1-this.rho)),t=r5(r4(r6(r2(o,this.epsilon)),r6(r2(i,this.epsilon))),a),r=r2(r5(o,this.rho),r5(r8(t),1-this.rho));i.assign(e),o.assign(r);let s=r2(r5(t,-this.learningRate),n);n.assign(s)})}),this.incrementIterations()}dispose(){null!=this.accumulatedUpdates&&(dispose(this.accumulatedGrads.map(e=>e.variable)),dispose(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedUpdates=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}},/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends Optimizer{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,r)=>{let n=rW.registeredVariables[t];null==this.accumulatedGrads[r]&&(this.accumulatedGrads[r]={originalName:`${t}/accumulator`,variable:tidy(()=>fill(n.shape,this.initialAccumulatorValue).variable(!1))});let a=Array.isArray(e)?e[r].tensor:e[t];if(null==a)return;let i=this.accumulatedGrads[r].variable;tidy(()=>{let e=r2(i,r8(a));i.assign(e);let t=r2(r5(r4(a,r6(r2(e,rW.backend.epsilon()))),-this.learningRate),n);n.assign(t)})}),this.incrementIterations()}dispose(){null!=this.accumulatedGrads&&dispose(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}},/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends Optimizer{static get className(){return"Adam"}constructor(e,t,r,n=null){super(),this.learningRate=e,this.beta1=t,this.beta2=r,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],tidy(()=>{this.accBeta1=scalar(t).variable(),this.accBeta2=scalar(r).variable()}),null==n&&(this.epsilon=rW.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);tidy(()=>{let r=nr(1,this.accBeta1),n=nr(1,this.accBeta2);t.forEach((t,a)=>{let i=rW.registeredVariables[t];null==this.accumulatedFirstMoment[a]&&(this.accumulatedFirstMoment[a]={originalName:`${t}/m`,variable:tidy(()=>r7(i).variable(!1))}),null==this.accumulatedSecondMoment[a]&&(this.accumulatedSecondMoment[a]={originalName:`${t}/v`,variable:tidy(()=>r7(i).variable(!1))});let o=Array.isArray(e)?e[a].tensor:e[t];if(null==o)return;let s=this.accumulatedFirstMoment[a].variable,l=this.accumulatedSecondMoment[a].variable,u=r2(r5(s,this.beta1),r5(o,1-this.beta1)),c=r2(r5(l,this.beta2),r5(r8(o),1-this.beta2)),d=r4(u,r),h=r4(c,n);s.assign(u),l.assign(c);let f=r2(r5(r4(d,r2(r6(h),this.epsilon)),-this.learningRate),i);i.assign(f)}),this.accBeta1.assign(r5(this.accBeta1,this.beta1)),this.accBeta2.assign(r5(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedSecondMoment&&dispose(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),tidy(()=>{this.accBeta1.assign(nt(this.beta1,this.iterations_+1)),this.accBeta2.assign(nt(this.beta2,this.iterations_+1))});let t=e.length/2;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedSecondMoment=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}},/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends Optimizer{static get className(){return"Adamax"}constructor(e,t,r,n=null,a=0){super(),this.learningRate=e,this.beta1=t,this.beta2=r,this.epsilon=n,this.decay=a,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],tidy(()=>{this.iteration=scalar(0).variable(),this.accBeta1=scalar(t).variable()}),null==n&&(this.epsilon=rW.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);tidy(()=>{let r=nr(1,this.accBeta1),n=r4(-this.learningRate,r2(r5(this.iteration,this.decay),1));t.forEach((t,a)=>{let i=rW.registeredVariables[t];null==this.accumulatedFirstMoment[a]&&(this.accumulatedFirstMoment[a]={originalName:`${t}/m`,variable:r7(i).variable(!1)}),null==this.accumulatedWeightedInfNorm[a]&&(this.accumulatedWeightedInfNorm[a]={originalName:`${t}/v`,variable:r7(i).variable(!1)});let o=Array.isArray(e)?e[a].tensor:e[t];if(null==o)return;let s=this.accumulatedFirstMoment[a].variable,l=this.accumulatedWeightedInfNorm[a].variable,u=r2(r5(s,this.beta1),r5(o,1-this.beta1)),c=r5(l,this.beta2),d=nn(o),h=na(c,d);s.assign(u),l.assign(h);let f=r2(r5(r4(n,r),r4(u,r2(h,this.epsilon))),i);i.assign(f)}),this.iteration.assign(r2(this.iteration,1)),this.accBeta1.assign(r5(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&dispose(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedWeightedInfNorm&&dispose(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}},/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends SGDOptimizer{static get className(){return"Momentum"}constructor(e,t,r=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=r,this.accumulations=[],this.m=scalar(this.momentum)}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,r)=>{let n=rW.registeredVariables[t];null==this.accumulations[r]&&(this.accumulations[r]={originalName:`${t}/momentum`,variable:tidy(()=>r7(n).variable(!1))});let a=this.accumulations[r].variable,i=Array.isArray(e)?e[r].tensor:e[t];null!=i&&tidy(()=>{let e;let t=r2(r5(this.m,a),i);e=this.useNesterov?r2(r5(this.c,r2(i,r5(t,this.m))),n):r2(r5(this.c,t),n),a.assign(t),n.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),null!=this.accumulations&&dispose(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}},/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class extends Optimizer{static get className(){return"RMSProp"}constructor(e,t=.9,r=0,n=null,a=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=r,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=a,null==n&&(this.epsilon=rW.backend.epsilon()),null==e)throw Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);t.forEach((t,r)=>{let n=rW.registeredVariables[t];null==this.accumulatedMeanSquares[r]&&(this.accumulatedMeanSquares[r]={originalName:`${t}/rms`,variable:tidy(()=>r7(n).variable(!1))}),null==this.accumulatedMoments[r]&&(this.accumulatedMoments[r]={originalName:`${t}/momentum`,variable:tidy(()=>r7(n).variable(!1))}),null==this.accumulatedMeanGrads[r]&&this.centered&&(this.accumulatedMeanGrads[r]={originalName:`${t}/mg`,variable:tidy(()=>r7(n).variable(!1))});let a=Array.isArray(e)?e[r].tensor:e[t];if(null==a)return;let i=this.accumulatedMeanSquares[r].variable,o=this.accumulatedMoments[r].variable;tidy(()=>{let e=r2(r5(i,this.decay),r5(r8(a),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[r].variable,s=r2(r5(t,this.decay),r5(a,1-this.decay)),l=r4(r5(a,this.learningRate),r6(nr(e,r2(r8(s),this.epsilon)))),u=r2(r5(o,this.momentum),l);i.assign(e),t.assign(s),o.assign(u);let c=nr(n,u);n.assign(c)}else{let e=r2(r5(i,this.decay),r5(r8(a),1-this.decay)),t=r2(r5(o,this.momentum),r4(r5(a,this.learningRate),r6(r2(e,this.epsilon))));i.assign(e),o.assign(t);let r=nr(n,t);n.assign(r)}})}),this.incrementIterations()}dispose(){null!=this.accumulatedMeanSquares&&dispose(this.accumulatedMeanSquares.map(e=>e.variable)),null!=this.accumulatedMeanGrads&&this.centered&&dispose(this.accumulatedMeanGrads.map(e=>e.variable)),null!=this.accumulatedMoments&&dispose(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedMoments=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}},SGDOptimizer];function defer(e){return new Promise(e=>setTimeout(e)).then(e)}let BrowserDownloads=class BrowserDownloads{constructor(e){if(!F.getBool("IS_BROWSER"))throw Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(BrowserDownloads.URL_SCHEME)&&(e=e.slice(BrowserDownloads.URL_SCHEME.length)),(null==e||0===e.length)&&(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw Error("Browser downloads are not supported in this environment since `document` is not present");let t=composite_array_buffer_CompositeArrayBuffer.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let t=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],n=getModelJSONForModelArtifacts(e,t),a=window.URL.createObjectURL(new Blob([JSON.stringify(n)],{type:"application/json"})),i=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=a,await defer(()=>i.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){let e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=r,await defer(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:getModelArtifactsInfoForJSON(e)}}}};/**
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
 */function monitorPromisesProgress(e,t,r,n){var a,i;util_base_assert(null!=e&&Array.isArray(e)&&e.length>0,()=>"promises must be a none empty array"),a=r=null==r?0:r,i=n=null==n?1:n,util_base_assert(a>=0&&a<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${a}`),util_base_assert(i>=0&&i<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${i}`),util_base_assert(i>=a,()=>`startFraction must be no more than endFraction, but got startFraction ${a} and endFraction ${i}`);let o=0;return Promise.all(e.map(a=>(a.then(a=>{let i=r+ ++o/e.length*(n-r);return t(i),a}),a)))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function loadWeightsAsArrayBuffer(e,t){null==t&&(t={});let r=null==t.fetchFunc?F.platform.fetch:t.fetchFunc,n=e.map(e=>r(e,t.requestInit,{isBinary:!0})),a=null==t.onProgress?await Promise.all(n):await monitorPromisesProgress(n,t.onProgress,0,.5),i=a.map(e=>e.arrayBuffer()),o=null==t.onProgress?await Promise.all(i):await monitorPromisesProgress(i,t.onProgress,.5,1);return o}BrowserDownloads.URL_SCHEME="downloads://",router_registry_IORouterRegistry.registerSaveRouter(e=>F.getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(BrowserDownloads.URL_SCHEME)?function(e="model"){return new BrowserDownloads(e)}(e.slice(BrowserDownloads.URL_SCHEME.length)):null);let HTTPRequest=class HTTPRequest{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(util_base_assert("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=F.platform.fetch,util_base_assert(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&util_base_assert(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=getModelJSONForModelArtifacts(e,r);if(t.body.append("model.json",new Blob([JSON.stringify(n)],{type:"application/json"}),"model.json"),null!=e.weightData){let r=composite_array_buffer_CompositeArrayBuffer.join(e.weightData);t.body.append("model.weights.bin",new Blob([r],{type:"application/octet-stream"}),"model.weights.bin")}let a=await this.fetch(this.path,t);if(a.ok)return{modelArtifactsInfo:getModelArtifactsInfoForJSON(e),responses:[a]};throw Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${a.status}.`)}async loadModelJSON(){let e;let t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);try{e=await t.json()}catch(t){let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?e+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":e+=" Please make sure the server is serving valid JSON for this request.",Error(e)}let r=e.modelTopology,n=e.weightsManifest;if(null==r&&null==n)throw Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let e=await this.loadModelJSON();return io_utils_getModelArtifactsForJSON(e,e=>this.loadWeights(e))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),r=getWeightSpecs(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:()=>(function(e,t){var r;let n;let a=null==t.fetchFunc?F.platform.fetch:t.fetchFunc,i=0;return null===(r=t.onProgress)||void 0===r||r.call(t,0),new ReadableStream({pull:async r=>{for(var o;i<e.length;){if(!n){let r=(await a(e[i],t.requestInit,{isBinary:!0})).body;n=r.getReader()}let{done:s,value:l}=await n.read();if(s){i++,n=void 0,null===(o=t.onProgress)||void 0===o||o.call(t,i/e.length);continue}r.enqueue(l);return}r.close()}})})(t,this.loadOptions)})}async getWeightUrls(e){let t=Array.isArray(this.path)?this.path[1]:this.path,[r,n]=function(e){let t=e.lastIndexOf("/"),r=e.lastIndexOf("?"),n=e.substring(0,t),a=r>t?e.substring(r):"";return[n+"/",a]}(t),a=this.weightPathPrefix||r,i=[],o=[];for(let t of e)for(let e of t.paths)null!=this.weightUrlConverter?o.push(this.weightUrlConverter(e)):i.push(a+e+n);return this.weightUrlConverter&&i.push(...await Promise.all(o)),i}async loadWeights(e){let t=await this.getWeightUrls(e),r=getWeightSpecs(e),n=await loadWeightsAsArrayBuffer(t,this.loadOptions);return[r,n]}};function isHTTPScheme(e){return null!=e.match(HTTPRequest.URL_SCHEME_REGEX)}HTTPRequest.URL_SCHEME_REGEX=/^https?:\/\//;let httpRouter=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc));else if(Array.isArray(e)?e.every(e=>isHTTPScheme(e)):isHTTPScheme(e))return new HTTPRequest(e,t);return null};function assertParamsValid(e,t,r){let n=e.shape.length;util_base_assert(n===t.length,()=>`Error in slice${n}D: Length of begin ${t} must match the rank of the array (${n}).`),util_base_assert(n===r.length,()=>`Error in slice${n}D: Length of size ${r} must match the rank of the array (${n}).`);for(let a=0;a<n;++a)util_base_assert(t[a]+r[a]<=e.shape[a],()=>`Error in slice${n}D: begin[${a}] + size[${a}] (${t[a]+r[a]}) would overflow input.shape[${a}] (${e.shape[a]})`)}function maskToAxes(e){let t=[],r=0;for(;e>0;)1&e&&t.push(r),e/=2,r++;return t}function computeOutShape(e,t,r){let n=[];for(let a=0;a<e.length;a++)n[a]=Math.ceil((t[a]-e[a])/r[a]);return n}function stridesWithElidedDims(e,t,r,n){let a=[...e];for(let e=a.length;e<n.length;e++)a.push(1);for(let e=0;e<r;e++)0===e?a[t]=1:(a.splice(t,0,1),a.pop());return a}function getElidedAxes(e,t){let r=[];for(let n=0;n<e;n++)r.push(t+n);return r}function getNormalizedAxes(e,t,r,n,a,i,o,s,l){let u=e.length,c=Array(u),d=Array(u),h=Array(u);if(t.length&&r>0){let l=t[0],u=r+1;c=startIndicesWithElidedDims(o,l,u,n,e),d=stopIndicesWithElidedDims(s,l,u,a,e),h=stridesWithElidedDims(i,l,u,e)}else for(let t=0;t<u;t++)c[t]=startForAxis(o,n,i,e,t,l),d[t]=stopForAxis(s,a,i,e,t,l),h[t]=stridesForAxis(i,t,l);return{begin:c,end:d,strides:h}}function startIndicesWithElidedDims(e,t,r,n,a){let i=[...a],o=getElidedAxes(r,t);for(let a=0;a<i.length;a++)if(o.indexOf(a)>-1)i[a]=0;else{var s;let o=(s=a)<=t?s:s-(r-1),l=n[o];e&1<<o&&(l=0),i[a]=l}return i}function stopIndicesWithElidedDims(e,t,r,n,a){let i=[...a],o=getElidedAxes(r,t);for(let a=0;a<i.length;a++)if(o.indexOf(a)>-1)i[a]=Number.MAX_SAFE_INTEGER;else{var s;let o=(s=a)<=t?s:s-(r-1),l=n[o];e&1<<o&&(l=Number.MAX_SAFE_INTEGER),i[a]=l}for(let e=0;e<i.length;e++){let t=a[e];i[e]<0&&(i[e]+=t),i[e]=clamp(0,i[e],a[e])}return i}function stridesForAxis(e,t,r){let n=e[t];return(r&1<<t||null==n)&&(n=1),n}function startForAxis(e,t,r,n,a,i){let o=t[a],s=r[a]||1;(e&1<<a||i&1<<a||null==o)&&(o=s>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);let l=n[a];return o<0&&(o+=l),o=clamp(0,o,l-1)}function stopForAxis(e,t,r,n,a,i){let o=t[a],s=r[a]||1;(e&1<<a||i&1<<a||null==o)&&(o=s>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);let l=n[a];return o<0&&(o+=l),o=s>0?clamp(0,o,l):clamp(-1,o,l-1)}function isSliceContinous(e,t,r){let n=r.length;for(let e=0;e<r.length;e++)if(r[e]>1){n=e;break}for(let a=n+1;a<r.length;a++)if(t[a]>0||r[a]!==e[a])return!1;return!0}function computeFlatOffset(e,t){let r=e.length>0?e[e.length-1]:1;for(let n=0;n<e.length-1;n++)r+=e[n]*t[n];return r}function parseSliceParams(e,t,r){let n,a;let i=e.shape.length;return(n="number"==typeof t?[t,...Array(i-1).fill(0)]:t.length<i?t.concat(Array(i-t.length).fill(0)):t.slice()).forEach(e=>{util_base_assert(-1!==e,()=>"slice() does not support negative begin indexing.")}),a=(a=null==r?Array(i).fill(-1):"number"==typeof r?[r,...Array(i-1).fill(-1)]:r.length<i?r.concat(Array(i-r.length).fill(-1)):r).map((t,r)=>t>=0?t:(util_base_assert(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${r}.`),e.shape[r]-n[r])),[n,a]}function sliceInfo(e,t,r,n,a,i,o,s,l){let u;if(null==n?(u=Array(t.length)).fill(1):u=n,null!=o&&(o&o-1)!=0)throw Error("Multiple ellipses in slice is not allowed.");let c=!1,d={dims:u.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:r.slice(),strides:u.slice(),beginMask:a,endMask:i,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:l};for(let e=0;e<d.dims;e++)c&&(1<<e&s)!=0&&d.numAddAxisAfterEllipsis++,1<<e&o&&(c=!0);!c&&(d.ellipsisMask|=1<<d.dims,d.dims++);let h={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};!function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let r=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(let n=0;n<e.dims;n++)if(1<<n&e.ellipsisMask){let a=Math.min(t.dims-(e.dims-n)+1+e.numAddAxisAfterEllipsis,t.dims);for(;r<a;r++)t.begin[r]=0,t.end[r]=0,t.strides[r]=1,t.beginMask|=1<<r,t.endMask|=1<<r,t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[r]=n}else if(1<<n&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(r===t.begin.length)throw Error(`Index out of range using input dim ${r}; input has only ${t.dims} dims, ${t.begin.length}.`);null!=e.begin&&(t.begin[r]=e.begin[n]),null!=e.end&&(t.end[r]=e.end[n]),t.strides[r]=e.strides[n],e.beginMask&1<<n&&(t.beginMask|=1<<r),e.endMask&1<<n&&(t.endMask|=1<<r),e.shrinkAxisMask&1<<n?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<r):(t.finalShapeGatherIndices.push(r),t.finalShapeGatherIndicesSparse.push(n)),t.inputShapeGatherIndicesSparse[r]=n,r++}}(d,h);let f=!0,p=!0,m=!0,g=[],y=[];for(let t=0;t<e.length;++t){let r;if(0===h.strides[t])throw Error(`strides[${t}] must be non-zero`);let n=!!(h.shrinkAxisMask&1<<t),a=e[t];if(-1===a){g.push(n?1:-1);continue}let i=[h.beginMask&1<<t,h.endMask&1<<t],o=[h.strides[t]>0?0:-1,h.strides[t]>0?a:a-1];if(n&&h.strides[t]<=0)throw Error("only stride 1 allowed on non-range indexing.");m=m&&1===h.strides[t];let s=!!(h.beginMask&1<<t&&h.endMask&1<<t);if(h.beginValid&&h.endValid){if(n){let e=h.begin[t]<0?a+h.begin[t]:h.begin[t];if(h.begin[t]=e,h.end[t]=h.begin[t]+1,e<0||e>=a)throw Error(`slice index ${h.begin[t]} of dimension ${t} out of bounds.`)}else h.begin[t]=canonical(h.begin[t],0,h.strides[t],a,i,o),h.end[t]=canonical(h.end[t],1,h.strides[t],a,i,o);let e=1===h.strides[t]&&0===h.begin[t]&&h.end[t]===a;f=f&&e,p=p&&(0===t&&1===h.strides[t]||e)}else f=f&&1===h.strides[t]&&s,p=p&&(0===t&&1===h.strides[t]||s);let l=!1;if(h.beginValid&&h.endValid?(r=h.end[t]-h.begin[t],l=!0):n?(r=1,l=!0):s&&a>=0&&(r=h.strides[t]<0?-a:a,l=!0),l){let e;e=0===r||r<0!=h.strides[t]<0?0:Math.trunc(r/h.strides[t])+(r%h.strides[t]!=0?1:0),g.push(e)}else g.push(-1)}for(let e=0;e<h.finalShapeGatherIndices.length;++e){let t=h.finalShapeGatherIndices[e];t>=0?y.push(g[t]):-2===t&&y.push(1)}let x=y.filter((e,t)=>-2!==h.finalShapeGatherIndices[t]);return{finalShapeSparse:x,finalShape:y,isIdentity:f,sliceDim0:p,isSimpleSlice:m,begin:h.begin,end:h.end,strides:h.strides}}function canonical(e,t,r,n,a,i){if(a[t])return r>0?i[t]:i[t+1&1];{let t=e<0?n+e:e;return t<i[0]?i[0]:t>i[1]?i[1]:t}}router_registry_IORouterRegistry.registerSaveRouter(httpRouter),router_registry_IORouterRegistry.registerLoadRouter(httpRouter);let no=op({reshape_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"x","reshape","string_or_numeric");return rW.runKernel(tV,{x:r},{shape:t})}}),ns=op({broadcastTo_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"broadcastTo","x"),n=r.shape;if(assertNonNegativeIntegerDimensions(t),t.length<r.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${r.rank}.`);if(t.length>r.rank){let e=r.shape.slice();for(;e.length<t.length;)e.unshift(1);r=no(r,e)}let a=r.shape,i=Array.from(t);for(let e=t.length-1;e>=0;e--)if(a[e]===t[e])i[e]=1;else if(1!==r.shape[e])throw Error(`broadcastTo(): [${n}] cannot be broadcast to [${t}].`);let o=i.map((e,t)=>e>1?t:-1).filter(e=>e>=0);if(0===o.length)return r1(r);let s={x:r};return rW.runKernel(ry,s,{reps:i})}}),nl=op({mean_:/**
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
 */function(e,t=null,r=!1){let n=tensor_util_env_convertToTensor(e,"x","mean");return rW.runKernel(tm,{x:n},{axis:t,keepDims:r})}}),nu=op({split_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r=0){let n=tensor_util_env_convertToTensor(e,"x","split");return rW.runKernel(re,{x:n},{numOrSizeSplits:t,axis:r})}}),nc=op({sum_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=null,r=!1){let n=tensor_util_env_convertToTensor(e,"x","sum");"bool"===n.dtype&&(n=r0(n,"int32"));let a={x:n};return rW.runKernel(t7,a,{axis:t,keepDims:r})}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tensor2d(e,t,r){if(assertNonNull(e),null!=t&&2!==t.length)throw Error("tensor2d() requires shape to have two numbers");let n=inferShape(e,r);if(2!==n.length&&1!==n.length)throw Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===n.length&&null==t)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return makeTensor(e,t,n,r)}let nd=op({complex_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"real","complex"),n=tensor_util_env_convertToTensor(t,"imag","complex");return assertShapesMatch(r.shape,n.shape,`real and imag shapes, ${r.shape} and ${n.shape}, must match in call to tf.complex().`),rW.runKernel(eh,{real:r,imag:n})}});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zeros(e,t="float32"){if(assertNonNegativeIntegerDimensions(e),"complex64"===t){let t=zeros(e,"float32"),r=zeros(e,"float32");return nd(t,r)}let r=makeZerosTypedArray(util_base_sizeFromShape(e),t);return rW.makeTensor(r,e,t)}let nh=op({concat_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){util_base_assert(e.length>=1,()=>"Pass at least one tensor to concat");let r=function(e,t,r,n="numeric"){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${r} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,a)=>tensor_util_env_convertToTensor(e,`${t}[${a}]`,r,n))}(e,"tensors","concat","string_or_numeric");return("complex64"===r[0].dtype&&r.forEach(e=>{if("complex64"!==e.dtype)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),1===r.length)?r1(r[0]):rW.runKernel(ep,r,{axis:t})}}),nf=op({imag_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"input","imag");return rW.runKernel(e3,{input:t})}}),np=op({real_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"input","real");return rW.runKernel(tM,{input:t})}}),nm=op({slice_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){let n=tensor_util_env_convertToTensor(e,"x","slice","string_or_numeric");if(0===n.rank)throw Error("Slicing scalar is not possible");return rW.runKernel(t1,{x:n},{begin:t,size:r})}}),ng=op({fft_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){return util_base_assert("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`),rW.runKernel(eZ,{input:e})}}),ny=op({rfft_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r;util_base_assert("float32"===e.dtype,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1],a=e.size/n;if(null!=t&&t<n){let a=e.shape.map(e=>0),i=e.shape.map(e=>e);i[e.shape.length-1]=t,r=nm(e,a,i),n=t}else if(null!=t&&t>n){let a=e.shape.map(e=>e);a[e.shape.length-1]=t-n,r=nh([e,zeros(a)],e.shape.length-1),n=t}else r=e;let i=r7(r),o=no(nd(r,i),[a,n]),s=ng(o),l=Math.floor(n/2)+1,u=np(s),c=nf(s),d=nu(u,[l,n-l],u.shape.length-1),h=nu(c,[l,n-l],c.shape.length-1),f=r.shape.slice();return f[r.shape.length-1]=l,no(nd(d[0],h[0]),f)}});function cosineWindow(e,t,r){let n=1-e%2,a=new Float32Array(e);for(let i=0;i<e;++i){let o=2*Math.PI*i/(e+n-1);a[i]=t-r*Math.cos(o)}return(/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){assertNonNull(e);let r=inferShape(e,t);if(1!==r.length)throw Error("tensor1d() requires values to be a flat/TypedArray");return makeTensor(e,null,r,t)}(a,"float32"))}let nx=op({hammingWindow_:/**
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
 */function(e){return cosineWindow(e,.54,.46)}}),nb=op({hannWindow_:/**
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
 */function(e){return cosineWindow(e,.5,.5)}}),nv=op({frame_:/**
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
 */function(e,t,r,n=!1,a=0){let i=0,o=[];for(;i+t<=e.size;)o.push(nm(e,i,t)),i+=r;if(n)for(;i<e.size;){let n=i+t-e.size,s=nh([nm(e,i,t-n),fill([n],a)]);o.push(s),i+=r}return 0===o.length?tensor2d([],[0,t]):no(nh(o),[o.length,t])}}),nI=op({stft_:/**
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
 */function(e,t,r,n,a=nb){null==n&&(n=Math.floor(Math.pow(2,Math.ceil(Math.log(t)/Math.log(2)))));let i=nv(e,t,r),o=r5(i,a(t));return ny(o,n)}}),nC=op({tile_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"x","tile","string_or_numeric");return util_base_assert(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of reps ${t}.`),rW.runKernel(ry,{x:r},{reps:t})}}),nw=op({expandDims_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){let r=tensor_util_env_convertToTensor(e,"x","expandDims","string_or_numeric");return util_base_assert(t<=r.rank,()=>"Axis must be <= rank of the tensor"),rW.runKernel(ez,{input:r},{dim:t})}});function defaultComparator(e,t){return e>t?1:e<t?-1:0}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nonMaxSuppressionV3Impl(e,t,r,n,a){return nonMaxSuppressionImpl_(e,t,r,n,a,0)}function nonMaxSuppressionV4Impl(e,t,r,n,a,i){return nonMaxSuppressionImpl_(e,t,r,n,a,0,!1,i,!0)}function nonMaxSuppressionV5Impl(e,t,r,n,a,i){return nonMaxSuppressionImpl_(e,t,r,n,a,i,!0)}function nonMaxSuppressionImpl_(e,t,r,n,a,i,o=!1,s=!1,l=!1){let u=[];for(let e=0;e<t.length;e++)t[e]>a&&u.push({score:t[e],boxIndex:e,suppressBeginIndex:0});u.sort(ascendingComparator);let c=i>0?-.5/i:0,d=[],h=[];for(;d.length<r&&u.length>0;){let t=u.pop(),{score:r,boxIndex:i,suppressBeginIndex:o}=t;if(r<a)break;let s=!1;for(let r=d.length-1;r>=o;--r){let o=function(e,t,r){let n=e.subarray(4*t,4*t+4),a=e.subarray(4*r,4*r+4),i=Math.min(n[0],n[2]),o=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),l=Math.max(n[1],n[3]),u=Math.min(a[0],a[2]),c=Math.min(a[1],a[3]),d=Math.max(a[0],a[2]),h=Math.max(a[1],a[3]),f=(s-i)*(l-o),p=(d-u)*(h-c);if(f<=0||p<=0)return 0;let m=Math.max(i,u),g=Math.max(o,c),y=Math.min(s,d),x=Math.min(l,h),b=Math.max(y-m,0)*Math.max(x-g,0);return b/(f+p-b)}(e,i,d[r]);if(o>=n){s=!0;break}if(t.score=t.score*function(e,t,r){let n=Math.exp(t*r*r);return r<=e?n:0}(n,c,o),t.score<=a)break}t.suppressBeginIndex=d.length,!s&&(t.score===r?(d.push(i),h.push(t.score)):t.score>a&&/**
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
 */function(e,t,r){let n=function(e,t,r){let n=0,a=e.length,i=0,o=!1;for(;n<a;){i=n+(a-n>>>1);let s=r(t,e[i]);s>0?n=i+1:(a=i,o=!s)}return o?n:-n-1}(e,t,r||defaultComparator),a=n<0?-(n+1):n;e.splice(a,0,t)}(u,t,ascendingComparator))}let f=d.length,p=r-f;s&&p>0&&(d.push(...Array(p).fill(0)),h.push(...Array(p).fill(0)));let m={selectedIndices:d};return o&&(m.selectedScores=h),l&&(m.validOutputs=f),m}function ascendingComparator(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}let n_=op({neg_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","neg");return rW.runKernel(tC,{x:t})}});/**
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
 */function axesAreInnerMostDims(e,t){for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0}function combineLocations(e,t,r){let n=e.length+t.length,a=[],i=0,o=0;for(let s=0;s<n;s++)-1===r.indexOf(s)?a.push(e[i++]):a.push(t[o++]);return a}function computeOutAndReduceShapes(e,t){let r=[],n=e.length;for(let a=0;a<n;a++)-1===t.indexOf(a)&&r.push(e[a]);let a=t.map(t=>e[t]);return[r,a]}function expandShapeToKeepDim(e,t){let r=t.map(e=>1);return combineLocations(e,r,t)}function assertAxesAreInnerMostDims(e,t,r){util_base_assert(axesAreInnerMostDims(t,r),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${r} input.`)}function getAxesPermutation(e,t){if(axesAreInnerMostDims(e,t))return null;let r=[];for(let n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);return e.forEach(e=>r.push(e)),r}function getUndoAxesPermutation(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function getInnerMostAxes(e,t){let r=[];for(let n=t-e;n<t;++n)r.push(n);return r}let nS=op({max_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=null,r=!1){let n=tensor_util_env_convertToTensor(e,"x","max");return rW.runKernel(tl,{x:n},{reductionIndices:t,keepDims:r})}}),nT=op({min_:/**
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
 */function(e,t=null,r=!1){let n=tensor_util_env_convertToTensor(e,"x","min");return rW.runKernel(tg,{x:n},{axis:t,keepDims:r})}});(d=x||(x={}))[d.NONE=0]="NONE",d[d.MEAN=1]="MEAN",d[d.SUM=2]="SUM",d[d.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS";let nk=op({relu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","relu");return rW.runKernel(tU,{x:t})}}),nE={hammingWindow:nx,hannWindow:nb,frame:nv,stft:nI},nR="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:e=>e();function nextFrame(){return new Promise(e=>nR(()=>e()))}/**
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
 */function assertParamsConsistent(e,t){let r=e[0].length;e.forEach((e,t)=>{util_base_assert(e.length===r,()=>`Error in concat${r}D: rank of tensors[${t}] must be the same as the rank of the rest (${r})`)}),util_base_assert(t>=0&&t<r,()=>`Error in concat${r}D: axis must be between 0 and ${r-1}.`);let n=e[0];e.forEach((e,a)=>{for(let i=0;i<r;i++)util_base_assert(i===t||e[i]===n[i],()=>`Error in concat${r}D: Shape of tensors[${a}] (${e}) does not match the shape of the rest (${n}) along the non-concatenated axis ${a}.`)})}function concat_util_computeOutShape(e,t){let r=e[0].slice();for(let n=1;n<e.length;n++)r[t]+=e[n][t];return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function computeDilation2DInfo(e,t,r,n,a="NHWC",i){let o=e[3],s=[...t,o],l=convertConv2DDataFormat(a);return computeConv2DInfo(e,s,r,i,n,null,null,l)}function computePool2DInfo(e,t,r,n,a,i,o="channelsLast"){let s;let[l,u]=parseTupleParam(t);if("channelsLast"===o)s=[l,u,e[3],e[3]];else if("channelsFirst"===o)s=[l,u,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return computeConv2DInfo(e,s,r,n,a,i,!1,o)}function computePool3DInfo(e,t,r,n,a,i,o="NDHWC"){let s,l;let[u,c,d]=parse3TupleParam(t);if("NDHWC"===o)l="channelsLast",s=[u,c,d,e[4],e[4]];else if("NCDHW"===o)l="channelsFirst",s=[u,c,d,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return computeConv3DInfo(e,s,r,n,a,!1,l,i)}function computeConv2DInfo(e,t,r,n,a,i,o=!1,s="channelsLast"){let l,[u,c,d,h]=[-1,-1,-1,-1];if("channelsLast"===s)[u,c,d,h]=e;else if("channelsFirst"===s)[u,h,c,d]=e;else throw Error(`Unknown dataFormat ${s}`);let[f,p,,m]=t,[g,y]=parseTupleParam(r),[x,b]=parseTupleParam(n),v=getEffectiveFilterSize(f,x),C=getEffectiveFilterSize(p,b),{padInfo:w,outHeight:_,outWidth:k}=function(e,t,r,n,a,i,o,s,l){let u,c,d;if("number"==typeof e){let a=0===e?"VALID":"NUMBER";u={top:e,bottom:e,left:e,right:e,type:a};let o=function(e,t,r,n,a){null==n&&(n=computeDefaultPad(e,t,r));let i=e[0],o=e[1],s=conv_util_round((i-t+2*n)/r+1,a),l=conv_util_round((o-t+2*n)/r+1,a);return[s,l]}([t,r],i,n,e,s);c=o[0],d=o[1]}else if("same"===e){c=Math.ceil(t/n),d=Math.ceil(r/a);let e=Math.max(0,(c-1)*n+i-t),s=Math.max(0,(d-1)*a+o-r),l=Math.floor(e/2),h=Math.floor(s/2);u={top:l,bottom:e-l,left:h,right:s-h,type:"SAME"}}else if("valid"===e)u={top:0,bottom:0,left:0,right:0,type:"VALID"},c=Math.ceil((t-i+1)/n),d=Math.ceil((r-o+1)/a);else if("object"==typeof e){let h="channelsLast"===l?e[1][0]:e[2][0],f="channelsLast"===l?e[1][1]:e[2][1],p="channelsLast"===l?e[2][0]:e[3][0],m="channelsLast"===l?e[2][1]:e[3][1],g=0===h&&0===f&&0===p&&0===m?"VALID":"EXPLICIT";u={top:h,bottom:f,left:p,right:m,type:g},c=conv_util_round((t-i+h+f)/n+1,s),d=conv_util_round((r-o+p+m)/a+1,s)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:u,outHeight:c,outWidth:d}}(a,c,d,g,y,v,C,i,s),$=o?m*h:m;return"channelsFirst"===s?l=[u,$,_,k]:"channelsLast"===s&&(l=[u,_,k,$]),{batchSize:u,dataFormat:s,inHeight:c,inWidth:d,inChannels:h,outHeight:_,outWidth:k,outChannels:$,padInfo:w,strideHeight:g,strideWidth:y,filterHeight:f,filterWidth:p,effectiveFilterHeight:v,effectiveFilterWidth:C,dilationHeight:x,dilationWidth:b,inShape:e,outShape:l,filterShape:t}}function computeConv3DInfo(e,t,r,n,a,i=!1,o="channelsLast",s){let l,[u,c,d,h,f]=[-1,-1,-1,-1,-1];if("channelsLast"===o)[u,c,d,h,f]=e;else if("channelsFirst"===o)[u,f,c,d,h]=e;else throw Error(`Unknown dataFormat ${o}`);let[p,m,g,,y]=t,[x,b,v]=parse3TupleParam(r),[C,w,_]=parse3TupleParam(n),k=getEffectiveFilterSize(p,C),$=getEffectiveFilterSize(m,w),A=getEffectiveFilterSize(g,_),{padInfo:N,outDepth:F,outHeight:D,outWidth:B}=function(e,t,r,n,a,i,o,s,l,u,c){let d,h,f,p;if("valid"===e&&(e=0),"number"==typeof e){let m=0===e?"VALID":"NUMBER";d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:m};let g=function(e,t,r,n,a,i){null==a&&(a=computeDefaultPad(e,t[0],n[0]));let o=[0,0,0,1];for(let r=0;r<3;r++)e[r]+2*a>=t[r]&&(o[r]=conv_util_round((e[r]-t[r]+2*a)/n[r]+1,i));return o}([t,r,n,1],[s,l,u],0,[a,i,o],e,c);h=g[0],f=g[1],p=g[2]}else if("same"===e){h=Math.ceil(t/a),f=Math.ceil(r/i),p=Math.ceil(n/o);let e=(h-1)*a+s-t,c=(f-1)*i+l-r,m=(p-1)*o+u-n,g=Math.floor(e/2),y=Math.floor(c/2),x=Math.floor(m/2);d={top:y,bottom:c-y,left:x,right:m-x,front:g,back:e-g,type:"SAME"}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:h,outHeight:f,outWidth:p}}(a,c,d,h,x,b,v,k,$,A,s),M=i?y*f:y;return"channelsFirst"===o?l=[u,M,F,D,B]:"channelsLast"===o&&(l=[u,F,D,B,M]),{batchSize:u,dataFormat:o,inDepth:c,inHeight:d,inWidth:h,inChannels:f,outDepth:F,outHeight:D,outWidth:B,outChannels:M,padInfo:N,strideDepth:x,strideHeight:b,strideWidth:v,filterDepth:p,filterHeight:m,filterWidth:g,effectiveFilterDepth:k,effectiveFilterHeight:$,effectiveFilterWidth:A,dilationDepth:C,dilationHeight:w,dilationWidth:_,inShape:e,outShape:l,filterShape:t}}function computeDefaultPad(e,t,r,n=1){let a=getEffectiveFilterSize(t,n);return Math.floor((e[0]*(r-1)-r+a)/2)}function parseTupleParam(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function parse3TupleParam(e){return"number"==typeof e?[e,e,e]:e}function getEffectiveFilterSize(e,t){return t<=1?e:e+(e-1)*(t-1)}function conv_util_round(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function tupleValuesAreOne(e){let[t,r,n]=parseTupleParam(e);return 1===t&&1===r&&1===n}function eitherStridesOrDilationsAreOne(e,t){return tupleValuesAreOne(e)||tupleValuesAreOne(t)}function stridesOrDilationsArePositive(e){return parseTupleParam(e).every(e=>e>0)}function convertConv2DDataFormat(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw Error(`Unknown dataFormat ${e}`)}function checkPadOnDimRoundingMode(e,t,r){if(null!=r){if("string"==typeof t)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${r} but got pad ${t}.`);if("number"==typeof t)util_base_assert(isInt(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${r} but got pad ${t}.`);else if("object"==typeof t)t.forEach(t=>{t.forEach(t=>{util_base_assert(isInt(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${r} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}let n$=op({elu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","elu","float32");return rW.runKernel(eM,{x:t})}}),nA=op({leakyRelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=.2){let r=tensor_util_env_convertToTensor(e,"x","leakyRelu");return rW.runKernel(e8,{x:r},{alpha:t})}}),nN=op({prelu_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t){let r=tensor_util_env_convertToTensor(e,"x","prelu"),n=tensor_util_env_convertToTensor(t,"alpha","prelu");return rW.runKernel(tN,{x:r,alpha:n})}}),nO=op({relu6_:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","relu6");return rW.runKernel(tj,{x:t})}}),nF=op({sigmoid_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=tensor_util_env_convertToTensor(e,"x","sigmoid","float32");return rW.runKernel(t5,{x:t})}}),nP=op({step_:/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t=0){let r=tensor_util_env_convertToTensor(e,"x","step");return rW.runKernel(rS,{x:r},{alpha:t})}});/**
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
 */function getFusedDyActivation(e,t,r){if(null==r||"linear"===r)return e;if("relu"===r)return r5(e,nP(t));throw Error(`Cannot compute gradient for fused activation ${r}.`)}function getFusedBiasGradient(e,t){let r=t,n=getReductionAxes(e.shape,t.shape);return n.length>0&&(r=nc(r,n)),no(r,e.shape)}function applyActivation(e,t,r,n){if("linear"===t)return e;if("relu"===t)return nk(e);if("elu"===t)return n$(e);if("relu6"===t)return nO(e);if("prelu"===t)return nN(e,r);if("leakyrelu"===t)return nA(e,n);if("sigmoid"===t)return nF(e);throw Error(`Unknown fused activation ${t}.`)}let shouldFuse=(e,t)=>!(e>0)||"linear"===t;function combineRaggedTensorToTensorShapes(e,t,r){let n=[];if(null==r&&null==t)return n;if(null==t)for(;n.length<e+r.length;)n.push(-1);else n=t.slice();if(null==r)return n;if(e+r.length!==n.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+r.length}, but shape.rank = ${n.length}`);for(let a=1;a<r.length;++a){let i=r[a],o=n[n.length-r.length+a],s=n[o];if(i>=0){if(s>=0){if(s!==i)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${a+e}] = ${i} but shape[${a+e}] = ${s}`)}else n[o]=i}}return n}function getRowPartitionTypesHelper(e){let t={FIRST_DIM_SIZE:b.FIRST_DIM_SIZE,VALUE_ROWIDS:b.VALUE_ROWIDS,ROW_LENGTHS:b.ROW_LENGTHS,ROW_SPLITS:b.ROW_SPLITS,ROW_LIMITS:b.ROW_LIMITS,ROW_STARTS:b.ROW_STARTS},r=[];for(let n of e)if(n in t)r.push(t[n]);else break;return r}function getRaggedRank(e){return 0===e.length?0:e[0]===b.FIRST_DIM_SIZE?e.length-1:e.length}function validateDefaultValueShape(e,t){if(null==e||null==t)return;let r=e.length,n=t.length;if(r>=n)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${r} must be less than ragged tensor input flatValues.rank = ${n})`);for(let a=0;a<Math.min(r,n-1);++a){let r=e[a],n=t[a+1];if(r>=0&&n>=0&&1!==r&&r!==n)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${a-e.length}] = ${r} but ragged tensor input.flatValues.shape[${a-e.length}] = ${n}`)}}(h=b||(b={}))[h.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",h[h.VALUE_ROWIDS=1]="VALUE_ROWIDS",h[h.ROW_LENGTHS=2]="ROW_LENGTHS",h[h.ROW_SPLITS=3]="ROW_SPLITS",h[h.ROW_LIMITS=4]="ROW_LIMITS",h[h.ROW_STARTS=5]="ROW_STARTS";/**
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
 */let nD=30;function computeOptimalWindowSize(e){return e<=nD?e:nearestDivisor(e,Math.floor(Math.sqrt(e)))}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getImageCenter(e,t,r){let n=r*("number"==typeof e?e:e[0]),a=t*("number"==typeof e?e:e[1]);return[n,a]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getReshaped(e,t,r,n=!0){let a=[];if(n)(a=a.concat(t.slice(0))).push(e[0]/r),a=a.concat(e.slice(1));else{a=a.concat(e[0]);let r=t.length;for(let n=0;n<r;++n)a=a.concat([e[n+1]/t[n],t[n]]);a=a.concat(e.slice(r+1))}return a}function getPermuted(e,t,r=!0){let n=[];if(r){n.push(t);for(let r=t+1;r<e;++r)r<=2*t?(n.push(r),n.push(r-(t+1))):n.push(r)}else{let r=[],a=[];for(let n=1;n<e;++n)n>=2*t+1||n%2==1?a.push(n):r.push(n);n.push(...r),n.push(0),n.push(...a)}return n}function getReshapedPermuted(e,t,r,n=!0){let a=[];n?a.push(e[0]/r):a.push(e[0]*r);for(let r=1;r<e.length;++r)r<=t.length?n?a.push(t[r-1]*e[r]):a.push(e[r]/t[r-1]):a.push(e[r]);return a}function getSliceBeginCoords(e,t){let r=[0];for(let n=0;n<t;++n)r.push(e[n][0]);return r}function getSliceSize(e,t,r){let n=e.slice(0,1);for(let a=0;a<r;++a)n.push(e[a+1]-t[a][0]-t[a][1]);return n}function prepareAndValidate(e,t){let r=e.shape.length,n=t.shape.length;if(r<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${r}.`);if(n<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${n}.`);if("int32"!==t.dtype)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[n-1]>r)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[n-1]} vs. ${r}`);if(0===util_base_sizeFromShape(e.shape))throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let a=t.shape,i=a[a.length-1],o=1;for(let e=0;e<a.length-1;++e)o*=a[e];let s=e.shape,l=a.slice();l.pop();let u=1;for(let e=i;e<r;++e)u*=s[e],l.push(s[e]);let c=[...computeStrides(e.shape).map(e=>e/u),1].slice(0,i);return[l,o,u,c]}function validateUpdateShape(e,t,r){let n=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,i=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${r.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${n}, and batchDim: ${a}.`;if(r.rank<a)throw Error(i+` update.rank < ${a}. `);if(e.length<n+(r.rank-a))throw Error(i+` Output shape length < ${n+(r.rank-a)}`);if(r.rank!==a+e.length-n)throw Error(i+` update.rank != ${a+e.length-n}`);for(let e=0;e<a;++e)if(r.shape[e]!==t.shape[e])throw Error(i+` updates.shape[${e}] (${r.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<r.rank-a;++t)if(r.shape[t+a]!==e[t+n])throw Error(i+` updates.shape[${t+a}] (${r.shape[t+a]}) != shape[${t+a}] (${e[t+a]})`)}function validateInput(e,t,r){if(t.rank<1)throw Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(r.length<1)throw Error(`Output rank must be greater or equal to 1, but got shape: ${r}`);if(0===r.length){if(0===t.size)throw Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(0===e.size)throw Error(`Updates specified for empty output. updates shape: ${e.shape}`)}validateUpdateShape(r,t,e)}function calculateShapes(e,t,r){let n=t.shape.length,a=n>1?t.shape[n-1]:1,i=r.length,o=1;for(let e=a;e<i;++e)o*=r[e];let s=a<1?1:a,l=util_base_sizeFromShape(t.shape)/s,u=[...computeStrides(r.slice(0,a)),1],c=util_base_sizeFromShape(r);return{sliceRank:a,numUpdates:l,sliceSize:o,strides:u,outputSize:c}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let nB=1.7580993408473768,nM=1.0507009873554805,nL=.3275911,nU=.254829592,nV=-.284496736,nW=1.421413741,nz=-1.453152027,nG=1.061405429;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mergeRealAndImagArrays(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let r=new Float32Array(2*e.length);for(let n=0;n<r.length;n+=2)r[n]=e[n/2],r[n+1]=t[n/2];return r}function splitRealAndImagArrays(e){let t=new Float32Array(e.length/2),r=new Float32Array(e.length/2);for(let n=0;n<e.length;n+=2)t[n/2]=e[n],r[n/2]=e[n+1];return{real:t,imag:r}}function complexWithEvenIndex(e){let t=Math.ceil(e.length/4),r=new Float32Array(t),n=new Float32Array(t);for(let t=0;t<e.length;t+=4)r[Math.floor(t/4)]=e[t],n[Math.floor(t/4)]=e[t+1];return{real:r,imag:n}}function complexWithOddIndex(e){let t=Math.floor(e.length/4),r=new Float32Array(t),n=new Float32Array(t);for(let t=2;t<e.length;t+=4)r[Math.floor(t/4)]=e[t],n[Math.floor(t/4)]=e[t+1];return{real:r,imag:n}}function getComplexWithIndex(e,t){let r=e[2*t],n=e[2*t+1];return{real:r,imag:n}}function assignToTypedArray(e,t,r,n){e[2*n]=t,e[2*n+1]=r}function exponents(e,t){let r=new Float32Array(e/2),n=new Float32Array(e/2);for(let a=0;a<Math.ceil(e/2);a++){let i=(t?2:-2)*Math.PI*(a/e);r[a]=Math.cos(i),n[a]=Math.sin(i)}return{real:r,imag:n}}function exponent(e,t,r){let n=(r?2:-2)*Math.PI*(e/t),a=Math.cos(n),i=Math.sin(n);return{real:a,imag:i}}let nZ=/->/g;function decodeEinsumEquation(e,t){e=e.replace(/\s/g,"");let r=(e.length-e.replace(nZ,"").length)/2;if(r<1)throw Error("Equations without an arrow are not supported.");if(r>1)throw Error('Equation must contain exactly one arrow ("->").');let[n,a]=e.split("->");util_base_assert(-1===n.indexOf("..."),()=>'The ellipsis notation ("...") is not supported yet.');let i=n.split(","),o=i.length;if(t!==o)throw Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw Error("Support for more than 2 input tensors is not implemented yet.");let s=[];for(let e=0;e<a.length;++e){let t=a[e];if(!i.some(e=>-1!==e.indexOf(t)))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);-1===s.indexOf(t)&&s.push(t)}for(let e=0;e<n.length;++e){let t=n[e];-1===s.indexOf(t)&&","!==t&&s.push(t)}let l=Array(i.length);for(let e=0;e<o;++e){if(new Set(i[e].split("")).size!==i[e].length)throw Error(`Found duplicate axes in input component ${i[e]}. Support for duplicate axes in input is not implemented yet.`);l[e]=[];for(let t=0;t<i[e].length;++t)l[e].push(s.indexOf(i[e][t]))}let u=s.length,c=a.length,d=[];for(let e=c;e<u;++e)d.push(e);return{allDims:s,summedDims:d,idDims:l}}function getEinsumPermutation(e,t){let r=Array(e);r.fill(-1);for(let e=0;e<t.length;++e)r[t[e]]=e;let n=[];for(let t=0;t<e;++t)-1===r[t]&&n.push(t);return{permutationIndices:r=r.filter(e=>-1!==e),expandDims:n}}function checkEinsumDimSizes(e,t,r){let n=Array(e);for(let e=0;e<r.length;++e){let a=r[e].shape;for(let r=0;r<t[e].length;++r)void 0===n[t[e][r]]?n[t[e][r]]=a[r]:util_base_assert(n[t[e][r]]===a[r],()=>`Expected dimension ${n[t[e][r]]} at axis ${r} of input shaped ${JSON.stringify(a)}, but got dimension ${a[r]}`)}}function getEinsumComputePath(e,t){let r=[],n=0;0===e.length&&e.push(-1),n=e.length+1;for(let e=0;e<n;++e)r.push([]);let a=[];for(let n=0;n<e.length;++n){let i=e[n],o=function(e,t){let r=[];for(let n=0;n<e.length;++n)(0===e[n].length||-1!==e[n].indexOf(t)||-1===t)&&r.push(n);return r}(t,i);for(let e of o)-1===a.indexOf(e)&&(r[n].push(e),a.push(e))}return{path:e,steps:r}}function isIdentityPermutation(e){return e.every((e,t)=>e===t)}function prepareSplitSize(e,t,r=0){let n=[];if("number"==typeof t)util_base_assert(e.shape[r]%t==0,()=>"Number of splits must evenly divide the axis."),n=Array(t).fill(e.shape[r]/t);else{let a=t.reduce((e,t)=>(-1===t&&(e+=1),e),0);util_base_assert(a<=1,()=>"There should be only one negative value in split array.");let i=t.indexOf(-1);if(-1!==i){let n=t.reduce((e,t)=>t>0?e+t:e);t[i]=e.shape[r]-n}util_base_assert(e.shape[r]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),n=t}return n}/**
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
  indices.shape[0] = ${e}`}function getSparseFillEmptyRowsNegativeIndexErrorMessage(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(e,t,r){return`indices(${e}, 0) is invalid: ${t} >= ${r}`}/**
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
 */function getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function getSparseReshapeNegativeOutputDimErrorMessage(e,t){return`size ${e} must be non-negative, not ${t}`}function getSparseReshapeEmptyTensorZeroOutputDimErrorMessage(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function getSparseReshapeInputOutputMultipleErrorMessage(e,t){let r=util_base_sizeFromShape(e),n=util_base_sizeFromShape(t);return`Input to reshape is a SparseTensor with ${r}
  dense values, but the requested shape requires a multiple of ${n}. inputShape=${e} outputShape= ${t}`}function getSparseReshapeInputOutputMismatchErrorMessage(e,t){let r=util_base_sizeFromShape(e),n=util_base_sizeFromShape(t);return`Input to reshape is a tensor with ${r} dense values, but the requested shape has ${n}. inputShape=${e} outputShape=${t}`}/**
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
 */function getSparseSegmentReductionNegativeSegmentIdsErrorMessage(){return"segment ids must be >= 0"}function getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage(){return"segment ids are not increasing"}function getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function getSparseSegmentReductionIndicesOutOfRangeErrorMessage(e,t,r){return`Bad: indices[${e}] == ${t} out of range [0, ${r})`}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function segOpComputeOptimalWindowSize(e,t){let r,n=!1;for(e<=nD?(r=e,n=!0):r=nearestDivisor(e,Math.floor(Math.sqrt(e)));!n;)r>t||r===e?n=!0:r=nearestDivisor(e,r+1);return r}function segment_util_computeOutShape(e,t,r){let n=[],a=e.length;for(let i=0;i<a;i++)i!==t?n.push(e[i]):n.push(r);return n}function collectGatherOpShapeInfo(e,t,r,n){let a=t.shape.length,i=e.shape.length;if(0!==n&&(n<-a||n>a))throw Error(`Expect batchDims in the range of [-${a}, ${a}], but got ${n}`);if(n<0&&(n+=a),n>i)throw Error(`batchDims (${n}) must be less than rank(x) (
    ${i}).`);if(r<n)throw Error(`batchDims (${n}) must be less than or equal to axis (${r}).`);for(let r=0;r<n;++r)if(e.shape[r]!==t.shape[r])throw Error(`x.shape[${r}]: ${e.shape[r]} should be equal to indices.shape[${r}]: ${t.shape[r]}.`);let o=e.shape[r],s=[],l=1,u=1,c=1;for(let t=0;t<n;++t)s.push(e.shape[t]),l*=e.shape[t];for(let t=n;t<r;t++)s.push(e.shape[t]),u*=e.shape[t];for(let e=n;e<a;e++)s.push(t.shape[e]);for(let t=r+1;t<i;t++)s.push(e.shape[t]),c*=e.shape[t];return{batchSize:l,sliceSize:c,outerSize:u,dimSize:o,outputShape:s}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fromUint8ToStringArray(e){try{return e.map(e=>decodeString(e))}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function fromStringArrayToUint8(e){return e.map(e=>encodeString(e))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function whereImpl(e,t){let r=[];for(let e=0;e<t.length;e++)t[e]&&r.push(e);let n=buffer(e,"int32"),a=buffer([r.length,e.length],"int32");for(let t=0;t<r.length;t++){let i=n.indexToLoc(r[t]),o=t*e.length;a.values.set(i,o)}return a.toTensor()}!/**
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
 */function(){for(let e of ni)!function(e,t,r){util_base_assert(null!=e.className,()=>"Class being registered does not have the static className property defined."),util_base_assert("string"==typeof e.className,()=>"className is required to be a string, but got type "+typeof e.className),util_base_assert(e.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),void 0===t&&(t="Custom"),void 0===r&&(r=e.className);let n=r,a=t+">"+n;SerializationMap.register(e),r9.set(a,e),ne.set(e,a)}(e)}()},81226:function(e,t){"use strict";t.byteLength=function(e){var t=getLens(e),r=t[0],n=t[1];return(r+n)*3/4-n},t.toByteArray=function(e){var t,r,i=getLens(e),o=i[0],s=i[1],l=new a((o+s)*3/4-s),u=0,c=s>0?o-4:o;for(r=0;r<c;r+=4)t=n[e.charCodeAt(r)]<<18|n[e.charCodeAt(r+1)]<<12|n[e.charCodeAt(r+2)]<<6|n[e.charCodeAt(r+3)],l[u++]=t>>16&255,l[u++]=t>>8&255,l[u++]=255&t;return 2===s&&(t=n[e.charCodeAt(r)]<<2|n[e.charCodeAt(r+1)]>>4,l[u++]=255&t),1===s&&(t=n[e.charCodeAt(r)]<<10|n[e.charCodeAt(r+1)]<<4|n[e.charCodeAt(r+2)]>>2,l[u++]=t>>8&255,l[u++]=255&t),l},t.fromByteArray=function(e){for(var t,n=e.length,a=n%3,i=[],o=0,s=n-a;o<s;o+=16383)i.push(function(e,t,n){for(var a,i=[],o=t;o<n;o+=3)i.push(r[(a=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]))>>18&63]+r[a>>12&63]+r[a>>6&63]+r[63&a]);return i.join("")}(e,o,o+16383>s?s:o+16383));return 1===a?i.push(r[(t=e[n-1])>>2]+r[t<<4&63]+"=="):2===a&&i.push(r[(t=(e[n-2]<<8)+e[n-1])>>10]+r[t>>4&63]+r[t<<2&63]+"="),i.join("")};for(var r=[],n=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,s=i.length;o<s;++o)r[o]=i[o],n[i.charCodeAt(o)]=o;function getLens(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},61900:function(e,t,r){"use strict";/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */let n=r(81226),a=r(47354),i="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function createBuffer(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,Buffer.prototype),t}function Buffer(e,t,r){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return allocUnsafe(e)}return from(e,t,r)}function from(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!Buffer.isEncoding(t))throw TypeError("Unknown encoding: "+t);let r=0|byteLength(e,t),n=createBuffer(r),a=n.write(e,t);return a!==r&&(n=n.slice(0,a)),n}(e,t);if(ArrayBuffer.isView(e))return function(e){if(isInstance(e,Uint8Array)){let t=new Uint8Array(e);return fromArrayBuffer(t.buffer,t.byteOffset,t.byteLength)}return fromArrayLike(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(isInstance(e,ArrayBuffer)||e&&isInstance(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(isInstance(e,SharedArrayBuffer)||e&&isInstance(e.buffer,SharedArrayBuffer)))return fromArrayBuffer(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return Buffer.from(n,t,r);let a=function(e){var t;if(Buffer.isBuffer(e)){let t=0|checked(e.length),r=createBuffer(t);return 0===r.length||e.copy(r,0,0,t),r}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?createBuffer(0):fromArrayLike(e):"Buffer"===e.type&&Array.isArray(e.data)?fromArrayLike(e.data):void 0}(e);if(a)return a;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return Buffer.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function assertSize(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromArrayLike(e){let t=e.length<0?0:0|checked(e.length),r=createBuffer(t);for(let n=0;n<t;n+=1)r[n]=255&e[n];return r}function fromArrayBuffer(e,t,r){let n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),Buffer.prototype),n}function checked(e){if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||isInstance(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let a=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(a)return n?-1:utf8ToBytes(e).length;t=(""+t).toLowerCase(),a=!0}}function slowToString(e,t,r){let a=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){let n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let a="";for(let n=t;n<r;++n)a+=l[e[n]];return a}(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let a=t;a<r;++a)n+=String.fromCharCode(127&e[a]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let a=t;a<r;++a)n+=String.fromCharCode(e[a]);return n}(this,t,r);case"base64":var i,o;return i=t,o=r,0===i&&o===this.length?n.fromByteArray(this):n.fromByteArray(this.slice(i,o));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){let n=e.slice(t,r),a="";for(let e=0;e<n.length-1;e+=2)a+=String.fromCharCode(n[e]+256*n[e+1]);return a}(this,t,r);default:if(a)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),a=!0}}function swap(e,t,r){let n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,a){var i;if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(i=r=+r)!=i&&(r=a?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(a)return -1;r=e.length-1}else if(r<0){if(!a)return -1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,a);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?a?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,a);throw TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,a){let i,o=1,s=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;o=2,s/=2,l/=2,r/=2}function read(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(a){let n=-1;for(i=r;i<s;i++)if(read(e,i)===read(t,-1===n?0:i-n)){if(-1===n&&(n=i),i-n+1===l)return n*o}else -1!==n&&(i-=i-n),n=-1}else for(r+l>s&&(r=s-l),i=r;i>=0;i--){let r=!0;for(let n=0;n<l;n++)if(read(e,i+n)!==read(t,n)){r=!1;break}if(r)return i}return -1}function utf8Slice(e,t,r){r=Math.min(e.length,r);let n=[],a=t;for(;a<r;){let t=e[a],i=null,o=t>239?4:t>223?3:t>191?2:1;if(a+o<=r){let r,n,s,l;switch(o){case 1:t<128&&(i=t);break;case 2:(192&(r=e[a+1]))==128&&(l=(31&t)<<6|63&r)>127&&(i=l);break;case 3:r=e[a+1],n=e[a+2],(192&r)==128&&(192&n)==128&&(l=(15&t)<<12|(63&r)<<6|63&n)>2047&&(l<55296||l>57343)&&(i=l);break;case 4:r=e[a+1],n=e[a+2],s=e[a+3],(192&r)==128&&(192&n)==128&&(192&s)==128&&(l=(15&t)<<18|(63&r)<<12|(63&n)<<6|63&s)>65535&&l<1114112&&(i=l)}}null===i?(i=65533,o=1):i>65535&&(i-=65536,n.push(i>>>10&1023|55296),i=56320|1023&i),n.push(i),a+=o}return function(e){let t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}function checkOffset(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,a,i){if(!Buffer.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>a||t<i)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function wrtBigUInt64LE(e,t,r,n,a){checkIntBI(t,n,a,e,r,7);let i=Number(t&BigInt(4294967295));e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i;let o=Number(t>>BigInt(32)&BigInt(4294967295));return e[r++]=o,o>>=8,e[r++]=o,o>>=8,e[r++]=o,o>>=8,e[r++]=o,r}function wrtBigUInt64BE(e,t,r,n,a){checkIntBI(t,n,a,e,r,7);let i=Number(t&BigInt(4294967295));e[r+7]=i,i>>=8,e[r+6]=i,i>>=8,e[r+5]=i,i>>=8,e[r+4]=i;let o=Number(t>>BigInt(32)&BigInt(4294967295));return e[r+3]=o,o>>=8,e[r+2]=o,o>>=8,e[r+1]=o,o>>=8,e[r]=o,r+8}function checkIEEE754(e,t,r,n,a,i){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function writeFloat(e,t,r,n,i){return t=+t,r>>>=0,i||checkIEEE754(e,t,r,4,34028234663852886e22,-34028234663852886e22),a.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,i){return t=+t,r>>>=0,i||checkIEEE754(e,t,r,8,17976931348623157e292,-17976931348623157e292),a.write(e,t,r,n,52,8),r+8}t.lW=Buffer,t.h2=50,Buffer.TYPED_ARRAY_SUPPORT=function(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(Buffer.prototype,"parent",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.buffer}}),Object.defineProperty(Buffer.prototype,"offset",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.byteOffset}}),Buffer.poolSize=8192,Buffer.from=function(e,t,r){return from(e,t,r)},Object.setPrototypeOf(Buffer.prototype,Uint8Array.prototype),Object.setPrototypeOf(Buffer,Uint8Array),Buffer.alloc=function(e,t,r){return(assertSize(e),e<=0)?createBuffer(e):void 0!==t?"string"==typeof r?createBuffer(e).fill(t,r):createBuffer(e).fill(t):createBuffer(e)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==Buffer.prototype},Buffer.compare=function(e,t){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),isInstance(t,Uint8Array)&&(t=Buffer.from(t,t.offset,t.byteLength)),!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,n=t.length;for(let a=0,i=Math.min(r,n);a<i;++a)if(e[a]!==t[a]){r=e[a],n=t[a];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){let r;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;let n=Buffer.allocUnsafe(t),a=0;for(r=0;r<e.length;++r){let t=e[r];if(isInstance(t,Uint8Array))a+t.length>n.length?(Buffer.isBuffer(t)||(t=Buffer.from(t)),t.copy(n,a)):Uint8Array.prototype.set.call(n,t,a);else if(Buffer.isBuffer(t))t.copy(n,a);else throw TypeError('"list" argument must be an Array of Buffers');a+=t.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.toLocaleString=Buffer.prototype.toString,Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){let e="",r=t.h2;return e=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(e+=" ... "),"<Buffer "+e+">"},i&&(Buffer.prototype[i]=Buffer.prototype.inspect),Buffer.prototype.compare=function(e,t,r,n,a){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),!Buffer.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===a&&(a=this.length),t<0||r>e.length||n<0||a>this.length)throw RangeError("out of range index");if(n>=a&&t>=r)return 0;if(n>=a)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,a>>>=0,this===e)return 0;let i=a-n,o=r-t,s=Math.min(i,o),l=this.slice(n,a),u=e.slice(t,r);for(let e=0;e<s;++e)if(l[e]!==u[e]){i=l[e],o=u[e];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function(e,t,r,n){var a,i,o,s,l,u,c,d;if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let h=this.length-t;if((void 0===r||r>h)&&(r=h),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let f=!1;for(;;)switch(n){case"hex":return function(e,t,r,n){let a;r=Number(r)||0;let i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;let o=t.length;for(n>o/2&&(n=o/2),a=0;a<n;++a){let n=parseInt(t.substr(2*a,2),16);if(n!=n)break;e[r+a]=n}return a}(this,e,t,r);case"utf8":case"utf-8":return a=t,i=r,blitBuffer(utf8ToBytes(e,this.length-a),this,a,i);case"ascii":case"latin1":case"binary":return o=t,s=r,blitBuffer(function(e){let t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(e),this,o,s);case"base64":return l=t,u=r,blitBuffer(base64ToBytes(e),this,l,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return c=t,d=r,blitBuffer(function(e,t){let r,n;let a=[];for(let i=0;i<e.length&&!((t-=2)<0);++i)n=(r=e.charCodeAt(i))>>8,a.push(r%256),a.push(n);return a}(e,this.length-c),this,c,d);default:if(f)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),f=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},Buffer.prototype.slice=function(e,t){let r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);let n=this.subarray(e,t);return Object.setPrototypeOf(n,Buffer.prototype),n},Buffer.prototype.readUintLE=Buffer.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);let n=this[e],a=1,i=0;for(;++i<t&&(a*=256);)n+=this[e+i]*a;return n},Buffer.prototype.readUintBE=Buffer.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);let n=this[e+--t],a=1;for(;t>0&&(a*=256);)n+=this[e+--t]*a;return n},Buffer.prototype.readUint8=Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUint16LE=Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUint16BE=Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUint32LE=Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUint32BE=Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readBigUInt64LE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&boundsError(e,this.length-8);let n=t+256*this[++e]+65536*this[++e]+16777216*this[++e],a=this[++e]+256*this[++e]+65536*this[++e]+16777216*r;return BigInt(n)+(BigInt(a)<<BigInt(32))}),Buffer.prototype.readBigUInt64BE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&boundsError(e,this.length-8);let n=16777216*t+65536*this[++e]+256*this[++e]+this[++e],a=16777216*this[++e]+65536*this[++e]+256*this[++e]+r;return(BigInt(n)<<BigInt(32))+BigInt(a)}),Buffer.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);let n=this[e],a=1,i=0;for(;++i<t&&(a*=256);)n+=this[e+i]*a;return n>=(a*=128)&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);let n=t,a=1,i=this[e+--n];for(;n>0&&(a*=256);)i+=this[e+--n]*a;return i>=(a*=128)&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return(e>>>=0,t||checkOffset(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);let r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);let r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readBigInt64LE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&boundsError(e,this.length-8);let n=this[e+4]+256*this[e+5]+65536*this[e+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+16777216*this[++e])}),Buffer.prototype.readBigInt64BE=defineBigIntMethod(function(e){validateNumber(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&boundsError(e,this.length-8);let n=(t<<24)+65536*this[++e]+256*this[++e]+this[++e];return(BigInt(n)<<BigInt(32))+BigInt(16777216*this[++e]+65536*this[++e]+256*this[++e]+r)}),Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),a.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),a.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),a.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),a.read(this,e,!1,52,8)},Buffer.prototype.writeUintLE=Buffer.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;checkInt(this,e,t,r,n,0)}let a=1,i=0;for(this[t]=255&e;++i<r&&(a*=256);)this[t+i]=e/a&255;return t+r},Buffer.prototype.writeUintBE=Buffer.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;checkInt(this,e,t,r,n,0)}let a=r-1,i=1;for(this[t+a]=255&e;--a>=0&&(i*=256);)this[t+a]=e/i&255;return t+r},Buffer.prototype.writeUint8=Buffer.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUint16LE=Buffer.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUint16BE=Buffer.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUint32LE=Buffer.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUint32BE=Buffer.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeBigUInt64LE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64LE(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),Buffer.prototype.writeBigUInt64BE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64BE(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),Buffer.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);checkInt(this,e,t,r,n-1,-n)}let a=0,i=1,o=0;for(this[t]=255&e;++a<r&&(i*=256);)e<0&&0===o&&0!==this[t+a-1]&&(o=1),this[t+a]=(e/i>>0)-o&255;return t+r},Buffer.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);checkInt(this,e,t,r,n-1,-n)}let a=r-1,i=1,o=0;for(this[t+a]=255&e;--a>=0&&(i*=256);)e<0&&0===o&&0!==this[t+a+1]&&(o=1),this[t+a]=(e/i>>0)-o&255;return t+r},Buffer.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeBigInt64LE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64LE(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),Buffer.prototype.writeBigInt64BE=defineBigIntMethod(function(e,t=0){return wrtBigUInt64BE(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),Buffer.prototype.writeFloatLE=function(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function(e,t,r,n){if(!Buffer.isBuffer(e))throw TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);let a=n-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,n):Uint8Array.prototype.set.call(e,this.subarray(r,n),t),a},Buffer.prototype.fill=function(e,t,r,n){let a;if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){let t=e.charCodeAt(0);("utf8"===n&&t<128||"latin1"===n)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(a=t;a<r;++a)this[a]=e;else{let i=Buffer.isBuffer(e)?e:Buffer.from(e,n),o=i.length;if(0===o)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(a=0;a<r-t;++a)this[a+t]=i[a%o]}return this};let o={};function E(e,t,r){o[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function addNumericalSeparator(e){let t="",r=e.length,n="-"===e[0]?1:0;for(;r>=n+4;r-=3)t=`_${e.slice(r-3,r)}${t}`;return`${e.slice(0,r)}${t}`}function checkIntBI(e,t,r,n,a,i){if(e>r||e<t){let n;let a="bigint"==typeof t?"n":"";throw n=i>3?0===t||t===BigInt(0)?`>= 0${a} and < 2${a} ** ${(i+1)*8}${a}`:`>= -(2${a} ** ${(i+1)*8-1}${a}) and < 2 ** ${(i+1)*8-1}${a}`:`>= ${t}${a} and <= ${r}${a}`,new o.ERR_OUT_OF_RANGE("value",n,e)}validateNumber(a,"offset"),(void 0===n[a]||void 0===n[a+i])&&boundsError(a,n.length-(i+1))}function validateNumber(e,t){if("number"!=typeof e)throw new o.ERR_INVALID_ARG_TYPE(t,"number",e)}function boundsError(e,t,r){if(Math.floor(e)!==e)throw validateNumber(e,r),new o.ERR_OUT_OF_RANGE(r||"offset","an integer",e);if(t<0)throw new o.ERR_BUFFER_OUT_OF_BOUNDS;throw new o.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${t}`,e)}E("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),E("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),E("ERR_OUT_OF_RANGE",function(e,t,r){let n=`The value of "${e}" is out of range.`,a=r;return Number.isInteger(r)&&Math.abs(r)>4294967296?a=addNumericalSeparator(String(r)):"bigint"==typeof r&&(a=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(a=addNumericalSeparator(a)),a+="n"),n+=` It must be ${t}. Received ${a}`},RangeError);let s=/[^+/0-9A-Za-z-_]/g;function utf8ToBytes(e,t){let r;t=t||1/0;let n=e.length,a=null,i=[];for(let o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!a){if(r>56319||o+1===n){(t-=3)>-1&&i.push(239,191,189);continue}a=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),a=r;continue}r=(a-55296<<10|r-56320)+65536}else a&&(t-=3)>-1&&i.push(239,191,189);if(a=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return i}function base64ToBytes(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(s,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function blitBuffer(e,t,r,n){let a;for(a=0;a<n&&!(a+r>=t.length)&&!(a>=e.length);++a)t[a+r]=e[a];return a}function isInstance(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}let l=function(){let e="0123456789abcdef",t=Array(256);for(let r=0;r<16;++r){let n=16*r;for(let a=0;a<16;++a)t[n+a]=e[r]+e[a]}return t}();function defineBigIntMethod(e){return"undefined"==typeof BigInt?BufferBigIntNotDefined:e}function BufferBigIntNotDefined(){throw Error("BigInt not supported")}},47354:function(e,t){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */t.read=function(e,t,r,n,a){var i,o,s=8*a-n-1,l=(1<<s)-1,u=l>>1,c=-7,d=r?a-1:0,h=r?-1:1,f=e[t+d];for(d+=h,i=f&(1<<-c)-1,f>>=-c,c+=s;c>0;i=256*i+e[t+d],d+=h,c-=8);for(o=i&(1<<-c)-1,i>>=-c,c+=n;c>0;o=256*o+e[t+d],d+=h,c-=8);if(0===i)i=1-u;else{if(i===l)return o?NaN:(f?-1:1)*(1/0);o+=Math.pow(2,n),i-=u}return(f?-1:1)*o*Math.pow(2,i-n)},t.write=function(e,t,r,n,a,i){var o,s,l,u=8*i-a-1,c=(1<<u)-1,d=c>>1,h=23===a?5960464477539062e-23:0,f=n?0:i-1,p=n?1:-1,m=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(s=isNaN(t)?1:0,o=c):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+d>=1?t+=h/l:t+=h*Math.pow(2,1-d),t*l>=2&&(o++,l/=2),o+d>=c?(s=0,o=c):o+d>=1?(s=(t*l-1)*Math.pow(2,a),o+=d):(s=t*Math.pow(2,d-1)*Math.pow(2,a),o=0));a>=8;e[r+f]=255&s,f+=p,s/=256,a-=8);for(o=o<<a|s,u+=a;u>0;e[r+f]=255&o,f+=p,o/=256,u-=8);e[r+f-p]|=128*m}},6017:function(e){e.exports=Long;var t=null;try{t=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}function Long(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function isLong(e){return!0===(e&&e.__isLong__)}Long.prototype.__isLong__,Object.defineProperty(Long.prototype,"__isLong__",{value:!0}),Long.isLong=isLong;var r={},n={};function fromInt(e,t){var a,i,o;return t?(e>>>=0,(o=0<=e&&e<256)&&(i=n[e]))?i:(a=fromBits(e,(0|e)<0?-1:0,!0),o&&(n[e]=a),a):(e|=0,(o=-128<=e&&e<128)&&(i=r[e]))?i:(a=fromBits(e,e<0?-1:0,!1),o&&(r[e]=a),a)}function fromNumber(e,t){if(isNaN(e))return t?c:u;if(t){if(e<0)return c;if(e>=o)return m}else{if(e<=-s)return g;if(e+1>=s)return p}return e<0?fromNumber(-e,t).neg():fromBits(e%i|0,e/i|0,t)}function fromBits(e,t,r){return new Long(e,t,r)}Long.fromInt=fromInt,Long.fromNumber=fromNumber,Long.fromBits=fromBits;var a=Math.pow;function fromString(e,t,r){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return u;if("number"==typeof t?(r=t,t=!1):t=!!t,(r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return fromString(e.substring(1),t,r).neg();for(var n,i=fromNumber(a(r,8)),o=u,s=0;s<e.length;s+=8){var l=Math.min(8,e.length-s),c=parseInt(e.substring(s,s+l),r);if(l<8){var d=fromNumber(a(r,l));o=o.mul(d).add(fromNumber(c))}else o=(o=o.mul(i)).add(fromNumber(c))}return o.unsigned=t,o}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}Long.fromString=fromString,Long.fromValue=fromValue;var i=4294967296,o=18446744073709552e3,s=0x7fffffffffffffff,l=fromInt(16777216),u=fromInt(0);Long.ZERO=u;var c=fromInt(0,!0);Long.UZERO=c;var d=fromInt(1);Long.ONE=d;var h=fromInt(1,!0);Long.UONE=h;var f=fromInt(-1);Long.NEG_ONE=f;var p=fromBits(-1,2147483647,!1);Long.MAX_VALUE=p;var m=fromBits(-1,-1,!0);Long.MAX_UNSIGNED_VALUE=m;var g=fromBits(0,-2147483648,!1);Long.MIN_VALUE=g;var y=Long.prototype;y.toInt=function(){return this.unsigned?this.low>>>0:this.low},y.toNumber=function(){return this.unsigned?(this.high>>>0)*i+(this.low>>>0):this.high*i+(this.low>>>0)},y.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(!this.eq(g))return"-"+this.neg().toString(e);var t=fromNumber(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var i=fromNumber(a(e,6),this.unsigned),o=this,s="";;){var l=o.div(i),u=(o.sub(l.mul(i)).toInt()>>>0).toString(e);if((o=l).isZero())return u+s;for(;u.length<6;)u="0"+u;s=""+u+s}},y.getHighBits=function(){return this.high},y.getHighBitsUnsigned=function(){return this.high>>>0},y.getLowBits=function(){return this.low},y.getLowBitsUnsigned=function(){return this.low>>>0},y.getNumBitsAbs=function(){if(this.isNegative())return this.eq(g)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},y.isZero=function(){return 0===this.high&&0===this.low},y.eqz=y.isZero,y.isNegative=function(){return!this.unsigned&&this.high<0},y.isPositive=function(){return this.unsigned||this.high>=0},y.isOdd=function(){return(1&this.low)==1},y.isEven=function(){return(1&this.low)==0},y.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},y.eq=y.equals,y.notEquals=function(e){return!this.eq(e)},y.neq=y.notEquals,y.ne=y.notEquals,y.lessThan=function(e){return 0>this.comp(e)},y.lt=y.lessThan,y.lessThanOrEqual=function(e){return 0>=this.comp(e)},y.lte=y.lessThanOrEqual,y.le=y.lessThanOrEqual,y.greaterThan=function(e){return this.comp(e)>0},y.gt=y.greaterThan,y.greaterThanOrEqual=function(e){return this.comp(e)>=0},y.gte=y.greaterThanOrEqual,y.ge=y.greaterThanOrEqual,y.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},y.comp=y.compare,y.negate=function(){return!this.unsigned&&this.eq(g)?g:this.not().add(d)},y.neg=y.negate,y.add=function(e){isLong(e)||(e=fromValue(e));var t,r,n=this.high>>>16,a=65535&this.high,i=this.low>>>16,o=65535&this.low,s=e.high>>>16,l=65535&e.high,u=e.low>>>16,c=65535&e.low,d=0,h=0;return t=0+((r=0+(o+c))>>>16),r&=65535,t+=i+u,h+=t>>>16,t&=65535,h+=a+l,d+=h>>>16,h&=65535,d+=n+s,fromBits(t<<16|r,(d&=65535)<<16|h,this.unsigned)},y.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},y.sub=y.subtract,y.multiply=function(e){if(this.isZero())return u;if(isLong(e)||(e=fromValue(e)),t)return fromBits(t.mul(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned);if(e.isZero())return u;if(this.eq(g))return e.isOdd()?g:u;if(e.eq(g))return this.isOdd()?g:u;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(l)&&e.lt(l))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var r,n,a=this.high>>>16,i=65535&this.high,o=this.low>>>16,s=65535&this.low,c=e.high>>>16,d=65535&e.high,h=e.low>>>16,f=65535&e.low,p=0,m=0;return r=0+((n=0+s*f)>>>16),n&=65535,r+=o*f,m+=r>>>16,r&=65535,r+=s*h,m+=r>>>16,r&=65535,m+=i*f,p+=m>>>16,m&=65535,m+=o*h,p+=m>>>16,m&=65535,m+=s*d,p+=m>>>16,m&=65535,p+=a*f+i*h+o*d+s*c,fromBits(r<<16|n,(p&=65535)<<16|m,this.unsigned)},y.mul=y.multiply,y.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(t){var r,n,i;return this.unsigned||-2147483648!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?t.div_u:t.div_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?c:u;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return c;if(e.gt(this.shru(1)))return h;i=c}else{if(this.eq(g))return e.eq(d)||e.eq(f)?g:e.eq(g)?d:(r=this.shr(1).div(e).shl(1)).eq(u)?e.isNegative()?d:f:(n=this.sub(e.mul(r)),i=r.add(n.div(e)));if(e.eq(g))return this.unsigned?c:u;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=u}for(n=this;n.gte(e);){for(var o=Math.ceil(Math.log(r=Math.max(1,Math.floor(n.toNumber()/e.toNumber())))/Math.LN2),s=o<=48?1:a(2,o-48),l=fromNumber(r),p=l.mul(e);p.isNegative()||p.gt(n);)r-=s,p=(l=fromNumber(r,this.unsigned)).mul(e);l.isZero()&&(l=d),i=i.add(l),n=n.sub(p)}return i},y.div=y.divide,y.modulo=function(e){return(isLong(e)||(e=fromValue(e)),t)?fromBits((this.unsigned?t.rem_u:t.rem_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},y.mod=y.modulo,y.rem=y.modulo,y.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},y.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},y.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},y.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},y.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},y.shl=y.shiftLeft,y.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},y.shr=y.shiftRight,y.shiftRightUnsigned=function(e){if(isLong(e)&&(e=e.toInt()),0==(e&=63))return this;var t=this.high;return e<32?fromBits(this.low>>>e|t<<32-e,t>>>e,this.unsigned):32===e?fromBits(t,0,this.unsigned):fromBits(t>>>e-32,0,this.unsigned)},y.shru=y.shiftRightUnsigned,y.shr_u=y.shiftRightUnsigned,y.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},y.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},y.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},y.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},y.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long.fromBytes=function(e,t,r){return r?Long.fromBytesLE(e,t):Long.fromBytesBE(e,t)},Long.fromBytesLE=function(e,t){return new Long(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long.fromBytesBE=function(e,t){return new Long(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}},89145:function(e,t){"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=Symbol.for("react.element"),n=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),u=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.default_value"),m=Symbol.iterator,g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y=Object.assign,x={};function G(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||g}function H(){}function I(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||g}G.prototype.isReactComponent={},G.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},G.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},H.prototype=G.prototype;var b=I.prototype=new H;b.constructor=I,y(b,G.prototype),b.isPureReactComponent=!0;var v=Array.isArray,C=Object.prototype.hasOwnProperty,w={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function O(e,t,n){var a,i={},o=null,s=null;if(null!=t)for(a in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(o=""+t.key),t)C.call(t,a)&&!_.hasOwnProperty(a)&&(i[a]=t[a]);var l=arguments.length-2;if(1===l)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(e&&e.defaultProps)for(a in l=e.defaultProps)void 0===i[a]&&(i[a]=l[a]);return{$$typeof:r,type:e,key:o,ref:s,props:i,_owner:w.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var k=/\/+/g;function R(e,t){var r,n;return"object"==typeof e&&null!==e&&null!=e.key?(r=""+e.key,n={"=":"=0",":":"=2"},"$"+r.replace(/[=:]/g,function(e){return n[e]})):t.toString(36)}function T(e,t,a){if(null==e)return e;var i=[],o=0;return!function S(e,t,a,i,o){var s,l,u,c=typeof e;("undefined"===c||"boolean"===c)&&(e=null);var d=!1;if(null===e)d=!0;else switch(c){case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case r:case n:d=!0}}if(d)return o=o(d=e),e=""===i?"."+R(d,0):i,v(o)?(a="",null!=e&&(a=e.replace(k,"$&/")+"/"),S(o,t,a,"",function(e){return e})):null!=o&&(P(o)&&(s=o,l=a+(!o.key||d&&d.key===o.key?"":(""+o.key).replace(k,"$&/")+"/")+e,o={$$typeof:r,type:s.type,key:l,ref:s.ref,props:s.props,_owner:s._owner}),t.push(o)),1;if(d=0,i=""===i?".":i+":",v(e))for(var h=0;h<e.length;h++){var f=i+R(c=e[h],h);d+=S(c,t,a,f,o)}else if("function"==typeof(f=null===(u=e)||"object"!=typeof u?null:"function"==typeof(u=m&&u[m]||u["@@iterator"])?u:null))for(e=f.call(e),h=0;!(c=e.next()).done;)f=i+R(c=c.value,h++),d+=S(c,t,a,f,o);else if("object"===c)throw Error("Objects are not valid as a React child (found: "+("[object Object]"===(t=String(e))?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return d}(e,i,"","",function(e){return t.call(a,e,o++)}),i}function ba(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){(0===e._status||-1===e._status)&&(e._status=1,e._result=t)},function(t){(0===e._status||-1===e._status)&&(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var $={current:null};function ca(){return new WeakMap}function V(){return{s:0,v:void 0,o:null,p:null}}var A={current:null},N={transition:null},F={ReactCurrentDispatcher:A,ReactCurrentCache:$,ReactCurrentBatchConfig:N,ReactCurrentOwner:w,ContextRegistry:{}},D=F.ContextRegistry;t.Children={map:T,forEach:function(e,t,r){T(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return T(e,function(){t++}),t},toArray:function(e){return T(e,function(e){return e})||[]},only:function(e){if(!P(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=G,t.Fragment=a,t.Profiler=o,t.PureComponent=I,t.StrictMode=i,t.Suspense=d,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F,t.cache=function(e){return function(){var t=$.current;if(!t)return e.apply(null,arguments);var r=t.getCacheForType(ca);void 0===(t=r.get(e))&&(t=V(),r.set(e,t)),r=0;for(var n=arguments.length;r<n;r++){var a=arguments[r];if("function"==typeof a||"object"==typeof a&&null!==a){var i=t.o;null===i&&(t.o=i=new WeakMap),void 0===(t=i.get(a))&&(t=V(),i.set(a,t))}else null===(i=t.p)&&(t.p=i=new Map),void 0===(t=i.get(a))&&(t=V(),i.set(a,t))}if(1===t.s)return t.v;if(2===t.s)throw t.v;try{var o=e.apply(null,arguments);return(r=t).s=1,r.v=o}catch(e){throw(o=t).s=2,o.v=e,e}}},t.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=y({},e.props),i=e.key,o=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,s=w.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)C.call(t,u)&&!_.hasOwnProperty(u)&&(a[u]=void 0===t[u]&&void 0!==l?l[u]:t[u])}var u=arguments.length-2;if(1===u)a.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];a.children=l}return{$$typeof:r,type:e.type,key:i,ref:o,props:a,_owner:s}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},t.createElement=O,t.createFactory=function(e){var t=O.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.createServerContext=function(e,t){var r=!0;if(!D[e]){r=!1;var n={$$typeof:u,_currentValue:t,_currentValue2:t,_defaultValue:t,_threadCount:0,Provider:null,Consumer:null,_globalName:e};n.Provider={$$typeof:s,_context:n},D[e]=n}if((n=D[e])._defaultValue===p)n._defaultValue=t,n._currentValue===p&&(n._currentValue=t),n._currentValue2===p&&(n._currentValue2=t);else if(r)throw Error("ServerContext: "+e+" already defined");return n},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=P,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:ba}},t.memo=function(e,t){return{$$typeof:h,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=N.transition;N.transition={};try{e()}finally{N.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.unstable_useCacheRefresh=function(){return A.current.useCacheRefresh()},t.use=function(e){return A.current.use(e)},t.useCallback=function(e,t){return A.current.useCallback(e,t)},t.useContext=function(e){return A.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return A.current.useDeferredValue(e)},t.useEffect=function(e,t){return A.current.useEffect(e,t)},t.useId=function(){return A.current.useId()},t.useImperativeHandle=function(e,t,r){return A.current.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return A.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return A.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return A.current.useMemo(e,t)},t.useReducer=function(e,t,r){return A.current.useReducer(e,t,r)},t.useRef=function(e){return A.current.useRef(e)},t.useState=function(e){return A.current.useState(e)},t.useSyncExternalStore=function(e,t,r){return A.current.useSyncExternalStore(e,t,r)},t.useTransition=function(){return A.current.useTransition()},t.version="18.3.0-canary-d900fadbf-20230929"},39164:function(e,t,r){"use strict";e.exports=r(89145)},23377:function(e,t,r){"use strict";r.d(t,{x:function(){return u}});var n=r(90701),a=r(15101),i=r(18343),o=r(46642),s=r(97475),l=r(67155),u=function(e){function Subject(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return(0,n.ZT)(Subject,e),Subject.prototype.lift=function(e){var t=new c(this,this);return t.operator=e,t},Subject.prototype._throwIfClosed=function(){if(this.closed)throw new o.N},Subject.prototype.next=function(e){var t=this;(0,l.x)(function(){var r,a;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||(t.currentObservers=Array.from(t.observers));try{for(var i=(0,n.XA)(t.currentObservers),o=i.next();!o.done;o=i.next())o.value.next(e)}catch(e){r={error:e}}finally{try{o&&!o.done&&(a=i.return)&&a.call(i)}finally{if(r)throw r.error}}}})},Subject.prototype.error=function(e){var t=this;(0,l.x)(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var r=t.observers;r.length;)r.shift().error(e)}})},Subject.prototype.complete=function(){var e=this;(0,l.x)(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},Subject.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(Subject.prototype,"observed",{get:function(){var e;return(null===(e=this.observers)||void 0===e?void 0:e.length)>0},enumerable:!1,configurable:!0}),Subject.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},Subject.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},Subject.prototype._innerSubscribe=function(e){var t=this,r=this.hasError,n=this.isStopped,a=this.observers;return r||n?i.Lc:(this.currentObservers=null,a.push(e),new i.w0(function(){t.currentObservers=null,(0,s.P)(a,e)}))},Subject.prototype._checkFinalizedStatuses=function(e){var t=this.hasError,r=this.thrownError,n=this.isStopped;t?e.error(r):n&&e.complete()},Subject.prototype.asObservable=function(){var e=new a.y;return e.source=this,e},Subject.create=function(e,t){return new c(e,t)},Subject}(a.y),c=function(e){function AnonymousSubject(t,r){var n=e.call(this)||this;return n.destination=t,n.source=r,n}return(0,n.ZT)(AnonymousSubject,e),AnonymousSubject.prototype.next=function(e){var t,r;null===(r=null===(t=this.destination)||void 0===t?void 0:t.next)||void 0===r||r.call(t,e)},AnonymousSubject.prototype.error=function(e){var t,r;null===(r=null===(t=this.destination)||void 0===t?void 0:t.error)||void 0===r||r.call(t,e)},AnonymousSubject.prototype.complete=function(){var e,t;null===(t=null===(e=this.destination)||void 0===e?void 0:e.complete)||void 0===t||t.call(e)},AnonymousSubject.prototype._subscribe=function(e){var t,r;return null!==(r=null===(t=this.source)||void 0===t?void 0:t.subscribe(e))&&void 0!==r?r:i.Lc},AnonymousSubject}(u)},8873:function(e,t,r){"use strict";r.d(t,{T:function(){return merge}});var n=r(53692),a=r(3995),i=r(55044),o=r(21123),s=r(62434);function merge(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=(0,o.yG)(e),l=(0,o._6)(e,1/0);return e.length?1===e.length?(0,a.Xf)(e[0]):(0,n.J)(l)((0,s.D)(e,r)):i.E}},14444:function(e,t,r){"use strict";r.d(t,{R:function(){return scan}});var n=r(32782),a=r(73392);function scan(e,t){var r;return(0,n.e)((r=arguments.length>=2,function(n,i){var o=r,s=t,l=0;n.subscribe((0,a.x)(i,function(t){var r=l++;s=o?e(s,t,r):(o=!0,t),i.next(s)},void 0))}))}},93660:function(e,t,r){"use strict";r.d(t,{d:function(){return shareReplay}});var n=r(65827),a=r(85092);function shareReplay(e,t,r){var i,o,s,l,u=!1;return e&&"object"==typeof e?(l=void 0===(i=e.bufferSize)?1/0:i,t=void 0===(o=e.windowTime)?1/0:o,u=void 0!==(s=e.refCount)&&s,r=e.scheduler):l=null!=e?e:1/0,(0,a.B)({connector:function(){return new n.t(l,t,r)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:u})}},48804:function(e,t,r){"use strict";r.d(t,{w:function(){return switchMap}});var n=r(3995),a=r(32782),i=r(73392);function switchMap(e,t){return(0,a.e)(function(r,a){var o=null,s=0,l=!1,checkComplete=function(){return l&&!o&&a.complete()};r.subscribe((0,i.x)(a,function(r){null==o||o.unsubscribe();var l=0,u=s++;(0,n.Xf)(e(r,u)).subscribe(o=(0,i.x)(a,function(e){return a.next(t?t(r,e,u,l++):e)},function(){o=null,checkComplete()}))},function(){l=!0,checkComplete()}))})}},7158:function(e,t,r){"use strict";r.d(t,{w:function(){return switchScan}});var n=r(48804),a=r(32782);function switchScan(e,t){return(0,a.e)(function(r,a){var i=t;return(0,n.w)(function(t,r){return e(i,t,r)},function(e,t){return i=t,t})(r).subscribe(a),function(){i=null}})}},77446:function(e,t,r){"use strict";r.d(t,{P:function(){return throttle}});var n=r(32782),a=r(73392),i=r(3995);function throttle(e,t){return(0,n.e)(function(r,n){var o=null!=t?t:{},s=o.leading,l=void 0===s||s,u=o.trailing,c=void 0!==u&&u,d=!1,h=null,f=null,p=!1,endThrottling=function(){null==f||f.unsubscribe(),f=null,c&&(send(),p&&n.complete())},cleanupThrottling=function(){f=null,p&&n.complete()},startThrottle=function(t){return f=(0,i.Xf)(e(t)).subscribe((0,a.x)(n,endThrottling,cleanupThrottling))},send=function(){if(d){d=!1;var e=h;h=null,n.next(e),p||startThrottle(e)}};r.subscribe((0,a.x)(n,function(e){d=!0,h=e,f&&!f.closed||(l?send():startThrottle(e))},function(){p=!0,c&&d&&f&&!f.closed||n.complete()}))})}},68131:function(e,t,r){"use strict";r.d(t,{z:function(){return a}});var n=r(77303),a=new(r(19142)).v(n.o)},21123:function(e,t,r){"use strict";r.d(t,{_6:function(){return popNumber},yG:function(){return popScheduler}});var n=r(20431);function last(e){return e[e.length-1]}function popScheduler(e){return(0,n.K)(last(e))?e.pop():void 0}function popNumber(e,t){return"number"==typeof last(e)?e.pop():t}},89727:function(e,t,r){"use strict";r.d(t,{U:function(){return pipeFromArray},z:function(){return pipe}});var n=r(40438);function pipe(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return pipeFromArray(e)}function pipeFromArray(e){return 0===e.length?n.y:1===e.length?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}},10158:function(e,t,r){"use strict";r.d(t,{YX:function(){return runWorker}});var n=r(89098),a=r(62434),i=r(20498),o=r(64772),s=r(29130),l=r(71708),u=r(29445);function runWorker(e){let t=new e,r=(0,i.R)(self,"message");return(function(e,t){let r=t.pipe((0,o.U)(e=>new n.P_(e.data.kind,e.data.value,e.data.error)),(0,s.D)());return e.workUnit?r.pipe((0,l.b)(t=>(0,a.D)(e.workUnit(t)).pipe((0,u.i)()))):e.work(r).pipe((0,u.i)())})(t,r).subscribe(e=>{let r=postMessage;t.selectTransferables&&e.hasValue?r(e,t.selectTransferables(e.value)):r(e)})}},90701:function(e,t,r){"use strict";r.d(t,{CR:function(){return __read},FC:function(){return __asyncGenerator},Jh:function(){return __generator},KL:function(){return __asyncValues},XA:function(){return __values},ZT:function(){return __extends},ev:function(){return __spreadArray},mG:function(){return __awaiter},qq:function(){return __await}});var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(a,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?a(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})}function __generator(e,t){var r,n,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(s){return function(l){return function(s){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&s[0]?n.return:s[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,s[1])).done)return a;switch(n=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,n=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===s[0]||2===s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],n=0}finally{r=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,i=r.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(a)throw a.error}}return o}function __spreadArray(e,t,r){if(r||2==arguments.length)for(var n,a=0,i=t.length;a<i;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}function __await(e){return this instanceof __await?(this.v=e,this):new __await(e)}function __asyncGenerator(e,t,r){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var n,a=r.apply(e,t||[]),i=[];return n={},verb("next"),verb("throw"),verb("return"),n[Symbol.asyncIterator]=function(){return this},n;function verb(e){a[e]&&(n[e]=function(t){return new Promise(function(r,n){i.push([e,t,r,n])>1||resume(e,t)})})}function resume(e,t){try{var r;(r=a[e](t)).value instanceof __await?Promise.resolve(r.value.v).then(fulfill,reject):settle(i[0][2],r)}catch(e){settle(i[0][3],e)}}function fulfill(e){resume("next",e)}function reject(e){resume("throw",e)}function settle(e,t){e(t),i.shift(),i.length&&resume(i[0][0],i[0][1])}}function __asyncValues(e){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=__values(e),t={},verb("next"),verb("throw"),verb("return"),t[Symbol.asyncIterator]=function(){return this},t);function verb(r){t[r]=e[r]&&function(t){return new Promise(function(n,a){!function(e,t,r,n){Promise.resolve(n).then(function(t){e({value:t,done:r})},t)}(n,a,(t=e[r](t)).done,t.value)})}}}"function"==typeof SuppressedError&&SuppressedError},94594:function(e,t,r){"use strict";let n;r.d(t,{z:function(){return ep}}),(es=ec||(ec={})).assertEqual=e=>e,es.assertIs=function(e){},es.assertNever=function(e){throw Error()},es.arrayToEnum=e=>{let t={};for(let r of e)t[r]=r;return t},es.getValidEnumValues=e=>{let t=es.objectKeys(e).filter(t=>"number"!=typeof e[e[t]]),r={};for(let n of t)r[n]=e[n];return es.objectValues(r)},es.objectValues=e=>es.objectKeys(e).map(function(t){return e[t]}),es.objectKeys="function"==typeof Object.keys?e=>Object.keys(e):e=>{let t=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t},es.find=(e,t)=>{for(let r of e)if(t(r))return r},es.isInteger="function"==typeof Number.isInteger?e=>Number.isInteger(e):e=>"number"==typeof e&&isFinite(e)&&Math.floor(e)===e,es.joinValues=function(e,t=" | "){return e.map(e=>"string"==typeof e?`'${e}'`:e).join(t)},es.jsonStringifyReplacer=(e,t)=>"bigint"==typeof t?t.toString():t,(ed||(ed={})).mergeShapes=(e,t)=>({...e,...t});let a=ec.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),getParsedType=e=>{let t=typeof e;switch(t){case"undefined":return a.undefined;case"string":return a.string;case"number":return isNaN(e)?a.nan:a.number;case"boolean":return a.boolean;case"function":return a.function;case"bigint":return a.bigint;case"symbol":return a.symbol;case"object":if(Array.isArray(e))return a.array;if(null===e)return a.null;if(e.then&&"function"==typeof e.then&&e.catch&&"function"==typeof e.catch)return a.promise;if("undefined"!=typeof Map&&e instanceof Map)return a.map;if("undefined"!=typeof Set&&e instanceof Set)return a.set;if("undefined"!=typeof Date&&e instanceof Date)return a.date;return a.object;default:return a.unknown}},i=ec.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);let ZodError=class ZodError extends Error{constructor(e){super(),this.issues=[],this.addIssue=e=>{this.issues=[...this.issues,e]},this.addIssues=(e=[])=>{this.issues=[...this.issues,...e]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(e){return e.message},r={_errors:[]},processError=e=>{for(let n of e.issues)if("invalid_union"===n.code)n.unionErrors.map(processError);else if("invalid_return_type"===n.code)processError(n.returnTypeError);else if("invalid_arguments"===n.code)processError(n.argumentsError);else if(0===n.path.length)r._errors.push(t(n));else{let e=r,a=0;for(;a<n.path.length;){let r=n.path[a],i=a===n.path.length-1;i?(e[r]=e[r]||{_errors:[]},e[r]._errors.push(t(n))):e[r]=e[r]||{_errors:[]},e=e[r],a++}}};return processError(this),r}toString(){return this.message}get message(){return JSON.stringify(this.issues,ec.jsonStringifyReplacer,2)}get isEmpty(){return 0===this.issues.length}flatten(e=e=>e.message){let t={},r=[];for(let n of this.issues)n.path.length>0?(t[n.path[0]]=t[n.path[0]]||[],t[n.path[0]].push(e(n))):r.push(e(n));return{formErrors:r,fieldErrors:t}}get formErrors(){return this.flatten()}};ZodError.create=e=>{let t=new ZodError(e);return t};let errorMap=(e,t)=>{let r;switch(e.code){case i.invalid_type:r=e.received===a.undefined?"Required":`Expected ${e.expected}, received ${e.received}`;break;case i.invalid_literal:r=`Invalid literal value, expected ${JSON.stringify(e.expected,ec.jsonStringifyReplacer)}`;break;case i.unrecognized_keys:r=`Unrecognized key(s) in object: ${ec.joinValues(e.keys,", ")}`;break;case i.invalid_union:r="Invalid input";break;case i.invalid_union_discriminator:r=`Invalid discriminator value. Expected ${ec.joinValues(e.options)}`;break;case i.invalid_enum_value:r=`Invalid enum value. Expected ${ec.joinValues(e.options)}, received '${e.received}'`;break;case i.invalid_arguments:r="Invalid function arguments";break;case i.invalid_return_type:r="Invalid function return type";break;case i.invalid_date:r="Invalid date";break;case i.invalid_string:"object"==typeof e.validation?"includes"in e.validation?(r=`Invalid input: must include "${e.validation.includes}"`,"number"==typeof e.validation.position&&(r=`${r} at one or more positions greater than or equal to ${e.validation.position}`)):"startsWith"in e.validation?r=`Invalid input: must start with "${e.validation.startsWith}"`:"endsWith"in e.validation?r=`Invalid input: must end with "${e.validation.endsWith}"`:ec.assertNever(e.validation):r="regex"!==e.validation?`Invalid ${e.validation}`:"Invalid";break;case i.too_small:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}`:"date"===e.type?`Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}`:"Invalid input";break;case i.too_big:r="array"===e.type?`Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)`:"string"===e.type?`String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)`:"number"===e.type?`Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"bigint"===e.type?`BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}`:"date"===e.type?`Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}`:"Invalid input";break;case i.custom:r="Invalid input";break;case i.invalid_intersection_types:r="Intersection results could not be merged";break;case i.not_multiple_of:r=`Number must be a multiple of ${e.multipleOf}`;break;case i.not_finite:r="Number must be finite";break;default:r=t.defaultError,ec.assertNever(e)}return{message:r}},o=errorMap;function getErrorMap(){return o}let makeIssue=e=>{let{data:t,path:r,errorMaps:n,issueData:a}=e,i=[...r,...a.path||[]],o={...a,path:i},s="",l=n.filter(e=>!!e).slice().reverse();for(let e of l)s=e(o,{data:t,defaultError:s}).message;return{...a,path:i,message:a.message||s}};function addIssueToContext(e,t){let r=makeIssue({issueData:t,data:e.data,path:e.path,errorMaps:[e.common.contextualErrorMap,e.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e)});e.common.issues.push(r)}let ParseStatus=class ParseStatus{constructor(){this.value="valid"}dirty(){"valid"===this.value&&(this.value="dirty")}abort(){"aborted"!==this.value&&(this.value="aborted")}static mergeArray(e,t){let r=[];for(let n of t){if("aborted"===n.status)return s;"dirty"===n.status&&e.dirty(),r.push(n.value)}return{status:e.value,value:r}}static async mergeObjectAsync(e,t){let r=[];for(let e of t)r.push({key:await e.key,value:await e.value});return ParseStatus.mergeObjectSync(e,r)}static mergeObjectSync(e,t){let r={};for(let n of t){let{key:t,value:a}=n;if("aborted"===t.status||"aborted"===a.status)return s;"dirty"===t.status&&e.dirty(),"dirty"===a.status&&e.dirty(),"__proto__"!==t.value&&(void 0!==a.value||n.alwaysSet)&&(r[t.value]=a.value)}return{status:e.value,value:r}}};let s=Object.freeze({status:"aborted"}),DIRTY=e=>({status:"dirty",value:e}),OK=e=>({status:"valid",value:e}),isAborted=e=>"aborted"===e.status,isDirty=e=>"dirty"===e.status,isValid=e=>"valid"===e.status,isAsync=e=>"undefined"!=typeof Promise&&e instanceof Promise;(el=eh||(eh={})).errToObj=e=>"string"==typeof e?{message:e}:e||{},el.toString=e=>"string"==typeof e?e:null==e?void 0:e.message;let ParseInputLazyPath=class ParseInputLazyPath{constructor(e,t,r,n){this._cachedPath=[],this.parent=e,this.data=t,this._path=r,this._key=n}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}};let handleResult=(e,t)=>{if(isValid(t))return{success:!0,data:t.value};if(!e.common.issues.length)throw Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new ZodError(e.common.issues);return this._error=t,this._error}}};function processCreateParams(e){if(!e)return{};let{errorMap:t,invalid_type_error:r,required_error:n,description:a}=e;if(t&&(r||n))throw Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');return t?{errorMap:t,description:a}:{errorMap:(e,t)=>"invalid_type"!==e.code?{message:t.defaultError}:void 0===t.data?{message:null!=n?n:t.defaultError}:{message:null!=r?r:t.defaultError},description:a}}let ZodType=class ZodType{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return getParsedType(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new ParseStatus,ctx:{common:e.parent.common,data:e.data,parsedType:getParsedType(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(isAsync(t))throw Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let r=this.safeParse(e,t);if(r.success)return r.data;throw r.error}safeParse(e,t){var r;let n={common:{issues:[],async:null!==(r=null==t?void 0:t.async)&&void 0!==r&&r,contextualErrorMap:null==t?void 0:t.errorMap},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},a=this._parseSync({data:e,path:n.path,parent:n});return handleResult(n,a)}async parseAsync(e,t){let r=await this.safeParseAsync(e,t);if(r.success)return r.data;throw r.error}async safeParseAsync(e,t){let r={common:{issues:[],contextualErrorMap:null==t?void 0:t.errorMap,async:!0},path:(null==t?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:getParsedType(e)},n=this._parse({data:e,path:r.path,parent:r}),a=await (isAsync(n)?n:Promise.resolve(n));return handleResult(r,a)}refine(e,t){let getIssueProperties=e=>"string"==typeof t||void 0===t?{message:t}:"function"==typeof t?t(e):t;return this._refinement((t,r)=>{let n=e(t),setError=()=>r.addIssue({code:i.custom,...getIssueProperties(t)});return"undefined"!=typeof Promise&&n instanceof Promise?n.then(e=>!!e||(setError(),!1)):!!n||(setError(),!1)})}refinement(e,t){return this._refinement((r,n)=>!!e(r)||(n.addIssue("function"==typeof t?t(r,n):t),!1))}_refinement(e){return new ZodEffects({schema:this,typeName:ef.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ZodOptional.create(this,this._def)}nullable(){return ZodNullable.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return ZodArray.create(this,this._def)}promise(){return ZodPromise.create(this,this._def)}or(e){return ZodUnion.create([this,e],this._def)}and(e){return ZodIntersection.create(this,e,this._def)}transform(e){return new ZodEffects({...processCreateParams(this._def),schema:this,typeName:ef.ZodEffects,effect:{type:"transform",transform:e}})}default(e){return new ZodDefault({...processCreateParams(this._def),innerType:this,defaultValue:"function"==typeof e?e:()=>e,typeName:ef.ZodDefault})}brand(){return new ZodBranded({typeName:ef.ZodBranded,type:this,...processCreateParams(this._def)})}catch(e){return new ZodCatch({...processCreateParams(this._def),innerType:this,catchValue:"function"==typeof e?e:()=>e,typeName:ef.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return ZodPipeline.create(this,e)}readonly(){return ZodReadonly.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}};let l=/^c[^\s-]{8,}$/i,u=/^[a-z][a-z0-9]*$/,c=/^[0-9A-HJKMNP-TV-Z]{26}$/,d=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,h=/^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,f=/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,p=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,datetimeRegex=e=>e.precision?e.offset?RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`):RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`):0===e.precision?e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$"):e.offset?RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"):RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");let ZodString=class ZodString extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=String(e.data));let r=this._getType(e);if(r!==a.string){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.string,received:t.parsedType}),s}let o=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind)e.data.length<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),o.dirty());else if("max"===r.kind)e.data.length>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!1,message:r.message}),o.dirty());else if("length"===r.kind){let n=e.data.length>r.value,a=e.data.length<r.value;(n||a)&&(t=this._getOrReturnCtx(e,t),n?addIssueToContext(t,{code:i.too_big,maximum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}):a&&addIssueToContext(t,{code:i.too_small,minimum:r.value,type:"string",inclusive:!0,exact:!0,message:r.message}),o.dirty())}else if("email"===r.kind)h.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"email",code:i.invalid_string,message:r.message}),o.dirty());else if("emoji"===r.kind)n||(n=RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$","u")),n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"emoji",code:i.invalid_string,message:r.message}),o.dirty());else if("uuid"===r.kind)d.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"uuid",code:i.invalid_string,message:r.message}),o.dirty());else if("cuid"===r.kind)l.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid",code:i.invalid_string,message:r.message}),o.dirty());else if("cuid2"===r.kind)u.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"cuid2",code:i.invalid_string,message:r.message}),o.dirty());else if("ulid"===r.kind)c.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ulid",code:i.invalid_string,message:r.message}),o.dirty());else if("url"===r.kind)try{new URL(e.data)}catch(n){addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"url",code:i.invalid_string,message:r.message}),o.dirty()}else if("regex"===r.kind){r.regex.lastIndex=0;let n=r.regex.test(e.data);n||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"regex",code:i.invalid_string,message:r.message}),o.dirty())}else if("trim"===r.kind)e.data=e.data.trim();else if("includes"===r.kind)e.data.includes(r.value,r.position)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.invalid_string,validation:{includes:r.value,position:r.position},message:r.message}),o.dirty());else if("toLowerCase"===r.kind)e.data=e.data.toLowerCase();else if("toUpperCase"===r.kind)e.data=e.data.toUpperCase();else if("startsWith"===r.kind)e.data.startsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.invalid_string,validation:{startsWith:r.value},message:r.message}),o.dirty());else if("endsWith"===r.kind)e.data.endsWith(r.value)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.invalid_string,validation:{endsWith:r.value},message:r.message}),o.dirty());else if("datetime"===r.kind){let n=datetimeRegex(r);n.test(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.invalid_string,validation:"datetime",message:r.message}),o.dirty())}else if("ip"===r.kind){var m,g;m=e.data,("v4"===(g=r.version)||!g)&&f.test(m)||("v6"===g||!g)&&p.test(m)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{validation:"ip",code:i.invalid_string,message:r.message}),o.dirty())}else ec.assertNever(r);return{status:o.value,value:e.data}}_regex(e,t,r){return this.refinement(t=>e.test(t),{validation:t,code:i.invalid_string,...eh.errToObj(r)})}_addCheck(e){return new ZodString({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...eh.errToObj(e)})}url(e){return this._addCheck({kind:"url",...eh.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...eh.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...eh.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...eh.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...eh.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...eh.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...eh.errToObj(e)})}datetime(e){var t;return"string"==typeof e?this._addCheck({kind:"datetime",precision:null,offset:!1,message:e}):this._addCheck({kind:"datetime",precision:void 0===(null==e?void 0:e.precision)?null:null==e?void 0:e.precision,offset:null!==(t=null==e?void 0:e.offset)&&void 0!==t&&t,...eh.errToObj(null==e?void 0:e.message)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...eh.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:null==t?void 0:t.position,...eh.errToObj(null==t?void 0:t.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...eh.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...eh.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...eh.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...eh.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...eh.errToObj(t)})}nonempty(e){return this.min(1,eh.errToObj(e))}trim(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new ZodString({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>"datetime"===e.kind)}get isEmail(){return!!this._def.checks.find(e=>"email"===e.kind)}get isURL(){return!!this._def.checks.find(e=>"url"===e.kind)}get isEmoji(){return!!this._def.checks.find(e=>"emoji"===e.kind)}get isUUID(){return!!this._def.checks.find(e=>"uuid"===e.kind)}get isCUID(){return!!this._def.checks.find(e=>"cuid"===e.kind)}get isCUID2(){return!!this._def.checks.find(e=>"cuid2"===e.kind)}get isULID(){return!!this._def.checks.find(e=>"ulid"===e.kind)}get isIP(){return!!this._def.checks.find(e=>"ip"===e.kind)}get minLength(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodString.create=e=>{var t;return new ZodString({checks:[],typeName:ef.ZodString,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodNumber=class ZodNumber extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){let t;this._def.coerce&&(e.data=Number(e.data));let r=this._getType(e);if(r!==a.number){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.number,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("int"===r.kind)ec.isInteger(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.invalid_type,expected:"integer",received:"float",message:r.message}),n.dirty());else if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_small,minimum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_big,maximum:r.value,type:"number",inclusive:r.inclusive,exact:!1,message:r.message}),n.dirty())}else"multipleOf"===r.kind?0!==function(e,t){let r=(e.toString().split(".")[1]||"").length,n=(t.toString().split(".")[1]||"").length,a=r>n?r:n,i=parseInt(e.toFixed(a).replace(".","")),o=parseInt(t.toFixed(a).replace(".",""));return i%o/Math.pow(10,a)}(e.data,r.value)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):"finite"===r.kind?Number.isFinite(e.data)||(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.not_finite,message:r.message}),n.dirty()):ec.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,eh.toString(t))}gt(e,t){return this.setLimit("min",e,!1,eh.toString(t))}lte(e,t){return this.setLimit("max",e,!0,eh.toString(t))}lt(e,t){return this.setLimit("max",e,!1,eh.toString(t))}setLimit(e,t,r,n){return new ZodNumber({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:eh.toString(n)}]})}_addCheck(e){return new ZodNumber({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:eh.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:eh.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:eh.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:eh.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:eh.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:eh.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:eh.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:eh.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:eh.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>"int"===e.kind||"multipleOf"===e.kind&&ec.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let r of this._def.checks){if("finite"===r.kind||"int"===r.kind||"multipleOf"===r.kind)return!0;"min"===r.kind?(null===t||r.value>t)&&(t=r.value):"max"===r.kind&&(null===e||r.value<e)&&(e=r.value)}return Number.isFinite(t)&&Number.isFinite(e)}};ZodNumber.create=e=>new ZodNumber({checks:[],typeName:ef.ZodNumber,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodBigInt=class ZodBigInt extends ZodType{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){let t;this._def.coerce&&(e.data=BigInt(e.data));let r=this._getType(e);if(r!==a.bigint){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.bigint,received:t.parsedType}),s}let n=new ParseStatus;for(let r of this._def.checks)if("min"===r.kind){let a=r.inclusive?e.data<r.value:e.data<=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_small,type:"bigint",minimum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else if("max"===r.kind){let a=r.inclusive?e.data>r.value:e.data>=r.value;a&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_big,type:"bigint",maximum:r.value,inclusive:r.inclusive,message:r.message}),n.dirty())}else"multipleOf"===r.kind?e.data%r.value!==BigInt(0)&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.not_multiple_of,multipleOf:r.value,message:r.message}),n.dirty()):ec.assertNever(r);return{status:n.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,eh.toString(t))}gt(e,t){return this.setLimit("min",e,!1,eh.toString(t))}lte(e,t){return this.setLimit("max",e,!0,eh.toString(t))}lt(e,t){return this.setLimit("max",e,!1,eh.toString(t))}setLimit(e,t,r,n){return new ZodBigInt({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:r,message:eh.toString(n)}]})}_addCheck(e){return new ZodBigInt({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:eh.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:eh.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:eh.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:eh.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:eh.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return e}};ZodBigInt.create=e=>{var t;return new ZodBigInt({checks:[],typeName:ef.ZodBigInt,coerce:null!==(t=null==e?void 0:e.coerce)&&void 0!==t&&t,...processCreateParams(e)})};let ZodBoolean=class ZodBoolean extends ZodType{_parse(e){this._def.coerce&&(e.data=!!e.data);let t=this._getType(e);if(t!==a.boolean){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.boolean,received:t.parsedType}),s}return OK(e.data)}};ZodBoolean.create=e=>new ZodBoolean({typeName:ef.ZodBoolean,coerce:(null==e?void 0:e.coerce)||!1,...processCreateParams(e)});let ZodDate=class ZodDate extends ZodType{_parse(e){let t;this._def.coerce&&(e.data=new Date(e.data));let r=this._getType(e);if(r!==a.date){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.date,received:t.parsedType}),s}if(isNaN(e.data.getTime())){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_date}),s}let n=new ParseStatus;for(let r of this._def.checks)"min"===r.kind?e.data.getTime()<r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_small,message:r.message,inclusive:!0,exact:!1,minimum:r.value,type:"date"}),n.dirty()):"max"===r.kind?e.data.getTime()>r.value&&(addIssueToContext(t=this._getOrReturnCtx(e,t),{code:i.too_big,message:r.message,inclusive:!0,exact:!1,maximum:r.value,type:"date"}),n.dirty()):ec.assertNever(r);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new ZodDate({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:eh.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:eh.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)"min"===t.kind&&(null===e||t.value>e)&&(e=t.value);return null!=e?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)"max"===t.kind&&(null===e||t.value<e)&&(e=t.value);return null!=e?new Date(e):null}};ZodDate.create=e=>new ZodDate({checks:[],coerce:(null==e?void 0:e.coerce)||!1,typeName:ef.ZodDate,...processCreateParams(e)});let ZodSymbol=class ZodSymbol extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.symbol){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.symbol,received:t.parsedType}),s}return OK(e.data)}};ZodSymbol.create=e=>new ZodSymbol({typeName:ef.ZodSymbol,...processCreateParams(e)});let ZodUndefined=class ZodUndefined extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.undefined,received:t.parsedType}),s}return OK(e.data)}};ZodUndefined.create=e=>new ZodUndefined({typeName:ef.ZodUndefined,...processCreateParams(e)});let ZodNull=class ZodNull extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.null){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.null,received:t.parsedType}),s}return OK(e.data)}};ZodNull.create=e=>new ZodNull({typeName:ef.ZodNull,...processCreateParams(e)});let ZodAny=class ZodAny extends ZodType{constructor(){super(...arguments),this._any=!0}_parse(e){return OK(e.data)}};ZodAny.create=e=>new ZodAny({typeName:ef.ZodAny,...processCreateParams(e)});let ZodUnknown=class ZodUnknown extends ZodType{constructor(){super(...arguments),this._unknown=!0}_parse(e){return OK(e.data)}};ZodUnknown.create=e=>new ZodUnknown({typeName:ef.ZodUnknown,...processCreateParams(e)});let ZodNever=class ZodNever extends ZodType{_parse(e){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.never,received:t.parsedType}),s}};ZodNever.create=e=>new ZodNever({typeName:ef.ZodNever,...processCreateParams(e)});let ZodVoid=class ZodVoid extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.undefined){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.void,received:t.parsedType}),s}return OK(e.data)}};ZodVoid.create=e=>new ZodVoid({typeName:ef.ZodVoid,...processCreateParams(e)});let ZodArray=class ZodArray extends ZodType{_parse(e){let{ctx:t,status:r}=this._processInputParams(e),n=this._def;if(t.parsedType!==a.array)return addIssueToContext(t,{code:i.invalid_type,expected:a.array,received:t.parsedType}),s;if(null!==n.exactLength){let e=t.data.length>n.exactLength.value,a=t.data.length<n.exactLength.value;(e||a)&&(addIssueToContext(t,{code:e?i.too_big:i.too_small,minimum:a?n.exactLength.value:void 0,maximum:e?n.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:n.exactLength.message}),r.dirty())}if(null!==n.minLength&&t.data.length<n.minLength.value&&(addIssueToContext(t,{code:i.too_small,minimum:n.minLength.value,type:"array",inclusive:!0,exact:!1,message:n.minLength.message}),r.dirty()),null!==n.maxLength&&t.data.length>n.maxLength.value&&(addIssueToContext(t,{code:i.too_big,maximum:n.maxLength.value,type:"array",inclusive:!0,exact:!1,message:n.maxLength.message}),r.dirty()),t.common.async)return Promise.all([...t.data].map((e,r)=>n.type._parseAsync(new ParseInputLazyPath(t,e,t.path,r)))).then(e=>ParseStatus.mergeArray(r,e));let o=[...t.data].map((e,r)=>n.type._parseSync(new ParseInputLazyPath(t,e,t.path,r)));return ParseStatus.mergeArray(r,o)}get element(){return this._def.type}min(e,t){return new ZodArray({...this._def,minLength:{value:e,message:eh.toString(t)}})}max(e,t){return new ZodArray({...this._def,maxLength:{value:e,message:eh.toString(t)}})}length(e,t){return new ZodArray({...this._def,exactLength:{value:e,message:eh.toString(t)}})}nonempty(e){return this.min(1,e)}};ZodArray.create=(e,t)=>new ZodArray({type:e,minLength:null,maxLength:null,exactLength:null,typeName:ef.ZodArray,...processCreateParams(t)});let ZodObject=class ZodObject extends ZodType{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(null!==this._cached)return this._cached;let e=this._def.shape(),t=ec.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){let t=this._getType(e);if(t!==a.object){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.object,received:t.parsedType}),s}let{status:r,ctx:n}=this._processInputParams(e),{shape:o,keys:l}=this._getCached(),u=[];if(!(this._def.catchall instanceof ZodNever&&"strip"===this._def.unknownKeys))for(let e in n.data)l.includes(e)||u.push(e);let c=[];for(let e of l){let t=o[e],r=n.data[e];c.push({key:{status:"valid",value:e},value:t._parse(new ParseInputLazyPath(n,r,n.path,e)),alwaysSet:e in n.data})}if(this._def.catchall instanceof ZodNever){let e=this._def.unknownKeys;if("passthrough"===e)for(let e of u)c.push({key:{status:"valid",value:e},value:{status:"valid",value:n.data[e]}});else if("strict"===e)u.length>0&&(addIssueToContext(n,{code:i.unrecognized_keys,keys:u}),r.dirty());else if("strip"===e);else throw Error("Internal ZodObject error: invalid unknownKeys value.")}else{let e=this._def.catchall;for(let t of u){let r=n.data[t];c.push({key:{status:"valid",value:t},value:e._parse(new ParseInputLazyPath(n,r,n.path,t)),alwaysSet:t in n.data})}}return n.common.async?Promise.resolve().then(async()=>{let e=[];for(let t of c){let r=await t.key;e.push({key:r,value:await t.value,alwaysSet:t.alwaysSet})}return e}).then(e=>ParseStatus.mergeObjectSync(r,e)):ParseStatus.mergeObjectSync(r,c)}get shape(){return this._def.shape()}strict(e){return eh.errToObj,new ZodObject({...this._def,unknownKeys:"strict",...void 0!==e?{errorMap:(t,r)=>{var n,a,i,o;let s=null!==(i=null===(a=(n=this._def).errorMap)||void 0===a?void 0:a.call(n,t,r).message)&&void 0!==i?i:r.defaultError;return"unrecognized_keys"===t.code?{message:null!==(o=eh.errToObj(e).message)&&void 0!==o?o:s}:{message:s}}}:{}})}strip(){return new ZodObject({...this._def,unknownKeys:"strip"})}passthrough(){return new ZodObject({...this._def,unknownKeys:"passthrough"})}extend(e){return new ZodObject({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){let t=new ZodObject({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:ef.ZodObject});return t}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new ZodObject({...this._def,catchall:e})}pick(e){let t={};return ec.objectKeys(e).forEach(r=>{e[r]&&this.shape[r]&&(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}omit(e){let t={};return ec.objectKeys(this.shape).forEach(r=>{e[r]||(t[r]=this.shape[r])}),new ZodObject({...this._def,shape:()=>t})}deepPartial(){return function deepPartialify(e){if(e instanceof ZodObject){let t={};for(let r in e.shape){let n=e.shape[r];t[r]=ZodOptional.create(deepPartialify(n))}return new ZodObject({...e._def,shape:()=>t})}return e instanceof ZodArray?new ZodArray({...e._def,type:deepPartialify(e.element)}):e instanceof ZodOptional?ZodOptional.create(deepPartialify(e.unwrap())):e instanceof ZodNullable?ZodNullable.create(deepPartialify(e.unwrap())):e instanceof ZodTuple?ZodTuple.create(e.items.map(e=>deepPartialify(e))):e}(this)}partial(e){let t={};return ec.objectKeys(this.shape).forEach(r=>{let n=this.shape[r];e&&!e[r]?t[r]=n:t[r]=n.optional()}),new ZodObject({...this._def,shape:()=>t})}required(e){let t={};return ec.objectKeys(this.shape).forEach(r=>{if(e&&!e[r])t[r]=this.shape[r];else{let e=this.shape[r],n=e;for(;n instanceof ZodOptional;)n=n._def.innerType;t[r]=n}}),new ZodObject({...this._def,shape:()=>t})}keyof(){return createZodEnum(ec.objectKeys(this.shape))}};ZodObject.create=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ef.ZodObject,...processCreateParams(t)}),ZodObject.strictCreate=(e,t)=>new ZodObject({shape:()=>e,unknownKeys:"strict",catchall:ZodNever.create(),typeName:ef.ZodObject,...processCreateParams(t)}),ZodObject.lazycreate=(e,t)=>new ZodObject({shape:e,unknownKeys:"strip",catchall:ZodNever.create(),typeName:ef.ZodObject,...processCreateParams(t)});let ZodUnion=class ZodUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.options;if(t.common.async)return Promise.all(r.map(async e=>{let r={...t,common:{...t.common,issues:[]},parent:null};return{result:await e._parseAsync({data:t.data,path:t.path,parent:r}),ctx:r}})).then(function(e){for(let t of e)if("valid"===t.result.status)return t.result;for(let r of e)if("dirty"===r.result.status)return t.common.issues.push(...r.ctx.common.issues),r.result;let r=e.map(e=>new ZodError(e.ctx.common.issues));return addIssueToContext(t,{code:i.invalid_union,unionErrors:r}),s});{let e;let n=[];for(let a of r){let r={...t,common:{...t.common,issues:[]},parent:null},i=a._parseSync({data:t.data,path:t.path,parent:r});if("valid"===i.status)return i;"dirty"!==i.status||e||(e={result:i,ctx:r}),r.common.issues.length&&n.push(r.common.issues)}if(e)return t.common.issues.push(...e.ctx.common.issues),e.result;let a=n.map(e=>new ZodError(e));return addIssueToContext(t,{code:i.invalid_union,unionErrors:a}),s}}get options(){return this._def.options}};ZodUnion.create=(e,t)=>new ZodUnion({options:e,typeName:ef.ZodUnion,...processCreateParams(t)});let getDiscriminator=e=>{if(e instanceof ZodLazy)return getDiscriminator(e.schema);if(e instanceof ZodEffects)return getDiscriminator(e.innerType());if(e instanceof ZodLiteral)return[e.value];if(e instanceof ZodEnum)return e.options;if(e instanceof ZodNativeEnum)return Object.keys(e.enum);if(e instanceof ZodDefault)return getDiscriminator(e._def.innerType);if(e instanceof ZodUndefined)return[void 0];else if(e instanceof ZodNull)return[null];else return null};let ZodDiscriminatedUnion=class ZodDiscriminatedUnion extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.object)return addIssueToContext(t,{code:i.invalid_type,expected:a.object,received:t.parsedType}),s;let r=this.discriminator,n=t.data[r],o=this.optionsMap.get(n);return o?t.common.async?o._parseAsync({data:t.data,path:t.path,parent:t}):o._parseSync({data:t.data,path:t.path,parent:t}):(addIssueToContext(t,{code:i.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[r]}),s)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,r){let n=new Map;for(let r of t){let t=getDiscriminator(r.shape[e]);if(!t)throw Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let a of t){if(n.has(a))throw Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);n.set(a,r)}}return new ZodDiscriminatedUnion({typeName:ef.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:n,...processCreateParams(r)})}};let ZodIntersection=class ZodIntersection extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e),handleParsed=(e,n)=>{if(isAborted(e)||isAborted(n))return s;let o=function mergeValues(e,t){let r=getParsedType(e),n=getParsedType(t);if(e===t)return{valid:!0,data:e};if(r===a.object&&n===a.object){let r=ec.objectKeys(t),n=ec.objectKeys(e).filter(e=>-1!==r.indexOf(e)),a={...e,...t};for(let r of n){let n=mergeValues(e[r],t[r]);if(!n.valid)return{valid:!1};a[r]=n.data}return{valid:!0,data:a}}if(r===a.array&&n===a.array){if(e.length!==t.length)return{valid:!1};let r=[];for(let n=0;n<e.length;n++){let a=e[n],i=t[n],o=mergeValues(a,i);if(!o.valid)return{valid:!1};r.push(o.data)}return{valid:!0,data:r}}return r===a.date&&n===a.date&&+e==+t?{valid:!0,data:e}:{valid:!1}}(e.value,n.value);return o.valid?((isDirty(e)||isDirty(n))&&t.dirty(),{status:t.value,value:o.data}):(addIssueToContext(r,{code:i.invalid_intersection_types}),s)};return r.common.async?Promise.all([this._def.left._parseAsync({data:r.data,path:r.path,parent:r}),this._def.right._parseAsync({data:r.data,path:r.path,parent:r})]).then(([e,t])=>handleParsed(e,t)):handleParsed(this._def.left._parseSync({data:r.data,path:r.path,parent:r}),this._def.right._parseSync({data:r.data,path:r.path,parent:r}))}};ZodIntersection.create=(e,t,r)=>new ZodIntersection({left:e,right:t,typeName:ef.ZodIntersection,...processCreateParams(r)});let ZodTuple=class ZodTuple extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.array)return addIssueToContext(r,{code:i.invalid_type,expected:a.array,received:r.parsedType}),s;if(r.data.length<this._def.items.length)return addIssueToContext(r,{code:i.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),s;let n=this._def.rest;!n&&r.data.length>this._def.items.length&&(addIssueToContext(r,{code:i.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let o=[...r.data].map((e,t)=>{let n=this._def.items[t]||this._def.rest;return n?n._parse(new ParseInputLazyPath(r,e,r.path,t)):null}).filter(e=>!!e);return r.common.async?Promise.all(o).then(e=>ParseStatus.mergeArray(t,e)):ParseStatus.mergeArray(t,o)}get items(){return this._def.items}rest(e){return new ZodTuple({...this._def,rest:e})}};ZodTuple.create=(e,t)=>{if(!Array.isArray(e))throw Error("You must pass an array of schemas to z.tuple([ ... ])");return new ZodTuple({items:e,typeName:ef.ZodTuple,rest:null,...processCreateParams(t)})};let ZodRecord=class ZodRecord extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.object)return addIssueToContext(r,{code:i.invalid_type,expected:a.object,received:r.parsedType}),s;let n=[],o=this._def.keyType,l=this._def.valueType;for(let e in r.data)n.push({key:o._parse(new ParseInputLazyPath(r,e,r.path,e)),value:l._parse(new ParseInputLazyPath(r,r.data[e],r.path,e))});return r.common.async?ParseStatus.mergeObjectAsync(t,n):ParseStatus.mergeObjectSync(t,n)}get element(){return this._def.valueType}static create(e,t,r){return new ZodRecord(t instanceof ZodType?{keyType:e,valueType:t,typeName:ef.ZodRecord,...processCreateParams(r)}:{keyType:ZodString.create(),valueType:e,typeName:ef.ZodRecord,...processCreateParams(t)})}};let ZodMap=class ZodMap extends ZodType{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.map)return addIssueToContext(r,{code:i.invalid_type,expected:a.map,received:r.parsedType}),s;let n=this._def.keyType,o=this._def.valueType,l=[...r.data.entries()].map(([e,t],a)=>({key:n._parse(new ParseInputLazyPath(r,e,r.path,[a,"key"])),value:o._parse(new ParseInputLazyPath(r,t,r.path,[a,"value"]))}));if(r.common.async){let e=new Map;return Promise.resolve().then(async()=>{for(let r of l){let n=await r.key,a=await r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}})}{let e=new Map;for(let r of l){let n=r.key,a=r.value;if("aborted"===n.status||"aborted"===a.status)return s;("dirty"===n.status||"dirty"===a.status)&&t.dirty(),e.set(n.value,a.value)}return{status:t.value,value:e}}}};ZodMap.create=(e,t,r)=>new ZodMap({valueType:t,keyType:e,typeName:ef.ZodMap,...processCreateParams(r)});let ZodSet=class ZodSet extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.parsedType!==a.set)return addIssueToContext(r,{code:i.invalid_type,expected:a.set,received:r.parsedType}),s;let n=this._def;null!==n.minSize&&r.data.size<n.minSize.value&&(addIssueToContext(r,{code:i.too_small,minimum:n.minSize.value,type:"set",inclusive:!0,exact:!1,message:n.minSize.message}),t.dirty()),null!==n.maxSize&&r.data.size>n.maxSize.value&&(addIssueToContext(r,{code:i.too_big,maximum:n.maxSize.value,type:"set",inclusive:!0,exact:!1,message:n.maxSize.message}),t.dirty());let o=this._def.valueType;function finalizeSet(e){let r=new Set;for(let n of e){if("aborted"===n.status)return s;"dirty"===n.status&&t.dirty(),r.add(n.value)}return{status:t.value,value:r}}let l=[...r.data.values()].map((e,t)=>o._parse(new ParseInputLazyPath(r,e,r.path,t)));return r.common.async?Promise.all(l).then(e=>finalizeSet(e)):finalizeSet(l)}min(e,t){return new ZodSet({...this._def,minSize:{value:e,message:eh.toString(t)}})}max(e,t){return new ZodSet({...this._def,maxSize:{value:e,message:eh.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};ZodSet.create=(e,t)=>new ZodSet({valueType:e,minSize:null,maxSize:null,typeName:ef.ZodSet,...processCreateParams(t)});let ZodFunction=class ZodFunction extends ZodType{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.function)return addIssueToContext(t,{code:i.invalid_type,expected:a.function,received:t.parsedType}),s;function makeArgsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:i.invalid_arguments,argumentsError:r}})}function makeReturnsIssue(e,r){return makeIssue({data:e,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,getErrorMap(),errorMap].filter(e=>!!e),issueData:{code:i.invalid_return_type,returnTypeError:r}})}let r={errorMap:t.common.contextualErrorMap},n=t.data;if(this._def.returns instanceof ZodPromise){let e=this;return OK(async function(...t){let a=new ZodError([]),i=await e._def.args.parseAsync(t,r).catch(e=>{throw a.addIssue(makeArgsIssue(t,e)),a}),o=await Reflect.apply(n,this,i),s=await e._def.returns._def.type.parseAsync(o,r).catch(e=>{throw a.addIssue(makeReturnsIssue(o,e)),a});return s})}{let e=this;return OK(function(...t){let a=e._def.args.safeParse(t,r);if(!a.success)throw new ZodError([makeArgsIssue(t,a.error)]);let i=Reflect.apply(n,this,a.data),o=e._def.returns.safeParse(i,r);if(!o.success)throw new ZodError([makeReturnsIssue(i,o.error)]);return o.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new ZodFunction({...this._def,args:ZodTuple.create(e).rest(ZodUnknown.create())})}returns(e){return new ZodFunction({...this._def,returns:e})}implement(e){let t=this.parse(e);return t}strictImplement(e){let t=this.parse(e);return t}static create(e,t,r){return new ZodFunction({args:e||ZodTuple.create([]).rest(ZodUnknown.create()),returns:t||ZodUnknown.create(),typeName:ef.ZodFunction,...processCreateParams(r)})}};let ZodLazy=class ZodLazy extends ZodType{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e),r=this._def.getter();return r._parse({data:t.data,path:t.path,parent:t})}};ZodLazy.create=(e,t)=>new ZodLazy({getter:e,typeName:ef.ZodLazy,...processCreateParams(t)});let ZodLiteral=class ZodLiteral extends ZodType{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{received:t.data,code:i.invalid_literal,expected:this._def.value}),s}return{status:"valid",value:e.data}}get value(){return this._def.value}};function createZodEnum(e,t){return new ZodEnum({values:e,typeName:ef.ZodEnum,...processCreateParams(t)})}ZodLiteral.create=(e,t)=>new ZodLiteral({value:e,typeName:ef.ZodLiteral,...processCreateParams(t)});let ZodEnum=class ZodEnum extends ZodType{_parse(e){if("string"!=typeof e.data){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{expected:ec.joinValues(r),received:t.parsedType,code:i.invalid_type}),s}if(-1===this._def.values.indexOf(e.data)){let t=this._getOrReturnCtx(e),r=this._def.values;return addIssueToContext(t,{received:t.data,code:i.invalid_enum_value,options:r}),s}return OK(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e){return ZodEnum.create(e)}exclude(e){return ZodEnum.create(this.options.filter(t=>!e.includes(t)))}};ZodEnum.create=createZodEnum;let ZodNativeEnum=class ZodNativeEnum extends ZodType{_parse(e){let t=ec.getValidEnumValues(this._def.values),r=this._getOrReturnCtx(e);if(r.parsedType!==a.string&&r.parsedType!==a.number){let e=ec.objectValues(t);return addIssueToContext(r,{expected:ec.joinValues(e),received:r.parsedType,code:i.invalid_type}),s}if(-1===t.indexOf(e.data)){let e=ec.objectValues(t);return addIssueToContext(r,{received:r.data,code:i.invalid_enum_value,options:e}),s}return OK(e.data)}get enum(){return this._def.values}};ZodNativeEnum.create=(e,t)=>new ZodNativeEnum({values:e,typeName:ef.ZodNativeEnum,...processCreateParams(t)});let ZodPromise=class ZodPromise extends ZodType{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==a.promise&&!1===t.common.async)return addIssueToContext(t,{code:i.invalid_type,expected:a.promise,received:t.parsedType}),s;let r=t.parsedType===a.promise?t.data:Promise.resolve(t.data);return OK(r.then(e=>this._def.type.parseAsync(e,{path:t.path,errorMap:t.common.contextualErrorMap})))}};ZodPromise.create=(e,t)=>new ZodPromise({type:e,typeName:ef.ZodPromise,...processCreateParams(t)});let ZodEffects=class ZodEffects extends ZodType{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===ef.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:r}=this._processInputParams(e),n=this._def.effect||null,a={addIssue:e=>{addIssueToContext(r,e),e.fatal?t.abort():t.dirty()},get path(){return r.path}};if(a.addIssue=a.addIssue.bind(a),"preprocess"===n.type){let e=n.transform(r.data,a);return r.common.issues.length?{status:"dirty",value:r.data}:r.common.async?Promise.resolve(e).then(e=>this._def.schema._parseAsync({data:e,path:r.path,parent:r})):this._def.schema._parseSync({data:e,path:r.path,parent:r})}if("refinement"===n.type){let executeRefinement=e=>{let t=n.refinement(e,a);if(r.common.async)return Promise.resolve(t);if(t instanceof Promise)throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return e};if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value).then(()=>({status:t.value,value:e.value}))));{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:("dirty"===e.status&&t.dirty(),executeRefinement(e.value),{status:t.value,value:e.value})}}if("transform"===n.type){if(!1!==r.common.async)return this._def.schema._parseAsync({data:r.data,path:r.path,parent:r}).then(e=>isValid(e)?Promise.resolve(n.transform(e.value,a)).then(e=>({status:t.value,value:e})):e);{let e=this._def.schema._parseSync({data:r.data,path:r.path,parent:r});if(!isValid(e))return e;let i=n.transform(e.value,a);if(i instanceof Promise)throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:i}}}ec.assertNever(n)}};ZodEffects.create=(e,t,r)=>new ZodEffects({schema:e,typeName:ef.ZodEffects,effect:t,...processCreateParams(r)}),ZodEffects.createWithPreprocess=(e,t,r)=>new ZodEffects({schema:t,effect:{type:"preprocess",transform:e},typeName:ef.ZodEffects,...processCreateParams(r)});let ZodOptional=class ZodOptional extends ZodType{_parse(e){let t=this._getType(e);return t===a.undefined?OK(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodOptional.create=(e,t)=>new ZodOptional({innerType:e,typeName:ef.ZodOptional,...processCreateParams(t)});let ZodNullable=class ZodNullable extends ZodType{_parse(e){let t=this._getType(e);return t===a.null?OK(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ZodNullable.create=(e,t)=>new ZodNullable({innerType:e,typeName:ef.ZodNullable,...processCreateParams(t)});let ZodDefault=class ZodDefault extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return t.parsedType===a.undefined&&(r=this._def.defaultValue()),this._def.innerType._parse({data:r,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};ZodDefault.create=(e,t)=>new ZodDefault({innerType:e,typeName:ef.ZodDefault,defaultValue:"function"==typeof t.default?t.default:()=>t.default,...processCreateParams(t)});let ZodCatch=class ZodCatch extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r={...t,common:{...t.common,issues:[]}},n=this._def.innerType._parse({data:r.data,path:r.path,parent:{...r}});return isAsync(n)?n.then(e=>({status:"valid",value:"valid"===e.status?e.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})})):{status:"valid",value:"valid"===n.status?n.value:this._def.catchValue({get error(){return new ZodError(r.common.issues)},input:r.data})}}removeCatch(){return this._def.innerType}};ZodCatch.create=(e,t)=>new ZodCatch({innerType:e,typeName:ef.ZodCatch,catchValue:"function"==typeof t.catch?t.catch:()=>t.catch,...processCreateParams(t)});let ZodNaN=class ZodNaN extends ZodType{_parse(e){let t=this._getType(e);if(t!==a.nan){let t=this._getOrReturnCtx(e);return addIssueToContext(t,{code:i.invalid_type,expected:a.nan,received:t.parsedType}),s}return{status:"valid",value:e.data}}};ZodNaN.create=e=>new ZodNaN({typeName:ef.ZodNaN,...processCreateParams(e)});let m=Symbol("zod_brand");let ZodBranded=class ZodBranded extends ZodType{_parse(e){let{ctx:t}=this._processInputParams(e),r=t.data;return this._def.type._parse({data:r,path:t.path,parent:t})}unwrap(){return this._def.type}};let ZodPipeline=class ZodPipeline extends ZodType{_parse(e){let{status:t,ctx:r}=this._processInputParams(e);if(r.common.async){let handleAsync=async()=>{let e=await this._def.in._parseAsync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),DIRTY(e.value)):this._def.out._parseAsync({data:e.value,path:r.path,parent:r})};return handleAsync()}{let e=this._def.in._parseSync({data:r.data,path:r.path,parent:r});return"aborted"===e.status?s:"dirty"===e.status?(t.dirty(),{status:"dirty",value:e.value}):this._def.out._parseSync({data:e.value,path:r.path,parent:r})}}static create(e,t){return new ZodPipeline({in:e,out:t,typeName:ef.ZodPipeline})}};let ZodReadonly=class ZodReadonly extends ZodType{_parse(e){let t=this._def.innerType._parse(e);return isValid(t)&&(t.value=Object.freeze(t.value)),t}};ZodReadonly.create=(e,t)=>new ZodReadonly({innerType:e,typeName:ef.ZodReadonly,...processCreateParams(t)});let custom=(e,t={},r)=>e?ZodAny.create().superRefine((n,a)=>{var i,o;if(!e(n)){let e="function"==typeof t?t(n):"string"==typeof t?{message:t}:t,s=null===(o=null!==(i=e.fatal)&&void 0!==i?i:r)||void 0===o||o,l="string"==typeof e?{message:e}:e;a.addIssue({code:"custom",...l,fatal:s})}}):ZodAny.create(),g={object:ZodObject.lazycreate};(eu=ef||(ef={})).ZodString="ZodString",eu.ZodNumber="ZodNumber",eu.ZodNaN="ZodNaN",eu.ZodBigInt="ZodBigInt",eu.ZodBoolean="ZodBoolean",eu.ZodDate="ZodDate",eu.ZodSymbol="ZodSymbol",eu.ZodUndefined="ZodUndefined",eu.ZodNull="ZodNull",eu.ZodAny="ZodAny",eu.ZodUnknown="ZodUnknown",eu.ZodNever="ZodNever",eu.ZodVoid="ZodVoid",eu.ZodArray="ZodArray",eu.ZodObject="ZodObject",eu.ZodUnion="ZodUnion",eu.ZodDiscriminatedUnion="ZodDiscriminatedUnion",eu.ZodIntersection="ZodIntersection",eu.ZodTuple="ZodTuple",eu.ZodRecord="ZodRecord",eu.ZodMap="ZodMap",eu.ZodSet="ZodSet",eu.ZodFunction="ZodFunction",eu.ZodLazy="ZodLazy",eu.ZodLiteral="ZodLiteral",eu.ZodEnum="ZodEnum",eu.ZodEffects="ZodEffects",eu.ZodNativeEnum="ZodNativeEnum",eu.ZodOptional="ZodOptional",eu.ZodNullable="ZodNullable",eu.ZodDefault="ZodDefault",eu.ZodCatch="ZodCatch",eu.ZodPromise="ZodPromise",eu.ZodBranded="ZodBranded",eu.ZodPipeline="ZodPipeline",eu.ZodReadonly="ZodReadonly";let y=ZodString.create,x=ZodNumber.create,b=ZodNaN.create,v=ZodBigInt.create,C=ZodBoolean.create,w=ZodDate.create,_=ZodSymbol.create,k=ZodUndefined.create,$=ZodNull.create,A=ZodAny.create,N=ZodUnknown.create,F=ZodNever.create,D=ZodVoid.create,B=ZodArray.create,M=ZodObject.create,L=ZodObject.strictCreate,U=ZodUnion.create,W=ZodDiscriminatedUnion.create,z=ZodIntersection.create,Z=ZodTuple.create,j=ZodRecord.create,K=ZodMap.create,X=ZodSet.create,q=ZodFunction.create,Y=ZodLazy.create,Q=ZodLiteral.create,J=ZodEnum.create,ee=ZodNativeEnum.create,et=ZodPromise.create,er=ZodEffects.create,en=ZodOptional.create,ea=ZodNullable.create,ei=ZodEffects.createWithPreprocess,eo=ZodPipeline.create;var es,el,eu,ec,ed,eh,ef,ep=Object.freeze({__proto__:null,defaultErrorMap:errorMap,setErrorMap:function(e){o=e},getErrorMap:getErrorMap,makeIssue:makeIssue,EMPTY_PATH:[],addIssueToContext:addIssueToContext,ParseStatus:ParseStatus,INVALID:s,DIRTY:DIRTY,OK:OK,isAborted:isAborted,isDirty:isDirty,isValid:isValid,isAsync:isAsync,get util(){return ec},get objectUtil(){return ed},ZodParsedType:a,getParsedType:getParsedType,ZodType:ZodType,ZodString:ZodString,ZodNumber:ZodNumber,ZodBigInt:ZodBigInt,ZodBoolean:ZodBoolean,ZodDate:ZodDate,ZodSymbol:ZodSymbol,ZodUndefined:ZodUndefined,ZodNull:ZodNull,ZodAny:ZodAny,ZodUnknown:ZodUnknown,ZodNever:ZodNever,ZodVoid:ZodVoid,ZodArray:ZodArray,ZodObject:ZodObject,ZodUnion:ZodUnion,ZodDiscriminatedUnion:ZodDiscriminatedUnion,ZodIntersection:ZodIntersection,ZodTuple:ZodTuple,ZodRecord:ZodRecord,ZodMap:ZodMap,ZodSet:ZodSet,ZodFunction:ZodFunction,ZodLazy:ZodLazy,ZodLiteral:ZodLiteral,ZodEnum:ZodEnum,ZodNativeEnum:ZodNativeEnum,ZodPromise:ZodPromise,ZodEffects:ZodEffects,ZodTransformer:ZodEffects,ZodOptional:ZodOptional,ZodNullable:ZodNullable,ZodDefault:ZodDefault,ZodCatch:ZodCatch,ZodNaN:ZodNaN,BRAND:m,ZodBranded:ZodBranded,ZodPipeline:ZodPipeline,ZodReadonly:ZodReadonly,custom:custom,Schema:ZodType,ZodSchema:ZodType,late:g,get ZodFirstPartyTypeKind(){return ef},coerce:{string:e=>ZodString.create({...e,coerce:!0}),number:e=>ZodNumber.create({...e,coerce:!0}),boolean:e=>ZodBoolean.create({...e,coerce:!0}),bigint:e=>ZodBigInt.create({...e,coerce:!0}),date:e=>ZodDate.create({...e,coerce:!0})},any:A,array:B,bigint:v,boolean:C,date:w,discriminatedUnion:W,effect:er,enum:J,function:q,instanceof:(e,t={message:`Input not instance of ${e.name}`})=>custom(t=>t instanceof e,t),intersection:z,lazy:Y,literal:Q,map:K,nan:b,nativeEnum:ee,never:F,null:$,nullable:ea,number:x,object:M,oboolean:()=>C().optional(),onumber:()=>x().optional(),optional:en,ostring:()=>y().optional(),pipeline:eo,preprocess:ei,promise:et,record:j,set:X,strictObject:L,string:y,symbol:_,transformer:er,tuple:Z,undefined:k,union:U,unknown:N,void:D,NEVER:s,ZodIssueCode:i,quotelessJson:e=>{let t=JSON.stringify(e,null,2);return t.replace(/"([^"]+)":/g,"$1:")},ZodError:ZodError})}}]);
//# sourceMappingURL=5233.93747fa32306c227.js.map