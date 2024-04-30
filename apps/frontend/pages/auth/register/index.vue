<script setup lang="ts">
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  password: passwordValidation,
});

const { handleSubmit, defineField, errors } = useForm<User>({
  validationSchema: schema,
  validateOnMount: false,
});

const [email] = defineField("email");
const [username] = defineField("username");
const [lastname] = defineField("lastname");
const [firstname] = defineField("firstname");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  const { error } = await registerUser(values);
  if (!error.value) {
    addToast(
      "Inscription réussie",
      [`Merci de vous être inscrit veuillez vous connecter`],
      "success"
    );
    navigateTo("/auth/login");
  }
});
</script>

<template>
  <NuxtLayout name="auth">
    <div class="Form">
      <div class="Form-content">
        <Typo tag="h2" format="bold" class="text-center mb-6">
          Bienvenue sur l'application de l'AS Pertuis
        </Typo>
        <Form :validation-schema="schema" @submit="onSubmit">
          <TextInput
            name="email"
            type="email"
            label="Mail"
            placeholder="Votre mail"
            v-model="email"
            :errorMessage="getYupFieldErrorMessage('email', errors)"
            required
          />
          <TextInput
            name="username"
            type="text"
            label="Nom d'utilisateur"
            placeholder="Votre nom d'utilisateur"
            v-model="username"
            :errorMessage="getYupFieldErrorMessage('username', errors)"
            required
          />
          <TextInput
            name="lastname"
            type="text"
            label="Nom"
            placeholder="Votre nom"
            v-model="lastname"
            :errorMessage="getYupFieldErrorMessage('lastname', errors)"
            required
          />
          <TextInput
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Votre prénom"
            v-model="firstname"
            :errorMessage="getYupFieldErrorMessage('firstname', errors)"
            required
          />
          <div>
            <TextInput
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              v-model="password"
              :errorMessage="getYupFieldErrorMessage('password', errors)"
              required
            />
            <div class="grid grid-cols-2 grid-rows-2 text-default">
              <Typo format="medium" tag="p4"> 8 caractéres minimum </Typo>
              <Typo format="medium" tag="p4"> 1 majuscule </Typo>
              <Typo format="medium" tag="p4"> 1 caractére spécial </Typo>
              <Typo format="medium" tag="p4"> Pas d'espace </Typo>
            </div>
          </div>
          <UButton
            icon="i-heroicons-check"
            size="sm"
            color="primary"
            class="mt-6"
            type="submit"
            variant="solid"
            block
            label="S'inscrire"
            :trailing="false"
          />
        </Form>
      </div>
    </div>
    <div class="mt-10">
      <CustomLink
        href="/auth/login"
        variant="white"
        :typo="{ format: 'normal', tag: 'p' }"
      >
        déjà inscrit ?
      </CustomLink>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.link {
  width: 430px;
}
</style>
