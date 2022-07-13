<template>
  <v-dialog v-model="selectNetworkDialog" class="dialog-css" max-width="350px" max-height="600px">
    <v-sheet class="align-self-start px-9 pt-8">
      <v-row class="d-flex flex-column">
        <v-col class="align-center d-flex flex-row pr-0">
          <h1 class="select-network-css">Select Network</h1>
          <v-spacer />
          <v-btn icon @click="selectNetworkDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="pt-4 px-2">
          <v-text-field
            dense
            outlined
            class="search-border"
            hide-details="true"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search network name"
          />
        </v-col>
        <v-col class="pt-2 px-0">
          <v-list class="overflow-y-auto">
            <v-list-item-group>
              <v-list-item v-for="(item, i) in chains" :key="i" class="px-2" @click="selectedNetwork = item" style="border-radius: 10px">
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

export default {
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
        return this.$store.state.fromNetwork;
      },
      set(value) {
        this.$store.commit("setFromNetwork", value);
        this.selectNetworkDialog = false;
      }
    },
    chains: {
      get() {
        return chains
      }
    }
  },
};
</script>

<style>
.dialog-css {
  width: 400px;
  max-width: 400px;
  min-height: 64px;
  max-height: 600px;
}
.v-dialog,
.border-css {
  border-radius: 20px !important;
}
.search-border {
  border-radius: 10px !important;
}
.select-network-css {
  font-size: 20px;
  font-style: italic;
}
</style>