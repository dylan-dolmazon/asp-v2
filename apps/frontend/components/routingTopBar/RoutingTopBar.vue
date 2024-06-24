<script setup lang="ts">
const { getUserInfos } = useUserInfos();
const route = useRoute();
const currentPage: PageType = pages_config.find((page) =>
  configPagePathIsSameAsTo(page.path, clearPagePathName(route.path))
) as PageType;
</script>

<template>
  <div class="RoutingTopBar">
    <div class="RoutingTopBar-content">
      <UBreadcrumb
        divider="/"
        :links="currentPage.breadCrumb"
        class="RoutingTopBar-content-breadcrumb"
      />
      <Typo tag="h2" class="sm:translate-x-1/2">
        {{ currentPage.title }}
      </Typo>
    </div>
    <div
      v-if="
        currentPage.link &&
        currentPage.link?.linkAccessRoles.includes(getUserInfos?.role || 'all')
      "
      class="RoutingTopBar-link"
    >
      <CustomLink
        :href="currentPage.link.href"
        :typo="{ format: 'normal', tag: 'h4' }"
      >
        {{ currentPage.link.text }}
      </CustomLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./RoutingTopBar.scss";
</style>
