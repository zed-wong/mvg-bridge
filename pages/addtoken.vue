<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <span class="text-center text-h4 d-flex justify-center pa-5">
        Add Token to Metamask
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
        Enter Mixin Network<a class="mx-1" href="https://developers.mixin.one/docs/api/network/assets">asset id</a> to add Metamask token.
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
          @click="addToken(searchAsset, 'enter')"
          large
          rounded
          :loading="addTokenLoading"
        >
          Add
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
        Select to add Metamask token.
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
          @click="addToken(select.asset_id, 'select')"
          large
          rounded
          :loading="selectTokenLoading"
        >
          Add Selected
        </v-btn>
      </div>
    </v-col>
    <v-snackbar v-model="snackbar">
      {{ popupMessage }}
      <v-btn text color="pink" elevation="0" @click="snackbar = false">
        Off
      </v-btn></v-snackbar
    >
  </v-row>
</template>

<script>
// This page is totally a copy of https://github.com/liuzemei/mvm-mvm/blob/master/src/components/mvm/brige/index.vue
import assets from "../assets/assets.json";
import { getContractByAssetID } from "../helpers/registry";
import { searchNetworkAsset, readNetworkAsset } from "mixin-node-sdk";

// const getAssetIDBySearch = async (searchAsset: string): Promise<string> => {
//     const t = await searchNetworkAsset(searchAsset);
//     if (t.length === 0) throw new Error("Asset Not Found!");
//     return t[0].asset_id;
// }

export default {
  layout: "links",
  data() {
    return {
      loader: '',
      snackbar: false,
      popupMessage: "",
      addTokenLoading: false,
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
    async addToken(assetID, type) {
      if (type === "enter") {
        this.loader = "addTokenLoading";
      } else {
        this.loader = "selectTokenLoading";
      }
      try {
        let asset = await readNetworkAsset(assetID);
        let contractAddr = await getContractByAssetID(assetID);
        let decimal = 8;
        if (contractAddr === "0x0000000000000000000000000000000000000000") {
          this.popupMessage = "This asset hasn't been registered yet. So you can't add it now. The register asset page is coming soon.";
          this.snackbar = true;
          return;
        }
        console.log(assetID, asset, contractAddr);
        await window.ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: contractAddr,
                symbol: asset.symbol,
                decimals: decimal,
                image: asset.icon_url,
              },
            },
          })
          .then((success) => {
            if (success) {
              console.log("Successfully added to wallet!");
              this.popupMessage = "Successfully added to wallet!";
              this.snackbar = true;
            } else {
              throw new Error("something went wrong.");
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 5000);

      this.loader = null;
    },
  },
};
</script>