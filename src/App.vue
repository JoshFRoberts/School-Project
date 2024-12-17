<template>
  <div
    id="app"
    class="grid grid-rows-[1fr_auto] w-screen h-screen max-w-full bg-gray-100"
  >
    <Navigation />
    <router-view class="overflow-auto"></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from "./components/TheNavigation.vue";
import Footer from "./components/Footer.vue";
</script>
