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
    enabled: false
  },

  vite: {
    build: {
      sourcemap: true,
    }
  }
});
