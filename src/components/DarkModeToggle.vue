<template>
  <button
    @click="toggleDarkMode"
    class="p-2 rounded-full transition-colors duration-300
      bg-background-cream dark:bg-dark-background-cream
      text-text-Gray dark:text-dark-text-Gray"
    :aria-label="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <MoonIcon v-if="!isDarkMode" class="text-dark-Accent-Lavender w-6 h-6" />
    <SunIcon v-else class="text-dark-Accent-SunnyYellow w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MoonIcon, SunIcon } from 'lucide-vue-next';
import { isDarkMode, toggleDarkMode, initializeDarkMode } from './Darkmode';

onMounted(() => {
  initializeDarkMode(); // Initialisiert den Dark Mode, wenn die Komponente gemountet wird
});
</script>
