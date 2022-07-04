<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0">
        <v-img
          :src="bridge"
          max-width="28px"
          max-height="28px"
          class="ml-3"
          @click="redirect('/')"
        />
        <span class="font-weight-bold ml-2" @click="redirect('/')">
          MVM-Bridge
        </span>
        <v-spacer />
        <v-img :src="githublogo" max-height="22px" max-width="22px" class="mr-3" @click="toGithub"/>
        <v-btn
          depressed
          rounded
          outlined
          elevation="0"
          class="ml-3"
          color="primary"
          @click="connectWallet"
          v-if="!connected"
        >
          Connect Wallet
        </v-btn>
        <v-btn
          depressed
          rounded
          outlined
          elevation="0"
          class="ml-3"
          color="primary"
          v-if="connected"
          text
          :max-width="150"
        >
          <span class="text-truncate" style="max-width: 120px">{{
            address
          }}</span>
        </v-btn>
      </v-app-bar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import githublogo from "../static/github.png";
import bridge from "../static/bridge.png";
import { ethers } from "ethers";
export default {
  data() {
    return {
      bridge,
      githublogo,
      links: [
        { name: "Register", to: "/register" },
        { name: "Deposit", to: "/deposit" },
        { name: "Withdraw", to: "/withdraw" },
        // { name: "Query", to: "/query" },
        { name: "Add Token", to: "/addtoken" },
        { name: "Deposit By Address", to: "/anydeposit" },
        { name: "Withdraw To Address(WIP)", to: "/anywithdraw" },
        // {name: "", to: ""},
      ],
    };
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    address() {
      return this.$store.state.address;
    },
  },
  mounted() {
    this.connectWallet();
  },
  methods: {
    redirect(to) {
      window.location.href = to;
    },
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.register(accounts[0]);
      // console.log(accounts[0]);

      this.$store.commit("connect", accounts[0]);

    },
    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
    },
    toGithub(){
      window.open("https://github.com/zed-wong/zed-wong.github.io")
    }
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>