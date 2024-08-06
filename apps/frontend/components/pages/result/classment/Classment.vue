<script setup lang="ts">
const router = useRouter();

defineProps({
  classment: {
    type: Object as PropType<ClubInfo[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const sort = ref({
  column: "",
  direction: "",
});

watch(sort, (value) => {
  router.push({
    query:
      value.column === ""
        ? {}
        : {
            ...router.currentRoute.value.query,
            sortBy: value.column,
            direction: value.direction,
          },
  });
});
</script>

<template>
  <UTable
    v-model:sort="sort"
    class="mt-8"
    :rows="classment"
    :columns="classmentColumns"
    :loading="isLoading"
  >
    <template #name-data="{ row }">
      <Ranking :number="row.ranking" />
      {{ row.name }}
    </template>
  </UTable>
</template>
