<script setup lang="ts">
const page = ref(1);
const columns = playerScorerRankingColumns;
const playersToUpdate = ref<
  { id: string; goalsscored: number; assists: number }[]
>([]);

const { pending, data: players, refresh } = await getPlayersRanking(page, 15);

const handleChange = (
  score: number,
  id: string,
  type: "goalsscored" | "assists"
) => {
  const playerToUpdate = playersToUpdate.value.find(
    (player) => player.id === id
  );

  if (playerToUpdate) {
    playerToUpdate[type] = score;
  } else {
    const player = players.value?.data.find((player) => player.id === id);
    if (player) {
      if (type === "goalsscored") {
        playersToUpdate.value.push({
          id,
          goalsscored: score,
          assists: player.assists,
        });
      } else {
        playersToUpdate.value.push({
          id,
          goalsscored: player.goalsscored,
          assists: score,
        });
      }
    }
  }
};

const updatePlayer = async () => {
  const { error } = await updatePlayers(playersToUpdate.value);
  if (!error.value) {
    playersToUpdate.value = [];
    addToast(
      "Mise à jours réussi",
      ["Les joueurs ont été mis à jours avec succès"],
      "success"
    );
    await refresh();
  }
};
</script>

<template>
  <NuxtLayout name="default">
    <UTable :loading="pending" :columns="columns" :rows="players?.data">
      <template #goalsscored-data="{ row }">
        <UInput
          v-model="row.goalsscored"
          type="number"
          class="w-20"
          :onchange="
            (event: any) =>
              handleChange(event.target.value, row.id, 'goalsscored')
          "
        />
      </template>
      <template #assists-data="{ row }">
        <UInput
          v-model="row.assists"
          type="number"
          class="w-20"
          :onchange="
            (event: any) => handleChange(event.target.value, row.id, 'assists')
          "
        />
      </template>
    </UTable>
    <div class="flex items-center justify-center gap-10 mt-5">
      <UButton @click="updatePlayer()" label="Mettre à jours" />
      <UPagination
        v-model="page"
        :total="players?.meta.total"
        :page-count="players?.meta.perPage"
      />
    </div>
  </NuxtLayout>
</template>
