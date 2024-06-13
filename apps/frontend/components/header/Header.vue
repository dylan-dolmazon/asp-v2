<script setup lang="ts"></script>

<template>
  <div class="Header h-full">
    <div class="Header-img">
      <NuxtImg
        src="/logo.png"
        alt="logo équipe"
        width="60"
        class="Header-img-logo"
      />
    </div>
    <Navbar />
    <User />
  </div>
</template>

<style>
@import "./Header.scss";
</style>
