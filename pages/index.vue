<template>
  <v-row justify="center" align="center">
    <div class="my-3">
      <v-img
        src="https://scan.mvm.dev/images/mvm-logo-df43b7ab7c6a8fdcef3cefb89e854f9b.svg?vsn=d"
        max-width="329px"
      />
    </div>
    <v-col cols="12" class="d-flex justify-center">
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

    <v-col cols="12" class="d-flex justify-center">
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

    <v-col cols="12" class="d-flex justify-center">
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
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      window.location.href = "https://metamask.io/download/";
    }
  },
};
</script>
