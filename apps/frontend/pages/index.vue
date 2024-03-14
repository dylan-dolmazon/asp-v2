<script setup lang="ts">
import type { Entry } from "@shared/types/EntriesTypes";

const { pending, data, refresh } = await getEntries();

const columns = [
  { key: "id", label: "ID" },
  { key: "api", label: "API" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "auth", label: "Auth" },
  { key: "https", label: "HTTPS" },
  { key: "cors", label: "CORS" },
  { key: "link", label: "Link" },
  { key: "category", label: "Category" },
  {
    key: "actions",
  },
];

const items = (row: Entry) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: async () => {
        await navigateTo(`/entries/${row.id}`);
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        await deleteEntry(row.id);
        refresh();
      },
    },
  ],
];
</script>

<template>
  <div class="style">
    <div class="style-sub mb-10">
      <MyComponent />
      <SecondComponent />
      <UButton @click="refresh">Refresh</UButton>
    </div>
    <div>
      <UTable :loading="pending" :rows="data || []" :columns="columns">
        <template #name-data="{ row }">
          <span>{{ row.name }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </div>
</template>

<style lang="scss">
.style {
  .style-sub {
    margin-top: 10px;
  }
}
</style>
