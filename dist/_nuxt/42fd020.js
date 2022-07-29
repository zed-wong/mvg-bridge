(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{151:function(e,t,n){"use strict";var o=n(909),r={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(n(624),n(107)),component=Object(c.a)(r,(function(){var e=this,t=e._self._c;return t(o.a,{attrs:{dark:""}},[404===e.error.statusCode?t("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):t("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),t("NuxtLink",{attrs:{to:"/"}},[e._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);t.a=component.exports},247:function(e,t,n){e.exports=n.p+"img/bridge.45e32e8.png"},292:function(e,t,n){e.exports=n.p+"img/github.0035c30.png"},305:function(e,t,n){"use strict";n.r(t);var o=n(853),r=(n(336),n(244)),c=n(479),l=n(170),d={props:["small","huge"],methods:{async connect(){try{await c.a.connectWallet();const{connectedChain:t,connectedWallet:n}=Object(r.b)();if(n.value){var e=[];let o=JSON.stringify(n.value,(function(t,n){if(null!=n&&"object"==typeof n){if(e.indexOf(n)>=0)return;e.push(n)}return n}));localStorage.setItem("connectedWallet",o);const r=new l.a.providers.Web3Provider(n.value.provider,"any").getSigner(),c=await r.getAddress(),d=l.a.utils.getAddress(c);await this.register(c),this.$store.commit("connect",{address:d,name:"",id:t.value.id})}}catch(e){console.log(e)}},async register(e){const t=l.a.utils.getAddress(e),n=await this.$axios.post("https://bridge.mvm.dev/users",{public_key:t});localStorage.setItem("user",JSON.stringify(n.data.user.key))}}},f=(n(800),n(107)),component=Object(f.a)(d,(function(){var e=this,t=e._self._c;return t("div",[e.small?t(o.a,{staticClass:"ml-3 connect-wallet",attrs:{height:"40px",elevation:"0",color:"#5959d8"},on:{click:e.connect}},[t("span",{staticStyle:{color:"white"}},[e._v(" "+e._s(e.$t("connect_wallet")))])]):e._e(),e._v(" "),e.huge?t(o.a,{staticClass:"border-rounded main-btn white--text",attrs:{block:"","x-large":"",depressed:"",elevation:"0",color:"#5959d8"},on:{click:e.connect}},[t("span",[e._v(" "+e._s(e.$t("connect_wallet"))+" ")])]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},371:function(e,t,n){"use strict";var o=n(7),r=n(522),c=n.n(r);o.default.use(c.a,"vac")},439:function(e,t,n){var content=n(625);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(52).default)("4d6a2e0f",content,!0,{sourceMap:!1})},479:function(e,t,n){"use strict";n.d(t,"a",(function(){return _}));var o=n(244),r=n(528),c=n(518),l=n(519),d=Object(c.a)(),f=Object(l.a)(),m=[Object(r.a)(),f,d],h="https://mainnet.infura.io/v3/".concat("926b17d7967649a999ef0a55089d8fda"),_=Object(o.a)({wallets:m,chains:[{id:"0x1",token:"ETH",namespace:"evm",label:"Ethereum Mainnet",rpcUrl:h,blockExplorerUrl:"https://etherscan.io/"},{id:"0x120C7",namespace:"evm",token:"XIN",label:"MVM Mainnet",rpcUrl:"https://geth.mvm.dev/",blockExplorerUrl:"https://scan.mvm.dev/"}],appMetadata:{name:"MVG",description:"Mixin Virtual Machine Bridge",icon:"https://mvm.dev/logo.svg",logo:"https://mvm.dev/logo.svg",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"Coinbase",url:"https://wallet.coinbase.com/"}]},i18n:{en:{connect:{selectingWallet:{header:"Available Wallets",sidebar:{heading:"Welcome",subheading:"Connect your wallet",paragraph:"Connecting your wallet to MVG to bridge your asset from any network into MVM mainnet or withdraw from MVM mainnet to any network."}}}},zh:{connect:{selectingWallet:{header:"已支持的錢包",sidebar:{heading:"歡迎",subheading:"連接錢包",paragraph:"通過連接您的錢包，以完成在MVM主網的充值與提現。\nMVG現已支持Mixin主網排名前100的幣種和所有網絡。"}},connectingWallet:{sidebar:{subheading:"授權連接",paragraph:"請在您的錢包中授權連接，以繼續操作。"},mainText:"連接中...",paragraph:"請確保勾選中您想要授權的錢包地址。",rejectedText:"連接已被取消!",rejectedCTA:"點我重試",primaryButton:"回到錢包列表"},connectedWallet:{header:"連接成功",sidebar:{subheading:"連接成功!",paragraph:"您的錢包已連接至 {app}"},mainText:"已連接"}},modals:{actionRequired:{heading:"操作需要在 {wallet} 完成",paragraph:"請切換到您錢包中的活躍賬戶.",linkText:"瞭解更多.",buttonText:"Okay"},switchChain:{heading:"切換網絡",paragraph1:"{app} 需要您在您的錢包中切換到 {nextNetworkName} 網絡以繼續。",paragraph2:"*某些錢包可能不支持切換網絡. 如您不能切換網絡，您可能需要考慮更換一個能夠切換網絡的錢包。"},confirmDisconnectAll:{heading:"斷開所有連接",description:"您確定要斷開所有錢包的連接嗎？",confirm:"確定",cancel:"取消"}},accountCenter:{connectAnotherWallet:"連接另一個錢包",disconnectAllWallets:"斷開所有連接",currentNetwork:"當前網絡",appInfo:"App 信息",learnMore:"瞭解更多",gettingStartedGuide:"快速開始教程",smartContracts:"智能合約",explore:"探索",backToApp:"回到 dapp",poweredBy:"Powered by",addAccount:"添加賬戶",setPrimaryAccount:"設置主要賬戶",disconnectWallet:"斷開當前連接",copyAddress:"複製錢包地址"}}}})},480:function(e,t,n){var content=n(801);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(52).default)("99611256",content,!0,{sourceMap:!1})},481:function(e,t,n){var content=n(803);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(52).default)("2eace2da",content,!0,{sourceMap:!1})},483:function(e,t,n){var content=n(821);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(52).default)("69d229c0",content,!0,{sourceMap:!1})},520:function(e){e.exports=JSON.parse('{"connect_wallet":"連接錢包","deposit":"充值","withdraw":"提現","from":"來自","to":"到達","amount":"數量","max":"最大","add":"添加","mainnet":"主網","balance":"餘額","loading_balance":"正在加載餘額...","loading_withdrawal_fee":"正在加載提現手續費...","mvm_mainnet":"MVM 主網","withdrawal_fee":"提現手續費","will_receive":"您將收到","select_token":"選擇幣種","select_network":"選擇網絡","search_token_name":"搜索代幣名稱","search_network_name":"搜索網絡名稱","confirm_deposit":"確認充值","confirm_withdraw":"確認提現","token":"代幣","user_id":"Mixin ID","address":"地址","memo":"標籤","withdraw_to_address":"提現到地址","withdraw_to_mixin":"提現到 Mixin","transfer_with_current_wallet":"使用當前錢包轉賬","withdraw_to_current_wallet":"提現到當前地址","please_scan_qr_with_your_mixin_messenger":"請使用 Mixin Messenger 掃描二維碼，操作完成後，請稍作等待。","please_transfer_to_this_address_from_your_wallet":"請通過使用交易所或您的錢包向該地址轉賬，操作完成後，大約需要5~10分鐘到帳，請耐心等待。","please_enter_recipient_user_id":"請輸入接收者的 MixinID 或 UserID","please_enter_your_wallet_address":"請輸入您的錢包地址","optional":"選填","show_qrcode":"使用二維碼","hide_qrcode":"隱藏二維碼","insufficient_balance":"餘額不足","invalid_amount":"無效金額","minimum_amount":"最小數量: 0.0001","confirmed":"已確認","transaction_failed":"轉賬失敗","view_on_explorer":"在瀏覽器查看","close":"關閉"}')},521:function(e){e.exports=JSON.parse('{"connect_wallet":"Connect Wallet","deposit":"Deposit","withdraw":"Withdraw","from":"From","to":"To","amount":"Amount","max":"Max","add":"Add","mainnet":"Mainnet","balance":"Balance","loading_balance":"Loading Balance","loading_withdrawal_fee":"Loading Withdrawal Fee","mvm_mainnet":"MVM Mainnet","withdrawal_fee":"Withdrawal Fee","will_receive":"You will receive","select_token":"Select Token","select_network":"Select Network","search_token_name":"Search token name","search_network_name":"Search network name","confirm_deposit":"Confirm Deposit","confirm_withdraw":"Confirm Withdraw","token":"Token","user_id":"Mixin ID","address":"Address","memo":"Memo","withdraw_to_address":"Withdraw to address","withdraw_to_mixin":"Withdraw to Mixin","transfer_with_current_wallet":"Pay with current wallet","withdraw_to_current_wallet":"Withdraw to current wallet","please_scan_qr_with_your_mixin_messenger":"Please scan this QR Code through your Mixin Messenger","please_transfer_to_this_address_from_your_wallet":"Please transfer to this address from exchange or your wallet, it may take 5~10 mintues to wait, please be patient.","please_enter_recipient_user_id":"Please enter recipient Mixin ID or User ID","please_enter_your_wallet_address":"Please enter your wallet address","optional":"Optional","show_qrcode":"Show QR Code","hide_qrcode":"Hide QR Code","insufficient_balance":"Insufficient Balance","invalid_amount":"Invalid Amount","minimum_amount":"Minimum Amount: 0.0001","confirmed":"Confirmed","transaction_failed":"Transaction Failed","view_on_explorer":"View On Explorer","close":"Close"}')},525:function(e,t,n){"use strict";var o=n(909),r=n(918),c=n(910),l={data:function(){return{}}},d=n(107),component=Object(d.a)(l,(function(){var e=this._self._c;return e(o.a,[e(c.a,[e(r.a,[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports},526:function(e,t,n){"use strict";var o=n(909),r=n(917),c=n(918),l=n(529),d=n(910),f=n(911),m=(n(54),n(247)),h=n.n(m),_=n(292),w=n.n(_),v={components:{connectWallet:n(305).default},data:function(){return{bridge:h.a,githublogo:w.a,isMobile:!1}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address},network:function(){return this.$store.state.network.name},connectWalletDialog:{get:function(){return this.$store.state.connectWalletDialog},set:function(e){this.$store.commit("toggleConnectWallet",e)}}},mounted:function(){this.isMobile=this.checkMobile(),window.addEventListener("resize",this.checkMobile,{passive:!0})},methods:{redirect:function(e){window.location.href=e},checkMobile:function(){return window.innerWidth<600},getAvatar:function(e){if(localStorage.getItem("avatar_url"))return localStorage.getItem("avatar_url");for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=n.length,i=0;i<e;i++)t+=n.charAt(Math.floor(Math.random()*o));var r="https://avatars.dicebear.com/api/identicon/"+t+".png";return localStorage.setItem("avatar_url",r),r}}},x=(n(802),n(107)),component=Object(x.a)(v,(function(){var e=this,t=e._self._c;return t(o.a,[t(d.a,[t(r.a,{staticClass:"px-6 bar-css",attrs:{elevation:"0",color:"#ffffff",height:"90px"}},[t(l.a,{staticClass:"ml-3",attrs:{src:e.bridge,"max-width":"30px","max-height":"33px"},on:{click:function(t){return e.redirect("https://scan.mvm.dev")}}}),e._v(" "),t("span",{staticClass:"font-weight-bold ml-4",staticStyle:{"font-size":"22px"},on:{click:function(t){return e.redirect("https://scan.mvm.dev")}}},[e._v("\n        MVG\n      ")]),e._v(" "),t(f.a),e._v(" "),e.connected?e._e():t("connect-wallet",{attrs:{small:!0}})],1),e._v(" "),t(c.a,{staticClass:"fill-height content py-0",staticStyle:{"background-color":"#f4f7fa"},attrs:{fluid:""}},[t("Nuxt")],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{ConnectWallet:n(305).default})},527:function(e,t,n){"use strict";var o=n(909),r=n(917),c=n(853),l=n(918),d=n(360),f=n(529),m=n(361),h=n(229),_=n(243),w=n(910),v=n(851),x=n(911),k=(n(54),n(42)),y=(n(130),n(292)),M=n.n(y),C=n(247),W=n.n(C),D=n(170),A={data:function(){return{bridge:W.a,githublogo:M.a,links:[{name:"Register",to:"/register"},{name:"Deposit",to:"/deposit"},{name:"Withdraw",to:"/withdraw"},{name:"Query",to:"/query"},{name:"Add Token",to:"/addtoken"},{name:"Deposit By Address",to:"/anydeposit"},{name:"Cross chain swap",to:"/mixpay"}]}},computed:{connected:function(){return this.$store.state.connected},address:function(){return this.$store.state.network.address}},mounted:function(){this.connectWallet()},methods:{redirect:function(e){window.location.href=e},connectWallet:function(){var e=this;return Object(k.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return n=t.sent,e.register(n[0]),e.$store.commit("connect",{address:n[0]}),t.next=7,window.ethereum.request({method:"eth_chainId"});case 7:if("0x120c7"==t.sent){t.next=17;break}return t.prev=9,t.next=12,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x120c7"}]});case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(9),console.log(t.t0);case 17:case"end":return t.stop()}}),t,null,[[9,14]])})))()},register:function(e){var t=this;return Object(k.a)(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=D.a.utils.getAddress(e),n.next=3,t.$axios.post("https://bridge.mvm.dev/users",{public_key:o});case 3:r=n.sent,localStorage.setItem("user",JSON.stringify(r.data.user.key));case 5:case"end":return n.stop()}}),n)})))()},toGithub:function(){window.open("https://github.com/zed-wong/zed-wong.github.io")}}},N=(n(820),n(107)),component=Object(N.a)(A,(function(){var e=this,t=e._self._c;return t(o.a,[t(w.a,[t(r.a,{attrs:{elevation:"0"}},[t(f.a,{staticClass:"ml-3",attrs:{src:e.bridge,"max-width":"28px","max-height":"28px"},on:{click:function(t){return e.redirect("/")}}}),e._v(" "),t("span",{staticClass:"font-weight-bold ml-2",on:{click:function(t){return e.redirect("/")}}},[e._v("\n        MVM Bridge\n      ")]),e._v(" "),t(x.a),e._v(" "),t(f.a,{staticClass:"mr-3",attrs:{src:e.githublogo,"max-height":"22px","max-width":"22px"},on:{click:e.toGithub}}),e._v(" "),t(v.a,{attrs:{"offset-y":"","open-on-hover":""},scopedSlots:e._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[t(c.a,e._g(e._b({attrs:{"aria-haspopup":"true","aria-expanded":"false",elevation:"0",depressed:""}},"v-btn",r,!1),o),[t("span",{staticClass:"font-weight-light"},[e._v("ToolBox")]),e._v(" "),t(d.a,{staticStyle:{"font-size":"14px",height:"14px",width:"14px"}},[e._v("\n              mdi-chevron-down\n            ")])],1)]}}])},[e._v(" "),t(m.a,e._l(e.links,(function(link,i){return t(h.a,{key:i,on:{click:function(t){return e.redirect(link.to)}}},[t(_.c,[e._v("\n              "+e._s(link.name)+"\n            ")])],1)})),1)],1),e._v(" "),e.connected?e._e():t(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary"},on:{click:e.connectWallet}},[e._v("\n        Connect Wallet\n      ")]),e._v(" "),e.connected?t(c.a,{staticClass:"ml-3",attrs:{depressed:"",rounded:"",outlined:"",elevation:"0",color:"primary",text:"","max-width":150}},[t("span",{staticClass:"text-truncate",staticStyle:{"max-width":"120px"}},[e._v(e._s(e.address))])]):e._e()],1),e._v(" "),t(l.a,[t("Nuxt")],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports},580:function(e,t,n){n(581),e.exports=n(582)},624:function(e,t,n){"use strict";n(439)},625:function(e,t,n){var o=n(51)(!1);o.push([e.i,"h1[data-v-35e10596]{font-size:20px}",""]),e.exports=o},659:function(e,t){},660:function(e,t){},667:function(e,t){},668:function(e,t){},669:function(e,t){},671:function(e,t){},672:function(e,t){},673:function(e,t){},674:function(e,t){},675:function(e,t){},676:function(e,t){},677:function(e,t){},678:function(e,t){},679:function(e,t){},680:function(e,t){},681:function(e,t){},800:function(e,t,n){"use strict";n(480)},801:function(e,t,n){var o=n(51)(!1);o.push([e.i,"",""]),e.exports=o},802:function(e,t,n){"use strict";n(481)},803:function(e,t,n){var o=n(51)(!1);o.push([e.i,".v-btn{text-transform:none!important}.connect-wallet{align-items:center;border-radius:100px;font-size:14px;font-weight:700;text-overflow:ellipsis;margin:0 6px;padding:0 12px}.connect-wallet:hover{background-color:#1976d2!important}.bar-css{border-width:0 0 thin;border-style:solid;border-bottom-color:rgba(0,0,0,.12)!important}.content{height:calc(100vh - 90px)}",""]),e.exports=o},820:function(e,t,n){"use strict";n(483)},821:function(e,t,n){var o=n(51)(!1);o.push([e.i,".v-btn{text-transform:none!important}",""]),e.exports=o},822:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return o})),n.d(t,"mutations",(function(){return r}));n(54);var o=function(){return{mode:0,connected:!1,connectWalletDialog:!1,provider:void 0,signer:void 0,userAddress:"",networkName:"",chainId:"",network:"",selectNetworkDialog:!1,fromNetwork:{},selectTokenDialog:!1,fromToken:{},confirmDepositDialog:!1,depositAddr:[],supportMetamaskNetworks:["ETH"],txSucceedDialog:!1,txFailedDialog:!1,toNetwork:{},toToken:{},confirmWithdrawDialog:!1,confirmNetworkDialog:!1,withdrawAddr:[]}},r={connect:function(e,data){e.userAddress=data.address,e.networkName=data.name,e.chainId=data.id,e.connected=!0},toggleConnectWallet:function(e,t){e.connectWalletDialog=t},toggleSelectNetwork:function(e,t){e.selectNetworkDialog=t},toggleSelectToken:function(e,t){e.selectTokenDialog=t},toggleConfirmDeposit:function(e,t){e.confirmDepositDialog=t},toggleConfirmWithdraw:function(e,t){e.confirmWithdrawDialog=t},toggleConfirmNetwork:function(e,t){e.confirmNetworkDialog=t},toggleTxSucceedDialog:function(e,t){e.txSucceedDialog=t},toggleTxFailedDialog:function(e,t){e.txFailedDialog=t},setConnected:function(e,t){e.connected=t},setMode:function(e,data){e.mode=data},setProvider:function(e,data){e.provider=data},setSigner:function(e,data){e.signer=data},setFromNetwork:function(e,data){e.fromNetwork=data},setFromToken:function(e,data){e.fromToken=data},setToNetwork:function(e,data){e.toNetwork=data},setToToken:function(e,data){e.toToken=data},setDepositAddr:function(e,data){e.depositAddr=data},setWithdrawAddr:function(e,data){e.withdrawAddr=data}}}},[[580,40,12,41]]]);