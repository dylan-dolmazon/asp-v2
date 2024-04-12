<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AS Pertuis` : "AS Pertuis";
  },
  link: [
    {
      rel: "shortcut icon",
      type: "image/png",
      href: "/logo.png",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200..700&display=swap",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "use-credentials",
    },
    {
      rel: "stylesheet",
      href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap"',
    },
  ],
});

useSeoMeta({
  ogTitle: "AS Pertuis",
  description: "Application de gestion de l'équipe de football du Pertuis.",
  ogDescription: "Application de gestion de l'équipe de football du Pertuis.",
  ogImage: "/twitter-card.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <v-app class="app">
    <UContainer as="main" class="p-0 m-0 sm:p-0 lg:p-0 max-w-full h-full">
      <NuxtPage />
      <UNotifications />
    </UContainer>
  </v-app>
</template>

<style>
.app {
  font-family: "Oswald", sans-serif;
}
</style>
