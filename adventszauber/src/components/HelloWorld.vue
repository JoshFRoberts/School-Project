<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class=" font-extrabold text-4xl">{{ msg }}</h1>
    <h3>
      You’ve successfully cloned our school project for the Talahons.
      <div class="flex flex-row gap-2">
        <p>IT22-B</p>
        +
        <p>HA24</p>
      </div>
    </h3>
  </div>
</template>