export const state = () => ({
  connected: false,
  connectWalletDialog: false,
  network: {address: "", name: "", id: ""},
  selectNetworkDialog: false,
  fromNetwork: {},
  selectTokenDialog: false,
  fromToken: {},
  confirmDepositDialog: false,
  depositAddr: [],
  supportMetamaskNetworks: ["ETH"], //['BNB','AVAX'],

  toNetwork: {},
  toToken: {},
  confirmWithdrawDialog: false,
  withdrawAddr:[],
})

export const mutations = {
  connect(state: any, data:{address: string, name: string}) {
    state.network = data
    state.connected = true
  },
  toggleConnectWallet(state: any, open: boolean) {
    state.connectWalletDialog = open
  },
  toggleSelectNetwork(state: any, open: boolean) {
    state.selectNetworkDialog = open
  },
  toggleSelectToken(state: any, open: boolean) {
    state.selectTokenDialog = open
  },
  toggleConfirmDeposit(state: any, open: boolean) {
    state.confirmDepositDialog = open
  },
  toggleConfirmWithdraw(state: any, open: boolean) {
    state.confirmWithdrawDialog = open
  },
  setFromNetwork(state: any, data: {}) {
    state.fromNetwork = data
  },
  setFromToken(state: any, data: {}) {
    state.fromToken = data
  },
  setToNetwork(state: any, data: {}) {
    state.toNetwork = data
  },
  setToToken(state: any, data: {}) {
    state.toToken = data
  },
  setDepositAddr(state: any, data: []) {
    state.depositAddr = data
  },
  setWithdrawAddr(state: any, data: []) {
    state.withdrawAddr = data
  },
}
