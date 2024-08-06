<script setup lang="ts">
defineProps({
  player: {
    type: Object as PropType<Player | PlayerRanking>,
    required: true,
  },
  rankingNumber: Number,
  style: {
    type: String as PropType<"gold" | "silver" | "special">,
    default: "gold",
  },
  skeleton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <USkeleton v-if="skeleton" class="PlayerCard" />
  <div v-else class="PlayerCard" :class="`PlayerCard--${style}`">
    <div class="PlayerCard-top">
      <div class="PlayerCard-top-infos">
        <Typo format="bold" class="PlayerCard-top-infos-rating">
          {{ player.goalsscored }} buts
        </Typo>
        <Typo format="medium" class="PlayerCard-top-infos-position">
          {{ getPosition(player.position, true) }}
        </Typo>
        <NuxtImg
          :src="player.country?.flagUrl"
          alt="nationalité du joueur"
          class="PlayerCard-top-infos-nation"
          width="25"
          height="25"
        />
        <NuxtImg
          src="/logo.png"
          alt="logo du club"
          class="PlayerCard-top-infos-club"
          width="25"
          height="25"
        />
      </div>
      <div class="PlayerCard-picture">
        <NuxtImg src="/avatar.png" alt="avatar du joueur" />
      </div>
    </div>
    <div class="PlayerCard-bottom">
      <Typo format="bold" tag="h3" class="PlayerPodium-name">
        {{ player.firstname.charAt(0) }}. {{ player.lastname }}
      </Typo>
      <div class="PlayerCard-bottom-stats">
        <div class="PlayerCard-bottom-stats-item">
          <Typo format="medium">Pass</Typo>
          <Typo format="medium">
            {{ player.assists || 0 }}
          </Typo>
        </div>
        <div class="PlayerCard-bottom-stats-item">
          <Typo format="medium">Pied</Typo>
          <Typo format="medium">
            {{ getFooted(player.footed, true) }}
          </Typo>
        </div>
        <div class="PlayerCard-bottom-stats-item">
          <Typo format="medium">Age</Typo>
          <Typo format="medium">
            {{ player.age }}
          </Typo>
        </div>
      </div>
    </div>
    <div class="PlayerCard-medals" v-if="rankingNumber != undefined">
      <Ranking
        :number="rankingNumber + 1"
        :class="`classment-${rankingNumber}`"
      />
    </div>
  </div>
</template>

<style scoped>
@import "./PlayerCard.scss";
</style>
