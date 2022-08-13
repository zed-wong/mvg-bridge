<template>
  <v-tooltip bottom v-if="networkIcon">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        height="40px"
        elevation="0"
        rounded
        color="#f4f7fa"
        class="ml-3 current-network-btn"
        @click="detect"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-2" v-if="alertRed" color="red"> mdi-alert </v-icon>
        <v-avatar size="24" class="mr-2" v-else>
          <v-img :src="networkIcon" />
        </v-avatar>
        <span> {{ btnText }} </span>
      </v-btn>
    </template>
    <span v-if="matters"> {{ $t("make_sure_mvm_when_withdrawing") }} </span>
    <span v-else> {{ $t("current_connected_network") }} </span>
  </v-tooltip>
</template>

<script>
import { useOnboard } from "@web3-onboard/vue";

export default {
  data() {
    return {
      btnText: "",
      networkIcon: "",
      alertRed: false,
    };
  },
  computed: {
    confirmDepositDialog() {
      return this.$store.state.confirmDepositDialog;
    },
    connectedChain() {
      return this.$store.state.chainId;
    },
    connected() {
      return this.$store.state.connected;
    },
    tokenMode() {
      return this.$store.state.mode;
    },
    nftMode() {
      return this.$store.state.nft.mode;
    },
    currentRoute() {
      return this.$route.path;
    },
    matters() {
      if (this.tokenMode === 1) {
        if (this.currentRoute === "/") return true;
      }
      if (this.nftMode === 1) {
        if (this.currentRoute === "/nft") return true;
      }
      return false;
    },
  },
  watch: {
    confirmDepositDialog(o, n) {
      this.check();
    },
    connectedChain() {
      this.check();
    },
    connected() {
      this.check();
    },
    tokenMode() {
      this.check();
    },
    nftMode() {
      this.check();
    },
    currentRoute() {
      this.check();
    },
  },
  methods: {
    async check() {
      let network_id;
      if (!this.connectedChain) {
        const { connectedChain } = useOnboard();
        network_id = connectedChain.value?.id;
        this.$store.commit("updateChainId", network_id);
      } else {
        network_id = this.connectedChain;
      }
      this.alertWhenMatters(network_id);
      switch (network_id) {
        case "0x1":
          this.btnText = this.$t("ethereum_mainnet");
          this.networkIcon =
            "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128";
          return;
        case "0x120c7":
          this.btnText = this.$t("mvm_mainnet");
          this.networkIcon = "https://mvm.dev/logo.svg";
          return;
      }
      this.btnText = this.$t("unsupported_network");
      this.networkIcon = "";
      return false;
    },
    alertWhenMatters(network_id) {
      if (network_id != "0x120c7") {
        if (this.matters) {
          this.alertRed = true;
        } else {
          this.alertRed = false;
        }
      } else {
        this.alertRed = false;
      }
    },
    switchToMVM() {
      const { connectedWallet, setChain } = useOnboard();
      if (connectedWallet) {
        setChain({ wallet: connectedWallet.value.label, chainId: "0x120c7" });
      }
    },
    detect() {
      if (this.matters) {
        this.switchToMVM();
      } else {
        this.check();
      }
    },
  },
};
</script>

<style>
.current-network-btn {
  max-width: 180px;
}
</style>