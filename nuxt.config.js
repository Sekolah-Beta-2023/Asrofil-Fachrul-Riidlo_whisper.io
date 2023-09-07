export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'universal',
  head: {
    title: 'whisper.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
      apiUrl: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        scheme: 'local',
        endpoints: {
          login: { url: `${this.$config.apiUrl}/login`, method: 'post', propertyName: 'token' },
          user: { url: `${this.$config.apiUrl}/user`, method: 'get', propertyName: 'user' },
          logout: { url: `${this.$config.apiUrl}/logout`, method: 'post' }
        },
        tokenType: 'bearer', // The type of token (e.g., 'bearer' for JWT)
        autoFetchUser: true, // Automatically fetch user data after login
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/styles.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `${this.$config.apiUrl}`
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}