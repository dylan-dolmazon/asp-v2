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
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <UFormGroup :name="name" size="xl" :required="required">
    <div class="checkboxContainer">
      <input
        class="tgl tgl-skewed"
        :name="name"
        :id="name"
        type="checkbox"
        v-model="model"
      />

      <label class="tgl-btn" :for="name" data-tg-off="NON" data-tg-on="OUI" />
      <Typo> {{ label }}</Typo>
    </div>
  </UFormGroup>
</template>

<style scoped>
@import "./Checkbox.scss";
</style>
