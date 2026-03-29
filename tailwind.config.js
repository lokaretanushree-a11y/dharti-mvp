/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "Cascadia Code", "monospace"],
      },
      colors: {
        earth: {
          50: "#faf6f0",
          100: "#f0e8d8",
          200: "#e0d0b8",
          300: "#c9b08f",
          400: "#b08f68",
          500: "#96754f",
          600: "#7a5f42",
          700: "#624c38",
          800: "#524032",
          900: "#46362c",
        },
        leaf: {
          50: "#f3faf3",
          100: "#e3f2e4",
          200: "#c8e4cb",
          300: "#9dce9f",
          400: "#6bb06f",
          500: "#44924a",
          600: "#35773b",
          700: "#2d5f32",
          800: "#274c2b",
          900: "#213f25",
        },
        slate: {
          850: "#172033",
          950: "#0b0f18",
        },
      },
    },
  },
  plugins: [],
};
