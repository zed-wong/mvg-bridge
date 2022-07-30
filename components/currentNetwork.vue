<template>
<!-- Doesn't work for now. -->
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
  mounted() {
    this.check();
  },
  computed: {
    selectedNetwork: {
      get() {
        return this.$store.state.fromNetwork;
      },
    },
  },
  watch: {
    selectedNetwork(o, n) {
      this.check();
    },
  },
  methods: {
    check() {
      console.log(this.$store.state.chainId)
      switch (this.$store.state.chainId) {
        case '0x1':
          this.btnText = `Ethereum Mainnet`;
          this.networkIcon = 'https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128';
          return;
        case '0x120c7':
          this.btnText = `MVM Mainnet`;
          this.networkIcon = 'https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128';
          return;
        default:

      }
      this.btnText = "Unsupported Network";
      this.networkIcon = "";
      return false;
    },
  },
  watch: {
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
};
</script>

<style>
.current-network-btn {
  max-width: 180px;
}
</style>