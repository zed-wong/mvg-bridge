<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a class="pr-6 font-weight-bold"
            ><span> {{ $t("deposit") }} </span></a
          >
          <a style="color: #68778d; text-decoration: none" @click="mode = 1"
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
              <v-btn
                small
                depressed
                class="px-0"
                @click.stop="selectNetworkDialog = true"
              >
                <v-img
                  class="ml-2"
                  max-width="20px"
                  max-height="20px"
                  :src="selectedNetwork.icon_url"
                />
                <span class="ml-2 selected-network font-weight-500">
                  {{ selectedNetwork.name }} {{ $t("mainnet") }}
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-from-network />
            </div>

            <div class="d-flex flex-row align-center">
              <v-form v-model="valueValid">
                <v-text-field
                  flat
                  outlined
                  :rules="rules"
                  placeholder="0.0"
                  hide-details="true"
                  v-model="fromAmount"
                  class="from-form my-3"
                ></v-text-field>
              </v-form>

              <v-btn
                v-if="!$vuetify.breakpoint.mobile"
                elevation="0"
                min-height="56px"
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
              <select-from-token />
            </div>
            <span v-if="fromBalanceVisble" class="font-weight-light">
              {{ $t("balance") }}: {{ fixedFromBalance }}
              {{ selectedToken.symbol }}
            </span>
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
          <v-btn icon @click="mode = 1">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex flex-row mb-2">
              <span class="font-weight-light"> {{ $t("to") }} </span>
              <v-img
                :src="bridge"
                max-height="23px"
                max-width="20px"
                class="ml-3"
              >
              </v-img>
              <span class="ml-2 font-weight-500">
                {{ $t("mvm_mainnet") }}
              </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1">
                {{ $t("will_receive") }}: {{ fromAmount != 0 ? fromAmount : 0 }}
                {{ selectedToken.symbol }}
              </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <connect-wallet :huge="true" v-if="!connected" />
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="connected"
            @click="deposit"
            :loading="depositing"
            :disabled="!valueValid"
            class="border-rounded main-btn white--text"
          >
            <span> {{ $t("deposit") }} </span>
          </v-btn>
          <deposit-dialog
            :from-amount="fromAmount"
            :from-balance="fromBalance"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script lang="">
import { ethers } from "ethers";
import bridge from "~/static/bridge.png";
import { NewClient } from "@/helpers/mixin";
import ERC20ABI from "../assets/erc20.json";
import { useOnboard } from "@web3-onboard/vue";
import selectFromToken from "~/components/selectFromToken.vue";
import selectFromNetwork from "~/components/selectFromNetwork.vue";
import ConnectWallet from "~/components/connectWallet.vue";
import DepositDialog from "~/components/depositDialog.vue";

const ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";

export default {
  components: {
    selectFromNetwork,
    selectFromToken,
    ConnectWallet,
    DepositDialog,
  },
  head() {
    return {
      title: this.$t("deposit_token"),
    };
  },
  data() {
    return {
      bridge,

      fromAmount: "0",
      fromBalance: "",
      fromBalanceVisble: false,
      fetchingBalance: false,
      depositing: false,

      rules: [
        (value) => !!value || "Value is required",
        (value) => value > 0 || "Value must bigger than 0",
      ],
      valueValid: false,
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
    connected: {
      get() {
        return this.$store.state.connected;
      },
    },
    connectedChain() {
      return this.$store.state.chainId;
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
    connectWalletDialog: {
      get() {
        return this.$store.state.connectWalletDialog;
      },
      set(value) {
        this.$store.commit("toggleConnectWallet", value);
      },
    },
    confirmDepositDialog: {
      get() {
        return this.$store.state.confirmDepositDialog;
      },
      set(value) {
        this.$store.commit("toggleConfirmDeposit", value);
      },
    },
    fixedFromBalance: {
      get() {
        return Number(this.fromBalance).toLocaleString("en-US", {
          maximumFractionDigits: 8,
          minimumFractionDigits: 2,
        });
      },
    },
  },

  watch: {
    selectedToken() {
      this.getFromBalance();
    },
    connected() {
      this.getFromBalance();
    },
    connectedChain() {
      this.getFromBalance();
    },
  },
  async mounted() {
    await this.getFromBalance();
    this.ethBydefault();
  },

  methods: {
    async deposit() {
      if (this.selectedToken.chain_id === ETHUUID) {
        this.ethBydefault();
      }
      this.depositing = true;
      let addr = await this.getDepositAddress(this.selectedToken.asset_id);
      this.depositing = false;
      this.confirmDepositDialog = true;
      this.$store.commit("setDepositAddr", addr);
    },

    async getFromBalance() {
      if (!this.connected) {
        await this.sleep(500);
      }
      if (!this.connected) {
        return;
      }

      if (!this.checkNetwork(this.selectedNetwork.symbol)) {
        // console.log("Chain balance is not supported");
        this.fetchingBalance = false;
        this.fromBalanceVisble = false;
        return;
      }

      this.fetchingBalance = true;
      this.fromBalanceVisble = false;
      const { connectedWallet } = useOnboard();
      if (connectedWallet.value == null) {
        this.fetchingBalance = false;
        this.fromBalanceVisble = false;
        return;
      }
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();
      let userAddr = await signer.getAddress();
      if (this.selectedToken.asset_id === ETHUUID) {
        let addr = ethers.utils.getAddress(userAddr);
        let balance = ethers.utils.formatEther(await provider.getBalance(addr));
        this.fromBalance = balance;
        this.fetchingBalance = false;
        this.fromBalanceVisble = true;
        return;
      }

      if (!this.selectedToken.asset_key.includes("0x")) {
        this.fetchingBalance = false;
        this.fromBalanceVisble = false;
        return;
      }

      let tokenContract = new ethers.Contract(
        this.selectedToken.asset_key,
        ERC20ABI,
        provider
      );
      let tokenBalance = await tokenContract.balanceOf(userAddr);
      let tokenDecimal = await tokenContract.decimals();
      let balance = ethers.utils.formatUnits(tokenBalance, tokenDecimal);
      this.fromBalance = balance;
      this.fetchingBalance = false;
      this.fromBalanceVisble = true;
    },

    async getDepositAddress(asset_id) {
      try {
        let suser = localStorage.getItem("user");
        if (suser) {
          let user = JSON.parse(suser);
          let client = NewClient(
            user.client_id,
            user.session_id,
            user.private_key
          );
          let asset = await client.asset.fetch(asset_id);
          let dest = asset.deposit_entries[0].destination;
          let tag = asset.deposit_entries[0].tag;
          return [dest, tag];
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkNetwork(chain_symbol) {
      return this.$store.state.supportMetamaskNetworks.includes(chain_symbol);
    },
    async ethBydefault() {
      let result;
      const { connectedWallet, setChain } = useOnboard();
      if (connectedWallet) {
        setChain({ wallet: connectedWallet.value.label, chainId: "0x1" });
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
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
  height: 56px;
  background-color: white;
  border: 1px solid #cbd5e0;
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
  height: 56px;
  color: white;
  background-color: white !important;
  border-bottom: 1px solid #cbd5e0;
  border-right: 1px solid #cbd5e0;
  border-top: 1px solid #cbd5e0;
  border-radius: 0 12px 12px 0;
  border-left: none !important;
}
.v-dialog {
  border-radius: 16px !important;
}
.v-btn {
  text-indent: 0;
  letter-spacing: 0;
  text-transform: none !important;
}
.v-btn:before {
  opacity: 0 !important;
}
.v-text-field--outlined fieldset {
  border: none;
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

<style scoped>

</style>