<script setup lang="ts">
const model = defineModel({ required: true });

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: undefined,
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
  errorMessage: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
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
  <div class="TextInput" :class="{ 'has-error': !!errorMessage }">
    <label :for="name" :class="{ 'TextInput--required': required }">{{
      label
    }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :min="min"
      :max="max"
      @input="
        (e: any) => {
          if (!e.target.value) {
            type === 'number' ? (model = 0) : (model = '');
          }
        }
      "
      :placeholder="placeholder"
      v-model="model"
    />
    <UButton
      v-if="type === 'password'"
      :icon="visible ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
      class="TextInput-togglePassword"
      size="lg"
      color="primary"
      square
      type="button"
      variant="solid"
      @click="togglePasswordVisibility"
    />
    <p class="TextInput-help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
@import "./TextInput.scss";
</style>
