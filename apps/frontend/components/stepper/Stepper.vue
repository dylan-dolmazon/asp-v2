<script setup lang="ts">
const currentStep = defineModel<number>({ required: true });

defineProps({
  steps: {
    type: Array as PropType<number[]>,
    required: true,
  },
  maxClickableStep: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="Stepper">
    <div class="Stepper-header flex justify-between mx-8">
      <button
        v-for="step in steps"
        :key="step"
        class="Stepper-header-step"
        :class="{
          'Stepper-header-step--active': step <= currentStep,
          'Stepper-header-step--disabled': step > maxClickableStep,
        }"
        :disabled="step > maxClickableStep"
        @click="currentStep = step"
      >
        {{ step }}
      </button>
    </div>
    <div v-for="step in steps" :key="step">
      <slot :name="'step-' + step" v-if="currentStep === step"></slot>
    </div>
  </div>
</template>

<style scoped>
@import "./Stepper.scss";
</style>
