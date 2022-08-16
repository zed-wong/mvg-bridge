<template>
  <v-row class="justify-center align-self-start" no-gutters>
    <vue-qrcode
      v-if="qrUrl"
      :value="qrUrl"
      :options="{ width: 400 }"
      class="mr-1"
    />
  </v-row>
</template>

<script>
import { MixinClient } from "../helpers/mixin";
import authorize from "../helpers/oauth/authorize";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const clientID = process.env.WITHDRAWAL_GATEWAY_BOT_ID;
const scope = "PROFILE:READ";

export default {
  components: {
    VueQrcode,
  },
  data() {
    return {
      qrUrl: "",
      client: null,
      token: "",
    };
  },
  async mounted() {
    console.log(await MixinClient.user.fetch("28865"))
    this.client = authorize(
      { clientId: clientID, scope: scope, pkce: true },
      {
        onShowUrl: (url) => (this.qrUrl = url),
        onError: (error) => console.error(error),
        onSuccess: (data) => {
          console.log("token:", data);
          this.token = data;
          localStorage.setItem("access_token", data);
          return;
        },
      }
    );
  },
  watch: {
    token() {
      this.userMe(this.token);
    },
  },
  methods: {
    userMe(token) {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      this.$axios
        .get(process.env.MIXIN_API_BASEURL + "me", config)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            console.log(response.data.data.user_id);
            localStorage.setItem("mixin_user_id", response.data.data.user_id);
          }
          this.qrUrl = ""
        });
      console.log("request sent");
    },
  },
};
</script>