<script setup lang="ts">

import { t } from "../lang/Translator.vue";
import type {SliderProductProps} from "@/resources/types";
import spielfiguren1 from "@/assets/images/spielfiguren.jpg";
import spielfiguren2 from "@/assets/images/spielfiguren2.jpg";
import productImage from "@/assets/images/beispielprodukt.svg";
import printerImage from "@/assets/images/3d-printer.png";
import HeroSlider from "@/components/HeroSlider.vue";

const products: SliderProductProps[] = [
  {
    name: "3D Spielfigur Erweiterungsset 1",
    price: 10,
    isNew: true,
    desc: "Erweitere dein Spiel mit neuen Figuren",
    image: spielfiguren1,
  },
  {
    name: "3D Spielfigur Erweiterungsset 2",
    price: 20,
    isSale: true,
    salePrice: 15,
    desc: "Die epische Erweiterung 'Legenden des Reiches' erweitert das Grundspiel um faszinierende neue Mechaniken und Spielelemente. Die Spieler tauchen ein in bisher unerforschte Regionen des mystischen Königreichs, treffen auf mächtige neue Verbündete und stellen sich gefährlichen Herausforderungen. Das Erweiterungsset enthält 4 neue detailliert gestaltete Spielfiguren, 120 zusätzliche Ereigniskarten, einen erweiterten Spielplan mit geheimnisvollen Landschaften und komplett neue Questlinien, die das Spielerlebnis auf eine völlig neue Ebene heben.",
    image: spielfiguren2,
  },
  {
    name: "Spielfeld-Erweiterung",
    desc: "stadg",
    price: 30,
    image: productImage,
  },
  {
    name: "Oster-Deko Set 'Hase'",
    desc: "stadg",
    price: 40,
    isNew: true,
    image: productImage,
  },
  {
    name: "Oster-Deko Set 'Ei'",
    desc: "stadg",
    price: 400,
    image: productImage,
  },
  {
    name: "Oster-Deko Set 'Ei'",
    desc: "stadg",
    price: 400,
    image: productImage,
  },
  {
    name: "Oster-Deko Set 'Ei'",
    desc: "stadg",
    isSale: true,
    salePrice: 300,
    price: 400,
    image: productImage,
  },
  {
    name: "Oster-Deko Set 'Ei'",
    desc: "stadg",
    price: 400,
    image: productImage,
  },
];

</script>

<template>

<div id="product-page-grid" class="grid grid-cols-2 gap-12 p-6 m-6">
  <HeroSlider
      id="product"
      v-for="product in products"
      :title="product.name"
      :description="product.desc"
      :imageUrl="product.image"
      side="left"
      styleCss="default"
  >
    <template #buttons>
      <button
          class="bg-purple-600 text-white px-4 py-2 rounded mr-4 hover:bg-purple-700"
      >
        Button mit Funktion 1
      </button>
      <button
          class="bg-white text-purple-600 px-4 py-2 rounded border border-purple-600 hover:bg-purple-100"
      >
        Button mit Funktion 2
      </button>
    </template>
  </HeroSlider>
</div>

</template>

<style scoped>

</style>