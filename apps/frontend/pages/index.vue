<script setup lang="ts">
import { getEntries } from "../services/getEntries";

const { pending: isLoading, data: posts, refresh } = await getEntries();
</script>

<template>
  <div class="style">
    <div class="style-sub mb-10">
      <MyComponent />
      <SecondComponent />
      <UButton @click="refresh">Refresh</UButton>
      <p v-if="isLoading">Loading...</p>
    </div>
    <div>
      <p v-for="post in posts?.entries" :key="post.Description">
        {{ post.Description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.style {
  .style-sub {
    margin-top: 10px;
  }
}
</style>
