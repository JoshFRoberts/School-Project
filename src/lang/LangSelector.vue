<template>
  <div class="flex flex-row my-auto items-center h-full">
    <label
      for="languageSelect"
      class="block mb-2 text-sm font-medium text-gray-700 top-1 relative"
      >{{ t("common.lang") }}</label
    >
    <select
      id="languageSelect"
      v-model="selectedLang"
      @change="changeLanguage"
      class="block ml-2 pl-2 font-bold text-stone-500 hover:bg-black/10 w-9 h-9 bg-transparent rounded-full focus:outline-none sm:text-sm appearance-none"
    >
      <option value="DE">DE</option>
      <option value="EN">EN</option>
      <option value="FR">FR</option>
      <option value="ES">ES</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { switchLang, t, type LanguageCode } from "./Translator.vue";

const browserLanguage = navigator.language.split("-")[0];
console.log(browserLanguage);
const selectedLang = ref(browserLanguage.toUpperCase() as LanguageCode);

const changeLanguage = () => {
  switchLang(selectedLang.value as LanguageCode);
};

onMounted(() => {
  switchLang(selectedLang.value as LanguageCode);
});
</script>
