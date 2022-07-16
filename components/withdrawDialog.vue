<template>
  <v-dialog
    v-model="confirmWithdrawDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">Confirm Withdraw</h1>
          <v-spacer />
          <v-btn icon @click="confirmWithdrawDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0" v-for="(item, i) in rows" :key="i">
          <div v-if="item.subtitle">
            <span class="subtitle-css">
              {{ item.subtitle }}
            </span>

            <div
              class="d-flex flex-row align-center pt-1 mb-5"
              v-if="!item.input"
            >
              <v-img
                v-if="item.haveIcon"
                :src="item.icon"
                max-height="16px"
                max-width="16px"
                class="mr-2"
              />
              <span class="main-title-css">
                {{ item.name }}
              </span>
            </div>

            <div class="d-flex flex-column mb-2" v-if="item.input">
              <v-text-field
                rounded
                class="my-3 withdraw-addr"
                v-model="item.value"
                :placeholder="item.placeholder"
                hide-details="true"
                clearable
              />
            </div>
          </div>
        </v-col>

        <v-col>
          <v-btn block x-large elevation="0" class="deposit-btn mt-2" @click="withdraw">
            Withdraw
          </v-btn>
          <v-btn block x-large elevation="0" class="metamask-pay-btn mt-5" v-if="txSupportMetamask" @click="newMetamaskTx">
            <v-avatar size="28px" class="mr-2">
              <v-img :src="MetamaskLogo" />
            </v-avatar>
            Pay with Metamask
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { readNetworkAsset } from "mixin-node-sdk";
import MetamaskLogo from "../static/metamask.png"
import { getContractByAssetID } from "../helpers/registry";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

export default {
  data() {
    return {
      MetamaskLogo,
      search: "",
      txShowQR: false,
      txQrBtnText: "Show QR Code",
      txAddress: "",
      txMemos: "",
    };
  },
  props: ["toAmount"],
  computed: {
    confirmWithdrawDialog: {
      get() {
        return this.$store.state.confirmWithdrawDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmWithdraw", value);
      },
    },
    selectedNetwork: {
      get() {
        return this.$store.state.toNetwork;
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.toToken;
      },
    },
    txSupportMetamask() {
      return this.$store.state.supportMetamaskNetworks.includes(
        this.selectedNetwork.symbol
      );
    },
    txToMixin() {
      return this.selectedNetwork.asset_id === XINUUID;
    },

    txQrUrl: {
      get() {
        if (this.selectedNetwork.asset_id == XINUUID)
          return this.createMixinPayment();
      },
    },
    txAddr: {
      get() {
        this.txAddress;
      },
      set(value) {
        this.txAddress = value;
      },
    },
    txMemo: {
      get() {
        this.txMemos;
      },
      set(value) {
        this.txMemos = value;
      },
    },
    rows: {
      get() {
        return [
          {
            subtitle: "To",
            haveIcon: true,
            icon: this.selectedNetwork.icon_url,
            name: this.selectedNetwork.name + " Mainnet",
          },
          {
            subtitle: "Token",
            haveIcon: true,
            icon: this.selectedToken.icon_url,
            name: this.selectedToken.symbol,
          },
          {
            subtitle: "Amount",
            haveIcon: false,
            icon: "",
            name: this.toAmount + " " + this.selectedToken.symbol,
          },
          {
            subtitle: this.txToMixin ? "Mixin ID" : "Address",
            haveIcon: false,
            icon: "",
            input: true,
            value: this.txAddr,
            placeholder: this.txToMixin
              ? "Please enter your Mixin ID or User ID"
              : "Please enter your wallet address",
          },
          {
            subtitle: "Memo",
            haveIcon: false,
            icon: "",
            input: true,
            value: this.txMemo,
            placeholder: "Optional",
          },
        ];
      },
    },
  },
  methods: {
    withdraw(){

    },
    newMetamaskTx(){

    },
  },
};
</script>

<style scoped>
.dialog-css {
  width: 400px;
  max-width: 400px;
  min-height: 64px;
}
.title-css {
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
}
.subtitle-css {
  font-size: 14px;
  font-weight: 400;
}
.main-title-css {
  font-size: 18px;
  font-weight: 500;
  word-break: break-all;
}
.deposit-btn {
  color: white !important;
  font-weight: 600;
  border-radius: 10px !important;
  background-color: #5959d8 !important;
}
.qr-area {
  background-color: #f4f7fa;
  border-radius: 10px !important;
}
.help-text {
  overflow-wrap: break-word;
}
.withdraw-addr {
  height: 55px;
  border-radius: 10px;
  background-color: #f4f7fa;
}
.metamask-pay-btn{
  color: white;
  background-color: #2979FF !important;
  border-radius: 10px;
}
</style>