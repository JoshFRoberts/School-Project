<template>
  <footer
    class="transition-colors duration-300 bg-gradient-to-b from-background-LightGray/50 to-background-LightGray dark:from-gray-900/95 dark:to-gray-900 text-gray-700 dark:text-gray-300 py-16 w-full border-t border-gray-200 dark:border-gray-800"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <!-- Company Info -->
        <div class="text-center md:text-left space-y-4">
          <h3 class="text-lg font-semibold mb-4 dark:text-gray-200 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-gray-300 dark:after:bg-gray-700 after:bottom-0 after:left-0 md:after:left-0 pb-2">
            {{ t("aboutUs.class.company") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t("welcome.info") }}
          </p>
        </div>
        
        <!-- Contact Info -->
        <div class="text-center md:text-left space-y-4">
          <h3 class="text-lg font-semibold mb-4 dark:text-gray-200 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-gray-300 dark:after:bg-gray-700 after:bottom-0 after:left-0 md:after:left-0 pb-2">
            {{ t("common.contact") }}
          </h3>
          <div class="space-y-3">
            <a href="mailto:info@bbs1-lueneburg.de" class="flex items-center group hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
              <Mail class="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
              <span>info@bbs1-lueneburg.de</span>
            </a>
            <a href="tel:+4941319922060" class="flex items-center group hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
              <Phone class="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
              <span>+49 4131 99220600</span>
            </a>
            <a href="https://maps.google.com/?q=Spillbrunnenweg 1, 21337 Lüneburg" target="_blank" class="flex items-center group hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
              <MapPin class="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
              <span>Spillbrunnenweg 1, 21337 Lüneburg</span>
            </a>
          </div>
        </div>
        
        <!-- Links -->
        <div class="text-center md:text-left space-y-4">
          <h3 class="text-lg font-semibold mb-4 dark:text-gray-200 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-gray-300 dark:after:bg-gray-700 after:bottom-0 after:left-0 md:after:left-0 pb-2">
            {{ t("footer.hint") }}
          </h3>
          <a
            href="https://www.bbs1-lueneburg.de/"
            class="inline-block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline transform hover:-translate-y-0.5"
          >
            {{ t("footer.hint.text") }}
          </a>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center space-y-4">
        <div class="flex flex-wrap justify-center gap-6">
          <a href="#/privacy" class="font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline">
            {{ t("footer.privacy") }}
          </a>
          <a href="#/imprint" class="font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline">
            {{ t("footer.imprint") }}
          </a>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-500">&copy; {{ t("footer.rights") }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { t } from "../lang/Translator.vue";
import { Phone, Mail, MapPin } from "lucide-vue-next";
</script>