(()=>{var e={};e.id=8723,e.ids=[8723],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},38316:e=>{"use strict";e.exports=require("zod")},39491:e=>{"use strict";e.exports=require("assert")},50852:e=>{"use strict";e.exports=require("async_hooks")},14300:e=>{"use strict";e.exports=require("buffer")},32081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},73292:e=>{"use strict";e.exports=require("fs/promises")},98188:e=>{"use strict";e.exports=require("module")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},14521:e=>{"use strict";e.exports=require("readline")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},26144:e=>{"use strict";e.exports=require("vm")},71267:e=>{"use strict";e.exports=require("worker_threads")},32942:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>x,tree:()=>c});var i=n(46855),r=n(12875),s=n(7611),a=n.n(s),o=n(32600),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);n.d(t,l);let c=["",{children:["calibration",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,99024)),"/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/calibration/page.tsx"]}]},{layout:[()=>Promise.resolve().then(n.bind(n,78796)),"/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/calibration/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(n.bind(n,25419)),"/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/layout.tsx"],template:[()=>Promise.resolve().then(n.bind(n,22709)),"/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/template.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,28626,23)),"next/dist/client/components/not-found-error"]}],d=["/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/calibration/page.tsx"],u="/calibration/page",m={require:n,loadChunk:()=>Promise.resolve()},x=new i.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/calibration/page",pathname:"/calibration",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2376:(e,t,n)=>{Promise.resolve().then(n.bind(n,51149))},51149:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Page});var i=n(28793),r=n(3966),s=n.n(r),a=n(57748),o=n(23681),l=n(61739),c=n(21410);let useDebounce=(e,t)=>{let n=(0,r.useRef)(),i=(0,r.useRef)([]);return(0,r.useEffect)(()=>()=>{n.current&&clearTimeout(n.current)},[]),(0,r.useCallback)((...r)=>{i.current=r,n.current||(n.current=setTimeout(()=>{e(...i.current),n.current=void 0},t))},[e,t])};var d=n(76871);let ScrollContainer=e=>i.jsx("div",{...e,className:(0,o.m)("scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600",e.className)}),u={pixelPrMm:160,outerNozzleDiameter:1,flipVertical:!1,flipHorizontal:!1},VaocSettingsDialog=e=>{let{settings:t,setSettings:n,isSettingsFetched:s}=e,a=(0,r.useRef)(!1),[m,x]=(0,r.useState)(s?t.pixelPrMm.toFixed(2):null),[h,p]=(0,r.useState)(s?t.outerNozzleDiameter.toFixed(2):null),f=useDebounce(n,200);return(0,r.useEffect)(()=>{s&&!1===a.current&&(x(t?.pixelPrMm.toFixed(2)??u.pixelPrMm.toFixed(2)),p(t?.outerNozzleDiameter.toFixed(2)??u.outerNozzleDiameter.toFixed(2)),a.current=!0)},[t,s]),(0,i.jsxs)(ScrollContainer,{className:(0,o.m)("absolute left-5 top-1/2 max-h-[50%] w-80 -translate-y-1/2 transform-gpu overflow-y-auto rounded-md border-y border-r border-zinc-800 bg-zinc-100 p-5 shadow-lg transition-all dark:bg-zinc-900/70",e.isVisible?"translate-x-0 opacity-100":"pointer-events-none -translate-x-8 opacity-0",e.className),onWheel:e=>{e.stopPropagation()},children:[(0,i.jsxs)("h3",{className:"flex flex-1 items-center justify-between text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100",children:[i.jsx("span",{children:"Camera Settings"}),i.jsx(d,{className:"h-5 w-5 cursor-pointer",onClick:()=>e.toggle(!e.isVisible)})]}),(0,i.jsxs)("div",{className:"mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800",children:[i.jsx(l.o,{label:"Pixel per mm",type:"number",value:m??"",placeholder:s?void 0:"Loading...",onChange:e=>{let t=parseFloat(e);x(e),isNaN(t)||f(e=>({...e??{},pixelPrMm:t}))},error:isNaN(parseFloat(m??""))?"Not a valid number":void 0}),i.jsx(l.o,{label:"Outer Nozzle Diameter",type:"number",step:.1,value:h??"",placeholder:s?void 0:"Loading...",onChange:e=>{let t=parseFloat(e);console.log(e,t),p(e),isNaN(t)||f(e=>({...e??{},outerNozzleDiameter:t}))},error:isNaN(parseFloat(h??""))?"Not a valid number":void 0}),i.jsx(c.Z,{label:"Flip vertical",onChange:e=>n({...t??u,flipVertical:e??!1}),description:"Whether to flip the camera vertically",value:t?.flipVertical??u.flipVertical}),i.jsx(c.Z,{label:"Flip horizontal",onChange:e=>n({...t??u,flipHorizontal:e??!1}),description:"Whether to flip the camera horizontally",value:t?.flipHorizontal??u.flipHorizontal})]})]})};var m=n(28874),x=n(37993);let parseOptions=e=>{let t=e.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\.\d+\])/g),n=[];for(let e of t){let[t,i]=e[2].slice(1,-1).split("..").map(e=>parseInt(e,10)),r=n.find(t=>t.key===e[1]);r&&"max"in r&&r.max&&r.max<=i||n.push({key:e[1],min:t,max:["redbalance","bluebalance","greenbalance"].includes(e[1])?2e3:i})}let i=e.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\d+\.\.\d+\.\d+\])/g);for(let e of i){let[t,i]=e[2].slice(1,-1).split("..").map(e=>parseFloat(e)),r=n.find(t=>t.key===e[1]);r&&"max"in r&&r.max&&r.max<=i||n.push({key:e[1],float:!0,min:t,max:["redbalance","bluebalance","greenbalance"].includes(e[1])?2e3:i})}let r=e.matchAll(/- available option:\s(\w+)\s.+(\[false\.\.true\])/g);for(let e of r)n.push({key:e[1],toggle:!0});return n};var h=n(73992),p=n(24874),f=n(30928);let useWindowSize=()=>{let[e,t]=(0,r.useState)({width:0,height:0});return(0,r.useEffect)(()=>{let handleResize=()=>{requestAnimationFrame(()=>{t({width:0,height:0})})};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)},[]),e};var g=n(24607),b=n(54743);let useGcodeCommand=()=>{let e=(0,m.xH)("printer.gcode.script");return(0,r.useCallback)(async(t,...n)=>{let i=[t[0]];n.forEach((e,n)=>{i.push(e.toString(),t[n+1])});let r=i.join("");await e.mutateAsync({script:r}),console.log(r)},[e])};var v=n(25973),y=n(13836);let getCameraUrl=()=>{let e=(0,p.X)();return null==e||""==e.trim()?"/webcam":`http://${e}/webcam`},useUIState=()=>{let[e,t]=(0,r.useState)(.1),n=useWindowSize(),i=(0,f.W6)(null,(e,n)=>{null!=e&&t(e.getBoundingClientRect().width/e.getBoundingClientRect().height)}),s=(0,r.useRef)(null);(0,v.Z)(i,e=>{t(e.contentRect.width/e.contentRect.height)}),(0,r.useEffect)(()=>{null!=i.current&&t((i.current?.getBoundingClientRect().width/i.current?.getBoundingClientRect().height)??n.width/n.height)},[n,i]);let[a,o]=(0,r.useState)(!1),l=(0,r.useCallback)(async()=>{y.Z.isEnabled&&s.current&&(y.Z.isFullscreen?(await y.Z.exit(),o(!1)):(await y.Z.request(s.current),o(!0)))},[s]);(0,r.useEffect)(()=>{if(y.Z.isEnabled){let onChange=()=>{o(y.Z.isFullscreen)};return y.Z.on("change",onChange),()=>{y.Z.off("change",onChange)}}},[]);let[c,d]=(0,r.useState)(!1),[u,m]=(0,r.useState)(!1),[x,h]=(0,r.useState)(1);return{containerAspectRatio:e,setContainerAspectRatio:t,canMove:c,setCanMove:d,rootRef:s,isLockingCoordinates:u,setIsLockingCoordinates:m,zoom:x,setZoom:h,containerRef:i,windowSize:n,isFullscreened:a,toggleFullscreen:l}},useSpatialMapping=e=>{let{videoRef:t,containerRef:n,zoom:i,windowSize:s,settings:a}=e,[o,l]=(0,r.useState)([0,0]),c=(0,r.useCallback)(e=>{let n=t.current?.videoWidth??1,r=o[0];return e*i*(r>0&&n>0?r/n:1)},[t,o,i]),d=(0,r.useCallback)(e=>{let n=t.current?.videoWidth??1,r=o[0];return e/i/(r>0&&n>0?r/n:1)},[o,t,i]),u=(0,r.useCallback)(e=>c(e)*(a?.pixelPrMm??0),[c,a?.pixelPrMm,s]),m=(0,r.useCallback)(e=>d(e)/(a?.pixelPrMm??0),[d,a?.pixelPrMm]);return(0,v.Z)(n,e=>{l([e.contentRect.width,e.contentRect.height])}),{toScreen:u,toMillimeters:m}},useGestures=e=>{let{gestureRef:t,setZoom:n,isConnected:i,canMove:s,toScreen:a,toMillimeters:o,zoom:l}=e,[c,d]=(0,r.useState)(null),[u,m]=(0,r.useState)({x:!1,y:!1}),x=useGcodeCommand();return(0,b.useGesture)({onDrag:e=>{if(e.dragging)d([e.offset[0],e.offset[1]]),m({x:e._movementBound[0],y:e._movementBound[1]});else{let e=o(c?.[0]??0),t=-1*o(c?.[1]??0);x`_VAOC_MOVE X=${e} Y=${t}`,d(null),m({x:!1,y:!1})}},onPinch:e=>{n(t=>Math.max(Math.min(t*e.offset[0],10),1))},onWheel:e=>{0!=e.delta[1]&&!1!=e.wheeling&&!1!=e.intentional&&(e.delta[1]<0?n(e=>Math.max(.85*e,1)):n(e=>Math.min(1.15*e,10)))}},{target:t,enabled:i,drag:{enabled:s,from:()=>[0,0],bounds:{left:-a(1),right:a(1),top:-a(1),bottom:a(1)},rubberband:!0},wheel:{axis:"y",rubberband:!1},pinch:{scaleBounds:{min:1,max:10},pinchOnWheel:!1,rubberband:!0}}),{scaledDragOffset:{x:null==c?0:c[0]/l,y:null==c?0:c[1]/l},dragOffset:{x:null==c?0:c[0],y:null==c?0:c[1]},isDragging:null!=c,dragOutside:u}},useCrossHairState=e=>{let{toScreen:t,settings:n}=e,i=e.snapshotDuration??200,[s]=(0,g.S)([e.isLockingCoordinates],i,!0),[a,o]=(0,r.useState)([0,0]),[l]=(0,g.I)([e.isLockingCoordinates],i-10,10,!0),c=(0,r.useMemo)(()=>t(.2),[t]),d=(0,r.useMemo)(()=>s?c:t(n?n.outerNozzleDiameter/2:0),[t,s,c,n]),u=(0,r.useMemo)(()=>e.isConnected?d/a[0]*100:0,[e.isConnected,d,a]),m=(0,r.useMemo)(()=>e.isConnected?d/a[1]*100:0,[e.isConnected,d,a]),x=(0,r.useMemo)(()=>t(.01),[t]);return(0,v.Z)(e.containerRef,e=>{o([e.contentRect.width,e.contentRect.height])}),{nozzleRadius:c,outerNozzleRadius:d,outerNozzleRadiusPercentWidth:u,outerNozzleRadiusPercentHeight:m,crosshairStrokeWidth:x,delayedIsLockingCoordinates:l}},useVideoState=()=>{let[e,t]=(0,r.useState)(getCameraUrl());(0,r.useEffect)(()=>{e!==getCameraUrl()&&t(getCameraUrl())},[e]);let[n,i]=(0,r.useState)(null),[s,a]=(0,r.useState)(null),o=(0,r.useCallback)(e=>{e.framesPerSecond&&i(e.framesPerSecond),e.frameHeight&&e.frameWidth&&a(e.frameWidth/e.frameHeight)},[]);return{url:e,setUrl:t,fps:n,aspectRatio:s,onStreamStats:o}},useStreamSettings=({url:e,isConnected:t,settings:n,saveSettings:i,isInitialLoading:s,isFetched:a})=>{let[o,l]=(0,r.useState)([]),c=(0,r.useRef)(n);c.current=n;let d=(0,r.useMemo)(()=>o.map(e=>(e.value=c.current?.[e.key]?.value??e.value,e)),[o]),u=(0,r.useCallback)(async t=>{let n=await fetch(`${e}/option?compressionquality=${t}`);l(parseOptions(await n.text()))},[e]),m=(0,r.useCallback)(async(t,n)=>{let r=o.find(e=>e.key===t);if(null==r)throw Error(`Invalid option ${t}`);if(r&&"toggle"in r&&"boolean"!=typeof n)throw Error(`Expect a boolean value for ${t}, got ${n}`);if(r&&"max"in r&&("number"!=typeof n||r.min>n||r.max<n))throw Error(`Value ${n} is out of range for ${t}`);try{let r=await fetch(`${e}/option?${t}=${n.toString()}`);return console.log(r.ok,s),r.ok&&!1===s&&(console.log("saving",t,n,c.current,(0,h.T)(c.current??{},{[t]:{value:n}})),await i((0,h.T)(c.current??{},{[t]:{value:n}}))),r.ok}catch(e){return!1}},[o,e,s,i]);return(0,r.useEffect)(()=>{if(t&&u(100),t&&a&&null!=c.current)for(let t in c.current){let n=c.current[t]?.value;n&&fetch(`${e}/option?${t}=${n.toString()}`)}},[a,e,t,u]),{options:d,setOption:m}};var C=n(11438),w=n(18391),k=n(82542),j=n(10654),S=n(49376),N=n(5486),z=n(50036),R=n(65073),O=n(88737),_=n(76690);let ExposureIcon=e=>(0,i.jsxs)("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",className:e.className,children:[i.jsx("path",{fill:"currentColor",d:"M456,40H56A16,16,0,0,0,40,56V456a16,16,0,0,0,16,16H456a16,16,0,0,0,16-16V56A16,16,0,0,0,456,40ZM72,72H417.373L72,417.373ZM440,440H94.627L440,94.627Z"}),i.jsx("polygon",{fill:"currentColor",points:"336 368 336 408 368 408 368 368 408 368 408 336 368 336 368 296 336 296 336 336 296 336 296 368 336 368"}),i.jsx("rect",{width:"112",height:"32",x:"112",y:"136",fill:"currentColor"})]});var A=n(89169),P=n(45186),V=n(80332),M=n(28821);let FocusControls=e=>{let t=useGcodeCommand();return i.jsx("div",{className:(0,o.m)("scroll absolute transform-gpu overflow-y-auto rounded-md border-y border-r border-zinc-800 bg-zinc-100 font-mono shadow-lg transition-all dark:bg-zinc-900/70",e.isVisible?" -translate-y-full opacity-100":"pointer-events-none  -translate-y-2/3  opacity-0",e.className),onWheel:e=>{e.stopPropagation()},children:(0,i.jsxs)("ol",{className:"flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800",children:[i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z1`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(A,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"+1.00"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z0.5`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(P,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"+0.50"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z0.1`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(P,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"+0.10"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z0.05`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(P,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"+0.05"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z-0.05`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(P,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"-0.05"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z-0.1`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(V,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"-0.10"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z-0.5`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(V,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"-0.50"})]})})}),i.jsx("li",{className:(0,a.d)("flex"),children:i.jsx("div",{className:(0,a.d)("flex flex-1 items-center justify-center text-center"),children:(0,i.jsxs)("button",{onClick:()=>t`G91\nG0 Z-1.0`,type:"button",className:(0,o.m)("flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100"),children:[i.jsx(M,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),i.jsx("span",{className:"inline",children:"-1.00"})]})})})]})})};var E=n(370),F=n(32801),T=n(15611);let $={duration:150},Button=e=>{let[t]=(0,T.u)(),[n,l]=s().useState(!1),c=useDebounce(l,200),d=(0,r.useCallback)(async()=>{e.onClick&&!e.isLoading&&(c(!0),await e.onClick(),c(!1))},[c,e]);return(0,i.jsxs)("li",{className:(0,a.d)("flex"),children:["before"===e.subButtonPosition&&i.jsx("ol",{ref:t,className:"flex divide-x divide-zinc-200 dark:divide-zinc-800",children:e.children}),i.jsx("div",{className:(0,a.d)("flex items-center",e.isActive&&"dark:bg-zinc-800"),children:(0,i.jsxs)("button",{onClick:d,type:"button",title:e.title,className:(0,o.m)("flex items-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-700 transition-transform hover:text-black active:scale-95 dark:text-zinc-300 dark:hover:text-white",e.isActive?"hover:text-brand:600 text-brand-600 dark:text-brand-500 dark:hover:text-brand-500":"",e.hidden?"hidden":"",e.className),children:[e.icon&&(e.isLoading||n)&&i.jsx(x.$,{noMargin:!0,className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),e.icon&&!e.isLoading&&i.jsx(e.icon,{className:"inline h-5 w-5 flex-shrink-0","aria-hidden":"true"}),e.name&&i.jsx("span",{className:"inline",children:e.name})]})}),null!=e.subButtonPosition&&"before"!==e.subButtonPosition&&i.jsx("ol",{ref:t,className:"flex divide-x divide-zinc-200 dark:divide-zinc-800",children:e.children}),null==e.subButtonPosition&&e.children&&e.children]},e.id)};function Toolbar(e){let[t]=(0,T.u)($);return i.jsx("nav",{className:(0,o.m)("flex select-none overflow-hidden rounded-md border border-zinc-200 bg-white shadow dark:border-zinc-800 dark:bg-zinc-900/80",e.className),"aria-label":"Breadcrumb",children:i.jsx("ol",{role:"list",className:"flex divide-x divide-zinc-200 dark:divide-zinc-800",ref:t,children:e.buttons.map(t=>{let n=e.subButtons?.filter(e=>e.parent===t.id);return t.hidden?null:(0,r.createElement)(Button,{...t,key:t.id},null!=n&&n.length>0&&t.isActive?n.map(e=>e.hidden?null:(0,r.createElement)(Button,{...e,key:e.id})):t.children)})})})}var Z=n(35235);let Slider=({onChange:e,min:t,max:n,initialValue:s,step:a,isBoolean:o})=>{let[l,c]=(0,r.useState)(s??t),d=useDebounce((0,r.useCallback)(t=>{e?.(t)},[e]),100),u=(0,r.useCallback)(e=>{let t=a?parseFloat(e.target.value):parseInt(e.target.value,10);c(t),d(t)},[d,a]);return(0,i.jsxs)("div",{className:"relative mb-6",children:[i.jsx("input",{type:"range",value:l,onChange:u,min:t,max:n,step:a??1,className:"h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-700"}),i.jsx("span",{className:"absolute -bottom-6 start-0 text-sm text-zinc-500 dark:text-zinc-400",children:o?"Off":`Min (${t})`}),!o&&i.jsx("span",{className:"absolute -bottom-6 start-1/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2",children:(n/3).toFixed(2)}),!o&&i.jsx("span",{className:"absolute -bottom-6 start-2/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2",children:(n/3*2).toFixed(2)}),i.jsx("span",{className:"absolute -bottom-6 end-0 text-sm text-zinc-500 dark:text-zinc-400",children:o?"On":`Max (${n})`})]})},StreamSettingsDialog=e=>{let{url:t,isConnected:n,isAdvancedVisible:r,isColorVisible:s,isExposureVisible:o}=e,[l,c,d]=(0,m.Fu)("RatOS","camera-stream-settings"),{options:u,setOption:x}=useStreamSettings({url:t,isConnected:n,settings:l,saveSettings:c,isInitialLoading:d.isInitialLoading,isFetched:d.isFetched}),[h]=(0,T.u)();return i.jsx(ScrollContainer,{className:(0,a.d)("absolute bottom-24 left-1/4 right-1/4 max-h-[50%] overflow-y-scroll overscroll-contain rounded-md bg-zinc-900/70",e.className),children:(0,i.jsxs)("div",{ref:h,children:[o&&u.filter(e=>e.key.toLowerCase().includes("gain")||e.key.toLowerCase().includes("exposure")||e.key.startsWith("Ae")||e.key.toLowerCase().includes("brightness")).filter(e=>"ColourGains"!==e.key).map(e=>(0,i.jsxs)("div",{className:"p-4",children:[i.jsx("label",{className:"block text-center text-base font-semibold capitalize text-zinc-200",children:e.key}),i.jsx(Slider,{isBoolean:"toggle"in e,min:"toggle"in e?0:"min"in e?e.min:0,initialValue:!0===e.value?1:!1===e.value?0:e.value,max:"toggle"in e?1:"max"in e?e.max:0,step:"float"in e&&e.float?"any":1,onChange:t=>x(e.key,"toggle"in e?!!t:t)})]},e.key)),s&&u.filter(e=>e.key.toLowerCase().includes("saturation")||e.key.toLowerCase().includes("contrast")||e.key.startsWith("Awb")).map(e=>(0,i.jsxs)("div",{className:"p-4",children:[i.jsx("label",{className:"block text-center text-base font-semibold capitalize text-zinc-200",children:e.key}),i.jsx(Slider,{isBoolean:"toggle"in e,min:"toggle"in e?0:"min"in e?e.min:0,initialValue:!0===e.value?1:!1===e.value?0:e.value,max:"toggle"in e?1:"max"in e?e.max:0,step:"float"in e&&e.float?"any":1,onChange:t=>x(e.key,"toggle"in e?!!t:t)})]},e.key)),r&&u.map(e=>(0,i.jsxs)("div",{className:"p-4",children:[i.jsx("label",{className:"block text-center text-base font-semibold capitalize text-zinc-200",children:e.key}),i.jsx(Slider,{isBoolean:"toggle"in e,min:"toggle"in e?0:"min"in e?e.min:0,initialValue:!0===e.value?1:!1===e.value?0:e.value,max:"toggle"in e?1:"max"in e?e.max:0,step:"float"in e&&e.float?"any":1,onChange:t=>x(e.key,"toggle"in e?!!t:t)})]},e.key))]})})},EnterFullscreenIcon=e=>i.jsx("svg",{...e,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:i.jsx("path",{d:"M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})}),ExitFullscreenIcon=e=>i.jsx("svg",{...e,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:i.jsx("path",{d:"M5.5 2C5.77614 2 6 2.22386 6 2.5V5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5H5V2.5C5 2.22386 5.22386 2 5.5 2ZM9.5 2C9.77614 2 10 2.22386 10 2.5V5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H9.5C9.22386 6 9 5.77614 9 5.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 9.5C2 9.22386 2.22386 9 2.5 9H5.5C5.77614 9 6 9.22386 6 9.5V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V10H2.5C2.22386 10 2 9.77614 2 9.5ZM9 9.5C9 9.22386 9.22386 9 9.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H10V12.5C10 12.7761 9.77614 13 9.5 13C9.22386 13 9 12.7761 9 12.5V9.5Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})}),useToolbarState=e=>{let[t,n]=(0,r.useState)(!1),[i,s]=(0,r.useState)(!1),[a,o]=(0,r.useState)(!1),[l,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)(!1),[x,h]=(0,r.useState)(!1),[p,f]=(0,r.useState)(!1),[b,v]=(0,r.useState)(!1),[y,C]=(0,r.useState)(!1),[w,k]=(0,g.S)([e.zoom],2e3,!0),j=(0,r.useCallback)(()=>{v(e=>!e),k()},[k]),{hasZOffsetProbe:S}=(0,m.Q)(e=>({hasZOffsetProbe:null!=e.configfile.settings.z_offset_probe}),"configfile")??{hasZOffsetProbe:!1},[N,z]=(0,r.useState)(!1),R=(0,m.Q)(e=>({homed_axes:e.toolhead.homed_axes,position:e.toolhead.position}),"toolhead"),O=(0,m.Q)(e=>({active:e["gcode_macro T0"].active}),"gcode_macro T0"),_=(0,m.Q)(e=>({active:e["gcode_macro T1"].active}),"gcode_macro T1"),{isVaocStarted:A}=(0,m.Q)(e=>({isVaocStarted:e["gcode_macro _VAOC"].is_started}),"gcode_macro _VAOC")??{isVaocStarted:!1};return{toolhead:R,tool:O?.active?"T0":_?.active?"T1":null,isStartingVaoc:t,setIsStartingVaoc:n,isSettingsVisible:i,setIsSettingsVisible:s,isExposureVisible:a,setIsExposureVisible:o,isColorVisible:l,setIsColorVisible:c,isFocusVisible:d,setIsFocusVisible:u,isAdvancedVisible:x,setIsAdvancedVisible:h,light:p,setLight:f,isVaocStarted:A,isZoomExpanded:w||b,toggleIsZoomExpanded:j,hasZOffsetProbe:S,isZOffsetProbeVisible:N,setIsZOffsetProbeVisible:z,isCameraControlsVisible:y,setIsCameraControlsVisible:C}},Toolbars=e=>{let{canMove:t,isLockingCoordinates:n,zoom:s,setIsLockingCoordinates:a,setCanMove:o,setZoom:l,fps:c,url:d,isConnected:u,setSettings:m,settings:x,isSettingsFetched:h,isFullscreened:p}=e,{toolhead:f,tool:b,isStartingVaoc:v,setIsStartingVaoc:y,isSettingsVisible:A,setIsSettingsVisible:P,isExposureVisible:V,setIsExposureVisible:M,isColorVisible:T,setIsColorVisible:$,isFocusVisible:L,setIsFocusVisible:H,isAdvancedVisible:D,setIsAdvancedVisible:q,light:G,setLight:B,isVaocStarted:I,isZoomExpanded:W,toggleIsZoomExpanded:X,hasZOffsetProbe:U,isZOffsetProbeVisible:Q,setIsZOffsetProbeVisible:Y,isCameraControlsVisible:J,setIsCameraControlsVisible:K}=useToolbarState({zoom:s}),ee=useGcodeCommand(),[et]=(0,g.S)([n],200,!0),en=[{icon:I?E:F,id:"start/stop",name:I?void 0:"Start Calibration",title:I?"Stop calibration":"Start calibration",onClick:async()=>{v||(y(!0),await (I?ee`_VAOC_END`:ee`_VAOC_START`),y(!1))},isActive:I},{name:"T0",id:"t0",hidden:!I,title:"Switch to tool 0 (T0)",onClick:async()=>{o(!1),await ee`_VAOC_LOAD_TOOL T=0`},isActive:"T0"===b},{name:"T1",id:"t1",hidden:!I,title:"Switch to tool 1 (T1)",onClick:async()=>{o(!1),await ee`_VAOC_LOAD_TOOL T=1`},isActive:"T1"===b}],ei=[{icon:C,id:"zoom",title:`${W?"Hide":"Show"} zoom controls`,subButtonPosition:"before",className:"font-mono",name:s>=10?"MAX!":(0,i.jsxs)(i.Fragment,{children:[i.jsx(Z.ZP,{preserveValue:!0,start:0,end:Math.round(100*s),duration:.15}),"%"]}),onClick:()=>{X()},isActive:W},{icon:w,id:"light",title:`${G?"Turn off":"Turn on"} the LEDs`,onClick:async()=>{let e=!G;await ee`_VAOC_SWITCH_LED STATE=${e?1:0}`,B(e)},isActive:G},{icon:p?ExitFullscreenIcon:EnterFullscreenIcon,id:"fullscreen",title:`${p?"Exit":"Enter"} fullscreen mode`,onClick:()=>{e.toggleFullscreen&&e.toggleFullscreen()},isActive:p}],er=(0,r.useMemo)(()=>[{name:"Settings",icon:k,id:"settings",title:"Show camera settings dialog",onClick:()=>{P(e=>!e)},isActive:A},{name:"T0"===b?"Set reference":"Set offset",icon:j,isLoading:et,hidden:!I,id:"reference",title:`Set the ${"T0"===b?"T0 reference point":"T1 offset"}`,onClick:async()=>{Y(!!U),a(!0),await ee`_VAOC_SET_TOOL`,a(!1),o(!1)},isActive:et},{name:t?(0,i.jsxs)("span",{className:"font-mono",children:[(f?.position?.[0]??0).toFixed(2),", ",(f?.position?.[1]??0).toFixed(2)]}):"Move",icon:S,hidden:!I,id:"move",title:`${t?"Disable":"Enable"} drag and drop calibration`,onClick:()=>{t?(H(!1),M(!1),$(!1),q(!1),K(!1)):(H(!0),M(!1),$(!1),q(!1),K(!0)),o(e=>!e)},isActive:t},{name:"Z-Probe",icon:N,title:"Probe the z endstop to set the Z offset",id:"z-probe",hidden:!I||!U||!Q,onClick:async()=>{await ee`_VAOC_PROBE_Z_OFFSET`},isActive:!1}],[A,b,et,I,t,f?.position,U,Q,P,Y,a,ee,o,H,M,$,q,K]),es=(0,r.useMemo)(()=>{let e=[{icon:z,name:i.jsx("span",{children:null==c?"Loading...":(0,i.jsxs)("span",{children:[i.jsx(Z.ZP,{start:0,preserveValue:!0,duration:1,end:c})," FPS"]})}),className:"font-mono",id:"settings",subButtonPosition:"before",title:`${J?"Hide":"Show"} camera controls`,onClick:()=>{J&&(H(!1),M(!1),$(!1),q(!1)),K(e=>!e)},isActive:J}];return e},[c,J,q,K,$,M,H]),ea=(0,r.useMemo)(()=>{let e=[{icon:R,id:"focus",parent:"settings",hidden:T||D||V,name:"Z Focus",title:`${L?"Hide":"Show"} focus controls`,children:i.jsx(FocusControls,{isVisible:L,toggle:H}),onClick:()=>{H(e=>!e),M(!1),$(!1),q(!1)},isActive:L},{icon:ExposureIcon,id:"exposure",parent:"settings",hidden:T||D||L,title:`${V?"Hide":"Show"} exposure controls`,name:"Exposure",onClick:()=>{M(e=>!e),$(!1),q(!1),H(!1)},isActive:V},{icon:O,id:"color",parent:"settings",title:`${T?"Hide":"Show"} color controls`,hidden:V||D||L,name:"Color",onClick:()=>{$(e=>!e),M(!1),q(!1),H(!1)},isActive:T},{icon:_,id:"advanced-camera-controls",parent:"settings",title:`${D?"Hide":"Show"} advanced camera controls`,name:"Advanced",hidden:V||T||L,onClick:()=>{q(e=>!e),M(!1),$(!1),H(!1)},isActive:D}];return e.reverse()},[T,D,V,L,H,M,$,q]);return(0,i.jsxs)(i.Fragment,{children:[i.jsx(Toolbar,{className:"pointer-events-auto absolute left-5 top-5",buttons:en}),i.jsx(Toolbar,{className:"pointer-events-auto absolute bottom-5 right-5 overflow-visible",buttons:es,subButtons:ea}),i.jsx(Toolbar,{className:"pointer-events-auto absolute right-5 top-5",buttons:ei,subButtons:[{name:"1X",id:"1x",parent:"zoom",title:"Set zoom to 1X (100%)",className:"font-mono",onClick:()=>{l(1)},isActive:!1},{name:"2X",id:"2x",parent:"zoom",title:"Set zoom to 2X (200%)",className:"font-mono",onClick:()=>{l(2)},isActive:!1},{name:"4X",id:"4x",parent:"zoom",title:"Set zoom to 4X (400%)",className:"font-mono",onClick:()=>{l(4)},isActive:!1}]}),i.jsx(Toolbar,{className:"pointer-events-auto absolute bottom-5 left-5",buttons:er}),i.jsx(VaocSettingsDialog,{className:"pointer-events-auto",isVisible:A,toggle:P,settings:x,isSettingsFetched:h,setSettings:m}),i.jsx(StreamSettingsDialog,{className:"pointer-events-auto",url:d,isConnected:u,isExposureVisible:V,isColorVisible:T,isAdvancedVisible:D})]})},SafetyVisualization=({gestureState:e})=>(0,i.jsxs)(i.Fragment,{children:[i.jsx("div",{className:(0,a.d)("absolute inset-0",e.dragOutside.x&&e.dragOutside.x>0?"left-0 right-2/3 bg-gradient-to-r from-red-500/70 to-red-500/0":"left-2/3 right-0 bg-gradient-to-l from-red-500/70 to-red-500/0"),style:{opacity:e.dragOutside.x?Math.abs(e.dragOutside.x-e.dragOffset.x)/200:0,transform:`translateX(${e.scaledDragOffset.x}px) translateY(${e.scaledDragOffset.y}px)`}}),i.jsx("div",{className:(0,a.d)("absolute inset-0",e.dragOutside.y&&e.dragOutside.y>0?"bottom-2/3 top-0 bg-gradient-to-b from-red-500/70 to-red-500/0":"bottom-0 top-2/3 bg-gradient-to-t from-red-500/70 to-red-500/0"),style:{opacity:e.dragOutside.y?Math.abs(e.dragOutside.y-e.dragOffset.y)/200:0,transform:`translateX(${e.scaledDragOffset.x}px) translateY(${e.scaledDragOffset.y}px)`}})]}),FillViewport=e=>i.jsx("div",{className:(0,a.d)("pointer-events-none absolute inset-0 flex items-center justify-center",e.className),children:e.children}),FillVideoFrame=e=>i.jsx("div",{className:(0,a.d)("pointer-events-none absolute inset-0 top-1/2 -translate-y-1/2 transition-all",e.className),style:e.videoAspectRatio?{aspectRatio:Math.max(e.videoAspectRatio/e.zoom,e.containerAspectRatio)}:{},children:e.children}),CrossHair=e=>{let{outerNozzleRadius:t,nozzleRadius:n,outerNozzleRadiusPercentWidth:r,outerNozzleRadiusPercentHeight:s,crosshairStrokeWidth:o,delayedIsLockingCoordinates:l}=useCrossHairState(e);return i.jsx(FillViewport,{children:(0,i.jsxs)("svg",{width:"100%",height:"100%",children:[(0,i.jsxs)("g",{className:(0,a.d)(e.isConnected&&t>0?"opacity-100":"opacity-0"),children:[i.jsx("rect",{x:"50%",y:`${50-s}%`,height:`${2*s}%`,width:o,shapeRendering:"geometricPrecision",className:"fill-brand-500 transition-all ease-in-out",style:{transform:`translateX(-${o/2})`}}),i.jsx("rect",{x:`${50-r}%`,y:"50%",width:`${2*r}%`,height:o,shapeRendering:"geometricPrecision",className:"fill-brand-500 transition-all ease-in-out",style:{transform:`translateY(-${o/2})`}})]}),i.jsx("circle",{cx:"50%",cy:"50%",r:l?t:1.5*t,fill:"none",className:(0,a.d)("ease-out",l?"fill-brand-300":"fill-brand-300/0 transition-all duration-700"),shapeRendering:"geometricPrecision",strokeWidth:0}),i.jsx("circle",{cx:"50%",cy:"50%",r:n,fill:"none",className:(0,a.d)("stroke-brand-500 transition-all ease-in-out",e.isConnected&&t>0?"opacity-100":"opacity-0"),shapeRendering:"geometricPrecision",strokeWidth:o}),i.jsx("circle",{cx:"50%",cy:"50%",r:t,fill:"none",className:(0,a.d)("stroke-brand-500 transition-all ease-in-out",e.isConnected&&t>0?"opacity-100":"opacity-0"),shapeRendering:"geometricPrecision",strokeWidth:o})]})})};function Page(){let e=useVideoState(),{videoRef:t,connectionState:n}=function(e,t){let n=(0,r.useRef)(null),i=(0,r.useRef)(null),s=(0,r.useRef)(null),a=(0,r.useRef)(e),o=(0,r.useRef)(!1),[l,c]=(0,r.useState)(null),d=(0,r.useRef)(null),u=(0,r.useCallback)(e=>{if(e.candidate)return fetch(a.current,{body:JSON.stringify({type:"remote_candidate",id:d.current,candidates:[e.candidate]}),headers:{"Content-Type":"application/json"},method:"POST"}).catch(function(e){window.console.error(e)})},[]),m=(0,r.useCallback)(async()=>{s.current&&(s.current.close(),s.current=null),o.current=!0;try{c("new");var t={sdpSemantics:"unified-plan"};document.getElementById("use-stun")&&document.getElementById("use-stun").checked&&(t.iceServers=[{urls:["stun:stun.l.google.com:19302"]}]);let a=new URLSearchParams(e),o=Object.fromEntries(a.entries()),l=await fetch(e,{body:JSON.stringify({type:"request",res:o.res}),headers:{"Content-Type":"application/json"},method:"POST"});if(l.ok){let a=await l.json();a.iceServers&&(t.iceServers=a.iceServers),s.current=new RTCPeerConnection(t),s.current.addTransceiver("video",{direction:"recvonly"}),s.current.addEventListener("track",function(e){if("video"==e.track.kind){if(n.current)n.current.srcObject=e.streams[0];else throw Error("No video ref to set src on")}else i.current&&(i.current.srcObject=e.streams[0])}),s.current.addEventListener("connectionstatechange",()=>{let e=s.current?.connectionState;c(e??null)}),d.current=a.id,await s.current.setRemoteDescription(a);let o=await s.current.createAnswer();await s.current.setLocalDescription(o),await new Promise(function(e){if(null==s.current)throw Error("peerConnection.current is null");"complete"===s.current.iceGatheringState?e(null):s.current.addEventListener("icegatheringstatechange",function checkState(){if(null==s.current)throw Error("peerConnection.current is null");"complete"===s.current.iceGatheringState&&(s.current.removeEventListener("icegatheringstatechange",checkState),e(null))})}),s.current.addEventListener("icecandidate",u);var r=s.current.localDescription;if(null==r)throw Error("No offer from peerConnection");await fetch(e,{body:JSON.stringify({type:r.type,id:d.current,sdp:r.sdp}),headers:{"Content-Type":"application/json"},method:"POST"})}else c("failed")}catch(e){console.error(e),c("failed")}finally{o.current=!1}},[u,e]);return(0,r.useEffect)(()=>{if(t){let e=setInterval(async()=>{if(s.current){let e=await s.current.getStats();e.forEach(e=>{"inbound-rtp"===e.type&&"video"===e.kind&&t?.(e)})}},1e3);return()=>clearInterval(e)}},[t]),(0,r.useEffect)(()=>{e&&!1===o.current?m():s.current&&!1===o.current&&s.current.close()},[m,e]),(0,r.useEffect)(()=>{if(["failed","disconnected"].includes(l??"")){let e=setTimeout(()=>{m()},5e3);return()=>clearTimeout(e)}},[m,l]),{videoRef:n,audioRef:i,connectionState:l,close:(0,r.useCallback)(()=>{s.current?.close()},[])}}(e.url+"/webrtc",e.onStreamStats),s="connected"===n,[l,c,d]=(0,m.Fu)("RatOS","camera-settings",u),h=useUIState(),p=useSpatialMapping({settings:l,containerRef:h.containerRef,videoRef:t,windowSize:h.windowSize,zoom:h.zoom}),f=useGestures({setZoom:h.setZoom,canMove:h.canMove,gestureRef:t,isConnected:s,toMillimeters:p.toMillimeters,toScreen:p.toScreen,zoom:h.zoom}),g=h.zoom*(l?.flipHorizontal?-1:1),b=h.zoom*(l?.flipVertical?-1:1),v=f.scaledDragOffset.x*(l?.flipHorizontal?-1:1),C=f.scaledDragOffset.y*(l?.flipVertical?-1:1);return i.jsx("div",{className:(0,a.d)(h.isFullscreened?"h-full":"h-[calc(100vh_-_64px)]","flex w-full select-none items-center"),ref:h.rootRef,children:(0,i.jsxs)("div",{className:"relative mx-auto flex h-full max-h-full min-h-[50vh] min-w-[50vw] max-w-fit items-center overflow-hidden object-contain shadow-lg",ref:h.containerRef,children:[i.jsx("video",{ref:t,className:(0,o.m)("h-full max-h-full w-full min-w-full max-w-full transform-gpu touch-none",h.canMove&&"cursor-move",!f.isDragging&&"transition-transform ease-in-out"),style:{transform:`scale3d(${g}, ${b}, 1) translate3d(${v}px, ${C}px, 0)`},autoPlay:!0,muted:!0,playsInline:!0}),i.jsx(FillVideoFrame,{videoAspectRatio:e.aspectRatio??0,containerAspectRatio:h.containerAspectRatio,zoom:h.zoom,children:i.jsx(SafetyVisualization,{gestureState:f})}),i.jsx(CrossHair,{containerRef:h.containerRef,isConnected:s&&null!=e.aspectRatio,isLockingCoordinates:h.isLockingCoordinates,settings:l,toScreen:p.toScreen}),(0,i.jsxs)(FillViewport,{children:[i.jsx("h3",{className:(0,o.m)("absolute inset-0 flex items-center justify-center text-xl font-semibold text-rose-500 transition-all dark:text-rose-500","failed"===n?"animate-pulse opacity-100":"opacity-0"),children:"Webcam stream not found"}),i.jsx(x.$,{noMargin:!0,className:(0,o.m)("h-1/3 w-1/3 animate-spin text-inherit transition-all","text-green-500 dark:text-green-500",("connected"===n||"failed"===n)&&null!=e.aspectRatio&&"opacity-0","failed"===n&&"text-rose-500 dark:text-rose-500","connecting"===n&&"text-brand-500 dark:text-brand-500","closed"===n&&"text-yellow-500 dark:text-yellow-500","disconnected"===n&&"text-amber-500 dark:text-amber-500","new"===n&&"text-sky-500 dark:text-sky-500")})]}),i.jsx(FillVideoFrame,{videoAspectRatio:e.aspectRatio??0,containerAspectRatio:h.containerAspectRatio,zoom:h.zoom,className:(0,a.d)(null!=e.aspectRatio?"opacity-100":"opacity-0"),children:i.jsx(Toolbars,{zoom:h.zoom,toggleFullscreen:y.Z.isEnabled?h.toggleFullscreen:null,isFullscreened:h.isFullscreened,setZoom:h.setZoom,setIsLockingCoordinates:h.setIsLockingCoordinates,setCanMove:h.setCanMove,canMove:h.canMove,fps:e.fps??0,isConnected:s,isLockingCoordinates:h.isLockingCoordinates,url:e.url,setSettings:c,settings:l,isSettingsFetched:d.isFetched})})]})})}},78796:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>WizardLayout});var i=n(86700),r=n(16239);function WizardLayout({children:e}){return(0,r.headers)().get("x-configurator"),i.jsx("main",{className:"",children:i.jsx("div",{className:"mx-auto max-w-full",children:e})})}},99024:(e,t,n)=>{"use strict";n.r(t),n.d(t,{$$typeof:()=>a,__esModule:()=>s,default:()=>l});var i=n(23646);let r=(0,i.createProxy)(String.raw`/home/runner/work/RatOS-configurator/RatOS-configurator/src/app/calibration/page.tsx`),{__esModule:s,$$typeof:a}=r,o=r.default,l=o}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),n=t.X(0,[5793,8749,6212,3975,3971,4825],()=>__webpack_exec__(32942));module.exports=n})();