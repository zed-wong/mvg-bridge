(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1299:function(t,e,o){var content=o(1473);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(45).default)("669a24c8",content,!0,{sourceMap:!1})},1472:function(t,e,o){"use strict";o(1299)},1473:function(t,e,o){var n=o(44)(!1);n.push([t.i,".search-border{border-radius:10px!important}.select-token-css{font-size:20px;font-style:italic}",""]),t.exports=n},1548:function(t,e,o){"use strict";o.r(e);var n=o(822),c=o(1356),l=o(1911),r=o(338),f=o(515),d=o(339),h=o(223),m=o(341),k=o(231),x=o(343),_=o(1355),v=o(125),w=o(880),C=o(1456),T=(o(53),o(356),o(58),o(33),o(13),o(233),o(1151)),y=o(1227),D={data:function(){return{search:""}},computed:{selectTokenDialog:{get:function(){return this.$store.state.selectTokenDialog},set:function(t){this.$store.commit("toggleSelectToken",t)}},selectedToken:{get:function(){return this.$store.state.toToken},set:function(t){this.$store.commit("setToToken",t);var e=y.filter((function(e){return e.asset_id.match(t.chain_id)}))[0];this.$store.commit("setToNetwork",e),this.selectTokenDialog=!1}},assets:function(){return T.assets},filteredItems:function(){var t=this;return this.assets.filter((function(e){return e.symbol.toLowerCase().match(t.search)||e.name.toLowerCase().match(t.search)||e.asset_id.toLowerCase().match(t.search)}))}}},S=(o(1472),o(78)),component=Object(S.a)(D,(function(){var t=this,e=t._self._c;return e(l.a,{staticClass:"dialog-css",attrs:{"max-width":"400px","overlay-opacity":"0.95"},model:{value:t.selectTokenDialog,callback:function(e){t.selectTokenDialog=e},expression:"selectTokenDialog"}},[e(v.a,{staticClass:"align-self-start px-9 pt-8"},[e(_.a,{staticClass:"d-flex flex-column mb-0"},[e(c.a,{staticClass:"align-center d-flex flex-row pr-0"},[e("h1",{staticClass:"select-token-css"},[t._v("Select token")]),t._v(" "),e(w.a),t._v(" "),e(n.a,{attrs:{icon:""},on:{click:function(e){t.selectTokenDialog=!1}}},[e(r.a,[t._v(" mdi-close ")])],1)],1),t._v(" "),e(c.a,{staticClass:"pt-4 px-2"},[e(C.a,{staticClass:"search-border",attrs:{dense:"",outlined:"","hide-details":"true","prepend-inner-icon":"mdi-magnify",placeholder:"Search token name"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),e(c.a,{staticClass:"pt-2 px-0"},[e(d.a,{staticClass:"overflow-y-auto",attrs:{height:"450px"}},[e(x.a,t._l(t.filteredItems,(function(o,i){return e(h.a,{key:i,staticClass:"px-2",staticStyle:{"border-radius":"10px"},on:{click:function(e){t.selectedToken=o}}},[e(m.a,[e(f.a,{attrs:{src:o.icon_url}})],1),t._v(" "),e(k.a,[e(k.c,{staticClass:"font-weight-bold",staticStyle:{"font-size":"14px"}},[t._v("\n                  "+t._s(o.symbol)+"\n                ")]),t._v(" "),e(k.b,{staticStyle:{"font-size":"12px"}},[t._v("\n                  "+t._s(o.name)+"\n                ")])],1)],1)})),1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);