<script setup lang="ts">
defineProps({
  results: {
    type: Object as PropType<Game[]>,
    required: true,
  },
});
</script>

<template>
  <div class="GameResults">
    <div v-for="result in results" class="GameResults-match my-10">
      <div class="GameResults-match-equipes">
        <Typo format="bold" class="text-primary">
          {{ getDateformated(result.date, "dddd DD MMMM YYYY") }} -
          {{ result.time }}
        </Typo>
        <div
          class="GameResults-match-score flex items-center justify-evenly my-8"
        >
          <div
            class="GameResults-match-logo flex items-center gap-4 w-40 overflow-visible whitespace-nowrap"
          >
            <NuxtImg
              :src="result.home?.club.logo"
              alt="logo équipe"
              width="40"
            />
            <Typo format="bold">{{ result.home?.name }}</Typo>
          </div>
          <div class="flex gap-2 items-center">
            <p class="text-4xl font-bold">{{ result.score?.home }}</p>
            <Typo format="bold">-</Typo>
            <p class="text-4xl font-bold">{{ result.score?.away }}</p>
          </div>
          <div
            class="GameResults-match-logo--reverse flex items-center gap-4 w-40 overflow-visible whitespace-nowrap"
          >
            <NuxtImg
              :src="result.away?.club.logo"
              alt="logo équipe"
              width="40"
            />
            <Typo format="bold">{{ result.away?.name }}</Typo>
          </div>
        </div>
        <Typo>
          {{ result.stade?.name }} {{ result.stade?.street }}
          {{ result.stade?.postalCode }} -
          {{ result.stade?.city }}
        </Typo>
      </div>
      <div class="GameResults-infos">
        <Typo class="text-primary" format="bold">
          journée: {{ result.journee }}
        </Typo>
        <div class="flex justify-evenly w-full">
          <div class="flex flex-col">
            <Typo format="bold"> Sufrace de jeu: </Typo>
            <Typo>
              {{ result.stade?.surface ?? "Non renseigné" }}
            </Typo>
          </div>
          <div class="flex flex-col">
            <Typo format="bold"> Arbitre officiels: </Typo>
            <Typo v-if="result.referers" v-for="referer in result.referers">
              {{ referer.lastname }} {{ referer.firstname }}
            </Typo>
            <Typo v-else>Non désigné</Typo>
          </div>
        </div>
        <UButton
          size="xl"
          variant="link"
          label="Feuille de match"
          target="_blank"
          :to="result.matchSheet"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./Results.scss";
</style>
