<template>
  <v-dialog
    v-model="selectTokenDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8 nft-background">
      <v-row no-gutters>
        <h1 class="select-token-css">{{ $t("select_nft") }}</h1>
        <v-spacer />
        <v-btn icon @click="refresh" class="mr-2">
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
        <v-btn icon @click="selectTokenDialog = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-row class="my-10 d-flex justify-center" v-if="nftsLoading">
        <v-progress-circular indeterminate color="primary" />
      </v-row>
      <v-row v-if="nftsLoaded">
        <v-col
          xs="6"
          sm="4"
          md="4"
          v-for="(nft, i) in tokens"
          :key="i"
          class="py-3"
          @click="selectNFT(nft)"
        >
          <nft :nft="nft" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import nft from "../nft/nft.vue";
import { getNFTsByToken } from "../helpers/nft";

export default {
  components: { nft },
  computed: {
    selectTokenDialog: {
      get() {
        return this.$store.state.nft.selectTokenDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectToken", value);
      },
    },
    nftsLoading: {
      get() {
        return this.$store.state.nft.nftsLoading;
      },
      set(n) {
        this.$store.commit("nft/setNFTsLoading", n);
      },
    },
    nftsLoaded: {
      get() {
        return this.$store.state.nft.nftsLoaded;
      },
      set(n) {
        this.$store.commit("nft/setNFTsLoaded", n);
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.nft.fromToken;
      },
      set(n) {
        this.$store.commit("nft/setFromToken", n);
      },
    },
    tokens: {
      get() {
        return this.$store.state.nft.nfts;
      },
      set(n) {
        this.$store.commit("nft/setNFTs", n);
      }
    }
  },
  methods: {
    selectNFT(nft) {
      this.selectedToken = nft;
      this.selectTokenDialog = false;
    },
    async refresh() {
      this.nftsLoaded = false;
      this.nftsLoading = true;
      
      const token = localStorage.getItem("access_token");
      try{
        if (token) { this.tokens = await getNFTsByToken(token); }
      } catch (error) {
        this.nftsLoaded = true;
        this.nftsLoading = false;
      }

      this.nftsLoaded = true;
      this.nftsLoading = false;
    },
  },
};
</script>

<style>
.nft-background{
  background-color: #f4f7fa;
}
</style>