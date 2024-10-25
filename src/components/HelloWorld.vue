<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="font-extrabold text-th-secondary hover:text-th-highlight text-4xl">{{ msg }}</h1>
    <h3 class="text-th-secondary hover:text-th-highlight">
      You’ve successfully cloned our school project for the Talahons.
      <div class="flex flex-row gap-2">
        <p class="text-th-secondary hover:text-th-highlight">IT22-B</p>
        +
        <p class="text-th-secondary hover:text-th-highlight">HA24</p>
      </div>
    </h3>
  </div>
</template>