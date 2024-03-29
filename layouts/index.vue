<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#f4f7fa"
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
        color="#f4f7fa"
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
          !$vuetify.breakpoint.mobile ? ' py-0 content' : ' py-0 mobile-content'
        "
        class="background-cor"
      >
        <Nuxt />
      </v-container>
      <v-footer
        absolute
        class="background-cor"
        v-if="!$vuetify.breakpoint.mobile"
      >
        <v-col
          cols="12"
          class="pa-6 d-flex flex-row text-start align-center"
        >
          <a :href="githubLink" target="”_blank”">
            <github class="mx-3 d-flex align-center" />
          </a>
          <a :href="discordLink" target="”_blank”">
            <discord class="mx-3 d-flex align-center" />
          </a>
          <a :href="telegramLink" target="”_blank”">
            <telegram class="mx-3 d-flex align-center" />
          </a>
          <a :href="mixinGroupLink" target="”_blank”">
            <mm class="mx-3 d-flex align-center" />
          </a>
          <v-spacer />
          <a @click="addTokens"
            ><span class="bottom-helper-text mr-8">
              {{ $t("add_a_token") }}
            </span>
          </a>
        </v-col>
      </v-footer>
      <v-footer absolute class="background-cor" v-else>
        <v-row class="pa-6 d-flex flex-column text-start align-center">
          <v-col class="d-flex flex-row justify-center align-center">
            <!-- <a @click="addTokens"
              ><span class="bottom-helper-text">
                {{ $t("add_a_token") }}
              </span>
            </a> -->
          </v-col>
          <v-col class="d-flex flex-row justify-center">
            <a :href="githubLink" target="”_blank”">
              <github class="mx-3 d-flex align-center" />
            </a>
            <a :href="discordLink" target="”_blank”">
              <discord class="mx-3 d-flex align-center" />
            </a>
            <a :href="telegramLink" target="”_blank”">
              <telegram class="mx-3 d-flex align-center" />
            </a>
            <a :href="mixinGroupLink" target="”_blank”">
              <mm class="mx-3 d-flex align-center" />
            </a>
          </v-col>
        </v-row>
      </v-footer>
      <applications />
      <add-a-token />
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
import applications from "~/components/applications.vue";
import addAToken from "~/components/addAToken.vue";
import github from "~/components/icons/github.vue";
import discord from "~/components/icons/discord.vue";
import telegram from "~/components/icons/telegram.vue";
import mm from "~/components/icons/mm.vue";

export default {
  components: {
    connectWallet,
    currentNetwork,
    connectedWallet,
    mobileDrawer,
    applications,
    addAToken,
    discord,
    github,
    telegram,
    mm
  },
  data() {
    return {
      bridge,
      explorerLink: "https://scan.mvm.dev",
      githubLink: "https://github.com/zed-wong/mvg.finance",
      issueLink: "https://github.com/zed-wong/mvg.finance/issues",
      discordLink: "https://discord.gg/49ehJCkBa5",
      telegramLink: "https://t.me/mvgfinance",
      mixinGroupLink: "https://mixin.one/codes/faa7f8d3-d1c3-473b-9f56-7ffbbb512cc0"
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
    appsDialog: {
      get() {
        return this.$store.state.appsDialog;
      },
      set(n) {
        this.$store.commit("toggleAppsDialog", n);
      },
    },
    addTokenDialog: {
      get() {
        return this.$store.state.addTokenDialog;
      },
      set(n) {
        this.$store.commit("toggleAddTokenDialog", n);
      },
    },
  },
  async mounted() {
    await this.autoConnectWallet();
  },
  methods: {
    async autoConnectWallet() {
      try {
        if (localStorage.getItem("lastConnected")) {
          const previouslyConnectedWallet = localStorage.getItem("lastConnected");
          if (previouslyConnectedWallet) {
            this.$store.commit("setConnected", true);
            const c = await web3Onboard.connectWallet({
              autoSelect: {
                label: previouslyConnectedWallet,
                disableModals: true,
              },
            });
            this.$store.commit("connect", {
              address: ethers.utils.getAddress(c[0].accounts[0].address),
              name: c[0].label,
              id: c[0].chains[0].id,
            });
            c[0].provider.on("accountsChanged", () =>
              this.$store.commit("disconnect")
            );
            c[0].provider.on("chainChanged", (chainid) => {
              this.$store.commit("updateChainId", chainid);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    showApps() {
      this.appsDialog = true;
    },
    addTokens() {
      this.addTokenDialog = true;
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
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}
.mobile-logo-text {
  font-size: 18px;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}
.v-btn {
  text-transform: none !important;
}
.bar-css {
  border-width: 0 0 thin;
  border-style: solid;
}
.content {
  height: calc(100vh - 72px - 80px);
}
.mobile-content {
  height: calc(100vh - 64px - 80px);
}
.mobile-menu-list-item {
  font-size: 16px;
}
.background-cor {
  background-color: #f4f7fa;
}
.bottom-helper-text {
  color: #68778d;
  font-size: 14px;
  white-space: nowrap;
}
</style>