<template>
  <div>
    <v-alert type="error" class="mb-10" v-if="!installed">
      Metamask is not installed! Please
      <a href="https://metamask.io/download/">install</a> first.
    </v-alert>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        sm="4"
        xs="4"
        class="d-flex justify-center"
        v-for="(item, i) in items"
        :key="i"
      >
        <v-card elevation="1" width="360px">
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-text>
            {{ item.intro }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <nuxt-link :to="item.to" class="pl-2">
              <v-btn elevation="0" color="transparent">
                {{ item.btntext }}
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "links",
  data() {
    return {
      installed: false,
      items: [
        {
          name: "Register",
          intro:
            "This is the register step which has been done when you connected",
          to: "register",
          btntext: "Register",
        },
        {
          name: "Deposit From Mixin Messenger",
          intro:
            "Deposit from your Mixin Messenger to your Metamask wallet (MVM mainnet)",
          to: "deposit",
          btntext: "Deposit From MM",
        },
        {
          name: "Withdraw To Mixin Messenger",
          intro:
            "Withdraw from your Metamask wallet to any Mixin User. (Mixin Network)",
          to: "withdraw",
          btntext: "Withdraw To MM",
        },
        {
          name: "Add Token",
          intro: "Add a Mixin Network asset token into your Metamask.",
          to: "addtoken",
          btntext: "Add",
        },
        {
          name: "Deposit By Address",
          intro:
            "Deposit from anywhere by address to your Metamask wallet (MVM mainnet)",
          to: "anydeposit",
          btntext: "Deposit",
        },
        {
          name: "Withdraw To Address",
          intro: "Withdraw from your Metamask wallet to any Address.(WIP)",
          to: "anywithdraw",
          btntext: "Withdraw",
        },
        {
          name: "Verify User",
          intro: "Verify user before claim faucet, a useless sample for building faucet.",
          to: "verify",
          btntext: "Verify",
        }
        // { name: "Query", intro:"Query Asset Address or User Address from Registry contract.", to: "query", btntext:"Query"},
        // { name: "", intro:"", to: "", btntext:""},
      ],
    };
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      this.installed = true;
      return
    }
    this.installed = false;
  },
};
</script>
