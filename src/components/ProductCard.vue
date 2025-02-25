<template>
  <div
    class="flex-shrink-0 w-72 border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        :src="product.image"
        :alt="product.name"
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />

      <div class="absolute top-2 right-2 flex flex-col gap-2">
        <span
          v-if="product.isNew"
          class="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded"
        >
          NEW
        </span>
        <span
          v-if="product.isSale"
          class="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded"
        >
          SALE
        </span>
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        class="absolute bottom-3 left-0 right-0 px-3 justify-between transition-transform duration-300 translate-y-10 group-hover:translate-y-0 hidden hover:block"
      >
        <button
          class="px-3 py-1 bg-white text-black dark:bg-gray-800 dark:text-white rounded-full text-sm font-medium flex items-center"
        >
          Add to Cart
        </button>
        <button
          class="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-700 flex items-center justify-center"
        >
          <span class="sr-only">Add to wishlist</span>
        </button>
      </div>
    </div>

    <div class="p-4">
      <div class="flex items-center justify-between">
        <div v-if="product.rating" class="flex items-center">
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-1"
            >({{ product.rating }}.0)</span
          >
        </div>
      </div>
      <h3
        class="font-medium text-base mt-1 leading-tight text-gray-800 dark:text-gray-100"
      >
        {{ truncateString(product.name, 28) }}
      </h3>
      <p
        class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 h-10"
      >
        {{ truncateString(product.desc, 68) }}
      </p>
    </div>

    <div class="px-4">
      <div class="h-px bg-gray-200 dark:bg-gray-700 my-2" />
    </div>

    <div class="p-4 pt-0 flex items-center justify-between">
      <div>
        <div v-if="product.salePrice" class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 dark:text-gray-400 line-through">
            €{{ product.price.toFixed(2) }}
          </span>
          <span class="text-lg font-bold text-red-600 dark:text-red-400">
            €{{ product.salePrice.toFixed(2) }}
          </span>
        </div>
        <span v-else class="text-lg font-bold text-gray-800 dark:text-gray-100">
          €{{ product.price.toFixed(2) }}
        </span>
      </div>
      <button
        class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types";

const props = defineProps<{
  product: Product;
}>();

const truncateString = (str: string, length: number = 74): string => {
  const ellipsis = "...";
  if (str.length > length) {
    return str.slice(0, length) + ellipsis;
  }
  return str;
};
</script>
