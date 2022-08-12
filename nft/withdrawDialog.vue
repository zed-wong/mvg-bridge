<template>
  <v-dialog
    v-model="withdrawDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">{{ $t("confirm_withdraw") }}</h1>
          <v-spacer />
          <v-btn icon @click="withdrawDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <div class="py-0">
            <div>
              <span class="subtitle-css"> {{ $t("to") }} </span>

              <div class="d-flex flex-row align-center pt-1 mb-5">
                <v-img
                  :src="selectedNetwork.icon_url"
                  max-height="20px"
                  max-width="20px"
                  class="mr-2"
                />
                <span class="main-title-css">
                  {{ selectedNetwork.name }} {{ $t("mainnet") }}
                </span>
              </div>
            </div>
          </div>
          <div class="py-0">
            <div>
              <span class="subtitle-css"> {{ $t("token") }} </span>
              <div class="d-flex flex-row align-center pt-1 mb-5">
                <v-img
                  :src="selectedToken"
                  max-height="20px"
                  max-width="20px"
                  class="mr-2"
                />
                <span class="main-title-css">
                  {{ selectedToken }}
                </span>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column mb-2">
            <span class="subtitle-css">
              {{ this.txToMixin ? $t("user_id") : $t("address") }}
            </span>
            <v-text-field
              rounded
              clearable
              v-model="txAddress"
              hide-details="true"
              class="my-3 withdraw-addr"
              :placeholder="inputPlaceHolder[0]"
            />
            <span class="subtitle-css"> {{ $t("memo") }} </span>
            <v-text-field
              rounded
              clearable
              v-model="txMemo"
              hide-details="true"
              class="my-3 withdraw-addr"
              :placeholder="inputPlaceHolder[1]"
            />
          </div>
        </v-col>

        <v-col>
          <v-btn
            block
            x-large
            elevation="0"
            :loading="txSent"
            class="deposit-btn mt-2"
            @click="withdraw"
          >
            <span v-if="!txToMixin"> {{ $t("withdraw_to_address") }}</span>
            <span v-else> {{ $t("withdraw_to_mixin") }}</span>
          </v-btn>
        </v-col>
      </v-row>
      <tx-confirmed :link="txExplorerURL" />
      <tx-failed />
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
      txMemo: "",
      txSent: false,
      txQrUrl: "",
      txAddress: "",
    };
  },
  computed: {
    withdrawDialog: {
      get() {
        return this.$store.state.nft.withdrawDialog;
      },
      set(n) {
        this.$store.commit("nft/toggleWithdrawDialog", n);
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
    txSucceedDialog: {
      get() {
        return this.$store.state.txSucceedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxSucceedDialog", value);
      },
    },
    txToMixin() {
      return this.selectedNetwork.asset_id === XINUUID;
    },
    tokens: {
      get() {
        return this.$store.state.nft.nfts;
      },
      set(n) {
        this.$store.commit("nft/setNFTs", n);
      },
    },
    inputPlaceHolder() {
      return [
        this.txToMixin
          ? this.$t("please_enter_recipient_user_id")
          : this.$t("please_enter_your_wallet_address"),
        this.$t("optional"),
      ];
    },
  },
  methods: {
    async withdraw() {
      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();

      let mixinExtra = await this.getMixinExtra(this.txAddress, this.txMemo);
      if (mixinExtra === undefined) {
        console.error("[403] Get Mixin User Failed");
        return;
      }

      let txValue = formatAmount(this.toAmount, this.selectedToken.asset_id);

      let userContractAddr = await this.getUserProxyContract(this.userAddress);

      let txResult;
      if (this.selectedToken.asset_id === ETHUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(userContractAddr, mixinExtra, {
          value: txValue,
          gasPrice: 10000000, // 0.01 Gwei
          gasLimit: 350000,
        });
      } else {
        let assetContractAddr = await getContractByAssetID(
          this.selectedToken.asset_id
        );
        let tokenContract = new ethers.Contract(
          assetContractAddr,
          ASSETABI,
          signer
        );

        txResult = await tokenContract.transferWithExtra(
          userContractAddr,
          txValue,
          mixinExtra,
          { gasPrice: 10000000 }
        );
      }
      this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
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