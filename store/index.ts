export const state = () => ({
  connected: false,
  network: {address: "", name: ""},
})

export const mutations = {
  connect(state: any, data:{address: string, name: string}) {
    state.network = data
    state.connected = true
    console.log(data)
  }
}
