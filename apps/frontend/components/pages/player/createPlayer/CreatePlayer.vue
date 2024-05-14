<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });
const currentStep = ref(1);
const maxClickableStep = ref(1);

watch(currentStep, (value) => {
  maxClickableStep.value = value--;
});
</script>

<template>
  <USlideover v-model="isOpen">
    <UCard class="flex flex-col flex-1">
      <template #header>
        <Typo tag="h3" class="h-8 text-center w-full text-default">
          Créer un nouveau joueur pour votre équipe !
        </Typo>
      </template>

      <Stepper
        :steps="[1, 2, 3, 4]"
        v-model="currentStep"
        :maxClickableStep="maxClickableStep"
      >
        <template v-slot:step-1>
          <CreatePlayerStep1 v-model="currentStep" />
        </template>
        <template v-slot:step-2>
          <CreatePlayerStep2 v-model="currentStep" />
        </template>
        <template v-slot:step-3>
          <CreatePlayerStep3 v-model="currentStep" />
        </template>
        <template v-slot:step-4>
          <CreatePlayerSummary
            v-model:step="currentStep"
            v-model:isOpen="isOpen"
          />
        </template>
      </Stepper>
    </UCard>
  </USlideover>
</template>
