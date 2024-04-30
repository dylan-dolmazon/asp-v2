<script setup lang="ts">
import * as yup from "yup";

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

const { handleSubmit, defineField, errors, resetField } = useForm({
  validationSchema: schema,
  initialValues: {
    firstname: getPersonalsInfos().firstname,
    lastname: getPersonalsInfos().lastname,
    age: getPersonalsInfos().age,
    nationality: getPersonalsInfos().nationality,
    height: getPersonalsInfos().height,
    weight: getPersonalsInfos().weight,
  },
  validateOnMount: false,
});

const [firstname] = defineField("firstname");
const [lastname] = defineField("lastname");
const [age] = defineField("age");
const [nationality] = defineField("nationality");
const [height] = defineField("height");
const [weight] = defineField("weight");

const onSubmit = handleSubmit(async (values) => {
  const { data } = await checkIfAlreadyExist({
    firstname: values.firstname,
    lastname: values.lastname,
  });

  if (data.value?.length && data.value?.length > 0) {
    addToast(
      "Erreur",
      ["Un joueur avec ce nom et prénom existe déjà"],
      "error"
    );
    resetField("firstname");
    resetField("lastname");
  } else {
    setPersonalsInfos(values);
    step.value++;
  }
});

const { data, pending } = await getCountries();
</script>

<template>
  <div class="CreatePlayerStepOne flex justify-between flex-col mt-20">
    <Form @submit="onSubmit">
      <TextInput
        label="Prénom"
        name="firstname"
        id="firstname"
        type="text"
        placeholder="Prénom du joueur"
        v-model="firstname"
        :errorMessage="getYupFieldErrorMessage('firstname', errors)"
        required
      />
      <TextInput
        label="Nom"
        name="lastname"
        id="lastname"
        type="text"
        placeholder="Nom du joueur"
        v-model="lastname"
        :errorMessage="getYupFieldErrorMessage('lastname', errors)"
        required
      />
      <TextInput
        label="Age"
        name="age"
        id="age"
        type="number"
        placeholder="Age du joueur"
        v-model="age"
        :errorMessage="getYupFieldErrorMessage('age', errors)"
        required
      />
      <Select
        label="Nationalité"
        name="nationality"
        id="nationality"
        placeholder="Nationalité du joueur"
        v-model="nationality"
        :options="
          (data || []).map((country) => ({
            value: country.code,
            name: country.name,
          }))
        "
        :loading="pending"
        :errorMessage="getYupFieldErrorMessage('nationality', errors)"
        required
      />
      <TextInput
        label="Taille (en cm)"
        name="height"
        id="height"
        type="number"
        placeholder="Taille du joueur"
        v-model="height"
        :errorMessage="getYupFieldErrorMessage('height', errors)"
      />
      <TextInput
        label="Poids (en kg)"
        name="weight"
        id="weight"
        type="number"
        placeholder="Poids du joueur"
        v-model="weight"
        :errorMessage="getYupFieldErrorMessage('weight', errors)"
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
