export const state = () => ({
  connected: false,
  address: '',
})

export const mutations = {
  connect(state, addr) {
    state.connected = true
    state.address = addr
  }
}