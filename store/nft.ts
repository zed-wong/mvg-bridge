export const state = () => ({
  mixinConnected: false,
  mode: 0,
  selectFromNetworkDialog: false,
  selectFromTokenDialog: false,
  selectToNetworkDialog: false,
  selectToTokenDialog: false,
  connectMixinDialog: false,
  depositDialog: false,
  withdrawDialog: false,
  fromNetwork: {},
  fromToken: {},
  toNetwork: {},
  toToken: {},
  nfts: {},
  withdrawNfts: [],
  nftsLoading: false,
  nftsLoaded: false,
  withdrawNftsLoaded: false,
})

export const mutations = {
  connectMixin(nft: any, connected: boolean){
    nft.mixinConnected = connected
  },
  setMode(state: any, data: number) {
    state.mode = data
  },
  toggleDepositDialog(state: any, open: boolean) {
    state.depositDialog = open
  },
  toggleWithdrawDialog(state: any, open: boolean) {
    state.withdrawDialog = open
  },
  toggleSelectNetwork(state: any, open: boolean) {
    state.selectFromNetworkDialog = open
  },
  toggleSelectToken(state: any, open: boolean) {
    state.selectFromTokenDialog = open
  },
  toggleSelectToNetwork(state: any, open: boolean) {
    state.selectToNetworkDialog = open
  },
  toggleSelectToToken(state: any, open: boolean) {
    state.selectToTokenDialog = open
  },
  toggleConnectMixin(state: any, open: boolean) {
    state.connectMixinDialog = open
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
  setNFTs(state: any, data: {}) {
    state.nfts = data
  },
  setWithdrawNFTs(state: any, data: []) {
    state.withdrawNfts = data
  },
  setNFTsLoading(state: any, open: boolean) {
    state.nftsLoading = open
  },
  setNFTsLoaded(state: any, open: boolean) {
    state.nftsLoaded = open
  },
  setWithdrawNftsLoaded(state: any, open: boolean) {
    state.nftsLoaded = open
  },
}