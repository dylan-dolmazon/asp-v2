<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  password: passwordValidation,
});

const state = reactive({
  email: undefined,
  password: undefined,
  username: undefined,
  lastname: undefined,
  firstname: undefined,
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  const { error } = await registerUser(event.data);
  if (!error.value) {
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
        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          class="space-y-4"
        >
          <TextInput
            name="email"
            type="email"
            label="Mail"
            placeholder="Votre mail"
            v-model="state.email"
            required
          />
          <TextInput
            name="username"
            type="text"
            label="Nom d'utilisateur"
            placeholder="Votre nom d'utilisateur"
            v-model="state.username"
            required
          />
          <TextInput
            name="lastname"
            type="text"
            label="Nom"
            placeholder="Votre nom"
            v-model="state.lastname"
            required
          />
          <TextInput
            name="firstname"
            type="text"
            label="Prénom"
            placeholder="Votre prénom"
            v-model="state.firstname"
            required
          />
          <div>
            <TextInput
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              v-model="state.password"
              required
            />
            <div class="grid grid-cols-2 grid-rows-2 text-default mt-2">
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
        </UForm>
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
