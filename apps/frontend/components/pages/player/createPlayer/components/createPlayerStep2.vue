<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const step = defineModel<number>({ required: true });
const { getStats, setStats } = useStepperState();

const schema = yup.object({
  footed: yup.mixed<Footed>().required(),
  position: yup.mixed<Position>().required(),
  assists: yup.number().min(0).required(),
  goalsscored: yup.number().min(0).required(),
  redcards: yup.number().min(0).required(),
  yellowcards: yup.number().min(0).required(),
});

const state = reactive({
  footed: getStats().footed,
  position: getStats().position,
  assists: getStats().assists,
  yellowcards: getStats().yellowcards,
  goalsscored: getStats().goalsscored,
  redcards: getStats().redcards,
});

const onSubmit = (event: FormSubmitEvent<yup.InferType<typeof schema>>) => {
  setStats(event.data);
  step.value++;
};
</script>

<template>
  <div class="CreatePlayerStepTwo flex justify-between flex-col mt-20">
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
      <Select
        label="Poste"
        name="position"
        id="position"
        placeholder="Poste du joueur"
        v-model="state.position"
        required
        :options="
          Object.keys(PositionFull).map((key) => ({
            name: getPosition(key),
            value: key,
          }))
        "
      />
      <Select
        label="Pied fort"
        name="footed"
        id="footed"
        type="text"
        placeholder="Pied fort du joueur"
        v-model="state.footed"
        required
        :options="
          Object.keys(FootedFull).map((key) => ({
            name: getFooted(key),
            value: key,
          }))
        "
      />
      <TextInput
        label="Assists"
        name="assists"
        id="assists"
        type="number"
        placeholder="Assists du joueur"
        v-model="state.assists"
      />
      <TextInput
        label="Nombre de buts marqués"
        name="goalsscored"
        id="goalsscored"
        type="number"
        placeholder="Nombre de buts marqués par le joueur"
        v-model="state.goalsscored"
      />
      <TextInput
        label="Cartons jaune"
        name="yellowcards"
        id="yellowcards"
        type="number"
        placeholder="Carton jaune du joueur"
        v-model="state.yellowcards"
      />
      <TextInput
        label="Cartons rouge"
        name="redcards"
        id="redcards"
        type="number"
        placeholder="Cartons rouge du joueur"
        v-model="state.redcards"
      />
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
