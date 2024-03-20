<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AS Pertuis` : "AS Pertuis";
  },
  meta: [
    {
      name: "description",
      content: "AS Pertuis",
    },
  ],
});
</script>

<template>
  <UContainer as="main" class="p-0 m-0 sm:p-0 lg:p-0 max-w-full h-full">
    <NuxtPage />
    <UNotifications />
  </UContainer>
</template>
