<script setup lang="ts">
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);

const items = [
  {
    slot: "account",
    label: "Mon compte",
  },
  {
    slot: "users",
    label: "Utilisateurs",
  },
];
</script>
<template>
  <NuxtLayout name="default">
    <div class="Settings">
      <Account v-if="!isAdmin" />
      <UTabs :items="items" class="w-full h-full" v-else>
        <template #account="{ item }">
          <Account />
        </template>

        <template #users="{ item }">
          <Users />
        </template>
      </UTabs>
    </div>
  </NuxtLayout>
</template>
