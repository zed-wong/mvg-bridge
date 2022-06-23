<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center">
          <nuxt-link to="register">Step 1: register </nuxt-link>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center">
          <nuxt-link to="deposit">Step 2: deposit </nuxt-link>
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
