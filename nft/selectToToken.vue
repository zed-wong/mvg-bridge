<template>
  <v-dialog
    v-model="selectTokenDialog"
    class="dialog-css"
    max-width="500px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
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
      <v-row class="my-15 d-flex justify-center" v-if="nftsLoading">
        <v-progress-circular indeterminate color="primary" />
      </v-row>
      <v-row v-if="withdrawNftsLoaded">
        <v-col
          xs="6"
          sm="4"
          md="4"
          v-for="(nft, i) in tokens"
          :key="i"
          class="py-3"
          @click="selectNFT(nft)"
        >
          <nft :nft="nft" type="withdraw"/>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import nft from "../nft/nft.vue";
import { ethers } from 'ethers';
import { useOnboard } from "@web3-onboard/vue";
import { getNFTsFromExplorer } from "../helpers/nft";

export default {
  components: { nft },
  computed: {
    selectTokenDialog: {
      get() {
        return this.$store.state.nft.selectToTokenDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleSelectToToken", value);
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
    withdrawNftsLoaded: {
      get() {
        return this.$store.state.nft.withdrawNftsLoaded;
      },
      set(n) {
        this.$store.commit("nft/setWithdrawNftsLoaded", n);
      },
    },
    selectedToken: {
      get() {
        return this.$store.state.nft.toToken;
      },
      set(n) {
        this.$store.commit("nft/setToToken", n);
      },
    },
    tokens: {
      get() {
        return this.$store.state.nft.withdrawNfts;
      },
      set(n) {
        this.$store.commit("nft/setWithdrawNFTs", n);
      }
    },
    userAddress() {
      return this.$store.state.userAddress;
    },
  },
  watch: {
    selectTokenDialog(n,o){
      if (n && !this.withdrawNftsLoaded) this.refresh();
    }
  },
  methods: {
    selectNFT(nft) {
      this.selectedToken = nft;
      this.selectTokenDialog = false;
    },
    async refresh() {
      this.withdrawNftsLoaded = false;
      this.nftsLoading = true;
      
      try{
        const { connectedWallet } = useOnboard();
        const provider = new ethers.providers.Web3Provider(
          connectedWallet.value.provider,
          "any"
        );
        const tokenURIs = await getNFTsFromExplorer(this.userAddress, provider);
        console.log(tokenURIs);
        this.tokens = [
          {collection: {id:'4aa4c030-a293-4979-8252-9fa776134cdb', name: 'OneNightinHamburg'}, token: {id:'1', name: 'Night', icon: {url:'https://trident.ap-south-1.linodeobjects.com/r6rhqicn14nn2gc9h5iudyzt1yz2'}}},
          {collection: {id:'4aa4c030-a293-4979-8252-9fa776134cdb', name: 'OneNightinHamburg'}, token: {id:'2', name: 'Light', icon: {url:'https://trident.ap-south-1.linodeobjects.com/ml341rfcpi6g18eje53gokmli39l'}}},
          {collection: {id:'4aa4c030-a293-4979-8252-9fa776134cdb', name: 'OneNightinHamburg'}, token: {id:'3', name: 'fight', icon: {url:'https://trident.ap-south-1.linodeobjects.com/2urbhjliu2of7hfmm1q1we7jxga8'}}},
          {collection: {id:'4aa4c030-a293-4979-8252-9fa776134cdb', name: 'OneNightinHamburg'}, token: {id:'3', name: 'flight', icon: {url:'https://trident.ap-south-1.linodeobjects.com/qonfdli26imb8jhc821h0z7pr39u'}}},
        ];
        console.log(this.tokens);
      } catch (error) {
        console.log(error);
        this.withdrawNftsLoaded = true;
        this.nftsLoading = false;
      }

      this.withdrawNftsLoaded = true;
      this.nftsLoading = false;
    },
  },
};
</script>

<style scoped>
.nft-background{
  background-color: #f4f7fa;
}
</style>