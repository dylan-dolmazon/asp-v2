<script setup lang="ts">
const page = ref<number>(0);
const item = ref<string>();
const pool = ref<number>(0);
const championnatInfos = ref<Championnat | null>();
const competitions = ref<Compet[] | null>([]);
const compet = ref<number>(0);
const classment = ref<ClubInfo[]>([]);
const calendar = ref<Game[]>([]);
const results = ref<Game[]>([]);
const isLoading = ref<boolean>(true);

watch(compet, async (newValue) => {
  isLoading.value = true;
  page.value = 0;
  await fetchCompetInfos(newValue);
  if (item.value === "classment") {
    fetchClassment(newValue, pool.value);
  }
  if (item.value === "calendar") {
    fetchCalendar(newValue, pool.value);
  }
  if (item.value === "results") {
    fetchResults(newValue, pool.value);
  }
});

watch(page, () => {
  isLoading.value = true;
  if (item.value === "calendar") {
    fetchCalendar(compet.value, pool.value);
  }
  if (item.value === "results") {
    fetchResults(compet.value, pool.value);
  }
});

watch(pool, (newValue) => {
  isLoading.value = true;
  page.value = 0;
  if (item.value === "classment" || !item.value) {
    fetchClassment(compet.value, newValue);
  }
  if (item.value === "calendar") {
    fetchCalendar(compet.value, newValue);
  }
  if (item.value === "results") {
    fetchResults(compet.value, newValue);
  }
});

watch(item, (newValue) => {
  isLoading.value = true;
  page.value = 0;
  if (newValue === "classment") {
    fetchClassment(compet.value, pool.value);
  }
  if (newValue === "calendar") {
    fetchCalendar(compet.value, pool.value);
  }
  if (newValue === "results") {
    fetchResults(compet.value, pool.value);
  }
});

const fetchCompets = async () => {
  await getCompets({
    onResponse: (response: any) => {
      const data: Compet[] = response.response["_data"];
      competitions.value = data;
      compet.value = data[0].number;
    },
  });
};
const fetchCompetInfos = async (competId: number) => {
  await getCompetInfos(competId, {
    onResponse: (response: any) => {
      const data: Championnat = response.response["_data"];
      championnatInfos.value = data;
      pool.value = data.pools[0].number;
    },
  });
};

const fetchClassment = async (competId: number, poolId: number) => {
  await getClassment(competId, poolId, {
    onResponse: (response: any) => {
      const data: ClubInfo[] = response.response["_data"];
      classment.value = data;
    },
  });
  isLoading.value = false;
};

const fetchCalendar = async (competId: number, poolId: number) => {
  await getCalendar(competId, poolId, page.value, {
    onResponse: (response: any) => {
      const data: Game[] = response.response["_data"];
      calendar.value = data;
    },
  });
  isLoading.value = false;
};

const fetchResults = async (competId: number, poolId: number) => {
  await getResults(competId, poolId, page.value, {
    onResponse: (response: any) => {
      const data: Game[] = response.response["_data"];
      results.value = data;
    },
  });
  isLoading.value = false;
};

await fetchCompets();

const items = [
  {
    slot: "classment",
    label: "Classement",
  },
  {
    slot: "results",
    label: "Résultats",
  },
  {
    slot: "calendar",
    label: "Calendrier",
  },
  {
    slot: "calendar",
    label: "Calendrier",
  },
];

const onChange = (tab: number) => {
  item.value = items[tab].slot;
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex gap-2 items-start">
      <div class="flex gap-2 flex-col">
        <USelect
          :loading="compet === 0"
          v-model="compet"
          class="w-40"
          :options="
            competitions?.map((compet) => ({
              value: compet.number,
              name: compet.name,
            }))
          "
          option-attribute="name"
        />
        <USelect
          :loading="pool === 0"
          v-model="pool"
          class="w-40"
          :options="
            championnatInfos?.pools.map((pool) => ({
              value: pool.number,
              name: pool.name,
            }))
          "
          option-attribute="name"
        />
        <Icon
          v-if="isLoading"
          class="m-auto"
          name="svg-spinners:3-dots-fade"
          width="60"
          height="60"
        ></Icon>
      </div>
      <UTabs :items="items" class="w-full" @change="onChange">
        <template #classment="{ item }">
          <Classment v-if="classment" :classment="classment" />
        </template>

        <template #calendar="{ item }">
          <div class="flex mt-8 justify-center gap-8">
            <UButton
              icon="i-heroicons-arrow-long-left-16-solid"
              size="lg"
              label="Match précédent"
              :disabled="page === 0"
              @click="() => (page -= 1)"
            />
            <UButton
              icon="i-heroicons-arrow-long-right-16-solid"
              size="lg"
              label="Match suivant"
              trailing
              @click="() => (page += 1)"
            />
          </div>
          <Results :results="calendar" />
        </template>

        <template #results="{ item }">
          <div class="flex mt-8 justify-center gap-8">
            <UButton
              icon="i-heroicons-arrow-long-left-16-solid"
              size="lg"
              label="Match précédent"
              @click="() => (page -= 1)"
            />
            <UButton
              icon="i-heroicons-arrow-long-right-16-solid"
              size="lg"
              label="Match suivant"
              trailing
              :disabled="page === 0"
              @click="() => (page += 1)"
            />
          </div>
          <Results :results="results" />
        </template>
      </UTabs>
    </div>
  </NuxtLayout>
</template>
