<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { storeToRefs } from "pinia";

const step = defineModel<number>({ required: true });
const createPlayerStore = useCreatePlayerStepperStore();
const { getPersonalsInfos } = storeToRefs(createPlayerStore);

const form = ref();

const aleradyExist = ref(false);
const alreadyCheckIsPending = ref(false);

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  age: yup.number().positive().min(1).required(),
  nationality: yup.string().required(),
  height: yup.number().optional(),
  weight: yup.number().optional(),
});

const state = reactive({
  firstname: getPersonalsInfos.value.firstname,
  lastname: getPersonalsInfos.value.lastname,
  age: getPersonalsInfos.value.age,
  nationality: getPersonalsInfos.value.nationality,
  height: getPersonalsInfos.value.height,
  weight: getPersonalsInfos.value.weight,
});

const checkName = useDebounceFn(async (firstname: string, lastname: string) => {
  if (firstname !== "" && lastname !== "") {
    alreadyCheckIsPending.value = true;
    const { data, error, pending } = await checkIfAlreadyExist({
      firstname: firstname,
      lastname: lastname,
    });

    if (data.value?.length && data.value?.length > 0) {
      aleradyExist.value = true;
      form.value.setErrors([
        {
          path: "firstname",
          message: "Un joueur avec ce nom et prénom existe déjà",
        },
        {
          path: "lastname",
          message: "Un joueur avec ce nom et prénom existe déjà",
        },
      ]);
    } else if (error.value) {
      aleradyExist.value = true;
    } else {
      aleradyExist.value = false;
    }
    alreadyCheckIsPending.value = false;
  }
}, 600);

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  console.log("✌️aleradyExist.value --->", aleradyExist.value);
  console.log(
    "✌️alreadyCheckIsPending.value --->",
    alreadyCheckIsPending.value
  );
  if (!aleradyExist.value && !alreadyCheckIsPending.value) {
    console.log("test");
    createPlayerStore.setPersonalsInfos(event.data);
    step.value++;
  }
};

const { data, pending } = await getCountries();
</script>

<template>
  <div class="CreatePlayerStepOne flex justify-between flex-col mt-20">
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      class="space-y-8"
    >
      <TextInput
        label="Prénom"
        name="firstname"
        id="firstname"
        type="text"
        placeholder="Prénom du joueur"
        v-model="state.firstname"
        @input="(event: any) => checkName(event.target.value, state.lastname)"
        required
      />
      <TextInput
        label="Nom"
        name="lastname"
        id="lastname"
        type="text"
        placeholder="Nom du joueur"
        v-model="state.lastname"
        @input="(event: any) => checkName(state.firstname, event.target.value)"
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
        :options="
          (data || []).map((country) => ({
            value: country.code,
            name: country.name,
          }))
        "
        :loading="pending"
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
          :loading="alreadyCheckIsPending"
        />
      </div>
    </UForm>
  </div>
</template>
