"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7618],{48334:function(e,t,n){n.d(t,{Tt:function(){return getUniformInfoFromShape},Vm:function(){return makeShader},kW:function(){return getCoordsDataType}});var r=n(81284),i=n(97918),o=n(64127);/**
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
 */let{getBroadcastDims:a}=r.backend_util;function makeShader(e,t,n){let x,s;let h=[];if(e.forEach(e=>{let t=r.D5U.sizeFromShape(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?h.push(`uniform float ${e.name}${t>1?`[${t}]`:""};`):(h.push(`uniform sampler2D ${e.name};`),h.push(`uniform int offset${e.name};`)),n.enableShapeUniforms){let{uniformShape:t}=getUniformInfoFromShape(n.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(t.length){case 1:h.push(`uniform int ${e.name}Shape;`);break;case 2:h.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:h.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:h.push(`uniform ivec4 ${e.name}Shape;`)}h.push(`uniform ivec2 ${e.name}TexShape;`)}}),n.enableShapeUniforms){switch(t.logicalShape.length){case 1:h.push("uniform int outShape;");break;case 2:h.push("uniform ivec2 outShape;"),h.push("uniform int outShapeStrides;");break;case 3:h.push("uniform ivec3 outShape;"),h.push("uniform ivec2 outShapeStrides;");break;case 4:h.push("uniform ivec4 outShape;"),h.push("uniform ivec3 outShapeStrides;")}h.push("uniform ivec2 outTexShape;")}n.customUniforms&&n.customUniforms.forEach(e=>{h.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:""};`)});let d=h.join("\n"),f=e.map(e=>(function(e,t,n=!1,o){let l="";n?l+=function getPackedSamplerFromInInfo(e,t){let n=e.shapeInfo.logicalShape;switch(n.length){case 0:return function(e){let t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1),r=(0,i.A)();return`
    vec4 ${n}() {
      return ${r.texture2D}(${t}, halfCR);
    }
  `}(e);case 1:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape,a=(0,i.A)();if(t)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${a.texture2D}(${n}, uv);
    }
  `;let l=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${l[0]}, ${l[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }
  `}(e,t);case 2:return function(e,t){let n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=e.shapeInfo.texShape,u=l[0],c=l[1],p=(0,i.A)();if(null!=l&&r.D5U.arraysEqual(n,l))return t?`
      vec4 ${a}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);

        return ${p.texture2D}(${o}, uv);
      }
    `:`
      vec4 ${a}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${c}.0, ${u}.0);

        return ${p.texture2D}(${o}, uv);
      }
    `;if(t)return`
    vec4 ${a}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `;let x=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)],s=Math.ceil(n[1]/2);return`
    vec4 ${a}(int row, int col) {
      vec2 uv = packedUVfrom2D(${s}, ${x[0]}, ${x[1]}, row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `}(e,t);case 3:return function(e,t){let n=e.shapeInfo.logicalShape,r=e.name,o="get"+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,l=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];if(1===n[0]){let r=n.slice(1),i=squeezeInputInfo(e,r);return`
        ${getPackedSamplerFromInInfo(i,t)}
        vec4 ${o}(int b, int row, int col) {
          return ${o}(${getSqueezedParams(["b","row","col"],[1,2])});
        }
      `}let u=(0,i.A)();if(t)return`
    vec4 ${o}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${u.texture2D}(${r}, uv);
    }
  `;let c=l[0],p=l[1],x=Math.ceil(n[2]/2),s=x*Math.ceil(n[1]/2);return`
    vec4 ${o}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${p}, ${s}, ${x}, b, row, col);
      return ${u.texture2D}(${r}, uv);
    }
  `}(e,t);default:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=(0,i.A)();if(t)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${n}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${n}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${n}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${o.texture2D}(${n}, uv);
    }
  `;let a=e.shapeInfo.logicalShape,l=a.length,u=e.shapeInfo.texShape,c=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],p=c[0],x=c[1],s=Math.ceil(a[l-1]/2),h=s*Math.ceil(a[l-2]/2),d="int b, int row, int col",f=`b * ${h} + (row / 2) * ${s} + (col / 2)`;for(let e=2;e<l-1;e++)d=`int b${e}, `+d,h*=a[l-e-1],f=`b${e} * ${h} + `+f;return`
    vec4 ${r}(${d}) {
      int index = ${f};
      int texR = index / ${x};
      int texC = index - texR * ${x};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${x}, ${p});
      return ${o.texture2D}(${n}, uv);
    }
  `}(e,t)}}(e,o):l+=function getSamplerFromInInfo(e,t=!1){let n=e.shapeInfo.logicalShape;switch(n.length){case 0:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`float ${r}() {return ${n};}`;let[i,o]=e.shapeInfo.texShape;if(1===i&&1===o)return`
      float ${r}() {
        return sampleTexture(${n}, halfCR);
      }
    `;let a=getFlatOffsetUniformName(n);if(t)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], ${a});
      return sampleTexture(${n}, uv);
    }
  `;let[l,u]=e.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${l}, ${u}, ${a});
      return sampleTexture(${n}, uv);
    }
  `}(e,t);case 1:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${getUniformSampler(e)}
      }
    `;let i=e.shapeInfo.texShape,o=i[0],a=i[1];if(1===a&&1===o)return`
      float ${r}(int index) {
        return sampleTexture(${n}, halfCR);
      }
    `;let l=getFlatOffsetUniformName(n);return 1===a?t?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / float(${n}TexShape[0]));
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / ${o}.0);
        return sampleTexture(${n}, uv);
      }
    `:1===o?t?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / float(${n}TexShape[1]), 0.5);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / ${a}.0, 0.5);
        return sampleTexture(${n}, uv);
      }
    `:t?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index + ${l});
      return sampleTexture(${n}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${o}, ${a}, index + ${l});
      return sampleTexture(${n}, uv);
    }
  `}(e,t);case 2:return function(e,t){let n=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=e.shapeInfo.texShape;if(null!=a&&r.D5U.arraysEqual(n,a)){if(t)return`
      float ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}TexShape[1], ${i}TexShape[0]);
        return sampleTexture(${i}, uv);
      }
    `;let e=a[0],n=a[1];return`
    float ${o}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${n}.0, ${e}.0);
      return sampleTexture(${i}, uv);
    }
  `}let{newShape:l,keptDims:u}=r.D5U.squeezeShape(n);if(l.length<n.length){let n=squeezeInputInfo(e,l);return`
      ${getSamplerFromInInfo(n,t)}
      float ${o}(int row, int col) {
        return ${o}(${getSqueezedParams(["row","col"],u)});
      }
    `}if(e.shapeInfo.isUniform)return`
      float ${o}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${n[1]}, 1)));
        ${getUniformSampler(e)}
      }
    `;let c=a[0],p=a[1],x=getFlatOffsetUniformName(i);return 1===p?t?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${x}), vec3(${i}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${i}TexShape[0]));
        return sampleTexture(${i}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${x}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
      return sampleTexture(${i}, uv);
    }
  `:1===c?t?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${x}), vec3(${i}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${i}TexShape[1]), 0.5);
        return sampleTexture(${i}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${x}), vec3(${n[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${p}.0, 0.5);
      return sampleTexture(${i}, uv);
    }
  `:t?`
      float ${o}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${i}Shape[1] + col + ${x};
        vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index);
        return sampleTexture(${i}, uv);
      }
    `:`
  float ${o}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${n[1]} + col + ${x};
    vec2 uv = uvFromFlat(${c}, ${p}, index);
    return sampleTexture(${i}, uv);
  }
`}(e,t);case 3:return function(e,t){let n=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=n[1]*n[2],l=n[2],{newShape:u,keptDims:c}=r.D5U.squeezeShape(n);if(u.length<n.length){let n=squeezeInputInfo(e,u);return`
        ${getSamplerFromInInfo(n,t)}
        float ${o}(int row, int col, int depth) {
          return ${o}(${getSqueezedParams(["row","col","depth"],c)});
        }
      `}if(e.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${a}, ${l}, 1)));
        ${getUniformSampler(e)}
      }
    `;let p=e.shapeInfo.texShape,x=p[0],s=p[1],h=e.shapeInfo.flatOffset;if(s===a&&null==h)return t?`
      float ${o}(int row, int col, int depth) {
        int stride1 = ${i}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${i}TexShape[1], ${i}TexShape[0]);
        return sampleTexture(${i}, uv);
      }
    `:`
        float ${o}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${l}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${s}.0, ${x}.0);
          return sampleTexture(${i}, uv);
        }
      `;if(s===l&&null==h)return t?`
      float ${o}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${i}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${i}TexShape[1], ${i}TexShape[0]);
        return sampleTexture(${i}, uv);
      }
    `:`
    float ${o}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${n[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${s}.0, ${x}.0);
      return sampleTexture(${i}, uv);
    }
  `;let d=getFlatOffsetUniformName(i);return t?`
    float ${o}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${i}Shape[1] * ${i}Shape[2];
      int stride1 = ${i}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${d};
      vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index);
      return sampleTexture(${i}, uv);
    }
    `:`
      float ${o}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${a} + col * ${l} + depth + ${d};
        vec2 uv = uvFromFlat(${x}, ${s}, index);
        return sampleTexture(${i}, uv);
      }
  `}(e,t);case 4:return function(e,t){let n=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=n[3],l=n[2]*a,u=n[1]*l,{newShape:c,keptDims:p}=r.D5U.squeezeShape(n);if(c.length<n.length){let n=squeezeInputInfo(e,c);return`
      ${getSamplerFromInInfo(n,t)}
      float ${o}(int row, int col, int depth, int depth2) {
        return ${o}(${getSqueezedParams(["row","col","depth","depth2"],p)});
      }
    `}if(e.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${u}, ${l}, ${a}, 1)));
        ${getUniformSampler(e)}
      }
    `;let x=e.shapeInfo.flatOffset,s=e.shapeInfo.texShape,h=s[0],d=s[1],f=`int stride2 = ${i}Shape[3];`,v=`int stride1 = ${i}Shape[2] * stride2;`,$=`int stride0 = ${i}Shape[1] * stride1;`;if(d===u&&null==x)return t?`
      float ${o}(int row, int col, int depth, int depth2) {
        ${f}
        ${v}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${i}TexShape[1], ${i}TexShape[0]);
        return sampleTexture(${i}, uv);
      }
    `:`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${l}, ${a}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${h}.0);
        return sampleTexture(${i}, uv);
      }
    `;if(d===a&&null==x)return t?`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${i}Shape[1] * ${i}Shape[2], ${i}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${i}TexShape[1], ${i}TexShape[0]);
        return sampleTexture(${i}, uv);
      }
    `:`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${n[1]*n[2]}, ${n[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${h}.0);
        return sampleTexture(${i}, uv);
      }
    `;let S=getFlatOffsetUniformName(i);return t?`
    float ${o}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${v}
      ${$}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index + ${S});
      return sampleTexture(${i}, uv);
    }
  `:`
    float ${o}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} +
          depth * ${a} + depth2;
      vec2 uv = uvFromFlat(${h}, ${d}, index + ${S});
      return sampleTexture(${i}, uv);
    }
  `}(e,t);case 5:return function(e){let t=e.shapeInfo.logicalShape,n=e.name,i="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t[4],a=t[3]*o,l=t[2]*a,u=t[1]*l,{newShape:c,keptDims:p}=r.D5U.squeezeShape(t);if(c.length<t.length){let t=squeezeInputInfo(e,c);return`
      ${getSamplerFromInInfo(t)}
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        return ${i}(${getSqueezedParams(["row","col","depth","depth2","depth3"],p)});
      }
    `}if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${l}, ${a}, ${o})) +
          depth3;
        ${getUniformSampler(e)}
      }
    `;let x=e.shapeInfo.flatOffset,s=e.shapeInfo.texShape,h=s[0],d=s[1];if(d===u&&null==x)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${l}, ${a}, ${o}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${h}.0);
        return sampleTexture(${n}, uv);
      }
    `;if(d===o&&null==x)return`
      float ${i}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${h}.0);
        return sampleTexture(${n}, uv);
      }
    `;let f=getFlatOffsetUniformName(n);return`
    float ${i}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} + depth * ${a} +
          depth2 * ${o} + depth3 + ${f};
      vec2 uv = uvFromFlat(${h}, ${d}, index);
      return sampleTexture(${n}, uv);
    }
  `}(e);case 6:return function(e){let t=e.shapeInfo.logicalShape,n=e.name,i="get"+n.charAt(0).toUpperCase()+n.slice(1),{newShape:o,keptDims:a}=r.D5U.squeezeShape(t);if(o.length<t.length){let t=squeezeInputInfo(e,o);return`
      ${getSamplerFromInInfo(t)}
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${i}(${getSqueezedParams(["row","col","depth","depth2","depth3","depth4"],a)});
      }
    `}let l=t[5],u=t[4]*l,c=t[3]*u,p=t[2]*c,x=t[1]*p;if(e.shapeInfo.isUniform)return`
      float ${i}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${x}, ${p}, ${c}, ${u})) +
          dot(
            vec2(depth3, depth4),
            vec2(${l}, 1)));
        ${getUniformSampler(e)}
      }
    `;let s=e.shapeInfo.flatOffset,h=e.shapeInfo.texShape,d=h[0],f=h[1];if(f===x&&null==s)return`
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${p}, ${c}, ${u}, ${l})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${d}.0);
        return sampleTexture(${n}, uv);
      }
    `;if(f===l&&null==s)return`
      float ${i}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${d}.0);
        return sampleTexture(${n}, uv);
      }
    `;let v=getFlatOffsetUniformName(n);return`
    float ${i}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${x} + col * ${p} + depth * ${c} +
          depth2 * ${u} + depth3 * ${l} + depth4 + ${v};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${n}, uv);
    }
  `}(e);default:throw Error(`${n.length}-D input sampling is not yet supported`)}}(e,o);let u=e.shapeInfo.logicalShape,c=t.logicalShape;return u.length<=c.length&&(n?l+=function(e,t){let n;let i=e.name,o=i.charAt(0).toUpperCase()+i.slice(1),l=e.shapeInfo.logicalShape.length,u=t.logicalShape.length,c=a(e.shapeInfo.logicalShape,t.logicalShape),p=getCoordsDataType(u),x=u-l,s=["x","y","z","w","u","v"];n=0===l?"":u<2&&c.length>=1?"coords = 0;":c.map(e=>`coords.${s[e+x]} = 0;`).join("\n");let h="";h=u<2&&l>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${s[t+x]}`).join(", ");let d="return outputValue;",f=r.D5U.sizeFromShape(e.shapeInfo.logicalShape),v=1===f,$=r.D5U.sizeFromShape(t.logicalShape),S=1===$;if(1!==l||v||S){if(v&&!S)d=1===u?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(c.length){let e=l-2,t=l-1;c.indexOf(e)>-1&&c.indexOf(t)>-1?d="return vec4(outputValue.x);":c.indexOf(e)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":c.indexOf(t)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}}else d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 ${"get"+o+"AtOutCoords"}() {
      ${p} coords = getOutputCoords();
      ${n}
      vec4 outputValue = get${o}(${h});
      ${d}
    }
  `}(e,t):l+=function(e,t){let n;let i=e.name,o=i.charAt(0).toUpperCase()+i.slice(1),l="get"+o+"AtOutCoords",u=t.texShape,c=e.shapeInfo.texShape,p=e.shapeInfo.logicalShape.length,x=t.logicalShape.length;if(!e.shapeInfo.isUniform&&p===x&&null==e.shapeInfo.flatOffset&&r.D5U.arraysEqual(c,u))return`
      float ${l}() {
        return sampleTexture(${i}, resultUV);
      }
    `;let s=getCoordsDataType(x),h=a(e.shapeInfo.logicalShape,t.logicalShape),d=x-p,f=["x","y","z","w","u","v"];n=0===p?"":x<2&&h.length>=1?"coords = 0;":h.map(e=>`coords.${f[e+d]} = 0;`).join("\n");let v="";return v=x<2&&p>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${f[t+d]}`).join(", "),`
    float ${l}() {
      ${s} coords = getOutputCoords();
      ${n}
      return get${o}(${v});
    }
  `}(e,t)),l})(e,t,n.packedInputs,n.enableShapeUniforms)).join("\n"),v=t.texShape,$=(0,i.A)(),S=`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${$.texture2D}(textureSampler, uv).r;
    }
  `,m=function(e){let t=`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFs} vec2 resultUV;
    ${e.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${e.defineSpecialNaN}
    ${e.defineSpecialInf}
    ${e.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${l}
    ${u}
    ${c}
  `;return t}($);t.isPacked?(x=function(e,t,n){switch(e.length){case 0:return getOutputScalarCoords();case 1:return function(e,t,n){let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return 1===r[0]?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${r[1]}.0);
      }
    `:1===r[1]?n?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${r[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);
    }
  `}(0,t,n);case 2:return function(e,t,n){let i=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(r.D5U.arraysEqual(e,t))return n?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${i[0]}, ${i[1]}));
      }
    `;let o=Math.ceil(e[1]/2);return n?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${i[0]}, ${i[1]}));

      int index = resTexRC.x * ${i[1]} + resTexRC.y;
      int r = 2 * (index / ${o});
      int c = imod(index, ${o}) * 2;

      return ivec2(r, c);
    }
  `}(e,t,n);case 3:return function(e,t,n){if(n)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[2]/2),o=i*Math.ceil(e[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      int b = index / ${o};
      index -= b * ${o};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec3(b, r, c);
    }
  `}(e,t,n);default:return function(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[e.length-1]/2),o=i*Math.ceil(e[e.length-2]/2),a=o,l="",u="b, r, c";for(let t=2;t<e.length-1;t++)a*=e[e.length-t-1],l=`
      int b${t} = index / ${a};
      index -= b${t} * ${a};
    `+l,u=`b${t}, `+u;return`
    ivec${e.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${l}

      int b = index / ${o};
      index -= b * ${o};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec${e.length}(${u});
    }
  `}(e,t,n)}}(t.logicalShape,v,n.enableShapeUniforms),s=`
    void setOutput(vec4 val) {
      ${$.output} = val;
    }
  `):(x=function(e,t,n){switch(e.length){case 0:return getOutputScalarCoords();case 1:return 1===t[0]?n?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:1===t[1]?n?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:n?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `;case 2:return r.D5U.arraysEqual(e,t)?n?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:1===e[1]?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:1===e[0]?n?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:n?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${e[1]};
      int c = index - r * ${e[1]};
      return ivec2(r, c);
    }
  `;case 3:return function(e,t,n){if(n){let t=o.Kn(["r","c","d"],e);return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${t}
    return ivec3(r, c, d);
  }
`}let r=o.RW(["r","c","d"],e);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec3(r, c, d);
    }
  `}(e,t,n);case 4:return function(e,t,n){if(n){let t=o.Kn(["r","c","d","d2"],e);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${t}
      return ivec4(r, c, d, d2);
    }
  `}let r=o.RW(["r","c","d","d2"],e);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${r}
      return ivec4(r, c, d, d2);
    }
  `}(e,t,n);case 5:return function(e,t){let n=o.RW(["r","c","d","d2","d3"],e);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}(e,t);case 6:return function(e,t){let n=o.RW(["r","c","d","d2","d3","d4"],e);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${n}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}(e,t);default:throw Error(`${e.length}-D output sampling is not yet supported`)}}(t.logicalShape,v,n.enableShapeUniforms),s=`
    void setOutput(float val) {
      ${$.output} = vec4(val, 0, 0, 0);
    }
  `),n.packedInputs&&(m+=p);let C=[m,S,s,d,x,f,n.userCode].join("\n");return C}let l=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,u=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,c=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,p=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function getOutputScalarCoords(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function getFlatOffsetUniformName(e){return`offset${e}`}function getUniformSampler(e){let t=e.name,n=r.D5U.sizeFromShape(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`
    for (int i = 0; i < ${n}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function getCoordsDataType(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function getUniformInfoFromShape(e,t,n){let{newShape:i,keptDims:o}=r.D5U.squeezeShape(t),a=t.length,l=e&&3===a&&1===t[0],u=l?t.slice(1):i,c=!e&&a>1&&!r.D5U.arraysEqual(t,n)&&i.length<a||l,p=c?u:t;return{useSqueezeShape:c,uniformShape:p,keptDims:o}}function squeezeInputInfo(e,t){let n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function getSqueezedParams(e,t){return t.map(t=>e[t]).join(", ")}}}]);
//# sourceMappingURL=9c6ec8da.c02937719e6fc09f.js.map