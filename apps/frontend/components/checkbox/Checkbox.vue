<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");

const { value: inputValue } = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="checkboxContainer">
    <input
      class="tgl tgl-skewed"
      :name="name"
      :id="name"
      type="checkbox"
      :value="inputValue"
      v-model="inputValue"
    />
    <label class="tgl-btn" :for="name" data-tg-off="NON" data-tg-on="OUI" />
    <Typo format="normal" tag="p"> {{ label }}</Typo>
  </div>
</template>

<style scoped>
@import "./checkbox.scss";
</style>
