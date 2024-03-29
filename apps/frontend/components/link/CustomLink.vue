<script setup lang="ts">
defineProps<{
  href?: string;
  target?: string;
  variant?: string;
  typo: { format: TypoFormat; tag: TypoTag };
}>();
</script>

<template>
  <div class="Link" :class="[`Link--${variant}`]">
    <a
      :href="href"
      :disbaled="!href"
      class="Link--content"
      :class="{ 'Link--underline': href, 'Link--disabled': !href }"
      :target="target"
    >
      <span>
        <Typo :format="typo.format" :tag="typo.tag">
          <slot />
        </Typo>
      </span>
      <svg viewBox="0 0 13 20">
        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
      </svg>
    </a>
  </div>
</template>

<style scoped>
@import "./CustomLink.scss";
</style>
