<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="0"
        color="#ffffff"
        class="px-6 bar-css"
        v-if="!isMobile"
        height="72px"
      >
        <v-img
          :src="bridge"
          max-width="24px"
          max-height="26px"
          class="ml-3"
          @click="redirect('https://scan.mvm.dev')"
        />
        <span
          class="font-weight-bold ml-3"
          style="font-size: 18px"
          @click="redirect('https://scan.mvm.dev')"
        >
          Bridge
        </span>
        <v-spacer />
        <v-btn
          height="40px"
          elevation="0"
          class="ml-3 connect-wallet"
          color="#5959d8"
          @click="connectWallet"
          v-if="!connected"
        >
          <span style="color: white"> Connect Wallet</span>
        </v-btn>

        <v-btn
          text
          rounded
          outlined
          depressed
          elevation="0"
          class="mx-3"
          v-if="connected"
        >
          <span style="max-width: 120px; font-size: 12px" class="px-1"
            >{{ network }} Mainnet</span
          >
        </v-btn>

        <v-btn
          depressed
          rounded
          outlined
          elevation="0"
          class="mx-1"
          v-if="connected"
          text
        >
          <v-avatar size="22px" class="mr-2">
            <v-img :src="getAvatar(6)" max-height="22px" max-width="22px" />
          </v-avatar>
          <span
            style="max-width: 100px; font-size: 12px"
            class="text-truncate"
            >{{ address }}</span
          >
        </v-btn>
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
import githublogo from "../static/github.png";
import bridge from "../static/bridge.png";
import { ethers } from "ethers";
import chainIds from "../helpers/chainids";

export default {
  data() {
    return {
      bridge,
      githublogo,
      isMobile: false,
      links: [
        { name: "Register", to: "/register" },
        { name: "Deposit", to: "/deposit" },
        { name: "Withdraw", to: "/withdraw" },
        { name: "Query", to: "/query" },
        { name: "Add Token", to: "/addtoken" },
        { name: "Deposit By Address", to: "/anydeposit" },
        { name: "Deposit From Other Network", to: "/bridge" },
      ],
      githuburl: "https://github.com/zed-wong/zed-wong.github.io",
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
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let account = ethers.utils.getAddress(accounts[0]);
      this.register(account);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const chainName = chainIds[parseInt(chainId, 16)];
      this.$store.commit("connect", { address: account, name: chainName });

      // if (chainId != "0x120c7") {
      //   try {
      //     await window.ethereum.request({
      //       method: "wallet_switchEthereumChain",
      //       params: [{ chainId: "0x120c7" }],
      //     });
      //   } catch (error) {
      //     if (error.code === 4902) {
      //       await window.ethereum.request({
      //         method: "wallet_addEthereumChain",
      //         params: chain,
      //       });
      //     }
      //   }
      // }
    },
    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
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
* {
  font-family: Open Sans, sans-serif;
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