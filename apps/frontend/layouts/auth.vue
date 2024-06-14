<script setup lang="ts">
useHead({
  title: "Authentification",
});
</script>

<template>
  <main class="Auth">
    <NuxtLink class="mb-6 p-2 bg-background-header rounded-2xl" to="/">
      <NuxtImg src="/logo.png" alt="logo équipe" width="80" />
    </NuxtLink>
    <slot />
  </main>
</template>

<style lang="scss">
.Auth {
  background-color: theme("colors.default.DEFAULT");
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: theme("colors.black");
  padding: 0 40px;

  .Form {
    width: 100%;
    padding: 40px;
    background-color: theme("colors.background.DEFAULT");
    border-radius: 30px;

    @screen sm {
      width: fit-content;

      &-content {
        width: 350px;
      }
    }
  }
}
</style>
