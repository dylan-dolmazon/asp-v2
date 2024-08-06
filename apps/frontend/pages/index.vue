<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);

const schema = yup.object({
  title: yup.string().required(),
  season: yup.string().required(),
});

const state = reactive({
  title: "Classement des buteurs du club",
  season: "2023 - 2024",
});

const page = ref(1);
const initialTopPlayers = ref<PlayerRanking[] | null>(null);
const currentTopPlayers = ref<PlayerRanking[]>([]);
const tableDataPlayers = ref<PlayerRanking[]>([]);

const { pending, data: players } = await getPlayersRanking(page);

const scoreboardImage = ref<string | undefined>(undefined);
const scoreboardImageLoading = ref<boolean>(false);

watch(players, async (newPlayers) => {
  if (!newPlayers?.data) return { podium: [], tableData: [] };

  const playersData = newPlayers.data;

  let podium: PlayerRanking[] = [];
  let tableData: PlayerRanking[] = [];

  if (page.value === 1 && playersData.length >= 3) {
    initialTopPlayers.value = playersData.slice(0, 3);

    podium = initialTopPlayers.value;
    tableData = playersData.slice(3);
  } else {
    podium = initialTopPlayers.value || [];
    tableData = playersData;
  }

  currentTopPlayers.value = podium;
  tableDataPlayers.value = tableData;
});

const onSubmit = async (
  event: FormSubmitEvent<yup.InferType<typeof schema>>
) => {
  scoreboardImageLoading.value = true;
  const { data } = await generateScorerClassement(
    event.data.title,
    event.data.season
  );
  scoreboardImage.value = data.value?.canvas;
  scoreboardImageLoading.value = false;
};

const downloadPng = (myCanvas: string) => {
  const link = document.createElement("a");
  link.href = myCanvas;
  link.download = "classement-ASP.png";
  link.click();
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="HomePage m-auto">
      <PlayerPodium :players="currentTopPlayers" :skeleton="pending" />
      <div class="mt-12">
        <UTable
          :loading="pending"
          :columns="playersRankingColumns"
          :rows="tableDataPlayers"
        >
          <template #fullname-data="{ row }">
            <Ranking :number="row.rank" />
            {{ row.fullname }}
          </template>
        </UTable>
        <UPagination
          v-if="players?.meta"
          v-model="page"
          :total="players.meta.total"
          :page-count="players.meta.perPage"
          class="justify-center mt-8"
        />
      </div>
    </div>
    <UDivider class="my-12" />
    <Snackbar v-if="!isAdmin" type="Information" class="mb-4">
      <Typo tag="p" format="normal">
        Vous devez être administrateur pour accéder à cette fonctionnalité
      </Typo>
    </Snackbar>
    <div class="HomePage-form">
      <div class="w-80">
        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          class="space-y-8"
        >
          <TextInput
            name="title"
            type="text"
            label="Titre de l'image"
            :placeholder="state.title"
            v-model="state.title"
            required
            :skeleton="!isAdmin"
          />
          <TextInput
            name="saison"
            type="text"
            label="Saison"
            :placeholder="state.season"
            v-model="state.season"
            required
            :skeleton="!isAdmin"
          />
          <Button
            type="submit"
            :loading="scoreboardImageLoading"
            :skeleton="!isAdmin"
          >
            {{ scoreboardImage ? "Modifier le" : "Générer un" }} classement en
            png
          </Button>
        </UForm>
      </div>

      <div class="text-center">
        <USkeleton v-if="!isAdmin" class="HomePage-generate"></USkeleton>
        <div
          v-else
          class="HomePage-generate HomePage-generate--borded shadow-lg"
        >
          <img
            v-if="scoreboardImage"
            :src="scoreboardImage"
            alt="Score Board"
          />
          <Icon
            v-else-if="scoreboardImageLoading"
            name="svg-spinners:ring-resize"
            width="64"
            height="64"
          />
        </div>
        <Button
          :disabled="!scoreboardImage"
          class="mt-4"
          @click="
            () => {
              !!scoreboardImage && downloadPng(scoreboardImage);
            }
          "
          :skeleton="!isAdmin"
        >
          Télécharger l'image
        </Button>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.HomePage {
  width: 100%;

  @screen sm {
    width: 65%;
  }

  &-generate {
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;

    @screen sm {
      width: 850px;
    }

    &--borded {
      border: 1px solid theme("colors.black");
    }
  }

  &-form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 40px;

    @screen sm {
      flex-direction: row;
    }
  }
}
</style>
