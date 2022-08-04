<template>
  <v-btn
    height="40px"
    elevation="0"
    rounded
    color="#f4f7fa"
    class="ml-3 current-network-btn"
  >
    <v-avatar size="24" class="mr-2" v-if="networkIcon">
      <v-img :src="networkIcon" />
    </v-avatar>
    <span class=""> {{ btnText }} </span>
  </v-btn>
</template>

<script>
import { ethers } from "ethers";
import { useOnboard } from "@web3-onboard/vue";

export default {
  data() {
    return {
      btnText: "",
      networkIcon: "",
    };
  },
  computed: {
    fromNetwork() {
      return this.$store.state.fromNetwork;
    },
    toNetwork() {
      return this.$store.state.toNetwork;
    },
    fromToken() {
      return this.$store.state.fromToken;
    },
    toToken() {
      return this.$store.state.toToken;
    },
  },
  async mounted() {
    await this.check();
  },
  watch: {
    fromNetwork(o, n) {
      this.check();
    },
    toNetwork(o, n) {
      this.check();
    },
    fromToken(o, n) {
      this.check();
    },
    toToken(o, n) {
      this.check();
    },
    connected(o, n) {
      const { connectedWallet } = useOnboard();
      if (connectedWallet.value == null) return;
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      provider.on("network", (o, n) => {
        if (o) {
          window.location.reload();
        }
      });
    },
  },
  methods: {
    async check() {
      await this.sleep(200);
      const { connectedChain } = useOnboard();
      const network_id = connectedChain.value?.id;
      switch (network_id) {
        case "0x1":
          this.btnText = `Ethereum Mainnet`;
          this.networkIcon =
            "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128";
          return;
        case "0x120c7":
          this.btnText = `MVM Mainnet`;
          this.networkIcon = "https://mvm.dev/logo.svg";
          return;
      }
      this.btnText = "Unsupported Network";
      this.networkIcon = "";
      return false;
    },
    loopCheck() {
      setTimeout(this.check(), 3000);
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style>
.current-network-btn {
  max-width: 180px;
}
</style>