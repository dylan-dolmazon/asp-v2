<script setup lang="ts">
defineProps({
  players: Array<PlayerRanking>,
});
</script>

<template>
  <div class="PlayerPodium">
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
.PlayerPodium {
  display: flex;
  flex-direction: column;
  align-items: center;

  @screen sm {
    justify-content: space-between;
    flex-direction: row;
  }

  .PlayerCard {
    &:nth-child(1) {
      margin-top: 40px;
    }
    &:nth-child(2) {
      margin-top: 60px;
    }
    &:nth-child(3) {
      margin-top: 60px;
    }

    @screen sm {
      &:nth-child(2) {
        margin-top: 0;
      }
    }
  }
}
</style>
