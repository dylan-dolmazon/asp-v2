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

      &--gold {
        margin-top: 30px;
        order: 0;
      }

      &--special {
        order: 1;
      }

      &--silver {
        margin-top: 80px;
        order: 2;
      }
    }
  }
}
</style>
