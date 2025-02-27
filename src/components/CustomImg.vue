<template>
    <div>
      <!-- Das kleine Bild -->
      <img
        :src="src"
        alt="Thumbnail"
        class="thumbnail"
        @click="toggleModal"
      />
  
      <!-- Modal: erscheint, wenn das Bild vergrößert werden soll -->
      <div v-if="isModalOpen" class="modal z-50" @click="toggleModal">
        <img :src="src" alt="Großansicht" class="enlarged-image" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const props = defineProps<{
    src: string
  }>()
  
  const isModalOpen = ref(false)
  
  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
  }
  </script>
  
  <style scoped>
  .thumbnail {
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .thumbnail:hover {
    transform: scale(1.05);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .enlarged-image {
    max-width: 90%;
    max-height: 90%;
  }
  </style>
  