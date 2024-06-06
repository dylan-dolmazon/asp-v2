<script setup lang="ts">
const user = useCookie<User>("user");

const page = ref(1);
const search = ref("");
const usersToUpdate = ref<{ username: string; role: string }[]>([]);

const searchName = useDebounceFn((newVal) => {
  search.value = newVal;
}, 600);

const { data: users, pending, refresh } = await getUsers(page, 10, search);

const handleChange = (role: string, id: number) => {
  usersToUpdate.value.push({
    username: users.value?.data.findLast((user) => user.id === id)?.username!,
    role: role,
  });
};

const updateUsers = async () => {
  const { error } = await updateUserToAdmin(usersToUpdate.value);
  if (!error.value) {
    usersToUpdate.value = [];
    addToast(
      "Mise à jours réussi",
      ["Les utilisateurs ont été mis à jours avec succès"],
      "success"
    );
    await refresh();
  }
};
</script>

<template>
  <UInput
    icon="i-heroicons-magnifying-glass-20-solid"
    size="lg"
    color="white"
    trailing
    placeholder="Search..."
    class="w-2/6 mx-auto my-8"
    @input="(event: any) => searchName(event.target.value)"
  />
  <UTable :loading="pending" :columns="usersColumns" :rows="users?.data">
    <template #role-data="{ row }">
      <USelect
        v-model="row.role"
        :onchange="(event: any) => handleChange(event.target.value, row.id)"
        :options="[
          { value: 'user', name: 'User' },
          { value: 'admin', name: 'Administrateur' },
          { value: 'moderator', name: 'Moderateur' },
        ]"
        option-attribute="name"
        :disabled="row.id === user.id"
      />
    </template>
  </UTable>
  <div class="flex items-center justify-center gap-10 mt-5">
    <UButton
      label="Mettre à jours"
      @click="updateUsers()"
      :disabled="usersToUpdate.length === 0"
    />
    <UPagination
      v-if="users?.meta"
      v-model="page"
      :total="users.meta.total"
      :page-count="users.meta.perPage"
    />
  </div>
</template>
