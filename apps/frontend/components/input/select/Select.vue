<script setup lang="ts">
const model = defineModel({ required: true });
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: undefined,
  },
  options: {
    type: Array as PropType<{ value: string; name: string }[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "primary",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="Select" :class="{ 'has-error': !!errorMessage }">
    <label :for="name" class="Select--required">{{ label }}</label>
    <USelect
      :name="name"
      :loading="loading"
      :variant="errorMessage ? 'error' : variant"
      :options="options"
      v-model="model"
      :placeholder="placeholder"
      option-attribute="name"
    />
    <p class="Select-help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@import "./select.scss";
</style>
