// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    API_URL: "http://localhost:3333",
    public: {
      API_URL: "http://localhost:3333",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vee-validate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-icon",
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
    dirs: ["utils/**", "services/*", "composables/*"],
  },
  image: {
    dir: "assets/img",
  },
});
