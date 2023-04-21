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
              <div
                class="d-flex flex-row align-center pt-1 mb-5"
                v-if="selectedToken.token"
              >
                <v-avatar size="20" class="mr-2">
                  <img
                    v-if="selectedToken.token.icon"
                    :src="selectedToken.token.icon.url"
                    max-height="20px"
                    max-width="20px"
                  />
                </v-avatar>
                <span class="main-title-css">
                  {{ selectedToken.token.name }}
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
import { ethers } from "ethers";
import ERC721ABI from "../assets/erc721.json";
import { MixinClient } from "../helpers/mixin";
import { useOnboard } from "@web3-onboard/vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { validate as validateUUID } from "uuid";
import { mirrorAddress, getUserProxyContract, getExtra, mvmProvider } from "../helpers/registry";
import { XINUUID } from '~/helpers/constants';

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
      txExplorerURL: "",
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
    txSucceedDialog: {
      get() {
        return this.$store.state.txSucceedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxSucceedDialog", value);
      },
    },
    txFailedDialog: {
      get() {
        return this.$store.state.txFailedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxFailedDialog", value);
      },
    },
  },
  methods: {
    async withdraw() {
      try{
        this.txSent = true;
        this.txSucceedDialog = false;
        this.txFailedDialog = false;
        await this.mixinWithdraw();
        this.txSucceedDialog = true;
        this.withdrawDialog = false;
        this.txSent = false;
      } catch (error){
        console.log(error);
        this.txSucceedDialog = false;
        this.txFailedDialog = true;
        this.withdrawDialog = false;
        this.txSent = false;
      }
    },

    async mixinWithdraw() {
      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      const signer = provider.getSigner();
      const mixinExtra = await this.getMixinExtra(this.txAddress, this.txMemo);
      if (mixinExtra === undefined) {
        console.error("[403] Get Mixin User Failed");
        return;
      }
      const contract = new ethers.Contract(
        this.selectedToken.address,
        ERC721ABI,
        signer
      );
      const proxyAddress = await getUserProxyContract(this.userAddress);
      const txResult = await contract['safeTransferFrom(address,address,uint256,bytes)'](
        this.userAddress,
        mirrorAddress,
        this.selectedToken.tokenId,
        proxyAddress+mixinExtra,
        { 
          gasPrice: await mvmProvider.getGasPrice(),
          gasLimit: 350000,
        }
      );

      this.txExplorerURL = process.env.EXPLORER_BASEURL + "tx/" + txResult.hash;
    },
    async getMixinExtra(user_id, memo) {
      let userID = String(user_id).trim();

      if (!validateUUID(userID)) {
        let user = await MixinClient.user.fetch(userID);
        userID = user.user_id;
      }
      if (userID === undefined) return undefined;  
      // without 0x prefix !!!
      return getExtra(userID, memo);
    },
  },
};
</script>

<style scoped>
.subtitle-css {
  font-size: 14px;
  font-weight: 400;
}
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
.metamask-pay-btn {
  color: white;
  font-weight: 600;
  background-color: #2979ff !important;
  border-radius: 10px;
}
</style>