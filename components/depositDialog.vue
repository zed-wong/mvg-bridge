<template>
  <v-dialog
    v-model="confirmDepositDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">Deposit</h1>
          <v-spacer />
          <v-btn icon @click="confirmDepositDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0" v-for="(item, i) in rows" :key="i">
          <span class="subtitle-css" v-if="item.name">
            {{ item.subtitle }}
          </span>

          <div class="d-flex flex-row align-center pt-1 mb-5" v-if="item.name">
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

            <v-icon
              v-if="item.addtoken"
              size="14px"
              class="ml-1"
              @click="addToken"
            >
              mdi-plus
            </v-icon>

            <v-icon
              v-if="item.copyable"
              size="14px"
              class="ml-1"
              @click="copyAddr(item.name)"
            >
              mdi-content-copy
            </v-icon>
          </div>
        </v-col>

        <v-col>
          <v-btn
            block
            x-large
            elevation="0"
            class="deposit-btn mt-2"
            @click="toggleQR"
          >
            {{ txQrBtnText }}
          </v-btn>
          <div
            class="d-flex justify-center mt-5 pa-4 align-center qr-area"
            v-if="txShowQR"
          >
            <span class="font-weight-light help-text">
              {{ txQrHelpText }}
            </span>
            <vue-qrcode
              :value="txQrUrl"
              :options="{ margin: 0, width: 100 }"
              class="mr-1"
            />
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { readNetworkAsset } from "mixin-node-sdk";
import { getContractByAssetID } from "../helpers/registry";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

export default {
  data() {
    return {
      search: "",
      txShowQR: false,
      txQrBtnText: "Show QR Code",
    };
  },
  components: {
    VueQrcode,
  },
  props: ["fromAmount"],
  computed: {
    confirmDepositDialog: {
      get() {
        return this.$store.state.confirmDepositDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmDeposit", value);
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
      },
    },
    depositAddr: {
      get() {
        return this.$store.state.depositAddr;
      },
    },

    txQrHelpText: {
      get() {
        if (this.selectedNetwork.asset_id == XINUUID)
          return "Please scan this QR Code through your Mixin Messenger";
        if (this.selectedNetwork.asset_id != XINUUID)
          return "Please transfer to this address from exchange or your wallet";
      },
    },
    txQrUrl: {
      get() {
        if (this.selectedNetwork.asset_id == XINUUID)
          return this.createMixinPayment();
        if (this.selectedNetwork.asset_id != XINUUID)
          return this.depositAddr[0];
      },
    },
    rows: {
      get() {
        return [
          {
            subtitle: "From",
            haveIcon: true,
            icon: this.selectedNetwork.icon_url,
            addtoken: false,
            copyable: false,
            name: this.selectedNetwork.name + " Mainnet",
          },
          {
            subtitle: "Token",
            haveIcon: true,
            icon: this.selectedToken.icon_url,
            addtoken: this.selectedToken.asset_id == XINUUID ? false : true,
            copyable: false,
            name: this.selectedToken.symbol,
          },
          {
            subtitle: "Amount",
            haveIcon: false,
            icon: "",
            addtoken: false,
            copyable: false,
            name: this.fromAmount + " " + this.selectedToken.symbol,
          },
          {
            subtitle: "Address",
            haveIcon: false,
            icon: "",
            addtoken: false,
            copyable: true,
            name:
              this.selectedNetwork.asset_id == XINUUID
                ? ""
                : this.depositAddr[0],
          },
          {
            subtitle: "Memo",
            haveIcon: false,
            icon: "",
            addtoken: false,
            copyable: true,
            name: this.selectedNetwork.asset_id == XINUUID ? '': (this.depositAddr[1] ? this.depositAddr[1] : ""),
          },
        ];
      },
    },
  },
  methods: {
    toggleQR() {
      this.txShowQR = !this.txShowQR;
      if (this.txShowQR == true) this.txQrBtnText = "Hide QR Code";
      if (this.txShowQR == false) this.txQrBtnText = "Show QR Code";
    },
    createMixinPayment() {
      let user = JSON.parse(localStorage.getItem("user"));
      return `mixin://pay?recipient=${user.client_id}&asset=${
        this.selectedToken.asset_id
      }&amount=${this.fromAmount}&trace=${uuidv4()}`;
    },
    async addToken() {
      let assetID = this.selectedToken.asset_id;
      if (assetID == XINUUID) return;
      let asset = await readNetworkAsset(assetID);
      let contractAddr = await getContractByAssetID(assetID);
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
      } catch (error) {
        console.log(error);
      }
    },
    copyAddr(value) {
      navigator.clipboard.writeText(value);
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
</style>