<template>
  <nav class="bg-gray-100">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <router-link to="/" class="text-xl flex flex-row font-bold text-gray-800">
        Baller los</router-link
      >
      <div class="flex space-x-4">
        <div><LangSelector /></div>
        <a href="#/" class="text-gray-800 hover:text-blue-500">Startseite</a>
        <!-- <router-link to="/brettspiel" class="text-gray-800 hover:text-blue-500">Brettspiel</router-link>
        <router-link to="/osterdeko" class="text-gray-800 hover:text-blue-500">Osterdeko</router-link> -->
        <a href="#/about" class="text-gray-800 hover:text-blue-500">Über uns</a>
      </div>
    </div>
    <div><currentView /></div>
  </nav>
</template>

<script setup lang="ts">
import Home from "../components/Home.vue";
import UeberUns from "../components/Ueberuns.vue";
import LangSelector from "../lang/LangSelector.vue";
import { computed, ref } from "vue";

const routes: { [key: string]: any } = {
  "/": Home,
  "/about": UeberUns,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || Home;
});
</script>
