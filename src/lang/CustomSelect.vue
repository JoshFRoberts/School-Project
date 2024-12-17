<template>
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex justify-center items-center w-full rounded-full px-1 py-1 bg-transparent text-sm font-medium text-stone-500 hover:bg-black/10 focus:outline-none"
          @click="toggleDropdown"
        >
          <SvgSelector :svg="selectedOption.svg" :size="32" />
        </button>
      </div>
  
      <div
        v-if="isOpen"
        class="origin-top-right px-2 absolute mt-1 z-50 -right-2.5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button
            v-for="option in options"
            :key="option.value"
            class="flex items-center justify-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
            role="menuitem"
            @click="selectOption(option)"
          >
            <SvgSelector :svg="option.svg" :size="32" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import SvgSelector from '../resources/SvgSelector.vue'
  
  interface Option {
    value: string;
    svg: string;
  }
  
  const props = defineProps<{
    modelValue: string;
    options: Option[];
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>()
  
  const isOpen = ref(false)
  const selectedOption = computed(() => props.options.find(option => option.value === props.modelValue) || props.options[0])
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const selectOption = (option: Option) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
  </script>
  
  