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
});
</script>

<template>
  <UFormGroup :label="label" :name="name" size="xl" :required="required">
    <USelect
      :name="name"
      :loading="loading"
      :options="options"
      v-model="model"
      :placeholder="placeholder"
      option-attribute="name"
      :variant="variant"
    />
  </UFormGroup>
</template>
