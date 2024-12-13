/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class', // Keeps your current dark mode setting
  theme: {
    extend: {
      colors: {
        // Light mode colors (default)
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

        // Dark mode color variations
        dark: {
          primary: {
            SpringPurple: "#6D28D9", // Darker purple
            EasterPink: "#DB2777", // Deeper pink
            MintGreen: "#10B981", // Darker green
          },
          Accent: {
            SunnyYellow: "#F59E0B", // Deeper yellow
            SkyBlue: "#0284C7", // Darker blue
            Lavender: "#7C3AED", // Deeper lavender
          },
          background: {
            cream: "#1F2937", // Dark gray
            LightGray: "#111827", // Almost black
          },
          text: {
            DarkPurple: "#E9D5FF", // Lighter purple
            Gray: "#D1D5DB", // Lighter gray
          }
        }
      },
    },
  },
  variants: {
    extend: {
      // Add dark mode variants for additional utilities if needed
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [],
};