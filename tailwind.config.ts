import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark: "#1a3a2a",
          mid: "#2d5a3d",
          light: "#3d7a52",
          pale: "#e8f0eb",
          border: "#c5d9cc",
        },
        gold: {
          DEFAULT: "#d4a843",
          dark: "#b8922e",
          pale: "#fdf5e0",
        },
        cream: {
          DEFAULT: "#f7f5f0",
          2: "#ede9e0",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
