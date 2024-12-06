<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <Navigation />
    <router-view></router-view>
    <ProductSlider/>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/TheNavigation.vue'
import ProductSlider from './components/ProductSlider.vue'
import Footer from './components/Footer.vue'
</script>