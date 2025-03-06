<template>
  <div>
    <h3 class="text-xs flex flex-row sm:text-sm border" :class="tagStyle">
      <component
        :is="getLucideIcon(icon)"
        v-if="icon"
        class="w-5 h-5 mr-2 my-auto"
      />
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import * as lucideIcons from "lucide-vue-next";

const props = defineProps<{
  title: string;
  styleVariant?: string;
  icon?: string;
}>();

const getLucideIcon = (iconName?: string) => {
  return iconName && iconName in lucideIcons
    ? (lucideIcons as Record<string, any>)[iconName]
    : lucideIcons.HelpCircle;
};


const tagStyle = computed(() => {
  switch (props.styleVariant) {
    case "easter":
      return "bg-orange-200 dark:bg-orange-300/70 text-orange-700 dark:text-orange-800 border-orange-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "primary":
      return "bg-blue-200 dark:bg-blue-300/70 text-blue-700 dark:text-blue-800 border-blue-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "secondary":
      return "bg-gray-200 dark:bg-gray-300/70 text-gray-700 dark:text-gray-800 border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "colorful":
      return "bg-yellow-200 dark:bg-yellow-300/70 text-yellow-700 dark:text-yellow-800 border-yellow-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "water":
      return "bg-blue-200 dark:bg-blue-300/70 text-blue-700 dark:text-blue-800 border-blue-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "tealWater":
      return "bg-teal-200 dark:bg-teal-300/70 text-teal-700 dark:text-teal-800 border-teal-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "cyanWater":
      return "bg-cyan-200 dark:bg-cyan-300/70 text-cyan-700 dark:text-cyan-800 border-cyan-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    default:
      return "bg-gray-200 dark:bg-gray-300/70 text-gray-700 dark:text-gray-800 border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
  }
});
</script>
