<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <span class="text-center text-h4 d-flex justify-center pa-5">
        Deposit By Address
      </span>
    </v-col>
    <v-col cols="12" sm="8" md="6">
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
        Enter Mixin Network<a class="mx-1" href="https://developers.mixin.one/docs/api/network/assets">asset id</a> to deposit.
      </span>
      <v-text-field
        filled
        class="mt-3"
        v-model="searchAsset"
        clearable
        :placeholder="placeHolder"
      />
      <div class="d-flex justify-center">
        <v-btn
          @click="getDepositAddress(searchAsset, 'enter')"
          large
          rounded
          :loading="getAssetLoading"
        >
          Get Deposit Address
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" sm="8" md="6">
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
        Select to get Deposit Address.
      </span>
      <v-select
        filled
        class="mt-3"
        :items="allAssets"
        :hint="`${select.name}`"
        :label="select.name"
        v-model="select"
        item-text="symbol"
        return-object
      />
      <div class="d-flex justify-center">
        <v-btn
          @click="getDepositAddress(select.asset_id, 'select')"
          large
          rounded
          :loading="selectTokenLoading"
        >
          Get Address
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" class="d-flex justify-center align-center flex-column mt-15" v-if="dpAddr">
      <span>
        Chain: {{ dpChain }}
      </span>
      <span>
        Deposit Address: {{ dpAddr }}
      </span>
      <span v-if="dpTag">
        Tag: {{ dpTag }}
      </span>
    </v-col>
    <v-snackbar v-model="snackbar">
      {{ popupMessage }}
      <v-btn text color="pink" elevation="0" @click="snackbar = false">
        Off
      </v-btn></v-snackbar
    >
    <v-col cols="12">
      {{ result }}
    </v-col>
  </v-row>
</template>

<script>
import {MixinClient,NewClient} from "@/helpers/mixin";
import assets from "../assets/assets.json";

export default {
  layout: "links",
  data() {
    return {
      dpChain:'',
      dpAddr: '',
      dpTag: '',
      result: '',
      loader: '',
      snackbar: false,
      popupMessage: "",
      getAssetLoading: false,
      selectTokenLoading: false,

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
      searchAsset: "",
      selectAsset: "",
      placeHolder: "Enter the asset id",
    };
  },
  methods: {
    // getAssetIDBySearch,
    async getDepositAddress(assetID, type) {
      if (type === "enter") {
        this.loader = "getAssetLoading";
      } else {
        this.loader = "selectTokenLoading";
      }
      let client;
      let user = localStorage.getItem('user')
      if (user){
        user = JSON.parse(user);
        client = NewClient(user.client_id, user.session_id, user.private_key)
      }
      let asset = await client.readAsset(assetID);
      this.dpChain = await this.getAssetChainName(asset.chain_id);
      this.dpAddr = asset.deposit_entries[0].destination;
      if (asset.deposit_entries[0].tag) {
        this.dpTag = asset.deposit_entries[0].tag;
        return;
      }
      this.dpTag = '';
    },
    async getAssetChainName(chainID){
      let chain = await MixinClient.readAsset(chainID);
      return chain.symbol
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>