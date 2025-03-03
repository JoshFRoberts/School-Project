<template>
  <a
    :href="props.to"
    @click="scrollToTop"
    class="hover:dark:text-dark-Accent-SkyBlue hover:bg-gray-200 dark:hover:bg-gray-800 py-2 px-4 rounded-xl hover:text-sky-700 dark:hover:text-sky-500 font-bold"
    >{{ t(props.text) }}</a
  >
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { t } from "../lang/Translator.vue";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const props = defineProps<{
  to: string;
  text: string;
}>();
</script>
