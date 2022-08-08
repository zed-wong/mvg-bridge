<template>
  <v-dialog
    v-model="connectMixinDialog"
    class="dialog-css"
    max-width="310px"
    overlay-opacity="0.95"
  >
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pa-0">
          <v-spacer />
          <v-btn icon @click="connectMixinDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="py-0 d-flex justify-center" v-if="qrLoaded">
          <vue-qrcode
            v-if="qrUrl"
            :value="qrUrl"
            :options="{ width: 200 }"
          />
        </v-col>
        <v-col class="my-10 d-flex justify-center" v-if="!qrLoaded">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
        <v-col>
          <span> 
            {{ $t('please_scan_qr_with_your_mixin_messenger') }}
          </span>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { getNFTsByToken } from "../helpers/nft";
import authorize from "../helpers/oauth/authorize";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const clientID = process.env.NFT_OAUTH_BOT_ID;
const scope = "PROFILE:READ COLLECTIBLES:READ";

export default {
  components: { VueQrcode },
  data() {
    return {
      qrUrl: "",
      qrLoaded: false,
      accessToken: null,
      outputs: null,
      client: null,
    };
  },
  computed: {
    connectMixinDialog: {
      get() {
        return this.$store.state.nft.connectMixinDialog;
      },
      set(value) {
        this.$store.commit("nft/toggleConnectMixin", value);
      },
    },
    mixinConnected: {
      get() {
        return this.$store.state.nft.mixinConnected;
      },
      set(n) {
        this.$store.commit("nft/connectMixin", n);
      },
    },
    nftsLoading:{
      get() {
        return this.$store.state.nft.nftsLoading
      },
      set(n) {
        this.$store.commit("nft/setNFTsLoading", n);
      }
    },
    nftsLoaded:{
      get() {
        return this.$store.state.nft.nftsLoaded
      },
      set(n) {
        this.$store.commit("nft/setNFTsLoaded", n);
      }
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
  async mounted() {
    this.client = authorize(
      { clientId: clientID, scope: scope, pkce: true },
      {
        onShowUrl: (url) => {
          this.qrUrl = url
          this.qrLoaded = true;
        },
        onError: (error) => {
          this.connectMixinDialog = false;
          console.error(error);
          return;
        },
        onSuccess: async (data) => {
          this.qrUrl = "";
          this.accessToken = data;
          this.mixinConnected = true;
          this.connectMixinDialog = false;
          this.nftsLoading = true;
          this.tokens = await getNFTsByToken(data);
          this.nftsLoading = false;
          this.nftsLoaded = true;
          localStorage.setItem("access_token", data);
          localStorage.setItem("tokens", JSON.stringify(this.tokens));
          return;
        },
      }
    );
  },
  methods: {
  
  },
};
// function getOutputByToken(tokenid) {
//   try {
//     let return_value = {};
//     let outputs = localStorage.getItem("outputs");
//     if (outputs) {
//       outputs = JSON.parse(outputs);
//       outputs.forEach((element) => {
//         if (element.token_id == tokenid) {
//           return_value = element;
//         }
//       });
//     }
//     return return_value;
//   } catch (error) {
//     console.log(error);
//   }
// }
</script>