<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-dark-background-cream text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <div class="container mx-auto px-4 py-16">
      <!-- Header -->
      <header class="text-center mb-16">
        <h1 class="text-6xl font-extrabold tracking-tight mb-4">
          <span
            class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Spielregeln
          </span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Tauche ein in das Abenteuer – und entdecke die Regeln des Spiels!
        </p>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Spielinformationen -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center"
          >
            <InfoIcon class="w-6 h-6 mr-2" />
            Spielinformationen
          </h2>
          <ul class="space-y-3 text-gray-700 dark:text-gray-300">
            <li class="flex items-center">
              <DicesIcon
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />
              <span class="font-medium">Spieleranzahl:</span> 2 bis 6 Spieler
            </li>
            <li class="flex items-center">
              <UsersIcon class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400" />
              <span class="font-medium">Alter:</span> 12 bis 99 Jahre
            </li>
            <li class="flex items-center">
              <ClockIcon
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />
              <span class="font-medium">Spieldauer:</span> 10 bis 15 Minuten
            </li>
          </ul>
        </div>

        <!-- Spielmaterialien -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center"
          >
            <PackageIcon class="w-6 h-6 mr-2" />
            Spielmaterialien
          </h2>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li class="flex items-center">
              <MapIcon
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />Spielbrett mit Feldern (Fragefelder, Ereignisfelder)
            </li>
            <li class="flex items-center">
              <WalletCardsIcon
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />Spielfiguren für jeden Spieler
            </li>
            <li class="flex items-center">
              <MessageCircleQuestion
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />Fragen- und Ereigniskarten
            </li>
            <li class="flex items-center">
              <DicesIcon
                class="w-5 h-5 mr-2 text-pink-600 dark:text-pink-400"
              />Würfel
            </li>
          </ul>
        </div>

        <!-- Spielvorbereitung -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center"
          >
            <SettingsIcon class="w-6 h-6 mr-2" />
            Spielvorbereitung
          </h2>
          <ol
            class="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300"
          >
            <li>
              Die Spieler wählen eine Spielfigur und stellen sie auf das
              Startfeld.
            </li>
            <li>
              Die Karten für Fragen und Ereignisse werden gemischt und
              bereitgelegt.
            </li>
          </ol>
        </div>

        <!-- Spielablauf -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center"
          >
            <PlayIcon class="w-6 h-6 mr-2" />
            Spielablauf
          </h2>
          <ul class="space-y-4 text-gray-700 dark:text-gray-300">
            <li class="flex items-start">
              <ArrowRightCircleIcon
                class="w-5 h-5 mr-2 mt-1 text-pink-600 dark:text-pink-400 flex-shrink-0"
              />
              <span
                >Die Spieler würfeln reihum und ziehen entsprechend der
                Augenzahl.</span
              >
            </li>
            <li class="flex items-start">
              <HelpCircleIcon
                class="w-5 h-5 mr-2 mt-1 text-pink-600 dark:text-pink-400 flex-shrink-0"
              />
              <span
                ><span class="font-medium">Fragefelder:</span> Bei richtiger
                Antwort vorziehen, bei falscher zurück.</span
              >
            </li>
            <li class="flex items-start">
              <ZapIcon
                class="w-5 h-5 mr-2 mt-1 text-pink-600 dark:text-pink-400 flex-shrink-0"
              />
              <span
                ><span class="font-medium">Ereignisfelder:</span> Aufgaben
                erfüllen – Erfolg bringt Fortschritt, Misserfolg
                Rückschritt.</span
              >
            </li>
            <li class="flex items-start">
              <FlagIcon
                class="w-5 h-5 mr-2 mt-1 text-pink-600 dark:text-pink-400 flex-shrink-0"
              />
              <span
                >Das Spiel endet, wenn ein Spieler das letzte Feld
                erreicht.</span
              >
            </li>
          </ul>
        </div>

        <!-- Spielziel -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
        >
          <h2
            class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center"
          >
            <TargetIcon class="w-6 h-6 mr-2" />
            Ziel des Spiels
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            Der Spieler, der zuerst das letzte Feld erreicht, gewinnt das Spiel
            – ein wahrer Meisterstratege!
          </p>
        </div>
      </div>

      <!-- Abschluss -->
      <div class="text-center mt-16">
        <h2 class="text-4xl font-extrabold">
          <span
            class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          >
            Viel Spaß beim Spielen!
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  InfoIcon,
  DicesIcon,
  UsersIcon,
  ClockIcon,
  PackageIcon,
  SettingsIcon,
  PlayIcon,
  ArrowRightCircleIcon,
  HelpCircleIcon,
  ZapIcon,
  FlagIcon,
  TargetIcon,
  ArrowUpIcon,
  SunIcon,
  MoonIcon,
  MapIcon,
  WalletCardsIcon,
  MessageCircleQuestion,
} from "lucide-vue-next";
</script>
