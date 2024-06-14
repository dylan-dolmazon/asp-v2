<script setup lang="ts">
const user = useCookie<User>("user");

const toggleSettings = () => {
  const settings = document.querySelector(".User-settings");
  settings ? settings.classList.toggle("User-settings--disabled") : null;
  settings ? settings.classList.toggle("User-settings--enabled") : null;
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
  <div class="User">
    <div v-if="user">
      <div class="User-settings User-settings--disabled">
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
        class="User-connectIcon w-full h-full text-white"
      />
    </UButton>
  </div>
</template>

<style scoped>
@import "./User.scss";
</style>
