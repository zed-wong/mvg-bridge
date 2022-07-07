<template>
  <v-row>
    <v-col cols="12" class="mt-10 mb-5 text-center d-flex flex-column">
      <span class="text-h5 font-weight-normal"> Bridge <br /> </span>
      <div class="mt-3">
        <span class="font-weight-light" style="font-size: 12px">
          Deposit to MVM Mainnet
        </span>
      </div>
    </v-col>
    <v-col cols="2" class="pr-0 pb-0 grey lighten-4">
      <v-select
        solo
        flat
        cache-items
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
        <span style="font-weight: 300"> Price </span>
        <v-spacer />
        <span style="font-weight: 500"> {{ priceString }} </span>
      </v-list-item>
      <v-list-item>
        <span style="font-weight: 300"> Route </span>
        <v-spacer />
        <span style="font-weight: 500"> {{ routeString }} </span>
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
      <v-dialog v-model="dialog" width="600px" v-if="connected">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            rounded
            depressed
            :disabled="!fromValid"
            @click="createPayment"
            :loading="createLoading"
            class="six00-weight mt-5"
          >
            {{ createPaymentBtn }}
          </v-btn>
        </template>
        <!-- For Other network tx -->
        <v-card
          flat
          class="px-3"
          rounded="xl"
          height="600px"
          width="600px"
          v-if="select.chainAsset.symbol != 'ETH'"
        >
          <v-col cols="12" class="pt-4 pb-0 d-flex justify-end">
            <v-icon @click="dialog = false"> mdi-close</v-icon>
          </v-col>
          <div class="pb-2 text-center" style="font-size: 18px">
            <span> Send </span>
            <span class="font-weight-bold">
              {{ from }} {{ select.symbol }}</span
            >
            <span> from {{ select.network }} Mainnet to MVM Mainnet </span>
          </div>
          <v-list-item class="pt-3">
            <span style="font-weight: 300"> Destination </span>
            <v-spacer />
            <span style="font-weight: 500"> {{ paymentData.destination }} </span>
          </v-list-item>
          <v-list-item>
            <span style="font-weight: 300"> NetWork </span>
            <v-spacer />
            <span style="font-weight: 500"> {{ select.network }} Mainnet </span>
          </v-list-item>
          <v-list-item>
            <span style="font-weight: 300"> Transfer Amount </span>
            <v-spacer />
            <span style="font-weight: 500">
              {{ from }} {{ select.symbol }}
            </span>
          </v-list-item>
          <v-list-item>
            <span style="font-weight: 300"> Timeout </span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-2" size="16px" v-bind="attrs" v-on="on">
                  mdi-alert-circle-outline
                </v-icon>
              </template>
              <span>
                Please complete payment before timeout, otherwise the payment
                will fail</span
              >
            </v-tooltip>
            <v-spacer />
            <vac :end-time="new Date(Number(paymentData.expire) * 1000)">
              <span
                slot="process"
                slot-scope="{ timeObj }"
                style="font-weight: 500"
              >
                {{ timeObj.h }} h {{ timeObj.m }} m {{ timeObj.s }} s
              </span>
              <span slot="finish">Expired, please create a new payment</span>
            </vac>
          </v-list-item>
          <v-hover>
            <v-list-item class="d-flex justify-center mt-2">
              <vue-qrcode
                :value="paymentData.destination"
                :options="{ width: 300 }"
              />
            </v-list-item>
          </v-hover>
        </v-card>
        <!-- For ETH Mainnet Metamask tx -->
        <v-card
          flat
          v-else
          rounded="xl"
          width="600px"
          height="300px"
          class="px-3"
        >
          <v-col cols="12" class="pt-5 pb-0 d-flex justify-end">
            <v-icon @click="dialog = false"> mdi-close</v-icon>
          </v-col>
          <div class="pb-3 text-center" style="font-size: 18px">
            <span> Send </span>
            <span class="font-weight-bold">
              {{ from }} {{ select.symbol }}</span
            >
            <span> from Ethereum Mainnet to MVM Mainnet </span>
          </div>
          <div class="pt-2 pb-1 text-center" style="font-size: 14px">
            <span> Estimated Received: </span>
          </div>
          <div
            class="pb-2 text-center font-weight-bold"
            style="font-size: 14px"
          >
            <span> {{ to }} {{ select1.symbol }} </span>
          </div>
          <div
            class="pt-3 pb-2 text-center font-weight-light"
            style="font-size: 10px"
          >
            <span> Please make sure your wallet is <br />connected to the </span
            ><span style="font-weight: 500">Ethereum</span><span> Network.</span>
          </div>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn depressed x-large rounded @click="createMetamaskTx(paymentData.destination, from)"> Send </v-btn>
          </v-col>
        </v-card>
      </v-dialog>
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
import VueQrcode from "@chenfengyuan/vue-qrcode";
// import { NetworkBaseClient } from "mixin-node-sdk";
import { provider } from "@/helpers/registry";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";

export default {
  components: {
    VueQrcode,
  },
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
        maxPaymentAmount: "9",
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
        maxPaymentAmount: "65",
        chainAsset: {
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          name: "Ether",
          symbol: "ETH",
          iconUrl:
            "https://app.mixpay.me/fiats/43d61dcd-e413-450d-80b8-101d5e903357.png",
        },
      },
      dialog: false,
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
          this.createPaymentBtn = "Create Payment";
          this.estimatePayment();
          return true;
        },
      ],
      fromValid: false,

      // Payment
      paymentData: {},

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
  },
  methods: {
    async connectWallet() {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.register(accounts[0]);

        this.$store.commit("connect", accounts[0]);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId != "0x1") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        }
      } catch (error) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: chain,
          });
        }
        console.log(error);
        this.errorMessage = error;
        this.snackbar = true;
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
      if (!this.select.onChainSupported){
        this.errorMessage = "This asset is not supported yet.";
        this.snackbar = true;
        return;
      }
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
              quoteAssetId: this.select.assetId,
              paymentAmount: this.from,
              isChain: 1,
              expireSeconds: 86400,
            }
          );
          let data = result.data.data;
          console.log(data);
          
          this.paymentData = data;
          this.paymentCreated = true;
          this.dialog = true;
          this.to = data.estimatedSettlementAmount;

          localStorage.setItem(data.traceId, JSON.stringify(data))
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
      this.fromValid = false;
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
          this.to = data.estimatedSettlementAmount;

          let price = (this.to / this.from).toFixed(8);
          this.priceString = `1 ${this.select.symbol} = ${price} ${this.select1.symbol}`;
          this.routeString = `${this.select.network} Mainnet -> MVM Mainnet`;
          this.priceGot = true;
        }
      } catch (error) {
        console.log(error);
        if (error.toString().includes("403")) {
          this.errorMessage = "Error: Amount is too large or too small";
        } else {
          this.errorMessage = error;
        }
        this.snackbar = true;
        return;
      }
      this.fromValid = true;
      this.fetching = false;
    },
    async getPaymentResult(trace) {
      try {
        let result = await this.$axios.get(
          "https://api.mixpay.me/v1/payments_result",
          {
            params: {
              traceId: trace,
            },
          }
        );
        console.log(result);
      } catch (error) {
        this.errorMessage = error;
        this.snackbar = true;
        console.log(error);
      }
    },
    async createMetamaskTx(depositAddress, value) {
      const transactionParameters = {
        from: window.ethereum.selectedAddress,
        to: depositAddress,
        value: ethers.utils.parseUnits(value, "ether").toHexString(),
        chainId: 0x1,
      };
      try {
        let txHash = await provider.sendTransaction(transactionParameters);
        console.log(`https://etherscan.io/tx/${txHash}`);
      } catch (error) {
        this.errorMessage = error;
        this.snackbar = true;
        console.log("deposit error:", error);
      }
    },
    async getBalance() {
      this.balance = await provider.getBalance()._hex;
    },
    async checkBalance() {
      console.log("check balance");
      if (Number(this.from) > this.balance) {
        this.fromValid = false;
        this.createPaymentBtn = "Insufficient Balance";
        return;
      }
      this.createPaymentBtn = "Create Payment";
    },
  },
};
</script>

<style>
.six00-weight {
  font-weight: 600;
}
.theme--light.v-text-field--outline:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover {
  background-color: ;
}
</style>