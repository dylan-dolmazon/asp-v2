<script setup lang="ts">
const props = defineProps({
  competitions: {
    type: Object as PropType<Compet[]>,
    required: true,
  },
});

const compet = ref(props.competitions[0]?.id || 0);

const { data: history } = await getCompetHistory(compet);
</script>

<template>
  <div class="mt-12 flex justify-between">
    <USelect
      :loading="compet === 0"
      v-model="compet"
      class="w-40"
      :options="
        competitions?.map((compet) => ({
          value: compet.id,
          name: compet.name,
        }))
      "
      option-attribute="name"
    />

    <Typo tag="h2" format="bold" class="text-center">
      Historique des classements
    </Typo>
  </div>
  <UAccordion :items="history" class="mt-12">
    <template #default="{ item, open }">
      <UButton
        class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 rounded-md gap-x-1.5 px-2.5 py-1.5 hover:bg-primary-100 disabled:bg-primary-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 inline-flex items-center bg-primary-500/10 text-black"
      >
        <div class="flex justify-between w-4/5 h-full gap-3 items-center">
          <Typo tag="p" format="normal">{{ item.competName }}</Typo>
          <Typo tag="p" format="normal">{{ item.pool }}</Typo>
          <Typo tag="p" format="normal" class="districtName">{{
            item.districtName
          }}</Typo>
          <Typo tag="p" format="normal">{{ item.saison }}</Typo>
        </div>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-7 h-7 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
    <template #item="{ item }">
      <UTable class="mt-8" :rows="item.teams" :columns="classmentColumns">
        <template #name-data="{ row }">
          <Ranking :number="row.ranking" />
          {{ row.name }}
        </template>
      </UTable>
    </template>
  </UAccordion>
</template>

<style scoped>
.districtName {
  display: none;

  @screen sm {
    display: inline-block;
  }
}
</style>
