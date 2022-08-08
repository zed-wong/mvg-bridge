(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{153:function(t,e,n){"use strict";var o=n(930),r={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(n(631),n(77)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e(o.a,{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);e.a=component.exports},252:function(t,e,n){t.exports=n.p+"img/bridge.45e32e8.png"},298:function(t,e,n){"use strict";n.d(e,"a",(function(){return _}));var o=n(177),r=n(551),c=n(540),l=n(541),d=Object(c.a)(),f=Object(l.a)(),m=[Object(r.a)(),f,d],h="https://mainnet.infura.io/v3/".concat("926b17d7967649a999ef0a55089d8fda"),_=Object(o.a)({wallets:m,chains:[{id:"0x1",token:"ETH",namespace:"evm",label:"Ethereum Mainnet",rpcUrl:h,blockExplorerUrl:"https://etherscan.io/"},{id:"0x120C7",namespace:"evm",token:"ETH",label:"MVM Mainnet",rpcUrl:"https://geth.mvm.dev/",blockExplorerUrl:"https://scan.mvm.dev/"}],appMetadata:{name:"MVG",description:"Mixin Virtual Machine Bridge",icon:"https://mvm.dev/logo.svg",logo:"https://mvm.dev/logo.svg",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"Coinbase",url:"https://wallet.coinbase.com/"}]},i18n:{en:{connect:{selectingWallet:{header:"Available Wallets",sidebar:{heading:"Welcome",subheading:"Connect your wallet",paragraph:"Connecting your wallet to MVG to bridge your asset from any network into MVM mainnet or withdraw from MVM mainnet to any network."}}}},zh:{connect:{selectingWallet:{header:"已支持的錢包",sidebar:{heading:"歡迎",subheading:"連接錢包",paragraph:"通過連接您的錢包，以完成在MVM主網的充值與提現。\nMVG現已支持Mixin主網排名前100的幣種和所有網絡。"}},connectingWallet:{sidebar:{subheading:"授權連接",paragraph:"請在您的錢包中授權連接，以繼續操作。"},mainText:"連接中...",paragraph:"請確保勾選中您想要授權的錢包地址。",rejectedText:"連接已被取消!",rejectedCTA:"點我重試",primaryButton:"回到錢包列表"},connectedWallet:{header:"連接成功",sidebar:{subheading:"連接成功!",paragraph:"您的錢包已連接至 {app}"},mainText:"已連接"}},modals:{actionRequired:{heading:"操作需要在 {wallet} 完成",paragraph:"請切換到您錢包中的活躍賬戶.",linkText:"瞭解更多.",buttonText:"Okay"},switchChain:{heading:"切換網絡",paragraph1:"{app} 需要您在您的錢包中切換到 {nextNetworkName} 網絡以繼續。",paragraph2:"*某些錢包可能不支持切換網絡. 如您不能切換網絡，您可能需要考慮更換一個能夠切換網絡的錢包。"},confirmDisconnectAll:{heading:"斷開所有連接",description:"您確定要斷開所有錢包的連接嗎？",confirm:"確定",cancel:"取消"}},accountCenter:{connectAnotherWallet:"連接另一個錢包",disconnectAllWallets:"斷開所有連接",currentNetwork:"當前網絡",appInfo:"App 信息",learnMore:"瞭解更多",gettingStartedGuide:"快速開始教程",smartContracts:"智能合約",explore:"探索",backToApp:"回到 dapp",poweredBy:"Powered by",addAccount:"添加賬戶",setPrimaryAccount:"設置主要賬戶",disconnectWallet:"斷開當前連接",copyAddress:"複製錢包地址"}}},accountCenter:{desktop:{enabled:!1},mobile:{enabled:!1}}})},314:function(t,e,n){"use strict";n.r(e);var o=n(874),r=(n(360),n(33)),c=n(36),l=(n(112),n(298)),d=n(173);function f(t){var e=[];return JSON.stringify(t,(function(t,n){if(null!=n&&"object"==Object(c.a)(n)){if(e.indexOf(n)>=0)return;e.push(n)}return n}))}var m={props:["small","huge"],methods:{connect:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.a.connectWallet();case 3:if(!((n=e.sent).length>0)){e.next=11;break}return localStorage.setItem("connectedWallet",f(n[0])),o=n[0].accounts[0].address,r=n[0].chains[0].id,t.$store.commit("connect",{address:o,name:n[0].label,id:r}),e.next=11,t.register(o);case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:return e.abrupt("return");case 17:case"end":return e.stop()}}),e,null,[[0,13]])})))()},register:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=d.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:o});case 3:r=n.sent,localStorage.setItem("user",JSON.stringify(r.data.user.key));case 5:case"end":return n.stop()}}),n)})))()}}},h=(n(807),n(77)),component=Object(h.a)(m,(function(){var t=this,e=t._self._c;return e("div",[t.small?e(o.a,{staticClass:"ml-3 connect-wallet",attrs:{height:"40px",elevation:"0",color:"#5959d8"},on:{click:t.connect}},[e("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.$t("connect_wallet")))])]):t._e(),t._v(" "),t.huge?e(o.a,{staticClass:"border-rounded main-btn white--text",attrs:{block:"","x-large":"",depressed:"",elevation:"0",color:"#5959d8"},on:{click:t.connect}},[e("span",[t._v(" "+t._s(t.$t("connect_wallet"))+" ")])]):t._e()],1)}),[],!1,null,"52822987",null);e.default=component.exports},388:function(t,e,n){"use strict";n.r(e);var o=n(382),r=n(874),c=n(552),l=n(33),d=(n(88),n(13),n(112),n(177)),f={data:function(){return{btnText:"",networkIcon:""}},computed:{fromNetwork:function(){return this.$store.state.fromNetwork},toNetwork:function(){return this.$store.state.toNetwork},fromToken:function(){return this.$store.state.fromToken},toToken:function(){return this.$store.state.toToken},confirmDepositDialog:function(){return this.$store.state.confirmDepositDialog}},mounted:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.check();case 2:case"end":return e.stop()}}),e)})))()},watch:{fromNetwork:function(t,e){this.check()},toNetwork:function(t,e){this.check()},fromToken:function(t,e){this.check()},toToken:function(t,e){this.check()},confirmDepositDialog:function(t,e){this.check()}},methods:{check:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var n,o,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.sleep(1e3);case 2:o=Object(d.b)(),r=o.connectedChain,c=null===(n=r.value)||void 0===n?void 0:n.id,t.$store.commit("updateChainId",c),e.t0=c,e.next="0x1"===e.t0?8:"0x120c7"===e.t0?11:14;break;case 8:return t.btnText=t.$t("ethereum_mainnet"),t.networkIcon="https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",e.abrupt("return");case 11:return t.btnText=t.$t("mvm_mainnet"),t.networkIcon="https://mvm.dev/logo.svg",e.abrupt("return");case 14:return t.btnText=t.$t("unsupported_network"),t.networkIcon="",e.abrupt("return",!1);case 17:case"end":return e.stop()}}),e)})))()},loopCheck:function(){setTimeout(this.check(),3e3)},sleep:function(t){return new Promise((function(e){return setTimeout(e,t)}))}}},m=(n(811),n(77)),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e(r.a,{staticClass:"ml-3 current-network-btn",attrs:{height:"40px",elevation:"0",rounded:"",color:"#f4f7fa"}},[t.networkIcon?e(o.a,{staticClass:"mr-2",attrs:{size:"24"}},[e(c.a,{attrs:{src:t.networkIcon}})],1):t._e(),t._v(" "),e("span",{},[t._v(" "+t._s(t.btnText)+" ")])],1)}),[],!1,null,null,null);e.default=component.exports},389:function(t,e,n){"use strict";n.r(e);var o=n(382),r=n(874),c=n(552),l={data:function(){return{avatarURL:""}},components:{ConnectedDialog:n(390).default},computed:{userAddress:function(){return this.$store.state.userAddress}},mounted:function(){this.avatarURL=this.getAvatar(8)},methods:{getAvatar:function(t){if(localStorage.getItem("avatar_url"))return localStorage.getItem("avatar_url");for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,i=0;i<t;i++)e+=n.charAt(Math.floor(Math.random()*o));var r="https://api.multiavatar.com/"+e+".svg";return localStorage.setItem("avatar_url",r),r},toggleAccountDialog:function(){this.$store.commit("toggleAccount",!this.$store.state.accountDialog)}}},d=(n(828),n(77)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e(r.a,{staticClass:"ml-3 connected-wallet",attrs:{height:"40px",elevation:"0",rounded:"",color:"#f4f7fa"},on:{click:t.toggleAccountDialog}},[e(o.a,{staticClass:"mr-2",attrs:{size:"24"}},[e(c.a,{attrs:{src:t.avatarURL}})],1),t._v(" "),e("span",{staticClass:"connected-wallet-address-text"},[t._v(" "+t._s(t.userAddress))])],1),t._v(" "),e("connected-dialog")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ConnectedDialog:n(390).default})},390:function(t,e,n){"use strict";n.r(e);var o=n(382),r=n(874),c=n(939),l=n(942),d=n(384),f=n(552),m=n(938),h=n(138),_=n(932),v=n(940),w=(n(88),n(177)),x={data:function(){return{avatarURL:"",copySucceed:!1}},computed:{accountDialog:{get:function(){return this.$store.state.accountDialog},set:function(t){this.$store.commit("toggleAccount",t)}},userAddress:{get:function(){return this.$store.state.userAddress}}},mounted:function(){this.avatarURL=this.getAvatar(8)},methods:{getAvatar:function(t){if(localStorage.getItem("avatar_url"))return localStorage.getItem("avatar_url");for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,i=0;i<t;i++)e+=n.charAt(Math.floor(Math.random()*o));var r="https://api.multiavatar.com/"+e+".svg";return localStorage.setItem("avatar_url",r),r},copyAddr:function(t){var e=this;navigator.clipboard.writeText(t),this.copySucceed=!0,setTimeout((function(){e.copySucceed=!1}),"2000")},viewOnExplorer:function(){this.userAddress?window.open("https://scan.mvm.dev/address/".concat(this.userAddress)):window.open("https://scan.mvm.dev/")},disconnect:function(){(0,Object(w.b)().disconnectConnectedWallet)(),this.$store.commit("disconnect"),this.accountDialog=!1}}},k=(n(826),n(77)),component=Object(k.a)(x,(function(){var t=this,e=t._self._c;return e(l.a,{attrs:{"max-width":"460px","overlay-opacity":"0.15"},model:{value:t.accountDialog,callback:function(e){t.accountDialog=e},expression:"accountDialog"}},[e(h.a,{staticClass:"align-self-start px-9 py-8"},[e(m.a,{staticClass:"d-flex flex-column mb-0"},[e(c.a,{staticClass:"align-center d-flex flex-row pa-0"},[e(_.a),t._v(" "),e(r.a,{attrs:{icon:""},on:{click:function(e){t.accountDialog=!1}}},[e(d.a,[t._v(" mdi-close ")])],1)],1),t._v(" "),e(c.a,{staticClass:"align-center d-flex flex-row pr-0 mb-2"},[e(o.a,[e(f.a,{attrs:{src:t.avatarURL}})],1),t._v(" "),e("div",{staticClass:"d-flex flex-column ml-4"},[e("div",{staticClass:"d-flex flex-row"},[e("span",{staticClass:"connected-dialog-address-text"},[t._v("\n              "+t._s(t.userAddress)+"\n            ")])]),t._v(" "),e("div",{on:{click:function(e){return t.copyAddr(t.userAddress)}}},[e(v.a,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){n.on,n.attrs;return[e("a",{staticStyle:{color:"black",opacity:"0.5"}},[e(d.a,{attrs:{small:""}},[t._v(" mdi-content-copy ")]),t._v(" "),e("span",{staticStyle:{"font-size":"0.8rem"}},[t._v(" "+t._s(t.$t("copy_address"))+" ")])],1)]}}]),model:{value:t.copySucceed,callback:function(e){t.copySucceed=e},expression:"copySucceed"}},[t._v(" "),e("span",{staticStyle:{"font-size":"12px"}},[t._v(" "+t._s(t.$t("copied"))+" ")])])],1)])],1),t._v(" "),e(c.a,{staticClass:"align-center d-flex flex-column mt-4"},[e(r.a,{staticClass:"disconnect-btn mb-3",attrs:{elevation:"0",rounded:"",block:"","x-large":""},on:{click:t.viewOnExplorer}},[e(d.a,{staticClass:"mr-2"},[t._v(" mdi-firefox ")]),t._v(" "),e("span",[t._v(" "+t._s(t.$t("view_on_explorer"))+" ")])],1),t._v(" "),e(r.a,{staticClass:"disconnect-btn",attrs:{elevation:"0",rounded:"",block:"","x-large":""},on:{click:t.disconnect}},[e(d.a,{staticClass:"mr-2"},[t._v(" mdi-logout ")]),t._v(" "),e("span",[t._v(" "+t._s(t.$t("disconnect"))+" ")])],1)],1)],1)],1)],1)}),[],!1,null,"6d4e0b10",null);e.default=component.exports},397:function(t,e,n){"use strict";var o=n(7),r=n(545),c=n.n(r);o.default.use(c.a,"vac")},460:function(t,e,n){var content=n(632);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("4d6a2e0f",content,!0,{sourceMap:!1})},499:function(t,e,n){var content=n(808);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("3640b41f",content,!0,{sourceMap:!1})},500:function(t,e,n){var content=n(812);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("bf5b2022",content,!0,{sourceMap:!1})},501:function(t,e,n){var content=n(827);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("85b63e9c",content,!0,{sourceMap:!1})},502:function(t,e,n){var content=n(829);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("53e6f772",content,!0,{sourceMap:!1})},503:function(t,e,n){var content=n(831);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("a9756d18",content,!0,{sourceMap:!1})},505:function(t,e,n){var content=n(845);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("69d229c0",content,!0,{sourceMap:!1})},542:function(t,e,n){t.exports=n.p+"img/github.0035c30.png"},543:function(t){t.exports=JSON.parse('{"connect_wallet":"連接錢包","connect_to_mixin":"連接到 Mixin","nft":"NFT","deposit":"充值","withdraw":"提現","from":"從","to":"到","amount":"數量","max":"最大","add":"添加","mainnet":"主網","balance":"餘額","loading_balance":"正在加載餘額...","loading_withdrawal_fee":"正在加載提現手續費...","ethereum_mainnet":"Ethereum 主網","mvm_mainnet":"MVM 主網","unsupported_network":"不支持的网络","withdrawal_fee":"提現手續費","will_receive":"您將收到","transaction_fee":"轉賬費用","waiting_for_transaction":"等待轉賬中...","select_nft":"選擇 NFT","select_a_nft":"選擇 NFT","select_token":"選擇幣種","select_network":"選擇網絡","search_token_name":"搜索代幣名稱","search_network_name":"搜索網絡名稱","confirm_deposit":"確認充值","confirm_withdraw":"確認提現","token":"代幣","user_id":"Mixin ID","address":"地址","memo":"標籤","withdraw_to_address":"提現到地址","withdraw_to_mixin":"提現到 Mixin","transfer_with_current_wallet":"使用當前錢包轉賬","withdraw_to_current_wallet":"提現到當前地址","please_scan_qr_with_your_mixin_messenger":"請使用 Mixin Messenger 掃描二維碼，操作完成後，請稍作等待。","please_transfer_to_this_address_from_your_wallet":"請通過使用交易所或您的錢包向該地址轉賬，操作完成後，大約需要5~10分鐘到帳，請耐心等待。","please_enter_recipient_user_id":"請輸入接收者的 MixinID 或 UserID","please_enter_your_wallet_address":"請輸入您的錢包地址","optional":"選填","show_qrcode":"使用二維碼","hide_qrcode":"隱藏二維碼","insufficient_balance":"餘額不足","invalid_amount":"無效金額","minimum_amount":"最小數量: 0.0001","confirmed":"已確認","transaction_failed":"轉賬失敗","view_on_explorer":"在瀏覽器查看","close":"關閉","copy_address":"複製地址","copied":"✔️ 已複製!","disconnect":"斷開鏈接"}')},544:function(t){t.exports=JSON.parse('{"connect_wallet":"Connect Wallet","connect_to_mixin":"Connect to Mixin","nft":"NFT","deposit":"Deposit","withdraw":"Withdraw","from":"From","to":"To","amount":"Amount","max":"Max","add":"Add","mainnet":"Mainnet","balance":"Balance","loading_balance":"Loading Balance","loading_withdrawal_fee":"Loading Withdrawal Fee","ethereum_mainnet":"Ethereum Mainnet","mvm_mainnet":"MVM Mainnet","unsupported_network":"Unsupported Network","withdrawal_fee":"Withdrawal Fee","will_receive":"You will receive","transaction_fee":"Transaction Fee","waiting_for_transaction":"Waiting for transaction","select_nft":"Select NFT","select_a_nft":"Select a NFT","select_token":"Select Token","select_network":"Select Network","search_token_name":"Search token name","search_network_name":"Search network name","confirm_deposit":"Confirm Deposit","confirm_withdraw":"Confirm Withdraw","token":"Token","user_id":"Mixin ID","address":"Address","memo":"Memo","withdraw_to_address":"Withdraw to address","withdraw_to_mixin":"Withdraw to Mixin","transfer_with_current_wallet":"Pay with current wallet","withdraw_to_current_wallet":"Withdraw to current wallet","please_scan_qr_with_your_mixin_messenger":"Please scan this QR Code through your Mixin Messenger","please_transfer_to_this_address_from_your_wallet":"Please transfer to this address from exchange or your wallet, it may take 5~10 mintues to wait, please be patient.","please_enter_recipient_user_id":"Please enter recipient Mixin ID or User ID","please_enter_your_wallet_address":"Please enter your wallet address","optional":"Optional","show_qrcode":"Show QR Code","hide_qrcode":"Hide QR Code","insufficient_balance":"Insufficient Balance","invalid_amount":"Invalid Amount","minimum_amount":"Minimum Amount: 0.0001","confirmed":"Confirmed","transaction_failed":"Transaction Failed","view_on_explorer":"View On Explorer","close":"Close","copy_address":"Copy Address","copied":"✔️ copied!","disconnect":"Disconnect"}')},548:function(t,e,n){"use strict";var o=n(930),r=n(943),c=n(931),l={data:function(){return{}}},d=n(77),component=Object(d.a)(l,(function(){var t=this._self._c;return t(o.a,[t(c.a,[t(r.a,[t("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},549:function(t,e,n){"use strict";var o=n(930),r=n(941),c=n(874),l=n(943),d=n(552),f=n(931),m=n(932),h=n(33),_=(n(112),n(54),n(173)),v=n(298),w=n(252),x=n.n(w),k=n(314),C=n(388),y=n(389),M={components:{connectWallet:k.default,currentNetwork:C.default,connectedWallet:y.default},data:function(){return{bridge:x.a,isMobile:!1}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address},network:function(){return this.$store.state.network.name},connectWalletDialog:{get:function(){return this.$store.state.connectWalletDialog},set:function(t){this.$store.commit("toggleConnectWallet",t)}},currentRoute:function(){return this.$route.path}},mounted:function(){var t=this;return Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isMobile=t.checkMobile(),window.addEventListener("resize",t.checkMobile,{passive:!0}),e.next=4,t.autoConnectWallet();case 4:case"end":return e.stop()}}),e)})))()},methods:{autoConnectWallet:function(){var t=this;return Object(h.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!localStorage.getItem("connectedWallet")){e.next=8;break}if(!(n=JSON.parse(localStorage.getItem("connectedWallet")))){e.next=8;break}return t.$store.commit("setConnected",!0),e.next=7,v.a.connectWallet({autoSelect:{label:n.label,disableModals:!0}});case 7:t.$store.commit("connect",{address:_.a.utils.getAddress(n.accounts[0].address),name:"",id:"0x1"});case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},checkMobile:function(){return window.innerWidth<600}}},D=(n(830),n(77)),component=Object(D.a)(M,(function(){var t=this,e=t._self._c;return e(o.a,[e(f.a,[e(r.a,{staticClass:"px-6 bar-css",attrs:{elevation:"0",color:"#ffffff",height:"72px"}},[e("a",{attrs:{href:"/"}},[e(d.a,{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"26px","max-height":"30px"}})],1),t._v(" "),e("span",{staticClass:"font-weight-bold ml-2 logo-text"},[t._v(" MVG ")]),t._v(" "),t.isMobile?t._e():e("div",{staticClass:"ml-10 d-flex align-center",staticStyle:{height:"100%"}},[e("nuxt-link",{attrs:{to:"/"}},[e(c.a,{class:"/"===t.currentRoute?"highlighted-btn":"section-btns",attrs:{elevation:"0",color:"transparent",height:"100%"}},[t._v("\n            "+t._s(t.$t("token"))+"\n          ")])],1),t._v(" "),e("nuxt-link",{attrs:{to:"/nft"}},[e(c.a,{class:"/nft"===t.currentRoute?"highlighted-btn":"section-btns",attrs:{elevation:"0",color:"transparent",height:"100%"}},[t._v("\n            "+t._s(t.$t("nft"))+"\n          ")])],1)],1),t._v(" "),e(m.a),t._v(" "),t.connected?t._e():e("connect-wallet",{attrs:{small:!0}}),t._v(" "),t.connected&&!t.isMobile?e("current-network"):t._e(),t._v(" "),t.connected?e("connected-wallet"):t._e()],1),t._v(" "),e(l.a,{staticClass:"fill-height content py-0",staticStyle:{"background-color":"#f4f7fa"},attrs:{fluid:""}},[e("Nuxt")],1)],1)],1)}),[],!1,null,"507638ee",null);e.a=component.exports;installComponents(component,{ConnectWallet:n(314).default,CurrentNetwork:n(388).default,ConnectedWallet:n(389).default})},550:function(t,e,n){"use strict";var o=n(930),r=n(941),c=n(874),l=n(943),d=n(384),f=n(552),m=n(385),h=n(236),_=n(249),v=n(931),w=n(871),x=n(932),k=(n(54),n(33)),C=(n(112),n(542)),y=n.n(C),M=n(252),D=n.n(M),T=n(173),N={data:function(){return{bridge:D.a,githublogo:y.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Cross chain swap",to:"/mixpay"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(t){window.location.href=t},connectWallet:function(){var t=this;return Object(k.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return n=e.sent,t.register(n[0]),t.$store.commit("connect",{address:n[0]}),e.next=7,window.ethereum.request({method:"eth_chainId"});case 7:if("0x120c7"==e.sent){e.next=17;break}return e.prev=9,e.next=12,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x120c7"}]});case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(9),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[9,14]])})))()},register:function(t){var e=this;return Object(k.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=T.a.utils.getAddress(t),n.next=3,e.$axios.post("https://bridge.mvm.dev/users",{public_key:o});case 3:r=n.sent,localStorage.setItem("user",JSON.stringify(r.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},A=(n(844),n(77)),component=Object(A.a)(N,(function(){var t=this,e=t._self._c;return e(o.a,[e(v.a,[e(r.a,{attrs:{elevation:"0"}},[e(f.a,{staticClass:"ml-3",attrs:{src:t.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(e){return t.redirect("/")}}}),t._v(" "),e("span",{staticClass:"font-weight-bold ml-2",on:{click:function(e){return t.redirect("/")}}},[t._v("\n        MVM Bridge\n      ")]),t._v(" "),e(x.a),t._v(" "),e(f.a,{staticClass:"mr-3",attrs:{src:t.githublogo,"max-height":"22px","max-width":"22px"},on:{click:t.toGithub}}),t._v(" "),e(w.a,{attrs:{"offset-y":"","open-on-hover":""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[e(c.a,t._g(t._b({attrs:{"aria-haspopup":"true","aria-expanded":"false",elevation:"0",depressed:""}},"v-btn",r,!1),o),[e("span",{staticClass:"font-weight-light"},[t._v("ToolBox")]),t._v(" "),e(d.a,{staticStyle:{"font-size":"14px",height:"14px",width:"14px"}},[t._v("\n              mdi-chevron-down\n            ")])],1)]}}])},[t._v(" "),e(m.a,t._l(t.links,(function(link,i){return e(h.a,{key:i,on:{click:function(e){return t.redirect(link.to)}}},[e(_.c,[t._v("\n              "+t._s(link.name)+"\n            ")])],1)})),1)],1),t._v(" "),t.connected?t._e():e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:t.connectWallet}},[t._v("\n        Connect Wallet\n      ")]),t._v(" "),t.connected?e(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[e("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[t._v(t._s(t.address))])]):t._e()],1),t._v(" "),e(l.a,[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},587:function(t,e,n){n(588),t.exports=n(589)},631:function(t,e,n){"use strict";n(460)},632:function(t,e,n){var o=n(42)(!1);o.push([t.i,"h1[data-v-35e10596]{font-size:20px}",""]),t.exports=o},666:function(t,e){},667:function(t,e){},674:function(t,e){},675:function(t,e){},676:function(t,e){},678:function(t,e){},679:function(t,e){},680:function(t,e){},681:function(t,e){},682:function(t,e){},683:function(t,e){},684:function(t,e){},685:function(t,e){},686:function(t,e){},687:function(t,e){},688:function(t,e){},807:function(t,e,n){"use strict";n(499)},808:function(t,e,n){var o=n(42)(!1);o.push([t.i,".connect-wallet[data-v-52822987]{align-items:center;border-radius:100px!important;font-size:14px;font-weight:700;text-overflow:ellipsis;margin:0 6px;padding:0 12px}.connect-wallet[data-v-52822987]:hover{background-color:#1976d2!important}",""]),t.exports=o},811:function(t,e,n){"use strict";n(500)},812:function(t,e,n){var o=n(42)(!1);o.push([t.i,".current-network-btn{max-width:180px}",""]),t.exports=o},826:function(t,e,n){"use strict";n(501)},827:function(t,e,n){var o=n(42)(!1);o.push([t.i,".connected-dialog-address-text[data-v-6d4e0b10]{max-width:180px;font-weight:500;font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",""]),t.exports=o},828:function(t,e,n){"use strict";n(502)},829:function(t,e,n){var o=n(42)(!1);o.push([t.i,".connected-wallet{max-width:150px!important}.connected-wallet-address-text{max-width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",""]),t.exports=o},830:function(t,e,n){"use strict";n(503)},831:function(t,e,n){var o=n(42)(!1);o.push([t.i,'a[data-v-507638ee]{text-decoration:none}.section-btns[data-v-507638ee]{color:#68778d;font-weight:500!important;font-size:14px!important}.highlighted-btn[data-v-507638ee]{color:#5959d8;font-weight:600!important;font-size:14px!important}.logo-text[data-v-507638ee]{font-size:20px;font-family:"Maven Pro",sans-serif}.v-btn[data-v-507638ee]{text-transform:none!important}.bar-css[data-v-507638ee]{border-width:0 0 thin;border-style:solid;border-bottom-color:rgba(0,0,0,.12)!important}.content[data-v-507638ee]{height:calc(100vh - 72px)}',""]),t.exports=o},844:function(t,e,n){"use strict";n(505)},845:function(t,e,n){var o=n(42)(!1);o.push([t.i,".v-btn{text-transform:none!important}",""]),t.exports=o},846:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"mutations",(function(){return r}));n(54);var o=function(){return{mode:0,connected:!1,connectWalletDialog:!1,accountDialog:!1,provider:void 0,signer:void 0,userAddress:"",walletName:"",chainId:"",network:"",selectNetworkDialog:!1,fromNetwork:{},selectTokenDialog:!1,fromToken:{},confirmDepositDialog:!1,depositAddr:[],supportMetamaskNetworks:["ETH"],txSucceedDialog:!1,txFailedDialog:!1,toNetwork:{},toToken:{},confirmWithdrawDialog:!1,confirmNetworkDialog:!1,withdrawAddr:[]}},r={connect:function(t,data){t.userAddress=data.address,t.walletName=data.name,t.chainId=data.id,t.connected=!0},disconnect:function(t){t.userAddress="",t.walletName="",t.chainId="",t.connected=!1,localStorage.removeItem("connectedWallet"),localStorage.removeItem("avatar_url"),localStorage.removeItem("tokens"),localStorage.removeItem("user")},updateChainId:function(t,e){t.chainId=e},toggleConnectWallet:function(t,e){t.connectWalletDialog=e},toggleAccount:function(t,e){t.accountDialog=e},toggleSelectNetwork:function(t,e){t.selectNetworkDialog=e},toggleSelectToken:function(t,e){t.selectTokenDialog=e},toggleConfirmDeposit:function(t,e){t.confirmDepositDialog=e},toggleConfirmWithdraw:function(t,e){t.confirmWithdrawDialog=e},toggleConfirmNetwork:function(t,e){t.confirmNetworkDialog=e},toggleTxSucceedDialog:function(t,e){t.txSucceedDialog=e},toggleTxFailedDialog:function(t,e){t.txFailedDialog=e},setConnected:function(t,e){t.connected=e},setMode:function(t,data){t.mode=data},setProvider:function(t,data){t.provider=data},setSigner:function(t,data){t.signer=data},setFromNetwork:function(t,data){t.fromNetwork=data},setFromToken:function(t,data){t.fromToken=data},setToNetwork:function(t,data){t.toNetwork=data},setToToken:function(t,data){t.toToken=data},setDepositAddr:function(t,data){t.depositAddr=data},setWithdrawAddr:function(t,data){t.withdrawAddr=data}}},847:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"mutations",(function(){return r}));var o=function(){return{mixinConnected:!1,mode:0,selectNetworkDialog:!1,selectTokenDialog:!1,connectMixinDialog:!1,depositDialog:!1,fromNetwork:{},fromToken:{},nfts:{},nftsLoading:!1,nftsLoaded:!1}},r={connectMixin:function(t,e){t.mixinConnected=e},setMode:function(t,data){t.mode=data},toggleDepositDialog:function(t,e){t.depositDialog=e},toggleSelectNetwork:function(t,e){t.selectNetworkDialog=e},toggleSelectToken:function(t,e){t.selectTokenDialog=e},toggleConnectMixin:function(t,e){t.connectMixinDialog=e},setFromNetwork:function(t,data){t.fromNetwork=data},setFromToken:function(t,data){t.fromToken=data},setNFTs:function(t,data){t.nfts=data},setNFTsLoading:function(t,e){t.nftsLoading=e},setNFTsLoaded:function(t,e){t.nftsLoaded=e}}}},[[587,39,12,40]]]);