"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[368],{8368:function(e,t,n){var r=n(9413),a=n(2572),o=n(3793),i=n(3395),u=n(6205);function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var a=u(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return i(this,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=f(n(9496)),d=f(n(5147));function f(e){return e&&e.__esModule?e:{default:e}}var s={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function p(e){var t=e.res,n=e.err;return{statusCode:t&&t.statusCode?t.statusCode:n?n.statusCode:404}}var h=function(e){o(n,e);var t=l(n);function n(){return r(this,n),t.apply(this,arguments)}return a(n,[{key:"render",value:function(){var e=this.props,t=e.statusCode,n=e.withDarkMode,r=void 0===n||n,a=this.props.title||s[t]||"An unexpected error has occurred";return c.default.createElement("div",{style:v.error},c.default.createElement(d.default,null,c.default.createElement("title",null,t?"".concat(t,": ").concat(a):"Application error: a client-side exception has occurred")),c.default.createElement("div",null,c.default.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                body { margin: 0; color: #000; background: #fff; }\n                .next-error-h1 {\n                  border-right: 1px solid rgba(0, 0, 0, .3);\n                }\n                \n                ".concat(r?"@media (prefers-color-scheme: dark) {\n                  body { color: #fff; background: #000; }\n                  .next-error-h1 {\n                    border-right: 1px solid rgba(255, 255, 255, .3);\n                  }\n                }":"")}}),t?c.default.createElement("h1",{className:"next-error-h1",style:v.h1},t):null,c.default.createElement("div",{style:v.desc},c.default.createElement("h2",{style:v.h2},this.props.title||t?a:c.default.createElement(c.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}]),n}(c.default.Component);h.displayName="ErrorPage",h.getInitialProps=p,h.origGetInitialProps=p;var v={error:{fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}};t.default=h},8947:function(e,t,n){var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=((r=n(9496))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},8270:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,i=void 0!==o&&o;return n||a&&i}},5147:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=f,t.default=void 0;var r,a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=d();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=r?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n(9496)),o=(r=n(3093))&&r.__esModule?r:{default:r},i=n(8947),u=n(3861),l=n(8270);n(4512);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}function d(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce(s,[]).reverse().concat(f(t.inAmpMode).reverse()).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,i=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){i=!0;var u=a.key.slice(a.key.indexOf("$")+1);e.has(u)?o=!1:e.add(u)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var l=0,c=p.length;l<c;l++){var d=p[l];if(a.props.hasOwnProperty(d))if("charSet"===d)n.has(d)?o=!1:n.add(d);else{var f=a.props[d],s=r[d]||new Set;"name"===d&&i||!s.has(f)?(s.add(f),r[d]=s):o=!1}}}return o}}()).reverse().map((function(e,n){var r=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var o=c({},e.props||{});return o["data-href"]=o.href,o.href=void 0,o["data-optimized-fonts"]=!0,a.default.cloneElement(e,o)}return a.default.cloneElement(e,{key:r})}))}var v=function(e){var t=e.children,n=a.useContext(i.AmpStateContext),r=a.useContext(u.HeadManagerContext);return a.default.createElement(o.default,{reduceComponentsToState:h,headManager:r,inAmpMode:l.isInAmpMode(n)},t)};t.default=v,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3093:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.headManager,n=e.reduceComponentsToState;function a(){if(t&&t.mountedInstances){var a=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(a,e))}}if(o){var l;null==t||null==(l=t.mountedInstances)||l.add(e.children),a()}return i((function(){var n;return null==t||null==(n=t.mountedInstances)||n.add(e.children),function(){var n;null==t||null==(n=t.mountedInstances)||n.delete(e.children)}})),i((function(){return t&&(t._pendingUpdate=a),function(){t&&(t._pendingUpdate=a)}})),u((function(){return t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),function(){t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)}})),null};var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(9496));function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}var o=!1,i=o?function(){}:r.useLayoutEffect,u=o?function(){}:r.useEffect}}]);