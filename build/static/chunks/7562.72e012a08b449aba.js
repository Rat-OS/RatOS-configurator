"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7562],{20540:function(e,t,r){r.d(t,{jl:function(){return function getWebGLContext(e,t){if(!(e in n)||null!=t){let r=function(e,t){if(1!==e&&2!==e)throw Error("Cannot get WebGL rendering context, WebGL is disabled.");let r=null==t?function(e){if(!(0,a.OBj)().getBool("IS_SAFARI")&&"undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw Error("Cannot create a canvas in this context")}(e):t;return(r.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete n[e]},!1),(0,a.OBj)().getBool("SOFTWARE_WEBGL_ENABLED")&&(o.failIfMajorPerformanceCaveat=!1),1===e)?r.getContext("webgl",o)||r.getContext("experimental-webgl",o):r.getContext("webgl2",o)}(e,t);if(null===r)return console.log("Could not get context for WebGL version",e),null;n[e]=r}let r=n[e];return null==r||r.isContextLost()?(delete n[e],getWebGLContext(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),n[e])}},nd:function(){return setWebGLContext}});var a=r(32307);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let n={},o={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function setWebGLContext(e,t){n[e]=t}},52727:function(e,t,r){r.d(t,{_:function(){return DecodeMatrixProgram}});var a=r(85066),n=r(12224),o=r(84305),i=r(72704);/**
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
 */let DecodeMatrixProgram=class DecodeMatrixProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=i.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,a.A)();this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?o.Kn(["r","c","d"],e):o.RW(["r","c","d"],e)}
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
    `}}},11433:function(e,t,r){r.d(t,{G:function(){return DecodeMatrixPackedProgram}});var a=r(85066),n=r(12224),o=r(84305),i=r(72704);/**
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
 */let DecodeMatrixPackedProgram=class DecodeMatrixPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=i.m1.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=(0,a.A)();this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?o.Kn(["r","c","d"],e):o.RW(["r","c","d"],e)}
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
    `}}},24824:function(e,t,r){r.d(t,{q:function(){return EncodeFloatProgram}});var a=r(85066),n=r(84305),o=r(72704);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeFloatProgram=class EncodeFloatProgram{constructor(e){this.variableNames=["A"],this.outTexUsage=o.v2.DOWNLOAD;let t=(0,a.A)();this.outputShape=e,this.userCode=`
      ${n.ye}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}}},8470:function(e,t,r){r.d(t,{d:function(){return EncodeFloatPackedProgram}});var a=r(85066),n=r(84305),o=r(72704);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeFloatPackedProgram=class EncodeFloatPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=o.v2.DOWNLOAD;let t=(0,a.A)();this.outputShape=e,this.userCode=`
      ${n.ye}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}}},57279:function(e,t,r){r.d(t,{F:function(){return EncodeMatrixProgram}});var a=r(85066),n=r(12224),o=r(84305);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let i={R:0,G:1,B:2,A:3};let EncodeMatrixProgram=class EncodeMatrixProgram{constructor(e,t=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let s=(0,a.A)();this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let l="result";t&&(l="floor(result * 255. + 0.5)");let u="";for(let e=0;e<r.length;e++){let t=r[e];u+=`
          if(offset == ${e}) {
            result = values[${i[t]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?o.nc():o.ku(e)}

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
    `}}},85789:function(e,t,r){r.d(t,{Z:function(){return EncodeMatrixPackedProgram}});var a=r(85066),n=r(12224),o=r(84305);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let EncodeMatrixPackedProgram=class EncodeMatrixPackedProgram{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=(0,a.A)();this.outputShape=e,this.enableShapeUniforms=(0,n.C9)(this.outputShape.length);let i="",s="result";t&&(s="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let a=0;a<=1;a++){let n=2*t+a;i+=`
          localCoords = coords;
          if(localCoords[2] + ${a} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${a};
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
              result[${n}] = values[0];
            } else if (offset == 1) {
              result[${n}] = values[1];
            } else if (offset == 2) {
              result[${n}] = values[2];
            } else {
              result[${n}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?o.nc():o.ku(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${i}

          ${r.output} = ${s};
        }
    `}}},98519:function(e,t,r){var a=r(32307),n=r(19659);/**
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
 */let o=(0,a.OBj)();o.registerFlag("HAS_WEBGL",()=>o.getNumber("WEBGL_VERSION")>0),o.registerFlag("WEBGL_VERSION",()=>(0,n.isWebGLVersionEnabled)(2)?2:(0,n.isWebGLVersionEnabled)(1)?1:0),o.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),o.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===o.get("WEBGL_VERSION")),o.registerFlag("WEBGL_CPU_FORWARD",()=>!0),o.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),o.registerFlag("WEBGL_PACK",()=>o.getBool("HAS_WEBGL")),o.registerFlag("WEBGL_PACK_NORMALIZATION",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_CLIP",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_REDUCE",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_LAZILY_UNPACK",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_CONV_IM2COL",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>o.getBool("WEBGL_PACK")),o.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>(0,n.getWebGLMaxTextureSize)(o.getNumber("WEBGL_VERSION"))),o.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>(0,n.getMaxTexturesInShader)(o.getNumber("WEBGL_VERSION"))),o.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let e=o.getNumber("WEBGL_VERSION");return 0===e?0:(0,n.getWebGLDisjointQueryTimerVersion)(e)}),o.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>o.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!a.C2$.isMobile()),o.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>(0,n.isCapableOfRenderingToFloatTexture)(o.getNumber("WEBGL_VERSION"))),o.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!o.getBool("WEBGL_FORCE_F16_TEXTURES")&&o.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),o.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>(0,n.isDownloadFloatTextureEnabled)(o.getNumber("WEBGL_VERSION"))),o.registerFlag("WEBGL_FENCE_API_ENABLED",()=>(0,n.isWebGLFenceEnabled)(o.getNumber("WEBGL_VERSION"))),o.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>{let e=o.getBool("WEBGL_RENDER_FLOAT32_ENABLED");return e?4:0}),o.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),o.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>a.C2$.isMobile()?1:-1,e=>{if("number"!=typeof e)throw Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${e}.`);if(e<0&&-1!==e)throw Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)}),o.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),o.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),o.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),o.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),o.registerFlag("WEBGL_EXP_CONV",()=>!1),o.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>o.getBool("IS_TEST")),o.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),o.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),o.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),o.registerFlag("ENGINE_COMPILE_ONLY",()=>!1)},85066:function(e,t,r){r.d(t,{A:function(){return getGlslDifferences}});var a=r(32307);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getGlslDifferences(){let e,t,r,n,o,i,s,l,u,d;return 2===(0,a.OBj)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",r="out",n="in",o="texture",i="outputColor",s="out vec4 outputColor;",l=(0,a.OBj)().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",u="",d=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(e="",t="attribute",r="varying",n="varying",o="texture2D",i="gl_FragColor",s="",l=`
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
    `,d=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:e,attribute:t,varyingVs:r,varyingFs:n,texture2D:o,output:i,defineOutput:s,defineSpecialNaN:l,defineSpecialInf:u,defineRound:d}}},31475:function(e,t,r){r.d(t,{A:function(){return GPGPUContext}});var a=r(32307),n=r(20540),o=r(81377),i=r(72704),s=r(19659);/**
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
 */let GPGPUContext=class GPGPUContext{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=(0,a.OBj)().getNumber("WEBGL_VERSION");if(null!=e?(this.gl=e,(0,n.nd)(t,e)):this.gl=(0,n.jl)(t),e=this.gl,2===(0,a.OBj)().getNumber("WEBGL_VERSION")){let t=e;this.createVertexArray=()=>s.callAndCheck(t,()=>t.createVertexArray()),this.bindVertexArray=e=>s.callAndCheck(t,()=>t.bindVertexArray(e)),this.deleteVertexArray=e=>s.callAndCheck(t,()=>t.deleteVertexArray(e)),this.getVertexArray=()=>s.callAndCheck(t,()=>t.getParameter(t.VERTEX_ARRAY_BINDING))}else if(null!=e){let t=e.getExtension("OES_vertex_array_object");if(null==t)throw Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>s.callAndCheck(e,()=>t.createVertexArrayOES()),this.bindVertexArray=r=>s.callAndCheck(e,()=>t.bindVertexArrayOES(r)),this.deleteVertexArray=r=>s.callAndCheck(e,()=>t.deleteVertexArrayOES(r)),this.getVertexArray=()=>s.callAndCheck(e,()=>e.getParameter(t.VERTEX_ARRAY_BINDING_OES))}let r="WEBGL_color_buffer_float",l="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),1===(0,a.OBj)().getNumber("WEBGL_VERSION")){let e="OES_texture_half_float";if(this.textureFloatExtension=s.getExtensionOrThrow(this.gl,"OES_texture_float"),s.hasExtension(this.gl,e))this.textureHalfFloatExtension=s.getExtensionOrThrow(this.gl,e);else if((0,a.OBj)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=s.getExtensionOrThrow(this.gl,l);else if((0,a.OBj)().get("WEBGL_FORCE_F16_TEXTURES"))throw Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",s.hasExtension(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else if(s.hasExtension(this.gl,l))this.colorBufferHalfFloatExtension=this.gl.getExtension(l);else throw Error("GL context does not support color renderable floats");this.vertexBuffer=o.createVertexBuffer(this.gl),this.indexBuffer=o.createIndexBuffer(this.gl),this.framebuffer=s.createFramebuffer(this.gl),this.textureConfig=i.Sq(this.gl,this.textureHalfFloatExtension)}get debug(){return(0,a.OBj)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;s.callAndCheck(e,()=>e.finish()),s.callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),s.callAndCheck(e,()=>e.deleteFramebuffer(this.framebuffer)),s.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),s.callAndCheck(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),o.createFloat32MatrixTexture(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),o.createFloat16MatrixTexture(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),o.createUnsignedBytesMatrixTexture(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),o.uploadPixelDataToTexture(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,r,a){this.throwIfDisposed(),o.uploadDenseMatrixToTexture(this.gl,e,t,r,a,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),o.createFloat16PackedMatrixTexture(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),o.createPackedMatrixTexture(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer),this.outputTexture=null),s.callAndCheck(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r){return this.downloadMatrixDriver(e,()=>o.downloadByteEncodedFloatMatrixFromOutputTexture(this.gl,t,r,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,r,a,n,i){return o.downloadPackedMatrixFromBuffer(this.gl,e,t,r,a,n,i,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return o.downloadFloat32MatrixFromBuffer(this.gl,e,t)}createBufferFromTexture(e,t,r){this.bindTextureToFrameBuffer(e);let a=o.createBufferFromOutputTexture(this.gl,t,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),a}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r;if((0,a.OBj)().getBool("WEBGL_FENCE_API_ENABLED")){let a=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),r=()=>{let t=e.clientWaitSync(a,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},t=a}else(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(t,(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:t,isFencePassed:r}}downloadMatrixFromPackedTexture(e,t,r){return this.downloadMatrixDriver(e,()=>o.downloadMatrixFromPackedOutputTexture(this.gl,t,r))}createProgram(e){this.throwIfDisposed();let t=this.gl;null==this.vertexShader&&(this.vertexShader=o.createVertexShader(t));let r=s.createProgram(t);s.callAndCheck(t,()=>t.attachShader(r,this.vertexShader)),s.callAndCheck(t,()=>t.attachShader(r,e)),s.linkProgram(t,r);let a=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&s.validateProgram(t,a),a}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;s.callAndCheck(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),o.bindVertexProgramAttributeStreams(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&(s.callAndCheck(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&s.validateProgram(this.gl,this.program),s.callAndCheck(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,r=!0){return(this.throwIfDisposed(),r)?s.getProgramUniformLocationOrThrow(this.gl,e,t):s.getProgramUniformLocation(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,r){this.throwIfDisposed(),this.throwIfNoProgram(),s.bindTextureToProgramUniformSampler(this.gl,e,t,r)}setOutputMatrixTexture(e,t,r){this.setOutputMatrixTextureDriver(e,r,t)}setOutputPackedMatrixTexture(e,t,r){this.throwIfDisposed();let[a,n]=i.qe(t,r);this.setOutputMatrixTextureDriver(e,a,n)}setOutputMatrixWriteRegion(e,t,r,a){this.setOutputMatrixWriteRegionDriver(r,e,a,t)}setOutputPackedMatrixWriteRegion(e,t,r,a){throw Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&s.validateProgram(this.gl,this.program),s.validateFramebuffer(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}s.callAndCheck(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=s.getExtensionOrThrow(this.gl,2===(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2(),r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){let e=this.gl,t=this.getQueryTimerExtensionWebGL2();e.endQuery(t.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await a.D5U.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,(0,a.OBj)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){let t=this.gl,r=t.getQueryParameter(e,t.QUERY_RESULT);return r/1e6}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT);return r/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){let t=this.gl,r=this.getQueryTimerExtensionWebGL2(),a=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),a&&!this.disjoint}{let t=this.getQueryTimerExtensionWebGL1(),r=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),r&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=function(e){let t=0;for(;t<e.length;++t){let r=e[t]();if(!r)break}return t-1}(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){let r;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||("setTimeoutCustom"in(0,a.OBj)().platform&&(r=(0,a.OBj)().platform.setTimeoutCustom.bind((0,a.OBj)().platform)),a.D5U.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length),()=>0,null,r))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),s.bindColorTextureToFramebuffer(this.gl,e,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(s.bindColorTextureToFramebuffer(this.gl,this.outputTexture,this.framebuffer),this.debug&&s.validateFramebuffer(this.gl)):s.unbindColorTextureFromFramebuffer(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let r=t();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(e,t,r){this.throwIfDisposed();let a=this.gl;s.bindColorTextureToFramebuffer(a,e,this.framebuffer),this.debug&&s.validateFramebuffer(a),this.outputTexture=e,s.callAndCheck(a,()=>a.viewport(0,0,t,r)),s.callAndCheck(a,()=>a.scissor(0,0,t,r))}setOutputMatrixWriteRegionDriver(e,t,r,a){this.throwIfDisposed(),s.callAndCheck(this.gl,()=>this.gl.scissor(e,t,r,a))}throwIfDisposed(){if(this.disposed)throw Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw Error("No GPU program is currently set.")}}},12224:function(e,t,r){r.d(t,{C9:function(){return useShapeUniforms},IJ:function(){return compileProgram},Yv:function(){return getUniformLocations},_s:function(){return runProgram},mi:function(){return makeShaderKey}});var a=r(32307),n=r(23027),o=r(19659);/**
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
 */function compileProgram(e,t,r,i){let s=r.map((e,r)=>{let a={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(a.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[r],shapeInfo:a}}),l=s.map(e=>e.shapeInfo),u={logicalShape:i.shape,texShape:i.texData.texShape,isUniform:!1,isPacked:i.texData.isPacked,flatOffset:null},d=n.Vm(s,u,t),c=(0,o.createFragmentShader)(e.gl,d),p=e.createProgram(c);return(0,a.OBj)().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:c,source:d,webGLProgram:p,inShapeInfos:l,outShapeInfo:u,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(e.buildVao(p),Object.assign({program:t,fragmentShader:c,source:d,webGLProgram:p,inShapeInfos:l,outShapeInfo:u},getUniformLocations(e,t,p)))}function getUniformLocations(e,t,r){let n,o,i;let s=[],l=[],u=null,d=null;for(let n of(d=e.getUniformLocation(r,"NAN",!1),1===(0,a.OBj)().getNumber("WEBGL_VERSION")&&(u=e.getUniformLocation(r,"INFINITY",!1)),t.variableNames)){let a={name:n,uniform:e.getUniformLocation(r,n,!1),offset:e.getUniformLocation(r,`offset${n}`,!1)};t.enableShapeUniforms&&(a.shape=e.getUniformLocation(r,`${n}Shape`,!1),a.texShape=e.getUniformLocation(r,`${n}TexShape`,!1)),s.push(a)}if(t.enableShapeUniforms&&(n=e.getUniformLocation(r,"outShape",!1),i=e.getUniformLocation(r,"outShapeStrides",!1),o=e.getUniformLocation(r,"outTexShape",!1)),t.customUniforms)for(let a of t.customUniforms)l.push(e.getUniformLocation(r,a.name,!1));return{variablesLocations:s,customUniformLocations:l,infLoc:u,nanLoc:d,outShapeLocation:n,outShapeStridesLocation:i,outTexShapeLocation:o}}function validateBinaryAndProgram(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,r)=>{let n=e.logicalShape,o=t[r],i=o.shape;if(!a.D5U.arraysEqual(n,i))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${i} must match`);if(e.isUniform&&o.isUniform)return;let s=e.texShape,l=o.isUniform?null:o.texData.texShape;if(!a.D5U.arraysEqual(s,l))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${s} and ${l} must match`)})}function runProgram(e,t,r,o,i){t.program.enableShapeUniforms||(validateBinaryAndProgram(t.inShapeInfos,r),validateBinaryAndProgram([t.outShapeInfo],[o]));let s=o.texData.texture,l=o.texData.texShape;o.texData.isPacked?e.setOutputPackedMatrixTexture(s.texture,l[0],l[1]):e.setOutputMatrixTexture(s.texture,l[0],l[1]),e.setProgram(t.webGLProgram),e.bindVertexArray(t.webGLProgram.vao),1===(0,a.OBj)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN);for(let o=0;o<r.length;++o){let i=r[o],{uniform:s,offset:l,shape:u,texShape:d}=t.variablesLocations[o];if(u){let{uniformShape:r}=n.Tt(t.program.packedInputs,i.shape,i.texData.texShape);switch(r.length){case 1:e.gl.uniform1iv(u,new Int32Array(r));break;case 2:e.gl.uniform2iv(u,new Int32Array(r));break;case 3:e.gl.uniform3iv(u,new Int32Array(r));break;case 4:e.gl.uniform4iv(u,new Int32Array(r))}}if(d&&e.gl.uniform2i(d,i.texData.texShape[0],i.texData.texShape[1]),null!=s){if(i.isUniform){if(2>a.D5U.sizeFromShape(i.shape))e.gl.uniform1f(s,i.uniformValues[0]);else{let t=i.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(s,t)}continue}null!=i.texData.slice&&null!=l&&e.gl.uniform1i(l,i.texData.slice.flatOffset),e.setInputMatrixTexture(i.texData.texture.texture,s,o)}}let u=t.outShapeLocation;if(u)switch(o.shape.length){case 1:e.gl.uniform1iv(u,new Int32Array(o.shape));break;case 2:e.gl.uniform2iv(u,new Int32Array(o.shape));break;case 3:e.gl.uniform3iv(u,new Int32Array(o.shape));break;case 4:e.gl.uniform4iv(u,new Int32Array(o.shape))}if(t.outShapeStridesLocation){let r=a.D5U.computeStrides(o.shape);switch(o.shape.length){case 2:e.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(r));break;case 3:e.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(r));break;case 4:e.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(r))}}if(t.outTexShapeLocation&&e.gl.uniform2i(t.outTexShapeLocation,o.texData.texShape[0],o.texData.texShape[1]),t.program.customUniforms&&i)for(let r=0;r<t.program.customUniforms.length;++r){let a=t.program.customUniforms[r],n=t.customUniformLocations[r],o=i[r];if("float"===a.type)e.gl.uniform1fv(n,o);else if("vec2"===a.type)e.gl.uniform2fv(n,o);else if("vec3"===a.type)e.gl.uniform3fv(n,o);else if("vec4"===a.type)e.gl.uniform4fv(n,o);else if("int"===a.type)e.gl.uniform1iv(n,o);else if("ivec2"===a.type)e.gl.uniform2iv(n,o);else if("ivec3"===a.type)e.gl.uniform3iv(n,o);else if("ivec4"===a.type)e.gl.uniform4iv(n,o);else throw Error(`uniform type ${a.type} is not supported yet.`)}e.executeProgram()}function makeShaderKey(e,t,r){let o="";t.concat(r).forEach(t=>{let i=null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0;if(e.enableShapeUniforms&&!t.isUniform){let s=t.texData.texShape,{useSqueezeShape:l,uniformShape:u,keptDims:d}=n.Tt(e.packedInputs,t.shape,s),c="",p="",h="";if(1===u.length&&e.packedInputs){let e=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];c=`${e[0]>1}_${e[1]>1}`}else if(2!==u.length||e.packedInputs){if(u.length>2&&!e.packedInputs){let e=a.D5U.computeStrides(u);h=`${e[0]===s[1]}_${e[e.length-1]===s[1]}`}}else p=`${u[0]>1}_${u[1]>1}`;let f=t.shape.length,m=2===u.length&&a.D5U.arraysEqual(t.shape,s),x=1===a.D5U.sizeFromShape(t.shape),g=a.backend_util.getBroadcastDims(t.shape,r.shape),C=!e.packedInputs&&f===r.shape.length&&a.D5U.arraysEqual(s,r.texData.texShape),b=e.packedInputs||u.length>2?"":`${s[0]>1}_${s[1]>1}`;o+=`${f}_${C}_${l?d:""}_${u.length}_${x}_${g}_${m}_${c}_${p}_${h}_${b}_${i}`}else{let e=t.isUniform?"uniform":t.texData.texShape;o+=`${t.shape}_${e}_${i}`}});let i=e.userCode;return e.constructor.name+("_"+o+"_"+i)+`${(0,a.OBj)().getNumber("WEBGL_VERSION")}`}function useShapeUniforms(e){return(0,a.OBj)().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&e<=4}},81377:function(e,t,r){r.r(t),r.d(t,{bindVertexProgramAttributeStreams:function(){return bindVertexProgramAttributeStreams},createBufferFromOutputTexture:function(){return createBufferFromOutputTexture},createFloat16MatrixTexture:function(){return createFloat16MatrixTexture},createFloat16PackedMatrixTexture:function(){return createFloat16PackedMatrixTexture},createFloat32MatrixTexture:function(){return createFloat32MatrixTexture},createIndexBuffer:function(){return createIndexBuffer},createPackedMatrixTexture:function(){return createPackedMatrixTexture},createUnsignedBytesMatrixTexture:function(){return createUnsignedBytesMatrixTexture},createVertexBuffer:function(){return createVertexBuffer},createVertexShader:function(){return createVertexShader},downloadByteEncodedFloatMatrixFromOutputTexture:function(){return downloadByteEncodedFloatMatrixFromOutputTexture},downloadFloat32MatrixFromBuffer:function(){return downloadFloat32MatrixFromBuffer},downloadMatrixFromPackedOutputTexture:function(){return downloadMatrixFromPackedOutputTexture},downloadPackedMatrixFromBuffer:function(){return downloadPackedMatrixFromBuffer},getInternalFormatForFloat16MatrixTexture:function(){return getInternalFormatForFloat16MatrixTexture},getInternalFormatForFloat16PackedMatrixTexture:function(){return getInternalFormatForFloat16PackedMatrixTexture},getInternalFormatForFloat32MatrixTexture:function(){return getInternalFormatForFloat32MatrixTexture},getInternalFormatForPackedMatrixTexture:function(){return getInternalFormatForPackedMatrixTexture},getInternalFormatForUnsignedBytesMatrixTexture:function(){return getInternalFormatForUnsignedBytesMatrixTexture},uploadDenseMatrixToTexture:function(){return uploadDenseMatrixToTexture},uploadPixelDataToTexture:function(){return uploadPixelDataToTexture}});var a=r(32307),n=r(85066),o=r(72704),i=r(19659);/**
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
 */function createVertexShader(e){let t=(0,n.A)(),r=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return i.createVertexShader(e,r)}function createVertexBuffer(e){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return i.createStaticVertexBuffer(e,t)}function createIndexBuffer(e){let t=new Uint16Array([0,1,2,2,1,3]);return i.createStaticIndexBuffer(e,t)}function createAndConfigureTexture(e,t,r,n,o,s){i.validateTextureSize(t,r);let l=i.createTexture(e),u=e.TEXTURE_2D;return i.callAndCheck(e,()=>e.bindTexture(u,l)),i.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),i.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),i.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MIN_FILTER,e.NEAREST)),i.callAndCheck(e,()=>e.texParameteri(u,e.TEXTURE_MAG_FILTER,e.NEAREST)),1===(0,a.OBj)().getNumber("WEBGL_VERSION")?i.callAndCheck(e,()=>e.texImage2D(u,0,n,t,r,0,o,s,null)):i.callAndCheck(e,()=>e.texStorage2D(u,1,n,t,r)),i.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null)),{texture:l,texShape:[r,t]}}function getInternalFormatForFloat32MatrixTexture(e){return e.internalFormatFloat}function createFloat32MatrixTexture(e,t,r,a){let[n,i]=o.kk(t,r);return createAndConfigureTexture(e,n,i,getInternalFormatForFloat32MatrixTexture(a),a.textureFormatFloat,e.FLOAT)}function getInternalFormatForFloat16MatrixTexture(e){return e.internalFormatHalfFloat}function createFloat16MatrixTexture(e,t,r,a){let[n,i]=o.kk(t,r);return createAndConfigureTexture(e,n,i,getInternalFormatForFloat16MatrixTexture(a),a.textureFormatFloat,a.textureTypeHalfFloat)}function getInternalFormatForUnsignedBytesMatrixTexture(e){return e.downloadTextureFormat}function createUnsignedBytesMatrixTexture(e,t,r,a){let[n,i]=o.kk(t,r);return createAndConfigureTexture(e,n,i,getInternalFormatForUnsignedBytesMatrixTexture(a),e.RGBA,e.UNSIGNED_BYTE)}function getInternalFormatForPackedMatrixTexture(e){return e.internalFormatPackedFloat}function createPackedMatrixTexture(e,t,r,a){let[n,i]=o.qe(t,r);return createAndConfigureTexture(e,n,i,getInternalFormatForPackedMatrixTexture(a),e.RGBA,e.FLOAT)}function getInternalFormatForFloat16PackedMatrixTexture(e){return e.internalFormatPackedHalfFloat}function createFloat16PackedMatrixTexture(e,t,r,a){let[n,i]=o.qe(t,r);return createAndConfigureTexture(e,n,i,getInternalFormatForFloat16PackedMatrixTexture(a),e.RGBA,a.textureTypeHalfFloat)}function bindVertexProgramAttributeStreams(e,t,r){i.callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r));let a=i.bindVertexBufferToProgramAttribute(e,t,"clipSpacePos",r,3,20,0);return a&&i.bindVertexBufferToProgramAttribute(e,t,"uv",r,2,20,12)}function uploadDenseMatrixToTexture(e,t,r,n,o,s){let l,u,d;i.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),o instanceof Uint8Array?(l=new Uint8Array(r*n*4),u=e.UNSIGNED_BYTE,d=e.RGBA):(l=new Float32Array(r*n*4),u=e.FLOAT,d=s.internalFormatPackedFloat),l.set(o),2===(0,a.OBj)().getNumber("WEBGL_VERSION")?i.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r,n,e.RGBA,u,l)):i.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,d,r,n,0,e.RGBA,u,l)),i.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function uploadPixelDataToTexture(e,t,r){i.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t)),r.data instanceof Uint8Array?2===(0,a.OBj)().getNumber("WEBGL_VERSION")?i.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,e.RGBA,e.UNSIGNED_BYTE,r.data)):i.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r.width,r.height,0,e.RGBA,e.UNSIGNED_BYTE,r.data)):2===(0,a.OBj)().getNumber("WEBGL_VERSION")?i.callAndCheck(e,()=>e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,r)):i.callAndCheck(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r)),i.callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function createBufferFromOutputTexture(e,t,r,a){let n=e.createBuffer();i.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,n));let o=16*t*r;return i.callAndCheck(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,o,e.STREAM_READ)),i.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,0)),i.callAndCheck(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),n}function downloadFloat32MatrixFromBuffer(e,t,r){let a=new Float32Array(r);return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,a),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),a}function downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r,a){let[n,s]=o.kk(t,r),l=new Uint8Array(o.yb(t*r,4));return i.callAndCheck(e,()=>e.readPixels(0,0,n,s,a.downloadTextureFormat,e.UNSIGNED_BYTE,l)),new Float32Array(l.buffer)}function downloadPackedMatrixFromBuffer(e,t,r,a,n,i,s,l){let u=new Float32Array(o.Se(i,s));return e.bindBuffer(e.PIXEL_PACK_BUFFER,t),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,u),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),u}function downloadMatrixFromPackedOutputTexture(e,t,r){let a=new Float32Array(t*r*4);return i.callAndCheck(e,()=>e.readPixels(0,0,r,t,e.RGBA,e.FLOAT,a)),a}},57375:function(e,t,r){let a;r.r(t),r.d(t,{GPGPUContext:function(){return p.A},MathBackendWebGL:function(){return s.QC},forceHalfFloat:function(){return forceHalfFloat},gpgpu_util:function(){return u},setWebGLContext:function(){return c.nd},version_webgl:function(){return l},webgl:function(){return h},webgl_util:function(){return d}});var n,o,i=r(32307),s=r(65105);/** @license See the LICENSE file. */let l="4.20.0";var u=r(81377),d=r(19659),c=r(20540),p=r(31475);/**
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
 */function forceHalfFloat(){(0,i.OBj)().set("WEBGL_FORCE_F16_TEXTURES",!0)}i.C2$.isBrowser()&&(0,i.jqO)("webgl",()=>new s.QC,2);let h={forceHalfFloat:forceHalfFloat};var f=r(12224);/**
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
`;let BinaryOpProgram=class BinaryOpProgram{constructor(e,t,r){this.variableNames=["A","B"],this.outputShape=i.backend_util.assertAndGetBroadcastShape(t,r),this.enableShapeUniforms=(0,f.C9)(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var x=r(75180),g=r(23027);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let C=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;let BinaryOpPackedProgram=class BinaryOpPackedProgram{constructor(e,t,r,a=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i.backend_util.assertAndGetBroadcastShape(t,r);let n=this.outputShape.length;this.enableShapeUniforms=(0,f.C9)(n);let o="";if(a){if(0===n||1===i.D5U.sizeFromShape(this.outputShape))o=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else{let e=(0,g.kW)(n);if(o=`
          ${e} coords = getOutputCoords();
        `,1===n)this.enableShapeUniforms?o+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:o+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let e=(0,x.Ky)("coords",n);this.enableShapeUniforms?o+=`
            bool nextRowOutOfBounds =
              (${e[n-2]} + 1) >= outShape[${n} - 2];
            bool nextColOutOfBounds =
              (${e[n-1]} + 1) >= outShape[${n} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:o+=`
            bool nextRowOutOfBounds =
              (${e[n-2]} + 1) >= ${this.outputShape[n-2]};
            bool nextColOutOfBounds =
              (${e[n-1]} + 1) >= ${this.outputShape[n-1]};
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
        ${o}

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
 */function identity(e){let{inputs:t,backend:r}=e,{x:a}=t;return r.incRef(a.dataId),{dataId:a.dataId,shape:a.shape,dtype:a.dtype}}let b={kernelName:i.iJz,backendName:"webgl",kernelFunc:identity};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function complex(e){let{inputs:t,backend:r}=e,{real:a,imag:n}=t,o=r.makeTensorInfo(a.shape,"complex64"),i=r.texData.get(o.dataId),s=identity({inputs:{x:a},backend:r}),l=identity({inputs:{x:n},backend:r});return i.complexTensorInfos={real:s,imag:l},o}let v={kernelName:i.Zz9,backendName:"webgl",kernelFunc:complex},y="return (a < 0.) ? b * a : a;",I=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,$={kernelName:i.J$2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{alpha:o}=a,s=r.makeTensorInfo([],"float32",i.D5U.createScalarValue(o,"float32")),l=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(I,n.shape,s.shape):new BinaryOpProgram(y,n.shape,s.shape),u=r.runWebGLProgram(l,[n,s],"float32");return r.disposeIntermediateTensorInfo(s),u}},k="return (a < 0.) ? b * a : a;",R=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,T={kernelName:i.o0g,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a,alpha:n}=t,o=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(R,a.shape,n.shape):new BinaryOpProgram(k,a.shape,n.shape);return r.runWebGLProgram(o,[a,n],"float32")}};var w=r(89520),N=r(29492);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let S="if (isnan(x)) return x;";function unaryKernelFunc({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:r,dtype:a}){return({inputs:n,backend:o})=>{let s;let{x:l}=n,u=a||l.dtype;if(o.shouldExecuteOnCPU([l])&&null!=r){let e=o.texData.get(l.dataId),t=r(e.values,u);return o.makeTensorInfo(l.shape,u,t)}let d=(0,i.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&null!=t;return s=d?new N.cc(l.shape,t):new w.l(l.shape,e),o.runWebGLProgram(s,[l],u)}}function binaryKernelFunc({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:r=!1,supportsComplex:a=!1,cpuKernelImpl:n,dtype:o}){return({inputs:s,backend:l})=>{let u;let{a:d,b:c}=s;if(a&&"complex64"===d.dtype){let t=l.texData.get(d.dataId),r=l.texData.get(c.dataId),[a,n]=[[t.complexTensorInfos.real,r.complexTensorInfos.real],[t.complexTensorInfos.imag,r.complexTensorInfos.imag]].map(t=>{let[r,a]=t,n={dataId:r.dataId,dtype:r.dtype,shape:d.shape},o={dataId:a.dataId,dtype:a.dtype,shape:c.shape},s=new BinaryOpProgram(e,d.shape,c.shape);return l.runWebGLProgram(s,[n,o],(0,i.x8V)(r.dtype,a.dtype))}),o=complex({inputs:{real:a,imag:n},backend:l});return l.disposeIntermediateTensorInfo(a),l.disposeIntermediateTensorInfo(n),o}let p=o||(0,i.x8V)(d.dtype,c.dtype);if(("string"===d.dtype||"string"===c.dtype||l.shouldExecuteOnCPU([d,c]))&&null!=n){let e=l.texData.get(d.dataId).values,t=l.texData.get(c.dataId).values,r="string"===d.dtype?i.backend_util.fromUint8ToStringArray(e):e,a="string"===d.dtype?i.backend_util.fromUint8ToStringArray(t):t,[o,s]=n(d.shape,c.shape,r,a,p),u=l.makeTensorInfo(s,p),h=l.texData.get(u.dataId);return h.values=o,u}let h=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t;return u=h?new BinaryOpPackedProgram(t,d.shape,c.shape,r):new BinaryOpProgram(e,d.shape,c.shape),l.runWebGLProgram(u,[d,c],p)}}function mapActivationToShaderProgram(e,t=!1){if("linear"===e)return t?N.t$:w.t$;if("relu"===e)return t?N.RX:w.RX;if("elu"===e)return t?N.Cv:w.Cv;if("relu6"===e)return t?N.eW:w.eW;if("prelu"===e)return t?R:k;if("leakyrelu"===e)return t?I:y;if("sigmoid"===e)return t?N.Tq:w.Tq;throw Error(`Activation ${e} has not been implemented for the WebGL backend.`)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MatMulPackedProgram=class MatMulPackedProgram{constructor(e,t,r,a=!1,n=!1,o=!1,i=null,s=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let u=a?e[1]:e[2],d=Math.ceil(u/2),c=a?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],p=n?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],h="",m="";i&&(h=s?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${i}
        }`:l?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${i}
        }`:`vec4 activation(vec4 x) {
          ${i}
        }`,m="result = activation(result);"),o&&this.variableNames.push("bias"),s&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let x="rc.x",g="rc.x";e[0]<t[0]?x=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(g=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${h}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${d}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${x};
        int batchB = ${g};
        for (int i = 0; i < ${d}; i++) {
          vec4 a = getMatrixA(batchA, ${a?"i * 2, rc.y":"rc.y, i * 2"});
          vec4 b = getMatrixB(batchB, ${n?"rc.z, i * 2":"i * 2, rc.z"});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${c[0]} * ${p[0]});
          result += (${c[1]} * ${p[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${o?"result += getBiasAtOutCoords();":""}

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
 */let F={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};let BinaryOpComplexProgram=class BinaryOpComplexProgram{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=i.backend_util.assertAndGetBroadcastShape(t,r),this.userCode=`
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
    `}};var E=r(13082);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let A="return a * b;";function multiply(e){let t;let{inputs:r,backend:a}=e,{a:n,b:o}=r,s=i.backend_util.upcastType(n.dtype,o.dtype);if("complex64"===n.dtype){let e=a.texData.get(n.dataId),t=a.texData.get(o.dataId),r=new BinaryOpComplexProgram(F.REAL,n.shape,o.shape),i=new BinaryOpComplexProgram(F.IMAG,n.shape,o.shape),s=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:n.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:n.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:o.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:o.shape}],l=a.runWebGLProgram(r,s,"float32"),u=a.runWebGLProgram(i,s,"float32"),d=complex({inputs:{real:l,imag:u},backend:a});return a.disposeIntermediateTensorInfo(l),a.disposeIntermediateTensorInfo(u),d}if(a.shouldExecuteOnCPU([n,o])){let e=a.texData.get(n.dataId),t=a.texData.get(o.dataId),[r,i]=(0,E.Th)(n.shape,o.shape,e.values,t.values,s),l=a.makeTensorInfo(i,s),u=a.texData.get(l.dataId);return u.values=r,l}return t=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(A,n.shape,o.shape):new BinaryOpProgram(A,n.shape,o.shape),a.runWebGLProgram(t,[n,o],s)}let O={kernelName:i.wYn,backendName:"webgl",kernelFunc:multiply};var P=r(42123);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function reshape(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{shape:o}=a,s=i.D5U.sizeFromShape(n.shape),l=i.D5U.inferFromImplicitShape(o,s),u=i.D5U.sizeFromShape(l);i.D5U.assert(s===u,()=>`The new shape (${l}) has ${u} elements and the old shape (${n.shape}) has ${s} elements. The new shape and old shape must have the same number of elements.`);let c=r.texData.get(n.dataId);return!c.isPacked||(0,d.isReshapeFree)(n.shape,l)||null!==c.texture&&(0,d.isReshapeFree)(c.shape,l)?(r.incRef(n.dataId),{dataId:n.dataId,shape:l,dtype:n.dtype}):/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r){let a=[(0,d.getBatchDim)(e.shape),...(0,d.getRowsCols)(e.shape)],n={dtype:e.dtype,shape:a,dataId:e.dataId},o=[(0,d.getBatchDim)(t),...(0,d.getRowsCols)(t)],i=new P.v(o,a),s=[a],l=r.runWebGLProgram(i,[n],e.dtype,s,!0);return{dataId:l.dataId,shape:t,dtype:l.dtype}}(n,l,r)}let _={kernelName:i.HZH,backendName:"webgl",kernelFunc:reshape};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MeanProgram=class MeanProgram{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:a,inSize:n,outSize:o}=e;this.outputShape=[a,o];let s=4*Math.floor(r/4),l=r%4,u="sumValue += dot(values, ones);";if(null!=t){let e=1/t;u=`sumValue += dot(values * ${i.D5U.isInt(e)?e.toPrecision(2):e}, ones);`}let d="";n%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${d}
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
 */let ReduceProgram=class ReduceProgram{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:a,inSize:n,outSize:o}=e;this.outputShape=[a,o];let i="0.0",s="";"prod"===t?i="1.0":"min"===t?(i="1.0 / 1e-20",s="min"):"max"===t&&(i="-1.0 / 1e-20",s="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?l="sumValue":"prod"===t?l="prodValue":"all"===t?l="allValue":"any"===t&&(l="anyValue");let u=4*Math.floor(r/4),d=r%4,c=`
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
    `,p="vec4";"all"===t?(i="1.0",c=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,p="bvec4"):"any"===t&&(i="0.0",c=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,p="bvec4");let h="";n%r>0&&(h=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${i};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${h}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${i});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${u};
        if (${1===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${c}
        } else if (${2===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${c}
        } else if (${3===d}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${c}
        }
        setOutput(${l});
      }
    `}};function reduce(e,t,r,a){let n=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t=[];for(;0===t.length||1!==t[t.length-1].outSize;){let r=t.length?t[t.length-1].outSize:e[1],a=i.backend_util.computeOptimalWindowSize(r);t.push({inSize:r,windowSize:a,outSize:Math.ceil(r/a)})}return t}(e.shape),o=e;for(let i=0;i<n.length;i++){let s,l;let{inSize:u,windowSize:d,outSize:c}=n[i];s="mean"===r?0===i?new MeanProgram({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c},u):new MeanProgram({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c}):new ReduceProgram({windowSize:d,inSize:u,batchSize:e.shape[0],outSize:c},r),l=o,o=a.runWebGLProgram(s,[o],t),l.dataId!==e.dataId&&a.disposeIntermediateTensorInfo(l)}return o}/**
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
 */let TransposeProgram=class TransposeProgram{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[t[a]];this.outputShape=r,this.rank=r.length;let a=(0,g.kW)(this.rank),n=function(e){let t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],a=Array(t);for(let t=0;t<e.length;t++)a[e[t]]=r[t];return a.join()}(t);this.userCode=`
    void main() {
      ${a} resRC = getOutputCoords();
      setOutput(getA(${n}));
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
 */let TransposePackedProgram=class TransposePackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[t[a]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let a=(0,g.kW)(this.rank),n=(0,x.k6)("rc",this.rank),o=Array(this.rank);for(let e=0;e<t.length;e++)o[t[e]]=n[e];let i=`vec2(${o.slice(-2).join()})`,s=`++${n[this.rank-1]} < ${r[this.rank-1]}`,l=`getChannel(getA(${o.join()}), ${i})`;this.userCode=`
    void main() {
      ${a} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${s}) {
        result[1] = ${l};
      }
      --${n[this.rank-1]};
      if(++${n[this.rank-2]} < ${r[this.rank-2]}) {
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
 */function transposeImpl(e,t,r){let a=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new TransposePackedProgram(e.shape,t):new TransposeProgram(e.shape,t);return r.runWebGLProgram(a,[e],e.dtype)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sum(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:o,keepDims:s}=a;return(/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,a){let n=e.shape.length,o=i.D5U.parseAxisParam(t,e.shape),s=o,l=i.backend_util.getAxesPermutation(s,n),u=null!=l,d=e;u&&(d=transposeImpl(e,l,a),s=i.backend_util.getInnerMostAxes(s.length,n)),i.backend_util.assertAxesAreInnerMostDims("sum",s,n);let[c,p]=i.backend_util.computeOutAndReduceShapes(d.shape,s),h=c;r&&(h=i.backend_util.expandShapeToKeepDim(c,o));let f=i.D5U.sizeFromShape(p),m=i.D5U.sizeFromShape(e.shape),x=m/f,g=reshape({inputs:{x:d},attrs:{shape:[x,f]},backend:a}),C=(0,i.z4k)(e.dtype),b=reduce(g,C,"sum",a),v=reshape({inputs:{x:b},attrs:{shape:h},backend:a});return a.disposeIntermediateTensorInfo(g),a.disposeIntermediateTensorInfo(b),u&&a.disposeIntermediateTensorInfo(d),v}(n,o,s,r))}let D={kernelName:i.GBy,backendName:"webgl",kernelFunc:sum};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function transpose(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{perm:i}=n,s=o.shape.length,l=Array(s);for(let e=0;e<l.length;e++)l[e]=o.shape[i[e]];if(a.shouldExecuteOnCPU([o])){let e=a.texData.get(o.dataId),r=e.values,n=(0,E.Fv)(r,o.shape,o.dtype,i,l);t=a.makeTensorInfo(l,o.dtype);let s=a.texData.get(t.dataId);s.values=n}else t=transposeImpl(o,i,a);return t}let B={kernelName:i.G3Y,backendName:"webgl",kernelFunc:transpose};function batchMatMulImpl({a:e,b:t,transposeA:r,transposeB:a,backend:n,bias:o=null,preluActivationWeights:s=null,leakyreluAlpha:l=0,activation:u=null}){let d;let c=e.shape.length,p=t.shape.length,h=r?e.shape[c-2]:e.shape[c-1],f=a?t.shape[p-1]:t.shape[p-2],m=r?e.shape[c-1]:e.shape[c-2],x=a?t.shape[p-2]:t.shape[p-1],g=e.shape.slice(0,-2),C=t.shape.slice(0,-2),b=i.D5U.sizeFromShape(g),v=i.D5U.sizeFromShape(C),y=i.Jyw.assertAndGetBroadcastShape(e.shape.slice(0,-2),t.shape.slice(0,-2)),I=y.concat([m,x]);i.D5U.assert(h===f,()=>`Error in matMul: inner shapes (${h}) and (${f}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${r} and transposeB=${a} must match.`);let $=r?[b,h,m]:[b,m,h],k=a?[v,x,f]:[v,f,x],R=reshape({inputs:{x:e},backend:n,attrs:{shape:$}}),T=reshape({inputs:{x:t},backend:n,attrs:{shape:k}}),w=[R,T],N=Math.max(b,v),S=r?R.shape[1]:R.shape[2],F=null!=o,E=null!=s,A="leakyrelu"===u,O=null!=u?mapActivationToShaderProgram(u,!0):null,P=F||E||A||null!=O;if((1===m||1===x)&&S>1e3&&!1===P){let e=R,t=T;r&&(e=transpose({inputs:{x:R},backend:n,attrs:{perm:[0,2,1]}}),w.push(e)),a&&(t=transpose({inputs:{x:T},backend:n,attrs:{perm:[0,2,1]}}),w.push(t));let o=1!==x,i=1===x,s=e;o&&(s=reshape({inputs:{x:e},backend:n,attrs:{shape:[N,S,1]}}),w.push(s));let l=1===x?2:1,u=t;i&&(u=reshape({inputs:{x:t},backend:n,attrs:{shape:[N,1,S]}}),w.push(u));let c=multiply({inputs:{a:s,b:u},backend:n});d=sum({inputs:{x:c},backend:n,attrs:{axis:l,keepDims:!0}}),w.push(c)}else{let u=(0,i.x8V)(e.dtype,t.dtype),c=new MatMulPackedProgram($,k,[N,m,x],r,a,F,O,E,A),p=[R,T];if(null!=o&&p.push(o),E&&p.push(s),A){let e=n.makeTensorInfo([],"float32",i.D5U.createScalarValue(l,"float32"));p.push(e),w.push(e)}d=n.runWebGLProgram(c,p,u)}let _=reshape({inputs:{x:d},backend:n,attrs:{shape:I}});for(let e of(w.push(d),w))n.disposeIntermediateTensorInfo(e);return _}let L={kernelName:i.usg,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{a:n,b:o,bias:i,preluActivationWeights:s}=t,{transposeA:l,transposeB:u,activation:d,leakyreluAlpha:c}=a;return batchMatMulImpl({a:n,b:o,transposeA:l,transposeB:u,backend:r,bias:i,preluActivationWeights:s,leakyreluAlpha:c,activation:d})}},V="return abs(x);",U={kernelName:i.SYM,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:a}=e,{x:n}=r;if(a.shouldExecuteOnCPU([n])&&"complex64"!==n.dtype){let e=a.texData.get(n.dataId),t=(0,E.CJ)(e.values);return a.makeTensorInfo(n.shape,n.dtype,t)}return t=(0,i.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new N.cc(n.shape,V):new w.l(n.shape,V),a.runWebGLProgram(t,[n],n.dtype)}},W=w.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,M=unaryKernelFunc({opSnippet:W}),G={kernelName:i.VGw,backendName:"webgl",kernelFunc:M},z=w.D1+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,X=unaryKernelFunc({opSnippet:z}),H={kernelName:i.SpW,backendName:"webgl",kernelFunc:X},j="return a + b;",K=binaryKernelFunc({opSnippet:j,packedOpSnippet:j,supportsComplex:!0,cpuKernelImpl:E.cK}),Y={kernelName:i.mm_,backendName:"webgl",kernelFunc:K};/**
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
 */let AddNProgram=class AddNProgram{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`float v${e} = get${e}AtOutCoords();`)});let a=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        float result = ${a};
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
 */let AddNPackedProgram=class AddNPackedProgram{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>`T${t}`);let r=[];this.variableNames.forEach(e=>{r.push(`vec4 v${e} = get${e}AtOutCoords();`)});let a=this.variableNames.map(e=>`v${e}`).join(" + ");this.userCode=`
      void main() {
        ${r.join("\n        ")}

        vec4 result = ${a};
        setOutput(result);
      }
    `}};let q={kernelName:i.Xze,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function addN(e){let{inputs:t,backend:r}=e;if(1===t.length)return identity({inputs:{x:t[0]},backend:r});if(t.length>(0,i.OBj)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let e=Math.floor(t.length/2),a=addN({inputs:t.slice(0,e),backend:r}),n=addN({inputs:t.slice(e),backend:r});return addN({inputs:[a,n],backend:r})}let a=t.map(e=>e.dtype).reduce((e,t)=>(0,i.x8V)(e,t)),n=t.map(e=>e.shape),o=(0,i.OBj)().getBool("WEBGL_PACK"),s=o?new AddNPackedProgram(t[0].shape,n):new AddNProgram(t[0].shape,n);return r.runWebGLProgram(s,t,a)}},Q={kernelName:i.oT6,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{axis:s,keepDims:l}=n,u=o.shape.length,d=i.D5U.parseAxisParam(s,o.shape),c=d,p=i.backend_util.getAxesPermutation(c,u),h=o;null!=p&&(h=transpose({inputs:{x:o},backend:a,attrs:{perm:p}}),c=i.backend_util.getInnerMostAxes(c.length,u)),i.backend_util.assertAxesAreInnerMostDims("all",c,u);let[f,m]=i.backend_util.computeOutAndReduceShapes(h.shape,c),x=i.D5U.sizeFromShape(m),g=reshape({inputs:{x:h},backend:a,attrs:{shape:[-1,x]}}),C=reduce(g,g.dtype,"all",a);if(l){let e=i.backend_util.expandShapeToKeepDim(f,d);t=reshape({inputs:{x:C},backend:a,attrs:{shape:e}})}else t=reshape({inputs:{x:C},backend:a,attrs:{shape:f}});return a.disposeIntermediateTensorInfo(g),a.disposeIntermediateTensorInfo(C),null!=p&&a.disposeIntermediateTensorInfo(h),t}},Z={kernelName:i.IKK,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{axis:s,keepDims:l}=n,u=o.shape.length,d=i.D5U.parseAxisParam(s,o.shape),c=d,p=i.backend_util.getAxesPermutation(c,u),h=o;null!=p&&(h=transpose({inputs:{x:o},backend:a,attrs:{perm:p}}),c=i.backend_util.getInnerMostAxes(c.length,u)),i.backend_util.assertAxesAreInnerMostDims("any",c,u);let[f,m]=i.backend_util.computeOutAndReduceShapes(h.shape,c),x=i.D5U.sizeFromShape(m),g=reshape({inputs:{x:h},backend:a,attrs:{shape:[-1,x]}}),C=reduce(g,g.dtype,"any",a);if(l){let e=i.backend_util.expandShapeToKeepDim(f,d);t=reshape({inputs:{x:C},backend:a,attrs:{shape:e}})}else t=reshape({inputs:{x:C},backend:a,attrs:{shape:f}});return a.disposeIntermediateTensorInfo(g),a.disposeIntermediateTensorInfo(C),null!=p&&a.disposeIntermediateTensorInfo(h),t}};/**
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
 */let ArgMinMaxProgram=class ArgMinMaxProgram{constructor(e,t,r){this.variableNames=["A"];let{windowSize:a,batchSize:n,outSize:o}=e;r||this.variableNames.push("bestIndicesA"),this.outputShape=[n,o],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${a};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${a}; i++) {
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
 */let ArgMinMaxPackedProgram=class ArgMinMaxPackedProgram{constructor(e,t,r,a){let n,o;this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,i.D5U.assert(e.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let s=e[e.length-1],l=Math.ceil(s/t);this.outputShape=e.slice(0,-1),l>1&&this.outputShape.push(l),a||this.variableNames.push("bestIndicesA");let u=this.outputShape,d=u.length,c=(0,g.kW)(d),p=(0,x.Ky)("coords",d);if(1===l){o=d+1;let e=(0,g.kW)(o);n=`
        ${e} sourceLocR = ${e}(${p.join()}, 0);
        ++${p[d-1]};
        ${e} sourceLocG = ${e}(${p.join()}, 0);
        ++${p[d-2]};
        ${e} sourceLocA = ${e}(${p.join()}, 0);
        --${p[d-1]};
        ${e} sourceLocB = ${e}(${p.join()}, 0);
        --${p[d-2]};`}else o=d,n=`
        ${c} sourceLocR = coords;
        ++${p[d-1]};
        ${c} sourceLocG = coords;
        ++${p[d-2]};
        ${c} sourceLocA = coords;
        --${p[d-1]};
        ${c} sourceLocB = coords;
        --${p[d-2]};`;let h=["x","y","z","w","u","v"].slice(0,o),f="."+h[o-1],m=h.map(e=>"int "+e),C=(0,x.Ky)("sourceLocR",o-1).concat("inIdx.r"),b=(0,x.Ky)("sourceLocG",o-1).concat("inIdx.g"),v=(0,x.Ky)("sourceLocB",o-1).concat("inIdx.b"),y=(0,x.Ky)("sourceLocA",o-1).concat("inIdx.a"),I=a?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${C.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${v.join()}),
                             getBestIndicesAChannel(${y.join()})));`,$=`vec4(
            getAChannel(${C.join()}),
            hasNextCol ? getAChannel(${b.join()}) : 0.,
            hasNextRow ? getAChannel(${v.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${y.join()}) : 0.)`,k=a?"":`
      float getBestIndicesAChannel(${m.join()}) {
        return getChannel(getBestIndicesA(${h.join()}),
                                          vec2(${h.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${m.join()}) {
        return getChannel(getA(${h.join()}),
                               vec2(${h.slice(-2).join()}));
      }
      ${k}
      void main() {
        ${c} coords = getOutputCoords();
        bool hasNextCol = ${p[d-1]} < ${u[d-1]-1};
        bool hasNextRow = ${p[d-2]} < ${u[d-2]-1};
        ${n}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${$};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${I}
          vec4 candidate = ${$};
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
    `}};function argMinMaxReduce(e,t,r,a){let n=[r];if(i.backend_util.assertAxesAreInnerMostDims("arg"+a.charAt(0).toUpperCase()+a.slice(1),n,t.shape.length),!(0,i.OBj)().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let r=[],o=e.texData.get(t.dataId),s=null!==o&&o.isPacked,l=t;s&&r.push(l=e.unpackTensor(t));let[u,d]=i.backend_util.computeOutAndReduceShapes(l.shape,n),c=i.D5U.sizeFromShape(d),p=reshape({inputs:{x:l},backend:e,attrs:{shape:[-1,c]}});r.push(p);let h=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function argReduce(e,t,r,a=null){let n=t.shape[0],o=t.shape[1];null!=a&&(n=a.shape[0],o=a.shape[1]);let s=i.backend_util.computeOptimalWindowSize(o),l={windowSize:s,inSize:o,batchSize:n,outSize:Math.ceil(o/s)},u=new ArgMinMaxProgram(l,r,null==a),d=[t];null!=a&&d.push(a);let c=e.runWebGLProgram(u,d,"int32");if(1===c.shape[1])return c;let p=argReduce(e,t,r,c);return e.disposeIntermediateTensorInfo(c),p}(e,p,a);r.push(h);let f=reshape({inputs:{x:h},backend:e,attrs:{shape:u}});return r.forEach(t=>e.disposeIntermediateTensorInfo(t)),f}return function argReducePacked(e,t,r,a=null){let n=null!=a?a.shape:t.shape,o=n[n.length-1],s=i.backend_util.computeOptimalWindowSize(o),l=new ArgMinMaxPackedProgram(n,s,r,null==a),u=null==a?[t]:[t,a],d=e.runWebGLProgram(l,u,"int32");if(d.shape.length===t.shape.length){let a=argReducePacked(e,t,r,d);return e.disposeIntermediateTensorInfo(d),a}return d}(e,t,a)}let J={kernelName:i.sJF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:o}=a,s=i.D5U.parseAxisParam(o,n.shape),l=i.backend_util.getAxesPermutation(s,n.shape.length),u=n,d=[];null!=l&&(d.push(u=transpose({inputs:{x:n},backend:r,attrs:{perm:l}})),s=i.backend_util.getInnerMostAxes(s.length,u.shape.length)),i.backend_util.assertAxesAreInnerMostDims("argMax",[s[0]],u.shape.length);let c=argMinMaxReduce(r,u,s[0],"max");return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}},ee={kernelName:i.aJk,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:o}=a,s=i.D5U.parseAxisParam(o,n.shape),l=i.backend_util.getAxesPermutation(s,n.shape.length),u=n,d=[];null!=l&&(d.push(u=transpose({inputs:{x:n},backend:r,attrs:{perm:l}})),s=i.backend_util.getInnerMostAxes(s.length,u.shape.length)),i.backend_util.assertAxesAreInnerMostDims("argMin",[s[0]],u.shape.length);let c=argMinMaxReduce(r,u,s[0],"min");return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}},et=w.D1+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,er=unaryKernelFunc({opSnippet:et}),ea={kernelName:i.M2y,backendName:"webgl",kernelFunc:er},en=w.D1+"return log(x + sqrt(x * x + 1.0));",eo=unaryKernelFunc({opSnippet:en}),ei={kernelName:i.qw7,backendName:"webgl",kernelFunc:eo},es=w.D1+`
  return atan(x);
`,el=unaryKernelFunc({opSnippet:es}),eu={kernelName:i.jMg,backendName:"webgl",kernelFunc:el},ed=m+`
  return atan(a, b);
`,ec=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+C+`
  return result;
`,ep=binaryKernelFunc({opSnippet:ed,packedOpSnippet:ec}),eh={kernelName:i.QCc,backendName:"webgl",kernelFunc:ep},ef=w.D1+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,em=unaryKernelFunc({opSnippet:ef}),ex={kernelName:i.Oyi,backendName:"webgl",kernelFunc:em};/**
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
 */let Pool2DProgram=class Pool2DProgram{constructor(e,t,r,a=!1,n=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let o=e.filterWidth,i=e.strideHeight,s=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,d=e.effectiveFilterHeight,c=e.effectiveFilterWidth,p=e.padInfo.top,h=e.padInfo.left;this.outputShape=e.outShape;let f="avg"===t,m=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,x=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,g="0.0";if(f||(g="-1.0 / 1e-20"),r){this.userCode=`
        const ivec2 strides = ivec2(${i}, ${s});
        const ivec2 pads = ivec2(${p}, ${h});

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

          for (int wR = 0; wR < ${d};
              wR += ${l}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${c};
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
                minMaxPosition = ${a?n?m:x:`wR * ${c} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let C=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(C="avgValue / max(count, 1.0)");let b=4*Math.floor(o/4),v=o%4,y=`
      if (${f}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${i}, ${s});
      const ivec2 pads = ivec2(${p}, ${h});
      const float initializationValue = ${g};
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
        vec4 minMaxValue = vec4(${g});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${d};
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

            ${y}
          }

          int xC = xCCorner + ${b};
          if (${1===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${y}
          } else if (${2===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${y}
          } else if (${3===v}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${y}
          }
        }
        setOutput(${C});
      }
    `}};let Pool3DProgram=class Pool3DProgram{constructor(e,t,r,a=!1,n=!1){if(this.variableNames=["x"],"avg"===t&&r)throw Error("Cannot compute positions for average pool.");let o=e.filterWidth,i=e.strideDepth,s=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,d=e.dilationHeight,c=e.dilationWidth,p=e.effectiveFilterDepth,h=e.effectiveFilterHeight,f=e.effectiveFilterWidth,m=e.padInfo.front,x=e.padInfo.top,g=e.padInfo.left;this.outputShape=e.outShape;let C="avg"===t,b="0.0";if(C||(b="-1.0 / 1e-20"),r){this.userCode=`
        const ivec3 strides =
            ivec3(${i}, ${s}, ${l});
        const ivec3 pads = ivec3(${m}, ${x}, ${g});

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

          for (int wD = 0; wD < ${p};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${h};
                wR += ${d}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${f};
                  wC += ${c}) {
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
                  minMaxPosition = ${a?n?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${h} * ${f} +
                      wR * ${f} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / max(count, 1.0)");let y=4*Math.floor(o/4),I=o%4,$=`
      if (${C}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${i}, ${s}, ${l});
      const ivec3 pads = ivec3(${m}, ${x}, ${g});
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

        for (int wD = 0; wD < ${p};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${h};
            wR += ${d}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${y}; wC += 4) {
              int xC = xCCorner + wC * ${c};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                getValue(batch, xD, xR, xC + 2 * ${c}, ch),
                getValue(batch, xD, xR, xC + 3 * ${c}, ch)
              );

              ${$}
            }

            int xC = xCCorner + ${y};
            if (${1===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${$}
            } else if (${2===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                initializationValue,
                initializationValue
              );

              ${$}
            } else if (${3===I}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${c}, ch),
                getValue(batch, xD, xR, xC + 2 * ${c}, ch),
                initializationValue
              );

              ${$}
            }
          }
        }
        setOutput(${v});
      }
    `}};let eg={kernelName:i.JhU,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;(0,d.assertNotComplex)(n,"avgPool");let{filterSize:o,strides:s,pad:l,dimRoundingMode:u}=a;i.D5U.assert(i.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let c=i.backend_util.computePool2DInfo(n.shape,o,s,1,l,u);if(1===c.filterWidth&&1===c.filterHeight&&i.D5U.arraysEqual(c.inShape,c.outShape))return identity({inputs:{x:n},backend:r});let p=new Pool2DProgram(c,"avg",!1);return r.runWebGLProgram(p,[n],"float32")}},eC={kernelName:i._k9,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:o,strides:s,pad:l,dimRoundingMode:u,dataFormat:d}=a,c=i.backend_util.computePool3DInfo(n.shape,o,s,[1,1,1],l,u,d),p=new Pool3DProgram(c,"avg",!1);return r.runWebGLProgram(p,[n],"float32")}};/**
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
 */let AvgPool2DBackpropProgram=class AvgPool2DBackpropProgram{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,o=e.dilationHeight,i=e.dilationWidth,s=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=s-1-e.padInfo.top,d=l-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${u}, ${d});
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
            wR += ${o}) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${l};
            wC+= ${i}) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

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
    `}};let AvgPool3DBackpropProgram=class AvgPool3DBackpropProgram{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,a=e.filterWidth,n=e.strideDepth,o=e.strideHeight,i=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,d=e.effectiveFilterDepth,c=e.effectiveFilterHeight,p=e.effectiveFilterWidth,h=d-1-e.padInfo.front,f=c-1-e.padInfo.top,m=p-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${h}, ${f}, ${m});
      const float avgMultiplier = float(${1/(t*r*a)});

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

        for (int wD = 0; wD < ${d};
            wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${n}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${l}) {
            float dyR = float(dyRCorner + wR) / ${o}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${p};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

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
    `}};let eb={kernelName:i.IMb,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:o}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:d}=a,c=i.backend_util.computePool3DInfo(o.shape,s,l,[1,1,1],u,d),p=new AvgPool3DBackpropProgram(c);return r.runWebGLProgram(p,[n],o.dtype)}},ev={kernelName:i.ROF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:o}=t;(0,d.assertNotComplex)([n,o],"avgPoolGrad");let{filterSize:s,strides:l,pad:u}=a,c=i.backend_util.computePool2DInfo(o.shape,s,l,1,u),p=new AvgPool2DBackpropProgram(c);return r.runWebGLProgram(p,[n],o.dtype)}},ey={kernelName:i.XLW,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{a:n,b:o}=t,{transposeA:i,transposeB:s}=a;return batchMatMulImpl({a:n,b:o,transposeA:i,transposeB:s,backend:r})}};/**
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
 */let BatchNormProgram=class BatchNormProgram{constructor(e,t,r,a,n,o){this.outputShape=[],this.variableNames=["x","mean","variance"],i.backend_util.assertAndGetBroadcastShape(e,t),i.backend_util.assertAndGetBroadcastShape(e,r);let s="0.0";null!=a&&(i.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="1.0";null!=n&&(i.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${s};
        float scale = ${l};
        float inv = scale * inversesqrt(variance + float(${o}));
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
 */let BatchNormPackedProgram=class BatchNormPackedProgram{constructor(e,t,r,a,n,o){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],i.backend_util.assertAndGetBroadcastShape(e,t),i.backend_util.assertAndGetBroadcastShape(e,r);let s="vec4(0.0)";null!=a&&(i.backend_util.assertAndGetBroadcastShape(e,a),this.variableNames.push("offset"),s="getOffsetAtOutCoords()");let l="vec4(1.0)";null!=n&&(i.backend_util.assertAndGetBroadcastShape(e,n),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${s};
        vec4 scale = ${l};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${o}));

        setOutput((x - mean) * inv + offset);
      }
    `}};let eI={kernelName:i.sHE,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a,mean:n,variance:o,offset:s,scale:l}=e;i.D5U.assert(n.shape.length===o.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),i.D5U.assert(null==s||n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),i.D5U.assert(null==l||n.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=r;null==u&&(u=.001);let d=[a,n,o],c=null;null!=s&&(c=s.shape,d.push(s));let p=null;null!=l&&(p=l.shape,d.push(l));let h=(0,i.OBj)().getBool("WEBGL_PACK_NORMALIZATION")?new BatchNormPackedProgram(a.shape,n.shape,o.shape,c,p,u):new BatchNormProgram(a.shape,n.shape,o.shape,c,p,u),f=t.runWebGLProgram(h,d,d[0].dtype);return f}};/**
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
 */let SliceProgram=class SliceProgram{constructor(e){let t;this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let r=(0,g.kW)(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let a=function(e){if(1===e)return"sourceLoc";if(e<=6)return e$.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}(this.rank),n=e.map((e,t)=>`sourceLoc.${e$[t]} = start[${t}] + coords.${e$[t]};`);t=`
        ${r} sourceLoc;
        ${r} coords = getOutputCoords();
        ${n.join("\n")}
      `,this.userCode=`
      void main() {
        ${t}
        setOutput(getSource(${a}));
      }
    `}};let e$=["x","y","z","w","u","v"];/**
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
 */let SlicePackedProgram=class SlicePackedProgram{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=(0,g.kW)(this.rank),r=(0,x.Ky)("coords",this.rank),a=(0,x.Ky)("sourceLoc",this.rank),n=1===this.rank?"sourceLoc":`vec2(${a.slice(-2).join()})`,o=`getChannel(getSource(${a.join()}), ${n})`,i=`
      result.x = ${o};
      if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
        ++${a[this.rank-1]};
        result.y = ${o};
        --${a[this.rank-1]};
      }
    `,s=1===this.rank?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${e[this.rank-2]}) {
        ++${a[this.rank-2]};
        result.z = ${o};
        if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
          ++${a[this.rank-1]};
          result.w = ${o};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${a[t]} = ${r[t]} + start[${t}];`).join("\n");this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${l}
        vec4 result = vec4(0.);
        ${i}
        ${s}
        setOutput(result);
      }
    `}};function slice(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{begin:o,size:s}=a,[l,u]=i.kuN.parseSliceParams(n,o,s);if(i.kuN.assertParamsValid(n,l,u),0===i.D5U.sizeFromShape(u))return r.makeTensorInfo(u,n.dtype,[]);if(r.shouldExecuteOnCPU([n])||"string"===n.dtype){let e=r.texData.get(n.dataId),t=(0,E.nT)(e.values,l,u,n.shape,n.dtype);return r.makeTensorInfo(u,n.dtype,t)}let{isPacked:d}=r.texData.get(n.dataId),c=i.kuN.isSliceContinous(n.shape,l,u);if(d||!c){let e=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new SlicePackedProgram(u):new SliceProgram(u),t=[l];return r.runWebGLProgram(e,[n],n.dtype,t)}return r.uploadToGPU(n.dataId),/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,a){let n=a.texData.get(e.dataId),o=a.makeTensorInfo(r,e.dtype),s=a.texData.get(o.dataId);Object.assign(s,n),s.refCount=1,s.shape=r,s.dtype=e.dtype;let l=i.kuN.computeFlatOffset(t,i.D5U.computeStrides(e.shape));n.slice&&(l+=n.slice.flatOffset),s.slice={flatOffset:l,origDataId:n.slice&&n.slice.origDataId||e.dataId};let u=a.dataRefCount.get(s.slice.origDataId)||1;return a.dataRefCount.set(s.slice.origDataId,u+1),o}(n,l,u,r)}let ek={kernelName:i.p2w,backendName:"webgl",kernelFunc:slice},eR={kernelName:i.zws,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:o,crops:s}=a;i.D5U.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let l=o.reduce((e,t)=>e*t),u=i.backend_util.getReshaped(n.shape,o,l),d=i.backend_util.getPermuted(u.length,o.length),c=i.backend_util.getReshapedPermuted(n.shape,o,l),p=i.backend_util.getSliceBeginCoords(s,o.length),h=i.backend_util.getSliceSize(c,s,o.length),f=[],m=reshape({inputs:{x:n},backend:r,attrs:{shape:u}}),x=transpose({inputs:{x:m},backend:r,attrs:{perm:d}}),g=reshape({inputs:{x:x},backend:r,attrs:{shape:c}}),C=slice({inputs:{x:g},backend:r,attrs:{begin:p,size:h}});return f.push(m),f.push(x),f.push(g),f.forEach(e=>r.disposeIntermediateTensorInfo(e)),C}},eT={kernelName:i.zvY,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:o}=t,{size:i}=a,s=r.readSync(n.dataId),l=r.readSync(o.dataId),u=(0,E.qO)(s,l,o.dtype,o.shape,i);return r.makeTensorInfo([i],o.dtype,u)}},ew=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,eN=`
  return float(int(a.r) & int(b.r));
`,eS={kernelName:i.hCO,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:a}=e,{a:n,b:o}=r,s=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS"),l=(0,i.OBj)().getNumber("WEBGL_VERSION");if(a.shouldExecuteOnCPU([n,o])||1===l){let e=a.texData.get(n.dataId).values,t=a.texData.get(o.dataId).values,[r,i]=(0,E.XM)(n.shape,o.shape,e,t,n.dtype),s=a.makeTensorInfo(i,n.dtype),l=a.texData.get(s.dataId);return l.values=r,s}return t=s?new BinaryOpPackedProgram(ew,n.shape,o.shape,!1):new BinaryOpProgram(eN,n.shape,o.shape),a.runWebGLProgram(t,[n,o],n.dtype)}},eF={kernelName:i.eEB,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{s0:a,s1:n}=t,o=r.readSync(a.dataId),s=r.readSync(n.dataId),l=i.backend_util.assertAndGetBroadcastShape(Array.from(o),Array.from(s));return r.makeTensorInfo([l.length],"int32",Int32Array.from(l))}},eE=binaryKernelFunc({opSnippet:"return float(a != b);",cpuKernelImpl:E.cZ,dtype:"bool"}),eA={kernelName:i.yQU,backendName:"webgl",kernelFunc:eE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function real(e){let{inputs:t,backend:r}=e,{input:a}=t,n=r.texData.get(a.dataId);return identity({inputs:{x:n.complexTensorInfos.real},backend:r})}let eO={kernelName:i.xJR,backendName:"webgl",kernelFunc:real},eP={kernelName:i.RFZ,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cast(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{dtype:o}=a;if("complex64"===o){if("complex64"===n.dtype)return identity({inputs:{x:n},backend:r});let e=i.lls(n.shape),t=cast({inputs:{x:n},backend:r,attrs:{dtype:"float32"}}),a=complex({inputs:{real:t,imag:e},backend:r});return e.dispose(),r.disposeIntermediateTensorInfo(t),a}if("complex64"===n.dtype){let e=real({inputs:{input:n},backend:r}),t=cast({inputs:{x:e},backend:r,attrs:{dtype:o}});return r.disposeIntermediateTensorInfo(e),t}if(!i.D5U.hasEncodingLoss(n.dtype,o)){let e=identity({inputs:{x:n},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:o}}if(r.shouldExecuteOnCPU([n])){let e=r.texData.get(n.dataId).values,[t,a,i]=(0,E.cm)(e,n.shape,n.dtype,o);return r.makeTensorInfo(t,a,i)}if("int32"===o)return function(e,t){let r=new w.l(e.shape,"return float(int(x));"),a=t.runWebGLProgram(r,[e],"int32");return{dataId:a.dataId,shape:a.shape,dtype:a.dtype}}(n,r);if("bool"===o){let e=r.makeTensorInfo([],"bool",i.D5U.getTypedArrayFromDType("bool",1)),t=eE({inputs:{a:n,b:e},backend:r});return r.disposeIntermediateTensorInfo(e),t}throw Error(`Error in Cast: failed to cast ${n.dtype} to ${o}`)}},e_="return ceil(x);",eD=unaryKernelFunc({opSnippet:e_,packedOpSnippet:e_,cpuKernelImpl:E.pk}),eB={kernelName:i.gJX,backendName:"webgl",kernelFunc:eD};/**
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
    `}};let eL={kernelName:i.xnO,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{clipValueMin:s,clipValueMax:l}=n;t=(0,i.OBj)().getBool("WEBGL_PACK_CLIP")?new ClipPackedProgram(o.shape):new ClipProgram(o.shape);let u=[[s],[l]];return a.runWebGLProgram(t,[o],o.dtype,u)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
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
 */function makeComplexComponentTensorInfo(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}let eV={kernelName:i.yj2,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r}=e,{x:a}=t,n=r.texData.get(a.dataId),o=new ComplexAbsProgram(a.shape),i=[makeComplexComponentTensorInfo(a,n.complexTensorInfos.real),makeComplexComponentTensorInfo(a,n.complexTensorInfos.imag)];return r.runWebGLProgram(o,i,i[0].dtype)}};/**
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
 */let ConcatProgram=class ConcatProgram{constructor(e){this.outputShape=[],this.outputShape=i.backend_util.computeOutShape(e,1),this.variableNames=e.map((e,t)=>`T${t}`);let t=Array(e.length-1);t[0]=e[0][1];for(let r=1;r<t.length;r++)t[r]=t[r-1]+e[r][1];let r=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){let a=t[e-1];r.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${a}));`)}let a=t.length,n=t[t.length-1];r.push(`else setOutput(getT${a}(yR, yC-${n}));`),this.userCode=`
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
 */let ConcatPackedProgram=class ConcatPackedProgram{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=i.backend_util.computeOutShape(e,t);let r=this.outputShape,a=r.length,n=(0,g.kW)(a),o=(0,x.Ky)("coords",a),s=["x","y","z","w","u","v"].slice(0,a);this.variableNames=e.map((e,t)=>`T${t}`);let l=Array(e.length-1);l[0]=e[0][t];for(let r=1;r<l.length;r++)l[r]=l[r-1]+e[r][t];let u=s[t],d=s.slice(-2),c=s.join(),p=`if (${u} < ${l[0]}) {
        return getChannel(
            getT0(${c}), vec2(${d.join()}));
        }`;for(let e=1;e<l.length;e++){let t=l[e-1];p+=`
        if (${u} < ${l[e]}  && ${u} >= ${l[e-1]}) {
          return getChannel(
            getT${e}(${shiftedChannels(s,u,t)}),
            vec2(${shiftedChannels(d,u,t)}));
        }`}let h=l.length,f=l[l.length-1];p+=`
        return getChannel(
          getT${h}(${shiftedChannels(s,u,f)}),
          vec2(${shiftedChannels(d,u,f)}));`,this.userCode=`
      float getValue(${s.map(e=>"int "+e)}) {
        ${p}
      }

      void main() {
        ${n} coords = getOutputCoords();
        vec4 result = vec4(getValue(${o}), 0., 0., 0.);

        ${o[a-1]} = ${o[a-1]} + 1;
        if (${o[a-1]} < ${r[a-1]}) {
          result.g = getValue(${o});
        }

        ${o[a-2]} = ${o[a-2]} + 1;
        if (${o[a-2]} < ${r[a-2]}) {
          result.a = getValue(${o});
        }

        ${o[a-1]} = ${o[a-1]} - 1;
        if (${o[a-2]} < ${r[a-2]} &&
            ${o[a-1]} < ${r[a-1]}) {
          result.b = getValue(${o});
        }
        setOutput(result);
      }
    `}};function shiftedChannels(e,t,r){let a=e.indexOf(t),n=e.map((e,t)=>t===a?`${e} - ${r}`:e);return n.join()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function imag(e){let{inputs:t,backend:r}=e,{input:a}=t,n=r.texData.get(a.dataId);return identity({inputs:{x:n.complexTensorInfos.imag},backend:r})}let eU={kernelName:i.J_u,backendName:"webgl",kernelFunc:imag};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concat(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a,o=i.D5U.parseAxisParam(n,t[0].shape)[0],s=t.map(e=>e.shape);i.backend_util.assertParamsConsistent(s,o);let l=i.backend_util.computeOutShape(t.map(e=>e.shape),o);if(0===i.D5U.sizeFromShape(l))return r.makeTensorInfo(l,t[0].dtype,[]);let u=t.filter(e=>i.D5U.sizeFromShape(e.shape)>0);return 1===u.length?identity({inputs:{x:u[0]},backend:r}):/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function concatImpl(e,t,r){let a=e[0].dtype;if("complex64"===a){let a=e.map(e=>real({inputs:{input:e},backend:r})),n=e.map(e=>imag({inputs:{input:e},backend:r})),o=concatImpl(a,t,r),i=concatImpl(n,t,r),s=complex({inputs:{real:o,imag:i},backend:r});return a.forEach(e=>r.disposeIntermediateTensorInfo(e)),n.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.disposeIntermediateTensorInfo(o),r.disposeIntermediateTensorInfo(i),s}let n=r.shouldExecuteOnCPU(e);if("string"===a&&(n=!0),n){let n=e.map(e=>{let a=i.D5U.sizeFromShape(e.shape.slice(t));return reshape({inputs:{x:e},backend:r,attrs:{shape:[-1,a]}})}),o=n.map(e=>({vals:r.readSync(e.dataId),shape:e.shape})),s=i.backend_util.computeOutShape(n.map(e=>e.shape),1),l=1===n[0].shape[0],u=(0,E.n7)(o,s,a,l),d=i.backend_util.computeOutShape(e.map(e=>e.shape),t),c=r.makeTensorInfo(d,a,u);return n.forEach(e=>r.disposeIntermediateTensorInfo(e)),c}let o=e.filter(e=>i.D5U.sizeFromShape(e.shape)>0),s=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&o[0].shape.length>1;if(1===o.length){let t=s?new w.l(e[0].shape,w.bl):new N.cc(e[0].shape,w.bl);return r.runWebGLProgram(t,e,a)}let l=(0,i.OBj)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(o.length>l){let e=[];for(let a=0;a<o.length;a+=l){let n=o.slice(a,a+l);e.push(concatImpl(n,t,r))}let a=concatImpl(e,t,r);for(let t of e)r.disposeIntermediateTensorInfo(t);return a}if(s){let e=new ConcatPackedProgram(o.map(e=>e.shape),t);return r.runWebGLProgram(e,o,a)}let{tensors2D:u,outShape:d}=function(e,t,r){let a=i.backend_util.computeOutShape(e.map(e=>e.shape),t),n=e.map(e=>reshape({inputs:{x:e},attrs:{shape:[-1,i.D5U.sizeFromShape(e.shape.slice(t))]},backend:r}));return{tensors2D:n,outShape:a}}(o,t,r),c=new ConcatProgram(u.map(e=>e.shape)),p=r.runWebGLProgram(c,u,a);u.forEach(e=>r.disposeIntermediateTensorInfo(e));let h=reshape({inputs:{x:p},attrs:{shape:d},backend:r});return r.disposeIntermediateTensorInfo(p),h}(u,o,r)}let eW={kernelName:i.Eh3,backendName:"webgl",kernelFunc:concat};/**
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
 */let Conv2DProgram=class Conv2DProgram{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let o=e.padInfo.top,i=e.padInfo.left,s=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,d=e.dilationWidth,c=e.filterHeight,p=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4,m="channelsLast"===e.dataFormat,x="",g="";r&&(x=a?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,g="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${x}

      const ivec2 strides = ivec2(${s}, ${l});
      const ivec2 pads = ivec2(${o}, ${i});

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
        for (int wR = 0; wR < ${c}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${p}; wC++) {
            int xC = xCCorner + wC * ${d};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${h}; d1 += 4) {
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

            if (${1===f}) {

              if (${m}) {
                dotProd +=
                    getX(batch, xR, xC, ${h}) *
                    getW(wR, wC, ${h}, d2);
              } else {
                dotProd +=
                    getX(batch, ${h}, xR, xC) *
                    getW(wR, wC, ${h}, d2);
              }

            } else if (${2===f}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2)
              );

              if (${m}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${3===f}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${h}, d2),
                getW(wR, wC, ${h} + 1, d2),
                getW(wR, wC, ${h} + 2, d2)
              );

              if (${m}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${h}),
                  getX(batch, xR, xC, ${h} + 1),
                  getX(batch, xR, xC, ${h} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${h}, xR, xC),
                  getX(batch, ${h} + 1, xR, xC),
                  getX(batch, ${h} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${t?"result += getBiasAtOutCoords();":""}
        ${g}
        setOutput(result);
      }
    `}};let Conv3DProgram=class Conv3DProgram{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,r=e.padInfo.top,a=e.padInfo.left,n=e.strideDepth,o=e.strideHeight,i=e.strideWidth,s=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,d=e.filterDepth,c=e.filterHeight,p=e.filterWidth,h=4*Math.floor(e.inChannels/4),f=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${n}, ${o}, ${i});
      const ivec3 pads = ivec3(${t}, ${r}, ${a});

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
        for (int wF = 0; wF < ${d}; wF++) {
          int xF = xFCorner + wF * ${s};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${c}; wR++) {
            int xR = xRCorner + wR * ${l};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${p}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${h}; d1 += 4) {
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

              if (${1===f}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${h}) *
                  getW(wF, wR, wC, ${h}, d2);
              } else if (${2===f}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${3===f}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${h}),
                  getX(batch, xF, xR, xC, ${h} + 1),
                  getX(batch, xF, xR, xC, ${h} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${h}, d2),
                  getW(wF, wR, wC, ${h} + 1, d2),
                  getW(wF, wR, wC, ${h} + 2, d2)
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
 */let Conv2DPackedProgram=class Conv2DPackedProgram{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let o=e.padInfo.left,s=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,d=e.filterWidth,c=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<d;e++)c+=`
           vec4 xTexelC${2*e};
           int xTexelC${2*e}Ready;
           vec4 xTexelC${2*e+1};
           int xTexelC${2*e+1}Ready;
           vec4 xC${e};`;c+=`
     for (int r = 0; r < ${u}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let e=0;e<d;e++)c+=`
           xTexelC${2*e} = vec4(0.0);
           xTexelC${2*e}Ready = 0;
           xTexelC${2*e+1} = vec4(0.0);
           xTexelC${2*e+1}Ready = 0;
           xC${e} = vec4(0.0);`;c+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let t=0;t<(d+1)/2;t++){let r=2*t;if(c+=`
           xC = xCCorner + ${r*l};
           `,1===s){if(r<d&&(o%2==1?(c+=`
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
               `,1===l&&r>0?c+=`
                 xC${r} = vec4(xTexelC${r-2}.zw, xTexelC${r}.xy);
                 `:c+=`
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
                   `):c+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${r}Ready == 0) {
                   xTexelC${r} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${r}.zw = vec2(0.0);
                   }
                   xTexelC${r}Ready = 1;
                 }

                 xC${r} = xTexelC${r};
                 `,r+1<d)){let e=o%2==0?i.D5U.nearestLargerEven(l):l;l%2==0&&o%2==1||l%2!=0&&o%2!=1?(c+=`
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
                   `,l>1?c+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${r+1} = vec4(previous.zw, xTexelC${r+1}.xy);
                     } else {
                      xC${r+1} = vec4(0.0, 0.0, xTexelC${r+1}.xy);
                     }
                     `:c+=`
                     xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.xy);
                     `):1===e?c+=`
                     xC${r+1} = xTexelC${r};
                     `:c+=`
                     xCOffset = xC + ${e};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${r+1}Ready == 0) {
                       xTexelC${r+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${r+1}.zw = vec2(0.0);
                       }
                       xTexelC${r+1}Ready = 1;
                     }

                     xC${r+1} = xTexelC${r+1};
                     `}}else r<d&&(o%2==1?(c+=`
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
               `,r+1<d&&(c+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${r+1} = vec4(xTexelC${r+1}.xy, final.xy);
                 `)):(c+=`
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
               `,r+1<d&&(c+=`
                   xC${r+1} = vec4(xTexelC${r}.zw, xTexelC${r+1}.zw);
                 `)));r<d&&(c+=`
             wTexel = getW(r, ${r}, d1, d2);
             dotProd += xC${r}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${r}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,r+1<d&&(c+=`
               wTexel = getW(r, ${r+1}, d1, d2);
               dotProd += xC${r+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${r+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}c+=`
     }
   
     }
   
     }
   `;let p="",h="";r&&(p=a?`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:n?`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:`vec4 activation(vec4 x) {
           ${r}
         }`,h="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${p}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${c}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${t?"result += getBiasAtOutCoords();":""}
         ${h}
         setOutput(result);
       }
     `}};var eM=r(85066);/**
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
 */let Im2ColPackedProgram=class Im2ColPackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let{dataFormat:r}=t,a=(0,eM.A)(),n="channelsLast"===r,o=n?1:2,i=n?2:3,s=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)l+=`
          blockIndex = rc.z + ${t};
          pos = rc.y + ${e};

          ${s}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${o}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${i}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${n}) {
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

        ${a.output} = result;
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
 */function getShapeForBatchMatMul(e,t){let r=e.length;return r>=3?t?[...e.slice(0,-3),e[r-3]*e[r-2],e[r-1]]:[...e.slice(0,-3),e[r-3],e[r-2]*e[r-1]]:!t&&1===r&&e[0]>1?[e[0],1]:null}function conv2dByMatMul({x:e,filter:t,convInfo:r,backend:a,bias:n=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:l=null}){let u;let c=e.shape,p=a.texData.get(e.dataId),h=r.inChannels,f=c[0]*c[1]*c[2],m=r.outChannels,x="channelsLast"===r.dataFormat,g=[];if(null!=o){let e=getShapeForBatchMatMul(o.shape,x);null!=e&&(o=reshape({inputs:{x:o},backend:a,attrs:{shape:e}}),g.push(o))}if(null!=n){let e=getShapeForBatchMatMul(n.shape,x);null!=e&&(n=reshape({inputs:{x:n},backend:a,attrs:{shape:e}}),g.push(n))}let C=!((1===f||1===m)&&h>1e3)&&p.isPacked&&x&&null!=p.texture&&c[2]%2!=0&&i.D5U.arraysEqual(p.shape.slice(-3),c.slice(-3));if(C){let h=c[0]*c[1]*(c[2]+1),f={dataId:e.dataId,shape:[1,h,r.inChannels],dtype:e.dtype},m=p.shape;p.shape=p.shape.slice(),p.shape[p.shape.length-2]++,i.D5U.assert(d.isReshapeFree(p.shape,f.shape),()=>`packed reshape ${p.shape} to ${f.shape} isn't free`);let x=reshape({inputs:{x:t},backend:a,attrs:{shape:[1,r.inChannels,r.outChannels]}});g.push(x);let C=batchMatMulImpl({a:f,b:x,backend:a,transposeA:!1,transposeB:!1,bias:n,activation:l,preluActivationWeights:o,leakyreluAlpha:s}),b=a.texData.get(C.dataId);i.D5U.assert(b.isPacked,()=>"batchMatMul result is expected to be packed"),p.shape=m,b.shape=r.outShape,(u=identity({inputs:{x:C},backend:a})).shape=r.outShape,g.push(C)}else{let i=r.outHeight*r.outWidth,d=reshape({inputs:{x:e},backend:a,attrs:{shape:x?[r.batchSize,i,r.inChannels]:[r.batchSize,r.inChannels,i]}}),c=reshape({inputs:{x:t},backend:a,attrs:{shape:[1,r.inChannels,r.outChannels]}}),p=batchMatMulImpl({a:x?d:c,b:x?c:d,transposeA:!x,transposeB:!1,backend:a,bias:n,activation:l,preluActivationWeights:o,leakyreluAlpha:s});u=reshape({inputs:{x:p},backend:a,attrs:{shape:r.outShape}}),g.push(d),g.push(c),g.push(p)}for(let e of g)a.disposeIntermediateTensorInfo(e);return u}function conv2dWithIm2Row({x:e,filter:t,convInfo:r,backend:a,bias:n=null,preluActivationWeights:o=null,leakyreluAlpha:s=0,activation:l=null}){let{filterWidth:u,filterHeight:d,inChannels:c,outWidth:p,outHeight:h,dataFormat:f}=r,m="channelsLast"===f,x=u*d*c,g=h*p,C=[r.batchSize,x,g],b=[];if(null!=o){let e=getShapeForBatchMatMul(o.shape,m);null!=e&&(o=reshape({inputs:{x:o},backend:a,attrs:{shape:e}}),b.push(o))}if(null!=n){let e=getShapeForBatchMatMul(n.shape,m);null!=e&&(n=reshape({inputs:{x:n},backend:a,attrs:{shape:e}}),b.push(n))}let v=reshape({inputs:{x:t},backend:a,attrs:{shape:[1,x,i.D5U.sizeFromShape(t.shape)/x]}});b.push(v);let y=new Im2ColPackedProgram(C,r),I=[e.shape,[r.padInfo.top,r.padInfo.left],[r.strideHeight,r.strideWidth],[r.dilationHeight,r.dilationWidth],[r.inChannels],[r.filterWidth*r.inChannels],[r.outWidth]],$=a.runWebGLProgram(y,[e],"float32",I),k=reshape({inputs:{x:$},backend:a,attrs:{shape:C}});b.push($),b.push(k);let R=null!=n,T=null!=o,w="leakyrelu"===l,N=l?mapActivationToShaderProgram(l,!0):null,S=new MatMulPackedProgram(m?k.shape:v.shape,m?v.shape:k.shape,m?[r.batchSize,g,r.outChannels]:[r.batchSize,r.outChannels,g],!0,!1,R,N,T,w),F=m?[k,v]:[v,k];if(n&&F.push(n),T&&F.push(o),w){let e=a.makeTensorInfo([],"float32",i.D5U.createScalarValue(s,"float32"));F.push(e),b.push(e)}let E=a.runWebGLProgram(S,F,"float32"),A=reshape({inputs:{x:E},backend:a,attrs:{shape:r.outShape}});for(let e of(b.push(E),b))a.disposeIntermediateTensorInfo(e);return A}let eG={kernelName:i.mhS,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o,filter:s}=r,{strides:l,pad:u,dataFormat:d,dilations:c,dimRoundingMode:p}=n,h=i.backend_util.convertConv2DDataFormat(d),f=i.backend_util.computeConv2DInfo(o.shape,s.shape,l,c,u,p,!1,h);if(1===f.filterHeight&&1===f.filterWidth&&1===f.dilationHeight&&1===f.dilationWidth&&1===f.strideHeight&&1===f.strideWidth&&("SAME"===f.padInfo.type||"VALID"===f.padInfo.type))t=conv2dByMatMul({x:o,filter:s,convInfo:f,backend:a});else if(f.strideWidth<=2&&"channelsLast"===h&&(0,i.OBj)().getBool("WEBGL_EXP_CONV")){let e=new Conv2DPackedProgram(f),r=[[f.padInfo.top,f.padInfo.left],[f.strideHeight,f.strideWidth],[f.dilationHeight,f.dilationWidth],[f.inHeight,f.inWidth]];t=a.runWebGLProgram(e,[o,s],"float32",r)}else if((0,i.OBj)().getBool("WEBGL_CONV_IM2COL"))t=conv2dWithIm2Row({x:o,filter:s,convInfo:f,backend:a});else{let e=new Conv2DProgram(f);t=a.runWebGLProgram(e,[o,s],"float32")}let m=reshape({inputs:{x:t},backend:a,attrs:{shape:f.outShape}});return a.disposeIntermediateTensorInfo(t),m}};/**
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
 */let Conv2DDerFilterProgram=class Conv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,a=e.padInfo.top,n=e.padInfo.left,o="channelsLast"===e.dataFormat;this.userCode=`
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
            int xR = wR + yR * ${t} - ${a};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${n};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${o?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}};let Conv2DDerInputProgram=class Conv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,o="channelsLast"===e.dataFormat,i=t-1-e.padInfo.top,s=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${o?3:1}];

        ivec2 dyCorner = ivec2(coords[${o?1:2}], coords[${o?2:3}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${o}) {
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
    `}};let Conv3DDerFilterProgram=class Conv3DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,r=e.strideHeight,a=e.strideWidth,n=e.padInfo.front,o=e.padInfo.top,i=e.padInfo.left;this.userCode=`
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
            int xF = wF + yF * ${t} - ${n};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${o};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${a} - ${i};

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
    `}};let Conv3DDerInputProgram=class Conv3DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,a=e.filterWidth,n=e.strideDepth,o=e.strideHeight,i=e.strideWidth,s=t-1-e.padInfo.front,l=r-1-e.padInfo.top,u=a-1-e.padInfo.left;this.userCode=`
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
          float dyF = float(dyFCorner + wF) / ${n}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${o}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${a}; wC++) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${a} - 1 - wC;

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
    `}};let ez={kernelName:i.wUP,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:o}=t,{strides:s,pad:l,dataFormat:u,dimRoundingMode:d,filterShape:c}=a,p=i.backend_util.convertConv2DDataFormat(u),h=i.backend_util.computeConv2DInfo(n.shape,c,s,1,l,d,!1,p),f=new Conv2DDerFilterProgram(h);return r.runWebGLProgram(f,[n,o],"float32")}};/**
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
 */let Conv2DDerInputPackedProgram=class Conv2DDerInputPackedProgram{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let t=e.filterHeight,r=e.filterWidth,a=t-1-e.padInfo.top,n=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${n});

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
    `}};let eX={kernelName:i.wm,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:o}=t,{inputShape:s,strides:l,pad:u,dataFormat:d,dimRoundingMode:c}=a,p=i.backend_util.convertConv2DDataFormat(d),h=i.backend_util.computeConv2DInfo(s,o.shape,l,1,u,c,!1,p);if((0,i.OBj)().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&"channelsLast"===p){let e=[[h.strideHeight,h.strideWidth]],t=new Conv2DDerInputPackedProgram(h);return r.runWebGLProgram(t,[n,o],"float32",e)}{let e=new Conv2DDerInputProgram(h);return r.runWebGLProgram(e,[n,o],"float32")}}},eH={kernelName:i.x12,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,filter:o}=t,{strides:s,pad:l,dilations:u}=a,d=i.backend_util.computeConv3DInfo(n.shape,o.shape,s,u,l),c=new Conv3DProgram(d);return r.runWebGLProgram(c,[n,o],"float32")}},ej={kernelName:i.o2y,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:o}=t,{strides:s,pad:l,filterShape:u}=a,d=i.backend_util.computeConv3DInfo(n.shape,u,s,1,l),c=new Conv3DDerFilterProgram(d);return r.runWebGLProgram(c,[n,o],"float32")}},eK={kernelName:i.ik2,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:o}=t,{pad:s,strides:l,inputShape:u}=a,d=i.backend_util.computeConv3DInfo(u,o.shape,l,1,s),c=new Conv3DDerInputProgram(d);return r.runWebGLProgram(c,[n,o],"float32")}},eY=S+`
  return cos(x);
`,eq=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${C}
  return result;
`,eQ=unaryKernelFunc({opSnippet:eY,packedOpSnippet:eq}),eZ={kernelName:i.mc4,backendName:"webgl",kernelFunc:eQ},eJ=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,e0=unaryKernelFunc({opSnippet:eJ}),e1={kernelName:i.TR1,backendName:"webgl",kernelFunc:e0};/**
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
 */let CropAndResizeProgram=class CropAndResizeProgram{constructor(e,t,r,a,n){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[o,i,s,l]=e,[u]=t,[d,c]=r;this.outputShape=[u,d,c,l];let[p,h]=[`${i-1}.0`,`${s-1}.0`],[f,m,x]=d>1?[`${(i-1)/(d-1)}`,"(y2-y1) * height_ratio",`y1*${p} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${p}`],[g,C,b]=c>1?[`${(s-1)/(c-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${f});
      const float width_ratio = float(${g});
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
        if(bInd < 0 || bInd >= ${o}) {
          return;
        }

        float height_scale = ${m};
        float width_scale = ${C};

        float in_y = ${x};
        if( in_y < 0.0 || in_y > ${p} ) {
          setOutput(float(${n}));
          return;
        }
        float in_x = ${b};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${n}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${"bilinear"===a?1:0} == 1) {
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
    `}};let e2={kernelName:i.VcC,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{image:n,boxes:o,boxInd:i}=t,{cropSize:s,method:l,extrapolationValue:u}=a,d=new CropAndResizeProgram(n.shape,o.shape,s,l,u);return r.runWebGLProgram(d,[n,o,i],"float32")}};(n=o||(o={})).Prod="*",n.Sum="+";let CumProgram=class CumProgram{constructor(e,t,r,a){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let n=this.outputShape.length,i=this.op===o.Prod?"1.0":"0.0",s=r?i:`getX(${cum_gpu_getCoords(n,"coords",this.op)})`,l=this.outputShape[this.outputShape.length-1],u="",d="";r?(u=a?`end != ${l-1}`:"end != 0",d=a?"end + 1":"end - 1"):(u=a?`end + pow2 < ${l}`:"end >= pow2",d=a?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${(0,g.kW)(n)} coords = getOutputCoords();
        int end = ${getFinalCoord(n,"coords",this.op)};
        float val = ${s};
        int pow2 = int(pow(2.0, index));
        if (${u}) {
          int idx = ${d};
          ${getFinalCoord(n,"coords",this.op)} = idx;
          val ${this.op}= getX(${cum_gpu_getCoords(n,"coords",this.op)});
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
 */function cumImpl(e,t,r,a,n,o){let s=t.shape.length,l=i.backend_util.getAxesPermutation([a],s),u=t;null!=l&&(u=transpose({inputs:{x:t},backend:r,attrs:{perm:l}}));let d=i.backend_util.getInnerMostAxes(1,s)[0];if(d!==s-1)throw Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${a}`);let c=u.shape[d],p=identity({inputs:{x:u},backend:r});for(let t=0;t<=Math.ceil(Math.log2(c))-1;t++){let a=new CumProgram(e,u.shape,!1,o),n=[[t]],i=p;p=r.runWebGLProgram(a,[p],p.dtype,n),r.disposeIntermediateTensorInfo(i)}if(n){let t=new CumProgram(e,u.shape,n,o),a=p;p=r.runWebGLProgram(t,[p],p.dtype),r.disposeIntermediateTensorInfo(a)}if(null!=l){let e=i.backend_util.getUndoAxesPermutation(l),t=transpose({inputs:{x:p},backend:r,attrs:{perm:e}});return r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(u),t}return p}let e4={kernelName:i.Byc,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:i,exclusive:s,reverse:l}=a;return cumImpl(o.Prod,n,r,i,s,l)}},e3={kernelName:i.iHb,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{axis:i,exclusive:s,reverse:l}=a;return cumImpl(o.Sum,n,r,i,s,l)}},e5={kernelName:i.QRR,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,weights:o}=t,{size:i,binaryOutput:s}=a;if(1===n.shape.length){let e=r.readSync(n.dataId),t=r.readSync(o.dataId),a=(0,E.qO)(e,t,o.dtype,o.shape,i);return r.makeTensorInfo([i],o.dtype,a)}if(2===n.shape.length){let e=r.bufferSync(n),t=r.bufferSync(o),a=(0,E.cx)(e,t,i,s);return r.makeTensorInfo(a.shape,o.dtype,a.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
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
  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};let e6={kernelName:i.T0n,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockSize:o,dataFormat:i}=a,s=n.shape[0],l="NHWC"===i?n.shape[1]:n.shape[2],u="NHWC"===i?n.shape[2]:n.shape[3],d="NHWC"===i?n.shape[3]:n.shape[1],c=l*o,p=u*o,h=d/(o*o),f="NHWC"===i?[s,c,p,h]:[s,h,c,p],m=new DepthToSpaceProgram(f,o,i);return r.runWebGLProgram(m,[n],n.dtype)}};/**
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
 */let DepthwiseConv2DProgram=class DepthwiseConv2DProgram{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let o=e.filterHeight,i=e.filterWidth,s=e.outChannels/e.inChannels,l="",u="";r&&(l=a?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`
          float activation(float x) {
            ${r}
          }
        `,u="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
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
        for (int wR = 0; wR < ${o}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${i}; wC++) {
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
 */let DepthwiseConvPacked2DProgram=class DepthwiseConvPacked2DProgram{constructor(e,t=!1,r=null,a=!1,n=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=(0,f.C9)(this.outputShape.length);let o=e.outChannels/e.inChannels,s=e.padInfo.left,l=e.strideWidth,u=e.dilationWidth,d=e.filterHeight,c=e.filterWidth,p=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let e=0;e<c;e++)p+=`
          vec4 xTexelC${2*e};
          int xTexelC${2*e}Ready;
          vec4 xTexelC${2*e+1};
          int xTexelC${2*e+1}Ready;
          vec4 xC${e};`;p+=`
    for (int r = 0; r < ${d}; r++) {
      `;for(let e=0;e<c;e++)p+=`
          xTexelC${2*e} = vec4(0.0);
          xTexelC${2*e}Ready = 0;
          xTexelC${2*e+1} = vec4(0.0);
          xTexelC${2*e+1}Ready = 0;
          xC${e} = vec4(0.0);`;p+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let e=0;e<(c+1)/2;e++){let t=2*e;if(p+=`
          xC = xCCorner + ${t*u};
          `,1===l){if(t<c&&(s%2==1?(p+=`
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
              `,1===u&&t>0?p+=`
                xC${t} = vec4(xTexelC${t-2}.zw, xTexelC${t}.xy);
                `:p+=`
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
                  `):p+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${t}Ready == 0) {
                  xTexelC${t} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${t}.zw = vec2(0.0);
                  }
                  xTexelC${t}Ready = 1;
                }

                xC${t} = xTexelC${t};
                `,t+1<c)){let e=s%2==0?i.D5U.nearestLargerEven(u):u;u%2==0&&s%2==1||u%2!=0&&s%2!=1?(p+=`
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
                  `,u>1?p+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${t+1} = vec4(previous.zw, xTexelC${t+1}.xy);
                    } else {
                     xC${t+1} = vec4(0.0, 0.0, xTexelC${t+1}.xy);
                    }
                    `:p+=`
                    xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.xy);
                    `):1===e?p+=`
                    xC${t+1} = xTexelC${t};
                    `:p+=`
                    xCOffset = xC + ${e};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${t+1}Ready == 0) {
                      xTexelC${t+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${t+1}.zw = vec2(0.0);
                      }
                      xTexelC${t+1}Ready = 1;
                    }

                    xC${t+1} = xTexelC${t+1};
                    `}}else t<c&&(s%2==1?(p+=`
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
              `,t+1<c&&(p+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${t+1} = vec4(xTexelC${t+1}.xy, final.xy);
                `)):(p+=`
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
              `,t+1<c&&(p+=`
                  xC${t+1} = vec4(xTexelC${t}.zw, xTexelC${t+1}.zw);
                `)));t<c&&(p+=`
            wTexel = getW(r, ${t}, d1, q);
            dotProd += xC${t} * vec4(wTexel.xz, wTexel.xz);
          `,t+1<c&&(p+=`
              wTexel = getW(r, ${t+1}, d1, q);
              dotProd += xC${t+1} * vec4(wTexel.xz, wTexel.xz);
            `))}p+=`
    }
  
      }
    `;let h="",m="";r&&(h=a?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:n?`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:`vec4 activation(vec4 x) {
          ${r}
        }`,m="result = activation(result);"),t&&this.variableNames.push("bias"),a&&this.variableNames.push("preluActivationWeights"),n&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${h}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${o};
        int q = d2 - d1 * ${o};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${p}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${t?"result += getBiasAtOutCoords();":""}
        ${m}
        setOutput(result);
      }
    `}};let e7={kernelName:i.cie,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o,filter:s}=r,{strides:l,pad:u,dilations:d,dimRoundingMode:c}=n,p=d;null==p&&(p=[1,1]),i.D5U.assert(i.backend_util.eitherStridesOrDilationsAreOne(l,p),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${p}'`);let h=i.backend_util.computeConv2DInfo(o.shape,s.shape,l,p,u,c,!0);t=(0,i.OBj)().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels==1?new DepthwiseConvPacked2DProgram(h):new DepthwiseConv2DProgram(h);let f=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]];return a.runWebGLProgram(t,[o,s],"float32",f)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let DepthwiseConv2DDerFilterProgram=class DepthwiseConv2DDerFilterProgram{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,a=e.padInfo.top,n=e.padInfo.left,o=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${o} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${a};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${n};

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
    `}};let DepthwiseConv2DDerInputProgram=class DepthwiseConv2DDerInputProgram{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,a=e.strideHeight,n=e.strideWidth,o=t-1-e.padInfo.top,i=r-1-e.padInfo.left,s=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${a}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${n}.0;

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
    `}};let e8={kernelName:i.sL$,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,dy:o}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:d,filterShape:c}=a,p=i.backend_util.computeConv2DInfo(n.shape,c,s,l,u,d,!0),h=new DepthwiseConv2DDerFilterProgram(p);return r.runWebGLProgram(h,[n,o],"float32")}},e9={kernelName:i.y7R,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,filter:o}=t,{strides:s,dilations:l,pad:u,dimRoundingMode:d,inputShape:c}=a,p=i.backend_util.computeConv2DInfo(c,o.shape,s,l,u,d,!0),h=new DepthwiseConv2DDerInputProgram(p);return r.runWebGLProgram(h,[n,o],"float32")}};/**
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
    `}};let te={kernelName:i.$w,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{x:a}=t,n=[...a.shape,...a.shape],o=i.D5U.sizeFromShape(a.shape),s=reshape({inputs:{x:a},backend:r,attrs:{shape:[o]}}),l=new DiagProgram(o),u=r.runWebGLProgram(l,[s],s.dtype),d=reshape({inputs:{x:u},backend:r,attrs:{shape:n}});return r.disposeIntermediateTensorInfo(s),r.disposeIntermediateTensorInfo(u),d}};/**
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
 */let Dilation2DProgram=class Dilation2DProgram{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:r,padInfo:a,strideHeight:n,strideWidth:o,filterHeight:i,filterWidth:s,dilationHeight:l,dilationWidth:u}=e,{top:d,left:c}=a;this.userCode=`
      const ivec2 strides = ivec2(${n}, ${o});
      const ivec2 pads = ivec2(${d}, ${c});
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
        for (int h = 0; h < ${i}; h++) {
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
    `}};let tt={kernelName:i.p4S,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o,filter:s}=r,{strides:l,pad:u,dilations:d}=n,c=i.backend_util.computeDilation2DInfo(o.shape,s.shape,l,u,"NHWC",d),p=new Dilation2DProgram(c);t=a.runWebGLProgram(p,[o,s],"float32");let h=reshape({inputs:{x:t},backend:a,attrs:{shape:c.outShape}});return a.disposeIntermediateTensorInfo(t),h}},tr={kernelName:i.$g6,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{equation:n}=a,{allDims:o,summedDims:s,idDims:l}=i.backend_util.decodeEinsumEquation(n,t.length);i.backend_util.checkEinsumDimSizes(o.length,l,t);let{path:u,steps:d}=i.backend_util.getEinsumComputePath(s,l),c=d.length,p=null,h=o.length,f=[];for(let e=0;e<c;++e){for(let a of d[e]){let e;let{permutationIndices:n,expandDims:o}=i.backend_util.getEinsumPermutation(h,l[a]);i.backend_util.isIdentityPermutation(n)?e=t[a]:(e=transpose({inputs:{x:t[a]},backend:r,attrs:{perm:n}}),f.push(e));let s=e.shape.slice();for(let e=0;e<o.length;++e)s.splice(o[e],0,1);i.D5U.arraysEqual(e.shape,s)||(e=reshape({inputs:{x:e},backend:r,attrs:{shape:s}}),f.push(e)),null===p?p=e:(p=multiply({inputs:{a:e,b:p},backend:r}),f.push(p))}e<c-1&&(u[e]>=0&&(p=sum({inputs:{x:p},backend:r,attrs:{axis:u[e]-(o.length-h),keepDims:!1}}),f.push(p)),h--)}for(let e of f)e!==p&&r.disposeIntermediateTensorInfo(e);return p}},ta=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,tn=unaryKernelFunc({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:ta}),to={kernelName:i.SX0,backendName:"webgl",kernelFunc:tn},ti=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,ts={kernelName:i.HEU,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r}=e,{dy:a,y:n}=t,o=(0,i.OBj)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new BinaryOpPackedProgram(ti,a.shape,n.shape):new BinaryOpProgram("return (b >= 0.0) ? a : a * (b + 1.0);",a.shape,n.shape);return r.runWebGLProgram(o,[a,n],a.dtype)}},tl=`
  return vec4(equal(a, b));
`,tu=binaryKernelFunc({opSnippet:"return float(a == b);",packedOpSnippet:tl,dtype:"bool",cpuKernelImpl:E.gv}),td={kernelName:i.hdR,backendName:"webgl",kernelFunc:tu},tc=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${i.backend_util.ERF_P};
  float a1 = ${i.backend_util.ERF_A1};
  float a2 = ${i.backend_util.ERF_A2};
  float a3 = ${i.backend_util.ERF_A3};
  float a4 = ${i.backend_util.ERF_A4};
  float a5 = ${i.backend_util.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,tp=unaryKernelFunc({opSnippet:tc}),th={kernelName:i.Omj,backendName:"webgl",kernelFunc:tp},tf=S+`
  return exp(x);
`,tm=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,tx=unaryKernelFunc({opSnippet:tf,packedOpSnippet:tm,cpuKernelImpl:E.aX,dtype:"float32"}),tg={kernelName:i.NEP,backendName:"webgl",kernelFunc:tx};/**
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
 */function expandDims(e){let{inputs:t,attrs:r,backend:a}=e,{dim:n}=r,{input:o}=t,s=o.shape.length,l=o.shape.slice(),u=n;return n<0&&(i.D5U.assert(-(s+1)<=n,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+n+1),l.splice(u,0,1),reshape({inputs:{x:o},backend:a,attrs:{shape:l}})}let tC={kernelName:i.YFo,backendName:"webgl",kernelFunc:expandDims},tb="return exp(x) - 1.0;",tv=unaryKernelFunc({opSnippet:tb,packedOpSnippet:tb,cpuKernelImpl:E.tx}),ty={kernelName:i.Y0y,backendName:"webgl",kernelFunc:tv};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FFTProgram=class FFTProgram{constructor(e,t,r){let a;this.variableNames=["real","imag"];let n=t[1];this.outputShape=t;let o=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,i=r?`${n}.0`:"1.0";if("real"===e)a="return real * expR - imag * expI;";else if("imag"===e)a="return real * expI + imag * expR;";else throw Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${o};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${a}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${i};
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
 */function fftImpl(e,t,r){let a=r.texData.get(e.dataId),n=i.D5U.sizeFromShape(e.shape),o=e.shape[e.shape.length-1],s=n/o,l=reshape({inputs:{x:e},backend:r,attrs:{shape:[s,o]}}),u=l.shape,d=new FFTProgram("real",u,t),c=new FFTProgram("imag",u,t),p=[{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:u},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:u}],h=r.runWebGLProgram(d,p,"float32"),f=r.runWebGLProgram(c,p,"float32"),m=complex({inputs:{real:h,imag:f},backend:r});r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f);let x=reshape({inputs:{x:m},backend:r,attrs:{shape:e.shape}});return r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(m),x}let tI={kernelName:i.vwp,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:a}=t;return fftImpl(a,!1,r)}};/**
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
 */function fill(e){let{backend:t,attrs:r}=e,{shape:a,value:n}=r,{dtype:o}=r;if("string"===(o=o||i.D5U.inferDtype(n))){let e=i.D5U.getArrayFromDType(o,i.D5U.sizeFromShape(a));return e.fill(n),t.makeTensorInfo(a,o,e)}{let e=new FillProgram(a,n),r=[[n]];return t.runWebGLProgram(e,[],o,r)}}let t$={kernelName:i.deh,backendName:"webgl",kernelFunc:fill};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
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
 */let tk={kernelName:i.Uyb,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{let{image:r}=e,a=new FlipLeftRightProgram(r.shape),n=t.runWebGLProgram(a,[r],r.dtype);return n}},tR="return floor(x);",tT=unaryKernelFunc({opSnippet:tR,packedOpSnippet:tR,cpuKernelImpl:E.MZ}),tw={kernelName:i.OR,backendName:"webgl",kernelFunc:tT},tN=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,tS=`
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
`,tF=binaryKernelFunc({opSnippet:tN,packedOpSnippet:tS,dtype:"int32"}),tE={kernelName:i.jeX,backendName:"webgl",kernelFunc:tF};var tA=r(72704);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let FromPixelsProgram=class FromPixelsProgram{constructor(e){this.variableNames=["A"];let t=(0,eM.A)(),[r,a]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${a}.0, ${r}.0);

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
 */let FromPixelsPackedProgram=class FromPixelsPackedProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=(0,eM.A)(),[r,a]=e;this.outputShape=e,this.userCode=`
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
                       vec2(${a}.0, ${r}.0);
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
 */let tO={kernelName:i.eBW,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:n}=e,{pixels:o}=t,{numChannels:s}=n,l="undefined"!=typeof HTMLVideoElement&&o instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&o instanceof HTMLImageElement,[d,c]=l?[o.videoWidth,o.videoHeight]:[o.width,o.height],p=[c,d],h=[c,d,s];if(u||l){let e=(0,i.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(null==a||e!==tP)&&(tP=e,a=document.createElement("canvas").getContext("2d",{willReadFrequently:tP})),a.canvas.width=d,a.canvas.height=c,a.drawImage(o,0,0,d,c),o=a.canvas}let f=r.makeTensorInfo(p,"int32");r.texData.get(f.dataId).usage=tA.v2.PIXELS,r.gpgpu.uploadPixelDataToTexture(r.getTexture(f.dataId),o);let m=(0,i.OBj)().getBool("WEBGL_PACK")?new FromPixelsPackedProgram(h):new FromPixelsProgram(h),x=r.runWebGLProgram(m,[f],"int32");return r.disposeData(f.dataId),x}},tP=(0,i.OBj)().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU"),t_={kernelName:i._V0,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o,filter:s,bias:l,preluActivationWeights:u}=r,{strides:d,pad:c,dataFormat:p,dilations:h,dimRoundingMode:f,activation:m,leakyreluAlpha:x}=n,g=i.backend_util.convertConv2DDataFormat(p),C=i.backend_util.computeConv2DInfo(o.shape,s.shape,d,h,c,f,!1,g),b=[],v=null!=l,y=null!=u,I="leakyrelu"===m,prepareInputs=()=>{let e=[o,s],alignInputWithDataFormat=(e,t)=>{if("NCHW"===t&&1===e.shape.length&&1!==e.shape[0]){let t=reshape({inputs:{x:e},backend:a,attrs:{shape:[e.shape[0],1,1]}});return b.push(t),t}return e};if(v&&e.push(alignInputWithDataFormat(l,p)),y&&e.push(alignInputWithDataFormat(u,p)),I){let t=a.makeTensorInfo([],"float32",i.D5U.createScalarValue(x,"float32"));e.push(t),b.push(t)}return e};if(1===C.filterHeight&&1===C.filterWidth&&1===C.dilationHeight&&1===C.dilationWidth&&1===C.strideHeight&&1===C.strideWidth&&("SAME"===C.padInfo.type||"VALID"===C.padInfo.type))t=conv2dByMatMul({x:o,filter:s,convInfo:C,backend:a,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:x});else if(C.strideWidth<=2&&"channelsLast"===g&&(0,i.OBj)().getBool("WEBGL_EXP_CONV")){let e=m?mapActivationToShaderProgram(m,!0):null,r=new Conv2DPackedProgram(C,v,e,y,I),n=[[C.padInfo.top,C.padInfo.left],[C.strideHeight,C.strideWidth],[C.dilationHeight,C.dilationWidth],[C.inHeight,C.inWidth]],o=prepareInputs();t=a.runWebGLProgram(r,o,"float32",n)}else if((0,i.OBj)().getBool("WEBGL_CONV_IM2COL"))t=conv2dWithIm2Row({x:o,filter:s,convInfo:C,backend:a,bias:l,activation:m,preluActivationWeights:u,leakyreluAlpha:x});else{let e=m?mapActivationToShaderProgram(m,!1):null,r=new Conv2DProgram(C,v,e,y,I),n=prepareInputs();t=a.runWebGLProgram(r,n,"float32")}let $=reshape({inputs:{x:t},backend:a,attrs:{shape:C.outShape}});return b.push(t),b.forEach(e=>a.disposeIntermediateTensorInfo(e)),$}},tD={kernelName:i.luS,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o,filter:s,bias:l,preluActivationWeights:u}=r,{strides:d,pad:c,dilations:p,dimRoundingMode:h,activation:f,leakyreluAlpha:m}=n,x=[],g=p;null==g&&(g=[1,1]),i.D5U.assert(i.backend_util.eitherStridesOrDilationsAreOne(d,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${d} and dilations '${g}'`);let C=i.backend_util.computeConv2DInfo(o.shape,s.shape,d,g,c,h,!0),b=(0,i.OBj)().getBool("WEBGL_PACK_DEPTHWISECONV")&&C.strideWidth<=2&&C.outChannels/C.inChannels==1,v=f?mapActivationToShaderProgram(f,b):null,y=[o,s],I=null!=l,$=null!=u,k="leakyrelu"===f;if(I&&y.push(l),$&&y.push(u),k){let e=a.makeTensorInfo([],"float32",i.D5U.createScalarValue(m,"float32"));y.push(e),x.push(e)}t=b?new DepthwiseConvPacked2DProgram(C,I,v,$,k):new DepthwiseConv2DProgram(C,I,v,$,k);let R=[[C.padInfo.top,C.padInfo.left],[C.strideHeight,C.strideWidth],[C.dilationHeight,C.dilationWidth],[C.inHeight,C.inWidth]],T=a.runWebGLProgram(t,y,"float32",R);return x.forEach(e=>a.disposeIntermediateTensorInfo(e)),T}};let GatherNDProgram=class GatherNDProgram{constructor(e,t,r,a){this.sliceDim=e,this.strides=t,this.paramsShape=a,this.variableNames=["x","indices"],this.outputShape=r;let n=(0,g.kW)(r.length),o=`
    int index;`;for(let e=0;e<this.sliceDim;e++)o+=`
          index = round(getIndices(coords[0], ${e}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[e]};
          flattenIndex += index * ${this.strides[e]};`;this.userCode=`
         void main() {
          ${n} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${o}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};let tB={kernelName:i.q1x,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{params:a,indices:n}=t,o=n.shape,s=o[o.length-1],l=i.D5U.sizeFromShape(a.shape),[u,d,c,p]=i.backend_util.prepareAndValidate(a,n),h=reshape({inputs:{x:n},backend:r,attrs:{shape:[d,s]}}),f=reshape({inputs:{x:a},backend:r,attrs:{shape:[i.D5U.sizeFromShape(a.shape)/c,c]}});if(r.shouldExecuteOnCPU([a,n])||"string"===a.dtype){let e=r.readSync(n.dataId),t=r.bufferSync(a),o=(0,E.TD)(e,t,a.dtype,d,s,c,p,a.shape,l);return r.makeTensorInfo(u,a.dtype,o.values)}let m=new GatherNDProgram(s,p,[d,c],a.shape),x=r.runWebGLProgram(m,[f,h],f.dtype),g=reshape({inputs:{x:x},backend:r,attrs:{shape:u}});return r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(x),g}};/**
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
 */let GatherProgram=class GatherProgram{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let r=(0,g.kW)(this.rank),a=function(e,t){let r=["resRC.x","resRC.y","resRC.z","resRC.w"],a=[];for(let t=0;t<e.length;t++)2===t?a.push("index"):a.push(`${r[t]}`);return a.join()}(e,0);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${a}));
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
 */function gatherV2(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,indices:o}=t,{axis:s,batchDims:l}=a,u=i.D5U.parseAxisParam(s,n.shape)[0];if((0,i.OBj)().get("DEBUG")){let e=r.readSync(o.dataId),t=n.shape[u];for(let r=0;r<e.length;++r){let a=e[r];i.D5U.assert(a<=t-1&&a>=0,()=>`GatherV2: the index value ${a} is not in [0, ${t-1}]`)}}let d=i.backend_util.segment_util.collectGatherOpShapeInfo(n,o,u,l),c=i.D5U.sizeFromShape(o.shape),p=[],h=reshape({inputs:{x:n},backend:r,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),f=reshape({inputs:{x:o},backend:r,attrs:{shape:[d.batchSize,c/d.batchSize]}});p.push(h),p.push(f);let m=[d.batchSize,d.outerSize,c/d.batchSize,d.sliceSize];if(r.shouldExecuteOnCPU([n,o])||"string"===n.dtype){let e=r.bufferSync(f),t=r.bufferSync(h),a=(0,E.m$)(t,e,m);return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),r.makeTensorInfo(d.outputShape,a.dtype,a.values)}let x=new GatherProgram(h.shape,m),g=r.runWebGLProgram(x,[h,f],h.dtype);p.push(g);let C=reshape({inputs:{x:g},backend:r,attrs:{shape:d.outputShape}});return p.forEach(e=>r.disposeIntermediateTensorInfo(e)),C}let tL={kernelName:i.qi_,backendName:"webgl",kernelFunc:gatherV2},tV=`
  return vec4(greaterThan(a, b));
`,tU=binaryKernelFunc({opSnippet:"return float(a > b);",packedOpSnippet:tV,cpuKernelImpl:E.B_,dtype:"bool"}),tW={kernelName:i.iZT,backendName:"webgl",kernelFunc:tU},tM=`
  return vec4(greaterThanEqual(a, b));
`,tG=binaryKernelFunc({opSnippet:"return float(a >= b);",packedOpSnippet:tM,dtype:"bool",cpuKernelImpl:E.ji}),tz={kernelName:i.Acj,backendName:"webgl",kernelFunc:tG},tX={kernelName:i.Qg5,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{input:a}=t;return fftImpl(a,!0,r)}},tH=unaryKernelFunc({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),tj={kernelName:i.avt,backendName:"webgl",kernelFunc:tH},tK=unaryKernelFunc({opSnippet:"return float(isinf(x));",dtype:"bool"}),tY={kernelName:i.iWB,backendName:"webgl",kernelFunc:tK},tq=unaryKernelFunc({opSnippet:"return float(isnan(x));",dtype:"bool"}),tQ={kernelName:i.r7n,backendName:"webgl",kernelFunc:tq},tZ=`
  return vec4(lessThan(a, b));
`,tJ=binaryKernelFunc({opSnippet:"return float(a < b);",packedOpSnippet:tZ,cpuKernelImpl:E.kY,dtype:"bool"}),t0={kernelName:i.vtC,backendName:"webgl",kernelFunc:tJ},t1=`
  return vec4(lessThanEqual(a, b));
`,t2=binaryKernelFunc({opSnippet:"return float(a <= b);",packedOpSnippet:t1,cpuKernelImpl:E.Rn,dtype:"bool"}),t4={kernelName:i.CAk,backendName:"webgl",kernelFunc:t2},t3={kernelName:i.e7N,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{backend:t,attrs:r}=e,{start:a,stop:n,num:o}=r,i=(0,E.PQ)(a,n,o);return t.makeTensorInfo([i.length],"float32",i)}},t5=S+`
  return x < 0.0 ? 0./0. : log(x);
`,t6=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,t7=unaryKernelFunc({opSnippet:t5,packedOpSnippet:t6,cpuKernelImpl:E.Sd}),t8={kernelName:i.ZbH,backendName:"webgl",kernelFunc:t7},t9=S+`
  return log(1.0 + x);
`,re=unaryKernelFunc({opSnippet:t9}),rt={kernelName:i.kU,backendName:"webgl",kernelFunc:re},rr=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,ra=binaryKernelFunc({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:rr,dtype:"bool"}),rn={kernelName:i.PYm,backendName:"webgl",kernelFunc:ra},ro=unaryKernelFunc({opSnippet:"return float(!(x >= 1.0));"}),ri={kernelName:i.VfG,backendName:"webgl",kernelFunc:ro},rs=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,rl=binaryKernelFunc({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:rs,dtype:"bool"}),ru={kernelName:i.MZg,backendName:"webgl",kernelFunc:rl};/**
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
 */let LRNProgram=class LRNProgram{constructor(e,t,r,a,n){let o;this.variableNames=["x"],this.outputShape=[];let i=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${a}) * sum`;o=.5===n?`inversesqrt(${s})`:1===n?`1.0/(${s})`:`exp(log(${s}) * float(-${n}));`,this.userCode=`
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
          if (idx >= 0 && idx <=  ${i}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${o};
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
 */let LRNPackedProgram=class LRNPackedProgram{constructor(e,t,r,a,n){let o;this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let i=e[3]-1;this.outputShape=e;let s=`float(${r}) + float(${a}) * sum`;o=.5===n?`inversesqrt(${s})`:1===n?`1.0/(${s})`:`exp(log(${s}) * float(-${n}));`,this.userCode=`
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
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${i}));

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
        vec4 result = xAtOutputCoords * ${o};
        setOutput(result);
      }
    `}};let rd={kernelName:i.eZ0,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{depthRadius:o,bias:s,alpha:l,beta:u}=a,d=(0,i.OBj)().getBool("WEBGL_PACK_NORMALIZATION")?new LRNPackedProgram(n.shape,o,s,l,u):new LRNProgram(n.shape,o,s,l,u);return r.runWebGLProgram(d,[n],n.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let LRNGradProgram=class LRNGradProgram{constructor(e,t,r,a,n){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=r,this.alpha=a,this.beta=n,this.userCode=`
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

          norm = float(${a}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${a})
                * float(${n})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${n});
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
    `}};let rc={kernelName:i.Hhh,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n,y:o,dy:i}=t,{depthRadius:s,bias:l,alpha:u,beta:d}=a,c=new LRNGradProgram(n.shape,s,l,u,d);return r.runWebGLProgram(c,[n,o,i],n.dtype)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function max(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{reductionIndices:s,keepDims:l}=n,u=o.shape.length,d=i.D5U.parseAxisParam(s,o.shape),c=d,p=i.backend_util.getAxesPermutation(c,u),h=null!=p,f=a.shouldExecuteOnCPU([o]),m=o;if(h){if(f){let e=a.texData.get(m.dataId),t=e.values,r=Array(u);for(let e=0;e<r.length;e++)r[e]=o.shape[p[e]];let n=(0,E.Fv)(t,o.shape,o.dtype,p,r);m=a.makeTensorInfo(r,o.dtype);let i=a.texData.get(m.dataId);i.values=n}else m=transposeImpl(o,p,a);c=i.backend_util.getInnerMostAxes(c.length,u)}i.backend_util.assertAxesAreInnerMostDims("max",c,u);let[x,g]=i.backend_util.computeOutAndReduceShapes(m.shape,c),C=x;if(l&&(C=i.backend_util.expandShapeToKeepDim(x,d)),f){let e=a.texData.get(m.dataId),r=e.values,n=(0,E.$O)(r,i.D5U.sizeFromShape(g),C,o.dtype);t=a.makeTensorInfo(C,o.dtype);let s=a.texData.get(t.dataId);s.values=n}else t=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,a){let n=i.D5U.sizeFromShape(t),o=i.D5U.sizeFromShape(e.shape),s=o/n,l=reshape({inputs:{x:e},attrs:{shape:[s,n]},backend:a}),u=reduce(l,e.dtype,"max",a),d=reshape({inputs:{x:u},attrs:{shape:r},backend:a});return a.disposeIntermediateTensorInfo(l),a.disposeIntermediateTensorInfo(u),d}(m,g,C,a);return h&&a.disposeIntermediateTensorInfo(m),t}let rp={kernelName:i.YoZ,backendName:"webgl",kernelFunc:max},rh=m+`
  return max(a, b);
`,rf=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+C+`
  return result;
`,rm=binaryKernelFunc({opSnippet:rh,packedOpSnippet:rf,cpuKernelImpl:E.nL}),rx={kernelName:i.BMI,backendName:"webgl",kernelFunc:rm},rg={kernelName:i.mTV,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;(0,d.assertNotComplex)(n,"maxPool");let{filterSize:o,strides:s,pad:l,dimRoundingMode:u}=a;i.D5U.assert(i.backend_util.eitherStridesOrDilationsAreOne(s,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '1'`);let c=i.backend_util.computePool2DInfo(n.shape,o,s,1,l,u);if(1===c.filterWidth&&1===c.filterHeight&&i.D5U.arraysEqual(c.inShape,c.outShape))return identity({inputs:{x:n},backend:r});let p=new Pool2DProgram(c,"max",!1);return r.runWebGLProgram(p,[n],n.dtype)}},rC={kernelName:i.OAf,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{filterSize:o,strides:s,pad:l,dataFormat:u,dimRoundingMode:d}=a,c=i.backend_util.computePool3DInfo(n.shape,o,s,[1,1,1],l,d,u),p=new Pool3DProgram(c,"max",!1);return r.runWebGLProgram(p,[n],n.dtype)}};/**
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
 */let MaxPool2DBackpropProgram=class MaxPool2DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,r=e.strideWidth,a=e.dilationHeight,n=e.effectiveFilterHeight,o=e.effectiveFilterWidth,i=n-1-e.padInfo.top,s=o-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${s});

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
        for (int wR = 0; wR < ${n};
          wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${n*o-1} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${o} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}};let MaxPool3DBackpropProgram=class MaxPool3DBackpropProgram{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,r=e.strideHeight,a=e.strideWidth,n=e.dilationDepth,o=e.dilationHeight,i=e.dilationWidth,s=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,d=s-1-e.padInfo.front,c=l-1-e.padInfo.top,p=u-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${d}, ${c}, ${p});

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
           wD += ${n}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${l};
              wR += ${o}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${i}) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

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
    `}};let rb={kernelName:i.OU7,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:o}=t,{filterSize:s,strides:l,pad:u,dimRoundingMode:d}=a,c=i.backend_util.computePool3DInfo(o.shape,s,l,[1,1,1],u,d),p=new Pool3DProgram(c,"max",!0),h=r.runWebGLProgram(p,[o],o.dtype),f=new MaxPool3DBackpropProgram(c),m=r.runWebGLProgram(f,[n,h],o.dtype);return r.disposeIntermediateTensorInfo(h),m}},rv={kernelName:i.OV7,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{dy:n,input:o,output:s}=t;(0,d.assertNotComplex)([o,s],"maxPoolGrad");let{filterSize:l,strides:u,pad:c,dimRoundingMode:p}=a,h=i.backend_util.computePool2DInfo(o.shape,l,u,1,c,p),f=new Pool2DProgram(h,"max",!0),m=r.runWebGLProgram(f,[o],o.dtype),x=new MaxPool2DBackpropProgram(h),g=r.runWebGLProgram(x,[n,m],o.dtype);return r.disposeIntermediateTensorInfo(m),g}},ry={kernelName:i.vFR,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:a}=e,{filterSize:n,strides:o,pad:s,includeBatchInIndex:l}=t;i.D5U.assert(4===a.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${a.shape.length}.`);let u=[1,1];i.D5U.assert(i.backend_util.eitherStridesOrDilationsAreOne(o,u),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '${u}'`);let d=i.backend_util.computePool2DInfo(a.shape,n,o,u,s),[c,p]=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,a){let n=new Pool2DProgram(r,"max",!1),o=a.runWebGLProgram(n,[e],"float32");n=new Pool2DProgram(r,"max",!0,!0,t);let i=a.runWebGLProgram(n,[e],"float32");return[o,i]}(a,l,d,r);return[c,p]}},rI={kernelName:i.q2K,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{x:a}=e,{keepDims:n,axis:o}=t,s=a.shape.length,l=i.D5U.parseAxisParam(o,a.shape),u=l,d=i.backend_util.getAxesPermutation(u,s),c=null!=d,p=r.shouldExecuteOnCPU([a]),h=[],f=a;if(c){if(p){let e=r.texData.get(f.dataId),t=e.values,n=Array(s);for(let e=0;e<n.length;e++)n[e]=a.shape[d[e]];let o=(0,E.Fv)(t,a.shape,a.dtype,d,n);f=r.makeTensorInfo(n,a.dtype);let i=r.texData.get(f.dataId);i.values=o}else f=transposeImpl(a,d,r);h.push(f),u=i.backend_util.getInnerMostAxes(u.length,s)}i.backend_util.assertAxesAreInnerMostDims("sum",u,s);let[m,x]=i.backend_util.computeOutAndReduceShapes(f.shape,u),g=m;n&&(g=i.backend_util.expandShapeToKeepDim(m,l));let C=/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e,t,r,a){let n=i.D5U.sizeFromShape(t),o=i.D5U.sizeFromShape(e.shape),s=o/n,l=reshape({inputs:{x:e},attrs:{shape:[s,n]},backend:a}),u=reduce(l,"float32","mean",a),d=reshape({inputs:{x:u},attrs:{shape:r},backend:a});return a.disposeIntermediateTensorInfo(l),a.disposeIntermediateTensorInfo(u),d}(f,x,g,r);for(let e of h)r.disposeIntermediateTensorInfo(e);return C}},r$={kernelName:i.c17,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{axis:s,keepDims:l}=n,u=o.shape.length,d=i.D5U.parseAxisParam(s,o.shape),c=d,p=i.backend_util.getAxesPermutation(c,u),h=o;null!=p&&(h=transpose({inputs:{x:o},backend:a,attrs:{perm:p}}),c=i.backend_util.getInnerMostAxes(c.length,o.shape.length)),i.backend_util.assertAxesAreInnerMostDims("min",c,u);let[f,m]=i.backend_util.computeOutAndReduceShapes(h.shape,c),x=i.D5U.sizeFromShape(m),g=reshape({inputs:{x:h},backend:a,attrs:{shape:[-1,x]}}),C=reduce(g,g.dtype,"min",a);if(l){let e=i.backend_util.expandShapeToKeepDim(f,d);t=reshape({inputs:{x:C},backend:a,attrs:{shape:e}})}else t=reshape({inputs:{x:C},backend:a,attrs:{shape:f}});return a.disposeIntermediateTensorInfo(g),a.disposeIntermediateTensorInfo(C),null!=p&&a.disposeIntermediateTensorInfo(h),t}},rk=m+`
  return min(a, b);
`,rR=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+C+`
  return result;
`,rT=binaryKernelFunc({opSnippet:rk,packedOpSnippet:rR,cpuKernelImpl:E.r}),rw={kernelName:i.q8u,backendName:"webgl",kernelFunc:rT};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let MirrorPadProgram=class MirrorPadProgram{constructor(e,t,r){this.variableNames=["x"],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=(0,g.kW)(a),o=t.map(e=>e[0]).join(","),i=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,a),l="reflect"===r?0:1;if(1===a){this.userCode=`
        int start = ${o};
        int end = ${i};

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
      ${n} start = ${n}(${o});
      ${n} end = ${n}(${i});

      void main() {
        ${n} outC = getOutputCoords();
        for (int i = 0; i < ${a}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${l};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${l};
          }
        }
        ${n} coords = outC - start;
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
 */let MirrorPadPackedProgram=class MirrorPadPackedProgram{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=(0,g.kW)(a),o=t.map(e=>e[0]).join(","),i=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,x.Ky)("rc",a),l=(0,x.Ky)("source",a),u=`${s[a-1]} < ${this.outputShape[a-1]}`,d=1===a?"source":`vec2(${l.slice(-2).join()})`,c="reflect"===r?0:1,p="";if(1===a){let e=`
        ${n} source = rc;
        if (source < start) {
          source = start * 2 - source - ${c};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${c};
        }
        source -= start;
      `;p=`
        ${n} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${d});
        ${s[a-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${d});
        }
      `}else{let e=`
        ${n} source = rc;
        ${n} lt = ${n}(lessThan(source, start));
        ${n} gte = ${n}(greaterThanEqual(source, end));
        ${n} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${c}) +
                gte * ((end - 1) * 2 - source + ${c});
        source -= start;
      `;p=`
        ${n} rc = outputLoc;
        ${e}
        result[0] = getChannel(getX(${l.join()}), ${d});
        ${s[a-1]} += 1;
        if(${u}) {
          ${e}
          result[1] = getChannel(getX(${l.join()}), ${d});
        }
        rc = outputLoc;
        ${s[a-2]} += 1;
        if(${s[a-2]} < ${this.outputShape[a-2]}) {
          ${e}
          result[2] = getChannel(getX(${l.join()}), ${d});
          ${s[a-1]} += 1;
          if(${u}) {
            ${e}
            result[3] = getChannel(getX(${l.join()}), ${d});
          }
        }
      `}this.userCode=`
      const ${n} start = ${n}(${o});
      const ${n} end = ${n}(${i});

      void main() {
        ${n} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${p}
        setOutput(result);
      }
    `}};let rN={kernelName:i.jQs,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:r})=>{let{x:a}=e,{paddings:n,mode:o}=r,s=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new MirrorPadPackedProgram(a.shape,n,o):new MirrorPadProgram(a.shape,n,o),l=t.runWebGLProgram(s,[a],a.dtype);return l}},rS=`if (b == 0.0) return NAN;
  return mod(a, b);`,rF=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+C+`
  return result;
`,rE=binaryKernelFunc({opSnippet:rS,packedOpSnippet:rF}),rA={kernelName:i.Vbg,backendName:"webgl",kernelFunc:rE};/**
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
 */let rO=`
if (a == b) {
  return 1.0;
};
return a / b;`,rP=`
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
`,r_=binaryKernelFunc({opSnippet:rO,packedOpSnippet:rP,checkOutOfBounds:!0}),rD={kernelName:i.oHH,backendName:"webgl",kernelFunc:r_},rB="return a - b;",rL=binaryKernelFunc({opSnippet:rB,packedOpSnippet:rB,supportsComplex:!0,cpuKernelImpl:E.kI}),rV={kernelName:i.Tr8,backendName:"webgl",kernelFunc:rL};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function softmax(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{dim:o}=a,s=i.D5U.parseAxisParam([o],n.shape),l=max({inputs:{x:n},backend:r,attrs:{reductionIndices:s,keepDims:!1}}),u=i.backend_util.expandShapeToKeepDim(l.shape,s),d=reshape({inputs:{x:l},backend:r,attrs:{shape:u}}),c=rL({inputs:{a:n,b:d},backend:r}),p=tx({inputs:{x:c},backend:r}),h=sum({inputs:{x:p},backend:r,attrs:{axis:s,keepDims:!1}}),f=reshape({inputs:{x:h},backend:r,attrs:{shape:u}}),m=r_({inputs:{a:p,b:f},backend:r});return r.disposeIntermediateTensorInfo(l),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(c),r.disposeIntermediateTensorInfo(p),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(f),m}let rU={kernelName:i.Gcp,backendName:"webgl",kernelFunc:softmax},rW={kernelName:i.NZg,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{logits:n}=t,{numSamples:o,seed:i,normalized:s}=a,l=s?n:softmax({inputs:{logits:n},backend:r,attrs:{dim:n.shape.length-1}}),u=l.shape[0],d=l.shape[1],c=new MultinomialProgram(u,d,o),p=r.runWebGLProgram(c,[l],"int32",[[i]]);return s||r.disposeIntermediateTensorInfo(l),p}},rM=w.D1+`
  return -x;
`,rG=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,rz={kernelName:i.kuV,backendName:"webgl",kernelFunc:function(e){let t;let{inputs:r,backend:a}=e,{x:n}=r;if(a.shouldExecuteOnCPU([n])){let e=a.texData.get(n.dataId),[t,r]=(0,E.Bo)(e.values,n.shape,n.dtype);return a.makeTensorInfo(r,n.dtype,t)}return t=(0,i.OBj)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new N.cc(n.shape,rG):new w.l(n.shape,rM),a.runWebGLProgram(t,[n],n.dtype)}},rX=i.GDt.nonMaxSuppressionV3Impl,rH={kernelName:i.uv1,backendName:"webgl",kernelFunc:function(e){i.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:o}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u}=a,d=r.readSync(n.dataId),c=r.readSync(o.dataId),{selectedIndices:p}=rX(d,c,s,l,u);return r.makeTensorInfo([p.length],"int32",new Int32Array(p))}},rj=i.GDt.nonMaxSuppressionV4Impl,rK={kernelName:i.cye,backendName:"webgl",kernelFunc:function(e){i.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:o}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:d}=a,c=r.readSync(n.dataId),p=r.readSync(o.dataId),{selectedIndices:h,validOutputs:f}=rj(c,p,s,l,u,d);return[r.makeTensorInfo([h.length],"int32",new Int32Array(h)),r.makeTensorInfo([],"int32",new Int32Array([f]))]}},rY=i.GDt.nonMaxSuppressionV5Impl,rq={kernelName:i.W0H,backendName:"webgl",kernelFunc:function(e){i.backend_util.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:r,attrs:a}=e,{boxes:n,scores:o}=t,{maxOutputSize:s,iouThreshold:l,scoreThreshold:u,softNmsSigma:d}=a,c=r.readSync(n.dataId),p=r.readSync(o.dataId),{selectedIndices:h,selectedScores:f}=rY(c,p,s,l,u,d);return[r.makeTensorInfo([h.length],"int32",new Int32Array(h)),r.makeTensorInfo([f.length],"float32",new Float32Array(f))]}};/**
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
 */let OneHotProgram=class OneHotProgram{constructor(e,t,r,a){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${a}), float(${r}),
                      float(index == coords.y)));
      }
    `}};let rQ={kernelName:i.we_,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{indices:n}=t,{dtype:o,depth:s,onValue:l,offValue:u}=a,d=i.D5U.sizeFromShape(n.shape),c=new OneHotProgram(d,s,l,u),p=reshape({inputs:{x:n},backend:r,attrs:{shape:[d]}}),h=r.runWebGLProgram(c,[p],o);r.disposeIntermediateTensorInfo(p);let f=[...n.shape,s],m=reshape({inputs:{x:h},backend:r,attrs:{shape:f}});return r.disposeIntermediateTensorInfo(h),m}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zerosLike(e){let{inputs:t,backend:r}=e,{x:a}=t;if("complex64"!==a.dtype)return fill({attrs:{shape:a.shape,dtype:a.dtype,value:"string"===a.dtype?"":0},backend:r});{let e=real({inputs:{input:a},backend:r}),t=zerosLike({inputs:{x:e},backend:r}),n=imag({inputs:{input:a},backend:r}),o=zerosLike({inputs:{x:n},backend:r}),i=complex({inputs:{real:t,imag:o},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(o),i}}let rZ={kernelName:i.RuY,backendName:"webgl",kernelFunc:zerosLike},rJ={kernelName:i.qWM,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function onesLike(e){let{inputs:t,backend:r}=e,{x:a}=t;if("string"===a.dtype)throw Error("onesLike is not supported under string dtype");if("complex64"!==a.dtype)return fill({attrs:{shape:a.shape,dtype:a.dtype,value:1},backend:r});{let e=real({inputs:{input:a},backend:r}),t=onesLike({inputs:{x:e},backend:r}),n=imag({inputs:{input:a},backend:r}),o=zerosLike({inputs:{x:n},backend:r}),i=complex({inputs:{real:t,imag:o},backend:r});return r.disposeIntermediateTensorInfo(e),r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(o),i}}},r0={kernelName:i.QiL,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{axis:n}=a;if(1===t.length)return expandDims({inputs:{input:t[0]},backend:r,attrs:{dim:n}});let o=t[0].shape,s=t[0].dtype;t.forEach(e=>{i.D5U.assertShapesMatch(o,e.shape,"All tensors passed to stack must have matching shapes"),i.D5U.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=t.map(e=>{let t=expandDims({inputs:{input:e},backend:r,attrs:{dim:n}});return l.push(t),t}),d=concat({inputs:u,backend:r,attrs:{axis:n}});return l.forEach(e=>r.disposeIntermediateTensorInfo(e)),d}};/**
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
 */let PadProgram=class PadProgram{constructor(e,t,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=(0,g.kW)(a),o=t.map(e=>e[0]).join(","),i=t.map((t,r)=>t[0]+e[r]).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,a);if(1===a){this.userCode=`
        int start = ${o};
        int end = ${i};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${n} start = ${n}(${o});
      ${n} end = ${n}(${i});

      void main() {
        ${n} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${n} coords = outC - start;
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
 */let PadPackedProgram=class PadPackedProgram{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((t,r)=>t[0]+e[r]+t[1]);let a=e.length,n=(0,g.kW)(a),o=t.map(e=>e[0]).join(","),i=t.map((t,r)=>t[0]+e[r]).join(","),s=(0,x.Ky)("rc",a),l=(0,x.Ky)("source",a),u=`${s[a-1]} < ${this.outputShape[a-1]}`,d=1===a?"source":`vec2(${l.slice(-2).join()})`,c=[`${n} rc = outputLoc;`,`${s[a-1]} += 1;
       if(${u}) {
      `,1===a?"":`}
       rc = outputLoc;
       ${s[a-2]} += 1;
       if(${s[a-2]} < ${this.outputShape[a-2]}) {`,1===a?"":`  ${s[a-1]} += 1;
         if(${u}) {`],p=1===a?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",h="";for(let e=0,t=1===a?2:4;e<t;e++)h+=`
        ${c[e]}
        if (${p}) {
          result[${e}] = float(value);
        } else {
          ${n} source = rc - start;
          result[${e}] = getChannel(getX(${l.join()}), ${d});
        }
      `;h+=1===a?"} ":"}}",this.userCode=`
      const ${n} start = ${n}(${o});
      const ${n} end = ${n}(${i});

      void main() {
        ${n} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${h}
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
 */let padV2=e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{paddings:o,constantValue:s}=a;if(0===i.D5U.sizeFromShape(n.shape)){let e=o.map((e,t)=>e[0]+n.shape[t]+e[1]);return fill({backend:r,attrs:{shape:e,value:s,dtype:n.dtype}})}let l=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new PadPackedProgram(n.shape,o,s):new PadProgram(n.shape,o,s),u=[[s]];return r.runWebGLProgram(l,[n],n.dtype,u)},r1={kernelName:i.lyA,backendName:"webgl",kernelFunc:padV2},r2=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,r4=`
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
  `+C+`
  return result;
`,r3=binaryKernelFunc({opSnippet:r2,packedOpSnippet:r4}),r5={kernelName:i.pe_,backendName:"webgl",kernelFunc:r3},r6={kernelName:i.DlI,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{axis:s,keepDims:l}=n,u=o.shape.length,d=[],c=i.D5U.parseAxisParam(s,o.shape),p=c,h=i.backend_util.getAxesPermutation(p,u),f=o;if(null!=h&&(f=transpose({inputs:{x:o},backend:a,attrs:{perm:h}}),p=i.backend_util.getInnerMostAxes(p.length,u),d.push(f)),i.backend_util.assertAxesAreInnerMostDims("prod",p,u),a.shouldExecuteOnCPU([f])){let e=a.texData.get(f.dataId).values,{outVals:r,outShape:n,outDtype:o}=(0,E.Tg)(f.shape,f.dtype,e,p);t=a.makeTensorInfo(n,o,r)}else{let[e,r]=i.backend_util.computeOutAndReduceShapes(f.shape,p),n=i.D5U.sizeFromShape(r),s=reshape({inputs:{x:f},backend:a,attrs:{shape:[-1,n]}}),l=(0,i.z4k)(o.dtype),u=reduce(s,l,"prod",a);t=reshape({inputs:{x:u},backend:a,attrs:{shape:e}}),d.push(s),d.push(u)}if(l){d.push(t);let e=i.backend_util.expandShapeToKeepDim(t.shape,c);t=reshape({inputs:{x:t},backend:a,attrs:{shape:e}})}return d.forEach(e=>a.disposeIntermediateTensorInfo(e)),t}},r7={kernelName:i.dDz,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{paramsNestedSplits:n,paramsDenseValues:o,indices:i}=t,{outputRaggedRank:s}=a,l=n.map(e=>r.readSync(e.dataId)),u=n.map(e=>e.shape),d=r.readSync(o.dataId),c=r.readSync(i.dataId),[p,h,f]=(0,E.Qs)(l,u,d,o.shape,o.dtype,c,i.shape,s),m=p.map(e=>r.makeTensorInfo([e.length],"int32",e)),x=r.makeTensorInfo(f,o.dtype,h);return m.concat([x])}},r8={kernelName:i.CQl,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{starts:a,limits:n,deltas:o}=t,i=r.readSync(a.dataId),s=r.readSync(n.dataId),l=r.readSync(o.dataId),[u,d]=(0,E.M8)(i,a.shape,a.dtype,s,n.shape,l,o.shape),c=r.makeTensorInfo([u.length],"int32",u),p=r.makeTensorInfo([d.length],a.dtype,d);return[c,p]}},r9={kernelName:i.BiW,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{shape:n,values:o,defaultValue:i,rowPartitionTensors:s}=t,{rowPartitionTypes:l}=a,u=r.readSync(n.dataId),d=r.readSync(o.dataId),c=r.readSync(i.dataId),p=s.map(e=>r.readSync(e.dataId)),h=s.map(e=>e.shape),[f,m]=(0,E.fy)(u,n.shape,d,o.shape,o.dtype,c,i.shape,p,h,l);return r.makeTensorInfo(f,o.dtype,m)}},range=e=>{let{backend:t,attrs:r}=e,{start:a,stop:n,step:o,dtype:i}=r,s=(0,E.hO)(a,n,o,i);return t.makeTensorInfo([s.length],i,s)},ae={kernelName:i.e6w,backendName:"webgl",kernelFunc:range},at=unaryKernelFunc({opSnippet:"return 1.0 / x;"}),ar={kernelName:i.$HU,backendName:"webgl",kernelFunc:at},aa=w.D1+`
  return (x < 0.0) ? 0.0 : x;
`,an=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,ao=unaryKernelFunc({opSnippet:aa,packedOpSnippet:an}),ai={kernelName:i.qkr,backendName:"webgl",kernelFunc:ao},as=w.D1+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,al=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,au=unaryKernelFunc({opSnippet:as,packedOpSnippet:al}),ad={kernelName:i.SbG,backendName:"webgl",kernelFunc:au};/**
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
 */let ResizeBilinearProgram=class ResizeBilinearProgram{constructor(e,t,r,a,n){this.variableNames=["A"],this.outputShape=[];let[o,i,s,l]=e;this.outputShape=[o,t,r,l];let u=[a&&t>1?i-1:i,a&&r>1?s-1:s],d=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/d[0]},
          ${u[1]/d[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${n?"(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

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
 */let ResizeBilinearPackedProgram=class ResizeBilinearPackedProgram{constructor(e,t,r,a,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[o,i,s,l]=e;this.outputShape=[o,t,r,l];let u=[a&&t>1?i-1:i,a&&r>1?s-1:s],d=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/d[0]},
          ${u[1]/d[1]},
          ${u[1]/d[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${s}.0,
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
        vec3 sourceFracIndexRC = ${n?"(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

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
    `}};let ac={kernelName:i._Yw,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:o,halfPixelCenters:s,size:l}=a,[u,d]=l,c=(0,i.OBj)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ResizeBilinearPackedProgram(n.shape,u,d,o,s):new ResizeBilinearProgram(n.shape,u,d,o,s);return r.runWebGLProgram(c,[n],"float32")}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeBilinearBackpropProgram=class ResizeBilinearBackpropProgram{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,a,n]=t,[,o,i]=e,s=[r&&o>1?a-1:a,r&&i>1?n-1:n],l=[r&&o>1?o-1:o,r&&i>1?i-1:i],u=s[0]/l[0],d=s[1]/l[1],c=1/u,p=1/d;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${d});

        const float invHeightScale = float(${c});
        const float invWidthScale = float(${p});

        const int winHeight = int(${2*Math.ceil(c)+2});
        const int winWidth = int(${2*Math.ceil(p)+2});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${o}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${a-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${n-1}.0));
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
    `}};let ap={kernelName:i.zbQ,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:o}=t,{alignCorners:i}=a,s=new ResizeBilinearBackpropProgram(o.shape,n.shape,i);return r.runWebGLProgram(s,[o],o.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeNearestNeighborProgram=class ResizeNearestNeighborProgram{constructor(e,t,r,a,n){this.variableNames=["A"],this.outputShape=[];let[o,i,s,l]=e;this.outputShape=[o,t,r,l];let u=[a&&t>1?i-1:i,a&&r>1?s-1:s],d=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/d[0]},
          ${u[1]/d[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${s}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${n?"max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":"vec2(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${a?"0.5":"0.0"})));
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
 */let ResizeNearestNeighborPackedProgram=class ResizeNearestNeighborPackedProgram{constructor(e,t,r,a,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[o,i,s,l]=e;this.outputShape=[o,t,r,l];let u=[a&&t>1?i-1:i,a&&r>1?s-1:s],d=[a&&t>1?t-1:t,a&&r>1?r-1:r];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/d[0]},
          ${u[1]/d[1]},
          ${u[1]/d[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${s}.0,
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
        vec3 sourceFracIndexRC = ${n?"max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":"vec3(yRC) * effectiveInputOverOutputRatioRC"};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${a?"0.5":"0.0"})));

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
    `}};let ah={kernelName:i.dpD,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n}=t,{alignCorners:o,halfPixelCenters:s,size:l}=a,[u,d]=l,c=(0,i.OBj)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new ResizeNearestNeighborPackedProgram(n.shape,u,d,o,s):new ResizeNearestNeighborProgram(n.shape,u,d,o,s);return r.runWebGLProgram(c,[n],n.dtype)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ResizeNearestNeigborBackpropProgram=class ResizeNearestNeigborBackpropProgram{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,a,n]=t,[,o,i]=e,s=[r&&o>1?a-1:a,r&&i>1?n-1:n],l=[r&&o>1?o-1:o,r&&i>1?i-1:i],u=s[0]/l[0],d=s[1]/l[1],c=1/u,p=1/d;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${d});

        const float invHeightScale = float(${c});
        const float invWidthScale = float(${p});

        const int winHeight = int(${2*Math.ceil(c)+2});
        const int winWidth = int(${2*Math.ceil(p)+2});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${o}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float sourceFracRow =
              float(${s[0]}) *
                (float(dyR) / float(${l[0]}));

            float sourceFracCol =
                float(${s[1]}) *
                  (float(dyC) / float(${l[1]}));

            int sourceNearestRow = int(min(
                float(int(${a}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${n}) - 1),
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
    `}};let af={kernelName:i.Hmb,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{images:n,dy:o}=t,{alignCorners:i}=a,s=new ResizeNearestNeigborBackpropProgram(o.shape,n.shape,i);return r.runWebGLProgram(s,[o],o.dtype)}};/**
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
      `;return}let getInCoord=r=>-1!==t.indexOf(r)&&1!==e[r]?`${e[r]} - coords[${r}] - 1`:`coords[${r}]`,a=e.map((e,t)=>getInCoord(t)).join(","),n=(0,g.kW)(r);this.userCode=`
      void main() {
        ${n} coords = getOutputCoords();
        setOutput(getX(${a}));
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
 */let ReversePackedProgram=class ReversePackedProgram{constructor(e,t){var r,a,n;this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let o=e.length;if(o>4)throw Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);this.outputShape=e;let i=(0,x.Ky)("rc",o),s=`${i[o-1]} + 1 < ${this.outputShape[o-1]}`,l=`${i[o-2]} + 1 < ${this.outputShape[o-2]}`,u=(0,g.kW)(o);function getChannel(r){let a=e.map((a,n)=>-1!==t.indexOf(n)&&1!==e[n]?`${e[n]} - ${r[n]} - 1`:`${r[n]}`),n=a.join(","),o=a.slice(-2).join(",");return`getChannel(getX(${n}), vec2(${o}))`}1===o?this.userCode=`
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
          result.r = ${getChannel(i.slice())};
          if(${s}){
            result.g = ${(r=i.slice())[o-1]="("+r[o-1]+" + 1)",getChannel(r)};
          }
          if(${l}) {
            result.b = ${(a=i.slice())[o-2]="("+a[o-2]+" + 1)",getChannel(a)};
            if(${s}) {
              result.a = ${(n=i.slice())[o-1]="("+n[o-1]+" + 1)",n[o-2]="("+n[o-2]+" + 1)",getChannel(n)};
            }
          }
          setOutput(result);
        }
    `}};let am={kernelName:i.mKl,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{dims:o}=a,s=n.shape.length,l=i.D5U.parseAxisParam(o,n.shape);if(0===s)return identity({inputs:{x:n},backend:r});let u=(0,i.OBj)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ReversePackedProgram(n.shape,l):new ReverseProgram(n.shape,l);return r.runWebGLProgram(u,[n],n.dtype)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let RotateProgram=class RotateProgram{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=e[1],a=e[2];this.outputShape=e;let n="";n="number"==typeof t?`float outputValue = ${t.toFixed(2)};`:`
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
          ${n}
          if(coordX >= 0 && coordX < ${a} && coordY >= 0 && coordY < ${r}) {
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
 */let ax={kernelName:i.b9H,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:r})=>{let{image:a}=e,{radians:n,fillValue:o,center:s}=t,l=new RotateProgram(a.shape,o),[u,d]=i.backend_util.getImageCenter(s,a.shape[1],a.shape[2]),c=r.runWebGLProgram(l,[a],a.dtype,[[u,d,Math.sin(n),Math.cos(n)]]);return c}},ag=`
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
`,aC=unaryKernelFunc({opSnippet:ag}),ab={kernelName:i.e07,backendName:"webgl",kernelFunc:aC},av=unaryKernelFunc({opSnippet:"return inversesqrt(x);",cpuKernelImpl:E.St}),ay={kernelName:i.bV0,backendName:"webgl",kernelFunc:av};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ScatterProgram=class ScatterProgram{constructor(e,t,r,a,n,o,i=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=o;let l=(0,g.kW)(n.length),u=(0,g.kW)(o.length),d="";1===r?d="i":2===r&&(d="i, j");let c=`getIndices(${d})`,p="";1===a?p="i":2===a&&(p="i, coords[1]");let h=`getUpdates(${p})`,f="";s&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${n});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${c});
              flattenedIndex += index * ${t>1?"strides[j]":"strides"};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${h};
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
 */let ScatterPackedProgram=class ScatterPackedProgram{constructor(e,t,r,a,n,o,i=!0,s=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o;let l=(0,g.kW)(n.length),u=(0,g.kW)(o.length),d="";1===r?d="i":2===r&&(d="i, j");let c=`getIndices(${d})`,p="";1===a?p="i":2===a&&(p="i, coords[1]");let h=`getUpdates(${p})`,f="";s&&(f="coords[0], coords[1]");let m=`getDefaultValue(${f})`;this.userCode=`
        ${l} strides = ${l}(${n});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${c});
              flattenedIndex += index.xz * ${t>1?"strides[j]":"strides"};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${t>1?"strides[j + 1]":"strides"};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${h};
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
      `}};let aI={kernelName:i.xQA,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{indices:o,updates:s}=r,{shape:l}=n,{sliceRank:u,numUpdates:d,sliceSize:c,strides:p,outputSize:h}=i.backend_util.calculateShapes(s,o,l),f=[h/c,c];if(0===h)return a.makeTensorInfo(l,o.dtype);let m=reshape({inputs:{x:o},backend:a,attrs:{shape:[d,u]}}),x=reshape({inputs:{x:s},backend:a,attrs:{shape:[d,c]}}),g=a.makeTensorInfo([],"float32",new Float32Array([0]));t=(0,i.OBj)().getBool("WEBGL_PACK")?new ScatterPackedProgram(d,u,m.shape.length,x.shape.length,p,f):new ScatterProgram(d,u,m.shape.length,x.shape.length,p,f);let C=a.runWebGLProgram(t,[x,m,g],x.dtype),b=reshape({inputs:{x:C},backend:a,attrs:{shape:l}});return a.disposeIntermediateTensorInfo(m),a.disposeIntermediateTensorInfo(x),a.disposeIntermediateTensorInfo(C),a.disposeIntermediateTensorInfo(g),b}};/**
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
 */let SearchSortedProgram=class SearchSortedProgram{constructor(e,t,r,a){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,r];let n=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,o=2===(0,i.OBj)().getNumber("WEBGL_VERSION")?"while (left < right) {":n;this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${o}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${"left"===a?"<":"<="} value) {
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
     `}};let a$={kernelName:i.nr8,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{sortedSequence:n,values:o}=t,{side:i}=a,s=new SearchSortedProgram(n.shape[0],n.shape[1],o.shape[1],i),l=[[n.shape[1]]];return r.runWebGLProgram(s,[n,o],"int32",l)}};/**
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
 */let SelectProgram=class SelectProgram{constructor(e,t,r){let a,n;if(this.variableNames=["c","a","b"],this.outputShape=t,r>4)throw Error(`Where for rank ${r} is not yet supported`);if(1===r)n="resRC",a="resRC";else{let r=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[],i=[];for(let a=0;a<t.length;a++)i.push(`${r[a]}`),a<e&&o.push(`${r[a]}`);a=o.join(),n=i.join()}let o=(0,g.kW)(r);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        float cVal = getC(${a});
        if (cVal >= 1.0) {
          setOutput(getA(${n}));
        } else {
          setOutput(getB(${n}));
        }
      }
    `}};let ak={kernelName:i.PhF,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r}=e,{condition:a,t:n,e:o}=t,s=new SelectProgram(a.shape.length,n.shape,n.shape.length);return r.runWebGLProgram(s,[a,n,o],(0,i.x8V)(n.dtype,o.dtype))}},aR=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${i.backend_util.SELU_SCALEALPHA};
  float scale = ${i.backend_util.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,aT=unaryKernelFunc({opSnippet:aR}),aw={kernelName:i.oFR,backendName:"webgl",kernelFunc:aT},aN=S+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,aS=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,aF=unaryKernelFunc({opSnippet:aN,packedOpSnippet:aS,cpuKernelImpl:E.UN}),aE={kernelName:i.a5O,backendName:"webgl",kernelFunc:aF},aA=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,aO=unaryKernelFunc({opSnippet:aA}),aP={kernelName:i.i5y,backendName:"webgl",kernelFunc:aO},a_=S+`
  return sin(x);
`,aD=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${C}
  return result;
`,aB=unaryKernelFunc({opSnippet:a_,packedOpSnippet:aD}),aL={kernelName:i.RQH,backendName:"webgl",kernelFunc:aB},aV=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,aU=unaryKernelFunc({opSnippet:aV}),aW={kernelName:i.wYB,backendName:"webgl",kernelFunc:aU},aM=`
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
`,aG=unaryKernelFunc({opSnippet:aM}),az={kernelName:i.MRv,backendName:"webgl",kernelFunc:aG},aX={kernelName:i.TQc,backendName:"webgl",kernelFunc:e=>{let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{blockShape:o,paddings:s}=a;i.D5U.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let l=o.reduce((e,t)=>e*t),u=[[0,0]];u.push(...s);for(let e=1+o.length;e<n.shape.length;++e)u.push([0,0]);let d=[],c=padV2({inputs:{x:n},backend:r,attrs:{paddings:u,constantValue:0}}),p=i.backend_util.getReshaped(c.shape,o,l,!1),h=i.backend_util.getPermuted(p.length,o.length,!1),f=i.backend_util.getReshapedPermuted(c.shape,o,l,!1),m=reshape({inputs:{x:c},backend:r,attrs:{shape:p}}),x=transpose({inputs:{x:m},backend:r,attrs:{perm:h}}),g=reshape({inputs:{x:x},backend:r,attrs:{shape:f}});return d.push(c),d.push(m),d.push(x),d.forEach(e=>r.disposeIntermediateTensorInfo(e)),g}},aH={kernelName:i.O3z,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{indices:a,values:n,denseShape:o,defaultValue:i}=t;if(1!==o.shape.length)throw Error(`Dense shape must be a vector, saw:
         ${o.shape}`);if(2!==a.shape.length)throw Error(`Indices must be a matrix, saw:
         ${a.shape}`);if(1!==n.shape.length)throw Error(`Values must be a vector, saw:
         ${n.shape}`);if(0!==i.shape.length)throw Error(`Default value must be a scalar, saw:
        ${i.shape}`);let s=r.readSync(a.dataId),l=r.readSync(n.dataId),u=r.readSync(o.dataId),d=r.readSync(i.dataId)[0],[c,p,h,f,m]=(0,E.X8)(s,a.shape,a.dtype,l,n.dtype,u,d);return[r.makeTensorInfo(p,a.dtype,c),r.makeTensorInfo([p[0]],n.dtype,h),r.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),r.makeTensorInfo([m.length],a.dtype,new Int32Array(m))]}},aj={kernelName:i.nhH,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{inputIndices:a,inputShape:n,newShape:o}=t;if(2!==a.shape.length)throw Error(`Input indices should be a matrix but received shape ${a.shape}`);if(1!==n.shape.length)throw Error(`Input shape should be a vector but received shape ${n.shape}`);if(1!==o.shape.length)throw Error(`Target shape should be a vector but received shape ${o.shape}`);let i=Array.from(r.readSync(n.dataId)),s=r.readSync(a.dataId),l=Array.from(r.readSync(o.dataId)),[u,d,c]=(0,E.LS)(s,a.shape,a.dtype,i,l);return[r.makeTensorInfo(d,a.dtype,u),r.makeTensorInfo([c.length],o.dtype,new Int32Array(c))]}},aK={kernelName:i.w3H,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:o}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
              ${n.shape}`);if(1!==o.shape.length)throw Error(`Segment ids should be a vector but received shape
              ${o.shape}`);let i=r.readSync(a.dataId),s=r.readSync(n.dataId),l=r.readSync(o.dataId),[u,d]=(0,E.AR)(i,a.shape,a.dtype,s,l,!0);return r.makeTensorInfo(d,a.dtype,u)}},aY={kernelName:i.ZjV,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r}=e,{data:a,indices:n,segmentIds:o}=t;if(a.shape.length<1)throw Error("Data should be at least 1 dimensional but received scalar");if(1!==n.shape.length)throw Error(`Indices should be a vector but received shape
             ${n.shape}`);if(1!==o.shape.length)throw Error(`Segment ids should be a vector but received shape
             ${o.shape}`);let i=r.readSync(a.dataId),s=r.readSync(n.dataId),l=r.readSync(o.dataId),[u,d]=(0,E.AR)(i,a.shape,a.dtype,s,l);return r.makeTensorInfo(d,a.dtype,u)}},aq={kernelName:i.D2d,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{sparseIndices:n,sparseValues:o,defaultValue:s}=t,{outputShape:l}=a,{sliceRank:u,numUpdates:d,sliceSize:c,strides:p,outputSize:h}=i.backend_util.calculateShapes(o,n,l);if("string"===o.dtype){let e=r.bufferSync(n),t=r.bufferSync(o),a=i.D5U.decodeString(r.readSync(s.dataId)[0]),f=(0,E.Y1)(e,t,l,h,c,d,u,p,a,!1);return r.makeTensorInfo(l,f.dtype,f.values)}let f=new ScatterProgram(d,u,n.shape.length,o.shape.length,p,[h,1],!1),m=r.runWebGLProgram(f,[o,n,s],o.dtype),x=reshape({inputs:{x:m},backend:r,attrs:{shape:l}});return r.disposeIntermediateTensorInfo(m),x}},aQ={kernelName:i.L8s,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{numOrSizeSplits:o,axis:s}=a,l=i.D5U.parseAxisParam(s,n.shape)[0],u=i.backend_util.prepareSplitSize(n,o,l),d=n.shape.length,c=Array(d).fill(0),p=n.shape.slice();return u.map(e=>{let t=[...p];t[l]=e;let a=slice({inputs:{x:n},backend:r,attrs:{begin:c,size:t}});return c[l]+=e,a})}},aZ="return sqrt(x);",aJ=unaryKernelFunc({opSnippet:aZ,packedOpSnippet:aZ,cpuKernelImpl:E.Bk}),a0={kernelName:i.FKq,backendName:"webgl",kernelFunc:aJ},a1=unaryKernelFunc({opSnippet:"return x * x;"}),a2={kernelName:i.bK0,backendName:"webgl",kernelFunc:a1},a4="return (a - b) * (a - b);",a3=binaryKernelFunc({opSnippet:a4,packedOpSnippet:a4}),a5={kernelName:i._tC,backendName:"webgl",kernelFunc:a3},a6={kernelName:i.e0R,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t;if("string"!==n.dtype)throw Error("Input must be of datatype string");let o=r.readSync(n.dataId),s=i.backend_util.fromUint8ToStringArray(o),l=(0,E.F1)(s,"string",a);return r.makeTensorInfo(n.shape,"string",l)}},a7={kernelName:i.h8e,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function({inputs:e,attrs:t,backend:r}){let{x:a}=e,n=w.D1+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,o=new w.l(a.shape,n);return r.runWebGLProgram(o,[a],a.dtype)}};/**
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
 */let StridedSliceProgram=class StridedSliceProgram{constructor(e,t,r){this.variableNames=["x"],this.outputShape=r;let a=r.length,n=(0,g.kW)(r.length),o=(0,g.kW)(r.length),i="";if(1===a)i="coords * strides + begin";else{let e=0;i=r.map((t,a)=>(e++,1===r.length?`coords * strides[${a}] + begin[${a}]`:`coords[${e-1}] * strides[${a}] + begin[${a}]`)).join(",")}this.userCode=`
      ${n} begin = ${n}(${e});
      ${n} strides = ${n}(${t});

      void main() {
        ${o} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}};let a8={kernelName:i.jQk,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let t;let{inputs:r,backend:a,attrs:n}=e,{x:o}=r,{begin:s,end:l,strides:u,beginMask:d,endMask:c,ellipsisMask:p,newAxisMask:h,shrinkAxisMask:f}=n,{finalShapeSparse:m,finalShape:x,isIdentity:g,sliceDim0:C,isSimpleSlice:b,begin:v,end:y,strides:I}=i.kuN.sliceInfo(o.shape,s,l,u,d,c,p,h,f);if(g)t=reshape({inputs:{x:o},backend:a,attrs:{shape:x}});else if(C||b){i.D5U.assert(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);let e=i.kuN.computeOutShape(v,y,I),r=slice({inputs:{x:o},backend:a,attrs:{begin:v,size:e}});t=reshape({inputs:{x:r},backend:a,attrs:{shape:x}}),a.disposeIntermediateTensorInfo(r)}else{let e=a.shouldExecuteOnCPU([o]);if(e){let e=a.readSync(o.dataId),r=(0,i.f3b)(o.shape,o.dtype,e),n=(0,E.$u)(m,r,I,v);t=a.makeTensorInfo(x,o.dtype,n.values)}else{let e=new StridedSliceProgram(v,I,m);t=a.runWebGLProgram(e,[o],o.dtype)}}let $=reshape({inputs:{x:t},backend:a,attrs:{shape:x}});return a.disposeIntermediateTensorInfo(t),$}},a9={kernelName:i._JP,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{separator:n,nGramWidths:o,leftPad:i,rightPad:s,padWidth:l,preserveShortSequences:u}=a,{data:d,dataSplits:c}=t,p=r.readSync(d.dataId),h=r.readSync(c.dataId),[f,m]=(0,E.$j)(p,h,n,o,i,s,l,u);return[r.makeTensorInfo([f.length],"string",f),r.makeTensorInfo(c.shape,"int32",m)]}},ne={kernelName:i.s1s,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{skipEmpty:n}=a,{input:o,delimiter:i}=t;if("string"!==o.dtype)throw Error("Input must be of datatype string");if(1!==o.shape.length)throw Error(`Input must be a vector, got shape: ${o.shape}`);if(0!==i.shape.length)throw Error(`Delimiter must be a scalar, got shape: ${i.shape}`);let s=r.readSync(o.dataId),l=r.readSync(i.dataId)[0],[u,d,c]=(0,E.A0)(s,l,n),p=d.length;return[r.makeTensorInfo([p,2],"int32",u),r.makeTensorInfo([p],"string",d),r.makeTensorInfo([2],"int32",new Int32Array(c))]}},nt={kernelName:i.XkS,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{numBuckets:n}=a,{input:o}=t;if("string"!==o.dtype)throw Error("Input must be of datatype string");if(n<=0)throw Error("Number of buckets must be at least 1");let i=r.readSync(o.dataId),s=(0,E._9)(i,n);return r.makeTensorInfo(o.shape,"int32",s)}},nr=unaryKernelFunc({opSnippet:"return tan(x);"}),na={kernelName:i.sEM,backendName:"webgl",kernelFunc:nr},nn=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,no=unaryKernelFunc({opSnippet:nn}),ni={kernelName:i.MIZ,backendName:"webgl",kernelFunc:no},ns={kernelName:i.SIB,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{tensor:n,indices:o,updates:s}=t,{}=a,{sliceRank:l,numUpdates:u,sliceSize:d,strides:c,outputSize:p}=i.backend_util.calculateShapes(s,o,n.shape),h=[p/d,d];if(0===p)return r.makeTensorInfo(n.shape,o.dtype);let f=reshape({inputs:{x:o},backend:r,attrs:{shape:[u,l]}}),m=reshape({inputs:{x:s},backend:r,attrs:{shape:[u,d]}}),x=reshape({inputs:{x:n},backend:r,attrs:{shape:h}}),g=new ScatterProgram(u,l,f.shape.length,m.shape.length,c,h,!1,!0),C=r.runWebGLProgram(g,[m,f,x],x.dtype),b=reshape({inputs:{x:C},backend:r,attrs:{shape:n.shape}});return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(m),r.disposeIntermediateTensorInfo(x),r.disposeIntermediateTensorInfo(C),b}};/**
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
 */let TileProgram=class TileProgram{constructor(e,t){this.variableNames=["A"];let r=Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[a]*t[a];this.outputShape=r,this.rank=r.length;let a=(0,g.kW)(this.rank),n=function(e){let t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;let r=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],a=[];for(let t=0;t<e.length;t++)a.push(`imod(${r[t]}, ${e[t]})`);return a.join()}(e);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        setOutput(getA(${n}));
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
 */function tile(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{reps:o}=a;if("string"===n.dtype||n.shape.length>5){let e=r.readSync(n.dataId),t="string"===n.dtype?e.map(e=>i.D5U.decodeString(e)):e,a=(0,i.f3b)(n.shape,n.dtype,t),s=(0,E.KX)(a,o);return r.makeTensorInfo(s.shape,s.dtype,s.values)}let s=new TileProgram(n.shape,o),l=r.runWebGLProgram(s,[n],n.dtype);return l}let nl={kernelName:i.n9L,backendName:"webgl",kernelFunc:tile};let SwapProgram=class SwapProgram{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
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
 */function disposeIntermediateTensorInfoOrNull(e,t){null!==t&&e.disposeIntermediateTensorInfo(t)}function roundUpToPow2(e){let t=1;for(;t<e;)t*=2;return t}let nu={kernelName:i.cWu,backendName:"webgl",kernelFunc:function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n}=t,{k:o,sorted:s}=a,l=(0,i.OBj)().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),u=(0,i.OBj)().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),d=n.shape,c=d[d.length-1];if(r.shouldExecuteOnCPU([n])||c<l||o>u){let e=r.readSync(n.dataId),[t,a]=(0,E.oC)(e,d,n.dtype,o,s);return[r.makeTensorInfo(t.shape,t.dtype,t.values),r.makeTensorInfo(a.shape,a.dtype,a.values)]}if(0===o)return d[d.length-1]=0,[r.makeTensorInfo(d,n.dtype,[]),r.makeTensorInfo(d,"int32",[])];if(1===c)return[n,fill({attrs:{shape:d,dtype:"int32",value:0},backend:r})];let p=r.texData.get(n.dataId),h=null!==p&&p.isPacked,f=h?r.unpackTensor(n):n,m=i.D5U.sizeFromShape(d),x=m/c,g=reshape({inputs:{x:f},attrs:{shape:[x,c]},backend:r});h&&disposeIntermediateTensorInfoOrNull(r,f);let C=roundUpToPow2(o),b=roundUpToPow2(c),v=null,getInputs=()=>null===v?[g,g]:[g,v],runSwap=(e,t,a)=>{let n=getInputs(),o=new SwapProgram(a),i=null===v?1:0,s=[[c],[i],[Number.NEGATIVE_INFINITY],[e],[t]],l=v;v=r.runWebGLProgram(o,n,"int32",s),disposeIntermediateTensorInfoOrNull(r,l)};for(let e=1;e<C;e*=2){let t=2*e;for(let r=e;r>=1;r/=2)runSwap(t,r,[x,b])}for(let e=b;e>C;e/=2){let t=getInputs(),a=new MergeProgram([x,e/2]),n=null===v?1:0,o=[[c],[n],[C]],i=v;v=r.runWebGLProgram(a,t,"int32",o),disposeIntermediateTensorInfoOrNull(r,i);let s=C/2,l=2*s;for(let e=s;e>=1;e/=2)runSwap(l,e,v.shape)}let y=v;v=slice({inputs:{x:v},backend:r,attrs:{begin:0,size:[x,o]}}),disposeIntermediateTensorInfoOrNull(r,y);let I=gatherV2({inputs:{x:g,indices:v},backend:r,attrs:{axis:1,batchDims:1}});disposeIntermediateTensorInfoOrNull(r,g);let $=d.slice(0,-1);$.push(o),y=v,v=reshape({inputs:{x:v},attrs:{shape:$},backend:r}),disposeIntermediateTensorInfoOrNull(r,y);let k=I;return I=reshape({inputs:{x:I},attrs:{shape:$},backend:r}),disposeIntermediateTensorInfoOrNull(r,k),[I,v]}};/**
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
 */let TransformProgram=class TransformProgram{constructor(e,t,r,a,n,o){let i;switch(this.variableNames=["Image","Transforms"],this.outputShape=o,a){case"constant":default:i=1;break;case"reflect":i=2;break;case"wrap":i=3;break;case"nearest":i=4}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${i} == 2) {
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
              } else if (${i} == 3) {
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
              } else if (${i} == 4) {
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
                outputValue = float(${n});
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
                outputValue = float(${n});
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
        `}};let nd={kernelName:i.wx7,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{image:n,transforms:o}=t,{interpolation:i,fillMode:s,fillValue:l,outputShape:u}=a,[d,c,p,h]=n.shape,[f,m]=null!=u?u:[c,p],x=new TransformProgram(c,p,i,s,l,[d,f,m,h]);return r.runWebGLProgram(x,[n,o],"float32")}},nc={kernelName:i.kpP,backendName:"webgl",kernelFunc:/**
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
 */function(e){let{inputs:t,attrs:r,backend:a}=e,{axis:n}=r,{x:o}=t;(0,d.assertNotComplex)(o,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let i=a.readSync(o.dataId),{outputValues:s,outputShape:l,indices:u}=(0,E.CV)(i,n,o.shape,o.dtype);return[a.makeTensorInfo(l,o.dtype,s),a.makeTensorInfo([u.length],"int32",u)]}},np={kernelName:i.ToN,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{value:n}=t,{axis:o}=a;o<0&&(o+=n.shape.length);let i=n.shape.length,s=n.shape[o],l=Array(i-1),u=0;for(let e=0;e<i;e++)e!==o&&(l[u++]=n.shape[e]);let d=[],c=Array(i).fill(0),p=n.shape.slice();p[o]=1;let h=Array(s);for(let e=0;e<h.length;e++){c[o]=e;let t=slice({inputs:{x:n},backend:r,attrs:{begin:c,size:p}}),a=reshape({inputs:{x:t},backend:r,attrs:{shape:l}});h[e]=a,d.push(t)}return d.forEach(e=>r.disposeIntermediateTensorInfo(e)),h}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let SegmentOpProgram=class SegmentOpProgram{constructor(e,t){this.variableNames=["x","segmentIds"];let r=e.windowSize,a=e.batchSize,n=e.inSize,o=e.numSegments;this.outputShape=[a,o*Math.ceil(n/r)];let i=4*Math.floor(r/4),s=r%4,l=`
        sumValue += dot(values, segFilter);
    `,u="";n%r>0&&(u=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return initializationValue;
        }
      `);let d="";n%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${n}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        ${u}
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
          ${o})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${o})));

        float sumValue = 0.0;

        for (int i = 0; i < ${i}; i += 4) {
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

          ${l}
        }

        int inIdx = inOffset + ${i};
        if (${1===s}) {
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

          ${l}
        } else if (${2===s}) {
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

          ${l}
        } else if (${3===s}) {
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

          ${l}
        }
        setOutput(sumValue);
      }
    `}};let nh={kernelName:i.Qvg,backendName:"webgl",kernelFunc:/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function(e){let{inputs:t,backend:r,attrs:a}=e,{x:n,segmentIds:o}=t,{numSegments:s}=a,l=n.shape.length,u=[],d=0,c=i.backend_util.getAxesPermutation([d],l),p=n;null!=c&&(p=transpose({inputs:{x:n},backend:r,attrs:{perm:c}}),u.push(p),d=i.backend_util.getInnerMostAxes(1,l)[0]);let h=i.backend_util.segment_util.computeOutShape(p.shape,d,s),f=i.D5U.sizeFromShape([p.shape[d]]),m=reshape({inputs:{x:p},backend:r,attrs:{shape:[-1,f]}});u.push(m);let x=(0,i.z4k)(n.dtype),segOpCompute=(e,t,a,n,o)=>{let s=e.shape[0],l=e.shape[1],d=i.backend_util.segment_util.segOpComputeOptimalWindowSize(l,o),c=new SegmentOpProgram({windowSize:d,inSize:l,batchSize:s,numSegments:o},t),p=r.compileAndRun(c,[e,a],n);if(u.push(p),p.shape[1]===o)return p;let h=range({backend:r,attrs:{start:0,stop:o,step:1,dtype:"float32"}}),f=tile({inputs:{x:h},backend:r,attrs:{reps:[l/d]}});u.push(h),u.push(f);let m=segOpCompute(p,t,f,n,o);return m},g=segOpCompute(m,"unsortedSegmentSum",o,x,s),C=reshape({inputs:{x:g},backend:r,attrs:{shape:h}}),b=C;if(null!=c){u.push(C);let e=i.backend_util.getUndoAxesPermutation(c);b=transpose({inputs:{x:b},backend:r,attrs:{perm:e}})}return u.forEach(e=>r.disposeIntermediateTensorInfo(e)),b}};for(let e of[L,U,G,H,Y,q,Q,Z,J,ee,ea,ei,eu,eh,ex,eg,eC,eb,ev,ey,eI,eR,eT,eS,eF,eP,eB,eL,v,eV,eW,eG,ez,eX,eH,ej,eK,eZ,e1,e2,e4,e3,e5,e6,e7,e8,e9,te,tt,tr,to,ts,td,th,tg,tC,ty,tI,t$,tk,tw,tE,tO,t_,tD,tB,tL,tW,tz,b,tX,eU,tj,tY,tQ,$,t0,t4,t3,t8,rt,rn,ri,ru,rd,rc,rp,rx,rg,rC,rb,rv,ry,rI,r$,rw,rN,rA,rW,O,rz,rH,rK,rq,eA,rQ,rJ,r0,r1,r5,T,r6,r7,r8,r9,ae,eO,rD,ar,ai,ad,_,ac,ap,ah,af,am,ax,ab,ay,aI,a$,ak,aw,aE,aP,aL,aW,ek,rU,az,aX,aH,aj,aK,aY,aq,aQ,a0,a2,a5,a6,a7,a8,a9,ne,nt,rV,D,na,ni,ns,nl,nu,nd,B,nc,np,nh,rZ])(0,i.wCN)(e);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */},13082:function(e,t,r){r.d(t,{$O:function(){return $},$j:function(){return X},$u:function(){return z},A0:function(){return H},AR:function(){return W},B_:function(){return g},Bk:function(){return M},Bo:function(){return w},CJ:function(){return B},CV:function(){return Z},F1:function(){return G},Fv:function(){return Q},KX:function(){return Y},LS:function(){return U},M8:function(){return E},MZ:function(){return f},PQ:function(){return y},Qs:function(){return F},Rn:function(){return v},Sd:function(){return I},St:function(){return P},TD:function(){return m},Tg:function(){return S},Th:function(){return T},UN:function(){return D},X8:function(){return V},XM:function(){return s},Y1:function(){return _},_9:function(){return j},aX:function(){return p},cK:function(){return n},cZ:function(){return N},cm:function(){return l},cx:function(){return i},fy:function(){return A},gv:function(){return c},hO:function(){return O},ji:function(){return C},kI:function(){return K},kY:function(){return b},m$:function(){return x},n7:function(){return d},nL:function(){return k},nT:function(){return L},oC:function(){return q},pk:function(){return u},qO:function(){return o},r:function(){return R},tx:function(){return h}});var a=r(60297);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let{addImpl:n,bincountImpl:o,bincountReduceImpl:i,bitwiseAndImpl:s,castImpl:l,ceilImpl:u,concatImpl:d,equalImpl:c,expImpl:p,expm1Impl:h,floorImpl:f,gatherNdImpl:m,gatherV2Impl:x,greaterImpl:g,greaterEqualImpl:C,lessImpl:b,lessEqualImpl:v,linSpaceImpl:y,logImpl:I,maxImpl:$,maximumImpl:k,minimumImpl:R,multiplyImpl:T,negImpl:w,notEqualImpl:N,prodImpl:S,raggedGatherImpl:F,raggedRangeImpl:E,raggedTensorToTensorImpl:A,rangeImpl:O,rsqrtImpl:P,scatterImpl:_,sigmoidImpl:D,simpleAbsImpl:B,sliceImpl:L,sparseFillEmptyRowsImpl:V,sparseReshapeImpl:U,sparseSegmentReductionImpl:W,sqrtImpl:M,staticRegexReplaceImpl:G,stridedSliceImpl:z,stringNGramsImpl:X,stringSplitImpl:H,stringToHashBucketFastImpl:j,subImpl:K,tileImpl:Y,topKImpl:q,transposeImpl:Q,uniqueImpl:Z}=a},26694:function(e,t,r){r.d(t,{U:function(){return PackProgram}});var a=r(12224),n=r(75180),o=r(23027);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let PackProgram=class PackProgram{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),0===this.rank)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=(0,n.Ky)("rc",this.rank),t=(0,o.kW)(this.rank),r=this.getOutOfBoundsCondition(e),a=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${t} rc = getOutputCoords();

          if(${r}) {
            setOutput(vec4(0));
          } else {
            ${a}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let r=0;r<=1;r++)for(let a=0;a<=1;a++){let n=`${0===r?"r":"rp1"}, ${0===a?"c":"cp1"}`;for(let t=2;t<this.rank;t++)n=`${e[e.length-1-t]},`+n;t.push(n)}return t}getOutOfBoundsCondition(e){if(1===this.rank)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let r=this.rank-2;r<this.rank;r++)t+=`${e[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(t+="||");return t}getSetup(e){if(1===this.rank)return"";let t=e.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],a=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${a};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);if(1===this.rank){let e=this.enableShapeUniforms?"outShape":this.outputShape[0];return`getA(rc), (rc + 1 >= ${e} ? 0. : getA(rc + 1)), 0, 0`}return`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}}},75180:function(e,t,r){/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getVecChannels(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function getChannels(e,t){return 1===t?[e]:getVecChannels(e,t)}function getSourceCoords(e,t){if(1===e)return"rc";let r="";for(let a=0;a<e;a++)r+=t[a],a<e-1&&(r+=",");return r}r.d(t,{Ky:function(){return getChannels},Qc:function(){return getSourceCoords},k6:function(){return getVecChannels}})},42123:function(e,t,r){r.d(t,{v:function(){return ReshapePackedProgram}});var a=r(12224),n=r(84305);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ReshapePackedProgram=class ReshapePackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let r="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),r+=`
        ${t}
        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${e>0?"}":""}
      `}this.userCode=`
      ${function(e,t){let r=t?n.al(["r","c","d"],"inputShape"):n.RW(["r","c","d"],e);return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${r}
      return ivec3(r, c, d);
    }
  `}(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?n.nc():n.ku(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${r}

        setOutput(result);
      }
    `}}},84305:function(e,t,r){r.d(t,{Kn:function(){return getOutputLogicalCoordinatesFromFlatIndexByUniform},RW:function(){return getLogicalCoordinatesFromFlatIndex},al:function(){return getLogicalCoordinatesFromFlatIndexByUniform},ku:function(){return getFlatIndexFrom3D},nc:function(){return getFlatIndexFrom3DOutput},ye:function(){return n}});var a=r(32307);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function getLogicalCoordinatesFromFlatIndex(e,t,r="index"){let n=a.D5U.computeStrides(t);return n.map((t,a)=>{let o=`int ${e[a]} = ${r} / ${t}`,i=a===n.length-1?`int ${e[a+1]} = ${r} - ${e[a]} * ${t}`:`index -= ${e[a]} * ${t}`;return`${o}; ${i};`}).join("")}function getOutputLogicalCoordinatesFromFlatIndexByUniform(e,t,r="index"){let n=a.D5U.computeStrides(t);return n.map((t,a)=>{let o=`int ${e[a]} = ${r} / outShapeStrides[${a}]`,i=a===n.length-1?`int ${e[a+1]} = ${r} - ${e[a]} * outShapeStrides[${a}]`:`index -= ${e[a]} * outShapeStrides[${a}]`;return`${o}; ${i};`}).join("")}function getLogicalCoordinatesFromFlatIndexByUniform(e,t,r="index"){let a=e.map((e,t)=>t),n=function(e,t){let r=e.length,a=e.map(e=>`${t}[${e}]`),n=Array(r-1);n[r-2]=a[r-1];for(let e=r-3;e>=0;--e)n[e]=`(${n[e+1]} * ${a[e+1]})`;return n}(a,t);return n.map((t,a)=>{let o=`int ${e[a]} = ${r} / ${n[a]}`,i=a===n.length-1?`int ${e[a+1]} = ${r} - ${e[a]} * ${n[a]}`:`index -= ${e[a]} * ${n[a]}`;return`${o}; ${i};`}).join("")}function getFlatIndexFrom3D(e){let t=a.D5U.computeStrides(e).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function getFlatIndexFrom3DOutput(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}let n=`
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
`},72704:function(e,t,r){r.d(t,{Se:function(){return getPackedRGBAArraySizeFromMatrixShape},Sq:function(){return getTextureConfig},V9:function(){return l},Yz:function(){return getDenseTexShape},kk:function(){return getUnpackedMatrixTextureShapeWidthHeight},m1:function(){return i},qe:function(){return getPackedMatrixTextureShapeWidthHeight},v2:function(){return s},yb:function(){return getUnpackedArraySizeFromMatrixSize}});var a,n,o,i,s,l,u=r(32307);function getUnpackedMatrixTextureShapeWidthHeight(e,t){return[t,e]}function getUnpackedArraySizeFromMatrixSize(e,t){return e*t}function getDenseTexShape(e){let t=u.D5U.sizeFromShape(e);return u.D5U.sizeToSquarishShape(Math.ceil(t/4))}function getPackedMatrixTextureShapeWidthHeight(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function getPackedRGBAArraySizeFromMatrixShape(e,t){let[r,a]=getPackedMatrixTextureShapeWidthHeight(e,t);return r*a*4}function getTextureConfig(e,t){let r,a,n,o,i,s,l,d,c,p;return 2===(0,u.OBj)().getNumber("WEBGL_VERSION")?(r=e.R32F,a=e.R16F,n=e.RGBA16F,o=e.RGBA32F,i=e.RED,l=4,d=1,c=e.HALF_FLOAT,p=e.FLOAT,s=e.RGBA8):(r=e.RGBA,a=e.RGBA,n=e.RGBA,o=e.RGBA,i=e.RGBA,l=4,d=4,c=null!=t?t.HALF_FLOAT_OES:null,p=e.FLOAT,s=e.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:a,internalFormatPackedHalfFloat:n,internalFormatPackedFloat:o,textureFormatFloat:i,downloadTextureFormat:s,downloadUnpackNumChannels:l,defaultNumChannels:d,textureTypeHalfFloat:c,textureTypeFloat:p}}(a=i||(i={}))[a.DENSE=0]="DENSE",a[a.SHARED_BATCH=1]="SHARED_BATCH",(n=s||(s={}))[n.RENDER=0]="RENDER",n[n.UPLOAD=1]="UPLOAD",n[n.PIXELS=2]="PIXELS",n[n.DOWNLOAD=3]="DOWNLOAD",(o=l||(l={}))[o.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",o[o.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",o[o.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",o[o.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",o[o.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"},98255:function(e,t,r){r.d(t,{I:function(){return TextureManager}});var a=r(32307),n=r(81377),o=r(72704);/**
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
 */let TextureManager=class TextureManager{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,r){let a;let n=getPhysicalFromLogicalTextureType(t,r),i=getKeyFromTextureShape(e,n,r);i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]);let s=computeBytes(e,n,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=s,this.log();let e=this.freeTextures[i].pop();return this.usedTextures[i].push(e),e}return n===o.V9.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):n===o.V9.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):n===o.V9.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):n===o.V9.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):n===o.V9.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[i].push(a),this.numUsedTextures++,this._numBytesAllocated+=s,this.log(),a}releaseTexture(e,t,r,n){if(null==this.freeTextures)return;let o=getPhysicalFromLogicalTextureType(r,n),i=getKeyFromTextureShape(t,o,n);i in this.freeTextures||(this.freeTextures[i]=[]);let s=computeBytes(t,o,this.gpgpu.gl,this.gpgpu.textureConfig,n),l=(0,a.OBj)().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==l&&this._numBytesAllocated>l?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=s):(this.freeTextures[i].push(e),this.numFreeTextures++,this._numBytesFree+=s),this.numUsedTextures--;let u=this.usedTextures[i],d=u&&u.indexOf(e);if(null==d||d<0)throw Error("Cannot release a texture that was never provided by this texture manager");u[d]=u[u.length-1],u.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(let e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function computeBytes(e,t,r,a,i){let s;let l=function(e,t){switch(e){case o.V9.PACKED_2X2_FLOAT32:return(0,n.getInternalFormatForPackedMatrixTexture)(t);case o.V9.PACKED_2X2_FLOAT16:return(0,n.getInternalFormatForFloat16PackedMatrixTexture)(t);case o.V9.UNPACKED_FLOAT32:return(0,n.getInternalFormatForFloat32MatrixTexture)(t);case o.V9.UNPACKED_FLOAT16:return(0,n.getInternalFormatForFloat16MatrixTexture)(t);case o.V9.PACKED_4X1_UNSIGNED_BYTE:return(0,n.getInternalFormatForUnsignedBytesMatrixTexture)(t);default:throw Error(`Unknown physical texture type ${e}`)}}(t,a);if(i){let[t,r]=(0,o.qe)(e[0],e[1]);s=t*r}else{let[t,r]=(0,o.kk)(e[0],e[1]);s=t*r}let u=function(e,t){if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F||t===e.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw Error(`Unknown internal format ${t}`)}(r,l);return s*u}function getPhysicalFromLogicalTextureType(e,t){if(e===o.v2.UPLOAD)return o.V9.PACKED_2X2_FLOAT32;if(e===o.v2.RENDER||null==e)return(0,a.OBj)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?o.V9.PACKED_2X2_FLOAT32:o.V9.UNPACKED_FLOAT32:t?o.V9.PACKED_2X2_FLOAT16:o.V9.UNPACKED_FLOAT16;if(e===o.v2.DOWNLOAD||e===o.v2.PIXELS)return o.V9.PACKED_4X1_UNSIGNED_BYTE;throw Error(`Unknown logical texture type ${e}`)}function getKeyFromTextureShape(e,t,r){return`${e[0]}_${e[1]}_${t}_${r}`}},89520:function(e,t,r){r.d(t,{Cv:function(){return s},D1:function(){return n},Et:function(){return i},RX:function(){return l},Tq:function(){return c},bl:function(){return d},eW:function(){return u},l:function(){return UnaryOpProgram},t$:function(){return o}});var a=r(12224);/**
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
 */let UnaryOpProgram=class UnaryOpProgram{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}};let n="if (isnan(x)) return x;",o="return x;",i="return abs(x);",s="return (x >= 0.0) ? x : (exp(x) - 1.0);",l=n+`
  return (x < 0.0) ? 0.0 : x;
`,u=n+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,d="return x;",c="return 1.0 / (1.0 + exp(-1.0 * x));"},29492:function(e,t,r){r.d(t,{Cv:function(){return o},RX:function(){return i},Tq:function(){return l},cc:function(){return UnaryOpPackedProgram},eW:function(){return s},t$:function(){return n}});var a=r(12224);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let n="return x;",o=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,i=`
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
`,l="return 1.0 / (1.0 + exp(-1.0 * x));";let UnaryOpPackedProgram=class UnaryOpPackedProgram{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}},93129:function(e,t,r){r.d(t,{W:function(){return UnpackProgram}});var a=r(12224),n=r(75180),o=r(23027);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let UnpackProgram=class UnpackProgram{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=(0,a.C9)(this.outputShape.length);let t=e.length,r=(0,n.Ky)("rc",t),i=(0,o.kW)(t),s=(0,n.Qc)(t,r),l=r.slice(-2),u=t<=1?"rc":`vec2(${l.join(",")})`;this.userCode=`
      void main() {
        ${i} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${u}));
      }
    `}}},19659:function(e,t,r){let a,n;r.r(t),r.d(t,{assertNotComplex:function(){return assertNotComplex},bindCanvasToFramebuffer:function(){return bindCanvasToFramebuffer},bindColorTextureToFramebuffer:function(){return bindColorTextureToFramebuffer},bindTextureToProgramUniformSampler:function(){return bindTextureToProgramUniformSampler},bindTextureUnit:function(){return bindTextureUnit},bindVertexBufferToProgramAttribute:function(){return bindVertexBufferToProgramAttribute},callAndCheck:function(){return callAndCheck},canBeRepresented:function(){return canBeRepresented},createFragmentShader:function(){return createFragmentShader},createFramebuffer:function(){return createFramebuffer},createProgram:function(){return createProgram},createStaticIndexBuffer:function(){return createStaticIndexBuffer},createStaticVertexBuffer:function(){return createStaticVertexBuffer},createTexture:function(){return createTexture},createVertexShader:function(){return createVertexShader},getBatchDim:function(){return getBatchDim},getExtensionOrThrow:function(){return getExtensionOrThrow},getFramebufferErrorMessage:function(){return getFramebufferErrorMessage},getMaxTexturesInShader:function(){return getMaxTexturesInShader},getNumChannels:function(){return getNumChannels},getProgramUniformLocation:function(){return getProgramUniformLocation},getProgramUniformLocationOrThrow:function(){return getProgramUniformLocationOrThrow},getRowsCols:function(){return getRowsCols},getShapeAs3D:function(){return getShapeAs3D},getTextureShapeFromLogicalShape:function(){return getTextureShapeFromLogicalShape},getWebGLDisjointQueryTimerVersion:function(){return getWebGLDisjointQueryTimerVersion},getWebGLErrorMessage:function(){return getWebGLErrorMessage},getWebGLMaxTextureSize:function(){return getWebGLMaxTextureSize},hasExtension:function(){return hasExtension},isCapableOfRenderingToFloatTexture:function(){return isCapableOfRenderingToFloatTexture},isDownloadFloatTextureEnabled:function(){return isDownloadFloatTextureEnabled},isReshapeFree:function(){return isReshapeFree},isWebGLFenceEnabled:function(){return isWebGLFenceEnabled},isWebGLVersionEnabled:function(){return isWebGLVersionEnabled},linkProgram:function(){return linkProgram},logShaderSourceAndInfoLog:function(){return logShaderSourceAndInfoLog},resetMaxTextureSize:function(){return resetMaxTextureSize},resetMaxTexturesInShader:function(){return resetMaxTexturesInShader},unbindColorTextureFromFramebuffer:function(){return unbindColorTextureFromFramebuffer},unbindTextureUnit:function(){return unbindTextureUnit},validateFramebuffer:function(){return validateFramebuffer},validateProgram:function(){return validateProgram},validateTextureSize:function(){return validateTextureSize}});var o=r(32307),i=r(20540),s=r(72704);/**
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
 */function callAndCheck(e,t){let r=t();return(0,o.OBj)().getBool("DEBUG")&&function(e){let t=e.getError();if(t!==e.NO_ERROR)throw Error("WebGL Error: "+getWebGLErrorMessage(e,t))}(e),r}function canBeRepresented(e){return!!((0,o.OBj)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===e||596e-10<Math.abs(e)&&65504>Math.abs(e))}function getWebGLErrorMessage(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function getExtensionOrThrow(e,t){return throwIfNull(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function createVertexShader(e,t){let r=throwIfNull(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(callAndCheck(e,()=>e.shaderSource(r,t)),callAndCheck(e,()=>e.compileShader(r)),!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(r)),Error("Failed to compile vertex shader.");return r}function createFragmentShader(e,t){let r=throwIfNull(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(callAndCheck(e,()=>e.shaderSource(r,t)),callAndCheck(e,()=>e.compileShader(r)),(0,o.OBj)().get("ENGINE_COMPILE_ONLY"))return r;if(!1===e.getShaderParameter(r,e.COMPILE_STATUS))throw logShaderSourceAndInfoLog(t,e.getShaderInfoLog(r)),Error("Failed to compile fragment shader.");return r}let l=/ERROR: [0-9]+:([0-9]+):/g;function logShaderSourceAndInfoLog(e,t){let r=l.exec(t);if(null==r){console.log(`Couldn't parse line number in error: ${t}`),console.log(e);return}let a=+r[1],n=e.split("\n"),i=n.length.toString().length+2,s=n.map((e,t)=>o.D5U.rightPad((t+1).toString(),i)+e),u=0;for(let e=0;e<s.length;e++)u=Math.max(s[e].length,u);let d=s.slice(0,a-1),c=s.slice(a-1,a),p=s.slice(a);console.log(d.join("\n")),console.log(t.split("\n")[0]),console.log(`%c ${o.D5U.rightPad(c[0],u)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(p.join("\n"))}function createProgram(e){return throwIfNull(e,()=>e.createProgram(),"Unable to create WebGLProgram.")}function linkProgram(e,t){if(callAndCheck(e,()=>e.linkProgram(t)),!(0,o.OBj)().get("ENGINE_COMPILE_ONLY")&&!1===e.getProgramParameter(t,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Failed to link vertex and fragment shaders.")}function validateProgram(e,t){if(callAndCheck(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),Error("Shader program validation failed.")}function createStaticVertexBuffer(e,t){let r=throwIfNull(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),callAndCheck(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function createStaticIndexBuffer(e,t){let r=throwIfNull(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return callAndCheck(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,r)),callAndCheck(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),r}function getNumChannels(){return 2===(0,o.OBj)().getNumber("WEBGL_VERSION")?1:4}function createTexture(e){return throwIfNull(e,()=>e.createTexture(),"Unable to create WebGLTexture.")}function validateTextureSize(e,t){let r=(0,o.OBj)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0){let r=`[${e}x${t}]`;throw Error("Requested texture size "+r+" is invalid.")}if(e>r||t>r){let a=`[${e}x${t}]`,n=`[${r}x${r}]`;throw Error("Requested texture size "+a+" greater than WebGL maximum on this browser / GPU "+n+".")}}function createFramebuffer(e){return throwIfNull(e,()=>e.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function bindVertexBufferToProgramAttribute(e,t,r,a,n,o,i){let s=e.getAttribLocation(t,r);return -1!==s&&(callAndCheck(e,()=>e.bindBuffer(e.ARRAY_BUFFER,a)),callAndCheck(e,()=>e.vertexAttribPointer(s,n,e.FLOAT,!1,o,i)),callAndCheck(e,()=>e.enableVertexAttribArray(s)),!0)}function bindTextureUnit(e,t,r){validateTextureUnit(e,r),callAndCheck(e,()=>e.activeTexture(e.TEXTURE0+r)),callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,t))}function unbindTextureUnit(e,t){validateTextureUnit(e,t),callAndCheck(e,()=>e.activeTexture(e.TEXTURE0+t)),callAndCheck(e,()=>e.bindTexture(e.TEXTURE_2D,null))}function getProgramUniformLocationOrThrow(e,t,r){return throwIfNull(e,()=>e.getUniformLocation(t,r),'uniform "'+r+'" not present in program.')}function getProgramUniformLocation(e,t,r){return e.getUniformLocation(t,r)}function bindTextureToProgramUniformSampler(e,t,r,a){callAndCheck(e,()=>bindTextureUnit(e,t,a)),callAndCheck(e,()=>e.uniform1i(r,a))}function bindCanvasToFramebuffer(e){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),callAndCheck(e,()=>e.viewport(0,0,e.canvas.width,e.canvas.height)),callAndCheck(e,()=>e.scissor(0,0,e.canvas.width,e.canvas.height))}function bindColorTextureToFramebuffer(e,t,r){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,r)),callAndCheck(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function unbindColorTextureFromFramebuffer(e,t){callAndCheck(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),callAndCheck(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function validateFramebuffer(e){let t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw Error("Error binding framebuffer: "+getFramebufferErrorMessage(e,t))}function getFramebufferErrorMessage(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function throwIfNull(e,t,r){let a=callAndCheck(e,()=>t());if(null==a)throw Error(r);return a}function validateTextureUnit(e,t){let r=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,a=t+e.TEXTURE0;if(a<e.TEXTURE0||a>r){let e=`[gl.TEXTURE0, gl.TEXTURE${r}]`;throw Error(`textureUnit must be in ${e}.`)}}function getBatchDim(e,t=2){return o.D5U.sizeFromShape(e.slice(0,e.length-t))}function getRowsCols(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function getShapeAs3D(e){let t=[1,1,1],r=0===e.length||1===e.length&&1===e[0];return r||(t=[getBatchDim(e),...getRowsCols(e)]),t}function getTextureShapeFromLogicalShape(e,t=!1){let r=(0,o.OBj)().getNumber("WEBGL_MAX_TEXTURE_SIZE"),a=(0,o.OBj)().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");if(a===1/0&&(0,o.OBj)().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(a=r/2),t&&(r*=2,a*=2,1===(e=e.map((t,r)=>r>=e.length-2?o.D5U.nearestLargerEven(e[r]):e[r])).length&&(e=[2,e[0]])),2!==e.length){let t=o.D5U.squeezeShape(e);e=t.newShape}let n=o.D5U.sizeFromShape(e),i=null;e.length<=1&&n<=r?i=[1,n]:2===e.length&&e[0]<=r&&e[1]<=r?i=e:3===e.length&&e[0]*e[1]<=r&&e[2]<=r?i=[e[0]*e[1],e[2]]:3===e.length&&e[0]<=r&&e[1]*e[2]<=r?i=[e[0],e[1]*e[2]]:4===e.length&&e[0]*e[1]*e[2]<=r&&e[3]<=r?i=[e[0]*e[1]*e[2],e[3]]:4===e.length&&e[0]<=r&&e[1]*e[2]*e[3]<=r&&(i=[e[0],e[1]*e[2]*e[3]]);let s=null!=i&&Math.max(...i)>a&&Math.min(...i)<=(t?2:1)&&Math.min(...i)>0;if(null==i||s){if(t){let t=getBatchDim(e),r=2,a=2;e.length&&([r,a]=getRowsCols(e)),n=t*(r/2)*(a/2),i=o.D5U.sizeToSquarishShape(n).map(e=>2*e)}else i=o.D5U.sizeToSquarishShape(n)}return i}function isReshapeFree(e,t){if(e=e.slice(-2),t=t.slice(-2),o.D5U.arraysEqual(e,t)||!e.length||!t.length||0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){let r=e[e.length-1],a=t[t.length-1];if(r===a||r%2==0&&a%2==0&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&e[0]%2==0&&t[0]%2==0}function getWebGLMaxTextureSize(e){if(null==a){let t=(0,i.jl)(e);a=t.getParameter(t.MAX_TEXTURE_SIZE)}return a}function resetMaxTextureSize(){a=null}function resetMaxTexturesInShader(){n=null}function getMaxTexturesInShader(e){if(null==n){let t=(0,i.jl)(e);n=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,n)}function getWebGLDisjointQueryTimerVersion(e){if(0===e)return 0;let t=(0,i.jl)(e);return hasExtension(t,"EXT_disjoint_timer_query_webgl2")&&2===e?2:hasExtension(t,"EXT_disjoint_timer_query")?1:0}function hasExtension(e,t){let r=e.getExtension(t);return null!=r}function isWebGLVersionEnabled(e){try{let t=(0,i.jl)(e);if(null!=t)return!0}catch(e){console.log("Error when getting WebGL context: ",e)}return!1}function isCapableOfRenderingToFloatTexture(e){if(0===e)return!1;let t=(0,i.jl)(e);if(1===e){if(!hasExtension(t,"OES_texture_float"))return!1}else if(!hasExtension(t,"EXT_color_buffer_float"))return!1;let r=createFloatTextureAndBindToFramebuffer(t);return r}function isDownloadFloatTextureEnabled(e){if(0===e)return!1;let t=(0,i.jl)(e);if(1===e){if(!hasExtension(t,"OES_texture_float")||!hasExtension(t,"WEBGL_color_buffer_float"))return!1}else{if(hasExtension(t,"EXT_color_buffer_float"))return createFloatTextureAndBindToFramebuffer(t);let e="EXT_color_buffer_half_float";if(hasExtension(t,e)){let r=t.getExtension(e);return function(e,t){let r=(0,s.Sq)(e,t),a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,r.internalFormatHalfFloat,1,1,0,r.textureFormatFloat,r.textureTypeHalfFloat,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0);let o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(a),e.deleteFramebuffer(n),o}(t,r)}return!1}let r=createFloatTextureAndBindToFramebuffer(t);return r}function createFloatTextureAndBindToFramebuffer(e){let t=(0,s.Sq)(e),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let n=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(a),n}function isWebGLFenceEnabled(e){if(2!==e)return!1;let t=(0,i.jl)(e),r=null!=t.fenceSync;return r}function assertNotComplex(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&o.D5U.assert("complex64"!==e.dtype,()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}}}]);
//# sourceMappingURL=7562.72e012a08b449aba.js.map