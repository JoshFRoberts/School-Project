<template>
    <div
      className="p-4 rounded-lg bg-blue-50 dark:bg-blue-800/40 border border-blue-100 dark:border-blue-800"
    >

      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 flex flex-row">
        <component :is="getLucideIcon(icon)" v-if="icon" class="w-5 h-5 mr-2 my-auto" /> {{ title }}
      </h3>
      <p className="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
</template>

<script setup lang="ts">
import { definedProps } from "vue";
import * as lucideIcons from "lucide-vue-next";

const props = defineProps<{
  title: string;
  description: string;
  icon: string;
}>();

const getLucideIcon = (iconName?: string) => {
  return iconName && lucideIcons[iconName]
    ? lucideIcons[iconName]
    : lucideIcons.HelpCircle;
};
</script>
