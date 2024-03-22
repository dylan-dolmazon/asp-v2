<script setup lang="ts">
defineProps({
  number: Number,
  className: {
    type: String,
    default: "default",
  },
});
</script>

<template>
  <div :class="`Ranking ${className ?? ''}`">
    <Typo format="bold" tag="p" className="-rotate-45">{{ number }}</Typo>
  </div>
</template>

<style>
@import "./ranking.scss";
</style>
