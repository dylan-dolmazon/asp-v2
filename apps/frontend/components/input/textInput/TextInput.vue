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
  readOnly: {
    type: Boolean,
    default: false,
  },
  skeleton: {
    type: Boolean,
    default: false,
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
  <USkeleton v-if="skeleton" :class="`skeleton-h-${size}`" />

  <UFormGroup v-else :label="label" :name="name" size="xl" :required="required">
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
      :class="{ 'input--readOnly': readOnly }"
      :min="min"
      :max="max"
      :readOnly="readOnly"
    />
    <UButton
      v-if="type === 'password' && !readOnly && !disabled"
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
.input--readOnly {
  input {
    cursor: default;
  }
}

.skeleton-h {
  &-2xs {
    height: 48px;
  }

  &-xs {
    height: 52px;
  }

  &-sm {
    height: 56px;
  }

  &-md {
    height: 60px;
  }

  &-lg {
    height: 64px;
  }

  &-xl {
    height: 68px;
  }
}
</style>
