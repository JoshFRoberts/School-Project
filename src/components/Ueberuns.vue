<template>
  <!-- TODO: Translation -->
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16">
      <div
        class="text-center space-y-4"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h1
          class="text-4xl md:text-5xl font-bold text-blue-950 dark:text-gray-100"
        >
          Wir sind die HA24B
        </h1>
        <div
          class="flex items-center justify-center gap-2 text-xl text-blue-600 dark:text-blue-400"
        >
          <Rocket class="h-6 w-6" />
          <span class="font-semibold">Schülerfirma „Baller los"</span>
        </div>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto italic">
          "Baller los" bedeutet mit voller Kraft loslegen – und das machen wir.
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
              <h2 class="text-xl font-semibold">Wer wir sind</h2>
            </div>
            <p class="text-muted-foreground">
              Wir sind 24 Schülerinnen und Schüler im Alter von 15 bis 18
              Jahren. Unsere Firma haben wir im Rahmen der einjährigen
              Berufsfachschule Wirtschaft an der BBS I Lüneburg gegründet.
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
              <h2 class="text-xl font-semibold">Unsere Mission</h2>
            </div>
            <p class="text-muted-foreground">
              Wir stellen ein eigenes Spiel her und wollen damit auf den
              Umweltschutz, besonders bei den Gewässern, aufmerksam machen.
              Nachhaltigkeit steht bei uns an erster Stelle.
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
              <h2 class="text-xl font-semibold">Nachhaltige Produktion</h2>
            </div>
            <p class="text-muted-foreground">
              Mit unserem 3D-Drucker stellen wir Figuren aus recyclefähigem und
              Recycling-Filament her. Auch Spielbrett und Verpackung sind
              nachhaltig produziert.
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
              <h2 class="text-2xl font-semibold">Unser lokales Engagement</h2>
            </div>
            <p class="text-muted-foreground leading-relaxed">
              Wir engagieren uns aktiv für unsere Umwelt, indem wir die
              Verschmutzung der Ilmenau untersuchen. Dieser Fluss, der durch
              Lüneburg fließt, liegt uns besonders am Herzen. Wir sammeln
              Plastikmüll ein und dokumentieren die Verschmutzung, um auf die
              Problematik aufmerksam zu machen.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kooperationen -->
    <section class="container mx-auto px-4 py-12">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
      >
        <h2 class="text-2xl font-semibold text-center mb-8">
          Unsere Kooperationspartner
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
                  <h3 class="text-lg font-semibold">webnetz</h3>
                </div>
                <p class="text-muted-foreground">
                  Kooperation mit dem Lüneburger IT-Unternehmen „webnetz" für
                  unsere Webpräsenz.
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
                <h3 class="text-lg font-semibold">IT22B</h3>
              </div>
              <p class="text-muted-foreground">
                Zusammenarbeit mit den Auszubildenden zum Fachinformatiker im 3.
                Lehrjahr.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  Rocket,
  Users,
  TreePine,
  Printer,
  Waves,
  Building2,
  GraduationCap,
  Recycle,
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
