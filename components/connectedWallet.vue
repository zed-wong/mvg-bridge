<template>
  <div>
    <v-btn
      height="40px"
      elevation="0"
      rounded
      color="#f4f7fa"
      class="ml-3 connected-wallet"
      @click="toggleAccountDialog"
    >
      <v-avatar size="24" class="mr-2">
        <v-img :src="avatarURL" />
      </v-avatar>
      <span class="connected-wallet-address-text"> {{ userAddress }}</span>
    </v-btn>
    <connected-dialog />
  </div>
</template>

<script>
import ConnectedDialog from './connectedDialog.vue'

export default {
  data() {
    return {
      avatarURL: "",
    };
  },
  components: {
    ConnectedDialog
  },
  computed: {
    userAddress() {
      return this.$store.state.userAddress;
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
    toggleAccountDialog() {
      this.$store.commit("toggleAccount", !this.$store.state.accountDialog);
    },
  },
};
</script>

<style>
.connected-wallet {
  max-width: 150px !important;
}
.connected-wallet-address-text {
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>