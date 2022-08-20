<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="px-6 bar-css"
        height="72px"
        v-if="!$vuetify.breakpoint.mobile"
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
        <div class="ml-10 d-flex align-center" style="height: 100%">
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
        <current-network v-if="connected" />
        <connected-wallet v-if="connected" />
      </v-app-bar>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="mobile-bar-css"
        height="64px"
        v-else
      >
        <v-row>
          <v-col cols="2">
            <v-app-bar-nav-icon @click="drawer = !drawer" />
          </v-col>
          <v-col class="d-flex flex-row align-center justify-center">
            <a href="/">
              <v-img
                :src="bridge"
                max-width="18px"
                max-height="20px"
                class="ml-3"
              />
            </a>
            <span class="font-weight-bold ml-2 mobile-logo-text"> MVG </span>
          </v-col>
          <v-col cols="2" />
        </v-row>
      </v-app-bar>
      <mobile-drawer v-if="drawer" />
      <v-container
        fluid
        :class="
          !$vuetify.breakpoint.mobile
            ? 'fill-height py-0 content'
            : 'fill-height py-0 mobile-content'
        "
        class="background-cor"
      >
        <Nuxt />
      </v-container>
      <v-card height="80px" elevation="0" class="background-cor"  v-if="!$vuetify.breakpoint.mobile">
        <v-footer>
          <v-col
            cols="12"
            class="pa-6 d-flex flex-row text-start"
          >
            <a :href="githubLink" target=”_blank”> <v-icon> mdi-github </v-icon> </a>
            <v-spacer />
            <a :href="issueLink" target=”_blank” style="color: black; opacity: 0.5"> <span> {{ $t('report_a_bug') }} </span></a>
          </v-col>
        </v-footer>
      </v-card>
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
import mobileDrawer from "~/components/mobileDrawer.vue";

export default {
  components: {
    connectWallet,
    currentNetwork,
    connectedWallet,
    mobileDrawer,
  },
  data() {
    return {
      bridge,
      githubLink: "https://github.com/zed-wong/mvg.finance",
      issueLink: "https://github.com/zed-wong/mvg.finance/issues"
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
    drawer: {
      get() {
        return this.$store.state.mobileDrawer;
      },
      set(n) {
        this.$store.commit("toggleMobileDrawer", n);
      },
    },
  },
  async mounted() {
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
            const c = await web3Onboard.connectWallet({
              autoSelect: {
                label: previouslyConnectedWallet.label,
                disableModals: true,
              },
            });
            this.$store.commit("connect", {
              address: ethers.utils.getAddress(c[0].accounts[0].address),
              name: c[0].label,
              id: c[0].chains[0].id,
            });
            if (c.length > 0) {
              c[0].provider.on("accountsChanged", () =>
                this.$store.commit("disconnect")
              );
              c[0].provider.on("chainChanged", (chainid) => {
                this.$store.commit("updateChainId", chainid);
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
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
.mobile-logo-text {
  font-size: 18px;
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
  height: calc(100vh - 72px - 80px);
}
.mobile-content {
  height: calc(100vh - 64px);
}
.mobile-menu-list-item {
  font-size: 16px;
}
.background-cor {
  background-color: #f4f7fa
}
</style>