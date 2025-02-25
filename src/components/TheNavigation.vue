<template>
  <div>
    <div
      v-if="!isScrolled && !isHovered && isHomePage"
      class="fixed w-full top-0 left-0 right-0 h-16 z-50"
      v-on:mouseenter="setIsScrolled(true)"
    />
    <nav
      v-if="isHomePage"
      v-on:mouseleave="isHovered === true && setIsScrolled(false)"
      class="fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300"
      :class="[
        isScrolled
          ? 'bg-background-LightGray dark:bg-dark-background-LightGray shadow-lg opacity-100 translate-y-0'
          : 'bg-transparent opacity-0 translate-y-[-100%]',
      ]"
    >
      <div
        class="mx-auto px-2 sm:px-8 md:px-12 flex justify-between items-center h-full"
      >
        <a href="#/" class="text-xl  flex items-center font-bold">
          <img
            class="aspect-square h-12 md:h-16 mr-2 dark:hidden"
            src="../assets/baller_los_small_no-bg.png"
            alt="Page Logo"
          />
          <img
            class="aspect-square h-12 md:h-16 mr-2 hidden dark:block"
            src="../assets/baller_los_small.png"
            alt="Page Logo"
          />
          <span class="hidden sm:inline">Baller los</span>
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-4">
          <Link to="#/" text="Startseite" />
          <Link to="#/products" text="Produkte" />
          <Link to="#/game" text="Brettspiel" />
          <Link to="#/rules" text="Regeln" />
          <Link to="#/about" text="Über uns" />
        </div>
        
        <div class="flex items-center space-x-4 mr-24">
          <dark-mode-toggle />
          <LangSelector />
          
          <!-- Burger Menu Button -->
          <button 
            class="md:hidden focus:outline-none" 
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <svg 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-background-LightGray dark:bg-dark-background-LightGray shadow-lg"
      >
        <div class="px-4 pt-2 pb-3 space-y-1">
          <a 
            href="#/" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Startseite
          </a>
          <a 
            href="#/products" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Produkte
          </a>
          <a 
            href="#/game" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Brettspiel
          </a>
          <a 
            href="#/rules" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Regeln
          </a>
          <a 
            href="#/about" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Über uns
          </a>
        </div>
      </div>
    </nav>

    <!-- Non-homepage always visible header -->
    <nav
      v-else
      class="fixed top-0 left-0 right-0 h-16 z-50 bg-background-LightGray dark:bg-dark-background-LightGray shadow-lg"
    >
      <div
        class="container mx-auto px-6 sm:px-8 md:px-12 flex justify-between items-center h-full"
      >
        <a href="#/" class="text-xl flex items-center font-bold">
          <img
            class="aspect-square h-12 md:h-16 mr-2 dark:hidden"
            src="../assets/baller_los_small_no-bg.png"
            alt="Page Logo"
          />
          <img
            class="aspect-square h-12 md:h-16 mr-2 hidden dark:block"
            src="../assets/baller_los_small.png"
            alt="Page Logo"
          />
          <span class="hidden sm:inline">Baller los</span>
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-4">
          <Link to="#/" text="Startseite" />
          <Link to="#/products" text="Produkte" />
          <Link to="#/game" text="Brettspiel" />
          <Link to="#/rules" text="Regeln" />
          <Link to="#/about" text="Über uns" />
        </div>
        
        <div class="flex items-center space-x-4">
          <dark-mode-toggle />
          <LangSelector />
          
          <!-- Burger Menu Button -->
          <button 
            class="md:hidden focus:outline-none" 
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <svg 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-background-LightGray dark:bg-dark-background-LightGray shadow-lg"
      >
        <div class="px-4 pt-2 pb-3 space-y-1">
          <a 
            href="#/" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Startseite
          </a>
          <a 
            href="#/products" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Produkte
          </a>
          <a 
            href="#/game" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Brettspiel
          </a>
          <a 
            href="#/rules" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Regeln
          </a>
          <a 
            href="#/about" 
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-background-cream dark:hover:bg-dark-background-cream"
            @click="closeMobileMenu"
          >
            Über uns
          </a>
        </div>
      </div>
    </nav>

    <!-- Spacer to prevent content from being hidden behind fixed header -->
    <div class="h-16"></div>
    <div
      class="bg-background-cream dark:bg-dark-background-cream"
      :class="isHomePage ? '-mt-16' : ''"
    >
      <currentView />
    </div>
  </div>
</template>


<script setup lang="ts">
import Home from "../components/Home.vue";
import UeberUns from "../components/Ueberuns.vue";
import Rules from "../components/Rules.vue";
import LangSelector from "../lang/LangSelector.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import Link from "@/UI/Link.vue";
import ProductsPage from "@/components/ProductsPage.vue";

const routes: { [key: string]: any } = {
  "/": Home,
  "/about": UeberUns,
  "/products": ProductsPage,
  "/game": UeberUns,
  "/rules": Rules,
};

const currentPath = ref(window.location.hash);
const isMobileMenuOpen = ref(false);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || Home;
});

// Scroll state (not at top)
const isScrolled = ref(false);
const isHovered = ref(false);
const isHomePage = computed(
  () => currentPath.value === "#" || currentPath.value === "#/"
);

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const setIsScrolled = (value: boolean) => {
  isScrolled.value = value;
  isHovered.value = value;
};

const updateScrollState = () => {
  if (isHomePage.value) {
    isScrolled.value = window.scrollY > 100;
  }
};

// Close mobile menu on resize to desktop view
const handleResize = () => {
  if (window.innerWidth >= 768) { // md breakpoint
    isMobileMenuOpen.value = false;
  }
};

// Close mobile menu when changing routes
watch(currentPath, () => {
  isMobileMenuOpen.value = false;
});

onMounted(() => {
  window.addEventListener("scroll", updateScrollState);
  window.addEventListener("resize", handleResize);
  updateScrollState(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", handleResize);
});
</script>