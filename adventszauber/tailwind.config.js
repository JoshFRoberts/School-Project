/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'th-black': '#0A0A0D',
        'th-white': '#FCFAF5',
        'th-primary': '#83639D',
        'th-secondary': '#4C2F26',
        'th-highlight': '#FF9B00',

      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

