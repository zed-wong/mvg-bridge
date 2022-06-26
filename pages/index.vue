<template>
  <v-row justify="center" align="center">
    <v-col cols="6" class="d-flex justify-center">
      <v-card elevation="1" width="360px">
        <v-card-title> Register </v-card-title>
        <v-card-text>
          If it's your first time using MVM, pelase accomplish this step first.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link to="register" class="pl-2">
            <v-btn elevation="0" color="transparent"> Register </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="6" class="d-flex justify-center">
      <v-card elevation="1" width="360px">
        <v-card-title> Deposit </v-card-title>
        <v-card-text>
          Deposit from your Mixin Messenger to your Metamask wallet (MVM
          mainnet)
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link to="deposit" class="pl-2">
            <v-btn elevation="0" color="transparent"> Deposit </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="6" class="d-flex justify-center">
      <v-card elevation="1" width="360px">
        <v-card-title> Withdraw </v-card-title>
        <v-card-text>
          Withdraw from your Metamask wallet to any Mixin User. (Mixin Network)
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link to="withdraw" class="pl-2">
            <v-btn elevation="0" color="transparent"> Withdraw </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="6" class="d-flex justify-center">
      <v-card elevation="1" width="360px">
        <v-card-title> Query </v-card-title>
        <v-card-text>
          Query Asset Address or User Address from Registry contract.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link to="query" class="pl-2">
            <v-btn elevation="0" color="transparent"> Query </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="6" class="d-flex justify-center">
      <v-card elevation="1" width="360px">
        <v-card-title> Add Token </v-card-title>
        <v-card-text>
          Add a Mixin Network asset token into your Metamask.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link to="addtoken" class="pl-2">
            <v-btn elevation="0" color="transparent"> Add </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  layout:"links",
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      window.location.href = "https://metamask.io/download/";
    }
  },
};
</script>
