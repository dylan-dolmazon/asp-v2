<script setup lang="ts">
const user = useCookie<User>("user");
const route = useRoute();

const toggleSettings = () => {
  const settings = document.querySelector(".Header-user-settings");
  settings ? settings.classList.toggle("Header-user-settings--disabled") : null;
  settings ? settings.classList.toggle("Header-user-settings--enabled") : null;
};

const logout = () => {
  const userCookie = useCookie("user");
  const tokenCookie = useCookie("token");
  userCookie.value = null;
  tokenCookie.value = null;
  navigateTo("/auth/login");
};
</script>

<template>
  <div class="Header">
    <div class="Header-navbar">
      <NuxtImg
        src="/logo.png"
        alt="logo équipe"
        width="60"
        class="Header-navbar-img"
      />
      <nav class="flex flex-col items-center">
        <ULink to="/" class="Header-navbar-item w-full">
          <UTooltip
            text="Page d'acceuil"
            class="w-full"
            :class="{
              'Header-navbar-item--active': route.path === '/',
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
        <ULink to="/results" class="Header-navbar-item w-full">
          <UTooltip
            text="Résultats et calendrier"
            class="w-full"
            :class="{
              'Header-navbar-item--active': route.path === '/results',
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
        <ULink to="/admin" class="Header-navbar-item w-full">
          <UTooltip
            text="Administration"
            class="w-full"
            :class="{
              'Header-navbar-item--active': route.path.match(/^\/admin/),
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
        <ULink to="/equipe" class="Header-navbar-item w-full">
          <UTooltip
            text="Mon équipe"
            class="w-full"
            :class="{
              'Header-navbar-item--active': route.path.match(/^\/equipe/),
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
    <div class="Header-user">
      <div v-if="user">
        <div class="Header-user-settings Header-user-settings--disabled">
          <ul>
            <li class="mb-4 hover:text-primary">
              <ULink to="/settings">Paramétres</ULink>
            </li>
            <li class="hover:text-primary">
              <ULink variant="link" :onclick="logout">Déconnexion</ULink>
            </li>
          </ul>
        </div>
        <button @click="toggleSettings">
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
            size="xl"
            class="w-20 h-20 cursor-pointer"
          />
        </button>
      </div>
      <UButton v-else variant="link" to="/auth/login" class="w-20 h-20">
        <UIcon
          name="i-heroicons-user-circle-solid"
          class="Header-user-connectIcon w-full h-full text-white"
        />
      </UButton>
    </div>
  </div>
</template>

<style>
@import "./Header.scss";
</style>
