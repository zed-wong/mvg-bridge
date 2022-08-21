<template>
  <v-dialog v-model="appsDialog" max-width="500px" overlay-opacity="0.5">
    <v-sheet class="align-self-start px-9 py-8">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">{{ $t("applications") }}</h1>
          <v-spacer />
          <v-btn icon @click="appsDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>

        <v-col
          v-for="(item, i) in apps"
          :key="i"
          class="d-flex flex-row mt-1"
          @click="open(item.link)"
        >
          <div class="d-flex align-center">
            <v-img
              :src="item.icon"
              max-width="48px"
              max-height="48px"
              @load="loaded = true"
            >
              <v-skeleton-loader
                v-if="!loaded"
                class="mx-auto"
                max-width="100%"
                height="100%"
                type="avatar"
              ></v-skeleton-loader>
            </v-img>
          </div>
          <div class="ml-3 d-flex flex-column">
            <a> <span class="font-weight-bold"> {{ item.name }} </span></a>
            <a> <span class="description-text"> {{ item.description }} </span></a>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
import apps from "../assets/applications.json";

export default {
  data() {
    return {
      apps,
      loaded: false,
    };
  },
  computed: {
    appsDialog: {
      get() {
        return this.$store.state.appsDialog;
      },
      set(n) {
        this.$store.commit("toggleAppsDialog", n);
      },
    },
  },
  methods: {
    open(link) {
      window.open(link, "_blank").focus();
    },
  },
};
</script>

<style scoped>
.description-text {
  color: black;
  opacity: 0.6;
}
</style>