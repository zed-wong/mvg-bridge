(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{140:function(t,e,n){"use strict";var o=n(878),r={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(n(592),n(78)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e(o.a,{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);e.a=component.exports},182:function(t,e,n){t.exports=n.p+"img/bridge.45e32e8.png"},187:function(t,e,n){t.exports=n.p+"img/github.0035c30.png"},292:function(t,e,n){"use strict";n.r(e);var o=n(822),r=(n(315),n(194)),c=n(514),l=n(505),d=n(506),f=Object(l.a)(),h=Object(d.a)(),m=[Object(c.a)(),h,f],v="https://mainnet.infura.io/v3/".concat("926b17d7967649a999ef0a55089d8fda"),w=Object(r.a)({wallets:m,chains:[{id:"0x1",token:"ETH",label:"Ethereum Mainnet",rpcUrl:v},{id:"0x120C7",token:"XIN",label:"MVM Mainnet",rpcUrl:"https://geth.mvm.dev/"}],appMetadata:{name:"MVM Bridge",description:"Mixin Virtual Machine Bridge",icon:"https://mvm.dev/logo.svg",logo:"https://mvm.dev/logo.svg",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"Coinbase",url:"https://wallet.coinbase.com/"}]}}),x=n(130),_={props:["small","huge"],methods:{async connect(){try{await w.connectWallet();const{wallets:t,connectWallet:e,disconnectConnectedWallet:n,connectedChain:o,connectedWallet:c}=Object(r.b)();if(c){const t=new x.a.providers.Web3Provider(c.value.provider,"any").getSigner(),e=await t.getAddress(),n=x.a.utils.getAddress(e);await this.register(e),this.$store.commit("connect",{address:n,name:"",id:o.value.id})}}catch(t){console.log(t)}},async register(t){const e=x.a.utils.getAddress(t),n=await this.$axios.post("https://bridge.mvm.dev/users",{public_key:e});localStorage.setItem("user",JSON.stringify(n.data.user.key))}}},k=(n(794),n(78)),component=Object(k.a)(_,(function(){var t=this,e=t._self._c;return e("div",[t.small?e(o.a,{staticClass:"ml-3 connect-wallet",attrs:{height:"40px",elevation:"0",color:"#5959d8"},on:{click:t.connect}},[e("span",{staticStyle:{color:"white"}},[t._v(" Connect Wallet")])]):t._e(),t._v(" "),t.huge?e(o.a,{staticClass:"border-rounded main-btn white--text",attrs:{block:"","x-large":"",depressed:"",elevation:"0",color:"#5959d8"},on:{click:t.connect}},[e("span",[t._v(" Connect Wallet ")])]):t._e()],1)}),[],!1,null,null,null);e.default=component.exports},349:function(t,e,n){"use strict";var o=n(9),r=n(507),c=n.n(r);o.default.use(c.a,"vac")},420:function(t,e,n){var content=n(593);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("4d6a2e0f",content,!0,{sourceMap:!1})},433:function(t,e,n){var content=n(643);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("2338136c",content,!0,{sourceMap:!1})},438:function(t,e,n){var content=n(661);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("362fd121",content,!0,{sourceMap:!1})},467:function(t,e,n){var content=n(795);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("67fc2e24",content,!0,{sourceMap:!1})},468:function(t,e,n){var content=n(797);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("49cdf80b",content,!0,{sourceMap:!1})},510:function(t,e,n){"use strict";var o=n(878),r=n(889),c=n(879),l={data:function(){return{}}},d=n(78),component=Object(d.a)(l,(function(){var t=this._self._c;return t(o.a,[t(c.a,[t(r.a,[t("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},511:function(t,e,n){"use strict";var o=n(878),r=n(888),c=n(822),l=n(889),d=n(515),f=n(879),h=n(880),m=n(51),v=(n(143),n(187)),w=n.n(v),x=n(182),_=n.n(x),k=n(130),y={data:function(){return{bridge:_.a,githublogo:w.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Withdraw To Address(WIP)",to:"/anywithdraw"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(t){window.location.href=t},connectWallet:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:n=e.sent,t.register(n[0]),t.$store.commit("connect",n[0]);case 5:case"end":return e.stop()}}),e)})))()},register:function(t){var e=this;return Object(m.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=k.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:o});case 3:r=n.sent,localStorage.setItem("user",JSON.stringify(r.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},C=(n(642),n(78)),component=Object(C.a)(y,(function(){var t=this,e=t._self._c;return e(o.a,[e(f.a,[e(r.a,{attrs:{elevation:"0"}},[e(d.a,{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),e("span",{staticClass:"font-weight-bold ml-2",on:{click:function(e){return t.redirect("/")}}},[t._v("\n        MVM-Bridge\n      ")]),t._v(" "),e(h.a),t._v(" "),e(d.a,{staticClass:"mr-3",attrs:{src:t.githublogo,"max-height":"22px","max-width":"22px"},on:{click:t.toGithub}}),t._v(" "),t.connected?t._e():e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:t.connectWallet}},[t._v("\n        Connect Wallet\n      ")]),t._v(" "),t.connected?e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[e("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[t._v(t._s(t.address))])]):t._e()],1),t._v(" "),e(l.a,[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},512:function(t,e,n){"use strict";var o=n(878),r=n(888),c=n(822),l=n(889),d=n(338),f=n(515),h=n(339),m=n(223),v=n(231),w=n(879),x=n(820),_=n(880),k=(n(58),n(51)),y=(n(143),n(187)),C=n.n(y),M=n(182),W=n.n(M),N=n(130),A={data:function(){return{bridge:W.a,githublogo:C.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Deposit From Other Network",to:"/bridge"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(t){window.location.href=t},connectWallet:function(){var t=this;return Object(k.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return n=e.sent,t.register(n[0]),t.$store.commit("connect",{address:n[0]}),e.next=7,window.ethereum.request({method:"eth_chainId"});case 7:if("0x120c7"==e.sent){e.next=19;break}return e.prev=9,e.next=12,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x120c7"}]});case 12:e.next=19;break;case 14:if(e.prev=14,e.t0=e.catch(9),4902!==e.t0.code){e.next=19;break}return e.next=19,window.ethereum.request({method:"wallet_addEthereumChain",params:chain});case 19:case"end":return e.stop()}}),e,null,[[9,14]])})))()},register:function(t){var e=this;return Object(k.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=N.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:o});case 3:r=n.sent,localStorage.setItem("user",JSON.stringify(r.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},D=(n(660),n(78)),component=Object(D.a)(A,(function(){var t=this,e=t._self._c;return e(o.a,[e(w.a,[e(r.a,{attrs:{elevation:"0"}},[e(f.a,{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),e("span",{staticClass:"font-weight-bold ml-2",on:{click:function(e){return t.redirect("/")}}},[t._v("\n        MVM Bridge\n      ")]),t._v(" "),e(_.a),t._v(" "),e(f.a,{staticClass:"mr-3",attrs:{src:t.githublogo,"max-height":"22px","max-width":"22px"},on:{click:t.toGithub}}),t._v(" "),e(x.a,{attrs:{"offset-y":"","open-on-hover":""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[e(c.a,t._g(t._b({attrs:{"aria-haspopup":"true","aria-expanded":"false",elevation:"0",depressed:""}},"v-btn",r,!1),o),[e("span",{staticClass:"font-weight-light"},[t._v("ToolBox")]),t._v(" "),e(d.a,{staticStyle:{"font-size":"14px",height:"14px",width:"14px"}},[t._v("\n              mdi-chevron-down\n            ")])],1)]}}])},[t._v(" "),e(h.a,t._l(t.links,(function(link,i){return e(m.a,{key:i,on:{click:function(e){return t.redirect(link.to)}}},[e(v.c,[t._v("\n              "+t._s(link.name)+"\n            ")])],1)})),1)],1),t._v(" "),t.connected?t._e():e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:t.connectWallet}},[t._v("\n        Connect Wallet\n      ")]),t._v(" "),t.connected?e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[e("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[t._v(t._s(t.address))])]):t._e()],1),t._v(" "),e(l.a,[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},513:function(t,e,n){"use strict";var o=n(878),r=n(888),c=n(889),l=n(515),d=n(879),f=n(880),h=(n(58),n(182)),m=n.n(h),v=n(187),w=n.n(v),x={components:{connectWallet:n(292).default},data:function(){return{bridge:m.a,githublogo:w.a,isMobile:!1,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Deposit From Other Network",to:"/bridge"}],githuburl:"https://github.com/zed-wong/zed-wong.github.io"}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address},network:function(){return this.$store.state.network.name},connectWalletDialog:{get:function(){return this.$store.state.connectWalletDialog},set:function(t){this.$store.commit("toggleConnectWallet",t)}}},mounted:function(){this.isMobile=this.checkMobile(),window.addEventListener("resize",this.checkMobile,{passive:!0})},methods:{redirect:function(t){window.location.href=t},checkMobile:function(){return window.innerWidth<600},getAvatar:function(t){if(localStorage.getItem("avatar_url"))return localStorage.getItem("avatar_url");for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,i=0;i<t;i++)e+=n.charAt(Math.floor(Math.random()*o));var r="https://avatars.dicebear.com/api/identicon/"+e+".png";return localStorage.setItem("avatar_url",r),r}}},_=(n(796),n(78)),component=Object(_.a)(x,(function(){var t=this,e=t._self._c;return e(o.a,[e(d.a,[t.isMobile?t._e():e(r.a,{staticClass:"px-6 bar-css",attrs:{elevation:"0",color:"#ffffff",height:"90px"}},[e(l.a,{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"24px","max-height":"26px"},on:{click:function(e){return t.redirect("https://scan.mvm.dev")}}}),t._v(" "),e("span",{staticClass:"font-weight-bold ml-3",staticStyle:{"font-size":"18px"},on:{click:function(e){return t.redirect("https://scan.mvm.dev")}}},[t._v("\n        Bridge\n      ")]),t._v(" "),e(f.a),t._v(" "),t.connected?t._e():e("connect-wallet",{attrs:{small:!0}})],1),t._v(" "),e(c.a,{staticClass:"fill-height content py-0",staticStyle:{"background-color":"#f4f7fa"},attrs:{fluid:""}},[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{ConnectWallet:n(292).default})},546:function(t,e,n){n(547),t.exports=n(548)},592:function(t,e,n){"use strict";n(420)},593:function(t,e,n){var o=n(44)(!1);o.push([t.i,"h1[data-v-35e10596]{font-size:20px}",""]),t.exports=o},633:function(t,e){},640:function(t,e){},642:function(t,e,n){"use strict";n(433)},643:function(t,e,n){var o=n(44)(!1);o.push([t.i,".v-btn{text-transform:none!important}",""]),t.exports=o},660:function(t,e,n){"use strict";n(438)},661:function(t,e,n){var o=n(44)(!1);o.push([t.i,".v-btn{text-transform:none!important}",""]),t.exports=o},662:function(t,e){},663:function(t,e){},664:function(t,e){},665:function(t,e){},666:function(t,e){},667:function(t,e){},668:function(t,e){},669:function(t,e){},670:function(t,e){},671:function(t,e){},672:function(t,e){},673:function(t,e){},674:function(t,e){},675:function(t,e){},794:function(t,e,n){"use strict";n(467)},795:function(t,e,n){var o=n(44)(!1);o.push([t.i,"",""]),t.exports=o},796:function(t,e,n){"use strict";n(468)},797:function(t,e,n){var o=n(44)(!1);o.push([t.i,".v-btn{text-transform:none!important}.connect-wallet{align-items:center;border-radius:100px;font-size:14px;font-weight:700;text-overflow:ellipsis;margin:0 6px;padding:0 12px}.connect-wallet:hover{background-color:#1976d2!important}.bar-css{border-width:0 0 thin;border-style:solid;border-bottom-color:rgba(0,0,0,.12)!important}.content{height:calc(100vh - 90px)}",""]),t.exports=o},798:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"mutations",(function(){return r}));n(58);var o=function(){return{connected:!1,connectWalletDialog:!1,provider:void 0,signer:void 0,userAddress:"",networkName:"",chainId:"",selectNetworkDialog:!1,fromNetwork:{},selectTokenDialog:!1,fromToken:{},confirmDepositDialog:!1,depositAddr:[],supportMetamaskNetworks:["ETH"],toNetwork:{},toToken:{},confirmWithdrawDialog:!1,withdrawAddr:[]}},r={connect:function(t,data){t.userAddress=data.address,t.networkName=data.name,t.chainId=data.id,t.connected=!0},toggleConnectWallet:function(t,e){t.connectWalletDialog=e},toggleSelectNetwork:function(t,e){t.selectNetworkDialog=e},toggleSelectToken:function(t,e){t.selectTokenDialog=e},toggleConfirmDeposit:function(t,e){t.confirmDepositDialog=e},toggleConfirmWithdraw:function(t,e){t.confirmWithdrawDialog=e},setProvider:function(t,data){t.provider=data},setSigner:function(t,data){t.signer=data},setFromNetwork:function(t,data){t.fromNetwork=data},setFromToken:function(t,data){t.fromToken=data},setToNetwork:function(t,data){t.toNetwork=data},setToToken:function(t,data){t.toToken=data},setDepositAddr:function(t,data){t.depositAddr=data},setWithdrawAddr:function(t,data){t.withdrawAddr=data}}}},[[546,36,12,37]]]);