<template>
  <v-dialog
    v-model="txSucceedDialog"
    class="dialog-css"
    max-width="450px"
    overlay-opacity="0.5"
  >
    <v-sheet class="align-self-start px-9 py-6" >
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">{{ $t("confirmed") }}</h1>
          <v-spacer />
          <v-btn icon @click="txSucceedDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center my-2">
          <v-icon size="128px" color="green"> mdi-check-circle </v-icon>
        </v-col>
        <v-col class="d-flex justify-center pt-0 pb-2">
          <a
            :href="link"
            target="_blank"
            click="window.open(link)"
            style="text-decoration: none"
          >
            <span> {{ $t("view_on_explorer") }} </span>
          </a>
        </v-col>
        <v-col class="d-flex justify-center py-0" v-if="symbol">
          <v-btn rounded depressed elevation="0" class="my-3" color="#f4f7fa" @click="addToken" :loading="addingToken"> 
            {{ $t('add') }} {{ symbol }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            @click="txSucceedDialog = false"
            class="border-rounded main-btn white--text"
          >
            {{ $t("close") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { ethers } from "ethers";
import { MixinClient } from "~/helpers/mixin";
import { getContractByAssetID } from "../helpers/registry";
import { XINUUID, ETHUUID } from '~/helpers/constants';

export default {
  data(){
    return {
      addingToken: false,
    }
  },
  props: ["link", "assetid", "symbol"],
  computed: {
    txSucceedDialog: {
      get() {
        return this.$store.state.txSucceedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxSucceedDialog", value);
      },
    },
  },
  methods: {
    async addToken() {
      if (window.ethereum == undefined) return;
      if (this.assetid == "") return;
      if (this.assetid == ETHUUID) return;
      this.addingToken = true;
      let asset = await MixinClient.asset.fetch(this.assetid);
      let contractAddr = await getContractByAssetID(this.assetid);
      if (contractAddr === ethers.constants.AddressZero) return;
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: contractAddr,
              symbol: asset.symbol,
              decimals: 8,
              image: asset.icon_url,
            },
          },
        });
        this.addingToken = false;
      } catch (error) {
        console.log(error);
        this.addingToken = false;
      }
    },
  }
};
</script>