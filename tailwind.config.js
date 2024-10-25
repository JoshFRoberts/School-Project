/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: {
          SpringPurple: "#A78BFA",
          EasterPink: "#F9A8D4",
          MintGreen: "#A7F3D0",
        },
        Accent: {
          SunnyYellow: "#FDE68A",
          SkyBlue: "#BAE6FD",
          Lavender: "#DDD6FE",
        },
        background: {
          cream: "#FAFAF9",
          LightGray: "#F3F4F6",
        },
        text: {
          DarkPurple: "#581C87",
          Gray: "#4B5563",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};