<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";
const route = useRoute();

const { setUserInfos } = useUserInfos();

const router = useRouter();

const loading = ref(false);

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean().required(),
});

const state = reactive({
  email: undefined,
  password: undefined,
  remember: false,
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

    setUserInfos(data.value, event.data.remember);

    if (!!route.query.redirect) {
      router.push(route.query.redirect as string);
    } else {
      router.push("/");
    }
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
          <Checkbox
            name="remember"
            label="Se souvenir de moi"
            class="mt-6"
            v-model="state.remember"
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
    <div class="link">
      <CustomLink
        href="/auth/register"
        variant="white"
        :typo="{ format: 'normal', tag: 'p' }"
      >
        Pas encore inscrit ?
      </CustomLink>
      <span class="h-full w-0.5 bg-white" />
      <CustomLink
        href="/password/forgot"
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
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  align-items: center;

  @screen sm {
    width: 430px;
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
