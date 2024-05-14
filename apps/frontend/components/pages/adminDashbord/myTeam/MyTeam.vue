<script setup lang="ts">
const page = ref(1);

const { pending, data: players } = await getPlayers(page, 4);
</script>

<template>
  <div class="h-full">
    <div class="flex items-center justify-evenly">
      <Typo tag="h2" format="bold">Mon équipe</Typo>
      <Icon name="ri:team-fill" width="45" height="35"></Icon>
    </div>
    <div class="mx-8 mt-12">
      <UTable
        :loading="pending"
        :columns="playersAdminDashboardColumns"
        :rows="players?.data"
      />
    </div>
  </div>
</template>
