<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <a>
        <div class="d-flex flex-column nft-item" v-if="type === 'withdraw'">
          <v-sheet
            min-width="100px"
            min-height="100px"
            class="
              d-flex
              justify-center
              align-center
              flex-grow-1
              nft-item-radius
            "
            style="position: relative"
          >
            <v-img
              contain
              height="100%"
              @load="log(nft.token.icon.url)"
              :src="nft.token.icon.url"
              v-if="nft.token.icon"
              class="nft-item-radius"
              ><v-skeleton-loader
                v-if="!loaded"
                class="mx-auto"
                max-width="100%"
                height="100%"
                type="card"
              ></v-skeleton-loader>
            </v-img>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute opacity="0.2">
                <v-card
                  elevation="0"
                  color="white"
                  width="100%"
                  class="nft-item-radius"
                >
                  <v-card-text class="text-center">
                    <span class="font-weight-bold black--text text-truncate">{{
                      nft.token.name
                    }}</span>
                    <br />
                    <span
                      class="font-weight-light mx-2 black--text text-truncate"
                    >
                      {{ nft.collection.name }} ({{ nft.token.id }})
                    </span>
                  </v-card-text>
                </v-card>
              </v-overlay>
            </v-fade-transition>
          </v-sheet>
        </div>

        <div class="d-flex flex-column nft-item" v-else>
          <v-sheet
            min-width="100px"
            min-height="100px"
            class="
              d-flex
              justify-center
              align-center
              flex-grow-1
              nft-item-radius
            "
            style="position: relative"
          >
            <v-img
              contain
              @load="log(nft.token_info.meta.media_url)"
              height="100%"
              :src="nft.token_info.meta.media_url"
              class="nft-item-radius"
              ><v-skeleton-loader
                v-if="!loaded"
                class="mx-auto"
                max-width="100%"
                height="100%"
                type="card"
              ></v-skeleton-loader>
            </v-img>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute opacity="0.2">
                <v-card
                  elevation="0"
                  color="white"
                  width="100%"
                  class="nft-item-radius"
                >
                  <v-card-text class="text-center">
                    <span
                      class="
                        font-weight-bold
                        black--text
                        mx-2
                        mt-1
                        text-truncate
                      "
                    >
                      {{ nft.token_info.meta.name }}
                    </span>
                    <br />
                    <span
                      class="font-weight-light mx-2 black--text text-truncate"
                      v-if="nft.token_info.meta.description"
                    >
                      {{ nft.token_info.meta.group }}
                    </span>
                  </v-card-text>
                </v-card>
              </v-overlay>
            </v-fade-transition>
          </v-sheet>
        </div>
      </a>
    </template>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loaded: false,
    };
  },
  props: ["nft", "type"],
  methods: {
    log(url) {
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.nft-item {
  border: 0.1px solid #90a4ae;
  border-radius: 12px;
  height: 100%;
}
.nft-item-radius {
  border-radius: 12px;
}
</style>