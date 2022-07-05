<template>
  <v-row>
    <v-col cols="12" class="mt-10 mb-5 text-center d-flex flex-column">
      <span class="text-h5 font-weight-normal">
        Bridge <br/>
      </span>
      <div class="mt-2">
      <span class="body-2 font-weight-light">
        Deposit through Mixpay
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
        :hint="`${select.network} Network`"
        placeholder="Pay Asset"
        return-object
      />
    </v-col>
    <v-col cols="10" class="pl-0 pb-0 grey lighten-4">
      <v-text-field
        background-color="#f5f5f5"
        placeholder="From"
        v-model="from"
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
      />
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
    <v-col cols="12" class="text-center">
      <v-btn
        dark
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
            <v-list-item-title> Destination: {{address}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
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
      select: "",
      select1: "",
      createLoading: false,
      paymentCreated: false,
      payassetList: PaymentAssets.paymentAssets,
      settleassetList: SettlementAssets.settlementAssets,
      paymentAssetID: "",
      settlementAssetId: "",
      
      // Payment
      address: "",
    };
  },
  methods: {
    async createPayment() {
      if (this.select != "" && this.select1 != "" && this.from != "") {
        this.createLoading = true;

        let result = await this.$axios
          .post("https://api.mixpay.me/v1/payments", {
            payeeId: JSON.parse(localStorage.getItem("user")).client_id || "",
            orderId: uuidv4(),
            paymentAssetId: this.select.uuid,
            settlementAssetId: this.select1.uuid,
            quoteAssetId: this.select1.uuid,
            quoteAmount: this.from,
            isChain: 1,
          })
          .catch(function (error) {
            console.log(error);
          });
        let data = result.data.data;
        console.log(data);

        this.address = data.destination

        this.createLoading = false;
        this.paymentCreated = true;
      }
    },
  },
};
</script>

<style>
.six00-weight{
  font-weight: 600;
}
</style>