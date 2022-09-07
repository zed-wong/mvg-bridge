<template>
  <v-dialog v-model="selectNetworkDialog" class="dialog-css" max-width="400px" overlay-opacity="0.95">
    <v-sheet class="align-self-start px-9 pt-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0">
          <h1 class="select-network-css">{{ $t("select_network") }}</h1>
          <v-spacer />
          <v-btn icon @click="selectNetworkDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="pt-4 px-2">
          <v-text-field
            dense
            outlined
            v-model="search"
            hide-details="true"
            class="search-border search-bg"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('search_network_name')"
          />
        </v-col>
        <v-col class="pt-2 px-0">
          <v-list class="overflow-y-auto" height="450px">
            <v-list-item-group>
              <v-list-item v-for="(item, i) in filteredItems" :key="i" class="px-2" @click="selectedNetwork = item" style="border-radius: 10px">
                <v-list-item-avatar>
                  <v-img :src="item.icon_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold" style="font-size:14px"> {{ item.name }} </v-list-item-title> 
                  <v-list-item-subtitle class="" style="font-size:12px;">  {{ item.symbol }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import chains from "../assets/chainlist.json"
const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

export default {
  data() {
    return {
      search: '',
    }
  },
  computed: {
    selectNetworkDialog: {
      get() {
        return this.$store.state.selectNetworkDialog;
      },
      set(value) {
        this.$store.commit("toggleSelectNetwork", value);
      },
    },
    selectedNetwork: {
      get() {
        return this.$store.state.toNetwork;
      },
      set(value) {
        this.$store.commit("setToNetwork", value);
        this.selectNetworkDialog = false;
      }
    },
    selectedToken: {
      get() {
        return this.$store.state.toToken;
      }
    },
    chains: {
      get() {
        return chains
      }
    },
    filteredItems() {
      return this.chains.filter((item) => {
        if (item.asset_id.match(this.selectedToken.chain_id) || item.asset_id == XINUUID)
        return (
          item.symbol.toLowerCase().match(this.search) ||
          item.name.toLowerCase().match(this.search) ||
          item.asset_id.toLowerCase().match(this.search)
        );
      });
    },
  },
  mounted(){
    this.selectedNetwork = this.filteredItems[0]
  }
};
</script>

<style>
.search-border {
  border-radius: 10px !important;
}
.select-network-css {
  font-size: 20px;
  font-style: italic;
}
</style>