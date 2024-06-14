<script setup lang="ts">
useHead({
  title: "Menu Administration",
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="AdminDashboard">
      <!-- Première colonne, deux lignes -->
      <div
        class="AdminDashboard-item"
        :onClick="() => navigateTo('/admin/results')"
      >
        <Compets />
      </div>

      <!-- Deux colonnes du milieu, une ligne -->
      <div
        class="AdminDashboard-item AdminDashboard-item--colSpan2"
        :onClick="() => navigateTo('/admin/buteurs')"
      >
        <ScorerRanking />
      </div>

      <!-- Dernière colonne, une ligne -->
      <div class="AdminDashboard-item" :onClick="() => navigateTo('/equipe')">
        <MyTeam />
      </div>

      <!-- Première colonne, deux lignes -->
      <div class="AdminDashboard-item AdminDashboard-item--rowSpan2">
        Première colonne - Deux lignes
      </div>

      <div class="AdminDashboard-item">Première colonne - Deux lignes</div>

      <!-- Deux colonnes du milieu, une ligne -->
      <div class="AdminDashboard-item AdminDashboard-item--colSpan3">
        Deux colonnes du milieu - Une ligne
      </div>

      <!-- Dernière ligne entière -->
      <div class="AdminDashboard-item AdminDashboard-item--colSpan5">
        Dernière ligne entière
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
@import "admin.scss";
</style>
