<template>
  <div id="products" class="relative px-4 py-8 mx-auto max-w-xs xl:max-w-7xl">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
      {{ t("products.header") }}
    </h2>
    
    <!-- Slider Container -->
    <div class="relative max-w-7xl mx-auto">
      <!-- Left Button - Responsive positioning -->
      <div class="absolute inset-y-0 left-0 -translate-x-1/2 sm:-translate-x-full flex items-center z-10 px-2">
        <button
          class="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hidden sm:flex items-center justify-center"
          @click="scrollLeft"
        >
          <svg
            class="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <!-- TODO: Need Translation -->
          <span class="sr-only">Scroll left</span>
        </button>
      </div>
      
      <!-- Right Button - Responsive positioning -->
      <div class="absolute inset-y-0 right-0 translate-x-1/2 sm:translate-x-full flex items-center z-10 px-2">
        <button
          class="h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hidden sm:flex items-center justify-center"
          @click="scrollRight"
        >
          <svg
            class="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <!-- TODO: Need Translation -->
          <span class="sr-only">Scroll right</span>
        </button>
      </div>
      
      <!-- Mobile scroll indicators -->
      <div class="flex justify-center gap-2 mt-4 sm:hidden">
        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <svg
            class="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <!-- TODO: Need Translation -->
          <span>Swipe für mehr</span>
          <svg
            class="h-4 w-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
      
      <!-- ProductCard Container - Responsive scrolling -->
      <div
        ref="containerRef"
        class="flex space-x-4 sm:space-x-6 py-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        :style="{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }"
      >
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="snap-start"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { t } from "../lang/Translator.vue";
import ProductCard from "./ProductCard.vue";
import type { Product } from "@/types";

const props = defineProps<{
  products: Product[];
}>();

const containerRef = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (containerRef.value) {
    const scrollAmount = containerRef.value.clientWidth * 0.75;
    containerRef.value.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (containerRef.value) {
    const scrollAmount = containerRef.value.clientWidth * 0.75;
    containerRef.value.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
