<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLoggin } = storeToRefs(userStore);

useHead({
  title: "Gestions des championnats",
});

const deleteModalIsOpen = ref(false);
const currentId = ref(0);
const deleteLoading = ref(false);

const { data, refresh, pending } = await getCompets();

const createCompetIsLoading = ref(false);
const schemaCreate = yup.object({
  number: yup
    .number()
    .required()
    .test("len", "Le numéro doit contenir 6 chiffres", (val) => {
      return val.toString().length === 6;
    }),
});

const stateCreate = reactive({
  number: undefined,
});
const formCreate = ref();

const onSubmitCreate = async (
  event: FormSubmitEvent<yup.InferType<typeof schemaCreate>>
) => {
  createCompetIsLoading.value = true;
  await createCompet(event.data.number);
  stateCreate.number = undefined;
  createCompetIsLoading.value = false;
  refresh();
};

const updateCompetIsLoading = ref(false);
const updateModalIsOpen = ref(false);
const schemaUpdate = yup.object({
  nameUpdate: yup.string(),
  numberUpdate: yup
    .number()
    .required()
    .test("len", "Le numéro doit contenir 6 chiffres", (val) => {
      return val.toString().length === 6;
    }),
  orderUpdate: yup.number(),
});

const stateUpdate = reactive({
  numberUpdate: undefined,
  nameUpdate: undefined,
  orderUpdate: undefined,
});

const onSubmitUpdate = async (
  event: FormSubmitEvent<yup.InferType<typeof schemaUpdate>>
) => {
  updateCompetIsLoading.value = true;
  await updateCompet(
    currentId.value,
    data.value?.data.find((compet) => compet.id === currentId.value)?.number !==
      event.data.numberUpdate
      ? event.data.numberUpdate
      : undefined
  );
  refresh();
  updateModalIsOpen.value = false;
  updateCompetIsLoading.value = false;
};

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
        stateUpdate.numberUpdate = row.number;
        stateUpdate.nameUpdate = row.name;
        stateUpdate.orderUpdate = row.order;
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

const alreadyExistsModalIsOpen = ref(false);
const selected = ref<Compet[]>([]);
const alreadyExistsCompets = ref<Compet[]>([]);
const alreadyExistsPending = ref(false);

const saveHistory = async (selectedItems: number[]) => {
  await saveAllHistory(selectedItems);
  refresh();
};

const checkHistory = async (selectedItems: number[], season: string) => {
  alreadyExistsPending.value = true;
  const { data: compets } = await checkAllHistory(selectedItems, season);
  if (compets.value && compets.value.length > 0) {
    alreadyExistsCompets.value = compets.value;
    alreadyExistsModalIsOpen.value = true;
  } else {
    await saveHistory(selectedItems);
  }
  alreadyExistsPending.value = false;
};
</script>

<template>
  <NuxtLayout name="default">
    <Modal v-model="alreadyExistsModalIsOpen">
      <template #header>
        <Typo tag="h4" class="text-warning w-full text-center">
          Certains championnats ont déjà un historique enregistré pour la saison
          sélectionnée
        </Typo>
      </template>

      <template #body>
        <typo class="text-primary text-center mb-6">
          Êtes-vous sur de vouloir mettre à jours ces classement ? les autres
          seront eux enregistrés normalement
        </typo>
        <ul>
          <li
            v-for="compet in alreadyExistsCompets"
            class="flex justify-center gap-4"
          >
            <Typo>{{ compet.name }}</Typo>
            <span>-</span>
            <Typo>{{ compet.number }}</Typo>
          </li>
        </ul>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <UButton
            color="primary"
            label="Annuler"
            @click="alreadyExistsModalIsOpen = false"
          />
          <UButton
            label="Mettre à jours"
            class="bg-warning hover:bg-gold"
            :loading="alreadyExistsPending"
            @click="
              async () => {
                alreadyExistsPending = true;
                await saveHistory(selected.map((item) => item.number));
                refresh();
                alreadyExistsPending = false;
                alreadyExistsModalIsOpen = false;
              }
            "
          />
        </div>
      </template>
    </Modal>
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
    <Modal v-model="updateModalIsOpen" v-if="isLoggin">
      <template #header>
        <Typo tag="h3" class="w-full text-center">
          Modification du championnat "{{
            data?.data.find((compet) => compet.id === currentId)?.name
          }}"
        </Typo>
      </template>

      <template #body>
        <UForm
          :schema="schemaUpdate"
          :state="stateUpdate"
          @submit="onSubmitUpdate"
          class="space-y-4"
        >
          <TextInput
            label="Nom du championnat"
            name="nameUpdate"
            id="nameUpdate"
            type="text"
            placeholder="Nom du championnat"
            v-model="stateUpdate.nameUpdate"
            :disabled="true"
          />
          <TextInput
            label="Numéro"
            name="numberUpdate"
            id="numberUpdate"
            type="number"
            placeholder="Numéro du championnat"
            v-model="stateUpdate.numberUpdate"
            required
          />
          <TextInput
            label="Order"
            name="orderUpdate"
            id="orderUpdate"
            type="number"
            placeholder="Order de préférence"
            :disabled="true"
            v-model="stateUpdate.orderUpdate"
          />

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
        </UForm>
      </template>
    </Modal>
    <div class="Results mt-10">
      <UForm
        :ref="formCreate"
        :schema="schemaCreate"
        :state="stateCreate"
        @submit="onSubmitCreate"
        class="CreateForm space-y-8"
      >
        <Typo tag="h3" class="text-center"> Création d'un championnat </Typo>
        <TextInput
          label="Numéro"
          name="number"
          id="number"
          type="number"
          placeholder="Numéro du championnat"
          v-model="stateCreate.number"
          required
        />
        <UButton
          label="Ajouter"
          type="submit"
          size="sm"
          class="m-auto"
          :loading="createCompetIsLoading"
        />
      </UForm>
      <div class="Results-table">
        <UTable
          :loading="pending"
          :columns="competsSortColumns"
          :rows="data?.data"
          v-model="selected"
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
        <div class="text-center mt-8">
          <UButton
            size="lg"
            :disabled="selected.length === 0"
            color="green"
            :loading="alreadyExistsPending"
            :onClick="
              () =>
                checkHistory(
                  selected.map((item) => item.number),
                  selected[0].season
                )
            "
          >
            Sauvegarder le classement
          </UButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
@import "results.scss";
</style>
