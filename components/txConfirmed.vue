<template>
  <v-dialog
    v-model="txSucceedDialog"
    class="dialog-css"
    max-width="450px"
    overlay-opacity="0.8"
  >
    <v-sheet class="align-self-start px-9 py-8" height="400px">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">Confirmed</h1>
          <v-spacer />
          <v-btn icon @click="txSucceedDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center my-2">
          <v-icon size="128px" color="green"> 
            mdi-check-circle
          </v-icon>
        </v-col>
        <v-col class="d-flex justify-center pb-0 py-1">
          <a :href="link" target="_blank" click="window.open(link)" style="text-decoration: none;"> 
            <span> View On Expolrer </span> 
          </a>
        </v-col>
        <v-col class="mt-2">
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            @click="txSucceedDialog = false"
            class="border-rounded main-btn white--text"
          >
            Close
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: ['link'],
  computed: {
    txSucceedDialog: {
      get() {
        return this.$store.state.txSucceedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxSucceedDialog", value);
      },
    },
  },
};
</script>