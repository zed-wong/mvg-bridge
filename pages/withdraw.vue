<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="0">
        <span class="text-center text-h4 d-flex justify-center pa-5">
          Withdraw
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
          Withdraw from MVM Mainnet to any Mixin user
        </span>

        <span
          class="
            text-center
            font-weight-light
            text-subtitle-2
            d-flex
            justify-center
            pb-2
          "
          v-if="connected"
        >
          Your Metamask Address: {{ address }}
        </span>
        <v-divider v-if="connected" />
        <div class="pl-10 pt-10" v-if="connected">
          <span class="text-subtile-1 d-flex"> Multisig? </span>
          <v-switch v-model="multisig" label="Multisig transfer" />
        </div>
        <div v-if="connected && !multisig">
          <span class="text-subtile-1 pa-5 pl-10 d-flex">
            Enter the recipient user id or mixin id:
          </span>
          <span class="little-eg pa-5 pt-0 pl-10 d-flex font-weight-light">
            e.g. 44d9717d-8cae-4004-98a1-f9ad544dcfb1 or 28865
          </span>
          <v-text-field
            :rules="[singlerules]"
            class="px-10"
            placeholder="Enter ID"
            filled
            v-model="recipientid"
          />
          <span class="text-subtile-1 pa-5 pl-10 d-flex"> Enter extra: </span>
          <v-text-field
            class="px-10"
            placeholder="Enter Extra"
            filled
            v-model="memo"
          />
        </div>

        <div v-if="connected && multisig">
          <span class="text-subtitle-1 pa-5 pl-10 d-flex">
            Enter the recipient user id (split by ,):
          </span>
          <span class="little-eg pa-5 pt-0 pl-10 d-flex font-weight-light">
            e.g.
            44d9717d-8cae-4004-98a1-f9ad544dcfb1,fcb87491-4fa0-4c2f-b387-262b63cbc112
          </span>
          <v-text-field
            class="px-10"
            placeholder="Enter ID"
            filled
            v-model="recipientid"
          />
          <span class="text-subtitle-1 pa-2 pt-0 pl-10 d-flex">
            Enter threhold:
          </span>
          <v-text-field
            type="number"
            class="px-10"
            placeholder="Enter Threhold"
            filled
            v-model="threhold"
          />
          <span class="text-subtile-1 pa-5 pl-10 d-flex"> Enter extra: </span>
          <v-text-field
            class="px-10"
            placeholder="Enter Extra"
            filled
            v-model="memo"
          />
        </div>

        <div v-if="connected">
          <span class="d-flex text-subtile-1 pa-5 pl-10">
            Select the asset you want to withdraw:
          </span>
          <v-select
            filled
            class="px-10"
            :items="allAssets"
            :hint="`${select.name}`"
            :label="select.name"
            v-model="select"
            item-text="symbol"
            return-object
          />
        </div>

        <div v-if="connected">
          <span class="d-flex text-subtile-1 pa-5 pl-10">
            Input the amount you want to withdraw:
          </span>
          <v-text-field type="number" class="px-10" filled v-model="amount" />
        </div>

        <div class="d-flex justify-center text-center pa-5" v-if="!connected">
          <v-btn
            rounded
            large
            @click="connectWallet"
            :disabled="connectLoading"
          >
            Connect Wallet
          </v-btn>
        </div>
        <div class="d-flex justify-center text-center pa-5" v-if="connected">
          <v-btn rounded large :loading="withdrawLoading" @click="withdraw"> Withdraw </v-btn>
        </div>
        <span
          class="text-center d-flex justify-center text-subtile-1 pa-5"
          v-if="withdrawResult"
        >
          Withdraw result: <br />{{ withdrawResult }}
        </span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { multiply } from "mathjs";
import { ethers } from "ethers";
import MixinClient from "@/helpers/mixin";
import assets from "../assets/assets.json";
const DECIMAL = 100000000;

let payload = {
  receiver: [],
  threhold: 1,
  extra: "",
};

export default {
  data() {
    return {
      memo: "",
      amount: "",
      address: "",
      allAssets: assets.assets,
      connected: false,
      multisig: false,
      threhold: 1,
      recipientid: "",
      singlerules: (value) => value.length >= 4 || "Min 4 characters",
      connectLoading: false,
      withdrawLoading: false,
      withdrawResult: "",

      select: {
        type: "asset",
        asset_id: "c94ac88f-4671-3976-b60a-09064f1811e8",
        chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
        symbol: "XIN",
        name: "Mixin",
        icon_url:
          "https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
        balance: "0",
        deposit_entries: null,
        destination: "",
        tag: "",
        price_btc: "0.00773833",
        price_usd: "155.79039766",
        change_btc: "-0.04740338482065303",
        change_usd: "0.05065832299481757",
        asset_key: "0xa974c709cfb4566686553a20790685a47aceaa33",
        mixin_id:
          "a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc",
        reserve: "0",
        confirmations: 16,
        capitalization: 97337004.38645542,
        liquidity: "624794.633325414",
        contract: "",
      },
    };
  },
  methods: {
    fmtAmount(amount){
      return multiply(amount, DECIMAL)
    },
    async getExtra() {
      if (!isNaN(this.recipientid)) {
        const user = await MixinClient.readUser(this.recipientid.trim())
        payload.receiver = [user.userid];
      }
      if (this.multisig) {
        payload.receiver = this.recipientid.trim().split(',');
      } else {
        payload.receiver = [this.recipientid.trim()];
      }
      payload.extra = this.memo;
      let extra = await this.$axios.post("https://bridge.mvm.dev/extra", {
        payload
      });
      return extra.data.extra
    },
    async getProxyContract(){
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: ethers.utils.getAddress(this.address),
      });
      return result.data.user.contract ? result.data.user.contract : ''
    },
    async withdraw(){
      // get the asset contract address by selected asset
      let to = await this.getProxyContract();
      let value = this.fmtAmount(this.amount);
      let extra = await this.getExtra();
      console.log(to, value, extra);
      // call contract
    },

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
          console.log(error)
          if (error.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: chain,
            });
          }
        }
      }
      this.connectLoading = false;
      this.connected = true;
    },
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      window.location.href = "https://metamask.io/download/";
    }
  },
};
</script>

<style>
.little-eg {
  font-size: 12px;
}

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
  text-transform:none !important;
}
</style>