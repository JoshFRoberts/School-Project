<template>
  <div>
    <div v-if="selectedSvg" v-html="svgWithSizeAndColor"></div>
    <span v-else>SVG not found</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface SvgData {
  svg: string;
}

interface SvgCollection {
  [category: string]: {
    [name: string]: SvgData;
  };
}

const SVGs: SvgCollection = {
  flag: {
    germany: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600" viewBox="0 0 5 3">
    <defs>
      <clipPath id="ring-clip">
        <circle cx="2.5" cy="1.5" r="1.5"/>
      </clipPath>
    </defs>
    
    
    <g clip-path="url(#ring-clip)">
      <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/>
      <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/>
      <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/>
    </g>
    
    <circle cx="2.5" cy="1.5" r="1.5" fill="none" stroke="white" stroke-width="0.1"/>
  </svg>`,
    },
    france: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
    <defs>
      <clipPath id="ring-clip">
        <circle cx="2.5" cy="1.5" r="1.5"/>
      </clipPath>
    </defs>
    
    
    <g clip-path="url(#ring-clip)">
      <rect width="5" height="3" fill="#002395"/>
      <rect x="0" width="5" height="2" fill="#FFFFFF"/>
      <rect x="0" width="5" height="1" fill="#ED2939"/>
    </g>
    
    <circle cx="2.5" cy="1.5" r="1.5" fill="none" stroke="white" stroke-width="0.1"/>
  </svg>`,
    },
    england: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
    <defs>
      <clipPath id="ring-clip">
        <circle cx="2.5" cy="1.5" r="1.5"/>
      </clipPath>
    </defs>
    
    <rect width="5" height="3" fill="white"/>
    
    <g clip-path="url(#ring-clip)">
      <rect width="5" height="3" fill="#FFFFFF"/>
      <rect x="2" width="1" height="3" fill="#CF081F"/>
      <rect y="1" width="5" height="1" fill="#CF081F"/>
    </g>
    
    <circle cx="2.5" cy="1.5" r="1.5" fill="none" stroke="white" stroke-width="0.1"/>
  </svg>`,
    },
    spain: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
    <defs>
      <clipPath id="ring-clip">
        <circle cx="2.5" cy="1.5" r="1.5"/>
      </clipPath>
    </defs>
    
    <g clip-path="url(#ring-clip)">
      <rect width="5" height="4" fill="#AA151B"/>
      <rect y="1" width="5" height="1" fill="#F1BF00"/>
      <path d="M187.5,250 C187.5,195.65 233.65,150 288,150 C342.35,150 388.5,195.65 388.5,250 C388.5,304.35 342.35,350 288,350 C233.65,350 187.5,304.35 187.5,250" fill="#AA151B"/>
    </g>
    
      <circle cx="2.5" cy="1.5" r="1.5" fill="none" stroke="white" stroke-width="0.1"/>
  </svg>`,
    },
  },
  common: {
    filter: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v2.25a1.5 1.5 0 01-.44 1.06l-6.1 6.1a1.5 1.5 0 00-.44 1.06V20.25a.75.75 0 01-1.5 0v-5.28a3 3 0 01.88-2.12l6.1-6.1a.75.75 0 00.22-.53V4.5a.75.75 0 00-.75-.75h-15a.75.75 0 00-.75.75v2.25c0 .199.079.39.22.53l6.1 6.1a3 3 0 01.88 2.12v5.28a.75.75 0 01-1.5 0v-5.28a1.5 1.5 0 00-.44-1.06l-6.1-6.1A1.5 1.5 0 013 6.75V4.5z"/>
  </svg>`,
    },
    search: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.71 20.29l-5.01-5.01a8 8 0 10-1.41 1.41l5.01 5.01a1 1 0 001.41-1.41zM4 10a6 6 0 116 6 6 6 0 01-6-6z"/>
  </svg>`,
    },
    arrowLeft: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>`,
    },
    arrowRight: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>`,
    },
  },
};

export default defineComponent({
  name: "SvgSelector",
  props: {
    svg: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
  setup(props) {
    const selectedSvg = computed(() => {
      const [category, name] = props.svg.split(".");
      return SVGs[category]?.[name];
    });

    const svgWithSizeAndColor = computed(() => {
      if (!selectedSvg.value) return null;

      const parser = new DOMParser();
      const doc = parser.parseFromString(
        selectedSvg.value.svg,
        "image/svg+xml"
      );
      const svgElement = doc.documentElement;

      svgElement.setAttribute("width", props.size.toString());
      svgElement.setAttribute("height", props.size.toString());

      const paths = svgElement.getElementsByTagName("path");
      for (let i = 0; i < paths.length; i++) {
        paths[i].setAttribute("fill", props.color);
      }

      return svgElement.outerHTML;
    });

    return {
      selectedSvg,
      svgWithSizeAndColor,
    };
  },
});
</script>
