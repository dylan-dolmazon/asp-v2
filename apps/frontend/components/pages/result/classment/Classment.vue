<script setup lang="ts">
defineProps({
  classment: {
    type: Object as PropType<ClubInfo[]>,
    required: true,
  },
});
</script>

<template>
  <UTable class="mt-8" :rows="classment" :columns="classmentColumns">
    <template #name-data="{ row }">
      <Ranking :number="row.ranking" />
      {{ row.name }}
    </template>
  </UTable>
</template>
