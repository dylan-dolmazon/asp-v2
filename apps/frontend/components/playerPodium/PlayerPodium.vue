<script setup lang="ts">
import { getPosition } from "../../../../shared/functions/Position";
import type { FootedFull, PositionFull } from "../../.nuxt/imports";

defineProps({
  players: Array<PlayerRanking>,
});
</script>

<template>
  <div class="PlayerPodium flex justify-between mx-5">
    <div
      v-for="(player, index) in players"
      :key="index"
      class="PlayerPodium-player"
    >
      <div class="PlayerPodium-player-top">
        <div class="PlayerPodium-player-top-infos">
          <Typo
            format="bold"
            tag="p"
            className="PlayerPodium-player-top-infos-rating"
          >
            {{ player.goalsscored }} buts
          </Typo>
          <Typo
            format="medium"
            tag="p"
            className="PlayerPodium-player-top-infos-position"
          >
            {{ getPosition(player.position as PositionFull, true) }}
          </Typo>
          <NuxtImg
            :src="player.country?.flagUrl"
            alt="nationalité du joueur"
            class="PlayerPodium-player-top-infos-nation"
            width="25"
            height="25"
          />
          <NuxtImg
            src="/logo.png"
            alt="logo du club"
            class="PlayerPodium-player-top-infos-club"
            width="25"
            height="25"
          />
        </div>
        <div class="PlayerPodium-player-picture">
          <NuxtImg src="/avatar.png" alt="avatar du joueur" />
        </div>
      </div>
      <div class="PlayerPodium-player-bottom">
        <Typo format="bold" tag="h3" className="PlayerPodium-name">
          {{ player.firstname.charAt(0) }}. {{ player.lastname }}
        </Typo>
        <div class="PlayerPodium-player-bottom-stats">
          <div class="PlayerPodium-player-bottom-stats-item">
            <Typo format="medium" tag="p">Pass</Typo>
            <Typo format="medium" tag="p">
              {{ player.assists || 0 }}
            </Typo>
          </div>
          <div class="PlayerPodium-player-bottom-stats-item">
            <Typo format="medium" tag="p">Pied</Typo>
            <Typo format="medium" tag="p">
              {{ getFooted(player.footed as FootedFull, true) }}
            </Typo>
          </div>
          <div class="PlayerPodium-player-bottom-stats-item">
            <Typo format="medium" tag="p">Age</Typo>
            <Typo format="medium" tag="p">
              {{ player.age }}
            </Typo>
          </div>
        </div>
      </div>
      <div class="PlayerPodium-player-medals">
        <Ranking
          :number="
            index === 0 ? 2 : index === 1 ? 1 : index === 2 ? 3 : undefined
          "
          :className="`classment-${index}`"
        />
      </div>
    </div>
  </div>
</template>

<style>
@import "./playerPodium.scss";
</style>
