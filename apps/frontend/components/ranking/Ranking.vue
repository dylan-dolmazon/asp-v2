<script setup lang="ts">
defineProps({
  number: Number,
});
</script>

<template>
  <div :class="`Ranking`">
    <Typo format="bold" class="-rotate-45">{{ number }}</Typo>
  </div>
</template>

<style scoped>
@import "./Ranking.scss";
</style>
