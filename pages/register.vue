<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="0">
        <span class="text-center text-h4 d-flex justify-center pa-5">
          Register
        </span>
        <span
          class="
            text-center
            font-weight-light
            text-subtitle-2
            d-flex
            justify-center
            pa-5
            pt-2
          "
        >
          Bind your Metamask address with Mixin mainnet user <br />
          Open on your computer with metamask installed
        </span>
        <span
          class="text-center d-flex justify-center text-subtile-1 pa-5"
          v-if="address"
        >
          Your Metamask Address: {{ address }}
        </span>
        <div
          class="d-flex justify-center text-center pa-5"
          v-if="connectVisble"
        >
          <v-btn rounded large @click="connectWallet" :disabled="connectLoading"> Connect Wallet </v-btn>
        </div>
        <div
          class="d-flex justify-center text-center pa-5"
          v-if="registerVisble"
        >
          <v-btn
            rounded
            large
            @click="register(address)"
            :loading="registerLoading"
          >
            Register
          </v-btn>
        </div>
        <span
          class="text-center d-flex justify-center text-subtile-1 pa-5"
          v-if="registerResult"
        >
          Binded Config: <br />{{ registerResult }}
        </span>
        <div class="d-flex justify-center text-center pa-5" v-if="nextVisble">
          <v-btn rounded large :disabled="disabled" @click="nextStep">
            Deposit to Metamask
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider(
  "https://geth.mvm.dev",
  73927
);
const chain = [
  {
    chainId: `0x${Number(73927).toString(16)}`,
    blockExplorerUrls: ["https://scan.mvm.dev/"],
    rpcUrls: ['https://geth.mvm.dev'],
    chainName: "Mixin Virtual Machine",
    nativeCurrency: {
      name: "Mixin",
      symbol: "XIN",
      decimals: 18,
    },
  },
];

export default {
  layout:"links",
  data() {
    return {
      address: "",
      disabled: true,
      connectLoading: false,
      registerLoading: false,
      connectVisble: true,
      registerVisble: false,
      nextVisble: false,
      userAddress: "",
      registerResult: "",
    };
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      window.location.href = "https://metamask.io/download/";
    }
  },
  methods: {
    async connectWallet() {
      this.connectLoading = true;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.address = accounts[0];

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x120c7") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x120c7" }],
          });
        } catch (error) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: chain,
            });
          }
        }
      }
      this.connectVisble = false;
      this.registerVisble = true;
    },
    async register(Address) {
      this.registerLoading = true;
      console.log(Address);
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
      this.registerResult = result.data.user.key;
      this.disabled = false;
      this.registerVisble = false;
      this.registerLoading = false;
      this.nextVisble = true;
    },
    nextStep() {
      window.location.href = "/deposit";
    },
  },
};
</script>

<style>
.v-btn {
  text-transform:none !important;
}
</style>