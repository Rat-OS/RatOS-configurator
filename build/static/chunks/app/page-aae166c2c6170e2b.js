(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{73109:function(e,r,t){Promise.resolve().then(t.bind(t,43496))},43496:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return Page}});var l=t(72612),n=t(63278),a=t(39634),i=t(2750),s=t(79293),o=t(79146),d=t(83337),c=t(13370),u=t(39164),g=t(41087),m=t(96886),x=t(16277),p=t(81446),b=t(19731),h=t(30365),f=t(58422),k=t(98130),y=t(8930);let findThumbnail=(e,r)=>{let t=null==e?void 0:e.find(e=>e.size>=r);return null==t?null:t},thumbUrl=e=>"http://".concat((0,p.X)(),"/server/files/gcodes/").concat(e.relative_path,"?timestamp=").concat(e),getHistoryStateFillColor=e=>{switch(e){case"error":case"klippy_disconnect":case"klippy_shutdown":case"server_exit":return"bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400";case"interrupted":return"bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400";case"in_progress":return"bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 dark:text-sky-400";default:return"bg-brand-500/10 text-brand-500 dark:bg-brand-400/10 dark:text-brand-400"}},getHistoryStateTextColor=e=>{switch(e){case"error":case"klippy_disconnect":case"klippy_shutdown":case"server_exit":return"text-rose-900/80 dark:text-rose-100/80";case"interrupted":return"text-amber-900/80 dark:text-amber-100/80";case"in_progress":return"text-sky-900/80 dark:text-sky-100/80";default:return"text-brand-900/80 dark:text-brand-100/80"}},v=[{header:()=>(0,l.jsx)("span",{children:"Filename"}),accessorKey:"filename",enableSorting:!1,size:280,cell:e=>{let r=findThumbnail(e.row.original.metadata.thumbnails,32);return(0,l.jsxs)("div",{className:"flex min-w-0 items-center gap-x-4",children:[null==r?null:(0,l.jsx)("img",{src:thumbUrl(r),alt:"",className:"h-8 w-8 rounded-full bg-zinc-800"}),(0,l.jsx)("div",{className:"truncate text-sm font-medium leading-6 text-white",children:e.getValue()})]})}},{header:()=>(0,l.jsx)("span",{children:"Started at"}),sortDescFirst:!0,enableSorting:!0,enableMultiSort:!1,accessorKey:"start_time",cell:e=>{let r=g.ou.fromSeconds(e.getValue()).setLocale("en-GB");return(0,l.jsx)("div",{className:"flex min-w-0 items-center gap-x-3",children:(0,l.jsx)("div",{className:"text-sm leading-6 text-zinc-400",title:r.toLocaleString({dateStyle:"full",timeStyle:"medium"}),children:r.toRelative()})})}},{header:()=>(0,l.jsx)("span",{children:"Status"}),size:200,enableSorting:!1,accessorKey:"status",cell:e=>{let r=e.getValue();return(0,l.jsxs)("div",{className:"flex min-w-0 items-center justify-end gap-x-2  @screen-sm:justify-start",children:[(0,l.jsx)("div",{className:(0,n.m6)(getHistoryStateFillColor(r),"flex-none rounded-full p-1"),children:(0,l.jsx)("div",{className:"h-1.5 w-1.5 rounded-full bg-current"})}),(0,l.jsx)("div",{className:(0,n.m6)("truncate capitalize text-white",getHistoryStateTextColor(r),"completed"===r?"text-green-100/80":" text-rose-100/80"),children:r.replace("_"," ")})]})}},{header:()=>(0,l.jsx)("span",{children:"Duration"}),accessorKey:"print_duration",enableSorting:!1,cell:e=>(0,l.jsx)("div",{className:"flex min-w-0 items-center text-sm leading-6 text-zinc-400",children:g.nL.fromObject({hours:e.getValue()/60/60},{locale:"en-GB"}).normalize().shiftTo(...["minutes",e.getValue()/60/60>1?"hours":null].filter(Boolean)).toHuman({unitDisplay:"short",listStyle:"narrow",maximumFractionDigits:0})})},{header:()=>(0,l.jsx)("span",{children:"Slicer"}),accessorKey:"slicer",enableSorting:!1,cell:e=>(0,l.jsx)("span",{className:"inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20",children:e.row.original.metadata.slicer})},{header:()=>(0,l.jsx)("span",{children:"Filament used"}),accessorKey:"filament_used",enableSorting:!1,cell:e=>{let r=e.getValue()/1e3;return(0,l.jsxs)("div",{className:"flex min-w-0 items-center text-sm leading-6 text-zinc-400",children:[(0,l.jsx)(y.ZP,{start:0,end:r,preserveValue:!0,decimals:2})," meters"]})}}],getColumnSizeClass=e=>{let r=["filament_used","slicer"].includes(e),t=["status","print_duration"].includes(e),l=[""].includes(e),a=["filename"].includes(e);return(0,n.m6)(l&&"@screen-sm:flex hidden",t&&"@screen-md:flex hidden",r&&"@screen-xl:flex hidden",!l&&!t&&!r&&"flex",a&&"flex-shrink flex-grow-[5]")},HistoryTable=()=>{var e,r,t,a,i;let s=(0,m.oK)(),[g,p]=(0,u.useState)([{id:"start_time",desc:!0}]),y=(0,u.useRef)(null),{data:j,fetchNextPage:w,isFetching:z,isFetchingNextPage:N,hasNextPage:_,isLoading:S}=(0,x.N)({queryKey:["history",g],queryFn:async e=>{let{pageParam:r=0}=e,t=await s.query("server.history.list",{limit:25,start:25*r,order:g[0].desc?"desc":"asc"});return t},getNextPageParam:(e,r)=>e.count<=r.length?void 0:r.length,keepPreviousData:!0,refetchOnWindowFocus:!1}),C=(0,u.useMemo)(()=>{var e,r;return null!==(r=null==j?void 0:null===(e=j.pages)||void 0===e?void 0:e.flatMap(e=>e.jobs))&&void 0!==r?r:[]},[j]),T=C.length,P=(0,o.b7)({data:C,columns:v,state:{sorting:g},getCoreRowModel:(0,d.sC)(),getSortedRowModel:(0,d.tj)(),manualSorting:!0,debugTable:!0}),handleSortingChange=e=>{if(p(e),P.getRowModel().rows.length){var r;null===(r=F.scrollToIndex)||void 0===r||r.call(F,0)}};P.setOptions(e=>({...e,onSortingChange:handleSortingChange}));let{rows:B}=P.getRowModel(),F=(0,c.hO)({count:T,estimateSize:()=>64,measureElement:-1===navigator.userAgent.indexOf("Firefox")?e=>null==e?void 0:e.getBoundingClientRect().height:void 0,overscan:3,scrollMargin:null!==(a=null===(e=y.current)||void 0===e?void 0:e.offsetTop)&&void 0!==a?a:0,paddingEnd:null!==(i=null===(r=null===(t=y.current)||void 0===t?void 0:t.offsetParent)||void 0===r?void 0:r.offsetTop)&&void 0!==i?i:0});return((0,u.useEffect)(()=>{let[e]=[...F.getVirtualItems()].reverse();e&&e.index>=T-1&&_&&!N&&w()},[_,w,T,N,F]),S)?(0,l.jsxs)("div",{className:"mt-6 flex h-48 w-full flex-col items-center justify-center space-y-2",children:[(0,l.jsx)(k.$,{}),(0,l.jsx)("h3",{className:"animate-pulse font-normal text-zinc-100",children:"Loading print history..."})]}):(0,l.jsxs)("table",{className:"mt-6 w-full whitespace-nowrap text-left",style:{display:"grid",height:"".concat(F.getTotalSize(),"px"),width:"100%",position:"relative"},ref:y,children:[(0,l.jsx)("thead",{className:"border-b border-white/10 bg-background text-sm leading-6 text-white",style:{display:"grid",position:"sticky",top:0,zIndex:1},children:P.getHeaderGroups().map(e=>(0,l.jsx)("tr",{style:{display:"flex",width:"100%"},children:e.headers.map(e=>{var r;return(0,l.jsx)("th",{scope:"col",className:(0,n.m6)("flex flex-grow items-center truncate px-4 py-2 font-semibold @screen-sm:px-6 @screen-lg:px-8",getColumnSizeClass(e.column.id)),style:{width:e.getSize()},children:(0,l.jsxs)("div",{className:(0,n.m6)(e.column.getCanSort()&&"cursor-pointer select-none","space-x-2 flex items-center"),onClick:e.column.getToggleSortingHandler(),children:[(0,o.ie)(e.column.columnDef.header,e.getContext()),null!==(r=({asc:(0,l.jsx)(b,{className:"h-4 w-4"}),desc:(0,l.jsx)(f,{className:"h-4 w-4"})})[e.column.getIsSorted()])&&void 0!==r?r:e.column.getCanSort()?(0,l.jsx)(h,{className:"h-4 w-4"}):null]})},e.id)})},e.id))}),(0,l.jsxs)("tbody",{className:"divide-y divide-white/5",style:{display:"grid",height:"".concat(F.getTotalSize(),"px"),position:"relative"},children:[F.getVirtualItems().map(e=>{let r=B[e.index];return(0,l.jsx)("tr",{"data-index":e.index,ref:e=>F.measureElement(e),style:{display:"flex",position:"absolute",height:"".concat(e.size,"px"),transform:"translateY(".concat(e.start-F.options.scrollMargin,"px)"),width:"100%"},children:r.getVisibleCells().map(e=>(0,l.jsx)("td",{className:(0,n.m6)("flex-grow p-4 @screen-sm:px-6 @screen-lg:px-8",getColumnSizeClass(e.column.id)),style:{width:e.column.getSize()},children:(0,o.ie)(e.column.columnDef.cell,e.getContext())},e.id))},r.id)}),0===T&&(0,l.jsx)("tr",{children:(0,l.jsxs)("td",{colSpan:v.length,className:"flex h-96 flex-grow flex-col items-center justify-center p-4 text-center text-zinc-100 @screen-sm:px-6 @screen-lg:px-8",children:[(0,l.jsx)("h4",{className:"mb-4 text-4xl font-bold",children:"No print history found"}),(0,l.jsx)("div",{className:"text-xl text-zinc-400",children:"What are you waiting for? Go print something!"})]})})]})]})},j=[{name:"History",href:"#",current:!0}];function Page(){var e,r,t,o,d;let c=(0,i.PF)("general.printername",{initialData:"Loading..."}),x=s.SX.printer.getSavedPrinterName.useQuery(void 0,{initialData:"Loading..."}),p=(0,m.DS)("server.history.totals"),b=(0,m.DS)("server.info"),h=(0,m.hS)("print_stats"),f=null===(e=h.data)||void 0===e?void 0:e.print_stats.state,k=(0,u.useMemo)(()=>{if(null==p.data)return[{name:"Total Print Time",value:0},{name:"Longest Print",value:0},{name:"Avg. Print",value:0},{name:"Total Filament Used",value:0,unit:"meters"}];let e=g.nL.fromObject({hours:0===p.data.job_totals.total_print_time?0:p.data.job_totals.total_print_time/60/60},{locale:"en-GB"}).shiftTo(...["seconds","minutes","hours","days"].filter(Boolean)).normalize().toObject(),r=g.nL.fromObject({hours:0===p.data.job_totals.longest_print?0:p.data.job_totals.longest_print/60/60},{locale:"en-GB"}).shiftTo(...["seconds","minutes","hours"].filter(Boolean)).normalize().toObject(),t=p.data.job_totals.total_print_time/p.data.job_totals.total_jobs,l=g.nL.fromObject({hours:isNaN(t)?0:t/60/60},{locale:"en-GB"}).shiftTo(...["seconds","minutes","hours"].filter(Boolean)).normalize().toObject();return[{name:"Total Print Time",value:[e.days&&{val:e.days,unit:"days"},e.hours&&{val:e.hours,unit:"hrs"},!e.days&&{val:e.minutes,unit:"mins"}].filter(Boolean)},{name:"Longest Print",value:[r.hours&&{val:r.hours,unit:"hrs"},{val:r.minutes,unit:"mins"}].filter(Boolean)},{name:"Avg. Print",value:[l.hours&&{val:l.hours,unit:"hrs"},{val:l.minutes,unit:"mins"}].filter(Boolean)},{name:"Total Filament Used",value:p.data.job_totals.total_filament_used/1e3,unit:"meters"}]},[p.data]);return(0,l.jsxs)("main",{className:"@container",children:[(0,l.jsxs)("header",{children:[(0,l.jsx)("div",{className:"border-b border-white/10",children:(0,l.jsx)("nav",{className:"mx-auto flex max-w-7xl overflow-x-auto py-4",children:(0,l.jsx)("ul",{role:"list",className:"flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-zinc-400 @screen-sm:px-6 @screen-lg:px-8",children:j.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)("a",{href:e.href,className:e.current?"text-brand-400":"",children:e.name})},e.name))})})}),(0,l.jsx)("div",{className:"bg-zinc-700/15 backdrop-blur-sm",children:(0,l.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 @screen-sm:flex-row @screen-sm:items-center @screen-sm:px-6 @screen-lg:px-8",children:[(0,l.jsx)("div",{children:(0,l.jsxs)("div",{className:"flex items-center gap-x-3",children:[(0,l.jsx)("div",{className:(0,n.m6)("flex-none rounded-full bg-green-400/10 p-1 text-zinc-400",(null===(r=b.data)||void 0===r?void 0:r.klippy_state)==="error"&&"bg-red-400/10 text-red-400",(null===(t=b.data)||void 0===t?void 0:t.klippy_state)==="startup"&&"bg-amber-400/10 text-amber-400",(null===(o=b.data)||void 0===o?void 0:o.klippy_state)==="ready"&&"bg-green-400/10 text-green-400",(null===(d=b.data)||void 0===d?void 0:d.klippy_state)==="shutdown"&&"bg-red-400/10 text-red-400"),children:(0,l.jsx)("div",{className:"h-2 w-2 rounded-full bg-current"})}),(0,l.jsxs)("h1",{className:"flex gap-x-3 text-base leading-7",children:[(0,l.jsx)("span",{className:"font-semibold text-white",children:c.data}),(0,l.jsx)("span",{className:"text-zinc-600",children:"/"}),(0,l.jsx)("span",{className:"font-semibold text-white",children:x.data})]})]})}),(0,l.jsx)(a.Ct,{className:"order-first capitalize @screen-sm:order-none",color:void 0===f?"gray":"canceled"==f?"pink":"complete"==f?"green":"error"==f?"red":"paused"===f?"sky":"printing"===f?"yellow":"standby"===f?"brand":"gray",children:void 0===f?"Offline":null!=f?f:"Loading..."})]})}),(0,l.jsx)("div",{className:"border-t border-white/5 bg-zinc-700/10 backdrop-blur-sm",children:(0,l.jsx)("div",{className:"mx-auto grid max-w-7xl grid-cols-1 @screen-sm:grid-cols-2 @screen-lg:grid-cols-4",children:k.map((e,r)=>(0,l.jsxs)("div",{className:(0,n.m6)(r%2==1?"@screen-sm:border-l":2===r?"lg:border-l":"","border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8"),children:[(0,l.jsx)("p",{className:"text-sm font-medium leading-6 text-zinc-400",children:e.name}),(0,l.jsx)("p",{className:"mt-2 flex items-baseline gap-x-2",children:Array.isArray(e.value)?e.value.map((e,r)=>{let{val:t,unit:n}=e;return(0,l.jsxs)("span",{className:"flex items-baseline gap-x-2",children:[(0,l.jsx)("span",{className:"text-4xl font-semibold tracking-tight text-white",children:(0,l.jsx)(y.ZP,{start:0,end:null!=t?t:0,decimals:0,preserveValue:!0})},r),n?(0,l.jsx)("span",{className:"truncate text-sm text-zinc-400",children:n}):null]},r)}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{className:"text-4xl font-semibold tracking-tight text-white",children:(0,l.jsx)(y.ZP,{start:0,end:e.value,decimals:2,preserveValue:!0})}),e.unit?(0,l.jsx)("span",{className:"text-sm text-zinc-400",children:e.unit}):null]})})]},e.name))})})]}),(0,l.jsx)("div",{className:"border-t border-white/10 pt-11",children:(0,l.jsxs)("div",{className:"mx-auto max-w-7xl",children:[(0,l.jsx)("h2",{className:"px-4 text-base font-semibold leading-7 text-white @screen-sm:px-6 @screen-lg:px-8",children:"Latest jobs"}),(0,l.jsx)(HistoryTable,{})]})})]})}},39634:function(e,r,t){"use strict";t.d(r,{Bd:function(){return s},Ct:function(){return Badge},_1:function(){return o},iA:function(){return c},xU:function(){return d}});var l=t(72612),n=t(73918),a=t(63278),i=t(94594);let s=i.z.union([i.z.literal("rose"),i.z.literal("red"),i.z.literal("yellow"),i.z.literal("orange"),i.z.literal("green"),i.z.literal("lime"),i.z.literal("blue"),i.z.literal("sky"),i.z.literal("indigo"),i.z.literal("purple"),i.z.literal("pink"),i.z.literal("brand"),i.z.literal("gray"),i.z.literal("plain")]),o=(0,n.j)("",{variants:{color:{rose:"text-rose-700 dark:text-rose-400",red:"text-red-700 dark:text-red-400",yellow:"text-yellow-800 dark:text-yellow-500",orange:"text-orange-800 dark:text-orange-500",green:"text-green-700 dark:text-green-400",lime:"text-lime-700 dark:text-lime-400",blue:"text-blue-700 dark:text-blue-400",sky:"text-sky-700 dark:text-sky-400",indigo:"text-indigo-700 dark:text-indigo-400",purple:"text-purple-700 dark:text-purple-400",pink:"text-pink-700 dark:text-pink-400",brand:"text-brand-700 dark:text-brand-400",gray:"text-zinc-600 dark:text-zinc-400",plain:"text-zinc-900 dark:text-zinc-100"}}}),d=(0,n.j)("",{variants:{color:{rose:"bg-rose-50 dark:bg-rose-400/10",red:"bg-red-50 dark:bg-red-400/10",yellow:"bg-yellow-50 dark:bg-yellow-400/10",orange:"bg-orange-50 dark:bg-orange-400/10",green:"bg-green-50 dark:bg-green-500/10",lime:"bg-lime-50 dark:bg-lime-500/10",blue:"bg-blue-50 dark:bg-blue-400/10",sky:"bg-sky-50 dark:bg-sky-400/10",indigo:"bg-indigo-50 dark:bg-indigo-400/10",purple:"bg-purple-50 dark:bg-purple-400/10",pink:"bg-pink-50 dark:bg-pink-400/10",brand:"bg-brand-100 dark:bg-brand-400/10",gray:"bg-zinc-50 dark:bg-zinc-400/10",plain:"bg-zinc-900/10 dark:bg-zinc-100/10"}}}),c=(0,n.j)("",{variants:{color:{rose:"border-rose-600/10 dark:border-rose-400/20 ring-rose-600/10 dark:ring-rose-400/20",red:"border-red-600/10 dark:border-red-400/20 ring-red-600/10 dark:ring-red-400/20",yellow:"border-yellow-600/20 dark:border-yellow-400/20 ring-yellow-600/20 dark:ring-yellow-400/20",orange:"border-orange-600/20 dark:border-orange-400/20 ring-orange-600/20 dark:ring-orange-400/20",green:"border-green-600/20 dark:border-green-500/20 ring-green-600/20 dark:ring-green-500/20",lime:"border-lime-600/20 dark:border-lime-500/20 ring-lime-600/20 dark:ring-lime-500/20",blue:"border-blue-700/10 dark:border-blue-400/30 ring-blue-700/10 dark:ring-blue-400/30",sky:"border-sky-700/10 dark:border-sky-400/30 ring-sky-700/10 dark:ring-sky-400/30",indigo:"border-indigo-700/10 dark:border-indigo-400/30 ring-indigo-700/10 dark:ring-indigo-400/30",purple:"border-purple-700/10 dark:border-purple-400/30 ring-purple-700/10 dark:ring-purple-400/30",pink:"border-pink-700/10 dark:border-pink-400/20 ring-pink-700/10 dark:ring-pink-400/20",brand:"border-brand-600/40 dark:border-brand-400/30 ring-brand-600/40 dark:ring-brand-400/30",gray:"border-zinc-500/10 dark:border-zinc-400/20 ring-zinc-500/10 dark:ring-zinc-400/20",plain:"border-zinc-900 dark:border-zinc-100 ring-zinc-900 dark:ring-zinc-100"}}}),u=(0,n.j)("flex-0 inline-flex w-auto items-center rounded-md font-medium ring-1 ring-inset",{variants:{size:{sm:"px-1.5 gap-1.5 py-1 text-2xs leading-3",md:"px-2 gap-2 py-1 text-xs leading-4",lg:"px-2 gap-2 py-1 text-xs leading-6"},color:{rose:[d({color:"rose"}),c({color:"rose"}),o({color:"rose"})],red:[d({color:"red"}),c({color:"red"}),o({color:"red"})],yellow:[d({color:"yellow"}),c({color:"yellow"}),o({color:"yellow"})],orange:[d({color:"orange"}),c({color:"orange"}),o({color:"orange"})],green:[d({color:"green"}),c({color:"green"}),o({color:"green"})],lime:[d({color:"lime"}),c({color:"lime"}),o({color:"lime"})],blue:[d({color:"blue"}),c({color:"blue"}),o({color:"blue"})],sky:[d({color:"sky"}),c({color:"sky"}),o({color:"sky"})],indigo:[d({color:"indigo"}),c({color:"indigo"}),o({color:"indigo"})],purple:[d({color:"purple"}),c({color:"purple"}),o({color:"purple"})],pink:[d({color:"pink"}),c({color:"pink"}),o({color:"pink"})],brand:[d({color:"brand"}),c({color:"brand"}),o({color:"brand"})],gray:[d({color:"gray"}),c({color:"gray"}),o({color:"gray"})],plain:[d({color:"plain"}),c({color:"plain"}),o({color:"plain"})]}},defaultVariants:{size:"md",color:"gray"}}),Badge=e=>{let{size:r,color:t,className:n,children:i,...s}=e;return(0,l.jsx)("span",{className:(0,a.m6)(u({size:r,color:t}),n),...s,children:i})}},2750:function(e,r,t){"use strict";t.d(r,{PF:function(){return useMainsailQuery}}),t(39164);var l=t(96886);let useMainsailQuery=(e,r)=>(0,l.A4)("mainsail",e,r)}},function(e){e.O(0,[966,8965,5360,453,1087,9146,8346,6166,3409,9321,8458,1744],function(){return e(e.s=73109)}),_N_E=e.O()}]);
//# sourceMappingURL=page-aae166c2c6170e2b.js.map