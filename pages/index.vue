<template>
  <newbridge v-if="mode == 0" />
  <newwithdraw v-else />
</template>

<script>
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
  layout: "index",
};
</script>