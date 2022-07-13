export const state = () => ({
  connected: false,
  network: {address: "", name: ""},
  selectNetworkDialog: false,
  fromNetwork: {},
})

export const mutations = {
  connect(state: any, data:{address: string, name: string}) {
    state.network = data
    state.connected = true
    console.log(data)
  },
  toggleSelectNetwork(state: any, open: boolean) {
    state.selectNetworkDialog = open
  },
  setFromNetwork(state: any, data: {}) {
    state.fromNetwork = data
    console.log(data)
  }
}
