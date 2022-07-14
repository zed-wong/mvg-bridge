<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>

        <v-col class="mb-6 px-0" style="font-size: 24px">
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
              <v-btn
                small
                depressed
                class="px-0"
                @click.stop="selectNetworkDialog = true"
              >
                <v-img
                  class="ml-2"
                  max-width="20px"
                  max-height="20px"
                  :src="selectedNetwork.icon_url"
                />
                <span class="ml-2 selected-network font-weight-600">
                  {{ selectedNetwork.name }} Mainnet
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-network />
            </div>

            <div class="d-flex flex-row align-center">
              <v-text-field
                outlined
                placeholder="0.0"
                hide-details="true"
                v-model="fromAmount"
                class="from-form my-3 border-width"
              ></v-text-field>
              <v-btn
                outlined
                elevation="0"
                min-height="56px"
                class="select-token-btn border-width"
                @click.stop="selectTokenDialog = true"
              >
                <v-img :src="selectedToken.icon_url" max-height="24px" max-width="24px" class="mr-3" />
                <span class="mr-2" style="font-size:18px">
                  {{ selectedToken.symbol }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-token />
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
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
                max-height="21px"
                max-width="19px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-600"> MVM Mainnet </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1"> You will receive: {{ fromAmount != 0 ? fromAmount: 0 }} {{ selectedToken.symbol }} </span>
              <span class="mb-1" v-if="connected"> Balance: </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            
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
import bridge from "../static/bridge.png";
import selectToken from "../components/selectToken.vue";
import selectNetwork from "../components/selectNetwork.vue";

export default {
  components: {
    selectNetwork,
    selectToken,
  },
  data() {
    return {
      bridge,
      fromAmount: 0
    };
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
    selectTokenDialog: {
      get() {
        return this.$store.state.selectTokenDialog;
      },
      set(value) {
        this.$store.commit("toggleSelectToken", value);
      },
    },
    connected: {
      get() {
        return this.$store.state.connected;
      },
    },
    selectedNetwork: {
      get() {
        return this.$store.state.fromNetwork;
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.fromToken;
      }
    }
  },
  layout: "newbridge",
};
</script>

<style>
.border-rounded {
  border-radius: 12px;
}
.font-weight-600 {
  font-weight: 600;
}
.from-form {
  border-radius: 12px 0 0 12px;
}
.selected-network {
  font-size: 14px;
  line-height: normal; 
}
.arrow-down {
  color: #5959d8 !important;
}
.select-token-btn {
  min-height: 56px;
  border-radius: 0 12px 12px 0;
}
.border-width {
  border-width: 0.5px;
  border-left-width: 0px;
}
.v-btn {
  text-indent: 0;
  letter-spacing: 0;
  text-transform: none !important;
}
.v-btn:before {
  opacity: 0 !important;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #f1f4f9 !important;
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