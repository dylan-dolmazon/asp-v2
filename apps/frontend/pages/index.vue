<script setup lang="ts">
const page = ref(1);
const initialTopPlayers = ref<PlayerRanking[] | null>(null);
const currentTopPlayers = ref<PlayerRanking[]>([]);
const tableDataPlayers = ref<PlayerRanking[]>([]);

const { pending, data: players } = await getPlayersRanking(page);

watch(players, async (newPlayers) => {
  if (!newPlayers?.data) return { podium: [], tableData: [] };

  const playersData = newPlayers.data;

  let podium: PlayerRanking[] = [];
  let tableData: PlayerRanking[] = [];

  if (page.value === 1 && playersData.length >= 3) {
    initialTopPlayers.value = playersData.slice(0, 3);
    const tmp = initialTopPlayers.value[0];
    initialTopPlayers.value[0] = initialTopPlayers.value[1];
    initialTopPlayers.value[1] = tmp;

    podium = initialTopPlayers.value;
    tableData = playersData.slice(3);
  } else {
    podium = initialTopPlayers.value || [];
    tableData = playersData;
  }

  currentTopPlayers.value = podium;
  tableDataPlayers.value = tableData;
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-2/3 m-auto">
      <PlayerPodium :players="currentTopPlayers" />
      <div class="mt-12">
        <UTable
          :loading="pending"
          :columns="playersRankingColumns"
          :rows="tableDataPlayers"
        >
          <template #fullname-data="{ row }">
            <Ranking :number="row.rank" />
            {{ row.fullname }}
          </template>
        </UTable>
        <UPagination
          v-if="players?.meta"
          v-model="page"
          :total="players.meta.total"
          :page-count="players.meta.perPage"
          class="justify-center mt-8"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
