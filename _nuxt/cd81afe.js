(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{111:function(t,e,n){"use strict";var r={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(n(424),n(72)),c=n(83),d=n.n(c),l=n(527),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[404===t.error.statusCode?n("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):n("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);e.a=component.exports;d()(component,{VApp:l.a})},140:function(t,e,n){t.exports=n.p+"img/bridge.45e32e8.png"},144:function(t,e,n){t.exports=n.p+"img/github.0035c30.png"},257:function(t,e,n){"use strict";var r=n(4),o=n(360),c=n.n(o);r.a.use(c.a,"vac")},321:function(t,e,n){var content=n(425);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("dc093880",content,!0,{sourceMap:!1})},334:function(t,e,n){var content=n(453);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("45c7119f",content,!0,{sourceMap:!1})},338:function(t,e,n){var content=n(479);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("96b45102",content,!0,{sourceMap:!1})},343:function(t,e,n){var content=n(497);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("55f23202",content,!0,{sourceMap:!1})},363:function(t,e,n){"use strict";var r=n(30),o=(n(101),n(48),n(144)),c=n.n(o),d=n(140),l=n.n(d),m=n(116),h={0:"Kardia",1:"Ethereum",2:"Expanse",8:"Ubiq",10:"Optimism",19:"Songbird",20:"Elastos",25:"Cronos",30:"Rsk",40:"Telos",52:"Csc",55:"Zyx",56:"Binance",57:"Syscoin",60:"Gochain",61:"Ethclassic",66:"Okexchain",70:"Hoo",82:"Meter",88:"Tomochain",100:"Xdai",106:"Velas",108:"Thundercore",122:"Fuse",128:"Heco",137:"Polygon",200:"Xdaiarb",246:"Energyweb",250:"Fantom",269:"Hpb",288:"Boba",321:"Kucoin",336:"Shiden",361:"Theta",416:"Sx",534:"Candle",592:"Astar",820:"Callisto",888:"Wanchain",1088:"Metis",1246:"Omchain",1284:"Moonbeam",1285:"Moonriver",2020:"Ronin",2222:"Kava",2612:"Ezchain",4181:"Phi",4689:"Iotex",5050:"Xlc",5551:"Nahmii",7777:"Nmactest",8217:"Klaytn",9001:"Evmos",1e4:"Smartbch",103090:"Crystaleum",32659:"Fusion",42161:"Arbitrum",42220:"Celo",42262:"Oasis",43114:"Avalanche",71402:"Godwoken",73927:"Mvm",83927:"Quorum Test",200625:"Akroma",333999:"Polis",1313161554:"Aurora",16666e5:"Harmony",11297108109:"Palm",836542336838601:"Curio"},v={data:function(){return{bridge:l.a,githublogo:c.a,isMobile:!1,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Deposit From Other Network",to:"/bridge"}],githuburl:"https://github.com/zed-wong/zed-wong.github.io"}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address},network:function(){return this.$store.state.network.name}},mounted:function(){this.isMobile=this.checkMobile(),window.addEventListener("resize",this.checkMobile,{passive:!0})},methods:{redirect:function(t){window.location.href=t},checkMobile:function(){return window.innerWidth<600},connectWallet:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return n=e.sent,r=m.a.utils.getAddress(n[0]),t.register(r),e.next=7,window.ethereum.request({method:"eth_chainId"});case 7:o=e.sent,c=h[parseInt(o,16)],t.$store.commit("connect",{address:r,name:c});case 10:case"end":return e.stop()}}),e)})))()},register:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=m.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:r});case 3:o=n.sent,localStorage.setItem("user",JSON.stringify(o.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},getAvatar:function(t){if(localStorage.getItem("avatar_url"))return localStorage.getItem("avatar_url");for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=n.length,i=0;i<t;i++)e+=n.charAt(Math.floor(Math.random()*r));var o="https://avatars.dicebear.com/api/identicon/"+e+".png";return localStorage.setItem("avatar_url",o),o}}},f=(n(496),n(72)),x=n(83),w=n.n(x),_=n(527),k=n(535),y=n(250),C=n(520),V=n(536),A=n(367),M=n(528),S=n(534),component=Object(f.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[t.isMobile?t._e():n("v-app-bar",{staticClass:"px-6",attrs:{elevation:"1",color:"#ffffff"}},[n("v-img",{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"24px","max-height":"24px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),n("span",{staticClass:"font-weight-bold ml-3",staticStyle:{"font-size":"18px"},on:{click:function(e){return t.redirect("/")}}},[t._v("\n        Bridge\n      ")]),t._v(" "),n("v-spacer"),t._v(" "),t.connected?t._e():n("v-btn",{staticClass:"ml-3 connect-wallet",attrs:{height:"40px",elevation:"0",color:"#5959d8"},on:{click:t.connectWallet}},[n("span",{staticStyle:{color:"white"}},[t._v(" Connect Wallet")])]),t._v(" "),t.connected?n("v-btn",{staticClass:"mx-3",attrs:{text:"",rounded:"",outlined:"",depressed:"",elevation:"0"}},[n("span",{staticClass:"text-truncate px-1",staticStyle:{"max-width":"100px","font-size":"12px"}},[t._v(t._s(t.network))])]):t._e(),t._v(" "),t.connected?n("v-btn",{staticClass:"mx-1",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",text:""}},[n("v-avatar",{staticClass:"mr-2",attrs:{size:"22px"}},[n("v-img",{attrs:{src:t.getAvatar(6),"max-height":"22px","max-width":"22px"}})],1),t._v(" "),n("span",{staticClass:"text-truncate",staticStyle:{"max-width":"100px","font-size":"12px"}},[t._v(t._s(t.address))])],1):t._e()],1),t._v(" "),n("v-container",{staticClass:"fill-height",staticStyle:{"background-color":"#f4f7fa"},attrs:{fluid:""}},[n("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;w()(component,{VApp:_.a,VAppBar:k.a,VAvatar:y.a,VBtn:C.a,VContainer:V.a,VImg:A.a,VMain:M.a,VSpacer:S.a})},364:function(t,e,n){"use strict";var r={data:function(){return{}}},o=n(72),c=n(83),d=n.n(c),l=n(527),m=n(536),h=n(528),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",[e("v-main",[e("v-container",[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;d()(component,{VApp:l.a,VContainer:m.a,VMain:h.a})},365:function(t,e,n){"use strict";var r=n(30),o=(n(101),n(144)),c=n.n(o),d=n(140),l=n.n(d),m=n(116),h={data:function(){return{bridge:l.a,githublogo:c.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Withdraw To Address(WIP)",to:"/anywithdraw"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(t){window.location.href=t},connectWallet:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:n=e.sent,t.register(n[0]),t.$store.commit("connect",n[0]);case 5:case"end":return e.stop()}}),e)})))()},register:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=m.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:r});case 3:o=n.sent,localStorage.setItem("user",JSON.stringify(o.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},v=(n(452),n(72)),f=n(83),x=n.n(f),w=n(527),_=n(535),k=n(520),y=n(536),C=n(367),V=n(528),A=n(534),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[n("v-app-bar",{attrs:{elevation:"0"}},[n("v-img",{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),n("span",{staticClass:"font-weight-bold ml-2",on:{click:function(e){return t.redirect("/")}}},[t._v("\n        MVM-Bridge\n      ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-img",{staticClass:"mr-3",attrs:{src:t.githublogo,"max-height":"22px","max-width":"22px"},on:{click:t.toGithub}}),t._v(" "),t.connected?t._e():n("v-btn",{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:t.connectWallet}},[t._v("\n        Connect Wallet\n      ")]),t._v(" "),t.connected?n("v-btn",{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[n("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[t._v(t._s(t.address))])]):t._e()],1),t._v(" "),n("v-container",[n("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;x()(component,{VApp:w.a,VAppBar:_.a,VBtn:k.a,VContainer:y.a,VImg:C.a,VMain:V.a,VSpacer:A.a})},366:function(t,e,n){"use strict";var r=n(30),o=(n(101),n(144)),c=n.n(o),d=n(140),l=n.n(d),m=n(116),h={data:function(){return{bridge:l.a,githublogo:c.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Deposit From Other Network",to:"/bridge"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(t){window.location.href=t},connectWallet:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return n=e.sent,t.register(n[0]),t.$store.commit("connect",n[0]),e.next=7,window.ethereum.request({method:"eth_chainId"});case 7:if("0x120c7"==e.sent){e.next=19;break}return e.prev=9,e.next=12,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x120c7"}]});case 12:e.next=19;break;case 14:if(e.prev=14,e.t0=e.catch(9),4902!==e.t0.code){e.next=19;break}return e.next=19,window.ethereum.request({method:"wallet_addEthereumChain",params:chain});case 19:case"end":return e.stop()}}),e,null,[[9,14]])})))()},register:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=m.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:r});case 3:o=n.sent,localStorage.setItem("user",JSON.stringify(o.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},v=(n(478),n(72)),f=n(83),x=n.n(f),w=n(527),_=n(535),k=n(520),y=n(536),C=n(247),V=n(367),A=n(248),M=n(172),S=n(180),O=n(528),E=n(521),I=n(534),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-main",[n("v-app-bar",{attrs:{elevation:"0"}},[n("v-img",{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),n("span",{staticClass:"font-weight-bold ml-2",on:{click:function(e){return t.redirect("/")}}},[t._v("\n        MVM Bridge\n      ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-img",{staticClass:"mr-3",attrs:{src:t.githublogo,"max-height":"22px","max-width":"22px"},on:{click:t.toGithub}}),t._v(" "),n("v-menu",{attrs:{"offset-y":"","open-on-hover":""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-btn",t._g(t._b({attrs:{"aria-haspopup":"true","aria-expanded":"false",elevation:"0",depressed:""}},"v-btn",o,!1),r),[n("span",{staticClass:"font-weight-light"},[t._v("ToolBox")]),t._v(" "),n("v-icon",{staticStyle:{"font-size":"14px",height:"14px",width:"14px"}},[t._v("\n              mdi-chevron-down\n            ")])],1)]}}])},[t._v(" "),n("v-list",t._l(t.links,(function(link,i){return n("v-list-item",{key:i,on:{click:function(e){return t.redirect(link.to)}}},[n("v-list-item-title",[t._v("\n              "+t._s(link.name)+"\n            ")])],1)})),1)],1),t._v(" "),t.connected?t._e():n("v-btn",{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:t.connectWallet}},[t._v("\n        Connect Wallet\n      ")]),t._v(" "),t.connected?n("v-btn",{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[n("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[t._v(t._s(t.address))])]):t._e()],1),t._v(" "),n("v-container",[n("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;x()(component,{VApp:w.a,VAppBar:_.a,VBtn:k.a,VContainer:y.a,VIcon:C.a,VImg:V.a,VList:A.a,VListItem:M.a,VListItemTitle:S.b,VMain:O.a,VMenu:E.a,VSpacer:I.a})},380:function(t,e,n){n(381),t.exports=n(382)},424:function(t,e,n){"use strict";n(321)},425:function(t,e,n){var r=n(31)(!1);r.push([t.i,"h1[data-v-35e10596]{font-size:20px}",""]),t.exports=r},443:function(t,e){},450:function(t,e){},452:function(t,e,n){"use strict";n(334)},453:function(t,e,n){var r=n(31)(!1);r.push([t.i,".v-btn{text-transform:none!important}",""]),t.exports=r},478:function(t,e,n){"use strict";n(338)},479:function(t,e,n){var r=n(31)(!1);r.push([t.i,".v-btn{text-transform:none!important}",""]),t.exports=r},496:function(t,e,n){"use strict";n(343)},497:function(t,e,n){var r=n(31)(!1);r.push([t.i,".v-btn{text-transform:none!important}*{font-family:Open Sans,sans-serif}.connect-wallet{align-items:center;border-radius:100px;font-size:14px;font-weight:700;text-overflow:ellipsis;margin:0 6px;padding:0 12px}.connect-wallet:hover{background-color:#5959d8!important}",""]),t.exports=r},498:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{connected:!1,network:{address:"",name:""}}},o={connect:function(t,data){t.network=data,t.connected=!0,console.log(data)}}}},[[380,20,6,21]]]);