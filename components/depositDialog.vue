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
          <h1 class="title-css">{{ $t("confirm_deposit") }}</h1>
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
          <v-btn
            block
            x-large
            elevation="0"
            v-if="supportsMetamask"
            :loading="txSent"
            class="metamask-pay-btn mt-4"
            @click="deposit"
          >
            <v-avatar size="24">
              <v-img :src="MetamaskLogo" />
            </v-avatar>
            <span class="ml-1"> {{ $t("transfer_with_current_wallet") }}</span>
          </v-btn>
          <div
            class="d-flex justify-center mt-5 pa-4 align-center qr-area"
            v-if="txShowQR"
          >
            <v-col class="d-flex flex-grow-1">
              <span class="font-weight-light help-text">
                {{ txQrHelpText }}
              </span>
            </v-col>
            <v-col class="d-flex flex-grow-0">
              <vue-qrcode
                :value="txQrUrl"
                :options="{ margin: 0, width: 100 }"
                class="mr-1"
              />
            </v-col>
          </div>
        </v-col>
      </v-row>
      <tx-confirmed :link="txExplorerURL" :symbol="selectedToken.symbol" :assetid="selectedToken.asset_id"/>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import ERC20ABI from "../assets/erc20.json";
import { useOnboard } from "@web3-onboard/vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import MetamaskLogo from "../static/metamask.png";
import { getContractByAssetID } from "../helpers/registry";
import { NewClient, MixinClient } from "~/helpers/mixin";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";
const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";
const ExplorerBaseURL = process.env.EXPLORER_BASEURL;
let trace = uuidv4();

export default {
  data() {
    return {
      search: "",
      MetamaskLogo,
      txShowQR: false,
      txQrBtnText: this.$t("show_qrcode"),
      // Metamask tx
      txSent: false,
      txConfirmed: false,
      txSucceed: false,
      txExplorerURL: "",
      txErrorText: "",
    };
  },
  components: {
    VueQrcode,
  },
  props: ["fromAmount", "fromBalance"],
  computed: {
    confirmDepositDialog: {
      get() {
        return this.$store.state.confirmDepositDialog;
      },
      set(value) {
        this.txShowQR == false;
        this.$store.commit("toggleConfirmDeposit", value);
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
    supportsMetamask: {
      get() {
        if (
          !this.$store.state.supportMetamaskNetworks.includes(
            this.selectedNetwork.symbol
          )
        ) {
          return false;
        }
        if (this.fromBalance < this.fromAmount) {
          return false;
        }
        return true;
      },
    },
    userAddress() {
      return this.$store.state.userAddress;
    },
    txQrHelpText: {
      get() {
        if (this.selectedNetwork.asset_id == XINUUID)
          return this.$t("please_scan_qr_with_your_mixin_messenger");
        if (this.selectedNetwork.asset_id != XINUUID)
          return this.$t("please_transfer_to_this_address_from_your_wallet");
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
            subtitle: this.$t("from"),
            haveIcon: true,
            icon: this.selectedNetwork.icon_url,
            addtoken: false,
            copyable: false,
            name: this.selectedNetwork.name + " Mainnet",
          },
          {
            subtitle: this.$t("token"),
            haveIcon: true,
            icon: this.selectedToken.icon_url,
            addtoken: this.selectedToken.asset_id == XINUUID ? false : true,
            copyable: false,
            name: this.selectedToken.symbol,
          },
          {
            subtitle: this.$t("amount"),
            haveIcon: false,
            icon: "",
            addtoken: false,
            copyable: false,
            name: this.fromAmount + " " + this.selectedToken.symbol,
          },
          {
            subtitle: this.$t("address"),
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
            subtitle: this.$t("memo"),
            haveIcon: false,
            icon: "",
            addtoken: false,
            copyable: true,
            name:
              this.selectedNetwork.asset_id == XINUUID
                ? ""
                : this.depositAddr[1]
                ? this.depositAddr[1]
                : "",
          },
        ];
      },
    },
  },
  methods: {
    toggleQR() {
      this.txShowQR = !this.txShowQR;
      if (this.selectedNetwork.asset_id == XINUUID) this.getPaymentState();
      if (this.txShowQR == true) this.txQrBtnText = this.$t("hide_qrcode");
      if (this.txShowQR == false) this.txQrBtnText = this.$t("show_qrcode");
    },
    createMixinPayment() {
      let user = JSON.parse(localStorage.getItem("user"));
      let link = `mixin://pay?recipient=${user.client_id}&asset=${this.selectedToken.asset_id}&amount=${this.fromAmount}&trace=${trace}`;
      return link;
    },
    async getPaymentState() {
      while (true) {
        if (this.txShowQR == false) return;
        if (this.txQrUrl == undefined) return;
        let user = JSON.parse(localStorage.getItem("user"));
        let client = NewClient(
          user.client_id,
          user.session_id,
          user.private_key
        );
        let x = await client.transfer.fetch(trace).catch((error) => {
          console.log("Trace ID not found");
        });
        console.log(x);
        if (x.type == "transfer") {
          this.confirmDepositDialog = false;
          this.txSucceedDialog = true;
          this.txExplorerURL =
            ExplorerBaseURL +
            "address/" +
            this.userAddress +
            "/token-transfers";
          trace = uuidv4();
          this.txShowQR = false;
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
    async addToken() {
      if (window.ethereum == undefined) return;
      let assetID = this.selectedToken.asset_id;
      if (assetID == XINUUID) return;
      let asset = await MixinClient.asset.fetch(assetID);
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
    async deposit() {
      try {
        if (this.supportsMetamask) {
          if (!this.selectedToken.asset_key.includes("0x")) {
            // console.log("[ERROR] No asset contract address");
            return;
          }

          // transfer ETH
          if (this.selectedToken.symbol === "ETH") {
            this.createTx(false, "", this.depositAddr[0], this.fromAmount);
            return;
          }

          // transfer Erc20 tokens
          if (this.selectedToken.chain_id === ETHUUID) {
            this.createTx(
              true,
              this.selectedToken.asset_key,
              this.depositAddr[0],
              this.fromAmount
            );
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createTx(erc20, asset_address, to_address, value) {
      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();

      if (erc20) {
        let tokenContract = new ethers.Contract(
          asset_address,
          ERC20ABI,
          provider
        );
        let tokenContractSigner = tokenContract.connect(signer);
        let tokenDecimal = await tokenContract.decimals();
        let tx_value = ethers.utils.parseUnits(value, tokenDecimal);
        let tx = await tokenContractSigner.transfer(asset_address, tx_value);
        console.log(tx);
        this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
      } else {
        let tx_value = ethers.utils.parseEther(value);
        const transactionParameters = {
          from: ethers.utils.getAddress(await signer.getAddress()),
          to: to_address,
          value: tx_value,
          chainId: 0x1,
        };

        let tx = await provider
          .getSigner()
          .sendTransaction(transactionParameters);
        console.log(tx);
        this.txExplorerURL = ExplorerBaseURL + "tx/" + txResult.hash;
      }
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
.metamask-pay-btn {
  color: white !important;
  background-color: #2979ff !important;
  border-radius: 10px;
}
.qr-area {
  background-color: #f4f7fa;
  border-radius: 10px !important;
}
.help-text {
  overflow-wrap: break-word;
}
</style>