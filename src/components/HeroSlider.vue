<template>
  <div
    class="max-w-7xl mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-16"
    :class="{ [bgStyle]: true }"
  >
    <div
      class="grid md:grid-cols-2 gap-8 items-center"
      :class="{ 'flex-row-reverse': side === 'right' }"
    >
      <!-- Text Content -->
      <div class="text-center md:text-left" v-if="side !== 'right'">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4"
          :class="{ [fontStyle]: true }"
        >
          {{ title }}
        </h1>
        <p class="text-gray-600 text-lg mb-8">
          {{ description }}
        </p>
        <slot name="buttons"></slot>
      </div>

      <!-- Image Section -->
      <div class="relative">
        <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <img
            :src="imageUrl"
            alt="alt || 'Hero Image'"
            class="w-full h-auto rounded-lg"
          />
          <div
            class="absolute -bottom-4 right-4 bg-violet-400 text-white px-4 py-2 rounded-full shadow-lg" v-if="props.isNew"
          >
            <span class="font-bold">Neu!</span>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div v-if="props.decoration">
          <div
            class="absolute -top-4 -left-4 w-12 h-12 bg-yellow-200 rounded-full opacity-70"
          ></div>
          <div
            class="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-200 rounded-full opacity-70"
          ></div>
        </div>
      </div>

      <!-- Text Content for Right Side -->
      <div class="text-center md:text-left" v-if="side === 'right'">
        <h1 class="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
          {{ title }}
        </h1>
        <p class="text-gray-600 text-lg mb-8">
          {{ description }}
        </p>
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  imageUrl: string;
  side: "left" | "right";
  styleCss: "easter" | "info" | "default";
  decoration?: boolean;
  isNew?: boolean;
}>();

const bgStyle =
  props.styleCss === "easter"
    ? "bg-gradient-to-br from-violet-100 via-pink-100 to-violet-100"
    : props.styleCss === "info"
    ? "bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100"
    : props.styleCss === "default"
    ? "bg-gradient-to-br from-gray-100 via-red-50 to-gray-100"
    : "bg-gradient-to-br from-yellow-100 via-red-100 to-yellow-100";

const fontStyle =
  props.styleCss === "easter"
    ? "text-purple-900"
    : props.styleCss === "info"
    ? "text-blue-900"
    : props.styleCss === "default"
    ? "text-gray-900"
    : "text-black";
</script>
