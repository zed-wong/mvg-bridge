<template>
  <newbridge v-if="mode == 0" />
  <newwithdraw v-else />
</template>

<script>
import { ethers } from "ethers";
import { useOnboard } from "@web3-onboard/vue";
import { web3Onboard } from "../helpers/web3onboard";
import newbridge from "~/components/newbridge.vue";
import newwithdraw from "~/components/newwithdraw.vue";

export default {
  asyncData(context) {
    if (navigator.language.includes("zh")) context.app.i18n.locale = "zh";
    if (navigator.language.includes("en")) context.app.i18n.locale = "en";
  },
  components: { newbridge, newwithdraw },
  computed: {
    mode: {
      get() {
        return this.$store.state.mode;
      },
      set(value) {
        this.$store.commit("setMode", value);
      },
    },
  },
  async mounted() {
    await this.autoConnectWallet();
  },
  layout: "index",
  methods: {
    async autoConnectWallet() {
      try {
        if (localStorage.getItem("connectedWallet")) {
          const previouslyConnectedWallet = JSON.parse(
            localStorage.getItem("connectedWallet")
          );
          if (previouslyConnectedWallet) {
            this.$store.commit("setConnected", true)
            await web3Onboard.connectWallet({
              autoSelect: {
                label: previouslyConnectedWallet.label,
                disableModals: true,
              },
            });

            this.$store.commit("connect", {
              address: ethers.utils.getAddress(
                previouslyConnectedWallet.accounts[0].address
              ),
              name: "",
              id: "0x1",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>