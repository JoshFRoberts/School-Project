<template>
  <div>
    <section class="relative h-screen w-full overflow-hidden">
      <!-- Background Image -->
      <img
        :src="spielbrettImg"
        alt="Klassenfoto"
        class="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-transparent"
      ></div>
      
      <!-- Content -->
      <div
        class="relative h-full flex flex-col justify-center items-center text-white px-4 sm:px-6 md:px-8 animate-fade-in"
      >
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-4 sm:mb-6">
          Schülerfirma
          <span
            class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >Baller Los</span>
        </h1>
        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-gray-200"
        >
          Innovative 3D-gedruckte Produkte von Schülern für eine nachhaltige
          Zukunft
        </p>
      </div>
      
      <!-- Wave Footer -->
      <div class="absolute bottom-0 left-0 right-0 w-full">
        <WaveDiv waveStyle="smooth" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LastWordsRecolor from "./LastWordsRecolor";
import spielbrettImg from "@/assets/images/Klassenfoto.jpg";
import WaveDiv from "./WaveDiv.vue";
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}
</style>