<template>
  <div
    class="p-4 rounded-lg bg-blue-50 dark:bg-blue-800/40 border border-blue-100 dark:border-blue-800"
  >
    <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1 flex flex-row">
      <!-- Render the Icon -->
      <component
        :is="getLucideIcon(props.icon)"
        v-if="icon"
        :class="'w-5 h-5 mr-2 my-auto'"
        :aria-hidden="true"
      />
      {{ props.title }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import * as lucideIcons from "lucide-vue-next";

// Define the prop types, with icon being a key of the lucideIcons
const props = defineProps<{
  title: string;
  description: string;
  icon: keyof typeof lucideIcons;  // This defines the icon type as a key of the lucideIcons
}>();

// Function to return the Lucide icon component based on the icon name
const getLucideIcon = (iconName?: keyof typeof lucideIcons) => {
  return iconName && lucideIcons[iconName]
    ? lucideIcons[iconName]  // Return the corresponding icon component
    : lucideIcons.HelpCircle;  // Return a fallback icon if the iconName is invalid or undefined
};
</script>
