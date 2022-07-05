<template>
  <v-row class="d-flex justify-center mt-5">
    <v-col cols="12" class="text-center">
      <span class="text-h5 font-weight-normal">
        Buy XIN in MVM Mainnet through ETH Mainnet (Metamask)</span
      >
    </v-col>
    <v-col cols="12" class="mt-5">
      <v-input hide-details="auto">
        <span class="font-weight-light"> ETH </span>
        <v-text-field
          single-line
          filled
          class="ml-3 d-flex align-center"
          type="number"
          v-model="ethAmount"
        />
      </v-input>
    </v-col>
    <v-col cols="12">
      <v-input hide-details="auto">
        <span class="font-weight-light"> XIN </span>
        <v-text-field
          single-line
          filled
          class="ml-3 d-flex align-center"
          type="number"
          v-model="xin"
        />
      </v-input>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn
        rounded
        depressed
        large
        color="primary"
        min-width="100px"
        @click="buy"
      >
        <span class="font-weight-bold"> Buy </span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { MixinClient, NewClient } from "@/helpers/mixin";
const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";
const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";
let apiresult;
let poolETH;
let poolXIN;
let marketPrice;
let k;

export default {
  layout: "ethbridge",
  data() {
    return {
      ethAmount: "",
      xinAmount: "",
    };
  },
  computed: {
    xin: {
      get() {
        return (poolXIN - k / (poolETH + Number(this.ethAmount))).toFixed(8);
      },
      set(value) {
        this.xinAmount = value;
        // this.ethAmount = (poolETH - (k / (poolXIN + Number(this.xinAmount)))).toFixed(8)
      },
    },
  },
  async created() {
    let result = await this.$axios.get(
      `https://api.4swap.org/api/pairs/${ETHUUID}/${XINUUID}`
    );
    apiresult = result.data.data;
    // console.log(apiresult);
    k = Number(apiresult.base_amount) * Number(apiresult.quote_amount);
    poolETH = Number(apiresult.base_amount);
    poolXIN = Number(apiresult.quote_amount);
    marketPrice = poolETH / poolXIN;
  },
  methods: {
    async buy() {
      // 0. Query User ETH deposit address on MVM Mainnet (Check and switch to ETH mainnet)
      // 1. Call Metamask to transfer ethAmount of ETH to proxy user address
      // 2. Wait until the transation is done
      // 3. Call 4swap to swap
      await this.switchToETHMainnet();
      await this.depositETHToMVM(
        await this.getDepositAddress(ETHUUID),
        '0x'+parseInt(this.ethAmount, 16).toString()
      );
    },
    async getDepositAddress(assetID) {
      let client;
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        client = NewClient(user.client_id, user.session_id, user.private_key);
      }
      let asset = await client.readAsset(assetID);
      return asset.deposit_entries[0].destination;
    },
    async switchToETHMainnet() {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x1") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        } catch (error) {
          console.log("switch error:", error);
        }
      }
    },
    async depositETHToMVM(depositAddress, value) {
      const transactionParameters = {
        nonce: "0x00",
        gasPrice: "0x09184e72a000",
        gas: "0x2710",
        to: depositAddress,
        from: window.ethereum.selectedAddress,
        value: value,
        data: "0x1",
        chainId: "0x1",
      };
      console.log(transactionParameters)
      try {
        let txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        console.log(`https://scan.mvm.dev/tx/${txHash}`);
      } catch (error) {
        console.log("deposit error:", error);
      }
      
    },
  },
};
</script>




<style>
/* Remove input number arrow */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.v-btn {
  text-transform: none !important;
}
</style>