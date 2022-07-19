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
          <div class="py-0" v-for="(item, i) in rows" :key="i">
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
                  max-height="20px"
                  max-width="20px"
                  class="mr-2"
                />
                <span class="main-title-css">
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mb-2">
            <span class="subtitle-css">
              {{ this.txToMixin ? "Mixin ID" : "Address" }}
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
            <span class="ml-1"> Withdraw to Metamask</span>
          </v-btn>
        </v-col>
      </v-row>
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

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

export default {
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
      txErrorText: "",
    };
  },
  props: ["toAmount", "fee"],
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
            name: this.toAmount + " " + this.selectedToken.symbol,
          },
        ];
      },
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
      // Check if To Network is mixin mainnet
      // True, deposit to Mixin
      //  call mixin withdraw
      // False, Call withdrawal contract to withdraw
      //  call external withdraw
      try {
        if (this.selectedNetwork.asset_id == XINUUID) {
          this.txType1Sent = true;
          await this.mixinWithdraw();
          this.txType1Sent = false;
          return;
        }
        if (type == "metamask") {
          this.txType2Sent = true;
          let trace = await this.externalWithdraw("metamask", 0, "");
          await this.externalWithdraw("metamask", 1, trace);
          this.txType2Sent = false;
          return;
        }
        this.txType1Sent = true;
        let trace = await this.externalWithdraw("", 0, "");
        await this.externalWithdraw("", 1, trace);
        this.txType1Sent = false;
      } catch (error) {
        console.log(error);
        this.txType1Sent = false;
        this.txType2Sent = false;
        this.confirmWithdrawDialog = false;
      }
    },
    async mixinWithdraw() {
      // 1. construct mixin extra payload   (user_id, memo, threshold, extra)
      // 1.1 if (user_id is uuid) get user_id
      // 1.2 get api, return extra
      // 2. construct metamask transfer payload  (asset_contract, user_contract, extra, amount)
      // 2.1 init asset and bridge contract
      // 3. call contract
      // 3.1 if (asset_id == xinuuid) call bridge contract
      // 3.2 call asset contract
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
      // try {
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

        console.log(userContractAddr, txValue, mixinExtra);

        txResult = await tokenContract.transferWithExtra(
          userContractAddr,
          txValue,
          mixinExtra
        );
        console.log(txResult);
      }
      // } catch (error) {
      //   console.log(error);
      // }
    },

    async externalWithdraw(type, step, oldTrace) {
      // 0. Open transfer withdraw asset dialog
      // 1. call bridge or asset, transfer withdrawal asset (trace:A)
      // 2. Open transfer withdraw fee dialog
      // 3. call bridge or asset, transfer fee asset (trace:B)

      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();
      console.log(connectedWallet, signer);
      // try {
      let txaddr =
        type == "metamask" ? await signer.getAddress() : this.txAddress;
      let txAmount = formatAmount(this.toAmount, this.selectedToken.asset_id);
      let traceID = step === 0 ? uuidV4() : oldTrace;
      let ma = await this.getExternalExtra(txaddr, this.txMemo, traceID + ":A");
      let txResult;

      if (step == 1) {
        let feeAmount = formatAmount(this.fee, this.selectedToken.chain_id);
        let mb = await this.getExternalExtra(
          txaddr,
          this.txMemo,
          traceID + ":B"
        );

        let assetContractAddr = await getContractByAssetID(
          this.selectedToken.chain_id
        );
        let tokenContract = new ethers.Contract(
          assetContractAddr,
          ASSETABI,
          signer
        );

        txResult = await tokenContract.transferWithExtra(
          assetContractAddr,
          feeAmount,
          mb
        );
        console.log(txResult);
      }

      // If step 0
      if (this.selectedToken.asset_id === XINUUID) {
        let tokenContract = new ethers.Contract(
          bridgeAddress,
          BRIDGEABI,
          signer
        );
        txResult = await tokenContract.release(txaddr, ma, {
          value: txAmount,
          gasLimit: 350000,
        });
        console.log(txResult);
        return traceID;
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
          assetContractAddr,
          txAmount,
          ma
        );
        console.log(txResult);
        return traceID;
      }
      // } catch (error) {
      //   console.log(error);
      // }
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
    async getExternalExtra(destination, tag, extra) {
      let payload = {
        destination: destination,
        tag: tag,
        extra: extra,
      };
      let externalExtra = await this.$axios.post(
        "https://bridge.mvm.dev/extra",
        payload
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