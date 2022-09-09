<template>
  <v-navigation-drawer
    absolute
    bottom
    temporary
    style="border-radius:10px 10px 0 0"
    v-model="drawer"
    v-if="$vuetify.breakpoint.mobile"
  >
    <v-list-item class="my-3 py-0">
      <v-spacer />
      <v-icon @click="drawer = false"> mdi-close </v-icon>
    </v-list-item>
    <v-list nav expand class="pt-0">
      <v-list-item-group v-model="selected">
        <v-list-item class="my-2" @click="to('/')">
          <v-icon size="28" color="#5959d8" class="mr-4 ml-2">
            mdi-ethereum
          </v-icon>
          <span class="mobile-menu-list-item"> {{ $t("token") }} </span>
          <v-spacer />
          <v-icon> mdi-chevron-right </v-icon>
        </v-list-item>

        <v-list-item class="my-2" @click="to('/nft')">
          <v-icon size="28" color="#5959d8" class="mr-4 ml-2">
            mdi-image
          </v-icon>
          <span class="mobile-menu-list-item"> {{ $t("nft") }} </span>
          <v-spacer />
          <v-icon> mdi-chevron-right </v-icon>
        </v-list-item>

        <v-list-item class="my-2" v-if="connected" @click="toggleAccountDialog">
          <v-avatar size="28" class="mr-4 ml-2">
            <v-img width="28px" height="28px" :src="avatarURL" />
          </v-avatar>
          <span class="mobile-menu-list-item"> {{ $t("account") }} </span>
          <v-spacer />
          <v-icon> mdi-chevron-right </v-icon>
        </v-list-item>
        <connected-dialog />

        <v-list-item class="my-2" v-if="connectedChain">
          <v-avatar size="28" class="mr-4 ml-2">
            <v-img width="28px" height="28px" :src="networkIcon" />
          </v-avatar>
          <span class="mobile-menu-list-item"> {{ $t("network") }} </span>
          <v-spacer />
          <span style="color: #68778d"> {{ networkText }} </span>
        </v-list-item>
        
        <div class="mx-3 mt-10" v-if="!connected">
          <connect-wallet :mobile="true" @click="close"/>
        </div>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import ConnectedDialog from "./connectedDialog.vue";
import ConnectWallet from "./connectWallet.vue";

export default {
  components: { ConnectedDialog, ConnectWallet },
  data() {
    return {
      selected: null,
      avatarURL: "",
      networkText: null,
      networkIcon: null,
    };
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    drawer: {
      get() {
        return this.$store.state.mobileDrawer;
      },
      set(n) {
        this.$store.commit("toggleMobileDrawer", n);
      },
    },
    userAddress() {
      return this.$store.state.userAddress;
    },
    connectedChain() {
      return this.$store.state.chainId;
    },
  },
  mounted() {
    this.avatarURL = this.getAvatar(8);
    this.initNetwork(this.connectedChain);
  },
  watch: {
    connectedChain(n, o) {
      this.initNetwork(n);
    },
  },
  methods: {
    to(path) {
      this.close();
      this.$router.push({ path: this.localePath(path), query: { q: this.q } });
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
      let url = "https://api.multiavatar.com/" + result + ".svg";
      localStorage.setItem("avatar_url", url);
      return url;
    },
    toggleAccountDialog() {
      this.$store.commit("toggleAccount", !this.$store.state.accountDialog);
    },
    initNetwork(id) {
      switch (id) {
        case "0x1":
          this.networkText = this.$t("ethereum_mainnet");
          this.networkIcon =
            "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128";
          return;
        case "0x120c7":
          this.networkText = this.$t("mvm_mainnet");
          this.networkIcon = "https://mvm.dev/logo.svg";
          return;
        default: 
          this.networkText = this.$t("unsupported_network");
          return;
      }
    },
    close() {
      this.drawer = false;
      this.selected = null;
    },
  },
};
</script>