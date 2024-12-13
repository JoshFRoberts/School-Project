<template>
  <div
    id="app"
    class="grid grid-rows-[1fr_auto] w-screen h-screen max-w-full overflow-hidden
    transition-colors duration-300
    bg-background-cream dark:bg-dark-background-cream
    text-text-Gray dark:text-dark-text-Gray
    accent-Accent-SunnyYellow dark:accent-dark-Accent-SunnyYellow
    selection:bg-Accent-Lavender dark:selection:bg-dark-Accent-Lavender
    border-primary-SpringPurple dark:border-dark-primary-SpringPurple">
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
