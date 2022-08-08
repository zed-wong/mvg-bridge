export const state = () => ({
  mixinConnected: false,
  mode: 0,
  selectNetworkDialog: false,
  selectTokenDialog: false,
  connectMixinDialog: false,
  depositDialog: false,
  fromNetwork: {},
  fromToken: {},
  nfts: {},
  nftsLoading: false,
  nftsLoaded: false,
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
  toggleSelectNetwork(state: any, open: boolean) {
    state.selectNetworkDialog = open
  },
  toggleSelectToken(state: any, open: boolean) {
    state.selectTokenDialog = open
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
  setNFTs(state: any, data: {}) {
    state.nfts = data
  },
  setNFTsLoading(state: any, open: boolean) {
    state.nftsLoading = open
  },
  setNFTsLoaded(state: any, open: boolean) {
    state.nftsLoaded = open
  },
}