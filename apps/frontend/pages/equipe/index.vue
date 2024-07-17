<script setup lang="ts">
import { storeToRefs } from "pinia";

useHead({
  title: "Mon équipe",
});

const router = useRouter();
const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);

const page = ref(1);
const modalDeleteIsOpen = ref(false);
const slideOverCreateIsOpen = ref(false);

const slideOverModifyIsOpen = ref(false);
const playerId = ref(-1);

const deleteLoading = ref(false);
const search = ref("");

const searchName = useDebounceFn((newVal) => {
  search.value = newVal;
}, 600);

const selectedPlayer = ref<Player | undefined>(undefined);

const sort = ref({
  column: "createdAt",
  direction: "desc",
});

const {
  pending,
  data: players,
  refresh,
} = await getPlayers(page, 10, sort, search);

const suppPlayer = async (id: string) => {
  deleteLoading.value = true;
  await deletePlayer(id);
  refresh();
  modalDeleteIsOpen.value = false;
  deleteLoading.value = false;
};

const actions = isAdmin.value
  ? (row: any) => [
      [
        {
          label: "Détail",
          icon: "i-heroicons-magnifying-glass-circle-solid",
          disable: true,
          click: () => navigateTo(`/equipe/player/${row.id}`),
        },
        {
          label: "Modifier",
          icon: "i-heroicons-pencil-square",
          click: () => {
            playerId.value = row.id;
            slideOverModifyIsOpen.value = true;
          },
        },
      ],
      [
        {
          label: "Supprimer",
          icon: "i-heroicons-trash-20-solid",
          click: () => {
            selectedPlayer.value = players.value?.data.find(
              (player) => player.id === row.id
            );
            modalDeleteIsOpen.value = true;
          },
        },
      ],
    ]
  : (row: any) => [
      [
        {
          label: "Détail",
          icon: "i-heroicons-magnifying-glass-circle-solid",
          disable: true,
          click: () => navigateTo(`/equipe/player/${row.id}`),
        },
      ],
    ];

watch(sort, (value) => {
  router.push({
    query:
      value.column === "createdAt"
        ? {}
        : {
            ...router.currentRoute.value.query,
            sortBy: value.column,
            direction: value.direction,
          },
  });
});

watch(slideOverCreateIsOpen, (newValue) => {
  if (!newValue) refresh();
});
watch(slideOverModifyIsOpen, (newValue) => {
  if (!newValue) refresh();
});
</script>

<template>
  <NuxtLayout name="default">
    <CreatePlayer v-model="slideOverCreateIsOpen" />
    <ModifyPlayer
      v-model:is-open="slideOverModifyIsOpen"
      v-model:player-id="playerId"
    />
    <Modal v-model="modalDeleteIsOpen">
      <template #header>
        <Typo tag="h3" class="text-error w-full text-center">
          Supprimer {{ selectedPlayer?.fullname }}
        </Typo>
      </template>

      <template #body>
        <Typo>
          Êtes-vous sûr de vouloir supprimer ce joueur il ne sera plus
          disponible dans votre club ?
        </Typo>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <UButton
            color="primary"
            label="Annuler"
            @click="modalDeleteIsOpen = false"
          />
          <UButton
            color="red"
            label="Supprimer"
            :loading="deleteLoading"
            @click="suppPlayer(selectedPlayer?.id || '')"
          />
        </div>
      </template>
    </Modal>
    <div class="Equipe-head">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="white"
        trailing
        placeholder="Search..."
        class="Equipe-head-search"
        @input="(event: any) => searchName(event.target.value)"
      />
      <UButton
        v-if="isAdmin"
        icon="i-heroicons-user-plus-solid"
        size="lg"
        color="primary"
        variant="solid"
        label="Ajouter un joueur"
        trailing
        @click="slideOverCreateIsOpen = true"
        class="Equipe-head-button"
      />
    </div>
    <UTable
      v-model:sort="sort"
      :loading="pending"
      :columns="playersColumns"
      :rows="players?.data"
      sort-mode="manual"
    >
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
    <UPagination
      v-if="players?.meta"
      v-model="page"
      :total="players.meta.total"
      :page-count="players.meta.perPage"
      class="justify-center mt-8"
    />
  </NuxtLayout>
</template>

<style scoped>
@import "equipe.scss";
</style>
