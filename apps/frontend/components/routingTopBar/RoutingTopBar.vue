<script setup lang="ts">
const user = useCookie<User>("user");
const route = useRoute();
const currentPage: PageType = pages_config.find((page) =>
  configPagePathIsSameAsTo(page.path, clearPagePathName(route.path))
) as PageType;
</script>

<template>
  <div
    class="RoutingTopBar text-primary bg-background-surface px-8 py-7 flex justify-between items-center"
  >
    <div class="w-1/2 px-4 flex justify-between items-center">
      <Typo format="normal" tag="p">
        {{ currentPage.url }}
      </Typo>
      <Typo format="normal" tag="h1" className="translate-x-1/2">
        {{ currentPage.title }}
      </Typo>
    </div>
    <div
      v-if="
        currentPage.link &&
        (currentPage.link?.linkAccessRoles.includes(user?.role) ||
          currentPage.link?.linkAccessRoles.includes('all'))
      "
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
