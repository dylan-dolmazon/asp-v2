<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const route = useRoute();
const token = route.query.token as string;
const email = route.query.email as string;

const { pending, data } = await checkLink(token, email);

const schema = yup.object({
  password: passwordValidation,
  password_confirmation: yup
    .string()
    .required("Cette information est obligatoire.")
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas."),
  email: yup.string().email().required(),
  token: yup.string().required(),
});

const state = reactive({
    password: "",
    password_confirmation: "",
    email: email,
    token: token,
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {  const { error, data } = await resetPassword(event.data);
  if (!error.value && data?.value?.success) {
    addToast(
      "Succés",
      data.value.success.map((obj) => obj.message),
      "success"
    );
  }
};
</script>

<template>
  <NuxtLayout name="auth">
    <div class="Form">
      <div class="Form-content">
        <div class="flex items-center justify-evenly" v-if="pending">
          <Typo tag="h3" class="Form-content-title">
            Vérification du token
          </Typo>
          <Icon name="eos-icons:bubble-loading" width="20" height="20"></Icon>
        </div>
        <div v-else-if="data?.error">
          <Snackbar type="Erreur">
            <div>
              <Typo v-for="error in data.error" tag="p" format="normal">
                {{ error.message }}
              </Typo>
            </div>
          </Snackbar>
          <CustomLink
            href="/"
            :typo="{ format: 'normal', tag: 'h4' }"
            class="text-center mt-8 mx-auto"
          >
            Retour à la page d'acceuil
          </CustomLink>
        </div>
        <div v-else>
          <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
            <TextInput
              name="password"
              type="password"
              label="Nouveau mot de passe"
              placeholder="Mot de passe"
              v-model="state.password"
              required
            />

            <div>
              <TextInput
                name="password_confirmation"
                type="password"
                label="Confirmation du mot de passe"
                placeholder="Mot de passe"
                v-model="state.password_confirmation"
                required
              />
              <div class="grid grid-cols-2 grid-rows-2 text-default mt-4">
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
              type="submit"
              class="mt-6"
              variant="solid"
              block
              label="Réinitialiser le mot de passe"
              :trailing="false"
            />
          </UForm>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss"></style>
