// ThemeColor.ts
import { reactive, watch } from 'vue';
import { isDarkMode } from './Darkmode';

export function useThemeColor(lightModeColor: string, darkModeColor: string) {
  const themeColor = reactive({ darkMode: isDarkMode.value, theme: getThemeColor() });

  // Watch für Dark Mode Änderungen
  watch(isDarkMode, (newValue) => {
    themeColor.darkMode = newValue;
    themeColor.theme = getThemeColor();
  });

  // Funktion, um die aktuelle Farbe basierend auf dem Dark Mode zu bestimmen
  function getThemeColor(): string {
    return isDarkMode.value ? darkModeColor : lightModeColor;
  }

  return themeColor.theme;
}
