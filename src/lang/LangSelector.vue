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
import { ref } from "vue";
import { switchLang, t, type LanguageCode } from "./Translator.vue";

const browserLanguage = navigator.language.split("-")[0];
const selectedLang = ref(browserLanguage.toUpperCase() as LanguageCode);

const validLanguages = ["de", "en", "fr", "es"];
const langRegex = new RegExp(`\/(${validLanguages.join("|")})\/`);
const currentUrl = window.location.href.toLowerCase();
const newLang = ref(selectedLang.value);

// Wenn die URL nicht die Sprache enthält, füge sie hinzu
if (!langRegex.test(currentUrl)) {
  window.location.href = `/${selectedLang.value.toLowerCase()}/`;
}
for (let i = 0; i < validLanguages.length; i++) {
  const regex = new RegExp(`(^|[/\\-])${validLanguages[i]}([/\\-]|$)`);
  // Wenn die URL die Sprache enthält, setze die Sprache der URL
  if (regex.test(currentUrl)) {
    switchLang(validLanguages[i].toUpperCase() as LanguageCode);
    selectedLang.value = validLanguages[i].toUpperCase() as LanguageCode;
    const newUrl = currentUrl.replace(
      langRegex,
      `/${newLang.value.toLowerCase()}/`
    );
    window.history.replaceState({}, "", newUrl);
    break;
  }
  // Wenn die URL die Sprache nicht enthält, setze die Sprache des Browsers
  else {
    switchLang(selectedLang.value as LanguageCode);
    selectedLang.value = browserLanguage.toUpperCase() as LanguageCode;
  }
}
/**
 * Change the language of the page
 */
const changeLanguage = () => {
  switchLang(selectedLang.value as LanguageCode);
  newLang.value = selectedLang.value;

  const newUrl = currentUrl.replace(
    langRegex,
    `/${newLang.value.toLowerCase()}/`
  );
  // Ändere URL ohne Seitenneuladen
  window.history.replaceState({}, "", newUrl);
};
</script>
