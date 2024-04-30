<script setup lang="ts">
import * as yup from "yup";

const step = defineModel<number>({ required: true });
const { getStats, setStats } = useStepperState();

const schema = yup.object({
  footed: yup.mixed(),
  position: yup.mixed(),
  assists: yup.number().min(0).required(),
  goalsscored: yup.number().min(0).optional(),
  redcards: yup.number().min(0).optional(),
  yellowcards: yup.number().min(0).optional(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    footed: getStats().footed,
    position: getStats().position,
    assists: getStats().assists,
    yellowcards: getStats().yellowcards,
    goalsscored: getStats().goalsscored,
    redcards: getStats().redcards,
  },
  validateOnMount: false,
});

const [footed] = defineField("footed");
const [position] = defineField("position");
const [assists] = defineField("assists");
const [yellowcards] = defineField("yellowcards");
const [goalsscored] = defineField("goalsscored");
const [redcards] = defineField("redcards");

const onSubmit = handleSubmit((values) => {
  setStats(values);
  step.value++;
});
</script>

<template>
  <div class="CreatePlayerStepOne flex justify-between flex-col mt-20">
    <Form @submit="onSubmit">
      <Select
        label="Poste"
        name="position"
        id="position"
        placeholder="Poste du joueur"
        v-model="position"
        :errorMessage="getYupFieldErrorMessage('position', errors)"
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
        v-model="footed"
        :errorMessage="getYupFieldErrorMessage('footed', errors)"
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
        v-model="assists"
        :errorMessage="getYupFieldErrorMessage('assists', errors)"
      />
      <TextInput
        label="Nombre de buts marqués"
        name="goalsscored"
        id="goalsscored"
        type="number"
        placeholder="Nombre de buts marqués par le joueur"
        v-model="goalsscored"
        :errorMessage="getYupFieldErrorMessage('goalsscored', errors)"
      />
      <TextInput
        label="Cartons jaune"
        name="yellowcards"
        id="yellowcards"
        type="number"
        placeholder="Carton jaune du joueur"
        v-model="yellowcards"
        :errorMessage="getYupFieldErrorMessage('yellowcards', errors)"
      />
      <TextInput
        label="Cartons rouge"
        name="redcards"
        id="redcards"
        type="number"
        placeholder="Cartons rouge du joueur"
        v-model="redcards"
        :errorMessage="getYupFieldErrorMessage('redcards', errors)"
      />
      <div class="text-center mt-12">
        <UButton
          icon="i-heroicons-arrow-right-circle-solid"
          size="lg"
          color="primary"
          variant="solid"
          label="Valider les informations personnels"
          trailing
          type="submit"
        />
      </div>
    </Form>
  </div>
</template>
