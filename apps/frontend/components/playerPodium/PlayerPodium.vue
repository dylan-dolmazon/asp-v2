<script setup lang="ts">
defineProps({
  players: Array<PlayerRanking>,
});
</script>

<template>
  <div class="flex justify-between mx-5 mt-10">
    <PlayerCard
      v-for="(player, index) in players"
      :key="player.id"
      :player="player"
      :rankingNumber="index"
      :style="index === 0 ? 'gold' : index === 1 ? 'special' : 'silver'"
    />
  </div>
</template>

<style lang="scss" scoped>
.PlayerCard {
  &:nth-child(1) {
    margin-top: 40px;
  }
  &:nth-child(3) {
    margin-top: 60px;
  }
}
</style>
