<template>
  <v-dialog
    v-model="txFailedDialog"
    class="dialog-css"
    max-width="450px"
    overlay-opacity="0.8"
  >
    <v-sheet class="align-self-start px-9 py-8" max-height="450px">
      <v-row class="d-flex flex-column mb-0">
        <v-col class="align-center d-flex flex-row pr-0 mb-2">
          <h1 class="title-css">{{$t('transaction_failed')}}</h1>
          <v-spacer />
          <v-btn icon @click="txFailedDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center my-1">
          <v-icon size="128px" color="red"> 
            mdi-alert-circle-outline
          </v-icon>
        </v-col>
        <v-col class="d-flex justify-center">
          <span v-if="msg">  {{ msg }}  </span>
        </v-col>
        <v-col>
          <v-btn
            block
            x-large
            depressed
            elevation="0"
            color="#5959d8"
            @click="txFailedDialog = false"
            class="border-rounded main-btn white--text"
          >
            {{ $t('close') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: ['msg'],
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