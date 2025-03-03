<template>
  <div
    class="min-h-screen bg-background-cream dark:bg-dark-background-cream text-gray-800 dark:text-gray-200"
  >
    <!-- Header with decorative element -->
    <header class="relative py-16 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1
          class="text-4xl md:text-5xl font-bold text-center text-blue-950 dark:text-gray-100"
        >
          Impressum
        </h1>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      <div
        class="bg-background-LightGray dark:bg-dark-background-LightGray rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-300 hover:shadow-xl"
      >
        <!-- School information section -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <Building2 class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Angaben gemäß § 5 TMG
          </h2>

          <div class="pl-7 space-y-1 text-gray-700 dark:text-gray-300">
            <p class="font-medium text-lg">BBS I Lüneburg</p>
            <p>Spillbrunnenweg 1</p>
            <p>21337 Lüneburg</p>
          </div>
        </section>

        <!-- Representative section -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <UserRound class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Vertretung
          </h2>

          <div class="pl-7 space-y-1 text-gray-700 dark:text-gray-300">
            <p>Oberstudiendirektor Heiko Lüdemann</p>
          </div>
        </section>

        <!-- Data protection section -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <ShieldCheck
              class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
            />
            Datenschutz
          </h2>

          <div class="pl-7 text-gray-700 dark:text-gray-300">
            <p class="leading-relaxed">
              Sofern innerhalb dieser Homepage die Möglichkeit zur Eingabe
              persönlicher oder geschäftlicher Daten (E-Mail-Adressen, Namen,
              Anschriften) besteht, so erfolgt die Preisgabe dieser Daten
              seitens des Nutzers ausdrücklich auf freiwilliger Basis. Siehe
              unten: Datenschutzerklärung
            </p>
          </div>
        </section>

        <!-- Credits section -->
        <section>
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <Code2 class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Website & Programmierung
          </h2>

          <div class="pl-7 text-gray-700 dark:text-gray-300">
            <p>by IT22B</p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Building2,
  UserRound,
  ShieldCheck,
  Code2,
  ArrowLeft,
} from "lucide-vue-next";
</script>
