<script setup lang="ts">
import * as yup from "yup";

useHead({
  title: "Gestions des championnats",
});

const deleteModalIsOpen = ref(false);
const currentId = ref(0);
const deleteLoading = ref(false);

const { data, refresh, pending } = await getCompets();

const createCompetIsLoading = ref(false);
const schemaCreate = yup.object({
  name: yup.string().required(),
  number: yup.number().required(),
});

const {
  handleSubmit: handleSubmitCreate,
  defineField: defineFieldCreate,
  errors: errorsCreate,
  resetForm: resetFormCreate,
} = useForm<Compet>({
  validationSchema: schemaCreate,
  validateOnMount: false,
});

const [nameCreate] = defineFieldCreate("name");
const [numberCreate] = defineFieldCreate("number");

const onSubmitCreate = handleSubmitCreate(async (values) => {
  createCompetIsLoading.value = true;
  await createCompet(values);
  resetFormCreate();
  createCompetIsLoading.value = false;
  refresh();
});

const updateCompetIsLoading = ref(false);
const updateModalIsOpen = ref(false);
const schemaUpdate = yup.object({
  name: yup.string().required(),
  number: yup.number().required(),
  order: yup.number(),
});

const {
  handleSubmit: handleSubmitUpdate,
  defineField: defineFieldUpdate,
  errors: errorsUpdate,
  resetForm: resetFormUpdate,
} = useForm<{ name: string; number: number; order: number }>({
  validationSchema: schemaUpdate,
  validateOnMount: false,
});

const [nameUpdate] = defineFieldUpdate("name");
const [numberUpdate] = defineFieldUpdate("number");
const [orderUpdate] = defineFieldUpdate("order");

const onSubmitUpdate = handleSubmitUpdate(async (values) => {
  updateCompetIsLoading.value = true;
  await updateCompet(
    currentId.value,
    data.value?.data.find((compet) => compet.id === currentId.value)?.name !==
      values.name
      ? values.name
      : undefined,
    data.value?.data.find((compet) => compet.id === currentId.value)?.number !==
      values.number
      ? values.number
      : undefined
  );
  resetFormUpdate();
  refresh();
  updateModalIsOpen.value = false;
  updateCompetIsLoading.value = false;
});

const newFavorite = async (id: number) => {
  await updateCompetsOrder(id);
  refresh();
};

const actions = (row: any) => [
  [
    {
      label: "Modifier",
      icon: "i-heroicons-pencil-square",
      click: () => {
        currentId.value = row.id;
        nameUpdate.value = row.name;
        numberUpdate.value = row.number;
        orderUpdate.value = row.order;
        updateModalIsOpen.value = true;
      },
    },
    {
      label: "Supprimer",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        currentId.value = row.id;
        deleteModalIsOpen.value = true;
      },
    },
  ],
];
</script>

<template>
  <NuxtLayout name="default">
    <Modal v-model="deleteModalIsOpen">
      <template #header>
        <Typo tag="h3" class="text-error w-full text-center">
          Supprimer le championnat "{{
            data?.data.find((compet) => compet.id === currentId)?.name
          }}"
        </Typo>
      </template>

      <template #body>
        <Typo>
          Êtes-vous sûr de vouloir supprimer ce championnat il ne sera plus
          disponible sur la page des résultats ?
        </Typo>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <UButton
            color="primary"
            label="Annuler"
            @click="deleteModalIsOpen = false"
          />
          <UButton
            color="red"
            label="Supprimer"
            :loading="deleteLoading"
            @click="
              async () => {
                deleteLoading = true;
                await deleteCompet(currentId);
                refresh();
                deleteLoading = false;
                deleteModalIsOpen = false;
              }
            "
          />
        </div>
      </template>
    </Modal>
    <Modal v-model="updateModalIsOpen" v-if="isAdmin()">
      <template #header>
        <Typo tag="h3" class="w-full text-center">
          Modification du championnat "{{
            data?.data.find((compet) => compet.id === currentId)?.name
          }}"
        </Typo>
      </template>

      <template #body>
        <Form @submit="onSubmitUpdate">
          <Typo>
            <TextInput
              label="Nom"
              name="nameUpdate"
              id="nameUpdate"
              type="text"
              placeholder="Nom du championnat"
              v-model="nameUpdate"
              :errorMessage="getYupFieldErrorMessage('name', errorsUpdate)"
              required
            />
            <TextInput
              label="Numéro"
              name="numberUpdate"
              id="numberUpdate"
              type="number"
              placeholder="Numéro du championnat"
              v-model="numberUpdate"
              :errorMessage="getYupFieldErrorMessage('number', errorsUpdate)"
              required
            />
            <TextInput
              label="Order"
              name="orderUpdate"
              id="orderUpdate"
              type="number"
              placeholder="Order de préférence"
              :disabled="true"
              v-model="orderUpdate"
            />
          </Typo>
          <div class="flex justify-between mt-2">
            <UButton
              color="primary"
              label="Annuler"
              @click="updateModalIsOpen = false"
            />
            <UButton
              color="green"
              label="Modifier"
              type="submit"
              :loading="updateCompetIsLoading"
            />
          </div>
        </Form>
      </template>
    </Modal>
    <div class="flex mt-10">
      <Form @submit="onSubmitCreate" class="w-1/4">
        <Typo>
          <TextInput
            label="Nom"
            name="nameCreate"
            id="nameCreate"
            type="text"
            placeholder="Nom du championnat"
            v-model="nameCreate"
            :errorMessage="getYupFieldErrorMessage('name', errorsCreate)"
            required
          />
          <TextInput
            label="Numéro"
            name="numberCreate"
            id="numberCreate"
            type="number"
            placeholder="Numéro du championnat"
            v-model="numberCreate"
            :errorMessage="getYupFieldErrorMessage('number', errorsCreate)"
            required
          />
        </Typo>
        <UButton
          color="green"
          label="Ajouter"
          type="submit"
          size="sm"
          class="m-auto"
          :loading="createCompetIsLoading"
        />
      </Form>
      <UTable
        :loading="pending"
        :columns="competsSortColumns"
        :rows="data?.data"
        class="w-4/5"
      >
        <template #favorite-data="{ row }">
          <UButton
            variant="link"
            class="favorite"
            :class="row.order === 1 && 'favorite--active'"
            @click="newFavorite(row.id)"
          >
            <Icon name="ic:twotone-favorite" width="20" height="20"></Icon>
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.favorite {
  color: theme("colors.gris.500");

  &:hover {
    color: theme("colors.error");
  }

  &:hover:not(&--active) {
    scale: 1.1;
    cursor: pointer;
  }

  &--active {
    color: theme("colors.error");
  }
}
</style>
