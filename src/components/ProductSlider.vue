<template>
  <div class="product-slider">
    <!-- Slider container -->
    <div
      ref="containerRef"
      class="flex flex-row max-w-[84rem] py-2 px-5 my-8 mx-auto space-x-2 overflow-x-hidden "
    >
      <div class="flex flex-row absolute -ml-12 w-[90rem] mt-36">
        <button @click="scrollLeft" class="border rounded-full hover:bg-gray-100"><SvgSelector svg="common.arrowLeft.svg" :size="32" /></button>
        <button @click="scrollRight" class="ml-auto border rounded-full hover:bg-gray-100"><SvgSelector svg="common.arrowRight.svg" :size="32" /></button>
      </div>
      <!-- Slider Cards -->
      <div v-for="(product, index) in props.products" :key="index">
        <div
          class="flex flex-col w-64 h-96 px-4 py-2 rounded-md bg-background-LightGray dark:bg-dark-background-LightGray"
        >
          <div class="relative w-56 border overflow-hidden dark:border-gray-600 border-gray-300">
            <!-- Sale Banner -->
            <div
              v-if="product.isSale"
              class="absolute bg-red-800 w-24 text-white px-2 text-center -rotate-45 top-2 -left-7"
            >
              Sale
            </div>
            <div
              v-if="product.isNew"
              class="absolute bg-green-800 w-24 text-white px-2 text-center -rotate-45 top-2 -left-7"
            >
              NEW
            </div>

            <!-- Product Image -->
            <img :src="product.image" :alt="product.name" class="w-full" />
          </div>
          <h3 class="mt-2 bigText">
            {{ truncateString(product.name, 28) }}
          </h3>
          <h6 class="mb-1 baseText">{{ truncateString(product.desc) }}</h6>
          <div class="mt-auto flex flex-row">
            <button class="border bigText dark:border-gray-600 px-2 border-gray-300">Read more</button>
            <div v-if="product.salePrice" class="ml-auto flex flex-row">
              <p class="ml-auto text-sm font-medium line-through mt-auto mr-2">
                {{ product.price }}€
              </p>
              <p class="ml-auto font-bold">{{ product.salePrice }}€</p>
            </div>
            <p v-else class="ml-auto font-bold">{{ product.price }}€</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SliderProductProps } from "@/resources/types";
import { ref } from "vue";
  import SvgSelector from '../resources/SvgSelector.vue'

/**
 * Truncate a string to a given length and append an ellipsis.
 * @param str The string to truncate.
 * @param length The maximum length of the truncated string.
 * @returns The truncated string.
 */
const truncateString = (str: string, length?: number): string => {
  const maxLength = length || 74;
  const ellipsis = "...";

  if (str.length > maxLength + 1) {
    return str.slice(0, maxLength) + ellipsis;
  }

  return str;
};
const containerRef = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
};

const props = defineProps({
  nameColor: { type: String, default: "#000" },
  products: { type: Array<SliderProductProps>, required: true },
  priceColor: { type: String, default: "#555" },
});

// styleObject() {
//             return {
//                 "--name-color": this.nameColor,
//                 "--price-color": this.priceColor,
//             };
//         }
</script>
