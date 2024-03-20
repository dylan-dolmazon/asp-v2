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
  <main>
    <NuxtPage />
  </main>
</template>
