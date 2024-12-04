<template>
    <div class="container text-gray-800 mx-auto px-6 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Willkommen bei 3D Spiele & Deko</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-4">Unser 3D-gedrucktes Brettspiel</h2>
          <p class="mb-4">Entdecken Sie unser einzigartiges, mit modernster 3D-Drucktechnologie hergestelltes Brettspiel. Perfekt für Spieleabende mit Familie und Freunden!</p>
          <router-link to="/brettspiel" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Mehr erfahren</router-link>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-4">Osterdekoration aus dem 3D-Drucker</h2>
          <p class="mb-4">Verschönern Sie Ihr Zuhause mit unserer einzigartigen, 3D-gedruckten Osterdekoration. Jedes Stück ist ein Unikat!</p>
          <router-link to="/osterdeko" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Entdecken</router-link>
        </div>
      </div>
    </div>
  </template>