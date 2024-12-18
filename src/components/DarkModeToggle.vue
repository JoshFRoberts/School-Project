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
import { ref, onMounted, onUnmounted } from 'vue'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
}

const updateDarkMode = () => {
  const root = document.documentElement
  if (isDarkMode.value) {
    root.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

onMounted(() => {
  // Check local storage or system preference
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDarkMode.value = savedMode === 'true'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  updateDarkMode()
})
</script>