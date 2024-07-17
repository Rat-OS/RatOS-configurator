"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[726],{90726:function(e,t,r){let i;r.r(t),r.d(t,{WebGPUBackend:function(){return WebGPUBackend},webgpu_util:function(){return m}});var a,o,s,n,u,l,d,p,h,c,m={};r.r(m),r.d(m,{GPUBytesPerElement:function(){return GPUBytesPerElement},MatMulProgramType:function(){return d},assertNotComplex:function(){return assertNotComplex},computeDispatch:function(){return computeDispatch},computeWorkPerThreadForConv2d:function(){return computeWorkPerThreadForConv2d},computeWorkgroupInfoForMatMul:function(){return computeWorkgroupInfoForMatMul},computeWorkgroupSizeForConv2d:function(){return computeWorkgroupSizeForConv2d},flatDispatchLayout:function(){return flatDispatchLayout},isWebGPUSupported:function(){return isWebGPUSupported},tilesFitEvenlyIntoShape:function(){return tilesFitEvenlyIntoShape}});var f=r(32307);/**
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
 */let g=(0,f.OBj)();g.registerFlag("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE",()=>15),g.registerFlag("WEBGPU_CPU_FORWARD",()=>!0),g.registerFlag("WEBGPU_MATMUL_PROGRAM_TYPE",()=>-1),g.registerFlag("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE",()=>!0),g.registerFlag("WEBGPU_USE_LOW_POWER_GPU",()=>!1),g.registerFlag("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e3),g.registerFlag("WEBGPU_USE_PROFILE_TOOL",()=>!1),g.registerFlag("WEBGPU_IMPORT_EXTERNAL_TEXTURE",()=>!0),g.registerFlag("WEBGPU_USE_NAIVE_CONV2D_DEBUG",()=>!1),g.registerFlag("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL",()=>-1),g.registerFlag("WEBGPU_CONV_SEPARATE_IM2COL_SHADER",()=>!1),g.registerFlag("WEBGPU_PRINT_SHADER",()=>""),g.registerFlag("WEBGPU_ENGINE_COMPILE_ONLY",()=>!1);/**
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
 */let AdapterInfo=class AdapterInfo{constructor(e){e&&(this.vendor=e.vendor,this.architecture=e.architecture,this.intelGPUGeneration=this.getIntelGPUGeneration())}getIntelGPUGeneration(){if(this.isIntel()){if(this.architecture.startsWith("gen"))return Number(this.architecture.match(/\d+/));if(this.architecture.startsWith("xe"))return 12}return 0}isIntel(){return"intel"===this.vendor}};/**
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
 */let BufferManager=class BufferManager{constructor(e){this.device=e,this.numUsedBuffers=0,this.numFreeBuffers=0,this.freeBuffers=new Map,this.usedBuffers=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireBuffer(e,t,r=!1,i=!0){let a;let o=`${e}_${t}`;return i?(this.freeBuffers.has(o)||this.freeBuffers.set(o,[]),this.freeBuffers.get(o).length>0?(a=this.freeBuffers.get(o).pop(),this.numFreeBuffers--):(a=this.device.createBuffer({size:e,usage:t,mappedAtCreation:r}),this.numBytesAllocated+=e)):(a=this.device.createBuffer({size:e,usage:t,mappedAtCreation:r}),this.numBytesAllocated+=e),this.usedBuffers.has(o)||this.usedBuffers.set(o,[]),this.usedBuffers.get(o).push(a),this.numUsedBuffers++,this.numBytesUsed+=e,a}releaseBuffer(e,t=!0){if(0===this.freeBuffers.size)return;let r=e.size,i=e.usage,a=`${r}_${i}`,o=this.usedBuffers.get(a),s=o.indexOf(e);if(s<0)throw Error("Cannot find the buffer in buffer manager");o[s]=o[o.length-1],o.pop(),this.numUsedBuffers--,this.numBytesUsed-=r,t?(this.freeBuffers.get(a).push(e),this.numFreeBuffers++):(e.destroy(),this.numBytesAllocated-=r)}getNumUsedBuffers(){return this.numUsedBuffers}getNumFreeBuffers(){return this.numFreeBuffers}dispose(){this.freeBuffers.forEach((e,t)=>{e.forEach(e=>{e.destroy()})}),this.usedBuffers.forEach((e,t)=>{e.forEach(e=>{e.destroy()})}),this.freeBuffers=new Map,this.usedBuffers=new Map,this.numUsedBuffers=0,this.numFreeBuffers=0,this.numBytesUsed=0,this.numBytesAllocated=0}};/**
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
 */let TextureManager=class TextureManager{constructor(e){this.device=e,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures=new Map,this.usedTextures=new Map,this.numBytesUsed=0,this.numBytesAllocated=0}acquireTexture(e,t,r,i){let a=getBytesPerElement(r),o=e*t*a,s=getTextureKey(e,t,r,i);if(this.freeTextures.has(s)||this.freeTextures.set(s,[]),this.usedTextures.has(s)||this.usedTextures.set(s,[]),this.numBytesUsed+=o,this.numUsedTextures++,this.freeTextures.get(s).length>0){this.numFreeTextures--;let e=this.freeTextures.get(s).shift();return this.usedTextures.get(s).push(e),e}this.numBytesAllocated+=o;let n=this.device.createTexture({size:[e,t],format:r,usage:i});return this.usedTextures.get(s).push(n),n}releaseTexture(e){if(0===this.freeTextures.size)return;let t=e.width,r=e.height,i=e.format,a=e.usage,o=getTextureKey(t,r,i,a);this.freeTextures.has(o)||this.freeTextures.set(o,[]),this.freeTextures.get(o).push(e),this.numFreeTextures++,this.numUsedTextures--;let s=this.usedTextures.get(o),n=s.indexOf(e);if(n<0)throw Error("Cannot release a texture that was never provided by this texture manager");s.splice(n,1);let u=getBytesPerElement(i),l=t*r*u;this.numBytesUsed-=l}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){this.freeTextures.forEach((e,t)=>{e.forEach(e=>{e.destroy()})}),this.usedTextures.forEach((e,t)=>{e.forEach(e=>{e.destroy()})}),this.freeTextures=new Map,this.usedTextures=new Map,this.numUsedTextures=0,this.numFreeTextures=0,this.numBytesUsed=0,this.numBytesAllocated=0}};function getTextureKey(e,t,r,i){return`${e}_${t}_${r}_${i}`}function getBytesPerElement(e){if("rgba8unorm"===e)return 16;throw Error(`${e} is not supported!`)}let atomicAddSnippet=(e,t,r)=>"int32"===r?`atomicAdd(${e}, bitcast<i32>(${t}));`:`
          {
            var oldValue = 0;
            loop {
              let newValueF32 = bitcast<f32>(oldValue) + (${t});
              let newValue = bitcast<i32>(newValueF32);
              let res = atomicCompareExchangeWeak(${e}, oldValue, newValue);
              if res.exchanged {
                break;
              }
              oldValue = res.old_value;
            }
          }`;(a=l||(l={}))[a.FROM_PIXELS=0]="FROM_PIXELS",a[a.DRAW=1]="DRAW";let compileProgram=(e,t,r,i,a)=>{let o={dtype:i.dtype,shape:i.shape},s=function(e,t,r){var i;let a;let o=[],s=r.workgroupSize[0]*r.workgroupSize[1]*r.workgroupSize[2];if(r.outputComponent=r.outputComponent?r.outputComponent:1,o.push(`

      var<private> localId: vec3<u32>;
      var<private> localIndex: u32;
      var<private> globalId: vec3<u32>;
      var<private> numWorkgroups: vec3<u32>;
      var<private> workgroupId: vec3<u32>;

      // Only used when the y/z dimension of workgroup size is 1.
      fn getGlobalIndex() -> i32 {
        ${isFlatDispatch(r)?"  return i32(globalId.x);":`  return i32((workgroupId.z * numWorkgroups.x * numWorkgroups.y +
                workgroupId.y * numWorkgroups.x + workgroupId.x) * ${s}u +
                localIndex);
        `}
      }
    `),null!=r.pixelsOpType){let i=r.pixelsOpType===l.FROM_PIXELS?`@group(0) @binding(0) var<storage, read_write> result: array<${dataTypeToGPUType(t.dtype,r.outputComponent)}>;`:`@group(0) @binding(1) var<storage, read> inBuf : array<${dataTypeToGPUType(e[0].dtype,r.outputComponent)}>;`,a=3===t.shape.length?"vec2<i32>":"i32";o.push(`
        struct Uniform {
          outShapeStrides : ${a},
          size            : i32,
          numChannels     : i32,
          alpha           : f32,
        };

        ${i}
        @group(0) @binding(2) var<uniform> uniforms: Uniform;
      `);let s=isFlatDispatchLayout(r);return[y,o.join("\n"),getCoordsFromIndexSnippet(t.shape),r.getUserCode(),getStartHeaderString(s,r)].join("\n")}let n="struct Uniforms { NAN : f32, INFINITY : f32, ";r.variableNames.forEach((t,r)=>{let i=getCoordsDataType(e[r].shape.length);n+=`${t.charAt(0).toLowerCase()+t.slice(1)}Shape : ${i}, `,a=getCoordsDataType(e[r].shape.length-1),n+=`${t.charAt(0).toLowerCase()+t.slice(1)}ShapeStrides: ${a}, `});let u=getCoordsDataType(t.shape.length);n+=`outShape : ${u}, `,a=getCoordsDataType(t.shape.length-1),n+=`
         outShapeStrides: ${a}, `,r.size&&(n+="size : i32, "),r.uniforms&&(n+=r.uniforms),n+="};",n=n.replace(/(\w+)\s*:\s*vec(5|6)/g,e=>"@align(16) "+e).replace(/vec(5|6)\s*,\s*(\w+)/g,(e,t,r)=>`vec${t}, @align(16) ${r}`),o.push(n),r.atomic?o.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<atomic<i32>>;
    `):o.push(`
      @group(0) @binding(0) var<storage, read_write> result: array<${dataTypeToGPUType(t.dtype,r.outputComponent)}>;
    `),r.variableNames.forEach((t,i)=>{o.push(`
      @group(0) @binding(${1+i}) var<storage, read> ${t}: array<${r.variableComponents?dataTypeToGPUType(e[i].dtype,r.variableComponents[i]):dataTypeToGPUType(e[i].dtype,r.outputComponent)}>;
        `)}),""!==n&&o.push(`
      @group(0) @binding(${1+r.variableNames.length}) var<uniform> uniforms: Uniforms;
      `);let d=function(e,t){let{x:r,y:i=[],z:a=[]}=t,o=e.length,s=r.length+i.length+a.length;if(s!==o)return"";if(r.length===o){let e=getCoordsDataType(o),t=`fn getOutputCoords() -> ${e}{
    let globalIndex = getGlobalIndex();
    return getCoordsFromIndex(globalIndex);
  }
  `;return t}let n="",u=[r,i,a];for(let e=0;e<u.length;e++){let t=u[e];if(0!==t.length){if(1===t.length)n+=`let d${t[0]} = i32(globalId[${e}]);`;else{let r=/**
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
 */function(e,t){if(Math.max(...e)>5)throw Error("Cannot symbolically compute strides for rank > 6 tensor.");let r=e.length,i=e.map(e=>`${t}.${"xyzwuv"[e]}`),a=Array(r-1);a[r-2]=i[r-1];for(let e=r-3;e>=0;--e)a[e]=`(${a[e+1]} * ${i[e+1]})`;return a}(t,"uniforms.outShape");n+=`var index${e} = i32(globalId[${e}]);`;for(let i=0;i<r.length;i++)n+=`let d${t[i]} = index${e} / ${r[i]};`,i===r.length-1?n+=`let d${t[i+1]} = index${e} - d${t[i]} * ${r[i]};`:n+=`index${e} = index${e} - d${t[i]} * ${r[i]};`}}}let l=[];for(let e=0;e<s;e++)l.push(`d${e}`);let d=getCoordsDataType(s),p=`fn getOutputCoords() -> ${d} {
  ${n}
`;return 0===l.length?p+=`return ${d}(0); }`:p+=`return ${d}(${l.join(",")}); }`,p}(t.shape,r.dispatchLayout),p=[y,o.join("\n")+x,getCoordsFromIndexSnippet(t.shape),d,function(e){let t="";switch(e){case 0:case 1:t+=`
        fn getOutputIndexFromCoords(coords : i32) -> i32 {
          return coords;
        }
        `;break;case 2:t+=`
        fn getOutputIndexFromCoords(coords : vec2<i32>) -> i32 {
          return dot(coords, vec2<i32>(uniforms.outShapeStrides, 1));
        }
        `;break;case 3:t+=`
        fn getOutputIndexFromCoords(coords : vec3<i32>) -> i32 {
          return dot(coords, vec3<i32>(uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, 1));
        }
        `;break;case 4:t+=`
        fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
          return dot(coords, vec4<i32>(
            uniforms.outShapeStrides.x, uniforms.outShapeStrides.y, uniforms.outShapeStrides.z, 1));
        }
        `;break;case 5:t+=`
        fn getOutputIndexFromCoords(coords : vec5) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u;
        }
        `;break;case 6:t+=`
        fn getOutputIndexFromCoords(coords : vec6) -> i32 {
          return coords.x * uniforms.outShapeStrides.x +
              coords.y * uniforms.outShapeStrides.y +
              coords.z * uniforms.outShapeStrides.z +
              coords.w * uniforms.outShapeStrides.w +
              coords.u * uniforms.outShapeStrides.u +
              coords.v;
        }
        `;break;default:f.D5U.assert(!1,()=>`Unsupported ${e}D shape`)}return t}(t.shape.length)];r.atomic||p.push(function(e,t,r){let i=e.length,a=dataTypeToGPUType(t,r),o=`fn setOutputAtIndex(flatIndex : i32, value : ${typeSnippet(r)}) {
      result[flatIndex] = ${a}(value);
    }

    fn setOutputAtIndexI32(flatIndex : i32, value : ${typeSnippet(r,"i32")}) {
      result[flatIndex] = ${a}(value);
    }
    `;if(i>=2){let e=["d0","d1","d2","d3","d4","d5"].slice(0,i),t=getCoordsDataType(i);o+=`
      fn setOutputAtCoords(${e.map(e=>`${e} : i32`).join(", ")}, value : ${typeSnippet(r)}) {
        let flatIndex = getOutputIndexFromCoords(${t}(${e.join(", ")}));
        setOutputAtIndex(flatIndex${1===r?"":` / ${r}`}, value);
      }
      fn setOutputAtCoordsI32(${e.map(e=>`${e} : i32`).join(", ")}, value : ${typeSnippet(r,"i32")}) {
        let flatIndex = getOutputIndexFromCoords(${t}(${e.join(", ")}));
        setOutputAtIndexI32(flatIndex${1===r?"":` / ${r}`}, value);
      }
    `}return o}(t.shape,t.dtype,r.outputComponent)),r.variableNames.forEach((t,r)=>{p.push(`${getCoordsFromIndexSnippet(e[r].shape,t)}`)});let h=e.map((e,i)=>(function(e,t,r,i){let a=function(e,t){let r=e.name,i=e.shape.length,a=getCoordsDataType(i),o="get"+r.charAt(0).toUpperCase()+r.slice(1),s=["d0","d1","d2","d3","d4","d5"].slice(0,i),n=s.map(e=>`${e} : i32`).join(", ");if(i<1)return`
      fn ${o}() -> ${typeSnippet(t)} {
        return ${typeSnippet(t)}(${r}[0]);
      }
    `;let u=`uniforms.${r.charAt(0).toLowerCase()+r.slice(1)}Shape`,l=`${i}D`;return 0===i&&(l="1D"),`
    fn ${o}(${n}) -> ${typeSnippet(t)} {
      return ${typeSnippet(t)}(${r}[getIndexFromCoords${l}(${a}(${s.join(",")}),
        ${u})${1===t?"":` / ${t}`}]);
    }
   `}(e,r),o=e.shape;return o.length<=t.length&&(a+=function(e,t,r,i){let a=e.name,o=a.charAt(0).toUpperCase()+a.slice(1),s="get"+o+"ByOutput",n=e.shape.length,u=t.length,l=getCoordsDataType(u);if(f.D5U.arraysEqual(e.shape,t)&&i)return`
    fn ${s}Index(globalIndex : i32) -> ${typeSnippet(r)} {
      return ${typeSnippet(r)}(${a}[globalIndex]);
    }

    fn ${s}Coords(coords : ${l}) -> ${typeSnippet(r)} {
      return ${typeSnippet(r)}(${a}[${u>1?"getOutputIndexFromCoords(coords)":"coords"}${1===r?"":` / ${r}`}]);
    }
    `;let d=f.backend_util.getBroadcastDims(e.shape,t),p=u-n,h="";if(0===n)return`
    fn ${s}Index(globalIndex : i32) -> ${typeSnippet(r)}{
      return get${o}();
    }

    fn ${s}Coords(coords : ${l}) -> ${typeSnippet(r)}{
      return get${o}();
    }
  `;h=u<2&&d.length>=1?"coords = 0;":d.map(e=>`coords.${getCoordsXYZ(e+p)} = 0;`).join("\n");let c="";if(u<2&&n>0)c="coords";else if(u>1){let t=getCoordsDataType(n),r=e.shape.map((e,t)=>`coords.${getCoordsXYZ(t+p)}`).join(", ");c=`${t}(${r})`}else c="coords";let m=`uniforms.${a.charAt(0).toLowerCase()+a.slice(1)}Shape`,g=`${n}D`;return`
  fn ${s}Index(globalIndex : i32) -> ${typeSnippet(r)} {
    var coords = getCoordsFromIndex(globalIndex);
    ${h}
    return ${typeSnippet(r)}(${a}[getIndexFromCoords${g}(${c}, ${m})${1===r?"":` / ${r}`}]);
  }

  fn ${s}Coords(coordsIn : ${l}) -> ${typeSnippet(r)} {
    var coords = coordsIn;
    ${h}
    return ${typeSnippet(r)}(${a}[getIndexFromCoords${g}(${c}, ${m})${1===r?"":` / ${r}`}]);
  }
`}(e,t,r,i)),a})(e,t.shape,r.variableComponents?r.variableComponents[i]:r.outputComponent,r.dispatchLayout.x.length===t.shape.length)).join("\n");p.push(h),p.push(r.getUserCode());let c=isFlatDispatchLayout(r);p.push(getStartHeaderString(c,r));let m=p.join("\n");return m}(r,o,t),n=e.createShaderModule({code:s,label:t.constructor.name}),u=(0,f.OBj)().get("WEBGPU_PRINT_SHADER");if(""!==u){u=u.toLowerCase();let e=u.split(",");("all"===u||e.some(e=>t.shaderKey.toLowerCase().includes(e)))&&(console.group(t.shaderKey),console.debug(s),console.groupEnd())}return a?e.createComputePipelineAsync({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"}):e.createComputePipeline({compute:{module:n,entryPoint:"_start"},label:t.constructor.name,layout:"auto"})},typeSnippet=(e,t="f32")=>{switch(e){case 1:return`${t}`;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component ${t} is not supported.`)}};function getCoordsDataType(e){if(e<=1)return"i32";if(2===e)return"vec2<i32>";if(3===e)return"vec3<i32>";if(4===e)return"vec4<i32>";if(5===e)return"vec5";if(6===e)return"vec6";throw Error(`GPU for rank ${e} is not yet supported`)}function getCoordsXYZ(e){if(0===e)return"x";if(1===e)return"y";if(2===e)return"z";if(3===e)return"w";if(4===e)return"u";if(5===e)return"v";throw Error(`Index ${e} is not yet supported`)}function getMainHeaderString(...e){let t;switch(e.length){case 0:t=`
        fn main()
      `;break;case 1:t=`
        fn main(${e[0]} : i32)
      `;break;default:throw Error("Unreachable")}return t}function getStartHeaderString(e,t){return`
     
  @compute @workgroup_size(${t.workgroupSize[0]}, ${t.workgroupSize[1]}, ${t.workgroupSize[2]})

      fn _start(@builtin(local_invocation_id) LocalId : vec3<u32>,
                @builtin(global_invocation_id) GlobalId : vec3<u32>,
                @builtin(local_invocation_index) LocalIndex: u32,
                @builtin(workgroup_id) WorkgroupId : vec3<u32>,
                @builtin(num_workgroups) NumWorkgroups : vec3<u32>) {
        localId = LocalId;
        localIndex = LocalIndex;
        globalId = GlobalId;
        numWorkgroups = NumWorkgroups;
        workgroupId = WorkgroupId;
        ${e?"main(getGlobalIndex());":"main();"};
      }
    `}let y=`
  struct vec5 {x: i32, y: i32, z: i32, w: i32, u: i32};
  struct vec6 {x: i32, y: i32, z: i32, w: i32, u: i32, v: i32};

  // Checks whether coordinates lie within the bounds of the shape.
  fn coordsInBounds2D(coord : vec2<i32>, shape : vec2<i32>) -> bool {
    return all(coord >= vec2<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds3D(coord : vec3<i32>, shape : vec3<i32>) -> bool {
    return all(coord >= vec3<i32>(0)) && all(coord < shape);
  }
  fn coordsInBounds4D(coord : vec4<i32>, shape : vec4<i32>) -> bool {
    return all(coord >= vec4<i32>(0)) && all(coord < shape);
  }

  fn getIndexFromCoords1D(coord : i32, shape : i32) -> i32 {
    return coord;
  }
  fn getIndexFromCoords2D(coords : vec2<i32>, shape : vec2<i32>) -> i32 {
    return dot(coords, vec2<i32>(shape.y, 1));
  }
  fn getIndexFromCoords3D(coords : vec3<i32>, shape : vec3<i32>) -> i32 {
    return dot(coords, vec3<i32>(shape.y * shape.z, shape.z, 1));
  }
  fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
    return dot(coords, vec4<i32>(
        shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
  }
  fn getIndexFromCoords5D(coords : vec5, shape : vec5) -> i32 {
    let shapeStrides: vec5 = vec5(shape.y * shape.z * shape.w * shape.u, shape.z * shape.w * shape.u, shape.w * shape.u, shape.u, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u;
  }
  fn getIndexFromCoords6D(coords : vec6, shape : vec6) -> i32 {
    let shapeStrides: vec6 = vec6(shape.y * shape.z * shape.w * shape.u * shape.v, shape.z * shape.w * shape.u * shape.v, shape.w * shape.u * shape.v, shape.u * shape.v, shape.v, 1);
    return coords.x*shapeStrides.x + coords.y*shapeStrides.y + coords.z*shapeStrides.z + coords.w*shapeStrides.w + coords.u*shapeStrides.u + coords.v*shapeStrides.v;
  }

  // NaN defination in IEEE 754-1985 is :
  //   - sign = either 0 or 1.
  //   - biased exponent = all 1 bits.
  //   - fraction = anything except all 0 bits (since all 0 bits represents infinity).
  // https://en.wikipedia.org/wiki/IEEE_754-1985#Representation_of_non-numbers
  fn isnan(val: f32) -> bool {
    let floatToUint: u32 = bitcast<u32>(val);
    return (floatToUint & 0x7fffffffu) > 0x7f800000u;
  }
  fn isnanVec4(val : vec4<f32>) -> vec4<bool> {
    let floatToUint: vec4<u32> = bitcast<vec4<u32>>(val);
    return (floatToUint & vec4<u32>(0x7fffffffu)) > vec4<u32>(0x7f800000u);
  }
`,x=`
  fn isinf(val: f32) -> bool {
    return abs(val) == uniforms.INFINITY;
  }
`;function getCoordsFromIndexSnippet(e,t=""){let r;let i=e.length,a=""!==t?`get${t.charAt(0).toUpperCase()+t.slice(1)}CoordsFromIndex`:"getCoordsFromIndex",o=""!==t?`${t.charAt(0).toLowerCase()+t.slice(1)}ShapeStrides`:"outShapeStrides";if(i<=1)return`fn ${a}(index : i32) -> i32 { return index; }`;let s=f.D5U.computeStrides(e),n=getCoordsDataType(i),u=[];for(let e=0;e<i;e++)u.push(`d${e}`);return 1===s.length?`    fn ${a}(index : i32) -> vec2<i32> {
      let d0 = index / uniforms.${o}; let d1 = index - d0 * uniforms.${o};
      return vec2<i32>(d0, d1);
    }`:(r="var index2 = index;"+s.map((e,t)=>{let r=`let ${u[t]} = index2 / uniforms.${o}.${getCoordsXYZ(t)}`,i=t===s.length-1?`let ${u[t+1]} = index2 - ${u[t]} * uniforms.${o}.${getCoordsXYZ(t)}`:`index2 = index2 - ${u[t]} * uniforms.${o}.${getCoordsXYZ(t)}`;return`${r}; ${i};`}).join(""),`
    fn ${a}(index : i32) -> ${n} {
      ${r}
      return ${n}(${u.join(",")});
    }
  `)}function isFlatDispatch(e){return 1===e.dispatch[1]&&1===e.dispatch[2]}function dataTypeToGPUType(e,t=1){if("float32"===e)return typeSnippet(t,"f32");if("int32"===e||"bool"===e)return typeSnippet(t,"i32");throw Error(`type ${e} is not supported.`)}function isFlatDispatchLayout(e){return!(e.dispatchLayout.hasOwnProperty("y")&&0!==e.dispatchLayout.y.length||e.dispatchLayout.hasOwnProperty("z")&&0!==e.dispatchLayout.z.length)}/**
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
 */let arrayProduct=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t};function tilesFitEvenlyIntoShape(e,t){if(e.length!==t.length)throw Error(`Cannot compute whether rank ${e.length} tiles fit evenly into rank ${t.length} shape - ranks must match.`);return t.every((t,r)=>t%e[r]==0)}function computeDispatch(e,t,r=[1,1,1],i=[1,1,1]){let[a,o,s]=[Math.ceil(arrayProduct(e.x.map(e=>t[e]))/(r[0]*i[0])),e.y?Math.ceil(arrayProduct(e.y.map(e=>t[e]))/(r[1]*i[1])):1,e.z?Math.ceil(arrayProduct(e.z.map(e=>t[e]))/(r[2]*i[2])):1];return[a,o,s]}function computeWorkgroupInfoForMatMul(e,t,r,i=!1){let a=[8,8,1],o=[4,4,1];return!i&&(e<=8&&(o[1]=1),t<=16&&r<=16&&(a[0]=4)),{workgroupSize:a,elementsPerThread:o}}function computeWorkgroupSizeForConv2d(e,t,r=!1){if(r)return[8,8,1];let i=arrayProduct(e.x.map(e=>t[e])),a=arrayProduct(e.y.map(e=>t[e]));return i<=4?[4,16,1]:a<=4?[16,4,1]:[16,16,1]}function computeWorkPerThreadForConv2d(e,t,r=!1){if(r)return[4,4,1];let i=arrayProduct(e.x.map(e=>t[e])),a=arrayProduct(e.y.map(e=>t[e]));return i<=4?[1,2,1]:a<=4?[2,1,1]:[2,2,1]}function flatDispatchLayout(e){return{x:e.map((e,t)=>t)}}function GPUBytesPerElement(e){if("float32"===e||"int32"===e||"bool"===e||"string"===e)return 4;if("complex64"===e)return 8;throw Error(`Unknown dtype ${e}`)}function isWebGPUSupported(){return!!("undefined"!=typeof globalThis&&globalThis.navigator&&globalThis.navigator.gpu)}function assertNotComplex(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&f.D5U.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the WebGPU backend.`)})}(o=d||(d={}))[o.MatMulReduceProgram=0]="MatMulReduceProgram",o[o.MatMulSplitKProgram=1]="MatMulSplitKProgram",o[o.MatMulSmallOutputSizeProgram=2]="MatMulSmallOutputSizeProgram",o[o.MatMulPackedProgram=3]="MatMulPackedProgram",o[o.MatMulMax=4]="MatMulMax";/**
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
 */let b=(0,f.OBj)().getNumber("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD"),reshapeDispatch=(e,t)=>{let r=e.limits.maxComputeWorkgroupsPerDimension,i=t.dispatchLayout,a=t.dispatch;if(a.every(e=>e<=r))return a;f.D5U.assert(a[0]>r&&void 0===i.y&&void 0===i.z,()=>"Dispatch size exceeds WebGPU limits in Y or Z dimension.");let o=Math.ceil(Math.sqrt(a[0]));return o>r?(o=Math.ceil(Math.cbrt(a[0])),f.D5U.assert(o<=r,()=>"Total dispatch size exceeds WebGPU maximum."),[o,o,o]):[o,o,1]};let WebGPUBackend=class WebGPUBackend extends f.Zuw{nextDataId(){return WebGPUBackend.nextDataId++}constructor(e,t){if(super(),this.commandQueueOwnedIds=new WeakSet,this.dispatchCountInPass=0,this.disposed=!1,this.downloadWaitMs=0,this.tensorDataPendingDisposal=[],this.queryResolveBuffer=null,this.querySet=null,this.querySetCount=2,this.stagingPendingDisposal=[],this.uniformPendingDisposal=[],this.uploadWaitMs=0,this.hasReadSyncWarned=!1,this.hasTimestampQueryWarned=!1,!isWebGPUSupported())throw Error("WebGPU is not supported on this device");this.pipelineCache={},this.device=e,this.queue=e.queue,this.commandEncoder=null,this.computePassEncoder=null,this.adapterInfo=new AdapterInfo(t),this.supportTimestampQuery=this.device.features.has("timestamp-query"),this.thresholdToIncreaseWorkgroups=this.adapterInfo.intelGPUGeneration>=12?16:8,this.bufferManager=new BufferManager(this.device),this.textureManager=new TextureManager(this.device),this.tensorMap=new f.JLz(this,(0,f.SRH)()),(0,f.OBj)().getBool("WEBGPU_USE_PROFILE_TOOL")&&(this.dummyCanvas=document.createElement("canvas"),this.dummyCanvas.width=1,this.dummyCanvas.height=1,this.dummyContext=this.dummyCanvas.getContext("webgpu"),this.dummyContext.configure({device:e,format:"bgra8unorm"}),document.body.appendChild(this.dummyCanvas))}floatPrecision(){return 32}disposeData(e,t=!1){if(!this.tensorMap.has(e))return!0;let r=this.tensorMap.get(e);return t?r.refCount=0:r.refCount--,!(r.refCount>0)&&((null!=r.complexTensorInfos&&(this.disposeData(r.complexTensorInfos.real.dataId),this.disposeData(r.complexTensorInfos.imag.dataId)),this.commandQueueOwnedIds.has(e))?this.tensorDataPendingDisposal.push(e):(this.releaseResource(e),this.tensorMap.delete(e)),!0)}memory(){return{numBytesInGPU:this.bufferManager.numBytesUsed,numBytesAllocatedInGPU:this.bufferManager.numBytesAllocated,unreliable:!1}}releaseResource(e){let t=this.tensorMap.get(e);if(t&&t.resource){if(t.external){t.resource=null;return}t.resource instanceof GPUBuffer?this.bufferManager.releaseBuffer(t.resource):t.resource instanceof GPUTexture&&this.textureManager.releaseTexture(t.resource),t.resource=null}}refCount(e){if(this.tensorMap.has(e)){let t=this.tensorMap.get(e);return t.refCount}return 0}incRef(e){let t=this.tensorMap.get(e);t.refCount++}decRef(e){if(this.tensorMap.has(e)){let t=this.tensorMap.get(e);t.refCount--}}write(e,t,r){if("complex64"===r&&null!=e)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let i={id:this.nextDataId()};return this.tensorMap.set(i,{dtype:r,shape:t,values:e,refCount:1}),i}move(e,t,r,i,a){if("complex64"===i)throw Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.tensorMap.set(e,{dtype:i,shape:r,values:t,refCount:a})}submitQueue(){this.queue.submit([this.commandEncoder.finish()]),this.commandEncoder=null,this.dispatchCountInPass=0,this.commandQueueOwnedIds=new WeakSet,this.tensorDataPendingDisposal.forEach(e=>{this.releaseResource(e),this.tensorMap.delete(e)}),this.uniformPendingDisposal.forEach(e=>this.bufferManager.releaseBuffer(e)),this.stagingPendingDisposal.forEach(e=>this.bufferManager.releaseBuffer(e,!1)),this.tensorDataPendingDisposal=[],this.uniformPendingDisposal=[],this.stagingPendingDisposal=[]}ensureCommandEncoderReady(){this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder())}endComputePassEncoder(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}async checkCompileCompletionAsync(){let e;try{e=await Promise.all(Object.values(this.pipelineCache))}catch(e){throw Error(e.message)}Object.keys(this.pipelineCache).map((t,r)=>{this.pipelineCache[t]=e[r]})}async getBufferData(e){if((0,f.OBj)().getBool("WEBGPU_ENGINE_COMPILE_ONLY"))return console.warn("The data may be invalid since WEBGPU_ENGINE_COMPILE_ONLY is true, this can only be called when WEBGPU_ENGINE_COMPILE_ONLY is false"),null;let t=e.size,r=this.bufferManager.acquireBuffer(t,GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(e,0,r,0,t),this.submitQueue(),await r.mapAsync(GPUMapMode.READ);let i=r.getMappedRange().slice(0);return r.unmap(),null!=r&&this.bufferManager.releaseBuffer(r),(0,f.OBj)().getBool("WEBGPU_USE_PROFILE_TOOL")&&(f.D5U.assert(void 0!==this.dummyContext,()=>"Fail to get context for profiling tool"),this.dummyContext.getCurrentTexture()),i}convertAndCacheOnCPU(e,t){let r=this.tensorMap.get(e);return r.values=t,r.values}readSync(e){let t=this.tensorMap.get(e),{values:r,complexTensorInfos:i}=t;if(null!=r||"string"===t.dtype)return r;if("complex64"===t.dtype){let t=this.readSync(i.real.dataId),r=this.readSync(i.imag.dataId),a=f.D5U.convertBackendValuesAndArrayBuffer(f.backend_util.mergeRealAndImagArrays(t,r).buffer,"float32");return this.convertAndCacheOnCPU(e,a),a}this.hasReadSyncWarned||(this.hasReadSyncWarned=!0,console.warn("The performance of synchronously reading data from GPU to CPU is poor on the webgpu backend, please use asynchronous APIs instead."));let a=["opaque","premultiplied"],o=t.resource,s=o.size;f.D5U.assert(s%4==0,()=>"Because there is 4 bytes for one pixel, buffer size must be multiple of 4.");let n=s/4,u=new ArrayBuffer(s),l=a.map(e=>new OffscreenCanvas(256,256)),d=new OffscreenCanvas(256,256);this.endComputePassEncoder(),l.map((e,t)=>{let r=e.getContext("webgpu");return r.configure({device:this.device,format:"bgra8unorm",usage:GPUTextureUsage.COPY_DST,alphaMode:a[t]}),r.getCurrentTexture()}).map((e,t)=>{let readDataGPUToCPU=(r,i,s)=>{this.ensureCommandEncoderReady(),this.commandEncoder.copyBufferToTexture({buffer:o,bytesPerRow:1024,offset:s},{texture:e},{width:r,height:i}),this.submitQueue();let n=d.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,r,i),n.drawImage(l[t],0,0);let p=n.getImageData(0,0,r,i).data,h=a[t],c=new Uint8ClampedArray(u,s,r*i*4);for(let e=0;e<c.length;e+=4)if("premultiplied"===h)c[e+3]=p[e+3];else{let t=p[e];c[e]=p[e+2],c[e+1]=p[e+1],c[e+2]=t}},r=Math.floor(n/65536),i=256,s=256,p=0;for(let e=0;e<r;e++)readDataGPUToCPU(i,s,p),p+=262144;let h=n%65536;(s=Math.floor(h/256))>0&&(readDataGPUToCPU(i,s,p),p+=1024*s),(i=h%256)>0&&readDataGPUToCPU(i,1,p)});let p=f.D5U.convertBackendValuesAndArrayBuffer(u,t.dtype);return this.convertAndCacheOnCPU(e,p),p}async read(e){let t;if(!this.tensorMap.has(e))throw Error(`Tensor ${e} was not registered!`);let r=this.tensorMap.get(e),{values:i}=r;if(null!=i)return i;if("complex64"===r.dtype){let e=await Promise.all([this.read(r.complexTensorInfos.real.dataId),this.read(r.complexTensorInfos.imag.dataId)]),i=e[0],a=e[1];t=f.backend_util.mergeRealAndImagArrays(i,a)}else{let e=await this.getBufferData(r.resource);t=f.D5U.convertBackendValuesAndArrayBuffer(e,r.dtype)}return this.convertAndCacheOnCPU(e,t),t}copyBuffer(e){let t=e.size,r=e.usage,i=this.bufferManager.acquireBuffer(t,r);return this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(e,0,i,0,t),this.submitQueue(),i}createTensorFromGPUData(e,t,r){let i=e.buffer;if("complex64"===r)throw Error("Cannot write to a complex64 dtype. ");let a={id:this.nextDataId()};this.tensorMap.set(a,{dtype:r,shape:t,values:null,refCount:1,external:e.zeroCopy});let o=this.tensorMap.get(a),s=GPUBytesPerElement(o.dtype)*f.D5U.sizeFromShape(o.shape);if(e.buffer.size<s)throw Error(`GPUBuffer size(${e.buffer.size}) is smaller than tensor size(${s})!`);if((e.buffer.usage&(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))!=(GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC))throw Error("GPUBuffer.usage should include GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC!");return!0!==e.zeroCopy&&(i=this.copyBuffer(i)),o.resource=i,(0,f.SRH)().makeTensorFromDataId(a,t,r,this)}readToGPU(e){let t=this.tensorMap.get(e),{values:r,dtype:i,shape:a,resource:o}=t;if("complex64"===i)throw Error("Does not support reading buffer for complex64 dtype.");if(null==o){if(null!=r)throw Error("Data is not on GPU but on CPU.");throw Error("There is no data on GPU or CPU.")}let s=o.size,n=o.usage,u=this.bufferManager.acquireBuffer(s,n);this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(o,0,u,0,s),this.submitQueue();let l=this.makeTensorInfo(a,i),d=(0,f.SRH)().makeTensorFromTensorInfo(l),p=this.tensorMap.get(l.dataId);return p.resource=u,{tensorRef:d,buffer:u}}bufferSync(e){let t=this.readSync(e.dataId);if("string"===e.dtype)try{let r=t.map(e=>f.D5U.decodeString(e));return(0,f.f3b)(e.shape,e.dtype,r)}catch(e){throw Error("Failed to decode encoded string bytes into utf-8")}return(0,f.f3b)(e.shape,e.dtype,t)}async time(e){this.supportTimestampQuery||this.hasTimestampQueryWarned||(console.warn("This device doesn't support timestamp-query extension. Start Chrome browser with flag --enable-dawn-features=allow_unsafe_apis to try it again. Otherwise, zero will be shown for the kernel time when profiling mode is enabled."),this.hasTimestampQueryWarned=!0);let t=this.activeTimers,r=[],i=!1;null==this.programTimersStack?(this.programTimersStack=r,i=!0):this.activeTimers.push(r),this.activeTimers=r,e();let a=f.D5U.flatten(this.activeTimers.map(e=>e.query)).filter(e=>null!=e),o=f.D5U.flatten(this.activeTimers.map(e=>e.name)).filter(e=>null!=e);this.activeTimers=t,i&&(this.programTimersStack=null);let s={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},n=await Promise.all(a);return s.kernelMs=f.D5U.sum(n),s.getExtraProfileInfo=()=>n.map((e,t)=>({name:o[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(", "),this.uploadWaitMs=0,this.downloadWaitMs=0,s}makeTensorInfo(e,t,r){"string"===t&&null!=r&&r.length>0&&f.D5U.isString(r[0])&&(r=r.map(e=>f.D5U.encodeString(e)));let i=this.write(r,e,t);return{dataId:i,shape:e,dtype:t}}tensorToBinding(e){if(!e)return null;let t=this.tensorMap.get(e.dataId),r=t.resource;return r instanceof GPUBuffer?{buffer:r}:r instanceof GPUTexture?r.createView():r}uploadToGPU(e){let t;let r=this.tensorMap.get(e);if(null!=r.resource)return;let i=GPUBytesPerElement(r.dtype)*f.D5U.sizeFromShape(r.shape),a=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST;if(r.values){if("unmapped"===(t=this.bufferManager.acquireBuffer(i,a,!0)).mapState){let e=this.bufferManager.acquireBuffer(i,GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC,!0,!1),a=e.getMappedRange();"int32"===r.dtype||"bool"===r.dtype?new Int32Array(a).set(r.values):new Float32Array(a).set(r.values),e.unmap(),this.ensureCommandEncoderReady(),this.endComputePassEncoder(),this.commandEncoder.copyBufferToBuffer(e,0,t,0,i),this.stagingPendingDisposal.push(e)}else{let e=t.getMappedRange();"int32"===r.dtype||"bool"===r.dtype?new Int32Array(e).set(r.values):new Float32Array(e).set(r.values),t.unmap()}r.values=null}else t=this.bufferManager.acquireBuffer(i,a);r.resource=t}makeUniforms(e){let t=0,r=0,i=[],a=1;e.forEach(e=>{let o;switch(0===e.data.length&&(e.data=[1]),e.data.length){case 1:o=4;break;case 2:o=8;break;case 3:case 4:case 5:case 6:o=16;break;default:f.D5U.assert(!1,()=>`Unsupported ${e.data.length}D shape`)}(5===r||6===r)&&(o=16),o>a&&(a=o),t=Math.ceil(t/o)*o,r=e.data.length,i.push(t),t+=4*e.data.length}),t=Math.ceil(t/a)*a;let o=new ArrayBuffer(t);e.forEach((e,t)=>{let r=i[t];"int32"===e.type?new Int32Array(o,r,e.data.length).set(e.data):"uint32"===e.type?new Uint32Array(o,r,e.data.length).set(e.data):new Float32Array(o,r,e.data.length).set(e.data)});let s=this.bufferManager.acquireBuffer(t,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);return this.queue.writeBuffer(s,0,o,0,t),this.uniformPendingDisposal.push(s),{offset:0,size:t,buffer:s}}runWebGPUProgram(e,t,r,i,a){if(a||(a=this.makeTensorInfo(e.outputShape,r)),0===f.D5U.sizeFromShape(a.shape))return this.tensorMap.get(a.dataId).values=f.D5U.getTypedArrayFromDType(a.dtype,0),a;this.uploadToGPU(a.dataId),e.dispatch=reshapeDispatch(this.device,e);let o=t.map((t,r)=>{if("complex64"===t.dtype)throw Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");return this.uploadToGPU(t.dataId),{dtype:this.tensorMap.get(t.dataId).dtype,shape:t.shape,name:e.variableNames[r]}});e.shaderKey=function(e,t,r){let i=e.shaderKey;if(null!=e.pixelsOpType)return i;let a=[],o=[];t.forEach(e=>{a.push(e.shape),o.push(e.dtype)}),a.push(r.shape),o.push(r.dtype);let s=t.map(e=>f.backend_util.getBroadcastDims(e.shape,r.shape)),n=t.map(e=>f.D5U.arraysEqual(e.shape,r.shape)).join("_"),u=s.map(e=>e.join("_")).join(";"),l=isFlatDispatch(e)?"flatDispatch":"";return i+("_"+(e.workgroupSize?e.workgroupSize.join(","):"")+a.map(e=>e.length).join(",")+o.join(",")+e.variableNames.join(",")+u+n)+l}(e,o,a);let s=(0,f.OBj)().getBool("WEBGPU_ENGINE_COMPILE_ONLY");return e.shaderKey in this.pipelineCache||(this.pipelineCache[e.shaderKey]=compileProgram(this.device,e,o,a,s)),e.pipeline=this.pipelineCache[e.shaderKey],s||this.recordAndSubmit(e,a,t,i),a}recordAndSubmit(e,t,r,i){if(e.pipeline instanceof Promise)throw Error("Please call checkCompileCompletionAsync to ensure parallel compilation is done!");let a=[],o=[],s="int32";if(null==e.pixelsOpType){a.push({type:"float32",data:[NaN]},{type:"float32",data:[1/0]}),o=r.concat(t).map(e=>e.shape);let e="int32";o.map(t=>{a.push({type:e,data:t});let r=f.D5U.computeStrides(t);a.push({type:e,data:r})})}else{let e=f.D5U.computeStrides(t.shape);a.push({type:s,data:e})}if(e.size){let t=f.D5U.sizeFromShape(e.outputShape);a.push({type:s,data:[e.outputComponent?t/e.outputComponent:t]})}i&&(a=[...a,...i]);let n=[this.tensorToBinding(t),...r.map(e=>this.tensorToBinding(e)),this.makeUniforms(a)];r.forEach(e=>{this.commandQueueOwnedIds.add(e.dataId)}),this.commandQueueOwnedIds.add(t.dataId);let u=this.device.createBindGroup({layout:e.pipeline.getBindGroupLayout(0),entries:n.map((e,t)=>({binding:t,resource:e}))}),d=null!=this.activeTimers;this.ensureCommandEncoderReady();let p={};d&&this.supportTimestampQuery?(this.endComputePassEncoder(),null==this.querySet&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.querySetCount})),p.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1},this.computePassEncoder=this.commandEncoder.beginComputePass(p)):this.computePassEncoder||(this.computePassEncoder=this.commandEncoder.beginComputePass(p)),this.computePassEncoder.setPipeline(e.pipeline),this.computePassEncoder.setBindGroup(0,u),this.computePassEncoder.dispatchWorkgroups(e.dispatch[0],e.dispatch[1],e.dispatch[2]),this.dispatchCountInPass++,(d||(0,f.OBj)().get("WEBGPU_DEFERRED_SUBMIT_BATCH_SIZE")<=this.dispatchCountInPass||e.pixelsOpType===l.DRAW)&&(this.endComputePassEncoder(),d?this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime()}):this.submitQueue())}async getQueryTime(){if(!this.supportTimestampQuery)return 0;null==this.queryResolveBuffer&&(this.queryResolveBuffer=this.bufferManager.acquireBuffer(8*this.querySetCount,GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST|GPUBufferUsage.QUERY_RESOLVE)),this.commandEncoder.resolveQuerySet(this.querySet,0,this.querySetCount,this.queryResolveBuffer,0);let e=this.bufferManager.acquireBuffer(8*this.querySetCount,GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST);this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,8*this.querySetCount),this.submitQueue(),await e.mapAsync(GPUMapMode.READ);let t=new BigUint64Array(e.getMappedRange()),r=Number(t[1]-t[0])/1e6;return e.unmap(),this.bufferManager.releaseBuffer(e),r}shouldExecuteOnCPU(e,t=b){return(0,f.OBj)().getBool("WEBGPU_CPU_FORWARD")&&e.every(e=>null==this.tensorMap.get(e.dataId).resource&&f.D5U.sizeFromShape(e.shape)<t)}numDataIds(){return this.tensorMap.numDataIds()-this.tensorDataPendingDisposal.length}dispose(){this.disposed||(null!=this.querySet&&this.querySet.destroy(),this.bufferManager.dispose(),this.textureManager.dispose(),this.disposed=!0)}};WebGPUBackend.nextDataId=0,isWebGPUSupported()&&(0,f.jqO)("webgpu",async()=>{let e={powerPreference:(0,f.OBj)().get("WEBGPU_USE_LOW_POWER_GPU")?"low-power":"high-performance"},t=await navigator.gpu.requestAdapter(e),r={},i=[];t.features.has("timestamp-query")&&i.push("timestamp-query"),t.features.has("bgra8unorm-storage")&&i.push(["bgra8unorm-storage"]),r.requiredFeatures=i;let a=t.limits;r.requiredLimits={maxComputeWorkgroupStorageSize:a.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:a.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:a.maxStorageBufferBindingSize,maxBufferSize:a.maxBufferSize,maxComputeWorkgroupSizeX:a.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:a.maxComputeInvocationsPerWorkgroup};let o=await t.requestDevice(r),s=await t.requestAdapterInfo();return new WebGPUBackend(o,s)},3),(s=p||(p={}))[s.ADD=0]="ADD",s[s.ATAN2=1]="ATAN2",s[s.COMPLEX_MULTIPLY_IMAG=2]="COMPLEX_MULTIPLY_IMAG",s[s.COMPLEX_MULTIPLY_REAL=3]="COMPLEX_MULTIPLY_REAL",s[s.DIV=4]="DIV",s[s.ELU_DER=5]="ELU_DER",s[s.EQUAL=6]="EQUAL",s[s.FLOOR_DIV=7]="FLOOR_DIV",s[s.GREATER=8]="GREATER",s[s.GREATER_EQUAL=9]="GREATER_EQUAL",s[s.LESS=10]="LESS",s[s.LESS_EQUAL=11]="LESS_EQUAL",s[s.LOGICAL_AND=12]="LOGICAL_AND",s[s.LOGICAL_OR=13]="LOGICAL_OR",s[s.MAX=14]="MAX",s[s.MIN=15]="MIN",s[s.MOD=16]="MOD",s[s.MUL=17]="MUL",s[s.NOT_EQUAL=18]="NOT_EQUAL",s[s.POW=19]="POW",s[s.PRELU=20]="PRELU",s[s.SQUARED_DIFFERENCE=21]="SQUARED_DIFFERENCE",s[s.SUB=22]="SUB";let S=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a == b);
`,w=`
  let remainder =
      select(a % b, round(a % b), (round(a) == a) & (round(b) == b));
  let quotient = (a - remainder) / b;
  let resultTemp =
      round(select(quotient, quotient - 1, sign(remainder) == -sign(b)));
`,C=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a > b);
`,v=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a >= b);
`,I=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a < b);
`,k=`
  let zero = sign(a) * 0 + 0;
  let one = sign(b) * 0 + 1;
  let resultTemp = select(zero, one, a <= b);
`,P=`return (vec4<f32>(a >= vec4<f32>(1.0)) *
  vec4<f32>(b >= vec4<f32>(1.0)));`,D=`return min(vec4<f32>(a >= vec4<f32>(1.0)) +
  vec4<f32>(b >= vec4<f32>(1.0)), vec4<f32>(1.0));`,R=`
  let isNaN = b == 0.;
  var resultTemp = a % b;
  resultTemp = select((resultTemp + b) % b, resultTemp,
      (a < 0. && b < 0.) || (a >= 0. && b > 0.));
`,$=`
  let isNaN = !vec4<bool>(b);
  var resultTemp = vec4<f32>(a % b);
  if (!((a[0] < 0. && b[0] < 0.) || (a[0] >= 0. && b[0] > 0.))) {
    resultTemp[0] = (resultTemp[0] + b[0]) % b[0];
  }
  if (!((a[1] < 0. && b[1] < 0.) || (a[1] >= 0. && b[1] > 0.))) {
    resultTemp[1] = (resultTemp[1] + b[1]) % b[1];
  }
  if (!((a[2] < 0. && b[2] < 0.) || (a[2] >= 0. && b[2] > 0.))) {
    resultTemp[2] = (resultTemp[2] + b[2]) % b[2];
  }
  if (!((a[3] < 0. && b[3] < 0.) || (a[3] >= 0. && b[3] > 0.))) {
    resultTemp[3] = (resultTemp[3] + b[3]) % b[3];
  }
`,z=`
  var resultTemp = f32(a != b);
  let valueForNaN = 1.0;
`,N=`
  var resultTemp = vec4<f32>(a != b);
  let valueForNaN = 1.0;
`,F=`
  let isNaN = a < 0.0 && floor(b) < b;
  if (b == 0.0) {
    return 1.0;
  }
  var resultTemp = select(sign(a) * pow(abs(a), b), pow(abs(a), b),
      round(abs(b) % 2.0) != 1.0);
`,A=`
  let isModRound1Bool = vec4<i32>(round(abs(b) % vec4<f32>(2.0))) == vec4<i32>(1);
  let isModRound1 = vec4<f32>(isModRound1Bool);
  let multiplier = sign(a) * isModRound1 + (vec4<f32>(1.0) - isModRound1);
  var resultTemp = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  let isExpZero = b == vec4<f32>(0.0);
  if (isExpZero.r) {
    resultTemp.r = 1.0;
  }
  if (isExpZero.g) {
    resultTemp.g = 1.0;
  }
  if (isExpZero.b) {
    resultTemp.b = 1.0;
  }
  if (isExpZero.a) {
    resultTemp.a = 1.0;
  }
  let isNaN = (a < vec4<f32>(0.0)) & (floor(b) < b);
`,T=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (b * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`;function getBinaryOpString(e,t){let r;do{let i,a,o;switch(e){case p.ATAN2:r="let resultTemp = atan2(a, b);";break;case p.MAX:r="let resultTemp = max(a, b);";break;case p.MIN:r="let resultTemp = min(a, b);";break;case p.MOD:r=t?$:R;break;case p.NOT_EQUAL:r=t?N:z;break;case p.POW:r=t?A:F;break;default:continue}return t?(i="isnanVec4",a="vec4<f32>",o="vec4<bool>"):(i="isnan",a="f32",o="bool"),`
      let aIsNaN = ${i}(a);
      let aPostLegalization = select(a, ${a}(42), aIsNaN);
      let bIsNaN = ${i}(b);
      let bPostLegalization = select(b, ${a}(42), bIsNaN);
      let isNaN = false;
      let valueForNaN = uniforms.NAN;
      {
        let a = aPostLegalization;
        let b = bPostLegalization;
        ${r}
        return select(
            resultTemp, ${a}(valueForNaN),
            ${o}(isNaN) | aIsNaN | bIsNaN);
      }
    `}while(!1);switch(e){case p.ADD:r="let resultTemp = a + b;";break;case p.COMPLEX_MULTIPLY_IMAG:r="let resultTemp = areal * bimag + aimag * breal;";break;case p.COMPLEX_MULTIPLY_REAL:r="let resultTemp = areal * breal - aimag * bimag;";break;case p.DIV:r="let resultTemp = a / b;";break;case p.ELU_DER:r="let resultTemp = select(a * (b + 1.0), a, b >= b - b);";break;case p.EQUAL:r=S;break;case p.FLOOR_DIV:r=w;break;case p.GREATER:r=C;break;case p.GREATER_EQUAL:r=v;break;case p.LESS:r=I;break;case p.LESS_EQUAL:r=k;break;case p.LOGICAL_AND:return t?P:"return f32(a >= 1.0 && b >= 1.0);";case p.LOGICAL_OR:return t?D:"return f32(a >= 1.0 || b >= 1.0);";case p.MUL:r="let resultTemp = a * b;";break;case p.PRELU:return t?T:"if (a < 0.0) { return b * a; }  return a;";case p.SQUARED_DIFFERENCE:r="let resultTemp = (a - b) * (a - b);";break;case p.SUB:r="let resultTemp = a - b;"}return`
    ${r}
    return resultTemp;
  `}(n=h||(h={}))[n.ABS=0]="ABS",n[n.ACOS=1]="ACOS",n[n.ACOSH=2]="ACOSH",n[n.ASIN=3]="ASIN",n[n.ASINH=4]="ASINH",n[n.ATAN=5]="ATAN",n[n.ATANH=6]="ATANH",n[n.CEIL=7]="CEIL",n[n.COS=8]="COS",n[n.COSH=9]="COSH",n[n.ELU=10]="ELU",n[n.ERF=11]="ERF",n[n.EXP=12]="EXP",n[n.EXPM1=13]="EXPM1",n[n.FLOOR=14]="FLOOR",n[n.IS_FINITE=15]="IS_FINITE",n[n.IS_INF=16]="IS_INF",n[n.IS_NAN=17]="IS_NAN",n[n.LINEAR=18]="LINEAR",n[n.LOG=19]="LOG",n[n.LOG1P=20]="LOG1P",n[n.LOGICAL_NOT=21]="LOGICAL_NOT",n[n.NEG=22]="NEG",n[n.RELU=23]="RELU",n[n.RELU6=24]="RELU6",n[n.LEAKYRELU=25]="LEAKYRELU",n[n.RECIPROCAL=26]="RECIPROCAL",n[n.ROUND=27]="ROUND",n[n.RSQRT=28]="RSQRT",n[n.SELU=29]="SELU",n[n.SIGMOID=30]="SIGMOID",n[n.SIGN=31]="SIGN",n[n.SIN=32]="SIN",n[n.SINH=33]="SINH",n[n.SOFTPLUS=34]="SOFTPLUS",n[n.SQRT=35]="SQRT",n[n.SQUARE=36]="SQUARE",n[n.STEP=37]="STEP",n[n.TAN=38]="TAN",n[n.TANH=39]="TANH",n[n.TO_INT=40]="TO_INT";let U=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return acos(a);
`,L=`
  if (a < 1.) {
    return uniforms.NAN;
  }
  return acosh(a);
`,_=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  return asin(a);
`,B=`
  if (isnan(a)) {
    return uniforms.NAN;
  }
  return atan(a);
`,O=`
  if (abs(a) > 1.) {
    return uniforms.NAN;
  }
  if (a == 1.) {
    return uniforms.INFINITY;
  }
  if (a == -1.) {
    return -uniforms.INFINITY;
  }
  return atanh(a);
`,W=`
  let e2x = exp(-a);
  return (e2x + 1.0 / e2x) / 2.0;
`,M=`
  var resFloat = exp(a) - vec4<f32>(1.0);
  if (a.r >= 0.0) {
    resFloat.r = a.r;
  }
  if (a.g >= 0.0) {
    resFloat.g = a.g;
  }
  if (a.b >= 0.0) {
    resFloat.b = a.b;
  }
  if (a.a >= 0.0) {
    resFloat.a = a.a;
  }
  return resFloat;
`,E=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  let p = ${f.backend_util.ERF_P};
  let a1 = ${f.backend_util.ERF_A1};
  let a2 = ${f.backend_util.ERF_A2};
  let a3 = ${f.backend_util.ERF_A3};
  let a4 = ${f.backend_util.ERF_A4};
  let a5 = ${f.backend_util.ERF_A5};

  let sign = sign(a);
  let absA = abs(a);
  let t = 1.0 / (1.0 + p * absA);
  return sign * (1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-absA * absA));
`,V=`if (a < 0.0) { return uniforms.NAN; }
  return log(a);`,H=`
  if (isnan(a)) { return a; }
  return log(1.0 + a);
`,G=`
  let aLessThanZero = vec4<f32>(a < vec4<f32>(0.0));
  return (aLessThanZero * (uniforms.alpha * a)) + ((vec4<f32>(1.0) - aLessThanZero) * a);
`,K=`
  return select(a, vec4<f32>(0.0), a < vec4<f32>(0.0));
`,X=`
  if (a >= 0.0) {
    return ${f.backend_util.SELU_SCALE} * a;
  } else {
    return ${f.backend_util.SELU_SCALEALPHA} * (exp(a) - 1.0);
  }
`,q=`
  let e2x = exp(a);
  return (e2x - 1.0 / e2x) / 2.0;
`,Y=`
  let epsilon = 1.1920928955078125e-7;
  let threshold = log(epsilon) + 2.0;

  let too_large = a > -threshold;
  let too_small = a < threshold;
  let exp_a = exp(a);

  if (too_large) {
    return a;
  } else if (too_small) {
    return exp_a;
  } else {
    return log(exp_a + 1.0);
  }
`,j=`
  if (isnan(a)) {
    return a;
  }

  return select(uniforms.stepAlpha, 1.0, a > 0.0);
`,Q=`
  let e2x = exp(-2.0 * abs(a));
  return sign(a) * (1.0 - e2x) / (1.0 + e2x);
`;function getUnaryOpString(e,t){switch(e){case h.ABS:return"return abs(a);";case h.ACOS:return U;case h.ACOSH:return L;case h.ASIN:return _;case h.ASINH:return"return asinh(a);";case h.ATAN:return B;case h.ATANH:return O;case h.COS:return"return cos(a);";case h.COSH:return W;case h.CEIL:return"return ceil(a);";case h.ELU:return t?M:"if (a >= 0.0) { return a; }  return (exp(a) - 1.0);";case h.ERF:return E;case h.EXP:return"return exp(a);";case h.EXPM1:return"return exp(a) - 1.0;";case h.FLOOR:return"return floor(a);";case h.IS_FINITE:return"return f32(!isnan(a) && !isinf(a));";case h.IS_INF:return"return f32(isinf(a));";case h.IS_NAN:return"return f32(isnan(a));";case h.LINEAR:return"return a;";case h.LOG:return V;case h.LOG1P:return H;case h.LOGICAL_NOT:return"return f32(!(a >= 1.0));";case h.NEG:return"return -a;";case h.LEAKYRELU:return t?G:"if (a < 0.0) { return uniforms.alpha * a; } return a;";case h.RECIPROCAL:return"return 1.0 / a;";case h.RELU:return t?K:"return select(a, 0.0, a < 0.0);";case h.RELU6:return t?"return clamp(a, vec4<f32>(0.0, 0.0, 0.0, 0.0), vec4<f32>(6.0, 6.0, 6.0, 6.0));":"return clamp(a, 0.0, 6.0);";case h.ROUND:return"return round(a);";case h.RSQRT:return"return inverseSqrt(a);";case h.SELU:return X;case h.SIGMOID:return"return 1.0 / (1.0 + exp(-1.0 * a));";case h.SIGN:return"return sign(a);";case h.SIN:return"return sin(a);";case h.SINH:return q;case h.SOFTPLUS:return Y;case h.SQRT:return"return sqrt(a);";case h.SQUARE:return"return a * a;";case h.STEP:return j;case h.TAN:return"return tan(a);";case h.TANH:return Q;case h.TO_INT:return"return f32(i32((a)));";default:throw Error(`BinaryType ${e} is not implemented!`)}}/**
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
 */function activationFnSnippet(e,t=!1,r=!1,i=3){if(null===e)return"";let a="";if("linear"===e)a=getUnaryOpString(h.LINEAR);else if("relu"===e)a=getUnaryOpString(h.RELU,r);else if("elu"===e)a=getUnaryOpString(h.ELU,r);else if("relu6"===e)a=getUnaryOpString(h.RELU6,r);else if("prelu"===e)a=getBinaryOpString(p.PRELU,r);else if("sigmoid"===e)a=getUnaryOpString(h.SIGMOID,r);else if("leakyrelu"===e)a=getUnaryOpString(h.LEAKYRELU,r);else throw Error(`Activation ${e} has not been implemented for the WebGPU backend.`);let o=r?4:1,s=typeSnippet(o);return t?`
      fn activation(a : ${s}, coords : vec${i}<i32>) -> ${s} {
        let b = getPreluActivationWeightsByOutputCoords(coords);
        ${a}
      }`:`
      fn activation(a : ${s}, coords : vec${i}<i32>) -> ${s} {
        ${a}
      }`}function biasActivationSnippet(e,t){return`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      ${t?"value = activation(value, coords);":""}
      `}/**
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
 */function matMulReadFnSource(e,t,r=!1,i=!1,a=!1,o=1){f.D5U.assert(e&&1===o||!e,()=>`transposeA ${e} is not compatible with component size ${o}`);let s=`
      ${e?"value = getA(batch, col, row);":"value = getA(batch, row, col);"}

    `;return`
  fn mm_readA(batch: i32, row: i32, col: i32) -> ${typeSnippet(o)} {
    var value = ${typeSnippet(o)}(0.0);
    ${r&&a?s:`
    ${e?"if(row < uniforms.dimAOuter && col < uniforms.dimInner)":"if(row < uniforms.aShape[1] && col < uniforms.aShape[2])"}
    {
      ${s}
    }
    `}
    return value;
  }

  fn mm_readB(batch: i32, row: i32, col: i32) -> ${typeSnippet(o)} {
    var value = ${typeSnippet(o)}(0.0);
    ${t?"value = getB(batch, col, row);":"value = getB(batch, row, col);"}
    return value;
  }
  `}function matMulReadWriteFnSource(e,t,r,i,a=!1,o=!1,s=!1,n=1){return`
  ${matMulReadFnSource(r,i,a,o,s,n)}
  fn mm_write(batch: i32, row: i32, col: i32, valueIn: ${typeSnippet(n)}) {
    ${a&&o?"":"if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)"}
    {
      var value = valueIn;
      let coords = vec3<i32>(batch, row, col);
      ${biasActivationSnippet(e,t)}
      setOutputAtCoords(coords[0], coords[1], coords[2], value);
    }
  }
  `}let writeDataToSubAVec4Snippet=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol * ${t});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRow + innerRow,
          kStart + inputCol * ${t});
        `,calculateResultSnippet=(e,t,r,i)=>{if(e)return`
      for (var k = 0; k < ${i}; k++) {
        let BCached0 = mm_Bsub[k][tileCol];
        let ACached0 = mm_Asub[k][localRow];
        for (var i = 0; i < ${r}; i++) {
          acc[i] = fma(BCached0, vec4<f32>(ACached0[i]), acc[i]);
        }
      }`;{let e="",a="";for(let r=0;r<t;r++)e+=`let BCached${r} = mm_Bsub[k * ${t} + ${r}][tileCol];`,a+=`acc[i] = fma(BCached${r}, vec4<f32>(ACached[${r}]), acc[i]);`;return`
      for (var k = 0; k < ${i/t}; k++) {
        ${e}
        for (var i = 0; i < ${r}; i++) {
          let ACached = mm_Asub[tileRow + i][k];
          ${a}
        }
      }`}};function makeMatMulPackedVec4Source(e,t,r=!1,i=32,a=!1,o=32,s=!1){let n=t[1]*e[1],u=t[0]*e[0],l=r?n:i,d=r?i:n,p=l/t[0],h=i/t[1],c=e[1],m=e[0];return f.D5U.assert((r&&4===p&&4===e[1]||!r&&(3===p||4===p))&&l%t[0]==0&&i%t[1]==0&&4===e[0],()=>`If transposeA ${r} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
          Otherwise, innerElementSize ${p} must be 3 or 4.
      tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`),`
  var<workgroup> mm_Asub : array<array<vec${p}<f32>, ${l/p}>, ${d}>;
  var<workgroup> mm_Bsub : array<array<vec4<f32>, ${u/e[0]}>, ${i}>;

  ${getMainHeaderString()} {
    let localRow = i32(localId.y);
    let tileRow = localRow * ${c};
    let tileCol = i32(localId.x);

    let globalRow = i32(globalId.y) * ${c};
    let globalCol = i32(globalId.x) * ${m};
    let batch = ${a?"0":"i32(globalId.z)"};
    let batchA = ${a||!s?"batch":"batch % uniforms.aShape[0]"};
    let batchB = ${a||!s?"batch":"batch % uniforms.bShape[0]"};
    let globalRowStart = i32(workgroupId.y) * ${n};

    let numTiles = ${a?`${Math.ceil(o/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc: array<vec4<f32>, ${c}>;

    // Loop over shared dimension.
    let tileRowB = localRow * ${h};
    for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var innerRow = 0; innerRow < ${c}; innerRow++) {
            let inputRow = tileRow + innerRow;
            let inputCol = tileCol;
            ${writeDataToSubAVec4Snippet(r,p)}
        }

        // Load one tile of B into local memory.
        for (var innerRow = 0; innerRow < ${h}; innerRow++) {
            let inputRow = tileRowB + innerRow;
            let inputCol = tileCol;
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB, kStart + inputRow, globalCol);
        }
        kStart = kStart + ${i};
        workgroupBarrier();

        // Compute acc values for a single thread.
        ${calculateResultSnippet(r,p,c,i)}
        workgroupBarrier();
    }

    for (var innerRow = 0; innerRow < ${c}; innerRow++) {
        mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
    }
  }`}let writeDataToSubASnippet=e=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          kStart + inputRow,
          globalRowStart + inputCol);
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batchA,
          globalRowStart + inputRow,
          kStart + inputCol);
        `,readDataFromSubASnippet=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];";function makeMatMulPackedSource(e,t,r=!1,i=32,a=!1,o=32,s=!1,n=!1){let u=e[1]*t[1],l=e[0]*t[0],d=r?u:i,p=r?i:u;f.D5U.assert(p%t[1]==0&&d%t[0]==0&&i%t[1]==0,()=>`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],c=d/t[0],m=i/t[1],g=e[1],y=e[0],x=s?`
      let localRow = i32(localId.y);
      let localCol = i32(localId.x);
      let globalRowStart = i32(workgroupId.y) * ${u};
      let globalColStart = i32(workgroupId.x) * ${l};

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
          for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
            ${writeDataToSubASnippet(r)}
          }
        }
        // Load one tile of B into local memory.
        for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
              for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
            mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
              kStart + inputRow,
              globalColStart + inputCol);
          }
        }
        kStart = kStart + ${i};
        workgroupBarrier();

        // Compute acc values for a single thread.
        var BCached : array<f32, ${y}>;
        for (var k = 0; k < ${i}; k++) {
          for (var inner = 0; inner < ${y}; inner++) {
            BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
          }
          for (var innerRow = 0; innerRow < ${g}; innerRow++) {
            let ACached = ${r?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
            for (var innerCol = 0; innerCol < ${y}; innerCol++) {
              acc[innerRow][innerCol] =
                  fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
            }
          }
        }
        workgroupBarrier();
      }
      for (var innerRow = 0; innerRow < ${g}; innerRow++) {
        let gRow = globalRowStart + localRow + innerRow * ${t[1]};
        for (var innerCol = 0; innerCol < ${y}; innerCol++) {
          let gCol = globalColStart + localCol + innerCol * ${t[0]};
          mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
        }
      }
      `:`
  let tileRow = i32(localId.y) * ${g};
  let tileCol = i32(localId.x) * ${y};

  let globalRow = i32(globalId.y) * ${g};
  let globalCol = i32(globalId.x) * ${y};
  let globalRowStart = i32(workgroupId.y) * ${u};

  let tileRowA = i32(localId.y) * ${h};
  let tileColA = i32(localId.x) * ${c};
  let tileRowB = i32(localId.y) * ${m};
  // Loop over shared dimension.
  for (var t = 0; t < numTiles; t++) {
    // Load one tile of A into local memory.
    for (var innerRow = 0; innerRow < ${h}; innerRow++) {
      for (var innerCol = 0; innerCol < ${c}; innerCol++) {
        let inputRow = tileRowA + innerRow;
        let inputCol = tileColA + innerCol;
        ${writeDataToSubASnippet(r)}
      }
    }

    // Load one tile of B into local memory.
    for (var innerRow = 0; innerRow < ${m}; innerRow++) {
      for (var innerCol = 0; innerCol < ${y}; innerCol++) {
        let inputRow = tileRowB + innerRow;
        let inputCol = tileCol + innerCol;
        mm_Bsub[inputRow][inputCol] = mm_readB(batchB,
          kStart + inputRow,
          globalCol + innerCol);
      }
    }
    kStart = kStart + ${i};
    workgroupBarrier();

    // Compute acc values for a single thread.
    var BCached : array<f32, ${y}>;
    for (var k = 0; k < ${i}; k++) {
      for (var inner = 0; inner < ${y}; inner++) {
        BCached[inner] = mm_Bsub[k][tileCol + inner];
      }

      for (var innerRow = 0; innerRow < ${g}; innerRow++) {
        ${readDataFromSubASnippet(r)}
        for (var innerCol = 0; innerCol < ${y}; innerCol++) {
          acc[innerRow][innerCol] =
              fma(ACached, BCached[innerCol], acc[innerRow][innerCol]);
        }
      }
    }

    workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < ${g}; innerRow++) {
    for (var innerCol = 0; innerCol < ${y}; innerCol++) {
      mm_write(batch, globalRow + innerRow, globalCol + innerCol,
          acc[innerRow][innerCol]);
    }
  }
  `;return`
    var<workgroup> mm_Asub : array<array<f32, ${d}>, ${p}>;
    var<workgroup> mm_Bsub : array<array<f32, ${l}>, ${i}>;

    ${getMainHeaderString()} {
      let batch = ${a?"0":"i32(globalId.z)"};
      let batchA = ${a||!n?"batch":"batch % uniforms.aShape[0]"};
      let batchB = ${a||!n?"batch":"batch % uniforms.bShape[0]"};
      let numTiles = ${a?`${Math.ceil(o/i)}`:`(uniforms.dimInner - 1) / ${i} + 1`};
      var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

      var acc : array<array<f32, ${y}>, ${g}>;

      // Without this initialization strange values show up in acc.
      for (var innerRow = 0; innerRow < ${g}; innerRow++) {
        for (var innerCol = 0; innerCol < ${y}; innerCol++) {
          acc[innerRow][innerCol] = 0.0;
        }
      }
      ${x}
    }
  `}let readVectorASnippet=e=>e?`
      mm_readA(batchA, colA, globalRow),
      mm_readA(batchA, colA + 1, globalRow),
      mm_readA(batchA, colA + 2, globalRow),
      mm_readA(batchA, colA + 3, globalRow)
  `:`
      mm_readA(batchA, globalRow, colA),
      mm_readA(batchA, globalRow, colA + 1),
      mm_readA(batchA, globalRow, colA + 2),
      mm_readA(batchA, globalRow, colA + 3)
  `;let MatMulPackedProgram=class MatMulPackedProgram{constructor(e,t,r=!1,i=!1,a=null,o=null,s=null,n=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=t,this.dispatchLayout={x:[2],y:[1],z:[0]};let u=r?e[1]:e[2];if(this.isVec4=(u%4==0&&!r||t[1]%4==0&&r)&&t[2]%4==0&&!i,this.outputComponent=this.isVec4?4:1,this.isVectorA=1===t[1]&&!r,!this.isVec4&&this.isVectorA)this.elementsPerThread=[1,1,1],this.workgroupSize=[32,1,1];else{let e=computeWorkgroupInfoForMatMul(t[1],u,t[2],r);this.workgroupSize=e.workgroupSize,this.elementsPerThread=e.elementsPerThread}this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread);let l=null!=a,d=null!=s;l&&this.variableNames.push("bias"),d&&this.variableNames.push("preluActivationWeights"),this.sequentialAccessByThreads=n,this.transposeA=r,this.transposeB=i,this.addBias=l,this.activation=o,this.hasPreluActivationWeights=d,[this.fitAOuter,this.fitBOuter,this.fitInner]=this.getShapeFit(t[1],t[2],u),this.shaderKey=`matMulPacked_${this.elementsPerThread}_${r}_${i}_${this.activation}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.isVectorA}_${this.sequentialAccessByThreads}`}getShapeFit(e,t,r){let i=this.workgroupSize[1]*this.elementsPerThread[1],a=this.workgroupSize[0]*this.elementsPerThread[0];!this.isVec4&&this.isVectorA?this.tileInner=4*this.workgroupSize[0]:this.tileInner=a;let o=r%this.tileInner==0;return[e%i==0,t%a==0,o]}getUserCode(){let e=`
      ${activationFnSnippet(this.activation,this.hasPreluActivationWeights,this.isVec4)}
      ${matMulReadWriteFnSource(this.addBias,this.activation,!1,this.transposeB,this.fitAOuter,this.fitBOuter,this.fitInner,this.isVec4?4:1)}
      ${this.isVec4?makeMatMulPackedVec4Source(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,!0):this.isVectorA?function(e,t=!1){f.D5U.assert(1===e[1]&&1===e[2],()=>`A linear work group size is required. But got ${e}.`);let r=4*e[0];return`
    var<workgroup> mm_Asub : array<vec4<f32>, ${e[0]}>;

    ${getMainHeaderString()} {
      let tileCol = i32(localId.x);
      let globalCol = i32(globalId.x);
      let globalRow = i32(globalId.y);

      let numTiles = (uniforms.dimInner - 1) / ${r} + 1;
      let batch = i32(globalId.z);
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      // Without this initialization strange values show up in acc.
      var acc = 0.0;

      // Loop over shared dimension.
      for (var t = 0; t < numTiles; t++) {
        // Load one tile of A into local memory.
        let colA = t * ${r} + tileCol * 4;
        mm_Asub[tileCol] = vec4<f32>(${readVectorASnippet(t)});
        workgroupBarrier();

        // Compute acc values for a single thread.
        for (var k = 0; k < ${r/4}; k++) {
          let rowB = t * ${r} + k * 4;
          let BCached = vec4<f32>(mm_readB(batchB, rowB, globalCol),
                              mm_readB(batchB, rowB + 1, globalCol),
                              mm_readB(batchB, rowB + 2, globalCol),
                              mm_readB(batchB, rowB + 3, globalCol));

          let ACached = mm_Asub[k];
          acc = acc + dot(ACached, BCached);
        }

        workgroupBarrier();
      }

      mm_write(batch, globalRow, globalCol, acc);
    }
  `}(this.workgroupSize,this.transposeA):makeMatMulPackedSource(this.elementsPerThread,this.workgroupSize,this.transposeA,this.tileInner,!1,null,this.sequentialAccessByThreads,!0)}
    `;return e}};let MatMulReduceProgram=class MatMulReduceProgram{constructor(e,t=!1,r=!1,i=null,a=null,o=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[256,1,1],this.outputShape=e,this.dispatchLayout={x:[],y:[1,2],z:[0]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize);let s=null!=i,n=null!=o;s&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.transposeA=t,this.transposeB=r,this.addBias=s,this.activation=a,this.hasPreluActivationWeights=n,this.shaderKey=`matMulReduce_${this.activation}_${t}_${r}`}getUserCode(){var e;let t=`
      ${activationFnSnippet(this.activation,this.hasPreluActivationWeights)}
      ${matMulReadWriteFnSource(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${(e=this.workgroupSize[0],`
    var<workgroup> sumValues : array<f32, ${e}>;
    ${getMainHeaderString()} {
      let coords = getOutputCoords();
      let batch = coords[0];
      let batchA = batch % uniforms.aShape[0];
      let batchB = batch % uniforms.bShape[0];
      let row = coords[1];
      let col = coords[2];
      var sum = 0.0;
      let Length = uniforms.dimInner;
      for (var k = i32(localId.x); k < Length; k = k + ${e}) {
        let dataA = mm_readA(batchA, row, k);
        let dataB = mm_readB(batchB, k, col);
        sum = sum + dataA * dataB;
      }
      sumValues[localId.x] = sum;
      workgroupBarrier();

      for(var currentSize = ${e/2}u; currentSize > 1u;
          currentSize = currentSize / 2u) {
        if (localId.x < currentSize)
        {
          sumValues[localId.x] = sumValues[localId.x] + sumValues[localId.x + currentSize];
        }
        workgroupBarrier();
      }

      if (localId.x == 0u) {
        sum = sumValues[0] + sumValues[1];
        mm_write(batch, row, col, sum);
      }
    }
  `)}
    `;return t}};let MatMulSmallOutputSizeProgram=class MatMulSmallOutputSizeProgram{constructor(e,t,r,i=!1,a=!1,o=null,s=null,n=null){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[16,8,1],this.outputShape=r,this.dispatchLayout={x:[2],y:[1],z:[0]},this.dispatch=[Math.ceil(r[2]/this.workgroupSize[0]),Math.ceil(r[1]/this.workgroupSize[1]),r[0]];let u=null!=o;u&&this.variableNames.push("bias");let l=null!=n;l&&this.variableNames.push("preluActivationWeights"),this.transposeA=i,this.transposeB=a,this.addBias=u,this.activation=s,this.hasPreluActivationWeights=l,this.shaderKey=`matMulSmallOutputSize_${this.activation}_${i}_${a}`}getUserCode(){let e=`
      ${activationFnSnippet(this.activation,this.hasPreluActivationWeights)}
      ${matMulReadWriteFnSource(this.addBias,this.activation,this.transposeA,this.transposeB)}
      ${/**
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
 */function(e){let t=e[1],r=e[0],i=t>r?t:r;return`
  var<workgroup> mm_Asub : array<array<f32, ${i}>, ${t}>;
  var<workgroup> mm_Bsub : array<array<f32, ${r}>, ${i}>;

  // If the output size is small for matrix multiplication, avoid to use vec4
  // and handle some elements per thread to optimally utilize the ALU.
  // Read data from global memory to registers firstly, then store them into
  // shared memory, so it is instruction-Level parallelism for arithmetic
  // operations and others handle IO operations between barrier api, makes ALU
  // and load/store units work simultaneously, could improves the performance.
  ${getMainHeaderString()} {
    let tileRow = i32(localId.y);
    let tileCol = i32(localId.x);
    let globalRow = i32(globalId.y);
    let globalCol = i32(globalId.x);
    let batch = i32(globalId.z);
    let batchA = batch % uniforms.aShape[0];
    let batchB = batch % uniforms.bShape[0];

    // uniforms.dimInner should be greater than 0.
    let numTiles = (uniforms.dimInner - 1) / ${i} + 1;
    var acc = 0.0;

    var globalColA = tileCol;
    var globalRowB = 0;
    var regA = mm_readA(batchA, globalRow, globalColA);
    var regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
    var regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
    globalColA = globalColA + ${i};
    globalRowB = globalRowB + ${i};

    for (var t = 0; t < numTiles; t = t + 1) {
      mm_Asub[tileRow][tileCol] = regA;
      mm_Bsub[2 * tileRow][tileCol] = regB0;
      mm_Bsub[2 * tileRow + 1][tileCol] = regB1;

      workgroupBarrier();

      regA = mm_readA(batchA, globalRow, globalColA);
      regB0 = mm_readB(batchB, globalRowB + 2 * tileRow, globalCol);
      regB1 = mm_readB(batchB, globalRowB + 2 * tileRow + 1, globalCol);
      globalColA = globalColA + ${i};
      globalRowB = globalRowB + ${i};

      for (var k = 0; k < ${i}; k = k + 1) {
        acc = acc + mm_Asub[tileRow][k] * mm_Bsub[k][tileCol];
      }
      workgroupBarrier();
    }

    mm_write(batch, globalRow, globalCol, acc);
  }
  `}(this.workgroupSize)}
    `;return e}};/**
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
 */let MatMulSplitKProgram=class MatMulSplitKProgram{constructor(e,t,r=!1,i=!1){this.variableNames=["A","B"],this.uniforms="dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.workgroupSize=[8,8,1],this.atomic=!0,this.splitedDimInner=128,f.D5U.assert(1===e[0],()=>"MatMulSplitKProgram only supports batch = 1."),this.outputShape=e,this.dispatchLayout={x:[2],y:[1],z:[0,3]};let a=(r&&this.outputShape[1]%4==0||!r&&t%4==0)&&this.outputShape[2]%4==0;this.elementsPerThread=[4,4,this.splitedDimInner],this.outputComponent=a?4:1,!a&&(this.outputShape[1]<16&&(this.elementsPerThread[1]=1),this.outputShape[2]<16&&(this.elementsPerThread[0]=1)),this.dispatch=computeDispatch(this.dispatchLayout,[this.outputShape[0],this.outputShape[1],this.outputShape[2],t],this.workgroupSize,this.elementsPerThread),this.transposeA=r,this.transposeB=i,this.shaderKey=`matMulSplitK_${r}_${i}_${this.elementsPerThread}_${this.outputComponent}`}getUserCode(){let e=this.outputComponent,t=`
      ${matMulReadFnSource(!1,this.transposeB,!1,!1,!1,e)}
      fn mm_write(batch: i32, row : i32, col : i32, value : ${typeSnippet(e)}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
          let coords = vec3<i32>(batch, row, col);
          let flatIndex = getOutputIndexFromCoords(coords);
          // The problem is that we should initialize output to zero before using.
          // Otherwise, the original value will be added to the result.
          for (var i = 0; i < ${e}; i = i + 1) {
            ${atomicAddSnippet("&result[flatIndex + i]",`${e>1?"value[i]":"value"}`,"float32")}
          }
        }
      }
      ${4===e?makeMatMulPackedVec4Source(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner):makeMatMulPackedSource(this.elementsPerThread,this.workgroupSize,this.transposeA,32,!0,this.splitedDimInner)}
    `;return t}};let BiasActivationProgram=class BiasActivationProgram{constructor(e,t=null,r=null,i=null){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=null!=t,this.hasPreluActivationWeights=null!=i,this.activation=r,this.addBias&&this.variableNames.push("bias"),this.hasPreluActivationWeights&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`biasActivation_${r}`}getUserCode(){return`
    ${activationFnSnippet(this.activation,this.hasPreluActivationWeights)}
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        var value = getXByOutputIndex(index);
        ${biasActivationSnippet(this.addBias,this.activation)}
        setOutputAtIndex(index, value);
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
 */let FillProgram=class FillProgram{constructor(e){this.variableNames=[],this.outputShape=[],this.uniforms="value : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="fill"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        setOutputAtIndex(index, uniforms.value);
      }
    }
  `;return e}};/**
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
 */function fill(e){let{backend:t,attrs:r}=e,{shape:i,value:a}=r,{dtype:o}=r;if("string"===(o=o||f.D5U.inferDtype(a))){let e=f.D5U.getArrayFromDType(o,f.D5U.sizeFromShape(i));return e.fill(a),t.makeTensorInfo(i,o,e)}{let e=new FillProgram(i),r=[{type:"float32",data:[a]}];return t.runWebGPUProgram(e,[],o,r)}}let Z={kernelName:f.deh,backendName:"webgpu",kernelFunc:fill};/**
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
 */function reshape(e){let{inputs:t,attrs:r}=e,{x:i}=t,{shape:a}=r,o=f.D5U.sizeFromShape(i.shape),s=f.D5U.inferFromImplicitShape(a,o),n=f.D5U.sizeFromShape(s);return f.D5U.assert(o===n,()=>`The new shape (${s}) has ${n} elements and the old shape (${i.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),e.backend.incRef(i.dataId),{dataId:i.dataId,shape:s,dtype:i.dtype}}let J={kernelName:f.HZH,backendName:"webgpu",kernelFunc:reshape};/**
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
 */function batchMatMulImpl({a:e,b:t,transposeA:r,transposeB:i,backend:a,bias:o=null,preluActivationWeights:s=null,leakyreluAlpha:n=0,activation:u=null}){let l,p;let h=e.shape.length,c=t.shape.length,m=r?e.shape[h-2]:e.shape[h-1],g=i?t.shape[c-1]:t.shape[c-2],y=r?e.shape[h-1]:e.shape[h-2],x=i?t.shape[c-2]:t.shape[c-1],b=e.shape.slice(0,-2),S=t.shape.slice(0,-2),w=f.D5U.sizeFromShape(b),C=f.D5U.sizeFromShape(S),v=f.Jyw.assertAndGetBroadcastShape(e.shape.slice(0,-2),t.shape.slice(0,-2)),I=v.concat([y,x]);f.D5U.assert(m===g,()=>`Error in matMul: inner shapes (${m}) and (${g}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${r} and transposeB=${i} must match.`);let k=r?[w,m,y]:[w,y,m],P=i?[C,x,g]:[C,g,x],D=reshape({inputs:{x:e},backend:a,attrs:{shape:k}}),R=reshape({inputs:{x:t},backend:a,attrs:{shape:P}}),$=[D,R],z=Math.max(w,C),N=[D,R],F=[{type:"int32",data:[y]},{type:"int32",data:[x]},{type:"int32",data:[m]}],A=[z,y,x],T=(0,f.OBj)().get("WEBGPU_MATMUL_PROGRAM_TYPE");if(T<0){let e=(0,f.OBj)().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),t=e>0?e:a.thresholdToIncreaseWorkgroups,r=z*Math.ceil(y/32)*Math.ceil(x/32),i=r<=t||y<=8&&r<=2*t;T=i?z*y*x<=128?d.MatMulReduceProgram:1===z&&g>=2e3?d.MatMulSplitKProgram:d.MatMulSmallOutputSizeProgram:d.MatMulPackedProgram}switch(T){case d.MatMulReduceProgram:l=new MatMulReduceProgram(A,r,i,o,u,s);break;case d.MatMulSplitKProgram:if(p=fill({backend:a,attrs:{shape:A,value:0,dtype:e.dtype}}),l=new MatMulSplitKProgram(A,g,r,i),o||u){p=a.runWebGPUProgram(l,N,e.dtype,F,p);let t=new BiasActivationProgram(p.shape,o,u,s),r=null,i=[p];o&&i.push(o),s&&i.push(s),"leakyrelu"===u&&(r=[{type:"float32",data:[n]}],t.uniforms+=" alpha : f32,");let d=a.runWebGPUProgram(t,i,p.dtype,r);$.push(p);let h=reshape({inputs:{x:d},backend:a,attrs:{shape:I}});for(let e of($.push(d),$))a.disposeData(e.dataId);return h}break;case d.MatMulSmallOutputSizeProgram:l=new MatMulSmallOutputSizeProgram(k,P,A,r,i,o,u,s);break;case d.MatMulPackedProgram:let U=a.adapterInfo.isIntel();l=new MatMulPackedProgram(k,A,r,i,o,u,s,U);break;default:throw Error(`Unsupported MatMulProgramType ${T}.`)}o&&N.push(o),s&&N.push(s),"leakyrelu"===u&&(F.push({type:"float32",data:[n]}),l.uniforms+=" alpha : f32,"),p=a.runWebGPUProgram(l,N,e.dtype,F,p);let L=reshape({inputs:{x:p},backend:a,attrs:{shape:I}});for(let e of($.push(p),$))a.disposeData(e.dataId);return L}let ee={kernelName:f.usg,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{a,b:o,bias:s,preluActivationWeights:n}=t,{transposeA:u,transposeB:l,activation:d,leakyreluAlpha:p}=i;return batchMatMulImpl({a,b:o,transposeA:u,transposeB:l,backend:r,bias:s,preluActivationWeights:n,leakyreluAlpha:p,activation:d})}};/**
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
 */let BinaryOpComplexProgram=class BinaryOpComplexProgram{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.workgroupSize=[128,1,1],this.size=!0,this.outputShape=f.backend_util.assertAndGetBroadcastShape(t,r),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`binaryOpComplex_${e}`,this.op=e}getUserCode(){let e=getBinaryOpString(this.op,!1),t=`
      fn binaryOpComplex(
          areal : f32, aimag : f32, breal : f32, bimag : f32) -> f32 {
        ${e}
      }

      ${getMainHeaderString("index")} {
        if(index < uniforms.size) {
          let areal = getARealByOutputIndex(index);
          let aimag = getAImagByOutputIndex(index);
          let breal = getBRealByOutputIndex(index);
          let bimag = getBImagByOutputIndex(index);
          setOutputAtIndex(index, binaryOpComplex(areal, aimag, breal, bimag));
        }
      }
    `;return t}};/**
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
 */let BinaryOpProgram=class BinaryOpProgram{constructor(e,t,r){if(this.size=!0,this.variableNames=["A","B"],this.outputShape=f.backend_util.assertAndGetBroadcastShape(t,r),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.op=e,this.useSharedMemoryWithA=t.length<=1&&r.length>1&&t[0]<128,this.useSharedMemoryWithB=r.length<=1&&t.length>1&&r[0]<128,this.useSharedMemoryWithA||this.useSharedMemoryWithB)this.outputComponent=1,this.variableComponents=[1,1],this.lastDimensionSize=this.useSharedMemoryWithB?r[0]:t[0],this.shaderKey=`binary_${e}_${this.lastDimensionSize}`,this.type="shared",this.workgroupSize=[256,1,1];else{let i=t.length>0&&t[t.length-1]%4==0,a=r.length>0&&r[r.length-1]%4==0;i&&a?(this.outputComponent=4,this.variableComponents=[4,4]):i&&(f.D5U.isScalarShape(r)||1===r[r.length-1])||a&&(f.D5U.isScalarShape(t)||1===t[t.length-1])?(this.outputComponent=4,this.variableComponents=i?[4,1]:[1,4]):(this.outputComponent=1,this.variableComponents=[1,1]),this.type="nonshared",this.shaderKey=`binary_${e}_${this.variableComponents}`,this.workgroupSize=[128,1,1]}this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.outputComponent,1,1])}getUserCode(){let e;let t=4===this.outputComponent?"vec4<f32>":"f32",r=`
    fn binaryOperation(a : ${t}, b : ${t}) -> ${t} {
      ${getBinaryOpString(this.op,4===this.outputComponent)}
    };
    `;if("shared"===this.type){let t=this.lastDimensionSize>1?`coords[${this.outputShape.length-1}]`:"0",i=this.useSharedMemoryWithB?`let a = getAByOutputIndex(index);
          let b = sharedBuf[${t}];`:`let a = sharedBuf[${t}];
          let b = getBByOutputIndex(index);`;e=`
        ${r}
        var<workgroup> sharedBuf : array<f32, ${this.lastDimensionSize}>;
        ${getMainHeaderString("index")} {
          // Fill in the shared memory buffer.
          let localIndex = i32(localId.x);
          if(localIndex < ${this.lastDimensionSize}) {
            sharedBuf[localIndex] = f32(${this.useSharedMemoryWithB?"B":"A"}[localIndex]);
          }
          workgroupBarrier();

          if(index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            ${i}
            setOutputAtIndex(index, binaryOperation(a, b));
          }
        }
        `}else e=`
       ${r}
       ${getMainHeaderString("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index * ${this.outputComponent});
           let a = ${t}(getAByOutputCoords(coords));
           let b = ${t}(getBByOutputCoords(coords));
           setOutputAtIndex(index, binaryOperation(a, b));
         }
       }
       `;return e}};/**
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
 */function identity(e){let{inputs:t}=e,{x:r}=t;return e.backend.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}let et={kernelName:f.iJz,backendName:"webgpu",kernelFunc:identity};/**
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
 */function complex(e){let{inputs:t,backend:r}=e,{real:i,imag:a}=t,o=r.makeTensorInfo(i.shape,"complex64"),s=r.tensorMap.get(o.dataId),n=identity({inputs:{x:i},backend:r}),u=identity({inputs:{x:a},backend:r});return s.complexTensorInfos={real:n,imag:u},o}let er={kernelName:f.Zz9,backendName:"webgpu",kernelFunc:complex};/**
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
 */let UnaryOpProgram=class UnaryOpProgram{constructor(e,t,r=""){this.variableNames=["A"],this.size=!0,this.workgroupSize=[128,1,1],this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.op=t,""!==r&&(this.uniforms=r),this.shaderKey=`unary_${t}`}getUserCode(){return`
      fn unaryOperation(a : f32) -> f32 {
        ${getUnaryOpString(this.op,!1)}
      }
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let a = getAByOutputIndex(index);
          setOutputAtIndex(index, unaryOperation(a));
        }
      }
      `}};/**
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
 */function unaryKernelFunc({opType:e,cpuKernelImpl:t,dtype:r}){return({inputs:i,backend:a})=>{let{x:o}=i,s=r||o.dtype;if(a.shouldExecuteOnCPU([o])&&null!=t){let e=a.tensorMap.get(o.dataId),r=t(e.values,s);return a.makeTensorInfo(o.shape,s,r)}let n=new UnaryOpProgram(o.shape,e);return a.runWebGPUProgram(n,[o],s)}}function binaryKernelFunc({opType:e,cpuKernelImpl:t,supportsComplex:r=!1,dtype:i}){return({inputs:a,backend:o})=>{let{a:s,b:n}=a;if(r&&"complex64"===s.dtype){let t,r;let i=o.tensorMap.get(s.dataId),a=o.tensorMap.get(n.dataId);if(e!==p.MUL)[t,r]=[[i.complexTensorInfos.real,a.complexTensorInfos.real],[i.complexTensorInfos.imag,a.complexTensorInfos.imag]].map(t=>{let[r,i]=t,a={dataId:r.dataId,dtype:r.dtype,shape:s.shape},u={dataId:i.dataId,dtype:i.dtype,shape:n.shape},l=new BinaryOpProgram(e,s.shape,n.shape);return o.runWebGPUProgram(l,[a,u],(0,f.x8V)(r.dtype,i.dtype))});else{let e=new BinaryOpComplexProgram(p.COMPLEX_MULTIPLY_REAL,s.shape,n.shape),u=new BinaryOpComplexProgram(p.COMPLEX_MULTIPLY_IMAG,s.shape,n.shape),l=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:s.shape},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:s.shape},{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:n.shape},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:n.shape}];t=o.runWebGPUProgram(e,l,"float32"),r=o.runWebGPUProgram(u,l,"float32")}let u=complex({inputs:{real:t,imag:r},backend:o});return o.disposeData(t.dataId),o.disposeData(r.dataId),u}let u=i||(0,f.x8V)(s.dtype,n.dtype);if(("string"===s.dtype||"string"===n.dtype||o.shouldExecuteOnCPU([s,n]))&&null!=t){let e=o.tensorMap.get(s.dataId).values,r=o.tensorMap.get(n.dataId).values,i="string"===s.dtype?f.backend_util.fromUint8ToStringArray(e):e,a="string"===s.dtype?f.backend_util.fromUint8ToStringArray(r):r,[l,d]=t(s.shape,n.shape,i,a,u);return o.makeTensorInfo(d,u,l)}let l=new BinaryOpProgram(e,s.shape,n.shape);return o.runWebGPUProgram(l,[s,n],u)}}var ei=r(60297);/**
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
 */let{addImpl:ea,castImpl:eo,ceilImpl:es,concatImpl:en,equalImpl:eu,expImpl:el,expm1Impl:ed,floorImpl:ep,floorDivImpl:eh,gatherNdImpl:ec,gatherV2Impl:em,greaterEqualImpl:ef,greaterImpl:eg,lessEqualImpl:ey,lessImpl:ex,logImpl:eb,maxImpl:eS,maximumImpl:ew,minimumImpl:eC,multiplyImpl:ev,negImpl:eI,notEqualImpl:ek,prodImpl:eP,rangeImpl:eD,rsqrtImpl:eR,scatterImpl:e$,simpleAbsImpl:ez,sliceImpl:eN,stridedSliceImpl:eF,stringNGramsImpl:eA,subImpl:eT,tileImpl:eU,topKImpl:eL,transposeImpl:e_,uniqueImpl:eB}=ei,eO=unaryKernelFunc({opType:h.ABS,cpuKernelImpl:ez}),eW={kernelName:f.SYM,backendName:"webgpu",kernelFunc:eO},eM=unaryKernelFunc({opType:h.ACOS}),eE={kernelName:f.VGw,backendName:"webgpu",kernelFunc:eM},eV=unaryKernelFunc({opType:h.ACOSH}),eH={kernelName:f.SpW,backendName:"webgpu",kernelFunc:eV},eG=binaryKernelFunc({opType:p.ADD,cpuKernelImpl:ea,supportsComplex:!0}),eK={kernelName:f.mm_,backendName:"webgpu",kernelFunc:eG};/**
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
 */let AddNPackedProgram=class AddNPackedProgram{constructor(e){this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e[0],this.variableNames=e.map((e,t)=>`T${t}`),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="addN"}getUserCode(){let e=[];this.variableNames.forEach(t=>{e.push(`let v${t} = get${t}ByOutputCoords(coords);`)});let t=this.variableNames.map(e=>`v${e}`).join(" + "),r=`
      ${getMainHeaderString("index")} {
        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if (flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            ${e.join("\n        ")}
            setOutputAtIndex(flatIndex, ${t});
          }
        }
      }
    `;return r}};let eX={kernelName:f.Xze,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e;if(1===t.length)return identity({inputs:{x:t[0]},backend:r});let i=t.map(e=>e.dtype).reduce((e,t)=>(0,f.x8V)(e,t)),a=t.map(e=>e.shape),o=new AddNPackedProgram(a);return r.runWebGPUProgram(o,t,i)}};/**
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
 */let TransposeSharedProgram=class TransposeSharedProgram{constructor(e,t){this.variableNames=["A"],this.workgroupSize=[16,16,1];let r=Array(e.length);for(let i=0;i<r.length;i++)r[i]=e[t[i]];this.outputShape=r,this.dispatchLayout={x:[0],y:[1]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[1,1,1]),this.shaderKey="transposeShared"}getUserCode(){f.D5U.assert(this.workgroupSize[0]===this.workgroupSize[1],()=>`Must be a square tile, current tile shape is ${this.workgroupSize[0]} x ${this.workgroupSize[1]}`);let e=this.workgroupSize[0],t=`
      var<workgroup> tile : array<array<f32, ${this.workgroupSize[0]+1}>, ${this.workgroupSize[0]}>;
      ${getMainHeaderString()} {
        var x = i32(workgroupId.x) * ${e} + i32(localId.x);
        var y = i32(workgroupId.y) * ${e} + i32(localId.y);
        let width = uniforms.outShape[0];
        let height = uniforms.outShape[1];
        if (x < width && y < height) {
          tile[localId.y][localId.x] = f32(A[y * width + x]);
        }
        workgroupBarrier();

        x = i32(workgroupId.y) * ${e} + i32(localId.x);
        y = i32(workgroupId.x) * ${e} + i32(localId.y);
        if (x < height && y < width) {
          setOutputAtIndex((y * height + x), tile[localId.x]
            [localId.y]);
        }
      }
    `;return t}};/**
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
 */let TransposeProgram=class TransposeProgram{constructor(e,t){this.variableNames=["A"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0;let r=Array(e.length);for(let i=0;i<r.length;i++)r[i]=e[t[i]];this.outputShape=r,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.newDim=t,this.shaderKey=`transpose_${t}`}getUserCode(){let e=getCoordsDataType(this.outputShape.length),t=getSwitchedCoords(this.newDim),r=`
      ${getMainHeaderString("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            setOutputAtIndex(flatIndex, A[getIndexFromCoords${this.outputShape.length}D(
              ${e}(${t}), uniforms.aShape)]);
          }
        }
      }
    `;return r}};function getSwitchedCoords(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let r=Array(t);for(let t=0;t<e.length;t++)r[e[t]]=`coords.${getCoordsXYZ(t)}`;return r.join()}/**
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
 */function transpose(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{perm:o}=i,s=a.shape.length,n=Array(s);for(let e=0;e<n.length;e++)n[e]=a.shape[o[e]];if(r.shouldExecuteOnCPU([a])){let e=r.tensorMap.get(a.dataId),t=e.values,i=e_(t,a.shape,a.dtype,o,n);return r.makeTensorInfo(n,a.dtype,i)}if(2===a.shape.length&&f.D5U.arraysEqual(o,[1,0])){let e=new TransposeSharedProgram(a.shape,o);return r.runWebGPUProgram(e,[a],a.dtype)}let u=new TransposeProgram(a.shape,o);return r.runWebGPUProgram(u,[a],a.dtype)}let eq={kernelName:f.G3Y,backendName:"webgpu",kernelFunc:transpose};/**
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
 */let ReduceProgram=class ReduceProgram{constructor(e,t,r){this.variableNames=["x"],this.uniforms="reduceSize : i32,",this.size=!0,this.inputShape=[e.batchSize,e.inSize];let[i]=f.backend_util.computeOutAndReduceShapes(this.inputShape,[1]);this.outputShape=0===i.length?[1]:i,e.inSize>=32768&&r>=512?this.workgroupSize=[512,1,1]:e.inSize>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,[1,1,1]),this.reduceType=t,this.shaderKey=`reduce_${t}`}getUserCode(){let e="",t="0.0",r=this.workgroupSize[0];"min"===this.reduceType||"max"===this.reduceType?(e=`
         if (isnan(candidate)) {
          bestValue = uniforms.NAN;
         } else if (!isnan(bestValue) && candidate ${"min"===this.reduceType?"<":">"} bestValue)
           {  bestValue = candidate; }`,t="f32(x[offset])"):"sum"===this.reduceType||"mean"===this.reduceType?e=" bestValue = bestValue + candidate; ":"prod"===this.reduceType?(e=" bestValue = bestValue * candidate; ",t="1.0"):"all"===this.reduceType?(e=" bestValue = f32(bestValue >= 1.0 && candidate >= 1.0); ",t="1.0"):"any"===this.reduceType&&(e=" bestValue = f32(bestValue >= 1.0 || candidate >= 1.0); ",t="0.0");let i="mean"===this.reduceType?"setOutputAtIndex(outputIndex, bestValue / f32(uniforms.reduceSize));":"setOutputAtIndex(outputIndex, bestValue);",a=`
         var<workgroup> xBestValues : array<f32, ${r}>;
       `,o=`
       fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
       }

       ${a}
       fn getOffset(outputIndex : i32) -> i32 {
         let outputCoords = getCoordsFromIndex(outputIndex);
         let offset = ${1===this.outputShape.length?"outputCoords":"outputCoords[0]"} * uniforms.reduceSize;
          return offset;
       }
       ${getMainHeaderString("index")} {
         let outputIndex = index / ${r};
         let offset = getOffset(outputIndex);
         var bestValue = ${t};
         let Length = uniforms.reduceSize;
         let WorkPerThread = DIV_CEIL(u32(Length), ${r}u);
         for (var k = i32(localId.x); k < Length && outputIndex < uniforms.size;
             k = k + ${r}) {
           let candidate = f32(x[offset + k]);
           ${e}
         }
         xBestValues[localId.x] = bestValue;
         workgroupBarrier();

         var reduceSize = min(u32(Length), ${r}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            ${e}
            xBestValues[localId.x] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (localId.x == 0u && outputIndex < uniforms.size) {
          ${i}
        }
       }
     `;return o}};/**
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
 */let eY={mean:"float32",all:"bool",any:"bool"};function reduce(e,t,r,i,a){let o;let s=e.shape.length,n=[],u=f.D5U.parseAxisParam(t,e.shape),l=u,d=f.backend_util.getAxesPermutation(l,s),p=e;null!=d&&(p=transpose({inputs:{x:e},attrs:{perm:d},backend:a}),l=f.backend_util.getInnerMostAxes(l.length,s),n.push(p)),f.backend_util.assertAxesAreInnerMostDims(i,l,s);let[h,c]=f.backend_util.computeOutAndReduceShapes(p.shape,l),m=h;if(r&&(m=f.backend_util.expandShapeToKeepDim(h,u)),("max"===i||"prod"===i)&&a.shouldExecuteOnCPU([p])){let t=a.tensorMap.get(p.dataId).values;switch(i){case"max":let r=eS(t,f.D5U.sizeFromShape(c),m,e.dtype);o=a.makeTensorInfo(m,e.dtype,r);break;case"prod":let{outVals:s,outShape:n,outDtype:u}=eP(p.shape,p.dtype,t,l);o=a.makeTensorInfo(n,u,s);break;default:throw Error(`${i} CPU implementation is not yet supported.`)}}else{let t=f.D5U.sizeFromShape(c),r=f.D5U.sizeFromShape(p.shape),s=r/t,u=eY[i]||(0,f.z4k)(e.dtype),l=[{type:"int32",data:[t]}],d=new ReduceProgram({windowSize:t,inSize:t,batchSize:s,outSize:1},i,a.device.limits.maxComputeWorkgroupSizeX),h=a.runWebGPUProgram(d,[p],u,l);n.push(h),o=reshape({inputs:{x:h},attrs:{shape:m},backend:a})}return n.forEach(e=>a.disposeData(e.dataId)),o}let ej={kernelName:f.oT6,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{keepDims:o,axis:s}=i;return reduce(a,s,o,"all",r)}},eQ={kernelName:f.IKK,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{keepDims:o,axis:s}=i;return reduce(a,s,o,"any",r)}};/**
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
 */let ArgMinMaxProgram=class ArgMinMaxProgram{constructor(e,t,r){this.workgroupSize=[64,1,1],this.variableNames=["x"],this.uniforms="infinityValue : f32,",this.size=!0;let i=[t];this.op="min"===r?"<":">";let[a,o]=f.backend_util.computeOutAndReduceShapes(e,i);this.outputShape=0===a.length?[1]:a,this.dispatchLayout=flatDispatchLayout(this.outputShape),32>f.D5U.sizeFromShape(o)?(this.type="plain",this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize)):(this.type="shared",this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,[1,1,1])),this.inputShape=e,this.shaderKey=`argMinMax_${this.op}_${this.type}`}getUserCode(){let e=this.workgroupSize[0],getInputShapeLastDim=()=>1===this.inputShape.length?"uniforms.xShape":`uniforms.xShape.${getCoordsXYZ(this.inputShape.length-1)}`,splitOutputCoords=()=>{let e="";if(1===this.outputShape.length)1!==this.inputShape.length&&(e+="outputCoords,");else for(let t=0;t<this.outputShape.length;t++)e+=`outputCoords.${getCoordsXYZ(t)},`;return e};if("shared"===this.type){let t=`
      var<workgroup> xBestIndices : array<i32, ${e}>;
      var<workgroup> xBestValues : array<f32, ${e}>;
    `,r=`
      fn DIV_CEIL(a : u32, b : u32) -> u32 {
        return ((a - 1u) / b + 1u);
      }

      ${t}

      ${getMainHeaderString("index")} {
        let outputIndex = index / ${e};
        let reduceLength = ${getInputShapeLastDim()};

        var bestIndex = i32(localId.x);
        var bestValue = uniforms.infinityValue;
        let outputCoords = getCoordsFromIndex(outputIndex);
        for (var k = i32(localId.x); k < reduceLength && outputIndex < uniforms.size;
            k = k + ${e}) {
          let candidate = getX(${splitOutputCoords()} k);
          if (!isnan(candidate) && candidate ${this.op} bestValue) {
            bestValue = candidate;
            bestIndex = k;
          }
        }
        xBestValues[localId.x] = bestValue;
        xBestIndices[localId.x] = bestIndex;
        workgroupBarrier();

        var reduceSize = min(u32(reduceLength), ${e}u);
        for (var currentSize = reduceSize / 2u; reduceSize > 1u;
            currentSize = reduceSize / 2u) {
          let interval = DIV_CEIL(reduceSize, 2u);
          if (localId.x < currentSize) {
            let candidate = xBestValues[localId.x + interval];
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              xBestValues[localId.x] = bestValue;
              xBestIndices[localId.x] = xBestIndices[localId.x + interval];
            }
          }
          reduceSize = interval;
          workgroupBarrier();
        }

        if (localId.x == 0u && outputIndex < uniforms.size) {
          setOutputAtIndexI32(outputIndex, xBestIndices[localId.x]);
        }
      }
    `;return r}{let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let outputCoords = getCoordsFromIndex(index);
          var bestIndex = 0;
          var bestValue = getX(${splitOutputCoords()} 0);
          let reduceLength = ${getInputShapeLastDim()};
          for (var i = 1; i < reduceLength; i++) {
            let candidate = getX(${splitOutputCoords()} i);
            if (candidate ${this.op} bestValue) {
              bestValue = candidate;
              bestIndex = i;
            }
          }
          setOutputAtIndexI32(index, bestIndex);
        }
      }
      `;return e}}};let eZ={kernelName:f.sJF,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o}=i,s=f.D5U.parseAxisParam(o,a.shape),n=f.backend_util.getAxesPermutation(s,a.shape.length),u=a,l=[];null!=n&&(l.push(u=transpose({inputs:{x:a},backend:r,attrs:{perm:n}})),s=f.backend_util.getInnerMostAxes(s.length,u.shape.length)),f.backend_util.assertAxesAreInnerMostDims("argMax",[s[0]],u.shape.length);let d=new ArgMinMaxProgram(u.shape,s[0],"max"),p=[{type:"float32",data:[Number.NEGATIVE_INFINITY]}],h=r.runWebGPUProgram(d,[u],"int32",p);return l.forEach(e=>r.disposeData(e.dataId)),h}},eJ={kernelName:f.aJk,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o}=i,s=f.D5U.parseAxisParam(o,a.shape),n=f.backend_util.getAxesPermutation(s,a.shape.length),u=a,l=[];null!=n&&(l.push(u=transpose({inputs:{x:a},backend:r,attrs:{perm:n}})),s=f.backend_util.getInnerMostAxes(s.length,u.shape.length)),f.backend_util.assertAxesAreInnerMostDims("argMin",[s[0]],u.shape.length);let d=new ArgMinMaxProgram(u.shape,s[0],"min"),p=[{type:"float32",data:[Number.POSITIVE_INFINITY]}],h=r.runWebGPUProgram(d,[u],"int32",p);return l.forEach(e=>r.disposeData(e.dataId)),h}},e2=unaryKernelFunc({opType:h.ASIN}),e3={kernelName:f.M2y,backendName:"webgpu",kernelFunc:e2},e0=unaryKernelFunc({opType:h.ASINH}),e1={kernelName:f.qw7,backendName:"webgpu",kernelFunc:e0},e4=unaryKernelFunc({opType:h.ATAN}),e5={kernelName:f.jMg,backendName:"webgpu",kernelFunc:e4},e6=binaryKernelFunc({opType:p.ATAN2}),e8={kernelName:f.QCc,backendName:"webgpu",kernelFunc:e6},e7=unaryKernelFunc({opType:h.ATANH}),e9={kernelName:f.Oyi,backendName:"webgpu",kernelFunc:e7};/**
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
 */let PoolWithFilterSizeEqualsOneProgram=class PoolWithFilterSizeEqualsOneProgram{constructor(e){this.variableNames=["x"],this.uniforms="strides : vec2<i32>,",this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="poolWithFilterSizeEqualsOne"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];

          let xRCCorner = coords.yz * uniforms.strides;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          let value = getX(batch, xRCorner, xCCorner, d);
          setOutputAtIndex(index, value);
        }
      }
    `;return e}};/**
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
 */let Pool2DProgram=class Pool2DProgram{constructor(e,t,r=!1,i=!1,a=!1){if(this.variableNames=["x"],this.uniforms="strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, convDims : vec2<i32>, filterDims : vec2<i32>,",this.workgroupSize=[128,1,1],this.size=!0,"avg"===t&&r)throw Error("Cannot compute positions for average pool.");this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=t,this.computePositions=r,this.flattenPositions=i,this.includeBatchIndex=a,this.shaderKey=`pool2D_${t}_${r}_${i}_${a}`}getUserCode(){let e;if("avg"===this.poolType)e="resultValue = resultValue + value; count = count + 1.0;";else if(this.computePositions){let t=this.flattenPositions?this.includeBatchIndex?"((batch * uniforms.xShape[1] + xR) * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"(xR * uniforms.xShape[2] + xC) * uniforms.xShape[3] + d":"wR * uniforms.filterDims.y + wC";e=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${t};
      }`}else e="resultValue = max(value, resultValue);";let t="resultValue";"avg"===this.poolType&&(t="resultValue / max(count, 1.0)");let r=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let batch = coords[0];
          let d = coords[3];
          let xRCCorner = vec2<i32>(coords.yz) * uniforms.strides - uniforms.pads;
          let xRCorner = xRCCorner.x;
          let xCCorner = xRCCorner.y;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${"avg"===this.poolType?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + uniforms.dilations.x) {
            let xR = xRCorner + wR;

            if (xR < 0 || xR >= uniforms.convDims.x) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + uniforms.dilations.y) {
              let xC = xCCorner + wC;
              if (xC < 0 || xC >= uniforms.convDims.y) {
                continue;
              }

              let value = getX(batch, xR, xC, d);
              ${e}
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${t});`}
        }
      }
    `;return r}};let Pool3DProgram=class Pool3DProgram{constructor(e,t,r=!1,i=!1,a=!1){if(this.variableNames=["x"],this.uniforms="strides : vec3<i32>, pads : vec3<i32>, convDims : vec3<i32>, filterDims : vec3<i32>,",this.workgroupSize=[128,1,1],this.size=!0,"avg"===t&&r)throw Error("Cannot compute positions for average pool.");this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.poolType=t,this.computePositions=r,this.flattenPositions=i,this.includeBatchIndex=a,this.shaderKey=`pool3D_${t}_${r}_${i}_${a}`}getUserCode(){let e;if("avg"===this.poolType)e="resultValue += value; count += 1.0;";else if(this.computePositions){let t=this.flattenPositions?this.includeBatchIndex?"(((batch * uniforms.xShape.y + xD) * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"((xD * uniforms.xShape.z + xR) * uniforms.xShape.w + xC) * uniforms.xShape.u + ch":"wD * uniforms.filterDims.y * uniforms.filterDims.y + wR * uniforms.filterDims.z + wC";e=`let currMaxValue = mix(value, maxValue, maxValueFound);
      if (value >= currMaxValue) {
        maxValue = value;
        maxValueFound = 1.0;
        maxPosition = ${t};
      }`}else e="resultValue = max(value, resultValue);";let t="resultValue";"avg"===this.poolType&&(t="resultValue / max(count, 1.0)");let r=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let batch = coords.x;
          let ch = coords.u;

          let xCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
          let xDCorner = xCorner.x;
          let xRCorner = xCorner.y;
          let xCCorner = xCorner.z;

          ${this.computePositions?`var maxValue = 0.0;
            var maxValueFound = 0.0;
            var maxPosition = 0;`:`var resultValue = ${"avg"===this.poolType?"0.0":"-1.0 / pow(10.0, -20.0)"};`}

          var count = 0.0;
          for (var wD = 0; wD < uniforms.filterDims.x; wD++) {
            let xD = xDCorner + wD;
            if (xD < 0 || xD >= uniforms.convDims.x) {
              continue;
            }

            for (var wR = 0; wR < uniforms.filterDims.y; wR++) {
              let xR = xRCorner + wR;
              if (xR < 0 || xR >= uniforms.convDims.y) {
                continue;
              }

              for (var wC = 0; wC < uniforms.filterDims.z; wC++) {
                let xC = xCCorner + wC;
                if (xC < 0 || xC >= uniforms.convDims.z) {
                  continue;
                }

                let value = getX(batch, xD, xR, xC, ch);
                ${e}
              }
            }
          }

          ${this.computePositions?"setOutputAtIndexI32(index, maxPosition);":`setOutputAtIndex(index, ${t});`}
        }
      }
    `;return r}};/**
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
 */function max(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{reductionIndices:o,keepDims:s}=i;return reduce(a,o,s,"max",r)}let te={kernelName:f.YoZ,backendName:"webgpu",kernelFunc:max};/**
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
 */function mean(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{keepDims:o,axis:s}=i;return reduce(a,s,o,"mean",r)}let tt={kernelName:f.q2K,backendName:"webgpu",kernelFunc:mean};/**
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
 */function poolImpl(e,t,r,i){let a;if(1===t.filterWidth&&1===t.filterHeight&&f.D5U.arraysEqual(t.inShape,t.outShape))return identity({inputs:{x:e},backend:i});if(t.filterWidth===t.inWidth&&t.filterHeight===t.inHeight&&1===t.batchSize&&"VALID"===t.padInfo.type){let a;let o=e.shape.length,s=reshape({inputs:{x:e},backend:i,attrs:{shape:[e.shape[o-3]*e.shape[o-2],e.shape[o-1]]}});"avg"===r?a=mean({inputs:{x:s},backend:i,attrs:{axis:0,keepDims:!1}}):(f.D5U.assert("max"===r,()=>`Invalid pool type ${r}`),a=max({inputs:{x:s},backend:i,attrs:{reductionIndices:0,keepDims:!1}}));let n=reshape({inputs:{x:a},backend:i,attrs:{shape:t.outShape}});return i.disposeData(s.dataId),i.disposeData(a.dataId),n}let o=[{type:"int32",data:[t.strideHeight,t.strideWidth]}];return 1===t.filterHeight&&1===t.filterWidth?a=new PoolWithFilterSizeEqualsOneProgram(t):("avg"===r?a=new Pool2DProgram(t,"avg"):(f.D5U.assert("max"===r,()=>`Invalid pool type ${r}`),a=new Pool2DProgram(t,"max")),o.push({type:"int32",data:[t.padInfo.top,t.padInfo.left]},{type:"int32",data:[t.dilationHeight,t.dilationWidth]},{type:"int32",data:[t.inHeight,t.inWidth]},{type:"int32",data:[t.effectiveFilterHeight,t.effectiveFilterWidth]})),i.runWebGPUProgram(a,[e],e.dtype,o)}let tr={kernelName:f.JhU,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{filterSize:o,strides:s,pad:n,dimRoundingMode:u}=i,l=f.backend_util.computePool2DInfo(a.shape,o,s,1,n,u);return poolImpl(a,l,"avg",r)}},ti={kernelName:f._k9,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{filterSize:o,strides:s,pad:n,dataFormat:u,dimRoundingMode:l}=i,d=f.backend_util.computePool3DInfo(a.shape,o,s,[1,1,1],n,l,u),p=new Pool3DProgram(d,"avg"),h=[{type:"int32",data:[d.strideDepth,d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.front,d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.inDepth,d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth]}];return r.runWebGPUProgram(p,[a],a.dtype,h)}};/**
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
 */let AvgPool2DBackpropProgram=class AvgPool2DBackpropProgram{constructor(e){this.variableNames=["dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool2DBackprop"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR = wR + uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC = wC + uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);

            dotProd = dotProd + dyValue * uniforms.avgMultiplier;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let AvgPool3DBackpropProgram=class AvgPool3DBackpropProgram{constructor(e){this.variableNames=["dy"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
       outDepth : i32, outHeight : i32, outWidth : i32, avgMultiplier : f32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="avgPool3DBackprop"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              dotProd += dyValue * uniforms.avgMultiplier;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let ta={kernelName:f.IMb,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,input:o}=t,{filterSize:s,strides:n,pad:u,dimRoundingMode:l}=i,d=f.backend_util.computePool3DInfo(o.shape,s,n,1,u,l),p=new AvgPool3DBackpropProgram(d),h=1/(d.filterDepth*d.filterHeight*d.filterWidth),c=[{type:"int32",data:[d.strideDepth,d.strideHeight,d.strideWidth]},{type:"int32",data:[d.effectiveFilterDepth-1-d.padInfo.front,d.effectiveFilterHeight-1-d.padInfo.top,d.effectiveFilterWidth-1-d.padInfo.left]},{type:"int32",data:[d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth]},{type:"int32",data:[d.outDepth]},{type:"int32",data:[d.outHeight]},{type:"int32",data:[d.outWidth]},{type:"float32",data:[h]}];return r.runWebGPUProgram(p,[a],o.dtype,c)}},to={kernelName:f.ROF,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,input:o}=t;assertNotComplex([a,o],"avgPoolGrad");let{filterSize:s,strides:n,pad:u}=i,l=f.backend_util.computePool2DInfo(o.shape,s,n,1,u),d=new AvgPool2DBackpropProgram(l),p=1/(l.filterHeight*l.filterWidth),h=[{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.effectiveFilterHeight-1-l.padInfo.top,l.effectiveFilterWidth-1-l.padInfo.left]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]},{type:"int32",data:[l.effectiveFilterHeight,l.effectiveFilterWidth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"float32",data:[p]}];return r.runWebGPUProgram(d,[a],o.dtype,h)}},ts={kernelName:f.XLW,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{a,b:o}=t,{transposeA:s,transposeB:n}=i;return batchMatMulImpl({a,b:o,transposeA:s,transposeB:n,backend:r})}};/**
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
 */let SliceProgram=class SliceProgram{constructor(e,t){this.variableNames=["source"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.rank=t.length,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.start=e,this.uniforms=`start : ${getCoordsDataType(e.length)}, `,this.shaderKey="slice"}getUserCode(){let e;let t=getCoordsDataType(this.rank),r=function(e){if(1===e)return"sourceLoc";if(e<=6)return tn.slice(0,e).map(e=>`sourceLoc.${e}`).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}(this.rank);e=1===this.start.length?this.outputShape.map((e,t)=>"sourceLoc = uniforms.start + coords;"):this.outputShape.map((e,t)=>`sourceLoc.${tn[t]} = uniforms.start.${getCoordsXYZ(t)} + coords.${tn[t]};`);let i=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          var sourceLoc : ${t};
          let coords = getCoordsFromIndex(index);
          ${e.join("\n")}
          setOutputAtIndex(index, getSource(${r}));
        }
      }
    `;return i}};let tn=["x","y","z","w","u","v"];/**
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
 */function slice(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{begin:o,size:s}=i,[n,u]=f.kuN.parseSliceParams(a,o,s);if(f.kuN.assertParamsValid(a,n,u),r.shouldExecuteOnCPU([a])||"string"===a.dtype){let e=r.tensorMap.get(a.dataId),t=eN(e.values,n,u,a.shape,a.dtype);return r.makeTensorInfo(u,a.dtype,t)}if(0===f.D5U.sizeFromShape(u))return r.makeTensorInfo(u,a.dtype,[]);let l=new SliceProgram(n,u),d=[{type:"int32",data:n}];return r.runWebGPUProgram(l,[a],a.dtype,d)}let tu={kernelName:f.p2w,backendName:"webgpu",kernelFunc:slice},tl={kernelName:f.zws,backendName:"webgpu",kernelFunc:e=>{let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{blockShape:o,crops:s}=i;f.D5U.assert(a.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGPU backend not implemented yet");let n=o.reduce((e,t)=>e*t),u=f.backend_util.getReshaped(a.shape,o,n),l=f.backend_util.getPermuted(u.length,o.length),d=f.backend_util.getReshapedPermuted(a.shape,o,n),p=f.backend_util.getSliceBeginCoords(s,o.length),h=f.backend_util.getSliceSize(d,s,o.length),c=[],m=reshape({inputs:{x:a},backend:r,attrs:{shape:u}}),g=transpose({inputs:{x:m},backend:r,attrs:{perm:l}}),y=reshape({inputs:{x:g},backend:r,attrs:{shape:d}}),x=slice({inputs:{x:y},backend:r,attrs:{begin:p,size:h}});return c.push(m),c.push(g),c.push(y),c.forEach(e=>r.disposeData(e.dataId)),x}},td=`
  fn bincount_write(index: i32, value: f32) {
    ${atomicAddSnippet("&result[index]","value","float32")}
  }
`,tp=`
  fn bincount_write(index: i32, value: f32) {
    atomicStore(&result[index], bitcast<i32>(value));
  }
`;let BincountProgram=class BincountProgram{constructor(e,t,r=!1){this.outputShape=[],this.variableNames=["x"],this.uniforms="binCountSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.hasWeights=!0,this.binaryOutput=!1,this.outputShape=e,this.rank=e.length,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.binaryOutput=r,r&&(this.atomic=!1),this.hasWeights=t,this.hasWeights&&this.variableNames.push("w"),this.shaderKey=`bincount_${this.hasWeights}_${this.binaryOutput}_${this.rank}`}getUserCode(){let e=`
    ${this.binaryOutput?tp:td}
  ${getMainHeaderString("index")} {
    ${1===this.rank?`if (index < uniforms.xShape) {
      let indexVal = i32(getX(index));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(index)":"1."};
        bincount_write(indexVal, value);
      }
    }`:`let coord = getCoordsFromIndex(index);
    if (coordsInBounds2D(coord, uniforms.xShape)) {
      let indexVal = i32(getX(coord[0], coord[1]));
      if (indexVal < uniforms.binCountSize) {
        let value = ${this.binaryOutput?1:this.hasWeights?"getW(coord[0], coord[1])":"1."};
        bincount_write(coord.x * uniforms.binCountSize + indexVal, value);
      }
    }`}
  }
  `;return e}};let th={kernelName:f.zvY,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,weights:o}=t,{size:s}=i,n=f.D5U.sizeFromShape(a.shape),u=f.D5U.sizeFromShape(o.shape),l=u>0,d=o.dtype,p=fill({backend:r,attrs:{shape:[s],value:0,dtype:d}}),h=new BincountProgram([n],l),c=l?[a,o]:[a],m=r.runWebGPUProgram(h,c,d,[{type:"int32",data:[s]}],p);return m}};/**
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
 */let BroadcastArgsProgram=class BroadcastArgsProgram{constructor(e){this.outputShape=[],this.variableNames=["s0","s1"],this.uniforms="s0Size : i32, s1Size : i32, ",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="broadcastArgs"}getUserCode(){let e=`
  ${getMainHeaderString("index")} {
    if (index < uniforms.size) {
      var s0 = 1.0;
      var s1 = 1.0;
      let indexS0 = index - uniforms.size + uniforms.s0Size;
      let indexS1 = index - uniforms.size + uniforms.s1Size;
      if (indexS0 >= 0) {
        s0 = getS0(indexS0);
      }
      if (indexS1 >= 0) {
        s1 = getS1(indexS1);
      }

      if (s0 == 1.0) {
        setOutputAtIndex(index, s1);
      } else if (s1 == 1.0) {
        setOutputAtIndex(index, s0);
      } else if (s0 != s1) {
        setOutputAtIndex(index, uniforms.NAN);
      } else {
        setOutputAtIndex(index, s0);
      }
    }
  }
  `;return e}};let tc={kernelName:f.eEB,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{s0:i,s1:a}=t;if(r.shouldExecuteOnCPU([i,a])){let e=r.tensorMap.get(i.dataId),t=r.tensorMap.get(a.dataId),o=e.values,s=t.values,n=f.backend_util.assertAndGetBroadcastShape(Array.from(o),Array.from(s));return r.makeTensorInfo([n.length],"int32",Int32Array.from(n))}let o=f.D5U.sizeFromShape(i.shape),s=f.D5U.sizeFromShape(a.shape),n=Math.max(o,s),u=new BroadcastArgsProgram(n),l=[{type:"int32",data:[o]},{type:"int32",data:[s]}];return r.runWebGPUProgram(u,[i,a],"int32",l)}},tm=binaryKernelFunc({opType:p.NOT_EQUAL,dtype:"bool",cpuKernelImpl:ek}),tf={kernelName:f.yQU,backendName:"webgpu",kernelFunc:tm};/**
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
 */function real(e){let{inputs:t,backend:r}=e,{input:i}=t,a=r.tensorMap.get(i.dataId);return identity({inputs:{x:a.complexTensorInfos.real},backend:r})}let tg={kernelName:f.xJR,backendName:"webgpu",kernelFunc:real},ty={kernelName:f.RFZ,backendName:"webgpu",kernelFunc:/**
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
 */function cast(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{dtype:o}=i;if("complex64"===o){if("complex64"===a.dtype)return identity({inputs:{x:a},backend:r});let e=f.lls(a.shape),t=cast({inputs:{x:a},backend:r,attrs:{dtype:"float32"}}),i=complex({inputs:{real:t,imag:e},backend:r});return e.dispose(),r.disposeData(t.dataId),i}if("complex64"===a.dtype){let e=real({inputs:{input:a},backend:r}),t=cast({inputs:{x:e},backend:r,attrs:{dtype:o}});return r.disposeData(e.dataId),t}if(!f.D5U.hasEncodingLoss(a.dtype,o)){let e=identity({inputs:{x:a},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:o}}if(r.shouldExecuteOnCPU([a])){let e=r.tensorMap.get(a.dataId).values,[t,i,s]=eo(e,a.shape,a.dtype,o);return r.makeTensorInfo(t,i,s)}if("int32"===o)return(/**
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
 */function(e,t){let r=new UnaryOpProgram(e.shape,h.TO_INT),i=t.runWebGPUProgram(r,[e],"int32");return{dataId:i.dataId,shape:i.shape,dtype:i.dtype}}(a,r));if("bool"===o){let e=r.makeTensorInfo([],"bool",f.D5U.getTypedArrayFromDType("bool",1)),t=tm({inputs:{a:a,b:e},backend:r});return r.disposeData(e.dataId),t}throw Error(`Error in Cast: failed to cast ${a.dtype} to ${o}`)}},tx=unaryKernelFunc({opType:h.CEIL,cpuKernelImpl:es}),tb={kernelName:f.gJX,backendName:"webgpu",kernelFunc:tx};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ClipVec4Program=class ClipVec4Program{constructor(e){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workPerThread=4,this.workgroupSize=[64,1,1],this.outputComponent=4,this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.shaderKey="clipVec4"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          var clampedValue = clamp(
              value, vec4<f32>(uniforms.minVal), vec4<f32>(uniforms.maxVal));
          clampedValue = select(clampedValue, value, isnanVec4(value));
          setOutputAtIndex(index, clampedValue);
        }
      }
    `;return e}};/**
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
 */let ClipProgram=class ClipProgram{constructor(e){this.variableNames=["A"],this.uniforms="minVal : f32, maxVal : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="clip"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if(index < uniforms.size) {
          let value = getAByOutputIndex(index);
          if (isnan(value)) {
            setOutputAtIndex(index, value);
            return;
          }
          setOutputAtIndex(index, clamp(value, uniforms.minVal, uniforms.maxVal));
        }
      }
    `;return e}};let tS={kernelName:f.xnO,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{x:o}=r,{clipValueMin:s,clipValueMax:n}=a,u=[{type:"float32",data:[s]},{type:"float32",data:[n]}];return t=f.D5U.sizeFromShape(o.shape)%4==0?new ClipVec4Program(o.shape):new ClipProgram(o.shape),i.runWebGPUProgram(t,[o],o.dtype,u)}};/**
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
 */let ComplexAbsProgram=class ComplexAbsProgram{constructor(e){this.outputShape=[],this.variableNames=["real","imag"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="complexAbs"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let re = abs(getRealByOutputIndex(index));
        let im = abs(getImagByOutputIndex(index));
        let mx = max(re, im);

        // The length function in wgsl may be not underflow-safe on some GPUs.
        // So the safe solution is to ensure underflow-safety in all cases.
        setOutputAtIndex(index, select(mx * length(vec2<f32>(1, min(re, im)/mx)), 0.0, mx == 0.0));
      }
    }
  `;return e}};/**
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
 */function makeComplexComponentTensorInfo(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}let tw={kernelName:f.yj2,backendName:"webgpu",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:i}=t,a=r.tensorMap.get(i.dataId),o=new ComplexAbsProgram(i.shape),s=[makeComplexComponentTensorInfo(i,a.complexTensorInfos.real),makeComplexComponentTensorInfo(i,a.complexTensorInfos.imag)];return r.runWebGPUProgram(o,s,s[0].dtype)}};/**
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
 */let ConcatProgram=class ConcatProgram{constructor(e){this.uniforms="",this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=f.backend_util.computeOutShape(e,1),this.variableNames=e.map((e,t)=>`T${t}`),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]),this.offsetLength=e.length-1;for(let e=0;e<this.offsetLength;e++)this.uniforms+=`offset${e} : i32,`;this.shaderKey="concat"}getUserCode(){let e=[];if(this.offsetLength>0){e.push("if (yC < uniforms.offset0){ setOutputAtCoords(coords.x, coords.y, getT0(yR, yC)); }");for(let t=1;t<this.offsetLength;t++)e.push(`else if (yC < uniforms.offset${[t]}){ setOutputAtCoords(coords.x, coords.y, getT${t}(yR, yC - uniforms.offset${t-1})); }`);let t=this.offsetLength,r=this.offsetLength-1;e.push(`else { setOutputAtCoords(coords.x, coords.y, getT${t}(yR, yC - uniforms.offset${r})); }`)}else e.push("setOutputAtCoords(coords.x, coords.y, getT0(yR, yC));");let t=`
      ${getMainHeaderString("index")} {
        for(var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let flatIndex = index * ${this.workPerThread} + i;
          if(flatIndex < uniforms.size) {
            let coords = getCoordsFromIndex(flatIndex);
            let yR = coords.x;
            let yC = coords.y;

            ${e.join("\n        ")}
          }
        }
      }
    `;return t}};/**
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
 */function imag(e){let{inputs:t,backend:r}=e,{input:i}=t,a=r.tensorMap.get(i.dataId);return identity({inputs:{x:a.complexTensorInfos.imag},backend:r})}let tC={kernelName:f.J_u,backendName:"webgpu",kernelFunc:imag};/**
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
 */function concat(e){let{inputs:t,backend:r,attrs:i}=e,{axis:a}=i,o=f.D5U.parseAxisParam(a,t[0].shape)[0],s=t.map(e=>e.shape);f.backend_util.assertParamsConsistent(s,o);let n=f.backend_util.computeOutShape(t.map(e=>e.shape),o);if(0===f.D5U.sizeFromShape(n))return r.makeTensorInfo(n,t[0].dtype,[]);let u=t.filter(e=>f.D5U.sizeFromShape(e.shape)>0);return 1===u.length?identity({inputs:{x:u[0]},backend:r}):/**
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
 */function concatImpl(e,t,r){let i=e[0].dtype;if("complex64"===i){let i=e.map(e=>real({inputs:{input:e},backend:r})),a=e.map(e=>imag({inputs:{input:e},backend:r})),o=concatImpl(i,t,r),s=concatImpl(a,t,r),n=complex({inputs:{real:o,imag:s},backend:r});return i.forEach(e=>r.disposeData(e.dataId)),a.forEach(e=>r.disposeData(e.dataId)),r.disposeData(o.dataId),r.disposeData(s.dataId),n}let a=r.shouldExecuteOnCPU(e);if("string"===i&&(a=!0),a){let a=e.map(e=>{let i=f.D5U.sizeFromShape(e.shape.slice(t));return reshape({inputs:{x:e},backend:r,attrs:{shape:[-1,i]}})}),o=a.map(e=>({vals:r.readSync(e.dataId),shape:e.shape})),s=f.backend_util.computeOutShape(a.map(e=>e.shape),1),n=1===a[0].shape[0],u=en(o,s,i,n),l=f.backend_util.computeOutShape(e.map(e=>e.shape),t),d=r.makeTensorInfo(l,i,u);return a.forEach(e=>r.disposeData(e.dataId)),d}let o=r.device.limits.maxStorageBuffersPerShaderStage-1;if(e.length>o){let i=[];for(let a=0;a<e.length;a+=o){let s=e.slice(a,a+o);i.push(concatImpl(s,t,r))}let a=concatImpl(i,t,r);for(let e of i)r.disposeData(e.dataId);return a}let{tensors2D:s,outShape:n}=function(e,t,r){let i=f.backend_util.computeOutShape(e.map(e=>e.shape),t),a=e.map(e=>reshape({inputs:{x:e},backend:r,attrs:{shape:[f.D5U.sizeFromShape(e.shape.slice(0,t)),f.D5U.sizeFromShape(e.shape.slice(t))]}}));return{tensors2D:a,outShape:i}}(e,t,r),u=s.map(e=>e.shape),l=new ConcatProgram(u),d=[],p=Array(u.length-1);if(p.length>0){p[0]=u[0][1],d.push({type:"int32",data:[p[0]]});for(let e=1;e<p.length;e++)p[e]=p[e-1]+u[e][1],d.push({type:"int32",data:[p[e]]})}let h=r.runWebGPUProgram(l,s,s[0].dtype,d);s.forEach(e=>r.disposeData(e.dataId));let c=reshape({inputs:{x:h},backend:r,attrs:{shape:n}});return r.disposeData(h.dataId),c}(u,o,r)}let tv={kernelName:f.Eh3,backendName:"webgpu",kernelFunc:concat};let Conv2DMMProgram=class Conv2DMMProgram{constructor(e,t,r,i,a=!1,o=null,s=!1,n=!1){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=e.outShape,this.isChannelsLast="channelsLast"===e.dataFormat,this.isVec4=((e.inChannels%4==0||e.inChannels%3==0)&&this.isChannelsLast||e.outWidth%4==0&&!this.isChannelsLast)&&e.outChannels%4==0,this.dispatchLayout=this.isChannelsLast?{x:[3],y:[1,2],z:[0]}:{x:[2,3],y:[1],z:[0]},this.workgroupSize=computeWorkgroupSizeForConv2d(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=computeWorkPerThreadForConv2d(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4?(this.outputComponent=4,this.isChannelsLast&&e.inChannels%4!=0?(this.innerElementSize=3,this.variableComponents=[1,4]):(this.innerElementSize=4,this.variableComponents=[4,4]),a&&(this.variableNames.push("bias"),this.variableComponents.push(4)),s&&(this.variableNames.push("preluActivationWeights"),this.variableComponents.push(4))):(this.innerElementSize=this.elementsPerThread[0],a&&this.variableNames.push("bias"),s&&this.variableNames.push("preluActivationWeights")),this.sequentialAccessByThreads=n,this.addBias=a,this.activation=o,this.hasPreluActivationWeights=s,this.tileAOuter=this.workgroupSize[1]*this.elementsPerThread[1],this.tileBOuter=this.workgroupSize[0]*this.elementsPerThread[0],this.tileInner=Math.max(this.workgroupSize[0]*this.innerElementSize,this.workgroupSize[1]),this.fitAOuter=t%this.tileAOuter==0,this.fitBOuter=r%this.tileBOuter==0,this.fitInner=i%this.tileInner==0,this.shaderKey=`conv2DMM_${this.elementsPerThread}_${this.activation}}_${this.fitAOuter}_${this.fitBOuter}_${this.fitInner}_${this.isVec4}_${this.innerElementSize}_${this.isChannelsLast}_${this.sequentialAccessByThreads}`}getUserCode(){let e=this.isVec4?makeMatMulPackedVec4Source(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner):makeMatMulPackedSource(this.elementsPerThread,this.workgroupSize,!this.isChannelsLast,this.tileInner,!1,null,this.sequentialAccessByThreads),t=this.isVec4?[this.innerElementSize,4,4]:[1,1,1],r=`
    ${/**
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
 */function(e,t,r,i,a=!1,o=null,s=!1,n=4,u=4,l=4){let d=e?`
      let coord = vec4<i32>(batch, xRow, xCol, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, xRow, xCol);
      `,p=e?`
      let coords = vec4<i32>(
        batch,
        row / outWidth,
        row % outWidth,
        col);
      `:`
      let coords = vec4<i32>(
        batch,
        row,
        col / outWidth,
        col % outWidth);
      `,h=e?"row":"col",c=e?"col":"row",m=`
      let inChannels = uniforms.wShape[2];
      let outWidth = ${e?"uniforms.outShape[2]":"uniforms.outShape[3]"};
      let outRow = ${h} / outWidth;
      let outCol = ${h} % outWidth;

      let WRow = ${c} / (uniforms.filterDims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filterDims[1];
      let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * WRow - uniforms.pads[0];
      let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * WCol - uniforms.pads[1];
      let xCh = ${c} % inChannels;
      var resData = ${typeSnippet(n)}(0.0);
      // The bounds checking is always needed since we use it to pad zero for
      // the 'same' padding type.
      if (xRow >= 0 && xRow < ${e?"uniforms.xShape[1]":"uniforms.xShape[2]"} && xCol >= 0 && xCol < ${e?"uniforms.xShape[2]":"uniforms.xShape[3]"}) {
        ${d}
        let xIndex = getIndexFromCoords4D(coord, uniforms.xShape);
        ${(e=>{switch(e){case 1:return"resData = f32(x[xIndex]);";case 3:return"resData = vec3<f32>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);";case 4:return"resData = vec4<f32>(x[xIndex / 4]);";default:throw Error(`innerElementSize ${e} is not supported.`)}})(n)}
      }
      return resData;`,f=e?t&&i?`
      ${m}`:`
      if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${m}
      }
      return ${typeSnippet(n)}(0.0);`:i&&r?`
      ${m}`:`
      if (row < uniforms.dimInner && col < uniforms.dimBOuter) {
        ${m}
      }
      return ${typeSnippet(n)}(0.0);`,g=`${(e=>{switch(e){case 1:return"return f32(W[row * uniforms.wShape[3] + col]);";case 4:return"return vec4<f32>(W[(row * uniforms.wShape[3] + col) / 4]);";default:throw Error(`innerElementSize ${e} is not supported.`)}})(u)}`,y=typeSnippet(l),x=e?typeSnippet(n):typeSnippet(u),b=e?typeSnippet(u):typeSnippet(n),S=`
      ${activationFnSnippet(o,s,4===l,4)}
      fn mm_readA(batch: i32, row : i32, col : i32) -> ${x} {
        ${e?f:g}
      }

      fn mm_readB(batch: i32, row : i32, col : i32) -> ${b} {
        ${e?g:f}
      }

      fn mm_write(batch: i32, row : i32, col : i32, valueIn : ${y}) {
        if (row < uniforms.dimAOuter && col < uniforms.dimBOuter)
        {
        var value = valueIn;
        let outWidth = ${e?"uniforms.outShape[2]":"uniforms.outShape[3]"};
        ${p}
        ${biasActivationSnippet(a,o)}
        setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }`;return S}(this.isChannelsLast,this.fitAOuter,this.fitBOuter,this.fitInner,this.addBias,this.activation,this.hasPreluActivationWeights,t[0],t[1],t[2])}
    ${e}
  `;return r}};/**
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
 */let Conv2DNaiveProgram=class Conv2DNaiveProgram{constructor(e,t=!1,r=null,i=!1){this.variableNames=["x","W"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>,",this.workgroupSize=[4,4,8],this.outputShape=e.outShape,this.isChannelsLast="channelsLast"===e.dataFormat,this.dispatchLayout=this.isChannelsLast?{x:[2],y:[1],z:[0,3]}:{x:[3],y:[2],z:[0,1]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.addBias=t,this.activation=r,this.hasPreluActivationWeights=i,t&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.shaderKey=`conv2dnaive_${this.activation}_${this.isChannelsLast}`}getUserCode(){let e=`
       ${activationFnSnippet(this.activation,this.hasPreluActivationWeights,!1,4)}
       fn readInp(batch : i32, row : i32, col : i32, chan : i32) -> f32{
         let coords = vec4<i32>(batch, row, col, chan);
         if (coordsInBounds4D(coords, uniforms.xShape)) {
           return  getX(batch, row, col, chan);
         } else {
          return 0.0;
         }
       }
       fn readFilt(row : i32, col : i32, xChannel : i32, outChannel : i32) -> f32{
         let coords = vec4<i32>(row, col, xChannel, outChannel);
         if(coordsInBounds4D(coords, uniforms.wShape)) {
           return getW(row, col, xChannel, outChannel);
          } else {
            return 0.0;
          }
       }
       fn writeResult(batch : i32, row : i32, col : i32, chan : i32, valueIn : f32) {
         let coords = ${this.isChannelsLast?"vec4<i32>(batch, row, col, chan);":"vec4<i32>(batch, chan, row, col);"}
         if (coordsInBounds4D(coords, uniforms.outShape)) {
           var value = valueIn;
           ${biasActivationSnippet(this.addBias,this.activation)}
           setOutputAtCoords(coords.x, coords.y, coords.z, coords.w, value);
         }
       }
       ${getMainHeaderString("index")} {
         let coords = getOutputCoords();
         let batch = coords[0];
         let outChannel = ${this.isChannelsLast?"coords[3];":"coords[1];"}
         let outRow = ${this.isChannelsLast?"coords[1];":"coords[2];"}
         let outCol = ${this.isChannelsLast?"coords[2];":"coords[3];"}
         var acc : f32 = 0.0;
         for (var row = 0; row < uniforms.filterDims[0]; row = row + 1) {
           for (var col = 0; col < uniforms.filterDims[1]; col = col + 1) {
             let xRow = outRow * uniforms.strides[0] + uniforms.dilations[0] * row - uniforms.pads[0];
             let xCol = outCol * uniforms.strides[1] + uniforms.dilations[1] * col - uniforms.pads[1];
             for (var xChannel = 0; xChannel < ${this.isChannelsLast?"uniforms.xShape[3];":"uniforms.xShape[1];"} xChannel = xChannel + 1) {
               ${this.isChannelsLast?"let v = readInp(batch, xRow, xCol, xChannel);":"let v = readInp(batch, xChannel, xRow, xCol);"}
               let f = readFilt(row, col, xChannel, outChannel);
               acc = acc + v * f;
             }
           }
         }
         writeResult(batch, outRow, outCol, outChannel, acc);
       }
     `;return e}};/**
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
 */let Im2ColProgram=class Im2ColProgram{constructor(e,t){this.variableNames=["x"],this.uniforms=`pads : vec2<i32>, strides : vec2<i32>, dilations : vec2<i32>, outWidth : i32, itemsPerBlockRow : i32,
       inChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast=t,this.shaderKey=`im2col_${this.isChannelsLast}`}getUserCode(){let e=this.isChannelsLast?1:2,t=this.isChannelsLast?2:3,r=this.isChannelsLast?"coords[1]":"coords[2]",i=this.isChannelsLast?"coords[2]":"coords[1]",a=this.isChannelsLast?"getX(batch, xRow, xCol, ch)":"getX(batch, ch, xRow, xCol)",o=`
    ${getMainHeaderString("index")} {
      let coords = getCoordsFromIndex(index);
      if(index < uniforms.size) {
        let batch = coords[0];
        let row = ${r};
        let col = ${i};
        let offsetY = (row / uniforms.outWidth) * uniforms.strides[0] - uniforms.pads[0];
        let xRow = offsetY + uniforms.dilations[0] * (col / uniforms.itemsPerBlockRow);
        var value = 0.0;
        if(xRow < uniforms.xShape[${e}] && xRow >= 0) {
          let offsetX = (row % uniforms.outWidth) * uniforms.strides[1] -
              uniforms.pads[1];
          let xCol = offsetX + uniforms.dilations[1] * ((col %
              uniforms.itemsPerBlockRow) / uniforms.inChannels);
          let ch = col % uniforms.inChannels;
          if(xCol < uniforms.xShape[${t}] && xCol >= 0) {
            value = ${a};
          }
        }
        setOutputAtIndex(index, value);
      }
    }
   `;return o}};/**
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
 */function getShapeForBatchMatMul(e,t){let r=e.length;return r>=3?t?[...e.slice(0,-3),e[r-3]*e[r-2],e[r-1]]:[...e.slice(0,-3),e[r-3],e[r-2]*e[r-1]]:!t&&1===r&&e[0]>1?[e[0],1]:null}function conv2DImpl({x:e,filter:t,convInfo:r,backend:i,bias:a=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:n=null}){let u;let l=null!=a,d=null!=o,p="channelsLast"===r.dataFormat,h=p&&r.filterHeight===r.inHeight&&r.filterWidth===r.inWidth&&"VALID"===r.padInfo.type,c=(0,f.OBj)().getBool("WEBGPU_USE_NAIVE_CONV2D_DEBUG");if(!c&&(h||1===r.filterHeight&&1===r.filterWidth&&1===r.dilationHeight&&1===r.dilationWidth&&1===r.strideHeight&&1===r.strideWidth&&("SAME"===r.padInfo.type||"VALID"===r.padInfo.type)))return function({x:e,filter:t,convInfo:r,backend:i,bias:a=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:n=null}){let u,l;let d="channelsLast"===r.dataFormat,p=!d,h=d&&r.filterHeight===r.inHeight&&r.filterWidth===r.inWidth&&"VALID"===r.padInfo.type,c=[];if(h){let a=r.inHeight*r.inWidth*r.inChannels;u=reshape({inputs:{x:e},backend:i,attrs:{shape:[1,r.batchSize,a]}}),l=reshape({inputs:{x:t},backend:i,attrs:{shape:[1,a,r.outChannels]}})}else u=reshape({inputs:{x:e},backend:i,attrs:{shape:d?[r.batchSize,r.inHeight*r.inWidth,r.inChannels]:[r.batchSize,r.inChannels,r.inHeight*r.inWidth]}}),l=reshape({inputs:{x:t},backend:i,attrs:{shape:[1,r.inChannels,r.outChannels]}});if(c.push(u),c.push(l),null!=o){let e=getShapeForBatchMatMul(o.shape,d);null!=e&&(o=reshape({inputs:{x:o},backend:i,attrs:{shape:e}}),c.push(o))}if(null!=a){let e=getShapeForBatchMatMul(a.shape,d);null!=e&&(a=reshape({inputs:{x:a},backend:i,attrs:{shape:e}}),c.push(a))}let m=batchMatMulImpl({a:d?u:l,b:d?l:u,transposeA:p,transposeB:!1,backend:i,bias:a,activation:n,preluActivationWeights:o,leakyreluAlpha:s}),f=reshape({inputs:{x:m},backend:i,attrs:{shape:r.outShape}});for(let e of(c.push(m),c))i.disposeData(e.dataId);return f}({x:e,filter:t,convInfo:r,backend:i,bias:a,activation:n,preluActivationWeights:o,leakyreluAlpha:s});let m=(0,f.OBj)().getNumber("WEBGPU_THRESHOLD_TO_INCREASE_WORKGROUPS_FOR_MATMUL"),g=m>-1?m:i.thresholdToIncreaseWorkgroups,y=r.batchSize*Math.ceil(r.outHeight*r.outWidth/32)*Math.ceil(r.outChannels/32);if((0,f.OBj)().getBool("WEBGPU_CONV_SEPARATE_IM2COL_SHADER")||y<=g)return function({x:e,filter:t,convInfo:r,backend:i,bias:a=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:n=null}){let{filterWidth:u,filterHeight:l,inChannels:d,strideWidth:p,strideHeight:h,padInfo:c,outWidth:m,outHeight:f,dilationWidth:g,dilationHeight:y,dataFormat:x}=r,b="channelsLast"===x,S=u*l*d,w=f*m,C=b?[r.batchSize,w,S]:[r.batchSize,S,w],v=new Im2ColProgram(C,b),I=[{type:"int32",data:[c.top,c.left]},{type:"int32",data:[h,p]},{type:"int32",data:[y,g]},{type:"int32",data:[m]},{type:"int32",data:[d*u]},{type:"int32",data:[d]}],k=i.runWebGPUProgram(v,[e],e.dtype,I),P=[];P.push(k);let D=reshape({inputs:{x:t},backend:i,attrs:{shape:[1,S,-1]}});if(P.push(D),null!=o){let e=getShapeForBatchMatMul(o.shape,b);null!=e&&(o=reshape({inputs:{x:o},backend:i,attrs:{shape:e}}),P.push(o))}if(null!=a){let e=getShapeForBatchMatMul(a.shape,b);null!=e&&(a=reshape({inputs:{x:a},backend:i,attrs:{shape:e}}),P.push(a))}let R=!b,$=batchMatMulImpl({a:b?k:D,b:b?D:k,transposeA:R,transposeB:!1,backend:i,bias:a,activation:n,preluActivationWeights:o,leakyreluAlpha:s}),z=reshape({inputs:{x:$},backend:i,attrs:{shape:r.outShape}});for(let e of(P.push($),P))i.disposeData(e.dataId);return z}({x:e,filter:t,convInfo:r,backend:i,bias:a,preluActivationWeights:o,leakyreluAlpha:s,activation:n});let x=[r.padInfo.top,r.padInfo.left],b=[{type:"int32",data:[r.filterHeight,r.filterWidth]},{type:"int32",data:[...x]},{type:"int32",data:[r.strideHeight,r.strideWidth]},{type:"int32",data:[r.dilationHeight,r.dilationWidth]}];if(c)u=new Conv2DNaiveProgram(r,l,n,d);else{let e=p?r.outHeight*r.outWidth:r.outChannels,t=p?r.outChannels:r.outHeight*r.outWidth,a=r.filterHeight*r.filterWidth*r.inChannels;b.push({type:"int32",data:[e]},{type:"int32",data:[t]},{type:"int32",data:[a]});let o=i.adapterInfo.isIntel();u=new Conv2DMMProgram(r,e,t,a,l,n,d,o)}let S=[],w=[e,t];l&&(p||1!==a.shape.length||S.push(a=reshape({inputs:{x:a},backend:i,attrs:{shape:[a.shape[0],1,1]}})),w.push(a)),d&&(p||1!==o.shape.length||S.push(o=reshape({inputs:{x:o},backend:i,attrs:{shape:[o.shape[0],1,1]}})),w.push(o)),"leakyrelu"===n&&(b.push({type:"float32",data:[s]}),u.uniforms+=" alpha : f32,");let C=i.runWebGPUProgram(u,w,e.dtype,b);for(let e of S)i.disposeData(e.dataId);return C}let tI={kernelName:f.mhS,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,attrs:r,backend:i}=e,{x:a,filter:o}=t,{strides:s,pad:n,dataFormat:u,dilations:l,dimRoundingMode:d}=r,p=f.backend_util.convertConv2DDataFormat(u),h=f.backend_util.computeConv2DInfo(a.shape,o.shape,s,l,n,d,!1,p);return conv2DImpl({x:a,filter:o,convInfo:h,backend:i})}};/**
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
 */let Conv2DDerInputProgram=class Conv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>,",this.workgroupSize=[64,1,1],this.size=!1,this.isVec4=!1,this.workPerThread=1,this.outputShape=e.inShape,this.isChannelsLast="channelsLast"===e.dataFormat,this.isVec4=this.isChannelsLast&&e.outChannels%4==0&&e.inChannels%4==0,this.isVec4?(this.workPerThread=2,this.outputComponent=4,this.workgroupSize=[4,4,4],this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[4,this.workPerThread,1])):(this.size=!0,this.workPerThread=1,this.workgroupSize=[64,1,1],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize)),this.shaderKey=`conv2DDerInput_${this.isChannelsLast}_${this.isVec4}_${this.workPerThread}`}getUserCode(){let e=this.isChannelsLast?1:2,t=this.isChannelsLast?2:3,r=this.isChannelsLast?3:1,i=`
    ${getMainHeaderString()} {
      let batch = i32(globalId.z) / uniforms.outShape[1];
      let r = i32(globalId.z) % uniforms.outShape[1];
      let c = i32(globalId.y) * ${this.workPerThread};
      let d1 = i32(globalId.x) * 4;

      let dyCorner = vec2<i32>(r, c) - uniforms.pads;

      // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
      // ? = to be determined. : = across all values in that axis.
      var dotProd: array<vec4<f32>, ${this.workPerThread}>;
      for (var i = 0; i < ${this.workPerThread}; i++) {
        dotProd[i] = vec4<f32>(0.0);
      }
      for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
        let dyR = f32(dyCorner.x + wR) / f32(uniforms.strides.x);
        let wRPerm = uniforms.filterDims.x - 1 - wR;
        if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) ||
            fract(dyR) > 0.0) {
          continue;
        }
        let idyR = i32(dyR);

        for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
          let dyC = f32(dyCorner.y + wC) / f32(uniforms.strides.y);
          let dyC2 = f32(dyCorner.y + 1 + wC) / f32(uniforms.strides.y);
          let wCPerm = uniforms.filterDims.y - 1 - wC;
          var bDyCVal = true;
          var bDyCVal2 = true;
          if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
              fract(dyC) > 0.0) {
            bDyCVal = false;
          }
          if (dyC2 < 0.0 || dyC2 >= f32(uniforms.outBackprop[2]) ||
              fract(dyC2) > 0.0) {
            bDyCVal2 = false;
          }

          let idyC = i32(dyC);
          let idyC2 = i32(dyC2);
          if (bDyCVal && bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
              xValue = getDy(batch, idyR, idyC2, d2);
              dotProd[1] = dotProd[1] + vec4<f32>(dot(xValue, wValue0),
                                                  dot(xValue, wValue1),
                                                  dot(xValue, wValue2),
                                                  dot(xValue, wValue3));
            }
          } else if (bDyCVal) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[0] = dotProd[0] + tmpval;
            }
          } else if (bDyCVal2) {
            let d2Length = uniforms.outBackprop[3];
            for (var d2 = 0; d2 < d2Length; d2 = d2 + 4) {
              let wValue0 = getW(wRPerm, wCPerm, d1, d2);
              let wValue1 = getW(wRPerm, wCPerm, d1 + 1, d2);
              let wValue2 = getW(wRPerm, wCPerm, d1 + 2, d2);
              let wValue3 = getW(wRPerm, wCPerm, d1 + 3, d2);
              var xValue =  getDy(batch, idyR, idyC2, d2);
              let tmpval = vec4<f32>(dot(xValue, wValue0),
                                     dot(xValue, wValue1),
                                     dot(xValue, wValue2),
                                     dot(xValue, wValue3));
              dotProd[1] = dotProd[1] + tmpval;
            }
          }
        }
      }

      for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
        let coords = vec4<i32>(batch, r, c + i, d1);
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], dotProd[i]);
        }
      }
    }
    `;return this.isVec4?`
    ${i}
    `:`
    ${getMainHeaderString("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[${r}];

        let dyCorner = vec2<i32>(coords[${e}], coords[${t}]) - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims.x; wR = wR + 1) {
          let dyR = (f32(dyRCorner) + f32(wR)) / f32(uniforms.strides.x);
          let wRPerm = uniforms.filterDims.x - 1 - wR;
          if (dyR < 0.0 || dyR >= f32(uniforms.outBackprop[1]) || fract(dyR) > 0.0 ||
              wRPerm < 0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims.y; wC = wC + 1) {
            let dyC = (f32(dyCCorner) + f32(wC)) / f32(uniforms.strides.y);
            let wCPerm = uniforms.filterDims.y - 1 - wC;
            if (dyC < 0.0 || dyC >= f32(uniforms.outBackprop[2]) ||
                fract(dyC) > 0.0 || wCPerm < 0) {
              continue;
            }
            let idyC = i32(dyC);

            for (var d2 = 0; d2 < uniforms.outBackprop[3]; d2 = d2 + 1) {
              let xValue = ${this.isChannelsLast?"getDy(batch, idyR, idyC, d2)":"getDy(batch, d2, idyR, idyC)"};
              let wValue = getW(wRPerm, wCPerm, d1, d2);
              dotProd = dotProd + xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};let Conv2DDerFilterProgram=class Conv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.uniforms="pads : vec2<i32>, strides : vec2<i32>, batchSize : i32, outHeight : i32, outWidth : i32, inHeight : i32, inWidth : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.filterShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast="channelsLast"===e.dataFormat,this.shaderKey=`conv2DDerFilter_${this.isChannelsLast}`}getUserCode(){return`
    ${getMainHeaderString("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let d2 = coords[3];

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b = b + 1) {
          for (var yR = 0; yR < uniforms.outHeight; yR = yR + 1) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];
            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC = yC + 1) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              if (${this.isChannelsLast}) {
                let dyValue = getDy(b, yR, yC, d2);
                let xValue = getX(b, xR, xC, d1);
                dotProd = dotProd + xValue * dyValue;
              } else {
                let dyValue = getDy(b, d2, yR, yC);
                let xValue = getX(b, d1, xR, xC);
                dotProd = dotProd + xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};let Conv3DDerFilterProgram=class Conv3DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.uniforms=`pads : vec3<i32>, strides : vec3<i32>, batchSize : i32, outDepth : i32,
       outHeight : i32, outWidth : i32, inDepth : i32, inHeight : i32, inWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.filterShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerFilter"}getUserCode(){return`
    ${getMainHeaderString("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wF = coords.x;
        let wR = coords.y;
        let wC = coords.z;
        let d1 = coords.w;
        let d2 = coords.u;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yF = 0; yF < uniforms.outDepth; yF++) {
            let xF = wF + yF * uniforms.strides[0] - uniforms.pads[0];
            if (xF < 0 || xF >= uniforms.inDepth) {
              continue;
            }

            for (var yR = 0; yR < uniforms.outHeight; yR++) {
              let xR = wR + yR * uniforms.strides[1] - uniforms.pads[1];
              if (xR < 0 || xR >= uniforms.inHeight) {
                continue;
              }

              for (var yC = 0; yC < uniforms.outWidth; yC++) {
                let xC = wC + yC * uniforms.strides[2] - uniforms.pads[2];
                if (xC < 0 || xC >= uniforms.inWidth) {
                  continue;
                }

                let dyValue = getDy(b, yF, yR, yC, d2);
                let xValue = getX(b, xF, xR, xC, d1);
                dotProd += xValue * dyValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};let Conv3DDerInputProgram=class Conv3DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.uniforms=`filterDims : vec3<i32>, pads : vec3<i32>, strides : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32, outChannels : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3DDerInput"}getUserCode(){return`
    ${getMainHeaderString("index")} {
      if(index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let d1 = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyFCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let dyF = f32(dyFCorner + wF) / f32(uniforms.strides[0]);
          if (dyF < 0.0 || dyF >= f32(uniforms.outDepth) || fract(dyF) > 0.0) {
            continue;
          }
          let idyF = i32(dyF);

          let wFPerm = uniforms.filterDims[0] - 1 - wF;

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            let wRPerm = uniforms.filterDims[1] - 1 - wR;

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let wCPerm = uniforms.filterDims[2] - 1 - wC;

              for (var d2 = 0; d2 < uniforms.outChannels; d2++) {
                let xValue = getDy(batch, idyF, idyR, idyC, d2);
                let wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
  `}};let tk={kernelName:f.wUP,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,dy:o}=t,{strides:s,pad:n,dataFormat:u,dimRoundingMode:l,filterShape:d}=i,p=f.backend_util.convertConv2DDataFormat(u),h=f.backend_util.computeConv2DInfo(a.shape,d,s,1,n,l,!1,p),c=new Conv2DDerFilterProgram(h),m=[{type:"int32",data:[h.padInfo.top,h.padInfo.left]},{type:"int32",data:[h.strideHeight,h.strideWidth]},{type:"int32",data:[h.batchSize]},{type:"int32",data:[h.outHeight]},{type:"int32",data:[h.outWidth]},{type:"int32",data:[h.inHeight]},{type:"int32",data:[h.inWidth]}];return r.runWebGPUProgram(c,[a,o],a.dtype,m)}};let Conv2DDerInputMMProgram=class Conv2DDerInputMMProgram{constructor(e){this.variableNames=["x","W"],this.uniforms="filterDims : vec2<i32>, pads : vec2<i32>, strides : vec2<i32>, outBackprop : vec4<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32,",this.outputShape=e.inShape,f.D5U.assert("channelsLast"===e.dataFormat,()=>"TODO: NCHW is unimplemented"),this.isVec4=e.inChannels%4==0&&e.outChannels%4==0,this.dispatchLayout={x:[3],y:[1,2],z:[0]},this.workgroupSize=computeWorkgroupSizeForConv2d(this.dispatchLayout,this.outputShape,this.isVec4),this.elementsPerThread=computeWorkPerThreadForConv2d(this.dispatchLayout,this.outputShape,this.isVec4),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,this.elementsPerThread),this.isVec4&&(this.outputComponent=4,this.variableComponents=[4,1]),this.shaderKey=`conv2DDerInputMM_${this.isVec4}_${this.elementsPerThread}`}getUserCode(){let e=this.isVec4?makeMatMulPackedVec4Source(this.elementsPerThread,this.workgroupSize):makeMatMulPackedSource(this.elementsPerThread,this.workgroupSize),t=`
    ${/**
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
 */function(e=4){let t=`
      let outRow = row / uniforms.outShape[2];
      let outCol = row % uniforms.outShape[2];

      let WRow = col / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
      let WCol = col / uniforms.outBackprop[3] % uniforms.filterDims[1];
      let xR = f32(outRow - uniforms.pads[0] + WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(uniforms.outBackprop[1]) || fract(xR) > 0.0) {
        return ${typeSnippet(e)}(0.0);
      }
      if (xC < 0.0 || xC >= f32(uniforms.outBackprop[2]) || fract(xC) > 0.0) {
        return ${typeSnippet(e)}(0.0);
      }
      let coord = vec4<i32>(
          batch,
          i32(xR),
          i32(xC),
          col % uniforms.outBackprop[3]);
      return x[getIndexFromCoords4D(coord, uniforms.xShape)/${e}];`,r=`if (row < uniforms.dimAOuter && col < uniforms.dimInner) {
        ${t}
      }
      return ${typeSnippet(e)}(0.0);`,i=`
  fn mm_readA(batch: i32, row : i32, col : i32) -> ${typeSnippet(e)} {
    ${r}
  }

  fn mm_readB(batch: i32, row : i32, col : i32) -> ${typeSnippet(e)} {
    let coordX = uniforms.filterDims.x - 1 -
        row / (uniforms.filterDims[1] * uniforms.outBackprop[3]);
    let coordY = uniforms.filterDims.y - 1 -
        (row / uniforms.outBackprop[3]) % uniforms.filterDims[1];
    if (row < uniforms.dimInner && col < uniforms.dimBOuter &&
        coordX >= 0 && coordY >= 0) {
      let rowInner = row % uniforms.outBackprop[3];
      let coord = vec4<i32>(coordX, coordY, col, rowInner);
      ${(e=>{switch(e){case 1:return"return W[getIndexFromCoords4D(coord, uniforms.wShape)];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = W[getIndexFromCoords4D(coord, uniforms.wShape)];
            let v1 = W[getIndexFromCoords4D(coord1, uniforms.wShape)];
            let v2 = W[getIndexFromCoords4D(coord2, uniforms.wShape)];
            let v3 = W[getIndexFromCoords4D(coord3, uniforms.wShape)];
            return vec4<f32>(v0, v1, v2, v3);
            `;default:throw Error(`innerElementSize ${e} is not supported.`)}})(e)}
    }
    return ${typeSnippet(e)}(0.0);
  }

  fn mm_write(batch: i32, row : i32, col : i32, valueInput : ${typeSnippet(e)}) {
    if (row < uniforms.dimAOuter && col < uniforms.dimBOuter) {
      var value = valueInput;
      let outCoord = vec4<i32>(
          batch,
          row / uniforms.outShape[2],
          row % uniforms.outShape[2],
          col);
      result[getIndexFromCoords4D(outCoord, uniforms.outShape)/${e}] = value;
    }
  }`;return i}(this.isVec4?4:1)}
    ${e}
    `;return t}};let tP={kernelName:f.wm,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{dy:o,filter:s}=r,{inputShape:n,strides:u,pad:l,dataFormat:d,dimRoundingMode:p}=a,h=f.backend_util.convertConv2DDataFormat(d),c=f.backend_util.computeConv2DInfo(n,s.shape,u,1,l,p,!1,h),m=[{type:"int32",data:[c.filterHeight,c.filterWidth]},{type:"int32",data:[c.filterHeight-1-c.padInfo.top,c.filterWidth-1-c.padInfo.left]},{type:"int32",data:[c.strideHeight,c.strideWidth]},{type:"int32",data:[c.batchSize,c.outHeight,c.outWidth,c.outChannels]}];if((0,f.OBj)().getBool("WEBGPU_USE_NAIVE_CONV2D_TRANSPOSE")||"channelsLast"!==c.dataFormat)t=new Conv2DDerInputProgram(c);else{t=new Conv2DDerInputMMProgram(c);let e=c.inHeight*c.inWidth,r=c.inChannels,i=c.filterHeight*c.filterWidth*c.outChannels;m.push({type:"uint32",data:[e]},{type:"uint32",data:[r]},{type:"uint32",data:[i]})}return i.runWebGPUProgram(t,[o,s],"float32",m)}};/**
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
 */let Conv3DNaiveProgram=class Conv3DNaiveProgram{constructor(e){this.variableNames=["x","W"],this.uniforms="filterDims: vec3<i32>, pads: vec3<i32>, strides: vec3<i32>, dilations: vec3<i32>,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="conv3dnaive"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords.x;
        let d2 = coords.u;

        let xFRCCorner = vec3<i32>(coords.y, coords.z, coords.w) * uniforms.strides - uniforms.pads;
        let xFCorner = xFRCCorner.x;
        let xRCorner = xFRCCorner.y;
        let xCCorner = xFRCCorner.z;

        let inputDepthNearestVec4 = (uniforms.xShape.u / 4) * 4;
        let inputDepthVec4Remainder = uniforms.xShape.u % 4;

        var dotProd = 0.0;
        for (var wF = 0; wF < uniforms.filterDims[0]; wF++) {
          let xF = xFCorner + wF * uniforms.dilations[0];
          if (xF < 0 || xF >= uniforms.xShape.y) {
            continue;
          }

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let xR = xRCorner + wR * uniforms.dilations[1];
            if (xR < 0 || xR >= uniforms.xShape.z) {
              continue;
            }

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let xC = xCCorner + wC * uniforms.dilations[2];
              if (xC < 0 || xC >= uniforms.xShape.w) {
                continue;
              }

              for (var d1 = 0; d1 < inputDepthNearestVec4; d1 += 4) {
                let xValues = vec4<f32>(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                let wValues = vec4<f32>(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (inputDepthVec4Remainder == 1) {
                dotProd += getX(batch, xF, xR, xC, inputDepthNearestVec4) *
                  getW(wF, wR, wC, inputDepthNearestVec4, d2);
              } else if (inputDepthVec4Remainder == 2) {
                let xValues = vec2<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1)
                );
                let wValues = vec2<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (inputDepthVec4Remainder == 3) {
                let xValues = vec3<f32>(
                  getX(batch, xF, xR, xC, inputDepthNearestVec4),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                  getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2)
                );
                let wValues = vec3<f32>(
                  getW(wF, wR, wC, inputDepthNearestVec4, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 1, d2),
                  getW(wF, wR, wC, inputDepthNearestVec4 + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }`;return e}};let tD={kernelName:f.x12,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,filter:o}=t,{strides:s,pad:n,dilations:u}=i,l=f.backend_util.computeConv3DInfo(a.shape,o.shape,s,u,n),d=[l.padInfo.front,l.padInfo.top,l.padInfo.left],p=[{type:"int32",data:[l.filterDepth,l.filterHeight,l.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.dilationDepth,l.dilationHeight,l.dilationWidth]}],h=new Conv3DNaiveProgram(l),c=(0,f.x8V)(a.dtype,o.dtype);return r.runWebGPUProgram(h,[a,o],c,p)}},tR={kernelName:f.o2y,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,dy:o}=t,{strides:s,pad:n,filterShape:u}=i,l=f.backend_util.computeConv3DInfo(a.shape,u,s,1,n),d=new Conv3DDerFilterProgram(l),p=[{type:"int32",data:[l.padInfo.front,l.padInfo.top,l.padInfo.left]},{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.batchSize]},{type:"int32",data:[l.outDepth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"int32",data:[l.inDepth]},{type:"int32",data:[l.inHeight]},{type:"int32",data:[l.inWidth]}];return r.runWebGPUProgram(d,[a,o],o.dtype,p)}},t$={kernelName:f.ik2,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,filter:o}=t,{strides:s,pad:n,inputShape:u}=i,l=f.backend_util.computeConv3DInfo(u,o.shape,s,1,n),d=new Conv3DDerInputProgram(l),p=[{type:"int32",data:[l.filterDepth,l.filterHeight,l.filterWidth]},{type:"int32",data:[l.filterDepth-1-l.padInfo.front,l.filterHeight-1-l.padInfo.top,l.filterWidth-1-l.padInfo.left]},{type:"int32",data:[l.strideDepth,l.strideHeight,l.strideWidth]},{type:"int32",data:[l.outDepth]},{type:"int32",data:[l.outHeight]},{type:"int32",data:[l.outWidth]},{type:"int32",data:[l.outChannels]}];return r.runWebGPUProgram(d,[a,o],a.dtype,p)}},tz=unaryKernelFunc({opType:h.COS}),tN={kernelName:f.mc4,backendName:"webgpu",kernelFunc:tz},tF=unaryKernelFunc({opType:h.COSH}),tA={kernelName:f.TR1,backendName:"webgpu",kernelFunc:tF};/**
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
 */let CropAndResizeProgram=class CropAndResizeProgram{constructor(e,t,r,i){this.variableNames=["Image","Boxes","BoxInd"],this.uniforms="extrapolationValue : f32,",this.workgroupSize=[64,1,1],this.size=!0;let[a]=t;this.outputShape=[a,r[0],r[1],e],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.methodId="bilinear"===i?1:0,this.cropHeightBiggerThan1=this.outputShape[1]>1,this.cropWidthBiggerThan1=this.outputShape[2]>1,this.shaderKey=`cropAndResize_${this.methodId}_${this.cropHeightBiggerThan1}_${this.cropWidthBiggerThan1}`}getUserCode(){let[e,t]=["f32(uniforms.imageShape[1] - 1)","f32(uniforms.imageShape[2] - 1)"],[r,i,a]=this.cropHeightBiggerThan1?[`(${e} / f32(uniforms.outShape[1] - 1))`,"(y2-y1) * height_ratio",`y1*${e} + f32(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${e}`],[o,s,n]=this.cropWidthBiggerThan1?[`(${t} / f32(uniforms.outShape[2] - 1))`,"(x2-x1) * width_ratio",`x1*${t} + f32(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${t}`],u=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let height_ratio = f32(${r});
        let width_ratio = f32(${o});
        let b = coords[0];
        let y = coords[1];
        let x = coords[2];
        let d = coords[3];
        // get box vals
        let y1 = getBoxes(b, 0);
        let x1 = getBoxes(b, 1);
        let y2 = getBoxes(b, 2);
        let x2 = getBoxes(b, 3);
        // get image in batch index
        let bInd = i32(round(getBoxInd(b)));
        if(bInd < 0 || bInd >= uniforms.outShape[0]) {
          return;
        }
        let height_scale = ${i};
        let width_scale = ${s};
        let in_y = ${a};
        if( in_y < 0.0 || in_y > ${e} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let in_x = ${n};
        if( in_x < 0.0 || in_x > ${t} ) {
          setOutputAtIndex(index, uniforms.extrapolationValue);
          return;
        }
        let sourceFracIndexCR = vec2<f32>(in_x,in_y);
        if(${this.methodId} == 1) {
          // Compute the four integer indices.
          let sourceFloorCR = vec2<i32>(sourceFracIndexCR);
          let sourceCeilCR = vec2<i32>(ceil(sourceFracIndexCR));
          let topLeft = getImage(bInd, sourceFloorCR.y, sourceFloorCR.x, d);
          let bottomLeft = getImage(bInd, sourceCeilCR.y, sourceFloorCR.x, d);
          let topRight = getImage(bInd, sourceFloorCR.y, sourceCeilCR.x, d);
          let bottomRight = getImage(bInd, sourceCeilCR.y, sourceCeilCR.x, d);
          let fracCR = sourceFracIndexCR - vec2<f32>(sourceFloorCR);
          let top = topLeft + (topRight - topLeft) * fracCR.x;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          let newValue = top + (bottom - top) * fracCR.y;
          setOutputAtIndex(index, newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          let sourceNearestCR = vec2<i32>(floor(
            sourceFracIndexCR + vec2<f32>(0.5,0.5)));
          let newValue = getImage(
            bInd, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutputAtIndex(index, newValue);
        }
      }
    }
    `;return u}};let tT={kernelName:f.VcC,backendName:"webgpu",kernelFunc:e=>{let{inputs:t,backend:r,attrs:i}=e,{image:a,boxes:o,boxInd:s}=t,{cropSize:n,method:u,extrapolationValue:l}=i,d=new CropAndResizeProgram(a.shape[3],o.shape,n,u),p=[{type:"float32",data:[l]}];return r.runWebGPUProgram(d,[a,o,s],"float32",p)}};(u=c||(c={})).Prod="*",u.Sum="+";let CumProgram=class CumProgram{constructor(e,t,r,i){this.variableNames=["x"],this.uniforms="index : f32,",this.size=!0,this.workgroupSize=[128,1,1],this.outputShape=t,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.exclusive=r,this.reverse=i,this.op=e,this.shaderKey=`cum_${this.op}_${this.exclusive}_${this.reverse}`}getUserCode(){let e=this.outputShape.length,t=this.op===c.Prod?"1.0":"0.0",r=this.exclusive?t:`getX(${cum_webgpu_getCoords(e,"coords",this.op)})`,i=this.outputShape[this.outputShape.length-1],a="",o="";return this.exclusive?(a=this.reverse?`end != ${i-1}`:"end != 0",o=this.reverse?"end + 1":"end - 1"):(a=this.reverse?`end + pow2 < ${i}`:"end >= pow2",o=this.reverse?"end + pow2":"end - pow2"),`
      ${getMainHeaderString("index")} {
       if (index < uniforms.size) {
         var coords = getCoordsFromIndex(index);

         let end = ${getFinalCoord(e,"coords",this.op)};
         var val = ${r};
         let pow2 = i32(pow(2.0, uniforms.index));
         if (${a}) {
           let idx = ${o};
           ${getFinalCoord(e,"coords",this.op)} = idx;
           val ${this.op}= getX(${cum_webgpu_getCoords(e,"coords",this.op)});
         }
         setOutputAtIndex(index, val);
       }
      }
    `}};function cum_webgpu_getCoords(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}function getFinalCoord(e,t,r){if(1===e)return`${t}`;if(2===e)return`${t}.y`;if(3===e)return`${t}.z`;if(4===e)return`${t}.w`;throw Error(`Cumulative ${r} for rank ${e} is not yet supported`)}/**
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
 */function cumImpl(e,t,r,i,a,o){let s=t.shape.length,n=f.backend_util.getAxesPermutation([i],s),u=t;null!=n&&(u=transpose({inputs:{x:t},backend:r,attrs:{perm:n}}));let l=f.backend_util.getInnerMostAxes(1,s)[0];if(l!==s-1)throw Error(`WebGPU cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${i}`);let d=u.shape[l],p=identity({inputs:{x:u},backend:r});for(let t=0;t<=Math.ceil(Math.log2(d))-1;t++){let i=new CumProgram(e,u.shape,!1,o),a=p,s=[{type:"float32",data:[t]}];p=r.runWebGPUProgram(i,[p],p.dtype,s),r.disposeData(a.dataId)}if(a){let t=new CumProgram(e,u.shape,a,o),i=p;p=r.runWebGPUProgram(t,[p],p.dtype,[{type:"float32",data:[0]}]),r.disposeData(i.dataId)}if(null!=n){let e=f.backend_util.getUndoAxesPermutation(n),t=transpose({inputs:{x:p},backend:r,attrs:{perm:e}});return r.disposeData(p.dataId),r.disposeData(u.dataId),t}return p}let tU={kernelName:f.Byc,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o,exclusive:s,reverse:n}=i;return cumImpl(c.Prod,a,r,o,s,n)}},tL={kernelName:f.iHb,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o,exclusive:s,reverse:n}=i;return cumImpl(c.Sum,a,r,o,s,n)}},t_={kernelName:f.QRR,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,weights:o}=t,{size:s,binaryOutput:n}=i,u=1===a.shape.length,l=f.D5U.sizeFromShape(o.shape),d=l>0,p=o.dtype,h=u?[a.shape[0]]:[a.shape[0],a.shape[1]],c=u?[s]:[a.shape[0],s],m=fill({backend:r,attrs:{shape:c,value:0,dtype:p}}),g=new BincountProgram(h,d,n),y=d?[a,o]:[a],x=r.runWebGPUProgram(g,y,p,[{type:"int32",data:[s]}],m);return x}};/**
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
 */let DepthToSpaceProgram=class DepthToSpaceProgram{constructor(e,t){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.uniforms="blockSize : i32,",this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`depthToSpace_${t}`,this.dataFormat=t}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let h = ${this.getHeightCoordString()};
          let w = ${this.getWidthCoordString()};
          let d = ${this.getDepthCoordString()};

          let in_h = h / uniforms.blockSize;
          let offset_h = h % uniforms.blockSize;
          let in_w = w / uniforms.blockSize;
          let offset_w = w % uniforms.blockSize;
          let offset_d = (offset_h * uniforms.blockSize + offset_w) *
            ${this.getOutputDepthSize()};
          let in_d = d + offset_d;

          let rlt = ${this.getInputSamplingString()};
          setOutputAtIndex(index, rlt);
        }
      }`;return e}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?"uniforms.outShape[3]":"uniforms.outShape[1]"}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};let tB={kernelName:f.T0n,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{blockSize:o,dataFormat:s}=i,n=a.shape[0],u="NHWC"===s?a.shape[1]:a.shape[2],l="NHWC"===s?a.shape[2]:a.shape[3],d="NHWC"===s?a.shape[3]:a.shape[1],p=u*o,h=l*o,c=d/(o*o),m="NHWC"===s?[n,p,h,c]:[n,c,p,h],f=[{type:"int32",data:[o]}],g=new DepthToSpaceProgram(m,s);return r.runWebGPUProgram(g,[a],a.dtype,f)}};/**
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
 */let DepthwiseConv2DNCHWSharedProgram=class DepthwiseConv2DNCHWSharedProgram{constructor(e,t,r,i=!1,a=null,o=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>,",this.workgroupSize=[16,16,1],this.outputShape=e,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),i&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),this.addBias=i,this.activation=a,this.hasPreluActivation=o,this.filterHeight=t,this.filterWidth=r,this.shaderKey=`depthwiseNCHW_${this.activation}_${this.filterHeight}_${this.filterWidth}`}getUserCode(){let e=this.filterWidth*this.filterHeight,t=this.workgroupSize[0]*this.workgroupSize[1]*this.workgroupSize[2],r=this.workgroupSize[1]+this.filterHeight-1,i=this.workgroupSize[0]+this.filterWidth-1,a=`
      ${activationFnSnippet(this.activation,this.hasPreluActivation,!1,4)}

      var<workgroup> mm_Asub : array<array<f32, ${i}>, ${r}>;
      var<workgroup> mm_Bsub : array<array<f32, ${this.filterWidth}>, ${this.filterHeight}>;
      fn readX(batch : i32, channel : i32, row : i32, col : i32) -> f32 {
        var value = 0.0;
        if (row >=0 && row < uniforms.inDims[0] && col >=0 && col < uniforms.inDims[1])
        {
          value = getX(batch, channel, row, col);
        }
        return value;
      }

      ${getMainHeaderString()} {
        let coords = getOutputCoords();
        let batch = coords[0];
        let xRCCorner = vec2<i32>(coords.zw) - uniforms.pads;
        let channelMul = uniforms.wShape[3];
        let d1 = coords[1] / channelMul;
        let q = coords[1] % channelMul;

        let inputRowStart = xRCCorner.x;
        let inputColStart = xRCCorner.y;

        let localRow = i32(localId.y);
        let localCol = i32(localId.x);

        // Load one tile of X into local memory.
        for (var inputRow = localRow; inputRow < ${r}; inputRow = inputRow + ${this.workgroupSize[1]}) {
          for (var inputCol = localCol; inputCol < ${i}; inputCol = inputCol + ${this.workgroupSize[0]}) {
            let rowOffset = inputRow - localRow;
            let colOffset = inputCol - localCol;
            mm_Asub[inputRow][inputCol] = readX(batch, d1, inputRowStart + rowOffset, inputColStart + colOffset);
          }
        }

        // Load one tile of W into local memory.
        var wIndex = i32(localIndex);
        ${e<t?`if (wIndex < ${e})`:`for(; wIndex < ${e}; wIndex = wIndex + ${t})`}

        {
          let wRow = wIndex / ${this.filterWidth};
          let wCol = wIndex % ${this.filterWidth};
          mm_Bsub[wRow][wCol] = getW(wRow, wCol, d1, q);
        }

        workgroupBarrier();

        var value = 0.0;
        for (var wR = 0; wR < ${this.filterHeight}; wR = wR + 1) {
          for (var wC = 0; wC < ${this.filterWidth}; wC = wC + 1) {
            let xVal = mm_Asub[localRow + wR][localCol + wC];
            let wVal = mm_Bsub[wR][wC];
            value = fma(xVal, wVal, value);
          }
        }
        ${biasActivationSnippet(this.addBias,this.activation)}
        if (coordsInBounds4D(coords, uniforms.outShape)) {
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `;return a}};/**
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
 */let DepthwiseConv2DVec4Program=class DepthwiseConv2DVec4Program{constructor(e,t=!1,r=null,i=!1){this.variableNames=["x","W"],this.uniforms="pads : vec2<i32>, inDims : vec2<i32>, virtualWidth : i32,",this.workgroupSize=[64,1,1],this.workPerThread=4,this.outputComponent=4,this.outputShape=e.outShape,this.virtualWidth=Math.ceil(this.outputShape[2]/this.workPerThread)*this.workPerThread;let a=[this.outputShape[0],this.outputShape[1],this.virtualWidth,this.outputShape[3]];this.dispatchLayout=flatDispatchLayout(a),this.dispatch=computeDispatch(this.dispatchLayout,a,this.workgroupSize,[this.outputComponent*this.workPerThread,1,1]),f.D5U.assert("channelsLast"===e.dataFormat,()=>"TODO: NCHW is unimplemented"),t&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.convInfo=e,this.addBias=t,this.activation=r,this.hasPreluActivation=i,this.shaderKey=`depthwiseVec4_${r}_${this.convInfo.filterHeight}_${this.convInfo.filterWidth}_${this.convInfo.strideHeight}_${this.convInfo.strideWidth}_${this.workPerThread}`}getUserCode(){let e=(this.workPerThread-1)*this.convInfo.strideWidth+this.convInfo.filterWidth,t=this.convInfo.strideHeight,r=this.convInfo.strideWidth,i=`
      ${activationFnSnippet(this.activation,this.hasPreluActivation,!0,4)}
      fn readX(batch : i32, row : i32, col : i32, channel : i32) -> vec4<f32> {
        var value = vec4<f32>(0.0);
        if (col >=0 && col < uniforms.inDims[1]) {
          value = getX(batch, row, col, channel);
        }
        return value;
      }

      ${getMainHeaderString("index")} {
        let width0 = uniforms.outShape[3] / ${this.outputComponent};
        let d1 = (index % width0) * ${this.outputComponent};
        var index1 = index / width0;
        let width1 = uniforms.virtualWidth / ${this.workPerThread};
        let c = (index1 % width1) * ${this.workPerThread};
        index1 = index1 / width1;
        let r = index1 % uniforms.outShape[1];
        let batch = index1 / uniforms.outShape[1];

        let xRCCorner = vec2<i32>(r, c) * vec2<i32>(${t}, ${r}) - uniforms.pads;

        let xRCorner = xRCCorner.x;
        let xCCorner = xRCCorner.y;
        var xVals : array<vec4<f32>, ${e}>;
        var dotProd : array<vec4<f32>, ${this.workPerThread}>;
        for (var i = 0; i < ${this.workPerThread}; i++) {
          dotProd[i] = vec4<f32>(0.0);
        }

        // Use constant instead of uniform can give better performance.
        for (var wR = 0; wR < ${this.convInfo.filterHeight}; wR = wR + 1) {
          let xR = xRCorner + wR;
          if (xR >=0 && xR < uniforms.inDims[0]) {
            for (var i = 0; i < ${e}; i++) {
              xVals[i] = readX(batch, xR, xCCorner + i, d1);
            }
            for (var wC = 0; wC < ${this.convInfo.filterWidth}; wC = wC + 1) {
              let wValue = getW(wR, wC, d1, 0);
              for (var i = 0; i < ${this.workPerThread}; i++) {
                dotProd[i] = fma(xVals[i * ${r} + wC], wValue, dotProd[i]);
              }
            }
          }
        }

        for (var i = 0; i < ${this.workPerThread}; i = i + 1) {
          let coords = vec4<i32>(batch, r, c + i, d1);
          if (coordsInBounds4D(coords, uniforms.outShape)) {
            var value = dotProd[i];
            ${biasActivationSnippet(this.addBias,this.activation)}
            setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
          }
        }
      }
    `;return i}};/**
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
 */let DepthwiseConv2DProgram=class DepthwiseConv2DProgram{constructor(e,t=!1,r=null,i=!1){this.variableNames=["x","W"],this.uniforms=`pads : vec2<i32>, inDims : vec2<i32>, filterHeight : i32,
      filterWidth : i32, strides : vec2<i32>, dilations : vec2<i32>,`,this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.isChannelsLast="channelsLast"===e.dataFormat,t&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.convInfo=e,this.addBias=t,this.activation=r,this.hasPreluActivation=i,this.shaderKey=`depthwise_${this.activation}_${this.isChannelsLast}`}getUserCode(){let e=this.isChannelsLast?"getX(batch, xR, xC, d1);":"getX(batch, d1, xR, xC);",t=`
      ${activationFnSnippet(this.activation,this.hasPreluActivation,!1,4)}

      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let batch = coords[0];
          let xRCCorner = vec2<i32>(coords.${this.isChannelsLast?"yz":"zw"}) * uniforms.strides - uniforms.pads;
          let d2 = coords[${this.isChannelsLast?3:1}];
          let channelMul = uniforms.wShape[3];
          let d1 = d2 / channelMul;
          let q = d2 % channelMul;

          let inputRowStart = xRCCorner.x;
          let inputColStart = xRCCorner.y;
          let inputRowEnd = inputRowStart + uniforms.filterHeight *
              uniforms.dilations[0];
          let inputColEnd = inputColStart + uniforms.filterWidth *
              uniforms.dilations[1];

          // Convolve x(?, ?, d1)|x(d1, ?, ?) with w(:, :, d1, q) to get
          // y(yR, yC, d2)|y(d2, yR, yC). ? = to be determined. : = across all
          // values in that axis. x(?, ?, d1) and y(yR, yC, d2) is for NHWC.
          // x(d1, ?, ?) and y(d2, yR, yC) is for NCHW.
          var value = 0.0;

          // Extract if checking out of for loop for performance.
          if (inputRowStart >= 0 && inputColStart >= 0 &&
            inputRowEnd < uniforms.inDims[0] &&
                inputColEnd < uniforms.inDims[1]) {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  let xVal = ${e};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            } else {
              for (var wR = 0; wR < uniforms.filterHeight; wR = wR + 1) {
                let xR = inputRowStart + wR * uniforms.dilations[0];

                if (xR < 0 || xR >= uniforms.inDims[0]) {
                  continue;
                }

                for (var wC = 0; wC < uniforms.filterWidth; wC = wC + 1) {
                  let xC = inputColStart + wC * uniforms.dilations[1];

                  if (xC < 0 || xC >= uniforms.inDims[1]) {
                    continue;
                  }

                  let xVal = ${e};
                  let wVal = getW(wR, wC, d1, q);
                  value = value + xVal * wVal;
                }
              }
            }
            ${biasActivationSnippet(this.addBias,this.activation)}
          setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
        }
      }
    `;return t}};let tO={kernelName:f.cie,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{x:o,filter:s}=r,{strides:n,pad:u,dataFormat:l,dilations:d,dimRoundingMode:p}=a,h=f.backend_util.convertConv2DDataFormat(l),c=d;null==c&&(c=[1,1]);let m=f.backend_util.computeConv2DInfo(o.shape,s.shape,n,c,u,p,!0,h),g=[{type:"int32",data:[m.padInfo.top,m.padInfo.left]},{type:"int32",data:[m.inHeight,m.inWidth]}],y="channelsLast"===m.dataFormat;return!y&&m.inHeight>16&&m.inWidth>16&&1===m.strideHeight&&1===m.strideWidth&&1===m.dilationWidth&&1===m.dilationHeight&&m.inChannels===m.outChannels?t=new DepthwiseConv2DNCHWSharedProgram(m.outShape,m.filterHeight,m.filterWidth):y&&m.outHeight>4&&m.outWidth>4&&m.strideWidth<=2&&m.inChannels===m.outChannels&&1===m.dilationHeight&&1===m.dilationWidth&&m.inChannels%4==0?(t=new DepthwiseConv2DVec4Program(m),g.push({type:"int32",data:[t.virtualWidth]})):(t=new DepthwiseConv2DProgram(m),g.push({type:"int32",data:[m.filterHeight]},{type:"int32",data:[m.filterWidth]},{type:"int32",data:[m.strideHeight,m.strideWidth]},{type:"int32",data:[m.dilationHeight,m.dilationWidth]})),i.runWebGPUProgram(t,[o,s],o.dtype,g)}};/**
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
 */let DepthwiseConv2DDerFilterProgram=class DepthwiseConv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>, outHeight : i32,
      outWidth : i32, inHeight : i32, inWidth : i32, batchSize : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.filterShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_filter"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let wR = coords[0];
        let wC = coords[1];
        let d1 = coords[2];
        let dm = coords[3];
        let d2 = d1 * uniforms.channelMul + dm;

        var dotProd = 0.0;
        for (var b = 0; b < uniforms.batchSize; b++) {
          for (var yR = 0; yR < uniforms.outHeight; yR++) {
            let xR = wR + yR * uniforms.strides[0] - uniforms.pads[0];

            if (xR < 0 || xR >= uniforms.inHeight) {
              continue;
            }

            for (var yC = 0; yC < uniforms.outWidth; yC++) {
              let xC = wC + yC * uniforms.strides[1] - uniforms.pads[1];

              if (xC < 0 || xC >= uniforms.inWidth) {
                continue;
              }

              let dyValue = getDy(b, yR, yC, d2);
              let xValue = getX(b, xR, xC, d1);
              dotProd += xValue * dyValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let DepthwiseConv2DDerInputProgram=class DepthwiseConv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32, channelMul : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="depthwise_conv2d_backprop_input"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d1 = coords[3];
        let dyCorner = coords.yz - uniforms.pads;
        let dyRCorner = dyCorner.x;
        let dyCCorner = dyCorner.y;

        var dotProd = 0.0;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }

          let idyR = i32(dyR);
          let wRPerm = uniforms.filterDims[0] - 1 - wR;

          for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }

            let idyC = i32(dyC);
            let wCPerm = uniforms.filterDims[1] - 1 - wC;

            for (var dm = 0; dm < uniforms.channelMul; dm++) {
              let d2 = d1 * uniforms.channelMul + dm;
              let xValue = getDy(batch, idyR, idyC, d2);
              let wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let tW={kernelName:f.sL$,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,dy:o}=t,{strides:s,dilations:n,pad:u,dimRoundingMode:l,filterShape:d}=i,p=f.backend_util.computeConv2DInfo(a.shape,d,s,n,u,l,!0),h=new DepthwiseConv2DDerFilterProgram(p),c=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.inHeight]},{type:"int32",data:[p.inWidth]},{type:"int32",data:[p.batchSize]},{type:"int32",data:[p.outChannels/p.inChannels]}];return r.runWebGPUProgram(h,[a,o],"float32",c)}},tM={kernelName:f.y7R,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,filter:o}=t,{strides:s,dilations:n,pad:u,dimRoundingMode:l,inputShape:d}=i,p=f.backend_util.computeConv2DInfo(d,o.shape,s,n,u,l,!0),h=new DepthwiseConv2DDerInputProgram(p),c=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.filterHeight-1-p.padInfo.top,p.filterWidth-1-p.padInfo.left]},{type:"int32",data:[p.filterHeight,p.filterWidth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]},{type:"int32",data:[p.outChannels/p.inChannels]}];return r.runWebGPUProgram(h,[a,o],a.dtype,c)}};/**
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
 */let DiagProgram=class DiagProgram{constructor(e){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e,e],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="diag"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let value = select(0.0, getX(coords[0]), coords[0] == coords[1]);
          setOutputAtIndex(index, value);
        }
      }
    `;return e}};let tE={kernelName:f.$w,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{x:i}=t,a=[...i.shape,...i.shape],o=f.D5U.sizeFromShape(i.shape),s=reshape({inputs:{x:i},backend:r,attrs:{shape:[o]}}),n=new DiagProgram(o),u=r.runWebGPUProgram(n,[s],s.dtype),l=reshape({inputs:{x:u},backend:r,attrs:{shape:a}});return r.disposeData(s.dataId),r.disposeData(u.dataId),l}};/**
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
 */let Dilation2DProgram=class Dilation2DProgram{constructor(e){this.variableNames=["x","w"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.outShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="dilation2d"}getUserCode(){let e=`
       ${getMainHeaderString("index")} {
         if (index < uniforms.size) {
           let neg_infinity = -3.4e38;
           let coords = getOutputCoords();
           let batch = coords.x;
           let d1 = coords.w;
           let outTopLeftCorner = coords.yz * uniforms.strides - uniforms.pads;
           let hBeg = outTopLeftCorner.x;
           let wBeg = outTopLeftCorner.y;

           var curVal = neg_infinity;
           for (var h = 0; h < uniforms.filterDims[0]; h = h + 1) {
             let hIn = hBeg + h * uniforms.dilations[0];

             if (hIn >= 0 && hIn < uniforms.xShape[1]) {
               for (var w = 0; w < uniforms.filterDims[1]; w = w + 1) {
                 let wIn = wBeg + w * uniforms.dilations[1];

                 if (wIn >= 0 && wIn < uniforms.xShape[2]) {
                   let val = getX(batch, hIn, wIn, d1) + getW(h, w, d1);
                   if (val > curVal) {
                     curVal = val;
                   }
                 }
               }
             }
           }

           setOutputAtIndex(index, curVal);
         }
       }
     `;return e}};let tV={kernelName:f.p4S,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,filter:o}=t,{strides:s,pad:n,dilations:u}=i,l=f.backend_util.computeDilation2DInfo(a.shape,o.shape,s,n,"NHWC",u),d=[l.padInfo.top,l.padInfo.left],p=[{type:"int32",data:[l.filterHeight,l.filterWidth]},{type:"int32",data:[...d]},{type:"int32",data:[l.strideHeight,l.strideWidth]},{type:"int32",data:[l.dilationHeight,l.dilationWidth]}],h=new Dilation2DProgram(l),c=r.runWebGPUProgram(h,[a,o],a.dtype,p);return c}};/**
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
 */let Dilation2DBackpropInputProgram=class Dilation2DBackpropInputProgram{constructor(e,t){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(e.outShape),this.dispatch=computeDispatch(this.dispatchLayout,e.outShape,this.workgroupSize),"float32"!==t&&"int32"!==t)throw Error(`Dilation2DBackpropInput only supports float32 and int32
          types, does not support ${t} type.`);this.type=t,this.shaderKey="dilation2DBackpropInput"}getUserCode(){let e=`
       ${getMainHeaderString("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var xRMax = 0;
           var xCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     xRMax = xR;
                     xCMax = xC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.xShape[3] *
               (xCMax + uniforms.xShape[2] * (xRMax + uniforms.xShape[1] * b));
           let value = getDy(b, r, c, d);
           ${atomicAddSnippet("&result[flatIndexIn]","value",this.type)}
         }
       }
     `;return e}};let Dilation2DBackpropFilterProgram=class Dilation2DBackpropFilterProgram{constructor(e,t,r){if(this.variableNames=["x","w","dy"],this.uniforms="filterDims: vec2<i32>, pads: vec2<i32>, strides: vec2<i32>, dilations: vec2<i32>, dySize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e.filterShape,this.dispatchLayout=flatDispatchLayout(e.outShape),this.dispatch=computeDispatch(this.dispatchLayout,e.outShape,this.workgroupSize),"float32"!==r&&"int32"!==r)throw Error(`Dilation2DBackpropFilter only supports float32 and int32
          types, does not support ${r} type.`);this.type=r,this.shaderKey="dilation2DBackpropFilter"}getUserCode(){let e=`
       ${getMainHeaderString("index")} {
         if (index < uniforms.dySize) {
           let coords = getDyCoordsFromIndex(index);
           let b = coords[0];
           let r = coords[1];
           let c = coords[2];
           let d = coords[3];

           let dyCorner = vec2<i32>(r, c) * uniforms.strides - uniforms.pads;
           var curVal = -3.4e38;  // neg_infinity
           var wRMax = 0;
           var wCMax = 0;

           // In the case of multiple argmax branches, we only back-propagate
           // along the last branch, i.e., the one with largest value of
           // 'wR * uniforms.filterDims[1] + wC', similarly to the max-pooling
           // backward routines.
           for (var wR = 0; wR < uniforms.filterDims[0]; wR++) {
             let xR = dyCorner.x + wR * uniforms.dilations[0];

             if (xR >= 0 && xR < uniforms.xShape[1]) {
               for (var wC = 0; wC < uniforms.filterDims[1]; wC++) {
                 let xC = dyCorner.y + wC * uniforms.dilations[1];

                 if (xC >= 0 && xC < uniforms.xShape[2]) {
                   let val = getX(b, xR, xC, d) + getW(wR, wC, d);
                   if (val > curVal) {
                     curVal = val;
                     wRMax = wR;
                     wCMax = wC;
                   }
                 }
               }
             }
           }

           let flatIndexIn = d + uniforms.wShape[2] * (wCMax + wRMax * uniforms.wShape[1]);
           let value = getDy(b, r, c, d);
           ${atomicAddSnippet("&result[flatIndexIn]","value",this.type)}
         }
       }
     `;return e}};let tH={kernelName:f.Vn9,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,filter:o,dy:s}=t,{strides:n,pad:u,dilations:l}=i,d=f.backend_util.computeDilation2DInfo(a.shape,o.shape,n,u,"NHWC",l),p=o.dtype,h=new Dilation2DBackpropFilterProgram(d,o.shape,p),c=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[f.D5U.sizeFromShape(d.outShape)]}],m=fill({backend:r,attrs:{shape:o.shape,value:0,dtype:p}});return r.runWebGPUProgram(h,[a,o,s],p,c,m)}},tG={kernelName:f.ekb,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,filter:o,dy:s}=t,{strides:n,pad:u,dilations:l}=i,d=f.backend_util.computeDilation2DInfo(a.shape,o.shape,n,u,"NHWC",l),p=a.dtype,h=new Dilation2DBackpropInputProgram(d,p),c=[{type:"int32",data:[d.filterHeight,d.filterWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[f.D5U.sizeFromShape(d.outShape)]}],m=fill({backend:r,attrs:{shape:d.inShape,value:0,dtype:p}});return r.runWebGPUProgram(h,[a,o,s],p,c,m)}};/**
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
 */let DrawProgram=class DrawProgram{constructor(e,t,r){this.variableNames=["Image"],this.uniforms="alpha: f32,",this.workgroupSize=[64,1,1],this.pixelsOpType=l.DRAW,this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.type=t,this.textureFormat=r,this.shaderKey=`draw_${t}_${r}`}getUserCode(){let e;let t="float32"===this.type?"value":"value / 255.0";e=`
      if (uniforms.numChannels == 1) {
        rgba[0] = ${t};
        rgba[1] = ${t};
        rgba[2] = ${t};
      } else {
        rgba[d] = ${t};
      }`;let r=`
       @group(0) @binding(0) var outImage : texture_storage_2d<${this.textureFormat}, write>;
       ${getMainHeaderString("index")} {
         if (index < uniforms.size) {
           var rgba = vec4<f32>(0.0, 0.0, 0.0, uniforms.alpha);
           for (var d = 0; d < uniforms.numChannels; d = d + 1) {
             let value = f32(inBuf[index * uniforms.numChannels + d]);
             ${e}
           }
           rgba.x = rgba.x * rgba.w;
           rgba.y = rgba.y * rgba.w;
           rgba.z = rgba.z * rgba.w;
           let coords = getCoordsFromIndex(index);
           textureStore(outImage, vec2<i32>(coords.yx), rgba);
         }
       }
      `;return r}};let tK={kernelName:f.hGc,backendName:"webgpu",kernelFunc:/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use backend file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{image:o}=r,{canvas:s,options:n}=a,[u,l]=o.shape.slice(0,2),{imageOptions:d}=n||{},p=(null==d?void 0:d.alpha)||1,h=i.device.features.has("bgra8unorm-storage")?"bgra8unorm":"rgba8unorm",c=[u,l],m=new DrawProgram(c,o.dtype,h);s.width=l,s.height=u;let f="webgpu",g=s.getContext(f);g||(g=(t=new OffscreenCanvas(l,u)).getContext(f));let y=3===o.shape.length?o.shape[2]:1;g.configure({device:i.device,format:h,usage:GPUTextureUsage.STORAGE_BINDING,alphaMode:"premultiplied"});let x="int32",b=i.makeTensorInfo(c,x),S=i.tensorMap.get(b.dataId);S.resource=g.getCurrentTexture(),S.external=!0;let w=[{type:"uint32",data:[y]},{type:"float32",data:[p]}];if(i.runWebGPUProgram(m,[o],x,w,b),t){let e=s.getContext("2d");if(!e)throw Error("Please make sure this canvas has only been used for 2d or webgpu context!");e.drawImage(t,0,0)}return i.disposeData(b.dataId),o}},tX=binaryKernelFunc({opType:p.MUL,cpuKernelImpl:ev,supportsComplex:!0}),tq={kernelName:f.wYn,backendName:"webgpu",kernelFunc:tX};/**
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
 */function sum(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o,keepDims:s}=i;return reduce(a,o,s,"sum",r)}let tY={kernelName:f.GBy,backendName:"webgpu",kernelFunc:sum},tj={kernelName:f.$g6,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{equation:a}=i,{allDims:o,summedDims:s,idDims:n}=f.backend_util.decodeEinsumEquation(a,t.length);f.backend_util.checkEinsumDimSizes(o.length,n,t);let{path:u,steps:l}=f.backend_util.getEinsumComputePath(s,n),d=l.length,p=null,h=o.length,c=[];for(let e=0;e<d;++e){for(let i of l[e]){let e;let{permutationIndices:a,expandDims:o}=f.backend_util.getEinsumPermutation(h,n[i]);f.backend_util.isIdentityPermutation(a)?e=t[i]:(e=transpose({inputs:{x:t[i]},backend:r,attrs:{perm:a}}),c.push(e));let s=e.shape.slice();for(let e=0;e<o.length;++e)s.splice(o[e],0,1);f.D5U.arraysEqual(e.shape,s)||(e=reshape({inputs:{x:e},backend:r,attrs:{shape:s}}),c.push(e)),null===p?p=e:(p=tX({inputs:{a:e,b:p},backend:r}),c.push(p))}e<d-1&&(u[e]>=0&&(p=sum({inputs:{x:p},backend:r,attrs:{axis:u[e]-(o.length-h),keepDims:!1}}),c.push(p)),h--)}for(let e of c)e!==p&&r.disposeData(e.dataId);return p}},tQ=unaryKernelFunc({opType:h.ELU}),tZ={kernelName:f.SX0,backendName:"webgpu",kernelFunc:tQ},tJ={kernelName:f.HEU,backendName:"webgpu",kernelFunc:e=>{let{inputs:t,backend:r}=e,{dy:i,y:a}=t,o=new BinaryOpProgram(p.ELU_DER,i.shape,a.shape);return r.runWebGPUProgram(o,[i,a],i.dtype)}},t2=binaryKernelFunc({opType:p.EQUAL,dtype:"bool",cpuKernelImpl:eu}),t3={kernelName:f.hdR,backendName:"webgpu",kernelFunc:t2},t0=unaryKernelFunc({opType:h.ERF}),t1={kernelName:f.Omj,backendName:"webgpu",kernelFunc:t0},t4=unaryKernelFunc({opType:h.EXP,cpuKernelImpl:el,dtype:"float32"}),t5={kernelName:f.NEP,backendName:"webgpu",kernelFunc:t4};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
 */function expandDims(e){let{inputs:t,attrs:r,backend:i}=e,{dim:a}=r,{input:o}=t,s=o.shape.length,n=o.shape.slice(),u=a;return a<0&&(f.D5U.assert(-(s+1)<=a,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+a+1),n.splice(u,0,1),reshape({inputs:{x:o},backend:i,attrs:{shape:n}})}let t6={kernelName:f.YFo,backendName:"webgpu",kernelFunc:expandDims},t8=unaryKernelFunc({opType:h.EXPM1,cpuKernelImpl:ed}),t7={kernelName:f.Y0y,backendName:"webgpu",kernelFunc:t8};/**
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
 */let FFTProgram=class FFTProgram{constructor(e,t){this.variableNames=["real","imag"],this.outputShape=[],this.uniforms="exponentMultiplier : f32, denominator: f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.component=e,this.shaderKey=`fft_${e}`}getUserCode(){let e="real"===this.component?"return real * expR - imag * expI;":"return real * expI + imag * expR;",t=`
    fn unaryOpComplex(real: f32, expR: f32, imag: f32, expI: f32) -> f32 {
      ${e}
    }

    fn mulMatDFT(batch: i32, index: i32) -> f32 {
      let indexRatio = f32(index) / f32(uniforms.realShape[1]);
      let exponentMultiplierTimesIndexRatio =
          uniforms.exponentMultiplier * indexRatio;

      var result = 0.0;

      for (var i = 0; i < uniforms.realShape[1]; i = i + 1) {
        // x = (-2|2 * PI / N) * index * i;
        let x = exponentMultiplierTimesIndexRatio * f32(i);
        let expR = cos(x);
        let expI = sin(x);
        let real = getReal(batch, i);
        let imag = getImag(batch, i);

        result = result +
            unaryOpComplex(real, expR, imag, expI) / uniforms.denominator;
      }

      return result;
    }

    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        setOutputAtIndex(index, mulMatDFT(coords[0], coords[1]));
      }
    }
  `;return t}};/**
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
 */function fftImpl(e,t,r){let i=r.tensorMap.get(e.dataId),a=f.D5U.sizeFromShape(e.shape),o=e.shape[e.shape.length-1],s=a/o,n=[],u=reshape({inputs:{x:e},backend:r,attrs:{shape:[s,o]}});n.push(u);let l=u.shape,d=new FFTProgram("real",l),p=new FFTProgram("imag",l),h=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:l},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:l}],c=t?l[1]:1,m=[{type:"float32",data:[t?2*Math.PI:-2*Math.PI]},{type:"float32",data:[c]}],g=r.runWebGPUProgram(d,h,"float32",m);n.push(g);let y=r.runWebGPUProgram(p,h,"float32",m);n.push(y);let x=complex({inputs:{real:g,imag:y},backend:r});n.push(x);let b=reshape({inputs:{x:x},backend:r,attrs:{shape:e.shape}});return n.forEach(e=>r.disposeData(e.dataId)),b}let t9={kernelName:f.vwp,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{input:i}=t;return fftImpl(i,!1,r)}};/**
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
 */let FlipLeftRightProgram=class FlipLeftRightProgram{constructor(e){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="flipLeftRight"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let coordX = uniforms.xShape[2] - coords[2] - 1;
          let outputValue = getX(coords[0], coords[1], coordX, coords[3]);
          setOutputAtIndex(index, outputValue);
        }
      }
    `;return e}};/**
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
 */let re={kernelName:f.Uyb,backendName:"webgpu",kernelFunc:({inputs:e,backend:t})=>{let{image:r}=e,i=new FlipLeftRightProgram(r.shape),a=t.runWebGPUProgram(i,[r],r.dtype);return a}},rt=unaryKernelFunc({opType:h.FLOOR,cpuKernelImpl:ep}),rr={kernelName:f.OR,backendName:"webgpu",kernelFunc:rt},ri=binaryKernelFunc({opType:p.FLOOR_DIV,cpuKernelImpl:eh,dtype:"int32"}),ra={kernelName:f.jeX,backendName:"webgpu",kernelFunc:ri};/**
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
 */let FromPixelsProgram=class FromPixelsProgram{constructor(e,t,r=!1){this.pixelsOpType=l.FROM_PIXELS,this.outputShape=[0],this.variableNames=[],this.workgroupSize=[256,1,1],this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[t,1,1]),this.importVideo=r,this.shaderKey=`fromPixels_${this.importVideo}`}getUserCode(){let e=this.importVideo?"textureLoad(src, vec2<i32>(coords.yx));":"textureLoad(src, vec2<i32>(coords.yx), 0)",t=this.importVideo?"texture_external":"texture_2d<f32>";return`
      @binding(1) @group(0) var src: ${t};
      ${getMainHeaderString("index")} {
        let flatIndex = index * uniforms.numChannels;
        if (flatIndex < uniforms.size) {
          let coords = getCoordsFromIndex(flatIndex);
          let values = ${e};
          for (var i = 0; i < uniforms.numChannels; i = i + 1) {
            result[flatIndex + i] = i32(floor(255.0 * values[i]));
          }
        }
      }
  `}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use backend file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ro={kernelName:f.eBW,backendName:"webgpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{pixels:o}=t,{numChannels:s}=a;if(null==o)throw Error("pixels passed to tf.browser.fromPixels() can not be null");let n="undefined"!=typeof HTMLVideoElement&&o instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&o instanceof HTMLImageElement,l="undefined"!=typeof HTMLCanvasElement&&o instanceof HTMLCanvasElement||"undefined"!=typeof OffscreenCanvas&&o instanceof OffscreenCanvas,d="undefined"!=typeof ImageBitmap&&o instanceof ImageBitmap,[p,h]=n?[o.videoWidth,o.videoHeight]:[o.width,o.height],c=[h,p,s],m=(0,f.OBj)().getBool("WEBGPU_IMPORT_EXTERNAL_TEXTURE")&&n,g=n||u;if(d||l||g){let e;if(m)e=r.device.importExternalTexture({source:o});else{if(g){let e=(0,f.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(null==i||e!==rs)&&(rs=e,i=document.createElement("canvas").getContext("2d",{willReadFrequently:rs})),i.canvas.width=p,i.canvas.height=h,i.drawImage(o,0,0,p,h),o=i.canvas}let t=GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,a=r.textureManager.acquireTexture(c[1],c[0],"rgba8unorm",t);r.queue.copyExternalImageToTexture({source:o},{texture:a},[c[1],c[0]]),e=a}let t=f.D5U.sizeFromShape(c),a=f.D5U.computeStrides(c),n=new FromPixelsProgram(c,s,m),u=[{type:"uint32",data:[t]},{type:"uint32",data:[s]},{type:"uint32",data:[...a]}],l=r.makeTensorInfo([h,p],"int32"),d=r.tensorMap.get(l.dataId);d.resource=e;let y=r.runWebGPUProgram(n,[l],"int32",u);return r.disposeData(l.dataId),y}let y=o.data,x=y;if(null!=s&&4!==s){x=new Uint8Array(o.width*o.height*s);let e=y.length,t=0;for(let r=0;r<e;r++)r%4<s&&(x[t++]=y[r])}let b=r.makeTensorInfo(c,"int32",new Int32Array(x));return r.uploadToGPU(b.dataId),b}},rs=(0,f.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");/**
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
 */let BatchNormProgram=class BatchNormProgram{constructor(e,t,r,i,a){this.uniforms="varianceEpsilon : f32,",this.workgroupSize=[128,1,1],this.size=!0,this.variableNames=["x","mean","variance"],f.backend_util.assertAndGetBroadcastShape(e,t),f.backend_util.assertAndGetBroadcastShape(e,r),this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),null!=i&&(f.backend_util.assertAndGetBroadcastShape(e,i),this.variableNames.push("offset")),null!=a&&(f.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("scale")),this.offsetShape=i,this.scaleShape=a,this.shaderKey="batchNorm"}getUserCode(){let e="0.0";null!=this.offsetShape&&(e="getOffsetByOutputIndex(index)");let t="1.0";null!=this.scaleShape&&(t="getScaleByOutputIndex(index)");let r=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size)
        {
          let xValue = getXByOutputIndex(index);
          let meanValue = getMeanByOutputIndex(index);
          let varianValue = getVarianceByOutputIndex(index);
          let offsetValue = ${e};
          let scaleValue = ${t};
          let inv = scaleValue * inverseSqrt(varianValue + f32(uniforms.varianceEpsilon));
          setOutputAtIndex(index,dot(vec3<f32>(xValue, -meanValue, offsetValue), vec3<f32>(inv, inv, 1.0)));
        }
      }
  `;return r}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let rn={kernelName:f.sHE,backendName:"webgpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:i,scale:a,offset:o,mean:s,variance:n}=e,{varianceEpsilon:u}=t,l=[i,s,n],d=null;null!=o&&(d=o.shape,l.push(o));let p=null;null!=a&&(p=a.shape,l.push(a));let h=new BatchNormProgram(i.shape,s.shape,n.shape,d,p),c=[{type:"float32",data:[u]}];return r.runWebGPUProgram(h,l,i.dtype,c)}},ru={kernelName:f._V0,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,filter:o,bias:s,preluActivationWeights:n}=t,{strides:u,pad:l,dataFormat:d,dilations:p,dimRoundingMode:h,activation:c,leakyreluAlpha:m}=i,g=f.backend_util.convertConv2DDataFormat(d),y=f.backend_util.computeConv2DInfo(a.shape,o.shape,u,p,l,h,!1,g);return conv2DImpl({x:a,filter:o,convInfo:y,backend:r,bias:s,preluActivationWeights:n,leakyreluAlpha:m,activation:c})}},rl={kernelName:f.luS,backendName:"webgpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{x:o,filter:s,bias:n,preluActivationWeights:u}=r,{strides:l,pad:d,dilations:p,dimRoundingMode:h,activation:c,leakyreluAlpha:m}=a,g=p;null==g&&(g=[1,1]),f.D5U.assert(f.backend_util.eitherStridesOrDilationsAreOne(l,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${g}'`);let y=f.backend_util.computeConv2DInfo(o.shape,s.shape,l,g,d,h,!0),x=[o,s],b=null!=n,S=null!=u;b&&x.push(n),S&&x.push(u);let w=[{type:"int32",data:[y.padInfo.top,y.padInfo.left]},{type:"int32",data:[y.inHeight,y.inWidth]}];y.outHeight>4&&y.outWidth>4&&y.strideWidth<=2&&y.inChannels===y.outChannels&&1===y.dilationHeight&&1===y.dilationWidth&&y.inChannels%4==0?(t=new DepthwiseConv2DVec4Program(y,b,c,S),w.push({type:"int32",data:[t.virtualWidth]})):(t=new DepthwiseConv2DProgram(y,b,c,S),w.push({type:"int32",data:[y.filterHeight]},{type:"int32",data:[y.filterWidth]},{type:"int32",data:[y.strideHeight,y.strideWidth]},{type:"int32",data:[y.dilationHeight,y.dilationWidth]})),"leakyrelu"===c&&(w.push({type:"float32",data:[m]}),t.uniforms+=" alpha : f32,");let C=i.runWebGPUProgram(t,x,"float32",w);return C}};/**
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
 */let GatherNDProgram=class GatherNDProgram{constructor(e,t){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey=`gathernd_${e}`,this.sliceDim=e,this.uniforms=`sliceDim : i32, strides : ${getCoordsDataType(e)},`}getUserCode(){let e;e=this.sliceDim>1?"uniforms.strides[j]":"uniforms.strides";let t=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          var flattenIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexTemp = i32(round(getIndices(coords[0], j)));
            let strideNum = ${e};
            flattenIndex = flattenIndex + indexTemp * strideNum;
          }

          setOutputAtIndex(index, getA(flattenIndex, coords[1]));
        }
      }
      `;return t}};let rd={kernelName:f.q1x,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{params:i,indices:a}=t,o=a.shape,s=o[o.length-1],n=f.D5U.sizeFromShape(i.shape),[u,l,d,p]=f.backend_util.prepareAndValidate(i,a),h=reshape({inputs:{x:a},backend:r,attrs:{shape:[l,s]}}),c=reshape({inputs:{x:i},backend:r,attrs:{shape:[f.D5U.sizeFromShape(i.shape)/d,d]}});if(r.shouldExecuteOnCPU([i,a])||"string"===i.dtype){let e=r.readSync(a.dataId),t=r.bufferSync(i),o=ec(e,t,i.dtype,l,s,d,p,i.shape,n);return r.makeTensorInfo(u,i.dtype,o.values)}let m=new GatherNDProgram(s,[l,d]),g=[{type:"int32",data:[s]},{type:"int32",data:p}],y=r.runWebGPUProgram(m,[c,h],c.dtype,g),x=reshape({inputs:{x:y},backend:r,attrs:{shape:u}});return r.disposeData(h.dataId),r.disposeData(c.dataId),r.disposeData(y.dataId),x}};/**
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
 */let GatherProgram=class GatherProgram{constructor(e,t){this.variableNames=["A","indices"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.slice(),this.aShape=e,this.outputShape=t,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="gather"}getUserCode(){let e=function(e){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],r=[];for(let i=0;i<e.length;i++)2===i?r.push("indexZ"):r.push(`${t[i]}`);return r.join()}(this.aShape),t=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let indexZ = i32(getIndices(resRC.x, resRC.z));
          let inBounds = select(0.0, 1.0, indexZ >= 0 && indexZ < uniforms.aShape[2]);
          setOutputAtIndex(index, inBounds * getA(${e}));
        }
      }
    `;return t}};/**
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
 */function gatherV2(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,indices:o}=t,{axis:s,batchDims:n}=i,u=f.D5U.parseAxisParam(s,a.shape)[0],l=f.backend_util.segment_util.collectGatherOpShapeInfo(a,o,u,n),d=f.D5U.sizeFromShape(o.shape),p=[],h=reshape({inputs:{x:a},backend:r,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),c=reshape({inputs:{x:o},backend:r,attrs:{shape:[l.batchSize,d/l.batchSize]}});p.push(h),p.push(c);let m=[l.batchSize,l.outerSize,d/l.batchSize,l.sliceSize];if(r.shouldExecuteOnCPU([a,o])){let e=r.tensorMap.get(c.dataId),t=e.values,i=(0,f.f3b)(c.shape,c.dtype,t),a=r.tensorMap.get(h.dataId),o=a.values,s=(0,f.f3b)(h.shape,h.dtype,o),n=em(s,i,m);return p.forEach(e=>r.disposeData(e.dataId)),r.makeTensorInfo(l.outputShape,n.dtype,n.values)}let g=new GatherProgram(h.shape,m),y=r.runWebGPUProgram(g,[h,c],h.dtype);p.push(y);let x=reshape({inputs:{x:y},backend:r,attrs:{shape:l.outputShape}});return p.forEach(e=>r.disposeData(e.dataId)),x}let rp={kernelName:f.qi_,backendName:"webgpu",kernelFunc:gatherV2},rh=binaryKernelFunc({opType:p.GREATER,cpuKernelImpl:eg,dtype:"bool"}),rc={kernelName:f.iZT,backendName:"webgpu",kernelFunc:rh},rm=binaryKernelFunc({opType:p.GREATER_EQUAL,dtype:"bool",cpuKernelImpl:ef}),rf={kernelName:f.Acj,backendName:"webgpu",kernelFunc:rm},rg={kernelName:f.Qg5,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{input:i}=t;return fftImpl(i,!0,r)}},ry=unaryKernelFunc({opType:h.IS_FINITE,dtype:"bool"}),rx={kernelName:f.avt,backendName:"webgpu",kernelFunc:ry},rb=unaryKernelFunc({opType:h.IS_INF,dtype:"bool"}),rS={kernelName:f.iWB,backendName:"webgpu",kernelFunc:rb},rw=unaryKernelFunc({opType:h.IS_NAN,dtype:"bool"}),rC={kernelName:f.r7n,backendName:"webgpu",kernelFunc:rw},rv={kernelName:f.J$2,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{alpha:o}=i,s=[{type:"float32",data:[o]}],n=new UnaryOpProgram(a.shape,h.LEAKYRELU,"alpha : f32,");return r.runWebGPUProgram(n,[a],"float32",s)}},rI=binaryKernelFunc({opType:p.LESS,dtype:"bool",cpuKernelImpl:ex}),rk={kernelName:f.vtC,backendName:"webgpu",kernelFunc:rI},rP=binaryKernelFunc({opType:p.LESS_EQUAL,dtype:"bool",cpuKernelImpl:ey}),rD={kernelName:f.CAk,backendName:"webgpu",kernelFunc:rP};/**
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
 */let LinSpaceProgram=class LinSpaceProgram{constructor(e){this.variableNames=[],this.outputShape=[],this.uniforms="start : f32, step : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="linSpace"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          setOutputAtIndex(index, uniforms.start + f32(index) * uniforms.step);
        }
      }
    `;return e}};let rR={kernelName:f.e7N,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{backend:t,attrs:r}=e,{start:i,stop:a,num:o}=r,s=(a-i)/(o-1),n=new LinSpaceProgram(o),u=[{type:"float32",data:[i]},{type:"float32",data:[s]}];return t.runWebGPUProgram(n,[],"float32",u)}},r$=unaryKernelFunc({opType:h.LOG,cpuKernelImpl:eb}),rz={kernelName:f.ZbH,backendName:"webgpu",kernelFunc:r$},rN=unaryKernelFunc({opType:h.LOG1P}),rF={kernelName:f.kU,backendName:"webgpu",kernelFunc:rN},rA=binaryKernelFunc({opType:p.LOGICAL_AND,dtype:"bool"}),rT={kernelName:f.PYm,backendName:"webgpu",kernelFunc:rA},rU=unaryKernelFunc({opType:h.LOGICAL_NOT}),rL={kernelName:f.VfG,backendName:"webgpu",kernelFunc:rU},r_=binaryKernelFunc({opType:p.LOGICAL_OR}),rB={kernelName:f.MZg,backendName:"webgpu",kernelFunc:r_},rO=`
  var powValue = 0.0;
  let basis = uniforms.bias + uniforms.alpha * sum;
  if (uniforms.beta == 0.5) {
    powValue = inverseSqrt(basis);
  } else if (uniforms.beta == 1.0) {
    powValue = 1.0 / basis;
  } else {
    powValue = exp(log(basis) * (-uniforms.beta));
  }
`;let LRNProgram=class LRNProgram{constructor(e){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];
        let d = coords[3];

        let x = getX(b, r, c, d);
        var sum = 0.0;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let idx = d + i;
          if (idx >= 0 && idx < uniforms.xShape[3]) {
            let z = getX(b, r, c, idx);
            sum = sum + z * z;
          }
        }
        ${rO}

        setOutputAtIndex(index, x * powValue);
      }
    }
  `;return e}};let LRNSharedProgram=class LRNSharedProgram{constructor(e,t){this.outputShape=[],this.variableNames=["x"],this.uniforms="radius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[256,1,1],this.maxAllowRadius=16,f.D5U.assert(t<=this.maxAllowRadius,()=>`Radius must be less than or equal to ${this.maxAllowRadius}, current radius is ${t}`),this.outputShape=e,this.elementsPerWorkgroup=this.workgroupSize[0]-2*this.maxAllowRadius,this.dispatchLayout={x:[3],y:[2],z:[0,1]},this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,[this.elementsPerWorkgroup,this.workgroupSize[1],this.workgroupSize[2]]),this.shaderKey="lrn_shared"}getUserCode(){let e=`
    var <workgroup>lrnSub: array<f32, ${this.workgroupSize[0]}>;
    const elementsPerWorkgroup = ${this.elementsPerWorkgroup};
    const maxAllowRadius = ${this.maxAllowRadius};

    ${getMainHeaderString()} {
      let localDepth = i32(localId.x);
      let workgroupDepth = i32(workgroupId.x) * elementsPerWorkgroup;
      let xDepth = workgroupDepth + localDepth - maxAllowRadius;
      let b = i32(globalId.z) / uniforms.xShape[1];
      let r = i32(globalId.z) - b * uniforms.xShape[1];
      let c = i32(globalId.y);
      let d = workgroupDepth + localDepth;

      var x = 0.0;
      if (xDepth >= 0 && xDepth < uniforms.xShape[3]) {
        x = getX(b, r, c, xDepth);
      }
      lrnSub[localDepth] = x;
      workgroupBarrier();

      if (localDepth < elementsPerWorkgroup && d < uniforms.outShape[3]) {
        var sum = 0.0;
        let index = localDepth + maxAllowRadius;
        for (var i = -uniforms.radius; i <= uniforms.radius; i = i + 1) {
          let z = lrnSub[index + i];
          sum = sum + z * z;
        }
        ${rO}

        setOutputAtCoords(b, r, c, d, lrnSub[index] * powValue);
      }
    } `;return e}};let rW={kernelName:f.eZ0,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{x:o}=r,{depthRadius:s,bias:n,alpha:u,beta:l}=a;t=s>16?new LRNProgram(o.shape):new LRNSharedProgram(o.shape,s);let d=[{type:"int32",data:[s]},{type:"float32",data:[n]},{type:"float32",data:[u]},{type:"float32",data:[l]}],p=i.runWebGPUProgram(t,[o],o.dtype,d);return p}};/**
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
 */let LRNGradProgram=class LRNGradProgram{constructor(e){this.outputShape=[],this.variableNames=["inputImage","outputImage","dy"],this.uniforms="depthRadius : i32, bias : f32, alpha : f32, beta : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="lrn_grad"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let b = coords[0];
        let r = coords[1];
        let c = coords[2];

        let MIN_DEPTH_BEGIN = 0;
        let MAX_DEPTH_END = uniforms.outShape[3];
        var result = 0.0;
        for (var d = MIN_DEPTH_BEGIN; d < MAX_DEPTH_END; d++) {
          let depthBegin = max(MIN_DEPTH_BEGIN, d - uniforms.depthRadius);
          let depthEnd = min(MAX_DEPTH_END, d + uniforms.depthRadius + 1);

          var norm = 0.0;
          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            } else {
              break;
            }
          }

          norm = uniforms.alpha * norm + uniforms.bias;

          for (var k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; k++) {
            if (k < depthBegin) {
              continue;
            } else if (k >= depthBegin && k < depthEnd) {
              var dyi = -2.0 * uniforms.alpha * uniforms.beta
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d) / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * uniforms.beta);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            } else {
              break;
            }
          }
        }

        setOutputAtIndex(index, result);
      }
    }
  `;return e}};let rM={kernelName:f.Hhh,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,y:o,dy:s}=t,{depthRadius:n,bias:u,alpha:l,beta:d}=i,p=new LRNGradProgram(a.shape),h=r.runWebGPUProgram(p,[a,o,s],a.dtype,[{type:"int32",data:[n]},{type:"float32",data:[u]},{type:"float32",data:[l]},{type:"float32",data:[d]}]);return h}},rE=binaryKernelFunc({opType:p.MAX,cpuKernelImpl:ew}),rV={kernelName:f.BMI,backendName:"webgpu",kernelFunc:rE},rH={kernelName:f.mTV,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{filterSize:o,strides:s,pad:n,dimRoundingMode:u}=i,l=f.backend_util.computePool2DInfo(a.shape,o,s,1,n,u);return poolImpl(a,l,"max",r)}},rG={kernelName:f.OAf,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{filterSize:o,strides:s,pad:n,dataFormat:u,dimRoundingMode:l}=i,d=f.backend_util.computePool3DInfo(a.shape,o,s,[1,1,1],n,l,u),p=new Pool3DProgram(d,"max"),h=[{type:"int32",data:[d.strideDepth,d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.front,d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.inDepth,d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth]}];return r.runWebGPUProgram(p,[a],a.dtype,h)}};/**
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
 */let MaxPool2DBackpropProgram=class MaxPool2DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec2<i32>, pads : vec2<i32>, dilations : vec2<i32>, filterDims : vec2<i32>,
       outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool2DBackprop"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords[0];
        let d = coords[3];

        let dyRCCorner = vec2<i32>(coords.yz) - uniforms.pads;
        let dyRCorner = dyRCCorner.x;
        let dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] - 1;
        for (var wR = 0; wR < uniforms.filterDims[0]; wR += uniforms.dilations[0]) {
          let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[0]);

          if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
            continue;
          }
          let idyR = i32(dyR);

          for (var wC = 0; wC < uniforms.filterDims[1]; wC += uniforms.dilations[1]) {
            let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[1]);

            if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
              continue;
            }
            let idyC = i32(dyC);

            let dyValue = getDy(batch, idyR, idyC, d);
            let maxPosValue = lastIndex - i32(getMaxPos(batch, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            let curPosValue = wR * uniforms.filterDims[1] + wC;
            let mask = select(0.0, 1.0, maxPosValue == curPosValue);
            dotProd += dyValue * mask;
          }
        }
        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let MaxPool3DBackpropProgram=class MaxPool3DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.uniforms=`strides : vec3<i32>, pads : vec3<i32>, filterDims : vec3<i32>,
      outDepth : i32, outHeight : i32, outWidth : i32`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e.inShape,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="maxPool3DBackprop"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
        let batch = coords.x;
        let ch = coords.u;

        let dyCorner = vec3<i32>(coords.y, coords.z, coords.w) - uniforms.pads;
        let dyDCorner = dyCorner.x;
        let dyRCorner = dyCorner.y;
        let dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        var dotProd = 0.0;
        let lastIndex = uniforms.filterDims[0] * uniforms.filterDims[1] * uniforms.filterDims[2] - 1;

        for (var wD = 0; wD < uniforms.filterDims[0]; wD++) {
          let dyD = f32(dyDCorner + wD) / f32(uniforms.strides[0]);

          if (dyD < 0.0 || dyD >= f32(uniforms.outDepth) || fract(dyD) > 0.0) {
            continue;
          }
          let idyD = i32(dyD);

          for (var wR = 0; wR < uniforms.filterDims[1]; wR++) {
            let dyR = f32(dyRCorner + wR) / f32(uniforms.strides[1]);

            if (dyR < 0.0 || dyR >= f32(uniforms.outHeight) || fract(dyR) > 0.0) {
              continue;
            }
            let idyR = i32(dyR);

            for (var wC = 0; wC < uniforms.filterDims[2]; wC++) {
              let dyC = f32(dyCCorner + wC) / f32(uniforms.strides[2]);

              if (dyC < 0.0 || dyC >= f32(uniforms.outWidth) || fract(dyC) > 0.0) {
                continue;
              }
              let idyC = i32(dyC);

              let dyValue = getDy(batch, idyD, idyR, idyC, ch);
              let maxPosValue = lastIndex - i32(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              let curPosValue = wD * uniforms.filterDims[1] * uniforms.filterDims[2] + wR * uniforms.filterDims[2] + wC;
              let mask = select(0.0, 1.0, maxPosValue == curPosValue);
              dotProd += dyValue * mask;
            }
          }
        }

        setOutputAtIndex(index, dotProd);
      }
    }
    `;return e}};let rK={kernelName:f.OU7,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,input:o}=t,{filterSize:s,strides:n,pad:u,dimRoundingMode:l}=i,d=f.backend_util.computePool3DInfo(o.shape,s,n,[1,1,1],u,l),p=new Pool3DProgram(d,"max",!0),h=[{type:"int32",data:[d.strideDepth,d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.front,d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.inDepth,d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth]}],c=r.runWebGPUProgram(p,[o],"int32",h),m=new MaxPool3DBackpropProgram(d);h=[{type:"int32",data:[d.strideDepth,d.strideHeight,d.strideWidth]},{type:"int32",data:[d.effectiveFilterDepth-1-d.padInfo.front,d.effectiveFilterHeight-1-d.padInfo.top,d.effectiveFilterWidth-1-d.padInfo.left]},{type:"int32",data:[d.effectiveFilterDepth,d.effectiveFilterHeight,d.effectiveFilterWidth]},{type:"int32",data:[d.outDepth]},{type:"int32",data:[d.outHeight]},{type:"int32",data:[d.outWidth]}];let g=r.runWebGPUProgram(m,[a,c],o.dtype,h);return r.disposeData(c.dataId),g}},rX={kernelName:f.OV7,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{dy:a,input:o,output:s}=t;assertNotComplex([o,s],"maxPoolGrad");let{filterSize:n,strides:u,pad:l,dimRoundingMode:d}=i,p=f.backend_util.computePool2DInfo(o.shape,n,u,1,l,d),h=new Pool2DProgram(p,"max",!0),c=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.padInfo.top,p.padInfo.left]},{type:"int32",data:[p.dilationHeight,p.dilationWidth]},{type:"int32",data:[p.inHeight,p.inWidth]},{type:"int32",data:[p.effectiveFilterHeight,p.effectiveFilterWidth]}],m=r.runWebGPUProgram(h,[o],"int32",c),g=new MaxPool2DBackpropProgram(p);c=[{type:"int32",data:[p.strideHeight,p.strideWidth]},{type:"int32",data:[p.effectiveFilterHeight-1-p.padInfo.top,p.effectiveFilterWidth-1-p.padInfo.left]},{type:"int32",data:[p.dilationHeight,p.dilationWidth]},{type:"int32",data:[p.effectiveFilterHeight,p.effectiveFilterWidth]},{type:"int32",data:[p.outHeight]},{type:"int32",data:[p.outWidth]}];let y=r.runWebGPUProgram(g,[a,m],o.dtype,c);return r.disposeData(m.dataId),y}},rq={kernelName:f.vFR,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{filterSize:a,strides:o,pad:s,includeBatchInIndex:n}=i,{x:u}=t;f.D5U.assert(4===u.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${u.shape.length}.`);let l=[1,1];f.D5U.assert(f.backend_util.eitherStridesOrDilationsAreOne(o,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '${l}'`);let d=f.backend_util.computePool2DInfo(u.shape,a,o,l,s),p=[{type:"int32",data:[d.strideHeight,d.strideWidth]},{type:"int32",data:[d.padInfo.top,d.padInfo.left]},{type:"int32",data:[d.dilationHeight,d.dilationWidth]},{type:"int32",data:[d.inHeight,d.inWidth]},{type:"int32",data:[d.effectiveFilterHeight,d.effectiveFilterWidth]}],h=new Pool2DProgram(d,"max",!1),c=r.runWebGPUProgram(h,[u],u.dtype,p);h=new Pool2DProgram(d,"max",!0,!0,n);let m=r.runWebGPUProgram(h,[u],"int32",p);return[c,m]}},rY={kernelName:f.c17,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o,keepDims:s}=i;return reduce(a,o,s,"min",r)}},rj=binaryKernelFunc({opType:p.MIN,cpuKernelImpl:eC}),rQ={kernelName:f.q8u,backendName:"webgpu",kernelFunc:rj};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MirrorPadProgram=class MirrorPadProgram{constructor(e,t,r){this.uniforms="",this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=e,t.map((e,t)=>{this.uniforms+=` pad${t} : vec2<i32>,`}),this.offset="reflect"===r?0:1,this.shaderKey=`mirrorPad_${r}`}getUserCode(){let e=this.xShape.length,t=this.xShape.map((e,t)=>`uniforms.pad${t}[0]`).join(","),r=this.xShape.map((t,r)=>`uniforms.pad${r}[0] + uniforms.xShape${e>1?`[${r}]`:""}`).join(","),i=1===e?"start":"start[i]",a=1===e?"end":"end[i]",o=1===e?"outC":"outC[i]",s=getCoordsDataType(e),n=e>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,e):"coords";return`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let start = ${s}(${t});
          let end = ${s}(${r});
          var outC = getCoordsFromIndex(index);
          for (var i = 0; i < ${e}; i = i + 1) {
            if (${o} < ${i}) {
              ${o} = ${i} * 2 - ${o} - ${this.offset};
            } else if(${o} >= ${a}) {
              ${o} = (${a} - 1) * 2 - ${o} + ${this.offset};
            }
          }
          let coords = outC - start;
          setOutputAtIndex(index, getX(${n}));
        }
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
 */let rZ={kernelName:f.jQs,backendName:"webgpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:i}=e,{paddings:a,mode:o}=t,s=a.map(e=>({type:"int32",data:[e[0],e[1]]})),n=new MirrorPadProgram(i.shape,a,o),u=r.runWebGPUProgram(n,[i],i.dtype,s);return u}},rJ=binaryKernelFunc({opType:p.MOD}),r2={kernelName:f.Vbg,backendName:"webgpu",kernelFunc:rJ};/**
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
 */let MultinomialProgram=class MultinomialProgram{constructor(e,t){this.variableNames=["probs"],this.outputShape=[],this.uniforms="seed : f32, numOutcomes: i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e,t],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="multinomial"}getUserCode(){let e=`
    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    fn random (seed : f32, resultUV : vec2<f32>) -> f32 {
      let HASHSCALE1 = 443.8975;
      let p = resultUV * seed;
      var p3  = fract(vec3<f32>(p.xyx) * HASHSCALE1);
      p3 = p3 + dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let coords = getOutputCoords();
        let batch = coords[0];

        let resUV = vec2<f32>(f32(coords[1]) / f32(uniforms.outShape[1]),
            f32(coords[0]) / f32(uniforms.outShape[0]));
        let r = random(uniforms.seed, resUV);
        var cdf = 0.0;
        for (var i = 0; i < uniforms.numOutcomes - 1; i = i + 1) {
          cdf = cdf + getProbs(batch, i);

          if (r < cdf) {
            setOutputAtIndexI32(index, i);
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutputAtIndexI32(index, uniforms.numOutcomes - 1);
      }
    }
  `;return e}};/**
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
 */let SoftmaxProgram=class SoftmaxProgram{constructor(e){this.variableNames=["logits"],this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=[this.outputShape[0],1,1],this.outputShape[1]>=4096?this.workgroupSize=[256,1,1]:this.workgroupSize=[64,1,1],this.shaderKey="softmax"}getUserCode(){let e=`
    var<workgroup> buf : array<f32, ${this.workgroupSize[0]}>;
    var<workgroup> rowMaxShared : f32;
    var<workgroup> rowSumShared : f32;
    const blockSize = ${this.workgroupSize[0]};
    ${getMainHeaderString("index")} {
      let row = index / blockSize;
      let tid = i32(localId.x);
      let cols = uniforms.outShape[1];

      var threadMax = -3.402823e+38f;
      for (var col = tid; col < cols; col += blockSize) {
        let value = getLogits(row, col);
        threadMax = max(threadMax, value);
      }
      if (tid < cols) {
        buf[tid] = threadMax;
      }
      workgroupBarrier();

      var reduceSize = min(cols, blockSize);
      for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
        reduceSize = currSize + (reduceSize & 1);
        if (tid < currSize) {
          buf[tid] = max(buf[tid], buf[tid + reduceSize]);
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowMaxShared = buf[0];
      }
      workgroupBarrier();

      var threadSum = 0.0;
      for (var col = tid; col < cols; col += blockSize) {
        let subExp = exp(getLogits(row, col) - rowMaxShared);
        threadSum += subExp;
      }
      buf[tid] = threadSum;
      workgroupBarrier();

      for (var currSize = blockSize >> 1;  currSize > 0; currSize = currSize >> 1) {
        if (tid < currSize) {
          buf[tid] = buf[tid] + buf[tid + currSize];
        }
        workgroupBarrier();
      }

      if (tid == 0) {
        rowSumShared = buf[0];
      }
      workgroupBarrier();

      for (var col = tid; col < cols; col += blockSize) {
        let value = exp(getLogits(row, col) - rowMaxShared) / rowSumShared;
        setOutputAtCoords(row, col, value);
      }
  }
    `;return e}};/**
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
 */function softmax(e){let{inputs:t,backend:r,attrs:i}=e,{logits:a}=t,{dim:o}=i,s=reshape({inputs:{x:a},backend:r,attrs:{shape:[f.D5U.sizeFromShape(a.shape)/a.shape[o],a.shape[o]]}}),n=new SoftmaxProgram(s.shape),u=r.runWebGPUProgram(n,[s],a.dtype),l=reshape({inputs:{x:u},backend:r,attrs:{shape:a.shape}});return r.disposeData(s.dataId),r.disposeData(u.dataId),l}let r3={kernelName:f.Gcp,backendName:"webgpu",kernelFunc:softmax},r0={kernelName:f.NZg,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{logits:a}=t,{numSamples:o,seed:s,normalized:n}=i,u=n?a:softmax({inputs:{logits:a},backend:r,attrs:{dim:a.shape.length-1}}),l=u.shape[0],d=u.shape[1],p=new MultinomialProgram(l,o),h=r.runWebGPUProgram(p,[u],"int32",[{type:"float32",data:[s]},{type:"int32",data:[d]}]);return n||r.disposeData(u.dataId),h}},r1={kernelName:f.kuV,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{x:i}=t;if(r.shouldExecuteOnCPU([i])){let e=r.tensorMap.get(i.dataId),[t,a]=eI(e.values,i.shape,i.dtype);return r.makeTensorInfo(a,i.dtype,t)}let a=new UnaryOpProgram(i.shape,h.NEG);return r.runWebGPUProgram(a,[i],i.dtype)}},r4={kernelName:f.uv1,backendName:"webgpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:i}=e,{boxes:a,scores:o}=t,{maxOutputSize:s,iouThreshold:n,scoreThreshold:u}=i,l=r.readSync(a.dataId),d=r.readSync(o.dataId),{selectedIndices:p}=f.GDt.nonMaxSuppressionV3Impl(l,d,s,n,u);return r.makeTensorInfo([p.length],"int32",new Int32Array(p))}},r5={kernelName:f.W0H,backendName:"webgpu",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){console.warn("tf.nonMaxSuppression() in webgpu locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:i}=e,{boxes:a,scores:o}=t,{maxOutputSize:s,iouThreshold:n,scoreThreshold:u,softNmsSigma:l}=i,d=r.readSync(a.dataId),p=r.readSync(o.dataId),{selectedIndices:h,selectedScores:c}=f.GDt.nonMaxSuppressionV5Impl(d,p,s,n,u,l);return[r.makeTensorInfo([h.length],"int32",new Int32Array(h)),r.makeTensorInfo([c.length],"float32",new Float32Array(c))]}};/**
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
 */let OneHotProgram=class OneHotProgram{constructor(e,t){this.variableNames=["x"],this.uniforms="onValue : f32, offValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e,t],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="onehot"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          setOutputAtIndex(index, mix(uniforms.offValue, uniforms.onValue,
                                      f32(i32(round(getX(coords.x))) == coords.y)));
        }
      }
    `;return e}};let r6={kernelName:f.we_,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{indices:a}=t,{dtype:o,depth:s,onValue:n,offValue:u}=i,l=f.D5U.sizeFromShape(a.shape),d=new OneHotProgram(l,s),p=reshape({inputs:{x:a},backend:r,attrs:{shape:[l]}}),h=r.runWebGPUProgram(d,[p],o,[{type:"float32",data:[n]},{type:"float32",data:[u]}]);r.disposeData(p.dataId);let c=[...a.shape,s],m=reshape({inputs:{x:h},backend:r,attrs:{shape:c}});return r.disposeData(h.dataId),m}};/**
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
 */function zerosLike(e){let{inputs:t,backend:r}=e,{x:i}=t;if("complex64"!==i.dtype)return fill({attrs:{shape:i.shape,dtype:i.dtype,value:"string"===i.dtype?"":0},backend:r});{let e=real({inputs:{input:i},backend:r}),t=zerosLike({inputs:{x:e},backend:r}),a=imag({inputs:{input:i},backend:r}),o=zerosLike({inputs:{x:a},backend:r}),s=complex({inputs:{real:t,imag:o},backend:r});return r.disposeData(e.dataId),r.disposeData(t.dataId),r.disposeData(a.dataId),r.disposeData(o.dataId),s}}let r8={kernelName:f.RuY,backendName:"webgpu",kernelFunc:zerosLike},r7={kernelName:f.qWM,backendName:"webgpu",kernelFunc:/**
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
 */function onesLike(e){let{inputs:t,backend:r}=e,{x:i}=t;if("string"===i.dtype)throw Error("onesLike is not supported under string dtype");if("complex64"!==i.dtype)return fill({attrs:{shape:i.shape,dtype:i.dtype,value:1},backend:r});{let e=real({inputs:{input:i},backend:r}),t=onesLike({inputs:{x:e},backend:r}),a=imag({inputs:{input:i},backend:r}),o=zerosLike({inputs:{x:a},backend:r}),s=complex({inputs:{real:t,imag:o},backend:r});return r.disposeData(e.dataId),r.disposeData(t.dataId),r.disposeData(a.dataId),r.disposeData(o.dataId),s}}},r9={kernelName:f.QiL,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{axis:a}=i;if(1===t.length)return expandDims({inputs:{input:t[0]},backend:r,attrs:{dim:a}});let o=t[0].shape,s=t[0].dtype;t.forEach(e=>{f.D5U.assertShapesMatch(o,e.shape,"All tensors passed to stack must have matching shapes"),f.D5U.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let n=[],u=t.map(e=>{let t=expandDims({inputs:{input:e},backend:r,attrs:{dim:a}});return n.push(t),t}),l=concat({inputs:u,backend:r,attrs:{axis:a}});return n.forEach(e=>r.disposeData(e.dataId)),l}};/**
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
 */function padCommon(e,t=!1){let r=e.length,i=getCoordsDataType(r),a=e.map((e,t)=>`uniforms.pad${t}[0]`).join(","),o=e.map((e,t)=>`uniforms.pad${t}[0] + uniforms.xShape${r>1?`[${t}]`:""}`).join(","),s=r>1?`${i}(${a})`:`${a}`,n=r>1?`${i}(${o})`:`${o}`,u=r>1?"any(paddedCoords < start)":"paddedCoords < start",l=r>1?"any(paddedCoords >= end)":"paddedCoords >= end",d=r>1?["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r):"coords";return`
        let start = ${s};
        let end = ${n};
        if (${u} || ${l}) {
          setOutputAtIndex(index, ${t?0:"uniforms.constantValue"});
        } else {
          let coords = paddedCoords - start;
          setOutputAtIndex(index, getX(${d}));
        }
  `}let PadProgram=class PadProgram{constructor(e,t){this.variableNames=["x"],this.uniforms="constantValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]),this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),t.map((e,t)=>{this.uniforms+=` pad${t} : vec2<i32>,`}),this.xShape=e,this.shaderKey="pad"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let paddedCoords = getCoordsFromIndex(index);
          ${padCommon(this.xShape)}
        }
      }
    `;return e}};let ie={kernelName:f.lyA,backendName:"webgpu",kernelFunc:e=>{let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{paddings:o,constantValue:s}=i;if(o.every(e=>f.D5U.arraysEqual(e,[0,0])))return identity({inputs:{x:a},backend:r});if(0===f.D5U.sizeFromShape(a.shape)){let e=o.map((e,t)=>e[0]+a.shape[t]+e[1]);return fill({backend:r,attrs:{shape:e,value:s,dtype:a.dtype}})}let n=[{type:"float32",data:[s]}];o.map(e=>n.push({type:"int32",data:[e[0],e[1]]}));let u=new PadProgram(a.shape,o);return r.runWebGPUProgram(u,[a],a.dtype,n)}},it=binaryKernelFunc({opType:p.POW}),ir={kernelName:f.pe_,backendName:"webgpu",kernelFunc:it},ii={kernelName:f.o0g,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{x:i,alpha:a}=t,o=new BinaryOpProgram(p.PRELU,i.shape,a.shape);return r.runWebGPUProgram(o,[i,a],"float32")}},ia={kernelName:f.DlI,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{axis:o,keepDims:s}=i;return reduce(a,o,s,"prod",r)}},io={kernelName:f.e6w,backendName:"webgpu",kernelFunc:e=>{let{backend:t,attrs:r}=e,{start:i,stop:a,step:o,dtype:s}=r,n=eD(i,a,o,s);return t.makeTensorInfo([n.length],s,n)}},is=binaryKernelFunc({opType:p.DIV}),iu={kernelName:f.oHH,backendName:"webgpu",kernelFunc:is},il=unaryKernelFunc({opType:h.RECIPROCAL}),id={kernelName:f.$HU,backendName:"webgpu",kernelFunc:il},ip=unaryKernelFunc({opType:h.RELU}),ih={kernelName:f.qkr,backendName:"webgpu",kernelFunc:ip},ic=unaryKernelFunc({opType:h.RELU6}),im={kernelName:f.SbG,backendName:"webgpu",kernelFunc:ic};/**
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
 */let ResizeBilinearProgram=class ResizeBilinearProgram{constructor(e,t,r){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, halfPixelCenters : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e[0],t,r,e[3]],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="resizeBilinear"}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
        let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC =
            (vec2<f32>(rc) + vec2<f32>(uniforms.halfPixelCenters)) *
            effectiveInputOverOutputRatioRC - vec2<f32>(uniforms.halfPixelCenters);

          // Compute the four integer indices.
          let sourceFloorRC = vec2<i32>(sourceFracIndexRC);
          let sourceCeilRC = vec2<i32>(
            min(vec2<f32>(uniforms.xShape.yz) - vec2<f32>(1.0), ceil(sourceFracIndexRC)));

          let topLeft = getX(b, sourceFloorRC.x, sourceFloorRC.y, d);
          let bottomLeft = getX(b, sourceCeilRC.x, sourceFloorRC.y, d);
          let topRight = getX(b, sourceFloorRC.x, sourceCeilRC.y, d);
          let bottomRight = getX(b, sourceCeilRC.x, sourceCeilRC.y, d);

          let fracRC = sourceFracIndexRC - vec2<f32>(sourceFloorRC);

          let top = topLeft + (topRight - topLeft) * fracRC.y;
          let bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
          let newValue = top + (bottom - top) * fracRC.x;

          setOutputAtIndex(index, newValue);
        }
      }
    `;return e}};let ig={kernelName:f._Yw,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{images:a}=t,{alignCorners:o,size:s,halfPixelCenters:n}=i,[u,l]=s,d=o&&u>1?1:0,p=o&&l>1?1:0,h=[{type:"float32",data:[d,p]},{type:"float32",data:[n?.5:0]}],c=new ResizeBilinearProgram(a.shape,u,l);return r.runWebGPUProgram(c,[a],"float32",h)}};/**
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
 */let ResizeBilinearBackpropProgram=class ResizeBilinearBackpropProgram{constructor(e,t){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, heightScale : f32, widthScale : f32,
       invHeightScale : f32, invWidthScale : f32, winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=t,this.shaderKey=`resizeBilinearBackprop_${t}`}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(startRLerp - f32(uniforms.winHeight / 2));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(startCLerp - f32(uniforms.winWidth / 2));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let dxR = f32(dyR) * uniforms.heightScale;
              let topDxRIndex = i32(floor(dxR));
              let bottomDxRIndex = i32(min(ceil(dxR), f32(uniforms.outShape[1] - 1)));
              let dxRLerp = dxR - f32(topDxRIndex);
              let inverseDxRLerp = 1.0 - dxRLerp;

              let dxC = f32(dyC) * uniforms.widthScale;
              let leftDxCIndex = i32(floor(dxC));
              let rightDxCIndex = i32(min(ceil(dxC), f32(uniforms.outShape[2] - 1)));
              let dxCLerp = dxC - f32(leftDxCIndex);
              let inverseDxCLerp = 1.0 - dxCLerp;

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

          setOutputAtIndex(index, accumulator);
        }
      }
    `;return e}};let iy={kernelName:f.zbQ,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{images:a,dy:o}=t,{alignCorners:s}=i,[,n,u]=a.shape,[,l,d]=o.shape,p=[s&&l>1?n-1:n,s&&d>1?u-1:u],h=[s&&l>1?l-1:l,s&&d>1?d-1:d],c=p[0]/h[0],m=p[1]/h[1],f=1/c,g=1/m,y=2*Math.ceil(f)+2,x=2*Math.ceil(g)+2,b=new ResizeBilinearBackpropProgram(a.shape,s),S=[{type:"int32",data:p},{type:"int32",data:h},{type:"float32",data:[c]},{type:"float32",data:[m]},{type:"float32",data:[f]},{type:"float32",data:[g]},{type:"int32",data:[y]},{type:"int32",data:[x]}];return r.runWebGPUProgram(b,[o],o.dtype,S)}};/**
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
 */let ResizeNearestNeighborProgram=class ResizeNearestNeighborProgram{constructor(e,t,r,i){this.variableNames=["x"],this.uniforms="adjustHeightWidth : vec2<f32>, roundBase : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=[e[0],t,r,e[3]],this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.halfPixelCenters=i,this.shaderKey=`resizeNearest_${i}`}getUserCode(){let e;e=this.halfPixelCenters?"max((vec2<f32>(rc) + vec2<f32>(0.5)) * effectiveInputOverOutputRatioRC, vec2<f32>(0.0))":"vec2<f32>(rc) * effectiveInputOverOutputRatioRC";let t=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let b = coords[0];
          let d = coords[3];
          let rc = coords.yz;

          let effectiveInSize = vec2<f32>(
            f32(uniforms.xShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.xShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveOutSize = vec2<f32>(
            f32(uniforms.outShape.y) - uniforms.adjustHeightWidth[0],
            f32(uniforms.outShape.z) - uniforms.adjustHeightWidth[1]);

          let effectiveInputOverOutputRatioRC =
              effectiveInSize / effectiveOutSize;

          // Fractional source index
          let sourceFracIndexRC = ${e};

          // Compute the coordinators of nearest neighbor point.
          let inputShapeRC = vec2<f32>(f32(uniforms.xShape.y), f32(uniforms.xShape.z));
          let sourceNearestRC = vec2<i32>(
            min(inputShapeRC - 1.0, floor(sourceFracIndexRC + uniforms.roundBase)));
          let newValue = getX(b, sourceNearestRC.x, sourceNearestRC.y, d);

          setOutputAtIndex(index, newValue);
        }
      }
    `;return t}};let ix={kernelName:f.dpD,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{images:a}=t,{alignCorners:o,halfPixelCenters:s,size:n}=i,[u,l]=n,d=o&&u>1?1:0,p=o&&l>1?1:0,h=[{type:"float32",data:[d,p]},{type:"float32",data:[o?.5:0]}],c=new ResizeNearestNeighborProgram(a.shape,u,l,s);return r.runWebGPUProgram(c,[a],a.dtype,h)}};/**
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
 */let ResizeNearestNeigborBackpropProgram=class ResizeNearestNeigborBackpropProgram{constructor(e,t){this.variableNames=["dy"],this.uniforms=`effectiveXSize : vec2<i32>, effectiveYSize : vec2<i32>, invHeightScale : f32, invWidthScale : f32,
       winHeight : i32, winWidth : i32,`,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.alignCorners=t,this.shaderKey=`resizeNearestNeigborBackprop_${t}`}getUserCode(){let e=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getOutputCoords();
          let b = coords[0];
          let d = coords[3];
          let r = coords[1];
          let c = coords[2];

          var accumulator = 0.0;

          // Compute bounds for where in dy we will look
          let startRLerp = floor(f32(r) * uniforms.invHeightScale);
          let startDyR = i32(floor(startRLerp - f32(uniforms.winHeight / 2)));

          let startCLerp = floor(f32(c) * uniforms.invWidthScale);
          let startDyC = i32(floor(startCLerp - f32(uniforms.winWidth / 2)));

          // Loop over dy
          for (var dyROffset = 0; dyROffset < uniforms.winHeight; dyROffset++) {
            let dyR = startDyR + dyROffset;

            // Guard against the window exceeding the bounds of dy
            if (dyR < 0 || dyR >= uniforms.dyShape[1]) {
              continue;
            }

            for (var dyCOffset = 0; dyCOffset < uniforms.winWidth; dyCOffset++) {
              let dyC = startDyC + dyCOffset;

              // Guard against the window exceeding the bounds of dy
              if (dyC < 0 || dyC >= uniforms.dyShape[2]) {
                continue;
              }

              let sourceFracRow = f32(uniforms.effectiveXSize[0]) *
                  (f32(dyR) / f32(uniforms.effectiveYSize[0]));

              let sourceFracCol = f32(uniforms.effectiveXSize[1]) *
                  (f32(dyC) / f32(uniforms.effectiveYSize[1]));

              let sourceNearestRow =
                  i32(min(f32(uniforms.outShape[1] - 1),
                  ${this.alignCorners?"floor(sourceFracRow + 0.5)":"floor(sourceFracRow)"}));

              let sourceNearestCol =
                  i32(min(f32(uniforms.outShape[2] - 1),
                  ${this.alignCorners?"floor(sourceFracCol + 0.5)":"floor(sourceFracCol)"}));

              if (r == sourceNearestRow && c == sourceNearestCol) {
                accumulator += getDy(b, dyR, dyC, d);
              }
            }
          }
          // End loop over dy

          setOutputAtIndex(index, accumulator);
        }
      }
    `;return e}};let ib={kernelName:f.Hmb,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{images:a,dy:o}=t,{alignCorners:s}=i,[,n,u]=a.shape,[,l,d]=o.shape,p=[s&&l>1?n-1:n,s&&d>1?u-1:u],h=[s&&l>1?l-1:l,s&&d>1?d-1:d],c=p[0]/h[0],m=p[1]/h[1],f=1/c,g=1/m,y=2*Math.ceil(f)+2,x=2*Math.ceil(g)+2,b=new ResizeNearestNeigborBackpropProgram(a.shape,s),S=[{type:"int32",data:p},{type:"int32",data:h},{type:"float32",data:[f]},{type:"float32",data:[g]},{type:"int32",data:[y]},{type:"int32",data:[x]}];return r.runWebGPUProgram(b,[o],o.dtype,S)}};/**
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
 */let ReverseProgram=class ReverseProgram{constructor(e){this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=" axis : vec4<i32>,",this.shaderKey="reverse"}getUserCode(){let e=`
      // Using uniform variables as judging conditions, so the function has
      // coherent execution within all threads.
      fn getReverseCoords(coords : vec4<i32>) -> vec4<i32> {
        var reverseCoords = coords;
        if (uniforms.axis[0] == 1) {
          reverseCoords[0] = uniforms.xShape[0] - coords[0] - 1;
        }
        if (uniforms.axis[1] == 1) {
          reverseCoords[1] = uniforms.xShape[1] - coords[1] - 1;
        }
        if (uniforms.axis[2] == 1) {
          reverseCoords[2] = uniforms.xShape[2] - coords[2] - 1;
        }
        if (uniforms.axis[3] == 1) {
          reverseCoords[3] = uniforms.xShape[3] - coords[3] - 1;
        }

        return reverseCoords;
      }
    `,t=`
      ${e}
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let reverseCoords = getReverseCoords(coords);
          setOutputAtIndex(index, getX(reverseCoords[0],
              reverseCoords[1], reverseCoords[2], reverseCoords[3]));
        }
      }
    `;return t}};let iS={kernelName:f.mKl,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{dims:o}=i,s=a.shape.length;if(0===s)return identity({inputs:{x:a},backend:r});let n=a.shape,u=[1,1,1,1];n.forEach((e,t)=>{u[t+4-s]=e});let l=f.D5U.parseAxisParam(o,a.shape),d=[0,0,0,0];l.forEach(e=>{d[e+4-s]=1});let p=[{type:"int32",data:d}],h=reshape({inputs:{x:a},backend:r,attrs:{shape:u}}),c=new ReverseProgram(u),m=r.runWebGPUProgram(c,[h],h.dtype,p);r.disposeData(h.dataId);let g=reshape({inputs:{x:m},backend:r,attrs:{shape:n}});return r.disposeData(m.dataId),g}};/**
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
 */let RotateProgram=class RotateProgram{constructor(e,t){this.outputShape=[],this.variableNames=["x"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`centerX : f32, centerY : f32, sinRadians : f32,
          cosRadians : f32,`,this.shaderKey="rotate",this.outputShape=e,"number"==typeof t?(this.uniforms+=" fillValue : f32,",this.fillSnippet="var outputValue = uniforms.fillValue;",this.shaderKey+="_float"):(this.uniforms+=" fillValue : vec3<f32>,",this.fillSnippet="var outputValue = uniforms.fillValue[coords[3]];",this.shaderKey+="_vec3")}getUserCode(){let e=`
        ${getMainHeaderString("index")} {
          if (index < uniforms.size) {
            let coords = getCoordsFromIndex(index);
            let coordXFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.cosRadians - (f32(coords[1]) - uniforms.centerY) *
                uniforms.sinRadians;
            let coordYFloat = (f32(coords[2]) - uniforms.centerX) *
                uniforms.sinRadians + (f32(coords[1]) - uniforms.centerY) *
                uniforms.cosRadians;
            let coordX = i32(round(coordXFloat + uniforms.centerX));
            let coordY = i32(round(coordYFloat + uniforms.centerY));
            ${this.fillSnippet}
            if(coordX >= 0 && coordX < uniforms.xShape[2] && coordY >= 0 &&
                coordY < uniforms.xShape[1]) {
              outputValue = getX(coords[0], coordY, coordX, coords[3]);
            }
            setOutputAtIndex(index, outputValue);
          }
        }
      `;return e}};/**
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
 */let iw={kernelName:f.b9H,backendName:"webgpu",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:i}=e,{radians:a,fillValue:o,center:s}=t,n=new RotateProgram(i.shape,o),[u,l]=f.backend_util.getImageCenter(s,i.shape[1],i.shape[2]),d=[{type:"float32",data:[u]},{type:"float32",data:[l]},{type:"float32",data:[Math.sin(a)]},{type:"float32",data:[Math.cos(a)]}];"number"==typeof o?d.push({type:"float32",data:[Number.parseFloat(o.toFixed(2))]}):d.push({type:"float32",data:o});let p=r.runWebGPUProgram(n,[i],i.dtype,d);return p}},iC=unaryKernelFunc({opType:h.ROUND}),iv={kernelName:f.e07,backendName:"webgpu",kernelFunc:iC},iI=unaryKernelFunc({opType:h.RSQRT,cpuKernelImpl:eR}),ik={kernelName:f.bV0,backendName:"webgpu",kernelFunc:iI};/**
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
 */let ScatterProgram=class ScatterProgram{constructor(e,t,r,i,a,o,s,n=!0){this.variableNames=["updates","indices"],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=o,this.type=s,this.sumDupeIndices=n,this.dispatchLayout=flatDispatchLayout(e),this.dispatch=computeDispatch(this.dispatchLayout,e,this.workgroupSize),this.sliceDimGreaterThanOne=t>1,this.shaderKey=`scatter_${r}_${i}_${this.sliceDimGreaterThanOne}_${s}_${n}_${a.length}`;let u=getCoordsDataType(a.length);this.uniforms=`sliceDim : i32, strides: ${u}, updatesSize: i32,`,this.updatesRank=i,this.indicesRank=r}getUserCode(){let e="";1===this.indicesRank?e="coords[0]":2===this.indicesRank&&(e="coords[0], j");let t=`getIndices(${e})`,r=this.sliceDimGreaterThanOne?"uniforms.strides[j]":"uniforms.strides",i="",a="";1===this.dispatchLayout.x.length?(i="flattenedIndex",a=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> i32 {
        return index;
      }
      `):2===this.dispatchLayout.x.length&&(i="vec2<i32>(flattenedIndex, coords[1])",a=`
      fn getUpdatesCoordsFromFlatIndex(index : i32) -> vec2<i32> {
        // N.B. |updates| could be a scalar tensor, conceptually representing a
        // 2D tensor with all values equal to that. By design, its size must be
        // the same as |outShape[1]| in one dimension, and |indicesShape[0]|
        // gives the other.
        let sliceSize = uniforms.outShape[1];
        let d0 = index / sliceSize;
        let d1 = index - d0 * sliceSize;
        return vec2<i32>(d0, d1);
      }
      `);let o=Array.from({length:this.updatesRank},(e,t)=>`coords[${t}]`),s=`getUpdates(${o.join(", ")})`,n=`
    ${a}
      ${getMainHeaderString("index")} {
        if (index < uniforms.updatesSize) {
          let coords = getUpdatesCoordsFromFlatIndex(index);
          var flattenedIndex = 0;
          for (var j = 0; j < uniforms.sliceDim; j = j + 1) {
            let indexInside = i32(round(${t}));
            flattenedIndex = flattenedIndex + indexInside * ${r};
          }
          let updateValue =
              ${dataTypeToGPUType(this.type)}(${s});
          let flatIndex = getOutputIndexFromCoords(${i});

          ${this.sumDupeIndices?atomicAddSnippet("&result[flatIndex]","updateValue",this.type):"atomicStore(&result[flatIndex], bitcast<i32>(updateValue));"}
        }
      }`;return n}};let iP={kernelName:f.xQA,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{indices:a,updates:o}=t,{shape:s}=i,{sliceRank:n,numUpdates:u,sliceSize:l,strides:d,outputSize:p}=f.backend_util.calculateShapes(o,a,s),h=[p/l,l];if(0===p)return r.makeTensorInfo(s,a.dtype);let c=reshape({inputs:{x:a},backend:r,attrs:{shape:[u,n]}}),m=reshape({inputs:{x:o},backend:r,attrs:{shape:[u,l]}}),g=m.dtype,y=fill({backend:r,attrs:{shape:h,value:0,dtype:g}}),x=f.D5U.sizeFromShape(m.shape),b=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[x]}],S=new ScatterProgram(m.shape,n,c.shape.length,m.shape.length,d,h,g),w=r.runWebGPUProgram(S,[m,c],g,b,y),C=reshape({inputs:{x:w},backend:r,attrs:{shape:s}});return r.disposeData(c.dataId),r.disposeData(m.dataId),r.disposeData(w.dataId),C}};/**
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
 */let SearchSortedProgram=class SearchSortedProgram{constructor(e,t){this.outputShape=[],this.variableNames=["sortedSequence","values"],this.uniforms="numInputs : i32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.side=t,this.shaderKey=`search_sorted_${t}`}getUserCode(){let e="left"===this.side?"<":"<=",t=`
      fn findBound(batch: i32, value: f32) -> i32 {
        var left = i32(0);
        var right = uniforms.numInputs;
        while (left < right) {
          var mid = (left + right) / 2;
          if (getSortedSequence(batch, mid) ${e} value) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return right;
      }

      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let value = getValuesByOutputIndex(index);
          setOutputAtIndexI32(index, findBound(coords[0], value));
        }
      }
    `;return t}};let iD={kernelName:f.nr8,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{sortedSequence:a,values:o}=t,{side:s}=i,n=new SearchSortedProgram([o.shape[0],o.shape[1]],s),u=[{type:"int32",data:[a.shape[1]]}];return r.runWebGPUProgram(n,[a,o],"int32",u)}};/**
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
 */let SelectProgram=class SelectProgram{constructor(e,t,r){this.variableNames=["c","a","b"],this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=t,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.cRank=e,this.rank=r,this.shaderKey="select"}getUserCode(){let e,t;if(this.rank>4)throw Error(`Where for rank ${this.rank} is not yet supported`);if(1===this.rank)t="resRC",e="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],a=[];for(let e=0;e<this.outputShape.length;e++)a.push(`${r[e]}`),e<this.cRank&&i.push(`${r[e]}`);e=i.join(),t=a.join()}let r=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          let cVal = getC(${e});
          if (cVal >= 1.0) {
            setOutputAtIndex(index, getA(${t}));
          } else {
            setOutputAtIndex(index, getB(${t}));
          }
        }
      }
    `;return r}};let iR={kernelName:f.PhF,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{condition:i,t:a,e:o}=t,s=new SelectProgram(i.shape.length,a.shape,a.shape.length);return r.runWebGPUProgram(s,[i,a,o],(0,f.x8V)(a.dtype,o.dtype))}},i$=unaryKernelFunc({opType:h.SELU}),iz={kernelName:f.oFR,backendName:"webgpu",kernelFunc:i$},iN=unaryKernelFunc({opType:h.SIGMOID}),iF={kernelName:f.a5O,backendName:"webgpu",kernelFunc:iN},iA=unaryKernelFunc({opType:h.SIGN}),iT={kernelName:f.i5y,backendName:"webgpu",kernelFunc:iA},iU=unaryKernelFunc({opType:h.SIN}),iL={kernelName:f.RQH,backendName:"webgpu",kernelFunc:iU},i_=unaryKernelFunc({opType:h.SINH}),iB={kernelName:f.wYB,backendName:"webgpu",kernelFunc:i_},iO=unaryKernelFunc({opType:h.SOFTPLUS}),iW={kernelName:f.MRv,backendName:"webgpu",kernelFunc:iO};/**
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
 */let SpaceToBatchNDProgram=class SpaceToBatchNDProgram{constructor(e,t,r,i,a,o){this.variableNames=["x"],this.outputShape=[],this.uniforms="",this.workgroupSize=[64,1,1],this.size=!0;let s=Array(i.length);for(let e=0;e<s.length;e++)s[e]=i[a[e]];this.outputShape=s,this.newDim=a,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.xShape=e,this.paddedXShape=t,this.uniforms+=`reshapedPaddedXShape : ${getCoordsDataType(i.length)}, paddedXShapeStrides : ${getCoordsDataType(o)}, `,r.map((e,t)=>{this.uniforms+=` pad${t} : vec2<i32>,`}),this.shaderKey=`spaceToBatchND_${a}`}getUserCode(){let e=getCoordsDataType(this.outputShape.length),t=getSwitchedCoords(this.newDim),r=`
      ${getCoordsFromIndexSnippet(this.paddedXShape,"PaddedX")}
      ${getMainHeaderString("index")} {
        if(index < uniforms.size) {
          let coords = getCoordsFromIndex(index);
          let switchedIndex = getIndexFromCoords${this.outputShape.length}D(${e}(${t}), uniforms.reshapedPaddedXShape);
          let paddedCoords = getPaddedXCoordsFromIndex(switchedIndex);
          ${padCommon(this.xShape,!0)}
        }
      }
    `;return r}};let iM={kernelName:f.TQc,backendName:"webgpu",kernelFunc:e=>{let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{blockShape:o,paddings:s}=i;f.D5U.assert(a.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGPU backend not implemented yet");let n=o.reduce((e,t)=>e*t),u=[[0,0]];u.push(...s);for(let e=1+o.length;e<a.shape.length;++e)u.push([0,0]);let l=u.map((e,t)=>e[0]+a.shape[t]+e[1]),d=f.backend_util.getReshaped(l,o,n,!1),p=f.backend_util.getPermuted(d.length,o.length,!1),h=f.backend_util.getReshapedPermuted(l,o,n,!1),c=f.D5U.computeStrides(l),m=new SpaceToBatchNDProgram(a.shape,l,u,d,p,c.length),g=[{type:"int32",data:d},{type:"int32",data:c}];u.map(e=>g.push({type:"int32",data:[e[0],e[1]]}));let y=r.runWebGPUProgram(m,[a],a.dtype,g),x=reshape({inputs:{x:y},backend:r,attrs:{shape:h}});return r.disposeData(y.dataId),x}};/**
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
 */let SparseSegmentSumProgram=class SparseSegmentSumProgram{constructor(e,t,r){this.variableNames=["input","indices","segmentIds"],this.outputShape=[],this.uniforms="segmentSize : i32, sparseSize : i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=e,this.type=r,this.dispatchLayout=flatDispatchLayout([t]),this.dispatch=computeDispatch(this.dispatchLayout,[t],this.workgroupSize),this.shaderKey="sparseSegmentSum"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.sparseSize) {
        let indexInSegmentIds = index / uniforms.segmentSize;
        let indexInSegment = index % uniforms.segmentSize;
        let indexInInput = indices[indexInSegmentIds];
        let segmentId = segmentIds[indexInSegmentIds];

        let value = input[indexInInput * uniforms.segmentSize + indexInSegment];
        let outIndex = segmentId * uniforms.segmentSize + indexInSegment;
        ${atomicAddSnippet("&result[outIndex]","value",this.type)}
      }
    }
  `;return e}};let SparseSegmentIdCountProgram=class SparseSegmentIdCountProgram{constructor(e,t){this.variableNames=["segmentIds"],this.outputShape=[],this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=[e],this.dispatchLayout=flatDispatchLayout(t),this.dispatch=computeDispatch(this.dispatchLayout,t,this.workgroupSize),this.shaderKey="sparseSegmentIdCountProgram"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.segmentIdsShape) {
        let segmentId = segmentIds[index];
        ${atomicAddSnippet("&result[segmentId]","1","int32")}
      }
    }
  `;return e}};let SparseSegmentMeanProgram=class SparseSegmentMeanProgram{constructor(e,t){this.variableNames=["segmentSum","sameSegmentIdCount"],this.outputShape=[],this.uniforms="segmentSize : i32",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.type=t,this.dispatchLayout=flatDispatchLayout(e),this.dispatch=computeDispatch(this.dispatchLayout,e,this.workgroupSize),this.shaderKey="sparseSegmentMean"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.size) {
        let segmentId = index / uniforms.segmentSize;
        let count = sameSegmentIdCount[segmentId];
        if (count != 0) {
          ${"float32"===this.type?"setOutputAtIndex(index, segmentSum[index] / f32(count));":"setOutputAtIndexI32(index, segmentSum[index] / count);"}
        }
      }
    }
  `;return e}};/**
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
 */function sparseSegmentReduce(e,t,r,i=!1,a){let o;let s=f.D5U.sizeFromShape(e.shape),n=s/e.shape[0],u=e.dtype,l=f.D5U.sizeFromShape(t.shape),d=a.readSync(r.dataId),p=l>0?d[l-1]+1:0,h=e.shape.slice();h[0]=p;let c=l*n,m=fill({backend:a,attrs:{shape:h,value:0,dtype:u}});o=new SparseSegmentSumProgram(h,c,u);let g=[{type:"int32",data:[n]},{type:"int32",data:[c]}],y=a.runWebGPUProgram(o,[e,t,r],u,g,m);if(i)return y;let x=fill({backend:a,attrs:{shape:[p],value:0,dtype:"int32"}});o=new SparseSegmentIdCountProgram(p,r.shape);let b=a.runWebGPUProgram(o,[r],"int32",null,x),S=fill({backend:a,attrs:{shape:h,value:0,dtype:u}});o=new SparseSegmentMeanProgram(h,u),g=[{type:"int32",data:[n]}];let w=a.runWebGPUProgram(o,[y,b],u,g,S);return a.disposeData(y.dataId),a.disposeData(b.dataId),w}let iE={kernelName:f.w3H,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:i,indices:a,segmentIds:o}=t;return sparseSegmentReduce(i,a,o,!1,r)}},iV={kernelName:f.ZjV,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:i,indices:a,segmentIds:o}=t;return sparseSegmentReduce(i,a,o,!0,r)}};/**
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
 */let TileProgram=class TileProgram{constructor(e,t){this.variableNames=["A"],this.workgroupSize=[64,1,1],this.size=!0;let r=Array(e.length);for(let i=0;i<r.length;i++)r[i]=e[i]*t[i];this.outputShape=r,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.rank=this.outputShape.length,this.shaderKey="tile"}getUserCode(){let e=function(e,t=""){if(e>=5)throw Error(`Tile for rank ${e} is not yet supported`);if(1===e)return`(resRC % ${t}aShape)`;let r=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[];for(let a=0;a<e;a++)i.push(`(${r[a]} % ${t}aShape[${a}])`);return i.join()}(this.rank,"uniforms."),t=`
      ${getMainHeaderString("index")} {
        if (index < uniforms.size) {
          let resRC = getCoordsFromIndex(index);
          setOutputAtIndex(index, getA(${e}));
        }
      }
    `;return t}};/**
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
 */function tile(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{reps:o}=i;if(r.shouldExecuteOnCPU([a])||"string"===a.dtype||a.shape.length>=5){let e=r.readSync(a.dataId),t="string"===a.dtype?e.map(e=>f.D5U.decodeString(e)):e,i=(0,f.f3b)(a.shape,a.dtype,t),s=eU(i,o);return r.makeTensorInfo(s.shape,s.dtype,s.values)}let s=new TileProgram(a.shape,o),n=r.runWebGPUProgram(s,[a],a.dtype);return n}let iH={kernelName:f.n9L,backendName:"webgpu",kernelFunc:tile},iG={kernelName:f.D2d,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{sparseIndices:a,sparseValues:o,defaultValue:s}=t,{outputShape:n}=i,{sliceRank:u,numUpdates:l,sliceSize:d,strides:p,outputSize:h}=f.backend_util.calculateShapes(o,a,n);if("string"===o.dtype){let e=r.bufferSync(a),t=r.bufferSync(o),i=f.D5U.decodeString(r.readSync(s.dataId)[0]),c=e$(e,t,n,h,d,l,u,p,i,!1);return r.makeTensorInfo(n,c.dtype,c.values)}let c=[h/d,d],m=reshape({inputs:{x:a},backend:r,attrs:{shape:[l,u]}}),g=o.shape.length?reshape({inputs:{x:o},backend:r,attrs:{shape:[l,d]}}):identity({inputs:{x:o},backend:r}),y=g.dtype,x=r.makeTensorInfo([],y,f.D5U.makeZerosTypedArray(1,y)),b=reshape({inputs:{x:s},backend:r,attrs:{shape:Array(c.length).fill(1)}}),S=tile({inputs:{x:b},backend:r,attrs:{reps:c}}),w=f.D5U.sizeFromShape([l,d]),C=[{type:"int32",data:[u]},{type:"int32",data:p},{type:"int32",data:[w]}];switch(l){case 0:break;case 1:{let e=new ScatterProgram([l,d],u,m.shape.length,g.shape.length,p,c,y,!1);r.runWebGPUProgram(e,[g,m],y,C,S)}break;default:{let e=new ScatterProgram([l,d],u,m.shape.length,x.shape.length,p,c,y,!1);r.runWebGPUProgram(e,[x,m],y,C,S)}{let e=new ScatterProgram([l,d],u,m.shape.length,g.shape.length,p,c,y);r.runWebGPUProgram(e,[g,m],y,C,S)}}let v=reshape({inputs:{x:S},backend:r,attrs:{shape:n}});return r.disposeData(m.dataId),r.disposeData(g.dataId),r.disposeData(b.dataId),r.disposeData(x.dataId),r.disposeData(S.dataId),v}},iK={kernelName:f.L8s,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{numOrSizeSplits:o,axis:s}=i,n=f.D5U.parseAxisParam(s,a.shape)[0],u=f.backend_util.prepareSplitSize(a,o,n),l=a.shape.length,d=Array(l).fill(0),p=a.shape.slice();return u.map(e=>{let t=[...p];t[n]=e;let i=slice({inputs:{x:a},backend:r,attrs:{begin:d,size:t}});return d[n]+=e,i})}},iX=unaryKernelFunc({opType:h.SQRT}),iq={kernelName:f.FKq,backendName:"webgpu",kernelFunc:iX},iY={kernelName:f.bK0,backendName:"webgpu",kernelFunc:({inputs:e,backend:t})=>{let{x:r}=e,i=new UnaryOpProgram(r.shape,h.SQUARE);return t.runWebGPUProgram(i,[r],r.dtype)}},ij=binaryKernelFunc({opType:p.SQUARED_DIFFERENCE}),iQ={kernelName:f._tC,backendName:"webgpu",kernelFunc:ij},iZ={kernelName:f.h8e,backendName:"webgpu",kernelFunc:/**
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
 */function({inputs:e,attrs:t,backend:r}){let{x:i}=e,a=new UnaryOpProgram(i.shape,h.STEP,"stepAlpha : f32,"),o=[{type:"float32",data:[t.alpha]}];return r.runWebGPUProgram(a,[i],i.dtype,o)}};/**
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
 */let StridedSliceProgram=class StridedSliceProgram{constructor(e){this.variableNames=["x"],this.workPerThread=1,this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize,[this.workPerThread,1,1]);let t=getCoordsDataType(this.outputShape.length);this.uniforms=`begin : ${t},  strides : ${t}, `,this.shaderKey="stridedSlice"}getUserCode(){let e=this.outputShape.length,t="";if(1===e)t="coords * uniforms.strides + uniforms.begin";else{let e=0;t=this.outputShape.map((t,r)=>(e++,1===this.outputShape.length?`coords * uniforms.strides[${r}] + uniforms.begin[${r}]`:`coords[${e-1}] * uniforms.strides[${r}] + uniforms.begin[${r}]`)).join(",")}let r=`
       ${getMainHeaderString("index")} {
         if (index < uniforms.size) {
           let coords = getCoordsFromIndex(index);
           setOutputAtIndex(index, getX(${t}));
         }
       }
     `;return r}};let iJ={kernelName:f.jQk,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{x:o}=r,{begin:s,end:n,strides:u,beginMask:l,endMask:d,ellipsisMask:p,newAxisMask:h,shrinkAxisMask:c}=a,{finalShapeSparse:m,finalShape:g,isIdentity:y,sliceDim0:x,isSimpleSlice:b,begin:S,end:w,strides:C}=f.kuN.sliceInfo(o.shape,s,n,u,l,d,p,h,c);if(y)t=reshape({inputs:{x:o},backend:i,attrs:{shape:g}});else if(x||b){f.D5U.assert(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);let e=f.kuN.computeOutShape(S,w,C),r=slice({inputs:{x:o},backend:i,attrs:{begin:S,size:e}});t=reshape({inputs:{x:r},backend:i,attrs:{shape:g}}),i.disposeData(r.dataId)}else{let e=i.shouldExecuteOnCPU([o]);if(e){let e=i.readSync(o.dataId),r=(0,f.f3b)(o.shape,o.dtype,e),a=eF(m,r,C,S);t=i.makeTensorInfo(g,o.dtype,a.values)}else{let e=new StridedSliceProgram(m),r=[{type:"int32",data:S},{type:"int32",data:C}],a=i.runWebGPUProgram(e,[o],o.dtype,r);t=reshape({inputs:{x:a},backend:i,attrs:{shape:g}}),i.disposeData(a.dataId)}}return t}},i2={kernelName:f._JP,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{separator:a,nGramWidths:o,leftPad:s,rightPad:n,padWidth:u,preserveShortSequences:l}=i,{data:d,dataSplits:p}=t,h=r.readSync(d.dataId),c=r.readSync(p.dataId),[m,f]=eA(h,c,a,o,s,n,u,l);return[r.makeTensorInfo([m.length],"string",m),r.makeTensorInfo(p.shape,"int32",f)]}},i3=binaryKernelFunc({opType:p.SUB,cpuKernelImpl:eT,supportsComplex:!0}),i0={kernelName:f.Tr8,backendName:"webgpu",kernelFunc:i3},i1=unaryKernelFunc({opType:h.TAN}),i4={kernelName:f.sEM,backendName:"webgpu",kernelFunc:i1},i5=unaryKernelFunc({opType:h.TANH}),i6={kernelName:f.MIZ,backendName:"webgpu",kernelFunc:i5},i8={kernelName:f.SIB,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{tensor:a,indices:o,updates:s}=t,{}=i,{sliceRank:n,numUpdates:u,sliceSize:l,strides:d,outputSize:p}=f.backend_util.calculateShapes(s,o,a.shape),h=[p/l,l];if(0===p)return r.makeTensorInfo(a.shape,o.dtype);let c=[],m=reshape({inputs:{x:o},backend:r,attrs:{shape:[u,n]}});c.push(m);let g=reshape({inputs:{x:s},backend:r,attrs:{shape:[u,l]}});c.push(g);let y=reshape({inputs:{x:a},backend:r,attrs:{shape:h}});c.push(y);let x=tile({inputs:{x:y},backend:r,attrs:{reps:Array(h.length).fill(1)}}),b=new ScatterProgram([u,l],n,m.shape.length,g.shape.length,d,h,a.dtype,!1),S=f.D5U.sizeFromShape([u,l]),w=[{type:"int32",data:[n]},{type:"int32",data:d},{type:"int32",data:[S]}],C=r.runWebGPUProgram(b,[g,m],y.dtype,w,x);c.push(C);let v=reshape({inputs:{x:C},backend:r,attrs:{shape:a.shape}});return c.forEach(e=>r.disposeData(e.dataId)),v}};/**
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
 */let SwapProgram=class SwapProgram{constructor(e){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms=`inputSize : i32, firstPass : i32, negativeInf : f32,
        dir : i32, inc : i32,`,this.shaderKey="swap"}getUserCode(){let e=`
        ${getMainHeaderString("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // We compare elements pair-wise within a group of size 2 * inc.
            // The comparing rule for each group alternates between ascending
            // and descending. Within each group, we compare each pair at
            // positions i and i+inc. To decide whether an element at position i
            // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
            // inc, it is in the first half of the group, we denote it as x0,
            // otherwise we denote it as x1.
            // For example, as shown in the Bitonic top K paper referenced
            // above, Figure5(a) shows that element[1] is in the second half of
            // the group when group size is 2, but it is in the first half of
            // the group when group size is 4.
            let isFirstInPair = elemIdx % (2 * uniforms.inc) < uniforms.inc;
            var i = 0;
            if (isFirstInPair) {
              i = elemIdx;
            } else {
              i = elemIdx - uniforms.inc;
            }

            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }

            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.inc;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.inc));
            }

            var x0 = f32(0.0);
            var x1 = f32(0.0);
            if (i0 < uniforms.inputSize) {
              x0 = getX(batch, i0);
            } else {
              x0 = uniforms.negativeInf;
            }
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = uniforms.negativeInf;
            }

            let reverse = elemIdx % (2 * uniforms.dir) >= uniforms.dir;
            let isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
            if (reverse == isGreater) {
              // Elements in opposite order of direction
              let iTemp = i0;
              i0 = i1;
              i1 = iTemp;
            }
            if (isFirstInPair) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `;return e}};let MergeProgram=class MergeProgram{constructor(e){this.variableNames=["x","indices"],this.workgroupSize=[256,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.uniforms="inputSize : i32, firstPass : i32, k : i32,",this.shaderKey="merge"}getUserCode(){let e=`
        ${getMainHeaderString("index")} {
          if (index < uniforms.size) {
            let outC = getCoordsFromIndex(index);
            let batch = outC[0];
            let elemIdx = outC[1];
            // The output size is half of the previous size.
            // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _
            // (k=4), we only need to output the indices at positions |, the
            // indices at positions _ can be thrown away, see Figure5(b) After
            // Phase 2 (Merge phase) in the Bitonic Top K paper referenced
            // above.
            // For example, the paper shows we only need to output the orange
            // bars. The output sequence should look like this | | | | | | | |.
            // Because the sequence is halved, to map the output index back to
            // the previous sequence to find the corresponding value, we need
            // to double the index. When we double the index, we basically
            // interpolate a position, so 2i looks like
            // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k
            // position of each 2k positions by - elemIdx % k. E.g. for output
            // at index 4,5,6,7, we want to get the corresponding element at
            // original index 8,9,10,11, for output at index 8,9,10,11,
            // we want to get the corresponding element at original index
            // 16,17,18,19, so on and so forth.

            var i = 0;
            if (elemIdx < uniforms.k) {
              i = elemIdx;
            } else {
              i = elemIdx * 2 - elemIdx % uniforms.k;
            }
            var i0 = 0;
            if (uniforms.firstPass == 1) {
              i0 = i;
            } else {
              i0 = i32(getIndices(batch, i));
            }
            var i1 = 0;
            if (uniforms.firstPass == 1) {
              i1 = i + uniforms.k;
            } else {
              i1 = i32(getIndices(batch, i + uniforms.k));
            }

            let x0 = getX(batch, i0);
            var x1 = f32(0.0);
            if (i1 < uniforms.inputSize) {
              x1 = getX(batch, i1);
            } else {
              x1 = x0;
            }

            if (x0 >= x1) {
              setOutputAtIndex(index, f32(i0));
            } else {
              setOutputAtIndex(index, f32(i1));
            }
          }
        }
      `;return e}};/**
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
 */function disposeIntermediateTensorInfoOrNull(e,t){null!==t&&e.disposeData(t.dataId)}function roundUpToPow2(e){let t=1;for(;t<e;)t*=2;return t}let i7={kernelName:f.cWu,backendName:"webgpu",kernelFunc:function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a}=t,{k:o,sorted:s}=i,n=a.shape,u=n[n.length-1];if(r.shouldExecuteOnCPU([a])){let e=r.readSync(a.dataId),[t,i]=eL(e,n,a.dtype,o,s);return[r.makeTensorInfo(t.shape,t.dtype,t.values),r.makeTensorInfo(i.shape,i.dtype,i.values)]}if(0===o)return n[n.length-1]=0,[r.makeTensorInfo(n,a.dtype,[]),r.makeTensorInfo(n,"int32",[])];if(1===u)return[a,fill({attrs:{shape:n,dtype:"int32",value:0},backend:r})];let l=f.D5U.sizeFromShape(n),d=l/u,p=reshape({inputs:{x:a},attrs:{shape:[d,u]},backend:r}),h=roundUpToPow2(o),c=roundUpToPow2(u),m=null,getInputs=()=>null===m?[p,p]:[p,m],runSwap=(e,t,i)=>{let a=getInputs(),o=new SwapProgram(i),s=null===m?1:0,n=[{type:"int32",data:[u]},{type:"int32",data:[s]},{type:"float32",data:[Number.NEGATIVE_INFINITY]},{type:"int32",data:[e]},{type:"int32",data:[t]}],l=m;m=r.runWebGPUProgram(o,a,"int32",n),disposeIntermediateTensorInfoOrNull(r,l)};for(let e=1;e<h;e*=2){let t=2*e;for(let r=e;r>=1;r/=2)runSwap(t,r,[d,c])}for(let e=c;e>h;e/=2){let t=getInputs(),i=new MergeProgram([d,e/2]),a=null===m?1:0,o=[{type:"int32",data:[u]},{type:"int32",data:[a]},{type:"int32",data:[h]}],s=m;m=r.runWebGPUProgram(i,t,"int32",o),disposeIntermediateTensorInfoOrNull(r,s);let n=h/2,l=2*n;for(let e=n;e>=1;e/=2)runSwap(l,e,m.shape)}let g=m;m=slice({inputs:{x:m},backend:r,attrs:{begin:0,size:[d,o]}}),disposeIntermediateTensorInfoOrNull(r,g);let y=gatherV2({inputs:{x:p,indices:m},backend:r,attrs:{axis:1,batchDims:1}});disposeIntermediateTensorInfoOrNull(r,p);let x=n.slice(0,-1);x.push(o),g=m,m=reshape({inputs:{x:m},attrs:{shape:x},backend:r}),disposeIntermediateTensorInfoOrNull(r,g);let b=y;return y=reshape({inputs:{x:y},attrs:{shape:x},backend:r}),disposeIntermediateTensorInfoOrNull(r,b),[y,m]}};/**
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
 */let TransformProgram=class TransformProgram{constructor(e){this.variableNames=["Image","Transforms"],this.uniforms="interpolationModeId : i32, fillModeId : i32, fillValue : f32,",this.workgroupSize=[64,1,1],this.size=!0,this.outputShape=e,this.dispatchLayout=flatDispatchLayout(this.outputShape),this.dispatch=computeDispatch(this.dispatchLayout,this.outputShape,this.workgroupSize),this.shaderKey="transform"}getUserCode(){let e=`
          fn mapCoord(outCoord : f32, len : f32) -> f32{
            var inCoord = outCoord;
            if(uniforms.fillModeId == 2) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  if (inCoord < sz2) {
                    inCoord = sz2 * f32(i32(f32(-inCoord / sz2))) +
                    inCoord;
                  }
                  if (inCoord < -len) {
                    inCoord = inCoord + sz2;
                  } else {
                    inCoord = -inCoord - 1.0;
                  }
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz2 = 2.0 * len;
                  inCoord = inCoord - sz2 * f32(i32(f32(inCoord / sz2)));
                  if (inCoord >= len) {
                    inCoord = sz2 - inCoord - 1.0;
                  }
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 3) {
              if (inCoord < 0.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord + len * (f32(i32(f32(-inCoord / sz))) + 1.0);
                }
              } else if (inCoord > len - 1.0) {
                if (len <= 1.0) {
                  inCoord = 0.0;
                } else {
                  let sz = len - 1.0;
                  inCoord = inCoord - len * f32(i32(f32(inCoord / sz)));
                }
              }
              return clamp(inCoord, 0.0, len - 1.0);
            } else if (uniforms.fillModeId == 4) {
              return clamp(outCoord, 0.0, len - 1.0);
            }
            return outCoord;
          }
          fn readWithFillValue(batch : i32, coordY : i32, coordX : i32,
            channel : i32) -> f32 {
            var outputValue : f32;
            if (0 <= coordY && coordY < uniforms.imageShape[1] && 0 <= coordX && coordX < uniforms.imageShape[2]) {
                outputValue = getImage(batch, coordY, coordX, channel);
            } else {
              outputValue = uniforms.fillValue;
            }
            return outputValue;
          }

          ${getMainHeaderString("index")} {
            if (index < uniforms.size) {
              let coords = getCoordsFromIndex(index);
              var outputValue : f32;
              let batch = coords[0];
              let x = coords[2];
              let y = coords[1];
              let channel = coords[3];
              let xf = f32(x);
              let yf = f32(y);
              let a1 = getTransforms(batch, 0);
              let a2 = getTransforms(batch, 1);
              let a3 = getTransforms(batch, 2);
              let b1 = getTransforms(batch, 3);
              let b2 = getTransforms(batch, 4);
              let b3 = getTransforms(batch, 5);
              let c1 = getTransforms(batch, 6);
              let c2 = getTransforms(batch, 7);
              let projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = uniforms.fillValue;
              } else {
                let inX = (a1 * xf + a2 * yf + a3) / projection;
                let inY = (b1 * xf + b2 * yf + b3) / projection;
                let mapX = mapCoord(inX, f32(uniforms.imageShape[2]));
                let mapY = mapCoord(inY, f32(uniforms.imageShape[1]));

                if (uniforms.interpolationModeId == 1) {
                  let coordY = i32(round(mapY));
                  let coordX = i32(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  let yFloor = floor(mapY);
                  let xFloor = floor(mapX);
                  let yCeil = yFloor + 1.0;
                  let xCeil = xFloor + 1.0;
                  let valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yFloor), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yFloor), i32(xCeil), channel);
                  let valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, i32(yCeil), i32(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, i32(yCeil), i32(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutputAtIndex(index, outputValue);
            }
          }
        `;return e}};let i9={kernelName:f.wx7,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let t;let{inputs:r,backend:i,attrs:a}=e,{image:o,transforms:s}=r,{interpolation:n,fillMode:u,fillValue:l,outputShape:d}=a,[p,h,c,m]=o.shape,[f,g]=null!=d?d:[h,c],y=new TransformProgram([p,f,g,m]);switch(u){case"constant":default:t=1;break;case"reflect":t=2;break;case"wrap":t=3;break;case"nearest":t=4}let x=[{type:"int32",data:["nearest"===n?1:2]},{type:"int32",data:[t]},{type:"float32",data:[l]}];return i.runWebGPUProgram(y,[o,s],"float32",x)}},ae={kernelName:f.ToN,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{value:a}=t,{axis:o}=i;o<0&&(o+=a.shape.length);let s=a.shape.length,n=a.shape[o],u=Array(s-1),l=0;for(let e=0;e<s;e++)e!==o&&(u[l++]=a.shape[e]);let d=[],p=Array(s).fill(0),h=a.shape.slice();h[o]=1;let c=Array(n);for(let e=0;e<c.length;e++){p[o]=e;let t=slice({inputs:{x:a},backend:r,attrs:{begin:p,size:h}}),i=reshape({inputs:{x:t},backend:r,attrs:{shape:u}});c[e]=i,d.push(t)}return d.forEach(e=>r.disposeData(e.dataId)),c}};/**
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
 */let UnsortedSegmentSumProgram=class UnsortedSegmentSumProgram{constructor(e,t,r){if(this.outputShape=[],this.variableNames=["x","segmentIds"],this.uniforms="numSegments : i32, xSize: i32,",this.workgroupSize=[64,1,1],this.atomic=!0,this.outputShape=t,this.dispatchLayout=flatDispatchLayout(e),this.dispatch=computeDispatch(this.dispatchLayout,e,this.workgroupSize),"float32"!==r&&"int32"!==r)throw Error(`UnsortedSegmentSum only supports float32 and int32
              types, does not support ${r} type.`);this.type=r,this.shaderKey="unsortedSegmentSum"}getUserCode(){let e=`
    ${getMainHeaderString("index")} {
      if (index < uniforms.xSize) {
        let coords = getXCoordsFromIndex(index);
        let b = coords[0];
        let inCol = coords[1];

        let segmentId = i32(getSegmentIds(inCol));
        if (segmentId >= 0) {
          let flatIndex = b * uniforms.numSegments + segmentId % uniforms.numSegments;
          let value = getX(b, inCol);

          ${atomicAddSnippet("&result[flatIndex]","value",this.type)}
        }
      }
    }
  `;return e}};let at={kernelName:f.Qvg,backendName:"webgpu",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:i}=e,{x:a,segmentIds:o}=t,{numSegments:s}=i,n=a.shape.length,u=[],l=0,d=f.backend_util.getAxesPermutation([l],n),p=a;null!=d&&(p=transpose({inputs:{x:a},backend:r,attrs:{perm:d}}),u.push(p),l=f.backend_util.getInnerMostAxes(1,n)[0]);let h=f.backend_util.segment_util.computeOutShape(p.shape,l,s),c=f.D5U.sizeFromShape([p.shape[l]]),m=reshape({inputs:{x:p},backend:r,attrs:{shape:[-1,c]}});u.push(m);let g=a.dtype,y=[m.shape[0],s],x=fill({backend:r,attrs:{shape:y,value:0,dtype:g}}),b=new UnsortedSegmentSumProgram(m.shape,y,g),S=[{type:"int32",data:[s]},{type:"int32",data:[f.D5U.sizeFromShape(m.shape)]}],w=r.runWebGPUProgram(b,[m,o],g,S,x),C=reshape({inputs:{x:w},backend:r,attrs:{shape:h}});u.push(w);let v=C;if(null!=d){u.push(C);let e=f.backend_util.getUndoAxesPermutation(d);v=transpose({inputs:{x:v},backend:r,attrs:{perm:e}})}return u.forEach(e=>r.disposeData(e.dataId)),v}};for(let e of[ee,eW,eE,eH,eK,eX,ej,eQ,eZ,eJ,e3,e1,e5,e8,e9,tr,ti,ta,to,ts,tl,th,tc,ty,tb,tS,er,tw,tv,tI,tk,tP,tD,tR,t$,tN,tA,tT,tU,tL,t_,tB,tW,tM,tO,tE,tV,tH,tG,tK,tj,tZ,tJ,t3,t1,t5,t6,t7,t9,Z,re,ro,rr,ra,rn,ru,rl,rd,rp,rc,rf,et,rg,tC,rx,rS,rC,rv,rk,rD,rR,rF,rz,rT,rL,rB,rW,rM,te,rV,rH,rX,rG,rK,rq,tt,rY,rQ,rZ,r2,r0,tq,r1,r4,r5,tf,r6,r7,r9,ie,ir,ii,ia,io,tg,iu,id,ih,im,J,ig,iy,ix,ib,iS,iw,iv,ik,iP,iD,iR,iz,iF,iT,iL,iB,tu,iZ,iJ,i2,r3,iW,iM,iE,iV,iG,iK,iq,iY,iQ,i0,tY,i4,i6,i8,iH,i7,i9,eq,ae,at,r8])(0,f.wCN)(e);/**
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
 */}}]);
//# sourceMappingURL=726.33386206929ecf4c.js.map