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
        Add asset by asset id into Metamask.
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
          @click="addToken(searchAsset,'enter')"
          :loading="addLoading"
          large
          rounded
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
        Add asset into Metamask by select.
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
          @click="addToken(selectAsset.asset_id,'select')"
          :loading="addSelectLoading"
          large
          rounded
        >
          Add Selected
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// This page is totally a copy of https://github.com/liuzemei/mvm-mvm/blob/master/src/components/mvm/brige/index.vue
import { parse } from "uuid";
import assets from "../assets/assets.json";
import { getContractByAssetID } from "../helpers/registry";
import { searchNetworkAsset, readNetworkAsset } from "mixin-node-sdk";

// const getAssetIDBySearch = async (searchAsset: string): Promise<string> => {
//   try {
//     parse(searchAsset);
//     return searchAsset;
//   } catch (error) {
//     const t = await searchNetworkAsset(searchAsset);
//     if (t.length === 0) throw new Error("Asset Not Found!");
//     return t[0].asset_id;
//   }
// };

export default {
  layout: "links",
  data() {
    return {
      select: "",
      allAssets: assets.assets,
      searchAsset: "",
      selectAsset: "",
      addLoading: false,
      addSelectLoading: false,
      placeHolder: "Enter the asset id",
    };
  },
  methods: {
    // getAssetIDBySearch,
    async addToken(assetID: string, type: string) {
      if (type === "enter"){
        this.addLoading = true;
      } else {
        this.addSelectLoading = true;
      }
      try {
        let asset = await readNetworkAsset(assetID);
        let contractAddr = await getContractByAssetID(assetID);
        let decimal = 8;
        console.log(assetID, asset, contractAddr);
        await window.ethereum.request({
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
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>