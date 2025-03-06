<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  clickling: {
    type: Function,
    required: true,
  },
  /**
   * @values primary-purple, primary-pink, primary-green, accent-yellow, accent-blue, accent-lavender
   */
  styling: {
    type: String,
    required: true,
    validator(value: string) {
      // Wenn nur bestimmte Strings erlaubt sind, können Sie eine Validierung hinzufügen
      const allowedStyles = [
        "deepWater",
        "easter",
        "cyanWater",
        "sky",
        "secondary",
      ];
      return allowedStyles.includes(value);
    },
  },
  rounding: {
    type: String,
    default: "",
  },
});

import { computed } from "vue";

const roundingSize = computed(() => {
  switch (props.rounding) {
    case "xl":
      return "rounded-xl";
    case "m":
      return "rounded-md";
    case "s":
      return "rounded-sm";
    default:
      return "rounded-md";
  }
});

const colorName = computed(() => {
  switch (props.styling) {
    case "spring":
      return "w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "easter":
      return "w-full bg-pink-400 dark:bg-pink-500 hover:bg-pink-500 dark:hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "mint":
      return "w-full bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "sunny":
      return "w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "sky":
      return "w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "lavender":
      return "w-full bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "secondary":
      return "w-full bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-600 text-black font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "water":
      return "w-full bg-cyan-400 dark:bg-cyan-500 hover:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    case "deepWater":
      return "w-full bg-cyan-700 dark:bg-cyan-800 hover:bg-cyan-950 dark:hover:bg-cyan-1000 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
    default:
      return "w-full bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center";
  }
});

const handleClick = () => {
  props.clickling();
};
</script>

<template>
  <button
    @click="handleClick"
    class="px-6 py-3 font-semibold transition-transform transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md"
    :class="[roundingSize, colorName]"
  >
    {{ props.text }}
  </button>
</template>
