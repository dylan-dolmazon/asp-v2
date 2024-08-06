<script setup lang="ts">
defineProps({
  players: Array<PlayerRanking>,
  skeleton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="PlayerPodium">
    <PlayerCard
      :skeleton="skeleton"
      v-for="(player, index) in skeleton ? Array(3).fill({}) : players"
      :key="player.id"
      :player="player"
      :rankingNumber="index"
      :style="index === 0 ? 'special' : index === 1 ? 'gold' : 'silver'"
    />
  </div>
</template>

<style lang="scss" scoped>
.PlayerPodium {
  display: flex;
  flex-direction: column;
  align-items: center;
  .PlayerCard {
    margin-top: 40px;
  }

  @screen sm {
    justify-content: space-between;
    flex-direction: row;
    .PlayerCard {
      margin-top: 0;

      &:nth-child(2) {
        margin-top: 30px;
        order: 0;
      }

      &:nth-child(1) {
        order: 1;
      }

      &:nth-child(3) {
        margin-top: 80px;
        order: 2;
      }
    }
  }
}
</style>
