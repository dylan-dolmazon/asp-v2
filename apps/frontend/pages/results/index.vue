<script setup lang="ts">
import * as yup from "yup";

useHead({
  title: "Championnat",
});

const page = ref<number>(1);
const item = ref<string>();
const pool = ref<number>(0);
const championnatInfos = ref<Championnat | null>();
const competitions = ref<Compet[] | null>([]);
const compet = ref<number>(0);
const classment = ref<ClubInfo[]>([]);
const calendar = ref<Game[]>([]);
const results = ref<Game[]>([]);
const isLoading = ref<boolean>(true);

const date = ref<{ from: string; to: string }>();

watch(compet, async (newValue) => {
  isLoading.value = true;
  page.value = 1;
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

watch(page, async () => {
  isLoading.value = true;
  if (item.value === "calendar") {
    await fetchCalendar(compet.value, pool.value);
  }
  if (item.value === "results") {
    await fetchResults(compet.value, pool.value);
  }
});

watch(pool, async (newValue) => {
  isLoading.value = true;
  page.value = 1;
  if (item.value === "classment" || !item.value) {
    await fetchClassment(compet.value, newValue);
  }
  if (item.value === "calendar") {
    await fetchCalendar(compet.value, newValue);
  }
  if (item.value === "results") {
    await fetchResults(compet.value, newValue);
  }
});

watch(item, async (newValue) => {
  isLoading.value = true;
  page.value = 1;
  if (newValue === "classment") {
    await fetchClassment(compet.value, pool.value);
  }
  if (newValue === "calendar") {
    await fetchCalendar(compet.value, pool.value);
  }
  if (newValue === "results") {
    await fetchResults(compet.value, pool.value);
  }
});

const fetchCompets = async () => {
  await getCompets({
    onResponse: (response: any) => {
      if (
        "_data" in response.response &&
        response.response["_data"].data[0].number
      ) {
        const data: Compet[] = response.response["_data"].data;
        competitions.value = data;
        compet.value = data[0].number;
      }
    },
  });
};
const fetchCompetInfos = async (competId: number) => {
  await getCompetInfos(competId, {
    onResponse: (response: any) => {
      if ("_data" in response.response && response.response["_data"].pools) {
        const data: Championnat = response.response["_data"];
        championnatInfos.value = data;
        pool.value = data.pools[0].number;
      }
    },
  });
};

const fetchClassment = async (competId: number, poolId: number) => {
  await getClassment(competId, poolId, {
    onResponse: (response: any) => {
      if ("_data" in response.response && response.response["_data"][0].club) {
        const data: ClubInfo[] = response.response["_data"];
        classment.value = data;
        date.value = undefined;
      }
    },
  });
  isLoading.value = false;
};

const fetchCalendar = async (competId: number, poolId: number) => {
  await getCalendar(competId, poolId, page.value, {
    onResponse: (response: any) => {
      if ("_data" in response.response && response.response["_data"].clubs) {
        const data: Results = response.response["_data"];
        calendar.value = data.clubs;
        date.value = data.dates;
      }
    },
  });
  isLoading.value = false;
};

const fetchResults = async (competId: number, poolId: number) => {
  await getResults(competId, poolId, page.value, {
    onResponse: (response: any) => {
      if ("_data" in response.response && response.response["_data"].clubs) {
        const data: Results = response.response["_data"];
        results.value = data.clubs;
        date.value = data.dates;
      }
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
];

const onChange = (tab: number) => {
  item.value = items[tab].slot;
};

const modalCreateCompet = ref(false);
const createCompetIsLoading = ref(false);
const schema = yup.object({
  name: yup.string().required(),
  number: yup.number().required(),
});

const { handleSubmit, defineField, errors, resetForm } = useForm<Compet>({
  validationSchema: schema,
  validateOnMount: false,
});

const [name] = defineField("name");
const [number] = defineField("number");

const onSubmit = handleSubmit(async (values) => {
  createCompetIsLoading.value = true;
  await createCompet(values);
  resetForm();
  createCompetIsLoading.value = false;
  modalCreateCompet.value = false;
  await fetchCompets();
});
</script>

<template>
  <NuxtLayout name="default">
    <Modal v-model="modalCreateCompet" v-if="isAdmin()">
      <template #header>
        <Typo tag="h3" class="w-full text-center">
          Création d'un championnat
        </Typo>
      </template>

      <template #body>
        <Form @submit="onSubmit">
          <Typo>
            <TextInput
              label="Nom"
              name="name"
              id="name"
              type="text"
              placeholder="Nom du championnat"
              v-model="name"
              :errorMessage="getYupFieldErrorMessage('name', errors)"
              required
            />
            <TextInput
              label="Numéro"
              name="number"
              id="number"
              type="number"
              placeholder="Numéro du championnat"
              v-model="number"
              :errorMessage="getYupFieldErrorMessage('number', errors)"
              required
            />
          </Typo>
          <div class="flex justify-between mt-2">
            <UButton
              color="primary"
              label="Annuler"
              @click="modalCreateCompet = false"
            />
            <UButton
              color="green"
              label="Ajouter"
              type="submit"
              :loading="createCompetIsLoading"
            />
          </div>
        </Form>
      </template>
    </Modal>
    <div class="flex gap-2 items-start">
      <div class="flex gap-8 flex-col">
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
          <UButton
            icon="i-heroicons-plus-circle-solid"
            size="sm"
            color="primary"
            variant="solid"
            label="Nouveau"
            :trailing="false"
            @click="modalCreateCompet = true"
            v-if="isAdmin()"
          />
        </div>
        <div class="w-16 h-16 m-auto">
          <Icon
            v-if="isLoading"
            name="svg-spinners:3-dots-fade"
            width="64"
            height="64"
          />
        </div>
        <div v-if="date">
          <div>
            <Typo tag="p" format="bold" class="text-center mr-2"> Du </Typo>
            <UBadge>{{ getDateformated(date.from, "DD-MM-YYYY") }}</UBadge>
          </div>
          <div>
            <Typo tag="p" format="bold" class="text-center mr-2"> Au </Typo>
            <UBadge>{{ getDateformated(date.to, "DD-MM-YYYY") }}</UBadge>
          </div>
        </div>
      </div>
      <UTabs :items="items" class="w-full" @change="onChange">
        <template #classment="{ item }">
          <Snackbar
            v-if="!isLoading && classment?.length === 0"
            type="Erreur"
            class="mt-10 mx-20"
          >
            <div>
              <Typo tag="p" format="normal" class="pr-1">
                Le classement n'est pas disponible en se moment pour le
                championnat
              </Typo>
              <Typo tag="p" format="bold">
                {{
                  competitions?.find(
                    (competition) => competition.number === compet
                  )?.name
                }}
                {{
                  championnatInfos?.pools.find((info) => info.number === pool)
                    ?.name
                }}.
              </Typo>
            </div>
          </Snackbar>
          <Classment v-else :classment="classment" />
        </template>

        <template #calendar="{ item }">
          <div class="flex mt-8 justify-center gap-8">
            <UButton
              icon="i-heroicons-arrow-long-left-16-solid"
              size="lg"
              label="Match précédent"
              :disabled="page === 1"
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
          <Snackbar
            v-if="calendar?.length === 0 && !isLoading"
            title="Aucun match trouvé"
            type="Attention"
            class="mt-10 mx-20"
          >
            <div>
              <Typo tag="p" format="normal" class="pr-1">
                Pas de matchs prévue durant cette semaine pour le championnat
              </Typo>
              <Typo tag="p" format="bold">
                {{
                  competitions?.find(
                    (competition) => competition.number === compet
                  )?.name
                }}
                {{
                  championnatInfos?.pools.find((info) => info.number === pool)
                    ?.name
                }}.
              </Typo>
            </div>
          </Snackbar>
          <Results v-else :results="calendar" />
        </template>

        <template #results="{ item }">
          <div class="flex mt-8 justify-center gap-8">
            <UButton
              icon="i-heroicons-arrow-long-left-16-solid"
              size="lg"
              label="Match précédent"
              @click="() => (page += 1)"
            />
            <UButton
              icon="i-heroicons-arrow-long-right-16-solid"
              size="lg"
              label="Match suivant"
              trailing
              :disabled="page === 1"
              @click="() => (page -= 1)"
            />
          </div>
          <Snackbar
            v-if="results?.length === 0 && !isLoading"
            title="Aucun match trouvé"
            type="Attention"
            class="mt-10 mx-20"
          >
            <div>
              <Typo tag="p" format="normal" class="pr-1">
                Pas de résultat disponible durant cette semaine pour le
                championnat
              </Typo>
              <Typo tag="p" format="bold">
                {{
                  competitions?.find(
                    (competition) => competition.number === compet
                  )?.name
                }}
                {{
                  championnatInfos?.pools.find((info) => info.number === pool)
                    ?.name
                }}.
              </Typo>
            </div>
          </Snackbar>
          <Results v-else :results="results" />
        </template>
      </UTabs>
    </div>
  </NuxtLayout>
</template>
