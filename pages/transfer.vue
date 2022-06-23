<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <span class="text-center text-h4 d-flex justify-center pa-5">
        Transfer to Metamask
      </span>
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          pa-5
          pb-2
          pt-2
        "
      >
        <span>
          Complete <nuxt-link to="/register"> Step 1 </nuxt-link> Before this
          step!
        </span>
      </span>
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          pa-5
          pt-0
        "
      >
        Transfer crypto to your Metamask (MVM Mainnet)
      </span>
      <v-select
        filled
        :items="allAssets"
        :hint="`${select.name}`"
        :label="select.name"
        v-model="select"
        item-text="symbol"
        return-object
      />
      <v-text-field
        filled
        v-model="amount"
        clearable
        type="number"
        :placeholder="placeHolder"
      />
      <div class="d-flex justify-center text-center pa-5">
        <v-btn @click="payment" rounded large> Payment </v-btn>
      </div>
      <div class="d-flex justify-center text-center pa-5">
        <v-btn @click="transfer" rounded large> Transfer </v-btn>
      </div>

      <v-card
        v-if="URL.length != 0"
        style="width: 600px"
        elevation="0"
        class="d-flex justify-center"
      >
        <vue-qrcode :value="URL" :options="{ width: 400 }" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import assets from "../assets/assets.json";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const botconfig = JSON.parse(localStorage.getItem("user"));

// const bridge = new Bridge({
//   client_id: botconfig.client_id,
// });
export default {
  data() {
    return {
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
      },
      allAssets: assets.assets,
      asset: "",
      amount: "",
      placeHolder: "Enter Amount",
      URL: "",
    };
  },
  methods: {
    payment() {
      let url =
        "mixin://pay?recipient=" +
        botconfig.client_id +
        "&asset=" +
        this.select.asset_id +
        "&amount=" +
        this.amount +
        "&trace=" +
        uuidv4();
      this.URL = url;
      console.log(url);
    },
    transfer() {
      console.log("mixin://transfer/" + botconfig.client_id);
      this.URL = "mixin://transfer/" + botconfig.client_id;
    },
  },
  components: {
    VueQrcode,
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
</style>