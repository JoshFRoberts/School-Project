<template>
  <div class="container text-gray-800 mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">
      {{ t("welcome.header") }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">
          {{ t("welcome.ourMainProduct.header") }}
        </h2>
        <p class="mb-4">
          {{ t("welcome.ourMainProduct.info") }}
        </p>
        <router-link
          to="/brettspiel"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >{{ t("common.learnMore") }}</router-link
        >
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">
          {{ t("welcome.easter.header") }}
        </h2>
        <p class="mb-4">
          {{ t("welcome.easter.info") }}
        </p>
        <router-link
          to="/osterdeko"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >{{ t("common.discover") }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from "../lang/Translator.vue";
</script>
