<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="Navbar">
    <nav>
      <ULink to="/" class="Navbar-item w-full">
        <UTooltip
          text="Page d'acceuil"
          class="w-full"
          :class="{
            'Navbar-item--active': route.path === '/',
          }"
        >
          <UButton
            icon="i-heroicons-home-solid"
            size="xl"
            variant="link"
            class="w-12 m-auto"
            :class="{
              'text-primary': route.path === '/',
              'text-white': route.path !== '/',
            }"
          />
        </UTooltip>
      </ULink>
      <ULink to="/results" class="Navbar-item w-full">
        <UTooltip
          text="Résultats et calendrier"
          class="w-full"
          :class="{
            'Navbar-item--active': route.path === '/results',
          }"
        >
          <UButton
            variant="link"
            icon="i-heroicons-calendar-solid"
            size="xl"
            class="w-12 m-auto"
            :class="{
              'text-primary': route.path === '/results',
              'text-white': route.path !== '/results',
            }"
          />
        </UTooltip>
      </ULink>
      <ULink to="/admin" class="Navbar-item w-full">
        <UTooltip
          text="Administration"
          class="w-full"
          :class="{
            'Navbar-item--active': route.path.match(/^\/admin/),
          }"
        >
          <UButton
            variant="link"
            icon="i-heroicons-cog-6-tooth-16-solid"
            size="xl"
            class="w-12 m-auto"
            :class="{
              'text-primary': route.path.match(/^\/admin/),
              'text-white': !route.path.match(/^\/admin/),
            }"
          />
        </UTooltip>
      </ULink>
      <ULink to="/equipe" class="Navbar-item w-full">
        <UTooltip
          text="Mon équipe"
          class="w-full"
          :class="{
            'Navbar-item--active': route.path.match(/^\/equipe/),
          }"
        >
          <UButton
            variant="link"
            icon="i-heroicons-user-group-solid"
            size="xl"
            class="w-12 m-auto"
            :class="{
              'text-primary': route.path.match(/^\/equipe/),
              'text-white': !route.path.match(/^\/equipe/),
            }"
          />
        </UTooltip>
      </ULink>
    </nav>
  </div>
</template>

<style scoped>
@import "./Navbar.scss";
</style>
