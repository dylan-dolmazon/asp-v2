<script setup lang="ts">
defineProps<{
  tag: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "p1" | "p2" | "p3" | "p4";
  format: "bold" | "medium" | "normal";
  className?: string;
}>();
</script>

<template>
  <div class="inline-block">
    <template v-if="tag === 'span'">
      <span :class="['Typo', format, className]"><slot /></span>
    </template>

    <template v-else-if="tag === 'h1'">
      <h1 :class="['Typo', format, className]"><slot /></h1>
    </template>
    <template v-else-if="tag === 'h2'">
      <h2 :class="['Typo', format, className]"><slot /></h2>
    </template>
    <template v-else-if="tag === 'h3'">
      <h3 :class="['Typo', format, className]"><slot /></h3>
    </template>
    <template v-else-if="tag === 'h4'">
      <h4 :class="['Typo', format, className]"><slot /></h4>
    </template>

    <template v-else-if="['p', 'p1', 'p2', 'p3', 'p4'].includes(tag)">
      <p :class="['Typo', tag, format, className]"><slot /></p>
    </template>
  </div>
</template>

<style scoped>
@import "./Typo.scss";
</style>
