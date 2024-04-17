<script setup lang="ts">
useHead({
  title: "Mon équipe",
});
const page = ref(1);
const isOpen = ref(false);
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
  isOpen.value = false;
  deleteLoading.value = false;
};

const user = useCookie<User>("user");

const actions = user.value?.role?.includes("admin" || "moderator")
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
            isOpen.value = true;
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
    <Modal v-model="isOpen">
      <template #header>
        <Typo tag="h3" format="normal" class="text-error w-full text-center">
          Supprimer {{ selectedPlayer?.fullname }}
        </Typo>
      </template>

      <template #body>
        <Typo tag="p" format="normal">
          Êtes-vous sûr de vouloir supprimer ce joueur il ne sera plus
          disponible dans votre club ?
        </Typo>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <UButton color="primary" label="Annuler" @click="isOpen = false" />
          <UButton
            color="red"
            label="Supprimer"
            :loading="deleteLoading"
            @click="suppPlayer(selectedPlayer?.id || '')"
          />
        </div>
      </template>
    </Modal>
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      trailing
      placeholder="Search..."
      class="w-2/6 mx-auto my-8"
      @input="(event: any) => searchName(event.target.value)"
    />
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
