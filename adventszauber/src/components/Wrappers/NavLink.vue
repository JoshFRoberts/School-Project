<script setup lang="ts">
defineProps([
    'link'
])
</script>

<template>
  <li>
    <a :href="link"
       target="_blank"
       class="hover:bg-th-secondary p-4 hover:shadow-2xl shadow hover:text-th-highlight underline text-th-secondary cursor-pointer rounded">
      <slot name="default">
        Linkname
      </slot>
    </a>
  </li>
</template>

<style scoped>

</style>