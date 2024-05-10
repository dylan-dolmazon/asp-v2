<script setup lang="ts">
useHead({
  title: "Menu Administration",
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="AdminDashboard grid gap-4">
      <!-- Première colonne, deux lignes -->
      <div
        class="AdminDashboard-item"
        :onClick="() => navigateTo('/admin/results')"
      >
        <Compets />
      </div>

      <!-- Deux colonnes du milieu, une ligne -->
      <div
        class="AdminDashboard-item col-span-2"
        :onClick="() => navigateTo('/admin/buteurs')"
      >
        <ScorerRanking />
      </div>

      <!-- Dernière colonne, une ligne -->
      <div class="AdminDashboard-item" :onClick="() => navigateTo('/equipe')">
        <MyTeam />
      </div>

      <!-- Première colonne, deux lignes -->
      <div class="AdminDashboard-item row-span-2">
        Première colonne - Deux lignes
      </div>

      <div class="AdminDashboard-item">Première colonne - Deux lignes</div>

      <!-- Deux colonnes du milieu, une ligne -->
      <div class="AdminDashboard-item col-span-3">
        Deux colonnes du milieu - Une ligne
      </div>

      <!-- Dernière ligne entière -->
      <div class="AdminDashboard-item col-span-5">Dernière ligne entière</div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.AdminDashboard {
  height: calc(100vh - 170px);
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(3, auto);

  &-item {
    &:hover {
      cursor: pointer;
    }
    background-color: theme("colors.background.surface");
    border-radius: 3px;
    padding: 5px 10px;
  }
}
</style>
