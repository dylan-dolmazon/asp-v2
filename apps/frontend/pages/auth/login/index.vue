<script setup lang="ts">
import * as yup from "yup";
const router = useRouter();

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const onSubmit = async (values: any, { resetForm }: any) => {
  const { error, data } = await loginUser(values.email, values.password);
  if (!error.value && data?.value) {
    resetForm();
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
            class="mt-6"
            variant="solid"
            block
            label="Se connecter"
            :trailing="false"
          />
        </Form>
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
