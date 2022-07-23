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
        <v-col>
          <div class="py-0">
            <div>
              <span class="subtitle-css"> To </span>

              <div class="d-flex flex-row align-center pt-1 mb-5">
                <v-img
                  :src="selectedNetwork.icon_url"
                  max-height="20px"
                  max-width="20px"
                  class="mr-2"
                />
                <span class="main-title-css">
                  {{ selectedNetwork.name }} Mainnet
                </span>
              </div>
            </div>
          </div>
          <div class="py-0">
            <div>
              <span class="subtitle-css"> Token </span>
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

          <div class="d-flex flex-column mb-2">
            <span class="subtitle-css">
              {{ this.txToMixin ? "User ID" : "Address" }}
            </span>
            <v-text-field
              rounded
              clearable
              v-model="txAddress"
              hide-details="true"
              class="my-3 withdraw-addr"
              :placeholder="inputPlaceHolder[0]"
            />
            <span class="subtitle-css"> Memo </span>
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
            <span v-if="!txToMixin"> Withdraw to address</span>
            <span v-else> Withdraw to Mixin</span>
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
            <v-avatar size="24px">
              <v-img :src="MetamaskLogo" />
            </v-avatar>
            <span class="ml-1"> Withdraw to current wallet</span>
          </v-btn>
        </v-col>
      </v-row>
      <tx-confirmed :link="txExplorerURL"/>
      <tx-failed />
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
import { validate as validateUUID, v4 as uuidV4 } from "uuid";
import {
  DECIMAL,
  bridgeAddress,
  getContractByAssetID,
} from "../helpers/registry";
import txConfirmed from './txConfirmed.vue';

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";
const ExplorerBaseURL = "https://scan.mvm.dev/tx/"

export default {
  components: { txConfirmed },
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
          ? "Please enter recipient's Mixin User ID"
          : "Please enter your wallet address",
        "Optional",
      ];
    },
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
        console.error("[403] Get Mixin User Failed");
        return;
      }

      let txValue = formatAmount(this.toAmount, this.selectedToken.asset_id);

      let userContractAddr = await this.getUserProxyContract(this.userAddress);

      let txResult;
      if (this.selectedToken.asset_id === XINUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(userContractAddr, mixinExtra, {
          value: txValue,
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
          mixinExtra
        );
      }
      this.txExplorerURL = ExplorerBaseURL+txResult.hash
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
      let userContractAddr = await this.getUserProxyContract(this.userAddress);
      let txResult;

      if (this.selectedToken.asset_id === XINUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(userContractAddr, extra, {
          value: txAmount,
          gasLimit: 350000,
        });
        console.log(txResult);
        this.txExplorerURL = ExplorerBaseURL+txResult.hash
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
          extra
        );
        console.log(txResult);
        this.txExplorerURL = ExplorerBaseURL+txResult.hash
      }
    },

    async getMixinExtra(user_id, memo) {
      let userID = String(user_id).trim();

      if (!validateUUID(userID)) {
        let user = await MixinClient.searchUser(userID);
        console.log(user);
        userID = user.user_id;
      }
      if (userID === undefined) return undefined;
      let payloads = {
        receivers: [userID],
        threshold: 1,
        extra: memo,
      };
      let mixinExtra = await this.$axios.post(
        "https://bridge.mvm.dev/extra",
        payloads
      );
      return "0x" + mixinExtra.data.extra;
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
    async getUserProxyContract(userAddr) {
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: ethers.utils.getAddress(userAddr),
      });
      return result.data.user.contract ? result.data.user.contract : "";
    },
  },
};

function formatAmount(amount, asset_id) {
  if (asset_id === XINUUID) {
    return ethers.utils.parseEther(Number(amount).toFixed(8));
  }
  return round(multiply(amount, DECIMAL));
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