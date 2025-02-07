<template>
  <div>
    <nav
      class="realtive transition-colors h-16 duration-300 bg-background-LightGray dark:bg-dark-background-LightGray text-text-Gray dark:text-dark-text-Gray"
    >
      <div class="container mx-auto px-6 flex justify-between items-center">
        <a href="#/" class="text-xl items-center flex flex-row font-bold">
          <img
            class="aspect-square h-16 mr-2 dark:hidden"
            src="../assets/baller_los_small_no-bg.png"
            alt="Page Logo"
          />
          <img
            class="aspect-square w-16 mr-2 hidden dark:block"
            src="../assets/baller_los_small.png"
            alt="Page Logo"
          />
          <!-- <BallerLos /> -->
          Baller los
        </a>
        <div class="flex flex-row space-x-4">
          <Link to="#/" text="Startseite" />
          <Link to="#/products" text="Produkte" />
          <Link to="#/game" text="Brettspiel" />
          <Link to="#/rules" text="Regeln" />
          <Link to="#/about" text="Über uns" />
        </div>
        <div class="flex space-x-4 items-center">
          <dark-mode-toggle />
          <LangSelector />
        </div>
      </div>
    </nav>
    <div class="bg-background-cream dark:bg-dark-background-cream">
      <currentView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Home from "../components/Home.vue";
import UeberUns from "../components/Ueberuns.vue";
import Rules from "../components/Rules.vue";
import LangSelector from "../lang/LangSelector.vue";
import { computed, ref } from "vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import Link from "@/UI/Link.vue";
import BallerLos from "@/assets/baller_los.svg";
import ProductsPage from "@/components/ProductsPage.vue";

const routes: { [key: string]: any } = {
  "/": Home,
  "/about": UeberUns,
  "/products": ProductsPage,
  "/game": UeberUns,
  "/rules": Rules,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || Home;
});
</script>
