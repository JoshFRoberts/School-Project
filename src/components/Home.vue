<template>
  <div
    class="container mx-auto px-6 py-8 overflow-auto bg-background-cream dark:bg-dark-background-cream"
  >
    <h1 class="text-4xl font-bold text-center mb-8">
      {{ t("welcome.header") }}
    </h1>
    <HeroSlider
      :title="t('3dPrinter.header')"
      :description="t('3dPrinter.info')"
      :imageUrl="printerImage"
      side="left"
      styleCss="default"
    >
      <template #buttons>
        <div class="flex flex-row">
          <template v-for="color in ['primary-purple','primary-pink','primary-green','accent-yellow','accent-blue','accent-lavender', 'default']">
            <Btn :text="color" :clickling="clickTest" :styling="color"/>
          </template>
        </div>
      </template>
    </HeroSlider>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="rounded-lg shadow-md p-6 bg-background-LightGray dark:bg-dark-background-LightGray"
      >
        <h2 class="text-2xl font-semibold mb-4">
          {{ t("welcome.ourMainProduct.header") }}
        </h2>
        <p class="mb-4">
          {{ t("welcome.ourMainProduct.info") }}
        </p>
        <router-link
          to="/brettspiel"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >{{ t("common.learnMore") }}</router-link
        >
      </div>
      <div
        class="bg-background-LightGray dark:bg-dark-background-LightGray rounded-lg shadow-md p-6"
      >
        <h2 class="text-2xl font-semibold mb-4">
          {{ t("welcome.easter.header") }}
        </h2>
        <p class="mb-4">
          {{ t("welcome.easter.info") }}
        </p>
        <router-link
          to="/osterdeko"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >{{ t("common.discover") }}</router-link
        >
      </div>
    </div>
    <ProductSlider :products="products" />
  </div>
</template>

<script setup lang="ts">
import { t } from "../lang/Translator.vue";
import HeroSlider from "./HeroSlider.vue";
import printerImage from "@/assets/images/3d-printer.png";
import spielfiguren1 from "@/assets/images/spielfiguren.jpg";
import spielfiguren2 from "@/assets/images/spielfiguren2.jpg";
import ProductSlider from "@/components/ProductSlider.vue";
import productImage from "@/assets/images/beispielprodukt.svg";
import type { SliderProductProps } from "@/resources/types";

import Btn from "@/UI/Button.vue";

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

const clickTest = () => {
  console.log("Test");
};
</script>
