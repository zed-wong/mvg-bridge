<template>
  <div class="d-flex flex-column">
    <v-sheet
      min-width="100px"
      min-height="100px"
      class="d-flex justify-center align-center my-3"
    >
      <v-img :src="nft.token_info.meta.media_url" />
    </v-sheet>
    <span class="font-weight-bold"> {{ nft.token_info.meta.name }} </span>
    <span class="font-weight-light text-truncate" v-if="nft.token_info.meta.description">
      {{ nft.token_info.meta.group }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["nft"],
};
</script>