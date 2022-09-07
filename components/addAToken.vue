<template>
  <v-dialog
    v-model="addTokenDialog"
    class="dialog-css"
    max-width="400px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 pt-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0">
          <h1 class="select-token-css">{{ $t("add_a_token") }}</h1>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon size="16px"> mdi-help-circle-outline </v-icon>
              </v-btn>
            </template>
            <span> {{ $t("add_a_token_intro") }} </span>
          </v-tooltip>
          <v-spacer />
          <v-btn icon @click="addTokenDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="pt-3 px-2">
          <v-text-field
            dense
            outlined
            v-model="search"
            hide-details="true"
            class="search-border search-bg"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('search_token_name')"
          />
        </v-col>
        <v-col class="pt-2 pb-0 px-0">
          <v-list class="overflow-y-auto" height="450px">
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in filteredItems"
                :key="i"
                class="px-2"
                @click="selectToken(item)"
                style="border-radius: 10px"
              >
                <v-list-item-avatar>
                  <v-img :src="item.icon_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                    style="font-size: 14px"
                  >
                    {{ item.symbol }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="font-size: 12px">
                    {{ item.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col class="py-4 px-0" v-if="selected">
          <v-btn
            block
            x-large
            style="border-radius: 12px; background-color: #5959d8"
            elevation="0"
            :loading="loading"
            @click="add"
          >
            <span class="white--text">
              {{ $t("add") }}
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import assets from "../assets/assets.json";
import { ethers } from "ethers";
import { MixinClient } from "~/helpers/mixin";
import { useOnboard } from "@web3-onboard/vue";
import { getContractByAssetID } from "../helpers/registry";

const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";

export default {
  data() {
    return {
      search: "",
      selected: false,
      currentToken: {},
      loading: false,
    };
  },
  computed: {
    addTokenDialog: {
      get() {
        return this.$store.state.addTokenDialog;
      },
      set(n) {
        this.$store.commit("toggleAddTokenDialog", n);
      },
    },
    assets: {
      get() {
        return assets.assets.filter((item) => {
          return !item.asset_id.match(ETHUUID);
        });
      },
    },
    filteredItems() {
      return this.assets.filter((item) => {
        return (
          item.symbol.toLowerCase().match(this.search) ||
          item.name.toLowerCase().match(this.search) ||
          item.asset_id.toLowerCase().match(this.search)
        );
      });
    },
    selectedToken: {
      get() {
        return this.currentToken;
      },
      set(n) {
        if (this.currentToken == n) {
          return;
        }
        this.currentToken = n;
        this.selected = true;
      },
    },
    connectedChain() {
      return this.$store.state.chainId;
    },
  },
  methods: {
    selectToken(item) {
      this.selectedToken = item;
    },
    add() {
      this.loading = true;
      try {
        this.mvmByDefault();
        this.addToken();
      } catch (error) {
        console.log(error)
      }
      this.loading = false;
    },
    async addToken() {
      if (window.ethereum == undefined) return;
      let assetID = this.selectedToken.asset_id;
      if (assetID == ETHUUID) return;
      try {
        let asset = await MixinClient.asset.fetch(assetID);
        let contractAddr = await getContractByAssetID(assetID);
        if (contractAddr === ethers.constants.AddressZero) return;
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
      } catch (error) {
        console.log(error);
      }
    },
    async mvmByDefault() {
      const { connectedWallet, setChain } = useOnboard();
      if (connectedWallet) {
        setChain({ wallet: connectedWallet.value.label, chainId: "0x120c7" });
      }
    },
  },
};
</script>