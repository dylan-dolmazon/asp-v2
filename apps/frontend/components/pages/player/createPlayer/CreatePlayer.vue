<script setup lang="ts">
import * as yup from "yup";

const isOpen = defineModel();
const currentStep = ref(1);
const maxClickableStep = ref(1);

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  age: yup.number().positive().required(),
  position: yup.string().required(),
  nationality: yup.string().required(),
  footed: yup.string().required(),
  goalsscored: yup.number().positive().required(),
  assists: yup.number().positive().required(),
  yellowcards: yup.number().positive().required(),
  redcards: yup.number().positive().required(),
  pace: yup.number().positive().max(100).required(),
  shooting: yup.number().positive().max(100).required(),
  passing: yup.number().positive().max(100).required(),
  dribbling: yup.number().positive().max(100).required(),
  defending: yup.number().positive().max(100).required(),
  physical: yup.number().positive().max(100).required(),
});

const onSubmit = async (values: any, { resetForm }: any) => {
  const { error } = await createPlayer({
    ...values,
  });
  if (!error.value) {
    resetForm();
    addToast(
      "Inscription réussie",
      [`Merci de vous être inscrit veuillez vous connecter`],
      "success"
    );
    navigateTo("/auth/login");
  }
};

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
          <CreatePlayerSummary v-model="currentStep" />
        </template>
      </Stepper>
    </UCard>
  </USlideover>
</template>
