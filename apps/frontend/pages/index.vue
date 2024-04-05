<script setup lang="ts">
const page = ref(1);
let initialTopPlayers: PlayerRanking[] | null = null;

const { pending, data: players } = await getPlayersRanking(page);

const datas = computed(() => {
  if (!players?.value?.data) return { podium: [], tableData: [] };

  const playersData = players.value.data;

  let podium: PlayerRanking[] = [];
  let tableData: PlayerRanking[] = [];

  if (page.value === 1 && playersData.length >= 3) {
    initialTopPlayers = playersData.slice(0, 3);
    const tmp = initialTopPlayers[0];
    initialTopPlayers[0] = initialTopPlayers[1];
    initialTopPlayers[1] = tmp;

    podium = initialTopPlayers;
    tableData = playersData.slice(3);
  } else {
    podium = initialTopPlayers || [];
    tableData = playersData;
  }

  return { podium, tableData };
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-2/3 m-auto">
      <PlayerPodium :players="datas.podium" />
      <div class="mt-12">
        <UTable
          :loading="pending"
          :columns="playersRankingColumns"
          :rows="datas.tableData"
        >
          <template #fullname-data="{ row }">
            <Ranking :number="row.id" />
            {{ row.fullname }}
          </template>
        </UTable>
        <UPagination
          v-model="page"
          :total="players?.meta.total"
          :page-count="players?.meta.perPage"
          class="justify-center mt-8"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
