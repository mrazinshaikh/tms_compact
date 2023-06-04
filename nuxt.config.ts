// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "TMS Compact",
    },
  },
  modules: [
    "@nuxt/devtools",
    '@nuxtjs/tailwindcss'
  ],

  devtools: {
    enabled: true,
    reuseExistingServer: true,
  },

  vite: {
    build: {
      sourcemap: true,
    }
  }
});
