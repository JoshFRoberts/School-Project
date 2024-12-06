<template>
    <div
        class="full-bleed bg-gradient-to-br from-violet-100 via-pink-100 to-violet-100"
    >
        <!-- Added gradient background -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <!-- Text Content -->
                <div class="text-center md:text-left">
                    <h1
                        class="text-4xl md:text-5xl font-bold text-purple-900 mb-4"
                    >
                        Entdecke das Oster-Abenteuer
                    </h1>
                    <p class="text-gray-600 text-lg mb-8">
                        Tauche ein in unser spannendes 3D-gedrucktes Brettspiel,
                        das Ostern zu einem unvergesslichen Erlebnis macht!
                    </p>
                    <div class="space-x-4">
                        <button
                            class="bg-violet-400 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Jetzt Spielen
                        </button>
                        <button
                            class="bg-pink-300 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Mehr erfahren
                        </button>
                    </div>
                </div>

                <!-- Image/Slider -->
                <div class="relative">
                    <div
                        class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                    >
                        <!-- Updated background -->
                        <img
                            src="@/assets/stocklimagebrettspiel.jpg"
                            alt="Easter Board Game"
                            class="w-full h-auto rounded-lg"
                        />
                        <div
                            class="absolute -bottom-4 right-4 bg-violet-400 text-white px-4 py-2 rounded-full shadow-lg"
                        >
                            <span class="font-bold">Neu!</span>
                        </div>
                    </div>
                    <!-- Decorative elements -->
                    <div
                        class="absolute -top-4 -left-4 w-12 h-12 bg-yellow-200 rounded-full opacity-70"
                    ></div>
                    <div
                        class="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-200 rounded-full opacity-70"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
