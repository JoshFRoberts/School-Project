<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold text-gray-800">3D Spiele & Deko</router-link>
      <div class="flex space-x-4">
        <router-link to="/" class="text-gray-800 hover:text-blue-500">Startseite</router-link>
        <router-link to="/brettspiel" class="text-gray-800 hover:text-blue-500">Brettspiel</router-link>
        <router-link to="/osterdeko" class="text-gray-800 hover:text-blue-500">Osterdeko</router-link>
        <router-link to="/ueber-uns" class="text-gray-800 hover:text-blue-500">Über uns</router-link>
      </div>
    </div>
  </nav>
</template>