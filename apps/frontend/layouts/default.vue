<template>
  <div class="Container w-full h-full">
    <div class="Container-headerComponent h-full">
      <Header />
    </div>
    <div class="Container-content h-full w-full">
      <RoutingTopBar />
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.Container {
  display: flex;
  &-headerComponent {
    width: 5%;
    background-color: theme("colors.background.header");
  }
  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>
