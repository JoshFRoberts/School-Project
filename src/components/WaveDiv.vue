<template>
  <div class="relative h-16 sm:h-24 md:h-32 -mt-8" :class="{ 'rotate-180': rotate }">
    <svg
      class="absolute bottom-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Smooth style -->
      <path
        v-if="waveStyle === 'smooth'"
        d="M0 96L48 90.7C96 85.3 192 74.7 288 69.3C384 64 480 64 576 69.3C672 74.7 768 85.3 864 85.3C960 85.3 1056 74.7 1152 69.3C1248 64 1344 64 1392 64L1440 64V96H0Z"
        :fill="computedColor"
      />
      <!-- Zigzag style -->
      <path
        v-else-if="waveStyle === 'zigzag'"
        d="M0 96L40 80L80 96L120 80L160 96L200 80L240 96L280 80L320 96L360 80L400 96L440 80L480 96L520 80L560 96L600 80L640 96L680 80L720 96L760 80L800 96L840 80L880 96L920 80L960 96L1000 80L1040 96L1080 80L1120 96L1160 80L1200 96L1240 80L1280 96L1320 80L1360 96L1400 80L1440 96V96H0Z"
        :fill="computedColor"
      />
      <!-- Classic style -->
      <path
        v-else-if="waveStyle === 'classic'"
        d="M0 96L60 80C120 64 240 32 360 26.7C480 21 600 43 720 58.7C840 75 960 85 1080 85.3C1200 85 1320 75 1380 69.3L1440 64V96H0Z"
        :fill="computedColor"
      />
      <!-- Sine style -->
      <path
        v-else-if="waveStyle === 'sine'"
        d="M0 64 C 120 96, 240 32, 360 64 C 480 96, 600 32, 720 64 C 840 96, 960 32, 1080 64 C 1200 96, 1320 32, 1440 64 V96 H0 Z"
        :fill="computedColor"
      />
      <!-- Curved style -->
      <path
        v-else-if="waveStyle === 'curved'"
        d="M0 96 C 150 50, 300 50, 450 96 C 600 140, 750 140, 900 96 C 1050 50, 1200 50, 1350 96 L1440 96 V96 H0Z"
        :fill="computedColor"
      />
      <!-- Fallback to classic style -->
      <path
        v-else
        d="M0 96L60 80C120 64 240 32 360 26.7C480 21 600 43 720 58.7C840 75 960 85 1080 85.3C1200 85 1320 75 1380 69.3L1440 64V96H0Z"
        :fill="computedColor"
      />
    </svg>
  </div>
  <div class="h-8 sm:h-12 md:h-16 bg-background-cream dark:bg-dark-background-cream -mt-0" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color?: string;
  rotate?: boolean;
  waveStyle?: "smooth" | "zigzag" | "classic" | "sine" | "curved";
}>();

const computedColor = computed(() => {
  // Use the provided color or default to a light color for light mode
  // and a darker color for dark mode
  if (props.color) {
    return `#${props.color}`;
  }
  return "var(--wave-color, #fafaf9)";
});

const { rotate, waveStyle } = props;
</script>

<style>
:root {
  --wave-color: #fafaf9;
}

.dark {
  --wave-color: #1f2937;
}
</style>

