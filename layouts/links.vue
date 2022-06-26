<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0">
        <v-img
          :src="bridge"
          max-width="28px"
          max-height="28px"
          class="ml-3"
          @click="redirect('/')"
        />
        <span class="font-weight-bold ml-2" @click="redirect('/')">
          MVM-Bridge
        </span>
        <v-spacer />
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              aria-haspopup="true"
              aria-expanded="false"
              elevation="0"
              depressed
              v-bind="attrs"
              v-on="on"
            >
              <span class="font-weight-light">ToolBox</span>
              <v-icon style="font-size: 14px; height: 14px; width: 14px">
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(link, i) in links" :key="i" @click="redirect(link.to)">
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import bridge from "../static/bridge.png";
export default {
  data() {
    return {
      bridge,
      links: [
        { name: "Register", to: "/register" },
        { name: "Deposit", to: "/deposit" },
        { name: "Withdraw", to: "/withdraw" },
        { name: "Query", to: "/query" },
        { name: "Add Token", to: "/addtoken" },
        // {name: "", to: ""},
      ],
    };
  },
  methods: {
    redirect(to) {
      window.location.href = to;
    },
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>