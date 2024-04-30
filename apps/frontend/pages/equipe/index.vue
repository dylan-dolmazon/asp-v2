<script setup lang="ts">
useHead({
  title: "Mon équipe",
});
const page = ref(1);
const modalModifyIsOpen = ref(false);
const slideOverCreateIsOpen = ref(false);
const deleteLoading = ref(false);
const search = ref("");

const searchName = useDebounceFn((newVal) => {
  search.value = newVal;
}, 500);

const selectedPlayer = ref<Player | undefined>(undefined);

const { pending, data: players, refresh } = await getPlayers(page, 10, search);

const suppPlayer = async (id: string) => {
  deleteLoading.value = true;
  await deletePlayer(id);
  refresh();
  modalModifyIsOpen.value = false;
  deleteLoading.value = false;
};

const actions = isAdmin()
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
          click: () => console.log("Edit", row.id),
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
            modalModifyIsOpen.value = true;
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
</script>

<template>
  <NuxtLayout name="default">
    <CreatePlayer v-model="slideOverCreateIsOpen" />
    <Modal v-model="modalModifyIsOpen">
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
            @click="modalModifyIsOpen = false"
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
    <div class="relative">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="white"
        trailing
        placeholder="Search..."
        class="w-2/6 mx-auto my-8"
        @input="(event: any) => searchName(event.target.value)"
      />
      <UButton
        v-if="isAdmin()"
        icon="i-heroicons-user-plus-solid"
        size="lg"
        color="primary"
        variant="solid"
        label="Ajouter un joueur"
        trailing
        @click="slideOverCreateIsOpen = true"
        class="absolute right-8 top-0"
      />
    </div>
    <UTable :loading="pending" :columns="playersColumns" :rows="players?.data">
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
