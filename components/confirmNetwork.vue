<template>
  <v-dialog
    v-model="confirmNetwork"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">Switch Network</h1>
          <v-spacer />
          <v-btn icon @click="confirmNetwork = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0">

        </v-col>

        <v-col>
          <v-btn
            block
            x-large
            elevation="0"
            class="metamask-pay-btn mt-4"
            @click="switchNetwork"
          >
            <span class="ml-1"> Switch</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { useOnboard } from '@web3-onboard/vue'
import { number } from 'mathjs';
export default {
  data() {
    return {
    };
  },
  props: ["type"],
  computed: {
    confirmNetwork: {
      get() {
        return this.$store.state.confirmNetworkDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmNetwork", value);
      },
    },
    selectedNetwork() {
      return this.$store.state.toNetwork;
    },
    supportsMetamask: {
      get() {
        if (!this.$store.state.supportMetamaskNetworks.includes( this.selectedNetwork.symbol )){
          return false
        }
        return true
      },
    },
  },
  methods: {
    async switchNetwork(){
      let chainID;
      const { setChain } = useOnboard()
      if(this.type == 'deposit') {
        if (!supportsMetamask) return;
        if (!this.selectedNetwork.evm_chain_id) return;
        chainID = number(this.selectedNetwork.evm_chain_id).toString(16);
      }
      if(this.type == 'withdraw') {
        chainID = '0x120C7'
      }
      try{
        console.log(chainID)
        await setChain({chainNamespace:'evm',chainId:chainID})
      } catch(error) {
        console.log(error)
      }
    }
  }
};
</script>