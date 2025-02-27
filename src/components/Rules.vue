<template>
  <div
    class="min-h-screen mb-16 bg-gray-50 dark:bg-dark-background-cream text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >

    <div class="container mx-auto px-4 py-16">
      <MaximalSechsSection /> 
      <!-- Header -->
      <header class="text-center mb-16">
        <h1 class="text-6xl font-extrabold tracking-tight mb-4">
          <LastWordsRecolor
            :text="t('rules.header')"
            :wordsToRecolor="10"
            styleVariant="water"
          />
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          {{ t("rules.header.info") }}
        </p>
      </header>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Spielinformationen -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <InfoIcon class="w-6 h-6 mr-2 text-blue-600" />
            <LastWordsRecolor
              :text="t('rules.info.header')"
              :wordsToRecolor="10"
              styleVariant="water"
            />
          </h2>
          <ul class="space-y-3 text-gray-700 dark:text-gray-300">
            <li class="flex items-center">
              <DicesIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />
              <span class="font-medium"
                >{{ t("rules.info.player.header") }}:</span
              >
              {{ t("rules.info.player") }}
            </li>
            <li class="flex items-center">
              <UsersIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />
              <span class="font-medium">{{ t("rules.info.age.header") }}:</span>
              {{ t("rules.info.age") }}
            </li>
            <li class="flex items-center">
              <ClockIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />
              <span class="font-medium"
                >{{ t("rules.info.duration.header") }}:</span
              >
              {{ t("rules.info.duration") }}
            </li>
          </ul>
        </div>

        <!-- Spielmaterialien -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <PackageIcon class="w-6 h-6 mr-2 text-blue-600" />
            <LastWordsRecolor
              :text="t('rules.material.header')"
              :wordsToRecolor="10"
              styleVariant="water"
            />
          </h2>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li class="flex items-center">
              <MapIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />{{ t("rules.material.board") }}
            </li>
            <li class="flex items-center">
              <WalletCardsIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />{{ t("rules.material.pieces") }}
            </li>
            <li class="flex items-center">
              <MessageCircleQuestion
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />{{ t("rules.material.cards") }}
            </li>
            <li class="flex items-center">
              <DicesIcon
                class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              />{{ t("rules.material.dice") }}
            </li>
          </ul>
        </div>

        <!-- Spielvorbereitung -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <SettingsIcon class="w-6 h-6 mr-2 text-blue-600" />
            <LastWordsRecolor
              :text="t('rules.preparation.header')"
              :wordsToRecolor="10"
              styleVariant="water"
            />
          </h2>
          <ol
            class="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300"
          >
            <li>
              {{ t("rules.preparation.pieces") }}
            </li>
            <li>
              {{ t("rules.preparation.cards") }}
            </li>
          </ol>
        </div>

        <!-- Spielablauf -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <PlayIcon class="w-6 h-6 mr-2 text-blue-600" />
            <LastWordsRecolor
              :text="t('rules.gameplay.header')"
              :wordsToRecolor="10"
              styleVariant="water"
            />
          </h2>
          <ul class="space-y-4 text-gray-700 dark:text-gray-300">
            <li class="flex items-start">
              <ArrowRightCircleIcon
                class="w-5 h-5 mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <span>{{ t("rules.gameplay.move") }}</span>
            </li>
            <li class="flex items-start">
              <HelpCircleIcon
                class="w-5 h-5 mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <span class="font-medium">{{
                t("rules.gameplay.questioncard")
              }}</span>
            </li>
            <li class="flex items-start">
              <ZapIcon
                class="w-5 h-5 mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <span>{{ t("rules.gameplay.eventcard") }}</span>
            </li>
            <li class="flex items-start">
              <FlagIcon
                class="w-5 h-5 mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <span>{{ t("rules.gameplay.win") }}</span>
            </li>
          </ul>
        </div>

        <!-- Spielziel -->
        <div
          class="bg-white dark:bg-dark-background-LightGray rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <TargetIcon class="w-6 h-6 mr-2 text-blue-600" />
            <LastWordsRecolor
              :text="t('rules.goal.header')"
              :wordsToRecolor="10"
              styleVariant="water"
            />
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t("rules.goal") }}
          </p>
        </div>
      </div>

      <!-- Abschluss -->
      <div class="text-center mt-16">
        <h2 class="text-4xl font-extrabold">
          <LastWordsRecolor
          :text="t('rules.footer')"
          :wordsToRecolor="10"
          styleVariant="colorful"
        />
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { t } from "../lang/Translator.vue";
import LastWordsRecolor from "./LastWordsRecolor";
import MaximalSechsSection from "./MaximalSechsSection.vue";
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
