// DarkMode.ts
import { ref } from 'vue';

export const isDarkMode = ref(false);

// Funktion zum Umschalten des Dark Modes
export const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  updateDarkMode();
};

// Funktion, um den Dark Mode zu aktualisieren
export const updateDarkMode = () => {
  const root = document.documentElement;
  if (isDarkMode.value) {
    root.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
};

// Funktion zum Initialisieren des Dark Mode, beim Laden der Seite
export const initializeDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    isDarkMode.value = savedMode === 'true';
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  updateDarkMode();
};
