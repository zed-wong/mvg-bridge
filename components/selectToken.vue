<template>
  <v-dialog v-model="selectTokenDialog" class="dialog-css" max-width="400px" overlay-opacity="0.95">
    <v-sheet class="align-self-start px-9 pt-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0">
          <h1 class="select-token-css">Select token</h1>
          <v-spacer />
          <v-btn icon @click="selectTokenDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="pt-4 px-2">
          <v-text-field
            dense
            outlined
            v-model="search"
            hide-details="true"
            class="search-border"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search token name"
          />
        </v-col>
        <v-col class="pt-2 px-0">
          <v-list class="overflow-y-auto" height="450px">
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in filteredItems"
                :key="i"
                class="px-2"
                @click="selectedToken = item"
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
                  <v-list-item-subtitle class="" style="font-size: 12px">
                    {{ item.name }}
                  </v-list-item-subtitle>
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
import assets from "../assets/assets.json";
const XINUUID = 'c94ac88f-4671-3976-b60a-09064f1811e8'

export default {
  data() {
    return {
      search: "",
    };
  },
  computed: {
    selectTokenDialog: {
      get() {
        return this.$store.state.selectTokenDialog;
      },
      set(value) {
        this.$store.commit("toggleSelectToken", value);
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.fromToken;
      },
      set(value) {
        this.$store.commit("setFromToken", value);
        this.selectTokenDialog = false;
      },
    },
    assets: {
      get() {
        // Mixin Mainnet
        if (this.$store.state.fromNetwork.asset_id == XINUUID) return assets.assets

        // Other Network
        return assets.assets.filter((item) => {
          return item.chain_id.match(this.$store.state.fromNetwork.asset_id);
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
  },
};
</script>

<style>
.dialog-css {
  width: 400px;
  max-width: 400px;
  min-height: 64px;
}
.v-dialog,
.border-css {
  border-radius: 20px !important;
}
.search-border {
  border-radius: 10px !important;
}
.select-token-css {
  font-size: 20px;
  font-style: italic;
}
</style>