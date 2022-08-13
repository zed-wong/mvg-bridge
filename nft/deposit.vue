<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a class="pr-6 font-weight-bold"
            ><span> {{ $t("deposit") }} </span></a
          >
          <a style="color: #68778d; text-decoration: none" @click="mode = 1"
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
              <v-btn
                small
                depressed
                class="px-0"
                @click.stop="selectFromNetworkDialog = true"
              >
                <v-img
                  class="ml-2"
                  max-width="20px"
                  max-height="20px"
                  :src="selectedNetwork.icon_url"
                />
                <span class="ml-2 selected-network font-weight-500">
                  {{ selectedNetwork.name }} {{ $t("mainnet") }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-from-network />
            </div>

            <div class="d-flex flex-row align-center">
              <v-btn
                outlined
                elevation="0"
                min-height="56px"
                class="select-nft-btn my-3"
                @click.stop="selectNFT"
              >
                <v-avatar v-if="selectedToken.token_info" class="mr-1">
                  <v-img
                    :src="selectedToken.token_info.meta.media_url"
                    max-height="32px"
                    max-width="32px"

                  />
                </v-avatar>
                <span class="selected-nft-text" v-if="selectedToken.token_info"> {{ selectedToken.token_info.meta.name }} </span>
                <span class="select-nft-text" v-else> {{ $t('select_a_nft') }} </span>
                <v-spacer />
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-from-token />
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-btn icon @click="mode = 1">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex flex-row mb-2">
              <span class="font-weight-light"> {{ $t("to") }} </span>
              <v-img
                :src="bridge"
                max-height="23px"
                max-width="20px"
                class="ml-3"
              >
              </v-img>
              <span class="ml-2 font-weight-500">
                {{ $t("mvm_mainnet") }}
              </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1"> {{ $t('transaction_fee') }}: {{ transactionFee }} </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <connect-wallet :huge="true" v-if="!connected" />
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="isFromMixin ? !mixinConnected && connected : false"
            @click.stop="connectMixinDialog = true"
            :loading="depositing"
            class="border-rounded main-btn white--text"
          >
            <span> {{ $t("connect_to_mixin") }} </span>
          </v-btn>
          <mixin-oauth-dialog />
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="isFromMixin ? mixinConnected && connected : connected"
            @click="deposit"
            :loading="depositing"
            :disabled="selectedToken.token_id == undefined"
            class="border-rounded main-btn white--text"
          >
            <span> {{ $t("deposit") }} </span>
          </v-btn>
          <deposit-dialog />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script>
import bridge from "~/static/bridge.png";
import depositDialog from "../nft/depositDialog.vue"
import mixinOauthDialog from "../nft/mixinOauthDialog.vue";
import selectFromToken from "~/nft/selectFromToken.vue";
import selectFromNetwork from "~/nft/selectFromNetwork.vue";

export default {
  components: {
    depositDialog,
    mixinOauthDialog,
    selectFromNetwork,
    selectFromToken,
  },
  head() {
    return {
      title: this.$t("deposit_nft"),
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
    mixinConnected: {
      get() {
        return this.$store.state.nft.mixinConnected;
      },
      set(n) {
        this.$store.commit("nft/connectMixin", n);
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
    connectMixinDialog: {
      get() {
        return this.$store.state.nft.connectMixinDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleConnectMixin", value);
      },
    },
    selectFromNetworkDialog: {
      get() {
        return this.$store.state.nft.selectFromNetworkDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectNetwork", value);
      },
    },
    selectFromTokenDialog: {
      get() {
        return this.$store.state.nft.selectFromTokenDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectToken", value);
      },
    },
    selectedNetwork: {
      get() {
        return this.$store.state.nft.fromNetwork;
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.nft.fromToken;
      },
    },
    depositDialog: {
      get() {
        return this.$store.state.nft.depositDialog
      },
      set(n) {
        this.$store.commit('nft/toggleDepositDialog', n)
      }
    },
    isFromMixin: {
      get() {
        return this.selectedNetwork.symbol == "XIN";
      },
    },
    transactionFee: {
      get() {
        return this.isFromMixin ? 0 : "WIP";
      },
    },
  },
  methods: {
    selectNFT() {
      if (this.connected) {
        this.mixinConnected
          ? (this.selectFromTokenDialog = true)
          : (this.connectMixinDialog = true);
      }
    },
    deposit() {
      this.depositDialog = true;
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