<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="px-6 bar-css"
        height="72px"
      >
        <a href="https://scan.mvm.dev">
          <v-img
            :src="bridge"
            max-width="26px"
            max-height="30px"
            class="ml-3"
          />
        </a>
        <span class="font-weight-bold ml-2 logo-text"> MVG </span>
        <v-spacer />
        <connect-wallet :small="true" v-if="!connected" />
        <current-network v-if="connected && !isMobile" />
        <connected-wallet v-if="connected" />
      </v-app-bar>
      <v-container
        fluid
        class="fill-height content py-0"
        style="background-color: #f4f7fa"
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import bridge from "../static/bridge.png";
import connectWallet from "../components/connectWallet.vue";
import currentNetwork from "../components/currentNetwork.vue";
import connectedWallet from "../components/connectedWallet.vue";

export default {
  components: {
    connectWallet,
    currentNetwork,
    connectedWallet,
  },
  data() {
    return {
      bridge,
      isMobile: false,
    };
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    address() {
      return this.$store.state.network.address;
    },
    network() {
      return this.$store.state.network.name;
    },
    connectWalletDialog: {
      get() {
        return this.$store.state.connectWalletDialog;
      },
      set(value) {
        this.$store.commit("toggleConnectWallet", value);
      },
    },
  },
  mounted() {
    this.isMobile = this.checkMobile();
    window.addEventListener("resize", this.checkMobile, { passive: true });
  },
  methods: {
    checkMobile() {
      return window.innerWidth < 600;
    },
  },
};
</script>

<style>
.logo-text {
  font-size: 18px;
  font-family: "Maven Pro", sans-serif;
}
.v-btn {
  text-transform: none !important;
}
.connect-wallet {
  align-items: center;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  margin: 0 6px;
  padding: 0 12px;
}
.connect-wallet:hover {
  background-color: #1976d2 !important;
}
.bar-css {
  border-width: 0 0 thin;
  border-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
.content {
  height: calc(100vh - 72px);
}
</style>