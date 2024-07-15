<script setup lang="ts">
const route = useRoute();
const { isLoggin, resetUserInfos } = useUserInfos();

const items = [
  [
    {
      label: "Paramétres",
      slot: "settings",
      icon: "i-heroicons-cog-8-tooth",
      click: () => navigateTo("/settings"),
    },
  ],
  [
    {
      label: "Déconnexion",
      slot: "logout",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => logout(),
    },
  ],
];

const logout = () => {
  resetUserInfos();
  navigateTo("/auth/login");
};
</script>

<template>
  <div class="User">
    <div v-if="isLoggin" class="w-fit h-fit pt-2">
      <UDropdown :items="items">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="avatar"
          size="xl"
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>
    <UButton
      v-else
      variant="link"
      :to="`/auth/login?redirect=${route.path}`"
      class="w-20 h-20"
    >
      <UIcon
        name="i-heroicons-user-circle-solid"
        class="User-connectIcon w-full h-full text-white"
      />
    </UButton>
  </div>
</template>

<style scoped lang="scss">
.User {
  display: flex;
  justify-content: center;
  border-top: 1px solid theme("colors.white");

  &-connectIcon {
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
