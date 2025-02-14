<template>
        <a :href="props.to" class="hover:dark:text-dark-Accent-SkyBlue hover:text-sky-700 font-bold">{{ props.text }}</a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  to: string;
  text: string;
}>();
</script>