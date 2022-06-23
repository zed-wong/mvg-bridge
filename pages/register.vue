<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
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
        <span class="text-center d-flex justify-center text-subtile-1 pa-5">
          {{ address }}
        </span>
        <div class="d-flex justify-center text-center pa-5">
          <v-btn rounded large @click="connectWallet"> Connect Wallet </v-btn>
        </div>
        <div class="d-flex justify-center text-center pa-5">
          <v-btn rounded large @click="register(address)"> Register </v-btn>
        </div>
        <span class="text-center d-flex justify-center text-subtile-1 pa-5">
          {{ registerResult }}
        </span>
        <div class="d-flex justify-center text-center pa-5">
          <v-btn rounded large :disabled="disabled" @click="nextStep"> Next Step </v-btn>
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

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "600",
    "Content-Type": "plain/text",
  },
};
export default {
  data() {
    return {      
      address: "",
      disabled: true,
      userAddress: "",
      registerResult: "",
    };
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }
  },
  methods: {
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.address = accounts[0];
    },
    async register(Address) {
      console.log(Address);
      const checked = ethers.utils.getAddress(Address)
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        'public_key': checked,
      });
      localStorage.setItem('user',JSON.stringify(result.data.user.key))
      this.registerResult = result.data.user.key;
      this.disabled = false;
    },
    nextStep(){
      window.location.href = "/transfer"
    }
  },
};
</script>