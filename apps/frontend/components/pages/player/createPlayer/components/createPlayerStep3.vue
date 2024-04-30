<script setup lang="ts">
import * as yup from "yup";

const step = defineModel<number>({ required: true });
const { getPerformance, setPerformance } = useStepperState();

const schema = yup.object({
  defending: yup.number().min(1).max(100).required(),
  pace: yup.number().min(1).max(100).required(),
  passing: yup.number().min(1).max(100).required(),
  physical: yup.number().min(1).max(100).required(),
  shooting: yup.number().min(1).max(100).required(),
  dribbling: yup.number().min(1).max(100).required(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    defending: getPerformance().defending,
    pace: getPerformance().pace,
    passing: getPerformance().passing,
    physical: getPerformance().physical,
    shooting: getPerformance().shooting,
    dribbling: getPerformance().dribbling,
  },
  validateOnMount: false,
});

const [defending] = defineField("defending");
const [pace] = defineField("pace");
const [passing] = defineField("passing");
const [physical] = defineField("physical");
const [shooting] = defineField("shooting");
const [dribbling] = defineField("dribbling");

const onSubmit = handleSubmit((values) => {
  setPerformance(values);
  step.value++;
});
</script>

<template>
  <div class="CreatePlayerStepOne flex justify-between flex-col mt-20">
    <Form @submit="onSubmit">
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Défense"
          name="defending"
          id="defending"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de défense du joueur"
          v-model="defending"
          :errorMessage="getYupFieldErrorMessage('defending', errors)"
          required
        />
        <Stat :stat="defending" />
      </div>
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Vitesse"
          name="pace"
          id="pace"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de vitesse du joueur"
          v-model="pace"
          :errorMessage="getYupFieldErrorMessage('pace', errors)"
          required
        />
        <Stat :stat="pace" />
      </div>
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Passe"
          name="passing"
          id="passing"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de passe du joueur"
          v-model="passing"
          :errorMessage="getYupFieldErrorMessage('passing', errors)"
          required
        />
        <Stat :stat="passing" />
      </div>
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Drible"
          name="dribbling"
          id="dribbling"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de drible du joueur"
          v-model="dribbling"
          :errorMessage="getYupFieldErrorMessage('dribbling', errors)"
          required
        />
        <Stat :stat="dribbling" />
      </div>
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Physique"
          name="physical"
          id="physical"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de physique du joueur"
          v-model="physical"
          :errorMessage="getYupFieldErrorMessage('physical', errors)"
          required
        />
        <Stat :stat="physical" />
      </div>
      <div class="flex gap-5 mb-5">
        <TextInput
          label="Tire"
          name="shooting"
          id="shooting"
          type="number"
          :min="1"
          :max="100"
          placeholder="Score de tire du joueur"
          v-model="shooting"
          :errorMessage="getYupFieldErrorMessage('shooting', errors)"
          required
        />
        <Stat :stat="shooting" />
      </div>
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
