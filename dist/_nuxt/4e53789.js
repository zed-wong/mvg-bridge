(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{537:function(t,e,r){var n=r(34);t.exports=function(t){return n(Map.prototype.entries,t)}},547:function(t,e,r){"use strict";r(548)("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r(549))},548:function(t,e,r){"use strict";var n=r(7),o=r(22),c=r(12),f=r(178),l=r(55),v=r(370),d=r(260),h=r(261),x=r(25),_=r(46),E=r(10),T=r(264),m=r(149),R=r(267);t.exports=function(t,e,r){var S=-1!==t.indexOf("Map"),I=-1!==t.indexOf("Weak"),w=S?"set":"add",y=o[t],C=y&&y.prototype,M=y,A={},N=function(t){var e=c(C[t]);l(C,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(I&&!_(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return I&&!_(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(I&&!_(t))&&e(this,0===t?0:t)}:function(t,r){return e(this,0===t?0:t,r),this})};if(f(t,!x(y)||!(I||C.forEach&&!E((function(){(new y).entries().next()})))))M=r.getConstructor(e,t,S,w),v.enable();else if(f(t,!0)){var k=new M,O=k[w](I?{}:-0,1)!=k,z=E((function(){k.has(1)})),V=T((function(t){new y(t)})),D=!I&&E((function(){for(var t=new y,e=5;e--;)t[w](e,e);return!t.has(-0)}));V||((M=e((function(t,e){h(t,C);var r=R(new y,t,M);return null!=e&&d(e,r[w],{that:r,AS_ENTRIES:S}),r}))).prototype=C,C.constructor=M),(z||D)&&(N("delete"),N("has"),S&&N("get")),(D||O)&&N(w),I&&C.clear&&delete C.clear}return A[t]=M,n({global:!0,constructor:!0,forced:M!=y},A),m(M,t),I||r.setStrong(M,t,S),M}},549:function(t,e,r){"use strict";var n=r(52).f,o=r(114),c=r(371),f=r(113),l=r(261),v=r(260),d=r(265),h=r(266),x=r(40),_=r(370).fastKey,E=r(102),T=E.set,m=E.getterFor;t.exports={getConstructor:function(t,e,r,d){var h=t((function(t,n){l(t,E),T(t,{type:e,index:o(null),first:void 0,last:void 0,size:0}),x||(t.size=0),null!=n&&v(n,t[d],{that:t,AS_ENTRIES:r})})),E=h.prototype,R=m(e),S=function(t,e,r){var n,o,c=R(t),f=I(t,e);return f?f.value=r:(c.last=f={index:o=_(e,!0),key:e,value:r,previous:n=c.last,next:void 0,removed:!1},c.first||(c.first=f),n&&(n.next=f),x?c.size++:t.size++,"F"!==o&&(c.index[o]=f)),t},I=function(t,e){var r,n=R(t),o=_(e);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==e)return r};return c(E,{clear:function(){for(var t=R(this),data=t.index,e=t.first;e;)e.removed=!0,e.previous&&(e.previous=e.previous.next=void 0),delete data[e.index],e=e.next;t.first=t.last=void 0,x?t.size=0:this.size=0},delete:function(t){var e=this,r=R(e),n=I(e,t);if(n){var o=n.next,c=n.previous;delete r.index[n.index],n.removed=!0,c&&(c.next=o),o&&(o.previous=c),r.first==n&&(r.first=o),r.last==n&&(r.last=c),x?r.size--:e.size--}return!!n},forEach:function(t){for(var e,r=R(this),n=f(t,arguments.length>1?arguments[1]:void 0);e=e?e.next:r.first;)for(n(e.value,e.key,this);e&&e.removed;)e=e.previous},has:function(t){return!!I(this,t)}}),c(E,r?{get:function(t){var e=I(this,t);return e&&e.value},set:function(t,e){return S(this,0===t?0:t,e)}}:{add:function(t){return S(this,t=0===t?0:t,t)}}),x&&n(E,"size",{get:function(){return R(this).size}}),h},setStrong:function(t,e,r){var n=e+" Iterator",o=m(e),c=m(n);d(t,e,(function(t,e){T(this,{type:n,target:t,state:o(t),kind:e,last:void 0})}),(function(){for(var t=c(this),e=t.kind,r=t.last;r&&r.removed;)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),h(e)}}},550:function(t,e,r){"use strict";var n=r(34),o=r(88),c=r(37);t.exports=function(){for(var t,e=c(this),r=o(e.delete),f=!0,l=0,v=arguments.length;l<v;l++)t=n(r,e,arguments[l]),f=f&&t;return!!f}},551:function(t,e){t.exports=function(t,e){return t===e||t!=t&&e!=e}},553:function(t,e,r){r(547)},554:function(t,e,r){"use strict";r(7)({target:"Map",proto:!0,real:!0,forced:!0},{deleteAll:r(550)})},555:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(113),f=r(537),l=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{every:function(t){var map=o(this),e=f(map),r=c(t,arguments.length>1?arguments[1]:void 0);return!l(e,(function(t,e,n){if(!r(e,t,map))return n()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},556:function(t,e,r){"use strict";var n=r(7),o=r(61),c=r(113),f=r(34),l=r(88),v=r(37),d=r(221),h=r(537),x=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{filter:function(t){var map=v(this),e=h(map),r=c(t,arguments.length>1?arguments[1]:void 0),n=new(d(map,o("Map"))),_=l(n.set);return x(e,(function(t,e){r(e,t,map)&&f(_,n,t,e)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),n}})},557:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(113),f=r(537),l=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{find:function(t){var map=o(this),e=f(map),r=c(t,arguments.length>1?arguments[1]:void 0);return l(e,(function(t,e,n){if(r(e,t,map))return n(e)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},558:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(113),f=r(537),l=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{findKey:function(t){var map=o(this),e=f(map),r=c(t,arguments.length>1?arguments[1]:void 0);return l(e,(function(t,e,n){if(r(e,t,map))return n(t)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},559:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(537),f=r(551),l=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{includes:function(t){return l(c(o(this)),(function(e,r,n){if(f(r,t))return n()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},560:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(537),f=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{keyOf:function(t){return f(c(o(this)),(function(e,r,n){if(r===t)return n(e)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}})},561:function(t,e,r){"use strict";var n=r(7),o=r(61),c=r(113),f=r(34),l=r(88),v=r(37),d=r(221),h=r(537),x=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{mapKeys:function(t){var map=v(this),e=h(map),r=c(t,arguments.length>1?arguments[1]:void 0),n=new(d(map,o("Map"))),_=l(n.set);return x(e,(function(t,e){f(_,n,r(e,t,map),e)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),n}})},562:function(t,e,r){"use strict";var n=r(7),o=r(61),c=r(113),f=r(34),l=r(88),v=r(37),d=r(221),h=r(537),x=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{mapValues:function(t){var map=v(this),e=h(map),r=c(t,arguments.length>1?arguments[1]:void 0),n=new(d(map,o("Map"))),_=l(n.set);return x(e,(function(t,e){f(_,n,t,r(e,t,map))}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),n}})},563:function(t,e,r){"use strict";var n=r(7),o=r(88),c=r(37),f=r(260);n({target:"Map",proto:!0,real:!0,arity:1,forced:!0},{merge:function(t){for(var map=c(this),e=o(map.set),r=arguments.length,i=0;i<r;)f(arguments[i++],e,{that:map,AS_ENTRIES:!0});return map}})},564:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(88),f=r(537),l=r(260),v=TypeError;n({target:"Map",proto:!0,real:!0,forced:!0},{reduce:function(t){var map=o(this),e=f(map),r=arguments.length<2,n=r?void 0:arguments[1];if(c(t),l(e,(function(e,o){r?(r=!1,n=o):n=t(n,o,e,map)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),r)throw v("Reduce of empty map with no initial value");return n}})},565:function(t,e,r){"use strict";var n=r(7),o=r(37),c=r(113),f=r(537),l=r(260);n({target:"Map",proto:!0,real:!0,forced:!0},{some:function(t){var map=o(this),e=f(map),r=c(t,arguments.length>1?arguments[1]:void 0);return l(e,(function(t,e,n){if(r(e,t,map))return n()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}})},566:function(t,e,r){"use strict";var n=r(7),o=r(34),c=r(37),f=r(88),l=TypeError;n({target:"Map",proto:!0,real:!0,forced:!0},{update:function(t,e){var map=c(this),r=f(map.get),n=f(map.has),v=f(map.set),d=arguments.length;f(e);var h=o(n,map,t);if(!h&&d<3)throw l("Updating absent value");var x=h?o(r,map,t):f(d>2?arguments[2]:void 0)(t,map);return o(v,map,t,e(x,t,map)),map}})},600:function(t,e,r){r(7)({target:"Object",stat:!0},{is:r(372)})},873:function(t,e,r){var content=r(915);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(32).default)("9256ec0c",content,!0,{sourceMap:!1})},914:function(t,e,r){"use strict";r(873)},915:function(t,e,r){var n=r(31)(!1);n.push([t.i,".border-rounded{border-radius:12px}.font-weight-500{font-weight:500}.from-form{border-radius:12px 0 0 12px}.v-btn{text-transform:none!important}.v-btn:before{opacity:0!important}.border-rounded.v-btn.v-btn--disabled.v-btn--has-bg{background-color:#f1f4f9}.v-ripple__container{opacity:0!important}.main-btn{font-size:18px;font-weight:700;height:60px!important}",""]),t.exports=n},957:function(t,e,r){"use strict";r.r(e);var n=r(140),o=r.n(n),c={data:()=>({bridge:o.a}),layout:"newbridge"},f=(r(914),r(72)),l=r(83),v=r.n(l),d=r(520),h=r(856),x=r(247),_=r(367),E=r(857),T=r(96),m=r(936),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{staticClass:"justify-center align-self-start",attrs:{"no-gutters":""}},[r("v-sheet",{staticClass:"pa-9 mt-15 border-rounded",attrs:{elevation:"1","max-width":"552px"}},[r("v-row",{staticClass:"d-flex flex-column"},[r("v-col",{staticClass:"mb-6",staticStyle:{"font-size":"24px"}},[r("a",{staticClass:"pr-6 font-weight-bold"},[r("span",[t._v(" Deposit ")])]),t._v(" "),r("a",[r("span",[t._v(" Withdraw ")])])]),t._v(" "),r("v-col",{staticClass:"pa-0",staticStyle:{"font-size":"14px"}},[r("v-sheet",{staticClass:"px-5 py-4 border-rounded",staticStyle:{"background-color":"#f4f7fa"}},[r("div",{staticClass:"d-flex align-center"},[r("span",{staticClass:"mr-1 font-weight-light"},[t._v(" From ")]),t._v(" "),r("v-btn",{attrs:{depressed:"",small:""}},[r("v-img",{attrs:{src:t.asset_icon}}),t._v(" "),r("span",[t._v(" Ethereum Mainnet ")]),t._v(" "),r("v-icon",{attrs:{small:""}},[t._v(" mdi-menu-down ")])],1)],1),t._v(" "),r("v-text-field",{staticClass:"from-form my-3",attrs:{outlined:"","hide-details":"true"}})],1)],1),t._v(" "),r("v-col",{staticClass:"text-center pa-0"},[r("v-btn",{staticClass:"pa-0",staticStyle:{"background-color":"transparent"},attrs:{depressed:"",elevation:"0"}},[r("v-icon",{attrs:{color:"#5959d8"}},[t._v(" mdi-arrow-down ")])],1)],1),t._v(" "),r("v-col",{staticClass:"pa-0",staticStyle:{"font-size":"14px"}},[r("v-sheet",{staticClass:"px-5 py-4 border-rounded",staticStyle:{"background-color":"#f4f7fa"}},[r("div",{staticClass:"d-flex flex-row mb-2"},[r("span",{staticClass:"font-weight-light"},[t._v(" To ")]),t._v(" "),r("v-img",{staticClass:"ml-2",attrs:{src:t.bridge,"max-height":"20px","max-width":"20px"}}),t._v(" "),r("span",{staticClass:"ml-2 font-weight-500"},[t._v(" MVM Mainnet ")])],1),t._v(" "),r("div",{staticClass:"d-flex flex-column font-weight-light"},[r("span",{staticClass:"mb-1"},[t._v(" You will receive:")]),t._v(" "),t.connected?r("span",{staticClass:"mb-1"},[t._v(" Balance: ")]):t._e()])])],1),t._v(" "),r("v-col",{staticClass:"pt-5 px-0"},[r("v-btn",{staticClass:"border-rounded main-btn white--text",attrs:{depressed:"",block:"",elevation:"0","x-large":"",color:"#5959d8"}},[t.connected?r("span",[t._v(" \n            Deposit\n          ")]):r("span",[t._v("\n            Connect Wallet\n          ")])])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VBtn:d.a,VCol:h.a,VIcon:x.a,VImg:_.a,VRow:E.a,VSheet:T.a,VTextField:m.a})}}]);