<script setup lang="ts">
const isOpen = defineModel();
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <slot name="header"></slot>
      </template>
      <slot name="body"></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </UCard>
  </UModal>
</template>
