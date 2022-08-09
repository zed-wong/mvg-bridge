<template>
  <v-dialog
    v-model="depositDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8 nft-background">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">{{ $t("confirm_deposit") }}</h1>
          <v-spacer />
          <v-btn icon @click="depositDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-3" v-if="selectedToken.token_info">
          <div class="d-flex justify-center pt-1 mb-5">
            <v-img
              :src="selectedToken.token_info.meta.media_url"
              max-height="128px"
              max-width="128px"
            />
          </div>
          <div class="d-flex flex-column text-center">
            <span class="main-title-css">
              {{ selectedToken.token_info.meta.name }}
            </span>
            <span>
              {{ selectedToken.token_info.meta.group }}
            </span>
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
            <v-col class="d-flex flex-grow-1" v-if="txLoaded">
              <span class="font-weight-light help-text">
                {{ txQrHelpText }}
              </span>
            </v-col>
            <v-col class="d-flex flex-grow-0" v-if="txLoaded">
              <vue-qrcode
                :value="txQrUrl"
                :options="{ margin: 0, width: 100 }"
                class="mr-1"
              />
            </v-col>
            <v-col class="d-flex justify-center" v-if="!txLoaded">
              <v-progress-circular indeterminate color="primary" />
            </v-col>
          </div>
        </v-col>
      </v-row>
      <tx-confirmed :link="txExplorerURL" />
    </v-sheet>
  </v-dialog>
</template>

<script>
import { OldClient } from "../helpers/mixin";
import { getSignedByToken, getUserID } from "../helpers/nft";
import { createCollectibleRequest } from "mixin-node-sdk";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";
const ExplorerBaseURL = process.env.EXPLORER_BASEURL;

export default {
  components: {
    VueQrcode,
  },
  data() {
    return {
      txQrUrl: "",
      txShowQR: false,
      txLoaded: false,
      txQrBtnText: this.$t("show_qrcode"),
    };
  },
  computed: {
    depositDialog: {
      get() {
        return this.$store.state.nft.depositDialog;
      },
      set(n) {
        this.$store.commit("nft/toggleDepositDialog", n);
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
    userAddress: {
      get() {
        return this.$store.state.userAddress;
      },
    },
    txExplorerURL: {
      get() {
        return (
          ExplorerBaseURL + "address/" + this.userAddress + "/token-transfers"
        );
      },
    },
    txQrHelpText: {
      get() {
        if (this.selectedNetwork.asset_id == XINUUID)
          return this.$t("please_scan_qr_with_your_mixin_messenger");
        if (this.selectedNetwork.asset_id != XINUUID)
          return this.$t("please_transfer_to_this_address_from_your_wallet");
      },
    },
    txSucceedDialog: {
      get() {
        return this.$store.state.txSucceedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxSucceedDialog", value);
      },
    },
    tokens: {
      get() {
        return this.$store.state.nft.nfts;
      },
      set(n) {
        this.$store.commit("nft/setNFTs", n);
      },
    },
  },
  watch: {
    depositDialog(o, n) {
      if (n == false) {
        this.txShowQR = false;
        this.txLoaded = false;
        this.txQrBtnText = this.$t("show_qrcode");
      }
    },
  },
  methods: {
    async toggleQR() {
      this.txShowQR = !this.txShowQR;
      if (this.txShowQR == true) this.txQrBtnText = this.$t("hide_qrcode");
      if (this.txShowQR == false) {
        this.txQrBtnText = this.$t("show_qrcode");
        return;
      }
      this.txLoaded = false;
      try {
        this.txQrUrl = await this.createTx(this.selectedToken);
        this.loopPaymentState(this.selectedToken);
      } catch (error) {
        console.error(error);
        return;
      }
      this.txLoaded = true;
    },
    async createTx(output) {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;
      const token = output.token_info;
      const user = JSON.parse(localStorage.getItem("user"));
      const receivers = [user.client_id];
      const signedTx = await OldClient.makeCollectibleTransactionRaw({
        output,
        token,
        receivers,
        threshold: 1,
      });
      const createRes = await createCollectibleRequest(
        accessToken,
        "sign",
        signedTx
      );
      const url = `https://mixin.one/codes/${createRes.code_id}`;
      console.log(url);
      return url;
    },
    async getPaymentState(output, userID, accessToken) {
      const outputs = await getSignedByToken(accessToken, userID);
      if (outputs.length == 0) return;
      outputs.forEach(async (element) => {
        await OldClient.sendRawTransaction(element.signed_tx);
        if (element.output_id === output.output_id) {
          this.depositDialog = false;
          this.txSucceedDialog = true;
          // TODO: refresh token list
          return;
        }
      });
    },
    async loopPaymentState(output) {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;
      const userID = await getUserID(accessToken);
      while (true) {
        if (!this.txShowQR) return;
        if (!this.depositDialog) return;
        await this.getPaymentState(output, userID, accessToken);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
  },
};
</script>

<style scoped>
.subtitle-css {
  font-size: 14px;
  font-weight: 400;
}
</style>