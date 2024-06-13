<template>
  <div class="Container w-full h-full">
    <div class="Container-headerComponent h-full fixed">
      <Header />
    </div>
    <div class="Container-content w-full">
      <RoutingTopBar />

      <div class="m-12">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Container {
  display: flex;
  &-headerComponent {
    width: 85px;
    background-color: theme("colors.background.header");
  }
  &-content {
    width: calc(100% - 85px);
    height: fit-content;
    margin-left: 85px;
    padding-bottom: 40px;
  }
}
</style>
