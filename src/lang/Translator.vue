<script lang="ts">
import { ref } from "vue";
import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";
import es from "./es.json";

export type LanguageCode = "DE" | "EN" | "FR" | "ES";
export enum LanguageCodeEnum {
  DE = "DE",
  EN = "EN",
  FR = "FR",
  ES = "ES",
}
export type LanguagePack = { [key: string]: string };

const languages: Record<LanguageCode, LanguagePack> = {
  DE: de,
  EN: en,
  FR: fr,
  ES: es,
};



export const currentLang = ref<LanguagePack>(de);
export const currentLangString = ref<LanguageCode>("DE");

export const switchLang = (lang: LanguageCode): void => {
  if (languages[lang]) {
    currentLang.value = languages[lang];
    currentLangString.value = lang;
  } else {
    currentLang.value = de;
    currentLangString.value = "DE";
  }
};

/**
 * Translate a path to the current language
 * @param path The path where the translation is stored
 * @returns The translated string
 */
export const t = (path: string): string => {
  const jsonObject: LanguagePack = currentLang.value;

  return jsonObject[path];
};
export default {
  setup() {
    return {
      currentLang,
      currentLangString,
      switchLang,
      t,
    };
  },
};

</script>
