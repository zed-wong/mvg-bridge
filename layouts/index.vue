<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="px-6 bar-css"
        height="90px"
      >
        <v-img
          :src="bridge"
          max-width="30px"
          max-height="33px"
          class="ml-3"
          @click="redirect('https://scan.mvm.dev')"
        />
        <span
          class="font-weight-bold ml-4"
          style="font-size: 22px"
          @click="redirect('https://scan.mvm.dev')"
        >
          MVG
        </span>
        <v-spacer />
        <connect-wallet :small="true" v-if="!connected"/>

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
import githublogo from "../static/github.png";
import connectWallet from "../components/connectWallet.vue"

export default {
  components: {
    connectWallet
  },
  data() {
    return {
      bridge,
      githublogo,
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
      }
    }
  },
  mounted() {
    this.isMobile = this.checkMobile();
    window.addEventListener("resize", this.checkMobile, { passive: true });
  },
  methods: {
    redirect(to) {
      window.location.href = to;
    },
    checkMobile() {
      return window.innerWidth < 600;
    },
    getAvatar(length) {
      if (localStorage.getItem("avatar_url")) {
        return localStorage.getItem("avatar_url");
      }
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      let url = "https://avatars.dicebear.com/api/identicon/" + result + ".png";
      localStorage.setItem("avatar_url", url);
      return url;
    },
  },
};
</script>

<style>
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
  height: calc(100vh - 90px);
}
</style>