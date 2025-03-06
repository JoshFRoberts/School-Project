<template>
  <header class="text-center mb-8 md:mb-16">
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
      <LastWordsRecolor
        :text="t('game.protect.header')"
        :wordsToRecolor="10"
        styleVariant="water"
      />
    </h1>
    <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400">
      {{ t("game.headline") }}
    </p>
  </header>

  <div
    class="bg-white mb-8 md:mb-16 dark:bg-dark-background-LightGray flex flex-col md:flex-row rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl"
  >
    <!-- Content-Bereich -->
    <div class="ml-0 md:ml-8 relative mt-4 md:mt-0">
      <h2 class="text-2xl md:text-4xl font-bold mb-4 flex items-center">
        <Waves class="w-6 h-6 md:w-8 md:h-8 mr-2 text-blue-600" />
        <LastWordsRecolor
          :text="t('game.name')"
          :wordsToRecolor="10"
          styleVariant="water"
        />
      </h2>
      <p class="dark:text-blue-500 text-base md:text-xl text-blue-600 italic mb-4">
        {{ t("game.tagline") }}
      </p>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t("game.protect.info") }}
      </p>

      <!-- Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div v-for="(card, index) in InfoCardValues" :key="index">
          <InfoCard
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
          />
        </div>
      </div>

      <!-- Tags und Buttons -->
      <!-- Auf kleinen Geräten wird der Block unter dem Inhalt positioniert, auf größeren Geräten (ab md) am unteren Rand des Content-Bereichs -->
      <div class="w-full mt-8 md:absolute md:bottom-8">
        <!-- Tags -->
        <div class="my-4 flex flex-wrap justify-center md:justify-start space-x-4">
          <Tag :title="t('tag.recycled')" styleVariant="primary" />
          <Tag :title="t('tag.plastic')" styleVariant="secondary" />
          <Tag :title="t('tag.klima')" styleVariant="water" />
        </div>
        <!-- Buttons -->
        <div class="flex flex-wrap justify-center md:justify-start space-x-4">
          <Btn styling="sky" :text="t('common.buy')" @click="clickTest" rounding="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from "../lang/Translator.vue";
import LastWordsRecolor from "./LastWordsRecolor.vue";
import { Waves } from "lucide-vue-next";
// import SpielbrettImg from "@/assets/images/Spielbrett.jpg";
import InfoCard from "./InfoCard.vue";
import Btn from "@/UI/Button.vue";
import Tag from "./Tag.vue";

const clickTest = () => {
  console.log("Button clicked!");
};

const InfoCardValues = [
  {
    title: t("card.learn.header"),
    description: t("card.learn.info"),
    icon: "BookMarked",
  },
  {
    title: t("card.nature.header"),
    description: t("card.nature.info"),
    icon: "TreePine",
  },
  {
    title: t("card.design.header"),
    description: t("card.design.info"),
    icon: "Printer",
  },
  {
    title: t("card.family.header"),
    description: t("card.family.info"),
    icon: "Users",
  },
];
</script>
