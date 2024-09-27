<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <header class="full-bleed">
    <img alt="Vue logo" class="logo" src="../src/assets/baller_los.svg" width="50" height="50" />
    <Navigation/>
  </header>

  <main class="mt-2 content-wrapper">
    <HelloWorld msg="Ostereiern" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    height: 8vh;
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  main {
    height: 91vh;
  }
}
</style>
