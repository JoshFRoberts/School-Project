<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Navigation from "./components/TheNavigation.vue";
</script>

<template>
  <div>
    <header class="full-bleed">
      <img alt="Vue logo" class="logo" src="../src/assets/baller_los.svg" width="50" height="50" />
      <Navigation/>
    </header>

    <main class="mt-2 content-wrapper">
      <HelloWorld msg="Ostereiern" />
    </main>
  </div>
</template>

