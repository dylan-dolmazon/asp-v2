<script setup lang="ts">
const { data, pending } = await getCompets({}, 4);
</script>

<template>
  <div class="Compets">
    <div class="flex items-center justify-evenly">
      <Typo tag="h2" format="bold">Championnats</Typo>
      <Icon name="solar:cup-bold-duotone" width="45" height="35"></Icon>
    </div>
    <div class="mx-8 mt-12">
      <UTable
        :loading="pending"
        :columns="competsAdminDashboardColumns"
        :rows="data?.data"
      >
        <template #favorite-data="{ row }">
          <UButton variant="link">
            <Icon
              name="ic:twotone-favorite"
              width="20"
              height="20"
              :class="row.order === 1 ? 'text-error' : 'text-gray-400'"
            ></Icon>
          </UButton>
        </template>
      </UTable>
    </div>
  </div>
</template>
