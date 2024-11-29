<template>
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">3D-gedruckte Osterdekoration</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="item in dekoItems" :key="item.id" class="bg-white rounded-lg shadow-md p-6">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover mb-4 rounded">
          <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
          <p class="mb-4">{{ item.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">{{ item.price }} €</span>
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const dekoItems = ref([
    { id: 1, name: "Osterhase", description: "Niedlicher 3D-gedruckter Osterhase", price: 12.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Osterei", description: "Dekoratives 3D-gedrucktes Osterei", price: 8.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Osterkorb", description: "3D-gedruckter Osterkorb für Eier", price: 15.99, image: "/placeholder.svg?height=200&width=200" },
  ])
  </script>