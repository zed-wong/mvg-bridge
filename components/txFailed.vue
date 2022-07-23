<template>
  <v-dialog
    v-model="txFailedDialog"
    class="dialog-css"
    max-width="450px"
    overlay-opacity="0.8"
  >
    <v-sheet class="align-self-start px-9 py-8" height="400px">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">Transaction Failed</h1>
          <v-spacer />
          <v-btn icon @click="txFailedDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center my-5">
          <v-icon size="128px" color="red"> 
            mdi-alert-circle-outline
          </v-icon>
        </v-col>
        <v-col class="mt-2">
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            @click="txFailedDialog = false"
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
    txFailedDialog: {
      get() {
        return this.$store.state.txFailedDialog;
      },
      set(value) {
        this.$store.commit("toggleTxFailedDialog", value);
      },
    },
  },
};
</script>