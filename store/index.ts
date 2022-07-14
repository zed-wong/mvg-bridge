export const state = () => ({
  connected: false,
  network: {address: "", name: ""},
  selectNetworkDialog: false,
  fromNetwork: {},
  selectTokenDialog: false,
  fromToken: {},
})

export const mutations = {
  connect(state: any, data:{address: string, name: string}) {
    state.network = data
    state.connected = true
  },
  toggleSelectNetwork(state: any, open: boolean) {
    state.selectNetworkDialog = open
  },
  toggleSelectToken(state: any, open: boolean) {
    state.selectTokenDialog = open
  },
  setFromNetwork(state: any, data: {}) {
    state.fromNetwork = data
  },
  setFromToken(state: any, data: {}) {
    state.fromToken = data
  }
}
