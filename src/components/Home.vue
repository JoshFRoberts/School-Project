<template>
  <InfoSectionHeader />
  <div
    class="mx-auto py-8 overflow-auto bg-background-cream dark:bg-dark-background-cream"
  >
    <HeroSlider
      title="Maximal Sechs"
      titleStyle="cyanWater"
      titleDesc="Brettspiel für die ganze Familie"
      :description="t('3dPrinter.info')"
      :imageUrl="FamilyGameTime"
      side="right"
      :tag="['Neu', 'Brettspiel']"
      ><template #buttons
        ><div class="justify-start pb-8 items-center md:space-x-4 md:space-y-0 space-x-0 space-y-4 flex flex-col md:flex-row">
          <Btn styling="deepWater" text="Mehr Erfahren" @click="clickTest" />
          <Btn styling="deepWater" text="Jetzt Kaufen" @click="clickTest" />
        </div>
          </template
    ></HeroSlider>
    <HeroSlider
      title="Oster-Kollektion"
      decoration
      titleStyle="easter"
      titleDesc="Osterdekoration für dein Zuhause"
      :description="t('3dPrinter.info')"
      :imageUrl="easterEggsImg"
      side="left"
      :tag="['Neu', 'Ostern']"
    >
      <template #buttons
        ><div class="justify-start pb-8 items-center flex flex-row">
          <Btn styling="easter" text="Zur Kollektion" @click="clickTest" /></div
      ></template>
    </HeroSlider>
    <HeroSlider
      title="Bambu Lab P1S"
      titleStyle="secondary"
      :titleDesc="t('3dPrinter.header')"
      :description="t('3dPrinter.info')"
      :imageUrl="printerImage"
      side="right"
      :tag="['Drucker', '3D']"
      ><template #buttons
        ><div class="justify-start w-full pb-8 flex flex-row">
          <Btn text="Mehr Erfahren" styling="" @click="clickTest" /></div></template
    ></HeroSlider>
    <InfoSection
      title="Über unsere Schülerfirma"
      :titleStyle="{ wordsToRecolor: 1, position: 'end', color: 'water' }"
      description="Als engagierte Gruppe von Schülern verbinden wir Innovation mit Umweltbewusstsein. Durch modernste 3D-Druck-Technologie erschaffen wir Produkte, die nicht nur Freude bereiten, sondern auch zum Nachdenken über unsere Umwelt anregen."
    >
      <template #buttons
        ><div class="justify-center max-w-md mx-auto pb-8 -mt-10 items-center flex flex-row">
          <Btn styling="sky" text="Mehr Erfahren" @click="clickTest" /></div
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
import maximalSechsImg from "@/assets/images/spielbrett.jpg";
import FamilyGameTime from "@/assets/images/FamilyGameTime.jpg";
import easterEggsImg from "@/assets/images/eastereggs.jpeg";
import type { SliderProductProps } from "@/resources/types";
import LastWordsRecolor from "./LastWordsRecolor";
import InfoSectionHeader from "./InfoSectionHeader.vue";
import InfoSection from "./InfoSection.vue";
import ContactForm from "./ContactForm.vue";

import Btn from "@/UI/Button.vue";

const products: SliderProductProps[] = [
  {
    name: "Maximal Sechs",
    desc: "Ein Brettspiel für die ganze Familie",
    price: 30,
    image: maximalSechsImg,
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
