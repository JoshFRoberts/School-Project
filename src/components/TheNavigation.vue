<script lang="ts">
import NavLink from "../components/Wrappers/NavLink.vue";

export default {
  name: "TheNavigation",
  setup() {
    return NavLink;
  },
};
</script>

<template>
  <nav class="sticky h-2">
    <ol class="flex flex-row justify-evenly">
      <NavLink link="https://google.com">
        Componentenlink
      </NavLink>
      <NavLink link="https://www.baustoffshop.de">
        Materialien
      </NavLink>
      <NavLink link="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        Quellen
      </NavLink>
      <NavLink link="https://www.nintendo.com/eu/media/images/10_share_images/games_15/super_nintendo_5/H2x1_SNES_TheLegendOfZeldaALinkToThePast_image1600w.jpg">
        Link
      </NavLink>
    </ol>
  </nav>
</template>