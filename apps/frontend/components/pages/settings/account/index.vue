<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

useHead({
  title: "Paramétres",
});

const { getUserInfos, setUserInfos } = useUserInfos();

const modifyInfos = ref(false);
const loading = ref(false);

const schema = yup.object({
  lastname: yup.string(),
  firstname: yup.string(),
  username: yup.string(),
  email: yup.string().email(),
  password: yup.string().required(),
});

const state = reactive({
  lastname: getUserInfos.value.lastname,
  firstname: getUserInfos.value.firstname,
  username: getUserInfos.value.username,
  email: getUserInfos.value.email,
  password: "",
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  loading.value = true;
  const datasToUpdate = Object.keys(event.data).reduce((acc, key) => {
    if (
      event.data[key as keyof UserUpdate] !==
      getUserInfos.value[key as keyof User]
    ) {
      return {
        ...acc,
        [key]: event.data[key as keyof UserUpdate],
      };
    }
    return acc;
  }, {} as UserUpdate);

  const { pending, data, error } = await updateUser(
    getUserInfos.value.id!,
    datasToUpdate
  );

  if (!error.value && data?.value) {
    addToast(
      "Modification réussie",
      [`Vos informations ont bien été modifiées`],
      "success"
    );

    const { password: oldPassword, ...restDatas } = datasToUpdate;
    setUserInfos({
      ...getUserInfos.value,
      ...restDatas,
      updatedAt: data.value.updatedAt,
    });
    modifyInfos.value = false;
  }

  loading.value = pending.value;
  state.password = "";
};
</script>

<template>
  <div class="Settings-userCard">
    <div class="Settings-userCard-left">
      <div
        class="Settings-userCard-img flex flex-col justify-center items-center bg-default-300"
      >
        <NuxtImg
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="photo de profil"
          width="150"
          class="rounded-full mb-8"
        />
        <Typo tag="h3" class="text-white">
          {{ getUserInfos.firstname }} {{ getUserInfos.lastname }}
        </Typo>
      </div>
      <div class="Settings-userCard-role">
        <Typo class="pr-2">Rôle: </Typo>
        <Typo format="bold">{{ translateRole(getUserInfos.role) }}</Typo>
      </div>
    </div>
    <div class="Settings-userCard-right">
      <UButton
        v-if="!modifyInfos"
        size="sm"
        color="primary"
        square
        variant="ghost"
        class="absolute top-5 right-5"
        @click="modifyInfos = true"
      >
        <Icon
          name="ph:pencil-simple-line-fill"
          width="20"
          height="20"
          class="text-default"
        ></Icon>
      </UButton>
      <UButton
        v-if="modifyInfos"
        size="sm"
        color="primary"
        square
        variant="ghost"
        class="absolute top-5 right-5"
        @click="modifyInfos = false"
      >
        <Icon
          name="material-symbols:lock"
          width="20"
          height="20"
          class="text-default"
        ></Icon>
      </UButton>
      <div class="Settings-form">
        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          class="space-y-6"
        >
          <TextInput
            label="Nom"
            name="lastname"
            v-model="state.lastname"
            id="lastname"
            type="text"
            placeholder="Nom"
            :read-only="!modifyInfos"
          />
          <TextInput
            label="Prénom"
            name="firstname"
            v-model="state.firstname"
            id="firstname"
            type="text"
            placeholder="Prénom"
            :read-only="!modifyInfos"
          />
          <TextInput
            label="Nom d'utilisateur"
            name="username"
            v-model="state.username"
            id="username"
            type="text"
            placeholder="Username"
            :read-only="!modifyInfos"
          />
          <TextInput
            label="E-mail"
            name="email"
            v-model="state.email"
            id="email"
            type="mail"
            placeholder="Email"
            :read-only="!modifyInfos"
          />
          <TextInput
            v-if="modifyInfos"
            label="Saisissez votre mot de passe"
            name="password"
            v-model="state.password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <UButton
            v-if="modifyInfos"
            icon="i-heroicons-check"
            size="sm"
            color="primary"
            type="submit"
            class="mt-6"
            variant="solid"
            block
            label="Modifier"
            :trailing="false"
            :loading="loading"
          />
        </UForm>
      </div>
    </div>
  </div>
  <div class="Settings-dates">
    <div v-if="getUserInfos.createdAt" class="flex gap-2">
      <Typo class="text-center">Créé le</Typo>
      <UBadge>
        {{ getDateformated(getUserInfos.createdAt, "DD-MM-YYYY") }}
      </UBadge>
    </div>
    <div v-if="getUserInfos.updatedAt" class="flex gap-2">
      <Typo class="text-center">Derniére modification le</Typo>
      <UBadge>
        {{ getDateformated(getUserInfos.updatedAt, "DD-MM-YYYY") }}
      </UBadge>
    </div>
  </div>
</template>

<style scoped>
@import "./account.scss";
</style>
