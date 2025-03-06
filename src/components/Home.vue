<template>
  <InfoSectionHeader />
  <div
    class="mx-auto py-8 overflow-auto bg-background-cream dark:bg-dark-background-cream"
  >
    <!-- Boardgame -->
    <HeroSlider
      :title="t('game.name')"
      titleStyle="cyanWater"
      :titleDesc="t('game.header')"
      :description="t('game.info')"
      :imageUrl="FamilyGameTime"
      side="right"
      :tag="[
        { text: t('tag.new'), icon: 'Flame' },
        { text: t('tag.game'), icon: 'Dices' },
      ]"
      ><template #buttons
        ><div
          class="justify-start pb-8 items-center md:space-x-4 md:space-y-0 space-x-0 space-y-4 flex flex-col md:flex-row"
        >
          <a href="#/about" class="w-full">
            <Btn
              styling="deepWater"
              :text="t('common.learnMore')"
              @click="clickTest"
            />
          </a>
          <a href="#products" class="w-full"
            ><Btn
              styling="deepWater"
              :text="t('common.buy')"
              @click="clickTest"
          /></a>
        </div>
      </template>
    </HeroSlider>
    <!-- Easter -->
    <HeroSlider
      :title="t('easter.header')"
      decoration
      titleStyle="easter"
      :titleDesc="t('easter.descHeader')"
      :description="t('easter.info')"
      :imageUrl="easterEggsImg"
      side="left"
      :tag="[
        { text: t('tag.new'), icon: 'Flame' },
        { text: t('tag.easter'), icon: 'Egg' },
      ]"
    >
      <template #buttons
        ><div class="justify-start pb-8 items-center flex flex-row">
          <a href="#products" class="w-full"
            ><Btn
              styling="easter"
              :text="t('common.collection')"
              @click="clickTest"
          /></a></div
      ></template>
    </HeroSlider>
    <!-- Printer -->
    <HeroSlider
      title="Bambu Lab P1S"
      titleStyle="secondary"
      :titleDesc="t('3dPrinter.header')"
      :description="t('3dPrinter.info')"
      :imageUrl="printerImage"
      side="right"
      :tag="[{ text: t('tag.3dPrinter'), icon: 'Printer' }]"
      ><template #buttons
        ><div class="justify-start w-full pb-8 flex flex-row">
          <a
            class="w-full"
            href="https://eu.store.bambulab.com/de/products/p1s-de?srsltid=AfmBOoqYU-n_ujmMmp6M1IOX2cqYbyoNbGi56KZF6BiyA-urNC1l2mJR"
            ><Btn :text="t('common.learnMore')" styling="secondary" @click="clickTest"
          /></a></div></template
    ></HeroSlider>
    <InfoSection
      :title="t('aboutUs.header')"
      :titleStyle="{ wordsToRecolor: 1, position: 'end', color: 'water' }"
      :description="t('aboutUs.info')"
    >
      <template #buttons
        ><div
          class="justify-center max-w-md mx-auto pb-8 -mt-10 items-center flex flex-row"
        >
          <a href="#/about"
            ><Btn
              styling="sky"
              :text="t('common.learnMore')"
              @click="clickTest"
          /></a></div
      ></template>
    </InfoSection>
    <ProductSlider :products="products" />
    <ContactForm />
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
// import maximalSechsImg from "@/assets/images/spielbrett.jpg";
import FamilyGameTime from "@/assets/images/FamilyGameTime.jpg";
import easterEggsImg from "@/assets/images/eastereggs.jpeg";
import InfoSectionHeader from "./InfoSectionHeader.vue";
import InfoSection from "./InfoSection.vue";
import ContactForm from "./ContactForm.vue";

import Btn from "@/UI/Button.vue";

interface SliderProductProps {
    name: string;
    desc: string;
    price: number;
    image: string;
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: number;
  }
  
// TODO: Need Translation 
const products: SliderProductProps[] = [
  {
    name: "Maximal Sechs",
    desc: "Ein Brettspiel für die ganze Familie",
    price: 30,
    image: spielfiguren1,
  },
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
