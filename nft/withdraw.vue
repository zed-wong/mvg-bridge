<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a style="color: #68778d; text-decoration: none" @click="mode = 0"
            ><span> {{ $t("deposit") }} </span></a
          >
          <a class="pl-6 font-weight-bold"
            ><span> {{ $t("withdraw") }} </span></a
          >
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center">
              <span class="mr-1 font-weight-light"> {{ $t("from") }} </span>
              <v-img
                :src="bridge"
                max-height="23px"
                max-width="20px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500">
                {{ $t("mvm_mainnet") }}
              </span>
            </div>

            <div class="d-flex flex-row align-center">
              <v-btn
                outlined
                elevation="0"
                min-height="56px"
                class="select-nft-btn my-3"
                @click.stop="selectNFT"
              >
                <v-avatar class="mr-1" v-if="selectedToken.token">
                  <v-img
                    v-if="selectedToken.token.icon"
                    :src="selectedToken.token.icon.url"
                    max-height="32px"
                    max-width="32px"
                  />
                </v-avatar>
                <span class="selected-nft-text" v-if="selectedToken.token"> {{ selectedToken.token.name }} </span>
                <span class="select-nft-text" v-else> {{ $t('select_a_nft') }} </span>
                <v-spacer />
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-token />
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-btn icon @click="mode = 0">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center mb-2">
              <span class="font-weight-light"> {{ $t("to") }} </span>
              <v-btn
                small
                depressed
                class="px-0"
                @click.stop="selectToNetworkDialog = true"
              >
                <v-img
                  class="ml-3"
                  max-width="20px"
                  max-height="20px"
                  :src="selectedNetwork.icon_url"
                />
                <span class="ml-2 selected-network font-weight-500">
                  {{ selectedNetwork.name }} {{ $t("mainnet") }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-network />
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1"> {{ $t('transaction_fee') }}: {{ transactionFee }} </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <connect-wallet :huge="true" v-if="!connected" />
          <mixin-oauth-dialog />
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="connected"
            @click="withdraw"
            :disabled="!withdrawAllowed"
            class="border-rounded main-btn white--text"
          >
            <span> {{ withdrawBtnText }} </span>
          </v-btn>
          <withdraw-dialog />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script>
import bridge from "~/static/bridge.png";
import { useOnboard } from "@web3-onboard/vue";
import withdrawDialog from "./withdrawDialog.vue";
import mixinOauthDialog from "../nft/mixinOauthDialog.vue";
import selectToToken from "~/nft/selectToToken.vue";
import selectToNetwork from "~/nft/selectToNetwork.vue";

export default {
  components: {
    withdrawDialog,
    mixinOauthDialog,
    selectToNetwork,
    selectToToken,
  },
  head() {
    return {
      title: this.$t("withdraw_nft"),
    }
  },
  layout: "index",
  data() {
    return {
      bridge,
      depositing: false,
    };
  },
  computed: {
    connected: {
      get() {
        return this.$store.state.connected;
      },
      set(n) {
        this.$store.commit("connect", n);
      },
    },
    mode: {
      get() {
        return this.$store.state.nft.mode;
      },
      set(n) {
        this.$store.commit("nft/setMode", n);
      },
    },
    selectToNetworkDialog: {
      get() {
        return this.$store.state.nft.selectToNetworkDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectToNetwork", value);
      },
    },
    selectToTokenDialog: {
      get() {
        return this.$store.state.nft.selectToTokenDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectToToken", value);
      },
    },
    selectedNetwork: {
      get() {
        return this.$store.state.nft.toNetwork;
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.nft.toToken;
      },
    },
    withdrawDialog: {
      get() {
        return this.$store.state.nft.withdrawDialog;
      },
      set(n) {
        this.$store.commit('nft/toggleWithdrawDialog', n);
      }
    },
    transactionFee: {
      get() {
        return '0';
      },
    },
    connectedChain() {
      return this.$store.state.chainId;
    },
    withdrawAllowed: {
      get() {
        return this.selectedToken.token != undefined && this.connectedChain === "0x120c7"
      }
    },
    withdrawBtnText: {
      get() {
        if (this.selectedToken.token == undefined) return this.$t('select_a_nft');
        if (this.connectedChain != "0x120c7") return this.$t('switch_to_mvm_first');
        return this.$t("withdraw");
      }
    }
  },
  mounted(){
    this.mvmBydefault()
  },
  methods: {
    selectNFT() {
      if (this.connected) {
          this.selectToTokenDialog = true
      }
    },
    withdraw() {
      this.mvmBydefault();
      this.withdrawDialog = true;
    },
    async mvmBydefault() {
      const { connectedWallet, setChain } = useOnboard()
      if (connectedWallet) {
        setChain({ wallet:connectedWallet.value.label, chainId:'0x120c7'})
      }
    },
  },
};
</script>

<style scoped>
.select-nft-btn {
  border: 0.1px solid;
  width: 266px;
  padding-left: 0px;
  background-color: white;
  border-radius: 12px !important;
}
.select-nft-text {
  opacity: 30%;
  font-size: 16px;
  font-weight: 400;
}
.selected-nft-text {
  font-size: 16px;
  font-weight: 500;
}
</style>