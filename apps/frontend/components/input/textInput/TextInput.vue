<script setup lang="ts">
const model = defineModel({ required: true });

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
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
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  size: {
    type: String as PropType<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">,
    default: "lg",
  },
});

const visible = ref(false);

const togglePasswordVisibility = () => {
  const input = document.getElementById(props.name) as HTMLInputElement;
  if (input) {
    input.type = visible.value === false ? "text" : "password";
    visible.value = !visible.value;
  }
};
</script>

<template>
  <UFormGroup :label="label" :name="name" size="xl" :required="required">
    <UInput
      v-model="model"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      :icon="icon"
      :size="size"
      :id="name"
      class="relative"
      :min="min"
      :max="max"
    />
    <UButton
      v-if="type === 'password'"
      :icon="visible ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
      class="TogglePassword"
      :size="size"
      color="primary"
      square
      type="button"
      variant="solid"
      @click="togglePasswordVisibility"
    />
  </UFormGroup>
</template>

<style scoped lang="scss">
.TogglePassword {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
