import colors from 'vuetify/es5/util/colors'
import i18n from './i18n'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | MVG',
    title: 'MVG - Mixin Virtual Machine Bridge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:title', name: 'og:title', content: 'MVG - Mixin Virtual Machine Bridge' },
      { hid: 'Deposit', name: 'Deposit', content: "Deposit from anywhere into MVM Mainnet" },
      { hid: 'Withdrawal', name: 'Withdrawal', content: "Withdraw to anywhere from MVM Mainnet" },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vac.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: "en",
            iso: "en-US",
            file: "en-US.json"
          },
          {
            code: "zh",
            iso: "zh-TW",
            file: "zh-TW.json"
          }
        ],
        langDir: 'lang/',
        defaultLocale: "en",
        vueI18n: i18n,
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    credentials: false,
    proxy: false,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    breakpoint: { mobileBreakpoint: 'sm' },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      })
    }
  },
  env: {
    INFURA_KEY: process.env.INFURA_KEY,
    WITHDRAWAL_GATEWAY_BOT_ID: process.env.WITHDRAWAL_GATEWAY_BOT_ID,
    NFT_OAUTH_BOT_ID: process.env.WITHDRAWAL_GATEWAY_BOT_ID,
    EXPLORER_BASEURL: "https://scan.mvm.dev/",
    BLAZE_BASEURL: "wss://blaze.mixin.one/",
    MIXIN_API_BASEURL: "https://api.mixin.one/",
  }
}
