<script setup lang="ts">
const route = useRoute();

const { pending, data } = await getPlayer(route.params.id as string);
</script>

<template>
  <NuxtLayout name="default">
    <div>update player {{ data?.firstname }}</div>
  </NuxtLayout>
</template>
