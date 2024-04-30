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
    <div v-for="result in results" class="my-10 flex">
      <div class="GameResults-match w-3/5 text-center my-12 pr-32">
        <Typo format="bold" class="text-primary">
          {{ getDateformated(result.date, "dddd DD MMMM YYYY") }} -
          {{ result.time }}
        </Typo>
        <div class="flex items-center justify-evenly gap-36 my-8">
          <div
            class="flex items-center gap-4 w-40 overflow-visible whitespace-nowrap"
          >
            <NuxtImg
              :src="result.home?.club.logo"
              alt="logo équipe"
              width="40"
            />
            <Typo format="bold">{{ result.home?.name }}</Typo>
          </div>
          <div class="flex gap-1">
            <Typo format="bold">{{ result.score?.home }}</Typo>
            <Typo format="bold">-</Typo>
            <Typo format="bold">{{ result.score?.away }}</Typo>
          </div>
          <div
            class="flex items-center gap-4 flex-row-reverse w-40 overflow-visible whitespace-nowrap"
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
      <div class="GameResults-infos w-2/5 pl-32">
        <Typo> journée: {{ result.journee }} </Typo>
        <div class="flex justify-evenly w-full">
          <div class="flex flex-col">
            <Typo format="bold"> Sufrace de jeu: </Typo>
            <Typo>
              {{ result.stade?.surface ?? "Non renseigné" }}
            </Typo>
          </div>
          <div class="flex flex-col">
            <Typo format="bold"> Arbitre officiels: </Typo>
            <Typo>
              {{
                result.referer
                  ? `${result.referer.lastname}
              ${result.referer.firstname}`
                  : "Non désigné"
              }}
            </Typo>
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
