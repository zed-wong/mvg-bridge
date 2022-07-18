<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <v-sheet elevation="2" class="pa-9 mt-15 border-rounded" max-width="552px">
      <v-row class="d-flex flex-column" no-gutters>
        <v-col class="mb-6 px-0" style="font-size: 24px">
          <a class="pr-6 font-weight-bold"><span> Deposit </span></a>
          <a style="color: #68778d; text-decoration: none" :href="withdraw_url"
            ><span> Withdraw </span></a
          >
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex align-center">
              <span class="mr-1 font-weight-light"> From </span>
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
              <select-from-network />
            </div>

            <div class="d-flex flex-row align-center">
              <v-text-field
                outlined
                placeholder="0.0"
                hide-details="true"
                v-model="fromAmount"
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
              <select-from-token />
            </div>
            <span v-if="fromBalanceVisble" class="font-weight-light">
              Balance: {{ fixedFromBalance }} {{ selectedToken.symbol }}
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
          <v-btn icon :href="withdraw_url">
            <v-icon class="arrow-down py-1"> mdi-arrow-down </v-icon>
          </v-btn>
        </v-col>

        <v-col style="font-size: 14px" class="pa-0">
          <v-sheet
            style="background-color: #f4f7fa"
            class="px-5 py-4 border-rounded"
          >
            <div class="d-flex flex-row mb-2">
              <span class="font-weight-light"> To </span>
              <v-img
                :src="bridge"
                max-height="21px"
                max-width="19px"
                class="ml-2"
              >
              </v-img>
              <span class="ml-2 font-weight-500"> MVM Mainnet </span>
            </div>
            <div class="d-flex flex-column font-weight-light">
              <span class="mb-1">
                You will receive: {{ fromAmount != 0 ? fromAmount : 0 }}
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
            class="border-rounded main-btn white--text"
          >
            <span> Deposit </span>
          </v-btn>
          <deposit-dialog :from-amount="fromAmount" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-row>
</template>

<script lang="">
import { ethers } from "ethers";
import bridge from "~/static/bridge.png";
import chainIds from "../helpers/chainids";
import { NewClient } from "@/helpers/mixin";
import ERC20ABI from "../assets/erc20.json";
import { useOnboard } from "@web3-onboard/vue";
import selectFromToken from "~/components/selectFromToken.vue";
import selectFromNetwork from "~/components/selectFromNetwork.vue";
import ConnectWallet from "~/components/connectWallet.vue";
import DepositDialog from "~/components/depositDialog.vue";

let ETHUUID = "43d61dcd-e413-450d-80b8-101d5e903357";

export default {
  components: {
    selectFromNetwork,
    selectFromToken,
    ConnectWallet,
    DepositDialog,
  },
  data() {
    return {
      bridge,

      withdraw_url: "/newwithdraw",

      fromAmount: "0",
      fromBalance: "",
      fromBalanceVisble: false,
      fetchingBalance: false,

      // metamask tx
      depositing: false,
      txSent: false,
      txConfirmed: false,
      txSucceed: false,
      txErrorText: "",
    };
  },
  computed: {
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
    network_id: {
      get() {
        return this.$store.state.chainId;
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
        if (Number(this.fromBalance) == 0) return 0;
        return Number(this.fromBalance).toFixed(5);
      },
    },
  },

  watch: {
    selectedToken(o, n) {
      this.getFromBalance();
    },
    connected(o, n) {
      this.getFromBalance();
    },
    network_id(o, n) {
      this.getFromBalance();
    },
  },
  async mounted() {
    this.getFromBalance();
  },

  layout: "newbridge",

  methods: {
    async deposit() {
      this.depositing = true;
      let addr = await this.getDepositAddress(this.selectedToken.asset_id);
      this.depositing = false;

      // Metamask
      if (this.checkNetwork(this.selectedNetwork.symbol)) {
        // if (this.selectedNetwork.evm_chain_id) {
        //   if (this.network.id != this.selectedNetwork.chainid) {

        //     let provider = new ethers.providers.Web3Provider(window.ethereum);
        //     await provider.request({
        //       method: "wallet_switchEthereumChain",
        //       params: [{ chainId: this.selectedNetwork.evm_chain_id.toString(16) }],
        //     });
        //     return;
        //   }
        // }

        // console.log('Using Metamask')
        if (!this.selectedToken.asset_key.includes("0x")) {
          // console.log("[ERROR] No asset contract address");
          return;
        }

        // transfer ETH
        if (this.selectedToken.symbol === "ETH") {
          this.createMetamaskTx(false, "", addr[0], this.fromAmount);
          return;
        }

        // transfer erc20 tokens
        if (this.selectedToken.chain_id === ETHUUID) {
          this.createMetamaskTx(
            true,
            this.selectedToken.asset_key,
            addr[0],
            this.fromAmount
          );
          return;
        }
        return;
      }

      // Other Network
      this.confirmDepositDialog = true;
      this.$store.commit("setDepositAddr", addr);
    },

    async getFromBalance() {
      if (!this.connected) {
        console.error("[000] Please connect wallet first.");
        return;
      }
      if (window.ethereum == undefined) {
        console.error("[001] window.ethereum undefined");
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
      const provider = new ethers.providers.Web3Provider(
        connectedWallet.value.provider,
        "any"
      );
      let signer = provider.getSigner();
      let userAddr = await signer.getAddress();

      if (this.selectedToken.asset_id === ETHUUID) {
        // console.log("Selected ETH")
        let addr = ethers.utils.getAddress(userAddr);
        let balance = ethers.utils.formatEther(await provider.getBalance(addr));
        this.fromBalance = balance;
        this.fetchingBalance = false;
        this.fromBalanceVisble = true;
        return;
      }

      if (!this.selectedToken.asset_key.includes("0x")) {
        // console.log("Not ERC20 Token");
        this.fetchingBalance = false;
        this.fromBalanceVisble = false;
        return;
      }

      // console.log("Selected ERC20 token")
      let tokenContract = new ethers.Contract(
        this.selectedToken.asset_key,
        ERC20ABI,
        provider
      );
      let tokenBalance = await tokenContract.balanceOf(userAddr);
      let balance = ethers.utils.formatEther(tokenBalance);
      this.fromBalance = balance;
      this.fetchingBalance = false;
      this.fromBalanceVisble = true;
    },

    async createMetamaskTx(erc20, asset_address, to_address, value) {
      if (window.ethereum == undefined) {
        return;
      }

      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();

      this.txSent = true;
      let tx_value = ethers.utils.parseUnits(value, "ether").toHexString();
      if (erc20) {
        try {
          let tokenContract = new ethers.Contract(
            asset_address,
            ERC20ABI,
            provider
          );
          let tokenContractSigner = tokenContract.connect(signer);

          tokenContractSigner.transfer(asset_address, tx_value);
        } catch (error) {
          console.log(error);
        }
      } else {
        const transactionParameters = {
          from: ethers.utils.getAddress(await signer.getAddress()),
          to: to_address,
          value: tx_value,
          chainId: 0x1,
        };
        try {
          let tx = await provider
            .getSigner()
            .sendTransaction(transactionParameters);
          console.log(tx);
          this.txConfirmed = true;
          this.txSucceed = true;
        } catch (error) {
          if (error.code === "INSUFFICIENT_FUNDS") {
            this.txErrorText = "Insufficient Balance.";
          }
          if (error.code === 4001) {
            this.txErrorText = "Transaction rejected.";
          }
          this.txConfirmed = true;
          this.txSucceed = false;
          console.log(error);
        }
      }
    },

    async getDepositAddress(asset_id) {
      let suser = localStorage.getItem("user");
      if (suser) {
        let user = JSON.parse(suser);
        let client = NewClient(
          user.client_id,
          user.session_id,
          user.private_key
        );
        let asset = await client.readAsset(asset_id);
        let dest = asset.deposit_entries[0].destination;
        let tag = asset.deposit_entries[0].tag;
        return [dest, tag];
      }
    },
    // handleChanges() {
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
    checkNetwork(chain_symbol) {
      return this.$store.state.supportMetamaskNetworks.includes(chain_symbol);
    },
    followNetwork() {
      // make sure connected network is the same as selected network
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