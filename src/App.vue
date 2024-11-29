<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <Navigation />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/TheNavigation.vue'
import Footer from './components/Footer.vue'
</script>