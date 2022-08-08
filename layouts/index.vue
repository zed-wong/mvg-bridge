<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="px-6 bar-css"
        height="72px"
      >
        <a href="/">
          <v-img
            :src="bridge"
            max-width="26px"
            max-height="30px"
            class="ml-3"
          />
        </a>
        <span class="font-weight-bold ml-2 logo-text"> MVG </span>
        <div
          v-if="!isMobile"
          class="ml-10 d-flex align-center"
          style="height: 100%"
        >
          <nuxt-link to="/">
            <v-btn
              elevation="0"
              :class="currentRoute === '/' ? 'highlighted-btn' : 'section-btns'"
              color="transparent"
              height="100%"
            >
              {{ $t("token") }}
            </v-btn>
          </nuxt-link>
          <nuxt-link to="/nft">
            <v-btn
              elevation="0"
              :class="
                currentRoute === '/nft' ? 'highlighted-btn' : 'section-btns'
              "
              color="transparent"
              height="100%"
            >
              {{ $t("nft") }}
            </v-btn>
          </nuxt-link>
        </div>
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
import { ethers } from "ethers";
import { web3Onboard } from "../helpers/web3onboard";
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
    currentRoute() {
      return this.$route.path;
    },
  },
  async mounted() {
    this.isMobile = this.checkMobile();
    window.addEventListener("resize", this.checkMobile, { passive: true });
    await this.autoConnectWallet();
  },
  methods: {
    async autoConnectWallet() {
      try {
        if (localStorage.getItem("connectedWallet")) {
          const previouslyConnectedWallet = JSON.parse(
            localStorage.getItem("connectedWallet")
          );
          if (previouslyConnectedWallet) {
            this.$store.commit("setConnected", true);
            await web3Onboard.connectWallet({
              autoSelect: {
                label: previouslyConnectedWallet.label,
                disableModals: true,
              },
            });

            this.$store.commit("connect", {
              address: ethers.utils.getAddress(
                previouslyConnectedWallet.accounts[0].address
              ),
              name: "",
              id: "0x1",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkMobile() {
      return window.innerWidth < 600;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.section-btns {
  color: #68778d;
  font-weight: 500 !important;
  font-size: 14px !important;
}
.highlighted-btn {
  color: #5959d8;
  font-weight: 600 !important;
  font-size: 14px !important;
}
.logo-text {
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
}
.v-btn {
  text-transform: none !important;
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