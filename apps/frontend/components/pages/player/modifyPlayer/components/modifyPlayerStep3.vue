<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { storeToRefs } from "pinia";

const step = defineModel<number>({ required: true });

const props = defineProps({
  defending: {
    type: Number,
    required: true,
  },
  pace: {
    type: Number,
    required: true,
  },
  passing: {
    type: Number,
    required: true,
  },
  physical: {
    type: Number,
    required: true,
  },
  shooting: {
    type: Number,
    required: true,
  },
  dribbling: {
    type: Number,
    required: true,
  },
});

const modifyPlayerStore = useModifyPlayerStepperStore();
const { getPerformance } = storeToRefs(modifyPlayerStore);

const schema = yup.object({
  defending: yup.number().min(1).max(100).required(),
  pace: yup.number().min(1).max(100).required(),
  passing: yup.number().min(1).max(100).required(),
  physical: yup.number().min(1).max(100).required(),
  shooting: yup.number().min(1).max(100).required(),
  dribbling: yup.number().min(1).max(100).required(),
});

const state = reactive({
  defending:
    getPerformance.value.defending !== 0
      ? getPerformance.value.defending
      : props.defending,
  pace:
    getPerformance.value.pace !== 0 ? getPerformance.value.pace : props.pace,
  passing:
    getPerformance.value.passing !== 0
      ? getPerformance.value.passing
      : props.passing,
  physical:
    getPerformance.value.physical !== 0
      ? getPerformance.value.physical
      : props.physical,
  shooting:
    getPerformance.value.shooting !== 0
      ? getPerformance.value.shooting
      : props.shooting,
  dribbling:
    getPerformance.value.dribbling !== 0
      ? getPerformance.value.dribbling
      : props.dribbling,
});

const onSubmit = (event: FormSubmitEvent<yup.InferType<typeof schema>>) => {
  modifyPlayerStore.setPerformance(event.data);
  step.value++;
};
</script>

<template>
  <div class="CreatePlayerStepThree flex justify-between flex-col mt-20">
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Défense"
          name="defending"
          id="defending"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de défense du joueur"
          v-model="state.defending"
          required
          class="w-full"
        />
        <Stat :stat="state.defending" />
      </div>
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Vitesse"
          name="pace"
          id="pace"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de vitesse du joueur"
          v-model="state.pace"
          required
          class="w-full"
        />
        <Stat :stat="state.pace" />
      </div>
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Passe"
          name="passing"
          id="passing"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de passe du joueur"
          v-model="state.passing"
          required
          class="w-full"
        />
        <Stat :stat="state.passing" />
      </div>
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Drible"
          name="dribbling"
          id="dribbling"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de drible du joueur"
          v-model="state.dribbling"
          required
          class="w-full"
        />
        <Stat :stat="state.dribbling" />
      </div>
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Physique"
          name="physical"
          id="physical"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de physique du joueur"
          v-model="state.physical"
          required
          class="w-full"
        />
        <Stat :stat="state.physical" />
      </div>
      <div class="CreatePlayerStepThree-stat">
        <TextInput
          label="Tire"
          name="shooting"
          id="shooting"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de tire du joueur"
          v-model="state.shooting"
          required
          class="w-full"
        />
        <Stat :stat="state.shooting" />
      </div>
      <div class="text-center">
        <UButton
          class="mt-8"
          icon="i-heroicons-arrow-right-circle-solid"
          size="lg"
          color="primary"
          variant="solid"
          label="Valider les informations personnels"
          trailing
          type="submit"
        />
      </div>
    </UForm>
  </div>
</template>

<style scoped lang="scss">
.CreatePlayerStepThree {
  &-stat {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }
}
</style>
