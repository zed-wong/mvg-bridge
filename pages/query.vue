<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <span class="text-center text-h4 d-flex justify-center pa-5 pb-0">
        Query
      </span>
    </v-col>
    <v-col cols="12" sm="8" md="6" class="pt-0">
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          text-no-wrap
          pa-5
          pb-2
          pt-2
        "
      >
        Enter Mixin Network Asset ID To Query Asset Contract Address ( WIP )
      </span>
      <v-text-field
        filled
        class="mt-3"
        v-model="searchAsset"
        clearable
        :placeholder="placeHolder"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "links",
};
</script>