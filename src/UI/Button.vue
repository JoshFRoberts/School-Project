<script setup lang="ts">
const props = defineProps({
  text: {
      type: String,
      required: true,
  },
  clickling: {
      type: Function,
      required: true,
  },
  /**
   * @values primary-purple, primary-pink, primary-green, accent-yellow, accent-blue, accent-lavender sip
   */
  styling: {
        type: String,
        required: true,
        validator: (value: string) => {
          const acceptedValues = [
            'primary-purple',
            'primary-pink',
            'primary-green',
            'accent-yellow',
            'accent-blue',
            'accent-lavender',
          ];
          const val: boolean = acceptedValues.includes(value)
          if (!val) {
            console.warn("Prop btn can only have values:", acceptedValues)
          }
          return val
        }
    },
  rounding: {
      type: String,
      default: '',
  },
});

import { computed } from 'vue';

const roundingSize = computed(() => {
    switch (props.rounding) {
        case 'xl':
            return 'rounded-xl';
        case 'm':
            return 'rounded-md';
        case 's':
            return 'rounded-sm';
        default:
            return 'rounded-md';
    }
});

const colorName = computed(() => {
    switch (props.styling) {
      case 'primary-purple':
        return 'bg-primary-SpringPurple hover:bg-primary-EasterPink ' +
            'dark:bg-dark-primary-SpringPurple dark:hover:bg-dark-primary-EasterPink ' +
            'text-text-DarkPurple dark:text-dark-text-Gray';

      case 'primary-pink':
        return 'bg-primary-EasterPink hover:bg-primary-MintGreen ' +
            'dark:bg-dark-primary-EasterPink dark:hover:bg-dark-primary-MintGreen ' +
            'text-text-DarkPurple dark:text-dark-text-Gray';

      case 'primary-green':
        return 'bg-primary-MintGreen hover:bg-primary-SpringPurple ' +
            'dark:bg-dark-primary-MintGreen dark:hover:bg-dark-primary-SpringPurple ' +
            'text-text-Gray dark:text-dark-text-Gray';

      case 'accent-yellow':
        return 'bg-Accent-SunnyYellow hover:bg-Accent-SkyBlue ' +
            'dark:bg-dark-Accent-SunnyYellow dark:hover:bg-dark-Accent-SkyBlue ' +
            'text-text-Gray dark:text-dark-text-Gray';

      case 'accent-blue':
        return 'bg-Accent-SkyBlue hover:bg-Accent-Lavender ' +
            'dark:bg-dark-Accent-SkyBlue dark:hover:bg-dark-Accent-Lavender ' +
            'text-text-Gray dark:text-dark-text-Gray';

      case 'accent-lavender':
        return 'bg-Accent-Lavender hover:bg-Accent-SunnyYellow ' +
            'dark:bg-dark-Accent-Lavender dark:hover:bg-dark-Accent-SunnyYellow ' +
            'text-text-Gray dark:text-dark-text-Gray';
      default:
          return 'bg-black hover:bg-white ' +
              'dark:bg-white dark:hover:bg-black ' +
              'text-white hover:text-black ' +
              'dark:text-black dark:hover:text-white';
    }
});

const handleClick = () => {
    props.clickling();
};
</script>

<template>
    <button
        class="border-2 px-4 py-2 font-semibold text-gray-200 cursor-pointer text-center"
        :class="[roundingSize, colorName]"
        @click="handleClick"
    >
        {{ props.text }}
    </button>
</template>
