<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">,
    default: "lg",
  },
  color: {
    type: String,
    default: "primary",
  },
  variant: {
    type: String,
    default: "solid",
  },
  square: {
    type: Boolean,
    default: false,
  },
  skeleton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <USkeleton v-if="skeleton" :class="`h-${size}`" />
  <UButton
    v-else
    :type="type"
    :disabled="disabled || loading"
    :size="size"
    :color="color"
    :variant="variant"
    :square="square"
  >
    <slot />
  </UButton>
</template>
