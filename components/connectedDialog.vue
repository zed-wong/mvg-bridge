<template>
  <v-dialog v-model="accountDialog" max-width="460px" overlay-opacity="0.15">
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pa-0">
          <v-spacer />
          <v-btn icon @click="accountDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>

        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <v-avatar>
            <v-img :src="avatarURL" />
          </v-avatar>
          <div class="d-flex flex-column ml-4">
            <div class="d-flex flex-row">
              <span class="connected-dialog-address-text">
                {{ userAddress }}
              </span>
            </div>
            <div @click="copyAddr(userAddress)">
              <v-tooltip v-model="copySucceed" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <a style="color: black; opacity: 0.5">
                    <v-icon small> mdi-content-copy </v-icon>
                    <span style="font-size: 0.8rem"> {{ $t('copy_address') }} </span>
                  </a>
                </template>
                <span style="font-size:12px"> {{ $t('copied') }} </span>
              </v-tooltip>
            </div>
          </div>
        </v-col>

        <v-col class="align-center d-flex flex-column mt-4">
          <v-btn elevation="0" class="disconnect-btn mb-3" rounded block x-large @click="viewOnExplorer">
            <v-icon class="mr-2"> mdi-firefox </v-icon>
            <span> {{ $t('view_on_explorer') }} </span>
          </v-btn>
          <v-btn elevation="0" class="disconnect-btn" rounded block x-large @click="disconnect">
            <v-icon class="mr-2"> mdi-logout </v-icon>
            <span> {{ $t('disconnect') }} </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { useOnboard } from '@web3-onboard/vue'

export default {
  data() {
    return {
      avatarURL: "",
      copySucceed: false,
    };
  },
  computed: {
    accountDialog: {
      get() {
        return this.$store.state.accountDialog;
      },
      set(n) {
        this.$store.commit("toggleAccount", n);
      },
    },
    userAddress: {
      get() {
        return this.$store.state.userAddress;
      },
    },
  },
  mounted() {
    this.avatarURL = this.getAvatar(8);
  },
  methods: {
    getAvatar(length) {
      if (localStorage.getItem("avatar_url")) {
        return localStorage.getItem("avatar_url");
      }
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      let url = "https://api.multiavatar.com/" + result + ".svg";
      localStorage.setItem("avatar_url", url);
      return url;
    },
    copyAddr(value) {
      try{
        navigator.clipboard.writeText(value);
      } catch(error){
        console.log(error)
        return;
      }
      this.copySucceed = true;
      setTimeout(() => {
        this.copySucceed = false;
      }, "2000")
    },
    viewOnExplorer(){
      if (this.userAddress){
        window.open(`https://scan.mvm.dev/address/${this.userAddress}`)
      } else {
        window.open(`https://scan.mvm.dev/`)
      }
    },
    disconnect(){
      const { disconnectConnectedWallet } = useOnboard()
      disconnectConnectedWallet()
      this.$store.commit("disconnect");
      this.accountDialog = false;
    }
  },
};
</script>

<style scoped>
.connected-dialog-address-text {
  max-width: 180px;
  font-weight: 500;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.disconnect-btn {

}
</style>