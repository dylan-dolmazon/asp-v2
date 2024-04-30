<script setup lang="ts">
defineProps({
  title: String,
  type: {
    type: String as PropType<"Information" | "Succes" | "Erreur" | "Attention">,
    required: true,
  },
});
</script>

<template>
  <div :class="`Snackbar Snackbar__${type.toLowerCase()}`">
    <div class="Snackbar-icon">
      <Icon
        v-if="type === 'Erreur'"
        class="text-error"
        name="gridicons:cross-circle"
        width="35"
        height="35"
      ></Icon>
      <Icon
        v-else-if="type === 'Succes'"
        class="text-success"
        name="ep:success-filled"
        width="35"
        height="35"
      ></Icon>
      <Icon
        v-else-if="type === 'Information'"
        class="text-info"
        name="solar:info-circle-bold"
        width="35"
        height="35"
      ></Icon>
      <Icon
        v-else
        class="text-warning"
        name="material-symbols:warning-rounded"
        width="35"
        height="35"
      ></Icon>
    </div>
    <div class="Snackbar-content">
      <Typo format="bold" class="Snackbar-title mb-4">
        {{ title || (type === "Succes" ? "Succés" : type) }}
      </Typo>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import "./Snackbar.scss";
</style>
