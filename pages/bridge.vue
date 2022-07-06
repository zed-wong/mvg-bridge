<template>
  <v-row>
    <v-col cols="12" class="mt-10 mb-5 text-center d-flex flex-column">
      <span class="text-h5 font-weight-normal"> Bridge <br /> </span>
      <div class="mt-3">
        <span class="font-weight-light" style="font-size: 12px">
          Powered By Zed Wong and MixPay
        </span>
      </div>
    </v-col>
    <v-col cols="2" class="pr-0 pb-0 grey lighten-4">
      <v-select
        solo
        flat
        v-model="select"
        item-text="symbol"
        :items="payassetList"
        background-color="#f5f5f5"
        :hint="`${select.network} Mainnet`"
        placeholder="Pay Asset"
        return-object
      >
        <template v-slot:selection="{ item, index }">
          <v-img max-width="32px" :src="item.iconUrl" class="mr-3" />
          <span style="font-size: 20px">{{ item.symbol }}</span>
        </template>
        <template v-slot:item="{ item }">
          <v-img max-width="32px" :src="item.iconUrl" class="mr-2" />
          <span>{{ item.name }}</span>
        </template>
      </v-select>
    </v-col>
    <v-col cols="10" class="pl-0 pb-0 grey lighten-4">
      <v-text-field
        background-color="#f5f5f5"
        placeholder="From"
        v-model="from"
        :rules="fromRules"
        @change="checkBalance"
        solo
        flat
      />
    </v-col>
    <v-col cols="2" class="pr-0 pb-0 grey lighten-4">
      <v-select
        solo
        flat
        v-model="select1"
        item-text="symbol"
        background-color="#f5f5f5"
        :items="settleassetList"
        :hint="`MVM Mainet`"
        placeholder="Receive Asset"
        return-object
      >
        <template v-slot:selection="{ item, index }">
          <v-img max-width="32px" :src="item.iconUrl" class="mr-3" />
          <span style="font-size: 20px">{{ item.symbol }}</span>
        </template>
        <template v-slot:item="{ item }">
          <v-img max-width="32px" :src="item.iconUrl" class="mr-2" />
          <span>{{ item.name }}</span>
        </template>
      </v-select>
    </v-col>
    <v-col cols="10" class="pl-0 pb-0 grey lighten-4">
      <v-text-field
        background-color="#f5f5f5"
        placeholder="To"
        v-model="to"
        solo
        flat
      />
    </v-col>
    <v-col cols="12" class="pt-0 pl-8 grey lighten-4" v-if="fetching">
      <v-progress-circular
        width="1"
        size="10"
        indeterminate
        color="dark"
        class="mr-2"
      ></v-progress-circular>
      <span class="font-weight-light" style="font-size"
        >Fetching best price</span
      >
    </v-col>
    <v-col cols="12" class="mt-3 pl-0" v-if="priceGot">
      <v-list-item>
        <span style="font-weight:300"> Price </span>
        <v-spacer />
        <span style="font-weight:500"> {{ priceString }} </span>
      </v-list-item>
      <v-list-item>
        <span style="font-weight:300"> Route </span>
        <v-spacer />
        <span style="font-weight:500"> {{ routeString }} </span>
      </v-list-item>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn
        x-large
        rounded
        depressed
        v-if="!connected"
        @click="connectWallet"
        :loading="connectLoading"
        class="six00-weight mt-5"
      >
        Connect Wallet
      </v-btn>
      <v-btn
        x-large
        rounded
        depressed
        v-if="connected"
        :disabled="!fromValid"
        @click="createPayment"
        :loading="createLoading"
        class="six00-weight mt-5"
      >
        {{ createPaymentBtn }}
      </v-btn>
    </v-col>
    <v-col cols="12" class="d-flex justify-center" v-if="paymentCreated">
      <v-card
        height="200px"
        width="600px"
        elevation="0"
        class="grey lighten-2 mt-3"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Destination: {{ destinationAddress }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-snackbar v-model="snackbar">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
// 1. Enter coin type and amount (Chains supported by Mixpay)
// 2. Call Mixpay API to create payment
// 3. Call Metamask to transfer Or generate QRcode
// 4. Track tx by calling Mixpay API.
import PaymentAssets from "@/assets/mixpay/paymentAssets.json";
import SettlementAssets from "@/assets/mixpay/settlementAssets.json";
import { provider } from "@/helpers/registry";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";

export default {
  data() {
    return {
      to: "",
      from: "",
      select: {
        name: "Ether",
        symbol: "ETH",
        iconUrl:
          "https://app.mixpay.me/fiats/43d61dcd-e413-450d-80b8-101d5e903357.png",
        assetId: "43d61dcd-e413-450d-80b8-101d5e903357",
        network: "Ethereum(ERC20)",
        onChainSupported: true,
        minPaymentAmount: "0.00000879",
        maxPaymentAmount: "8.79700901",
        chainAsset: {
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          name: "Ether",
          symbol: "ETH",
          iconUrl:
            "https://app.mixpay.me/fiats/43d61dcd-e413-450d-80b8-101d5e903357.png",
        },
      },
      select1: {
        name: "Mixin",
        symbol: "XIN",
        iconUrl:
          "https://app.mixpay.me/fiats/c94ac88f-4671-3976-b60a-09064f1811e8.png",
        assetId: "c94ac88f-4671-3976-b60a-09064f1811e8",
        network: "Ethereum(ERC20)",
        onChainSupported: false,
        minPaymentAmount: "0.00006441",
        maxPaymentAmount: "64.41710431",
        chainAsset: {
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          name: "Ether",
          symbol: "ETH",
          iconUrl:
            "https://app.mixpay.me/fiats/43d61dcd-e413-450d-80b8-101d5e903357.png",
        },
      },
      balance: 0.0,
      fetching: false,
      priceGot: false,
      connectLoading: false,
      priceString: "",
      routeString: "",
      createLoading: false,
      paymentCreated: false,
      createPaymentBtn: "Create Payment",
      payassetList: PaymentAssets.data,
      settleassetList: SettlementAssets.data,
      paymentAssetID: "",
      settlementAssetId: "",
      fromRules: [
        (v) => {
          if (!v) return "Please enter amount";
          if (v && v <= Number(this.select.minPaymentAmount)) {
            this.fromValid = false;
            return `Min Amount is ${this.select.minPaymentAmount}`;
          }
          if (v && v >= Number(this.select.maxPaymentAmount)) {
            this.fromValid = false;
            return `Max Amount is ${this.select.maxPaymentAmount}`;
          }
          this.estimatePayment();
          this.fromValid = true;
          return true;
        },
      ],
      fromValid: false,

      // Payment
      estimatedAmount: "",
      destinationAddress: "",

      // Error
      errorMessage: "",
      snackbar: false,
    };
  },
  watch: {
    select(newValue, oldValue) {
      if (this.from.length != 0) {
        this.estimatePayment();
      }
    },
    select1(newValue, oldValue) {
      if (this.from.length != 0) {
        this.estimatePayment();
      }
    },
  },
  computed: {
    connected() {
      return this.$store.state.connected;
    },
    address() {
      return this.$store.state.address;
    },
  },
  mounted() {
    this.connectWallet();
    this.getBalance();
  },
  methods: {
    async connectWallet() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.register(accounts[0]);
      // console.log(accounts[0]);

      this.$store.commit("connect", accounts[0]);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x1") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        } catch (error) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: chain,
            });
          }
        }
      }
    },
    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
    },
    async createPayment() {
      this.createLoading = true;
      try {
        if (this.select != "" && this.select1 != "" && this.from != "") {
          let result = await this.$axios.post(
            "https://api.mixpay.me/v1/payments",
            {
              payeeId: JSON.parse(localStorage.getItem("user")).client_id || "",
              orderId: uuidv4(),
              paymentAssetId: this.select.assetId,
              settlementAssetId: this.select1.assetId,
              quoteAssetId: this.select1.assetId,
              paymentAmount: this.from,
              isChain: 1,
            }
          );
          let data = result.data.data;
          console.log(data);

          if (this.select1.chainAsset.symbol == "ETH") {
            this.createMetamaskTx(data.destination, this.from);
          } else {
            // Print QR code
          }
          this.destinationAddress = data.destination;
          this.to = data.quoteAmount;
          this.paymentCreated = true;
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error;
        this.snackbar = true;
      }
      this.createLoading = false;
    },
    async estimatePayment() {
      this.paymentCreated = false;
      this.fetching = true;
      try {
        if (this.select != "" && this.select1 != "" && this.from != "") {
          let result = await this.$axios.get(
            "https://api.mixpay.me/v1/payments_estimated",
            {
              params: {
                paymentAssetId: this.select.assetId,
                settlementAssetId: this.select1.assetId,
                quoteAssetId: this.select1.assetId,
                paymentAmount: this.from,
              },
            }
          );
          let data = result.data.data;
          // console.log(data);
          this.to = data.quoteAmount;

          let price = (this.to / this.from).toFixed(8);
          this.priceString = `1 ${this.select.symbol} = ${price} ${this.select1.symbol}`;
          this.routeString = `${this.select.network} Mainnet -> MVM Mainnet`;
          this.priceGot = true;
        }
      } catch (error) {
        console.log(error);
        if (error.toString().includes("403")) {
          this.errorMessage = "Error 403: Amount is too large or too small";
        } else {
          this.errorMessage = error;
        }
        this.snackbar = true;
        return;
      }
      this.fetching = false;
    },
    async getPaymentInfo(trace) {
      try {
        let result = await this.$axios.get(
          "https://api.mixpay.me/v1/payments_info",
          {
            params: {
              traceId: trace,
            },
          }
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async createMetamaskTx(depositAddress, value) {
      // let gas = await getETHEstimatedGas();
      // console.log(gas);

      const transactionParameters = {
        from: window.ethereum.selectedAddress,
        to: depositAddress,
        value: ethers.utils.parseUnits(value, "ether").toHexString(),
        chainId: 0x1,
      };
      try {
        let txHash = await provider.sendTransaction(transactionParameters)
        console.log(`https://scan.mvm.dev/tx/${txHash}`);
      } catch (error) {
        this.errorMessage = error;
        this.snackbar = true;
        console.log("deposit error:", error);
      }
    },
    async getBalance(){
      this.balance = await provider.getBalance()._hex
    },
    async checkBalance(){
      console.log("check balance")
      if (Number(this.from) > this.balance) {
        console.log(this.balance)
        this.fromValid = false
        this.createPaymentBtn = "Insufficient Balance"
        return
      }
      this.createPaymentBtn = "Create Payment"
    }
  },
};
</script>

<style>
.six00-weight {
  font-weight: 600;
}
</style>