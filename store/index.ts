export const state = () => ({
  mode: 0,
  connected: false,
  connectWalletDialog: false,
  provider: undefined,
  signer: undefined,
  
  userAddress: "",
  networkName: "",
  chainId: "",

  network: "",

  selectNetworkDialog: false,
  fromNetwork: {},
  selectTokenDialog: false,
  fromToken: {},
  confirmDepositDialog: false,
  depositAddr: [],
  supportMetamaskNetworks: ["ETH"], //['BNB','AVAX'],
  txSucceedDialog: false,
  txFailedDialog: false,

  toNetwork: {},
  toToken: {},
  confirmWithdrawDialog: false,
  confirmNetworkDialog: false,
  withdrawAddr:[],
})

export const mutations = {
  connect(state: any, data:{address: string, name: string, id: string}) {
    state.userAddress = data.address
    state.networkName = data.name
    state.chainId = data.id
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
  toggleConfirmNetwork(state: any, open: boolean) {
    state.confirmNetworkDialog = open
  },
  toggleTxSucceedDialog(state: any, open: boolean) {
    state.txSucceedDialog = open
  },
  toggleTxFailedDialog(state: any, open: boolean) {
    state.txFailedDialog = open
  },
  setMode(state: any, data: number) {
    state.mode = data
  },
  setProvider(state: any, data: any) {
    state.provider = data
  },
  setSigner(state: any, data: any) {
    state.signer = data
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
