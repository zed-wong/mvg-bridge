<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a style="color: #68778d; text-decoration: none" @click="mode=0"
            ><span> {{ $t("deposit") }} </span></a
          >
          <a class="pl-6 font-weight-bold"><span> {{ $t("withdraw") }} </span></a>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center">
              <span class="mr-1 font-weight-light"> {{ $t("from") }} </span>
              <v-img
                :src="bridge"
                max-height="21px"
                max-width="19px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500"> {{ $t("mvm_mainnet") }} </span>
            </div>

            <div class="d-flex flex-row align-center">
              <v-form v-model="valueValid" ref="form">
                <v-text-field
                  outlined
                  :rules="rules"
                  placeholder="0.0"
                  hide-details="true"
                  v-model="toAmount"
                  class="from-form my-3"
                ></v-text-field>
              </v-form>
              <v-btn
                outlined
                elevation="0"
                min-height="56px"
                class="select-token-btn border-width"
                @click.stop="selectTokenDialog = true"
              >
                <v-img
                  :src="selectedToken.icon_url"
                  max-height="24px"
                  max-width="24px"
                  class="mr-3"
                />
                <span class="mr-2" style="font-size: 18px">
                  {{ selectedToken.symbol }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-token />
            </div>
            <div v-if="toBalanceVisble">
              <span class="font-weight-light">
                {{ $t("balance") }}: {{ fixedToBalance }} {{ selectedToken.symbol }}
              </span>
              <a @click="setMaxAmount">
                <span class="ml-1 max-text"> ({{ $t("max") }}) </span>
              </a>
            </div>
            <div v-if="fetchingBalance && connected">
              <v-progress-circular
                width="1"
                size="10"
                indeterminate
                color="dark"
                class="mr-2"
              ></v-progress-circular>
              <span class="font-weight-light" style="font-size"
                >{{ $t("loading_balance") }}</span
              >
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-btn icon @click="mode=0">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center mb-2">
              <span class="font-weight-light"> {{ $t("to") }} </span>
              <v-btn
                small
                depressed
                class="px-0"
                @click.stop="selectNetworkDialog = true"
              >
                <v-img
                  class="ml-3"
                  max-width="20px"
                  max-height="20px"
                  :src="selectedNetwork.icon_url"
                />
                <span class="ml-2 selected-network font-weight-500">
                  {{ selectedNetwork.name }} {{ $t("mainnet") }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-network />
            </div>
            <div v-if="txGettingFee" class="mb-2">
              <v-progress-circular
                width="1"
                size="10"
                indeterminate
                color="dark"
                class="mr-2"
              ></v-progress-circular>
              <span class="font-weight-light" style="font-size"
                >{{ $t("loading_withdrawal_fee") }}</span
              >
            </div>
            <div
              class="d-flex flex-column font-weight-light"
              v-if="txEstimatedFeeVisible"
            >
              <span class="mb-2">
                {{ $t("withdrawal_fee") }}: {{ txEstimatedFee }}
                {{ selectedToken.symbol }}
              </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-2">
                {{ $t("will_receive") }}: {{ toAmount != 0 ? toAmount : 0 }}
                {{ selectedToken.symbol }}
              </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <connect-wallet v-if="!connected" :huge="true" />
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="connected"
            @click="withdraw"
            :loading="withdrawing"
            :disabled="!valueValid"
            class="border-rounded main-btn white--text"
          >
            <span> {{ giantBtnText }} </span>
          </v-btn>
          <withdraw-dialog
            :to-amount="toAmount"
            :total-amount="totalPayAmount"
            :fee="txEstimatedFee"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script lang="">
import { ethers } from "ethers";
import bridge from "~/static/bridge.png";
import assets from "~/assets/assets.json";
import chains from "~/assets/chainlist.json";
import ASSETABI from "~/assets/assetABI.json";
import { MixinClient } from "@/helpers/mixin";
import { useOnboard } from "@web3-onboard/vue";
import { fetchAssetContract } from "~/helpers/registry";
import selectToToken from "~/components/selectToToken.vue";
import ConnectWallet from "~/components/connectWallet.vue";
import withdrawDialog from "~/components/withdrawDialog.vue";
import selectToNetowrk from "~/components/selectToNetwork.vue";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

function formatBalance(balance) {
  if (balance <= 0) return balance
  return Math.floor(Number(balance)*100000000)/100000000
}

export default {
  components: {
    selectToToken,
    ConnectWallet,
    withdrawDialog,
    selectToNetowrk,
  },
  data() {
    return {
      bridge,

      toAmount: 0,
      toBalance: "",
      toBalanceVisble: false,
      fetchingBalance: false,

      // metamask tx
      withdrawing: false,
      txEstimatedFee: 0,
      txGettingFee: false,
      txEstimatedFeeVisible: false,
      txFeeAssetBalance: "",

      valueValid: false,
      rules: [
        (value) => {
          if (value <= 0) {
            this.btnErrorMsg = this.$t("invalid_amount");
            return false;
          }

          if (
            Number(value) + Number(this.txEstimatedFee) >
            Number(this.toBalance)
          ) {
            this.btnErrorMsg = this.$t("insufficient_balance");
            return false;
          }

          if (this.selectedNetwork.asset_id != XINUUID) {
            if (Number(value) * 10000 < 1) {
              this.btnErrorMsg = this.$t("minimum_amount");
              return false;
            }
          }
          return true;
        },
      ],
      btnErrorMsg: "",
    };
  },
  computed: {
    mode: {
      get(){
        return this.$store.state.mode
      },
      set(value){
        this.$store.commit('setMode', value)
      }
    },
    assets() {
      return assets.assets;
    },
    giantBtnText: {
      get() {
        if (!this.valueValid) return this.btnErrorMsg;
        return this.$t("withdraw");
      },
    },
    connected() {
      return this.$store.state.connected;
    },
    network_id() {
      return this.$store.state.chainId;
    },
    selectedNetwork() {
      return this.$store.state.toNetwork;
    },
    selectedToken() {
      return this.$store.state.toToken;
    },
    fixedToBalance() {
      return formatBalance(this.toBalance).toLocaleString("en-US", {
        maximumFractionDigits: 8,
        minimumFractionDigits: 2,
      });
    },
    totalPayAmount() {
      return (
        Number(this.toAmount) + Number(this.txEstimatedFee)
      ).toLocaleString("en-US", {
        maximumFractionDigits: 8,
        minimumFractionDigits: 0,
      });
    },
    maxPayAmount() {
      let a = formatBalance(Number(this.toBalance) - Number(this.txEstimatedFee));
      if (a <= 0) return Number(this.toBalance);
      return this.selectedNetwork.asset_id == XINUUID
        ? a.toLocaleString("en-US", {
            maximumFractionDigits: 8,
            minimumFractionDigits: 2,
          })
        : a.toLocaleString("en-US", {
            maximumFractionDigits: 4,
            minimumFractionDigits: 2,
          });
    },

    selectNetworkDialog: {
      get() {
        return this.$store.state.selectNetworkDialog;
      },
      set(value) {
        this.$store.commit("toggleSelectNetwork", value);
      },
    },
    selectTokenDialog: {
      get() {
        return this.$store.state.selectTokenDialog;
      },
      set(value) {
        this.$store.commit("toggleSelectToken", value);
      },
    },
    connectWalletDialog: {
      get() {
        return this.$store.state.connectWalletDialog;
      },
      set(value) {
        this.$store.commit("toggleConnectWallet", value);
      },
    },
    confirmWithdrawDialog: {
      get() {
        return this.$store.state.confirmWithdrawDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmWithdraw", value);
      },
    },
  },

  watch: {
    async selectedToken(o, n) {
      this.getMvmtoBalance();
      await this.estimateTxFee();
      if (!this.connected) return;
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
    },
    async selectedNetwork(o, n) {
      await this.estimateTxFee();
      if (!this.connected) return;
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
    },
    async connected(o, n) {
      let { connectedChain } = useOnboard();
      await this.getMvmtoBalance();
    },
    async network_id(o, n) {
      await this.getMvmtoBalance();
    },
  },

  mounted() {
    this.getMvmtoBalance();

    this.estimateTxFee();

    this.setDefaultToNetwork();

    this.mvmBydefault();
  },

  methods: {
    async withdraw() {
      this.mvmBydefault();
      this.confirmWithdrawDialog = true;
      this.withdrawing = true;
      this.withdrawing = false;
    },

    async getMvmtoBalance() {
      if (!this.connected) {
        return;
      }

      this.fetchingBalance = true;
      this.toBalanceVisble = false;

      const { connectedWallet } = useOnboard();
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();
      let userAddr = await signer.getAddress();

      // XIN
      if (this.selectedToken.asset_id === XINUUID) {
        let addr = ethers.utils.getAddress(userAddr);
        let balance = ethers.utils.formatEther(await provider.getBalance(addr));
        this.toBalance = balance;
        this.toBalanceVisble = true;
        this.fetchingBalance = false;
        return;
      }

      // ERC20
      try {
        let assetAddr = await fetchAssetContract(this.selectedToken.asset_id);
        let tokenContract = new ethers.Contract(assetAddr, ASSETABI, provider);
        let tokenBalance = await tokenContract.balanceOf(userAddr);
        let balance = ethers.utils.formatUnits(tokenBalance, 8);
        this.toBalance = balance;
        this.toBalanceVisble = true;
        this.fetchingBalance = false;
      } catch (error) {
        console.log(error, this.selectedToken.asset_id);
        this.toBalanceVisble = false;
        this.fetchingBalance = false;
      }
    },

    setDefaultToNetwork() {
      // set eth as default to network
      let asset = this.assets[0];
      this.$store.commit("setToToken", asset);

      let chain = chains.filter((item) => {
        return item.asset_id.match(asset.chain_id);
      })[0];
      this.$store.commit("setToNetwork", chain);
    },
    async mvmBydefault() {
      if (window.ethereum == undefined) {
        return;
      }
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      if ((await provider.getNetwork().chainId) == "73927") {
        return;
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x120c7" }],
        });
      } catch (error) {
        console.log(error);
        if (error.code === 4902) {
          const chain = [
            {
              chainId: `0x120c7`,
              blockExplorerUrls: ["https://scan.mvm.dev/"],
              rpcUrls: ["https://geth.mvm.dev"],
              chainName: "Mixin Virtual Machine",
              nativeCurrency: {
                name: "Mixin",
                symbol: "XIN",
                decimals: 18,
              },
            },
          ];
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: chain,
          });
        }
      }
    },
    async estimateTxFee() {
      this.txGettingFee = true;
      this.txEstimatedFeeVisible = false;

      if (this.selectedNetwork.asset_id == XINUUID) {
        this.txEstimatedFeeVisible = false;
        this.txEstimatedFee = 0;
        this.txGettingFee = false;
        return;
      }
      this.txEstimatedFee = await this.getTxFee();

      this.txGettingFee = false;
      this.txEstimatedFeeVisible = true;
    },
    async getTxFee() {
      // if (this.selectedNetwork.asset_id === XINUUID) return 0;

      let fee = await MixinClient.network.fetchAsset(
        this.selectedToken.asset_id
      );
      if (this.selectedToken.asset_id === this.selectedToken.chain_id)
        return fee.fee;
      return await this.get4swapPrice(
        this.selectedToken.asset_id,
        this.selectedToken.chain_id,
        fee.fee
      );
    },
    async get4swapPrice(from, to, amount) {
      const plusAmount = (
        Number(amount) +
        Number(amount) * 0.01
      ).toLocaleString();
      if (plusAmount == "NaN") {
        return 0;
      }
      let result = await this.$axios.post(
        "https://api.4swap.org/api/orders/pre",
        {
          pay_asset_id: from,
          fill_asset_id: to,
          amount: plusAmount,
        }
      );
      if (result.data != undefined) {
        let payAmount = result.data.data.pay_amount;
        if (Number(payAmount) * 10000 > 1) {
          return Math.ceil(payAmount * 10000) / 10000;
        }
        return Number(payAmount);
      }
      return 0;
    },
    setMaxAmount() {
      this.toAmount = this.maxPayAmount;
    },
  },
};
</script>

<style>
.border-rounded {
  border-radius: 12px;
}
.font-weight-500 {
  font-weight: 500;
}
.from-form {
  background-color: white;
  border-radius: 12px 0 0 12px;
}
.selected-network {
  font-size: 14px;
  line-height: normal;
}
.arrow-down {
  color: #5959d8 !important;
}
.select-token-btn {
  color: dark;
  min-height: 56px;
  background-color: white;
  border-radius: 0 12px 12px 0;
}
.border-width {
  border-style: solid;
  border: 1px solid currentColor !important;
  border-width: 0.1px !important;
  border-left-width: 0px !important;
}
.max-text {
  color: #5959d8;
}
.v-dialog {
  border-radius: 16px !important;
}
.v-text-field--outlined fieldset {
  color: dark !important;
  border: thin solid currentColor !important;
}
.v-btn {
  text-indent: 0;
  letter-spacing: 0;
  text-transform: none !important;
}
.v-btn:before {
  opacity: 0 !important;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #f1f4f9 !important;
}
.v-ripple__container {
  opacity: 0 !important;
}
.main-btn {
  font-size: 18px;
  font-weight: 700;
  height: 60px !important;
}
</style>