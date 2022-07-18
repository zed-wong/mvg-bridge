<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a style="color: #68778d; text-decoration: none" :href="deposit_url"
            ><span> Deposit </span></a
          >
          <a class="pl-6 font-weight-bold"><span> Withdraw </span></a>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center">
              <span class="mr-1 font-weight-light"> From </span>
              <v-img
                :src="bridge"
                max-height="21px"
                max-width="19px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500"> MVM Mainnet </span>
            </div>

            <div class="d-flex flex-row align-center">
              <v-text-field
                outlined
                placeholder="0.0"
                hide-details="true"
                v-model="toAmount"
                class="from-form my-3 border-width"
              ></v-text-field>
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
            <span v-if="toBalanceVisble" class="font-weight-light">
              Balance: {{ fixedToBalance }} {{ selectedToken.symbol }}
            </span>
            <div v-if="fetchingBalance && connected">
              <v-progress-circular
                width="1"
                size="10"
                indeterminate
                color="dark"
                class="mr-2"
              ></v-progress-circular>
              <span class="font-weight-light" style="font-size"
                >Loading Balance</span
              >
            </div>
          </v-sheet>
        </v-col>

        <v-col class="text-center pa-0 py-1">
          <v-btn icon :href="deposit_url">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center mb-2">
              <span class="font-weight-light"> To </span>
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
                  {{ selectedNetwork.name }} Mainnet
                </span>
                <v-icon small> mdi-menu-down </v-icon>
              </v-btn>
              <select-to-network />
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-2">
                You will receive: {{ toAmount != 0 ? toAmount : 0 }}
                {{ selectedToken.symbol }}
              </span>
            </div>
            <div v-if="txGettingFee">
              <v-progress-circular
                width="1"
                size="10"
                indeterminate
                color="dark"
                class="mr-2"
              ></v-progress-circular>
              <span class="font-weight-light" style="font-size"
                >Loading Transaction Fee</span
              >
            </div>
            <div
              class="d-flex flex-column font-weight-light"
              v-if="txEstimatedFeeVisible"
            >
              <span class="mb-2">
                Withdrawal Fee: {{ txEstimatedFee }}
                {{ selectedNetwork.symbol }}
              </span>
            </div>
          </v-sheet>
        </v-col>

        <v-col class="mt-8 px-0">
          <connect-wallet v-if="!connected" :huge="true"/>
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            v-if="connected"
            @click="withdraw"
            :loading="withdrawing"
            class="border-rounded main-btn white--text"
          >
            <span> Withdraw </span>
          </v-btn>
          <withdraw-dialog :to-amount="toAmount" :fee=txEstimatedFee />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script lang="">
import { ethers } from "ethers";
import bridge from "~/static/bridge.png";
import assets from "../assets/assets.json";
import chains from "../assets/chainlist.json";
import ASSETABI from "../assets/assetABI.json";
import { MixinClient } from "@/helpers/mixin";
import { useOnboard } from "@web3-onboard/vue";
import { fetchAssetContract } from "../helpers/registry";
import selectToToken from "~/components/selectToToken.vue";
import ConnectWallet from "~/components/connectWallet.vue";
import withdrawDialog from "~/components/withdrawDialog.vue";
import selectToNetowrk from "~/components/selectToNetwork.vue";

const XINUUID = "c94ac88f-4671-3976-b60a-09064f1811e8";

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

      deposit_url: "/newbridge",

      toAmount: "0",
      toBalance: "",
      toBalanceVisble: false,
      fetchingBalance: false,

      // metamask tx
      withdrawing: false,
      txSent: false,
      txConfirmed: false,
      txSucceed: false,
      txErrorText: "",
      txEstimatedFee: "",
      txGettingFee: false,
      txEstimatedFeeVisible: false,
    };
  },
  computed: {
    assets() {
      return assets.assets;
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
      if (Number(this.toBalance) == 0) return 0;
      if (Number(this.toBalance).toFixed(8) > 0.00000001)
        return Number(this.toBalance).toFixed(8);
      return 0;
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
    selectedToken(o, n) {
      this.getMvmtoBalance();
      this.estimateTxFee();
    },
    selectedNetwork(o, n) {
      this.estimateTxFee();
    },
    connected(o, n) {
      this.getMvmtoBalance();
    },
    network_id(o, n) {
      this.getMvmtoBalance();
    },
  },

  mounted() {
    this.getMvmtoBalance();

    this.setDefaultToNetwork();

    this.mvmBydefault();

    this.estimateTxFee();
  },

  layout: "newbridge",

  methods: {
    async withdraw() {
      this.confirmWithdrawDialog = true;
      this.withdrawing = true;
      this.mvmBydefault();
      this.withdrawing = false;
    },

    async getMvmtoBalance() {
      // get mvm asset balance
      if (!this.connected) {
        console.error("[000] Please connect wallet first.");
        return;
      }
      if (window.ethereum == undefined) {
        console.error("[001]] window.ethereum undefined");
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

      if (this.selectedToken.asset_id === XINUUID) {
        // console.log("Selected XIN")
        let addr = ethers.utils.getAddress(userAddr);
        let balance = ethers.utils.formatEther(await provider.getBalance(addr));
        this.toBalance = balance;
        this.toBalanceVisble = true;
        this.fetchingBalance = false;
        return;
      }

      // console.log("Selected ERC20 token")
      try {
        let assetAddr = await fetchAssetContract(this.selectedToken.asset_id);

        let tokenContract = new ethers.Contract(assetAddr, ASSETABI, provider);
        let tokenBalance = await tokenContract.balanceOf(userAddr);
        let balance = ethers.utils.formatUnits(tokenBalance, 8);
        this.toBalance = balance;
        this.toBalanceVisble = true;
        this.fetchingBalance = false;
      } catch (error) {
        console.log(error);
      }
    },

    
    // handleChanges() {
    //   // handle network and account change (BUG)
    //   let provider = new ethers.providers.Web3Provider(window.ethereum);

    //   provider.on("accountsChanged", (accounts) => {
    //     console.log("accountsChanges", accounts);
    //     this.$store.commit("connect", { address: accounts[0] });
    //   });

    //   provider.on("chainChanged", async (chainid) => {
    //     console.log("chainChanged:", chainid);
    //     let account = await this.getAccount();
    //     let chainName =
    //       chainid in chainIds ? chainIds[chainid].name : "Unspported";
    //     this.$store.commit("connect", {
    //       address: account,
    //       name: chainName,
    //       id: chainid,
    //     });
    //   });
    // },
    setDefaultToNetwork() {
      // set eth as default to network
      let asset = this.assets[6];
      this.$store.commit("setToToken", asset);

      let chain = chains.filter((item) => {
        return item.asset_id.match(asset.chain_id);
      })[0];
      this.$store.commit("setToNetwork", chain);
    },
    checkNetwork(chain_symbol) {
      return this.$store.state.supportMetamaskNetworks.includes(chain_symbol);
    },
    async mvmBydefault() {
      // switch to mvm if is not
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
              chainId: `0x${Number(73927).toString(16)}`,
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
    async getTxFee() {
      if (this.selectedNetwork.asset_id === XINUUID) return 0;

      let fee = await MixinClient.readAssetFee(this.selectedToken.asset_id);
      return fee.amount;
    },
    async estimateTxFee() {
      this.txGettingFee = true;
      this.txEstimatedFeeVisible = false;

      this.txEstimatedFee = await this.getTxFee();

      this.txGettingFee = false;
      this.txEstimatedFeeVisible = true;
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
  min-height: 56px;
  border-radius: 0 12px 12px 0;
}
.border-width {
  border-width: 0.8px;
  border-left-width: 0px;
}
.v-dialog {
  border-radius: 16px !important;
}
.v-text-field--outlined {
  border-color: rgba(192, 0, 250, 0.986);
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