<template>
  <div class="Container w-full h-full">
    <div class="Container-headerComponent h-full fixed">
      <Header />
    </div>
    <div class="Container-content w-full">
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
    width: 95%;
    height: fit-content;
    margin-left: 5%;
    padding-bottom: 40px;
  }
}
</style>
