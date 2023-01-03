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
          <h1 class="title-css">{{ $t("confirm_withdraw") }}</h1>
          <v-spacer />
          <v-btn icon @click="confirmWithdrawDialog = false">
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
                  :src="selectedToken.icon_url"
                  max-height="20px"
                  max-width="20px"
                  class="mr-2"
                />
                <span class="main-title-css">
                  {{ totalAmount }} {{ selectedToken.symbol }}
                </span>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column mb-2" v-if="txToMixin">
            <span class="subtitle-css">
              {{ $t("user_id") }}
            </span>
            <v-btn
              rounded
              class="my-3 withdraw-addr"
              elevation="0"
              color="#f4f7fa"
              height="55px"
              @click="connectMixinDialog = true"
              v-if="!mixinConnected"
            >
              <span> {{ $t("connect_to_mixin") }} </span>
            </v-btn>
            <v-text-field
              v-else
              rounded
              readonly
              :value="oauthUser.identity_number"
              hide-details="true"
              class="my-3 withdraw-addr"
              :placeholder="inputPlaceHolder[0]"
              append-icon="mdi-close"
              @click:append="resetOauth"
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
            <mixin-oauth-dialog />
          </div>

          <div class="d-flex flex-column mb-2" v-else>
            <span class="subtitle-css">
              {{ $t("address") }}
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
            :loading="txType1Sent"
            class="deposit-btn mt-2"
            @click="withdraw"
          >
            <span v-if="!txToMixin"> {{ $t("withdraw_to_address") }}</span>
            <span v-else> {{ $t("withdraw_to_mixin") }}</span>
          </v-btn>

          <v-btn
            block
            x-large
            elevation="0"
            :loading="txType2Sent"
            class="metamask-pay-btn mt-4"
            @click="withdraw('metamask')"
            v-if="txSupportMetamask"
          >
            <span class="ml-1"> {{ $t("withdraw_to_current_wallet") }}</span>
          </v-btn>
        </v-col>
      </v-row>
      <tx-confirmed :link="txExplorerURL" />
      <tx-failed :msg="txErrorText" />
    </v-sheet>
  </v-dialog>
</template>

<script>
import { ethers } from "ethers";
import { multiply, round } from "mathjs";
import { MixinClient } from "../helpers/mixin";
import { useOnboard } from "@web3-onboard/vue";
import ASSETABI from "../assets/assetABI.json";
import BRIDGEABI from "../assets/bridgeABI.json";
import MetamaskLogo from "../static/metamask.png";
import { validate as validateUUID } from "uuid";
import {
  DECIMAL,
  getExtra,
  bridgeAddress,
  getContractByAssetID,
  getUserProxyContract,
  mvmProvider,
} from "../helpers/registry";
import txConfirmed from "./txConfirmed.vue";
import mixinOauthDialog from "./mixinOauthDialog.vue";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";
const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";
const ExplorerBaseURL = process.env.EXPLORER_BASEURL;

export default {
  components: { txConfirmed, mixinOauthDialog },
  data() {
    return {
      MetamaskLogo,
      search: "",

      txAddress: "",
      txMemo: "",
      // tx state
      txType1Sent: false,
      txType2Sent: false,
      txConfirmed: false,
      txSucceed: false,
      txExplorerURL: "",
      txErrorText: "",
    };
  },
  props: ["toAmount", "totalAmount", "fee"],
  computed: {
    confirmWithdrawDialog: {
      get() {
        return this.$store.state.confirmWithdrawDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmWithdraw", value);
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
    txFailedDialog: {
      get() {
        return this.$store.state.txFailedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxFailedDialog", value);
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
    userAddress() {
      return this.$store.state.userAddress;
    },
    txSupportMetamask() {
      return this.$store.state.supportMetamaskNetworks.includes(
        this.selectedNetwork.symbol
      );
    },
    txToMixin() {
      return this.selectedNetwork.asset_id === XINUUID;
    },
    inputPlaceHolder() {
      return [
        this.txToMixin
          ? this.$t("please_enter_recipient_user_id")
          : this.$t("please_enter_your_wallet_address"),
        this.$t("optional"),
      ];
    },
    connectMixinDialog: {
      get() {
        return this.$store.state.connectMixinDialog;
      },
      set(value) {
        this.$store.commit("toggleConnectMixin", value);
      },
    },
    mixinConnected: {
      get() {
        return this.$store.state.mixinConnected;
      },
      set(value) {
        this.$store.commit("connectMixin", value);
      },
    },
    oauthUser: {
      get() {
        return this.$store.state.oauthUser;
      },
      set(value) {
        this.$store.commit("setOauthUser", value)
      }
    },
  },
  watch: {
    oauthUser(n) {
      if (n.user_id) this.txAddress = n.user_id;
    },
    confirmWithdrawDialog() {
      if (localStorage.getItem('oauth_user')) {
        let u = JSON.parse(localStorage.getItem('oauth_user'))
        this.mixinConnected = true;
        this.oauthUser = u;
      }
    }
  },
  methods: {
    async withdraw(type) {
      try {
        if (this.selectedNetwork.asset_id == XINUUID) {
          this.txType1Sent = true;
          await this.mixinWithdraw();
          this.txType1Sent = false;
          this.confirmWithdrawDialog = false;
          this.txSucceedDialog = true;
          return;
        }
        if (type == "metamask") {
          this.txType2Sent = true;
          await this.externalWithdraw("metamask");
          this.txType2Sent = false;
          this.confirmWithdrawDialog = false;
          this.txSucceedDialog = true;
          return;
        }
        this.txType1Sent = true;
        await this.externalWithdraw("");
        this.txType1Sent = false;
        this.confirmWithdrawDialog = false;
        this.txSucceedDialog = true;
      } catch (error) {
        console.log(error);
        this.txType1Sent = false;
        this.txType2Sent = false;
        this.confirmWithdrawDialog = false;
        this.txErrorText = error;
        this.txFailedDialog = true;
      }
    },
    async mixinWithdraw() {
      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();

      let mixinExtra = await this.getMixinExtra(this.txAddress, this.txMemo);
      if (mixinExtra === undefined) {
        throw new Error("Failed to get Mixin user");
      }

      let txValue = formatAmount(this.toAmount, this.selectedToken.asset_id);

      let userContractAddr = await getUserProxyContract(this.userAddress);

      let txResult;
      if (this.selectedToken.asset_id === ETHUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(userContractAddr, mixinExtra, {
          value: txValue,
          gasPrice: await mvmProvider.getGasPrice(),
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
          { gasPrice: await mvmProvider.getGasPrice() }
        );
      }
      this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
    },

    async externalWithdraw(type) {
      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();
      let txaddr =
        type == "metamask" ? await signer.getAddress() : this.txAddress;
      let extra = await this.getExternalExtra(
        txaddr,
        this.txMemo,
        this.toAmount
      );
      let txAmount = formatAmount(
        this.totalAmount,
        this.selectedToken.asset_id
      );
      let userContractAddr = await getUserProxyContract(this.userAddress);
      let txResult;

      if (this.selectedToken.asset_id === ETHUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(userContractAddr, extra, {
          value: txAmount,
          gasPrice: await mvmProvider.getGasPrice(),
          gasLimit: 350000,
        });
        console.log(txResult);
        this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
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
          txAmount,
          extra,
          { gasPrice: await mvmProvider.getGasPrice(), }
        );
        console.log(txResult);
        this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
      }
    },

    async getMixinExtra(user_id, memo) {
      let userID = String(user_id).trim();

      if (!validateUUID(userID)) {
        let user = await MixinClient.user.fetch(userID);
        console.log(user);
        userID = user.user_id;
      }
      if (userID === undefined) return undefined;
      return "0x" + getExtra(userID, memo);
    },
    async getExternalExtra(to, memo, amount) {
      let withdrawPayload = JSON.stringify({ t: to, m: memo, a: amount });
      let payloads = {
        receivers: [process.env.WITHDRAWAL_GATEWAY_BOT_ID],
        threshold: 1,
        extra: btoa(withdrawPayload),
      };
      console.log(payloads, withdrawPayload);
      let externalExtra = await this.$axios.post(
        "https://bridge.mvm.dev/extra",
        payloads
      );
      return "0x" + externalExtra.data.extra;
    },
    resetOauth() {
      this.mixinConnected = false;
    }
  },
};

function formatAmount(amount, asset_id) {
  let realAmount = amount.replaceAll(',','')
  if (asset_id === ETHUUID) {
    return ethers.utils.parseEther(Number(realAmount).toFixed(8));
  }
  return round(multiply(realAmount, DECIMAL));
}

function formatError(error) {
  // TODO
  try {
    if (error.message) {
      if (error.includes("User denied transaction signature"))
        return this.$t("transaction_rejected");
      if (error.includes("resolver or addr is not configured for ENS name"))
        return this.$t("insufficient_eth_balance_for_gas");
      if (error.includes("Failed to get Mixin user"))
        return this.$t("failed_to_get_mixin_user");
    }
    return error.message;
  } catch (err) {
    console.log(err);
    return error;
  }
}
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
.metamask-pay-btn {
  color: white;
  font-weight: 600;
  background-color: #2979ff !important;
  border-radius: 10px;
}
</style>