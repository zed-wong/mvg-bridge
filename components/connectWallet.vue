<template>
  <div>
    <v-btn
      height="40px"
      elevation="0"
      color="#5959d8"
      v-if="small"
      class="ml-3 connect-wallet"
      @click="connect"
    >
      <span style="color: white"> Connect Wallet</span>
    </v-btn>
    <v-btn
      block
      x-large
      depressed
      elevation="0"
      color="#5959d8"
      v-if="huge"
      @click="connect"
      class="border-rounded main-btn white--text"
    >
      <span> Connect Wallet </span>
    </v-btn>
  </div>
</template>

<script lang="">
import { useOnboard } from "@web3-onboard/vue";
import { web3Onboard } from "../helpers/web3onboard";
import { ethers } from "ethers";

export default {
  props: ["small", "huge"],
  methods: {
    async connect() {
      try {
        await web3Onboard.connectWallet();
        const {
          wallets,
          connectWallet,
          disconnectConnectedWallet,
          connectedChain,
          connectedWallet,
        } = useOnboard();
        if (connectedWallet) {
          const provider = new ethers.providers.Web3Provider(
            connectedWallet.value.provider,
            "any"
          );
          const signer = provider.getSigner();
          const userAddr = await signer.getAddress();
          const userAddress = ethers.utils.getAddress(userAddr)
          await this.register(userAddr);
          
          this.$store.commit("connect", { address: userAddress, name: "", id: connectedChain.value.id});

          // Use in other component
          // import { useOnboard } from "@web3-onboard/vue";
          // const { connectedWallet } = useOnboard();
          // const provider = new ethers.providers.Web3Provider(connectedWallet.value.provider, "any")
          // const signer = provider.getSigner()
        }
      } catch (error) {
        console.log(error);
      }
      return;
    },

    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
    },
  },
};
</script>

<style>

/* .connect-text {
  color: var(--input-text-color);
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  margin: 0 0 32px;
  text-align: center;
}
.item {
  min-height: 64px;
  max-height: 600px;
}
.item:not(:last-child) {
  border-bottom: 1px solid #cbd5e0;
}
.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
}
.group-border {
  border: 1px solid #cbd5e0;
  border-radius: 12px;
} */
</style>