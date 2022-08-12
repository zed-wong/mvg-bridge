<template>
  <div class="d-flex flex-column nft-item" v-if="type === 'withdraw'">
    <v-sheet
      min-width="100px"
      min-height="100px"
      class="
        d-flex
        justify-center
        align-center
        nft-item-radius nft-item-image-bottom
      "
    >
      <v-img :src="nft.token.icon.url" class="nft-item-radius" />
    </v-sheet>
    <span class="font-weight-bold mx-2 mt-1 text-truncate">
      {{ nft.token.name }}
    </span>
    <span
      class="font-weight-light mx-2 text-truncate"
    >
      {{ nft.collection.name }}
    </span>
  </div>
  <div class="d-flex flex-column nft-item" v-else>
    <v-sheet
      min-width="100px"
      min-height="100px"
      class="
        d-flex
        justify-center
        align-center
        nft-item-radius nft-item-image-bottom
      "
    >
      <v-img :src="nft.token_info.meta.media_url" class="nft-item-radius" />
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
  props: ["nft", "type"],
};
</script>

<style scoped>
.nft-item {
  border: 0.1px solid #90a4ae;
  border-radius: 12px;
}
.nft-item-radius {
  border-radius: 12px 12px 0px 0px;
}
.nft-item-image-bottom {
  border-bottom: 0.1px solid;
}
</style>