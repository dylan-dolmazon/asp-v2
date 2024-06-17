<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const step = defineModel<number>({ required: true });
const { getPersonalsInfos, setPersonalsInfos } = useStepperState();

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  age: yup.number().positive().min(1).required(),
  nationality: yup.string().required(),
  height: yup.number().optional(),
  weight: yup.number().optional(),
});

const state = reactive({
  firstname: getPersonalsInfos().firstname,
  lastname: getPersonalsInfos().lastname,
  age: getPersonalsInfos().age,
  nationality: getPersonalsInfos().nationality,
  height: getPersonalsInfos().height,
  weight: getPersonalsInfos().weight,
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  const { data } = await checkIfAlreadyExist({
    firstname: event.data.firstname,
    lastname: event.data.lastname,
  });

  if (data.value?.length && data.value?.length > 0) {
    addToast(
      "Erreur",
      ["Un joueur avec ce nom et prénom existe déjà"],
      "error"
    );
  } else {
    setPersonalsInfos(event.data);
    step.value++;
  }
};

//const { data, pending } = await getCountries();
</script>

<template>
  <div class="CreatePlayerStepOne flex justify-between flex-col mt-20">
    <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-8">
      <TextInput
        label="Prénom"
        name="firstname"
        id="firstname"
        type="text"
        placeholder="Prénom du joueur"
        v-model="state.firstname"
        required
      />
      <TextInput
        label="Nom"
        name="lastname"
        id="lastname"
        type="text"
        placeholder="Nom du joueur"
        v-model="state.lastname"
        required
      />
      <TextInput
        label="Age"
        name="age"
        id="age"
        type="number"
        placeholder="Age du joueur"
        v-model="state.age"
        required
      />
      <Select
        label="Nationalité"
        name="nationality"
        id="nationality"
        placeholder="Nationalité du joueur"
        v-model="state.nationality"
        :options="[{ name: 'France', value: 'FR' }]"
        required
      />
      <TextInput
        label="Taille (en cm)"
        name="height"
        id="height"
        type="number"
        placeholder="Taille du joueur"
        v-model="state.height"
      />
      <TextInput
        label="Poids (en kg)"
        name="weight"
        id="weight"
        type="number"
        placeholder="Poids du joueur"
        v-model="state.weight"
      />
      <div class="text-center">
        <UButton
          icon="i-heroicons-arrow-right-circle-solid"
          size="lg"
          color="primary"
          variant="solid"
          label="Valider les informations personnels"
          trailing
          type="submit"
          class="mt-8"
        />
      </div>
    </UForm>
  </div>
</template>
