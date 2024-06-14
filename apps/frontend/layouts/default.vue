<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div class="Container w-full h-full">
    <div class="Container-headerComponent Container-headerComponent--desktop">
      <Header />
    </div>
    <Icon
      name="mdi:forwardburger"
      width="40"
      height="40"
      class="Container-burgerIcon text-default"
      @click="isOpen = !isOpen"
    ></Icon>
    <USlideover v-model="isOpen" side="left" class="w-[85px]">
      <div class="Container-headerComponent">
        <Header />
      </div>
    </USlideover>
    <div class="Container-right">
      <RoutingTopBar />

      <div class="Container-right-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./default.scss";
</style>
