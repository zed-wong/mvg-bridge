<template>
  <v-row>
    <v-col cols="12" class="mt-10 mb-5 text-center d-flex flex-column">
      <span class="text-h5 font-weight-normal"> Bridge <br /> </span>
      <div class="mt-3">
        <span class="font-weight-light" style="font-size: 12px">
          From Other Networks To MVM
        </span>
      </div>
    </v-col>
    <v-col cols="3" class="pr-0 pb-0 grey lighten-4">
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
    <v-col cols="9" class="pl-0 pb-0 grey lighten-4">
      <v-text-field
        background-color="#f5f5f5"
        placeholder="From"
        v-model="from"
        solo
        flat
        @change="estimatePayment()"
      />
    </v-col>
    <v-col cols="3" class="pr-0 pb-0 grey lighten-4">
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
    <v-col cols="9" class="pl-0 pb-0 grey lighten-4">
      <v-text-field
        background-color="#f5f5f5"
        placeholder="To"
        v-model="to"
        solo
        flat
      />
    </v-col>
    <v-col cols="12" class="pt-0 pl-8 grey lighten-4" v-if="fetching">
      <v-progress-circular width="1" size="10" indeterminate color="dark" class="mr-2"></v-progress-circular>
      <span>Fetching Best Price</span>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn x-large rounded depressed class="six00-weight mt-5 mr-10">
        Approve
      </v-btn>
      <v-btn
        x-large
        rounded
        depressed
        @click="createPayment"
        :loading="createLoading"
        class="six00-weight mt-5"
      >
        Create Payment
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
            <v-list-item-title> Destination: {{ address }}</v-list-item-title>
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

<script type="ts">
// 1. Enter coin type and amount (Chains supported by Mixpay)
// 2. Call Mixpay API to create payment
// 3. Call Metamask to transfer Or generate QRcode
// 4. Track tx by calling Mixpay API.
import PaymentAssets from "@/assets/mixpay/paymentAssets.json";
import SettlementAssets from "@/assets/mixpay/settlementAssets.json";
import { v4 as uuidv4 } from "uuid";

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
        chainAsset: {
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          name: "Ether",
          symbol: "ETH",
          iconUrl:
            "https://app.mixpay.me/fiats/43d61dcd-e413-450d-80b8-101d5e903357.png",
        },
      },
      fetching: false,
      createLoading: false,
      paymentCreated: false,
      payassetList: PaymentAssets.data,
      settleassetList: SettlementAssets.data,
      paymentAssetID: "",
      settlementAssetId: "",

      // Payment
      address: "",
      estimatedAmount: "",

      // Error
      errorMessage: "",
      snackbar: false,
    };
  },
  methods: {
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

          this.address = data.destination;
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
          console.log(data);

          this.to = data.quoteAmount;
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error;
        this.snackbar = true;
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
  },
};
</script>

<style>
.six00-weight {
  font-weight: 600;
}
</style>