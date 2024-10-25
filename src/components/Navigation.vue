<script setup lang="ts">

import NavLink from "@/components/Wrappers/NavLink.vue";
</script>

<template>
  <nav class="sticky h-2">
    <ol class="flex flex-row justify-evenly">
      <nav-link link="https://google.com">
        Componentenlink
      </nav-link>
      <nav-link link="https://www.baustoffshop.de">
        Materialien
      </nav-link>
      <nav-link link="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        Quellen
      </nav-link>
      <nav-link link="https://www.nintendo.com/eu/media/images/10_share_images/games_15/super_nintendo_5/H2x1_SNES_TheLegendOfZeldaALinkToThePast_image1600w.jpg">
        Link
      </nav-link>
    </ol>
  </nav>
</template>

<style scoped>

</style>