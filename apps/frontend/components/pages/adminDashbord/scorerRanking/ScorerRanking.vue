<script setup lang="ts">
const page = ref(1);
const { data: players } = await getPlayersRanking(page, 4);
</script>

<template>
  <div
    class="ScorerRanking h-full"
    :onClick="() => navigateTo('/admin/buteurs')"
  >
    <div class="flex items-center justify-evenly">
      <Typo tag="h2" format="bold">Classement des buteurs</Typo>
      <Icon name="fa6-solid:ranking-star" width="45" height="35"></Icon>
    </div>
    <div class="ScorerRanking-content grid grid-cols-2 grid-rows-2 gap-3">
      <div
        v-for="(player, index) in players?.data"
        class="flex flex-col items-center justify-evenly m-3"
      >
        <Ranking :number="index + 1" :class="`classment-${index} m-5`" />
        <Typo> {{ player.firstname }} {{ player.lastname }} </Typo>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ScorerRanking {
  &:hover {
    cursor: pointer;
  }
  .ScorerRanking-content {
    height: 85%;
  }
}
</style>
