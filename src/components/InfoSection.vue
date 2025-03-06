<template>
  <WaveDiv :color="useThemeColor('ffffff', '111827')" />
  <div class="bg-white dark:bg-dark-background-LightGray mb-8 -mt-16">
    <div
      class="mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-32 justify-center items-center flex flex-col"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center"
      >
        <LastWordsRecolor
          v-if="titleStyle"
          :text="title"
          :wordsToRecolor="titleStyle.wordsToRecolor"
          :styleVariant="titleStyle.styleVariant"
          :position="titleStyle.position"
        />
        <p v-else>{{ title }}</p>
      </h1>
      <p
        class="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 text-center px-4"
      >
        {{ description }}
      </p>
    </div>
    <div class="flex justify-center items-center flex-wrap gap-4 px-4 pb-8">
      <slot name="buttons"></slot>
    </div>
  </div>
  <WaveDiv :color="useThemeColor('ffffff', '111827')" rotate />
</template>

<script setup lang="ts">
import WaveDiv from "./WaveDiv.vue";
import { defineProps } from "vue";
import LastWordsRecolor from "./LastWordsRecolor.vue";
import { useThemeColor } from "./getThemeColor";

const props = defineProps<{
  title: string;
  description: string;
  titleStyle?: {
    wordsToRecolor?: number;
    wordsToHighlight?: string[];
    position?: "start" | "middle" | "end" | "custom";
    styleVariant?:
      | "easter"
      | "primary"
      | "secondary"
      | "colorful"
      | "tealWater"
      | "cyanWater"
      | "water";
  };
}>();
</script>
