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
    styling: {
        type: String,
        required: true,
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
    //TODO: Darkmode
    switch (props.styling) {
        case 'primary':
            return 'bg-blue-600 hover:bg-blue-700 border-blue-700 hover:dark:bg-sky-900';
        case 'notPrimary':
            return 'bg-green-600 hover:bg-green-700 hover:dark:bg-sky-900';
        case 'idk':
            return 'bg-gray-600 hover:bg-gray-700 hover:dark:bg-sky-900';
        case 'purple':
            return 'bg-purple-600 hover:bg-purple-700 hover:dark:bg-sky-900';
        default:
            return 'bg-purple-700';
    }
});

const handleClick = () => {
    props.clickling();
};
</script>

<template>
    <div
        class="border-2 px-4 py-2 font-semibold text-gray-200 cursor-pointer"
        :class="[roundingSize, colorName]"
        @click="handleClick"
    >
        {{ props.text }}
    </div>
</template>
