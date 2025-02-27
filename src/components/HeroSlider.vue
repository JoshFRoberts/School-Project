<template>
  <div
    class="max-w-7xl mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-16 rounded-lg"
    :class="{ [bgStyle]: true }"
  >
    <div
      class="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 items-center"
      :class="{ 'md:flex-row-reverse': side === 'right' }"
    >
      <!-- Text Content for Left Side -->
      <div
        class="text-center md:text-left flex-col hidden"
        :class="side === 'right' ? 'hidden' : 'md:flex'"
      >
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-gray-100 mb-2 sm:mb-3"
          :class="{ [fontStyle]: true }"
        >
          <LastWordsRecolor
            v-if="titleStyle"
            :text="title"
            :wordsToRecolor="10"
            :styleVariant="titleStyle"
          />
          <div v-else>{{ title }}</div>
        </h1>
        <h2
          v-if="titleDesc"
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4"
        >
          {{ titleDesc }}
        </h2>
        <p
          class="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8"
        >
          {{ description }}
        </p>
        <div
          v-if="props.tag"
          class="flex flex-row flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-6 md:mb-8"
        >
          <div v-for="tag in props.tag" :key="tag">
            <span
              :class="tagStyle"
              class="text-xs flex flex-row sm:text-sm whitespace-nowrap"
              ><component
                :is="getLucideIcon(tag.icon)"
                v-if="tag.icon"
                class="w-5 h-5 mr-2"
              />{{ tag.text }}</span
            >
          </div>
        </div>
        <div class="mt-auto">
          <slot name="buttons"></slot>
        </div>
      </div>

      <!-- Image Section -->
      <div class="relative mx-auto w-full max-w-lg lg:max-w-2xl">
        <div
          class="backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 lg:p-10 shadow-lg dark:shadow-gray-800/20 w-full"
          :class="tagStyle"
        >
          <img
            :src="imageUrl || fallbackImage"
            alt="Product image"
            class="w-full h-auto rounded-lg object-cover mx-auto"
            :aria-label="`Image for ${title}`"
            @error="onImageError"
          />
          <div
            class="absolute -bottom-3 sm:-bottom-4 right-3 sm:right-4 bg-violet-400 dark:bg-violet-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-xs sm:text-base"
            v-if="props.isNew"
          >
            <span class="font-bold">Neu!</span>
          </div>
        </div>

        <!-- Decorative Elements - Scaled for different screen sizes -->
        <div v-if="props.decoration">
          <div
            class="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 bg-yellow-200 dark:bg-yellow-300/70 rounded-full opacity-70"
          />
          <div
            class="absolute top-1/3 right-1 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 bg-green-200 dark:bg-green-300/70 rounded-full opacity-70"
          />
          <div
            class="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 w-8 sm:w-10 md:w-16 h-8 sm:h-10 md:h-16 bg-pink-200 dark:bg-pink-300/70 rounded-full opacity-70"
          />
        </div>
      </div>

      <!-- Text Content for Right Side -->
      <div
        class="text-center md:text-left flex flex-col"
        :class="side === 'left' ? 'md:hidden' : 'md:flex'"
      >
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-gray-100 mb-2 sm:mb-3"
          :class="{ [fontStyle]: true }"
        >
          <LastWordsRecolor
            v-if="titleStyle"
            :text="title"
            :wordsToRecolor="10"
            :styleVariant="titleStyle"
          />
          <div v-else>{{ title }}</div>
        </h1>
        <h2
          v-if="titleDesc"
          class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4"
        >
          {{ titleDesc }}
        </h2>
        <p
          class="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8"
        >
          {{ description }}
        </p>
        <div
          v-if="props.tag"
          class="flex flex-row flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-6 md:mb-8"
        >
          <div v-for="tag in props.tag" :key="tag">
            <span
              :class="tagStyle"
              class="text-xs flex flex-row sm:text-sm whitespace-nowrap"
              ><component
                :is="getLucideIcon(tag.icon)"
                v-if="tag.icon"
                class="w-5 h-5 mr-2"
              />{{ tag.text }}</span
            >
          </div>
        </div>
        <div class="mt-auto">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LastWordsRecolor from "./LastWordsRecolor";
import * as lucideIcons from "lucide-vue-next";

const props = defineProps<{
  title: string;
  titleStyle?: string;
  titleDesc?: string;
  description: string;
  imageUrl: string;
  side: "left" | "right";
  decoration?: boolean;
  isNew?: boolean;
  tag?: { text: string; icon?: String }[];
  imageSize?: number;
}>();

// Dynamische Auswahl des Icons
const getLucideIcon = (iconName?: string) => {
  return iconName && lucideIcons[iconName]
    ? lucideIcons[iconName]
    : lucideIcons.HelpCircle;
};
// Fallback image URL
const fallbackImage = "/path/to/fallback/image.jpg";

// Handle image errors by using fallback image
const onImageError = (event) => {
  event.target.src = fallbackImage;
};

// Background style based on title style (missing in original, added here)
const bgStyle = computed(() => {
  // Default background style
  return "bg-gray-50 dark:bg-gray-800/30";
});

// Font style based on title style (missing in original, added here)
const fontStyle = computed(() => {
  // Default font style
  return "text-gray-900 dark:text-white";
});

const tagStyle = computed(() => {
  switch (props.titleStyle) {
    case "easter":
      return "bg-orange-200 dark:bg-orange-300/70 text-orange-700 dark:text-orange-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "primary":
      return "bg-blue-200 dark:bg-blue-300/70 text-blue-700 dark:text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "secondary":
      return "bg-gray-200 dark:bg-gray-300/70 text-gray-700 dark:text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "colorful":
      return "bg-yellow-200 dark:bg-yellow-300/70 text-yellow-700 dark:text-yellow-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "water":
      return "bg-blue-200 dark:bg-blue-300/70 text-blue-700 dark:text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "tealWater":
      return "bg-teal-200 dark:bg-teal-300/70 text-teal-700 dark:text-teal-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    case "cyanWater":
      return "bg-cyan-200 dark:bg-cyan-300/70 text-cyan-700 dark:text-cyan-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
    default:
      return "bg-gray-200 dark:bg-gray-300/70 text-gray-700 dark:text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold";
  }
});
</script>
