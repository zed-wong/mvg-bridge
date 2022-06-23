<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <nuxt-link to="register">Step 1: register </nuxt-link>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <nuxt-link to="transfer">Step 2: transfer </nuxt-link>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else{
      window.location.href = "https://metamask.io/download/"
    }
  }
}
</script>
