<template>
        <a :href="props.to" class="hover:dark:text-dark-Accent-SkyBlue hover:bg-gray-200 dark:hover:bg-gray-800 py-2 px-4 rounded-xl hover:text-sky-700 dark:hover:text-sky-500 font-bold">{{ props.text }}</a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  to: string;
  text: string;
}>();
</script>