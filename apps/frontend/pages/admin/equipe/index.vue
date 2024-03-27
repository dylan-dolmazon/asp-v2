<script setup lang="ts">
const page = ref(1);

const columns = playersColumns;

const { pending, data: players } = await getPlayers(page, 10);

const actions = (row: any) => [
  [
    {
      label: "Détail",
      icon: "i-heroicons-pencil-square-solid",
      click: () => navigateTo(`player/${row.id}`),
    },
    {
      label: "Modifier",
      icon: "i-heroicons-magnifying-glass-circle-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
</script>

<template>
  <NuxtLayout name="default">
    <UTable
      :loading="pending"
      :columns="columns"
      :rows="players?.data"
      class="mt-12"
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
      v-model="page"
      :total="players?.meta.total"
      :page-count="players?.meta.perPage"
      class="justify-center mt-8"
    />
  </NuxtLayout>
</template>

<style scoped></style>
