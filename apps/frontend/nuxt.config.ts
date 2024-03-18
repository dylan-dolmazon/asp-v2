// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vee-validate/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/style/main.scss"],
  tailwindcss: {
    cssPath: "~/assets/style/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: "last",
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ["utils/*", "services/*", "composables/*"],
  },
});
