<script setup lang="ts">
useHead({
  title: "Détail joueur",
});
const isOpen = ref(false);
const route = useRoute();
const deleteLoading = ref(false);

const { pending, data } = await getPlayerStats(route.params.id as string);

const suppPlayer = async (id: string) => {
  deleteLoading.value = true;
  await deletePlayer(id);
  deleteLoading.value = false;
  navigateTo("/equipe");
};
</script>

<template>
  <NuxtLayout name="default">
    <div v-if="pending" class="Loader">
      <ContentLoader />
    </div>
    <div v-else-if="data">
      <Modal v-model="isOpen">
        <template #header>
          <Typo tag="h3" class="text-error w-full text-center">
            Supprimer {{ data.player.fullname }}
          </Typo>
        </template>

        <template #body>
          <Typo>
            Êtes-vous sûr de vouloir supprimer ce joueur il ne sera plus
            disponible dans votre club ?
          </Typo>
        </template>

        <template #footer>
          <div class="flex justify-between">
            <UButton color="primary" label="Annuler" @click="isOpen = false" />
            <UButton
              color="red"
              label="Supprimer"
              :loading="deleteLoading"
              @click="suppPlayer(data.player.id)"
            />
          </div>
        </template>
      </Modal>
      <div class="PlayerDetail">
        <div class="PlayerDetail-card">
          <PlayerCard :player="data.player" :style="'special'" />
          <div class="Actions flex gap-1">
            <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              variant="link"
              label="Modifier"
            />
            <UButton
              icon="i-heroicons-trash-20-solid"
              size="sm"
              color="primary"
              variant="link"
              label="Supprimer"
              @click="isOpen = true"
            />
          </div>
        </div>
        <div class="PlayerDetail-infos">
          <Typo tag="h3" format="bold" class="PlayerDetail-infos-title">
            {{ data.player.fullname }} - {{ data.player.positionLabel }}
          </Typo>
          <div class="PlayerDetail-infos-stats">
            <Stat :stat="data.player.pace" title="Vitesse" />
            <Stat :stat="data.player.shooting" title="Tirs" />
            <Stat :stat="data.player.passing" title="Passes" />
            <Stat :stat="data.player.defending" title="Défense" />
            <Stat :stat="data.player.dribbling" title="Dribble" />
            <Stat :stat="data.player.physical" title="Physique" />
          </div>
          <UDivider class="m-10 w-auto" />

          <UTable
            :rows="[data.player, data.stats.clubAverage, data.stats.stats]"
            :columns="playersStatsColumns"
          >
            <template #item-data="{ row, index }">
              <div v-if="index === 0" class="flex items-center gap-4">
                <Typo tag="p1" format="bold" class="w-52">
                  Joueur statistiques
                </Typo>
                <Icon
                  name="material-symbols:man"
                  width="40"
                  height="40"
                  class="text-default"
                ></Icon>
              </div>
              <div v-else-if="index === 1" class="flex items-center gap-4">
                <Typo tag="p1" format="bold" class="w-52">
                  Moyenne du club
                </Typo>
                <NuxtImg src="/logo.png" alt="logo équipe" width="40" />
              </div>
              <div v-else class="flex items-center gap-4">
                <Typo tag="p1" format="bold" class="w-52">
                  Classement du joueur / {{ row.totalPlayersCount }}
                </Typo>
                <Icon
                  name="fa6-solid:ranking-star"
                  width="40"
                  height="40"
                  class="text-default"
                ></Icon>
              </div>
            </template>
            <template #goalsscored-data="{ row, index }">
              <Typo v-if="index === 2" tag="p1" format="bold">
                <Ranking
                  :number="row.goalsscored"
                  :class="`classment-${row.goalsscored}`"
                />
              </Typo>
              <Typo v-else format="bold">
                {{ row.goalsscored }}
              </Typo>
            </template>
            <template #assists-data="{ row, index }">
              <Typo v-if="index === 2" tag="p1" format="bold">
                <Ranking
                  :number="row.assists"
                  :class="`classment-${row.assists}`"
                />
              </Typo>
              <Typo v-else format="bold">
                {{ row.assists }}
              </Typo>
            </template>
            <template #yellowcards-data="{ row, index }">
              <Typo v-if="index === 2" tag="p1" format="bold">
                <Ranking
                  :number="row.yellowcards"
                  :class="`classment-${row.yellowcards}`"
                />
              </Typo>
              <Typo v-else format="bold">
                {{ row.yellowcards }}
              </Typo>
            </template>
            <template #redcards-data="{ row, index }">
              <Typo v-if="index === 2" tag="p1" format="bold">
                <Ranking
                  :number="row.redcards"
                  :class="`classment-${row.redcards}`"
                />
              </Typo>
              <Typo v-else format="bold">
                {{ row.redcards }}
              </Typo>
            </template>
          </UTable>
        </div>
      </div>
      <UDivider class="m-10 w-auto" />

      <div class="PlayerInfos">
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Nationalité</Typo>
          <div class="flex items-center gap-4">
            <Typo>{{ data.player.country?.name }}</Typo>
            <NuxtImg
              :src="data.player.country?.flagUrl"
              alt="nationalité du joueur"
              width="30"
              height="30"
            />
          </div>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Club</Typo>
          <div class="flex items-center gap-4">
            <Typo>A.S Pertuis</Typo>
            <NuxtImg
              src="/logo.png"
              alt="Logo du club"
              width="30"
              height="30"
            />
          </div>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Pied fort</Typo>
          <Typo>
            {{ data.player.footedLabel }}
          </Typo>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Poids</Typo>
          <Typo>
            {{ data.player.weight ?? "Non renseigné" }}
          </Typo>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Taille</Typo>
          <Typo>
            {{ data.player.height ?? "Non renseigné" }}
          </Typo>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Créé le</Typo>
          <Typo>
            {{ getDateformated(data.player.createdAt) }}
          </Typo>
        </div>
        <div class="flex flex-col items-center gap-4">
          <Typo tag="h3" format="bold" class="text-default">Modifié le</Typo>
          <Typo>
            {{ getDateformated(data.player.updatedAt) }}
          </Typo>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
@import "./[id].scss";
</style>
