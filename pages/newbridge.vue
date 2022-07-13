<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column">
        <v-col class="mb-6" style="font-size: 24px">
          <a class="pr-6 font-weight-bold"><span> Deposit </span></a>
          <a><span> Withdraw </span></a>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center">
              <span class="mr-1 font-weight-light"> From </span>

              <v-btn depressed small @click.stop="selectNetworkDialog = true">
                <v-img :src="asset_icon"> </v-img>
                <span> Ethereum Mainnet </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-network />
            </div>
            <v-text-field
              class="from-form my-3"
              outlined
              hide-details="true"
            ></v-text-field>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0">
          <v-btn
            depressed
            elevation="0"
            class="pa-0"
            style="background-color: transparent"
          >
            <v-icon color="#5959d8"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex flex-row mb-2">
              <span class="font-weight-light"> To </span>
              <v-img
                :src="bridge"
                max-height="22px"
                max-width="20px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500"> MVM Mainnet </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1"> You will receive:</span>
              <span class="mb-1" v-if="connected"> Balance: </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="pt-5 px-0">
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            :disabled="!connected"
            class="border-rounded main-btn white--text"
          >
            <span v-if="connected"> Deposit </span>
            <span v-else> Connect Wallet </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script lang="">
import selectNetwork from "../components/selectNetwork.vue"
import bridge from "../static/bridge.png";

export default {
  components:{
    selectNetwork
  },
  data() {
    return {
      bridge,
    };
  },
  computed: {
    selectNetworkDialog: {
      get(){
        return this.$store.state.selectNetworkDialog;
      },
      set(value){
        this.$store.commit("toggleSelectNetwork", value);
      }
    },
  },
  layout: "newbridge",
};
</script>

<style>
.border-rounded {
  border-radius: 12px;
}
.font-weight-500 {
  font-weight: 500;
}
.from-form {
  border-radius: 12px 0 0 12px;
}
.v-btn {
  text-transform: none !important;
}
.v-btn:before {
  opacity: 0 !important;
}
.v-btn.v-tbn--block.v-btn--disabled {
  background-color: #f1f4f9;
}
.v-ripple__container {
  opacity: 0 !important;
}
.main-btn {
  font-size: 18px;
  font-weight: 700;
  height: 60px !important;
}
</style>