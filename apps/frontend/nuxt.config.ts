// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    API_URL: process.env.API_URL,
    public: {
      API_URL: process.env.API_URL,
      MODERATOR_KEY: process.env.MODERATOR_SECRET_KEY,
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vee-validate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-icon",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/style/main.scss"],
  colorMode: {
    preference: "light",
  },
  tailwindcss: {
    cssPath: "~/assets/style/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/layouts",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["utils/**", "services/**", "composables/*"],
  },
});
