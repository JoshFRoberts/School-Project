<template>
  <div
    id="app"
    class="grid grid-rows-[1fr_auto] w-screen h-screen max-w-full transition-colors duration-300 bg-background-cream dark:bg-dark-background-cream text-text-Gray dark:text-dark-text-Gray"
  >
    <Navigation />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from "./components/TheNavigation.vue";
import Footer from "./components/Footer.vue";
</script>
