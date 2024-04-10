<script setup lang="ts">
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
});

const name = toRef(props, "name");
const visible = ref(false);

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});

const togglePasswordVisibility = () => {
  const input = document.getElementsByName(name.value)[0] as HTMLInputElement;
  if (input) {
    input.type = visible.value === false ? "text" : "password";
    visible.value = !visible.value;
  }
};
</script>

<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage }">
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
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
