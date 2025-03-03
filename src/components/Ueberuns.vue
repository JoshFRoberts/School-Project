<template>
  <div class="">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 pt-16">
      <div
        class="text-center space-y-4"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h1
          class="text-4xl md:text-5xl font-bold text-blue-950 dark:text-gray-100"
        >
          {{ t('aboutUs.class') }}
        </h1>
        <div
          class="flex items-center justify-center gap-2 text-xl text-blue-600 dark:text-blue-400"
        >
          <Rocket class="h-6 w-6" />
          <span class="font-semibold">{{ t('aboutUs.class.company') }}</span>
        </div>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto italic">
          {{ t('aboutUs.name.meaning') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Wer wir sind -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="card p-6 h-full bg-background-LightGray dark:bg-dark-background-LightGray hover:shadow-lg transition-shadow rounded-lg border"
        >
          <div class="space-y-4">
            <div
              class="flex items-center gap-3 text-blue-600 dark:text-blue-400"
            >
              <Users class="h-6 w-6" />
              <h2 class="text-xl font-semibold">{{ t('aboutUs.who.header') }}</h2>
            </div>
            <p class="text-muted-foreground">
              {{ t('aboutUs.who.info') }}
            </p>
          </div>
        </div>

        <!-- Unsere Mission -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          class="card p-6 h-full bg-background-LightGray dark:bg-dark-background-LightGray hover:shadow-lg transition-shadow rounded-lg border"
        >
          <div class="space-y-4">
            <div
              class="flex items-center gap-3 text-green-600 dark:text-green-400"
            >
              <TreePine class="h-6 w-6" />
              <h2 class="text-xl font-semibold">{{ t('aboutUs.mission.header') }}</h2>
            </div>
            <p class="text-muted-foreground">
              {{ t('aboutUs.mission.info') }}
            </p>
          </div>
        </div>

        <!-- Produktion -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          class="card p-6 h-full bg-background-LightGray dark:bg-dark-background-LightGray hover:shadow-lg transition-shadow rounded-lg border"
        >
          <div class="space-y-4">
            <div
              class="flex items-center gap-3 text-purple-600 dark:text-purple-400"
            >
              <Printer class="h-6 w-6" />
              <h2 class="text-xl font-semibold">{{ t('aboutUs.production.header') }}</h2>
            </div>
            <p class="text-muted-foreground">
              {{ t('aboutUs.production.info') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lokales Engagement -->
    <section class="container mx-auto px-4 py-12">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
        class="max-w-3xl mx-auto"
      >
        <div
          class="card p-8 bg-background-LightGray dark:bg-dark-background-LightGray rounded-lg border"
        >
          <div class="space-y-6">
            <div
              class="flex items-center gap-3 text-blue-600 dark:text-blue-400"
            >
              <Waves class="h-8 w-8" />
              <h2 class="text-2xl font-semibold">{{ t('aboutUs.engagement.header') }}</h2>
            </div>
            <p class="text-muted-foreground leading-relaxed">
              {{ t('aboutUs.engagement.info') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kooperationen -->
    <section class="container mx-auto mt-2 pb-16">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
      >
        <h2 class="text-2xl font-semibold text-center mb-8">
          {{ t('aboutUs.partner.header') }}
        </h2>
        <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a href="https://www.webnetz.de/">
            <div
              class="card p-6 bg-background-LightGray dark:bg-dark-background-LightGray hover:shadow-lg transition-shadow rounded-lg border"
            >
              <div class="space-y-4">
                <div
                  class="flex items-center gap-3 text-blue-600 dark:text-blue-400"
                >
                  <Building2 class="h-6 w-6" />
                  <h3 class="text-lg font-semibold">{{ t('aboutUs.partner.webnetz.header') }}</h3>
                </div>
                <p class="text-muted-foreground">
                  {{ t('aboutUs.partner.webnetz.info') }}
                </p>
              </div>
            </div>
          </a>

          <div
            class="card p-6 bg-background-LightGray dark:bg-dark-background-LightGray hover:shadow-lg transition-shadow rounded-lg border"
          >
            <div class="space-y-4">
              <div
                class="flex items-center gap-3 text-blue-600 dark:text-blue-400"
              >
                <GraduationCap class="h-6 w-6" />
                <h3 class="text-lg font-semibold">{{ t('aboutUs.partner.it.class.header') }}</h3>
              </div>
              <p class="text-muted-foreground">
                {{ t('aboutUs.partner.it.class.info') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { t } from "../lang/Translator.vue"
import {
  Rocket,
  Users,
  TreePine,
  Printer,
  Waves,
  Building2,
  GraduationCap,
} from "lucide-vue-next";
</script>

<style scoped>
.text-muted-foreground {
  @apply text-gray-600 dark:text-gray-400;
}

.card {
  @apply shadow-sm;
}

/* Dark mode styles */
:root.dark .card {
  @apply border-gray-800;
}
</style>
