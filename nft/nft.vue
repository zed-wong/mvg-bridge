<template>
  <div class="d-flex flex-column nft-item">
    <v-sheet
      min-width="100px"
      min-height="100px"
      class="d-flex justify-center align-center nft-item-radius nft-item-image-bottom"
    >
      <v-img
        :src="nft.token_info.meta.media_url"
        class="nft-item-radius nft-item-image"
      />
    </v-sheet>
    <span class="font-weight-bold mx-2 mt-1 text-truncate">
      {{ nft.token_info.meta.name }}
    </span>
    <span
      class="font-weight-light mx-2 text-truncate"
      v-if="nft.token_info.meta.description"
    >
      {{ nft.token_info.meta.group }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["nft"],
};
</script>

<style scoped>
.nft-item {
  border: 0.8px solid;
  border-radius: 12px;
}
.nft-item-radius {
  border-radius: 12px 12px 0px 0px;
}
.nft-item-image {
  background-color: #4d5558;
}
.nft-item-image-bottom {
  border-bottom: 0.8px solid;
}
</style>