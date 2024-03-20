<script setup lang="ts">
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  password: passwordValidation,
});

const onSubmit = async (values: any, { resetForm }: any) => {
  const { error } = await registerUser(
    values.email,
    values.username,
    values.lastname,
    values.firstname,
    values.password
  );
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
          />
          <TextInput
            name="username"
            type="text"
            label="Nom d'utilisateur"
            placeholder="Votre nom d'utilisateur"
          />
          <TextInput
            name="lastname"
            type="text"
            label="Nom"
            placeholder="Votre nom"
          />
          <TextInput
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Votre prénom"
          />
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
          />
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
