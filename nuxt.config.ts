// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "nuxt-svgo",
  ],
  runtimeConfig: {
    weatherApi: "",
    weatherApiKey: "",
  },
  svgo: {
    autoImportPath: "./assets/weather-icons/",
  },
});
