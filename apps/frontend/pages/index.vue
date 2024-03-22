<script setup lang="ts">
const columns = playersColumns;

const { pending, data: players } = await getPlayersRanking();

const datas = computed<{ podium: PlayerRanking[]; tableData: PlayerRanking[] }>(
  () => {
    if (!players?.value?.data) return { podium: [], tableData: [] };

    const playersData = players.value.data;

    const podium = playersData.slice(0, 3); // Les 3 premiers joueurs pour le podium
    const tableData = playersData.slice(3); // Les données restantes pour la table

    // Inversion des deux premiers joueurs du podium
    if (podium.length >= 2) {
      const tmp = podium[0];
      podium[0] = podium[1];
      podium[1] = tmp;
    }

    return {
      podium,
      tableData,
    };
  }
);
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-2/3 m-auto">
      <PlayerPodium :players="datas.podium" />
      <div class="mt-12">
        <UTable :loading="pending" :columns="columns" :rows="datas.tableData">
          <template #fullname-data="{ row }">
            <Ranking :number="row.id" />
            {{ row.fullname }}
          </template>
        </UTable>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss"></style>
