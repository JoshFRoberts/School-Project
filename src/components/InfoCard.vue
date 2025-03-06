<template>
  <div
    class="p-4 rounded-lg bg-blue-50 dark:bg-blue-800/40 border border-blue-100 dark:border-blue-800"
  >
    <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-1 flex flex-row">
      <component :is="getLucideIcon(icon)" v-if="icon" class="w-5 h-5 mr-2 my-auto" /> {{ title }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import * as lucideIcons from "lucide-vue-next";

// Definiere den Prop-Typ für das icon als Schlüssel der lucideIcons
const props = defineProps<{
  title: string;
  description: string;
  icon: keyof typeof lucideIcons;  // Hier definieren wir den Typ
}>();

// Funktion, die den Icon-Namen verwendet und das passende Icon zurückgibt
const getLucideIcon = (iconName?: keyof typeof lucideIcons) => {
  return iconName && lucideIcons[iconName]
    ? lucideIcons[iconName]
    : lucideIcons.HelpCircle;  // Fallback-Icon
};
</script>
