<template>
  <deposit v-if="mode == 0" />
  <withdraw v-else />
</template>

<script>
import deposit from "~/nft/deposit.vue";
import withdraw from "~/nft/withdraw.vue";

export default {
  asyncData(context) {
    if (navigator.language.includes("zh")) context.app.i18n.locale = "zh";
    if (navigator.language.includes("en")) context.app.i18n.locale = "en";
  },
  components: { deposit, withdraw },
  computed: {
    mode: {
      get() {
        return this.$store.state.nft.mode;
      },
      set(value) {
        this.$store.commit("setMode", value);
      },
    },
  },
  layout: "index",
};
</script>