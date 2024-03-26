<script setup lang="ts">
const page = ref(1);

const columns = playersAdminDashboardColumns;

const { pending, data: players } = await getPlayers(page, 4);
</script>

<template>
  <div class="MyTeam h-full" :onClick="() => navigateTo('/admin/buteurs')">
    <div class="flex items-center justify-evenly">
      <Typo tag="h2" format="bold">Mon équipe</Typo>
      <Icon name="ri:team-fill" width="45" height="35"></Icon>
    </div>
    <div class="mx-8 mt-12">
      <UTable :loading="pending" :columns="columns" :rows="players?.data" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.MyTeam {
  &:hover {
    cursor: pointer;
  }
}
</style>
