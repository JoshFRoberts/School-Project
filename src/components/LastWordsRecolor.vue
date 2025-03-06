<script lang="ts">
import { defineComponent, h } from "vue";

export interface GetWordsToRecolorProps {
  wordsToRecolor?: number;
  wordsToHighlight?: string[];
  position?: "start" | "middle" | "end" | "custom";
  styleVariant?: RecolorStyle["styleVariant"];
}

export interface RecolorStyle {
  styleVariant: "easter" | "primary" | "secondary" | "colorful" | "tealWater" | "cyanWater" | "water";
}

const getGradientClass = (variant: string) => {
  switch (variant) {
    case "easter":
      return "bg-gradient-to-r from-yellow-500 dark:from-yellow-600 via-pink-400 dark:via-pink-500 to-purple-400 dark:to-purple-500 text-transparent bg-clip-text";
    case "primary":
      return "bg-gradient-to-r from-blue-500 dark:from-blue-600 via-purple-500 dark:via-purple-600 to-purple-600 dark:to-purple-700 text-transparent bg-clip-text";
    case "secondary":
      return "bg-gradient-to-r from-gray-500 dark:from-gray-400 via-gray-700 dark:via-gray-500 to-black dark:to-gray-500 text-transparent bg-clip-text";
    case "colorful":
      return "bg-gradient-to-r from-red-500 dark:from-red-600 via-green-500 dark:via-green-600 to-blue-500 dark:to-blue-600 text-transparent bg-clip-text";
    case "water":
      return "bg-gradient-to-r from-blue-500 dark:from-blue-600 via-blue-400 dark:via-blue-500 to-blue-300 dark:to-blue-400 text-transparent bg-clip-text";
    case "tealWater":
      return "bg-gradient-to-r from-teal-500 dark:from-teal-600 via-teal-400 dark:via-teal-500 to-teal-300 dark:to-teal-400 text-transparent bg-clip-text";
    case "cyanWater":
      return "bg-gradient-to-r from-cyan-800 dark:from-cyan-700 via-cyan-700 dark:via-cyan-600 to-cyan-600 dark:to-cyan-500 text-transparent bg-clip-text";
    default:
      return "bg-gradient-to-r from-blue-500 dark:from-blue-600 via-purple-500 dark:via-purple-600 to-purple-600 dark:to-purple-700 text-transparent bg-clip-text";
  }
};

export default defineComponent({
  name: "WordsRecolor",
  props: {
    text: {
      type: String,
      required: true,
    },
    wordsToRecolor: {
      type: Number,
      default: 2,
    },
    wordsToHighlight: {
      type: Array as () => string[],
      default: () => [],
    },
    position: {
      type: String as () => "start" | "middle" | "end" | "custom",
      default: "end",
    },
    styleVariant: {
      type: String as () => "easter" | "primary" | "secondary" | "colorful" | "tealWater" | "cyanWater" | "water",
      default: "primary",
    },
  },
  setup(props) {
    const getWordsToRecolor = () => {
      const words = props.text.split(" ");
      if (words.length < props.wordsToRecolor) {
        return h("span", { class: getGradientClass(props.styleVariant) }, props.text);
      }

      if (props.position === "custom" && props.wordsToHighlight) {
        return h(
          "span",
          null,
          words.map((word) =>
            props.wordsToHighlight.includes(word)
              ? [h("span", { class: getGradientClass(props.styleVariant) }, word), " "]
              : word + " "
          )
        );
      }

      let startIdx = 0;
      if (props.position === "end") {
        startIdx = words.length - props.wordsToRecolor;
      } else if (props.position === "middle") {
        startIdx = Math.max(0, Math.floor((words.length - props.wordsToRecolor) / 2));
      } else if (props.position === "start") {
        startIdx = 0;
      }

      const before = words.slice(0, startIdx).join(" ") + (startIdx > 0 ? " " : "");
      const recolor = words.slice(startIdx, startIdx + props.wordsToRecolor).join(" ");
      const after = (startIdx + props.wordsToRecolor < words.length ? " " : "") + words.slice(startIdx + props.wordsToRecolor).join(" ");

      return h("span", null, [
        before,
        h("span", { class: getGradientClass(props.styleVariant) }, recolor),
        after,
      ]);
    };

    return () => getWordsToRecolor();
  },
});
</script>

<template>
  <span v-html="getWordsToRecolor()"></span>
</template>
