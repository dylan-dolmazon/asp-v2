<script setup lang="ts">
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const onSubmit = async (values: any, { resetForm }: any) => {
  await loginUser(values.email, values.password);
  resetForm();
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
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
          />
          <UButton
            icon="i-heroicons-check"
            size="sm"
            color="primary"
            type="submit"
            variant="solid"
            block
            label="Se connecter"
            :trailing="false"
          />
        </Form>
      </div>
    </div>
  </NuxtLayout>
</template>
