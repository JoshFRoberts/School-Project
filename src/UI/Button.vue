<script setup lang="ts">


const props = defineProps({
    text: {
        type: String,
        required: true
    },
    clickling: {
        type: Function,
        required: true
    },
    styling: {
        type: String,
        default: "primary"
    },
    rounding: {
        type: String,
        default: ''
    }

})

let roundingSize:string;

switch (props.rounding) {
  case 'xl':    
    roundingSize='rounded-xl';
    break;
    case 'm':
        roundingSize='rounded-md';
        break;
    case 's':
        roundingSize='rounded-sm';
        break;
  default:
  roundingSize='rounded-md';
}

let colorName:string;

switch (props.styling) {
    case 'primary':
    colorName='bg-blue-600 hover:bg-blue-700 border-blue-700 dark:bg-sky-800 hover:dark:bg-sky-900 ';
        break;
    case 'notPrimary':
        colorName='bg-green-600 hover:bg-green-700 dark:bg-sky-800 hover:dark:bg-sky-900';
        break;
    case 'idk':
    colorName='bg-gray-600 hover:bg-gray-700 dark:bg-sky-800 hover:dark:bg-sky-900';
        break;
    case 'purple':
        colorName='bg-purple-600 hover:bg-purple-700 dark:bg-sky-800 hover:dark:bg-sky-900';
        break;
    default:
        colorName = "bg-purple-700 dark:bg-sky-800 hover:dark:bg-sky-900"
break;
}


const handleClick =()=>{
    props.clickling()
}
</script>

<template>
    <div class='border-2 px-4 py-2 font-semibold text-gray-200' :class=" [ roundingSize, colorName]" @click="handleClick">
        {{props.text}}
    </div>
</template>