<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = yup.object({
  email: yup.string().email().required(),
});

const state = reactive({
  email: "",
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  const { error, data } = await forgotPassword(event.data.email);
  if (!error.value && data.value?.success) {
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
        <Typo tag="h2" class="Form-content-title"
          >Vous avez oulié votre mot de passe ?</Typo
        >
        <Typo class="py-6"
          >Recevez un lien de réinitialisation par e-mail !</Typo
        >
        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          class="space-y-6"
        >
          <TextInput
            name="email"
            type="email"
            label="Mail"
            placeholder="Votre mail"
            v-model="state.email"
            required
          />
          <UButton
            icon="i-heroicons-check"
            size="sm"
            color="primary"
            type="submit"
            class="mt-6"
            variant="solid"
            block
            label="Envoyer le lien de réinitialisation"
            :trailing="false"
          />
        </UForm>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.Form {
  &-content-title {
    display: block !important;
    text-align: center;
  }
}
</style>
