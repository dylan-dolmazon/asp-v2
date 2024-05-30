<script setup lang="ts">
useHead({
  title: "Modification buteurs",
});
const page = ref(1);
const search = ref("");
const playersToUpdate = ref<
  { id: string; goalsscored: number; assists: number }[]
>([]);

const {
  pending,
  data: players,
  refresh,
} = await getPlayersRanking(page, 15, search);

const searchName = useDebounceFn((newVal) => {
  search.value = newVal;
}, 600);

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
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      trailing
      placeholder="Search..."
      class="w-2/6 mx-auto my-8"
      @input="(event: any) => searchName(event.target.value)"
    />
    <UTable
      :loading="pending"
      :columns="playerScorerRankingColumns"
      :rows="players?.data"
    >
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
      <UButton
        @click="updatePlayer()"
        label="Mettre à jours"
        :disabled="playersToUpdate.length === 0"
      />
      <UPagination
        v-if="players?.meta"
        v-model="page"
        :total="players.meta.total"
        :page-count="players.meta.perPage"
      />
    </div>
  </NuxtLayout>
</template>
