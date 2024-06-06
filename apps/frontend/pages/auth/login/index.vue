<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const router = useRouter();

const loading = ref(false);

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  loading.value = true;
  const { error, pending, data } = await loginUser(event.data);
  loading.value = pending.value;
  if (!error.value && data?.value) {
    addToast(
      "Connexion réussie",
      [`Content de vous revoir ${data.value?.username}`],
      "success"
    );
    const { token, ...userValue } = data.value;
    const userCookie = useCookie<User>("user");
    const tokenCookie = useCookie<Token>("token");
    userCookie.value = JSON.parse(JSON.stringify(userValue));
    tokenCookie.value = JSON.parse(JSON.stringify(token));
    router.back();
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
        <UForm :schema="schema" :state="state" @submit="onSubmit">
          <TextInput
            name="email"
            type="email"
            label="Mail"
            class="mt-6"
            placeholder="Votre mail"
            v-model="state.email"
            required
          />
          <TextInput
            name="password"
            type="password"
            class="mt-6"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            v-model="state.password"
            required
          />
          <UButton
            icon="i-heroicons-check"
            size="sm"
            color="primary"
            type="submit"
            variant="solid"
            class="mt-12"
            block
            label="Se connecter"
            :trailing="false"
            :loading="loading"
          />
        </UForm>
      </div>
    </div>
    <div class="link flex justify-between mt-10 h-fit">
      <CustomLink
        href="/auth/register"
        variant="white"
        :typo="{ format: 'normal', tag: 'p' }"
      >
        Pas encore inscrit ?
      </CustomLink>
      <span class="h-full w-0.5 bg-white" />
      <CustomLink
        href=""
        variant="white"
        :typo="{ format: 'normal', tag: 'p' }"
      >
        Mot de passe oublié ?
      </CustomLink>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.link {
  width: 430px;
}
</style>
