<template>
  <nav class="transition-colors duration-300 bg-background-LightGray dark:bg-dark-background-LightGray text-text-Gray dark:text-dark-text-Gray">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <a href="#/" class="text-xl items-center flex flex-row font-bold">
        <img class="aspect-square h-16 mr-2" src="../assets/baller_los_small.png" alt="Page Logo">
        Baller los
      </a>
      <div class="flex space-x-4 items-center">
        <dark-mode-toggle />
        <LangSelector />
        <a href="#/" class="hover:text-dark-Accent-SkyBlue ">Startseite</a>
        <!-- <router-link to="/brettspiel" class="text-gray-800 hover:text-blue-500">Brettspiel</router-link>
        <router-link to="/osterdeko" class="text-gray-800 hover:text-blue-500">Osterdeko</router-link> -->
        <a href="#/about" class="hover:text-dark-Accent-SkyBlue">Über uns</a>
      </div>
    </div>
  </nav>
  <div class="bg-background-cream dark:bg-dark-background-cream">
    <currentView />
  </div>
</template>

<script setup lang="ts">
import Home from "../components/Home.vue";
import UeberUns from "../components/Ueberuns.vue";
import LangSelector from "../lang/LangSelector.vue";
import { computed, ref } from "vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";


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

