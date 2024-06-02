(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{35209:function(e,t,n){"use strict";function clsx(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e){if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t)}return i}(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{W:function(){return clsx}})},32232:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,i.Z)("AreaChart",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M7 12v5h12V8l-5 5-4-4Z",key:"zxz28u"}]])},65792:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,i.Z)("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]])},83839:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,i.Z)("Move3d",[["path",{d:"M5 3v16h16",key:"1mqmf9"}],["path",{d:"m5 19 6-6",key:"jh6hbb"}],["path",{d:"m2 6 3-3 3 3",key:"tkyvxa"}],["path",{d:"m18 16 3 3-3 3",key:"1d4glt"}]])},83630:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,i.Z)("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]])},68582:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(24360);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,i.Z)("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]])},65292:function(e,t,n){Promise.resolve().then(n.bind(n,5709)),Promise.resolve().then(n.bind(n,37652)),Promise.resolve().then(n.t.bind(n,48488,23)),Promise.resolve().then(n.t.bind(n,56945,23))},5709:function(e,t,n){"use strict";n.r(t),n.d(t,{Redirecter:function(){return Redirecter},useIsRouteActive:function(){return useIsRouteActive},useLocalPathname:function(){return useLocalPathname},useNavigation:function(){return useNavigation}});var i=n(25374),a=n(39164),u=n(68582),o=n(65792),c=n(83839),s=n(83630),l=n(32232);let useLocalPathname=()=>{var e;let t=(null!==(e=(0,i.usePathname)())&&void 0!==e?e:"/").replace("/configure","");return t},useIsRouteActive=()=>{let e=useLocalPathname();return(0,a.useCallback)(t=>e.startsWith(t),[e])},h=[{name:"Setup Wizard",href:"/wizard",current:!1,icon:u.Z},{name:"Dashboard",href:"/",current:!1,icon:o.Z},{name:"Motion",href:"/motion",current:!1,icon:c.Z},{name:"Visual Calibration (BETA)",href:"/calibration",current:!1,icon:s.Z},{name:"Realtime Analysis (BETA)",href:"/analysis",current:!1,icon:l.Z}],useNavigation=()=>{let e=useIsRouteActive(),t=null,n=[];return h.forEach((i,a)=>{if(i.current=e(i.href),i.current){var u;null!==t&&(null===(u=n[t])||void 0===u?void 0:u.href.length)<i.href.length?(n[t].current=!1,t=a):null!==t?i.current=!1:t=a}n.push(i)}),n},Redirecter=e=>{let t=(0,i.useRouter)(),n=useIsRouteActive();if(e.hasLastPrinterSettings||n("/wizard"))return e.children;t.replace("/wizard")}},56945:function(){},48488:function(e){e.exports={style:{fontFamily:"'__Inter_0d99fb', '__Inter_Fallback_0d99fb'",fontStyle:"normal"},className:"__className_0d99fb",variable:"__variable_0d99fb"}},25374:function(e,t,n){e.exports=n(64839)}},function(e){e.O(0,[9996,966,8965,5360,453,2262,2345,9321,8458,1744],function(){return e(e.s=65292)}),_N_E=e.O()}]);
//# sourceMappingURL=layout-f9ff37ea405aba34.js.map