<template>
  <v-row justify="center" align="center">
    <v-col cols="4" class="d-flex justify-center" v-for="(item,i) in items" :key="i">
      <v-card elevation="1" width="360px">
        <v-card-title> {{item.name}} </v-card-title>
        <v-card-text>
          {{item.intro}}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <nuxt-link :to="item.to" class="pl-2">
            <v-btn elevation="0" color="transparent"> {{item.btntext}} </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  layout:"links",
  data(){
    return {
      items: [
        { name: "Register", intro:"If it's your first time using MVM, pelase accomplish this step first.", to: "register", btntext:"Register"},
        { name: "Deposit", intro:"Deposit from your Mixin Messenger to your Metamask wallet (MVM mainnet)", to: "deposit", btntext:"Deposit"},
        { name: "Withdraw", intro:"Withdraw from your Metamask wallet to any Mixin User. (Mixin Network)", to: "withdraw", btntext:"Withdraw"},
        { name: "Query", intro:"Query Asset Address or User Address from Registry contract.", to: "query", btntext:"Query"},
        { name: "Add Token", intro:"Add a Mixin Network asset token into your Metamask.", to: "addtoken", btntext:"Add"},
        // { name: "", intro:"", to: "", btntext:""},
      ]
    }
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      window.location.href = "https://metamask.io/download/";
    }
  },
};
</script>
