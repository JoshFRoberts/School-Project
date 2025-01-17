<template>
  <div class="flex flex-row">
    <label
      for="languageSelect"
      class="text-sm font-medium text-gray-700 top-1 relative"
    >{{ t("common.lang") }}</label>
    <CustomSelect
      id="languageSelect"
      v-model="selectedLang"
      :options="languageOptions"
      @update:modelValue="changeLanguage"
      class="ml-2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { switchLang, t, type LanguageCode } from "./Translator.vue";
import CustomSelect from './CustomSelect.vue';

const browserLanguage = navigator.language.split("-")[0];
const selectedLang = ref(browserLanguage.toUpperCase() as LanguageCode);

const validLanguages = ["de", "en", "fr", "es"];
const langRegex = new RegExp(`\/(${validLanguages.join("|")})\/`);
const currentUrl = window.location.href.toLowerCase();
const newLang = ref(selectedLang.value);

// Language options for the CustomSelect component
const languageOptions = computed(() => [
  { value: 'DE', svg: 'flag.germany' },
  { value: 'EN', svg: 'flag.england' },
  { value: 'FR', svg: 'flag.france' },
  { value: 'ES', svg: 'flag.spain' },
]);

// If the URL doesn't contain the language, add it
if (!langRegex.test(currentUrl)) {
  window.location.href = `/${selectedLang.value.toLowerCase()}/`;
}

for (let i = 0; i < validLanguages.length; i++) {
  const regex = new RegExp(`(^|[/\\-])${validLanguages[i]}([/\\-]|$)`);
  // If the URL contains the language, set the language from the URL
  if (regex.test(currentUrl)) {
    switchLang(validLanguages[i].toUpperCase() as LanguageCode);
    selectedLang.value = validLanguages[i].toUpperCase() as LanguageCode;
    newLang.value = selectedLang.value;
    const newUrl = currentUrl.replace(
      langRegex,
      `/${newLang.value.toLowerCase()}/`
    );
    window.history.replaceState({}, "", newUrl);
    break;
  }
  // If the URL doesn't contain the language, set the browser language
  else {
    switchLang(selectedLang.value as LanguageCode);
    selectedLang.value = browserLanguage.toUpperCase() as LanguageCode;
  }
}

/**
 * Change the language of the page
 */
const changeLanguage = (lang: string) => {
  const languageCode = lang as LanguageCode;
  selectedLang.value = languageCode;
  switchLang(languageCode);
  newLang.value = languageCode;

  const newUrl = currentUrl.replace(
    langRegex,
    `/${newLang.value.toLowerCase()}/`
  );
  // Change URL without page reload
  window.history.replaceState({}, "", newUrl);
};
</script>

