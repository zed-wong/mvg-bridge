<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a style="color: #68778d; text-decoration: none" @click="mode = 0"
            ><span> {{ $t("deposit") }} </span></a
          >
          <a class="pl-6 font-weight-bold"
            ><span> {{ $t("withdraw") }} </span></a
          >
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
                max-height="23px"
                max-width="20px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500">
                {{ $t("mvm_mainnet") }}
              </span>
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
                v-if="!$vuetify.breakpoint.mobile"
                class="select-token-btn"
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

              <v-btn
                v-else
                outlined
                elevation="0"
                min-height="56px"
                class="select-token-btn px-1"
                @click.stop="selectTokenDialog = true"
              >
                <v-img
                  :src="selectedToken.icon_url"
                  max-height="24px"
                  max-width="24px"
                  class="mr-1 ml-1"
                />
                <span style="font-size: 18px">
                  {{ selectedToken.symbol }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-token />
            </div>
            <div v-if="toBalanceVisble">
              <span class="font-weight-light">
                {{ $t("balance") }}: {{ fixedToBalance }}
                {{ selectedToken.symbol }}
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
              <span class="font-weight-light" style="font-size">{{
                $t("loading_balance")
              }}</span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-btn icon @click="mode = 0">
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
              <span class="font-weight-light" style="font-size">{{
                $t("loading_withdrawal_fee")
              }}</span>
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
            <div
              class="d-flex flex-column font-weight-light"
            >
              <span class="mb-2">
                {{ $t('transaction_gas') }}:  {{ transactionGas }} ETH
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
            <span> {{ withdrawBtnText }} </span>
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
const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";

function formatBalance(balance) {
  if (balance <= 0) return balance;
  return Math.floor(Number(balance) * 100000000) / 100000000;
}

export default {
  components: {
    selectToToken,
    ConnectWallet,
    withdrawDialog,
    selectToNetowrk,
  },
  head() {
    return {
      title: this.$t("withdraw_token"),
    };
  },
  data() {
    return {
      bridge,

      toAmount: 0,
      toBalance: "",
      toBalanceVisble: false,
      fetchingBalance: false,

      withdrawing: false,
      txEstimatedFee: 0,
      txGettingFee: false,
      txEstimatedFeeVisible: false,
      txFeeAssetBalance: "",

      valueValid: false,
      rules: [
        (value) => value >= 0 || "Invalid Amount",
      ],
    };
  },
  computed: {
    mode: {
      get() {
        return this.$store.state.mode;
      },
      set(value) {
        this.$store.commit("setMode", value);
      },
    },
    assets() {
      return assets.assets;
    },
    connected() {
      return this.$store.state.connected;
    },
    connectedChain() {
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
      let a = formatBalance(
        Number(this.toBalance) - Number(this.txEstimatedFee)
      );
      if (this.selectedToken.asset_id === ETHUUID) a = a - Number(this.transactionGas)
      if (a <= 0)
        return this.toBalance
          .toLocaleString("en-US", {
            maximumFractionDigits: 8,
            minimumFractionDigits: 2,
          })
          .replaceAll(",", "");
      return this.selectedNetwork.asset_id === XINUUID
        ? a
            .toLocaleString("en-US", {
              maximumFractionDigits: 8,
              minimumFractionDigits: 2,
            })
            .replaceAll(",", "")
        : a
            .toLocaleString("en-US", {
              maximumFractionDigits: 4,
              minimumFractionDigits: 2,
            })
            .replaceAll(",", "");
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
    networkCorrect: {
      get() {
        if (this.connectedChain === "0x120c7") return true;
        return false;
      },
    },
    withdrawBtnText: {
      get() {
        try {
          this.$refs.form.validate();
        } catch (error) {}
        this.valueValid = false;
        if (!this.networkCorrect)
          return `${this.$t("please_switch_to")} ${this.$t("mvm_mainnet")}`;

        if (this.toAmount <= 0) return this.$t("invalid_amount");

        if (
          Number(this.toAmount) + Number(this.txEstimatedFee) >
          Number(this.toBalance)
        )
          return this.$t("insufficient_balance");

        if (this.selectedNetwork.asset_id != XINUUID) {
          if (Number(this.toAmount) * 10000 < 1) {
            return this.$t("minimum_amount");
          }
        }
        this.valueValid = true;
        return this.$t("withdraw");
      },
    },
    transactionGas: {
      get() {
        return this.selectedToken.asset_id === ETHUUID ? 0.0000035 : 0.0000016;
      }
    },
  },

  watch: {
    async selectedToken() {
      this.getMvmtoBalance();
      await this.estimateTxFee();
      if (!this.connected) return;
      this.$nextTick(() => {
        try {
          this.$refs.form.validate();
        } catch (error) {
          console.log(error);
        }
      });
    },
    async selectedNetwork() {
      await this.estimateTxFee();
      if (!this.connected) return;
      this.$nextTick(() => {
        try {
          this.$refs.form.validate();
        } catch (error) {
          console.log(error);
        }
      });
    },
    txGettingFee(n, o) {
      n == true ? (this.valueValid = false) : (this.valueValid = false);
    },
    connectedChain() {
      this.getMvmtoBalance();
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

      // ETH
      if (this.selectedToken.asset_id === ETHUUID) {
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
      const { connectedWallet, setChain } = useOnboard();
      if (connectedWallet) {
        setChain({ wallet: connectedWallet.value.label, chainId: "0x120c7" });
      }
    },
    async estimateTxFee() {
      this.txGettingFee = true;
      this.txEstimatedFeeVisible = false;

      if (this.selectedNetwork.asset_id == XINUUID) {
        this.txEstimatedFee = 0;
        this.txGettingFee = false;
        this.txEstimatedFeeVisible = false;
        return;
      }
      try {
        this.txEstimatedFee = await this.getTxFee();
      } catch (error) {
        console.log(error);
      }

      if (this.selectedNetwork.asset_id == XINUUID) {
        this.txEstimatedFee = 0;
        this.txGettingFee = false;
        this.txEstimatedFeeVisible = false;
        return;
      }
      this.txGettingFee = false;
      this.txEstimatedFeeVisible = true;
    },
    async getTxFee() {
      if (this.selectedNetwork.asset_id === XINUUID) return 0;
      if (this.selectedToken.asset_id === undefined) return 0;
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